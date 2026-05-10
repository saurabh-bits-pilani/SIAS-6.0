#!/usr/bin/env node
// Build-time fetch of Google reviews via Places API (New). Writes a
// normalized snapshot to src/data/google-reviews.json so the homepage can
// render reviews server-side (in the prerendered HTML) with no client
// runtime API calls. Caches for 24h to stay inside free-tier quota.
//
// Env:
//   GOOGLE_PLACES_API_KEY  — required to fetch live data. Missing = soft-fail.
//   GOOGLE_PLACE_ID        — Place ID of Soul Infinity Astro Solutions.
//   FORCE_REVIEW_FETCH=true — bypass the 24h cache check.
//
// Env source order (first hit wins):
//   1. process.env (Vercel deploy env, shell-injected vars)
//   2. .env.local at repo root (local dev convenience — file is gitignored)
//   The .env.local loader silently no-ops if the file doesn't exist (Vercel),
//   so the script behaves identically in both environments.
//
// Failure modes (all exit 0 — never breaks build):
//   - env missing      → log warning, preserve existing JSON, else seed fallback
//   - API network err  → same
//   - API 4xx/5xx      → same

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT_PATH = path.join(ROOT, 'src', 'data', 'google-reviews.json');
const EXAMPLE_PATH = path.join(ROOT, 'src', 'data', 'google-reviews.example.json');

const CACHE_MS = 24 * 60 * 60 * 1000;
const ENDPOINT_BASE = 'https://places.googleapis.com/v1/places';
const FIELD_MASK =
  'displayName,rating,userRatingCount,reviews,googleMapsUri';

function log(msg) {
  console.log(`[reviews] ${msg}`);
}
function warn(msg) {
  console.warn(`[reviews] WARNING: ${msg}`);
}

// Load .env.local into process.env for local dev. Mirrors the loadEnv()
// helper used by scripts/upload-*.mjs. Existing process.env values win
// (Vercel-injected env still authoritative). Missing file is tolerated so
// the same script runs cleanly on Vercel where .env.local doesn't exist.
async function loadEnv() {
  let raw;
  try {
    raw = await fs.readFile(path.join(ROOT, '.env.local'), 'utf8');
  } catch (err) {
    if (err.code === 'ENOENT') return;
    throw err;
  }
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

function deterministicInitial(name) {
  const trimmed = (name || '').trim();
  return trimmed ? trimmed.charAt(0).toUpperCase() : '?';
}

function isoToYearMonth(iso) {
  if (!iso) return null;
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return null;
    const y = d.getUTCFullYear();
    const m = String(d.getUTCMonth() + 1).padStart(2, '0');
    return `${y}-${m}`;
  } catch {
    return null;
  }
}

function reviewIdFromResourceName(name, fallbackIndex) {
  // Places API v1 review resource is "places/{placeId}/reviews/{reviewId}"
  if (!name || typeof name !== 'string') return `review-${fallbackIndex}`;
  const parts = name.split('/');
  return parts[parts.length - 1] || `review-${fallbackIndex}`;
}

function normalizeReview(raw, index) {
  const author = raw?.authorAttribution?.displayName ?? 'Google user';
  const text = raw?.text?.text ?? raw?.originalText?.text ?? '';
  return {
    id: reviewIdFromResourceName(raw?.name, index),
    author,
    authorInitial: deterministicInitial(author),
    authorPhotoUrl: raw?.authorAttribution?.photoUri ?? null,
    authorProfileUrl: raw?.authorAttribution?.uri ?? null,
    rating: typeof raw?.rating === 'number' ? raw.rating : 5,
    // Full ISO 8601 publishTime preserved (e.g. "2024-12-15T10:00:00Z") so
    // sorting can use day/time precision, not just year-month.
    date: raw?.publishTime ?? null,
    // Unix epoch seconds — bulletproof primary sort key. Numeric subtraction
    // is faster and avoids `new Date()` parsing per comparison in the widget.
    time: raw?.publishTime ? Math.floor(new Date(raw.publishTime).getTime() / 1000) : null,
    relativeTime: raw?.relativePublishTimeDescription ?? '',
    text,
  };
}

async function readExistingJson() {
  try {
    const raw = await fs.readFile(OUT_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function readExampleJson() {
  try {
    const raw = await fs.readFile(EXAMPLE_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function seedIfMissing() {
  const existing = await readExistingJson();
  if (existing) return existing;
  const example = await readExampleJson();
  if (example) {
    await fs.writeFile(OUT_PATH, JSON.stringify(example, null, 2) + '\n', 'utf-8');
    log(`seeded ${path.relative(ROOT, OUT_PATH)} from example`);
    return example;
  }
  const minimal = {
    aggregate: {
      averageRating: 4.9,
      totalCount: 40,
      source: 'Google Business Profile',
      lastFetched: null,
      viewAllUrl:
        'https://www.google.com/maps/search/?api=1&query=Soul+Infinity+Astro+Solutions+Ahmedabad',
    },
    reviews: [],
  };
  await fs.writeFile(OUT_PATH, JSON.stringify(minimal, null, 2) + '\n', 'utf-8');
  log('wrote minimal fallback');
  return minimal;
}

async function isCacheFresh() {
  if (process.env.FORCE_REVIEW_FETCH === 'true') return false;
  try {
    const stat = await fs.stat(OUT_PATH);
    const age = Date.now() - stat.mtimeMs;
    if (age < CACHE_MS) {
      const existing = await readExistingJson();
      // Only honor cache if it contains real reviews — don't let an
      // empty fallback prevent us from attempting a fresh fetch.
      if (existing && Array.isArray(existing.reviews) && existing.reviews.length > 0) {
        const hours = Math.round(age / 3600_000);
        log(`cache fresh (${hours}h < 24h) — skipping API call. Set FORCE_REVIEW_FETCH=true to override.`);
        return true;
      }
    }
  } catch {
    // no file → not fresh
  }
  return false;
}

async function fetchPlaceDetails(placeId, apiKey) {
  // Plain v1 endpoint — no sort query param. The legacy `reviewsSort=newest`
  // parameter is not supported by Places API (New) v1 and returned 0 reviews
  // when added on f2b9b43. Reverted on f2b9b43 follow-up. Newest-first
  // ordering is enforced client-side by the widget's time-desc sort.
  const url = `${ENDPOINT_BASE}/${encodeURIComponent(placeId)}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': FIELD_MASK,
    },
  });
  const body = await res.text();
  if (!res.ok) {
    // Don't log the API key — the URL alone is safe.
    throw new Error(`Places API ${res.status} ${res.statusText}: ${body.slice(0, 400)}`);
  }
  try {
    return JSON.parse(body);
  } catch (err) {
    throw new Error(`Places API returned non-JSON body: ${String(err)}`);
  }
}

async function main() {
  await loadEnv();
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  // Always make sure a valid JSON exists for static imports.
  await seedIfMissing();

  if (!apiKey || !placeId) {
    warn(
      'GOOGLE_PLACES_API_KEY and/or GOOGLE_PLACE_ID not set — skipping live fetch, keeping existing JSON.',
    );
    process.exit(0);
  }

  if (await isCacheFresh()) {
    process.exit(0);
  }

  let details;
  try {
    log(`fetching Places API details for place ${placeId.slice(0, 6)}…`);
    details = await fetchPlaceDetails(placeId, apiKey);
  } catch (err) {
    warn(`live fetch failed — keeping existing JSON. ${err.message}`);
    process.exit(0);
  }

  const reviewsRaw = Array.isArray(details.reviews) ? details.reviews : [];
  const reviews = reviewsRaw.map(normalizeReview);

  // Safety guard: if the live response has 0 reviews but a previous good
  // fetch wrote >0 to the file, do not overwrite. A bad query param (see
  // f2b9b43, reviewsSort=newest) or a transient API hiccup can return
  // success-but-empty; preserving the prior good JSON is strictly better
  // than zeroing out the visible cards on production.
  if (reviews.length === 0) {
    const existing = await readExistingJson();
    const prior = Array.isArray(existing?.reviews) ? existing.reviews.length : 0;
    if (prior > 0) {
      warn(
        `live fetch returned 0 reviews but existing JSON has ${prior} — keeping existing JSON. ` +
          `Investigate API response if this persists.`,
      );
      process.exit(0);
    }
    log('live fetch returned 0 reviews and prior JSON also empty; writing empty as-is.');
  }

  const output = {
    aggregate: {
      averageRating:
        typeof details.rating === 'number' ? details.rating : 4.9,
      totalCount:
        typeof details.userRatingCount === 'number'
          ? details.userRatingCount
          : 40,
      source: 'Google Business Profile',
      lastFetched: new Date().toISOString(),
      viewAllUrl:
        typeof details.googleMapsUri === 'string' && details.googleMapsUri.length > 0
          ? details.googleMapsUri
          : 'https://www.google.com/maps/search/?api=1&query=Soul+Infinity+Astro+Solutions+Ahmedabad',
    },
    reviews,
  };

  await fs.writeFile(OUT_PATH, JSON.stringify(output, null, 2) + '\n', 'utf-8');
  log(
    `wrote ${reviews.length} review(s), rating=${output.aggregate.averageRating} (${output.aggregate.totalCount} total) → ${path.relative(ROOT, OUT_PATH)}`,
  );
  process.exit(0);
}

main().catch((err) => {
  warn(`unexpected crash — keeping existing JSON. ${err?.stack || String(err)}`);
  process.exit(0);
});
