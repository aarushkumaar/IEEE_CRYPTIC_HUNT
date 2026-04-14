import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import ScrollCanvas from '../components/ScrollCanvas';
import LoginModal from '../components/LoginModal';

/* ── Sand / dust particle canvas ─────────────────────────────────── */
function SandParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Fixed canvas = always viewport-sized
    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    const COUNT = 250;
    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,           // start spread across full screen
      r: Math.random() * 2 + 0.4,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -(Math.random() * 0.35 + 0.08),
      alpha: Math.random() * 0.5 + 0.08,
      life: Math.random(),             // stagger initial life so they don't all reset at once
      decay: Math.random() * 0.001 + 0.0003,
    }));

    function reset(p) {
      p.x = Math.random() * W;
      p.y = H + 10;
      p.r = Math.random() * 2 + 0.4;
      p.vx = (Math.random() - 0.5) * 0.3;
      p.vy = -(Math.random() * 0.35 + 0.08);
      p.alpha = Math.random() * 0.5 + 0.08;
      p.life = 1;
    }

    let raf;
    function draw() {
      ctx.clearRect(0, 0, W, H);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;

        // Wrap particles that go off screen horizontally
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;

        // Reset particles that fade out or go off top
        if (p.life <= 0 || p.y < -10) reset(p);

        const a = p.alpha * Math.max(0, p.life);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,168,76,${a.toFixed(3)})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    }
    draw();

    function onResize() {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    }
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
/* ── Static URL frame arrays ─────────────────────────────────────
   Frames are loaded from local assets.
── */

const getFrameUrl = (frameIndex) => {
  const frameNumber = 87054 + frameIndex
  const padded = String(frameNumber).padStart(8, '0')
  return `/assets/tomb_opening/tomb${padded}.jpg`
}

// Tomb opening: 170 frames
const tombFrames = Array.from({ length: 170 }, (_, i) => getFrameUrl(i));

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

/* ── Sponsor Carousel ──────────────────────────────────────────── */
const SPONSOR_SLIDES = [
  [
    { label: 'SPONSOR I' },
    { label: 'SPONSOR II' },
    { label: 'SPONSOR III' },
  ],
  [
    { label: 'SPONSOR IV' },
    { label: 'SPONSOR V' },
    { label: 'SPONSOR VI' },
  ],
];

function PatronCard({ label, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.12, duration: 0.55, ease: 'easeOut' }}
      viewport={{ once: true }}
      whileHover={{ borderColor: 'rgba(201,168,76,0.8)', scale: 1.025 }}
      style={{
        flex: '1 1 0',
        minWidth: 0,
        aspectRatio: '4/3',
        background: 'rgba(5,3,0,0.75)',
        border: '1px solid rgba(201,168,76,0.22)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color 0.35s',
        cursor: 'default',
      }}
    >
      {/* shimmer sweep */}
      <motion.div
        animate={{ x: ['-110%', '110%'] }}
        transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 2.5, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(105deg, transparent 35%, rgba(201,168,76,0.09) 50%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />
      {/* corner brackets */}
      {[{ top: 6, left: 6, bt: 'borderTop', bl: 'borderLeft' }, { top: 6, right: 6, bt: 'borderTop', bl: 'borderRight' },
      { bottom: 6, left: 6, bt: 'borderBottom', bl: 'borderLeft' }, { bottom: 6, right: 6, bt: 'borderBottom', bl: 'borderRight' }]
        .map((c, i) => (
          <motion.div
            key={i}
            whileHover={{ borderColor: 'rgba(201,168,76,0.9)' }}
            style={{
              position: 'absolute', width: 14, height: 14,
              top: c.top, left: c.left, right: c.right, bottom: c.bottom,
              [c.bt]: '1px solid rgba(201,168,76,0.45)',
              [c.bl]: '1px solid rgba(201,168,76,0.45)',
              transition: 'border-color 0.3s',
            }}
          />
        ))
      }
      <span style={{
        fontFamily: '"Cinzel",serif', fontSize: 10, letterSpacing: '0.25em',
        color: 'rgba(201,168,76,0.22)', userSelect: 'none',
      }}>{label}</span>
    </motion.div>
  );
}

function PatronsCarousel() {
  const [slide, setSlide] = useState(0);
  const total = SPONSOR_SLIDES.length;

  useEffect(() => {
    const id = setInterval(() => setSlide(s => (s + 1) % total), 4000);
    return () => clearInterval(id);
  }, [total]);

  const prev = () => setSlide(s => (s - 1 + total) % total);
  const next = () => setSlide(s => (s + 1) % total);

  return (
    <section style={{
      background: '#000',
      padding: '80px 48px',
      borderTop: '1px solid rgba(201,168,76,0.08)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* ambient warm fog */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(201,168,76,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* heading */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        style={{ marginBottom: 48, position: 'relative', zIndex: 1 }}
      >
        <h2 style={{
          fontFamily: '"Cinzel Decorative",serif',
          fontSize: 'clamp(22px,4vw,36px)',
          fontWeight: 900,
          color: '#C9A84C',
          letterSpacing: '0.18em',
          margin: 0,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 14,
          textShadow: '0 0 40px rgba(201,168,76,0.25)',
        }}>
          THE PATRONS
          <motion.span
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ fontSize: '0.7em', opacity: 0.75, display: 'inline-block' }}
          >⚜</motion.span>
        </h2>
        {/* animated gold underline */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.7, ease: 'easeOut' }}
          viewport={{ once: true }}
          style={{
            marginTop: 10, height: 2, width: 80,
            background: 'linear-gradient(to right, #C9A84C, transparent)',
            transformOrigin: 'left',
          }}
        />
      </motion.div>

      {/* slide area + arrows */}
      <div style={{ position: 'relative', overflow: 'hidden', zIndex: 1 }}>
        {/* prev arrow */}
        <button onClick={prev} aria-label="Previous" style={{
          position: 'absolute', left: -16, top: '50%', transform: 'translateY(-50%)',
          zIndex: 2, background: 'transparent', border: '1px solid rgba(201,168,76,0.35)',
          color: '#C9A84C', width: 36, height: 36, borderRadius: '50%', cursor: 'pointer',
          fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background 0.2s, border-color 0.2s',
        }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.12)'; e.currentTarget.style.borderColor = '#C9A84C'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.35)'; }}
        >‹</button>

        <AnimatePresence mode="wait">
          <motion.div
            key={slide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            style={{ display: 'flex', gap: 24 }}
          >
            {SPONSOR_SLIDES[slide].map((s, i) => (
              <PatronCard key={i} label={s.label} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* next arrow */}
        <button onClick={next} aria-label="Next" style={{
          position: 'absolute', right: -16, top: '50%', transform: 'translateY(-50%)',
          zIndex: 2, background: 'transparent', border: '1px solid rgba(201,168,76,0.35)',
          color: '#C9A84C', width: 36, height: 36, borderRadius: '50%', cursor: 'pointer',
          fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background 0.2s, border-color 0.2s',
        }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.12)'; e.currentTarget.style.borderColor = '#C9A84C'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.35)'; }}
        >›</button>
      </div>

      {/* dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 32, position: 'relative', zIndex: 1 }}>
        {SPONSOR_SLIDES.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => setSlide(i)}
            animate={{ width: i === slide ? 28 : 8, background: i === slide ? '#C9A84C' : 'rgba(201,168,76,0.25)' }}
            transition={{ duration: 0.3 }}
            style={{
              height: 8, borderRadius: 4, border: 'none',
              cursor: 'pointer', padding: 0,
            }}
          />
        ))}
      </div>
    </section>
  );
}

/* ── Phases Section ────────────────────────────────────────────── */
const PHASES = [
  {
    number: 1,
    title: 'THE DESCENT',
    description: 'Enter the labyrinth of riddles. Your journey begins as you descend into the first layer of the cryptic hunt, facing logic and language puzzles that test the sharpness of your mind.',
    side: 'left',
  },
  {
    number: 2,
    title: 'DECODING',
    description: 'The hieroglyphs speak — but only to those who listen. Decipher encrypted messages, hidden patterns and ciphered truths buried within the ancient scrolls of data.',
    side: 'right',
  },
  {
    number: 3,
    title: 'THE ASCENT',
    description: 'Only the worthy rise. The final phase converges all disciplines — technology, cryptography, and lateral thinking — into a culminating trial for the top minds.',
    side: 'left',
  },
];

function DiamondIcon({ number }) {
  return (
    <div style={{
      width: 56, height: 56,
      position: 'relative',
      flexShrink: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {/* outer glow pulse ring */}
      <motion.div
        animate={{ scale: [1, 1.55, 1], opacity: [0.45, 0, 0.45] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          width: 42, height: 42,
          border: '1.5px solid rgba(201,168,76,0.55)',
          transform: 'rotate(45deg)',
          borderRadius: 2,
        }}
      />
      {/* inner diamond */}
      <motion.div
        animate={{
          boxShadow: [
            '0 0 10px rgba(201,168,76,0.3)',
            '0 0 22px rgba(201,168,76,0.7)',
            '0 0 10px rgba(201,168,76,0.3)',
          ]
        }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          width: 36, height: 36,
          border: '2px solid #C9A84C',
          transform: 'rotate(45deg)',
          background: '#09060000',
          position: 'absolute',
        }}
      />
      <span style={{
        position: 'relative', zIndex: 1,
        fontFamily: '"Cinzel",serif', fontSize: 13,
        color: '#C9A84C', fontWeight: 700,
      }}>{number}</span>
    </div>
  );
}

/* animated spine that draws itself in */
function AnimatedSpine() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <motion.div
      ref={ref}
      initial={{ scaleY: 0 }}
      animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
      transition={{ duration: 1.4, ease: 'easeInOut' }}
      style={{
        position: 'absolute',
        left: '50%', top: 0, bottom: 0,
        width: 2,
        background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,0.5) 12%, rgba(201,168,76,0.5) 88%, transparent)',
        transform: 'translateX(-50%)',
        transformOrigin: 'top',
        boxShadow: '0 0 8px rgba(201,168,76,0.2)',
      }}
    />
  );
}

function PhasesSection() {
  return (
    <section style={{
      background: '#000',
      padding: '80px 24px',
      borderTop: '1px solid rgba(201,168,76,0.08)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* ambient warm fog */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(201,168,76,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 50% 40% at 50% 100%, rgba(201,168,76,0.03) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* heading */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        style={{ marginBottom: 64, paddingLeft: 48, position: 'relative', zIndex: 1 }}
      >
        <h2 style={{
          fontFamily: '"Cinzel Decorative",serif',
          fontSize: 'clamp(22px,4vw,36px)',
          fontWeight: 900,
          color: '#C9A84C',
          letterSpacing: '0.18em',
          margin: 0,
          textShadow: '0 0 40px rgba(201,168,76,0.25)',
        }}>
          PHASES
        </h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.7, ease: 'easeOut' }}
          viewport={{ once: true }}
          style={{
            marginTop: 10, height: 2, width: 80,
            background: 'linear-gradient(to right, #C9A84C, transparent)',
            transformOrigin: 'left',
          }}
        />
      </motion.div>

      {/* timeline */}
      <div style={{ maxWidth: 760, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <AnimatedSpine />

        {PHASES.map((phase, i) => {
          const isLeft = phase.side === 'left';
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2, duration: 0.7, ease: 'easeOut' }}
              viewport={{ once: true }}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 64px 1fr',
                alignItems: 'center',
                marginBottom: i < PHASES.length - 1 ? 80 : 0,
                position: 'relative',
              }}
            >
              {/* left cell */}
              <div style={{ order: isLeft ? 0 : 2 }}>
                {isLeft && <PhaseCard phase={phase} align="right" />}
              </div>

              {/* center diamond */}
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', order: 1 }}>
                <DiamondIcon number={phase.number} />
              </div>

              {/* right cell */}
              <div style={{ order: isLeft ? 2 : 0 }}>
                {!isLeft && <PhaseCard phase={phase} align="left" />}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function PhaseCard({ phase, align }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{
        boxShadow: hovered
          ? align === 'right'
            ? '-4px 0 24px rgba(201,168,76,0.18)'
            : '4px 0 24px rgba(201,168,76,0.18)'
          : 'none',
      }}
      style={{
        textAlign: align,
        padding: align === 'right' ? '20px 28px 20px 0' : '20px 0 20px 28px',
        borderRight: align === 'right' ? '1px solid transparent' : 'none',
        borderLeft: align === 'left' ? '1px solid transparent' : 'none',
        transition: 'border-color 0.3s',
        position: 'relative',
      }}
    >
      {/* accent bar */}
      <motion.div
        animate={{ scaleY: hovered ? 1 : 0.4, opacity: hovered ? 1 : 0.35 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute',
          [align === 'right' ? 'right' : 'left']: 0,
          top: '20%', bottom: '20%',
          width: 2,
          background: 'linear-gradient(to bottom, transparent, #C9A84C, transparent)',
          transformOrigin: 'center',
        }}
      />
      <p style={{
        fontFamily: '"Cinzel",serif',
        fontSize: 'clamp(10px,1.4vw,12px)',
        letterSpacing: '0.22em',
        color: hovered ? '#E8D5A0' : '#C9A84C',
        margin: '0 0 8px',
        fontWeight: 700,
        transition: 'color 0.3s',
      }}>
        PHASE {phase.number}: {phase.title}
      </p>
      <p style={{
        fontFamily: '"IM Fell English",serif',
        fontStyle: 'italic',
        fontSize: 'clamp(12px,1.5vw,14px)',
        color: hovered ? 'rgba(232,213,160,0.8)' : 'rgba(232,213,160,0.5)',
        margin: 0,
        lineHeight: 1.75,
        transition: 'color 0.3s',
      }}>
        {phase.description}
      </p>
    </motion.div>
  );
}

/* ── Main Landing component ──────────────────────────────────────── */
export default function Landing() {
  const [showLogin, setShowLogin] = useState(false);
  const hasFrames = tombFrames.length > 0 || pyramidFrames.length > 0;

  return (
    <div style={{ background: '#000', color: '#C9A84C', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
      <SandParticles />

      {/* ── HERO: scroll-driven canvas OR static fallback ── */}
      {hasFrames ? <ScrollHero /> : <StaticEgyptianHero />}

      {/* ── Hiero divider ─────────────────────────────────────── */}
      <HieroStrip />
      <GoldDivider />
      <HieroStrip />

      {/* ── THE PATRONS carousel ───────────────────────────────── */}
      <PatronsCarousel />

      <GoldDivider />

      {/* ── PHASES timeline ───────────────────────────────────── */}
      <PhasesSection />

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
