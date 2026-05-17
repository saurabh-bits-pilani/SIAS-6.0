#!/usr/bin/env node
/**
 * Compress + re-upload all Moon-in-4th-house blog assets.
 *
 * For each of the 20 production .webp sources in blog-images-folder/moon-blog/,
 * re-encode at iterative WebP quality (80 → 70 → 60 → 50 → 40) until the
 * output lands under MAX_BYTES, then PUT to R2 at the same key as before
 * (Blog/Planets/Moon/4th-house/[filename].webp). PUT overwrites by default
 * on R2 / S3 — no separate delete needed.
 *
 * Outputs go to blog-images-folder/moon-blog/optimized/ so the originals
 * stay untouched and the script is idempotent.
 *
 * Pattern mirrors scripts/upload-moon-4th-house-blog.mjs (file list, env
 * loader, R2 client, HEAD verification).
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { S3Client, PutObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT, 'blog-images-folder', 'moon-blog');
const OUT_DIR = path.join(SRC_DIR, 'optimized');
const R2_PREFIX = 'Blog/Planets/Moon/4th-house';

const MAX_BYTES = 150 * 1024;
const QUALITY_LADDER = [80, 70, 60, 50, 40];

// Same allow-list + rename map as the original upload.
const FILES = [
  { src: 'constellation-overlay.webp',                key: 'constellation-overlay.webp' },
  { src: 'digbala-directional-strength-icon.webp',    key: 'digbala-directional-strength-icon.webp' },
  { src: 'digbala-zodiac-wheel.webp',                 key: 'digbala-zodiac-wheel.webp' },
  { src: 'floating-lotus-overlay.webp',               key: 'floating-lotus-overlay.webp' },
  { src: 'hero-moon-lake-glow.webp',                  key: 'hero-moon-lake-glow.webp' },
  { src: 'moksha-meditation-icon.webp.webp',          key: 'moksha-meditation-icon.webp' },
  { src: 'moon-family-silhouette.webp',               key: 'moon-family-silhouette.webp' },
  { src: 'moon-halo-orbit.webp',                      key: 'moon-halo-orbit.webp' },
  { src: 'moon-mist-overlay.webp',                    key: 'moon-mist-overlay.webp' },
  { src: 'moon-radial-glow.webp',                     key: 'moon-radial-glow.webp' },
  { src: 'moon-star-particles.webp',                  key: 'moon-star-particles.webp' },
  { src: 'moon-water-offering.webp',                  key: 'moon-water-offering.webp' },
  { src: 'moon-water-reflection.webp',                key: 'moon-water-reflection.webp' },
  { src: 'mother-homeland-icon.webp',                 key: 'mother-homeland-icon.webp' },
  { src: 'sage-scripture-illustration.webp',          key: 'sage-scripture-illustration.webp' },
  { src: 'section-divider-glow.webp',                 key: 'section-divider-glow.webp' },
  { src: 'silver-bracelet-remedy.webp',               key: 'silver-bracelet-remedy.webp' },
  { src: 'silver-glass-remedy.webp',                  key: 'silver-glass-remedy.webp' },
  { src: 'sukh-bhava-house.webp',                     key: 'sukh-bhava-house.webp' },
  { src: 'white-donation-bowl.webp',                  key: 'white-donation-bowl.webp' },
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

/**
 * Iteratively re-encode srcPath at decreasing quality until output is under
 * MAX_BYTES. Returns { quality, bytes, attempts, capped }. `capped` is true
 * when the lowest quality on the ladder still produced an over-budget file.
 */
async function compressUnder(srcPath, outPath, maxBytes) {
  const attempts = [];
  for (const q of QUALITY_LADDER) {
    await sharp(srcPath).webp({ quality: q, effort: 6 }).toFile(outPath);
    const { size } = await fs.stat(outPath);
    attempts.push({ quality: q, bytes: size });
    if (size <= maxBytes) {
      return { quality: q, bytes: size, attempts, capped: false };
    }
  }
  // Hit the floor; return the last (lowest quality) attempt and flag it.
  const last = attempts[attempts.length - 1];
  return { quality: last.quality, bytes: last.bytes, attempts, capped: true };
}

async function processOne(s3, bucket, publicBase, item, index, total) {
  const srcPath = path.join(SRC_DIR, item.src);
  const outPath = path.join(OUT_DIR, item.key);
  const remoteKey = `${R2_PREFIX}/${item.key}`;
  const idx = `[${String(index + 1).padStart(2, '0')}/${total}]`;

  const before = (await fs.stat(srcPath)).size;
  const result = await compressUnder(srcPath, outPath, MAX_BYTES);

  // PUT to R2 (overwrites the existing object at this key).
  const Body = await fs.readFile(outPath);
  await s3.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: remoteKey,
      Body,
      ContentType: 'image/webp',
      CacheControl: 'public, max-age=31536000, immutable',
    }),
  );

  // HEAD to confirm remote size matches local + sanity-check the overwrite.
  const head = await s3.send(new HeadObjectCommand({ Bucket: bucket, Key: remoteKey }));
  if (head.ContentLength !== result.bytes) {
    throw new Error(`size mismatch for ${remoteKey}: local=${result.bytes} remote=${head.ContentLength}`);
  }

  const reduction = (((before - result.bytes) / before) * 100).toFixed(1);
  const status = result.capped
    ? 'CAPPED'
    : (head.ContentLength <= MAX_BYTES ? 'OK' : 'OVER');
  const ladder = result.attempts.map((a) => `q${a.quality}=${fmtBytes(a.bytes)}`).join(' → ');
  console.log(
    `${idx} ${item.key.padEnd(42)} ${fmtBytes(before).padStart(9)} → ${fmtBytes(result.bytes).padStart(9)} (-${reduction}%) [q${result.quality}] ${status}`,
  );
  if (result.attempts.length > 1) {
    console.log(`     ladder: ${ladder}`);
  }

  return {
    key: item.key,
    publicUrl: `${publicBase.replace(/\/$/, '')}/${remoteKey}`,
    before,
    after: result.bytes,
    quality: result.quality,
    capped: result.capped,
    underBudget: head.ContentLength <= MAX_BYTES,
  };
}

async function main() {
  await loadEnv();
  const required = ['R2_ACCESS_KEY_ID', 'R2_SECRET_ACCESS_KEY', 'R2_BUCKET_NAME', 'R2_ENDPOINT', 'R2_PUBLIC_URL'];
  for (const k of required) if (!process.env[k]) throw new Error(`Missing env var: ${k}`);
  const { R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME, R2_ENDPOINT, R2_PUBLIC_URL } = process.env;

  const expectedBucket = 'soul-infinity-space-assets';
  if (R2_BUCKET_NAME !== expectedBucket) {
    throw new Error(`Refusing to upload: R2_BUCKET_NAME=${R2_BUCKET_NAME}, expected ${expectedBucket}`);
  }

  await fs.mkdir(OUT_DIR, { recursive: true });

  const s3 = new S3Client({
    region: 'auto',
    endpoint: R2_ENDPOINT,
    credentials: { accessKeyId: R2_ACCESS_KEY_ID, secretAccessKey: R2_SECRET_ACCESS_KEY },
  });

  console.log(`bucket : ${R2_BUCKET_NAME}`);
  console.log(`prefix : ${R2_PREFIX}/`);
  console.log(`source : ${SRC_DIR}`);
  console.log(`output : ${OUT_DIR}`);
  console.log(`budget : ${fmtBytes(MAX_BYTES)} per file`);
  console.log(`ladder : quality ${QUALITY_LADDER.join(' → ')}`);
  console.log(`count  : ${FILES.length} files\n`);

  const results = [];
  let totalBefore = 0;
  let totalAfter = 0;
  for (let i = 0; i < FILES.length; i++) {
    const r = await processOne(s3, R2_BUCKET_NAME, R2_PUBLIC_URL, FILES[i], i, FILES.length);
    results.push(r);
    totalBefore += r.before;
    totalAfter += r.after;
  }

  console.log(`\n=== Summary ===`);
  console.log(`  before total : ${fmtBytes(totalBefore)}`);
  console.log(`  after total  : ${fmtBytes(totalAfter)}`);
  const overallReduction = (((totalBefore - totalAfter) / totalBefore) * 100).toFixed(1);
  console.log(`  reduction    : -${overallReduction}%`);

  const overBudget = results.filter((r) => !r.underBudget);
  const capped = results.filter((r) => r.capped);
  console.log(`  under 150KB  : ${results.length - overBudget.length}/${results.length}`);
  if (overBudget.length > 0) {
    console.log(`  OVER BUDGET (${overBudget.length}):`);
    for (const r of overBudget) {
      console.log(`    - ${r.key}: ${fmtBytes(r.after)} (q${r.quality}${r.capped ? ', floor reached' : ''})`);
    }
  }
  if (capped.length > 0 && capped.length !== overBudget.length) {
    console.log(`  hit quality floor but still under 150KB: ${capped.map((r) => r.key).join(', ')}`);
  }

  console.log(`\n=== Per-file detail ===`);
  console.log(`${'file'.padEnd(42)} ${'before'.padStart(10)} ${'after'.padStart(10)} ${'q'.padStart(4)}  status`);
  for (const r of results) {
    const status = r.underBudget ? (r.capped ? 'capped-ok' : 'ok') : 'OVER';
    console.log(
      `${r.key.padEnd(42)} ${fmtBytes(r.before).padStart(10)} ${fmtBytes(r.after).padStart(10)} q${String(r.quality).padStart(2)}  ${status}`,
    );
  }
}

main().catch((err) => {
  console.error(`FAIL: ${err.message}`);
  if (err.stack) console.error(err.stack);
  process.exit(1);
});
