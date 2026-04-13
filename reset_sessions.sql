-- ── RESET all player sessions and profiles ───────────────────────
-- Run this in the Supabase SQL Editor to clear stale sessions.

DELETE FROM sessions;

UPDATE profiles
SET
  score            = 0,
  status           = 'waiting',
  time_started     = NULL,
  time_ended       = NULL,
  hints_used       = 0,
  eliminated       = false,
  elimination_reason = NULL,
  login_time       = NULL
WHERE TRUE;
