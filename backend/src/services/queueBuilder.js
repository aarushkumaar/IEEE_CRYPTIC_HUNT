import { db } from '../firebase.js';

/* ── Fisher-Yates shuffle ──────────────────────────────────────────── */
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/* ── Fetch questions by difficulty (Firestore) ───────────────────── */
async function getByDifficulty(difficulty, is_wildcard, needed) {
  const snapshot = await db.collection('questions')
    .where('difficulty', '==', difficulty)
    .where('isWildcard', '==', is_wildcard)
    .get();

  if (snapshot.empty || snapshot.docs.length < needed) {
    throw new Error(
      `Not enough ${difficulty} questions (wildcard=${is_wildcard}). ` +
      `Need ${needed}, found ${snapshot.docs.length}.`
    );
  }

  const ids = snapshot.docs.map(doc => doc.id);
  return shuffle(ids).slice(0, needed);

}

/* ── Build 13-element queue: 4 easy + 4 medium + 4 hard + 1 wildcard ─ */
export async function buildQueue(userId) {
  const [easy, medium, hard, wildcard] = await Promise.all([
    getByDifficulty('easy',   false, 4),
    getByDifficulty('medium', false, 4),
    getByDifficulty('hard',   false, 4),
    getByDifficulty('hard',   true,  1),  // wildcard questions have difficulty=hard
  ]);

  const queue     = [...easy, ...medium, ...hard, ...wildcard];
  const triesUsed = new Array(13).fill(0);

  await db.collection('sessions').doc(userId).set({
    queue,
    currentIndex: 0,
    currentRound: 1,
    triesUsed,
    phaseScores: [0, 0, 0, 0],
  }, { merge: true });


  return queue;
}

