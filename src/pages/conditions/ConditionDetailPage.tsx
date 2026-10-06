import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { SEO } from '../../components/common/SEO';
import { Container } from '../../components/common/Container';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { EmptyState } from '../../components/common/EmptyState';
import { MedicalDisclaimerBanner } from '../../components/common/MedicalDisclaimerBanner';
import { AlertCircle, CheckCircle, ArrowLeft, Calendar } from 'lucide-react';
import { useLanguage } from '../../context/useLanguage';
import { useService } from '../../hooks/useService';
import { conditionService } from '../../services';

export const ConditionDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { localize, t } = useLanguage();
  const { data: condition, isLoading } = useService(
    () => conditionService.getConditionBySlug(slug || ''),
    [slug]
  );

  if (isLoading) {
    return (
      <Container size="xl" className="py-20 text-center">
        <div className="w-6 h-6 border-2 border-[#0f3d4a] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
        <p className="text-xs text-slate-500">Loading condition profile...</p>
      </Container>
    );
  }

  if (!condition) {
    return (
      <Container size="xl" className="py-20">
        <EmptyState
          title="Condition Information Not Found"
          description="The requested medical topic is not available or has been relocated."
          action={
            <Link to="/conditions">
              <Button variant="outline" size="sm">
                View All Conditions
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
        title={`${localize(condition.name)} — Dr. Soumya Sengupta`}
        description={localize(condition.summary)}
        canonicalPath={`/conditions/${condition.slug}`}
      />

      <div className="bg-[#faf9f6] border-b border-slate-200">
        <Container size="xl">
          <Breadcrumb
            items={[
              { label: t('nav.conditions'), href: '/conditions' },
              { label: localize(condition.name) },
            ]}
          />
          <div className="py-6 sm:py-10 max-w-3xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0f3d4a]">
              Medical Overview
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#06181f] tracking-tight">
              {localize(condition.name)}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              {localize(condition.summary)}
            </p>
          </div>
        </Container>
      </div>

      <Container size="xl" className="py-12 space-y-12">
        <MedicalDisclaimerBanner />

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Symptoms */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900">Recognizing Typical Symptoms</h2>
              <div className="space-y-2.5">
                {condition.symptoms.map((symptom, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-lg bg-amber-50/50 border border-amber-200/80 text-xs sm:text-sm text-slate-800 flex items-start gap-2.5"
                  >
                    <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <span>{localize(symptom)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Clinical Management */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900">Dr. Sengupta's Clinical Approach</h3>
              <div className="space-y-3">
                {condition.managementApproach.map((approach, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs flex items-start gap-3"
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-800 font-medium">
                      {localize(approach)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Card */}
          <div className="space-y-6">
            <Card padding="lg" className="space-y-4 bg-[#faf9f6] border-[#0f3d4a]/20">
              <h3 className="font-bold text-slate-900 text-base">Schedule a Diagnosis</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Book a consultation to review blood reports and discuss personalized management strategies.
              </p>

              <Link to="/book-appointment" className="block w-full">
                <Button variant="primary" size="md" className="w-full gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Book Appointment</span>
                </Button>
              </Link>
            </Card>

            <Link
              to="/conditions"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0f3d4a] hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to all conditions</span>
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
};
