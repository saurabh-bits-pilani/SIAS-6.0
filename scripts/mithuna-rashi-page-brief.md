# Mithuna Rashi Page — Build Brief
# Feature branch: feature/mithuna-rashi-page
# Output file: src/pages/zodiac/MithunaRashiPage.tsx
# Route: /zodiac/gemini
# Status doc: scripts/mithuna-rashi-page-status.md

═══════════════════════════════════════════════════════════════
PHASE 0 — ASSET VERIFICATION AND R2 UPLOAD
═══════════════════════════════════════════════════════════════

Local asset folder: /Users/saurabhiim/Documents/Antigravity/SIAS-5.0-main/assets-to-upload/Gemini/

Step 0.1 — Confirm these 4 files exist:
  - hero-banner-gemini-rashi.png
  - mantra-background-gemini-rashi.png
  - Gemini-Rashi-Quick-Facts-Strip.png
  - Gemini-card.png
If any file is missing, STOP and report.

Step 0.2 — Optimize with sharp:
  source ~/.zshrc && node -e "
    const sharp = require('sharp');
    const path = require('path');
    const base = '/Users/saurabhiim/Documents/Antigravity/SIAS-5.0-main/assets-to-upload/Gemini';
    sharp(path.join(base,'hero-banner-gemini-rashi.png')).resize(1600,null,{fit:'inside',withoutEnlargement:true}).webp({quality:85}).toFile(path.join(base,'hero-banner-mithuna-rashi.webp')).then(i=>console.log('hero',i.size));
    sharp(path.join(base,'mantra-background-gemini-rashi.png')).resize(1600,null,{fit:'inside',withoutEnlargement:true}).webp({quality:85}).toFile(path.join(base,'mantra-bg-mithuna-rashi.webp')).then(i=>console.log('mantra',i.size));
    sharp(path.join(base,'Gemini-Rashi-Quick-Facts-Strip.png')).resize(1600,null,{fit:'inside',withoutEnlargement:true}).webp({quality:85}).toFile(path.join(base,'quick-facts-mithuna-rashi.webp')).then(i=>console.log('qf',i.size));
    sharp(path.join(base,'Gemini-card.png')).resize(800,800,{fit:'inside',withoutEnlargement:true}).webp({quality:90}).toFile(path.join(base,'mithuna-card.webp')).then(i=>console.log('card',i.size));
  "
Size limits: hero/mantra/qf max 400KB, card max 200KB. Reduce quality by 5 if over.

Step 0.3 — Upload to R2 folder: Zodiac/Gemini/
Expected public URLs:
  HERO_URL        = https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Gemini/hero-banner-mithuna-rashi.webp
  MANTRA_BG_URL   = https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Gemini/mantra-bg-mithuna-rashi.webp
  QUICK_FACTS_URL = https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Gemini/quick-facts-mithuna-rashi.webp
  CARD_URL        = https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Gemini/mithuna-card.webp

Step 0.4 — curl -I verify all 4 URLs return HTTP 200. If any fail, STOP.

═══════════════════════════════════════════════════════════════
PHASE 1 — BRANCH
═══════════════════════════════════════════════════════════════

cd /Users/saurabhiim/Documents/Antigravity/SIAS-5.0-main
git checkout main && git pull origin main
git checkout -b feature/mithuna-rashi-page

═══════════════════════════════════════════════════════════════
PHASE 2 — CREATE PAGE FILE
═══════════════════════════════════════════════════════════════

File: src/pages/zodiac/MithunaRashiPage.tsx
Template: MeshaRashiPage.tsx — identical structure, only data/colors/content change.

HARD RULES: No em-dashes. No emojis in code/JSX/content. No Gujarati. fetchpriority lowercase.
All Sanskrit followed by IAST + English meaning. Max 1 shloka. No @jalba/react-css-doodle.
No blog-images imports. All R2 URLs inline constants. Single self-contained .tsx file.

SIGN DATA
Sign:         Mithuna (Gemini)
Sanskrit:     मिथुन राशि
IAST:         Mithuna Rasi
English:      The Twins
Rashi number: 3rd sign
Element:      Air (Vayu)
Quality:      Mutable (Dvisvabhava)
Ruler:        Budha (Mercury)
Symbol:       The Twins
Lucky colour: Yellow, green
Lucky day:    Wednesday
Gemstone:     Emerald (Panna)
Body parts:   Shoulders, arms, hands, lungs, nervous system
Shloka (1, from BPHS):
  Sanskrit:   dvibhavah svabhavah mithuno vayubhagakah
  IAST:       Dvisvabhavo dvidehasca mithunam vayubhagakah
  Meaning:    Mithuna is a dual-natured sign of dual body, belonging to the air element.
  Source:     Brihat Parashara Hora Shastra

Page accent colors:
  Primary:   #ca8a04  (deep yellow/gold)
  Secondary: #15803d  (green accent)
  Highlight: #fef9c3  (pale yellow bg)
  Heading replace: #b91c1c and #dc2626 with #a16207

STRENGTH_ROWS (6)
{ icon: Zap,         label: 'Quick-witted and sharp' },
{ icon: Globe,       label: 'Adaptable and versatile' },
{ icon: Users,       label: 'Charming communicator' },
{ icon: Sparkles,    label: 'Curious and inventive' },
{ icon: Heart,       label: 'Warm and sociable' },
{ icon: TrendingUp,  label: 'Resourceful under pressure' },

CHALLENGE_ROWS (4)
{ icon: ChevronsRight, label: 'Inconsistent and scattered' },
{ icon: Timer,         label: 'Restless and indecisive' },
{ icon: UserX,         label: 'Superficial at times' },
{ icon: Clock,         label: 'Avoids deep commitment' },

HOUSE_DATA (12)
{ num:'01', color:'#ca8a04', heading:'LAGNA (SELF)',          icon:User,       desc:'Intelligent, talkative, youthful appearance, curious by nature',                            arrow:'Communication shapes every life path' },
{ num:'02', color:'#d97706', heading:'WEALTH & SPEECH',       icon:Coins,      desc:'Eloquent speech, wealth through writing or trade, family with diverse opinions',           arrow:'Multiple income streams favoured' },
{ num:'03', color:'#db2777', heading:'COURAGE & SIBLINGS',    icon:Users,      desc:'Skilled writer and speaker, witty siblings, frequent short travels',                      arrow:'Communication is the primary tool of courage' },
{ num:'04', color:'#7c3aed', heading:'HOME & MOTHER',         icon:Home,       desc:'Intellectually stimulating home, curious mother, multiple residences possible',           arrow:'Home fills with books, conversation, and variety' },
{ num:'05', color:'#db2777', heading:'CHILDREN & CREATIVITY', icon:Star,       desc:'Clever children, playful romance, creative expression through words and ideas',           arrow:'Intelligence applied to art and performance' },
{ num:'06', color:'#1d4ed8', heading:'ENEMIES & SERVICE',     icon:Shield,     desc:'Overcomes challenges through wit and negotiation',                                        arrow:'Careers in communication, medicine, or analysis' },
{ num:'07', color:'#0f766e', heading:'MARRIAGE & PARTNERS',   icon:Heart,      desc:'Intellectual spouse, partnerships built on mental rapport and shared curiosity',          arrow:'Business partnerships in media or trade' },
{ num:'08', color:'#7c3aed', heading:'TRANSFORMATION',        icon:Zap,        desc:'Sudden changes, interest in research and hidden knowledge, gains through inheritance',    arrow:'Transformation through mental reinvention' },
{ num:'09', color:'#d97706', heading:'DHARMA & FATHER',       icon:Compass,    desc:'Philosophical father, faith expressed through knowledge, long pilgrimages for learning', arrow:'Dharma found in teaching and inquiry' },
{ num:'10', color:'#1d4ed8', heading:'CAREER & STATUS',       icon:TrendingUp, desc:'Career in writing, media, education, IT, commerce, or public speaking',                  arrow:'Recognition through intellectual mastery' },
{ num:'11', color:'#ca8a04', heading:'GAINS & FRIENDS',       icon:Users,      desc:'Wide social network, friends in intellectual and business circles',                      arrow:'Gains through multiple simultaneous ventures' },
{ num:'12', color:'#0f766e', heading:'LIBERATION & FOREIGN',  icon:Globe,      desc:'Intellectual pilgrim, hidden anxieties, foreign travel for knowledge and trade',         arrow:'Liberation through silencing the restless mind' },

FAQ_DATA (5)
FAQ1: q='What is Mithuna Rashi in Vedic astrology?' icon=HelpCircle color='#ca8a04' showImage=true
  a: Mithuna Rashi (Gemini) is the third sign of the Vedic sidereal zodiac, spanning 60 to
     90 degrees. It is a mutable air sign ruled by Budha (Mercury), the planet of intellect,
     communication, and commerce. Natives with the Moon in Mithuna are quick-minded,
     adaptable, and gifted with language and social ease.

FAQ2: q='Who is the ruling planet of Mithuna Rashi?' icon=Globe color='#d97706'
  a: Budha (Mercury) is the ruling planet of Mithuna Rashi. Mercury governs intelligence,
     speech, writing, trade, mathematics, and the nervous system. A strong Mercury amplifies
     wit, business acumen, and communication skill. A weak or afflicted Mercury can bring
     indecision, nervous anxiety, and scattered thinking.

FAQ3: q='What are the personality traits of Mithuna Rashi natives?' icon=User color='#7c3aed'
  a: Mithuna natives are curious, articulate, and socially gifted. They adapt effortlessly
     to new environments and thrive on variety and mental stimulation. Their challenge is
     depth: the same restlessness that makes them brilliant communicators can prevent them
     from committing fully to one path or one person.

FAQ4: q='Which gemstone is recommended for Mithuna Rashi?' icon=Gem color='#1d4ed8'
  a: Emerald (Panna) is the classical gemstone for Mithuna Rashi, worn to strengthen
     Budha (Mercury). It should be set in gold and worn on the little finger of the right
     hand on a Wednesday morning after proper mantra invocation. A chart-based consultation
     with a qualified jyotishi at Soul Infinity Astro Solutions is essential before wearing
     any planetary gemstone.

FAQ5: q='What are the lucky days and colours for Mithuna Rashi?' icon=Calendar color='#0f766e'
  a: Wednesday is the most auspicious day for Mithuna Rashi natives, governed by Budha.
     Green and yellow are the lucky colours. Fasting on Wednesdays, reading sacred texts,
     and wearing green on important occasions are traditional supportive practices.

SEO HEAD
title:       "Mithuna Rashi (Gemini), Traits, Mantra, Remedies | Soul Infinity"
description: "Mithuna Rashi (Gemini) in Vedic astrology, ruled by Budha (Mercury). Personality traits, mantra, remedies, characteristics, and houses placement, guided by Saurabh Jain."
keywords:    "mithuna rashi, gemini vedic astrology, budha, mercury, gemini traits, mithuna mantra, emerald, panna, mithuna remedies, soul infinity"
url:         '/zodiac/gemini'
breadcrumbs: Home > Zodiac Signs > Mithuna (Gemini)

TITLE STRIP
Eyebrow:  मिथुन राशि · Gemini  (color: text-yellow-700)
H1:       "Mithuna Rashi, The Communicator of the Zodiac"
Subtitle: "Ruled by Budha (Mercury) · Air Sign · The Twins"

ABOUT SECTION bg: #fefce8
Card1: Mithuna (Gemini) is the third sign of the Vedic zodiac, ruled by Budha (Mercury),
  the planet of intellect, speech, and commerce. As a mutable air sign, Mithuna carries
  the energy of exchange, the force that connects, questions, and adapts.
Card2 title "The Communicator": In the Brihat Parashara Hora Shastra, Mithuna is
  described as a sign of dual nature, embodying the capacity to hold two perspectives
  and find the bridge between them.
Card3 title "Born Curious": The Twins move through the world gathering, sorting, and
  sharing information. Where Mesha acts and Vrishabha builds, Mithuna connects.
Card4 title "Gifted with Words": Mithuna natives are the natural teachers, writers,
  and traders of the zodiac. Their greatest gift is the ability to make any idea
  accessible to any audience.

MANTRA SECTION: use MANTRA_BG_URL image.
  Mantra:   Om Bum Budhaya Namah
  Sanskrit: ॐ बुं बुधाय नमः
  IAST:     Om Bum Budhaya Namah
  Meaning:  Salutation to Budha (Mercury), the planet of intellect and speech.
  Practice: Chant 108 times on Wednesday mornings, facing north.

REMEDIES SECTION (JSX, no bg image): bg #1c1917 (dark charcoal)
H2: "Classical Vedic Remedies for Mithuna Rashi"
7 remedy cards, 2-col grid:
  1. main:'Chant the Budha Beej mantra (Om Bum Budhaya Namah)' sub:'108 times on Wednesday mornings' highlight:'Budha Beej mantra'
  2. main:'Wear Emerald (Panna) set in gold on the little finger' sub:'only after a chart-based recommendation' highlight:'Emerald (Panna)'
  3. main:'Donate green lentils, green cloth, or books' sub:'on Wednesdays at a Vishnu temple' highlight:'green lentils, green cloth'
  4. main:'Recite the Budha Stotra or Vishnu Sahasranama on Wednesdays' sub:'for clarity of mind and communication' highlight:'Budha Stotra or Vishnu Sahasranama'
  5. main:'Visit a Vishnu temple on Wednesdays' sub:'and offer tulsi leaves and yellow flowers' highlight:'Vishnu temple'
  6. main:'Engage in reading, writing, or any Mercury discipline daily' sub:'as a conscious practice that strengthens Budha' highlight:'reading, writing'
  7. main:'Reduce excessive talking and scattered multitasking' sub:'during Mercury-afflicted periods. Cultivate focus and depth' highlight:'excessive talking'

12 HOUSES bg: #fefce8. Footer icon: Zap color #ca8a04.
Footer text: "Mithuna air animates every house it touches, bringing
  <strong style={{ color: '#d97706' }}>curiosity, wit</strong> and the gift of connection."

FAQ bg: #fefce8. Glyph: ♊
H2: Frequently Asked <span green-700>Questions</span>
Sub: "Your top questions about Mithuna Rashi, answered with clarity"
aria-controls prefix: "mithuna-faq-"

CTA H2: "Want a Personalised Mithuna Reading?"
CTA bg: bg-gradient-to-r from-yellow-900 to-amber-900

═══════════════════════════════════════════════════════════════
PHASES 3-9
═══════════════════════════════════════════════════════════════
Phase 3: Route /zodiac/gemini -> MithunaRashiPage in App.tsx/router
Phase 4: Add '/zodiac/gemini' to prerender routes
Phase 5: Activate Gemini card on ZodiacHubPage (remove Coming Soon, add href="/zodiac/gemini")
Validation: same 10 gates, replace "vrishabha" with "mithuna"
Commit: "feat: add Mithuna Rashi (Gemini) pillar page with R2 assets, route, and hub update"
PR title: "feat: Mithuna Rashi (Gemini) pillar page"
Status doc: scripts/mithuna-rashi-page-status.md
