import { onCLS, onFCP, onINP, onLCP, onTTFB, type Metric } from 'web-vitals';

/**
 * Core Web Vitals telemetry — currently console-only. Wires the five
 * primary metrics (CLS, FCP, INP, LCP, TTFB) so we can eyeball field
 * performance during dev and when visiting production in DevTools
 * without a third-party analytics dependency.
 *
 * When an analytics destination is wired up (e.g. GA4, Vercel Analytics,
 * a custom endpoint), swap `reportMetric` to dispatch there in addition
 * to the console.log.
 */

type RatingColour = 'good' | 'needs-improvement' | 'poor';

const RATING_EMOJI: Record<RatingColour, string> = {
  good: '✅',
  'needs-improvement': '⚠️',
  poor: '❌',
};

function reportMetric(metric: Metric): void {
  // Round numeric values for legibility. LCP/TTFB/FCP/INP in ms, CLS unitless.
  const valueLabel = metric.name === 'CLS'
    ? metric.value.toFixed(3)
    : `${Math.round(metric.value)}ms`;
  const emoji = RATING_EMOJI[metric.rating] ?? '';
  // eslint-disable-next-line no-console
  console.log(
    `[web-vitals] ${emoji} ${metric.name} ${valueLabel} (${metric.rating}) · delta ${Math.round(metric.delta)} · id ${metric.id}`,
  );
}

let started = false;

/**
 * Start reporting Core Web Vitals. Safe to call multiple times — only the
 * first call registers observers. No-op on the server (typeof window === 'undefined').
 */
export function initWebVitals(): void {
  if (started) return;
  if (typeof window === 'undefined') return;
  started = true;
  onCLS(reportMetric);
  onFCP(reportMetric);
  onINP(reportMetric);
  onLCP(reportMetric);
  onTTFB(reportMetric);
}
