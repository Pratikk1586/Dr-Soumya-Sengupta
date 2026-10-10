import type { ProblemTopic } from '../types';

export const PROBLEMS_DATA: ProblemTopic[] = [
  {
    id: 'prob-frequent-thirst',
    slug: 'frequent-thirst',
    title: {
      en: 'Frequent Thirst',
      hi: 'अत्यधिक प्यास लगना',
    },
    shortDesc: {
      en: 'Feeling very thirsty throughout the day and waking up at night needing water.',
      hi: 'दिनभर अत्यधिक प्यास लगना और रात में बार-बार पानी पीने की जरूरत महसूस होना।',
    },
    generalInfo: {
      en: 'When blood sugar levels are higher than usual, the body tries to remove the extra sugar through urine. This can pull water out of your body tissues, making you feel constantly thirsty. Drinking water helps keep you hydrated, but if the thirst continues, having your blood sugar checked is a helpful next step.',
      hi: 'जब रक्त में शुगर का स्तर बढ़ जाता है, तो शरीर अतिरिक्त शुगर को पेशाब के जरिए निकालने की कोशिश करता है। इससे शरीर में पानी की कमी हो सकती है और बार-बार प्यास लगती है।',
    },
    keyConsiderations: [
      {
        en: 'Drink plain water and avoid sugary sodas, juices, or sweetened teas that can raise sugar further',
        hi: 'सादा पानी पिएं, मीठे पेय पदार्थों या फलों के जूस से बचें जो शुगर बढ़ा सकते हैं',
      },
      {
        en: 'Notice if the thirst is accompanied by frequent bathroom trips or unusual tiredness',
        hi: 'ध्यान दें कि क्या प्यास के साथ बार-बार पेशाब या अत्यधिक थकान भी महसूस हो रही है',
      },
      {
        en: 'Discuss persistent thirst with your doctor for a simple fasting blood glucose or HbA1c check',
        hi: 'यदि प्यास लगातार बनी रहे तो डॉक्टर से मिलकर सामान्य शुगर जांच कराएं',
      },
    ],
    relatedPageLink: '/diabetes-care/prediabetes',
    relatedPageLabel: {
      en: 'Learn About Blood Sugar & Prediabetes',
      hi: 'ब्लड शुगर एवं प्रीडायबिटीज की जानकारी',
    },
    relatedResourceLink: '/patient-resources/understand-your-reports',
    relatedResourceLabel: {
      en: 'Understand Blood Glucose Reports',
      hi: 'ब्लड ग्लूकोज रिपोर्ट समझें',
    },
    status: 'verified',
  },
  {
    id: 'prob-frequent-urination',
    slug: 'frequent-urination',
    title: {
      en: 'Frequent Urination',
      hi: 'बार-बार पेशाब आना',
    },
    shortDesc: {
      en: 'Needing to pass urine more often than normal, especially several times during the night.',
      hi: 'सामान्य से अधिक बार पेशाब जाना, विशेषकर रात में नींद के दौरान कई बार उठना।',
    },
    generalInfo: {
      en: 'Urination frequency can increase when the kidneys filter out extra sugar from the blood. Other common factors can include drinking more fluids, urinary infections, or prostate health in men. A doctor can easily evaluate the cause with simple tests.',
      hi: 'जब गुर्दे रक्त से अतिरिक्त शुगर को बाहर निकालते हैं, तो पेशाब की मात्रा बढ़ सकती है। इसके अलावा अधिक पानी पीना या मूत्र संक्रमण भी कारण हो सकता है।',
    },
    keyConsiderations: [
      {
        en: 'Keep track of whether this happens mostly during the day or wakes you up at night',
        hi: 'ध्यान रखें कि यह दिन में अधिक होता है या रात को नींद से जगाता है',
      },
      {
        en: 'Check if there is any burning, fever, or pain, which may indicate an infection',
        hi: 'देखें कि कहीं पेशाब में जलन, बुखार या दर्द तो नहीं है',
      },
      {
        en: 'A quick urine and blood sugar check can help your doctor understand what is happening',
        hi: 'एक सामान्य यूरिन और ब्लड टेस्ट से डॉक्टर सही कारण समझ सकते हैं',
      },
    ],
    relatedPageLink: '/conditions/diabetes',
    relatedPageLabel: {
      en: 'Diabetes Overview & Symptoms',
      hi: 'डायबिटीज के सामान्य लक्षण',
    },
    relatedResourceLink: '/patient-resources/faqs',
    relatedResourceLabel: {
      en: 'Common Patient Questions',
      hi: 'अक्सर पूछे जाने वाले सवाल',
    },
    status: 'verified',
  },
  {
    id: 'prob-fatigue',
    slug: 'fatigue',
    title: {
      en: 'Unexplained Fatigue & Low Energy',
      hi: 'अकारण थकान एवं कमजोरी',
    },
    shortDesc: {
      en: 'Feeling unusually tired or drained even after a full night of rest.',
      hi: 'पूरी रात की नींद के बाद भी लगातार अत्यधिक थकान या कमजोरी महसूस होना।',
    },
    generalInfo: {
      en: 'When your body does not process sugar properly, your cells cannot get the energy they need from the food you eat. Fatigue can also be linked to thyroid imbalances, low iron (anemia), lack of sleep, or everyday stress. A doctor can help sort out the underlying reason.',
      hi: 'जब शरीर भोजन से मिलने वाले ग्लूकोज को ऊर्जा में नहीं बदल पाता, तो कमजोरी महसूस होती है। थायरॉयड असंतुलन या खून की कमी भी इसके कारण हो सकते हैं।',
    },
    keyConsiderations: [
      {
        en: 'Notice if your tiredness feels worse right after heavy, carbohydrate-rich meals',
        hi: 'ध्यान दें कि क्या भारी भोजन के तुरंत बाद सुस्ती और थकान ज्यादा बढ़ती है',
      },
      {
        en: 'Check other factors like sleep quality, stress levels, and daily water intake',
        hi: 'नींद की गुणवत्ता, तनाव और दिनभर में पानी की मात्रा पर भी ध्यान दें',
      },
      {
        en: 'Basic routine blood tests (sugar, thyroid, and blood counts) can give clear answers',
        hi: 'शुगर, थायरॉयड और सीबीसी की सामान्य जांच से स्थिति स्पष्ट हो सकती है',
      },
    ],
    relatedPageLink: '/conditions/thyroid',
    relatedPageLabel: {
      en: 'Thyroid Health & Energy Balance',
      hi: 'थायरॉयड स्वास्थ्य एवं ऊर्जा',
    },
    relatedResourceLink: '/patient-resources/articles',
    relatedResourceLabel: {
      en: 'Articles on Daily Energy & Health',
      hi: 'स्वास्थ्य एवं ऊर्जा पर उपयोगी लेख',
    },
    status: 'verified',
  },
  {
    id: 'prob-changes-in-weight',
    slug: 'changes-in-weight',
    title: {
      en: 'Unexpected Changes in Weight',
      hi: 'वजन में अचानक बदलाव',
    },
    shortDesc: {
      en: 'Losing or gaining weight without any clear change in your daily diet or physical routine.',
      hi: 'खान-पान या दिनचर्या में बदलाव किए बिना अचानक वजन कम होना या तेजी से बढ़ना।',
    },
    generalInfo: {
      en: 'Unplanned weight loss can happen if the body cannot use sugar for energy and begins burning fat and muscle instead. On the other hand, gradual unexpected weight gain can be linked to insulin resistance, slow thyroid function, or metabolism shifts. A healthcare evaluation helps identify the right approach.',
      hi: 'अचानक वजन घटना तब हो सकता है जब शरीर शुगर को ऊर्जा में नहीं बदल पाता। वहीं वजन बढ़ना इंसुलिन प्रतिरोध या धीमी थायरॉयड के कारण हो सकता है।',
    },
    keyConsiderations: [
      {
        en: 'Notice whether your appetite has increased, decreased, or stayed the same',
        hi: 'ध्यान दें कि आपकी भूख बढ़ी है, घटी है या पहले जैसी ही है',
      },
      {
        en: 'Avoid extreme crash diets or sudden weight loss supplements without medical advice',
        hi: 'बिना डॉक्टरी सलाह के किसी भी अत्यधिक सख्त डाइट या दवाओं से बचें',
      },
      {
        en: 'Share your weight timeline with your physician during your next consultation',
        hi: 'अपने डॉक्टर से परामर्श के दौरान वजन में बदलाव का पूरा विवरण साझा करें',
      },
    ],
    relatedPageLink: '/conditions/weight-management',
    relatedPageLabel: {
      en: 'Healthy Weight & Metabolism',
      hi: 'स्वस्थ वजन एवं मेटाबॉलिज्म',
    },
    relatedResourceLink: '/patient-resources/understand-your-reports',
    relatedResourceLabel: {
      en: 'Understanding BMI & Measurements',
      hi: 'बीएमआई और शारीरिक माप समझें',
    },
    status: 'verified',
  },
  {
    id: 'prob-high-blood-sugar',
    slug: 'high-blood-sugar',
    title: {
      en: 'High Blood Sugar Readings',
      hi: 'ब्लड शुगर का बढ़ा हुआ स्तर',
    },
    shortDesc: {
      en: 'Fasting or post-meal glucose numbers that are higher than recommended targets.',
      hi: 'खाली पेट या खाने के बाद की शुगर का अनुशंसित स्तर से अधिक आना।',
    },
    generalInfo: {
      en: 'Occasional higher readings can happen because of what you ate, poor sleep, illness, or stress. However, if your numbers stay consistently elevated over several days, it indicates that your current lifestyle or medication plan needs careful review with your doctor.',
      hi: 'कभी-कभार तनाव या खान-पान से शुगर बढ़ सकती है, लेकिन कई दिनों तक लगातार उच्च स्तर रहने पर डॉक्टर से परामर्श कर दवा और दिनचर्या की समीक्षा जरूरी है।',
    },
    keyConsiderations: [
      {
        en: 'Note down whether the high numbers occur in the morning before breakfast or 2 hours after lunch/dinner',
        hi: 'नोट करें कि शुगर सुबह खाली पेट अधिक है या भोजन के 2 घंटे बाद',
      },
      {
        en: 'Keep a written log of your readings for a few days to show your doctor',
        hi: 'कुछ दिनों तक शुगर की रीडिंग लिखकर रखें ताकि डॉक्टर को दिखा सकें',
      },
      {
        en: 'Never change your prescribed medication doses on your own based on a single test reading',
        hi: 'एक रीडिंग देखकर कभी भी अपने आप दवा की खुराक न बदलें',
      },
    ],
    relatedPageLink: '/diabetes-care/management',
    relatedPageLabel: {
      en: 'Daily Diabetes Management Plan',
      hi: 'दैनिक डायबिटीज प्रबंधन योजना',
    },
    relatedResourceLink: '/patient-resources/understand-your-reports',
    relatedResourceLabel: {
      en: 'Guide to Blood Glucose Tests',
      hi: 'ब्लड ग्लूकोज जांच गाइड',
    },
    status: 'verified',
  },
  {
    id: 'prob-high-hba1c',
    slug: 'high-hba1c',
    title: {
      en: 'High HbA1c Level',
      hi: 'उच्च HbA1c स्तर',
    },
    shortDesc: {
      en: 'Your 3-month average blood sugar test result is higher than your doctor recommended.',
      hi: 'पिछले 3 महीने के औसत शुगर को दर्शाने वाला HbA1c स्तर लक्ष्य से अधिक आना।',
    },
    generalInfo: {
      en: 'HbA1c shows the average amount of sugar attached to your red blood cells over the last 2 to 3 months. A higher number is not a personal failure — it is simply a clear indicator that your overall management plan can be adjusted to protect your eyes, kidneys, and heart.',
      hi: 'HbA1c पिछले 2-3 महीनों के औसत शुगर स्तर को दर्शाता है। बढ़ा हुआ स्तर यह संकेत देता है कि अंगों की सुरक्षा के लिए दवा या जीवनशैली में सुधार की आवश्यकता है।',
    },
    keyConsiderations: [
      {
        en: 'A single healthy or unhealthy day does not change your 3-month HbA1c number',
        hi: 'एक दिन अच्छा या खराब खाने से 3 महीने का HbA1c नहीं बदलता',
      },
      {
        en: 'Safe target goals differ from person to person based on age and health history',
        hi: 'उम्र और स्वास्थ्य के अनुसार प्रत्येक व्यक्ति का सुरक्षित लक्ष्य भिन्न हो सकता है',
      },
      {
        en: 'Ask your doctor what target number is safest and most realistic for you',
        hi: 'अपने डॉक्टर से पूछें कि आपके लिए सबसे सुरक्षित और उचित लक्ष्य क्या है',
      },
    ],
    relatedPageLink: '/diabetes-care/education',
    relatedPageLabel: {
      en: 'Understanding HbA1c & Diabetes',
      hi: 'HbA1c और डायबिटीज को समझें',
    },
    relatedResourceLink: '/patient-resources/articles',
    relatedResourceLabel: {
      en: 'Read Our Article on HbA1c Goals',
      hi: 'HbA1c लक्ष्यों पर विस्तृत लेख पढ़ें',
    },
    status: 'verified',
  },
  {
    id: 'prob-thyroid-concerns',
    slug: 'thyroid-concerns',
    title: {
      en: 'Thyroid-Related Concerns',
      hi: 'थायरॉयड संबंधी समस्याएं',
    },
    shortDesc: {
      en: 'Questions about tiredness, unexpected weight changes, feeling too cold, or abnormal TSH test results.',
      hi: 'थकान, वजन में बदलाव, अत्यधिक ठंड लगना या टीएसएच (TSH) टेस्ट में गड़बड़ी के लक्षण।',
    },
    generalInfo: {
      en: 'The thyroid is a small butterfly-shaped gland in your neck that produces hormones controlling how fast your body burns energy (metabolism). When it is underactive (hypothyroidism) or overactive (hyperthyroidism), everyday functions can feel out of balance. A simple blood test helps clarify thyroid health.',
      hi: 'थायरॉयड गर्दन में स्थित एक ग्रंथि है जो चयापचय और ऊर्जा को नियंत्रित करती है। इसमें असंतुलन होने पर थकान या वजन में बदलाव हो सकता है।',
    },
    keyConsiderations: [
      {
        en: 'TSH is the primary screening blood test used to check thyroid hormone balance',
        hi: 'टीएसएच (TSH) थायरॉयड की स्थिति जानने के लिए सबसे मुख्य ब्लड टेस्ट है',
      },
      {
        en: 'If you take thyroid medication, it is best taken in the morning on an empty stomach with plain water',
        hi: 'थायरॉयड की दवा सुबह खाली पेट सादे पानी के साथ लेना सबसे उपयुक्त माना जाता है',
      },
      {
        en: 'Pregnancy or family history makes regular thyroid check-ups especially helpful',
        hi: 'गर्भावस्था या परिवार में थायरॉयड का इतिहास होने पर नियमित जांच महत्वपूर्ण है',
      },
    ],
    relatedPageLink: '/conditions/thyroid',
    relatedPageLabel: {
      en: 'Learn About Thyroid Disorders',
      hi: 'थायरॉयड विकारों की विस्तृत जानकारी',
    },
    relatedResourceLink: '/patient-resources/faqs',
    relatedResourceLabel: {
      en: 'Thyroid & Diabetes FAQs',
      hi: 'थायरॉयड से जुड़े आम सवाल',
    },
    status: 'verified',
  },
  {
    id: 'prob-weight-concerns',
    slug: 'weight-concerns',
    title: {
      en: 'Weight Management Concerns',
      hi: 'वजन एवं मोटापा प्रबंधन',
    },
    shortDesc: {
      en: 'Finding it difficult to manage weight despite trying, or wondering how weight affects blood sugar.',
      hi: 'प्रयासों के बावजूद वजन कम न होना या यह समझना कि वजन ब्लड शुगर को कैसे प्रभावित करता है।',
    },
    generalInfo: {
      en: 'Weight is not just about willpower. Hormones, genetics, sleep quality, stress, and medications all play a major role in how the body stores fat. In South Asian individuals, even modest excess weight around the belly can increase insulin resistance. Compassionate, medical guidance focuses on sustainable health rather than crash diets.',
      hi: 'वजन केवल खाने पर नहीं, बल्कि हार्मोन, नींद, तनाव और मेटाबॉलिज्म पर निर्भर करता है। पेट के आसपास की चर्बी इंसुलिन प्रतिरोध बढ़ा सकती है।',
    },
    keyConsiderations: [
      {
        en: 'Focus on small, consistent everyday habits rather than extreme or temporary restrictions',
        hi: 'कड़े परहेज के बजाय छोटे और टिकाऊ दैनिक सुधारों पर ध्यान दें',
      },
      {
        en: 'Even a 5% gradual weight reduction can significantly improve blood pressure and sugar levels',
        hi: 'वजन में 5% की हल्की कमी भी शुगर और ब्लड प्रेशर को बेहतर बना सकती है',
      },
      {
        en: 'A medical evaluation can check if hormone imbalances or medication side effects are contributing',
        hi: 'डॉक्टरी जांच से पता चल सकता है कि कोई हार्मोनल समस्या तो वजन नहीं बढ़ा रही',
      },
    ],
    relatedPageLink: '/conditions/weight-management',
    relatedPageLabel: {
      en: 'Medical Weight Management Support',
      hi: 'चिकित्सीय वजन प्रबंधन सहायता',
    },
    relatedResourceLink: '/patient-resources/guides',
    relatedResourceLabel: {
      en: 'Patient Healthy Habits Guide',
      hi: 'स्वस्थ आदतों की मरीज मार्गदर्शिका',
    },
    status: 'verified',
  },
];
