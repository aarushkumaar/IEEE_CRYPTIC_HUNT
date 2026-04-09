import express from 'express';
import { adminAuth } from '../middleware/adminAuth.js';
import { supabase } from '../supabaseAdmin.js';

const router = express.Router();
router.use(adminAuth);

// ── GET /admin/players — list all players with full data ─────────────────────
router.get('/players', async (req, res) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, name, email, score, status, time_started, time_ended, hints_used, game_start_time, disqualified, game_finished, tries_remaining, created_at')
    .order('score', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });

  const enriched = data.map(p => ({
    ...p,
    time_taken_seconds: p.time_started && p.time_ended
      ? Math.floor((new Date(p.time_ended) - new Date(p.time_started)) / 1000)
      : null,
  }));

  res.json(enriched);
});

// ── GET /admin/stats — live aggregate counts ─────────────────────────────────
router.get('/stats', async (req, res) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('status, disqualified, game_finished');

  if (error) return res.status(500).json({ error: error.message });

  const counts = { total: data.length, playing: 0, passed: 0, failed: 0, waiting: 0, disqualified: 0, finished: 0 };
  data.forEach(p => {
    counts[p.status] = (counts[p.status] || 0) + 1;
    if (p.disqualified) counts.disqualified++;
    if (p.game_finished) counts.finished++;
  });
  res.json(counts);
});

// ── GET /admin/analytics — rich analytics with attempt data ──────────────────
router.get('/analytics', async (req, res) => {
  try {
    // Fetch all profiles
    const { data: profiles, error: pErr } = await supabase
      .from('profiles')
      .select('id, name, email, score, status, time_started, time_ended, game_start_time, disqualified, game_finished, tries_remaining')
      .order('score', { ascending: false });

    if (pErr) return res.status(500).json({ error: pErr.message });

    // Fetch all sessions
    const { data: sessions } = await supabase
      .from('sessions')
      .select('user_id, current_round, current_index, phase_scores');

    // Fetch all question_attempts aggregated per user
    const { data: attempts } = await supabase
      .from('question_attempts')
      .select('user_id, correct, time_taken_seconds');

    // Fetch last activity per user
    const { data: activities } = await supabase
      .from('player_activity')
      .select('user_id, timestamp')
      .order('timestamp', { ascending: false });

    // Build lookup maps
    const sessionMap  = Object.fromEntries((sessions  ?? []).map(s => [s.user_id, s]));
    const activityMap = {};
    (activities ?? []).forEach(a => {
      if (!activityMap[a.user_id]) activityMap[a.user_id] = a.timestamp;
    });

    // Aggregate attempts per user
    const attemptsMap = {};
    (attempts ?? []).forEach(a => {
      if (!attemptsMap[a.user_id]) attemptsMap[a.user_id] = { total: 0, correct: 0, totalTime: 0 };
      attemptsMap[a.user_id].total++;
      if (a.correct) attemptsMap[a.user_id].correct++;
      if (a.time_taken_seconds) attemptsMap[a.user_id].totalTime += a.time_taken_seconds;
    });

    const rows = profiles.map(p => {
      const sess   = sessionMap[p.id]  ?? null;
      const agg    = attemptsMap[p.id] ?? { total: 0, correct: 0, totalTime: 0 };
      const avgTime = agg.total > 0 ? Math.round(agg.totalTime / agg.total) : null;

      return {
        id:                  p.id,
        name:                p.name ?? p.email ?? '—',
        email:               p.email ?? '—',
        score:               p.score,
        status:              p.status,
        disqualified:        p.disqualified,
        game_finished:       p.game_finished,
        tries_remaining:     p.tries_remaining,
        game_entry_time:     p.game_start_time,
        time_ended:          p.time_ended,
        current_round:       sess?.current_round ?? null,
        current_index:       sess?.current_index ?? null,
        phase_scores:        sess?.phase_scores  ?? [0, 0, 0, 0],
        questions_completed: agg.correct,
        questions_attempted: agg.total,
        avg_time_per_q:      avgTime,
        last_active:         activityMap[p.id] ?? null,
      };
    });

    res.json(rows);
  } catch (err) {
    console.error('/admin/analytics error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// ── POST /admin/log-activity — frontend calls this on page navigation ────────
router.post('/log-activity', async (req, res) => {
  try {
    const { userId, page } = req.body;
    if (!userId || !page) return res.status(400).json({ error: 'userId and page are required.' });

    await supabase.from('player_activity').insert({ user_id: userId, page });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── POST /admin/reset — reset ALL sessions and scores ────────────────────────
router.post('/reset', async (req, res) => {
  const { error: sessionErr } = await supabase
    .from('sessions')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000');

  const { error: attemptsErr } = await supabase
    .from('question_attempts')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000');

  const { error: profileErr } = await supabase
    .from('profiles')
    .update({
      score: 0,
      status: 'waiting',
      time_started: null,
      time_ended: null,
      hints_used: 0,
      game_start_time: null,
      disqualified: false,
      game_finished: false,
      tries_remaining: 60,
    })
    .neq('id', '00000000-0000-0000-0000-000000000000');

  if (sessionErr || profileErr || attemptsErr) {
    return res.status(500).json({ error: sessionErr?.message || profileErr?.message || attemptsErr?.message });
  }
  res.json({ success: true, message: 'All sessions and scores reset.' });
});

// ── POST /admin/player/:id/reset — reset one player ─────────────────────────
router.post('/player/:id/reset', async (req, res) => {
  const { id } = req.params;

  await supabase.from('sessions').delete().eq('user_id', id);
  await supabase.from('question_attempts').delete().eq('user_id', id);
  await supabase.from('player_activity').delete().eq('user_id', id);

  await supabase.from('profiles').update({
    score: 0,
    status: 'waiting',
    time_started: null,
    time_ended: null,
    hints_used: 0,
    game_start_time: null,
    disqualified: false,
    game_finished: false,
    tries_remaining: 60,
  }).eq('id', id);

  res.json({ success: true });
});

// ── DELETE /admin/player/:id — remove player entirely ───────────────────────
router.delete('/player/:id', async (req, res) => {
  const { id } = req.params;
  await supabase.from('sessions').delete().eq('user_id', id);
  await supabase.from('question_attempts').delete().eq('user_id', id);
  await supabase.from('player_activity').delete().eq('user_id', id);
  const { error } = await supabase.from('profiles').delete().eq('id', id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

export default router;
