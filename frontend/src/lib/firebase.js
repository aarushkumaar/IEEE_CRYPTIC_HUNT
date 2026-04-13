import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey:            "AIzaSyAGI_GSzOTBiVO9tLf8RvUWOtncUf0cy3E",
  authDomain:        "cryptichunt-9f97c.firebaseapp.com",
  projectId:         "cryptichunt-9f97c",
  storageBucket:     "cryptichunt-9f97c.firebasestorage.app",
  messagingSenderId: "460303612317",
  appId:             "1:460303612317:web:bbc795adc5b64616715774",
  databaseURL:       "https://cryptichunt-9f97c-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);
export const firestore    = getFirestore(app);
export const rtdb         = getDatabase(app);
export default app;
