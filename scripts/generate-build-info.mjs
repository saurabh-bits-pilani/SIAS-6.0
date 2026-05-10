#!/usr/bin/env node
/**
 * Pre-build build-info generator.
 *
 * Why this exists:
 *   The Footer renders a "Last updated" card with the deploy date. We need
 *   the actual deploy timestamp (build time on Vercel/CI), not the visitor's
 *   current clock. Computing `new Date()` at component-render time would
 *   produce the visitor's locale-dependent today, which is wrong. So we
 *   freeze the build-time date into a JSON module that the Footer imports
 *   at module evaluation time.
 *
 * Output:
 *   src/data/build-info.json:
 *     {
 *       "buildDate": "9 May 2026",                 // en-IN, day:numeric, month:long, year:numeric
 *       "buildIso":  "2026-05-09T07:00:00.000Z"    // raw ISO for debugging / canonical sorting
 *     }
 *
 * Lifecycle:
 *   Wired into the package.json `prebuild` chain so it runs before
 *   `vite build`, alongside the blog manifest generator. On Vercel, that
 *   means the deploy time becomes the buildDate.
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT_PATH = path.join(ROOT, 'src', 'data', 'build-info.json');

async function main() {
  const now = new Date();
  // Match the format the user specified: en-IN locale, day:numeric, month:long, year:numeric
  const buildDate = new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(now);

  const payload = {
    buildDate,
    buildIso: now.toISOString(),
  };

  await fs.mkdir(path.dirname(OUT_PATH), { recursive: true });
  await fs.writeFile(OUT_PATH, JSON.stringify(payload, null, 2) + '\n', 'utf8');

  console.log(`[build-info] wrote ${path.relative(ROOT, OUT_PATH)}`);
  console.log(`[build-info]   buildDate: ${buildDate}`);
  console.log(`[build-info]   buildIso:  ${payload.buildIso}`);
}

main().catch((err) => {
  console.error('[build-info] fatal:', err);
  process.exit(1);
});
