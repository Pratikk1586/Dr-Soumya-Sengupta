import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { Section } from '../common/Section';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { WhatsAppButton } from '../common/WhatsAppButton';
import { CallButton } from '../common/CallButton';
import { useLanguage } from '../../context/useLanguage';

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
      lede={isHindi}
      className="bg-gradient-to-b from-white to-slate-50/50"
    >
      <div className="grid lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Practice Overview & CTAs */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {isHindi
                ? 'डॉ. सौम्य सेनगुप्ता के साथ चेंबर अथवा ऑनलाइन परामर्श का समय चुनें'
                : 'Schedule an In-Chamber or Telemedicine Consultation with Dr. Soumya Sengupta'}
            </h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {isHindi
                ? 'हमारे आसान अपॉइंटमेंट फॉर्म के माध्यम से अपना पसंदीदा दिन और समय चुनें। हमारी टीम आपके समय की पुष्टि हेतु संपर्क करेगी।'
                : 'Use our simple appointment request form to submit your preferred date, time, and details. Our chamber desk confirms each slot directly via phone or WhatsApp.'}
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {benefits.map((b) => (
              <div key={b.title} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{b.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 flex flex-wrap items-center gap-3">
            <Link to="/book-appointment">
              <Button variant="primary" size="lg" className="shadow-md">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{isHindi ? 'अपॉइंटमेंट फॉर्म भरें' : 'Book Appointment Online'}</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>

            <WhatsAppButton variant="appointment" size="lg" />

            <CallButton size="lg" />
          </div>
        </div>

        {/* Right Column: Quick Chamber Logistics Card */}
        <div className="lg:col-span-5">
          <Card padding="lg" className="border-slate-200/90 shadow-md bg-white space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-[#0f3d4a]">
                <Clock className="w-5 h-5" />
                <h4 className="font-bold text-sm">
                  {isHindi ? 'चेंबर समय सारणी' : 'OPD Consulting Hours'}
                </h4>
              </div>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                {isHindi ? 'चाईबासा क्लिनिक' : 'Cardio Diabetic Clinic'}
              </span>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                <span className="font-medium text-slate-600">
                  {isHindi ? 'सोमवार – शनिवार' : 'Monday – Saturday'}
                </span>
                <span className="font-bold text-slate-900">10 AM – 2 PM & 5 PM – 8 PM</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                <span className="font-medium text-slate-600">
                  {isHindi ? 'रविवार' : 'Sunday'}
                </span>
                <span className="font-semibold text-amber-700">
                  {isHindi ? 'जांच शिविर / पूर्व अनुमति' : 'Screening Camps / Prior Booking'}
                </span>
              </div>
              <div className="flex justify-between items-center py-1.5">
                <span className="font-medium text-slate-600">
                  {isHindi ? 'परामर्श शुल्क' : 'Standard Fee'}
                </span>
                <span className="font-bold text-slate-900">₹1,000</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 text-center">
              <Link
                to="/clinic/timings"
                className="text-xs font-semibold text-[#0f3d4a] hover:underline inline-flex items-center gap-1"
              >
                <span>{isHindi ? 'विस्तृत ओपीडी नियम व जानकारी' : 'View Full Chamber Schedule & FAQ'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </Section>
  );
};
