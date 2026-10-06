import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { Container } from '../components/common/Container';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { VerificationBadge } from '../components/common/VerificationBadge';
import { MedicalDisclaimerBanner } from '../components/common/MedicalDisclaimerBanner';
import { GraduationCap, Briefcase, Award, CheckCircle, Shield, Calendar } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';
import { useService } from '../hooks/useService';
import { doctorService } from '../services';

export const AboutPage: React.FC = () => {
  const { localize, t } = useLanguage();
  const { data: doctor } = useService(() => doctorService.getProfile(), []);

  return (
    <>
      <SEO
        title="About Dr. Soumya Sengupta — Qualifications & Experience"
        description="Comprehensive clinical biography, medical qualifications (MBBS, MD), hospital experience, and professional society memberships of Dr. Soumya Sengupta."
        canonicalPath="/about"
      />

      <div className="bg-[#faf9f6] border-b border-slate-200">
        <Container size="xl">
          <Breadcrumb items={[{ label: t('nav.about') }]} />
          <div className="py-6 sm:py-10 max-w-3xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0f3d4a]">
              Physician Profile & Credentials
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#06181f] tracking-tight">
              {doctor ? localize(doctor.name) : 'Dr. Soumya Sengupta'}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 font-medium">
              {doctor ? localize(doctor.title) : 'Consultant Diabetologist'}
            </p>
          </div>
        </Container>
      </div>

      <Container size="xl" className="py-12 space-y-16">
        <MedicalDisclaimerBanner />

        {/* Section: Overview (#overview) */}
        <section id="overview" className="scroll-mt-28 space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
            <Shield className="w-5 h-5 text-[#0f3d4a]" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Biography & Practice Philosophy
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
              {doctor?.fullBio.map((p, idx) => (
                <p key={idx}>{localize(p)}</p>
              ))}
              <div className="p-5 rounded-xl bg-[#dff0f4]/40 border border-[#b8dfe8] text-slate-800 text-sm italic font-serif">
                "{doctor ? localize(doctor.clinicalPhilosophy) : ''}"
              </div>
            </div>

            <div className="space-y-4">
              <Card padding="md" className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Registration & Languages
                </h4>
                <div className="text-xs space-y-2">
                  <div>
                    <span className="text-slate-500 block">Registration Number:</span>
                    <span className="font-semibold text-slate-800 font-mono">
                      {doctor?.registrationNumber}
                    </span>
                    <VerificationBadge className="mt-1" />
                  </div>
                  <div>
                    <span className="text-slate-500 block">Languages Spoken:</span>
                    <span className="font-semibold text-slate-800">
                      {doctor?.languagesSpoken.map((l) => localize(l)).join(', ')}
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Section: Qualifications (#qualifications) */}
        <section id="qualifications" className="scroll-mt-28 space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
            <GraduationCap className="w-5 h-5 text-[#0f3d4a]" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Medical Degrees & Qualifications
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {doctor?.qualifications.map((q) => (
              <Card key={q.id} padding="md" className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-slate-900 text-sm">{localize(q.degree)}</h3>
                  {q.status === 'placeholder' && <VerificationBadge />}
                </div>
                <p className="text-xs text-slate-600">{localize(q.institution)}</p>
                {q.year && <p className="text-[11px] text-slate-400 font-mono">Conferred: {q.year}</p>}
              </Card>
            ))}
          </div>
        </section>

        {/* Section: Experience (#experience) */}
        <section id="experience" className="scroll-mt-28 space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
            <Briefcase className="w-5 h-5 text-[#0f3d4a]" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Clinical & Hospital Experience
            </h2>
          </div>

          <div className="space-y-4">
            {doctor?.experiences.map((exp) => (
              <div
                key={exp.id}
                className="p-5 rounded-xl bg-white border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs"
              >
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{localize(exp.role)}</h3>
                  <p className="text-xs text-slate-600 mt-0.5">{localize(exp.organization)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-[#0f3d4a] bg-[#dff0f4] px-2.5 py-1 rounded-md">
                    {localize(exp.period)}
                  </span>
                  {exp.status === 'placeholder' && <VerificationBadge />}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Expertise (#expertise) */}
        <section id="expertise" className="scroll-mt-28 space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
            <CheckCircle className="w-5 h-5 text-[#0f3d4a]" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Clinical Focus & Areas of Expertise
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {doctor?.specialties.map((spec, i) => (
              <div
                key={i}
                className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 flex items-center gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-[#0f3d4a]" />
                <span>{localize(spec)}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Memberships (#memberships) */}
        <section id="memberships" className="scroll-mt-28 space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
            <Award className="w-5 h-5 text-[#0f3d4a]" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Professional Memberships & Affiliations
            </h2>
          </div>

          <div className="space-y-3">
            {doctor?.memberships.map((m, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-white border border-slate-200 flex items-center justify-between text-xs font-medium text-slate-800 shadow-2xs"
              >
                <span>{localize(m)}</span>
                <span className="text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Active Member
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Clinical Consultation CTA */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-[#0f3d4a] to-[#08222a] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Consult with Dr. Soumya Sengupta
            </h3>
            <p className="text-xs sm:text-sm text-teal-100 max-w-xl leading-relaxed">
              Prior appointment booking is recommended for comprehensive first evaluations and personalized glycemic plan formulation.
            </p>
          </div>
          <Link to="/book-appointment" className="shrink-0">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto shadow-md">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{t('cta.bookAppointment')}</span>
            </Button>
          </Link>
        </div>
      </Container>
    </>
  );
};
