# Blog Detail Fixes v3 — STATUS = SHIPPED, PR OPEN, PREVIEW LIVE

**Branch:** `feature/blog-detail-fixes-v3` (off `feature/blog-detail-fixes-v2` @ `b3c6470`, stacked on PR #4 which is still open against staging)
**Date:** 2026-05-05

---

## Component built

| File | Lines | Purpose |
|---|---|---|
| `src/components/blog/QuestionsToAsk.tsx` | 147 | Magazine-style numbered question list with title/intro callout/cards/closing block. Self-contained, props-driven, no internal state. |

Wired into `src/components/blog/MdxBlogComponents.tsx`: `QuestionsToAsk` added to imports and to the `mdxBlogComponents` map (now 6 components total).

### Layout details
- **Title block**: top sparkle + Poppins-bold line 1 (titleLine1) + Caveat-italic-gold line 2 (titleLine2) + horizontal divider with central Sun icon. Mandala (`Flower2`) decoration top-right at 10% opacity.
- **Intro callout**: cream-soft card, gold left circle with `HelpCircle`, bold introTitle, lighter introBody, subtle Flower2 decoration top-right at 15% opacity.
- **Cards**: 3-column flex (icon / number badge with dotted vertical connector / content). On mobile: icon column shrinks (`w-16`), number badge moves inline with title (`md:hidden` on the desktop badge column). Last card omits the vertical connector.
- **Closing callout**: pill-shaped (`rounded-full`), centered italic text flanked by Sparkles, Flower2 below.
- All borders/accents in `border-blog-gold/20` to `/40`, dotted connector at `/40`. Wrapper has `not-prose` so the parent `prose-blog` typography theme doesn't fight the layout.

### Icon imports verified
All 9 icons resolve in lucide-react: `Sparkles`, `Sun`, `Flower2`, `HelpCircle`, `BookOpen`, `Clock`, `Lightbulb`, `Heart`, `Compass`. No fallback needed.

### Brief deviation: aliasing `Sparkles as SparklesIcon` in MDX
The brief noted "I am importing Sparkles as SparklesIcon to avoid conflict with the existing Sparkles import in the hero section." There's no actual conflict in the MDX file (the hero `Sparkles` import lives in `BlogPost.tsx`, not in the MDX), but the alias was kept verbatim to honor the brief. No functional impact.

---

## MDX rewrite

`content/blog/finding-a-vedic-astrologer-in-ahmedabad.mdx`:
- **Replaced lines 124-150** (27 lines): the H2 `## Questions to ask before your first consultation` + intro paragraph + 6 prose questions (each with its own `### ` H3 + paragraph).
- **Inserted** a new lucide import line + 1 `<QuestionsToAsk>` JSX block with 6 items array entries.
- Net change: +46 / -27, file went 245 → 266 lines.
- No frontmatter changes. Sections before line 124 (Why this guide exists, What credentials...) and after line 150 (What to expect..., Red flags..., etc.) unchanged.

---

## Build gate results (all 9 passing)

| # | Gate | Result |
|---|---|---|
| 1 | `npm run build` green | ✓ exit 0 |
| 2 | Prerender count = 42 | ✓ |
| 3a | Schemas preserved (BlogPosting + FAQPage + Person) | ✓ 1 hit each |
| 3b | "Questions to ask" rendered | ✓ |
| 3c | "Before you book, you are entitled to ask." rendered | ✓ |
| 3d | All 6 question titles in HTML | ✓ all 6 present (1 hit each) |
| 3e | "Good questions lead to clarity" closing rendered | ✓ |
| 4 | `grep -n "—"` MDX | ✓ empty |
| 5 | `grep -rn "—" src/` | ✓ empty (incl. new component) |
| 6 | No regressions on `/`, `/services`, `/planets/jupiter`, `/zodiac/aries`, `/blog` | ✓ all 42 routes prerendered green |

---

## Vercel preview

To be filled after PR opens.

---

## Working tree right now

```
M  content/blog/finding-a-vedic-astrologer-in-ahmedabad.mdx
M  src/components/blog/MdxBlogComponents.tsx
?? scripts/blog-detail-fixes-v3-status.md   (this file)
?? src/components/blog/QuestionsToAsk.tsx   (new component)
```

Branch `feature/blog-detail-fixes-v3` exists locally only, not yet pushed. PR not yet opened.

---

## Follow-ups (parked)

- **TOC behavior**: the new `<QuestionsToAsk>` component renders an `<h2>` for "Questions to ask", which IS picked up by the existing `useEffect` TOC scanner (`document.querySelectorAll('article.blog-content h2')`). The auto-slug will be `questions-to-ask` (text content of the h2). The `titleLine2` "before your first consultation" is in a separate `<p>` so it doesn't leak into the TOC text. Verify on the Vercel preview that the TOC entry reads cleanly.
- **Number badges on mobile**: the mobile badge sits inline with the title via `align-middle`. On very long titles (Q05 wraps at narrow widths) the badge alignment may look off. If it does, consider moving the mobile badge to its own row above the title.
- **Closing pill on small screens**: at 375px the pill content (sparkle + sentence + sparkle) wraps. The `rounded-full` will still look fine but the text gets a slight indent. Acceptable; if not, swap `rounded-full` to `rounded-2xl` for narrow viewports.
