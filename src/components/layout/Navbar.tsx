import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Stethoscope, ChevronDown, Search, Menu } from 'lucide-react';
import { useLanguage } from '../../context/useLanguage';
import { NAVIGATION_ITEMS } from '../../config/navigation';
import { LanguageSwitcher } from '../common/LanguageSwitcher';
import { Button } from '../common/Button';
import { SearchModal } from './SearchModal';
import { MobileDrawer } from './MobileDrawer';
import { cn } from '../../utils/cn';

export const Navbar: React.FC = () => {
  const { localize, t } = useLanguage();
  const location = useLocation();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
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
        className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs transition-shadow"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Logo & Clinical Identity */}
          <Link
            to="/"
            className="flex items-center gap-3 shrink-0 group focus-visible:outline-2 focus-visible:outline-[#0f3d4a] rounded-lg p-1"
            aria-label="Dr. Soumya Sengupta Diabetology Home"
          >
            <div className="w-11 h-11 rounded-xl bg-[#0f3d4a] text-white flex items-center justify-center shadow-xs group-hover:bg-[#0a252f] transition-colors">
              <Stethoscope className="w-6 h-6 text-[#dff0f4]" aria-hidden="true" />
            </div>
            <div>
              <span className="block text-base sm:text-lg font-bold text-[#06181f] tracking-tight leading-snug">
                Dr. Soumya Sengupta
              </span>
              <span className="block text-xs font-medium text-slate-500">
                Consultant Diabetologist
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
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
                    className={({ isActive }) =>
                      cn(
                        'px-3 py-2 rounded-lg text-sm font-semibold transition-colors',
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
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    type="button"
                    onClick={() => setActiveDropdown(isOpen ? null : item.id)}
                    onKeyDown={(e) => handleDropdownKeyDown(e, item.id)}
                    className={cn(
                      'inline-flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer select-none',
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
                        'w-4 h-4 text-slate-400 transition-transform duration-150',
                        isOpen && 'rotate-180 text-[#0f3d4a]'
                      )}
                      aria-hidden="true"
                    />
                  </button>

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
                          {localize(item.name)} — Overview
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

          {/* Right Action Bar (Search, Language Switcher, CTA) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Open search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Language Switcher */}
            <LanguageSwitcher className="hidden sm:inline-flex" />

            {/* Desktop Booking CTA */}
            <Link to="/book-appointment" className="hidden sm:inline-block">
              <Button variant="primary" size="sm" className="font-semibold shadow-xs">
                {t('cta.bookAppointment')}
              </Button>
            </Link>

            {/* Mobile Hamburger Menu */}
            <button
              type="button"
              onClick={() => setIsMobileDrawerOpen(true)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors lg:hidden cursor-pointer"
              aria-label="Open mobile menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Modals & Overlays */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <MobileDrawer isOpen={isMobileDrawerOpen} onClose={() => setIsMobileDrawerOpen(false)} />
    </>
  );
};
