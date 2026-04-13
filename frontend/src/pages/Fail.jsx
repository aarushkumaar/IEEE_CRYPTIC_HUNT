import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Fail() {
  const { profile } = useAuth();

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
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 50% 20%, rgba(139,105,20,0.1) 0%, transparent 60%)',
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
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ fontSize: 64, marginBottom: 16 }}
          >
            ⚰️
          </motion.div>

          <h1 style={{
            fontFamily: '"Cinzel Decorative", serif',
            fontSize: 'clamp(40px, 10vw, 72px)',
            color: '#8B6914',
            fontWeight: 900,
            letterSpacing: '0.08em',
            textShadow: '0 0 40px rgba(139,105,20,0.3)',
            margin: 0,
            marginBottom: 12,
          }}>
            THE CURSE PREVAILS
          </h1>

          <p style={{
            fontFamily: '"IM Fell English", Georgia, serif',
            fontStyle: 'italic',
            fontSize: 'clamp(16px, 3vw, 20px)',
            color: 'rgba(232,213,160,0.5)',
            margin: 0,
            lineHeight: 1.6,
          }}>
            The ancient knowledge eludes you, {profile?.name || 'seeker'}.
          </p>
        </motion.div>

        {/* Glyph sequence */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{
            fontSize: 24,
            color: '#8B6914',
            letterSpacing: '0.3em',
            opacity: 0.6,
          }}
        >
          𓂀 𓅓 𓆙 𓋴 𓇯 𓃒 𓏏
        </motion.div>

        {/* Failure message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          style={{
            background: 'rgba(139,105,20,0.08)',
            border: '2px solid rgba(139,105,20,0.3)',
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
            Though the curse has claimed you, your journey through the ancient chambers
            has left its mark on history.
          </p>
        </motion.div>

        {/* Leaderboard link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
        >
          <Link
            to="/leaderboard"
            style={{
              display: 'inline-block',
              background: 'rgba(139,105,20,0.12)',
              border: '2px solid rgba(139,105,20,0.4)',
              color: '#C9A84C',
              padding: '14px 40px',
              fontFamily: '"Cinzel", serif',
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: '0.25em',
              textDecoration: 'none',
              borderRadius: 2,
              transition: 'background 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(139,105,20,0.22)';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(139,105,20,0.3)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(139,105,20,0.12)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            VIEW LEADERBOARD →
          </Link>
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
          color: '#8B6914',
        }}
      >
        𓋹
      </motion.div>
    </div>
  );
}
