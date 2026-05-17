# Kumbha Rashi Page — Build Brief
# Feature branch: feature/kumbha-rashi-page
# Output file: src/pages/zodiac/KumbhaRashiPage.tsx
# Route: /zodiac/aquarius
# Status doc: scripts/kumbha-rashi-page-status.md

PHASE 0 — ASSET VERIFICATION AND R2 UPLOAD

Local folder: /Users/saurabhiim/Documents/Antigravity/SIAS-5.0-main/assets-to-upload/Aquarius/

Confirm 4 files:
  - hero-banner-aquarius-rashi.png
  - mantra-background-aquarius.png
  - Aquarius Rashi Quick Facts Strip.png   (space in filename)
  - Aquarius-card.png

Optimize (source ~/.zshrc first):
  hero    → hero-banner-kumbha-rashi.webp      (1600px, q85, max 400KB)
  mantra  → mantra-bg-kumbha-rashi.webp        (1600px, q85, max 400KB)
  qfacts  → quick-facts-kumbha-rashi.webp      (1600px, q85, max 400KB)
  card    → kumbha-card.webp                   (800x800, q90, max 200KB)

Upload to R2: Zodiac/Aquarius/
  HERO_URL        = https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Aquarius/hero-banner-kumbha-rashi.webp
  MANTRA_BG_URL   = https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Aquarius/mantra-bg-kumbha-rashi.webp
  QUICK_FACTS_URL = https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Aquarius/quick-facts-kumbha-rashi.webp
  CARD_URL        = https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Aquarius/kumbha-card.webp

curl -I verify all 4. Non-200 = STOP.

PHASE 1 — BRANCH
  git checkout main && git pull origin main && git checkout -b feature/kumbha-rashi-page

PHASE 2 — CREATE src/pages/zodiac/KumbhaRashiPage.tsx
Template: MeshaRashiPage.tsx. HARD RULES apply.

--- SIGN DATA ---
Sign: Kumbha (Aquarius) | Sanskrit: कुम्भ राशि | IAST: Kumbha Rasi | English: The Water Bearer / The Pot
Rashi: 11th | Element: Air (Vayu) | Quality: Fixed (Sthira) | Ruler: Shani (Saturn)
Symbol: The Water Bearer ♒ | Lucky colour: Electric blue, turquoise, violet | Lucky day: Saturday
Gemstone: Blue Sapphire (Neelam) | Body parts: Ankles, calves, circulation, nervous system

Shloka (BPHS): "Sthiro vayu kumbho rasi shudra-prakriti-anvitah"
  IAST: Sthiro vayu kumbho rasi sudraprakrtianvitah
  Meaning: Aquarius is a fixed air sign, of service nature, unconventional and universal in outlook.

CONSTANTS:
  const HERO_URL        = 'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Aquarius/hero-banner-kumbha-rashi.webp';
  const MANTRA_BG_URL   = 'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Aquarius/mantra-bg-kumbha-rashi.webp';
  const QUICK_FACTS_URL = 'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Aquarius/quick-facts-kumbha-rashi.webp';
  const CARD_URL        = 'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Aquarius/kumbha-card.webp';

COLORS: Primary #0e7490 (deep teal/cyan — Saturn air) | About bg: #f0fafa | FAQ bg: #f0fafa

HERO alt: "Kumbha Rashi hero banner Soul Infinity Astro Solutions"
Eyebrow: कुम्भ राशि · Aquarius (text-cyan-700)
H1: Kumbha Rashi, The Visionary of the Zodiac
Subtitle: Ruled by Shani (Saturn) · Air Sign · The Water Bearer

ABOUT CARDS:
Card 1 icon: Globe, bg-cyan-100 text-cyan-700
  Text: Kumbha (Aquarius) is the eleventh sign of the Vedic zodiac, ruled by Shani (Saturn).
  As a fixed air sign, Kumbha channels Saturn's discipline into the realm of ideas, creating
  the most unconventional, humanitarian, and future-oriented sign of the zodiac.
Card 2 heading "The Visionary", icon Zap, #0e7490
  Text: In the Brihat Parashara Hora Shastra, Kumbha is described as a fixed air sign of
  service nature, symbolised by the water bearer who pours knowledge and life-giving wisdom
  onto the world without asking anything in return.
Card 3 heading "The Humanitarian", icon Users, bg-slate-900 text-white
  Text: The Water Bearer gives to the collective. Kumbha natives possess an innate sense of
  social responsibility and a vision of the world that extends far beyond personal concerns.
Card 4 heading "Born to Serve Humanity", icon Globe, #0e7490
  Text: Where Makara builds institutions, Kumbha reforms them. The most original and
  iconoclastic thinkers of the zodiac, Kumbha natives are driven by an unwavering conviction
  that the world can be better than it is.

STRENGTH_ROWS (6):
{ icon: Globe,       label: 'Humanitarian and visionary' },
{ icon: Zap,         label: 'Original and innovative' },
{ icon: Users,       label: 'Community-oriented' },
{ icon: TrendingUp,  label: 'Intellectually independent' },
{ icon: Compass,     label: 'Idealistic and principled' },
{ icon: Star,        label: 'Progressive and forward-thinking' },

CHALLENGE_ROWS (4):
{ icon: ChevronsRight, label: 'Emotionally detached' },
{ icon: Timer,         label: 'Stubborn about ideas' },
{ icon: UserX,         label: 'Eccentric and unpredictable' },
{ icon: Clock,         label: 'Difficulty with intimacy' },

HOUSE_DATA (12):
{ num:'01', color:'#0e7490', heading:'LAGNA (SELF)',          icon:User,       desc:'Unconventional appearance, intellectual presence, humanitarian values, independent',  arrow:'Unique contribution to the world is the life purpose' },
{ num:'02', color:'#d97706', heading:'WEALTH & SPEECH',       icon:Coins,      desc:'Original and unconventional speech, income through technology and social networks',  arrow:'Wealth through innovation and collective enterprise' },
{ num:'03', color:'#db2777', heading:'COURAGE & SIBLINGS',    icon:Users,      desc:'Intellectual and unconventional siblings, bold original communication and writing',  arrow:'Short journeys connected to networks and social causes' },
{ num:'04', color:'#7c3aed', heading:'HOME & MOTHER',         icon:Home,       desc:'Unconventional home, independent mother, value of intellectual freedom over comfort',arrow:'Home as a gathering place for ideas and community' },
{ num:'05', color:'#db2777', heading:'CHILDREN & CREATIVITY', icon:Star,       desc:'Independent-thinking children, creativity through technology and original concepts', arrow:'Innovation and social impact as creative expressions' },
{ num:'06', color:'#1d4ed8', heading:'ENEMIES & SERVICE',     icon:Shield,     desc:'Overcomes challenges through innovation and collective action',                      arrow:'Technology, social work, or scientific research careers' },
{ num:'07', color:'#0f766e', heading:'MARRIAGE & PARTNERS',   icon:Heart,      desc:'Unconventional and intellectually stimulating spouse, friendship within marriage',   arrow:'Business through networks, technology, or social enterprise' },
{ num:'08', color:'#7c3aed', heading:'TRANSFORMATION',        icon:Zap,        desc:'Transformation through radical shifts in belief and social identity',               arrow:'Research in astrology, technology, or hidden knowledge' },
{ num:'09', color:'#d97706', heading:'DHARMA & FATHER',       icon:Compass,    desc:'Unconventional and free-thinking father, dharma through social reform and vision',   arrow:'Universal philosophy that transcends any single tradition' },
{ num:'10', color:'#1d4ed8', heading:'CAREER & STATUS',       icon:TrendingUp, desc:'Career in technology, science, social enterprise, astrology, or reform movements',  arrow:'Recognition through innovation and humanitarian contribution' },
{ num:'11', color:'#0e7490', heading:'GAINS & FRIENDS',       icon:Users,      desc:'Natural house for Kumbha, large and diverse social networks, gains through groups',  arrow:'Financial growth through technology and collective effort' },
{ num:'12', color:'#0f766e', heading:'LIBERATION & FOREIGN',  icon:Globe,      desc:'Liberation through dissolution of ego into universal consciousness',                arrow:'Foreign lands and spiritual retreat as paths to moksha' },

MANTRA: ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः | Om Praam Preem Praum Sah Shanaischaraya Namah
Meaning: Salutation to Shani (Saturn), lord of karma, structure, and universal service.
Practice: Chant 108 times on Saturday mornings, facing west, with sesame oil lamp.

12 HOUSES section bg: #f0fafa | Footer icon: Globe color #0e7490
H2: Kumbha in the 12 Houses | Sub-eyebrow: "How the Air of Kumbha Innovates Each Bhava"
Footer: "Kumbha air transforms every house it touches, bringing <strong style={{color:'#d97706'}}>vision, innovation</strong> and the humanitarian's gift to the collective."

REMEDIES (JSX dark bg: #020c14):
1. 'Chant the Shani Beej mantra (Om Praam Preem Praum Sah Shanaischaraya Namah)' | '108 times on Saturday mornings' | highlight:'Shani Beej mantra'
2. 'Wear Blue Sapphire (Neelam) set in silver or iron' | 'on the middle finger, only after a thorough chart-based consultation' | highlight:'Blue Sapphire (Neelam)'
3. 'Donate black sesame seeds, dark blue cloth, mustard oil, or iron items' | 'on Saturdays to the underprivileged or at a Shani temple' | highlight:'black sesame seeds, dark blue cloth'
4. 'Recite the Shani Stotra or Hanuman Chalisa on Saturdays' | 'for karmic relief and the harmonious expression of Saturnine energy' | highlight:'Shani Stotra or Hanuman Chalisa'
5. 'Engage in community service, social work, or collective upliftment activities' | 'as Saturn in Kumbha is most satisfied by impersonal service' | highlight:'community service, social work'
6. 'Cultivate technological skills, scientific learning, or astrology' | 'as conscious channels for Kumbha-Saturn energy' | highlight:'technological skills, scientific learning'
7. 'Avoid emotional detachment in close relationships' | 'during Saturn Sade Sati or challenging transits. Cultivate warmth alongside your visionary objectivity' | highlight:'Avoid emotional detachment'

FAQ bg: #f0fafa | icon: ♒ | aria prefix: kumbha-faq | H2 accent: #0e7490
FAQ_DATA (5):
Q1: 'What is Kumbha Rashi in Vedic astrology?' icon:HelpCircle color:'#0e7490' showImage:true
  Answer: Kumbha Rashi (Aquarius) is the eleventh sign of the Vedic sidereal zodiac, spanning
  300 to 330 degrees. It is a fixed air sign ruled by Shani (Saturn). Natives with the Moon in
  Kumbha are known for their originality, humanitarian vision, and an independent intellect that
  operates best when working toward the greater collective good.
Q2: 'Who is the ruling planet of Kumbha Rashi?' icon:Globe color:'#d97706'
  Answer: Shani (Saturn) rules Kumbha Rashi, as it also rules Makara. In Kumbha, Saturn
  expresses its air quality: universal, intellectual, and reform-oriented. Saturn governs
  karma, discipline, service, technology, and the slow progress of humanity. Strong Saturn
  in Kumbha produces visionaries, scientists, and social reformers.
Q3: 'What are the personality traits of Kumbha Rashi natives?' icon:User color:'#7c3aed'
  Answer: Kumbha natives are original, humanitarian, and intellectually independent. They
  think in systems, care deeply about collective wellbeing, and often feel ahead of their
  time. Their challenges include emotional detachment, stubbornness about ideas, and
  difficulty with intimate relationships. When Saturn's discipline meets Kumbha's vision,
  these natives change the world.
Q4: 'Which gemstone is recommended for Kumbha Rashi?' icon:Gem color:'#1d4ed8'
  Answer: Blue Sapphire (Neelam) is the classical gemstone for Kumbha Rashi, worn to strengthen
  Shani (Saturn). It is a powerful stone that must only be worn after a thorough chart-based
  consultation with a qualified jyotishi. A consultation with Soul Infinity Astro Solutions is
  strongly recommended before wearing Blue Sapphire under any circumstances.
Q5: 'What are the lucky days and colours for Kumbha Rashi?' icon:Calendar color:'#0f766e'
  Answer: Saturday is the most auspicious day for Kumbha Rashi natives. Electric blue,
  turquoise, and dark violet are the lucky colours. Engaging in community service on Saturdays,
  lighting sesame oil lamps, and wearing dark blue on important occasions support Kumbha
  natives in channelling Saturn's collective service energy constructively.

CTA bg: bg-gradient-to-r from-cyan-900 to-teal-900
H2: "Want a Personalised Kumbha Reading?"

SEO title: "Kumbha Rashi (Aquarius), Traits, Mantra, Remedies | Soul Infinity"
SEO description: "Kumbha Rashi (Aquarius) in Vedic astrology, ruled by Shani (Saturn). Personality traits, mantra, remedies, and houses placement, guided by Saurabh Jain."
keywords: "kumbha rashi, aquarius vedic astrology, shani, saturn, aquarius traits, kumbha mantra, blue sapphire, neelam, kumbha remedies, soul infinity"
SchemaMarkup url: '/zodiac/aquarius' | name: 'Kumbha Rashi (Aquarius) in Vedic Astrology'

PHASES 3-9:
Route: /zodiac/aquarius | Hub: Aquarius/Kumbha | Prerender: /zodiac/aquarius
Commit: "feat: add Kumbha Rashi (Aquarius) pillar page with R2 assets, route, and hub update"
PR: "feat: Kumbha Rashi (Aquarius) pillar page"
Status doc: scripts/kumbha-rashi-page-status.md
