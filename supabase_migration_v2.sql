-- ── CHANGE 2: Cryptic Hunt 2026 Schema Migration ─────────────────────────
-- Run this in the Supabase SQL Editor BEFORE running seed.js

-- sessions table
ALTER TABLE sessions
  ADD COLUMN IF NOT EXISTS tries_used INT[] DEFAULT '{0,0,0,0,0,0,0,0,0,0,0,0,0}',
  ADD COLUMN IF NOT EXISTS eliminated_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS elimination_reason TEXT;

-- profiles table
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS eliminated BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS elimination_reason TEXT,
  ADD COLUMN IF NOT EXISTS login_time TIMESTAMPTZ;

-- questions table
ALTER TABLE questions
  ADD COLUMN IF NOT EXISTS max_tries INT DEFAULT 2;
