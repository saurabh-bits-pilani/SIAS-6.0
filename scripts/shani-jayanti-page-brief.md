# Shani Jayanti 2026 — Standalone .tsx Page Brief (Final)
# New branch: feature/shani-jayanti-page (branch off main)
# File: src/pages/festivals/ShaniJayantiPage.tsx
# Route: /shani-jayanti-2026
# Design: Match MeshaRashiPage.tsx structure exactly. Content = Shani Jayanti in English.

---

## CRITICAL RULES — CHECK EVERY LINE

- NO em-dashes anywhere. Use commas, colons, or split sentences.
- NO Gujarati script anywhere.
- NO emojis in code, JSX, or text.
- fetchpriority lowercase on hero img (never fetchPriority).
- Self-contained single .tsx file. No external data imports.
- All R2 URLs as inline constants at the top of the file.
- All Sanskrit/Devanagari text uses className="font-devanagari".
- Single H1 on the page (hero title only).
- After build: grep -n "—" src/pages/festivals/ShaniJayantiPage.tsx must return empty.

---

## STEP 1 — CREATE BRANCH

```bash
git checkout main
git pull origin main
git checkout -b feature/shani-jayanti-page
```

---

## STEP 2 — READ THE TEMPLATE FIRST

Before writing any code, read src/pages/zodiac/MeshaRashiPage.tsx fully.
Note: section order, CSS classes, font classes, color variables, image pattern, schema pattern.
This file is the layout source of truth. Match it exactly. Only content changes.

---

## STEP 3 — R2 IMAGE CONSTANTS (top of file)

```tsx
const HERO_IMAGE        = 'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Blog/shani-jayanti/hero-banner.webp';
const SCROLL_IMAGE      = 'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Blog/shani-jayanti/hero-banner.webp';
const QUICK_FACTS_IMAGE = 'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Blog/shani-jayanti/quick-fact.webp';
```

---

## STEP 4 — FULL PAGE CONTENT

### SECTION 1 — Hero Banner (~420px tall, full width)

- img src={HERO_IMAGE}, object-cover, w-full, h-[420px], fetchpriority="high"
- Gradient overlay div absolute inset-0: linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.72))
- H1 (font-caveat, text-4xl md:text-6xl, text-white, drop-shadow):
  "शनि जयंती 2026 — Shani Jayanti"
- Subtitle (font-poppins, text-white/80, text-base md:text-lg):
  "ज्येष्ठ अमावस्या · 16 May 2026 · Saturn's Sacred Birth Anniversary"
- Breadcrumb (font-poppins, text-sm, text-white/60):
  Home > Festivals > Shani Jayanti 2026
- Accent color throughout: Saturn dark blue #1e3a8a

---

### SECTION 2 — Quick Facts Strip (full width)

img src={QUICK_FACTS_IMAGE} width 100%, display block, no margin or padding.

Fallback if image does not render as strip — dark blue (#1e3a8a) bar with 5 pill columns:
Date: 16 May 2026 | Planet: Shani (Saturn) | Day: Saturday | Gemstone: Blue Sapphire | Metal: Iron

---

### SECTION 3 — About Section (cream bg #f5e6c8, two column)

LEFT COLUMN (55%):

Small header: "शनि जयंती / Shani Jayanti in Vedic Astrology"
font-kalam, text-xl, text-[#1e3a8a]

CARD 1 — "Lord Shani: The Planet of Karma and Justice"
Icon: Globe (lucide)
"Shani, known in Western astronomy as Saturn, is the slowest-moving of the Navagraha.
In Vedic astrology he governs karma, discipline, justice, and longevity. He rules Makara
(Capricorn) and Kumbha (Aquarius) and is exalted in Tula (Libra). Born of Surya and Chhaya,
his vehicle is the crow and his color is dark blue, representing the weight of karmic law
and the infinite expanse of time. Shani is not a planet of punishment. He is a strict but
fair teacher who rewards sustained effort, integrity, and service."

CARD 2 — "What is Shani Jayanti"
Icon: Calendar
"Shani Jayanti is the birth anniversary of Lord Shani. It falls on the Amavasya (new moon)
of the Hindu month of Jyeshtha. In 2026 this date is May 16th. This year it also falls on
a Saturday, which is Shani's own day. This double alignment is rare and makes any worship
performed on this day exceptionally potent compared to an ordinary Saturday."

CARD 3 — "Who Should Observe"
Icon: Users
"Shani Jayanti is especially important for those in Sade Sati (Saturn transiting the 12th,
1st, or 2nd house from natal Moon), those in Shani Mahadasha or Antardasha, those with
Makara or Kumbha Lagna where Shani is the ascendant lord, and anyone seeking karmic
clarity and long-term stability in their life."

CARD 4 — Soul Infinity Insight (cream card with dark blue left border #1e3a8a)
"In 15 years of practice, the clients who move through Sade Sati with grace are not those
who performed the most elaborate rituals. They are the ones who showed up, did their work,
and stopped expecting life to be effortless. Shani rewards exactly that.
— Saurabh Jain, K.N. Rao Institute"

RIGHT COLUMN (45%, sticky):

Quick Facts box (dark blue bg #1e3a8a, white text, font-poppins, rounded-xl):
- Date: 16 May 2026 (Saturday)
- Tithi: Jyeshtha Amavasya
- Planet: Shani (Saturn)
- Own Signs: Makara, Kumbha
- Exaltation: Tula (Libra)
- Gemstone: Blue Sapphire (Neelam)
- Metal: Iron (Loha)
- Worship Day: Saturday (Shanivar)
- Worship Direction: West (Paschim)
- Mantra: ॐ शं शनैश्चराय नमः  (font-devanagari)

WhatsApp button (amber bg #fbbf24, text-black, font-semibold, rounded-full, full width):
"Book Shani Consultation"
href="https://wa.me/919079053840"

Call button (outline border-2 border-[#1e3a8a], text-[#1e3a8a], rounded-full, full width, mt-3):
"Call Saurabh Jain"
href="tel:+919079053840"

---

### SECTION 4 — Mantra Section (full width, dark bg #0d1117)

Large centered Devanagari (font-devanagari, text-3xl md:text-5xl, text-amber-400):
ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः

IAST (font-poppins italic, text-white/80, text-lg, mt-4):
Om Praam Preem Praum Sah Shanaischaraya Namah

English meaning (font-poppins, text-white/60, text-base, mt-2):
"I bow to Shanaishchara (Saturn), the slow-moving one, born of the Sun and Chhaya,
who purifies through karma and time."

Chanting badge (amber border, amber text, small pill, mt-4):
"Chant 108 times on a black sphatik or iron mala, facing west, at dawn or dusk"

Divider line then simpler mantra:
Label (font-poppins, text-white/50, text-sm): "For daily practice:"
ॐ शं शनैश्चराय नमः  (font-devanagari, text-2xl, text-amber-300)
Om Shan Shanaischaraya Namah  (font-poppins italic, text-white/70)

---

### SECTION 5 — What to Do and What Shani Teaches (cream bg)

Header: "Why Shani Jayanti Matters"
Two column card layout matching MeshaRashiPage Characteristics section:

LEFT CARD — "What to Do on Shani Jayanti" (dark blue #1e3a8a card header):
6 rows, each with lucide icon + title + body:

Row 1 (Droplets): "Bathe before sunrise or after sunset"
"Most sources recommend Shani puja at dawn or dusk with a calm mind. Bathe with water
mixed with black sesame seeds. This is the opening act of purification for the day."

Row 2 (Flame): "Light a sesame oil lamp"
"Offer a til or mustard oil lamp, black sesame, and black cloth to Shani's idol or image.
A four-faced clay lamp (chaumukha diya) lit with mustard oil under a Peepal tree is
considered especially auspicious."

Row 3 (Music): "Chant mantra, Chalisa, and Stotra"
"Chant Om Shan Shanaischaraya Namah 108 times. Read the Shani Chalisa or the Dasharatha
Shani Stotra. Regular chanting is the simplest and strongest remedy for reducing Dhaiya
and Sade Sati effects over time."

Row 4 (Heart): "Fast if health permits"
"Fasting from sunrise to sunset, then breaking the fast after evening puja and dana with
fruit or simple sattvic food, is classically recommended for Shani Jayanti."

Row 5 (Package): "Donate Saturn-associated items"
"Black sesame, black cloth or blanket, iron vessel, black footwear, tea leaves, mustard
oil, urad dal. Give to a laborer, elderly person, someone differently-abled, or anyone in
genuine need. Give with sincerity, not as a transaction."

Row 6 (MapPin): "Worship the Peepal tree after sunset"
"Pour water mixed with raw milk on a Peepal tree. Light a sesame oil lamp. Walk around
it while chanting the mantra. This practice addresses both Shani dosha and Pitru dosha."

RIGHT CARD — "Serve the Living Embodiments of Saturn" (amber card header):
4 rows:

Row 1 (Users): "Feed the poor and laborers"
"Shani rules the working class and the dispossessed. Giving food to a blind person or
someone in extreme poverty is one of the most direct acts of Shani propitiation on this day."

Row 2 (PawPrint): "Feed a black dog, crows, and fish"
"Offer an oil-soaked roti to a black dog. Give grain to crows. Feed fish if near water.
This is described as reducing the negative effects of both Shani and Rahu."

Row 3 (Shield): "Observe a fast or partial fast"
"Even a partial fast, avoiding grains until sunset, carries weight if a complete fast is
not possible. The intention of surrender and simplicity matters more than the strictness."

Row 4 (Clock): "Perform Shani Shanti Puja if in Sade Sati"
"For those in Sade Sati or Shani Mahadasha, a structured Shani Shanti Puja performed by
a trained practitioner on this day carries exceptional weight and lasting effect."

Footer line (centered, font-caveat, italic, text-[#1e3a8a], text-xl):
"When you stop fighting Saturn's lessons and start learning from them, his grace arrives naturally."

---

### SECTION 6 — Puja Vidhi: 8 Steps (cream bg)

Header (font-kalam, text-3xl, text-[#1e3a8a]): "Shani Jayanti Puja Vidhi 2026"
Sub (font-poppins, text-sm tracking-widest, text-gray-500 uppercase):
"HOW TO PERFORM SHANI PUJA ON 16 MAY 2026"

4x2 grid of step cards matching MeshaRashiPage house cards:
Each: numbered badge dark blue + lucide icon + bold title + 2-line body

01 (Droplets) — Early Bath
"Wake before sunrise. Bathe with water mixed with black sesame seeds and a few drops of
sesame oil. Wear clean dark blue or black clothing."

02 (Flame) — Light the Lamp
"Light a til or mustard oil lamp facing west. Offer black sesame, black urad dal, and a
piece of black cloth to the Shani idol or image."

03 (Music) — Chant the Beej Mantra
"Om Praam Preem Praum Sah Shanaischaraya Namah, 108 times on a black sphatik or iron
mala. Do this slowly. Shani does not reward haste."

04 (BookOpen) — Read Shani Chalisa or Stotra
"Read the Shani Chalisa or the Dasharatha Shani Stotra. At minimum, one full reading.
The Dasharatha Stotra is especially effective for pacifying malefic Saturn."

05 (Package) — Give Dana
"Donate black sesame, black cloth, mustard oil, iron vessel, urad dal, tea leaves, or
black footwear to a laborer, elderly person, or someone in genuine need."

06 (PawPrint) — Serve Animals
"Offer an oil-soaked roti to a black dog. Give grain to crows. Feed fish if near water.
These are Shani's creatures."

07 (Leaf) — Peepal Tree Puja
"After sunset, pour water mixed with raw milk on a Peepal tree. Light a sesame oil lamp.
Walk around the tree chanting the mantra."

08 (Moon) — Break the Fast
"Break the fast after sunset with simple sattvic food. Avoid meat, alcohol, and excessively
spiced food throughout the entire day."

Footer note (font-poppins, italic, text-gray-500, text-sm, centered):
"If the full vidhi is not possible: do Steps 02, 03, and 05 with complete attention.
Shani values quality of intention over quantity of ritual."

---

### SECTION 7 — Simple Minimum Practice (full width, cream bg)

A full-width card with dark blue border (#1e3a8a), cream interior, three columns:

Header (font-kalam, text-2xl, text-[#1e3a8a], centered):
"If You Have Limited Time: The Essential Practice"

Column 1 — dark blue pill label "Morning or Evening":
- Bathe and wear dark blue or black clothing
- Light a til or mustard oil lamp at home or temple
- Chant Om Shan Shanaischaraya Namah 108 times
- Read Shani Chalisa once

Column 2 — amber pill label "During the Day":
- Give food or a useful item (black cloth, til, urad) to one poor person or laborer
- If possible, light a lamp on a Peepal tree and walk around it

Column 3 — dark red pill label "Avoid All Day":
- Meat, alcohol, lying, anger, insulting anyone
- Red flowers or red cloth in Shani puja
- Cutting hair or nails

Footer of card (font-poppins, italic, text-gray-500, text-sm, centered):
"Even this minimum, done with full sincerity, carries more weight with Shani than elaborate
rituals performed mechanically or out of fear."

---

### SECTION 8 — What NOT to Do (full width, dark bg #0d1117)

Header (font-kalam, text-3xl, text-white): "What NOT to Do on Shani Jayanti"
Sub (font-poppins, text-white/60, text-sm): "Saturn observes your conduct closely. These actions undermine the day's purpose."

8 warning cards in 2x4 grid, dark bg cards with dark red left border (#991b1b):
Each: lucide icon (amber) + bold title (white) + body (white/70)

1 (Scissors): "Do not cut hair or nails"
"Many classical teachers clearly state this is inauspicious on Shani Jayanti. It applies to
Amavasya generally and doubly so on this day."

2 (X): "Avoid red flowers and red clothing in puja"
"In Shani worship, red is not appropriate. Dark blue or black is correct. Red belongs to
Mangala (Mars), not to Shani."

3 (AlertCircle): "No meat, alcohol, or intoxicants"
"Stay completely away from meat, alcohol, eggs, cigarettes, and any intoxicant. Tamasic
substances weaken the effect of any worship performed on this day."

4 (Eye): "Do not look directly into Shani's eyes during puja"
"Stand slightly sideways to the idol rather than facing it directly. Direct eye contact is
considered disrespectful in this tradition."

5 (ShoppingCart): "Do not buy puja items on Shani Jayanti itself"
"Purchase mustard oil, sesame, and black cloth on Friday, the day before. Buying and
offering on Saturday is not considered correct in classical practice."

6 (UserX): "Do not turn away a beggar or laborer empty-handed"
"Dismissing a person in need who comes to your door on this day is considered to displease
Shani greatly. Give something to everyone who asks, however small."

7 (AlertTriangle): "Avoid lying, excessive anger, and injustice"
"Shani is the planet of karmic consequence. Speaking lies, taking what is not yours,
showing anger toward workers, or exploiting anyone is especially harmful today."

8 (Droplet): "Do not use a copper vessel to pour water or oil on Shani"
"Iron or steel vessels are preferred for offering water or oil in Shani puja. Copper is
associated with Surya and Mangala, not with Shani."

---

### SECTION 9 — Vedic Remedies (dark bg with image overlay)

Background: HERO_IMAGE with overlay div rgba(0,0,0,0.78) absolute inset-0.
If image background causes issues, use plain dark bg #0a0a1a.

7 remedy rows. Text on right side (padding 2% 3% 2% 38% on desktop, full width on mobile).
Each row: main text (white, font-semibold) + sub text (white/60, text-sm).

Row 01: Recite Shani Stotra every Saturday
Sub: Dasharatha Shani Stotra or Shani Chalisa. Consistent practice over months reduces
Sade Sati effects more reliably than occasional grand rituals.

Row 02: Donate black sesame, mustard oil, and iron items every Saturday
Sub: Give to laborers, the elderly, or those in need. Shani rules the working class.
Sincerity matters more than the quantity donated.

Row 03: Light a sesame oil lamp at a Shani temple every Saturday
Sub: Pour oil slowly onto the Shani idol from an iron or steel vessel. Observe silence.
Avoid asking for specific outcomes. Surrender is the correct posture.

Row 04: Feed a black dog, crows, and fish regularly
Sub: These are Shani's creatures. Feeding them with care and consistency calms both
Shani and Rahu influences over time.

Row 05: Worship the Peepal tree on Saturday evenings
Sub: Water mixed with raw milk, sesame oil lamp, circumambulation with mantra chanting.
Addresses both Shani dosha and Pitru dosha simultaneously.

Row 06: Wear Blue Sapphire (Neelam) only after astrological consultation
Sub: Neelam strengthens Saturn in the chart when correctly prescribed. It is a powerful
stone and must be recommended by a trained practitioner for your specific birth chart.

Row 07: Perform Shani Shanti Puja during Sade Sati or Shani Mahadasha
Sub: A structured puja by a K.N. Rao trained practitioner with correct Vedic timing.
Especially recommended at the beginning of Sade Sati.

---

### SECTION 10 — FAQ Accordion (cream bg)

Header: "Frequently Asked" (text-[#1e3a8a]) + "Questions" (text-amber-600)
5 Q&As with dark blue left border + chevron toggle (match MeshaRashiPage FAQ style exactly):

Q1: What is Shani Jayanti and when does it fall in 2026?
A1: Shani Jayanti is the birth anniversary of Lord Shani, the planet Saturn in Vedic astrology.
It falls on the Amavasya (new moon) of the Hindu month of Jyeshtha. In 2026 this date is
May 16th, which also falls on a Saturday. This double alignment of Shani's birth anniversary
and his own day makes 2026 Shani Jayanti exceptionally auspicious.

Q2: Which mantra should I chant on Shani Jayanti?
A2: The most powerful mantra is the Shani Beej Mantra: Om Praam Preem Praum Sah Shanaischaraya
Namah. Chant it 108 times on a black sphatik or iron mala, facing west, at dawn or dusk.
For daily practice, Om Shan Shanaischaraya Namah chanted 108 times is equally effective.

Q3: What should I donate on Shani Jayanti?
A3: The most auspicious donations are black sesame, black cloth or blanket, mustard oil, iron
vessel, urad dal, tea leaves, and black footwear. Give to a laborer, elderly person, or
someone in genuine need. Items should be purchased on Friday, not on Shani Jayanti itself.

Q4: Is Shani Jayanti especially important if I am in Sade Sati?
A4: Yes, significantly. For those in Sade Sati, Shani Jayanti is the most important day of
the year for Saturn worship. Consistent practice on this day and every Saturday, combined
with dana and service to laborers, eases Sade Sati considerably.

Q5: Can I get a personal reading for my Shani placement?
A5: Yes. A consultation at Soul Infinity Astro Solutions with Saurabh Jain covers your Saturn
placement, Sade Sati or Dhaiya status, current Mahadasha timing, and specific remedies for
your chart. Contact via WhatsApp at +91 9079053840 or through the contact form at
soulinfinity.space.

---

### SECTION 11 — CTA Banner (dark blue bg #1e3a8a)

H2 (font-caveat, text-3xl md:text-4xl, text-white):
"Want a Personalised Shani Reading?"

Body (font-poppins, text-white/80, max-w-xl mx-auto):
"Saurabh Jain at Soul Infinity Astro Solutions reads your Saturn placement, Sade Sati
status, and current Mahadasha to give you specific, actionable guidance for navigating
Shani's lessons with clarity and confidence."

Amber CTA button (rounded-full, font-poppins font-semibold, px-8 py-3):
"Book a Consultation"
href="/contact#contact-form-section"

---

## STEP 5 — SEO METADATA

```tsx
<title>Shani Jayanti 2026: Puja Vidhi, Significance and Remedies | Soul Infinity</title>
<meta name="description" content="Shani Jayanti 2026 falls on 16 May. Complete guide to puja vidhi, what to do, what not to do, donations, mantras, and remedies from K.N. Rao Institute trained Jyotish practitioner Saurabh Jain." />
<link rel="canonical" href="https://www.soulinfinity.space/shani-jayanti-2026" />
<meta property="og:title" content="Shani Jayanti 2026: Puja Vidhi, Significance and Remedies | Soul Infinity" />
<meta property="og:image" content="https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Blog/shani-jayanti/hero-banner.webp" />
<meta property="og:url" content="https://www.soulinfinity.space/shani-jayanti-2026" />
<meta name="twitter:card" content="summary_large_image" />
```

---

## STEP 6 — JSON-LD SCHEMA

Single script tag with Article + FAQPage + BreadcrumbList.

Article: headline, description, author (Saurabh Jain, url cosmic-guide), publisher
(Soul Infinity Astro Solutions), datePublished 2026-05-16, image HERO_IMAGE,
url https://www.soulinfinity.space/shani-jayanti-2026

FAQPage: 5 questions matching the FAQ accordion above.

BreadcrumbList: Home (position 1) > Shani Jayanti 2026 (position 2).

---

## STEP 7 — WIRE THE ROUTE

src/App.tsx:
```tsx
const ShaniJayantiPage = lazy(() => import('./pages/festivals/ShaniJayantiPage'));
<Route path="/shani-jayanti-2026" element={<ShaniJayantiPage />} />
```

scripts/prerender.mjs ROUTES array: add '/shani-jayanti-2026'
scripts/generate-sitemap.mjs: add '/shani-jayanti-2026' if routes listed manually
scripts/generate-llms.mjs DESCRIPTIONS:
'/shani-jayanti-2026': 'Complete guide to Shani Jayanti 2026 on May 16 including significance, puja vidhi, mantras, donations, dos and donts, and Vedic remedies from Soul Infinity Astro Solutions.'

---

## STEP 8 — VALIDATION GATES

```bash
grep -n "—" src/pages/festivals/ShaniJayantiPage.tsx               # must be empty
npm run build                                                        # must pass
grep -c "shani-jayanti-2026" dist/shani-jayanti-2026/index.html    # >= 1
grep -c '"@type":"Article"' dist/shani-jayanti-2026/index.html     # >= 1
grep -c '"@type":"FAQPage"' dist/shani-jayanti-2026/index.html     # >= 1
grep -c "<h1" dist/shani-jayanti-2026/index.html                   # must equal 1
```

---

## STEP 9 — COMMIT AND PUSH

```bash
git add -A
git commit -m "feat: Shani Jayanti 2026 standalone page matching zodiac page structure"
git push origin feature/shani-jayanti-page
```

Stop here. Do NOT merge to staging.
Write status to scripts/shani-jayanti-page-status.md and report.

---

## STOP CONDITIONS

- Build failure: stop, write error to status file
- Cannot find MeshaRashiPage.tsx: stop and report
- Any validation gate fails: stop and report
- Merge conflict: stop immediately

---

## END OF BRIEF
