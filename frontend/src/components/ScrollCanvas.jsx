import { useEffect, useRef } from 'react';

export default function ScrollCanvas({ frames, startScroll, endScroll, overlayText }) {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const targetFrameRef = useRef(0);
  const currentFrameRef = useRef(0);
  const rafRef = useRef(null);
  const loadedRef = useRef(false);

  useEffect(() => {
    if (!frames || frames.length === 0) return;

    // Preload first 10 frames immediately
    const preloadBatch = (startIdx, endIdx) => {
      for (let i = startIdx; i < Math.min(endIdx, frames.length); i++) {
        if (!imagesRef.current[i]) {
          const img = new Image();
          img.src = frames[i];
          imagesRef.current[i] = img;
        }
      }
    };

    // Load first 10 immediately
    preloadBatch(0, 10);

    // Lazy load rest after page load
    const lazyLoad = () => {
      preloadBatch(10, frames.length);
      loadedRef.current = true;
    };

    if (document.readyState === 'complete') {
      setTimeout(lazyLoad, 500);
    } else {
      window.addEventListener('load', lazyLoad, { once: true });
    }

    const drawFrame = (index) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const img = imagesRef.current[index];
      if (!ctx || !img || !img.complete || img.naturalWidth === 0) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const x = (cw - img.naturalWidth * scale) / 2;
      const y = (ch - img.naturalHeight * scale) / 2;

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, x, y, img.naturalWidth * scale, img.naturalHeight * scale);
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const progress = Math.max(0, Math.min(1,
        (scrollY - startScroll) / (endScroll - startScroll)
      ));
      targetFrameRef.current = Math.floor(progress * (frames.length - 1));
    };

    const renderLoop = () => {
      if (currentFrameRef.current !== targetFrameRef.current) {
        currentFrameRef.current = targetFrameRef.current;
        drawFrame(currentFrameRef.current);
      }
      rafRef.current = requestAnimationFrame(renderLoop);
    };

    // Resize handler (debounced)
    let resizeTimer = null;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const canvas = canvasRef.current;
        if (canvas) {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
          drawFrame(currentFrameRef.current);
        }
      }, 200);
    };

    // Set initial canvas size
    if (canvasRef.current) {
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
    }

    handleScroll();
    rafRef.current = requestAnimationFrame(renderLoop);

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(rafRef.current);
      clearTimeout(resizeTimer);
    };
  }, [frames, startScroll, endScroll]);

  return (
    <div style={{ position: 'sticky', top: 0, width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {/* Fallback Egyptian background when no frames loaded */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center bottom, #1A0E00 0%, #0A0600 40%, #000000 100%)',
      }} />

      {/* Sand particles / atmosphere */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          radial-gradient(ellipse 80% 40% at 50% 100%, rgba(201,168,76,0.08) 0%, transparent 70%),
          radial-gradient(ellipse 60% 30% at 50% 80%, rgba(139,105,20,0.06) 0%, transparent 60%)
        `,
        pointerEvents: 'none',
      }} />

      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute', top: 0, left: 0,
          width: '100%', height: '100%',
          display: 'block',
        }}
      />

      {/* Dark vignette overlay for cinematic feel */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)',
        pointerEvents: 'none',
      }} />
    </div>
  );
}
