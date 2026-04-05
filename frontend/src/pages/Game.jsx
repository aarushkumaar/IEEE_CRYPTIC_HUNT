import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { useGame } from '../hooks/useGame';
import QuestionCard from '../components/QuestionCard';
import ScoreBar from '../components/ScoreBar';
import ProgressPips from '../components/ProgressPips';

const ROUND_SUITS = { 1: 'spades', 2: 'hearts', 3: 'diamonds', 4: 'clubs' };

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

  const [answer, setAnswer]           = useState('');
  const [score, setScore]             = useState(profile?.score ?? 0);
  const [showSkipConfirm, setShowSkipConfirm] = useState(false);
  const [feedback, setFeedback]       = useState(null); // {correct: bool, delta: number}
  const [roundOverlay, setRoundOverlay] = useState(null);
  const inputRef = useRef(null);

  // Load first question on mount
  useEffect(() => {
    (async () => {
      const data = await fetchCurrent();
      if (data?.completed) handleCompletion({});
      if (data?.question && data.progress.round !== roundNum) {
        // Player is on wrong round URL — redirect
        const r = data.progress.round;
        if (r >= 4) navigate('/wildcard', { replace: true });
        else navigate(`/round/${r}`, { replace: true });
      }
    })();
    // eslint-disable-next-line
  }, []);

  // Sync score from profile
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
    setFeedback({ correct: result.correct, delta: result.scoreDelta });
    setTimeout(() => setFeedback(null), 1200);

    await next(result);
  }

  async function handleSkip() {
    setShowSkipConfirm(false);
    const result = await skipQuestion();
    if (!result) return;
    setScore(result.newScore);
    await next(result);
  }

  async function next(result) {
    if (result.completed) return handleCompletion(result);
    if (result.roundComplete) {
      await handleRoundComplete(result.newRound);
    } else {
      await fetchCurrent();
      inputRef.current?.focus();
    }
  }

  async function handleRoundComplete(newRound) {
    setRoundOverlay(roundNum);
    await new Promise(r => setTimeout(r, 2000));
    setRoundOverlay(null);

    if (roundNum === 3) {
      navigate('/rumbling');
    } else {
      await fetchCurrent();
    }
  }

  function handleCompletion(result) {
    // Navigate to result page after a beat
    setTimeout(() => {
      if (profile?.status === 'passed' || (result.newScore ?? score) >= 10) {
        navigate('/pass');
      } else {
        navigate('/fail');
      }
    }, 800);
  }

  const suit = ROUND_SUITS[roundNum] || 'spades';

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg-base)' }}>
      {/* Score Bar */}
      <ScoreBar progress={progress} score={score} startTime={profile?.time_started} />

      {/* Main game area */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 gap-6">

        {/* Question Card */}
        {question && (
          <div style={{ position: 'relative' }}>
            <QuestionCard
              question={question}
              cardState={cardState}
            />

            {/* Feedback flash overlay */}
            <AnimatePresence>
              {feedback && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.2 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    position: 'absolute', inset: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    borderRadius: 16,
                    background: feedback.correct
                      ? 'rgba(34,215,123,0.15)'
                      : 'rgba(240,74,87,0.15)',
                    pointerEvents: 'none',
                    zIndex: 10,
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

        {loading && !question && (
          <div className="flex items-center gap-3" style={{ color: 'var(--text-secondary)' }}>
            <div className="spinner" />
            <span className="font-body text-sm">Loading question…</span>
          </div>
        )}

        {error && (
          <p className="font-body text-sm" style={{ color: 'var(--danger)' }}>{error}</p>
        )}

        {/* Hint display */}
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

        {/* Answer Input */}
        {question && (
          <form onSubmit={handleAnswer} className="w-full max-w-sm flex flex-col gap-3">
            <input
              ref={inputRef}
              id="answer-input"
              className="input-dark text-center"
              type="text"
              placeholder="Type your answer…"
              value={answer}
              onChange={e => setAnswer(e.target.value)}
              autoComplete="off"
              autoFocus
            />

            <div className="flex gap-3">
              <button
                id="submit-btn"
                type="submit"
                disabled={loading || !answer.trim()}
                className="btn-primary flex-1"
              >
                {loading ? <span className="flex justify-center"><span className="spinner" style={{ width: 18, height: 18 }} /></span> : 'Submit'}
              </button>

              <button
                id="hint-btn"
                type="button"
                onClick={requestHint}
                className="btn-ghost px-4"
                title="Request a hint"
              >
                💡
              </button>

              <button
                id="skip-btn"
                type="button"
                onClick={() => setShowSkipConfirm(true)}
                className="btn-ghost px-3"
                title="Skip this question (−1 point)"
              >
                Skip
              </button>
            </div>
          </form>
        )}

        {/* Progress Pips */}
        {progress && (
          <ProgressPips
            total={5}
            current={progress.questionInRound - 1}
            suit={suit}
          />
        )}
      </div>

      {/* Skip Confirmation Modal */}
      <AnimatePresence>
        {showSkipConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(0,0,0,0.7)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              zIndex: 100,
            }}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="glass rounded-2xl p-8 max-w-sm mx-4 text-center"
            >
              <p className="font-display font-bold text-lg text-text-primary mb-2">Skip this question?</p>
              <p className="font-body text-sm mb-6" style={{ color: 'var(--danger)' }}>
                −1 point will be deducted from your score.
              </p>
              <div className="flex gap-3">
                <button
                  id="skip-cancel-btn"
                  onClick={() => setShowSkipConfirm(false)}
                  className="btn-ghost flex-1"
                >
                  Cancel
                </button>
                <button
                  id="skip-confirm-btn"
                  onClick={handleSkip}
                  className="flex-1 font-display font-semibold py-2 px-4 rounded-lg"
                  style={{ background: 'var(--danger)', color: 'white', border: 'none', cursor: 'pointer' }}
                >
                  Skip −1pt
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Round Complete Overlay */}
      <AnimatePresence>
        {roundOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(8,8,14,0.95)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              zIndex: 200,
            }}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="text-center"
            >
              <p className="font-body text-sm mb-2" style={{ color: 'var(--text-faint)' }}>
                {roundOverlay === 3 ? 'Prepare yourself…' : 'Great work!'}
              </p>
              <h2 className="font-display font-extrabold text-4xl text-text-primary">
                Round {roundOverlay} Complete
              </h2>
              <p className="font-body mt-4" style={{ color: 'var(--accent)' }}>
                {roundOverlay === 3 ? 'The Rumbling awaits…' : `Starting Round ${roundOverlay + 1}`}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
