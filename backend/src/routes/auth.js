import express from 'express';
import { db, rtdb, auth } from '../firebase.js';

const router = express.Router();

/* ── POST /auth/register ─────────────────────────────────────────────
   Call this after Firebase client-side sign-up OR first Google sign-in.
   Creates the Firestore profile doc + RTDB leaderboard entry if needed.
   Body: { uid, name, email }
──────────────────────────────────────────────────────────────────── */
router.post('/register', async (req, res) => {
  try {
    const { uid, name, email } = req.body;
    if (!uid || !email) {
      return res.status(400).json({ error: 'uid and email are required.' });
    }

    const profileRef = db.collection('profiles').doc(uid);
    const profileDoc = await profileRef.get();

    if (!profileDoc.exists) {
      // Brand-new user — create profile doc
      await profileRef.set({
        name:              name || email.split('@')[0] || 'Initiate',
        email,
        score:             0,
        status:            'waiting',
        hintsUsed:         0,
        eliminated:        false,
        eliminationReason: null,
        timeStarted:       null,
        timeEnded:         null,
        loginTime:         null,
        gameFinished:      false,
        lastSeen:          null,
        logoutTime:        null,
        gameStartTime:     null,
        createdAt:         new Date().toISOString(),
      });

      // Mirror to RTDB leaderboard
      await rtdb.ref(`leaderboard/${uid}`).set({
        name:        name || email.split('@')[0] || 'Initiate',
        score:       0,
        status:      'waiting',
        timeStarted: null,
        timeEnded:   null,
      });

      return res.json({ success: true, created: true });
    }

    // Already exists — return existing profile (idempotent)
    return res.json({ success: true, created: false, profile: profileDoc.data() });
  } catch (err) {
    console.error('/auth/register error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

/* ── POST /auth/login ────────────────────────────────────────────────
   Verify the user exists in profiles and return profile data.
   The actual Firebase token is verified upstream by authMiddleware
   on protected routes; this endpoint is optional / for consistency.
   Body: { uid }
──────────────────────────────────────────────────────────────────── */
router.post('/login', async (req, res) => {
  try {
    const { uid } = req.body;
    if (!uid) return res.status(400).json({ error: 'uid is required.' });

    const profileDoc = await db.collection('profiles').doc(uid).get();
    if (!profileDoc.exists) {
      return res.status(404).json({ error: 'Profile not found. Please register first.' });
    }

    return res.json({ success: true, profile: profileDoc.data() });
  } catch (err) {
    console.error('/auth/login error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

/* ── GET /auth/status ────────────────────────────────────────────────
   Health-check / info endpoint.
──────────────────────────────────────────────────────────────────── */

router.get('/status', (req, res) => {
  res.json({ message: 'Auth is managed by Firebase. Use the frontend SDK.' });
});

export default router;

