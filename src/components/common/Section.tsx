import React from 'react';
import { cn } from '../../utils/cn';
import { Container } from './Container';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  eyebrow?: React.ReactNode;
  heading?: React.ReactNode;
  lede?: React.ReactNode;
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  headerAlign?: 'left' | 'center';
}

export const Section: React.FC<SectionProps> = ({
  className,
  eyebrow,
  heading,
  lede,
  containerSize = 'xl',
  headerAlign = 'left',
  children,
  ...props
}) => {
  const hasHeader = eyebrow || heading || lede;

  return (
    <section className={cn('py-12 md:py-16 lg:py-20', className)} {...props}>
      <Container size={containerSize}>
        {hasHeader && (
          <header
            className={cn(
              'mb-8 md:mb-12 max-w-3xl space-y-3',
              headerAlign === 'center' && 'mx-auto text-center'
            )}
          >
            {eyebrow && (
              <p className="text-xs font-bold uppercase tracking-wider text-[#103F4A] flex items-center gap-1.5 justify-start">
                {eyebrow}
              </p>
            )}
            {heading && (
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#06181f]">
                {heading}
              </h2>
            )}
            {lede && (
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                {lede}
              </p>
            )}
          </header>
        )}
        {children}
      </Container>
    </section>
  );
};
