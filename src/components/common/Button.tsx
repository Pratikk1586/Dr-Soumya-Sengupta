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
        'bg-[#103F4A] text-white hover:bg-[#0a252f] active:bg-[#06181f] focus-visible:outline-[#103F4A] shadow-xs',
      secondary:
        'bg-[#EAF7FA] text-[#103F4A] hover:bg-[#d5f0f5] active:bg-[#c2e9f0] border border-[#65D9D0]/40 focus-visible:outline-[#103F4A]',
      outline:
        'border border-[#103F4A]/30 text-[#103F4A] bg-transparent hover:bg-[#EAF7FA]/60 active:bg-[#EAF7FA] focus-visible:outline-[#103F4A]',
      ghost:
        'text-[#103F4A] bg-transparent hover:bg-[#EAF7FA]/50 active:bg-[#EAF7FA] focus-visible:outline-[#103F4A]',
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
