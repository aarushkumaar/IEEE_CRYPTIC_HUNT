import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Text } from '@react-three/drei';
import * as THREE from 'three';

const CARDS = [
  { suit: '♠', glyph: '𓅓', label: 'CODE & LOGIC',     color: '#C9A84C', startPos: [-6, 0, 0], rotation: -0.15 },
  { suit: '♥', glyph: '𓃒', label: 'LATERAL THINKING', color: '#E8D5A0', startPos: [6, 0, 0],  rotation:  0.15 },
  { suit: '♦', glyph: '𓆙', label: 'CRYPTOGRAPHY',     color: '#D4AF5A', startPos: [0, 5, 0],  rotation: -0.08 },
  { suit: '♣', glyph: '𓋹', label: 'WILDCARD',         color: '#B8963E', startPos: [0, -5, 0], rotation:  0.08 },
];

function PlayingCard({ card, index, flipped }) {
  const meshRef = useRef();
  const progressRef = useRef(0);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    progressRef.current = Math.min(progressRef.current + delta * 0.7, 1);
    const t = progressRef.current;
    const ease = 1 - Math.pow(1 - t, 3);

    const fanX = (index - 1.5) * 1.65;
    const fanY = -0.3;
    const fanRot = (index - 1.5) * 0.12;

    meshRef.current.position.x = THREE.MathUtils.lerp(card.startPos[0], fanX, ease);
    meshRef.current.position.y = THREE.MathUtils.lerp(card.startPos[1], fanY, ease);
    meshRef.current.position.z = index * 0.05;
    meshRef.current.rotation.z = THREE.MathUtils.lerp(card.rotation * 3, fanRot, ease);

    if (flipped && t >= 1) {
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y, Math.PI, delta * 4
      );
    }
  });

  return (
    <group ref={meshRef} position={card.startPos}>
      {/* Card body — dark parchment */}
      <RoundedBox args={[1.4, 2.0, 0.02]} radius={0.06} smoothness={4}>
        <meshStandardMaterial color="#0D0B05" roughness={0.7} metalness={0.15} />
      </RoundedBox>
      {/* Gold border ring */}
      <RoundedBox args={[1.44, 2.04, 0.015]} radius={0.07} smoothness={4} position={[0, 0, -0.005]}>
        <meshStandardMaterial
          color={card.color}
          emissive={card.color}
          emissiveIntensity={0.35}
          roughness={0.3}
          metalness={0.6}
        />
      </RoundedBox>
      {/* Suit symbol */}
      <Text
        position={[0, 0.25, 0.02]}
        fontSize={0.42}
        color={card.color}
        anchorX="center"
        anchorY="middle"
      >
        {card.suit}
      </Text>
      {/* Label */}
      <Text
        position={[0, -0.38, 0.02]}
        fontSize={0.11}
        color={`${card.color}88`}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.08}
      >
        {card.label}
      </Text>
    </group>
  );
}

function Scene({ flipped }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[4, 6, 5]} intensity={1.4} color="#E8D5A0" />
      <pointLight position={[-4, -4, 3]} intensity={0.5} color="#C9A84C" />
      <pointLight position={[0, 0, 8]} intensity={0.3} color="#ffffff" />
      {CARDS.map((card, i) => (
        <PlayingCard key={i} card={card} index={i} flipped={flipped} />
      ))}
    </>
  );
}

export default function CardDeal({ onComplete }) {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFlipped(true), 2000);
    const t2 = setTimeout(() => onComplete?.(), 4000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onComplete]);

  return (
    <div style={{ width: '100%', height: '300px' }}>
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
        <Scene flipped={flipped} />
      </Canvas>
    </div>
  );
}
