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

      <div className="relative overflow-hidden bg-gradient-to-b from-[#EAF7FA]/70 via-[#FCFEFF] to-white border-b border-slate-200/80">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#65D9D0]/10 rounded-full blur-3xl pointer-events-none" />
        <Container size="xl" className="relative z-10">
          <Breadcrumb
            items={[
              { label: t('nav.patientResources'), href: '/patient-resources' },
              { label: 'Frequently Asked Questions' },
            ]}
          />
          <div className="py-6 sm:py-10 max-w-3xl space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#EAF7FA] text-[#103F4A] border border-[#65D9D0]/40 shadow-xs">
              <HelpCircle className="w-3.5 h-3.5 text-[#103F4A]" />
              <span>Patient Clarifications</span>
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#103F4A] tracking-tight">
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
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200/90 bg-white text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#65D9D0]/40 focus:border-[#103F4A] shadow-xs transition-all"
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
                      ? 'bg-[#103F4A] text-white shadow-xs'
                      : 'bg-white text-slate-600 hover:bg-[#EAF7FA]/50 border border-slate-200/90 hover:border-[#65D9D0]/50'
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
                className="px-4 py-2 rounded-lg bg-[#103F4A] text-white text-xs font-semibold"
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
                      ? 'border-[#103F4A] shadow-md bg-white'
                      : 'border-slate-200/90 hover:border-[#65D9D0]/50 bg-white'
                  }`}
                >
                  {/* Accessible Accordion Header */}
                  <div className="flex items-stretch justify-between">
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isExpanded}
                      aria-controls={panelId}
                      onClick={() => toggleAccordion(faq.id)}
                      className="flex-1 text-left p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#103F4A]"
                    >
                      <div className="space-y-1 pr-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-[#103F4A] uppercase bg-[#EAF7FA] border border-[#65D9D0]/30 px-2 py-0.5 rounded">
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

                      <ChevronDown
                        className={`w-5 h-5 text-slate-400 shrink-0 mt-1 transition-transform duration-200 ${
                          isExpanded ? 'rotate-180 text-[#103F4A]' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>

                    <div className="p-4 sm:p-5 pl-0 flex items-center">
                      <button
                        type="button"
                        title="Copy direct link to this question"
                        aria-label="Copy direct link to this question"
                        onClick={(e) => copyDeepLink(anchorSlug, e)}
                        className="p-1.5 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                      >
                        {copiedSlug === anchorSlug ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <LinkIcon className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

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
        <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-[#103F4A] via-[#0A262D] to-[#103F4A] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-md border border-[#103F4A] max-w-4xl">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#65D9D0]">
              Personalized Consultation
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Have a Specific Medical Question?
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 max-w-xl leading-relaxed">
              Every patient's physiology is unique. For personalized treatment recommendations and report reviews, schedule an appointment with Dr. Sengupta.
            </p>
          </div>
          <Button variant="primary" size="lg" className="shrink-0 bg-[#65D9D0] text-[#103F4A] hover:bg-white font-semibold">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{t('cta.bookAppointment')}</span>
          </Button>
        </div>
      </Container>
    </>
  );
};
