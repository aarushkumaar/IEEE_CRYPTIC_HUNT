import express from 'express';
import { adminAuth } from '../middleware/adminAuth.js';
import { db, rtdb, auth } from '../firebase.js';
import { getCache, setCache, invalidatePrefix } from '../cache.js';

const ADMIN_CACHE_TTL = 10_000; // 10 seconds
const ADMIN_CACHE_PREFIX = 'admin_';


const router = express.Router();
router.use(adminAuth);

// ── GET /admin/players — list all players with full data ─────────────────────
router.get('/players', async (req, res) => {
  try {
    const cached = getCache('admin_players', ADMIN_CACHE_TTL);
    if (cached) return res.json(cached);

    const snapshot = await db.collection('profiles').orderBy('score', 'desc').get();

    const enriched = snapshot.docs.map(doc => {
      const p = doc.data();
      // Map camelCase Firestore → snake_case API response (Admin.jsx expects these)
      return {
        id:               doc.id,
        name:             p.name               ?? '—',
        email:            p.email              ?? '—',
        score:            p.score              ?? 0,
        status:           p.status             ?? 'waiting',
        time_started:     p.timeStarted        ?? null,
        time_ended:       p.timeEnded          ?? null,
        hints_used:       p.hintsUsed          ?? 0,
        game_start_time:  p.gameStartTime      ?? null,
        login_time:       p.loginTime          ?? p.gameStartTime ?? null,
        last_seen:        p.lastSeen           ?? null,
        logout_time:      p.logoutTime         ?? null,
        disqualified:     p.eliminated         ?? false,  // map eliminated → disqualified
        game_finished:    p.gameFinished        ?? false,
        tries_remaining:  null,                           // not tracked in new schema
        created_at:       p.createdAt          ?? null,
        time_taken_seconds: p.timeStarted && p.timeEnded
          ? Math.floor((new Date(p.timeEnded) - new Date(p.timeStarted)) / 1000)
          : null,
      };
    });

    setCache('admin_players', enriched);
    res.json(enriched);
  } catch (err) {
    console.error('/admin/players error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// ── GET /admin/stats — live aggregate counts ─────────────────────────────────
router.get('/stats', async (req, res) => {
  try {
    const cached = getCache('admin_stats', ADMIN_CACHE_TTL);
    if (cached) return res.json(cached);

    const snapshot = await db.collection('profiles').get();
    const counts = { total: snapshot.size, playing: 0, passed: 0, failed: 0, waiting: 0, disqualified: 0, finished: 0 };

    snapshot.docs.forEach(doc => {
      const p = doc.data();
      if (p.status) counts[p.status] = (counts[p.status] || 0) + 1;
      if (p.eliminated)   counts.disqualified++;
      if (p.gameFinished) counts.finished++;
    });

    setCache('admin_stats', counts);
    res.json(counts);
  } catch (err) {
    console.error('/admin/stats error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// ── GET /admin/analytics — rich analytics from profiles + sessions ────────────
router.get('/analytics', async (req, res) => {
  try {
    const cached = getCache('admin_analytics', ADMIN_CACHE_TTL);
    if (cached) return res.json(cached);

    const [profilesSnap, sessionsSnap] = await Promise.all([
      db.collection('profiles').orderBy('score', 'desc').get(),
      db.collection('sessions').get(),
    ]);

    // Build session map keyed by userId
    const sessionMap = {};
    sessionsSnap.docs.forEach(doc => { sessionMap[doc.id] = doc.data(); });

    const rows = profilesSnap.docs.map(doc => {
      const p    = doc.data();
      const sess = sessionMap[doc.id] ?? null;
      const loginTime = p.loginTime ?? p.gameStartTime ?? null;

      return {
        id:                  doc.id,
        name:                p.name          ?? p.email ?? '—',
        email:               p.email         ?? '—',
        score:               p.score         ?? 0,
        status:              p.status,
        disqualified:        p.eliminated    ?? false,
        game_finished:       p.gameFinished  ?? false,
        tries_remaining:     null,
        game_entry_time:     p.gameStartTime ?? null,
        login_time:          loginTime,
        logout_time:         p.logoutTime    ?? null,
        last_seen:           p.lastSeen      ?? null,
        last_active:         p.lastSeen      ?? null,
        time_ended:          p.timeEnded     ?? null,
        current_round:       sess?.currentRound ?? null,
        current_index:       sess?.currentIndex ?? null,
        phase_scores:        sess?.phaseScores  ?? [0, 0, 0, 0],
        questions_completed: (sess?.phaseScores ?? []).reduce((a, b) => a + b, 0),
        questions_attempted: sess?.triesUsed ? sess.triesUsed.reduce((a, b) => a + b, 0) : 0,
        avg_time_per_q:      null,
      };
    });

    setCache('admin_analytics', rows);
    res.json(rows);
  } catch (err) {
    console.error('/admin/analytics error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// ── POST /admin/log-activity — no-op in Firebase (no activity table) ─────────
router.post('/log-activity', async (req, res) => {
  // Activity logging is not implemented in the Firebase schema.
  // This endpoint is kept for API compatibility with the frontend.
  res.json({ success: true });

});

// Helper for resetting
async function deleteCollection(collectionPath) {
  const collectionRef = db.collection(collectionPath);
  const query = collectionRef.limit(100);

  return new Promise((resolve, reject) => {
    deleteQueryBatch(db, query, resolve).catch(reject);
  });
}

async function deleteQueryBatch(db, query, resolve) {
  const snapshot = await query.get();

  const batchSize = snapshot.size;
  if (batchSize === 0) {
    resolve();
    return;
  }

  const batch = db.batch();
  snapshot.docs.forEach((doc) => {
    // protect the dummy id if necessary, or just delete all
    if (doc.id !== '00000000-0000-0000-0000-000000000000') {
      batch.delete(doc.ref);
    }
  });
  await batch.commit();

  process.nextTick(() => {
    deleteQueryBatch(db, query, resolve);
  });
}


// ── POST /admin/reset — reset ALL sessions and scores ────────────────────────
router.post('/reset', async (req, res) => {
  invalidatePrefix(ADMIN_CACHE_PREFIX); // stale after a global reset
  try {
    // 1. Reset all profiles using batch writes (Firestore batch limit = 500)
    const profilesSnap = await db.collection('profiles').get();
    const profileBatches = chunkArray(profilesSnap.docs, 499);

    for (const chunk of profileBatches) {
      const batch = db.batch();
      chunk.forEach(doc => {
        batch.update(doc.ref, {
          score:        0,
          status:       'waiting',
          timeStarted:  null,
          timeEnded:    null,
          hintsUsed:    0,
          gameStartTime: null,
          loginTime:    null,
          lastSeen:     null,
          logoutTime:   null,
          eliminated:   false,
          gameFinished: false,
          eliminationReason: null,
        });
      });
      await batch.commit();
    }

    // 2. Delete all sessions
    const sessionsSnap = await db.collection('sessions').get();
    const sessionBatches = chunkArray(sessionsSnap.docs, 499);

    for (const chunk of sessionBatches) {
      const batch = db.batch();
      chunk.forEach(doc => batch.delete(doc.ref));
      await batch.commit();
    }

    // 3. Reset RTDB leaderboard — preserve names, zero scores
    const leaderboardSnap = await rtdb.ref('leaderboard').get();
    if (leaderboardSnap.exists()) {
      const updates = {};
      Object.keys(leaderboardSnap.val()).forEach(uid => {
        updates[`leaderboard/${uid}/score`]       = 0;
        updates[`leaderboard/${uid}/status`]      = 'waiting';
        updates[`leaderboard/${uid}/timeStarted`] = null;
        updates[`leaderboard/${uid}/timeEnded`]   = null;
      });
      await rtdb.ref().update(updates);
    }

    res.json({ success: true, message: 'All sessions and scores reset.' });
  } catch (err) {
    console.error('/admin/reset error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// ── POST /admin/player/:id/reset — reset one player ─────────────────────────
router.post('/player/:id/reset', async (req, res) => {
  const { id } = req.params;
  try {
    await Promise.all([
      db.collection('sessions').doc(id).delete(),
      db.collection('profiles').doc(id).update({
        score:        0,
        status:       'waiting',
        timeStarted:  null,
        timeEnded:    null,
        hintsUsed:    0,
        gameStartTime: null,
        loginTime:    null,
        lastSeen:     null,
        logoutTime:   null,
        eliminated:   false,
        gameFinished: false,
        eliminationReason: null,
      }),
      rtdb.ref(`leaderboard/${id}`).update({ score: 0, status: 'waiting', timeStarted: null, timeEnded: null }),
    ]);
    invalidatePrefix(ADMIN_CACHE_PREFIX);
    res.json({ success: true });
  } catch (err) {
    console.error('/admin/player/:id/reset error:', err.message);
    res.status(500).json({ error: err.message });
  }

});

// ── DELETE /admin/player/:id — remove player entirely ───────────────────────
router.delete('/player/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Promise.all([
      db.collection('profiles').doc(id).delete(),
      db.collection('sessions').doc(id).delete(),
    ]);

    // Delete Firebase Auth user (best-effort)
    try { await auth.deleteUser(id); } catch { /* user may not exist in auth */ }

    // Delete from RTDB
    await rtdb.ref(`leaderboard/${id}`).remove();

    invalidatePrefix(ADMIN_CACHE_PREFIX);
    res.json({ success: true });
  } catch (err) {
    console.error('/admin/player/:id delete error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

/* ── Helper: chunk array into batches of N ─────────────────────────── */
function chunkArray(arr, size) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

export default router;

