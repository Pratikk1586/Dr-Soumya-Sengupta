import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { Container } from '../components/common/Container';
import { Button } from '../components/common/Button';
import { Stethoscope, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Page Not Found (404) — Dr. Soumya Sengupta"
        description="The requested page could not be found."
        noIndex={true}
      />

      <Container size="md" className="py-24 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-[#EAF7FA] text-[#103F4A] border border-[#65D9D0]/30 flex items-center justify-center mx-auto shadow-sm">
          <Stethoscope className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
            Error 404
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#06181f]">
            Clinical Page Not Found
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto leading-relaxed">
            The page or resource you requested may have moved or does not exist. Please use the navigation below to return to the practice home.
          </p>
        </div>

        <div className="pt-4 flex items-center justify-center gap-3">
          <Link to="/">
            <Button variant="primary" size="md" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Practice Home</span>
            </Button>
          </Link>
          <Link to="/contact">
            <Button variant="outline" size="md">
              Contact Reception
            </Button>
          </Link>
        </div>
      </Container>
    </>
  );
};
