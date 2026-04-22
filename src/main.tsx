import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import { initAnalytics } from './utils/analytics';
import { initWebVitals } from './utils/web-vitals';
import './index.css';

initAnalytics();
initWebVitals();

if (import.meta.env.DEV) {
  console.info('[fonts] 12 font families loaded. Monitor Core Web Vitals for performance impact.');
}

const container = document.getElementById('root')!;

const tree = (
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <HelmetProvider>
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
