#!/usr/bin/env node
/**
 * One-shot: optimize Planets Hub source assets (JPEG/PNG) to WebP, upload to
 * Cloudflare R2 under Pillar/Hub/Planets/, verify, and emit an asset map JSON.
 *
 * Categories:
 *   hero       q=85, max 1200px (aspect preserved),   budget 200 KB
 *   background q=80, max 1920px wide,                  budget 300 KB
 *   doodle     q=85, max  512px, preserve alpha,       budget 100 KB
 *   ui         q=90, max  512px, preserve alpha,       budget  50 KB
 *   misc       q=80, max 1920px wide,                  budget 300 KB (textures)
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { S3Client, PutObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'assets-to-upload');
const OUT = path.join(SRC, 'optimized');
const MAP_PATH = path.join(ROOT, 'scripts', 'planets-hub-assets.json');
const R2_PREFIX = 'Pillar/Hub/Planets';

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

const fileSize = async (p) => (await fs.stat(p)).size;

/**
 * Optimize `src` → `dst` (WebP) aiming for `budget` bytes. Drops quality
 * stepwise from `initialQuality` if the first pass overshoots. Preserves
 * aspect ratio via fit:'inside', never enlarges.
 */
async function optimize({ src, dst, maxDim, initialQuality, budget, preserveAlpha }) {
  const qualities = [initialQuality, initialQuality - 5, initialQuality - 10, initialQuality - 15].filter(
    (q) => q >= 60,
  );
  let chosen;
  for (const quality of qualities) {
    const pipeline = sharp(src).resize(maxDim, maxDim, { fit: 'inside', withoutEnlargement: true });
    const webpOpts = preserveAlpha ? { quality, alphaQuality: 90 } : { quality };
    await pipeline.webp(webpOpts).toFile(dst);
    const sz = await fileSize(dst);
    chosen = { quality, sz };
    if (sz <= budget) break;
  }
  return chosen;
}

// Target filename → category + rules + asset-map location (group.key)
// Category rules:
const RULES = {
  hero:       { quality: 85, maxDim: 1200, budget: 200 * 1024, preserveAlpha: false },
  background: { quality: 80, maxDim: 1920, budget: 300 * 1024, preserveAlpha: false },
  doodle:     { quality: 85, maxDim:  512, budget: 100 * 1024, preserveAlpha: true  },
  ui:         { quality: 90, maxDim:  512, budget:  50 * 1024, preserveAlpha: true  },
  misc:       { quality: 80, maxDim: 1920, budget: 300 * 1024, preserveAlpha: false },
};

// Source filename → { outName (as .webp), category, mapGroup, mapKey }
const PLAN = [
  // Heroes
  { src: 'hero-surya.jpeg',            out: 'hero-surya.webp',            cat: 'hero',       group: 'planets', key: 'surya' },
  { src: 'hero-chandra.jpeg',          out: 'hero-chandra.webp',          cat: 'hero',       group: 'planets', key: 'chandra' },
  { src: 'hero-mangala.jpeg',          out: 'hero-mangala.webp',          cat: 'hero',       group: 'planets', key: 'mangala' },
  { src: 'hero-budha.jpeg',            out: 'hero-budha.webp',            cat: 'hero',       group: 'planets', key: 'budha' },
  { src: 'hero-guru.jpeg',             out: 'hero-guru.webp',             cat: 'hero',       group: 'planets', key: 'guru' },
  { src: 'hero-shukra.jpeg',           out: 'hero-shukra.webp',           cat: 'hero',       group: 'planets', key: 'shukra' },
  { src: 'hero-shani.jpeg',            out: 'hero-shani.webp',            cat: 'hero',       group: 'planets', key: 'shani' },
  { src: 'hero-rahu.jpeg',             out: 'hero-rahu.webp',             cat: 'hero',       group: 'planets', key: 'rahu' },
  { src: 'hero-ketu.jpeg',             out: 'hero-ketu.webp',             cat: 'hero',       group: 'planets', key: 'ketu' },
  { src: 'hero-navagraha-orbit.jpeg',  out: 'hero-navagraha-orbit.webp',  cat: 'hero',       group: 'planets', key: 'navagrahaOrbit' },

  // Backgrounds
  { src: 'bg-nebula-overlay.jpeg',     out: 'bg-nebula-overlay.webp',     cat: 'background', group: 'backgrounds', key: 'nebula' },
  { src: 'bg-notebook-paper.jpeg',     out: 'bg-notebook-paper.webp',     cat: 'background', group: 'backgrounds', key: 'notebookPaper' },
  { src: 'bg-parchment-texture.jpeg',  out: 'bg-parchment-texture.webp',  cat: 'background', group: 'backgrounds', key: 'parchmentTexture' },

  // Doodles
  { src: 'doodle-arrows.jpeg',          out: 'doodle-arrows.webp',          cat: 'doodle', group: 'doodles', key: 'arrows' },
  { src: 'doodle-compass.jpeg',         out: 'doodle-compass.webp',         cat: 'doodle', group: 'doodles', key: 'compass' },
  { src: 'doodle-feather.jpeg',         out: 'doodle-feather.webp',         cat: 'doodle', group: 'doodles', key: 'feather' },
  { src: 'doodle-feather-single.jpeg',  out: 'doodle-feather-single.webp',  cat: 'doodle', group: 'doodles', key: 'featherSingle' },
  { src: 'doodle-heart.jpeg',           out: 'doodle-heart.webp',           cat: 'doodle', group: 'doodles', key: 'heart' },
  { src: 'doodle-moon.jpeg',            out: 'doodle-moon.webp',            cat: 'doodle', group: 'doodles', key: 'moon' },
  { src: 'doodle-planet-orbit.jpeg',    out: 'doodle-planet-orbit.webp',    cat: 'doodle', group: 'doodles', key: 'planetOrbit' },
  { src: 'doodle-sparkles.jpeg',        out: 'doodle-sparkles.webp',        cat: 'doodle', group: 'doodles', key: 'sparkles' },
  { src: 'doodle-spiral.jpeg',          out: 'doodle-spiral.webp',          cat: 'doodle', group: 'doodles', key: 'spiral' },
  { src: 'doodle-stars.jpeg',           out: 'doodle-stars.webp',           cat: 'doodle', group: 'doodles', key: 'stars' },
  { src: 'doodle-sun.jpeg',             out: 'doodle-sun.webp',             cat: 'doodle', group: 'doodles', key: 'sun' },

  // UI
  { src: 'ui-highlight-stroke.png',     out: 'ui-highlight-stroke.webp',    cat: 'ui', group: 'ui', key: 'highlightStroke' },
  { src: 'ui-paper-clip.jpeg',          out: 'ui-paper-clip.webp',          cat: 'ui', group: 'ui', key: 'paperClip' },
  { src: 'ui-red-circle.jpeg',          out: 'ui-red-circle.webp',          cat: 'ui', group: 'ui', key: 'redCircle' },
  { src: 'ui-washi-tape.png.jpeg',      out: 'ui-washi-tape.webp',          cat: 'ui', group: 'ui', key: 'washiTape' },

  // Misc (weird .webp.jpeg extensions; treated as textures/backgrounds)
  { src: 'geometry.webp.jpeg',          out: 'geometry.webp',               cat: 'misc', group: 'misc', key: 'geometry' },
  { src: 'layer.webp.jpeg',             out: 'layer.webp',                  cat: 'misc', group: 'misc', key: 'layer' },
  { src: 'main.webp.jpeg',              out: 'main.webp',                   cat: 'misc', group: 'misc', key: 'main' },
];

async function main() {
  await fs.mkdir(OUT, { recursive: true });
  await loadEnv();

  const {
    R2_ACCOUNT_ID,
    R2_ACCESS_KEY_ID,
    R2_SECRET_ACCESS_KEY,
    R2_BUCKET_NAME,
    R2_ENDPOINT,
    R2_PUBLIC_URL,
  } = process.env;
  const required = { R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME, R2_ENDPOINT, R2_PUBLIC_URL };
  for (const [k, v] of Object.entries(required)) {
    if (!v) throw new Error(`Missing env var: ${k}`);
  }

  const s3 = new S3Client({
    region: 'auto',
    endpoint: R2_ENDPOINT,
    credentials: { accessKeyId: R2_ACCESS_KEY_ID, secretAccessKey: R2_SECRET_ACCESS_KEY },
  });

  const rows = [];
  let totalOrig = 0;
  let totalOpt = 0;

  // Phase 1: optimize
  console.log('\n=== Phase 1: Optimize ===');
  for (const item of PLAN) {
    const srcPath = path.join(SRC, item.src);
    const dstPath = path.join(OUT, item.out);
    const rule = RULES[item.cat];
    try {
      const origSize = await fileSize(srcPath);
      const { quality, sz } = await optimize({
        src: srcPath,
        dst: dstPath,
        maxDim: rule.maxDim,
        initialQuality: rule.quality,
        budget: rule.budget,
        preserveAlpha: rule.preserveAlpha,
      });
      totalOrig += origSize;
      totalOpt += sz;
      const reduction = (((origSize - sz) / origSize) * 100).toFixed(1);
      const overBudget = sz > rule.budget ? ' [!over budget]' : '';
      rows.push({ ...item, origSize, optSize: sz, quality, reduction, overBudget });
      console.log(`  ok  ${item.out.padEnd(34)} ${fmtBytes(origSize).padStart(10)} → ${fmtBytes(sz).padStart(10)} (q${quality}, −${reduction}%)${overBudget}`);
    } catch (err) {
      console.error(`  FAIL ${item.src}: ${err.message}`);
      rows.push({ ...item, error: err.message });
    }
  }

  // Phase 2: upload
  console.log('\n=== Phase 2: Upload to R2 ===');
  for (const row of rows) {
    if (row.error) continue;
    const Key = `${R2_PREFIX}/${row.out}`;
    const Body = await fs.readFile(path.join(OUT, row.out));
    try {
      await s3.send(
        new PutObjectCommand({
          Bucket: R2_BUCKET_NAME,
          Key,
          Body,
          ContentType: 'image/webp',
          CacheControl: 'public, max-age=31536000, immutable',
        }),
      );
      row.uploaded = true;
      console.log(`  up  ${row.out.padEnd(34)} → ${Key}`);
    } catch (err) {
      row.uploaded = false;
      row.uploadError = err.message;
      console.error(`  FAIL upload ${row.out}: ${err.message}`);
    }
  }

  // Phase 3: verify via HEAD
  console.log('\n=== Phase 3: Verify (HEAD) ===');
  for (const row of rows) {
    if (row.error || !row.uploaded) continue;
    const Key = `${R2_PREFIX}/${row.out}`;
    try {
      const head = await s3.send(new HeadObjectCommand({ Bucket: R2_BUCKET_NAME, Key }));
      row.remoteSize = head.ContentLength;
      row.verified = row.remoteSize === row.optSize;
      const tag = row.verified ? '  ok  ' : '  !=  ';
      console.log(`${tag}${row.out.padEnd(34)} remote=${fmtBytes(head.ContentLength)}`);
    } catch (err) {
      row.verified = false;
      row.verifyError = err.message;
      console.error(`  FAIL head ${row.out}: ${err.message}`);
    }
  }

  // Phase 4: asset map
  const assetMap = { backgrounds: {}, doodles: {}, planets: {}, ui: {}, misc: {} };
  for (const row of rows) {
    if (row.error || !row.uploaded || !row.verified) continue;
    const url = `${R2_PUBLIC_URL.replace(/\/+$/, '')}/${R2_PREFIX}/${row.out}`;
    assetMap[row.group][row.key] = url;
  }
  await fs.writeFile(MAP_PATH, JSON.stringify(assetMap, null, 2) + '\n');
  console.log(`\nWrote asset map: ${path.relative(ROOT, MAP_PATH)}`);

  // Final summary
  console.log('\n=== Summary ===');
  console.log(`Files processed: ${rows.filter((r) => !r.error).length}/${rows.length}`);
  console.log(`Total original: ${fmtBytes(totalOrig)}`);
  console.log(`Total optimized: ${fmtBytes(totalOpt)} (${(((totalOrig - totalOpt) / totalOrig) * 100).toFixed(1)}% reduction)`);
  const failed = rows.filter((r) => r.error || !r.uploaded || !r.verified);
  if (failed.length) {
    console.log(`\nFAILURES (${failed.length}):`);
    for (const f of failed) console.log(`  ${f.src}: ${f.error || f.uploadError || f.verifyError || 'unverified'}`);
    process.exit(1);
  }
  const sampleUrl = `${R2_PUBLIC_URL.replace(/\/+$/, '')}/${R2_PREFIX}/hero-surya.webp`;
  console.log(`\nSample URL: ${sampleUrl}`);
}

main().catch((err) => {
  console.error('Script failed:', err);
  process.exit(1);
});
