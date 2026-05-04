# Soul Infinity — Zodiac Rashi Pages Master Plan
# Last updated: May 2026
# Status: Mesha (Aries) LIVE on production. 11 remaining.

---

## 1. Image Requirements Per Rashi Page

Every rashi needs **5 images**. Total for all 12 rashis = **60 images** (Mesha already done).

| # | Image Name | Size (px) | Aspect Ratio | Format | Max Size | Purpose |
|---|---|---|---|---|---|---|
| 1 | `hero-banner-[rashi].png` | 1600 x 600 | 16:6 | WebP | 300 KB | Full-width hero banner with rashi name, animal, cosmic background |
| 2 | `[rashi]-card.png` | 800 x 800 | 1:1 (circle) | WebP | 150 KB | Circular card on Zodiac Hub listing page |
| 3 | `handwritten-scroll-[rashi].png` | 1200 x 800 | 3:2 | WebP | 200 KB | Parchment scroll — text overlaid on it in the About section |
| 4 | `quick-facts-[rashi].png` | 1400 x 400 | 7:2 | WebP | 250 KB | Quick Facts infographic strip (Element, Ruler, Symbol, Dates, Lucky Colour) |
| 5 | `vedic-remedies-bg-[rashi].png` | 1400 x 900 | 14:9 | WebP | 300 KB | Dark background with 7 remedy rows (icon + number badge + empty text space) |

### Notes on image creation
- **Hero banner:** Rashi animal/symbol prominent on LEFT, name in script font on RIGHT, cosmic/elemental background matching rashi color theme
- **Circle card:** Same style as Taurus — animal/symbol centered, name in gold script, elemental background, works as circle when CSS clips it
- **Handwritten scroll:** Parchment/aged paper texture with rashi symbol top center, ram/animal sketch bottom right — LEAVE CENTER AREA EMPTY for text overlay
- **Quick Facts:** Must have 5 columns: Element, Ruler, Symbol, Dates, Lucky Colour — with icons. Match Mesha style exactly
- **Vedic Remedies bg:** 7 horizontal rows with icon square on LEFT and number badge — RIGHT side of each row must be EMPTY DARK SPACE for text overlay. Match Mesha Vedic-Remedies-bg.png style exactly

---

## 2. R2 Upload Paths

Upload all images to Cloudflare R2 bucket `soul-infinity-space-assets` under:

```
/Zodiac/[EnglishName]/hero-banner-[rashi].webp
/Zodiac/[EnglishName]/[rashi]-card.webp
/Zodiac/[EnglishName]/handwritten-scroll-[rashi].webp
/Zodiac/[EnglishName]/quick-facts-[rashi].webp
/Zodiac/[EnglishName]/vedic-remedies-bg-[rashi].webp
```

### Example for Taurus:
```
/Zodiac/Taurus/hero-banner-vrishabha.webp
/Zodiac/Taurus/vrishabha-card.webp
/Zodiac/Taurus/handwritten-scroll-vrishabha.webp
/Zodiac/Taurus/quick-facts-vrishabha.webp
/Zodiac/Taurus/vedic-remedies-bg-vrishabha.webp
```

---

## 3. Page Structure — Every Rashi Detailed Page

Route pattern: `/zodiac/[english-slug]`
File pattern: `src/pages/zodiac/[Name]RashiPage.tsx`

### Section Order (Top to Bottom)

**Section 1 — Hero Banner (full width, 420px tall)**
- Background: hero-banner image as `<img>` with object-cover
- Gradient overlay: `linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.7) 100%)`
- H1: "[Sanskrit] Rashi, The [Tagline]"
- Subtitle: "[Devanagari] · [English] · Ruled by [Planet]"
- Breadcrumb below: Home > Zodiac Signs > [Rashi Name]

**Section 2 — Quick Facts Strip (full width)**
- `<img>` tag, width 100%, display block, no margin/padding
- Image already has all facts built in — just display it

**Section 3 — About [Rashi] (cream bg, two column)**
- Left column (55%): Flowing text layout
  - Small icon + "Mesha Rashi / in Vedic Astrology" header
  - 4 content cards with lucide icons + headings + paragraphs
  - Soul Infinity Insight card at bottom
- Right column (45%): sticky
  - Quick Facts image (full width, rounded)
  - WhatsApp CTA button + Call button
  - Key facts mini box (Element, Ruler, Symbol, Dates, Lucky Colour as key-value)

**Section 4 — Mantra Section (full width, dark bg)**
- mantra-bg image OR plain dark bg `#0d0000`
- Sanskrit mantra large, centered, amber
- IAST transliteration in white italic
- English meaning in gray
- Chanting instruction badge

**Section 5 — Characteristics (cream bg)**
- Header: "Characteristics of [Rashi] Natives"
- Two column cards:
  - Left: Strengths card (green header, 6 rows with lucide icons)
  - Right: Challenges card (red header, 4 rows with lucide icons)
- Footer: "When guided with awareness, the fire of [Rashi] becomes a force of greatness."

**Section 6 — [Rashi] in the 12 Houses (cream bg)**
- Header: "[Rashi] in the 12 Houses"
- Subtitle: "HOW THE [ELEMENT] OF [RASHI] EXPRESSES ITSELF"
- 4x3 grid of house cards
- Each card: colored number badge + lucide icon + house name + 2-line description + arrow insight
- Footer line

**Section 7 — Classical Vedic Remedies (image bg)**
- Vedic-Remedies-bg image as `<img>` (full section)
- Text overlaid absolutely: padding `2% 3% 2% 38%`, justifyContent space-between
- 7 remedy text items, each with main text (white) + sub text (gray) + amber keyword highlights

**Section 8 — FAQ Accordion (cream bg)**
- Header: "Frequently Asked" (navy) + "Questions" (red-amber)
- 5 Q&As with colored left border + icon circle + chevron toggle
- First FAQ shows rashi card image on right when open

**Section 9 — CTA Banner (dark blue bg)**
- H2: "Want a Personalised [Rashi] Reading?"
- Description text mentioning Saurabh Jain + Soul Infinity Astro Solutions
- Amber CTA button → /contact

---

## 4. All 12 Rashis — Status and Color Themes

| # | Rashi | English | Route | Element | Ruler | Color Theme | Status |
|---|---|---|---|---|---|---|---|
| 1 | मेष | Aries | /zodiac/aries | Fire | Mars | Red `#dc2626` | LIVE |
| 2 | वृषभ | Taurus | /zodiac/taurus | Earth | Venus | Green `#16a34a` | Pending |
| 3 | मिथुन | Gemini | /zodiac/gemini | Air | Mercury | Cyan `#0891b2` | Pending |
| 4 | कर्क | Cancer | /zodiac/cancer | Water | Moon | Violet `#7c3aed` | Pending |
| 5 | सिंह | Leo | /zodiac/leo | Fire | Sun | Amber `#d97706` | Pending |
| 6 | कन्या | Virgo | /zodiac/virgo | Earth | Mercury | Lime `#65a30d` | Pending |
| 7 | तुला | Libra | /zodiac/libra | Air | Venus | Pink `#db2777` | Pending |
| 8 | वृश्चिक | Scorpio | /zodiac/scorpio | Water | Mars | Dark Red `#991b1b` | Pending |
| 9 | धनु | Sagittarius | /zodiac/sagittarius | Fire | Jupiter | Purple `#7c3aed` | Pending |
| 10 | मकर | Capricorn | /zodiac/capricorn | Earth | Saturn | Dark Blue `#1e3a8a` | Pending |
| 11 | कुम्भ | Aquarius | /zodiac/aquarius | Air | Saturn | Sky `#0369a1` | Pending |
| 12 | मीन | Pisces | /zodiac/pisces | Water | Jupiter | Teal `#0f766e` | Pending |

---

## 5. Nano Banana Image Prompts

Use these prompts to generate images for each rashi. Replace [RASHI] and [COLOR] with values from table above.

### Hero Banner Prompt (1600x600):
```
Cinematic wide banner for [RASHI] zodiac sign in Vedic astrology. [ANIMAL] in dramatic [ELEMENT] elemental setting on left side. Right side has elegant script text "Mesha Rashi" in gold. Cosmic [COLOR] background with constellation patterns. Dark edges for text overlay. Ultra detailed, professional astrology website banner style.
```

### Circle Card Prompt (800x800):
```
Circular zodiac card for [RASHI] ([ENGLISH]) Vedic astrology. [ANIMAL] centered with [COLOR] cosmic fire/elemental background. Gold script text "[RASHI] Rashi" and "[TAGLINE]". Circular composition with dark vignette border. Traits listed in gold text. Premium astrology illustration style.
```

### Handwritten Scroll Prompt (1200x800):
```
Ancient Vedic parchment scroll, aged paper texture, horizontal format. Aries zodiac symbol at top center in dark red. Small sketch of [ANIMAL] head in bottom right corner. Decorative border lines. Large EMPTY CENTER AREA with visible paper texture. Dark cosmic background behind the scroll. No text in center.
```

### Quick Facts Prompt (1400x400):
```
Dark cosmic infographic banner for [RASHI] Rashi Quick Facts. Left side: [ANIMAL] face in glowing [COLOR] circle. Five columns with labels: Element, Ruler, Symbol, Dates, Lucky Colour. Each column has a glowing circular icon with value below. [COLOR] fire/cosmic atmosphere. Gold script title "Mesha Rashi Quick Facts" at top center.
```

### Vedic Remedies Background Prompt (1400x900):
```
Dark cosmic background for 7 Vedic remedy rows. Left column: 7 square icon boxes with [COLOR] gradient backgrounds showing Om symbol, gemstone ring, lentil bowl, Hanuman face, temple, crossed swords, chili bowl. Each row has a hexagonal number badge (01-07) in matching color. Right 65% of each row is EMPTY DARK SPACE for text overlay. [COLOR] fire embers at edges. Mandala decoration at far right of each row.
```

---

## 6. App.tsx Routes to Add

When building each page, add to `src/App.tsx`:

```tsx
const TaurusRashiPage = lazy(() => import('./pages/zodiac/TaurusRashiPage'));
const GeminiRashiPage = lazy(() => import('./pages/zodiac/GeminiRashiPage'));
const CancerRashiPage = lazy(() => import('./pages/zodiac/CancerRashiPage'));
const LeoRashiPage = lazy(() => import('./pages/zodiac/LeoRashiPage'));
const VirgoRashiPage = lazy(() => import('./pages/zodiac/VirgoRashiPage'));
const LibraRashiPage = lazy(() => import('./pages/zodiac/LibraRashiPage'));
const ScorpioRashiPage = lazy(() => import('./pages/zodiac/ScorpioRashiPage'));
const SagittariusRashiPage = lazy(() => import('./pages/zodiac/SagittariusRashiPage'));
const CapricornRashiPage = lazy(() => import('./pages/zodiac/CapricornRashiPage'));
const AquariusRashiPage = lazy(() => import('./pages/zodiac/AquariusRashiPage'));
const PiscesRashiPage = lazy(() => import('./pages/zodiac/PiscesRashiPage'));

<Route path="/zodiac/taurus" element={<TaurusRashiPage />} />
<Route path="/zodiac/gemini" element={<GeminiRashiPage />} />
<Route path="/zodiac/cancer" element={<CancerRashiPage />} />
<Route path="/zodiac/leo" element={<LeoRashiPage />} />
<Route path="/zodiac/virgo" element={<VirgoRashiPage />} />
<Route path="/zodiac/libra" element={<LibraRashiPage />} />
<Route path="/zodiac/scorpio" element={<ScorpioRashiPage />} />
<Route path="/zodiac/sagittarius" element={<SagittariusRashiPage />} />
<Route path="/zodiac/capricorn" element={<CapricornRashiPage />} />
<Route path="/zodiac/aquarius" element={<AquariusRashiPage />} />
<Route path="/zodiac/pisces" element={<PiscesRashiPage />} />
```

Also add each route to `scripts/prerender.mjs` ROUTES array.

---

## 7. Build Workflow Per Rashi

Follow this exact sequence for each new rashi:

1. Generate 5 images using Nano Banana prompts above
2. Save to: `/Users/saurabhiim/Documents/Antigravity/SIAS-5.0-main/assets-to-upload/[RashiName]/`
3. Tell Claude Code to upload all 5 to R2 and return URLs
4. Tell Claude Code to build `[Name]RashiPage.tsx` using MeshaRashiPage.tsx as template
5. Update color theme, content, images, Sanskrit text, mantras, remedies
6. Run validation gates (em-dash, H1, build, prerender)
7. Commit to feature/zodiac-[rashi] branch
8. Merge to staging, review Vercel preview
9. Merge to main

---

## 8. Hard Rules (Non-Negotiable)

- NO em-dashes — use commas or split sentences
- NO Gujarati — English and Devanagari only
- NO emojis in code or schema
- Single H1 per page
- fetchpriority lowercase on hero img
- Self-contained single .tsx file per rashi
- All image URLs as inline R2 constants at top of file
- No imports from blog-images-folder
- Run grep -rn "—" src/ after every page — must return empty
- Run npm run build — must succeed
- Prerender all routes — must pass

---

## 9. Sanskrit and Vedic Content Per Rashi

### Mantras

| Rashi | Beej Mantra | Planet | Day | Mala |
|---|---|---|---|---|
| Mesha | ॐ क्रां क्रीं क्रौं सः भौमाय नमः | Mangala (Mars) | Tuesday | Red Coral / Red Sphatik |
| Vrishabha | ॐ द्रां द्रीं द्रौं सः शुक्राय नमः | Shukra (Venus) | Friday | White Sphatik / Diamond |
| Mithuna | ॐ ब्रां ब्रीं ब्रौं सः बुधाय नमः | Budha (Mercury) | Wednesday | Emerald / Green Sphatik |
| Karka | ॐ श्रां श्रीं श्रौं सः चन्द्रमसे नमः | Chandra (Moon) | Monday | Pearl / White Sphatik |
| Singh | ॐ ह्रां ह्रीं ह्रौं सः सूर्याय नमः | Surya (Sun) | Sunday | Ruby / Sphatik |
| Kanya | ॐ ब्रां ब्रीं ब्रौं सः बुधाय नमः | Budha (Mercury) | Wednesday | Emerald / Green Sphatik |
| Tula | ॐ द्रां द्रीं द्रौं सः शुक्राय नमः | Shukra (Venus) | Friday | Diamond / White Sapphire |
| Vrischika | ॐ क्रां क्रीं क्रौं सः भौमाय नमः | Mangala (Mars) | Tuesday | Red Coral |
| Dhanu | ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः | Guru (Jupiter) | Thursday | Yellow Sapphire / Sphatik |
| Makara | ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः | Shani (Saturn) | Saturday | Blue Sapphire / Iron mala |
| Kumbha | ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः | Shani (Saturn) | Saturday | Blue Sapphire |
| Meena | ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः | Guru (Jupiter) | Thursday | Yellow Sapphire |

---

## 10. Current Project Memory

**Production URL:** www.soulinfinity.space
**Repo:** github.com/saurabh-bits-pilani/SIAS-6.0
**Local path:** /Users/saurabhiim/Documents/Antigravity/SIAS-5.0-main
**R2 bucket:** soul-infinity-space-assets
**R2 public URL base:** https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev

**Mesha (Aries) R2 image URLs:**
- Hero: https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Aries/hero-banner-mesh-rashi.webp
- Card: https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Aries/aries-card.webp
- Scroll: https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Aries/Handwritten-scroll-mesh-rashi.webp
- Quick Facts: https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Aries/quick-facets-mesh-rashi.webp
- Remedies bg: https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Aries/Vedic-Remedies-bg.webp

**Fonts in use:**
- font-caveat (Caveat) — hero labels
- font-kalam (Kalam) — section headings
- font-devanagari (Noto Serif Devanagari) — Sanskrit text
- Tailwind utility classes for all layout

**Template file:** src/pages/zodiac/MeshaRashiPage.tsx (source of truth for all rashi pages)
