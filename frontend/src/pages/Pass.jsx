import { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { useGame } from '../hooks/useGame';

/* ─────────────────────────────────────────────────────────────────────────
   PASS SCREEN — matches reference image exactly
   - Full-viewport tomb background
   - Content floats directly over dark overlay (no papyrus)
   - Interactive mouse-repel dust particles (canvas)
   - CSS fire torches left + right
   - SVG cobra bottom-left
   - Mini scroll bottom-center
   - GSAP cinematic reveal
───────────────────────────────────────────────────────────────────────── */

function formatTime(seconds) {
  if (!seconds) return '—:——';
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

/* ── Interactive mouse-repel dust canvas ───────────────────────────── */
function DustCanvas() {
  const ref = useRef(null);
  const mouse = useRef({ x: -999, y: -999 });

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W = window.innerWidth, H = window.innerHeight;
    canvas.width = W; canvas.height = H;

    const REPEL_RADIUS = 110;
    const REPEL_FORCE  = 3.5;
    const COUNT        = 90;

    const particles = Array.from({ length: COUNT }, () => ({
      x:    Math.random() * W,
      y:    Math.random() * H,
      baseX: 0, baseY: 0,      // natural float origin (reset each frame)
      vx:   (Math.random() - 0.5) * 0.35,
      vy:   -(Math.random() * 0.55 + 0.1),
      r:    Math.random() * 2.2 + 0.5,
      alpha: Math.random() * 0.38 + 0.12,
      life:  Math.random(),
      decay: Math.random() * 0.0018 + 0.0004,
      gold:  Math.random() > 0.35,
    }));

    const resetP = p => {
      p.x = Math.random() * W; p.y = H + 10;
      p.vx = (Math.random() - 0.5) * 0.35;
      p.vy = -(Math.random() * 0.55 + 0.1);
      p.alpha = Math.random() * 0.38 + 0.12;
      p.life  = 1;
    };

    const onMouseMove = e => { mouse.current.x = e.clientX; mouse.current.y = e.clientY; };
    const onMouseLeave = () => { mouse.current.x = -999; mouse.current.y = -999; };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      for (const p of particles) {
        // Natural float
        p.x += p.vx; p.y += p.vy; p.life -= p.decay;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.life <= 0 || p.y < -10) resetP(p);

        // Mouse repulsion (circular)
        const dx = p.x - mouse.current.x;
        const dy = p.y - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPEL_RADIUS && dist > 0) {
          const force = (1 - dist / REPEL_RADIUS) * REPEL_FORCE;
          p.x += (dx / dist) * force;
          p.y += (dy / dist) * force;
        }

        const a = p.alpha * Math.max(0, p.life);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.gold
          ? `rgba(212,175,55,${a.toFixed(3)})`
          : `rgba(255,240,180,${(a * 0.65).toFixed(3)})`;
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
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 2 }}
    />
  );
}

/* ── CSS Fire Torch ─────────────────────────────────────────────────── */
function Torch({ side }) {
  return (
    <div style={{
      position: 'fixed',
      [side]: 32,
      top: '18%',
      zIndex: 5,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <style>{`
        @keyframes flicker {
          0%   { transform: scaleX(1)    scaleY(1)    rotate(-2deg); }
          20%  { transform: scaleX(0.88) scaleY(1.06) rotate(2.5deg); }
          40%  { transform: scaleX(1.12) scaleY(0.93) rotate(-1.5deg); }
          60%  { transform: scaleX(0.92) scaleY(1.08) rotate(3deg); }
          80%  { transform: scaleX(1.06) scaleY(0.96) rotate(-2deg); }
          100% { transform: scaleX(1)    scaleY(1)    rotate(-2deg); }
        }
        @keyframes ember {
          0%   { transform: translateY(0)    translateX(0)   scale(1);   opacity: 0.9; }
          100% { transform: translateY(-70px) translateX(${side === 'left' ? '10' : '-10'}px) scale(0); opacity: 0; }
        }
        @keyframes smokeRise {
          0%   { transform: translateY(0) translateX(0) scale(0.3); opacity: 0.4; }
          50%  { opacity: 0.15; }
          100% { transform: translateY(-90px) translateX(${side === 'left' ? '18' : '-18'}px) scale(1.8); opacity: 0; }
        }
      `}</style>

      {/* Smoke wisps */}
      {[0, 1, 2].map(i => (
        <div key={`s${i}`} style={{
          position: 'absolute',
          top: -30 - i * 15,
          left: side === 'left' ? 2 + i * 3 : undefined,
          right: side === 'right' ? 2 + i * 3 : undefined,
          width: 8 + i * 4, height: 8 + i * 4,
          borderRadius: '50%',
          background: 'rgba(200,200,200,0.15)',
          animation: `smokeRise ${1.5 + i * 0.4}s ease-out ${i * 0.3}s infinite`,
          filter: 'blur(4px)',
        }} />
      ))}

      {/* Embers */}
      {[0, 1, 2, 3].map(i => (
        <div key={`e${i}`} style={{
          position: 'absolute',
          top: 4 + (i % 2) * 6,
          left: 4 + (i % 3) * 5,
          width: 2.5, height: 2.5,
          borderRadius: '50%',
          background: i % 2 === 0 ? '#ff6600' : '#ffcc00',
          animation: `ember ${0.7 + i * 0.25}s ease-out ${i * 0.18}s infinite`,
          filter: 'blur(0.5px)',
        }} />
      ))}

      {/* Flame */}
      <div style={{ width: 22, height: 50, position: 'relative', filter: 'drop-shadow(0 0 22px #ff8c00) drop-shadow(0 -6px 40px rgba(255,140,0,0.5))' }}>
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: 22, height: 50, background: 'linear-gradient(to top, #cc2200, #ff4500, #ff8c00, #ffd000, rgba(255,210,0,0))', borderRadius: '50% 50% 20% 20%', animation: 'flicker 0.38s ease-in-out infinite alternate', transformOrigin: 'bottom center' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 5, width: 12, height: 34, background: 'linear-gradient(to top, #ff4500, #ff9900, #ffee44, rgba(255,240,100,0))', borderRadius: '50% 50% 20% 20%', animation: 'flicker 0.55s ease-in-out 0.08s infinite alternate', transformOrigin: 'bottom center' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 8, width: 6, height: 22, background: 'linear-gradient(to top, #ff7700, #ffcc00, rgba(255,255,200,0))', borderRadius: '50% 50% 20% 20%', animation: 'flicker 0.45s ease-in-out 0.15s infinite alternate', transformOrigin: 'bottom center' }} />
      </div>

      {/* Torch head bracket */}
      <div style={{ width: 26, height: 10, background: 'linear-gradient(to right, #2a1000, #5a3010, #7a4520, #5a3010, #2a1000)', borderRadius: '2px', marginBottom: 0 }} />
      {/* Stick */}
      <div style={{ width: 10, height: 80, background: 'linear-gradient(to right, #1a0800, #4a2500, #6a3810, #4a2500, #1a0800)', borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.8)' }} />
      {/* Wall mount */}
      <div style={{ width: 20, height: 6, background: '#1a0800', borderRadius: 2, border: '1px solid #3a2000', marginTop: 2 }} />
    </div>
  );
}

/* ── SVG Cobra ─────────────────────────────────────────────────────── */
function Cobra() {
  return (
    <div style={{ position: 'fixed', left: 24, bottom: 36, zIndex: 5, width: 96, height: 190 }}>
      <style>{`@keyframes snakeSway { 0%{transform:rotate(-3deg) translateY(0)} 25%{transform:rotate(3deg) translateY(-5px)} 50%{transform:rotate(-2deg) translateY(-2px)} 75%{transform:rotate(4deg) translateY(-6px)} 100%{transform:rotate(-3deg) translateY(0)} }`}</style>
      <svg viewBox="0 0 100 200" style={{ animation: 'snakeSway 3.2s ease-in-out infinite', transformOrigin: 'bottom center', filter: 'drop-shadow(0 0 10px rgba(212,175,55,0.35))' }}>
        <path d="M50,200 Q28,165 38,125 Q18,82 52,62 Q72,44 62,22 Q57,6 67,0" stroke="#C9A84C" strokeWidth="9" fill="none" strokeLinecap="round" />
        <path d="M50,200 Q28,165 38,125 Q18,82 52,62 Q72,44 62,22 Q57,6 67,0" stroke="#8B6914" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.6" />
        {/* Hood */}
        <ellipse cx="62" cy="20" rx="20" ry="14" fill="#7a5500" opacity="0.9" />
        <ellipse cx="62" cy="20" rx="16" ry="10" fill="#9a7010" opacity="0.7" />
        <ellipse cx="62" cy="20" rx="11" ry="7" fill="#c9a030" opacity="0.5" />
        {/* Eye */}
        <circle cx="68" cy="16" r="3" fill="#D4AF37" />
        <circle cx="69" cy="15.2" r="1.2" fill="#1a0800" />
        <circle cx="69.4" cy="14.8" r="0.5" fill="rgba(255,255,255,0.4)" />
        {/* Tongue */}
        <path d="M70,24 L78,28 M70,24 L78,21" stroke="#8B0000" strokeWidth="1.8" strokeLinecap="round" />
        {/* Scale pattern */}
        <path d="M42,170 Q30,155 40,145" stroke="#a08020" strokeWidth="2" fill="none" opacity="0.4" />
        <path d="M38,135 Q24,115 36,104" stroke="#a08020" strokeWidth="2" fill="none" opacity="0.4" />
      </svg>
    </div>
  );
}

/* ── Oil lamp (bottom corners) ─────────────────────────────────────── */
function OilLamp({ side }) {
  return (
    <div style={{ position: 'fixed', [side]: 20, bottom: 20, zIndex: 5, opacity: 0.85 }}>
      <style>{`@keyframes lampFlicker { 0%,100%{opacity:.7} 50%{opacity:1} }`}</style>
      <div style={{ width: 36, height: 18, background: 'linear-gradient(to right, #3d1f00, #8B4513, #3d1f00)', borderRadius: '50%', position: 'relative' }}>
        <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', width: 8, height: 18, background: 'linear-gradient(to top, #ff6600, #ffcc00, transparent)', borderRadius: '50% 50% 20% 20%', animation: 'lampFlicker 0.6s ease-in-out infinite alternate', filter: 'blur(1px)' }} />
      </div>
    </div>
  );
}

/* ── Mini Scroll at bottom ─────────────────────────────────────────── */
function MiniScroll() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 8 }}>
      {/* Top mini roller */}
      <div style={{ width: 180, height: 12, borderRadius: 6, background: 'linear-gradient(to right, #3d1f00, #8B4513, #c4772a, #8B4513, #3d1f00)', boxShadow: '0 2px 6px rgba(0,0,0,0.7)' }} />
      {/* Scroll body */}
      <div style={{
        width: 180, padding: '10px 16px',
        background: 'linear-gradient(135deg, #c8a96e 0%, #d4b483 35%, #c2a060 60%, #b8935a 100%)',
        border: '2px solid #8B6914',
        boxShadow: 'inset 0 0 20px rgba(0,0,0,0.35), 0 4px 20px rgba(0,0,0,0.7)',
        position: 'relative',
      }}>
        <div style={{ fontFamily: '"Cinzel", serif', fontSize: 7, letterSpacing: '0.2em', color: '#4a2800', textAlign: 'center', marginBottom: 4, fontWeight: 700 }}>
          Scroll of Honor
        </div>
        <div style={{ fontFamily: 'serif', fontSize: 5, color: 'rgba(60,30,5,0.5)', textAlign: 'center', lineHeight: 1.6, marginBottom: 6, fontStyle: 'italic' }}>
          Herein are inscribed the names of those<br/>who proved worthy before the tomb<br/>and emerged victorious from the abyss.
        </div>
        {/* Two wax seals */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
          {[0, 1].map(i => (
            <div key={i} style={{ width: 18, height: 18, borderRadius: '50%', background: `radial-gradient(circle at 35% 35%, ${i === 0 ? '#C0392B' : '#8B0000'}, ${i === 0 ? '#8B0000' : '#4a0000'})`, boxShadow: '0 2px 8px rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <line x1="5.5" y1="1" x2="5.5" y2="10" stroke="rgba(212,175,55,0.6)" strokeWidth="1.2" />
                <line x1="1" y1="5.5" x2="10" y2="5.5" stroke="rgba(212,175,55,0.6)" strokeWidth="1.2" />
                <circle cx="5.5" cy="5.5" r="2" fill="none" stroke="rgba(212,175,55,0.4)" strokeWidth="1" />
              </svg>
            </div>
          ))}
        </div>
      </div>
      {/* Bottom mini roller */}
      <div style={{ width: 180, height: 12, borderRadius: 6, background: 'linear-gradient(to right, #3d1f00, #8B4513, #c4772a, #8B4513, #3d1f00)', boxShadow: '0 -2px 6px rgba(0,0,0,0.7)' }} />
    </div>
  );
}

/* ── Main Pass Component ────────────────────────────────────────────── */
export default function Pass() {
  const navigate = useNavigate();
  const { getResult } = useGame();
  const [result, setResult] = useState(null);

  const titleRef   = useRef(null);
  const para1Ref   = useRef(null);
  const para2Ref   = useRef(null);
  const para3Ref   = useRef(null);
  const para4Ref   = useRef(null);
  const scoreRef   = useRef(null);
  const bottomRef  = useRef(null);
  const scrollRef  = useRef(null);
  const btnRef     = useRef(null);

  useEffect(() => { getResult().then(setResult); }, []);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.to(titleRef.current,  { opacity: 1, y: 0, duration: 1.0 }, 0.3)
      .to(para1Ref.current,  { opacity: 1, y: 0, duration: 0.7 }, '+=0.25')
      .to(para2Ref.current,  { opacity: 1, y: 0, duration: 0.7 }, '+=0.35')
      .to(para3Ref.current,  { opacity: 1, y: 0, duration: 0.7 }, '+=0.35')
      .to(para4Ref.current,  { opacity: 1, y: 0, duration: 0.7 }, '+=0.35')
      .to(scoreRef.current,  { opacity: 1, y: 0, duration: 0.8 }, '+=0.3')
      .to(bottomRef.current, { opacity: 1, y: 0, duration: 0.9 }, '+=0.25')
      .to(scrollRef.current, { opacity: 1, y: 0, duration: 0.8 }, '+=0.2')
      .to(btnRef.current,    { opacity: 1, y: 0, duration: 0.6 }, '+=0.2');
    return () => tl.kill();
  }, []);

  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden', background: '#0a0500' }}>
      <style>{`
        @keyframes goldGlow {
          0%,100% { text-shadow: 0 0 20px rgba(212,175,55,0.5), 0 0 40px rgba(180,140,30,0.3), 0 2px 4px rgba(0,0,0,0.8); }
          50%     { text-shadow: 0 0 35px rgba(212,175,55,0.8), 0 0 70px rgba(180,140,30,0.5), 0 2px 4px rgba(0,0,0,0.8); }
        }
        @keyframes bottomPulse {
          0%,100% { text-shadow: 0 0 16px rgba(212,175,55,0.4); }
          50%     { text-shadow: 0 0 32px rgba(212,175,55,0.75), 0 0 60px rgba(180,140,30,0.4); }
        }
        @keyframes torchGlow {
          0%,100% { opacity: 0.6; }
          50%     { opacity: 0.9; }
        }
      `}</style>

      {/* LAYER 1 — Tomb background image */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0,
        backgroundImage: 'url(/assets/tomb_bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'brightness(0.7) saturate(0.9)',
      }} />

      {/* Radial dark vignette overlay */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 1,
        background: 'radial-gradient(ellipse 70% 80% at 50% 50%, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.72) 100%)',
      }} />

      {/* Warm ambient glow from torches */}
      <div style={{ position: 'fixed', left: 0,  top: 0, bottom: 0, width: '18%', background: 'linear-gradient(to right, rgba(180,80,0,0.18), transparent)', zIndex: 1, pointerEvents: 'none', animation: 'torchGlow 1.4s ease-in-out infinite' }} />
      <div style={{ position: 'fixed', right: 0, top: 0, bottom: 0, width: '18%', background: 'linear-gradient(to left,  rgba(180,80,0,0.18), transparent)', zIndex: 1, pointerEvents: 'none', animation: 'torchGlow 1.4s ease-in-out infinite', animationDelay: '0.5s' }} />

      {/* LAYER 2 — Dust particles (interactive) */}
      <DustCanvas />

      {/* LAYER 3 — Torches */}
      <Torch side="left" />
      <Torch side="right" />

      {/* LAYER 4 — Cobra */}
      <Cobra />

      {/* LAYER 5 — Oil lamps */}
      <OilLamp side="right" />

      {/* LAYER 6 — Main content */}
      <div style={{
        position: 'relative', zIndex: 10,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px clamp(120px, 18vw, 260px) 40px',
        textAlign: 'center',
      }}>

        {/* Title */}
        <h1
          ref={titleRef}
          style={{
            fontFamily: '"Cinzel Decorative", serif',
            fontSize: 'clamp(28px, 5.5vw, 58px)',
            fontWeight: 900,
            color: '#FFD700',
            letterSpacing: '0.08em',
            margin: '0 0 36px',
            lineHeight: 1.1,
            animation: 'goldGlow 3s ease-in-out infinite',
            opacity: 0,
            transform: 'translateY(-20px)',
          }}
        >
          THE TOMB HAS SPOKEN
        </h1>

        {/* Body text */}
        <div style={{ fontFamily: '"Cinzel", serif', fontSize: 'clamp(13px, 1.65vw, 17px)', color: 'rgba(255,240,200,0.92)', lineHeight: 1.9, maxWidth: 680, width: '100%' }}>
          <p ref={para1Ref} style={{ margin: '0 0 18px', fontStyle: 'italic', opacity: 0, transform: 'translateY(16px)' }}>
            You have walked where few dare tread — through the chambers of logic,
            the halls of cipher, and the abyss of the unknown.
          </p>
          <p ref={para2Ref} style={{ margin: '0 0 18px', fontStyle: 'italic', opacity: 0, transform: 'translateY(16px)' }}>
            The ancient ones have witnessed your descent. They have measured your mind
            against the weight of a feather, and found you worthy.
          </p>
          <p ref={para3Ref} style={{ margin: '0 0 18px', fontStyle: 'italic', opacity: 0, transform: 'translateY(16px)' }}>
            Your name is now etched in gold upon the Scroll of Honor — immortalised
            within these walls, spoken in silence by the stones themselves.
          </p>
          <p ref={para4Ref} style={{ margin: 0, fontWeight: 600, fontSize: 'clamp(13px, 1.5vw, 16px)', color: 'rgba(255,240,200,0.85)', opacity: 0, transform: 'translateY(16px)' }}>
            The hunt is over. The seeker has become the found.
          </p>
        </div>

        {/* Score + Time boxes */}
        <div ref={scoreRef} style={{ display: 'flex', gap: 12, marginTop: 36, width: '100%', maxWidth: 560, opacity: 0, transform: 'translateY(16px)' }}>
          {/* Score box */}
          <div style={{
            flex: 1,
            background: 'rgba(8,4,0,0.78)',
            border: '2px solid #C9A84C',
            borderRadius: 4,
            padding: '16px 24px',
            boxShadow: '0 0 24px rgba(0,0,0,0.8), inset 0 0 20px rgba(0,0,0,0.5)',
            position: 'relative',
          }}>
            {/* Corner decorations */}
            {[{top:4,left:4},{top:4,right:4},{bottom:4,left:4},{bottom:4,right:4}].map((c,i)=>(
              <div key={i} style={{ position:'absolute', width:10, height:10, ...c, borderTop: i<2 ? '1.5px solid #C9A84C' : undefined, borderBottom: i>=2 ? '1.5px solid #C9A84C' : undefined, borderLeft: i%2===0 ? '1.5px solid #C9A84C' : undefined, borderRight: i%2===1 ? '1.5px solid #C9A84C' : undefined }} />
            ))}
            {/* Side arrows */}
            <div style={{ position:'absolute', right:-12, top:'50%', transform:'translateY(-50%)', color:'#C9A84C', fontSize:18, fontWeight:700 }}>›</div>
            <div style={{ fontFamily:'"Cinzel",serif', fontSize:9, letterSpacing:'0.22em', color:'#C9A84C', marginBottom:8, fontWeight:700 }}>YOUR FINAL SCORE</div>
            <div style={{ fontFamily:'"Cinzel Decorative",serif', fontSize:'clamp(26px,4vw,42px)', fontWeight:700, color:'#FFD700', textShadow:'0 0 20px rgba(212,175,55,0.5)' }}>
              {result ? `${result.score} / 13` : '— / 13'}
            </div>
          </div>

          {/* Time box */}
          <div style={{
            flex: 1,
            background: 'rgba(8,4,0,0.78)',
            border: '2px solid #C9A84C',
            borderRadius: 4,
            padding: '16px 24px',
            boxShadow: '0 0 24px rgba(0,0,0,0.8), inset 0 0 20px rgba(0,0,0,0.5)',
          }}>
            <div style={{ fontFamily:'"Cinzel",serif', fontSize:9, letterSpacing:'0.22em', color:'#C9A84C', marginBottom:8, fontWeight:700 }}>TOTAL TIME TAKEN</div>
            <div style={{ fontFamily:'"Cinzel Decorative",serif', fontSize:'clamp(26px,4vw,42px)', fontWeight:700, color:'#FFD700', textShadow:'0 0 20px rgba(212,175,55,0.5)' }}>
              {result ? formatTime(result.timeSeconds) : '—:——'}
            </div>
          </div>
        </div>

        {/* Bottom declaration */}
        <p
          ref={bottomRef}
          style={{
            fontFamily: '"Cinzel Decorative", serif',
            fontSize: 'clamp(16px, 2.5vw, 26px)',
            fontWeight: 700,
            letterSpacing: '0.14em',
            color: '#FFD700',
            margin: '32px 0 0',
            animation: 'bottomPulse 3s ease-in-out infinite',
            opacity: 0,
            transform: 'translateY(16px)',
          }}
        >
          AMENTIS REMEMBERS YOUR NAME.
        </p>

        {/* Mini Scroll */}
        <div ref={scrollRef} style={{ marginTop: 24, opacity: 0, transform: 'translateY(16px)' }}>
          <MiniScroll />
        </div>

        {/* Return button */}
        <div ref={btnRef} style={{ marginTop: 24, opacity: 0, transform: 'translateY(16px)' }}>
          <button
            onClick={() => navigate('/')}
            style={{
              background: 'transparent',
              border: '2px solid rgba(201,168,76,0.7)',
              color: '#C9A84C',
              padding: '12px 40px',
              fontFamily: '"Cinzel", serif',
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: '0.22em',
              cursor: 'pointer',
              borderRadius: 2,
              transition: 'all 0.3s',
              textTransform: 'uppercase',
              boxShadow: '0 0 0 rgba(201,168,76,0)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(201,168,76,0.15)';
              e.currentTarget.style.borderColor = '#FFD700';
              e.currentTarget.style.color = '#FFD700';
              e.currentTarget.style.boxShadow = '0 0 24px rgba(212,175,55,0.35)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = 'rgba(201,168,76,0.7)';
              e.currentTarget.style.color = '#C9A84C';
              e.currentTarget.style.boxShadow = '0 0 0 rgba(201,168,76,0)';
            }}
          >
            Return to the Surface
          </button>
        </div>
      </div>
    </div>
  );
}
