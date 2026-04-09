import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollCanvas from '../components/ScrollCanvas';
import LoginModal from '../components/LoginModal';

/* ── Static URL frame arrays ─────────────────────────────────────
   Frames live in /frontend/assets/ (Vite static serving),
   not in /src/assets/, so import.meta.glob returns empty.
   We generate the URL list directly from the known naming pattern.
── */

/** Generate sequential frame URLs from a static /assets/ folder. */
function makeFrameUrls(folder, startNum, count, ext = 'jpg') {
  return Array.from({ length: count }, (_, i) => {
    const n = startNum + i;
    return `/assets/${folder}/frame${String(n).padStart(8, '0')}.${ext}`;
  });
}

// Tomb opening: frame00086400.jpg → frame00086591.jpg (192 frames)
const tombFrames = makeFrameUrls('tomb_opening_1', 86400, 192, 'jpg');

// Pyramid flythrough: detect dynamically by checking if first frame loads
// (pyramid folder present only on some builds — we keep 0-length as graceful fallback)
const pyramidFrames = [];

const GUIDELINES = [
  'The hunt unfolds across three phases, each more challenging than the last.',
  'Each phase includes one question from every suit — logic, tech, cryptography, and more.',
  "You'll face 12 questions in total, evenly divided across all phases.",
  'Every question must be answered to move forward. You cannot skip.',
  'Every correct answer gives you +1 point. Aim to score as high as possible.',
  'If you do not score at least 5 points within the first 5 hours, you will be eliminated.',
];

/* ── Decorative hieroglyph strip ─────────────────────────────────── */
function HieroStrip() {
  const glyphs = '𓂀 𓅓 𓆙 𓋴 𓇯 𓃒 𓏏 𓈖 𓆣 𓋹 𓐍 𓅱 𓂧 𓊪 𓁹 𓆑 𓏛';
  return (
    <div style={{
      textAlign: 'center',
      color: 'rgba(201,168,76,0.18)',
      fontSize: 22,
      letterSpacing: '0.5em',
      padding: '12px 0',
      userSelect: 'none',
      overflow: 'hidden',
    }}>
      {glyphs}
    </div>
  );
}

/* ── Gold divider ────────────────────────────────────────────────── */
function GoldDivider() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '0 40px' }}>
      <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.4))' }} />
      <span style={{ color: '#C9A84C', fontSize: 18, opacity: 0.7 }}>⚜</span>
      <div style={{ flex: 1, height: 1, background: 'linear-gradient(to left, transparent, rgba(201,168,76,0.4))' }} />
    </div>
  );
}

/* ── Static Egyptian hero fallback (used when no frames exist) ────── */
function StaticEgyptianHero({ onCTA }) {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      background: 'radial-gradient(ellipse at 50% 80%, #1A0E00 0%, #0A0600 40%, #000 100%)',
    }}>
      {/* Atmospheric glow rings */}
      <div style={{
        position: 'absolute',
        width: 600, height: 600,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        width: 900, height: 400,
        borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(201,168,76,0.04) 0%, transparent 70%)',
        bottom: 0, left: '50%',
        transform: 'translateX(-50%)',
        pointerEvents: 'none',
      }} />

      {/* IEEE badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        style={{
          fontFamily: '"Cinzel", serif',
          fontSize: 11,
          letterSpacing: '0.35em',
          color: 'rgba(201,168,76,0.6)',
          marginBottom: 40,
          borderBottom: '1px solid rgba(201,168,76,0.2)',
          paddingBottom: 12,
        }}
      >
        IEEE GTBIT STUDENT BRANCH
      </motion.div>

      {/* Eye of Horus SVG */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        style={{ marginBottom: 32, fontSize: 64, filter: 'drop-shadow(0 0 20px rgba(201,168,76,0.4))' }}
      >
        𓂀
      </motion.div>

      {/* CHARTERING THE UNKNOWN */}
      <motion.p
        initial={{ opacity: 0, letterSpacing: '0.8em' }}
        animate={{ opacity: 1, letterSpacing: '0.4em' }}
        transition={{ delay: 0.6, duration: 1.2 }}
        style={{
          fontFamily: '"Cinzel", serif',
          fontSize: 'clamp(9px, 1.5vw, 13px)',
          letterSpacing: '0.4em',
          color: 'rgba(201,168,76,0.55)',
          marginBottom: 16,
        }}
      >
        CHARTERING THE UNKNOWN
      </motion.p>

      {/* AMENTIS */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1 }}
        style={{
          fontFamily: '"Cinzel Decorative", serif',
          fontSize: 'clamp(52px, 10vw, 110px)',
          fontWeight: 900,
          color: '#C9A84C',
          letterSpacing: '0.12em',
          lineHeight: 1,
          textShadow: '0 0 60px rgba(201,168,76,0.35), 0 0 120px rgba(201,168,76,0.15)',
          marginBottom: 8,
        }}
      >
        AMENTIS
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        style={{
          fontFamily: '"IM Fell English", serif',
          fontStyle: 'italic',
          fontSize: 'clamp(14px, 2vw, 18px)',
          color: 'rgba(232,213,160,0.55)',
          marginBottom: 56,
          letterSpacing: '0.05em',
        }}
      >
        Cryptic Hunt 2026
      </motion.p>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.7, 0] }}
        transition={{ delay: 1.8, duration: 2, repeat: Infinity }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          color: 'rgba(201,168,76,0.5)',
          fontFamily: '"Cinzel", serif',
          fontSize: 9,
          letterSpacing: '0.3em',
        }}
      >
        <span>SCROLL</span>
        <span style={{ fontSize: 18 }}>↓</span>
      </motion.div>
    </div>
  );
}

/* ── Scroll-driven hero (used when frames exist) ─────────────────── */
function ScrollHero() {
  const hasTomb = tombFrames.length > 0;
  const hasPyramid = pyramidFrames.length > 0;

  return (
    <>
      {/* SECTION 1 — Tomb opening (no overlaid text) */}
      {hasTomb ? (
        <ScrollCanvas frames={tombFrames} />
      ) : (
        <StaticEgyptianHero />
      )}

      {/* SECTION 2 — Post-video reveal */}
      {hasTomb && <HeroRevealSection />}

      {/* SECTION 3 — Pyramid flythrough */}
      {hasPyramid && (
        <ScrollCanvas frames={pyramidFrames}>
          <div style={{ textAlign: 'center' }}>
            <p style={{
              fontFamily: '"Cinzel Decorative", serif',
              fontSize: 'clamp(22px, 5vw, 48px)',
              fontWeight: 700,
              color: 'rgba(232,213,160,0.85)',
              letterSpacing: '0.15em',
              textShadow: '0 0 40px rgba(201,168,76,0.5)',
            }}>
              CHARTERING THE UNKNOWN
            </p>
          </div>
        </ScrollCanvas>
      )}
    </>
  );
}

/* ── Post-video Hero Reveal Section ─────────────────────────────── */
function HeroRevealSection() {
  return (
    <section style={{
      minHeight: '100vh',
      background: '#000',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Ambient radial shimmer */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 50% 60%, rgba(201,168,76,0.06) 0%, transparent 70%)',
        animation: 'ambientPulse 4s ease-in-out infinite',
        pointerEvents: 'none',
      }} />

      {/* AMENTIS main title */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        viewport={{ once: true }}
        style={{
          fontFamily: '"Cinzel Decorative", serif',
          fontSize: 'clamp(52px, 11vw, 120px)',
          fontWeight: 900,
          color: '#C9A84C',
          letterSpacing: '0.12em',
          lineHeight: 1,
          textShadow: '0 0 60px rgba(201,168,76,0.4), 0 0 120px rgba(201,168,76,0.18)',
          animation: 'titleGlow 3s ease-in-out infinite',
          position: 'relative',
          zIndex: 1,
        }}
      >
        AMENTIS
      </motion.h1>

      {/* Gold animated divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ delay: 0.4, duration: 1, ease: 'easeOut' }}
        viewport={{ once: true }}
        style={{
          width: '40%',
          maxWidth: 340,
          height: 1,
          background: 'linear-gradient(to right, transparent, #C9A84C, transparent)',
          transformOrigin: 'center',
          margin: '20px 0 24px',
          position: 'relative',
          zIndex: 1,
        }}
      />

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
        viewport={{ once: true }}
        style={{
          fontFamily: '"Cinzel", serif',
          fontSize: 'clamp(10px, 1.6vw, 14px)',
          letterSpacing: '0.4em',
          color: 'rgba(201,168,76,0.6)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        CHARTERING THE UNKNOWN
      </motion.p>

      <style>{`
        @keyframes ambientPulse {
          0%, 100% { opacity: 0.7; }
          50%       { opacity: 1; }
        }
        @keyframes titleGlow {
          0%, 100% { text-shadow: 0 0 60px rgba(201,168,76,0.35), 0 0 120px rgba(201,168,76,0.12); }
          50%       { text-shadow: 0 0 80px rgba(201,168,76,0.6),  0 0 160px rgba(201,168,76,0.25); }
        }
      `}</style>
    </section>
  );
}

function SponsorCard({ delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      viewport={{ once: true }}
      style={{
        width: 140,
        height: 70,
        background: 'rgba(201,168,76,0.05)',
        border: '1px solid rgba(201,168,76,0.2)',
        borderRadius: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'rgba(201,168,76,0.25)',
        fontFamily: '"Cinzel", serif',
        fontSize: 9,
        letterSpacing: '0.2em',
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color 0.3s, background 0.3s',
      }}
      whileHover={{
        borderColor: 'rgba(201,168,76,0.5)',
        background: 'rgba(201,168,76,0.08)',
      }}
    >
      {/* Corner brackets */}
      <div style={{ position: 'absolute', top: 4, left: 4, width: 10, height: 10, borderTop: '1px solid rgba(201,168,76,0.4)', borderLeft: '1px solid rgba(201,168,76,0.4)' }} />
      <div style={{ position: 'absolute', top: 4, right: 4, width: 10, height: 10, borderTop: '1px solid rgba(201,168,76,0.4)', borderRight: '1px solid rgba(201,168,76,0.4)' }} />
      <div style={{ position: 'absolute', bottom: 4, left: 4, width: 10, height: 10, borderBottom: '1px solid rgba(201,168,76,0.4)', borderLeft: '1px solid rgba(201,168,76,0.4)' }} />
      <div style={{ position: 'absolute', bottom: 4, right: 4, width: 10, height: 10, borderBottom: '1px solid rgba(201,168,76,0.4)', borderRight: '1px solid rgba(201,168,76,0.4)' }} />
      SPONSOR
    </motion.div>
  );
}

/* ── Main Landing component ──────────────────────────────────────── */
export default function Landing() {
  const [showLogin, setShowLogin] = useState(false);
  const hasFrames = tombFrames.length > 0 || pyramidFrames.length > 0;

  return (
    <div style={{ background: '#000', color: '#C9A84C', minHeight: '100vh' }}>

      {/* ── HERO: scroll-driven canvas OR static fallback ── */}
      {hasFrames ? <ScrollHero /> : <StaticEgyptianHero />}

      {/* ── Hiero divider ─────────────────────────────────────── */}
      <HieroStrip />
      <GoldDivider />
      <HieroStrip />

      {/* ── SPONSORS ──────────────────────────────────────────── */}
      <section style={{
        background: '#000',
        padding: '80px 40px',
        borderTop: '1px solid rgba(201,168,76,0.08)',
      }}>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{
            textAlign: 'center',
            fontFamily: '"Cinzel", serif',
            letterSpacing: '0.3em',
            color: 'rgba(201,168,76,0.55)',
            fontSize: 11,
            marginBottom: 12,
          }}
        >
          𓃒 &nbsp;&nbsp; SPONSORED BY &nbsp;&nbsp; 𓃒
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          viewport={{ once: true }}
          style={{
            textAlign: 'center',
            fontFamily: '"IM Fell English", serif',
            fontStyle: 'italic',
            color: 'rgba(201,168,76,0.3)',
            fontSize: 12,
            marginBottom: 40,
          }}
        >
          Those who illuminate the path
        </motion.p>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 24,
          flexWrap: 'wrap',
          maxWidth: 800,
          margin: '0 auto',
        }}>
          {[0, 0.1, 0.2, 0.3].map((delay, i) => (
            <SponsorCard key={i} delay={delay} />
          ))}
        </div>
      </section>

      <GoldDivider />

      {/* ── GUIDELINES ────────────────────────────────────────── */}
      <section style={{
        background: '#000',
        padding: '80px 24px',
        maxWidth: 680,
        margin: '0 auto',
      }}>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{
            textAlign: 'center',
            fontFamily: '"Cinzel Decorative", serif',
            fontSize: 'clamp(18px, 3.5vw, 26px)',
            color: '#C9A84C',
            letterSpacing: '0.25em',
            marginBottom: 8,
            textShadow: '0 0 30px rgba(201,168,76,0.3)',
          }}
        >
          ⚜ GUIDELINES ⚜
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          viewport={{ once: true }}
          style={{
            textAlign: 'center',
            fontFamily: '"IM Fell English", serif',
            fontStyle: 'italic',
            color: 'rgba(201,168,76,0.35)',
            fontSize: 13,
            marginBottom: 48,
          }}
        >
          The sacred laws of the chamber
        </motion.p>

        {/* Ornate border box */}
        <div style={{
          position: 'relative',
          border: '1px solid rgba(201,168,76,0.2)',
          padding: '40px 32px',
          background: 'rgba(201,168,76,0.02)',
        }}>
          {/* Corner brackets */}
          {[
            { top: 8, left: 8, borderTop: '2px solid rgba(201,168,76,0.6)', borderLeft: '2px solid rgba(201,168,76,0.6)' },
            { top: 8, right: 8, borderTop: '2px solid rgba(201,168,76,0.6)', borderRight: '2px solid rgba(201,168,76,0.6)' },
            { bottom: 8, left: 8, borderBottom: '2px solid rgba(201,168,76,0.6)', borderLeft: '2px solid rgba(201,168,76,0.6)' },
            { bottom: 8, right: 8, borderBottom: '2px solid rgba(201,168,76,0.6)', borderRight: '2px solid rgba(201,168,76,0.6)' },
          ].map((s, i) => (
            <div key={i} style={{ position: 'absolute', width: 18, height: 18, ...s }} />
          ))}

          {GUIDELINES.map((rule, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
              viewport={{ once: true }}
              style={{
                display: 'flex',
                gap: 16,
                alignItems: 'flex-start',
                marginBottom: i < GUIDELINES.length - 1 ? 24 : 0,
              }}
            >
              <span style={{
                fontFamily: '"Cinzel", serif',
                fontSize: 11,
                color: '#C9A84C',
                minWidth: 24,
                paddingTop: 2,
                opacity: 0.8,
              }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <p style={{
                fontFamily: '"IM Fell English", serif',
                fontSize: 'clamp(13px, 1.8vw, 15px)',
                color: '#E8D5A0',
                lineHeight: 1.75,
                margin: 0,
              }}>
                {rule}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <GoldDivider />

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section style={{
        padding: '80px 40px 100px',
        textAlign: 'center',
        background: '#000',
      }}>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{
            fontFamily: '"IM Fell English", serif',
            fontStyle: 'italic',
            color: 'rgba(201,168,76,0.4)',
            fontSize: 14,
            marginBottom: 32,
          }}
        >
          The chamber awaits your identity
        </motion.p>

        <motion.button
          id="start-the-search-btn"
          onClick={() => setShowLogin(true)}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          whileHover={{
            boxShadow: '0 0 40px rgba(201,168,76,0.4), 0 0 80px rgba(201,168,76,0.15)',
            y: -2,
          }}
          whileTap={{ scale: 0.98 }}
          viewport={{ once: true }}
          style={{
            background: 'transparent',
            border: '2px solid #C9A84C',
            color: '#C9A84C',
            padding: '18px 64px',
            letterSpacing: '0.35em',
            fontSize: 13,
            cursor: 'none',
            fontFamily: '"Cinzel", serif',
            fontWeight: 600,
            position: 'relative',
            transition: 'background 0.3s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(201,168,76,0.06)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent';
          }}
        >
          START THE SEARCH
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          viewport={{ once: true }}
          style={{
            marginTop: 24,
            fontFamily: '"Cinzel", serif',
            fontSize: 9,
            letterSpacing: '0.25em',
            color: 'rgba(201,168,76,0.2)',
          }}
        >
          𓂀 &nbsp; AMENTIS · CRYPTIC HUNT 2026 · IEEE GTBIT &nbsp; 𓂀
        </motion.p>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────── */}
      <footer style={{
        background: 'rgba(0,0,0,0.95)',
        borderTop: '1px solid rgba(201,168,76,0.12)',
        padding: '32px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 16,
      }}>
        <div>
          <p style={{ fontFamily: '"Cinzel Decorative", serif', fontSize: 12, color: '#C9A84C', marginBottom: 4 }}>
            AMENTIS
          </p>
          <p style={{ fontFamily: '"Cinzel", serif', fontSize: 9, color: 'rgba(201,168,76,0.35)', letterSpacing: '0.2em' }}>
            BROUGHT TO YOU BY IEEE GTBIT
          </p>
        </div>
        <div style={{ display: 'flex', gap: 32 }}>
          {['Quick Links', 'Community'].map(col => (
            <div key={col}>
              <p style={{ fontFamily: '"Cinzel", serif', fontSize: 9, color: 'rgba(201,168,76,0.5)', letterSpacing: '0.2em', marginBottom: 8 }}>
                {col.toUpperCase()}
              </p>
              {(col === 'Quick Links' ? ['About Us', 'Sponsors', 'Leaderboard'] : ['LinkedIn', 'Instagram', 'Discord']).map(link => (
                <p key={link} style={{ fontFamily: '"IM Fell English", serif', fontSize: 12, color: 'rgba(201,168,76,0.3)', marginBottom: 4, cursor: 'none' }}>
                  {link}
                </p>
              ))}
            </div>
          ))}
        </div>
      </footer>

      {/* ── Login Modal ────────────────────────────────────────── */}
      <AnimatePresence>
        {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      </AnimatePresence>
    </div>
  );
}
