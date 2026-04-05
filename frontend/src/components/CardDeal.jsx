import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Text } from '@react-three/drei';
import * as THREE from 'three';

const CARDS = [
  { suit: '♠', label: 'Code & Logic',      color: '#7B6EF6', startPos: [-6, 0, 0], rotation: -0.15 },
  { suit: '♥', label: 'Lateral Thinking',  color: '#F04A57', startPos: [6, 0, 0],  rotation:  0.15 },
  { suit: '♦', label: 'Cryptography',      color: '#F5C542', startPos: [0, 5, 0],  rotation: -0.08 },
  { suit: '♣', label: 'Wildcard',          color: '#1BE0D4', startPos: [0, -5, 0], rotation:  0.08 },
];

function PlayingCard({ card, index, flipped, onAllLanded, globalProgress }) {
  const meshRef = useRef();
  const progressRef = useRef(0);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    progressRef.current = Math.min(progressRef.current + delta * 0.7, 1);
    const t = progressRef.current;
    const ease = 1 - Math.pow(1 - t, 3); // ease-out-cubic

    // Fly to center fan position
    const fanX = (index - 1.5) * 1.6;
    const fanY = -0.3;
    const fanRot = (index - 1.5) * 0.12;

    meshRef.current.position.x = THREE.MathUtils.lerp(card.startPos[0], fanX, ease);
    meshRef.current.position.y = THREE.MathUtils.lerp(card.startPos[1], fanY, ease);
    meshRef.current.position.z = index * 0.05;
    meshRef.current.rotation.z = THREE.MathUtils.lerp(card.rotation * 3, fanRot, ease);

    // Flip when fully landed
    if (flipped && t >= 1) {
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, Math.PI, delta * 4);
    }
  });

  return (
    <group ref={meshRef} position={card.startPos}>
      <RoundedBox args={[1.4, 2.0, 0.02]} radius={0.08} smoothness={4}>
        <meshStandardMaterial color="#111119" roughness={0.5} metalness={0.1} />
      </RoundedBox>
      {/* Card border (emissive color ring) */}
      <RoundedBox args={[1.44, 2.04, 0.015]} radius={0.09} smoothness={4} position={[0, 0, -0.005]}>
        <meshStandardMaterial color={card.color} emissive={card.color} emissiveIntensity={0.3} />
      </RoundedBox>
      {/* Suit symbol */}
      <Text
        position={[0, 0.2, 0.02]}
        fontSize={0.45}
        color={card.color}
        anchorX="center"
        anchorY="middle"
        font={undefined}
      >
        {card.suit}
      </Text>
      {/* Label */}
      <Text
        position={[0, -0.35, 0.02]}
        fontSize={0.13}
        color="#9494B8"
        anchorX="center"
        anchorY="middle"
      >
        {card.label}
      </Text>
    </group>
  );
}

function Scene({ flipped }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1.2} />
      <pointLight position={[-5, -5, 3]} intensity={0.4} color="#7B6EF6" />
      {CARDS.map((card, i) => (
        <PlayingCard key={i} card={card} index={i} flipped={flipped} />
      ))}
    </>
  );
}

export default function CardDeal({ onComplete }) {
  const [flipped, setFlipped] = useState(false);

  // Trigger flip after cards land
  setTimeout(() => setFlipped(true), 2000);
  setTimeout(() => onComplete?.(), 4000);

  return (
    <div style={{ width: '100%', height: '320px' }}>
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
        <Scene flipped={flipped} />
      </Canvas>
    </div>
  );
}
