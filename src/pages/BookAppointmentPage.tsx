import React, { useState } from 'react';
import { Calendar, CheckCircle2, ShieldAlert } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { Container } from '../components/common/Container';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { MedicalDisclaimerBanner } from '../components/common/MedicalDisclaimerBanner';
import { useLanguage } from '../context/useLanguage';
import { appointmentService } from '../services';
import type { AppointmentRequest } from '../types';

export const BookAppointmentPage: React.FC = () => {
  const { localize, t } = useLanguage();

  const [formState, setFormState] = useState<AppointmentRequest>({
    patientName: '',
    phone: '',
    email: '',
    age: undefined,
    consultationType: 'in_clinic',
    preferredClinicId: 'clinic-salt-lake',
    preferredDate: '',
    preferredSlot: 'evening',
    reasonForVisit: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    success: boolean;
    referenceId?: string;
    message: { en: string; hi?: string };
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await appointmentService.submitInquiry(formState);
      setSubmissionResult(res);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="Book Consultation — Dr. Soumya Sengupta"
        description="Request an in-person or telemedicine consultation slot with Dr. Soumya Sengupta at the Salt Lake Chamber, Kolkata."
        canonicalPath="/book-appointment"
      />

      <div className="bg-[#faf9f6] border-b border-slate-200">
        <Container size="xl">
          <Breadcrumb items={[{ label: t('nav.bookAppointment') }]} />
          <div className="py-6 sm:py-10 max-w-3xl space-y-3">
            <Badge variant="primary">Chamber Booking</Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#06181f] tracking-tight">
              Request a Consultation Slot
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Submit your preferred date and slot. Our chamber appointment desk will contact you via phone or WhatsApp to finalize your exact appointment time.
            </p>
          </div>
        </Container>
      </div>

      <Container size="xl" className="py-12 space-y-10 max-w-4xl">
        <MedicalDisclaimerBanner />

        {submissionResult && submissionResult.success ? (
          <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4 animate-in fade-in duration-200">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-emerald-950">
              Consultation Request Recorded
            </h2>
            <p className="text-sm text-emerald-800 max-w-lg mx-auto leading-relaxed">
              {localize(submissionResult.message)}
            </p>
            {submissionResult.referenceId && (
              <div className="inline-block px-4 py-2 rounded-lg bg-white border border-emerald-300 font-mono text-xs font-bold text-emerald-900 shadow-2xs">
                Booking Reference: {submissionResult.referenceId}
              </div>
            )}
            <div className="pt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSubmissionResult(null);
                  setFormState({
                    patientName: '',
                    phone: '',
                    email: '',
                    age: undefined,
                    consultationType: 'in_clinic',
                    preferredClinicId: 'clinic-salt-lake',
                    preferredDate: '',
                    preferredSlot: 'evening',
                    reasonForVisit: '',
                  });
                }}
              >
                Submit Another Request
              </Button>
            </div>
          </div>
        ) : (
          <Card padding="lg" className="space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-slate-200">
              <Calendar className="w-5 h-5 text-[#0f3d4a]" />
              <h2 className="text-lg font-bold text-slate-900">Patient & Consultation Details</h2>
            </div>

            {submissionResult && !submissionResult.success && (
              <div className="p-3.5 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{localize(submissionResult.message)}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 text-xs sm:text-sm">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="patientName" className="block font-semibold text-slate-800 mb-1.5">
                    Patient Full Name *
                  </label>
                  <input
                    id="patientName"
                    type="text"
                    required
                    value={formState.patientName}
                    onChange={(e) => setFormState({ ...formState, patientName: e.target.value })}
                    placeholder="e.g. Ramesh Chandra Mukherjee"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white focus:outline-2 focus:outline-[#0f3d4a]"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block font-semibold text-slate-800 mb-1.5">
                    Contact Phone Number (Mobile) *
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    placeholder="+91 98300 XXXXX"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white focus:outline-2 focus:outline-[#0f3d4a]"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-5">
                <div>
                  <label htmlFor="age" className="block font-semibold text-slate-800 mb-1.5">
                    Patient Age
                  </label>
                  <input
                    id="age"
                    type="number"
                    min="1"
                    max="110"
                    value={formState.age ?? ''}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        age: e.target.value ? parseInt(e.target.value, 10) : undefined,
                      })
                    }
                    placeholder="e.g. 52"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white focus:outline-2 focus:outline-[#0f3d4a]"
                  />
                </div>

                <div>
                  <label htmlFor="consultationType" className="block font-semibold text-slate-800 mb-1.5">
                    Mode of Consultation
                  </label>
                  <select
                    id="consultationType"
                    value={formState.consultationType}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        consultationType: e.target.value as 'in_clinic' | 'telemedicine',
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white focus:outline-2 focus:outline-[#0f3d4a]"
                  >
                    <option value="in_clinic">In-Chamber (Salt Lake, Kolkata)</option>
                    <option value="telemedicine">Online / Video Consultation</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="preferredSlot" className="block font-semibold text-slate-800 mb-1.5">
                    Preferred Time Slot
                  </label>
                  <select
                    id="preferredSlot"
                    value={formState.preferredSlot}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        preferredSlot: e.target.value as 'morning' | 'afternoon' | 'evening',
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white focus:outline-2 focus:outline-[#0f3d4a]"
                  >
                    <option value="evening">Evening OPD (5:00 PM – 8:00 PM)</option>
                    <option value="morning">Morning OPD (Select Days)</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="reason" className="block font-semibold text-slate-800 mb-1.5">
                  Reason for Visit / Symptoms (Optional)
                </label>
                <textarea
                  id="reason"
                  rows={3}
                  value={formState.reasonForVisit}
                  onChange={(e) => setFormState({ ...formState, reasonForVisit: e.target.value })}
                  placeholder="e.g. High morning fasting sugars, reviewing HbA1c report, or CGM sensor application inquiry."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white focus:outline-2 focus:outline-[#0f3d4a]"
                />
              </div>

              <div className="pt-2 flex items-center justify-between flex-wrap gap-4 border-t border-slate-100">
                <span className="text-xs text-slate-500">
                  🔒 Privacy note: No sensitive medical files are stored online.
                </span>

                <Button type="submit" variant="primary" size="md" isLoading={isSubmitting}>
                  Submit Consultation Request
                </Button>
              </div>
            </form>
          </Card>
        )}
      </Container>
    </>
  );
};
