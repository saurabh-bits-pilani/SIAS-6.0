#!/usr/bin/env node
/**
 * Convert + upload hero deity portraits for the 6 remaining planets:
 *   Mars (Mangala), Jupiter (Guru), Venus (Shukra),
 *   Saturn (Shani), Rahu, Ketu.
 *
 * Layout:
 *   Pillar/Planets/<Planet>/hero-<sanskrit>.webp
 *   (NOT Pillar/Hub/Planets — that was Mercury's legacy path.)
 *
 * Per planet:
 *   - Convert PNG -> WebP q=90, max 1536x1024, preserve alpha.
 *   - Backup original to blog-images-folder/backup/<planet>/.
 *   - Upload to R2.
 *   - HEAD-verify the public URL.
 *   - Write scripts/planets-<planet>-manifest.json.
 *   - Write blog-images-folder/<planet>/components.json.
 *
 * Usage:
 *   node scripts/upload-planets-heroes.mjs
 *   node scripts/upload-planets-heroes.mjs --dry-run   # convert+verify only
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
const SCRIPTS = path.join(ROOT, 'scripts');

const R2_BASE = 'Pillar/Planets';

const args = new Set(process.argv.slice(2));
const DRY_RUN = args.has('--dry-run');

const PLAN = [
  { planet: 'Mars',    sanskrit: 'mangala', src: 'hero-mars.png',    out: 'hero-mangala.webp', key: 'heroMangala', componentSlot: 'hero' },
  { planet: 'Jupiter', sanskrit: 'guru',    src: 'hero-jupiter.png', out: 'hero-guru.webp',    key: 'heroGuru',    componentSlot: 'hero' },
  { planet: 'Venus',   sanskrit: 'shukra',  src: 'hero-venus.png',   out: 'hero-shukra.webp',  key: 'heroShukra',  componentSlot: 'hero' },
  { planet: 'Saturn',  sanskrit: 'shani',   src: 'hero-shani.png',   out: 'hero-shani.webp',   key: 'heroShani',   componentSlot: 'hero' },
  { planet: 'Rahu',    sanskrit: 'rahu',    src: 'hero-rashu.png',   out: 'hero-rahu.webp',    key: 'heroRahu',    componentSlot: 'hero' },
  { planet: 'Ketu',    sanskrit: 'ketu',    src: 'hero-ketu.png',    out: 'hero-ketu.webp',    key: 'heroKetu',    componentSlot: 'hero' },
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

async function convertHero(srcPath, dstPath) {
  await sharp(srcPath)
    .resize(1536, 1024, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 90, alphaQuality: 90, effort: 5 })
    .toFile(dstPath);
}

async function ensureDir(p) {
  await fs.mkdir(p, { recursive: true });
}

async function main() {
  await ensureDir(OUT);
  await ensureDir(BACKUP);

  if (!DRY_RUN) {
    await loadEnv();
    const required = ['R2_ACCOUNT_ID', 'R2_ACCESS_KEY_ID', 'R2_SECRET_ACCESS_KEY', 'R2_BUCKET_NAME', 'R2_ENDPOINT', 'R2_PUBLIC_URL'];
    for (const k of required) if (!process.env[k]) throw new Error(`Missing env var: ${k}`);
  }
  const { R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME, R2_ENDPOINT, R2_PUBLIC_URL } = process.env;

  const s3 = DRY_RUN ? null : new S3Client({
    region: 'auto',
    endpoint: R2_ENDPOINT,
    credentials: { accessKeyId: R2_ACCESS_KEY_ID, secretAccessKey: R2_SECRET_ACCESS_KEY },
  });

  const results = [];

  console.log(`\nProcessing ${PLAN.length} planet hero portraits  ${DRY_RUN ? '(DRY RUN — convert only)' : ''}`);

  // Phase 1: convert
  console.log('\n=== Phase 1: Convert PNG -> WebP (q=90, max 1536x1024) ===');
  for (const item of PLAN) {
    const srcPath = path.join(SRC, item.src);
    await ensureDir(path.join(OUT, item.planet));
    const dstPath = path.join(OUT, item.planet, item.out);
    try {
      const origSize = (await fs.stat(srcPath)).size;
      await convertHero(srcPath, dstPath);
      const optSize = (await fs.stat(dstPath)).size;
      const reduction = origSize > 0 ? (((origSize - optSize) / origSize) * 100).toFixed(1) : '0.0';
      console.log(`  ok  ${item.planet.padEnd(8)} ${item.out.padEnd(20)} ${fmtBytes(origSize).padStart(10)} -> ${fmtBytes(optSize).padStart(10)} (-${reduction}%)`);
      results.push({ ...item, srcPath, dstPath, origSize, optSize });
    } catch (err) {
      console.error(`  FAIL ${item.src}: ${err.message}`);
      results.push({ ...item, error: err.message });
    }
  }

  // Phase 2: upload
  if (!DRY_RUN) {
    console.log('\n=== Phase 2: Upload to R2 ===');
    for (const r of results) {
      if (r.error) continue;
      const Key = `${R2_BASE}/${r.planet}/${r.out}`;
      const Body = await fs.readFile(r.dstPath);
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
        r.uploaded = true;
        r.r2Key = Key;
        r.sha256 = sha256(Body);
        r.url = `${R2_PUBLIC_URL.replace(/\/+$/, '')}/${Key}`;
        console.log(`  up  ${r.out.padEnd(20)} -> ${Key}`);
      } catch (err) {
        r.uploaded = false;
        r.uploadError = err.message;
        console.error(`  FAIL upload ${r.out}: ${err.message}`);
      }
    }

    // Phase 3: verify (HEAD)
    console.log('\n=== Phase 3: Verify (HEAD) ===');
    for (const r of results) {
      if (r.error || !r.uploaded) continue;
      try {
        const head = await s3.send(new HeadObjectCommand({ Bucket: R2_BUCKET_NAME, Key: r.r2Key }));
        r.remoteSize = head.ContentLength;
        r.verified = r.remoteSize === r.optSize;
        console.log(`  ${r.verified ? 'ok ' : '!= '} ${r.out.padEnd(20)} remote=${fmtBytes(head.ContentLength)}`);
      } catch (err) {
        r.verified = false;
        r.verifyError = err.message;
        console.error(`  FAIL head ${r.out}: ${err.message}`);
      }
    }

    // Phase 3b: public URL HEAD via fetch
    console.log('\n=== Phase 3b: Public URL HEAD probe ===');
    for (const r of results) {
      if (r.error || !r.uploaded || !r.verified) continue;
      try {
        const res = await fetch(r.url, { method: 'HEAD' });
        r.publicStatus = res.status;
        r.publicCT = res.headers.get('content-type');
        console.log(`  ${res.ok ? 'ok ' : 'FAIL '} ${r.out.padEnd(20)} HTTP ${res.status} ${r.publicCT}`);
      } catch (err) {
        r.publicStatus = 0;
        r.publicError = err.message;
        console.error(`  FAIL fetch ${r.url}: ${err.message}`);
      }
    }

    // Phase 4: backup originals
    console.log('\n=== Phase 4: Backup originals ===');
    for (const r of results) {
      if (r.error || !r.uploaded || !r.verified) continue;
      const planetBackupDir = path.join(BACKUP, r.planet);
      await ensureDir(planetBackupDir);
      const dst = path.join(planetBackupDir, path.basename(r.srcPath));
      try {
        await fs.rename(r.srcPath, dst);
        console.log(`  mv  ${path.basename(r.srcPath)} -> backup/${r.planet}/`);
      } catch (err) {
        console.error(`  FAIL backup ${r.src}: ${err.message}`);
      }
    }

    // Phase 5: per-planet manifests
    console.log('\n=== Phase 5: Manifests ===');
    for (const r of results) {
      if (r.error || !r.uploaded || !r.verified) continue;
      const manifestPath = path.join(SCRIPTS, `planets-${r.planet.toLowerCase()}-manifest.json`);
      const planetGroup = r.planet.toLowerCase();
      let manifest = {};
      try {
        manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8'));
      } catch { /* first run */ }
      manifest[planetGroup] ??= {};
      manifest[planetGroup][r.key] = {
        url: r.url,
        key: r.r2Key,
        bytes: r.optSize,
        sha256: r.sha256,
        contentType: 'image/webp',
      };
      manifest.generatedAt = new Date().toISOString();
      await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
      console.log(`  Wrote ${path.relative(ROOT, manifestPath)}`);
    }

    // Phase 6: per-planet components.json
    console.log('\n=== Phase 6: components.json per planet ===');
    for (const r of results) {
      if (r.error || !r.uploaded || !r.verified) continue;
      const planetDir = path.join(SRC, r.planet.toLowerCase());
      await ensureDir(planetDir);
      const compPath = path.join(planetDir, 'components.json');
      const components = {
        planet: r.planet,
        sanskrit: r.sanskrit,
        generatedAt: new Date().toISOString(),
        components: {
          [r.componentSlot]: {
            url: r.url,
            key: r.r2Key,
            bytes: r.optSize,
            sha256: r.sha256,
            contentType: 'image/webp',
            width: 1536,
            height: 1024,
          },
        },
      };
      await fs.writeFile(compPath, JSON.stringify(components, null, 2) + '\n');
      console.log(`  Wrote ${path.relative(ROOT, compPath)}`);
    }
  }

  // Summary
  console.log('\n=== Summary ===');
  const totOrig = results.reduce((s, r) => s + (r.origSize || 0), 0);
  const totOpt = results.reduce((s, r) => s + (r.optSize || 0), 0);
  const ok = results.filter((r) => !r.error && (DRY_RUN || (r.uploaded && r.verified && r.publicStatus === 200))).length;
  const reduction = totOrig ? (((totOrig - totOpt) / totOrig) * 100).toFixed(1) : '0.0';
  console.log(`OK ${ok}/${results.length}    ${fmtBytes(totOrig)} -> ${fmtBytes(totOpt)} (${reduction}%)`);

  if (!DRY_RUN) {
    const failed = results.filter((r) => r.error || !r.uploaded || !r.verified || r.publicStatus !== 200);
    if (failed.length) {
      console.log(`\nFAILURES (${failed.length}):`);
      for (const f of failed) console.log(`  ${f.src}: ${f.error || f.uploadError || f.verifyError || f.publicError || 'unverified'}`);
      process.exit(1);
    }
  }
}

main().catch((err) => {
  console.error('\nScript failed:', err);
  process.exit(1);
});
