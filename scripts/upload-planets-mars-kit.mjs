#!/usr/bin/env node
/**
 * Upload Mars asset kit (21 SVGs) to Cloudflare R2.
 *
 *   Mars-specific (17) -> Pillar/Planets/Mars/<filename>
 *   Universal/shared (4) -> Pillar/Planets/Shared/<filename>
 *
 * The four files >200 KB were already minified by SVGO before this
 * script runs; this script only uploads + verifies + writes manifest +
 * updates components.json. No conversion (all SVGs).
 *
 * Usage:
 *   node scripts/upload-planets-mars-kit.mjs
 *   node scripts/upload-planets-mars-kit.mjs --dry-run
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { S3Client, PutObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'blog-images-folder', 'mars');
const SCRIPTS = path.join(ROOT, 'scripts');
const MARS_PREFIX = 'Pillar/Planets/Mars';
const SHARED_PREFIX = 'Pillar/Planets/Shared';
const MERCURY_LEGACY_SHARED_PREFIX = 'Pillar/Hub/Planets/Shared';

const args = new Set(process.argv.slice(2));
const DRY_RUN = args.has('--dry-run');

// Mars-specific: 17 files (incl. icon-spear and renamed glyph-aries)
// Shared: 4 files (universal motifs reusable across planets)
//
// `slot` is the components.json key. Where multiple files share a slot
// (e.g., yantra-mars and yantra-mars-detailed), each gets its own slot.
const PLAN = [
  // ── Mars-specific ──
  { src: 'doodle-quill-inkpot-mars.svg',     out: 'doodle-quill-inkpot-mars.svg',  prefix: MARS_PREFIX,   group: 'mars',   slot: 'decorativeQuill' },
  { src: 'gemstone-coral.svg',               out: 'gemstone-coral.svg',            prefix: MARS_PREFIX,   group: 'mars',   slot: 'gemstoneCoral' },
  { src: 'glyph-aries.svg.svg',              out: 'glyph-aries.svg',               prefix: MARS_PREFIX,   group: 'mars',   slot: 'glyphAries' },
  { src: 'glyph-scorpio.svg',                out: 'glyph-scorpio.svg',             prefix: MARS_PREFIX,   group: 'mars',   slot: 'glyphScorpio' },
  { src: 'mangal-chariot.svg',               out: 'mangal-chariot.svg',            prefix: MARS_PREFIX,   group: 'mars',   slot: 'chariot' },
  { src: 'mars-symbol-card.svg',             out: 'mars-symbol-card.svg',          prefix: MARS_PREFIX,   group: 'mars',   slot: 'symbolCard' },
  { src: 'parchment-card-mars.svg',          out: 'parchment-card-mars.svg',       prefix: MARS_PREFIX,   group: 'mars',   slot: 'parchmentCard' },
  { src: 'parchment-card-square-mars.svg',   out: 'parchment-card-square-mars.svg',prefix: MARS_PREFIX,   group: 'mars',   slot: 'parchmentCardSquare' },
  { src: 'parchment-note-small-mars.svg',    out: 'parchment-note-small-mars.svg', prefix: MARS_PREFIX,   group: 'mars',   slot: 'parchmentNoteSmall' },
  { src: 'planet-dot-mars.svg',              out: 'planet-dot-mars.svg',           prefix: MARS_PREFIX,   group: 'mars',   slot: 'planetDot' },
  { src: 'planet-mars.svg',                  out: 'planet-mars.svg',               prefix: MARS_PREFIX,   group: 'mars',   slot: 'planetSphere' },
  { src: 'seal-mars.svg',                    out: 'seal-mars.svg',                 prefix: MARS_PREFIX,   group: 'mars',   slot: 'seal' },
  { src: 'strip-bg-mars.svg',                out: 'strip-bg-mars.svg',             prefix: MARS_PREFIX,   group: 'mars',   slot: 'stripBg' },
  { src: 'symbol-mars.svg',                  out: 'symbol-mars.svg',               prefix: MARS_PREFIX,   group: 'mars',   slot: 'symbolMars' },
  { src: 'yantra-mars.svg',                  out: 'yantra-mars.svg',               prefix: MARS_PREFIX,   group: 'mars',   slot: 'yantra' },
  { src: 'yantra-mars-detailed.svg',         out: 'yantra-mars-detailed.svg',      prefix: MARS_PREFIX,   group: 'mars',   slot: 'yantraDetailed' },
  { src: 'icon-spear.svg',                   out: 'icon-spear.svg',                prefix: MARS_PREFIX,   group: 'mars',   slot: 'iconSpear' },

  // ── Shared (uploaded fresh to Pillar/Planets/Shared/) ──
  { src: 'doodle-crystal.svg',               out: 'doodle-crystal.svg',            prefix: SHARED_PREFIX, group: 'shared', slot: 'doodleCrystal' },
  { src: 'doodle-namaste.svg',               out: 'doodle-namaste.svg',            prefix: SHARED_PREFIX, group: 'shared', slot: 'doodleNamaste' },
  { src: 'icon-crown.svg',                   out: 'icon-crown.svg',                prefix: SHARED_PREFIX, group: 'shared', slot: 'iconCrown' },
  { src: 'icon-flame.svg',                   out: 'icon-flame.svg',                prefix: SHARED_PREFIX, group: 'shared', slot: 'iconFlame' },
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

async function main() {
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

  console.log(`\nProcessing ${PLAN.length} files (${PLAN.filter(p => p.group === 'mars').length} Mars + ${PLAN.filter(p => p.group === 'shared').length} Shared)  ${DRY_RUN ? '(DRY RUN)' : ''}`);

  const results = [];

  // Phase 1: read + size
  console.log('\n=== Phase 1: Read source ===');
  for (const item of PLAN) {
    const srcPath = path.join(SRC, item.src);
    try {
      const Body = await fs.readFile(srcPath);
      const optSize = Body.length;
      const hash = sha256(Body);
      console.log(`  ok  ${item.group.padEnd(7)} ${item.src.padEnd(38)} ${fmtBytes(optSize).padStart(10)}`);
      results.push({ ...item, srcPath, Body, optSize, sha256: hash });
    } catch (err) {
      console.error(`  FAIL ${item.src}: ${err.message}`);
      results.push({ ...item, error: err.message });
    }
  }

  if (DRY_RUN) {
    const total = results.reduce((s, r) => s + (r.optSize || 0), 0);
    console.log(`\n=== Summary === DRY RUN  ${results.length} files  ${fmtBytes(total)}`);
    return;
  }

  // Phase 2: upload
  console.log('\n=== Phase 2: Upload to R2 ===');
  for (const r of results) {
    if (r.error) continue;
    const Key = `${r.prefix}/${r.out}`;
    try {
      await s3.send(
        new PutObjectCommand({
          Bucket: R2_BUCKET_NAME,
          Key,
          Body: r.Body,
          ContentType: 'image/svg+xml',
          CacheControl: 'public, max-age=31536000, immutable',
        }),
      );
      r.uploaded = true;
      r.r2Key = Key;
      r.url = `${R2_PUBLIC_URL.replace(/\/+$/, '')}/${Key}`;
      console.log(`  up  ${r.out.padEnd(38)} -> ${Key}`);
    } catch (err) {
      r.uploaded = false;
      r.uploadError = err.message;
      console.error(`  FAIL upload ${r.out}: ${err.message}`);
    }
  }

  // Phase 3: HEAD verify
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

  // Phase 3b: public URL probe
  console.log('\n=== Phase 3b: Public URL HEAD probe ===');
  for (const r of results) {
    if (r.error || !r.uploaded || !r.verified) continue;
    try {
      const res = await fetch(r.url, { method: 'HEAD' });
      r.publicStatus = res.status;
      r.publicCT = res.headers.get('content-type');
      console.log(`  ${res.ok ? 'ok ' : 'FAIL '} ${r.out.padEnd(38)} HTTP ${res.status} ${r.publicCT}`);
    } catch (err) {
      r.publicStatus = 0;
      r.publicError = err.message;
      console.error(`  FAIL fetch ${r.url}: ${err.message}`);
    }
  }

  // Phase 5: per-planet manifest (Mars + Shared groups; preserves existing keys)
  console.log('\n=== Phase 5: Manifest ===');
  const manifestPath = path.join(SCRIPTS, 'planets-mars-manifest.json');
  let manifest = {};
  try {
    manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8'));
  } catch { /* fresh */ }
  manifest.mars ??= {};
  manifest.shared ??= {};
  for (const r of results) {
    if (r.error || !r.uploaded || !r.verified || r.publicStatus !== 200) continue;
    manifest[r.group][r.slot] = {
      url: r.url,
      key: r.r2Key,
      bytes: r.optSize,
      sha256: r.sha256,
      contentType: 'image/svg+xml',
    };
  }
  manifest.deferred = {
    note: 'Slots not present in this batch; revisit during page build or next asset top-up.',
    items: ['ovalBorderMars (mantraOval)', 'infoStripMars (infoStrip — composed from stripBg + icons at render time)'],
  };
  manifest.generatedAt = new Date().toISOString();
  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
  console.log(`  Wrote ${path.relative(ROOT, manifestPath)}`);

  // Phase 6: components.json (preserves hero entry; adds Mars-specific + Shared (new) + Shared (Mercury legacy))
  console.log('\n=== Phase 6: components.json ===');
  const compPath = path.join(SRC, 'components.json');
  let comp = {};
  try {
    comp = JSON.parse(await fs.readFile(compPath, 'utf8'));
  } catch { /* fresh */ }
  comp.planet = 'Mars';
  comp.sanskrit = 'mangala';
  comp.generatedAt = new Date().toISOString();
  comp.components ??= {};

  // Preserve existing hero entry
  // Add Mars-specific slots
  for (const r of results) {
    if (r.error || !r.uploaded || !r.verified || r.publicStatus !== 200) continue;
    if (r.group !== 'mars') continue;
    comp.components[r.slot] = {
      url: r.url,
      key: r.r2Key,
      bytes: r.optSize,
      sha256: r.sha256,
      contentType: 'image/svg+xml',
    };
  }
  // Add Shared (newly uploaded under Pillar/Planets/Shared/)
  comp.shared ??= {};
  for (const r of results) {
    if (r.error || !r.uploaded || !r.verified || r.publicStatus !== 200) continue;
    if (r.group !== 'shared') continue;
    comp.shared[r.slot] = {
      url: r.url,
      key: r.r2Key,
      bytes: r.optSize,
      sha256: r.sha256,
      contentType: 'image/svg+xml',
    };
  }
  // Add Shared (Mercury legacy under Pillar/Hub/Planets/Shared/) — referenced, not duplicated.
  // These URLs are stable and already serving in production.
  comp.sharedLegacy = {
    note: 'Mercury-era Shared assets at Pillar/Hub/Planets/Shared/. Mars page can reuse these directly. Migration to Pillar/Planets/Shared/ is a separate cleanup pass.',
    base: `${R2_PUBLIC_URL.replace(/\/+$/, '')}/${MERCURY_LEGACY_SHARED_PREFIX}`,
    items: {
      notebookPage:           `${R2_PUBLIC_URL.replace(/\/+$/, '')}/${MERCURY_LEGACY_SHARED_PREFIX}/notebook-page.svg`,
      parchmentStripe:        `${R2_PUBLIC_URL.replace(/\/+$/, '')}/${MERCURY_LEGACY_SHARED_PREFIX}/parchment-textures-1-stripe.svg`,
      parchmentStickyNote:    `${R2_PUBLIC_URL.replace(/\/+$/, '')}/${MERCURY_LEGACY_SHARED_PREFIX}/parchment-sticky-note.svg`,
      sacredGeometry:         `${R2_PUBLIC_URL.replace(/\/+$/, '')}/${MERCURY_LEGACY_SHARED_PREFIX}/sacred-geometry.svg`,
      featherDoodle:          `${R2_PUBLIC_URL.replace(/\/+$/, '')}/${MERCURY_LEGACY_SHARED_PREFIX}/feather-doodle.svg`,
      diya:                   `${R2_PUBLIC_URL.replace(/\/+$/, '')}/${MERCURY_LEGACY_SHARED_PREFIX}/diya.svg`,
      offeringGheeLamp:       `${R2_PUBLIC_URL.replace(/\/+$/, '')}/${MERCURY_LEGACY_SHARED_PREFIX}/offering-ghee-lamp.svg`,
      offeringTulsi:          `${R2_PUBLIC_URL.replace(/\/+$/, '')}/${MERCURY_LEGACY_SHARED_PREFIX}/offering-tulsi.svg`,
      mandala:                `${R2_PUBLIC_URL.replace(/\/+$/, '')}/${MERCURY_LEGACY_SHARED_PREFIX}/mandla.webp`,
      bgLarge:                `${R2_PUBLIC_URL.replace(/\/+$/, '')}/${MERCURY_LEGACY_SHARED_PREFIX}/bg-large.webp`,
      bgSmall:                `${R2_PUBLIC_URL.replace(/\/+$/, '')}/${MERCURY_LEGACY_SHARED_PREFIX}/bg-small.webp`,
      stripBg:                `${R2_PUBLIC_URL.replace(/\/+$/, '')}/${MERCURY_LEGACY_SHARED_PREFIX}/strip-bg.webp`,
      allFooterImages:        `${R2_PUBLIC_URL.replace(/\/+$/, '')}/${MERCURY_LEGACY_SHARED_PREFIX}/all-footer-images.webp`,
    },
  };
  comp.deferred = {
    note: 'Asset slots not present in this batch.',
    items: {
      mantraOval: 'No Mars-themed oval border in this batch. Reuse Mercury\'s oval-border-green.svg with CSS color shift, or compose with red CSS border at render time.',
      infoStrip: 'No standalone info-strip-mars.svg. Composed from stripBg + symbolMars + iconFlame + iconSpear at render time.',
    },
  };
  await fs.writeFile(compPath, JSON.stringify(comp, null, 2) + '\n');
  console.log(`  Wrote ${path.relative(ROOT, compPath)}`);

  // Summary
  console.log('\n=== Summary ===');
  const tot = results.reduce((s, r) => s + (r.optSize || 0), 0);
  const ok = results.filter((r) => !r.error && r.uploaded && r.verified && r.publicStatus === 200).length;
  console.log(`OK ${ok}/${results.length}    total uploaded ${fmtBytes(tot)}`);
  const failed = results.filter((r) => r.error || !r.uploaded || !r.verified || r.publicStatus !== 200);
  if (failed.length) {
    console.log(`\nFAILURES (${failed.length}):`);
    for (const f of failed) console.log(`  ${f.src}: ${f.error || f.uploadError || f.verifyError || f.publicError || 'unverified'}`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('\nScript failed:', err);
  process.exit(1);
});
