import React from 'react';
import { cn } from '../../utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled,
      children,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none';

    const variantStyles = {
      primary:
        'bg-[#0E5A6B] text-white hover:bg-[#0B4856] active:bg-[#073843] hover:-translate-y-0.5 active:translate-y-0 shadow-xs hover:shadow-[0_4px_12px_rgba(14,90,107,0.22)] focus-visible:outline-[#0E5A6B]',
      secondary:
        'bg-[#E8F5F4] text-[#0E5A6B] hover:bg-[#D7E5E6] active:bg-[#C8DEE0] border border-[#D7E5E6] focus-visible:outline-[#0E5A6B]',
      outline:
        'border border-[#0E5A6B]/35 text-[#0E5A6B] bg-transparent hover:bg-[#E8F5F4] active:bg-[#D7E5E6] hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-[#0E5A6B]',
      ghost:
        'text-[#0E5A6B] bg-transparent hover:bg-[#E8F5F4]/60 active:bg-[#E8F5F4] focus-visible:outline-[#0E5A6B]',
    };

    const sizeStyles = {
      sm: 'text-xs px-3 py-2 rounded-md gap-1.5 min-h-[44px]',
      md: 'text-sm px-4 py-2.5 rounded-md gap-2 min-h-[44px]',
      lg: 'text-base px-6 py-3 rounded-lg gap-2.5 min-h-[48px]',
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {isLoading && (
          <span
            className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0"
            aria-hidden="true"
          />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
