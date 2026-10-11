/**
 * Scientific anatomical data and clinical diabetology descriptions for the Pancreas System.
 * Specifically structured for patient education and clinical precision.
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
  | 'bile-duct';

export interface PancreasPartInfo {
  id: PancreasPartId;
  name: string;
  nameHi?: string;
  scientificName: string;
  category: Exclude<PancreasPartCategory, 'all'>;
  badge: string;
  badgeType: 'insulin' | 'enzyme' | 'metabolic' | 'vascular';
  stat: string;
  clinicalMarker: string;
  summary: string;
  description: string;
  descriptionHi?: string;
  diabeticRelevance: string;
  hotspot: {
    cx: number;
    cy: number;
    calloutX: number;
    calloutY: number;
    title: string;
    titleHi?: string;
  };
}

export const PANCREAS_DATA: Record<PancreasPartId, PancreasPartInfo> = {
  islets: {
    id: 'islets',
    name: 'Islets of Langerhans',
    nameHi: 'लैंगरहेंस द्वीप (Beta Cells & Islets)',
    scientificName: 'Insulae Pancreaticae',
    category: 'endocrine',
    badge: 'Beta & Alpha Cells',
    badgeType: 'insulin',
    stat: '1–2 Million Micro-Islets',
    clinicalMarker: 'C-Peptide & Fasting Insulin',
    summary: 'About 1-2 million clusters; beta cells make insulin, alpha cells make glucagon',
    description:
      'About 1-2 million clusters; beta cells make insulin, alpha cells make glucagon',
    descriptionHi:
      'अग्न्याशय में 10 से 20 लाख सूक्ष्म द्वीप; बीटा कोशिकाएं इंसुलिन और अल्फा कोशिकाएं ग्लूकागन बनाती हैं।',
    diabeticRelevance:
      'Primary target in diabetes: destroyed by autoimmunity in Type 1 and exhausted by chronic insulin resistance in Type 2.',
    hotspot: {
      cx: 375,
      cy: 220,
      calloutX: 420,
      calloutY: 300,
      title: 'Beta Cells & Islets',
      titleHi: 'बीटा कोशिकाएं एवं द्वीप',
    },
  },
  tail: {
    id: 'tail',
    name: 'Pancreatic Tail',
    nameHi: 'अग्न्याशय की पूंछ (Tail)',
    scientificName: 'Cauda pancreatis',
    category: 'endocrine',
    badge: 'Peak Islet Density',
    badgeType: 'insulin',
    stat: '~60% Islet Concentration',
    clinicalMarker: 'Beta-Cell Functional Reserve',
    summary: 'Tapers toward the spleen; highest density of islets',
    description:
      'Tapers toward the spleen; highest density of islets',
    descriptionHi:
      'तिल्ली की ओर संकरा होता हिस्सा; इसमें इंसुलिन बनाने वाले द्वीपों का सर्वाधिक घनत्व होता है।',
    diabeticRelevance:
      'Preserving functional beta-cell reserve in the tail is vital for long-term metabolic control.',
    hotspot: {
      cx: 418,
      cy: 200,
      calloutX: 450,
      calloutY: 135,
      title: 'Pancreatic Tail',
      titleHi: 'पैन्क्रियाटिक टेल',
    },
  },
  body: {
    id: 'body',
    name: 'Pancreatic Body',
    nameHi: 'अग्न्याशय का मुख्य भाग (Body)',
    scientificName: 'Corpus pancreatis',
    category: 'structural',
    badge: 'Central Metabolic Bridge',
    badgeType: 'metabolic',
    stat: 'Lobulated Parenchyma',
    clinicalMarker: 'HOMA-IR & Glycemic Variability',
    summary: 'Central portion crossing the spine; rich in islet tissue',
    description:
      'Central portion crossing the spine; rich in islet tissue',
    descriptionHi:
      'रीढ़ के सामने से गुजरने वाला केंद्रीय भाग; रक्त शर्करा नियंत्रक ऊतकों से भरपूर।',
    diabeticRelevance:
      'Visceral lipid accumulation in the body parenchyma accelerates insulin resistance.',
    hotspot: {
      cx: 310,
      cy: 235,
      calloutX: 295,
      calloutY: 110,
      title: 'Pancreatic Body',
      titleHi: 'पैन्क्रियाटिक बॉडी',
    },
  },
  head: {
    id: 'head',
    name: 'Head of Pancreas',
    nameHi: 'अग्न्याशय का सिर (Head)',
    scientificName: 'Caput pancreatis',
    category: 'structural',
    badge: 'Duodenal Interface',
    badgeType: 'enzyme',
    stat: 'C-Loop Anchor',
    clinicalMarker: 'Pancreatic Polypeptide (PP)',
    summary: 'Sits inside the duodenal C-loop; releases digestive enzymes into the duodenum',
    description:
      'Sits inside the duodenal C-loop; releases digestive enzymes into the duodenum',
    descriptionHi:
      'ग्रहणी (Duodenum) के घुमाव में स्थित; पाचन एंजाइमों को सीधे आंत में स्रावित करता है।',
    diabeticRelevance:
      'Coordinates with duodenal incretins (GLP-1) to trigger early-phase insulin release upon nutrient entry.',
    hotspot: {
      cx: 195,
      cy: 275,
      calloutX: 115,
      calloutY: 380,
      title: 'Head of Pancreas',
      titleHi: 'हेड ऑफ पैन्क्रियाज',
    },
  },
  duct: {
    id: 'duct',
    name: 'Main Pancreatic Duct',
    nameHi: 'विर्सुंग की मुख्य नली (Duct of Wirsung)',
    scientificName: 'Duct of Wirsung (Ductus Pancreaticus)',
    category: 'exocrine',
    badge: 'Enzyme Conductor',
    badgeType: 'enzyme',
    stat: '1.5–2.0 L/Day Secretion',
    clinicalMarker: 'Serum Amylase & Lipase',
    summary: 'Carries enzymes to the ampulla of Vater',
    description:
      'Carries enzymes to the ampulla of Vater',
    descriptionHi:
      'पाचन एंजाइमों को एम्प्युला ऑफ वैटर के माध्यम से छोटी आंत तक पहुंचाता है।',
    diabeticRelevance:
      'Exocrine insufficiency frequently coexists with long-standing diabetes, altering glycemic stability.',
    hotspot: {
      cx: 290,
      cy: 250,
      calloutX: 285,
      calloutY: 345,
      title: 'Duct of Wirsung',
      titleHi: 'डक्ट ऑफ विर्सुंग',
    },
  },
  duodenum: {
    id: 'duodenum',
    name: 'Duodenal C-Loop',
    nameHi: 'ग्रहणी (Duodenal C-Loop)',
    scientificName: 'Duodenum',
    category: 'exocrine',
    badge: 'Incretin Hormone Axis',
    badgeType: 'metabolic',
    stat: 'Primary Nutrient Sensor',
    clinicalMarker: 'GLP-1 & GIP Incretin Axis',
    summary: 'First part of the small intestine, wraps the pancreatic head',
    description:
      'First part of the small intestine, wraps the pancreatic head',
    descriptionHi:
      'छोटी आंत का प्रारंभिक C-आकार का घुमाव जो भोजन के प्रवेश पर GLP-1 हार्मोन सक्रिय करता है।',
    diabeticRelevance:
      'The incretin gut-pancreas axis accounts for 50–70% of postprandial insulin release.',
    hotspot: {
      cx: 110,
      cy: 260,
      calloutX: 55,
      calloutY: 195,
      title: 'Duodenal C-Loop',
      titleHi: 'ड्यूओडिनल सी-लूप',
    },
  },
  vasculature: {
    id: 'vasculature',
    name: 'Vascular Axis',
    nameHi: 'रक्त वाहिका अक्ष (Vessels)',
    scientificName: 'Splenic vein and artery',
    category: 'vascular',
    badge: 'First-Pass Transport',
    badgeType: 'vascular',
    stat: 'High-Volume Perfusion',
    clinicalMarker: 'Hepatic Insulin Clearance',
    summary: 'Supplies and drains the gland along its back surface',
    description:
      'Supplies and drains the gland along its back surface',
    descriptionHi:
      'अग्न्याशय के पिछले हिस्से में स्थित धमनियां एवं नसें जो नए बने इंसुलिन को सीधे यकृत तक ले जाती हैं।',
    diabeticRelevance:
      'Delivers newly secreted portal insulin directly to hepatic circulation for first-pass glycemic regulation.',
    hotspot: {
      cx: 355,
      cy: 165,
      calloutX: 385,
      calloutY: 70,
      title: 'Vascular Axis',
      titleHi: 'वैस्कुलर एक्सिस',
    },
  },
  spleen: {
    id: 'spleen',
    name: 'Spleen',
    nameHi: 'प्लीहा (तिल्ली / Spleen)',
    scientificName: 'Splen',
    category: 'structural',
    badge: 'Anatomical Anchor',
    badgeType: 'metabolic',
    stat: 'Left Upper Quadrant',
    clinicalMarker: 'Splenoportal Flow',
    summary: 'Lies against the tail of the pancreas; anatomical landmark',
    description:
      'Lies against the tail of the pancreas; anatomical landmark',
    descriptionHi:
      'अग्न्याशय की पूंछ से सटा हुआ महत्वपूर्ण अंग; रक्त शोधन और संचार का प्रमुख लैंडमार्क।',
    diabeticRelevance:
      'Splenic vasculature carries newly released pancreatic hormones directly toward the portal system.',
    hotspot: {
      cx: 468,
      cy: 185,
      calloutX: 475,
      calloutY: 245,
      title: 'Spleen',
      titleHi: 'प्लीहा (Spleen)',
    },
  },
  'bile-duct': {
    id: 'bile-duct',
    name: 'Gallbladder & Biliary System',
    nameHi: 'पित्ताशय एवं पित्त नली',
    scientificName: 'Vesica Biliaris & Ductus Choledochus',
    category: 'exocrine',
    badge: 'Biliary System',
    badgeType: 'enzyme',
    stat: 'Bile Delivery',
    clinicalMarker: 'Total Bilirubin & Alk Phos',
    summary: 'Stores and delivers bile into the duodenum at the ampulla of Vater.',
    description:
      'The pear-shaped gallbladder and common bile duct descend to join the pancreatic duct at the Ampulla of Vater, aiding digestion.',
    descriptionHi:
      'पित्त नली जो अग्न्याशय की नली से मिलकर पाचन में सहायता करती है।',
    diabeticRelevance:
      'Gallstone obstruction can trigger pancreatitis, requiring prompt clinical differentiation in diabetic patients.',
    hotspot: {
      cx: 155,
      cy: 115,
      calloutX: 135,
      calloutY: 55,
      title: 'Common Bile Duct',
      titleHi: 'पित्त नली',
    },
  },
};

export const HOTSPOT_LIST: PancreasPartId[] = [
  'islets',
  'body',
  'duct',
  'head',
  'tail',
  'duodenum',
  'vasculature',
  'spleen',
];

export const CATEGORY_TABS: Array<{ id: PancreasPartCategory; label: string; count: number }> = [
  { id: 'all', label: 'All Anatomy', count: 8 },
  { id: 'endocrine', label: 'Endocrine Axis', count: 2 },
  { id: 'exocrine', label: 'Exocrine & Ducts', count: 2 },
  { id: 'vascular', label: 'Vascular Supply', count: 1 },
  { id: 'structural', label: 'Parenchyma & Organs', count: 3 },
];
