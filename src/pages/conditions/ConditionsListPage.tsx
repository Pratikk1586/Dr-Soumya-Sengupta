import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Stethoscope } from 'lucide-react';
import { SEO } from '../../components/common/SEO';
import { Container } from '../../components/common/Container';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { MedicalDisclaimerBanner } from '../../components/common/MedicalDisclaimerBanner';
import { useLanguage } from '../../context/useLanguage';
import { useService } from '../../hooks/useService';
import { conditionService } from '../../services';

export const ConditionsListPage: React.FC = () => {
  const { localize, t } = useLanguage();
  const { data: conditions } = useService(() => conditionService.getConditions(), []);

  return (
    <>
      <SEO
        title="Endocrine & Metabolic Conditions — Dr. Soumya Sengupta"
        description="Conditions evaluated and managed: Type 1 & 2 diabetes, thyroid disorders (TSH), metabolic weight struggles, dyslipidemia, and endocrine health."
        canonicalPath="/conditions"
      />

      <div className="bg-[#faf9f6] border-b border-slate-200">
        <Container size="xl">
          <Breadcrumb items={[{ label: t('nav.conditions') }]} />
          <div className="py-6 sm:py-10 max-w-3xl space-y-3">
            <Badge variant="primary">Clinical Focus</Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#06181f] tracking-tight">
              Metabolic & Endocrine Conditions
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Comprehensive medical guidance, symptom clarification, and evidence-based treatment roadmaps.
            </p>
          </div>
        </Container>
      </div>

      <Container size="xl" className="py-12 space-y-12">
        <MedicalDisclaimerBanner />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {conditions?.map((cond) => (
            <Card key={cond.id} hoverable padding="lg" className="flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-[#dff0f4] text-[#0a252f] flex items-center justify-center">
                  <Stethoscope className="w-5 h-5 text-[#0f3d4a]" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">{localize(cond.name)}</h2>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mt-0.5">
                    Category: {cond.category}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {localize(cond.summary)}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100">
                <Link
                  to={`/conditions/${cond.slug}`}
                  className="text-xs font-semibold text-[#0f3d4a] hover:underline flex items-center justify-between"
                >
                  <span>Symptoms & Management</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </>
  );
};
