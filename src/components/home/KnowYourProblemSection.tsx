import React, { useState, useId } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Activity,
  Calendar,
  ArrowRight,
  BookOpen,
  ShieldAlert,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react';
import { Section } from '../common/Section';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { useLanguage } from '../../context/useLanguage';
import { useService } from '../../hooks/useService';
import { problemService } from '../../services';
import { fadeIn, reducedMotionVariants } from '../../utils/motion';

export const KnowYourProblemSection: React.FC = () => {
  const { localize, t } = useLanguage();
  const { data: problems, isLoading } = useService(() => problemService.getProblemTopics(), []);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const baseId = useId();
  const shouldReduceMotion = useReducedMotion();

  const problemList = problems || [];
  const activeProblem = problemList[selectedIndex] || problemList[0];

  return (
    <Section
      eyebrow="Clinical Self-Guidance"
      heading="Know Your Problem"
      lede="Select a common symptom or concern to explore general physiological causes, clinical questions, and relevant care pathways."
      containerSize="xl"
      className="bg-[#faf9f6] border-b border-slate-200/80"
    >
      {/* Universal Non-Diagnostic Banner */}
      <div className="mb-8 p-4 rounded-xl bg-amber-50 border border-amber-200/90 text-amber-950 text-xs sm:text-sm flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" aria-hidden="true" />
        <div>
          <strong className="block font-semibold">Important Medical Notice:</strong>
          <span>
            This interactive guide is for general health literacy only and is NOT a medical diagnosis or personal clinical assessment.
            For diagnosis and treatment recommendations, please consult a qualified doctor.
          </span>
        </div>
      </div>

      {isLoading ? (
        <div className="py-12 text-center text-sm text-slate-500">Loading problem topics...</div>
      ) : (
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Accessible Tab / Selector Buttons */}
          <div
            className="lg:col-span-5 space-y-2"
            role="tablist"
            aria-label="Clinical Concerns and Symptoms Selector"
          >
            {problemList.map((prob, idx) => {
              const isSelected = idx === selectedIndex;
              const tabId = `${baseId}-tab-${prob.id}`;
              const panelId = `${baseId}-panel-${prob.id}`;

              return (
                <button
                  key={prob.id}
                  id={tabId}
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls={panelId}
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => setSelectedIndex(idx)}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowDown') {
                      e.preventDefault();
                      setSelectedIndex((idx + 1) % problemList.length);
                    } else if (e.key === 'ArrowUp') {
                      e.preventDefault();
                      setSelectedIndex((idx - 1 + problemList.length) % problemList.length);
                    }
                  }}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-[#0f3d4a] text-white border-[#0f3d4a] shadow-md'
                      : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200/90 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-white/15 text-teal-200' : 'bg-teal-50 text-[#0f3d4a]'
                      }`}
                    >
                      <Activity className="w-4 h-4" />
                    </div>
                    <span className="font-semibold text-xs sm:text-sm truncate">
                      {localize(prob.title)}
                    </span>
                  </div>
                  <ArrowRight
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isSelected ? 'text-teal-300 translate-x-0.5' : 'text-slate-400'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Dynamic Problem Insight Card */}
          <div className="lg:col-span-7">
            {activeProblem && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProblem.id}
                  id={`${baseId}-panel-${activeProblem.id}`}
                  role="tabpanel"
                  aria-labelledby={`${baseId}-tab-${activeProblem.id}`}
                  variants={shouldReduceMotion ? reducedMotionVariants : fadeIn}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <Card padding="lg" className="border-slate-200/90 shadow-sm space-y-6 bg-white">
                    {/* Header */}
                    <div className="space-y-2 border-b border-slate-100 pb-4">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider bg-teal-50 text-teal-800 border border-teal-200/60">
                          Educational Topic
                        </span>
                        <span className="text-xs text-slate-500 font-medium">
                          Clinical Guidance
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                        {localize(activeProblem.title)}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 font-medium">
                        {localize(activeProblem.shortDesc)}
                      </p>
                    </div>

                    {/* General Educational Context */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                        <HelpCircle className="w-4 h-4 text-teal-600" />
                        <span>Physiological Context</span>
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        {localize(activeProblem.generalInfo)}
                      </p>
                    </div>

                    {/* Key Clinical Considerations */}
                    <div className="space-y-3 pt-2">
                      <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                        Key Points to Note:
                      </h4>
                      <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                        {activeProblem.keyConsiderations.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                            <span>{localize(item)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Actions and Related Resources */}
                    <div className="pt-4 border-t border-slate-100 space-y-4">
                      <div className="flex flex-wrap items-center gap-3">
                        <Link to={activeProblem.relatedPageLink}>
                          <Button variant="primary" size="sm" className="gap-1.5">
                            <span>{localize(activeProblem.relatedPageLabel)}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Button>
                        </Link>

                        <Link to={activeProblem.relatedResourceLink}>
                          <Button variant="outline" size="sm" className="gap-1.5">
                            <BookOpen className="w-3.5 h-3.5" />
                            <span>{localize(activeProblem.relatedResourceLabel)}</span>
                          </Button>
                        </Link>

                        <Link to="/book-appointment">
                          <Button variant="secondary" size="sm" className="gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{t('cta.bookAppointment')}</span>
                          </Button>
                        </Link>
                      </div>

                      <div className="text-[11px] text-slate-500 italic">
                        * Please bring any recent blood glucose logs or lab reports when attending consultation.
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>
      )}
    </Section>
  );
};
