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
      className="bg-[#E8F5F4] border-b border-[#D7E5E6] py-10 sm:py-14 relative"
    >
      <div className="space-y-6">
        <div className="grid lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          {/* Left Column: Chamber Logistics, Key Facilities & Actions */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <Card padding="md" className="p-5 sm:p-6 bg-white border-[#D7E5E6] shadow-xs space-y-4 flex-1">
              <div className="flex items-start justify-between flex-wrap gap-2 pb-3 border-b border-[#D7E5E6]/70">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1B2B34]">
                    {clinic ? localize(clinic.name) : 'Cardio Diabetic Clinic'}
                  </h3>
                  <p className="text-xs text-[#4F6470]">
                    {isHindi ? 'वरिष्ठ परामर्शदाता ओपीडी — डॉ. सौम्य सेनगुप्ता' : 'Consultant Diabetology OPD — Dr. Soumya Sengupta'}
                  </p>
                </div>
                <VerificationBadge />
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-[#1B2B34]">
                {/* Address */}
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#0E5A6B] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#1B2B34] font-semibold text-xs">
                      {isHindi ? 'चेंबर का पता:' : 'Chamber Address:'}
                    </strong>
                    <p className="text-xs text-[#4F6470] leading-relaxed">{addressText}</p>
                    <p className="text-[11px] text-[#0E5A6B] mt-0.5 flex items-center gap-1 font-medium">
                      <CheckCircle2 className="w-3 h-3 text-[#0E5A6B] shrink-0" />
                      <span>{isHindi ? 'लैंडमार्क: पोस्ट ऑफिस के समीप, अमलाटोला' : 'Landmark: Near Post Office, Amlatola'}</span>
                    </p>
                  </div>
                </div>

                {/* Timings */}
                <div className="flex items-start gap-2.5 pt-2 border-t border-[#D7E5E6]/70">
                  <Clock className="w-4 h-4 text-[#0E5A6B] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#1B2B34] font-semibold text-xs">
                      {isHindi ? 'परामर्श समय:' : 'Consulting Hours:'}
                    </strong>
                    <p className="text-xs text-[#1B2B34] font-medium">
                      {isHindi ? 'सोमवार–शनिवार: 10:00 AM – 2:00 PM एवं 5:00 PM – 8:00 PM' : 'Mon–Sat: 10:00 AM – 2:00 PM & 5:00 PM – 8:00 PM'}
                    </p>
                    <p className="text-[11px] text-[#0E5A6B]">
                      {isHindi ? 'रविवार: शिविर / पूर्व बुकिंग' : 'Sunday: Screening Camps / Prior Booking'}
                    </p>
                  </div>
                </div>

                {/* Direct Phone */}
                <div className="flex items-start gap-2.5 pt-2 border-t border-[#D7E5E6]/70">
                  <Phone className="w-4 h-4 text-[#0E5A6B] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#1B2B34] font-semibold text-xs">
                      {isHindi ? 'सीधा फोन:' : 'Phone Desk:'}
                    </strong>
                    <a
                      href={getTelHref(clinic?.phone) || 'tel:+916582256446'}
                      className="font-mono text-xs text-[#1B2B34] font-semibold hover:underline hover:text-[#0E5A6B] inline-block"
                    >
                      {clinic?.phone || '+91 6582 256446'}
                    </a>
                  </div>
                </div>

                {/* Quick Facility Chips */}
                <div className="pt-2 border-t border-[#D7E5E6]/70 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E8F5F4] text-[#0E5A6B] border border-[#D7E5E6] font-medium">
                      <ShieldCheck className="w-3 h-3 text-[#0E5A6B]" />
                      <span>{isHindi ? 'निजी चेंबर' : 'Private Chamber'}</span>
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E8F5F4] text-[#0E5A6B] border border-[#D7E5E6] font-medium">
                      <span>{isHindi ? 'ऑन-साइट जांच' : 'Testing Desk'}</span>
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E8F5F4] text-[#0E5A6B] border border-[#D7E5E6] font-medium">
                      <span>{isHindi ? 'प्रतीक्षालय' : 'Patient Lounge'}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Direct Action Buttons: Directions and Call Clinic */}
              <div className="pt-3 border-t border-[#D7E5E6]/70 flex flex-wrap gap-2">
                <DirectionsButton destination={addressText} size="sm" />
                <CallButton size="sm" />
              </div>
            </Card>
          </div>

          {/* Right Column: Embedded Map */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="h-full min-h-[320px]">
              <MapSection
                address={addressText}
                landmark={clinic?.address.landmark ? localize(clinic.address.landmark) : 'Near Post Office, Amlatola, Chaibasa'}
                mapsUrl={clinic?.mapsUrl}
                embedUrl={clinic?.embedUrl || 'https://maps.google.com/maps?q=Cardio+Diabetic+Clinic,+Amlatola,+Chaibasa,+Jharkhand&t=&z=15&ie=UTF8&iwloc=&output=embed'}
              />
            </div>
          </div>
        </div>

        {/* Gallery Slot for Real Clinic Photos (Placeholder images user will replace) */}
        <Card padding="md" className="p-5 sm:p-6 bg-white border-[#D7E5E6] shadow-xs space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#E8F5F4] text-[#0E5A6B] flex items-center justify-center border border-[#D7E5E6]">
                <Camera className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-[#1B2B34]">
                  {isHindi ? 'क्लिनिक परिसर एवं सुविधाएं (फोटो गैलरी)' : 'Chamber Facilities & Patient Gallery'}
                </h4>
                <p className="text-xs text-[#4F6470]">
                  {isHindi ? 'चाईबासा चेंबर का स्वच्छ व शांत वातावरण' : 'Comfortable consultation environment and point-of-care facilities'}
                </p>
              </div>
            </div>
            <Link
              to="/media/photos"
              className="text-xs font-semibold text-[#0E5A6B] hover:underline inline-flex items-center gap-1"
            >
              <span>{isHindi ? 'सभी तस्वीरें देखें' : 'View Full Gallery'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 3 Clinic Photo Slots */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
            {/* Slot 1: Consultation Room */}
            <div className="group relative rounded-xl overflow-hidden border border-[#D7E5E6] bg-[#F7FAFA] aspect-[16/10] flex flex-col justify-end p-3 transition-all hover:border-[#0E5A6B]/50 hover:shadow-sm">
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-[#0B2E3A]/80 via-[#0B2E3A]/30 to-transparent">
                <Camera className="w-6 h-6 text-white/70 group-hover:scale-110 transition-transform" />
              </div>
              <div className="relative z-10">
                <span className="text-[10px] font-bold text-white bg-[#0E5A6B]/90 px-2 py-0.5 rounded-full inline-block">
                  {isHindi ? 'परामर्श कक्ष' : 'Consultation Desk'}
                </span>
                <p className="text-[11px] text-white/90 font-medium mt-0.5">
                  {isHindi ? 'डॉक्टर परामर्श चेंबर' : 'Doctor Consultation Room'}
                </p>
              </div>
            </div>

            {/* Slot 2: Patient Lounge & Waiting Area */}
            <div className="group relative rounded-xl overflow-hidden border border-[#D7E5E6] bg-[#F7FAFA] aspect-[16/10] flex flex-col justify-end p-3 transition-all hover:border-[#0E5A6B]/50 hover:shadow-sm">
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-[#0B2E3A]/80 via-[#0B2E3A]/30 to-transparent">
                <Camera className="w-6 h-6 text-white/70 group-hover:scale-110 transition-transform" />
              </div>
              <div className="relative z-10">
                <span className="text-[10px] font-bold text-white bg-[#0E5A6B]/90 px-2 py-0.5 rounded-full inline-block">
                  {isHindi ? 'प्रतीक्षालय' : 'Patient Lounge'}
                </span>
                <p className="text-[11px] text-white/90 font-medium mt-0.5">
                  {isHindi ? 'मरीज प्रतीक्षालय एवं रिसेप्शन' : 'Waiting Area & Reception Desk'}
                </p>
              </div>
            </div>

            {/* Slot 3: On-Site Point-of-Care Diagnostics */}
            <div className="group relative rounded-xl overflow-hidden border border-[#D7E5E6] bg-[#F7FAFA] aspect-[16/10] flex flex-col justify-end p-3 transition-all hover:border-[#0E5A6B]/50 hover:shadow-sm">
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-[#0B2E3A]/80 via-[#0B2E3A]/30 to-transparent">
                <Camera className="w-6 h-6 text-white/70 group-hover:scale-110 transition-transform" />
              </div>
              <div className="relative z-10">
                <span className="text-[10px] font-bold text-white bg-[#0E5A6B]/90 px-2 py-0.5 rounded-full inline-block">
                  {isHindi ? 'जांच डेस्क' : 'Testing Desk'}
                </span>
                <p className="text-[11px] text-white/90 font-medium mt-0.5">
                  {isHindi ? 'ब्लड शुगर व बीपी मॉनिटरिंग' : 'Glucose, BP & Vitals Check'}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Redirection button */}
      <div className="mt-6 text-center">
        <Link to="/clinic">
          <Button
            variant="outline"
            size="sm"
            className="border-[#0E5A6B]/40 text-[#0E5A6B] hover:bg-[#0E5A6B] hover:text-white transition-all text-xs"
          >
            <span>{isHindi ? 'क्लिनिक का संपूर्ण विवरण देखें' : 'View Full Clinic Overview & Facilities'}</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </Button>
        </Link>
      </div>
    </Section>
  );
};
