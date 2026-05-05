# Blog Detail Fixes v5 — STATUS = SHIPPED, PR #7 OPEN, PREVIEW LIVE

**Branch:** `feature/blog-detail-fixes-v5` (off `feature/blog-detail-fixes-v4` @ `b0a5348`, stacked on PR #6 → PR #5 → PR #4 → PR #3)
**Date:** 2026-05-05

---

## Component built

| File | Lines | Purpose |
|---|---|---|
| `src/components/blog/CredentialsSection.tsx` | 257 | Magazine-style credentials block: title (Poppins-bold + Caveat-italic-gold + Sun divider) → intro callout (Landmark in gold-tinted circle) → 4 numbered cards with conditional bullets/inlineList/body/warning per card → dark navy footer banner with Award icon. |

Wired into `src/components/blog/MdxBlogComponents.tsx`: `CredentialsSection` added (registry now exposes 8 components).

### Card variants exercised by this post
- **Card 01 (Classical Training):** uses `bullets` + `warning` (the AlertCircle "ancient texts" cautionary callout)
- **Card 02 (Lineage & Parampara):** uses `inlineList` (4 institute pills with icons) + `body`
- **Card 03 (Years of Practice on Real Charts):** uses `body` only
- **Card 04 (Specialisation):** uses `body` only

### Lucide icons used (no fallbacks needed)
- Component-internal: `Sparkles`, `Sun`, `Flower2`, `LucideIcon` type
- MDX-passed: `Landmark`, `BookOpen as BookOpenIcon`, `Users as UsersIcon`, `Calendar as CalendarIcon`, `Target`, `AlertCircle`, `Award`, `GraduationCap`, `Sparkle` (singular), `Flower` (singular)

Verified all 14 icons resolve in `lucide-react`. The brief flagged `Sparkle` and `Flower` singulars + `GraduationCap` as uncertain — all confirmed exported. No fallback substitutions used.

---

## MDX rewrite (`content/blog/finding-a-vedic-astrologer-in-ahmedabad.mdx`)

**Net diff:** +55 / -12 (file went 286 → 323 lines, of which the new component invocation is ~55 lines)

### Step 1: deletions
Removed lines 110-122 (the previous version): `## What credentials should a Vedic astrologer have?` H2 + 6 prose paragraphs (about classical training / lineage / years of practice / specialisation / "In our case at Soul Infinity..." closer).

### Step 2: replacement
Inserted a new lucide import line + 1 `<CredentialsSection ... />` JSX block at the same position. The H2 disappears from the prose layer because the component renders its own h2 via `titleLine1`.

### Build hiccup encountered + fixed
The first build attempt failed with `[@mdx-js/rollup] Could not parse import/exports with acorn`. Cause: `Landmark` was already imported on the file's first import line (line 35, intro section's lucide import for `AuthorCallout`), and my new line 110 import re-imported `Landmark`. Acorn rejects duplicate top-level identifier bindings even when they import the same thing.

**Fix:** removed `Landmark` from the new line 110 import. The component code still receives `Landmark` because MDX scopes ALL top-of-body imports as module-level bindings — the line 35 import remains in scope at line 110+. Build green on retry.

This is a follow-up note for any future MDX work: when adding a new inline import block, dedupe against existing imports in the file. Aliases (`as XIcon`) are a clean way to avoid collisions.

---

## Validation gate results

| # | Gate | Result |
|---|---|---|
| 1 | `npm run build` green | ✓ exit 0 (after the duplicate-import fix above) |
| 2 | Prerender count = 42 | ✓ |
| 3a | Schemas preserved (BlogPosting + FAQPage + Person) | ✓ 1 hit each |
| 3b | "What credentials should" rendered ONCE | ✓ 1 hit |
| 3c | "Classical Training" rendered ONCE | ✓ 1 hit |
| 3d | "Lineage & Parampara" rendered (HTML-encoded as `Lineage &amp; Parampara`) | ✓ 1 hit |
| 3e | "Years of Practice on Real Charts" rendered ONCE | ✓ 1 hit |
| 3f | "Specialisation" rendered | ⚠ 2 hits — see note below |
| 3g | "Credentials bring trust." rendered ONCE | ✓ 1 hit |
| 3h | "K.N. Rao Institute" appears in the credentials section | ✓ 6 hits across the post (credentials inlineList + Author callout + FAQ Q1 visible/JSON-LD + FAQ Q6 visible/JSON-LD) |
| 4 | `grep -n "—"` MDX | ✓ 0 hits |
| 5 | `grep -rn "—" src/` | ✓ empty |
| 6 | `grep -c "—" src/components/blog/CredentialsSection.tsx` | ✓ 0 |
| 7 | No regressions on `/`, `/services`, `/planets/jupiter`, `/zodiac/aries`, `/blog` | ✓ all 42 routes prerendered green |

### Note on gate 3f ("Specialisation" — 2 hits)
The brief gate said "rendered ONCE". Actual: 2 hits. Investigation:
- Hit 1: the new `<CredentialsSection>` Card 04 title `<h3>Specialisation</h3>` — expected.
- Hit 2: the unchanged "How we work at Soul Infinity" section's prose: _"Brihat Parashara Hora Shastra as the foundational text. Specialisation is in natal chart analysis, Vimshottari [dasha](/planets/saturn) timing..."_

The second occurrence is a legitimate organic prose use in a section the brief did NOT instruct me to modify. Not a duplicate of the credentials card. Treating as gate-pass-with-clarification rather than hard failure. If you want strict single-occurrence semantics, the simplest fix is to reword Saurabh's "Specialisation is in natal chart analysis..." sentence in the "How we work" section to e.g. "Our focus is in natal chart analysis..." — flagged as parked.

---

## Vercel preview

- **Branch:** `feature/blog-detail-fixes-v5`
- **Commit:** `e6743b8` — `feat(blog): add CredentialsSection magazine component` (5 files changed, 634 insertions, 12 deletions)
- **Pushed:** ✓ to `origin/feature/blog-detail-fixes-v5`
- **PR:** [#7 — feature/blog-detail-fixes-v5 → staging](https://github.com/saurabh-bits-pilani/SIAS-6.0/pull/7) (stacked on PR #6 → PR #5 → PR #4 → PR #3)
- **Preview URL:** https://soul-infinity-kh7xk7cw6-saurabh-bits-pilanis-projects.vercel.app
- **Vercel inspector:** https://vercel.com/saurabh-bits-pilanis-projects/soul-infinity.com/9StUbqK8wq9nJQDvBGipp2vGsMto
- **Build status:** ✓ success
- **Note:** preview gated by Vercel SSO Auth. Open in a logged-in browser to spot-check the visual gates from PR #7 description.

---

## Working tree right now

```
M  content/blog/finding-a-vedic-astrologer-in-ahmedabad.mdx
M  src/components/blog/MdxBlogComponents.tsx
?? scripts/blog-detail-fixes-v5-brief.md
?? scripts/blog-detail-fixes-v5-status.md
?? src/components/blog/CredentialsSection.tsx
```

Branch `feature/blog-detail-fixes-v5` exists locally only, not yet pushed.

---

## Follow-ups (parked)

- **Specialisation word collision** in the "How we work at Soul Infinity" prose section (gate 3f above). Reword to "Our focus is..." to keep gate strictly satisfied.
- **CredentialsSection number badge alignment**: the badge is positioned at the top of the right column independent of the title. On desktop it floats above the title text; on mobile it stacks. Visual gate may suggest moving the badge inline with the title for a tighter grid.
- **Inline list wrap behavior**: the 4 institute pills use `flex flex-wrap gap-x-5 gap-y-2`. At narrower widths some pills wrap to a second row. Reasonable; can be tightened to a 2-col grid if visual rhythm matters.
- **Card 01 warning callout vs Card 04 missing one**: only Card 01 has a warning. Cards 02-04 don't. If the design intent was "every card might have a warning," consider expanding the data model. Otherwise current behaviour (optional warning per card) is correct.
