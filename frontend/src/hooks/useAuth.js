import { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

export function useAuth() {
  const [user, setUser]       = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hard timeout — never hang the UI forever
    const timeout = setTimeout(() => setLoading(false), 4000);

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        await fetchOrCreateProfile(firebaseUser);
      } else {
        setUser(null);
        setProfile(null);
      }
      clearTimeout(timeout);
      setLoading(false);
    });

    return () => {
      unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  async function fetchOrCreateProfile(firebaseUser) {
    try {
      const profileRef  = doc(db, 'profiles', firebaseUser.uid);
      const profileSnap = await getDoc(profileRef);

      if (!profileSnap.exists()) {
        // First-time login — create profile
        const newProfile = {
          id:              firebaseUser.uid,
          email:           firebaseUser.email,
          name:            firebaseUser.displayName || firebaseUser.email,
          score:           0,
          status:          'waiting',
          hints_used:      0,
          game_start_time: null,
          disqualified:    false,
          game_finished:   false,
          tries_remaining: 60,
          created_at:      new Date().toISOString(),
        };
        await setDoc(profileRef, newProfile);
        setProfile(newProfile);
      } else {
        setProfile(profileSnap.data());
      }
    } catch (err) {
      console.error('useAuth: profile fetch error', err);
    }
  }

  async function refetchProfile() {
    if (!user) return;
    try {
      const profileSnap = await getDoc(doc(db, 'profiles', user.uid));
      if (profileSnap.exists()) setProfile(profileSnap.data());
    } catch (err) {
      console.error('useAuth: refetch error', err);
    }
  }

  async function signOut() {
    await firebaseSignOut(auth);
  }

  return { user, profile, loading, signOut, refetchProfile };
}
