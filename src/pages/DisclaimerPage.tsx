import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { Container } from '../components/common/Container';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { Card } from '../components/common/Card';
import { VerificationBadge } from '../components/common/VerificationBadge';
import { CONTENT_TO_BE_VERIFIED_MARKER } from '../config/constants';

export const DisclaimerPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Medical Disclaimer & Legal Notice — Dr. Soumya Sengupta"
        description="Important clinical disclaimer regarding educational medical content, prescription rules, and emergency guidelines."
        canonicalPath="/disclaimer"
      />

      <div className="bg-[#faf9f6] border-b border-slate-200">
        <Container size="xl">
          <Breadcrumb items={[{ label: 'Medical Disclaimer' }]} />
          <div className="py-6 sm:py-10 max-w-3xl space-y-3">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#06181f] tracking-tight">
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
              {CONTENT_TO_BE_VERIFIED_MARKER} Universal Medical Disclaimer
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
