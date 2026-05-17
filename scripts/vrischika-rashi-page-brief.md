# Vrischika Rashi Page — Build Brief
# Feature branch: feature/vrischika-rashi-page
# Output file: src/pages/zodiac/VrischikaRashiPage.tsx
# Route: /zodiac/scorpio
# Status doc: scripts/vrischika-rashi-page-status.md

PHASE 0 — ASSET VERIFICATION AND R2 UPLOAD

Local folder: /Users/saurabhiim/Documents/Antigravity/SIAS-5.0-main/assets-to-upload/Scorpio/

Confirm 4 files:
  - hero-banner-scorpio-rashi.png
  - mantra-background-scorpio.png
  - Scorpio Rashi Quick Facts Strip.png
  - Scorpio.png                              (card — no -card suffix)

Optimize (source ~/.zshrc first):
  hero    → hero-banner-vrischika-rashi.webp   (1600px, q85, max 400KB)
  mantra  → mantra-bg-vrischika-rashi.webp     (1600px, q85, max 400KB)
  qfacts  → quick-facts-vrischika-rashi.webp   (1600px, q85, max 400KB)
  card    → vrischika-card.webp                (800x800, q90, max 200KB)

Upload to R2: Zodiac/Scorpio/
  HERO_URL        = https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Scorpio/hero-banner-vrischika-rashi.webp
  MANTRA_BG_URL   = https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Scorpio/mantra-bg-vrischika-rashi.webp
  QUICK_FACTS_URL = https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Scorpio/quick-facts-vrischika-rashi.webp
  CARD_URL        = https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Scorpio/vrischika-card.webp

curl -I verify all 4. Non-200 = STOP.

PHASE 1 — BRANCH
  git checkout main && git pull origin main && git checkout -b feature/vrischika-rashi-page

PHASE 2 — CREATE src/pages/zodiac/VrischikaRashiPage.tsx
Template: MeshaRashiPage.tsx. HARD RULES apply.

--- SIGN DATA ---
Sign: Vrischika (Scorpio) | Sanskrit: वृश्चिक राशि | IAST: Vrscika Rasi | English: The Scorpion
Rashi: 8th | Element: Water (Jala) | Quality: Fixed (Sthira) | Ruler: Mangala (Mars)
Symbol: The Scorpion ♏ | Lucky colour: Deep red, maroon, black | Lucky day: Tuesday
Gemstone: Red Coral (Moonga) | Body parts: Reproductive organs, excretory system, pelvis

Shloka (BPHS): "Sthiro jalascha vrischiko kshatriya-prakriti-anvitah"
  IAST: Sthiro jalasca vrsciko ksatriyaprakrtianvitah
  Meaning: Scorpio is a fixed water sign, of Kshatriya nature, intense and penetrating.

CONSTANTS:
  const HERO_URL        = 'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Scorpio/hero-banner-vrischika-rashi.webp';
  const MANTRA_BG_URL   = 'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Scorpio/mantra-bg-vrischika-rashi.webp';
  const QUICK_FACTS_URL = 'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Scorpio/quick-facts-vrischika-rashi.webp';
  const CARD_URL        = 'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Scorpio/vrischika-card.webp';

COLORS: Primary #7f1d1d (deep blood red/maroon) | About bg: #fff1f2 | FAQ bg: #fff1f2

HERO alt: "Vrischika Rashi hero banner Soul Infinity Astro Solutions"
Eyebrow: वृश्चिक राशि · Scorpio (text-red-900)
H1: Vrischika Rashi, The Transformer of the Zodiac
Subtitle: Ruled by Mangala (Mars) · Water Sign · The Scorpion

ABOUT CARDS:
Card 1 icon: Zap, bg-red-100 text-red-900
  Text: Vrischika (Scorpio) is the eighth sign of the Vedic zodiac, ruled by Mangala (Mars).
  As a fixed water sign, Vrischika combines Mars's warrior intensity with water's depth,
  producing the most penetrating and transformative energy in the zodiac.
Card 2 heading "The Transformer", icon Zap, #7f1d1d
  Text: In the Brihat Parashara Hora Shastra, Vrischika is described as a fixed water sign
  of Kshatriya nature, associated with hidden power, secrets, transformation, and the cycle
  of death and rebirth.
Card 3 heading "The Investigator", icon Target, bg-slate-900 text-white
  Text: The Scorpion moves in silence. Vrischika natives observe everything and reveal
  nothing until the moment of decisive action arrives, combining Mars's directness with
  water's capacity to reach into hidden depths.
Card 4 heading "Born to Transform", icon Activity, #7f1d1d
  Text: Where Tula seeks harmony with the world as it is, Vrischika seeks to fundamentally
  transform it. No other sign carries a greater capacity for both destruction and regeneration.

STRENGTH_ROWS (6):
{ icon: Target,      label: 'Intensely focused' },
{ icon: ShieldCheck, label: 'Loyal and protective' },
{ icon: Zap,         label: 'Psychologically perceptive' },
{ icon: Activity,    label: 'Resilient and transformative' },
{ icon: Compass,     label: 'Deeply investigative' },
{ icon: Mountain,    label: 'Emotionally courageous' },

CHALLENGE_ROWS (4):
{ icon: ChevronsRight, label: 'Possessive and jealous' },
{ icon: Timer,         label: 'Secretive and suspicious' },
{ icon: UserX,         label: 'Vindictive when hurt' },
{ icon: Clock,         label: 'Resistant to vulnerability' },

HOUSE_DATA (12):
{ num:'01', color:'#7f1d1d', heading:'LAGNA (SELF)',          icon:User,       desc:'Intense gaze, magnetic presence, penetrating mind, secretive temperament',          arrow:'Transformation is the central life theme' },
{ num:'02', color:'#d97706', heading:'WEALTH & SPEECH',       icon:Coins,      desc:'Blunt and powerful speech, wealth through research, hidden assets, inheritance',    arrow:'Financial power through depth and investigation' },
{ num:'03', color:'#db2777', heading:'COURAGE & SIBLINGS',    icon:Users,      desc:'Intense and secretive siblings, courageous and penetrating communication',         arrow:'Short journeys with strategic or investigative purpose' },
{ num:'04', color:'#7c3aed', heading:'HOME & MOTHER',         icon:Home,       desc:'Intense domestic life, powerful mother, home as a place of transformation',        arrow:'Ancestral and karmic patterns shape the home' },
{ num:'05', color:'#db2777', heading:'CHILDREN & CREATIVITY', icon:Star,       desc:'Intensely creative children, deep romantic obsession, transformative artistic work',arrow:'Creation through depth and emotional intensity' },
{ num:'06', color:'#1d4ed8', heading:'ENEMIES & SERVICE',     icon:Shield,     desc:'Defeats enemies through strategy, endurance, and psychological insight',           arrow:'Surgery, research, or investigation as vocation' },
{ num:'07', color:'#0f766e', heading:'MARRIAGE & PARTNERS',   icon:Heart,      desc:'Intensely loyal and possessive spouse, transformative partnerships',               arrow:'Business through research, occult, or finance' },
{ num:'08', color:'#7c3aed', heading:'TRANSFORMATION',        icon:Zap,        desc:'Natural house for Vrischika, exceptional power for deep transformation',           arrow:'Mastery of the occult, tantra, or hidden sciences' },
{ num:'09', color:'#d97706', heading:'DHARMA & FATHER',       icon:Compass,    desc:'Intense and secretive father, dharma through esoteric investigation',              arrow:'Spiritual path involving deep inner transformation' },
{ num:'10', color:'#1d4ed8', heading:'CAREER & STATUS',       icon:TrendingUp, desc:'Career in surgery, research, psychology, finance, occult, or intelligence',        arrow:'Authority through mastery of hidden knowledge' },
{ num:'11', color:'#7f1d1d', heading:'GAINS & FRIENDS',       icon:Users,      desc:'Few but intensely loyal friends, gains through research and shared resources',     arrow:'Long-term financial power through strategic investment' },
{ num:'12', color:'#0f766e', heading:'LIBERATION & FOREIGN',  icon:Globe,      desc:'Spiritual power through surrender of control, liberation through depth',          arrow:'Moksha through transformation of ego and desire' },

MANTRA: ॐ क्रां क्रीं क्रौं सः भौमाय नमः | Om Kraam Kreem Kraum Sah Bhaumaya Namah
Meaning: Salutation to Mangala (Mars), the warrior planet of courage and transformation.
Practice: Chant 108 times on Tuesday mornings, facing south, with resolve and focused intent.

12 HOUSES section bg: #fff1f2 | Footer icon: Zap color #7f1d1d
H2: Vrischika in the 12 Houses | Sub-eyebrow: "How the Water of Vrischika Transforms Each Bhava"
Footer: "Vrischika water transforms every house it touches, bringing <strong style={{color:'#d97706'}}>depth, intensity</strong> and the power of regeneration."

REMEDIES (JSX dark bg: #0f0505):
1. 'Chant the Mangala Beej mantra (Om Kraam Kreem Kraum Sah Bhaumaya Namah)' | '108 times on Tuesday mornings' | highlight:'Mangala Beej mantra'
2. 'Wear Red Coral (Moonga) set in copper or gold' | 'on the ring finger, only after a chart-based recommendation' | highlight:'Red Coral (Moonga)'
3. 'Donate red lentils (masoor dal), red cloth, or copper items' | 'on Tuesdays at a Hanuman or Bhairava temple' | highlight:'red lentils, red cloth'
4. 'Recite the Hanuman Chalisa or Bhairava Ashtakam on Tuesdays' | 'for protection during Mars Mahadasha and challenging transits' | highlight:'Hanuman Chalisa or Bhairava Ashtakam'
5. 'Visit a Hanuman or Kali temple on Tuesdays' | 'and offer sindoor, sesame oil, and red flowers' | highlight:'Hanuman or Kali temple'
6. 'Engage in deep psychological self-inquiry, meditation, or transformative healing practices' | 'to channel Vrischika intensity constructively' | highlight:'psychological self-inquiry, meditation'
7. 'Avoid obsession, jealousy, and the desire for revenge' | 'during Mars-afflicted periods. Cultivate forgiveness and the power of letting go' | highlight:'Avoid obsession, jealousy'

FAQ bg: #fff1f2 | icon: ♏ | aria prefix: vrischika-faq | H2 accent: #7f1d1d
FAQ_DATA (5):
Q1: 'What is Vrischika Rashi in Vedic astrology?' icon:HelpCircle color:'#7f1d1d' showImage:true
  Answer: Vrischika Rashi (Scorpio) is the eighth sign of the Vedic sidereal zodiac, spanning
  210 to 240 degrees. It is a fixed water sign ruled by Mangala (Mars). Natives with the Moon
  in Vrischika are known for their psychological penetration, fierce loyalty, and an unparalleled
  capacity for transformation and regeneration.
Q2: 'Who is the ruling planet of Vrischika Rashi?' icon:Globe color:'#d97706'
  Answer: Mangala (Mars) rules Vrischika Rashi. In Vrischika, Mars expresses its water quality:
  deep, strategic, and transformative rather than overtly aggressive. Mars governs energy, blood,
  surgery, the military, real estate, and hidden power. Strong Mars in Vrischika produces
  surgeons, researchers, and fearless investigators.
Q3: 'What are the personality traits of Vrischika Rashi natives?' icon:User color:'#7c3aed'
  Answer: Vrischika natives are intense, perceptive, and fiercely loyal. They possess an
  almost psychic ability to read people and situations. Their challenges include possessiveness,
  secretiveness, and difficulty forgiving betrayal. When their transformative energy is
  directed inward, Vrischika natives undergo profound personal evolution.
Q4: 'Which gemstone is recommended for Vrischika Rashi?' icon:Gem color:'#1d4ed8'
  Answer: Red Coral (Moonga) is the classical gemstone for Vrischika Rashi, worn to strengthen
  Mangala (Mars). It should be set in copper or gold and worn on the ring finger on a Tuesday
  morning after proper mantra invocation. A chart-based consultation with Soul Infinity Astro
  Solutions is essential before wearing any planetary gemstone.
Q5: 'What are the lucky days and colours for Vrischika Rashi?' icon:Calendar color:'#0f766e'
  Answer: Tuesday is the most auspicious day for Vrischika Rashi natives. Deep red, maroon,
  and black are the lucky colours. Fasting on Tuesdays, visiting Hanuman or Kali temples,
  and wearing red on important occasions support Vrischika natives.

CTA bg: bg-gradient-to-r from-red-900 to-rose-900
H2: "Want a Personalised Vrischika Reading?"

SEO title: "Vrischika Rashi (Scorpio), Traits, Mantra, Remedies | Soul Infinity"
SEO description: "Vrischika Rashi (Scorpio) in Vedic astrology, ruled by Mangala (Mars). Personality traits, mantra, remedies, and houses placement, guided by Saurabh Jain."
keywords: "vrischika rashi, scorpio vedic astrology, mangala, mars, scorpio traits, vrischika mantra, red coral, moonga, vrischika remedies, soul infinity"
SchemaMarkup url: '/zodiac/scorpio' | name: 'Vrischika Rashi (Scorpio) in Vedic Astrology'

PHASES 3-9:
Route: /zodiac/scorpio | Hub: Scorpio/Vrischika | Prerender: /zodiac/scorpio
Commit: "feat: add Vrischika Rashi (Scorpio) pillar page with R2 assets, route, and hub update"
PR: "feat: Vrischika Rashi (Scorpio) pillar page"
Status doc: scripts/vrischika-rashi-page-status.md
