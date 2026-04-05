import express from 'express';
const router = express.Router();

// Auth is handled entirely by Supabase SDK on the frontend.
// This route exists for health-check purposes.
router.get('/status', (req, res) => {
  res.json({ message: 'Auth is managed by Supabase. Use the frontend SDK.' });
});

export default router;
