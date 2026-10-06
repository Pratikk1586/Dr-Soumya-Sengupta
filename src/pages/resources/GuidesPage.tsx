import React from 'react';
import { BookOpen, CheckCircle, AlertTriangle } from 'lucide-react';
import { SEO } from '../../components/common/SEO';
import { Container } from '../../components/common/Container';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { MedicalDisclaimerBanner } from '../../components/common/MedicalDisclaimerBanner';
import { useLanguage } from '../../context/useLanguage';
import { useService } from '../../hooks/useService';
import { guideService } from '../../services';

export const GuidesPage: React.FC = () => {
  const { localize, t } = useLanguage();
  const { data: guides } = useService(() => guideService.getGuides(), []);

  return (
    <>
      <SEO
        title="Patient Self-Care Guides — Dr. Soumya Sengupta"
        description="Step-by-step patient self-care instructions for fasting lab preparations and daily diabetic foot inspections."
        canonicalPath="/patient-resources/guides"
      />

      <div className="bg-[#faf9f6] border-b border-slate-200">
        <Container size="xl">
          <Breadcrumb
            items={[
              { label: t('nav.patientResources'), href: '/patient-resources' },
              { label: 'Patient Guides' },
            ]}
          />
          <div className="py-6 sm:py-10 max-w-3xl space-y-3">
            <Badge variant="primary">Self-Care Protocols</Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#06181f] tracking-tight">
              Actionable Patient Self-Care Guides
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Structured protocols for daily routines, pre-test preparation, and preventive self-checks.
            </p>
          </div>
        </Container>
      </div>

      <Container size="xl" className="py-12 space-y-12">
        <MedicalDisclaimerBanner />

        <div className="space-y-8 max-w-4xl">
          {guides?.map((guide) => (
            <Card key={guide.id} padding="lg" className="space-y-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#dff0f4] text-[#0a252f] flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-[#0f3d4a]" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">{localize(guide.title)}</h2>
                    <p className="text-xs text-slate-500 mt-0.5">{localize(guide.summary)}</p>
                  </div>
                </div>
                <Badge variant="neutral" size="sm">
                  {guide.reviewStatus}
                </Badge>
              </div>

              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Step-by-Step Instructions:
                </h4>
                <div className="space-y-2">
                  {guide.steps.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80 flex items-start gap-3 text-xs sm:text-sm text-slate-700"
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{localize(step)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {guide.emergencyWarning && (
                <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 text-xs text-amber-950 flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <p>
                    <strong>Safety Notice:</strong> {localize(guide.emergencyWarning)}
                  </p>
                </div>
              )}
            </Card>
          ))}
        </div>
      </Container>
    </>
  );
};
