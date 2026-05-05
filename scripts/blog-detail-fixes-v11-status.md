# Blog Detail Fixes v11 — STATUS = SHIPPED TO PRODUCTION

**Date:** 2026-05-05

---

## What changed

### New file
| File | Lines | Purpose |
|---|---|---|
| `src/components/blog/HowWeWorkSection.tsx` | 217 | Centered title block (Poppins-bold + Caveat-italic-gold flanked by Sparkles + Sun divider) + intro callout (HandHeart in gold-fill circle, bold introTitle + body) + 3 stacked primary cards with multi-paragraph body via `\n` split (Training & Tradition, Format, Approach) + 2-column compact info strip (Languages, Location) + CTA banner with stylised meditator illustration in navy circle (User + Moon + 3 scattered Sparkles) + closing trust line. |

### Modified files
- `src/components/blog/MdxBlogComponents.tsx`: registry now exposes 12 components.
- `content/blog/finding-a-vedic-astrologer-in-ahmedabad.mdx`: replaced "How we work at Soul Infinity" prose section (H2 + intro + 6 paragraphs) with one `<HowWeWorkSection ... />` JSX block + a deduplicated/aliased lucide import. Net diff +52 / -15.

---

## Lucide icon resolution

All 8 MDX-passed icons + 6 component-internal icons confirmed exported by `lucide-react`. **No fallbacks used.**

- Component-internal (imported inside the component): `Sparkles`, `Sun`, `Flower2`, `User`, `Moon`, `ArrowRight`, plus `LucideIcon` type
- MDX-passed: `Landmark` (aliased `LandmarkIconV11`), `Clock` (aliased `ClockIconV11`), `Sparkles` (aliased `SparklesIconV11`), `MessageCircle` (aliased `MessageCircleV11`), `MapPin` (aliased `MapPinV11`), `ShieldCheck` (aliased `ShieldCheckIconV11`), `HandHeart`

The brief flagged `HandHeart` as a fallback candidate (`Heart` or `Sparkles`). `HandHeart` confirmed exported, no substitution made.

### Meditator illustration choice (per brief request)
The brief offered alternatives for the seated meditator inside the navy CTA circle:
- Option A: just `User` (single Lucide icon)
- Option B: `User` + small `Flower2` below
- Option C: a single `Stars` lucide

**Chose Option A** with cosmic accents: `User` (w-12 md / w-14 md) text-blog-gold as the foreground meditator silhouette, plus `Moon` top-right and 3 scattered `Sparkles` around the inner circle for atmosphere. The `User` silhouette + cosmic accents reads cleanly at icon scale; adding a `Flower2` below would have been busy at the small radius.

### Brief deviation: 2 additional aliases for duplicate-binding prevention
The brief listed `MessageCircle` and `MapPin` plain in the MDX import. Both already imported plain on line 35 of the MDX (v2 intro lucide import for `AuthorCallout`/`WhatFollowsCards`). Without aliasing, `@mdx-js/rollup` + acorn would reject duplicate top-level bindings (same parse error pattern from v5/v9/v10). Pre-emptive fix:
- `MessageCircle as MessageCircleV11`
- `MapPin as MapPinV11`

The brief's existing aliases (`Landmark/Clock/Sparkles/Globe/ShieldCheck` → V11-suffixed) were already correct. **Dropped `GlobeIconV11`** from the import list — the brief itself noted: "GlobeIconV11 imported but not used in the MDX shown above (Languages uses MessageCircle in this version); leave the import if you want to swap it later, or omit it." Omitted to keep imports clean.

Build green on first try.

---

## Branch + PR sequence

| Step | Detail |
|---|---|
| Base | `main` at `3501d58` (post v10) |
| Feature branch | `feature/blog-detail-fixes-v11` |
| Feature commit | **`acab3de`** — `feat(blog): add HowWeWorkSection magazine component` (3 files, +269 / -14) |
| Pushed | ✓ to `origin/feature/blog-detail-fixes-v11` |
| Feature PR | **#19** → `feature/blog-detail-fixes-v11` → `staging` |
| Vercel preview | ✓ success — https://soul-infinity-i1egguiws-saurabh-bits-pilanis-projects.vercel.app (Inspector: https://vercel.com/saurabh-bits-pilanis-projects/soul-infinity.com/A4iDL91CU5QgANYBu1LgSnD3oEk3) |
| Merge to staging | ✓ `gh pr merge 19 --merge --delete-branch=false` → staging at **`c5df678`** |
| Staging Vercel | ✓ success (Inspector: https://vercel.com/saurabh-bits-pilanis-projects/soul-infinity.com/9dxbUGg8uoovtnG7fHDfGU2oEnHU) |
| Promote PR | **#20** → `staging` → `main` (`Promote v11: HowWeWorkSection magazine component`) |
| Merge to main | ✓ `gh pr merge 20 --merge --delete-branch=false` → main at **`744cb50`** |
| Production Vercel | ✓ success (Inspector: https://vercel.com/saurabh-bits-pilanis-projects/soul-infinity.com/3ZDix8u6vLSYfpfngNvGpe9soUhe) |
| Main HEAD progression | `3501d58` → `744cb50` |

---

## Validation gate results

### Pre-commit (local build)
| Gate | Result |
|---|---|
| `npm run build` green | ✓ exit 0 (clean on first try; pre-emptive aliasing prevented acorn parse failure) |
| Schemas preserved (BlogPosting + FAQPage + Person) | ✓ 1 hit each |
| "How we work" ≥ 1 | ✓ 1 |
| "at Soul Infinity" ≥ 1 | ✓ 2 (title + closing line; matches brief expectation of 2-3 hits) |
| "This is the only section in this guide that is directly about our practice." = 1 | ✓ |
| "Our Training" = 1 | ✓ |
| "K.N. Rao Institute lineage" | ✓ 1 (only inside the new component; brief noted it might appear elsewhere but it does not) |
| "60 to 90 minutes" ≥ 1 | ✓ 4 (3 inside the component's Format card paragraph + 1 echoed elsewhere — consistent with brief "may already exist in earlier sections") |
| "Khodiyar and Adani Shantigram" = 1 | ✓ |
| "Vedic astrology services page" ≥ 1 | ✓ 1 (CTA pill text) |
| "Clarity. Tradition. Trust." = 1 | ✓ |
| "That is how we work at Soul Infinity." = 1 | ✓ |
| `grep -n "—"` MDX | ✓ 0 |
| `grep -rn "—" src/` | ✓ empty |
| `grep -c "—" src/components/blog/HowWeWorkSection.tsx` | ✓ 0 |

### Production verification (live https://www.soulinfinity.space)
| Check | Result |
|---|---|
| Homepage HTTP 200 | ✓ |
| Post URL HTTP 200 | ✓ (163,046 bytes; was 148,218 after v10 — ~15KB increase from new component) |
| **Brief gate 17: "Khodiyar and Adani Shantigram" ≥ 1 on production** | ✓ **1** (the new component is live) |
| All other v11 gate strings on production | ✓ all confirmed (1 hit each, "at Soul Infinity" = 2) |
| `"@type":"BlogPosting"` on production | ✓ 1 |
| `"@type":"FAQPage"` on production | ✓ 1 |
| `"@type":"Person"` on production | ✓ 1 |

---

## Live URLs

- **Production homepage:** https://www.soulinfinity.space/
- **Production post:** https://www.soulinfinity.space/blog/finding-a-vedic-astrologer-in-ahmedabad

---

## Magazine treatment status — POST IS NOW FULLY TEMPLATED

The Ahmedabad post now has **12 magazine-style sections** live on production:

1. `WeakSignalsGrid` (intro)
2. `AuthorCallout` (intro)
3. `SanskritVerseCard` (intro)
4. `InsightCallout` (intro)
5. `WhatFollowsCards` (intro)
6. `CredentialsSection` (v7)
7. `QuestionsToAsk` (v3)
8. `WhatToExpectSection` (v10)
9. `RedFlagsSection` (v8)
10. `OnlineVsInPersonSection` (v9)
11. **`HowWeWorkSection` (v11) — NEW**
12. `ClosingSection` (v4 — wraps ClosingThought + FAQSection + FinalCTA)

**Remaining plain-prose blocks on the post:**
- TL;DR blockquote at the top of the body (intentionally a blockquote, no H2)

That is the only un-templated block left. Every H2 section is now a magazine component.

---

## Followups parked

- "Specialisation" word collision — historical 2-hit issue from v7 (CredentialsSection card title + the previous "How we work" prose). With v11 live, the prose use is gone — but `Specialisation` now appears in the new HowWeWork primary card body too ("Specialisation is in natal chart analysis..." in the Training & Tradition card). Net effect: still 2 hits on production. If you want strict 1× count, reword the body to "Our focus is in natal chart analysis...".
- `scripts/generate-llms.mjs` auto-discovery — still requires manual two-line edit per new blog post.
- TOC anchor extraction — still client-side `useEffect`; should migrate to build-time remark plugin.
- Read time — still hardcoded "8 min read"; should compute from word count.
- Brand assets registry (`src/data/brand-assets.ts`) — author portrait URL still hardcoded in BlogPost.tsx.
