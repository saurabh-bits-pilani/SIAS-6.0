# Blog Detail Fixes v10 — STATUS = SHIPPED TO PRODUCTION

**Date:** 2026-05-05

---

## What changed

### New file
| File | Lines | Purpose |
|---|---|---|
| `src/components/blog/WhatToExpectSection.tsx` | 158 | Centered title block (Poppins-bold line 1 + Caveat-italic-gold line 2 flanked by Sparkles + Sun divider) + intro callout (lotus icon in gold-fill circle, body + bold highlight on next line) + 5 numbered step cards (icon column with dotted vertical connectors / number badge / title + body) + closing footer banner (diya icon in gold circle + body + gold highlight line, Sparkles flourish bottom-right). |

### Modified files
- `src/components/blog/MdxBlogComponents.tsx`: registry now exposes 11 components (added `WhatToExpectSection`).
- `content/blog/finding-a-vedic-astrologer-in-ahmedabad.mdx`: replaced "What to expect" prose section (H2 + intro paragraph + 5 paragraphs) with one `<WhatToExpectSection ... />` JSX block + a deduplicated/aliased lucide import. Net diff +37 / -13.

---

## Lucide icon resolution

All 7 MDX-passed icons + 3 component-internal icons confirmed exported by `lucide-react`. **No fallbacks used.**

- Component-internal: `Sparkles`, `Sun`, `Flower2`, `LucideIcon` type
- MDX-passed: `Calendar` (aliased `CalendarIconV10`), `Compass` (aliased `CompassV10`), `Moon` (aliased `MoonIconV10`), `Orbit`, `MessageCircle` (aliased `MessageCircleV10`), `Flower2`, `Flame` (aliased `FlameV10`)

The brief flagged `Orbit` and `Flame` as candidates for fallback (`Globe` and `Sun` respectively). Both confirmed exported, no substitutions made.

### Brief deviation: 3 additional aliases for duplicate-binding prevention
The brief listed `Compass`, `MessageCircle`, `Flame` plain in the MDX import. All three already exist plain in earlier MDX imports:

| Identifier | Existing import location |
|---|---|
| `Compass` | line 165 (v3 QuestionsToAsk lucide import) |
| `MessageCircle` | line 35 (v2 intro AuthorCallout/WhatFollowsCards lucide import) |
| `Flame` | line 227 (v8 RedFlagsSection lucide import) |

Without aliasing, `@mdx-js/rollup` + acorn would reject duplicate top-level bindings (same parse error pattern hit in v5 with `Landmark` and v9 with `Target`). Pre-emptive fix:
- `Compass as CompassV10`
- `MessageCircle as MessageCircleV10`
- `Flame as FlameV10`

The brief's existing aliases (`Calendar as CalendarIconV10`, `Moon as MoonIconV10`) were already correct. `Orbit` and `Flower2` had no collisions. Build green on first try.

---

## Branch + PR sequence

| Step | Detail |
|---|---|
| Base | `main` at `312513f` (post v9) |
| Feature branch | `feature/blog-detail-fixes-v10` |
| Feature commit | **`9b32e8e`** — `feat(blog): add WhatToExpectSection magazine component` (3 files, +193 / -13) |
| Pushed | ✓ to `origin/feature/blog-detail-fixes-v10` |
| Feature PR | **#17** → `feature/blog-detail-fixes-v10` → `staging` |
| Vercel preview | ✓ success — https://soul-infinity-qyxgwp0w9-saurabh-bits-pilanis-projects.vercel.app (Inspector: https://vercel.com/saurabh-bits-pilanis-projects/soul-infinity.com/ABhN2C7QWZn9SDP3ciqsiciG5xGw) |
| Merge to staging | ✓ `gh pr merge 17 --merge --delete-branch=false` → staging at **`24b21fb`** |
| Staging Vercel | ✓ success (Inspector: https://vercel.com/saurabh-bits-pilanis-projects/soul-infinity.com/HmFmTxPH1c5fFbGVXJwL6Es3LXL8) |
| Promote PR | **#18** → `staging` → `main` (`Promote v10: WhatToExpectSection magazine component`) |
| Merge to main | ✓ `gh pr merge 18 --merge --delete-branch=false` → main at **`3501d58`** |
| Production Vercel | ✓ success (Inspector: https://vercel.com/saurabh-bits-pilanis-projects/soul-infinity.com/5ZkhyicdUz6suosPUY5oeQ3y4nNv) |
| Main HEAD progression | `312513f` → `3501d58` |

---

## Validation gate results

### Pre-commit (local build)
| Gate | Result |
|---|---|
| `npm run build` green | ✓ exit 0 (clean on first try; no acorn parse failure thanks to pre-emptive aliasing) |
| Schemas preserved (BlogPosting + FAQPage + Person) | ✓ 1 hit each |
| "What to expect in a" = 1 | ✓ |
| "genuine Jyotish consultation" ≥ 1 | ✓ 1 |
| "It begins with birth detail collection" = 1 | ✓ |
| "The astrologer then casts the chart" = 1 | ✓ |
| "The reading proper usually moves through your Lagna" = 1 | ✓ |
| "Only then does the conversation move to the current Mahadasha" = 1 | ✓ |
| "A real consultation is a dialogue" = 1 | ✓ |
| "Structure brings clarity. Clarity brings confidence." = 1 | ✓ |
| "That is the difference a genuine Jyotish consultation makes." = 1 | ✓ |
| `grep -n "—"` MDX | ✓ 0 |
| `grep -rn "—" src/` | ✓ empty |
| `grep -c "—" src/components/blog/WhatToExpectSection.tsx` | ✓ 0 |

### Production verification (live https://www.soulinfinity.space)
| Check | Result |
|---|---|
| Homepage HTTP 200 | ✓ |
| Post URL HTTP 200 | ✓ (148,218 bytes; was 135,390 after v9 — ~13KB increase from new component) |
| **Brief gate 17: "It begins with birth detail collection" ≥ 1 on production** | ✓ **1** (the new component is live) |
| All 9 step/title/footer strings on production (1 hit each) | ✓ all confirmed |
| `"@type":"BlogPosting"` on production | ✓ 1 |
| `"@type":"FAQPage"` on production | ✓ 1 |
| `"@type":"Person"` on production | ✓ 1 |

---

## Live URLs

- **Production homepage:** https://www.soulinfinity.space/
- **Production post:** https://www.soulinfinity.space/blog/finding-a-vedic-astrologer-in-ahmedabad

---

## Magazine treatment status

The Ahmedabad post now has 11 magazine-style sections live on production:

1. `WeakSignalsGrid` (intro)
2. `AuthorCallout` (intro)
3. `SanskritVerseCard` (intro)
4. `InsightCallout` (intro)
5. `WhatFollowsCards` (intro)
6. `CredentialsSection` (v7)
7. `QuestionsToAsk` (v3)
8. **`WhatToExpectSection` (v10) — NEW**
9. `RedFlagsSection` (v8)
10. `OnlineVsInPersonSection` (v9)
11. `ClosingSection` (v4 — wraps ClosingThought + FAQSection + FinalCTA)

**Remaining plain-prose blocks on the post:**
- TL;DR blockquote (top of body, intentionally a blockquote)
- "## How we work at Soul Infinity" section (the Saurabh-bio paragraph block — this is the only un-templated H2 left)

---

## Followups parked

- "How we work at Soul Infinity" is the last remaining plain-prose H2 on the post; candidate for a future "AboutPracticeSection" component if Saurabh wants the full magazine treatment.
- "Specialisation" word collision still 2 hits in production HTML — one in v7's CredentialsSection card title, one in unchanged Saurabh bio prose. Reword bio sentence for strict 1× count.
- `scripts/generate-llms.mjs` auto-discovery — still requires manual two-line edit per new blog post.
- TOC anchor extraction — still client-side `useEffect`; should migrate to build-time remark plugin.
- Read time — still hardcoded "8 min read"; should compute from word count.
- Brand assets registry (`src/data/brand-assets.ts`) — author portrait URL still hardcoded in BlogPost.tsx.
