import { useState, useEffect } from 'react';
import {
  onAuthStateChanged,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { firebaseAuth, firestore } from '../lib/firebase';
import api from '../lib/api';

export function useAuth() {
  const [user, setUser]           = useState(null);
  const [profile, setProfile]     = useState(null);
  const [loading, setLoading]     = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    let settled = false;

    // Hard timeout: if auth check takes > 4 seconds, unblock the UI
    const timeout = setTimeout(() => {
      if (!settled) {
        settled = true;
        setLoading(false);
        setAuthError('Auth check timed out. Please refresh the page.');
      }
    }, 4000);

    // Firebase auth state observer — fires immediately with cached state
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (firebaseUser) => {
      if (!settled) {
        settled = true;
        clearTimeout(timeout);
        setLoading(false); // unblock UI NOW, before profile fetch
      }

      setUser(firebaseUser ?? null);

      if (firebaseUser) {
        fetchAndUpsertProfile(firebaseUser); // fire-and-forget
      } else {
        setProfile(null);
      }
    });

    return () => {
      clearTimeout(timeout);
      unsubscribe();
    };
  }, []);

  async function fetchAndUpsertProfile(firebaseUser) {
    try {
      // Try reading profile directly from Firestore (user can read their own doc)
      const profileRef = doc(firestore, 'profiles', firebaseUser.uid);
      const profileSnap = await getDoc(profileRef);

      if (profileSnap.exists()) {
        setProfile({ id: firebaseUser.uid, ...profileSnap.data() });
      } else {
        // New user — create profile via backend (POST /auth/register)
        const name =
          firebaseUser.displayName ||
          firebaseUser.email?.split('@')[0] ||
          'Initiate';

        await api.post('/auth/register', {
          uid:   firebaseUser.uid,
          name,
          email: firebaseUser.email,
        });

        // Re-fetch the profile that was just created
        const freshSnap = await getDoc(profileRef);
        if (freshSnap.exists()) {
          setProfile({ id: firebaseUser.uid, ...freshSnap.data() });
        }
      }
    } catch (err) {
      console.error('fetchAndUpsertProfile error:', err.message);
    }
  }

  async function signOut() {
    await firebaseSignOut(firebaseAuth);
    setUser(null);
    setProfile(null);
  }

  return {
    user,
    profile,
    loading,
    authError,
    signOut,
    refetchProfile: () => user && fetchAndUpsertProfile(user),
  };
}
