import React from 'react';
import { cn } from '../../utils/cn';

export interface SkipLinkProps {
  targetId?: string;
  className?: string;
  children?: React.ReactNode;
}

export const SkipLink: React.FC<SkipLinkProps> = ({
  targetId = 'main-content',
  className,
  children = 'Skip to main clinical content',
}) => {
  return (
    <a
      href={`#${targetId}`}
      className={cn(
        'sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100',
        'focus:px-4 focus:py-2.5 focus:rounded-md focus:bg-[#0f3d4a] focus:text-white',
        'focus:text-sm focus:font-semibold focus:shadow-lg focus:outline-2 focus:outline-offset-2 focus:outline-white',
        className
      )}
    >
      {children}
    </a>
  );
};
