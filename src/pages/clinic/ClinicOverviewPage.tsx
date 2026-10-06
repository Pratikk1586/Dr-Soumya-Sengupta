import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Phone, MessageCircle, ArrowRight } from 'lucide-react';
import { SEO } from '../../components/common/SEO';
import { Container } from '../../components/common/Container';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { VerificationBadge } from '../../components/common/VerificationBadge';
import { useLanguage } from '../../context/useLanguage';
import { useService } from '../../hooks/useService';
import { clinicService } from '../../services';
import { ENV, getSafePhoneHref, getSafeWhatsAppHref } from '../../config/env';

export const ClinicOverviewPage: React.FC = () => {
  const { localize, t } = useLanguage();
  const { data: clinic } = useService(() => clinicService.getPrimaryClinic(), []);

  const phoneHref = getSafePhoneHref();
  const whatsappHref = getSafeWhatsAppHref('Hello, I would like to check chamber consultation timings.');

  return (
    <>
      <SEO
        title="Chamber & Clinic Logistics — Dr. Soumya Sengupta"
        description="Salt Lake Chamber details, OPD timings, on-site continuous glucose monitoring facilities, and appointment desk phone numbers."
        canonicalPath="/clinic"
      />

      <div className="bg-[#faf9f6] border-b border-slate-200">
        <Container size="xl">
          <Breadcrumb items={[{ label: t('nav.clinic') }]} />
          <div className="py-6 sm:py-10 max-w-3xl space-y-3">
            <Badge variant="primary">Practice Chamber</Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#06181f] tracking-tight">
              Consultation Chamber & Diagnostic Facilities
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              A calm, dedicated medical setting in Salt Lake, Kolkata, providing point-of-care HbA1c tests, CGM application, and clinical evaluations.
            </p>
          </div>
        </Container>
      </div>

      <Container size="xl" className="py-12 space-y-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            <Card padding="lg" className="space-y-6">
              <div className="flex items-start justify-between flex-wrap gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    {clinic ? localize(clinic.name) : 'Salt Lake Chamber'}
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    {clinic ? localize(clinic.facilityType) : 'Primary Outpatient Chamber'}
                  </p>
                </div>
                <VerificationBadge note="Chamber exact address undergoing verification" />
              </div>

              <div className="grid sm:grid-cols-2 gap-6 text-xs sm:text-sm">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-slate-800">
                    <MapPin className="w-4 h-4 text-[#0f3d4a]" />
                    <span>Chamber Address</span>
                  </div>
                  {clinic && (
                    <p className="text-slate-600 leading-relaxed">
                      {localize(clinic.address.line1)}, {localize(clinic.address.city)} {clinic.address.pincode}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-slate-800">
                    <Clock className="w-4 h-4 text-[#0f3d4a]" />
                    <span>OPD Hours</span>
                  </div>
                  {clinic?.timings.map((tm, idx) => (
                    <p key={idx} className="text-slate-600">
                      <strong>{localize(tm.dayOfWeek)}:</strong> {localize(tm.timeSlot)}
                    </p>
                  ))}
                </div>
              </div>
            </Card>

            {/* Sub-page quick cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              <Link to="/clinic/facilities" className="group">
                <Card padding="md" hoverable className="space-y-2 h-full">
                  <h3 className="font-bold text-slate-900 text-sm group-hover:text-[#0f3d4a] flex items-center justify-between">
                    <span>Diagnostic Facilities</span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#0f3d4a]" />
                  </h3>
                  <p className="text-xs text-slate-500">
                    View on-site sensor application and sensory testing equipment.
                  </p>
                </Card>
              </Link>

              <Link to="/clinic/timings" className="group">
                <Card padding="md" hoverable className="space-y-2 h-full">
                  <h3 className="font-bold text-slate-900 text-sm group-hover:text-[#0f3d4a] flex items-center justify-between">
                    <span>OPD Timings</span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#0f3d4a]" />
                  </h3>
                  <p className="text-xs text-slate-500">
                    Detailed breakdown of daily slots and holiday notices.
                  </p>
                </Card>
              </Link>
            </div>
          </div>

          {/* Contact and Reception */}
          <div className="space-y-6">
            <Card padding="lg" className="space-y-4 bg-slate-50 border-slate-200">
              <h3 className="font-bold text-slate-900 text-sm">Chamber Reception Contact</h3>
              <p className="text-xs text-slate-600">
                To confirm doctor availability or book an appointment slot:
              </p>

              <div className="space-y-2 text-xs">
                {ENV.hasPhone && phoneHref && (
                  <a
                    href={phoneHref}
                    className="flex items-center gap-2 p-2.5 rounded-lg bg-white border border-slate-200 text-slate-800 hover:border-[#0f3d4a] font-medium transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#0f3d4a]" />
                    <span>{clinic?.phone}</span>
                  </a>
                )}

                {ENV.hasWhatsapp && whatsappHref && (
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 hover:bg-emerald-100 font-medium transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-700" />
                    <span>WhatsApp Inquiry Line</span>
                  </a>
                )}
              </div>

              <div className="pt-2">
                <Link to="/book-appointment" className="block w-full">
                  <span className="block w-full text-center py-2.5 rounded-lg bg-[#0f3d4a] text-white text-xs font-semibold hover:bg-[#0a252f] transition-colors">
                    Book Consultation Slot
                  </span>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </>
  );
};
