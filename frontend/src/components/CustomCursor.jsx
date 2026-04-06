import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const [trails, setTrails] = useState([]);
  const pos = useRef({ x: 0, y: 0 });
  const outerPos = useRef({ x: 0, y: 0 });
  const trailTimer = useRef(null);
  const rafId = useRef(null);

  useEffect(() => {
    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (innerRef.current) {
        innerRef.current.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`;
      }
    };

    // Trail spawner at 40ms intervals
    trailTimer.current = setInterval(() => {
      setTrails(prev => [
        ...prev.slice(-14),
        { id: Date.now(), x: pos.current.x, y: pos.current.y }
      ]);
    }, 40);

    window.addEventListener('mousemove', move, { passive: true });

    // Lerp outer ring using rAF
    const animate = () => {
      outerPos.current.x += (pos.current.x - outerPos.current.x) * 0.12;
      outerPos.current.y += (pos.current.y - outerPos.current.y) * 0.12;
      if (outerRef.current) {
        outerRef.current.style.transform = `translate(${outerPos.current.x - 16}px, ${outerPos.current.y - 16}px)`;
      }
      rafId.current = requestAnimationFrame(animate);
    };
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', move);
      clearInterval(trailTimer.current);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  // Auto-remove old trail particles
  useEffect(() => {
    const cleanup = setInterval(() => {
      setTrails(prev => prev.slice(-14));
    }, 600);
    return () => clearInterval(cleanup);
  }, []);

  return (
    <>
      {/* Outer lagging ring */}
      <div
        ref={outerRef}
        style={{
          position: 'fixed',
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: '2px solid #C9A84C',
          pointerEvents: 'none',
          zIndex: 99999,
          top: 0,
          left: 0,
          mixBlendMode: 'difference',
          willChange: 'transform',
        }}
      />
      {/* Inner instant dot */}
      <div
        ref={innerRef}
        style={{
          position: 'fixed',
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: '#C9A84C',
          pointerEvents: 'none',
          zIndex: 99999,
          top: 0,
          left: 0,
          willChange: 'transform',
        }}
      />
      {/* Golden trailing particles */}
      {trails.map((t, i) => {
        const ratio = (i + 1) / trails.length;
        return (
          <div
            key={t.id}
            style={{
              position: 'fixed',
              left: t.x - 3,
              top: t.y - 3,
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#C9A84C',
              pointerEvents: 'none',
              zIndex: 99998,
              opacity: ratio * 0.45,
              transform: `scale(${ratio * 0.8})`,
              transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
            }}
          />
        );
      })}
    </>
  );
}
