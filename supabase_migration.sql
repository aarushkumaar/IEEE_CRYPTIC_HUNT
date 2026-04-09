-- ============================================================
-- AMENTIS Cryptic Hunt 2026 — Database Migration
-- Run this in: Supabase Dashboard → SQL Editor
-- ============================================================

-- 1. Add new columns to profiles
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS game_start_time   TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS disqualified      BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS game_finished     BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS tries_remaining   INT     DEFAULT 60;

-- 2. Create question_attempts table (tracks per-question attempt counts)
CREATE TABLE IF NOT EXISTS question_attempts (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  question_id     UUID NOT NULL,
  attempt_number  INT  NOT NULL DEFAULT 1,
  correct         BOOLEAN NOT NULL DEFAULT FALSE,
  time_taken_seconds INT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create player_activity table (tracks page visits for analytics)
CREATE TABLE IF NOT EXISTS player_activity (
  id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id   UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  page      TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Indexes on frequently queried columns
CREATE INDEX IF NOT EXISTS idx_sessions_user_id                ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_created_at             ON sessions(created_at);
CREATE INDEX IF NOT EXISTS idx_question_attempts_user_question ON question_attempts(user_id, question_id);
CREATE INDEX IF NOT EXISTS idx_question_attempts_user_id       ON question_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_question_attempts_created_at    ON question_attempts(created_at);
CREATE INDEX IF NOT EXISTS idx_player_activity_user_id         ON player_activity(user_id);
CREATE INDEX IF NOT EXISTS idx_player_activity_timestamp       ON player_activity(timestamp);

-- 5. Enable Row Level Security
ALTER TABLE profiles          ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions          ENABLE ROW LEVEL SECURITY;
ALTER TABLE question_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE player_activity   ENABLE ROW LEVEL SECURITY;

-- 6. RLS Policies — profiles
DROP POLICY IF EXISTS "users_own_profile_select" ON profiles;
DROP POLICY IF EXISTS "users_own_profile_update" ON profiles;
CREATE POLICY "users_own_profile_select" ON profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "users_own_profile_update" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- 7. RLS Policies — sessions (users read-only; service role writes)
DROP POLICY IF EXISTS "users_own_session_select" ON sessions;
CREATE POLICY "users_own_session_select" ON sessions
  FOR SELECT USING (auth.uid() = user_id);

-- 8. RLS Policies — question_attempts
DROP POLICY IF EXISTS "users_own_attempts" ON question_attempts;
CREATE POLICY "users_own_attempts" ON question_attempts
  FOR ALL USING (auth.uid() = user_id);

-- 9. RLS Policies — player_activity
DROP POLICY IF EXISTS "users_own_activity" ON player_activity;
CREATE POLICY "users_own_activity" ON player_activity
  FOR ALL USING (auth.uid() = user_id);
