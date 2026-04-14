import { auth } from '../firebase.js';


export async function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const decoded = await auth.verifyIdToken(token);
    req.user = decoded; // decoded.uid is the user ID
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });

  }
}

