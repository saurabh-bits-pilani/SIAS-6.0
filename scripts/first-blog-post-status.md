# First Blog Post — STATUS = SHIPPED TO FEATURE BRANCH, PR OPEN, PREVIEW LIVE

**Branch:** `feature/first-blog-post` (off `main` @ `ef8e7de`)
**Date:** 2026-05-04
**Result:** All 8 validation gates green. Feature work committed and pushed. PR to staging opened. Vercel preview URL will be appended to this doc once the build resolves.

---

## What got done

### Phase 1, staging → main promote — DONE
- `staging` (88cd8c9) merged into `main` (no-ff) as commit `ef8e7de` "merge: schema patch + blog MDX architecture into main"
- Pushed to `origin/main`
- Vercel production build: ✓ success (https://vercel.com/saurabh-bits-pilanis-projects/soul-infinity.com/DtWZjEndrtWXcDotV6VAao8dfC8u)
- Live spot-checks all 200; `inLanguage:en-IN` confirmed on `/services/vedic-astrology`; `/blog/_template` returns 404; sitemap clean.

### Phase 2, hero image to R2 — DONE
- Source: `blog-images-folder/Saurabh-jain-portrait.jpeg` (PNG bytes, 1086x1448, 2.07 MB)
- Processed via sharp: 1200x630 cover (`position: 'attention'`), WebP q=85 → 75.2 KB (-96.5%)
- Uploaded to R2 at `Blog/finding-a-vedic-astrologer-in-ahmedabad/hero.webp`
- Public URL: `https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Blog/finding-a-vedic-astrologer-in-ahmedabad/hero.webp` → HTTP 200, image/webp, 75.2 KB
- Upload script: `scripts/upload-blog-first-post-hero.mjs` (committed)

### Phase 3, build fix (Option A — pre-extract frontmatter to JSON manifest) — DONE
The `@mdx-js/rollup` `?raw` query conflict is resolved. Implementation:

1. New script `scripts/generate-blog-manifest.mjs` (~115 lines):
   - Reads `content/blog/*.mdx`
   - Skips `_template.mdx` explicitly + skips files with `draft: true`
   - Parses frontmatter with `gray-matter` at build time
   - On parse failure for any single file: appends a "Manifest generation errors" section to this status doc and exits non-zero (no silent skipping of bad frontmatter)
   - Writes `src/data/blog-manifest.json` with shape `{ [slug]: PostFrontmatter }`

2. `package.json`:
   - Added `"build:blog-manifest": "node scripts/generate-blog-manifest.mjs"`
   - Added `"prebuild": "npm run build:blog-manifest"` (auto-runs before `vite build` via npm lifecycle hook)

3. `.gitignore`:
   - Added `src/data/blog-manifest.json` (matches sitemap.xml/llms.txt regenerated-file pattern)
   - Added `blog-images-folder/` (source images staged for R2 upload; R2 is the canonical store post-upload)

4. `src/pages/BlogPost.tsx`:
   - Removed the `?raw` glob and the runtime `matter()` call
   - Removed the `gray-matter` import (still used by `scripts/prerender.mjs` so the npm dep stays)
   - Added `import blogManifest from '../data/blog-manifest.json'`
   - `resolvePost()` does a direct map lookup on slug from the manifest, then walks `POST_MODULES` to find the body component
   - Schema generation untouched (Article + FAQ + Person inline)
   - `_template.mdx` not modified (per Option B frontmatter shape decision)

### Phase 4, MDX content + K.N. Rao link cleanup — DONE
`content/blog/finding-a-vedic-astrologer-in-ahmedabad.mdx`:
- 2,639 word body (target was 2200-2500, 139 over upper bound — soft target, not in the hard-gate list)
- All 6 FAQ entries in frontmatter `faqs` array (drives FAQPage JSON-LD)
- All 5 target keywords placed naturally (no stuffing)
- No em-dashes, no emojis, no Gujarati, all Sanskrit terms translated on first use
- K.N. Rao link cleanup applied per your instructions:
  - Removed the Wikipedia link
  - Rewrote the clause to: _"the school of Jyotish... established under the late Shri K.N. Rao, founder of the [Bharatiya Vidya Bhavan school of astrology](https://www.bvbdelhi.org/astrology/) in New Delhi"_
  - Verified `https://www.bvbdelhi.org/astrology/` returns 200; this is the canonical Institute of Astrology landing page (the `/institute-of-astrology` path you mentioned does not resolve; the canonical path is `/astrology/`)
- Internal links: `/services/vedic-astrology` (Section 7 + FAQ Q4), `/planets/saturn` (Vimshottari dasha)
- Person schema injected for Saurabh Jain with full field shape per brief

### Phase 5, llms.txt entry — DONE
Added the new route + description to `scripts/generate-llms.mjs`:
- DESCRIPTIONS map: new entry mirrors `/zodiac/aries` style (label + ` — ` separator + topical phrases + author/brand attribution)
- SECTIONS map: added route under "Content" heading next to `/blog` and `/blog/mantra` so it actually renders into `dist/llms.txt`

---

## Validation gate results (all 8 + 2 bonus)

| # | Gate | Result | Detail |
|---|---|---|---|
| 1 | `npm run build` green | ✓ PASS | Full pipeline runs, exit 0 |
| 2 | Manifest generated correctly | ✓ PASS | `src/data/blog-manifest.json` contains `finding-a-vedic-astrologer-in-ahmedabad` with all expected fields including the 6-entry `faqs` array |
| 3 | Prerender count = 42 routes | ✓ PASS | `Prerendered 42 routes.` (40 static + `/zodiac/aries` + new blog post) |
| 4 | `/blog/finding-...` route in `dist/` | ✓ PASS | `dist/blog/finding-a-vedic-astrologer-in-ahmedabad/index.html` (45,468 bytes) |
| 5 | View-source has BlogPosting + FAQPage + Person JSON-LD | ✓ PASS | All three present (1 hit each) |
| 6 | `/sitemap.xml` contains the new URL | ✓ PASS | 1 hit; 41 total `<loc>` entries (was 40, +1 for new post) |
| 7 | `/llms.txt` contains the new URL with description | ✓ PASS | 1 hit, full description rendered under "Content" section |
| 8 | `grep -n "—"` on the .mdx | ✓ PASS | empty |
| bonus | `_template.mdx` not in `dist/blog/` | ✓ PASS | `dist/blog/` contains only `finding-a-vedic-astrologer-in-ahmedabad/`, `mantra/`, `index.html` |
| bonus | Hero image still 200 | ✓ PASS | image/webp, 75.2 KB |

---

## Commit + push (Phase 4 of original brief)

**Commit:** `b04f9c5` — `feat(blog): publish first post — finding a vedic astrologer in ahmedabad`

Files committed (8):
- `M .gitignore` (manifest + blog-images-folder rules)
- `M package.json` (build:blog-manifest + prebuild)
- `M scripts/generate-llms.mjs` (DESCRIPTIONS + SECTIONS entries for new route)
- `M src/pages/BlogPost.tsx` (manifest-based frontmatter, FAQ + Person schema)
- `A scripts/generate-blog-manifest.mjs` (build-time frontmatter extraction)
- `A scripts/upload-blog-first-post-hero.mjs` (one-shot R2 upload)
- `A scripts/first-blog-post-status.md` (this file)
- `A content/blog/finding-a-vedic-astrologer-in-ahmedabad.mdx` (the post)

**Pushed to:** `origin/feature/first-blog-post`

---

## PR (Phase 5 of original brief)

**PR:** [#1 — feature/first-blog-post → staging](https://github.com/saurabh-bits-pilani/SIAS-6.0/pull/1)

**Vercel preview URL:** https://soul-infinity-b3r2eo5o4-saurabh-bits-pilanis-projects.vercel.app
**Vercel inspector:** https://vercel.com/saurabh-bits-pilanis-projects/soul-infinity.com/Bgwb5zmsUmQxtKJurhkm9FsPJv2U
**Build status:** ✓ success (state=success per GitHub commit-status API)
**Note:** preview is gated by Vercel SSO Auth. Anonymous `curl` returns HTTP 401 for all paths. Open the URL in a browser session that's already logged into the Vercel team to spot-check the rendered post.

---

## Open TODOs (carried forward, all non-blocking)

1. **GBP URL for Section 7**: not provided. Current CTA reads "find us on Google" without a deep-link. Paste the canonical Google Maps URL whenever you have it; I'll wire it in as a follow-up commit.
2. **Word count**: 2,639 vs 2,500 cap (5.5% over). Trim or ship as is?
3. **Person schema `alumniOf`**: still uses literal "K.N. Rao Institute of Vedic Astrology" per the original brief. The MDX prose now refers to the Bharatiya Vidya Bhavan school of astrology. If you want the schema's `alumniOf` updated to "Bharatiya Vidya Bhavan school of astrology" (or a combined string), tell me.
4. **Em-dashes in `scripts/generate-llms.mjs`**: this file already had 29 em-dashes in DESCRIPTIONS values (parked from the staging-promote sweep). My new entry adds one more, matching house style. The file is generated content for AI crawlers, not application source code — `grep -rn "—" src/` (the canonical hard-rule gate) remains empty.

---

## Stopped here per instruction

`feature/first-blog-post` has the full feature commit (`b04f9c5`) plus a docs follow-up (`5cf5d77`) and is pushed. PR #1 is open against `staging` with the Vercel preview build green. **No merge to staging or main has happened.**

---

## Follow-ups (parked, not actioned today)

- Refactor `scripts/generate-llms.mjs` to auto-discover blog routes from `src/data/blog-manifest.json` and emit a "Blog" section automatically. Removes the manual two-line edit (DESCRIPTIONS + SECTIONS) for every future post. ~30 lines of script change.

---

## Blog index manifest wiring

**Branch:** `feature/blog-index-manifest` (off `feature/first-blog-post` @ `59cd7bf`)
**Commit:** `a3a0d7d` — `feat(blog): wire Blog index to manifest, render real posts`
**PR:** [#2 — feature/blog-index-manifest → staging](https://github.com/saurabh-bits-pilani/SIAS-6.0/pull/2) (stacked on PR #1; merge order is #1 then #2)
**Vercel preview URL:** https://soul-infinity-714mxtc6p-saurabh-bits-pilanis-projects.vercel.app
**Vercel inspector:** https://vercel.com/saurabh-bits-pilanis-projects/soul-infinity.com/xWFZg57fLdPuTMygLejKvbWRXhiZ
**Build status:** ✓ success

### What changed in `src/pages/Blog.tsx`
1 file changed, 41 insertions(+), 33 deletions(-):
- Deleted the hardcoded `mockPosts` array (lines 22-38, the Ketu Medium link).
- Added `import blogManifest from '../data/blog-manifest.json'` plus a typed `ManifestEntry` interface.
- Built `POSTS` at module init: `Object.values(manifest)` → `draft !== true` filter (defensive) → newest-first sort by `date` → mapped to the existing `BlogPost` interface (slug used as id, internal `/blog/${slug}` URLs, hero from R2, "8 min read" placeholder).
- Replaced two off-site `<a target="_blank">` links with react-router `<Link to={...}>` so internal posts open in the same tab. (Featured-post button + each grid card.)
- Removed the `ExternalLink` lucide import (no more external links from the blog index).
- Swapped the `<SEOHead image="...">` prop on the `/blog` index page from the old Ketu illustration (`pub-5d1db6...Blog Images- Ancient Wisdom/2_rahu_ketu_mysteries...jpeg`) to the new post's hero (`pub-e1337...Blog/finding-a-vedic-astrologer-in-ahmedabad/hero.webp`).
- All visual JSX, framer-motion animations, category filter buttons, and newsletter section: unchanged.

### Decision on Medium Ketu article
**Removed entirely** (option a from the brief). Mixing internal canonical posts with external Medium links on the same `/blog` index dilutes SEO signal. Saurabh can re-publish Ketu as a real on-site MDX post if he wants it back.

### Validation gate results
| Gate | Result |
|---|---|
| `npm run build` green | ✓ |
| Prerender count = 42 (unchanged, component-level change) | ✓ |
| `/blog` index contains `finding-a-vedic-astrologer-in-ahmedabad` | ✓ (1 hit) |
| `/blog` index does NOT contain "Ketu" (case-sensitive) | ✓ (0 hits) |
| `/blog` index does NOT contain "ketu" (case-insensitive) | ✓ (0 hits) |
| Card image src on new post = R2 hero URL | ✓ (2 occurrences: featured + grid) |
| Card link href = relative `/blog/finding-a-vedic-astrologer-in-ahmedabad` | ✓ (2 occurrences) |
| New hero URL `Blog/finding-a-vedic-astrologer-in-ahmedabad/hero.webp` present | ✓ (2 hits) |
| Title in cards section | ✓ ("How to Find a Genuine Vedic Astrologer in Ahmedabad: A Practical Guide") |
| Description visible | ✓ |
| Date renders | ✓ ("May 04, 2026") |

A "no orphaned-bucket references" gate from the brief was dropped after diagnosis (see architectural note below).

### Architectural note: two R2 buckets in use
- **`pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev`** — site-wide branding and ambient assets (favicons, site logo, social share icons, hero banners, newsletter backgrounds, `People/`, `Spritual/`, `Logo/`, `Icons/`, `favicon_io/`, `New_Hero-image- banner/` prefixes). Referenced from Layout, Header, Footer, `Blog.tsx` hero banner, `Blog.tsx` newsletter section.
- **`pub-e1337dd263d041bba0fa87fe1c597575.r2.dev`** — content-specific assets (`Pillar/Planets/`, `Pillar/Zodiac/`, `Blog/<slug>/` prefixes). Hero images for blog posts and pillar pages.
- Both are active. Neither is orphaned. Past sessions documented only one bucket; the other was not in project memory but is in active use.

### Parked tech debt (from this wiring, not actioned)
- `/blog` index OG image should auto-update to the most recent post's hero, or use a dedicated Soul Infinity blog banner. Currently hardcoded to the Ahmedabad post's hero in `Blog.tsx`. Acceptable for now (only one post on index).
- Category filter buttons (lines 41-47) hardcode `'Vedic Astrology'`, `'Planetary Wisdom'`, `'Spiritual Growth'`, `'Modern Applications'`, `'Remedial Measures'`. The new post's category is `'Vedic Astrology Guide'`, which doesn't match any filter button — so the post only appears under "All". Either rename the button to "Vedic Astrology Guide", broaden filter logic to substring match, or extend manifest to drive the category list. Not in this scope.
- `readTime` is a static `"8 min read"` string for all manifest posts. To compute properly, add a body-word-count field to the build-time manifest extraction, then derive at-read-time. Not in this scope.

### Stopped here per instruction
PR #2 open. Vercel preview green. **No merge to staging or main has happened.** Awaiting your call on (a) merging PR #1 then PR #2 to staging, or (b) any of the parked items above.
