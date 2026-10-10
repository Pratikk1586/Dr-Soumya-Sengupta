import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Stethoscope, HeartPulse, Activity, Scale, ShieldAlert, Calendar } from 'lucide-react';
import { SEO } from '../../components/common/SEO';
import { Container } from '../../components/common/Container';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { MedicalDisclaimerBanner } from '../../components/common/MedicalDisclaimerBanner';
import { useLanguage } from '../../context/useLanguage';

export const ConditionsListPage: React.FC = () => {
  const { isHindi, t } = useLanguage();

  const conditionsList = [
    {
      slug: 'diabetes',
      titleEn: 'Diabetes',
      titleHi: 'डायबिटीज (मधुमेह)',
      descEn: 'Understanding how the body handles blood sugar, common signs to watch for, and how daily care keeps you feeling healthy.',
      descHi: 'शरीर में ब्लड शुगर का संतुलन, पहचानने योग्य सामान्य लक्षण और दैनिक देखभाल के सरल उपाय।',
      icon: Activity,
      categoryEn: 'Metabolic Health',
      categoryHi: 'मेटाबोलिक स्वास्थ्य',
    },
    {
      slug: 'thyroid',
      titleEn: 'Thyroid Disorders',
      titleHi: 'थायरॉयड विकार',
      descEn: 'How the butterfly-shaped thyroid gland regulates energy, common symptoms of imbalance, and routine monitoring.',
      descHi: 'गर्दन में स्थित थायरॉयड ग्रंथि ऊर्जा कैसे नियंत्रित करती है और असंतुलन के लक्षणों की जांच।',
      icon: Stethoscope,
      categoryEn: 'Hormonal Health',
      categoryHi: 'हार्मोनल संतुलन',
    },
    {
      slug: 'weight-management',
      titleEn: 'Obesity / Weight Management',
      titleHi: 'वजन एवं मोटापा प्रबंधन',
      descEn: 'Respectful, supportive medical guidance for sustainable habits and understanding how metabolism affects weight.',
      descHi: 'सम्मानजनक और व्यावहारिक मार्गदर्शन — बिना कड़े उपवास के स्वस्थ और टिकाऊ वजन प्रबंधन।',
      icon: Scale,
      categoryEn: 'Metabolic Care',
      categoryHi: 'मेटाबोलिक देखभाल',
    },
    {
      slug: 'metabolic-health',
      titleEn: 'Metabolic Health',
      titleHi: 'मेटाबोलिक स्वास्थ्य',
      descEn: 'Exploring how blood sugar, blood pressure, cholesterol, and daily habits work together to protect your circulation.',
      descHi: 'ब्लड शुगर, ब्लड प्रेशर, कोलेस्ट्रॉल और जीवनशैली के आपसी तालमेल की सरल व्याख्या।',
      icon: HeartPulse,
      categoryEn: 'Cardiovascular & Lipids',
      categoryHi: 'हृदय एवं धमनियां',
    },
    {
      slug: 'other',
      titleEn: 'Other Conditions',
      titleHi: 'अन्य स्थितियां',
      descEn: 'Additional metabolic and endocrine topics evaluated by Dr. Soumya Sengupta at the clinic.',
      descHi: 'क्लिनिक में जांची जाने वाली अन्य हार्मोनल एवं चयापचय संबंधी समस्याएं।',
      icon: ShieldAlert,
      categoryEn: 'General Endocrine',
      categoryHi: 'सामान्य एंडोक्राइन',
    },
  ];

  return (
    <>
      <SEO
        title="Conditions Managed — Cardio Diabetic Clinic | Dr. Soumya Sengupta"
        description="Patient-friendly guides to diabetes, thyroid disorders, metabolic weight management, and cardiovascular health by Dr. Soumya Sengupta in Chaibasa."
        canonicalPath="/conditions"
      />

      <div className="bg-[#faf9f6] border-b border-slate-200">
        <Container size="xl">
          <Breadcrumb items={[{ label: isHindi ? 'रोग एवं समस्याएं' : 'Conditions' }]} />
          <div className="py-8 sm:py-12 max-w-3xl space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#0f3d4a]/10 text-[#0f3d4a] border border-[#0f3d4a]/20">
              <Stethoscope className="w-3.5 h-3.5" />
              <span>{isHindi ? 'मरीज स्वास्थ्य मार्गदर्शिका' : 'HEALTH CONDITIONS GUIDE'}</span>
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#06181f] tracking-tight leading-tight">
              {isHindi ? 'रोग एवं स्वास्थ्य समस्याएं' : 'Conditions & Health Topics'}
            </h1>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
              {isHindi
                ? 'स्पष्ट, सरल और मरीज-अनुकूल जानकारी — ताकि आप अपने लक्षणों और शरीर की कार्यप्रणाली को बेहतर समझ सकें।'
                : 'Clear, patient-friendly information to help you better understand your body, recognize common signs, and prepare for your consultation.'}
            </p>
          </div>
        </Container>
      </div>

      <Container size="xl" className="py-12 space-y-12">
        <MedicalDisclaimerBanner />

        {/* 5 Condition Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {conditionsList.map((cond) => {
            const Icon = cond.icon;
            return (
              <Card
                key={cond.slug}
                hoverable
                padding="lg"
                className="bg-white border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-xl bg-[#dff0f4] text-[#0f3d4a] flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5 text-[#0f3d4a]" />
                    </div>
                    <Badge variant="neutral" size="sm">
                      {isHindi ? cond.categoryHi : cond.categoryEn}
                    </Badge>
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-slate-900 group-hover:text-[#0f3d4a] transition-colors">
                      {isHindi ? cond.titleHi : cond.titleEn}
                    </h2>
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {isHindi ? cond.descHi : cond.descEn}
                    </p>
                  </div>
                </div>

                <div className="pt-5 mt-5 border-t border-slate-100">
                  <Link
                    to={`/conditions/${cond.slug}`}
                    className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg bg-teal-50/70 text-[#0f3d4a] border border-teal-200/80 group-hover:bg-[#0f3d4a] group-hover:text-white group-hover:border-[#0f3d4a] shadow-2xs group-hover:shadow-md transition-all duration-200"
                  >
                    <span className="font-semibold text-xs sm:text-sm tracking-wide">
                      {isHindi ? 'अधिक जानें' : 'Learn More'}
                    </span>
                    <span className="w-6 h-6 rounded-full bg-white text-[#0f3d4a] group-hover:bg-white/20 group-hover:text-white border border-teal-200/60 group-hover:border-white/30 flex items-center justify-center transition-all duration-200 group-hover:translate-x-1 shadow-2xs shrink-0">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Clinical Consultation CTA */}
        <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-[#06181f] via-[#0f3d4a] to-[#124b59] text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#dff0f4]">
              {isHindi ? 'विशेषज्ञ परामर्श' : 'CLINICAL EVALUATION'}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              {isHindi ? 'क्या आप इनमें से किसी समस्या का अनुभव कर रहे हैं?' : 'Experiencing Any of These Health Concerns?'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {isHindi
                ? 'डॉ. सौम्य सेनगुप्ता के साथ चेंबर में व्यक्तिगत परामर्श बुक करें और अपनी स्वास्थ्य रिपोर्टों की विस्तृत समीक्षा पाएं।'
                : 'Schedule a thorough, in-person consultation with Dr. Soumya Sengupta at Cardio Diabetic Clinic in Chaibasa.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link to="/book-appointment">
              <Button variant="primary" size="lg" className="bg-white text-[#0f3d4a] hover:bg-[#dff0f4]">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{t('cta.bookAppointment')}</span>
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
};
