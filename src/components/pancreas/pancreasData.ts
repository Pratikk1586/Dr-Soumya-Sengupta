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
  | 'bile-duct';

export interface PancreasPartInfo {
  id: PancreasPartId;
  name: string;
  scientificName: string;
  category: Exclude<PancreasPartCategory, 'all'>;
  badge: string;
  badgeType: 'insulin' | 'enzyme' | 'metabolic' | 'vascular';
  stat: string;
  clinicalMarker: string;
  summary: string;
  description: string;
  diabeticRelevance: string;
  hotspot: {
    cx: number;
    cy: number;
    calloutX: number;
    calloutY: number;
    title: string;
  };
}

export const PANCREAS_DATA: Record<PancreasPartId, PancreasPartInfo> = {
  islets: {
    id: 'islets',
    name: 'Islets of Langerhans',
    scientificName: 'Insulae Pancreaticae',
    category: 'endocrine',
    badge: 'Beta & Alpha Cells',
    badgeType: 'insulin',
    stat: '1–2 Million Micro-Islets',
    clinicalMarker: 'C-Peptide & Fasting Insulin',
    summary: 'Micro-clusters of beta and alpha cells that produce insulin and glucagon.',
    description:
      'Micro-clusters of beta and alpha cells embedded in the parenchyma that produce insulin and glucagon to balance blood glucose.',
    diabeticRelevance:
      'Primary target in diabetes: destroyed by autoimmunity in Type 1 and exhausted by chronic insulin resistance in Type 2.',
    hotspot: {
      cx: 385,
      cy: 195,
      calloutX: 435,
      calloutY: 280,
      title: 'Endocrine Beta Cells',
    },
  },
  tail: {
    id: 'tail',
    name: 'Tail & Splenic Hilum',
    scientificName: 'Cauda Pancreatis & Hilum Splenicum',
    category: 'endocrine',
    badge: 'Peak Islet Density',
    badgeType: 'insulin',
    stat: '~60% Islet Concentration',
    clinicalMarker: 'Beta-Cell Functional Reserve',
    summary: 'The tapered lateral segment extending to the splenic hilum with highest endocrine density.',
    description:
      'The tapered tail extends directly into the splenic hilum, housing the highest anatomical density of insulin-secreting beta cells.',
    diabeticRelevance:
      'Preserving functional beta-cell reserve in the tail is vital for long-term metabolic control.',
    hotspot: {
      cx: 425,
      cy: 175,
      calloutX: 470,
      calloutY: 115,
      title: 'Pancreatic Tail',
    },
  },
  body: {
    id: 'body',
    name: 'Body of Pancreas',
    scientificName: 'Corpus Pancreatis',
    category: 'structural',
    badge: 'Central Metabolic Bridge',
    badgeType: 'metabolic',
    stat: 'Lobulated Parenchyma',
    clinicalMarker: 'HOMA-IR & Glycemic Variability',
    summary: 'The central glandular span producing vital metabolic peptides.',
    description:
      'Central glandular bridge covered with acinar lobules that synthesize digestive enzymes and metabolic regulatory peptides.',
    diabeticRelevance:
      'Visceral lipid accumulation in the body parenchyma accelerates insulin resistance.',
    hotspot: {
      cx: 310,
      cy: 220,
      calloutX: 315,
      calloutY: 110,
      title: 'Pancreatic Body',
    },
  },
  head: {
    id: 'head',
    name: 'Head & Uncinate Process',
    scientificName: 'Caput & Processus Uncinatus',
    category: 'structural',
    badge: 'Duodenal Interface',
    badgeType: 'enzyme',
    stat: 'C-Loop Anchor',
    clinicalMarker: 'Pancreatic Polypeptide (PP)',
    summary: 'The expanded medial portion nestled in the duodenal curve.',
    description:
      'Expanded medial gland nestled in the duodenal C-loop, with an uncinate process hooking behind the superior mesenteric vessels.',
    diabeticRelevance:
      'Coordinates with duodenal incretins (GLP-1) to trigger early-phase insulin release upon nutrient entry.',
    hotspot: {
      cx: 185,
      cy: 270,
      calloutX: 110,
      calloutY: 385,
      title: 'Head of Pancreas',
    },
  },
  duct: {
    id: 'duct',
    name: 'Main Pancreatic Duct',
    scientificName: 'Ductus Pancreaticus (Wirsung)',
    category: 'exocrine',
    badge: 'Enzyme Conductor',
    badgeType: 'enzyme',
    stat: '1.5–2.0 L/Day Secretion',
    clinicalMarker: 'Serum Amylase & Lipase',
    summary: 'Transports digestive enzymes directly to the duodenal lumen.',
    description:
      'Traverses the gland receiving branching tributaries, uniting with the bile duct at the Ampulla of Vater into the duodenum.',
    diabeticRelevance:
      'Exocrine insufficiency frequently coexists with long-standing diabetes, altering glycemic stability.',
    hotspot: {
      cx: 280,
      cy: 240,
      calloutX: 270,
      calloutY: 345,
      title: 'Duct of Wirsung',
    },
  },
  duodenum: {
    id: 'duodenum',
    name: 'Duodenal C-Loop',
    scientificName: 'Duodenum (Pars C-forma)',
    category: 'exocrine',
    badge: 'Incretin Hormone Axis',
    badgeType: 'metabolic',
    stat: 'Primary Nutrient Sensor',
    clinicalMarker: 'GLP-1 & GIP Incretin Axis',
    summary: 'C-shaped intestinal loop triggering the incretin response.',
    description:
      'C-shaped intestinal loop (D1–D4) with circular mucosal folds that senses digested nutrients and triggers GLP-1 insulin release.',
    diabeticRelevance:
      'The incretin gut-pancreas axis accounts for 50–70% of postprandial insulin release.',
    hotspot: {
      cx: 95,
      cy: 250,
      calloutX: 55,
      calloutY: 190,
      title: 'Duodenal C-Loop',
    },
  },
  vasculature: {
    id: 'vasculature',
    name: 'Splenic, Portal & Mesenteric Vessels',
    scientificName: 'Vasa Splenica & Axis Portalis',
    category: 'vascular',
    badge: 'First-Pass Transport',
    badgeType: 'vascular',
    stat: 'High-Volume Perfusion',
    clinicalMarker: 'Hepatic Insulin Clearance',
    summary: 'Vascular network supplying the system and carrying insulin to the liver.',
    description:
      'Tortuous splenic artery, splenic vein, and superior mesenteric vessels supplying the gland and carrying secreted insulin directly to the liver.',
    diabeticRelevance:
      'Delivers newly secreted portal insulin directly to hepatic circulation for first-pass glycemic regulation.',
    hotspot: {
      cx: 350,
      cy: 155,
      calloutX: 395,
      calloutY: 75,
      title: 'Splenic & Portal Axis',
    },
  },
  'bile-duct': {
    id: 'bile-duct',
    name: 'Gallbladder & Biliary System',
    scientificName: 'Vesica Biliaris & Ductus Choledochus',
    category: 'exocrine',
    badge: 'Biliary System',
    badgeType: 'enzyme',
    stat: 'Bile Delivery',
    clinicalMarker: 'Total Bilirubin & Alk Phos',
    summary: 'Stores and delivers bile into the duodenum at the ampulla of Vater.',
    description:
      'The pear-shaped gallbladder and common bile duct descend to join the pancreatic duct at the Ampulla of Vater, aiding digestion.',
    diabeticRelevance:
      'Gallstone obstruction can trigger pancreatitis, requiring prompt clinical differentiation in diabetic patients.',
    hotspot: {
      cx: 155,
      cy: 115,
      calloutX: 135,
      calloutY: 55,
      title: 'Common Bile Duct',
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
];

export const CATEGORY_TABS: Array<{ id: PancreasPartCategory; label: string; count: number }> = [
  { id: 'all', label: 'All Anatomy', count: 8 },
  { id: 'endocrine', label: 'Endocrine Axis', count: 2 },
  { id: 'exocrine', label: 'Exocrine & Ducts', count: 3 },
  { id: 'vascular', label: 'Vascular Supply', count: 1 },
  { id: 'structural', label: 'Parenchyma Lobes', count: 2 },
];
