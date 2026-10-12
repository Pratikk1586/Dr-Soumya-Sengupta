import { describe, it, expect } from 'vitest';
import { CLINIC_IMAGES } from '../config/images';
import { DOCTOR_DATA } from '../data/doctor';
import { CLINICS_DATA } from '../data/clinic';
import { galleryService } from '../services';

describe('Cloudflare R2 Image Asset Integration', () => {
  it('centralizes exact confirmed R2 URLs in CLINIC_IMAGES config', () => {
    expect(CLINIC_IMAGES.logo).toBe(
      'https://pub-7db5b1cd8b0147abb4dc0bbc590bac39.r2.dev/logo.png'
    );
    expect(CLINIC_IMAGES.doctorProfile).toBe(
      'https://pub-7db5b1cd8b0147abb4dc0bbc590bac39.r2.dev/doctor/DrSoumya.jpeg'
    );
    expect(CLINIC_IMAGES.ccdsiConference).toBe(
      'https://pub-7db5b1cd8b0147abb4dc0bbc590bac39.r2.dev/doctor/CCDSI%20Conference%20Speaker%20on%20Stage.png'
    );
    expect(CLINIC_IMAGES.rssdiJhconAward).toBe(
      'https://pub-7db5b1cd8b0147abb4dc0bbc590bac39.r2.dev/doctor/RSSDI%20JHCON%202026%20Award%20Presentation.png'
    );
  });

  it('binds doctor profile photo and clinic logo to data models', () => {
    expect(DOCTOR_DATA.photoUrl).toBe(CLINIC_IMAGES.doctorProfile);
    expect(CLINICS_DATA[0].logo).toBe(CLINIC_IMAGES.logo);
  });

  it('includes both conference photographs in professional gallery items', async () => {
    const allGallery = await galleryService.getGalleryItems('all');
    const ccdsi = allGallery.find((item) => item.id === 'gal-ccdsi-conference-speaker');
    const rssdi = allGallery.find((item) => item.id === 'gal-rssdi-jhcon-2026-presentation');

    expect(ccdsi).toBeDefined();
    expect(ccdsi?.thumbnailUrl).toBe(CLINIC_IMAGES.ccdsiConference);
    expect(ccdsi?.category).toBe('events');
    expect(ccdsi?.aspectRatio).toMatch(/^(4\/3|16\/9|1\/1)$/);

    expect(rssdi).toBeDefined();
    expect(rssdi?.thumbnailUrl).toBe(CLINIC_IMAGES.rssdiJhconAward);
    expect(rssdi?.category).toBe('events');
    expect(rssdi?.aspectRatio).toMatch(/^(4\/3|16\/9|1\/1)$/);
  });
});
