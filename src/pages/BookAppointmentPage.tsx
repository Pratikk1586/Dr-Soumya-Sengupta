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
  Calendar,
  User,
  Phone,
  FileText,
  MessageSquare,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { Container } from '../components/common/Container';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { MedicalDisclaimerBanner } from '../components/common/MedicalDisclaimerBanner';
import { CallButton } from '../components/common/CallButton';
import { useLanguage } from '../context/useLanguage';
import { appointmentService } from '../services';
import { buildWhatsAppUrl } from '../lib/whatsapp';

const appointmentFormSchema = z.object({
  patientName: z
    .string()
    .min(2, 'Please enter the patient full name (at least 2 characters).')
    .max(80, 'Patient name cannot exceed 80 characters.'),
  phone: z
    .string()
    .min(10, 'Contact phone number must have at least 10 digits.')
    .max(16, 'Phone number format is too long.')
    .regex(/^(\+?[0-9\s-]{10,16})$/, 'Please enter a valid telephone or mobile number.'),
  age: z
    .string()
    .max(3, 'Please enter a valid age.')
    .refine(
      (val) => !val || (parseInt(val, 10) >= 1 && parseInt(val, 10) <= 120),
      'Age must be between 1 and 120.'
    )
    .optional()
    .or(z.literal('')),
  reasonForVisit: z
    .string()
    .max(250, 'Brief reason must not exceed 250 characters.')
    .optional()
    .or(z.literal('')),
  preferredDate: z
    .string()
    .min(1, 'Please select a preferred date.')
    .refine((val) => {
      const selected = new Date(val);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selected >= today;
    }, 'Preferred date cannot be in the past.'),
  preferredTime: z
    .string()
    .min(1, 'Please select a preferred time.')
    .max(80, 'Preferred time is too long.'),
});

export type AppointmentFormData = z.infer<typeof appointmentFormSchema>;

export const BookAppointmentPage: React.FC = () => {
  const { isHindi } = useLanguage();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [referenceId, setReferenceId] = useState<string>('');
  const [hasCopied, setHasCopied] = useState(false);
  const [whatsappChatUrl, setWhatsappChatUrl] = useState<string>('');

  // Tomorrow's date formatted as YYYY-MM-DD for min date picker
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateStr = tomorrow.toISOString().split('T')[0];

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentFormSchema),
    mode: 'onTouched',
    defaultValues: {
      patientName: '',
      phone: '',
      age: '',
      reasonForVisit: '',
      preferredDate: minDateStr,
      preferredTime: 'Evening OPD (5:00 PM – 8:00 PM)',
    },
  });

  const onSubmit = async (data: AppointmentFormData) => {
    setIsSubmitting(true);
    try {
      const ref = `SS-REQ-${Date.now().toString().slice(-6)}`;
      const res = await appointmentService.submitInquiry({
        patientName: data.patientName,
        phone: data.phone,
        age: data.age ? parseInt(data.age, 10) : undefined,
        preferredDate: data.preferredDate,
        preferredTime: data.preferredTime,
        reasonForVisit: data.reasonForVisit || undefined,
        consultationType: 'in_clinic',
        preferredClinicId: 'cardio-diabetic-clinic',
      });

      const finalRef = res.success && res.referenceId ? res.referenceId : ref;
      setReferenceId(finalRef);

      // Build WhatsApp chat URL with all prefilled form information
      const waUrl = buildWhatsAppUrl('appointment', {
        referenceId: finalRef,
        patientName: data.patientName,
        phone: data.phone,
        age: data.age,
        preferredDate: data.preferredDate,
        preferredTime: data.preferredTime,
        reason: data.reasonForVisit,
      });

      if (waUrl) {
        setWhatsappChatUrl(waUrl);
        // Automatically redirect to the clinic's WhatsApp chatbox
        try {
          const win = window.open(waUrl, '_blank', 'noopener,noreferrer');
          if (!win || win.closed || typeof win.closed === 'undefined') {
            window.location.href = waUrl;
          }
        } catch {
          window.location.href = waUrl;
        }
      }

      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyDetailsToClipboard = () => {
    const values = getValues();
    const details = [
      `Appointment Request Reference: ${referenceId}`,
      `Patient Full Name: ${values.patientName}`,
      `Contact Phone: ${values.phone}`,
      values.age ? `Age: ${values.age}` : null,
      `Prefered Date: ${values.preferredDate}`,
      `Prefered Time: ${values.preferredTime}`,
      values.reasonForVisit ? `Brief Reason for Visit: ${values.reasonForVisit}` : null,
    ]
      .filter(Boolean)
      .join('\n');

    navigator.clipboard.writeText(details).then(() => {
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2500);
    });
  };

  const resetForm = () => {
    reset();
    setIsSubmitted(false);
    setReferenceId('');
    setWhatsappChatUrl('');
    setHasCopied(false);
  };

  const formValues = getValues();

  return (
    <>
      <SEO
        title="Book Appointment — Dr. Soumya Sengupta Diabetology"
        description="Schedule a consultation with Dr. Soumya Sengupta at Cardio Diabetic Clinic, Chaibasa directly on WhatsApp."
        canonicalPath="/book-appointment"
      />

      {/* Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#E8F2EE]/70 via-[#FBF8F1] to-[#FBF8F1] border-b border-[#E8E2D5]">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#0F5C4A]/5 rounded-full blur-3xl pointer-events-none" />
        <Container size="xl" className="relative z-10">
          <Breadcrumb items={[{ label: isHindi ? 'अपॉइंटमेंट अनुरोध' : 'Book Appointment' }]} />
          <div className="py-6 sm:py-10 max-w-3xl space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#E8F2EE] text-[#0F5C4A] border border-[#0F5C4A]/20 shadow-2xs">
              <Calendar className="w-3.5 h-3.5 text-[#0F5C4A]" />
              <span>{isHindi ? 'ओपीडी स्लॉट अनुरोध' : 'Chamber Scheduling'}</span>
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1B2A26] tracking-tight">
              {isHindi ? 'परामर्श समय आरक्षित करें' : 'Book an Appointment'}
            </h1>
            <p className="text-sm sm:text-base text-[#4A5753] leading-relaxed font-normal">
              {isHindi
                ? 'नीचे अपना विवरण भरें और बुक अपॉइंटमेंट पर क्लिक करें। आपका अनुरोध सीधे क्लिनिक के व्हाट्सएप चैट में खुल जाएगा, जहाँ सिर्फ सेंड बटन दबाकर आप विवरण भेज सकते हैं।'
                : 'Fill in your details below. When you click Book Appointment, you will be redirected to the clinic WhatsApp chat with your details ready to send. The clinic will contact you for final confirmation.'}
            </p>
          </div>
        </Container>
      </div>

      <Container size="xl" className="py-10 sm:py-14 space-y-8 max-w-2xl">
        <MedicalDisclaimerBanner />

        {/* SUBMISSION CONFIRMATION VIEW */}
        {isSubmitted ? (
          <Card padding="lg" className="text-center space-y-6 animate-in fade-in zoom-in-95 duration-200 border-emerald-200 bg-gradient-to-b from-emerald-50/60 to-white shadow-lg">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                {isHindi ? 'व्हाट्सएप चैट तैयार है' : 'Redirected to WhatsApp'}
              </span>

              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight max-w-md mx-auto">
                {isHindi
                  ? 'आपका विवरण क्लिनिक व्हाट्सएप पर भेजा जा रहा है!'
                  : 'Your appointment details are ready in WhatsApp!'}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                {isHindi
                  ? 'सभी विवरण और समय क्लिनिक के व्हाट्सएप चैटबॉक्स में तैयार हैं। बस सेंड बटन दबाएं और अंतिम पुष्टि के लिए क्लिनिक से आपको कॉल या मैसेज प्राप्त होगा।'
                  : 'All your appointment information and timings are filled in the chatbox. Simply hit the Send button in WhatsApp, and our clinic desk will contact you via call or message for final confirmation.'}
              </p>
            </div>

            {referenceId && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 font-mono text-xs font-bold text-slate-800 shadow-2xs">
                <span className="text-slate-500">{isHindi ? 'अनुरोध संदर्भ:' : 'Reference ID:'}</span>
                <span className="text-[#103F4A] text-sm">{referenceId}</span>
              </div>
            )}

            {/* Prominent Action Button to Open WhatsApp */}
            {whatsappChatUrl && (
              <div className="pt-1">
                <a
                  href={whatsappChatUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-white bg-[#25D366] hover:bg-[#20ba59] active:bg-[#1caa52] shadow-md shadow-[#25D366]/20 transition-all text-sm cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>{isHindi ? 'व्हाट्सएप चैट खोलें (सेंड दबाएं)' : 'Open WhatsApp Chat (Hit Send)'}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            )}

            {/* Booking Details Summary Card */}
            <div className="text-left bg-slate-50/70 rounded-xl border border-slate-200 p-4 space-y-2.5 text-xs sm:text-sm">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                {isHindi ? 'जमा किए गए विवरण:' : 'Submitted Appointment Details:'}
              </div>
              <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                <span className="text-slate-500 font-medium">Patient Full Name:</span>
                <span className="font-semibold text-slate-900">{formValues.patientName}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                <span className="text-slate-500 font-medium">Contact Phone:</span>
                <span className="font-semibold text-slate-900">{formValues.phone}</span>
              </div>
              {formValues.age && (
                <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                  <span className="text-slate-500 font-medium">Age:</span>
                  <span className="font-semibold text-slate-900">{formValues.age}</span>
                </div>
              )}
              <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                <span className="text-slate-500 font-medium">Prefered Date:</span>
                <span className="font-semibold text-slate-900">{formValues.preferredDate}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                <span className="text-slate-500 font-medium">Prefered Time:</span>
                <span className="font-semibold text-slate-900">{formValues.preferredTime}</span>
              </div>
              {formValues.reasonForVisit && (
                <div className="flex justify-between pt-0.5">
                  <span className="text-slate-500 font-medium">Reason for Visit:</span>
                  <span className="font-medium text-slate-800 text-right max-w-[220px] truncate" title={formValues.reasonForVisit}>
                    {formValues.reasonForVisit}
                  </span>
                </div>
              )}
            </div>

            {/* Action Bar: Call Clinic & Copy Details */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
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
          /* SINGLE-PAGE ALL-IN-ONE APPOINTMENT FORM */
          <Card padding="lg" className="border-[#E8E2D5] shadow-[0_16px_40px_rgba(27,42,38,0.06)] rounded-3xl bg-white">
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* 1. Patient Full Name */}
                <div className="sm:col-span-1 space-y-1.5">
                  <label htmlFor="patientName" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    <span className="inline-flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-slate-500" />
                      {isHindi ? 'मरीज का पूरा नाम' : 'Patient Full Name'}
                      <span className="text-rose-500 font-bold">*</span>
                    </span>
                  </label>
                  <input
                    id="patientName"
                    type="text"
                    inputMode="text"
                    autoComplete="name"
                    {...register('patientName')}
                    placeholder={isHindi ? 'उदा. अमित कुमार' : 'e.g. Ramesh Chandra Mukherjee'}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50/30 hover:bg-white focus:bg-white text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#103F4A]/20 focus:border-[#103F4A] transition-all"
                  />
                  {errors.patientName && (
                    <p className="text-xs text-rose-600 mt-1 flex items-center gap-1" role="alert">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.patientName.message}</span>
                    </p>
                  )}
                </div>

                {/* 2. Contact Phone (Mobile / WhatsApp) * */}
                <div className="sm:col-span-1 space-y-1.5">
                  <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    <span className="inline-flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-slate-500" />
                      {isHindi ? 'संपर्क फोन (मोबाइल / व्हाट्सएप)' : 'Contact Phone (Mobile / WhatsApp)'}
                      <span className="text-rose-500 font-bold">*</span>
                    </span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    {...register('phone')}
                    placeholder="+91 98300 XXXXX"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50/30 hover:bg-white focus:bg-white text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#103F4A]/20 focus:border-[#103F4A] transition-all"
                  />
                  {errors.phone && (
                    <p className="text-xs text-rose-600 mt-1 flex items-center gap-1" role="alert">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.phone.message}</span>
                    </p>
                  )}
                </div>

                {/* 3. Age */}
                <div className="sm:col-span-1 space-y-1.5">
                  <label htmlFor="age" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    {isHindi ? 'उम्र' : 'Age'}
                  </label>
                  <input
                    id="age"
                    type="number"
                    min="1"
                    max="120"
                    inputMode="numeric"
                    {...register('age')}
                    placeholder={isHindi ? 'उदा. 45' : 'e.g. 45'}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50/30 hover:bg-white focus:bg-white text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#103F4A]/20 focus:border-[#103F4A] transition-all"
                  />
                  {errors.age && (
                    <p className="text-xs text-rose-600 mt-1 flex items-center gap-1" role="alert">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.age.message}</span>
                    </p>
                  )}
                </div>

                {/* 4. Prefered Date */}
                <div className="sm:col-span-1 space-y-1.5">
                  <label htmlFor="preferredDate" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      {isHindi ? 'पसंदीदा तारीख' : 'Prefered Date'}
                      <span className="text-rose-500 font-bold">*</span>
                    </span>
                  </label>
                  <input
                    id="preferredDate"
                    type="date"
                    min={minDateStr}
                    {...register('preferredDate')}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50/30 hover:bg-white focus:bg-white text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#103F4A]/20 focus:border-[#103F4A] transition-all"
                  />
                  {errors.preferredDate && (
                    <p className="text-xs text-rose-600 mt-1 flex items-center gap-1" role="alert">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.preferredDate.message}</span>
                    </p>
                  )}
                </div>

                {/* 5. Prefered Time */}
                <div className="sm:col-span-2 space-y-1.5">
                  <label htmlFor="preferredTime" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      {isHindi ? 'पसंदीदा समय' : 'Prefered Time'}
                      <span className="text-rose-500 font-bold">*</span>
                    </span>
                  </label>
                  <select
                    id="preferredTime"
                    {...register('preferredTime')}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50/30 hover:bg-white focus:bg-white text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#103F4A]/20 focus:border-[#103F4A] transition-all"
                  >
                    <option value="Evening OPD (5:00 PM – 8:00 PM)">
                      {isHindi ? 'संध्या ओपीडी (5:00 PM – 8:00 PM)' : 'Evening OPD (5:00 PM – 8:00 PM)'}
                    </option>
                    <option value="Morning OPD (10:00 AM – 1:00 PM)">
                      {isHindi ? 'प्रातः ओपीडी (10:00 AM – 1:00 PM)' : 'Morning OPD (10:00 AM – 1:00 PM)'}
                    </option>
                    <option value="Afternoon Slot (2:00 PM – 4:00 PM)">
                      {isHindi ? 'दोपहर स्लॉट (2:00 PM – 4:00 PM)' : 'Afternoon Slot (2:00 PM – 4:00 PM)'}
                    </option>
                    <option value="Any Available Time">
                      {isHindi ? 'उपलब्ध कोई भी समय (Any Available Time)' : 'Any Available Time'}
                    </option>
                  </select>
                  {errors.preferredTime && (
                    <p className="text-xs text-rose-600 mt-1 flex items-center gap-1" role="alert">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.preferredTime.message}</span>
                    </p>
                  )}
                </div>

                {/* 6. Brief Reason for Visit (Optional) */}
                <div className="sm:col-span-2 space-y-1.5">
                  <label htmlFor="reasonForVisit" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    <span className="inline-flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-slate-500" />
                      {isHindi ? 'परामर्श का संक्षिप्त कारण' : 'Brief Reason for Visit'}
                      <span className="text-slate-400 font-normal lowercase">(optional)</span>
                    </span>
                  </label>
                  <textarea
                    id="reasonForVisit"
                    rows={3}
                    maxLength={250}
                    {...register('reasonForVisit')}
                    placeholder={
                      isHindi
                        ? 'उदा. उच्च फास्टिंग शुगर, HbA1c समीक्षा या मधुमेह परामर्श।'
                        : 'e.g. High fasting blood sugar, HbA1c report review, diabetes management...'
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50/30 hover:bg-white focus:bg-white text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#103F4A]/20 focus:border-[#103F4A] transition-all resize-y"
                  />
                  {errors.reasonForVisit && (
                    <p className="text-xs text-rose-600 mt-1 flex items-center gap-1" role="alert">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.reasonForVisit.message}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Timing Notice */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#103F4A] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  {isHindi
                    ? 'क्लिनिक समय: सोमवार से शनिवार शाम 5:00 से 8:00 बजे। व्हाट्सएप पर भेजने के बाद क्लिनिक डेस्क आपको पुष्टि के लिए संपर्क करेगा।'
                    : 'Standard Chamber Hours: Monday to Saturday, 5:00 PM – 8:00 PM. Our clinic desk will call or message you to confirm your final appointment slot.'}
                </span>
              </div>

              {/* Submit Button (Direct WhatsApp Booking) */}
              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-full font-bold text-white bg-[#0F5C4A] hover:bg-[#0B4636] active:bg-[#083327] shadow-md shadow-[#0F5C4A]/20 transition-all text-sm sm:text-base cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <MessageSquare className="w-4 h-4 text-[#25D366] fill-[#25D366]" />
                  <span>{isHindi ? 'व्हाट्सएप पर अपॉइंटमेंट बुक करें' : 'Book Appointment via WhatsApp'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-[11px] text-center text-[#4A5753] leading-normal">
                  {isHindi
                    ? 'क्लिक करने पर आपका विवरण क्लिनिक के व्हाट्सएप चैट में खुल जाएगा। बस सेंड बटन दबाएं।'
                    : 'Clicking will open WhatsApp with your filled details. Just hit Send in the chat, and the clinic will reach out to confirm.'}
                </p>
              </div>
            </form>
          </Card>
        )}
      </Container>
    </>
  );
};
