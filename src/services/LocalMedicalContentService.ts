import type { IMedicalContentService } from './IMedicalContentService';
import type { ClinicalService, PatientFaq } from '../types/services';
import type { EducationalArticle, BloodSugarTargetRange } from '../types/education';
import type { PlaceholderEntry } from '../data/_placeholders';
import { CLINICAL_SERVICES_DATA } from '../data/clinicalServices';
import { EDUCATIONAL_ARTICLES_DATA, BLOOD_SUGAR_TARGETS } from '../data/education';
import { PATIENT_FAQS_DATA } from '../data/faq';
import { PLACEHOLDER_REGISTRY } from '../data/_placeholders';

export class LocalMedicalContentService implements IMedicalContentService {
  async getClinicalServices(): Promise<ClinicalService[]> {
    return Promise.resolve(CLINICAL_SERVICES_DATA);
  }

  async getServiceBySlug(slug: string): Promise<ClinicalService | undefined> {
    const service = CLINICAL_SERVICES_DATA.find((s) => s.slug === slug);
    return Promise.resolve(service);
  }

  async getArticles(): Promise<EducationalArticle[]> {
    return Promise.resolve(EDUCATIONAL_ARTICLES_DATA);
  }

  async getArticleBySlug(slug: string): Promise<EducationalArticle | undefined> {
    const article = EDUCATIONAL_ARTICLES_DATA.find((a) => a.slug === slug);
    return Promise.resolve(article);
  }

  async getFaqs(category?: string): Promise<PatientFaq[]> {
    if (!category || category === 'all') {
      return Promise.resolve(PATIENT_FAQS_DATA);
    }
    const filtered = PATIENT_FAQS_DATA.filter((f) => f.category === category);
    return Promise.resolve(filtered);
  }

  async getBloodSugarTargets(): Promise<BloodSugarTargetRange[]> {
    return Promise.resolve(BLOOD_SUGAR_TARGETS);
  }

  async getPlaceholders(): Promise<PlaceholderEntry[]> {
    return Promise.resolve(PLACEHOLDER_REGISTRY);
  }
}
