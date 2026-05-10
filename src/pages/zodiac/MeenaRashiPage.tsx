import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ArrowRight,
  ChevronDown,
  AlertTriangle,
  Sparkles,
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
  ChevronsRight,
  Timer,
  UserX,
  Clock,
  Droplet,
  type LucideIcon,
} from 'lucide-react';
import SEOHead from '../../components/SEOHead';
import SchemaMarkup from '../../components/SchemaMarkup';
import Breadcrumbs from '../../components/Breadcrumbs';
import { getFaqPageSchemaFromList } from '../../data/schema-entities';

const HERO_URL =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Pisces/hero-banner-meena-rashi.webp';
const QUICK_FACTS_URL =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Pisces/quick-facts-meena-rashi.webp';
const MANTRA_BG_URL =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Pisces/mantra-bg-meena-rashi.webp';
const CARD_URL =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Pisces/meena-card.webp';

interface TraitRow {
  icon: LucideIcon;
  label: string;
}

const STRENGTH_ROWS: readonly TraitRow[] = [
  { icon: Sparkles, label: 'Deeply intuitive and psychic' },
  { icon: Heart, label: 'Compassionate and empathetic' },
  { icon: Star, label: 'Creatively gifted' },
  { icon: Compass, label: 'Spiritually inclined' },
  { icon: Globe, label: 'Universally accepting' },
  { icon: Droplet, label: 'Emotionally receptive' },
];

const CHALLENGE_ROWS: readonly TraitRow[] = [
  { icon: ChevronsRight, label: 'Escapist tendencies' },
  { icon: Timer, label: 'Lacks practical boundaries' },
  { icon: UserX, label: 'Over-idealistic' },
  { icon: Clock, label: 'Prone to confusion' },
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
  { num: '01', color: '#0f766e', heading: 'LAGNA (SELF)',          icon: User,       desc: 'Soft, gentle presence, dreamy eyes, compassionate nature, spiritual sensitivity',         arrow: 'Spiritual evolution is the primary life purpose' },
  { num: '02', color: '#d97706', heading: 'WEALTH & SPEECH',       icon: Coins,      desc: 'Gentle and poetic speech, wealth through spiritual work or creative arts',                arrow: 'Generosity and non-attachment shape financial life' },
  { num: '03', color: '#db2777', heading: 'COURAGE & SIBLINGS',    icon: Users,      desc: 'Spiritually sensitive siblings, intuitive and poetic communication style',                arrow: 'Short journeys to sacred sites and places of beauty' },
  { num: '04', color: '#7c3aed', heading: 'HOME & MOTHER',         icon: Home,       desc: 'Spiritual and aesthetically beautiful home, deeply compassionate mother',                 arrow: 'Home as a sanctuary of peace and creative retreat' },
  { num: '05', color: '#db2777', heading: 'CHILDREN & CREATIVITY', icon: Star,       desc: 'Gifted and intuitive children, exceptional creative and artistic abilities',              arrow: 'Spiritually inspired creativity in music and visual arts' },
  { num: '06', color: '#1d4ed8', heading: 'ENEMIES & SERVICE',     icon: Shield,     desc: 'Overcomes challenges through surrender, compassion, and spiritual practice',              arrow: 'Healing, counselling, or spiritual service as vocation' },
  { num: '07', color: '#0f766e', heading: 'MARRIAGE & PARTNERS',   icon: Heart,      desc: 'Devotional and spiritually inclined spouse, transcendent romantic partnerships',          arrow: 'Soul-level partnership and shared spiritual practice' },
  { num: '08', color: '#7c3aed', heading: 'TRANSFORMATION',        icon: Zap,        desc: 'Transformation through spiritual dissolution, mystical experiences, deep surrender',     arrow: 'Access to hidden spiritual knowledge and past life wisdom' },
  { num: '09', color: '#d97706', heading: 'DHARMA & FATHER',       icon: Compass,    desc: 'Spiritually wise and compassionate father, natural house for dharma in Meena',           arrow: 'Dharma expressed through spiritual teaching and compassion' },
  { num: '10', color: '#1d4ed8', heading: 'CAREER & STATUS',       icon: TrendingUp, desc: 'Career in healing, spiritual counselling, arts, music, or social service',               arrow: 'Recognition through compassion and inspired service' },
  { num: '11', color: '#0f766e', heading: 'GAINS & FRIENDS',       icon: Users,      desc: 'Spiritually attuned and artistic friends, gains through compassion and creativity',       arrow: 'Financial flow through giving rather than acquiring' },
  { num: '12', color: '#0f766e', heading: 'LIBERATION & FOREIGN',  icon: Globe,      desc: 'Natural house for Meena, exceptional capacity for spiritual liberation',                  arrow: 'Moksha through complete surrender to the divine' },
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
    q: 'What is Meena Rashi in Vedic astrology?',
    icon: HelpCircle,
    color: '#0f766e',
    showImage: true,
    a: (
      <>
        Meena Rashi (Pisces) is the twelfth and final sign of the Vedic sidereal zodiac, spanning
        330 to 360 degrees. It is a <strong style={{ color: '#d97706' }}>mutable water sign</strong>{' '}
        ruled by <strong style={{ color: '#d97706' }}>Guru (Jupiter)</strong>. Natives with the Moon
        in Meena are known for their deep intuition, compassion, and a spiritual sensitivity that
        gives them access to dimensions of experience beyond the ordinary.
      </>
    ),
    aText:
      'Meena Rashi (Pisces) is the twelfth and final sign of the Vedic sidereal zodiac, spanning 330 to 360 degrees. It is a mutable water sign ruled by Guru (Jupiter). Natives with the Moon in Meena are known for their deep intuition, compassion, and a spiritual sensitivity that gives them access to dimensions of experience beyond the ordinary.',
  },
  {
    q: 'Who is the ruling planet of Meena Rashi?',
    icon: Globe,
    color: '#d97706',
    a: (
      <>
        Guru (Jupiter) is the ruling planet of Meena Rashi. In Meena, Jupiter expresses its water
        quality: compassionate, all-encompassing, and spiritually expansive. Jupiter governs wisdom,
        dharma, spiritual teaching, and liberation. Strong Jupiter in Meena produces healers,
        mystics, artists, and those who serve others through compassion.
      </>
    ),
    aText:
      'Guru (Jupiter) is the ruling planet of Meena Rashi. In Meena, Jupiter expresses its water quality: compassionate, all-encompassing, and spiritually expansive. Jupiter governs wisdom, dharma, spiritual teaching, and liberation. Strong Jupiter in Meena produces healers, mystics, artists, and those who serve others through compassion.',
  },
  {
    q: 'What are the personality traits of Meena Rashi natives?',
    icon: User,
    color: '#7c3aed',
    a: (
      <>
        Meena natives are deeply compassionate, intuitive, and spiritually gifted. They are natural
        healers and artists who feel the world more deeply than most. Their challenges include
        escapism, poor boundaries, and difficulty distinguishing their own feelings from those of
        others. When grounded through spiritual practice, Meena energy is profoundly healing.
      </>
    ),
    aText:
      'Meena natives are deeply compassionate, intuitive, and spiritually gifted. They are natural healers and artists who feel the world more deeply than most. Their challenges include escapism, poor boundaries, and difficulty distinguishing their own feelings from those of others. When grounded through spiritual practice, Meena energy is profoundly healing.',
  },
  {
    q: 'Which gemstone is recommended for Meena Rashi?',
    icon: Gem,
    color: '#1d4ed8',
    a: (
      <>
        Yellow Sapphire (Pukhraj) is the classical gemstone for Meena Rashi, worn to strengthen Guru
        (Jupiter). It should be set in gold and worn on the index finger of the right hand on a
        Thursday morning after proper mantra invocation. A chart-based consultation with Soul
        Infinity Astro Solutions is essential before wearing any planetary gemstone.
      </>
    ),
    aText:
      'Yellow Sapphire (Pukhraj) is the classical gemstone for Meena Rashi, worn to strengthen Guru (Jupiter). It should be set in gold and worn on the index finger of the right hand on a Thursday morning after proper mantra invocation. A chart-based consultation with Soul Infinity Astro Solutions is essential before wearing any planetary gemstone.',
  },
  {
    q: 'What are the lucky days and colours for Meena Rashi?',
    icon: Calendar,
    color: '#0f766e',
    a: (
      <>
        Thursday is the most auspicious day for Meena Rashi natives. Sea green, aquamarine, and
        violet are the lucky colours. Fasting on Thursdays, visiting Vishnu temples, meditating near
        water, and wearing light green or violet on important occasions support Meena natives in
        channelling Jupiter&apos;s compassionate wisdom.
      </>
    ),
    aText:
      "Thursday is the most auspicious day for Meena Rashi natives. Sea green, aquamarine, and violet are the lucky colours. Fasting on Thursdays, visiting Vishnu temples, meditating near water, and wearing light green or violet on important occasions support Meena natives in channelling Jupiter's compassionate wisdom.",
  },
];

const FAQS: ReadonlyArray<{ question: string; answer: string }> = FAQ_DATA.map((f) => ({
  question: f.q,
  answer: f.aText,
}));

export default function MeenaRashiPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <SEOHead
        title="Meena Rashi (Pisces), Traits, Mantra, Remedies | Soul Infinity"
        description="Meena Rashi (Pisces) in Vedic astrology, ruled by Guru (Jupiter). Personality traits, mantra, remedies, and houses placement, guided by Saurabh Jain."
        keywords="meena rashi, pisces vedic astrology, guru, jupiter, pisces traits, meena mantra, yellow sapphire, pukhraj, meena remedies, soul infinity"
        image={HERO_URL}
        type="article"
        omitDefaultSchema
      />
      <SchemaMarkup
        type="webpage"
        webPage={{
          name: 'Meena Rashi (Pisces) in Vedic Astrology',
          description:
            'Meena Rashi, the twelfth and final sign of the Vedic zodiac, ruled by Guru (Jupiter). Personality, mantra, remedies, and houses placement.',
          url: '/zodiac/pisces',
        }}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Zodiac Signs', url: '/zodiac' },
          { name: 'Meena (Pisces)', url: '/zodiac/pisces' },
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
          alt="Meena Rashi hero banner Soul Infinity Astro Solutions"
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
            { label: 'Meena (Pisces)' },
          ]}
        />
      </div>

      <div>
        {/* Section 2, Title strip. */}
        <section className="bg-white pt-2 pb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <p className="text-sm md:text-base tracking-[0.25em] uppercase text-teal-700 font-semibold mb-2">
              <span className="font-devanagari" lang="sa">मीन राशि</span>
              <span className="mx-2 text-teal-700/60">·</span>
              Pisces
            </p>
            <h1 className="font-heading font-bold text-3xl md:text-5xl text-gray-900 mb-2 leading-tight">
              Meena Rashi, The Mystic of the Zodiac
            </h1>
            <p className="text-base md:text-lg text-gray-700">
              Ruled by Guru (Jupiter)
              <span className="mx-2 text-gray-400">·</span>
              Water Sign
              <span className="mx-2 text-gray-400">·</span>
              The Fish
            </p>
          </div>
        </section>

        {/* Section 3, About Meena. Two-column infographic. */}
        <section className="py-12 px-6" style={{ background: '#f0fdf9' }}>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

              {/* LEFT COLUMN */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-teal-100 text-teal-700">
                    <Droplet className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="font-heading font-bold text-2xl text-gray-900 leading-tight">
                      Meena Rashi
                    </div>
                    <div className="text-sm text-gray-500 italic">in Vedic Astrology</div>
                  </div>
                </div>

                {/* Card 1, intro */}
                <div className="bg-white p-4 rounded-xl flex gap-3" style={{ border: '1px solid #99f6e4' }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-teal-100 text-teal-700">
                    <Droplet className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed m-0">
                    Meena (Pisces) is the <strong style={{ color: '#d97706' }}>twelfth and final sign</strong>{' '}
                    of the Vedic zodiac, ruled by Guru (Jupiter). As a{' '}
                    <strong>mutable water sign</strong>, Meena dissolves all boundaries, merging
                    Jupiter&apos;s wisdom with water&apos;s infinite depth to create the most
                    spiritually receptive and compassionate sign in the zodiac.
                  </p>
                </div>

                {/* Card 2, The Mystic */}
                <div className="bg-white p-4 rounded-xl flex gap-3" style={{ border: '1px solid #99f6e4' }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-teal-100 text-teal-700">
                    <Sparkles className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base mb-1" style={{ color: '#0f766e' }}>
                      The Mystic
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed m-0">
                      In the Brihat Parashara Hora Shastra, Meena is described as a{' '}
                      <strong>mutable water sign</strong> of Brahmin nature, associated with the
                      dissolution of ego, spiritual liberation, and the ocean of universal
                      consciousness.
                    </p>
                  </div>
                </div>

                {/* Card 3, The Dreamer */}
                <div className="bg-white p-4 rounded-xl flex gap-3" style={{ border: '1px solid #99f6e4' }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-slate-900 text-white">
                    <Star className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base text-gray-900 mb-1">
                      The Dreamer
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed m-0">
                      The Fish swims in two directions simultaneously. Meena natives live at the
                      boundary between the visible and invisible worlds, carrying within them an{' '}
                      <strong style={{ color: '#d97706' }}>intuitive wisdom</strong> that transcends
                      rational explanation.
                    </p>
                  </div>
                </div>

                {/* Card 4, Born to Transcend */}
                <div className="bg-white p-4 rounded-xl flex gap-3" style={{ border: '1px solid #99f6e4' }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-teal-100 text-teal-700">
                    <Compass className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base mb-1" style={{ color: '#0f766e' }}>
                      Born to Transcend
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed m-0">
                      Where Kumbha serves humanity through reform, Meena serves through{' '}
                      <strong>surrender</strong>. The final sign contains within it the accumulated
                      wisdom of all eleven signs that preceded it, and its deepest purpose is the
                      return to the source.
                    </p>
                  </div>
                </div>

                {/* Bottom card, Soul Infinity insight */}
                <div className="p-4 rounded-xl flex gap-3" style={{ background: '#ccfbf1', border: '1px solid #5eead4' }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-teal-200 text-teal-800">
                    <Star className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base mb-1" style={{ color: '#115e59' }}>
                      Soul Infinity Astrologers Insight
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed m-0 italic">
                      At Soul Infinity Astro Solutions, Saurabh Jain observes that Meena ascendants
                      and Moon sign natives flourish when their natural sensitivity is paired with
                      a grounded spiritual practice, allowing Jupiter&apos;s wisdom to flow without
                      being overwhelmed by external currents.
                    </p>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="lg:col-span-7 space-y-4">
                <img
                  src={QUICK_FACTS_URL}
                  alt="Meena Rashi Quick Facts Soul Infinity"
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

                {/* Jupiter rulership card */}
                <div className="bg-white p-4 rounded-xl" style={{ border: '1px solid #99f6e4' }}>
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-teal-100 text-teal-700">
                      <Sparkles className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading font-bold text-base mb-1" style={{ color: '#0f766e' }}>
                        Ruled by Guru (Jupiter)
                      </h3>
                      <p className="text-sm text-gray-700 leading-relaxed m-0">
                        The ruling planet Guru governs <strong>wisdom</strong>,{' '}
                        <strong>dharma and devotion</strong>, <strong>spiritual teaching</strong>,{' '}
                        <strong>compassion</strong>, <strong>healing</strong>, and{' '}
                        <strong>liberation</strong> in Vedic astrology.
                      </p>
                    </div>
                    <div className="hidden md:flex flex-col gap-1.5 text-teal-700/70 pt-1">
                      <Sparkles className="w-4 h-4" aria-hidden="true" />
                      <Heart className="w-4 h-4" aria-hidden="true" />
                      <Compass className="w-4 h-4" aria-hidden="true" />
                      <Globe className="w-4 h-4" aria-hidden="true" />
                      <Droplet className="w-4 h-4" aria-hidden="true" />
                    </div>
                  </div>
                </div>

                {/* Power and Potential card */}
                <div className="bg-white p-4 rounded-xl" style={{ border: '1px solid #99f6e4' }}>
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
                          A well-placed Jupiter in a Meena chart amplifies{' '}
                          <strong style={{ color: '#d97706' }}>spiritual insight</strong>,
                          compassionate service, and the capacity for inspired creativity and
                          healing presence.
                        </p>
                      </div>
                    </div>
                    <div className="rounded-lg p-3" style={{ background: '#f0fdf9', border: '1px solid #5eead4' }}>
                      <p className="text-xs leading-relaxed m-0 italic" style={{ color: '#115e59' }}>
                        An afflicted Jupiter can bring escapism, confusion, and a tendency to lose
                        oneself in the suffering of others.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mahadasha Timing card */}
                <div className="bg-white p-4 rounded-xl flex gap-3" style={{ border: '1px solid #99f6e4' }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-teal-100 text-teal-600">
                    <Clock className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base text-gray-900 mb-1">
                      Mahadasha Timing
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed m-0">
                      Understanding Jupiter placement, its dignity, aspects, and Mahadasha timing is
                      central to reading a Meena chart accurately.
                    </p>
                  </div>
                </div>

                {/* Vimshottari Dasha card */}
                <div className="bg-white p-5 rounded-xl" style={{ border: '1px solid #99f6e4' }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-teal-100 text-teal-700">
                      <Star className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <h3 className="font-heading font-bold text-lg text-gray-900 m-0">
                      Vimshottari Dasha System
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 leading-relaxed">
                    <p className="m-0">
                      In the Vimshottari Dasha system, Meena natives often experience{' '}
                      <strong style={{ color: '#d97706' }}>sixteen-year Jupiter Mahadasha</strong>{' '}
                      cycles that profoundly shape their spiritual and creative life.
                    </p>
                    <p className="m-0">
                      The sign itself spans the last pada of <strong>Purva Bhadrapada</strong>, all
                      of <strong>Uttara Bhadrapada</strong>, and the whole of{' '}
                      <strong>Revati</strong> nakshatras.
                    </p>
                  </div>

                  {/* Three nakshatra mini cards */}
                  <div className="grid grid-cols-3 gap-3 mt-4">
                    <div className="text-center p-3 rounded-lg" style={{ background: '#fef3c7', border: '1px solid #fde68a' }}>
                      <div className="w-9 h-9 mx-auto rounded-full flex items-center justify-center mb-2 bg-amber-200 text-amber-700">
                        <Sparkles className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <div className="font-heading font-bold text-sm text-amber-700">Purva Bhadrapada</div>
                      <div className="text-xs text-gray-600 mt-1">Transformative fire</div>
                    </div>
                    <div className="text-center p-3 rounded-lg" style={{ background: '#ccfbf1', border: '1px solid #5eead4' }}>
                      <div className="w-9 h-9 mx-auto rounded-full flex items-center justify-center mb-2 bg-teal-200 text-teal-700">
                        <Compass className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <div className="font-heading font-bold text-sm text-teal-700">Uttara Bhadrapada</div>
                      <div className="text-xs text-gray-600 mt-1">Deep wisdom</div>
                    </div>
                    <div className="text-center p-3 rounded-lg" style={{ background: '#dbeafe', border: '1px solid #bfdbfe' }}>
                      <div className="w-9 h-9 mx-auto rounded-full flex items-center justify-center mb-2 bg-blue-200 text-blue-700">
                        <Droplet className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <div className="font-heading font-bold text-sm text-blue-700">Revati</div>
                      <div className="text-xs text-gray-600 mt-1">Safe passage home</div>
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
            ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः
          </div>
          <div className="text-lg md:text-xl italic text-white mb-3">
            Om Graam Greem Graum Sah Gurave Namah
          </div>
          <div className="text-sm md:text-base text-gray-200 mb-6 max-w-xl mx-auto">
            Salutation to Guru (Jupiter), the great teacher of the gods, lord of wisdom and
            liberation, ruler of Meena Rashi.
          </div>
          <div className="inline-block bg-amber-500 text-gray-900 px-5 py-2 rounded-full text-sm font-semibold shadow-md">
            Chant 108 times
            <span className="mx-2">·</span>
            Thursday mornings
          </div>
        </div>
      </section>

      {/* Section 5, Strengths and Challenges. */}
      <section
        className="relative overflow-hidden"
        style={{ background: '#f0fdf9', padding: '64px 24px' }}
      >
        {/* Faint Fish watermark */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            fontSize: '120px',
            opacity: 0.06,
            color: '#0f766e',
            userSelect: 'none',
            lineHeight: 1,
          }}
        >
          ♓
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
                color: '#0f766e',
                fontStyle: 'italic',
                lineHeight: 1.1,
                marginTop: '4px',
              }}
            >
              Meena Natives
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
              The infinite ocean within, gifts that heal the world and currents that pull toward
              dissolution.
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
                  background: 'linear-gradient(135deg, #134e4a, #0f766e)',
                  padding: '20px 24px',
                }}
              >
                <div
                  className="bg-white rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ width: '52px', height: '52px' }}
                >
                  <ShieldCheck style={{ color: '#0f766e', width: '28px', height: '28px' }} aria-hidden="true" />
                </div>
                <h3 style={{ color: 'white', fontSize: '24px', fontWeight: 700, margin: 0 }}>
                  Strengths
                </h3>
              </div>

              <div className="bg-white divide-y divide-teal-50">
                {STRENGTH_ROWS.map((row) => {
                  const Icon = row.icon;
                  return (
                    <div
                      key={row.label}
                      className="flex items-center gap-3 hover:bg-teal-50 transition-colors"
                      style={{ padding: '14px 20px' }}
                    >
                      <div
                        className="rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ width: '40px', height: '40px', background: '#f0fdf9' }}
                      >
                        <Icon style={{ color: '#0f766e', width: '20px', height: '20px' }} aria-hidden="true" />
                      </div>
                      <div
                        className="flex-1 font-bold text-gray-800"
                        style={{ fontSize: '15px' }}
                      >
                        {row.label}
                      </div>
                      <span style={{ color: '#ccfbf1', fontWeight: 400 }} aria-hidden="true">|</span>
                      <span
                        style={{ color: '#0f766e', fontWeight: 700 }}
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
            <Droplet size={18} color="#0f766e" aria-hidden="true" />
            <p style={{ fontSize: '14px', color: '#374151', margin: 0 }}>
              When guided with awareness, the boundless compassion of Meena becomes a{' '}
              <strong style={{ color: '#d97706' }}>vessel of liberation.</strong>
            </p>
            <span style={{ color: '#d97706', fontSize: '12px' }} aria-hidden="true">
              ✦ ✦ ✦
            </span>
          </div>
        </div>
      </section>

      {/* Section 6, Meena in the 12 Houses. */}
      <section className="py-16 px-6" style={{ background: '#f0fdf9' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div
              className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4"
              style={{ background: '#ccfbf1', color: '#0f766e' }}
            >
              <Target className="w-6 h-6" aria-hidden="true" />
            </div>
            <h2 className="font-heading font-bold text-3xl md:text-5xl mb-3 leading-tight">
              <span style={{ color: '#0f766e' }}>Meena</span>
              <span style={{ color: '#1e3a5f' }}> in the 12 Houses</span>
            </h2>
            <div
              className="text-xs uppercase tracking-[0.25em] font-semibold mb-2"
              style={{ color: '#d97706' }}
            >
              How the Water of Meena Flows Through Each Bhava
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
              <Droplet className="w-4 h-4" style={{ color: '#0f766e' }} aria-hidden="true" />
              <div
                className="h-px w-10"
                style={{ background: '#d97706', opacity: 0.4 }}
              />
            </div>
            <p className="text-sm text-gray-700 italic">
              Meena water dissolves every boundary it touches, bringing{' '}
              <strong style={{ color: '#d97706' }}>compassion, intuition</strong> and the mystic&apos;s path to liberation.
            </p>
          </div>
        </div>
      </section>

      {/* Section 7, Remedies. JSX card grid on dark teal. */}
      <section style={{ background: '#030f0d', padding: '64px 24px', position: 'relative' }}>
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
              Classical Vedic Remedies for Meena Rashi
            </h2>
            <p className="text-base" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Strengthen Guru and align with Jupiter energy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { main: 'Chant the Guru Beej mantra (Om Graam Greem Graum Sah Gurave Namah)', sub: '108 times on Thursday mornings', highlight: 'Guru Beej mantra' },
              { main: 'Wear Yellow Sapphire (Pukhraj) set in gold', sub: 'on the index finger, only after a chart-based recommendation', highlight: 'Yellow Sapphire (Pukhraj)' },
              { main: 'Donate yellow sweets, yellow cloth, turmeric, or books on Thursdays', sub: 'at a Vishnu or Guru temple', highlight: 'yellow sweets, yellow cloth' },
              { main: 'Recite the Guru Stotra or Vishnu Sahasranama on Thursdays', sub: 'for spiritual clarity, compassion, and protection', highlight: 'Guru Stotra or Vishnu Sahasranama' },
              { main: 'Visit a Vishnu or Saraswati temple on Thursdays', sub: 'and offer yellow flowers, bananas, and turmeric water', highlight: 'Vishnu or Saraswati temple' },
              { main: 'Engage in daily meditation, prayer, creative arts, or healing practice', sub: 'as Meena natives require spiritual practice to remain grounded', highlight: 'meditation, prayer, creative arts' },
              { main: 'Avoid escapism, excessive idealism, and self-sacrifice without boundaries', sub: 'during Jupiter-afflicted periods. Cultivate healthy boundaries alongside compassion', highlight: 'Avoid escapism, excessive idealism' },
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
        style={{ background: '#f0fdf9' }}
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
              ♓
            </div>
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-3 leading-tight">
              <span style={{ color: '#1e3a5f' }}>Frequently Asked </span>
              <span style={{ color: '#0f766e' }}>Questions</span>
            </h2>
            <p className="text-gray-600 text-base">
              Your top questions about Meena Rashi, answered with clarity
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
                    aria-controls={`meena-faq-${i}`}
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
                      id={`meena-faq-${i}`}
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
                            alt="Meena Rashi Fish zodiac symbol Soul Infinity"
                            width={120}
                            height={120}
                            loading="lazy"
                            style={{
                              width: '120px',
                              height: '120px',
                              borderRadius: '50%',
                              border: '2px solid #0f766e',
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
      <section className="py-20 bg-gradient-to-r from-teal-900 to-emerald-900 text-white relative overflow-hidden">
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
            Want a Personalised Meena Reading?
          </h2>
          <p className="text-xl text-teal-100 mb-8 leading-relaxed">
            Saurabh Jain at Soul Infinity Astro Solutions reads Meena placement in the context of
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
