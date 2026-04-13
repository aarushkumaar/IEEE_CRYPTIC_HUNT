import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';
import api from '../lib/api';

/**
 * AuthCallback — handles redirect after Firebase OAuth sign-in.
 * Firebase Auth picks up the credential automatically from the URL.
 * We wait for the auth state to resolve, then check the player's game session.
 */
export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) return; // still loading — wait

      unsubscribe(); // Stop listening once we have a user

      try {
        const { data: gameSession } = await api.get('/game/session');

        if (gameSession?.hasSession && !gameSession.completed) {
          const round = gameSession.currentRound;
          if (round >= 4) navigate('/wildcard', { replace: true });
          else navigate(`/round/${round}`, { replace: true });
        } else if (gameSession?.completed) {
          navigate('/pass', { replace: true });
        } else {
          navigate('/welcome', { replace: true });
        }
      } catch {
        navigate('/welcome', { replace: true });
      }
    });

    // Fallback — if auth never fires within 5s, send to home
    const timeout = setTimeout(() => {
      unsubscribe();
      navigate('/', { replace: true });
    }, 5000);

    return () => {
      unsubscribe();
      clearTimeout(timeout);
    };
  }, [navigate]);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#000',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 24,
    }}>
      {/* Animated Eye of Ra loader */}
      <div style={{
        fontSize: 48,
        animation: 'pulse 1.5s ease-in-out infinite',
        filter: 'drop-shadow(0 0 16px rgba(201,168,76,0.6))',
      }}>
        𓂀
      </div>
      <p style={{
        fontFamily: '"Cinzel", serif',
        fontSize: 11,
        letterSpacing: '0.35em',
        color: 'rgba(201,168,76,0.6)',
      }}>
        VERIFYING YOUR IDENTITY…
      </p>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.08); }
        }
      `}</style>
    </div>
  );
}
