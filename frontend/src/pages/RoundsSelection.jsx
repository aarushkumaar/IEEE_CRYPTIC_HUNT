import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import api from '../lib/api';

/* ── Confetti: loaded lazily only when needed ─────────────────────── */
async function fireConfetti() {
  const { default: confetti } = await import('canvas-confetti');
  confetti({
    particleCount: 120,
    spread: 70,
    colors: ['#D4AF37', '#E8D5A0', '#C9A84C', '#fff', '#B8963E'],
    origin: { y: 0.55 },
  });
  setTimeout(() => confetti({ particleCount: 60, spread: 55, origin: { y: 0.5, x: 0.3 }, colors: ['#D4AF37', '#E8D5A0'] }), 350);
  setTimeout(() => confetti({ particleCount: 60, spread: 55, origin: { y: 0.5, x: 0.7 }, colors: ['#D4AF37', '#E8D5A0'] }), 600);
}

/* ── Chain SVG overlay for locked cards ──────────────────────────── */
function ChainOverlay({ breaking }) {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      zIndex: 10,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(0,0,0,0.62)',
      borderRadius: 16,
      overflow: 'hidden',
      pointerEvents: 'none',
    }}>
      {/* Chain SVG */}
      <svg width="80" height="160" viewBox="0 0 80 160"
        style={{
          animation: breaking
            ? 'chainBreak 0.5s ease-out forwards'
            : 'chainSway 2s ease-in-out infinite',
        }}
      >
        {/* Chain links */}
        {[0, 1, 2, 3, 4].map(i => (
          <g key={i} transform={`translate(20, ${i * 30 + 5})`}>
            <ellipse cx="20" cy="12" rx="16" ry="8"
              fill="none" stroke="#4a4a4a" strokeWidth="4"
              style={{ filter: 'url(#metallic)' }}
            />
            <ellipse cx="20" cy="12" rx="16" ry="8"
              fill="none" stroke="#7a7a7a" strokeWidth="1.5" opacity="0.4"
            />
          </g>
        ))}
        {/* Lock icon at bottom */}
        <g transform="translate(22, 140)">
          <rect x="2" y="10" width="28" height="20" rx="3" fill="#3a3a3a" stroke="#555" strokeWidth="1.5" />
          <path d="M8 10 L8 5 Q8 0 16 0 Q24 0 24 5 L24 10"
            stroke="#4a4a4a" strokeWidth="3.5" fill="none" strokeLinecap="round"
          />
          <circle cx="16" cy="18" r="3" fill="#222" />
          <rect x="14.5" y="18" width="3" height="4" rx="1" fill="#222" />
        </g>
        <defs>
          <filter id="metallic">
            <feGaussianBlur in="SourceAlpha" stdDeviation="1" result="blur" />
            <feOffset dx="1" dy="1" in="blur" result="shadow" />
            <feComposite in="SourceGraphic" in2="shadow" operator="over" />
          </filter>
        </defs>
      </svg>
      <style>{`
        @keyframes chainSway {
          0%, 100% { transform: rotate(-3deg); }
          50%       { transform: rotate(3deg); }
        }
        @keyframes chainBreak {
          0%   { transform: scale(1) translateY(0); opacity: 1; }
          40%  { transform: scale(1.1) translateY(-8px); }
          100% { transform: scale(0.5) translateY(60px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

/* ── Completed stamp ─────────────────────────────────────────────── */
function CompletedStamp() {
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 10,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(0,0,0,0.5)',
      borderRadius: 16,
      pointerEvents: 'none',
    }}>
      <div style={{
        border: '3px solid rgba(212,175,55,0.7)',
        borderRadius: 8,
        padding: '10px 20px',
        transform: 'rotate(-15deg)',
        textAlign: 'center',
      }}>
        <div style={{
          fontFamily: '"Cinzel", serif',
          fontSize: 22,
          fontWeight: 900,
          color: 'rgba(212,175,55,0.85)',
          letterSpacing: '0.15em',
        }}>✓</div>
        <div style={{
          fontFamily: '"Cinzel", serif',
          fontSize: 9,
          letterSpacing: '0.2em',
          color: 'rgba(212,175,55,0.7)',
          marginTop: 4,
        }}>COMPLETED</div>
      </div>
    </div>
  );
}

/* ── Art Deco Card ───────────────────────────────────────────────── */
function ArtDecoCard({ round, state, onClick, highlighted }) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [breaking, setBreaking]   = useState(false);
  const didBreak = useRef(false);

  // Trigger chain-break animation when this card transitions locked→active
  useEffect(() => {
    if (highlighted && !didBreak.current) {
      didBreak.current = true;
      setBreaking(true);
    }
  }, [highlighted]);

  const isLocked    = state === 'locked';
  const isCompleted = state === 'completed';
  const isActive    = state === 'active';

  const cardOpacity = isLocked ? 0.45 : isCompleted ? 0.7 : 1;

  return (
    <div
      onClick={!isLocked && !isCompleted ? onClick : undefined}
      onMouseMove={isActive ? (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        setRotation({
          x: -(y / (rect.height / 2)) * 10,
          y:  (x / (rect.width  / 2)) * 10,
        });
      } : undefined}
      onMouseLeave={() => setRotation({ x: 0, y: 0 })}
      style={{
        width: 220, height: 300,
        position: 'relative',
        cursor: isActive ? 'none' : 'default',
        filter: isLocked ? 'grayscale(0.7) brightness(0.6)' : 'none',
        opacity: cardOpacity,
        transition: 'filter 0.4s, opacity 0.4s',
      }}
    >
      {/* Chain overlay for locked */}
      <AnimatePresence>
        {isLocked && !breaking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'absolute', inset: 0, zIndex: 10 }}
          >
            <ChainOverlay breaking={false} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chain break animation */}
      {breaking && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
          <ChainOverlay breaking={true} />
        </div>
      )}

      {/* Completed stamp */}
      {isCompleted && <CompletedStamp />}

      {/* 3-D tilt card body */}
      <motion.div
        animate={{ rotateX: rotation.x, rotateY: rotation.y }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{
          width: '100%', height: '100%',
          borderRadius: 16,
          border: `2px solid ${isActive && highlighted ? '#E8D5A0' : '#D4AF37'}`,
          boxShadow: isActive
            ? highlighted
              ? '0 0 40px rgba(212,175,55,0.8), 0 0 80px rgba(212,175,55,0.3)'
              : '0 0 20px rgba(212,175,55,0.3)'
            : 'none',
          overflow: 'hidden',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          transformStyle: 'preserve-3d',
          background: 'linear-gradient(160deg, #111 0%, #000 100%)',
          animation: isActive && highlighted ? 'borderPulse 2s ease-in-out infinite' : 'none',
          transition: 'box-shadow 0.3s, border-color 0.3s',
        }}
      >
        {/* Art deco SVG border */}
        <svg
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }}
          viewBox="0 0 220 300" preserveAspectRatio="none"
        >
          <rect x="8" y="8" width="204" height="284" fill="none" stroke="#D4AF37" strokeWidth="1" />
          <rect x="14" y="14" width="192" height="272" fill="none" stroke="#D4AF37" strokeWidth="2.5" />
          <polyline points="14,35 35,35 35,14" fill="none" stroke="#D4AF37" strokeWidth="1.5" />
          <polyline points="22,30 30,30 30,22" fill="none" stroke="#D4AF37" strokeWidth="1" />
          <polyline points="206,35 185,35 185,14" fill="none" stroke="#D4AF37" strokeWidth="1.5" />
          <polyline points="198,30 190,30 190,22" fill="none" stroke="#D4AF37" strokeWidth="1" />
          <polyline points="14,265 35,265 35,286" fill="none" stroke="#D4AF37" strokeWidth="1.5" />
          <polyline points="22,270 30,270 30,278" fill="none" stroke="#D4AF37" strokeWidth="1" />
          <polyline points="206,265 185,265 185,286" fill="none" stroke="#D4AF37" strokeWidth="1.5" />
          <polyline points="198,270 190,270 190,278" fill="none" stroke="#D4AF37" strokeWidth="1" />
          <line x1="35" y1="40" x2="185" y2="40" stroke="#D4AF37" strokeWidth="1" />
          <line x1="35" y1="45" x2="185" y2="45" stroke="#D4AF37" strokeWidth="1" />
          <line x1="35" y1="260" x2="185" y2="260" stroke="#D4AF37" strokeWidth="1" />
          <line x1="35" y1="255" x2="185" y2="255" stroke="#D4AF37" strokeWidth="1" />
        </svg>

        {/* Card content */}
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', transform: 'translateZ(20px)' }}>
          <h2 style={{
            fontFamily: '"Cinzel Decorative", serif',
            fontSize: 18,
            fontWeight: 900,
            color: '#D4AF37',
            letterSpacing: '0.1em',
            marginBottom: 4,
          }}>
            AMENTIS
          </h2>
          <p style={{
            fontFamily: '"Cinzel", serif',
            fontSize: 10,
            color: 'rgba(212,175,55,0.6)',
            letterSpacing: '0.2em',
            marginBottom: 16,
          }}>
            ROUND {round.id}
          </p>

          {/* Badge circle */}
          <div style={{
            width: 70, height: 70,
            margin: '0 auto',
            border: '2px solid #D4AF37',
            borderRadius: '50%',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            position: 'relative',
          }}>
            <svg viewBox="0 0 100 100" style={{ position: 'absolute', width: '100%', height: '100%', animation: 'spin 20s linear infinite' }}>
              <path id={`curve-${round.id}`} d="M 15 50 A 35 35 0 1 1 15 50.001" fill="transparent" />
              <text fontSize="7" fill="#D4AF37" fontWeight="bold" letterSpacing="1px" fontFamily="sans-serif">
                <textPath href={`#curve-${round.id}`} startOffset="0%" fill="#D4AF37">
                  IEEE GTBIT STUDENT BRANCH •
                </textPath>
              </text>
            </svg>
            <div style={{ width: 34, height: 34, border: '1px solid #D4AF37', transform: 'rotate(45deg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ transform: 'rotate(-45deg)', color: '#D4AF37', fontSize: 16 }}>⚜</span>
            </div>
          </div>

          <div style={{ marginTop: 14 }}>
            <span style={{
              filter: 'drop-shadow(0 0 6px rgba(212,175,55,0.6))',
              color: '#D4AF37',
              fontSize: 22,
            }}>𓏡</span>
          </div>

          {/* State label */}
          <p style={{
            marginTop: 12,
            fontFamily: '"Cinzel", serif',
            fontSize: 9,
            letterSpacing: '0.25em',
            color: isLocked ? 'rgba(212,175,55,0.3)' : isCompleted ? 'rgba(212,175,55,0.6)' : 'rgba(212,175,55,0.8)',
          }}>
            {isLocked ? '🔒 LOCKED' : isCompleted ? '✓ COMPLETED' : 'ENTER CHAMBER'}
          </p>
        </div>
      </motion.div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes borderPulse {
          0%, 100% { box-shadow: 0 0 20px rgba(212,175,55,0.4); }
          50%       { box-shadow: 0 0 50px rgba(212,175,55,0.9), 0 0 100px rgba(212,175,55,0.3); }
        }
      `}</style>
    </div>
  );
}

/* ── Main RoundsSelection page ───────────────────────────────────── */
const ROUNDS = [
  { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 },
];

export default function RoundsSelection() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { user }  = useAuth();

  const [currentRound, setCurrentRound] = useState(null);
  const [loading, setLoading]           = useState(true);
  // which card was just unlocked (for chain-break anim + glow)
  const justUnlocked = location.state?.justUnlocked ?? null;

  useEffect(() => {
    async function loadSession() {
      if (!user) return;
      try {
        const { data } = await api.get('/game/session');
        setCurrentRound(data?.currentRound ?? 1);
      } catch {
        setCurrentRound(1);
      } finally {
        setLoading(false);
      }
    }
    if (user) {
      loadSession();
    } else {
      // If user isn't quite ready, loading stays true
      // We rely on useAuth to handle top-level auth gate
    }
  }, [user]);

  // Fire confetti if we just completed a round
  useEffect(() => {
    if (location.state?.justCompleted) {
      fireConfetti();
      // Clear the state so it doesn't fire again on back-navigate
      window.history.replaceState({}, '');
    }
  }, [location.state?.justCompleted]);

  function getCardState(roundId) {
    if (currentRound === null) return 'locked';
    if (roundId < currentRound) return 'completed';
    if (roundId === currentRound) return 'active';
    return 'locked';
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      background: 'radial-gradient(circle at center, #1a0d00 0%, #000 70%)',
      overflow: 'hidden',
    }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at top center, rgba(201,168,76,0.07) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      {/* Header pill */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          position: 'absolute',
          top: '8%',
          background: 'rgba(255,255,255,0.92)',
          color: '#000',
          padding: '10px 52px',
          borderRadius: 50,
          boxShadow: '0 0 60px 30px rgba(255,255,255,0.5), inset 0 0 10px rgba(0,0,0,0.5)',
          zIndex: 10,
        }}
      >
        <h1 style={{
          fontFamily: 'sans-serif',
          fontWeight: 900,
          fontSize: 22,
          letterSpacing: '0.12em',
          margin: 0,
        }}>
          ROUNDS
        </h1>
      </motion.div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        style={{
          position: 'absolute',
          top: 'calc(8% + 68px)',
          fontFamily: '"Cinzel", serif',
          fontSize: 10,
          letterSpacing: '0.3em',
          color: 'rgba(201,168,76,0.45)',
          zIndex: 10,
        }}
      >
        SELECT YOUR CHAMBER
      </motion.p>

      {/* Cards grid */}
      {loading ? (
        <div style={{
          fontFamily: '"Cinzel", serif',
          fontSize: 11,
          letterSpacing: '0.3em',
          color: 'rgba(201,168,76,0.5)',
        }}>
          CONSULTING THE ORACLE…
        </div>
      ) : (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 28,
          zIndex: 5,
          marginTop: 80,
          padding: '0 24px',
          maxWidth: 1100,
          perspective: '1200px',
        }}>
          {ROUNDS.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12, duration: 0.6, ease: 'easeOut' }}
            >
              <ArtDecoCard
                round={r}
                state={getCardState(r.id)}
                highlighted={r.id === justUnlocked || (r.id === currentRound && justUnlocked === null)}
                onClick={() => {
                  if (r.id >= 4) navigate('/wildcard');
                  else navigate(`/round/${r.id}`);
                }}
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
