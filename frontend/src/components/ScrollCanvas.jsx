import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas } from '@react-three/fiber';
import ThreeParticles from './ThreeParticles';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollCanvas({ frames, children }) {
  const containerRef     = useRef(null);
  const canvasRef        = useRef(null);
  const canvasWrapRef    = useRef(null);   // wrapper for scale tween
  const blackOverlayRef  = useRef(null);   // for entry / exit fade
  const imagesRef        = useRef([]);
  const playhead         = useRef({ frame: 0 });
  const velocityRef      = useRef(0);      // shared scroll velocity → particles
  const lastFrameRef     = useRef(-1);     // avoid redundant drawImage calls

  const [loadedFrames, setLoadedFrames] = useState(0);
  const [isReady,      setIsReady]      = useState(false);

  /* ── 1. Preload all frames (bulletproof: onload set BEFORE src) ───── */
  useEffect(() => {
    if (!frames || frames.length === 0) return;

    const load = () => {
      const promises = frames.map(src => {
        return new Promise(resolve => {
          const img = new Image();

          const finish = () => {
            setLoadedFrames(prev => prev + 1);
            resolve(img);
          };

          // Attach handlers BEFORE setting src to avoid cache-race condition
          img.onload  = finish;
          img.onerror = finish;   // resolve anyway — bad frames show blank
          img.src     = src;

          // If browser already has it cached (complete + naturalWidth set), resolve now
          if (img.complete && img.naturalWidth > 0) {
            img.onload  = null;
            img.onerror = null;
            finish();
          }
        });
      });

      Promise.all(promises).then(imgs => {
        imagesRef.current = imgs;
        setIsReady(true);
      });
    };

    load();
  }, [frames]);

  /* ── 2. Canvas draw + GSAP ScrollTrigger + velocity effects ──────── */
  useEffect(() => {
    if (!isReady) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    /* Cover-scale draw ─────────────────────────────────────────────── */
    const render = () => {
      const index = Math.min(frames.length - 1, Math.floor(playhead.current.frame));
      if (index === lastFrameRef.current) return;     // skip if same frame
      lastFrameRef.current = index;

      const img = imagesRef.current[index];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const x = (cw - img.naturalWidth * scale) / 2;
      const y = (ch - img.naturalHeight * scale) / 2;

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, x, y, img.naturalWidth * scale, img.naturalHeight * scale);
    };

    /* Handle resize ────────────────────────────────────────────────── */
    const handleResize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      lastFrameRef.current = -1; // force redraw on resize
      render();
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    /* Velocity scale refs ──────────────────────────────────────────── */
    const scaleTarget = { value: 1 };
    let velocityScaleTween = null;

    /* Build ScrollTrigger ──────────────────────────────────────────── */
    const matchMedia = gsap.matchMedia();

    matchMedia.add('(min-width: 1px)', () => {
      const frameTween = gsap.to(playhead.current, {
        frame: frames.length - 1,
        snap:  'frame',
        ease:  'none',
        scrollTrigger: {
          trigger:   containerRef.current,
          start:     'top top',
          end:       '+=5000',
          scrub:     0.5,
          pin:       true,

          /* ── Entry: fade from black ── */
          onEnter: () => {
            gsap.to(blackOverlayRef.current, {
              opacity: 0,
              duration: 0.5,
              ease: 'power2.out',
            });
          },

          /* ── Re-entry from scrolling back up ── */
          onEnterBack: () => {
            gsap.to(blackOverlayRef.current, {
              opacity: 0,
              duration: 0.4,
              ease: 'power2.out',
            });
          },

          /* ── Exit (scroll past end): fade to black ── */
          onLeave: () => {
            gsap.to(blackOverlayRef.current, {
              opacity: 1,
              duration: 0.45,
              ease: 'power2.inOut',
            });
          },

          /* ── Leave back (scroll above section): fade to black ── */
          onLeaveBack: () => {
            gsap.to(blackOverlayRef.current, {
              opacity: 1,
              duration: 0.35,
              ease: 'power2.in',
            });
          },

          /* ── Per-frame update: render + velocity effects ── */
          onUpdate: (self) => {
            render();

            // Track scroll velocity for particles
            const vel = Math.abs(self.getVelocity());
            velocityRef.current = Math.min(vel / 1000, 6); // normalize 0–6

            // Scale canvas wrapper slightly on fast scroll
            const targetScale = 1 + Math.min(vel / 120000, 0.022);
            if (velocityScaleTween) velocityScaleTween.kill();
            velocityScaleTween = gsap.to(canvasWrapRef.current, {
              scale:    targetScale,
              duration: 0.25,
              ease:     'power2.out',
              onComplete: () => {
                gsap.to(canvasWrapRef.current, {
                  scale:    1,
                  duration: 0.5,
                  ease:     'power2.inOut',
                });
              },
            });
          },
        },
      });

      return () => {
        frameTween.kill();
      };
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach(t => t.kill());
      matchMedia.revert();
    };
  }, [isReady, frames]);

  /* ── Computed progress for preloader bar ─────────────────────────── */
  const progress = frames?.length > 0 ? (loadedFrames / frames.length) * 100 : 0;

  return (
    <div
      ref={containerRef}
      style={{
        width: '100vw', height: '100vh',
        position: 'relative', overflow: 'hidden',
        background: '#000',
      }}
    >
      {/* ── PRELOADER ─────────────────────────────────────────────── */}
      {!isReady && frames?.length > 0 && (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          background: '#050300',
          zIndex: 100,
        }}>
          {/* Eye glyph */}
          <div style={{
            fontSize: 52,
            marginBottom: 24,
            filter: 'drop-shadow(0 0 16px rgba(212,175,55,0.5))',
            animation: 'goldPulse 2s ease-in-out infinite',
          }}>
            𓂀
          </div>

          {/* Entering the Tomb text */}
          <p style={{
            fontFamily: '"Cinzel", serif',
            fontSize: 11,
            letterSpacing: '0.35em',
            color: '#D4AF37',
            marginBottom: 28,
            textTransform: 'uppercase',
            opacity: 0.9,
          }}>
            Entering the Tomb...
          </p>

          {/* Progress track */}
          <div style={{
            width: 260, height: 2,
            background: 'rgba(212,175,55,0.12)',
            borderRadius: 1,
            overflow: 'hidden',
          }}>
            <div style={{
              width: `${progress}%`,
              height: '100%',
              background: 'linear-gradient(to right, #8B6914, #D4AF37, #F0D97B)',
              borderRadius: 1,
              transition: 'width 0.15s linear',
              boxShadow: '0 0 8px rgba(212,175,55,0.6)',
            }} />
          </div>

          {/* Percent label */}
          <p style={{
            marginTop: 14,
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: 10,
            letterSpacing: '0.15em',
            color: 'rgba(212,175,55,0.45)',
          }}>
            {Math.round(progress)}%
          </p>
        </div>
      )}

      {/* ── CANVAS WRAPPER (scaled on fast scroll) ─────────────────── */}
      <div
        ref={canvasWrapRef}
        style={{
          position: 'absolute', inset: 0,
          transformOrigin: 'center center',
          willChange: 'transform',
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute', top: 0, left: 0,
            width: '100%', height: '100%',
            display: 'block',
            opacity: isReady ? 1 : 0,
            transition: 'opacity 0.7s ease',
          }}
        />
      </div>

      {/* ── THREE.JS PARTICLE DUST LAYER ──────────────────────────── */}
      <div style={{
        position: 'absolute', inset: 0,
        pointerEvents: 'none', zIndex: 1,
        opacity: isReady ? 1 : 0,
        transition: 'opacity 1.2s ease 0.4s',
      }}>
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <ThreeParticles count={400} velocityRef={velocityRef} />
        </Canvas>
      </div>

      {/* ── VIGNETTE ──────────────────────────────────────────────── */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.82) 100%)',
        pointerEvents: 'none',
        zIndex: 2,
      }} />

      {/* ── BLACK OVERLAY — for entry/exit fade ───────────────────── */}
      <div
        ref={blackOverlayRef}
        style={{
          position: 'absolute', inset: 0,
          background: '#000',
          opacity: 1,           // starts opaque, fades out on enter
          pointerEvents: 'none',
          zIndex: 3,
        }}
      />

      {/* ── CONTENT OVERLAY (title, children) ─────────────────────── */}
      <div style={{
        position: 'absolute', inset: 0,
        zIndex: 4, pointerEvents: 'none',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
      }}>
        {children}
      </div>
    </div>
  );
}
