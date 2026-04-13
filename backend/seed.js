import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import dotenv from 'dotenv';
dotenv.config();

if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !process.env.FIREBASE_PRIVATE_KEY) {
  console.error('❌ Missing FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, or FIREBASE_PRIVATE_KEY in .env');
  process.exit(1);
}

const app = admin.initializeApp({
  credential: admin.credential.cert({
    projectId:   process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey:  process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  }),
});

const db = admin.firestore();

const questions = JSON.parse(readFileSync('./questions.json', 'utf8'));

console.log('🗑️  Deleting all existing questions...');

// Delete existing questions in batches
const existingSnap = await db.collection('questions').get();
if (!existingSnap.empty) {
  const batches = [];
  const docs    = existingSnap.docs;
  for (let i = 0; i < docs.length; i += 499) {
    const batch = db.batch();
    docs.slice(i, i + 499).forEach(doc => batch.delete(doc.ref));
    batches.push(batch.commit());
  }
  await Promise.all(batches);
}
console.log('✅ Deleted existing questions.');

// Normalize and convert to camelCase before seeding
const normalized = questions.map(q => ({
  suit:        q.suit,
  cardNumber:  q.card_number,    // snake_case → camelCase
  difficulty:  q.difficulty,
  round:       q.round,
  isWildcard:  q.is_wildcard,    // snake_case → camelCase
  maxTries:    q.max_tries,      // snake_case → camelCase
  question:    q.question,
  answers:     q.answers.map(a => a.trim().toLowerCase()),
  hints:       q.hints ?? [],
}));

console.log(`📦 Seeding ${normalized.length} questions...`);

// Insert in batches of 499
for (let i = 0; i < normalized.length; i += 499) {
  const batch = db.batch();
  normalized.slice(i, i + 499).forEach(q => {
    const ref = db.collection('questions').doc();
    batch.set(ref, q);
  });
  await batch.commit();
}

console.log(`✅ Successfully seeded ${normalized.length} questions.`);

// Summary by difficulty
const difficulties = ['easy', 'medium', 'hard'];
difficulties.forEach(d => {
  const count = normalized.filter(q => q.difficulty === d && !q.isWildcard).length;
  console.log(`   ${d}: ${count} questions`);
});
const wildcards = normalized.filter(q => q.isWildcard).length;
console.log(`   wildcard: ${wildcards} question(s)`);

process.exit(0);
