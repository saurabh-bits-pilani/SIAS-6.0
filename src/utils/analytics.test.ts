import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

// initAnalytics reads import.meta.env + the IS_PRODUCTION flag at call time.
// Each test stubs env and imports a fresh copy of the module so cached
// module-level state does not leak across tests.
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

  it('falls back to the hardcoded default GA ID when env var is unset (production)', async () => {
    vi.stubEnv('VITE_SITE_ENV', 'production');
    vi.stubEnv('VITE_GA_MEASUREMENT_ID', '');
    const { initAnalytics } = await import('./analytics');
    initAnalytics();
    // Hardcoded default loads; keeps production GA resilient to Vercel
    // env-var drift. Measurement IDs are public and not a secret.
    const tag = document.querySelector('script[data-ga-id]');
    expect(tag).not.toBeNull();
    expect(tag?.getAttribute('data-ga-id')).toMatch(/^G-[A-Z0-9]+$/);
  });

  it('does nothing for an obviously-bogus measurement ID', async () => {
    vi.stubEnv('VITE_SITE_ENV', 'production');
    vi.stubEnv('VITE_GA_MEASUREMENT_ID', 'totally-not-a-ga-id');
    const { initAnalytics } = await import('./analytics');
    initAnalytics();
    expect(document.querySelector('script[data-ga-id]')).toBeNull();
  });

  it('does nothing on staging even with a valid GA ID', async () => {
    vi.stubEnv('VITE_SITE_ENV', 'staging');
    vi.stubEnv('VITE_GA_MEASUREMENT_ID', 'G-ABCDEF1234');
    const { initAnalytics } = await import('./analytics');
    initAnalytics();
    expect(document.querySelector('script[data-ga-id]')).toBeNull();
    expect(window.gtag).toBeUndefined();
  });

  it('injects the loader and configures gtag in production with a valid ID', async () => {
    vi.stubEnv('VITE_SITE_ENV', 'production');
    vi.stubEnv('VITE_GA_MEASUREMENT_ID', 'G-ABCDEF1234');
    const { initAnalytics } = await import('./analytics');
    initAnalytics();

    const tag = document.querySelector('script[data-ga-id="G-ABCDEF1234"]');
    expect(tag).not.toBeNull();
    expect(tag?.getAttribute('src')).toContain('gtag/js?id=G-ABCDEF1234');
    expect(typeof window.gtag).toBe('function');
    expect(window.dataLayer?.length).toBeGreaterThanOrEqual(2);
  });

  it('disables send_page_view so SPA route tracking drives page_view', async () => {
    vi.stubEnv('VITE_SITE_ENV', 'production');
    vi.stubEnv('VITE_GA_MEASUREMENT_ID', 'G-ABCDEF1234');
    const { initAnalytics } = await import('./analytics');
    initAnalytics();

    const configCall = window.dataLayer?.find((entry) => {
      const args = entry as unknown[];
      return Array.isArray(args) && args[0] === 'config';
    });
    expect(configCall).toBeDefined();
    const args = configCall as unknown[];
    expect(args[2]).toMatchObject({ send_page_view: false });
  });

  it('fires an initial page_view event after config', async () => {
    vi.stubEnv('VITE_SITE_ENV', 'production');
    vi.stubEnv('VITE_GA_MEASUREMENT_ID', 'G-ABCDEF1234');
    const { initAnalytics } = await import('./analytics');
    initAnalytics();

    const pageViewCall = window.dataLayer?.find((entry) => {
      const args = entry as unknown[];
      return Array.isArray(args) && args[0] === 'event' && args[1] === 'page_view';
    });
    expect(pageViewCall).toBeDefined();
  });

  it('is idempotent — calling twice does not inject a second loader', async () => {
    vi.stubEnv('VITE_SITE_ENV', 'production');
    vi.stubEnv('VITE_GA_MEASUREMENT_ID', 'G-ABCDEF1234');
    const { initAnalytics } = await import('./analytics');
    initAnalytics();
    initAnalytics();
    expect(document.querySelectorAll('script[data-ga-id]').length).toBe(1);
  });
});

describe('trackEvent / trackPageView', () => {
  beforeEach(() => {
    document.head.innerHTML = '';
    delete (window as { gtag?: unknown }).gtag;
    window.dataLayer = undefined;
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it('trackEvent no-ops when analytics was never initialised', async () => {
    vi.stubEnv('VITE_SITE_ENV', 'staging');
    vi.stubEnv('VITE_GA_MEASUREMENT_ID', 'G-ABCDEF1234');
    const { trackEvent } = await import('./analytics');
    expect(() => trackEvent('whatsapp_click', { page: '/services' })).not.toThrow();
    expect(window.dataLayer).toBeUndefined();
  });

  it('trackEvent pushes an event payload when analytics is enabled', async () => {
    vi.stubEnv('VITE_SITE_ENV', 'production');
    vi.stubEnv('VITE_GA_MEASUREMENT_ID', 'G-ABCDEF1234');
    const mod = await import('./analytics');
    mod.initAnalytics();

    const before = window.dataLayer?.length ?? 0;
    mod.trackEvent('whatsapp_click', { location: 'hero' });
    const layer = window.dataLayer ?? [];
    const last = layer[layer.length - 1] as unknown[];
    expect(layer.length).toBeGreaterThan(before);
    expect(last[0]).toBe('event');
    expect(last[1]).toBe('whatsapp_click');
    expect(last[2]).toMatchObject({ location: 'hero' });
  });

  it('trackPageView pushes a page_view event with the supplied path', async () => {
    vi.stubEnv('VITE_SITE_ENV', 'production');
    vi.stubEnv('VITE_GA_MEASUREMENT_ID', 'G-ABCDEF1234');
    const mod = await import('./analytics');
    mod.initAnalytics();

    mod.trackPageView('/services/vedic-astrology/parashari-jyotish', 'Parashari');
    const layer = window.dataLayer ?? [];
    const last = layer[layer.length - 1] as unknown[];
    expect(last[0]).toBe('event');
    expect(last[1]).toBe('page_view');
    expect(last[2]).toMatchObject({
      page_path: '/services/vedic-astrology/parashari-jyotish',
      page_title: 'Parashari',
    });
  });
});
