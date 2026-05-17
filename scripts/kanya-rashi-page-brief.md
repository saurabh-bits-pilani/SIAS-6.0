# Kanya Rashi Page — Build Brief
# Feature branch: feature/kanya-rashi-page
# Output file: src/pages/zodiac/KanyaRashiPage.tsx
# Route: /zodiac/virgo
# Status doc: scripts/kanya-rashi-page-status.md

═══════════════════════════════════════════════════════════════
PHASE 0 — ASSET VERIFICATION AND R2 UPLOAD
═══════════════════════════════════════════════════════════════

Local asset folder: /Users/saurabhiim/Documents/Antigravity/SIAS-5.0-main/assets-to-upload/Virgo/

Step 0.1 — Confirm these 4 files exist:
  - hero-banner-virgo-rashi.png
  - mantra-background-virgo.png
  - Virgo Rashi Quick Facts Strip.png
  - virgo-card.png
If any file is missing, STOP and report.

Step 0.2 — Optimize with sharp:
  source ~/.zshrc && node -e "
    const sharp = require('sharp');
    const path = require('path');
    const base = '/Users/saurabhiim/Documents/Antigravity/SIAS-5.0-main/assets-to-upload/Virgo';
    sharp(path.join(base,'hero-banner-virgo-rashi.png')).resize(1600,null,{fit:'inside',withoutEnlargement:true}).webp({quality:85}).toFile(path.join(base,'hero-banner-kanya-rashi.webp')).then(i=>console.log('hero',i.size));
    sharp(path.join(base,'mantra-background-virgo.png')).resize(1600,null,{fit:'inside',withoutEnlargement:true}).webp({quality:85}).toFile(path.join(base,'mantra-bg-kanya-rashi.webp')).then(i=>console.log('mantra',i.size));
    sharp(path.join(base,'Virgo Rashi Quick Facts Strip.png')).resize(1600,null,{fit:'inside',withoutEnlargement:true}).webp({quality:85}).toFile(path.join(base,'quick-facts-kanya-rashi.webp')).then(i=>console.log('qf',i.size));
    sharp(path.join(base,'virgo-card.png')).resize(800,800,{fit:'inside',withoutEnlargement:true}).webp({quality:90}).toFile(path.join(base,'kanya-card.webp')).then(i=>console.log('card',i.size));
  "

Step 0.3 — Upload to R2 folder: Zodiac/Virgo/
  HERO_URL        = https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Virgo/hero-banner-kanya-rashi.webp
  MANTRA_BG_URL   = https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Virgo/mantra-bg-kanya-rashi.webp
  QUICK_FACTS_URL = https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Virgo/quick-facts-kanya-rashi.webp
  CARD_URL        = https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Virgo/kanya-card.webp
Step 0.4 — curl -I all 4 URLs. If any non-200, STOP.

═══════════════════════════════════════════════════════════════
PHASE 1 — BRANCH
═══════════════════════════════════════════════════════════════
git checkout main && git pull origin main && git checkout -b feature/kanya-rashi-page

═══════════════════════════════════════════════════════════════
PHASE 2 — PAGE DATA
═══════════════════════════════════════════════════════════════

File: src/pages/zodiac/KanyaRashiPage.tsx
HARD RULES: same as all zodiac pages (no em-dash, no emoji, no Gujarati, fetchpriority lowercase, max 1 shloka, no blog-images, inline R2 constants, self-contained tsx).

SIGN DATA
Sign: Kanya (Virgo) | Sanskrit: कन्या राशि | IAST: Kanya Rasi | English: The Maiden
Rashi: 6th | Element: Earth (Prithvi) | Quality: Mutable (Dvisvabhava)
Ruler: Budha (Mercury) | Symbol: The Maiden ♍
Lucky colour: Green, grey, blue | Lucky day: Wednesday | Gemstone: Emerald (Panna)
Body parts: Intestines, digestive system, lower abdomen
Shloka: "Kanya dvibhava prithvibhaga vaishya-jati budha-isha"
  IAST: Kanya dvibhava prthvibhaga vaishyajati budhesha
  Meaning: Virgo is a mutable earth sign of merchant caste, ruled by Mercury.
  Source: Brihat Parashara Hora Shastra

Colors: Primary #065f46 (deep emerald), Secondary #d97706, Highlight #ecfdf5
Heading replace #b91c1c with #065f46

STRENGTH_ROWS:
{ icon: Target,      label: 'Analytical and precise' },
{ icon: ShieldCheck, label: 'Deeply reliable' },
{ icon: Activity,    label: 'Hardworking and diligent' },
{ icon: Sparkles,    label: 'Keen eye for detail' },
{ icon: Heart,       label: 'Caring and selfless' },
{ icon: Compass,     label: 'Discerning and methodical' },

CHALLENGE_ROWS:
{ icon: ChevronsRight, label: 'Overly critical and anxious' },
{ icon: Timer,         label: 'Perfectionist paralysis' },
{ icon: UserX,         label: 'Worries excessively' },
{ icon: Clock,         label: 'Difficulty trusting others' },

HOUSE_DATA (12):
{ num:'01', color:'#065f46', heading:'LAGNA (SELF)',          icon:User,       desc:'Methodical mind, modest appearance, detail-oriented, health-conscious temperament',        arrow:'Service and precision define the self' },
{ num:'02', color:'#d97706', heading:'WEALTH & SPEECH',       icon:Coins,      desc:'Analytical speech, wealth through skilled service, family with high standards',          arrow:'Wealth built through careful management' },
{ num:'03', color:'#db2777', heading:'COURAGE & SIBLINGS',    icon:Users,      desc:'Precise communication, methodical siblings, travels for work or analysis',               arrow:'Courage expressed through mastery and competence' },
{ num:'04', color:'#7c3aed', heading:'HOME & MOTHER',         icon:Home,       desc:'Organised home, health-conscious mother, preference for cleanliness and order',          arrow:'Home is a place of efficiency and quiet beauty' },
{ num:'05', color:'#db2777', heading:'CHILDREN & CREATIVITY', icon:Star,       desc:'Intelligent children, analytical approach to romance, creative gift for craft and detail', arrow:'Creativity expressed through perfection of form' },
{ num:'06', color:'#1d4ed8', heading:'ENEMIES & SERVICE',     icon:Shield,     desc:'Overcomes all obstacles through tireless work and discrimination',                       arrow:'Healthcare, analysis, or service careers excel' },
{ num:'07', color:'#0f766e', heading:'MARRIAGE & PARTNERS',   icon:Heart,      desc:'Discerning and devoted spouse, partnerships built on usefulness and mutual service',     arrow:'Business partnerships in health or skilled trades' },
{ num:'08', color:'#7c3aed', heading:'TRANSFORMATION',        icon:Zap,        desc:'Deep analysis of hidden matters, interest in healing sciences and research',            arrow:'Transformation through purification and surrender' },
{ num:'09', color:'#d97706', heading:'DHARMA & FATHER',       icon:Compass,    desc:'Disciplined faith, scholarly father, pilgrimages for knowledge and purification',       arrow:'Dharma found in daily discipline and service' },
{ num:'10', color:'#1d4ed8', heading:'CAREER & STATUS',       icon:TrendingUp, desc:'Career in medicine, editing, accounting, research, nutrition, or skilled crafts',       arrow:'Recognition through mastery of craft' },
{ num:'11', color:'#065f46', heading:'GAINS & FRIENDS',       icon:Users,      desc:'Friends who are colleagues, gains through service and technical skill',                  arrow:'Fulfilment through contribution and usefulness' },
{ num:'12', color:'#0f766e', heading:'LIBERATION & FOREIGN',  icon:Globe,      desc:'Spiritual service, hidden anxieties, foreign travel for work or healing',               arrow:'Liberation through dissolution of the critical self' },

FAQs:
FAQ1: q='What is Kanya Rashi in Vedic astrology?' color='#065f46' showImage=true
  a: Kanya Rashi (Virgo) is the sixth sign of the Vedic sidereal zodiac, spanning 150 to
     180 degrees. It is a mutable earth sign ruled by Budha (Mercury), the planet of
     intellect and discrimination. Natives with the Moon in Kanya are analytical, hardworking,
     and devoted to service. They seek perfection in everything they do.
FAQ2: q='Who is the ruling planet of Kanya Rashi?' color='#d97706'
  a: Budha (Mercury) is the ruling planet of Kanya Rashi. In Kanya, Mercury's analytical
     and discriminating qualities are expressed most fully. A strong Mercury gives precision,
     communication mastery, and exceptional skill in craft. A weak Mercury can cause
     excessive worry, nervous disorders, and digestive complaints.
FAQ3: q='What are the personality traits of Kanya Rashi natives?' color='#7c3aed'
  a: Kanya natives are modest, methodical, and deeply dedicated. They notice what others
     miss, improve what others leave imperfect, and serve where others seek recognition.
     Their challenge is the inner critic: a voice that finds fault not only in the world
     but in themselves. When that discernment is directed outward constructively, Kanya
     natives become the finest healers, analysts, and craftspeople of the zodiac.
FAQ4: q='Which gemstone is recommended for Kanya Rashi?' color='#1d4ed8'
  a: Emerald (Panna) is the classical gemstone for Kanya Rashi, worn to strengthen
     Budha (Mercury). Set in gold, worn on the little finger of the right hand on a
     Wednesday morning. A chart-based consultation is essential before wearing.
FAQ5: q='What are the lucky days and colours for Kanya Rashi?' color='#0f766e'
  a: Wednesday is the most auspicious day for Kanya Rashi natives. Green, grey, and
     blue are the lucky colours. Fasting on Wednesdays, reading sacred texts, and
     conscious daily service are traditional supportive practices.

SEO: title "Kanya Rashi (Virgo), Traits, Mantra, Remedies | Soul Infinity"
     url '/zodiac/virgo', breadcrumbs Home > Zodiac Signs > Kanya (Virgo)

TITLE STRIP: Eyebrow कन्या राशि · Virgo (text-emerald-800)
H1: "Kanya Rashi, The Craftsperson of the Zodiac"
Subtitle: "Ruled by Budha (Mercury) · Earth Sign · The Maiden"

ABOUT bg #f0fdf4: Cards — intro Mercury/Earth/service, Card2 "The Craftsperson" BPHS Vaishya nature,
Card3 "Born to Serve" Kanya serves not from weakness but from mastery, Card4 "Gifted with Precision" finest analysts.

MANTRA: use MANTRA_BG_URL. Om Bum Budhaya Namah (same as Mithuna — both ruled by Mercury).
Sanskrit: ॐ बुं बुधाय नमः. Practice: Wednesday mornings facing north.

REMEDIES bg #052e16 (dark forest green): same Mercury/Budha remedies as Mithuna with Kanya-specific adjustments:
  1. Chant Budha Beej mantra (Om Bum Budhaya Namah), 108 times Wednesday mornings
  2. Wear Emerald (Panna) in gold on little finger, chart-based only
  3. Donate green vegetables, green cloth, or books on Wednesdays
  4. Recite Budha Stotra or Vishnu Sahasranama on Wednesdays
  5. Visit a Vishnu temple on Wednesdays, offer tulsi and yellow flowers
  6. Practise a daily health or healing discipline: yoga, nutrition, or Ayurveda
  7. Reduce excessive self-criticism and anxiety during Mercury-afflicted periods

12 HOUSES bg #f0fdf4. Footer icon: Activity color #065f46.
Footer text: "Kanya earth purifies every house it touches, bringing <strong style={{ color: '#d97706' }}>precision, healing</strong> and the gift of discernment."

FAQ bg #f0fdf4. Glyph ♍. aria prefix "kanya-faq-"
CTA H2: "Want a Personalised Kanya Reading?"
CTA bg: bg-gradient-to-r from-emerald-900 to-teal-900

PHASES 3-9: Route /zodiac/virgo, prerender, activate Virgo hub card.
Commit: "feat: add Kanya Rashi (Virgo) pillar page with R2 assets, route, and hub update"
Status doc: scripts/kanya-rashi-page-status.md
