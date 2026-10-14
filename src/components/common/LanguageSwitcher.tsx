import React from 'react';
import { useLanguage } from '../../context/useLanguage';
import { Globe } from 'lucide-react';
import { cn } from '../../utils/cn';

interface LanguageSwitcherProps {
  variant?: 'pill' | 'minimal' | 'compact';
  theme?: 'light' | 'dark';
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = 'pill',
  theme = 'light',
  className,
}) => {
  const { language, setLanguage } = useLanguage();

  if (variant === 'compact') {
    return (
      <div
        className={cn(
          'inline-flex items-center rounded-lg border p-0.5 text-xs font-semibold shadow-2xs',
          theme === 'dark'
            ? 'border-white/20 bg-[#072F24]'
            : 'border-slate-200 bg-white',
          className
        )}
        role="group"
        aria-label="Language selection"
      >
        <button
          type="button"
          onClick={() => setLanguage('en')}
          className={cn(
            'px-2.5 py-1 min-h-[32px] min-w-[32px] rounded-md transition-colors cursor-pointer',
            language === 'en'
              ? 'bg-[#0F5C4A] text-white shadow-2xs'
              : theme === 'dark'
              ? 'text-white/75 hover:text-white'
              : 'text-slate-600 hover:text-slate-900'
          )}
          aria-pressed={language === 'en'}
          aria-label="EN - Switch to English"
          title="Switch to English"
        >
          EN
        </button>
        <button
          type="button"
          onClick={() => setLanguage('hi')}
          className={cn(
            'px-2.5 py-1 min-h-[32px] min-w-[32px] rounded-md transition-colors cursor-pointer font-devanagari',
            language === 'hi'
              ? 'bg-[#0F5C4A] text-white shadow-2xs'
              : theme === 'dark'
              ? 'text-white/75 hover:text-white'
              : 'text-slate-600 hover:text-slate-900'
          )}
          aria-pressed={language === 'hi'}
          aria-label="हिंदी - Switch to Hindi"
          title="हिन्दी में बदलें"
        >
          हिंदी
        </button>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#0F5C4A]/20 bg-white/90 text-xs font-medium text-slate-800 shadow-2xs backdrop-blur-xs',
        className
      )}
      role="group"
      aria-label="Language selection"
    >
      <Globe className="w-3.5 h-3.5 text-[#0F5C4A]" aria-hidden="true" />
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={cn(
          'px-2 py-1 min-h-[36px] rounded transition-colors font-semibold cursor-pointer',
          language === 'en'
            ? 'text-[#0F5C4A] underline decoration-2 underline-offset-4'
            : 'text-slate-500 hover:text-slate-800'
        )}
        aria-pressed={language === 'en'}
        aria-label="EN - Switch to English"
        title="Switch to English"
      >
        EN
      </button>
      <span className="text-slate-300" aria-hidden="true">
        |
      </span>
      <button
        type="button"
        onClick={() => setLanguage('hi')}
        className={cn(
          'px-2 py-1 min-h-[36px] rounded transition-colors font-semibold cursor-pointer font-devanagari',
          language === 'hi'
            ? 'text-[#0F5C4A] underline decoration-2 underline-offset-4'
            : 'text-slate-500 hover:text-slate-800'
        )}
        aria-pressed={language === 'hi'}
        aria-label="हिंदी - Switch to Hindi"
        title="हिन्दी में बदलें"
      >
        हिंदी
      </button>
    </div>
  );
};
