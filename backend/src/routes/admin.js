import express from 'express';
import { adminAuth } from '../middleware/adminAuth.js';
import { supabase } from '../supabaseAdmin.js';

const router = express.Router();
router.use(adminAuth);

// GET /admin/players — list all players with full data
router.get('/players', async (req, res) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
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

// GET /admin/stats — live aggregate counts
router.get('/stats', async (req, res) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('status');

  if (error) return res.status(500).json({ error: error.message });

  const counts = { total: data.length, playing: 0, passed: 0, failed: 0, waiting: 0 };
  data.forEach(p => { counts[p.status] = (counts[p.status] || 0) + 1; });
  res.json(counts);
});

// POST /admin/reset — reset ALL sessions and scores
router.post('/reset', async (req, res) => {
  const { error: sessionErr } = await supabase
    .from('sessions')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000');

  const { error: profileErr } = await supabase
    .from('profiles')
    .update({ score: 0, status: 'waiting', time_started: null, time_ended: null, hints_used: 0 })
    .neq('id', '00000000-0000-0000-0000-000000000000');

  if (sessionErr || profileErr) {
    return res.status(500).json({ error: sessionErr?.message || profileErr?.message });
  }
  res.json({ success: true, message: 'All sessions and scores reset.' });
});

// POST /admin/player/:id/reset — reset one player
router.post('/player/:id/reset', async (req, res) => {
  const { id } = req.params;
  await supabase.from('sessions').delete().eq('user_id', id);
  await supabase.from('profiles').update({
    score: 0, status: 'waiting', time_started: null, time_ended: null, hints_used: 0
  }).eq('id', id);
  res.json({ success: true });
});

// DELETE /admin/player/:id — remove player entirely
router.delete('/player/:id', async (req, res) => {
  const { id } = req.params;
  await supabase.from('sessions').delete().eq('user_id', id);
  const { error } = await supabase.from('profiles').delete().eq('id', id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

export default router;
