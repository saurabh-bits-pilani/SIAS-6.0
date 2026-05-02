/**
 * Central site configuration, single source of truth for canonical URL
 * and deploy environment.
 *
 * Env vars:
 *   VERCEL_ENV    = "production" | "preview" | "development". Vercel-injected,
 *                   authoritative when present. Preview and development both
 *                   mean staging.
 *   VITE_SITE_ENV = "staging" | "production". Legacy fallback for non-Vercel
 *                   builds (local dev, CI previews).
 *   VITE_SITE_URL = canonical origin. Used in all schemas, canonicals, OG
 *                   URLs, and sitemap locs.
 *
 * Philosophy: SITE_URL is always the *canonical production origin* regardless
 * of which deployment is serving the request. Staging deploys point their
 * canonicals here and emit noindex so Google never competes staging against
 * production. Migration to a custom domain = flip VITE_SITE_URL.
 *
 * Why prefer VERCEL_ENV over VITE_SITE_ENV? Preview deployments on Vercel
 * often inherit the production project's VITE_SITE_ENV=production, which
 * would incorrectly flag them as production. VERCEL_ENV is set per-deploy
 * by Vercel and always reflects the actual deployment type. VERCEL_ENV is
 * exposed to the client bundle via vite.config.ts → define.
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

/**
 * Derive the deploy environment. VERCEL_ENV is authoritative when present;
 * VITE_SITE_ENV is the fallback for non-Vercel builds. The default is
 * 'staging', safer to accidentally emit noindex than to accidentally
 * index a staging deployment.
 */
function deriveSiteEnv(): SiteEnv {
  const vercelEnv = readEnv('VERCEL_ENV');
  if (vercelEnv != null && vercelEnv.length > 0) {
    return vercelEnv === 'production' ? 'production' : 'staging';
  }
  const legacy = readEnv('VITE_SITE_ENV');
  return legacy === 'production' ? 'production' : 'staging';
}

export const SITE_ENV: SiteEnv = deriveSiteEnv();
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

/** True when the current deployment is staging, used to emit noindex. */
export function shouldNoindex(): boolean {
  return IS_STAGING;
}
