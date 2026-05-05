# Blog Detail Page Redesign — STATUS = SHIPPED, PR OPEN, PREVIEW LIVE

**Branch:** `feature/blog-detail-redesign` (off `staging` @ `83613b3`, per Saurabh's revised base instruction; original brief said `main @ ef8e7de` but staging was promoted in the May 5 PR #1 + PR #2 merges so the redesign now branches off staging which has the manifest infrastructure).
**Date:** 2026-05-05
**Result:** All Phase 1-4 gates green. Awaiting commit, push, PR, and Vercel preview URL capture (in progress).

---

## Phase 1 — Infrastructure

### Phase 1.1 — typography plugin install
- **Installed:** `@tailwindcss/typography@^0.5.19` as devDependency
- Command: `npm install -D @tailwindcss/typography` → 203 packages, no install errors
- Note: npm reports 23 pre-existing audit findings (2 low / 10 moderate / 11 high), unrelated to this install. Not actioned in this PR.

### Phase 1.2 — `tailwind.config.js` changes
- **NEW** `colors.blog.*` namespace (9 keys: `navy`, `navy-light`, `gold`, `gold-bright`, `red-warm`, `red-deep`, `cream`, `cream-soft`, `ink`). Existing `primary`, `secondary`, `accent`, `surface` untouched.
- **NEW** `fontFamily.poppins` alias (was previously only available via `font-heading`; the brief uses `font-poppins` directly so a dedicated alias was added; backward-compatible).
- **NEW** `typography.blog` variant with all CSS vars, element overrides (h1/h2/h3/p/blockquote/table/thead/tbody/a/ul/ol/marker), and the `blockquote p:first-of-type::before` / `:last-of-type::after` content-suppression rules per spec.
- **NEW** `plugins: [typography]` (was `plugins: []`).

### Phase 1.3 — Phase 1 validation
| Gate | Result |
|---|---|
| `npm run build` green | ✓ exit 0 |
| Prerender count = 42 routes | ✓ unchanged |
| `grep -rn "—" src/` empty | ✓ 0 hits (after fixing one stray em-dash in a comment I wrote in BlogPost.tsx, see Phase 4 below) |
| No Tailwind regressions on home, services, planets/jupiter, zodiac/aries | ✓ all routes prerendered, classes resolve |

---

## Phase 2 — Hero Image

### 2.1-2.5 Hero banner v2
| Step | Detail |
|---|---|
| Source | `blog-images-folder/saurabh-hero-banner-blog-2.png` (PNG, 1536×1024, 2.71 MB) |
| Sharp transform | resize to 1600×1000 (cover, position attention) → WebP q=85 effort=5 |
| Output | `/tmp/saurabh-hero-banner-blog-2.webp` (227.0 KB, -91.6% from source) |
| R2 key | `Blog/finding-a-vedic-astrologer-in-ahmedabad/hero-banner-v2.webp` |
| Public URL | `https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Blog/finding-a-vedic-astrologer-in-ahmedabad/hero-banner-v2.webp` |
| HTTP probe | ✓ 200, Content-Type `image/webp` |
| Old hero `hero.webp` | left in place at R2 (not overwritten) |
| MDX frontmatter | `heroImage` updated to v2 URL; `heroImageAlt` updated to spec text ("...with cosmic constellations and zodiac wheel") |

---

## Phase 3.5 — Brand assets uploaded

Uploaded via `scripts/upload-blog-redesign-assets.mjs` (one-shot script, committed alongside).

### Author portrait (Phase 2.6)
| Field | Value |
|---|---|
| Source | `blog-images-folder/saurabh-round-stamp-size.png` (PNG, 1254×1254, 1.72 MB) |
| Transform | resize 256×256 cover → WebP q=85 |
| R2 key | `Brand/Saurabh/author-portrait-256.webp` |
| Output bytes | 7.4 KB |
| Public URL | `https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Brand/Saurabh/author-portrait-256.webp` |
| HTTP probe | ✓ 200, Content-Type `image/webp` |
| Consumer in this PR | `BlogPost.tsx` Author card (sidebar widget) via the `AUTHOR_PORTRAIT_URL` module-level constant |

### Master cutout WebP (Phase 2.7)
| Field | Value |
|---|---|
| Source | `blog-images-folder/saurabh-without-bg.png` (PNG, 1275×1234, 1.52 MB) |
| Transform | no resize (preserve master quality) → WebP q=90 alphaQuality=90 effort=6 |
| R2 key | `Brand/Saurabh/portrait-cutout-transparent.webp` |
| Output dims/bytes | 1275×1234, 137.2 KB |
| Public URL | `https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Brand/Saurabh/portrait-cutout-transparent.webp` |
| HTTP probe | ✓ 200, Content-Type `image/webp` |
| Consumer in this PR | none (brand asset, future use) |

### Master cutout PNG, alpha preserved (Phase 2.7)
| Field | Value |
|---|---|
| Source | `blog-images-folder/saurabh-without-bg.png` (1275×1234, 1.52 MB) |
| Transform | raw byte copy (no transform) |
| R2 key | `Brand/Saurabh/portrait-cutout-transparent.png` |
| Output dims/bytes | 1275×1234, 1.52 MB |
| Public URL | `https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Brand/Saurabh/portrait-cutout-transparent.png` |
| HTTP probe | ✓ 200, Content-Type `image/png` |
| Consumer in this PR | none (brand asset, future use) |

---

## Phase 4 — `BlogPost.tsx` rewrite

### Line counts
- **Before:** 280 lines (manifest-based version from PR #1)
- **After:** ~470 lines

### Sections rendered (in order)
1. `<SEOHead>` — preserved schema injection (BlogPosting + FAQPage + Person), new `image` URL points at `hero-banner-v2.webp`
2. **Hero `<section>`** — `bg-blog-navy py-12 md:py-20`, decorative constellation SVG (40 stars + 4 polylines), grid `lg:grid-cols-[1fr_500px]`:
   - **Left:** inline breadcrumb (Home / Blog / category / title), gold category pill with `Sparkles` icon, Sacramento H1, Poppins excerpt, meta row (Calendar / Clock / User), mobile-only hero image (`lg:hidden`)
   - **Right:** desktop-only hero image (`hidden lg:block`)
3. **Content `<section>`** — `bg-blog-cream-soft py-12 md:py-16`, grid `lg:grid-cols-[1fr_320px]`:
   - **Left col:**
     - TOC card desktop (`hidden lg:block`, two-column grid of H2 anchor links)
     - TOC card mobile (`<details>` accordion, single column)
     - `<article className="blog-content prose prose-blog max-w-none">` with `<Content />` (MDX body)
     - FAQ section (`<details>` accordion mapping `fm.faqs`)
     - Bottom CTA banner (navy, decorative SVG corner, gold button → /services/vedic-astrology)
   - **Right col `<aside lg:sticky lg:top-24>`:**
     - Share widget (Twitter / Facebook / WhatsApp anchors + Copy `<button>` with `handleCopyLink` + Bookmark visual `<button>`)
     - Author card (cream, `AUTHOR_PORTRAIT_URL` 64×64 round, bio, "View More Articles" outline button → /blog)
     - Dark CTA card (navy, decorative SVG, Sacramento h3, gold button → /services/vedic-astrology)

### State + effects
- `useState<TocItem[]>([])` for TOC list
- `useState<'idle' | 'copied'>('idle')` for copy-to-clipboard feedback
- `useEffect` runs after `resolved` is non-null: queries `article.blog-content h2`, slugifies textContent, sets each h2's `id` attribute, populates the TOC list. Client-only — see Phase 4.2 below.

### Handlers
- `handleCopyLink`: async `navigator.clipboard.writeText(canonicalUrl)`, sets `copyStatus='copied'`, 2s timeout to reset to `idle`. Wrapped in try/catch with silent fallthrough.

### Deviations from brief
- **Spec said the brief permits `Sparkle` or `Star` fallback if `Sparkles` was missing.** Verified `Sparkles` is exported by lucide-react; using `Sparkles` per first preference. No fallback needed.
- **Spec said `font-poppins` class** but the existing Tailwind config only had `font-heading` mapping to Poppins. Added `fontFamily.poppins: ['Poppins', 'sans-serif']` alias (additive, doesn't break `font-heading`).
- **Em-dash in code comment.** I wrote `// Silent — user can still copy...` initially; the gate `grep -rn "—" src/` flagged it. Replaced with `// Silent failure: user can still copy...`. No functional impact.

### Not-found fallback preserved
The `if (!resolved)` branch still uses the existing `<Breadcrumbs>` component and the existing `bg-white` styling. Not part of the redesign per spec section 3.11.

---

## Phase 4 — Validation gates

### Phase 4.1 build gates
| Gate | Result |
|---|---|
| `npm run build` exit 0 | ✓ |
| Prerender count = 42 (unchanged) | ✓ `Prerendered 42 routes.` |
| `dist/blog/finding-a-vedic-astrologer-in-ahmedabad/index.html` exists, non-empty | ✓ 67,369 bytes (was 45,468 before redesign) |
| HTML contains `"@type":"BlogPosting"` | ✓ 1 hit |
| HTML contains `"@type":"FAQPage"` | ✓ 1 hit |
| HTML contains `"@type":"Person"` | ✓ 1 hit |
| `hero-banner-v2.webp` URL appears in HTML (og:image, twitter:image, hero `<img>`) | ✓ 3 hits |
| Old `hero.webp` URL absent from HTML | ✓ 0 hits |
| Author portrait URL `Brand/Saurabh/author-portrait-256.webp` in HTML | ✓ 1 hit (in Author card sidebar widget) |
| Author card does NOT contain post hero URL | ✓ portrait constant is module-level, decoupled from `fm.heroImage` |
| `grep -n "—"` MDX | ✓ 0 hits |
| `grep -rn "—" src/` | ✓ 0 hits |
| `dist/sitemap.xml` contains post URL | ✓ |
| `dist/llms.txt` contains post URL | ✓ |
| Hero banner v2 R2 URL → 200, image/webp | ✓ |
| Author portrait R2 URL → 200, image/webp | ✓ |
| Cutout WebP R2 URL → 200, image/webp | ✓ |
| Cutout PNG R2 URL → 200, image/png | ✓ |
| `prose-blog` class present in prerendered HTML | ✓ 1 hit |

### Phase 4.2 acceptable known limitation
TOC anchor IDs are generated client-side by `useEffect`. Prerendered HTML does NOT have h2 IDs; they're added on browser mount. Impact on SEO: minimal (anchor links are user-navigation aids, not crawlable structure). Follow-up: migrate to a build-time remark plugin so IDs are present in static HTML. Documented under follow-ups below.

### Phase 4.3 visual gates (require Vercel preview)
Listed in PR body for human verification. Cannot be validated headlessly.

### Phase 4.4 regression gates
| Gate | Result |
|---|---|
| `/blog` index renders correctly | requires Vercel preview (Blog.tsx untouched) |
| `/`, `/services`, `/planets/jupiter`, `/zodiac/aries` render without regression | ✓ all prerendered, no Tailwind class resolution issues |

---

## Phase 5 — Commit, push, PR

**Branch:** `feature/blog-detail-redesign` (off `staging` @ `83613b3`)
**Commit:** `4f8943a` — `feat(blog): redesign detail page with full visual treatment` (8 files changed, 1423 insertions, 94 deletions)
**Pushed:** ✓ to `origin/feature/blog-detail-redesign`
**PR:** [#3 — feature/blog-detail-redesign → staging](https://github.com/saurabh-bits-pilani/SIAS-6.0/pull/3)

### Vercel preview
- **Preview URL:** https://soul-infinity-l3111hs1k-saurabh-bits-pilanis-projects.vercel.app
- **Vercel inspector:** https://vercel.com/saurabh-bits-pilanis-projects/soul-infinity.com/7Q8ptEmER89yAgk1Z6h8gDX1SjCk
- **Build status:** ✓ success (state=success per GitHub commit-status API)
- **Note:** preview gated by Vercel SSO Auth (HTTP 401 anonymous). Open in a browser logged into the Vercel team to spot-check the visual gates from PR #3 description.

### Stopped here per instruction
PR #3 is open against `staging`. **No merge to staging or main has happened.** Awaiting your visual spot-check on the preview URL, then a separate `staging` merge instruction.

---

## Phase 6 — Follow-ups (parked, not actioned today)

- **Read time calculation** — currently hardcoded "8 min read" in BlogPost.tsx. Should be computed from body word count (extract during prebuild manifest generation, store as a frontmatter-shaped field).
- **TOC anchor extraction** — currently runtime `useEffect`. Should migrate to a build-time remark plugin so anchors are present in prerendered HTML for SEO (deep-link sharing, jump-to-section in SERP previews).
- **Per-post hero image generation pipeline via ChatGPT** — currently manual today. Future composites can layer the new `Brand/Saurabh/portrait-cutout-transparent.webp` (or `.png`) brand asset on top of generated cosmic backgrounds.
- **`/blog` index OG image** — should auto-update to most recent post hero (currently hardcoded to the Ahmedabad post hero in Blog.tsx line 96, swapped to `hero.webp` originally; should now point to `hero-banner-v2.webp` if you want it consistent — flagged as separate decision).
- **`scripts/generate-llms.mjs`** — requires manual edit per new post (DESCRIPTIONS map + SECTIONS array). Should auto-discover from `src/data/blog-manifest.json`.
- **Brand assets registry** — `src/data/brand-assets.ts`. The author portrait URL is currently a hardcoded string in BlogPost.tsx (`AUTHOR_PORTRAIT_URL` module constant). As more components reference brand assets (logo, social icons, portrait variants), centralise into a single typed constants file.
- **Future hero composites** — `Brand/Saurabh/portrait-cutout-transparent.webp` and `.png` are available at the R2 brand path for ChatGPT to use when generating per-post hero banners. Document this in the next blog post brief.

---

## Working tree right now

```
M  content/blog/finding-a-vedic-astrologer-in-ahmedabad.mdx
M  package.json
M  package-lock.json
M  tailwind.config.js
M  src/pages/BlogPost.tsx
?? scripts/blog-detail-redesign-brief.md     (the brief itself, untracked)
?? scripts/blog-detail-redesign-status.md    (this file)
?? scripts/upload-blog-redesign-assets.mjs   (the one-shot upload script)
```

Branch `feature/blog-detail-redesign` exists locally only, not yet pushed. PR not yet opened.
