import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import api from '../lib/api';

// Animated Lock SVG
function LockIcon({ isUnlocking }) {
  return (
    <svg width="52" height="60" viewBox="0 0 52 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Lock body */}
      <rect x="4" y="26" width="44" height="32" rx="4" fill="#C9A84C" opacity="0.9" />
      <rect x="4" y="26" width="44" height="32" rx="4" stroke="#E8D5A0" strokeWidth="1.5" />
      {/* Keyhole */}
      <circle cx="26" cy="40" r="5" fill="#0A0A0A" />
      <rect x="23.5" y="40" width="5" height="7" rx="1" fill="#0A0A0A" />
      {/* Shackle (animated) */}
      <motion.g
        style={{ originX: '50%', originY: '100%' }}
        animate={isUnlocking ? { rotate: -40, y: -8 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        <path
          d="M12 28 L12 18 Q12 4 26 4 Q40 4 40 18 L40 28"
          stroke="#C9A84C"
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M12 28 L12 18 Q12 4 26 4 Q40 4 40 18 L40 28"
          stroke="#E8D5A0"
          strokeWidth="4.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.5"
        />
      </motion.g>
    </svg>
  );
}

export default function LoginModal({ onClose }) {
  const navigate = useNavigate();
  const [tab, setTab]             = useState('login');
  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  const [name, setName]           = useState('');
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState('');
  const [isUnlocking, setIsUnlocking] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setIsUnlocking(true);

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

        try {
          const { data: session } = await api.get('/game/session', {
            headers: { Authorization: `Bearer ${data.session.access_token}` }
          });
          if (session?.hasSession && !session.completed) {
            const round = session.currentRound;
            if (round >= 4) navigate('/wildcard');
            else navigate(`/round/${round}`);
          } else if (session?.completed) {
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
      setError(err.message || 'The ritual has failed. Try again.');
      setIsUnlocking(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AnimatePresence>
      {/* Full-screen overlay */}
      <motion.div
        key="login-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.92)',
          zIndex: 9000,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(6px)',
        }}
      >
        {/* Modal card — stop propagation so clicks inside don't close */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 24 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          onClick={e => e.stopPropagation()}
          className="modal-card"
          style={{
            position: 'relative',
            background: '#0A0A0A',
            border: '2px solid #C9A84C',
            borderRadius: 4,
            padding: '48px 40px 40px',
            width: '100%',
            maxWidth: 460,
            margin: '0 16px',
            animation: 'goldPulse 3s ease-in-out infinite',
          }}
        >
          {/* Corner bracket decorations */}
          <div className="modal-corners" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            {/* Top-left */}
            <div style={{ position: 'absolute', top: 8, left: 8, width: 20, height: 20,
              borderTop: '2px solid #C9A84C', borderLeft: '2px solid #C9A84C' }} />
            {/* Top-right */}
            <div style={{ position: 'absolute', top: 8, right: 8, width: 20, height: 20,
              borderTop: '2px solid #C9A84C', borderRight: '2px solid #C9A84C' }} />
            {/* Bottom-left */}
            <div style={{ position: 'absolute', bottom: 8, left: 8, width: 20, height: 20,
              borderBottom: '2px solid #C9A84C', borderLeft: '2px solid #C9A84C' }} />
            {/* Bottom-right */}
            <div style={{ position: 'absolute', bottom: 8, right: 8, width: 20, height: 20,
              borderBottom: '2px solid #C9A84C', borderRight: '2px solid #C9A84C' }} />
          </div>

          {/* Lock icon */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
            <LockIcon isUnlocking={isUnlocking} />
          </div>

          {/* Title */}
          <h2 style={{
            fontFamily: '"IM Fell English", Georgia, serif',
            fontSize: 28,
            fontWeight: 700,
            color: '#E8D5A0',
            textAlign: 'center',
            marginBottom: 8,
          }}>
            Identify Thyself
          </h2>

          {/* Subtitle */}
          <p style={{
            fontFamily: '"Cinzel", serif',
            fontSize: 10,
            letterSpacing: '0.2em',
            color: '#8A7A5A',
            textAlign: 'center',
            marginBottom: 32,
            lineHeight: 1.6,
          }}>
            VERIFICATION REQUIRED TO PROCEED INTO THE BURIAL CHAMBER
          </p>

          {/* Tab switch */}
          <div style={{ display: 'flex', borderBottom: '1px solid rgba(201,168,76,0.25)', marginBottom: 28 }}>
            {['login', 'register'].map(t => (
              <button
                key={t}
                onClick={() => { setTab(t); setError(''); setIsUnlocking(false); }}
                style={{
                  flex: 1,
                  background: 'none',
                  border: 'none',
                  borderBottom: tab === t ? '2px solid #C9A84C' : '2px solid transparent',
                  color: tab === t ? '#C9A84C' : '#8A7A5A',
                  fontFamily: '"Cinzel", serif',
                  fontSize: 11,
                  letterSpacing: '0.15em',
                  paddingBottom: 10,
                  marginBottom: -1,
                  cursor: 'none',
                  transition: 'color 0.2s, border-color 0.2s',
                }}
              >
                {t === 'login' ? 'ENTER' : 'REGISTER'}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <AnimatePresence mode="wait">
              {tab === 'register' && (
                <motion.div
                  key="name"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <label style={{
                    display: 'block',
                    fontFamily: '"Cinzel", serif',
                    fontSize: 10,
                    letterSpacing: '0.15em',
                    color: '#8A7A5A',
                    marginBottom: 8,
                  }}>
                    THE SCRIBE'S NAME
                  </label>
                  <input
                    id="modal-name-input"
                    type="text"
                    placeholder="Your full name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    autoComplete="name"
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = '#C9A84C'}
                    onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.3)'}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label style={{
                display: 'block',
                fontFamily: '"Cinzel", serif',
                fontSize: 10,
                letterSpacing: '0.15em',
                color: '#8A7A5A',
                marginBottom: 8,
              }}>
                THE SCRIBE'S IDENTITY
              </label>
              <input
                id="modal-email-input"
                type="email"
                placeholder="scribe@temple.eg"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="email"
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#C9A84C'}
                onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.3)'}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                fontFamily: '"Cinzel", serif',
                fontSize: 10,
                letterSpacing: '0.15em',
                color: '#8A7A5A',
                marginBottom: 8,
              }}>
                THE SECRET SEAL
              </label>
              <input
                id="modal-password-input"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete={tab === 'login' ? 'current-password' : 'new-password'}
                minLength={6}
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#C9A84C'}
                onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.3)'}
              />
            </div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  style={{
                    color: '#C0392B',
                    fontSize: 12,
                    textAlign: 'center',
                    fontFamily: '"IM Fell English", serif',
                    fontStyle: 'italic',
                  }}
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Submit button */}
            <button
              id="modal-submit-btn"
              type="submit"
              disabled={loading}
              style={{
                background: loading ? 'rgba(201,168,76,0.5)' : '#C9A84C',
                color: '#0A0A0A',
                border: 'none',
                padding: '15px 24px',
                fontFamily: '"Cinzel", serif',
                fontWeight: 700,
                fontSize: 12,
                letterSpacing: '0.2em',
                cursor: loading ? 'not-allowed' : 'none',
                transition: 'background 0.2s, box-shadow 0.2s',
                marginTop: 4,
              }}
              onMouseEnter={e => !loading && (e.target.style.boxShadow = '0 0 24px rgba(201,168,76,0.5)')}
              onMouseLeave={e => (e.target.style.boxShadow = 'none')}
            >
              {loading ? 'PERFORMING RITUAL…' : 'COMMENCE RITUAL'}
            </button>
          </form>

          {/* Return link */}
          <div style={{ textAlign: 'center', marginTop: 20 }}>
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                color: '#8A7A5A',
                fontFamily: '"Cinzel", serif',
                fontSize: 10,
                letterSpacing: '0.15em',
                cursor: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.target.style.color = '#C9A84C')}
              onMouseLeave={e => (e.target.style.color = '#8A7A5A')}
            >
              RETURN TO THE SANDS
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

const inputStyle = {
  width: '100%',
  background: '#111111',
  border: '1px solid rgba(201,168,76,0.3)',
  color: '#E8D5A0',
  padding: '12px 16px',
  fontFamily: '"IM Fell English", Georgia, serif',
  fontSize: 14,
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
  borderRadius: 2,
};
