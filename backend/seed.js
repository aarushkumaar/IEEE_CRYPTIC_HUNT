import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import dotenv from 'dotenv';
dotenv.config();

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env');
  process.exit(1);
}

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const questions = JSON.parse(readFileSync('./questions.json', 'utf8'));

console.log(`📦 Seeding ${questions.length} questions...`);

// Normalize all answers to lowercase before seeding
const normalized = questions.map(q => ({
  ...q,
  answers: q.answers.map(a => a.trim().toLowerCase()),
}));

const { data, error } = await supabase.from('questions').insert(normalized);

if (error) {
  console.error('❌ Seed failed:', error.message);
  process.exit(1);
}

console.log(`✅ Successfully seeded ${questions.length} questions.`);

// Summary by round
const rounds = [1, 2, 3, 4];
rounds.forEach(r => {
  const count = questions.filter(q => q.round === r).length;
  console.log(`   Round ${r}: ${count} questions`);
});
