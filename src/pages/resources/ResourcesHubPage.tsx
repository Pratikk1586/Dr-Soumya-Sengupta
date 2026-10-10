import React from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  FileText,
  HelpCircle,
  Video,
  FileCheck2,
  AlertCircle,
  Library,
  ArrowRight,
  Calendar,
} from 'lucide-react';
import { SEO } from '../../components/common/SEO';
import { Container } from '../../components/common/Container';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { MedicalDisclaimerBanner } from '../../components/common/MedicalDisclaimerBanner';
import { useLanguage } from '../../context/useLanguage';

export const ResourcesHubPage: React.FC = () => {
  const { isHindi, t } = useLanguage();

  const resourceCategories = [
    {
      titleEn: 'Diabetes Knowledge Hub',
      titleHi: 'डायबिटीज नॉलेज हब',
      descriptionEn: 'Organized, easy-to-browse learning cards covering diabetes types, blood sugar, everyday habits, and complications.',
      descriptionHi: 'डायबिटीज के प्रकार, ब्लड शुगर और रोजमर्रा की आदतों को सरल कार्ड्स के जरिए समझें।',
      href: '/patient-resources/diabetes-knowledge-hub',
      icon: Library,
      badgeEn: 'Learning Hub',
      badgeHi: 'शिक्षा केंद्र',
    },
    {
      titleEn: 'Know Your Problem',
      titleHi: 'अपनी समस्या समझें',
      descriptionEn: 'Educational guidance for common concerns like frequent thirst, fatigue, sudden weight shifts, and high sugar.',
      descriptionHi: 'प्यास, थकान, वजन में बदलाव और बढ़ी हुई शुगर जैसे आम लक्षणों की सरल समझ।',
      href: '/patient-resources/know-your-problem',
      icon: AlertCircle,
      badgeEn: 'Symptom Guide',
      badgeHi: 'लक्षण मार्गदर्शिका',
    },
    {
      titleEn: 'Understand Your Reports',
      titleHi: 'अपनी रिपोर्ट समझें',
      descriptionEn: 'Plain-language breakdowns of HbA1c, blood glucose, cholesterol, blood pressure, and BMI numbers.',
      descriptionHi: 'HbA1c, ब्लड शुगर, कोलेस्ट्रॉल, ब्लड प्रेशर और बीएमआई का सरल अर्थ समझें।',
      href: '/patient-resources/understand-your-reports',
      icon: FileCheck2,
      badgeEn: 'Lab Biomarkers',
      badgeHi: 'लैब रिपोर्ट्स',
    },
    {
      titleEn: 'Frequently Asked Questions (FAQs)',
      titleHi: 'अक्सर पूछे जाने वाले सवाल',
      descriptionEn: 'Direct, clear answers to everyday questions about medicines, lifestyle, fasting tests, and visits.',
      descriptionHi: 'दवाओं, जीवनशैली, फास्टिंग टेस्ट और क्लिनिक आने से जुड़े आम सवालों के उत्तर।',
      href: '/patient-resources/faqs',
      icon: HelpCircle,
      badgeEn: 'Patient Q&A',
      badgeHi: 'सवाल-जवाब',
    },
    {
      titleEn: 'Educational Articles',
      titleHi: 'चिकित्सीय लेख',
      descriptionEn: 'Helpful medical articles explaining blood sugar science, hypoglycemia recovery, and kidney protection.',
      descriptionHi: 'सरल भाषा में लिखे गए लेख जो शुगर नियंत्रण और अंग सुरक्षा को विस्तार से समझाते हैं।',
      href: '/patient-resources/articles',
      icon: FileText,
      badgeEn: 'Articles',
      badgeHi: 'लेख संग्रह',
    },
    {
      titleEn: 'Educational Videos',
      titleHi: 'शैक्षणिक वीडियो',
      descriptionEn: 'Doctor-guided video explanations on HbA1c, continuous glucose sensors, and everyday nutrition.',
      descriptionHi: 'डॉ. सेनगुप्ता द्वारा समझाए गए वीडियो — HbA1c, सेंसर तकनीक और दैनिक पोषण पर।',
      href: '/patient-resources/videos',
      icon: Video,
      badgeEn: 'Video Masterclasses',
      badgeHi: 'वीडियो क्लास',
    },
    {
      titleEn: 'Patient Self-Care Guides',
      titleHi: 'रोगी स्व-देखभाल गाइड',
      descriptionEn: 'Step-by-step practical advice for morning lab test preparation, daily foot checks, and home records.',
      descriptionHi: 'लैब टेस्ट की तैयारी, पैरों की दैनिक देखभाल और शुगर चार्ट बनाने के चरणबद्ध नियम।',
      href: '/patient-resources/guides',
      icon: BookOpen,
      badgeEn: 'Checklists',
      badgeHi: 'चेकलिस्ट',
    },
  ];

  return (
    <>
      <SEO
        title="Patient Resources & Health Hub — Dr. Soumya Sengupta"
        description="Helpful educational information to help you better understand your health, decode lab reports, and prepare for your consultation with Dr. Soumya Sengupta."
        canonicalPath="/patient-resources"
      />

      {/* Header */}
      <div className="bg-[#faf9f6] border-b border-slate-200">
        <Container size="xl">
          <Breadcrumb items={[{ label: isHindi ? 'रोगी संसाधन' : 'Patient Resources' }]} />
          <div className="py-8 sm:py-12 max-w-3xl space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#0f3d4a]/10 text-[#0f3d4a] border border-[#0f3d4a]/20">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{isHindi ? 'मरीज शिक्षा एवं संसाधन' : 'PATIENT LEARNING CENTER'}</span>
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#06181f] tracking-tight leading-tight">
              {isHindi ? 'रोगी संसाधन एवं शिक्षा केंद्र' : 'Patient Resources & Learning Center'}
            </h1>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
              {isHindi
                ? '“अपनी सेहत को बेहतर समझने और परामर्श की तैयारी के लिए उपयोगी एवं सरल जानकारी।”'
                : '“Helpful information to help you better understand your health and prepare for your consultation.”'}
            </p>
          </div>
        </Container>
      </div>

      <Container size="xl" className="py-12 space-y-12">
        <MedicalDisclaimerBanner />

        {/* 7 Resource Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resourceCategories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <Card
                key={idx}
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
                      {isHindi ? cat.badgeHi : cat.badgeEn}
                    </Badge>
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-slate-900 group-hover:text-[#0f3d4a] transition-colors">
                      {isHindi ? cat.titleHi : cat.titleEn}
                    </h2>
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {isHindi ? cat.descriptionHi : cat.descriptionEn}
                    </p>
                  </div>
                </div>

                <div className="pt-5 mt-5 border-t border-slate-100">
                  <Link
                    to={cat.href}
                    className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg bg-teal-50/70 text-[#0f3d4a] border border-teal-200/80 group-hover:bg-[#0f3d4a] group-hover:text-white group-hover:border-[#0f3d4a] shadow-2xs group-hover:shadow-md transition-all duration-200"
                  >
                    <span className="font-semibold text-xs sm:text-sm tracking-wide">
                      {isHindi ? 'संसाधन खोलें' : 'Explore Resource'}
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

        {/* Bottom Consultation Banner */}
        <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-[#06181f] via-[#0f3d4a] to-[#124b59] text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#dff0f4]">
              {isHindi ? 'परामर्श तैयारी' : 'DOCTOR CONSULTATION'}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              {isHindi ? 'क्या आपके पास अपनी हालिया रिपोर्ट है?' : 'Have Questions About Your Health Reports?'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {isHindi
                ? 'डॉ. सौम्य सेनगुप्ता के साथ चेंबर में व्यक्तिगत परामर्श बुक करें और अपनी रिपोर्टों की विस्तृत समीक्षा पाएं।'
                : 'Bring your recent laboratory reports to Cardio Diabetic Clinic in Chaibasa for a structured, evidence-based review.'}
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
