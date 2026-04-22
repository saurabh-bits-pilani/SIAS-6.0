#!/usr/bin/env node
// Regenerate public/robots.txt based on deploy environment.
//
// Resolution order (first match wins):
//   1. VERCEL_ENV=production → real production robots.txt (allow all + AI
//      crawlers + Sitemap reference). Set automatically by Vercel on
//      production deployments.
//   2. VERCEL_ENV=preview | development → staging robots.txt (Disallow: /).
//      Prevents preview URLs from leaking into search indexes even when
//      the project inherits VITE_SITE_ENV=production from production env.
//   3. Fallback (no VERCEL_ENV, e.g. local builds or non-Vercel CI):
//      VITE_SITE_ENV=production → production template, else staging.
//
// Matches the noindex meta tag emitted by SEOHead when IS_STAGING is true
// (src/components/SEOHead.tsx) — both derive from the same logic in
// src/config/site.ts. robots.txt is the first-line defence, the meta tag
// catches anything that does fetch.

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_PATH = path.resolve(__dirname, '..', 'public', 'robots.txt');

function resolveSiteEnv() {
  const vercelEnv = process.env.VERCEL_ENV;
  if (vercelEnv) return vercelEnv === 'production' ? 'production' : 'staging';
  return process.env.VITE_SITE_ENV === 'production' ? 'production' : 'staging';
}

const SITE_ENV = resolveSiteEnv();
const SITE_URL =
  (process.env.VITE_SITE_URL || process.env.VITE_SITE_ORIGIN || 'https://soul-infinity-liard.vercel.app').replace(/\/$/, '');

const PRODUCTION_TEMPLATE = `# Soul Infinity — robots.txt (production)
# Explicit per-crawler policy. Groups separated by blank lines per RFC 9309.

# AI / LLM crawlers — explicitly allowed.
# Being cited by AI assistants drives brand awareness; reconsider only if
# training-data concerns outweigh discovery benefit.

User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: CCBot
Allow: /

User-agent: Bytespider
Allow: /

# Default: allow indexing of public content, disallow internal paths
# (reserved even though not currently implemented — prevents accidental
# indexing if these routes are added later).
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /drafts/
Disallow: /private/

Sitemap: ${SITE_URL}/sitemap.xml
`;

const STAGING_TEMPLATE = `# Soul Infinity — robots.txt (STAGING — do not index)
# This deployment exists for pre-production preview only. Canonical tags
# on every page point to the production origin.

User-agent: *
Disallow: /
`;

async function main() {
  const body = SITE_ENV === 'production' ? PRODUCTION_TEMPLATE : STAGING_TEMPLATE;
  await fs.writeFile(OUT_PATH, body, 'utf-8');
  const vercelEnv = process.env.VERCEL_ENV || '(unset)';
  console.log(
    `Generated public/robots.txt for env=${SITE_ENV} ` +
      `(VERCEL_ENV=${vercelEnv}, origin: ${SITE_URL})`,
  );
}

main().catch((err) => {
  console.error('robots.txt generation failed:', err);
  process.exit(1);
});
