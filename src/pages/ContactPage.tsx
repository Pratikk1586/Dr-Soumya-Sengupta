import React from 'react';
import { Phone, MessageCircle, Mail, MapPin, Clock } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { Container } from '../components/common/Container';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { MedicalDisclaimerBanner } from '../components/common/MedicalDisclaimerBanner';
import { VerificationBadge } from '../components/common/VerificationBadge';
import { useLanguage } from '../context/useLanguage';
import { useService } from '../hooks/useService';
import { clinicService } from '../services';
import { ENV, getSafePhoneHref, getSafeWhatsAppHref, getSafeEmailHref } from '../config/env';

export const ContactPage: React.FC = () => {
  const { localize, t } = useLanguage();
  const { data: clinic } = useService(() => clinicService.getPrimaryClinic(), []);

  const phoneHref = getSafePhoneHref();
  const whatsappHref = getSafeWhatsAppHref('Hello, I am contacting Dr. Soumya Sengupta clinic desk.');
  const emailHref = getSafeEmailHref();

  return (
    <>
      <SEO
        title="Contact Consultation Chamber — Dr. Soumya Sengupta"
        description="Official contact details, phone numbers, WhatsApp inquiry line, and clinic email for Dr. Soumya Sengupta's diabetology practice."
        canonicalPath="/contact"
      />

      <div className="bg-[#faf9f6] border-b border-slate-200">
        <Container size="xl">
          <Breadcrumb items={[{ label: t('nav.contact') }]} />
          <div className="py-6 sm:py-10 max-w-3xl space-y-3">
            <Badge variant="primary">Reception & Inquiries</Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#06181f] tracking-tight">
              Contact the Consultation Chamber
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Reach our appointment desk for chamber bookings, continuous glucose sensor inquiries, and clinical visits.
            </p>
          </div>
        </Container>
      </div>

      <Container size="xl" className="py-12 space-y-12">
        <MedicalDisclaimerBanner />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Phone Card */}
          <Card padding="lg" className="space-y-4">
            <div className="w-10 h-10 rounded-xl bg-[#dff0f4] text-[#0a252f] flex items-center justify-center">
              <Phone className="w-5 h-5 text-[#0f3d4a]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Telephone Appointment Desk</h2>
              <p className="text-xs text-slate-500 mt-1">Direct call during OPD hours</p>
            </div>
            <div className="pt-2">
              <p className="font-mono text-sm font-bold text-slate-800">
                {clinic?.phone || '+91 98300 00000'}
              </p>
              <VerificationBadge className="mt-1" />
            </div>
            {ENV.hasPhone && phoneHref && (
              <a href={phoneHref} className="block pt-2">
                <Button variant="primary" size="sm" className="w-full">
                  Call Now
                </Button>
              </a>
            )}
          </Card>

          {/* WhatsApp Card */}
          <Card padding="lg" className="space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-200">
              <MessageCircle className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">WhatsApp Inquiry Line</h2>
              <p className="text-xs text-slate-500 mt-1">Slot inquiries and report follow-up</p>
            </div>
            <div className="pt-2">
              <p className="font-mono text-sm font-bold text-slate-800">
                {clinic?.whatsapp || '+91 98300 00000'}
              </p>
              <VerificationBadge className="mt-1" />
            </div>
            {ENV.hasWhatsapp && whatsappHref && (
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="block pt-2">
                <Button variant="secondary" size="sm" className="w-full text-emerald-900 bg-emerald-100 hover:bg-emerald-200">
                  Chat on WhatsApp
                </Button>
              </a>
            )}
          </Card>

          {/* Email Card */}
          <Card padding="lg" className="space-y-4">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Official Clinical Email</h2>
              <p className="text-xs text-slate-500 mt-1">Non-emergency correspondence</p>
            </div>
            <div className="pt-2">
              <p className="font-mono text-sm font-bold text-slate-800">
                {clinic?.email || 'care@drsoumyasengupta.com'}
              </p>
              <VerificationBadge className="mt-1" />
            </div>
            {ENV.hasEmail && emailHref && (
              <a href={emailHref} className="block pt-2">
                <Button variant="outline" size="sm" className="w-full">
                  Send Email
                </Button>
              </a>
            )}
          </Card>
        </div>

        {/* Physical Chamber Card */}
        <Card padding="lg" className="space-y-4 max-w-4xl">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-200">
            <MapPin className="w-5 h-5 text-[#0f3d4a]" />
            <h2 className="text-base font-bold text-slate-900">Physical Chamber Details</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-700">
            <div>
              <strong className="text-slate-900 block mb-1">Chamber Address:</strong>
              {clinic && (
                <p className="leading-relaxed text-slate-600">
                  {localize(clinic.name)}
                  <br />
                  {localize(clinic.address.line1)}, {localize(clinic.address.city)} {clinic.address.pincode}
                </p>
              )}
            </div>

            <div>
              <strong className="text-slate-900 block mb-1">Routine Hours:</strong>
              <div className="flex items-start gap-2 text-slate-600">
                <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <p>Monday – Saturday: 5:00 PM – 8:00 PM</p>
              </div>
            </div>
          </div>
        </Card>
      </Container>
    </>
  );
};
