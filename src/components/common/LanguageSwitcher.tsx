import React from 'react';
import { useLanguage } from '../../context/useLanguage';
import { Globe } from 'lucide-react';
import { cn } from '../../utils/cn';

interface LanguageSwitcherProps {
  variant?: 'pill' | 'minimal' | 'compact';
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = 'pill',
  className,
}) => {
  const { language, setLanguage } = useLanguage();

  if (variant === 'compact') {
    return (
      <div
        className={cn(
          'inline-flex items-center rounded-lg border border-slate-200 bg-white p-0.5 text-xs font-semibold shadow-2xs',
          className
        )}
        role="group"
        aria-label="Language selection"
      >
        <button
          type="button"
          onClick={() => setLanguage('en')}
          className={cn(
            'px-2.5 py-1 rounded-md transition-colors cursor-pointer',
            language === 'en'
              ? 'bg-[#0f3d4a] text-white shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          )}
          aria-pressed={language === 'en'}
          aria-label="English"
          title="Switch to English"
        >
          EN
        </button>
        <button
          type="button"
          onClick={() => setLanguage('hi')}
          className={cn(
            'px-2.5 py-1 rounded-md transition-colors cursor-pointer font-devanagari',
            language === 'hi'
              ? 'bg-[#0f3d4a] text-white shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          )}
          aria-pressed={language === 'hi'}
          aria-label="हिंदी (Hindi)"
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
        'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#0f3d4a]/20 bg-white/90 text-xs font-medium text-slate-800 shadow-2xs backdrop-blur-xs',
        className
      )}
      role="group"
      aria-label="Language selection"
    >
      <Globe className="w-3.5 h-3.5 text-[#0f3d4a]" aria-hidden="true" />
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={cn(
          'px-1.5 py-0.5 rounded transition-colors font-semibold cursor-pointer',
          language === 'en'
            ? 'text-[#0f3d4a] underline decoration-2 underline-offset-4'
            : 'text-slate-500 hover:text-slate-800'
        )}
        aria-pressed={language === 'en'}
        aria-label="English"
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
          'px-1.5 py-0.5 rounded transition-colors font-semibold cursor-pointer font-devanagari',
          language === 'hi'
            ? 'text-[#0f3d4a] underline decoration-2 underline-offset-4'
            : 'text-slate-500 hover:text-slate-800'
        )}
        aria-pressed={language === 'hi'}
        aria-label="हिंदी (Hindi)"
        title="हिन्दी में बदलें"
      >
        हिंदी
      </button>
    </div>
  );
};
