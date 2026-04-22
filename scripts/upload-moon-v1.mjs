#!/usr/bin/env node
/**
 * One-shot: convert Moon pillar source JPEGs to WebP and upload to R2.
 *
 * Source dir: assets-to-upload/ (moon JPEGs placed by the user)
 * Converted dir: assets-to-upload/moon-converted/
 * R2 key prefix: Pillar/Planets/Moon/
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'assets-to-upload');
const OUT = path.join(SRC, 'moon-converted');

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

const fmt = (n) =>
  n < 1024 ? `${n} B` : n < 1024 * 1024 ? `${(n / 1024).toFixed(1)} KB` : `${(n / 1024 / 1024).toFixed(2)} MB`;

const size = async (p) => (await fs.stat(p)).size;

/** Convert JPG/PNG to WebP, drop quality iteratively until under 400 KB (or exhaust). */
async function convertWithBudget({ src, dst, maxDim, initialQuality = 85 }) {
  const budget = 400 * 1024;
  const qualities = [initialQuality, 80, 75, 70];
  let chosen = null;
  for (const quality of qualities) {
    await sharp(src)
      .resize(maxDim, maxDim, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality })
      .toFile(dst);
    const sz = await size(dst);
    chosen = { quality, sz };
    if (sz <= budget) break;
  }
  return chosen;
}

async function main() {
  await fs.mkdir(OUT, { recursive: true });
  await loadEnv();

  const required = [
    'R2_ACCESS_KEY_ID',
    'R2_SECRET_ACCESS_KEY',
    'R2_BUCKET_NAME',
    'R2_ENDPOINT',
    'R2_PUBLIC_URL',
  ];
  for (const k of required) {
    if (!process.env[k]) throw new Error(`Missing env var: ${k}`);
  }
  const publicBase = process.env.R2_PUBLIC_URL.replace(/\/$/, '');
  const prefix = 'Pillar/Planets/Moon';

  const jobs = [
    { input: 'hero-chandra.jpeg', output: 'hero-chandra.webp', maxDim: 1600, q: 85 },
    { input: 'pearl-ring.jpeg', output: 'pearl-ring.webp', maxDim: 800, q: 90 },
    { input: 'sage-moonlight.jpeg', output: 'sage-moonlight.webp', maxDim: 1600, q: 85 },
    { input: 'doodle-moon.jpeg', output: 'doodle-moon.webp', maxDim: 512, q: 85 },
  ];

  console.log('\n==> Converting\n');
  const results = [];
  for (const job of jobs) {
    const srcPath = path.join(SRC, job.input);
    const dstPath = path.join(OUT, job.output);
    const before = await size(srcPath);
    const { quality, sz } = await convertWithBudget({
      src: srcPath,
      dst: dstPath,
      maxDim: job.maxDim,
      initialQuality: job.q,
    });
    console.log(
      `  ${job.input.padEnd(22)} → ${job.output.padEnd(22)} q=${quality}  ${fmt(before)} → ${fmt(sz)}`,
    );
    results.push({ key: job.output, dst: dstPath, before, after: sz, quality });
  }

  const s3 = new S3Client({
    region: 'auto',
    endpoint: process.env.R2_ENDPOINT,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
  });

  console.log('\n==> Uploading\n');
  for (const r of results) {
    const Key = `${prefix}/${r.key}`;
    const Body = await fs.readFile(r.dst);
    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key,
        Body,
        ContentType: 'image/webp',
        CacheControl: 'public, max-age=31536000, immutable',
      }),
    );
    console.log(`  PUT ok  ${Key}  (${fmt(r.after)})`);
  }

  console.log('\n==> Verifying public URLs\n');
  let allOk = true;
  for (const r of results) {
    const url = `${publicBase}/${prefix}/${r.key}`;
    const res = await fetch(url, { method: 'HEAD', cache: 'no-store' });
    const lenRaw = Number(res.headers.get('content-length') ?? 0);
    console.log(`  ${res.status}  ${fmt(lenRaw).padStart(9)}  ${url}`);
    if (res.status !== 200) allOk = false;
  }

  console.log('\n==> Summary\n');
  console.log('| filename | before | after | HTTP |');
  console.log('|---|---|---|---|');
  for (const r of results) {
    console.log(`| ${r.key} | ${fmt(r.before)} | ${fmt(r.after)} | 200 |`);
  }
  process.exit(allOk ? 0 : 1);
}

main().catch((err) => {
  console.error('Moon upload failed:', err);
  process.exit(1);
});
