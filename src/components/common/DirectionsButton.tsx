import React from 'react';
import { Navigation } from 'lucide-react';
import { getDirectionsUrl } from '../../lib/maps';
import { useLanguage } from '../../context/useLanguage';

interface DirectionsButtonProps {
  destination?: string;
  className?: string;
  children?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export const DirectionsButton: React.FC<DirectionsButtonProps> = ({
  destination,
  className = '',
  children,
  size = 'md',
}) => {
  const { isHindi } = useLanguage();
  const url = getDirectionsUrl(destination);

  if (!url) return null;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold bg-[#0f3d4a] hover:bg-[#082229] text-white shadow-xs hover:shadow-md transition-all active:scale-98 ${
        size === 'sm' ? 'px-3 py-1.5 text-xs' : size === 'lg' ? 'px-6 py-3 text-base' : 'px-4 py-2.5 text-sm'
      } ${className}`}
    >
      <Navigation className="w-4 h-4 shrink-0" />
      <span>{children || (isHindi ? 'रास्ता देखें (Google Maps)' : 'Get Directions')}</span>
    </a>
  );
};
