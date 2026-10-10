import React, { useEffect } from 'react';
import { X, Award, ShieldCheck, Calendar, Building2, FileCheck } from 'lucide-react';
import type { DoctorCertification } from '../../types';
import { useLanguage } from '../../context/useLanguage';

interface CertificateModalProps {
  certificate: DoctorCertification | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ certificate, onClose }) => {
  const { localize, isHindi } = useLanguage();

  useEffect(() => {
    if (!certificate) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [certificate, onClose]);

  if (!certificate) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="certificate-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#0f3d4a] to-[#08222a] text-white flex items-start justify-between gap-4">
          <div className="space-y-1 min-w-0">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 text-[11px] font-semibold uppercase tracking-wider border border-teal-400/30">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-300" />
              {isHindi ? 'सत्यापित चिकित्सकीय प्रमाणन' : 'Verified Clinical Credential'}
            </span>
            <h3 id="certificate-modal-title" className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug">
              {localize(certificate.title)}
            </h3>
            <p className="text-xs text-teal-100 flex items-center gap-2">
              <Building2 className="w-3.5 h-3.5 text-teal-300 shrink-0" />
              <span>{localize(certificate.organization)}</span>
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-teal-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
            aria-label="Close certificate modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Certificate Preview */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 bg-slate-50/50">
          {certificate.image ? (
            <div className="rounded-xl overflow-hidden border border-slate-200 shadow-inner bg-white">
              <img
                src={certificate.image}
                alt={localize(certificate.title)}
                className="w-full h-auto object-contain max-h-[55vh]"
                loading="lazy"
              />
            </div>
          ) : (
            /* Elegant Credential Parchment Frame */
            <div className="relative rounded-2xl border-2 border-dashed border-teal-300/80 bg-gradient-to-b from-amber-50/40 via-white to-teal-50/30 p-6 sm:p-8 text-center space-y-4 shadow-inner">
              <div className="w-16 h-16 rounded-full bg-[#0f3d4a]/10 border border-[#0f3d4a]/20 text-[#0f3d4a] flex items-center justify-center mx-auto shadow-sm">
                <Award className="w-8 h-8 text-[#0f3d4a]" />
              </div>

              <div className="space-y-1.5 max-w-lg mx-auto">
                <span className="text-[11px] font-mono tracking-widest uppercase text-slate-400 block">
                  Cardio Diabetic Clinic Registry
                </span>
                <h4 className="text-base sm:text-lg font-bold text-[#06181f]">
                  {localize(certificate.title)}
                </h4>
                <p className="text-xs text-slate-600 font-medium">
                  {localize(certificate.organization)}
                </p>
              </div>

              {certificate.description && (
                <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto italic font-serif">
                  "{localize(certificate.description)}"
                </p>
              )}

              <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-600">
                {certificate.year && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-2xs">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Conferred: {certificate.year}</span>
                  </span>
                )}
                {certificate.credentialId && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-2xs font-mono text-[11px]">
                    <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>ID: {certificate.credentialId}</span>
                  </span>
                )}
              </div>

              <p className="text-[11px] text-slate-400 pt-2 border-t border-slate-200/60 max-w-sm mx-auto">
                {isHindi
                  ? 'मूल प्रमाण पत्र प्रति चेंबर अभिलेख में सुरक्षित है। विस्तृत सत्यापन क्लिनिक डेस्क द्वारा उपलब्ध कराया जाता है।'
                  : 'Original certificate copy is maintained on clinical record at Cardio Diabetic Clinic, Chaibasa.'}
              </p>
            </div>
          )}

          {certificate.description && !certificate.image && (
            <div className="p-3.5 rounded-xl bg-teal-50/60 border border-teal-100 text-xs text-[#0f3d4a]">
              <span className="font-semibold block mb-0.5">
                {isHindi ? 'क्लिनिकल विवरण:' : 'Clinical Competency Scope:'}
              </span>
              <p className="text-slate-700 leading-relaxed">{localize(certificate.description)}</p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between gap-3">
          <span className="text-xs text-slate-500 font-medium hidden sm:inline">
            Dr. Soumya Sengupta • Practicing Diabetologist
          </span>
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-[#0f3d4a] hover:bg-[#0c2f39] text-white transition-colors cursor-pointer shadow-xs ml-auto"
          >
            {isHindi ? 'बंद करें' : 'Close Viewer'}
          </button>
        </div>
      </div>
    </div>
  );
};
