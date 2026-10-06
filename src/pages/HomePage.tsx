import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Activity, Clock, Phone, ArrowRight, Stethoscope, HeartPulse, LineChart } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { Container } from '../components/common/Container';
import { Section } from '../components/common/Section';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { VerificationBadge } from '../components/common/VerificationBadge';
import { MedicalDisclaimerBanner } from '../components/common/MedicalDisclaimerBanner';
import { useLanguage } from '../context/useLanguage';
import { useService } from '../hooks/useService';
import { doctorService, serviceCatalogService, clinicService } from '../services';
import { ENV, getSafePhoneHref } from '../config/env';

export const HomePage: React.FC = () => {
  const { localize, t } = useLanguage();
  const { data: doctor } = useService(() => doctorService.getProfile(), []);
  const { data: services } = useService(() => serviceCatalogService.getServices(), []);
  const { data: clinic } = useService(() => clinicService.getPrimaryClinic(), []);

  const phoneHref = getSafePhoneHref();

  return (
    <>
      <SEO
        title="Dr. Soumya Sengupta — Consultant Diabetologist"
        description="Senior Consultant Diabetologist in Kolkata specializing in Type 1 & Type 2 diabetes, Continuous Glucose Monitoring (CGM), and cardiometabolic organ protection."
        canonicalPath="/"
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#dff0f4]/40 via-[#faf9f6] to-[#faf9f6] pt-12 pb-16 md:pt-20 md:pb-24 border-b border-slate-200/60">
        <Container size="xl">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Clinical Pitch */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="primary" size="md">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1 text-[#0f3d4a]" aria-hidden="true" />
                  Evidence-Based Diabetology
                </Badge>
                <VerificationBadge note="Tenure & Credentials under doctor review" />
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#06181f] tracking-tight leading-tight">
                {doctor ? localize(doctor.name) : 'Dr. Soumya Sengupta'}
              </h1>

              <p className="text-lg sm:text-xl font-medium text-[#0f3d4a] leading-snug">
                {doctor ? localize(doctor.title) : 'Consultant Diabetologist & Metabolic Physician'}
              </p>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl font-normal">
                {doctor
                  ? localize(doctor.shortBio)
                  : 'Individualized glycemic balance, sensor analytics (CGM), and holistic cardiovascular-renal risk reduction.'}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link to="/book-appointment">
                  <Button variant="primary" size="lg" className="shadow-md">
                    {t('cta.bookAppointment')}
                  </Button>
                </Link>

                <Link to="/diabetes-care">
                  <Button variant="outline" size="lg">
                    <span>Explore Care Programs</span>
                    <ArrowRight className="w-4 h-4 ml-1.5" aria-hidden="true" />
                  </Button>
                </Link>

                {ENV.hasPhone && phoneHref && (
                  <a href={phoneHref} className="inline-block">
                    <Button variant="ghost" size="lg" className="text-slate-700">
                      <Phone className="w-4 h-4 mr-1.5 text-[#0f3d4a]" aria-hidden="true" />
                      <span>{t('cta.callNow')}</span>
                    </Button>
                  </a>
                )}
              </div>

              <div className="pt-4">
                <MedicalDisclaimerBanner />
              </div>
            </div>

            {/* Right Column: Practice Overview Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl p-6 sm:p-8 space-y-6">
                <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100">
                  <div className="w-12 h-12 rounded-xl bg-[#0f3d4a] text-white flex items-center justify-center">
                    <Stethoscope className="w-6 h-6 text-[#dff0f4]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">Chamber Practice Profile</h3>
                    <p className="text-xs text-slate-500">Kolkata Clinical Consultation</p>
                  </div>
                </div>

                <div className="space-y-4 text-xs sm:text-sm">
                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-[#0f3d4a] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-800 block">Consulting Hours</strong>
                      <p className="text-slate-600 mt-0.5">
                        {clinic
                          ? `${localize(clinic.timings[0]?.dayOfWeek)}: ${localize(clinic.timings[0]?.timeSlot)}`
                          : 'Mon – Sat: 5:00 PM – 8:00 PM'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <HeartPulse className="w-4 h-4 text-[#0f3d4a] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-800 block">Clinical Philosophy</strong>
                      <p className="text-slate-600 mt-0.5 italic">
                        "{doctor ? localize(doctor.clinicalPhilosophy) : 'Protecting long-term organ health.'}"
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <LineChart className="w-4 h-4 text-[#0f3d4a] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-800 block">Technology & Diagnostics</strong>
                      <p className="text-slate-600 mt-0.5">
                        Continuous Glucose Monitoring (CGM / AGP), On-site Foot Neuropathy Testing.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Link to="/about" className="block w-full">
                    <Button variant="secondary" size="md" className="w-full">
                      View Doctor Qualifications & Bio
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Clinical Programs Preview */}
      <Section
        eyebrow="Clinical Specialization"
        heading="Structured Diabetes Programs"
        lede="Individualized care models addressing cellular insulin resistance, glucose spikes, and systemic organ preservation."
        containerSize="xl"
      >
        <div className="grid md:grid-cols-3 gap-6">
          {services?.slice(0, 3).map((srv) => (
            <Card key={srv.id} hoverable padding="lg" className="flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-[#dff0f4] text-[#0a252f] flex items-center justify-center">
                  <Activity className="w-5 h-5 text-[#0f3d4a]" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">{localize(srv.title)}</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {localize(srv.shortDescription)}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  to={`/diabetes-care/${srv.slug}`}
                  className="text-xs font-semibold text-[#0f3d4a] hover:underline flex items-center gap-1"
                >
                  <span>Program Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link to="/diabetes-care">
            <Button variant="outline" size="md">
              View All 5 Care Programs
            </Button>
          </Link>
        </div>
      </Section>
    </>
  );
};
