import { describe, it, expect } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import SEOHead from './SEOHead';

function renderAt(path: string, ui: React.ReactElement) {
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[path]}>{ui}</MemoryRouter>
    </HelmetProvider>,
  );
}

describe('SEOHead', () => {
  it('writes the per-route title into document.title', async () => {
    renderAt('/contact', <SEOHead title="Contact Page" />);
    await waitFor(() => expect(document.title).toBe('Contact Page'));
  });

  it('writes a canonical tag whose URL tracks the current route', async () => {
    renderAt('/gallery/pitra-dosh', <SEOHead title="Pitra Dosh" />);
    await waitFor(() => {
      const canonical = document.querySelector('link[rel="canonical"]');
      expect(canonical?.getAttribute('href')).toMatch(/\/gallery\/pitra-dosh$/);
    });
  });

  it('writes OG tags matching title and description', async () => {
    renderAt(
      '/services',
      <SEOHead title="Services" description="Our Services" />,
    );
    await waitFor(() => {
      expect(
        document
          .querySelector('meta[property="og:title"]')
          ?.getAttribute('content'),
      ).toBe('Services');
      expect(
        document
          .querySelector('meta[property="og:description"]')
          ?.getAttribute('content'),
      ).toBe('Our Services');
    });
  });

  it('emits noindex when the robots prop overrides the default', async () => {
    renderAt('/404', <SEOHead title="Not Found" robots="noindex, follow" />);
    await waitFor(() => {
      expect(
        document.querySelector('meta[name="robots"]')?.getAttribute('content'),
      ).toBe('noindex, follow');
    });
  });

  it('injects a LocalBusiness JSON-LD script with canonical NAP', async () => {
    renderAt('/', <SEOHead />);
    await waitFor(() => {
      const script = document.querySelector(
        'script[type="application/ld+json"]',
      );
      expect(script).not.toBeNull();
      const parsed = JSON.parse(script?.textContent ?? '{}');
      // @type is now an array so Google can treat it as both
      // ProfessionalService and LocalBusiness.
      expect(parsed['@type']).toEqual(['ProfessionalService', 'LocalBusiness']);
      expect(parsed.name).toBe('Soul Infinity Astro Solutions');
      expect(parsed.address?.postalCode).toBe('382501');
      // Person is a separate entity; LocalBusiness references it by @id.
      expect(parsed.founder?.['@id']).toContain('#saurabh-jain');
    });
  });

  it('omits the default LocalBusiness schema when omitDefaultSchema is set', async () => {
    renderAt('/', <SEOHead omitDefaultSchema />);
    await waitFor(() => {
      // With no explicit schemas prop and omitDefaultSchema, SEOHead emits
      // no JSON-LD, the page's <SchemaMarkup /> is expected to handle it.
      expect(
        document.querySelector('script[type="application/ld+json"]'),
      ).toBeNull();
    });
  });
});
