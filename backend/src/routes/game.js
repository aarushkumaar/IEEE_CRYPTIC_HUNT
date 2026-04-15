import express from 'express';
import rateLimit from 'express-rate-limit';
import { authMiddleware } from '../middleware/auth.js';
import { buildQueue } from '../services/queueBuilder.js';
import { db, rtdb } from '../firebase.js';
import { getCache, setCache, invalidateCache } from '../cache.js';

// Throttle lastSeen writes: track the last write time per user (in-process memory)
const lastSeenAt = new Map(); // userId → timestamp
const LAST_SEEN_THROTTLE_MS = 30_000; // write at most once per 30 s

const router = express.Router();

const TOTAL_QUESTIONS  = 13;
const PASS_THRESHOLD   = parseInt(process.env.PASS_THRESHOLD || '8', 10);
const WARN_HOURS       = 1.75;
const DQ_HOURS         = 2;
const DQ_MIN_SCORE     = 5;
const TWELVE_HOURS_MS  = 2 * 60 * 60 * 1000;

const answerLimit = rateLimit({
  windowMs: 2000,
  max: 1,
  message: { error: 'Too many requests — slow down.' },
});

/* ── Phase helpers ─────────────────────────────────────────────────── */
function getPhase(index) {
  if (index <= 3)  return 1;  // easy
  if (index <= 7)  return 2;  // medium
  if (index <= 11) return 3;  // hard
  return 4;                   // wildcard
}

function getMaxTries(index) {
  if (index <= 3)  return 2;  // Phase 1 easy
  if (index <= 11) return 3;  // Phase 2/3 medium/hard
  return 1;                   // Phase 4 wildcard
}

/* ── Answer normalisation ──────────────────────────────────────────── */
function normaliseAnswer(str) {
  return str
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/['']/g, "'")
    .replace(/[""]/g, '"');
}

/* ── Eliminate a player ────────────────────────────────────────────── */
async function eliminatePlayer(userId, reason) {
  const now = new Date().toISOString();
  await Promise.all([
    db.collection('profiles').doc(userId).update({
      eliminated:         true,
      eliminationReason:  reason,
      status:             'failed',
      timeEnded:          now,
      logoutTime:         now,
    }),
    db.collection('sessions').doc(userId).update({
      eliminatedAt:      now,
      eliminationReason: reason,
    }),
  ]);
}

/* ── Time-based elimination check ──────────────────────────────────── */
async function checkTimeElimination(userId, loginTime, score) {
  if (!loginTime) return false;
  const hoursElapsed = (Date.now() - new Date(loginTime).getTime()) / 3_600_000;
  if (hoursElapsed >= DQ_HOURS && (score ?? 0) < DQ_MIN_SCORE) {
    await eliminatePlayer(userId, `Score below ${DQ_MIN_SCORE} after ${DQ_HOURS} hours.`);
    return true;
  }
  return false;
}

/* ── 2-hour game expiry check ─────────────────────────────────────── */
async function checkTwelveHourExpiry(userId, loginTime, gameFinished) {
  if (!loginTime || gameFinished) return false;
  const elapsed = Date.now() - new Date(loginTime).getTime();
  if (elapsed > TWELVE_HOURS_MS) {
    const now = new Date().toISOString();
    await db.collection('profiles').doc(userId).update({
      gameFinished: true,
      status:       'failed',
      logoutTime:   now,
    });
    return true;
  }
  return false;
}

/* ── Update last_seen — throttled to max 1 write per 30 s per user ─── */
function updateLastSeen(userId) {
  const now = Date.now();
  const last = lastSeenAt.get(userId) ?? 0;
  if (now - last < LAST_SEEN_THROTTLE_MS) return; // skip — wrote recently
  lastSeenAt.set(userId, now);
  db.collection('profiles').doc(userId)
    .update({ lastSeen: new Date(now).toISOString() })
    .catch(() => {}); // intentional fire-and-forget
}

/* ── Mirror score to RTDB leaderboard ─────────────────────────────── */
async function mirrorToRtdb(userId, profile, newScore, statusOverride, timeEnded) {
  try {
    await rtdb.ref(`leaderboard/${userId}`).update({
      name:        profile.name  || '',
      score:       newScore,
      status:      statusOverride || profile.status || 'playing',
      timeStarted: profile.loginTime || null,
      timeEnded:   timeEnded || null,
    });
  } catch (e) {
    console.error('RTDB mirror error:', e.message);
  }
}

/* ── Compute timeInfo object ───────────────────────────────────────── */
function buildTimeInfo(loginTime, score) {
  if (!loginTime) return { loginTime: null, hoursElapsed: 0, currentScore: score ?? 0, warningActive: false };
  const hoursElapsed = (Date.now() - new Date(loginTime).getTime()) / 3_600_000;
  return {
    loginTime,
    hoursElapsed:  Math.round(hoursElapsed * 1000) / 1000,
    currentScore:  score ?? 0,
    warningActive: hoursElapsed >= WARN_HOURS && hoursElapsed < DQ_HOURS && (score ?? 0) < DQ_MIN_SCORE,
  };
}

/* ══ POST /game/start ════════════════════════════════════════════════ */
router.post('/start', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.uid;

    // Step 1: Ensure profile doc exists
    const profileRef = db.collection('profiles').doc(userId);
    const profileDoc = await profileRef.get();
    if (!profileDoc.exists) {
      // Profile should have been created at /auth/register — create minimal one just in case
      await profileRef.set({
        score: 0, status: 'waiting', hintsUsed: 0, eliminated: false,
        timeStarted: null, timeEnded: null, loginTime: null, gameFinished: false,
      });
    }

    // Step 2: Check if session already exists
    const sessionDoc = await db.collection('sessions').doc(userId).get();

    // Step 3: Only create session if it doesn't exist
    if (!sessionDoc.exists) {
      const now = new Date().toISOString();

      // Insert minimal session doc so FK-equivalent is satisfied immediately
      await db.collection('sessions').doc(userId).set({ currentRound: 1, currentIndex: 0 });

      // Build and write the question queue into the session
      await buildQueue(userId);
      
      // Set loginTime / gameStartTime only on first start
      const freshProfileDoc = await profileRef.get();
      const currentProfile  = freshProfileDoc.data();

      const profileUpdate = { timeStarted: now, status: 'playing' };
      if (!currentProfile?.loginTime)    profileUpdate.loginTime    = now;
      if (!currentProfile?.gameStartTime) profileUpdate.gameStartTime = now;

      await profileRef.update(profileUpdate);
    }

    updateLastSeen(userId);
    res.json({ success: true, message: 'Game started. Good luck.' });
  } catch (err) {
    console.error('/game/start error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

/* ══ GET /game/current ═══════════════════════════════════════════════ */
router.get('/current', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.uid;

    const profileDoc = await db.collection('profiles').doc(userId).get();
    if (!profileDoc.exists) return res.status(404).json({ error: 'Profile not found.' });
    const profile = profileDoc.data();

    if (profile.eliminated) {
      return res.json({ eliminated: true, reason: profile.eliminationReason });
    }
    if (profile.gameFinished) {
      return res.json({ completed: true, gameFinished: true });
    }

    // 12-hour game expiry check
    const expired = await checkTwelveHourExpiry(userId, profile.loginTime, profile.gameFinished);
    if (expired) {
      return res.status(403).json({
        error:   'GAME_EXPIRED',
        message: 'Your 2-hour session has ended. The tomb has sealed.',
      });
    }

    // Time-based elimination check on every call
    const eliminated = await checkTimeElimination(userId, profile.loginTime, profile.score);
    if (eliminated) {
      return res.json({ eliminated: true, reason: `Score below ${DQ_MIN_SCORE} after ${DQ_HOURS} hours.` });
    }

    // Fetch session — return clean error if missing (frontend will auto-call /start)
    const sessionDoc = await db.collection('sessions').doc(userId).get();
    if (!sessionDoc.exists) {
      return res.status(404).json({
        error:   'SESSION_NOT_FOUND',
        message: 'Session not found. Please restart the game.',
      });
    }
    const session = sessionDoc.data();
    if (!session.queue || !Array.isArray(session.queue)) {
  return res.status(500).json({
    error: "Queue not initialized. Please restart game."
  });
}

    if (session.currentIndex >= TOTAL_QUESTIONS) {
      return res.json({ completed: true });
    }

    const idx        = session.currentIndex;
    const questionId = session.queue[idx];
    const phase      = getPhase(idx);
    const maxTries   = getMaxTries(idx);
    const triesUsed  = (session.triesUsed ?? [])[idx] ?? 0;
    const triesLeft  = Math.max(0, maxTries - triesUsed);
    const isWildcard = idx === TOTAL_QUESTIONS - 1;

    // SECURITY: never return the "answers" field
    const qDoc = await db.collection('questions').doc(questionId).get();
    if (!qDoc.exists) return res.status(500).json({ error: 'Failed to load question.' });
    const qData = qDoc.data();

    // Map back to snake_case for API response (frontend Game.jsx expects these field names)
    const question = {
      id:          qDoc.id,
      suit:        qData.suit,
      card_number: qData.cardNumber,
      difficulty:  qData.difficulty,
      round:       qData.round,
      is_wildcard: qData.isWildcard,
      question:    qData.question,
      hints:       qData.hints,
    };

    const timeInfo = buildTimeInfo(profile.loginTime, profile.score);
    updateLastSeen(userId);

    const timeElapsedSeconds = profile.loginTime
      ? Math.floor((Date.now() - new Date(profile.loginTime).getTime()) / 1000)
      : 0;

    res.json({
      question,
      progress: {
        index:                  idx,
        current_round:          session.currentRound,
        current_question_index: idx,
        phase,
        questionInPhase:        (idx % 4) + 1,
        triesUsed,
        triesLeft,
        maxTries,
        isWildcard,
        totalQuestions:         TOTAL_QUESTIONS,
        phaseScores:            session.phaseScores,
      },
      score:                profile.score ?? 0,
      game_start_time:      profile.loginTime,
      time_elapsed_seconds: timeElapsedSeconds,
      timeInfo,
    });
  } catch (err) {
    console.error('/game/current error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

/* ══ POST /game/answer ═══════════════════════════════════════════════ */
router.post('/answer', authMiddleware, answerLimit, async (req, res) => {
  try {
    const userId = req.user.uid;
    const { answer } = req.body;

    if (!answer || typeof answer !== 'string') {
      return res.status(400).json({ error: 'A non-empty answer string is required.' });
    }

    const profileDoc = await db.collection('profiles').doc(userId).get();
    const profile    = profileDoc.data();

    if (profile?.eliminated) return res.json({ eliminated: true, reason: profile.eliminationReason });
    if (profile?.gameFinished) return res.json({ completed: true, gameFinished: true });

    const expired = await checkTwelveHourExpiry(userId, profile?.loginTime, profile?.gameFinished);
    if (expired) {
      return res.status(403).json({
        error:   'GAME_EXPIRED',
        message: 'Your 2-hour session has ended. The tomb has sealed.',
      });
    }

    const sessionDoc = await db.collection('sessions').doc(userId).get();
    if (!sessionDoc.exists) return res.status(404).json({ error: 'No active session.' });
    const session = sessionDoc.data();

    if (session.currentIndex >= TOTAL_QUESTIONS) {
      return res.status(400).json({ error: 'Game already completed.' });
    }

    const idx        = session.currentIndex;
    const maxTries   = getMaxTries(idx);
    const phase      = getPhase(idx);
    const isWildcard = idx === TOTAL_QUESTIONS - 1;

    const triesArr  = [...(session.triesUsed ?? new Array(TOTAL_QUESTIONS).fill(0))];
    const triesUsed = triesArr[idx] ?? 0;

    if (triesUsed >= maxTries) {
      return res.status(400).json({ error: 'No tries remaining for this question.' });
    }

    const questionId = session.queue[idx];

    // Fetch correct answers (service account — not exposed to client)
    const qDoc  = await db.collection('questions').doc(questionId).get();
    const qData = qDoc.data();

    const normalised = normaliseAnswer(answer);
    const isCorrect  = qData.answers.some(a => normaliseAnswer(a) === normalised);

    // Increment tries used
    triesArr[idx]     = triesUsed + 1;
    const newTriesUsed = triesArr[idx];
    const triesLeft    = Math.max(0, maxTries - newTriesUsed);
    const exhausted    = triesLeft === 0;

    // Advance index if correct OR tries exhausted
    const advance       = isCorrect || exhausted;
    const newIndex      = advance ? idx + 1 : idx;
    const phaseComplete = advance && getPhase(newIndex) !== phase && newIndex < TOTAL_QUESTIONS;

    // Score: only on correct answer
    const scoreDelta  = isCorrect ? 1 : 0;
    const newScore    = (profile.score ?? 0) + scoreDelta;

    // Update phase_scores
    const phaseScores = [...(session.phaseScores ?? [0, 0, 0, 0])];
    if (isCorrect) phaseScores[phase - 1] = (phaseScores[phase - 1] ?? 0) + 1;

    // Build session update
    const sessionUpdate = {
      triesUsed:    triesArr,
      currentIndex: newIndex,
      currentRound: Math.min(getPhase(newIndex), 4),
      phaseScores,
      ...(newIndex >= TOTAL_QUESTIONS ? { completedAt: new Date().toISOString() } : {}),
    };
    await db.collection('sessions').doc(userId).update(sessionUpdate);
    invalidateCache(`status_${userId}`); // invalidate cached status after answer

    // Profile update
    const profileUpdate = { score: newScore };
    const gameComplete  = newIndex >= TOTAL_QUESTIONS;

    if (gameComplete) {
      const now = new Date().toISOString();
      profileUpdate.timeEnded    = now;
      profileUpdate.gameFinished = true;
      profileUpdate.status       = newScore >= PASS_THRESHOLD ? 'passed' : 'failed';
      profileUpdate.logoutTime   = now;
    }
    await db.collection('profiles').doc(userId).update(profileUpdate);

    // Mirror to Realtime Database for live leaderboard
    await mirrorToRtdb(
      userId,
      profile,
      newScore,
      profileUpdate.status || 'playing',
      profileUpdate.timeEnded || null
    );

    // Wildcard wrong → eliminate immediately
    if (isWildcard && !isCorrect) {
      await eliminatePlayer(userId, 'Failed the wildcard.');
      return res.json({
        correct:       false,
        scoreDelta:    0,
        newScore:      profile.score,
        triesLeft:     0,
        exhausted:     true,
        advanced:      false,
        phaseComplete: false,
        eliminated:    true,
        message:       'The wildcard has judged you unworthy.',
      });
    }

    // Time-based elimination check after scoring
    const timeEliminated = await checkTimeElimination(userId, profile.loginTime, newScore);

    updateLastSeen(userId);

    res.json({
      correct:       isCorrect,
      scoreDelta,
      newScore,
      triesLeft,
      exhausted,
      advanced:      advance,
      phaseComplete,
      eliminated:    timeEliminated,
      completed:     gameComplete,
      message:       isCorrect
        ? 'Correct! Well done.'
        : exhausted
          ? 'All tries exhausted. Moving on.'
          : `Incorrect. ${triesLeft} attempt${triesLeft === 1 ? '' : 's'} remaining.`,
    });
  } catch (err) {
    console.error('/game/answer error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

/* ══ POST /game/skip ═════════════════════════════════════════════════ */
router.post('/skip', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.uid;
    const sessionDoc = await db.collection('sessions').doc(userId).get();
    if (!sessionDoc.exists) return res.status(404).json({ error: 'No active session.' });
    const session = sessionDoc.data();

    if (session.currentIndex >= TOTAL_QUESTIONS) {
      return res.status(400).json({ error: 'Game already completed.' });
    }

    const newIndex = session.currentIndex + 1;
    const gameComplete = newIndex >= TOTAL_QUESTIONS;
    const now = new Date().toISOString();

    await db.collection('sessions').doc(userId).update({
      currentIndex: newIndex,
      currentRound: Math.min(getPhase(newIndex), 4),
    });
    invalidateCache(`status_${userId}`); // invalidate cached status after skip

    if (gameComplete) {
      await db.collection('profiles').doc(userId).update({
        gameFinished: true,
        timeEnded: now,
        logoutTime: now,
        status: 'failed'
      });
    }

    res.json({ skipped: true, newIndex, completed: gameComplete });
  } catch (err) {
    console.error('/game/skip error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

/* ══ POST /game/hint ═════════════════════════════════════════════════ */
router.post('/hint', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.uid;

    const sessionDoc = await db.collection('sessions').doc(userId).get();
    if (!sessionDoc.exists) return res.status(404).json({ error: 'No active session.' });
    const session = sessionDoc.data();

    const questionId = session.queue[session.currentIndex];
    const qDoc  = await db.collection('questions').doc(questionId).get();
    const qData = qDoc.data();

    const profileDoc = await db.collection('profiles').doc(userId).get();
    const profile    = profileDoc.data();

    const hints = qData?.hints ?? [];
    if (!hints.length) {
      return res.json({ hint: 'No hints available for this question.', hintsUsed: profile.hintsUsed });
    }

    const hintIndex = (profile.hintsUsed ?? 0) % hints.length;
    const hint      = hints[hintIndex];

    await db.collection('profiles').doc(userId).update({
      hintsUsed: (profile.hintsUsed ?? 0) + 1,
    });

    updateLastSeen(userId);
    res.json({ hint, hintsUsed: (profile.hintsUsed ?? 0) + 1, totalHints: hints.length });
  } catch (err) {
    console.error('/game/hint error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

/* ══ GET /game/result ════════════════════════════════════════════════ */
router.get('/result', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.uid;

    const profileDoc = await db.collection('profiles').doc(userId).get();
    const profile    = profileDoc.data();

    const sessionDoc = await db.collection('sessions').doc(userId).get();
    const session    = sessionDoc.exists ? sessionDoc.data() : null;

    const timeSeconds = profile.timeStarted && profile.timeEnded
      ? Math.floor((new Date(profile.timeEnded) - new Date(profile.timeStarted)) / 1000)
      : null;

    // Compute rank
    const allSnapshot  = await db.collection('profiles').orderBy('score', 'desc').get();
    const rank         = allSnapshot.docs.findIndex(d => d.id === userId) + 1;

    // Map to snake_case for API response (frontend expects these names)
    res.json({
      name:               profile.name,
      score:              profile.score,
      status:             profile.status,
      time_started:       profile.timeStarted,
      time_ended:         profile.timeEnded,
      hints_used:         profile.hintsUsed,
      eliminated:         profile.eliminated,
      elimination_reason: profile.eliminationReason,
      timeSeconds,
      phaseScores:        session?.phaseScores ?? [0, 0, 0, 0],
      rank,
    });
  } catch (err) {
    console.error('/game/result error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

/* ══ GET /game/status — lightweight polling endpoint ════════════════ */
router.get('/status', authMiddleware, async (req, res) => {
  try {
    const userId   = req.user.uid;
    const cacheKey = `status_${userId}`;

    // ── Cache hit: serve without touching Firestore ──────────────────
    const cached = getCache(cacheKey, 5_000);
    if (cached) return res.json(cached);

    // ── Cache miss: read from Firestore ──────────────────────────────
    const profileDoc = await db.collection('profiles').doc(userId).get();
    const profile    = profileDoc.data();

    // Check 2-hour expiry — this is a mutation, so don't cache the result
    if (profile?.loginTime && !profile?.gameFinished) {
      const elapsed = Date.now() - new Date(profile.loginTime).getTime();
      if (elapsed > TWELVE_HOURS_MS) {
        const now = new Date().toISOString();
        await db.collection('profiles').doc(userId).update({
          gameFinished: true, status: 'failed', logoutTime: now,
        });
        invalidateCache(cacheKey);
        return res.json({ gameExpired: true, score: profile?.score ?? 0 });
      }
    }

    const timeInfo = buildTimeInfo(profile?.loginTime, profile?.score);

    const result = {
      score:         profile?.score        ?? 0,
      status:        profile?.status       ?? 'waiting',
      eliminated:    profile?.eliminated   ?? false,
      loginTime:     profile?.loginTime    ?? null,
      hoursElapsed:  timeInfo.hoursElapsed,
      warningActive: timeInfo.warningActive,
    };

    setCache(cacheKey, result); // cache for 5 s
    updateLastSeen(userId);     // throttled — at most once per 30 s

    res.json(result);
  } catch (err) {
    console.error('/game/status error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

/* ══ GET /game/session — session state check ════════════════════════ */
router.get('/session', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.uid;

    const sessionDoc = await db.collection('sessions').doc(userId).get();
    if (!sessionDoc.exists) return res.json({ hasSession: false });
    const session = sessionDoc.data();

    const profileDoc = await db.collection('profiles').doc(userId).get();
    const profile    = profileDoc.exists ? profileDoc.data() : null;

    res.json({
      hasSession:   true,
      currentIndex: session.currentIndex,
      currentRound: session.currentRound,
      phaseScores:  session.phaseScores,
      completed:    session.currentIndex >= TOTAL_QUESTIONS || !!session.completedAt,
      loginTime:    profile?.loginTime    ?? null,
      eliminated:   profile?.eliminated   ?? false,
      gameFinished: profile?.gameFinished ?? false,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ══ POST /game/expire — client-side expiry (idempotent) ════════════ */
router.post('/expire', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.uid;
    const now = new Date().toISOString();
    await db.collection('profiles').doc(userId).update({
      gameFinished: true, status: 'failed', logoutTime: now,
    });
    invalidateCache(`status_${userId}`);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ══ POST /game/eliminate-fullscreen — fullscreen violation elimination ══ */
router.post('/eliminate-fullscreen', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.uid;
    await eliminatePlayer(userId, 'Exited fullscreen twice during the hunt.');
    invalidateCache(`status_${userId}`);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
