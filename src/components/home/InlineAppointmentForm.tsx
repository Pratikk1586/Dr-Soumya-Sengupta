import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Calendar,
  Clock,
  User,
  Phone as PhoneIcon,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';
import { Button } from '../common/Button';
import { WhatsAppButton } from '../common/WhatsAppButton';
import { CallButton } from '../common/CallButton';
import { useLanguage } from '../../context/useLanguage';
import { appointmentService } from '../../services';

const inlineAppointmentSchema = z.object({
  name: z
    .string()
    .min(2, 'Please enter patient name (minimum 2 letters).')
    .max(80, 'Name is too long.'),
  phone: z
    .string()
    .min(10, 'Please enter a valid 10-digit mobile number.')
    .max(16, 'Phone number format is too long.')
    .regex(/^(\+?[0-9\s-]{10,16})$/, 'Please enter a valid phone number.'),
  preferredDate: z
    .string()
    .min(1, 'Please select a preferred date.')
    .refine((val) => {
      const selected = new Date(val);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selected >= today;
    }, 'Date cannot be in the past.'),
  slot: z.enum(['Morning (10:00 AM – 2:00 PM)', 'Evening (5:00 PM – 8:00 PM)'], {
    errorMap: () => ({ message: 'Please select a preferred consultation slot.' }),
  }),
  concern: z
    .string()
    .min(3, 'Please mention your health concern or condition.')
    .max(150, 'Concern must be under 150 characters.'),
});

type InlineAppointmentData = z.infer<typeof inlineAppointmentSchema>;

export const InlineAppointmentForm: React.FC = () => {
  const { isHindi } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successData, setSuccessData] = useState<{
    referenceId: string;
    data: InlineAppointmentData;
  } | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Set default date to tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDateStr = tomorrow.toISOString().split('T')[0];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InlineAppointmentData>({
    resolver: zodResolver(inlineAppointmentSchema),
    defaultValues: {
      name: '',
      phone: '',
      preferredDate: defaultDateStr,
      slot: 'Morning (10:00 AM – 2:00 PM)',
      concern: '',
    },
  });

  const onSubmit = async (data: InlineAppointmentData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const res = await appointmentService.submitInquiry({
        patientName: data.name,
        phone: data.phone,
        preferredDate: data.preferredDate,
        preferredSlot: data.slot.includes('Morning') ? 'morning' : 'evening',
        reasonForVisit: data.concern,
      });

      if (res.success) {
        setSuccessData({
          referenceId: res.referenceId || `SS-${Date.now().toString().slice(-6)}`,
          data,
        });
      } else {
        const errorMsg = res.message ? (isHindi ? res.message.hi : res.message.en) : null;
        setSubmitError(errorMsg ?? 'Submission failed');
      }
    } catch {
      setSubmitError(isHindi ? 'तकनीकी त्रुटि। कृपया व्हाट्सएप या फोन से संपर्क करें।' : 'An error occurred. Please contact via WhatsApp or phone.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSuccessData(null);
    setSubmitError(null);
    reset();
  };

  if (successData) {
    return (
      <div className="bg-white rounded-2xl p-6 sm:p-7 border border-emerald-200/90 shadow-sm text-center space-y-4 animate-in fade-in zoom-in-95 duration-200">
        <div className="w-12 h-12 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
          <CheckCircle2 className="w-7 h-7" />
        </div>

        <div className="space-y-1">
          <span className="inline-block text-[11px] font-bold text-emerald-700 bg-emerald-100/70 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            {isHindi ? 'अनुरोध प्राप्त हुआ' : 'Request Received'}
          </span>
          <h4 className="text-lg font-bold text-slate-900">
            {isHindi ? 'परामर्श समय अनुरोध दर्ज हो गया है' : 'Appointment Slot Requested Successfully'}
          </h4>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            {isHindi
              ? `धन्यवाद ${successData.data.name}! हमारी चेंबर टीम आपके समय की पुष्टि हेतु ${successData.data.phone} पर शीघ्र संपर्क करेगी।`
              : `Thank you, ${successData.data.name}! Our chamber desk will contact you at ${successData.data.phone} to confirm your slot.`}
          </p>
        </div>

        {/* Confirmation Details Card */}
        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 text-left text-xs space-y-1.5 max-w-md mx-auto font-mono">
          <div className="flex justify-between text-slate-600">
            <span>Reference ID:</span>
            <span className="font-bold text-[#103F4A]">{successData.referenceId}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Preferred Date:</span>
            <span className="font-semibold text-slate-800">{successData.data.preferredDate}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Slot:</span>
            <span className="font-semibold text-slate-800">{successData.data.slot}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Concern:</span>
            <span className="font-semibold text-slate-800 truncate max-w-[200px]">{successData.data.concern}</span>
          </div>
        </div>

        {/* Aligned Actions Row in Success State */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="border-slate-300 text-slate-700 hover:bg-slate-100"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
            <span>{isHindi ? 'नया अनुरोध दर्ज करें' : 'Submit Another Request'}</span>
          </Button>

          <WhatsAppButton
            variant="appointment"
            size="sm"
            details={{
              patientName: successData.data.name,
              preferredDate: successData.data.preferredDate,
              preferredTime: successData.data.slot,
              reason: successData.data.concern,
            }}
          >
            {isHindi ? 'व्हाट्सएप पर पुष्टि करें' : 'Confirm on WhatsApp'}
          </WhatsAppButton>

          <CallButton size="sm" variant="outline" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200/90 shadow-sm space-y-4">
      <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h4 className="text-base font-bold text-slate-900">
            {isHindi ? 'त्वरित अपॉइंटमेंट अनुरोध' : 'Quick Consultation Request'}
          </h4>
          <p className="text-xs text-slate-500">
            {isHindi ? 'विवरण भरें — हमारा चेंबर फोन/व्हाट्सएप पर पुष्टि करेगा' : 'Fill details below — desk confirms via phone/WhatsApp'}
          </p>
        </div>
        <span className="text-[11px] font-semibold text-[#103F4A] bg-[#EAF7FA] px-2.5 py-0.5 rounded-full border border-[#65D9D0]/50">
          {isHindi ? 'प्रत्यक्ष बुकिंग' : 'Direct Booking'}
        </span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5" noValidate>
        {submitError && (
          <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{submitError}</span>
          </div>
        )}

        {/* 1. Name & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label htmlFor="inline-name" className="block text-xs font-semibold text-slate-700 mb-1">
              {isHindi ? 'मरीज का नाम' : 'Patient Name'} *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                id="inline-name"
                type="text"
                placeholder={isHindi ? 'उदा. राहुल शर्मा' : 'e.g. Rahul Sharma'}
                {...register('name')}
                className={`w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border ${
                  errors.name ? 'border-red-400 focus:ring-red-200' : 'border-slate-200 focus:border-[#103F4A] focus:ring-[#103F4A]/20'
                } focus:outline-none focus:ring-2 transition-all`}
              />
            </div>
            {errors.name && <p className="text-[11px] text-red-600 mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="inline-phone" className="block text-xs font-semibold text-slate-700 mb-1">
              {isHindi ? 'मोबाइल नंबर' : 'Phone Number'} *
            </label>
            <div className="relative">
              <PhoneIcon className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                id="inline-phone"
                type="tel"
                placeholder={isHindi ? 'उदा. 9876543210' : 'e.g. 9876543210'}
                {...register('phone')}
                className={`w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border ${
                  errors.phone ? 'border-red-400 focus:ring-red-200' : 'border-slate-200 focus:border-[#103F4A] focus:ring-[#103F4A]/20'
                } focus:outline-none focus:ring-2 transition-all`}
              />
            </div>
            {errors.phone && <p className="text-[11px] text-red-600 mt-1">{errors.phone.message}</p>}
          </div>
        </div>

        {/* 2. Date & Slot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label htmlFor="inline-date" className="block text-xs font-semibold text-slate-700 mb-1">
              {isHindi ? 'पसंदीदा तारीख' : 'Preferred Date'} *
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                id="inline-date"
                type="date"
                min={new Date().toISOString().split('T')[0]}
                {...register('preferredDate')}
                className={`w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border ${
                  errors.preferredDate ? 'border-red-400 focus:ring-red-200' : 'border-slate-200 focus:border-[#103F4A] focus:ring-[#103F4A]/20'
                } focus:outline-none focus:ring-2 transition-all`}
              />
            </div>
            {errors.preferredDate && <p className="text-[11px] text-red-600 mt-1">{errors.preferredDate.message}</p>}
          </div>

          <div>
            <label htmlFor="inline-slot" className="block text-xs font-semibold text-slate-700 mb-1">
              {isHindi ? 'समय स्लॉट' : 'Consulting Slot'} *
            </label>
            <div className="relative">
              <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <select
                id="inline-slot"
                {...register('slot')}
                className={`w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border bg-white ${
                  errors.slot ? 'border-red-400 focus:ring-red-200' : 'border-slate-200 focus:border-[#103F4A] focus:ring-[#103F4A]/20'
                } focus:outline-none focus:ring-2 transition-all`}
              >
                <option value="Morning (10:00 AM – 2:00 PM)">
                  {isHindi ? 'सुबह (10:00 AM – 2:00 PM)' : 'Morning (10:00 AM – 2:00 PM)'}
                </option>
                <option value="Evening (5:00 PM – 8:00 PM)">
                  {isHindi ? 'शाम (5:00 PM – 8:00 PM)' : 'Evening (5:00 PM – 8:00 PM)'}
                </option>
              </select>
            </div>
            {errors.slot && <p className="text-[11px] text-red-600 mt-1">{errors.slot.message}</p>}
          </div>
        </div>

        {/* 3. Primary Concern */}
        <div>
          <label htmlFor="inline-concern" className="block text-xs font-semibold text-slate-700 mb-1">
            {isHindi ? 'मुख्य समस्या या लक्षण' : 'Clinical Concern / Condition'} *
          </label>
          <div className="relative">
            <HelpCircle className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              id="inline-concern"
              type="text"
              placeholder={isHindi ? 'उदा. अनियंत्रित शुगर / थायरॉयड / नया परामर्श' : 'e.g. Uncontrolled HbA1c, Thyroid, Routine Review'}
              {...register('concern')}
              className={`w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border ${
                errors.concern ? 'border-red-400 focus:ring-red-200' : 'border-slate-200 focus:border-[#103F4A] focus:ring-[#103F4A]/20'
              } focus:outline-none focus:ring-2 transition-all`}
            />
          </div>
          {errors.concern && <p className="text-[11px] text-red-600 mt-1">{errors.concern.message}</p>}
        </div>

        {/* 4. Single-row Action Buttons: Teal primary, Green WhatsApp, Outline Call */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap sm:flex-nowrap items-center gap-2.5">
          {/* Teal Primary Submit */}
          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={isSubmitting}
            className="w-full sm:w-auto bg-[#103F4A] hover:bg-[#0C323B] text-white shrink-0 shadow-xs"
          >
            <span>{isSubmitting ? (isHindi ? 'भेजा जा रहा है...' : 'Submitting...') : (isHindi ? 'अपॉइंटमेंट स्लॉट भेजें' : 'Request Slot')}</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>

          {/* Green WhatsApp */}
          <WhatsAppButton
            variant="appointment"
            size="md"
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white shrink-0 shadow-xs"
          >
            <span>{isHindi ? 'व्हाट्सएप' : 'WhatsApp'}</span>
          </WhatsAppButton>

          {/* Outline Call */}
          <CallButton
            size="md"
            variant="outline"
            className="w-full sm:w-auto shrink-0 border border-[#103F4A]/40 text-[#103F4A] hover:bg-[#103F4A] hover:text-white"
          >
            <span>{isHindi ? 'कॉल क्लिनिक' : 'Call Clinic'}</span>
          </CallButton>
        </div>
      </form>
    </div>
  );
};
