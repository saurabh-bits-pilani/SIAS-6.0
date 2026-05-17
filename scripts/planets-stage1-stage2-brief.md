# Planet Pages Rebuild — Master Brief
## Stage 1 (Active) + Stage 2 (Deferred)

---

## Objective

Rebuild all 8 remaining planet pages to match the editorial layout of `SunPage.tsx`.

Stage 1: Structure and content only. No new background images.
Stage 2: Background image pass. Blocked until Stage 1 visual approval on staging.

---

## Source Template

```
src/pages/planets/SunPage.tsx
```

Read this file completely before writing any code.
It is the single source of truth for layout, component patterns, Tailwind classes,
animation setup, data structure, and import order.

---

## Stage 1 — Implementation Scope (Active Now)

### Target Files

```
src/pages/planets/MoonPage.tsx
src/pages/planets/MarsPage.tsx
src/pages/planets/MercuryPage.tsx
src/pages/planets/JupiterPage.tsx
src/pages/planets/VenusPage.tsx
src/pages/planets/SaturnPage.tsx
src/pages/planets/RahuPage.tsx
src/pages/planets/KetuPage.tsx
```

### Shared Section Order (all 8 pages, same order as SunPage)

```
1. Hero
   - Full bleed section
   - Planet deity art pinned right (use existing R2 hero image for each planet)
   - Left side: breadcrumb, title in font-caveat, subtitle in font-caveat, description
   - 3 keywords wrapped in HighlightStroke, UnderlineScribble, CircleCallout
   - Import doodle components from src/components/doodles/

2. Attributes Bar
   - 5 planet-specific qualities
   - Phosphor icons, weight="duotone"
   - Gold dividers between items
   - bg-[#0B1120] placeholder

3. Three-Column Card Row
   - Card A: Sacred Mantra (2 mantras, Devanagari box, IAST, meaning)
   - Card B: Planet in Our Life (key-value list)
   - Card C: Connect CTA (dark card, amber button to /services)
   - Cards: bg-white border border-[accent]/20 rounded-2xl floating shadow

4. How to Connect
   - 5 numbered steps (01-05)
   - Phosphor icons per step
   - bg-[#0B1120] placeholder

5. Gemstone Card
   - Split layout: image left, bullets right
   - Use existing gemstone image from R2 if available, else styled placeholder div
   - bg-white border border-[accent]/20 rounded-2xl

6. Affirmation Banner
   - Full width, bg-[#0B1120] placeholder
   - Caveat font, italic, centered quote
   - Decorative dividers above and below

7. Navagraha Strip
   - Embla carousel (already installed)
   - All 9 planets, current planet highlighted with accent color ring
   - Use existing R2 hero images: https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Pillar/Hub/Planets/

8. FAQ + Sidebar (two-column)
   - Left: 4 accordion FAQ questions (planet-specific rewrites, NOT copied from existing pages)
   - Include 12-house grid inside question 3 (same grid pattern as SunPage)
   - Right: 7 stacked accordion sidebar cards
   - Parchment bg on section wrapper: bg-[#fdf6e9]

9. Footer CTA
   - Full width, bg-[#0B1120] placeholder
   - Caveat font heading
   - Subheading in Poppins
   - Button: "Explore Personalized Remedies" linking to /contact
```

### Background Placeholders (Stage 1)

```
All dark sections:  bg-[#0B1120]
All light cards:    bg-white border border-[accent-color]/20 rounded-2xl
Section wrapper:    bg-[#fdf6e9] for FAQ section
No backgroundImage inline styles in Stage 1
```

### Planet Accent Colors

```tsx
const accentColors = {
  moon:    '#C0C0C0',
  mars:    '#E8472A',
  mercury: '#4CAF72',
  jupiter: '#F5A623',
  venus:   '#E86BA0',
  saturn:  '#4A6FA5',
  rahu:    '#7B5EA7',
  ketu:    '#8B4A4A',
}
```

---

## Planet Data Blocks

---

### 1. MOON — MoonPage.tsx

```
route:    /planets/moon
title:    Chandra
subtitle: The Luminous Moon
description: The source of mind, emotion, and inner reflection.
keywords: mind | emotions | intuition
accent:   #C0C0C0

ATTRIBUTES:
  Soul icon     → Mind / Manas
  Heart icon    → Emotions / Bhava
  Eye icon      → Intuition / Bodha
  Leaf icon     → Nurturing / Poshana
  Moon icon     → Reflection / Pratibimba

MANTRAS:
  1. Chandra Beeja Mantra
     Devanagari: ॐ सों सोमाय नमः ।
     IAST: Om Som Somaya Namah
     Meaning: We bow to Chandra, the luminous one, who governs the mind and nourishes all life.

  2. Chandra Gayatri Mantra
     Devanagari: ॐ क्षीरपुत्राय विद्महे अमृततत्त्वाय धीमहि । तन्नो चन्द्रः प्रचोदयात् ॥
     IAST: Om Kshiraputraya Vidmahe Amritattvaya Dhimahi | Tanno Chandrah Prachodayat
     Meaning: We meditate on the son of the ocean of milk, the essence of nectar. May the Moon illuminate our mind.

LIFE FACTS:
  Day: Monday (Somavar)
  Direction: Northwest
  Metal: Silver
  Gemstone: Pearl (Moti)
  Color: White, Silver
  Element: Water
  Dosha Influence: Vata
  Guna: Sattva
  Body Part: Mind, Blood, Lungs
  Life Area: Mother, Emotions, Home

CONNECT STEPS:
  01 Offer water to the Moon on Purnima
  02 Chant Chandra mantras at night
  03 Wear Pearl on Monday
  04 Practice meditation at moonrise
  05 Honor mother and maternal figures

GEMSTONE: Pearl (Moti)
  - Calms mind and emotional turbulence
  - Enhances intuition and creative sensitivity
  - Supports hormonal balance and peaceful sleep

AFFIRMATION: I am calm, receptive, and deeply connected to my inner world.

FAQ:
  Q1: Who is Chandra in Vedic Astrology?
  Chandra is the Moon, ruler of the mind and the most personal of the Navagraha. He governs
  our subconscious patterns, emotional responses, and relationship with our mother. A strong
  Chandra brings emotional stability, nurturing qualities, and a calm, receptive mind. When
  Chandra is weak or afflicted, it can cause anxiety, mood instability, and mental unrest.

  Q2: What does the Moon represent in a birth chart?
  The Moon represents your mind, emotional nature, and instinctive responses. It shows how you
  process feelings, your need for security, and your relationship with your mother and home.
  It also reflects your subconscious habits and the way you nurture others.

  Q3: What is the significance of Moon in the 12 Houses?
  [include 12-house grid — same pattern as SunPage question 3]
  The Moon's placement reveals where your emotional focus and nurturing energy flow in life.

  Q4: Moon Dasha: Emotions, Relationships, and Inner Life
  During Chandra Mahadasha, themes of emotional healing, home, family, and inner reflection
  become prominent. It is a deeply nurturing and introspective period where feelings take
  center stage and relationships with mother and home become significant.

SIDEBAR:
  Zodiac Sign:           Rules Cancer (Karka Rashi)
  Exalted (Uchcha):      Taurus (3°)
  Debilitated (Neecha):  Scorpio (3°)
  Best Time:             Monday, Purnima, Shukla Paksha
  Drishti (Aspect):      7th aspect
  When balanced:         Emotional stability, strong intuition, nurturing and compassionate presence
  When afflicted:        Anxiety, mood swings, dependency issues, and mental unrest

FOOTER:
  Heading:    Let your inner light shine like the Moon.
  Subheading: Embrace the energy of Chandra and find peace, clarity, and emotional wholeness.
```

---

### 2. MARS — MarsPage.tsx

```
route:    /planets/mars
title:    Mangala
subtitle: The Warrior Planet
description: The source of courage, strength, and fearless action.
keywords: courage | energy | action
accent:   #E8472A

ATTRIBUTES:
  Shield icon   → Courage / Shaurya
  Zap icon      → Energy / Shakti
  Target icon   → Action / Karma
  Barbell icon  → Strength / Bala
  Flame icon    → Will / Sankalpa

MANTRAS:
  1. Mangala Beeja Mantra
     Devanagari: ॐ अं अंगारकाय नमः ।
     IAST: Om Am Angarakaya Namah
     Meaning: We bow to Mangala, the fiery one, who grants courage, strength, and the power to act.

  2. Mangala Gayatri Mantra
     Devanagari: ॐ वीरध्वजाय विद्महे विघ्नहस्ताय धीमहि । तन्नो भौमः प्रचोदयात् ॥
     IAST: Om Viradhvajaya Vidmahe Vignahastaya Dhimahi | Tanno Bhaumah Prachodayat
     Meaning: We meditate on the red-bannered warrior, the remover of obstacles. May Mars ignite our courage and purpose.

LIFE FACTS:
  Day: Tuesday (Mangalvar)
  Direction: South
  Metal: Copper
  Gemstone: Red Coral (Moonga)
  Color: Red, Saffron
  Element: Fire
  Dosha Influence: Pitta
  Guna: Tamas-Rajas
  Body Part: Blood, Muscles, Bone Marrow
  Life Area: Courage, Siblings, Property

CONNECT STEPS:
  01 Offer red flowers at sunrise on Tuesday
  02 Chant Mangala mantras with strength and focus
  03 Wear Red Coral on Tuesday
  04 Practice physical exercise and discipline daily
  05 Serve soldiers and those who protect others

GEMSTONE: Red Coral (Moonga)
  - Boosts courage, confidence, and vitality
  - Enhances physical strength and stamina
  - Protects from enemies and negative energies

AFFIRMATION: I act with courage, strength, and unwavering purpose.

FAQ:
  Q1: Who is Mangala in Vedic Astrology?
  Mangala is Mars, the warrior among the Navagraha and commander of the celestial army. He
  represents courage, physical energy, willpower, and the drive to act decisively. A strong
  Mars brings confidence, discipline, and natural leadership. When afflicted, it can bring
  aggression, impulsiveness, accidents, and conflict.

  Q2: What does Mars represent in a birth chart?
  Mars shows your courage, ambition, physical strength, and how you pursue your desires. It
  governs your competitive drive, relationship with siblings, property and land, and your
  capacity for bold and decisive action in the world.

  Q3: What is the significance of Mars in the 12 Houses?
  [include 12-house grid — same pattern as SunPage question 3]
  Mars in different houses shapes your warrior energy and drive across all areas of life.

  Q4: Mars Dasha: Action, Ambition, and Transformation
  During Mangala Mahadasha, themes of physical vitality, property, ambition, and decisive
  action come to the forefront. It is a period of intense energy requiring conscious direction.
  The results depend on the strength and placement of Mars in your birth chart.

SIDEBAR:
  Zodiac Sign:           Rules Aries and Scorpio
  Exalted (Uchcha):      Capricorn (28°)
  Debilitated (Neecha):  Cancer (28°)
  Best Time:             Tuesday, Shukla Paksha
  Drishti (Aspect):      4th, 7th, 8th aspect
  When balanced:         Courageous, disciplined, energetic, a natural and inspiring leader
  When afflicted:        Aggressive, impulsive, prone to accidents and conflicts

FOOTER:
  Heading:    Rise with the strength of Mangala.
  Subheading: Channel the warrior energy of Mars into courage, discipline, and purposeful action.
```

---

### 3. MERCURY — MercuryPage.tsx

```
route:    /planets/mercury
title:    Budha
subtitle: The Messenger Planet
description: The source of intellect, communication, and discernment.
keywords: intellect | communication | wisdom
accent:   #4CAF72

ATTRIBUTES:
  Brain icon    → Intellect / Buddhi
  Chat icon     → Communication / Vak
  Book icon     → Wisdom / Jnana
  Compass icon  → Analysis / Viveka
  Wind icon     → Adaptability / Sthitisthapakta

MANTRAS:
  1. Budha Beeja Mantra
     Devanagari: ॐ बुं बुधाय नमः ।
     IAST: Om Bum Budhaya Namah
     Meaning: We bow to Budha, the swift one, who sharpens the intellect and guides the power of speech.

  2. Budha Gayatri Mantra
     Devanagari: ॐ सौम्यरूपाय विद्महे वाणेशाय धीमहि । तन्नो बुधः प्रचोदयात् ॥
     IAST: Om Saumyarupaya Vidmahe Vaneshaya Dhimahi | Tanno Budhah Prachodayat
     Meaning: We meditate on the gentle one, the lord of speech. May Mercury illuminate our intellect and expression.

LIFE FACTS:
  Day: Wednesday (Budhvar)
  Direction: North
  Metal: Bronze, Brass
  Gemstone: Emerald (Panna)
  Color: Green
  Element: Earth
  Dosha Influence: Vata-Pitta
  Guna: Rajas
  Body Part: Nervous System, Skin, Speech
  Life Area: Intellect, Communication, Business

CONNECT STEPS:
  01 Feed green vegetables to cows on Wednesday
  02 Chant Budha mantras at sunrise
  03 Wear Emerald on Wednesday
  04 Read, study, and practice writing daily
  05 Serve students, teachers, and scholars

GEMSTONE: Emerald (Panna)
  - Sharpens intellect and strengthens memory
  - Improves communication and business acumen
  - Supports nervous system and clarity of thought

AFFIRMATION: My mind is sharp, clear, and open to infinite wisdom.

FAQ:
  Q1: Who is Budha in Vedic Astrology?
  Budha is Mercury, the prince among the Navagraha and the planet of intellect and
  communication. He governs analytical thinking, speech, trade, and learning. A strong Budha
  brings sharp intelligence, adaptability, and excellent communication. When afflicted, it can
  cause nervousness, indecisiveness, and scattered thinking.

  Q2: What does Mercury represent in a birth chart?
  Mercury shows how you think, communicate, and process information. It governs your education,
  business instincts, writing ability, and relationships with siblings and neighbors. It also
  reflects how quickly and accurately you adapt to new situations.

  Q3: What is the significance of Mercury in the 12 Houses?
  [include 12-house grid — same pattern as SunPage question 3]
  Mercury's placement shapes your intellectual focus and communication style across all life areas.

  Q4: Mercury Dasha: Learning, Business, and Communication
  During Budha Mahadasha, themes of education, trade, writing, and intellectual work come to
  the forefront. It is an active and mentally stimulating period where communication and
  analytical skills are tested and refined.

SIDEBAR:
  Zodiac Sign:           Rules Gemini and Virgo
  Exalted (Uchcha):      Virgo (15°)
  Debilitated (Neecha):  Pisces (15°)
  Best Time:             Wednesday, Shukla Paksha
  Drishti (Aspect):      7th aspect
  When balanced:         Sharp intellect, excellent communicator, analytical and highly adaptable
  When afflicted:        Nervous, indecisive, scattered thinking and speech difficulties

FOOTER:
  Heading:    Sharpen your mind with the wisdom of Budha.
  Subheading: Embrace the energy of Mercury and unlock clarity, intelligence, and the power of expression.
```

---

### 4. JUPITER — JupiterPage.tsx

```
route:    /planets/jupiter
title:    Guru
subtitle: The Great Teacher
description: The source of wisdom, abundance, and divine grace.
keywords: wisdom | growth | abundance
accent:   #F5A623

ATTRIBUTES:
  GraduationCap → Wisdom / Jnana
  Plant icon    → Growth / Vriddhi
  Star icon     → Abundance / Samriddhi
  HandsPraying  → Grace / Anugraha
  Scales icon   → Dharma / Righteousness

MANTRAS:
  1. Guru Beeja Mantra
     Devanagari: ॐ बृं बृहस्पतये नमः ।
     IAST: Om Brim Brihaspataye Namah
     Meaning: We bow to Guru, the teacher of the gods, who bestows wisdom, prosperity, and spiritual grace.

  2. Guru Gayatri Mantra
     Devanagari: ॐ वृषभध्वजाय विद्महे घृणिहस्ताय धीमहि । तन्नो गुरुः प्रचोदयात् ॥
     IAST: Om Vrishabhadhvajaya Vidmahe Grinihas-taya Dhimahi | Tanno Guruh Prachodayat
     Meaning: We meditate on the one who carries the banner of dharma. May Jupiter guide us toward wisdom and abundance.

LIFE FACTS:
  Day: Thursday (Guruvar)
  Direction: Northeast
  Metal: Gold
  Gemstone: Yellow Sapphire (Pukhraj)
  Color: Yellow, Golden
  Element: Ether
  Dosha Influence: Kapha
  Guna: Sattva
  Body Part: Liver, Hips, Fat Tissue
  Life Area: Wisdom, Children, Spirituality

CONNECT STEPS:
  01 Offer yellow flowers at sunrise on Thursday
  02 Chant Guru mantras with devotion and gratitude
  03 Wear Yellow Sapphire on Thursday
  04 Study sacred texts and spiritual literature daily
  05 Serve teachers, elders, and the wise

GEMSTONE: Yellow Sapphire (Pukhraj)
  - Attracts wisdom, higher knowledge, and mental clarity
  - Brings prosperity, good fortune, and abundance
  - Strengthens dharmic path and spiritual inclination

AFFIRMATION: I expand in wisdom, abundance, and divine grace.

FAQ:
  Q1: Who is Guru in Vedic Astrology?
  Guru is Jupiter, the most benefic among the Navagraha and the teacher of the gods. He
  represents wisdom, dharma, spiritual growth, and abundance. A strong Jupiter brings
  generosity, faith, and prosperity. When afflicted, it can bring overindulgence, misplaced
  beliefs, or difficulty with discipline.

  Q2: What does Jupiter represent in a birth chart?
  Jupiter shows your capacity for wisdom, faith, and higher learning. It governs children,
  teachers, long-distance journeys, and your relationship with dharma, spirituality, and the
  principles that guide your life forward.

  Q3: What is the significance of Jupiter in the 12 Houses?
  [include 12-house grid — same pattern as SunPage question 3]
  Jupiter's placement shapes where grace, expansion, and abundance flow in your life.

  Q4: Jupiter Dasha: Expansion, Wisdom, and Abundance
  During Guru Mahadasha, themes of spiritual growth, education, prosperity, and family
  expansion come to the forefront. It is one of the most auspicious dashas, bringing blessings
  in proportion to the strength and dignity of Jupiter in the natal chart.

SIDEBAR:
  Zodiac Sign:           Rules Sagittarius and Pisces
  Exalted (Uchcha):      Cancer (5°)
  Debilitated (Neecha):  Capricorn (5°)
  Best Time:             Thursday, Shukla Paksha
  Drishti (Aspect):      5th, 7th, 9th aspect
  When balanced:         Wise, generous, spiritually inclined and genuinely prosperous
  When afflicted:        Overindulgent, preachy, excessive and lacking in discipline

FOOTER:
  Heading:    Grow with the grace of Guru.
  Subheading: Embrace the energy of Jupiter and walk the path of wisdom, abundance, and divine purpose.
```

---

### 5. VENUS — VenusPage.tsx

```
route:    /planets/venus
title:    Shukra
subtitle: The Planet of Beauty
description: The source of love, beauty, and divine harmony.
keywords: love | beauty | harmony
accent:   #E86BA0

ATTRIBUTES:
  Heart icon    → Love / Prema
  Sparkle icon  → Beauty / Saundarya
  Music icon    → Harmony / Samarasya
  Palette icon  → Creativity / Srijanatmakta
  Flower icon   → Pleasure / Ananda

MANTRAS:
  1. Shukra Beeja Mantra
     Devanagari: ॐ शुं शुक्राय नमः ।
     IAST: Om Shum Shukraya Namah
     Meaning: We bow to Shukra, the radiant one, who governs love, beauty, and all that brings joy and harmony to life.

  2. Shukra Gayatri Mantra
     Devanagari: ॐ अश्वध्वजाय विद्महे धनुर्हस्ताय धीमहि । तन्नो शुक्रः प्रचोदयात् ॥
     IAST: Om Ashvadhvajaya Vidmahe Dhanurhastaya Dhimahi | Tanno Shukrah Prachodayat
     Meaning: We meditate on the one who rides the white horse. May Venus bless us with love, beauty, and creative abundance.

LIFE FACTS:
  Day: Friday (Shukravar)
  Direction: Southeast
  Metal: Silver
  Gemstone: Diamond (Heera)
  Color: White, Pink
  Element: Water
  Dosha Influence: Vata-Kapha
  Guna: Rajas
  Body Part: Reproductive System, Kidneys, Eyes
  Life Area: Love, Marriage, Creativity

CONNECT STEPS:
  01 Offer white or pink flowers on Friday morning
  02 Chant Shukra mantras with love and devotion
  03 Wear Diamond or White Sapphire on Friday
  04 Practice art, music, or creative expression daily
  05 Honor women, feminine energy, and beauty in life

GEMSTONE: Diamond (Heera)
  - Attracts love, harmony, and fulfilling relationships
  - Enhances beauty, charm, and creative inspiration
  - Brings artistic gifts and refined aesthetic sensitivity

AFFIRMATION: I am surrounded by love, beauty, and divine harmony.

FAQ:
  Q1: Who is Shukra in Vedic Astrology?
  Shukra is Venus, the teacher of the asuras and the most refined of the Navagraha. He governs
  love, beauty, art, luxury, and all that brings pleasure and harmony. A strong Shukra brings
  charm, creativity, and fulfilling relationships. When afflicted, it can bring indulgence,
  vanity, and difficulties in partnerships.

  Q2: What does Venus represent in a birth chart?
  Venus shows your capacity for love, your aesthetic sensibilities, and how you experience
  pleasure and beauty. It governs marriage, creative arts, luxury, and your relationship with
  the feminine principle and all forms of refinement.

  Q3: What is the significance of Venus in the 12 Houses?
  [include 12-house grid — same pattern as SunPage question 3]
  Venus in different houses shapes where love, beauty, and creative energy flow in your life.

  Q4: Venus Dasha: Love, Creativity, and Abundance
  During Shukra Mahadasha, themes of love, relationships, artistic expression, and material
  comfort come to the forefront. It is generally a pleasant and prosperous period, though the
  quality of results depends on Venus's strength and placement in the natal chart.

SIDEBAR:
  Zodiac Sign:           Rules Taurus and Libra
  Exalted (Uchcha):      Pisces (27°)
  Debilitated (Neecha):  Virgo (27°)
  Best Time:             Friday, Shukla Paksha
  Drishti (Aspect):      7th aspect
  When balanced:         Loving, creative, charming and artistically gifted
  When afflicted:        Indulgent, vain, prone to relationship difficulties

FOOTER:
  Heading:    Open your heart to the beauty of Shukra.
  Subheading: Embrace the energy of Venus and invite love, creativity, and divine harmony into your life.
```

---

### 6. SATURN — SaturnPage.tsx

```
route:    /planets/saturn
title:    Shani
subtitle: The Planet of Karma
description: The source of discipline, karma, and lasting transformation.
keywords: discipline | karma | transformation
accent:   #4A6FA5

ATTRIBUTES:
  Scale icon    → Discipline / Anushasan
  Cycle icon    → Karma / Karma
  Mountain icon → Transformation / Parivartan
  Shield icon   → Endurance / Sahana
  Gavel icon    → Justice / Nyaya

MANTRAS:
  1. Shani Beeja Mantra
     Devanagari: ॐ शं शनैश्चराय नमः ।
     IAST: Om Sham Shanaischaraya Namah
     Meaning: We bow to Shani, the slow-moving one, who teaches patience, discipline, and the sacred law of karma.

  2. Shani Gayatri Mantra
     Devanagari: ॐ काकध्वजाय विद्महे खड्गहस्ताय धीमहि । तन्नो मन्दः प्रचोदयात् ॥
     IAST: Om Kakadhvajaya Vidmahe Khadgahastaya Dhimahi | Tanno Mandah Prachodayat
     Meaning: We meditate on the crow-bannered one who carries the sword of justice. May Saturn guide us through karma toward liberation.

LIFE FACTS:
  Day: Saturday (Shanivar)
  Direction: West
  Metal: Iron, Steel
  Gemstone: Blue Sapphire (Neelam)
  Color: Black, Dark Blue
  Element: Air
  Dosha Influence: Vata
  Guna: Tamas
  Body Part: Bones, Joints, Teeth, Nervous System
  Life Area: Karma, Longevity, Service

CONNECT STEPS:
  01 Light sesame oil lamp on Saturday evening
  02 Chant Shani mantras with patience and surrender
  03 Wear Blue Sapphire only after proper consultation
  04 Serve the elderly, disabled, and those in need
  05 Practice patience, discipline, and honest work daily

GEMSTONE: Blue Sapphire (Neelam)
  - Brings discipline, focus, and karmic clarity
  - Accelerates spiritual lessons and growth
  - Must be worn only after consultation — powerful and fast-acting

AFFIRMATION: I embrace discipline, patience, and the wisdom of karma.

FAQ:
  Q1: Who is Shani in Vedic Astrology?
  Shani is Saturn, the karmic teacher among the Navagraha and the slowest-moving of the
  classical planets. He governs discipline, patience, service, longevity, and the law of karma.
  A well-placed Saturn brings endurance, wisdom through hardship, and spiritual maturity. When
  afflicted, it can bring delays, depression, chronic illness, and fear.

  Q2: What does Saturn represent in a birth chart?
  Saturn shows where you must work hardest and grow most slowly. It governs your relationship
  with responsibility, service, and the consequences of past actions. It also represents
  longevity, the elderly, and professions requiring patience and sustained effort.

  Q3: What is the significance of Saturn in the 12 Houses?
  [include 12-house grid — same pattern as SunPage question 3]
  Saturn's placement reveals where karma must be faced and where discipline will ultimately bring mastery.

  Q4: Saturn Dasha: Karma, Discipline, and Spiritual Maturity
  During Shani Mahadasha, themes of hard work, karmic reckoning, service, and spiritual
  maturity come to the forefront. It is the longest dasha at 19 years, testing one's character
  and ultimately rewarding genuine effort and integrity.

SIDEBAR:
  Zodiac Sign:           Rules Capricorn and Aquarius
  Exalted (Uchcha):      Libra (20°)
  Debilitated (Neecha):  Aries (20°)
  Best Time:             Saturday, Krishna Paksha
  Drishti (Aspect):      3rd, 7th, 10th aspect
  When balanced:         Disciplined, hardworking, just and spiritually mature
  When afflicted:        Depressive, fearful, chronic delays and health difficulties

FOOTER:
  Heading:    Walk your karma with the strength of Shani.
  Subheading: Embrace the energy of Saturn and transform discipline, patience, and service into lasting wisdom.
```

---

### 7. RAHU — RahuPage.tsx

```
route:    /planets/rahu
title:    Rahu
subtitle: The Shadow Planet
description: The force of ambition, illusion, and worldly transformation.
keywords: ambition | illusion | transformation
accent:   #7B5EA7

NOTE: Rahu has no ruling day. Omit the Day row from life facts entirely.

ATTRIBUTES:
  Target icon   → Ambition / Abhilasha
  Eye icon      → Illusion / Maya
  Lightning     → Transformation / Parivartan
  Flame icon    → Desire / Kama
  Cube icon     → Innovation / Navachara

MANTRAS:
  1. Rahu Beeja Mantra
     Devanagari: ॐ रां राहवे नमः ।
     IAST: Om Ram Rahave Namah
     Meaning: We bow to Rahu, the shadow force, who drives ambition, breaks boundaries, and transforms through illusion.

  2. Rahu Gayatri Mantra
     Devanagari: ॐ शिरोरूपाय विद्महे अमृतेशाय धीमहि । तन्नो राहुः प्रचोदयात् ॥
     IAST: Om Shirorupaya Vidmahe Amriteshaya Dhimahi | Tanno Rahuh Prachodayat
     Meaning: We meditate on the one who is only a head, the lord of nectar. May Rahu guide our deepest desires toward higher purpose.

LIFE FACTS:
  Direction: Southwest
  Metal: Lead, Mixed Metals
  Gemstone: Hessonite (Gomed)
  Color: Smoky Grey, Dark Blue
  Element: Air
  Dosha Influence: Vata
  Guna: Tamas
  Body Part: Nervous System, Skin, Head
  Life Area: Ambition, Foreign Lands, Sudden Change

CONNECT STEPS:
  01 Offer blue flowers or durva grass on Saturday
  02 Chant Rahu mantras during Rahu Kaal
  03 Wear Hessonite only after proper consultation
  04 Practice detachment from outcomes and results
  05 Meditate on the nature of illusion and impermanence

GEMSTONE: Hessonite (Gomed)
  - Reduces Rahu's malefic effects and confusion
  - Brings clarity and focus through mental fog
  - Supports worldly success and ambitious goals

AFFIRMATION: I transform my deepest desires into my highest purpose.

FAQ:
  Q1: Who is Rahu in Vedic Astrology?
  Rahu is the North Node of the Moon, one of the two shadow planets among the Navagraha. He
  has no physical form but exerts a powerful influence on desire, ambition, and illusion. Rahu
  represents our karmic direction forward, worldly obsessions, and the breaking of conventional
  boundaries. When strong, Rahu brings rapid worldly success. When afflicted, it brings
  obsession, deception, and confusion.

  Q2: What does Rahu represent in a birth chart?
  Rahu shows your soul's primary desire in this lifetime and the areas of life where you feel
  most driven and unfulfilled. It governs foreign connections, sudden gains, unconventional
  paths, technology, and the hunger for experience beyond the familiar.

  Q3: What is the significance of Rahu in the 12 Houses?
  [include 12-house grid — same pattern as SunPage question 3]
  Rahu's placement reveals where ambition, desire, and karmic hunger are most powerfully focused.

  Q4: Rahu Dasha: Ambition, Change, and Worldly Experience
  During Rahu Mahadasha, themes of rapid change, ambition, worldly experience, and the
  confrontation of illusion come to the forefront. It is an intense 18-year period that can
  bring dramatic gains and equally dramatic lessons depending on Rahu's placement.

SIDEBAR:
  Zodiac Sign:           Exalted in Taurus, Debilitated in Scorpio
  Exalted (Uchcha):      Taurus
  Debilitated (Neecha):  Scorpio
  Best Time:             Saturday, Rahu Kaal
  Drishti (Aspect):      5th, 7th, 9th aspect
  When balanced:         Ambitious, innovative, worldly success and unconventional brilliance
  When afflicted:        Obsessive, deceptive, addictive tendencies and confusion

FOOTER:
  Heading:    Transform your shadows with the power of Rahu.
  Subheading: Embrace the energy of Rahu and channel your deepest desires into purpose, innovation, and growth.
```

---

### 8. KETU — KetuPage.tsx

```
route:    /planets/ketu
title:    Ketu
subtitle: The Moksha Planet
description: The force of liberation, spirituality, and sacred detachment.
keywords: liberation | spirituality | detachment
accent:   #8B4A4A

NOTE: Ketu has no ruling day. Omit the Day row from life facts entirely.

ATTRIBUTES:
  Lotus icon    → Liberation / Moksha
  Star icon     → Spirituality / Adhyatma
  Feather icon  → Detachment / Vairagya
  Eye icon      → Intuition / Pratibha
  Clock icon    → Past Karma / Prarabdha

MANTRAS:
  1. Ketu Beeja Mantra
     Devanagari: ॐ कें केतवे नमः ।
     IAST: Om Kem Ketave Namah
     Meaning: We bow to Ketu, the headless one, who releases us from attachment and guides the soul toward liberation.

  2. Ketu Gayatri Mantra
     Devanagari: ॐ अश्वध्वजाय विद्महे शूलहस्ताय धीमहि । तन्नो केतुः प्रचोदयात् ॥
     IAST: Om Ashvadhvajaya Vidmahe Shulahastaya Dhimahi | Tanno Ketuh Prachodayat
     Meaning: We meditate on the flag-bearing one who carries the trident. May Ketu dissolve our attachments and reveal the eternal.

LIFE FACTS:
  Direction: Northwest
  Metal: Mixed Metals, Iron
  Gemstone: Cat's Eye (Lehsunia)
  Color: Smoky Brown, Grey
  Element: Fire
  Dosha Influence: Pitta-Vata
  Guna: Tamas
  Body Part: Spine, Abdomen, Clairvoyance
  Life Area: Spirituality, Past Karma, Liberation

CONNECT STEPS:
  01 Offer mixed flowers or kusha grass on Tuesday
  02 Chant Ketu mantras with surrender and humility
  03 Wear Cat's Eye only after proper consultation
  04 Practice meditation, pranayama, and inner silence
  05 Serve spiritual teachers, saints, and the renounced

GEMSTONE: Cat's Eye (Lehsunia)
  - Enhances spiritual awareness and intuitive perception
  - Protects from unseen dangers and psychic disturbances
  - Supports the path of moksha and inner liberation

AFFIRMATION: I release the past and walk fearlessly toward liberation.

FAQ:
  Q1: Who is Ketu in Vedic Astrology?
  Ketu is the South Node of the Moon, the other shadow planet among the Navagraha. Like Rahu,
  he has no physical form. Ketu represents our karmic past, spiritual inheritance, and the
  drive toward liberation from the cycle of desire. A strong Ketu brings deep intuition,
  spiritual gifts, and the capacity for renunciation. When afflicted, it can bring confusion,
  isolation, and sudden losses.

  Q2: What does Ketu represent in a birth chart?
  Ketu shows what your soul has already mastered in past lives and where natural gifts and
  spiritual detachment reside. It governs intuition, mysticism, renunciation, and the
  dissolution of ego in the areas of life it influences.

  Q3: What is the significance of Ketu in the 12 Houses?
  [include 12-house grid — same pattern as SunPage question 3]
  Ketu's placement reveals where spiritual gifts, past karma, and the path to liberation are most active.

  Q4: Ketu Dasha: Spirituality, Detachment, and Liberation
  During Ketu Mahadasha, themes of spiritual awakening, detachment from worldly outcomes, and
  the resolution of past karma come to the forefront. It is a 7-year period that can feel
  isolating but ultimately draws the soul closer to its deepest truth.

SIDEBAR:
  Zodiac Sign:           Exalted in Scorpio, Debilitated in Taurus
  Exalted (Uchcha):      Scorpio
  Debilitated (Neecha):  Taurus
  Best Time:             Tuesday, Ketu Kaal
  Drishti (Aspect):      5th, 7th, 9th aspect
  When balanced:         Deeply spiritual, intuitive and peacefully detached from materialism
  When afflicted:        Confused, isolated, sudden health issues and unexpected losses

FOOTER:
  Heading:    Walk the path of liberation with Ketu.
  Subheading: Embrace the energy of Ketu and release all that no longer serves your soul's highest journey.
```

---

## Hard Rules (Never Break)

- No em-dashes anywhere — use commas or "and"
- `fetchpriority` lowercase only — never `fetchPriority`
- No new npm installs — use only what is already installed
- Self-contained single `.tsx` file per planet — no new shared component files
- Preserve existing SEO head, JSON-LD schema, FAQ schema, route, breadcrumb on every page
- All Sanskrit text followed by IAST transliteration and English meaning
- No emojis in JSX or content
- Rahu and Ketu: omit Day row from life facts entirely
- FAQ content: planet-specific rewrites, NOT copied from existing pages

---

## Validation Gates

Run after all 8 files are written:

```bash
npm run build
npm run build:prerender

# Must return empty:
grep -rn "—" src/pages/planets/
grep -rn "fetchPriority" src/pages/planets/

# All 53 routes must prerender successfully
# No planet page should take more than 200ms to prerender
```

---

## Branch Rule

```bash
git checkout -b feature/planets-stage1-structure
git add src/pages/planets/
git commit -m "feat: rebuild all 8 planet pages — editorial layout matching SunPage"
git push origin feature/planets-stage1-structure
```

Never push to main. Stage 1 must be reviewed on staging before merge.

---

## Stage 2 — Deferred (Blocked Until Stage 1 Approval)

After Stage 1 is visually approved on staging, a second pass will:

1. Generate 2 background images per planet (dark strip bg + light card bg)
2. Upload to R2 at `Pillar/Planets/{PlanetName}/`
3. Replace `bg-[#0B1120]` dark sections with `backgroundImage` + overlay gradient
4. Replace `bg-white` cards with `backgroundImage: cover` warm card bg
5. Apply `backgroundAttachment: fixed` parallax on section wrappers

Stage 2 will follow the same pattern as `scripts/surya-bg-cards-styling.md`.
Do not start Stage 2 until Saurabh confirms Stage 1 looks correct on staging.
