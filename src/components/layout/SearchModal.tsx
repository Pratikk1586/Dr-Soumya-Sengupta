import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  X,
  ArrowRight,
  Clock,
  Trash2,
  BookOpen,
  HelpCircle,
  Video as VideoIcon,
  FileText,
  CheckSquare,
  Bell,
  MapPin,
  Activity,
  Stethoscope,
} from 'lucide-react';
import { useLanguage } from '../../context/useLanguage';
import { searchService, type SearchResultItem, type SearchResultCategory } from '../../services';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RECENT_SEARCHES_KEY = 'sg_recent_searches';

const CATEGORY_ICONS: Record<SearchResultCategory, React.ComponentType<{ className?: string }>> = {
  condition: Stethoscope,
  service: Activity,
  article: BookOpen,
  faq: HelpCircle,
  video: VideoIcon,
  report: FileText,
  guide: CheckSquare,
  notice: Bell,
  clinic: MapPin,
};

function highlightMatch(text: string, query: string) {
  if (!query.trim()) return text;
  const tokens = query
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  if (tokens.length === 0) return text;

  try {
    const regex = new RegExp(`(${tokens.join('|')})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-amber-100 text-amber-900 font-semibold px-0.5 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  } catch {
    return text;
  }
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const { language, isHindi } = useLanguage();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const popularSuggestions = useMemo(
    () => searchService.getPopularSuggestions(language),
    [language]
  );

  // Group results by category
  const groupedResults = useMemo(() => {
    const map = new Map<string, { categoryLabel: string; items: SearchResultItem[] }>();
    for (const item of results) {
      if (!map.has(item.category)) {
        map.set(item.category, { categoryLabel: item.categoryLabel, items: [] });
      }
      map.get(item.category)!.items.push(item);
    }
    return Array.from(map.entries()).map(([cat, data]) => ({
      category: cat as SearchResultCategory,
      label: data.categoryLabel,
      items: data.items,
    }));
  }, [results]);

  // Execute Search
  useEffect(() => {
    let isCancelled = false;
    const trimmed = query.trim();

    const timer = setTimeout(() => {
      if (trimmed.length < 2) {
        if (!isCancelled) {
          setResults([]);
          setIsSearching(false);
          setSelectedIndex(-1);
        }
        return;
      }

      setIsSearching(true);
      searchService
        .search(trimmed, language)
        .then((items) => {
          if (!isCancelled) {
            setResults(items);
            setSelectedIndex(items.length > 0 ? 0 : -1);
            setIsSearching(false);
          }
        })
        .catch(() => {
          if (!isCancelled) {
            setResults([]);
            setIsSearching(false);
          }
        });
    }, 120);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [query, language]);

  // Focus input on modal open
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 40);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const saveRecentSearch = (searchQuery: string) => {
    const cleaned = searchQuery.trim();
    if (!cleaned) return;
    try {
      const updated = [cleaned, ...recentSearches.filter((s) => s.toLowerCase() !== cleaned.toLowerCase())].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
    } catch {
      // LocalStorage access restricted
    }
  };

  const clearRecentSearches = () => {
    try {
      localStorage.removeItem(RECENT_SEARCHES_KEY);
      setRecentSearches([]);
    } catch {
      // No-op
    }
  };

  const handleSelectResult = (item: SearchResultItem) => {
    saveRecentSearch(query || item.title);
    onClose();
    navigate(item.url);
  };

  // Keyboard navigation inside modal
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
      return;
    }

    if (results.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < results.length) {
        handleSelectResult(results[selectedIndex]);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-12 sm:pt-20 px-3 sm:px-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-modal-heading"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 sm:py-4 border-b border-slate-200 bg-white gap-3 shrink-0">
          <Search className="w-5 h-5 text-slate-400 shrink-0" aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              isHindi
                ? 'रोग, दवाएं, लैब टेस्ट (HbA1c), लक्षण या क्लिनिक समय खोजें...'
                : 'Search conditions, HbA1c, CGM, diet, appointments...'
            }
            className="flex-1 text-sm sm:text-base text-slate-900 placeholder-slate-400 bg-transparent outline-none font-sans"
            aria-label="Search clinical resources and medical topics"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-md cursor-pointer"
              aria-label="Clear search input"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="px-2 py-1 text-xs font-semibold text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors cursor-pointer"
            aria-label="Close search"
          >
            ESC
          </button>
        </div>

        {/* Screen Reader Live Count Announcement */}
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {isSearching
            ? isHindi
              ? 'खोज जारी है...'
              : 'Searching...'
            : query.trim().length >= 2
            ? isHindi
              ? `${results.length} परिणाम मिले`
              : `${results.length} results found`
            : ''}
        </div>

        {/* Modal Body / Results Container */}
        <div
          ref={resultsContainerRef}
          className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-6"
          id="search-modal-heading"
        >
          {/* Query < 2 chars: Show Popular Suggestions + Recent Searches */}
          {query.trim().length < 2 && (
            <div className="space-y-6">
              {recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{isHindi ? 'हाल की खोजें' : 'Recent Searches'}</span>
                    </h4>
                    <button
                      type="button"
                      onClick={clearRecentSearches}
                      className="text-xs text-slate-400 hover:text-rose-600 flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>{isHindi ? 'हटाएं' : 'Clear'}</span>
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((rec) => (
                      <button
                        key={rec}
                        type="button"
                        onClick={() => setQuery(rec)}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-[#dff0f4]/50 hover:text-[#0f3d4a] text-xs sm:text-sm text-slate-700 transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{rec}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  {isHindi ? 'लोकप्रिय विषय' : 'Frequently Consulted Clinical Topics'}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {popularSuggestions.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setQuery(item)}
                      className="flex items-center justify-between p-2.5 rounded-lg text-left text-xs sm:text-sm font-medium text-slate-700 bg-slate-50 hover:bg-[#dff0f4]/50 hover:text-[#0f3d4a] transition-colors group cursor-pointer border border-slate-100"
                    >
                      <span>{item}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0f3d4a] group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Zero Results State */}
          {query.trim().length >= 2 && !isSearching && results.length === 0 && (
            <div className="text-center py-8 px-4">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-400">
                <Search className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-800 mb-1">
                {isHindi ? `"${query}" के लिए कोई परिणाम नहीं मिला` : `No results found for "${query}"`}
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto mb-4">
                {isHindi
                  ? 'कृपया स्पेलिंग जांचें या नीचे दिए गए मुख्य विषयों में से चुनें।'
                  : 'Try checking your spelling or browse popular clinical topics below.'}
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {popularSuggestions.slice(0, 4).map((sugg) => (
                  <button
                    key={sugg}
                    type="button"
                    onClick={() => setQuery(sugg)}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-[#dff0f4]/50 text-xs font-medium text-slate-700 hover:text-[#0f3d4a] transition-colors cursor-pointer"
                  >
                    {sugg}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results List Grouped by Category */}
          {query.trim().length >= 2 && results.length > 0 && (
            <div className="space-y-5">
              <div className="flex items-center justify-between text-xs text-slate-500 pb-1 border-b border-slate-100">
                <span>
                  {isHindi
                    ? `${results.length} परिणाम मिले`
                    : `Showing ${results.length} results`}
                </span>
                <span>
                  {isHindi
                    ? '↑↓ नेविगेट करें | Enter खोलें'
                    : 'Use ↑↓ to navigate | Enter to select'}
                </span>
              </div>

              {groupedResults.map((group) => {
                const IconComponent = CATEGORY_ICONS[group.category] || Activity;
                return (
                  <div key={group.category} className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#0f3d4a] uppercase tracking-wider">
                      <IconComponent className="w-3.5 h-3.5" />
                      <span>{group.label}</span>
                      <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-full font-semibold">
                        {group.items.length}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      {group.items.map((item) => {
                        const globalIndex = results.indexOf(item);
                        const isSelected = globalIndex === selectedIndex;
                        return (
                          <div
                            key={item.id}
                            role="button"
                            tabIndex={0}
                            onClick={() => handleSelectResult(item)}
                            onMouseEnter={() => setSelectedIndex(globalIndex)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleSelectResult(item);
                            }}
                            className={`p-3 rounded-xl transition-all cursor-pointer border text-left ${
                              isSelected
                                ? 'bg-[#dff0f4]/50 border-[#0f3d4a]/30 shadow-xs'
                                : 'bg-white hover:bg-slate-50 border-slate-100'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1 min-w-0">
                                <h5 className="text-sm font-bold text-slate-900 tracking-tight leading-snug">
                                  {highlightMatch(item.title, query)}
                                </h5>
                                {item.snippet && (
                                  <p className="text-xs text-slate-600 line-clamp-2 mt-1 leading-relaxed">
                                    {highlightMatch(item.snippet, query)}
                                  </p>
                                )}
                              </div>
                              <ArrowRight
                                className={`w-4 h-4 shrink-0 transition-transform mt-0.5 ${
                                  isSelected
                                    ? 'text-[#0f3d4a] translate-x-1'
                                    : 'text-slate-400'
                                }`}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Footer with Keyboard Shortcuts */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-mono shadow-2xs">
                ESC
              </kbd>{' '}
              {isHindi ? 'बंद करें' : 'to close'}
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-mono shadow-2xs">
                ↵
              </kbd>{' '}
              {isHindi ? 'चुनें' : 'to select'}
            </span>
          </div>
          <span className="text-[11px] text-slate-400">
            {isHindi ? 'स्मार्ट मेडिकल सर्च' : 'Smart Clinical Search'}
          </span>
        </div>
      </div>
    </div>
  );
};
