# Soul Infinity — Nakshatra Page Build Reference
# Created: June 2026
# Based on: RohiniNakshatraPage.tsx (first nakshatra page built)
# Use this file to build any future nakshatra page in 1 session

---

## WHAT THIS DOCUMENT IS

Complete reference for building a nakshatra detail page on soulinfinity.space.
The Rohini page took multiple sessions and $200+ to build due to iteration.
Follow this guide exactly and any new nakshatra page should cost under $20.

---

## WORKFLOW (follow this order strictly)

1. Generate images using Nano Banana (prompts below)
2. Convert to WebP using Squoosh.app (size limits below)
3. Upload to R2 via Claude Code
4. Verify all URLs return HTTP 200
5. Run the page build brief (template below)
6. Review on staging
7. If scroll text misaligned, adjust padding values only (do not change layout)
8. Merge to main
9. Add card to Blog.tsx

---

## IMAGE REQUIREMENTS (per nakshatra)

4 images total. All must be WebP before upload.

| Image | Filename | Size | Max KB | Purpose |
|---|---|---|---|---|
| Hero banner | hero-banner-[rashi].webp | 1600x600 | 300 KB | Full-width hero, no text overlay |
| Quick facts | quick-facts-[rashi].webp | 1400x400 | 250 KB | Infographic strip shown in right sidebar |
| Scroll/story | scroll-[rashi].webp | 1200x800 | 250 KB | Parchment scroll for Story section |
| Remedies bg | vedic-remedies-bg-[rashi].webp | 1400x900 | 300 KB | Dark bg for remedies section, text overlaid right side |

### Nano Banana prompts

**Hero banner (1600x600):**
```
Cinematic wide banner for [NAKSHATRA] nakshatra in Vedic astrology. 
[SYMBOL/ANIMAL] in dramatic [ELEMENT] elemental setting. Cosmic [COLOR] 
background with constellation patterns. Dark edges suitable for text overlay. 
Ultra detailed, professional astrology website banner style. No text in image.
```

**Quick facts strip (1400x400):**
```
Dark cosmic infographic banner for [NAKSHATRA] Nakshatra Quick Facts. 
Seven columns with labels: Nakshatra, Sign, Span, Lord, Deity, Symbol, Guna. 
Each column has a glowing circular icon with value below. [COLOR] cosmic 
atmosphere. Gold script title "[NAKSHATRA] Nakshatra Quick Facts" at top.
```

**Parchment scroll (1200x800):**
```
Ancient Vedic parchment scroll, aged paper texture, horizontal format. 
[NAKSHATRA SYMBOL] at top center. Small [ANIMAL/SYMBOL] sketch bottom right. 
Decorative border. LARGE EMPTY CENTER AREA - leave center completely empty 
for text overlay. Warm candlelight ambient lighting. No text in center area.
```

**Vedic remedies background (1400x900):**
```
Dark cosmic temple background with warm amber lighting. Moon, lotus flowers, 
brass diya lamp, pearl mala visible on LEFT side. RIGHT 55% of image must be 
EMPTY DARK SPACE for text overlay. [COLOR] cosmic atmosphere at edges. 
Devotional, warm, ancient Indian aesthetic.
```

---

## R2 UPLOAD

Bucket: `soul-infinity-space-assets`
Public base: `https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev`
Path pattern: `/Nakshatra/[EnglishName]/`

### Claude Code upload command:
```
Read .env.local for R2 credentials.
Upload all 4 WebP files from [local folder] to:
s3://soul-infinity-space-assets/Nakshatra/[EnglishName]/
content-type: image/webp
cache-control: public, max-age=31536000, immutable
Verify each with curl -I. All must return HTTP 200. Report URLs. Stop.
```

---

## PAGE STRUCTURE (10 sections, match MeshaRashiPage.tsx)

Route: `/nakshatra/[slug]`
File: `src/pages/nakshatra/[Name]NakshatraPage.tsx`

**CRITICAL: Copy MeshaRashiPage.tsx as base. Change ONLY content and accent color.**

### Section order:
1. Hero banner (full width image, no text overlay, torn edge SVG at bottom)
2. Quick facts strip (image in right sidebar only, NOT full width strip)
3. Two-column about (55% cards left, 45% sticky sidebar right)
4. Mantra section (dark warm bg #2A1810, Devanagari + IAST + meaning + badge)
5. Characteristics (strengths card + challenges card, two columns)
6. 12 houses grid (4x3 desktop, each with number badge + house name + description)
7. Story section (scroll image with text overlaid inside parchment area)
8. Vedic remedies (remedies bg image with dark overlay, 7 rows right-aligned)
9. FAQ accordion (5 questions, amber left border, chevron toggle)
10. CTA banner (amber-to-cream gradient, book consultation button)

---

## COLOR RULES (non-negotiable)

- Page background: #FAF6EC (warm cream)
- Card background: #FFF9ED (soft parchment)
- Primary accent: #D4A11E (antique gold/amber)
- Dark sections bg: #2A1810 (warm dark brown — NEVER navy or black)
- Primary text: #2A2438 (deep ink)
- Secondary text: #5C4A2A (warm brown ink)
- Strengths header: warm muted green (#d1fae5 bg, #065f46 text)
- Challenges header: #fee2e2 bg, #991b1b text
- Sanskrit text: #8B1A1A (deep vermillion) in font-devanagari class
- Scroll text: #3d2810 (dark brown ink on parchment)
- CTA gradient: linear-gradient(135deg, #D4A11E 0%, #F5EFD9 100%)

**NEVER USE: #0E1A36, #1e3a8a, navy blue, cold dark tones**

---

## FONTS

| Class | Font | Use for |
|---|---|---|
| font-kalam | Kalam 700 | Section headings, house names |
| font-caveat | Caveat | Script accents, footer quotes, CTA title |
| font-poppins | Poppins | Body text, UI elements, buttons |
| font-devanagari | Noto Serif Devanagari | All Sanskrit/Devanagari text |

---

## R2 CONSTANTS (top of file — ALWAYS inline, never import)

```tsx
const HERO_IMAGE        = 'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Nakshatra/[Name]/hero-banner-[rashi].webp';
const QUICK_FACTS_IMAGE = 'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Nakshatra/[Name]/quick-facts-[rashi].webp';
const SCROLL_IMAGE      = 'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Nakshatra/[Name]/scroll-[rashi].webp';
const REMEDIES_BG       = 'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Nakshatra/[Name]/vedic-remedies-bg-[rashi].webp';
```

---

## CRITICAL SECTION IMPLEMENTATIONS

### Story section (scroll with text overlay) — THIS CAUSED MOST PROBLEMS

The scroll image has a large empty parchment area. Text must be overlaid
INSIDE that area using absolute positioning with carefully tuned padding.

```tsx
<section className="py-12 bg-[#FAF6EC]">
  <div className="max-w-4xl mx-auto px-4">
    <h2 className="font-kalam text-3xl text-[#2A2438] mb-6 text-center">
      The Story of [Nakshatra]
    </h2>
    <div className="relative">
      <img
        src={SCROLL_IMAGE}
        alt="Ancient Vedic parchment scroll"
        width={1200}
        height={800}
        className="w-full rounded-2xl shadow-lg"
        loading="lazy"
      />
      <div
        className="absolute inset-0 flex items-start"
        style={{ padding: '15% 48% 28% 20%' }}
      >
        <div>
          <p className="font-kalam text-sm text-[#3d2810] leading-relaxed mb-2">
            [First paragraph — short, 2-3 sentences max]
          </p>
          <p className="font-poppins text-xs text-[#5C3A1A] leading-relaxed mb-2">
            [Second paragraph — short, 2-3 sentences max]
          </p>
          <p className="font-caveat text-xs text-[#8B4513] italic">
            [Closing line — one sentence]
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
```

**Padding values explained:**
- Top 15%: clears top border decoration and crescent/symbol
- Right 48%: keeps text away from animal/symbol illustration on right
- Bottom 28%: clears bottom border decoration
- Left 20%: margin from left scroll border

**If text overflows scroll area:** increase right and bottom padding values.
**If text too far from left:** decrease left padding value.
**Keep text SHORT** — 3 short paragraphs maximum, each 2-3 sentences.
**Text colors must be dark warm browns** — no white, no amber on parchment.

### Remedies section — right-aligned text on dark image

```tsx
<section className="relative min-h-[600px] py-16">
  <img src={REMEDIES_BG} alt="" className="absolute inset-0 w-full h-full object-cover" aria-hidden="true" loading="lazy" />
  <div className="absolute inset-0 bg-black/50" />
  <div className="relative z-10 max-w-6xl mx-auto px-4">
    <h2 className="font-kalam text-3xl text-[#D4A11E] text-center mb-2">[Title]</h2>
    <p className="font-poppins text-white/60 text-xs text-center mb-10 uppercase tracking-widest">[Subtitle]</p>
    <div className="max-w-2xl ml-auto space-y-5">
      {REMEDIES.map((r, i) => (
        <div key={i} className="flex gap-4 items-start border-b border-white/10 pb-5">
          <span className="font-caveat text-2xl text-[#D4A11E] w-10 flex-shrink-0">
            {String(i + 1).padStart(2, '0')}
          </span>
          <div>
            <p className="font-poppins text-white font-semibold text-base mb-1">{r.main}</p>
            <p className="font-poppins text-white/60 text-sm leading-relaxed">{r.sub}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

**Key: `max-w-2xl ml-auto` pushes all text to RIGHT half of section**
This matches where the dark empty space is in the remedies image.

---

## VALIDATION GATES (run before every commit)

```bash
grep -n "—" src/pages/nakshatra/[Name]NakshatraPage.tsx  # must be empty
npm run build                                              # must pass
grep -c '"@type":"Article"' dist/nakshatra/[slug]/index.html  # >= 1
grep -c '"@type":"FAQPage"' dist/nakshatra/[slug]/index.html  # >= 1
grep -c "<h1" dist/nakshatra/[slug]/index.html            # must equal 1
```

---

## WIRING (4 files to update)

```tsx
// src/App.tsx
const [Name]NakshatraPage = lazy(() => import('./pages/nakshatra/[Name]NakshatraPage'));
<Route path="/nakshatra/[slug]" element={<[Name]NakshatraPage />} />

// scripts/prerender.mjs ROUTES array
'/nakshatra/[slug]'

// scripts/generate-sitemap.mjs
'/nakshatra/[slug]'

// scripts/generate-llms.mjs DESCRIPTIONS
'/nakshatra/[slug]': '[Description of nakshatra page]'
```

---

## BLOG LISTING CARD

After page is live on main, add card to src/pages/Blog.tsx.
Copy the SHANI_JAYANTI_CARD pattern exactly.

```tsx
const [NAME]_NAKSHATRA_CARD = {
  href: '/nakshatra/[slug]',
  title: '[Title]',
  excerpt: '[Excerpt under 160 chars]',
  heroImage: 'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Nakshatra/[Name]/hero-banner-[rashi].webp',
  heroImageAlt: '[Alt text]',
  category: 'Vedic Astrology',
  publishedAt: '[Date]',
  readTime: '[X] min read',
};
```

Card image must have:
```tsx
style={{ height: '200px' }}
className="w-full object-cover object-top"
```

---

## ROHINI NAKSHATRA — COMPLETED REFERENCE

Route: `/nakshatra/rohini`
File: `src/pages/nakshatra/RohiniNakshatraPage.tsx`
Merged to main: June 2026
Accent color: #D4A11E (amber)

R2 URLs (all verified HTTP 200):
- Hero: https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Nakshatra/Rohini/hero-banner-rohini.webp
- Quick facts: https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Nakshatra/Rohini/quick-facts-rohini.webp
- Scroll: https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Nakshatra/Rohini/cow-bg-card.webp
- Remedies: https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Nakshatra/Rohini/vedic-remedies-bg-rohini.webp

SVGs (all in /Nakshatra/Rohini/SVG/ — available but not used on page):
hero-frame, section numbers 01-03, pullquote-frame, yoga-card-frame,
washi tapes (amber/cream/pink), highlights (yellow/amber), doodle-moon-stars,
scroll-frame-rohini, doodle-rohini-constellation, dividers (lotus/om/stars),
title-rohini-handwritten, author-signature

Scroll padding that worked: '15% 48% 28% 20%'

---

## LESSONS LEARNED FROM ROHINI BUILD

1. ALWAYS copy MeshaRashiPage.tsx as base — do not build from scratch
2. Scroll text overlay padding needs tuning per image — start with '15% 48% 28% 20%'
3. Keep scroll story text SHORT — 3 paragraphs, 2-3 sentences each
4. Remedies text: use max-w-2xl ml-auto to push to right half of dark image
5. Never use dark navy or black backgrounds — always #2A1810 for dark sections
6. Quick facts image goes in RIGHT SIDEBAR only, not as full-width strip
7. SVG decorators from R2 are fragile — use lucide-react icons as fallback
8. Each Claude Code session costs $15-25 for a page this size — plan carefully
9. Always stop before merging to main — review on staging first
10. Fresh Claude Code session is always cheaper than continuing a $100+ session

---

## NEXT NAKSHATRA PAGES TO BUILD

Priority order based on search volume:

| # | Nakshatra | Sign | Lord | Search Volume | Color |
|---|---|---|---|---|---|
| 1 | Ashwini | Aries | Ketu | High | Red #dc2626 |
| 2 | Pushya | Cancer | Saturn | Very High | Blue #1e40af |
| 3 | Hasta | Virgo | Moon | High | Green #16a34a |
| 4 | Chitra | Virgo/Libra | Mars | High | Silver #6b7280 |
| 5 | Revati | Pisces | Mercury | Medium | Teal #0f766e |
| 6 | Uttara Phalguni | Leo/Virgo | Sun | Medium | Gold #d97706 |

---

## END OF REFERENCE
