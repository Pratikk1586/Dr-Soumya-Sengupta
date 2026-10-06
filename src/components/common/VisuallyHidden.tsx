import React from 'react';
import { cn } from '../../utils/cn';

export interface VisuallyHiddenProps extends React.HTMLAttributes<HTMLSpanElement> {
  as?: 'span' | 'div';
}

export const VisuallyHidden: React.FC<VisuallyHiddenProps> = ({
  as: Component = 'span',
  className,
  children,
  ...props
}) => {
  return (
    <Component
      className={cn('sr-only', className)}
      {...props}
    >
      {children}
    </Component>
  );
};
