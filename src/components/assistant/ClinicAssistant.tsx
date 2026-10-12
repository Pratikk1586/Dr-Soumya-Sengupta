import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  X,
  Send,
  RotateCcw,
  AlertTriangle,
  ArrowRight,
  Bot,
  User,
  Languages,
} from 'lucide-react';
import { useLanguage } from '../../context/useLanguage';
import type { Language } from '../../types';
import { chatbotService, type ChatbotMessage, type ChatActionOption } from '../../services';

let messageCounter = 0;
function nextMessageId(prefix: string): string {
  messageCounter += 1;
  return `${prefix}-${messageCounter}`;
}

export const ClinicAssistant: React.FC = () => {
  const { language, isHindi } = useLanguage();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatbotMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [liveAnnouncement, setLiveAnnouncement] = useState('');
  
  // Bilingual capability: track user language override without cascading effect
  const [overrideLanguage, setOverrideLanguage] = useState<Language | null>(null);
  const chatLanguage = overrideLanguage ?? language;
  const isChatHindi = chatLanguage === 'hi';

  // "Need Help?" bubble shown once after 8 seconds, dismissible and remembered in localStorage
  const HELP_BUBBLE_STORAGE_KEY = 'clinic_assistant_help_bubble_dismissed';
  const [showHelpBubble, setShowHelpBubble] = useState<boolean>(false);

  useEffect(() => {
    try {
      const isDismissed = localStorage.getItem(HELP_BUBBLE_STORAGE_KEY) === 'true';
      if (!isDismissed) {
        const timer = setTimeout(() => {
          setShowHelpBubble(true);
        }, 8000);
        return () => clearTimeout(timer);
      }
    } catch {
      // localStorage may be unavailable in private browsing
    }
  }, []);

  const handleDismissBubble = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setShowHelpBubble(false);
    try {
      localStorage.setItem(HELP_BUBBLE_STORAGE_KEY, 'true');
    } catch {
      // fallback
    }
  };

  const handleOpenChat = () => {
    handleDismissBubble();
    setIsOpen(true);
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Derive displayed messages: show initial greeting in active chat language when conversation is empty
  const displayMessages = React.useMemo(() => {
    if (messages.length === 0) {
      return [chatbotService.getInitialMessage(chatLanguage)];
    }
    return messages;
  }, [messages, chatLanguage]);

  // Scroll to bottom on new message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [displayMessages, isTyping, isOpen]);

  // Focus trap, Escape key, and body scroll lock on mobile
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 100);
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsOpen(false);
        }
      };

      // Mobile scroll lock
      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        document.body.style.overflow = 'hidden';
      }

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
      };
    }
  }, [isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query || isTyping) return;

    const userMsg: ChatbotMessage = {
      id: nextMessageId('user'),
      sender: 'user',
      text: query,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => {
      const base = prev.length === 0 ? [chatbotService.getInitialMessage(chatLanguage)] : prev;
      return [...base, userMsg];
    });
    setInputText('');
    setIsTyping(true);
    setLiveAnnouncement(isChatHindi ? 'सहायक उत्तर तैयार कर रहा है...' : 'Assistant is typing...');

    try {
      const response = await chatbotService.respond(query, chatLanguage);
      setMessages((prev) => [...prev, response]);
      setLiveAnnouncement(response.text);
    } catch {
      const errorMsg: ChatbotMessage = {
        id: nextMessageId('err'),
        sender: 'assistant',
        text: isChatHindi
          ? 'माफ़ कीजिए, उत्तर लोड करने में समस्या हुई। कृपया क्लिनिक फोन पर संपर्क करें।'
          : 'Sorry, unable to load response right now. Please contact the clinic desk directly.',
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMsg]);
      setLiveAnnouncement(errorMsg.text);
    } finally {
      setIsTyping(false);
    }
  };

  const handleResetChat = () => {
    setMessages([]);
    setInputText('');
    setLiveAnnouncement(isChatHindi ? 'चैट रीसेट हो गई है।' : 'Chat restarted.');
  };

  const handleToggleLanguage = () => {
    const next = chatLanguage === 'en' ? 'hi' : 'en';
    setOverrideLanguage(next);
    setLiveAnnouncement(
      next === 'hi'
        ? 'सहायक की भाषा हिंदी में बदल दी गई है।'
        : 'Chatbot language switched to English.'
    );
  };

  const handleActionClick = (action: ChatActionOption) => {
    if (action.url) {
      if (action.isExternal) {
        window.open(action.url, '_blank', 'noopener,noreferrer');
      } else {
        setIsOpen(false);
        navigate(action.url);
      }
    } else if (action.action) {
      handleSendMessage(action.action);
    }
  };

  return (
    <>
      {/* Screen Reader Live Announcement */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {liveAnnouncement}
      </div>

      {/* Floating Trigger & Highlight Beacon */}
      {!isOpen && (
        <div className="fixed bottom-[calc(4.75rem+env(safe-area-inset-bottom,0px))] md:bottom-6 right-3 sm:right-4 md:right-6 z-40 flex flex-col items-end gap-2 pointer-events-none">
          {/* "Need Help?" bubble: shown once after 8s, dismissible, remembered in localStorage */}
          {showHelpBubble && (
            <div
              onClick={handleOpenChat}
              className="pointer-events-auto flex items-center gap-2 pl-3.5 pr-1.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-slate-800 text-xs sm:text-sm font-semibold shadow-lg border border-teal-200/90 hover:border-teal-400 hover:shadow-xl transition-all duration-200 cursor-pointer group animate-in fade-in slide-in-from-bottom-2"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleOpenChat();
                }
              }}
              aria-label={isHindi ? 'सहायता चाहिए? क्लिनिक सहायक से पूछें' : 'Need Help? Ask AI Assistant'}
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="group-hover:text-[#103F4A] transition-colors whitespace-nowrap">
                {isHindi ? 'सहायता चाहिए?' : 'Need Help?'}
              </span>
              <button
                type="button"
                onClick={handleDismissBubble}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer shrink-0 ml-1"
                title={isHindi ? 'हटाएं' : 'Dismiss'}
                aria-label="Dismiss help bubble"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Clean Round Launcher Button */}
          <button
            type="button"
            onClick={handleOpenChat}
            className="pointer-events-auto relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-[#103F4A] to-[#145466] hover:from-[#0a252f] hover:to-[#103F4A] text-white rounded-full shadow-[0_4px_18px_rgba(16,63,74,0.35)] hover:shadow-[0_6px_22px_rgba(16,63,74,0.5)] ring-2 ring-teal-400/40 hover:ring-teal-400/80 ring-offset-2 ring-offset-white hover:scale-105 active:scale-95 transition-all duration-300 group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#103F4A] cursor-pointer"
            aria-label={isHindi ? 'क्लिनिक सहायक खोलें' : 'Open Clinic Assistant chat'}
          >
            <div className="relative shrink-0 flex items-center justify-center">
              <Bot className="w-6 h-6 text-teal-100 group-hover:scale-110 transition-transform" aria-hidden="true" />
              {/* Subtle pulsing live indicator beacon */}
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border border-[#0c3642]" />
              </span>
            </div>
          </button>
        </div>
      )}

      {/* Chatbot Interface (Bottom Sheet on Mobile, Floating Card on Desktop) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 md:z-40 bg-slate-900/50 md:bg-transparent backdrop-blur-xs md:backdrop-blur-none flex flex-col justify-end md:block"
          role="dialog"
          aria-modal="true"
          aria-label="Clinic Assistant Chat"
          onClick={() => setIsOpen(false)}
        >
          <div
            ref={panelRef}
            onClick={(e) => e.stopPropagation()}
            className="w-full md:w-96 md:fixed md:bottom-6 md:right-6 bg-white rounded-t-3xl md:rounded-2xl shadow-2xl border border-slate-200 flex flex-col h-[82dvh] md:h-[580px] max-h-[90dvh] overflow-hidden animate-in slide-in-from-bottom-4 duration-200"
          >
            {/* Header with Duo-lingo Language Switcher */}
            <div className="px-4 py-3 bg-gradient-to-r from-[#103F4A] to-[#175664] text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#EAF7FA] shrink-0">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="truncate">
                  <h3 className="text-sm font-bold tracking-tight truncate">
                    {isChatHindi ? 'डॉ. सेनगुप्ता क्लिनिक सहायक' : 'Dr. Sengupta Clinic Assistant'}
                  </h3>
                  <div className="flex items-center gap-1.5 text-[11px] text-[#EAF7FA]/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                    <span className="truncate">
                      {isChatHindi ? 'द्विभाषी सहायता (En / हिन्दी)' : 'Bilingual Guide (English & Hindi)'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0 ml-2">
                {/* Duo-lingo / Bilingual toggle button */}
                <button
                  type="button"
                  onClick={handleToggleLanguage}
                  className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg bg-white/15 hover:bg-white/25 active:scale-95 text-white transition-all cursor-pointer border border-white/20 shadow-xs"
                  title={chatLanguage === 'en' ? 'हिंदी में बदलें (Switch to Hindi)' : 'Switch to English (अंग्रेज़ी)'}
                  aria-label={chatLanguage === 'en' ? 'Switch chat language to Hindi' : 'Switch chat language to English'}
                >
                  <Languages className="w-3.5 h-3.5 text-[#EAF7FA]" />
                  <span>{chatLanguage === 'en' ? 'हि / En' : 'En / हि'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleResetChat}
                  className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                  title={isChatHindi ? 'चैट रीसेट करें' : 'Restart conversation'}
                  aria-label="Restart chat"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                  aria-label="Close assistant"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Conversation Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/70 text-xs sm:text-sm">
              {displayMessages.map((msg) => {
                const isAssistant = msg.sender === 'assistant';
                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2.5 ${
                      isAssistant ? 'justify-start' : 'justify-end'
                    }`}
                  >
                    {isAssistant && (
                      <div className="w-6 h-6 rounded-full bg-[#103F4A] text-white flex items-center justify-center shrink-0 text-xs mt-0.5">
                        <Bot className="w-3.5 h-3.5 text-[#EAF7FA]" />
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] rounded-2xl p-3 sm:p-3.5 shadow-2xs ${
                        isAssistant
                          ? msg.isWarning
                            ? 'bg-rose-50 border border-rose-200 text-rose-950 font-medium'
                            : 'bg-white border border-slate-200/80 text-slate-800'
                          : 'bg-[#103F4A] text-white font-medium rounded-tr-xs'
                      }`}
                    >
                      {msg.isWarning && (
                        <div className="flex items-center gap-1.5 text-rose-700 font-bold text-xs mb-1.5">
                          <AlertTriangle className="w-4 h-4 shrink-0" />
                          <span>{isChatHindi ? 'महत्वपूर्ण सूचना' : 'Safety Notice'}</span>
                        </div>
                      )}

                      <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>

                      {/* Interactive Actions / Deep Links */}
                      {msg.actions && msg.actions.length > 0 && (
                        <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap gap-1.5">
                          {msg.actions.map((act) => (
                            <button
                              key={act.label}
                              type="button"
                              onClick={() => handleActionClick(act)}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-[#EAF7FA]/80 hover:bg-[#EAF7FA] text-[#103F4A] border border-[#65D9D0]/40 transition-colors cursor-pointer text-left"
                            >
                              <span>{act.label}</span>
                              {act.url && <ArrowRight className="w-3 h-3 shrink-0" />}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {!isAssistant && (
                      <div className="w-6 h-6 rounded-full bg-slate-300 text-slate-700 flex items-center justify-center shrink-0 text-xs mt-0.5">
                        <User className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex items-center gap-2 text-slate-400 text-xs pl-8">
                  <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]" />
                  <span className="text-[11px] font-medium text-slate-500">
                    {isChatHindi ? 'उत्तर आ रहा है...' : 'Thinking...'}
                  </span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Action Suggestions Drawer (If initial state) */}
            {displayMessages.length === 1 && (
              <div className="p-2.5 bg-white border-t border-slate-100 shrink-0">
                <div className="flex items-center justify-between mb-1.5 px-1">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    {isChatHindi ? 'त्वरित विकल्प' : 'Common Topics & Actions'}
                  </p>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {isChatHindi ? 'टैप करें' : 'Tap to ask'}
                  </span>
                </div>
                <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  {chatbotService.getQuickActions(chatLanguage).slice(0, 6).map((act) => (
                    <button
                      key={act.label}
                      type="button"
                      onClick={() => handleActionClick(act)}
                      className="px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap bg-slate-100 hover:bg-[#EAF7FA] text-slate-700 hover:text-[#103F4A] transition-colors cursor-pointer border border-slate-200/60"
                    >
                      {act.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={
                  isChatHindi
                    ? 'अपॉइंटमेंट, समीक्षा, पता, सूचना या सवाल पूछें...'
                    : 'Ask about appointments, reviews, address, or news...'
                }
                className="flex-1 px-3 py-2 text-xs sm:text-sm bg-slate-100 rounded-xl text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-[#103F4A]/20 font-sans"
                aria-label="Type message to clinic assistant"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isTyping}
                className="p-2.5 rounded-xl bg-[#103F4A] text-white hover:bg-[#0a252f] disabled:bg-slate-200 disabled:text-slate-400 transition-colors cursor-pointer shrink-0"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            {/* Non-Diagnostic Standing Footer Disclaimer */}
            <div className="px-3 py-1.5 bg-slate-50 border-t border-slate-100 text-[10px] text-slate-400 text-center shrink-0">
              <span>
                {isChatHindi
                  ? 'द्विभाषी सहायक • सामान्य क्लिनिक जानकारी, चिकित्सीय सलाह नहीं।'
                  : 'Bilingual Assistant • Automated clinic orientation only. Not medical diagnosis.'}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
