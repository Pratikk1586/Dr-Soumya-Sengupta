import React from 'react';
import { Link } from 'react-router-dom';
import {
  FileCheck2,
  Info,
  CheckCircle2,
  HelpCircle,
  ShieldAlert,
  Calendar,
} from 'lucide-react';
import { SEO } from '../../components/common/SEO';
import { Container } from '../../components/common/Container';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { VerificationBadge } from '../../components/common/VerificationBadge';
import { MedicalDisclaimerBanner } from '../../components/common/MedicalDisclaimerBanner';
import { useLanguage } from '../../context/useLanguage';
import { useService } from '../../hooks/useService';
import { reportService } from '../../services';

export const ReportsPage: React.FC = () => {
  const { localize, t } = useLanguage();
  const { data: reports, isLoading } = useService(() => reportService.getReportTopics(), []);

  return (
    <>
      <SEO
        title="Understand Your Lab Reports — Dr. Soumya Sengupta"
        description="Educational guide to reading your HbA1c, fasting/PP blood glucose, spot urine albumin-to-creatinine ratio (uACR), and lipid panels."
        canonicalPath="/patient-resources/reports"
      />

      <div className="bg-[#faf9f6] border-b border-slate-200">
        <Container size="xl">
          <Breadcrumb
            items={[
              { label: t('nav.patientResources'), href: '/patient-resources' },
              { label: 'Understand Your Reports' },
            ]}
          />
          <div className="py-6 sm:py-10 max-w-3xl space-y-3">
            <Badge variant="primary">Biomarker Health Literacy</Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#06181f] tracking-tight">
              Understand Your Clinical Lab Reports
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Scientific, educational explanations of key blood, urine, and metabolic biomarkers to help you understand your laboratory results.
            </p>
          </div>
        </Container>
      </div>

      <Container size="xl" className="py-12 space-y-12">
        <MedicalDisclaimerBanner />

        {/* Standing Laboratory & Clinical Notice */}
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200/90 text-amber-950 text-xs sm:text-sm flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-amber-950">
              Laboratory Variance & Individual Target Notice
            </p>
            <p className="text-amber-800 leading-relaxed font-normal">
              Normal reference ranges vary by testing laboratory, analyzer instrument, and regional standards.
              Furthermore, personalized glycemic and blood pressure targets differ significantly across age groups and clinical histories.
              Never alter prescription medication without in-person clinical consultation.
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="py-12 text-center text-sm text-slate-500">Loading lab report guides...</div>
        ) : (
          <div className="space-y-8 max-w-4xl">
            {reports?.map((rep) => (
              <Card key={rep.id} padding="lg" className="space-y-6 border-slate-200/90 shadow-sm bg-white">
                {/* Header */}
                <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-[#dff0f4] text-[#0a252f] flex items-center justify-center">
                      <FileCheck2 className="w-5 h-5 text-[#0f3d4a]" />
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                        {localize(rep.title)}
                      </h2>
                      <span className="text-xs font-semibold text-[#0f3d4a] block mt-0.5">
                        Clinical Test: {localize(rep.testName)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant="neutral" size="sm">
                      Educational Guide
                    </Badge>
                    {rep.referenceRangeGuideline?.standardRange.includes('VERIFIED') && (
                      <VerificationBadge note="Range awaiting doctor confirmation" />
                    )}
                  </div>
                </div>

                {/* 3 Core Educational Panels */}
                <div className="grid md:grid-cols-3 gap-4 text-xs sm:text-sm">
                  {/* Panel 1: What It Is */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <div className="flex items-center gap-1.5 font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                      <Info className="w-3.5 h-3.5 text-teal-600" />
                      <span>1. What It Is</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed font-normal">
                      {localize(rep.whatItIs)}
                    </p>
                  </div>

                  {/* Panel 2: Why It Is Measured */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <div className="flex items-center gap-1.5 font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                      <span>2. Why It Is Measured</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed font-normal">
                      {localize(rep.whyItIsMeasured)}
                    </p>
                  </div>

                  {/* Panel 3: General Educational Meaning */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <div className="flex items-center gap-1.5 font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                      <HelpCircle className="w-3.5 h-3.5 text-teal-600" />
                      <span>3. Educational Meaning</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed font-normal">
                      {localize(rep.generalEducationalMeaning)}
                    </p>
                  </div>
                </div>

                {/* Sourced Reference Guideline Box */}
                {rep.referenceRangeGuideline && (
                  <div className="p-4 rounded-xl bg-teal-50/50 border border-teal-200/70 space-y-2 text-xs">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="font-bold text-[#0f3d4a] uppercase tracking-wider text-[11px]">
                        Guideline Reference Range:
                      </span>
                      <span className="text-slate-500 font-medium">
                        Source: {rep.referenceRangeGuideline.source}
                      </span>
                    </div>
                    <div className="font-mono text-sm font-semibold text-slate-800">
                      {rep.referenceRangeGuideline.standardRange}
                    </div>
                    <p className="text-slate-600">
                      {localize(rep.referenceRangeGuideline.guidelineNote)}
                    </p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}

        {/* Clinical Appointment CTA */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-[#0f3d4a] to-[#08222a] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Have Recent Lab Reports to Review?
            </h3>
            <p className="text-xs sm:text-sm text-teal-100 max-w-xl leading-relaxed">
              Bring your previous 6 months of blood and urine test reports to your consultation with Dr. Sengupta for a comprehensive clinical review and personalized plan.
            </p>
          </div>
          <Link to="/book-appointment" className="shrink-0">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto shadow-md">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{t('cta.bookAppointment')}</span>
            </Button>
          </Link>
        </div>
      </Container>
    </>
  );
};
