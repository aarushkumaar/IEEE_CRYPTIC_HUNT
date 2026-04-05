import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useRef } from 'react';

function ExplodingCards() {
  const groupRef = useRef();
  const timeRef = useRef(0);

  const cards = Array.from({ length: 16 }, (_, i) => ({
    velocity: new THREE.Vector3(
      (Math.random() - 0.5) * 0.05,
      (Math.random() - 0.5) * 0.05,
      (Math.random() - 0.5) * 0.02,
    ),
    rotSpeed: new THREE.Vector3(
      (Math.random() - 0.5) * 0.08,
      (Math.random() - 0.5) * 0.1,
      (Math.random() - 0.5) * 0.06,
    ),
    color: ['#7B6EF6', '#F04A57', '#F5C542', '#1BE0D4'][i % 4],
  }));

  useFrame((_, delta) => {
    timeRef.current += delta;
    if (!groupRef.current) return;
    groupRef.current.children.forEach((child, i) => {
      const c = cards[i];
      child.position.addScaledVector(c.velocity, timeRef.current * 1.5);
      child.rotation.x += c.rotSpeed.x;
      child.rotation.y += c.rotSpeed.y;
      child.rotation.z += c.rotSpeed.z;
    });
  });

  return (
    <group ref={groupRef}>
      {cards.map((card, i) => (
        <mesh key={i}>
          <boxGeometry args={[0.7, 1.0, 0.02]} />
          <meshStandardMaterial color={card.color} emissive={card.color} emissiveIntensity={0.3} />
        </mesh>
      ))}
    </group>
  );
}

function ShakingCamera() {
  const { camera } = useThree();
  const timeRef = useRef(0);
  useFrame((_, delta) => {
    timeRef.current += delta;
    camera.position.x = Math.sin(timeRef.current * 15) * 0.05;
    camera.position.y = Math.cos(timeRef.current * 13) * 0.03;
  });
  return null;
}

export default function Rumbling() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate('/wildcard'), 5500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: '#000' }}
    >
      {/* Three.js exploding cards */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <Canvas camera={{ position: [0, 0, 5], fov: 70 }}>
          <ambientLight intensity={0.2} />
          <pointLight position={[2, 2, 2]} intensity={2} color="#F04A57" />
          <pointLight position={[-2, -2, 2]} intensity={2} color="#7B6EF6" />
          <ExplodingCards />
          <ShakingCamera />
        </Canvas>
      </div>

      {/* Text sequence */}
      <div className="relative z-10 text-center" style={{ userSelect: 'none' }}>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="font-display font-extrabold text-white"
          style={{ fontSize: 'clamp(48px, 12vw, 96px)', letterSpacing: '-0.02em' }}
        >
          THE RUMBLING
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.5 }}
          className="font-display font-bold"
          style={{ fontSize: 'clamp(24px, 6vw, 48px)', color: '#F04A57', marginTop: 8 }}
        >
          BEGINS
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.8 }}
          className="font-body mt-4"
          style={{ color: '#9494B8', fontSize: 16 }}
        >
          The Wildcard Round awaits…
        </motion.p>
      </div>

      {/* White flash at end */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 0, 0, 1] }}
        transition={{ duration: 5.5, times: [0, 0.7, 0.8, 0.9, 1] }}
        style={{
          position: 'absolute', inset: 0,
          background: 'white',
          pointerEvents: 'none',
          zIndex: 50,
        }}
      />
    </div>
  );
}
