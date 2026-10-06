import React from 'react';
import { Link } from 'react-router-dom';
import {
  LineChart,
  Activity,
  Heart,
  Droplet,
  Scale,
  ArrowRight,
  ShieldAlert,
  Info,
} from 'lucide-react';
import { Section } from '../common/Section';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { VerificationBadge } from '../common/VerificationBadge';
import { useLanguage } from '../../context/useLanguage';
import { useService } from '../../hooks/useService';
import { reportService } from '../../services';

const ICONS_BY_KEY: Record<string, React.FC<{ className?: string }>> = {
  glucose: Droplet,
  hba1c: LineChart,
  blood_pressure: Heart,
  cholesterol: Activity,
  bmi: Scale,
};

export const KnowYourNumbersSection: React.FC = () => {
  const { localize } = useLanguage();
  const { data: allReports, isLoading } = useService(() => reportService.getReports(), []);

  // Filter to the 5 core homepage cards
  const coreKeys = ['glucose', 'hba1c', 'blood_pressure', 'cholesterol', 'bmi'];
  const coreReports = allReports?.filter((r) => coreKeys.includes(r.key)) || [];

  return (
    <Section
      eyebrow="Diagnostic Literacy"
      heading="Know Your Numbers"
      lede="Understanding key metabolic biomarkers empowers you to recognize glycemic trends, communicate effectively with your physician, and protect your vital organs."
      containerSize="xl"
      className="bg-[#faf9f6] border-b border-slate-200/80"
    >
      {/* Standing Medical Literacy Notice */}
      <div className="mb-8 p-4 rounded-xl bg-teal-50/70 border border-teal-200/80 text-[#0f3d4a] text-xs sm:text-sm flex items-start gap-3">
        <Info className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <p className="font-semibold text-teal-950">
            Laboratory Baseline Notice:
          </p>
          <p className="text-teal-800 leading-relaxed font-normal">
            Normal reference ranges vary by testing laboratory, assay methodology, and personal clinical history.
            Target numbers must always be individualized by Dr. Sengupta according to your cardiovascular and endocrine health.
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="py-12 text-center text-sm text-slate-500">Loading biomarker guides...</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreReports.map((report) => {
            const IconComp = ICONS_BY_KEY[report.key] || LineChart;
            return (
              <Card
                key={report.id}
                hoverable
                padding="lg"
                className="flex flex-col justify-between border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-200 bg-white"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0f3d4a] flex items-center justify-center">
                      <IconComp className="w-5 h-5 text-[#0f3d4a]" aria-hidden="true" />
                    </div>
                    {report.referenceRangeGuideline?.standardRange.includes('VERIFIED') && (
                      <VerificationBadge note="Reference range awaiting clinic confirmation" />
                    )}
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 text-base leading-snug">
                      {localize(report.title)}
                    </h3>
                    <span className="text-xs font-semibold text-[#0f3d4a] block mt-0.5">
                      {localize(report.testName)}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {localize(report.whatItIs)}
                  </p>

                  {/* Sourced Guideline Info */}
                  <div className="pt-3 border-t border-slate-100 text-xs text-slate-600 space-y-1">
                    <span className="font-semibold text-slate-800 block">
                      Why It Matters:
                    </span>
                    <p className="line-clamp-2">
                      {localize(report.whyItIsMeasured)}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100">
                  <Link
                    to="/patient-resources/reports"
                    className="text-xs font-semibold text-[#0f3d4a] hover:underline flex items-center justify-between group"
                  >
                    <span>Understand This Report</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </Card>
            );
          })}

          {/* Bonus card linking to complete reports hub */}
          <Card
            padding="lg"
            className="flex flex-col justify-between bg-gradient-to-br from-[#0f3d4a] to-[#071f26] text-white border-0 shadow-md"
          >
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 text-teal-200 flex items-center justify-center">
                <ShieldAlert className="w-5 h-5 text-teal-300" />
              </div>
              <h3 className="font-bold text-white text-lg">
                Complete Lab Biomarker Directory
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                Review in-depth educational explanations for kidney microalbumin (uACR), thyroid TSH, lipid fractions, and continuous glucose monitoring metrics.
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-white/15">
              <Link to="/patient-resources/reports" className="block w-full">
                <Button variant="secondary" size="sm" className="w-full text-xs font-semibold justify-between">
                  <span>Explore All Report Guides</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      )}
    </Section>
  );
};
