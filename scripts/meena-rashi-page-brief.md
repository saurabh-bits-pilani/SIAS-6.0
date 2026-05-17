# Meena Rashi Page — Build Brief
# Feature branch: feature/meena-rashi-page
# Output file: src/pages/zodiac/MeenaRashiPage.tsx
# Route: /zodiac/pisces
# Status doc: scripts/meena-rashi-page-status.md

PHASE 0 — ASSET VERIFICATION AND R2 UPLOAD

Local folder: /Users/saurabhiim/Documents/Antigravity/SIAS-5.0-main/assets-to-upload/Pisces/

Confirm 4 files:
  - hero-banner-pisces-rashi.png       (no trailing hyphen — confirmed clean filename)
  - mantra-background-pisces.png
  - Pisces Rashi Quick Facts Strip.png (space in filename)
  - pisces-card.png

Optimize (source ~/.zshrc first):
  hero    → hero-banner-meena-rashi.webp       (1600px, q85, max 400KB)
  mantra  → mantra-bg-meena-rashi.webp         (1600px, q85, max 400KB)
  qfacts  → quick-facts-meena-rashi.webp       (1600px, q85, max 400KB)
  card    → meena-card.webp                    (800x800, q90, max 200KB)

Upload to R2: Zodiac/Pisces/
  HERO_URL        = https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Pisces/hero-banner-meena-rashi.webp
  MANTRA_BG_URL   = https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Pisces/mantra-bg-meena-rashi.webp
  QUICK_FACTS_URL = https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Pisces/quick-facts-meena-rashi.webp
  CARD_URL        = https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Pisces/meena-card.webp

curl -I verify all 4. Non-200 = STOP.

PHASE 1 — BRANCH
  git checkout main && git pull origin main && git checkout -b feature/meena-rashi-page

PHASE 2 — CREATE src/pages/zodiac/MeenaRashiPage.tsx
Template: MeshaRashiPage.tsx. HARD RULES apply.

--- SIGN DATA ---
Sign: Meena (Pisces) | Sanskrit: मीन राशि | IAST: Mina Rasi | English: The Fish
Rashi: 12th | Element: Water (Jala) | Quality: Mutable (Dvisvabhava) | Ruler: Guru (Jupiter)
Symbol: The Fish ♓ | Lucky colour: Sea green, aquamarine, violet, white | Lucky day: Thursday
Gemstone: Yellow Sapphire (Pukhraj) | Body parts: Feet, toes, lymphatic system, immune system

Shloka (BPHS): "Dvisvabhavo jala meenascha brahmin-prakriti-anvitah"
  IAST: Dvisabhavo jala minasca brahminaprakrtianvitah
  Meaning: Pisces is a mutable water sign, of Brahmin nature, spiritual and compassionate.

CONSTANTS:
  const HERO_URL        = 'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Pisces/hero-banner-meena-rashi.webp';
  const MANTRA_BG_URL   = 'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Pisces/mantra-bg-meena-rashi.webp';
  const QUICK_FACTS_URL = 'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Pisces/quick-facts-meena-rashi.webp';
  const CARD_URL        = 'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Pisces/meena-card.webp';

COLORS: Primary #0f766e (deep teal-green — Jupiter water) | About bg: #f0fdf9 | FAQ bg: #f0fdf9

HERO alt: "Meena Rashi hero banner Soul Infinity Astro Solutions"
Eyebrow: मीन राशि · Pisces (text-teal-700)
H1: Meena Rashi, The Mystic of the Zodiac
Subtitle: Ruled by Guru (Jupiter) · Water Sign · The Fish

ABOUT CARDS:
Card 1 icon: Droplet, bg-teal-100 text-teal-700
  Text: Meena (Pisces) is the twelfth and final sign of the Vedic zodiac, ruled by Guru
  (Jupiter). As a mutable water sign, Meena dissolves all boundaries, merging Jupiter's
  wisdom with water's infinite depth to create the most spiritually receptive and
  compassionate sign in the zodiac.
Card 2 heading "The Mystic", icon Sparkles, #0f766e
  Text: In the Brihat Parashara Hora Shastra, Meena is described as a mutable water sign of
  Brahmin nature, associated with the dissolution of ego, spiritual liberation, and the
  ocean of universal consciousness.
Card 3 heading "The Dreamer", icon Star, bg-slate-900 text-white
  Text: The Fish swims in two directions simultaneously. Meena natives live at the boundary
  between the visible and invisible worlds, carrying within them an intuitive wisdom that
  transcends rational explanation.
Card 4 heading "Born to Transcend", icon Compass, #0f766e
  Text: Where Kumbha serves humanity through reform, Meena serves through surrender.
  The final sign contains within it the accumulated wisdom of all eleven signs that
  preceded it, and its deepest purpose is the return to the source.

STRENGTH_ROWS (6):
{ icon: Sparkles,    label: 'Deeply intuitive and psychic' },
{ icon: Heart,       label: 'Compassionate and empathetic' },
{ icon: Star,        label: 'Creatively gifted' },
{ icon: Compass,     label: 'Spiritually inclined' },
{ icon: Globe,       label: 'Universally accepting' },
{ icon: Droplet,     label: 'Emotionally receptive' },

CHALLENGE_ROWS (4):
{ icon: ChevronsRight, label: 'Escapist tendencies' },
{ icon: Timer,         label: 'Lacks practical boundaries' },
{ icon: UserX,         label: 'Over-idealistic' },
{ icon: Clock,         label: 'Prone to confusion' },

HOUSE_DATA (12):
{ num:'01', color:'#0f766e', heading:'LAGNA (SELF)',          icon:User,       desc:'Soft, gentle presence, dreamy eyes, compassionate nature, spiritual sensitivity',   arrow:'Spiritual evolution is the primary life purpose' },
{ num:'02', color:'#d97706', heading:'WEALTH & SPEECH',       icon:Coins,      desc:'Gentle and poetic speech, wealth through spiritual work or creative arts',          arrow:'Generosity and non-attachment shape financial life' },
{ num:'03', color:'#db2777', heading:'COURAGE & SIBLINGS',    icon:Users,      desc:'Spiritually sensitive siblings, intuitive and poetic communication style',          arrow:'Short journeys to sacred sites and places of beauty' },
{ num:'04', color:'#7c3aed', heading:'HOME & MOTHER',         icon:Home,       desc:'Spiritual and aesthetically beautiful home, deeply compassionate mother',           arrow:'Home as a sanctuary of peace and creative retreat' },
{ num:'05', color:'#db2777', heading:'CHILDREN & CREATIVITY', icon:Star,       desc:'Gifted and intuitive children, exceptional creative and artistic abilities',        arrow:'Spiritually inspired creativity in music and visual arts' },
{ num:'06', color:'#1d4ed8', heading:'ENEMIES & SERVICE',     icon:Shield,     desc:'Overcomes challenges through surrender, compassion, and spiritual practice',        arrow:'Healing, counselling, or spiritual service as vocation' },
{ num:'07', color:'#0f766e', heading:'MARRIAGE & PARTNERS',   icon:Heart,      desc:'Devotional and spiritually inclined spouse, transcendent romantic partnerships',    arrow:'Soul-level partnership and shared spiritual practice' },
{ num:'08', color:'#7c3aed', heading:'TRANSFORMATION',        icon:Zap,        desc:'Transformation through spiritual dissolution, mystical experiences, deep surrender',arrow:'Access to hidden spiritual knowledge and past life wisdom' },
{ num:'09', color:'#d97706', heading:'DHARMA & FATHER',       icon:Compass,    desc:'Spiritually wise and compassionate father, natural house for dharma in Meena',     arrow:'Dharma expressed through spiritual teaching and compassion' },
{ num:'10', color:'#1d4ed8', heading:'CAREER & STATUS',       icon:TrendingUp, desc:'Career in healing, spiritual counselling, arts, music, or social service',         arrow:'Recognition through compassion and inspired service' },
{ num:'11', color:'#0f766e', heading:'GAINS & FRIENDS',       icon:Users,      desc:'Spiritually attuned and artistic friends, gains through compassion and creativity', arrow:'Financial flow through giving rather than acquiring' },
{ num:'12', color:'#0f766e', heading:'LIBERATION & FOREIGN',  icon:Globe,      desc:'Natural house for Meena, exceptional capacity for spiritual liberation',           arrow:'Moksha through complete surrender to the divine' },

MANTRA: ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः | Om Graam Greem Graum Sah Gurave Namah
Meaning: Salutation to Guru (Jupiter), the great teacher of the gods, lord of wisdom and liberation.
Practice: Chant 108 times on Thursday mornings, facing northeast, near water if possible.

12 HOUSES section bg: #f0fdf9 | Footer icon: Droplet color #0f766e
H2: Meena in the 12 Houses | Sub-eyebrow: "How the Water of Meena Flows Through Each Bhava"
Footer: "Meena water dissolves every boundary it touches, bringing <strong style={{color:'#d97706'}}>compassion, intuition</strong> and the mystic's path to liberation."

REMEDIES (JSX dark bg: #030f0d):
1. 'Chant the Guru Beej mantra (Om Graam Greem Graum Sah Gurave Namah)' | '108 times on Thursday mornings' | highlight:'Guru Beej mantra'
2. 'Wear Yellow Sapphire (Pukhraj) set in gold' | 'on the index finger, only after a chart-based recommendation' | highlight:'Yellow Sapphire (Pukhraj)'
3. 'Donate yellow sweets, yellow cloth, turmeric, or books on Thursdays' | 'at a Vishnu or Guru temple' | highlight:'yellow sweets, yellow cloth'
4. 'Recite the Guru Stotra or Vishnu Sahasranama on Thursdays' | 'for spiritual clarity, compassion, and protection' | highlight:'Guru Stotra or Vishnu Sahasranama'
5. 'Visit a Vishnu or Saraswati temple on Thursdays' | 'and offer yellow flowers, bananas, and turmeric water' | highlight:'Vishnu or Saraswati temple'
6. 'Engage in daily meditation, prayer, creative arts, or healing practice' | 'as Meena natives require spiritual practice to remain grounded' | highlight:'meditation, prayer, creative arts'
7. 'Avoid escapism, excessive idealism, and self-sacrifice without boundaries' | 'during Jupiter-afflicted periods. Cultivate healthy boundaries alongside compassion' | highlight:'Avoid escapism, excessive idealism'

FAQ bg: #f0fdf9 | icon: ♓ | aria prefix: meena-faq | H2 accent: #0f766e
FAQ_DATA (5):
Q1: 'What is Meena Rashi in Vedic astrology?' icon:HelpCircle color:'#0f766e' showImage:true
  Answer: Meena Rashi (Pisces) is the twelfth and final sign of the Vedic sidereal zodiac,
  spanning 330 to 360 degrees. It is a mutable water sign ruled by Guru (Jupiter). Natives
  with the Moon in Meena are known for their deep intuition, compassion, and a spiritual
  sensitivity that gives them access to dimensions of experience beyond the ordinary.
Q2: 'Who is the ruling planet of Meena Rashi?' icon:Globe color:'#d97706'
  Answer: Guru (Jupiter) is the ruling planet of Meena Rashi. In Meena, Jupiter expresses
  its water quality: compassionate, all-encompassing, and spiritually expansive. Jupiter
  governs wisdom, dharma, spiritual teaching, and liberation. Strong Jupiter in Meena
  produces healers, mystics, artists, and those who serve others through compassion.
Q3: 'What are the personality traits of Meena Rashi natives?' icon:User color:'#7c3aed'
  Answer: Meena natives are deeply compassionate, intuitive, and spiritually gifted. They are
  natural healers and artists who feel the world more deeply than most. Their challenges
  include escapism, poor boundaries, and difficulty distinguishing their own feelings from
  those of others. When grounded through spiritual practice, Meena energy is profoundly healing.
Q4: 'Which gemstone is recommended for Meena Rashi?' icon:Gem color:'#1d4ed8'
  Answer: Yellow Sapphire (Pukhraj) is the classical gemstone for Meena Rashi, worn to
  strengthen Guru (Jupiter). It should be set in gold and worn on the index finger of the
  right hand on a Thursday morning after proper mantra invocation. A chart-based consultation
  with Soul Infinity Astro Solutions is essential before wearing any planetary gemstone.
Q5: 'What are the lucky days and colours for Meena Rashi?' icon:Calendar color:'#0f766e'
  Answer: Thursday is the most auspicious day for Meena Rashi natives. Sea green, aquamarine,
  and violet are the lucky colours. Fasting on Thursdays, visiting Vishnu temples, meditating
  near water, and wearing light green or violet on important occasions support Meena natives
  in channelling Jupiter's compassionate wisdom.

CTA bg: bg-gradient-to-r from-teal-900 to-emerald-900
H2: "Want a Personalised Meena Reading?"

SEO title: "Meena Rashi (Pisces), Traits, Mantra, Remedies | Soul Infinity"
SEO description: "Meena Rashi (Pisces) in Vedic astrology, ruled by Guru (Jupiter). Personality traits, mantra, remedies, and houses placement, guided by Saurabh Jain."
keywords: "meena rashi, pisces vedic astrology, guru, jupiter, pisces traits, meena mantra, yellow sapphire, pukhraj, meena remedies, soul infinity"
SchemaMarkup url: '/zodiac/pisces' | name: 'Meena Rashi (Pisces) in Vedic Astrology'

PHASES 3-9:
Route: /zodiac/pisces | Hub: Pisces/Meena | Prerender: /zodiac/pisces
Commit: "feat: add Meena Rashi (Pisces) pillar page with R2 assets, route, and hub update"
PR: "feat: Meena Rashi (Pisces) pillar page"
Status doc: scripts/meena-rashi-page-status.md
