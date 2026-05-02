/**
 * Google Analytics 4 wiring.
 *
 * Behaviour summary:
 *  - Loads gtag.js only when VITE_GA_MEASUREMENT_ID is set AND the env is
 *    production AND the visitor has not opted into Do-Not-Track. Staging
 *    deploys never emit analytics (so real dashboards stay clean).
 *  - Exposes `trackEvent(name, params)` and `trackPageView(path, title)`
 *    as the only public surface. Components import these rather than
 *    touching `window.gtag` directly.
 *  - Idempotent: calling `initAnalytics()` more than once is a no-op.
 *  - SSR-safe: every public function checks for `window` before running.
 */

import { IS_PRODUCTION } from '../config/site';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GA_ID_PATTERN = /^G-[A-Z0-9]+$/;

/**
 * Canonical production GA4 measurement ID.
 *
 * Hardcoded as a fallback because GA4 measurement IDs are public (they
 * appear in plaintext in every HTML that loads gtag.js, not a secret)
 * and because Vite statically replaces `import.meta.env.VITE_*` at build
 * time. If the env var is missing when Vercel builds the bundle, the
 * minifier dead-code-eliminates the entire loader. The hardcoded default
 * makes production GA resilient to Vercel env-var drift; the env var,
 * when set, still takes precedence for rotations or staging-like overrides.
 */
const DEFAULT_GA_ID = 'G-C933H43FB7';

/** Module-scoped cache so `trackEvent` et al. can short-circuit when GA never loaded. */
let gaEnabled = false;
let measurementIdResolved: string | null = null;

function getMeasurementId(): string | null {
  const raw = import.meta.env.VITE_GA_MEASUREMENT_ID;
  const candidate =
    typeof raw === 'string' && raw.length > 0 ? raw : DEFAULT_GA_ID;
  if (!GA_ID_PATTERN.test(candidate)) return null;
  return candidate;
}

/**
 * Respect Do-Not-Track when the browser advertises it. Note that DNT is
 * legally non-binding and most browsers dropped the UI, but honouring it
 * is a cheap courtesy.
 */
function isDoNotTrackEnabled(): boolean {
  if (typeof navigator === 'undefined') return false;
  const dnt =
    // Standard
    (navigator as Navigator & { doNotTrack?: string | null }).doNotTrack ??
    // Legacy IE / Edge
    (window as Window & { doNotTrack?: string | null }).doNotTrack ??
    null;
  return dnt === '1' || dnt === 'yes';
}

/**
 * Inject the GA4 loader and configure gtag. Called once from main.tsx.
 *
 * Gates:
 *   1. Browser (not SSR)
 *   2. Production environment (VITE_SITE_ENV=production)
 *   3. Measurement ID matches G-XXXX format
 *   4. Visitor has not enabled Do-Not-Track
 */
export function initAnalytics(): void {
  if (typeof window === 'undefined') return;
  if (!IS_PRODUCTION) return;
  if (isDoNotTrackEnabled()) return;

  const measurementId = getMeasurementId();
  if (!measurementId) return;
  if (document.querySelector(`script[data-ga-id="${measurementId}"]`)) {
    // Loader already present (HMR or double-init). Ensure our flags match.
    gaEnabled = true;
    measurementIdResolved = measurementId;
    return;
  }

  const loader = document.createElement('script');
  loader.async = true;
  loader.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  loader.dataset.gaId = measurementId;
  document.head.appendChild(loader);

  window.dataLayer = window.dataLayer ?? [];
  const gtag: (...args: unknown[]) => void = (...args) => {
    window.dataLayer?.push(args);
  };
  window.gtag = gtag;
  gtag('js', new Date());
  // `send_page_view: false`, SPA route tracking handles page_view via
  // trackPageView() on route change. Letting gtag auto-fire here would
  // double-count the initial landing.
  gtag('config', measurementId, { send_page_view: false });

  gaEnabled = true;
  measurementIdResolved = measurementId;

  // Fire the initial page_view explicitly so the landing route is counted
  // before the first route change.
  trackPageView(window.location.pathname + window.location.search, document.title);
}

/** Typed payload for trackEvent. GA4 accepts arbitrary string/number params. */
export type EventParams = Record<string, string | number | boolean | undefined>;

/**
 * Send a GA4 event. Safe to call even when analytics is disabled (staging,
 * DNT, SSR), it simply no-ops.
 */
export function trackEvent(name: string, params: EventParams = {}): void {
  if (typeof window === 'undefined') return;
  if (!gaEnabled || typeof window.gtag !== 'function') return;
  window.gtag('event', name, params);
}

/**
 * Send a GA4 page_view. Call from the SPA route-change hook.
 * `page_path` should include the search string; `page_title` defaults to
 * the current document.title at call time.
 */
export function trackPageView(path: string, title?: string): void {
  if (typeof window === 'undefined') return;
  if (!gaEnabled || typeof window.gtag !== 'function') return;
  if (!measurementIdResolved) return;
  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: title ?? document.title,
    page_location: window.location.origin + path,
    send_to: measurementIdResolved,
  });
}

/** Expose for tests + web-vitals util; not for component use. */
export function isAnalyticsEnabled(): boolean {
  return gaEnabled;
}

/** Test-only reset. Not exported from the package index. */
export function __resetForTests(): void {
  gaEnabled = false;
  measurementIdResolved = null;
}
