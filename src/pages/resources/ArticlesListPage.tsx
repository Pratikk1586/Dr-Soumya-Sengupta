import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, BookOpen } from 'lucide-react';
import { SEO } from '../../components/common/SEO';
import { Container } from '../../components/common/Container';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { MedicalDisclaimerBanner } from '../../components/common/MedicalDisclaimerBanner';
import { useLanguage } from '../../context/useLanguage';
import { useService } from '../../hooks/useService';
import { articleService } from '../../services';

export const ArticlesListPage: React.FC = () => {
  const { localize, t } = useLanguage();
  const { data: articles } = useService(() => articleService.getArticles(), []);

  return (
    <>
      <SEO
        title="Clinical Diabetes Articles — Dr. Soumya Sengupta"
        description="Physician-reviewed articles on HbA1c, hypoglycemia first aid, CGM analytics, and metabolic risk reduction."
        canonicalPath="/patient-resources/articles"
      />

      <div className="bg-[#faf9f6] border-b border-slate-200">
        <Container size="xl">
          <Breadcrumb
            items={[
              { label: t('nav.patientResources'), href: '/patient-resources' },
              { label: 'Clinical Articles' },
            ]}
          />
          <div className="py-6 sm:py-10 max-w-3xl space-y-3">
            <Badge variant="primary">Medical Literacy</Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#06181f] tracking-tight">
              Clinical Articles & Medical Insights
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Scientific explanations written in accessible language to help patients understand metabolic physiology.
            </p>
          </div>
        </Container>
      </div>

      <Container size="xl" className="py-12 space-y-12">
        <MedicalDisclaimerBanner />

        <div className="grid md:grid-cols-2 gap-6">
          {articles?.map((art) => (
            <Card key={art.id} hoverable padding="lg" className="flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <Badge variant="neutral" size="sm">
                    {localize(art.category)}
                  </Badge>
                  <span className="flex items-center gap-1 text-[11px]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{art.readTimeMinutes} min read</span>
                  </span>
                </div>

                <h2 className="text-lg font-bold text-slate-900 leading-snug">
                  {localize(art.title)}
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {localize(art.excerpt)}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                <Link
                  to={`/patient-resources/articles/${art.slug}`}
                  className="text-xs font-semibold text-[#0f3d4a] hover:underline flex items-center gap-1"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Read Full Article</span>
                </Link>
                <span className="text-[11px] text-slate-400">Status: {art.reviewStatus}</span>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </>
  );
};
