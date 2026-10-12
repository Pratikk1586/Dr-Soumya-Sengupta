import React from 'react';
import { cn } from '../../utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  className,
  hoverable = false,
  padding = 'md',
  children,
  ...props
}) => {
  const paddingStyles = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={cn(
        'bg-white rounded-[16px] border border-[#D7E5E6] shadow-[0_2px_8px_-2px_rgba(11,46,58,0.05),0_10px_24px_-4px_rgba(11,46,58,0.04)] transition-all duration-200 ease-out',
        hoverable && 'hover:border-[#0E5A6B]/35 hover:shadow-[0_4px_16px_-2px_rgba(11,46,58,0.10),0_16px_36px_-6px_rgba(11,46,58,0.07)] hover:-translate-y-[2px]',
        paddingStyles[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
