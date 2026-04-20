import { onCLS, onFCP, onINP, onLCP, onTTFB, type Metric } from 'web-vitals';
import { isAnalyticsEnabled, trackEvent } from './analytics';

/**
 * Core Web Vitals telemetry. Dispatches each metric to GA4 via
 * trackEvent when analytics is enabled; falls back to a console.log
 * in dev/staging so the numbers stay visible during local work.
 *
 * Events are sent with `non_interaction: true` so they never inflate
 * engagement metrics, and the metric id is forwarded so GA can
 * de-duplicate values within a session.
 */

type RatingColour = 'good' | 'needs-improvement' | 'poor';

const RATING_EMOJI: Record<RatingColour, string> = {
  good: '✅',
  'needs-improvement': '⚠️',
  poor: '❌',
};

function reportMetric(metric: Metric): void {
  const isCls = metric.name === 'CLS';
  // GA convention: CLS is multiplied by 1000 so the integer shows
  // nicely in reports. Other metrics are already in milliseconds.
  const gaValue = isCls ? Math.round(metric.value * 1000) : Math.round(metric.value);

  if (isAnalyticsEnabled()) {
    trackEvent(metric.name, {
      value: gaValue,
      metric_id: metric.id,
      metric_value: metric.value,
      metric_delta: metric.delta,
      metric_rating: metric.rating,
      event_category: 'Web Vitals',
      non_interaction: true,
    });
    return;
  }

  const valueLabel = isCls ? metric.value.toFixed(3) : `${Math.round(metric.value)}ms`;
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
