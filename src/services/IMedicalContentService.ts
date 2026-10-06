import type { ClinicalService, PatientFaq } from '../types/services';
import type { EducationalArticle, BloodSugarTargetRange } from '../types/education';
import type { PlaceholderEntry } from '../data/_placeholders';

export interface IMedicalContentService {
  getClinicalServices(): Promise<ClinicalService[]>;
  getServiceBySlug(slug: string): Promise<ClinicalService | undefined>;
  getArticles(): Promise<EducationalArticle[]>;
  getArticleBySlug(slug: string): Promise<EducationalArticle | undefined>;
  getFaqs(category?: string): Promise<PatientFaq[]>;
  getBloodSugarTargets(): Promise<BloodSugarTargetRange[]>;
  getPlaceholders(): Promise<PlaceholderEntry[]>;
}
