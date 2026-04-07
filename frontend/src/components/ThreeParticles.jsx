import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * ThreeParticles
 * ─────────────────────────────────────────────────────────────
 * Gold dust particle system rendered inside a react-three-fiber
 * Canvas. Accepts an optional `velocityRef` (a React ref holding
 * a numeric value 0–6) to accelerate particle drift on fast scroll.
 *
 * Mouse move → subtle cloud rotation (parallax feel).
 */
export default function ThreeParticles({ count = 400, velocityRef }) {
  const mesh = useRef(null);

  /* ── Generate random positions + individual drift speeds ── */
  const [positions, driftSpeeds] = useMemo(() => {
    const pos   = new Float32Array(count * 3);
    const drift = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 22;        // x spread
      pos[i * 3 + 1] = (Math.random() - 0.5) * 22;        // y spread
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;   // z (slightly back)
      drift[i] = 0.05 + Math.random() * 0.25;             // base per-particle speed
    }
    return [pos, drift];
  }, [count]);

  /* ── Mouse tracking ── */
  const pointer       = useRef({ x: 0, y: 0 });
  const targetPointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      targetPointer.current.x =  (e.clientX / window.innerWidth)  * 2 - 1;
      targetPointer.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  /* ── Per-frame animation ── */
  useFrame((_, delta) => {
    if (!mesh.current) return;

    /* Smooth mouse lerp → subtle cloud rotation (parallax) */
    pointer.current.x += (targetPointer.current.x - pointer.current.x) * 3 * delta;
    pointer.current.y += (targetPointer.current.y - pointer.current.y) * 3 * delta;

    mesh.current.rotation.y = pointer.current.x * 0.18;
    mesh.current.rotation.x = -pointer.current.y * 0.12;

    /* Scroll-velocity multiplier: 1× at rest, up to 5× on fast scroll */
    const vel     = velocityRef?.current ?? 0;
    const speedMul = 1 + vel * 0.7;          // 1× → ~5× at vel=6

    /* Drift each particle upward, wrap at top boundary */
    const posArr = mesh.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      const idx = i * 3 + 1;                  // y index
      posArr[idx] += delta * driftSpeeds[i] * speedMul;
      if (posArr[idx] > 11) posArr[idx] = -11;
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.055}
        color="#D4AF37"
        transparent
        opacity={0.55}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
