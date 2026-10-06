import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Phone, Calendar, ArrowRight, ExternalLink } from 'lucide-react';
import { Container } from '../common/Container';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { VerificationBadge } from '../common/VerificationBadge';
import { useLanguage } from '../../context/useLanguage';
import { useService } from '../../hooks/useService';
import { clinicService } from '../../services';
import { ENV, getSafePhoneHref } from '../../config/env';

export const QuickClinicInfo: React.FC = () => {
  const { localize, t } = useLanguage();
  const { data: clinic } = useService(() => clinicService.getPrimaryClinic(), []);
  const phoneHref = getSafePhoneHref();

  return (
    <section className="py-8 sm:py-12 bg-white border-b border-slate-200/80">
      <Container size="xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Card 1: Clinic Location */}
          <Card hoverable padding="md" className="flex flex-col justify-between border-slate-200/90 shadow-sm hover:shadow-md transition-shadow">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0f3d4a] flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#0f3d4a]" aria-hidden="true" />
                </div>
                <VerificationBadge note="Chamber location details" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">
                {clinic ? localize(clinic.name) : 'Consultation Chamber'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {clinic
                  ? `${localize(clinic.address.line1)}, ${localize(clinic.address.city)} - ${clinic.address.pincode}`
                  : 'Kolkata, West Bengal'}
              </p>
            </div>

            <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between">
              {ENV.hasGoogleMaps ? (
                <a
                  href={ENV.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-[#0f3d4a] hover:underline flex items-center gap-1"
                >
                  <span>Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              ) : (
                <Link
                  to="/clinic/location"
                  className="text-xs font-semibold text-[#0f3d4a] hover:underline flex items-center gap-1"
                >
                  <span>Directions & Landmark</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              )}
            </div>
          </Card>

          {/* Card 2: Consulting Hours */}
          <Card hoverable padding="md" className="flex flex-col justify-between border-slate-200/90 shadow-sm hover:shadow-md transition-shadow">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0f3d4a] flex items-center justify-center">
                  <Clock className="w-5 h-5 text-[#0f3d4a]" aria-hidden="true" />
                </div>
                <VerificationBadge note="Timing slots" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Chamber Timings</h3>
              <div className="space-y-1 text-xs sm:text-sm text-slate-600">
                {clinic?.timings?.slice(0, 2).map((t, i) => (
                  <p key={i} className="flex justify-between">
                    <span className="font-medium text-slate-700">{localize(t.dayOfWeek)}:</span>
                    <span>{localize(t.timeSlot)}</span>
                  </p>
                )) || <p>Mon – Sat: 5:00 PM – 8:00 PM</p>}
              </div>
            </div>

            <div className="pt-4 mt-2 border-t border-slate-100">
              <Link
                to="/clinic/timings"
                className="text-xs font-semibold text-[#0f3d4a] hover:underline flex items-center gap-1"
              >
                <span>Full Weekly Schedule</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>
          </Card>

          {/* Card 3: Call & Inquiries */}
          <Card hoverable padding="md" className="flex flex-col justify-between border-slate-200/90 shadow-sm hover:shadow-md transition-shadow">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0f3d4a] flex items-center justify-center">
                  <Phone className="w-5 h-5 text-[#0f3d4a]" aria-hidden="true" />
                </div>
                <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  During OPD Hours
                </span>
              </div>
              <h3 className="font-bold text-slate-900 text-base">Direct Contact</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                For urgent appointment rescheduling or chamber assistance, call directly or reach out via WhatsApp.
              </p>
            </div>

            <div className="pt-4 mt-2 border-t border-slate-100">
              {ENV.hasPhone && phoneHref ? (
                <a
                  href={phoneHref}
                  className="text-xs font-semibold text-[#0f3d4a] hover:underline flex items-center gap-1"
                >
                  <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{ENV.clinicPhone || t('cta.callNow')}</span>
                </a>
              ) : (
                <Link
                  to="/contact"
                  className="text-xs font-semibold text-[#0f3d4a] hover:underline flex items-center gap-1"
                >
                  <span>Chamber Contact Details</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              )}
            </div>
          </Card>

          {/* Card 4: Prior Appointment Booking */}
          <Card hoverable padding="md" className="flex flex-col justify-between bg-gradient-to-br from-[#0f3d4a] to-[#08232c] text-white border-0 shadow-md">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 text-teal-200 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-teal-300" aria-hidden="true" />
              </div>
              <h3 className="font-bold text-white text-base">Book Consultation</h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                Reserve your slot in advance to ensure dedicated time for lab report analysis and clinical review.
              </p>
            </div>

            <div className="pt-4 mt-2 border-t border-white/15">
              <Link to="/book-appointment" className="block w-full">
                <Button variant="secondary" size="sm" className="w-full text-xs font-semibold">
                  <span>{t('cta.bookAppointment')}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" aria-hidden="true" />
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </Container>
    </section>
  );
};
