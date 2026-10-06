import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, ArrowRight, ShieldCheck } from 'lucide-react';
import { Section } from '../common/Section';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { VerificationBadge } from '../common/VerificationBadge';

interface ShowcaseItem {
  id: string;
  title: string;
  area: string;
  note: string;
}

const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: 'consultation-chamber',
    title: 'Consultation & Clinical Desk',
    area: 'Private Consultation Zone',
    note: 'Quiet, private medical counseling room for detailed lifestyle review.',
  },
  {
    id: 'diagnostics-station',
    title: 'Biomarker & Foot Testing Desk',
    area: 'Diagnostic Screening Area',
    note: 'Dedicated setup for monofilament neuropathy testing and sensor fitting.',
  },
  {
    id: 'waiting-lounge',
    title: 'Patient Waiting Lounge',
    area: 'Reception & Patient Care',
    note: 'Calm, ventilated waiting lounge with minimal wait times via slot reservations.',
  },
];

export const ClinicShowcaseSection: React.FC = () => {
  return (
    <Section
      eyebrow="Practice Environment"
      heading="Clinic Showcase & Facilities"
      lede="Designed for patient comfort, privacy, and calm medical consultation."
      containerSize="xl"
      className="bg-[#faf9f6] border-b border-slate-200/80"
    >
      <div className="grid md:grid-cols-3 gap-6">
        {SHOWCASE_ITEMS.map((item) => (
          <Card key={item.id} padding="none" className="overflow-hidden border-slate-200/90 shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              {/* Image placeholder container */}
              <div className="relative aspect-4/3 bg-slate-100 flex flex-col items-center justify-center p-6 text-center border-b border-slate-200 select-none group">
                <Camera className="w-8 h-8 text-slate-400 mb-2 group-hover:scale-105 transition-transform" />
                <span className="text-xs font-semibold text-slate-700">{item.title}</span>
                <span className="text-[11px] text-slate-400 mt-1">High-res photography under clinic audit</span>
                <div className="absolute top-3 right-3">
                  <VerificationBadge note="Facility photograph placeholder" />
                </div>
              </div>

              <div className="p-5 space-y-2">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-teal-800 uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                  <span>{item.area}</span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.note}</p>
              </div>
            </div>

            <div className="p-5 pt-0">
              <Link
                to="/clinic/facilities"
                className="text-xs font-semibold text-[#0f3d4a] hover:underline flex items-center gap-1"
              >
                <span>View Facility Specifications</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link to="/clinic/photos">
          <Button variant="outline" size="md">
            <span>Explore Full Chamber Photo Gallery</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </Link>
      </div>
    </Section>
  );
};
