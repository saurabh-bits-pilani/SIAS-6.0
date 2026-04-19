/**
 * Central site configuration — single source of truth for canonical URL
 * and deploy environment.
 *
 * Env vars (set in Vercel dashboard per project):
 *   VITE_SITE_ENV = "staging" | "production"   — controls robots/noindex
 *   VITE_SITE_URL = canonical origin            — used in all schemas, canonicals,
 *                                                 OG URLs, and sitemap locs
 *
 * Philosophy: SITE_URL is always the *canonical production origin* regardless
 * of which deployment is serving the request. Staging deploys point their
 * canonicals here and emit noindex so Google never competes staging against
 * production. Migration to a custom domain = flip VITE_SITE_URL.
 */

type SiteEnv = 'staging' | 'production';

/**
 * Read env vars from both Vite (`import.meta.env`) and Node
 * (`process.env`) so this module works identically in the browser
 * bundle, the SSR bundle, and build-time scripts.
 */
function readEnv(key: string): string | undefined {
  const fromVite =
    typeof import.meta !== 'undefined' &&
    import.meta.env != null &&
    typeof (import.meta.env as Record<string, unknown>)[key] === 'string'
      ? ((import.meta.env as Record<string, string>)[key] ?? undefined)
      : undefined;
  if (fromVite != null && fromVite.length > 0) return fromVite;
  if (typeof process !== 'undefined' && process.env && typeof process.env[key] === 'string') {
    return process.env[key];
  }
  return undefined;
}

const envRaw = readEnv('VITE_SITE_ENV');
export const SITE_ENV: SiteEnv = envRaw === 'production' ? 'production' : 'staging';
export const IS_STAGING = SITE_ENV === 'staging';
export const IS_PRODUCTION = SITE_ENV === 'production';

const siteUrlRaw = readEnv('VITE_SITE_URL');
/**
 * Canonical production origin. Used in <link rel="canonical">, schema.org
 * @id values, OG URLs, sitemap <loc> entries, and anywhere else a
 * user-facing URL is emitted. Always points to production, even when the
 * current deployment is staging.
 */
export const SITE_URL: string = (() => {
  const candidate = siteUrlRaw && siteUrlRaw.length > 0 ? siteUrlRaw : 'https://soul-infinity-liard.vercel.app';
  return candidate.replace(/\/$/, '');
})();

/** True when the current deployment is staging — used to emit noindex. */
export function shouldNoindex(): boolean {
  return IS_STAGING;
}
