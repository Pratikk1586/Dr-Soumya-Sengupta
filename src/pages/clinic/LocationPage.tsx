import React from 'react';
import { MapPin, Clock, CheckCircle2 } from 'lucide-react';
import { SEO } from '../../components/common/SEO';
import { Container } from '../../components/common/Container';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { VerificationBadge } from '../../components/common/VerificationBadge';
import { MapSection } from '../../components/common/MapSection';
import { DirectionsButton } from '../../components/common/DirectionsButton';
import { WhatsAppButton } from '../../components/common/WhatsAppButton';
import { CallButton } from '../../components/common/CallButton';
import { useLanguage } from '../../context/useLanguage';
import { useService } from '../../hooks/useService';
import { clinicService } from '../../services';

export const LocationPage: React.FC = () => {
  const { localize, isHindi, t } = useLanguage();
  const { data: clinic } = useService(() => clinicService.getPrimaryClinic(), []);

  const addressText = clinic
    ? `${localize(clinic.address.line1)}, ${localize(clinic.address.city)} ${clinic.address.pincode}`
    : 'Salt Lake Sector 1, Kolkata 700064';

  const locationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    name: 'Dr. Soumya Sengupta Diabetology Chamber',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kolkata',
      addressRegion: 'West Bengal',
      postalCode: '700064',
      addressCountry: 'IN',
    },
  };

  return (
    <>
      <SEO
        title="Chamber Location & Directions — Dr. Soumya Sengupta"
        description="Physical location, landmarks, metro transit guidance, and Google Maps directions for the Salt Lake chamber, Kolkata."
        canonicalPath="/clinic/location"
        structuredData={locationJsonLd}
      />

      <div className="bg-[#faf9f6] border-b border-slate-200">
        <Container size="xl">
          <Breadcrumb
            items={[
              { label: t('nav.clinic'), href: '/clinic' },
              { label: isHindi ? 'स्थान एवं दिशा-निर्देश' : 'Location & Directions' },
            ]}
          />
          <div className="py-6 sm:py-10 max-w-3xl space-y-3">
            <Badge variant="primary">{isHindi ? 'चेंबर आवागमन एवं दिशा' : 'Transit & Directions'}</Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#06181f] tracking-tight">
              {isHindi ? 'चेंबर का पता एवं गूगल मैप्स दिशा-निर्देश' : 'Chamber Location & Transit Directions'}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              {isHindi
                ? 'सेक्टर 1, साल्ट लेक सिटी, कोलकाता में मेट्रो, कैब और निजी वाहन द्वारा सुगमता से पहुंचने योग्य।'
                : 'Conveniently accessible by metro, cab, and road in Sector 1, Salt Lake City, Kolkata.'}
            </p>
          </div>
        </Container>
      </div>

      <Container size="xl" className="py-12 space-y-8 max-w-5xl">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Chamber Logistics */}
          <div className="lg:col-span-6 space-y-6">
            <Card padding="lg" className="space-y-6">
              <div className="flex items-start justify-between flex-wrap gap-4 pb-4 border-b border-slate-200">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    {clinic ? localize(clinic.name) : 'Salt Lake Diabetology Chamber'}
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    {isHindi ? 'प्राथमिक परामर्श केंद्र' : 'Primary Consulting Chamber'}
                  </p>
                </div>
                <VerificationBadge note="Address details to be verified before final release" />
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#0f3d4a] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-semibold">
                      {isHindi ? 'पूर्ण डाक पता:' : 'Complete Postal Address:'}
                    </strong>
                    <p className="mt-1 leading-relaxed text-slate-600">{addressText}</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                  <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                    {isHindi ? 'आवागमन एवं प्रमुख लैंडमार्क' : 'Transit & Landmarks'}
                  </h3>
                  <div className="space-y-1.5 text-xs text-slate-600">
                    <p className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>{isHindi ? 'मेट्रो:' : 'Metro:'}</strong>{' '}
                        {isHindi
                          ? 'सेंट्रल पार्क मेट्रो स्टेशन (ग्रीन लाइन) से केवल 5 मिनट की दूरी।'
                          : '5 minutes from Central Park Metro Station (Green Line).'}
                      </span>
                    </p>
                    <p className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>{isHindi ? 'लैंडमार्क:' : 'Landmark:'}</strong>{' '}
                        {isHindi
                          ? 'बीडी मार्केट एवं वाटर टैंक नंबर 4 के समीप।'
                          : 'Near BD Market and Salt Lake Water Tank No. 4.'}
                      </span>
                    </p>
                    <p className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>{isHindi ? 'पार्किंग:' : 'Parking:'}</strong>{' '}
                        {isHindi
                          ? 'चेंबर के सामने सुविधाजनक स्ट्रीट पार्किंग उपलब्ध है।'
                          : 'Designated street parking accessible directly in front of the building.'}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2 border-t border-slate-100">
                  <Clock className="w-5 h-5 text-[#0f3d4a] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-semibold">
                      {isHindi ? 'परामर्श घंटे:' : 'Consultation Timings:'}
                    </strong>
                    <p className="text-slate-600">
                      {isHindi
                        ? 'सोमवार से शनिवार: शाम 5:00 बजे से रात 8:00 बजे तक'
                        : 'Monday – Saturday: 5:00 PM – 8:00 PM'}
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
          </div>

          {/* Right Column: Google Maps & Directions */}
          <div className="lg:col-span-6">
            <MapSection
              address={addressText}
              landmark={clinic?.address.landmark ? localize(clinic.address.landmark) : 'Near BD Market, Salt Lake'}
              mapsUrl={clinic?.mapsUrl}
            />
          </div>
        </div>
      </Container>
    </>
  );
};
