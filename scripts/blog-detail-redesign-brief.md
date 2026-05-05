<<<BEGIN BRIEF>>>

# Blog Detail Page Redesign — Implementation Brief

Branch off main at ef8e7de. Branch name: feature/blog-detail-redesign. Autonomous mode, pre-approved. Stop on any failure. Status report at scripts/blog-detail-redesign-status.md.

## Context

- /blog index page (Blog.tsx) is NOT being changed. Only BlogPost.tsx + supporting infrastructure.
- New design uses a dark navy + gold + cream palette that does not exist in the current Tailwind config. It must be added without touching existing primary/secondary/accent.
- @tailwindcss/typography plugin is not currently installed. Add it with a custom theme variant called blog.
- Existing schema injection (Article, FAQPage, Person), resolvePost function, manifest reading: PRESERVE all of these. Only the JSX render path changes.

## Phase 1 — Infrastructure

### 1.1 Install typography plugin

Run: npm install -D @tailwindcss/typography

### 1.2 Update tailwind.config.js

Two additions to theme.extend:

A. Add color namespace blog:
- navy: #111827
- navy-light: #1E293B
- gold: #F59E0B
- gold-bright: #FBBF24
- red-warm: #B45309
- red-deep: #7C2D12
- cream: #FDF6E3
- cream-soft: #FFF9EE
- ink: #0F172A

B. Add typography variant blog with these CSS vars and selector overrides:
- tw-prose-body: #0F172A
- tw-prose-headings: #0F172A
- tw-prose-lead: #1E293B
- tw-prose-links: #B45309
- tw-prose-bold: #0F172A
- tw-prose-counters: #B45309
- tw-prose-bullets: #F59E0B
- tw-prose-hr: #F59E0B
- tw-prose-quotes: #1E293B
- tw-prose-quote-borders: #F59E0B
- tw-prose-captions: #475569
- tw-prose-code: #7C2D12
- tw-prose-pre-code: #FDF6E3
- tw-prose-pre-bg: #1E293B
- tw-prose-th-borders: #F59E0B
- tw-prose-td-borders: #FBBF24

Element overrides:
- h1: fontFamily Sacramento, fontWeight 400, fontSize 3rem, lineHeight 1.1, letterSpacing -0.01em
- h2: fontFamily Kalam, fontWeight 700, fontSize 2rem, lineHeight 1.2, marginTop 3rem, marginBottom 1rem, borderBottom 2px solid #F59E0B, paddingBottom 0.5rem, display inline-block
- h3: fontFamily Poppins, fontWeight 600, fontSize 1.25rem, lineHeight 1.4, marginTop 2rem, marginBottom 0.75rem
- p: fontFamily Poppins, fontWeight 400, fontSize 1rem, lineHeight 1.75
- blockquote: fontStyle italic, fontFamily Poppins, backgroundColor #FFF9EE, borderLeftWidth 4px, borderLeftColor #F59E0B, padding 1.25rem 1.5rem, borderRadius 0.5rem, position relative
- blockquote p first/last pseudo content: empty string (suppress default quotes)
- table: fontSize 0.95rem
- thead: backgroundColor #1E293B, color #FDF6E3
- thead th: color #FDF6E3, fontWeight 600, padding 0.75rem 1rem
- tbody td: padding 0.75rem 1rem
- tbody tr nth-child odd: backgroundColor #FFF9EE
- a: color #B45309, textDecoration underline, textDecorationColor #F59E0B, textUnderlineOffset 3px
- a hover: color #7C2D12
- ul: paddingLeft 1.5rem
- ul li marker: color #F59E0B
- ol: paddingLeft 1.5rem
- ol li marker: color #B45309, fontWeight 600

Add @tailwindcss/typography to the plugins array.

### 1.3 Validate Phase 1

- npm run build must remain green
- No regressions on home, services, planets/jupiter, zodiac/aries
- grep -rn "—" src/ must return empty

## Phase 2 — Hero Image

### 2.1 Source

User has saved hero at: /Users/saurabhiim/Documents/Antigravity/SIAS-5.0-main/blog-images-folder/saurabh-hero-banner-blog-2.png

### 2.2 Process with sharp

- Resize to 1600x1000 (preserves portrait + zodiac wheel composition)
- Convert to WebP, quality 85
- Save to /tmp/saurabh-hero-banner-blog-2.webp

### 2.3 Upload to R2

Path: Blog/finding-a-vedic-astrologer-in-ahmedabad/hero-banner-v2.webp

Reference scripts/upload-mercury-pillar.mjs for upload pattern. Do NOT overwrite existing hero.webp — this is a new asset alongside it.

### 2.4 Verify

Public URL must return 200 with content-type image/webp:
https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Blog/finding-a-vedic-astrologer-in-ahmedabad/hero-banner-v2.webp

### 2.5 Update MDX frontmatter

Edit content/blog/finding-a-vedic-astrologer-in-ahmedabad.mdx:
- heroImage: full URL to hero-banner-v2.webp
- heroImageAlt: "Saurabh Jain, K.N. Rao Institute trained Vedic astrologer based in Ahmedabad, with cosmic constellations and zodiac wheel"

## Phase 3 — Rewrite BlogPost.tsx

Complete rewrite of the JSX render path. Keep imports for SEOHead, blogManifest, schema-entities, react-router-dom Link, and useParams. Add new imports: useState, useEffect from react; format from date-fns; Calendar, Clock, User, BookOpen, Plus, ChevronDown, Twitter, Facebook, MessageCircle, Link2, Bookmark, ArrowRight, Sparkles from lucide-react.

If lucide-react does not export Sparkles, fall back to Sparkle or Star and surface in status report.

### 3.1 State and effects

Add at top of component body:

const canonicalUrl = `${SITE_ORIGIN}/blog/${resolvedSlug}`;
const [tocItems, setTocItems] = useState([]);
const [copyStatus, setCopyStatus] = useState('idle');

useEffect for TOC generation:
- Query document.querySelectorAll('article.blog-content h2')
- For each heading: extract textContent, slugify (lowercase, replace non-alphanumeric with hyphens, trim leading/trailing hyphens), set the heading's id attribute, push {id, text} to items array
- setTocItems(items) at the end

handleCopyLink:
- async function that calls navigator.clipboard.writeText(canonicalUrl)
- On success: setCopyStatus('copied'), then setTimeout 2000ms to setCopyStatus('idle')
- Wrap in try/catch, swallow errors silently

### 3.2 Layout structure

Outer wrapper: div with className bg-blog-cream-soft

Two main visual blocks: hero (dark navy, full width) and content (cream, two-column).

### 3.3 Hero section

Full-width section with className relative bg-blog-navy py-12 md:py-20 overflow-hidden.

Inside, an absolute-positioned decorative SVG layer at low opacity in the left portion. Use a simple constellation pattern: a few circles and lines on a transparent SVG. Positioned absolute, top-1/2 -translate-y-1/2 left-0, opacity-30, pointer-events-none.

Inside the section, container div with className max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10.

Inside container, grid: grid grid-cols-1 lg:grid-cols-[1fr_500px] gap-8 lg:gap-12 items-center.

LEFT column of grid:

A. Inline breadcrumb (do NOT use existing Breadcrumbs component because it has light-mode-only styling). Render as nav with aria-label Breadcrumb, containing an ol with flex flex-wrap items-center gap-2 text-sm text-blog-cream/70 className. Items:
  - Link to "/" with hover:text-blog-gold transition-colors, text Home
  - Plain "/" separator
  - Link to "/blog" with same hover, text Blog
  - Plain "/" separator
  - Span with text-blog-gold, text fm.category
  - Plain "/" separator
  - Span with text-blog-cream truncate max-w-xs aria-current page, text fm.title

B. Category pill. A div with inline-flex items-center gap-1.5 bg-blog-gold text-blog-navy px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6. Inside: Sparkles icon w-3.5 h-3.5, then span with fm.category text.

C. H1 title. Use className font-sacramento text-blog-cream text-5xl md:text-6xl lg:text-7xl leading-tight mb-4. Render fm.title.

D. Excerpt paragraph. className font-poppins text-blog-cream/80 text-base md:text-lg leading-relaxed mb-6 max-w-2xl. Render fm.excerpt.

E. Meta row. div with flex flex-wrap items-center gap-6 text-blog-cream/70 text-sm. Three child divs each with flex items-center gap-2:
  - Calendar icon w-4 h-4, then span with format(new Date(fm.date), 'MMM dd, yyyy')
  - Clock icon w-4 h-4, then span with "8 min read"
  - User icon w-4 h-4, then span with fm.author or 'Saurabh Jain' fallback

F. Mobile-only hero image. img tag visible only below lg breakpoint. className lg:hidden mt-8 w-full h-auto rounded-2xl shadow-2xl object-cover. src fm.heroImage, alt fm.heroImageAlt or fm.title fallback, width 1600, height 1000, loading eager, fetchpriority lowercase "high".

RIGHT column of grid:

Desktop-only hero image. div with hidden lg:block. Inside, img tag with className w-full h-auto rounded-2xl shadow-2xl object-cover, src fm.heroImage, alt fm.heroImageAlt, width 1600, height 1000, loading eager, fetchpriority lowercase "high".

### 3.4 Content section

Section with className bg-blog-cream-soft py-12 md:py-16.

Container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8.

Grid: grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 lg:gap-12.

LEFT column of grid contains: TOC card, article body, FAQ section, bottom CTA banner.

### 3.5 TOC card

Two variants: desktop visible card, mobile collapsible accordion. Render BOTH conditionally with Tailwind responsive classes.

Desktop variant: div className hidden lg:block bg-blog-cream rounded-2xl border border-blog-gold/30 p-6 mb-8.

Inside:
- Header row with flex items-center gap-2 mb-4: BookOpen icon w-5 h-5 text-blog-gold, span with font-kalam font-bold text-lg text-blog-ink, content "In This Article"
- Two-column grid: grid grid-cols-2 gap-x-6 gap-y-2
- Map tocItems. Each item: anchor a tag with href="#${item.id}" and className flex items-center gap-2 text-blog-ink hover:text-blog-red-warm transition-colors py-1 font-poppins text-sm. Inside: Plus icon w-4 h-4 text-blog-gold, span with item.text.

Mobile variant: details element className lg:hidden bg-blog-cream rounded-2xl border border-blog-gold/30 p-6 mb-8 group.

Inside:
- summary element className flex items-center justify-between cursor-pointer list-none. Inside summary: a div with flex items-center gap-2 containing BookOpen icon and span "In This Article" font-kalam font-bold text-lg text-blog-ink. Then ChevronDown icon w-5 h-5 text-blog-gold transition-transform group-open:rotate-180.
- div mt-4 space-y-2 containing the same map of tocItems. Single column on mobile.

### 3.6 Article body wrapper

article element with className blog-content prose prose-blog max-w-none. Inside: render Content component (the resolved MDX default export).

The blog-content class is just a hook for the useEffect querySelector — it doesn't need any CSS rules of its own.

### 3.7 FAQ section

section with className my-12.

Inside:
- h2 with className font-kalam font-bold text-3xl text-blog-ink mb-6 inline-block border-b-2 border-blog-gold pb-2, content "Frequently Asked Questions"
- div with className space-y-2
- Map fm.faqs. For each entry, render details element with className group border-b border-blog-gold/30 py-4. Inside details:
  - summary with className flex items-center justify-between cursor-pointer list-none. Two children: span with font-poppins font-semibold text-blog-ink text-lg pr-4, content faq.question. Then ChevronDown icon w-5 h-5 text-blog-gold flex-shrink-0 transition-transform group-open:rotate-180.
  - div with className mt-3 text-blog-ink/80 leading-relaxed font-poppins, content faq.answer.

If fm.faqs is undefined or empty, do not render the FAQ section at all.

### 3.8 Bottom CTA banner

section with className my-12 bg-blog-navy rounded-2xl p-8 md:p-12 relative overflow-hidden.

Inside, two layers:

Decorative SVG layer: div with className absolute top-0 right-0 w-48 h-48 opacity-20 pointer-events-none. Inside, an svg with viewBox 0 0 200 200, className w-full h-full. SVG content:
- circle cx 100 cy 100 r 80, no fill, stroke #F59E0B strokeWidth 1, strokeDasharray "2 4"
- circle cx 100 cy 100 r 60, no fill, stroke #F59E0B strokeWidth 0.5
- circle cx 100 cy 100 r 40, no fill, stroke #F59E0B strokeWidth 0.5
- 12 radial lines at angles 0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330. Each line goes from radius 40 to radius 80 around center (100, 100). Compute endpoints with Math.cos and Math.sin of (angle * Math.PI / 180). stroke #F59E0B strokeWidth 0.5.

Content layer: div with className relative z-10. Inside:
- h2 with font-sacramento text-3xl md:text-4xl text-blog-cream mb-3, content "Want a Personalised Astrology Reading?"
- p with text-blog-cream/80 mb-2 font-poppins, content "Get clarity on your life path, challenges, and opportunities."
- p with text-blog-cream/80 mb-6 font-poppins, content "Saurabh Jain, Soul Infinity, K.N. Rao Institute trained, based in Ahmedabad."
- Link to /services/vedic-astrology, className inline-flex items-center gap-2 bg-blog-gold hover:bg-blog-gold-bright text-blog-navy font-semibold px-6 py-3 rounded-full transition-colors. Children: text "Book a Consultation", ArrowRight icon w-4 h-4.

### 3.9 Right sidebar

aside element with className lg:sticky lg:top-24 self-start space-y-6.

Three child blocks: Share widget, Author card, dark CTA card.

### 3.9.1 Share This Article widget

div containing:
- h3 with font-poppins font-semibold text-blog-ink text-lg mb-3, content "Share This Article"
- div with flex items-center gap-3, containing 5 children:

Twitter share. anchor element with:
- href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(canonicalUrl)}&text=${encodeURIComponent(fm.title)}`
- target _blank
- rel noopener noreferrer
- aria-label "Share on Twitter"
- className w-10 h-10 rounded-full bg-blog-gold hover:bg-blog-gold-bright transition-colors flex items-center justify-center
- child Twitter icon w-5 h-5 text-white

Facebook share. anchor element with:
- href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(canonicalUrl)}`
- target _blank
- rel noopener noreferrer
- aria-label "Share on Facebook"
- className same as Twitter
- child Facebook icon w-5 h-5 text-white

WhatsApp share. anchor element with:
- href: `https://wa.me/?text=${encodeURIComponent(fm.title + ' ' + canonicalUrl)}`
- target _blank
- rel noopener noreferrer
- aria-label "Share on WhatsApp"
- className same as Twitter
- child MessageCircle icon w-5 h-5 text-white

Copy link. button element with:
- type button
- onClick handleCopyLink
- aria-label "Copy link"
- className same as Twitter
- child Link2 icon w-5 h-5 text-white

Bookmark. button element with:
- type button
- aria-label "Bookmark"
- className same as Twitter
- child Bookmark icon w-5 h-5 text-white
- No onClick. Visual only for now.

After the button row, conditional copied feedback. If copyStatus is 'copied', render a p with text-blog-red-warm text-xs mt-2 font-poppins, content "Copied!".

### 3.9.2 About the Author card

div with className bg-blog-cream rounded-2xl border border-blog-gold/30 p-5.

Inside:
- h3 with font-poppins font-semibold text-blog-ink mb-4, content "About the Author"
- div with flex items-start gap-4. Two children:
  - img tag, src fm.heroImage, alt "Saurabh Jain", className w-16 h-16 rounded-full object-cover flex-shrink-0 border-2 border-blog-gold
  - div containing: p with font-poppins font-semibold text-blog-ink mb-1, content "Saurabh Jain". Then p with text-sm text-blog-ink/70 leading-relaxed font-poppins, content "Founder, Soul Infinity. Trained at the Bharatiya Vidya Bhavan school of astrology under the late Shri K.N. Rao. Based in Ahmedabad."
- Link to /blog, className block text-center mt-4 px-4 py-2 border border-blog-gold rounded-full text-blog-red-warm hover:bg-blog-gold hover:text-blog-navy transition-colors text-sm font-semibold font-poppins, content "View More Articles"

### 3.9.3 Dark CTA card

div with className bg-blog-navy rounded-2xl p-6 relative overflow-hidden.

Decorative SVG layer: div with className absolute top-0 right-0 w-32 h-32 opacity-20 pointer-events-none. Inside, an svg with viewBox 0 0 200 200, className w-full h-full. SVG content:
- circle cx 100 cy 100 r 80, no fill, stroke #F59E0B strokeWidth 1, strokeDasharray "2 4"
- circle cx 100 cy 100 r 60, no fill, stroke #F59E0B strokeWidth 0.5
- 6 small filled circles at angles 0, 60, 120, 180, 240, 300, each at radius 80 from center. Compute (x, y) the same way as the other SVG. r 3, fill #F59E0B.

Content layer: div with className relative z-10. Inside:
- h3 with font-sacramento text-2xl text-blog-cream mb-2, content "Want Personalised Astrology Guidance?"
- p with text-blog-cream/70 text-sm mb-4 font-poppins, content "Get clarity on your life path, challenges, and opportunities with a personalized reading."
- Link to /services/vedic-astrology, className inline-flex items-center gap-2 bg-blog-gold hover:bg-blog-gold-bright text-blog-navy font-semibold px-5 py-2.5 rounded-full transition-colors text-sm font-poppins. Children: text "Book a Consultation", ArrowRight icon w-4 h-4.

### 3.10 Sections explicitly NOT included

Do NOT render:
- Related Articles widget (only one post in manifest, would be empty)
- Newsletter signup form (no backend)
- Previous/Next post navigation (only one post)
- Tags cloud (deferred)
- Inline mid-article CTAs (deferred)
- Comments section (deferred)
- Build-time TOC anchor extraction via remark plugin (deferred — useEffect approach is sufficient for v1)

### 3.11 Not-found fallback

Keep the existing not-found render (when resolvePost returns null) intact. It can continue using the Breadcrumbs component since it's on a white background.

## Phase 4 — Validation

### 4.1 Build gates (automated)

- npm run build returns exit code 0
- Prerender count is 42 (unchanged from before)
- File dist/blog/finding-a-vedic-astrologer-in-ahmedabad/index.html exists and is non-empty
- View dist/blog/finding-a-vedic-astrologer-in-ahmedabad/index.html source. All three of the following must appear:
  - "@type":"BlogPosting"
  - "@type":"FAQPage"
  - "@type":"Person"
- The new heroImage URL hero-banner-v2.webp must appear in the og:image meta tag of that file
- grep -n "—" content/blog/finding-a-vedic-astrologer-in-ahmedabad.mdx must return empty
- grep -rn "—" src/ must return empty
- /sitemap.xml in dist still contains the post URL
- /llms.txt in dist still contains the post URL
- New hero R2 URL returns 200 with image/webp content-type

### 4.2 Acceptable known limitation

The useEffect-based TOC anchor generation is client-side only. The prerendered HTML will NOT have h2 IDs; they're added on mount. This is acceptable for v1. Surface this in the status report under follow-ups, with a recommendation to migrate to a build-time remark plugin in a future PR. Do NOT block the PR on this.

### 4.3 Visual gates (require Vercel preview, surface in PR description)

Note the following items in the PR body for human verification on the Vercel preview:
- Hero: navy background, breadcrumb in cream/gold, gold pill with sparkle icon, Sacramento title, Poppins excerpt, meta row with three icons, hero image on right (desktop) or below text (mobile)
- TOC card visible on desktop with two-column links, accordion on mobile
- H2 headings render in Kalam Bold with gold underline
- H3 headings render in Poppins
- Body text in Poppins
- Blockquotes have parchment background and gold left border
- Sidebar sticks while scrolling on desktop
- Share buttons visible, 5 circular gold icons
- Twitter/Facebook/WhatsApp share dialogs open in new tabs with correct URL/title
- Copy link button copies canonical URL and shows "Copied!" feedback
- Author card renders with portrait, bio, View More Articles button
- Dark CTA sidebar card has cosmic SVG pattern at low opacity
- FAQ accordion items expand/collapse with native details/summary
- Bottom CTA banner has navy background, gold button, decorative SVG in top-right
- Mobile (375px): hero image stacks below text, TOC collapsed as accordion, sidebar moves below main content
- Console: no errors, no warnings about missing icon exports

### 4.4 Regression gates

- /blog index page renders correctly. Blog.tsx is untouched. Visual check via Vercel preview.
- /, /services, /planets/jupiter, /zodiac/aries: all render without visual regression. Existing primary, secondary, accent Tailwind tokens still resolve.

## Phase 5 — Commit, Push, PR

### 5.1 Single commit

Commit message body:

feat(blog): redesign detail page with full visual treatment

- Add dark navy + gold + cream theme to tailwind.config.js (blog namespace, additive)
- Install @tailwindcss/typography plugin with custom 'blog' variant
- Rewrite BlogPost.tsx: hero, TOC, sidebar, FAQ accordion, dual CTAs
- Add new hero banner image to R2 (hero-banner-v2.webp)
- Update Ahmedabad post frontmatter to point at new hero
- Auto-generate H2 anchors via useEffect for TOC navigation

### 5.2 Push

git push -u origin feature/blog-detail-redesign

### 5.3 Open PR

gh pr create --base staging --head feature/blog-detail-redesign --title "feat(blog): redesign detail page with full visual treatment"

PR body:
- Bullet summary of the 5 phases
- Note that Blog.tsx index page is intentionally untouched
- Note that this PR has no dependencies on other open PRs
- Visual gate checklist (copy from Phase 4.3) for the human reviewer to walk through on the Vercel preview

### 5.4 Stop

Wait for Vercel preview build, capture URL. STOP. Do not merge to staging or main.

## Phase 6 — Status Report

Write scripts/blog-detail-redesign-status.md with these sections:

1. Phase 1 outcome:
   - @tailwindcss/typography version installed
   - tailwind.config.js change summary (blog namespace added, blog typography variant added)
   - Build result before vs after

2. Phase 2 outcome:
   - sharp processing input dimensions and file size
   - sharp processing output dimensions and file size
   - R2 upload public URL
   - HTTP status of the public URL
   - content-type returned

3. Phase 3 outcome:
   - BlogPost.tsx line count before vs after
   - List of new sections rendered (hero, TOC desktop, TOC mobile, article body wrapper, FAQ, bottom CTA, sidebar Share, sidebar Author, sidebar Dark CTA)
   - Any deviations from the brief (icon name substitutions, etc.)

4. Phase 4 outcome:
   - Each automated build gate result with pass/fail
   - Visual gates: list as "requires Vercel preview verification"
   - Regression gates: result

5. Phase 5 outcome:
   - Branch name, commit hash, push status
   - PR URL
   - Vercel staging preview URL

6. Follow-ups (do NOT action, just document):
   - Read time calculation: currently hardcoded to "8 min read". Should be computed from word count.
   - TOC anchor extraction: currently useEffect at runtime. Should migrate to build-time remark plugin so anchors are present in prerendered HTML for SEO.
   - Per-post hero image generation pipeline via ChatGPT (manual today).
   - /blog index OG image: should auto-update to most recent post hero (currently hardcoded).
   - llms.txt: requires manual edit per new post. Should auto-discover from blog-manifest.json.

## Failure Protocol

If any phase fails: STOP, write failure details to scripts/blog-detail-redesign-status.md, do not autonomously fix. Surface for review.

<<<END BRIEF>>>