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
        'bg-[#0f3d4a] text-white hover:bg-[#0a252f] active:bg-[#06181f] focus-visible:outline-[#0f3d4a] shadow-xs',
      secondary:
        'bg-[#dff0f4] text-[#0a252f] hover:bg-[#c6e4ec] active:bg-[#b0d8e2] focus-visible:outline-[#0f3d4a]',
      outline:
        'border border-[#0f3d4a]/30 text-[#0f3d4a] bg-transparent hover:bg-[#0f3d4a]/5 active:bg-[#0f3d4a]/10 focus-visible:outline-[#0f3d4a]',
      ghost:
        'text-[#0f3d4a] bg-transparent hover:bg-slate-100 active:bg-slate-200 focus-visible:outline-[#0f3d4a]',
    };

    const sizeStyles = {
      sm: 'text-xs px-3 py-1.5 rounded-md gap-1.5 min-h-[32px]',
      md: 'text-sm px-4 py-2 rounded-md gap-2 min-h-[40px]',
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
