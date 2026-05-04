# Template Fix Status Report

**Branch shipped:** `fix/template-improvements` → `staging`
**Feature commit:** `8b5a53c`
**Staging merge commit:** `c512157`
**Sync commit (staging ⟵ main):** `eabe625`
**Production unaffected.** Main is at `745a75f` (SEO quick-wins, unchanged).

---

## TL;DR

All 4 template-level SEO/AEO fixes applied to all 9 Navagraha pillar pages, plus the bonus Ketu meta description trim. All validation gates passed locally before push:

- TypeScript: `tsc --noEmit` → exit 0
- ESLint: `npm run lint` → exit 0
- Vite client build: exit 0
- Vite SSR build: exit 0
- Prerender: 40/40 routes ok
- Per-file greps clean (em-dashes, fetchPriority, blog-images-folder, @jalba/react-css-doodle): all 0
- All 9 prerendered HTML files: exactly 1 `<h1>`, TL;DR block present, Friends/Enemies table where applicable

**No deviations from the spec are blocking.** Everything below documents the small judgment calls.

---

## Per-page validation (post-prerender, what the crawler will see)

| Page | h1 count | h1 text | TL;DR | F&E table | Em-dashes |
|---|---|---|---|---|---|
| /planets/sun | 1 | Surya · The Radiant Sun | ✅ | ✅ (4 rows) | 0 |
| /planets/moon | 1 | Chandra · The Divine Mind | ✅ | n/a (page has no F&E sidebar) | 0 |
| /planets/mercury | 1 | Budh · The Awakened Intelligence | ✅ | ✅ (3 rows) | 0 |
| /planets/mars | 1 | Mangala · The Warrior of Energy | ✅ | ✅ (3 rows) | 0 |
| /planets/jupiter | 1 | Guru · The Guide and Teacher | ✅ | ✅ (3 rows) | 0 |
| /planets/saturn | 1 | Shani · The Lord of Discipline | ✅ | ✅ (3 rows) | 0 |
| /planets/venus | 1 | Shukra · The Lord of Beauty and Refinement | ✅ | ✅ (3 rows) | 0 |
| /planets/rahu | 1 | Rahu · The Shadow of Desire | ✅ | ✅ (3 rows) | 0 |
| /planets/ketu | 1 | Ketu · The Light of Detachment | ✅ | ✅ (3 rows) | 0 |

> The "·" in the table is a visual separator in this report only. Actual rendered HTML uses two `<span class="block">` children inside one `<h1>` with vertical line break; semantically a single H1 element.

---

## Spot-check URLs (after Vercel staging deploy completes)

Replace `<staging-host>` with the Vercel preview URL once deploy lands.

```
https://<staging-host>/planets/sun
https://<staging-host>/planets/moon
https://<staging-host>/planets/mercury
https://<staging-host>/planets/mars
https://<staging-host>/planets/jupiter
https://<staging-host>/planets/saturn
https://<staging-host>/planets/venus
https://<staging-host>/planets/rahu
https://<staging-host>/planets/ketu
```

**What to check visually on each page:**

1. **Hero** — H1 should now show planet name on top + descriptive phrase directly below (Title Case). On Mars and Sun the hero retained their unique decorative elements (drop-shadow on Mars, SunMandala icon on Sun).
2. **TL;DR aside** — appears as a parchment-style "In Brief" card immediately after the hero, before the Sacred Mantras section. ~50-60 words. Should match the planet's accent color (gold for Jupiter, indigo for Saturn, rose for Venus, etc.).
3. **FAQ section** — questions are now `<h3>` elements (no visual change since Tailwind preflight resets heading margins).
4. **Friends and Enemies card** — now a `<table>` with `<th scope="row">` for category names and `<td>` for planet lists. Visual layout preserved (label color + value text). Sun/Mercury kept the 4-row format including "Eclipse-makers" (Sun only).

---

## Bonus fix — Ketu meta description trim

Before: 210 chars (truncated in mobile SERPs)
After: 146 chars (well under 160 truncation point)

```
"Discover Ketu, the South Node of the Moon and shadow lord of liberation,
moksha, and intuition. Mantras, gemstone (Cat's Eye), and Vedic remedies."
```

---

## Per-fix breakdown

### Fix 1 — TL;DR direct-answer block
- Applied to all 9 pages with the exact strings from the brief.
- Used each planet's existing `cardTextureStyle` (or `notebookStyle` for Mercury) so visual treatment matches the existing card aesthetic.
- "In Brief" small label sits above a single paragraph.
- Inserted between the hero `</section>` and the next body section so the block appears immediately after the hero on every viewport.

### Fix 2 — Descriptive H1 (single element)
- Used Approach A from the brief: spans inside one `<h1>`, preserving the existing per-planet sizes/colors/drop-shadows.
- The descriptive phrase is now the second visible line inside the H1 (where the H2 tagline used to live).
- The Devanagari + parenthetical row (e.g., "गुरु (Jupiter)") was kept as a separate `<div>` immediately after the H1, instead of being interleaved between the two H1 spans.
  - **Visual reorder:** The Devanagari row now appears AFTER the descriptive phrase rather than between the name and the tagline.
  - **Why:** spans inside an H1 cannot have a non-H1 sibling interleaved while remaining one H1 element. Brief explicitly said "use spans inside ONE H1 element — not separate H1 + H2", so I picked the smallest visual change that satisfies the semantic constraint.
  - Pages affected: Jupiter, Saturn, Venus, Rahu, Ketu, Mars, Mercury (all 7 with Devanagari rows). Sun and Moon had no Devanagari row in the hero so this only changed those 7.

### Fix 3 — FAQ questions wrapped in `<h3>`
- Replaced `<div className="font-kalam ...">{faq.question}</div>` with `<h3 className="font-kalam ...">{faq.question}</h3>`.
- Same className kept; Tailwind preflight already resets headings to no margin/font-size so visual is unchanged.
- Mercury's FAQ markup formatted the question on three lines, so a multi-line replace was used; same outcome.

### Fix 4 — Lists / tables (conservative)
- **Friends and Enemies card → `<table>`:** applied to 8 of 9 pages.
  - Jupiter, Saturn, Venus, Rahu, Ketu, Mars: 3 rows (Friends / Enemies (or Enemy for Mars) / Neutral). Mars used singular "Enemy:" in source — preserved.
  - Sun: 4 rows including "Eclipse-makers" (preserved).
  - Mercury: 3 rows (Friendly / Enemy / Neutral, preserving singular "Enemy" since Budh has one enemy).
  - **Moon (the one exception):** Moon page does not have a "Friends and Enemies" sidebar card — the audit looked for it but Moon's sidebar layout is different. **Fix 4 was skipped for Moon, deliberately.** Adding a new card would have been a content change beyond the brief's scope.
- **"How to Connect" sections — left as `<ul>`:** the brief explicitly said "If they're parallel options (no order), leave as `<ul>`". On all 9 pages these are presented as a grid of parallel option cards, not ordered steps. Did not change.
- **"Vedic Remedies" body H2 paragraphs — left as prose:** the dense remedies paragraphs (especially Ketu's 149-word one flagged in the audit) contain interwoven nuance and caveats (medical/legal/financial counsel, gemstone installation rules) that would lose meaning if forced into a list. Per brief: "Do not lose information or reorder content for table-fitting" and "If a section is genuinely list-shaped, convert it. If it's prose that reads well, leave it." Saurabh can revisit this with content rewriting in a separate task.

### Bonus — Ketu meta description trim
- 210 → 146 chars, exact string from brief.
- All other meta descriptions unchanged (only Ketu was specified).

---

## Things to look at carefully tomorrow

1. **Sun H2 wording change.** The brief specified `Sun: "Surya: The Radiant Sun"`. The page previously read `The Radiant Soul`. I changed it to `The Radiant Sun` per the explicit brief. **If "Soul" was the intended word and "Sun" in the brief was a typo, revert just the second `<span>` text in `SunPage.tsx` line ~912.**
2. **Devanagari row position on 7 pages.** Now appears after the descriptive phrase rather than between name and phrase. Visual judgment call — see Fix 2 notes.
3. **Mars hero — `leading-[0.98]` retained.** Mars used a different hero leading than the other planets (older pre-canonical pattern). I kept that value when restructuring its H1 to avoid a separate visual change. If you'd rather Mars match Jupiter's `leading-[0.88]`, change it on `MarsPage.tsx` first span.
4. **Mercury's "stripeStyle" vs other planets' "cardTextureStyle".** Mercury has a green-tinted notebook aesthetic, so I used its existing `notebookStyle` background for the TL;DR card rather than introducing a fresh style. Border color uses Mercury's existing green palette.
5. **F&E table colors on Sun/Mercury.** Both kept their original 2-color category labels (orange/red/gray for Sun; green/orange/gray for Mercury). The other 6 planets use a single accent color per page. This was already the case before; my changes preserved it.
6. **Apex 307 redirect** is still in the Vercel platform-level edge layer (Option C from the prior SEO quick-wins task). No change to that. The dormant `vercel.json` rule remains in place.
7. **Untracked files** (blog-images-folder, corner_house_logo_pack/, scripts/upload-planets-*.mjs, scripts/planets-*-manifest.json, .claude/) were NOT staged or committed, per the brief.

---

## Files changed

```
9 files changed, 367 insertions(+), 165 deletions(-)
src/pages/planets/JupiterPage.tsx | +57  -4
src/pages/planets/KetuPage.tsx    | +59  -4   (incl. meta trim)
src/pages/planets/MarsPage.tsx    | +57  -4
src/pages/planets/MercuryPage.tsx | +76 -28
src/pages/planets/MoonPage.tsx    | +29  -3   (no F&E table)
src/pages/planets/RahuPage.tsx    | +57  -4
src/pages/planets/SaturnPage.tsx  | +57  -4
src/pages/planets/SunPage.tsx     | +83 -30
src/pages/planets/VenusPage.tsx   | +57  -4
```

---

## Rollback (only if needed)

If staging looks bad in the morning:

```bash
git checkout staging
git pull origin staging
# Revert just the merge commit (preserves the sync commit)
git revert -m 1 c512157
git push origin staging
```

`fix/template-improvements` branch remains preserved for inspection or fix-forward. Production untouched.

---

## Vercel staging URL

**STAGING_URL:** `https://soul-infinity-imvu9w812-saurabh-bits-pilanis-projects.vercel.app`

- GitHub deployment ID: `4505989452`
- State: `success`
- Created: `2026-04-28T02:23:54Z`
- Build time: ~38s (sync→merge gap)

**SSO note:** This Vercel preview deployment is behind Vercel Authentication (HTTP 401 to anonymous requests). That is the normal Vercel default for preview deployments on this project. Open the URL in a browser logged into the Vercel team to view it. The `staging` branch tip (`c512157`) is what's serving from this URL.

### Quick browser check list (after SSO login)

```
https://soul-infinity-imvu9w812-saurabh-bits-pilanis-projects.vercel.app/planets/sun
https://soul-infinity-imvu9w812-saurabh-bits-pilanis-projects.vercel.app/planets/moon
https://soul-infinity-imvu9w812-saurabh-bits-pilanis-projects.vercel.app/planets/mercury
https://soul-infinity-imvu9w812-saurabh-bits-pilanis-projects.vercel.app/planets/mars
https://soul-infinity-imvu9w812-saurabh-bits-pilanis-projects.vercel.app/planets/jupiter
https://soul-infinity-imvu9w812-saurabh-bits-pilanis-projects.vercel.app/planets/saturn
https://soul-infinity-imvu9w812-saurabh-bits-pilanis-projects.vercel.app/planets/venus
https://soul-infinity-imvu9w812-saurabh-bits-pilanis-projects.vercel.app/planets/rahu
https://soul-infinity-imvu9w812-saurabh-bits-pilanis-projects.vercel.app/planets/ketu
```

If the preview alias `soul-infinitycom.vercel.app` is configured to follow `staging`, that one will work too.
