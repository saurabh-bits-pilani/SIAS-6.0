# Surya Page — Parallax Background + Aries Card Style Fix

## Two changes only. Nothing else.

---

## Change 1 — Parallax Scrolling Background

The page background should scroll slower than the content — classic parallax effect.
Cards stay fixed in normal flow. Only the background moves.

Find the outermost page wrapper div in `SunPage.tsx` — the one wrapping everything after the hero.

Add this to its style:
```tsx
style={{
  backgroundImage: `url('https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Pillar/Planets/Sun/sun-strip-bg.webp')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed',   // ← this is the parallax effect
}}
```

`backgroundAttachment: 'fixed'` makes the background stay fixed to the viewport while content scrolls over it — giving the parallax/depth illusion with zero JavaScript.

**Mobile fallback** — `fixed` attachment breaks on iOS. Add this className to the same wrapper:
```tsx
className="... [background-attachment:scroll] md:[background-attachment:fixed]"
```
Or use inline style with a media query approach — apply `scroll` on mobile, `fixed` on md+.

Remove `backgroundAttachment: 'fixed'` from any individual section styles (attributes bar, How to Connect, affirmation, footer) — the page-level bg handles it now. Those sections should only keep the overlay gradient, not their own background image.

---

## Change 2 — Aries-Style Cards (copy exact pattern from MeshaRashiPage.tsx)

**Read `src/pages/zodiac/MeshaRashiPage.tsx` first** — look at how its cards are styled. That is the exact pattern to copy.

The Aries cards have:
- Pure white background `bg-white`
- Subtle border `border border-gray-100` or `border border-orange-100`
- Strong drop shadow `shadow-md` or `shadow-lg`
- Colored icon circle (filled, not just outlined)
- Title in brand color (bold)
- Body in `text-gray-600`
- Generous padding and border-radius

Replace `ariesCardRich` with this:
```tsx
const ariesCardRich =
  'bg-white border border-amber-100 rounded-2xl p-6 ' +
  'shadow-[0_4px_24px_rgba(0,0,0,0.10),0_1px_4px_rgba(0,0,0,0.06)] ' +
  'hover:shadow-[0_8px_32px_rgba(0,0,0,0.14),0_2px_8px_rgba(0,0,0,0.08)] ' +
  'hover:-translate-y-1 transition-all duration-300 ease-out relative';
```

Replace `ariesIconCircle` with:
```tsx
const ariesIconCircle =
  'w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center mb-4 text-white';
```

Replace `SidebarAccordion` wrapper className with:
```tsx
'bg-white border border-amber-100 rounded-2xl ' +
'shadow-[0_4px_24px_rgba(0,0,0,0.10),0_1px_4px_rgba(0,0,0,0.06)] ' +
'hover:shadow-[0_8px_32px_rgba(0,0,0,0.14)] ' +
'hover:-translate-y-1 transition-all duration-300 ease-out relative overflow-hidden'
```

**Why this works:** White cards on the cosmic parallax background create strong visual contrast — cards pop forward naturally without needing heavy shadows. The parallax bg does the depth work, the card just needs to be clean white.

---

## What NOT to Change

- Hero section — untouched
- All text content — no edits
- SEO, JSON-LD, schema — no changes
- Navagraha strip — untouched
- Dark section overlays (attributes bar, How to Connect, affirmation, footer) — keep their gradient overlays, just remove backgroundImage from them since the page wrapper now handles it

---

## Validation

```bash
npm run build          # must pass zero errors
npm run build:prerender  # must pass zero errors
grep -n "—" src/pages/planets/SunPage.tsx      # must return empty
grep -n "fetchPriority" src/pages/planets/SunPage.tsx  # must return empty
```

---

## Git

```bash
git add src/pages/planets/SunPage.tsx
git commit -m "style(sun): parallax bg + white Aries-style floating cards"
git push origin feature/surya-page-redesign
```

Same branch. Do not open a new branch. Do not touch main.
