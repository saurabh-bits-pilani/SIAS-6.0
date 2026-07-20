#!/usr/bin/env node
// Build a full-site plain-text export for LLM crawlers after prerender.
// This version covers every published route and writes both the deployable
// artifact and a local reference copy with a clear update date.

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ROUTES } from './prerender.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const OUT_PATHS = [
  path.join(DIST, 'llms-full.txt'),
  path.join(DIST, 'llms-full.text'),
  path.join(ROOT, 'LLMs-text', 'llms-full.text'),
];

const SITE_URL =
  (process.env.VITE_SITE_URL || process.env.VITE_SITE_ORIGIN || 'https://www.soulinfinity.space').replace(/\/$/, '');

const BUILD_DATE = new Date();
const UPDATED_ON = BUILD_DATE.toISOString().slice(0, 10);

function routeToDistPath(route) {
  if (route === '/') return path.join(DIST, 'index.html');
  return path.join(DIST, route, 'index.html');
}

function extractTitle(html, route) {
  const match = html.match(/<title>([\s\S]*?)<\/title>/i);
  return match?.[1]?.trim() || (route === '/' ? 'Home' : route);
}

function extractDescription(html) {
  const match = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["'][^>]*>/i);
  return match?.[1]?.trim() || '';
}

function extractText(html) {
  const mainMatch = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i);
  const scoped = mainMatch ? mainMatch[1] : html;
  return (
    scoped
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<svg\b[^>]*>[\s\S]*?<\/svg>/gi, '')
      .replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi, '')
      .replace(/<\/(p|div|section|article|li|h[1-6]|blockquote|br|ul|ol)>/gi, '\n')
      .replace(/<br\s*\/?\s*>/gi, '\n')
      .replace(/<[^>]+>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#x27;/g, "'")
      .replace(/&#39;/g, "'")
      .replace(/[ \t]+/g, ' ')
      .replace(/\n[ \t]+/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim()
  );
}

async function main() {
  const publishedRoutes = ROUTES.filter((route) => route !== '/404');
  const parts = [
    '# Soul Infinity - Full LLM Content Export',
    '',
    `Canonical site: ${SITE_URL}`,
    `Last updated: ${UPDATED_ON}`,
    `Coverage: ${publishedRoutes.length} published routes`,
    '',
    'This file concatenates the plain-text content of every published route',
    'so LLM crawlers can read the site in one fetch while still preserving',
    'route-by-route boundaries.',
    '',
    '---',
    '',
  ];

  let included = 0;
  let skipped = 0;

  for (const route of publishedRoutes) {
    const file = routeToDistPath(route);
    try {
      const html = await fs.readFile(file, 'utf-8');
      const title = extractTitle(html, route);
      const description = extractDescription(html);
      const text = extractText(html);
      const url = route === '/' ? `${SITE_URL}/` : `${SITE_URL}${route}`;

      parts.push(`## ${title}`);
      parts.push(`Route: ${route}`);
      parts.push(`URL: ${url}`);
      if (description) {
        parts.push(`Description: ${description}`);
      }
      parts.push('');
      parts.push(text);
      parts.push('');
      parts.push('---');
      parts.push('');
      included += 1;
    } catch (err) {
      skipped += 1;
      console.warn(`[llms-full] skipped ${route}: ${err.message}`);
    }
  }

  const body = parts.join('\n');
  await Promise.all(
    OUT_PATHS.map(async (outPath) => {
      await fs.mkdir(path.dirname(outPath), { recursive: true });
      await fs.writeFile(outPath, body, 'utf-8');
    }),
  );

  console.log(
    `Generated full llms export with ${included} route(s), ${skipped} skipped, ${body.length.toLocaleString()} chars at ${OUT_PATHS.join(', ')}`,
  );
}

main().catch((err) => {
  console.error('llms-full.txt generation failed:', err);
  process.exit(1);
});
