import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Clock,
  CheckCircle2,
  ArrowLeft,
  Calendar,
  Share2,
  Check,
  BookOpen,
} from 'lucide-react';
import { SEO } from '../../components/common/SEO';
import { Container } from '../../components/common/Container';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { EmptyState } from '../../components/common/EmptyState';
import { MedicalDisclaimerBanner } from '../../components/common/MedicalDisclaimerBanner';
import { useLanguage } from '../../context/useLanguage';
import { useService } from '../../hooks/useService';
import { articleService } from '../../services';
import { formatDateInIST } from '../../utils/date';

export const ArticleDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { localize, language, t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const { data: article, isLoading } = useService(
    () => articleService.getArticleBySlug(slug || ''),
    [slug]
  );

  const { data: allArticles } = useService(() => articleService.getArticles(), []);

  const handleShare = async () => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

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
          icon={<BookOpen className="w-8 h-8 text-slate-400" />}
          title="Article Not Found"
          description="The requested medical article could not be located in our educational library."
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

  // Related articles (same category or recent other articles)
  const relatedArticles = allArticles
    ?.filter((a) => a.id !== article.id)
    .slice(0, 3) || [];

  // Compute Article JSON-LD Schema
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: localize(article.title),
    description: localize(article.excerpt),
    datePublished: article.publishedAt,
    author: {
      '@type': 'Person',
      name: 'Dr. Soumya Sengupta',
      jobTitle: 'Consultant Diabetologist',
    },
    publisher: {
      '@type': 'MedicalOrganization',
      name: 'Dr. Soumya Sengupta Diabetology Practice',
    },
    educationalLevel: 'Patient Education / General Public',
  };

  return (
    <>
      <SEO
        title={`${localize(article.title)} — Dr. Soumya Sengupta`}
        description={localize(article.excerpt)}
        canonicalPath={`/patient-resources/articles/${article.slug}`}
        ogType="article"
      />

      {/* Structured Medical Data Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
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
          <div className="py-6 sm:py-10 max-w-3xl space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="primary" size="sm">
                {localize(article.category)}
              </Badge>
              <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200/60">
                Educational Draft
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#06181f] tracking-tight leading-tight">
              {localize(article.title)}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>{formatDateInIST(article.publishedAt, language as 'en' | 'hi')}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{article.readTimeMinutes} min read</span>
              </span>
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1 text-[#0f3d4a] hover:underline font-semibold cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? 'Link Copied!' : 'Share Article'}</span>
              </button>
            </div>
          </div>
        </Container>
      </div>

      <Container size="xl" className="py-12 space-y-12">
        <MedicalDisclaimerBanner />

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Main Article Content */}
          <div className="lg:col-span-8 space-y-8">
            <div className="prose max-w-none text-slate-700 space-y-5 leading-relaxed text-sm sm:text-base">
              <p className="text-base sm:text-lg font-medium text-slate-900 leading-snug border-l-4 border-teal-600 pl-4 py-1 italic">
                {localize(article.excerpt)}
              </p>

              {article.contentParagraphs.map((para, idx) => (
                <p key={idx} className="leading-relaxed">
                  {localize(para)}
                </p>
              ))}
            </div>

            {/* Key Clinical Takeaways Box */}
            <Card padding="lg" className="bg-teal-50/50 border-teal-200/80 space-y-3">
              <h3 className="font-bold text-[#0f3d4a] text-sm uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                <span>Key Clinical Takeaways:</span>
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                {article.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-teal-600 font-bold shrink-0">•</span>
                    <span>{localize(takeaway)}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* In-Article Navigation */}
            <div className="pt-4 flex items-center justify-between border-t border-slate-200">
              <Link
                to="/patient-resources/articles"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0f3d4a] hover:underline"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to all clinical articles</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Related Articles & CTA */}
          <div className="lg:col-span-4 space-y-6">
            <Card padding="lg" className="space-y-4 bg-white border-slate-200/90 shadow-2xs">
              <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
                Related Articles
              </h4>
              <div className="space-y-3">
                {relatedArticles.map((rel) => (
                  <Link
                    key={rel.id}
                    to={`/patient-resources/articles/${rel.slug}`}
                    className="block group p-2.5 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <span className="text-[10px] font-bold text-teal-800 uppercase block mb-0.5">
                      {localize(rel.category)}
                    </span>
                    <h5 className="font-semibold text-xs text-slate-900 group-hover:text-[#0f3d4a] line-clamp-2">
                      {localize(rel.title)}
                    </h5>
                  </Link>
                ))}
              </div>
            </Card>

            {/* Clinical Consultation Card */}
            <Card padding="lg" className="bg-[#0f3d4a] text-white space-y-4">
              <h4 className="font-bold text-white text-base">Personalized Evaluation</h4>
              <p className="text-xs text-teal-100 leading-relaxed">
                Educational reading provides general background. For your unique glycemic and lab report targets, schedule an appointment.
              </p>
              <Link to="/book-appointment" className="block w-full">
                <Button variant="secondary" size="sm" className="w-full text-xs font-semibold">
                  <span>{t('cta.bookAppointment')}</span>
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </Container>
    </>
  );
};
