#!/usr/bin/env node
/**
 * One-shot: convert Sun pillar v2 source assets and upload to R2.
 *
 * Source dir: assets-to-upload/
 * Converted dir: assets-to-upload/converted/
 * R2 key prefix: Pillar/Planets/Sun/
 *
 * Not added to npm scripts on purpose — single-use migration helper.
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'assets-to-upload');
const OUT = path.join(SRC, 'converted');

// Minimal .env.local parser — project avoids pulling dotenv for a one-off.
async function loadEnv() {
  const envPath = path.join(ROOT, '.env.local');
  const raw = await fs.readFile(envPath, 'utf8');
  for (const line of raw.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq < 0) continue;
    const k = trimmed.slice(0, eq).trim();
    let v = trimmed.slice(eq + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    if (!(k in process.env)) process.env[k] = v;
  }
}

async function size(p) {
  const s = await fs.stat(p);
  return s.size;
}

function fmt(n) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(2)} MB`;
}

async function convertParchment() {
  const src = path.join(SRC, 'parchment-texture.jpeg');
  const dst = path.join(OUT, 'parchment-texture.webp');
  const before = await size(src);
  await sharp(src).webp({ quality: 85 }).toFile(dst);
  const after = await size(dst);
  return { src, dst, before, after, contentType: 'image/webp' };
}

async function convertRuby() {
  const src = path.join(SRC, 'ruby-ring.png');
  const dst = path.join(OUT, 'ruby-ring.webp');
  const before = await size(src);
  await sharp(src).webp({ quality: 90, alphaQuality: 90 }).toFile(dst);
  const after = await size(dst);
  return { src, dst, before, after, contentType: 'image/webp' };
}

async function passthroughPng(filename) {
  const src = path.join(SRC, filename);
  const before = await size(src);
  return { src, dst: src, before, after: before, contentType: 'image/png' };
}

async function main() {
  await fs.mkdir(OUT, { recursive: true });
  await loadEnv();

  const required = [
    'R2_ACCOUNT_ID',
    'R2_ACCESS_KEY_ID',
    'R2_SECRET_ACCESS_KEY',
    'R2_BUCKET_NAME',
    'R2_ENDPOINT',
    'R2_PUBLIC_URL',
  ];
  for (const k of required) {
    if (!process.env[k]) throw new Error(`Missing env var: ${k}`);
  }

  console.log('\n==> Converting\n');
  const parchment = await convertParchment();
  console.log(
    `parchment-texture.jpeg → parchment-texture.webp   ${fmt(parchment.before)} → ${fmt(parchment.after)}`,
  );

  const ruby = await convertRuby();
  console.log(
    `ruby-ring.png           → ruby-ring.webp           ${fmt(ruby.before)} → ${fmt(ruby.after)}`,
  );

  const doodleNames = [
    'doodle-sun.png',
    'doodle-lion.png',
    'doodle-scales.png',
    'doodle-temple.png',
    'feather-quill.png',
  ];
  const doodles = [];
  for (const n of doodleNames) {
    const d = await passthroughPng(n);
    doodles.push({ ...d, keyName: n });
    console.log(`${n.padEnd(24)} (PNG passthrough)        ${fmt(d.before)}`);
  }

  // Build upload manifest: { keyName, localPath, contentType, beforeSize, afterSize }
  const uploads = [
    { keyName: 'parchment-texture.webp', localPath: parchment.dst, contentType: parchment.contentType, before: parchment.before, after: parchment.after },
    { keyName: 'ruby-ring.webp',          localPath: ruby.dst,      contentType: ruby.contentType,      before: ruby.before,      after: ruby.after },
    ...doodles.map((d) => ({ keyName: d.keyName, localPath: d.src, contentType: d.contentType, before: d.before, after: d.after })),
  ];

  const s3 = new S3Client({
    region: 'auto',
    endpoint: process.env.R2_ENDPOINT,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
  });
  const bucket = process.env.R2_BUCKET_NAME;
  const publicBase = process.env.R2_PUBLIC_URL.replace(/\/$/, '');

  console.log('\n==> Uploading\n');
  const results = [];
  for (const u of uploads) {
    const Key = `Pillar/Planets/Sun/${u.keyName}`;
    const Body = await fs.readFile(u.localPath);
    try {
      await s3.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key,
          Body,
          ContentType: u.contentType,
          CacheControl: 'public, max-age=31536000, immutable',
        }),
      );
      console.log(`  PUT ok   ${Key}  (${fmt(u.after)})`);
      results.push({ ...u, Key, uploadOk: true });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.log(`  PUT FAIL ${Key}  — ${msg}`);
      results.push({ ...u, Key, uploadOk: false, error: msg });
    }
  }

  console.log('\n==> Verifying public URLs\n');
  for (const r of results) {
    const url = `${publicBase}/${r.Key}`;
    try {
      const res = await fetch(url, { method: 'HEAD' });
      r.httpStatus = res.status;
      console.log(`  ${res.status}  ${url}`);
    } catch (err) {
      r.httpStatus = -1;
      console.log(`  ERR  ${url}  — ${err.message}`);
    }
  }

  console.log('\n==> Summary table\n');
  const header = '| filename | original | uploaded | upload | public |';
  const sep = '|---|---|---|---|---|';
  console.log(header);
  console.log(sep);
  for (const r of results) {
    const name = r.keyName;
    const orig = fmt(r.before);
    const up = fmt(r.after);
    const uploaded = r.uploadOk ? 'ok' : 'FAIL';
    const http = r.httpStatus === 200 ? '200' : String(r.httpStatus ?? '-');
    console.log(`| ${name} | ${orig} | ${up} | ${uploaded} | ${http} |`);
  }

  const anyFail = results.some((r) => !r.uploadOk || r.httpStatus !== 200);
  process.exit(anyFail ? 1 : 0);
}

main().catch((err) => {
  console.error('Upload script failed:', err);
  process.exit(1);
});
