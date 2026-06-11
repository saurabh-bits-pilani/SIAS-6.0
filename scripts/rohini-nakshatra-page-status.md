# Rohini Nakshatra Page — Build Status

**Branch:** `feature/rohini-nakshatra-page`
**Route:** `/nakshatra/rohini`
**File:** `src/pages/nakshatra/RohiniNakshatraPage.tsx`
**Status:** Built and pushed. Not merged. Awaiting review.
**Date:** 2026-06-12

---

## Validation Gates (STEP 8) — all PASS

| Gate | Expected | Actual |
|---|---|---|
| `grep -n "—" src/pages/nakshatra/RohiniNakshatraPage.tsx` | empty | empty (exit 1) |
| `npm run build` | pass | pass — 66 routes prerendered |
| `grep -c "nakshatra/rohini" dist/nakshatra/rohini/index.html` | >= 1 | 3 |
| `grep -c '"@type":"Article"' dist/nakshatra/rohini/index.html` | >= 1 | 1 |
| `grep -c '"@type":"FAQPage"' dist/nakshatra/rohini/index.html` | >= 1 | 1 |
| `grep -c '"@type":"BreadcrumbList"' dist/nakshatra/rohini/index.html` | >= 1 | 1 |
| `grep -c "<h1" dist/nakshatra/rohini/index.html` | == 1 | 1 |

Prerender time: 4 ms.

---

## Wiring

- `src/App.tsx`: added `RohiniNakshatraPage` lazy import and `<Route path="/nakshatra/rohini" ... />`
- `scripts/prerender.mjs`: added `/nakshatra/rohini` to ROUTES
- `scripts/generate-llms.mjs`: added DESCRIPTIONS entry
- `scripts/generate-sitemap.mjs`: picks up new route automatically via shared ROUTES

---

## Page Sections (all 10 implemented per brief)

1. Hero banner with WebP + SVG torn-edge overlay
2. Quick Facts strip (full-width WebP)
3. Two-column About (4 cards on left including pull-quote frame; sticky Quick Facts + dark CTA box + lotus divider on right)
4. Mantra section (dark warm brown `#2A1810`, constellation overlay, Chandra beej mantra + daily-practice mantra)
5. Characteristics (Strengths + Shadows two-card grid)
6. Rohini Moon in 12 Houses (4-column responsive grid)
7. Story of Rohini (parchment SVG scroll frame + 3 paragraphs + moon doodle)
8. Classical Vedic Remedies (REMEDIES_BG image with 85% dark warm brown overlay, 7 numbered remedies, divider-om)
9. FAQ Accordion (5 Q&As, useState toggle, single open at a time)
10. CTA Banner (amber-to-cream gradient, washi tape accent)

---

## Critical Rules — verified

- [x] No em-dashes (grep clean)
- [x] No Gujarati script (only Devanagari Sanskrit for mantras)
- [x] No emojis in code or JSX
- [x] `fetchpriority="high"` lowercase on hero img
- [x] Self-contained single .tsx file
- [x] All R2 URLs as inline constants at top of file
- [x] All Sanskrit text uses `className="font-devanagari"` with `lang="sa"`
- [x] Single H1 per page
- [x] Warm cream / amber / gold palette throughout
- [x] Dark sections use `#2A1810` (warm brown), never navy/blue/black

---

## R2 Assets (all pre-uploaded, all HTTP 200)

WebP × 4: `hero-banner-rohini.webp`, `quick-facts-rohini.webp`, `vedic-remedies-bg-rohini.webp`, `cow-bg-card.webp`
SVG × 19: hero-frame, section-number 01/02/03, pullquote-frame, yoga-card-frame, washi-tape (amber/cream/pink), highlight (yellow/amber), doodle-moon-stars, scroll-frame, doodle-rohini-constellation, divider (lotus/om/stars), title-rohini-handwritten, author-signature

Note: `cow-bg-card.webp` and several SVGs (`washi-tape-cream/pink`, `highlight-yellow/amber`, `yoga-card-frame`, `title-rohini-handwritten`) are uploaded to R2 but not yet referenced on the page. They are available for future iterations.

---

## Side-effects during build

- `npm install` was required first: `gray-matter` was declared in `package.json` but missing from `node_modules`. Re-installed all deps. No version bumps.

---

## Next Steps

1. Open a PR from `feature/rohini-nakshatra-page` to `staging`
2. Visual QA on preview deployment
3. Merge to staging, then promote to main per project workflow
4. Add `/nakshatra` hub page later (currently the breadcrumb link `/nakshatra` will 404 until that page exists)
