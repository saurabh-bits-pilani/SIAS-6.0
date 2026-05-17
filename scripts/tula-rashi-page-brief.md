# Tula Rashi Page — Build Brief
# Feature branch: feature/tula-rashi-page
# Output file: src/pages/zodiac/TulaRashiPage.tsx
# Route: /zodiac/libra
# Status doc: scripts/tula-rashi-page-status.md

PHASE 0 — ASSETS
Folder: /Users/saurabhiim/Documents/Antigravity/SIAS-5.0-main/assets-to-upload/Libra/
Files: hero-banner-libra-rashi.png | mantra-background-libra.png | libra Rashi Quick Facts Strip.png | Libra-card.png
Optimize (sharp): hero/mantra/qf → webp q85 max 1600px, card → webp q90 max 800px
Output names: hero-banner-tula-rashi.webp | mantra-bg-tula-rashi.webp | quick-facts-tula-rashi.webp | tula-card.webp
R2 folder: Zodiac/Libra/
URLs:
  HERO_URL        = https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Libra/hero-banner-tula-rashi.webp
  MANTRA_BG_URL   = https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Libra/mantra-bg-tula-rashi.webp
  QUICK_FACTS_URL = https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Libra/quick-facts-tula-rashi.webp
  CARD_URL        = https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Libra/tula-card.webp
curl -I verify all 4. If any non-200, STOP.

PHASE 1 — BRANCH
git checkout main && git pull && git checkout -b feature/tula-rashi-page

PHASE 2 — PAGE: src/pages/zodiac/TulaRashiPage.tsx
Template: MeshaRashiPage.tsx. Same hard rules apply.

SIGN DATA
Sign: Tula (Libra) | Sanskrit: तुला राशि | IAST: Tula Rasi | English: The Scales
Rashi: 7th | Element: Air (Vayu) | Quality: Cardinal (Chara)
Ruler: Shukra (Venus) | Symbol: The Scales ♎
Lucky colour: White, pink, light blue | Lucky day: Friday | Gemstone: Diamond (Heera) or White Sapphire
Body parts: Kidneys, lower back, skin, ovaries
Shloka: "Tulo vayu-bhago dvibhuja-rajasika shukra-nathah"
  IAST: Tulo vayubhago dvibhuja rajasika shukranathah
  Meaning: Libra is an air sign, two-armed, of rajasic quality, ruled by Venus.
  Source: Brihat Parashara Hora Shastra

Colors: Primary #9333ea (deep violet/lavender), Secondary #d97706, Highlight #faf5ff
Heading replace #b91c1c with #7e22ce

STRENGTH_ROWS:
{ icon: Heart,       label: 'Diplomatic and fair' },
{ icon: Users,       label: 'Charming and gracious' },
{ icon: Sparkles,    label: 'Artistic and refined' },
{ icon: ShieldCheck, label: 'Balanced and just' },
{ icon: Compass,     label: 'Idealistic and visionary' },
{ icon: Globe,       label: 'Natural peacemaker' },

CHALLENGE_ROWS:
{ icon: ChevronsRight, label: 'Indecisive and wavering' },
{ icon: Timer,         label: 'Avoids conflict at all costs' },
{ icon: UserX,         label: 'Dependent on approval' },
{ icon: Clock,         label: 'Struggles with commitment' },

HOUSE_DATA (12):
{ num:'01', color:'#9333ea', heading:'LAGNA (SELF)',          icon:User,       desc:'Graceful appearance, natural charm, love of beauty, Venus-governed temperament',          arrow:'Balance and fairness are core life values' },
{ num:'02', color:'#d97706', heading:'WEALTH & SPEECH',       icon:Coins,      desc:'Diplomatic speech, wealth through partnerships and aesthetics, family of refined taste', arrow:'Wealth grows through cooperation and balance' },
{ num:'03', color:'#db2777', heading:'COURAGE & SIBLINGS',    icon:Users,      desc:'Artistic communication, balanced siblings, travels for beauty or negotiation',          arrow:'Courage expressed through fair persuasion' },
{ num:'04', color:'#7c3aed', heading:'HOME & MOTHER',         icon:Home,       desc:'Beautiful home, refined mother, deep appreciation for domestic harmony',               arrow:'Home is a sanctuary of beauty and peace' },
{ num:'05', color:'#db2777', heading:'CHILDREN & CREATIVITY', icon:Star,       desc:'Artistic children, romantic idealism, creative expression in music or visual art',     arrow:'Love and creativity are inseparable' },
{ num:'06', color:'#1d4ed8', heading:'ENEMIES & SERVICE',     icon:Shield,     desc:'Overcomes opposition through negotiation and fair dealing',                             arrow:'Law, counselling, or beauty-industry service' },
{ num:'07', color:'#0f766e', heading:'MARRIAGE & PARTNERS',   icon:Heart,      desc:'Devoted to partnership, marriage as the central life axis, desire for equality',       arrow:'Business through partnership and co-creation' },
{ num:'08', color:'#7c3aed', heading:'TRANSFORMATION',        icon:Zap,        desc:'Transformation through relationships, interest in occult aesthetics, joint wealth',    arrow:'Transformation through radical acceptance' },
{ num:'09', color:'#d97706', heading:'DHARMA & FATHER',       icon:Compass,    desc:'Just and artistic father, faith expressed through beauty and devotion',               arrow:'Dharma as the pursuit of harmony and truth' },
{ num:'10', color:'#1d4ed8', heading:'CAREER & STATUS',       icon:TrendingUp, desc:'Career in law, diplomacy, arts, fashion, luxury, counselling, or public relations',    arrow:'Recognition through fairness and aesthetic mastery' },
{ num:'11', color:'#9333ea', heading:'GAINS & FRIENDS',       icon:Users,      desc:'Friends in artistic, social, and intellectual circles',                                arrow:'Gains through partnerships and social networks' },
{ num:'12', color:'#0f766e', heading:'LIBERATION & FOREIGN',  icon:Globe,      desc:'Spiritual seeker of inner harmony, foreign travel for love or aesthetic purpose',     arrow:'Liberation through release of the need to please' },

FAQs (5):
FAQ1: q='What is Tula Rashi in Vedic astrology?' color='#9333ea' showImage=true
  a: Tula Rashi (Libra) is the seventh sign of the Vedic sidereal zodiac, spanning 180 to
     210 degrees. It is a cardinal air sign ruled by Shukra (Venus), the planet of beauty,
     harmony, and relationships. Tula is also the sign of exaltation for Shani (Saturn).
     Natives with the Moon in Tula seek balance, beauty, and fairness in all aspects of life.
FAQ2: q='Who is the ruling planet of Tula Rashi?' color='#d97706'
  a: Shukra (Venus) is the ruling planet of Tula Rashi. In Tula, Venus governs diplomacy,
     aesthetics, love, and the art of relationship. A strong Venus here brings charm,
     artistic gift, and partnership success. An afflicted Venus brings indecision,
     dependence on others, and challenges in commitment.
FAQ3: q='What are the personality traits of Tula Rashi natives?' color='#7c3aed'
  a: Tula natives are gracious, idealistic, and gifted with natural charm. They are born
     mediators who see all sides of every situation. Their challenge is decision-making:
     the same capacity for balance that makes them excellent diplomats can paralyse them
     when a clear choice is required. When Tula energy is directed with conviction, these
     natives create extraordinary harmony in all they touch.
FAQ4: q='Which gemstone is recommended for Tula Rashi?' color='#1d4ed8'
  a: Diamond (Heera) or White Sapphire (Safed Pukhraj) are the classical gemstones for
     Tula Rashi, worn to strengthen Shukra (Venus). Set in silver or platinum, worn on
     the middle finger on a Friday morning. Chart-based consultation essential.
FAQ5: q='What are the lucky days and colours for Tula Rashi?' color='#0f766e'
  a: Friday is the most auspicious day for Tula Rashi natives. White, pink, and light
     blue are the lucky colours. Visiting Lakshmi temples, fasting on Fridays, and
     wearing white on important occasions are traditional supportive practices.

SEO: title "Tula Rashi (Libra), Traits, Mantra, Remedies | Soul Infinity"
     url '/zodiac/libra', breadcrumbs Home > Zodiac Signs > Tula (Libra)

TITLE STRIP: Eyebrow तुला राशि · Libra (text-purple-700)
H1: "Tula Rashi, The Diplomat of the Zodiac"
Subtitle: "Ruled by Shukra (Venus) · Air Sign · The Scales"

ABOUT bg #faf5ff: Cards — intro Venus/Air/balance, Card2 "The Diplomat" BPHS rajasic nature,
Card3 "Born to Balance" the Scales weigh before they act, Card4 "Gifted with Grace" finest diplomats.

MANTRA: use MANTRA_BG_URL. Om Shum Shukraya Namah. Sanskrit: ॐ शुं शुक्राय नमः.
Practice: Friday mornings, facing east.

REMEDIES bg #1a0a2e (deep violet-dark): H2 "Classical Vedic Remedies for Tula Rashi"
  1. Chant Shukra Beej mantra (Om Shum Shukraya Namah), 108 times Friday mornings, highlight:'Shukra Beej mantra'
  2. Wear Diamond or White Sapphire in silver/platinum on middle finger, chart-based only, highlight:'Diamond or White Sapphire'
  3. Donate white sweets, white cloth, silver, or white flowers on Fridays, highlight:'white sweets, white cloth'
  4. Recite Shukra Stotra or Lakshmi Ashtakam on Fridays, highlight:'Shukra Stotra or Lakshmi Ashtakam'
  5. Visit a Lakshmi or Devi temple on Fridays, offer white flowers and kheer, highlight:'Lakshmi or Devi temple'
  6. Cultivate beauty, art, and harmonious relationships as conscious daily practice, highlight:'beauty, art'
  7. Reduce excessive people-pleasing and indecision during Venus-afflicted periods, highlight:'excessive people-pleasing'

12 HOUSES bg #faf5ff. Footer icon: Heart color #9333ea.
Footer text: "Tula air harmonises every house it occupies, bringing <strong style={{ color: '#d97706' }}>grace, balance</strong> and the beauty of fair relation."

FAQ bg #faf5ff. Glyph ♎. aria prefix "tula-faq-"
CTA H2: "Want a Personalised Tula Reading?"
CTA bg: bg-gradient-to-r from-purple-900 to-violet-900

PHASES 3-9: Route /zodiac/libra, prerender, activate Libra hub card.
Commit: "feat: add Tula Rashi (Libra) pillar page with R2 assets, route, and hub update"
Status doc: scripts/tula-rashi-page-status.md
