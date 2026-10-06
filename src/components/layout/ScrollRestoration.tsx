import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollRestoration(): null {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    // Scroll to top on route change
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // Focus main content landmark for screen-reader and keyboard accessibility
    const mainEl = document.getElementById('main-content');
    if (mainEl) {
      mainEl.focus({ preventScroll: true });
    }
  }, [pathname, hash]);

  return null;
}
