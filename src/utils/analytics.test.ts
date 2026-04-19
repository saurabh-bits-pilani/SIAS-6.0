import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

// initAnalytics reads import.meta.env at call time, so each test stubs env
// and then imports a fresh copy of the module.
describe('initAnalytics', () => {
  beforeEach(() => {
    document.head.innerHTML = '';
    delete (window as { gtag?: unknown }).gtag;
    window.dataLayer = undefined;
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it('does nothing when VITE_GA_MEASUREMENT_ID is unset', async () => {
    vi.stubEnv('VITE_GA_MEASUREMENT_ID', '');
    const { initAnalytics } = await import('./analytics');
    initAnalytics();
    expect(document.querySelector('script[data-ga-id]')).toBeNull();
    expect(window.gtag).toBeUndefined();
  });

  it('does nothing for an obviously-bogus measurement ID', async () => {
    vi.stubEnv('VITE_GA_MEASUREMENT_ID', 'totally-not-a-ga-id');
    const { initAnalytics } = await import('./analytics');
    initAnalytics();
    expect(document.querySelector('script[data-ga-id]')).toBeNull();
  });

  it('injects the loader and configures gtag when the ID matches G-XXXX format', async () => {
    vi.stubEnv('VITE_GA_MEASUREMENT_ID', 'G-ABCDEF1234');
    const { initAnalytics } = await import('./analytics');
    initAnalytics();

    const tag = document.querySelector('script[data-ga-id="G-ABCDEF1234"]');
    expect(tag).not.toBeNull();
    expect(tag?.getAttribute('src')).toContain('gtag/js?id=G-ABCDEF1234');
    expect(typeof window.gtag).toBe('function');
    expect(window.dataLayer?.length).toBeGreaterThanOrEqual(2);
  });

  it('is idempotent — calling twice does not inject a second loader', async () => {
    vi.stubEnv('VITE_GA_MEASUREMENT_ID', 'G-ABCDEF1234');
    const { initAnalytics } = await import('./analytics');
    initAnalytics();
    initAnalytics();
    expect(document.querySelectorAll('script[data-ga-id]').length).toBe(1);
  });
});
