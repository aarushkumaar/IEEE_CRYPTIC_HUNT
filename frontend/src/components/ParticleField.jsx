import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const SUIT_CHARS = ['♠', '♥', '♦', '♣'];
const SUIT_COLORS_HEX = [
  new THREE.Color('#7B6EF6'),
  new THREE.Color('#F04A57'),
  new THREE.Color('#F5C542'),
  new THREE.Color('#1BE0D4'),
];

const PARTICLE_COUNT = 400;

function Particles() {
  const meshRef = useRef();
  const positionsRef = useRef(new Float32Array(PARTICLE_COUNT * 3));
  const velocitiesRef = useRef(new Float32Array(PARTICLE_COUNT * 3));
  const colorsRef = useRef(new Float32Array(PARTICLE_COUNT * 3));

  useEffect(() => {
    const positions  = positionsRef.current;
    const velocities = velocitiesRef.current;
    const colors     = colorsRef.current;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      positions[i3]     = (Math.random() - 0.5) * 20;
      positions[i3 + 1] = (Math.random() - 0.5) * 20;
      positions[i3 + 2] = (Math.random() - 0.5) * 5;

      velocities[i3]     = (Math.random() - 0.5) * 0.003;
      velocities[i3 + 1] = 0.005 + Math.random() * 0.015;
      velocities[i3 + 2] = 0;

      const color = SUIT_COLORS_HEX[i % 4];
      colors[i3]     = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }
  }, []);

  useFrame(() => {
    const positions  = positionsRef.current;
    const velocities = velocitiesRef.current;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      positions[i3]     += velocities[i3];
      positions[i3 + 1] += velocities[i3 + 1];

      // Wrap around when out of bounds
      if (positions[i3 + 1] > 10) {
        positions[i3 + 1] = -10;
        positions[i3]     = (Math.random() - 0.5) * 20;
      }
    }

    if (meshRef.current) {
      meshRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positionsRef.current}
          count={PARTICLE_COUNT}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={colorsRef.current}
          count={PARTICLE_COUNT}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}

export default function ParticleField({ className = '' }) {
  return (
    <div
      className={className}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        gl={{ antialias: false, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Particles />
      </Canvas>
    </div>
  );
}
