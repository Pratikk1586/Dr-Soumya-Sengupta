import type { Clinic } from '../types';
import { CLINIC_IMAGES } from '../config/images';

export const CLINICS_DATA: Clinic[] = [
  {
    id: 'clinic-cardio-diabetic-chaibasa',
    name: {
      en: 'Cardio Diabetic Clinic',
      hi: 'कार्डियो डायबिटिक क्लिनिक',
    },
    facilityType: {
      en: 'Primary Diabetes & Cardiovascular Consultation Chamber',
      hi: 'मुख्य मधुमेह एवं कार्डियो परामर्श केंद्र',
    },
    logo: CLINIC_IMAGES.logo,
    address: {
      line1: {
        en: 'Amlatola, Post Box No. 20',
        hi: 'अमलाटोला, पोस्ट बॉक्स नं. 20',
      },
      line2: {
        en: 'P.O. Chaibasa, West Singhbhum',
        hi: 'पोस्ट ऑफिस चाईबासा, पश्चिमी सिंहभूम',
      },
      city: { en: 'Chaibasa', hi: 'चाईबासा' },
      pincode: '833201',
      landmark: { en: 'Near Post Office, Amlatola', hi: 'अमलाटोला, चाईबासा' },
    },
    phone: '+91 6582 256446',
    whatsapp: '+91 94311 14510',
    email: 'saumyasengupta@yahoo.co.in',
    mapsUrl: 'https://maps.app.goo.gl/59pyGSNwQ8x2ruQ26',
    embedUrl: 'https://maps.google.com/maps?q=Cardio+Diabetic+Clinic,+Amlatola,+Chaibasa,+Jharkhand&t=&z=15&ie=UTF8&iwloc=&output=embed',
    timings: [
      {
        day: 'Monday',
        openingTime: '9:30 AM',
        closingTime: '3:00 PM',
        dayOfWeek: { en: 'Monday', hi: 'सोमवार' },
        timeSlot: { en: '9:30 AM – 3:00 PM', hi: 'सुबह 9:30 – दोपहर 3:00' },
        isAvailable: true,
      },
      {
        day: 'Tuesday',
        openingTime: '9:30 AM',
        closingTime: '3:00 PM',
        dayOfWeek: { en: 'Tuesday', hi: 'मंगलवार' },
        timeSlot: { en: '9:30 AM – 3:00 PM', hi: 'सुबह 9:30 – दोपहर 3:00' },
        isAvailable: true,
      },
      {
        day: 'Wednesday',
        openingTime: '9:30 AM',
        closingTime: '3:00 PM',
        dayOfWeek: { en: 'Wednesday', hi: 'बुधवार' },
        timeSlot: { en: '9:30 AM – 3:00 PM', hi: 'सुबह 9:30 – दोपहर 3:00' },
        isAvailable: true,
      },
      {
        day: 'Thursday',
        openingTime: '9:30 AM',
        closingTime: '3:00 PM',
        dayOfWeek: { en: 'Thursday', hi: 'गुरुवार' },
        timeSlot: { en: '9:30 AM – 3:00 PM', hi: 'सुबह 9:30 – दोपहर 3:00' },
        isAvailable: true,
      },
      {
        day: 'Friday',
        openingTime: '9:30 AM',
        closingTime: '3:00 PM',
        dayOfWeek: { en: 'Friday', hi: 'शुक्रवार' },
        timeSlot: { en: '9:30 AM – 3:00 PM', hi: 'सुबह 9:30 – दोपहर 3:00' },
        isAvailable: true,
      },
      {
        day: 'Saturday',
        openingTime: '9:30 AM',
        closingTime: '3:30 PM',
        dayOfWeek: { en: 'Saturday', hi: 'शनिवार' },
        timeSlot: { en: '9:30 AM – 3:30 PM', hi: 'सुबह 9:30 – दोपहर 3:30' },
        isAvailable: true,
      },
      {
        day: 'Sunday',
        openingTime: '9:30 AM',
        closingTime: '3:30 PM',
        dayOfWeek: { en: 'Sunday', hi: 'रविवार' },
        timeSlot: { en: '9:30 AM – 3:30 PM', hi: 'सुबह 9:30 – दोपहर 3:30' },
        isAvailable: true,
      },
    ],
    consultationFee: 'Contact chamber for consultation details',
    facilities: [
      {
        id: 'fac-1',
        name: { en: 'Comprehensive Diabetes & Glycemic Evaluation', hi: 'समग्र मधुमेह एवं ग्लूकोज जांच' },
        description: { en: 'Early diagnosis and management of Type 1, Type 2, and metabolic disorders', hi: 'शुरुआती पहचान एवं समग्र प्रबंधन' },
        status: 'verified',
      },
      {
        id: 'fac-2',
        name: { en: 'Cardiovascular Risk & Hypertension Monitoring', hi: 'हृदय जोखिम एवं रक्तचाप निगरानी' },
        description: { en: 'Integrated cardio-diabetic assessments to prevent vascular complications', hi: 'हृदय एवं रक्त वाहिकाओं की सुरक्षा' },
        status: 'verified',
      },
      {
        id: 'fac-3',
        name: { en: 'Dyslipidemia & Thyroid Function Management', hi: 'कोलेस्ट्रॉल एवं थायराइड प्रबंधन' },
        description: { en: 'Metabolic evaluation for lipid imbalances and hypothyroidism', hi: 'थायराइड एवं लिपिड संतुलन' },
        status: 'verified',
      },
      {
        id: 'fac-4',
        name: { en: 'Multi-Specialty Diabetic Screening Camps', hi: 'बहु-विशेषज्ञता मधुमेह जांच शिविर' },
        description: { en: 'Regular community outreach camps in Chaibasa and surrounding areas', hi: 'चाईबासा और आसपास के क्षेत्रों में नियमित शिविर' },
        status: 'verified',
      },
    ],
    status: 'verified',
  },
];
