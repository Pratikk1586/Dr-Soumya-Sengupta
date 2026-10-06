import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { SEO } from '../../components/common/SEO';
import { Container } from '../../components/common/Container';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { EmptyState } from '../../components/common/EmptyState';
import { MedicalDisclaimerBanner } from '../../components/common/MedicalDisclaimerBanner';
import { CheckCircle2, ShieldAlert, ArrowLeft, Calendar } from 'lucide-react';
import { useLanguage } from '../../context/useLanguage';
import { useService } from '../../hooks/useService';
import { serviceCatalogService } from '../../services';

export const ServiceDetailPage: React.FC<{ explicitSlug?: string }> = ({ explicitSlug }) => {
  const params = useParams<{ slug: string }>();
  const slug = explicitSlug || params.slug || 'management';
  const { localize, t } = useLanguage();
  const { data: service, isLoading } = useService(
    () => serviceCatalogService.getServiceBySlug(slug),
    [slug]
  );

  if (isLoading) {
    return (
      <Container size="xl" className="py-20 text-center">
        <div className="w-6 h-6 border-2 border-[#0f3d4a] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
        <p className="text-xs text-slate-500">Loading service details...</p>
      </Container>
    );
  }

  if (!service) {
    return (
      <Container size="xl" className="py-20">
        <EmptyState
          title="Clinical Service Not Found"
          description="The requested diabetes program could not be located."
          action={
            <Link to="/diabetes-care">
              <Button variant="outline" size="sm">
                Return to Diabetes Care
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
        title={`${localize(service.title)} — Dr. Soumya Sengupta`}
        description={localize(service.shortDescription)}
        canonicalPath={`/diabetes-care/${service.slug}`}
      />

      <div className="bg-[#faf9f6] border-b border-slate-200">
        <Container size="xl">
          <Breadcrumb
            items={[
              { label: t('nav.diabetesCare'), href: '/diabetes-care' },
              { label: localize(service.title) },
            ]}
          />
          <div className="py-6 sm:py-10 max-w-3xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0f3d4a]">
              Clinical Protocol
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#06181f] tracking-tight">
              {localize(service.title)}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {localize(service.shortDescription)}
            </p>
          </div>
        </Container>
      </div>

      <Container size="xl" className="py-12 space-y-12">
        <MedicalDisclaimerBanner />

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Description & Approach */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900">Clinical Overview</h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {localize(service.fullDescription)}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900">Treatment & Monitoring Methodology</h3>
              <div className="space-y-3">
                {service.clinicalApproach.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-800 font-medium">
                      {localize(step)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900">When Is This Program Indicated?</h3>
              <div className="space-y-2.5">
                {service.indications.map((ind, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 flex items-start gap-2.5"
                  >
                    <ShieldAlert className="w-4 h-4 text-[#0f3d4a] shrink-0 mt-0.5" />
                    <span>{localize(ind)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar CTA */}
          <div className="space-y-6">
            <Card padding="lg" className="space-y-4 bg-[#faf9f6] border-[#0f3d4a]/20">
              <h3 className="font-bold text-slate-900 text-base">Book a Clinical Evaluation</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Consult with Dr. Soumya Sengupta at the Salt Lake Chamber for an individualized glycemic review.
              </p>

              <Link to="/book-appointment" className="block w-full">
                <Button variant="primary" size="md" className="w-full gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Request Appointment</span>
                </Button>
              </Link>
            </Card>

            <Link
              to="/diabetes-care"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0f3d4a] hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to all care programs</span>
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
};
