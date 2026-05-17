# Planets Page Redesign — Claude Code Task Brief

## Objective
Redesign `/planets` hub page to match the look and feel of `/zodiac` page.
Three new assets replace the current hero bg, main page bg, and planet card bg.

---

## Step 1 — Upload Assets to R2 (Do This First)

Assets are in:
```
/Users/saurabhiim/Documents/Antigravity/SIAS-5.0-main/assets-to-upload/Planets/
├── hero-banner-planets-page.png
├── planet-card-bg.png
└── planet-main-page-bg.png
```

Run in terminal:

```bash
source ~/.zshrc
cd /Users/saurabhiim/Documents/Antigravity/SIAS-5.0-main/assets-to-upload/Planets

# Convert to WebP via sips (macOS)
sips -s format jpeg hero-banner-planets-page.png --out hero-banner-planets-page.jpg
sips -s format jpeg planet-card-bg.png --out planet-card-bg.jpg
sips -s format jpeg planet-main-page-bg.png --out planet-main-page-bg.jpg

# Upload to R2
wrangler r2 object put soul-infinity-space-assets/Pillar/Hub/Planets/hero-banner-planets-page.webp --file hero-banner-planets-page.jpg
wrangler r2 object put soul-infinity-space-assets/Pillar/Hub/Planets/planet-card-bg.webp --file planet-card-bg.jpg
wrangler r2 object put soul-infinity-space-assets/Pillar/Hub/Planets/planet-main-page-bg.webp --file planet-main-page-bg.jpg
```

R2 public base: `https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev`

Final URLs after upload:
- `https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Pillar/Hub/Planets/hero-banner-planets-page.webp`
- `https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Pillar/Hub/Planets/planet-card-bg.webp`
- `https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Pillar/Hub/Planets/planet-main-page-bg.webp`

---

## Step 2 — File to Edit

Find and open the planets hub page file:
```bash
find src -name "*lanet*" | grep -v node_modules
```
Expected: `src/pages/PlanetsPage.tsx` or similar.

**Reference files for patterns:**
- Zodiac hub: `src/pages/ZodiacPage.tsx` — copy hero image pattern exactly
- Planet card component: look for the component rendering the 9 Navagraha cards

---

## Step 3 — Code Changes

### Change 1: Hero Section Background

**Current pattern** — two stacked absolute `<img>` tags used as hero background:
```tsx
<img src="...bg-nebula-overlay.webp" ... />
<img src="...layer.webp" ... />
```
Also: the interactive orbit animation sits on top of these background layers.

**New pattern** — single full-width banner image, same as zodiac page hero:
```tsx
<div className="relative w-full">
  <img
    src="https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Pillar/Hub/Planets/hero-banner-planets-page.webp"
    alt="The nine Navagraha planets of Vedic Astrology"
    className="w-full object-cover"
    fetchpriority="high"
  />
</div>
```

- Remove `bg-nebula-overlay.webp` img tag
- Remove `layer.webp` img tag from hero (keep the one at the bottom CTA if present)
- Keep the breadcrumb, heading, subheading text — place them BELOW the banner image, not overlaid on it (match zodiac page layout)

---

### Change 2: Main Page Background

The main content wrapper (the section containing the planet cards grid, prose sections, and CTA) needs the new cosmic background.

Find the outer section/div wrapping the main content body. Add inline style:

```tsx
<section
  style={{
    backgroundImage: `url('https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Pillar/Hub/Planets/planet-main-page-bg.webp')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center top',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
  }}
>
```

If `backgroundAttachment: 'fixed'` causes mobile issues, remove it and use `scroll`.

---

### Change 3: Planet Card Background

Each of the 9 Navagraha cards currently has a dark semi-transparent background.

Find the card wrapper (look for `planet-card`, `graha-card`, or the `<a>` / `<div>` wrapping each planet's name, subtitle, and "Explore →").

Replace the background with the parchment texture:

```tsx
style={{
  backgroundImage: `url('https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Pillar/Hub/Planets/planet-card-bg.webp')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}}
```

**Because the card bg is now light parchment, update text colors on cards:**

| Element | Old color | New color |
|---|---|---|
| Planet Sanskrit name (e.g. सूर्य) | gold/white | `text-amber-800` |
| Planet English name (e.g. Surya) | white | `text-gray-900` |
| Subtitle (e.g. "Soul, power, consciousness") | light gray | `text-gray-700` |
| Description line | light gray | `text-gray-600` |
| "Explore →" link | gold | `text-amber-700 hover:text-amber-900` |
| Card border | dark border | `border border-amber-300` |

Remove any `bg-black/40`, `bg-gray-900`, `backdrop-blur` classes from the card wrapper.

---

## Step 4 — Deploy to Staging Only

```bash
git checkout -b feature/planets-page-redesign
git add src/pages/PlanetsPage.tsx
git commit -m "feat: planets page hero, bg, and card redesign to match zodiac page"
git push origin feature/planets-page-redesign
```

**NEVER push directly to `main`.** Push to `feature/*` branch only.
Staging auto-deploys at: `staging.cornerhouse.co.in` — wait, wrong project.
Soul Infinity staging is via Vercel preview URL on the feature branch.

---

## Reference: What Zodiac Page Does (Match This Pattern)

From live `/zodiac` page:
1. Full-width hero `<img>` at very top — no text overlay on the image
2. Heading + Sanskrit shloka + CTA button BELOW the image in a clean white/light section
3. Breadcrumb below hero, not inside it
4. Cards in a responsive grid — each card has illustration, Sanskrit name, English name, date range, element, ruling planet, short description, "Explore →" link
5. No animated backgrounds — clean and fast

The planets page should follow this exact structure. The orbit animation in the current hero can be removed or relocated.

---

## Hard Rules (Do Not Break)

- No em-dashes anywhere in content — use commas or "and"
- `fetchpriority` must be lowercase (not `fetchPriority`)
- No emojis in JSX/content
- All Sanskrit followed by IAST transliteration + English meaning
- Keep file self-contained — no new imports that could break Vercel build
- Test Vercel build locally before pushing: `npm run build`
