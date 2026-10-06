import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, FileText, HelpCircle, Video, FileCheck, ArrowRight } from 'lucide-react';
import { SEO } from '../../components/common/SEO';
import { Container } from '../../components/common/Container';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { MedicalDisclaimerBanner } from '../../components/common/MedicalDisclaimerBanner';
import { useLanguage } from '../../context/useLanguage';

export const ResourcesHubPage: React.FC = () => {
  const { t } = useLanguage();

  const sections = [
    {
      title: 'Clinical Articles',
      description: 'Physician-reviewed deep dives on HbA1c, hypoglycemia, CGM trends, and kidney protection.',
      href: '/patient-resources/articles',
      icon: FileText,
      badge: 'Articles',
    },
    {
      title: 'Frequently Asked Questions (FAQs)',
      description: 'Answers to common patient inquiries regarding remission, insulin fear, and fasting rules.',
      href: '/patient-resources/faqs',
      icon: HelpCircle,
      badge: 'Q&A',
    },
    {
      title: 'Educational Videos',
      description: 'Visual guides explaining continuous glucose monitoring sensor placement and daily routines.',
      href: '/patient-resources/videos',
      icon: Video,
      badge: 'Media',
    },
    {
      title: 'Understanding Lab Reports',
      description: 'Breakdowns of critical biomarkers: HbA1c, spot uACR, and atherogenic lipid profiles.',
      href: '/patient-resources/reports',
      icon: FileCheck,
      badge: 'Diagnostics',
    },
    {
      title: 'Patient Self-Care Guides',
      description: 'Practical step-by-step guides for morning test preparation and daily diabetic foot care.',
      href: '/patient-resources/guides',
      icon: BookOpen,
      badge: 'Guides',
    },
  ];

  return (
    <>
      <SEO
        title="Patient Resources & Knowledge Hub — Dr. Soumya Sengupta"
        description="Comprehensive diabetes education library: Articles, FAQs, video guides, lab report explanations, and self-care instructions."
        canonicalPath="/patient-resources"
      />

      <div className="bg-[#faf9f6] border-b border-slate-200">
        <Container size="xl">
          <Breadcrumb items={[{ label: t('nav.patientResources') }]} />
          <div className="py-6 sm:py-10 max-w-3xl space-y-3">
            <Badge variant="primary">Education & Literacy</Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#06181f] tracking-tight">
              Patient Knowledge Hub & Self-Care Resources
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Empowering individuals and families through clear medical literacy, scientific guidance, and daily management tools.
            </p>
          </div>
        </Container>
      </div>

      <Container size="xl" className="py-12 space-y-12">
        <MedicalDisclaimerBanner />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((sec, idx) => {
            const Icon = sec.icon;
            return (
              <Card key={idx} hoverable padding="lg" className="flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-[#dff0f4] text-[#0a252f] flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#0f3d4a]" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">{sec.title}</h2>
                    <Badge variant="neutral" size="sm" className="mt-1">
                      {sec.badge}
                    </Badge>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {sec.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100">
                  <Link
                    to={sec.href}
                    className="text-xs font-semibold text-[#0f3d4a] hover:underline flex items-center justify-between"
                  >
                    <span>Browse Section</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </Container>
    </>
  );
};
