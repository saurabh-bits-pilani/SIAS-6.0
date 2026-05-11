import { StrictMode, useEffect } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import { initAnalytics } from './utils/analytics';
import { initWebVitals } from './utils/web-vitals';
import './index.css';

initWebVitals();

if (import.meta.env.DEV) {
  console.info('[fonts] 12 font families loaded. Monitor Core Web Vitals for performance impact.');
}

const container = document.getElementById('root')!;

const DeferredAnalytics = () => {
  useEffect(() => {
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
    };
    const schedule = (cb: () => void) =>
      typeof w.requestIdleCallback === 'function'
        ? w.requestIdleCallback(cb, { timeout: 3000 })
        : window.setTimeout(cb, 1500);
    schedule(initAnalytics);
  }, []);

  return null;
};

const tree = (
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <HelmetProvider>
          <DeferredAnalytics />
          <App />
        </HelmetProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);

if (container.hasChildNodes()) {
  hydrateRoot(container, tree);
} else {
  createRoot(container).render(tree);
}
