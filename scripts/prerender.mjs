#!/usr/bin/env node
// Prerender every route in ROUTES to dist/<route>/index.html using the SSR
// bundle produced by `vite build --ssr`. Run after `vite build` (client) and
// `vite build --ssr src/entry-server.tsx --outDir dist-ssr`.

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const SSR_ENTRY = path.join(ROOT, 'dist-ssr', 'entry-server.js');

export const ROUTES = [
  '/',
  '/services',
  '/services/vedic-astrology',
  '/services/western-astrology',
  '/services/healing',
  '/services/vedic-astrology/parashari-jyotish',
  '/services/vedic-astrology/bnn',
  '/services/vedic-astrology/kp-astrology',
  '/services/vedic-astrology/astro-vastu',
  '/services/vedic-astrology/gem-stone',
  '/services/western-astrology/tarot-card',
  '/services/western-astrology/symbol-analysis',
  '/services/western-astrology/past-life-regression',
  '/services/healing/reiki',
  '/services/healing/pranic-healing',
  '/services/healing/theta-healing',
  '/services/healing/crystal-healing',
  '/cosmic-guide',
  '/cosmic-podcast',
  '/blog',
  '/blog/mantra',
  '/gallery',
  '/gallery/remedies',
  '/gallery/pitra-dosh',
  '/panchang',
  '/planets',
  '/planets/jupiter',
  '/planets/mars',
  '/planets/mercury',
  '/planets/moon',
  '/planets/rahu',
  '/planets/saturn',
  '/planets/sun',
  '/planets/venus',
  '/zodiac',
  '/dosha',
  '/contact',
  '/privacy',
  '/404',
];

/**
 * Strip SEO tags that react-helmet-async will re-emit. We keep them in the
 * static index.html as a fallback for the SPA-rewrite case (unknown routes),
 * but for prerendered routes we want a single, correct set of tags per page.
 */
function stripTemplateSeo(tpl) {
  return tpl
    .replace(/\n\s*<title>[\s\S]*?<\/title>/i, '')
    .replace(/\n\s*<link[^>]+rel=["']canonical["'][^>]*>/gi, '')
    .replace(/\n\s*<meta[^>]+(name|property)=["'](description|keywords|robots|og:[^"']+|twitter:[^"']+)["'][^>]*>/gi, '')
    .replace(/\n\s*<script[^>]+type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi, '');
}

async function main() {
  const templatePath = path.join(DIST, 'index.html');
  const rawTemplate = await fs.readFile(templatePath, 'utf-8');
  const template = stripTemplateSeo(rawTemplate);

  const ssrUrl = pathToFileURL(SSR_ENTRY).href;
  const { render } = await import(ssrUrl);

  const results = [];
  for (const route of ROUTES) {
    const started = Date.now();
    try {
      const { html, helmetContext } = await render(route);
      const helmet = helmetContext.helmet;

      let page = template;

      // Inject rendered markup into the mount point.
      page = page.replace('<div id="root"></div>', `<div id="root">${html}</div>`);

      // Inject helmet side-effects into <head>. We replace the default title
      // and append the rest before </head>. The defaults in index.html act as
      // fallback for any route that doesn't override them.
      if (helmet) {
        const helmetTitle = helmet.title?.toString() ?? '';
        const helmetMeta = helmet.meta?.toString() ?? '';
        const helmetLink = helmet.link?.toString() ?? '';
        const helmetScript = helmet.script?.toString() ?? '';
        const helmetHtmlAttrs = helmet.htmlAttributes?.toString() ?? '';
        const helmetBodyAttrs = helmet.bodyAttributes?.toString() ?? '';

        // SEO tags were stripped from the template; inject helmet's output
        // directly before </head>. react-helmet-async marks each tag with
        // data-rh="true" so client-side hydration dedupes cleanly.
        const injection = [helmetTitle, helmetMeta, helmetLink, helmetScript]
          .filter(Boolean)
          .join('\n    ');
        if (injection) {
          page = page.replace('</head>', `    ${injection}\n  </head>`);
        }

        // html / body attributes (e.g. lang overrides)
        if (helmetHtmlAttrs) {
          page = page.replace(/<html\s+lang="en">/, `<html ${helmetHtmlAttrs}>`);
        }
        if (helmetBodyAttrs) {
          page = page.replace(/<body>/, `<body ${helmetBodyAttrs}>`);
        }
      }

      // Special case: /404 is written as dist/404.html (not dist/404/index.html)
      // so Vercel's built-in "404.html" convention serves it with a real HTTP
      // 404 status for any unmatched route. This is the cleanest way to avoid
      // the soft-404 pattern without introducing a serverless function.
      let targetPath;
      if (route === '/404') {
        targetPath = path.join(DIST, '404.html');
      } else if (route === '/') {
        targetPath = path.join(DIST, 'index.html');
      } else {
        const outDir = path.join(DIST, route);
        await fs.mkdir(outDir, { recursive: true });
        targetPath = path.join(outDir, 'index.html');
      }
      await fs.writeFile(targetPath, page);

      results.push({ route, status: 'ok', ms: Date.now() - started });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      results.push({ route, status: 'fail', ms: Date.now() - started, error: message });
    }
  }

  const padRoute = Math.max(...results.map((r) => r.route.length));
  for (const r of results) {
    const tag = r.status === 'ok' ? '  ok' : 'FAIL';
    const suffix = r.status === 'ok' ? '' : `  — ${r.error}`;
    console.log(`${tag}  ${r.route.padEnd(padRoute)}  ${String(r.ms).padStart(4)}ms${suffix}`);
  }

  const failures = results.filter((r) => r.status === 'fail');
  if (failures.length > 0) {
    console.error(`\nPrerender finished with ${failures.length} failure(s).`);
    process.exit(1);
  }
  console.log(`\nPrerendered ${results.length} routes.`);
}

// Only run when executed directly (e.g. `node scripts/prerender.mjs`), not
// when imported for its exports (e.g. generate-sitemap.mjs reuses ROUTES).
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((err) => {
    console.error('Prerender failed:', err);
    process.exit(1);
  });
}
