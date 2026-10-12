import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  Calendar,
  ArrowRight,
  ShieldAlert,
  Search,
} from 'lucide-react';
import { SEO } from '../../components/common/SEO';
import { Container } from '../../components/common/Container';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { MedicalDisclaimerBanner } from '../../components/common/MedicalDisclaimerBanner';
import { useLanguage } from '../../context/useLanguage';
import { PROBLEMS_DATA } from '../../data/problems';

export const KnowYourProblemPage: React.FC = () => {
  const { localize, isHindi, t } = useLanguage();
  const [selectedTopicId, setSelectedTopicId] = useState<string>(PROBLEMS_DATA[0]?.id || '');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTopics = PROBLEMS_DATA.filter((p) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    const title = localize(p.title).toLowerCase();
    const desc = localize(p.shortDesc).toLowerCase();
    return title.includes(query) || desc.includes(query);
  });

  const activeTopic =
    PROBLEMS_DATA.find((p) => p.id === selectedTopicId) ||
    filteredTopics[0] ||
    PROBLEMS_DATA[0];

  return (
    <>
      <SEO
        title="Know Your Problem — Patient Symptom & Health Education Guide | Dr. Soumya Sengupta"
        description="Educational health guidance for common concerns like frequent thirst, fatigue, weight changes, and high blood sugar. Non-diagnostic resource by Dr. Soumya Sengupta."
        canonicalPath="/patient-resources/know-your-problem"
      />

      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#EAF7FA]/70 via-[#FCFEFF] to-white border-b border-slate-200/80">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#65D9D0]/10 rounded-full blur-3xl pointer-events-none" />
        <Container size="xl" className="relative z-10">
          <Breadcrumb
            items={[
              { label: isHindi ? 'रोगी संसाधन' : 'Patient Resources', href: '/patient-resources' },
              { label: isHindi ? 'अपनी समस्या समझें' : 'Know Your Problem' },
            ]}
          />
          <div className="py-8 sm:py-12 max-w-3xl space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#EAF7FA] text-[#103F4A] border border-[#65D9D0]/40 shadow-xs">
              <AlertCircle className="w-3.5 h-3.5 text-[#103F4A]" />
              <span>{isHindi ? 'लक्षण एवं स्वास्थ्य शिक्षा' : 'PATIENT CONCERN GUIDE'}</span>
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#103F4A] tracking-tight leading-tight">
              {isHindi ? 'अपनी समस्या समझें' : 'Know Your Problem'}
            </h1>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
              {isHindi
                ? 'अत्यधिक प्यास, थकान, वजन में बदलाव या बढ़ी हुई शुगर जैसे आम स्वास्थ्य लक्षणों को समझने के लिए सरल एवं प्रामाणिक मार्गदर्शिका।'
                : 'Helpful educational guidance to help you understand common symptoms and prepare for your medical consultation.'}
            </p>
          </div>
        </Container>
      </div>

      <Container size="xl" className="py-12 space-y-10">
        <MedicalDisclaimerBanner />

        {/* Mandatory Prominent Non-Diagnostic Notice */}
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/90 border border-amber-200/90 text-amber-950 flex items-start gap-3.5 shadow-2xs">
          <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h3 className="font-bold text-amber-950 text-sm sm:text-base">
              {isHindi ? 'महत्वपूर्ण सूचना — यह डायग्नोस्टिक टूल नहीं है' : 'Important Notice — Educational Resource Only'}
            </h3>
            <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
              {isHindi
                ? '“यह जानकारी केवल सामान्य शिक्षा के लिए है और आपके लक्षणों के सटीक कारण का निर्धारण नहीं कर सकती है। उचित डॉक्टरी मूल्यांकन के लिए कृपया किसी योग्य चिकित्सक से परामर्श करें।”'
                : '“This information is for general education and cannot determine the cause of your symptoms. Please consult a healthcare professional for proper evaluation.”'}
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-md">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isHindi ? 'लक्षण खोजें (उदा. प्यास, थकान, वजन)...' : 'Search concern (e.g., thirst, fatigue, weight)...'}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#65D9D0]/40 focus:border-[#103F4A] shadow-2xs transition-all"
            />
          </div>
        </div>

        {/* Two-Column Problem Explorer */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Topics List */}
          <div className="lg:col-span-5 space-y-2.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#103F4A] mb-2">
              {isHindi ? 'स्वास्थ्य चिंता का चयन करें' : 'Select Health Concern'}
            </h2>

            <div className="space-y-2">
              {filteredTopics.map((topic) => {
                const isSelected = activeTopic?.id === topic.id;
                return (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => setSelectedTopicId(topic.id)}
                    className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                      isSelected
                        ? 'bg-[#103F4A] text-white border-[#103F4A] shadow-md'
                        : 'bg-white hover:bg-[#EAF7FA]/40 text-slate-800 border-slate-200 hover:border-[#65D9D0]/50'
                    }`}
                  >
                    <div className="space-y-1">
                      <span className="font-bold text-sm block leading-snug">
                        {localize(topic.title)}
                      </span>
                      <p
                        className={`text-xs line-clamp-1 ${
                          isSelected ? 'text-[#EAF7FA]' : 'text-slate-500'
                        }`}
                      >
                        {localize(topic.shortDesc)}
                      </p>
                    </div>
                    <ArrowRight
                      className={`w-4 h-4 shrink-0 mt-0.5 transition-transform ${
                        isSelected ? 'text-[#65D9D0] translate-x-1' : 'text-slate-400'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Active Topic Educational Details */}
          {activeTopic && (
            <div className="lg:col-span-7 space-y-6">
              <Card padding="lg" className="bg-white border-slate-200/90 shadow-2xs hover:border-[#65D9D0]/50 transition-all duration-200 space-y-6">
                {/* Header */}
                <div className="pb-4 border-b border-slate-100 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-[#EAF7FA] text-[#103F4A] border border-[#65D9D0]/30 shadow-xs">
                      {isHindi ? 'शैक्षणिक विषय' : 'Educational Topic'}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#103F4A]">
                    {localize(activeTopic.title)}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {localize(activeTopic.shortDesc)}
                  </p>
                </div>

                {/* Explanation */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#103F4A]">
                    {isHindi ? 'शरीर में क्या हो रहा है?' : 'What might be happening?'}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                    {localize(activeTopic.generalInfo)}
                  </p>
                </div>

                {/* Key Considerations / Self-care */}
                <div className="space-y-2.5 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#103F4A]">
                    {isHindi ? 'महत्वपूर्ण बातें और सावधानियां' : 'Helpful Things to Keep in Mind'}
                  </h4>
                  <div className="space-y-2">
                    {activeTopic.keyConsiderations.map((pt, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 hover:border-[#65D9D0]/30 transition-all"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#103F4A] shrink-0 mt-0.5" />
                        <span>{localize(pt)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Patient Safety Guidance Note */}
                <div className="p-3.5 rounded-xl bg-[#EAF7FA]/60 border border-[#65D9D0]/40 text-xs text-[#103F4A] flex items-start gap-2.5">
                  <HelpCircle className="w-4 h-4 text-[#103F4A] shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    {isHindi
                      ? 'ये लक्षण कई कारणों से हो सकते हैं। यदि आप चिंतित हैं, तो सटीक जांच के लिए डॉक्टर से चर्चा करने पर विचार करें।'
                      : 'These symptoms can occur for different reasons. If you are concerned, consider discussing them with your doctor.'}
                  </p>
                </div>

                {/* Action Links */}
                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-2 text-xs">
                    <Link
                      to={activeTopic.relatedPageLink}
                      className="px-3 py-2 rounded-lg bg-[#EAF7FA]/80 hover:bg-[#103F4A] text-[#103F4A] hover:text-white border border-[#65D9D0]/30 hover:border-[#103F4A] font-semibold transition-all flex items-center gap-1.5"
                    >
                      <span>{localize(activeTopic.relatedPageLabel)}</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5" />
                    </Link>

                    <Link
                      to={activeTopic.relatedResourceLink}
                      className="px-3 py-2 rounded-lg bg-[#EAF7FA]/80 hover:bg-[#103F4A] text-[#103F4A] hover:text-white border border-[#65D9D0]/30 hover:border-[#103F4A] font-semibold transition-all flex items-center gap-1.5"
                    >
                      <span>{localize(activeTopic.relatedResourceLabel)}</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5" />
                    </Link>
                  </div>

                  <Link to="/book-appointment">
                    <Button variant="primary" size="sm">
                      <Calendar className="w-3.5 h-3.5 mr-1.5" />
                      <span>{t('cta.bookAppointment')}</span>
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          )}
        </div>
      </Container>
    </>
  );
};
