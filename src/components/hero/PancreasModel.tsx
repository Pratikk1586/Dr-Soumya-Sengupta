import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { PANCREAS_MODEL_PATH } from '../../config/constants';

interface PancreasModelProps {
  pointer: { x: number; y: number };
  onHoverChange?: (hovered: boolean) => void;
  reducedMotion?: boolean;
}

/**
 * GLTF subcomponent loaded when the real GLB file is present.
 */
const GLTFPancreas: React.FC<{ url: string; isHovered: boolean }> = ({ url, isHovered }) => {
  const gltf = useGLTF(url);
  const clonedScene = useMemo(() => gltf.scene.clone(), [gltf.scene]);

  useEffect(() => {
    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          const mat = mesh.material as THREE.MeshStandardMaterial;
          mat.roughness = 0.35;
          mat.metalness = 0.1;
        }
      }
    });
  }, [clonedScene]);

  return (
    <primitive
      object={clonedScene}
      scale={isHovered ? 1.06 : 1.0}
      style={{ transition: 'scale 0.3s ease' }}
    />
  );
};

/**
 * ProceduralPancreas: Anatomically stylized procedural pancreas organ.
 * Features organic segmented lobes (Head, Neck, Body, Tail),
 * central duct, and luminous endocrine Islets of Langerhans.
 */
const ProceduralPancreas: React.FC<{
  isHovered: boolean;
  reducedMotion?: boolean;
}> = ({ isHovered, reducedMotion = false }) => {
  const organMatRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const ductMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const isletMatRef = useRef<THREE.MeshStandardMaterial>(null);

  // Anatomical curved pancreatic spine
  const ductCurve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.6, -0.3, 0),     // Head
      new THREE.Vector3(-0.8, -0.1, 0.1),   // Neck
      new THREE.Vector3(0.0, 0.1, 0.05),    // Body
      new THREE.Vector3(0.9, 0.25, -0.05),  // Body-Tail junction
      new THREE.Vector3(1.7, 0.45, -0.15),  // Tail
    ]);
  }, []);

  const ductGeometry = useMemo(() => {
    return new THREE.TubeGeometry(ductCurve, 48, 0.035, 12, false);
  }, [ductCurve]);

  // Islets of Langerhans node coordinates distributed along parenchyma
  const isletPositions: [number, number, number, number][] = useMemo(() => [
    [-1.4, -0.2, 0.2, 0.08],
    [-1.1, -0.35, 0.15, 0.07],
    [-0.6, 0.0, 0.22, 0.09],
    [-0.2, 0.18, 0.18, 0.1],
    [0.3, 0.12, 0.2, 0.09],
    [0.7, 0.28, 0.12, 0.08],
    [1.2, 0.38, 0.05, 0.07],
    [1.5, 0.45, -0.02, 0.06],
  ], []);

  useFrame(({ clock }) => {
    if (reducedMotion) return;
    const t = clock.getElapsedTime();

    // Soft metabolic breathing glow
    if (isletMatRef.current) {
      isletMatRef.current.emissiveIntensity =
        (isHovered ? 1.4 : 0.8) + Math.sin(t * 2.2) * 0.25;
    }

    if (organMatRef.current) {
      organMatRef.current.emissiveIntensity =
        isHovered ? 0.35 : 0.15 + Math.sin(t * 1.5) * 0.05;
    }
  });

  return (
    <group>
      {/* 1. Pancreas Parenchyma Lobes (Head, Body, Tail) */}
      <meshPhysicalMaterial
        ref={organMatRef}
        color="#15616f"
        emissive="#0d9488"
        emissiveIntensity={isHovered ? 0.35 : 0.15}
        roughness={0.35}
        metalness={0.05}
        clearcoat={0.3}
        clearcoatRoughness={0.2}
        transmission={0.12}
        thickness={0.8}
      />

      {/* Head of Pancreas (rounded, medial) */}
      <mesh position={[-1.3, -0.22, 0]} scale={[0.65, 0.75, 0.55]}>
        <sphereGeometry args={[1, 32, 32]} />
      </mesh>

      {/* Neck & Body (elongated transition) */}
      <mesh position={[-0.5, -0.05, 0.05]} scale={[0.8, 0.58, 0.48]}>
        <sphereGeometry args={[1, 32, 32]} />
      </mesh>
      <mesh position={[0.25, 0.14, 0.02]} scale={[0.85, 0.48, 0.42]}>
        <sphereGeometry args={[1, 32, 32]} />
      </mesh>

      {/* Tail of Pancreas (tapered lateral end) */}
      <mesh position={[1.05, 0.32, -0.05]} scale={[0.75, 0.38, 0.35]}>
        <sphereGeometry args={[1, 32, 32]} />
      </mesh>
      <mesh position={[1.65, 0.44, -0.12]} scale={[0.45, 0.25, 0.25]}>
        <sphereGeometry args={[1, 32, 32]} />
      </mesh>

      {/* 2. Main Pancreatic Duct */}
      <mesh geometry={ductGeometry}>
        <meshStandardMaterial
          ref={ductMatRef}
          color="#a7f3d0"
          emissive="#34d399"
          emissiveIntensity={0.6}
          roughness={0.2}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* 3. Luminous Endocrine Islets of Langerhans (Beta-Cell Clusters) */}
      <meshStandardMaterial
        ref={isletMatRef}
        color="#fef08a"
        emissive="#f59e0b"
        emissiveIntensity={0.9}
        roughness={0.2}
      />

      {isletPositions.map(([x, y, z, r], idx) => (
        <mesh key={idx} position={[x, y, z]}>
          <sphereGeometry args={[r, 16, 16]} />
        </mesh>
      ))}
    </group>
  );
};

/**
 * PancreasModel: Main model coordinator.
 * Probes for GLB asset; falls back cleanly to procedural composition.
 * Handles pointer-driven tilt, organ hover highlighting, and idle rotation.
 */
export const PancreasModel: React.FC<PancreasModelProps> = ({
  pointer,
  onHoverChange,
  reducedMotion = false,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [hasGlb, setHasGlb] = useState<boolean>(false);

  // Probe whether GLB asset is present at runtime
  useEffect(() => {
    let active = true;
    fetch(PANCREAS_MODEL_PATH, { method: 'HEAD' })
      .then((res) => {
        if (active) {
          const contentType = res.headers.get('content-type') || '';
          // Verify status is 200 and not an SPA HTML fallback
          if (res.ok && !contentType.includes('text/html')) {
            setHasGlb(true);
          } else {
            setHasGlb(false);
          }
        }
      })
      .catch(() => {
        if (active) setHasGlb(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const handlePointerOver = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setIsHovered(true);
    onHoverChange?.(true);
  };

  const handlePointerOut = () => {
    setIsHovered(false);
    onHoverChange?.(false);
  };

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    if (reducedMotion) {
      groupRef.current.rotation.set(0.1, 0.2, 0);
      return;
    }

    // Smooth pointer-driven tilt with damping
    const targetRotX = 0.1 - pointer.y * 0.35;
    const targetRotY = 0.15 + pointer.x * 0.45;

    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      targetRotX,
      4,
      delta
    );
    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      targetRotY + Math.sin(delta) * 0.05,
      4,
      delta
    );

    // Subtle breathing scale on hover
    const targetScale = isHovered ? 1.05 : 1.0;
    groupRef.current.scale.x = THREE.MathUtils.damp(
      groupRef.current.scale.x,
      targetScale,
      6,
      delta
    );
    groupRef.current.scale.y = THREE.MathUtils.damp(
      groupRef.current.scale.y,
      targetScale,
      6,
      delta
    );
    groupRef.current.scale.z = THREE.MathUtils.damp(
      groupRef.current.scale.z,
      targetScale,
      6,
      delta
    );
  });

  return (
    <group
      ref={groupRef}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      position={[0, 0, 0]}
    >
      {hasGlb ? (
        <GLTFPancreas url={PANCREAS_MODEL_PATH} isHovered={isHovered} />
      ) : (
        <ProceduralPancreas isHovered={isHovered} reducedMotion={reducedMotion} />
      )}
    </group>
  );
};
