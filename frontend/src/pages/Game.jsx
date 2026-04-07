import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { useGame } from '../hooks/useGame';
import QuestionCard from '../components/QuestionCard';
import ScoreBar from '../components/ScoreBar';
import ProgressPips from '../components/ProgressPips';

const ROUND_SUITS = { 1: 'spades', 2: 'hearts', 3: 'diamonds', 4: 'clubs' };

const SUIT_SYMBOLS = { spades: '♠', hearts: '♥', diamonds: '♦', clubs: '♣' };
const SUIT_GLYPHS  = { spades: '𓅓', hearts: '𓃒', diamonds: '𓆙', clubs: '𓋹' };

/* ── Egyptian nav bar ─────────────────────────────────────────────── */
function EgyptianNav({ score, roundNum, progress }) {
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
      padding: '0 24px',
      height: 56,
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 22, filter: 'drop-shadow(0 0 6px rgba(201,168,76,0.5))' }}>𓂀</span>
        <span style={{
          fontFamily: '"Cinzel Decorative", serif',
          fontSize: 13,
          color: '#C9A84C',
          letterSpacing: '0.1em',
        }}>
          AMENTIS
        </span>
      </div>

      {/* Nav links */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
        {[
          { label: 'HOME', to: '/' },
          { label: 'RULES', title: 'Rules' },
          { label: 'LEADERBOARD', to: '/leaderboard' },
        ].map(({ label, to, title }) => (
          to ? (
            <Link key={label} to={to} style={{
              fontFamily: '"Cinzel", serif',
              fontSize: 9,
              letterSpacing: '0.25em',
              color: 'rgba(201,168,76,0.5)',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#C9A84C'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(201,168,76,0.5)'}
            >
              {label}
            </Link>
          ) : (
            <span key={label} style={{
              fontFamily: '"Cinzel", serif',
              fontSize: 9,
              letterSpacing: '0.25em',
              color: 'rgba(201,168,76,0.35)',
            }}>
              {label}
            </span>
          )
        ))}
      </nav>

      {/* Score badge */}
      <div style={{
        fontFamily: '"Cinzel", serif',
        fontSize: 10,
        letterSpacing: '0.2em',
        color: '#C9A84C',
        border: '1px solid rgba(201,168,76,0.3)',
        padding: '6px 14px',
        borderRadius: 2,
        background: 'rgba(201,168,76,0.05)',
      }}>
        SCORE &nbsp;
        <span style={{ fontFamily: '"Cinzel Decorative", serif', fontSize: 13 }}>
          {score}
        </span>
        {progress && (
          <span style={{ color: 'rgba(201,168,76,0.45)', marginLeft: 6, fontSize: 9 }}>
            / {progress.totalQuestions}
          </span>
        )}
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

/* ── Status indicator ─────────────────────────────────────────────── */
function StatusIndicator({ cardState, feedback }) {
  const states = {
    idle: { label: 'AWAITING INPUT', color: 'rgba(201,168,76,0.4)', dot: 'rgba(201,168,76,0.5)' },
    correct: { label: 'SEAL ACCEPTED', color: '#27AE60', dot: '#27AE60' },
    wrong:   { label: 'SEAL REJECTED', color: '#C0392B', dot: '#C0392B' },
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
        animation: state === states.loading ? 'goldPulse 1s ease-in-out infinite' : 'none',
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

  const [answer, setAnswer]           = useState('');
  const [score, setScore]             = useState(profile?.score ?? 0);
  const [showSkipConfirm, setShowSkipConfirm] = useState(false);
  const [feedback, setFeedback]       = useState(null);
  const [roundOverlay, setRoundOverlay] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    (async () => {
      const data = await fetchCurrent();
      if (data?.completed) handleCompletion({});
      if (data?.question && data.progress.round !== roundNum) {
        const r = data.progress.round;
        if (r >= 4) navigate('/wildcard', { replace: true });
        else navigate(`/round/${r}`, { replace: true });
      }
    })();
    // eslint-disable-next-line
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
    setFeedback({ correct: result.correct, delta: result.scoreDelta });
    setTimeout(() => setFeedback(null), 1500);
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
    await new Promise(r => setTimeout(r, 2400));
    setRoundOverlay(null);
    if (roundNum === 3) {
      navigate('/rumbling');
    } else {
      await fetchCurrent();
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

  const suit  = ROUND_SUITS[roundNum] || 'spades';
  const glyph = SUIT_GLYPHS[suit];
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
      <EgyptianNav score={score} roundNum={roundNum} progress={progress} />

      {/* Main two-column layout */}
      <div style={{
        flex: 1,
        paddingTop: 56, // nav height
        display: 'grid',
        gridTemplateColumns: 'minmax(280px, 380px) 1fr',
        gap: 0,
        minHeight: 'calc(100vh - 56px)',
      }}>

        {/* ── LEFT COLUMN — Card ─────────────────────────────────── */}
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

          {/* Type / Difficulty labels */}
          {question && (
            <div style={{ textAlign: 'center', zIndex: 1 }}>
              <p style={{
                fontFamily: '"Cinzel", serif',
                fontSize: 9,
                letterSpacing: '0.2em',
                color: 'rgba(201,168,76,0.4)',
              }}>
                TYPE: <span style={{ color: 'rgba(201,168,76,0.7)' }}>{question.type?.toUpperCase() || 'UNKNOWN'}</span>
                &nbsp;&nbsp;·&nbsp;&nbsp;
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

        {/* ── RIGHT COLUMN — Problem + Input ────────────────────── */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '40px 48px',
          gap: 32,
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

          {/* Status + action buttons */}
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

      {/* ── Skip Confirmation Modal ───────────────────────────────── */}
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
              {/* Corner brackets */}
              {[
                { top: 8, left: 8, borderTop: '2px solid rgba(201,168,76,0.6)', borderLeft: '2px solid rgba(201,168,76,0.6)' },
                { top: 8, right: 8, borderTop: '2px solid rgba(201,168,76,0.6)', borderRight: '2px solid rgba(201,168,76,0.6)' },
                { bottom: 8, left: 8, borderBottom: '2px solid rgba(201,168,76,0.6)', borderLeft: '2px solid rgba(201,168,76,0.6)' },
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

      {/* ── Round Complete Overlay ────────────────────────────────── */}
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
