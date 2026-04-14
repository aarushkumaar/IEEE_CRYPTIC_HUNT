import express from 'express';
import { db } from '../firebase.js';

const router = express.Router();

// GET /scoreboard — public leaderboard
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('profiles').orderBy('score', 'desc').get();

    // Map camelCase Firestore → snake_case response (Leaderboard.jsx expects these names)
    const ranked = snapshot.docs.map((doc, i) => {
      const p = doc.data();
      return {
        id:           doc.id,
        name:         p.name        ?? '—',
        score:        p.score       ?? 0,
        status:       p.status      ?? 'waiting',
        time_started: p.timeStarted ?? null,
        time_ended:   p.timeEnded   ?? null,
        hints_used:   p.hintsUsed   ?? 0,
        rank:         i + 1,

        time_taken_seconds: p.timeStarted && p.timeEnded
          ? Math.floor((new Date(p.timeEnded) - new Date(p.timeStarted)) / 1000)
          : null,
      };
    });

    res.json(ranked);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
