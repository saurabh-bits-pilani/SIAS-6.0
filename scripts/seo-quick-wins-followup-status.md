# SEO Quick Wins Followup, Status

**Branch:** `fix/seo-quick-wins-followup` (off `main` @ `2cf2c80`)
**Date:** 2026-05-02
**Scope:** 4 wins from `Memory-files/SEO_Quick_Wins_Claude_Code_Brief-02-may-2026.md`, executed after a verification pass on the prior `745a75f Release: SEO quick-wins` commit revealed gaps.

---

## Wins completed

### 1. Em-dash sweep, DONE
- 177 occurrences across 25 files purged.
- Strategy: 2 manual JSX-specific edits in `ServiceDetail.tsx` (citation prefix + interpolation) + bulk `sed` pass `s/ — /, /g` then `s/—/, /g` across all 25 files + 1 cleanup of JSDoc spacing in `src/config/site.ts`.
- Final `grep -rn "—" src/` returns NONE.
- Hard rule from `CLAUDE.md` and brief now satisfied.

### 2. Person `sameAs` array, DONE
- File: `src/data/schema-entities.ts` (`getPersonSaurabhSchema`).
- Added all 5 brief-specified URLs:
  - `https://www.soulinfinity.space`
  - `https://www.instagram.com/soulinfinity.astro`
  - `https://www.linkedin.com/in/saurabhjain-astrologer`
  - `https://www.youtube.com/@soulinfinity`
  - `https://g.page/soul-infinity-astro-solutions`
- All 5 verified individually present in `dist/index.html` after prerender.
- Existing `BUSINESS_NAP.sameAs` (Facebook, Quora, WhatsApp) on Organization and LocalBusiness preserved, no fields removed.

### 3. Homepage FAQ section + FAQPage JSON-LD, DONE
- Added `homeFaqs` constant in `src/pages/Home.tsx` with 5 brief-specified Q&As.
- Added visible `<section id="faq">` accordion with `<h2>Frequently Asked Questions</h2>` rendering all 5 Q&As (controlled accordion via `useState<number | null>`, ARIA-correct `aria-expanded`/`aria-controls`).
- Extended `SchemaMarkup` to emit FAQPage on `type="home"` only when `serviceFaqs` prop is passed (mirrors the `service-detail` policy that prevents FAQPage emission without visible Q&As, Google manual-action guard).
- `<SchemaMarkup type="home" serviceFaqs={homeFaqs} />` wires it together.
- Verified: `dist/index.html` contains 1 FAQPage schema with 5 `"@type":"Question"` entries.

### 4. Homepage H2 rewrite, DONE
- `Sacred Services` → `What We Offer at Soul Infinity Astro Solutions`
- `Why Choose Soul Infinity?` → `Why Choose Soul Infinity Astro Solutions`
- `Ready to Begin Your Journey?` → `How to Book Your Consultation`
- New `Frequently Asked Questions` H2 from Win 3.
- `What Our Clients Say` already matched, retained.
- Total H2s on prerendered homepage: **7** (brief target: minimum 6).

#### Brief-required H2s, status
| Required phrasing | Present in prerender |
|---|---|
| What We Offer at Soul Infinity Astro Solutions | YES |
| Why Choose Soul Infinity Astro Solutions | YES |
| What Our Clients Say | YES |
| How to Book Your Consultation | YES |
| Frequently Asked Questions | YES |
| Our Healing and Spiritual Services | NOT ADDED (see note) |

**Note on `Our Healing and Spiritual Services`:** Skipped intentionally. The existing services section already showcases all 3 categories (Vedic Astrology, Western Astrology, Spiritual Healing) under one H2. Adding a separate "Our Healing and Spiritual Services" H2 would either duplicate the healing card or require fabricating a new section. Rather than fabricate content, I left this out and noted it here. If the intent is a separate healing-focused section, that is a content/design decision, not a quick win.

---

## Validation gates

| Gate | Result |
|---|---|
| `grep -rn "—" src/` | empty (0 hits) |
| `npm run build` | green, 840ms Vite build |
| `node scripts/prerender.mjs` | ok on all 40 routes |
| `dist/llms-full.txt` regen | 19 pages, 58,284 chars |
| FAQPage schema on homepage | 1 schema, 5 Q&As |
| FAQPage schema on a sample service page (regression) | still present |
| Person `sameAs` URLs in `dist/index.html` | all 5 present |
| Homepage `<h2>` count | 7 |

---

## Files modified (26)

```
src/components/Breadcrumbs.tsx
src/components/ErrorBoundary.tsx
src/components/GoogleReviewsWidget.tsx
src/components/SEOHead.test.tsx
src/components/SchemaMarkup.tsx
src/components/hub/LiveCard.tsx
src/config/site.ts
src/data/FAQ.txt
src/data/faqData.json
src/data/icons/planet-icons.tsx
src/data/schema-entities.ts
src/data/services-content.ts
src/entry-server.tsx
src/pages/CosmicGuide.tsx
src/pages/CosmicPodcast.tsx
src/pages/Gallery.tsx
src/pages/Home.tsx
src/pages/Mantra.tsx
src/pages/PitraDosh.tsx
src/pages/Privacy.tsx
src/pages/Remedies.tsx
src/pages/ServiceDetail.tsx
src/pages/Services.tsx
src/utils/analytics.test.ts
src/utils/analytics.ts
src/utils/web-vitals.ts
```

Net diff vs `main`: 276 insertions, 192 deletions.

---

## Issues / warnings encountered

- The Vercel-plugin PostToolUse hook auto-suggested `"use client"` directives on every edit to `.tsx` files. This is a Next.js App Router convention. This project is Vite + React 18 + React Helmet Async. Suggestions ignored as false positives. No code change needed.
- `[llms-full] hit total budget before /gallery/pitra-dosh — stopping.` This is pre-existing behavior in `scripts/generate-llms-full.mjs`, unchanged by this work.

---

## Branch + commit

- Branch: `fix/seo-quick-wins-followup`
- Off: `main` @ `2cf2c80`
- Commit hash: see `git log -1` after this status file is committed.

## Next steps for Saurabh

1. Local review: `npm run dev`, visit `/`, expand FAQ accordion, confirm 5 Q&As render.
2. Validate schema at `https://search.google.com/test/rich-results` against the Vercel preview URL once the branch deploys.
3. If approved, merge `fix/seo-quick-wins-followup` → `staging` first, review on staging Vercel preview.
4. If staging looks good, merge `staging` → `main` and push to production.
5. Re-test rich results on production URL post-deploy.

**Stopped before merging, per instructions.**
