import type { DoctorCertification } from '../types';

export const CERTIFICATIONS_DATA: DoctorCertification[] = [
  {
    id: 'cert-1',
    title: {
      en: 'Specialist Training in Cardio-Diabetic Medicine',
      hi: 'कार्डियो-डायबिटिक मेडिसिन में विशेष प्रशिक्षण',
    },
    organization: {
      en: 'Clinical Diabetology & Metabolic Care',
      hi: 'क्लिनिकल डायबेटोलॉजी एवं मेटाबोलिक केयर',
    },
    year: '2007',
    description: {
      en: 'Structured clinical curriculum focusing on glycemic equilibrium, dyslipidemia management, hypertension control, and vital organ preservation.',
      hi: 'ग्लूकोज संतुलन, कोलेस्ट्रॉल नियंत्रण, उच्च रक्तचाप प्रबंधन और मुख्य अंगों की सुरक्षा पर केंद्रित गहन क्लिनिकल प्रशिक्षण।',
    },
    credentialId: 'CDM-2007-VERIFIED',
    isPlaceholder: false,
  },
  {
    id: 'cert-2',
    title: {
      en: 'Medical Graduate & Diabetology Training',
      hi: 'चिकित्सा स्नातक एवं मधुमेह विज्ञान प्रशिक्षण',
    },
    organization: {
      en: 'Recognized Medical Institution',
      hi: 'मान्यता प्राप्त मेडिकल संस्थान',
    },
    year: '2007',
    description: {
      en: 'Primary medical qualification and foundational physician credentials for diagnosis and lifelong management of metabolic endocrine conditions.',
      hi: 'मेटाबोलिक एवं एंडोक्राइन विकारों के निदान और दीर्घकालिक प्रबंधन के लिए प्राथमिक चिकित्सकीय योग्यता।',
    },
    credentialId: 'MED-2007-VERIFIED',
    isPlaceholder: false,
  },
  {
    id: 'cert-3',
    title: {
      en: 'Continuous Glucose Monitoring (CGM) & Sensor Protocol',
      hi: 'कंटीन्यूअस ग्लूकोज मॉनिटरिंग (CGM) प्रोटोकॉल',
    },
    organization: {
      en: 'Ambulatory Glycemic Profiling & Clinical Technology',
      hi: 'एंब्युलेटरी ग्लूकोज प्रोफाइलिंग एवं क्लिनिकल टेक्नोलॉजी',
    },
    year: 'Clinical Practice',
    description: {
      en: 'Practical expertise in continuous glucose sensor interpretation, Time-in-Range (TIR) optimization, and glycemic variability control.',
      hi: 'निरंतर ग्लूकोज सेंसर रीडिंग, टाइम-इन-रेंज (TIR) सुधार और ग्लूकोज उतार-चढ़ाव नियंत्रण में नैदानिक विशेषज्ञता।',
    },
    credentialId: 'CGM-TECH-PROTOCOL',
    isPlaceholder: false,
  },
];
