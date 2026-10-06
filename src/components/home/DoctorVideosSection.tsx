import React from 'react';
import { Link } from 'react-router-dom';
import { Video, ArrowRight } from 'lucide-react';
import { Section } from '../common/Section';
import { Button } from '../common/Button';
import { VideoFacade } from '../common/VideoFacade';
import { useLanguage } from '../../context/useLanguage';
import { useService } from '../../hooks/useService';
import { videoService } from '../../services';

export const DoctorVideosSection: React.FC = () => {
  const { localize, language } = useLanguage();
  const { data: videos, isLoading } = useService(() => videoService.getVideos(), []);

  const displayedVideos = videos?.slice(0, 2) || [];

  return (
    <Section
      eyebrow="Clinical Video Masterclasses"
      heading="Dr. Sengupta Explains"
      lede="Engaging, physician-led video explanations breaking down complex metabolic biochemistry into actionable everyday patient insights."
      containerSize="xl"
      className="bg-[#faf9f6] border-b border-slate-200/80"
    >
      {isLoading ? (
        <div className="py-12 text-center text-sm text-slate-500">Loading educational videos...</div>
      ) : (
        <div className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            {displayedVideos.map((vid) => (
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

          <div className="text-center pt-2">
            <Link to="/patient-resources/videos">
              <Button variant="outline" size="md">
                <Video className="w-4 h-4 mr-2" />
                <span>
                  {language === 'hi'
                    ? 'सभी 5 वीडियो मास्टरक्लास देखें'
                    : 'Watch All 5 Video Masterclasses'}
                </span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>
      )}
    </Section>
  );
};
