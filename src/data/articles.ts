import type { Article } from '../types';

export const ARTICLES_DATA: Article[] = [
  {
    id: 'art-hba1c-basics',
    slug: 'understanding-hba1c-goals',
    title: {
      en: 'Demystifying HbA1c: Why Your 3-Month Average Matters More Than Daily Fluctuations',
      hi: 'HbA1c को समझें: दैनिक उतार-चढ़ाव की तुलना में 3 महीने का औसत क्यों महत्वपूर्ण है?',
    },
    excerpt: {
      en: 'Learn how glucose binds to hemoglobin proteins and why keeping this value near personalized targets protects kidneys, nerves, and vision.',
      hi: 'जानें कि ग्लूकोज लाल रक्त कोशिकाओं से कैसे जुड़ता है और यह जांच अंगों की सुरक्षा के लिए क्यों जरूरी है।',
    },
    category: { en: 'HbA1c', hi: 'HbA1c' },
    readTimeMinutes: 4,
    contentParagraphs: [
      {
        en: 'A standard capillary fingerprick test is a snapshot of a single point in time, affected by recent stress or food. In contrast, the Glycated Hemoglobin (HbA1c) test captures the full ambient glucose history over 90 to 120 days.',
        hi: 'ग्लूकोमीटर की जांच केवल उस समय का हाल बताती है। लेकिन HbA1c पिछले 3 महीनों की पूरी तस्वीर प्रस्तुत करता है।',
      },
      {
        en: 'When excess glucose circulates in the bloodstream, it permanently attaches to hemoglobin inside red blood cells. The higher your blood glucose, the greater the percentage of glycated hemoglobin.',
        hi: 'रक्त में जितना अधिक ग्लूकोज होगा, HbA1c उतना ही अधिक होगा।',
      },
      {
        en: 'Clinical trials demonstrate that maintaining individualized safe targets substantially decreases microvascular complication risks in kidneys, eyes, and peripheral nerves without increasing dangerous hypoglycemia.',
        hi: 'सुरक्षित सीमा में HbA1c बनाए रखने से आंखों, गुर्दों और नसों के नुकसान का खतरा बहुत कम हो जाता है।',
      },
    ],
    keyTakeaways: [
      { en: 'HbA1c reflects 2-3 months of ambient glucose exposure', hi: 'HbA1c 2-3 महीने के औसत नियंत्रण को दर्शाता है' },
      { en: 'Single day fingerpricks do not alter your 90-day HbA1c', hi: 'एक दिन की जांच से 3 महीने का औसत नहीं बदलता' },
      { en: 'Targets are always personalized by your physician', hi: 'सुरक्षित सीमा डॉक्टर द्वारा रोगी अनुसार तय की जाती है' },
    ],
    reviewStatus: 'draft',
    publishedAt: '2026-09-15',
    status: 'verified',
  },
  {
    id: 'art-low-blood-sugar',
    slug: 'managing-low-blood-sugar-safely',
    title: {
      en: 'Recognizing Hypoglycemia: Safe Emergency Recovery with the Rule of 15',
      hi: 'हाइपोग्लाइसीमिया को पहचानें: "15 के नियम" से सुरक्षित प्राथमिक उपचार',
    },
    excerpt: {
      en: 'Immediate steps for managing blood glucose drops below 70 mg/dL safely without triggering rebound spikes.',
      hi: 'शुगर 70 mg/dL से नीचे जाने पर तत्काल प्राथमिक उपचार के सरल और सुरक्षित उपाय।',
    },
    category: { en: 'Blood Sugar', hi: 'ब्लड शुगर' },
    readTimeMinutes: 5,
    contentParagraphs: [
      {
        en: 'Hypoglycemia occurs when blood glucose drops below 70 mg/dL. While chronic high blood sugar damages organs over years, acute low blood sugar requires immediate first-line response.',
        hi: 'जब ब्लड शुगर 70 mg/dL से नीचे चली जाए तो यह स्थिति तत्काल ध्यान देने योग्य होती है।',
      },
      {
        en: 'The internationally recognized "Rule of 15" recommends: consume exactly 15 grams of fast-acting simple carbohydrate (e.g. 3 teaspoons of table sugar dissolved in plain water or half cup of fruit juice), rest quietly for 15 minutes, then re-check glucose.',
        hi: '15 का नियम: 15 ग्राम सरल चीनी लें (जैसे 3 चम्मच चीनी पानी में), 15 मिनट आराम करें और फिर जांचें।',
      },
      {
        en: 'Avoid consuming fatty sweets like chocolate or pastries during an acute drop, because fats slow down carbohydrate absorption in the gut when fast glucose uptake is needed.',
        hi: 'लो शुगर में चॉकलेट या तैलीय मिठाइयों से बचें क्योंकि वसा से चीनी का अवशोषण धीमा हो जाता है।',
      },
    ],
    keyTakeaways: [
      { en: 'Recognize early tremors, sweating, fast heartbeat, or dizziness', hi: 'कंपकंपी, पसीना, घबराहट और चक्कर आने पर तुरंत जांचें' },
      { en: 'Treat with exactly 15g fast sugar; recheck after 15 minutes', hi: '15 ग्राम सरल चीनी लें और 15 मिनट बाद पुनः मापें' },
      { en: 'Always carry emergency glucose tablets or sugar pouches', hi: 'हमेशा अपने साथ चीनी या ग्लूकोज की पुड़िया रखें' },
    ],
    reviewStatus: 'draft',
    publishedAt: '2026-09-20',
    status: 'verified',
  },
  {
    id: 'art-diabetes-basics',
    slug: 'type-1-vs-type-2-diabetes-differences',
    title: {
      en: 'Understanding Diabetes: The Biological Differences Between Type 1 and Type 2',
      hi: 'डायबिटीज की समझ: टाइप 1 और टाइप 2 के बीच जैविक अंतर',
    },
    excerpt: {
      en: 'Explore why autoimmune beta-cell loss differs fundamentally from insulin resistance, and what it means for daily therapy.',
      hi: 'जानें कि ऑटोइम्यून इंसुलिन की कमी और इंसुलिन प्रतिरोध में क्या बुनियादी अंतर है।',
    },
    category: { en: 'Diabetes Basics', hi: 'डायबिटीज बेसिक्स' },
    readTimeMinutes: 5,
    contentParagraphs: [
      {
        en: 'In Type 1 diabetes, the immune system mistakenly targets and destroys the insulin-secreting beta cells of the pancreas, necessitating lifelong exogenous insulin therapy.',
        hi: 'टाइप 1 डायबिटीज में प्रतिरक्षा प्रणाली अग्न्याशय की इंसुलिन बनाने वाली कोशिकाओं को नष्ट कर देती है, जिससे इंसुलिन आवश्यक हो जाता है।',
      },
      {
        en: 'In Type 2 diabetes, the pancreas still produces insulin, but peripheral muscle, liver, and adipose tissues become resistant to its action, eventually tiring out pancreatic secretion over time.',
        hi: 'टाइप 2 में इंसुलिन बनता तो है, लेकिन शरीर की कोशिकाएं उसका सही उपयोग नहीं कर पातीं।',
      },
      {
        en: 'Understanding your specific diagnostic classification ensures appropriate therapeutic selection, avoiding misdirected treatment plans.',
        hi: 'सही प्रकार की पहचान से उपयुक्त चिकित्सा और जीवनशैली तय की जा सकती है।',
      },
    ],
    keyTakeaways: [
      { en: 'Type 1 is autoimmune absolute insulin deficiency', hi: 'टाइप 1 इंसुलिन की पूर्ण कमी की स्थिति है' },
      { en: 'Type 2 primarily involves insulin resistance and beta-cell exhaustion', hi: 'टाइप 2 में मुख्य रूप से इंसुलिन प्रतिरोध होता है' },
      { en: 'Therapy must match biological underlying mechanisms', hi: 'उपचार हमेशा रोग के मूल कारण के अनुसार होना चाहिए' },
    ],
    reviewStatus: 'draft',
    publishedAt: '2026-09-28',
    status: 'verified',
  },
  {
    id: 'art-diet-nutrition',
    slug: 'plate-method-balanced-carbohydrates',
    title: {
      en: 'The Diabetes Plate Method: Practical Carbohydrate Awareness for Indian Meals',
      hi: 'डायबिटीज प्लेट विधि: भारतीय भोजन में संतुलित कार्बोहाइड्रेट प्रबंधन',
    },
    excerpt: {
      en: 'A practical, non-restrictive visual framework for balancing rice, roti, dal, vegetables, and proteins without extreme deprivation.',
      hi: 'चावल, रोटी, दाल, हरी सब्जियों और प्रोटीन का सही संतुलन बिना किसी अत्यधिक परहेज के।',
    },
    category: { en: 'Diet & Nutrition', hi: 'आहार एवं पोषण' },
    readTimeMinutes: 6,
    contentParagraphs: [
      {
        en: 'Traditional Indian diets often derive 70–80% of daily calories from refined carbohydrates (white rice, polished wheat flour). Transitioning to visual portion control creates gentle glycemic stability.',
        hi: 'भारतीय भोजन में कार्बोहाइड्रेट की मात्रा अक्सर अधिक होती है। प्लेट को संतुलित करके शुगर को स्थिर रखा जा सकता है।',
      },
      {
        en: 'The Plate Method divides a standard 9-inch plate: fill half with non-starchy vegetables (greens, cucumbers, gourds, cauliflower), one-quarter with lean proteins (paneer, dal, fish, eggs, sprouts), and one-quarter with complex grains.',
        hi: 'प्लेट का आधा हिस्सा हरी सब्जियों से, एक चौथाई प्रोटीन (दाल, पनीर, अंडा) से और एक चौथाई हिस्सा अनाज से भरें।',
      },
      {
        en: 'Eating vegetables and proteins first before carbohydrates blunts post-meal glucose spikes by slowing gastric emptying rate.',
        hi: 'पहले सब्जियां और प्रोटीन खाने से भोजन के बाद अचानक शुगर बढ़ने की रफ्तार धीमी हो जाती है।',
      },
    ],
    keyTakeaways: [
      { en: 'Divide your plate into 50% vegetables, 25% protein, 25% complex grain', hi: 'प्लेट: 50% हरी सब्जियां, 25% प्रोटीन, 25% अनाज' },
      { en: 'Sequence meals: fiber and protein first, grain second', hi: 'सब्जियां और दाल पहले खाएं, रोटी या चावल बाद में' },
      { en: 'Avoid drinking sweetened juices or sodas with meals', hi: 'भोजन के साथ मीठे शरबत या जूस से बचें' },
    ],
    reviewStatus: 'draft',
    publishedAt: '2026-10-01',
    status: 'verified',
  },
  {
    id: 'art-lifestyle-sleep',
    slug: 'sleep-quality-and-morning-insulin-resistance',
    title: {
      en: 'Sleep Deprivation and Morning Sugar: How Night Rest Dictates Next-Day Glycemia',
      hi: 'नींद की कमी और सुबह की शुगर: रात का आराम दिन के स्वास्थ्य को कैसे तय करता है',
    },
    excerpt: {
      en: 'Understand how poor sleep elevates cortisol and growth hormone surges, triggering next-day insulin resistance.',
      hi: 'जानें कि अधूरी नींद तनाव हार्मोन बढ़ाकर इंसुलिन प्रतिरोध को कैसे बढ़ा देती है।',
    },
    category: { en: 'Lifestyle', hi: 'जीवनशैली' },
    readTimeMinutes: 4,
    contentParagraphs: [
      {
        en: 'Even a single night of fragmented or restricted sleep (under 5 hours) triggers a compensatory rise in cortisol, adrenaline, and inflammatory cytokines, reducing insulin sensitivity by up to 25%.',
        hi: 'नींद पूरी न होने पर शरीर में कोर्टिसोल बढ़ जाता है, जिससे कोशिकाएं इंसुलिन का असर कम स्वीकार करती हैं।',
      },
      {
        en: 'Patients with obstructive sleep apnea (OSA) experience frequent nocturnal oxygen drops, prompting liver glycogen dumping and morning fasting spikes.',
        hi: 'खर्राटे और रात में सांस में रुकावट से लिवर रात में अतिरिक्त ग्लूकोज छोड़ता है।',
      },
      {
        en: 'Establishing consistent bedtimes and screening for sleep apnea are essential pillars of holistic cardiometabolic care.',
        hi: 'नियमित सोने का समय और शांत वातावरण शुगर नियंत्रण का महत्वपूर्ण हिस्सा है।',
      },
    ],
    keyTakeaways: [
      { en: 'Aim for 7 to 8 hours of uninterrupted nocturnal sleep', hi: 'प्रतिदिन 7 से 8 घंटे की अच्छी नींद लें' },
      { en: 'Chronic loud snoring may indicate sleep apnea', hi: 'तेज खर्राटे स्लीप एप्निया का संकेत हो सकते हैं' },
      { en: 'Avoid blue-light phone screens 45 minutes before bedtime', hi: 'सोने से 45 मिनट पहले मोबाइल स्क्रीन से दूर रहें' },
    ],
    reviewStatus: 'draft',
    publishedAt: '2026-10-02',
    status: 'verified',
  },
  {
    id: 'art-complications-kidneys',
    slug: 'protecting-kidneys-early-diabetic-nephropathy',
    title: {
      en: 'Silent Kidney Damage: Why Annual uACR Testing Matters Long Before Symptoms Appear',
      hi: 'गुर्दे की मूक क्षति: लक्षण दिखने से पहले वार्षिक uACR जांच क्यों जरूरी है',
    },
    excerpt: {
      en: 'Kidney glomeruli filter blood constantly. Discover how microscopic protein leakage warns of strain years before serum creatinine rises.',
      hi: 'गुर्दे लगातार रक्त साफ करते हैं। जानें कि प्रोटीन का सूक्ष्म रिसाव सालों पहले कैसे चेतावनी देता है।',
    },
    category: { en: 'Complications', hi: 'जटिलताएं' },
    readTimeMinutes: 5,
    contentParagraphs: [
      {
        en: 'The kidneys contain millions of microscopic filtering units called nephrons. Over years of chronic elevated glucose and blood pressure, delicate glomerular capillaries become porous, leaking tiny amounts of albumin protein into urine.',
        hi: 'लंबे समय तक उच्च शुगर और बीपी रहने से गुर्दे के फिल्टर ढीले पड़ जाते हैं और पेशाब में प्रोटीन रिसने लगता है।',
      },
      {
        en: 'Standard blood tests for creatinine often stay within normal limits until more than 50% of renal function is already strained. An annual spot urine Albumin-to-Creatinine Ratio (uACR) detects microalbuminuria at its most reversible stage.',
        hi: 'ब्लड क्रिएटिनिन तब बढ़ता है जब काफी नुकसान हो चुका होता है, जबकि uACR शुरुआती चरण में ही पकड़ लेता है।',
      },
      {
        en: 'Modern pharmacological advancements (such as SGLT2 inhibitors and RAAS blockade) actively protect renal capillaries when introduced early.',
        hi: 'शुरुआती पहचान होने पर आधुनिक दवाओं से गुर्दे को सुरक्षित रखा जा सकता है।',
      },
    ],
    keyTakeaways: [
      { en: 'Complete a spot urine uACR test once every 12 months', hi: 'साल में एक बार यूरिन uACR जांच अवश्य कराएं' },
      { en: 'Keep both blood pressure and glucose within target ranges', hi: 'रक्तचाप और शुगर दोनों को संतुलित रखें' },
      { en: 'Do not wait for swelling in feet or facial puffiness', hi: 'पैरों या चेहरे पर सूजन आने का इंतजार न करें' },
    ],
    reviewStatus: 'draft',
    publishedAt: '2026-10-03',
    status: 'verified',
  },
  {
    id: 'art-prevention-prediabetes',
    slug: 'prediabetes-window-of-opportunity',
    title: {
      en: 'The Prediabetes Window: Halting Progression to Overt Diabetes',
      hi: 'प्रीडायबिटीज का अवसर: पूर्ण मधुमेह में बदलने से पहले रोकथाम',
    },
    excerpt: {
      en: 'An HbA1c between 5.7% and 6.4% is not a mild disease, but a golden window to preserve pancreatic beta-cell reserve.',
      hi: '5.7% से 6.4% के बीच का HbA1c अग्न्याशय की कोशिकाओं को बचाने का सबसे सुनहरा अवसर है।',
    },
    category: { en: 'Prevention', hi: 'रोकथाम' },
    readTimeMinutes: 4,
    contentParagraphs: [
      {
        en: 'Prediabetes means blood glucose is above normal reference limits but not yet in the diagnostic range for overt diabetes. During this stage, up to 50% of beta-cell secretory function is still intact.',
        hi: 'प्रीडायबिटीज का अर्थ है कि शुगर सामान्य से अधिक है पर अभी पूर्ण मधुमेह नहीं बना है। इस समय कोशिकाएं काफी हद तक सुरक्षित होती हैं।',
      },
      {
        en: 'Large-scale clinical diabetes prevention trials proved that losing 5–7% of initial body weight and brisk walking 150 minutes per week cuts progression risk by over 58%.',
        hi: 'वजन में केवल 5-7% की कमी और रोजाना 30 मिनट तेज टहलने से डायबिटीज का खतरा 58% तक टल जाता है।',
      },
      {
        en: 'Structured clinical guidance during prediabetes empowers individuals to achieve durable glycemic remission before vascular complications begin.',
        hi: 'समय पर उचित मार्गदर्शन से प्रीडायबिटीज को सामान्य स्थिति में वापस लाया जा सकता है।',
      },
    ],
    keyTakeaways: [
      { en: 'Prediabetes is reversible with structured lifestyle steps', hi: 'सही जीवनशैली से प्रीडायबिटीज को ठीक किया जा सकता है' },
      { en: 'Brisk walking 30 minutes, 5 days weekly makes a significant difference', hi: 'सप्ताह में 5 दिन 30 मिनट तेज टहलना बेहद लाभकारी है' },
      { en: 'Screen family members if there is a positive history', hi: 'पारिवारिक इतिहास होने पर परिजनों की भी जांच कराएं' },
    ],
    reviewStatus: 'draft',
    publishedAt: '2026-10-04',
    status: 'verified',
  },
  {
    id: 'art-awareness-myths',
    slug: 'common-diabetes-myths-debunked',
    title: {
      en: 'Common Diabetes Myths Debunked: Jaggery, Bitter Gourd, and Insulin Dependence',
      hi: 'डायबिटीज के आम भ्रम और सच: गुड़, करेला और इंसुलिन से जुड़े मिथक',
    },
    excerpt: {
      en: 'Separating scientific evidence from household misconceptions regarding natural sweeteners and medical treatments.',
      hi: 'प्राकृतिक मीठे और दवाओं से जुड़े घरेलू भ्रमों और वैज्ञानिक तथ्यों में अंतर समझें।',
    },
    category: { en: 'Awareness', hi: 'स्वास्थ्य जागरूकता' },
    readTimeMinutes: 5,
    contentParagraphs: [
      {
        en: 'Myth 1: "Jaggery (gur) or honey is safe for diabetes because it is natural." Fact: Jaggery consists of approximately 70–85% sucrose and spikes blood glucose almost as rapidly as refined white table sugar.',
        hi: 'भ्रम 1: "गुड़ या शहद प्राकृतिक है इसलिए सुरक्षित है।" सच: गुड़ में भी लगभग 75-85% सुक्रोज होता है और यह भी तेजी से शुगर बढ़ाता है।',
      },
      {
        en: 'Myth 2: "Drinking bitter gourd (karela) juice cures diabetes completely." Fact: While bitter gourd contains charantin which may exhibit mild hypoglycemic activity, it cannot replace missing insulin or resolve underlying systemic insulin resistance.',
        hi: 'भ्रम 2: "करेले का जूस डायबिटीज को जड़ से खत्म कर देता है।" सच: यह कोई जादुई इलाज नहीं है और डॉक्टर की दवाओं का विकल्प नहीं हो सकता।',
      },
      {
        en: 'Myth 3: "Starting insulin means failure and permanent addiction." Fact: Insulin is a natural body hormone. Using it when indicated rests overworked beta-cells and shields organs from glucotoxic damage.',
        hi: 'भ्रम 3: "इंसुलिन की आदत पड़ जाती है।" सच: इंसुलिन शरीर का प्राकृतिक हार्मोन है, जो अंगों को नुकसान से बचाने के लिए दिया जाता है।',
      },
    ],
    keyTakeaways: [
      { en: 'Jaggery and brown sugar still spike glucose levels', hi: 'गुड़ और शहद भी सफेद चीनी की तरह शुगर बढ़ाते हैं' },
      { en: 'Home remedies can complement, but never replace prescribed medicine', hi: 'घरेलू नुस्खे कभी भी चिकित्सकीय दवाओं का विकल्प नहीं हैं' },
      { en: 'Insulin is an essential hormone, not an addictive substance', hi: 'इंसुलिन शरीर का स्वाभाविक हार्मोन है, कोई लत नहीं' },
    ],
    reviewStatus: 'draft',
    publishedAt: '2026-10-05',
    status: 'verified',
  },
];
