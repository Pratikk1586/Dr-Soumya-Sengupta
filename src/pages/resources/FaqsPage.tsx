import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import {
  HelpCircle,
  Search,
  ChevronDown,
  Calendar,
  Link as LinkIcon,
  Check,
} from 'lucide-react';
import { SEO } from '../../components/common/SEO';
import { Container } from '../../components/common/Container';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { EmptyState } from '../../components/common/EmptyState';
import { VerificationBadge } from '../../components/common/VerificationBadge';
import { MedicalDisclaimerBanner } from '../../components/common/MedicalDisclaimerBanner';
import { useLanguage } from '../../context/useLanguage';
import { useService } from '../../hooks/useService';
import { faqService } from '../../services';
import type { FAQCategory } from '../../types';

const CATEGORIES: { id: 'all' | FAQCategory; label: { en: string; hi: string } }[] = [
  { id: 'all', label: { en: 'All Categories', hi: 'सभी विषय' } },
  { id: 'diabetes', label: { en: 'Diabetes Care', hi: 'डायबिटीज' } },
  { id: 'thyroid', label: { en: 'Thyroid', hi: 'थायरॉयड' } },
  { id: 'weight_management', label: { en: 'Weight Management', hi: 'वजन प्रबंधन' } },
  { id: 'clinic', label: { en: 'Chamber Logistics', hi: 'क्लिनिक' } },
  { id: 'appointments', label: { en: 'Appointments', hi: 'अपॉइंटमेंट' } },
  { id: 'reports', label: { en: 'Lab Reports', hi: 'रिपोर्ट्स' } },
];

export const FaqsPage: React.FC = () => {
  const { localize, language, t } = useLanguage();
  const location = useLocation();
  const { data: allFaqs, isLoading } = useService(() => faqService.getFaqs(), []);

  const [selectedCategory, setSelectedCategory] = useState<'all' | FAQCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  // Deep linking support via URL hash (e.g., #faq-type2-remission)
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash && allFaqs) {
      const match = allFaqs.find((f) => f.slug === hash || f.id === hash);
      if (match) {
        const timer = setTimeout(() => {
          setExpandedIds((prev) => ({ ...prev, [match.id]: true }));
          const el = document.getElementById(match.slug || match.id);
          el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
        return () => clearTimeout(timer);
      }
    }
  }, [location.hash, allFaqs]);

  const toggleAccordion = (id: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const copyDeepLink = (slugOrId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}${window.location.pathname}#${slugOrId}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedSlug(slugOrId);
      setTimeout(() => setCopiedSlug(null), 2000);
    }
  };

  const filteredFaqs = useMemo(() => {
    if (!allFaqs) return [];
    return allFaqs.filter((faq) => {
      const matchesCategory =
        selectedCategory === 'all' || faq.category === selectedCategory;

      const qText = (faq.question.en + ' ' + (faq.question.hi || '')).toLowerCase();
      const aText = (faq.answer.en + ' ' + (faq.answer.hi || '')).toLowerCase();
      const qMatches = searchQuery.trim() === '' || qText.includes(searchQuery.toLowerCase()) || aText.includes(searchQuery.toLowerCase());

      return matchesCategory && qMatches;
    });
  }, [allFaqs, selectedCategory, searchQuery]);

  // Construct FAQPage JSON-LD Schema (only doctor-reviewed or verified items)
  const faqJsonLd = useMemo(() => {
    if (!allFaqs) return null;
    const reviewed = allFaqs.filter((f) => f.status === 'verified');
    if (reviewed.length === 0) return null;

    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: reviewed.map((f) => ({
        '@type': 'Question',
        name: localize(f.question),
        acceptedAnswer: {
          '@type': 'Answer',
          text: localize(f.answer),
        },
      })),
    };
  }, [allFaqs, localize]);

  return (
    <>
      <SEO
        title="Frequently Asked Questions — Dr. Soumya Sengupta"
        description="Patient questions answered: Type 2 diabetes remission, insulin safety, thyroid medication timing, lab report interpretations, and clinic timings."
        canonicalPath="/patient-resources/faqs"
      />

      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <div className="bg-[#faf9f6] border-b border-slate-200">
        <Container size="xl">
          <Breadcrumb
            items={[
              { label: t('nav.patientResources'), href: '/patient-resources' },
              { label: 'Frequently Asked Questions' },
            ]}
          />
          <div className="py-6 sm:py-10 max-w-3xl space-y-3">
            <Badge variant="primary">Patient Clarifications</Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#06181f] tracking-tight">
              Frequently Asked Questions
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Clear, transparent answers regarding diabetes therapy, thyroid balance, lab biomarkers, and clinic appointments.
            </p>
          </div>
        </Container>
      </div>

      <Container size="xl" className="py-12 space-y-10">
        <MedicalDisclaimerBanner />

        {/* Search & Category Filter Controls */}
        <div className="space-y-4 max-w-4xl">
          {/* Live Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g. insulin, thyroid, fasting, appointment)..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200/90 bg-white text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0f3d4a]/20 focus:border-[#0f3d4a] shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-700"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#0f3d4a] text-white shadow-xs'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/90'
                  }`}
                >
                  {cat.label[language === 'hi' ? 'hi' : 'en']}
                </button>
              );
            })}
          </div>
        </div>

        {/* Accordion Questions List */}
        {isLoading ? (
          <div className="py-16 text-center text-sm text-slate-500">
            Loading questions and answers...
          </div>
        ) : filteredFaqs.length === 0 ? (
          <EmptyState
            icon={<HelpCircle className="w-8 h-8 text-slate-400" />}
            title="No Matching Questions Found"
            description="Try modifying your search term or select 'All Categories'."
            action={
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="px-4 py-2 rounded-lg bg-[#0f3d4a] text-white text-xs font-semibold"
              >
                Reset Filters
              </button>
            }
          />
        ) : (
          <div className="space-y-4 max-w-4xl" role="region" aria-label="FAQ Accordion">
            {filteredFaqs.map((faq) => {
              const isExpanded = Boolean(expandedIds[faq.id]);
              const anchorSlug = faq.slug || faq.id;
              const buttonId = `faq-btn-${faq.id}`;
              const panelId = `faq-panel-${faq.id}`;

              return (
                <Card
                  key={faq.id}
                  id={anchorSlug}
                  padding="none"
                  className={`border transition-all duration-200 scroll-mt-28 ${
                    isExpanded
                      ? 'border-[#0f3d4a]/40 shadow-sm bg-white'
                      : 'border-slate-200/90 hover:border-slate-300 bg-white'
                  }`}
                >
                  {/* Accessible Accordion Header */}
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isExpanded}
                    aria-controls={panelId}
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0f3d4a]"
                  >
                    <div className="space-y-1 pr-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-teal-800 uppercase bg-teal-50 px-2 py-0.5 rounded">
                          {faq.category.replace('_', ' ')}
                        </span>
                        {faq.status === 'placeholder' && (
                          <VerificationBadge note="Unverified logistics FAQ" />
                        )}
                      </div>
                      <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                        {localize(faq.question)}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 pt-1">
                      <button
                        title="Copy direct link to this question"
                        aria-label="Copy direct link to this question"
                        onClick={(e) => copyDeepLink(anchorSlug, e)}
                        className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                      >
                        {copiedSlug === anchorSlug ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <LinkIcon className="w-3.5 h-3.5" />
                        )}
                      </button>

                      <ChevronDown
                        className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
                          isExpanded ? 'rotate-180 text-[#0f3d4a]' : ''
                        }`}
                      />
                    </div>
                  </button>

                  {/* Accordion Content Panel */}
                  {isExpanded && (
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      className="p-4 sm:p-5 pt-0 border-t border-slate-100 text-xs sm:text-sm text-slate-700 leading-relaxed"
                    >
                      <p>{localize(faq.answer)}</p>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        )}

        {/* Appointment CTA */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-[#0f3d4a] to-[#08222a] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl max-w-4xl">
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Have a Specific Medical Question?
            </h3>
            <p className="text-xs sm:text-sm text-teal-100 max-w-xl leading-relaxed">
              Every patient's physiology is unique. For personalized treatment recommendations and report reviews, schedule an appointment with Dr. Sengupta.
            </p>
          </div>
          <Button variant="secondary" size="lg" className="shrink-0">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{t('cta.bookAppointment')}</span>
          </Button>
        </div>
      </Container>
    </>
  );
};
