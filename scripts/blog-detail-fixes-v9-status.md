# Blog Detail Fixes v9 — STATUS = SHIPPED TO PRODUCTION

**Date:** 2026-05-05
**Cycle:** 2 of 2 (v9 — OnlineVsInPersonSection magazine component). Both cycles of the v8+v9 brief now complete.

---

## What changed

### New file
| File | Lines | Purpose |
|---|---|---|
| `src/components/blog/OnlineVsInPersonSection.tsx` | 217 | Cream-soft rounded section + Caveat-italic two-line title (line 1 ink, line 2 gold flanked by Sparkles) + Sun divider + white highlight callout (Quote in gold circle, intro plain + body gold-bold) + two-column comparison cards with central VS gold-bubble divider on desktop + gold pill "What actually matters" heading flanked by dotted lines + 3-column matters cards + dark navy footer banner with auto-split footerText. |

### Modified files
- `src/components/blog/MdxBlogComponents.tsx`: registry now exposes 10 components (added `OnlineVsInPersonSection`).
- `content/blog/finding-a-vedic-astrologer-in-ahmedabad.mdx`: replaced online-vs-in-person prose section (H2 + 3 paragraphs) with one `<OnlineVsInPersonSection ... />` JSX block + a deduplicated lucide import.

---

## Lucide icon resolution

All 11 MDX-passed icons + 4 component-internal icons confirmed exported by `lucide-react`. **No fallbacks used.**

- Component-internal: `Sparkles`, `Sun`, `Flower2`, `Quote`, `LucideIcon` type
- MDX-passed: `Users` (aliased `UsersIconV9`), `Monitor`, `Globe`, `Video`, `Clock` (aliased `ClockIconV9`), `Target` (aliased `TargetV9`), `Handshake`, `Sun`, `Calendar` (aliased `CalendarIconV9`), `Brain`, `Star`

The brief flagged `Brain` and `Handshake` as candidates for fallback (`Lightbulb` and `Users` respectively). Both confirmed exported, no substitutions made.

### Brief deviations from the literal MDX import list

- **Dropped `Lotus`** — confirmed nonexistent in `lucide-react` (the brief itself noted this and pre-substituted `Sun` for the in-person calm icon, which I kept). `Lotus` was still in the brief's literal import line; I removed it to avoid a build-time crash.
- **Dropped `GitBranch`** — listed in the brief's literal import line but never referenced in the JSX data. Unused imports would have failed `noUnusedLocals` (or at minimum bloated the bundle).
- **Dropped `Quote`** — the brief listed `Quote` in the MDX import, but `Quote` is used INSIDE the `OnlineVsInPersonSection` component (as the white-fill icon inside the gold circle in the highlight callout) and is not part of the public component API. Imported it directly inside the component file instead, so the MDX surface stays clean.
- **Aliased `Target as TargetV9`** — `Target` is already imported plain on line 110 of the MDX (the v7 `CredentialsSection` import). Without the alias, `@mdx-js/rollup` + acorn would reject the duplicate top-level binding (same parse error pattern hit in v5 with `Landmark`). Pre-emptive fix; build green on first try.

### Footer split implementation choice
The brief gave two options: split `footerText` on `", and "` inline OR add a separate `footerHighlight` prop. Chose the **inline split approach** (`splitFooterText` helper inside the component) because:
1. Keeps the MDX surface area smaller (one fewer prop for authors to remember).
2. Falls back gracefully — if `, and ` isn't in the string, the entire `footerText` renders in the base style (no broken layout).
3. The split point is unambiguous in the supplied text.

Trade-off: if a future post wants to highlight a different clause, they'd need to either reword the text to include `, and ` at the right split point, or extend the component to accept the optional `footerHighlight` prop too. Cheap to add later.

---

## Branch + PR sequence

| Step | Detail |
|---|---|
| Base | `main` at `1c68415` (post v8 main promote) |
| Feature branch | `feature/blog-detail-fixes-v9` |
| Feature commit | **`77c65ec`** — `feat(blog): add OnlineVsInPersonSection magazine component` (3 files, +262 / -7) |
| Pushed | ✓ to `origin/feature/blog-detail-fixes-v9` |
| Feature PR | **#15** → `feature/blog-detail-fixes-v9` → `staging` |
| Vercel preview | ✓ success — https://soul-infinity-khywle5tz-saurabh-bits-pilanis-projects.vercel.app (Inspector: https://vercel.com/saurabh-bits-pilanis-projects/soul-infinity.com/GZEgwPwS2e1o3wr9hxQaXRqcWvra) |
| Merge to staging | ✓ `gh pr merge 15 --merge --delete-branch=false` → staging at **`07ddf23`** |
| Staging Vercel | ✓ success (Inspector: https://vercel.com/saurabh-bits-pilanis-projects/soul-infinity.com/AFwndksM64bzXMJaSY8SkTxLnpnp) |
| Promote PR | **#16** → `staging` → `main` (`Promote v9: OnlineVsInPersonSection magazine component`) |
| Merge to main | ✓ `gh pr merge 16 --merge --delete-branch=false` → main at **`312513f`** |
| Production Vercel | ✓ success (Inspector: https://vercel.com/saurabh-bits-pilanis-projects/soul-infinity.com/FqRrUVELwBxVktE58rmS42qHxxkD) |
| Main HEAD progression | `1c68415` → `312513f` |

---

## Validation gate results

### Pre-commit (local build)
| Gate | Result |
|---|---|
| `npm run build` green | ✓ exit 0 (clean on first try; no acorn parse failure thanks to pre-emptive `TargetV9` alias) |
| Schemas preserved (BlogPosting + FAQPage + Person) | ✓ 1 hit each |
| "Online consultations vs meeting in person" = 1 | ✓ |
| "Meeting in Person" ≥ 1 | ✓ 1 |
| "Online Consultation" ≥ 1 | ✓ 1 |
| "Birth detail accuracy" = 1 | ✓ |
| "Time allocated for the reading" = 1 | ✓ |
| "Chart logic step by step" = 1 | ✓ |
| "We offer both formats" = 1 | ✓ |
| `grep -n "—"` MDX | ✓ 0 |
| `grep -rn "—" src/` | ✓ empty |
| `grep -c "—" src/components/blog/OnlineVsInPersonSection.tsx` | ✓ 0 |

### Production verification (live https://www.soulinfinity.space)
| Check | Result |
|---|---|
| Homepage HTTP 200 | ✓ |
| Post URL HTTP 200 | ✓ (135,390 bytes; was 120,417 after v8 — ~15KB increase from new component) |
| **Brief gate 16: "Birth detail accuracy" ≥ 1 on production** | ✓ **1** (the new component is live) |
| "Online consultations vs meeting in person" on production | ✓ 1 |
| "Meeting in Person" on production | ✓ 1 |
| "Online Consultation" on production | ✓ 1 |
| "Time allocated for the reading" on production | ✓ 1 |
| "Chart logic step by step" on production | ✓ 1 |
| "We offer both formats" on production | ✓ 1 |
| `"@type":"BlogPosting"` on production | ✓ 1 |
| `"@type":"FAQPage"` on production | ✓ 1 |
| `"@type":"Person"` on production | ✓ 1 |

---

## Live URLs

- **Production homepage:** https://www.soulinfinity.space/
- **Production post:** https://www.soulinfinity.space/blog/finding-a-vedic-astrologer-in-ahmedabad

---

## v8 + v9 cycle complete

Both cycles of the v8+v9 brief are now live on production:
- **v8** (PRs #13 → #14, main `1c68415`) — RedFlagsSection magazine component
- **v9** (PRs #15 → #16, main `312513f`) — OnlineVsInPersonSection magazine component

The Ahmedabad post now has 10 magazine-style sections (`WeakSignalsGrid`, `AuthorCallout`, `SanskritVerseCard`, `InsightCallout`, `WhatFollowsCards`, `QuestionsToAsk`, `CredentialsSection`, `RedFlagsSection`, `OnlineVsInPersonSection`, `ClosingSection`) replacing the original prose-only template.

---

## Followups parked

- "Specialisation" word collision (still 2 hits in production HTML — one in v7's CredentialsSection card title, one in unchanged Saurabh bio prose). Reword bio sentence if you want strict 1× count.
- `scripts/generate-llms.mjs` auto-discovery — still requires manual two-line edit per new blog post.
- TOC anchor extraction — still client-side `useEffect`; should migrate to build-time remark plugin.
- Read time — still hardcoded "8 min read"; should compute from word count.
- Brand assets registry (`src/data/brand-assets.ts`) — author portrait URL still hardcoded in BlogPost.tsx.
- "How we work at Soul Infinity" prose section is now the only remaining plain-prose block on the post (apart from the TL;DR blockquote and the "What to expect in a genuine Jyotish consultation" section). Worth deciding if those also get the magazine treatment in a future cycle.
