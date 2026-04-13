import express from 'express';
import { db } from '../firebase.js';

const router = express.Router();

// GET /scoreboard — public leaderboard
router.get('/', async (req, res) => {
  try {
    const snapshot = await db
      .collection('profiles')
      .orderBy('score', 'desc')
      .get();

    const ranked = snapshot.docs.map((doc, i) => {
      const p = doc.data();
      return {
        id: doc.id,
        name: p.name,
        score: p.score,
        status: p.status,
        time_started: p.timeStarted,
        time_ended: p.timeEnded,
        hints_used: p.hintsUsed,
        rank: i + 1,
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