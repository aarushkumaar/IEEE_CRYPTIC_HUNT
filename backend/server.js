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
  "http://localhost:5173",
  "https://ieee-cryptic-hunt.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow Postman / curl

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("CORS not allowed for this origin"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "x-admin-secret"],
  credentials: true
}));

app.options("*", cors());

app.use(express.json({ limit: '10kb' }));

app.use('/auth',        authRoutes);
app.use('/game',        gameRoutes);
app.use('/scoreboard',  scoreboardRoutes);
app.use('/admin',       adminRoutes);

app.get('/health', (_, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

app.listen(process.env.PORT || 4000, () =>
  console.log(`🃏 Cryptic Hunt server running on port ${process.env.PORT || 4000}`)
);
