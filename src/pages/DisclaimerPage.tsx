import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { Container } from '../components/common/Container';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { Card } from '../components/common/Card';
import { VerificationBadge } from '../components/common/VerificationBadge';
import { CONTENT_TO_BE_VERIFIED_MARKER, SHOW_VERIFY_BADGES } from '../config/constants';

export const DisclaimerPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Medical Disclaimer & Legal Notice — Dr. Soumya Sengupta"
        description="Clinical disclaimer regarding educational medical content, prescription rules, and emergency guidelines."
        canonicalPath="/disclaimer"
      />

      <div className="relative overflow-hidden bg-gradient-to-b from-[#EAF7FA]/70 via-[#FCFEFF] to-white border-b border-slate-200/80">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#65D9D0]/10 rounded-full blur-3xl pointer-events-none" />
        <Container size="xl" className="relative z-10">
          <Breadcrumb items={[{ label: 'Medical Disclaimer' }]} />
          <div className="py-6 sm:py-10 max-w-3xl space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#EAF7FA] text-[#103F4A] border border-[#65D9D0]/40 shadow-xs">
              <ShieldAlert className="w-3.5 h-3.5 text-[#103F4A]" />
              <span>Clinical Boundaries</span>
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#103F4A] tracking-tight">
              Medical Disclaimer & Terms of Use
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Essential guidelines on clinical boundaries, educational material, and emergency care.
            </p>
          </div>
        </Container>
      </div>

      <Container size="xl" className="py-12 max-w-4xl space-y-8">
        <div className="flex items-center gap-2">
          <VerificationBadge note="Medical-legal review pending before official publication" />
        </div>

        <Card padding="lg" className="space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-200 text-teal-900">
            <ShieldAlert className="w-5 h-5 text-teal-800" />
            <h2 className="text-base font-bold text-slate-900">
              {SHOW_VERIFY_BADGES ? `${CONTENT_TO_BE_VERIFIED_MARKER} ` : ''}Universal Medical Disclaimer
            </h2>
          </div>

          <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-200 text-teal-950 font-medium">
            "For medical diagnosis or treatment, please consult a qualified doctor."
          </div>

          <section className="space-y-2">
            <h3 className="font-bold text-slate-900 text-sm">1. Educational Nature of Web Content</h3>
            <p>
              The articles, laboratory explainers, guides, and FAQ answers published on this website are provided strictly for general health education and patient literacy. They do NOT constitute an individual medical diagnosis, individualized treatment plan, or formal prescription.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-bold text-slate-900 text-sm">2. No Doctor-Patient Relationship via Website</h3>
            <p>
              Browsing this site, using search tools, or sending an appointment inquiry form does not establish an official doctor-patient legal relationship. A doctor-patient relationship is created only during a formal clinical consultation.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-bold text-slate-900 text-sm">3. Emergency Advisory</h3>
            <p>
              This website is not designed for urgent or emergency situations. If you experience chest pain, sudden breathlessness, severe hypoglycemia with confusion, or loss of consciousness, proceed immediately to the nearest hospital casualty or emergency department.
            </p>
          </section>
        </Card>
      </Container>
    </>
  );
};
