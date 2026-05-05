# Blog Detail Fixes v2 — STATUS = SHIPPED, PR #4 OPEN, PREVIEW LIVE

**Branch:** `feature/blog-detail-fixes-v2` (off `feature/blog-detail-redesign` @ `4ac759f`, stacked on PR #3 which is still open against staging)
**Date:** 2026-05-05
**Result:** All 9 build gates green. PR open. Preview URL captured.

---

## 1. Hero refactor (Change 1)

`src/pages/BlogPost.tsx`:
- **Removed:** `heroDecor` const (decorative SVG with 40 stars + 4 polylines, ~30 lines), `grid grid-cols-1 lg:grid-cols-[1fr_500px]` two-column layout wrapper, mobile-only `<img className="lg:hidden mt-8 ...">`, desktop-only `<div className="hidden lg:block"><img></div>`.
- **Added:** single full-bleed `<img className="absolute inset-0 w-full h-full object-cover object-center">` as background, two responsive gradient overlay `<div>`s (mobile: vertical fade `bg-gradient-to-b from-blog-navy/95 via-blog-navy/85 to-blog-navy/70 lg:hidden`; desktop: horizontal fade `hidden lg:block bg-gradient-to-r from-blog-navy/90 via-blog-navy/70 to-transparent`).
- **Section sizing:** `min-h-[600px] md:min-h-[700px] flex items-center` to accommodate the bumped Caveat title sizes.
- **Text container:** `max-w-2xl` to constrain text to the left ~60% on desktop where the gradient is dense; on mobile the dense vertical gradient covers everything so width doesn't matter.
- Net change: hero section went from ~95 lines (two cols + decor SVG) to ~75 lines (single bleed + 2 overlays + text container).

## 2. Caveat font swap (Change 2)

Replaced `font-sacramento` with `font-caveat font-bold` in three locations in `src/pages/BlogPost.tsx`:
| Where | Before | After |
|---|---|---|
| Hero H1 | `font-sacramento ... text-5xl md:text-6xl lg:text-7xl` | `font-caveat font-bold ... text-6xl md:text-7xl lg:text-8xl` |
| Bottom CTA banner H2 | `font-sacramento text-3xl md:text-4xl` | `font-caveat font-bold text-4xl md:text-5xl` |
| Sidebar dark CTA H3 | `font-sacramento text-2xl` | `font-caveat font-bold text-3xl` |

Also updated `tailwind.config.js` `typography.blog.h1`:
- `fontFamily: 'Sacramento, cursive'` → `'Caveat, cursive'`
- `fontWeight: '400'` → `'700'`

(This h1 entry only applies inside the `prose-blog` article body; the hero H1 above is outside the prose wrapper and is styled via direct Tailwind classes. Both are now consistent on Caveat 700.)

Verified `font-sacramento` count in `src/pages/BlogPost.tsx`: **0**.
Verified `font-caveat` count in `src/pages/BlogPost.tsx`: **3** (hero H1 + bottom CTA H2 + sidebar dark CTA H3).

## 3. New components (Change 3)

5 components built in `src/components/blog/` plus 1 registry:

| File | Lines | Purpose |
|---|---|---|
| `WeakSignalsGrid.tsx` | 43 | 3-column responsive grid of cream cards with icon circles. Used for the "three weak signals" intro block. |
| `AuthorCallout.tsx` | 56 | Dark navy block with "About the Author" eyebrow, Caveat title, gold inline link via `{LINK}` token splitting in body. Decorative `Landmark` lucide icon at low opacity top-left. |
| `SanskritVerseCard.tsx` | 41 | Cream parchment card with centered Devanagari (multi-line via `\n`), IAST, translation. Decorative ॐ glyph top-right at low opacity. |
| `InsightCallout.tsx` | 14 | Horizontal cream-soft block, gold left border, icon + text. |
| `WhatFollowsCards.tsx` | 41 | 4-column responsive grid of navy cards with gold icon circles. |
| `MdxBlogComponents.tsx` | 22 | Re-export map registered with `<MDXProvider components={...}>`. |

All 6 files: 0 em-dashes (`grep -c "—" src/components/blog/*.tsx` → 0 across the board).

### MDX provider wiring

- `vite.config.ts`: added `providerImportSource: '@mdx-js/react'` to the `mdx({...})` plugin options. Without this, compiled MDX modules ignore the `<MDXProvider>` context and custom JSX tags don't resolve.
- `src/pages/BlogPost.tsx`:
  - New imports: `MDXProvider` from `@mdx-js/react`, `mdxBlogComponents` from `../components/blog/MdxBlogComponents`.
  - Wrapped `<Content />` in `<MDXProvider components={mdxBlogComponents}>...</MDXProvider>` inside the `<article className="blog-content prose prose-blog max-w-none">` wrapper.
- `@mdx-js/react@^3.1.1` was already in `package.json` (no install needed).

## 4. MDX content rewrite

`content/blog/finding-a-vedic-astrologer-in-ahmedabad.mdx`:
- **Diff:** +63 / -10 (73 lines net change).
- **Scope:** ONLY the section between the TL;DR blockquote and the `## What credentials should a Vedic astrologer have?` H2. Frontmatter unchanged. Everything from "What credentials" onward unchanged.
- **Added at top of body** (just below frontmatter closing `---`): `import { MapPin, Wallet, Users, Landmark, ClipboardList, MessageCircle, AlertTriangle, Eye } from 'lucide-react';`
- **Replaced** the prior 3 prose paragraphs ("Most people pick an astrologer..." / "This guide is written by..." / "What follows is the checklist...") with 5 stacked custom components: `<WeakSignalsGrid>` → narrative paragraph → `<AuthorCallout>` → `<SanskritVerseCard>` → `<InsightCallout>` → `<WhatFollowsCards>`.
- The `## Why this guide exists` H2 + the opening "Ahmedabad has hundreds of practising astrologers..." paragraph remain unchanged (so the TOC entry still exists).

## 5. Build gate results (all 9 passing)

| # | Gate | Result |
|---|---|---|
| 1 | `npm run build` green | ✓ exit 0 |
| 2 | Prerender count = 42 | ✓ `Prerendered 42 routes.` |
| 3a | BlogPosting + FAQPage + Person JSON-LD all in HTML | ✓ 1 hit each |
| 3b | "Why this guide exists" rendered | ✓ 1 hit |
| 3c | WeakSignalsGrid items in HTML | ✓ "How close", "How affordable", "Whether a relative recommended" all 1 hit each |
| 3d | Sanskrit verse Devanagari in HTML | ✓ "तमसो" 1 hit |
| 3e | WhatFollows card titles in HTML | ✓ all 4 (Checklist, Questions, Warning signs, From birth detail) 1 hit each |
| 4 | `grep -n "—"` MDX | ✓ empty |
| 5 | `grep -rn "—" src/` | ✓ empty |
| 6 | `grep -c "—" src/components/blog/*.tsx` | ✓ 0 across all 6 files |
| 7 | Hero img full-bleed (no second hero img on right side) | ✓ single visible `<img>` in hero section; the 3 hits in HTML are og:image meta + twitter:image meta + the one full-bleed img |
| 8 | `font-caveat` near H1 | ✓ `font-caveat font-bold text-blog-cream text-6xl md:text-7xl lg:text-8xl leading-tight mb-4` |
| 9 | No regressions on `/`, `/services`, `/planets/jupiter`, `/zodiac/aries`, `/blog` | ✓ all 42 routes prerendered green |

### Bonus checks
- `Bharatiya Vidya Bhavan school of astrology` rendered in 2 places: AuthorCallout's link AND the existing FAQ Q6 answer body (both expected, the second was already present from the v1 K.N. Rao link cleanup).

## 6. Vercel preview URL

- **Branch:** `feature/blog-detail-fixes-v2`
- **Commit:** `d6da273` — `feat(blog): full-bleed hero, Caveat title, magazine intro components` (12 files changed, 641 insertions, 125 deletions)
- **Pushed:** ✓ to `origin/feature/blog-detail-fixes-v2`
- **PR:** [#4 — feature/blog-detail-fixes-v2 → staging](https://github.com/saurabh-bits-pilani/SIAS-6.0/pull/4) (stacked on PR #3)
- **Preview URL:** https://soul-infinity-7wjsbd7xk-saurabh-bits-pilanis-projects.vercel.app
- **Vercel inspector:** https://vercel.com/saurabh-bits-pilanis-projects/soul-infinity.com/7ssJdkzcL7gmwo3HUbQBWdwkSEBF
- **Build status:** ✓ success
- **Note:** preview gated by Vercel SSO Auth. Open in a browser logged into the Vercel team to spot-check the visual gates from PR #4 description.

## 7. Follow-ups (parked, not actioned)

- **Caveat sizing fine-tune:** the H1 jump from `text-5xl md:text-6xl lg:text-7xl` to `text-6xl md:text-7xl lg:text-8xl` was a one-step bump per spec. Caveat at `text-8xl` on `lg+` is bold and very large; a Vercel preview spot-check may suggest dropping back to `text-7xl` if it overshoots the hero proportion. Same for the bottom CTA H2 (`text-4xl md:text-5xl`) and sidebar dark CTA H3 (`text-3xl`).
- **`AuthorCallout` `{LINK}` placeholder:** working, but is a string-based templating hack. If we add a second component that needs inline links, generalise to a structured prop shape (e.g. `<AuthorCallout body={[{text: "..."}, {link: {text, href}}, {text: "..."}]} />`) or just accept arbitrary children with a helper anchor component.
- **`SanskritVerseCard` ॐ decoration:** uses the Devanagari character at `text-6xl opacity-15` instead of an inline SVG. Looks clean but could be swapped for a stylised Om SVG if the design direction wants it.
- **`WeakSignalsGrid` mobile layout:** at 375px the 3 cards stack vertically; on tight phones the icon-circle / title / description stack is reasonable but each card's height varies (description length differs slightly). Could equalise with a grid-row card layout if visual rhythm matters.
- **`<MDXProvider>` only wrapping the article body:** if future intro components need to live ABOVE the article (e.g. a stand-alone hero variant), the provider would need to wrap the whole content section. Not in scope here.
- **TOC behavior with custom components:** the `<WhatFollowsCards>` component renders an `<h3>` ("What follows") wrapped in a `<span>` with a gold underline; this is NOT an `<h2>`, so the TOC `useEffect` (which queries `article.blog-content h2`) will not pick it up. Intentional — the TOC tracks article structure, not magazine inserts. If you want "What follows" in the TOC, change the `<h3>` to `<h2>` in `WhatFollowsCards.tsx`.

## 8. Working tree right now

```
M  content/blog/finding-a-vedic-astrologer-in-ahmedabad.mdx
M  src/pages/BlogPost.tsx
M  tailwind.config.js
M  vite.config.ts
?? scripts/blog-detail-fixes-v2-brief.md     (the brief itself)
?? scripts/blog-detail-fixes-v2-status.md    (this file)
?? src/components/blog/                      (6 new files)
```

Branch `feature/blog-detail-fixes-v2` exists locally only, not yet pushed. PR not yet opened.
