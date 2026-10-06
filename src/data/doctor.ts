import type { DoctorProfile } from '../types/doctor';
import { CONTENT_TO_BE_VERIFIED_MARKER } from './_placeholders';

export const DOCTOR_DATA: DoctorProfile = {
  name: {
    en: 'Dr. Soumya Sengupta',
    hi: 'डॉ. सौम्य सेनगुप्ता',
  },
  title: {
    en: 'Consultant Diabetologist & Metabolic Physician',
    hi: 'वरिष्ठ मधुमेह रोग विशेषज्ञ एवं मेटाबोलिक फिजिशियन',
  },
  shortBio: {
    en: 'Dedicated to evidence-based diabetology, individualized glucose management, and holistic cardiovascular-renal risk reduction.',
    hi: 'प्रमाण-आधारित मधुमेह विज्ञान, व्यक्तिगत ग्लूकोज नियंत्रण और हृदय-गुर्दे की सुरक्षा के प्रति समर्पित।',
  },
  fullBio: [
    {
      en: 'Dr. Soumya Sengupta is a senior consultant diabetologist committed to transforming diabetes care from reactive symptom treatment to proactive, personalized metabolic wellness.',
      hi: 'डॉ. सौम्य सेनगुप्ता एक वरिष्ठ परामर्शदाता डायबेटोलॉजिस्ट हैं, जो मधुमेह प्रबंधन को आधुनिक चिकित्सा पद्धति और समग्र स्वास्थ्य दृष्टिकोण से सशक्त बनाते हैं।',
    },
    {
      en: 'With comprehensive clinical experience in managing Type 1 diabetes, complex Type 2 diabetes, gestational diabetes, and cardiometabolic complications, his practice emphasizes patient education, advanced glycemic monitoring (CGMS), and sustainable lifestyle balance.',
      hi: 'टाइप 1, टाइप 2, गर्भावधि मधुमेह और हृदय-गुर्दे से जुड़ी जटिलताओं के व्यापक अनुभव के साथ, वे रोगी शिक्षा, आधुनिक निरंतर ग्लूकोज मॉनिटरिंग (CGMS) और जीवनशैली सुधार पर विशेष ध्यान देते हैं।',
    },
  ],
  qualifications: [
    {
      degree: {
        en: `${CONTENT_TO_BE_VERIFIED_MARKER} MBBS`,
        hi: `${CONTENT_TO_BE_VERIFIED_MARKER} एमबीबीएस`,
      },
      institution: {
        en: `${CONTENT_TO_BE_VERIFIED_MARKER} Medical College, Kolkata`,
        hi: `${CONTENT_TO_BE_VERIFIED_MARKER} मेडिकल कॉलेज, कोलकाता`,
      },
      isVerified: false,
    },
    {
      degree: {
        en: `${CONTENT_TO_BE_VERIFIED_MARKER} MD (General Medicine)`,
        hi: `${CONTENT_TO_BE_VERIFIED_MARKER} एमडी (जनरल मेडिसिन)`,
      },
      institution: {
        en: `${CONTENT_TO_BE_VERIFIED_MARKER} Institute of Post Graduate Medical Education & Research`,
        hi: `${CONTENT_TO_BE_VERIFIED_MARKER} आईपीजीएमईएंडआर`,
      },
      isVerified: false,
    },
    {
      degree: {
        en: `${CONTENT_TO_BE_VERIFIED_MARKER} Fellowship / Post Graduate Diploma in Diabetology`,
        hi: `${CONTENT_TO_BE_VERIFIED_MARKER} फेलोशिप / डायबेटोलॉजी डिप्लोमा`,
      },
      institution: {
        en: `${CONTENT_TO_BE_VERIFIED_MARKER} Recognized Medical Board`,
        hi: `${CONTENT_TO_BE_VERIFIED_MARKER} मान्यता प्राप्त मेडिकल बोर्ड`,
      },
      isVerified: false,
    },
  ],
  affiliations: [
    {
      organization: {
        en: `${CONTENT_TO_BE_VERIFIED_MARKER} Research Society for the Study of Diabetes in India (RSSDI)`,
        hi: `${CONTENT_TO_BE_VERIFIED_MARKER} आरएसएसडीआई (RSSDI)`,
      },
      role: {
        en: 'Life Member',
        hi: 'आजीवन सदस्य',
      },
      isVerified: false,
    },
    {
      organization: {
        en: `${CONTENT_TO_BE_VERIFIED_MARKER} Association of Physicians of India (API)`,
        hi: `${CONTENT_TO_BE_VERIFIED_MARKER} एसोसिएशन ऑफ फिजिशियंस ऑफ इंडिया`,
      },
      role: {
        en: 'Member',
        hi: 'सदस्य',
      },
      isVerified: false,
    },
  ],
  experienceYears: {
    value: 15,
    verificationStatus: 'unverified_placeholder',
    notes: `${CONTENT_TO_BE_VERIFIED_MARKER} Exact practice tenure to be verified with official credentials.`,
  },
  specialties: [
    {
      en: 'Type 2 Diabetes Reversal & Remission Evaluation',
      hi: 'टाइप 2 मधुमेह रेमिशन एवं नियंत्रण मूल्यांकन',
    },
    {
      en: 'Continuous Glucose Monitoring (CGM) & Ambulatory Glucose Profile (AGP)',
      hi: 'निरंतर ग्लूकोज मॉनिटरिंग (CGM) और एजीपी प्रोफाइल',
    },
    {
      en: 'Insulin Optimization & Type 1 Diabetes Care',
      hi: 'इंसुलिन अनुकूलन और टाइप 1 मधुमेह देखभाल',
    },
    {
      en: 'Gestational Diabetes Mellitus (GDM) Safe Pregnancy Care',
      hi: 'गर्भावस्था में मधुमेह (GDM) का सुरक्षित प्रबंधन',
    },
    {
      en: 'Diabetic Nephropathy & Cardio-Metabolic Protection',
      hi: 'डायबिटिक गुर्दे एवं हृदय संबंधी सुरक्षा',
    },
    {
      en: 'Comprehensive Diabetic Foot Health & Neuropathy Screening',
      hi: 'डायबिटिक फुट केयर एवं न्यूरोपैथी जांच',
    },
  ],
  clinicalPhilosophy: {
    en: 'Managing diabetes is not merely prescribing medication to lower numbers—it is about restoring confidence, preserving organ vitality, and walking alongside the patient with clarity and compassion.',
    hi: 'मधुमेह नियंत्रण केवल दवा लिखकर आंकड़े कम करना नहीं है—यह रोगी में आत्मविश्वास जगाना, महत्वपूर्ण अंगों की सुरक्षा करना और सहानुभूति के साथ स्वस्थ जीवन का मार्ग प्रशस्त करना है।',
  },
  languagesSpoken: [
    { en: 'English', hi: 'अंग्रेजी' },
    { en: 'Hindi', hi: 'हिन्दी' },
    { en: 'Bengali', hi: 'বাংলা' },
  ],
  registrationNumber: {
    value: `${CONTENT_TO_BE_VERIFIED_MARKER} WBMC-XXXXX`,
    verificationStatus: 'unverified_placeholder',
    notes: 'State Medical Council Registration Number awaiting official confirmation',
  },
};
