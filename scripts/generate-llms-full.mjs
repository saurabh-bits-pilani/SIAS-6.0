#!/usr/bin/env node
// Build dist/llms-full.txt — a plain-text concatenation of the key
// prerendered pages so LLM crawlers (ChatGPT, Perplexity, Claude) can
// ingest the full site in a single fetch.
//
// Runs AFTER prerender because it reads dist/<route>/index.html.
// Target size: under ~60,000 chars (~15k tokens) so it fits in a
// reasonable context window without chunking.

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const OUT_PATH = path.join(DIST, 'llms-full.txt');

const SITE_URL =
  (process.env.VITE_SITE_URL || process.env.VITE_SITE_ORIGIN || 'https://soul-infinity-liard.vercel.app').replace(/\/$/, '');

// Pages to include, in reading order. Home first, then about, services,
// flagship content.
const INCLUDE_ROUTES = [
  '/',
  '/cosmic-guide',
  '/services',
  '/services/vedic-astrology',
  '/services/vedic-astrology/parashari-jyotish',
  '/services/vedic-astrology/bnn',
  '/services/vedic-astrology/kp-astrology',
  '/services/vedic-astrology/astro-vastu',
  '/services/vedic-astrology/gem-stone',
  '/services/western-astrology',
  '/services/western-astrology/tarot-card',
  '/services/western-astrology/symbol-analysis',
  '/services/western-astrology/past-life-regression',
  '/services/healing',
  '/services/healing/reiki',
  '/services/healing/pranic-healing',
  '/services/healing/theta-healing',
  '/services/healing/crystal-healing',
  '/blog/mantra',
  '/gallery/pitra-dosh',
  '/contact',
];

const MAX_CHARS_PER_PAGE = 3500;
const MAX_TOTAL_CHARS = 60000;

function routeToDistPath(route) {
  if (route === '/') return path.join(DIST, 'index.html');
  return path.join(DIST, route, 'index.html');
}

/**
 * Strip <main>…</main> content down to readable plain text. Keeps headings,
 * paragraphs, and list items; drops script/style/svg. No JSDOM — simple
 * regex pass is sufficient for our prerendered markup.
 */
function extractText(html) {
  // Scope to <main> so we skip header/footer/nav repetition.
  const mainMatch = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i);
  const scoped = mainMatch ? mainMatch[1] : html;
  return (
    scoped
      // Drop script, style, svg, and noscript blocks entirely.
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<svg\b[^>]*>[\s\S]*?<\/svg>/gi, '')
      .replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi, '')
      // Convert block-level closers to newlines to preserve paragraph flow.
      .replace(/<\/(p|div|section|article|li|h[1-6]|blockquote|br)>/gi, '\n')
      .replace(/<br\s*\/?\s*>/gi, '\n')
      // Strip remaining tags.
      .replace(/<[^>]+>/g, '')
      // Decode basic entities.
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#x27;/g, "'")
      .replace(/&#39;/g, "'")
      // Collapse whitespace.
      .replace(/[ \t]+/g, ' ')
      .replace(/\n[ \t]+/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim()
  );
}

function truncate(text, max) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastBreak = cut.lastIndexOf('\n');
  return (lastBreak > max * 0.8 ? cut.slice(0, lastBreak) : cut) + '\n…[truncated]';
}

async function main() {
  const parts = [
    `# Soul Infinity — Full Content Dump`,
    ``,
    `Canonical site: ${SITE_URL}`,
    `Generated: ${new Date().toISOString()}`,
    ``,
    `This file concatenates the primary on-site content to make it cheap`,
    `for LLM crawlers to ingest the whole site in a single fetch. See`,
    `${SITE_URL}/llms.txt for a structured index.`,
    ``,
    `---`,
    ``,
  ];

  let totalChars = parts.join('\n').length;
  let included = 0;
  let skipped = 0;

  for (const route of INCLUDE_ROUTES) {
    const file = routeToDistPath(route);
    try {
      const html = await fs.readFile(file, 'utf-8');
      const text = truncate(extractText(html), MAX_CHARS_PER_PAGE);
      const header = `\n## ${route === '/' ? '/' : route}\nSource: ${SITE_URL}${route === '/' ? '/' : route}\n\n`;
      const section = header + text + '\n\n---\n';
      if (totalChars + section.length > MAX_TOTAL_CHARS) {
        console.warn(`[llms-full] hit total budget before ${route} — stopping.`);
        skipped++;
        break;
      }
      parts.push(section);
      totalChars += section.length;
      included++;
    } catch (err) {
      console.warn(`[llms-full] skipped ${route}: ${err.message}`);
      skipped++;
    }
  }

  await fs.writeFile(OUT_PATH, parts.join(''), 'utf-8');
  console.log(
    `Generated dist/llms-full.txt — ${included} page(s), ${skipped} skipped, ${totalChars.toLocaleString()} chars (~${Math.round(totalChars / 4).toLocaleString()} tokens)`,
  );
}

main().catch((err) => {
  console.error('llms-full.txt generation failed:', err);
  // Not a build-breaker — just skip.
  process.exit(0);
});
