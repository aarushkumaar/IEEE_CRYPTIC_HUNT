import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import authRoutes from './src/routes/auth.js';
import gameRoutes from './src/routes/game.js';
import scoreboardRoutes from './src/routes/scoreboard.js';
import adminRoutes from './src/routes/admin.js';

dotenv.config();

const app = express();

app.use(helmet());
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://ieee-cryptic-hunt.vercel.app',
  'https://ieee-cryptic-hunt-git-leclerc-chatles-leclerc-s-org.vercel.app',
  process.env.FRONTEND_URL
].filter(Boolean)

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-admin-secret'],
  credentials: true
}));

// Preflight requests (VERY IMPORTANT)
app.options("*", cors());

// Manual fallback for CORS
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  } else {
    // Default to production URL for safety if not strictly in whitelist
    res.header("Access-Control-Allow-Origin", "https://ieee-cryptic-hunt.vercel.app");
  }
  
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, x-admin-secret");
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

app.use(express.json({ limit: '10kb' }));

app.use('/auth',        authRoutes);
app.use('/game',        gameRoutes);
app.use('/scoreboard',  scoreboardRoutes);
app.use('/admin',       adminRoutes);

app.get('/health', (_, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

app.listen(process.env.PORT || 4000, () =>
  console.log(`🃏 Cryptic Hunt server running on port ${process.env.PORT || 4000}`)
);
