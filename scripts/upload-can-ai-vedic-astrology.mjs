#!/usr/bin/env node
/**
 * One-shot upload: hero banner + AI-vs-Jyotishi image for the
 * "Can AI Do Vedic Astrology" blog post.
 *
 * Source: blog-images-folder/can-ai-do-astrology-blog/*.webp
 * R2 prefix: Blog/can-ai-do-vedic-astrology/
 * Bucket: soul-infinity-space-assets
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { S3Client, PutObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT, 'blog-images-folder', 'can-ai-do-astrology-blog');
const R2_PREFIX = 'Blog/can-ai-do-vedic-astrology/';

const UPLOADS = [
  { local: 'can-ai-do-astrology-hero-banner.webp', remote: 'hero-banner.webp' },
  { local: 'ai-sage-1_1.webp', remote: 'ai-vs-jyotishi.webp' },
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
  console.log(`files  : ${UPLOADS.length}\n`);

  for (const u of UPLOADS) {
    const srcPath = path.join(SRC_DIR, u.local);
    const key = `${R2_PREFIX}${u.remote}`;
    const stat = await fs.stat(srcPath);
    const Body = await fs.readFile(srcPath);

    process.stdout.write(`- ${u.local} -> ${u.remote} (${fmtBytes(stat.size)}) ... `);
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
    console.log(`OK (${fmtBytes(head.ContentLength)})`);
    console.log(`  ${publicUrl}`);
  }

  console.log(`\nDone.`);
}

main().catch((err) => {
  console.error(`FAIL: ${err.message}`);
  process.exit(1);
});
