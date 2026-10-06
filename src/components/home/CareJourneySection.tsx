import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  MessageSquare,
  Stethoscope,
  FileSpreadsheet,
  FileCheck2,
  Salad,
  RotateCcw,
} from 'lucide-react';
import { Section } from '../common/Section';
import { Card } from '../common/Card';
import { fadeUp, staggerContainer, reducedMotionVariants } from '../../utils/motion';
import { useLanguage } from '../../context/useLanguage';

interface JourneyStep {
  step: number;
  title: { en: string; hi: string };
  subtitle: { en: string; hi: string };
  description: { en: string; hi: string };
  icon: React.FC<{ className?: string }>;
}

const JOURNEY_STEPS: JourneyStep[] = [
  {
    step: 1,
    title: { en: 'Understand Concern', hi: 'समस्या को समझना' },
    subtitle: { en: 'Active Clinical Listening', hi: 'सहानुभूतिपूर्ण परामर्श' },
    description: {
      en: 'Detailed conversation regarding daily glycemic patterns, lifestyle constraints, family history, and personal treatment goals.',
      hi: 'दैनिक दिनचर्या, पारिवारिक इतिहास, शर्करा के स्तर और व्यक्तिगत लक्ष्यों पर विस्तृत चर्चा।',
    },
    icon: MessageSquare,
  },
  {
    step: 2,
    title: { en: 'Clinical Assessment', hi: 'क्लिनिकल परीक्षण' },
    subtitle: { en: 'Targeted Physical Examination', hi: 'शारीरिक स्वास्थ्य जांच' },
    description: {
      en: 'Assessment of blood pressure, visceral adiposity, peripheral pulse, and preliminary diabetic foot neuropathy screening.',
      hi: 'रक्तचाप, वजन, नाड़ी एवं पैरों में संवेदनशीलता (न्यूरोपैथी) की संपूर्ण जांच।',
    },
    icon: Stethoscope,
  },
  {
    step: 3,
    title: { en: 'Review Reports', hi: 'रिपोर्ट्स का विश्लेषण' },
    subtitle: { en: 'Biomarker Surveillance', hi: 'लैब डेटा का अध्ययन' },
    description: {
      en: 'Correlation of HbA1c, CGM traces, renal panel (uACR/eGFR), lipid profile, and thyroid function to map organ stress.',
      hi: 'HbA1c, ग्लूकोज प्रोफाइल, गुर्दे (uACR) और कोलेस्ट्रॉल रिपोर्ट का सटीक चिकित्सीय विश्लेषण।',
    },
    icon: FileSpreadsheet,
  },
  {
    step: 4,
    title: { en: 'Personalised Care Plan', hi: 'व्यक्तिगत उपचार योजना' },
    subtitle: { en: 'Customized Therapy Regimen', hi: 'अनुकूलित चिकित्सा' },
    description: {
      en: 'Formulation of tailored pharmacotherapy (oral antidiabetic agents or insulin regimens) optimized for safety and convenience.',
      hi: 'मरीज की जीवनशैली और स्वास्थ्य अनुसार दवाइयों या इंसुलिन की अनुकूल खुराक तय करना।',
    },
    icon: FileCheck2,
  },
  {
    step: 5,
    title: { en: 'Lifestyle & Treatment Guidance', hi: 'जीवनशैली व आहार मार्गदर्शन' },
    subtitle: { en: 'Actionable Self-Care Education', hi: 'व्यावहारिक स्वास्थ्य शिक्षा' },
    description: {
      en: 'Clear guidelines on carbohydrate distribution, safe physical exercise routines, hypoglycemia recognition, and CGM trends.',
      hi: 'संतुलित आहार, नियमित व्यायाम, लो-शुगर (हाइपोग्लाइसीमिया) से बचाव और ग्लूकोज प्रबंधन की शिक्षा।',
    },
    icon: Salad,
  },
  {
    step: 6,
    title: { en: 'Follow-up & Monitoring', hi: 'फॉलो-अप एवं निरंतर निगरानी' },
    subtitle: { en: 'Long-Term Organ Health', hi: 'दीर्घकालिक अंग सुरक्षा' },
    description: {
      en: 'Scheduled periodic reviews, continuous sensor adjustments, and preventive steps to maintain target glycemic equilibrium.',
      hi: 'समय-समय पर फॉलो-अप, रिपोर्ट्स की पुनः जांच और जटिलताओं से पूर्ण सुरक्षा सुनिश्चित करना।',
    },
    icon: RotateCcw,
  },
];

export const CareJourneySection: React.FC = () => {
  const { language } = useLanguage();
  const langKey = language === 'hi' ? 'hi' : 'en';
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = shouldReduceMotion ? reducedMotionVariants : staggerContainer(0.08);
  const cardVariants = shouldReduceMotion ? reducedMotionVariants : fadeUp;

  return (
    <Section
      eyebrow="Structured Clinical Pathway"
      heading="Patient Treatment & Care Journey"
      lede="A transparent, collaborative 6-step medical roadmap ensuring every patient understands their diagnosis, medication rationale, and progress markers."
      containerSize="xl"
      className="bg-white border-b border-slate-200/80"
    >
      {/* Accessible Ordered List */}
      <motion.ol
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 list-none p-0 m-0"
      >
        {JOURNEY_STEPS.map((step) => {
          const StepIcon = step.icon;
          return (
            <motion.li key={step.step} variants={cardVariants} className="flex">
              <Card
                hoverable
                padding="lg"
                className="w-full flex flex-col justify-between border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-200 relative overflow-hidden"
              >
                {/* Step indicator watermark */}
                <div className="absolute top-3 right-4 text-4xl font-black text-slate-100 select-none pointer-events-none">
                  0{step.step}
                </div>

                <div className="space-y-4 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0f3d4a] flex items-center justify-center font-bold text-sm shrink-0">
                      <StepIcon className="w-5 h-5 text-[#0f3d4a]" aria-hidden="true" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md">
                      Step {step.step}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 text-base leading-snug">
                      {step.title[langKey]}
                    </h3>
                    <p className="text-xs font-semibold text-[#0f3d4a] mt-0.5">
                      {step.subtitle[langKey]}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {step.description[langKey]}
                  </p>
                </div>
              </Card>
            </motion.li>
          );
        })}
      </motion.ol>
    </Section>
  );
};
