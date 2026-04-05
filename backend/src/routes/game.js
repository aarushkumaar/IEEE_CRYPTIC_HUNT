import express from 'express';
import rateLimit from 'express-rate-limit';
import { authMiddleware } from '../middleware/auth.js';
import { buildQueue } from '../services/queueBuilder.js';
import { supabase } from '../supabaseAdmin.js';

const router = express.Router();

const answerLimit = rateLimit({
  windowMs: 2000,
  max: 1,
  message: { error: 'Too many requests — slow down.' },
});

// ── POST /game/start ────────────────────────────────────────────────────────
router.post('/start', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    // Prevent restart if session already exists
    const { data: existing } = await supabase
      .from('sessions')
      .select('id')
      .eq('user_id', userId)
      .single();

    if (existing) {
      return res.status(400).json({ error: 'Game already started. Refresh to continue.' });
    }

    await buildQueue(userId);

    await supabase
      .from('profiles')
      .update({ time_started: new Date().toISOString(), status: 'playing' })
      .eq('id', userId);

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

    const { data: session, error: sessErr } = await supabase
      .from('sessions')
      .select('queue, current_index, current_round, phase_scores')
      .eq('user_id', userId)
      .single();

    if (sessErr || !session) {
      return res.status(404).json({ error: 'No active session found.' });
    }

    if (session.current_index >= 20) {
      return res.json({ completed: true });
    }

    const questionId = session.queue[session.current_index];

    // SECURITY: never select the "answers" field
    const { data: question, error: qErr } = await supabase
      .from('questions')
      .select('id, suit, card_number, difficulty, round, is_wildcard, question, hints')
      .eq('id', questionId)
      .single();

    if (qErr || !question) {
      return res.status(500).json({ error: 'Failed to load question.' });
    }

    res.json({
      question,
      progress: {
        index: session.current_index,
        round: session.current_round,
        questionInRound: (session.current_index % 5) + 1,
        phaseScores: session.phase_scores,
        totalQuestions: 20,
      },
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

    const { data: session } = await supabase
      .from('sessions')
      .select('queue, current_index, current_round, phase_scores')
      .eq('user_id', userId)
      .single();

    if (!session) return res.status(404).json({ error: 'No active session.' });
    if (session.current_index >= 20) return res.status(400).json({ error: 'Game already completed.' });

    const questionId = session.queue[session.current_index];

    // Fetch correct answers (service role — not exposed to client)
    const { data: question } = await supabase
      .from('questions')
      .select('answers, round')
      .eq('id', questionId)
      .single();

    const normalised = answer.trim().toLowerCase();
    const isCorrect = question.answers.some(a => a.trim().toLowerCase() === normalised);

    const scoreDelta = isCorrect ? 1 : 0;
    const newIndex   = session.current_index + 1;
    const newRound   = Math.min(Math.floor(newIndex / 5) + 1, 4);
    const roundComplete = newIndex % 5 === 0;

    // Update phase_scores array
    const phaseScores = [...session.phase_scores];
    phaseScores[question.round - 1] += scoreDelta;

    // Update session
    await supabase.from('sessions').update({
      current_index: newIndex,
      current_round: newRound,
      phase_scores: phaseScores,
      ...(newIndex >= 20 ? { completed_at: new Date().toISOString() } : {}),
    }).eq('user_id', userId);

    // Update profile score
    const { data: profile } = await supabase
      .from('profiles')
      .select('score')
      .eq('id', userId)
      .single();

    const newScore = profile.score + scoreDelta;
    const passThreshold = parseInt(process.env.PASS_THRESHOLD || '10', 10);
    const profileUpdates = { score: newScore };

    if (newIndex >= 20) {
      profileUpdates.time_ended = new Date().toISOString();
      profileUpdates.status = newScore >= passThreshold ? 'passed' : 'failed';
    }

    await supabase.from('profiles').update(profileUpdates).eq('id', userId);

    res.json({
      correct: isCorrect,
      scoreDelta,
      newScore,
      completed: newIndex >= 20,
      roundComplete,
      newRound,
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

    const { data: session } = await supabase
      .from('sessions')
      .select('queue, current_index, current_round, phase_scores')
      .eq('user_id', userId)
      .single();

    if (!session) return res.status(404).json({ error: 'No active session.' });
    if (session.current_index >= 20) return res.status(400).json({ error: 'Game already completed.' });

    const newIndex = session.current_index + 1;
    const newRound = Math.min(Math.floor(newIndex / 5) + 1, 4);
    const roundComplete = newIndex % 5 === 0;

    await supabase.from('sessions').update({
      current_index: newIndex,
      current_round: newRound,
      ...(newIndex >= 20 ? { completed_at: new Date().toISOString() } : {}),
    }).eq('user_id', userId);

    const { data: profile } = await supabase
      .from('profiles')
      .select('score')
      .eq('id', userId)
      .single();

    const newScore = Math.max(0, profile.score - 1); // floor at 0
    const passThreshold = parseInt(process.env.PASS_THRESHOLD || '10', 10);
    const profileUpdates = { score: newScore };

    if (newIndex >= 20) {
      profileUpdates.time_ended = new Date().toISOString();
      profileUpdates.status = newScore >= passThreshold ? 'passed' : 'failed';
    }

    await supabase.from('profiles').update(profileUpdates).eq('id', userId);

    res.json({ skipped: true, newScore, completed: newIndex >= 20, roundComplete, newRound });
  } catch (err) {
    console.error('/game/skip error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// ── POST /game/hint ─────────────────────────────────────────────────────────
router.post('/hint', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const { data: session } = await supabase
      .from('sessions')
      .select('queue, current_index')
      .eq('user_id', userId)
      .single();

    if (!session) return res.status(404).json({ error: 'No active session.' });

    const questionId = session.queue[session.current_index];
    const { data: question } = await supabase
      .from('questions')
      .select('hints')
      .eq('id', questionId)
      .single();

    const { data: profile } = await supabase
      .from('profiles')
      .select('hints_used')
      .eq('id', userId)
      .single();

    const hints = question.hints || [];
    if (!hints.length) return res.json({ hint: 'No hints available for this question.', hintsUsed: profile.hints_used });

    const hintIndex = profile.hints_used % hints.length;
    const hint = hints[hintIndex];

    await supabase.from('profiles')
      .update({ hints_used: profile.hints_used + 1 })
      .eq('id', userId);

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

    const { data: profile } = await supabase
      .from('profiles')
      .select('name, score, status, time_started, time_ended, hints_used')
      .eq('id', userId)
      .single();

    const { data: session } = await supabase
      .from('sessions')
      .select('phase_scores')
      .eq('user_id', userId)
      .single();

    const timeSeconds = profile.time_started && profile.time_ended
      ? Math.floor((new Date(profile.time_ended) - new Date(profile.time_started)) / 1000)
      : null;

    // Fetch rank from leaderboard ordering
    const { data: all } = await supabase
      .from('profiles')
      .select('id, score, time_started, time_ended')
      .order('score', { ascending: false });

    const rank = all.findIndex(p => p.id === userId) + 1;

    res.json({
      ...profile,
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
// Returns current session state so the frontend can resume after page refresh
router.get('/session', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const { data: session } = await supabase
      .from('sessions')
      .select('current_index, current_round, phase_scores, completed_at')
      .eq('user_id', userId)
      .single();

    if (!session) return res.json({ hasSession: false });

    res.json({
      hasSession: true,
      currentIndex: session.current_index,
      currentRound: session.current_round,
      phaseScores: session.phase_scores,
      completed: session.current_index >= 20 || !!session.completed_at,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
