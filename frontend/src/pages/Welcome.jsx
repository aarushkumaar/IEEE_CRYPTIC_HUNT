import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { useGame } from '../hooks/useGame';
import CardDeal from '../components/CardDeal';

export default function Welcome() {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const { startGame, loading, error } = useGame();
  const [rulesOpen, setRulesOpen] = useState(false);
  const [starting, setStarting] = useState(false);

  async function handleBegin() {
    setStarting(true);
    const ok = await startGame();
    if (ok) {
      navigate('/round/1');
    } else {
      // If game already started, resume
      navigate('/round/1');
    }
    setStarting(false);
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: '#08080E' }}
    >
      {/* Ambient glows */}
      <div style={{
        position: 'absolute', top: '10%', left: '20%',
        width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(123,110,246,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', right: '20%',
        width: 300, height: 300, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(27,224,212,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="w-full max-w-2xl px-6 flex flex-col items-center gap-8 z-10">
        {/* 3D Card Deal Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full"
        >
          <CardDeal />
        </motion.div>

        {/* Welcome Text */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <h1 className="font-display font-bold text-3xl md:text-4xl text-text-primary">
            Welcome, {profile?.name || 'Hunter'}
          </h1>
          <p className="font-body text-text-secondary mt-3 max-w-md mx-auto leading-relaxed">
            Your 12-hour hunt begins the moment you click. Four rounds. Twenty questions. One winner.
          </p>
        </motion.div>

        {/* Stats Strip */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 md:gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {[
            { label: 'Rounds', value: '4' },
            { label: 'Questions', value: '20' },
            { label: 'Correct', value: '+1 pt' },
            { label: 'Skip', value: '−1 pt' },
          ].map(({ label, value }) => (
            <div key={label} className="text-center">
              <div className="font-display font-bold text-xl" style={{ color: 'var(--accent)' }}>{value}</div>
              <div className="font-body text-xs" style={{ color: 'var(--text-faint)' }}>{label}</div>
            </div>
          ))}
        </motion.div>

        {/* Rules toggle */}
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <button
            onClick={() => setRulesOpen(v => !v)}
            className="w-full flex items-center justify-between px-4 py-3 rounded-lg font-body text-sm"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
            }}
          >
            <span>Show Rules</span>
            <span style={{ transform: rulesOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▾</span>
          </button>

          {rulesOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="rounded-b-lg px-4 py-4 font-body text-sm"
              style={{
                background: 'var(--bg-card)',
                borderLeft: '1px solid var(--border)',
                borderRight: '1px solid var(--border)',
                borderBottom: '1px solid var(--border)',
                color: 'var(--text-secondary)',
              }}
            >
              <ul className="space-y-2">
                <li>• Questions are shown one at a time. The next unlocks after answering or skipping.</li>
                <li>• Correct answer: <span style={{ color: 'var(--success)' }}>+1 point</span></li>
                <li>• Skip / wrong answer: <span style={{ color: 'var(--danger)' }}>−1 point</span> (skip deducts, wrong doesn't)</li>
                <li>• Score floor: 0 (cannot go negative)</li>
                <li>• Final ranking = score (higher is better), then time taken (lower is better)</li>
                <li>• Need ≥ 10/20 correct to pass</li>
                <li>• Hints are available — but use them wisely</li>
              </ul>
            </motion.div>
          )}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.0 }}
        >
          <button
            id="begin-hunt-btn"
            onClick={handleBegin}
            disabled={starting || loading}
            className="font-display font-bold text-lg px-12 py-4 rounded-xl relative"
            style={{
              background: 'var(--accent)',
              color: 'white',
              border: 'none',
              cursor: starting ? 'not-allowed' : 'pointer',
              opacity: starting ? 0.7 : 1,
              boxShadow: '0 0 40px rgba(123,110,246,0.4), 0 8px 32px rgba(0,0,0,0.5)',
              letterSpacing: '0.05em',
              transition: 'box-shadow 0.2s, transform 0.1s',
            }}
            onMouseEnter={e => {
              if (!starting) e.currentTarget.style.boxShadow = '0 0 60px rgba(123,110,246,0.6), 0 8px 32px rgba(0,0,0,0.5)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = '0 0 40px rgba(123,110,246,0.4), 0 8px 32px rgba(0,0,0,0.5)';
            }}
          >
            {starting
              ? <span className="flex items-center gap-2">
                  <span className="spinner" style={{ width: 20, height: 20 }} />
                  Starting…
                </span>
              : 'BEGIN THE HUNT ▶'
            }
          </button>
          {error && (
            <p className="text-sm text-center mt-2" style={{ color: 'var(--danger)' }}>{error}</p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
