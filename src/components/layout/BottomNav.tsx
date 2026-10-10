import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Activity, CalendarCheck, MessageCircle } from 'lucide-react';
import { cn } from '../../utils/cn';
import { getSafeWhatsAppHref } from '../../config/env';

export const BottomNav: React.FC = () => {
  const whatsappHref = getSafeWhatsAppHref('Hello Dr. Sengupta chamber desk, I would like to book a consultation.');

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 w-full max-w-full bg-white/95 backdrop-blur-md border-t border-slate-200/80 md:hidden shadow-lg pb-[env(safe-area-inset-bottom)] overflow-hidden"
      aria-label="Mobile Bottom Navigation"
    >
      <div className="grid grid-cols-4 h-15 items-center w-full max-w-md mx-auto">
        <NavLink
          to="/"
          className={({ isActive }) =>
            cn(
              'flex flex-col items-center justify-center h-full text-[10px] font-semibold transition-colors min-w-0 px-1 select-none',
              isActive ? 'text-[#0f3d4a]' : 'text-slate-500 hover:text-slate-800'
            )
          }
        >
          <Home className="w-5 h-5 mb-0.5 shrink-0" aria-hidden="true" />
          <span className="truncate">Home</span>
        </NavLink>

        <NavLink
          to="/diabetes-care"
          className={({ isActive }) =>
            cn(
              'flex flex-col items-center justify-center h-full text-[10px] font-semibold transition-colors min-w-0 px-1 select-none',
              isActive ? 'text-[#0f3d4a]' : 'text-slate-500 hover:text-slate-800'
            )
          }
        >
          <Activity className="w-5 h-5 mb-0.5 shrink-0" aria-hidden="true" />
          <span className="truncate">Services</span>
        </NavLink>

        <NavLink
          to="/book-appointment"
          className={({ isActive }) =>
            cn(
              'flex flex-col items-center justify-center h-full text-[10px] font-semibold transition-colors min-w-0 px-1 select-none',
              isActive ? 'text-[#0f3d4a]' : 'text-slate-500 hover:text-slate-800'
            )
          }
        >
          <CalendarCheck className="w-5 h-5 mb-0.5 shrink-0" aria-hidden="true" />
          <span className="truncate">Book</span>
        </NavLink>

        {whatsappHref ? (
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center h-full text-[10px] font-semibold text-emerald-700 hover:text-emerald-800 transition-colors min-w-0 px-1 select-none"
          >
            <MessageCircle className="w-5 h-5 mb-0.5 text-emerald-600 shrink-0" aria-hidden="true" />
            <span className="truncate">WhatsApp</span>
          </a>
        ) : (
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center justify-center h-full text-[10px] font-semibold transition-colors min-w-0 px-1 select-none',
                isActive ? 'text-[#0f3d4a]' : 'text-slate-500 hover:text-slate-800'
              )
            }
          >
            <MessageCircle className="w-5 h-5 mb-0.5 shrink-0" aria-hidden="true" />
            <span className="truncate">Contact</span>
          </NavLink>
        )}
      </div>
    </nav>
  );
};
