import { db } from '../firebase.js';

/* ── Fisher-Yates shuffle ──────────────────────────────────────────── */
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const SUITS = ['spades', 'hearts', 'diamonds', 'clubs'];

/* ── Pick 1 random question for a specific difficulty + suit ─────── */
async function getOneBySuit(difficulty, suit) {
  const snapshot = await db.collection('questions')
    .where('difficulty', '==', difficulty)
    .where('isWildcard', '==', false)
    .where('suit', '==', suit)
    .get();

  if (snapshot.empty) {
    throw new Error(`No ${difficulty} questions found for suit "${suit}".`);
  }

  const ids = snapshot.docs.map(doc => doc.id);
  return shuffle(ids)[0]; // pick 1 at random
}

/* ── Pick 1 random wildcard question ────────────────────────────── */
async function getOneWildcard() {
  const snapshot = await db.collection('questions')
    .where('isWildcard', '==', true)
    .get();

  if (snapshot.empty) {
    throw new Error('No wildcard questions found.');
  }

  const ids = snapshot.docs.map(doc => doc.id);
  return shuffle(ids)[0];
}

/* ── Build 13-element queue: 4 easy + 4 medium + 4 hard + 1 wildcard ─
   Selection: 1 random per suit per difficulty phase,
              1 random from the full wildcard pool.              ──── */
export async function buildQueue(userId) {
  // Fire all suit queries for every phase in parallel
  const [easyIds, mediumIds, hardIds, wildcardId] = await Promise.all([
    Promise.all(SUITS.map(suit => getOneBySuit('easy', suit))),
    Promise.all(SUITS.map(suit => getOneBySuit('medium', suit))),
    Promise.all(SUITS.map(suit => getOneBySuit('hard', suit))),
    getOneWildcard(),
  ]);

  // Order: easy(♠♥♦♣) → medium(♠♥♦♣) → hard(♠♥♦♣) → wildcard
  const queue = [...easyIds, ...mediumIds, ...hardIds, wildcardId];
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

