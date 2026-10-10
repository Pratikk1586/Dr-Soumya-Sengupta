import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Stethoscope, ChevronDown, Search, Menu, Bell } from 'lucide-react';
import { useLanguage } from '../../context/useLanguage';
import { NAVIGATION_ITEMS } from '../../config/navigation';
import { LanguageSwitcher } from '../common/LanguageSwitcher';
import { Button } from '../common/Button';
import { SearchModal } from './SearchModal';
import { MobileDrawer } from './MobileDrawer';
import { ClinicNoticesModal } from '../notices/ClinicNoticesModal';
import { cn } from '../../utils/cn';

export const Navbar: React.FC = () => {
  const { localize, isHindi, t } = useLanguage();
  const location = useLocation();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isNoticesModalOpen, setIsNoticesModalOpen] = useState(false);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLElement>(null);

  // Close dropdown on route change without cascading renders
  const [prevPathname, setPrevPathname] = useState(location.pathname);
  if (prevPathname !== location.pathname) {
    setPrevPathname(location.pathname);
    setActiveDropdown(null);
  }

  // Handle global Escape key and search shortcuts (Cmd/Ctrl+K or /)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
      } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      } else if (
        e.key === '/' &&
        !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)
      ) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleMouseEnter = (id: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(id);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const handleDropdownKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveDropdown(activeDropdown === id ? null : id);
    } else if (e.key === 'Escape') {
      setActiveDropdown(null);
    }
  };

  return (
    <>
      <header
        ref={navRef}
        className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/70 shadow-2xs transition-shadow"
      >
        <div className="max-w-[1440px] w-full mx-auto px-3 sm:px-4 lg:px-5 xl:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 lg:gap-3">
          {/* Logo & Clinical Identity */}
          <Link
            to="/"
            className="flex items-center gap-2 sm:gap-3 shrink-0 group focus-visible:outline-2 focus-visible:outline-[#0f3d4a] rounded-lg p-0.5 sm:p-1"
          >
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-[#0f3d4a] shrink-0 text-white flex items-center justify-center shadow-xs group-hover:bg-[#0a252f] transition-colors">
              <Stethoscope className="w-4 h-4 sm:w-6 sm:h-6 text-[#dff0f4]" aria-hidden="true" />
            </div>
            <div className="shrink-0 min-w-0">
              <span className="block text-xs sm:text-sm md:text-base font-bold text-[#06181f] tracking-tight leading-snug">
                Dr. Soumya Sengupta
              </span>
              <span className="hidden sm:block text-[11px] sm:text-xs font-medium text-slate-500">
                Consultant Diabetologist
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-0.5 2xl:gap-1.5 shrink min-w-0" aria-label="Main Navigation">
            {NAVIGATION_ITEMS.map((item) => {
              const hasChildren = item.children && item.children.length > 0;
              const isCurrentSection =
                item.href === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(item.href);
              const isOpen = activeDropdown === item.id;

              if (!hasChildren) {
                return (
                  <NavLink
                    key={item.id}
                    to={item.href}
                    onClick={() => {
                      if (location.pathname === item.href) {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    className={({ isActive }) =>
                      cn(
                        'px-2 py-1.5 xl:px-2.5 xl:py-2 rounded-lg text-xs xl:text-[13px] 2xl:text-sm font-semibold transition-colors whitespace-nowrap',
                        isActive
                          ? 'text-[#0f3d4a] bg-[#dff0f4]/50'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                      )
                    }
                  >
                    {localize(item.name)}
                  </NavLink>
                );
              }

              return (
                <div
                  key={item.id}
                  className="relative flex items-center"
                  onMouseEnter={() => handleMouseEnter(item.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    to={item.href}
                    onClick={() => {
                      setActiveDropdown(null);
                      if (location.pathname === item.href) {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    onKeyDown={(e) => handleDropdownKeyDown(e, item.id)}
                    className={cn(
                      'inline-flex items-center gap-1 px-2 py-1.5 xl:px-2.5 xl:py-2 rounded-lg text-xs xl:text-[13px] 2xl:text-sm font-semibold transition-colors cursor-pointer select-none whitespace-nowrap',
                      isCurrentSection || isOpen
                        ? 'text-[#0f3d4a] bg-[#dff0f4]/50'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                    )}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                  >
                    <span>{localize(item.name)}</span>
                    <ChevronDown
                      className={cn(
                        'w-3.5 h-3.5 text-slate-400 transition-transform duration-150',
                        isOpen && 'rotate-180 text-[#0f3d4a]'
                      )}
                      aria-hidden="true"
                    />
                  </Link>

                  {/* Dropdown Panel */}
                  {isOpen && (
                    <div
                      className="absolute top-full left-0 mt-1 w-72 bg-white rounded-xl border border-slate-200/90 shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                      role="menu"
                      aria-label={localize(item.name)}
                    >
                      <div className="pb-1.5 mb-1.5 border-b border-slate-100 px-2.5 pt-1">
                        <Link
                          to={item.href}
                          onClick={() => setActiveDropdown(null)}
                          className="text-xs font-bold text-[#0f3d4a] hover:underline"
                          role="menuitem"
                        >
                          {item.id === 'nav-about'
                            ? (isHindi ? 'डॉक्टर परिचय — संपूर्ण विवरण' : 'Know Your Doctor — Overview')
                            : item.id === 'nav-patient-resources'
                            ? (isHindi ? 'रोगी संसाधन — संपूर्ण विवरण' : 'Patient Resources — Overview')
                            : item.id === 'nav-clinic'
                            ? (isHindi ? 'क्लिनिक व चेंबर — संपूर्ण विवरण' : 'Our Clinic — Overview')
                            : `${localize(item.name)} — Overview`}
                        </Link>
                      </div>

                      <div className="space-y-0.5">
                        {item.children?.map((sub) => (
                          <Link
                            key={sub.href}
                            to={sub.href}
                            onClick={() => setActiveDropdown(null)}
                            className="block p-2 rounded-lg hover:bg-slate-50 transition-colors text-left group"
                            role="menuitem"
                          >
                            <p className="text-xs font-semibold text-slate-800 group-hover:text-[#0f3d4a]">
                              {localize(sub.name)}
                            </p>
                            {sub.description && (
                              <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                                {localize(sub.description)}
                              </p>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right Action Bar (Notices Bell, Search, Language Switcher, CTA, Hamburger) */}
          <div className="flex items-center gap-1 sm:gap-2 xl:gap-2.5 shrink-0">
            {/* Single Clinic News & Notices Indicator Button (Visible on sm+ screens, mobile has it in drawer & hero) */}
            <button
              type="button"
              onClick={() => setIsNoticesModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-[#0f3d4a] hover:bg-teal-50 border border-teal-200/60 bg-white shadow-2xs transition-all cursor-pointer group shrink-0"
              title={isHindi ? 'क्लिनिक सूचनाएं' : 'Clinic Notices & Updates'}
              aria-label="Open clinic notices"
            >
              <Bell className="w-3.5 h-3.5 text-teal-600 group-hover:rotate-12 transition-transform" />
              <span className="hidden 2xl:inline font-semibold">
                {isHindi ? 'सूचनाएं' : 'Notices'}
              </span>
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
            </button>

            {/* Search Trigger */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="p-1.5 sm:p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
              aria-label="Open search"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Language Switcher - compact variant for clean navbar footprint */}
            <LanguageSwitcher variant="compact" className="shrink-0" />

            {/* Booking CTA Button (Visible on tablet & desktop) */}
            <Link to="/book-appointment" className="hidden sm:inline-block shrink-0">
              <Button
                variant="primary"
                size="sm"
                className="font-semibold shadow-xs whitespace-nowrap text-xs xl:text-sm px-3 py-1.5 xl:px-3.5 xl:py-2 shrink-0"
              >
                {t('cta.bookAppointment')}
              </Button>
            </Link>

            {/* Mobile & Tablet Hamburger Menu */}
            <button
              type="button"
              onClick={() => setIsMobileDrawerOpen(true)}
              className="p-1.5 sm:p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors xl:hidden cursor-pointer shrink-0"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Modals & Overlays */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <ClinicNoticesModal isOpen={isNoticesModalOpen} onClose={() => setIsNoticesModalOpen(false)} />
      <MobileDrawer
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
        onOpenNotices={() => setIsNoticesModalOpen(true)}
      />
    </>
  );
};
