import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY            || "AIzaSyAGI_GSzOTBiVO9tLf8RvUWOtncUf0cy3E",
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN        || "cryptichunt-9f97c.firebaseapp.com",
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID         || "cryptichunt-9f97c",
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET     || "cryptichunt-9f97c.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "460303612317",
  appId:             import.meta.env.VITE_FIREBASE_APP_ID             || "1:460303612317:web:bbc795adc5b64616715774",
  databaseURL:       import.meta.env.VITE_FIREBASE_DATABASE_URL       || "https://cryptichunt-9f97c-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);

export const auth        = getAuth(app);
export const db          = getFirestore(app);
export const realtimeDb  = getDatabase(app);

// Legacy aliases kept for any older imports
export const firebaseAuth = auth;
export const firestore    = db;
export const rtdb         = realtimeDb;

export default app;
