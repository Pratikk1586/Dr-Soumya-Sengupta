import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Flame, Scale, HeartPulse, ArrowRight } from 'lucide-react';
import { Section } from '../common/Section';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { useLanguage } from '../../context/useLanguage';

interface ClinicalFocusArea {
  id: string;
  title: { en: string; hi: string };
  description: { en: string; hi: string };
  icon: React.FC<{ className?: string }>;
  link: string;
  badge: { en: string; hi: string };
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
      className="bg-white border-b border-slate-200/80 py-10 sm:py-14"
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {FOCUS_AREAS.map((area) => {
          const IconComponent = area.icon;
          return (
            <Card
              key={area.id}
              hoverable
              padding="sm"
              className="p-4 sm:p-5 flex flex-col justify-between border-slate-200/90 shadow-2xs hover:shadow-sm transition-all duration-200 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-lg bg-teal-50 text-[#0f3d4a] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <IconComponent className="w-4 h-4 text-[#0f3d4a]" aria-hidden="true" />
                  </div>
                  <span className="text-[10px] font-semibold text-teal-800 bg-teal-50/80 px-2 py-0.5 rounded border border-teal-200/60">
                    {area.badge[langKey]}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-[#0f3d4a] transition-colors">
                    {area.title[langKey]}
                  </h3>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed font-normal">
                    {area.description[langKey]}
                  </p>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100">
                <Link
                  to={area.link}
                  className="w-full flex items-center justify-between px-3 py-1.5 rounded-md bg-teal-50/70 text-[#0f3d4a] border border-teal-200/80 group-hover:bg-[#0f3d4a] group-hover:text-white group-hover:border-[#0f3d4a] transition-all duration-200 text-xs font-semibold"
                >
                  <span>{isHindi ? 'अधिक जानें' : 'Learn More'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Redirection button to Conditions section */}
      <div className="mt-6 text-center">
        <Link to="/conditions">
          <Button variant="outline" size="sm" className="border-[#0f3d4a]/30 hover:bg-[#0f3d4a] hover:text-white transition-all text-xs">
            <span>{isHindi ? 'सभी स्थितियां व विषय देखें' : 'View All Conditions & Health Topics'}</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </Button>
        </Link>
      </div>
    </Section>
  );
};
