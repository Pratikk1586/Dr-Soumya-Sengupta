export interface TranslationDictionary {
  nav: {
    home: string;
    about: string;
    diabetesCare: string;
    conditions: string;
    patientResources: string;
    clinic: string;
    contact: string;
    bookAppointment: string;
    search: string;
    menu: string;
    closeMenu: string;
  };
  dropdown: {
    about: {
      overview: string;
      qualifications: string;
      experience: string;
      expertise: string;
      memberships: string;
    };
    diabetesCare: {
      management: string;
      prediabetes: string;
      education: string;
      lifestyle: string;
      complications: string;
    };
    conditions: {
      allConditions: string;
      diabetes: string;
      thyroid: string;
      weightManagement: string;
      metabolicHealth: string;
      other: string;
    };
    patientResources: {
      knowledgeHub: string;
      articles: string;
      faqs: string;
      videos: string;
      reports: string;
      guides: string;
    };
    clinic: {
      overview: string;
      facilities: string;
      photos: string;
      timings: string;
      location: string;
    };
  };
  cta: {
    bookAppointment: string;
    callNow: string;
    whatsApp: string;
    viewDetails: string;
    learnMore: string;
    readArticle: string;
    downloadGuide: string;
    search: string;
  };
  footer: {
    tagline: string;
    quickLinks: string;
    clinicalFocus: string;
    chamberLogistics: string;
    legal: string;
    privacyPolicy: string;
    disclaimer: string;
    rights: string;
    emergencyNotice: string;
  };
  status: {
    verified: string;
    placeholder: string;
    draft: string;
    reviewed: string;
  };
  labels: {
    language: string;
    switchLanguage: string;
    phone: string;
    address: string;
    hours: string;
    fee: string;
  };
}

export const en: TranslationDictionary = {
  nav: {
    home: 'Home',
    about: 'About Doctor',
    diabetesCare: 'Diabetes Care',
    conditions: 'Conditions',
    patientResources: 'Patient Resources',
    clinic: 'Chamber & Clinic',
    contact: 'Contact',
    bookAppointment: 'Book Appointment',
    search: 'Search',
    menu: 'Menu',
    closeMenu: 'Close Menu',
  },
  dropdown: {
    about: {
      overview: 'Biography & Philosophy',
      qualifications: 'Medical Qualifications',
      experience: 'Clinical Experience',
      expertise: 'Areas of Expertise',
      memberships: 'Professional Affiliations',
    },
    diabetesCare: {
      management: 'Comprehensive Care',
      prediabetes: 'Prediabetes & Remission',
      education: 'CGM & Sensor Training',
      lifestyle: 'Cardiometabolic Balance',
      complications: 'Organ Complication Screening',
    },
    conditions: {
      allConditions: 'All Metabolic Conditions',
      diabetes: 'Type 1 & Type 2 Diabetes',
      thyroid: 'Thyroid Disorders (TSH)',
      weightManagement: 'Weight & Obesity Management',
      metabolicHealth: 'Metabolic Syndrome & Lipids',
      other: 'Other Endocrine Conditions',
    },
    patientResources: {
      knowledgeHub: 'Resource Center',
      articles: 'Clinical Articles',
      faqs: 'Frequently Asked Questions',
      videos: 'Educational Videos',
      reports: 'Understanding Lab Reports (HbA1c)',
      guides: 'Patient Self-Care Guides',
    },
    clinic: {
      overview: 'Chamber Overview',
      facilities: 'Diagnostic Facilities',
      photos: 'Chamber Photographs',
      timings: 'OPD Consulting Hours',
      location: 'Directions & Location',
    },
  },
  cta: {
    bookAppointment: 'Book Appointment',
    callNow: 'Call Clinic',
    whatsApp: 'WhatsApp Booking',
    viewDetails: 'View Details',
    learnMore: 'Learn More',
    readArticle: 'Read Full Article',
    downloadGuide: 'Download Guide',
    search: 'Search Topics...',
  },
  footer: {
    tagline: 'Evidence-based diabetology, individualized glucose management, and holistic organ protection.',
    quickLinks: 'Navigation',
    clinicalFocus: 'Clinical Focus',
    chamberLogistics: 'Consultation Chambers',
    legal: 'Legal & Ethics',
    privacyPolicy: 'Privacy Policy',
    disclaimer: 'Medical Disclaimer',
    rights: 'All rights reserved.',
    emergencyNotice: 'For acute emergencies (loss of consciousness, severe hypoglycemia, chest pain), visit the nearest emergency hospital immediately.',
  },
  status: {
    verified: 'Verified Credential',
    placeholder: '[CONTENT TO BE VERIFIED]',
    draft: 'Draft (Pending Doctor Sign-off)',
    reviewed: 'Clinically Reviewed',
  },
  labels: {
    language: 'Language',
    switchLanguage: 'Switch to Hindi (हिन्दी)',
    phone: 'Phone',
    address: 'Address',
    hours: 'Hours',
    fee: 'Consultation Fee',
  },
};
