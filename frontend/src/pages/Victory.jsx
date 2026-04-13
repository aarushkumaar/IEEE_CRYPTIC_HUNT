import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';

export default function Victory() {
  const navigate = useNavigate();
  const { profile } = useAuth();

  useEffect(() => {
    // Navigate to leaderboard after 4 seconds
    const timer = setTimeout(() => navigate('/leaderboard'), 4000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '32px 16px',
      position: 'relative',
      overflow: 'hidden',
      background: '#080808',
    }}>
      {/* Ambient glow - mystical */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 50% 20%, rgba(201,168,76,0.12) 0%, transparent 60%)',
      }} />

      <div style={{
        position: 'relative', zIndex: 10, maxWidth: 512, width: '100%',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32,
      }}>
        {/* Main message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateX: -20 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{ type: 'spring', stiffness: 150, damping: 15 }}
          style={{ textAlign: 'center' }}
        >
          {/* Mystical emoji */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ fontSize: 64, marginBottom: 16 }}
          >
            ✨
          </motion.div>

          {/* Main heading */}
          <h1 style={{
            fontFamily: '"Cinzel Decorative", serif',
            fontSize: 'clamp(40px, 10vw, 72px)',
            color: '#C9A84C',
            fontWeight: 900,
            letterSpacing: '0.08em',
            textShadow: '0 0 40px rgba(201,168,76,0.4)',
            margin: 0,
            marginBottom: 12,
          }}>
            THE ORACLE SMILES
          </h1>

          {/* Subheading */}
          <p style={{
            fontFamily: '"IM Fell English", Georgia, serif',
            fontStyle: 'italic',
            fontSize: 'clamp(16px, 3vw, 20px)',
            color: 'rgba(232,213,160,0.7)',
            margin: 0,
            lineHeight: 1.6,
          }}>
            You have unlocked the secrets of the chamber, {profile?.name || 'seeker'}.
          </p>
        </motion.div>

        {/* Glyph sequence */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{
            fontSize: 24,
            color: '#C9A84C',
            letterSpacing: '0.3em',
            opacity: 0.6,
          }}
        >
          𓂀 𓅓 𓆙 𓋴 𓇯 𓃒 𓏏
        </motion.div>

        {/* Victory message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          style={{
            background: 'rgba(201,168,76,0.08)',
            border: '2px solid rgba(201,168,76,0.3)',
            borderRadius: 8,
            padding: '24px',
            textAlign: 'center',
          }}
        >
          <p style={{
            fontFamily: '"IM Fell English", serif',
            fontStyle: 'italic',
            fontSize: 18,
            color: '#E8D5A0',
            margin: 0,
            lineHeight: 1.8,
          }}>
            The Wildcard has revealed its truth, and you alone possessed the knowledge to claim it.
            Your name shall be whispered among the greatest hunters of all time.
          </p>
        </motion.div>

        {/* View Leaderboard Button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/leaderboard')}
          style={{
            padding: '12px 32px',
            background: '#C9A84C',
            color: '#080808',
            border: 'none',
            borderRadius: 6,
            fontFamily: '"Cinzel", serif',
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            boxShadow: '0 0 20px rgba(201,168,76,0.4)',
            transition: 'all 0.3s ease',
          }}
        >
          View Leaderboard
        </motion.button>

        {/* Countdown text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          style={{
            fontFamily: '"Cinzel", serif',
            fontSize: 12,
            letterSpacing: '0.2em',
            color: 'rgba(201,168,76,0.4)',
            textTransform: 'uppercase',
          }}
        >
          Entering the hall of legends...
        </motion.div>
      </div>

      {/* Bottom glyph accent */}
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{
          position: 'absolute',
          bottom: 40,
          fontSize: 48,
          color: '#C9A84C',
        }}
      >
        𓋹
      </motion.div>
    </div>
  );
}
