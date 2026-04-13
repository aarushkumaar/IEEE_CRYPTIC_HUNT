import express from 'express';
import { adminAuth } from '../middleware/adminAuth.js';
import { db } from '../firebase.js';

const router = express.Router();
router.use(adminAuth);

// ── GET /admin/players — list all players with full data ─────────────────────
router.get('/players', async (req, res) => {
  try {
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
  }
});

// ── GET /admin/stats — live aggregate counts ─────────────────────────────────
router.get('/stats', async (req, res) => {
  try {
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
  }
});

// ── GET /admin/analytics — rich analytics with attempt data ──────────────────
router.get('/analytics', async (req, res) => {
  try {
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

    await db.collection('player_activity').add({ user_id: userId, page, timestamp: new Date().toISOString() });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
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
});

// ── DELETE /admin/player/:id — remove player entirely ───────────────────────
router.delete('/player/:id', async (req, res) => {
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
  }
});

export default router;
