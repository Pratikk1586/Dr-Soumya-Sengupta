import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { X, ChevronDown, Stethoscope, Phone, MessageCircle } from 'lucide-react';
import { useLanguage } from '../../context/useLanguage';
import { NAVIGATION_ITEMS } from '../../config/navigation';
import { LanguageSwitcher } from '../common/LanguageSwitcher';
import { Button } from '../common/Button';
import { ENV, getSafePhoneHref, getSafeWhatsAppHref } from '../../config/env';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose }) => {
  const { localize, t } = useLanguage();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const phoneHref = getSafePhoneHref();
  const whatsappHref = getSafeWhatsAppHref('Hello, I would like to inquire about booking a consultation with Dr. Soumya Sengupta.');

  return (
    <div
      className="fixed inset-0 z-100 flex justify-end bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xs sm:max-w-sm bg-white h-[100dvh] shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-250"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-[#faf9f6]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0f3d4a] text-white flex items-center justify-center">
              <Stethoscope className="w-4 h-4 text-[#dff0f4]" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 leading-tight">Dr. Soumya Sengupta</p>
              <p className="text-[11px] text-slate-500">Diabetologist</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Accordion List */}
        <nav className="flex-1 p-4 overflow-y-auto divide-y divide-slate-100">
          {NAVIGATION_ITEMS.map((item) => {
            const hasChildren = item.children && item.children.length > 0;
            const isExpanded = !!expandedSections[item.id];

            if (!hasChildren) {
              return (
                <div key={item.id} className="py-2.5">
                  <Link
                    to={item.href}
                    onClick={onClose}
                    className="block text-sm font-semibold text-slate-800 hover:text-[#0f3d4a] transition-colors py-1"
                  >
                    {localize(item.name)}
                  </Link>
                </div>
              );
            }

            return (
              <div key={item.id} className="py-2.5">
                <button
                  type="button"
                  onClick={() => toggleSection(item.id)}
                  className="w-full flex items-center justify-between text-sm font-semibold text-slate-800 hover:text-[#0f3d4a] transition-colors py-1 cursor-pointer"
                  aria-expanded={isExpanded}
                >
                  <span>{localize(item.name)}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                      isExpanded ? 'rotate-180 text-[#0f3d4a]' : ''
                    }`}
                  />
                </button>

                {isExpanded && (
                  <div className="mt-2 pl-3 border-l-2 border-[#0f3d4a]/20 space-y-2 animate-in fade-in duration-150">
                    <Link
                      to={item.href}
                      onClick={onClose}
                      className="block text-xs font-semibold text-[#0f3d4a] hover:underline py-1"
                    >
                      {localize(item.name)} — Overview
                    </Link>
                    {item.children?.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        onClick={onClose}
                        className="block text-xs text-slate-600 hover:text-[#0f3d4a] py-1"
                      >
                        {localize(child.name)}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Drawer Footer Actions */}
        <div className="p-4 border-t border-slate-200 bg-[#faf9f6] space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <span className="text-xs font-semibold text-slate-500">Language / भाषा:</span>
            <LanguageSwitcher variant="compact" />
          </div>

          <div className="space-y-2">
            <Link to="/book-appointment" onClick={onClose} className="block w-full">
              <Button variant="primary" size="md" className="w-full">
                {t('cta.bookAppointment')}
              </Button>
            </Link>

            <div className="grid grid-cols-2 gap-2">
              {ENV.hasPhone && phoneHref && (
                <a
                  href={phoneHref}
                  className="inline-flex items-center justify-center gap-1.5 p-2 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#0f3d4a]" />
                  <span>Call</span>
                </a>
              )}
              {ENV.hasWhatsapp && whatsappHref && (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 p-2 rounded-lg border border-emerald-200 bg-emerald-50 text-xs font-semibold text-emerald-800 hover:bg-emerald-100 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-700" />
                  <span>WhatsApp</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
