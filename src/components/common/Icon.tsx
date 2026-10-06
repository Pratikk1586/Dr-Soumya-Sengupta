import React from 'react';
import { cn } from '../../utils/cn';

export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  label?: string; // If provided, icon acts as an accessible graphic
}

export const Icon: React.FC<IconProps> = ({
  icon: IconComponent,
  size = 'md',
  label,
  className,
  ...props
}) => {
  const sizeStyles = {
    xs: 'w-3.5 h-3.5',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8',
  };

  if (label) {
    return (
      <span
        role="img"
        aria-label={label}
        className={cn('inline-flex items-center justify-center shrink-0', className)}
        {...props}
      >
        <IconComponent className={sizeStyles[size]} aria-hidden="true" />
      </span>
    );
  }

  return (
    <span
      aria-hidden="true"
      className={cn('inline-flex items-center justify-center shrink-0', className)}
      {...props}
    >
      <IconComponent className={sizeStyles[size]} aria-hidden="true" />
    </span>
  );
};
