import React from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, UserRound, Users, ArrowRight } from 'lucide-react';
import { Container } from '../common/Container';
import { useLanguage } from '../../context/useLanguage';

export const QuickLinksStrip: React.FC = () => {
  const { isHindi } = useLanguage();

  const links = [
    {
      id: 'clinic-info',
      icon: Stethoscope,
      title: isHindi ? 'क्लिनिक विवरण एवं समय' : 'Clinic Information',
      description: isHindi ? 'स्थान, समय सारणी एवं सुविधाएं' : 'Location, timings, facilities',
      href: '/clinic',
    },
    {
      id: 'about-doctor',
      icon: UserRound,
      title: isHindi ? 'डॉ. सौम्य सेनगुप्ता परिचय' : 'About Dr. Soumya Sengupta',
      description: isHindi ? 'योग्यताएं, अनुभव एवं दृष्टिकोण' : 'Qualifications, experience, approach',
      href: '/about',
    },
    {
      id: 'patient-resources',
      icon: Users,
      title: isHindi ? 'मरीज स्वास्थ्य संसाधन' : 'Patient Resources',
      description: isHindi ? 'गाइड्स, अक्सर पूछे जाने वाले सवाल' : 'Guides, FAQs, educational material',
      href: '/patient-resources',
    },
  ];

  return (
    <div className="relative z-20 -mt-6 sm:-mt-8 lg:-mt-10 xl:-mt-12 mb-8 sm:mb-12">
      <Container size="xl">
        <div className="bg-white/95 backdrop-blur-md rounded-[28px] border border-[#E8E2D5] shadow-[0_16px_40px_rgba(27,42,38,0.07)] grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#E8E2D5]/80 overflow-hidden">
          {links.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                to={item.href}
                className="group flex items-center justify-between p-5 sm:p-5.5 lg:p-6 hover:bg-[#FBF8F1]/60 transition-all duration-200"
              >
                <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                  {/* Circular Pale-Green Icon Container */}
                  <div className="w-11.5 h-11.5 sm:w-12 sm:h-12 rounded-full bg-[#E8F2EE] border border-[#0F5C4A]/15 flex items-center justify-center text-[#0F5C4A] shrink-0 group-hover:scale-105 transition-transform duration-200">
                    <Icon className="w-5 h-5 text-[#0F5C4A]" aria-hidden="true" />
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-serif font-bold text-base sm:text-[17px] text-[#102D2D] group-hover:text-[#0F5C4A] transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-[#4A5753] mt-0.5 line-clamp-1">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Circular Arrow Button */}
                <div className="w-8 h-8 rounded-full border border-[#E8E2D5] bg-white flex items-center justify-center text-[#4A5753] group-hover:border-[#0F5C4A] group-hover:bg-[#0F5C4A] group-hover:text-white transition-all shrink-0 ml-3 shadow-2xs">
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default QuickLinksStrip;
