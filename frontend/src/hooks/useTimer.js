import { useState, useEffect, useRef } from 'react';

export function useTimer(startTime) {
  const [elapsed, setElapsed] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    if (!startTime) return;
    const start = new Date(startTime).getTime();
    
    // Set initial value immediately
    setElapsed(Math.floor((Date.now() - start) / 1000));

    ref.current = setInterval(() => {
      setElapsed(Math.floor((Date.now() - start) / 1000));
    }, 1000);

    return () => clearInterval(ref.current);
  }, [startTime]);

  const totalSeconds = Math.max(0, elapsed);
  const mm = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const ss = String(totalSeconds % 60).padStart(2, '0');

  return { formatted: `${mm}:${ss}`, seconds: totalSeconds };
}
