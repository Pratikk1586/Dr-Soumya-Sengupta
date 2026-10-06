import type { IAppointmentService } from './IAppointmentService';
import type { AppointmentInquiryPayload, AppointmentSubmissionResult } from '../types/appointment';

export class LocalAppointmentService implements IAppointmentService {
  async submitInquiry(payload: AppointmentInquiryPayload): Promise<AppointmentSubmissionResult> {
    // Frontend-only inquiry handler. No persistent sensitive PHI stored.
    // Simulates an asynchronous reception transmission.
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Basic validation
    if (!payload.patientName.trim() || !payload.phone.trim()) {
      return {
        success: false,
        message: {
          en: 'Please provide patient name and a valid contact phone number.',
          hi: 'कृपया मरीज का नाम और संपर्क फोन नंबर दर्ज करें।',
        },
      };
    }

    const refCode = `SS-INQ-${Date.now().toString().slice(-6)}`;

    return {
      success: true,
      inquiryReferenceId: refCode,
      message: {
        en: `Your consultation request has been recorded (Ref: ${refCode}). Our clinic desk will call you to confirm your exact time slot.`,
        hi: `आपका परामर्श अनुरोध दर्ज कर लिया गया है (संदर्भ: ${refCode})। क्लिनिक डेस्क आपको समय की पुष्टि के लिए संपर्क करेगा।`,
      },
    };
  }
}
