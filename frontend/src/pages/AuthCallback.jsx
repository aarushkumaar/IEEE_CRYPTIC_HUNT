import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import api from '../lib/api';

/**
 * AuthCallback — handles the redirect back from Google OAuth.
 * Supabase reads the URL hash/query params automatically via onAuthStateChange.
 * We just need to wait for the session, ensure a profile row exists, then redirect.
 */
export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    // Give Supabase a moment to pick up the OAuth tokens from the URL
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          try {
            // Check if player already has a game session
            const { data: gameSession } = await api.get('/game/session', {
              headers: { Authorization: `Bearer ${session.access_token}` },
            });

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
        }
      }
    );

    // Also handle case where session is already available synchronously
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session) {
        subscription.unsubscribe();
        try {
          const { data: gameSession } = await api.get('/game/session', {
            headers: { Authorization: `Bearer ${session.access_token}` },
          });
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
      }
    });

    return () => subscription.unsubscribe();
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
