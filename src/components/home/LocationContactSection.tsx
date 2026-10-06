import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Phone, ArrowRight } from 'lucide-react';
import { Section } from '../common/Section';
import { Card } from '../common/Card';
import { MapSection } from '../common/MapSection';
import { DirectionsButton } from '../common/DirectionsButton';
import { WhatsAppButton } from '../common/WhatsAppButton';
import { CallButton } from '../common/CallButton';
import { VerificationBadge } from '../common/VerificationBadge';
import { useLanguage } from '../../context/useLanguage';
import { useService } from '../../hooks/useService';
import { clinicService } from '../../services';

export const LocationContactSection: React.FC = () => {
  const { localize, isHindi } = useLanguage();
  const { data: clinic } = useService(() => clinicService.getPrimaryClinic(), []);

  const addressText = clinic
    ? `${localize(clinic.address.line1)}, ${localize(clinic.address.city)} ${clinic.address.pincode}`
    : 'Salt Lake Sector 1, Kolkata 700064';

  return (
    <Section
      eyebrow={isHindi ? 'चेंबर संपर्क एवं स्थान' : 'Physical Chamber Access'}
      heading={isHindi ? 'स्थान एवं संपर्क विवरण' : 'Location, Timings & Chamber Access'}
      lede={isHindi}
      className="bg-[#faf9f6]"
    >
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Chamber Logistics & Direct Actions */}
        <div className="lg:col-span-6 space-y-6">
          <Card padding="lg" className="space-y-6 bg-white border-slate-200/90 shadow-xs">
            <div className="flex items-start justify-between flex-wrap gap-2 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {clinic ? localize(clinic.name) : 'Salt Lake Diabetology Chamber'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {isHindi ? 'वरिष्ठ परामर्शदाता ओपीडी' : 'Consultant Diabetology OPD'}
                </p>
              </div>
              <VerificationBadge />
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#0f3d4a] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 font-semibold mb-0.5">
                    {isHindi ? 'चेंबर का पता:' : 'Chamber Postal Address:'}
                  </strong>
                  <p className="leading-relaxed text-slate-600">{addressText}</p>
                  <p className="text-xs text-slate-400 mt-1">
                    {isHindi ? 'निकटतम लैंडमार्क: बीडी मार्केट, साल्ट लेक' : 'Landmark: Near BD Market & Water Tank No. 4'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2 border-t border-slate-100">
                <Clock className="w-5 h-5 text-[#0f3d4a] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 font-semibold mb-0.5">
                    {isHindi ? 'परामर्श समय:' : 'Routine Consulting Hours:'}
                  </strong>
                  <p className="text-slate-600">
                    {isHindi ? 'सोमवार से शनिवार: शाम 5:00 बजे से रात 8:00 बजे तक' : 'Monday – Saturday: 5:00 PM – 8:00 PM'}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {isHindi ? 'रविवार: अग्रिम अनुरोध पर' : 'Sunday: Advance appointment request only'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2 border-t border-slate-100">
                <Phone className="w-5 h-5 text-[#0f3d4a] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 font-semibold mb-0.5">
                    {isHindi ? 'सीधा संपर्क:' : 'Direct Phone & Desk:'}
                  </strong>
                  <p className="font-mono text-slate-800 font-semibold">
                    {clinic?.phone || '+91 98300 00000'}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-2.5">
              <DirectionsButton destination={addressText} size="md" />
              <WhatsAppButton variant="location" size="md" />
              <CallButton size="md" />
            </div>
          </Card>

          <div className="flex items-center justify-between px-2 text-xs text-slate-500">
            <Link to="/clinic/timings" className="font-semibold text-[#0f3d4a] hover:underline flex items-center gap-1">
              <span>{isHindi ? 'विस्तृत समय सारणी देखें' : 'View Full OPD Hours & Schedule'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link to="/contact" className="font-semibold text-[#0f3d4a] hover:underline flex items-center gap-1">
              <span>{isHindi ? 'सभी संपर्क विकल्प' : 'All Contact Options'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Right Column: Interactive / Styled Map Section */}
        <div className="lg:col-span-6">
          <MapSection
            address={addressText}
            landmark={clinic?.address.landmark ? localize(clinic.address.landmark) : 'Near BD Market, Salt Lake'}
            mapsUrl={clinic?.mapsUrl}
          />
        </div>
      </div>
    </Section>
  );
};
