#!/usr/bin/env node
/**
 * Convert + upload Mercury (Budh) pillar-page assets to Cloudflare R2.
 *
 * Layout:
 *   Mercury-specific  → Pillar/Hub/Planets/Mercury/
 *   Shared/universal  → Pillar/Hub/Planets/Shared/
 *   hero-budha        → Pillar/Hub/Planets/Mercury/hero-budha.webp (q=90;
 *     white background preserved — Codex masks at render time via CSS).
 *
 * Phases: convert PNG/JPEG → WebP q=85 (alpha preserved) → upload → verify
 *         (HEAD) → backup originals → write/merge manifest with SHA-256.
 *
 * Usage:
 *   node scripts/upload-mercury-pillar.mjs                    # skips hero-budha
 *   node scripts/upload-mercury-pillar.mjs --only-deferred    # only hero-budha
 *   node scripts/upload-mercury-pillar.mjs --include-deferred # everything
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { S3Client, PutObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'blog-images-folder');
const BACKUP = path.join(SRC, 'backup');
const OUT = path.join(SRC, 'optimized');
const MANIFEST = path.join(ROOT, 'scripts', 'planets-mercury-manifest.json');

const R2_BASE = 'Pillar/Hub/Planets';
const MERCURY = `${R2_BASE}/Mercury`;
const SHARED = `${R2_BASE}/Shared`;

const args = new Set(process.argv.slice(2));
const INCLUDE_DEFERRED = args.has('--include-deferred');
const ONLY_DEFERRED = args.has('--only-deferred');

// PLAN entries:
//   src     — source filename in blog-images-folder/
//   out     — output filename (after rename / extension change)
//   key     — manifest key (camelCase) used by Codex
//   prefix  — R2 key prefix
//   type    — 'raster' (convert to webp) | 'svg' (upload as-is)
//   group   — manifest group: 'mercury' | 'shared'
//   defer   — true to skip on default run (re-export pending)
const PLAN = [
  // ── Mercury-specific → Pillar/Hub/Planets/Mercury/ ──
  { src: 'ring.png',                 out: 'ring.webp',                key: 'ring',               prefix: MERCURY, type: 'raster', group: 'mercury' },
  { src: 'sticky-note-green.svg',    out: 'sticky-note-green.svg',    key: 'stickyNoteGreen',    prefix: MERCURY, type: 'svg',    group: 'mercury' },
  { src: 'oval-border-green.svg',    out: 'oval-border-green.svg',    key: 'ovalBorderGreen',    prefix: MERCURY, type: 'svg',    group: 'mercury' },
  { src: 'offering-durva.svg',       out: 'offering-durva.svg',       key: 'offeringDurva',      prefix: MERCURY, type: 'svg',    group: 'mercury' },
  { src: 'offering-fruit-green.svg', out: 'offering-fruit-green.svg', key: 'offeringFruitGreen', prefix: MERCURY, type: 'svg',    group: 'mercury' },
  { src: 'offering-moong.svg',       out: 'offering-moong.svg',       key: 'offeringMoong',      prefix: MERCURY, type: 'svg',    group: 'mercury' },

  // ── Hero (Mercury-specific, q=90) ──
  { src: 'hero-budha.png',           out: 'hero-budha.webp',          key: 'heroBudha',          prefix: MERCURY, type: 'raster', group: 'mercury', defer: true, quality: 90 },

  // ── Shared/universal → Pillar/Hub/Planets/Shared/ ──
  { src: 'Parchment-textures-1-stripe.svg', out: 'parchment-textures-1-stripe.svg', key: 'parchmentStripe',     prefix: SHARED, type: 'svg',    group: 'shared' },
  { src: 'notebook-page.png.svg',           out: 'notebook-page.svg',                key: 'notebookPage',         prefix: SHARED, type: 'svg',    group: 'shared' },
  { src: 'parchment-sticky-note.svg',       out: 'parchment-sticky-note.svg',        key: 'parchmentStickyNote',  prefix: SHARED, type: 'svg',    group: 'shared' },
  { src: 'sacred-geometry..svg',            out: 'sacred-geometry.svg',              key: 'sacredGeometry',       prefix: SHARED, type: 'svg',    group: 'shared' },
  { src: 'feather-doodle.svg',              out: 'feather-doodle.svg',               key: 'featherDoodle',        prefix: SHARED, type: 'svg',    group: 'shared' },
  { src: 'diya.png.svg',                    out: 'diya.svg',                         key: 'diya',                 prefix: SHARED, type: 'svg',    group: 'shared' },
  { src: 'offering-ghee-lamp.svg',          out: 'offering-ghee-lamp.svg',           key: 'offeringGheeLamp',     prefix: SHARED, type: 'svg',    group: 'shared' },
  { src: 'offering-tulsi.svg',              out: 'offering-tulsi.svg',               key: 'offeringTulsi',        prefix: SHARED, type: 'svg',    group: 'shared' },
  { src: 'mandla.png',                      out: 'mandla.webp',                      key: 'mandala',              prefix: SHARED, type: 'raster', group: 'shared' },
  { src: 'bg-large.png',                    out: 'bg-large.webp',                    key: 'bgLarge',              prefix: SHARED, type: 'raster', group: 'shared' },
  { src: 'bg-small.jpeg',                   out: 'bg-small.webp',                    key: 'bgSmall',              prefix: SHARED, type: 'raster', group: 'shared' },
  { src: 'strip-bg.jpeg',                   out: 'strip-bg.webp',                    key: 'stripBg',              prefix: SHARED, type: 'raster', group: 'shared' },
  { src: 'all-footer-images.png',           out: 'all-footer-images.webp',           key: 'allFooterImages',      prefix: SHARED, type: 'raster', group: 'shared' },
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

const sha256 = (buf) => crypto.createHash('sha256').update(buf).digest('hex');

async function convertRaster(srcPath, dstPath, quality = 85) {
  // alphaQuality=90 preserves transparency where source has it.
  // No resize — sources are all ≤ 2000px on longest edge.
  await sharp(srcPath)
    .webp({ quality, alphaQuality: 90, effort: 5 })
    .toFile(dstPath);
}

async function main() {
  await fs.mkdir(OUT, { recursive: true });
  await fs.mkdir(BACKUP, { recursive: true });
  await loadEnv();

  const required = ['R2_ACCOUNT_ID', 'R2_ACCESS_KEY_ID', 'R2_SECRET_ACCESS_KEY', 'R2_BUCKET_NAME', 'R2_ENDPOINT', 'R2_PUBLIC_URL'];
  for (const k of required) if (!process.env[k]) throw new Error(`Missing env var: ${k}`);
  const { R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME, R2_ENDPOINT, R2_PUBLIC_URL } = process.env;

  const s3 = new S3Client({
    region: 'auto',
    endpoint: R2_ENDPOINT,
    credentials: { accessKeyId: R2_ACCESS_KEY_ID, secretAccessKey: R2_SECRET_ACCESS_KEY },
  });

  const items = PLAN.filter((p) => {
    if (ONLY_DEFERRED) return p.defer === true;
    if (p.defer && !INCLUDE_DEFERRED) return false;
    return true;
  });

  console.log(`\nProcessing ${items.length} of ${PLAN.length} planned entries`);
  if (!INCLUDE_DEFERRED && !ONLY_DEFERRED) {
    const skipped = PLAN.filter((p) => p.defer).map((p) => p.src).join(', ');
    if (skipped) console.log(`Deferred (not in this run): ${skipped}`);
  }

  const results = [];

  // Phase 1: convert (raster → webp; svg → copy with rename)
  console.log('\n=== Phase 1: Convert ===');
  for (const item of items) {
    const srcPath = path.join(SRC, item.src);
    const dstPath = path.join(OUT, item.out);
    try {
      const origSize = (await fs.stat(srcPath)).size;
      if (item.type === 'raster') {
        await convertRaster(srcPath, dstPath, item.quality ?? 85);
      } else {
        await fs.copyFile(srcPath, dstPath);
      }
      const optSize = (await fs.stat(dstPath)).size;
      const reduction = origSize > 0 ? (((origSize - optSize) / origSize) * 100).toFixed(1) : '0.0';
      const tag = item.type === 'raster' ? 'webp' : 'svg ';
      console.log(`  ok  [${tag}] ${item.out.padEnd(38)} ${fmtBytes(origSize).padStart(10)} → ${fmtBytes(optSize).padStart(10)} (−${reduction}%)`);
      results.push({ ...item, srcPath, dstPath, origSize, optSize });
    } catch (err) {
      console.error(`  FAIL ${item.src}: ${err.message}`);
      results.push({ ...item, error: err.message });
    }
  }

  // Phase 2: upload
  console.log('\n=== Phase 2: Upload to R2 ===');
  for (const r of results) {
    if (r.error) continue;
    const Key = `${r.prefix}/${r.out}`;
    const Body = await fs.readFile(r.dstPath);
    const ContentType = r.type === 'svg' ? 'image/svg+xml' : 'image/webp';
    try {
      await s3.send(
        new PutObjectCommand({
          Bucket: R2_BUCKET_NAME,
          Key,
          Body,
          ContentType,
          CacheControl: 'public, max-age=31536000, immutable',
        }),
      );
      r.uploaded = true;
      r.r2Key = Key;
      r.sha256 = sha256(Body);
      console.log(`  up  ${r.out.padEnd(38)} → ${Key}`);
    } catch (err) {
      r.uploaded = false;
      r.uploadError = err.message;
      console.error(`  FAIL upload ${r.out}: ${err.message}`);
    }
  }

  // Phase 3: verify
  console.log('\n=== Phase 3: Verify (HEAD) ===');
  for (const r of results) {
    if (r.error || !r.uploaded) continue;
    try {
      const head = await s3.send(new HeadObjectCommand({ Bucket: R2_BUCKET_NAME, Key: r.r2Key }));
      r.remoteSize = head.ContentLength;
      r.verified = r.remoteSize === r.optSize;
      console.log(`  ${r.verified ? 'ok ' : '!= '} ${r.out.padEnd(38)} remote=${fmtBytes(head.ContentLength)}`);
    } catch (err) {
      r.verified = false;
      r.verifyError = err.message;
      console.error(`  FAIL head ${r.out}: ${err.message}`);
    }
  }

  // Phase 4: backup originals (raster only — SVGs are already source-of-truth)
  console.log('\n=== Phase 4: Backup originals ===');
  for (const r of results) {
    if (r.error || !r.uploaded || !r.verified) continue;
    if (r.type !== 'raster') continue;
    const dst = path.join(BACKUP, path.basename(r.srcPath));
    try {
      await fs.rename(r.srcPath, dst);
      console.log(`  mv  ${path.basename(r.srcPath)} → backup/`);
    } catch (err) {
      console.error(`  FAIL backup ${r.src}: ${err.message}`);
    }
  }

  // Phase 5: write/merge manifest (preserves entries from prior runs)
  console.log('\n=== Phase 5: Manifest ===');
  let manifest = {};
  try {
    manifest = JSON.parse(await fs.readFile(MANIFEST, 'utf8'));
  } catch { /* first run */ }
  manifest.mercury ??= {};
  manifest.shared ??= {};

  for (const r of results) {
    if (r.error || !r.uploaded || !r.verified) continue;
    const url = `${R2_PUBLIC_URL.replace(/\/+$/, '')}/${r.r2Key}`;
    manifest[r.group][r.key] = {
      url,
      key: r.r2Key,
      bytes: r.optSize,
      sha256: r.sha256,
      contentType: r.type === 'svg' ? 'image/svg+xml' : 'image/webp',
    };
  }
  manifest.generatedAt = new Date().toISOString();
  await fs.writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');
  console.log(`  Wrote ${path.relative(ROOT, MANIFEST)}`);

  // Summary
  console.log('\n=== Summary ===');
  const totOrig = results.reduce((s, r) => s + (r.origSize || 0), 0);
  const totOpt = results.reduce((s, r) => s + (r.optSize || 0), 0);
  const ok = results.filter((r) => !r.error && r.uploaded && r.verified).length;
  const reduction = totOrig ? (((totOrig - totOpt) / totOrig) * 100).toFixed(1) : '0.0';
  console.log(`OK ${ok}/${results.length}    ${fmtBytes(totOrig)} → ${fmtBytes(totOpt)} (${reduction}%)`);
  const failed = results.filter((r) => r.error || !r.uploaded || !r.verified);
  if (failed.length) {
    console.log(`\nFAILURES (${failed.length}):`);
    for (const f of failed) console.log(`  ${f.src}: ${f.error || f.uploadError || f.verifyError || 'unverified'}`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('\nScript failed:', err);
  process.exit(1);
});
