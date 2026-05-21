#!/usr/bin/env node
/**
 * One-shot upload: all 9 images for the saturn-karma-two-souls case study.
 *
 * Source: blog-images-folder/case-studies/*.webp
 * R2 prefix: Blog/saturn-karma-two-souls/
 * Bucket: soul-infinity-space-assets (env R2_BUCKET_NAME)
 *
 * Sources are already WebP and small; no re-encode required. Uploads
 * sequentially so console output stays readable, verifies via HeadObject,
 * then prints the public URL.
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { S3Client, PutObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT, 'blog-images-folder', 'case-studies');
const R2_PREFIX = 'Blog/saturn-karma-two-souls/';

const FILES = [
  'hero-banner-case.webp',
  'anju-kundali.webp',
  'riya-kundali.webp',
  'anju-maha-dasha.webp',
  'anju-ad-details.webp',
  'anju-planet-sequence.webp',
  'riya-mahadasha.webp',
  'riya-ad-dasha.webp',
  'riya-planatery-sequence.webp',
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
  console.log(`prefix : ${R2_PREFIX}`);
  console.log(`files  : ${FILES.length}\n`);

  const results = [];
  for (const fname of FILES) {
    const srcPath = path.join(SRC_DIR, fname);
    const key = `${R2_PREFIX}${fname}`;
    const stat = await fs.stat(srcPath);
    const Body = await fs.readFile(srcPath);

    process.stdout.write(`- ${fname} (${fmtBytes(stat.size)}) ... `);
    await s3.send(
      new PutObjectCommand({
        Bucket: R2_BUCKET_NAME,
        Key: key,
        Body,
        ContentType: 'image/webp',
        CacheControl: 'public, max-age=31536000, immutable',
      }),
    );
    const head = await s3.send(new HeadObjectCommand({ Bucket: R2_BUCKET_NAME, Key: key }));
    if (head.ContentLength !== stat.size) {
      throw new Error(`size mismatch for ${key}: local=${stat.size} remote=${head.ContentLength}`);
    }
    const publicUrl = `${R2_PUBLIC_URL.replace(/\/$/, '')}/${key}`;
    console.log(`OK (${head.ContentType}, ${fmtBytes(head.ContentLength)})`);
    console.log(`  ${publicUrl}`);
    results.push({ key, publicUrl, bytes: head.ContentLength });
  }

  console.log(`\nDone. ${results.length}/${FILES.length} uploaded.`);
}

main().catch((err) => {
  console.error(`FAIL: ${err.message}`);
  if (err.stack) console.error(err.stack);
  process.exit(1);
});
