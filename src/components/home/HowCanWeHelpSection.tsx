import React from 'react';
import { Link } from 'react-router-dom';
import {
  Droplets,
  TrendingUp,
  Flame,
  Scale,
  BookOpen,
  ArrowRight,
} from 'lucide-react';
import { Container } from '../common/Container';
import { useLanguage } from '../../context/useLanguage';

interface ServiceCardItem {
  id: string;
  icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>;
  title: { en: string; hi: string };
  description: { en: string; hi: string };
  link: string;
}

const SERVICE_ITEMS: ServiceCardItem[] = [
  {
    id: 'diabetes-management',
    icon: Droplets,
    title: { en: 'Diabetes Management', hi: 'डायबिटीज प्रबंधन' },
    description: {
      en: 'Personalised care plans for Type 1, Type 2 and gestational diabetes.',
      hi: 'टाइप 1, टाइप 2 एवं गर्भकालीन मधुमेह के लिए व्यक्तिगत देखभाल योजनाएं।',
    },
    link: '/diabetes-care/management',
  },
  {
    id: 'prediabetes-care',
    icon: TrendingUp,
    title: { en: 'Prediabetes Care', hi: 'प्री-डायबिटीज केयर' },
    description: {
      en: 'Early detection and lifestyle interventions to prevent diabetes.',
      hi: 'प्रारंभिक पहचान और जीवनशैली हस्तक्षेप द्वारा मधुमेह से बचाव।',
    },
    link: '/diabetes-care/prediabetes',
  },
  {
    id: 'thyroid-disorders',
    icon: Flame,
    title: { en: 'Thyroid Disorders', hi: 'थायरॉयड विकार' },
    description: {
      en: 'Diagnosis and management of hypothyroidism, hyperthyroidism and other thyroid conditions.',
      hi: 'हाइपोथायरायडिज्म, हाइपरथायरायडिज्म एवं संबंधित थायरॉयड विकारों का निदान।',
    },
    link: '/conditions/thyroid',
  },
  {
    id: 'obesity-metabolic',
    icon: Scale,
    title: { en: 'Obesity & Metabolic Health', hi: 'मोटापा एवं मेटाबोलिक स्वास्थ्य' },
    description: {
      en: 'Integrated approach for weight management and metabolic syndrome.',
      hi: 'वैज्ञानिक वजन प्रबंधन एवं मेटाबोलिक सिंड्रोम नियंत्रण के लिए एकीकृत दृष्टिकोण।',
    },
    link: '/conditions/weight-management',
  },
  {
    id: 'patient-education',
    icon: BookOpen,
    title: { en: 'Patient Education', hi: 'रोगी शिक्षा एवं मार्गदर्शन' },
    description: {
      en: 'Guidance, resources and support to help you take charge of your health.',
      hi: 'स्वास्थ्य को समझने और नियंत्रित करने के लिए प्रमाणिक मार्गदर्शन व संसाधन।',
    },
    link: '/diabetes-care/education',
  },
];

export const HowCanWeHelpSection: React.FC = () => {
  const { localize, isHindi } = useLanguage();

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#FBF8F1] border-t border-[#E8E2D5]/70">
      <Container size="xl">
        {/* Section Header with Centered Badge */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10 sm:mb-12">
          {/* Centered Pill Badge */}
          <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-[#F5EFE6] border border-[#E8E2D5] text-[#B8862B] text-xs font-bold tracking-wider uppercase shadow-2xs">
            <span>{isHindi ? 'हमारी सेवाएं' : 'OUR SERVICES'}</span>
          </div>

          {/* Heading with last words in Deep Green */}
          <h2 className="font-serif font-bold text-2xl sm:text-3xl lg:text-[38px] text-[#1B2A26] leading-tight">
            <span>{isHindi ? 'समग्र स्वास्थ्य के लिए ' : 'Comprehensive Care for '}</span>
            <span className="text-[#0F5C4A]">{isHindi ? 'विशिष्ट देखभाल' : 'Your Health'}</span>
          </h2>

          {/* Subheading */}
          <p className="text-xs sm:text-sm text-[#4A5753] max-w-lg mx-auto font-normal">
            {isHindi
              ? 'स्वस्थ भविष्य के लिए विशेषज्ञ निदान, उपचार एवं दीर्घकालिक स्वास्थ्य प्रबंधन।'
              : 'Specialised diagnosis, treatment and long-term management for a healthier tomorrow.'}
          </p>
        </div>

        {/* Row of 5 Cards (5 on desktop, 2 on tablet, horizontal scroll on mobile) */}
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 overflow-x-auto pb-4 md:pb-0 no-scrollbar snap-x snap-mandatory">
          {SERVICE_ITEMS.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="w-[280px] sm:w-[320px] md:w-auto shrink-0 snap-start flex flex-col justify-between p-5 sm:p-6 rounded-[20px] bg-white border border-[#E8E2D5] shadow-[0_4px_20px_rgba(27,42,38,0.04)] hover:shadow-[0_12px_32px_rgba(15,92,74,0.10)] hover:-translate-y-1 hover:border-[#0F5C4A]/30 transition-all duration-200 group"
              >
                <div className="space-y-3.5">
                  {/* Circular Beige Icon Container */}
                  <div className="w-11 h-11 rounded-full bg-[#F5EFE6] border border-[#E8E2D5] flex items-center justify-center text-[#B8862B] group-hover:scale-105 group-hover:bg-[#E8F2EE] group-hover:text-[#0F5C4A] group-hover:border-[#0F5C4A]/20 transition-all duration-200">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>

                  {/* Title in Serif */}
                  <h3 className="font-serif font-bold text-base sm:text-lg text-[#1B2A26] group-hover:text-[#0F5C4A] transition-colors leading-snug">
                    {localize(service.title)}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-[13px] text-[#4A5753] leading-relaxed line-clamp-3">
                    {localize(service.description)}
                  </p>
                </div>

                {/* "Learn More →" Link */}
                <div className="pt-4 mt-4 border-t border-[#E8E2D5]/70">
                  <Link
                    to={service.link}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1B2A26] group-hover:text-[#0F5C4A] transition-colors"
                  >
                    <span>{isHindi ? 'और जानें' : 'Learn More'}</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default HowCanWeHelpSection;
