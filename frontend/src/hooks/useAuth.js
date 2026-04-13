import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { firebaseAuth, firestore } from '../lib/firebase';

export function useAuth() {
  const [user, setUser]       = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(firebaseAuth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        const docSnap = await getDoc(doc(firestore, 'profiles', firebaseUser.uid));
        if (docSnap.exists()) setProfile({ id: docSnap.id, ...docSnap.data() });
      } else {
        setProfile(null);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  return { user, profile, loading };
}
