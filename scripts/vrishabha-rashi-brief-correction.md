# Vrishabha Rashi Page Brief — CORRECTION ADDENDUM
# Applies to: scripts/vrishabha-rashi-page-brief.md
# Read this BEFORE executing the main brief.

## CORRECTION: Mantra Background Image IS Available

The main brief (Phase 0 and Phase 2K) incorrectly stated that mantra-background-taurus.png
was not available and instructed Claude Code to use a CSS gradient fallback.

THIS IS WRONG. The correct file exists at:
  /Users/saurabhiim/Documents/Antigravity/SIAS-5.0-main/assets-to-upload/Taurus/mantra-background-taurus.png

## What to do:

Step 1 — Add to Phase 0 asset optimization:
  sharp(path.join(base, 'mantra-background-taurus.png'))
    .resize(1600, null, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 85 })
    .toFile(path.join(base, 'mantra-bg-vrishabha-rashi.webp'))
    .then(i => console.log('mantra-bg done', i.size, 'bytes'));
  Max size: 400 KB

Step 2 — Upload to R2:
  R2 path: Zodiac/Tarus/mantra-bg-vrishabha-rashi.webp
  Verify: curl -I https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Tarus/mantra-bg-vrishabha-rashi.webp

Step 3 — Update the MANTRA_BG_URL constant in VrishabhaRashiPage.tsx:
  const MANTRA_BG_URL =
    'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Tarus/mantra-bg-vrishabha-rashi.webp';

Step 4 — In Section 4 (Mantra section), use the bg image the same way MeshaRashiPage.tsx
  uses its mantra section background: render MANTRA_BG_URL as a background image or
  as an <img> with overlaid text, matching the Aries mantra section pattern exactly.
  Remove the CSS gradient fallback that was specified in the main brief.

All other instructions in the main brief remain unchanged.
