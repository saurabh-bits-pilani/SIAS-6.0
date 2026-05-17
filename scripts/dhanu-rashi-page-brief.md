# Dhanu Rashi Page — Build Brief
# Feature branch: feature/dhanu-rashi-page
# Output file: src/pages/zodiac/DhanuRashiPage.tsx
# Route: /zodiac/sagittarius
# Status doc: scripts/dhanu-rashi-page-status.md

PHASE 0 — ASSETS
Folder: /Users/saurabhiim/Documents/Antigravity/SIAS-5.0-main/assets-to-upload/Sagittarius/
Files: hero-banner-sagittarius-rashi.png | mantra-background-Sagittarius.png | Sagittarius Rashi Quick Facts Strip.png | Sagittarius.png
Optimize (sharp):
  source ~/.zshrc && node -e "
    const sharp = require('sharp');
    const path = require('path');
    const base = '/Users/saurabhiim/Documents/Antigravity/SIAS-5.0-main/assets-to-upload/Sagittarius';
    sharp(path.join(base,'hero-banner-sagittarius-rashi.png')).resize(1600,null,{fit:'inside',withoutEnlargement:true}).webp({quality:85}).toFile(path.join(base,'hero-banner-dhanu-rashi.webp')).then(i=>console.log('hero',i.size));
    sharp(path.join(base,'mantra-background-Sagittarius.png')).resize(1600,null,{fit:'inside',withoutEnlargement:true}).webp({quality:85}).toFile(path.join(base,'mantra-bg-dhanu-rashi.webp')).then(i=>console.log('mantra',i.size));
    sharp(path.join(base,'Sagittarius Rashi Quick Facts Strip.png')).resize(1600,null,{fit:'inside',withoutEnlargement:true}).webp({quality:85}).toFile(path.join(base,'quick-facts-dhanu-rashi.webp')).then(i=>console.log('qf',i.size));
    sharp(path.join(base,'Sagittarius.png')).resize(800,800,{fit:'inside',withoutEnlargement:true}).webp({quality:90}).toFile(path.join(base,'dhanu-card.webp')).then(i=>console.log('card',i.size));
  "
R2 folder: Zodiac/Sagittarius/
URLs:
  HERO_URL        = https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Sagittarius/hero-banner-dhanu-rashi.webp
  MANTRA_BG_URL   = https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Sagittarius/mantra-bg-dhanu-rashi.webp
  QUICK_FACTS_URL = https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Sagittarius/quick-facts-dhanu-rashi.webp
  CARD_URL        = https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Sagittarius/dhanu-card.webp
curl -I verify all 4. If any non-200, STOP.

PHASE 1 — BRANCH
git checkout main && git pull && git checkout -b feature/dhanu-rashi-page

PHASE 2 — PAGE: src/pages/zodiac/DhanuRashiPage.tsx
Template: MeshaRashiPage.tsx. Same hard rules apply.

SIGN DATA
Sign: Dhanu (Sagittarius) | Sanskrit: धनु राशि | IAST: Dhanu Rasi | English: The Archer
Rashi: 9th | Element: Fire (Agni) | Quality: Mutable (Dvisvabhava)
Ruler: Guru (Jupiter) | Symbol: The Archer ♐
Lucky colour: Yellow, orange, purple | Lucky day: Thursday | Gemstone: Yellow Sapphire (Pukhraj)
Body parts: Hips, thighs, liver, sciatic nerve
Shloka: "Dhanus tri-kona vahnibhago dvibhavah brahmanah guru-nathah"
  IAST: Dhanus trikona vahnibhago dvibhavah brahmanah gurunathah
  Meaning: Sagittarius is a fiery mutable sign of Brahmin caste, ruled by Jupiter.
  Source: Brihat Parashara Hora Shastra

Colors: Primary #a16207 (deep saffron/gold), Secondary #7c3aed (purple accent), Highlight #fef9c3
Heading replace #b91c1c with #92400e

STRENGTH_ROWS:
{ icon: Compass,     label: 'Philosophical and wise' },
{ icon: Globe,       label: 'Adventurous and free' },
{ icon: Sparkles,    label: 'Optimistic and expansive' },
{ icon: Heart,       label: 'Generous and honest' },
{ icon: TrendingUp,  label: 'Visionary and inspired' },
{ icon: Users,       label: 'Natural teacher and guide' },

CHALLENGE_ROWS:
{ icon: ChevronsRight, label: 'Tactless and blunt' },
{ icon: Timer,         label: 'Restless and uncommitted' },
{ icon: UserX,         label: 'Overconfident at times' },
{ icon: Clock,         label: 'Avoids responsibility' },

HOUSE_DATA (12):
{ num:'01', color:'#a16207', heading:'LAGNA (SELF)',          icon:User,       desc:'Athletic build, philosophical mind, love of freedom, Jupiter-blessed confidence',       arrow:'Expansion and truth are the core life drives' },
{ num:'02', color:'#d97706', heading:'WEALTH & SPEECH',       icon:Coins,      desc:'Philosophical and honest speech, wealth through teaching or foreign trade, generous family', arrow:'Abundance comes through optimism and generosity' },
{ num:'03', color:'#db2777', heading:'COURAGE & SIBLINGS',    icon:Users,      desc:'Broad-minded communication, adventurous siblings, long-distance travels for knowledge', arrow:'Courage expressed through the pursuit of truth' },
{ num:'04', color:'#7c3aed', heading:'HOME & MOTHER',         icon:Home,       desc:'Open and expansive home, philosophical mother, preference for large spaces and nature', arrow:'Home is wherever wisdom and freedom coexist' },
{ num:'05', color:'#db2777', heading:'CHILDREN & CREATIVITY', icon:Star,       desc:'Philosophical and athletic children, idealistic romance, creative teaching and writing', arrow:'Children become students of the world' },
{ num:'06', color:'#1d4ed8', heading:'ENEMIES & SERVICE',     icon:Shield,     desc:'Overcomes adversity through optimism and expansion',                                    arrow:'Teaching, law, medicine, or foreign service' },
{ num:'07', color:'#0f766e', heading:'MARRIAGE & PARTNERS',   icon:Heart,      desc:'Partner who shares love of freedom and philosophy, expansive business partnerships',   arrow:'Marriage as a philosophical journey together' },
{ num:'08', color:'#7c3aed', heading:'TRANSFORMATION',        icon:Zap,        desc:'Transformation through philosophy and long journeys, interest in higher occult wisdom', arrow:'Transformation through radical expansion of belief' },
{ num:'09', color:'#d97706', heading:'DHARMA & FATHER',       icon:Compass,    desc:'This is Dhanu natural house of dharma: powerful spiritual quest, wise father',         arrow:'Dharma as a lifelong pilgrimage of understanding' },
{ num:'10', color:'#1d4ed8', heading:'CAREER & STATUS',       icon:TrendingUp, desc:'Career in teaching, philosophy, law, foreign trade, publishing, or spiritual guidance', arrow:'Recognition through wisdom and vision' },
{ num:'11', color:'#a16207', heading:'GAINS & FRIENDS',       icon:Users,      desc:'Friends from diverse cultures and philosophies, gains through teaching and travel',    arrow:'Fulfilment through expansion of wisdom and reach' },
{ num:'12', color:'#0f766e', heading:'LIBERATION & FOREIGN',  icon:Globe,      desc:'Foreign lands are a second home, spiritual seeker, liberation through transcendence',  arrow:'Liberation through union with the universal Self' },

FAQs (5):
FAQ1: q='What is Dhanu Rashi in Vedic astrology?' color='#a16207' showImage=true
  a: Dhanu Rashi (Sagittarius) is the ninth sign of the Vedic sidereal zodiac, spanning
     240 to 270 degrees. It is a mutable fire sign ruled by Guru (Jupiter), the planet of
     wisdom, expansion, and dharma. Natives with the Moon in Dhanu are philosophical,
     freedom-loving, and guided by an unshakeable optimism about the nature of life.
FAQ2: q='Who is the ruling planet of Dhanu Rashi?' color='#d97706'
  a: Guru (Jupiter) is the ruling planet of Dhanu Rashi. Jupiter governs wisdom, dharma,
     teaching, children, wealth, and spiritual expansion. A strong Jupiter gives optimism,
     generosity, and philosophical insight. An afflicted Jupiter can bring overconfidence,
     excess, and laziness born of complacency.
FAQ3: q='What are the personality traits of Dhanu Rashi natives?' color='#7c3aed'
  a: Dhanu natives are enthusiastic, philosophically inclined, and deeply honest. They
     seek meaning in all experiences and are natural teachers who inspire others with their
     breadth of vision. Their challenge is consistency: the archer aims far but sometimes
     loses interest before the arrow lands. When Dhanu energy is combined with discipline,
     these natives become extraordinary guides, scholars, and explorers.
FAQ4: q='Which gemstone is recommended for Dhanu Rashi?' color='#1d4ed8'
  a: Yellow Sapphire (Pukhraj) is the classical gemstone for Dhanu Rashi, worn to strengthen
     Guru (Jupiter). Set in gold, worn on the index finger of the right hand on a Thursday
     morning. Chart-based consultation is essential before wearing any planetary gemstone.
FAQ5: q='What are the lucky days and colours for Dhanu Rashi?' color='#0f766e'
  a: Thursday is the most auspicious day for Dhanu Rashi natives. Yellow, orange, and
     purple are the lucky colours. Visiting Vishnu or Brihaspati temples on Thursdays,
     fasting, and wearing yellow on important days are traditional supportive practices.

SEO: title "Dhanu Rashi (Sagittarius), Traits, Mantra, Remedies | Soul Infinity"
     url '/zodiac/sagittarius', breadcrumbs Home > Zodiac Signs > Dhanu (Sagittarius)

TITLE STRIP: Eyebrow धनु राशि · Sagittarius (text-yellow-800)
H1: "Dhanu Rashi, The Philosopher of the Zodiac"
Subtitle: "Ruled by Guru (Jupiter) · Fire Sign · The Archer"

ABOUT bg #fefce8: Cards — intro Jupiter/Fire/wisdom, Card2 "The Philosopher" BPHS brahmin nature,
Card3 "Born to Seek" the Archer aims at distant horizons, Card4 "Gifted with Vision" natural teachers.

MANTRA: use MANTRA_BG_URL. Om Graam Greem Graum Sah Guruve Namah.
Sanskrit: ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः. Practice: Thursday mornings, facing north-east.

REMEDIES bg #1a1000 (deep dark saffron-black): H2 "Classical Vedic Remedies for Dhanu Rashi"
  1. Chant Guru Beej mantra (Om Graam Greem Graum Sah Guruve Namah), 108 times Thursday mornings, highlight:'Guru Beej mantra'
  2. Wear Yellow Sapphire (Pukhraj) in gold on index finger, chart-based only, highlight:'Yellow Sapphire (Pukhraj)'
  3. Donate yellow lentils, turmeric, yellow cloth, or gold on Thursdays, highlight:'yellow lentils, turmeric'
  4. Recite Vishnu Sahasranama or Guru Stotra on Thursdays, highlight:'Vishnu Sahasranama or Guru Stotra'
  5. Visit a Vishnu or Brihaspati temple on Thursdays, offer yellow flowers and gram lentils, highlight:'Vishnu or Brihaspati temple'
  6. Engage in teaching, learning, or philosophical study as a daily practice, highlight:'teaching, learning'
  7. Reduce overconfidence, excess, and scattered idealism during Jupiter-afflicted periods, highlight:'overconfidence, excess'

12 HOUSES bg #fefce8. Footer icon: Compass color #a16207.
Footer text: "Dhanu fire expands every house it illuminates, bringing <strong style={{ color: '#d97706' }}>wisdom, freedom</strong> and the arrow of truth."

FAQ bg #fefce8. Glyph ♐. aria prefix "dhanu-faq-"
CTA H2: "Want a Personalised Dhanu Reading?"
CTA bg: bg-gradient-to-r from-yellow-900 to-orange-900

PHASES 3-9: Route /zodiac/sagittarius, prerender, activate Sagittarius hub card.
Commit: "feat: add Dhanu Rashi (Sagittarius) pillar page with R2 assets, route, and hub update"
Status doc: scripts/dhanu-rashi-page-status.md
