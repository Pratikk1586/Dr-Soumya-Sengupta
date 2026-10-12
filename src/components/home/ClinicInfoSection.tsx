import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Clock,
  Phone,
  ArrowRight,
  Camera,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { Section } from '../common/Section';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { MapSection } from '../common/MapSection';
import { DirectionsButton } from '../common/DirectionsButton';
import { WhatsAppButton } from '../common/WhatsAppButton';
import { CallButton } from '../common/CallButton';
import { VerificationBadge } from '../common/VerificationBadge';
import { useLanguage } from '../../context/useLanguage';
import { useService } from '../../hooks/useService';
import { clinicService } from '../../services';
import { getTelHref } from '../../lib/contact';

export const ClinicInfoSection: React.FC = () => {
  const { localize, isHindi } = useLanguage();
  const { data: clinic } = useService(() => clinicService.getPrimaryClinic(), []);

  const addressText = clinic
    ? `${localize(clinic.address.line1)}, ${localize(clinic.address.city)} ${clinic.address.pincode}`
    : 'Amlatola, Post Box No. 20, Chaibasa – 833201, West Singhbhum, Jharkhand';

  return (
    <Section
      eyebrow={isHindi ? 'क्लिनिक परिचय व स्थान' : 'Clinic & Location'}
      heading={isHindi ? 'क्लिनिक जानकारी, सुविधाएं एवं स्थान' : 'Clinic Info, Facilities & Location'}
      lede={
        isHindi
          ? 'कार्डियो डायबिटिक क्लिनिक, चाईबासा — शांत वातावरण, दैनिक समय सारणी और आसान पहुंच।'
          : 'Cardio Diabetic Clinic, Chaibasa — consultation hours, address, and interactive map.'
      }
      containerSize="xl"
      className="bg-gradient-to-b from-[#F8FCFD] to-[#FCFEFF] border-b border-slate-200/80 py-10 sm:py-14 relative"
    >
      <div className="grid lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
        {/* Left Column: Chamber Logistics, Key Facilities & Actions */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <Card padding="md" className="p-5 sm:p-6 bg-white/95 border-slate-200/85 shadow-2xs hover:border-[#65D9D0]/60 space-y-4 flex-1 backdrop-blur-xs">
            <div className="flex items-start justify-between flex-wrap gap-2 pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  {clinic ? localize(clinic.name) : 'Cardio Diabetic Clinic'}
                </h3>
                <p className="text-xs text-slate-500">
                  {isHindi ? 'वरिष्ठ परामर्शदाता ओपीडी — डॉ. सौम्य सेनगुप्ता' : 'Consultant Diabetology OPD — Dr. Soumya Sengupta'}
                </p>
              </div>
              <VerificationBadge />
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-700">
              {/* Address */}
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#103F4A] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 font-semibold text-xs">
                    {isHindi ? 'चेंबर का पता:' : 'Chamber Address:'}
                  </strong>
                  <p className="text-xs text-slate-600 leading-relaxed">{addressText}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-[#103F4A] shrink-0" />
                    <span>{isHindi ? 'लैंडमार्क: पोस्ट ऑफिस के समीप, अमलाटोला' : 'Landmark: Near Post Office, Amlatola'}</span>
                  </p>
                </div>
              </div>

              {/* Timings */}
              <div className="flex items-start gap-2.5 pt-2 border-t border-slate-100">
                <Clock className="w-4 h-4 text-[#103F4A] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 font-semibold text-xs">
                    {isHindi ? 'परामर्श समय:' : 'Consulting Hours:'}
                  </strong>
                  <p className="text-xs text-slate-700 font-medium">
                    {isHindi ? 'सोमवार–शनिवार: 10:00 AM – 2:00 PM एवं 5:00 PM – 8:00 PM' : 'Mon–Sat: 10:00 AM – 2:00 PM & 5:00 PM – 8:00 PM'}
                  </p>
                  <p className="text-[11px] text-amber-700">
                    {isHindi ? 'रविवार: शिविर / पूर्व बुकिंग' : 'Sunday: Screening Camps / Prior Booking'}
                  </p>
                </div>
              </div>

              {/* Direct Phone */}
              <div className="flex items-start gap-2.5 pt-2 border-t border-slate-100">
                <Phone className="w-4 h-4 text-[#103F4A] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 font-semibold text-xs">
                    {isHindi ? 'सीधा फोन:' : 'Phone Desk:'}
                  </strong>
                  <a
                    href={getTelHref(clinic?.phone) || 'tel:+916582256446'}
                    className="font-mono text-xs text-slate-800 font-semibold hover:underline hover:text-[#103F4A] inline-block"
                  >
                    {clinic?.phone || '+91 6582 256446'}
                  </a>
                </div>
              </div>

              {/* Quick Facility Chips & Photos link */}
              <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#EAF7FA] text-[#103F4A] border border-[#65D9D0]/50 font-medium">
                    <ShieldCheck className="w-3 h-3 text-[#103F4A]" />
                    <span>{isHindi ? 'निजी चेंबर' : 'Private Chamber'}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#EAF7FA] text-[#103F4A] border border-[#65D9D0]/50 font-medium">
                    <span>{isHindi ? 'ऑन-साइट जांच' : 'Testing Desk'}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#EAF7FA] text-[#103F4A] border border-[#65D9D0]/50 font-medium">
                    <span>{isHindi ? 'प्रतीक्षालय' : 'Patient Lounge'}</span>
                  </span>
                </div>

                <Link
                  to="/media/photos"
                  className="text-xs font-semibold text-[#103F4A] hover:underline inline-flex items-center gap-1"
                >
                  <Camera className="w-3 h-3" />
                  <span>{isHindi ? 'तस्वीरें देखें' : 'View Photos'}</span>
                </Link>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-2">
              <DirectionsButton destination={addressText} size="sm" />
              <WhatsAppButton variant="location" size="sm" />
              <CallButton size="sm" />
            </div>
          </Card>
        </div>

        {/* Right Column: Embedded Map */}
        <div className="lg:col-span-6 flex flex-col">
          <div className="h-full min-h-[280px]">
            <MapSection
              address={addressText}
              landmark={clinic?.address.landmark ? localize(clinic.address.landmark) : 'Near Post Office, Amlatola, Chaibasa'}
              mapsUrl={clinic?.mapsUrl}
            />
          </div>
        </div>
      </div>

      {/* Redirection button */}
      <div className="mt-6 text-center">
        <Link to="/clinic">
          <Button
            variant="outline"
            size="sm"
            className="border-[#103F4A]/30 hover:bg-[#103F4A] hover:text-white transition-all text-xs"
          >
            <span>{isHindi ? 'क्लिनिक का संपूर्ण विवरण देखें' : 'View Full Clinic Overview & Facilities'}</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </Button>
        </Link>
      </div>
    </Section>
  );
};
