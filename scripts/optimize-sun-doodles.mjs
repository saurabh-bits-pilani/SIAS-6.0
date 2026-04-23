#!/usr/bin/env node
/**
 * One-shot: download 4 Sun doodle PNGs from R2, resize to max 512px,
 * aggressively compress, and re-upload in place.
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const TMP = '/tmp/sun-doodles-optimize';
const OUT = path.join(TMP, 'optimized');

const DOODLES = [
  'doodle-lion.png',
  'doodle-sun.png',
  'doodle-temple.png',
  'doodle-scales.png',
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

function fmt(n) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(2)} MB`;
}

async function size(p) {
  return (await fs.stat(p)).size;
}

async function download(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`GET ${url} → ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.writeFile(dest, buf);
}

async function compress(inPath, outPath) {
  await sharp(inPath)
    .resize(512, 512, { fit: 'inside', withoutEnlargement: true })
    .png({ compressionLevel: 9, adaptiveFiltering: true, palette: true, quality: 85 })
    .toFile(outPath);
  const after = await size(outPath);
  if (after <= 200 * 1024) return after;
  // Retry without palette at lower quality
  await sharp(inPath)
    .resize(512, 512, { fit: 'inside', withoutEnlargement: true })
    .png({ compressionLevel: 9, adaptiveFiltering: true, palette: false, quality: 80 })
    .toFile(outPath);
  return await size(outPath);
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
  const keyPrefix = 'Pillar/Planets/Sun';

  console.log('\n==> Downloading\n');
  const downloaded = [];
  for (const f of DOODLES) {
    const url = `${publicBase}/${keyPrefix}/${f}`;
    const dest = path.join(TMP, f);
    await download(url, dest);
    const sz = await size(dest);
    console.log(`  ${f.padEnd(22)}  ${fmt(sz)}`);
    downloaded.push({ name: f, local: dest, before: sz });
  }

  console.log('\n==> Optimizing\n');
  const results = [];
  for (const d of downloaded) {
    const out = path.join(OUT, d.name);
    const after = await compress(d.local, out);
    const reduction = (100 * (d.before - after)) / d.before;
    console.log(`  ${d.name.padEnd(22)}  ${fmt(d.before)} → ${fmt(after)}  (-${reduction.toFixed(1)}%)`);
    results.push({ ...d, optimized: out, after, reduction });
  }

  console.log('\n==> Reduction table\n');
  console.log('| filename | original | optimized | reduction |');
  console.log('|---|---|---|---|');
  for (const r of results) {
    console.log(`| ${r.name} | ${fmt(r.before)} | ${fmt(r.after)} | ${r.reduction.toFixed(1)}% |`);
  }
  const total = results.reduce((s, r) => s + r.after, 0);
  console.log(`\nCombined optimized size: ${fmt(total)} (target < 600 KB)`);

  const s3 = new S3Client({
    region: 'auto',
    endpoint: process.env.R2_ENDPOINT,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
  });

  console.log('\n==> Re-uploading\n');
  for (const r of results) {
    const Key = `${keyPrefix}/${r.name}`;
    const Body = await fs.readFile(r.optimized);
    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key,
        Body,
        ContentType: 'image/png',
        CacheControl: 'public, max-age=31536000, immutable',
      }),
    );
    console.log(`  PUT ok  ${Key}  (${fmt(r.after)})`);
  }

  console.log('\n==> Verifying (HEAD)\n');
  console.log('| filename | final R2 size | HTTP status |');
  console.log('|---|---|---|');
  for (const r of results) {
    const url = `${publicBase}/${keyPrefix}/${r.name}`;
    const res = await fetch(url, { method: 'HEAD', cache: 'no-store' });
    const len = Number(res.headers.get('content-length') ?? 0);
    console.log(`| ${r.name} | ${fmt(len)} | ${res.status} |`);
  }

  console.log('\n==> Cleanup\n');
  await fs.rm(TMP, { recursive: true, force: true });
  console.log(`  removed ${TMP}`);
}

main().catch((err) => {
  console.error('optimize failed:', err);
  process.exit(1);
});
