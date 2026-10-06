import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { PancreasScene } from './PancreasScene';
import { HeroStaticVisual } from './HeroStaticVisual';
import { HeroErrorBoundary } from './HeroErrorBoundary';
import { detectDeviceTier, type DeviceTier } from './WebGLSupportDetector';

interface PancreasHero3DProps {
  className?: string;
}

export const PancreasHero3D: React.FC<PancreasHero3DProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [deviceTier] = useState<DeviceTier>(() => detectDeviceTier());
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);
  const [isTabActive, setIsTabActive] = useState(true);
  const [contextLost, setContextLost] = useState(false);

  // IntersectionObserver to pause rendering when hero is off-screen
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) {
          setIsVisible(entry.isIntersecting);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Listen to tab visibility to pause render loop when tab is hidden
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabActive(document.visibilityState === 'visible');
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Pointer move handler (normalized -1 to +1)
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    setPointer({ x, y });
  }, []);

  const handlePointerLeave = useCallback(() => {
    setPointer({ x: 0, y: 0 });
  }, []);

  // WebGL context lost handler
  const handleCreated = useCallback((state: { gl: { domElement: HTMLCanvasElement } }) => {
    const canvas = state.gl.domElement;
    const onContextLost = (event: Event) => {
      event.preventDefault();
      setContextLost(true);
    };
    const onContextRestored = () => {
      setContextLost(false);
    };

    canvas.addEventListener('webglcontextlost', onContextLost, false);
    canvas.addEventListener('webglcontextrestored', onContextRestored, false);
  }, []);

  // Fallback to static visual if WebGL is unavailable, context lost, or SSR
  if (!deviceTier || !deviceTier.hasWebGL || contextLost) {
    return <HeroStaticVisual isFallback={Boolean(contextLost)} className={className} />;
  }

  // Active frameloop state: only animate when in viewport and tab is active
  const shouldAnimate = isVisible && isTabActive;

  return (
    <HeroErrorBoundary fallback={<HeroStaticVisual isFallback={true} className={className} />}>
      <div
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className={`relative w-full aspect-square max-w-[480px] lg:max-w-[540px] mx-auto rounded-3xl bg-gradient-to-br from-[#071d24] via-[#0b2933] to-[#041217] shadow-2xl border border-teal-500/20 overflow-hidden ${className}`}
        style={{
          touchAction: 'pan-y', // Vital for mobile Safari/Chrome to allow vertical page scrolling
        }}
        aria-hidden="true"
      >
        {/* Subtle background grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />

        <Canvas
          camera={{ position: [0, 0, 3.8], fov: 45 }}
          dpr={deviceTier.dpr}
          frameloop={shouldAnimate ? 'always' : 'demand'}
          gl={{
            antialias: !deviceTier.isMobile,
            powerPreference: 'high-performance',
            alpha: true,
          }}
          onCreated={handleCreated}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        >
          <PancreasScene
            pointer={pointer}
            particleCount={deviceTier.particleCount}
            reducedMotion={deviceTier.prefersReducedMotion}
          />
        </Canvas>
      </div>
    </HeroErrorBoundary>
  );
};

export default PancreasHero3D;
