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

    const REPEL_RADIUS = 110;
    const REPEL_FORCE  = 3.5;
    const COUNT        = 90;

    const particles = Array.from({ length: COUNT }, () => ({
      x:    Math.random() * W,
      y:    Math.random() * H,
      vx:   (Math.random() - 0.5) * 0.35,
      vy:   -(Math.random() * 0.55 + 0.1),
      r:    Math.random() * 2.2 + 0.5,
      alpha: Math.random() * 0.35 + 0.1,
      life:  Math.random(),
      decay: Math.random() * 0.0018 + 0.0004,
      gold:  Math.random() > 0.45,
    }));

    const resetP = p => {
      p.x = Math.random() * W; p.y = H + 10;
      p.vx = (Math.random() - 0.5) * 0.35;
      p.vy = -(Math.random() * 0.55 + 0.1);
      p.alpha = Math.random() * 0.35 + 0.1;
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
        p.x += p.vx; p.y += p.vy; p.life -= p.decay;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.life <= 0 || p.y < -10) resetP(p);

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
        // Fail: slightly more amber/red tint
        ctx.fillStyle = p.gold
          ? `rgba(180,120,20,${a.toFixed(3)})`
          : `rgba(220,160,80,${(a * 0.6).toFixed(3)})`;
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

/* ── CSS Fire Torch (darker flames for fail) ───────────────────────── */
function Torch({ side }) {
  return (
    <div style={{ position: 'fixed', [side]: 32, top: '18%', zIndex: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <style>{`
        @keyframes flickerFail {
          0%   { transform: scaleX(1)    scaleY(1)    rotate(-2deg); }
          20%  { transform: scaleX(0.85) scaleY(1.08) rotate(3deg);  }
          40%  { transform: scaleX(1.12) scaleY(0.9)  rotate(-2deg); }
          60%  { transform: scaleX(0.9)  scaleY(1.1)  rotate(3.5deg); }
          80%  { transform: scaleX(1.08) scaleY(0.94) rotate(-2deg); }
          100% { transform: scaleX(1)    scaleY(1)    rotate(-2deg); }
        }
        @keyframes emberFail {
          0%   { transform: translateY(0) scale(1); opacity: 0.8; }
          100% { transform: translateY(-65px) scale(0); opacity: 0; }
        }
        @keyframes smokeFail {
          0%   { transform: translateY(0) scale(0.3); opacity: 0.3; }
          100% { transform: translateY(-85px) ${side === 'left' ? 'translateX(16px)' : 'translateX(-16px)'} scale(1.8); opacity: 0; }
        }
      `}</style>

      {[0, 1, 2].map(i => (
        <div key={`sf${i}`} style={{ position:'absolute', top:-28-i*14, left: side==='left' ? 1+i*3 : undefined, right: side==='right' ? 1+i*3 : undefined, width:8+i*4, height:8+i*4, borderRadius:'50%', background:'rgba(180,180,180,0.12)', animation:`smokeFail ${1.6+i*0.4}s ease-out ${i*0.3}s infinite`, filter:'blur(4px)' }} />
      ))}

      {[0,1,2,3].map(i => (
        <div key={`ef${i}`} style={{ position:'absolute', top:4+(i%2)*7, left:3+(i%3)*5, width:2.5, height:2.5, borderRadius:'50%', background: i%2===0?'#cc2200':'#ff6600', animation:`emberFail ${0.75+i*0.26}s ease-out ${i*0.19}s infinite`, filter:'blur(0.5px)' }} />
      ))}

      <div style={{ width:22, height:50, position:'relative', filter:'drop-shadow(0 0 18px #cc3000) drop-shadow(0 -6px 36px rgba(180,40,0,0.6))' }}>
        <div style={{ position:'absolute', bottom:0, left:0, width:22, height:50, background:'linear-gradient(to top, #7a0000, #cc2200, #ff5500, #ffaa00, rgba(255,180,0,0))', borderRadius:'50% 50% 20% 20%', animation:'flickerFail 0.42s ease-in-out infinite alternate', transformOrigin:'bottom center' }} />
        <div style={{ position:'absolute', bottom:0, left:5, width:12, height:34, background:'linear-gradient(to top, #990000, #dd3300, #ff7722, rgba(255,140,50,0))', borderRadius:'50% 50% 20% 20%', animation:'flickerFail 0.58s ease-in-out 0.09s infinite alternate', transformOrigin:'bottom center' }} />
        <div style={{ position:'absolute', bottom:0, left:8, width:6, height:22, background:'linear-gradient(to top, #aa1100, #ee5500, rgba(255,180,80,0))', borderRadius:'50% 50% 20% 20%', animation:'flickerFail 0.48s ease-in-out 0.16s infinite alternate', transformOrigin:'bottom center' }} />
      </div>

      <div style={{ width:26, height:10, background:'linear-gradient(to right, #1a0800, #4a2000, #6a3000, #4a2000, #1a0800)', borderRadius:'2px' }} />
      <div style={{ width:10, height:80, background:'linear-gradient(to right, #100500, #3a1800, #5a2a00, #3a1800, #100500)', borderRadius:3, boxShadow:'0 2px 8px rgba(0,0,0,0.8)' }} />
      <div style={{ width:20, height:6, background:'#100500', borderRadius:2, border:'1px solid #2a1000', marginTop:2 }} />
    </div>
  );
}

/* ── Cobra ─────────────────────────────────────────────────────────── */
function Cobra() {
  return (
    <div style={{ position:'fixed', left:24, bottom:36, zIndex:5, width:96, height:190 }}>
      <style>{`@keyframes snakeSway { 0%{transform:rotate(-3deg) translateY(0)} 25%{transform:rotate(3deg) translateY(-5px)} 50%{transform:rotate(-2deg) translateY(-2px)} 75%{transform:rotate(4deg) translateY(-6px)} 100%{transform:rotate(-3deg) translateY(0)} }`}</style>
      <svg viewBox="0 0 100 200" style={{ animation:'snakeSway 3.2s ease-in-out infinite', transformOrigin:'bottom center', filter:'drop-shadow(0 0 8px rgba(200,50,0,0.3))' }}>
        <path d="M50,200 Q28,165 38,125 Q18,82 52,62 Q72,44 62,22 Q57,6 67,0" stroke="#8B4513" strokeWidth="9" fill="none" strokeLinecap="round" />
        <path d="M50,200 Q28,165 38,125 Q18,82 52,62 Q72,44 62,22 Q57,6 67,0" stroke="#6B3010" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.6" />
        <ellipse cx="62" cy="20" rx="20" ry="14" fill="#5a2000" opacity="0.9" />
        <ellipse cx="62" cy="20" rx="16" ry="10" fill="#7a3500" opacity="0.7" />
        <ellipse cx="62" cy="20" rx="11" ry="7" fill="#a05010" opacity="0.5" />
        <circle cx="68" cy="16" r="3" fill="#C0392B" />
        <circle cx="69" cy="15.2" r="1.2" fill="#1a0800" />
        <circle cx="69.4" cy="14.8" r="0.5" fill="rgba(255,255,255,0.3)" />
        <path d="M70,24 L78,28 M70,24 L78,21" stroke="#8B0000" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function OilLamp({ side }) {
  return (
    <div style={{ position:'fixed', [side]:20, bottom:20, zIndex:5, opacity:0.75 }}>
      <div style={{ width:36, height:18, background:'linear-gradient(to right, #2a0f00, #6B3010, #2a0f00)', borderRadius:'50%', position:'relative' }}>
        <div style={{ position:'absolute', top:-12, left:'50%', transform:'translateX(-50%)', width:8, height:16, background:'linear-gradient(to top, #aa2200, #dd5500, transparent)', borderRadius:'50% 50% 20% 20%', filter:'blur(1.5px)' }} />
      </div>
    </div>
  );
}

function MiniScroll() {
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', marginTop:8 }}>
      <div style={{ width:180, height:12, borderRadius:6, background:'linear-gradient(to right, #2a0f00, #6B3010, #a05020, #6B3010, #2a0f00)', boxShadow:'0 2px 6px rgba(0,0,0,0.7)' }} />
      <div style={{ width:180, padding:'10px 16px', background:'linear-gradient(135deg, #b89060 0%, #c4a070 35%, #ae8850 60%, #a07848 100%)', border:'2px solid #6B4A10', boxShadow:'inset 0 0 20px rgba(0,0,0,0.4), 0 4px 20px rgba(0,0,0,0.8)', position:'relative' }}>
        <div style={{ fontFamily:'"Cinzel",serif', fontSize:7, letterSpacing:'0.2em', color:'#3a1800', textAlign:'center', marginBottom:4, fontWeight:700 }}>Scroll of Fallen</div>
        <div style={{ fontFamily:'serif', fontSize:5, color:'rgba(50,20,5,0.5)', textAlign:'center', lineHeight:1.6, marginBottom:6, fontStyle:'italic' }}>
          Herein are inscribed those who dared<br/>enter the ancient chambers but could<br/>not claim the secrets within.
        </div>
        <div style={{ display:'flex', justifyContent:'center', gap:16 }}>
          {[0,1].map(i => (
            <div key={i} style={{ width:18, height:18, borderRadius:'50%', background:`radial-gradient(circle at 35% 35%, ${i===0?'#8B0000':'#5a0000'}, ${i===0?'#5a0000':'#2d0000'})`, boxShadow:'0 2px 8px rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <line x1="5.5" y1="1" x2="5.5" y2="10" stroke="rgba(160,100,20,0.6)" strokeWidth="1.2" />
                <line x1="1" y1="5.5" x2="10" y2="5.5" stroke="rgba(160,100,20,0.6)" strokeWidth="1.2" />
                <circle cx="5.5" cy="5.5" r="2" fill="none" stroke="rgba(160,100,20,0.4)" strokeWidth="1" />
              </svg>
            </div>
          ))}
        </div>
      </div>
      <div style={{ width:180, height:12, borderRadius:6, background:'linear-gradient(to right, #2a0f00, #6B3010, #a05020, #6B3010, #2a0f00)', boxShadow:'0 -2px 6px rgba(0,0,0,0.7)' }} />
    </div>
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
  const scrollRef  = useRef(null);
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
      .to(scrollRef.current, { opacity: 1, y: 0, duration: 0.8 }, '+=0.2')
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
      <Torch side="left" />
      <Torch side="right" />
      <Cobra />
      <OilLamp side="right" />

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

        {/* Mini Scroll */}
        <div ref={scrollRef} style={{ marginTop:24, opacity:0, transform:'translateY(16px)' }}>
          <MiniScroll />
        </div>

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
