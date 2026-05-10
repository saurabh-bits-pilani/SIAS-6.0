# Vrishabha Rashi Page — Build Brief
# Feature branch: feature/vrishabha-rashi-page
# Output file: src/pages/zodiac/VrishabhaRashiPage.tsx
# Route: /zodiac/taurus
# Status doc: scripts/vrishabha-rashi-page-status.md

═══════════════════════════════════════════════════════════════
PHASE 0 — ASSET VERIFICATION AND R2 UPLOAD
═══════════════════════════════════════════════════════════════

Local asset folder: /Users/saurabhiim/Documents/Antigravity/SIAS-5.0-main/assets-to-upload/Tarus/

Step 0.1 — List the folder and confirm these 3 files exist:
  - her-banner-tarus-rashi.png   (hero banner, dark green/gold bull)
  - Taraus_Rashi_Quick_Facts_Strip.png  (quick facts strip)
  - Tarus-card.png               (circular card, Vrishabha Rashi)

If any file is missing, STOP and report which file is absent.

Step 0.2 — Optimize each file before upload using sharp.
Run from repo root (source ~/.zshrc first):

  source ~/.zshrc && node -e "
    const sharp = require('sharp');
    const path = require('path');
    const base = '/Users/saurabhiim/Documents/Antigravity/SIAS-5.0-main/assets-to-upload/Tarus';

    // Hero banner → WebP quality 85, max 1600px wide
    sharp(path.join(base, 'her-banner-tarus-rashi.png'))
      .resize(1600, null, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(path.join(base, 'hero-banner-vrishabha-rashi.webp'))
      .then(i => console.log('hero done', i.size, 'bytes'));

    // Quick facts → WebP quality 85, max 1600px wide
    sharp(path.join(base, 'Taraus_Rashi_Quick_Facts_Strip.png'))
      .resize(1600, null, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(path.join(base, 'quick-facts-vrishabha-rashi.webp'))
      .then(i => console.log('quick-facts done', i.size, 'bytes'));

    // Card → WebP quality 90, max 800x800
    sharp(path.join(base, 'Tarus-card.png'))
      .resize(800, 800, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 90 })
      .toFile(path.join(base, 'vrishabha-card.webp'))
      .then(i => console.log('card done', i.size, 'bytes'));
  "

If any output file exceeds these limits, re-run with quality reduced by 5:
  - hero-banner: max 400 KB
  - quick-facts: max 400 KB
  - vrishabha-card: max 200 KB

Step 0.3 — Upload all 3 optimized .webp files to R2.
R2 destination folder: Zodiac/Tarus/
Use the existing upload script or wrangler. Confirm each upload with the public URL.

Expected public URLs after upload:
  HERO_URL    = https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Tarus/hero-banner-vrishabha-rashi.webp
  QUICK_FACTS_URL = https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Tarus/quick-facts-vrishabha-rashi.webp
  CARD_URL    = https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Tarus/vrishabha-card.webp

Step 0.4 — Verify each URL returns HTTP 200:
  curl -I https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Tarus/hero-banner-vrishabha-rashi.webp
  curl -I https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Tarus/quick-facts-vrishabha-rashi.webp
  curl -I https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Tarus/vrishabha-card.webp

If any returns non-200, STOP and report.

MANTRA_BG_URL — placeholder for now. Use this inline CSS fallback in the mantra section
(no image, pure CSS green/gold gradient). Saurabh will generate the image separately and
update the constant later.

REMEDIES_BG_URL — not used in this build. The remedies section will be rendered in JSX
with green/gold theme. No bg image. Will be updated in a future PR when Saurabh provides
the image.

═══════════════════════════════════════════════════════════════
PHASE 1 — BRANCH
═══════════════════════════════════════════════════════════════

cd /Users/saurabhiim/Documents/Antigravity/SIAS-5.0-main
git checkout main && git pull origin main
git checkout -b feature/vrishabha-rashi-page

═══════════════════════════════════════════════════════════════
PHASE 2 — CREATE THE PAGE FILE
═══════════════════════════════════════════════════════════════

Create: src/pages/zodiac/VrishabhaRashiPage.tsx

Use MeshaRashiPage.tsx as structural template. Every section, component pattern,
and import style is identical. Only the data, colors, content, and asset URLs change.

HARD RULES (same as all pages):
- No em-dashes anywhere (use commas, "and", "such as", "like")
- No emojis in code, JSX, or content
- No Gujarati text anywhere
- fetchpriority="high" lowercase only on hero img
- All Sanskrit followed by IAST transliteration and English meaning
- Max 1 authentic Sanskrit shloka on the page
- No @jalba/react-css-doodle
- No imports from blog-images-folder
- All R2 URLs are inline constants at top of file
- Single self-contained .tsx file

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2A. CONSTANTS (top of file)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const HERO_URL =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Tarus/hero-banner-vrishabha-rashi.webp';
const QUICK_FACTS_URL =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Tarus/quick-facts-vrishabha-rashi.webp';
const CARD_URL =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Tarus/vrishabha-card.webp';
// MANTRA_BG_URL: to be added when Saurabh provides the image. For now mantra section uses CSS.
// REMEDIES_BG_URL: to be added in a future PR.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2B. SIGN DATA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Sign:          Vrishabha (Taurus)
Sanskrit:      वृषभ राशि
IAST:          Vrsabha Rasi
English:       The Bull
Rashi number:  2nd sign
Element:       Earth (Prithvi)
Quality:       Fixed (Sthira)
Ruler:         Shukra (Venus)
Symbol:        The Bull  ♉
Lucky colour:  Green
Lucky day:     Friday
Gemstone:      Diamond (Heera) or White Sapphire (Safed Pukhraj)
Dates:         Apr 20 to May 20 (tropical reference, sidereal context explained in content)
Body parts:    Throat, neck, vocal cords, thyroid, lower jaw
Direction:     South
Deity:         Goddess Lakshmi (associated with Shukra)
Shloka:        Use this one authentic shloka from Brihat Parashara Hora Shastra:
               "Sthiro dvibahu sthulakayah prithvibhago vrisho rashi"
               IAST: Sthiro dvibahu sthulakayah prthvibhago vrso rasi
               Meaning: Taurus is a fixed sign, two-armed, with a stout body, belonging to the earth element.

Page accent colors (replace all Aries red/orange palette):
  Primary:     #15803d  (deep green)
  Secondary:   #d97706  (gold/amber, keep same as Aries for warmth)
  Accent:      #065f46  (dark forest green)
  Highlight:   #bbf7d0  (light mint, for bg chips)
  Text dark:   #1e3a5f  (keep same)
  Text red:    replace #b91c1c and #dc2626 with #15803d throughout

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2C. STRENGTH_ROWS (6 items)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

{ icon: Mountain,    label: 'Patient and persistent' },
{ icon: ShieldCheck, label: 'Deeply reliable' },
{ icon: Heart,       label: 'Sensual and artistic' },
{ icon: Coins,       label: 'Financially disciplined' },
{ icon: Crown,       label: 'Loyal to the end' },
{ icon: Gem,         label: 'Aesthetic sensibility' },

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2D. CHALLENGE_ROWS (4 items)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

{ icon: ChevronsRight, label: 'Stubborn and inflexible' },
{ icon: Timer,         label: 'Resistant to change' },
{ icon: UserX,         label: 'Possessive in relationships' },
{ icon: Clock,         label: 'Slow to decide' },

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2E. HOUSE_DATA (12 entries, all Vrishabha-specific)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Replace Aries red color palette with Vrishabha green palette below.
Color rotation: #15803d, #d97706, #db2777, #7c3aed, #1d4ed8, #0f766e (same rotation logic as Aries).

{ num: '01', color: '#15803d', heading: 'LAGNA (SELF)',          icon: User,       desc: 'Calm, sturdy physique, love of beauty and comfort, Venus-ruled temperament',                         arrow: 'Material security is a core life drive' },
{ num: '02', color: '#d97706', heading: 'WEALTH & SPEECH',       icon: Coins,      desc: 'Melodious voice, strong accumulation instinct, family with refined tastes',                          arrow: 'Wealth grows steadily through patience' },
{ num: '03', color: '#db2777', heading: 'COURAGE & SIBLINGS',    icon: Users,      desc: 'Artistic communication, preference for beauty in expression, siblings with Venusian qualities',     arrow: 'Short travels for aesthetic or financial purpose' },
{ num: '04', color: '#7c3aed', heading: 'HOME & MOTHER',         icon: Home,       desc: 'Luxurious home, devoted mother, strong attachment to land and property',                             arrow: 'Comfort and beauty define the domestic space' },
{ num: '05', color: '#db2777', heading: 'CHILDREN & CREATIVITY', icon: Star,       desc: 'Artistic children, deep romantic attachment, creative talents in music or visual arts',              arrow: 'Creativity expressed through beauty and form' },
{ num: '06', color: '#1d4ed8', heading: 'ENEMIES & SERVICE',     icon: Shield,     desc: 'Overcomes enemies through endurance rather than force',                                              arrow: 'Medical, finance, or beauty-industry service favoured' },
{ num: '07', color: '#0f766e', heading: 'MARRIAGE & PARTNERS',   icon: Heart,      desc: 'Loyal, sensual spouse, partnerships built on shared values and comfort',                             arrow: 'Business partnerships in arts or luxury sectors' },
{ num: '08', color: '#7c3aed', heading: 'TRANSFORMATION',        icon: Zap,        desc: 'Slow but deep transformations, gains through inheritance, interest in occult beauty',               arrow: 'Transformation through material letting-go' },
{ num: '09', color: '#d97706', heading: 'DHARMA & FATHER',       icon: Compass,    desc: 'Devotional faith, artistic or prosperous father, pilgrimages with aesthetic purpose',               arrow: 'Dharma expressed through creation and devotion' },
{ num: '10', color: '#1d4ed8', heading: 'CAREER & STATUS',       icon: TrendingUp, desc: 'Career in arts, finance, luxury goods, agriculture, or beauty industry',                            arrow: 'Recognition through refined skill and persistence' },
{ num: '11', color: '#15803d', heading: 'GAINS & FRIENDS',       icon: Users,      desc: 'Friends in artistic, musical, or financial circles',                                                 arrow: 'Gains accumulate steadily over long periods' },
{ num: '12', color: '#0f766e', heading: 'LIBERATION & FOREIGN',  icon: Globe,      desc: 'Spiritual comfort-seeker, hidden pleasures, foreign travel for beauty or trade',                    arrow: 'Liberation through surrender of attachment' },

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2F. FAQ_DATA (5 items, same structure as Aries)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FAQ 1:
  q: 'What is Vrishabha Rashi in Vedic astrology?'
  icon: HelpCircle, color: '#15803d', showImage: true
  a: Vrishabha Rashi (Taurus) is the second sign of the Vedic sidereal zodiac, spanning 30 to
     60 degrees. It is a fixed earth sign ruled by Shukra (Venus), the planet of beauty,
     comfort, and material abundance. Natives with the Moon in Vrishabha are known for their
     steadiness, sensual nature, and deep love of beauty in all forms.
  aText: (plain text mirror of above, no JSX)

FAQ 2:
  q: 'Who is the ruling planet of Vrishabha Rashi?'
  icon: Globe, color: '#d97706'
  a: Shukra (Venus) is the ruling planet of Vrishabha Rashi. Venus governs beauty, art, music,
     romance, luxury, wealth, vehicles, and the pleasures of life. A strong Venus in the chart
     amplifies artistic talent, financial acumen, and romantic fulfilment. A weak or afflicted
     Venus can bring indulgence, attachment, and relationship difficulties.
  aText: (plain text mirror)

FAQ 3:
  q: 'What are the personality traits of Vrishabha Rashi natives?'
  icon: User, color: '#7c3aed'
  a: Vrishabha natives are patient, dependable, and deeply sensual. They build slowly but
     build to last, whether in relationships, finances, or creative work. Their greatest
     challenge is resistance to change and possessiveness. When their stubbornness is redirected
     into persistence, Vrishabha energy produces remarkable, enduring results.
  aText: (plain text mirror)

FAQ 4:
  q: 'Which gemstone is recommended for Vrishabha Rashi?'
  icon: Gem, color: '#1d4ed8'
  a: Diamond (Heera) or White Sapphire (Safed Pukhraj) are the classical gemstones for
     Vrishabha Rashi, worn to strengthen Shukra (Venus). Diamond should be set in silver or
     platinum and worn on the middle finger of the right hand on a Friday morning after proper
     mantra invocation. A chart-based consultation with a qualified jyotishi at Soul Infinity
     Astro Solutions is essential before wearing any planetary gemstone.
  aText: (plain text mirror)

FAQ 5:
  q: 'What are the lucky days and colours for Vrishabha Rashi?'
  icon: Calendar, color: '#0f766e'
  a: Friday is the most auspicious day for Vrishabha Rashi natives, governed by Shukra
     (Venus). Green, white, and pink are the lucky colours that resonate with Venus energy.
     Fasting on Fridays, visiting Lakshmi or Devi temples, and wearing green or white on
     important occasions are traditional practices that support Vrishabha natives in
     channelling Venus energy constructively.
  aText: (plain text mirror)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2G. SEO HEAD (Section 1 equivalent)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<SEOHead
  title="Vrishabha Rashi (Taurus), Traits, Mantra, Remedies | Soul Infinity"
  description="Vrishabha Rashi (Taurus) in Vedic astrology, ruled by Shukra (Venus). Personality traits, mantra, remedies, characteristics, and houses placement, guided by Saurabh Jain."
  keywords="vrishabha rashi, taurus vedic astrology, shukra, venus, taurus traits, vrishabha mantra, diamond, heera, vrishabha remedies, soul infinity"
  image={HERO_URL}
  type="article"
  omitDefaultSchema
/>

SchemaMarkup:
  type="webpage"
  webPage.name = 'Vrishabha Rashi (Taurus) in Vedic Astrology'
  webPage.description = 'Vrishabha Rashi, the second sign of the Vedic zodiac, ruled by Shukra (Venus). Personality, mantra, remedies, and houses placement.'
  webPage.url = '/zodiac/taurus'
  breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Zodiac Signs', url: '/zodiac' },
    { name: 'Vrishabha (Taurus)', url: '/zodiac/taurus' },
  ]

Helmet FAQPage schema: same getFaqPageSchemaFromList(FAQS) pattern as Aries.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2H. HERO SECTION (Section 1)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Identical structure to Aries:
  height: 420px
  img src={HERO_URL}
  alt="Vrishabha Rashi hero banner Soul Infinity Astro Solutions"
  fetchpriority="high"
  Gradient overlay: linear-gradient(to right, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.55) 100%)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2I. BREADCRUMBS + TITLE STRIP (Section 2)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Breadcrumbs items:
  { label: 'Home', href: '/' }
  { label: 'Zodiac Signs', href: '/zodiac' }
  { label: 'Vrishabha (Taurus)' }

Title strip:
  Eyebrow: <span className="font-devanagari" lang="sa">वृषभ राशि</span> · Taurus
  H1: Vrishabha Rashi, The Builder of the Zodiac
  Subtitle: Ruled by Shukra (Venus) · Earth Sign · The Bull
  Eyebrow color: text-green-700 (replace amber-600)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2J. ABOUT SECTION (Section 3, two-column infographic)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Background: #f0fdf4 (light green tint, replaces Aries #fdf6f0 peach)
Left column header icon: use Gem (replaces Flame)
Header icon bg: bg-green-100 text-green-700

Card 1 (intro):
  Icon: Gem, bg-green-100 text-green-700
  Text: Vrishabha (Taurus) is the second sign of the Vedic zodiac, ruled by Shukra (Venus),
  the planet of beauty, abundance, and earthly pleasures. As a fixed earth sign, Vrishabha
  carries the energy of consolidation, the force that takes what Mesha initiated and builds
  it into something lasting.

Card 2 (title: The Builder):
  Icon: Mountain, bg-green-100 text-green-700
  Heading color: #15803d
  Text: In the Brihat Parashara Hora Shastra, Vrishabha is described as a Vaishya sign,
  associated with trade, prosperity, and the art of creating wealth from the earth's bounty.

Card 3 (title: Sensual and Devoted):
  Icon: Heart, bg-slate-900 text-white
  Text: The Bull moves slowly but with absolute certainty. Vrishabha natives do not rush
  toward goals; they accumulate, layer by layer, until what they have built is unshakeable.

Card 4 (title: Born to Endure):
  Icon: Shield, bg-green-100 text-green-700
  Heading color: #15803d
  Text: Where Mesha acts on instinct, Vrishabha acts on conviction. Once a Vrishabha
  native commits to a path, very few forces in the world can redirect them.

RIGHT COLUMN — Quick Facts image:
  src={QUICK_FACTS_URL}
  alt="Vrishabha Rashi Quick Facts Soul Infinity"
  Same styling as Aries (rounded-xl, shadow, border)

STRENGTH / CHALLENGE panels below the two columns:
  Strengths panel bg: #f0fdf4, border color: #15803d
  Challenges panel bg: #fef9c3 (keep yellow-tint same as Aries)
  Use STRENGTH_ROWS and CHALLENGE_ROWS defined in 2C/2D

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2K. MANTRA SECTION (Section 4)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

No background image yet. Use this CSS gradient as background:
  background: linear-gradient(135deg, #052e16 0%, #14532d 40%, #1a3a1a 70%, #0a0a0a 100%)

Mantra content:
  Sanskrit: ॐ शुं शुक्राय नमः
  IAST: Om Shum Shukraya Namah
  Meaning: Salutation to Shukra (Venus), the planet of beauty and abundance

  Shloka (1 authentic, from BPHS):
  Sanskrit: "स्थिरो द्विबाहु स्थूलकायः पृथ्वीभागो वृषो राशि"
  IAST: Sthiro dvibahu sthulakayah prthvibhago vrso rasi
  Meaning: Taurus is a fixed sign, two-armed, with a stout body, belonging to the earth element.
  Source: Brihat Parashara Hora Shastra

  Practice note: Chant 108 times on Friday mornings, preferably before sunrise,
  facing east, after lighting a ghee lamp.

Mantra section text colors: white on the dark green gradient background.
Star/sparkle decorative symbols: use gold #d97706.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2L. QUICK FACTS STRIP (Section 5)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This is the QUICK_FACTS_URL image rendered as a full-width <img> tag, same as Aries.
  src={QUICK_FACTS_URL}
  alt="Taurus Rashi Quick Facts strip Soul Infinity"
  Full width, display block, loading="lazy"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2M. 12 HOUSES SECTION (Section 6)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Background: #f0fdf4 (light green tint)
Section header:
  Icon: Target (same as Aries), icon bg: #dcfce7, icon color: #15803d
  H2: <span style={{ color: '#15803d' }}>Vrishabha</span>
      <span style={{ color: '#1e3a5f' }}> in the 12 Houses</span>
  Sub-eyebrow: "How the Earth of Vrishabha Grounds Each Bhava"

Use HOUSE_DATA from section 2E above.

Footer line icon: replace Flame with Gem, color #15803d
Footer text: "Vrishabha earth stabilizes every house it touches, bringing
<strong style={{ color: '#d97706' }}>patience, beauty</strong> and the will to endure."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2N. REMEDIES SECTION (Section 7) — JSX version, no bg image
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Since no remedies-bg image is available yet, render this section as a styled JSX card grid
on a dark green background, matching the Taurus color theme.

Section background: #052e16 (dark forest green)
Section padding: py-16 px-6

Header:
  H2: "Classical Vedic Remedies for Vrishabha Rashi"
  H2 color: white
  Sub: "Strengthen Shukra and align with Venus energy"
  Sub color: rgba(255,255,255,0.7)
  Decorative ✦ symbols in gold #d97706 at corners (same as Aries FAQ section pattern)

Render 7 remedy cards in a 2-col grid (md:grid-cols-2), each card:
  bg: rgba(255,255,255,0.07), rounded-xl, border: 1px solid rgba(212,175,55,0.3)
  Highlight keyword in gold #d97706

Remedy items:
  1. main: 'Chant the Shukra Beej mantra (Om Shum Shukraya Namah)'
     sub:   '108 times on Friday mornings'
     highlight: 'Shukra Beej mantra'

  2. main: 'Wear Diamond (Heera) or White Sapphire set in silver or platinum'
     sub:   'on the middle finger of the right hand, only after a chart-based recommendation'
     highlight: 'Diamond (Heera) or White Sapphire'

  3. main: 'Donate white sweets, white cloth, rice, or white flowers'
     sub:   'on Fridays at a Lakshmi or Devi temple'
     highlight: 'white sweets, white cloth'

  4. main: 'Recite the Shukra Stotra or Lakshmi Ashtakam on Fridays'
     sub:   'for harmony in relationships and financial growth'
     highlight: 'Shukra Stotra or Lakshmi Ashtakam'

  5. main: 'Visit a Lakshmi or Devi temple on Fridays'
     sub:   'and offer white flowers, kheer, and incense'
     highlight: 'Lakshmi or Devi temple'

  6. main: 'Cultivate artistic skills: music, painting, gardening, or any Venusian craft'
     sub:   'as a conscious practice that channels Shukra energy constructively'
     highlight: 'music, painting, gardening'

  7. main: 'Reduce excessive sugar, dairy, and overindulgence in comfort'
     sub:   'during Venus-afflicted periods. Cultivate non-attachment to material comfort'
     highlight: 'Reduce excessive sugar, dairy'

Note: When Saurabh provides remedies-bg image, this JSX section will be replaced with the
same image-overlay pattern used in MeshaRashiPage.tsx Section 7.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2O. FAQ SECTION (Section 8)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Background: #f0fdf4 (light green tint, replaces Aries #fdf6f0 peach)
Decorative corner symbols: ✦ in gold #f59e0b opacity 0.4 (same as Aries)

FAQ header icon: ♉ (Taurus glyph)
  border: 2px solid #d97706
  color: #d97706

H2:
  <span style={{ color: '#1e3a5f' }}>Frequently Asked </span>
  <span style={{ color: '#15803d' }}>Questions</span>

Sub: "Your top questions about Vrishabha Rashi, answered with clarity"

Accordion: same pattern as Aries.
  aria-controls uses prefix "vrishabha-faq-{i}"
Use FAQ_DATA from section 2F.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2P. CTA SECTION (Section 9)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Identical structure to Aries CTA. Replace text only:
  H2: "Want a Personalised Vrishabha Reading?"
  Body: "Saurabh Jain at Soul Infinity Astro Solutions reads Vrishabha placement in the
  context of your full birth chart, current dasha, and active transits, then translates the
  reading into decisions you can actually act on."
  Button: "Book a Consultation" (same Link to="/contact", same amber button styling)
  Background: bg-gradient-to-r from-green-900 to-emerald-900 (replaces blue-900 to indigo-900)
  Hero image overlay: src={HERO_URL} (same pattern, opacity-15)

═══════════════════════════════════════════════════════════════
PHASE 3 — REGISTER ROUTE
═══════════════════════════════════════════════════════════════

Open the router file (likely src/App.tsx or src/router.tsx).
Find the existing Aries route:
  <Route path="/zodiac/aries" element={<MeshaRashiPage />} />

Add immediately below:
  <Route path="/zodiac/taurus" element={<VrishabhaRashiPage />} />

Import at top of router file:
  import VrishabhaRashiPage from './pages/zodiac/VrishabhaRashiPage';

═══════════════════════════════════════════════════════════════
PHASE 4 — UPDATE PRERENDER ROUTES
═══════════════════════════════════════════════════════════════

Open scripts/prerender.mjs (or wherever ROUTES array lives).
Add '/zodiac/taurus' to the ROUTES array, adjacent to '/zodiac/aries'.

═══════════════════════════════════════════════════════════════
PHASE 5 — UPDATE ZODIAC HUB PAGE
═══════════════════════════════════════════════════════════════

Open src/pages/hubs/ZodiacHubPage.tsx (or equivalent zodiac hub file).
Find the Taurus / Vrishabha card.
It is currently rendered as a "Coming Soon" card (non-clickable, grey/muted, Coming Soon badge).
Change it to a live card:
  - Remove Coming Soon badge
  - Add href="/zodiac/taurus"
  - Make it clickable (same style as the live Aries card)
  - Restore full opacity

Do NOT touch any other rashi cards. Only Vrishabha.

═══════════════════════════════════════════════════════════════
PHASE 6 — VALIDATION GATES
═══════════════════════════════════════════════════════════════

Run all gates in order. On first failure, attempt ONE auto-fix, then re-run.
If still failing after one fix, STOP and report the exact error.

Gate 1 — Em-dash check (zero tolerance):
  grep -r "\u2014" src/pages/zodiac/VrishabhaRashiPage.tsx
  Must return zero matches.

Gate 2 — JSX comment check:
  grep -n "<!--" src/pages/zodiac/VrishabhaRashiPage.tsx
  Must return zero matches. (JSX comments use {/* */} only)

Gate 3 — R2 URL check:
  grep "r2.dev" src/pages/zodiac/VrishabhaRashiPage.tsx
  Must return the 3 expected URL constants and no others.

Gate 4 — No blog-images import:
  grep "blog-images" src/pages/zodiac/VrishabhaRashiPage.tsx
  Must return zero matches.

Gate 5 — Schema preserved:
  grep "getFaqPageSchemaFromList" src/pages/zodiac/VrishabhaRashiPage.tsx
  Must return 1 match.

Gate 6 — fetchpriority lowercase:
  grep "fetchPriority" src/pages/zodiac/VrishabhaRashiPage.tsx
  Must return zero matches. (Must be fetchpriority="high" lowercase)

Gate 7 — Route registered:
  grep "zodiac/taurus" src/App.tsx (or router file)
  Must return at least 1 match.

Gate 8 — Prerender route:
  grep "zodiac/taurus" scripts/prerender.mjs
  Must return at least 1 match.

Gate 9 — Build:
  npm run build
  Must complete with zero errors.

Gate 10 — Local content spot-check (after build):
  grep -r "Vrishabha Rashi" dist/
  Must return at least 1 match.

═══════════════════════════════════════════════════════════════
PHASE 7 — COMMIT AND PUSH
═══════════════════════════════════════════════════════════════

git add src/pages/zodiac/VrishabhaRashiPage.tsx
git add src/App.tsx (or router file, whichever was modified)
git add scripts/prerender.mjs
git add src/pages/hubs/ZodiacHubPage.tsx (or equivalent)
git commit -m "feat: add Vrishabha Rashi (Taurus) pillar page with R2 assets, route, and hub update"
git push origin feature/vrishabha-rashi-page

═══════════════════════════════════════════════════════════════
PHASE 8 — STATUS DOC
═══════════════════════════════════════════════════════════════

Create scripts/vrishabha-rashi-page-status.md with these sections:
  1. Branch and commit hash
  2. R2 assets uploaded (3 files, sizes, public URLs verified)
  3. File created: src/pages/zodiac/VrishabhaRashiPage.tsx
  4. Route registered
  5. Prerender route added
  6. Zodiac hub card activated
  7. All 10 validation gates: PASS / FAIL
  8. Build result
  9. Ready for staging PR: YES / NO
  10. Notes (any deviations from brief)

Commit status doc:
  git add scripts/vrishabha-rashi-page-status.md
  git commit -m "docs: add Vrishabha Rashi page status doc"
  git push origin feature/vrishabha-rashi-page

═══════════════════════════════════════════════════════════════
PHASE 9 — PR
═══════════════════════════════════════════════════════════════

Open a PR: feature/vrishabha-rashi-page → main
Title: "feat: Vrishabha Rashi (Taurus) pillar page"
Body:
  - VrishabhaRashiPage.tsx created, 9 sections matching Mesha template
  - 3 R2 assets uploaded to Zodiac/Tarus/ (hero, quick-facts, card)
  - Mantra section: CSS gradient (no bg image yet, to be updated)
  - Remedies section: JSX card grid on dark green (no bg image yet, to be updated)
  - Route /zodiac/taurus registered
  - Prerender route added
  - Zodiac hub Taurus card activated
  - All 10 gates PASS
  - Build clean

═══════════════════════════════════════════════════════════════
END OF BRIEF
═══════════════════════════════════════════════════════════════
