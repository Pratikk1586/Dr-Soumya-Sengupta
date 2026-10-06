import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { SEO } from '../../components/common/SEO';
import { Container } from '../../components/common/Container';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { EmptyState } from '../../components/common/EmptyState';
import { MedicalDisclaimerBanner } from '../../components/common/MedicalDisclaimerBanner';
import { Clock, CheckCircle2, ArrowLeft, Calendar } from 'lucide-react';
import { useLanguage } from '../../context/useLanguage';
import { useService } from '../../hooks/useService';
import { articleService } from '../../services';

export const ArticleDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { localize, t } = useLanguage();
  const { data: article, isLoading } = useService(
    () => articleService.getArticleBySlug(slug || ''),
    [slug]
  );

  if (isLoading) {
    return (
      <Container size="xl" className="py-20 text-center">
        <div className="w-6 h-6 border-2 border-[#0f3d4a] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
        <p className="text-xs text-slate-500">Loading medical article...</p>
      </Container>
    );
  }

  if (!article) {
    return (
      <Container size="xl" className="py-20">
        <EmptyState
          title="Article Not Found"
          description="The requested medical article could not be located."
          action={
            <Link to="/patient-resources/articles">
              <Button variant="outline" size="sm">
                View All Articles
              </Button>
            </Link>
          }
        />
      </Container>
    );
  }

  return (
    <>
      <SEO
        title={`${localize(article.title)} — Dr. Soumya Sengupta`}
        description={localize(article.excerpt)}
        canonicalPath={`/patient-resources/articles/${article.slug}`}
        ogType="article"
      />

      <div className="bg-[#faf9f6] border-b border-slate-200">
        <Container size="xl">
          <Breadcrumb
            items={[
              { label: t('nav.patientResources'), href: '/patient-resources' },
              { label: 'Articles', href: '/patient-resources/articles' },
              { label: localize(article.title) },
            ]}
          />
          <div className="py-6 sm:py-10 max-w-3xl space-y-3">
            <div className="flex items-center gap-3">
              <Badge variant="primary">{localize(article.category)}</Badge>
              <span className="flex items-center gap-1 text-xs text-slate-500 font-mono">
                <Clock className="w-3.5 h-3.5" />
                <span>{article.readTimeMinutes} min read</span>
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#06181f] tracking-tight leading-tight">
              {localize(article.title)}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              {localize(article.excerpt)}
            </p>
          </div>
        </Container>
      </div>

      <Container size="xl" className="py-12 space-y-12">
        <MedicalDisclaimerBanner />

        <div className="grid lg:grid-cols-3 gap-10">
          <article className="lg:col-span-2 space-y-8">
            <div className="space-y-6 text-sm sm:text-base text-slate-800 leading-relaxed">
              {article.contentParagraphs.map((p, idx) => (
                <p key={idx}>{localize(p)}</p>
              ))}
            </div>

            {/* Key Takeaways */}
            <div className="p-6 rounded-2xl bg-[#faf9f6] border border-slate-200 space-y-3">
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                Key Clinical Takeaways
              </h3>
              <ul className="space-y-2">
                {article.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{localize(takeaway)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card padding="lg" className="space-y-4 bg-slate-50 border-slate-200">
              <h3 className="font-bold text-slate-900 text-sm">Need Personalized Review?</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Consult with Dr. Sengupta to interpret your individual blood tests, HbA1c, and continuous glucose data.
              </p>
              <Link to="/book-appointment" className="block w-full">
                <Button variant="primary" size="sm" className="w-full gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Book Consultation</span>
                </Button>
              </Link>
            </Card>

            <Link
              to="/patient-resources/articles"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0f3d4a] hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to all clinical articles</span>
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
};
