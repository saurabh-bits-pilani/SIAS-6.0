import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ArrowRight,
  ChevronDown,
  AlertTriangle,
  Droplet,
  Users,
  Target,
  Star,
  Home,
  User,
  Coins,
  Shield,
  Heart,
  Zap,
  Compass,
  TrendingUp,
  Globe,
  HelpCircle,
  Gem,
  Calendar,
  ShieldCheck,
  Sparkles,
  ChevronsRight,
  Timer,
  UserX,
  Clock,
  Moon,
  Waves,
  type LucideIcon,
} from 'lucide-react';
import SEOHead from '../../components/SEOHead';
import SchemaMarkup from '../../components/SchemaMarkup';
import Breadcrumbs from '../../components/Breadcrumbs';
import { getFaqPageSchemaFromList } from '../../data/schema-entities';

const HERO_URL =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Cancer/hero-banner-karka-rashi.webp';
const QUICK_FACTS_URL =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Cancer/quick-facts-karka-rashi.webp';
const MANTRA_BG_URL =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Cancer/mantra-bg-karka-rashi.webp';
const CARD_URL =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Cancer/karka-card.webp';

interface TraitRow {
  icon: LucideIcon;
  label: string;
}

const STRENGTH_ROWS: readonly TraitRow[] = [
  { icon: Heart, label: 'Deeply nurturing' },
  { icon: ShieldCheck, label: 'Fiercely protective' },
  { icon: Droplet, label: 'Emotionally intuitive' },
  { icon: Home, label: 'Devoted to family' },
  { icon: Users, label: 'Empathetic listener' },
  { icon: Sparkles, label: 'Creatively imaginative' },
];

const CHALLENGE_ROWS: readonly TraitRow[] = [
  { icon: ChevronsRight, label: 'Moody and withdrawn' },
  { icon: Timer, label: 'Over-sensitive' },
  { icon: UserX, label: 'Clingy in relationships' },
  { icon: Clock, label: 'Holds onto the past' },
];

interface HouseData {
  num: string;
  color: string;
  heading: string;
  icon: LucideIcon;
  desc: string;
  arrow: string;
}

const HOUSE_DATA: readonly HouseData[] = [
  { num: '01', color: '#0369a1', heading: 'LAGNA (SELF)',          icon: User,       desc: 'Soft appearance, nurturing instincts, strong emotional memory, ruled by the Moon',         arrow: 'Home and family are the centre of identity' },
  { num: '02', color: '#d97706', heading: 'WEALTH & SPEECH',       icon: Coins,      desc: 'Gentle speech, wealth through home-based or nurturing professions, devoted family',       arrow: 'Security-driven financial choices' },
  { num: '03', color: '#db2777', heading: 'COURAGE & SIBLINGS',    icon: Users,      desc: 'Emotional communication style, close bond with siblings, short travels for family',       arrow: 'Courage expressed through protection of loved ones' },
  { num: '04', color: '#7c3aed', heading: 'HOME & MOTHER',         icon: Home,       desc: 'Extremely strong 4th house, devoted mother, deep attachment to birthplace',              arrow: 'Happiness found in domestic comfort and roots' },
  { num: '05', color: '#db2777', heading: 'CHILDREN & CREATIVITY', icon: Star,       desc: 'Emotionally bonded with children, nurturing romance, creative gifts in arts and music',   arrow: 'Creativity flows from emotional depth' },
  { num: '06', color: '#1d4ed8', heading: 'ENEMIES & SERVICE',     icon: Shield,     desc: 'Overcomes challenges through emotional endurance and care',                               arrow: 'Healing, nursing, and social work favoured' },
  { num: '07', color: '#0f766e', heading: 'MARRIAGE & PARTNERS',   icon: Heart,      desc: 'Deeply devoted spouse, partnerships built on emotional security and trust',               arrow: 'Marriage becomes a sacred home' },
  { num: '08', color: '#7c3aed', heading: 'TRANSFORMATION',        icon: Zap,        desc: 'Deep emotional transformations, psychic sensitivity, interest in past lives',            arrow: 'Transformation through emotional release' },
  { num: '09', color: '#d97706', heading: 'DHARMA & FATHER',       icon: Compass,    desc: 'Devotional faith, nurturing father figure, pilgrimages near water',                      arrow: 'Dharma found in service and compassion' },
  { num: '10', color: '#1d4ed8', heading: 'CAREER & STATUS',       icon: TrendingUp, desc: 'Career in healthcare, education, hospitality, real estate, or the arts',                 arrow: 'Recognition through care and nurturing skill' },
  { num: '11', color: '#0369a1', heading: 'GAINS & FRIENDS',       icon: Users,      desc: 'Friends who feel like family, gains through emotional bonds and home ventures',          arrow: 'Fulfilment through belonging and community' },
  { num: '12', color: '#0f766e', heading: 'LIBERATION & FOREIGN',  icon: Globe,      desc: 'Spiritual sensitivity, dream states, foreign travel near water or for healing',          arrow: 'Liberation through emotional surrender' },
];

interface FaqItem {
  q: string;
  a: ReactNode;
  aText: string;
  icon: LucideIcon;
  color: string;
  showImage?: boolean;
}

const FAQ_DATA: readonly FaqItem[] = [
  {
    q: 'What is Karka Rashi in Vedic astrology?',
    icon: HelpCircle,
    color: '#0369a1',
    showImage: true,
    a: (
      <>
        Karka Rashi (Cancer) is the fourth sign of the Vedic sidereal zodiac, spanning 90 to 120
        degrees. It is a <strong style={{ color: '#d97706' }}>cardinal water sign</strong> ruled by{' '}
        <strong style={{ color: '#d97706' }}>Chandra (the Moon)</strong>, the planet of emotions,
        mind, and nurturing. Natives with the Moon in Karka are emotionally deep, highly intuitive,
        and devoted to home and family above all else.
      </>
    ),
    aText:
      'Karka Rashi (Cancer) is the fourth sign of the Vedic sidereal zodiac, spanning 90 to 120 degrees. It is a cardinal water sign ruled by Chandra (the Moon), the planet of emotions, mind, and nurturing. Natives with the Moon in Karka are emotionally deep, highly intuitive, and devoted to home and family above all else.',
  },
  {
    q: 'Who is the ruling planet of Karka Rashi?',
    icon: Globe,
    color: '#d97706',
    a: (
      <>
        Chandra (the Moon) is the ruling planet of Karka Rashi. The Moon governs emotions, the
        mind, mother, home, water, and all nurturing instincts. A strong Moon amplifies empathy,
        creativity, and devotion. A weak or afflicted Moon can bring emotional instability,
        attachment, and difficulty in setting boundaries.
      </>
    ),
    aText:
      'Chandra (the Moon) is the ruling planet of Karka Rashi. The Moon governs emotions, the mind, mother, home, water, and all nurturing instincts. A strong Moon amplifies empathy, creativity, and devotion. A weak or afflicted Moon can bring emotional instability, attachment, and difficulty in setting boundaries.',
  },
  {
    q: 'What are the personality traits of Karka Rashi natives?',
    icon: User,
    color: '#7c3aed',
    a: (
      <>
        Karka natives are nurturing, intuitive, and profoundly loyal. They build their world
        around home and family, and they protect those they love with fierce devotion. Their
        greatest challenge is emotional hypersensitivity and an inability to release the past.
        When their emotional depth is channelled constructively, Karka natives become remarkable
        healers, artists, and caregivers.
      </>
    ),
    aText:
      'Karka natives are nurturing, intuitive, and profoundly loyal. They build their world around home and family, and they protect those they love with fierce devotion. Their greatest challenge is emotional hypersensitivity and an inability to release the past. When their emotional depth is channelled constructively, Karka natives become remarkable healers, artists, and caregivers.',
  },
  {
    q: 'Which gemstone is recommended for Karka Rashi?',
    icon: Gem,
    color: '#1d4ed8',
    a: (
      <>
        Pearl (Moti) is the classical gemstone for Karka Rashi, worn to strengthen Chandra (the
        Moon). It should be set in silver and worn on the little finger of the right hand on a
        Monday morning after proper mantra invocation. A chart-based consultation with a qualified
        jyotishi at Soul Infinity Astro Solutions is essential before wearing any planetary
        gemstone.
      </>
    ),
    aText:
      'Pearl (Moti) is the classical gemstone for Karka Rashi, worn to strengthen Chandra (the Moon). It should be set in silver and worn on the little finger of the right hand on a Monday morning after proper mantra invocation. A chart-based consultation with a qualified jyotishi at Soul Infinity Astro Solutions is essential before wearing any planetary gemstone.',
  },
  {
    q: 'What are the lucky days and colours for Karka Rashi?',
    icon: Calendar,
    color: '#0f766e',
    a: (
      <>
        Monday is the most auspicious day for Karka Rashi natives, governed by Chandra (the
        Moon). White, silver, and sea green are the lucky colours that resonate with lunar
        energy. Fasting on Mondays, visiting Shiva or Devi temples, and wearing white on
        important days are traditional practices that support Karka natives in channelling Moon
        energy constructively.
      </>
    ),
    aText:
      'Monday is the most auspicious day for Karka Rashi natives, governed by Chandra (the Moon). White, silver, and sea green are the lucky colours that resonate with lunar energy. Fasting on Mondays, visiting Shiva or Devi temples, and wearing white on important days are traditional practices that support Karka natives in channelling Moon energy constructively.',
  },
];

const FAQS: ReadonlyArray<{ question: string; answer: string }> = FAQ_DATA.map((f) => ({
  question: f.q,
  answer: f.aText,
}));

export default function KarkaRashiPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <SEOHead
        title="Karka Rashi (Cancer), Traits, Mantra, Remedies | Soul Infinity"
        description="Karka Rashi (Cancer) in Vedic astrology, ruled by Chandra (Moon). Personality traits, mantra, remedies, characteristics, and houses placement, guided by Saurabh Jain."
        keywords="karka rashi, cancer vedic astrology, chandra, moon, cancer traits, karka mantra, pearl, moti, karka remedies, soul infinity"
        image={HERO_URL}
        type="article"
        omitDefaultSchema
      />
      <SchemaMarkup
        type="webpage"
        webPage={{
          name: 'Karka Rashi (Cancer) in Vedic Astrology',
          description:
            'Karka Rashi, the fourth sign of the Vedic zodiac, ruled by Chandra (Moon). Personality, mantra, remedies, and houses placement.',
          url: '/zodiac/cancer',
        }}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Zodiac Signs', url: '/zodiac' },
          { name: 'Karka (Cancer)', url: '/zodiac/cancer' },
        ]}
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(getFaqPageSchemaFromList(FAQS))}
        </script>
      </Helmet>

      {/* Section 1, Hero. */}
      <div className="relative w-full overflow-hidden bg-gray-900" style={{ height: '420px' }}>
        <img
          src={HERO_URL}
          alt="Karka Rashi hero banner Soul Infinity Astro Solutions"
          className="w-full h-full object-cover"
          width={1600}
          height={420}
          fetchpriority="high"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.55) 100%)' }}
        />
      </div>

      <div className="bg-white">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Zodiac Signs', href: '/zodiac' },
            { label: 'Karka (Cancer)' },
          ]}
        />
      </div>

      <div>
        {/* Section 2, Title strip. */}
        <section className="bg-white pt-2 pb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <p className="text-sm md:text-base tracking-[0.25em] uppercase text-blue-700 font-semibold mb-2">
              <span className="font-devanagari" lang="sa">कर्क राशि</span>
              <span className="mx-2 text-blue-700/60">·</span>
              Cancer
            </p>
            <h1 className="font-heading font-bold text-3xl md:text-5xl text-gray-900 mb-2 leading-tight">
              Karka Rashi, The Nurturer of the Zodiac
            </h1>
            <p className="text-base md:text-lg text-gray-700">
              Ruled by Chandra (Moon)
              <span className="mx-2 text-gray-400">·</span>
              Water Sign
              <span className="mx-2 text-gray-400">·</span>
              The Crab
            </p>
          </div>
        </section>

        {/* Section 3, About Karka. Two-column infographic. */}
        <section className="py-12 px-6" style={{ background: '#f0f9ff' }}>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

              {/* LEFT COLUMN */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-sky-100 text-sky-700">
                    <Moon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="font-heading font-bold text-2xl text-gray-900 leading-tight">
                      Karka Rashi
                    </div>
                    <div className="text-sm text-gray-500 italic">in Vedic Astrology</div>
                  </div>
                </div>

                {/* Card 1, intro */}
                <div className="bg-white p-4 rounded-xl flex gap-3" style={{ border: '1px solid #bae6fd' }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-sky-100 text-sky-700">
                    <Moon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed m-0">
                    Karka (Cancer) is the <strong style={{ color: '#d97706' }}>fourth sign</strong> of
                    the Vedic zodiac, ruled by Chandra (the Moon), the planet of emotions, mind, and
                    nurturing. As a <strong>cardinal water sign</strong>, Karka carries the energy of
                    feeling, the force that receives, protects, and nourishes all that it holds.
                  </p>
                </div>

                {/* Card 2, The Nurturer */}
                <div className="bg-white p-4 rounded-xl flex gap-3" style={{ border: '1px solid #bae6fd' }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-sky-100 text-sky-700">
                    <Heart className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base mb-1" style={{ color: '#0369a1' }}>
                      The Nurturer
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed m-0">
                      In the Brihat Parashara Hora Shastra, Karka is described as a{' '}
                      <strong>gentle sign</strong> of the water element, associated with the deep
                      emotional life and the sacred bond between mother and child.
                    </p>
                  </div>
                </div>

                {/* Card 3, Born to Protect */}
                <div className="bg-white p-4 rounded-xl flex gap-3" style={{ border: '1px solid #bae6fd' }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-slate-900 text-white">
                    <Shield className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base text-gray-900 mb-1">
                      Born to Protect
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed m-0">
                      The Crab retreats into its shell not out of weakness but out of{' '}
                      <strong style={{ color: '#d97706' }}>wisdom</strong>. Karka natives guard
                      what is precious to them with extraordinary devotion.
                    </p>
                  </div>
                </div>

                {/* Card 4, Emotionally Gifted */}
                <div className="bg-white p-4 rounded-xl flex gap-3" style={{ border: '1px solid #bae6fd' }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-sky-100 text-sky-700">
                    <Sparkles className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base mb-1" style={{ color: '#0369a1' }}>
                      Emotionally Gifted
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed m-0">
                      Where Mesha acts and Mithuna speaks, Karka <strong>feels</strong>. Karka
                      natives sense the emotional weather of a room before a word is spoken, and
                      this gift, when mastered, becomes a profound source of wisdom and healing.
                    </p>
                  </div>
                </div>

                {/* Bottom card, Soul Infinity insight */}
                <div className="p-4 rounded-xl flex gap-3" style={{ background: '#e0f2fe', border: '1px solid #7dd3fc' }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-sky-200 text-sky-800">
                    <Star className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base mb-1" style={{ color: '#075985' }}>
                      Soul Infinity Astrologers Insight
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed m-0 italic">
                      At Soul Infinity Astro Solutions, Saurabh Jain observes that Karka
                      ascendants and Moon sign natives often arrive at decisions requiring
                      emotional clarity, and their chart invariably shows the planetary support
                      for nurturing action when the timing aligns with lunar cycles.
                    </p>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="lg:col-span-7 space-y-4">
                <img
                  src={QUICK_FACTS_URL}
                  alt="Karka Rashi Quick Facts Soul Infinity"
                  width={1600}
                  height={800}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
                  }}
                />

                {/* Moon rulership card */}
                <div className="bg-white p-4 rounded-xl" style={{ border: '1px solid #bae6fd' }}>
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-sky-100 text-sky-700">
                      <Moon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading font-bold text-base mb-1" style={{ color: '#0369a1' }}>
                        Ruled by Chandra (Moon)
                      </h3>
                      <p className="text-sm text-gray-700 leading-relaxed m-0">
                        The ruling planet Chandra governs <strong>emotions</strong>,{' '}
                        <strong>mind and memory</strong>, <strong>mother</strong>,{' '}
                        <strong>home</strong>, <strong>water</strong>, and{' '}
                        <strong>nurturing</strong> in Vedic astrology.
                      </p>
                    </div>
                    <div className="hidden md:flex flex-col gap-1.5 text-sky-700/70 pt-1">
                      <Moon className="w-4 h-4" aria-hidden="true" />
                      <Waves className="w-4 h-4" aria-hidden="true" />
                      <Heart className="w-4 h-4" aria-hidden="true" />
                      <Home className="w-4 h-4" aria-hidden="true" />
                      <Droplet className="w-4 h-4" aria-hidden="true" />
                    </div>
                  </div>
                </div>

                {/* Power and Potential card */}
                <div className="bg-white p-4 rounded-xl" style={{ border: '1px solid #bae6fd' }}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                    <div className="md:col-span-2 flex gap-3">
                      <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-teal-100 text-teal-600">
                        <Target className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-base text-gray-900 mb-1">
                          Power and Potential
                        </h3>
                        <p className="text-sm text-gray-700 leading-relaxed m-0">
                          A well-placed Moon in a Karka chart amplifies{' '}
                          <strong style={{ color: '#d97706' }}>empathic intelligence</strong>,
                          creative imagination, and the capacity to nurture enduring family bonds.
                        </p>
                      </div>
                    </div>
                    <div className="rounded-lg p-3" style={{ background: '#f0f9ff', border: '1px solid #7dd3fc' }}>
                      <p className="text-xs leading-relaxed m-0 italic" style={{ color: '#075985' }}>
                        An afflicted Moon can bring moodiness, emotional clinginess, and an
                        excessive attachment to the past.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mahadasha Timing card */}
                <div className="bg-white p-4 rounded-xl flex gap-3" style={{ border: '1px solid #bae6fd' }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-teal-100 text-teal-600">
                    <Clock className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base text-gray-900 mb-1">
                      Mahadasha Timing
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed m-0">
                      Understanding Moon placement, its dignity, aspects, and Mahadasha timing is
                      central to reading a Karka chart accurately.
                    </p>
                  </div>
                </div>

                {/* Vimshottari Dasha card */}
                <div className="bg-white p-5 rounded-xl" style={{ border: '1px solid #bae6fd' }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-sky-100 text-sky-700">
                      <Star className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <h3 className="font-heading font-bold text-lg text-gray-900 m-0">
                      Vimshottari Dasha System
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 leading-relaxed">
                    <p className="m-0">
                      In the Vimshottari Dasha system, Karka natives often experience{' '}
                      <strong style={{ color: '#d97706' }}>ten-year Moon Mahadasha</strong>{' '}
                      cycles that profoundly shape their emotional and family life.
                    </p>
                    <p className="m-0">
                      The sign itself spans the last three padas of <strong>Punarvasu</strong>,
                      all of <strong>Pushya</strong>, and the first three padas of{' '}
                      <strong>Ashlesha</strong> nakshatras.
                    </p>
                  </div>

                  {/* Three nakshatra mini cards */}
                  <div className="grid grid-cols-3 gap-3 mt-4">
                    <div className="text-center p-3 rounded-lg" style={{ background: '#fef3c7', border: '1px solid #fde68a' }}>
                      <div className="w-9 h-9 mx-auto rounded-full flex items-center justify-center mb-2 bg-amber-200 text-amber-700">
                        <Star className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <div className="font-heading font-bold text-sm text-amber-700">Punarvasu</div>
                      <div className="text-xs text-gray-600 mt-1">Renewal and return</div>
                    </div>
                    <div className="text-center p-3 rounded-lg" style={{ background: '#e0f2fe', border: '1px solid #7dd3fc' }}>
                      <div className="w-9 h-9 mx-auto rounded-full flex items-center justify-center mb-2 bg-sky-200 text-sky-700">
                        <Sparkles className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <div className="font-heading font-bold text-sm text-sky-700">Pushya</div>
                      <div className="text-xs text-gray-600 mt-1">Nourishment and care</div>
                    </div>
                    <div className="text-center p-3 rounded-lg" style={{ background: '#dcfce7', border: '1px solid #86efac' }}>
                      <div className="w-9 h-9 mx-auto rounded-full flex items-center justify-center mb-2 bg-green-200 text-green-700">
                        <Compass className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <div className="font-heading font-bold text-sm text-green-700">Ashlesha</div>
                      <div className="text-xs text-gray-600 mt-1">Insight and depth</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      {/* Section 4, Mantra. Full-width parallax bg, dark overlay, centered text. */}
      <section
        className="relative flex items-center"
        style={{
          minHeight: '300px',
          backgroundImage: `url(${MANTRA_BG_URL})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.55)' }} />
        <div className="relative w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center text-white">
          <div
            className="font-devanagari text-amber-300 mb-5 leading-relaxed"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
            lang="sa"
          >
            ॐ सों सोमाय नमः
          </div>
          <div className="text-lg md:text-xl italic text-white mb-3">
            Om Som Somaya Namah
          </div>
          <div className="text-sm md:text-base text-gray-200 mb-6 max-w-xl mx-auto">
            Salutation to Soma (the Moon), the lord of mind and emotions, ruler of Karka Rashi.
          </div>
          <div className="inline-block bg-amber-500 text-gray-900 px-5 py-2 rounded-full text-sm font-semibold shadow-md">
            Chant 108 times
            <span className="mx-2">·</span>
            Monday mornings
          </div>
        </div>
      </section>

      {/* Section 5, Strengths and Challenges. */}
      <section
        className="relative overflow-hidden"
        style={{ background: '#f0f9ff', padding: '64px 24px' }}
      >
        {/* Faint Crab watermark */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            fontSize: '120px',
            opacity: 0.06,
            color: '#0369a1',
            userSelect: 'none',
            lineHeight: 1,
          }}
        >
          ♋
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div
              className="font-heading"
              style={{ fontSize: '32px', fontWeight: 500, color: '#1e3a5f', lineHeight: 1.1 }}
            >
              Characteristics of
            </div>
            <h2
              className="font-heading"
              style={{
                fontSize: '48px',
                fontWeight: 800,
                color: '#0369a1',
                fontStyle: 'italic',
                lineHeight: 1.1,
                marginTop: '4px',
              }}
            >
              Karka Natives
            </h2>

            <div
              className="flex items-center justify-center gap-3 my-5"
              aria-hidden="true"
            >
              <div className="h-px w-24" style={{ background: '#d97706', opacity: 0.5 }} />
              <span style={{ color: '#d97706', fontSize: '16px' }}>♦</span>
              <div className="h-px w-24" style={{ background: '#d97706', opacity: 0.5 }} />
            </div>

            <p
              className="text-gray-600 mx-auto max-w-md"
              style={{ fontSize: '14px' }}
            >
              The tender water within, strengths that nurture legacy and challenges that test resolve.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Strengths card */}
            <div
              className="bg-white overflow-hidden"
              style={{
                borderRadius: '20px',
                boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
              }}
            >
              <div
                className="flex items-center gap-4"
                style={{
                  background: 'linear-gradient(135deg, #075985, #0284c7)',
                  padding: '20px 24px',
                }}
              >
                <div
                  className="bg-white rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ width: '52px', height: '52px' }}
                >
                  <ShieldCheck style={{ color: '#0284c7', width: '28px', height: '28px' }} aria-hidden="true" />
                </div>
                <h3 style={{ color: 'white', fontSize: '24px', fontWeight: 700, margin: 0 }}>
                  Strengths
                </h3>
              </div>

              <div className="bg-white divide-y divide-sky-50">
                {STRENGTH_ROWS.map((row) => {
                  const Icon = row.icon;
                  return (
                    <div
                      key={row.label}
                      className="flex items-center gap-3 hover:bg-sky-50 transition-colors"
                      style={{ padding: '14px 20px' }}
                    >
                      <div
                        className="rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ width: '40px', height: '40px', background: '#f0f9ff' }}
                      >
                        <Icon style={{ color: '#0284c7', width: '20px', height: '20px' }} aria-hidden="true" />
                      </div>
                      <div
                        className="flex-1 font-bold text-gray-800"
                        style={{ fontSize: '15px' }}
                      >
                        {row.label}
                      </div>
                      <span style={{ color: '#bae6fd', fontWeight: 400 }} aria-hidden="true">|</span>
                      <span
                        style={{ color: '#0284c7', fontWeight: 700 }}
                        aria-hidden="true"
                      >
                        ✦
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Challenges card */}
            <div
              className="bg-white overflow-hidden"
              style={{
                borderRadius: '20px',
                boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
              }}
            >
              <div
                className="flex items-center gap-4"
                style={{
                  background: 'linear-gradient(135deg, #78350f, #d97706)',
                  padding: '20px 24px',
                }}
              >
                <div
                  className="bg-white rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ width: '52px', height: '52px' }}
                >
                  <AlertTriangle style={{ color: '#d97706', width: '28px', height: '28px' }} aria-hidden="true" />
                </div>
                <h3 style={{ color: 'white', fontSize: '24px', fontWeight: 700, margin: 0 }}>
                  Challenges
                </h3>
              </div>

              <div className="bg-white divide-y divide-amber-50">
                {CHALLENGE_ROWS.map((row) => {
                  const Icon = row.icon;
                  return (
                    <div
                      key={row.label}
                      className="flex items-center gap-3 hover:bg-amber-50 transition-colors"
                      style={{ padding: '14px 20px' }}
                    >
                      <div
                        className="rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ width: '40px', height: '40px', background: '#fef9c3' }}
                      >
                        <Icon style={{ color: '#d97706', width: '20px', height: '20px' }} aria-hidden="true" />
                      </div>
                      <div
                        className="flex-1 font-bold text-gray-800"
                        style={{ fontSize: '15px' }}
                      >
                        {row.label}
                      </div>
                      <span style={{ color: '#fde68a', fontWeight: 400 }} aria-hidden="true">|</span>
                      <span
                        style={{ color: '#d97706', fontWeight: 700 }}
                        aria-hidden="true"
                      >
                        ✦
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div
            className="flex flex-wrap items-center justify-center"
            style={{ gap: '12px', marginTop: '32px' }}
          >
            <span style={{ color: '#d97706', fontSize: '12px' }} aria-hidden="true">
              ✦ ✦ ✦
            </span>
            <Droplet size={18} color="#0369a1" aria-hidden="true" />
            <p style={{ fontSize: '14px', color: '#374151', margin: 0 }}>
              When guided with awareness, the empathy of Karka becomes a{' '}
              <strong style={{ color: '#d97706' }}>force of healing.</strong>
            </p>
            <span style={{ color: '#d97706', fontSize: '12px' }} aria-hidden="true">
              ✦ ✦ ✦
            </span>
          </div>
        </div>
      </section>

      {/* Section 6, Karka in the 12 Houses. */}
      <section className="py-16 px-6" style={{ background: '#f0f9ff' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div
              className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4"
              style={{ background: '#e0f2fe', color: '#0369a1' }}
            >
              <Target className="w-6 h-6" aria-hidden="true" />
            </div>
            <h2 className="font-heading font-bold text-3xl md:text-5xl mb-3 leading-tight">
              <span style={{ color: '#0369a1' }}>Karka</span>
              <span style={{ color: '#1e3a5f' }}> in the 12 Houses</span>
            </h2>
            <div
              className="text-xs uppercase tracking-[0.25em] font-semibold mb-2"
              style={{ color: '#d97706' }}
            >
              How the Water of Karka Nourishes Each Bhava
            </div>
            <p className="text-sm text-gray-500 max-w-xl mx-auto">
              when the sign occupies each of the twelve bhavas of a Vedic birth chart
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {HOUSE_DATA.map((h) => {
              const Icon = h.icon;
              return (
                <div
                  key={h.num}
                  className="bg-white rounded-2xl p-4"
                  style={{ border: `1px solid ${h.color}4d` }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className="w-7 h-7 rounded-md flex items-center justify-center text-white font-bold text-xs"
                      style={{ background: h.color }}
                    >
                      {h.num}
                    </div>
                    <Icon
                      className="w-6 h-6"
                      style={{ color: h.color }}
                      aria-hidden="true"
                    />
                  </div>
                  <h3
                    className="font-heading font-bold tracking-wider mb-2"
                    style={{ color: h.color, fontSize: '11px', letterSpacing: '0.08em' }}
                  >
                    {h.heading}
                  </h3>
                  <div
                    className="h-px mb-3"
                    style={{ background: h.color, opacity: 0.3 }}
                  />
                  <p
                    className="text-gray-600 leading-snug mb-3"
                    style={{ fontSize: '13px' }}
                  >
                    {h.desc}
                  </p>
                  <div
                    className="font-bold"
                    style={{ color: h.color, fontSize: '12px' }}
                  >
                    <span aria-hidden="true">→</span> {h.arrow}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div
                className="h-px w-10"
                style={{ background: '#d97706', opacity: 0.4 }}
              />
              <Droplet className="w-4 h-4" style={{ color: '#0369a1' }} aria-hidden="true" />
              <div
                className="h-px w-10"
                style={{ background: '#d97706', opacity: 0.4 }}
              />
            </div>
            <p className="text-sm text-gray-700 italic">
              Karka water nourishes every house it enters, bringing{' '}
              <strong style={{ color: '#d97706' }}>empathy, protection</strong> and the warmth of home.
            </p>
          </div>
        </div>
      </section>

      {/* Section 7, Remedies. JSX card grid on dark navy. */}
      <section style={{ background: '#0c1a2e', padding: '64px 24px', position: 'relative' }}>
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            color: '#d97706',
            opacity: 0.4,
            fontSize: '20px',
          }}
        >
          ✦
        </div>
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            color: '#d97706',
            opacity: 0.4,
            fontSize: '20px',
          }}
        >
          ✦
        </div>
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: 20,
            left: 20,
            color: '#d97706',
            opacity: 0.4,
            fontSize: '20px',
          }}
        >
          ✦
        </div>
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: 20,
            right: 20,
            color: '#d97706',
            opacity: 0.4,
            fontSize: '20px',
          }}
        >
          ✦
        </div>

        <div className="max-w-5xl mx-auto relative">
          <div className="text-center mb-10">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-3 leading-tight" style={{ color: 'white' }}>
              Classical Vedic Remedies for Karka Rashi
            </h2>
            <p className="text-base" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Strengthen Chandra and align with Moon energy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { main: 'Chant the Chandra Beej mantra (Om Som Somaya Namah)', sub: '108 times on Monday mornings', highlight: 'Chandra Beej mantra' },
              { main: 'Wear Pearl (Moti) set in silver on the little finger of the right hand', sub: 'only after a chart-based recommendation', highlight: 'Pearl (Moti)' },
              { main: 'Donate white rice, milk, white cloth, or silver', sub: 'on Mondays at a Shiva or Devi temple', highlight: 'white rice, milk, white cloth' },
              { main: 'Recite the Chandra Stotra or Shiva Panchakshara Stotra on Mondays', sub: 'for emotional balance and mental clarity', highlight: 'Chandra Stotra or Shiva Panchakshara Stotra' },
              { main: 'Visit a Shiva temple on Mondays', sub: 'and offer milk, white flowers, and bel leaves', highlight: 'Shiva temple' },
              { main: 'Spend time near water: rivers, lakes, or the sea', sub: 'as a meditative practice that calms the lunar mind', highlight: 'time near water' },
              { main: 'Reduce excessive emotional attachment and rumination', sub: 'during Moon-afflicted periods. Cultivate healthy detachment from the past', highlight: 'excessive emotional attachment' },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-xl p-5"
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(212,175,55,0.3)',
                }}
              >
                <p
                  style={{
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '15px',
                    margin: '0 0 6px',
                    lineHeight: 1.5,
                  }}
                >
                  {item.main.split(item.highlight).map((part, j, arr) => (
                    <span key={j}>
                      {part}
                      {j < arr.length - 1 && (
                        <span style={{ color: '#d97706', fontWeight: 700 }}>{item.highlight}</span>
                      )}
                    </span>
                  ))}
                </p>
                <p
                  style={{
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '13px',
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  <span aria-hidden="true" style={{ marginRight: 4 }}>›</span>
                  {item.sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 8, FAQ accordion. */}
      <section
        className="relative py-16 px-6 overflow-hidden"
        style={{ background: '#f0f9ff' }}
      >
        <div
          className="absolute top-6 left-6 select-none"
          style={{ color: '#f59e0b', opacity: 0.4, fontSize: '20px' }}
          aria-hidden="true"
        >
          ✦
        </div>
        <div
          className="absolute top-6 right-6 select-none"
          style={{ color: '#f59e0b', opacity: 0.4, fontSize: '20px' }}
          aria-hidden="true"
        >
          ✦
        </div>
        <div
          className="absolute bottom-6 left-6 select-none"
          style={{ color: '#f59e0b', opacity: 0.4, fontSize: '20px' }}
          aria-hidden="true"
        >
          ✦
        </div>
        <div
          className="absolute bottom-6 right-6 select-none"
          style={{ color: '#f59e0b', opacity: 0.4, fontSize: '20px' }}
          aria-hidden="true"
        >
          ✦
        </div>

        <div className="relative max-w-3xl mx-auto">
          <div className="text-center mb-2">
            <div
              className="mx-auto rounded-full flex items-center justify-center mb-4"
              style={{
                width: '60px',
                height: '60px',
                border: '2px solid #d97706',
                color: '#d97706',
                fontSize: '28px',
                lineHeight: 1,
              }}
              aria-hidden="true"
            >
              ♋
            </div>
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-3 leading-tight">
              <span style={{ color: '#1e3a5f' }}>Frequently Asked </span>
              <span style={{ color: '#0369a1' }}>Questions</span>
            </h2>
            <p className="text-gray-600 text-base">
              Your top questions about Karka Rashi, answered with clarity
            </p>
          </div>

          <div className="mt-10 space-y-3">
            {FAQ_DATA.map((faq, i) => {
              const isOpen = openFaq === i;
              const Icon = faq.icon;
              return (
                <div
                  key={faq.q}
                  className="bg-white shadow-sm overflow-hidden"
                  style={{
                    borderRadius: '16px',
                    borderLeft: `4px solid ${faq.color}`,
                    marginBottom: '12px',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`karka-faq-${i}`}
                    className="w-full flex items-center gap-3 text-left hover:bg-gray-50 transition-colors"
                    style={{ padding: '18px 20px', cursor: 'pointer' }}
                  >
                    <div
                      className="rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ width: '40px', height: '40px', background: faq.color }}
                    >
                      <Icon className="w-5 h-5 text-white" aria-hidden="true" />
                    </div>
                    <span
                      className="font-heading font-bold flex-1"
                      style={{ fontSize: '15px', color: '#1e3a5f' }}
                    >
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                      style={{ color: faq.color }}
                      aria-hidden="true"
                    />
                  </button>
                  {isOpen && (
                    <div
                      id={`karka-faq-${i}`}
                      style={{
                        padding: '0 20px 20px 76px',
                        fontSize: '14px',
                        lineHeight: 1.8,
                        color: '#374151',
                      }}
                    >
                      {faq.showImage ? (
                        <div className="flex flex-col md:flex-row items-start gap-5">
                          <div className="flex-1">{faq.a}</div>
                          <img
                            src={CARD_URL}
                            alt="Karka Rashi Crab zodiac symbol Soul Infinity"
                            width={120}
                            height={120}
                            loading="lazy"
                            style={{
                              width: '120px',
                              height: '120px',
                              borderRadius: '50%',
                              border: '2px solid #0369a1',
                              flexShrink: 0,
                              objectFit: 'cover',
                            }}
                          />
                        </div>
                      ) : (
                        faq.a
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 9, CTA. */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-cyan-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <img
            src={HERO_URL}
            alt=""
            aria-hidden="true"
            width={1600}
            height={600}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6">
            Want a Personalised Karka Reading?
          </h2>
          <p className="text-xl text-sky-100 mb-8 leading-relaxed">
            Saurabh Jain at Soul Infinity Astro Solutions reads Karka placement in the context of
            your full birth chart, current dasha, and active transits, then translates the reading
            into decisions you can actually act on.
          </p>
          <Link
            to="/contact"
            className="bg-amber-400 hover:bg-amber-300 text-gray-900 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 inline-flex items-center shadow-lg"
          >
            Book a Consultation
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
      </div>
    </>
  );
}
