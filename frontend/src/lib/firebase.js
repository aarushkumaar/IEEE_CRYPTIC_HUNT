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

export const firebaseAuth = getAuth(app);
export const firestore    = getFirestore(app);
export const rtdb         = getDatabase(app);

// Aliases for any files that use the shorter names
export const auth       = firebaseAuth;
export const db         = firestore;
export const realtimeDb = rtdb;

export default app;
