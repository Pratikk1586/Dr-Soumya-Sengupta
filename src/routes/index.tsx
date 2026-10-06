import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';

// Route-level Lazy Loading for optimal performance & Core Web Vitals
const HomePage = lazy(() => import('../pages/HomePage').then((m) => ({ default: m.HomePage })));
const AboutPage = lazy(() => import('../pages/AboutPage').then((m) => ({ default: m.AboutPage })));

// Diabetes Care Routes
const DiabetesCarePage = lazy(() =>
  import('../pages/diabetes/DiabetesCarePage').then((m) => ({ default: m.DiabetesCarePage }))
);
const ServiceDetailPage = lazy(() =>
  import('../pages/diabetes/ServiceDetailPage').then((m) => ({ default: m.ServiceDetailPage }))
);

// Conditions Routes
const ConditionsListPage = lazy(() =>
  import('../pages/conditions/ConditionsListPage').then((m) => ({ default: m.ConditionsListPage }))
);
const ConditionDetailPage = lazy(() =>
  import('../pages/conditions/ConditionDetailPage').then((m) => ({ default: m.ConditionDetailPage }))
);

// Patient Resources Routes
const ResourcesHubPage = lazy(() =>
  import('../pages/resources/ResourcesHubPage').then((m) => ({ default: m.ResourcesHubPage }))
);
const ArticlesListPage = lazy(() =>
  import('../pages/resources/ArticlesListPage').then((m) => ({ default: m.ArticlesListPage }))
);
const ArticleDetailPage = lazy(() =>
  import('../pages/resources/ArticleDetailPage').then((m) => ({ default: m.ArticleDetailPage }))
);
const FaqsPage = lazy(() =>
  import('../pages/resources/FaqsPage').then((m) => ({ default: m.FaqsPage }))
);
const VideosPage = lazy(() =>
  import('../pages/resources/VideosPage').then((m) => ({ default: m.VideosPage }))
);
const ReportsPage = lazy(() =>
  import('../pages/resources/ReportsPage').then((m) => ({ default: m.ReportsPage }))
);
const GuidesPage = lazy(() =>
  import('../pages/resources/GuidesPage').then((m) => ({ default: m.GuidesPage }))
);

// Clinic Routes
const ClinicOverviewPage = lazy(() =>
  import('../pages/clinic/ClinicOverviewPage').then((m) => ({ default: m.ClinicOverviewPage }))
);
const FacilitiesPage = lazy(() =>
  import('../pages/clinic/FacilitiesPage').then((m) => ({ default: m.FacilitiesPage }))
);
const PhotosPage = lazy(() =>
  import('../pages/clinic/PhotosPage').then((m) => ({ default: m.PhotosPage }))
);
const TimingsPage = lazy(() =>
  import('../pages/clinic/TimingsPage').then((m) => ({ default: m.TimingsPage }))
);
const LocationPage = lazy(() =>
  import('../pages/clinic/LocationPage').then((m) => ({ default: m.LocationPage }))
);

// Practice Action Routes
const ContactPage = lazy(() =>
  import('../pages/ContactPage').then((m) => ({ default: m.ContactPage }))
);
const BookAppointmentPage = lazy(() =>
  import('../pages/BookAppointmentPage').then((m) => ({ default: m.BookAppointmentPage }))
);
const PrivacyPage = lazy(() =>
  import('../pages/PrivacyPage').then((m) => ({ default: m.PrivacyPage }))
);
const DisclaimerPage = lazy(() =>
  import('../pages/DisclaimerPage').then((m) => ({ default: m.DisclaimerPage }))
);
const NotFoundPage = lazy(() =>
  import('../pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage }))
);

const PageFallback: React.FC = () => (
  <div className="min-h-[60vh] flex items-center justify-center bg-[#faf9f6]">
    <div className="flex items-center gap-3 text-[#0f3d4a] text-xs font-semibold">
      <div className="w-5 h-5 border-2 border-[#0f3d4a] border-t-transparent rounded-full animate-spin" />
      <span>Loading clinical section...</span>
    </div>
  </div>
);

export const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route element={<AppLayout />}>
          {/* Home */}
          <Route path="/" element={<HomePage />} />

          {/* About Doctor */}
          <Route path="/about" element={<AboutPage />} />

          {/* Diabetes Care */}
          <Route path="/diabetes-care" element={<DiabetesCarePage />} />
          <Route path="/diabetes-care/management" element={<ServiceDetailPage explicitSlug="management" />} />
          <Route path="/diabetes-care/prediabetes" element={<ServiceDetailPage explicitSlug="prediabetes" />} />
          <Route path="/diabetes-care/education" element={<ServiceDetailPage explicitSlug="education" />} />
          <Route path="/diabetes-care/lifestyle" element={<ServiceDetailPage explicitSlug="lifestyle" />} />
          <Route path="/diabetes-care/complications" element={<ServiceDetailPage explicitSlug="complications" />} />
          <Route path="/diabetes-care/:slug" element={<ServiceDetailPage />} />

          {/* Conditions */}
          <Route path="/conditions" element={<ConditionsListPage />} />
          <Route path="/conditions/:slug" element={<ConditionDetailPage />} />

          {/* Patient Resources */}
          <Route path="/patient-resources" element={<ResourcesHubPage />} />
          <Route path="/patient-resources/knowledge-hub" element={<ResourcesHubPage />} />
          <Route path="/patient-resources/articles" element={<ArticlesListPage />} />
          <Route path="/patient-resources/articles/:slug" element={<ArticleDetailPage />} />
          <Route path="/patient-resources/faqs" element={<FaqsPage />} />
          <Route path="/patient-resources/videos" element={<VideosPage />} />
          <Route path="/patient-resources/reports" element={<ReportsPage />} />
          <Route path="/patient-resources/guides" element={<GuidesPage />} />

          {/* Clinic & Chamber */}
          <Route path="/clinic" element={<ClinicOverviewPage />} />
          <Route path="/clinic/facilities" element={<FacilitiesPage />} />
          <Route path="/clinic/photos" element={<PhotosPage />} />
          <Route path="/clinic/timings" element={<TimingsPage />} />
          <Route path="/clinic/location" element={<LocationPage />} />

          {/* Direct Engagement */}
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/book-appointment" element={<BookAppointmentPage />} />

          {/* Legal / Policy */}
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/disclaimer" element={<DisclaimerPage />} />

          {/* Fallback 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
