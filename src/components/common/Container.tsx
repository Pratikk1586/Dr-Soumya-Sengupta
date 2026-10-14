import React from 'react';
import { cn } from '../../utils/cn';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

export const Container: React.FC<ContainerProps> = ({
  className,
  size = 'xl',
  children,
  ...props
}) => {
  const sizeStyles = {
    sm: 'max-w-3xl',
    md: 'max-w-5xl',
    lg: 'max-w-[1180px]',
    xl: 'max-w-[1360px]',
    '2xl': 'max-w-[1380px]',
    full: 'max-w-full',
  };

  return (
    <div className={cn('w-full mx-auto px-5 sm:px-7 lg:px-9 xl:px-10', sizeStyles[size], className)} {...props}>
      {children}
    </div>
  );
};
