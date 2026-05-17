#!/usr/bin/env node
/**
 * One-shot upload: hero banner for the Sade Sati Effects and Remedies blog post.
 *
 * Source: blog-images-folder/Shani-jayanti/shani-blog-hero-banner-_1600_1000.webp
 * R2 key: Blog/sade-sati-effects-remedies/hero-banner.webp
 * Bucket: soul-infinity-space-assets (env R2_BUCKET_NAME)
 *
 * Source is already WebP but ~375 KB. Re-encode at iterative quality 85 → 80 → 75
 * until output is under MAX_BYTES (250 KB), then upload.
 *
 * Pattern mirrors scripts/compress-and-reupload-moon-4th-house.mjs.
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { S3Client, PutObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'blog-images-folder', 'Shani-jayanti', 'shani-blog-hero-banner-_1600_1000.webp');
const OUT_DIR = path.join(ROOT, 'blog-images-folder', 'Shani-jayanti', 'optimized');
const OUT_FILE = path.join(OUT_DIR, 'sade-sati-hero-banner.webp');
const R2_KEY = 'Blog/sade-sati-effects-remedies/hero-banner.webp';

const MAX_BYTES = 250 * 1024;
const QUALITY_LADDER = [85, 80, 75, 70, 65];

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
  const last = attempts[attempts.length - 1];
  return { quality: last.quality, bytes: last.bytes, attempts, capped: true };
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

  const srcStat = await fs.stat(SRC);
  console.log(`source : ${SRC}`);
  console.log(`         ${fmtBytes(srcStat.size)}`);
  console.log(`bucket : ${R2_BUCKET_NAME}`);
  console.log(`key    : ${R2_KEY}`);
  console.log(`budget : ${fmtBytes(MAX_BYTES)}`);
  console.log(`ladder : quality ${QUALITY_LADDER.join(' → ')}\n`);

  const result = await compressUnder(SRC, OUT_FILE, MAX_BYTES);
  const ladder = result.attempts.map((a) => `q${a.quality}=${fmtBytes(a.bytes)}`).join(' → ');
  console.log(`compress: ${ladder}`);
  console.log(`chosen  : q${result.quality} = ${fmtBytes(result.bytes)} ${result.capped ? '(CAPPED — over budget)' : '(under budget)'}`);

  if (result.capped) {
    throw new Error(`Could not compress under ${fmtBytes(MAX_BYTES)} on the quality ladder. Last attempt: ${fmtBytes(result.bytes)}`);
  }

  const s3 = new S3Client({
    region: 'auto',
    endpoint: R2_ENDPOINT,
    credentials: { accessKeyId: R2_ACCESS_KEY_ID, secretAccessKey: R2_SECRET_ACCESS_KEY },
  });

  const Body = await fs.readFile(OUT_FILE);
  console.log(`\nuploading...`);
  const putRes = await s3.send(
    new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: R2_KEY,
      Body,
      ContentType: 'image/webp',
      CacheControl: 'public, max-age=31536000, immutable',
    }),
  );
  console.log(`  PUT etag: ${putRes.ETag}`);

  const head = await s3.send(new HeadObjectCommand({ Bucket: R2_BUCKET_NAME, Key: R2_KEY }));
  if (head.ContentLength !== result.bytes) {
    throw new Error(`size mismatch: local=${result.bytes} remote=${head.ContentLength}`);
  }
  console.log(`  HEAD verified: ${fmtBytes(head.ContentLength)}, etag ${head.ETag}, content-type ${head.ContentType}`);
  console.log(`  last-modified: ${head.LastModified?.toISOString()}`);

  const publicUrl = `${R2_PUBLIC_URL.replace(/\/$/, '')}/${R2_KEY}`;
  console.log(`\npublic URL: ${publicUrl}`);
}

main().catch((err) => {
  console.error(`FAIL: ${err.message}`);
  if (err.stack) console.error(err.stack);
  process.exit(1);
});
