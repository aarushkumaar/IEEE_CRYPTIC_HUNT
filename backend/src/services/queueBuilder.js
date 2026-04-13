import { db } from '../firebase.js';

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

async function getRandomQuestions(round, count) {
  const snap = await db.collection('questions').where('round', '==', round).get();

  if (snap.empty || snap.size < count) {
    throw new Error(`Not enough questions for round ${round}. Need ${count}, found ${snap.size}.`);
  }

  const ids = snap.docs.map(d => d.id);
  return shuffle(ids).slice(0, count);
}

export async function buildQueue(userId) {
  // 5 questions per round, 4 rounds = 20 total
  const [r1, r2, r3, r4] = await Promise.all([
    getRandomQuestions(1, 5),
    getRandomQuestions(2, 5),
    getRandomQuestions(3, 5),
    getRandomQuestions(4, 5),
  ]);

  const queue = [...r1, ...r2, ...r3, ...r4];

  await db.collection('sessions').doc(userId).set({
    user_id:       userId,
    queue,
    current_index: 0,
    current_round: 1,
    phase_scores:  [0, 0, 0, 0],
    created_at:    new Date().toISOString(),
  });

  return queue;
}
