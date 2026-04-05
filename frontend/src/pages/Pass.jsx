import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useAuth } from '../hooks/useAuth';
import { useGame } from '../hooks/useGame';

function CountUp({ target, duration = 1500 }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setVal(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration]);
  return <>{val}</>;
}

function formatTime(seconds) {
  if (!seconds) return 'N/A';
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s}s`;
}

export default function Pass() {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const { getResult } = useGame();
  const [result, setResult] = useState(null);
  const fired = useRef(false);

  useEffect(() => {
    getResult().then(setResult);
  }, []);

  useEffect(() => {
    if (result && !fired.current) {
      fired.current = true;
      // Launch confetti
      const end = Date.now() + 3000;
      const frame = () => {
        confetti({ particleCount: 4, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#7B6EF6', '#F5C542', '#1BE0D4', '#22D77B'] });
        confetti({ particleCount: 4, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#7B6EF6', '#F5C542', '#1BE0D4', '#22D77B'] });
        if (Date.now() < end) requestAnimationFrame(frame);
      };
      frame();
    }
  }, [result]);

  const phaseLabels = ['Round 1', 'Round 2', 'Round 3', 'Wildcard'];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden" style={{ background: 'var(--bg-base)' }}>
      {/* Glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 50% 20%, rgba(34,215,123,0.08) 0%, transparent 60%)',
      }} />

      <div className="relative z-10 max-w-lg w-full flex flex-col items-center gap-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="text-center"
        >
          <div className="text-5xl mb-2">🎉</div>
          <h1 className="font-display font-extrabold" style={{ fontSize: 'clamp(40px, 10vw, 72px)', color: 'var(--gold)' }}>
            YOU PASSED
          </h1>
          <p className="font-body mt-2" style={{ color: 'var(--text-secondary)' }}>
            Congratulations, {profile?.name || 'Hunter'}. You made it through.
          </p>
        </motion.div>

        {/* Score counter */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <div className="font-display font-extrabold" style={{ fontSize: 80, color: 'var(--success)', lineHeight: 1 }}>
              <CountUp target={result.score} />
            </div>
            <div className="font-body text-sm mt-1" style={{ color: 'var(--text-faint)' }}>
              final score / 20
            </div>
          </motion.div>
        )}

        {/* Rank badge */}
        {result?.rank && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="px-6 py-3 rounded-full font-display font-bold text-lg"
            style={{
              background: result.rank === 1 ? 'rgba(245,197,66,0.15)' : 'rgba(123,110,246,0.12)',
              border: `1px solid ${result.rank === 1 ? 'var(--gold)' : 'var(--accent)'}`,
              color: result.rank === 1 ? 'var(--gold)' : 'var(--accent)',
            }}
          >
            {result.rank === 1 && '👑 '} #{result.rank} on the Leaderboard
          </motion.div>
        )}

        {/* Stats */}
        {result && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="w-full rounded-2xl overflow-hidden"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
          >
            <div className="grid grid-cols-3 divide-x" style={{ borderColor: 'var(--border)' }}>
              {[
                { label: 'Score', value: `${result.score}/20` },
                { label: 'Time', value: formatTime(result.timeSeconds) },
                { label: 'Hints', value: result.hints_used ?? 0 },
              ].map(({ label, value }) => (
                <div key={label} className="p-4 text-center">
                  <div className="font-display font-bold text-lg text-text-primary">{value}</div>
                  <div className="font-body text-xs mt-1" style={{ color: 'var(--text-faint)' }}>{label}</div>
                </div>
              ))}
            </div>

            {/* Phase scores */}
            <div className="border-t" style={{ borderColor: 'var(--border)' }}>
              <div className="p-4">
                <p className="font-body text-xs mb-3" style={{ color: 'var(--text-faint)' }}>Round breakdown</p>
                <div className="grid grid-cols-4 gap-2">
                  {(result.phaseScores || [0, 0, 0, 0]).map((s, i) => (
                    <div key={i} className="text-center">
                      <div className="font-display font-bold text-sm" style={{
                        color: ['var(--accent)', 'var(--danger)', 'var(--gold)', 'var(--cyan)'][i]
                      }}>{s}/5</div>
                      <div className="font-body text-xs" style={{ color: 'var(--text-faint)' }}>{phaseLabels[i]}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* CTA */}
        <Link to="/leaderboard" className="btn-primary px-8 py-3 text-base" style={{ textDecoration: 'none', display: 'inline-block' }}>
          View Leaderboard →
        </Link>
      </div>
    </div>
  );
}
