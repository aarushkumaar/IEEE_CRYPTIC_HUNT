# Cryptic Hunt 2026 — IEEE GTBIT

A 12-hour online technical puzzle competition platform inspired by Alice in Borderland.

---

## Tech Stack
| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite 5 + TailwindCSS 3 + Three.js |
| Backend | Node.js 20 + Express 4 |
| Database | Supabase (PostgreSQL 15) |
| Auth | Supabase Auth (email + password, JWT) |
| Realtime | Supabase Realtime |
| Frontend Host | Vercel |
| Backend Host | Render |

---

## Quick Start

### 1. Clone the repo
```bash
git clone <your-repo-url>
cd IEEE_CRYPTIC_HUNT
```

### 2. Set up Supabase
1. Create a project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the entire schema below
3. Copy your **Project URL**, **Anon Key**, and **Service Role Key** from Settings → API

### 3. Configure env vars

**backend/.env**
```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ADMIN_SECRET=choose-a-strong-random-string
PORT=4000
FRONTEND_URL=https://your-frontend.vercel.app
PASS_THRESHOLD=10
```

**frontend/.env**
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_API_URL=http://localhost:4000
VITE_ADMIN_SECRET=choose-a-strong-random-string
```

### 4. Install dependencies
```bash
# Backend
cd backend && npm install

# Frontend
cd ../frontend && npm install
```

### 5. Seed the database
```bash
cd backend
node seed.js
```

### 6. Run locally
```bash
# Terminal 1 — Backend
cd backend && npm run dev

# Terminal 2 — Frontend
cd frontend && npm run dev
```

---

## Database Schema

Run this entire block in **Supabase → SQL Editor**:

```sql
-- ── PROFILES ─────────────────────────────────────────────────────────
CREATE TABLE profiles (
  id              UUID REFERENCES auth.users PRIMARY KEY,
  name            TEXT NOT NULL,
  score           INT  DEFAULT 0,
  time_started    TIMESTAMPTZ,
  time_ended      TIMESTAMPTZ,
  hints_used      INT  DEFAULT 0,
  status          TEXT DEFAULT 'waiting'
                  CHECK (status IN ('waiting','playing','passed','failed'))
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ── QUESTIONS ─────────────────────────────────────────────────────────
CREATE TABLE questions (
  id          UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
  suit        TEXT    NOT NULL CHECK (suit IN ('spades','hearts','diamonds','clubs')),
  card_number INT     NOT NULL CHECK (card_number BETWEEN 1 AND 13),
  difficulty  TEXT    NOT NULL CHECK (difficulty IN ('easy','medium','hard')),
  round       INT     NOT NULL CHECK (round BETWEEN 1 AND 4),
  is_wildcard BOOLEAN DEFAULT false,
  question    TEXT    NOT NULL,
  answers     TEXT[]  NOT NULL,
  hints       TEXT[]  DEFAULT '{}'
);

-- ── SESSIONS ──────────────────────────────────────────────────────────
CREATE TABLE sessions (
  id             UUID  PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        UUID  REFERENCES profiles(id) UNIQUE,
  queue          UUID[] NOT NULL,
  current_index  INT   DEFAULT 0,
  current_round  INT   DEFAULT 1,
  phase_scores   INT[] DEFAULT '{0,0,0,0}',
  completed_at   TIMESTAMPTZ
);

-- ── ROW LEVEL SECURITY ────────────────────────────────────────────────
ALTER TABLE profiles  ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions  ENABLE ROW LEVEL SECURITY;

-- Profiles: players read/write only their own row
CREATE POLICY "player_own_profile"
  ON profiles FOR ALL USING (auth.uid() = id);

-- Public leaderboard read
CREATE POLICY "public_leaderboard"
  ON profiles FOR SELECT USING (true);

-- Sessions: players read/write only their own session
CREATE POLICY "player_own_session"
  ON sessions FOR ALL USING (auth.uid() = user_id);

-- Questions: NO player access (backend uses service role key)
-- (no policy = no access for authenticated users)

-- ── LEADERBOARD VIEW ─────────────────────────────────────────────────
CREATE VIEW leaderboard AS
  SELECT
    p.id, p.name, p.score, p.status,
    EXTRACT(EPOCH FROM (p.time_ended - p.time_started))::INT AS time_taken_seconds,
    p.hints_used,
    RANK() OVER (ORDER BY p.score DESC,
                 (p.time_ended - p.time_started) ASC NULLS LAST) AS rank
  FROM profiles p
  ORDER BY rank;

-- Enable Realtime on profiles table
ALTER PUBLICATION supabase_realtime ADD TABLE profiles;
```

---

## Deployment

### Backend → Render
1. Push `backend/` folder to GitHub
2. New Web Service → Connect repo
3. **Build command:** `npm install`
4. **Start command:** `node seed.js && node server.js` *(first deploy only — change to just `node server.js` after)*
5. Add all env vars from `backend/.env`

### Frontend → Vercel
1. Push `frontend/` folder to GitHub
2. Import → select **Vite** framework
3. Add all env vars from `frontend/.env` (use production values)
4. Deploy

### Post-deployment
- Update `FRONTEND_URL` in backend env to your Vercel URL
- Update `VITE_API_URL` in frontend env to your Render URL
- Re-deploy both

---

## Scoring Rules
| Action | Points |
|---|---|
| Correct answer | +1 |
| Wrong answer | 0 (no penalty) |
| Skip | −1 (floor at 0) |
| Pass threshold | ≥ 10 / 20 correct |
| Tiebreaker | Time taken (lower = better) |

## Admin Panel
- URL: `/admin`
- Password: `VITE_ADMIN_SECRET` value
- Features: live player table, per-player reset/delete, global reset (double-confirm), Excel export

---

## Security Notes
- Answers **never** sent to client — only checked server-side with service role key
- Sessions stored server-side; refreshing the page resumes from the last question
- Rate limiting on `/game/answer` (1 req / 2 seconds)
- Admin secret validated server-side on every admin API call

---

Built for **IEEE GTBIT Student Branch · Cryptic Hunt 2026**
