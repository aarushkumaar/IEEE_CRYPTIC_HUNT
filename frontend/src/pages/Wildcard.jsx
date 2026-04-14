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
  const inputRef = useRef(null);

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
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#080808', color: '#F5ECD0' }}>

      {/* Wildcard ScoreBar */}
      <div
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 24px', height: 56,
          background: 'rgba(8,8,14,0.92)',
          borderBottom: '1px solid rgba(245,197,66,0.3)',
          backdropFilter: 'blur(12px)',
          position: 'sticky', top: 0, zIndex: 50,
        }}
      >
        <div style={{ fontFamily: '"Inter", system-ui, sans-serif', fontWeight: 700, fontSize: 13, color: '#C9A84C', letterSpacing: '0.1em' }}>
          ✦ WILDCARD ROUND
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 11, color: 'rgba(201,168,76,0.6)', fontFamily: '"Inter", system-ui, sans-serif' }}>SCORE</span>
          <span style={{ fontFamily: '"Inter", system-ui, sans-serif', fontWeight: 700, fontSize: 18, color: '#C9A84C' }}>{score}</span>
        </div>
      </div>

      {/* Ambient glow */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 50% 40%, rgba(201,168,76,0.04) 0%, transparent 60%)',
      }} />

      {/* Main content — card + question + answer */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '32px 16px', gap: 28, position: 'relative', zIndex: 10,
      }}>
        {!question && !loading && (
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: '#C9A84C', fontFamily: '"Inter", system-ui, sans-serif', fontSize: 14 }}>
              Loading Wildcard Question...
            </p>
          </div>
        )}

        {question && (
          <>
            {/* Card with hidden jokers */}
            <div style={{ position: 'relative' }}>
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
                      fontFamily: '"Inter", system-ui, sans-serif', fontWeight: 700, fontSize: 36,
                      color: feedback.correct ? '#27AE60' : '#C0392B',
                    }}>
                      {feedback.correct ? '✓ +1' : '✗'}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Question text (displayed on the page, not on the card) */}
            <motion.div
              key={question.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              style={{
                width: '100%',
                maxWidth: 520,
                background: 'rgba(201,168,76,0.03)',
                border: '1px solid rgba(201,168,76,0.1)',
                borderLeft: '3px solid rgba(201,168,76,0.4)',
                padding: '24px 28px',
                borderRadius: 2,
                userSelect: 'none',
                WebkitUserSelect: 'none',
              }}
            >
              <p style={{
                fontFamily: '"Inter", system-ui, sans-serif',
                fontSize: 9,
                letterSpacing: '0.3em',
                color: 'rgba(201,168,76,0.4)',
                marginBottom: 12,
              }}>
                PROBLEM
              </p>
              <UncopyableText
                text={`"${question.question}"`}
                style={{
                  fontFamily: '"Inter", system-ui, sans-serif',
                  fontSize: 'clamp(14px, 1.8vw, 17px)',
                  color: '#F5ECD0',
                  lineHeight: 1.8,
                }}
              />
            </motion.div>

            {/* Answer form */}
            <form onSubmit={handleAnswer} style={{ width: '100%', maxWidth: 520, display: 'flex', gap: 10 }}>
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
                  flex: 1,
                  padding: '13px 16px',
                  borderRadius: 2,
                  fontFamily: '"Inter", system-ui, sans-serif',
                  fontSize: 15,
                  background: '#0A0A08',
                  border: '1px solid rgba(201,168,76,0.3)',
                  color: '#F5ECD0',
                  outline: 'none',
                }}
              />
              <button
                id="wildcard-submit-btn"
                type="submit"
                disabled={loading || !answer.trim()}
                style={{
                  background: '#C9A84C',
                  color: '#080808',
                  border: 'none',
                  padding: '13px 24px',
                  borderRadius: 2,
                  fontFamily: '"Inter", system-ui, sans-serif',
                  fontWeight: 700,
                  fontSize: 10,
                  letterSpacing: '0.2em',
                  cursor: loading || !answer.trim() ? 'not-allowed' : 'pointer',
                  opacity: loading || !answer.trim() ? 0.5 : 1,
                  minWidth: 90,
                }}
              >
                {loading ? '...' : 'SUBMIT'}
              </button>
            </form>

            {/* One-attempt warning */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              background: 'rgba(192,57,43,0.12)',
              border: '2px solid rgba(192,57,43,0.5)',
              borderRadius: 2,
              padding: '10px 18px',
            }}>
              <span style={{ fontSize: 16 }}>⚠</span>
              <span style={{
                fontFamily: '"Inter", system-ui, sans-serif',
                fontSize: 9,
                letterSpacing: '0.22em',
                color: '#C0392B',
              }}>
                ONE ATTEMPT. NO SECOND CHANCE.
              </span>
            </div>
          </>
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
