import { auth } from '../firebase.js';
<<<<<<< Updated upstream
import dotenv from 'dotenv';
dotenv.config();
=======
>>>>>>> Stashed changes

export async function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const decoded = await auth.verifyIdToken(token);
<<<<<<< Updated upstream
    req.user = { id: decoded.uid, email: decoded.email, ...decoded };
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
=======
    req.user = decoded; // decoded.uid is the user ID
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
>>>>>>> Stashed changes
  }
}
