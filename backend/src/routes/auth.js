import express from 'express';
const router = express.Router();

// Auth is handled entirely by Firebase SDK on the frontend.
// This route exists for health-check purposes.
router.get('/status', (req, res) => {
  res.json({ message: 'Auth is managed by Firebase. Use the frontend SDK.' });
});

export default router;
