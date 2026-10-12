import React from 'react';
import { Link } from 'react-router-dom';
import {
  Library,
  BookOpen,
  Activity,
  Heart,
  AlertTriangle,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Calendar,
  CheckCircle2,
} from 'lucide-react';
import { SEO } from '../../components/common/SEO';
import { Container } from '../../components/common/Container';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { MedicalDisclaimerBanner } from '../../components/common/MedicalDisclaimerBanner';
import { useLanguage } from '../../context/useLanguage';

export const DiabetesKnowledgeHubPage: React.FC = () => {
  const { isHindi, t } = useLanguage();

  const hubTopics = [
    {
      id: 'understanding',
      titleEn: 'Understanding Diabetes',
      titleHi: 'डायबिटीज की समझ',
      descriptionEn: 'Learn how your body digests food, what insulin does, and why blood sugar levels rise in Type 1, Type 2, and prediabetes.',
      descriptionHi: 'शरीर में भोजन के पाचन, इंसुलिन की भूमिका और टाइप 1 व टाइप 2 डायबिटीज में शुगर बढ़ने के कारणों को समझें।',
      icon: BookOpen,
      href: '/diabetes-care/education',
      keyPointsEn: ['How insulin works like a key', 'Difference between Type 1 and Type 2', 'What prediabetes means'],
      keyPointsHi: ['इंसुलिन कैसे चाबी की तरह काम करता है', 'टाइप 1 और 2 में अंतर', 'प्री-डायबिटीज की पहचान'],
    },
    {
      id: 'glucose-hba1c',
      titleEn: 'Blood Sugar & HbA1c',
      titleHi: 'ब्लड शुगर एवं HbA1c',
      descriptionEn: 'Demystifying fasting sugar, after-meal spikes, and why the 3-month HbA1c test gives a much clearer picture than daily finger-pricks.',
      descriptionHi: 'फास्टिंग शुगर, खाने के बाद के स्पाइक्स और यह समझें कि 3 महीने का HbA1c टेस्ट दैनिक जांच से अधिक महत्वपूर्ण क्यों है।',
      icon: Activity,
      href: '/patient-resources/understand-your-reports',
      keyPointsEn: ['What fasting & PP numbers mean', 'Why 3-month average protects organs', 'When to check readings at home'],
      keyPointsHi: ['फास्टिंग और भोजन बाद का सामान्य स्तर', '3 महीने का औसत अंगों को कैसे बचाता है', 'घर पर कब जांचें'],
    },
    {
      id: 'food-lifestyle',
      titleEn: 'Food & Lifestyle',
      titleHi: 'भोजन एवं जीवनशैली',
      descriptionEn: 'Positive, sustainable food habits without extreme crash diets. Practical advice on walking, restful sleep, and handling stress.',
      descriptionHi: 'बिना किसी कड़े उपवास के संतुलित थाली, नियमित टहलना, पर्याप्त नींद और तनाव नियंत्रण के आसान उपाय।',
      icon: Heart,
      href: '/diabetes-care/lifestyle',
      keyPointsEn: ['Balanced plates without starvation', 'Gentle post-meal walking benefits', 'Why quality sleep stabilizes glucose'],
      keyPointsHi: ['संतुलित भोजन के आसान नियम', 'खाने के बाद टहलने का लाभ', 'अच्छी नींद का शुगर पर असर'],
    },
    {
      id: 'diabetes-care',
      titleEn: 'Diabetes Care',
      titleHi: 'दैनिक डायबिटीज केयर',
      descriptionEn: 'Your everyday roadmap: medicine routines, keeping a simple home log, and partnering with your doctor for individualized care.',
      descriptionHi: 'रोजमर्रा की देखभाल: सही समय पर दवाएं, घर पर साधारण डायरी बनाना और डॉक्टर के साथ मिलकर काम करना।',
      icon: Sparkles,
      href: '/diabetes-care/management',
      keyPointsEn: ['Taking medications at consistent times', 'Keeping a 3-day home glucose log', 'Setting personal target goals'],
      keyPointsHi: ['नियमित समय पर दवाएं लेना', 'शुगर रीडिंग का साधारण रिकॉर्ड रखना', 'व्यक्तिगत लक्ष्य तय करना'],
    },
    {
      id: 'complications',
      titleEn: 'Complications & Prevention',
      titleHi: 'जटिलताएं एवं बचाव',
      descriptionEn: 'Calm, educational insights into protecting your eyes, kidneys, nerves, heart, and feet through routine preventive screenings.',
      descriptionHi: 'आंखों, गुर्दों, नसों, दिल और पैरों की नियमित सुरक्षा के लिए वार्षिक जांच और देखभाल के नियम।',
      icon: AlertTriangle,
      href: '/diabetes-care/complications',
      keyPointsEn: ['Annual eye and urine (uACR) tests', 'Daily foot checks for minor blisters', 'Why early detection stops damage'],
      keyPointsHi: ['वार्षिक आंख व यूरिन (uACR) जांच', 'पैरों की दैनिक साधारण देखभाल', 'समय पर जांच से पूर्ण सुरक्षा'],
    },
    {
      id: 'common-questions',
      titleEn: 'Common Questions',
      titleHi: 'अक्सर पूछे जाने वाले प्रश्न',
      descriptionEn: 'Friendly, concise answers to the questions patients ask most often about insulin myths, fruit consumption, and test preparation.',
      descriptionHi: 'मरीजों द्वारा सबसे ज्यादा पूछे जाने वाले सवाल: इंसुलिन के मिथक, फल खाना और टेस्ट की सही तैयारी।',
      icon: HelpCircle,
      href: '/patient-resources/faqs',
      keyPointsEn: ['Can people with diabetes eat fruit?', 'Is insulin a permanent failure?', 'How to prepare for morning lab tests'],
      keyPointsHi: ['क्या डायबिटीज में फल खा सकते हैं?', 'इंसुलिन से जुड़े आम भ्रम', 'सुबह के टेस्ट की तैयारी'],
    },
  ];

  return (
    <>
      <SEO
        title="Diabetes Knowledge Hub — Plain-English Diabetes Education | Dr. Soumya Sengupta"
        description="Explore our patient-friendly learning hub covering blood sugar basics, HbA1c, healthy nutrition, daily management, and complication prevention."
        canonicalPath="/patient-resources/diabetes-knowledge-hub"
      />

      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#EAF7FA]/70 via-[#FCFEFF] to-white border-b border-slate-200/80">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#65D9D0]/10 rounded-full blur-3xl pointer-events-none" />
        <Container size="xl" className="relative z-10">
          <Breadcrumb
            items={[
              { label: isHindi ? 'रोगी संसाधन' : 'Patient Resources', href: '/patient-resources' },
              { label: isHindi ? 'डायबिटीज नॉलेज हब' : 'Diabetes Knowledge Hub' },
            ]}
          />
          <div className="py-8 sm:py-12 max-w-3xl space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#EAF7FA] text-[#103F4A] border border-[#65D9D0]/40 shadow-xs">
              <Library className="w-3.5 h-3.5 text-[#103F4A]" />
              <span>{isHindi ? 'मरीज शिक्षा पुस्तकालय' : 'DIABETES LEARNING HUB'}</span>
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#103F4A] tracking-tight leading-tight">
              {isHindi ? 'डायबिटीज नॉलेज हब' : 'Diabetes Knowledge Hub'}
            </h1>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
              {isHindi
                ? 'डायबिटीज से जुड़ी हर जानकारी को सरल, उपयोगी और व्यावहारिक विषयों में व्यवस्थित किया गया है — बिना किसी जटिल मेडिकल भाषा के।'
                : 'Clear, patient-friendly learning cards organized to help you navigate diabetes with confidence and clarity.'}
            </p>
          </div>
        </Container>
      </div>

      <Container size="xl" className="py-12 space-y-12">
        <MedicalDisclaimerBanner />

        {/* 6 Core Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hubTopics.map((topic) => {
            const Icon = topic.icon;
            return (
              <Card
                key={topic.id}
                hoverable
                padding="lg"
                className="bg-white border-slate-200/90 shadow-2xs hover:border-[#65D9D0]/60 hover:shadow-lg hover:shadow-[#103F4A]/5 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-[#EAF7FA] border border-[#65D9D0]/30 text-[#103F4A] flex items-center justify-center group-hover:scale-105 transition-transform shadow-xs">
                    <Icon className="w-5 h-5 text-[#103F4A]" />
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-[#103F4A] group-hover:text-[#103F4A] transition-colors">
                      {isHindi ? topic.titleHi : topic.titleEn}
                    </h2>
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {isHindi ? topic.descriptionHi : topic.descriptionEn}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#103F4A]/80 block mb-1.5">
                      {isHindi ? 'मुख्य विषय:' : 'Key Topics:'}
                    </span>
                    <ul className="space-y-1 text-xs text-slate-600">
                      {(isHindi ? topic.keyPointsHi : topic.keyPointsEn).map((pt, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#103F4A] shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-5 mt-5 border-t border-slate-100">
                  <Link
                    to={topic.href}
                    className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg bg-[#EAF7FA]/80 text-[#103F4A] border border-[#65D9D0]/30 group-hover:bg-[#103F4A] group-hover:text-white group-hover:border-[#103F4A] shadow-2xs group-hover:shadow-md transition-all duration-200"
                  >
                    <span className="font-semibold text-xs sm:text-sm tracking-wide">
                      {isHindi ? 'विस्तार से पढ़ें' : 'Read Topic'}
                    </span>
                    <span className="w-6 h-6 rounded-full bg-white text-[#103F4A] group-hover:bg-white/20 group-hover:text-white border border-[#65D9D0]/40 group-hover:border-white/30 flex items-center justify-center transition-all duration-200 group-hover:translate-x-1 shadow-2xs shrink-0">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Doctor Consultation CTA */}
        <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-[#103F4A] via-[#0A262D] to-[#103F4A] text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md border border-[#103F4A]">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#65D9D0]">
              {isHindi ? 'परामर्श एवं मार्गदर्शन' : 'PATIENT GUIDANCE'}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              {isHindi ? 'क्या आपके मन में कोई व्यक्तिगत सवाल है?' : 'Have Questions About Your Diabetes Care?'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {isHindi
                ? 'डॉ. सौम्य सेनगुप्ता के साथ चेंबर में व्यक्तिगत परामर्श बुक करें और अपनी स्वास्थ्य रिपोर्टों की विस्तृत समीक्षा पाएं।'
                : 'Schedule a consultation with Dr. Soumya Sengupta at Cardio Diabetic Clinic in Chaibasa.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link to="/book-appointment">
              <Button variant="primary" size="lg" className="bg-[#65D9D0] text-[#103F4A] hover:bg-white font-semibold">
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
