import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import dotenv from 'dotenv';
dotenv.config();

if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !process.env.FIREBASE_PRIVATE_KEY) {
  console.error('❌ Missing FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, or FIREBASE_PRIVATE_KEY in .env');
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  }),
});

const db = admin.firestore();

const raw = JSON.parse(readFileSync('./questions.json', 'utf8'));

/* ── Flatten the nested JSON into a plain array ──────────────────── */
const flat = [];

// easy / medium / hard → keyed by suit
const PHASES = ['easy', 'medium', 'hard'];
const { suit_to_category } = raw.selection_logic;

for (const difficulty of PHASES) {
  const bysuit = raw[difficulty]; // { spades: [...], hearts: [...], ... }
  for (const [suit, qs] of Object.entries(bysuit)) {
    for (const q of qs) {
      flat.push({
        ...q,
        suit,
        category: suit_to_category[suit],
      });
    }
  }
}

// wildcards — already a flat array with their own category field
for (const q of raw.wildcard) {
  flat.push({ ...q, suit: null });
}

/* ── Normalise to camelCase ──────────────────────────────────────── */
const normalized = flat.map(q => ({
  suit: q.suit ?? null,
  category: q.category ?? null,
  cardNumber: q.card_number,
  difficulty: q.difficulty,
  round: q.round,
  isWildcard: q.is_wildcard,
  maxTries: q.max_tries,
  question: q.question,
  answers: q.answers.map(a => a.trim().toLowerCase()),
  hints: q.hints ?? [],
}));

/* ── Wipe existing collection ────────────────────────────────────── */
console.log('🗑️  Deleting all existing questions...');
const existingSnap = await db.collection('questions').get();
if (!existingSnap.empty) {
  const batches = [];
  const docs = existingSnap.docs;
  for (let i = 0; i < docs.length; i += 499) {
    const batch = db.batch();
    docs.slice(i, i + 499).forEach(doc => batch.delete(doc.ref));
    batches.push(batch.commit());
  }
  await Promise.all(batches);
}
console.log('✅ Deleted existing questions.');

/* ── Seed in batches of 499 ─────────────────────────────────────── */
console.log(`📦 Seeding ${normalized.length} questions...`);
for (let i = 0; i < normalized.length; i += 499) {
  const batch = db.batch();
  normalized.slice(i, i + 499).forEach(q => {
    batch.set(db.collection('questions').doc(), q);
  });
  await batch.commit();
}
console.log(`✅ Successfully seeded ${normalized.length} questions.`);

/* ── Summary ─────────────────────────────────────────────────────── */
const SUITS = ['spades', 'hearts', 'diamonds', 'clubs'];
for (const difficulty of PHASES) {
  for (const suit of SUITS) {
    const count = normalized.filter(q => q.difficulty === difficulty && q.suit === suit).length;
    console.log(`   ${difficulty} / ${suit}: ${count} question(s)`);
  }
}
const wildcards = normalized.filter(q => q.isWildcard).length;
console.log(`   wildcard: ${wildcards} question(s)`);

process.exit(0);
