import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { X, ChevronDown, Phone, MessageCircle, Bell } from 'lucide-react';
import { useLanguage } from '../../context/useLanguage';
import { NAVIGATION_ITEMS } from '../../config/navigation';
import { LanguageSwitcher } from '../common/LanguageSwitcher';
import { ENV, getSafePhoneHref, getSafeWhatsAppHref } from '../../config/env';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenNotices?: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose, onOpenNotices }) => {
  const { localize, t, isHindi } = useLanguage();
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
      className="fixed inset-0 z-[100] flex justify-end bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
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
        <div className="p-4 border-b border-[#E8E2D5] flex items-center justify-between bg-[#FBF8F1]">
          <Link to="/" onClick={onClose} className="flex items-center">
            <picture>
              <source type="image/webp" srcSet="/images/clinic-logo.webp" />
              <img
                src="/images/clinic-logo.png"
                alt="Dr. Soumya Sengupta's Diabetic Clinic"
                className="h-9 w-auto object-contain"
                width={106}
                height={36}
              />
            </picture>
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-[#4A5753] hover:text-[#1B2A26] hover:bg-[#E8F2EE] transition-colors cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Clinic Notices Quick Action */}
        <div className="p-3 bg-[#E8F2EE] border-b border-[#E8E2D5]">
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenNotices?.();
            }}
            className="w-full min-h-[44px] flex items-center justify-between px-3.5 py-2 rounded-xl bg-white border border-[#E8E2D5] text-xs font-bold text-[#0F5C4A] shadow-2xs hover:bg-[#F5EFE6] transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-[#0F5C4A]" />
              <span>{isHindi ? 'क्लिनिक सूचनाएं एवं समाचार' : 'Clinic Announcements & Notices'}</span>
            </span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B8862B] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#B8862B]"></span>
            </span>
          </button>
        </div>

        {/* Navigation Accordion List */}
        <nav className="flex-1 p-3 overflow-y-auto divide-y divide-[#E8E2D5]/60" aria-label="Mobile Navigation Menu">
          {NAVIGATION_ITEMS.map((item) => {
            const hasChildren = item.children && item.children.length > 0;
            const isExpanded = !!expandedSections[item.id];

            if (!hasChildren) {
              return (
                <div key={item.id} className="py-1">
                  <Link
                    to={item.href}
                    onClick={onClose}
                    className="min-h-[44px] flex items-center px-2.5 text-sm font-semibold text-[#1B2A26] hover:text-[#0F5C4A] hover:bg-[#E8F2EE] rounded-xl transition-colors"
                  >
                    {localize(item.name)}
                  </Link>
                </div>
              );
            }

            return (
              <div key={item.id} className="py-1">
                <div className="w-full flex items-center justify-between">
                  <Link
                    to={item.href}
                    onClick={onClose}
                    className="min-h-[44px] flex items-center px-2.5 text-sm font-semibold text-[#1B2A26] hover:text-[#0F5C4A] transition-colors flex-1"
                  >
                    {localize(item.name)}
                  </Link>
                  <button
                    type="button"
                    onClick={() => toggleSection(item.id)}
                    className="min-w-[44px] min-h-[44px] flex items-center justify-center text-[#4A5753] hover:text-[#0F5C4A] transition-colors cursor-pointer"
                    aria-label={`Toggle ${localize(item.name)} menu`}
                    aria-expanded={isExpanded}
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isExpanded ? 'rotate-180 text-[#0F5C4A]' : ''
                      }`}
                    />
                  </button>
                </div>

                {isExpanded && (
                  <div className="mt-1 pl-3.5 border-l-2 border-[#0F5C4A]/30 space-y-1 animate-in fade-in duration-150">
                    <Link
                      to={item.href}
                      onClick={onClose}
                      className="min-h-[40px] flex items-center px-2 text-xs font-bold text-[#0F5C4A] hover:underline"
                    >
                      {localize(item.name)} — Overview
                    </Link>
                    {item.children?.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        onClick={onClose}
                        className="min-h-[40px] flex items-center px-2 text-xs text-[#4A5753] hover:text-[#0F5C4A] hover:bg-[#E8F2EE] rounded-lg transition-colors"
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
        <div className="p-4 border-t border-[#E8E2D5] bg-[#FBF8F1] space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#E8E2D5]">
            <span className="text-xs font-semibold text-[#4A5753]">Language / भाषा:</span>
            <LanguageSwitcher variant="compact" />
          </div>

          <div className="space-y-2">
            <Link to="/book-appointment" onClick={onClose} className="block w-full">
              <button
                type="button"
                className="w-full min-h-[44px] px-4 py-2.5 rounded-full bg-[#0F5C4A] hover:bg-[#0B4636] text-white text-xs sm:text-sm font-semibold shadow-xs hover:shadow-md transition-all cursor-pointer whitespace-nowrap active:scale-[0.98]"
              >
                {t('cta.bookAppointment')}
              </button>
            </Link>

            <div className="grid grid-cols-2 gap-2">
              {ENV.hasPhone && phoneHref && (
                <a
                  href={phoneHref}
                  className="min-h-[44px] inline-flex items-center justify-center gap-1.5 p-2 rounded-xl border border-[#E8E2D5] bg-white text-xs font-semibold text-[#1B2A26] hover:bg-[#F5EFE6] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#0F5C4A]" />
                  <span>Call</span>
                </a>
              )}
              {ENV.hasWhatsapp && whatsappHref && (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] inline-flex items-center justify-center gap-1.5 p-2 rounded-xl border border-emerald-300 bg-[#25D366] text-xs font-semibold text-white hover:bg-[#1EBE5D] transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-white" />
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
