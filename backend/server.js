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
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-admin-secret']
}))
app.use(express.json({ limit: '10kb' }));

app.use('/auth',        authRoutes);
app.use('/game',        gameRoutes);
app.use('/scoreboard',  scoreboardRoutes);
app.use('/admin',       adminRoutes);

app.get('/health', (_, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

app.listen(process.env.PORT || 4000, () =>
  console.log(`🃏 Cryptic Hunt server running on port ${process.env.PORT || 4000}`)
);
