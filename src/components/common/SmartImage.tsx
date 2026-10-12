import React, { useState } from 'react';
import { cn } from '../../utils/cn';
import { ImageOff } from 'lucide-react';

export interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  alt: string; // Required for WCAG 2.2 accessibility
  aspectRatio?: '16/9' | '4/3' | '1/1' | '3/2' | '3/4' | '4/5';
  fallbackSrc?: string;
}

export const SmartImage: React.FC<SmartImageProps> = ({
  src,
  alt,
  className,
  aspectRatio = '16/9',
  fallbackSrc,
  loading = 'lazy',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const aspectStyles = {
    '16/9': 'aspect-video',
    '4/3': 'aspect-4/3',
    '1/1': 'aspect-square',
    '3/2': 'aspect-3/2',
    '3/4': 'aspect-[3/4]',
    '4/5': 'aspect-[4/5]',
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-slate-100 rounded-lg',
        aspectStyles[aspectRatio],
        className
      )}
    >
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-slate-200 animate-pulse" aria-hidden="true" />
      )}

      {hasError ? (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-slate-50 text-slate-400 select-none"
          role="img"
          aria-label={alt}
        >
          <ImageOff className="w-8 h-8 mb-1.5 opacity-60" aria-hidden="true" />
          <span className="text-xs font-medium text-slate-500 line-clamp-2">{alt}</span>
        </div>
      ) : (
        <img
          src={src || fallbackSrc}
          alt={alt}
          loading={loading}
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            if (fallbackSrc && src !== fallbackSrc) {
              // Try fallback if available
              setHasError(false);
            } else {
              setHasError(true);
            }
          }}
          className={cn(
            'w-full h-full object-cover transition-opacity duration-300',
            isLoaded ? 'opacity-100' : 'opacity-0'
          )}
          {...props}
        />
      )}
    </div>
  );
};
