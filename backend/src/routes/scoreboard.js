import express from 'express';
import { supabase } from '../supabaseAdmin.js';

const router = express.Router();

// GET /scoreboard — public leaderboard
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, name, score, status, time_started, time_ended, hints_used')
      .order('score', { ascending: false });

    if (error) return res.status(500).json({ error: error.message });

    // Compute rank and time_taken client-side
    const ranked = data.map((p, i) => ({
      ...p,
      rank: i + 1,
      time_taken_seconds: p.time_started && p.time_ended
        ? Math.floor((new Date(p.time_ended) - new Date(p.time_started)) / 1000)
        : null,
    }));

    res.json(ranked);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
