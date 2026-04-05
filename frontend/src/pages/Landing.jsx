import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import ParticleField from '../components/ParticleField';
import api from '../lib/api';

export default function Landing() {
  const navigate = useNavigate();
  const [tab, setTab]         = useState('login');      // 'login' | 'register'
  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const [name, setName]       = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (tab === 'register') {
        const { error: signUpErr } = await supabase.auth.signUp({
          email, password,
          options: { data: { name: name.trim() } },
        });
        if (signUpErr) throw signUpErr;
        navigate('/welcome');
      } else {
        const { data, error: signInErr } = await supabase.auth.signInWithPassword({ email, password });
        if (signInErr) throw signInErr;

        // Check if an existing session exists → resume
        try {
          const { data: session } = await api.get('/game/session', {
            headers: { Authorization: `Bearer ${data.session.access_token}` }
          });
          if (session?.hasSession && !session.completed) {
            const round = session.currentRound;
            if (round >= 4) navigate('/wildcard');
            else navigate(`/round/${round}`);
          } else if (session?.completed) {
            // Fetch result to decide pass/fail
            const { data: result } = await api.get('/game/result', {
              headers: { Authorization: `Bearer ${data.session.access_token}` }
            });
            navigate(result?.status === 'passed' ? '/pass' : '/fail');
          } else {
            navigate('/welcome');
          }
        } catch {
          navigate('/welcome');
        }
      }
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: '#08080E' }}>
      {/* Three.js Particle Background */}
      <ParticleField />

      {/* Radial glow behind panel */}
      <div style={{
        position: 'absolute',
        width: 600, height: 600,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(123,110,246,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Glass Login Panel */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="glass relative z-10 w-full mx-4"
        style={{
          maxWidth: 420,
          borderRadius: 20,
          padding: '40px 36px',
          border: '1px solid rgba(123,110,246,0.25)',
        }}
      >
        {/* Brand */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span style={{ fontSize: 20 }}>⚡</span>
            <span className="font-display font-bold text-sm tracking-widest" style={{ color: 'var(--accent)' }}>
              IEEE GTBIT
            </span>
          </div>
          <h1 className="font-display font-extrabold text-2xl text-text-primary leading-tight">
            CRYPTIC HUNT
          </h1>
          <p className="font-display font-semibold text-sm" style={{ color: 'var(--gold)', letterSpacing: '0.2em' }}>
            2026
          </p>
        </div>

        {/* Tabs */}
        <div className="flex items-center border-b mb-6" style={{ borderColor: 'var(--border)' }}>
          {['login', 'register'].map(t => (
            <button
              key={t}
              onClick={() => { setTab(t); setError(''); }}
              className="flex-1 pb-3 text-sm font-display font-semibold capitalize transition-colors"
              style={{
                color: tab === t ? 'var(--accent)' : 'var(--text-faint)',
                borderBottom: `2px solid ${tab === t ? 'var(--accent)' : 'transparent'}`,
                background: 'none', border: 'none', borderBottom: `2px solid ${tab === t ? 'var(--accent)' : 'transparent'}`,
                cursor: 'pointer',
              }}
            >
              {t === 'login' ? 'Login' : 'Register'}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <AnimatePresence mode="wait">
            {tab === 'register' && (
              <motion.div
                key="name"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <label className="block text-xs font-body mb-1" style={{ color: 'var(--text-secondary)' }}>
                  Full Name
                </label>
                <input
                  id="name-input"
                  className="input-dark"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  autoComplete="name"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div>
            <label className="block text-xs font-body mb-1" style={{ color: 'var(--text-secondary)' }}>
              Email
            </label>
            <input
              id="email-input"
              className="input-dark"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div>
            <label className="block text-xs font-body mb-1" style={{ color: 'var(--text-secondary)' }}>
              Password
            </label>
            <input
              id="password-input"
              className="input-dark"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete={tab === 'login' ? 'current-password' : 'new-password'}
              minLength={6}
            />
          </div>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-sm font-body text-center"
                style={{ color: 'var(--red)' }}
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <button
            id="submit-btn"
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-3 text-base tracking-wide"
          >
            {loading
              ? <span className="flex items-center justify-center gap-2"><span className="spinner" style={{ width: 18, height: 18 }} /> Working…</span>
              : tab === 'login' ? 'Enter the Hunt' : 'Create Account'
            }
          </button>
        </form>

        {/* Leaderboard link */}
        <div className="text-center mt-6">
          <Link
            to="/leaderboard"
            className="text-sm font-body transition-colors"
            style={{ color: 'var(--text-secondary)' }}
          >
            View Leaderboard →
          </Link>
        </div>
      </motion.div>

      {/* Footer */}
      <p className="absolute bottom-4 text-xs font-body z-10" style={{ color: 'var(--text-faint)' }}>
        IEEE GTBIT Student Branch · Cryptic Hunt 2026
      </p>
    </div>
  );
}
