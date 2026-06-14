# Brief: Rohini Nakshatra Blog Pages (3 TSX Pages)
# Files:
#   src/pages/blog/RohiniNakshatraFemalePage.tsx
#   src/pages/blog/RohiniNakshatraMalePage.tsx
#   src/pages/blog/RohiniNakshatraPadasPage.tsx
# Routes:
#   /blog/rohini-nakshatra-female
#   /blog/rohini-nakshatra-male
#   /blog/rohini-nakshatra-padas
# Branch: feature/blog-rohini-trio
# Pattern: Copy ShaniJayantiPage.tsx structure exactly
# Reference: src/pages/nakshatra/RohiniNakshatraPage.tsx for Rohini content

---

## STEP 1 — SETUP

```bash
git checkout main && git pull origin main
git checkout -b feature/blog-rohini-trio
```

Read these files fully before writing any code:
- src/pages/festivals/ShaniJayantiPage.tsx (layout pattern)
- src/pages/nakshatra/RohiniNakshatraPage.tsx (Rohini content reference)
- src/pages/Blog.tsx (card pattern)

---

## SHARED CONSTANTS (use in all 3 pages)

```tsx
const R2 = 'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev';
const ACCENT = '#D4A11E'; // amber gold
const DARK_BG = '#2A1810'; // warm dark brown
const CREAM = '#FAF6EC';
const CARD_BG = '#FFF9ED';
```

---

## PAGE 1: RohiniNakshatraFemalePage.tsx
## Route: /blog/rohini-nakshatra-female

### Image constants:
```tsx
const HERO_IMAGE = `${R2}/Blog/rohini-nakshatra-female/hero-banner.webp`;
const ROHINI_HERO = `${R2}/Nakshatra/Rohini/hero-banner-rohini.webp`;
```

### SEO:
- title: "Rohini Nakshatra Female: Personality, Love and Career | Soul Infinity"
- description: "Rohini nakshatra female personality, marriage compatibility, career strengths and shadow patterns explained by K.N. Rao Institute trained astrologer Saurabh Jain."
- canonical: https://www.soulinfinity.space/blog/rohini-nakshatra-female

### Sections (top to bottom):

**Section 1 — Hero**
- Full-width HERO_IMAGE (object-cover, h-72 md:h-96)
- Dark overlay bg-black/60
- Category pill: "Vedic Astrology" (amber bg)
- H1: "Rohini Nakshatra Female" (font-caveat, text-5xl md:text-7xl, white)
- Subtitle: "Personality, Love and Career in Vedic Astrology" (font-poppins, white/80)
- Meta: "Jun 16, 2026 · 7 min read · By Saurabh Jain, K.N. Rao Institute"
- Breadcrumb: Home > Blog > Rohini Nakshatra Female

**Section 2 — TL;DR box** (cream bg)
- Gold left border card
- Text: "The Rohini nakshatra female is magnetically beautiful, deeply loyal, and artistically gifted. Her greatest strength is her capacity for love. Her greatest challenge is learning to love without possessiveness. Moon in Rohini from 10 to 23 degrees 20 minutes of Taurus."

**Section 3 — Personality (cream bg)**
- H2: "Rohini Nakshatra Female Personality"
- Definition block opening: "Rohini nakshatra female personality is defined by beauty, longing, and abundance..."
- 3 content paragraphs
- Sidebar insight card (amber border): "Rohini is the nakshatra of longing itself. The female native remembers something she once had and is always reaching for it again. — Saurabh Jain"

**Section 4 — Characteristics grid (cream bg)**
- H2: "Strengths and Shadow Patterns"
- Two-column card layout:

Left card (green header): "Natural Gifts of Rohini Female"
6 items with checkmark icons:
- Magnetically beautiful and naturally charming
- Deeply loyal and emotionally affectionate
- Highly creative with strong artistic gifts
- Fertile imagination and aesthetic refinement
- Natural ability to attract abundance
- Nurturing, caring, and emotionally intuitive

Right card (red header): "Shadows to Navigate"
4 items with warning icons:
- Emotional possessiveness and jealousy
- Over-attachment to comfort and pleasure
- Mood swings during lunar cycle
- Indulgence under Saturn or Rahu affliction

**Section 5 — Love and Marriage (dark bg #2A1810)**
- H2: "Rohini Female in Love and Marriage" (font-kalam, amber)
- 3 cards side by side:

Card 1: "How She Loves"
"She does not approach relationships casually. When she loves, she loves with her whole emotional body and expects the same in return."

Card 2: "What She Needs"
"Reassurance, beauty in her environment, and the experience of being deeply valued. When these are present she is among the most devoted partners."

Card 3: "The Shadow"
"Jealousy and possessiveness when Moon is aspected by Rahu, Ketu, or Saturn. Recognition of this pattern is the first step toward transformation."

**Section 6 — Career (cream bg)**
- H2: "Career and Finances"
- Intro paragraph
- 6-column grid of career cards (icon + label):
  - Fashion Design
  - Interior Decoration
  - Music and Arts
  - Hospitality
  - Counseling
  - Culinary Arts

**Section 7 — Remedies (dark image bg)**
- Use ROHINI_HERO as bg with bg-black/60 overlay
- H2: "Remedies for Rohini Nakshatra Females" (amber, font-kalam)
- 4 remedy rows (number + title + subtitle):
  01 — Worship Lord Chandra on Mondays / Offer white flowers and milk
  02 — Wear Pearl (Moti) after astrological consultation / Set in silver, little finger, Monday morning
  03 — Chant Chandra Beej Mantra 108 times / Om Shraam Shreem Shraum Sah Chandramasay Namah
  04 — Practice non-attachment / The deepest remedy: love freely rather than possessively

**Section 8 — FAQ Accordion (cream bg)**
- H2: "Frequently Asked Questions" (font-kalam)
- 5 accordion items with amber left border on open:
  Q1: What is the personality of a Rohini nakshatra female?
  A1: A Rohini nakshatra female is naturally beautiful, emotionally deep, artistically gifted, and possesses a magnetic charm that draws people instinctively. She is deeply loyal and nurturing in relationships but can become intensely possessive when insecure.

  Q2: Is Rohini nakshatra female lucky in marriage?
  A2: Rohini nakshatra females tend to attract devoted partners and generally experience fulfilling marriages when Moon is well-placed. The key challenge is the tendency toward possessiveness, which when managed with awareness transforms into deep loyalty.

  Q3: Which careers suit Rohini nakshatra females?
  A3: Rohini nakshatra females excel in careers involving beauty, creativity, aesthetics, or emotional connection. Fashion design, interior decoration, music, dance, acting, photography, cooking, hospitality, and counseling all suit this nakshatra.

  Q4: What are the weaknesses of Rohini nakshatra females?
  A4: The primary weakness is possessiveness in relationships, which can create controlling dynamics if Saturn or Rahu afflicts the Moon. Over-attachment to comfort and sensory pleasure can lead to difficulty with necessary change or discipline.

  Q5: Which nakshatra is most compatible with Rohini female?
  A5: The most compatible nakshatras are Ardra, Mrigashira, and Hasta in classical compatibility analysis. Uttaraphalguni also tends to work well. The compatibility assessment should always consider the complete chart, not just Moon nakshatra alone.

**Section 9 — CTA Banner (amber gradient)**
- H2: "Get a Personal Rohini Reading" (font-caveat, dark)
- Body: "Saurabh Jain at Soul Infinity Astro Solutions reads your Moon placement, nakshatra pada, dasha timing, and planetary aspects to show exactly how Rohini expresses in your specific chart."
- WhatsApp button → https://wa.me/919079053840
- Internal link: "Read Complete Rohini Guide" → /nakshatra/rohini

### JSON-LD schemas:
- Article (headline, datePublished: 2026-06-16, author: Saurabh Jain)
- FAQPage (5 Q&A pairs from above)
- BreadcrumbList (Home > Blog > Rohini Nakshatra Female)

---

## PAGE 2: RohiniNakshatraMalePage.tsx
## Route: /blog/rohini-nakshatra-male

### Image constants:
```tsx
const HERO_IMAGE = `${R2}/Blog/rohini-nakshatra-male/hero-banner.webp`;
```

### SEO:
- title: "Rohini Nakshatra Male: Personality, Career and Compatibility | Soul Infinity"
- description: "Rohini nakshatra male personality, career strengths, romantic nature, and compatibility explained by K.N. Rao Institute trained astrologer Saurabh Jain."
- canonical: https://www.soulinfinity.space/blog/rohini-nakshatra-male

### Sections — same structure as Female page with these content changes:

**Hero H1:** "Rohini Nakshatra Male"
**Hero Subtitle:** "Personality, Career and Compatibility in Vedic Astrology"
**Meta date:** Jun 17, 2026

**TL;DR:** "The Rohini nakshatra male is charming, creative, emotionally deep, and naturally magnetic. He is among the most romantically expressive nakshatra placements. His shadow is possessiveness. Moon in Rohini from 10 to 23 degrees 20 minutes of Taurus."

**Section 3 — Personality:**
"The rohini nakshatra male personality is defined by charm, creativity, and emotional depth. Moon in Rohini gives a native who appreciates beauty, creates comfort wherever he goes, and possesses a natural ease in social situations."
- Insight card: "He is not naturally confrontational. He shows love through acts of care, beautiful experiences, and being reliably present. — Saurabh Jain"

**Section 4 — Characteristics:**
Left card: "Natural Gifts of Rohini Male"
- Well-groomed, naturally stylish, aesthetically refined
- Warm manner that makes others feel genuinely valued
- Remembers details about people and relationships
- Creatively ambitious with strong financial instincts
- Devoted and tender in committed relationships
- Excellent in roles requiring genuine human connection

Right card: "Challenges to Navigate"
- Possessiveness that can cross into control
- Over-indulgence in food, comfort, and pleasure
- Difficulty with austerity and necessary discipline
- Avoiding conflict rather than addressing it directly

**Section 5 — Love and Marriage:**
Card 1: "How He Loves" — "He does not pursue relationships casually. When he commits, he commits deeply. His romantic nature is genuinely tender."
Card 2: "What He Needs" — "A partner who values beauty and depth equally, who holds steady through his emotional intensity."
Card 3: "The Shadow" — "The possessiveness of Rohini mythology. He can become jealous or unable to allow his partner the freedom they need."

**Section 6 — Career:**
Same 6 career cards:
- Music and Arts
- Photography
- Filmmaking
- Culinary Arts
- Luxury Retail
- Counseling

**Section 7 — Remedies:** Same 4 remedies as female page

**Section 8 — FAQ:**
Q1: What is the personality of a Rohini nakshatra male?
A1: A Rohini nakshatra male is naturally charming, artistic, emotionally deep, and possesses a magnetic quality. He tends to be pleasure-loving, aesthetically refined, and strongly oriented toward beauty. Classical texts describe him as naturally attractive and well-spoken.

Q2: Is Rohini nakshatra male romantic or possessive?
A2: Both. The rohini nakshatra male is among the most romantically expressive placements, capable of deep devotion and extraordinary tenderness. The shadow is possessiveness, mirroring the Chandra mythology where the Moon spent all his time with Rohini.

Q3: Which careers are best for Rohini nakshatra males?
A3: Rohini nakshatra males excel in careers where aesthetic refinement and relationship skills matter. Music, filmmaking, photography, design, culinary arts, luxury retail, hospitality, and counseling are all strong fits.

Q4: What challenges do Rohini nakshatra males face?
A4: The primary challenges are possessiveness in relationships, over-attachment to comfort and pleasure, and difficulty with necessary discipline. Career challenges often arise from avoiding conflict rather than addressing it directly.

Q5: Which nakshatra females are most compatible with Rohini males?
A5: Mrigashira, Hasta, and Uttaraphalguni nakshatra females tend to be highly compatible with Rohini males in classical Vedic matching. The assessment should always consider the full birth chart, not just Moon nakshatra.

**Section 9 — CTA:**
Same as female page but text: "Get a Personal Rohini Chart Reading"

### JSON-LD schemas:
- Article (datePublished: 2026-06-17)
- FAQPage (5 Q&A pairs)
- BreadcrumbList

---

## PAGE 3: RohiniNakshatraPadasPage.tsx
## Route: /blog/rohini-nakshatra-padas

### Image constants:
```tsx
const HERO_IMAGE = `${R2}/Blog/rohini-nakshatra-padas/hero-banner.webp`;
```

### SEO:
- title: "The 4 Padas of Rohini Nakshatra: Complete Guide | Soul Infinity"
- description: "All 4 padas of Rohini nakshatra explained. Navamsha lords, traits, and effects of each pada by K.N. Rao Institute trained astrologer Saurabh Jain."
- canonical: https://www.soulinfinity.space/blog/rohini-nakshatra-padas

### Sections:

**Hero H1:** "The 4 Padas of Rohini Nakshatra"
**Hero Subtitle:** "What Each Pada Means for Your Moon Placement"
**Meta date:** Jun 18, 2026

**TL;DR:** "Each of the 4 padas of Rohini nakshatra carries a different navamsha lord that modifies how the Moon expresses. Pada 1 (Mars), Pada 2 (Venus), Pada 3 (Mercury), Pada 4 (Moon) — each creates a distinctly different personality despite sharing the same nakshatra."

**Section 3 — What is a Pada? (cream bg)**
- H2: "What is a Nakshatra Pada?"
- Definition block: "A pada is one quarter of a nakshatra..."
- 2 content paragraphs explaining the pada system

**Section 4 — The 4 Padas Grid (replaces characteristics)**
4 large cards in 2x2 grid, each with:
- Pada number (large amber)
- Degree range
- Navamsha lord
- Key traits (3-4 bullet points)
- One insight line

**Pada 1 card (Mars navamsha, amber border):**
- Degrees: 10 to 13.20 Taurus
- Lord: Mars
- Traits: More assertive and action-oriented, creative ambition, entrepreneurial drive, willing to take risks
- Insight: "Rohini's beauty meets Mars's drive. This native pursues aesthetics with ambition."

**Pada 2 card (Venus navamsha, pink border):**
- Degrees: 13.20 to 16.40 Taurus
- Lord: Venus
- Traits: Most aesthetically refined, double Venus influence, exceptional artistic talent, deepest romantic expression
- Insight: "The most beautiful expression of Rohini. Venus amplifies every Rohini quality."

**Pada 3 card (Mercury navamsha, green border):**
- Degrees: 16.40 to 20 Taurus
- Lord: Mercury
- Traits: Articulate about emotional world, writers and communicators, combines feeling with intellect, more flexible in relationships
- Insight: "Moon's emotional depth meets Mercury's wit. This native can both feel and express deeply."

**Pada 4 card (Moon navamsha, blue border):**
- Degrees: 20 to 23.20 Taurus
- Lord: Moon
- Traits: Double Moon influence, most intense emotional depth, exceptional creative gifts, spiritual practice essential
- Insight: "All Rohini qualities amplified. The shadow patterns are also most pronounced here."

**Section 5 — Comparison table (dark bg)**
- H2: "Pada Comparison at a Glance"
- Table: 4 columns (Pada 1-4), rows: Lord, Navamsha Sign, Primary Quality, Best Career, Key Challenge

| | Pada 1 | Pada 2 | Pada 3 | Pada 4 |
|---|---|---|---|---|
| Lord | Mars | Venus | Mercury | Moon |
| Sign | Aries | Taurus | Gemini | Cancer |
| Quality | Ambitious | Aesthetic | Articulate | Intuitive |
| Career | Creative entrepreneurship | Arts, luxury | Writing, teaching | Healing, spiritual |
| Challenge | Impulsiveness | Over-indulgence | Over-thinking | Emotional intensity |

**Section 6 — How to Find Your Pada (cream bg)**
- H2: "How to Find Your Rohini Pada"
- 4 step cards:
  Step 1: Get your exact birth time and place
  Step 2: Calculate your Moon degree in your Vedic birth chart
  Step 3: Check if Moon is between 10 and 23.20 degrees Taurus
  Step 4: Match the degree range to the pada above

**Section 7 — Remedies (same as other pages)**

**Section 8 — FAQ:**
Q1: What is a pada in Vedic astrology?
A1: A pada is one quarter of a nakshatra. Each nakshatra spans 13 degrees 20 minutes and is divided into 4 padas of 3 degrees 20 minutes each. Each pada corresponds to a navamsha sign, which gives the pada its lord and modifies the expression of the nakshatra's energy significantly.

Q2: Which pada of Rohini nakshatra is most powerful?
A2: Rohini pada 1 (Mars) is strongest for material achievement. Rohini pada 2 (Venus) is the most aesthetically gifted expression. Rohini pada 4 (Moon) creates a double Moon influence that intensifies both the gifts and the emotional challenges of this nakshatra.

Q3: What is the lord of each Rohini nakshatra pada?
A3: Rohini pada 1 has Mars as navamsha lord. Rohini pada 2 has Venus. Rohini pada 3 has Mercury. Rohini pada 4 has the Moon as navamsha lord, creating an intense double Moon placement.

Q4: How does Rohini pada 4 differ from the others?
A4: Rohini pada 4 falls in the Moon's own navamsha, creating an intense double Moon placement. This amplifies all Rohini's qualities of beauty, longing, and emotional depth to their highest expression. Spiritual practice is particularly important for pada 4 natives.

Q5: How do I find out which pada of Rohini my Moon is in?
A5: If Moon is between 10 and 13.20 degrees Taurus you are pada 1. Between 13.20 and 16.40 is pada 2. Between 16.40 and 20 is pada 3. Between 20 and 23.20 is pada 4. A Vedic astrology consultation will calculate this precisely from your birth data.

**Section 9 — CTA:**
H2: "Find Your Rohini Pada"
Body: "Saurabh Jain reads your exact Moon degree, nakshatra pada, navamsha lord, and current dasha to give you a precise reading of how Rohini expresses in your specific chart."

### JSON-LD:
- Article (datePublished: 2026-06-18)
- FAQPage
- BreadcrumbList

---

## STEP 5 — WIRE ALL 3 ROUTES

**src/App.tsx** — add 3 lazy imports and routes:
```tsx
const RohiniNakshatraFemalePage = lazy(() => import('./pages/blog/RohiniNakshatraFemalePage'));
const RohiniNakshatraMalePage = lazy(() => import('./pages/blog/RohiniNakshatraMalePage'));
const RohiniNakshatraPadasPage = lazy(() => import('./pages/blog/RohiniNakshatraPadasPage'));

<Route path="/blog/rohini-nakshatra-female" element={<RohiniNakshatraFemalePage />} />
<Route path="/blog/rohini-nakshatra-male" element={<RohiniNakshatraMalePage />} />
<Route path="/blog/rohini-nakshatra-padas" element={<RohiniNakshatraPadasPage />} />
```

Place these ABOVE the BlogPost catch-all route.

**scripts/prerender.mjs** — these routes are already in ROUTES from the MDX batch. No changes needed.

**scripts/generate-llms.mjs** — update descriptions for all 3 slugs.

---

## STEP 6 — VALIDATION

```bash
grep -rn "—" src/pages/blog/Rohini*.tsx  # must be empty
npm run build  # must pass
grep -c '"@type":"Article"' dist/blog/rohini-nakshatra-female/index.html  # >= 1
grep -c '"@type":"FAQPage"' dist/blog/rohini-nakshatra-female/index.html  # >= 1
grep -c "<h1" dist/blog/rohini-nakshatra-female/index.html  # must equal 1
grep -c "<h1" dist/blog/rohini-nakshatra-male/index.html  # must equal 1
grep -c "<h1" dist/blog/rohini-nakshatra-padas/index.html  # must equal 1
```

---

## STEP 7 — COMMIT AND PUSH

```bash
git add src/pages/blog/ src/App.tsx scripts/generate-llms.mjs
git commit -m "feat: Rohini nakshatra female, male, and padas blog pages with full magazine layout"
git push origin feature/blog-rohini-trio
```

Stop. Report SHA. Do NOT merge to staging yet.

---

## HARD RULES
- NO em-dashes anywhere
- NO Gujarati, NO emojis in JSX
- fetchpriority lowercase on hero img
- Self-contained single .tsx per page
- Dark sections always use #2A1810, never navy
- All CTAs route to WhatsApp
- Copy ShaniJayantiPage.tsx layout exactly — do not invent new layouts
