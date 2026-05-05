#!/usr/bin/env node
/**
 * One-shot upload: blog detail redesign assets.
 *
 * Three uploads:
 *   1. New hero banner (Phase 2.1-2.5):
 *      saurabh-hero-banner-blog-2.png -> 1600x1000 WebP q=85
 *      -> Blog/finding-a-vedic-astrologer-in-ahmedabad/hero-banner-v2.webp
 *
 *   2. Author portrait (Phase 2.6, NEW brand asset):
 *      saurabh-round-stamp-size.png -> 256x256 WebP q=85
 *      -> Brand/Saurabh/author-portrait-256.webp
 *
 *   3. Master cutout (Phase 2.7, brand asset, no consumer in this PR):
 *      saurabh-without-bg.png ->
 *        Brand/Saurabh/portrait-cutout-transparent.webp (q=90, source dims preserved)
 *        Brand/Saurabh/portrait-cutout-transparent.png  (raw copy, alpha preserved)
 *
 * Pattern mirrors scripts/upload-blog-first-post-hero.mjs.
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { S3Client, PutObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'blog-images-folder');
const TMP = '/tmp';

const PLAN = [
  {
    label: 'hero-banner-v2',
    src: path.join(SRC, 'saurabh-hero-banner-blog-2.png'),
    out: path.join(TMP, 'saurabh-hero-banner-blog-2.webp'),
    key: 'Blog/finding-a-vedic-astrologer-in-ahmedabad/hero-banner-v2.webp',
    contentType: 'image/webp',
    transform: (img) => img.resize(1600, 1000, { fit: 'cover', position: 'attention' }).webp({ quality: 85, effort: 5 }),
  },
  {
    label: 'author-portrait-256',
    src: path.join(SRC, 'saurabh-round-stamp-size.png'),
    out: path.join(TMP, 'saurabh-author-portrait.webp'),
    key: 'Brand/Saurabh/author-portrait-256.webp',
    contentType: 'image/webp',
    transform: (img) => img.resize(256, 256, { fit: 'cover', position: 'centre' }).webp({ quality: 85, effort: 5 }),
  },
  {
    label: 'portrait-cutout-webp',
    src: path.join(SRC, 'saurabh-without-bg.png'),
    out: path.join(TMP, 'saurabh-portrait-cutout.webp'),
    key: 'Brand/Saurabh/portrait-cutout-transparent.webp',
    contentType: 'image/webp',
    // No resize, preserve full resolution. q=90 (master asset).
    // alphaQuality preserves transparency at high fidelity.
    transform: (img) => img.webp({ quality: 90, alphaQuality: 90, effort: 6 }),
  },
  {
    label: 'portrait-cutout-png',
    src: path.join(SRC, 'saurabh-without-bg.png'),
    out: path.join(TMP, 'saurabh-portrait-cutout.png'),
    key: 'Brand/Saurabh/portrait-cutout-transparent.png',
    contentType: 'image/png',
    // Pure copy, no transform — source is already PNG with whatever alpha it has.
    transform: null,
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

async function processOne(s3, bucket, publicBase, item) {
  console.log(`\n=== ${item.label} ===`);
  const origStat = await fs.stat(item.src);
  console.log(`  source: ${item.src}`);
  console.log(`    ${fmtBytes(origStat.size)}`);

  if (item.transform) {
    await item.transform(sharp(item.src)).toFile(item.out);
  } else {
    await fs.copyFile(item.src, item.out);
  }

  const optStat = await fs.stat(item.out);
  const reduction = (((origStat.size - optStat.size) / origStat.size) * 100).toFixed(1);
  console.log(`  output: ${item.out}`);
  console.log(`    ${fmtBytes(optStat.size)} (${reduction >= 0 ? '-' : '+'}${Math.abs(reduction)}% from source)`);

  // Capture output dimensions where applicable.
  let dims = '';
  try {
    const meta = await sharp(item.out).metadata();
    dims = `${meta.width}x${meta.height}`;
    console.log(`    dims: ${dims} format=${meta.format}`);
  } catch (err) {
    console.log(`    metadata read failed: ${err.message}`);
  }

  const Body = await fs.readFile(item.out);
  console.log(`  upload: ${item.key}`);
  await s3.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: item.key,
      Body,
      ContentType: item.contentType,
      CacheControl: 'public, max-age=31536000, immutable',
    }),
  );

  const head = await s3.send(new HeadObjectCommand({ Bucket: bucket, Key: item.key }));
  if (head.ContentLength !== optStat.size) {
    throw new Error(`size mismatch for ${item.key}: local=${optStat.size} remote=${head.ContentLength}`);
  }
  console.log(`    verified: remote ${fmtBytes(head.ContentLength)} matches local`);

  const publicUrl = `${publicBase.replace(/\/$/, '')}/${item.key}`;
  console.log(`  public URL: ${publicUrl}`);

  return {
    label: item.label,
    publicUrl,
    bytes: optStat.size,
    dims,
    contentType: item.contentType,
  };
}

async function main() {
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
  for (const item of PLAN) {
    results.push(await processOne(s3, R2_BUCKET_NAME, R2_PUBLIC_URL, item));
  }

  console.log(`\n=== Summary ===`);
  for (const r of results) {
    console.log(`  ${r.label.padEnd(25)} ${r.dims.padStart(11)}  ${fmtBytes(r.bytes).padStart(10)}  ${r.publicUrl}`);
  }
}

main().catch((err) => {
  console.error(`FAIL: ${err.message}`);
  if (err.stack) console.error(err.stack);
  process.exit(1);
});
