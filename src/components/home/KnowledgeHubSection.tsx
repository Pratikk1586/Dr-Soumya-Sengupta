import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { Section } from '../common/Section';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { useLanguage } from '../../context/useLanguage';
import { useService } from '../../hooks/useService';
import { articleService } from '../../services';

export const KnowledgeHubSection: React.FC = () => {
  const { localize, language } = useLanguage();
  const { data: articles, isLoading } = useService(() => articleService.getArticles(), []);

  const featuredArticle = articles?.[0];
  const otherArticles = articles?.slice(1, 4) || [];

  return (
    <Section
      eyebrow="Evidence-Based Education"
      heading="Patient Knowledge Hub"
      lede="Empowering individuals and caregivers with clear, scientifically grounded clinical guides on blood sugar management, nutrition, and organ preservation."
      containerSize="xl"
      className="bg-white border-b border-slate-200/80"
    >
      {isLoading ? (
        <div className="py-12 text-center text-sm text-slate-500">Loading educational articles...</div>
      ) : (
        <div className="space-y-8">
          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            {/* Featured Article Card */}
            {featuredArticle && (
              <div className="lg:col-span-7 flex">
                <Card
                  hoverable
                  padding="lg"
                  className="w-full flex flex-col justify-between border-slate-200/90 shadow-sm bg-gradient-to-br from-teal-50/30 via-white to-amber-50/20"
                >
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <Badge variant="primary" size="sm">
                        <Sparkles className="w-3 h-3 mr-1" />
                        <span>Featured Clinical Guide</span>
                      </Badge>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{featuredArticle.readTimeMinutes} min read</span>
                      </div>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
                      {localize(featuredArticle.title)}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {localize(featuredArticle.excerpt)}
                    </p>

                    {/* Key Takeaways preview */}
                    <div className="p-4 rounded-xl bg-white border border-slate-200/80 space-y-2">
                      <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider block">
                        Key Clinical Takeaways:
                      </span>
                      <ul className="space-y-1 text-xs text-slate-600">
                        {featuredArticle.keyTakeaways.slice(0, 2).map((takeaway, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-teal-600 font-bold">•</span>
                            <span>{localize(takeaway)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-400">
                      Published for general literacy
                    </span>
                    <Link
                      to={`/patient-resources/articles/${featuredArticle.slug}`}
                      className="text-xs font-semibold text-[#103F4A] hover:underline flex items-center gap-1"
                    >
                      <span>Read Full Guide</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </Card>
              </div>
            )}

            {/* Recent Articles Column */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-4">
              {otherArticles.map((art) => (
                <Card
                  key={art.id}
                  hoverable
                  padding="md"
                  className="border-slate-200/90 shadow-2xs hover:shadow-sm transition-all duration-200 flex flex-col justify-between bg-white"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-teal-800 bg-teal-50 px-2 py-0.5 rounded text-[11px]">
                        {localize(art.category)}
                      </span>
                      <span className="text-slate-600 text-[11px] font-medium">
                        {art.readTimeMinutes} min read
                      </span>
                    </div>

                    <h4 className="font-bold text-slate-900 text-sm leading-snug line-clamp-2">
                      {localize(art.title)}
                    </h4>

                    <p className="text-xs text-slate-600 line-clamp-2">
                      {localize(art.excerpt)}
                    </p>
                  </div>

                  <div className="pt-3 mt-2 border-t border-slate-100 flex justify-end">
                    <Link
                      to={`/patient-resources/articles/${art.slug}`}
                      className="text-xs font-semibold text-[#103F4A] hover:underline flex items-center gap-1"
                    >
                      <span>Read Guide</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="pt-4 text-center">
            <Link to="/patient-resources/articles">
              <Button variant="outline" size="md">
                <BookOpen className="w-4 h-4 mr-2" />
                <span>
                  {language === 'hi' ? 'सभी 8 क्लिनिकल लेख देखें' : 'Browse All 8 Clinical Articles'}
                </span>
              </Button>
            </Link>
          </div>
        </div>
      )}
    </Section>
  );
};
