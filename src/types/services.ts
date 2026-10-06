import type { LocalizedString } from './content';

export interface ClinicalService {
  id: string;
  slug: string;
  title: LocalizedString;
  shortDescription: LocalizedString;
  fullDescription: LocalizedString;
  indications: LocalizedString[];
  clinicalApproach: LocalizedString[];
  faqSummary?: LocalizedString;
  iconName: string;
}

export interface PatientFaq {
  id: string;
  category: 'general' | 'treatment' | 'diet_lifestyle' | 'emergency';
  question: LocalizedString;
  answer: LocalizedString;
}
