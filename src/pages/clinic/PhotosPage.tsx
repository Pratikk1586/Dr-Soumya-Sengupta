import React, { useState, useEffect, useRef } from 'react';
import {
  Camera,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Calendar,
  Tag,
  Video as VideoIcon,
  Image as ImageIcon,
} from 'lucide-react';
import { SEO } from '../../components/common/SEO';
import { Container } from '../../components/common/Container';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { Badge } from '../../components/common/Badge';
import { Card } from '../../components/common/Card';
import { EmptyState } from '../../components/common/EmptyState';
import { VideoFacade } from '../../components/common/VideoFacade';
import { useLanguage } from '../../context/useLanguage';
import { useService } from '../../hooks/useService';
import {
  galleryService,
  type GalleryCategory,
  type GalleryItem,
} from '../../services';

const CATEGORIES: { id: GalleryCategory; labelEn: string; labelHi: string }[] = [
  { id: 'all', labelEn: 'All Media', labelHi: 'सभी मीडिया' },
  { id: 'clinic_photos', labelEn: 'Clinic Photos', labelHi: 'चेंबर फोटो' },
  { id: 'doctor_photos', labelEn: 'Doctor Photos', labelHi: 'डॉक्टर फोटो' },
  { id: 'events', labelEn: 'Events & Conferences', labelHi: 'सम्मेलन एवं कार्यक्रम' },
  { id: 'videos', labelEn: 'Video Masterclasses', labelHi: 'शैक्षणिक वीडियो' },
  { id: 'health_camps', labelEn: 'Health Camps', labelHi: 'स्वास्थ्य शिविर' },
  { id: 'activities', labelEn: 'Clinic Activities', labelHi: 'क्लिनिक गतिविधियां' },
];

export const PhotosPage: React.FC = () => {
  const { localize, isHindi, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>('all');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  // Fetch all gallery items from service
  const { data: rawItems } = useService(
    () => galleryService.getGalleryItems('all'),
    []
  );
  const allItems = rawItems || [];

  const filteredItems =
    selectedCategory === 'all'
      ? allItems
      : allItems.filter((item) => item.category === selectedCategory);

  const activeItem: GalleryItem | null =
    activeLightboxIndex !== null && filteredItems[activeLightboxIndex]
      ? filteredItems[activeLightboxIndex]
      : null;

  // Touch swipe handling for Lightbox
  const touchStartXRef = useRef<number | null>(null);

  const handleNext = React.useCallback(() => {
    if (activeLightboxIndex !== null && filteredItems.length > 0) {
      setActiveLightboxIndex((prev) =>
        prev !== null ? (prev + 1) % filteredItems.length : 0
      );
    }
  }, [activeLightboxIndex, filteredItems.length]);

  const handlePrev = React.useCallback(() => {
    if (activeLightboxIndex !== null && filteredItems.length > 0) {
      setActiveLightboxIndex((prev) =>
        prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : 0
      );
    }
  }, [activeLightboxIndex, filteredItems.length]);

  // Keyboard navigation inside lightbox
  useEffect(() => {
    if (activeLightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex, handleNext, handlePrev]);

  return (
    <>
      <SEO
        title="Chamber Photographs & Media Gallery — Dr. Soumya Sengupta"
        description="Comprehensive media gallery: consultation rooms, doctor keynotes, patient education activities, community diabetes health camps, and video masterclasses."
        canonicalPath="/clinic/photos"
      />

      {/* Header */}
      <div className="bg-gradient-to-b from-[#FCFEFF] via-[#F4FBFC] to-[#EAF7FA]/60 border-b border-slate-200/80 relative">
        <Container size="xl">
          <Breadcrumb
            items={[
              { label: t('nav.clinic'), href: '/clinic' },
              { label: isHindi ? 'फोटो व मीडिया गैलरी' : 'Media Gallery' },
            ]}
          />
          <div className="py-6 sm:py-10 max-w-3xl space-y-3">
            <Badge variant="primary">{isHindi ? 'क्लिनिक मीडिया गैलरी' : 'Visual Gallery'}</Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#06181f] tracking-tight">
              {isHindi ? 'चेंबर वातावरण, गतिविधियां एवं फोटो गैलरी' : 'Chamber Photographs & Clinical Activities'}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              {isHindi
                ? 'हमारे परामर्श चेंबर, डॉक्टर व्याख्यान, रोगी कार्यशालाओं और स्वास्थ्य शिविरों का दृश्य संग्रह।'
                : 'A visual archive of our patient-centered practice environment, academic lectures, sensor demonstration stations, and community health camps.'}
            </p>
          </div>
        </Container>
      </div>

      <Container size="xl" className="py-10 sm:py-14 space-y-8">
        {/* Category Filter Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none" role="tablist">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const count =
              cat.id === 'all'
                ? allItems.length
                : allItems.filter((i) => i.category === cat.id).length;

            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isSelected}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setActiveLightboxIndex(null);
                }}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#103F4A] text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-[#EAF7FA]/50 hover:text-[#103F4A] border border-slate-200'
                }`}
              >
                <span>{isHindi ? cat.labelHi : cat.labelEn}</span>
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Gallery Grid (Fixed aspect ratios, no CLS) */}
        {filteredItems.length === 0 ? (
          <EmptyState
            icon={<Camera className="w-8 h-8 text-slate-400" />}
            title={isHindi ? 'इस श्रेणी में अभी कोई फोटो नहीं है' : 'No items found in this category'}
            description={
              isHindi
                ? 'इस श्रेणी की तस्वीरें जल्द ही क्लिनिकल समीक्षा के बाद प्रकाशित की जाएंगी।'
                : 'Media items for this category are currently being curated and will be uploaded shortly.'
            }
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => {
              const isVideo = item.category === 'videos' || Boolean(item.youtubeId);
              return (
                <Card
                  key={item.id}
                  padding="none"
                  className="overflow-hidden border-slate-200 hover:border-[#65D9D0]/60 shadow-xs hover:shadow-md hover:shadow-[#103F4A]/5 transition-all group flex flex-col justify-between cursor-pointer"
                  onClick={() => setActiveLightboxIndex(index)}
                  tabIndex={0}
                  role="button"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveLightboxIndex(index);
                    }
                  }}
                >
                  <div className="space-y-3">
                    {/* Visual Container with fixed aspect ratio */}
                    <div
                      className={`relative w-full ${
                        item.aspectRatio === '16/9' ? 'aspect-16/9' : 'aspect-4/3'
                      } bg-gradient-to-br from-slate-100 via-slate-50 to-[#EAF7FA]/40 flex items-center justify-center overflow-hidden border-b border-slate-100`}
                    >
                      {item.thumbnailUrl && !isVideo ? (
                        <img
                          src={item.thumbnailUrl}
                          alt={localize(item.altText)}
                          className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      ) : null}

                      {/* Stylized Visual Mock/Placeholder (shows if video or image fallback) */}
                      <div className={`p-6 text-center select-none ${item.thumbnailUrl && !isVideo ? 'hidden' : 'block'}`}>
                        {isVideo ? (
                          <div className="w-12 h-12 rounded-full bg-[#103F4A] text-white flex items-center justify-center mx-auto shadow-md group-hover:scale-110 transition-transform">
                            <VideoIcon className="w-6 h-6 text-[#EAF7FA]" />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-xl bg-white/80 text-[#103F4A] flex items-center justify-center mx-auto shadow-xs border border-slate-200 group-hover:scale-105 transition-transform">
                            <ImageIcon className="w-6 h-6" />
                          </div>
                        )}
                        <span className="block mt-3 text-xs font-bold text-slate-800 line-clamp-1">
                          {localize(item.title)}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {isVideo ? (isHindi ? 'वीडियो मास्टरक्लास' : 'Video Masterclass') : (isHindi ? 'चेंबर फोटोग्राफ' : 'Chamber Photograph')}
                        </span>
                      </div>

                      {/* Hover action overlay badge */}
                      <div className="absolute top-3 right-3 bg-black/60 text-white p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Metadata Content */}
                    <div className="p-4 space-y-1.5">
                      <div className="flex items-center gap-2 text-[11px] font-bold text-[#103F4A] uppercase tracking-wider">
                        <Tag className="w-3 h-3" />
                        <span>{item.category.replace('_', ' ')}</span>
                      </div>
                      <h3 className="font-bold text-slate-900 text-sm tracking-tight leading-snug">
                        {localize(item.title)}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {localize(item.caption)}
                      </p>
                    </div>
                  </div>

                  {item.date && (
                    <div className="px-4 pb-3 pt-1 text-[11px] text-slate-600 font-medium flex items-center gap-1 border-t border-slate-50">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      <span>{item.date}</span>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        )}
      </Container>

      {/* ACCESSIBLE LIGHTBOX MODAL */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150"
          role="dialog"
          aria-modal="true"
          aria-label={localize(activeItem.title)}
          onClick={() => setActiveLightboxIndex(null)}
          onTouchStart={(e) => {
            touchStartXRef.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touchStartXRef.current !== null) {
              const diff = touchStartXRef.current - e.changedTouches[0].clientX;
              if (diff > 50) handleNext();
              if (diff < -50) handlePrev();
              touchStartXRef.current = null;
            }
          }}
        >
          <div
            className="relative w-full max-w-4xl bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex flex-col max-h-[92dvh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Toolbar */}
            <div className="flex items-center justify-between px-4 py-3 bg-black/40 border-b border-white/10 text-white shrink-0">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
                <span>
                  {activeLightboxIndex !== null ? activeLightboxIndex + 1 : 1} / {filteredItems.length}
                </span>
                <span className="text-slate-500">•</span>
                <span className="capitalize">{activeItem.category.replace('_', ' ')}</span>
              </div>

              <button
                type="button"
                onClick={() => setActiveLightboxIndex(null)}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Visual Display */}
            <div className="relative flex-1 bg-black flex items-center justify-center min-h-[300px] max-h-[60vh] overflow-hidden p-4">
              {activeItem.category === 'videos' && activeItem.youtubeId ? (
                <div className="w-full max-w-2xl aspect-16/9">
                  <VideoFacade
                    youtubeId={activeItem.youtubeId}
                    title={localize(activeItem.title)}
                    description={localize(activeItem.caption)}
                  />
                </div>
              ) : activeItem.fullUrl ? (
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src={activeItem.fullUrl}
                    alt={localize(activeItem.altText)}
                    className="max-h-[58vh] max-w-full w-auto object-contain rounded-lg shadow-lg"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              ) : (
                <div className="text-center p-8 text-white space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mx-auto">
                    <Camera className="w-8 h-8 text-[#EAF7FA]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{localize(activeItem.title)}</h3>
                    <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                      {localize(activeItem.altText)}
                    </p>
                  </div>
                </div>
              )}

              {/* Prev / Next Navigation Arrows */}
              {filteredItems.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white transition-colors cursor-pointer border border-white/10"
                    aria-label="Previous item"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white transition-colors cursor-pointer border border-white/10"
                    aria-label="Next item"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Bottom Caption & Alt text */}
            <div className="px-5 py-4 bg-slate-900 border-t border-white/10 text-white space-y-1 shrink-0">
              <h4 className="text-sm font-bold tracking-tight">{localize(activeItem.title)}</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{localize(activeItem.caption)}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
