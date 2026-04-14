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

    const REPEL_RADIUS = 130;  // ~100-150px
    const REPEL_FORCE  = 0.4;  // Velocity magnitude added per frame
    const COUNT        = 70;   // 40-80 particles

    const particles = Array.from({ length: COUNT }, () => {
      const baseVx = (Math.random() - 0.5) * 0.4;
      const baseVy = -(Math.random() * 0.4 + 0.2); // Slower rise
      return {
        x:    Math.random() * W,
        y:    Math.random() * H,
        baseVx,
        baseVy,
        vx:   baseVx,
        vy:   baseVy,
        r:    Math.random() * 2.0 + 1.0, // 2-6px diameter => 1-3px radius
        alpha: Math.random() * 0.3 + 0.2, // 0.2-0.5 opacity
        life:  Math.random(),
        decay: Math.random() * 0.0015 + 0.0005,
        gold:  Math.random() > 0.3,
      };
    });

    const resetP = p => {
      p.baseVx = (Math.random() - 0.5) * 0.4;
      p.baseVy = -(Math.random() * 0.4 + 0.2);
      p.x = Math.random() * W; 
      p.y = H + 10;
      p.vx = p.baseVx;
      p.vy = p.baseVy;
      p.alpha = Math.random() * 0.3 + 0.2;
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
        p.life -= p.decay;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.life <= 0 || p.y < -10) resetP(p);

        // Mouse repulsion (circular, smooth velocity based)
        const dx = p.x - mouse.current.x;
        const dy = p.y - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < REPEL_RADIUS && dist > 0) {
          const force = (1 - dist / REPEL_RADIUS) * REPEL_FORCE;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        // Friction / return to original floating path smoothly
        p.vx += (p.baseVx - p.vx) * 0.04;
        p.vy += (p.baseVy - p.vy) * 0.04;
        
        p.x += p.vx; 
        p.y += p.vy;

        const a = p.alpha * Math.max(0, p.life);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.gold
          ? `rgba(212,175,55,${a.toFixed(3)})`
          : `rgba(255,240,180,${(a * 0.8).toFixed(3)})`;
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
