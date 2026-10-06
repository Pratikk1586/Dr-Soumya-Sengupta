import type { ClinicLocation } from '../types/clinic';
import { CONTENT_TO_BE_VERIFIED_MARKER } from './_placeholders';

export const CLINIC_LOCATIONS_DATA: ClinicLocation[] = [
  {
    id: 'clinic-salt-lake',
    name: {
      en: `${CONTENT_TO_BE_VERIFIED_MARKER} Salt Lake Diabetes Care Chamber`,
      hi: `${CONTENT_TO_BE_VERIFIED_MARKER} साल्ट लेक डायबिटीज़ केयर चेंबर`,
    },
    facilityType: {
      en: 'Primary Consultation Chamber',
      hi: 'मुख्य परामर्श केंद्र',
    },
    address: {
      line1: {
        en: `${CONTENT_TO_BE_VERIFIED_MARKER} Block BD, Sector 1, Salt Lake City`,
        hi: `${CONTENT_TO_BE_VERIFIED_MARKER} ब्लॉक बीडी, सेक्टर 1, साल्ट लेक`,
      },
      line2: {
        en: 'Near Central Park Metro Station',
        hi: 'सेंट्रल पार्क मेट्रो स्टेशन के पास',
      },
      city: {
        en: 'Kolkata',
        hi: 'कोलकाता',
      },
      state: {
        en: 'West Bengal',
        hi: 'पश्चिम बंगाल',
      },
      pincode: '700064',
      landmark: {
        en: `${CONTENT_TO_BE_VERIFIED_MARKER} Near BD Market`,
        hi: `${CONTENT_TO_BE_VERIFIED_MARKER} बीडी मार्केट के पास`,
      },
    },
    schedule: [
      {
        dayOfWeek: { en: 'Monday', hi: 'सोमवार' },
        timings: { en: '5:00 PM – 8:00 PM', hi: 'शाम 5:00 – 8:00' },
        isAvailable: true,
      },
      {
        dayOfWeek: { en: 'Tuesday', hi: 'मंगलवार' },
        timings: { en: '5:00 PM – 8:00 PM', hi: 'शाम 5:00 – 8:00' },
        isAvailable: true,
      },
      {
        dayOfWeek: { en: 'Wednesday', hi: 'बुधवार' },
        timings: { en: '5:00 PM – 8:00 PM', hi: 'शाम 5:00 – 8:00' },
        isAvailable: true,
      },
      {
        dayOfWeek: { en: 'Thursday', hi: 'गुरुवार' },
        timings: { en: '5:00 PM – 8:00 PM', hi: 'शाम 5:00 – 8:00' },
        isAvailable: true,
      },
      {
        dayOfWeek: { en: 'Friday', hi: 'शुक्रवार' },
        timings: { en: '5:00 PM – 8:00 PM', hi: 'शाम 5:00 – 8:00' },
        isAvailable: true,
      },
      {
        dayOfWeek: { en: 'Saturday', hi: 'शनिवार' },
        timings: { en: '10:00 AM – 1:00 PM', hi: 'सुबह 10:00 – दोपहर 1:00' },
        isAvailable: true,
      },
      {
        dayOfWeek: { en: 'Sunday', hi: 'रविवार' },
        timings: { en: 'Closed / By Prior Emergency Appointment', hi: 'बंद / पूर्व आपातकालीन अनुरोध पर' },
        isAvailable: false,
      },
    ],
    consultationFee: {
      value: `${CONTENT_TO_BE_VERIFIED_MARKER} ₹1,000`,
      verificationStatus: 'unverified_placeholder',
      notes: 'Fee structure pending clinic reception confirmation',
    },
    mapsUrl: '', // Gracefully degraded when not provided via env or data
    coordinates: {
      lat: 22.5867,
      lng: 88.4178,
    },
    isVerified: false,
  },
  {
    id: 'clinic-south-kolkata',
    name: {
      en: `${CONTENT_TO_BE_VERIFIED_MARKER} South Kolkata Specialty Hospital OPD`,
      hi: `${CONTENT_TO_BE_VERIFIED_MARKER} दक्षिण कोलकाता सुपरस्पेशलिटी अस्पताल ओपीडी`,
    },
    facilityType: {
      en: 'Visiting Hospital OPD',
      hi: 'अस्पताल ओपीडी',
    },
    address: {
      line1: {
        en: `${CONTENT_TO_BE_VERIFIED_MARKER} Gariahat Road, Near Triangular Park`,
        hi: `${CONTENT_TO_BE_VERIFIED_MARKER} गरियाहाट रोड, ट्राएंगुलर पार्क के पास`,
      },
      city: {
        en: 'Kolkata',
        hi: 'कोलकाता',
      },
      state: {
        en: 'West Bengal',
        hi: 'पश्चिम बंगाल',
      },
      pincode: '700029',
    },
    schedule: [
      {
        dayOfWeek: { en: 'Tuesday & Friday', hi: 'मंगलवार एवं शुक्रवार' },
        timings: { en: '11:00 AM – 2:00 PM', hi: 'सुबह 11:00 – दोपहर 2:00' },
        isAvailable: true,
      },
    ],
    consultationFee: {
      value: `${CONTENT_TO_BE_VERIFIED_MARKER} ₹1,200`,
      verificationStatus: 'unverified_placeholder',
    },
    isVerified: false,
  },
];
