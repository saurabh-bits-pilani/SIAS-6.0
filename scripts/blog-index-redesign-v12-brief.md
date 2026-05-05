# Blog Index Redesign v12 — Magazine-Style /blog Landing Page

Branch off latest origin/main (post v11). New branch: feature/blog-index-redesign-v12. Target staging. Single clean PR off main, NOT stacked.

Autonomous. Halt only on hard build failures. Status doc: scripts/blog-index-redesign-v12-status.md.

## v12 goal

Replace the existing /blog index page (currently a simple list rendered from blog-manifest.json) with a magazine-style landing page matching the approved mockup: dark navy hero with eyebrow + two-line headline (one line gold script) + body + 4 feature pills, featured post card on the right, "Latest Articles" section title with category filter pills, 4-column post card grid (responsive), trust strip CTA at the bottom.

## Architecture decision

The current /blog page is rendered by src/pages/Blog.tsx, which already imports src/data/blog-manifest.json. v12 redesigns Blog.tsx visually while keeping the same data source. NO changes to BlogPost.tsx (the detail page).

Future-proofing: the layout must work with 1 post (current state) AND with 4+ posts (future state). With only 1 post, the post appears as both Featured AND as a grid card until more posts exist. With 2+ posts, the most recent becomes Featured and the rest fill the grid.

## Hard rules (apply throughout v12)

1. NO em-dashes anywhere. Use commas, "and", "such as", colons, semicolons.
2. NO JSX comment placeholders like {/* ... */} in any component or in Blog.tsx. Write JSX directly. JSX comments rendering as visible text was the bug from a previous attempt.
3. NO Gujarati script in any string.
4. NO emojis in code.
5. fetchpriority lowercase only.

## Components to build

All new components in src/components/blog/. Each is self-contained, props-driven, has zero internal state unless explicitly noted.

### File: src/components/blog/BlogIndexHero.tsx

Dark navy hero block with two-column layout: text on the left, featured post card on the right.

Props:
- eyebrow: string
- titleLine1: string
- titleLine2: string
- body: string
- features: array of { icon: LucideIcon, label: string } (4 entries)
- featuredPost: object with { slug, title, excerpt, heroImage, heroImageAlt, category, publishedAt, readTime }

Layout:
- Outer wrapper: section className "bg-blog-navy text-blog-cream py-12 md:py-20 relative overflow-hidden"
- Decorative motifs at low opacity (absolute positioning, pointer-events-none):
  - Top-right: Sun lucide w-40 h-40 absolute top-8 right-8 text-blog-gold/10
  - Top-left: Flower2 lucide w-32 h-32 absolute top-12 left-12 text-blog-gold/10
  - Three small Sparkles lucide at w-3 h-3 text-blog-gold/40 in scattered absolute positions (top-1/4 left-1/3, top-3/4 right-1/4, top-1/2 left-1/4 for example)
- Inner container: max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center relative z-10

LEFT column:
- Eyebrow pill: inline-flex items-center gap-2 mb-4 bg-blog-gold/15 border border-blog-gold/30 rounded-full px-4 py-1.5
  - Sparkles lucide w-3.5 h-3.5 text-blog-gold
  - eyebrow text: font-poppins text-blog-gold text-sm font-medium
- Title line 1 (h1): font-poppins font-bold text-4xl md:text-5xl lg:text-6xl text-blog-cream leading-tight
- Title line 2 (span block inside h1): font-caveat italic text-4xl md:text-6xl lg:text-7xl text-blog-gold leading-tight block mt-1
- Body: font-poppins text-blog-cream/80 text-base md:text-lg leading-relaxed mt-5 max-w-xl
- Features row: grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-2xl
  - Each feature: flex flex-col items-center text-center gap-2
    - Icon circle: w-12 h-12 bg-blog-gold/15 border border-blog-gold/30 rounded-xl flex items-center justify-center
      - feature.icon inside, w-5 h-5 text-blog-gold
    - Label: font-poppins text-blog-cream/85 text-xs md:text-sm leading-tight

RIGHT column:
- Render the BlogFeaturedPost component with the featuredPost prop

### File: src/components/blog/BlogFeaturedPost.tsx

Featured post card rendered prominently in the hero right column.

Props: post (manifest entry) with all standard fields.

Layout:
- Outer wrapper: Link from react-router-dom, to={`/blog/${post.slug}`}, className "block group relative bg-blog-cream-soft rounded-2xl overflow-hidden border border-blog-gold/20 hover:border-blog-gold/50 transition-colors"
- Featured badge (absolute top-4 left-4 z-10):
  - inline-flex items-center gap-1.5 bg-blog-gold/95 backdrop-blur-sm rounded-full px-3 py-1
  - Star lucide w-3.5 h-3.5 text-blog-navy
  - Text "Featured": font-poppins text-blog-navy text-xs font-bold uppercase tracking-wide
- Image wrapper: aspect-[16/10] w-full overflow-hidden bg-blog-navy
  - img tag: src={post.heroImage}, alt={post.heroImageAlt || post.title}, className "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105", loading="lazy"
- Content area: p-6 md:p-7
  - Category pill: inline-flex items-center bg-blog-cream border border-blog-gold/40 rounded-full px-3 py-1 mb-3
    - text content: post.category (default "Vedic Astrology" if missing)
    - className: font-poppins text-blog-gold text-xs font-semibold
  - Title (h2): font-poppins font-bold text-blog-ink text-xl md:text-2xl leading-tight mb-3 group-hover:text-blog-navy transition-colors
  - Excerpt: font-poppins text-blog-ink/70 text-sm md:text-base leading-relaxed mb-4 line-clamp-3
  - Meta row: flex items-center gap-4 text-blog-ink/60 text-xs mb-5
    - Calendar lucide w-3.5 h-3.5 followed by formatted date span
    - Dot separator: span with text-blog-ink/40 content "•"
    - Clock lucide w-3.5 h-3.5 followed by readTime span (default "8 min read")
  - Read button: inline-flex items-center gap-2 bg-blog-gold hover:bg-blog-gold-bright text-blog-navy px-5 py-2.5 rounded-full font-semibold font-poppins text-sm transition-colors
    - Text: "Read Full Article"
    - ArrowRight lucide w-4 h-4

Date formatting helper: format publishedAt (YYYY-MM-DD string) as "MMM DD, YYYY". Example: "2026-05-04" then "May 04, 2026". Implement as a small inline function inside the component or as a shared util in src/lib/date.ts. If util file doesn't exist, inline is fine.

### File: src/components/blog/BlogCategoryFilter.tsx

Pill-style category filter row.

Props:
- categories: array of string
- activeCategory: string
- onSelect: (category: string) => void

Layout:
- Container: flex flex-wrap justify-center gap-3 my-8
- Each pill is a button, type="button", onClick={() => onSelect(category)}
  - Base className: "px-5 py-2 rounded-full font-poppins text-sm font-semibold transition-colors"
  - When active (activeCategory === category): append "bg-blog-navy text-blog-cream"
  - When inactive: append "bg-blog-cream-soft border border-blog-gold/30 text-blog-ink hover:border-blog-gold/60"

### File: src/components/blog/BlogCard.tsx

Standard post card used in the grid.

Props: post (manifest entry).

Layout:
- Outer: Link from react-router-dom, to={`/blog/${post.slug}`}, className "group block bg-blog-cream-soft rounded-2xl overflow-hidden border border-blog-gold/20 hover:border-blog-gold/50 hover:-translate-y-1 transition-all duration-300"
- Image wrapper: aspect-[16/10] w-full overflow-hidden bg-blog-navy relative
  - img: src={post.heroImage}, alt={post.heroImageAlt || post.title}, className "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105", loading="lazy"
  - Category overlay pill: absolute top-3 left-3
    - inline-flex items-center bg-blog-cream/95 backdrop-blur-sm rounded-full px-3 py-1
    - className: font-poppins text-blog-gold text-xs font-semibold
    - content: post.category
- Content: p-5
  - Meta row: flex items-center gap-3 text-blog-ink/60 text-xs mb-3
    - Calendar lucide w-3 h-3 followed by formatted publishedAt
    - Dot separator
    - Clock lucide w-3 h-3 followed by post.readTime
  - Title (h3): font-poppins font-bold text-blog-ink text-base md:text-lg leading-snug mb-2 group-hover:text-blog-navy transition-colors line-clamp-2
  - Excerpt: font-poppins text-blog-ink/70 text-sm leading-relaxed mb-4 line-clamp-3
  - Read more row: inline-flex items-center gap-1 text-blog-gold font-semibold text-sm font-poppins
    - Text: "Read More"
    - ArrowRight lucide w-3.5 h-3.5 transition-transform group-hover:translate-x-1

Use the same date formatting helper as BlogFeaturedPost.

### File: src/components/blog/BlogGrid.tsx

Grid wrapper for BlogCard.

Props: posts (array of manifest entries).

Layout:
- Container: grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6
- If posts.length === 0:
  - Render empty state: div className "col-span-full text-center py-12 font-poppins text-blog-ink/60"
  - Inside: text "No articles in this category yet. Check back soon."
- Else: map posts, render BlogCard for each, with key={post.slug}

### File: src/components/blog/BlogTrustCTA.tsx

Bottom strip-style CTA banner.

Props:
- title: string
- body: string
- buttonText: string
- buttonHref: string
- trustText: string

Layout:
- Outer wrapper: bg-blog-cream-soft border border-blog-gold/30 rounded-2xl p-5 md:p-6 my-12 md:my-16 flex flex-col md:flex-row items-center gap-5 md:gap-8 relative overflow-hidden
- Decorative Flower2 lucide absolute top-3 right-3 w-12 h-12 text-blog-gold/10 pointer-events-none
- LEFT block (icon + text): flex items-start gap-4 flex-1
  - Icon circle: w-14 h-14 flex-shrink-0 bg-blog-gold rounded-full flex items-center justify-center
    - Inside: Flower2 lucide w-7 h-7 text-white
  - Text wrapper:
    - title (h3): font-poppins font-bold text-blog-ink text-lg md:text-xl mb-1
    - body (p): font-poppins text-blog-ink/75 text-sm md:text-base leading-relaxed
- CENTER (button): Link from react-router-dom, to={buttonHref}, className "inline-flex items-center gap-2 bg-blog-gold hover:bg-blog-gold-bright text-blog-navy px-6 py-3 rounded-full font-semibold font-poppins text-sm md:text-base transition-colors flex-shrink-0"
  - buttonText
  - ArrowRight lucide w-4 h-4
- RIGHT (trust strip): flex items-center gap-3 flex-shrink-0
  - Avatar group wrapper: div className "flex -space-x-2"
    - Three child divs, each: w-8 h-8 rounded-full bg-blog-gold/30 border-2 border-blog-cream-soft flex items-center justify-center
      - Inside each: User lucide w-4 h-4 text-blog-gold
  - trustText: font-poppins text-blog-ink/70 text-xs md:text-sm

## Blog.tsx complete rewrite

Replace the entire contents of src/pages/Blog.tsx with this exact code. Do NOT add JSX comment placeholders. Do NOT introduce em-dashes.

```tsx
import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { BookOpen, Star, Sparkles, Users, Sun } from 'lucide-react';
import blogManifest from '../data/blog-manifest.json';
import BlogIndexHero from '../components/blog/BlogIndexHero';
import BlogCategoryFilter from '../components/blog/BlogCategoryFilter';
import BlogGrid from '../components/blog/BlogGrid';
import BlogTrustCTA from '../components/blog/BlogTrustCTA';

const FEATURE_PILLS = [
  { icon: BookOpen, label: 'Authentic Knowledge' },
  { icon: Star, label: 'Practical Guidance' },
  { icon: Sparkles, label: 'Spiritual Growth' },
  { icon: Users, label: 'Community Wisdom' }
];

const CATEGORIES = [
  'All Articles',
  'Vedic Astrology',
  'Spirituality',
  'Panchang & Muhurat',
  'Remedies',
  'Lifestyle'
];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All Articles');

  const sortedPosts = useMemo(() => {
    const posts = (blogManifest as any).posts || [];
    return [...posts].sort((a: any, b: any) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }, []);

  const featuredPost = sortedPosts[0];

  const remainingPosts = sortedPosts.length === 1
    ? sortedPosts
    : sortedPosts.slice(1);

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'All Articles') return remainingPosts;
    return remainingPosts.filter((p: any) => p.category === activeCategory);
  }, [activeCategory, remainingPosts]);

  if (!featuredPost) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center font-poppins">
        <h1 className="text-3xl font-bold text-blog-ink mb-3">Blog</h1>
        <p className="text-blog-ink/70">No posts published yet. Check back soon.</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Blog | Soul Infinity</title>
        <meta name="description" content="Practical guides, timeless knowledge, and spiritual insights from Soul Infinity. Learn about Vedic astrology, spirituality, panchang, and remedies." />
        <link rel="canonical" href="https://www.soulinfinity.space/blog" />
        <meta property="og:title" content="Blog | Soul Infinity" />
        <meta property="og:description" content="Vedic Wisdom for Modern Seekers." />
        <meta property="og:image" content={featuredPost.heroImage} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.soulinfinity.space/blog" />
      </Helmet>

      <BlogIndexHero
        eyebrow="Insights. Wisdom. Guidance."
        titleLine1="Vedic Wisdom for"
        titleLine2="Modern Seekers"
        body="Practical guides, timeless knowledge, and spiritual insights to help you navigate life with clarity and purpose."
        features={FEATURE_PILLS}
        featuredPost={featuredPost}
      />

      <section className="max-w-7xl mx-auto px-4 mt-12 md:mt-16">
        <div className="text-center mb-2">
          <Sparkles className="w-4 h-4 mx-auto text-blog-gold mb-2" />
          <div className="flex items-center justify-center gap-3">
            <Sparkles className="w-5 h-5 text-blog-gold" />
            <h2 className="font-caveat italic text-3xl md:text-5xl text-blog-gold">
              Latest Articles
            </h2>
            <Sparkles className="w-5 h-5 text-blog-gold" />
          </div>
          <p className="font-poppins text-blog-ink/70 text-sm md:text-base mt-2">
            Dive deeper into the world of spiritual wisdom and cosmic insights
          </p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="h-px w-16 bg-blog-gold/40" />
            <Sun className="w-4 h-4 text-blog-gold" />
            <div className="h-px w-16 bg-blog-gold/40" />
          </div>
        </div>

        <BlogCategoryFilter
          categories={CATEGORIES}
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />

        <BlogGrid posts={filteredPosts} />

        <BlogTrustCTA
          title="Looking for personalized guidance?"
          body="Book a consultation with Saurabh Jain and get clarity on your life's journey."
          buttonText="Book Your Consultation"
          buttonHref="/services/vedic-astrology"
          trustText="Trusted by 500+ seekers"
        />
      </section>
    </>
  );
}
```

After writing this file, verify:
- grep -n "—" src/pages/Blog.tsx must be empty (no em-dashes)
- grep -c "{/\*" src/pages/Blog.tsx must be 0 (no JSX comment placeholders)

## Manifest schema update

The current src/data/blog-manifest.json (generated by scripts/generate-blog-manifest.mjs) likely does NOT include category and readTime fields. Update both the generator and the post.

Step 1: Edit scripts/generate-blog-manifest.mjs. In the loop where each .mdx frontmatter is read, add these fields to the per-post object that gets written to the manifest:
- category: frontmatter.category || "Vedic Astrology"
- readTime: frontmatter.readTime || "8 min read"

Step 2: Edit content/blog/finding-a-vedic-astrologer-in-ahmedabad.mdx. In the YAML frontmatter block at the top of the file, add these two lines (anywhere in the frontmatter, before the closing ---):
- category: "Vedic Astrology"
- readTime: "8 min read"

Step 3: If a TypeScript type definition exists for the blog manifest in src/types/blog.ts or src/data/blog-manifest.d.ts, update it to include the new fields:
- category?: string
- readTime?: string

Step 4: Run npm run build:blog-manifest to regenerate src/data/blog-manifest.json. Verify the new fields appear in the output for the Ahmedabad post entry.

## SSR safety check

Blog.tsx must be SSR-compatible. Check:
- No window or document access in any new component
- No useEffect that reads from window without a typeof window !== 'undefined' guard
- All Link tags from react-router-dom (not anchor tags)
- All Helmet tags inside react-helmet-async

If any component breaks prerender, halt and fix with isomorphic guards.

## Validation gates

Run all of these. If any fails, STOP and write the failure to the status doc.

Gate 1: npm run build must complete green with zero errors.

Gate 2: Prerender count = 42 (unchanged from before v12).

Gate 3: dist/blog/index.html must contain all of these strings:
- "Vedic Wisdom for"
- "Modern Seekers"
- "Insights. Wisdom. Guidance."
- "Authentic Knowledge"
- "Latest Articles"
- "All Articles"
- "Looking for personalized guidance?"

Gate 4: The featured post must render in dist/blog/index.html:
- title text "How to Find a Genuine Vedic Astrologer in Ahmedabad"
- heroImage URL appears at least once

Gate 5: Six category filter buttons render. Verify with:
- grep -o "All Articles\|Vedic Astrology\|Spirituality\|Panchang\|Remedies\|Lifestyle" dist/blog/index.html | sort -u | wc -l must be 6

Gate 6: grep -n "—" src/pages/Blog.tsx must be empty.

Gate 7: grep -rn "—" src/components/blog/BlogIndexHero.tsx src/components/blog/BlogFeaturedPost.tsx src/components/blog/BlogCategoryFilter.tsx src/components/blog/BlogCard.tsx src/components/blog/BlogGrid.tsx src/components/blog/BlogTrustCTA.tsx must be empty.

Gate 8: grep -c "{/\*" src/pages/Blog.tsx must be 0. NO JSX comment placeholders.

Gate 9: grep -rc "{/\*" src/components/blog/BlogIndexHero.tsx src/components/blog/BlogFeaturedPost.tsx src/components/blog/BlogCategoryFilter.tsx src/components/blog/BlogCard.tsx src/components/blog/BlogGrid.tsx src/components/blog/BlogTrustCTA.tsx must all be 0.

Gate 10: dist/blog/index.html title tag must NOT contain an em-dash. Run:
- grep -o '<title>[^<]*</title>' dist/blog/index.html
- The result must NOT contain "—"
- Expected exact result: <title>Blog | Soul Infinity</title>

Gate 11: dist/blog/index.html must NOT contain rendered JSX comment text. Run:
- grep -c "{/\*" dist/blog/index.html must be 0
- grep -c "Section title block" dist/blog/index.html must be 0

Gate 12: No regressions on other routes. All of these must still render in dist/:
- dist/index.html (homepage)
- dist/services/index.html
- dist/planets/jupiter/index.html
- dist/zodiac/aries/index.html
- dist/blog/finding-a-vedic-astrologer-in-ahmedabad/index.html (the detail page must be UNCHANGED in terms of rendered content; BlogPost.tsx was not touched in v12)

Gate 13: Build does NOT produce duplicate export or duplicate binding errors.

## Visual gates (require Vercel preview spot-check after PR opens)

- Hero: dark navy with eyebrow pill, two-line title (line 2 in gold Caveat italic), body, 4 feature pills below, featured post card on the right with image + Featured badge + category pill + title + excerpt + meta + Read button.
- Latest Articles section title with Caveat italic gold text + Sparkles flanking + sun divider.
- Category filter row: 6 pills, "All Articles" active in dark navy, others in cream with gold border.
- Grid: with only 1 post total, the post appears as both Featured AND in the grid (per the sortedPosts.length === 1 fallback in Blog.tsx).
- TrustCTA: cream wrapper with gold icon circle, title, body, gold button, three avatar placeholder circles, "Trusted by 500+ seekers" text.
- Mobile (375px viewport): hero stacks (text top, featured card below), feature pills 2-col, grid 1-col, CTA stacks vertically.
- Console: no React warnings, no missing key warnings.
- Page source: title tag should read exactly "Blog | Soul Infinity" with NO em-dash.
- Page source: search for "{/* " must return zero matches. No JSX comment placeholders rendering as text.
- Page source: search for "Section title block" must return zero matches.

## Commit + PR + Ship

Single commit:
"feat(blog): magazine-style /blog index page redesign

- Build BlogIndexHero with dark navy two-column hero
- Build BlogFeaturedPost card with hero image and Featured badge
- Build BlogCategoryFilter pill-style category filter
- Build BlogCard for grid items with image, meta, excerpt, Read More
- Build BlogGrid responsive 4-col grid with empty state
- Build BlogTrustCTA bottom strip with avatar placeholders
- Rewrite Blog.tsx to use the new components, add Latest Articles section with sun divider
- Update generate-blog-manifest.mjs to include category and readTime fields
- Update Ahmedabad post frontmatter with category and readTime"

Push: git push -u origin feature/blog-index-redesign-v12

PR: gh pr create --base staging --head feature/blog-index-redesign-v12 --title "feat(blog): magazine-style /blog index redesign"

Wait for Vercel preview build, capture URL.

Merge PR to staging:
gh pr merge <pr-number> --merge --delete-branch=false

Sleep 90 seconds, verify staging Vercel build success.

Open staging-to-main PR:
gh pr create --base main --head staging --title "Promote v12: blog index redesign"

Merge staging-to-main PR:
gh pr merge <pr-number> --merge --delete-branch=false

Sleep 90 seconds, verify production Vercel build success.

## Production verification

Run all of these checks against the live production URL.

curl -s https://www.soulinfinity.space/blog -o /tmp/blog-index-prod.html

Then run these grep checks:
- grep -c "Vedic Wisdom for" /tmp/blog-index-prod.html (must be at least 1)
- grep -c "Modern Seekers" /tmp/blog-index-prod.html (must be at least 1)
- grep -c "Latest Articles" /tmp/blog-index-prod.html (must be at least 1)
- grep -c "Insights. Wisdom. Guidance." /tmp/blog-index-prod.html (must be at least 1)
- grep -c "{/\*" /tmp/blog-index-prod.html (must be 0)
- grep -c "Section title block" /tmp/blog-index-prod.html (must be 0)
- grep -o '<title>[^<]*</title>' /tmp/blog-index-prod.html (must read exactly: <title>Blog | Soul Infinity</title> with NO em-dash)

If any of these fail on production, STOP and write failure details to the status doc. Do NOT auto-fix.

## Status report

Write scripts/blog-index-redesign-v12-status.md with these sections:

1. Component files (list with line counts):
   - src/components/blog/BlogIndexHero.tsx
   - src/components/blog/BlogFeaturedPost.tsx
   - src/components/blog/BlogCategoryFilter.tsx
   - src/components/blog/BlogCard.tsx
   - src/components/blog/BlogGrid.tsx
   - src/components/blog/BlogTrustCTA.tsx

2. Blog.tsx diff summary: lines removed, lines added, total final line count.

3. generate-blog-manifest.mjs diff summary: which fields were added.

4. Frontmatter changes to content/blog/finding-a-vedic-astrologer-in-ahmedabad.mdx: which fields added.

5. Validation gate results: 13 gates, pass or fail with notes.

6. Visual gate notes from Vercel preview spot-check.

7. Production deployment timestamp and main HEAD commit hash.

8. Production verification results (the curl + grep block above).

9. Any lucide icon fallbacks used.

10. Followups for future work:
    - Real avatar testimonials to replace placeholder circles
    - Second blog post needed to populate the grid naturally
    - readTime should be computed from word count instead of hardcoded
    - Per-category landing pages (e.g. /blog/category/vedic-astrology) when more posts exist
    - Pagination when post count exceeds ~12

## Failure protocol

Any merge conflict: STOP, report which PR and the conflict, do not force-merge.
Any Vercel deployment failure: STOP, capture error, do not proceed.
Any validation gate fail: STOP, write failure to status doc, do not proceed.
Any em-dash check fail: STOP, fix em-dash, re-run gates, do not commit until clean.
Any JSX comment placeholder rendering as visible text: STOP, remove placeholder, replace with real JSX or remove entirely, re-run gates.
SSR breakage on prerender: STOP, identify the offending component, fix client-only code with isomorphic guards.
Production verification fail: STOP, write failure to status doc, do not auto-rollback (manual decision).
