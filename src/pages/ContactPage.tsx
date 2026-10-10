import React from 'react';
import { Phone, MessageCircle, Mail, MapPin, Clock, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { Container } from '../components/common/Container';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { MedicalDisclaimerBanner } from '../components/common/MedicalDisclaimerBanner';
import { VerificationBadge } from '../components/common/VerificationBadge';
import { WhatsAppButton } from '../components/common/WhatsAppButton';
import { CallButton } from '../components/common/CallButton';
import { EmailButton } from '../components/common/EmailButton';
import { MapSection } from '../components/common/MapSection';
import { useLanguage } from '../context/useLanguage';
import { useService } from '../hooks/useService';
import { clinicService } from '../services';

export const ContactPage: React.FC = () => {
  const { localize, isHindi, t } = useLanguage();
  const { data: clinic } = useService(() => clinicService.getPrimaryClinic(), []);

  const addressText = clinic
    ? `${localize(clinic.address.line1)}, ${localize(clinic.address.city)} ${clinic.address.pincode}`
    : 'Amlatola, Post Box No. 20, Chaibasa – 833201, West Singhbhum, Jharkhand';

  const clinicJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    name: 'Cardio Diabetic Clinic',
    medicalSpecialty: 'Endocrinology',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Amlatola, Post Box No. 20',
      addressLocality: 'Chaibasa',
      addressRegion: 'Jharkhand',
      postalCode: '833201',
      addressCountry: 'IN',
    },
    physician: {
      '@type': 'Physician',
      name: 'Dr. Soumya Sengupta',
      jobTitle: 'Consultant Diabetologist & Metabolic Physician',
    },
  };

  return (
    <>
      <SEO
        title="Contact Cardio Diabetic Clinic — Dr. Soumya Sengupta"
        description="Official contact details, phone numbers, WhatsApp inquiry line, and clinic email for Dr. Soumya Sengupta at Cardio Diabetic Clinic, Chaibasa, West Singhbhum, Jharkhand."
        canonicalPath="/contact"
        structuredData={clinicJsonLd}
      />

      <div className="bg-[#faf9f6] border-b border-slate-200">
        <Container size="xl">
          <Breadcrumb items={[{ label: t('nav.contact') }]} />
          <div className="py-6 sm:py-10 max-w-3xl space-y-3">
            <Badge variant="primary">{isHindi ? 'रिसेप्शन एवं संपर्क' : 'Reception & Inquiries'}</Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#06181f] tracking-tight">
              {isHindi ? 'परामर्श चेंबर से संपर्क करें' : 'Contact the Consultation Chamber'}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              {isHindi
                ? 'चेंबर स्लॉट बुकिंग, निरंतर ग्लूकोज निगरानी (सीजीएम) पूछताछ और क्लिनिक विवरण के लिए हमारे सहायता डेस्क से संपर्क करें।'
                : 'Reach our appointment desk for chamber bookings, continuous glucose sensor inquiries, and clinical visits.'}
            </p>
          </div>
        </Container>
      </div>

      <Container size="xl" className="py-12 space-y-12">
        <MedicalDisclaimerBanner />

        {/* Contact Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Phone Card */}
          <Card padding="lg" className="space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#dff0f4] text-[#0a252f] flex items-center justify-center">
                <Phone className="w-5 h-5 text-[#0f3d4a]" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  {isHindi ? 'टेलीफोन अपॉइंटमेंट डेस्क' : 'Telephone Appointment Desk'}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  {isHindi ? 'ओपीडी समय में सीधा फोन संपर्क' : 'Direct calling during routine OPD consulting hours'}
                </p>
              </div>
              <div className="pt-2">
                <p className="font-mono text-sm font-bold text-slate-800">
                  {clinic?.phone || '+91 98300 00000'}
                </p>
                <VerificationBadge className="mt-1" />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <CallButton size="sm" className="w-full" />
            </div>
          </Card>

          {/* WhatsApp Card */}
          <Card padding="lg" className="space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-200">
                <MessageCircle className="w-5 h-5 text-emerald-700" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  {isHindi ? 'व्हाट्सएप पूछताछ लाइन' : 'WhatsApp Inquiry Line'}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  {isHindi ? 'स्लॉट आरक्षण एवं रिपोर्ट फॉलो-अप' : 'Slot inquiries and prescription follow-up coordination'}
                </p>
              </div>
              <div className="pt-2">
                <p className="font-mono text-sm font-bold text-slate-800">
                  {clinic?.whatsapp || '+91 98300 00000'}
                </p>
                <VerificationBadge className="mt-1" />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <WhatsAppButton variant="enquiry" size="sm" className="w-full" />
            </div>
          </Card>

          {/* Email Card */}
          <Card padding="lg" className="space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  {isHindi ? 'आधिकारिक क्लिनिकल ईमेल' : 'Official Clinical Email'}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  {isHindi ? 'गैर-आपातकालीन पत्राचार' : 'Non-emergency correspondence and administrative inquiries'}
                </p>
              </div>
              <div className="pt-2">
                <p className="font-mono text-sm font-bold text-slate-800">
                  {clinic?.email || 'care@drsoumyasengupta.com'}
                </p>
                <VerificationBadge className="mt-1" />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <EmailButton size="sm" className="w-full" />
            </div>
          </Card>
        </div>

        {/* Physical Chamber Logistics & Map Card */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5">
            <Card padding="lg" className="space-y-5">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-200">
                <MapPin className="w-5 h-5 text-[#0f3d4a]" />
                <h2 className="text-base font-bold text-slate-900">
                  {isHindi ? 'चेंबर विवरण एवं समय' : 'Physical Chamber Logistics'}
                </h2>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                <div>
                  <strong className="text-slate-900 block mb-1">
                    {isHindi ? 'चेंबर का पता:' : 'Chamber Address:'}
                  </strong>
                  <p className="leading-relaxed text-slate-600">{addressText}</p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {isHindi ? 'लैंडमार्क: पोस्ट ऑफिस के समीप, अमलाटोला' : 'Landmark: Near Post Office, Amlatola, Chaibasa'}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <strong className="text-slate-900 block mb-1">
                    {isHindi ? 'नियमित ओपीडी परामर्श समय:' : 'Routine Consultation Hours:'}
                  </strong>
                  <div className="flex items-start gap-2 text-slate-600">
                    <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <p>Monday – Saturday: 10:00 AM – 2:00 PM & 5:00 PM – 8:00 PM</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <Link to="/book-appointment">
                    <Button variant="primary" size="sm" className="w-full">
                      <Calendar className="w-4 h-4 mr-1.5" />
                      <span>{isHindi ? 'अपॉइंटमेंट स्लॉट आरक्षित करें' : 'Request Appointment Slot'}</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-7">
            <MapSection
              address={addressText}
              landmark={clinic?.address.landmark ? localize(clinic.address.landmark) : 'Near Post Office, Amlatola, Chaibasa'}
              mapsUrl={clinic?.mapsUrl}
            />
          </div>
        </div>
      </Container>
    </>
  );
};
