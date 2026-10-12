import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { SEO } from '../../components/common/SEO';
import { Container } from '../../components/common/Container';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { EmptyState } from '../../components/common/EmptyState';
import { MedicalDisclaimerBanner } from '../../components/common/MedicalDisclaimerBanner';
import {
  CheckCircle2,
  Calendar,
  ArrowRight,
  Stethoscope,
  Activity,
  HeartPulse,
  Scale,
  ShieldAlert,
  AlertCircle,
} from 'lucide-react';
import { useLanguage } from '../../context/useLanguage';

interface ConditionDetailedContent {
  slug: string;
  titleEn: string;
  titleHi: string;
  categoryEn: string;
  categoryHi: string;
  overviewEn: string;
  overviewHi: string;
  subsections: {
    titleEn: string;
    titleHi: string;
    contentEn: string;
    contentHi: string;
    pointsEn?: string[];
    pointsHi?: string[];
  }[];
  symptomsEn?: string[];
  symptomsHi?: string[];
  monitoringEn?: string[];
  monitoringHi?: string[];
  placeholderNotice?: boolean;
}

const CONDITIONS_DETAILED_DATA: Record<string, ConditionDetailedContent> = {
  diabetes: {
    slug: 'diabetes',
    titleEn: 'Diabetes',
    titleHi: 'डायबिटीज (मधुमेह)',
    categoryEn: 'Metabolic Condition',
    categoryHi: 'मेटाबोलिक स्थिति',
    overviewEn: 'Diabetes is a common condition that affects how your body turns the food you eat into energy. Normally, the pancreas produces insulin, a hormone that acts like a key to let blood sugar into your cells. In diabetes, the body either does not make enough insulin or cannot use it effectively.',
    overviewHi: 'डायबिटीज एक आम स्थिति है जो यह प्रभावित करती है कि आपका शरीर भोजन को ऊर्जा में कैसे बदलता है। जब शरीर में पर्याप्त इंसुलिन नहीं बनता या कोशिकाएं इसका सही उपयोग नहीं कर पातीं, तो रक्त में शुगर का स्तर बढ़ जाता है।',
    subsections: [
      {
        titleEn: 'Basic types of diabetes',
        titleHi: 'डायबिटीज के मुख्य प्रकार',
        contentEn: 'Understanding the type helps guide the right everyday care approach:',
        contentHi: 'प्रकार को समझने से सही दैनिक देखभाल में मदद मिलती है:',
        pointsEn: [
          'Type 2 Diabetes: The most common type. The pancreas makes insulin, but the body’s cells resist it. Often managed with balanced meals, regular physical activity, oral medicines, and insulin if needed.',
          'Type 1 Diabetes: The immune system mistakenly stops the pancreas from producing insulin. Managed with daily insulin replacement.',
          'Prediabetes: Blood sugar is higher than normal but not yet in the diabetes range. Early lifestyle attention can prevent or delay progression.',
        ],
        pointsHi: [
          'टाइप 2 डायबिटीज: सबसे आम प्रकार। कोशिकाएं इंसुलिन का पूरा उपयोग नहीं कर पातीं। इसे संतुलित भोजन, व्यायाम, दवाओं और आवश्यकता पड़ने पर इंसुलिन से प्रबंधित किया जाता है।',
          'टाइप 1 डायबिटीज: शरीर में इंसुलिन का बनना बंद हो जाता है। इसमें दैनिक इंसुलिन की आवश्यकता होती है।',
          'प्री-डायबिटीज: शुगर सामान्य से अधिक लेकिन डायबिटीज से कम होती है। सही समय पर ध्यान देने से इसे आगे बढ़ने से रोका जा सकता है।',
        ],
      },
      {
        titleEn: 'How diabetes is generally monitored',
        titleHi: 'डायबिटीज की सामान्य निगरानी कैसे होती है?',
        contentEn: 'Monitoring gives you and your doctor clear feedback so adjustments can be made gently and safely:',
        contentHi: 'नियमित जांच से डॉक्टर दवाओं और दिनचर्या को सुरक्षित रूप से समायोजित कर सकते हैं:',
        pointsEn: [
          'Fasting & Post-Meal Blood Sugar: Checked at home or in a laboratory to understand day-to-day responses.',
          'HbA1c Blood Test: Shows your average blood sugar over the past 2 to 3 months.',
          'Annual Organ Check-ups: Simple urine tests (uACR) for kidneys, dilated eye checks, and foot sensation reviews.',
        ],
        pointsHi: [
          'फास्टिंग एवं खाने के बाद की शुगर: घर या लैब में जांच कर दैनिक स्थिति समझना।',
          'HbA1c टेस्ट: पिछले 2-3 महीनों के औसत नियंत्रण को देखना।',
          'वार्षिक अंग जांच: गुर्दों के लिए यूरिन टेस्ट (uACR), आंखों की जांच और पैरों की संवेदनशीलता की समीक्षा।',
        ],
      },
      {
        titleEn: 'Why regular follow-up matters',
        titleHi: 'नियमित फॉलो-अप क्यों जरूरी है?',
        contentEn: 'Diabetes is a journey, not a one-time event. Regular consultations with Dr. Sengupta ensure your medications remain safe, your organ health is actively protected, and your daily lifestyle fits your real life.',
        contentHi: 'डायबिटीज एक सतत देखभाल की मांग करती है। नियमित परामर्श से दवाएं सुरक्षित रहती हैं और जटिलताओं से पूर्ण बचाव संभव होता है।',
      },
    ],
    symptomsEn: [
      'Feeling very thirsty more often than usual',
      'Needing to urinate frequently, especially waking at night',
      'Feeling unusually tired or low on energy',
      'Blurry vision or dry mouth',
      'Minor cuts or sores that heal more slowly',
    ],
    symptomsHi: [
      'सामान्य से अधिक प्यास लगना',
      'बार-बार पेशाब जाना, खासकर रात में नींद खुलना',
      'असामान्य थकान और कमजोरी महसूस होना',
      'आंखों के आगे धुंधलापन या मुंह का सूखना',
      'छोटे घावों का धीरे भरना',
    ],
  },
  thyroid: {
    slug: 'thyroid',
    titleEn: 'Thyroid Disorders',
    titleHi: 'थायरॉयड विकार',
    categoryEn: 'Hormonal Balance',
    categoryHi: 'हार्मोनल संतुलन',
    overviewEn: 'The thyroid is a small, butterfly-shaped gland located at the front of your neck. It produces thyroid hormones that control your metabolism — the speed at which every cell in your body turns food into energy.',
    overviewHi: 'थायरॉयड गर्दन के निचले हिस्से में तितली के आकार की एक छोटी ग्रंथि है। यह ऐसे हार्मोन बनाती है जो आपके शरीर की चयापचय दर और ऊर्जा को नियंत्रित करते हैं।',
    subsections: [
      {
        titleEn: 'What thyroid disorders generally mean',
        titleHi: 'थायरॉयड विकारों का क्या अर्थ है?',
        contentEn: 'When the thyroid produces either too little or too much hormone, it can affect how energetic or sluggish you feel:',
        contentHi: 'जब थायरॉयड ग्रंथि बहुत कम या बहुत अधिक हार्मोन बनाती है, तो शरीर की गति प्रभावित होती है:',
        pointsEn: [
          'Underactive Thyroid (Hypothyroidism): The gland produces too little hormone. The body’s metabolism slows down, which can lead to tiredness, feeling cold, dry skin, and weight changes.',
          'Overactive Thyroid (Hyperthyroidism): The gland produces too much hormone. Metabolism speeds up, which can cause shakiness, rapid heartbeat, trouble sleeping, and feeling hot.',
          'Thyroid Nodules / Swelling: Small lumps or an enlarged thyroid gland (goiter) that require gentle physical examination and ultrasound review.',
        ],
        pointsHi: [
          'हाइपोथायरायडिज्म (कम सक्रिय): ग्रंथि कम हार्मोन बनाती है। शरीर की गति धीमी हो जाती है जिससे थकान, ठंड लगना और वजन में बदलाव हो सकता है।',
          'हाइपरथायरायडिज्म (अति सक्रिय): ग्रंथि बहुत ज्यादा हार्मोन बनाती है। धड़कन तेज होना, घबराहट और गर्मी न सह पाना इसके लक्षण हो सकते हैं।',
          'थायरॉयड नोड्यूल या सूजन: ग्रंथि में छोटी गांठें जो सामान्य जांच और अल्ट्रासाउंड से जांची जाती हैं।',
        ],
      },
      {
        titleEn: 'Why medical evaluation is important',
        titleHi: 'डॉक्टरी जांच क्यों जरूरी है?',
        contentEn: 'Symptoms like fatigue or weight changes can happen for many different reasons. It is impossible to diagnose a thyroid condition based on symptoms alone. A simple, inexpensive blood test called TSH (Thyroid Stimulating Hormone) gives accurate clarity.',
        contentHi: 'थकान या वजन में बदलाव कई कारणों से हो सकते हैं। केवल लक्षणों से थायरॉयड का पता नहीं लगाया जा सकता। एक साधारण टीएसएच (TSH) ब्लड टेस्ट से सटीक जानकारी मिल जाती है।',
      },
      {
        titleEn: 'General monitoring and daily care',
        titleHi: 'नियमित निगरानी एवं देखभाल',
        contentEn: 'If thyroid medication (such as levothyroxine) is prescribed, taking it first thing in the morning with plain water on an empty stomach allows for optimal absorption. Routine re-checks every 3 to 6 months ensure the dose stays comfortable for your body.',
        contentHi: 'यदि थायरॉयड की दवा दी जाती है, तो सुबह खाली पेट सादे पानी के साथ लेना सबसे बेहतर होता है। हर 3-6 महीने में साधारण जांच से सही खुराक बनी रहती है।',
      },
    ],
    symptomsEn: [
      'Unexplained fatigue or feeling drained',
      'Unusual sensitivity to cold or heat',
      'Dry skin, brittle nails, or hair thinning',
      'Mood shifts, brain fog, or sluggishness',
      'Changes in menstrual cycles in women',
    ],
    symptomsHi: [
      'अकारण थकान या कमजोरी',
      'अधिक ठंड या अधिक गर्मी लगना',
      'त्वचा का रूखापन या बालों का झड़ना',
      'सुस्ती या ध्यान केंद्रित करने में कठिनाई',
      'महिलाओं में माहवारी में अनियमितता',
    ],
  },
  'weight-management': {
    slug: 'weight-management',
    titleEn: 'Obesity / Weight Management',
    titleHi: 'वजन एवं मोटापा प्रबंधन',
    categoryEn: 'Metabolic Care',
    categoryHi: 'मेटाबोलिक देखभाल',
    overviewEn: 'Managing your weight is about health, comfort, and vitality — never about blame or unrealistic body standards. Our clinic provides compassionate, evidence-based guidance to help you make lasting, healthy improvements.',
    overviewHi: 'वजन प्रबंधन का उद्देश्य बेहतर स्वास्थ्य और ऊर्जावान महसूस करना है — किसी आत्म-दोष या कड़े उपवास के बिना। हमारा क्लिनिक आपको वैज्ञानिक और व्यावहारिक मार्गदर्शन प्रदान करता है।',
    subsections: [
      {
        titleEn: 'Medical factors that affect weight',
        titleHi: 'वजन को प्रभावित करने वाले चिकित्सकीय कारक',
        contentEn: 'Weight is not simply a matter of willpower. Many internal factors influence how the body stores and burns energy:',
        contentHi: 'वजन केवल खान-पान का मामला नहीं है। कई आंतरिक हार्मोनल कारण शरीर की चर्बी को प्रभावित करते हैं:',
        pointsEn: [
          'Insulin Resistance: When cells resist insulin, the body stores more glucose as fat, especially around the abdomen.',
          'Hormonal Imbalances: Thyroid slowdown (hypothyroidism), cortisol changes, or polycystic ovaries (PCOS) can make weight loss harder.',
          'Sleep and Chronic Stress: Lack of rest triggers hunger hormones (ghrelin and cortisol) that encourage cravings for quick sugar.',
          'Certain Medications: Some routine medicines can influence weight and can be reviewed with your doctor.',
        ],
        pointsHi: [
          'इंसुलिन प्रतिरोध: जब कोशिकाएं इंसुलिन का सही उपयोग नहीं करतीं, तो पेट के आसपास चर्बी जमा होने लगती है।',
          'हार्मोनल असंतुलन: थायरॉयड या अन्य हार्मोन में बदलाव वजन घटाने को कठिन बना सकते हैं।',
          'नींद की कमी और तनाव: कम सोने से भूख बढ़ाने वाले हार्मोन सक्रिय हो जाते हैं।',
          'कुछ नियमित दवाएं: कुछ दवाएं वजन पर असर डाल सकती हैं जिनकी डॉक्टर से समीक्षा की जा सकती है।',
        ],
      },
      {
        titleEn: 'Sustainable, non-judgmental habits',
        titleHi: 'टिकाऊ और स्वस्थ दैनिक आदतें',
        contentEn: 'We strongly advise against crash diets, dangerous slimming teas, or skipping meals. Instead, focus on adding fiber-rich vegetables, getting enough protein, drinking water, and finding physical activities you genuinely enjoy.',
        contentHi: 'हम किसी भी कड़े उपवास या अचानक वजन घटाने के दावों से बचने की सलाह देते हैं। हरी सब्जियां, पर्याप्त दाल/प्रोटीन और रोजाना टहलने जैसी आदतें ही स्थायी परिणाम देती हैं।',
      },
      {
        titleEn: 'The power of small changes',
        titleHi: 'छोटे बदलावों का बड़ा असर',
        contentEn: 'Research shows that even a modest 5% to 7% reduction in weight significantly lowers your risk of Type 2 diabetes, improves high blood pressure, and reduces strain on your joints.',
        contentHi: 'चिकित्सीय अध्ययनों से पता चलता है कि केवल 5% से 7% का हल्का वजन घटना भी शुगर, ब्लड प्रेशर और जोड़ों के दर्द में बहुत बड़ा सुधार लाता है।',
      },
    ],
    symptomsEn: [
      'Difficulty losing weight despite cutting portions',
      'Feeling sluggish or out of breath with mild exertion',
      'Joint aches in knees or ankles',
      'Daytime sleepiness or restless sleep with snoring',
    ],
    symptomsHi: [
      'कोशिश के बावजूद वजन कम न होना',
      'हल्के काम में सांस फूलना या सुस्ती',
      'घुटनों या जोड़ों में दर्द',
      'दिन में नींद आना या रात में खर्राटे',
    ],
  },
  'metabolic-health': {
    slug: 'metabolic-health',
    titleEn: 'Metabolic Health',
    titleHi: 'मेटाबोलिक स्वास्थ्य',
    categoryEn: 'Cardiovascular & Metabolic',
    categoryHi: 'हृदय एवं चयापचय',
    overviewEn: 'Metabolic health refers to how efficiently your body processes energy. When your blood sugar, blood pressure, cholesterol, and weight are in a harmonious balance, your heart, kidneys, and blood vessels stay resilient.',
    overviewHi: 'मेटाबोलिक स्वास्थ्य का अर्थ है कि आपका शरीर कितनी कुशलता से ऊर्जा का उपयोग करता है। जब शुगर, ब्लड प्रेशर और कोलेस्ट्रॉल संतुलित रहते हैं, तो दिल और धमनियां पूरी तरह सुरक्षित रहती हैं।',
    subsections: [
      {
        titleEn: 'How different health markers connect',
        titleHi: 'विभिन्न स्वास्थ्य संकेतकों का आपसी संबंध',
        contentEn: 'These key measurements do not exist in isolation — they work as an interconnected system:',
        contentHi: 'ये सभी जांचें एक दूसरे से गहराई से जुड़ी हुई हैं:',
        pointsEn: [
          'Blood Sugar & Insulin: When insulin resistance occurs, extra sugar stays in the blood, putting strain on delicate blood vessels.',
          'Blood Pressure: When arteries become stiff, blood pressure rises, making the heart work harder with every beat.',
          'Cholesterol & Triglycerides: Excess blood fats can gradually narrow arteries, multiplying the risk of heart events.',
          'Belly Fat (Waist Size): Excess intra-abdominal fat acts like an active organ, releasing chemicals that promote inflammation.',
        ],
        pointsHi: [
          'ब्लड शुगर और इंसुलिन: इंसुलिन प्रतिरोध से रक्त वाहिकाओं पर दबाव पड़ता है।',
          'ब्लड प्रेशर: धमनियों में कड़ापन आने से दिल को अधिक मेहनत करनी पड़ती है।',
          'कोलेस्ट्रॉल एवं ट्राइग्लिसराइड्स: रक्त में वसा की अधिकता से धमनियों में रुकावट का खतरा बढ़ता है।',
          'कमर का घेरा: पेट की अंदरूनी चर्बी सूजन और इंसुलिन प्रतिरोध को बढ़ावा देती है।',
        ],
      },
      {
        titleEn: 'Simple steps to support metabolic balance',
        titleHi: 'मेटाबोलिक संतुलन के सरल उपाय',
        contentEn: 'Protecting your metabolic health is achievable with practical everyday choices: eating home-cooked balanced meals, reducing deep-fried snacks, staying active with 30 minutes of walking, and getting routine lab screenings.',
        contentHi: 'घर का बना संतुलित भोजन, तली-भुनी चीजों में कमी, रोजाना 30 मिनट टहलना और समय पर लैब जांच कराना ही इसका सबसे सरल उपाय है।',
      },
    ],
    symptomsEn: [
      'Borderline high blood pressure (above 130/80 mmHg)',
      'High triglycerides or low good cholesterol (HDL)',
      'Waist measurement greater than 90 cm in men or 80 cm in women',
      'Slightly elevated fasting blood sugar',
    ],
    symptomsHi: [
      'बॉर्डरलाइन उच्च रक्तचाप',
      'बढ़े हुए ट्राइग्लिसराइड्स या कम अच्छा कोलेस्ट्रॉल',
      'कमर का बढ़ा हुआ घेरा',
      'फास्टिंग ब्लड शुगर का थोड़ा बढ़ा होना',
    ],
  },
  other: {
    slug: 'other',
    titleEn: 'Other Conditions',
    titleHi: 'अन्य स्थितियां',
    categoryEn: 'Clinical Scope',
    categoryHi: 'क्लिनिकल दायरा',
    overviewEn: 'Our clinic in Chaibasa focuses primarily on diabetes, thyroid, and metabolic care under the direct supervision of Dr. Soumya Sengupta.',
    overviewHi: 'चाईबासा स्थित हमारा क्लिनिक मुख्य रूप से डॉ. सौम्य सेनगुप्ता के मार्गदर्शन में डायबिटीज, थायरॉयड और मेटाबोलिक देखभाल पर केंद्रित है।',
    placeholderNotice: true,
    subsections: [
      {
        titleEn: 'Verified Clinical Focus',
        titleHi: 'सत्यापित क्लिनिकल फोकस',
        contentEn: 'To ensure accurate, trustworthy patient information, we only list medical conditions that are verified and actively managed at our chamber. We do not invent medical claims or services.',
        contentHi: 'मरीजों के विश्वास और प्रामाणिकता के लिए हम केवल उन्हीं स्थितियों की जानकारी देते हैं जिनका क्लिनिक में सत्यापित प्रबंधन किया जाता है।',
      },
    ],
  },
};

export const ConditionDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { isHindi, t } = useLanguage();

  const condition = (slug && CONDITIONS_DETAILED_DATA[slug]) || CONDITIONS_DETAILED_DATA['diabetes'];

  if (!condition) {
    return (
      <Container size="xl" className="py-20">
        <EmptyState
          title="Condition Information Not Found"
          description="The requested medical topic is not available or has been relocated."
          action={
            <Link to="/conditions">
              <Button variant="outline" size="sm">
                View All Conditions
              </Button>
            </Link>
          }
        />
      </Container>
    );
  }

  const getConditionIcon = () => {
    switch (condition.slug) {
      case 'thyroid':
        return <Stethoscope className="w-5 h-5 text-[#103F4A]" />;
      case 'weight-management':
        return <Scale className="w-5 h-5 text-[#103F4A]" />;
      case 'metabolic-health':
        return <HeartPulse className="w-5 h-5 text-[#103F4A]" />;
      case 'other':
        return <ShieldAlert className="w-5 h-5 text-[#103F4A]" />;
      case 'diabetes':
      default:
        return <Activity className="w-5 h-5 text-[#103F4A]" />;
    }
  };

  return (
    <>
      <SEO
        title={`${isHindi ? condition.titleHi : condition.titleEn} — Dr. Soumya Sengupta`}
        description={isHindi ? condition.overviewHi : condition.overviewEn}
        canonicalPath={`/conditions/${condition.slug}`}
      />

      {/* Header */}
      <div className="bg-gradient-to-b from-[#FCFEFF] via-[#F4FBFC] to-[#EAF7FA]/60 border-b border-slate-200/80 relative">
        <Container size="xl">
          <Breadcrumb
            items={[
              { label: isHindi ? 'रोग एवं समस्याएं' : 'Conditions', href: '/conditions' },
              { label: isHindi ? condition.titleHi : condition.titleEn },
            ]}
          />
          <div className="py-8 sm:py-12 max-w-3xl space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-[#EAF7FA] flex items-center justify-center border border-[#65D9D0]/30">
                {getConditionIcon()}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#103F4A]">
                {isHindi ? condition.categoryHi : condition.categoryEn}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#06181f] tracking-tight leading-tight">
              {isHindi ? condition.titleHi : condition.titleEn}
            </h1>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
              {isHindi ? condition.overviewHi : condition.overviewEn}
            </p>
          </div>
        </Container>
      </div>

      <Container size="xl" className="py-12 space-y-12">
        <MedicalDisclaimerBanner />

        {/* Clean Placeholder State for "other" condition */}
        {condition.placeholderNotice ? (
          <div className="max-w-2xl mx-auto py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-600 flex items-center justify-center mx-auto">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              {isHindi ? 'अतिरिक्त स्थितियां' : 'Other Clinical Conditions'}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-md mx-auto">
              {isHindi
                ? '“क्लिनिक में उपचार की जाने वाली अन्य स्थितियों के बारे में अधिक जानकारी जल्द ही यहां जोड़ी जाएगी।”'
                : '“More information about conditions treated at the clinic will be added here.”'}
            </p>
            <div className="pt-4 flex items-center justify-center gap-3">
              <Link to="/conditions">
                <Button variant="outline" size="sm">
                  {isHindi ? 'सभी मुख्य स्थितियां देखें' : 'View Main Conditions'}
                </Button>
              </Link>
              <Link to="/book-appointment">
                <Button variant="primary" size="sm">
                  {t('cta.bookAppointment')}
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Main Content Column */}
            <div className="lg:col-span-8 space-y-8">
              {/* Symptoms Notice */}
              {condition.symptomsEn && condition.symptomsEn.length > 0 && (
                <Card padding="lg" className="bg-white border-slate-200 shadow-2xs space-y-4">
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                    <span>{isHindi ? 'पहचानने योग्य सामान्य लक्षण' : 'Commonly Discussed Symptoms'}</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600">
                    {isHindi
                      ? 'ये लक्षण कई अलग-अलग कारणों से हो सकते हैं। उचित मूल्यांकन के लिए डॉक्टर से परामर्श करें:'
                      : 'These signs can occur for various health reasons. Discussing them with a doctor helps provide clear answers:'}
                  </p>
                  <div className="grid sm:grid-cols-2 gap-2.5 pt-1">
                    {(isHindi ? condition.symptomsHi : condition.symptomsEn)?.map((sym, idx) => (
                      <div key={idx} className="flex items-start gap-2 p-2.5 rounded-lg bg-amber-50/60 border border-amber-100 text-xs sm:text-sm text-slate-800">
                        <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                        <span>{sym}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Subsections */}
              {condition.subsections.map((sub, idx) => (
                <Card key={idx} padding="lg" className="bg-white border-slate-200 shadow-2xs space-y-4">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                    {isHindi ? sub.titleHi : sub.titleEn}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                    {isHindi ? sub.contentHi : sub.contentEn}
                  </p>

                  {sub.pointsEn && sub.pointsEn.length > 0 && (
                    <div className="space-y-2.5 pt-2">
                      {(isHindi ? sub.pointsHi : sub.pointsEn)?.map((pt, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs sm:text-sm text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              ))}
            </div>

            {/* Sidebar Column: Cross-Links */}
            <div className="lg:col-span-4 space-y-6">
              {/* Appointment Card */}
              <Card padding="lg" className="bg-gradient-to-b from-[#103F4A] to-[#0A262C] text-white shadow-md space-y-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#65D9D0]">
                  {isHindi ? 'डॉक्टर परामर्श' : 'CLINICAL APPOINTMENT'}
                </span>
                <h3 className="text-lg font-bold text-white leading-snug">
                  {isHindi
                    ? 'अपनी स्थिति की विस्तृत समीक्षा के लिए परामर्श बुक करें'
                    : 'Schedule a Consultation with Dr. Soumya Sengupta'}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {isHindi
                    ? 'कार्डियो डायबिटिक क्लिनिक, अमलाटोला, चाईबासा में इन-पर्सन परामर्श उपलब्ध है।'
                    : 'In-person consultations available at Cardio Diabetic Clinic, Amlatola, Chaibasa.'}
                </p>
                <Link to="/book-appointment" className="block w-full">
                  <Button variant="primary" size="md" className="w-full bg-white text-[#103F4A] hover:bg-[#EAF7FA]">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{t('cta.bookAppointment')}</span>
                  </Button>
                </Link>
              </Card>

              {/* Connected Patient Ecosystem Cross-Links */}
              <Card padding="md" className="bg-white border-slate-200 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  {isHindi ? 'जुड़े हुए उपयोगी संसाधन' : 'Connected Resources'}
                </h4>
                <div className="space-y-2 text-xs">
                  <Link
                    to="/diabetes-care"
                    className="p-2.5 rounded-lg bg-slate-50 hover:bg-[#EAF7FA]/50 border border-slate-100 hover:border-[#103F4A]/20 transition-all flex items-center justify-between group"
                  >
                    <span className="font-semibold text-slate-800 group-hover:text-[#103F4A]">
                      {isHindi ? 'डायबिटीज केयर' : 'Diabetes Care Programs'}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#103F4A]" />
                  </Link>

                  <Link
                    to="/patient-resources/understand-your-reports"
                    className="p-2.5 rounded-lg bg-slate-50 hover:bg-[#EAF7FA]/50 border border-slate-100 hover:border-[#103F4A]/20 transition-all flex items-center justify-between group"
                  >
                    <span className="font-semibold text-slate-800 group-hover:text-[#103F4A]">
                      {isHindi ? 'अपनी रिपोर्ट समझें' : 'Understand Your Reports'}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#103F4A]" />
                  </Link>

                  <Link
                    to="/patient-resources/articles"
                    className="p-2.5 rounded-lg bg-slate-50 hover:bg-[#EAF7FA]/50 border border-slate-100 hover:border-[#103F4A]/20 transition-all flex items-center justify-between group"
                  >
                    <span className="font-semibold text-slate-800 group-hover:text-[#103F4A]">
                      {isHindi ? 'चिकित्सीय लेख' : 'Helpful Articles'}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#103F4A]" />
                  </Link>

                  <Link
                    to="/patient-resources/faqs"
                    className="p-2.5 rounded-lg bg-slate-50 hover:bg-[#EAF7FA]/50 border border-slate-100 hover:border-[#103F4A]/20 transition-all flex items-center justify-between group"
                  >
                    <span className="font-semibold text-slate-800 group-hover:text-[#103F4A]">
                      {isHindi ? 'अक्सर पूछे जाने वाले सवाल' : 'Patient FAQs'}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#103F4A]" />
                  </Link>
                </div>
              </Card>

              {/* Back to all conditions */}
              <div className="text-center">
                <Link
                  to="/conditions"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#103F4A] hover:underline"
                >
                  <span>{isHindi ? '← सभी स्थितियां देखें' : '← Back to All Conditions'}</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </Container>
    </>
  );
};
