import React, { useState } from 'react';
import { Play, Video, FileText, ChevronDown, ChevronUp } from 'lucide-react';

interface VideoFacadeProps {
  youtubeId?: string;
  title: string;
  description: string;
  transcript?: string;
  durationMinutes?: number;
  className?: string;
}

export const VideoFacade: React.FC<VideoFacadeProps> = ({
  youtubeId,
  title,
  description,
  transcript,
  durationMinutes,
  className = '',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);

  const hasVideoUrl = Boolean(youtubeId && youtubeId.trim().length > 0 && !youtubeId.includes('placeholder'));

  return (
    <div className={`rounded-2xl border border-slate-200/90 overflow-hidden bg-white shadow-xs ${className}`}>
      {/* Video Container / Facade */}
      <div className="relative aspect-video bg-gradient-to-br from-[#06181f] via-[#0f3d4a] to-[#041217] flex items-center justify-center overflow-hidden select-none">
        {isPlaying && hasVideoUrl ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            className="w-full h-full border-0"
          />
        ) : hasVideoUrl ? (
          <>
            {/* Lazy Thumbnail */}
            <img
              src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
              alt={title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover opacity-80 transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />

            {/* Click-to-load Play Button */}
            <button
              onClick={() => setIsPlaying(true)}
              aria-label={`Play educational video: ${title}`}
              className="relative z-10 w-16 h-16 rounded-full bg-white/90 hover:bg-white text-[#0f3d4a] flex items-center justify-center shadow-2xl transition-transform hover:scale-110 cursor-pointer focus:outline-none focus:ring-4 focus:ring-teal-400"
            >
              <Play className="w-7 h-7 ml-1 fill-current" />
            </button>

            {durationMinutes && (
              <span className="absolute bottom-3 right-3 bg-black/80 text-white text-[11px] font-semibold px-2 py-0.5 rounded-md">
                {durationMinutes} min
              </span>
            )}
          </>
        ) : (
          /* Placeholder State when no real YouTube ID is supplied */
          <div className="p-6 text-center text-teal-100 flex flex-col items-center justify-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-teal-300">
              <Video className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-300 block">
                Educational Video Series
              </span>
              <p className="text-sm font-semibold text-white mt-1">
                Studio Recording Scheduled
              </p>
              <p className="text-xs text-slate-300 max-w-sm mt-0.5">
                Full high-definition video masterclass will be published here following clinical review.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Description & Transcript Section */}
      <div className="p-5 sm:p-6 space-y-3">
        <h4 className="font-bold text-slate-900 text-base leading-snug">
          {title}
        </h4>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
          {description}
        </p>

        {transcript && (
          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => setShowTranscript((prev) => !prev)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0f3d4a] hover:underline cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{showTranscript ? 'Hide Educational Transcript' : 'View Educational Transcript'}</span>
              {showTranscript ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {showTranscript && (
              <div className="mt-3 p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 leading-relaxed max-h-48 overflow-y-auto">
                <p className="font-mono text-[11px] text-slate-500 uppercase tracking-wider mb-1">
                  Clinical Audio Transcript:
                </p>
                <p>{transcript}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
