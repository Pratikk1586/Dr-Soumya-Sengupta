import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FluidFlowProps {
  reducedMotion?: boolean;
}

/**
 * FluidFlow: Microcirculatory vascular perfusion and insulin secretory flow.
 * Rendered using a CatmullRomCurve3 tube with glowing additive material.
 */
export const FluidFlow: React.FC<FluidFlowProps> = ({ reducedMotion = false }) => {
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.8, -0.4, 0.1),
      new THREE.Vector3(-0.9, 0.15, 0.25),
      new THREE.Vector3(0.0, 0.05, 0.15),
      new THREE.Vector3(0.9, 0.2, -0.1),
      new THREE.Vector3(1.8, 0.45, -0.25),
    ]);
  }, []);

  const tubeGeometry = useMemo(() => {
    return new THREE.TubeGeometry(curve, 64, 0.025, 8, false);
  }, [curve]);

  useFrame(({ clock }) => {
    if (reducedMotion || !materialRef.current) return;
    const t = clock.getElapsedTime();
    // Gentle breathing pulse representing hormonal secretion
    materialRef.current.emissiveIntensity = 0.5 + Math.sin(t * 1.8) * 0.25;
  });

  return (
    <mesh geometry={tubeGeometry}>
      <meshStandardMaterial
        ref={materialRef}
        color="#2ba3b6"
        emissive="#38bdf8"
        emissiveIntensity={0.6}
        roughness={0.2}
        transparent
        opacity={0.85}
      />
    </mesh>
  );
};
