declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GA_ID_PATTERN = /^G-[A-Z0-9]+$/;

export function initAnalytics(): void {
  if (typeof window === 'undefined') return;

  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (!measurementId || !GA_ID_PATTERN.test(measurementId)) return;
  if (document.querySelector(`script[data-ga-id="${measurementId}"]`)) return;

  const loader = document.createElement('script');
  loader.async = true;
  loader.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  loader.dataset.gaId = measurementId;
  document.head.appendChild(loader);

  window.dataLayer = window.dataLayer || [];
  const gtag: (...args: unknown[]) => void = (...args) => {
    window.dataLayer?.push(args);
  };
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', measurementId);
}

export {};
