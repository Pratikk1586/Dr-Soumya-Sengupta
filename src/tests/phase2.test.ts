import { describe, it, expect } from 'vitest';
import { isRecentInIST, formatDateInIST } from '../utils/date';
import { PANCREAS_MODEL_PATH, ENABLE_PATIENT_REVIEWS_SECTION } from '../config/constants';
import { detectDeviceTier } from '../components/hero/WebGLSupportDetector';

describe('Phase 2 Core Systems & Logic', () => {
  it('correctly configures 3D hero constants', () => {
    expect(PANCREAS_MODEL_PATH).toBe('/assets/models/pancreas.glb');
    expect(typeof ENABLE_PATIENT_REVIEWS_SECTION).toBe('boolean');
  });

  it('evaluates IST recent date window correctly', () => {
    const now = new Date();
    const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString();
    const tenDaysAgo = new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString();

    expect(isRecentInIST(twoDaysAgo, 3)).toBe(true);
    expect(isRecentInIST(tenDaysAgo, 3)).toBe(false);
  });

  it('formats dates in Indian Standard Time (IST)', () => {
    const formattedEn = formatDateInIST('2026-10-06T12:00:00Z', 'en');
    expect(formattedEn).toContain('2026');
    expect(formattedEn).toContain('Oct');
  });

  it('safely handles device tier detection in non-browser or test environments', () => {
    const tier = detectDeviceTier();
    expect(tier).toHaveProperty('hasWebGL');
    expect(tier).toHaveProperty('dpr');
    expect(tier).toHaveProperty('particleCount');
    expect(tier).toHaveProperty('prefersReducedMotion');
  });
});
