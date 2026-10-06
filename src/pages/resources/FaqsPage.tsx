import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { SEO } from '../../components/common/SEO';
import { Container } from '../../components/common/Container';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { Badge } from '../../components/common/Badge';
import { MedicalDisclaimerBanner } from '../../components/common/MedicalDisclaimerBanner';
import { useLanguage } from '../../context/useLanguage';
import { useService } from '../../hooks/useService';
import { faqService } from '../../services';

export const FaqsPage: React.FC = () => {
  const { localize, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);
  const { data: faqs } = useService(() => faqService.getFaqs(selectedCategory), [selectedCategory]);

  const categories = [
    { id: 'all', label: 'All Topics' },
    { id: 'treatment', label: 'Treatment & Remission' },
    { id: 'general', label: 'First Visit & Tests' },
    { id: 'diet_lifestyle', label: 'Diet & Fruit Guidelines' },
    { id: 'emergency', label: 'Emergency First Aid' },
  ];

  return (
    <>
      <SEO
        title="Frequently Asked Questions (FAQs) — Dr. Soumya Sengupta"
        description="Common patient questions regarding diabetes remission, starting insulin, fasting blood tests, diet, and hypoglycemia safety."
        canonicalPath="/patient-resources/faqs"
      />

      <div className="bg-[#faf9f6] border-b border-slate-200">
        <Container size="xl">
          <Breadcrumb
            items={[
              { label: t('nav.patientResources'), href: '/patient-resources' },
              { label: 'FAQs' },
            ]}
          />
          <div className="py-6 sm:py-10 max-w-3xl space-y-3">
            <Badge variant="primary">Patient Clarity</Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#06181f] tracking-tight">
              Frequently Asked Clinical Questions
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Direct, evidence-based answers to common questions about diabetes management, nutrition, and diagnostics.
            </p>
          </div>
        </Container>
      </div>

      <Container size="xl" className="py-12 space-y-8">
        <MedicalDisclaimerBanner />

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 pb-4 border-b border-slate-200">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#0f3d4a] text-white shadow-2xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordion FAQ Items */}
        <div className="space-y-3 max-w-4xl">
          {faqs?.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-xl border border-slate-200/90 overflow-hidden shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-4 hover:bg-slate-50/70 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-[#0f3d4a] shrink-0" />
                    <span>{localize(faq.question)}</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-[#0f3d4a]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 border-t border-slate-100 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2 bg-slate-50/30">
                    <p>{localize(faq.answer)}</p>
                    <div className="pt-2 text-[11px] text-slate-400">
                      Category: {faq.category} • Review Status: {faq.reviewStatus}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </>
  );
};
