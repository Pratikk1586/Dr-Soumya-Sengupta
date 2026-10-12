import React, { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Clock, BookOpen, ArrowRight, Calendar } from 'lucide-react';
import { SEO } from '../../components/common/SEO';
import { Container } from '../../components/common/Container';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { Card } from '../../components/common/Card';
import { EmptyState } from '../../components/common/EmptyState';
import { MedicalDisclaimerBanner } from '../../components/common/MedicalDisclaimerBanner';
import { useLanguage } from '../../context/useLanguage';
import { useService } from '../../hooks/useService';
import { articleService } from '../../services';
import { formatDateInIST } from '../../utils/date';

const CATEGORIES = [
  { id: 'all', label: { en: 'All Topics', hi: 'सभी विषय' } },
  { id: 'diabetes-basics', label: { en: 'Diabetes Basics', hi: 'डायबिटीज बेसिक्स' } },
  { id: 'diet-nutrition', label: { en: 'Diet & Nutrition', hi: 'आहार एवं पोषण' } },
  { id: 'lifestyle', label: { en: 'Lifestyle', hi: 'जीवनशैली' } },
  { id: 'hba1c', label: { en: 'HbA1c', hi: 'HbA1c' } },
  { id: 'blood-sugar', label: { en: 'Blood Sugar', hi: 'ब्लड शुगर' } },
  { id: 'complications', label: { en: 'Complications', hi: 'जटिलताएं' } },
  { id: 'prevention', label: { en: 'Prevention', hi: 'रोकथाम' } },
  { id: 'awareness', label: { en: 'Awareness', hi: 'जागरूकता' } },
];

export const ArticlesListPage: React.FC = () => {
  const { localize, language, t } = useLanguage();
  const { data: articles, isLoading } = useService(() => articleService.getArticles(), []);
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = searchParams.get('category') || 'all';

  const filteredArticles = useMemo(() => {
    if (!articles) return [];
    if (selectedCategory === 'all') return articles;

    return articles.filter((art) => {
      const catEn = art.category.en.toLowerCase().replace(/[^a-z0-9]/g, '-');
      return catEn.includes(selectedCategory) || selectedCategory.includes(catEn);
    });
  }, [articles, selectedCategory]);

  const handleCategoryChange = (catId: string) => {
    if (catId === 'all') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: catId });
    }
  };

  return (
    <>
      <SEO
        title="Clinical Diabetes Articles & Guides — Dr. Soumya Sengupta"
        description="Evidence-based patient articles on HbA1c, hypoglycemia recovery, sleep quality, kidney protection, and dietary carbohydrates."
        canonicalPath="/patient-resources/articles"
      />

      <div className="relative overflow-hidden bg-gradient-to-b from-[#EAF7FA]/70 via-[#FCFEFF] to-white border-b border-slate-200/80">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#65D9D0]/10 rounded-full blur-3xl pointer-events-none" />
        <Container size="xl" className="relative z-10">
          <Breadcrumb
            items={[
              { label: t('nav.patientResources'), href: '/patient-resources' },
              { label: 'Clinical Articles' },
            ]}
          />
          <div className="py-6 sm:py-10 max-w-3xl space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#EAF7FA] text-[#103F4A] border border-[#65D9D0]/40 shadow-xs">
              <BookOpen className="w-3.5 h-3.5 text-[#103F4A]" />
              <span>Medical Literacy</span>
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#103F4A] tracking-tight">
              Clinical Articles & Medical Insights
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Scientific explanations written in accessible language to help patients and caregivers understand chronic metabolic health.
            </p>
          </div>
        </Container>
      </div>

      <Container size="xl" className="py-12 space-y-10">
        <MedicalDisclaimerBanner />

        {/* Shareable Category Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-slate-200 overflow-x-auto">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#103F4A] text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-[#EAF7FA]/50 border border-slate-200/90 hover:border-[#65D9D0]/50'
                }`}
              >
                {cat.label[language === 'hi' ? 'hi' : 'en']}
              </button>
            );
          })}
        </div>

        {isLoading ? (
          <div className="py-16 text-center text-sm text-slate-500">
            Loading clinical articles...
          </div>
        ) : filteredArticles.length === 0 ? (
          <EmptyState
            icon={<BookOpen className="w-8 h-8 text-slate-400" />}
            title="No Articles in This Category"
            description="No articles found matching this topic filter. Select 'All Topics' to browse the complete library."
            action={
              <button
                onClick={() => handleCategoryChange('all')}
                className="px-4 py-2 rounded-lg bg-[#103F4A] text-white text-xs font-semibold"
              >
                Show All Topics
              </button>
            }
          />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((art) => (
              <Card
                key={art.id}
                hoverable
                padding="lg"
                className="flex flex-col justify-between border-slate-200/90 shadow-2xs hover:border-[#65D9D0]/60 hover:shadow-lg hover:shadow-[#103F4A]/5 transition-all duration-200 bg-white"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-semibold text-[#103F4A] bg-[#EAF7FA] px-2.5 py-0.5 rounded-full text-[11px] border border-[#65D9D0]/40">
                      {localize(art.category)}
                    </span>
                    <span className="flex items-center gap-1 text-[11px]">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{art.readTimeMinutes} min read</span>
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-[#103F4A] text-base leading-snug line-clamp-2 hover:text-[#0A262D]">
                      {localize(art.title)}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDateInIST(art.publishedAt, language as 'en' | 'hi')}</span>
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal line-clamp-3">
                    {localize(art.excerpt)}
                  </p>
                </div>

                <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full font-medium border border-amber-200/60">
                    Educational Article
                  </span>
                  <Link
                    to={`/patient-resources/articles/${art.slug}`}
                    className="text-xs font-bold text-[#103F4A] hover:text-[#0A262D] flex items-center gap-1 group"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 text-[#103F4A]" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Container>
    </>
  );
};
