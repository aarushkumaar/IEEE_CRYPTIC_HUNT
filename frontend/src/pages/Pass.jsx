import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { useGame } from '../hooks/useGame';

/* ─────────────────────────────────────────────────────────────────────────
   PASS SCREEN — Egyptian Cinematic Result Page
   Status: passed / score >= threshold
───────────────────────────────────────────────────────────────────────── */

function formatTime(seconds) {
  if (!seconds) return '—:——';
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

/* ── Dust particle canvas ──────────────────────────────────────────── */
function DustParticles() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W = window.innerWidth, H = window.innerHeight;
    canvas.width = W; canvas.height = H;

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -(Math.random() * 0.5 + 0.15),
      alpha: Math.random() * 0.3 + 0.1,
      life: Math.random(),
      decay: Math.random() * 0.002 + 0.0005,
      gold: Math.random() > 0.4,
    }));

    const resetP = p => {
      p.x = Math.random() * W; p.y = H + 10;
      p.r = Math.random() * 2 + 0.5;
      p.vx = (Math.random() - 0.5) * 0.4;
      p.vy = -(Math.random() * 0.5 + 0.15);
      p.alpha = Math.random() * 0.3 + 0.1;
      p.life = 1;
    };

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy; p.life -= p.decay;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.life <= 0 || p.y < -10) resetP(p);
        const a = p.alpha * Math.max(0, p.life);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.gold ? `rgba(212,175,55,${a.toFixed(3)})` : `rgba(255,255,220,${(a * 0.7).toFixed(3)})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => {
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W; canvas.height = H;
    };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
  }, []);

  return <canvas ref={ref} style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 1 }} />;
}

/* ── Torch component ───────────────────────────────────────────────── */
function Torch({ side }) {
  return (
    <div style={{
      position: 'fixed',
      [side]: 40,
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 3,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 0,
    }}>
      <style>{`
        @keyframes flicker {
          0%   { transform: scaleX(1)    scaleY(1)    rotate(-2deg); }
          25%  { transform: scaleX(0.9)  scaleY(1.05) rotate(2deg);  }
          50%  { transform: scaleX(1.1)  scaleY(0.95) rotate(-1deg); }
          75%  { transform: scaleX(0.95) scaleY(1.1)  rotate(3deg);  }
          100% { transform: scaleX(1)    scaleY(1)    rotate(-2deg); }
        }
        @keyframes emberRise {
          0%   { transform: translateY(0)   translateX(0)   scale(1);   opacity: 0.8; }
          100% { transform: translateY(-60px) translateX(${side === 'left' ? '8' : '-8'}px) scale(0); opacity: 0; }
        }
      `}</style>

      {/* Embers */}
      {[0, 1, 2, 3].map(i => (
        <div key={i} style={{
          position: 'absolute',
          top: 10 + i * 4,
          left: 8 + (i % 2) * 6,
          width: 3, height: 3,
          borderRadius: '50%',
          background: '#ff6600',
          animation: `emberRise ${0.8 + i * 0.3}s ease-out ${i * 0.2}s infinite`,
        }} />
      ))}

      {/* Flame outer */}
      <div style={{
        width: 20, height: 44,
        position: 'relative',
        filter: 'drop-shadow(0 0 18px #ff8c00) drop-shadow(0 0 40px #ff450088)',
      }}>
        <div style={{
          position: 'absolute', bottom: 0, left: 0,
          width: 20, height: 44,
          background: 'linear-gradient(to top, #ff4500, #ff8c00, #ffd700, transparent)',
          borderRadius: '50% 50% 20% 20%',
          animation: 'flicker 0.4s ease-in-out infinite alternate',
          transformOrigin: 'bottom center',
        }} />
        <div style={{
          position: 'absolute', bottom: 0, left: 4,
          width: 12, height: 28,
          background: 'linear-gradient(to top, #ff6600, #ffaa00, #fff176, transparent)',
          borderRadius: '50% 50% 20% 20%',
          animation: 'flicker 0.6s ease-in-out 0.1s infinite alternate',
          transformOrigin: 'bottom center',
        }} />
      </div>

      {/* Torch stick */}
      <div style={{
        width: 12, height: 100,
        background: 'linear-gradient(to right, #3d1f00, #6B3A15, #8B4513, #6B3A15, #3d1f00)',
        borderRadius: 4,
        boxShadow: '0 4px 12px rgba(0,0,0,0.8)',
      }} />

      {/* Wall bracket */}
      <div style={{
        width: 24, height: 8,
        background: '#2a1200',
        borderRadius: 2,
        border: '1px solid #5a3000',
      }} />
    </div>
  );
}

/* ── Cobra SVG ─────────────────────────────────────────────────────── */
function Cobra() {
  return (
    <div style={{
      position: 'fixed',
      left: 20,
      bottom: 40,
      zIndex: 4,
      width: 90,
      height: 180,
    }}>
      <style>{`
        @keyframes snakeSway {
          0%   { transform: rotate(-3deg) translateY(0px);  }
          25%  { transform: rotate(3deg)  translateY(-5px); }
          50%  { transform: rotate(-2deg) translateY(-2px); }
          75%  { transform: rotate(4deg)  translateY(-6px); }
          100% { transform: rotate(-3deg) translateY(0px);  }
        }
      `}</style>
      <svg
        viewBox="0 0 100 200"
        style={{ animation: 'snakeSway 3s ease-in-out infinite', transformOrigin: 'bottom center', filter: 'drop-shadow(0 0 8px rgba(212,175,55,0.4))' }}
      >
        {/* Body */}
        <path
          d="M50,200 Q30,160 40,120 Q20,80 50,60 Q70,40 60,20 Q55,5 65,0"
          stroke="#D4AF37" strokeWidth="8" fill="none" strokeLinecap="round"
        />
        {/* Hood */}
        <ellipse cx="60" cy="18" rx="18" ry="12" fill="#8B6914" opacity="0.85" />
        <ellipse cx="60" cy="18" rx="14" ry="9" fill="#A0781E" opacity="0.6" />
        {/* Eye */}
        <circle cx="65" cy="15" r="2.5" fill="#D4AF37" />
        <circle cx="65.8" cy="14.5" r="1" fill="#000" />
        {/* Tongue */}
        <path d="M68,22 L74,26 M68,22 L74,20" stroke="#C0392B" strokeWidth="1.5" strokeLinecap="round" />
        {/* Scale details */}
        <path d="M45,170 Q35,160 42,150" stroke="#B8860B" strokeWidth="2" fill="none" opacity="0.5" />
        <path d="M42,130 Q28,110 38,100" stroke="#B8860B" strokeWidth="2" fill="none" opacity="0.5" />
      </svg>
    </div>
  );
}

/* ── Main Pass Screen ──────────────────────────────────────────────── */
export default function Pass() {
  const navigate = useNavigate();
  const { getResult } = useGame();
  const [result, setResult] = useState(null);

  const scrollBodyRef = useRef(null);
  const titleRef      = useRef(null);
  const para1Ref      = useRef(null);
  const para2Ref      = useRef(null);
  const para3Ref      = useRef(null);
  const para4Ref      = useRef(null);
  const scoreRef      = useRef(null);
  const bottomRef     = useRef(null);
  const sealRef       = useRef(null);
  const btnRef        = useRef(null);

  useEffect(() => {
    getResult().then(setResult);
  }, []);

  // Run GSAP timeline once on mount — elements start at opacity:0 via inline style
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from(scrollBodyRef.current, { scaleY: 0, duration: 1.5, ease: 'power3.out', transformOrigin: 'top center' })
      .to(titleRef.current,        { opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.4)', clearProps: 'scale' }, '-=0.3')
      .to(para1Ref.current,        { opacity: 1, y: 0, duration: 0.6 }, '+=0.2')
      .to(para2Ref.current,        { opacity: 1, y: 0, duration: 0.6 }, '+=0.4')
      .to(para3Ref.current,        { opacity: 1, y: 0, duration: 0.6 }, '+=0.4')
      .to(para4Ref.current,        { opacity: 1, y: 0, duration: 0.6 }, '+=0.4')
      .to(scoreRef.current,        { opacity: 1, scale: 1, duration: 0.8, clearProps: 'scale' }, '+=0.3')
      .to(bottomRef.current,       { opacity: 1, duration: 1.0 }, '+=0.3')
      .to(sealRef.current,         { opacity: 1, scale: 1, rotation: 0, duration: 0.8, ease: 'back.out(1.4)', clearProps: 'scale,rotation', onComplete: () => { if (sealRef.current) sealRef.current.style.animation = 'sealSpin 20s linear infinite'; } }, '+=0.2')
      .to(btnRef.current,          { opacity: 1, y: 0, duration: 0.6 }, '+=0.3');
    return () => tl.kill();
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden',
      background: '#1a0f00',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <style>{`
        @keyframes sealSpin    { to { transform: rotate(360deg); } }
        @keyframes goldPulse   { 0%,100%{text-shadow:0 0 20px #D4AF37,0 0 40px #B8860B,0 0 60px #8B6914} 50%{text-shadow:0 0 40px #FFD700,0 0 80px #D4AF37,0 0 120px #B8860B} }
        @keyframes torchGlow   { 0%,100%{opacity:.7} 50%{opacity:1} }
      `}</style>

      {/* LAYER 1 — Egyptian tomb background */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0,
        background: `
          radial-gradient(ellipse at 15% 50%, rgba(139,69,19,0.25) 0%, transparent 40%),
          radial-gradient(ellipse at 85% 50%, rgba(139,69,19,0.25) 0%, transparent 40%),
          radial-gradient(ellipse at 50% 100%, rgba(100,50,0,0.4) 0%, transparent 50%),
          linear-gradient(180deg, #0D0800 0%, #1A0F02 30%, #251500 60%, #1A0F02 80%, #0D0800 100%)
        `,
      }}>
        {/* stone wall texture simulation */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(0,0,0,0.25) 80px),
            repeating-linear-gradient(90deg, transparent, transparent 159px, rgba(0,0,0,0.15) 160px)
          `,
          opacity: 0.4,
        }} />
        {/* Hieroglyph side panels */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: 140,
          background: 'linear-gradient(to right, rgba(10,6,0,0.9), transparent)',
        }}>
          <div style={{ position: 'absolute', top: '15%', left: 24, color: 'rgba(180,140,60,0.18)', fontSize: 22, lineHeight: 2.2, writingMode: 'vertical-rl' }}>
            𓂀𓅓𓆙𓋴𓇯𓃒𓏏𓈖𓆣𓋹𓐍𓅱𓂧𓊪𓁹𓆑𓏛𓂀𓅓𓆙
          </div>
        </div>
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: 140,
          background: 'linear-gradient(to left, rgba(10,6,0,0.9), transparent)',
        }}>
          <div style={{ position: 'absolute', top: '15%', right: 24, color: 'rgba(180,140,60,0.18)', fontSize: 22, lineHeight: 2.2, writingMode: 'vertical-rl' }}>
            𓏛𓆑𓁹𓊪𓂧𓅱𓐍𓋹𓆣𓈖𓏏𓃒𓇯𓋴𓆙𓅓𓂀𓏛𓆑𓁹
          </div>
        </div>
        {/* Vignette */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.88) 100%)',
        }} />
        {/* Torch ambient glow pools */}
        <div style={{ position: 'absolute', left: 60, top: '50%', transform: 'translateY(-50%)', width: 120, height: 300, background: 'radial-gradient(ellipse, rgba(255,140,0,0.12) 0%, transparent 70%)', animation: 'torchGlow 1.5s ease-in-out infinite', animationDelay: '0.2s' }} />
        <div style={{ position: 'absolute', right: 60, top: '50%', transform: 'translateY(-50%)', width: 120, height: 300, background: 'radial-gradient(ellipse, rgba(255,140,0,0.12) 0%, transparent 70%)', animation: 'torchGlow 1.5s ease-in-out infinite', animationDelay: '0.7s' }} />
      </div>

      {/* LAYER 2 — Dust particles */}
      <DustParticles />

      {/* LAYER 4 — Torches */}
      <Torch side="left" />
      <Torch side="right" />

      {/* LAYER 5 — Cobra */}
      <Cobra />

      {/* LAYER 3 — Central Scroll */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: 760, margin: '0 auto', padding: '0 clamp(20px, 12vw, 160px)' }}>

        {/* Top roller */}
        <div style={{
          height: 28, borderRadius: 14,
          background: 'linear-gradient(to right, #3d1f00, #8B4513, #c4772a, #d4893a, #c4772a, #8B4513, #3d1f00)',
          boxShadow: '0 4px 15px rgba(0,0,0,0.8), inset 0 2px 4px rgba(255,255,255,0.1)',
          position: 'relative', zIndex: 2,
        }} />

        {/* Scroll body */}
        <div
          ref={scrollBodyRef}
          style={{
            background: 'linear-gradient(135deg, #c8a96e 0%, #d4b483 20%, #c2a060 40%, #d9bc8a 60%, #c4a06a 80%, #b8935a 100%)',
            border: '3px solid #8B6914',
            boxShadow: 'inset 0 0 40px rgba(0,0,0,0.35), 0 0 60px rgba(0,0,0,0.9), 0 20px 80px rgba(0,0,0,0.7)',
            borderRadius: 4,
            padding: '48px 52px 40px',
            position: 'relative',
            transformOrigin: 'top center',
          }}
        >
          {/* Paper texture overlay */}
          <div style={{
            position: 'absolute', inset: 0, borderRadius: 4, pointerEvents: 'none',
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 23px, rgba(0,0,0,0.06) 24px),
              repeating-linear-gradient(90deg, transparent, transparent 47px, rgba(0,0,0,0.04) 48px)
            `,
          }} />
          <div style={{ position: 'absolute', inset: 0, borderRadius: 4, pointerEvents: 'none', background: 'radial-gradient(ellipse at 50% 50%, rgba(200,180,120,0.1) 0%, rgba(0,0,0,0.15) 100%)' }} />

          {/* Inner gold border */}
          <div style={{ position: 'absolute', inset: 10, border: '1px solid rgba(139,105,20,0.5)', borderRadius: 2, pointerEvents: 'none' }} />

          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>

            {/* Hieroglyph accent row */}
            <div style={{ fontSize: 16, color: 'rgba(100,70,10,0.55)', letterSpacing: '0.4em', marginBottom: 24, fontFamily: 'serif' }}>
              𓂀 𓋴 𓆑 𓐍 𓏏 𓋹
            </div>

            {/* TITLE */}
            <h1
              ref={titleRef}
              style={{
                fontFamily: '"Cinzel Decorative", serif',
                fontSize: 'clamp(22px, 4vw, 36px)',
                fontWeight: 700,
                color: '#5A3500',
                letterSpacing: '0.12em',
                margin: '0 0 8px',
                textShadow: '0 2px 8px rgba(0,0,0,0.3), 0 0 20px rgba(212,175,55,0.4)',
                lineHeight: 1.2,
                opacity: 0,
                transform: 'scale(0.8)',
              }}
            >
              THE TOMB HAS SPOKEN
            </h1>

            {/* Gold rule */}
            <div style={{ height: 2, background: 'linear-gradient(to right, transparent, #8B6914, #D4AF37, #8B6914, transparent)', margin: '16px 0 28px' }} />

            {/* Paragraphs */}
            <div style={{ fontFamily: '"Cinzel", serif', fontSize: 'clamp(12px, 1.6vw, 15px)', color: '#3A2000', lineHeight: 1.85, textAlign: 'center' }}>
              <p ref={para1Ref} style={{ margin: '0 0 18px', fontStyle: 'italic', opacity: 0, transform: 'translateY(15px)' }}>
                You have walked where few dare tread — through the chambers of logic,
                the halls of cipher, and the abyss of the unknown.
              </p>
              <p ref={para2Ref} style={{ margin: '0 0 18px', fontStyle: 'italic', opacity: 0, transform: 'translateY(15px)' }}>
                The ancient ones have witnessed your descent. They have measured your
                mind against the weight of a feather, and found you worthy.
              </p>
              <p ref={para3Ref} style={{ margin: '0 0 18px', fontStyle: 'italic', opacity: 0, transform: 'translateY(15px)' }}>
                Your name is now etched in gold upon the Scroll of Honor — immortalised
                within these walls, spoken in silence by the stones themselves.
              </p>
              <p ref={para4Ref} style={{ margin: '0 0 0', fontWeight: 600, opacity: 0, transform: 'translateY(15px)' }}>
                The hunt is over. The seeker has become the found.
              </p>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: 'linear-gradient(to right, transparent, #8B6914, transparent)', margin: '28px 0' }} />

            {/* Score / Time Box */}
            <div
              ref={scoreRef}
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: 4,
                margin: '0 0 28px',
                opacity: 0,
                transform: 'scale(0.9)',
              }}
            >
              {/* Score cell */}
              <div style={{
                flex: 1,
                background: 'linear-gradient(135deg, #1a0d00, #2a1800, #1a0d00)',
                border: '2px solid #8B6914',
                borderRadius: 4,
                padding: '14px 20px',
                boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)',
              }}>
                <div style={{ fontFamily: '"Cinzel", serif', fontSize: 9, letterSpacing: '0.2em', color: '#D4AF37', marginBottom: 6, opacity: 0.8 }}>
                  YOUR FINAL SCORE
                </div>
                <div style={{ fontFamily: '"Cinzel Decorative", serif', fontSize: 'clamp(22px, 3.5vw, 36px)', fontWeight: 700, color: '#FFD700', textShadow: '0 0 20px rgba(212,175,55,0.6)' }}>
                  {result ? `${result.score} / 13` : '— / 13'}
                </div>
              </div>

              {/* Decorative separator */}
              <div style={{ width: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 2, height: 60, background: 'linear-gradient(to bottom, transparent, #8B6914, transparent)' }} />
              </div>

              {/* Time cell */}
              <div style={{
                flex: 1,
                background: 'linear-gradient(135deg, #1a0d00, #2a1800, #1a0d00)',
                border: '2px solid #8B6914',
                borderRadius: 4,
                padding: '14px 20px',
                boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)',
              }}>
                <div style={{ fontFamily: '"Cinzel", serif', fontSize: 9, letterSpacing: '0.2em', color: '#D4AF37', marginBottom: 6, opacity: 0.8 }}>
                  TOTAL TIME TAKEN
                </div>
                <div style={{ fontFamily: '"Cinzel Decorative", serif', fontSize: 'clamp(22px, 3.5vw, 36px)', fontWeight: 700, color: '#FFD700', textShadow: '0 0 20px rgba(212,175,55,0.6)' }}>
                  {result ? formatTime(result.timeSeconds) : '—:——'}
                </div>
              </div>
            </div>

            {/* Bottom declaration */}
            <p
              ref={bottomRef}
              style={{
                fontFamily: '"Cinzel Decorative", serif',
                fontSize: 'clamp(13px, 2vw, 18px)',
                fontWeight: 700,
                letterSpacing: '0.18em',
                color: '#5A3500',
                margin: '0 0 24px',
                animation: 'goldPulse 3s ease-in-out infinite',
                textShadow: '0 0 20px rgba(212,175,55,0.5)',
                opacity: 0,
              }}
            >
              AMENTIS REMEMBERS YOUR NAME.
            </p>

            {/* Wax Seal */}
            <div
              ref={sealRef}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 56, height: 56,
                borderRadius: '50%',
                background: 'radial-gradient(circle at 35% 35%, #C0392B, #8B0000, #5a0000)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.6), inset 0 2px 4px rgba(255,255,255,0.1)',
                margin: '0 0 28px',
                opacity: 0,
                transform: 'scale(0) rotate(-180deg)',
              }}
            >
              <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
                <line x1="17" y1="4"  x2="17" y2="30" stroke="rgba(212,175,55,0.7)" strokeWidth="2" />
                <line x1="4"  y1="17" x2="30" y2="17" stroke="rgba(212,175,55,0.7)" strokeWidth="2" />
                <line x1="8"  y1="8"  x2="26" y2="26" stroke="rgba(212,175,55,0.4)" strokeWidth="1.5" />
                <line x1="26" y1="8"  x2="8"  y2="26" stroke="rgba(212,175,55,0.4)" strokeWidth="1.5" />
                <circle cx="17" cy="17" r="5" fill="none" stroke="rgba(212,175,55,0.6)" strokeWidth="1.5" />
              </svg>
            </div>

            {/* Return button */}
            <div ref={btnRef} style={{ opacity: 0, transform: 'translateY(10px)' }}>
              <button
                onClick={() => navigate('/')}
                style={{
                  display: 'inline-block',
                  background: 'transparent',
                  border: '2px solid #8B6914',
                  color: '#5A3500',
                  padding: '13px 40px',
                  fontFamily: '"Cinzel", serif',
                  fontWeight: 700,
                  fontSize: 12,
                  letterSpacing: '0.2em',
                  cursor: 'pointer',
                  borderRadius: 2,
                  transition: 'all 0.3s',
                  textTransform: 'uppercase',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#8B6914';
                  e.currentTarget.style.color = '#000';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(139,105,20,0.5)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#5A3500';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Return to the Surface
              </button>
            </div>

          </div>
        </div>

        {/* Bottom roller */}
        <div style={{
          height: 28, borderRadius: 14,
          background: 'linear-gradient(to right, #3d1f00, #8B4513, #c4772a, #d4893a, #c4772a, #8B4513, #3d1f00)',
          boxShadow: '0 -4px 15px rgba(0,0,0,0.8), inset 0 -2px 4px rgba(255,255,255,0.1)',
          position: 'relative', zIndex: 2,
        }} />
      </div>

      {/* Keyframe styles exposed globally for the scroll content */}
      <style>{`
        @keyframes goldPulse {
          0%,100% { text-shadow: 0 0 12px rgba(212,175,55,0.4), 0 0 24px rgba(139,105,20,0.3); }
          50%      { text-shadow: 0 0 24px rgba(212,175,55,0.7), 0 0 48px rgba(212,175,55,0.4); }
        }
      `}</style>
    </div>
  );
}
