import React from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { SEO } from '../../components/common/SEO';
import { Container } from '../../components/common/Container';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { VerificationBadge } from '../../components/common/VerificationBadge';
import { useLanguage } from '../../context/useLanguage';
import { useService } from '../../hooks/useService';
import { clinicService } from '../../services';
import { ENV } from '../../config/env';

export const LocationPage: React.FC = () => {
  const { localize, t } = useLanguage();
  const { data: clinic } = useService(() => clinicService.getPrimaryClinic(), []);

  return (
    <>
      <SEO
        title="Chamber Location & Directions — Dr. Soumya Sengupta"
        description="Physical location, landmarks, metro transit guidance, and Google Maps directions for the Salt Lake chamber."
        canonicalPath="/clinic/location"
      />

      <div className="bg-[#faf9f6] border-b border-slate-200">
        <Container size="xl">
          <Breadcrumb
            items={[
              { label: t('nav.clinic'), href: '/clinic' },
              { label: 'Location & Map' },
            ]}
          />
          <div className="py-6 sm:py-10 max-w-3xl space-y-3">
            <Badge variant="primary">Transit & Directions</Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#06181f] tracking-tight">
              Chamber Location & Map Directions
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Conveniently accessible by metro, cab, and road in Sector 1, Salt Lake City, Kolkata.
            </p>
          </div>
        </Container>
      </div>

      <Container size="xl" className="py-12 space-y-8 max-w-4xl">
        <Card padding="lg" className="space-y-6">
          <div className="flex items-start justify-between flex-wrap gap-4 pb-4 border-b border-slate-200">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                {clinic ? localize(clinic.name) : 'Salt Lake Chamber'}
              </h2>
              <p className="text-xs text-slate-500 mt-1">Primary Consulting Chamber</p>
            </div>
            <VerificationBadge note="Address details to be verified before final release" />
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-700">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#0f3d4a] shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block">Complete Postal Address</strong>
                <p className="mt-1 leading-relaxed">
                  {clinic ? (
                    <>
                      {localize(clinic.address.line1)}
                      {clinic.address.line2 && <>, {localize(clinic.address.line2)}</>}
                      <br />
                      {localize(clinic.address.city)}, West Bengal — {clinic.address.pincode}
                    </>
                  ) : (
                    'Salt Lake, Kolkata 700064'
                  )}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                Transit & Landmarks
              </h3>
              <p className="text-xs text-slate-600">
                • <strong>Metro:</strong> 5 minutes from Central Park Metro Station (Green Line).
              </p>
              <p className="text-xs text-slate-600">
                • <strong>Landmark:</strong> Near BD Market and Salt Lake Central Park gate.
              </p>
            </div>
          </div>

          {/* Graceful Degradation for Google Maps */}
          <div className="pt-2">
            {ENV.hasGoogleMaps ? (
              <a
                href={ENV.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button variant="primary" size="md" className="gap-2">
                  <Navigation className="w-4 h-4" />
                  <span>Open in Google Maps</span>
                </Button>
              </a>
            ) : (
              <div className="p-3.5 rounded-lg bg-slate-100 text-slate-600 text-xs border border-slate-200">
                <strong>Map Directions:</strong> Direct Google Maps pin will be published once clinic geolocation coordinates are confirmed. Please use the street address above for GPS transit.
              </div>
            )}
          </div>
        </Card>
      </Container>
    </>
  );
};
