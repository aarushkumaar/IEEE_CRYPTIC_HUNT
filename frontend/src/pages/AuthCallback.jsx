import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { firebaseAuth } from '../lib/firebase';
import api from '../lib/api';

/**
 * AuthCallback — simplified for Firebase.
 *
 * With Supabase, Google OAuth used a server-side redirect that landed here.
 * With Firebase, we use signInWithPopup (no redirect) so this page is only
 * reached if the user somehow navigates here directly.
 *
 * If a user is already signed in, we route them to the correct page.
 * Otherwise, we send them back to the landing page.
 */
export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    async function route() {
      const user = firebaseAuth.currentUser;

      if (!user) {
        // No active session — go home
        navigate('/', { replace: true });
        return;
      }

      try {
        const { data: gameSession } = await api.get('/game/session');

        if (gameSession?.hasSession && !gameSession.completed) {
          const round = gameSession.currentRound;
          if (round >= 4) navigate('/wildcard', { replace: true });
          else navigate(`/round/${round}`, { replace: true });
        } else if (gameSession?.completed) {
          navigate('/pass', { replace: true });
        } else {
          navigate('/rounds', { replace: true });
        }
      } catch {
        navigate('/rounds', { replace: true });
      }
    }

    // Small delay to let Firebase auth state settle
    const timer = setTimeout(route, 500);
    return () => clearTimeout(timer);
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
