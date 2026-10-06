import React from 'react';
import { Video as VideoIcon, Play } from 'lucide-react';
import { SEO } from '../../components/common/SEO';
import { Container } from '../../components/common/Container';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { MedicalDisclaimerBanner } from '../../components/common/MedicalDisclaimerBanner';
import { useLanguage } from '../../context/useLanguage';
import { useService } from '../../hooks/useService';
import { videoService } from '../../services';

export const VideosPage: React.FC = () => {
  const { localize, t } = useLanguage();
  const { data: videos } = useService(() => videoService.getVideos(), []);

  return (
    <>
      <SEO
        title="Educational Videos — Dr. Soumya Sengupta"
        description="Video guides demonstrating Continuous Glucose Monitoring (CGM) analytics and daily diabetic foot inspection routines."
        canonicalPath="/patient-resources/videos"
      />

      <div className="bg-[#faf9f6] border-b border-slate-200">
        <Container size="xl">
          <Breadcrumb
            items={[
              { label: t('nav.patientResources'), href: '/patient-resources' },
              { label: 'Videos' },
            ]}
          />
          <div className="py-6 sm:py-10 max-w-3xl space-y-3">
            <Badge variant="primary">Visual Education</Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#06181f] tracking-tight">
              Educational Videos & Demonstrations
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Practical video walkthroughs explaining diabetes self-care technologies, sensor care, and daily preventive routines.
            </p>
          </div>
        </Container>
      </div>

      <Container size="xl" className="py-12 space-y-12">
        <MedicalDisclaimerBanner />

        <div className="grid md:grid-cols-2 gap-6">
          {videos?.map((vid) => (
            <Card key={vid.id} padding="lg" className="space-y-4">
              <div className="relative aspect-video bg-slate-900 rounded-lg overflow-hidden flex items-center justify-center text-white">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center border border-white/40">
                  <Play className="w-6 h-6 text-white ml-0.5" />
                </div>
                <span className="absolute bottom-2 right-2 text-[10px] font-mono bg-black/70 px-2 py-0.5 rounded text-white">
                  {vid.durationMinutes} min
                </span>
              </div>

              <div>
                <Badge variant="neutral" size="sm" className="mb-2">
                  {localize(vid.category)}
                </Badge>
                <h2 className="text-base font-bold text-slate-900">{localize(vid.title)}</h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  {localize(vid.description)}
                </p>
              </div>

              <div className="pt-2 text-[11px] text-slate-400 flex items-center gap-1.5">
                <VideoIcon className="w-3.5 h-3.5" />
                <span>Video demo placeholder — full playback enabled in Phase 3</span>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </>
  );
};
