# Karka Rashi Page — Build Brief
# Feature branch: feature/karka-rashi-page
# Output file: src/pages/zodiac/KarkaRashiPage.tsx
# Route: /zodiac/cancer
# Status doc: scripts/karka-rashi-page-status.md

═══════════════════════════════════════════════════════════════
PHASE 0 — ASSET VERIFICATION AND R2 UPLOAD
═══════════════════════════════════════════════════════════════

Local asset folder: /Users/saurabhiim/Documents/Antigravity/SIAS-5.0-main/assets-to-upload/Cancer/

Step 0.1 — Confirm these 4 files exist:
  - hero-banner-cancer-rashi.png
  - mantra-background-cancer.png
  - cancer Rashi Quick Facts Strip.png   (note: space in filename)
  - cancer-card.png
If any file is missing, STOP and report.

Step 0.2 — Optimize with sharp:
  source ~/.zshrc && node -e "
    const sharp = require('sharp');
    const path = require('path');
    const base = '/Users/saurabhiim/Documents/Antigravity/SIAS-5.0-main/assets-to-upload/Cancer';
    sharp(path.join(base,'hero-banner-cancer-rashi.png')).resize(1600,null,{fit:'inside',withoutEnlargement:true}).webp({quality:85}).toFile(path.join(base,'hero-banner-karka-rashi.webp')).then(i=>console.log('hero',i.size));
    sharp(path.join(base,'mantra-background-cancer.png')).resize(1600,null,{fit:'inside',withoutEnlargement:true}).webp({quality:85}).toFile(path.join(base,'mantra-bg-karka-rashi.webp')).then(i=>console.log('mantra',i.size));
    sharp(path.join(base,'cancer Rashi Quick Facts Strip.png')).resize(1600,null,{fit:'inside',withoutEnlargement:true}).webp({quality:85}).toFile(path.join(base,'quick-facts-karka-rashi.webp')).then(i=>console.log('qf',i.size));
    sharp(path.join(base,'cancer-card.png')).resize(800,800,{fit:'inside',withoutEnlargement:true}).webp({quality:90}).toFile(path.join(base,'karka-card.webp')).then(i=>console.log('card',i.size));
  "
Size limits: hero/mantra/qf max 400KB, card max 200KB. Reduce quality by 5 if over.

Step 0.3 — Upload to R2 folder: Zodiac/Cancer/
Expected public URLs:
  HERO_URL        = https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Cancer/hero-banner-karka-rashi.webp
  MANTRA_BG_URL   = https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Cancer/mantra-bg-karka-rashi.webp
  QUICK_FACTS_URL = https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Cancer/quick-facts-karka-rashi.webp
  CARD_URL        = https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Cancer/karka-card.webp

Step 0.4 — curl -I verify all 4 URLs return HTTP 200. If any fail, STOP.

═══════════════════════════════════════════════════════════════
PHASE 1 — BRANCH
═══════════════════════════════════════════════════════════════

cd /Users/saurabhiim/Documents/Antigravity/SIAS-5.0-main
git checkout main && git pull origin main
git checkout -b feature/karka-rashi-page

═══════════════════════════════════════════════════════════════
PHASE 2 — CREATE PAGE FILE
═══════════════════════════════════════════════════════════════

File: src/pages/zodiac/KarkaRashiPage.tsx
Template: MeshaRashiPage.tsx — identical structure, only data/colors/content change.

HARD RULES: No em-dashes. No emojis in code/JSX/content. No Gujarati. fetchpriority lowercase.
All Sanskrit followed by IAST + English meaning. Max 1 shloka. No @jalba/react-css-doodle.
No blog-images imports. All R2 URLs inline constants. Single self-contained .tsx file.

SIGN DATA
Sign:         Karka (Cancer)
Sanskrit:     कर्क राशि
IAST:         Karka Rasi
English:      The Crab
Rashi number: 4th sign
Element:      Water (Jala)
Quality:      Cardinal (Chara)
Ruler:        Chandra (Moon)
Symbol:       The Crab  ♋
Lucky colour: White, silver, sea green
Lucky day:    Monday
Gemstone:     Pearl (Moti)
Body parts:   Chest, breasts, stomach, lungs
Deity:        Goddess Parvati (associated with Chandra)
Shloka (1, from BPHS):
  Sanskrit:   Karkah saumyah jalabhago jalajah prsthodyah
  IAST:       Karkah saumyah jalabhago jalajah prsthodyah
  Meaning:    Cancer is a gentle sign, of the water element, born in water, of back-rising nature.
  Source:     Brihat Parashara Hora Shastra

Page accent colors:
  Primary:   #0369a1  (deep blue/ocean)
  Secondary: #d97706  (gold, keep warm)
  Highlight: #e0f2fe  (pale sky blue)
  Heading replace: #b91c1c and #dc2626 with #075985

STRENGTH_ROWS (6)
{ icon: Heart,       label: 'Deeply nurturing' },
{ icon: ShieldCheck, label: 'Fiercely protective' },
{ icon: Droplet,     label: 'Emotionally intuitive' },
{ icon: Home,        label: 'Devoted to family' },
{ icon: Users,       label: 'Empathetic listener' },
{ icon: Sparkles,    label: 'Creatively imaginative' },

CHALLENGE_ROWS (4)
{ icon: ChevronsRight, label: 'Moody and withdrawn' },
{ icon: Timer,         label: 'Over-sensitive' },
{ icon: UserX,         label: 'Clingy in relationships' },
{ icon: Clock,         label: 'Holds onto the past' },

HOUSE_DATA (12)
{ num:'01', color:'#0369a1', heading:'LAGNA (SELF)',          icon:User,       desc:'Soft appearance, nurturing instincts, strong emotional memory, ruled by the Moon',         arrow:'Home and family are the centre of identity' },
{ num:'02', color:'#d97706', heading:'WEALTH & SPEECH',       icon:Coins,      desc:'Gentle speech, wealth through home-based or nurturing professions, devoted family',       arrow:'Security-driven financial choices' },
{ num:'03', color:'#db2777', heading:'COURAGE & SIBLINGS',    icon:Users,      desc:'Emotional communication style, close bond with siblings, short travels for family',       arrow:'Courage expressed through protection of loved ones' },
{ num:'04', color:'#7c3aed', heading:'HOME & MOTHER',         icon:Home,       desc:'Extremely strong 4th house, devoted mother, deep attachment to birthplace',              arrow:'Happiness found in domestic comfort and roots' },
{ num:'05', color:'#db2777', heading:'CHILDREN & CREATIVITY', icon:Star,       desc:'Emotionally bonded with children, nurturing romance, creative gifts in arts and music',   arrow:'Creativity flows from emotional depth' },
{ num:'06', color:'#1d4ed8', heading:'ENEMIES & SERVICE',     icon:Shield,     desc:'Overcomes challenges through emotional endurance and care',                               arrow:'Healing, nursing, and social work favoured' },
{ num:'07', color:'#0f766e', heading:'MARRIAGE & PARTNERS',   icon:Heart,      desc:'Deeply devoted spouse, partnerships built on emotional security and trust',               arrow:'Marriage becomes a sacred home' },
{ num:'08', color:'#7c3aed', heading:'TRANSFORMATION',        icon:Zap,        desc:'Deep emotional transformations, psychic sensitivity, interest in past lives',            arrow:'Transformation through emotional release' },
{ num:'09', color:'#d97706', heading:'DHARMA & FATHER',       icon:Compass,    desc:'Devotional faith, nurturing father figure, pilgrimages near water',                      arrow:'Dharma found in service and compassion' },
{ num:'10', color:'#1d4ed8', heading:'CAREER & STATUS',       icon:TrendingUp, desc:'Career in healthcare, education, hospitality, real estate, or the arts',                 arrow:'Recognition through care and nurturing skill' },
{ num:'11', color:'#0369a1', heading:'GAINS & FRIENDS',       icon:Users,      desc:'Friends who feel like family, gains through emotional bonds and home ventures',          arrow:'Fulfilment through belonging and community' },
{ num:'12', color:'#0f766e', heading:'LIBERATION & FOREIGN',  icon:Globe,      desc:'Spiritual sensitivity, dream states, foreign travel near water or for healing',         arrow:'Liberation through emotional surrender' },

FAQ_DATA (5)
FAQ1: q='What is Karka Rashi in Vedic astrology?' icon=HelpCircle color='#0369a1' showImage=true
  a: Karka Rashi (Cancer) is the fourth sign of the Vedic sidereal zodiac, spanning 90 to
     120 degrees. It is a cardinal water sign ruled by Chandra (the Moon), the planet of
     emotions, mind, and nurturing. Natives with the Moon in Karka are emotionally deep,
     highly intuitive, and devoted to home and family above all else.

FAQ2: q='Who is the ruling planet of Karka Rashi?' icon=Globe color='#d97706'
  a: Chandra (the Moon) is the ruling planet of Karka Rashi. The Moon governs emotions,
     the mind, mother, home, water, and all nurturing instincts. A strong Moon amplifies
     empathy, creativity, and devotion. A weak or afflicted Moon can bring emotional
     instability, attachment, and difficulty in setting boundaries.

FAQ3: q='What are the personality traits of Karka Rashi natives?' icon=User color='#7c3aed'
  a: Karka natives are nurturing, intuitive, and profoundly loyal. They build their world
     around home and family, and they protect those they love with fierce devotion. Their
     greatest challenge is emotional hypersensitivity and an inability to release the past.
     When their emotional depth is channelled constructively, Karka natives become
     remarkable healers, artists, and caregivers.

FAQ4: q='Which gemstone is recommended for Karka Rashi?' icon=Gem color='#1d4ed8'
  a: Pearl (Moti) is the classical gemstone for Karka Rashi, worn to strengthen Chandra
     (the Moon). It should be set in silver and worn on the little finger of the right
     hand on a Monday morning after proper mantra invocation. A chart-based consultation
     with a qualified jyotishi at Soul Infinity Astro Solutions is essential before wearing
     any planetary gemstone.

FAQ5: q='What are the lucky days and colours for Karka Rashi?' icon=Calendar color='#0f766e'
  a: Monday is the most auspicious day for Karka Rashi natives, governed by Chandra.
     White, silver, and sea green are the lucky colours. Fasting on Mondays, visiting
     Devi or Shiva temples, and wearing white on important days are traditional practices.

SEO HEAD
title:       "Karka Rashi (Cancer), Traits, Mantra, Remedies | Soul Infinity"
description: "Karka Rashi (Cancer) in Vedic astrology, ruled by Chandra (Moon). Personality traits, mantra, remedies, characteristics, and houses placement, guided by Saurabh Jain."
keywords:    "karka rashi, cancer vedic astrology, chandra, moon, cancer traits, karka mantra, pearl, moti, karka remedies, soul infinity"
url:         '/zodiac/cancer'
breadcrumbs: Home > Zodiac Signs > Karka (Cancer)

TITLE STRIP
Eyebrow:  कर्क राशि · Cancer  (color: text-blue-700)
H1:       "Karka Rashi, The Nurturer of the Zodiac"
Subtitle: "Ruled by Chandra (Moon) · Water Sign · The Crab"

ABOUT SECTION bg: #f0f9ff
Card1: Karka (Cancer) is the fourth sign of the Vedic zodiac, ruled by Chandra (the Moon),
  the planet of emotions, mind, and nurturing. As a cardinal water sign, Karka carries the
  energy of feeling, the force that receives, protects, and nourishes all that it holds.
Card2 title "The Nurturer": In the Brihat Parashara Hora Shastra, Karka is described as a
  gentle sign of the water element, associated with the deep emotional life and the sacred
  bond between mother and child.
Card3 title "Born to Protect": The Crab retreats into its shell not out of weakness but
  out of wisdom. Karka natives guard what is precious to them with extraordinary devotion.
Card4 title "Emotionally Gifted": Where Mesha acts and Mithuna speaks, Karka feels.
  Karka natives sense the emotional weather of a room before a word is spoken, and this
  gift, when mastered, becomes a profound source of wisdom and healing.

MANTRA SECTION: use MANTRA_BG_URL image.
  Mantra:   Om Som Somaya Namah
  Sanskrit: ॐ सों सोमाय नमः
  IAST:     Om Som Somaya Namah
  Meaning:  Salutation to Soma (the Moon), the lord of mind and emotions.
  Practice: Chant 108 times on Monday mornings, ideally facing north-east near water.

REMEDIES SECTION (JSX, no bg image): bg #0c1a2e (dark navy)
H2: "Classical Vedic Remedies for Karka Rashi"
7 remedy cards, 2-col grid:
  1. main:'Chant the Chandra Beej mantra (Om Som Somaya Namah)' sub:'108 times on Monday mornings' highlight:'Chandra Beej mantra'
  2. main:'Wear Pearl (Moti) set in silver on the little finger' sub:'only after a chart-based recommendation' highlight:'Pearl (Moti)'
  3. main:'Donate white rice, milk, white cloth, or silver' sub:'on Mondays at a Shiva or Devi temple' highlight:'white rice, milk, white cloth'
  4. main:'Recite the Chandra Stotra or Shiva Panchakshara Stotra on Mondays' sub:'for emotional balance and mental clarity' highlight:'Chandra Stotra or Shiva Panchakshara Stotra'
  5. main:'Visit a Shiva temple on Mondays' sub:'and offer milk, white flowers, and bel leaves' highlight:'Shiva temple'
  6. main:'Spend time near water: rivers, lakes, or the sea' sub:'as a meditative practice that calms the lunar mind' highlight:'time near water'
  7. main:'Reduce excessive emotional attachment and rumination' sub:'during Moon-afflicted periods. Cultivate healthy detachment' highlight:'excessive emotional attachment'

12 HOUSES bg: #f0f9ff. Footer icon: Droplet color #0369a1.
Footer text: "Karka water nourishes every house it enters, bringing
  <strong style={{ color: '#d97706' }}>empathy, protection</strong> and the warmth of home."

FAQ bg: #f0f9ff. Glyph: ♋
H2: Frequently Asked <span blue-700>Questions</span>
Sub: "Your top questions about Karka Rashi, answered with clarity"
aria-controls prefix: "karka-faq-"

CTA H2: "Want a Personalised Karka Reading?"
CTA bg: bg-gradient-to-r from-blue-900 to-cyan-900

═══════════════════════════════════════════════════════════════
PHASES 3-9
═══════════════════════════════════════════════════════════════
Phase 3: Route /zodiac/cancer -> KarkaRashiPage
Phase 4: Add '/zodiac/cancer' to prerender routes
Phase 5: Activate Cancer card on ZodiacHubPage
Validation: same 10 gates, replace names with "karka"
Commit: "feat: add Karka Rashi (Cancer) pillar page with R2 assets, route, and hub update"
PR title: "feat: Karka Rashi (Cancer) pillar page"
Status doc: scripts/karka-rashi-page-status.md
