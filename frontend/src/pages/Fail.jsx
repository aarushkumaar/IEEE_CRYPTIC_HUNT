import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { useGame } from '../hooks/useGame';

function formatTime(seconds) {
  if (!seconds) return 'N/A';
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s}s`;
}

export default function Fail() {
  const { profile } = useAuth();
  const { getResult } = useGame();
  const [result, setResult] = useState(null);

  useEffect(() => {
    getResult().then(setResult);
  }, []);

  const phaseLabels = ['Round 1', 'Round 2', 'Round 3', 'Wildcard'];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden" style={{ background: 'var(--bg-base)' }}>
      {/* Dark vignette */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 50% 20%, rgba(240,74,87,0.06) 0%, transparent 60%)',
      }} />

      <div className="relative z-10 max-w-lg w-full flex flex-col items-center gap-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="text-5xl mb-3 opacity-60">💀</div>
          <h1 className="font-display font-extrabold" style={{
            fontSize: 'clamp(40px, 10vw, 72px)',
            color: 'var(--danger)',
            opacity: 0.85,
          }}>
            HUNT OVER
          </h1>
          <p className="font-body mt-2" style={{ color: 'var(--text-secondary)' }}>
            Better luck next time, {profile?.name || 'Hunter'}.
          </p>
        </motion.div>

        {/* Score */}
        {result && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <div className="font-display font-extrabold" style={{ fontSize: 80, color: 'var(--danger)', lineHeight: 1, opacity: 0.8 }}>
              {result.score}
            </div>
            <div className="font-body text-sm mt-1" style={{ color: 'var(--text-faint)' }}>
              final score / 20
            </div>
          </motion.div>
        )}

        {result?.rank && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="font-body text-sm"
            style={{ color: 'var(--text-secondary)' }}
          >
            Ranked #{result.rank} on the leaderboard
          </motion.div>
        )}

        {/* Stats */}
        {result && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
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

        <Link to="/leaderboard" className="btn-ghost px-8 py-3 text-base" style={{ textDecoration: 'none', display: 'inline-block' }}>
          View Leaderboard →
        </Link>
      </div>
    </div>
  );
}
