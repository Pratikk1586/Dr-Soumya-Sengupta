import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { Section } from '../common/Section';
import { Button } from '../common/Button';
import { WhatsAppButton } from '../common/WhatsAppButton';
import { CallButton } from '../common/CallButton';
import { useLanguage } from '../../context/useLanguage';

import { InlineAppointmentForm } from './InlineAppointmentForm';

export const AppointmentTeaserSection: React.FC = () => {
  const { isHindi } = useLanguage();

  const benefits = [
    {
      title: isHindi ? 'विस्तृत 30-मिनट समीक्षा' : 'Comprehensive 30-Min Assessment',
      desc: isHindi
        ? 'ग्लूकोज पैटर्न, पोषण संतुलन और अंग सुरक्षा की गहन समीक्षा।'
        : 'Detailed glycemic variability, metabolic risk, and lifestyle evaluation.',
    },
    {
      title: isHindi ? 'कम से कम प्रतीक्षा समय' : 'Minimal Waiting Times',
      desc: isHindi
        ? 'पूर्व स्लॉट आरक्षण से चेंबर में सुचारू परामर्श सुनिश्चित होता है।'
        : 'Scheduled consultation slots minimize waiting and prevent rush.',
    },
    {
      title: isHindi ? 'त्वरित पुष्टि व सहायता' : 'WhatsApp Slot Support',
      desc: isHindi
        ? 'अनुरोध के तुरंत बाद चेंबर डेस्क से समय निर्धारण व पुष्टि।'
        : 'Prompt coordination and booking guidance from our chamber desk.',
    },
  ];

  return (
    <Section
      eyebrow={isHindi ? 'ऑनलाइन ओपीडी शेड्यूलिंग' : 'Online OPD Scheduling Desk'}
      heading={isHindi ? 'परामर्श समय आरक्षित करें' : 'Consultation Scheduling & Slot Reservation'}
      lede={
        isHindi
          ? 'चाईबासा चेंबर ओपीडी — नीचे त्वरित फॉर्म भरें अथवा सीधे व्हाट्सएप/फोन से समय आरक्षित करें।'
          : 'Cardio Diabetic Clinic Chaibasa — fill the inline form below or book directly via WhatsApp / phone.'
      }
      containerSize="xl"
      className="bg-gradient-to-b from-white via-[#FCFEFF] to-[#EAF7FA]/40 border-b border-slate-200/80 py-10 sm:py-14 relative"
    >
      <div className="grid lg:grid-cols-12 gap-7 sm:gap-8 items-start">
        {/* Left Column: Practice Overview, Benefits & Single-Row Direct Actions */}
        <div className="lg:col-span-6 space-y-5">
          <div className="space-y-2.5">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              {isHindi
                ? 'डॉ. सौम्य सेनगुप्ता के साथ चेंबर अथवा ऑनलाइन परामर्श का समय चुनें'
                : 'Schedule an In-Chamber or Telemedicine Consultation with Dr. Soumya Sengupta'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {isHindi
                ? 'हमारे आसान अपॉइंटमेंट फॉर्म के माध्यम से अपना पसंदीदा दिन और समय चुनें। हमारी टीम आपके समय की पुष्टि हेतु संपर्क करेगी।'
                : 'Submit your preferred date, time slot, and clinical concern. Our chamber desk reviews requests promptly and confirms your appointment via phone or WhatsApp.'}
            </p>
          </div>

          <div className="space-y-3 pt-1">
            {benefits.map((b) => (
              <div key={b.title} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">{b.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* OPD Hours & Fee Banner */}
          <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
              <span className="flex items-center gap-1.5 text-[#103F4A]">
                <Clock className="w-3.5 h-3.5 text-[#103F4A]" />
                <span>{isHindi ? 'परामर्श समय:' : 'Consulting Hours:'}</span>
              </span>
              <span className="text-slate-600 font-normal">Mon–Sat: 10 AM – 2 PM & 5 PM – 8 PM</span>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-600 pt-1 border-t border-slate-100">
              <span>{isHindi ? 'परामर्श शुल्क:' : 'Standard Fee:'} <strong className="text-slate-900 font-semibold">₹1,000</strong></span>
              <Link to="/clinic/timings" className="text-[11px] text-[#103F4A] hover:underline font-semibold flex items-center gap-0.5">
                <span>{isHindi ? 'नियम व समय' : 'View Timings'}</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Action Row: Teal primary, Green WhatsApp, Outline Call aligned on one row */}
          <div className="pt-2 flex flex-wrap sm:flex-nowrap items-center gap-2.5">
            <Link to="/book-appointment" className="w-full sm:w-auto">
              <Button variant="primary" size="md" className="w-full bg-[#103F4A] hover:bg-[#0C323B] text-white shadow-xs">
                <Calendar className="w-4 h-4 mr-1.5" />
                <span>{isHindi ? 'ऑनलाइन फॉर्म' : 'Book Appointment'}</span>
              </Button>
            </Link>

            <WhatsAppButton variant="appointment" size="md" className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs" />

            <CallButton size="md" variant="outline" className="w-full sm:w-auto border border-[#103F4A]/40 text-[#103F4A] hover:bg-[#103F4A] hover:text-white" />
          </div>
        </div>

        {/* Right Column: Inline Appointment Request Form */}
        <div className="lg:col-span-6">
          <InlineAppointmentForm />
        </div>
      </div>
    </Section>
  );
};
