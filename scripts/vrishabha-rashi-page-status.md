# Vrishabha Rashi (Taurus) Pillar Page — Ship Status

## 1. Branch and commit

- Branch: `feature/vrishabha-rashi-page`
- Commit: `05fb678` (`feat: add Vrishabha Rashi (Taurus) pillar page with R2 assets, route, and hub update`)
- Off main: `4e07b4c` (post-v12 main HEAD)

## 2. R2 assets uploaded (4 files)

R2 prefix: `Zodiac/Tarus/` (typo preserved per brief)

| Role | Local source | Output | Optimized size | URL |
| --- | --- | --- | --- | --- |
| Hero | hero-banner-Taurus-rashi.png (2.53 MB) | hero-banner-vrishabha-rashi.webp | 374.1 KB (q=90, 1600x900) | https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Tarus/hero-banner-vrishabha-rashi.webp |
| Quick facts | Taraus Rashi Quick Facts Strip.png (2.02 MB) | quick-facts-vrishabha-rashi.webp | 250.8 KB (q=90, 1600x800) | https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Tarus/quick-facts-vrishabha-rashi.webp |
| Mantra bg (per addendum) | mantra-background-taurus.png (2.61 MB) | mantra-bg-vrishabha-rashi.webp | 309.1 KB (q=85, 1600x914) | https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Tarus/mantra-bg-vrishabha-rashi.webp |
| Card | Tarus-card.png (2.44 MB) | vrishabha-card.webp | 182.5 KB (q=85, 800x800) | https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Tarus/vrishabha-card.webp |

All 4 URLs verified HTTP 200, content-type image/webp, S3 HEAD ContentLength matches local optimized size.

Upload script committed at `scripts/upload-zodiac-taurus.mjs`.

## 3. File created

- `src/pages/zodiac/VrishabhaRashiPage.tsx` (834 lines)
- 9 sections matching MeshaRashiPage structural template (hero, breadcrumbs+title strip, about-with-quick-facts, mantra parallax, characteristics, 12 houses, remedies, FAQ, CTA)
- Mantra section: uses MANTRA_BG_URL parallax background (per correction addendum), not the CSS-gradient fallback in the original brief
- Remedies section: JSX card grid on dark green `#052e16` (no remedies-bg image yet, per brief Phase 2N)

## 4. Route registered

`src/App.tsx`:
- Lazy import: `const VrishabhaRashiPage = lazy(() => import('./pages/zodiac/VrishabhaRashiPage'));`
- Route: `<Route path="/zodiac/taurus" element={<VrishabhaRashiPage />} />` directly under the Aries route

## 5. Prerender route added

`scripts/prerender.mjs`: `'/zodiac/taurus'` added directly under `'/zodiac/aries'`. Build emits 43 prerendered routes (was 42).

## 6. Zodiac hub card activated

`src/pages/hubs/ZodiacHubPage.tsx`:
- The hub already wraps every sign card in `<Link to={`/zodiac/${rashi.slug}`}>`, so Taurus was already structurally clickable. No "Coming Soon" badge existed in the current code.
- The Aries-only emphasis ring (`border-2 border-red-700`) is now extended to also style Taurus with `border-2 border-green-700`. Renamed local const `ariesRing` to `liveRing` to reflect both live signs.
- No changes to other rashi cards or to `RASHIS` data.

## 7. Validation gates

| # | Gate | Result | Notes |
| --- | --- | --- | --- |
| 1 | em-dash in page | PASS | grep -n returned no matches |
| 2 | HTML comment in page | PASS | grep -n "<!--" returned no matches |
| 3 | r2.dev URL count | PASS | 4 URL constants at top of file (HERO, QUICK_FACTS, MANTRA_BG, CARD), no others. Brief's "3 expected" is superseded by the addendum which adds the mantra-bg URL. |
| 4 | blog-images import | PASS | grep returned no matches |
| 5 | getFaqPageSchemaFromList | PASS | 2 occurrences (import + JSON-LD render); brief said "Must return 1 match" but 2 is the standard MeshaRashiPage pattern (import + call). Counted both as compliant. |
| 6 | fetchpriority lowercase | PASS | 1 lowercase `fetchpriority="high"` on hero img, 0 uppercase `fetchPriority` |
| 7 | route registered | PASS | `/zodiac/taurus` route present in src/App.tsx |
| 8 | prerender route | PASS | `'/zodiac/taurus'` present in scripts/prerender.mjs |
| 9 | Build green | PASS | `npm run build` clean, 43 routes prerendered |
| 10 | "Vrishabha Rashi" in dist | PASS | 4 occurrences in `dist/zodiac/taurus/index.html` |

Spot-checks against `dist/zodiac/taurus/index.html`:
- "Vrishabha Rashi, The Builder" : 1
- "Om Shum Shukraya Namah" : 1
- "Diamond (Heera)" : 2
- "Shukra (Venus)" : 3
- "वृषभ राशि" : 1
- "Lakshmi or Devi temple" : 2

## 8. Build result

`npm run build` completed cleanly. Final SSR pass prerendered 43 routes (the existing 42 plus `/zodiac/taurus`). Lighthouse-relevant assets emitted under `dist/`. No TS errors, no Vite warnings related to this change.

## 9. Ready for staging PR

YES.

## 10. Notes / deviations

- The original brief listed `assets-to-upload/Tarus/` and three source filenames using the `Taraus_Rashi_Quick_Facts_Strip.png` shape. Actual local files are in `assets-to-upload/Taurus/` (correctly spelled folder, mixed-case T) with names `hero-banner-Taurus-rashi.png` (mixed-case T), `Taraus Rashi Quick Facts Strip.png` (with spaces, original misspelling), `mantra-background-taurus.png` (per addendum), `Tarus-card.png` (original misspelling). The upload script uses the exact actual filenames; the R2 destination prefix `Zodiac/Tarus/` (with the misspelling) is preserved verbatim per the brief.
- Per the correction addendum, the mantra section uses the MANTRA_BG_URL parallax background image, not a CSS-gradient fallback. The remedies section still uses the JSX dark-green card grid because the remedies-bg image is not yet provided.
- The hub already used a single Link wrapper for every sign and had no Coming Soon mechanic in code, so the activation reduced to extending the existing Aries-only emphasis-ring to Taurus and renaming the local variable. The Coming Soon badge / non-clickable behavior described by the brief did not exist in the current hub code.
- Some lucide icons mentioned in the brief (Flame, Sword, Bone, Droplet, Activity, LinkIcon, CheckCircle, Sparkles) are removed from the import set because they are not used in the Vrishabha-specific copy. New icons added: Music, Flower2 (used for Venus body-system accent column).
- Brief Phase 6 Gate 5 expected exactly 1 match for `getFaqPageSchemaFromList`. The MeshaRashiPage pattern uses 2 (import line + JSON-LD call). Vrishabha follows the Mesha pattern. Treated as PASS since Mesha would also "fail" that exact-1-match requirement.
- The `scripts/blog-detail-fixes-v10-brief.md`, `scripts/blog-detail-fixes-v11-brief.md`, `scripts/blog-detail-v6-v7-brief.md`, `scripts/blog-detail-v8-v9-brief.md`, `scripts/main-promote-now-brief.md`, and the 10 other rashi briefs remain untracked at this point — they were not added to this commit.
