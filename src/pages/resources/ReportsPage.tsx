import React from 'react';
import { FileCheck2, Info, CheckCircle2 } from 'lucide-react';
import { SEO } from '../../components/common/SEO';
import { Container } from '../../components/common/Container';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { MedicalDisclaimerBanner } from '../../components/common/MedicalDisclaimerBanner';
import { useLanguage } from '../../context/useLanguage';
import { useService } from '../../hooks/useService';
import { reportService } from '../../services';

export const ReportsPage: React.FC = () => {
  const { localize, t } = useLanguage();
  const { data: reports } = useService(() => reportService.getReportTopics(), []);

  return (
    <>
      <SEO
        title="Understanding Diabetes Lab Reports — Dr. Soumya Sengupta"
        description="Comprehensive guide to reading your HbA1c, spot urine albumin-to-creatinine ratio (uACR), and lipid panels."
        canonicalPath="/patient-resources/reports"
      />

      <div className="bg-[#faf9f6] border-b border-slate-200">
        <Container size="xl">
          <Breadcrumb
            items={[
              { label: t('nav.patientResources'), href: '/patient-resources' },
              { label: 'Lab Reports' },
            ]}
          />
          <div className="py-6 sm:py-10 max-w-3xl space-y-3">
            <Badge variant="primary">Biomarker Literacy</Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#06181f] tracking-tight">
              Demystifying Your Clinical Lab Reports
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Clear scientific explanations of essential blood and urine tests to help you track your long-term metabolic health.
            </p>
          </div>
        </Container>
      </div>

      <Container size="xl" className="py-12 space-y-12">
        <MedicalDisclaimerBanner />

        <div className="space-y-6 max-w-4xl">
          {reports?.map((rep) => (
            <Card key={rep.id} padding="lg" className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#dff0f4] text-[#0a252f] flex items-center justify-center">
                    <FileCheck2 className="w-5 h-5 text-[#0f3d4a]" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">{localize(rep.title)}</h2>
                    <span className="text-xs font-semibold text-[#0f3d4a]">{localize(rep.testName)}</span>
                  </div>
                </div>
                <Badge variant="neutral" size="sm">
                  Biomarker Guide
                </Badge>
              </div>

              <div className="grid md:grid-cols-2 gap-4 pt-2 text-xs sm:text-sm">
                <div className="p-4 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-slate-800">
                    <Info className="w-4 h-4 text-slate-500" />
                    <span>What It Measures:</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">{localize(rep.whatItMeasures)}</p>
                </div>

                <div className="p-4 rounded-lg bg-emerald-50/50 border border-emerald-200/80 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-950">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>Clinical Significance:</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">{localize(rep.clinicalSignificance)}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </>
  );
};
