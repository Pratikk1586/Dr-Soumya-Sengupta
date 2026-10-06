import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface RippleEffectProps {
  reducedMotion?: boolean;
}

/**
 * RippleEffect: Concentric metabolic waves illustrating glycemic homeostasis.
 */
export const RippleEffect: React.FC<RippleEffectProps> = ({ reducedMotion = false }) => {
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (reducedMotion) return;
    const t = clock.getElapsedTime();

    if (ring1Ref.current) {
      const scale1 = 1 + ((t * 0.4) % 1) * 0.6;
      ring1Ref.current.scale.set(scale1, scale1, scale1);
      const mat = ring1Ref.current.material as THREE.MeshBasicMaterial;
      mat.opacity = Math.max(0, 0.4 - ((t * 0.4) % 1) * 0.4);
    }

    if (ring2Ref.current) {
      const scale2 = 1 + (((t * 0.4) + 0.5) % 1) * 0.6;
      ring2Ref.current.scale.set(scale2, scale2, scale2);
      const mat = ring2Ref.current.material as THREE.MeshBasicMaterial;
      mat.opacity = Math.max(0, 0.35 - (((t * 0.4) + 0.5) % 1) * 0.35);
    }
  });

  return (
    <group position={[0, -0.6, 0]} rotation={[-Math.PI / 2.2, 0, 0]}>
      <mesh ref={ring1Ref}>
        <ringGeometry args={[1.5, 1.54, 48]} />
        <meshBasicMaterial
          color="#2ba3b6"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
      <mesh ref={ring2Ref}>
        <ringGeometry args={[1.7, 1.74, 48]} />
        <meshBasicMaterial
          color="#f59e0b"
          transparent
          opacity={0.25}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};
