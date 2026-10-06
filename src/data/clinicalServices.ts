import type { ClinicalService } from '../types/services';

export const CLINICAL_SERVICES_DATA: ClinicalService[] = [
  {
    id: 'type-2-diabetes',
    slug: 'type-2-diabetes-management',
    title: {
      en: 'Type 2 Diabetes & Remission Care',
      hi: 'टाइप 2 मधुमेह प्रबंधन एवं रेमिशन',
    },
    shortDescription: {
      en: 'Comprehensive lifestyle-first glycemic optimization targeting sustained HbA1c reduction, weight harmony, and potential diabetes remission.',
      hi: 'जीवनशैली-केंद्रित ग्लूकोज नियंत्रण, जिससे HbA1c में स्थायी सुधार और उपयुक्त मामलों में मधुमेह रेमिशन संभव हो सके।',
    },
    fullDescription: {
      en: 'Type 2 Diabetes requires more than increasing medication doses. Dr. Sengupta utilizes an integrative protocol addressing visceral adiposity, hepatic insulin sensitivity, and beta-cell resting strategies to achieve optimal glycemic stability without excessive hypoglycemia risks.',
      hi: 'टाइप 2 मधुमेह में केवल दवा की खुराक बढ़ाना समाधान नहीं है। डॉ. सेनगुप्ता इंसुलिन संवेदनशीलता, आहार संतुलन और बीटा-कोशिका संरक्षण पर आधारित वैज्ञानिक दृष्टिकोण अपनाते हैं।',
    },
    indications: [
      { en: 'Newly diagnosed Type 2 diabetes seeking remission roadmap', hi: 'नया डायग्नोसिस जहां रेमिशन की संभावना हो' },
      { en: 'Uncontrolled blood sugars despite multiple oral medications', hi: 'दवाओं के बावजूद अनियंत्रित ब्लड शुगर' },
      { en: 'Frequent unexplained fluctuations and high morning fasting spikes', hi: 'सुबह की फास्टिंग में अप्रत्याशित उछाल' },
    ],
    clinicalApproach: [
      { en: 'Baseline metabolic assessment (C-peptide, lipid subfractions, microalbuminuria)', hi: 'प्रारंभिक चयापचय जांच (सी-पेप्टाइड, लिपिड, माइक्रोएल्ब्यूमिन)' },
      { en: 'Personalized carbohydrate-distribution nutrition planning', hi: 'व्यक्तिगत कार्बोहाइड्रेट संतुलन और पोषण मार्गदर्शन' },
      { en: 'Modern GLP-1 and SGLT2 organ-protective pharmacological pairing where indicated', hi: 'गुर्दे और हृदय की रक्षा करने वाली आधुनिक औषधियां' },
    ],
    iconName: 'Activity',
  },
  {
    id: 'cgm-continuous-glucose',
    slug: 'cgm-ambulatory-glucose-profile',
    title: {
      en: 'Continuous Glucose Monitoring (CGM / AGP)',
      hi: 'कंटीन्यूअस ग्लूकोज मॉनिटरिंग (CGM / AGP)',
    },
    shortDescription: {
      en: 'Sensor-based 14-day continuous glucose monitoring revealing hidden spikes, nocturnal dips, and Time in Range (TIR) metrics.',
      hi: '14 दिवसीय सेंसर तकनीक द्वारा छिपे हुए शुगर स्पाइक्स, रात्रि के उतार-चढ़ाव और टाइम इन रेंज (TIR) की सटीक पहचान।',
    },
    fullDescription: {
      en: 'Fingerprick glucometer readings only provide isolated moments in time. Continuous Glucose Monitoring (CGM) captures glucose dynamics every few minutes, enabling customized nutrition-insulin timing and eradicating silent nighttime hypoglycemia.',
      hi: 'पारंपरिक ग्लूकोमीटर केवल एक समय का आंकड़ा देता है। सीजीएम तकनीक से पूरे दिन और रात के ग्लूकोज पैटर्न का पता चलता है, जिससे बिना किसी खतरे के सटीक इलाज संभव होता है।',
    },
    indications: [
      { en: 'High glycemic variability (wide swings between high and low)', hi: 'शुगर का अचानक बहुत बढ़ना या गिरना' },
      { en: 'Unexplained nocturnal hypoglycemia or morning fatigue', hi: 'रात में पसीना आना या घबराहट होना' },
      { en: 'Athletes, active professionals, and insulin users requiring fine-tuning', hi: 'सक्रिय जीवनशैली और इंसुलिन उपयोगकर्ताओं के लिए' },
    ],
    clinicalApproach: [
      { en: 'Sensor placement and real-time app synchronization guidance', hi: 'सेंसर लगाना और मोबाइल ऐप से जोड़ना' },
      { en: 'Comprehensive Ambulatory Glucose Profile (AGP) analysis with the doctor', hi: 'विस्तृत एजीपी रिपोर्ट का डॉक्टर द्वारा विश्लेषण' },
      { en: 'Targeting >70% Time in Range (70-180 mg/dL) safely', hi: '70% से अधिक समय सुरक्षित सीमा में बनाए रखना' },
    ],
    iconName: 'LineChart',
  },
  {
    id: 'type-1-diabetes-insulin',
    slug: 'type-1-diabetes-insulin-optimization',
    title: {
      en: 'Type 1 Diabetes & Insulin Therapy',
      hi: 'टाइप 1 मधुमेह एवं इंसुलिन थेरेपी',
    },
    shortDescription: {
      en: 'Empowering children, adolescents, and adults with physiological basal-bolus regimens, carb-counting, and pump management.',
      hi: 'बच्चों और युवाओं में फिजियोलॉजिकल बेसल-बोलस इंसुलिन, कार्ब-काउंटिंग और इंसुलिन पंप का सुरक्षित प्रबंधन।',
    },
    fullDescription: {
      en: 'Type 1 diabetes is an autoimmune condition requiring life-long physiological insulin replacement. Dr. Sengupta equips patients and parents with advanced carb-to-insulin ratios, correction factors, and emergency ketone protocols.',
      hi: 'टाइप 1 मधुमेह में शरीर में इंसुलिन नहीं बनता। डॉ. सेनगुप्ता मरीजों को सटीक इंसुलिन खुराक, भोजन के अनुसार अनुपात और कीटोन से बचाव का प्रशिक्षण देते हैं।',
    },
    indications: [
      { en: 'Children, teens, or adults diagnosed with autoimmune diabetes', hi: 'टाइप 1 मधुमेह से पीड़ित बच्चे एवं वयस्क' },
      { en: 'Recurrent hypoglycemic fear or diabetic ketoacidosis (DKA) episodes', hi: 'बार-बार शुगर बहुत कम होना या डीकेए का खतरा' },
      { en: 'Patients transitioning to advanced smart insulin pens or pumps', hi: 'स्मार्ट इंसुलिन पेन या पंप का उपयोग' },
    ],
    clinicalApproach: [
      { en: 'Tailored Insulin-to-Carbohydrate Ratio (ICR) and Insulin Sensitivity Factor (ISF)', hi: 'इंसुलिन और कार्बोहाइड्रेट का व्यक्तिगत अनुपात' },
      { en: 'Hypoglycemia prevention and emergency glucagon awareness training', hi: 'हाइपोग्लाइसीमिया से बचाव और प्राथमिक उपचार' },
      { en: 'Psychosocial support for diabetes burnout in growing teenagers and young adults', hi: 'मधुमेह के कारण होने वाले मानसिक तनाव का समाधान' },
    ],
    iconName: 'ShieldAlert',
  },
  {
    id: 'gestational-diabetes',
    slug: 'gestational-diabetes-gdm',
    title: {
      en: 'Gestational Diabetes (GDM) & Pregnancy Care',
      hi: 'गर्भावस्था में मधुमेह (GDM) देखभाल',
    },
    shortDescription: {
      en: 'Rigorous yet reassuring maternal glucose regulation safeguarding fetal growth and preventing pregnancy complications.',
      hi: 'गर्भावस्था के दौरान सुरक्षित ग्लूकोज नियंत्रण, जिससे मां और शिशु दोनों पूरी तरह स्वस्थ रहें।',
    },
    fullDescription: {
      en: 'Elevated blood sugars during pregnancy can impact fetal size and neonatal wellness. Dr. Sengupta coordinates closely with obstetricians, prescribing safe nutritional plans and pregnancy-approved insulin protocols when indicated.',
      hi: 'गर्भावस्था में बढ़ा हुआ ग्लूकोज बच्चे के विकास पर असर डाल सकता है। डॉ. सेनगुप्ता प्रसूति विशेषज्ञों के समन्वय से सुरक्षित उपचार सुनिश्चित करते हैं।',
    },
    indications: [
      { en: 'Abnormal Oral Glucose Tolerance Test (OGTT) at 24-28 weeks', hi: '24-28 सप्ताह में ग्लूकोज टेस्ट में असामान्यता' },
      { en: 'Pre-existing diabetes planning conception (Pre-gestational planning)', hi: 'पहले से मधुमेह से ग्रस्त महिलाओं की प्रेगनेंसी प्लानिंग' },
      { en: 'History of high birth-weight baby or recurrent miscarriages', hi: 'पिछली प्रेगनेंसी में जटिलताओं का इतिहास' },
    ],
    clinicalApproach: [
      { en: 'Tight fasting (<95 mg/dL) and post-meal (<120 mg/dL) targets', hi: 'सख्त लेकिन सुरक्षित ग्लूकोज लक्ष्य' },
      { en: 'Nutritionally dense fetal-supportive dietary plans', hi: 'शिशु के पोषण से भरपूर संतुलित आहार' },
      { en: 'Safe transition and postpartum glucose re-assessment at 6-12 weeks', hi: 'प्रसव के बाद 6-12 सप्ताह में पुनः जांच' },
    ],
    iconName: 'HeartPulse',
  },
  {
    id: 'diabetic-kidney-cardiac',
    slug: 'diabetic-kidney-disease-cardio-protection',
    title: {
      en: 'Diabetic Nephropathy & Heart Protection',
      hi: 'डायबिटिक गुर्दा सुरक्षा एवं हृदय स्वास्थ्य',
    },
    shortDescription: {
      en: 'Early detection of microalbuminuria, blood pressure harmonization, and renal-safe pharmacology preventing organ impairment.',
      hi: 'पेशाब में प्रोटीन की समय पर पहचान, रक्तचाप संतुलन और गुर्दे-हृदय को सुरक्षित रखने वाली चिकित्सा।',
    },
    fullDescription: {
      en: 'Kidney and cardiovascular tissues are primary targets in persistent hyperglycemia. By monitoring eGFR, urinary albumin-creatinine ratio (uACR), and vascular stiffness, Dr. Sengupta implements kidney-protective and heart-protective therapy years before visible symptoms develop.',
      hi: 'दीर्घकालिक मधुमेह का असर गुर्दों और हृदय पर पड़ सकता है। समय रहते यूरिन प्रोटीन और ईजीएफआर जांच कर गंभीर जटिलताओं से रक्षा की जाती है।',
    },
    indications: [
      { en: 'Diabetes duration greater than 5 years', hi: '5 वर्ष से अधिक समय से मधुमेह' },
      { en: 'Traces of protein/albumin reported in routine urine analysis', hi: 'पेशाब में प्रोटीन या झाग आना' },
      { en: 'Co-existing high blood pressure (hypertension) or high cholesterol', hi: 'उच्च रक्तचाप या कोलेस्ट्रॉल की समस्या' },
    ],
    clinicalApproach: [
      { en: 'Annual spot urine albumin-to-creatinine ratio screening', hi: 'नियमित स्पॉट यूरिन एल्ब्यूमिन जांच' },
      { en: 'Evidence-based SGLT2 inhibitor and RAS-blocker optimization', hi: 'गुर्दे की कार्यक्षमता बढ़ाने वाली दवाएं' },
      { en: 'Electrolyte monitoring and individualized dietary protein modulation', hi: 'इलेक्ट्रोलाइट संतुलन और सुरक्षित आहार' },
    ],
    iconName: 'ShieldCheck',
  },
  {
    id: 'diabetic-foot-care',
    slug: 'diabetic-foot-neuropathy-screening',
    title: {
      en: 'Diabetic Foot Care & Neuropathy Screening',
      hi: 'डायबिटिक फुट केयर एवं न्यूरोपैथी जांच',
    },
    shortDescription: {
      en: 'Quantitative sensory testing, peripheral pulse evaluation, and preventive podiatric care to stop ulcers before they start.',
      hi: 'पैरों के सुन्नपन की जांच, रक्त प्रवाह का आकलन और अल्सर या घाव से बचाव के लिए विशेष देखभाल।',
    },
    fullDescription: {
      en: 'Diabetic peripheral neuropathy dulls protective pain sensation, allowing trivial foot blisters to turn into severe infections. Dr. Sengupta conducts biothesiometry, monofilament testing, and footwear counseling to preserve foot mobility and limb integrity.',
      hi: 'पैरों की नसें कमजोर होने से चोट या छाले का अहसास नहीं होता। नियमित जांच और सही फुटवियर के चयन से पैरों को सुरक्षित रखा जाता है।',
    },
    indications: [
      { en: 'Burning, tingling, numbness, or "pins and needles" in feet and toes', hi: 'पैरों में जलन, झनझनाहट या सुन्नपन' },
      { en: 'Loss of sensation while walking or difficulty detecting shoe pressure', hi: 'चलते समय चप्पल छूट जाना या दबाव न लगना' },
      { en: 'Corns, calluses, fungal nail changes, or slow-healing minor cuts', hi: 'पैरों में गोखरू, फफोले या न भरने वाले घाव' },
    ],
    clinicalApproach: [
      { en: '10g Semmes-Weinstein monofilament and vibration perception screening', hi: 'मोनोफिलामेंट एवं वाइब्रेशन सेंसिटिविटी टेस्ट' },
      { en: 'Peripheral vascular pulse palpation and Doppler screening referral', hi: 'पैरों की नसों में रक्त प्रवाह का परीक्षण' },
      { en: 'Custom diabetic insole and preventive daily foot regimen training', hi: 'डायबिटिक जूते/इनसोल और दैनिक देखभाल की सलाह' },
    ],
    iconName: 'Crosshair',
  },
];
