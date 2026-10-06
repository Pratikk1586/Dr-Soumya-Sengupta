import React from 'react';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';
import { isValidGoogleMapsEmbedUrl, getGoogleMapsUrl, getDirectionsUrl } from '../../lib/maps';
import { useLanguage } from '../../context/useLanguage';

interface MapSectionProps {
  embedUrl?: string;
  mapsUrl?: string;
  address?: string;
  landmark?: string;
  className?: string;
  title?: string;
}

export const MapSection: React.FC<MapSectionProps> = ({
  embedUrl,
  mapsUrl,
  address = 'Salt Lake Sector 1 Chamber, Kolkata 700064',
  landmark = 'Near BD Market & Water Tank No. 4',
  className = '',
  title = 'Chamber Location & Directions',
}) => {
  const { isHindi } = useLanguage();
  const hasValidEmbed = isValidGoogleMapsEmbedUrl(embedUrl);
  const openMapsUrl = getGoogleMapsUrl(mapsUrl) || getDirectionsUrl(address);
  const directionsUrl = getDirectionsUrl(address);

  return (
    <div className={`overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs ${className}`}>
      {hasValidEmbed ? (
        <div className="relative w-full aspect-16/9 min-h-[320px]">
          <iframe
            src={embedUrl}
            title={title}
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      ) : (
        /* Styled Static Map Card Fallback */
        <div className="p-6 sm:p-8 bg-gradient-to-br from-slate-50 via-[#dff0f4]/20 to-slate-100 flex flex-col justify-between min-h-[280px]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0f3d4a]/10 text-[#0f3d4a] text-xs font-bold uppercase tracking-wider mb-4">
              <MapPin className="w-3.5 h-3.5" />
              <span>{isHindi ? 'परामर्श केंद्र का पता' : 'Physical Consultation Chamber'}</span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              {isHindi ? 'डॉ. सौम्य सेनगुप्ता डायबिटीज़ क्लिनिक' : 'Dr. Soumya Sengupta Diabetology Chamber'}
            </h3>

            <p className="mt-2 text-sm text-slate-700 font-medium leading-relaxed max-w-lg">
              {address}
            </p>

            {landmark && (
              <p className="mt-1 text-xs text-slate-500 flex items-center gap-1.5">
                <span className="font-semibold text-slate-600">{isHindi ? 'प्रमुख लैंडमार्क:' : 'Landmark:'}</span>
                <span>{landmark}</span>
              </p>
            )}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3 pt-4 border-t border-slate-200/60">
            {directionsUrl && (
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-[#0f3d4a] hover:bg-[#082229] text-white shadow-xs transition-all active:scale-98"
              >
                <Navigation className="w-4 h-4 shrink-0" />
                <span>{isHindi ? 'रास्ता देखें (Directions)' : 'Get Driving Directions'}</span>
              </a>
            )}

            {openMapsUrl && (
              <a
                href={openMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 transition-colors"
              >
                <ExternalLink className="w-4 h-4 shrink-0 text-slate-400" />
                <span>{isHindi ? 'गूगल मैप्स में खोलें' : 'Open in Google Maps'}</span>
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
