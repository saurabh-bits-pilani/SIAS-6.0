# Surya Page Redesign v2 — Reuse-First Brief

## Core Principle
**Reuse every existing component before building anything new.**
This brief maps each section of the new mockup to existing code in the repo.
Only build what genuinely does not exist yet.

---

## Step 0 — Read These Files First

Before touching SuryaPage.tsx, read these files in order:

```bash
# 1. Find the Surya page
find src -name "*urya*" -o -name "*sun*" | grep -v node_modules

# 2. Find ALL existing planet pages to audit reusable patterns
find src/pages/planets -name "*.tsx" | grep -v node_modules

# 3. Find all shared components
find src/components -name "*.tsx" | grep -v node_modules | sort

# 4. Read the canonical templates
cat src/pages/planets/MoonPage.tsx
cat src/pages/planets/JupiterPage.tsx
cat src/pages/planets/SuryaPage.tsx
```

---

## Component Reuse Map

For each section in the mockup, here is what to reuse vs build.

### SECTION 1 — Hero (full-bleed, planet art top-right, text top-left)

**Reuse**: The hero pattern from `MoonPage.tsx` or `JupiterPage.tsx` exactly.
- Same CSS structure: dark bg, absolute-positioned planet image right side
- Same font-caveat for "Surya" title and "The Radiant Sun" subtitle
- Same breadcrumb component (already in all planet pages)

**Only change**:
- Title text → `Surya`
- Subtitle → `The Radiant Sun`  
- Description → `The source of light, life, and consciousness.`
- Highlight spans on `soul`, `vitality`, `purpose` — wrap each in:
  `<span className="bg-amber-900/30 text-amber-300 px-2 py-0.5 rounded-sm">soul</span>`
- Planet image → existing Surya hero art already in R2:
  `https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Pillar/Planets/Sun/` (check what exists)

---

### SECTION 2 — Attributes Bar (5 icons: Soul, Vitality, Power, Purpose, Consciousness)

**Reuse**: Check if any planet page already has an attributes/keywords bar.
- Jupiter page likely has a "themes" row — reuse that pattern
- If no bar exists: it is a simple flex row — copy the TL;DR aside pattern from the overnight sprint template and adapt it horizontally

**Structure** (one row, full width, dark bg):
```tsx
// Reuse whatever icon component pattern already exists in the page
// These are inline SVG icons already used across planet pages
const attributes = [
  { icon: <SunIcon />, label: 'Soul', sub: 'Atman' },
  { icon: <HeartIcon />, label: 'Vitality', sub: 'Energy' },
  { icon: <CrownIcon />, label: 'Power', sub: 'Authority' },
  { icon: <TargetIcon />, label: 'Purpose', sub: 'Dharma' },
  { icon: <EyeIcon />, label: 'Consciousness', sub: 'Awakening' },
]
```
Use whatever SVG icons are already imported in the existing SuryaPage.tsx.

---

### SECTION 3 — Three-Column Card Row

**Reuse**: The planet card grid pattern from `PlanetsPage.tsx` (the hub).
- Same parchment background: `planet-card-bg.webp` (upload per planets-page-redesign.md)
- Same card border: `border border-amber-200/60 rounded-xl`

Three cards:

**Card A — Sacred Mantra** (left, tall):
- Reuse the "Friends/Enemies table" card wrapper pattern from the overnight sprint
- Mantra text box: reuse the dark-bg bordered box used for Sanskrit shlokas on existing pages
  - Dark bg `bg-[#0d1628]`, gold border `border border-amber-700/50`, rounded, padding
  - Devanagari in `font-noto-serif-devanagari` (already loaded)
  - IAST transliteration in italic below
  - "Meaning:" label in Caveat/italic, body text below

**Card B — Surya in Our Life** (center):
- Reuse the key-value list pattern — already used in planet pages for Day/Direction/Metal etc.
- Each row: small icon left (reuse existing inline SVGs) + "Key: Value" text
- Data:
  ```
  Day: Sunday (Ravivar)
  Direction: East
  Element: Fire
  Metal: Gold, Copper
  Gemstone: Ruby (Manik)
  Color: Red, Golden
  Dosha Influence: Pitta
  Guna: Sattva, Rajas
  Body Part: Eyes, Heart, Bones
  Life Area: Father, Authority, Confidence
  ```

**Card C — Connect with Surya** (right, dark):
- Reuse the CTA card pattern from existing planet pages (the dark card with button)
- Dark bg `bg-[#0d1628]`, gold border
- Caveat font title
- Body paragraph
- Existing outlined amber button component → "Explore Surya Remedies →" → href `/services`

---

### SECTION 4 — How to Connect with Surya (dark full-width card)

**Reuse**: The "How to connect" / remedies section pattern — check if MoonPage or SaturnPage has a similar 5-step grid.
- Dark bg section, Caveat font heading
- 5 items in a flex row
- Each item: numbered (01–05), gold circle, icon above, text below

Steps:
```
01 Offer water to the rising Sun
02 Chant Surya mantras  
03 Wear Ruby on Sunday
04 Do Surya Namaskar at sunrise
05 Serve father and respected elders
```

Icons: reuse inline SVGs already in the codebase (water drop, Om, gem, yoga, hands).

---

### SECTION 5 — Gemstone: Ruby (split card)

**Reuse**: Check if any planet page has a gemstone section already.
- Jupiter → Yellow Sapphire, Saturn → Blue Sapphire — if yes, reuse that exact component
- Split layout: image left (~40%), bullet list right (~60%)
- Parchment bg card
- Ruby image → check R2: `Pillar/Planets/Sun/gemstone-ruby.webp`
  If missing, upload a ruby image or use a placeholder styled div

Benefits:
```
★ Increases vitality and energy
★ Enhances confidence and leadership  
★ Supports heart and circulatory health
```
Link: "Learn more →" → `/services/vedic-astrology/gem-stone`

---

### SECTION 6 — Affirmation Banner (full-width dark, large italic quote)

**Reuse**: The "Remember" / affirmation block already exists on `PlanetsPage.tsx`:
```
"You are not your planets. You are beyond them."
```
Reuse that exact dark-bg banner component. Change:
- Label: `Affirmation`
- Quote: `"I am a radiant being of light, filled with purpose and power."`
- Keep Caveat font, gold color, centered
- Keep decorative sun SVG left, mountain outline right (if present)

---

### SECTION 7 — Explore All Navagrahas Strip

**Reuse**: This strip is essentially the planet cards from `PlanetsPage.tsx` in a horizontal scroll.
- Reuse the same planet image URLs already used on the hub:
  `https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Pillar/Hub/Planets/hero-{planet}.webp`
- Wrap in `overflow-x-auto` flex row with prev/next arrow buttons
- Current planet (Surya) gets amber ring: `ring-2 ring-amber-400`
- Each chip: circular image 64px, Sanskrit name bold, English name muted below

```tsx
const navagrahas = [
  { name: 'Surya', sanskrit: 'सूर्य', href: '/planets/sun', img: 'hero-surya.webp' },
  { name: 'Chandra', sanskrit: 'चंद्र', href: '/planets/moon', img: 'hero-chandra.webp' },
  { name: 'Mangal', sanskrit: 'मंगल', href: '/planets/mars', img: 'hero-mangala.webp' },
  { name: 'Budha', sanskrit: 'बुध', href: '/planets/mercury', img: 'hero-budha.webp' },
  { name: 'Guru', sanskrit: 'गुरु', href: '/planets/jupiter', img: 'hero-guru.webp' },
  { name: 'Shukra', sanskrit: 'शुक्र', href: '/planets/venus', img: 'hero-shukra.webp' },
  { name: 'Shani', sanskrit: 'शनि', href: '/planets/saturn', img: 'hero-shani.webp' },
  { name: 'Rahu', sanskrit: 'राहु', href: '/planets/rahu', img: 'hero-rahu.webp' },
  { name: 'Ketu', sanskrit: 'केतु', href: '/planets/ketu', img: 'hero-ketu.webp' },
]
```

---

### SECTION 8 — FAQ + Sidebar (two-column layout)

**Left column — FAQ (accordion)**:
**Reuse**: The existing FAQ section with `<h3>` questions — already on SuryaPage.tsx (and all planet pages from the overnight sprint). The overnight sprint added FAQ questions in `<h3>` tags. Keep that structure, just expand content.

Wrap each FAQ item in a simple accordion:
```tsx
// Reuse whatever accordion/details pattern exists
// If none: use native <details><summary> — no new library needed
<details className="border-b border-amber-200/40 py-4">
  <summary className="font-semibold text-lg cursor-pointer">
    Who is Surya in Vedic Astrology?
  </summary>
  <p className="mt-3 text-gray-700">...</p>
</details>
```

FAQ questions (all 4):
1. Who is Surya in Vedic Astrology?
2. What does the Sun represent in a birth chart?
3. What is the significance of Sun in the 12 Houses?
   → Include 12-house mini grid (3-col, small text, numbered 01–12)
4. Sun's Dasha: Confidence, Destinations, and Relationships

Decorative feather quill image left of each question — reuse if already present on page.
Use `https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Pillar/Hub/Planets/` and check for a quill asset.

**Right column — Info Cards (accordion sidebar)**:
**Reuse**: The Friends/Enemies table sidebar pattern from the overnight sprint — already exists on planet pages as stacked info cards. Convert to accordion style (collapsed by default, expand on click).

7 cards, each collapses/expands:
```tsx
const sidebarCards = [
  { title: 'Zodiac Sign', icon: '♌', content: 'Rules Leo (Simha Rashi)' },
  { title: 'Exalted (Uchcha)', icon: '☀', content: 'Aries (10°)' },
  { title: 'Debilitated (Neecha)', icon: '⚖', content: 'Libra (10°)' },
  { title: 'Best Time', icon: '🌅', content: 'Sunrise, Sunday, Shukla Paksha' },
  { title: 'Drishti (Aspect)', icon: '👁', content: '7th aspect (Like Saturn)' },
  {
    title: 'When Surya is balanced',
    content: 'A person shines with confidence, wisdom, and a sense of purpose. Their life becomes a source of inspiration for others.',
  },
  {
    title: 'When Surya is afflicted',
    content: 'It can lead to ego issues, health issues, authority conflicts, and lack of clarity.',
  },
]
```
Note: No emojis in JSX — use inline SVG icons instead of the emoji placeholders above.

---

### SECTION 9 — Footer CTA Banner

**Reuse**: Existing footer CTA from current SuryaPage.tsx — just update text:
- Heading (Caveat font): `"Let the light within you rise."`
- Subheading: `"Embrace the energy of Surya and live with clarity, purpose and power."`
- Button: `"Explore Personalized Remedies →"` → `/contact`
- Keep dark bg, lotus/feather decoration

---

## What is Genuinely NEW (does not exist anywhere)

Only these need to be built from scratch:

| New Element | Effort |
|---|---|
| Attributes Bar (5-icon row) | Small — flex row with inline SVGs |
| Highlighted word spans in hero description | Tiny — just wrap words in `<span>` |
| 12-house grid inside FAQ | Small — CSS grid, numbered items |
| Navagraha horizontal strip with prev/next | Medium — useState for scroll position |
| Accordion sidebar cards | Small — `<details>` or useState toggle |

Everything else is a **reuse or text change**.

---

## Data Object — Add at Top of SuryaPage.tsx

```tsx
const suryaData = {
  attributes: [
    { label: 'Soul', sub: 'Atman' },
    { label: 'Vitality', sub: 'Energy' },
    { label: 'Power', sub: 'Authority' },
    { label: 'Purpose', sub: 'Dharma' },
    { label: 'Consciousness', sub: 'Awakening' },
  ],
  lifeAttributes: [
    { key: 'Day', value: 'Sunday (Ravivar)' },
    { key: 'Direction', value: 'East' },
    { key: 'Element', value: 'Fire' },
    { key: 'Metal', value: 'Gold, Copper' },
    { key: 'Gemstone', value: 'Ruby (Manik)' },
    { key: 'Color', value: 'Red, Golden' },
    { key: 'Dosha Influence', value: 'Pitta' },
    { key: 'Guna', value: 'Sattva, Rajas' },
    { key: 'Body Part', value: 'Eyes, Heart, Bones' },
    { key: 'Life Area', value: 'Father, Authority, Confidence' },
  ],
  mantras: [
    {
      label: '1. Mantra for Daily Surya Sadhana',
      devanagari: 'ॐ घृणि सूर्याय नमः । ॐ आदित्याय विदृहे भास्कराय धीमहि । तन्नो सूर्यः प्रचोदयात् ॥',
      iast: 'om ghrini suryaya namah | om adityaya vidrihe bhaskarayaa dhiimahi | tanno suryah prachodayat ||',
      meaning: 'We meditate upon the radiant energy of Surya (the Sun), who dispels darkness and ignorance. May that divine light awaken and guide our intellect.',
    },
    {
      label: '2. Gayatri Mantra for Surya',
      devanagari: 'ॐ सूर्याय विदृहे महाद्युतिकाय धीमहि । तन्नो आदित्यः प्रचोदयात् ॥',
      iast: 'om suryaya vidrihe mahadyutikaya dhimahi | tanno adityah prachodayat ||',
      meaning: 'Salutations to the divine Sun, the witness of all that is.',
    },
  ],
  connectSteps: [
    { num: '01', label: 'Offer water to\nthe rising Sun' },
    { num: '02', label: 'Chant Surya\nmantras' },
    { num: '03', label: 'Wear Ruby\non Sunday' },
    { num: '04', label: 'Do Surya Namaskar\nat sunrise' },
    { num: '05', label: 'Serve father\nand respected elders' },
  ],
  gemstone: {
    name: 'Ruby',
    imgUrl: 'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Pillar/Planets/Sun/gemstone-ruby.webp',
    benefits: [
      'Increases vitality and energy',
      'Enhances confidence and leadership',
      'Supports heart and circulatory health',
    ],
  },
  navagrahas: [
    { name: 'Surya', sanskrit: 'सूर्य', href: '/planets/sun', img: 'hero-surya.webp', current: true },
    { name: 'Chandra', sanskrit: 'चंद्र', href: '/planets/moon', img: 'hero-chandra.webp' },
    { name: 'Mangal', sanskrit: 'मंगल', href: '/planets/mars', img: 'hero-mangala.webp' },
    { name: 'Budha', sanskrit: 'बुध', href: '/planets/mercury', img: 'hero-budha.webp' },
    { name: 'Guru', sanskrit: 'गुरु', href: '/planets/jupiter', img: 'hero-guru.webp' },
    { name: 'Shukra', sanskrit: 'शुक्र', href: '/planets/venus', img: 'hero-shukra.webp' },
    { name: 'Shani', sanskrit: 'शनि', href: '/planets/saturn', img: 'hero-shani.webp' },
    { name: 'Rahu', sanskrit: 'राहु', href: '/planets/rahu', img: 'hero-rahu.webp' },
    { name: 'Ketu', sanskrit: 'केतु', href: '/planets/ketu', img: 'hero-ketu.webp' },
  ],
  sidebarCards: [
    { title: 'Zodiac Sign', content: 'Rules Leo (Simha Rashi)', expandable: true },
    { title: 'Exalted (Uchcha)', content: 'Aries (10°)', expandable: true },
    { title: 'Debilitated (Neecha)', content: 'Libra (10°)', expandable: true },
    { title: 'Best Time', content: 'Sunrise, Sunday, Shukla Paksha', expandable: true },
    { title: 'Drishti (Aspect)', content: '7th aspect (Like Saturn)', expandable: true },
    { title: 'When Surya is balanced', content: 'A person shines with confidence, wisdom, and a sense of purpose. Their life becomes a source of inspiration for others.', expandable: true },
    { title: 'When Surya is afflicted', content: 'It can lead to ego issues, health issues, authority conflicts, and lack of clarity.', expandable: true },
  ],
}

const R2 = 'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev'
const PLANET_HUB = `${R2}/Pillar/Hub/Planets`
const PLANET_SUN = `${R2}/Pillar/Planets/Sun`
```

---

## Image Checklist — Run This First

```bash
source ~/.zshrc

# Check what Sun assets exist in R2
wrangler r2 object list soul-infinity-space-assets --prefix "Pillar/Planets/Sun/"

# Check hub assets
wrangler r2 object list soul-infinity-space-assets --prefix "Pillar/Hub/Planets/"
```

If `gemstone-ruby.webp` is missing, upload:
```bash
# Find a ruby image in assets folder or download a free one
wrangler r2 object put soul-infinity-space-assets/Pillar/Planets/Sun/gemstone-ruby.webp \
  --file /path/to/ruby-image.jpg
```

---

## Hard Rules

- No em-dashes — use commas or "and"
- `fetchpriority` lowercase only
- No emojis in JSX — inline SVG icons only
- All Sanskrit text followed by IAST transliteration and English meaning
- No new npm packages — zero new imports outside what already exists
- Self-contained single `.tsx` file
- `npm run build` must pass with zero errors before pushing
- Feature branch only: `feature/surya-page-redesign`
- Never push to `main`

---

## Git Commands

```bash
git checkout -b feature/surya-page-redesign
git add src/pages/planets/SuryaPage.tsx
git commit -m "feat: Surya page redesign — reuse-first, editorial layout with mantras, attributes, gemstone, FAQ, sidebar"
git push origin feature/surya-page-redesign
```
