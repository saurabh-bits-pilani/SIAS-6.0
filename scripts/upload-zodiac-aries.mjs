#!/usr/bin/env node
/**
 * One-off: convert + upload 5 Mesha (Aries) Rashi assets to R2.
 * Source dir: assets-to-upload/Aries (trailing space, kept verbatim)
 * Target path: /Zodiac/Aries/<filename>.webp
 *
 * Re-encodes at decreasing quality until each file fits its budget.
 * Reads R2 creds from .env.local. Does NOT commit anything.
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { S3Client, PutObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT, 'assets-to-upload', 'Aries '); // trailing space verbatim
const OUT_DIR = path.join(ROOT, 'assets-to-upload', '.optimized', 'Aries');
const R2_PREFIX = 'Zodiac/Aries';

const PLAN = [
  {
    role: 'hero',
    src: 'hero-banner-mesh-rashi.png',
    out: 'hero-banner-mesh-rashi.webp',
    maxBytes: 300 * 1024,
    maxWidth: 1600,
    maxHeight: null,
  },
  {
    role: 'quick-facts',
    src: 'quick-facets-mesh-rashi.png',
    out: 'quick-facets-mesh-rashi.webp',
    maxBytes: 250 * 1024,
    maxWidth: 1600,
    maxHeight: null,
  },
  {
    role: 'mantra-bg',
    src: 'mantra-bg-mesh-rashi.png',
    out: 'mantra-bg-mesh-rashi.webp',
    maxBytes: 200 * 1024,
    maxWidth: 1600,
    maxHeight: null,
  },
  {
    role: 'handwritten-scroll',
    src: 'Handwritten-scroll-mesh-rashi.png',
    out: 'Handwritten-scroll-mesh-rashi.webp',
    maxBytes: 200 * 1024,
    maxWidth: 1600,
    maxHeight: null,
    preserveAlpha: true, // scroll likely has parchment edges
  },
  {
    role: 'card-circular',
    src: 'aries-card.png',
    out: 'aries-card.webp',
    maxBytes: 150 * 1024,
    maxWidth: 800,
    maxHeight: 800,
    preserveAlpha: true, // circular card with alpha
  },
];

async function loadEnv() {
  const raw = await fs.readFile(path.join(ROOT, '.env.local'), 'utf8');
  for (const line of raw.split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const eq = t.indexOf('=');
    if (eq < 0) continue;
    const k = t.slice(0, eq).trim();
    let v = t.slice(eq + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    if (!(k in process.env)) process.env[k] = v;
  }
}

const fmtBytes = (n) =>
  n < 1024 ? `${n} B` : n < 1024 * 1024 ? `${(n / 1024).toFixed(1)} KB` : `${(n / 1024 / 1024).toFixed(2)} MB`;

async function encodeToFitBudget(srcPath, dstPath, item) {
  const qualities = [90, 85, 80, 75, 70, 65, 60, 55, 50, 45];
  let lastSize = Infinity;
  let lastQuality = null;
  for (const q of qualities) {
    await sharp(srcPath)
      .resize(item.maxWidth, item.maxHeight, { fit: 'inside', withoutEnlargement: true })
      .webp({
        quality: q,
        alphaQuality: item.preserveAlpha ? 90 : 80,
        effort: 6,
      })
      .toFile(dstPath);
    lastSize = (await fs.stat(dstPath)).size;
    lastQuality = q;
    if (lastSize <= item.maxBytes) break;
  }
  return { size: lastSize, quality: lastQuality, fits: lastSize <= item.maxBytes };
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  await loadEnv();
  const required = ['R2_ACCESS_KEY_ID', 'R2_SECRET_ACCESS_KEY', 'R2_BUCKET_NAME', 'R2_ENDPOINT', 'R2_PUBLIC_URL'];
  for (const k of required) if (!process.env[k]) throw new Error(`Missing env var: ${k}`);
  const { R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME, R2_ENDPOINT, R2_PUBLIC_URL } = process.env;

  const s3 = new S3Client({
    region: 'auto',
    endpoint: R2_ENDPOINT,
    credentials: { accessKeyId: R2_ACCESS_KEY_ID, secretAccessKey: R2_SECRET_ACCESS_KEY },
  });

  const results = [];

  console.log('\n=== Phase 1: Convert PNG -> WebP ===');
  for (const item of PLAN) {
    const srcPath = path.join(SRC_DIR, item.src);
    const dstPath = path.join(OUT_DIR, item.out);
    const origSize = (await fs.stat(srcPath)).size;
    const r = await encodeToFitBudget(srcPath, dstPath, item);
    const reduction = (((origSize - r.size) / origSize) * 100).toFixed(1);
    const meta = await sharp(dstPath).metadata();
    console.log(
      `  ${r.fits ? 'ok ' : 'WARN'} ${item.out.padEnd(38)} ${fmtBytes(origSize).padStart(10)} -> ${fmtBytes(r.size).padStart(10)} q=${r.quality} ${meta.width}x${meta.height} (-${reduction}%)`,
    );
    if (!r.fits) {
      console.log(`       budget ${fmtBytes(item.maxBytes)} exceeded at lowest q=${r.quality}; uploading anyway`);
    }
    results.push({ ...item, srcPath, dstPath, origSize, optSize: r.size, quality: r.quality, width: meta.width, height: meta.height });
  }

  console.log('\n=== Phase 2: Upload to R2 ===');
  for (const r of results) {
    const Key = `${R2_PREFIX}/${r.out}`;
    const Body = await fs.readFile(r.dstPath);
    await s3.send(
      new PutObjectCommand({
        Bucket: R2_BUCKET_NAME,
        Key,
        Body,
        ContentType: 'image/webp',
        CacheControl: 'public, max-age=31536000, immutable',
      }),
    );
    r.r2Key = Key;
    r.url = `${R2_PUBLIC_URL.replace(/\/+$/, '')}/${Key}`;
    console.log(`  up  ${r.out}`);
  }

  console.log('\n=== Phase 3: HEAD verify ===');
  for (const r of results) {
    const head = await s3.send(new HeadObjectCommand({ Bucket: R2_BUCKET_NAME, Key: r.r2Key }));
    r.remoteSize = head.ContentLength;
    r.verified = r.remoteSize === r.optSize;
    console.log(`  ${r.verified ? 'ok ' : '!= '} ${r.out} remote=${fmtBytes(head.ContentLength)}`);
  }

  console.log('\n=== Phase 3b: public URL probe ===');
  for (const r of results) {
    const res = await fetch(r.url, { method: 'HEAD' });
    r.publicStatus = res.status;
    r.publicCT = res.headers.get('content-type');
    console.log(`  ${res.ok ? 'ok ' : 'FAIL '} HTTP ${res.status} ${r.publicCT}`);
  }

  console.log('\n=== Public URLs ===');
  for (const r of results) console.log(r.url);

  const allOk = results.every((r) => r.verified && r.publicStatus === 200);
  if (!allOk) process.exit(1);
}

main().catch((err) => {
  console.error('\nScript failed:', err.message || err);
  process.exit(1);
});
