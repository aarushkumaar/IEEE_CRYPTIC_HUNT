import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { useGame } from '../hooks/useGame';
import QuestionCard from '../components/QuestionCard';
import ScoreBar from '../components/ScoreBar';
import ProgressPips from '../components/ProgressPips';
import api from '../lib/api';

/* ── Uncopyable text renderer ─────────────────────────────────── */
function UncopyableText({ text, style }) {
  return (
    <p style={{
      userSelect: 'none',
      WebkitUserSelect: 'none',
      MozUserSelect: 'none',
      msUserSelect: 'none',
      WebkitTouchCallout: 'none',
      ...style,
    }}>
      {text.split('').map((char, i) => (
        <span key={i} style={{ display: 'inline', userSelect: 'none', WebkitUserSelect: 'none' }}>
          {char}
        </span>
      ))}
    </p>
  );
}

export default function Wildcard() {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const {
    question, progress, loading, error,
    cardState,
    fetchCurrent, submitAnswer, skipQuestion,
  } = useGame();

  const [answer, setAnswer]           = useState('');
  const [score, setScore]             = useState(profile?.score ?? 0);
  const [showSkipConfirm, setShowSkipConfirm] = useState(false);
  const [feedback, setFeedback]       = useState(null);
  const [showFullscreenWarning, setShowFullscreenWarning] = useState(false);
  const inputRef = useRef(null);
  const fullscreenViolations = useRef(0);

  useEffect(() => {
    (async () => {
      // For mock API: signal that we're loading the wildcard round
      sessionStorage.setItem('mockPendingRound', '4');
      
      const data = await fetchCurrent();
      if (data?.completed) navigate('/pass');
    })();
  }, []);

  /* ── Copy / context-menu protection ────────────────────────────── */
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

  /* ── Fullscreen enforcement ────────────────────────────────── */
  // NOTE: requestFullscreen is blocked on HTTP. Works after Vercel (HTTPS) deployment.
  useEffect(() => {
    const requestFS = async () => {
      try {
        await document.documentElement.requestFullscreen();
      } catch (err) {
        console.log('Fullscreen not available (HTTP or browser restriction)');
      }
    };
    requestFS();

    const handleFullscreenChange = async () => {
      if (!document.fullscreenElement) {
        fullscreenViolations.current += 1;

        if (fullscreenViolations.current === 1) {
          setShowFullscreenWarning(true);
          setTimeout(async () => {
            try {
              await document.documentElement.requestFullscreen();
            } catch {}
          }, 3000);
        }

        if (fullscreenViolations.current >= 2) {
          try {
            await api.post('/game/eliminate-fullscreen');
          } catch {}
          navigate('/eliminated', {
            state: { reason: 'Exited fullscreen twice during the hunt.' },
          });
        }
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [navigate]);

  useEffect(() => {
    if (profile?.score !== undefined) setScore(profile.score);
  }, [profile]);

  async function handleAnswer(e) {
    e.preventDefault();
    if (!answer.trim() || loading) return;
    const result = await submitAnswer(answer);
    if (!result) return;
    
    setScore(result.newScore);
    setAnswer('');
    setFeedback({ correct: result.correct });
    
    // Handle wildcard results
    if (result.disqualified) {
      // Failed the wildcard - game over
      setTimeout(() => navigate('/fail'), 1500);
      return;
    }
    
    if (result.completed && result.correct) {
      // Won the wildcard - go to victory!
      setTimeout(() => navigate('/victory'), 1500);
      return;
    }
    
    setTimeout(() => setFeedback(null), 1200);
    await fetchCurrent();
    inputRef.current?.focus();
  }

  async function handleSkip() {
    setShowSkipConfirm(false);
    const result = await skipQuestion();
    if (!result) return;
    setScore(result.newScore);
    if (result.completed) {
      navigate(result.newScore >= 10 ? '/pass' : '/fail');
      return;
    }
    await fetchCurrent();
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#080808', color: '#F5ECD0' }}>
      {/* Fullscreen violation warning */}
      {showFullscreenWarning && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            position: 'fixed', top: 20, left: '50%',
            transform: 'translateX(-50%)',
            background: '#1A0A0A',
            border: '2px solid #F04A57',
            color: '#F04A57',
            padding: '16px 32px',
            zIndex: 99999,
            fontFamily: '"Cinzel", serif',
            fontSize: 13,
            letterSpacing: '0.1em',
            textAlign: 'center',
          }}
        >
          ⚠ WARNING: FULLSCREEN VIOLATION 1/2
          <br />
          <span style={{ fontSize: 10, color: '#E8D5A0' }}>
            Exit again and you will be eliminated from the hunt.
          </span>
        </motion.div>
      )}

      {/* Special Wildcard ScoreBar */}
      <div
        className="w-full flex items-center justify-between px-4 md:px-8 py-3"
        style={{
          background: 'rgba(8,8,14,0.9)',
          borderBottom: '1px solid rgba(245,197,66,0.3)',
          backdropFilter: 'blur(12px)',
          position: 'sticky', top: 0, zIndex: 50,
        }}
      >
        <div className="font-display font-bold text-sm" style={{ color: '#C9A84C' }}>
          ♠♥♦♣ WILDCARD ROUND
        </div>
        <div className="flex items-center gap-1">
          <span style={{ fontSize: 12, color: 'rgba(201,168,76,0.6)' }}>Score</span>
          <span style={{ fontFamily: '"Cinzel", serif', fontWeight: 'bold', fontSize: 18, color: '#C9A84C' }}>{score}</span>
        </div>
        <span style={{ fontFamily: '"Courier New", monospace', fontSize: 12, color: 'rgba(201,168,76,0.5)' }}>
          Q1/1
        </span>
      </div>

      {/* Ambient glow */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 50% 40%, rgba(201,168,76,0.04) 0%, transparent 60%)',
      }} />

      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '32px 16px', gap: 24, position: 'relative', zIndex: 10
      }}>
        {!question && !loading && (
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: '#C9A84C', fontFamily: '"Cinzel", serif', fontSize: 14, marginBottom: 16 }}>
              Loading Wildcard Question...
            </p>
          </div>
        )}
        
        {question && (
          <div style={{ position: 'relative' }}>
            {/* Wildcard badge */}
            <div
              style={{
                position: 'absolute', top: -24, left: '50%', transform: 'translateX(-50%)',
                fontFamily: '"Courier New", monospace', fontSize: 12, paddingX: 12, paddingY: 4, borderRadius: '50%', zIndex: 10,
                background: 'rgba(201,168,76,0.12)',
                border: '1px solid rgba(201,168,76,0.3)',
                color: '#C9A84C',
              }}
            >
              ✦ WILDCARD
            </div>
            <QuestionCard
              question={question}
              cardState={cardState}
              isWildcard
            />
            <AnimatePresence>
              {feedback && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    position: 'absolute', inset: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    borderRadius: 16,
                    background: feedback.correct ? 'rgba(34,215,123,0.15)' : 'rgba(240,74,87,0.15)',
                    pointerEvents: 'none', zIndex: 10,
                  }}
                >
                  <span style={{
                    fontFamily: '"Cinzel Decorative", serif', fontWeight: 700, fontSize: 36,
                    color: feedback.correct ? '#27AE60' : '#C0392B',
                  }}>
                    {feedback.correct ? '✓ +1' : '✗'}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}



        {question && (
          <form onSubmit={handleAnswer} style={{ width: '100%', maxWidth: 448, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <input
              ref={inputRef}
              id="wildcard-answer-input"
              type="text"
              placeholder="Type your answer…"
              value={answer}
              onChange={e => setAnswer(e.target.value)}
              autoComplete="off"
              autoFocus
              style={{
                padding: '12px', borderRadius: 4, fontFamily: '"IM Fell English", serif', fontSize: 14,
                background: '#0A0A08', border: '1px solid rgba(201,168,76,0.3)', color: '#F5ECD0',
                outline: 'none',
              }}
            />
            <div style={{ display: 'flex', gap: 12 }}>
              <button id="wildcard-submit-btn" type="submit" disabled={loading || !answer.trim()} 
                style={{ flex: 1, background: '#C9A84C', color: '#08080E', border: 'none', padding: '12px 16px', borderRadius: 4, fontFamily: '"Cinzel", serif', fontWeight: 700, cursor: 'pointer', opacity: loading || !answer.trim() ? 0.5 : 1 }}>
                {loading ? '...' : 'Submit'}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Skip confirm - DISABLED */}
      <div style={{ display: 'none' }}>
      <AnimatePresence>
        {showSkipConfirm && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100,
            }}
          >
            <motion.div
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="glass rounded-2xl p-8 max-w-sm mx-4 text-center"
            >
              <p className="font-display font-bold text-lg text-text-primary mb-2">Skip this question?</p>
              <p className="font-body text-sm mb-6" style={{ color: 'var(--danger)' }}>−1 point will be deducted.</p>
              <div className="flex gap-3">
                <button onClick={() => setShowSkipConfirm(false)} className="btn-ghost flex-1">Cancel</button>
                <button onClick={handleSkip}
                  className="flex-1 font-display font-semibold py-2 px-4 rounded-lg"
                  style={{ background: 'var(--danger)', color: 'white', border: 'none', cursor: 'pointer' }}>
                  Skip −1pt
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </div>
  );
}
