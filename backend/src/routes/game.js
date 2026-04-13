import express from 'express';
import rateLimit from 'express-rate-limit';
import { authMiddleware } from '../middleware/auth.js';
import { buildQueue } from '../services/queueBuilder.js';
import { db } from '../firebase.js';

const router = express.Router();

const GAME_DURATION_MS  = 12 * 60 * 60 * 1000; // 12 hours
const ZERO_SCORE_DQ_MS  =  2 * 60 * 60 * 1000; //  2 hours
const MAX_TRIES         = 3;                     // per question
const PASS_THRESHOLD    = parseInt(process.env.PASS_THRESHOLD || '10', 10);

const answerLimit = rateLimit({
  windowMs: 2000,
  max: 1,
  message: { error: 'Too many requests — slow down.' },
});

// ── Helper: check expiry / zero-score DQ on every sensitive route ───────────
async function checkExpiry(userId, profile) {
  if (!profile.game_start_time) return null;

  const elapsed = Date.now() - new Date(profile.game_start_time).getTime();

  // 12-hour hard limit
  if (elapsed >= GAME_DURATION_MS && !profile.game_finished) {
    await db.collection('profiles').doc(userId).update({ game_finished: true, status: 'failed' });
    return { expired: true, reason: '12-hour time limit reached.' };
  }

  // 2-hour zero-score DQ: if score is still 0 after 2h
  if (elapsed >= ZERO_SCORE_DQ_MS && (profile.score ?? 0) === 0 && !profile.disqualified && !profile.game_finished) {
    await db.collection('profiles').doc(userId).update({ disqualified: true, status: 'failed' });
    return { disqualified: true, reason: 'Zero score after 2 hours.' };
  }

  return null;
}

// ── POST /game/start ────────────────────────────────────────────────────────
router.post('/start', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    // Prevent restart if session already exists
    const existing = await db.collection('sessions').doc(userId).get();

    if (existing.exists) {
      return res.status(400).json({ error: 'Game already started. Refresh to continue.' });
    }

    await buildQueue(userId);

    const now = new Date().toISOString();
    await db.collection('profiles').doc(userId).update({
      time_started: now,
      game_start_time: now,
      status: 'playing',
    });

    res.json({ success: true, message: 'Game started. Good luck.' });
  } catch (err) {
    console.error('/game/start error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// ── GET /game/current ───────────────────────────────────────────────────────
router.get('/current', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const profileDoc = await db.collection('profiles').doc(userId).get();
    const profile = profileDoc.data();

    if (profile?.disqualified) return res.json({ disqualified: true });
    if (profile?.game_finished) return res.json({ completed: true, gameFinished: true });

    const expiryResult = await checkExpiry(userId, profile);
    if (expiryResult) return res.json(expiryResult);

    const sessionDoc = await db.collection('sessions').doc(userId).get();
    if (!sessionDoc.exists) {
      return res.status(404).json({ error: 'No active session found.' });
    }
    const session = sessionDoc.data();

    if (session.current_index >= 20) {
      return res.json({ completed: true });
    }

    const questionId = session.queue[session.current_index];

    const questionDoc = await db.collection('questions').doc(questionId).get();
    if (!questionDoc.exists) {
      return res.status(500).json({ error: 'Failed to load question.' });
    }
    const question = questionDoc.data();
    // Exclude the 'answers' array from the payload before sending to client
    delete question.answers;
    question.id = questionDoc.id; // ensure ID is preserved

    // Count attempts already made on this question by this user
    const attemptsSnap = await db.collection('question_attempts')
      .where('user_id', '==', userId)
      .where('question_id', '==', questionId)
      .get();

    const triesUsed = attemptsSnap.size;
    const triesLeft = Math.max(0, MAX_TRIES - triesUsed);

    res.json({
      question,
      progress: {
        index: session.current_index,
        round: session.current_round,
        questionInRound: (session.current_index % 5) + 1,
        phaseScores: session.phase_scores,
        totalQuestions: 20,
        triesLeft,
        triesUsed,
      },
      gameStartTime: profile.game_start_time,
    });
  } catch (err) {
    console.error('/game/current error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// ── POST /game/answer ───────────────────────────────────────────────────────
router.post('/answer', authMiddleware, answerLimit, async (req, res) => {
  try {
    const userId = req.user.id;
    const { answer } = req.body;

    if (!answer || typeof answer !== 'string') {
      return res.status(400).json({ error: 'A non-empty answer string is required.' });
    }

    const profileDoc = await db.collection('profiles').doc(userId).get();
    const profile = profileDoc.data();

    if (profile?.disqualified) return res.json({ disqualified: true });
    if (profile?.game_finished) return res.json({ completed: true, gameFinished: true });

    const expiryResult = await checkExpiry(userId, profile);
    if (expiryResult) return res.json(expiryResult);

    const sessionDoc = await db.collection('sessions').doc(userId).get();
    if (!sessionDoc.exists) return res.status(404).json({ error: 'No active session.' });
    const session = sessionDoc.data();

    if (session.current_index >= 20) return res.status(400).json({ error: 'Game already completed.' });

    const questionId = session.queue[session.current_index];

    const attemptsSnap = await db.collection('question_attempts')
      .where('user_id', '==', userId)
      .where('question_id', '==', questionId)
      .get();
    
    const triesUsed = attemptsSnap.size;

    if (triesUsed >= MAX_TRIES) {
      await db.collection('profiles').doc(userId).update({ disqualified: true, status: 'failed' });
      return res.json({ disqualified: true, reason: 'Maximum tries exceeded for this question.' });
    }

    const questionDoc = await db.collection('questions').doc(questionId).get();
    const question = questionDoc.data();

    const normalised = answer.trim().toLowerCase();
    const isCorrect  = question.answers.some(a => a.trim().toLowerCase() === normalised);

    const attemptNumber = triesUsed + 1;

    // Record attempt
    await db.collection('question_attempts').add({
      user_id:       userId,
      question_id:   questionId,
      attempt_number: attemptNumber,
      correct:       isCorrect,
    });

    const newTriesUsed = attemptNumber;
    const triesLeft    = Math.max(0, MAX_TRIES - newTriesUsed);

    if (!isCorrect && triesLeft === 0) {
      await db.collection('profiles').doc(userId).update({ disqualified: true, status: 'failed' });
      return res.json({
        correct: false,
        scoreDelta: 0,
        newScore: profile.score,
        triesLeft: 0,
        disqualified: true,
        reason: 'You have used all 3 attempts on this question.',
      });
    }

    if (!isCorrect) {
      return res.json({
        correct: false,
        scoreDelta: 0,
        newScore: profile.score,
        triesLeft,
      });
    }

    const scoreDelta    = 1;
    const newIndex      = session.current_index + 1;
    const newRound      = Math.min(Math.floor(newIndex / 5) + 1, 4);
    const roundComplete = newIndex % 5 === 0;

    const phaseScores = [...session.phase_scores];
    phaseScores[question.round - 1] += scoreDelta;

    const sessionUpdates = {
      current_index: newIndex,
      current_round: newRound,
      phase_scores:  phaseScores,
    };
    if (newIndex >= 20) sessionUpdates.completed_at = new Date().toISOString();

    await db.collection('sessions').doc(userId).update(sessionUpdates);

    const newScore = profile.score + scoreDelta;
    const profileUpdates = { score: newScore };

    if (newIndex >= 20) {
      profileUpdates.time_ended      = new Date().toISOString();
      profileUpdates.game_finished   = true;
      profileUpdates.status          = newScore >= PASS_THRESHOLD ? 'passed' : 'failed';
    }

    await db.collection('profiles').doc(userId).update(profileUpdates);

    res.json({
      correct: isCorrect,
      scoreDelta,
      newScore,
      completed: newIndex >= 20,
      roundComplete,
      newRound,
      triesLeft: MAX_TRIES, // reset for next question
    });
  } catch (err) {
    console.error('/game/answer error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// ── POST /game/skip ─────────────────────────────────────────────────────────
router.post('/skip', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const profileDoc = await db.collection('profiles').doc(userId).get();
    const profile = profileDoc.data();

    if (profile?.disqualified) return res.json({ disqualified: true });
    if (profile?.game_finished) return res.json({ completed: true, gameFinished: true });

    const expiryResult = await checkExpiry(userId, profile);
    if (expiryResult) return res.json(expiryResult);

    const sessionDoc = await db.collection('sessions').doc(userId).get();
    if (!sessionDoc.exists) return res.status(404).json({ error: 'No active session.' });
    const session = sessionDoc.data();

    if (session.current_index >= 20) return res.status(400).json({ error: 'Game already completed.' });

    const newIndex      = session.current_index + 1;
    const newRound      = Math.min(Math.floor(newIndex / 5) + 1, 4);
    const roundComplete = newIndex % 5 === 0;

    const sessionUpdates = {
      current_index: newIndex,
      current_round: newRound,
    };
    if (newIndex >= 20) sessionUpdates.completed_at = new Date().toISOString();

    await db.collection('sessions').doc(userId).update(sessionUpdates);

    const newScore = Math.max(0, profile.score - 1);
    const profileUpdates = { score: newScore };

    if (newIndex >= 20) {
      profileUpdates.time_ended    = new Date().toISOString();
      profileUpdates.game_finished = true;
      profileUpdates.status        = newScore >= PASS_THRESHOLD ? 'passed' : 'failed';
    }

    await db.collection('profiles').doc(userId).update(profileUpdates);

    res.json({ skipped: true, newScore, completed: newIndex >= 20, roundComplete, newRound });
  } catch (err) {
    console.error('/game/skip error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// ── POST /game/expire ───────────────────────────────────────────────────────
// Called by client when timer hits 0; idempotent
router.post('/expire', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    await db.collection('profiles').doc(userId).update({ game_finished: true, status: 'failed' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── POST /game/hint ─────────────────────────────────────────────────────────
router.post('/hint', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const sessionDoc = await db.collection('sessions').doc(userId).get();
    if (!sessionDoc.exists) return res.status(404).json({ error: 'No active session.' });
    const session = sessionDoc.data();

    const questionId = session.queue[session.current_index];
    const questionDoc = await db.collection('questions').doc(questionId).get();
    const question = questionDoc.data();

    const profileDoc = await db.collection('profiles').doc(userId).get();
    const profile = profileDoc.data();

    const hints = question.hints || [];
    if (!hints.length) return res.json({ hint: 'No hints available for this question.', hintsUsed: profile.hints_used });

    const hintIndex = profile.hints_used % hints.length;
    const hint = hints[hintIndex];

    await db.collection('profiles').doc(userId).update({ hints_used: profile.hints_used + 1 });

    res.json({ hint, hintsUsed: profile.hints_used + 1, totalHints: hints.length });
  } catch (err) {
    console.error('/game/hint error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// ── GET /game/result ────────────────────────────────────────────────────────
router.get('/result', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const profileDoc = await db.collection('profiles').doc(userId).get();
    const profile = profileDoc.data();

    const sessionDoc = await db.collection('sessions').doc(userId).get();
    const session = sessionDoc.exists ? sessionDoc.data() : null;

    const timeSeconds = profile.time_started && profile.time_ended
      ? Math.floor((new Date(profile.time_ended) - new Date(profile.time_started)) / 1000)
      : null;

    const allProfilesSnap = await db.collection('profiles').orderBy('score', 'desc').get();
    const all = allProfilesSnap.docs.map(d => ({ id: d.id, ...d.data() }));

    const rank = all.findIndex(p => p.id === userId) + 1;

    res.json({
      name: profile.name,
      score: profile.score,
      status: profile.status,
      time_started: profile.time_started,
      time_ended: profile.time_ended,
      hints_used: profile.hints_used,
      timeSeconds,
      phaseScores: session?.phase_scores ?? [0, 0, 0, 0],
      rank,
    });
  } catch (err) {
    console.error('/game/result error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// ── GET /game/session ───────────────────────────────────────────────────────
router.get('/session', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const sessionDoc = await db.collection('sessions').doc(userId).get();
    if (!sessionDoc.exists) return res.json({ hasSession: false });
    const session = sessionDoc.data();

    const profileDoc = await db.collection('profiles').doc(userId).get();
    const profile = profileDoc.data();

    res.json({
      hasSession:     true,
      currentIndex:   session.current_index,
      currentRound:   session.current_round,
      phaseScores:    session.phase_scores,
      completed:      session.current_index >= 20 || !!session.completed_at,
      gameStartTime:  profile?.game_start_time ?? null,
      disqualified:   profile?.disqualified ?? false,
      gameFinished:   profile?.game_finished ?? false,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
