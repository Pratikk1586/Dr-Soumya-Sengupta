import type { Video } from '../types';

export const VIDEOS_DATA: Video[] = [
  {
    id: 'vid-1',
    title: {
      en: 'How to Read Your Continuous Glucose Monitoring (CGM) Report',
      hi: 'अपनी सीजीएम (CGM) रिपोर्ट कैसे समझें',
    },
    description: {
      en: 'A step-by-step walkthrough explaining Time in Range (TIR), glucose variability, and trend arrows.',
      hi: 'टाइम इन रेंज और ग्लूकोज ग्राफ को समझने का सरल वीडियो गाइड।',
    },
    durationMinutes: 6,
    youtubeId: 'placeholder_vid_1',
    category: { en: 'Patient Guides', hi: 'मरीज मार्गदर्शिका' },
    status: 'verified',
  },
  {
    id: 'vid-2',
    title: {
      en: 'Preventing Diabetic Foot Complications at Home',
      hi: 'घर पर डायबिटिक फुट केयर के आसान नियम',
    },
    description: {
      en: 'Daily 3-minute self-inspection routine to protect feet from neuropathy-related injuries.',
      hi: 'पैरों के घाव और नसों की सुरक्षा के लिए दैनिक देखभाल।',
    },
    durationMinutes: 5,
    youtubeId: 'placeholder_vid_2',
    category: { en: 'Preventive Care', hi: 'रोकथाम' },
    status: 'verified',
  },
];
