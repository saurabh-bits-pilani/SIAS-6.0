# SEO Phase 2, Status

**Branch:** `feature/seo-phase2` (off `main` @ `7929705`)
**Date:** 2026-05-02
**Pattern:** Pilot (Parashari + Saturn) → Rollout (remaining 11 services + 8 planets).

---

## Wins delivered

### Win 1, Service + Offer + hasOfferCatalog on all 12 service pages, DONE
- File: `src/data/schema-entities.ts`
  - `ServiceOfferOpts` extended with `priceRange?: string`.
  - `getServiceSchema`:
    - Always emits `hasOfferCatalog: { '@type': 'OfferCatalog', name: 'Vedic Astrology and Spiritual Services' }`.
    - Emits `offers` block when `price` OR `priceRange` is set. Offer URL points to `/contact`.
- File: `src/pages/ServiceDetail.tsx`
  - Passes `priceRange: 'Free to Rs. 2,100'` for every service (no em-dash, satisfies hard rule).
- Existing `provider` (LocalBusiness via `@id` reference) and 4-region `areaServed` array preserved per Step A decision.
- Verified: 12 of 12 service detail pages emit `Service`, `Offer` with `priceRange "Free to Rs. 2,100"`, and `hasOfferCatalog` in prerender.

### Win 2, 134-167 word answer blocks, DONE
- 12 service `heroIntro` fields rewritten with brief copy (`src/data/services-content.ts`). Word counts: Parashari 130 (slightly under target, brief copy as-is); other 11 in 137-146 range.
- 8 remaining planet pages: I drafted 134-167 word answer blocks for Sun, Moon, Mercury, Mars, Jupiter, Venus, Rahu, Ketu, each opening with `{Sanskrit name} ({English name}) is...`, mentioning Soul Infinity Astro Solutions and Saurabh Jain once. Replaced `editorialSections[0].paragraphs[0]` only; remaining paragraphs in section[0] preserved.
- Saturn block was applied during pilot.

### Win 3, Question-based H2s on planet pages (literal interpretation), DONE
- 32 H2 renames across 9 planets (3 from pilot Saturn + 29 in rollout).
- Renamed only where a brief H2 mapped to an existing section. Unmatched current sections (Form & Symbolism, Strong vs Weak, In Each House for some planets, Astrological Wisdom epilogues, etc.) left untouched per "do not restructure or remove content" rule.
- Per-planet rename counts: Sun 5, Moon 3, Mercury 4, Mars 3, Jupiter 4, Venus 4, Saturn 3 (pilot), Rahu 3, Ketu 3.

### Win 4, HowTo schema + visible steps on all 9 planet pages, DONE
- HowTo JSON-LD added to each planet's `schemas` array, using brief table values (direction, mala, colour, mantra). Each schema has 5 HowToSteps (Purification, Posture, Mala selection, Chanting, Completion).
- Visible 5-step "How to Chant the {Planet} Beej Mantra" ordered list inserted inside the Sacred Mantras card on every planet page, mirroring the schema. Satisfies Google policy guard (HowTo rich result requires visible matching content).
- Mercury insertion point differs slightly (anchored on the existing "Offerings section" comment) since its Sacred Mantras card has a different downstream layout. Functionally identical output.
- Heading colour per planet uses the existing planet theme; wrapping border/background uses Saturn's neutral palette for visual consistency across pillar pages.

### Win 5, Image alt + CLS audit, DONE for pilot scope
- Mercury hero `<img src={HERO_URL}>` upgraded: descriptive alt ("Illustration of Budh, the Mercury planet, in Vedic astrology by Soul Infinity Astro Solutions"), explicit `width={1600} height={900}`. The other 8 planet heroes are CSS background-images, no `<img>` to touch (verified across all 8).
- Bulk sed swept `aria-hidden="true"` onto every decorative SVG `<img>` with `alt=""` across all 8 remaining planet pages. Net additions:
  - SunPage +5 aria-hidden, MoonPage +13, MercuryPage +21, MarsPage +17, JupiterPage +12, VenusPage +12, RahuPage +12, KetuPage +12. Total: ~104 decorative imgs across the rollout (Saturn 12 already done in pilot).
- `alt=""` on those imgs intentionally retained (correct accessibility for purely decorative imagery, paired with `aria-hidden="true"`).

---

## Validation gates

| Gate | Result |
|---|---|
| `npm run build` | green, 866ms Vite build |
| `node scripts/prerender.mjs` | ok on all 40 routes |
| `dist/llms-full.txt` regen | 19 pages, 59,149 chars |
| `grep -rn "—" src/` | empty |
| HowTo schema occurrences in src/ (`'@type': 'HowTo'`) | 9 (one per planet) |
| Service schema callsites in src/ | 2 (one in `getServiceSchema`, one in `getServiceListItem`) |
| Service+Offer in prerender (per service page) | 12/12, all with `priceRange "Free to Rs. 2,100"` and `hasOfferCatalog` |
| HowTo + visible steps in prerender (per planet page) | 9/9 with HowTo (5 steps) and visible "How to Chant" block |

### Phase 1 regression checks (no breakage)
| Item | Before Phase 2 | After Phase 2 |
|---|---|---|
| Homepage FAQPage schema | 1 | 1 |
| Contact FAQPage schema | 1 | 1 |
| Service detail FAQPage (sample: parashari) | 1 | 1 |
| Person `sameAs` URLs in prerender (Instagram + LinkedIn substring count) | 2 | 2 |

---

## Files modified (12)

```
src/data/schema-entities.ts           +14 -3   Offer + hasOfferCatalog wiring, priceRange opt
src/data/services-content.ts          +12 -12  12 service heroIntro replacements
src/pages/ServiceDetail.tsx           +3  -2   priceRange wired for every service (slug-conditional removed)
src/pages/planets/JupiterPage.tsx     +47 -15  Win 2 + Win 3 (4 H2) + Win 4 (HowTo + visible steps) + Win 5 (aria-hidden)
src/pages/planets/KetuPage.tsx        +45 -15  same
src/pages/planets/MarsPage.tsx        +51 -19  same (Win 3: 3 H2)
src/pages/planets/MercuryPage.tsx     +60 -24  same + hero img alt + dimensions
src/pages/planets/MoonPage.tsx        +47 -15  same (Win 3: 3 H2)
src/pages/planets/RahuPage.tsx        +45 -15  same (Win 3: 3 H2)
src/pages/planets/SaturnPage.tsx      +66 -17  pilot work (Win 1-4) plus 2nd round of Win 4 (already in pilot)
src/pages/planets/SunPage.tsx         +37 -13  same (Win 3: 5 H2)
src/pages/planets/VenusPage.tsx       +47 -15  same (Win 3: 4 H2)
```

Net diff vs `main`: 464 insertions, 175 deletions.

Plus this status file (`scripts/seo-phase2-status.md`).

---

## Notes / caveats

- **Brief's grep validation patterns were misleading.** The brief said `grep -rn "HowTo" src/ | grep "@type" | wc -l` should be ≥9 and `grep -rn '"Service"' src/ | wc -l` ≥12. Those literal patterns assume double-quoted JSON in source, but the source uses TypeScript single-quoted string literals (`'@type': 'HowTo'`). The actual emission is correct in prerendered HTML (verified per page); the brief patterns just don't match TS string style. Use the corrected patterns in this status file going forward.

- **Vercel-plugin auto-suggestions ignored.** Throughout this session the Vercel plugin's `posttooluse-validate` hook surfaced `"use client"` directive suggestions on every `.tsx` edit (Next.js App Router convention). This project is Vite + React 18 + React Helmet Async. All such suggestions are false positives. No code change needed.

- **Offer URL host in local prerender shows `https://soul-infinity-liard.vercel.app/contact`** because `VITE_SITE_URL` is unset locally. Vercel production sets it to `https://www.soulinfinity.space`, so production HTML will emit `https://www.soulinfinity.space/contact` correctly. Same fallback as Phase 1 — not a Phase 2 bug.

- **Win 5 scope was deliberately narrow** per the Step A verification: only content imgs + decorative SVGs were touched. The brief's "every img needs descriptive alt" rule would have harmed accessibility for the 100+ purely decorative SVGs. The chosen pattern (descriptive alt on content imgs, empty alt + `aria-hidden` on decorative imgs) is the WCAG-preferred approach.

- **Jupiter/Sun H2 mapping note**: Sun's "Sun's Dignities" and "Surya in Modern Life" sections were left untouched, as no brief H2 maps to them. Same for the "Form and Symbolism" and "Astrological Wisdom" epilogues across most planets. This is the literal-rename interpretation requested.

---

## Branch + commit

- Branch: `feature/seo-phase2`
- Off: `main` @ `7929705`
- Commit hash: see `git log -1` after this status file is committed.

## Next steps for Saurabh

1. Local review: `npm run dev`, browse a service page (e.g. `/services/vedic-astrology/parashari-jyotish`) and confirm the new intro reads well; browse a planet page (e.g. `/planets/saturn` or `/planets/sun`) and check the new H2s + visible "How to Chant" block render where expected.
2. Validate schema output at `https://search.google.com/test/rich-results` against the Vercel preview URL once the branch deploys.
3. If approved, merge `feature/seo-phase2` → `staging`, review on Vercel staging preview.
4. If staging looks good, merge `staging` → `main` and submit refreshed sitemap in Search Console.

**Stopped before merging, per instructions.**
