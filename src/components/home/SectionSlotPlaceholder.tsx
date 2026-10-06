import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Layers } from 'lucide-react';
import { Container } from '../common/Container';
import { Card } from '../common/Card';

interface SectionSlotPlaceholderProps {
  slotNumber: number;
  moduleName: string;
  tagline: string;
  description: string;
  targetLink?: string;
  targetLinkText?: string;
}

export const SectionSlotPlaceholder: React.FC<SectionSlotPlaceholderProps> = ({
  slotNumber,
  moduleName,
  tagline,
  description,
  targetLink,
  targetLinkText,
}) => {
  return (
    <section className="py-10 bg-[#faf9f6]/80 border-b border-slate-200/80">
      <Container size="xl">
        <Card
          padding="lg"
          className="border-dashed border-2 border-teal-600/30 bg-gradient-to-r from-teal-50/40 via-white to-amber-50/30"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-teal-100 text-[#0f3d4a] border border-teal-300">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Section {slotNumber} • Phase 3 Module Slot</span>
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  {tagline}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                {moduleName}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
                {description}
              </p>
            </div>

            {targetLink && targetLinkText && (
              <div className="shrink-0">
                <Link
                  to={targetLink}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-[#0f3d4a] hover:bg-slate-50 font-semibold text-xs sm:text-sm shadow-xs transition-colors"
                >
                  <span>{targetLinkText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        </Card>
      </Container>
    </section>
  );
};
