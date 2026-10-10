import React, { useState } from 'react';
import { Calendar, MapPin, CheckCircle2, X, Maximize2 } from 'lucide-react';
import { SEO } from '../../components/common/SEO';
import { Container } from '../../components/common/Container';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { Card } from '../../components/common/Card';
import { useLanguage } from '../../context/useLanguage';
import { EVENTS_DATA } from '../../data/events';

export const MediaEventsPage: React.FC = () => {
  const { localize, isHindi } = useLanguage();
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  return (
    <>
      <SEO
        title="Events & Health Camps — Cardio Diabetic Clinic | Dr. Soumya Sengupta"
        description="Community diabetes screening camps, RSSDI academic conferences, and diabetic foot care workshops organized by Dr. Soumya Sengupta."
        canonicalPath="/media/events"
      />

      {/* Header */}
      <div className="bg-[#faf9f6] border-b border-slate-200">
        <Container size="xl">
          <Breadcrumb
            items={[
              { label: isHindi ? 'मीडिया' : 'Media', href: '/media' },
              { label: isHindi ? 'आयोजन एवं शिविर' : 'Events & Camps' },
            ]}
          />
          <div className="py-8 sm:py-12 max-w-3xl space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#0f3d4a]/10 text-[#0f3d4a] border border-[#0f3d4a]/20">
              <Calendar className="w-3.5 h-3.5" />
              <span>{isHindi ? 'क्लिनिक गतिविधियां' : 'CLINIC EVENTS & INITIATIVES'}</span>
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#06181f] tracking-tight leading-tight">
              {isHindi ? 'आयोजन, स्वास्थ्य शिविर एवं सम्मेलन' : 'Events, Health Camps & Conferences'}
            </h1>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
              {isHindi
                ? 'चाईबासा और पश्चिमी सिंहभूम में आयोजित निःशुल्क जांच शिविर, शैक्षणिक व्याख्यान और मरीज कार्यशालाएं।'
                : 'Community diabetes screenings, regional academic medical keynotes, and practical foot-care workshops.'}
            </p>
          </div>
        </Container>
      </div>

      <Container size="xl" className="py-12 space-y-12">
        <div className="space-y-8 max-w-4xl">
          {EVENTS_DATA.map((event) => (
            <Card key={event.id} padding="lg" className="bg-white border-slate-200 shadow-2xs space-y-6">
              <div className="grid md:grid-cols-12 gap-6 items-start">
                {/* Event Image */}
                <div className="md:col-span-5 relative rounded-xl overflow-hidden aspect-4/3 bg-slate-100 group">
                  <img
                    src={event.image}
                    alt={localize(event.title)}
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                    loading="lazy"
                  />
                  <button
                    type="button"
                    onClick={() => setLightboxImage(event.image)}
                    className="absolute top-2.5 right-2.5 bg-black/60 text-white p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    aria-label="Enlarge event image"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Event Details */}
                <div className="md:col-span-7 space-y-4">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 font-semibold">
                      <span className="inline-flex items-center gap-1 text-[#0f3d4a]">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{event.date}</span>
                      </span>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1 text-slate-600">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{localize(event.location)}</span>
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-slate-900 leading-snug">
                      {localize(event.title)}
                    </h2>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {localize(event.description)}
                  </p>

                  <div className="pt-2 border-t border-slate-100 space-y-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                      {isHindi ? 'मुख्य झलकियां:' : 'Key Highlights:'}
                    </span>
                    <div className="space-y-1 text-xs text-slate-700">
                      {event.keyHighlights.map((hl, i) => (
                        <div key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{localize(hl)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>

      {/* Simple Image Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            type="button"
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={lightboxImage}
            alt="Enlarged event photograph"
            className="max-h-[85vh] max-w-full rounded-xl object-contain shadow-2xl"
          />
        </div>
      )}
    </>
  );
};
