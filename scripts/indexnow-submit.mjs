#!/usr/bin/env node
// Submit every URL from public/sitemap.xml to IndexNow so Bing, Yandex, Naver,
// and Seznam hear about the latest deploy. Zero-dep; regex-extracts <loc>
// entries from the sitemap.
//
// Failure mode: IndexNow outages, rate-limits, or ownership-verification
// glitches MUST NOT break CI. This script logs errors verbosely and exits 0
// unless something upstream is broken (missing sitemap, no URLs). SEO
// self-heals on the next push.

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// IndexNow keys are public — they identify the site, not a secret. The key
// file at /<KEY>.txt must contain this exact string byte-for-byte (no
// trailing newline, no BOM) — search engines do a strict equality check.
const KEY = '9d4e5c7a8b6f4a3d9e1c2b5a7d8e0f1c';
const SITE_ENV = process.env.VITE_SITE_ENV === 'production' ? 'production' : 'staging';
// Prefer VITE_SITE_URL (canonical origin) over legacy INDEXNOW_HOST var.
const SITE_URL_RAW =
  process.env.VITE_SITE_URL ||
  (process.env.INDEXNOW_HOST ? `https://${process.env.INDEXNOW_HOST}` : 'https://soul-infinity-liard.vercel.app');
const SITE_URL = SITE_URL_RAW.replace(/\/$/, '');
const HOST = SITE_URL.replace(/^https?:\/\//, '');
const KEY_LOCATION = `${SITE_URL}/${KEY}.txt`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';

/** Log and exit 0 — keeps CI green even when IndexNow is unhappy. */
function softFail(message, detail) {
  console.warn(`[IndexNow] ${message}`);
  if (detail) console.warn(detail);
  console.warn('[IndexNow] Submission failed but continuing — SEO will self-heal on next push.');
  process.exit(0);
}

/** Verify local key file matches the hardcoded KEY. Drift = broken IndexNow. */
async function verifyLocalKeyFile() {
  const filePath = path.join(ROOT, 'public', `${KEY}.txt`);
  try {
    const contents = await fs.readFile(filePath, 'utf-8');
    if (contents !== KEY) {
      console.warn(
        `[IndexNow] WARNING: public/${KEY}.txt does not match KEY byte-for-byte.`,
      );
      console.warn(`  file bytes (${contents.length}): ${JSON.stringify(contents)}`);
      console.warn(`  expected (${KEY.length}): ${JSON.stringify(KEY)}`);
      console.warn('  IndexNow will reject ownership until this is fixed.');
    } else {
      console.log(`[IndexNow] Local key file verified (${contents.length} bytes, exact match).`);
    }
  } catch (err) {
    console.warn(`[IndexNow] WARNING: could not read public/${KEY}.txt — ${err.message}`);
  }
}

async function main() {
  if (SITE_ENV !== 'production') {
    console.log(
      `[IndexNow] VITE_SITE_ENV=${SITE_ENV} — skipping submission. IndexNow only runs on production deploys to avoid wasting quota on preview/staging URLs.`,
    );
    process.exit(0);
  }

  await verifyLocalKeyFile();

  const sitemapPath = path.join(ROOT, 'public', 'sitemap.xml');
  let xml;
  try {
    xml = await fs.readFile(sitemapPath, 'utf-8');
  } catch (err) {
    // Missing sitemap is an upstream pipeline bug — fail loudly.
    console.error(`[IndexNow] sitemap.xml not found at ${sitemapPath}`);
    console.error(err.message);
    process.exit(1);
  }

  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (urls.length === 0) {
    console.error('[IndexNow] No <loc> entries found in sitemap.xml — aborting.');
    process.exit(1);
  }

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  };

  console.log(`[IndexNow] Submitting ${urls.length} URL(s) for ${HOST}…`);

  let res;
  try {
    res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'content-type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    softFail('Network error contacting IndexNow endpoint.', err.message);
    return;
  }

  const body = await res.text().catch(() => '');

  if (res.ok) {
    console.log(`[IndexNow] Accepted (HTTP ${res.status}).`);
    if (body) console.log(body);
    return;
  }

  // Non-2xx: log the full error so future diagnostics are easy, but exit 0.
  softFail(
    `Submission rejected (HTTP ${res.status} ${res.statusText}).`,
    body || '(empty body)',
  );
}

main().catch((err) => {
  softFail('Submit script crashed unexpectedly.', err?.stack || String(err));
});
