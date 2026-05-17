#!/usr/bin/env node
/**
 * Batch uploader for the 10 remaining zodiac signs.
 * Reads a sign config and uploads 4 assets (hero, mantra-bg, quick-facts, card)
 * to R2 under Zodiac/<R2_FOLDER>/.
 *
 * Usage: node scripts/upload-zodiac-batch.mjs <sign>
 * Where <sign> is one of: gemini, cancer, leo, virgo, libra, scorpio, sagittarius, capricorn, aquarius, pisces
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { S3Client, PutObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const SIGN_CONFIGS = {
  gemini: {
    sanskrit: 'mithuna',
    src_folder: 'Gemini',
    r2_folder: 'Gemini',
    hero_src: 'hero-banner-gemini-rashi.png',
    mantra_src: 'mantra-background-gemini-rashi.png',
    qf_src: 'Gemini-Rashi-Quick-Facts-Strip.png',
    card_src: 'Gemini-card.png',
  },
  cancer: {
    sanskrit: 'karka',
    src_folder: 'Cancer',
    r2_folder: 'Cancer',
    hero_src: 'hero-banner-cancer-rashi.png',
    mantra_src: 'mantra-background-cancer.png',
    qf_src: 'cancer Rashi Quick Facts Strip.png',
    card_src: 'cancer-card.png',
  },
  leo: {
    sanskrit: 'simha',
    src_folder: 'Leo',
    r2_folder: 'Leo',
    hero_src: 'hero-banner-leo-rashi.png',
    mantra_src: 'mantra-background-leo-rashi.png',
    qf_src: 'leo Rashi Quick Facts Strip.png',
    card_src: 'Leo-card.png',
  },
  virgo: {
    sanskrit: 'kanya',
    src_folder: 'Virgo',
    r2_folder: 'Virgo',
    hero_src: 'hero-banner-virgo-rashi.png',
    mantra_src: 'mantra-background-virgo.png',
    qf_src: 'Virgo Rashi Quick Facts Strip.png',
    card_src: 'virgo-card.png',
  },
  libra: {
    sanskrit: 'tula',
    src_folder: 'Libra',
    r2_folder: 'Libra',
    hero_src: 'hero-banner-libra-rashi.png',
    mantra_src: 'mantra-background-libra.png',
    qf_src: 'libra Rashi Quick Facts Strip.png',
    card_src: 'Libra-card.png',
  },
  scorpio: {
    sanskrit: 'vrischika',
    src_folder: 'Scorpio',
    r2_folder: 'Scorpio',
    hero_src: 'hero-banner-scorpio-rashi.png',
    mantra_src: 'mantra-background-scorpio.png',
    qf_src: 'Scorpio Rashi Quick Facts Strip.png',
    card_src: 'Scorpio.png',
  },
  sagittarius: {
    sanskrit: 'dhanu',
    src_folder: 'Sagittarius',
    r2_folder: 'Sagittarius',
    hero_src: 'hero-banner-sagittarius-rashi.png',
    mantra_src: 'mantra-background-Sagittarius.png',
    qf_src: 'Sagittarius Rashi Quick Facts Strip.png',
    card_src: 'Sagittarius.png',
  },
  capricorn: {
    sanskrit: 'makara',
    src_folder: 'Capricorn',
    r2_folder: 'Capricorn',
    hero_src: 'hero-banner-capricon-rashi.png',
    mantra_src: 'mantra-background-capricon.png',
    qf_src: 'capricon Rashi Quick Facts Strip.png',
    card_src: 'capricon.png',
  },
  aquarius: {
    sanskrit: 'kumbha',
    src_folder: 'Aquarius',
    r2_folder: 'Aquarius',
    hero_src: 'hero-banner-aquarius-rashi.png',
    mantra_src: 'mantra-background-aquarius.png',
    qf_src: 'Aquarius Rashi Quick Facts Strip.png',
    card_src: 'Aquarius-card.png',
  },
  pisces: {
    sanskrit: 'meena',
    src_folder: 'Pisces',
    r2_folder: 'Pisces',
    hero_src: 'hero-banner-pisces-rashi.png',
    mantra_src: 'mantra-background-pisces.png',
    qf_src: 'Pisces Rashi Quick Facts Strip.png',
    card_src: 'pisces-card.png',
  },
};

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

async function encodeToFitBudget(srcPath, dstPath, item) {
  const qualities = [90, 85, 80, 75, 70, 65, 60, 55, 50, 45];
  let lastSize = Infinity;
  let lastQuality = null;
  for (const q of qualities) {
    await sharp(srcPath)
      .resize(item.maxWidth, item.maxHeight, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: q, alphaQuality: item.preserveAlpha ? 90 : 80, effort: 6 })
      .toFile(dstPath);
    lastSize = (await fs.stat(dstPath)).size;
    lastQuality = q;
    if (lastSize <= item.maxBytes) break;
  }
  return { size: lastSize, quality: lastQuality, fits: lastSize <= item.maxBytes };
}

async function uploadOneSign(sign, cfg, s3, R2_BUCKET_NAME, R2_PUBLIC_URL) {
  const SRC_DIR = path.join(ROOT, 'assets-to-upload', cfg.src_folder);
  const OUT_DIR = path.join(ROOT, 'assets-to-upload', '.optimized', cfg.src_folder);
  const R2_PREFIX = `Zodiac/${cfg.r2_folder}`;
  await fs.mkdir(OUT_DIR, { recursive: true });

  const PLAN = [
    { role: 'hero', src: cfg.hero_src, out: `hero-banner-${cfg.sanskrit}-rashi.webp`, maxBytes: 400 * 1024, maxWidth: 1600, maxHeight: null },
    { role: 'quick-facts', src: cfg.qf_src, out: `quick-facts-${cfg.sanskrit}-rashi.webp`, maxBytes: 400 * 1024, maxWidth: 1600, maxHeight: null },
    { role: 'mantra-bg', src: cfg.mantra_src, out: `mantra-bg-${cfg.sanskrit}-rashi.webp`, maxBytes: 400 * 1024, maxWidth: 1600, maxHeight: null },
    { role: 'card', src: cfg.card_src, out: `${cfg.sanskrit}-card.webp`, maxBytes: 200 * 1024, maxWidth: 800, maxHeight: 800, preserveAlpha: true },
  ];

  const results = [];
  console.log(`\n=== ${sign} :: convert + upload (4 files) ===`);
  for (const item of PLAN) {
    const srcPath = path.join(SRC_DIR, item.src);
    const dstPath = path.join(OUT_DIR, item.out);
    const origSize = (await fs.stat(srcPath)).size;
    const r = await encodeToFitBudget(srcPath, dstPath, item);
    const meta = await sharp(dstPath).metadata();
    console.log(`  enc ${item.out.padEnd(40)} ${fmtBytes(origSize).padStart(10)} -> ${fmtBytes(r.size).padStart(10)} q=${r.quality} ${meta.width}x${meta.height}`);
    const Key = `${R2_PREFIX}/${item.out}`;
    const Body = await fs.readFile(dstPath);
    await s3.send(
      new PutObjectCommand({
        Bucket: R2_BUCKET_NAME,
        Key,
        Body,
        ContentType: 'image/webp',
        CacheControl: 'public, max-age=31536000, immutable',
      }),
    );
    const head = await s3.send(new HeadObjectCommand({ Bucket: R2_BUCKET_NAME, Key }));
    const url = `${R2_PUBLIC_URL.replace(/\/+$/, '')}/${Key}`;
    const probe = await fetch(url, { method: 'HEAD' });
    const ok = head.ContentLength === r.size && probe.status === 200;
    console.log(`  ${ok ? 'ok ' : 'FAIL'} ${url}`);
    results.push({ role: item.role, url, ok });
  }
  return results;
}

async function main() {
  const target = process.argv[2];
  if (!target) {
    console.error('Usage: node scripts/upload-zodiac-batch.mjs <sign>');
    console.error('       <sign>: ' + Object.keys(SIGN_CONFIGS).join(', ') + ', or "all"');
    process.exit(1);
  }

  await loadEnv();
  const required = ['R2_ACCESS_KEY_ID', 'R2_SECRET_ACCESS_KEY', 'R2_BUCKET_NAME', 'R2_ENDPOINT', 'R2_PUBLIC_URL'];
  for (const k of required) if (!process.env[k]) throw new Error(`Missing env var: ${k}`);
  const { R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME, R2_ENDPOINT, R2_PUBLIC_URL } = process.env;

  const s3 = new S3Client({
    region: 'auto',
    endpoint: R2_ENDPOINT,
    credentials: { accessKeyId: R2_ACCESS_KEY_ID, secretAccessKey: R2_SECRET_ACCESS_KEY },
  });

  const signs = target === 'all' ? Object.keys(SIGN_CONFIGS) : [target];
  for (const sign of signs) {
    const cfg = SIGN_CONFIGS[sign];
    if (!cfg) {
      console.error(`Unknown sign: ${sign}`);
      process.exit(1);
    }
    const r = await uploadOneSign(sign, cfg, s3, R2_BUCKET_NAME, R2_PUBLIC_URL);
    if (r.some((x) => !x.ok)) {
      console.error(`\n[${sign}] FAILED some uploads`);
      process.exit(1);
    }
  }

  console.log('\n=== ALL DONE ===');
}

main().catch((err) => {
  console.error('\nScript failed:', err.message || err);
  process.exit(1);
});
