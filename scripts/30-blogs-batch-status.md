# 30 Blogs Batch — Build Status

**Branch:** `feature/30-blogs-batch`
**Commit SHA:** `c6ed38679e401acfbedb095373591c66a7dd3add`
**Date:** 2026-06-14
**Status:** Built and pushed. Not merged.

---

## Files Created (30)

| # | Date | Slug | Hero |
|---|---|---|---|
| 01 | 2026-06-15 | reiki-vs-pranic-healing | HEALING |
| 02 | 2026-06-16 | rohini-nakshatra-female | NAKSHATRA |
| 03 | 2026-06-17 | rohini-nakshatra-male | NAKSHATRA |
| 04 | 2026-06-18 | rohini-nakshatra-padas | NAKSHATRA |
| 05 | 2026-06-19 | mangal-dosha-cancellation-rules | ASTRO |
| 06 | 2026-06-20 | rohini-nakshatra-gemstone | NAKSHATRA |
| 07 | 2026-06-21 | krishna-rohini-nakshatra-janmashtami | NAKSHATRA |
| 08 | 2026-06-22 | saturn-mahadasha-antardasha-effects | ASTRO |
| 09 | 2026-06-23 | sade-sati-2026-2027-rashi-effects | ASTRO |
| 10 | 2026-06-24 | jupiter-retrograde-2026 | ASTRO |
| 11 | 2026-06-25 | career-growth-vedic-astrology | ASTRO |
| 12 | 2026-06-26 | rohini-nakshatra-compatibility | NAKSHATRA |
| 13 | 2026-06-27 | what-is-bnn-astrology-explained | ASTRO |
| 14 | 2026-06-28 | kp-astrology-vs-parashari | ASTRO |
| 15 | 2026-06-29 | moon-in-1st-house-vedic-astrology | NAKSHATRA |
| 16 | 2026-06-30 | rahu-in-7th-house-vedic-astrology | ASTRO |
| 17 | 2026-07-01 | theta-healing-vs-reiki | HEALING |
| 18 | 2026-07-02 | past-life-regression-what-to-expect | HEALING |
| 19 | 2026-07-03 | ashwini-nakshatra-complete-guide | NAKSHATRA |
| 20 | 2026-07-04 | pushya-nakshatra-complete-guide | NAKSHATRA |
| 21 | 2026-07-05 | ketu-in-12th-house-vedic-astrology | ASTRO |
| 22 | 2026-07-06 | crystal-healing-guide-which-crystals | HEALING |
| 23 | 2026-07-07 | ashtakavarga-explained-vedic-astrology | ASTRO |
| 24 | 2026-07-08 | astro-vastu-planetary-home-energy | ASTRO |
| 25 | 2026-07-09 | how-to-read-kundli-beginners-guide | ASTRO |
| 26 | 2026-07-10 | rahu-ketu-transit-2025-2026 | ASTRO |
| 27 | 2026-07-11 | pranic-healing-anxiety-depression | HEALING |
| 28 | 2026-07-12 | tarot-card-reading-vedic-astrology | ASTRO |
| 29 | 2026-07-13 | reiki-for-physical-pain-healing | HEALING |
| 30 | 2026-07-14 | 27-nakshatras-complete-guide | NAKSHATRA |

**Note:** File 11 (`career-growth-vedic-astrology.mdx`) overwrote a pre-existing file with the same slug. The old content was replaced with the new content from the master brief.

---

## Validation Results

| Check | Expected | Actual |
|---|---|---|
| New files written | 30 | 30 |
| `grep -rn "—" content/blog/*.mdx` (after fix) | empty | empty (exit 1) |
| `npm run build` | pass | **pass** |
| Total prerendered routes | 95 | 95 |

---

## Build Output

```
Prerendered 95 routes.
```

This is 95 routes total (up from 66 before this batch). The 29-route increase reflects the 30 new MDX files minus 1 overwrite of an existing slug.

---

## Side-effects During Build

1. **Frontmatter schema mismatch** — Brief specified `publishedAt:` and nested `author:` block; project's `generate-blog-manifest.mjs` expects `date:` and flat `author:` string. Resolved with `perl -i` global rewrite across the 30 new files.

2. **Em-dashes in sade-sati file** — 4 H3 headers in `sade-sati-2026-2027-rashi-effects.mdx` contained ` — ` separators. Resolved with `perl -i` substitution to `: `.

3. **Two pre-existing files clobbered briefly** — `can-ai-do-vedic-astrology.mdx` and `saturn-karma-two-souls.mdx` had both `publishedAt:` (legacy) and `date:` fields. The global perl rewrite created duplicate `date:` keys. Resolved by `git checkout` to restore originals; these were not target files anyway.

---

## Critical Rules — Verified

- [x] No em-dashes (`grep -rn "—" content/blog/*.mdx` returns empty)
- [x] No Gujarati script
- [x] No emojis in content or headings
- [x] All Sanskrit uses Devanagari + IAST + English where present
- [x] Max 1 shloka per post (none exceeded)
- [x] Paragraphs are 3-5 sentences max
- [x] No medical, financial, or legal guarantees
- [x] All prices route to WhatsApp CTA, no numbers shown
- [x] Word count minimum 1,200 met per post
- [x] Primary keyword in H1, meta title, meta description, first paragraph
- [x] Exactly 5 FAQ questions per post (stored in `faqs:` frontmatter array)

---

## Frontmatter Format Used (after correction)

```yaml
---
title: "..."
slug: "..."
excerpt: "..."
heroImage: "..."
heroImageAlt: "..."
date: "YYYY-MM-DD"
author: "Saurabh Jain"
category: "..."
readTime: "X min read"
faqs:
  - question: "..."
    answer: "..."
---
```

The `faqs:` field is preserved but is not yet rendered by the BlogPost template (which uses MDX body content only). Future template work can surface the FAQ array as a structured FAQPage schema and visible accordion on each post.

---

## Placeholder Images Used

All 30 posts use one of three placeholder R2 URLs:

- **ASTRO_HERO:** `https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Blog/shani-jayanti/hero-banner.webp`
- **NAKSHATRA_HERO:** `https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Nakshatra/Rohini/hero-banner-rohini.webp`
- **HEALING_HERO:** `https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Nakshatra/Rohini/vedic-remedies-bg-rohini.webp`

Daily image swaps as real banners are generated per the master brief.

---

## Next Steps

1. **Open PR** from `feature/30-blogs-batch` → `staging` for review
2. **Visual QA** on a few representative posts via staging deploy preview
3. **Merge to staging**, then promote to `main` per project workflow
4. **Begin daily image swap** as real banners are produced for each topic
5. **Add per-post Article + FAQPage JSON-LD schema** by updating the MDX render template to consume the `faqs:` frontmatter

---

## PR URL

https://github.com/saurabh-bits-pilani/SIAS-6.0/pull/new/feature/30-blogs-batch
