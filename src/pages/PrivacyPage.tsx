import React from 'react';
import { Shield } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { Container } from '../components/common/Container';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { Card } from '../components/common/Card';
import { VerificationBadge } from '../components/common/VerificationBadge';
import { CONTENT_TO_BE_VERIFIED_MARKER, SHOW_VERIFY_BADGES } from '../config/constants';

export const PrivacyPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Privacy Policy — Dr. Soumya Sengupta"
        description="Privacy policy and data protection disclosures for Dr. Soumya Sengupta's practice website."
        canonicalPath="/privacy"
      />

      <div className="relative overflow-hidden bg-gradient-to-b from-[#EAF7FA]/70 via-[#FCFEFF] to-white border-b border-slate-200/80">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#65D9D0]/10 rounded-full blur-3xl pointer-events-none" />
        <Container size="xl" className="relative z-10">
          <Breadcrumb items={[{ label: 'Privacy Policy' }]} />
          <div className="py-6 sm:py-10 max-w-3xl space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#EAF7FA] text-[#103F4A] border border-[#65D9D0]/40 shadow-xs">
              <Shield className="w-3.5 h-3.5 text-[#103F4A]" />
              <span>Patient Data Security</span>
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#103F4A] tracking-tight">
              Privacy & Patient Confidentiality Policy
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Our principles regarding data minimization, patient anonymity, and web security.
            </p>
          </div>
        </Container>
      </div>

      <Container size="xl" className="py-12 max-w-4xl space-y-8">
        <div className="flex items-center gap-2">
          <VerificationBadge note="Legal counsel sign-off required prior to production publication" />
        </div>

        <Card padding="lg" className="space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
            <Shield className="w-5 h-5 text-[#103F4A]" />
            <h2 className="text-base font-bold text-slate-900">
              {SHOW_VERIFY_BADGES ? `${CONTENT_TO_BE_VERIFIED_MARKER} ` : ''}Patient Privacy Commitment
            </h2>
          </div>

          <section className="space-y-2">
            <h3 className="font-bold text-slate-900 text-sm">1. Non-Collection of Sensitive Health Records</h3>
            <p>
              This website serves informational and appointment scheduling coordination purposes only. We do NOT store electronic medical records (EMRs), laboratory diagnostic scans, or private health history on web databases.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-bold text-slate-900 text-sm">2. Appointment Request Form & Data Minimization</h3>
            <p>
              The multi-step consultation scheduling form on this website operates under strict data minimization principles:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>
                <strong>Client-Side Only Preparation:</strong> The form prepares your scheduling request entirely within your browser to facilitate direct communication with our chamber desk via telephone or WhatsApp.
              </li>
              <li>
                <strong>Zero Server Persistence:</strong> No sensitive medical histories, diagnostic scans, or payment credentials are submitted to or stored on external web servers or public cloud databases.
              </li>
              <li>
                <strong>Confidentiality Notice:</strong> Patients are explicitly instructed not to enter confidential clinical narratives or lab reports into the form. Detailed medical discussions occur strictly during the confidential, one-on-one consultation with Dr. Sengupta.
              </li>
              <li>
                <strong>No Commercial Tracking:</strong> Your contact details are never shared with third-party advertisers, data brokers, or marketing networks.
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h3 className="font-bold text-slate-900 text-sm">3. Local Storage Preferences</h3>
            <p>
              We only use browser local storage to save your language preference (English or हिन्दी). No tracking cookies or commercial behavioral ad trackers are utilized.
            </p>
          </section>
        </Card>
      </Container>
    </>
  );
};
