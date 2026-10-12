import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Flame, Scale, HeartPulse, ArrowRight } from 'lucide-react';
import { Section } from '../common/Section';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { DuotoneIcon } from '../common/DuotoneIcon';
import { useLanguage } from '../../context/useLanguage';

interface ClinicalFocusArea {
  id: string;
  title: { en: string; hi: string };
  description: { en: string; hi: string };
  icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>;
  link: string;
  badge: { en: string; hi: string };
  cta: { en: string; hi: string };
}

const FOCUS_AREAS: ClinicalFocusArea[] = [
  {
    id: 'diabetes',
    title: { en: 'Diabetes Care', hi: 'डायबिटीज केयर' },
    description: {
      en: 'Blood sugar stabilization, HbA1c control, and multi-organ protection.',
      hi: 'ब्लड शुगर नियंत्रण, HbA1c जांच और संपूर्ण अंग सुरक्षा।',
    },
    icon: Activity,
    link: '/conditions/diabetes',
    badge: { en: 'Primary Focus', hi: 'मुख्य फोकस' },
    cta: { en: 'Explore Diabetes Care', hi: 'डायबिटीज केयर देखें' },
  },
  {
    id: 'thyroid',
    title: { en: 'Thyroid Disorders', hi: 'थायरॉयड विकार' },
    description: {
      en: 'Hormonal evaluations for hypothyroidism, energy levels, and routine TSH tracking.',
      hi: 'हाइपोथायरायडिज्म, थकान और नियमित TSH जांच का चिकित्सकीय प्रबंधन।',
    },
    icon: Flame,
    link: '/conditions/thyroid',
    badge: { en: 'Hormones', hi: 'हार्मोन' },
    cta: { en: 'View Thyroid Guide', hi: 'थायरॉयड गाइड देखें' },
  },
  {
    id: 'weight-management',
    title: { en: 'Weight Management', hi: 'वजन प्रबंधन' },
    description: {
      en: 'Sustainable metabolic weight care without harmful crash diets.',
      hi: 'मेटाबॉलिज्म अनुसार स्वस्थ व टिकाऊ वजन प्रबंधन, बिना कड़े उपवास के।',
    },
    icon: Scale,
    link: '/conditions/weight-management',
    badge: { en: 'Metabolic Care', hi: 'मेटाबोलिक' },
    cta: { en: 'View Weight Program', hi: 'वजन प्रबंधन योजना देखें' },
  },
  {
    id: 'metabolic-health',
    title: { en: 'Metabolic & Heart', hi: 'मेटाबोलिक व दिल' },
    description: {
      en: 'Managing blood pressure, cholesterol, and protecting circulation.',
      hi: 'ब्लड प्रेशर, कोलेस्ट्रॉल नियंत्रण और धमनियों की सुरक्षा।',
    },
    icon: HeartPulse,
    link: '/conditions/metabolic-health',
    badge: { en: 'Circulation', hi: 'धमनियां' },
    cta: { en: 'View Heart & Lipid Care', hi: 'हृदय व लिपिड केयर देखें' },
  },
];

export const HowCanWeHelpSection: React.FC = () => {
  const { language, isHindi } = useLanguage();
  const langKey = language === 'hi' ? 'hi' : 'en';

  return (
    <Section
      eyebrow={isHindi ? 'क्लिनिकल विशेषज्ञता' : 'Clinical Focus'}
      heading={isHindi ? 'हम आपकी क्या मदद कर सकते हैं?' : 'How Can We Help?'}
      lede={
        isHindi
          ? 'मधुमेह, थायरॉयड और मेटाबॉलिक स्वास्थ्य के लिए सरल, साक्ष्य-आधारित देखभाल।'
          : 'Patient-friendly, evidence-based care for diabetes, thyroid, and metabolic vitality.'
      }
      containerSize="xl"
      className="bg-white border-b border-[#D7E5E6] py-10 sm:py-14 relative"
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {FOCUS_AREAS.map((area) => {
          const IconComponent = area.icon;
          return (
            <Card
              key={area.id}
              hoverable
              padding="sm"
              className="p-4 sm:p-5 flex flex-col justify-between bg-[#F7FAFA] border-[#D7E5E6] hover:border-[#0E5A6B]/50 shadow-xs hover:shadow-md transition-all duration-200 group relative"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <DuotoneIcon icon={IconComponent} size="md" />
                  <span className="text-[10px] font-bold text-[#0E5A6B] bg-[#E8F5F4] px-2 py-0.5 rounded-full border border-[#D7E5E6]">
                    {area.badge[langKey]}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-[#1B2B34] text-sm leading-snug group-hover:text-[#0E5A6B] transition-colors">
                    {area.title[langKey]}
                  </h3>
                  <p className="mt-1 text-xs text-[#4F6470] leading-relaxed font-normal">
                    {area.description[langKey]}
                  </p>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-[#D7E5E6]">
                <Link
                  to={area.link}
                  className="w-full flex items-center justify-between px-3 py-1.5 rounded-md bg-[#E8F5F4] text-[#0E5A6B] border border-[#D7E5E6] group-hover:bg-[#0E5A6B] group-hover:text-white group-hover:border-[#0E5A6B] transition-all duration-200 text-xs font-semibold"
                >
                  <span>{area.cta[langKey]}</span>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Redirection button to Conditions section */}
      <div className="mt-6 text-center">
        <Link to="/conditions">
          <Button variant="outline" size="sm" className="border-[#0E5A6B]/40 text-[#0E5A6B] hover:bg-[#0E5A6B] hover:text-white transition-all text-xs">
            <span>{isHindi ? 'सभी स्थितियां व विषय देखें' : 'View All Conditions & Health Topics'}</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </Button>
        </Link>
      </div>
    </Section>
  );
};
