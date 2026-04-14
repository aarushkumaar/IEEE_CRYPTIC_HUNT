import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { useGame } from '../hooks/useGame';
import SuitCard from '../components/SuitCard';
import api from '../lib/api';
import { firebaseAuth } from '../lib/firebase';

const SUITS  = ['hearts', 'diamonds', 'spades', 'clubs'];
const LABELS = {
  hearts:   'Hearts',
  diamonds: 'Diamonds',
  spades:   'Spades',
  clubs:    'Clubs',
};

/* ── Flip + flash sequence ─────────────────────────────────────────
   State machine:
   idle → selecting → flipping → flash → navigating
──────────────────────────────────────────────────────────────────── */
const STAGES = {
  IDLE:       'idle',
  SELECTING:  'selecting',   // chosen card scales up, others fade
  FLIP_OUT:   'flip_out',    // selected flips to 90deg
  FLASH:      'flash',       // white/gold flash at 90deg pivot
  FLIP_IN:    'flip_in',     // completes flip back
  NAVIGATING: 'navigating',  // navigate away
};

export default function RoundsSelection() {
  const navigate  = useNavigate();
  const { user }  = useAuth();
  const { startGame } = useGame();

  const [stage, setStage]       = useState(STAGES.IDLE);
  const [chosen, setChosen]     = useState(null); // suit string
  const [flashOpacity, setFlashOpacity] = useState(0);
  const [error, setError]       = useState(null);
  const [checking, setChecking] = useState(true);

  /* ── Check for existing session on mount ─────────────────────── */
  useEffect(() => {
    (async () => {
      try {
        const currentUser = firebaseAuth.currentUser;
        if (!currentUser) { setChecking(false); return; }
        const { data } = await api.get('/game/session');
        if (data?.hasSession && !data?.completed && !data?.eliminated) {
          // Session already exists — go straight to game
          navigate('/round/1', { replace: true });
          return;
        }
      } catch { /* no session */ }
      setChecking(false);
    })();
  }, [navigate]);

  /* ── Card click handler ─────────────────────────────────────────
     Full sequence:
     1. Mark chosen card, begin SELECTING (scale up, others fade)
     2. 300ms → FLIP_OUT (rotateY to 90deg)
     3. 300ms → FLASH (show flash overlay)
     4. 150ms → FLIP_IN (rotateY back to 0)
     5. 300ms → NAVIGATING (start game + navigate)
  ──────────────────────────────────────────────────────────────── */
  const handleCardClick = useCallback(async (suit) => {
    if (stage !== STAGES.IDLE) return;
    setChosen(suit);
    setStage(STAGES.SELECTING);

    await delay(320);
    setStage(STAGES.FLIP_OUT);

    await delay(320);
    setStage(STAGES.FLASH);
    setFlashOpacity(1);

    await delay(160);
    setStage(STAGES.FLIP_IN);
    setFlashOpacity(0);

    await delay(320);
    setStage(STAGES.NAVIGATING);

    // Kick off game start
    try {
      await startGame();
    } catch { /* already started — that's fine */ }

    navigate('/round/1');
  }, [stage, navigate, startGame]);

  if (checking) {
    return (
      <div style={{
        minHeight: '100vh', background: '#080808',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{ color: 'rgba(201,168,76,0.5)', fontFamily: '"Cinzel", serif', fontSize: 12, letterSpacing: '0.3em' }}>
          CONSULTING THE ORACLE…
        </span>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at center, #0D0800 0%, #060404 60%, #000 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 24px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background texture */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at top center, rgba(201,168,76,0.05) 0%, transparent 55%)',
      }} />

      {/* Particle-like dots */}
      {Array.from({ length: 18 }).map((_, i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0.1, 0.35, 0.1], scale: [1, 1.2, 1] }}
          transition={{ duration: 3 + i * 0.4, repeat: Infinity, delay: i * 0.25 }}
          style={{
            position: 'absolute',
            width: 2, height: 2,
            borderRadius: '50%',
            background: '#C9A84C',
            left: `${5 + (i * 5.5) % 90}%`,
            top: `${8 + (i * 7.3) % 84}%`,
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* ── Title ─────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{ textAlign: 'center', marginBottom: 40, zIndex: 5 }}
      >
        <p style={{
          fontFamily: '"Cinzel", serif',
          fontSize: 10,
          letterSpacing: '0.5em',
          color: 'rgba(201,168,76,0.4)',
          marginBottom: 12,
          textTransform: 'uppercase',
        }}>
          𓂀 &nbsp; THE RITUAL &nbsp; 𓂀
        </p>
        <h1 style={{
          fontFamily: '"Cinzel Decorative", serif',
          fontSize: 'clamp(26px, 5vw, 46px)',
          fontWeight: 900,
          color: '#C9A84C',
          letterSpacing: '0.08em',
          textShadow: '0 0 40px rgba(201,168,76,0.35)',
          margin: '0 0 14px 0',
          lineHeight: 1.15,
        }}>
          CHOOSE YOUR SEAL
        </h1>
        <p style={{
          fontFamily: '"IM Fell English", Georgia, serif',
          fontStyle: 'italic',
          fontSize: 'clamp(13px, 2vw, 16px)',
          color: 'rgba(232,213,160,0.45)',
          margin: 0,
          lineHeight: 1.6,
        }}>
          All paths lead to the same tomb.
        </p>
      </motion.div>

      {/* ── Card grid ─────────────────────────────────────────────── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 28,
        maxWidth: 620,
        width: '100%',
        zIndex: 5,
        perspective: '1200px',
      }}
      className="suit-card-grid"
      >
        {SUITS.map((suit, i) => {
          const isChosen = chosen === suit;
          const isFading = chosen !== null && !isChosen;

          return (
            <motion.div
              key={suit}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: i * 0.12, ease: 'easeOut' }}
              style={{
                display: 'flex',
                justifyContent: 'center',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Flip wrapper */}
              <motion.div
                animate={
                  isChosen && stage === STAGES.FLIP_OUT
                    ? { rotateY: 90 }
                    : isChosen && stage === STAGES.FLIP_IN
                    ? { rotateY: 0 }
                    : isChosen && stage === STAGES.FLASH
                    ? { rotateY: 90 }
                    : { rotateY: 0 }
                }
                transition={{ duration: 0.31, ease: stage === STAGES.FLIP_OUT ? 'easeIn' : 'easeOut' }}
                style={{
                  width: '100%',
                  maxWidth: 260,
                  position: 'relative',
                  transformStyle: 'preserve-3d',
                }}
              >
                <SuitCard
                  suit={suit}
                  isSelected={isChosen && stage === STAGES.SELECTING}
                  isFading={isFading}
                  onClick={() => handleCardClick(suit)}
                />

                {/* Flash overlay mid-flip */}
                {isChosen && (
                  <motion.div
                    animate={{ opacity: flashOpacity }}
                    transition={{ duration: 0.15 }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: 16,
                      background: 'radial-gradient(ellipse at 40% 35%, #ffffff, #F5C542)',
                      pointerEvents: 'none',
                      zIndex: 20,
                    }}
                  />
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* ── Desktop — single row override ─────────────────────────── */}
      <style>{`
        @media (min-width: 900px) {
          .suit-card-grid {
            grid-template-columns: repeat(4, 1fr) !important;
            max-width: 1000px !important;
            gap: 20px !important;
          }
        }
        @media (max-width: 480px) {
          .suit-card-grid {
            gap: 16px !important;
          }
        }
      `}</style>

      {/* Error */}
      {error && (
        <p style={{
          marginTop: 24,
          fontFamily: '"Cinzel", serif',
          fontSize: 11,
          color: '#C0392B',
          letterSpacing: '0.2em',
          zIndex: 5,
        }}>
          {error}
        </p>
      )}

      {/* Loading overlay during navigation */}
      <AnimatePresence>
        {stage === STAGES.NAVIGATING && (
          <motion.div
            key="nav-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              position: 'fixed', inset: 0,
              background: '#080808',
              zIndex: 1000,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <motion.span
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              style={{
                fontFamily: '"Cinzel", serif',
                fontSize: 11,
                letterSpacing: '0.4em',
                color: '#C9A84C',
              }}
            >
              ENTERING THE CHAMBER…
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
