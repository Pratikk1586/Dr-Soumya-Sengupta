import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { PancreasModel } from './PancreasModel';
import { MedicalParticles } from './MedicalParticles';
import { FluidFlow } from './FluidFlow';
import { RippleEffect } from './RippleEffect';
import { MedicalBadge } from './MedicalBadge';

interface PancreasSceneProps {
  pointer: { x: number; y: number };
  particleCount?: number;
  reducedMotion?: boolean;
}

export const PancreasScene: React.FC<PancreasSceneProps> = ({
  pointer,
  particleCount = 36,
  reducedMotion = false,
}) => {
  const [isOrganHovered, setIsOrganHovered] = useState(false);
  const cameraGroupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (reducedMotion || !cameraGroupRef.current) return;
    const t = clock.getElapsedTime();
    // Subtle organic camera drift
    cameraGroupRef.current.position.y = Math.sin(t * 0.4) * 0.08;
    cameraGroupRef.current.position.x = Math.cos(t * 0.3) * 0.05;
  });

  return (
    <group ref={cameraGroupRef}>
      {/* Scientific Studio Lighting */}
      <ambientLight intensity={0.7} color="#dff0f4" />
      
      {/* Primary Key Light: Clinical Teal */}
      <directionalLight
        position={[4, 5, 5]}
        intensity={1.2}
        color="#ffffff"
      />

      {/* Secondary Fill Light: Soft Cyan */}
      <directionalLight
        position={[-4, 2, 3]}
        intensity={0.6}
        color="#2ba3b6"
      />

      {/* Warm Rim / Counter Light: Amber Glucose Glow */}
      <directionalLight
        position={[0, -3, -4]}
        intensity={0.5}
        color="#f59e0b"
      />

      {/* Homeostasis Ripple Waves */}
      <RippleEffect reducedMotion={reducedMotion} />

      {/* Hormonal Perfusion Stream */}
      <FluidFlow reducedMotion={reducedMotion} />

      {/* 3D Pancreas Anatomy */}
      <PancreasModel
        pointer={pointer}
        onHoverChange={setIsOrganHovered}
        reducedMotion={reducedMotion}
      />

      {/* Floating Ambient Glucose & Insulin Particles */}
      <MedicalParticles
        count={particleCount}
        reducedMotion={reducedMotion}
      />

      {/* Endocrine Islet Annotation Badge */}
      <MedicalBadge
        position={[1.1, 0.75, 0.2]}
        isHovered={isOrganHovered}
      />
    </group>
  );
};
