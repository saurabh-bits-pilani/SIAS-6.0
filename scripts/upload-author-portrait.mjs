#!/usr/bin/env node
/**
 * One-shot upload: author portrait for blog post bylines and About sections.
 *
 * Source: blog-images-folder/saurabh-round-stamp-size.webp
 * R2 key: Author/saurabh-jain-profile.webp
 * Bucket: soul-infinity-space-assets (env R2_BUCKET_NAME)
 *
 * Direct byte copy — source is already WebP, no re-encode.
 *
 * Pattern mirrors scripts/upload-blog-first-post-hero.mjs.
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { S3Client, PutObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'blog-images-folder', 'saurabh-round-stamp-size.webp');
const R2_KEY = 'Author/saurabh-jain-profile.webp';

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

  const stat = await fs.stat(SRC);
  console.log(`source : ${SRC}`);
  console.log(`         ${fmtBytes(stat.size)}`);
  console.log(`bucket : ${R2_BUCKET_NAME}`);
  console.log(`key    : ${R2_KEY}`);

  const s3 = new S3Client({
    region: 'auto',
    endpoint: R2_ENDPOINT,
    credentials: { accessKeyId: R2_ACCESS_KEY_ID, secretAccessKey: R2_SECRET_ACCESS_KEY },
  });

  const Body = await fs.readFile(SRC);

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
  if (head.ContentLength !== stat.size) {
    throw new Error(`size mismatch: local=${stat.size} remote=${head.ContentLength}`);
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
