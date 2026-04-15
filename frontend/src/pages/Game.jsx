import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { useGame } from '../hooks/useGame';
import QuestionCard from '../components/QuestionCard';
import api from '../lib/api';
import { signOut } from 'firebase/auth';
import { firebaseAuth } from '../lib/firebase';

const PHASE_LABELS = { 1: 'EASY', 2: 'MEDIUM', 3: 'HARD', 4: 'WILDCARD' };
const SUIT_SYMBOLS = { spades: '♠', hearts: '♥', diamonds: '♦', clubs: '♣' };
const SUIT_GLYPHS  = { spades: '𓅓', hearts: '𓃒', diamonds: '𓆙', clubs: '𓋹' };

/* ── Helpers ──────────────────────────────────────────────────────── */
function getPhaseFromIndex(idx) {
  if (idx <= 3)  return 1;
  if (idx <= 7)  return 2;
  if (idx <= 11) return 3;
  return 4;
}

/* ── 12-hour Game Timer (reads loginTime from API, polls /status) ─── */
function GameTimer({ loginTime, warningActive, onExpire }) {
  const [remaining, setRemaining] = useState(null);

  useEffect(() => {
    if (!loginTime) return;
    const GAME_MS = 2 * 60 * 60 * 1000;

    function tick() {
      const elapsed = Date.now() - new Date(loginTime).getTime();
      const left    = Math.max(0, GAME_MS - elapsed);
      setRemaining(left);
      if (left === 0) onExpire?.();
    }

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [loginTime, onExpire]);

  if (remaining === null) return null;

  const h   = Math.floor(remaining / 3600000);
  const m   = Math.floor((remaining % 3600000) / 60000);
  const s   = Math.floor((remaining % 60000) / 1000);
  const pad = n => String(n).padStart(2, '0');
  const isLow  = remaining < 30 * 60 * 1000;
  const color  = warningActive ? '#C0392B' : isLow ? '#C0392B' : '#C9A84C';
  const border = `1px solid ${(warningActive || isLow) ? 'rgba(192,57,43,0.5)' : 'rgba(201,168,76,0.25)'}`;

  return (
    <div style={{
      fontFamily: '"Inter", system-ui, sans-serif',
      fontSize: 13,
      letterSpacing: '0.12em',
      color,
      border,
      padding: '5px 12px',
      borderRadius: 2,
      background: (warningActive || isLow) ? 'rgba(192,57,43,0.08)' : 'rgba(201,168,76,0.04)',
      boxShadow: (warningActive || isLow) ? '0 0 12px rgba(192,57,43,0.3)' : 'none',
      transition: 'color 0.4s, border-color 0.4s, box-shadow 0.4s',
    }}>
      ⏳ {pad(h)}:{pad(m)}:{pad(s)}
    </div>
  );
}

/* ── Warning banner (score < 5 with < 15min to 2-hour mark) ─────── */
function WarningBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        position: 'fixed', top: 56, left: 0, right: 0,
        background: 'rgba(192,57,43,0.15)',
        borderBottom: '1px solid rgba(192,57,43,0.35)',
        padding: '10px 20px',
        textAlign: 'center',
        zIndex: 190,
      }}
    >
      <span style={{
        fontFamily: '"Inter", system-ui, sans-serif',
        fontSize: 10,
        letterSpacing: '0.2em',
        color: '#C0392B',
      }}>
        ⚠ WARNING — YOU HAVE LESS THAN 15 MINUTES TO REACH A SCORE OF 5 OR BE ELIMINATED
      </span>
    </motion.div>
  );
}

/* ── Egyptian nav bar ─────────────────────────────────────────────── */
function EgyptianNav({ score, progress, loginTime, warningActive, onTimerExpire }) {
  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0,
      zIndex: 200,
      background: 'rgba(0,0,0,0.92)',
      borderBottom: '1px solid rgba(201,168,76,0.18)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 20px',
      height: 56,
      gap: 12,
    }}>
      {/* Centre — Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: '0 0 auto' }}>
        <span style={{ fontSize: 20, filter: 'drop-shadow(0 0 6px rgba(201,168,76,0.5))' }}>𓂀</span>
        <span style={{
          fontFamily: '"Inter", system-ui, sans-serif',
          fontSize: 12,
          color: '#C9A84C',
          letterSpacing: '0.1em',
        }}>
          AMENTIS
        </span>
      </div>

      {/* Right — Timer + Score */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
        <GameTimer loginTime={loginTime} warningActive={warningActive} onExpire={onTimerExpire} />

        <div style={{
          fontFamily: '"Inter", system-ui, sans-serif',
          fontSize: 10,
          letterSpacing: '0.2em',
          color: '#C9A84C',
          border: '1px solid rgba(201,168,76,0.3)',
          padding: '6px 14px',
          borderRadius: 2,
          background: 'rgba(201,168,76,0.05)',
          whiteSpace: 'nowrap',
        }}>
          SCORE&nbsp;
          <span style={{ fontFamily: '"Inter", system-ui, sans-serif', fontSize: 13 }}>
            {score}
          </span>
          {progress && (
            <span style={{ color: 'rgba(201,168,76,0.45)', marginLeft: 6, fontSize: 9 }}>
              / 13
            </span>
          )}
        </div>
      </div>
    </header>
  );
}

/* ── Uncopyable text renderer ─────────────────────────────────────── */
function UncopyableText({ text }) {
  return (
    <p style={{
      fontFamily: '"Inter", system-ui, sans-serif',
      fontSize: 'clamp(15px, 1.8vw, 18px)',
      color: '#F5ECD0',
      lineHeight: 1.8,
      whiteSpace: 'pre-wrap',
      userSelect: 'none',
      WebkitUserSelect: 'none',
      MozUserSelect: 'none',
      msUserSelect: 'none',
      WebkitTouchCallout: 'none',
    }}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          style={{
            display: 'inline',
            userSelect: 'none',
            WebkitUserSelect: 'none',
          }}
        >
          {char}
        </span>
      ))}
    </p>
  );
}

/* ── Card back (face-down) ────────────────────────────────────────── */
function CardBack() {
  return (
    <div style={{
      width: 32, height: 48,
      background: '#0D0B05',
      border: '1px solid #C9A84C44',
      borderRadius: 4,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <svg width="24" height="36" viewBox="0 0 36 54">
        <rect x="2" y="2" width="32" height="50" rx="4"
          fill="none" stroke="#C9A84C" strokeWidth="0.5" opacity="0.4"/>
        <text x="18" y="30" textAnchor="middle" dominantBaseline="central"
          fill="#C9A84C" fontSize="16" opacity="0.5">✦</text>
      </svg>
    </div>
  );
}

/* ── Card face (answered / current) ──────────────────────────────── */
function CardFace({ suit, index, isCurrent, isAnswered }) {
  const SUIT_SYMBOLS_CF = { spades: '♠', hearts: '♥', diamonds: '♦', clubs: '♣' };
  const SUIT_COLORS_CF  = {
    spades: '#7B6EF6', hearts: '#F04A57',
    diamonds: '#F5C542', clubs: '#1BE0D4',
  };
  const symbol = SUIT_SYMBOLS_CF[suit] || '♠';
  const color  = SUIT_COLORS_CF[suit]  || '#C9A84C';

  return (
    <div style={{
      width: 32, height: 48,
      background: isCurrent ? '#1A1408' : '#0D0B05',
      border: `1px solid ${isCurrent ? '#C9A84C' : color + '44'}`,
      borderRadius: 4,
      boxShadow: isCurrent ? '0 0 10px #C9A84C66' : 'none',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      position: 'relative', transition: 'all 0.3s',
    }}>
      <span style={{
        fontSize: 6, color: '#C9A84C88',
        fontFamily: '"Inter", system-ui, sans-serif',
        position: 'absolute', top: 2, left: 3,
      }}>
        {index + 1}
      </span>
      <span style={{ fontSize: 14, color: isAnswered ? color : color + '66' }}>
        {symbol}
      </span>
    </div>
  );
}

/* ── Joker card (wildcard slot) ───────────────────────────────────── */
function JokerCard({ isCurrent }) {
  return (
    <div style={{
      width: 48, height: 72,
      background: isCurrent ? '#1A0A1A' : '#0D0B05',
      border: `1px solid ${isCurrent ? '#F5C542' : '#F5C54244'}`,
      borderRadius: 6,
      boxShadow: isCurrent ? '0 0 16px #F5C54266' : 'none',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
    }}>
      <span style={{ fontSize: 18, marginBottom: 2 }}>🃏</span>
      <span style={{
        fontSize: 6, color: '#F5C542',
        fontFamily: '"Inter", system-ui, sans-serif', letterSpacing: '0.05em',
      }}>WILD</span>
    </div>
  );
}

/* ── Card panel (left sidebar) ────────────────────────────────────── */
const PANEL_SUITS = [
  'spades', 'hearts', 'diamonds', 'clubs',
  'spades', 'hearts', 'diamonds', 'clubs',
  'spades', 'hearts', 'diamonds', 'clubs',
];

function CardPanel({ currentIndex }) {
  return (
    <div style={{
      width: 52,
      minHeight: '100vh',
      background: '#080808',
      backgroundImage: [
        'linear-gradient(#C9A84C11 1px, transparent 1px)',
        'linear-gradient(90deg, #C9A84C11 1px, transparent 1px)',
      ].join(','),
      backgroundSize: '32px 32px',
      borderRight: '1px solid #C9A84C22',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '12px 0',
      gap: 4,
      overflowY: 'auto',
      flexShrink: 0,
    }}>
      <p style={{
        color: '#C9A84C44', fontSize: 7,
        fontFamily: '"Inter", system-ui, sans-serif', letterSpacing: '0.1em',
        marginBottom: 6, writingMode: 'vertical-rl',
        textOrientation: 'mixed', transform: 'rotate(180deg)',
      }}>CARDS</p>

      {PANEL_SUITS.map((suit, i) => {
        const isCurrent  = i === currentIndex;
        const isAnswered = i < currentIndex;

        if (!isAnswered && !isCurrent) return <CardBack key={i} />;
        return (
          <CardFace
            key={i}
            suit={suit}
            index={i}
            isCurrent={isCurrent}
            isAnswered={isAnswered}
          />
        );
      })}
    </div>
  );
}

/* ── Answer input ─────────────────────────────────────────────────── */
function EgyptianInput({ value, onChange, onSubmit, loading, disabled, inputRef }) {
  return (
    <form onSubmit={onSubmit} style={{ width: '100%' }}>
      <label style={{
        display: 'block',
        fontFamily: '"Inter", system-ui, sans-serif',
        fontSize: 9,
        letterSpacing: '0.25em',
        color: 'rgba(201,168,76,0.5)',
        marginBottom: 10,
      }}>
        ENTER SOLUTION KEY
      </label>
      <div style={{ display: 'flex', gap: 10 }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <span style={{
            position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
            fontSize: 14, color: 'rgba(201,168,76,0.4)',
            pointerEvents: 'none',
          }}>
            🔑
          </span>
          <input
            ref={inputRef}
            id="answer-input"
            type="text"
            placeholder="Type your answer…"
            value={value}
            onChange={onChange}
            autoComplete="off"
            autoFocus
            disabled={disabled}
            style={{
              width: '100%',
              background: '#0A0A08',
              border: '1px solid rgba(201,168,76,0.3)',
              borderRadius: 2,
              color: '#F5ECD0',
              fontFamily: '"Inter", system-ui, sans-serif',
              fontSize: 15,
              padding: '13px 16px 13px 40px',
              outline: 'none',
              transition: 'border-color 0.2s, box-shadow 0.2s',
            }}
            onFocus={e => {
              e.target.style.borderColor = '#C9A84C';
              e.target.style.boxShadow = '0 0 0 3px rgba(201,168,76,0.1)';
            }}
            onBlur={e => {
              e.target.style.borderColor = 'rgba(201,168,76,0.3)';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>
        <button
          id="submit-btn"
          type="submit"
          disabled={loading || !value.trim()}
          style={{
            background: '#C9A84C',
            color: '#080808',
            border: 'none',
            borderRadius: 2,
            padding: '13px 24px',
            fontFamily: '"Inter", system-ui, sans-serif',
            fontWeight: 700,
            fontSize: 10,
            letterSpacing: '0.2em',
            cursor: loading || !value.trim() ? 'not-allowed' : 'none',
            opacity: loading || !value.trim() ? 0.5 : 1,
            transition: 'box-shadow 0.2s, opacity 0.2s',
            minWidth: 90,
          }}
          onMouseEnter={e => {
            if (!loading && value.trim()) e.currentTarget.style.boxShadow = '0 0 20px rgba(201,168,76,0.45)';
          }}
          onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
        >
          {loading
            ? <span className="spinner" style={{ width: 16, height: 16, display: 'inline-block' }} />
            : 'SUBMIT'
          }
        </button>
      </div>
    </form>
  );
}

/* ── Tries indicator — dynamic based on maxTries ─────────────────── */
function TriesIndicator({ triesLeft, maxTries = 3, isWildcard = false }) {
  const triesUsed = maxTries - triesLeft;

  if (isWildcard) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: 'rgba(192,57,43,0.12)',
          border: '2px solid rgba(192,57,43,0.5)',
          borderRadius: 2,
          padding: '10px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <span style={{ fontSize: 16 }}>⚠</span>
        <span style={{
          fontFamily: '"Inter", system-ui, sans-serif',
          fontSize: 9,
          letterSpacing: '0.22em',
          color: '#C0392B',
        }}>
          ONE ATTEMPT. NO SECOND CHANCE.
        </span>
      </motion.div>
    );
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{
        fontFamily: '"Inter", system-ui, sans-serif',
        fontSize: 9,
        letterSpacing: '0.2em',
        color: 'rgba(201,168,76,0.45)',
      }}>
        ATTEMPTS:
      </span>
      <div style={{ display: 'flex', gap: 6 }}>
        {Array.from({ length: maxTries }).map((_, i) => {
          const isUsed = i < triesUsed;
          const isLast = i === maxTries - 1 && triesUsed === maxTries - 1;
          return (
            <div key={i} style={{
              width: 18, height: 18,
              borderRadius: '50%',
              border: `1.5px solid ${isUsed ? (isLast ? '#C0392B' : 'rgba(192,57,43,0.5)') : 'rgba(201,168,76,0.5)'}`,
              background: isUsed
                ? (isLast ? 'rgba(192,57,43,0.35)' : 'rgba(192,57,43,0.2)')
                : 'rgba(201,168,76,0.12)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 8,
              color: isUsed ? '#C0392B' : '#C9A84C',
              transition: 'all 0.3s',
            }}>
              {isUsed ? '✗' : ''}
            </div>
          );
        })}
      </div>
      {triesLeft === 1 && (
        <span style={{
          fontFamily: '"Inter", system-ui, sans-serif',
          fontSize: 9,
          color: '#C0392B',
          letterSpacing: '0.15em',
          animation: 'redPulse 1s ease-in-out infinite',
        }}>
          FINAL ATTEMPT
        </span>
      )}
      <style>{`
        @keyframes redPulse {
          0%, 100% { opacity: 0.7; }
          50%       { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

/* ── Status indicator ─────────────────────────────────────────────── */
function StatusIndicator({ cardState, feedback }) {
  const states = {
    idle:    { label: 'AWAITING INPUT',         color: 'rgba(201,168,76,0.4)', dot: 'rgba(201,168,76,0.5)' },
    correct: { label: 'SEAL ACCEPTED',          color: '#27AE60',              dot: '#27AE60' },
    wrong:   { label: 'SEAL REJECTED',          color: '#C0392B',              dot: '#C0392B' },
    loading: { label: 'CONSULTING THE ORACLE…', color: 'rgba(201,168,76,0.6)', dot: '#C9A84C' },
  };
  const state = feedback
    ? (feedback.correct ? states.correct : states.wrong)
    : (cardState === 'loading' ? states.loading : states.idle);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{
        width: 6, height: 6, borderRadius: '50%',
        background: state.dot,
        boxShadow: `0 0 6px ${state.dot}`,
      }} />
      <span style={{
        fontFamily: '"Inter", system-ui, sans-serif',
        fontSize: 9,
        letterSpacing: '0.2em',
        color: state.color,
      }}>
        STATUS: {state.label}
      </span>
    </div>
  );
}

/* ── Phase transition overlay (3 seconds) ─────────────────────────── */
function PhaseOverlay({ phase, onDone }) {
  const labels = { 1: 'PHASE 1 COMPLETE', 2: 'PHASE 2 COMPLETE', 3: 'PHASE 3 COMPLETE' };

  useEffect(() => {
    const id = setTimeout(onDone, 3000);
    return () => clearTimeout(id);
  }, [onDone]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.97)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        zIndex: 400,
      }}
    >
      <motion.div
        initial={{ scale: 0.7, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 180, damping: 18 }}
        style={{ textAlign: 'center' }}
      >
        <div style={{ fontSize: 56, marginBottom: 24, filter: 'drop-shadow(0 0 20px rgba(201,168,76,0.5))' }}>
          𓂀
        </div>
        <p style={{
          fontFamily: '"Inter", system-ui, sans-serif',
          fontSize: 10,
          letterSpacing: '0.4em',
          color: 'rgba(201,168,76,0.5)',
          marginBottom: 16,
        }}>
          THE GODS ARE PLEASED
        </p>
        <h2 style={{
          fontFamily: '"Inter", system-ui, sans-serif',
          fontSize: 'clamp(28px, 5vw, 42px)',
          color: '#C9A84C',
          textShadow: '0 0 40px rgba(201,168,76,0.4)',
          letterSpacing: '0.1em',
        }}>
          {labels[phase] ?? 'PHASE COMPLETE'}
        </h2>
        <p style={{
          fontFamily: '"Inter", system-ui, sans-serif',
          marginTop: 16,
          color: 'rgba(232,213,160,0.5)',
          fontSize: 15,
        }}>
          {phase === 3 ? 'Prepare for the Wildcard…' : `Entering ${PHASE_LABELS[phase + 1] ?? 'next phase'}…`}
        </p>
      </motion.div>
    </motion.div>
  );
}

/* ── Back-toast warning ───────────────────────────────────────────── */
function BackToast({ onStay, onLeave }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.85)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 500,
        backdropFilter: 'blur(6px)',
      }}
    >
      <motion.div
        initial={{ scale: 0.9, y: 12 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 12 }}
        style={{
          background: '#0A0A0A',
          border: '2px solid rgba(201,168,76,0.4)',
          borderRadius: 4,
          padding: '36px 36px 28px',
          maxWidth: 360,
          width: '90%',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <p style={{
          fontFamily: '"Inter", system-ui, sans-serif',
          fontSize: 15,
          color: '#E8D5A0',
          marginBottom: 10,
          letterSpacing: '0.05em',
        }}>
          Leave the Chamber?
        </p>
        <p style={{
          fontFamily: '"Inter", system-ui, sans-serif',
          fontSize: 13,
          color: 'rgba(232,213,160,0.5)',
          marginBottom: 28,
          lineHeight: 1.6,
        }}>
          Your unsent answer will be lost, but your progress is saved.
        </p>
        <div style={{ display: 'flex', gap: 12 }}>
          <button
            id="back-toast-stay"
            onClick={onStay}
            style={{
              flex: 1,
              background: 'transparent',
              border: '1px solid rgba(201,168,76,0.3)',
              color: 'rgba(201,168,76,0.6)',
              padding: '11px 16px',
              fontFamily: '"Inter", system-ui, sans-serif',
              fontSize: 10,
              letterSpacing: '0.15em',
              cursor: 'none',
              borderRadius: 2,
            }}
          >
            STAY
          </button>
          <button
            id="back-toast-leave"
            onClick={onLeave}
            style={{
              flex: 1,
              background: 'rgba(201,168,76,0.1)',
              border: '1px solid rgba(201,168,76,0.5)',
              color: '#C9A84C',
              padding: '11px 16px',
              fontFamily: '"Inter", system-ui, sans-serif',
              fontWeight: 700,
              fontSize: 10,
              letterSpacing: '0.15em',
              cursor: 'none',
              borderRadius: 2,
            }}
          >
            LEAVE
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Timer-expired full-screen overlay ───────────────────────────── */
function ExpiredModal({ onLogout }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.97)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        zIndex: 9998,
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: 420, padding: '0 24px' }}>
        <div style={{ fontSize: 52, marginBottom: 24, filter: 'drop-shadow(0 0 20px rgba(201,168,76,0.4))' }}>⌛</div>
        <h2 style={{
          fontFamily: '"Inter", system-ui, sans-serif',
          fontSize: 'clamp(18px, 3.5vw, 26px)',
          color: '#C9A84C',
          letterSpacing: '0.08em',
          marginBottom: 16,
        }}>
          Time Has Expired
        </h2>
        <p style={{
          fontFamily: '"Inter", system-ui, sans-serif',
          fontSize: 15,
          color: 'rgba(232,213,160,0.55)',
          lineHeight: 1.75,
          marginBottom: 36,
        }}>
          The sands of time have run out. Your journey through the chamber is complete.
        </p>
        <button
          id="expired-logout-btn"
          onClick={onLogout}
          style={{
            background: 'rgba(201,168,76,0.12)',
            border: '2px solid rgba(201,168,76,0.5)',
            color: '#C9A84C',
            padding: '14px 48px',
            fontFamily: '"Inter", system-ui, sans-serif',
            fontWeight: 700,
            fontSize: 12,
            letterSpacing: '0.3em',
            cursor: 'none',
            borderRadius: 2,
          }}
        >
          DEPART
        </button>
      </div>
    </motion.div>
  );
}

/* ── Skip Modal ─────────────────────────────────────────────────── */
function SkipModal({ onConfirm, onCancel }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.85)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 500,
        backdropFilter: 'blur(6px)',
      }}
    >
      <motion.div
        initial={{ scale: 0.9, y: 12 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 12 }}
        style={{
          background: '#0A0A0A',
          border: '2px solid rgba(201,168,76,0.4)',
          borderRadius: 4,
          padding: '36px 36px 28px',
          maxWidth: 360,
          width: '90%',
          textAlign: 'center',
        }}
      >
        <p style={{
          fontFamily: '"Inter", system-ui, sans-serif',
          fontSize: 15,
          color: '#E8D5A0',
          marginBottom: 10,
          letterSpacing: '0.05em',
        }}>
          Skip Question?
        </p>
        <p style={{
          fontFamily: '"Inter", system-ui, sans-serif',
          fontSize: 13,
          color: 'rgba(232,213,160,0.5)',
          marginBottom: 28,
          lineHeight: 1.6,
        }}>
          Are you sure you want to skip? You cannot return to this question.
        </p>
        <div style={{ display: 'flex', gap: 12 }}>
          <button
            onClick={onCancel}
            style={{
              flex: 1,
              background: 'transparent',
              border: '1px solid rgba(201,168,76,0.3)',
              color: 'rgba(201,168,76,0.6)',
              padding: '11px 16px',
              fontFamily: '"Inter", system-ui, sans-serif',
              fontSize: 10,
              letterSpacing: '0.15em',
              cursor: 'pointer',
              borderRadius: 2,
            }}
          >
            STAY
          </button>
          <button
            onClick={onConfirm}
            style={{
              flex: 1,
              background: 'rgba(201,168,76,0.1)',
              border: '1px solid rgba(201,168,76,0.5)',
              color: '#C9A84C',
              padding: '11px 16px',
              fontFamily: '"Inter", system-ui, sans-serif',
              fontWeight: 700,
              fontSize: 10,
              letterSpacing: '0.15em',
              cursor: 'pointer',
              borderRadius: 2,
            }}
          >
            YES, SKIP
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ══ Main Game component ══════════════════════════════════════════════ */
export default function Game() {
  const { n } = useParams();
  const navigate  = useNavigate();
  const { profile } = useAuth();

  const {
    question, progress, loading, error,
    cardState, hint,
    fetchCurrent, submitAnswer, requestHint,
  } = useGame();

  const [answer, setAnswer]             = useState('');
  const [score, setScore]               = useState(profile?.score ?? 0);
  const [feedback, setFeedback]         = useState(null);
  const [phaseOverlay, setPhaseOverlay] = useState(null); // phase number being completed
  const [gameExpired, setGameExpired]   = useState(false);
  const [showBackToast, setShowBackToast] = useState(false);
  const [showSkipModal, setShowSkipModal] = useState(false);


  // Login-time based state (from /game/status polling)
  const [loginTime, setLoginTime]         = useState(null);
  const [warningActive, setWarningActive] = useState(false);

  // Exhausted tries message
  const [showExhausted, setShowExhausted] = useState(false);

  const inputRef = useRef(null);


  // Derive from progress
  const currentPhase  = progress ? (progress.phase ?? getPhaseFromIndex(progress.index ?? 0)) : 1;
  const triesLeft     = progress?.triesLeft ?? 3;
  const maxTries      = progress?.maxTries  ?? 3;
  const isWildcard    = progress?.isWildcard ?? false;
  const suit          = question?.suit ?? 'spades';
  const symbol        = SUIT_SYMBOLS[suit] ?? '♠';

  /* ── Copy / context-menu protection ──────────────────────────────── */
  useEffect(() => {
    const noRightClick = (e) => e.preventDefault();
    document.addEventListener('contextmenu', noRightClick);

    const noCopy = (e) => {
      if (e.ctrlKey && (e.key === 'c' || e.key === 'a' || e.key === 'u')) {
        e.preventDefault();
      }
    };
    document.addEventListener('keydown', noCopy);

    const noSelect = (e) => e.preventDefault();
    document.addEventListener('selectstart', noSelect);

    return () => {
      document.removeEventListener('contextmenu', noRightClick);
      document.removeEventListener('keydown', noCopy);
      document.removeEventListener('selectstart', noSelect);
    };
  }, []);



  /* ── Initial load ─────────────────────────────────────────────── */
  useEffect(() => {
    (async () => {
      let data = await fetchCurrent();
      if (!data) return;

      // Handle 12-hour expiry
      if (data.error === 'GAME_EXPIRED') { setGameExpired(true); return; }

      // SESSION_NOT_FOUND: auto-call /game/start then retry once
      if (data.error === 'SESSION_NOT_FOUND') {
        try {
          await api.post('/game/start');
          data = await fetchCurrent();
          if (!data) return;
        } catch (e) {
          console.error('Auto-start failed:', e);
          return;
        }
      }

      // Process the (possibly retried) response
      if (data.error === 'GAME_EXPIRED') { setGameExpired(true); return; }
      if (data.eliminated) {
        navigate('/eliminated', { replace: true, state: { reason: data.reason } });
        return;
      }
      if (data.completed || data.gameFinished) {
        handleCompletion({});
        return;
      }
      if (data.timeInfo?.loginTime) setLoginTime(data.timeInfo.loginTime);
      if (data.timeInfo?.warningActive) setWarningActive(data.timeInfo.warningActive);
    })();
    // eslint-disable-next-line
  }, []);


  /* ── Sync score from profile ─────────────────────────────────── */
  useEffect(() => {
    if (profile?.score !== undefined) setScore(profile.score);
  }, [profile]);

  /* ── Poll /game/status every 60 s for timer + warning state ──── */
  useEffect(() => {
    async function pollStatus() {
      try {
        const { data } = await api.get('/game/status');
        if (data?.loginTime) setLoginTime(data.loginTime);
        if (data?.warningActive !== undefined) setWarningActive(data.warningActive);
        // FIX 2: Server says game expired
        if (data?.gameExpired || data?.eliminated) {
          if (data.gameExpired) {
            setGameExpired(true);
          } else {
            navigate('/eliminated', { replace: true, state: { reason: 'Time-based elimination.' } });
          }
        }
      } catch { /* silent */ }
    }
    const id = setInterval(pollStatus, 300_000); // 5 minutes
    return () => clearInterval(id);
  }, [navigate]);

  /* ── Handle back button (kept for BackToast but button removed from nav) ── */
  function handleBack() {
    if (answer.trim().length > 0) setShowBackToast(true);
    else navigate('/rounds');
  }

  /* ── Handle timer expiry ──────────────────────────────────────── */
  const handleTimerExpire = useCallback(async () => {
    try {
      // api interceptor auto-attaches the Firebase token
      await api.post('/game/expire', {});
    } catch { /* silent */ }
    setGameExpired(true);
  }, []);

  /* ── Handle logout ────────────────────────────────────────────── */
  async function handleLogout() {
    await signOut(firebaseAuth);
    navigate('/');
  }

  /* ── Handle answer submit ─────────────────────────────────────── */
  async function handleAnswer(e) {
    e.preventDefault();
    if (!answer.trim() || loading) return;

    // Always send normalised answer to backend
    const normAnswer = answer.trim().toLowerCase();

    const result = await submitAnswer(normAnswer);
    if (!result) return;

    // FIX 2: Handle 2-hour expiry returned from /game/answer
    if (result.error === 'GAME_EXPIRED') { setGameExpired(true); return; }

    // Eliminated response (wildcard wrong or time-based)
    if (result.eliminated) {
      navigate('/eliminated', { replace: true, state: { reason: result.message ?? 'You have been eliminated.' } });
      return;
    }

    if (result.completed || result.gameFinished) {
      setScore(result.newScore ?? score);
      handleCompletion(result);
      return;
    }

    setAnswer('');
    setScore(result.newScore ?? score);
    setFeedback({ correct: result.correct, delta: result.scoreDelta });
    setTimeout(() => setFeedback(null), 1500);

    if (result.exhausted && !result.correct) {
      // Show "Tries exhausted" message for 2s then auto-fetch next question
      setShowExhausted(true);
      setTimeout(async () => {
        setShowExhausted(false);
        if (result.phaseComplete) {
          await showPhaseTransition(currentPhase);
        } else {
          await fetchCurrent();
        }
        inputRef.current?.focus();
      }, 2000);
      return;
    }

    if (!result.advanced) {
      // Wrong but still has tries — stay on same question
      return;
    }

    // Correct and advanced
    if (result.phaseComplete) {
      await showPhaseTransition(currentPhase);
    } else if (result.completed) {
      handleCompletion(result);
    } else {
      await fetchCurrent();
      inputRef.current?.focus();
    }
  }

  async function handleSkipConfirm() {
    setShowSkipModal(false);
    try {
      const { data } = await api.post('/game/skip');
      if (data.error) throw new Error(data.error);

      if (data.completed || data.gameFinished) {
        handleCompletion(data);
      } else {
        await fetchCurrent();
        inputRef.current?.focus();
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function showPhaseTransition(completedPhase) {
    setPhaseOverlay(completedPhase);
    // PhaseOverlay will call its own onDone after 3s
  }

  function handlePhaseOverlayDone() {
    setPhaseOverlay(null);
    fetchCurrent().then(() => inputRef.current?.focus());
  }

  function handleCompletion(result) {
    setTimeout(() => {
      const finalScore = result.newScore ?? score;
      if (finalScore >= parseInt(import.meta.env.VITE_PASS_THRESHOLD ?? '8', 10) || profile?.status === 'passed') {
        navigate('/pass');
      } else {
        navigate('/fail');
      }
    }, 800);
  }

  return (
    <div
      data-passkey="GREAT_HUNT_IT_IS"
      style={{
        minHeight: '100vh',
        background: '#080808',
        color: '#F5ECD0',
        display: 'flex',
        flexDirection: 'column',
      }}
    >

      {/* Egyptian Nav */}
      <EgyptianNav
        score={score}
        progress={progress}
        loginTime={loginTime}
        warningActive={warningActive}
        onTimerExpire={handleTimerExpire}
      />

      {/* Warning banner */}
      <AnimatePresence>
        {warningActive && <WarningBanner key="warning" />}
      </AnimatePresence>

      {/* Main layout: card panel + two-column content */}
      <div style={{
        flex: 1,
        paddingTop: warningActive ? 96 : 56,
        display: 'flex',
        flexDirection: 'row',
        minHeight: `calc(100vh - ${warningActive ? 96 : 56}px)`,
        transition: 'padding-top 0.3s',
      }}>
        {/* Ornate card panel */}
        <CardPanel currentIndex={progress?.index ?? 0} />

        {/* ── Content area: card column + problem column ─────────── */}
        <div style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: 'minmax(240px, 340px) 1fr',
          gap: 0,
        }}>

        {/* ── LEFT COLUMN — Card ──────────────────────────────────── */}
        <div style={{
          background: 'radial-gradient(ellipse at 50% 80%, #120D02, #080808 70%)',
          borderRight: '1px solid rgba(201,168,76,0.1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 24px',
          position: 'relative',
          gap: 24,
        }}>
          {/* Ambient glow */}
          <div style={{
            position: 'absolute',
            width: 300, height: 300,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
          }} />

          {/* Challenge label */}
          <div style={{ textAlign: 'center', zIndex: 1 }}>
            <p style={{
              fontFamily: '"Inter", system-ui, sans-serif',
              fontSize: 9,
              letterSpacing: '0.3em',
              color: 'rgba(201,168,76,0.4)',
              marginBottom: 4,
            }}>
              CHALLENGE
            </p>
            <p style={{
              fontFamily: '"Inter", system-ui, sans-serif',
              fontSize: 22,
              color: '#C9A84C',
              textShadow: '0 0 20px rgba(201,168,76,0.4)',
            }}>
              {progress
                ? `${(progress.index ?? 0) + 1} / 13`
                : `— / —`
              }
            </p>
          </div>

          {/* The Card */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            {question ? (
              <>
                <QuestionCard question={question} cardState={cardState} isWildcard={isWildcard} />
                {/* Feedback flash */}
                <AnimatePresence>
                  {feedback && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        position: 'absolute', inset: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        borderRadius: 8,
                        background: feedback.correct
                          ? 'rgba(39,174,96,0.15)'
                          : 'rgba(192,57,43,0.18)',
                        pointerEvents: 'none',
                        zIndex: 10,
                      }}
                    >
                      <span style={{
                        fontFamily: '"Inter", system-ui, sans-serif',
                        fontSize: 36,
                        color: feedback.correct ? '#27AE60' : '#C0392B',
                        textShadow: `0 0 30px ${feedback.correct ? '#27AE60' : '#C0392B'}`,
                      }}>
                        {feedback.correct ? `✓ +${feedback.delta}` : '✗'}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : loading ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
                <span className="spinner" />
                <span style={{
                  fontFamily: '"Inter", system-ui, sans-serif',
                  fontSize: 9,
                  letterSpacing: '0.25em',
                  color: 'rgba(201,168,76,0.4)',
                }}>
                  SUMMONING THE SCROLL…
                </span>
              </div>
            ) : null}
          </div>

          {/* Phase + suit labels */}
          {question && (
            <div style={{ textAlign: 'center', zIndex: 1 }}>
              <p style={{
                fontFamily: '"Inter", system-ui, sans-serif',
                fontSize: 9,
                letterSpacing: '0.2em',
                color: 'rgba(201,168,76,0.4)',
                marginBottom: 2,
              }}>
                PHASE {currentPhase} · {PHASE_LABELS[currentPhase] ?? ''}
              </p>
              <p style={{
                fontFamily: '"Inter", system-ui, sans-serif',
                fontSize: 9,
                letterSpacing: '0.2em',
                color: 'rgba(201,168,76,0.4)',
              }}>
                SUIT: <span style={{ color: 'rgba(201,168,76,0.7)' }}>{suit.toUpperCase()} {symbol}</span>
              </p>
            </div>
          )}

          {/* Progress pips (4 per phase) */}
          {progress && (
            <div style={{ zIndex: 1, display: 'flex', gap: 6 }}>
              {Array.from({ length: isWildcard ? 1 : 4 }).map((_, i) => {
                const qInPhase = isWildcard ? 0 : ((progress.index ?? 0) % 4);
                const filled   = i < qInPhase || (i === qInPhase && feedback?.correct);
                return (
                  <div key={i} style={{
                    width: 8, height: 8,
                    borderRadius: '50%',
                    background: filled ? '#C9A84C' : 'rgba(201,168,76,0.15)',
                    border: `1px solid ${filled ? '#C9A84C' : 'rgba(201,168,76,0.3)'}`,
                    transition: 'all 0.3s',
                  }} />
                );
              })}
            </div>
          )}
        </div>

        {/* ── RIGHT COLUMN — Problem + Input ──────────────────────── */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '40px 48px',
          gap: 28,
          background: '#080808',
        }}>

          {/* Phase label */}
          <div>
            <p style={{
              fontFamily: '"Inter", system-ui, sans-serif',
              fontSize: 10,
              letterSpacing: '0.3em',
              color: 'rgba(201,168,76,0.4)',
              marginBottom: 6,
            }}>
              PHASE {currentPhase} — {PHASE_LABELS[currentPhase] ?? ''}
            </p>
            <h2 style={{
              fontFamily: '"Inter", system-ui, sans-serif',
              fontSize: 'clamp(18px, 2.5vw, 26px)',
              color: '#C9A84C',
              letterSpacing: '0.08em',
              textShadow: '0 0 20px rgba(201,168,76,0.25)',
              lineHeight: 1.2,
            }}>
              {question
                ? `${suit.toUpperCase()} · CARD ${question.card_number}`
                : `ACE OF ${suit.toUpperCase()}`
              }
            </h2>
          </div>

          {/* Gold divider */}
          <div style={{ height: 1, background: 'linear-gradient(to right, rgba(201,168,76,0.3), transparent)' }} />

          {/* PROBLEM section */}
          <div>
            <p style={{
              fontFamily: '"Inter", system-ui, sans-serif',
              fontSize: 9,
              letterSpacing: '0.3em',
              color: 'rgba(201,168,76,0.4)',
              marginBottom: 20,
            }}>
              PROBLEM
            </p>

            {question ? (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                style={{
                  background: 'rgba(201,168,76,0.03)',
                  border: '1px solid rgba(201,168,76,0.1)',
                  borderLeft: '3px solid rgba(201,168,76,0.4)',
                  padding: '28px 32px',
                  borderRadius: 2,
                  position: 'relative',
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  MozUserSelect: 'none',
                  msUserSelect: 'none',
                  WebkitTouchCallout: 'none',
                }}
              >
                {/* Transparent overlay to intercept right-click on the card */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    zIndex: 1,
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                  }}
                  onContextMenu={(e) => e.preventDefault()}
                />
                <UncopyableText text={`"${question.question}"`} />
              </motion.div>
            ) : (
              <div style={{
                background: 'rgba(201,168,76,0.02)',
                border: '1px solid rgba(201,168,76,0.08)',
                borderRadius: 2,
                padding: '40px',
                textAlign: 'center',
              }}>
                <span style={{ color: 'rgba(201,168,76,0.2)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: 11, letterSpacing: '0.2em' }}>
                  AWAITING SCROLL…
                </span>
              </div>
            )}
          </div>

          {/* Exhausted tries message */}
          <AnimatePresence>
            {showExhausted && (
              <motion.div
                key="exhausted"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{
                  background: 'rgba(192,57,43,0.12)',
                  border: '1px solid rgba(192,57,43,0.35)',
                  borderRadius: 2,
                  padding: '10px 18px',
                  fontFamily: '"Inter", system-ui, sans-serif',
                  fontSize: 10,
                  letterSpacing: '0.2em',
                  color: '#C0392B',
                  textAlign: 'center',
                }}
              >
                TRIES EXHAUSTED — MOVING TO NEXT QUESTION
              </motion.div>
            )}
          </AnimatePresence>

          {/* Answer input */}
          {question && !showExhausted && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <EgyptianInput
                value={answer}
                onChange={e => setAnswer(e.target.value)}
                onSubmit={handleAnswer}
                loading={loading}
                disabled={loading}
                inputRef={inputRef}
              />
              <button
                type="button"
                onClick={() => setShowSkipModal(true)}
                title="Skipping will cost you this question"
                style={{
                  alignSelf: 'flex-start',
                  background: 'transparent',
                  border: '1px solid #C9A84C',
                  color: '#C9A84C',
                  padding: '6px 14px',
                  borderRadius: 2,
                  fontFamily: '"Inter", system-ui, sans-serif',
                  fontSize: 10,
                  letterSpacing: '0.1em',
                  cursor: 'pointer',
                  opacity: 0.8,
                  transition: 'opacity 0.2s, background 0.2s'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.opacity = 1;
                  e.currentTarget.style.background = 'rgba(201,168,76,0.1)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.opacity = 0.8;
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                Skip Question &rarr;
              </button>
            </div>
          )}

          {/* Tries indicator — dynamic; wildcard shows red banner */}
          {question && (
            <TriesIndicator
              triesLeft={triesLeft}
              maxTries={maxTries}
              isWildcard={isWildcard}
            />
          )}

          {/* Status */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12,
          }}>
            <StatusIndicator cardState={cardState} feedback={feedback} />
          </div>

          {error && (
            <p style={{
              fontFamily: '"Inter", system-ui, sans-serif',
              fontSize: 13,
              color: '#C0392B',
              textAlign: 'center',
            }}>
              {error}
            </p>
          )}
        </div>
        </div> {/* end content grid */}
      </div>

      {/* ── Back Toast ────────────────────────────────────────────── */}
      <AnimatePresence>
        {showBackToast && (
          <BackToast
            onStay={() => setShowBackToast(false)}
            onLeave={() => navigate('/rounds')}
          />
        )}
      </AnimatePresence>

      {/* ── Phase Transition Overlay ──────────────────────────────── */}
      <AnimatePresence>
        {phaseOverlay !== null && (
          <PhaseOverlay phase={phaseOverlay} onDone={handlePhaseOverlayDone} />
        )}
      </AnimatePresence>

      {/* ── Skip Modal ────────────────────────────────────────────── */}
      <AnimatePresence>
        {showSkipModal && (
          <SkipModal
            onConfirm={handleSkipConfirm}
            onCancel={() => setShowSkipModal(false)}
          />
        )}
      </AnimatePresence>

      {/* ── Timer Expired Overlay ────────────────────────────────── */}
      <AnimatePresence>
        {gameExpired && <ExpiredModal onLogout={handleLogout} />}
      </AnimatePresence>
    </div>
  );
}
