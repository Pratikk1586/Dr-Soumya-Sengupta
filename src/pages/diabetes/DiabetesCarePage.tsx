import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, ArrowRight, ShieldCheck } from 'lucide-react';
import { SEO } from '../../components/common/SEO';
import { Container } from '../../components/common/Container';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { MedicalDisclaimerBanner } from '../../components/common/MedicalDisclaimerBanner';
import { useLanguage } from '../../context/useLanguage';
import { useService } from '../../hooks/useService';
import { serviceCatalogService } from '../../services';

export const DiabetesCarePage: React.FC = () => {
  const { localize, t } = useLanguage();
  const { data: services } = useService(() => serviceCatalogService.getServices(), []);

  return (
    <>
      <SEO
        title="Diabetes Care Programs — Dr. Soumya Sengupta"
        description="Clinical diabetology programs: Comprehensive management, prediabetes remission, CGM sensor training, lifestyle balance, and complication screening."
        canonicalPath="/diabetes-care"
      />

      <div className="bg-[#faf9f6] border-b border-slate-200">
        <Container size="xl">
          <Breadcrumb items={[{ label: t('nav.diabetesCare') }]} />
          <div className="py-6 sm:py-10 max-w-3xl space-y-3">
            <Badge variant="primary">Clinical Programs</Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#06181f] tracking-tight">
              Specialized Diabetes Care & Monitoring
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Structured clinical pathways combining advanced glycemic monitoring, beta-cell protection, and organ preservation.
            </p>
          </div>
        </Container>
      </div>

      <Container size="xl" className="py-12 space-y-12">
        <MedicalDisclaimerBanner />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services?.map((srv) => (
            <Card key={srv.id} hoverable padding="lg" className="flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-[#dff0f4] text-[#0a252f] flex items-center justify-center">
                  <Activity className="w-5 h-5 text-[#0f3d4a]" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">{localize(srv.title)}</h2>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mt-0.5">
                    Category: {srv.category}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {localize(srv.shortDescription)}
                </p>

                <div className="pt-2">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Key Indications:
                  </h4>
                  <ul className="space-y-1 text-xs text-slate-600">
                    {srv.indications.slice(0, 2).map((ind, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{localize(ind)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                <Link to={`/diabetes-care/${srv.slug}`} className="w-full">
                  <Button variant="outline" size="sm" className="w-full justify-between">
                    <span>Clinical Approach</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>

        {/* Clinical Consultation CTA */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-[#0f3d4a] to-[#08222a] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Enroll in a Structured Diabetes Program
            </h3>
            <p className="text-xs sm:text-sm text-teal-100 max-w-xl leading-relaxed">
              Start with a detailed clinical assessment and continuous sensor profiling to take control of your glycemic health.
            </p>
          </div>
          <Link to="/book-appointment" className="shrink-0">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto shadow-md">
              <span>{t('cta.bookAppointment')}</span>
            </Button>
          </Link>
        </div>
      </Container>
    </>
  );
};
