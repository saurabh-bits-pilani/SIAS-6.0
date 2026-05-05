# Blog Detail Fixes v4 — STATUS = SHIPPED, PR #6 OPEN, PREVIEW LIVE

**Branch:** `feature/blog-detail-fixes-v4` (off `feature/blog-detail-fixes-v3` @ `6d8e8ab`, stacked on PR #5 → PR #4 → PR #3)
**Date:** 2026-05-05

---

## Components built (6 new files)

| File | Lines | Internal state | Purpose |
|---|---|---|---|
| `src/components/blog/Section.tsx` | 9 | none | `<section className="max-w-5xl mx-auto px-4 py-12 md:py-16">` wrapper used by ClosingSection |
| `src/components/blog/ClosingThought.tsx` | 37 | none | Cream card with diya icon + body + gold highlight; lotus decoration |
| `src/components/blog/FAQItem.tsx` | 45 | `useState<boolean>(false)` for open/closed | Single accordion row with icon circle, divider, ChevronDown rotate-180 on open |
| `src/components/blog/FAQSection.tsx` | 49 | none | Title block (sparkles + Sun divider) + bordered cream-soft list of FAQItems |
| `src/components/blog/FinalCTA.tsx` | 76 | none | Optional cream "closingLine" bar + dark navy CTA card with cosmic SVG + gold button using `<Link>` from react-router-dom |
| `src/components/blog/ClosingSection.tsx` | 51 | none | Composite that renders ClosingThought + FAQSection + FinalCTA inside Section, all forwarded via props |

Total new code: 267 lines.

### Brief verification: all icons exist
`Search`, `Moon`, `Clock`, `IndianRupee`, `Laptop`, `Landmark`, `Flame`, `Compass`, `Sparkles`, `Sun`, `Flower2`, `ChevronDown`, `ArrowRight` — all confirmed exported by `lucide-react`. No fallback needed.

### Registry update
`src/components/blog/MdxBlogComponents.tsx` now exposes 7 components (added `ClosingSection`). Per brief, the 5 internal child components (`Section`, `ClosingThought`, `FAQItem`, `FAQSection`, `FinalCTA`) are NOT exposed to MDX — `ClosingSection` is the single public entry point.

---

## BlogPost.tsx diff summary (FAQ removal)

`src/pages/BlogPost.tsx`: -27 lines.

Deleted the inline FAQ accordion block (the `{fm.faqs && fm.faqs.length > 0 && (...)}` block, lines 448-473 in the previous version). It rendered an `<h2>Frequently Asked Questions</h2>` followed by a `space-y-2` list of `<details>` accordions, one per `fm.faqs` entry.

**Preserved verbatim:**
- `if (fm.faqs && fm.faqs.length > 0) schemas.push(buildFaqSchema(fm.faqs));` — FAQPage JSON-LD injection still pulls from frontmatter (line 238).
- The bottom CTA banner that immediately followed the deleted block (now reads "Want a Personalised Astrology Reading?") — sits exactly where it was.
- The mobile TOC accordion's `ChevronDown` import (line 26) — still used by the mobile TOC at line 432.

No other changes to BlogPost.tsx.

---

## MDX rewrite (`content/blog/finding-a-vedic-astrologer-in-ahmedabad.mdx`)

Net diff: +56 / -34 (file went 266 → 288 lines).

### Step 1: deletions
- Lines 238-262 (the previous version): `## Frequently asked questions` H2 + 6 H3 question + answer prose blocks
- Lines 264-266 (the previous version): `## A closing thought` H2 + body paragraph

Both blocks duplicated content that now lives entirely inside the new `<ClosingSection>`.

### Step 2: append the ClosingSection invocation
A new lucide import line + 1 `<ClosingSection>` JSX block appended right after the prior tail. The 6 `faqs` items in the JSX exactly match the frontmatter.faqs entries.

### frontmatter.faqs sync
Updated Q4 (`How much should a Vedic astrology consultation cost in Ahmedabad?`) frontmatter answer to remove the markdown link `[services page](/services/vedic-astrology)` so the frontmatter and the visible ClosingSection text are byte-identical. Other 5 entries already matched.

This guarantees: the FAQPage JSON-LD answer text and the visible accordion answer text say the same thing — Google policy compliance.

---

## Validation gate results (all 9 + bonus passing)

| # | Gate | Result |
|---|---|---|
| 1 | `npm run build` green | ✓ exit 0 |
| 2 | Prerender count = 42 | ✓ |
| 3a | Schemas preserved (BlogPosting + FAQPage + Person) | ✓ 1 hit each |
| 3b | "A Closing Thought" rendered EXACTLY ONCE | ✓ 1 hit (just the title; the answer text appears only once via the new component) |
| 3c | "Frequently Asked Questions" rendered EXACTLY ONCE in visible content | ✓ 1 hit |
| 3d | All 6 question texts EXACTLY ONCE in visible content + once in JSON-LD = 2 each | ✓ all 6 questions: 2 hits each (visible accordion + JSON-LD `name` field) |
| 3e | "We're here to help you on that journey" rendered | ✓ apostrophe encoded as `&#x27;`, 2 occurrences (h3 in CTA card + p in closingLine bar) |
| 3f | "Book a Consultation" button rendered | ✓ 1 hit (in the FinalCTA Link) |
| 4 | `grep -n "—"` MDX | ✓ empty |
| 5 | `grep -rn "—" src/` | ✓ empty (incl. all 6 new components) |
| 6 | No regressions on `/`, `/services`, `/planets/jupiter`, `/zodiac/aries`, `/blog` | ✓ all 42 routes prerendered green |

---

## Vercel preview

- **Branch:** `feature/blog-detail-fixes-v4`
- **Commit:** `df289b4` — `feat(blog): closing section with interactive FAQ and CTA, deduplicate` (11 files changed, 685 insertions, 56 deletions)
- **Pushed:** ✓ to `origin/feature/blog-detail-fixes-v4`
- **PR:** [#6 — feature/blog-detail-fixes-v4 → staging](https://github.com/saurabh-bits-pilani/SIAS-6.0/pull/6) (stacked on PR #5 → PR #4 → PR #3)
- **Preview URL:** https://soul-infinity-o9q6dptd4-saurabh-bits-pilanis-projects.vercel.app
- **Vercel inspector:** https://vercel.com/saurabh-bits-pilanis-projects/soul-infinity.com/FcJ8WtNRXxXiMGog3pkfEtsBea3P
- **Build status:** ✓ success
- **Note:** preview gated by Vercel SSO Auth. Open in a logged-in browser to spot-check the visual gates from PR #6 description.

---

## Working tree right now

```
M  content/blog/finding-a-vedic-astrologer-in-ahmedabad.mdx
M  src/components/blog/MdxBlogComponents.tsx
M  src/pages/BlogPost.tsx
?? scripts/blog-detail-fixes-v4-brief.md
?? scripts/blog-detail-fixes-v4-status.md
?? src/components/blog/Section.tsx
?? src/components/blog/ClosingThought.tsx
?? src/components/blog/FAQItem.tsx
?? src/components/blog/FAQSection.tsx
?? src/components/blog/FinalCTA.tsx
?? src/components/blog/ClosingSection.tsx
```

Branch `feature/blog-detail-fixes-v4` exists locally only, not yet pushed.

---

## Follow-ups (parked)

- **`useState` per-item in `FAQItem`** — each FAQItem owns its own open state, so opening one doesn't close another. Acceptable behaviour, but if you want single-open-at-a-time accordion semantics, lift state to `FAQSection` and pass `openIndex` + `onToggle` down.
- **No `not-prose` on `Section` or `ClosingSection`** — the inner `ClosingThought`/`FAQSection`/`FinalCTA` each apply `not-prose` themselves. If the parent `<article className="prose prose-blog">` sees the Section wrapper, the typography theme's H2 styling (Kalam-bold, gold underline) might leak into the FAQSection h2. Verified at build time: gates 3c and 3e show correct visible output; visual gate on Vercel preview will confirm there's no rogue underline.
- **TOC behavior** — the new `<FAQSection>` h2 ("Frequently Asked Questions") still appears in the TOC `useEffect` scan (it queries `article.blog-content h2`). The auto-slug will be `frequently-asked-questions`. Same for the `<ClosingThought>` h2 ("A Closing Thought") with slug `a-closing-thought`. Both expected.
- **`Section.tsx` vs the existing top-level page `<section>` wrapper** — `Section.tsx` is a new wrapper that adds `max-w-5xl mx-auto px-4 py-12 md:py-16`, which sits inside the existing `<section className="bg-blog-cream-soft py-12 md:py-16">` two-column grid container. There may be a slight padding double-up. Will be visible on Vercel preview; can tighten later if needed.
