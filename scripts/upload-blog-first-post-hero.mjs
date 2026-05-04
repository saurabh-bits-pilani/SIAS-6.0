#!/usr/bin/env node
/**
 * One-shot upload: hero image for the first blog post.
 *
 * Source: blog-images-folder/Saurabh-jain-portrait.jpeg (PNG bytes despite
 *   .jpeg extension; sharp auto-detects).
 * Output: 1200x630 WebP q=85.
 * R2 key: Blog/finding-a-vedic-astrologer-in-ahmedabad/hero.webp
 * Pattern: mirrors scripts/upload-mercury-pillar.mjs (convert -> upload -> verify).
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { S3Client, PutObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'blog-images-folder', 'Saurabh-jain-portrait.jpeg');
const OUT = path.join(ROOT, 'blog-images-folder', 'optimized', 'hero-finding-vedic-ahmedabad.webp');
const R2_KEY = 'Blog/finding-a-vedic-astrologer-in-ahmedabad/hero.webp';

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

async function main() {
  await loadEnv();
  const required = ['R2_ACCESS_KEY_ID', 'R2_SECRET_ACCESS_KEY', 'R2_BUCKET_NAME', 'R2_ENDPOINT', 'R2_PUBLIC_URL'];
  for (const k of required) if (!process.env[k]) throw new Error(`Missing env var: ${k}`);
  const { R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME, R2_ENDPOINT, R2_PUBLIC_URL } = process.env;

  await fs.mkdir(path.dirname(OUT), { recursive: true });

  const origStat = await fs.stat(SRC);
  console.log(`source: ${SRC}`);
  console.log(`  ${fmtBytes(origStat.size)}`);

  // Resize to 1200x630, cover crop centered on the subject (Saurabh, who's
  // roughly centered in a 1086x1448 portrait — cover-crop will trim the
  // top/bottom whitespace, keeping the kurta + Nandi statue in frame).
  await sharp(SRC)
    .resize(1200, 630, { fit: 'cover', position: 'attention' })
    .webp({ quality: 85, effort: 5 })
    .toFile(OUT);

  const optStat = await fs.stat(OUT);
  const reduction = (((origStat.size - optStat.size) / origStat.size) * 100).toFixed(1);
  console.log(`output: ${OUT}`);
  console.log(`  ${fmtBytes(optStat.size)} (-${reduction}% from source)`);

  const s3 = new S3Client({
    region: 'auto',
    endpoint: R2_ENDPOINT,
    credentials: { accessKeyId: R2_ACCESS_KEY_ID, secretAccessKey: R2_SECRET_ACCESS_KEY },
  });

  const Body = await fs.readFile(OUT);
  console.log(`\nupload: ${R2_KEY}`);
  await s3.send(
    new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: R2_KEY,
      Body,
      ContentType: 'image/webp',
      CacheControl: 'public, max-age=31536000, immutable',
    }),
  );

  const head = await s3.send(new HeadObjectCommand({ Bucket: R2_BUCKET_NAME, Key: R2_KEY }));
  if (head.ContentLength !== optStat.size) {
    throw new Error(`size mismatch: local=${optStat.size} remote=${head.ContentLength}`);
  }
  console.log(`  verified: remote ${fmtBytes(head.ContentLength)} matches local`);

  const publicUrl = `${R2_PUBLIC_URL.replace(/\/$/, '')}/${R2_KEY}`;
  console.log(`\npublic URL: ${publicUrl}`);
}

main().catch((err) => {
  console.error(`FAIL: ${err.message}`);
  process.exit(1);
});
