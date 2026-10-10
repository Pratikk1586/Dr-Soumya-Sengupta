import React from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  ArrowRight,
  Heart,
  BookOpen,
  Sparkles,
  AlertTriangle,
  Calendar,
  CheckCircle2,
} from 'lucide-react';
import { SEO } from '../../components/common/SEO';
import { Container } from '../../components/common/Container';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { MedicalDisclaimerBanner } from '../../components/common/MedicalDisclaimerBanner';
import { useLanguage } from '../../context/useLanguage';
import { AnimatedPancreas } from '../../components/pancreas';

export const DiabetesCarePage: React.FC = () => {
  const { isHindi, t } = useLanguage();

  const carePrograms = [
    {
      id: 'management',
      slug: 'management',
      titleEn: 'Diabetes Management',
      titleHi: 'डायबिटीज प्रबंधन',
      shortDescEn: 'What day-to-day diabetes care involves: tracking blood sugar, understanding HbA1c, healthy habits, and regular doctor follow-ups.',
      shortDescHi: 'दैनिक देखभाल के तरीके: ब्लड शुगर की निगरानी, HbA1c का अर्थ, स्वस्थ आदतें और डॉक्टर से नियमित परामर्श।',
      icon: Activity,
      tagEn: 'Daily Care',
      tagHi: 'दैनिक देखभाल',
      highlightsEn: ['Blood sugar & HbA1c checks', 'Personalized medical guidance', 'Questions to ask your doctor'],
      highlightsHi: ['ब्लड शुगर एवं HbA1c जांच', 'व्यक्तिगत चिकित्सकीय सलाह', 'डॉक्टर से पूछने योग्य सवाल'],
    },
    {
      id: 'prediabetes',
      slug: 'prediabetes',
      titleEn: 'Prediabetes',
      titleHi: 'प्री-डायबिटीज',
      shortDescEn: 'When blood sugar is slightly higher than normal but not yet in the diabetes range. Early attention can help protect your long-term health.',
      shortDescHi: 'जब शुगर सामान्य से थोड़ी अधिक हो लेकिन डायबिटीज की सीमा में न हो। सही समय पर ध्यान देने से सेहत सुरक्षित रहती है।',
      icon: Sparkles,
      tagEn: 'Early Steps',
      tagHi: 'शुरुआती कदम',
      highlightsEn: ['What borderline sugar means', 'Common risk factors to know', 'Simple, sustainable lifestyle changes'],
      highlightsHi: ['बॉर्डरलाइन शुगर का अर्थ', 'पहचानने योग्य मुख्य कारक', 'सरल व टिकाऊ जीवनशैली बदलाव'],
    },
    {
      id: 'education',
      slug: 'education',
      titleEn: 'Diabetes Education',
      titleHi: 'डायबिटीज शिक्षा',
      shortDescEn: 'A friendly learning hub explaining diabetes types, blood sugar, common medical terms, and everyday care in simple words.',
      shortDescHi: 'सरल भाषा में सीखें: डायबिटीज के प्रकार, ब्लड शुगर, आम मेडिकल शब्द और रोजमर्रा की देखभाल के नियम।',
      icon: BookOpen,
      tagEn: 'Learning Hub',
      tagHi: 'शिक्षा केंद्र',
      highlightsEn: ['Plain-English medical terms', 'How glucose works in the body', 'Common questions answered clearly'],
      highlightsHi: ['सरल शब्दों में मेडिकल जानकारी', 'शरीर में ग्लूकोज का काम', 'आम सवालों के स्पष्ट जवाब'],
    },
    {
      id: 'lifestyle',
      slug: 'lifestyle',
      titleEn: 'Diabetes & Lifestyle',
      titleHi: 'डायबिटीज एवं जीवनशैली',
      shortDescEn: 'Realistic, positive guidance for everyday living: balanced meals without extreme diets, gentle physical activity, sleep, and stress balance.',
      shortDescHi: 'व्यावहारिक और सकारात्मक मार्गदर्शन: बिना किसी कड़े परहेज के संतुलित भोजन, हल्का व्यायाम, अच्छी नींद और तनाव प्रबंधन।',
      icon: Heart,
      tagEn: 'Everyday Habits',
      tagHi: 'दैनिक आदतें',
      highlightsEn: ['Healthy eating without crash diets', 'Physical activity that fits your day', 'Restful sleep & stress reduction'],
      highlightsHi: ['संतुलित भोजन बिना कड़े परहेज के', 'दिनचर्या अनुसार हल्का व्यायाम', 'पर्याप्त नींद एवं तनाव नियंत्रण'],
    },
    {
      id: 'complications',
      slug: 'complications',
      titleEn: 'Diabetes Complications',
      titleHi: 'जटिलताओं से बचाव',
      shortDescEn: 'Understanding how high blood sugar can affect the eyes, kidneys, nerves, heart, and feet over time — and why routine check-ups protect you.',
      shortDescHi: 'जानें कि अनियंत्रित शुगर आंखों, गुर्दों, नसों, दिल और पैरों को कैसे प्रभावित कर सकती है — और नियमित जांच आपकी रक्षा कैसे करती है।',
      icon: AlertTriangle,
      tagEn: 'Organ Protection',
      tagHi: 'अंग सुरक्षा',
      highlightsEn: ['Eye, kidney, nerve & foot health', 'Why regular preventive checks matter', 'What to discuss during your visit'],
      highlightsHi: ['आंखों, गुर्दों, नसों और पैरों की देखभाल', 'नियमित जांच का महत्व', 'परामर्श में क्या चर्चा करें'],
    },
  ];

  return (
    <>
      <SEO
        title="Diabetes Care & Education — Dr. Soumya Sengupta"
        description="Patient-friendly diabetes guidance: Daily management, prediabetes, education hub, lifestyle balance, and complication prevention by Dr. Soumya Sengupta in Chaibasa."
        canonicalPath="/diabetes-care"
      />

      {/* Hero Header */}
      <div className="bg-[#faf9f6] border-b border-slate-200">
        <Container size="xl">
          <Breadcrumb items={[{ label: isHindi ? 'डायबिटीज केयर' : 'Diabetes Care' }]} />
          <div className="py-8 sm:py-12 max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#0f3d4a]/10 text-[#0f3d4a] border border-[#0f3d4a]/20">
              <Activity className="w-3.5 h-3.5" />
              <span>{isHindi ? 'मरीज शिक्षा एवं देखभाल' : 'PATIENT CARE & EDUCATION'}</span>
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#06181f] tracking-tight leading-tight">
              {isHindi ? 'डायबिटीज केयर' : 'Diabetes Care'}
            </h1>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
              {isHindi
                ? '“डायबिटीज को समझना इसे आत्मविश्वास के साथ प्रबंधित करने की दिशा में पहला कदम है।”'
                : '“Understanding diabetes is the first step toward managing it with confidence.”'}
            </p>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              {isHindi
                ? 'यह खंड आपको और आपके परिवार को स्पष्ट, व्यावहारिक और तनाव-मुक्त जानकारी प्रदान करने के लिए तैयार किया गया है।'
                : 'This section provides simple, compassionate, and practical guidance so you can take charge of your health without feeling overwhelmed.'}
            </p>
          </div>
        </Container>
      </div>

      <Container size="xl" className="py-12 space-y-12">
        <MedicalDisclaimerBanner />

        {/* 5 Core Navigation Cards */}
        <div className="space-y-4">
          <div className="max-w-2xl space-y-1">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#06181f] tracking-tight">
              {isHindi ? 'डायबिटीज के मुख्य विषय' : 'Key Diabetes Topics'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              {isHindi
                ? 'अपनी जरूरत के अनुसार किसी भी विषय पर क्लिक करके सरल भाषा में पूरी जानकारी पढ़ें।'
                : 'Click any topic below to explore clear, patient-friendly explanations.'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {carePrograms.map((prog) => {
              const Icon = prog.icon;
              return (
                <Card
                  key={prog.id}
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
                        {isHindi ? prog.tagHi : prog.tagEn}
                      </Badge>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#0f3d4a] transition-colors">
                        {isHindi ? prog.titleHi : prog.titleEn}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                        {isHindi ? prog.shortDescHi : prog.shortDescEn}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                        {isHindi ? 'मुख्य बिंदु:' : 'What You Will Learn:'}
                      </span>
                      <ul className="space-y-1 text-xs text-slate-600">
                        {(isHindi ? prog.highlightsHi : prog.highlightsEn).map((hl, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{hl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-5 mt-5 border-t border-slate-100">
                    <Link
                      to={`/diabetes-care/${prog.slug}`}
                      className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg bg-teal-50/70 text-[#0f3d4a] border border-teal-200/80 group-hover:bg-[#0f3d4a] group-hover:text-white group-hover:border-[#0f3d4a] shadow-2xs group-hover:shadow-md transition-all duration-200"
                    >
                      <span className="font-semibold text-xs sm:text-sm tracking-wide">
                        {isHindi ? 'विस्तार से पढ़ें' : 'Read Guide'}
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
        </div>

        {/* Interactive 3D Pancreas Anatomy & Endocrine System Section */}
        <section
          aria-labelledby="pancreas-interactive-heading"
          className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-6 overflow-hidden"
        >
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#0f3d4a]/10 text-[#0f3d4a]">
              {isHindi ? 'शरीर की कार्यप्रणाली' : 'HOW YOUR BODY WORKS'}
            </span>
            <h2
              id="pancreas-interactive-heading"
              className="text-2xl sm:text-3xl font-extrabold text-[#06181f] tracking-tight"
            >
              {isHindi ? 'अग्न्याशय (Pancreas) एवं इंसुलिन को समझें' : 'Interactive Anatomy: The Pancreas & Insulin'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              {isHindi
                ? 'अग्न्याशय शरीर का एक महत्वपूर्ण अंग है जो भोजन को पचाने और ब्लड शुगर को नियंत्रित करने के लिए इंसुलिन बनाता है।'
                : 'Hover or tap different parts of the pancreas below to explore how it produces insulin and keeps your energy balanced.'}
            </p>
          </div>

          <AnimatedPancreas />
        </section>

        {/* Bottom Consultation CTA */}
        <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-[#06181f] via-[#0f3d4a] to-[#124b59] text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#dff0f4]">
              {isHindi ? 'व्यक्तिगत परामर्श' : 'INDIVIDUALIZED MEDICAL CARE'}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              {isHindi ? 'अपनी शुगर को लेकर चिंतित हैं?' : 'Concerned About Your Blood Sugar Levels?'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {isHindi
                ? 'डॉ. सौम्य सेनगुप्ता के साथ चेंबर में व्यक्तिगत परामर्श बुक करें और अपनी स्वास्थ्य रिपोर्टों की विस्तृत समीक्षा पाएं।'
                : 'Book an in-person consultation with Dr. Soumya Sengupta at Cardio Diabetic Clinic in Chaibasa for a structured evaluation.'}
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
