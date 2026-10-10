import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LanguageProvider } from './context/LanguageContext';
import { AppRoutes } from './routes';
import { ErrorBoundary } from './components/common/ErrorBoundary';

export default function App() {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <ErrorBoundary>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </ErrorBoundary>
      </LanguageProvider>
    </HelmetProvider>
  );
}
