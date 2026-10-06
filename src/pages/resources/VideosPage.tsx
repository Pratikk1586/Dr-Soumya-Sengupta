import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { SEO } from '../../components/common/SEO';
import { Container } from '../../components/common/Container';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { VideoFacade } from '../../components/common/VideoFacade';
import { MedicalDisclaimerBanner } from '../../components/common/MedicalDisclaimerBanner';
import { useLanguage } from '../../context/useLanguage';
import { useService } from '../../hooks/useService';
import { videoService } from '../../services';

export const VideosPage: React.FC = () => {
  const { localize, t } = useLanguage();
  const { data: videos, isLoading } = useService(() => videoService.getVideos(), []);

  return (
    <>
      <SEO
        title="Educational Videos & Masterclasses — Dr. Soumya Sengupta"
        description="Clinical video guides by Dr. Soumya Sengupta on understanding HbA1c, diabetes and lifestyle, glycemic spikes, and organ health awareness."
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
              Dr. Sengupta Explains — Video Masterclasses
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Practical video walkthroughs breaking down clinical endocrinology, sensor care, and lifestyle habits into clear, accessible patient lessons.
            </p>
          </div>
        </Container>
      </div>

      <Container size="xl" className="py-12 space-y-12">
        <MedicalDisclaimerBanner />

        {isLoading ? (
          <div className="py-16 text-center text-sm text-slate-500">
            Loading educational videos...
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {videos?.map((vid) => (
              <VideoFacade
                key={vid.id}
                youtubeId={vid.youtubeId}
                title={localize(vid.title)}
                description={localize(vid.description)}
                transcript={vid.transcript ? localize(vid.transcript) : undefined}
                durationMinutes={vid.durationMinutes}
              />
            ))}
          </div>
        )}

        {/* Clinical Consultation CTA */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-[#0f3d4a] to-[#08222a] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Have Questions After Watching?
            </h3>
            <p className="text-xs sm:text-sm text-teal-100 max-w-xl leading-relaxed">
              Video lessons provide general background education. To discuss how these insights apply to your personal lab reports and medication, book a consultation.
            </p>
          </div>
          <Link to="/book-appointment" className="shrink-0">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto shadow-md">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{t('cta.bookAppointment')}</span>
            </Button>
          </Link>
        </div>
      </Container>
    </>
  );
};
