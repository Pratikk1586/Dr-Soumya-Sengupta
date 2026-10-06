import React from 'react';
import { Stethoscope, CheckCircle } from 'lucide-react';
import { SEO } from '../../components/common/SEO';
import { Container } from '../../components/common/Container';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { useLanguage } from '../../context/useLanguage';
import { useService } from '../../hooks/useService';
import { clinicService } from '../../services';

export const FacilitiesPage: React.FC = () => {
  const { localize, t } = useLanguage();
  const { data: clinic } = useService(() => clinicService.getPrimaryClinic(), []);

  return (
    <>
      <SEO
        title="Diagnostic Facilities & Equipment — Dr. Soumya Sengupta"
        description="On-site clinical facilities: Continuous glucose sensor application, POC HbA1c testing, and biothesiometry foot sensory evaluation."
        canonicalPath="/clinic/facilities"
      />

      <div className="bg-[#faf9f6] border-b border-slate-200">
        <Container size="xl">
          <Breadcrumb
            items={[
              { label: t('nav.clinic'), href: '/clinic' },
              { label: 'Facilities' },
            ]}
          />
          <div className="py-6 sm:py-10 max-w-3xl space-y-3">
            <Badge variant="primary">On-Site Diagnostics</Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#06181f] tracking-tight">
              Diagnostic & Clinical Facilities
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Specialized point-of-care equipment installed at the chamber to minimize patient delays and enable immediate medical decision-making.
            </p>
          </div>
        </Container>
      </div>

      <Container size="xl" className="py-12 space-y-8">
        <div className="grid md:grid-cols-3 gap-6">
          {clinic?.facilities.map((fac) => (
            <Card key={fac.id} padding="lg" className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#dff0f4] text-[#0a252f] flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-[#0f3d4a]" />
              </div>
              <h2 className="text-base font-bold text-slate-900">{localize(fac.name)}</h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {localize(fac.description)}
              </p>
              <div className="pt-2 flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Available On-Site</span>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </>
  );
};
