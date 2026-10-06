import React from 'react';
import { Camera } from 'lucide-react';
import { SEO } from '../../components/common/SEO';
import { Container } from '../../components/common/Container';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { EmptyState } from '../../components/common/EmptyState';
import { useLanguage } from '../../context/useLanguage';

export const PhotosPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <>
      <SEO
        title="Chamber Photographs & Environment — Dr. Soumya Sengupta"
        description="Photographs of Dr. Soumya Sengupta's consultation chambers, patient waiting lounge, and clinical examination rooms."
        canonicalPath="/clinic/photos"
      />

      <div className="bg-[#faf9f6] border-b border-slate-200">
        <Container size="xl">
          <Breadcrumb
            items={[
              { label: t('nav.clinic'), href: '/clinic' },
              { label: 'Photographs' },
            ]}
          />
          <div className="py-6 sm:py-10 max-w-3xl space-y-3">
            <Badge variant="primary">Clinic Gallery</Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#06181f] tracking-tight">
              Chamber Environment & Consultation Rooms
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              A serene, patient-centric environment designed for thoughtful, undisturbed medical consultations.
            </p>
          </div>
        </Container>
      </div>

      <Container size="xl" className="py-12 space-y-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {['Consultation Chamber Desk', 'Patient Waiting Area', 'CGM Calibration Station'].map((title, i) => (
            <Card key={i} padding="none" className="overflow-hidden">
              <div className="aspect-4/3 bg-slate-100 flex items-center justify-center text-slate-400 border-b border-slate-200">
                <div className="text-center p-4">
                  <Camera className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <span className="text-xs font-semibold text-slate-600">{title}</span>
                  <span className="block text-[11px] text-slate-400 mt-1">Photo pending clinical upload</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-slate-800 text-sm">{title}</h3>
                <p className="text-xs text-slate-500 mt-1">Hygienic, calm consultation zone</p>
              </div>
            </Card>
          ))}
        </div>

        <EmptyState
          icon={<Camera className="w-6 h-6 text-slate-400" />}
          title="Clinical Photography Update in Progress"
          description="High-resolution interior photographs of the Salt Lake practice room are currently being formatted and will be displayed following final chamber review."
        />
      </Container>
    </>
  );
};
