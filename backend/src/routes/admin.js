import express from 'express';
import { adminAuth } from '../middleware/adminAuth.js';
<<<<<<< Updated upstream
import { db } from '../firebase.js';
=======
import { db, rtdb, auth } from '../firebase.js';
>>>>>>> Stashed changes

const router = express.Router();
router.use(adminAuth);

// ── GET /admin/players — list all players with full data ─────────────────────
router.get('/players', async (req, res) => {
  try {
<<<<<<< Updated upstream
    const snap = await db.collection('profiles').orderBy('score', 'desc').get();
    const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));

    const enriched = data.map(p => ({
      ...p,
      time_taken_seconds: p.time_started && p.time_ended
        ? Math.floor((new Date(p.time_ended) - new Date(p.time_started)) / 1000)
        : null,
    }));

    res.json(enriched);
  } catch (error) {
    res.status(500).json({ error: error.message });
=======
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

    res.json(enriched);
  } catch (err) {
    console.error('/admin/players error:', err.message);
    res.status(500).json({ error: err.message });
>>>>>>> Stashed changes
  }
});

// ── GET /admin/stats — live aggregate counts ─────────────────────────────────
router.get('/stats', async (req, res) => {
  try {
<<<<<<< Updated upstream
    const snap = await db.collection('profiles').get();
    const data = snap.docs.map(d => d.data());

    const counts = { total: data.length, playing: 0, passed: 0, failed: 0, waiting: 0, disqualified: 0, finished: 0 };
    data.forEach(p => {
      counts[p.status] = (counts[p.status] || 0) + 1;
      if (p.disqualified) counts.disqualified++;
      if (p.game_finished) counts.finished++;
    });
    res.json(counts);
  } catch (error) {
    res.status(500).json({ error: error.message });
=======
    const snapshot = await db.collection('profiles').get();
    const counts = { total: snapshot.size, playing: 0, passed: 0, failed: 0, waiting: 0, disqualified: 0, finished: 0 };

    snapshot.docs.forEach(doc => {
      const p = doc.data();
      if (p.status) counts[p.status] = (counts[p.status] || 0) + 1;
      if (p.eliminated)   counts.disqualified++;
      if (p.gameFinished) counts.finished++;
    });

    res.json(counts);
  } catch (err) {
    console.error('/admin/stats error:', err.message);
    res.status(500).json({ error: err.message });
>>>>>>> Stashed changes
  }
});

// ── GET /admin/analytics — rich analytics from profiles + sessions ────────────
router.get('/analytics', async (req, res) => {
  try {
<<<<<<< Updated upstream
    const profilesSnap = await db.collection('profiles').orderBy('score', 'desc').get();
    const profiles = profilesSnap.docs.map(d => ({ id: d.id, ...d.data() }));

    const sessionsSnap = await db.collection('sessions').get();
    const sessions = sessionsSnap.docs.map(d => d.data());

    const attemptsSnap = await db.collection('question_attempts').get();
    const attempts = attemptsSnap.docs.map(d => d.data());

    const activitiesSnap = await db.collection('player_activity').orderBy('timestamp', 'desc').get();
    const activities = activitiesSnap.docs.map(d => d.data());

    const sessionMap  = Object.fromEntries(sessions.map(s => [s.user_id, s]));
    const activityMap = {};
    activities.forEach(a => {
      if (!activityMap[a.user_id]) activityMap[a.user_id] = a.timestamp;
    });

    const attemptsMap = {};
    attempts.forEach(a => {
      if (!attemptsMap[a.user_id]) attemptsMap[a.user_id] = { total: 0, correct: 0, totalTime: 0 };
      attemptsMap[a.user_id].total++;
      if (a.correct) attemptsMap[a.user_id].correct++;
      if (a.time_taken_seconds) attemptsMap[a.user_id].totalTime += a.time_taken_seconds;
    });

    const rows = profiles.map(p => {
      const sess   = sessionMap[p.id]  ?? null;
      const agg    = attemptsMap[p.id] ?? { total: 0, correct: 0, totalTime: 0 };
      const avgTime = agg.total > 0 ? Math.round(agg.totalTime / agg.total) : null;
=======
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
>>>>>>> Stashed changes

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

    res.json(rows);
  } catch (err) {
    console.error('/admin/analytics error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// ── POST /admin/log-activity — no-op in Firebase (no activity table) ─────────
router.post('/log-activity', async (req, res) => {
<<<<<<< Updated upstream
  try {
    const { userId, page } = req.body;
    if (!userId || !page) return res.status(400).json({ error: 'userId and page are required.' });

    await db.collection('player_activity').add({ user_id: userId, page, timestamp: new Date().toISOString() });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
=======
  // Activity logging is not implemented in the Firebase schema.
  // This endpoint is kept for API compatibility with the frontend.
  res.json({ success: true });
>>>>>>> Stashed changes
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
  try {
<<<<<<< Updated upstream
    await deleteCollection('sessions');
    await deleteCollection('question_attempts');

    const profilesSnap = await db.collection('profiles').get();
    const batch = db.batch();
    profilesSnap.docs.forEach(doc => {
      if (doc.id !== '00000000-0000-0000-0000-000000000000') {
        batch.update(doc.ref, {
          score: 0,
          status: 'waiting',
          time_started: null,
          time_ended: null,
          hints_used: 0,
          game_start_time: null,
          disqualified: false,
          game_finished: false,
          tries_remaining: 60,
        });
      }
    });
    await batch.commit();

    res.json({ success: true, message: 'All sessions and scores reset.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── POST /admin/player/:id/reset — reset one player ─────────────────────────
router.post('/player/:id/reset', async (req, res) => {
  try {
    const { id } = req.params;

    await db.collection('sessions').doc(id).delete();
    
    const attemptsSnap = await db.collection('question_attempts').where('user_id', '==', id).get();
    const batchList = [];
    let currentBatch = db.batch();
    attemptsSnap.docs.forEach((doc, idx) => {
      currentBatch.delete(doc.ref);
      if ((idx + 1) % 500 === 0) {
        batchList.push(currentBatch.commit());
        currentBatch = db.batch();
      }
    });
    await currentBatch.commit();
    await Promise.all(batchList);

    const activitySnap = await db.collection('player_activity').where('user_id', '==', id).get();
    currentBatch = db.batch();
    activitySnap.docs.forEach((doc) => {
      currentBatch.delete(doc.ref);
    });
    await currentBatch.commit();

    await db.collection('profiles').doc(id).update({
      score: 0,
      status: 'waiting',
      time_started: null,
      time_ended: null,
      hints_used: 0,
      game_start_time: null,
      disqualified: false,
      game_finished: false,
      tries_remaining: 60,
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
=======
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
    res.json({ success: true });
  } catch (err) {
    console.error('/admin/player/:id/reset error:', err.message);
    res.status(500).json({ error: err.message });
  }
>>>>>>> Stashed changes
});

// ── DELETE /admin/player/:id — remove player entirely ───────────────────────
router.delete('/player/:id', async (req, res) => {
<<<<<<< Updated upstream
  try {
    const { id } = req.params;
    await db.collection('sessions').doc(id).delete();
    
    // delete attempts
    const attemptsSnap = await db.collection('question_attempts').where('user_id', '==', id).get();
    const batch = db.batch();
    attemptsSnap.docs.forEach(doc => batch.delete(doc.ref));
    await batch.commit();

    // delete activity
    const activitySnap = await db.collection('player_activity').where('user_id', '==', id).get();
    const actBatch = db.batch();
    activitySnap.docs.forEach(doc => actBatch.delete(doc.ref));
    await actBatch.commit();

    await db.collection('profiles').doc(id).delete();
    res.json({ success: true });
  } catch(error) {
    res.status(500).json({ error: error.message });
=======
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

    res.json({ success: true });
  } catch (err) {
    console.error('/admin/player/:id delete error:', err.message);
    res.status(500).json({ error: err.message });
>>>>>>> Stashed changes
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
