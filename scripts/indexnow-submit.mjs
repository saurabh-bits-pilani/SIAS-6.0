#!/usr/bin/env node
// Submit every URL from public/sitemap.xml to IndexNow so Bing, Yandex, Naver,
// and Seznam hear about the latest deploy. Zero-dep; regex-extracts <loc>
// entries from the sitemap.

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// IndexNow keys are public — they identify the site, not a secret. The key
// file at /<KEY>.txt must contain this exact string and is how search
// engines verify ownership of the URLs being submitted.
const KEY = '9d4e5c7a8b6f4a3d9e1c2b5a7d8e0f1c';
const HOST = process.env.INDEXNOW_HOST || 'soul-infinitycom.vercel.app';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';

async function main() {
  const sitemapPath = path.join(ROOT, 'public', 'sitemap.xml');
  const xml = await fs.readFile(sitemapPath, 'utf-8');
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

  if (urls.length === 0) {
    console.error('No <loc> entries found in sitemap.xml — aborting.');
    process.exit(1);
  }

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  };

  console.log(`Submitting ${urls.length} URL(s) to IndexNow for ${HOST}…`);

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  });

  const body = await res.text();

  if (res.ok) {
    console.log(`IndexNow accepted the submission (HTTP ${res.status}).`);
    if (body) console.log(body);
    return;
  }

  console.error(`IndexNow rejected the submission (HTTP ${res.status}):`);
  console.error(body || '(empty body)');
  process.exit(1);
}

main().catch((err) => {
  console.error('IndexNow submit crashed:', err);
  process.exit(1);
});
