#!/usr/bin/env node
/**
 * Compress + re-upload Moon-in-4th-house assets — v2 with resize ladder.
 *
 * v1 (scripts/compress-and-reupload-moon-4th-house.mjs) tried quality-only
 * compression and 16/20 files stayed over the 150KB budget even at q40
 * because the sources are all 1024×1024 with rich gradient/particle content
 * — quality alone can't cut size in half on those.
 *
 * v2 adds a width ladder and tries resizes BEFORE dropping quality, on the
 * principle that "smaller image at q80" usually looks better than "same size
 * at q40". For each file we try a sequence of (width × quality) configs and
 * pick the first one that lands under MAX_BYTES.
 *
 * Sources are 1024×1024 (one is 1536×1024). They're displayed in the post
 * at much smaller sizes (icons ~80–160px, hero ~1024px, decorative overlays
 * ~600–1024px) so down-scaling has zero perceptible impact in real use.
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { S3Client, PutObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT, 'blog-images-folder', 'moon-blog');
const OUT_DIR = path.join(SRC_DIR, 'optimized-v2');
const R2_PREFIX = 'Blog/Planets/Moon/4th-house';
const MAX_BYTES = 150 * 1024;

// Search ladder — prefer larger size at higher quality. First hit wins.
// At each width the quality drops from 80 → 70 → 60 before we resize down.
const CONFIGS = [
  { width: 1024, qualities: [80, 70, 60] },
  { width: 800,  qualities: [80, 70, 60] },
  { width: 640,  qualities: [80, 70, 60] },
  { width: 512,  qualities: [80, 70] },
  { width: 400,  qualities: [80, 70] },
];

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

async function findBestEncoding(srcPath, outPath, maxBytes) {
  for (const cfg of CONFIGS) {
    for (const q of cfg.qualities) {
      // withoutEnlargement so a smaller original is never upscaled.
      await sharp(srcPath)
        .resize({ width: cfg.width, withoutEnlargement: true })
        .webp({ quality: q, effort: 5 })
        .toFile(outPath);
      const { size } = await fs.stat(outPath);
      if (size <= maxBytes) {
        const meta = await sharp(outPath).metadata();
        return { width: meta.width, height: meta.height, quality: q, bytes: size, capped: false };
      }
    }
  }
  // Floor: keep last (smallest+lowest) attempt and flag.
  const meta = await sharp(outPath).metadata();
  const { size } = await fs.stat(outPath);
  return { width: meta.width, height: meta.height, quality: CONFIGS.at(-1).qualities.at(-1), bytes: size, capped: true };
}

async function processOne(s3, bucket, item, index, total) {
  const srcPath = path.join(SRC_DIR, item.src);
  const outPath = path.join(OUT_DIR, item.key);
  const remoteKey = `${R2_PREFIX}/${item.key}`;
  const idx = `[${String(index + 1).padStart(2, '0')}/${total}]`;

  const before = (await fs.stat(srcPath)).size;
  const beforeMeta = await sharp(srcPath).metadata();
  const result = await findBestEncoding(srcPath, outPath, MAX_BYTES);

  const Body = await fs.readFile(outPath);
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
  if (head.ContentLength !== result.bytes) {
    throw new Error(`size mismatch for ${remoteKey}: local=${result.bytes} remote=${head.ContentLength}`);
  }

  const reduction = (((before - result.bytes) / before) * 100).toFixed(1);
  const status = result.bytes <= MAX_BYTES ? 'OK' : 'OVER';
  console.log(
    `${idx} ${item.key.padEnd(42)} ${(beforeMeta.width + 'x' + beforeMeta.height).padStart(11)} ${fmtBytes(before).padStart(9)} → ${(result.width + 'x' + result.height).padStart(11)} ${fmtBytes(result.bytes).padStart(9)} (-${reduction}%) [q${result.quality}] ${status}`,
  );

  return { key: item.key, before, after: result.bytes, width: result.width, quality: result.quality, underBudget: head.ContentLength <= MAX_BYTES };
}

async function main() {
  await loadEnv();
  const required = ['R2_ACCESS_KEY_ID', 'R2_SECRET_ACCESS_KEY', 'R2_BUCKET_NAME', 'R2_ENDPOINT', 'R2_PUBLIC_URL'];
  for (const k of required) if (!process.env[k]) throw new Error(`Missing env var: ${k}`);
  const { R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME, R2_ENDPOINT } = process.env;

  if (R2_BUCKET_NAME !== 'soul-infinity-space-assets') {
    throw new Error(`Refusing to upload: R2_BUCKET_NAME=${R2_BUCKET_NAME}`);
  }

  await fs.mkdir(OUT_DIR, { recursive: true });
  const s3 = new S3Client({
    region: 'auto', endpoint: R2_ENDPOINT,
    credentials: { accessKeyId: R2_ACCESS_KEY_ID, secretAccessKey: R2_SECRET_ACCESS_KEY },
  });

  console.log(`bucket  : ${R2_BUCKET_NAME}`);
  console.log(`prefix  : ${R2_PREFIX}/`);
  console.log(`budget  : ${fmtBytes(MAX_BYTES)} per file`);
  console.log(`ladder  : widths [${CONFIGS.map(c => c.width).join(', ')}], qualities [80, 70, 60]`);
  console.log(`count   : ${FILES.length} files\n`);

  const results = [];
  let totalBefore = 0, totalAfter = 0;
  for (let i = 0; i < FILES.length; i++) {
    const r = await processOne(s3, R2_BUCKET_NAME, FILES[i], i, FILES.length);
    results.push(r);
    totalBefore += r.before;
    totalAfter += r.after;
  }

  const overBudget = results.filter(r => !r.underBudget);
  console.log(`\n=== Summary ===`);
  console.log(`  before total : ${fmtBytes(totalBefore)}`);
  console.log(`  after total  : ${fmtBytes(totalAfter)}`);
  console.log(`  reduction    : -${(((totalBefore - totalAfter) / totalBefore) * 100).toFixed(1)}%`);
  console.log(`  under 150KB  : ${results.length - overBudget.length}/${results.length}`);
  if (overBudget.length > 0) {
    console.log(`  OVER BUDGET (${overBudget.length}):`);
    for (const r of overBudget) console.log(`    - ${r.key}: ${fmtBytes(r.after)} @ ${r.width}px q${r.quality}`);
  }
}

main().catch((err) => {
  console.error(`FAIL: ${err.message}`);
  process.exit(1);
});
