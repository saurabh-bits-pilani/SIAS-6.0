# Surya Page — Light Card Background Fix

## Goal
Upload `sun-bg-for-cards.png` to R2 and apply it as the background
for all light card sections. Dark sections keep `sun-strip-bg.webp` unchanged.

---

## Step 1 — Upload to R2

```bash
source ~/.zshrc
cd /Users/saurabhiim/Documents/Antigravity/SIAS-5.0-main/assets-to-upload/Planets/Sun

# Use the existing upload script pattern from scripts/upload-sun-strip-bg.mjs
# Create a similar one-liner or run directly:
node -e "
const sharp = require('sharp');
const { execSync } = require('child_process');
sharp('sun-bg-for-cards.png')
  .webp({ quality: 90 })
  .toFile('sun-bg-for-cards.webp', (err) => {
    if (err) throw err;
    execSync('wrangler r2 object put soul-infinity-space-assets/Pillar/Planets/Sun/sun-bg-for-cards.webp --file sun-bg-for-cards.webp');
    console.log('uploaded');
  });
"
```

Or copy and adapt `scripts/upload-sun-strip-bg.mjs` — change source to `sun-bg-for-cards.png` and target to `Pillar/Planets/Sun/sun-bg-for-cards.webp`.

**Verify:**
```bash
curl -I "https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Pillar/Planets/Sun/sun-bg-for-cards.webp"
# Must return HTTP 200
```

Do not touch SunPage.tsx until curl returns 200.

---

## Step 2 — Apply to Light Card Sections in SunPage.tsx

The light card background (`sun-bg-for-cards.webp`) goes on these sections only:
- The three-column card row wrapper (Sacred Mantra + Surya in Our Life + Connect)
- The FAQ section wrapper
- The sidebar cards wrapper

### Card section wrapper
Find the `<section>` or `<div>` wrapping the three-column card row.
Add inline style:
```tsx
style={{
  backgroundImage: `url('https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Pillar/Planets/Sun/sun-bg-for-cards.webp')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed',
}}
```

### FAQ + sidebar section wrapper
Same style on the outer wrapper of the two-column FAQ + sidebar section.

### Individual cards — go transparent
Since the section wrapper now has the bg, individual cards should be
**semi-transparent** so the bg shows through:

```tsx
const ariesCardRich =
  'bg-white/80 backdrop-blur-sm border border-amber-200/60 rounded-2xl p-6 ' +
  'shadow-[0_4px_24px_rgba(0,0,0,0.10),0_1px_4px_rgba(0,0,0,0.06)] ' +
  'hover:shadow-[0_8px_32px_rgba(0,0,0,0.14),0_2px_8px_rgba(0,0,0,0.08)] ' +
  'hover:-translate-y-1 transition-all duration-300 ease-out relative';
```

`bg-white/80` = 80% opaque white — card is mostly white but the warm bg bleeds through subtly at edges. `backdrop-blur-sm` adds a frosted glass softness.

Same for `SidebarAccordion` wrapper:
```tsx
'bg-white/80 backdrop-blur-sm border border-amber-200/60 rounded-2xl ' +
'shadow-[0_4px_24px_rgba(0,0,0,0.10),0_1px_4px_rgba(0,0,0,0.06)] ' +
'hover:shadow-[0_8px_32px_rgba(0,0,0,0.14)] ' +
'hover:-translate-y-1 transition-all duration-300 ease-out relative overflow-hidden'
```

---

## What Stays Unchanged

- Dark sections (attributes bar, How to Connect, affirmation, footer) — keep `sun-strip-bg.webp`
- Hero section — untouched
- All text content, SEO, JSON-LD, schema — no changes
- Navagraha strip — untouched
- Gemstone card — apply same `bg-white/80` treatment

---

## Visual Result

```
Dark navy cosmic bg (sun-strip-bg)     ← attributes bar, How to Connect, affirmation, footer
Warm parchment watercolor bg           ← card sections, FAQ section  
  └── White/80 frosted cards floating  ← individual cards pop off the warm bg
```

---

## Validation

```bash
npm run build
npm run build:prerender
grep -n "—" src/pages/planets/SunPage.tsx      # must return empty
grep -n "fetchPriority" src/pages/planets/SunPage.tsx  # must return empty
```

---

## Git

```bash
git add src/pages/planets/SunPage.tsx
git commit -m "style(sun): warm parchment bg on card sections, frosted glass cards"
git push origin feature/surya-page-redesign
```

Same branch. Never touch main.
