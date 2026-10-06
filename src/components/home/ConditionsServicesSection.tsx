import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Flame, Scale, HeartPulse, Stethoscope, ArrowRight } from 'lucide-react';
import { Section } from '../common/Section';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { useLanguage } from '../../context/useLanguage';
import { useService } from '../../hooks/useService';
import { conditionService } from '../../services';

const ICONS = [Activity, Flame, Scale, HeartPulse, Stethoscope];

export const ConditionsServicesSection: React.FC = () => {
  const { localize } = useLanguage();
  const { data: conditions, isLoading } = useService(() => conditionService.getConditions(), []);

  return (
    <Section
      eyebrow="Specialized Clinical Focus"
      heading="Conditions & Clinical Programs"
      lede="Systematic management pathways tailored to clinical biomarker profiles and lifestyle goals."
      containerSize="xl"
      className="bg-white border-b border-slate-200/80"
    >
      {isLoading ? (
        <div className="py-12 text-center text-sm text-slate-500">Loading conditions...</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {conditions?.map((cond, idx) => {
            const IconComp = ICONS[idx % ICONS.length];
            return (
              <Card
                key={cond.id}
                hoverable
                padding="lg"
                className="flex flex-col justify-between border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-200"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0f3d4a] flex items-center justify-center">
                    <IconComp className="w-5 h-5 text-[#0f3d4a]" aria-hidden="true" />
                  </div>

                  <h3 className="font-bold text-slate-900 text-base leading-snug">
                    {localize(cond.name)}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {localize(cond.summary)}
                  </p>

                  {/* Top 2 Symptoms or Approach items */}
                  <div className="pt-2 border-t border-slate-100">
                    <span className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider block mb-1">
                      Key Clinical Focus:
                    </span>
                    <ul className="space-y-1 text-xs text-slate-600">
                      {cond.symptoms.slice(0, 2).map((sym, sIdx) => (
                        <li key={sIdx} className="flex items-start gap-1.5">
                          <span className="text-teal-600 font-bold shrink-0">•</span>
                          <span>{localize(sym)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-5 mt-4 border-t border-slate-100">
                  <Link
                    to={`/conditions/${cond.slug}`}
                    className="text-xs font-semibold text-[#0f3d4a] hover:underline flex items-center gap-1 group"
                  >
                    <span>Clinical Approach & Care Pathway</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      <div className="mt-10 text-center">
        <Link to="/conditions">
          <Button variant="outline" size="md">
            View All Clinical Conditions Overview
          </Button>
        </Link>
      </div>
    </Section>
  );
};
