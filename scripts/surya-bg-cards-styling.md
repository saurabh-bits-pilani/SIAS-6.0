# Surya Page — Background & Card Styling Brief

## Goal
Two targeted changes to `SunPage.tsx`:
1. Apply `sun-strip-bg.webp` to all dark sections
2. Restyle light cards to match the Aries zodiac card pattern

No structural changes. No content changes. Styling only.

---

## Step 1 — Upload Asset to R2 First

```bash
source ~/.zshrc
cd /Users/saurabhiim/Documents/Antigravity/SIAS-5.0-main/assets-to-upload/Planets/Sun

# Convert PNG to JPG
sips -s format jpeg sun-strip-bg.png --out sun-strip-bg.jpg

# Upload to R2
wrangler r2 object put soul-infinity-space-assets/Pillar/Planets/Sun/sun-strip-bg.webp \
  --file sun-strip-bg.jpg
```

**Verify it is live:**
```bash
curl -I "https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Pillar/Planets/Sun/sun-strip-bg.webp"
# Must return HTTP 200
```

Do not touch SunPage.tsx until the curl returns 200.

---

## Step 2 — File to Edit

```
src/pages/planets/SunPage.tsx
```

---

## Change 1 — Dark Sections: Apply sun-strip-bg.webp

Find these four sections in SunPage.tsx:
- Attributes bar (the 5-icon strip below the hero)
- How to Connect with Surya (full-width dark section)
- Affirmation banner (full-width dark quote strip)
- Footer CTA (closing dark banner)

Each currently has a plain dark background (inline style or Tailwind class like `bg-[#0B1120]` or `bg-gray-900`).

Replace the background on each with this inline style:

```tsx
style={{
  backgroundImage: `linear-gradient(rgba(11,17,32,0.55), rgba(11,17,32,0.55)), url('https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Pillar/Planets/Sun/sun-strip-bg.webp')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
}}
```

If the section already has an inline style, merge the backgroundImage into it — do not create a duplicate style prop.

The overlay opacity `0.55` keeps the golden solar energy visible while keeping text readable. Do not increase it above `0.65`.

---

## Change 2 — Light Cards: Aries Zodiac Style

Find the light/parchment cards:
- Sacred Mantra card
- Surya in Our Life card  
- Sidebar info cards (Zodiac Sign, Exalted, Debilitated etc.)
- FAQ section background

Restyle each card wrapper to match the Aries zodiac card pattern:

```tsx
className="bg-[#fdf6e9] border border-amber-200/60 rounded-2xl p-6 shadow-sm 
           hover:shadow-md transition-shadow duration-200"
```

Inside each card, add a small icon circle before the card title:

```tsx
{/* Icon circle — use existing inline SVG already in the file for this section */}
<div className="w-10 h-10 rounded-full bg-amber-100 border border-amber-300/60 
                flex items-center justify-center mb-4 text-amber-700">
  {/* existing icon SVG */}
</div>
```

Use only inline SVGs already present in SunPage.tsx — do not import new icon libraries.

---

## Change 3 — Connect with Surya Card: Keep Dark + Apply bg

The "Connect with Surya" card is the dark CTA card in the three-column row. Do NOT apply parchment styling to it. Instead apply the sun-strip-bg treatment:

```tsx
style={{
  backgroundImage: `linear-gradient(rgba(11,17,32,0.70), rgba(11,17,32,0.70)), url('https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Pillar/Planets/Sun/sun-strip-bg.webp')`,
  backgroundSize: 'cover',
  backgroundPosition: 'right center',
  backgroundRepeat: 'no-repeat',
}}
```

Higher overlay opacity `0.70` for this card since it is smaller and needs better text contrast.

---

## What NOT to Change

- Hero section — leave completely untouched
- All text content — no edits
- SEO head, JSON-LD, FAQ schema — no changes
- Route, imports, component structure — no changes
- Navagraha strip — leave untouched
- Any section not explicitly listed above — leave untouched

---

## Validation

```bash
npm run build        # must pass zero errors
npm run build:prerender  # must pass zero errors

# Check no new em-dashes introduced
grep -n "—" src/pages/planets/SunPage.tsx  # must return empty

# Check fetchPriority casing
grep -n "fetchPriority" src/pages/planets/SunPage.tsx  # must return empty
```

---

## Git

```bash
git add src/pages/planets/SunPage.tsx
git commit -m "style: apply sun-strip-bg to dark sections, Aries-style parchment cards"
git push origin feature/surya-page-redesign
```

Same branch as before — `feature/surya-page-redesign`. Do not open a new branch.

---

## Reference: Planet Background Images Roadmap

Once Surya is approved on staging, these backgrounds need to be generated for the other 8 planets — same style, different color energy:

| Planet | File name | Color energy |
|---|---|---|
| Chandra | `moon-strip-bg.webp` | Silver blue, moonlit, pearl shimmer |
| Mangala | `mars-strip-bg.webp` | Deep red, fire, warrior energy |
| Budha | `mercury-strip-bg.webp` | Emerald green, mercury waves |
| Guru | `jupiter-strip-bg.webp` | Purple gold, expansive cosmic |
| Shukra | `venus-strip-bg.webp` | Rose pink, floral, soft light |
| Shani | `saturn-strip-bg.webp` | Indigo grey, structured rings |
| Rahu | `rahu-strip-bg.webp` | Smoky violet, shadowy eclipse |
| Ketu | `ketu-strip-bg.webp` | Teal smoke, ethereal mist |

All go to R2 path: `Pillar/Planets/{PlanetName}/{file-name}`
