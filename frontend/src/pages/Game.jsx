import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { useGame } from '../hooks/useGame';
import QuestionCard from '../components/QuestionCard';
import ScoreBar from '../components/ScoreBar';
import ProgressPips from '../components/ProgressPips';
import api from '../lib/api';
import { supabase } from '../lib/supabase';

const ROUND_SUITS  = { 1: 'spades', 2: 'hearts', 3: 'diamonds', 4: 'clubs' };
const SUIT_SYMBOLS = { spades: '♠', hearts: '♥', diamonds: '♦', clubs: '♣' };
const SUIT_GLYPHS  = { spades: '𓅓', hearts: '𓃒', diamonds: '𓆙', clubs: '𓋹' };

/* ── 12-hour Game Timer ───────────────────────────────────────────── */
function GameTimer({ gameStartTime, onExpire }) {
  const [remaining, setRemaining] = useState(null); // ms

  useEffect(() => {
    if (!gameStartTime) return;
    const GAME_MS = 12 * 60 * 60 * 1000;

    function tick() {
      const elapsed = Date.now() - new Date(gameStartTime).getTime();
      const left    = Math.max(0, GAME_MS - elapsed);
      setRemaining(left);
      if (left === 0) onExpire?.();
    }

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [gameStartTime, onExpire]);

  if (remaining === null) return null;

  const h = Math.floor(remaining / 3600000);
  const m = Math.floor((remaining % 3600000) / 60000);
  const s = Math.floor((remaining % 60000) / 1000);

  const pad = n => String(n).padStart(2, '0');
  const isLow = remaining < 30 * 60 * 1000; // < 30 min

  return (
    <div style={{
      fontFamily: '"Courier New", Courier, monospace',
      fontSize: 13,
      letterSpacing: '0.12em',
      color: isLow ? '#C0392B' : '#C9A84C',
      border: `1px solid ${isLow ? 'rgba(192,57,43,0.5)' : 'rgba(201,168,76,0.25)'}`,
      padding: '5px 12px',
      borderRadius: 2,
      background: isLow ? 'rgba(192,57,43,0.08)' : 'rgba(201,168,76,0.04)',
      boxShadow: isLow ? '0 0 12px rgba(192,57,43,0.3)' : 'none',
      transition: 'color 0.4s, border-color 0.4s, box-shadow 0.4s',
    }}>
      ⏳ {pad(h)}:{pad(m)}:{pad(s)}
    </div>
  );
}

/* ── Egyptian nav bar ─────────────────────────────────────────────── */
function EgyptianNav({ score, progress, onBack, gameStartTime, onTimerExpire }) {
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
      {/* ← Back to ROUNDS button */}
      <button
        id="back-to-rounds-btn"
        onClick={onBack}
        style={{
          background: 'rgba(0,0,0,0.7)',
          border: '1px solid #D4AF37',
          borderRadius: 20,
          color: '#D4AF37',
          padding: '6px 16px',
          fontFamily: '"Cinzel", serif',
          fontSize: 9,
          letterSpacing: '0.2em',
          cursor: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          transition: 'background 0.2s, box-shadow 0.2s',
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}
        onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 16px rgba(212,175,55,0.4)'}
        onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
      >
        ← ROUNDS
      </button>

      {/* Centre — Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: '0 0 auto' }}>
        <span style={{ fontSize: 20, filter: 'drop-shadow(0 0 6px rgba(201,168,76,0.5))' }}>𓂀</span>
        <span style={{
          fontFamily: '"Cinzel Decorative", serif',
          fontSize: 12,
          color: '#C9A84C',
          letterSpacing: '0.1em',
        }}>
          AMENTIS
        </span>
      </div>

      {/* Right — Timer + Score */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
        <GameTimer gameStartTime={gameStartTime} onExpire={onTimerExpire} />

        <div style={{
          fontFamily: '"Cinzel", serif',
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
          <span style={{ fontFamily: '"Cinzel Decorative", serif', fontSize: 13 }}>
            {score}
          </span>
          {progress && (
            <span style={{ color: 'rgba(201,168,76,0.45)', marginLeft: 6, fontSize: 9 }}>
              / {progress.totalQuestions}
            </span>
          )}
        </div>
      </div>
    </header>
  );
}

/* ── Egyptian answer input ────────────────────────────────────────── */
function EgyptianInput({ value, onChange, onSubmit, loading, disabled, inputRef }) {
  return (
    <form onSubmit={onSubmit} style={{ width: '100%' }}>
      <label style={{
        display: 'block',
        fontFamily: '"Cinzel", serif',
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
              fontFamily: '"IM Fell English", serif',
              fontStyle: 'italic',
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
            fontFamily: '"Cinzel", serif',
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

/* ── 3 Tries indicator ────────────────────────────────────────────── */
function TriesIndicator({ triesLeft }) {
  const total = 3;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{
        fontFamily: '"Cinzel", serif',
        fontSize: 9,
        letterSpacing: '0.2em',
        color: 'rgba(201,168,76,0.45)',
      }}>
        ATTEMPTS:
      </span>
      <div style={{ display: 'flex', gap: 6 }}>
        {Array.from({ length: total }).map((_, i) => {
          const used     = total - (triesLeft ?? total);
          const isUsed   = i < used;
          const isLast   = used === 2 && i === 1; // warn on last
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
      {triesLeft !== undefined && triesLeft === 1 && (
        <span style={{
          fontFamily: '"Cinzel", serif',
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
    idle:    { label: 'AWAITING INPUT',        color: 'rgba(201,168,76,0.4)', dot: 'rgba(201,168,76,0.5)' },
    correct: { label: 'SEAL ACCEPTED',         color: '#27AE60',              dot: '#27AE60' },
    wrong:   { label: 'SEAL REJECTED',         color: '#C0392B',              dot: '#C0392B' },
    loading: { label: 'CONSULTING THE ORACLE…',color: 'rgba(201,168,76,0.6)', dot: '#C9A84C' },
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
        fontFamily: '"Cinzel", serif',
        fontSize: 9,
        letterSpacing: '0.2em',
        color: state.color,
      }}>
        STATUS: {state.label}
      </span>
    </div>
  );
}

/* ── Disqualification Modal ───────────────────────────────────────── */
function DisqualificationModal({ onLogout }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.97)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        zIndex: 9999,
      }}
    >
      <motion.div
        initial={{ scale: 0.8, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 180, damping: 18 }}
        style={{
          background: '#080808',
          border: '2px solid rgba(192,57,43,0.6)',
          borderRadius: 4,
          padding: '56px 48px',
          maxWidth: 480,
          width: '90%',
          textAlign: 'center',
          position: 'relative',
          boxShadow: '0 0 80px rgba(192,57,43,0.2)',
        }}
      >
        {/* Corner brackets — red */}
        {[
          { top: 10, left: 10,   borderTop: '2px solid rgba(192,57,43,0.7)',    borderLeft:  '2px solid rgba(192,57,43,0.7)'  },
          { top: 10, right: 10,  borderTop: '2px solid rgba(192,57,43,0.7)',    borderRight: '2px solid rgba(192,57,43,0.7)'  },
          { bottom: 10, left: 10, borderBottom: '2px solid rgba(192,57,43,0.7)', borderLeft: '2px solid rgba(192,57,43,0.7)' },
          { bottom: 10, right: 10, borderBottom: '2px solid rgba(192,57,43,0.7)', borderRight: '2px solid rgba(192,57,43,0.7)' },
        ].map((s, i) => (
          <div key={i} style={{ position: 'absolute', width: 20, height: 20, ...s }} />
        ))}

        {/* Hieroglyph */}
        <div style={{
          fontSize: 52,
          marginBottom: 24,
          filter: 'drop-shadow(0 0 20px rgba(192,57,43,0.5))',
          animation: 'redGlow 2s ease-in-out infinite',
        }}>
          𓂀
        </div>

        <h2 style={{
          fontFamily: '"Cinzel Decorative", serif',
          fontSize: 'clamp(16px, 3vw, 22px)',
          color: '#C0392B',
          letterSpacing: '0.06em',
          marginBottom: 20,
          lineHeight: 1.4,
        }}>
          The Gods Have<br />Judged You Unworthy
        </h2>

        <div style={{
          width: '60%',
          height: 1,
          background: 'linear-gradient(to right, transparent, rgba(192,57,43,0.5), transparent)',
          margin: '0 auto 20px',
        }} />

        {/* Hieroglyph border strip */}
        <p style={{
          fontFamily: '"Cinzel", serif',
          fontSize: 9,
          letterSpacing: '0.25em',
          color: 'rgba(192,57,43,0.4)',
          marginBottom: 20,
        }}>
          𓂀 𓅓 𓆙 𓋴 𓇯 𓃒 𓏏 𓈖 𓆣 𓋹
        </p>

        <p style={{
          fontFamily: '"IM Fell English", serif',
          fontStyle: 'italic',
          fontSize: 15,
          color: 'rgba(232,213,160,0.65)',
          lineHeight: 1.75,
          marginBottom: 36,
        }}>
          You have been disqualified from the sacred hunt.
          The chamber seals itself against you.
        </p>

        <button
          id="disqual-logout-btn"
          onClick={onLogout}
          style={{
            background: 'rgba(192,57,43,0.18)',
            border: '2px solid rgba(192,57,43,0.6)',
            color: '#C0392B',
            padding: '14px 48px',
            fontFamily: '"Cinzel", serif',
            fontWeight: 700,
            fontSize: 12,
            letterSpacing: '0.3em',
            cursor: 'none',
            borderRadius: 2,
            transition: 'background 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(192,57,43,0.3)';
            e.currentTarget.style.boxShadow = '0 0 24px rgba(192,57,43,0.4)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(192,57,43,0.18)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          DEPART IN SHAME
        </button>

        <style>{`
          @keyframes redGlow {
            0%, 100% { filter: drop-shadow(0 0 12px rgba(192,57,43,0.4)); }
            50%       { filter: drop-shadow(0 0 28px rgba(192,57,43,0.8)); }
          }
        `}</style>
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
          fontFamily: '"Cinzel Decorative", serif',
          fontSize: 'clamp(18px, 3.5vw, 26px)',
          color: '#C9A84C',
          letterSpacing: '0.08em',
          marginBottom: 16,
        }}>
          Time Has Expired
        </h2>
        <p style={{
          fontFamily: '"IM Fell English", serif',
          fontStyle: 'italic',
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
            fontFamily: '"Cinzel", serif',
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
        {/* Corner brackets */}
        {[
          { top: 8, left: 8,    borderTop: '2px solid rgba(201,168,76,0.5)', borderLeft:  '2px solid rgba(201,168,76,0.5)' },
          { top: 8, right: 8,   borderTop: '2px solid rgba(201,168,76,0.5)', borderRight: '2px solid rgba(201,168,76,0.5)' },
          { bottom: 8, left: 8,  borderBottom: '2px solid rgba(201,168,76,0.5)', borderLeft:  '2px solid rgba(201,168,76,0.5)' },
          { bottom: 8, right: 8, borderBottom: '2px solid rgba(201,168,76,0.5)', borderRight: '2px solid rgba(201,168,76,0.5)' },
        ].map((s, i) => (
          <div key={i} style={{ position: 'absolute', width: 14, height: 14, ...s }} />
        ))}

        <p style={{
          fontFamily: '"Cinzel Decorative", serif',
          fontSize: 15,
          color: '#E8D5A0',
          marginBottom: 10,
          letterSpacing: '0.05em',
        }}>
          Leave the Chamber?
        </p>
        <p style={{
          fontFamily: '"IM Fell English", serif',
          fontStyle: 'italic',
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
              fontFamily: '"Cinzel", serif',
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
              fontFamily: '"Cinzel", serif',
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

/* ── Main Game component ──────────────────────────────────────────── */
export default function Game() {
  const { n } = useParams();
  const roundNum = parseInt(n, 10);
  const navigate = useNavigate();
  const { profile } = useAuth();

  const {
    question, progress, loading, error,
    cardState, hint,
    fetchCurrent, submitAnswer, skipQuestion, requestHint,
  } = useGame();

  const [answer, setAnswer]               = useState('');
  const [score, setScore]                 = useState(profile?.score ?? 0);
  const [showSkipConfirm, setShowSkipConfirm] = useState(false);
  const [feedback, setFeedback]           = useState(null);
  const [roundOverlay, setRoundOverlay]   = useState(null);
  const [triesLeft, setTriesLeft]         = useState(3);
  const [disqualified, setDisqualified]   = useState(profile?.disqualified ?? false);
  const [gameExpired, setGameExpired]     = useState(profile?.game_finished ?? false);
  const [gameStartTime, setGameStartTime] = useState(profile?.game_start_time ?? null);
  const [showBackToast, setShowBackToast] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    (async () => {
      const data = await fetchCurrent();
      if (!data) return;

      if (data.disqualified) { setDisqualified(true); return; }
      if (data.expired || data.gameFinished) { setGameExpired(true); return; }
      if (data.completed) { handleCompletion({}); return; }

      // Sync game start time from server
      if (data.gameStartTime) setGameStartTime(data.gameStartTime);
      if (data.progress?.triesLeft !== undefined) setTriesLeft(data.progress.triesLeft);

      if (data.question && data.progress.round !== roundNum) {
        const r = data.progress.round;
        if (r >= 4) navigate('/wildcard', { replace: true });
        else navigate(`/round/${r}`, { replace: true });
      }
    })();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (profile?.score !== undefined) setScore(profile.score);
    if (profile?.disqualified)        setDisqualified(true);
    if (profile?.game_finished)       setGameExpired(true);
    if (profile?.game_start_time)     setGameStartTime(profile.game_start_time);
  }, [profile]);

  // ── Handle back button click ────────────────────────────────────
  function handleBack() {
    if (answer.trim().length > 0) {
      setShowBackToast(true);
    } else {
      navigate('/rounds');
    }
  }

  // ── Handle timer expiry ─────────────────────────────────────────
  const handleTimerExpire = useCallback(async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        await api.post('/game/expire', {}, {
          headers: { Authorization: `Bearer ${session.access_token}` },
        });
      }
    } catch { /* silent */ }
    setGameExpired(true);
  }, []);

  // ── Handle logout ───────────────────────────────────────────────
  async function handleLogout() {
    await supabase.auth.signOut();
    navigate('/');
  }

  async function handleAnswer(e) {
    e.preventDefault();
    if (!answer.trim() || loading) return;

    const result = await submitAnswer(answer);
    if (!result) return;

    // Handle disqualification from backend
    if (result.disqualified) {
      setDisqualified(true);
      return;
    }

    if (result.expired || result.gameFinished) {
      setGameExpired(true);
      return;
    }

    setScore(result.newScore);
    setAnswer('');
    setFeedback({ correct: result.correct, delta: result.scoreDelta });
    setTimeout(() => setFeedback(null), 1500);

    // Update tries remaining
    if (result.triesLeft !== undefined) setTriesLeft(result.triesLeft);

    await next(result);
  }

  async function handleSkip() {
    setShowSkipConfirm(false);
    const result = await skipQuestion();
    if (!result) return;
    if (result.disqualified) { setDisqualified(true); return; }
    if (result.expired || result.gameFinished) { setGameExpired(true); return; }
    setScore(result.newScore);
    setTriesLeft(3);
    await next(result);
  }

  async function next(result) {
    if (result.completed) return handleCompletion(result);
    if (result.roundComplete) {
      await handleRoundComplete(result.newRound);
    } else {
      const data = await fetchCurrent();
      if (data?.progress?.triesLeft !== undefined) setTriesLeft(data.progress.triesLeft);
      inputRef.current?.focus();
    }
  }

  async function handleRoundComplete(newRound) {
    setRoundOverlay(roundNum);
    await new Promise(r => setTimeout(r, 2400));
    setRoundOverlay(null);
    if (roundNum === 3) {
      navigate('/rumbling');
    } else {
      // Navigate to rounds page with justCompleted + justUnlocked chain-break
      navigate('/rounds', {
        state: { justCompleted: true, justUnlocked: roundNum + 1 },
      });
    }
  }

  function handleCompletion(result) {
    setTimeout(() => {
      if (profile?.status === 'passed' || (result.newScore ?? score) >= 10) {
        navigate('/pass');
      } else {
        navigate('/fail');
      }
    }, 800);
  }

  const suit   = ROUND_SUITS[roundNum] || 'spades';
  const glyph  = SUIT_GLYPHS[suit];
  const symbol = SUIT_SYMBOLS[suit];

  return (
    <div style={{
      minHeight: '100vh',
      background: '#080808',
      color: '#F5ECD0',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Egyptian Nav */}
      <EgyptianNav
        score={score}
        progress={progress}
        onBack={handleBack}
        gameStartTime={gameStartTime}
        onTimerExpire={handleTimerExpire}
      />

      {/* Main two-column layout */}
      <div style={{
        flex: 1,
        paddingTop: 56,
        display: 'grid',
        gridTemplateColumns: 'minmax(280px, 380px) 1fr',
        gap: 0,
        minHeight: 'calc(100vh - 56px)',
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
              fontFamily: '"Cinzel", serif',
              fontSize: 9,
              letterSpacing: '0.3em',
              color: 'rgba(201,168,76,0.4)',
              marginBottom: 4,
            }}>
              CHALLENGE
            </p>
            <p style={{
              fontFamily: '"Cinzel Decorative", serif',
              fontSize: 22,
              color: '#C9A84C',
              textShadow: '0 0 20px rgba(201,168,76,0.4)',
            }}>
              {progress
                ? `${progress.questionInRound + (roundNum - 1) * 5} / ${progress.totalQuestions}`
                : `— / —`
              }
            </p>
          </div>

          {/* The Card */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            {question ? (
              <>
                <QuestionCard question={question} cardState={cardState} />
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
                        fontFamily: '"Cinzel Decorative", serif',
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
                  fontFamily: '"Cinzel", serif',
                  fontSize: 9,
                  letterSpacing: '0.25em',
                  color: 'rgba(201,168,76,0.4)',
                }}>
                  SUMMONING THE SCROLL…
                </span>
              </div>
            ) : null}
          </div>

          {/* Type / Suit labels */}
          {question && (
            <div style={{ textAlign: 'center', zIndex: 1 }}>
              <p style={{
                fontFamily: '"Cinzel", serif',
                fontSize: 9,
                letterSpacing: '0.2em',
                color: 'rgba(201,168,76,0.4)',
              }}>
                SUIT: <span style={{ color: 'rgba(201,168,76,0.7)' }}>{suit.toUpperCase()} {symbol}</span>
              </p>
            </div>
          )}

          {/* Progress pips */}
          {progress && (
            <div style={{ zIndex: 1 }}>
              <ProgressPips
                total={5}
                current={progress.questionInRound - 1}
                suit={suit}
              />
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

          {/* Round label */}
          <div>
            <p style={{
              fontFamily: '"Cinzel", serif',
              fontSize: 10,
              letterSpacing: '0.3em',
              color: 'rgba(201,168,76,0.4)',
              marginBottom: 6,
            }}>
              ROUND {roundNum}
            </p>
            <h2 style={{
              fontFamily: '"Cinzel Decorative", serif',
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
          <div style={{ flex: 1 }}>
            <p style={{
              fontFamily: '"Cinzel", serif',
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
                }}
              >
                <p style={{
                  fontFamily: '"IM Fell English", Georgia, serif',
                  fontStyle: 'italic',
                  fontSize: 'clamp(15px, 1.8vw, 18px)',
                  color: '#F5ECD0',
                  lineHeight: 1.8,
                  whiteSpace: 'pre-wrap',
                }}>
                  "{question.question}"
                </p>
              </motion.div>
            ) : (
              <div style={{
                background: 'rgba(201,168,76,0.02)',
                border: '1px solid rgba(201,168,76,0.08)',
                borderRadius: 2,
                padding: '40px',
                textAlign: 'center',
              }}>
                <span style={{ color: 'rgba(201,168,76,0.2)', fontFamily: '"Cinzel", serif', fontSize: 11, letterSpacing: '0.2em' }}>
                  AWAITING SCROLL…
                </span>
              </div>
            )}
          </div>

          {/* Hint display */}
          <AnimatePresence>
            {hint && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{
                  background: 'rgba(201,168,76,0.06)',
                  border: '1px solid rgba(201,168,76,0.2)',
                  borderRadius: 2,
                  padding: '14px 20px',
                  display: 'flex',
                  gap: 10,
                  alignItems: 'flex-start',
                }}
              >
                <span style={{ fontSize: 16 }}>𓃒</span>
                <p style={{
                  fontFamily: '"IM Fell English", serif',
                  fontStyle: 'italic',
                  fontSize: 14,
                  color: '#E8D5A0',
                  lineHeight: 1.6,
                }}>
                  {hint}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Answer input */}
          {question && (
            <EgyptianInput
              value={answer}
              onChange={e => setAnswer(e.target.value)}
              onSubmit={handleAnswer}
              loading={loading}
              disabled={loading}
              inputRef={inputRef}
            />
          )}

          {/* 3-tries indicator */}
          {question && <TriesIndicator triesLeft={triesLeft} />}

          {/* Status + actions */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12,
          }}>
            <StatusIndicator cardState={cardState} feedback={feedback} />

            <div style={{ display: 'flex', gap: 10 }}>
              {/* Hint button */}
              <button
                id="hint-btn"
                type="button"
                onClick={requestHint}
                title="Request a hint"
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(201,168,76,0.2)',
                  borderRadius: 2,
                  padding: '8px 16px',
                  fontFamily: '"Cinzel", serif',
                  fontSize: 9,
                  letterSpacing: '0.15em',
                  color: 'rgba(201,168,76,0.4)',
                  cursor: 'none',
                  transition: 'border-color 0.2s, color 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(201,168,76,0.5)';
                  e.currentTarget.style.color = '#C9A84C';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)';
                  e.currentTarget.style.color = 'rgba(201,168,76,0.4)';
                }}
              >
                𓃒 HINT
              </button>

              {/* Skip button */}
              <button
                id="skip-btn"
                type="button"
                onClick={() => setShowSkipConfirm(true)}
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(192,57,43,0.3)',
                  borderRadius: 2,
                  padding: '8px 16px',
                  fontFamily: '"Cinzel", serif',
                  fontSize: 9,
                  letterSpacing: '0.15em',
                  color: 'rgba(192,57,43,0.5)',
                  cursor: 'none',
                  transition: 'border-color 0.2s, color 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(192,57,43,0.6)';
                  e.currentTarget.style.color = '#C0392B';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(192,57,43,0.3)';
                  e.currentTarget.style.color = 'rgba(192,57,43,0.5)';
                }}
              >
                SKIP −1pt
              </button>
            </div>
          </div>

          {error && (
            <p style={{
              fontFamily: '"IM Fell English", serif',
              fontStyle: 'italic',
              fontSize: 13,
              color: '#C0392B',
              textAlign: 'center',
            }}>
              {error}
            </p>
          )}
        </div>
      </div>

      {/* ── Skip Confirmation Modal ──────────────────────────────── */}
      <AnimatePresence>
        {showSkipConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(0,0,0,0.88)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              zIndex: 300,
              backdropFilter: 'blur(8px)',
            }}
          >
            <motion.div
              initial={{ scale: 0.88, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.88, y: 16 }}
              style={{
                background: '#0A0A0A',
                border: '2px solid rgba(201,168,76,0.4)',
                borderRadius: 4,
                padding: '40px 36px',
                maxWidth: 380,
                width: '90%',
                textAlign: 'center',
                animation: 'goldPulse 3s ease-in-out infinite',
                position: 'relative',
              }}
            >
              {[
                { top: 8, left: 8,    borderTop: '2px solid rgba(201,168,76,0.6)', borderLeft:  '2px solid rgba(201,168,76,0.6)' },
                { top: 8, right: 8,   borderTop: '2px solid rgba(201,168,76,0.6)', borderRight: '2px solid rgba(201,168,76,0.6)' },
                { bottom: 8, left: 8,  borderBottom: '2px solid rgba(201,168,76,0.6)', borderLeft:  '2px solid rgba(201,168,76,0.6)' },
                { bottom: 8, right: 8, borderBottom: '2px solid rgba(201,168,76,0.6)', borderRight: '2px solid rgba(201,168,76,0.6)' },
              ].map((s, i) => (
                <div key={i} style={{ position: 'absolute', width: 16, height: 16, ...s }} />
              ))}
              <p style={{
                fontFamily: '"Cinzel Decorative", serif',
                fontSize: 16,
                color: '#E8D5A0',
                marginBottom: 12,
                letterSpacing: '0.05em',
              }}>
                Abandon This Scroll?
              </p>
              <p style={{
                fontFamily: '"IM Fell English", serif',
                fontStyle: 'italic',
                fontSize: 13,
                color: 'rgba(192,57,43,0.7)',
                marginBottom: 28,
              }}>
                The gods will deduct one point from your sacred tally.
              </p>
              <div style={{ display: 'flex', gap: 12 }}>
                <button
                  id="skip-cancel-btn"
                  onClick={() => setShowSkipConfirm(false)}
                  className="btn-ghost"
                  style={{ flex: 1 }}
                >
                  RETREAT
                </button>
                <button
                  id="skip-confirm-btn"
                  onClick={handleSkip}
                  style={{
                    flex: 1,
                    background: 'rgba(192,57,43,0.15)',
                    border: '1px solid rgba(192,57,43,0.5)',
                    color: '#C0392B',
                    fontFamily: '"Cinzel", serif',
                    fontSize: 10,
                    letterSpacing: '0.2em',
                    padding: '10px 20px',
                    cursor: 'none',
                    borderRadius: 2,
                    transition: 'background 0.2s',
                  }}
                >
                  SKIP −1pt
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Back Toast ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {showBackToast && (
          <BackToast
            onStay={() => setShowBackToast(false)}
            onLeave={() => navigate('/rounds')}
          />
        )}
      </AnimatePresence>

      {/* ── Disqualification Modal ───────────────────────────────────── */}
      <AnimatePresence>
        {disqualified && <DisqualificationModal onLogout={handleLogout} />}
      </AnimatePresence>

      {/* ── Timer Expired Overlay ────────────────────────────────────── */}
      <AnimatePresence>
        {gameExpired && !disqualified && <ExpiredModal onLogout={handleLogout} />}
      </AnimatePresence>

      {/* ── Round Complete Overlay ───────────────────────────────────── */}
      <AnimatePresence>
        {roundOverlay && (
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
                fontFamily: '"Cinzel", serif',
                fontSize: 10,
                letterSpacing: '0.4em',
                color: 'rgba(201,168,76,0.5)',
                marginBottom: 16,
              }}>
                {roundOverlay === 3 ? 'PREPARE THYSELF…' : 'THE GODS ARE PLEASED'}
              </p>
              <h2 style={{
                fontFamily: '"Cinzel Decorative", serif',
                fontSize: 'clamp(28px, 5vw, 42px)',
                color: '#C9A84C',
                textShadow: '0 0 40px rgba(201,168,76,0.4)',
                letterSpacing: '0.1em',
              }}>
                ROUND {roundOverlay} COMPLETE
              </h2>
              <p style={{
                fontFamily: '"IM Fell English", serif',
                fontStyle: 'italic',
                marginTop: 16,
                color: 'rgba(232,213,160,0.5)',
                fontSize: 15,
              }}>
                {roundOverlay === 3 ? 'The Rumbling of the Underworld awaits…' : `Entering Round ${roundOverlay + 1}`}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
