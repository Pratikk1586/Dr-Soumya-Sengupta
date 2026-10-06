import { describe, it, expect } from 'vitest';
import {
  normalizeE164Phone,
  buildWhatsAppUrl,
  formatWhatsAppMessage,
} from '../lib/whatsapp';
import {
  isValidGoogleMapsEmbedUrl,
  getDirectionsUrl,
  getGoogleMapsUrl,
} from '../lib/maps';
import { getTelHref, getMailtoHref } from '../lib/contact';

describe('Lib Helpers — whatsapp.ts', () => {
  it('normalizes 10-digit Indian numbers with country code 91', () => {
    expect(normalizeE164Phone('9830000000')).toBe('919830000000');
    expect(normalizeE164Phone(' 98300 00000 ')).toBe('919830000000');
  });

  it('normalizes formatted numbers with leading +', () => {
    expect(normalizeE164Phone('+91 98300 00000')).toBe('919830000000');
    expect(normalizeE164Phone('+91-98300-00000')).toBe('919830000000');
  });

  it('returns null for invalid or incomplete numbers', () => {
    expect(normalizeE164Phone(null)).toBeNull();
    expect(normalizeE164Phone('')).toBeNull();
    expect(normalizeE164Phone('12345')).toBeNull();
  });

  it('formats appropriate messages for each interaction type', () => {
    const apptMsg = formatWhatsAppMessage('appointment', {
      patientName: 'Amit Roy',
      preferredSlot: 'Evening',
    });
    expect(apptMsg).toContain('Amit Roy');
    expect(apptMsg).toContain('Evening');

    const locMsg = formatWhatsAppMessage('location');
    expect(locMsg).toContain('directions');

    const enqMsg = formatWhatsAppMessage('enquiry');
    expect(enqMsg).toContain('diabetology');
  });

  it('builds wa.me URL with URL-encoded parameters', () => {
    const url = buildWhatsAppUrl('appointment', { patientName: 'S. Bose' }, '9830000000');
    expect(url).toBeTruthy();
    expect(url).toContain('https://wa.me/919830000000?text=');
    expect(url).toContain('S.%20Bose');
  });

  it('returns null if target phone number is missing or invalid', () => {
    const url = buildWhatsAppUrl('enquiry', undefined, 'invalid-num');
    expect(url).toBeNull();
  });
});

describe('Lib Helpers — maps.ts', () => {
  it('validates legitimate Google Maps embed URLs', () => {
    expect(
      isValidGoogleMapsEmbedUrl(
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684'
      )
    ).toBe(true);
    expect(
      isValidGoogleMapsEmbedUrl(
        'https://maps.google.com/maps?q=Salt+Lake&output=embed'
      )
    ).toBe(true);
  });

  it('rejects insecure or untrusted map embed URLs', () => {
    expect(isValidGoogleMapsEmbedUrl('http://www.google.com/maps/embed')).toBe(false);
    expect(isValidGoogleMapsEmbedUrl('https://evil-maps.com/embed')).toBe(false);
    expect(isValidGoogleMapsEmbedUrl('javascript:alert(1)')).toBe(false);
    expect(isValidGoogleMapsEmbedUrl(null)).toBe(false);
  });

  it('synthesizes directions URL with encoded destination', () => {
    const directions = getDirectionsUrl('Salt Lake Sector 1 Kolkata');
    expect(directions).toContain('https://www.google.com/maps/dir/?api=1&destination=');
    expect(directions).toContain('Salt%20Lake');
  });

  it('retrieves google maps URL safely', () => {
    const url = getGoogleMapsUrl('https://maps.google.com/?q=Kolkata');
    expect(url).toBe('https://maps.google.com/?q=Kolkata');
    expect(getGoogleMapsUrl('invalid-url')).toBeNull();
  });
});

describe('Lib Helpers — contact.ts', () => {
  it('formats tel: links correctly', () => {
    expect(getTelHref('+91 98300 00000')).toBe('tel:+919830000000');
    expect(getTelHref('033 2345 6789')).toBe('tel:03323456789');
    expect(getTelHref('123')).toBeNull();
    expect(getTelHref(null)).toBeNull();
  });

  it('formats mailto: links correctly with params', () => {
    const mailto = getMailtoHref('care@drsoumyasengupta.com', 'Appointment Inquiry', 'Hello Doctor');
    expect(mailto).toBe(
      'mailto:care@drsoumyasengupta.com?subject=Appointment+Inquiry&body=Hello+Doctor'
    );
    expect(getMailtoHref('not-an-email')).toBeNull();
    expect(getMailtoHref(null)).toBeNull();
  });
});
