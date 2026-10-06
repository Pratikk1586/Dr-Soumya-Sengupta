/**
 * WebGL capability and device performance detection helper.
 */

export interface DeviceTier {
  hasWebGL: boolean;
  isMobile: boolean;
  isTablet: boolean;
  dpr: number;
  particleCount: number;
  prefersReducedMotion: boolean;
}

export function detectDeviceTier(): DeviceTier {
  if (typeof window === 'undefined') {
    return {
      hasWebGL: false,
      isMobile: false,
      isTablet: false,
      dpr: 1,
      particleCount: 0,
      prefersReducedMotion: false,
    };
  }

  // 1. Reduced motion check
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 2. WebGL support check
  let hasWebGL: boolean;
  try {
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl');
    hasWebGL = Boolean(
      gl && gl instanceof WebGLRenderingContext ? true : gl && 'getExtension' in (gl as object)
    );
  } catch {
    hasWebGL = false;
  }

  const width = window.innerWidth;
  const isMobile = width < 640;
  const isTablet = width >= 640 && width < 1024;
  const deviceDpr = window.devicePixelRatio || 1;

  // Tiered settings
  let dpr: number;
  let particleCount: number;

  if (isMobile) {
    dpr = Math.min(deviceDpr, 1.25);
    particleCount = 18;
  } else if (isTablet) {
    dpr = Math.min(deviceDpr, 1.5);
    particleCount = 28;
  } else {
    dpr = Math.min(deviceDpr, 1.75);
    particleCount = 45;
  }

  return {
    hasWebGL,
    isMobile,
    isTablet,
    dpr,
    particleCount,
    prefersReducedMotion,
  };
}
