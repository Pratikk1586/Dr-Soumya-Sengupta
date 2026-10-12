import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, Search, Menu, Calendar } from 'lucide-react';
import { useLanguage } from '../../context/useLanguage';
import { NAVIGATION_ITEMS } from '../../config/navigation';
import { LanguageSwitcher } from '../common/LanguageSwitcher';
import { SearchModal } from './SearchModal';
import { MobileDrawer } from './MobileDrawer';
import { ClinicNoticesModal } from '../notices/ClinicNoticesModal';
import { cn } from '../../utils/cn';
import { Container } from '../common/Container';

export const Navbar: React.FC = () => {
  const { localize, t } = useLanguage();
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

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        ref={navRef}
        className={cn(
          'sticky top-0 z-40 transition-all duration-200',
          isScrolled
            ? 'bg-[#FBF8F1]/90 backdrop-blur-md border-b border-[#E8E2D5] shadow-[0_4px_24px_rgba(27,42,38,0.06)] py-2 sm:py-2.5'
            : 'bg-[#FBF8F1]/95 backdrop-blur-sm border-b border-[#E8E2D5]/70 shadow-none py-3 sm:py-4'
        )}
      >
        <Container size="xl" className="flex items-center justify-between gap-3 lg:gap-4">
          {/* Logo & Clinical Identity */}
          <Link
            to="/"
            className="flex items-center gap-2.5 sm:gap-3 shrink-0 group focus-visible:outline-2 focus-visible:outline-[#0F5C4A] rounded-lg p-0.5"
          >
            {/* Circular Green & Gold Leaf Emblem */}
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-white via-[#FBF8F1] to-[#F5EFE6] border border-[#B8862B]/35 flex items-center justify-center shadow-xs shrink-0 relative overflow-hidden group-hover:border-[#B8862B] transition-colors">
              <svg
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-[#0F5C4A]"
                aria-hidden="true"
              >
                {/* Curved stem */}
                <path
                  d="M16 28 C16 20 18 12 24 8"
                  stroke="#B8862B"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                {/* Left Leaf (Deep Green) */}
                <path
                  d="M16 22 C10 20 7 14 11 9 C15 11 16 16 16 22 Z"
                  fill="#0F5C4A"
                />
                {/* Right Leaf (Warm Accent) */}
                <path
                  d="M16 17 C19 14 24 12 25 7 C21 7 17 11 16 17 Z"
                  fill="#B8862B"
                />
                {/* Small Center Sprout */}
                <circle cx="16" cy="7.5" r="2" fill="#0F5C4A" />
              </svg>
            </div>
            <div className="shrink-0 min-w-0">
              <span className="block text-sm sm:text-base lg:text-lg font-serif font-bold text-[#1B2A26] tracking-tight leading-none group-hover:text-[#0F5C4A] transition-colors">
                Dr. Soumya Sengupta
              </span>
              <span className="block text-[10px] sm:text-[11px] font-medium text-[#4A5753] tracking-tight mt-0.5 sm:mt-1">
                Diabetes • Thyroid • Metabolic Health
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 shrink-0" aria-label="Main Navigation">
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
                        'relative px-2.5 py-2 text-xs xl:text-[13.5px] font-medium transition-colors whitespace-nowrap',
                        isActive
                          ? 'text-[#0F5C4A] font-bold after:absolute after:bottom-0 after:left-2.5 after:right-2.5 after:h-0.5 after:bg-[#0F5C4A] after:rounded-full'
                          : 'text-[#4A5753] hover:text-[#0F5C4A]'
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
                      'relative inline-flex items-center gap-1 px-2.5 py-2 text-xs xl:text-[13.5px] font-medium transition-colors cursor-pointer select-none whitespace-nowrap',
                      isCurrentSection
                        ? 'text-[#0F5C4A] font-bold after:absolute after:bottom-0 after:left-2.5 after:right-2.5 after:h-0.5 after:bg-[#0F5C4A] after:rounded-full'
                        : 'text-[#4A5753] hover:text-[#0F5C4A]'
                    )}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                  >
                    <span>{localize(item.name)}</span>
                    <ChevronDown
                      className={cn(
                        'w-3 h-3 text-[#4A5753] transition-transform duration-150',
                        isOpen && 'rotate-180 text-[#0F5C4A]'
                      )}
                      aria-hidden="true"
                    />
                  </Link>

                  {/* Dropdown Panel: smooth rounded-2xl white card with soft shadow */}
                  {isOpen && (
                    <div
                      className="absolute top-full left-0 mt-1.5 w-72 bg-white rounded-2xl border border-[#E8E2D5] shadow-[0_12px_36px_rgba(27,42,38,0.12)] p-2.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                      role="menu"
                      aria-label={localize(item.name)}
                    >
                      <div className="pb-1.5 mb-1.5 border-b border-[#E8E2D5]/60 px-2.5 pt-1">
                        <Link
                          to={item.href}
                          onClick={() => setActiveDropdown(null)}
                          className="text-xs font-bold text-[#0F5C4A] hover:underline"
                          role="menuitem"
                        >
                          {localize(item.name)} — Overview
                        </Link>
                      </div>

                      <div className="space-y-0.5">
                        {item.children?.map((sub) => (
                          <Link
                            key={sub.href}
                            to={sub.href}
                            onClick={() => setActiveDropdown(null)}
                            className="block p-2 rounded-xl hover:bg-[#E8F2EE] transition-colors text-left group"
                            role="menuitem"
                          >
                            <p className="text-xs font-semibold text-[#1B2A26] group-hover:text-[#0F5C4A]">
                              {localize(sub.name)}
                            </p>
                            {sub.description && (
                              <p className="text-[11px] text-[#4A5753] line-clamp-1 mt-0.5">
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

          {/* Right Action Bar (Search, Language Switcher, Book Appointment CTA, Hamburger) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Search Trigger */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-full text-[#4A5753] hover:text-[#0F5C4A] hover:bg-[#E8F2EE] transition-colors cursor-pointer shrink-0"
              aria-label="Open search"
            >
              <Search className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
            </button>

            {/* Language Switcher */}
            <LanguageSwitcher variant="compact" className="shrink-0" />

            {/* Booking CTA Button (Deep green pill with calendar icon) */}
            <Link to="/book-appointment" className="hidden sm:inline-block shrink-0">
              <button
                type="button"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0F5C4A] hover:bg-[#0B4636] text-white text-xs sm:text-sm font-semibold shadow-xs hover:shadow-md transition-all cursor-pointer whitespace-nowrap active:scale-[0.98]"
              >
                <Calendar className="w-4 h-4 text-white" aria-hidden="true" />
                <span>{t('cta.bookAppointment')}</span>
              </button>
            </Link>

            {/* Mobile & Tablet Hamburger Menu */}
            <button
              type="button"
              onClick={() => setIsMobileDrawerOpen(true)}
              className="p-2 rounded-full text-[#1B2A26] hover:bg-[#E8F2EE] transition-colors lg:hidden cursor-pointer shrink-0"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </Container>
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
