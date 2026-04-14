import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { useGame } from '../hooks/useGame';

/* ─────────────────────────────────────────────────────────────────────────
   FAIL SCREEN — matches reference image (darker/redder tone variant)
───────────────────────────────────────────────────────────────────────── */

function formatTime(seconds) {
  if (!seconds) return '—:——';
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

/* ── Mouse-repel dust canvas ────────────────────────────────────────── */
function DustCanvas() {
  const ref = useRef(null);
  const mouse = useRef({ x: -999, y: -999 });

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W = window.innerWidth, H = window.innerHeight;
    canvas.width = W; canvas.height = H;

    const REPEL_RADIUS = 130;
    const REPEL_FORCE  = 0.4;
    const COUNT        = 70;

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
        gold:  Math.random() > 0.45,
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

    const onMouseMove  = e => { mouse.current.x = e.clientX; mouse.current.y = e.clientY; };
    const onMouseLeave = ()  => { mouse.current.x = -999; mouse.current.y = -999; };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (const p of particles) {
        p.life -= p.decay;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.life <= 0 || p.y < -10) resetP(p);

        const dx = p.x - mouse.current.x;
        const dy = p.y - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < REPEL_RADIUS && dist > 0) {
          const force = (1 - dist / REPEL_RADIUS) * REPEL_FORCE;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        p.vx += (p.baseVx - p.vx) * 0.04;
        p.vy += (p.baseVy - p.vy) * 0.04;
        
        p.x += p.vx; 
        p.y += p.vy;

        const a = p.alpha * Math.max(0, p.life);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        // Fail: slightly more amber/red tint
        ctx.fillStyle = p.gold
          ? `rgba(180,120,20,${a.toFixed(3)})`
          : `rgba(220,160,80,${(a * 0.7).toFixed(3)})`;
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



export default function Fail() {
  const navigate = useNavigate();
  const { getResult } = useGame();
  const [result, setResult] = useState(null);

  const titleRef   = useRef(null);
  const para1Ref   = useRef(null);
  const para2Ref   = useRef(null);
  const para3Ref   = useRef(null);
  const para4Ref   = useRef(null);
  const para5Ref   = useRef(null);
  const para6Ref   = useRef(null);
  const scoreRef   = useRef(null);
  const bottomRef  = useRef(null);
  const btnRef     = useRef(null);

  useEffect(() => { getResult().then(setResult); }, []);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.to(titleRef.current,  { opacity: 1, y: 0, duration: 1.0 }, 0.3)
      .to(para1Ref.current,  { opacity: 1, y: 0, duration: 0.7 }, '+=0.25')
      .to(para2Ref.current,  { opacity: 1, y: 0, duration: 0.7 }, '+=0.32')
      .to(para3Ref.current,  { opacity: 1, y: 0, duration: 0.7 }, '+=0.32')
      .to(para4Ref.current,  { opacity: 1, y: 0, duration: 0.7 }, '+=0.32')
      .to(para5Ref.current,  { opacity: 1, y: 0, duration: 0.7 }, '+=0.32')
      .to(para6Ref.current,  { opacity: 1, y: 0, duration: 0.7 }, '+=0.32')
      .to(scoreRef.current,  { opacity: 1, y: 0, duration: 0.8 }, '+=0.3')
      .to(bottomRef.current, { opacity: 1, y: 0, duration: 0.9 }, '+=0.25')
      .to(btnRef.current,    { opacity: 1, y: 0, duration: 0.6 }, '+=0.2');
    return () => tl.kill();
  }, []);

  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden', background: '#080300' }}>
      <style>{`
        @keyframes redGlow {
          0%,100% { text-shadow: 0 0 18px rgba(180,30,0,0.6), 0 0 36px rgba(130,20,0,0.4), 0 2px 4px rgba(0,0,0,0.9); }
          50%     { text-shadow: 0 0 32px rgba(200,50,0,0.85), 0 0 65px rgba(150,30,0,0.55), 0 2px 4px rgba(0,0,0,0.9); }
        }
        @keyframes failPulse {
          0%,100% { text-shadow: 0 0 14px rgba(180,30,0,0.45); }
          50%     { text-shadow: 0 0 28px rgba(200,60,0,0.8), 0 0 54px rgba(150,30,0,0.45); }
        }
        @keyframes torchGlowRed { 0%,100%{opacity:.5} 50%{opacity:.8} }
      `}</style>

      {/* Tomb background — darker for fail */}
      <div style={{ position:'fixed', inset:0, zIndex:0, backgroundImage:'url(/assets/tomb_bg.png)', backgroundSize:'cover', backgroundPosition:'center', filter:'brightness(0.5) saturate(0.6) hue-rotate(-10deg)' }} />

      {/* Dark vignette */}
      <div style={{ position:'fixed', inset:0, zIndex:1, background:'radial-gradient(ellipse 70% 80% at 50% 50%, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.82) 100%)' }} />

      {/* Red-tinted ambient glow from torches */}
      <div style={{ position:'fixed', left:0, top:0, bottom:0, width:'18%', background:'linear-gradient(to right, rgba(140,30,0,0.22), transparent)', zIndex:1, pointerEvents:'none', animation:'torchGlowRed 1.6s ease-in-out infinite' }} />
      <div style={{ position:'fixed', right:0, top:0, bottom:0, width:'18%', background:'linear-gradient(to left, rgba(140,30,0,0.22), transparent)', zIndex:1, pointerEvents:'none', animation:'torchGlowRed 1.6s ease-in-out infinite', animationDelay:'0.6s' }} />

      <DustCanvas />


      {/* Main content */}
      <div style={{ position:'relative', zIndex:10, minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'60px clamp(120px, 18vw, 260px) 40px', textAlign:'center' }}>

        {/* Title */}
        <h1
          ref={titleRef}
          style={{
            fontFamily: '"Cinzel Decorative", serif',
            fontSize: 'clamp(26px, 5.5vw, 56px)',
            fontWeight: 900,
            color: '#C9832A',
            letterSpacing: '0.08em',
            margin: '0 0 36px',
            lineHeight: 1.1,
            animation: 'redGlow 3s ease-in-out infinite',
            opacity: 0,
            transform: 'translateY(-20px)',
          }}
        >
          THE TOMB HAS JUDGED.
        </h1>

        {/* Body text */}
        <div style={{ fontFamily:'"Cinzel",serif', fontSize:'clamp(12px,1.6vw,16px)', color:'rgba(240,210,160,0.88)', lineHeight:1.9, maxWidth:680, width:'100%' }}>
          <p ref={para1Ref} style={{ margin:'0 0 16px', fontStyle:'italic', opacity:0, transform:'translateY(16px)' }}>
            You have stepped into the depths — through shadows of logic,
            fragments of cipher, and paths that twist beyond reason.
          </p>
          <p ref={para2Ref} style={{ margin:'0 0 16px', fontStyle:'italic', opacity:0, transform:'translateY(16px)' }}>
            But not all who enter are meant to emerge victorious.
          </p>
          <p ref={para3Ref} style={{ margin:'0 0 16px', fontStyle:'italic', opacity:0, transform:'translateY(16px)' }}>
            The ancient ones have watched in silence. They have weighed your mind
            against the eternal scale… and this time, the balance faltered.
          </p>
          <p ref={para4Ref} style={{ margin:'0 0 16px', fontStyle:'italic', opacity:0, transform:'translateY(16px)' }}>
            Your journey ends here — not in glory, but in echo.
          </p>
          <p ref={para5Ref} style={{ margin:'0 0 16px', fontStyle:'italic', opacity:0, transform:'translateY(16px)' }}>
            The walls remember your attempt. The silence records your fall.
          </p>
          <p ref={para6Ref} style={{ margin:0, fontWeight:600, fontSize:'clamp(12px,1.4vw,15px)', color:'rgba(230,190,130,0.82)', opacity:0, transform:'translateY(16px)' }}>
            The tomb remains unconquered. The hunt continues… without you.
          </p>
        </div>

        {/* Score boxes */}
        <div ref={scoreRef} style={{ display:'flex', gap:12, marginTop:36, width:'100%', maxWidth:560, opacity:0, transform:'translateY(16px)' }}>
          <div style={{ flex:1, background:'rgba(6,2,0,0.82)', border:'2px solid #8B5010', borderRadius:4, padding:'16px 24px', boxShadow:'0 0 24px rgba(0,0,0,0.9), inset 0 0 20px rgba(0,0,0,0.6)', position:'relative' }}>
            {[{top:4,left:4},{top:4,right:4},{bottom:4,left:4},{bottom:4,right:4}].map((c,i)=>(
              <div key={i} style={{ position:'absolute', width:10, height:10, ...c, borderTop:i<2?'1.5px solid #8B5010':undefined, borderBottom:i>=2?'1.5px solid #8B5010':undefined, borderLeft:i%2===0?'1.5px solid #8B5010':undefined, borderRight:i%2===1?'1.5px solid #8B5010':undefined }} />
            ))}
            <div style={{ position:'absolute', right:-12, top:'50%', transform:'translateY(-50%)', color:'#8B5010', fontSize:18, fontWeight:700 }}>›</div>
            <div style={{ fontFamily:'"Cinzel",serif', fontSize:9, letterSpacing:'0.22em', color:'#B8700B', marginBottom:8, fontWeight:700 }}>YOUR FINAL SCORE</div>
            <div style={{ fontFamily:'"Cinzel Decorative",serif', fontSize:'clamp(26px,4vw,42px)', fontWeight:700, color:'#D4850A', textShadow:'0 0 16px rgba(180,100,10,0.5)' }}>
              {result ? `${result.score} / 13` : '— / 13'}
            </div>
          </div>
          <div style={{ flex:1, background:'rgba(6,2,0,0.82)', border:'2px solid #8B5010', borderRadius:4, padding:'16px 24px', boxShadow:'0 0 24px rgba(0,0,0,0.9), inset 0 0 20px rgba(0,0,0,0.6)' }}>
            <div style={{ fontFamily:'"Cinzel",serif', fontSize:9, letterSpacing:'0.22em', color:'#B8700B', marginBottom:8, fontWeight:700 }}>TOTAL TIME TAKEN</div>
            <div style={{ fontFamily:'"Cinzel Decorative",serif', fontSize:'clamp(26px,4vw,42px)', fontWeight:700, color:'#D4850A', textShadow:'0 0 16px rgba(180,100,10,0.5)' }}>
              {result ? formatTime(result.timeSeconds) : '—:——'}
            </div>
          </div>
        </div>

        {/* Bottom declaration */}
        <p
          ref={bottomRef}
          style={{ fontFamily:'"Cinzel Decorative",serif', fontSize:'clamp(14px,2.3vw,24px)', fontWeight:700, letterSpacing:'0.14em', color:'#C9832A', margin:'32px 0 0', animation:'failPulse 3s ease-in-out infinite', opacity:0, transform:'translateY(16px)' }}
        >
          THE TOMB REMAINS UNCONQUERED.
        </p>



        {/* Return button */}
        <div ref={btnRef} style={{ marginTop:24, opacity:0, transform:'translateY(16px)' }}>
          <button
            onClick={() => navigate('/')}
            style={{ background:'transparent', border:'2px solid rgba(139,80,16,0.7)', color:'#B8700B', padding:'12px 40px', fontFamily:'"Cinzel",serif', fontWeight:700, fontSize:12, letterSpacing:'0.22em', cursor:'pointer', borderRadius:2, transition:'all 0.3s', textTransform:'uppercase' }}
            onMouseEnter={e => { e.currentTarget.style.background='rgba(139,80,16,0.18)'; e.currentTarget.style.borderColor='#D4850A'; e.currentTarget.style.color='#D4850A'; e.currentTarget.style.boxShadow='0 0 24px rgba(180,80,0,0.3)'; }}
            onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.borderColor='rgba(139,80,16,0.7)'; e.currentTarget.style.color='#B8700B'; e.currentTarget.style.boxShadow='none'; }}
          >
            Return to the Surface
          </button>
        </div>

      </div>
    </div>
  );
}
