#!/usr/bin/env node
// Regenerate public/sitemap.xml from the single source of truth: the ROUTES
// array in scripts/prerender.mjs. Runs before vite build so Vite copies the
// fresh sitemap into dist/. Keeping it in public/ (not writing to dist/)
// means `vite dev` also serves the current sitemap at /sitemap.xml.

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ROUTES } from './prerender.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.resolve(__dirname, '..', 'public');

// Canonical origin lives in VITE_SITE_URL (set in Vercel env). Falls back
// to the expected production URL so builds outside Vercel still work.
const SITE_ORIGIN =
  process.env.VITE_SITE_URL ||
  process.env.VITE_SITE_ORIGIN ||
  'https://soul-infinity-liard.vercel.app';

// Routes excluded from the sitemap. /404 is prerendered as dist/404.html for
// Vercel's unmatched-route convention; linking it from the sitemap would make
// Google crawl it as a regular page.
const EXCLUDE = new Set(['/404']);

/**
 * Priority rules, most-specific-first. Each rule is [matcher, priority].
 * A route picks the first matching rule. Bare strings match exactly;
 * regex patterns match by .test().
 */
const PRIORITY_RULES = [
  ['/', 1.0],
  [/^\/services$/, 0.9],
  [/^\/services\/[^/]+\/[^/]+$/, 0.7], // 3-level: /services/cat/leaf
  [/^\/services\/[^/]+$/, 0.8],         // 2-level: /services/cat
  ['/contact', 0.8],
  ['/cosmic-guide', 0.8],
  [/^\/blog(\/.*)?$/, 0.7],
  [/^\/gallery\/[^/]+$/, 0.7],
  ['/gallery', 0.6],
  ['/panchang', 0.7],
  ['/cosmic-podcast', 0.6],
  ['/privacy', 0.3],
];

function priorityFor(route) {
  for (const [matcher, priority] of PRIORITY_RULES) {
    if (typeof matcher === 'string' ? matcher === route : matcher.test(route)) {
      return priority;
    }
  }
  return 0.5; // default for anything new
}

function xmlEscape(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function absoluteUrl(route) {
  // Keep trailing slash only on the root; everything else has no trailing slash.
  if (route === '/') return `${SITE_ORIGIN}/`;
  return `${SITE_ORIGIN}${route}`;
}

async function main() {
  const lastmod = new Date().toISOString().slice(0, 10);
  const routes = ROUTES.filter((r) => !EXCLUDE.has(r));

  const body = routes
    .map((route) => {
      const loc = xmlEscape(absoluteUrl(route));
      const priority = priorityFor(route).toFixed(1);
      return `  <url><loc>${loc}</loc><lastmod>${lastmod}</lastmod><priority>${priority}</priority></url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;

  await fs.writeFile(path.join(PUBLIC_DIR, 'sitemap.xml'), xml, 'utf-8');
  console.log(`Generated public/sitemap.xml with ${routes.length} URLs (origin: ${SITE_ORIGIN}, lastmod: ${lastmod})`);
}

main().catch((err) => {
  console.error('Sitemap generation failed:', err);
  process.exit(1);
});
