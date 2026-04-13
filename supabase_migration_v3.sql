-- ================================================================
-- AMENTIS Cryptic Hunt 2026 — Migration v3
-- Run this in Supabase SQL Editor before deploying the new backend
-- ================================================================

-- FIX 3: Add last_seen and logout_time to profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS last_seen    TIMESTAMPTZ;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS logout_time  TIMESTAMPTZ;

-- FIX 4: Add first_seen_at and points_awarded to question_attempts
ALTER TABLE question_attempts ADD COLUMN IF NOT EXISTS first_seen_at   TIMESTAMPTZ;
ALTER TABLE question_attempts ADD COLUMN IF NOT EXISTS points_awarded  INT DEFAULT 0;

-- FIX 1: Ensure login_time and game_start_time exist (may already exist)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS login_time       TIMESTAMPTZ;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS game_start_time  TIMESTAMPTZ;

-- Optional: Index last_seen for admin queries
CREATE INDEX IF NOT EXISTS idx_profiles_last_seen ON profiles (last_seen DESC);
