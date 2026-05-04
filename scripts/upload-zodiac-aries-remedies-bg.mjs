#!/usr/bin/env node
/**
 * One-off: convert + upload the Vedic Remedies background to R2.
 * Source: assets-to-upload/Aries (trailing space)/Vedic-Remedies-bg.png
 * Target: /Zodiac/Aries/Vedic-Remedies-bg.webp (max 300 KB)
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { S3Client, PutObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'assets-to-upload', 'Aries ', 'Vedic-Remedies-bg.png');
const OUT_DIR = path.join(ROOT, 'assets-to-upload', '.optimized', 'Aries');
const OUT = path.join(OUT_DIR, 'Vedic-Remedies-bg.webp');
const KEY = 'Zodiac/Aries/Vedic-Remedies-bg.webp';
const MAX_BYTES = 300 * 1024;

async function loadEnv() {
  const raw = await fs.readFile(path.join(ROOT, '.env.local'), 'utf8');
  for (const line of raw.split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const eq = t.indexOf('=');
    if (eq < 0) continue;
    const k = t.slice(0, eq).trim();
    let v = t.slice(eq + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    if (!(k in process.env)) process.env[k] = v;
  }
}

const fmt = (n) => (n < 1024 * 1024 ? `${(n / 1024).toFixed(1)} KB` : `${(n / 1024 / 1024).toFixed(2)} MB`);

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  await loadEnv();
  const { R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME, R2_ENDPOINT, R2_PUBLIC_URL } = process.env;
  for (const k of ['R2_ACCESS_KEY_ID', 'R2_SECRET_ACCESS_KEY', 'R2_BUCKET_NAME', 'R2_ENDPOINT', 'R2_PUBLIC_URL']) {
    if (!process.env[k]) throw new Error(`Missing env var: ${k}`);
  }

  const orig = (await fs.stat(SRC)).size;
  let size = Infinity;
  let q = null;
  for (const candidate of [90, 85, 80, 75, 70, 65, 60, 55, 50, 45]) {
    await sharp(SRC)
      .resize(1600, null, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: candidate, alphaQuality: 80, effort: 6 })
      .toFile(OUT);
    size = (await fs.stat(OUT)).size;
    q = candidate;
    if (size <= MAX_BYTES) break;
  }
  const meta = await sharp(OUT).metadata();
  const fits = size <= MAX_BYTES;
  console.log(`  ${fits ? 'ok ' : 'WARN'} Vedic-Remedies-bg.webp  ${fmt(orig)} -> ${fmt(size)} q=${q} ${meta.width}x${meta.height}`);

  const s3 = new S3Client({
    region: 'auto',
    endpoint: R2_ENDPOINT,
    credentials: { accessKeyId: R2_ACCESS_KEY_ID, secretAccessKey: R2_SECRET_ACCESS_KEY },
  });
  const Body = await fs.readFile(OUT);
  await s3.send(new PutObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: KEY,
    Body,
    ContentType: 'image/webp',
    CacheControl: 'public, max-age=31536000, immutable',
  }));
  const head = await s3.send(new HeadObjectCommand({ Bucket: R2_BUCKET_NAME, Key: KEY }));
  console.log(`  uploaded, remote=${fmt(head.ContentLength)}`);

  const url = `${R2_PUBLIC_URL.replace(/\/+$/, '')}/${KEY}`;
  const res = await fetch(url, { method: 'HEAD' });
  console.log(`  public probe: HTTP ${res.status} ${res.headers.get('content-type')}`);
  console.log('');
  console.log(url);

  if (!res.ok) process.exit(1);
}

main().catch((err) => {
  console.error('Failed:', err.message || err);
  process.exit(1);
});
