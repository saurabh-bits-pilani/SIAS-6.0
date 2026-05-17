# Simha Rashi Page — Build Brief
# Feature branch: feature/simha-rashi-page
# Output file: src/pages/zodiac/SimhaRashiPage.tsx
# Route: /zodiac/leo
# Status doc: scripts/simha-rashi-page-status.md

═══════════════════════════════════════════════════════════════
PHASE 0 — ASSET VERIFICATION AND R2 UPLOAD
═══════════════════════════════════════════════════════════════

Local asset folder: /Users/saurabhiim/Documents/Antigravity/SIAS-5.0-main/assets-to-upload/Leo/

Step 0.1 — Confirm these 4 files exist:
  - hero-banner-leo-rashi.png
  - mantra-background-leo-rashi.png
  - leo Rashi Quick Facts Strip.png   (note: space in filename, lowercase "leo")
  - Leo-card.png
If any file is missing, STOP and report.

Step 0.2 — Optimize with sharp:
  source ~/.zshrc && node -e "
    const sharp = require('sharp');
    const path = require('path');
    const base = '/Users/saurabhiim/Documents/Antigravity/SIAS-5.0-main/assets-to-upload/Leo';
    sharp(path.join(base,'hero-banner-leo-rashi.png')).resize(1600,null,{fit:'inside',withoutEnlargement:true}).webp({quality:85}).toFile(path.join(base,'hero-banner-simha-rashi.webp')).then(i=>console.log('hero',i.size));
    sharp(path.join(base,'mantra-background-leo-rashi.png')).resize(1600,null,{fit:'inside',withoutEnlargement:true}).webp({quality:85}).toFile(path.join(base,'mantra-bg-simha-rashi.webp')).then(i=>console.log('mantra',i.size));
    sharp(path.join(base,'leo Rashi Quick Facts Strip.png')).resize(1600,null,{fit:'inside',withoutEnlargement:true}).webp({quality:85}).toFile(path.join(base,'quick-facts-simha-rashi.webp')).then(i=>console.log('qf',i.size));
    sharp(path.join(base,'Leo-card.png')).resize(800,800,{fit:'inside',withoutEnlargement:true}).webp({quality:90}).toFile(path.join(base,'simha-card.webp')).then(i=>console.log('card',i.size));
  "
Size limits: hero/mantra/qf max 400KB, card max 200KB. Reduce quality by 5 if over.

Step 0.3 — Upload to R2 folder: Zodiac/Leo/
Expected public URLs:
  HERO_URL        = https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Leo/hero-banner-simha-rashi.webp
  MANTRA_BG_URL   = https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Leo/mantra-bg-simha-rashi.webp
  QUICK_FACTS_URL = https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Leo/quick-facts-simha-rashi.webp
  CARD_URL        = https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Leo/simha-card.webp

Step 0.4 — curl -I verify all 4 URLs return HTTP 200. If any fail, STOP.

═══════════════════════════════════════════════════════════════
PHASE 1 — BRANCH
═══════════════════════════════════════════════════════════════

cd /Users/saurabhiim/Documents/Antigravity/SIAS-5.0-main
git checkout main && git pull origin main
git checkout -b feature/simha-rashi-page

═══════════════════════════════════════════════════════════════
PHASE 2 — CREATE PAGE FILE
═══════════════════════════════════════════════════════════════

File: src/pages/zodiac/SimhaRashiPage.tsx
Template: MeshaRashiPage.tsx — identical structure, only data/colors/content change.

HARD RULES: No em-dashes. No emojis in code/JSX/content. No Gujarati. fetchpriority lowercase.
All Sanskrit followed by IAST + English meaning. Max 1 shloka. No @jalba/react-css-doodle.
No blog-images imports. All R2 URLs inline constants. Single self-contained .tsx file.

SIGN DATA
Sign:         Simha (Leo)
Sanskrit:     सिंह राशि
IAST:         Simha Rasi
English:      The Lion
Rashi number: 5th sign
Element:      Fire (Agni)
Quality:      Fixed (Sthira)
Ruler:        Surya (Sun)
Symbol:       The Lion  ♌
Lucky colour: Gold, orange, red
Lucky day:    Sunday
Gemstone:     Ruby (Manikya)
Body parts:   Heart, spine, upper back
Deity:        Lord Shiva (associated with Surya)
Shloka (1, from BPHS):
  Sanskrit:   Simho vahni-bhago nrpa-jati-sthiro vanacaro
  IAST:       Simho vahnibhago nrpajatisthiro vanacaro
  Meaning:    Leo is a fire sign, of fixed nature, of royal caste, dwelling in the forest.
  Source:     Brihat Parashara Hora Shastra

Page accent colors:
  Primary:   #b45309  (deep amber/gold)
  Secondary: #dc2626  (royal red)
  Highlight: #fef3c7  (pale gold)
  Heading replace: #b91c1c with #92400e

STRENGTH_ROWS (6)
{ icon: Crown,       label: 'Natural authority' },
{ icon: Flame,       label: 'Radiant and magnetic' },
{ icon: Heart,       label: 'Generous and warm' },
{ icon: ShieldCheck, label: 'Fiercely loyal' },
{ icon: Star,        label: 'Creative and dramatic' },
{ icon: Zap,         label: 'Courageous and bold' },

CHALLENGE_ROWS (4)
{ icon: ChevronsRight, label: 'Arrogant and domineering' },
{ icon: Timer,         label: 'Needs constant praise' },
{ icon: UserX,         label: 'Stubborn about status' },
{ icon: Clock,         label: 'Inflexible under criticism' },

HOUSE_DATA (12)
{ num:'01', color:'#b45309', heading:'LAGNA (SELF)',          icon:User,       desc:'Commanding presence, strong spine, natural authority, Sun-ruled confidence',              arrow:'Leadership is the default mode' },
{ num:'02', color:'#d97706', heading:'WEALTH & SPEECH',       icon:Coins,      desc:'Authoritative speech, wealth through status and enterprise, family with pride',          arrow:'Wealth reflects dignity and self-worth' },
{ num:'03', color:'#db2777', heading:'COURAGE & SIBLINGS',    icon:Users,      desc:'Bold creative expression, courageous siblings, short travels for recognition',          arrow:'Every act of courage is a performance of self' },
{ num:'04', color:'#7c3aed', heading:'HOME & MOTHER',         icon:Home,       desc:'Grand home, proud mother, strong identification with ancestral dignity',                 arrow:'Home must reflect status and grandeur' },
{ num:'05', color:'#db2777', heading:'CHILDREN & CREATIVITY', icon:Star,       desc:'Theatrical children, dramatic romance, creative genius in performance and leadership',  arrow:'Children become a source of pride and legacy' },
{ num:'06', color:'#1d4ed8', heading:'ENEMIES & SERVICE',     icon:Shield,     desc:'Overcomes adversaries through sheer will and authority',                                 arrow:'Military, surgical, or leadership service favoured' },
{ num:'07', color:'#0f766e', heading:'MARRIAGE & PARTNERS',   icon:Heart,      desc:'Regal spouse, partnerships that enhance status and mutual admiration',                   arrow:'Business partnerships with recognised figures' },
{ num:'08', color:'#7c3aed', heading:'TRANSFORMATION',        icon:Zap,        desc:'Dramatic life transformations, interest in power behind the scenes, hidden enemies',    arrow:'Transformation through surrender of ego' },
{ num:'09', color:'#d97706', heading:'DHARMA & FATHER',       icon:Compass,    desc:'Proud, dignified father, faith expressed through generosity and ritual, royal pilgrimages', arrow:'Dharma expressed through noble action' },
{ num:'10', color:'#1d4ed8', heading:'CAREER & STATUS',       icon:TrendingUp, desc:'Career in politics, management, entertainment, medicine, or government',                arrow:'Recognition is not sought but expected' },
{ num:'11', color:'#b45309', heading:'GAINS & FRIENDS',       icon:Users,      desc:'Friends in high places, gains through networks of influence and prestige',              arrow:'Fulfilment through being celebrated and respected' },
{ num:'12', color:'#0f766e', heading:'LIBERATION & FOREIGN',  icon:Globe,      desc:'Spiritual seeker of the sacred, hidden pride, foreign lands offer recognition',        arrow:'Liberation through dissolution of the royal self' },

FAQ_DATA (5)
FAQ1: q='What is Simha Rashi in Vedic astrology?' icon=HelpCircle color='#b45309' showImage=true
  a: Simha Rashi (Leo) is the fifth sign of the Vedic sidereal zodiac, spanning 120 to
     150 degrees. It is a fixed fire sign ruled by Surya (the Sun), the planet of soul,
     authority, and self-expression. Natives with the Moon in Simha carry a natural
     regality, creative brilliance, and an unshakeable need to shine.

FAQ2: q='Who is the ruling planet of Simha Rashi?' icon=Globe color='#d97706'
  a: Surya (the Sun) is the ruling planet of Simha Rashi. The Sun governs soul, vitality,
     father, authority, government, and the spine. A strong Sun amplifies leadership,
     charisma, and self-confidence. A weak or afflicted Sun can bring ego struggles,
     poor health of the heart and eyes, and conflicts with authority.

FAQ3: q='What are the personality traits of Simha Rashi natives?' icon=User color='#7c3aed'
  a: Simha natives are bold, generous, and magnetically charismatic. They lead naturally
     and inspire loyalty through warmth and authority. Their greatest challenge is the ego:
     an excessive need for recognition and an inability to accept criticism. When their
     solar energy is directed toward service rather than performance, Simha natives become
     exceptional leaders and patrons.

FAQ4: q='Which gemstone is recommended for Simha Rashi?' icon=Gem color='#1d4ed8'
  a: Ruby (Manikya) is the classical gemstone for Simha Rashi, worn to strengthen Surya
     (the Sun). It should be set in gold and worn on the ring finger of the right hand
     on a Sunday morning after proper mantra invocation. A chart-based consultation with
     a qualified jyotishi at Soul Infinity Astro Solutions is essential before wearing any
     planetary gemstone.

FAQ5: q='What are the lucky days and colours for Simha Rashi?' icon=Calendar color='#0f766e'
  a: Sunday is the most auspicious day for Simha Rashi natives, governed by Surya.
     Gold, orange, and red are the lucky colours. Offering water to the Sun at sunrise,
     visiting Sun temples, and wearing gold or orange on important days are traditional
     practices that channel solar energy constructively.

SEO HEAD
title:       "Simha Rashi (Leo), Traits, Mantra, Remedies | Soul Infinity"
description: "Simha Rashi (Leo) in Vedic astrology, ruled by Surya (Sun). Personality traits, mantra, remedies, characteristics, and houses placement, guided by Saurabh Jain."
keywords:    "simha rashi, leo vedic astrology, surya, sun, leo traits, simha mantra, ruby, manikya, simha remedies, soul infinity"
url:         '/zodiac/leo'
breadcrumbs: Home > Zodiac Signs > Simha (Leo)

TITLE STRIP
Eyebrow:  सिंह राशि · Leo  (color: text-amber-700)
H1:       "Simha Rashi, The Royal of the Zodiac"
Subtitle: "Ruled by Surya (Sun) · Fire Sign · The Lion"

ABOUT SECTION bg: #fffbeb
Card1: Simha (Leo) is the fifth sign of the Vedic zodiac, ruled by Surya (the Sun),
  the planet of soul, authority, and vitality. As a fixed fire sign, Simha carries
  the energy of sovereignty, the force that illuminates, commands, and inspires.
Card2 title "The Royal": In the Brihat Parashara Hora Shastra, Simha is described as
  a sign of royal (Kshatriya) nature, dwelling in the forest, representing the
  untamed power of the Sun at its fullest expression.
Card3 title "Born to Lead": The Lion does not follow. It establishes the direction,
  radiates authority, and expects those around it to recognise the light it carries.
Card4 title "Generous by Nature": Despite the boldness of their personality, Simha
  natives are among the most generous of the zodiac. They give with the open hand
  of a king, expecting gratitude but never diminishing those they help.

MANTRA SECTION: use MANTRA_BG_URL image.
  Mantra:   Om Hrim Hraum Suryaya Namah
  Sanskrit: ॐ ह्रीं ह्रौं सूर्याय नमः
  IAST:     Om Hrim Hraum Suryaya Namah
  Meaning:  Salutation to Surya (the Sun), the source of light, soul, and authority.
  Practice: Chant 108 times on Sunday mornings at sunrise, facing east.

REMEDIES SECTION (JSX, no bg image): bg #1c0a00 (deep dark amber)
H2: "Classical Vedic Remedies for Simha Rashi"
7 remedy cards, 2-col grid:
  1. main:'Offer Arghya (water) to the rising Sun every morning' sub:'while chanting Om Hrim Hraum Suryaya Namah' highlight:'Arghya to the rising Sun'
  2. main:'Wear Ruby (Manikya) set in gold on the ring finger' sub:'only after a chart-based recommendation' highlight:'Ruby (Manikya)'
  3. main:'Donate wheat, jaggery, red cloth, or copper' sub:'on Sundays at a Surya or Shiva temple' highlight:'wheat, jaggery, red cloth'
  4. main:'Recite the Aditya Hridayam or Surya Ashtakam on Sundays' sub:'for vitality, clarity, and authority' highlight:'Aditya Hridayam or Surya Ashtakam'
  5. main:'Visit a Surya temple on Sundays' sub:'and offer red flowers and sandalwood' highlight:'Surya temple'
  6. main:'Cultivate leadership and creative expression consciously' sub:'through arts, management, or public service' highlight:'leadership and creative expression'
  7. main:'Reduce excessive pride and the need for constant validation' sub:'during Sun-afflicted periods. Practise humility and service' highlight:'excessive pride'

12 HOUSES bg: #fffbeb. Footer icon: Flame color #b45309.
Footer text: "Simha fire illuminates every house it rules, bringing
  <strong style={{ color: '#d97706' }}>authority, warmth</strong> and the radiance of the Sun."

FAQ bg: #fffbeb. Glyph: ♌
H2: Frequently Asked <span amber-700>Questions</span>
Sub: "Your top questions about Simha Rashi, answered with clarity"
aria-controls prefix: "simha-faq-"

CTA H2: "Want a Personalised Simha Reading?"
CTA bg: bg-gradient-to-r from-amber-900 to-orange-900

═══════════════════════════════════════════════════════════════
PHASES 3-9
═══════════════════════════════════════════════════════════════
Phase 3: Route /zodiac/leo -> SimhaRashiPage
Phase 4: Add '/zodiac/leo' to prerender routes
Phase 5: Activate Leo card on ZodiacHubPage
Validation: same 10 gates, replace names with "simha"
Commit: "feat: add Simha Rashi (Leo) pillar page with R2 assets, route, and hub update"
PR title: "feat: Simha Rashi (Leo) pillar page"
Status doc: scripts/simha-rashi-page-status.md
