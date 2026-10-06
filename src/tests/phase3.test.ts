import { describe, it, expect } from 'vitest';
import {
  problemService,
  reportService,
  articleService,
  faqService,
  guideService,
  videoService,
  searchService,
} from '../services';

describe('Phase 3 — Patient Education & Content Services', () => {
  it('problemService returns all 6 interactive guidance topics with non-diagnostic guidance', async () => {
    const problems = await problemService.getProblems();
    expect(problems).toHaveLength(6);

    for (const prob of problems) {
      expect(prob.slug).toBeTruthy();
      expect(prob.title.en).toBeTruthy();
      expect(prob.title.hi).toBeTruthy();
      expect(prob.generalInfo.en).toBeTruthy();
      expect(prob.keyConsiderations.length).toBeGreaterThan(0);
      expect(prob.relatedPageLink).toBeTruthy();
      expect(prob.relatedResourceLink).toBeTruthy();
    }
  });

  it('reportService returns the 7 metabolic biomarkers with strict educational framing', async () => {
    const reports = await reportService.getReports();
    expect(reports.length).toBeGreaterThanOrEqual(7);

    for (const rep of reports) {
      expect(rep.key).toBeTruthy();
      expect(rep.title.en).toBeTruthy();
      expect(rep.testName.en).toBeTruthy();
      expect(rep.whatItIs.en).toBeTruthy();
      expect(rep.whyItIsMeasured.en).toBeTruthy();
      expect(rep.generalEducationalMeaning.en).toBeTruthy();
      expect(rep.referenceRangeGuideline).toBeDefined();
      expect(rep.referenceRangeGuideline?.standardRange).toContain('[CONTENT TO BE VERIFIED]');
    }
  });

  it('articleService returns comprehensive clinical articles across patient education categories', async () => {
    const articles = await articleService.getArticles();
    expect(articles.length).toBeGreaterThanOrEqual(8);

    for (const art of articles) {
      expect(art.slug).toBeTruthy();
      expect(art.title.en).toBeTruthy();
      expect(art.title.hi).toBeTruthy();
      expect(art.excerpt.en).toBeTruthy();
      expect(art.contentParagraphs.length).toBeGreaterThan(1);
      expect(art.keyTakeaways.length).toBeGreaterThan(0);
      expect(art.readTimeMinutes).toBeGreaterThan(0);
    }
  });

  it('faqService returns categorized FAQs with unique deep-link slugs', async () => {
    const faqs = await faqService.getFaqs();
    expect(faqs.length).toBeGreaterThanOrEqual(10);

    const slugs = faqs.map((f) => f.slug || f.id);
    const uniqueSlugs = new Set(slugs);
    expect(uniqueSlugs.size).toBe(faqs.length);

    for (const f of faqs) {
      expect(f.question.en).toBeTruthy();
      expect(f.answer.en).toBeTruthy();
      expect(f.category).toBeTruthy();
    }
  });

  it('guideService provides actionable step-by-step patient self-care guides', async () => {
    const guides = await guideService.getGuides();
    expect(guides.length).toBeGreaterThanOrEqual(4);

    for (const g of guides) {
      expect(g.slug).toBeTruthy();
      expect(g.title.en).toBeTruthy();
      expect(g.summary.en).toBeTruthy();
      expect(g.steps.length).toBeGreaterThanOrEqual(4);
    }
  });

  it('videoService provides patient masterclasses with complete transcripts', async () => {
    const videos = await videoService.getVideos();
    expect(videos.length).toBeGreaterThanOrEqual(5);

    for (const v of videos) {
      expect(v.title.en).toBeTruthy();
      expect(v.description.en).toBeTruthy();
      expect(v.transcript?.en).toBeTruthy();
      expect(v.transcript?.hi).toBeTruthy();
      expect(v.durationMinutes).toBeGreaterThan(0);
    }
  });
});

describe('Phase 3 — Global Smart Search Engine', () => {
  it('returns empty array when query is less than 2 characters', async () => {
    const resultEmpty = await searchService.search('', 'en');
    const resultOneChar = await searchService.search('a', 'en');
    expect(resultEmpty).toEqual([]);
    expect(resultOneChar).toEqual([]);
  });

  it('ranks exact/prefix title matches higher than body matches', async () => {
    const results = await searchService.search('HbA1c', 'en');
    expect(results.length).toBeGreaterThan(0);

    const firstResult = results[0];
    expect(firstResult.title.toLowerCase()).toContain('hba1c');
    expect(firstResult.score).toBeGreaterThan(80);
  });

  it('performs bilingual search matching Hindi terms correctly', async () => {
    const results = await searchService.search('थायरॉयड', 'hi');
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((r) => r.title.includes('थायरॉयड') || r.snippet.includes('थायरॉयड'))).toBe(true);
  });

  it('returns popular suggestions in both English and Hindi', () => {
    const suggestionsEn = searchService.getPopularSuggestions('en');
    const suggestionsHi = searchService.getPopularSuggestions('hi');

    expect(suggestionsEn.length).toBeGreaterThan(3);
    expect(suggestionsHi.length).toBeGreaterThan(3);
    expect(suggestionsEn[0]).toContain('HbA1c');
    expect(suggestionsHi[0]).toContain('एचबीए1सी');
  });

  it('handles zero results gracefully for non-existent medical queries', async () => {
    const results = await searchService.search('xyznonexistentterm12345', 'en');
    expect(results).toEqual([]);
  });
});
