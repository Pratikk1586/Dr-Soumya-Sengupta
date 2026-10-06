import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface MedicalParticlesProps {
  count?: number;
  reducedMotion?: boolean;
}

/**
 * Deterministic pseudo-random number generator for purity in React renders.
 */
function pseudoRandom(seed: number): number {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

/**
 * MedicalParticles: Floating ambient glucose ions and insulin micro-vesicles.
 * Uses instanced buffer points for 60fps performance and low memory footprint.
 */
export const MedicalParticles: React.FC<MedicalParticlesProps> = ({
  count = 36,
  reducedMotion = false,
}) => {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate particle positions, speeds, and colors deterministically
  const { positions, colors, speeds } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    const spd = new Float32Array(count);

    const tealColor = new THREE.Color('#2ba3b6');
    const amberColor = new THREE.Color('#f59e0b');
    const cyanColor = new THREE.Color('#38bdf8');

    for (let i = 0; i < count; i++) {
      const r1 = pseudoRandom(i * 3);
      const r2 = pseudoRandom(i * 3 + 1);
      const r3 = pseudoRandom(i * 3 + 2);
      const r4 = pseudoRandom(i * 5 + 3);

      // Cylindrical/spherical dispersion around the central organ
      const radius = 2.2 + r1 * 2.2;
      const theta = r2 * Math.PI * 2;
      const y = (r3 - 0.5) * 3.5;

      pos[i * 3] = radius * Math.cos(theta);
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = radius * Math.sin(theta);

      // Color distribution: 50% teal, 30% cyan, 20% amber (glucose)
      const chosenColor = r4 < 0.5 ? tealColor : r4 < 0.8 ? cyanColor : amberColor;
      cols[i * 3] = chosenColor.r;
      cols[i * 3 + 1] = chosenColor.g;
      cols[i * 3 + 2] = chosenColor.b;

      spd[i] = 0.2 + r1 * 0.4;
    }

    return { positions: pos, colors: cols, speeds: spd };
  }, [count]);

  useFrame((_, delta) => {
    if (reducedMotion || !pointsRef.current) return;

    const positionAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const array = positionAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      // Gentle vertical drift
      array[i * 3 + 1] += speeds[i] * delta * 0.4;
      // Wrap around bounds
      if (array[i * 3 + 1] > 2.0) {
        array[i * 3 + 1] = -2.0;
      }
    }

    positionAttr.needsUpdate = true;
    pointsRef.current.rotation.y += delta * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};
