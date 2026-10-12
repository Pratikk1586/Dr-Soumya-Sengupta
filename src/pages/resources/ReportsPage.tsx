import React from 'react';
import { Link } from 'react-router-dom';
import {
  FileCheck2,
  ShieldAlert,
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

interface ReportGuide {
  id: string;
  nameEn: string;
  nameHi: string;
  testCode: string;
  whatIsItEn: string;
  whatIsItHi: string;
  whyCheckedEn: string;
  whyCheckedHi: string;
  whatItTellsEn: string;
  whatItTellsHi: string;
  whenToDiscussEn: string;
  whenToDiscussHi: string;
}

const REPORT_GUIDES: ReportGuide[] = [
  {
    id: 'hba1c',
    nameEn: 'HbA1c (Glycated Hemoglobin)',
    nameHi: 'HbA1c (ग्लाइकेटेड हीमोग्लोबिन)',
    testCode: 'HbA1c / Glycohemoglobin',
    whatIsItEn: 'A simple blood test that shows the average amount of glucose (sugar) attached to your red blood cells over their natural 2 to 3 month lifespan.',
    whatIsItHi: 'एक सामान्य ब्लड टेस्ट जो दिखाता है कि पिछले 2 से 3 महीनों में आपकी लाल रक्त कोशिकाओं पर औसतन कितना ग्लूकोज (शुगर) जुड़ा रहा है।',
    whyCheckedEn: 'Doctors use HbA1c to evaluate your long-term blood sugar control. Unlike daily finger-prick checks, HbA1c is not influenced by what you ate yesterday or whether you exercised this morning.',
    whyCheckedHi: 'डॉक्टर दीर्घकालिक शुगर नियंत्रण देखने के लिए HbA1c की जांच करते हैं। यह एक दिन के भोजन या व्यायाम के उतार-चढ़ाव से प्रभावित नहीं होता।',
    whatItTellsEn: 'It shows whether your overall blood sugar has been in a comfortable, safe range over the preceding months. A stable number close to your personalized target protects your eyes, kidneys, and nerves.',
    whatItTellsHi: 'यह बताता है कि पिछले महीनों में आपका संपूर्ण शुगर स्तर सुरक्षित सीमा में रहा या नहीं। सही स्तर आंखों, गुर्दों और नसों की रक्षा करता है।',
    whenToDiscussEn: 'Discuss your HbA1c whenever your test result is higher than your doctor’s recommended target, or if you are planning changes to your daily lifestyle or medicines.',
    whenToDiscussHi: 'जब भी आपकी रिपोर्ट डॉक्टर द्वारा बताए गए लक्ष्य से अधिक आए, या जब आप अपनी दवाओं में बदलाव की योजना बना रहे हों, तब डॉक्टर से चर्चा करें।',
  },
  {
    id: 'glucose',
    nameEn: 'Blood Glucose (Fasting & PP)',
    nameHi: 'ब्लड ग्लूकोज (फास्टिंग एवं खाने के बाद)',
    testCode: 'Fasting Plasma Glucose / Post-Prandial',
    whatIsItEn: 'Measurement of the direct sugar level in your bloodstream either after an 8–10 hour overnight fast (Fasting) or exactly 2 hours after starting a main meal (Post-Prandial).',
    whatIsItHi: 'रक्त में शुगर के तात्कालिक स्तर की जांच — या तो 8-10 घंटे खाली पेट (फास्टिंग) या भोजन शुरू करने के ठीक 2 घंटे बाद (पोस्ट-प्रांडियल)।',
    whyCheckedEn: 'Fasting glucose tells your doctor how well your liver and background insulin balance sugar overnight. Post-meal glucose shows how effectively your body handles carbohydrates from food.',
    whyCheckedHi: 'फास्टिंग से पता चलता है कि रात में आपका शरीर शुगर को कैसे संतुलित रखता है, और खाने के बाद की जांच भोजन के असर को दर्शाती है।',
    whatItTellsEn: 'It provides immediate snapshots of your current glucose balance, helping detect meal-related spikes or early morning highs.',
    whatItTellsHi: 'यह तात्कालिक स्थिति का स्पष्ट चित्र देता है, जिससे भोजन के बाद अचानक शुगर बढ़ने का पता चलता है।',
    whenToDiscussEn: 'Discuss your readings if your fasting number is consistently above 100–125 mg/dL, if post-meal numbers stay above 180 mg/dL, or if you feel shaky and low (below 70 mg/dL).',
    whenToDiscussHi: 'यदि खाली पेट शुगर लगातार 100 से ऊपर रहे, या खाने के बाद 180 से अधिक आए, या 70 से कम होकर घबराहट महसूस हो तो तुरंत डॉक्टर से बात करें।',
  },
  {
    id: 'cholesterol',
    nameEn: 'Cholesterol & Lipid Profile',
    nameHi: 'कोलेस्ट्रॉल एवं लिपिड प्रोफाइल',
    testCode: 'Total, LDL, HDL & Triglycerides',
    whatIsItEn: 'A panel of blood tests measuring different types of fats (lipids) in your circulation, including LDL (“bad” cholesterol), HDL (“good” protective cholesterol), and Triglycerides.',
    whatIsItHi: 'रक्त में विभिन्न प्रकार की वसा की जांच — जिसमें एलडीएल (हानिकारक कोलेस्ट्रॉल), एचडीएल (सुरक्षात्मक अच्छा कोलेस्ट्रॉल) और ट्राइग्लिसराइड्स शामिल हैं।',
    whyCheckedEn: 'Individuals with diabetes have a higher natural risk of arterial stiffness. Keeping blood fats balanced is one of the most effective ways to protect your heart and circulation.',
    whyCheckedHi: 'डायबिटीज में रक्त वाहिकाओं की सुरक्षा के लिए कोलेस्ट्रॉल का संतुलन अत्यंत आवश्यक है ताकि दिल का दौरा और स्ट्रोक से बचा जा सके।',
    whatItTellsEn: 'It shows whether excess fats might gradually narrow your blood vessels over time. High triglycerides and low HDL are especially common in metabolic insulin resistance.',
    whatItTellsHi: 'यह बताता है कि क्या धमनियों में रुकावट का कोई जोखिम है। मेटाबॉलिज्म धीमा होने पर ट्राइग्लिसराइड्स अक्सर बढ़ जाते हैं।',
    whenToDiscussEn: 'Review your lipid panel with your doctor at least once a year, particularly if your LDL is elevated or if you have a family history of heart conditions.',
    whenToDiscussHi: 'साल में कम से कम एक बार लिपिड जांच कराएं, खासकर यदि एलडीएल बढ़ा हुआ हो या परिवार में दिल की बीमारी का इतिहास हो।',
  },
  {
    id: 'blood-pressure',
    nameEn: 'Blood Pressure',
    nameHi: 'रक्तचाप (ब्लड प्रेशर)',
    testCode: 'Systolic / Diastolic (mmHg)',
    whatIsItEn: 'The measurement of the pressure your blood exerts against the walls of your blood vessels when your heart beats (systolic) and when it rests between beats (diastolic).',
    whatIsItHi: 'धमनियों की दीवारों पर रक्त के दबाव का माप — जब दिल धड़कता है (ऊपरी सिस्टोलिक) और जब आराम करता है (निचला डायस्टोलिक)।',
    whyCheckedEn: 'High blood pressure doubles the mechanical workload on delicate blood vessels in your kidneys, brain, and retina, accelerating diabetic complications.',
    whyCheckedHi: 'उच्च रक्तचाप गुर्दों, आंखों और मस्तिष्क की बारीक नसों पर दबाव बढ़ा देता है, इसलिए इसे नियंत्रित रखना बेहद जरूरी है।',
    whatItTellsEn: 'A reading below 130/80 mmHg indicates that your arteries and heart are functioning with comfortable, healthy resistance.',
    whatItTellsHi: '130/80 mmHg से नीचे की रीडिंग यह दर्शाती है कि आपकी धमनियां और दिल सुरक्षित दबाव में काम कर रहे हैं।',
    whenToDiscussEn: 'Discuss your blood pressure if home or clinic checks regularly read at or above 130/80 mmHg across several days.',
    whenToDiscussHi: 'यदि लगातार कई दिनों तक ब्लड प्रेशर 130/80 mmHg या उससे अधिक आए तो डॉक्टर से परामर्श करें।',
  },
  {
    id: 'bmi',
    nameEn: 'Body Mass Index (BMI)',
    nameHi: 'बॉडी मास इंडेक्स (BMI)',
    testCode: 'Weight (kg) / Height (m²)',
    whatIsItEn: 'A simple mathematical ratio comparing your weight to your height, evaluated alongside waist circumference to estimate overall body composition.',
    whatIsItHi: 'वजन और लंबाई का एक साधारण अनुपात, जिसे कमर के घेरे के साथ देखकर शरीर की बनावट और अतिरिक्त चर्बी का अनुमान लगाया जाता है।',
    whyCheckedEn: 'In South Asian populations, excess fat stored around the abdomen (belly fat) is closely linked to insulin resistance, making cells less responsive to insulin.',
    whyCheckedHi: 'भारतीय आबादी में पेट के आसपास की अतिरिक्त चर्बी इंसुलिन प्रतिरोध को बढ़ावा देती है, इसलिए बीएमआई और कमर की माप पर ध्यान दिया जाता है।',
    whatItTellsEn: 'It offers a helpful broad indicator of metabolic balance. For Asian adults, a healthy BMI range is generally 18.5 to 22.9 kg/m².',
    whatItTellsHi: 'यह चयापचय स्वास्थ्य का एक सामान्य संकेत देता है। एशियाई वयस्कों के लिए स्वस्थ बीएमआई आमतौर पर 18.5 से 22.9 माना जाता है।',
    whenToDiscussEn: 'Discuss your BMI if your weight is creeping up or if you want personalized, non-judgmental guidance on sustainable everyday eating and movement.',
    whenToDiscussHi: 'यदि आपका वजन बढ़ रहा हो और आप स्वस्थ आदतों के बारे में डॉक्टर से सलाह लेना चाहते हैं तो परामर्श करें।',
  },
];

export const ReportsPage: React.FC = () => {
  const { isHindi, t } = useLanguage();

  return (
    <>
      <SEO
        title="Understand Your Lab Reports — Patient Guide to HbA1c, Glucose & Cholesterol | Dr. Soumya Sengupta"
        description="Plain-English explanations of clinical lab reports: HbA1c, blood glucose, cholesterol, blood pressure, and BMI. Educational guide by Dr. Soumya Sengupta."
        canonicalPath="/patient-resources/understand-your-reports"
      />

      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#EAF7FA]/70 via-[#FCFEFF] to-white border-b border-slate-200/80">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#65D9D0]/10 rounded-full blur-3xl pointer-events-none" />
        <Container size="xl" className="relative z-10">
          <Breadcrumb
            items={[
              { label: isHindi ? 'रोगी संसाधन' : 'Patient Resources', href: '/patient-resources' },
              { label: isHindi ? 'अपनी रिपोर्ट समझें' : 'Understand Your Reports' },
            ]}
          />
          <div className="py-8 sm:py-12 max-w-3xl space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#EAF7FA] text-[#103F4A] border border-[#65D9D0]/40 shadow-xs">
              <FileCheck2 className="w-3.5 h-3.5 text-[#103F4A]" />
              <span>{isHindi ? 'लैब रिपोर्ट मार्गदर्शिका' : 'LAB REPORT LITERACY'}</span>
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#103F4A] tracking-tight leading-tight">
              {isHindi ? 'अपनी क्लिनिकल लैब रिपोर्ट समझें' : 'Understand Your Lab Reports'}
            </h1>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
              {isHindi
                ? 'HbA1c, ब्लड शुगर, कोलेस्ट्रॉल, ब्लड प्रेशर और बीएमआई की सरल, व्यावहारिक व्याख्या — ताकि आप अपनी रिपोर्ट देखकर निश्चिंत रह सकें।'
                : 'Clear, plain-English explanations of common health measurements to help you understand what your numbers mean before your doctor consultation.'}
            </p>
          </div>
        </Container>
      </div>

      <Container size="xl" className="py-12 space-y-10">
        <MedicalDisclaimerBanner />

        {/* Educational Safety Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/90 border border-amber-200/90 text-amber-950 flex items-start gap-3.5 shadow-2xs">
          <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h3 className="font-bold text-amber-950 text-sm sm:text-base">
              {isHindi ? 'शैक्षणिक मार्गदर्शिका सूचना — कोई स्वचालित रिपोर्ट व्याख्या नहीं' : 'Educational Guide Only — No Automated Interpretations'}
            </h3>
            <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
              {isHindi
                ? '“यह पृष्ठ केवल सामान्य शैक्षणिक जानकारी के लिए है। सामान्य सीमाएं विभिन्न प्रयोगशालाओं और व्यक्तिगत स्वास्थ्य इतिहास के अनुसार भिन्न हो सकती हैं। अपनी व्यक्तिगत रिपोर्ट की व्याख्या और दवाओं के लिए कृपया सीधे डॉक्टर से परामर्श करें।”'
                : '“This page is for general health education only. Normal reference ranges vary between individual laboratories, analyzers, and your personal medical history. Always discuss your personal report with a qualified physician.”'}
            </p>
          </div>
        </div>

        {/* 5 Structured Biomarker Cards */}
        <div className="space-y-8 max-w-4xl">
          {REPORT_GUIDES.map((rep) => (
            <Card key={rep.id} padding="lg" className="bg-white border-slate-200/90 shadow-2xs hover:border-[#65D9D0]/50 transition-all duration-200 space-y-5">
              {/* Card Header */}
              <div className="flex items-start justify-between flex-wrap gap-3 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#EAF7FA] border border-[#65D9D0]/30 text-[#103F4A] flex items-center justify-center shrink-0 shadow-xs">
                    <FileCheck2 className="w-5 h-5 text-[#103F4A]" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-[#103F4A]">
                      {isHindi ? rep.nameHi : rep.nameEn}
                    </h2>
                    <span className="text-xs font-semibold text-[#103F4A]/80 block mt-0.5">
                      {rep.testCode}
                    </span>
                  </div>
                </div>

                <Badge variant="mint" size="sm">
                  {isHindi ? 'शैक्षणिक व्याख्या' : 'Educational Guide'}
                </Badge>
              </div>

              {/* 4 Required Structured Sections */}
              <div className="grid sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                {/* 1. WHAT IS IT? */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 hover:border-[#65D9D0]/30 transition-all">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#103F4A] block">
                    {isHindi ? '1. यह क्या है?' : 'WHAT IS IT?'}
                  </span>
                  <p className="text-slate-700 leading-relaxed font-normal">
                    {isHindi ? rep.whatIsItHi : rep.whatIsItEn}
                  </p>
                </div>

                {/* 2. WHY IS IT CHECKED? */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 hover:border-[#65D9D0]/30 transition-all">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#103F4A] block">
                    {isHindi ? '2. इसकी जांच क्यों होती है?' : 'WHY IS IT CHECKED?'}
                  </span>
                  <p className="text-slate-700 leading-relaxed font-normal">
                    {isHindi ? rep.whyCheckedHi : rep.whyCheckedEn}
                  </p>
                </div>

                {/* 3. WHAT DOES IT TELL YOU? */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 hover:border-[#65D9D0]/30 transition-all">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#103F4A] block">
                    {isHindi ? '3. यह क्या दर्शाता है?' : 'WHAT DOES IT TELL YOU?'}
                  </span>
                  <p className="text-slate-700 leading-relaxed font-normal">
                    {isHindi ? rep.whatItTellsHi : rep.whatItTellsEn}
                  </p>
                </div>

                {/* 4. WHEN SHOULD YOU DISCUSS IT? */}
                <div className="p-3.5 rounded-xl bg-[#EAF7FA]/60 border border-[#65D9D0]/40 space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#103F4A] block">
                    {isHindi ? '4. डॉक्टर से कब चर्चा करें?' : 'WHEN SHOULD YOU DISCUSS IT?'}
                  </span>
                  <p className="text-slate-700 leading-relaxed font-normal">
                    {isHindi ? rep.whenToDiscussHi : rep.whenToDiscussEn}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Doctor Consultation CTA */}
        <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-[#103F4A] via-[#0A262D] to-[#103F4A] text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md border border-[#103F4A]">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#65D9D0]">
              {isHindi ? 'रिपोर्ट समीक्षा' : 'LAB REPORT REVIEW'}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              {isHindi ? 'अपनी हालिया रिपोर्ट डॉक्टर को दिखाना चाहते हैं?' : 'Want a Physician Review of Your Lab Report?'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {isHindi
                ? 'डॉ. सौम्य सेनगुप्ता के साथ चेंबर में व्यक्तिगत परामर्श बुक करें और अपनी स्वास्थ्य रिपोर्टों की विस्तृत समीक्षा पाएं।'
                : 'Book an appointment with Dr. Soumya Sengupta at Cardio Diabetic Clinic in Chaibasa.'}
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
