import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { useGame } from '../hooks/useGame';
import QuestionCard from '../components/QuestionCard';
import ScoreBar from '../components/ScoreBar';
import ProgressPips from '../components/ProgressPips';

export default function Wildcard() {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const {
    question, progress, loading, error,
    cardState, hint,
    fetchCurrent, submitAnswer, skipQuestion, requestHint,
  } = useGame();

  const [answer, setAnswer]           = useState('');
  const [score, setScore]             = useState(profile?.score ?? 0);
  const [showSkipConfirm, setShowSkipConfirm] = useState(false);
  const [feedback, setFeedback]       = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    (async () => {
      const data = await fetchCurrent();
      if (data?.completed) navigate('/pass');
    })();
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
    setTimeout(() => setFeedback(null), 1200);
    if (result.completed) {
      setTimeout(() => navigate(result.newScore >= 10 ? '/pass' : '/fail'), 1000);
      return;
    }
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
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg-base)' }}>
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
        <div className="font-display font-bold text-sm" style={{ color: 'var(--gold)' }}>
          ♠♥♦♣ WILDCARD ROUND
        </div>
        <div className="flex items-center gap-1">
          <span className="text-text-secondary text-xs">Score</span>
          <span className="font-display font-bold text-lg" style={{ color: 'var(--gold)' }}>{score}</span>
        </div>
        <span className="font-mono text-sm" style={{ color: 'var(--text-secondary)' }}>
          Q{progress?.questionInRound ?? '?'}/5
        </span>
      </div>

      {/* Ambient glow */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 50% 40%, rgba(245,197,66,0.04) 0%, transparent 60%)',
      }} />

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 gap-6 relative z-10">
        {question && (
          <div style={{ position: 'relative' }}>
            {/* Wildcard badge */}
            <div
              className="absolute -top-6 left-1/2 -translate-x-1/2 font-mono text-xs px-3 py-1 rounded-full z-10"
              style={{
                background: 'rgba(245,197,66,0.12)',
                border: '1px solid rgba(245,197,66,0.3)',
                color: 'var(--gold)',
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
                  <span className="font-display font-bold text-3xl" style={{
                    color: feedback.correct ? 'var(--success)' : 'var(--danger)',
                  }}>
                    {feedback.correct ? '✓ +1' : '✗'}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        <AnimatePresence>
          {hint && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-sm w-full px-4 py-3 rounded-lg font-body text-sm"
              style={{
                background: 'rgba(245,197,66,0.08)',
                border: '1px solid rgba(245,197,66,0.2)',
                color: 'var(--gold)',
              }}
            >
              💡 {hint}
            </motion.div>
          )}
        </AnimatePresence>

        {question && (
          <form onSubmit={handleAnswer} className="w-full max-w-sm flex flex-col gap-3">
            <input
              ref={inputRef}
              id="wildcard-answer-input"
              className="input-dark text-center"
              type="text"
              placeholder="Type your answer…"
              value={answer}
              onChange={e => setAnswer(e.target.value)}
              autoComplete="off"
              autoFocus
            />
            <div className="flex gap-3">
              <button id="wildcard-submit-btn" type="submit" disabled={loading || !answer.trim()} className="btn-primary flex-1"
                style={{ background: 'var(--gold)', color: '#08080E' }}>
                {loading ? <span className="flex justify-center"><span className="spinner" style={{ width: 18, height: 18, borderTopColor: '#08080E' }} /></span> : 'Submit'}
              </button>
              <button type="button" onClick={requestHint} className="btn-ghost px-4" title="Hint">💡</button>
              <button type="button" onClick={() => setShowSkipConfirm(true)} className="btn-ghost px-3">Skip</button>
            </div>
          </form>
        )}

        {progress && (
          <ProgressPips total={5} current={progress.questionInRound - 1} suit="diamonds" />
        )}
      </div>

      {/* Skip confirm */}
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
  );
}
