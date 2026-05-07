#!/usr/bin/env node
/**
 * One-off: convert + upload sun-bg-for-cards.png to R2 as a real WebP.
 * Source: assets-to-upload/Planets/Sun/sun-bg-for-cards.png
 * Target: Pillar/Planets/Sun/sun-bg-for-cards.webp
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { S3Client, PutObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'assets-to-upload', 'Planets', 'Sun', 'sun-bg-for-cards.png');
const OUT_DIR = path.join(ROOT, 'assets-to-upload', '.optimized', 'Planets', 'Sun');
const OUT = path.join(OUT_DIR, 'sun-bg-for-cards.webp');
const R2_KEY = 'Pillar/Planets/Sun/sun-bg-for-cards.webp';
const MAX_BYTES = 400 * 1024;
const MAX_WIDTH = 1600;

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

  const origSize = (await fs.stat(SRC)).size;
  let lastSize = Infinity;
  let lastQ = null;
  for (const q of [90, 85, 80, 75, 70, 65, 60, 55, 50]) {
    await sharp(SRC)
      .resize(MAX_WIDTH, null, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: q, alphaQuality: 80, effort: 6 })
      .toFile(OUT);
    lastSize = (await fs.stat(OUT)).size;
    lastQ = q;
    if (lastSize <= MAX_BYTES) break;
  }
  const meta = await sharp(OUT).metadata();
  const reduction = (((origSize - lastSize) / origSize) * 100).toFixed(1);
  console.log(`encoded: ${fmt(origSize)} -> ${fmt(lastSize)} q=${lastQ} ${meta.width}x${meta.height} (-${reduction}%)`);

  const Body = await fs.readFile(OUT);
  await s3.send(
    new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: R2_KEY,
      Body,
      ContentType: 'image/webp',
      CacheControl: 'public, max-age=31536000, immutable',
    }),
  );
  console.log(`uploaded: ${R2_KEY}`);

  const head = await s3.send(new HeadObjectCommand({ Bucket: R2_BUCKET_NAME, Key: R2_KEY }));
  const url = `${R2_PUBLIC_URL.replace(/\/+$/, '')}/${R2_KEY}`;
  const probe = await fetch(url, { method: 'HEAD' });
  const ok = head.ContentLength === lastSize && probe.status === 200;
  console.log(`verify: HEAD remote=${fmt(head.ContentLength)} | public HTTP ${probe.status} ${probe.headers.get('content-type')} -> ${ok ? 'ok' : 'FAIL'}`);
  console.log(url);
  if (!ok) process.exit(1);
}

main().catch((err) => {
  console.error('Script failed:', err.message || err);
  process.exit(1);
});
