#!/usr/bin/env node
/**
 * One-shot upload: 19 image assets for the Moon-in-4th-house blog post.
 *
 * Source: blog-images-folder/moon-blog/*.webp
 * R2 prefix: Blog/Planets/Moon/4th-house/
 * Bucket: soul-infinity-space-assets (env var R2_BUCKET_NAME)
 *
 * Behaviour:
 *   - All sources are already optimised WebP. We do a direct byte copy
 *     (no sharp re-encode) to avoid double-compression quality loss.
 *   - moksha-meditation-icon.webp.webp has an accidental double extension
 *     in the source filename; uploaded as moksha-meditation-icon.webp.
 *   - .DS_Store and ui-ux-design-moon-blog.png are excluded (system file
 *     and design mockup, respectively).
 *   - HEAD verification after each PUT confirms the remote object size
 *     matches the local file. Any mismatch aborts the run with exit 1.
 *
 * Pattern mirrors scripts/upload-blog-redesign-assets.mjs.
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { S3Client, PutObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT, 'blog-images-folder', 'moon-blog');
const R2_PREFIX = 'Blog/Planets/Moon/4th-house';

// Explicit allow-list of the 19 production .webp assets, with the
// rename for moksha-meditation-icon.webp.webp -> moksha-meditation-icon.webp.
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

async function uploadOne(s3, bucket, publicBase, item, index, total) {
  const srcPath = path.join(SRC_DIR, item.src);
  const remoteKey = `${R2_PREFIX}/${item.key}`;

  const stat = await fs.stat(srcPath);
  const Body = await fs.readFile(srcPath);

  await s3.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: remoteKey,
      Body,
      ContentType: 'image/webp',
      CacheControl: 'public, max-age=31536000, immutable',
    }),
  );

  const head = await s3.send(new HeadObjectCommand({ Bucket: bucket, Key: remoteKey }));
  if (head.ContentLength !== stat.size) {
    throw new Error(`size mismatch for ${remoteKey}: local=${stat.size} remote=${head.ContentLength}`);
  }

  const publicUrl = `${publicBase.replace(/\/$/, '')}/${remoteKey}`;
  const num = String(index + 1).padStart(2, '0');
  console.log(`  [${num}/${total}] ${item.key.padEnd(42)} ${fmtBytes(stat.size).padStart(10)}  OK`);

  return { key: remoteKey, publicUrl, bytes: stat.size };
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

  const s3 = new S3Client({
    region: 'auto',
    endpoint: R2_ENDPOINT,
    credentials: { accessKeyId: R2_ACCESS_KEY_ID, secretAccessKey: R2_SECRET_ACCESS_KEY },
  });

  console.log(`bucket : ${R2_BUCKET_NAME}`);
  console.log(`prefix : ${R2_PREFIX}/`);
  console.log(`source : ${SRC_DIR}`);
  console.log(`count  : ${FILES.length} files\n`);

  const results = [];
  let totalBytes = 0;
  for (let i = 0; i < FILES.length; i++) {
    const r = await uploadOne(s3, R2_BUCKET_NAME, R2_PUBLIC_URL, FILES[i], i, FILES.length);
    results.push(r);
    totalBytes += r.bytes;
  }

  console.log(`\n=== Summary ===`);
  console.log(`  uploaded: ${results.length} files, ${fmtBytes(totalBytes)} total`);
  console.log(`  base URL: ${R2_PUBLIC_URL.replace(/\/$/, '')}/${R2_PREFIX}/`);
  console.log(`\nPublic URLs:`);
  for (const r of results) {
    console.log(`  ${r.publicUrl}`);
  }
}

main().catch((err) => {
  console.error(`FAIL: ${err.message}`);
  if (err.stack) console.error(err.stack);
  process.exit(1);
});
