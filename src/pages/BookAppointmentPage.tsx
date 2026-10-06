import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  ChevronRight,
  ChevronLeft,
  CalendarCheck,
  ShieldCheck,
  Stethoscope,
  Video,
} from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { Container } from '../components/common/Container';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { MedicalDisclaimerBanner } from '../components/common/MedicalDisclaimerBanner';
import { WhatsAppButton } from '../components/common/WhatsAppButton';
import { CallButton } from '../components/common/CallButton';
import { useLanguage } from '../context/useLanguage';
import { appointmentService } from '../services';

const appointmentFormSchema = z.object({
  patientType: z.enum(['new', 'followup'], {
    required_error: 'Please select whether you are a new or follow-up patient.',
  }),
  consultationType: z.enum(['in_clinic', 'telemedicine'], {
    required_error: 'Please select an in-clinic or telemedicine consultation mode.',
  }),
  preferredDate: z
    .string()
    .min(1, 'Please select a preferred consultation date.')
    .refine((val) => {
      const selected = new Date(val);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selected >= today;
    }, 'Preferred date cannot be in the past.'),
  preferredSlot: z.enum(['morning', 'afternoon', 'evening'], {
    required_error: 'Please choose a preferred consultation time window.',
  }),
  patientName: z
    .string()
    .min(2, 'Patient name must be at least 2 characters.')
    .max(80, 'Patient name cannot exceed 80 characters.'),
  phone: z
    .string()
    .min(10, 'Contact phone number must have at least 10 digits.')
    .max(16, 'Phone number format is too long.')
    .regex(/^(\+?[0-9\s-]{10,16})$/, 'Please enter a valid telephone or mobile number.'),
  email: z
    .string()
    .email('Please enter a valid email address.')
    .optional()
    .or(z.literal('')),
  reasonForVisit: z
    .string()
    .max(250, 'Brief note must not exceed 250 characters.')
    .optional()
    .or(z.literal('')),
  consent: z.literal(true, {
    errorMap: () => ({
      message: 'You must acknowledge the clinical appointment terms before submission.',
    }),
  }),
});

export type AppointmentFormData = z.infer<typeof appointmentFormSchema>;

export const BookAppointmentPage: React.FC = () => {
  const { isHindi } = useLanguage();
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [referenceId, setReferenceId] = useState<string>('');
  const [hasCopied, setHasCopied] = useState(false);

  // Tomorrow's date formatted as YYYY-MM-DD for min date picker
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateStr = tomorrow.toISOString().split('T')[0];

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    reset,
    formState: { errors },
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentFormSchema),
    mode: 'onTouched',
    defaultValues: {
      patientType: 'new',
      consultationType: 'in_clinic',
      preferredDate: minDateStr,
      preferredSlot: 'evening',
      patientName: '',
      phone: '',
      email: '',
      reasonForVisit: '',
      consent: true,
    },
  });

  const nextStep = async () => {
    let isValid = false;
    if (currentStep === 1) {
      isValid = await trigger(['patientType', 'consultationType']);
    } else if (currentStep === 2) {
      isValid = await trigger(['preferredDate', 'preferredSlot']);
    } else if (currentStep === 3) {
      isValid = await trigger(['patientName', 'phone', 'email', 'reasonForVisit', 'consent']);
    }

    if (isValid) {
      setCurrentStep((prev) => (Math.min(prev + 1, 4) as 1 | 2 | 3 | 4));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => (Math.max(prev - 1, 1) as 1 | 2 | 3 | 4));
  };

  const onSubmit = async (data: AppointmentFormData) => {
    setIsSubmitting(true);
    try {
      const res = await appointmentService.submitInquiry({
        patientName: data.patientName,
        phone: data.phone,
        email: data.email || undefined,
        patientType: data.patientType,
        consultationType: data.consultationType,
        preferredClinicId: 'clinic-salt-lake',
        preferredDate: data.preferredDate,
        preferredSlot: data.preferredSlot,
        reasonForVisit: data.reasonForVisit || undefined,
        consent: data.consent,
      });

      if (res.success && res.referenceId) {
        setReferenceId(res.referenceId);
      } else {
        setReferenceId(`SS-REQ-${Date.now().toString().slice(-6)}`);
      }
      setCurrentStep(5);
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyDetailsToClipboard = () => {
    const values = getValues();
    const details = [
      `Appointment Request Reference: ${referenceId}`,
      `Patient Name: ${values.patientName}`,
      `Type: ${values.patientType === 'followup' ? 'Follow-up' : 'First Visit'}`,
      `Mode: ${values.consultationType === 'telemedicine' ? 'Telemedicine' : 'In-Chamber'}`,
      `Preferred Date: ${values.preferredDate}`,
      `Preferred Slot: ${values.preferredSlot}`,
      `Contact Phone: ${values.phone}`,
    ].join('\n');

    navigator.clipboard.writeText(details).then(() => {
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2500);
    });
  };

  const resetForm = () => {
    reset();
    setCurrentStep(1);
    setReferenceId('');
    setHasCopied(false);
  };

  const formValues = getValues();

  return (
    <>
      <SEO
        title="Book Consultation — Dr. Soumya Sengupta Diabetology"
        description="Request an in-person or telemedicine consultation slot with Dr. Soumya Sengupta at the Salt Lake Chamber, Kolkata."
        canonicalPath="/book-appointment"
      />

      {/* Header Banner */}
      <div className="bg-[#faf9f6] border-b border-slate-200">
        <Container size="xl">
          <Breadcrumb items={[{ label: isHindi ? 'अपॉइंटमेंट अनुरोध' : 'Book Appointment' }]} />
          <div className="py-6 sm:py-10 max-w-3xl space-y-3">
            <Badge variant="primary">{isHindi ? 'ओपीडी स्लॉट अनुरोध' : 'Chamber Scheduling'}</Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#06181f] tracking-tight">
              {isHindi ? 'परामर्श समय आरक्षित करें' : 'Request a Clinical Appointment Slot'}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              {isHindi
                ? '3-चरणों में अपना पसंदीदा समय और जानकारी दर्ज करें। चेंबर डेस्क आपकी उपलब्धता की पुष्टि हेतु फोन अथवा व्हाट्सएप पर संपर्क करेगा।'
                : 'Complete our 3-step scheduling request. Our chamber desk will contact you via phone or WhatsApp to finalize your exact appointment slot.'}
            </p>
          </div>
        </Container>
      </div>

      <Container size="xl" className="py-10 sm:py-14 space-y-8 max-w-3xl">
        <MedicalDisclaimerBanner />

        {/* STEP PROGRESS INDICATOR (Steps 1 to 4) */}
        {currentStep < 5 && (
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-2">
              <span className="text-[#0f3d4a]">
                {isHindi ? `चरण ${currentStep} / 4` : `Step ${currentStep} of 4`}
              </span>
              <span>
                {currentStep === 1
                  ? isHindi
                    ? 'परामर्श प्रकार'
                    : 'Patient & Mode'
                  : currentStep === 2
                  ? isHindi
                    ? 'तिथि एवं समय'
                    : 'Date & Slot'
                  : currentStep === 3
                  ? isHindi
                    ? 'संपर्क विवरण'
                    : 'Contact Info'
                  : isHindi
                  ? 'समीक्षा एवं पुष्टि'
                  : 'Review & Submit'}
              </span>
            </div>
            {/* Visual Progress Bar */}
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#0f3d4a] transition-all duration-300 rounded-full"
                style={{ width: `${(currentStep / 4) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* STEP 5: PREPARED SUBMISSION RESULT (EXACT REQUIRED SPEC) */}
        {currentStep === 5 ? (
          <Card padding="lg" className="text-center space-y-6 animate-in fade-in zoom-in-95 duration-200 border-emerald-200 bg-emerald-50/40">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                {isHindi ? 'अनुरोध तैयार है' : 'Request Prepared'}
              </span>

              {/* Exact required sentence */}
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight max-w-lg mx-auto">
                Your appointment request has been prepared. Please contact the clinic to confirm availability.
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                {isHindi
                  ? 'कृपया ध्यान दें: यह स्लॉट सीधे क्लिनिक पुष्टि के बाद ही अंतिम माना जाएगा। त्वरित पुष्टि के लिए नीचे दिए गए व्हाट्सएप अथवा कॉल बटन का उपयोग करें।'
                  : 'Note: This request does not guarantee an immediate confirmed slot. Please connect with our clinic desk to finalize your time.'}
              </p>
            </div>

            {referenceId && (
              <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 font-mono text-xs font-bold text-slate-800 shadow-2xs">
                <span>{isHindi ? 'अनुरोध संदर्भ:' : 'Reference ID:'}</span>
                <span className="text-[#0f3d4a] text-sm">{referenceId}</span>
              </div>
            )}

            {/* Action Bar: WhatsApp, Call, Copy Details */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <WhatsAppButton
                variant="appointment"
                details={{
                  referenceId,
                  patientName: formValues.patientName,
                  patientType: formValues.patientType,
                  preferredDate: formValues.preferredDate,
                  preferredSlot: formValues.preferredSlot,
                  reason: formValues.reasonForVisit,
                }}
                size="md"
              >
                {isHindi ? 'व्हाट्सएप पर भेजें' : 'Send via WhatsApp'}
              </WhatsAppButton>

              <CallButton size="md" />

              <button
                type="button"
                onClick={copyDetailsToClipboard}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-2xs transition-colors cursor-pointer"
              >
                {hasCopied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700">{isHindi ? 'कॉपी हो गया!' : 'Copied!'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-500" />
                    <span>{isHindi ? 'विवरण कॉपी करें' : 'Copy Details'}</span>
                  </>
                )}
              </button>
            </div>

            <div className="pt-4 border-t border-slate-200/60">
              <Button variant="ghost" size="sm" onClick={resetForm}>
                {isHindi ? 'नया अपॉइंटमेंट अनुरोध भरें' : 'Submit Another Request'}
              </Button>
            </div>
          </Card>
        ) : (
          /* MULTI-STEP FORM WRAPPER */
          <Card padding="lg" className="space-y-6">
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              {/* STEP 1: PATIENT TYPE & MODE */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  <div className="border-b border-slate-100 pb-3">
                    <h2 className="text-base sm:text-lg font-bold text-slate-900">
                      {isHindi ? '1. मरीज का प्रकार एवं परामर्श का माध्यम' : '1. Patient Type & Consultation Mode'}
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {isHindi
                        ? 'कृपया चुनें कि यह पहला परामर्श है या फॉलो-अप समीक्षा।'
                        : 'Select whether this is your first visit or a follow-up consultation.'}
                    </p>
                  </div>

                  {/* Patient Type Radios */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      {isHindi ? 'परामर्श का प्रकार *' : 'Visit Type *'}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <label className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 hover:border-[#0f3d4a] cursor-pointer bg-slate-50/50 hover:bg-slate-50 transition-colors">
                        <input
                          type="radio"
                          value="new"
                          {...register('patientType')}
                          className="w-4 h-4 text-[#0f3d4a] focus:ring-[#0f3d4a]"
                        />
                        <div>
                          <p className="text-xs sm:text-sm font-bold text-slate-800">
                            {isHindi ? 'प्रथम परामर्श (New Patient)' : 'First Consultation (New Patient)'}
                          </p>
                          <p className="text-[11px] text-slate-500">
                            {isHindi ? 'विस्तृत 30-मिनट का ग्लूकोज मूल्यांकन' : 'Comprehensive 30-min evaluation'}
                          </p>
                        </div>
                      </label>

                      <label className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 hover:border-[#0f3d4a] cursor-pointer bg-slate-50/50 hover:bg-slate-50 transition-colors">
                        <input
                          type="radio"
                          value="followup"
                          {...register('patientType')}
                          className="w-4 h-4 text-[#0f3d4a] focus:ring-[#0f3d4a]"
                        />
                        <div>
                          <p className="text-xs sm:text-sm font-bold text-slate-800">
                            {isHindi ? 'फॉलो-अप समीक्षा (Follow-up)' : 'Follow-up Review'}
                          </p>
                          <p className="text-[11px] text-slate-500">
                            {isHindi ? 'पिछली रिपोर्ट एवं दवा समीक्षा' : 'Review recent HbA1c & prescription'}
                          </p>
                        </div>
                      </label>
                    </div>
                    {errors.patientType && (
                      <p className="text-xs text-rose-600 mt-1 flex items-center gap-1" role="alert">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.patientType.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Consultation Mode */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      {isHindi ? 'परामर्श का माध्यम *' : 'Consultation Mode *'}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <label className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 hover:border-[#0f3d4a] cursor-pointer bg-slate-50/50 hover:bg-slate-50 transition-colors">
                        <input
                          type="radio"
                          value="in_clinic"
                          {...register('consultationType')}
                          className="w-4 h-4 text-[#0f3d4a] focus:ring-[#0f3d4a]"
                        />
                        <div className="flex items-center gap-2">
                          <Stethoscope className="w-4 h-4 text-[#0f3d4a]" />
                          <div>
                            <p className="text-xs sm:text-sm font-bold text-slate-800">
                              {isHindi ? 'चेंबर परामर्श (Salt Lake)' : 'In-Chamber (Salt Lake)'}
                            </p>
                            <p className="text-[11px] text-slate-500">
                              {isHindi ? 'व्यक्तिगत शारीरिक जांच' : 'Physical in-person clinical examination'}
                            </p>
                          </div>
                        </div>
                      </label>

                      <label className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 hover:border-[#0f3d4a] cursor-pointer bg-slate-50/50 hover:bg-slate-50 transition-colors">
                        <input
                          type="radio"
                          value="telemedicine"
                          {...register('consultationType')}
                          className="w-4 h-4 text-[#0f3d4a] focus:ring-[#0f3d4a]"
                        />
                        <div className="flex items-center gap-2">
                          <Video className="w-4 h-4 text-[#0f3d4a]" />
                          <div>
                            <p className="text-xs sm:text-sm font-bold text-slate-800">
                              {isHindi ? 'ऑनलाइन वीडियो परामर्श' : 'Telemedicine (Video Call)'}
                            </p>
                            <p className="text-[11px] text-slate-500">
                              {isHindi ? 'दूरस्थ रोगी समीक्षा' : 'Remote secure clinical video consultation'}
                            </p>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: PREFERRED DATE & TIME SLOT */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  <div className="border-b border-slate-100 pb-3">
                    <h2 className="text-base sm:text-lg font-bold text-slate-900">
                      {isHindi ? '2. पसंदीदा तिथि एवं समय स्लॉट' : '2. Preferred Date & Time Slot'}
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {isHindi
                        ? 'अपनी सुविधानुसार संभावित परामर्श तिथि और समय विंडो का चयन करें।'
                        : 'Choose your desired consultation date and preferred time window.'}
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="preferredDate" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        {isHindi ? 'पसंदीदा तिथि *' : 'Preferred Date *'}
                      </label>
                      <div className="relative">
                        <input
                          id="preferredDate"
                          type="date"
                          min={minDateStr}
                          {...register('preferredDate')}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-900 focus:outline-2 focus:outline-[#0f3d4a]"
                        />
                      </div>
                      {errors.preferredDate && (
                        <p className="text-xs text-rose-600 mt-1 flex items-center gap-1" role="alert">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.preferredDate.message}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="preferredSlot" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        {isHindi ? 'पसंदीदा समय स्लॉट *' : 'Preferred Time Slot *'}
                      </label>
                      <select
                        id="preferredSlot"
                        {...register('preferredSlot')}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-900 focus:outline-2 focus:outline-[#0f3d4a]"
                      >
                        <option value="evening">
                          {isHindi ? 'संध्या ओपीडी (5:00 PM – 8:00 PM)' : 'Evening OPD (5:00 PM – 8:00 PM)'}
                        </option>
                        <option value="morning">
                          {isHindi ? 'प्रातः ओपीडी (10:00 AM – 1:00 PM)' : 'Morning OPD (10:00 AM – 1:00 PM)'}
                        </option>
                        <option value="afternoon">
                          {isHindi ? 'दोपहर स्लॉट (2:00 PM – 4:00 PM)' : 'Afternoon Slot (2:00 PM – 4:00 PM)'}
                        </option>
                      </select>
                      {errors.preferredSlot && (
                        <p className="text-xs text-rose-600 mt-1 flex items-center gap-1" role="alert">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.preferredSlot.message}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-sky-50 border border-sky-200 text-xs text-sky-900 flex items-start gap-2">
                    <Clock className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
                    <span>
                      {isHindi
                        ? 'नोट: चेंबर ओपीडी समय सोमवार से शनिवार शाम 5:00 बजे से रात 8:00 बजे तक रहता है। रविवार को अग्रिम अपॉइंटमेंट के आधार पर विशेष समय दिया जाता है।'
                        : 'Notice: Standard chamber consulting hours run Monday through Saturday, 5:00 PM – 8:00 PM. Sunday slots are reserved by prior arrangement.'}
                    </span>
                  </div>
                </div>
              )}

              {/* STEP 3: CONTACT INFORMATION & REASON */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  <div className="border-b border-slate-100 pb-3">
                    <h2 className="text-base sm:text-lg font-bold text-slate-900">
                      {isHindi ? '3. मरीज का संपर्क विवरण' : '3. Patient Contact & Details'}
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {isHindi
                        ? 'आवश्यक संपर्क जानकारी दर्ज करें ताकि क्लिनिक डेस्क समय की पुष्टि कर सके।'
                        : 'Provide accurate contact details so our reception can reach you.'}
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="patientName" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        {isHindi ? 'मरीज का पूरा नाम *' : 'Patient Full Name *'}
                      </label>
                      <div className="relative">
                        <input
                          id="patientName"
                          type="text"
                          inputMode="text"
                          autoComplete="name"
                          {...register('patientName')}
                          placeholder={isHindi ? 'उदा. अमित कुमार सरकार' : 'e.g. Ramesh Chandra Mukherjee'}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-900 focus:outline-2 focus:outline-[#0f3d4a]"
                        />
                      </div>
                      {errors.patientName && (
                        <p className="text-xs text-rose-600 mt-1 flex items-center gap-1" role="alert">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.patientName.message}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        {isHindi ? 'मोबाइल नंबर (कॉल / व्हाट्सएप) *' : 'Contact Phone (Mobile / WhatsApp) *'}
                      </label>
                      <div className="relative">
                        <input
                          id="phone"
                          type="tel"
                          inputMode="tel"
                          autoComplete="tel"
                          {...register('phone')}
                          placeholder="+91 98300 XXXXX"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-900 focus:outline-2 focus:outline-[#0f3d4a]"
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-xs text-rose-600 mt-1 flex items-center gap-1" role="alert">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.phone.message}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      {isHindi ? 'ईमेल पता (वैकल्पिक)' : 'Email Address (Optional)'}
                    </label>
                    <input
                      id="email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      {...register('email')}
                      placeholder="e.g. patient@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-900 focus:outline-2 focus:outline-[#0f3d4a]"
                    />
                    {errors.email && (
                      <p className="text-xs text-rose-600 mt-1 flex items-center gap-1" role="alert">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.email.message}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="reasonForVisit" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      {isHindi ? 'परामर्श का संक्षिप्त कारण (वैकल्पिक)' : 'Brief Reason for Visit (Optional)'}
                    </label>
                    <textarea
                      id="reasonForVisit"
                      rows={2}
                      maxLength={250}
                      {...register('reasonForVisit')}
                      placeholder={
                        isHindi
                          ? 'उदा. उच्च फास्टिंग शुगर, HbA1c समीक्षा या सीजीएम सेंसर लगाने की जानकारी।'
                          : 'e.g. High fasting glucose, HbA1c report review, or continuous glucose sensor inquiry.'
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-900 focus:outline-2 focus:outline-[#0f3d4a]"
                    />
                    <p className="text-[11px] text-slate-400 mt-1">
                      {isHindi
                        ? '⚠️ कृपया यहां विस्तृत मेडिकल रिपोर्ट या संवेदनशील इतिहास दर्ज न करें।'
                        : '⚠️ Do not include detailed medical history or laboratory reports.'}
                    </p>
                  </div>

                  {/* Privacy & Consent Affirmation */}
                  <div className="pt-2">
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        {...register('consent')}
                        className="w-4 h-4 rounded text-[#0f3d4a] focus:ring-[#0f3d4a] mt-0.5"
                      />
                      <span className="text-xs text-slate-600 leading-relaxed">
                        {isHindi
                          ? 'मैं समझता/समझती हूँ कि यह अनुरोध केवल चेंबर समय निर्धारण के लिए है और यह तत्काल आपातकालीन उपचार या प्रत्यक्ष नुस्खा नहीं है।'
                          : 'I understand this request is for chamber scheduling and does not constitute medical treatment or emergency triage.'}
                      </span>
                    </label>
                    {errors.consent && (
                      <p className="text-xs text-rose-600 mt-1 flex items-center gap-1" role="alert">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.consent.message}</span>
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 4: REVIEW & CONFIRM */}
              {currentStep === 4 && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  <div className="border-b border-slate-100 pb-3">
                    <h2 className="text-base sm:text-lg font-bold text-slate-900">
                      {isHindi ? '4. विवरण की समीक्षा एवं पुष्टि' : '4. Review Consultation Request'}
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {isHindi
                        ? 'अनुरोध सबमिट करने से पहले कृपया अपने विवरण की जांच कर लें।'
                        : 'Please review your choices before submitting to the clinic scheduling queue.'}
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5 space-y-4 text-xs sm:text-sm">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                      <div>
                        <span className="text-slate-500 block text-[11px] font-semibold uppercase tracking-wider">
                          {isHindi ? 'परामर्श प्रकार' : 'Consultation Mode'}
                        </span>
                        <span className="font-bold text-slate-900">
                          {formValues.patientType === 'followup' ? 'Follow-up Review' : 'First Consultation'} •{' '}
                          {formValues.consultationType === 'telemedicine' ? 'Telemedicine (Video Call)' : 'In-Chamber (Salt Lake)'}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="text-xs font-semibold text-[#0f3d4a] hover:underline cursor-pointer"
                      >
                        {isHindi ? 'बदलें' : 'Edit'}
                      </button>
                    </div>

                    <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                      <div>
                        <span className="text-slate-500 block text-[11px] font-semibold uppercase tracking-wider">
                          {isHindi ? 'पसंदीदा समय' : 'Requested Schedule'}
                        </span>
                        <span className="font-bold text-slate-900">
                          {formValues.preferredDate} ({formValues.preferredSlot.toUpperCase()} Slot)
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="text-xs font-semibold text-[#0f3d4a] hover:underline cursor-pointer"
                      >
                        {isHindi ? 'बदलें' : 'Edit'}
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-slate-500 block text-[11px] font-semibold uppercase tracking-wider">
                          {isHindi ? 'मरीज एवं संपर्क' : 'Patient & Contact'}
                        </span>
                        <span className="font-bold text-slate-900 block">
                          {formValues.patientName}
                        </span>
                        <span className="text-slate-600 block text-xs">
                          {formValues.phone} {formValues.email ? `• ${formValues.email}` : ''}
                        </span>
                        {formValues.reasonForVisit && (
                          <span className="text-slate-500 italic block text-xs mt-1">
                            "{formValues.reasonForVisit}"
                          </span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(3)}
                        className="text-xs font-semibold text-[#0f3d4a] hover:underline cursor-pointer"
                      >
                        {isHindi ? 'बदलें' : 'Edit'}
                      </button>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>
                      {isHindi
                        ? 'डेटा सुरक्षा: आपके विवरण केवल इस अपॉइंटमेंट अनुरोध के लिए उपयोग किए जाएंगे। कोई भी व्यक्तिगत मेडिकल डेटा ऑनलाइन सर्वर पर संग्रहीत नहीं होता।'
                        : 'Data minimization: No medical history or confidential lab reports are stored on public servers.'}
                    </span>
                  </div>
                </div>
              )}

              {/* NAVIGATION BUTTONS */}
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-3">
                {currentStep > 1 ? (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={prevStep}
                    disabled={isSubmitting}
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    <span>{isHindi ? 'पीछे' : 'Back'}</span>
                  </Button>
                ) : (
                  <div />
                )}

                {currentStep < 4 ? (
                  <Button type="button" variant="primary" size="md" onClick={nextStep}>
                    <span>{isHindi ? 'आगे बढ़ें' : 'Next Step'}</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    isLoading={isSubmitting}
                  >
                    <CalendarCheck className="w-4 h-4 mr-1.5" />
                    <span>{isHindi ? 'अनुरोध तैयार करें' : 'Prepare Consultation Request'}</span>
                  </Button>
                )}
              </div>
            </form>
          </Card>
        )}
      </Container>
    </>
  );
};
