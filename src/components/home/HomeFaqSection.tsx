import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck } from 'lucide-react';
import { Section } from '../common/Section';
import { Card } from '../common/Card';
import { useLanguage } from '../../context/useLanguage';

interface FaqItem {
  id: string;
  question: { en: string; hi: string };
  answer: { en: string; hi: string };
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    question: {
      en: 'What clinical conditions does Dr. Soumya Sengupta treat?',
      hi: 'डॉ. सौम्य सेनगुप्ता किन बीमारियों का उपचार करते हैं?',
    },
    answer: {
      en: 'Dr. Soumya Sengupta specializes in Type 1 and Type 2 Diabetes, Gestational Diabetes, Hypertension, Dyslipidemia (high cholesterol), Metabolic Syndrome, Diabetic Kidney Disease, and multi-organ cardiovascular and metabolic risk protection.',
      hi: 'डॉ. सौम्य सेनगुप्ता टाइप 1 व टाइप 2 डायबिटीज, गर्भकालीन डायबिटीज, उच्च रक्तचाप (Hypertension), डिसलिपिडेमिया (कोलेस्ट्रॉल), मेटाबॉलिक सिंड्रोम और मधुमेह जनित गुर्दा व हृदय सुरक्षा में विशेषज्ञता रखते हैं।',
    },
  },
  {
    id: 'faq-2',
    question: {
      en: 'What are the consultation timings at Cardio Diabetic Clinic, Chaibasa?',
      hi: 'कार्डियो डायबिटिक क्लिनिक, चाईबासा में परामर्श का समय क्या है?',
    },
    answer: {
      en: 'Regular consultation hours are Monday through Saturday: Morning slot from 10:00 AM to 2:00 PM, and Evening slot from 5:00 PM to 8:00 PM. Sundays are reserved for specialized diagnostic screening camps or prior booked appointments.',
      hi: 'नियमित ओपीडी का समय सोमवार से शनिवार: सुबह 10:00 AM से दोपहर 2:00 PM और शाम 5:00 PM से रात 8:00 PM है। रविवार को विशेष जांच शिविर अथवा पूर्व आरक्षित परामर्श रखे जाते हैं।',
    },
  },
  {
    id: 'faq-3',
    question: {
      en: 'Where is the clinic located, and what is the landmark?',
      hi: 'क्लिनिक कहां स्थित है और प्रमुख लैंडमार्क क्या है?',
    },
    answer: {
      en: 'The chamber is located at Amlatola, Post Box No. 20, Chaibasa – 833201, West Singhbhum, Jharkhand. Landmark: Near the Head Post Office, Amlatola. Complete GPS navigation is available via our Google Maps link.',
      hi: 'हमारा चेंबर अमलाटोला, पोस्ट बॉक्स नं. 20, चाईबासा – 833201, पश्चिमी सिंहभूम, झारखंड में स्थित है। प्रमुख लैंडमार्क: प्रधान डाकघर (Head Post Office) के समीप। गूगल मैप्स से सटीक रास्ता प्राप्त किया जा सकता है।',
    },
  },
  {
    id: 'faq-4',
    question: {
      en: 'What records and reports should I bring for my first consultation?',
      hi: 'पहले परामर्श के समय कौन सी रिपोर्ट्स और कागजात साथ लाएं?',
    },
    answer: {
      en: 'Please carry recent HbA1c reports, fasting and postprandial blood glucose logs, kidney function tests (serum creatinine, urine uACR if available), lipid profile, and a complete list of your current medications and dosages.',
      hi: 'कृपया हालिया HbA1c रिपोर्ट, खाली पेट व भोजन के बाद की शुगर रीडिंग, गुर्दे की जांच (सीरम क्रिएटिनिन / uACR), लिपिड प्रोफाइल तथा वर्तमान में चल रही सभी दवाइयों की सूची साथ लाएं।',
    },
  },
  {
    id: 'faq-5',
    question: {
      en: 'How can I schedule an appointment with Dr. Sengupta?',
      hi: 'डॉ. सेनगुप्ता के साथ परामर्श का समय कैसे बुक करें?',
    },
    answer: {
      en: 'You can submit the online appointment request form directly on this website, send a message to our chamber WhatsApp desk (+91 94311 14510), or call our clinic phone line (+91 6582 256446) during consultation hours.',
      hi: 'आप इस वेबसाइट पर ऑनलाइन अपॉइंटमेंट फॉर्म भर सकते हैं, हमारे चेंबर व्हाट्सएप (+91 94311 14510) पर संदेश भेज सकते हैं, या क्लिनिक फोन (+91 6582 256446) पर संपर्क कर सकते हैं।',
    },
  },
  {
    id: 'faq-6',
    question: {
      en: 'Does the clinic assist with Continuous Glucose Monitoring (CGM) and tailored diets?',
      hi: 'क्या क्लिनिक में निरंतर ग्लूकोज निगरानी (CGM) और अनुकूलित डाइट चार्ट मिलता है?',
    },
    answer: {
      en: 'Yes. We provide clinical interpretation for continuous glucose sensors (Ambulatory Glucose Profile / CGM), individualized nutritional guidance, hypoglycemia avoidance protocols, and realistic lifestyle modifications.',
      hi: 'हाँ। हम निरंतर ग्लूकोज मॉनिटरिंग (CGM / AGP) की विस्तृत व्याख्या, व्यक्ति-विशिष्ट पोषण सलाह, लो-शुगर (हाइपोग्लाइसीमिया) से बचाव और संतुलित जीवनशैली मार्गदर्शन प्रदान करते हैं।',
    },
  },
  {
    id: 'faq-7',
    question: {
      en: 'Are remote follow-up consultations available for existing patients?',
      hi: 'क्या पुराने मरीजों के लिए ऑनलाइन फॉलो-अप परामर्श उपलब्ध है?',
    },
    answer: {
      en: 'Yes, existing patients who require routine sugar log reviews or medication adjustments between in-person chamber visits can coordinate a structured follow-up consultation through our chamber desk.',
      hi: 'हाँ, पुराने मरीज जो नियमित शुगर समीक्षा या खुराक समायोजन चाहते हैं, वे चेंबर डेस्क के समन्वय से सुव्यवस्थित फॉलो-अप परामर्श प्राप्त कर सकते हैं।',
    },
  },
];

export const HomeFaqSection: React.FC = () => {
  const { language, isHindi } = useLanguage();
  const langKey = language === 'hi' ? 'hi' : 'en';
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  // Structured Data Schema for FAQPage
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question.en,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer.en,
      },
    })),
  };

  return (
    <Section
      eyebrow={isHindi ? 'अक्सर पूछे जाने वाले प्रश्न' : 'Frequently Asked Questions'}
      heading={isHindi ? 'मरीज परामर्श एवं क्लिनिक एफएक्यू' : 'Consultation, Timings & Clinical Care FAQ'}
      lede={
        isHindi
          ? 'डॉ. सौम्य सेनगुप्ता और कार्डियो डायबिटिक क्लिनिक से संबंधित सामान्य प्रश्नों के त्वरित उत्तर।'
          : 'Answers to common patient inquiries regarding appointment booking, consultation timings, reports, and diabetes management.'
      }
      containerSize="xl"
      className="bg-white border-b border-[#D7E5E6] py-10 sm:py-14 relative"
    >
      {/* Schema.org FAQPage Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-3xl mx-auto space-y-3">
        {FAQ_ITEMS.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <Card
              key={faq.id}
              padding="sm"
              className={`p-0 overflow-hidden border transition-all ${
                isOpen
                  ? 'border-[#0E5A6B] shadow-xs bg-white'
                  : 'border-[#D7E5E6] bg-[#F7FAFA] hover:border-[#0E5A6B]/50'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleAccordion(faq.id)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${faq.id}`}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0E5A6B] rounded-xl"
              >
                <span className="flex items-center gap-2.5 font-bold text-xs sm:text-sm text-[#1B2B34]">
                  <HelpCircle className="w-4 h-4 text-[#0E5A6B] shrink-0" aria-hidden="true" />
                  <span>{faq.question[langKey]}</span>
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-[#4F6470] shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-[#0E5A6B]' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>

              {isOpen && (
                <div
                  id={`faq-answer-${faq.id}`}
                  className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-[13px] text-[#4F6470] leading-relaxed border-t border-[#D7E5E6]/70 bg-white"
                >
                  <p className="mt-2.5">{faq.answer[langKey]}</p>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      <div className="mt-6 text-center text-xs text-[#4F6470] flex items-center justify-center gap-1.5">
        <ShieldCheck className="w-3.5 h-3.5 text-[#1E9E5A] shrink-0" />
        <span>
          {isHindi
            ? 'अतिरिक्त जानकारी हेतु आप सीधे चेंबर डेस्क पर फोन या व्हाट्सएप कर सकते हैं।'
            : 'For further queries or emergency guidelines, contact our chamber desk directly.'}
        </span>
      </div>
    </Section>
  );
};
