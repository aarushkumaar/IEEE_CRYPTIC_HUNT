import { supabase } from '../supabaseAdmin.js';

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

async function getRandomQuestions(round, count) {
  const { data, error } = await supabase
    .from('questions')
    .select('id')
    .eq('round', round);

  if (error) throw new Error(`DB error for round ${round}: ${error.message}`);
  if (!data || data.length < count) {
    throw new Error(`Not enough questions for round ${round}. Need ${count}, found ${data?.length ?? 0}.`);
  }

  return shuffle(data).slice(0, count).map(q => q.id);
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

  const { error } = await supabase
    .from('sessions')
    .upsert({ user_id: userId, queue, current_index: 0, current_round: 1 });

  if (error) throw new Error(`Failed to create session: ${error.message}`);
  return queue;
}
