import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { signOut } from 'firebase/auth';
import { firebaseAuth } from '../lib/firebase';

export default function Eliminated() {
  const location = useLocation();
  const navigate = useNavigate();
  const reason   = location.state?.reason ?? 'You have been eliminated from the sacred hunt.';

  async function handleLogout() {
    await signOut(firebaseAuth);
    navigate('/');
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#080808',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '32px 16px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Red ambient glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 50% 20%, rgba(192,57,43,0.12) 0%, transparent 65%)',
      }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 160, damping: 18 }}
        style={{
          position: 'relative',
          background: '#080808',
          border: '2px solid rgba(192,57,43,0.55)',
          borderRadius: 4,
          padding: '56px 48px',
          maxWidth: 520,
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 0 80px rgba(192,57,43,0.18)',
        }}
      >
        {/* Corner accent brackets */}
        {[
          { top: 10, left: 10,    borderTop:    '2px solid rgba(192,57,43,0.7)', borderLeft:  '2px solid rgba(192,57,43,0.7)' },
          { top: 10, right: 10,   borderTop:    '2px solid rgba(192,57,43,0.7)', borderRight: '2px solid rgba(192,57,43,0.7)' },
          { bottom: 10, left: 10, borderBottom: '2px solid rgba(192,57,43,0.7)', borderLeft:  '2px solid rgba(192,57,43,0.7)' },
          { bottom: 10, right: 10,borderBottom: '2px solid rgba(192,57,43,0.7)', borderRight: '2px solid rgba(192,57,43,0.7)' },
        ].map((s, i) => (
          <div key={i} style={{ position: 'absolute', width: 20, height: 20, ...s }} />
        ))}

        {/* Hieroglyph */}
        <motion.div
          animate={{ filter: ['drop-shadow(0 0 12px rgba(192,57,43,0.4))', 'drop-shadow(0 0 28px rgba(192,57,43,0.85))', 'drop-shadow(0 0 12px rgba(192,57,43,0.4))'] }}
          transition={{ duration: 2.2, repeat: Infinity }}
          style={{ fontSize: 52, marginBottom: 24 }}
        >
          𓂀
        </motion.div>

        <h1 style={{
          fontFamily: '"Cinzel Decorative", serif',
          fontSize: 'clamp(18px, 4vw, 26px)',
          color: '#C0392B',
          letterSpacing: '0.06em',
          marginBottom: 20,
          lineHeight: 1.4,
        }}>
          The Gods Have<br />Judged You Unworthy
        </h1>

        <div style={{
          width: '60%',
          height: 1,
          background: 'linear-gradient(to right, transparent, rgba(192,57,43,0.45), transparent)',
          margin: '0 auto 24px',
        }} />

        {/* Elimination reason */}
        <p style={{
          fontFamily: '"IM Fell English", serif',
          fontStyle: 'italic',
          fontSize: 15,
          color: 'rgba(232,213,160,0.65)',
          lineHeight: 1.75,
          marginBottom: 12,
        }}>
          {reason}
        </p>

        <p style={{
          fontFamily: '"Cinzel", serif',
          fontSize: 9,
          letterSpacing: '0.25em',
          color: 'rgba(192,57,43,0.4)',
          marginBottom: 36,
        }}>
          𓂀 𓅓 𓆙 𓋴 𓇯 𓃒 𓏏 𓈖 𓆣 𓋹
        </p>

        {/* Leaderboard link */}
        <a
          href="/leaderboard"
          style={{
            display: 'inline-block',
            background: 'rgba(192,57,43,0.10)',
            border: '1px solid rgba(192,57,43,0.4)',
            color: 'rgba(192,57,43,0.8)',
            padding: '11px 28px',
            fontFamily: '"Cinzel", serif',
            fontSize: 10,
            letterSpacing: '0.22em',
            borderRadius: 2,
            textDecoration: 'none',
            marginBottom: 16,
            marginRight: 12,
            transition: 'background 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(192,57,43,0.22)'; e.currentTarget.style.boxShadow = '0 0 18px rgba(192,57,43,0.3)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(192,57,43,0.10)'; e.currentTarget.style.boxShadow = 'none'; }}
        >
          VIEW LEADERBOARD
        </a>

        <button
          id="eliminated-logout-btn"
          onClick={handleLogout}
          style={{
            background: 'rgba(192,57,43,0.18)',
            border: '2px solid rgba(192,57,43,0.6)',
            color: '#C0392B',
            padding: '12px 36px',
            fontFamily: '"Cinzel", serif',
            fontWeight: 700,
            fontSize: 11,
            letterSpacing: '0.25em',
            cursor: 'pointer',
            borderRadius: 2,
            transition: 'background 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(192,57,43,0.3)'; e.currentTarget.style.boxShadow = '0 0 24px rgba(192,57,43,0.4)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(192,57,43,0.18)'; e.currentTarget.style.boxShadow = 'none'; }}
        >
          DEPART IN SHAME
        </button>
      </motion.div>
    </div>
  );
}
