import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Video, Calendar, ArrowRight } from 'lucide-react';
import { SEO } from '../../components/common/SEO';
import { Container } from '../../components/common/Container';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { useLanguage } from '../../context/useLanguage';

export const MediaHubPage: React.FC = () => {
  const { isHindi } = useLanguage();

  const mediaSections = [
    {
      titleEn: 'Photo Gallery',
      titleHi: 'छायाचित्र दीर्घा (फोटो)',
      descriptionEn: 'Inside the clinic: Consultation suites, patient waiting area, sensor application stations, and medical camps.',
      descriptionHi: 'क्लिनिक के दृश्य: परामर्श कक्ष, प्रतीक्षा लाउंज, सीजीएम सेंसर स्टेशन एवं स्वास्थ्य शिविर।',
      href: '/media/photos',
      icon: Camera,
      tagEn: 'Photos',
      tagHi: 'तस्वीरें',
    },
    {
      titleEn: 'Video Masterclasses',
      titleHi: 'शैक्षणिक वीडियो',
      descriptionEn: 'Doctor-guided video explanations on HbA1c, continuous glucose sensor usage, and everyday diabetes habits.',
      descriptionHi: 'डॉ. सौम्य सेनगुप्ता द्वारा समझाए गए वीडियो: HbA1c, सेंसर का सही उपयोग और दैनिक पोषण।',
      href: '/media/videos',
      icon: Video,
      tagEn: 'Videos',
      tagHi: 'वीडियो',
    },
    {
      titleEn: 'Events & Health Camps',
      titleHi: 'आयोजन एवं स्वास्थ्य शिविर',
      descriptionEn: 'Community prediabetes screening camps, foot care workshops, and regional RSSDI academic conferences.',
      descriptionHi: 'चाईबासा में आयोजित निःशुल्क जांच शिविर, डायबिटिक फुट कार्यशालाएं और राज्य स्तरीय सम्मेलन।',
      href: '/media/events',
      icon: Calendar,
      tagEn: 'Events',
      tagHi: 'शिविर व कार्यक्रम',
    },
  ];

  return (
    <>
      <SEO
        title="Media Gallery — Photos, Videos & Health Camps | Dr. Soumya Sengupta"
        description="Explore clinic photographs, educational video masterclasses, and community diabetes screening camps by Dr. Soumya Sengupta."
        canonicalPath="/media"
      />

      <div className="bg-[#faf9f6] border-b border-slate-200">
        <Container size="xl">
          <Breadcrumb items={[{ label: isHindi ? 'मीडिया' : 'Media' }]} />
          <div className="py-8 sm:py-12 max-w-3xl space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#0f3d4a]/10 text-[#0f3d4a] border border-[#0f3d4a]/20">
              <Camera className="w-3.5 h-3.5" />
              <span>{isHindi ? 'क्लिनिक मीडिया हब' : 'CLINIC MEDIA HUB'}</span>
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#06181f] tracking-tight leading-tight">
              {isHindi ? 'मीडिया एवं गतिविधियां' : 'Media, Gallery & Events'}
            </h1>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
              {isHindi
                ? 'क्लिनिक के छायाचित्र, डॉक्टर द्वारा प्रस्तुत शैक्षणिक वीडियो और सामुदायिक स्वास्थ्य शिविरों की झलकियां।'
                : 'A curated visual showcase of our clinical chambers, patient education videos, and community health screening initiatives.'}
            </p>
          </div>
        </Container>
      </div>

      <Container size="xl" className="py-12 space-y-12">
        <div className="grid md:grid-cols-3 gap-6">
          {mediaSections.map((sec, idx) => {
            const Icon = sec.icon;
            return (
              <Card
                key={idx}
                hoverable
                padding="lg"
                className="bg-white border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-[#dff0f4] text-[#0f3d4a] flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6 text-[#0f3d4a]" />
                    </div>
                    <Badge variant="neutral" size="sm">
                      {isHindi ? sec.tagHi : sec.tagEn}
                    </Badge>
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-slate-900 group-hover:text-[#0f3d4a] transition-colors">
                      {isHindi ? sec.titleHi : sec.titleEn}
                    </h2>
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {isHindi ? sec.descriptionHi : sec.descriptionEn}
                    </p>
                  </div>
                </div>

                <div className="pt-5 mt-5 border-t border-slate-100">
                  <Link
                    to={sec.href}
                    className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg bg-teal-50/70 text-[#0f3d4a] border border-teal-200/80 group-hover:bg-[#0f3d4a] group-hover:text-white group-hover:border-[#0f3d4a] shadow-2xs group-hover:shadow-md transition-all duration-200"
                  >
                    <span className="font-semibold text-xs sm:text-sm tracking-wide">
                      {isHindi ? 'देखें' : 'View Section'}
                    </span>
                    <span className="w-6 h-6 rounded-full bg-white text-[#0f3d4a] group-hover:bg-white/20 group-hover:text-white border border-teal-200/60 group-hover:border-white/30 flex items-center justify-center transition-all duration-200 group-hover:translate-x-1 shadow-2xs shrink-0">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </Container>
    </>
  );
};
