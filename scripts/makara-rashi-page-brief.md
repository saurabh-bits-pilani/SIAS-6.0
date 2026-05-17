# Makara Rashi Page — Build Brief
# Feature branch: feature/makara-rashi-page
# Output file: src/pages/zodiac/MakaraRashiPage.tsx
# Route: /zodiac/capricorn
# Status doc: scripts/makara-rashi-page-status.md

PHASE 0 — ASSETS
Folder: /Users/saurabhiim/Documents/Antigravity/SIAS-5.0-main/assets-to-upload/Capricorn/
Files: hero-banner-capricon-rashi.png | mantra-background-capricon.png | capricon Rashi Quick Facts Strip.png | capricon.png
NOTE: all filenames use "capricon" spelling (without the second 'r'). Use exact filenames.
Optimize (sharp):
  source ~/.zshrc && node -e "
    const sharp = require('sharp');
    const path = require('path');
    const base = '/Users/saurabhiim/Documents/Antigravity/SIAS-5.0-main/assets-to-upload/Capricorn';
    sharp(path.join(base,'hero-banner-capricon-rashi.png')).resize(1600,null,{fit:'inside',withoutEnlargement:true}).webp({quality:85}).toFile(path.join(base,'hero-banner-makara-rashi.webp')).then(i=>console.log('hero',i.size));
    sharp(path.join(base,'mantra-background-capricon.png')).resize(1600,null,{fit:'inside',withoutEnlargement:true}).webp({quality:85}).toFile(path.join(base,'mantra-bg-makara-rashi.webp')).then(i=>console.log('mantra',i.size));
    sharp(path.join(base,'capricon Rashi Quick Facts Strip.png')).resize(1600,null,{fit:'inside',withoutEnlargement:true}).webp({quality:85}).toFile(path.join(base,'quick-facts-makara-rashi.webp')).then(i=>console.log('qf',i.size));
    sharp(path.join(base,'capricon.png')).resize(800,800,{fit:'inside',withoutEnlargement:true}).webp({quality:90}).toFile(path.join(base,'makara-card.webp')).then(i=>console.log('card',i.size));
  "
R2 folder: Zodiac/Capricorn/
URLs:
  HERO_URL        = https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Capricorn/hero-banner-makara-rashi.webp
  MANTRA_BG_URL   = https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Capricorn/mantra-bg-makara-rashi.webp
  QUICK_FACTS_URL = https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Capricorn/quick-facts-makara-rashi.webp
  CARD_URL        = https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Capricorn/makara-card.webp
curl -I verify all 4. If any non-200, STOP.

PHASE 1 — BRANCH
git checkout main && git pull && git checkout -b feature/makara-rashi-page

PHASE 2 — PAGE: src/pages/zodiac/MakaraRashiPage.tsx
Template: MeshaRashiPage.tsx. Same hard rules apply.

SIGN DATA
Sign: Makara (Capricorn) | Sanskrit: मकर राशि | IAST: Makara Rasi | English: The Sea-Goat
Rashi: 10th | Element: Earth (Prithvi) | Quality: Cardinal (Chara)
Ruler: Shani (Saturn) | Symbol: The Sea-Goat ♑
NOTE: Makara is also the sign of exaltation for Mangala (Mars).
Lucky colour: Dark blue, black, grey | Lucky day: Saturday | Gemstone: Blue Sapphire (Neelam)
Body parts: Knees, bones, joints, teeth, skin
Shloka: "Makaro nrpa-jati-sthira prithvibhago shani-nathah"
  IAST: Makaro nrpajatisthira prthvibhago shaninathah
  Meaning: Capricorn is a cardinal earth sign of royal caste, ruled by Saturn.
  Source: Brihat Parashara Hora Shastra

Colors: Primary #1e3a5f (deep navy), Secondary #d97706, Highlight #f0f4f8
Heading replace #b91c1c with #1e3a5f

STRENGTH_ROWS:
{ icon: Mountain,    label: 'Disciplined and structured' },
{ icon: ShieldCheck, label: 'Responsible and reliable' },
{ icon: TrendingUp,  label: 'Ambitious and persistent' },
{ icon: Compass,     label: 'Patient and strategic' },
{ icon: Activity,    label: 'Hardworking and enduring' },
{ icon: Crown,       label: 'Gains mastery over time' },

CHALLENGE_ROWS:
{ icon: ChevronsRight, label: 'Cold and emotionally distant' },
{ icon: Timer,         label: 'Overly cautious and rigid' },
{ icon: UserX,         label: 'Pessimistic under pressure' },
{ icon: Clock,         label: 'Difficulty expressing warmth' },

HOUSE_DATA (12):
{ num:'01', color:'#1e3a5f', heading:'LAGNA (SELF)',          icon:User,       desc:'Lean build, serious demeanour, disciplined nature, slow but steady in all endeavours',   arrow:'Structure and ambition define the self' },
{ num:'02', color:'#d97706', heading:'WEALTH & SPEECH',       icon:Coins,      desc:'Measured speech, wealth through discipline and long-term effort, traditional family',   arrow:'Wealth built brick by brick over decades' },
{ num:'03', color:'#db2777', heading:'COURAGE & SIBLINGS',    icon:Users,      desc:'Methodical communication, serious siblings, purposeful short travels',                  arrow:'Courage expressed through responsibility' },
{ num:'04', color:'#7c3aed', heading:'HOME & MOTHER',         icon:Home,       desc:'Austere home, disciplined mother, strong connection to ancestral land and property',    arrow:'Home as a legacy to be built and preserved' },
{ num:'05', color:'#db2777', heading:'CHILDREN & CREATIVITY', icon:Star,       desc:'Disciplined children, serious approach to romance, creative expression through structure', arrow:'Creativity refined by patience and form' },
{ num:'06', color:'#1d4ed8', heading:'ENEMIES & SERVICE',     icon:Shield,     desc:'Outlasts all opposition through sheer endurance and systematic effort',                 arrow:'Administration, engineering, or government service' },
{ num:'07', color:'#0f766e', heading:'MARRIAGE & PARTNERS',   icon:Heart,      desc:'Loyal and responsible spouse, partnerships built on shared goals and mutual respect',   arrow:'Business partnerships with long-term vision' },
{ num:'08', color:'#7c3aed', heading:'TRANSFORMATION',        icon:Zap,        desc:'Slow and deliberate transformation, gains through inheritance, bone and joint health',  arrow:'Transformation through accepting limitation' },
{ num:'09', color:'#d97706', heading:'DHARMA & FATHER',       icon:Compass,    desc:'Disciplined spiritual practice, responsible father, pilgrimages for duty',              arrow:'Dharma expressed through karma and service' },
{ num:'10', color:'#1d4ed8', heading:'CAREER & STATUS',       icon:TrendingUp, desc:'This is Makara natural house of career: ambition fulfilled through years of mastery',   arrow:'Recognition arrives late but lasts a lifetime' },
{ num:'11', color:'#1e3a5f', heading:'GAINS & FRIENDS',       icon:Users,      desc:'Few but enduring friends, gains through discipline and systematic investment',          arrow:'Fulfilment through legacy and lasting achievement' },
{ num:'12', color:'#0f766e', heading:'LIBERATION & FOREIGN',  icon:Globe,      desc:'Spiritual discipline, foreign work in administration, liberation through renunciation', arrow:'Liberation through total surrender of ego-ambition' },

FAQs (5):
FAQ1: q='What is Makara Rashi in Vedic astrology?' color='#1e3a5f' showImage=true
  a: Makara Rashi (Capricorn) is the tenth sign of the Vedic sidereal zodiac, spanning
     270 to 300 degrees. It is a cardinal earth sign ruled by Shani (Saturn), the planet
     of discipline, karma, and endurance. Makara is also the sign of exaltation for
     Mangala (Mars). Natives with the Moon in Makara are serious, ambitious, and built for
     long-term achievement.
FAQ2: q='Who is the ruling planet of Makara Rashi?' color='#d97706'
  a: Shani (Saturn) is the ruling planet of Makara Rashi. Saturn governs discipline,
     karma, structure, old age, hardship, and the rewards that come from sustained effort.
     A strong Saturn gives extraordinary patience, administrative ability, and the capacity
     to outlast all obstacles. An afflicted Saturn brings delays, depression, and
     difficulty in experiencing joy.
FAQ3: q='What are the personality traits of Makara Rashi natives?' color='#7c3aed'
  a: Makara natives are serious, disciplined, and built for the long game. They do not seek
     shortcuts and are deeply suspicious of easy gains. Their challenge is warmth: the same
     focus that makes them exceptional achievers can leave relationships feeling cold and
     transactional. When Makara energy is balanced with emotional openness, these natives
     build legacies that outlast lifetimes.
FAQ4: q='Which gemstone is recommended for Makara Rashi?' color='#1d4ed8'
  a: Blue Sapphire (Neelam) is the classical gemstone for Makara Rashi, worn to strengthen
     Shani (Saturn). It must be tested before wearing, as Saturn can bring sudden results.
     Set in silver or gold, worn on the middle finger of the right hand on a Saturday
     morning. A chart-based consultation with a qualified jyotishi is absolutely essential.
FAQ5: q='What are the lucky days and colours for Makara Rashi?' color='#0f766e'
  a: Saturday is the most auspicious day for Makara Rashi natives. Dark blue, black, and
     grey are the lucky colours. Visiting Shani temples on Saturdays, offering sesame oil,
     and wearing black or dark blue on important occasions are traditional supportive practices.

SEO: title "Makara Rashi (Capricorn), Traits, Mantra, Remedies | Soul Infinity"
     url '/zodiac/capricorn', breadcrumbs Home > Zodiac Signs > Makara (Capricorn)

TITLE STRIP: Eyebrow मकर राशि · Capricorn (text-slate-800)
H1: "Makara Rashi, The Achiever of the Zodiac"
Subtitle: "Ruled by Shani (Saturn) · Earth Sign · The Sea-Goat"

ABOUT bg #f8fafc: Cards — intro Saturn/Earth/discipline, Card2 "The Achiever" BPHS structure,
Card3 "Born to Endure" the Sea-Goat climbs where others rest, Card4 "Mastery Through Time".

MANTRA: use MANTRA_BG_URL. Om Praam Preem Praum Sah Shanaischaraya Namah.
Sanskrit: ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः. Practice: Saturday mornings, facing west.

REMEDIES bg #050a14 (very dark navy): H2 "Classical Vedic Remedies for Makara Rashi"
  1. Chant Shani Beej mantra (Om Praam Preem Praum Sah Shanaischaraya Namah), 108 times Saturday mornings, highlight:'Shani Beej mantra'
  2. Wear Blue Sapphire (Neelam) after mandatory testing and chart consultation, highlight:'Blue Sapphire (Neelam)'
  3. Donate black sesame, black cloth, iron, or mustard oil on Saturdays, highlight:'black sesame, black cloth'
  4. Recite the Shani Stotra or Hanuman Chalisa on Saturdays for Saturn relief, highlight:'Shani Stotra or Hanuman Chalisa'
  5. Visit a Shani or Hanuman temple on Saturdays, offer sesame oil and black flowers, highlight:'Shani or Hanuman temple'
  6. Serve the elderly, the poor, or animals as a conscious Saturday discipline, highlight:'Serve the elderly, the poor'
  7. Reduce excessive rigidity, cold detachment, and fear of failure during Saturn-afflicted periods, highlight:'excessive rigidity'

12 HOUSES bg #f8fafc. Footer icon: Mountain color #1e3a5f.
Footer text: "Makara earth builds every house it occupies, bringing <strong style={{ color: '#d97706' }}>discipline, ambition</strong> and the endurance of stone."

FAQ bg #f8fafc. Glyph ♑. aria prefix "makara-faq-"
CTA H2: "Want a Personalised Makara Reading?"
CTA bg: bg-gradient-to-r from-slate-900 to-gray-900

PHASES 3-9: Route /zodiac/capricorn, prerender, activate Capricorn hub card.
Commit: "feat: add Makara Rashi (Capricorn) pillar page with R2 assets, route, and hub update"
Status doc: scripts/makara-rashi-page-status.md
