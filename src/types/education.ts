import type { LocalizedString, ReviewStatus } from './content';

export interface BloodSugarTargetRange {
  label: LocalizedString;
  fastingMgDl: string;
  postPrandialMgDl: string;
  notes: LocalizedString;
}

export interface EducationalArticle {
  id: string;
  slug: string;
  title: LocalizedString;
  excerpt: LocalizedString;
  category: LocalizedString;
  readTimeMinutes: number;
  contentParagraphs: LocalizedString[];
  keyTakeaways: LocalizedString[];
  clinicalDisclaimer: LocalizedString;
  reviewStatus: ReviewStatus;
}
