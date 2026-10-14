import type { DoctorAchievement } from '../types';
import { CLINIC_IMAGES } from '../config/images';

export const ACHIEVEMENTS_DATA: DoctorAchievement[] = [
  {
    id: 'ach-1',
    title: {
      en: 'RSSDI JHCON 2026 Stage Presentation',
      hi: 'आरएसएसडीआई झरकॉन 2026 मंच प्रस्तुति',
    },
    organization: {
      en: 'Research Society for the Study of Diabetes in India',
      hi: 'रिसर्च सोसाइटी फॉर द स्टडी ऑफ डायबिटीज इन इंडिया',
    },
    year: '2026',
    description: {
      en: 'Stage presentation and academic participation at the RSSDI JHCON 2026 conference.',
      hi: 'आरएसएसडीआई झरकॉन 2026 राज्य सम्मेलन में विशेषज्ञ मंच प्रस्तुति एवं सहभागिता।',
    },
    category: 'academic',
    image: CLINIC_IMAGES.rssdiJhconAward,
  },
  {
    id: 'ach-2',
    title: {
      en: '19+ Years of Community Diabetic Screening',
      hi: '19+ वर्षों से सामुदायिक मधुमेह जांच शिविर',
    },
    organization: {
      en: 'Cardio Diabetic Clinic & Regional Health Outreach',
      hi: 'कार्डियो डायबिटिक क्लिनिक एवं क्षेत्रीय स्वास्थ्य पहल',
    },
    year: '2007 – Present',
    description: {
      en: 'Organized and led multi-specialty screening camps across Chaibasa and surrounding regions.',
      hi: 'चाईबासा और आसपास के क्षेत्रों में नियमित रूप से मधुमेह जांच शिविरों का सफल आयोजन।',
    },
    category: 'community',
    image: CLINIC_IMAGES.ccdsiConference,
  },
  {
    id: 'ach-3',
    title: {
      en: 'Continuous Organ Preservation & Awareness Programs',
      hi: 'निरंतर अंग सुरक्षा एवं रोगी जागरूकता अभियान',
    },
    organization: {
      en: 'Clinical Diabetology & Preventive Medicine',
      hi: 'क्लिनिकल डायबेटोलॉजी एवं प्रिवेंटिव मेडिसिन',
    },
    year: 'Ongoing',
    description: {
      en: 'Advocating early detection, lifestyle modification and patient education for a healthier community.',
      hi: 'स्वस्थ समुदाय के लिए शीघ्र पहचान, जीवनशैली बदलाव और रोगी शिक्षा का निरंतर प्रचार।',
    },
    category: 'screening',
    image: '/images/doctor-awareness-program.webp',
  },
];
