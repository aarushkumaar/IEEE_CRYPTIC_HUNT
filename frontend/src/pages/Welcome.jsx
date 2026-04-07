import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { useGame } from '../hooks/useGame';
import CardDeal from '../components/CardDeal';

const STATS = [
  { label: 'PHASES',    value: '3',      glyph: '𓅓' },
  { label: 'QUESTIONS', value: '12',     glyph: '𓆙' },
  { label: 'CORRECT',   value: '+1 pt',  glyph: '𓋹' },
  { label: 'SKIP',      value: '−1 pt',  glyph: '𓃒' },
];

const RULES = [
  'Questions are shown one at a time. The next unlocks after answering or skipping.',
  'Correct answer: +1 point. Score floor is 0 — cannot go negative.',
  'Skip costs −1 point. Wrong answer costs nothing but reveals no solution.',
  'Final ranking: score (higher) then time taken (lower).',
  'Need ≥ 10 / 12 correct to pass the sacred trial.',
  'Hints are available — but use them wisely.',
];

export default function Welcome() {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const { startGame, loading, error } = useGame();
  const [rulesOpen, setRulesOpen] = useState(false);
  const [starting, setStarting]   = useState(false);

  async function handleBegin() {
    setStarting(true);
    const ok = await startGame();
    navigate('/rounds');
    setStarting(false);
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at 50% 90%, #1A0E00 0%, #0A0600 35%, #080808 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      padding: '40px 24px',
    }}>

      {/* Ambient atmospheric glow */}
      <div style={{
        position: 'absolute',
        width: 700, height: 700,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        width: 1000, height: 300,
        borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(201,168,76,0.04) 0%, transparent 70%)',
        bottom: -100, left: '50%',
        transform: 'translateX(-50%)',
        pointerEvents: 'none',
      }} />

      {/* Hieroglyph strip top */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.8 }}
        style={{
          position: 'absolute', top: 20, left: 0, right: 0,
          textAlign: 'center',
          fontFamily: 'serif',
          fontSize: 20,
          color: 'rgba(201,168,76,0.12)',
          letterSpacing: '0.5em',
          userSelect: 'none',
        }}
      >
        𓂀 𓅓 𓆙 𓋴 𓇯 𓃒 𓏏 𓈖 𓆣 𓋹 𓐍 𓅱 𓂧 𓊪 𓁹 𓆑 𓏛
      </motion.div>

      {/* Main content */}
      <div style={{
        width: '100%',
        maxWidth: 720,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 40,
        zIndex: 10,
      }}>

        {/* Card Deal Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          style={{ width: '100%' }}
        >
          <CardDeal />
        </motion.div>

        {/* Welcome text */}
        <motion.div
          style={{ textAlign: 'center' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {/* IEEE badge */}
          <p style={{
            fontFamily: '"Cinzel", serif',
            fontSize: 9,
            letterSpacing: '0.35em',
            color: 'rgba(201,168,76,0.45)',
            marginBottom: 16,
          }}>
            IEEE GTBIT · CRYPTIC HUNT 2026
          </p>

          {/* Eye glyph */}
          <div style={{
            fontSize: 36,
            marginBottom: 20,
            filter: 'drop-shadow(0 0 12px rgba(201,168,76,0.4))',
          }}>
            𓂀
          </div>

          <h1 style={{
            fontFamily: '"Cinzel Decorative", serif',
            fontSize: 'clamp(28px, 5vw, 42px)',
            fontWeight: 900,
            color: '#C9A84C',
            letterSpacing: '0.08em',
            textShadow: '0 0 40px rgba(201,168,76,0.3)',
            marginBottom: 12,
          }}>
            Welcome, {profile?.name || 'Seeker'}
          </h1>
          <p style={{
            fontFamily: '"IM Fell English", Georgia, serif',
            fontStyle: 'italic',
            fontSize: 'clamp(14px, 1.8vw, 17px)',
            color: 'rgba(232,213,160,0.55)',
            maxWidth: 440,
            margin: '0 auto',
            lineHeight: 1.75,
          }}>
            You have crossed the threshold. The sacred scroll awaits. Three phases. Twelve trials. One will prevail.
          </p>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 'clamp(20px, 4vw, 48px)',
            flexWrap: 'wrap',
            padding: '20px 32px',
            border: '1px solid rgba(201,168,76,0.12)',
            background: 'rgba(201,168,76,0.02)',
            position: 'relative',
          }}
        >
          {/* Corner brackets */}
          {[
            { top: 8, left: 8, borderTop: '1px solid rgba(201,168,76,0.4)', borderLeft: '1px solid rgba(201,168,76,0.4)' },
            { top: 8, right: 8, borderTop: '1px solid rgba(201,168,76,0.4)', borderRight: '1px solid rgba(201,168,76,0.4)' },
            { bottom: 8, left: 8, borderBottom: '1px solid rgba(201,168,76,0.4)', borderLeft: '1px solid rgba(201,168,76,0.4)' },
            { bottom: 8, right: 8, borderBottom: '1px solid rgba(201,168,76,0.4)', borderRight: '1px solid rgba(201,168,76,0.4)' },
          ].map((s, i) => (
            <div key={i} style={{ position: 'absolute', width: 14, height: 14, ...s }} />
          ))}

          {STATS.map(({ label, value, glyph }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: 18,
                marginBottom: 6,
                filter: 'drop-shadow(0 0 6px rgba(201,168,76,0.3))',
              }}>
                {glyph}
              </div>
              <div style={{
                fontFamily: '"Cinzel Decorative", serif',
                fontSize: 20,
                color: '#C9A84C',
                textShadow: '0 0 16px rgba(201,168,76,0.35)',
                marginBottom: 4,
              }}>
                {value}
              </div>
              <div style={{
                fontFamily: '"Cinzel", serif',
                fontSize: 8,
                letterSpacing: '0.25em',
                color: 'rgba(201,168,76,0.4)',
              }}>
                {label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Rules toggle */}
        <motion.div
          style={{ width: '100%', maxWidth: 520 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <button
            onClick={() => setRulesOpen(v => !v)}
            style={{
              width: '100%',
              background: 'rgba(201,168,76,0.03)',
              border: '1px solid rgba(201,168,76,0.2)',
              borderRadius: 2,
              padding: '14px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'none',
              transition: 'border-color 0.2s, background 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)';
              e.currentTarget.style.background = 'rgba(201,168,76,0.06)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)';
              e.currentTarget.style.background = 'rgba(201,168,76,0.03)';
            }}
          >
            <span style={{
              fontFamily: '"Cinzel", serif',
              fontSize: 9,
              letterSpacing: '0.3em',
              color: 'rgba(201,168,76,0.6)',
            }}>
              ⚜ THE SACRED LAWS
            </span>
            <motion.span
              animate={{ rotate: rulesOpen ? 180 : 0 }}
              transition={{ duration: 0.25 }}
              style={{ color: 'rgba(201,168,76,0.4)', fontSize: 12 }}
            >
              ▾
            </motion.span>
          </button>

          <AnimatePresence>
            {rulesOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.28 }}
                style={{ overflow: 'hidden' }}
              >
                <div style={{
                  background: 'rgba(201,168,76,0.02)',
                  border: '1px solid rgba(201,168,76,0.12)',
                  borderTop: 'none',
                  borderRadius: '0 0 2px 2px',
                  padding: '24px 24px',
                }}>
                  {RULES.map((rule, i) => (
                    <div key={i} style={{
                      display: 'flex', gap: 14, alignItems: 'flex-start',
                      marginBottom: i < RULES.length - 1 ? 14 : 0,
                    }}>
                      <span style={{
                        fontFamily: '"Cinzel", serif',
                        fontSize: 9,
                        color: 'rgba(201,168,76,0.5)',
                        minWidth: 20,
                        paddingTop: 2,
                      }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <p style={{
                        fontFamily: '"IM Fell English", serif',
                        fontSize: 13,
                        color: 'rgba(232,213,160,0.65)',
                        lineHeight: 1.7,
                        margin: 0,
                      }}>
                        {rule}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.05, duration: 0.5 }}
          style={{ textAlign: 'center' }}
        >
          <motion.button
            id="begin-hunt-btn"
            onClick={handleBegin}
            disabled={starting || loading}
            whileHover={{ boxShadow: '0 0 40px rgba(201,168,76,0.4), 0 0 80px rgba(201,168,76,0.15)', y: -2 }}
            whileTap={{ scale: 0.98 }}
            style={{
              background: starting ? 'rgba(201,168,76,0.5)' : '#C9A84C',
              color: '#080808',
              border: 'none',
              borderRadius: 2,
              padding: '18px 64px',
              fontFamily: '"Cinzel", serif',
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: '0.3em',
              cursor: starting ? 'not-allowed' : 'none',
              opacity: starting || loading ? 0.7 : 1,
              transition: 'background 0.2s, opacity 0.2s',
              boxShadow: '0 0 20px rgba(201,168,76,0.2)',
              marginBottom: 16,
            }}
          >
            {starting || loading
              ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span className="spinner" style={{ width: 18, height: 18 }} />
                  PREPARING THE RITUAL…
                </span>
              )
              : 'BEGIN THE HUNT ▶'
            }
          </motion.button>

          {error && (
            <p style={{
              fontFamily: '"IM Fell English", serif',
              fontStyle: 'italic',
              fontSize: 13,
              color: '#C0392B',
              marginTop: 8,
            }}>
              {error}
            </p>
          )}
        </motion.div>
      </div>

      {/* Hieroglyph strip bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        style={{
          position: 'absolute', bottom: 16, left: 0, right: 0,
          textAlign: 'center',
          fontFamily: 'serif',
          fontSize: 18,
          color: 'rgba(201,168,76,0.08)',
          letterSpacing: '0.5em',
          userSelect: 'none',
        }}
      >
        𓂀 𓅓 𓆙 𓋴 𓇯 𓃒 𓏏 𓈖 𓆣 𓋹 𓐍 𓅱 𓂧 𓊪 𓁹 𓆑 𓏛
      </motion.div>
    </div>
  );
}
