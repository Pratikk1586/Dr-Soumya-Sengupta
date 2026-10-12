/**
 * Anatomical Data and Clinical Diabetology Content for Realistic Pancreas Anatomy Viewer.
 * Aligned with W3C WCAG 2.2 accessibility, clinical education, and bilingual EN/HI support.
 */

export type PancreasPartCategory = 'all' | 'endocrine' | 'exocrine' | 'vascular' | 'structural';

export type PancreasPartId =
  | 'islets'
  | 'tail'
  | 'body'
  | 'head'
  | 'duct'
  | 'duodenum'
  | 'vasculature'
  | 'spleen'
  | 'bile-duct'
  | 'gallbladder'
  | 'stomach';

export interface IsletCellInfo {
  id: 'alpha' | 'beta' | 'delta';
  name: string;
  nameHi: string;
  hormone: string;
  hormoneHi: string;
  percentage: string;
  role: string;
  roleHi: string;
}

export interface PancreasPartInfo {
  id: PancreasPartId;
  name: string;
  nameHi: string;
  scientificName: string;
  category: Exclude<PancreasPartCategory, 'all'>;
  badge: string;
  badgeType: 'insulin' | 'enzyme' | 'metabolic' | 'vascular' | 'organ';
  stat: string;
  clinicalMarker: string;
  summary: string;
  oneLineFunction: string;
  oneLineFunctionHi: string;
  description: string;
  descriptionHi: string;
  clinicalNote: string;
  clinicalNoteHi: string;
  diabeticRelevance: string;
  // Visual anchor points in 1536 x 1024 viewBox space
  hotspot: {
    cx: number;
    cy: number;
    calloutX: number;
    calloutY: number;
    title: string;
    titleHi: string;
  };
  svgPath: string;
  labelPosition: { x: number; y: number }; // Percentage position for pill on 1536x1024
}

export const ISLET_CELLS: IsletCellInfo[] = [
  {
    id: 'alpha',
    name: 'Alpha Cell',
    nameHi: 'अल्फा कोशिका',
    hormone: 'Glucagon',
    hormoneHi: 'ग्लूकागन',
    percentage: '~15–20% of islet mass',
    role: 'Mobilizes glucose from liver stores during fasting or low blood sugar',
    roleHi: 'उपवास या लो-शुगर के समय लिवर से ग्लूकोज को रक्त में मुक्त करता है',
  },
  {
    id: 'beta',
    name: 'Beta Cell',
    nameHi: 'बीटा कोशिका',
    hormone: 'Insulin',
    hormoneHi: 'इंसुलिन',
    percentage: '~65–80% of islet mass',
    role: 'Drives cellular glucose absorption, fuel storage, and anabolic metabolism',
    roleHi: 'कोशिकाओं द्वारा ग्लूकोज अवशोषण, ऊर्जा भंडारण और सामान्य शर्करा स्तर नियंत्रित करता है',
  },
  {
    id: 'delta',
    name: 'Delta Cell',
    nameHi: 'डेल्टा कोशिका',
    hormone: 'Somatostatin',
    hormoneHi: 'सोमाटोस्टैटिन',
    percentage: '~3–5% of islet mass',
    role: 'Acts as paracrine brake, regulating and modulating local insulin and glucagon release',
    roleHi: 'स्थानीय पैराक्राइन नियंत्रण द्वारा इंसुलिन एवं ग्लूकागन के स्राव को संतुलित रखता है',
  },
];

export const PANCREAS_DATA: Record<PancreasPartId, PancreasPartInfo> = {
  islets: {
    id: 'islets',
    name: 'Islets of Langerhans',
    nameHi: 'लैंगरहेंस द्वीप (Beta & Alpha Cells)',
    scientificName: 'Insulae pancreaticae',
    category: 'endocrine',
    badge: 'Endocrine Micro-Organs',
    badgeType: 'insulin',
    stat: '1–2 Million Micro-Islets',
    clinicalMarker: 'C-Peptide & Fasting Insulin',
    summary: 'Microscopic endocrine clusters; Beta cells synthesize insulin, Alpha cells secrete glucagon.',
    oneLineFunction: 'Produces systemic blood-glucose regulating hormones (Insulin, Glucagon, Somatostatin).',
    oneLineFunctionHi: 'रक्त शर्करा संतुलन हेतु हार्मोन (इंसुलिन, ग्लूकागन, सोमाटोस्टैटिन) का उत्पादन।',
    description: 'Microscopic endocrine cell clusters scattered throughout the pancreas gland, with the highest concentration in the tail.',
    descriptionHi: 'अग्न्याशय में बिखरे 10 से 20 लाख सूक्ष्म अंतःस्रावी द्वीप, जिनका सर्वाधिक घनत्व टेल (पूंछ) में होता है।',
    clinicalNote: 'Islets are scattered throughout the pancreas. Destroyed by autoimmunity in Type 1 diabetes; progressively exhausted by chronic insulin resistance in Type 2.',
    clinicalNoteHi: 'द्वीप संपूर्ण अग्न्याशय में फैले होते हैं। टाइप 1 में ऑटोइम्यूनिटी द्वारा नष्ट और टाइप 2 में इंसुलिन प्रतिरोध से शिथिल हो जाते हैं।',
    diabeticRelevance: 'Primary cellular target in diabetes therapy: preservation of functional beta-cell reserve prevents long-term glycemic failure.',
    hotspot: {
      cx: 1236,
      cy: 753,
      calloutX: 1236,
      calloutY: 550,
      title: 'Beta Cells & Islets',
      titleHi: 'बीटा कोशिकाएं एवं द्वीप',
    },
    svgPath: 'M 1236 590 A 163 163 0 1 0 1236 916 A 163 163 0 1 0 1236 590 Z',
    labelPosition: { x: 80.5, y: 73.5 },
  },

  head: {
    id: 'head',
    name: 'Head of Pancreas',
    nameHi: 'पैन्क्रियाटिक हेड (अग्न्याशय का सिर)',
    scientificName: 'Caput pancreatis',
    category: 'exocrine',
    badge: 'Exocrine Epicenter',
    badgeType: 'enzyme',
    stat: '~30% Total Gland Mass',
    clinicalMarker: 'Serum Amylase & Lipase',
    summary: 'Expanded medial portion resting inside the C-shaped duodenal curve.',
    oneLineFunction: 'Enzyme production hub nestled in the duodenal C-loop where pancreatic and bile ducts converge.',
    oneLineFunctionHi: 'डुओडेनम के घेरे में स्थित प्रमुख भाग जहां पाचक रस और पित्त नलिकाएं आपस में मिलती हैं।',
    description: 'The broad right extremity of the pancreas lying directly against the descending duodenum, sending uncinate process behind mesenteric vessels.',
    descriptionHi: 'अग्न्याशय का चौड़ा दायां सिरा जो सीधे डुओडेनम के सी-लूप में स्थित रहता है।',
    clinicalNote: 'Lesions or edema in the pancreatic head can compress the common bile duct, causing obstructive jaundice and rapid glycemic instability.',
    clinicalNoteHi: 'पैन्क्रियाटिक हेड में सूजन या गांठ से पित्त नली दब सकती है, जिससे पीलिया और ब्लड शुगर असंतुलन हो सकता है।',
    diabeticRelevance: 'Houses extensive exocrine tissue; head inflammation triggers pancreatogenic (Type 3c) diabetes.',
    hotspot: {
      cx: 460,
      cy: 560,
      calloutX: 430,
      calloutY: 760,
      title: 'Head of Pancreas',
      titleHi: 'पैन्क्रियाटिक हेड',
    },
    svgPath: 'M 420 400 C 480 390 550 410 590 440 C 610 490 610 550 590 610 C 560 670 490 735 420 740 C 350 740 310 670 310 580 C 310 500 340 440 420 400 Z',
    labelPosition: { x: 28, y: 74 },
  },

  body: {
    id: 'body',
    name: 'Pancreatic Body',
    nameHi: 'पैन्क्रियाटिक बॉडी (अग्न्याशय का मुख्य भाग)',
    scientificName: 'Corpus pancreatis',
    category: 'exocrine',
    badge: 'Metabolic Trunk',
    badgeType: 'enzyme',
    stat: '~50% Total Gland Mass',
    clinicalMarker: 'Fecal Elastase & Glucose Logs',
    summary: 'Central elongated prismatic section crossing the aorta and spine.',
    oneLineFunction: 'Central transverse portion synthesizing bulk digestive enzymes and interspersed islets.',
    oneLineFunctionHi: 'मध्य भाग जो मुख्य पाचक एंजाइमों और अंतःस्रावी ग्रंथियों का निर्माण व संवहन करता है।',
    description: 'Extends horizontally to the left across the vertebral column, bounded superiorly by the splenic artery and posteriorly by splenic vein.',
    descriptionHi: 'रीढ़ और महाधमनी के आगे से होकर बाईं ओर फैली अग्न्याशय की मुख्य देह।',
    clinicalNote: 'Contains abundant exocrine acini and extensive beta-cell islets; diffuse inflammation impairs both digestion and insulin output.',
    clinicalNoteHi: 'इसमें पाचक ग्रंथियां और बीटा कोशिकाएं प्रचुर मात्रा में होती हैं; सूजन से पाचन और इंसुलिन दोनों प्रभावित होते हैं।',
    diabeticRelevance: 'Chronic pancreatitis of the body leads to dual endocrine-exocrine failure.',
    hotspot: {
      cx: 840,
      cy: 470,
      calloutX: 860,
      calloutY: 330,
      title: 'Pancreatic Body',
      titleHi: 'पैन्क्रियाटिक बॉडी',
    },
    svgPath: 'M 580 440 C 660 400 760 380 870 380 C 970 380 1040 395 1100 420 C 1110 460 1080 500 1020 530 C 940 560 840 575 730 560 C 640 550 590 500 580 440 Z',
    labelPosition: { x: 55, y: 33 },
  },

  tail: {
    id: 'tail',
    name: 'Pancreatic Tail',
    nameHi: 'पैन्क्रियाटिक टेल (अग्न्याशय की पूंछ)',
    scientificName: 'Cauda pancreatis',
    category: 'endocrine',
    badge: 'Peak Beta-Cell Density',
    badgeType: 'insulin',
    stat: '~60% Relative Islet Concentration',
    clinicalMarker: 'Beta-Cell Functional Reserve',
    summary: 'Tapering leftward tip reaching the splenic hilum, rich in insulin-producing beta cells.',
    oneLineFunction: 'Distal end reaching the spleen; possesses the highest concentration of beta-cell islets.',
    oneLineFunctionHi: 'तिल्ली तक पहुंचने वाला संकरा सिरा जिसमें इंसुलिन बनाने वाले द्वीपों का सर्वाधिक घनत्व होता है।',
    description: 'The narrow distal extremity contained within the splenorenal ligament, intimately related to the lower portion of the gastric surface of the spleen.',
    descriptionHi: 'तिल्ली (स्प्लीन) के पास स्थित संकरा भाग जिसमें इंसुलिन-स्रावी बीटा कोशिकाएं घनी होती हैं।',
    clinicalNote: 'Preserving functional tail parenchyma during surgery is crucial for maintaining residual insulin secretion and avoiding brittle diabetes.',
    clinicalNoteHi: 'सर्जरी के समय टेल को सुरक्षित रखना महत्वपूर्ण है ताकि इंसुलिन उत्पादन क्षमता बनी रहे।',
    diabeticRelevance: 'High concentration of Langerhans islets makes the tail vital for metabolic endurance.',
    hotspot: {
      cx: 1220,
      cy: 400,
      calloutX: 1280,
      calloutY: 280,
      title: 'Pancreatic Tail',
      titleHi: 'पैन्क्रियाटिक टेल',
    },
    svgPath: 'M 1080 420 C 1140 380 1220 345 1310 335 C 1350 335 1360 365 1345 400 C 1315 440 1240 475 1160 485 C 1110 490 1080 460 1080 420 Z',
    labelPosition: { x: 82, y: 28 },
  },

  duct: {
    id: 'duct',
    name: 'Main Pancreatic Duct',
    nameHi: 'पैन्क्रियाटिक डक्ट (विर्सुंग की नली)',
    scientificName: 'Ductus pancreaticus (Wirsung)',
    category: 'exocrine',
    badge: 'Enzyme Conductor',
    badgeType: 'enzyme',
    stat: '1–2 L/day Secretion Flow',
    clinicalMarker: 'Bicarbonate & Exocrine Pressure',
    summary: 'Central pale conduit running head-to-tail, collecting digestive enzymes.',
    oneLineFunction: 'Continuous pale tube collecting digestive enzymes to discharge into the duodenum.',
    oneLineFunctionHi: 'अग्न्याशय की केंद्रीय नली जो पाचक एंजाइमों को इकट्ठा कर छोटी आंत में पहुंचाती है।',
    description: 'Runs along the length of the pancreas from left to right, draining secondary lobular branches and uniting with the bile duct.',
    descriptionHi: 'पूंछ से सिर तक फैली मुख्य वाहिनी जो पाचक रस को छोटी आंत में डालती है।',
    clinicalNote: 'Ductal stones, alcohol toxicity, or intraductal mucin obstruct drainage, leading to acute pancreatitis flare-ups.',
    clinicalNoteHi: 'डक्ट में रुकावट या पथरी से पाचक रस रुक जाता है, जिससे तीव्र पैन्क्रियाटाइटिस का खतरा होता है।',
    diabeticRelevance: 'Ductal obstruction compromises adjacent beta-cell microcirculation, triggering secondary hyperglycemia.',
    hotspot: {
      cx: 780,
      cy: 470,
      calloutX: 680,
      calloutY: 390,
      title: 'Duct of Wirsung',
      titleHi: 'विर्सुंग की नली (Duct of Wirsung)',
    },
    svgPath: 'M 360 620 L 390 540 L 460 495 L 560 475 L 660 470 L 780 468 L 900 468 L 1020 475 L 1075 486 L 1180 455 L 1260 420 L 1330 375 L 1335 385 L 1265 430 L 1185 465 L 1080 495 L 1020 485 L 900 478 L 780 478 L 660 480 L 560 485 L 465 505 L 400 550 L 370 625 Z',
    labelPosition: { x: 45, y: 38 },
  },

  gallbladder: {
    id: 'gallbladder',
    name: 'Gallbladder',
    nameHi: 'पित्ताशय (गॉलब्लैडर)',
    scientificName: 'Vesica biliaris',
    category: 'structural',
    badge: 'Bile Reservoir',
    badgeType: 'organ',
    stat: '30–50 mL Bile Capacity',
    clinicalMarker: 'Ultrasound Scan & Bilirubin',
    summary: 'Green pear-shaped sac storing and concentrating liver bile for mealtime fat digestion.',
    oneLineFunction: 'Stores and concentrates hepatic bile, contracting post-meal to aid dietary fat emulsification.',
    oneLineFunctionHi: 'यकृत के पित्त रस का भंडारण व भोजन के बाद वसा पाचन हेतु पित्त का निष्कासन।',
    description: 'Located in a fossa on the visceral surface of the liver, connecting to the biliary tree via the cystic duct.',
    descriptionHi: 'यकृत के नीचे स्थित नाशपाती के आकार की थैली जो पित्त को गाढ़ा कर जमा करती है।',
    clinicalNote: 'Gallstones (cholelithiasis) can migrate down into the common bile duct, causing gallstone pancreatitis—a major medical emergency.',
    clinicalNoteHi: 'पित्त की पथरी फिसलकर पैन्क्रियाटिक नली में अटक सकती है, जो एक्यूट पैन्क्रियाटाइटिस का बड़ा कारण है।',
    diabeticRelevance: 'Diabetic autonomic neuropathy impairs gallbladder motility, tripling the risk of gallstone formation.',
    hotspot: {
      cx: 230,
      cy: 150,
      calloutX: 150,
      calloutY: 60,
      title: 'Gallbladder',
      titleHi: 'पित्ताशय (गॉलब्लैडर)',
    },
    svgPath: 'M 75 205 C 50 170 70 125 120 95 C 170 65 240 65 310 85 C 370 105 410 145 425 195 C 430 235 395 260 350 255 C 310 240 260 210 200 205 C 150 205 105 230 75 205 Z',
    labelPosition: { x: 10, y: 6 },
  },

  'bile-duct': {
    id: 'bile-duct',
    name: 'Common Bile Duct',
    nameHi: 'कॉमन बाइल डक्ट (पित्त वाहिनी)',
    scientificName: 'Ductus choledochus',
    category: 'exocrine',
    badge: 'Biliary Transit',
    badgeType: 'enzyme',
    stat: '6–8 mm Normal Caliber',
    clinicalMarker: 'Total Bilirubin & Alk Phos (ALP)',
    summary: 'Green muscular conduit conducting bile from gallbladder and liver into the duodenum.',
    oneLineFunction: 'Carries bile from liver and gallbladder through the pancreatic head to the intestine.',
    oneLineFunctionHi: 'यकृत और पित्ताशय से पित्त को अग्न्याशय के सिर से होते हुए आंत तक पहुंचाती है।',
    description: 'Forms by union of cystic and common hepatic ducts, descending behind and through the pancreatic head to open at the major duodenal papilla.',
    descriptionHi: 'पित्त को यकृत से छोटी आंत तक ले जाने वाली प्रमुख नली।',
    clinicalNote: 'Because it traverses the head of the pancreas, any pancreatic head mass compresses this duct, causing painless dark urine and jaundice.',
    clinicalNoteHi: 'यह नली पैन्क्रियास के सिर से गुजरती है; सिर में सूजन या रुकावट से गहरा पीलिया हो जाता है।',
    diabeticRelevance: 'Biliary obstruction triggers metabolic derangements and dyslipidemia.',
    hotspot: {
      cx: 410,
      cy: 310,
      calloutX: 280,
      calloutY: 50,
      title: 'Common Bile Duct',
      titleHi: 'कॉमन बाइल डक्ट',
    },
    svgPath: 'M 390 100 L 420 105 L 435 180 L 445 270 L 425 380 L 395 500 L 375 580 L 345 565 L 365 480 L 395 380 L 415 270 L 405 180 L 380 110 Z',
    labelPosition: { x: 18, y: 5 },
  },

  stomach: {
    id: 'stomach',
    name: 'Stomach',
    nameHi: 'आमाशय (पेट)',
    scientificName: 'Gaster',
    category: 'structural',
    badge: 'Anterior Bed',
    badgeType: 'organ',
    stat: '1.5 L Meal Reservoir',
    clinicalMarker: 'Gastric Emptying Time',
    summary: 'Large muscular digestive organ situated directly anterior to the pancreatic bed.',
    oneLineFunction: 'Acid-peptic digestive pouch that empties partially digested chyme into the duodenum.',
    oneLineFunctionHi: 'पाचन तंत्र का मुख्य अंग जो भोजन को पीसकर छोटी आंत में अग्रसारित करता है।',
    description: 'Forms the anterior boundary of the lesser sac (omental bursa); the pancreas forms a key component of the posterior stomach bed.',
    descriptionHi: 'अग्न्याशय के आगे स्थित मुख्य पाचक अंग जो भोजन को मथने का कार्य करता है।',
    clinicalNote: 'Diabetic gastroparesis from vagus nerve autonomic neuropathy causes delayed gastric emptying, nausea, and severe postprandial glucose swings.',
    clinicalNoteHi: 'डायबिटीज में वेगास तंत्रिका क्षति से पेट की गति धीमी हो जाती है (गैस्ट्रोपेरेसिस), जिससे शुगर अनियंत्रित होती है।',
    diabeticRelevance: 'Gastric emptying rate governs the timing of mealtime glucose spikes and insulin dosing.',
    hotspot: {
      cx: 820,
      cy: 180,
      calloutX: 850,
      calloutY: 60,
      title: 'Stomach',
      titleHi: 'आमाशय (पेट)',
    },
    svgPath: 'M 640 0 C 720 0 840 20 950 70 C 1050 120 1130 200 1165 290 C 1175 330 1150 370 1080 380 C 970 380 820 370 680 360 C 580 350 490 320 460 260 C 450 200 480 140 530 80 C 570 35 600 5 640 0 Z',
    labelPosition: { x: 55, y: 6 },
  },

  duodenum: {
    id: 'duodenum',
    name: 'Duodenum (C-Loop)',
    nameHi: 'ग्रहणी (डुओडेनम — छोटी आंत)',
    scientificName: 'Duodenum',
    category: 'structural',
    badge: 'Incretin Center',
    badgeType: 'metabolic',
    stat: '25 cm C-Shaped Curve',
    clinicalMarker: 'GLP-1 & Incretin Response',
    summary: 'First intestinal segment enclosing the pancreatic head; primary site of nutrient-stimulated incretin release.',
    oneLineFunction: 'Intestinal C-loop that receives bile and pancreatic juice to absorb early nutrients and signal GLP-1.',
    oneLineFunctionHi: 'छोटी आंत का सी-आकार का भाग जो पाचक रस प्राप्त कर ग्लूकोज नियंत्रण हेतु GLP-1 छोड़ता है।',
    description: 'Forms an anatomical horseshoe around the head of the pancreas, divided into superior, descending, horizontal, and ascending parts.',
    descriptionHi: 'अग्न्याशय के सिर को चारों ओर से घेरे रहने वाली छोटी आंत की प्रथम शाखा।',
    clinicalNote: 'Duodenal enteroendocrine L-cells secrete GLP-1 in response to nutrients, stimulating glucose-dependent insulin secretion (the incretin effect).',
    clinicalNoteHi: 'डुओडेनम की कोशिकाएं भोजन के बाद GLP-1 हार्मोन छोड़ती हैं, जो इंसुलिन स्राव को तेज करता है।',
    diabeticRelevance: 'Modern GLP-1 receptor agonist therapies harness this duodenal incretin mechanism to control diabetes.',
    hotspot: {
      cx: 200,
      cy: 620,
      calloutX: 100,
      calloutY: 720,
      title: 'Duodenum',
      titleHi: 'ग्रहणी (डुओडेनम)',
    },
    svgPath: 'M 310 200 C 400 190 440 230 430 270 C 350 290 280 340 220 410 C 140 500 100 610 110 720 C 130 840 220 920 360 945 C 500 950 660 890 780 800 C 810 760 790 710 740 690 C 690 730 600 770 500 770 C 400 770 330 730 280 660 C 240 580 240 490 270 410 C 300 340 360 280 430 250 L 390 210 C 310 210 250 260 200 330 C 120 430 70 560 80 690 C 100 830 200 930 350 950 C 500 960 670 900 800 800 L 780 730 C 720 780 620 830 500 830 C 380 830 290 770 240 690 C 190 600 190 490 230 400 C 270 320 330 250 400 210 Z',
    labelPosition: { x: 6, y: 72 },
  },

  spleen: {
    id: 'spleen',
    name: 'Spleen',
    nameHi: 'प्लीहा / तिल्ली (स्प्लीन)',
    scientificName: 'Splen / Lien',
    category: 'structural',
    badge: 'Vascular & Immune Filter',
    badgeType: 'organ',
    stat: '~150 g Lymphoid Mass',
    clinicalMarker: 'Platelet Count & Splenic Axis',
    summary: 'Dark crescent lymphoid organ at the far right touching the pancreatic tail.',
    oneLineFunction: 'Filters blood, recycles old red blood cells, and houses immunological surveillance.',
    oneLineFunctionHi: 'रक्त शुद्धिकरण, लाल रक्त कोशिकाओं का नवीनीकरण और प्रतिरक्षा निगरानी।',
    description: 'Located in the left hypochondrium under the diaphragm; its hilum directly adjoins the tip of the pancreatic tail.',
    descriptionHi: 'बाईं पसलियों के नीचे स्थित अंग जो अग्न्याशय की पूंछ से सीधा सटा होता है।',
    clinicalNote: 'Splenic vein thrombosis is a known complication of chronic pancreatic inflammation, leading to gastric varices.',
    clinicalNoteHi: 'पैन्क्रियास की गंभीर सूजन से स्प्लेनिक नस में रुकावट आ सकती है, जिससे रक्तस्राव का जोखिम बढ़ता है।',
    diabeticRelevance: 'Diabetic susceptibility to encapsulated bacterial infections requires attention to splenic immune status.',
    hotspot: {
      cx: 1380,
      cy: 340,
      calloutX: 1440,
      calloutY: 140,
      title: 'Spleen',
      titleHi: 'प्लीहा (स्प्लीन)',
    },
    svgPath: 'M 1280 160 C 1350 120 1440 140 1485 210 C 1530 280 1530 400 1480 490 C 1440 560 1360 600 1290 590 C 1240 580 1230 520 1250 460 C 1270 400 1255 330 1235 270 C 1225 220 1240 180 1280 160 Z',
    labelPosition: { x: 94, y: 14 },
  },

  vasculature: {
    id: 'vasculature',
    name: 'Vascular Axis',
    nameHi: 'संवहनी अक्ष (Splenic & Mesenteric Vessels)',
    scientificName: 'Vasa splenica & mesenterica',
    category: 'vascular',
    badge: 'Microcirculatory Lifeline',
    badgeType: 'vascular',
    stat: 'High-Flow Portal Network',
    clinicalMarker: 'Portal Doppler & Resistance',
    summary: 'Splenic and mesenteric vascular trunks carrying oxygenated blood and draining portal insulin directly to the liver.',
    oneLineFunction: 'Supplies high-pressure oxygenated blood and delivers secreted insulin directly to the hepatic portal system.',
    oneLineFunctionHi: 'अग्न्याशय को रक्त प्रदान करता है और स्रावित इंसुलिन को सीधे यकृत (लिवर) तक पहुंचाता है।',
    description: 'The splenic artery winds tortuously above the body/tail, while splenic and mesenteric veins unite behind the pancreatic neck to form the hepatic portal vein.',
    descriptionHi: 'स्प्लेनिक व मेसेंटेरिक रक्त नलिकाएं जो अग्न्याशय को पोषित कर इंसुलिन को लिवर तक ले जाती हैं।',
    clinicalNote: 'Insulin secreted by beta cells enters the portal vein at 2-3x higher concentration than peripheral circulation, driving hepatic glucose shutoff.',
    clinicalNoteHi: 'बीटा कोशिकाओं से निकला इंसुलिन पोर्टल नस से सीधे लिवर पहुंचकर ग्लूकोज उत्पादन रोकता है।',
    diabeticRelevance: 'Diabetic micro- and macroangiopathy accelerates arterial calcification across the celiac and mesenteric trunks.',
    hotspot: {
      cx: 560,
      cy: 160,
      calloutX: 480,
      calloutY: 30,
      title: 'Vascular Axis',
      titleHi: 'संवहनी अक्ष',
    },
    svgPath: 'M 480 20 L 530 15 L 545 140 L 575 80 L 610 20 L 640 40 L 610 130 L 650 200 L 640 280 L 590 310 L 550 290 L 535 210 L 505 140 Z M 690 590 L 760 580 L 800 640 L 840 760 L 820 900 L 750 920 L 730 830 L 740 730 L 700 670 Z',
    labelPosition: { x: 31, y: 3 },
  },
};

export const HOTSPOT_LIST: PancreasPartId[] = [
  'islets',
  'head',
  'body',
  'tail',
  'duct',
  'gallbladder',
  'bile-duct',
  'stomach',
  'duodenum',
  'spleen',
  'vasculature',
];

export const CATEGORY_TABS = [
  { id: 'all', label: { en: 'All Structures', hi: 'सभी संरचनाएं' } },
  { id: 'endocrine', label: { en: 'Endocrine Axis', hi: 'अंतःस्रावी अक्ष' } },
  { id: 'exocrine', label: { en: 'Exocrine & Ducts', hi: 'पाचक रस एवं नलियां' } },
  { id: 'vascular', label: { en: 'Vascular Axis', hi: 'संवहनी तंत्र' } },
  { id: 'structural', label: { en: 'Surrounding Organs', hi: 'संबंधित अंग' } },
];
