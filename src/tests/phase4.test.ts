import { describe, it, expect } from 'vitest';
import { chatbotService, galleryService } from '../services';
import { z } from 'zod';

const appointmentTestSchema = z.object({
  patientType: z.enum(['new', 'followup']),
  consultationType: z.enum(['in_clinic', 'telemedicine']),
  preferredDate: z.string().min(1).refine((val) => {
    const selected = new Date(val);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selected >= today;
  }, 'Preferred date cannot be in the past'),
  preferredSlot: z.enum(['morning', 'afternoon', 'evening']),
  patientName: z.string().min(2).max(80),
  phone: z.string().min(10).max(16).regex(/^(\+?[0-9\s-]{10,16})$/),
  email: z.string().email().optional().or(z.literal('')),
  reasonForVisit: z.string().max(250).optional().or(z.literal('')),
  consent: z.literal(true),
});

describe('Phase 4 — Clinic Assistant (Chatbot Service)', () => {
  it('provides bilingual initial greetings with quick action buttons', () => {
    const enGreeting = chatbotService.getInitialMessage('en');
    const hiGreeting = chatbotService.getInitialMessage('hi');

    expect(enGreeting.text).toContain("Dr. Sengupta Clinic Assistant");
    expect(hiGreeting.text).toContain('क्लिनिक सहायक');
    expect(enGreeting.actions?.length).toBeGreaterThanOrEqual(6);
    expect(hiGreeting.actions?.length).toBeGreaterThanOrEqual(6);
  });

  it('matches appointment booking intent and returns booking deep links', async () => {
    const responseEn = await chatbotService.respond('How do I book an appointment?', 'en');
    expect(responseEn.text.toLowerCase()).toContain('appointment');
    expect(responseEn.actions?.some((a) => a.url === '/book-appointment')).toBe(true);

    const responseHi = await chatbotService.respond('मुझे डॉक्टर से मिलना है अपॉइंटमेंट चाहिए', 'hi');
    expect(responseHi.text).toContain('अपॉइंटमेंट');
    expect(responseHi.actions?.some((a) => a.url === '/book-appointment')).toBe(true);
  });

  it('matches timings and location intent dynamically from clinic service', async () => {
    const response = await chatbotService.respond('What are the OPD timings and chamber address?', 'en');
    expect(response.text).toContain('5:00 PM – 8:00 PM');
    expect(response.actions?.some((a) => a.url === '/clinic/timings')).toBe(true);
    expect(response.actions?.some((a) => a.url === '/clinic/location')).toBe(true);
  });

  it('SAFETY: intercepts emergency queries and returns high-priority emergency advisory', async () => {
    const emergencies = [
      'Patient is having severe chest pain',
      'The person fainted and is unconscious',
      'सीने में दर्द हो रहा है सांस नहीं आ रही',
    ];

    for (const em of emergencies) {
      const res = await chatbotService.respond(em, 'en');
      expect(res.isWarning).toBe(true);
      expect(res.text).toContain('EMERGENCY');
    }

    const resHi = await chatbotService.respond('सीने में दर्द है', 'hi');
    expect(resHi.isWarning).toBe(true);
    expect(resHi.text).toContain('आपातकालीन');
  });

  it('SAFETY: strictly refuses medical diagnosis, prescription, or dose adjustments', async () => {
    const adviceQueries = [
      'Can you prescribe me medicine for high sugar?',
      'My fasting sugar is 280, what tablet should I take?',
      'Should I increase my insulin dose?',
      'शुगर 300 है कौन सी दवा लूं?',
    ];

    for (const q of adviceQueries) {
      const res = await chatbotService.respond(q, 'en');
      expect(res.isWarning).toBe(true);
      expect(res.text).toContain('For medical diagnosis or treatment, please consult a qualified doctor.');
      expect(res.actions?.some((a) => a.url === '/book-appointment')).toBe(true);
    }

    const resHi = await chatbotService.respond('दवा की खुराक बढ़ाएं क्या', 'hi');
    expect(resHi.isWarning).toBe(true);
    expect(resHi.text).toContain('For medical diagnosis or treatment, please consult a qualified doctor.');
  });

  it('handles general orientation fallback gracefully', async () => {
    const res = await chatbotService.respond('random gibberish inquiry xyz', 'en');
    expect(res.isWarning).toBeFalsy();
    expect(res.actions?.length).toBeGreaterThanOrEqual(6);
  });
});

describe('Phase 4 — Appointment Request Form Schema Validation', () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 2);
  const validDateStr = tomorrow.toISOString().split('T')[0];

  it('validates a complete, accurate appointment request payload', () => {
    const validPayload = {
      patientType: 'new' as const,
      consultationType: 'in_clinic' as const,
      preferredDate: validDateStr,
      preferredSlot: 'evening' as const,
      patientName: 'Subhasish Ghosh',
      phone: '+91 98300 12345',
      email: 's.ghosh@example.com',
      reasonForVisit: 'Reviewing recent HbA1c elevation and lipid profile',
      consent: true as const,
    };

    const parseResult = appointmentTestSchema.safeParse(validPayload);
    expect(parseResult.success).toBe(true);
  });

  it('rejects appointments with past dates', () => {
    const pastPayload = {
      patientType: 'new' as const,
      consultationType: 'in_clinic' as const,
      preferredDate: '2020-01-01',
      preferredSlot: 'morning' as const,
      patientName: 'Anita Roy',
      phone: '9830012345',
      email: '',
      reasonForVisit: '',
      consent: true as const,
    };

    const parseResult = appointmentTestSchema.safeParse(pastPayload);
    expect(parseResult.success).toBe(false);
    if (!parseResult.success) {
      expect(parseResult.error.issues[0].message).toContain('past');
    }
  });

  it('rejects payloads with missing consent or invalid phone number', () => {
    const invalidPayload = {
      patientType: 'followup' as const,
      consultationType: 'telemedicine' as const,
      preferredDate: validDateStr,
      preferredSlot: 'morning' as const,
      patientName: 'A', // Too short
      phone: '1234', // Too short
      email: 'invalid-email',
      consent: false as const, // Missing consent
    };

    const parseResult = appointmentTestSchema.safeParse(invalidPayload);
    expect(parseResult.success).toBe(false);
  });
});

describe('Phase 4 — Media Gallery Service', () => {
  it('returns categorized gallery items across all required clinical categories', async () => {
    const allItems = await galleryService.getGalleryItems('all');
    expect(allItems.length).toBeGreaterThanOrEqual(8);

    const clinicPhotos = await galleryService.getGalleryItems('clinic_photos');
    expect(clinicPhotos.length).toBeGreaterThanOrEqual(2);

    const doctorPhotos = await galleryService.getGalleryItems('doctor_photos');
    expect(doctorPhotos.length).toBeGreaterThanOrEqual(1);

    const events = await galleryService.getGalleryItems('events');
    expect(events.length).toBeGreaterThanOrEqual(1);

    const videos = await galleryService.getGalleryItems('videos');
    expect(videos.length).toBeGreaterThanOrEqual(1);

    for (const item of allItems) {
      expect(item.id).toBeTruthy();
      expect(item.title.en).toBeTruthy();
      expect(item.caption.en).toBeTruthy();
      expect(item.altText.en).toBeTruthy();
      expect(item.aspectRatio).toMatch(/^(4\/3|16\/9|1\/1)$/);
    }
  });
});
