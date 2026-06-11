# Rohini Nakshatra Page — Build Brief
# Branch: feature/rohini-nakshatra-page (new branch off main)
# File: src/pages/nakshatra/RohiniNakshatraPage.tsx
# Route: /nakshatra/rohini
# Design: Match MeshaRashiPage.tsx structure. Warm cream palette only. No dark blue/navy.

---

## CRITICAL RULES — ENFORCED

- NO em-dashes anywhere. Use commas, colons, or split sentences.
- NO Gujarati script.
- NO emojis in code or JSX.
- fetchpriority lowercase on hero img.
- Self-contained single .tsx file. No external data imports.
- All R2 URLs as inline constants at top of file.
- All Sanskrit text uses className="font-devanagari".
- Single H1 per page.
- Color palette: warm creams, ambers, golds ONLY. Never #0E1A36, never navy, never cold dark tones.
- Dark sections use #2A1810 (warm dark brown) NOT black or navy.
- After build: grep -n "—" src/pages/nakshatra/RohiniNakshatraPage.tsx must return empty.

---

## STEP 1 — CREATE BRANCH

```bash
git checkout main
git pull origin main
git checkout -b feature/rohini-nakshatra-page
```

---

## STEP 2 — READ TEMPLATE FIRST

Read src/pages/zodiac/MeshaRashiPage.tsx fully before writing any code.
Match: section order, CSS class patterns, font classes, sticky sidebar pattern, FAQ accordion, CTA banner.
Only content and colors change.

---

## STEP 3 — R2 URL CONSTANTS (top of file, before component)

```tsx
const R2 = 'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev';

const HERO_IMAGE        = `${R2}/Nakshatra/Rohini/hero-banner-rohini.webp`;
const QUICK_FACTS_IMAGE = `${R2}/Nakshatra/Rohini/quick-facts-rohini.webp`;
const REMEDIES_BG       = `${R2}/Nakshatra/Rohini/vedic-remedies-bg-rohini.webp`;
const COW_BG_CARD       = `${R2}/Nakshatra/Rohini/cow-bg-card.webp`;
const SVG               = `${R2}/Nakshatra/Rohini/SVG`;

const HERO_FRAME        = `${SVG}/hero-frame-rohini.svg`;
const SEC_NUM_01        = `${SVG}/section-number-01.svg`;
const SEC_NUM_02        = `${SVG}/section-number-02.svg`;
const SEC_NUM_03        = `${SVG}/section-number-03.svg`;
const PULLQUOTE_FRAME   = `${SVG}/pullquote-frame.svg`;
const WASHI_AMBER       = `${SVG}/washi-tape-amber.svg`;
const WASHI_CREAM       = `${SVG}/washi-tape-cream.svg`;
const HIGHLIGHT_YELLOW  = `${SVG}/highlight-yellow.svg`;
const DOODLE_MOON       = `${SVG}/doodle-moon-stars.svg`;
const SCROLL_FRAME      = `${SVG}/scroll-frame-rohini.svg`;
const CONSTELLATION     = `${SVG}/doodle-rohini-constellation.svg`;
const DIVIDER_LOTUS     = `${SVG}/divider-lotus.svg`;
const DIVIDER_OM        = `${SVG}/divider-om.svg`;
const DIVIDER_STARS     = `${SVG}/divider-stars.svg`;
const TITLE_SVG         = `${SVG}/title-rohini-handwritten.svg`;
const AUTHOR_SIG        = `${SVG}/author-signature.svg`;
```

---

## STEP 4 — FULL PAGE SECTIONS

### SECTION 1 — Hero Banner

Container: relative w-full overflow-hidden (no fixed height — let image set height naturally, matching MeshaRashiPage pattern exactly)

```tsx
<img
  src={HERO_IMAGE}
  alt="Moon in Rohini Nakshatra — Vedic astrology guide"
  width={1600}
  height={600}
  fetchpriority="high"
  className="w-full block object-cover"
/>
```

Torn edge overlay at bottom of hero:
```tsx
<div className="absolute bottom-0 left-0 w-full">
  <img src={HERO_FRAME} alt="" width={1600} height={100} className="w-full block" aria-hidden="true" />
</div>
```

Below hero image (cream bg #FAF6EC):
- Breadcrumb (font-poppins text-sm text-[#5C4A2A]): Home > Nakshatras > Rohini Nakshatra
- Amber pill label: "रोहिणी नक्षत्र · NAKSHATRA"
- H1 (font-kalam text-4xl md:text-5xl text-[#2A2438]):
  "Moon in Rohini Nakshatra, The Seat of Longing"
- Subtitle (font-poppins text-base md:text-lg text-[#5C4A2A]):
  "Ruled by Chandra (Moon) · Vrishabha (Taurus) · The Most Beloved of the 27 Nakshatras"

Section number decorator before H1:
```tsx
<img src={SEC_NUM_01} alt="01" width={120} height={60} className="mb-2" />
```

---

### SECTION 2 — Quick Facts Strip

Full width image, rounded-2xl, soft shadow:
```tsx
<div className="w-full max-w-5xl mx-auto px-4 py-8">
  <img
    src={QUICK_FACTS_IMAGE}
    alt="Rohini Nakshatra Quick Facts — Sign Taurus, Lord Moon, Deity Brahma, Symbol Ox Cart, Guna Rajas"
    width={1400}
    height={400}
    className="w-full rounded-2xl shadow-md"
    loading="lazy"
  />
</div>
```

---

### SECTION 3 — Two Column About (bg #FAF6EC)

55% left / 45% right, gap-8, stacks on mobile.

LEFT COLUMN:

Small header (font-kalam text-xl text-[#D4A11E]):
"रोहिणी नक्षत्र / Rohini in Vedic Astrology"

CARD 1 — "The Moon's Most Beloved"
Icon: Moon (lucide)
Icon bg: #FEF3C7, icon color: #D4A11E
Border-left: 4px solid #D4A11E
"Rohini is the nakshatra that Chandra (Moon) cherishes above all others. Spanning 10 to 23 degrees 20 minutes of Taurus, it is where the Moon shines most fully. Classical texts describe Rohini as the most fertile, beautiful, and magnetically attractive of the 27 nakshatras. It is the seat of creative abundance and the natural home of desire."

CARD 2 — "The Mythology of Rohini"
Icon: BookOpen (lucide)
"Chandra married the 27 daughters of Prajapati Daksha, but he became deeply infatuated with Rohini, spending all his time with her and neglecting the others. This angered the other wives, leading to a curse that caused the Moon to wane. This mythological story encodes a truth about Rohini: it is where the Moon most wants to be, and where his energy flows most naturally and completely."

CARD 3 — "What This Placement Means"
Icon: Star (lucide)
"A Moon in Rohini gives strong aesthetic sensibility, a love of beauty and physical comfort, deep emotional longing, and a naturally magnetic presence. These natives are often remembered long after a first meeting. The shadow side is an attachment to pleasure that can become possessive when Saturn or Rahu afflict this placement."

CARD 4 — Soul Infinity Insight (amber left border, cream bg, no card frame)
Use PULLQUOTE_FRAME as background image (position: relative, img absolute inset-0):
"Rohini is not just a beautiful nakshatra. It is the nakshatra of longing itself. The soul remembers something it once had and is always reaching for it again."

Below quote: AUTHOR_SIG image
```tsx
<img src={AUTHOR_SIG} alt="Saurabh Jain, K.N. Rao Institute" width={400} height={100} className="mt-4" loading="lazy" />
```

RIGHT COLUMN (sticky top-8):

Quick facts image (rounded-xl, shadow-md, full width, mb-6):
```tsx
<img src={QUICK_FACTS_IMAGE} alt="Rohini nakshatra quick reference facts" width={800} height={400} className="w-full rounded-xl shadow-md mb-6" loading="lazy" />
```

Quick Facts box (bg #2A1810, rounded-2xl, p-6, text-white):
Title: "Quick Facts" (font-kalam text-lg text-[#D4A11E] mb-4)
Key-value rows (font-poppins text-sm, border-b border-white/10, py-2):
- Nakshatra: 4th of 27
- Sign: Vrishabha (Taurus)
- Span: 10 to 23 degrees 20 minutes
- Lord: Chandra (Moon)
- Deity: Brahma (Creator)
- Symbol: Ox Cart / Chariot
- Guna: Rajas
- Lucky Color: White, Silver
- Famous Natives: Lord Krishna, Lord Rama

WhatsApp button (bg-[#D4A11E] text-[#1c1917] font-semibold rounded-full w-full mt-4 py-3):
"Book Rohini Reading"
href="https://wa.me/919079053840"

Call button (border-2 border-[#2A1810] text-[#2A1810] rounded-full w-full mt-2 py-3):
"Call Saurabh Jain"
href="tel:+919079053840"

Divider below right column:
```tsx
<img src={DIVIDER_LOTUS} alt="" width={600} height={60} className="w-full mt-6 opacity-60" aria-hidden="true" loading="lazy" />
```

---

### SECTION 4 — Mantra Section (bg #2A1810, py-16 md:py-24, text-center)

Constellation doodle top right (absolute, opacity-20):
```tsx
<img src={CONSTELLATION} alt="" width={300} height={240} className="absolute top-4 right-4 opacity-20" aria-hidden="true" loading="lazy" />
```

Content centered:

Section number:
```tsx
<img src={SEC_NUM_02} alt="02" width={120} height={60} className="mx-auto mb-4" loading="lazy" />
```

Devanagari mantra (font-devanagari text-3xl md:text-5xl text-[#D4A11E] mb-4):
ॐ श्रां श्रीं श्रौं सः चन्द्रमसे नमः

IAST (font-poppins italic text-white/80 text-lg mb-2):
Om Shraam Shreem Shraum Sah Chandramasay Namah

English meaning (font-poppins text-white/60 text-base mb-6):
"I bow to Chandra, the lord of Rohini nakshatra and the keeper of the mind."

Chanting badge (border border-[#D4A11E]/50 text-[#D4A11E] font-poppins text-sm px-5 py-2 rounded-full inline-block):
"Chant 108 times on a pearl or white sphatik mala, on Mondays"

Simpler mantra below (mt-6):
Label (font-poppins text-white/50 text-xs uppercase tracking-widest mb-2): "For daily practice"
ॐ शं शनैश्चराय नमः — WAIT, this is Shani mantra. Use Chandra mantra:
ॐ सों सोमाय नमः (font-devanagari text-2xl text-[#D4A11E]/80)
"Om Som Somaya Namah" (font-poppins italic text-white/60 text-sm)

---

### SECTION 5 — Characteristics (bg #FAF6EC, py-12)

Section number:
```tsx
<img src={SEC_NUM_03} alt="03" width={120} height={60} className="mb-2" loading="lazy" />
```

Header (font-kalam text-3xl text-[#2A2438]):
"Rohini Natives: Gifts and Shadows"

Two column cards side by side (gap-6, stacks on mobile):

LEFT CARD — Strengths (border-top 4px solid #65a30d, bg white, rounded-2xl p-6):
Header row (bg #d1fae5 rounded text-[#065f46] font-semibold text-sm px-4 py-2 mb-4): "Strengths of Rohini Moon"
6 rows with CheckCircle lucide icon (text-[#059669] w-5 h-5) + text (font-poppins text-sm text-[#2A2438]):
- Naturally beautiful and magnetically charming presence
- Deeply loving, loyal, and emotionally affectionate
- Highly creative with strong artistic and aesthetic gifts
- Fertile mind and strong imagination
- Financial growth through talent and creativity
- Nurturing, caring, and emotionally intuitive with others

RIGHT CARD — Shadows (border-top 4px solid #C84F3F, bg white, rounded-2xl p-6):
Header row (bg #fee2e2 rounded text-[#991b1b] font-semibold text-sm px-4 py-2 mb-4): "Shadows and Challenges"
4 rows with AlertTriangle lucide icon (text-[#dc2626] w-5 h-5) + text:
- Emotional possessiveness and jealousy in relationships
- Over-attachment to comfort, beauty, and sensory pleasure
- Mood swings and emotional intensity under affliction
- Indulgence in physical pleasures when Saturn or Rahu aspect Moon

Footer quote (font-caveat text-2xl text-[#5C4A2A] italic text-center mt-8):
"The gifts of Rohini are real and lasting. So is the hunger. The work is learning which desires to feed."

Divider:
```tsx
<img src={DIVIDER_STARS} alt="" width={600} height={60} className="mx-auto mt-8 opacity-50" aria-hidden="true" loading="lazy" />
```

---

### SECTION 6 — Rohini Moon in the 12 Houses (bg #FAF6EC, py-12)

Header (font-kalam text-3xl text-[#2A2438] text-center):
"Rohini Moon in Each of the 12 Houses"
Sub (font-poppins text-xs uppercase tracking-widest text-[#D4A11E] text-center mt-2 mb-8):
"HOW CHANDRA EXPRESSES HIMSELF ACROSS BHAVAS"

4 column grid desktop, 2 column tablet, 1 column mobile.
Each house card (bg white, border border-[#E5D5B0], rounded-2xl p-4):
- Amber number badge (w-8 h-8 rounded-full bg-[#FEF3C7] text-[#D4A11E] font-kalam font-bold text-sm flex items-center justify-center mb-3)
- House name (font-kalam text-base text-[#2A2438] mb-1)
- 2-line description (font-poppins text-xs text-[#5C4A2A] leading-relaxed)

Houses content:
1st: "Charismatic, attractive personality, loved by all, strong emotional nature."
2nd: "Sweet speech, family harmony, good wealth through creativity."
3rd: "Creative communicator, lovely voice, good bond with siblings."
4th: "Love for home and mother, beautiful home, inner emotional comfort."
5th: "Artistic mind, love for children, very good intelligence."
6th: "Emotional stress, worry about health, but strong intuition."
7th: "Exceptionally romantic spouse, deep need for emotional partnership."
8th: "Emotional ups and downs, transformation, hidden pleasures."
9th: "Spiritual beauty, blessed by gurus, devotion through aesthetics."
10th: "Success in creative fields, public recognition, career in arts."
11th: "Gains through networks, fulfillment of desires, luxurious life."
12th: "Spiritual longing, moksha through surrender, hidden pleasures."

Footer line (font-caveat text-lg text-[#D4A11E] italic text-center mt-6):
"The Moon in Rohini seeks beauty, love, and emotional nourishment in every area of life."

---

### SECTION 7 — Story of Rohini (bg #FAF6EC, py-12)

Title (font-kalam text-3xl text-[#2A2438] mb-6): "The Story of Rohini"

Scroll frame section:
```tsx
<div className="relative max-w-4xl mx-auto">
  <img
    src={SCROLL_FRAME}
    alt="Ancient parchment scroll"
    width={1200}
    height={800}
    className="w-full"
    loading="lazy"
  />
  <div className="absolute inset-0 flex items-center justify-center px-[12%] py-[25%]">
    <div className="text-center">
      <p className="font-kalam text-lg md:text-xl text-[#2A2438] leading-relaxed mb-4">
        Chandra married the 27 daughters of Prajapati Daksha, who became the 27 Nakshatras.
        But Chandra was deeply enamored by Rohini, the fourth among them.
      </p>
      <p className="font-poppins text-sm md:text-base text-[#5C4A2A] leading-relaxed mb-4">
        He spent most of his time with her, neglecting the others. Angered by this
        partiality, the other wives complained to their father. Daksha cursed Chandra
        to wane away and lose his brilliance.
      </p>
      <p className="font-poppins text-sm md:text-base text-[#5C4A2A] leading-relaxed">
        The Devas pleaded for Chandra, and the curse was softened. So Chandra now waxes
        and wanes every month. This is why Rohini is the seat of longing, desire, and
        emotional depth.
      </p>
    </div>
  </div>
</div>
```

Moon doodle below scroll (centered, opacity-40):
```tsx
<img src={DOODLE_MOON} alt="" width={300} height={225} className="mx-auto mt-4 opacity-40" aria-hidden="true" loading="lazy" />
```

---

### SECTION 8 — Classical Vedic Remedies (relative, dark overlay on image bg)

```tsx
<div className="relative py-16">
  <img
    src={REMEDIES_BG}
    alt=""
    width={1400}
    height={900}
    className="absolute inset-0 w-full h-full object-cover"
    aria-hidden="true"
    loading="lazy"
  />
  <div className="absolute inset-0 bg-[#2A1810]/80" />
  <div className="relative z-10 max-w-5xl mx-auto px-4">
    <img src={DIVIDER_OM} alt="" width={600} height={60} className="mx-auto mb-8 opacity-60" aria-hidden="true" loading="lazy" />
    <h2 className="font-kalam text-3xl text-[#D4A11E] text-center mb-2">Classical Vedic Remedies for Rohini Moon</h2>
    <p className="font-poppins text-white/60 text-sm text-center mb-10 uppercase tracking-widest">FOR AN AFFLICTED OR WEAKENED CHANDRA</p>
    <div className="space-y-6">
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
</div>
```

REMEDIES array (define above component return):
```tsx
const REMEDIES = [
  { main: 'Worship Lord Chandra on Mondays', sub: 'Offer white flowers, milk, and white rice to the Moon on Purnima and every Monday. Fast if health permits.' },
  { main: 'Wear Pearl (Moti) after astrological consultation', sub: 'Pearl strengthens Chandra in the chart. Must be set in silver, worn on the little finger on Monday morning after puja.' },
  { main: 'Chant Chandra Beej Mantra 108 times', sub: 'Om Shraam Shreem Shraum Sah Chandramasay Namah. On a pearl or white sphatik mala, facing northwest, at dawn or dusk.' },
  { main: 'Offer water to the Moon on Purnima', sub: 'Standing outdoors, pour water mixed with raw milk toward the Moon while chanting the mantra. A classical Chandra Puja practice.' },
  { main: 'Feed white cows or donate white items', sub: 'White cow, white rice, white cloth, silver — all strengthen Chandra and calm emotional turbulence from Rohini afflictions.' },
  { main: 'Practice non-attachment in close relationships', sub: 'The deepest remedy for Rohini: recognizing that the longing is a spiritual quality, not a wound to be filled by another person.' },
  { main: 'Read Shri Sukta on Fridays', sub: 'Shri Sukta is dedicated to Lakshmi, the deity of abundance and the divine feminine that Rohini nakshatra most naturally embodies.' },
];
```

---

### SECTION 9 — FAQ Accordion (bg #FAF6EC, py-12)

Header: "Frequently Asked" (text-[#2A2438]) + "Questions" (text-[#D4A11E])
Both in font-kalam text-3xl, inline.

5 Q&As with useState for open/close. Match MeshaRashiPage FAQ accordion pattern exactly.
Left border: 3px solid #D4A11E on each item.
Chevron rotates 180 when open.

Q1: What does it mean to have Moon in Rohini nakshatra?
A1: Moon in Rohini is considered one of the most auspicious placements in Vedic astrology. Rohini is the Moon's own nakshatra, where his energy flows most naturally. Natives tend to be magnetically attractive, emotionally deep, artistically gifted, and strongly oriented toward beauty, comfort, and meaningful relationships. The shadow side is possessiveness and difficulty letting go.

Q2: Is Rohini nakshatra good or bad?
A2: Rohini is considered highly auspicious in Vedic tradition. Lord Krishna and Lord Rama are both said to have been born under Rohini nakshatra. The nakshatra carries the energy of fertility, abundance, beauty, and creative power. Challenges arise when Moon is afflicted by Saturn, Rahu, or Ketu, which can amplify attachment or emotional instability.

Q3: Which celebrities have Moon in Rohini nakshatra?
A3: According to classical Vedic texts, Lord Krishna was born under Rohini nakshatra, which is celebrated as Janmashtami. Lord Rama is also associated with Rohini. Among modern figures, several prominent artists, musicians, and political leaders are said to have strong Rohini placements, though individual chart verification is always needed.

Q4: What is the gemstone for Rohini nakshatra?
A4: Pearl (Moti) is the primary gemstone for strengthening the Moon and supporting Rohini nakshatra natives. It should be worn only after a proper consultation with a trained Jyotish practitioner who can verify the Moon's condition in your specific chart. White sphatik (crystal quartz) is a safe alternative that anyone can wear.

Q5: How does Rohini Moon affect marriage and relationships?
A5: Rohini Moon natives are deeply romantic and seek beauty and emotional depth in their partners. They are loyal and loving but can become possessive when insecure. A 7th house Rohini Moon often brings a very attractive or artistically gifted spouse. The key challenge is learning to love without clinging, which is the spiritual lesson Rohini teaches through the myth of Chandra.

---

### SECTION 10 — CTA Banner (gradient bg)

Background: linear-gradient(135deg, #D4A11E 0%, #F5EFD9 100%)

```tsx
<div className="py-16 px-6 text-center" style={{ background: 'linear-gradient(135deg, #D4A11E 0%, #F5EFD9 100%)' }}>
  <img src={WASHI_AMBER} alt="" width={200} height={40} className="mx-auto mb-6 opacity-70" aria-hidden="true" loading="lazy" />
  <h2 className="font-kalam text-3xl md:text-4xl text-[#2A2438] mb-4">Want a Personalised Rohini Reading?</h2>
  <p className="font-poppins text-base text-[#5C4A2A] max-w-xl mx-auto mb-8">
    Saurabh Jain at Soul Infinity reads your Moon placement, nakshatra pada, dasha timing,
    and planetary aspects to show exactly how Rohini expresses in your specific chart.
  </p>
  <a
    href="/contact#contact-form-section"
    className="inline-block bg-[#2A1810] text-[#FAF6EC] font-poppins font-semibold px-8 py-4 rounded-full text-base hover:bg-[#3d2515] transition-colors"
  >
    Book a Consultation
  </a>
</div>
```

---

## STEP 5 — SEO METADATA (react-helmet-async)

```tsx
<title>Moon in Rohini Nakshatra: Complete Vedic Guide | Soul Infinity</title>
<meta name="description" content="Rohini nakshatra is the Moon's most beloved placement. Complete guide to Moon in Rohini — mythology, characteristics, the 12 houses, remedies, and FAQ by K.N. Rao Institute trained astrologer Saurabh Jain." />
<link rel="canonical" href="https://www.soulinfinity.space/nakshatra/rohini" />
<meta property="og:title" content="Moon in Rohini Nakshatra: Complete Vedic Guide | Soul Infinity" />
<meta property="og:description" content="Complete Vedic guide to Rohini nakshatra — mythology, Moon placement effects, 12 houses, mantras, and classical remedies." />
<meta property="og:image" content="https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Nakshatra/Rohini/hero-banner-rohini.webp" />
<meta property="og:url" content="https://www.soulinfinity.space/nakshatra/rohini" />
<meta name="twitter:card" content="summary_large_image" />
```

---

## STEP 6 — JSON-LD SCHEMA

Single script tag. Three types: Article + FAQPage + BreadcrumbList.

Article:
- headline: "Moon in Rohini Nakshatra: Complete Vedic Guide"
- author: Saurabh Jain, url: https://www.soulinfinity.space/cosmic-guide
- publisher: Soul Infinity Astro Solutions
- datePublished: 2026-06-10
- image: HERO_IMAGE constant value
- url: https://www.soulinfinity.space/nakshatra/rohini

FAQPage: 5 questions matching Section 9 above.

BreadcrumbList:
- Position 1: Home
- Position 2: Nakshatras (https://www.soulinfinity.space/nakshatra)
- Position 3: Rohini Nakshatra

---

## STEP 7 — WIRE THE ROUTE

src/App.tsx:
```tsx
const RohiniNakshatraPage = lazy(() => import('./pages/nakshatra/RohiniNakshatraPage'));
<Route path="/nakshatra/rohini" element={<RohiniNakshatraPage />} />
```

scripts/prerender.mjs ROUTES array: add '/nakshatra/rohini'
scripts/generate-sitemap.mjs: add '/nakshatra/rohini'
scripts/generate-llms.mjs DESCRIPTIONS:
'/nakshatra/rohini': 'Complete Vedic guide to Moon in Rohini nakshatra — mythology, characteristics, effects in the 12 houses, mantras, classical remedies, and FAQ by Soul Infinity Astro Solutions.'

---

## STEP 8 — VALIDATION GATES

```bash
grep -n "—" src/pages/nakshatra/RohiniNakshatraPage.tsx    # must be empty
npm run build                                               # must pass
grep -c "nakshatra/rohini" dist/nakshatra/rohini/index.html # >= 1
grep -c '"@type":"Article"' dist/nakshatra/rohini/index.html  # >= 1
grep -c '"@type":"FAQPage"' dist/nakshatra/rohini/index.html  # >= 1
grep -c "<h1" dist/nakshatra/rohini/index.html             # must equal 1
```

---

## STEP 9 — COMMIT AND PUSH

```bash
git add -A
git commit -m "feat: Moon in Rohini Nakshatra page with warm cream palette and SVG decorators"
git push origin feature/rohini-nakshatra-page
```

Stop here. Do NOT merge to staging.
Write status to scripts/rohini-nakshatra-page-status.md and report.

---

## STOP CONDITIONS

- Build failure: stop, write error to status file
- Cannot find MeshaRashiPage.tsx: stop and report
- Any validation gate fails: stop and report
- Merge conflict: stop immediately
- Any dark navy/blue colors found: fix to warm equivalents before committing

---

## END OF BRIEF
