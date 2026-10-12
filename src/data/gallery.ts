import type { LocalizedString } from '../types';
import { CLINIC_IMAGES } from '../config/images';

export type GalleryCategory =
  | 'all'
  | 'clinic_photos'
  | 'doctor_photos'
  | 'events'
  | 'videos'
  | 'health_camps'
  | 'activities';

export interface GalleryItem {
  id: string;
  title: LocalizedString;
  caption: LocalizedString;
  altText: LocalizedString;
  category: Exclude<GalleryCategory, 'all'>;
  thumbnailUrl: string;
  fullUrl: string;
  aspectRatio: '4/3' | '16/9' | '1/1';
  youtubeId?: string;
  date?: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-ccdsi-conference-speaker',
    title: {
      en: 'CCDSI Conference Presentation',
      hi: 'सीसीडीएसआई सम्मेलन प्रस्तुति',
    },
    caption: {
      en: 'Conference Speaker on Stage',
      hi: 'सम्मेलन वक्ता के रूप में मंच पर व्याख्यान',
    },
    altText: {
      en: 'Dr. Soumya Sengupta addressing the audience as a conference speaker on stage at CCDSI',
      hi: 'सीसीडीएसआई सम्मेलन में मंच पर व्याख्यान देते डॉ. सौम्य सेनगुप्ता',
    },
    category: 'events',
    thumbnailUrl: CLINIC_IMAGES.ccdsiConference,
    fullUrl: CLINIC_IMAGES.ccdsiConference,
    aspectRatio: '4/3',
    date: '2026',
  },
  {
    id: 'gal-rssdi-jhcon-2026-presentation',
    title: {
      en: 'RSSDI JHCON 2026 Presentation',
      hi: 'आरएसएसडीआई झारखण्ड 2026 प्रस्तुति',
    },
    caption: {
      en: 'Award presentation photograph at RSSDI JHCON 2026 conference.',
      hi: 'आरएसएसडीआई झारखण्ड 2026 सम्मेलन में मंच प्रस्तुति।',
    },
    altText: {
      en: 'Dr. Soumya Sengupta at RSSDI JHCON 2026 stage presentation ceremony',
      hi: 'आरएसएसडीआई झारखण्ड 2026 मंच प्रस्तुति के दौरान डॉ. सौम्य सेनगुप्ता',
    },
    category: 'events',
    thumbnailUrl: CLINIC_IMAGES.rssdiJhconAward,
    fullUrl: CLINIC_IMAGES.rssdiJhconAward,
    aspectRatio: '4/3',
    date: '2026',
  },
  {
    id: 'gal-consultation-desk',
    title: {
      en: 'Main Consultation Suite',
      hi: 'मुख्य परामर्श कक्ष',
    },
    caption: {
      en: 'Quiet, private physician desk equipped for in-depth glycemic consultation and patient counseling.',
      hi: 'गहन चिकित्सकीय परामर्श और रोगी मार्गदर्शन के लिए शांत एवं निजी परामर्श कक्ष।',
    },
    altText: {
      en: 'Interior photograph of Dr. Soumya Sengupta consultation desk and patient chairs',
      hi: 'डॉ. सौम्य सेनगुप्ता के परामर्श डेस्क और रोगी कुर्सियों का आंतरिक दृश्य',
    },
    category: 'clinic_photos',
    thumbnailUrl: '/assets/gallery/consultation-desk-thumb.webp',
    fullUrl: '/assets/gallery/consultation-desk.webp',
    aspectRatio: '4/3',
    date: '2026-03-15',
  },
  {
    id: 'gal-cgm-station',
    title: {
      en: 'Continuous Glucose Sensor Application Station',
      hi: 'सीजीएम सेंसर एप्लीकेशन एवं कैलिब्रेशन स्टेशन',
    },
    caption: {
      en: 'Dedicated clinical area for painless continuous glucose sensor placement and patient app pairing.',
      hi: 'दर्द रहित सीजीएम सेंसर लगाने और मोबाइल ऐप से जोड़ने के लिए समर्पित क्लिनिकल क्षेत्र।',
    },
    altText: {
      en: 'Sensor application tools and digital glucose monitoring display station',
      hi: 'सेंसर लगाने के उपकरण और डिजिटल ग्लूकोज निगरानी डिस्प्ले स्टेशन',
    },
    category: 'clinic_photos',
    thumbnailUrl: '/assets/gallery/cgm-station-thumb.webp',
    fullUrl: '/assets/gallery/cgm-station.webp',
    aspectRatio: '4/3',
    date: '2026-03-20',
  },
  {
    id: 'gal-waiting-lounge',
    title: {
      en: 'Patient Waiting Lounge & Reception',
      hi: 'रोगी प्रतीक्षा लाउंज एवं रिसेप्शन',
    },
    caption: {
      en: 'Air-conditioned, calm waiting space with educational diabetes literature and minimal wait times.',
      hi: 'शैक्षणिक पत्रिकाओं से युक्त वातानुकूलित एवं आरामदायक प्रतीक्षा लाउंज।',
    },
    altText: {
      en: 'Comfortable seating arrangement in patient waiting area with reception desk',
      hi: 'प्रतीक्षा कक्ष में आरामदायक बैठने की व्यवस्था और रिसेप्शन डेस्क',
    },
    category: 'clinic_photos',
    thumbnailUrl: '/assets/gallery/waiting-lounge-thumb.webp',
    fullUrl: '/assets/gallery/waiting-lounge.webp',
    aspectRatio: '16/9',
    date: '2026-03-10',
  },
  {
    id: 'gal-doctor-exam',
    title: {
      en: 'Dr. Soumya Sengupta — Clinical Evaluation',
      hi: 'डॉ. सौम्य सेनगुप्ता — क्लिनिकल मूल्यांकन',
    },
    caption: {
      en: 'Dr. Sengupta reviewing continuous glucose ambulatory profile (AGP) with a patient.',
      hi: 'रोगी के साथ निरंतर ग्लूकोज एंबुलेटरी प्रोफाइल (AGP) की विस्तृत समीक्षा करते डॉ. सेनगुप्ता।',
    },
    altText: {
      en: 'Dr. Soumya Sengupta analyzing diagnostic glycemic charts during consultation',
      hi: 'परामर्श के दौरान नैदानिक ग्लूकोज चार्ट का विश्लेषण करते डॉ. सौम्य सेनगुप्ता',
    },
    category: 'doctor_photos',
    thumbnailUrl: '/assets/gallery/doctor-consulting-thumb.webp',
    fullUrl: '/assets/gallery/doctor-consulting.webp',
    aspectRatio: '4/3',
    date: '2026-02-28',
  },
  {
    id: 'gal-doctor-speech',
    title: {
      en: 'RSSDI Regional Diabetology Keynote',
      hi: 'आरएसएसडीआई क्षेत्रीय संगोष्ठी मुख्य भाषण',
    },
    caption: {
      en: 'Dr. Sengupta presenting updates on cardiorenal metabolic protection at a clinical conference.',
      hi: 'क्लिनिकल कॉन्फ्रेंस में हृदय-गुर्दा मेटाबोलिक सुरक्षा पर व्याख्यान देते डॉ. सेनगुप्ता।',
    },
    altText: {
      en: 'Dr. Sengupta delivering an academic medical lecture at the diabetology podium',
      hi: 'डायबिटीज मंच पर अकादमिक व्याख्यान देते हुए डॉ. सेनगुप्ता',
    },
    category: 'events',
    thumbnailUrl: '/assets/gallery/conference-keynote-thumb.webp',
    fullUrl: '/assets/gallery/conference-keynote.webp',
    aspectRatio: '16/9',
    date: '2026-01-18',
  },
  {
    id: 'gal-health-camp-saltlake',
    title: {
      en: 'Community Prediabetes Screening Camp',
      hi: 'सामुदायिक प्री-डायबिटीज स्क्रीनिंग शिविर',
    },
    caption: {
      en: 'Free fasting capillary blood glucose, neuropathy biothesiometry, and dietary counseling.',
      hi: 'निःशुल्क फास्टिंग ब्लड शुगर, न्यूरोपैथी जांच और आहार परामर्श शिविर।',
    },
    altText: {
      en: 'Senior citizens receiving point-of-care glucose screenings at community health camp',
      hi: 'स्वास्थ्य शिविर में वरिष्ठ नागरिकों की त्वरित ग्लूकोज जांच',
    },
    category: 'health_camps',
    thumbnailUrl: '/assets/gallery/health-camp-thumb.webp',
    fullUrl: '/assets/gallery/health-camp.webp',
    aspectRatio: '4/3',
    date: '2025-11-14',
  },
  {
    id: 'gal-foot-screening-activity',
    title: {
      en: 'Diabetic Foot Screening Workshop',
      hi: 'डायबिटिक फुट जांच एवं न्यूरोपैथी कार्यशाला',
    },
    caption: {
      en: 'Hands-on training session on daily foot inspection and monofilament pressure sensation test.',
      hi: 'पैरों की दैनिक देखभाल और संवेदना जांच पर व्यावहारिक रोगी प्रशिक्षण सत्र।',
    },
    altText: {
      en: 'Demonstration of monofilament sensation test for diabetic neuropathy prevention',
      hi: 'डायबिटिक न्यूरोपैथी से बचाव के लिए संवेदना परीक्षण का प्रदर्शन',
    },
    category: 'activities',
    thumbnailUrl: '/assets/gallery/foot-screening-thumb.webp',
    fullUrl: '/assets/gallery/foot-screening.webp',
    aspectRatio: '4/3',
    date: '2025-12-05',
  },
  {
    id: 'gal-video-masterclass-cgm',
    title: {
      en: 'Masterclass: Understanding CGM Sensor Graphs',
      hi: 'मास्टरक्लास: सीजीएम सेंसर ग्राफ को समझना',
    },
    caption: {
      en: 'Step-by-step patient video guide on Time in Range (TIR) and interpreting glucose trend arrows.',
      hi: 'टाइम इन रेंज (TIR) और ग्लूकोज ट्रेंड तीरों को समझने पर व्यावहारिक वीडियो गाइड।',
    },
    altText: {
      en: 'Educational video thumbnail for CGM sensor graph interpretation masterclass',
      hi: 'सीजीएम सेंसर ग्राफ व्याख्या मास्टरक्लास का वीडियो थंबनेल',
    },
    category: 'videos',
    thumbnailUrl: '/assets/gallery/video-cgm-thumb.webp',
    fullUrl: '/assets/gallery/video-cgm.webp',
    aspectRatio: '16/9',
    youtubeId: 'dQw4w9WgXcQ',
    date: '2026-02-10',
  },
];
