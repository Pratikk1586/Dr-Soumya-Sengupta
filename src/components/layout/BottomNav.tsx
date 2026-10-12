import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageSquare, Calendar } from 'lucide-react';
import { getSafeWhatsAppHref } from '../../config/env';
import { getTelHref } from '../../lib/contact';
import { useLanguage } from '../../context/useLanguage';

export const BottomNav: React.FC = () => {
  const { isHindi } = useLanguage();
  const whatsappHref = getSafeWhatsAppHref('Hello Dr. Sengupta chamber desk, I would like to book a consultation.');
  const telHref = getTelHref('+916582256446');

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 w-full bg-[#FBF8F1]/95 backdrop-blur-md border-t border-[#E8E2D5] md:hidden shadow-[0_-8px_24px_rgba(27,42,38,0.08)] px-3 py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] overflow-hidden"
      aria-label="Mobile Quick Action Bar"
    >
      <div className="flex items-center justify-between gap-2 max-w-md mx-auto">
        {/* 1. Call */}
        <a
          href={telHref || 'tel:+916582256446'}
          className="flex-1 min-h-[44px] px-2 py-2 rounded-xl border border-[#E8E2D5] bg-white hover:bg-[#F5EFE6] text-[#1B2A26] flex items-center justify-center gap-1.5 text-xs font-bold active:scale-98 transition-all shadow-2xs"
          aria-label={isHindi ? 'क्लिनिक को कॉल करें' : 'Call Clinic'}
        >
          <Phone className="w-4 h-4 text-[#0F5C4A] shrink-0" aria-hidden="true" />
          <span>{isHindi ? 'कॉल' : 'Call'}</span>
        </a>

        {/* 2. WhatsApp */}
        <a
          href={whatsappHref || 'https://wa.me/919431114510'}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 min-h-[44px] px-2 py-2 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white flex items-center justify-center gap-1.5 text-xs font-bold active:scale-98 transition-all shadow-2xs"
          aria-label={isHindi ? 'व्हाट्सएप पर संपर्क करें' : 'Chat on WhatsApp'}
        >
          <MessageSquare className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>{isHindi ? 'व्हाट्सएप' : 'WhatsApp'}</span>
        </a>

        {/* 3. Book */}
        <Link
          to="/book-appointment"
          className="flex-1 min-h-[44px] px-2 py-2 rounded-xl bg-[#0F5C4A] hover:bg-[#0B4636] text-white flex items-center justify-center gap-1.5 text-xs font-bold active:scale-98 transition-all shadow-2xs"
          aria-label={isHindi ? 'अपॉइंटमेंट बुक करें' : 'Book Appointment'}
        >
          <Calendar className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>{isHindi ? 'बुक करें' : 'Book'}</span>
        </Link>
      </div>
    </nav>
  );
};
