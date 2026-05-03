import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ArrowRight,
  ChevronDown,
  CheckCircle,
  AlertTriangle,
  Flame,
  Sword,
  Mountain,
  Users,
  Target,
  Clock,
  Star,
  Sparkles,
  Droplet,
  Bone,
  Activity,
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
  Crown,
  ChevronsRight,
  Timer,
  UserX,
  Link as LinkIcon,
  type LucideIcon,
} from 'lucide-react';
import SEOHead from '../../components/SEOHead';
import SchemaMarkup from '../../components/SchemaMarkup';
import Breadcrumbs from '../../components/Breadcrumbs';
import { getFaqPageSchemaFromList } from '../../data/schema-entities';

const HERO_URL =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Aries/hero-banner-mesh-rashi.webp';
const QUICK_FACTS_URL =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Aries/quick-facets-mesh-rashi.webp';
const MANTRA_BG_URL =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Aries/mantra-bg-mesh-rashi.webp';
const CARD_URL =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Aries/aries-card.webp';
const REMEDIES_BG_URL =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Aries/Vedic-Remedies-bg.webp';

interface TraitRow {
  icon: LucideIcon;
  label: string;
}

const STRENGTH_ROWS: readonly TraitRow[] = [
  { icon: Mountain, label: 'Courageous' },
  { icon: Crown, label: 'Natural leader' },
  { icon: Zap, label: 'Energetic' },
  { icon: Heart, label: 'Passionate' },
  { icon: ShieldCheck, label: 'Honest' },
  { icon: LinkIcon, label: 'Independent' },
];

const CHALLENGE_ROWS: readonly TraitRow[] = [
  { icon: ChevronsRight, label: 'Impulsive' },
  { icon: Clock, label: 'Short-tempered' },
  { icon: Timer, label: 'Impatient' },
  { icon: UserX, label: 'Overconfident' },
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
  { num: '01', color: '#dc2626', heading: 'LAGNA (SELF)',           icon: User,       desc: 'Strong personality, athletic build, fiery temperament',                        arrow: 'Natural leadership instincts from a young age' },
  { num: '02', color: '#d97706', heading: 'WEALTH & SPEECH',        icon: Coins,      desc: 'Frank speech, bold financial decisions, family with strong opinions',         arrow: 'Wealth earned through effort' },
  { num: '03', color: '#db2777', heading: 'COURAGE & SIBLINGS',     icon: Users,      desc: 'Bold communication style, courage in expression, energetic siblings',         arrow: 'Strong drive in short journeys' },
  { num: '04', color: '#7c3aed', heading: 'HOME & MOTHER',          icon: Home,       desc: 'Restless home life, mother with strong will, property gained through effort', arrow: 'Ambition drives property acquisition' },
  { num: '05', color: '#db2777', heading: 'CHILDREN & CREATIVITY',  icon: Star,       desc: 'Passionate creativity, athletic children, bold romance',                       arrow: 'Fiery intelligence applied to art and learning' },
  { num: '06', color: '#1d4ed8', heading: 'ENEMIES & SERVICE',      icon: Shield,     desc: 'Wins over enemies through direct force',                                       arrow: 'Surgical, military, or athletic careers favoured' },
  { num: '07', color: '#0f766e', heading: 'MARRIAGE & PARTNERS',    icon: Heart,      desc: 'Dynamic spouse, marriage that sparks growth and challenge',                    arrow: 'Bold business partnerships' },
  { num: '08', color: '#7c3aed', heading: 'TRANSFORMATION',         icon: Zap,        desc: 'Intense transformations, surgical interventions, sudden life changes',        arrow: 'Research into hidden subjects' },
  { num: '09', color: '#d97706', heading: 'DHARMA & FATHER',        icon: Compass,    desc: 'Bold faith, athletic or principled father, pilgrimages undertaken intensely', arrow: 'With intensity and conviction' },
  { num: '10', color: '#1d4ed8', heading: 'CAREER & STATUS',        icon: TrendingUp, desc: 'Career in military, sports, engineering, or leadership',                       arrow: 'Recognition through decisive action' },
  { num: '11', color: '#15803d', heading: 'GAINS & FRIENDS',        icon: Users,      desc: 'Friends in athletic or competitive circles',                                   arrow: 'Gains through bold action and entrepreneurial ventures' },
  { num: '12', color: '#0f766e', heading: 'LIBERATION & FOREIGN',   icon: Globe,      desc: 'Spiritual warrior, hidden adversaries, foreign travel for purposeful work',   arrow: 'Pilgrimage with a higher mission' },
];

interface FaqItem {
  q: string;
  /** JSX answer body, may include highlighted spans. */
  a: ReactNode;
  /** Plain-text mirror of the answer for FAQPage JSON-LD (Google policy). */
  aText: string;
  icon: LucideIcon;
  color: string;
  showImage?: boolean;
}

const FAQ_DATA: readonly FaqItem[] = [
  {
    q: 'What is Mesha Rashi in Vedic astrology?',
    icon: HelpCircle,
    color: '#dc2626',
    showImage: true,
    a: (
      <>
        Mesha Rashi (Aries) is the first sign of the Vedic sidereal zodiac, spanning 0 to 30
        degrees. It is a <strong style={{ color: '#d97706' }}>cardinal fire sign</strong> ruled by{' '}
        <strong style={{ color: '#d97706' }}>Mangala (Mars)</strong>, and represents initiative,
        courage, leadership, and the spark that begins every venture. Natives with the Moon in
        Mesha Rashi are known as Mesh Rashi people.
      </>
    ),
    aText:
      'Mesha Rashi (Aries) is the first sign of the Vedic sidereal zodiac, spanning 0 to 30 degrees. It is a cardinal fire sign ruled by Mangala (Mars), and represents initiative, courage, leadership, and the spark that begins every venture. Natives with the Moon in Mesha Rashi are known as Mesh Rashi people.',
  },
  {
    q: 'Who is the ruling planet of Mesha Rashi?',
    icon: Globe,
    color: '#d97706',
    a: (
      <>
        Mangala (Mars) is the ruling planet of Mesha Rashi. Mars governs energy, courage, physical
        strength, blood, bone marrow, younger siblings, land, and real estate. A strong Mars in
        the chart amplifies leadership and drive. A weak or afflicted Mars can cause
        impulsiveness, accidents, or inflammatory conditions.
      </>
    ),
    aText:
      'Mangala (Mars) is the ruling planet of Mesha Rashi. Mars governs energy, courage, physical strength, blood, bone marrow, younger siblings, land, and real estate. A strong Mars in the chart amplifies leadership and drive. A weak or afflicted Mars can cause impulsiveness, accidents, or inflammatory conditions.',
  },
  {
    q: 'What are the personality traits of Mesha Rashi natives?',
    icon: User,
    color: '#7c3aed',
    a: (
      <>
        Mesha natives are courageous, energetic, and fiercely independent. They are natural
        leaders who act on instinct, speak directly, and pursue goals with relentless passion.
        Their challenges include impatience, a short temper, and a tendency to start projects
        without completing them. When channelled constructively, Mesha energy is unstoppable.
      </>
    ),
    aText:
      'Mesha natives are courageous, energetic, and fiercely independent. They are natural leaders who act on instinct, speak directly, and pursue goals with relentless passion. Their challenges include impatience, a short temper, and a tendency to start projects without completing them. When channelled constructively, Mesha energy is unstoppable.',
  },
  {
    q: 'Which gemstone is recommended for Mesha Rashi?',
    icon: Gem,
    color: '#1d4ed8',
    a: (
      <>
        Red Coral (Moonga) is the classical gemstone for Mesha Rashi, worn to strengthen Mangala
        (Mars). It should be set in copper or gold and worn on the ring finger of the right hand
        on a Tuesday morning after proper mantra invocation. A chart-based consultation with a
        qualified jyotishi at Soul Infinity Astro Solutions is essential before wearing any
        planetary gemstone.
      </>
    ),
    aText:
      'Red Coral (Moonga) is the classical gemstone for Mesha Rashi, worn to strengthen Mangala (Mars). It should be set in copper or gold and worn on the ring finger of the right hand on a Tuesday morning after proper mantra invocation. A chart-based consultation with a qualified jyotishi at Soul Infinity Astro Solutions is essential before wearing any planetary gemstone.',
  },
  {
    q: 'What are the lucky days and colours for Mesha Rashi?',
    icon: Calendar,
    color: '#0f766e',
    a: (
      <>
        Tuesday is the most auspicious day for Mesha Rashi natives, governed by Mangala (Mars).
        Red, coral, and orange are the lucky colours that resonate with Mars energy. Fasting on
        Tuesdays, visiting Hanuman temples, and wearing red on important days are traditional
        practices that support Mesha natives in channelling Mars energy constructively.
      </>
    ),
    aText:
      'Tuesday is the most auspicious day for Mesha Rashi natives, governed by Mangala (Mars). Red, coral, and orange are the lucky colours that resonate with Mars energy. Fasting on Tuesdays, visiting Hanuman temples, and wearing red on important days are traditional practices that support Mesha natives in channelling Mars energy constructively.',
  },
];

/** Plain-text mirror used by FAQPage JSON-LD (must match visible text). */
const FAQS: ReadonlyArray<{ question: string; answer: string }> = FAQ_DATA.map((f) => ({
  question: f.q,
  answer: f.aText,
}));

export default function MeshaRashiPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <SEOHead
        title="Mesha Rashi (Aries), Traits, Mantra, Remedies | Soul Infinity"
        description="Mesha Rashi (Aries) in Vedic astrology, ruled by Mangala (Mars). Personality traits, mantra, remedies, characteristics, and houses placement, guided by Saurabh Jain."
        keywords="mesha rashi, aries vedic astrology, mangala, mars, aries traits, mesha mantra, red coral, moonga, mesh rashi remedies, soul infinity"
        image={HERO_URL}
        type="article"
        omitDefaultSchema
      />
      <SchemaMarkup
        type="webpage"
        webPage={{
          name: 'Mesha Rashi (Aries) in Vedic Astrology',
          description:
            'Mesha Rashi, the first sign of the Vedic zodiac, ruled by Mangala (Mars). Personality, mantra, remedies, and houses placement.',
          url: '/zodiac/aries',
        }}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Zodiac Signs', url: '/zodiac' },
          { name: 'Mesha (Aries)', url: '/zodiac/aries' },
        ]}
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(getFaqPageSchemaFromList(FAQS))}
        </script>
      </Helmet>

      {/* Section 1, Hero. Banner image with gradient overlay only, nothing
          floating on it. */}
      <div className="relative w-full overflow-hidden bg-gray-900" style={{ height: '420px' }}>
        <img
          src={HERO_URL}
          alt="Mesha Rashi hero banner Soul Infinity Astro Solutions"
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
            { label: 'Mesha (Aries)' },
          ]}
        />
      </div>

      {/* Main content. The H1 title strip lives at the very top so the page
          retains exactly one H1 (the hero is now purely visual). */}
      <div>
        {/* Page title strip, replaces the H1 that was previously inside the hero */}
        <section className="bg-white pt-2 pb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <p className="text-sm md:text-base tracking-[0.25em] uppercase text-amber-600 font-semibold mb-2">
              <span className="font-devanagari" lang="sa">मेष राशि</span>
              <span className="mx-2 text-amber-600/60">·</span>
              Aries
            </p>
            <h1 className="font-heading font-bold text-3xl md:text-5xl text-gray-900 mb-2 leading-tight">
              Mesha Rashi, The Pioneer of the Zodiac
            </h1>
            <p className="text-base md:text-lg text-gray-700">
              Ruled by Mangala (Mars)
              <span className="mx-2 text-gray-400">·</span>
              Fire Sign
              <span className="mx-2 text-gray-400">·</span>
              The Ram
            </p>
          </div>
        </section>

        {/* Section 3, About Mesha. Two-column infographic layout. */}
        <section className="py-12 px-6" style={{ background: '#fdf6f0' }}>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

              {/* LEFT COLUMN, 45% on lg+ */}
              <div className="lg:col-span-5 space-y-4">
                {/* Section header */}
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-amber-100 text-amber-600">
                    <Flame className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="font-heading font-bold text-2xl text-gray-900 leading-tight">
                      Mesha Rashi
                    </div>
                    <div className="text-sm text-gray-500 italic">in Vedic Astrology</div>
                  </div>
                </div>

                {/* Card 1, intro */}
                <div className="bg-white p-4 rounded-xl flex gap-3" style={{ border: '1px solid #f0e0d0' }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-amber-100 text-amber-600">
                    <Flame className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed m-0">
                    Mesha (Aries) is the <strong style={{ color: '#d97706' }}>first sign</strong> of the
                    Vedic zodiac, ruled by Mangala (Mars), the planet of energy, courage, and decisive
                    action. As a <strong>Fire sign</strong> governed by the cardinal quality, Mesha
                    carries the pure force of initiation, the spark that sets everything in motion.
                  </p>
                </div>

                {/* Card 2, Warrior Spirit */}
                <div className="bg-white p-4 rounded-xl flex gap-3" style={{ border: '1px solid #f0e0d0' }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-red-100 text-red-600">
                    <Sword className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base mb-1" style={{ color: '#b91c1c' }}>
                      Warrior Spirit
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed m-0">
                      In the Brihat Parashara Hora Shastra, Mesha is described as a sign of{' '}
                      <strong>Kshatriya nature</strong>, embodying the warrior spirit that charges
                      forward where others pause to deliberate.
                    </p>
                  </div>
                </div>

                {/* Card 3, Born Pioneers */}
                <div className="bg-white p-4 rounded-xl flex gap-3" style={{ border: '1px solid #f0e0d0' }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-slate-900 text-white">
                    <Mountain className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base text-gray-900 mb-1">
                      Born Pioneers
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed m-0">
                      The Ram does not wait for permission or perfect conditions. It acts from{' '}
                      <strong style={{ color: '#d97706' }}>instinct</strong>, backed by an inner fire
                      that refuses to be contained.
                    </p>
                  </div>
                </div>

                {/* Card 4, Natural Leaders */}
                <div className="bg-white p-4 rounded-xl flex gap-3" style={{ border: '1px solid #f0e0d0' }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-amber-100 text-amber-600">
                    <Users className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base mb-1" style={{ color: '#b91c1c' }}>
                      Natural Leaders
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed m-0">
                      This quality makes Mesha the <strong>natural leader</strong> of any group, the
                      first to volunteer, and the last to abandon a cause once committed.
                    </p>
                  </div>
                </div>

                {/* Bottom card, Soul Infinity insight */}
                <div className="p-4 rounded-xl flex gap-3" style={{ background: '#fdf2e0', border: '1px solid #e8c098' }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-amber-200 text-amber-800">
                    <Star className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base mb-1" style={{ color: '#92400e' }}>
                      Soul Infinity Astrologers Insight
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed m-0 italic">
                      At Soul Infinity Astro Solutions, Saurabh Jain observes that Mesha ascendants
                      and Moon sign natives often arrive at crossroads requiring courage, and their
                      chart invariably shows the planetary support for bold action when the timing
                      is right.
                    </p>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN, 55% on lg+ */}
              <div className="lg:col-span-7 space-y-4">
                {/* Top, Quick Facts image */}
                <img
                  src={QUICK_FACTS_URL}
                  alt="Mesha Rashi quick facts, Element Fire, Ruler Mars, Symbol The Ram"
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

                {/* Mars rulership card with body-system accent icons on the right */}
                <div className="bg-white p-4 rounded-xl" style={{ border: '1px solid #f0e0d0' }}>
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-red-100 text-red-600">
                      <Flame className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading font-bold text-base mb-1" style={{ color: '#b91c1c' }}>
                        Ruled by Mangala (Mars)
                      </h3>
                      <p className="text-sm text-gray-700 leading-relaxed m-0">
                        The ruling planet Mangala governs <strong>blood</strong>,{' '}
                        <strong>bone marrow</strong>, <strong>physical strength</strong>,{' '}
                        <strong>younger siblings</strong>, <strong>land</strong>, and{' '}
                        <strong>real estate</strong> in Vedic astrology.
                      </p>
                    </div>
                    <div className="hidden md:flex flex-col gap-1.5 text-red-500/70 pt-1">
                      <Droplet className="w-4 h-4" aria-hidden="true" />
                      <Bone className="w-4 h-4" aria-hidden="true" />
                      <Activity className="w-4 h-4" aria-hidden="true" />
                      <Users className="w-4 h-4" aria-hidden="true" />
                      <Home className="w-4 h-4" aria-hidden="true" />
                    </div>
                  </div>
                </div>

                {/* Power and Potential card with side-note box */}
                <div className="bg-white p-4 rounded-xl" style={{ border: '1px solid #f0e0d0' }}>
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
                          A well-placed Mars in a Mesha chart amplifies{' '}
                          <strong style={{ color: '#d97706' }}>leadership</strong>, athletic ability,
                          and entrepreneurial drive.
                        </p>
                      </div>
                    </div>
                    <div className="rounded-lg p-3" style={{ background: '#fff5e6', border: '1px solid #f5d8a8' }}>
                      <p className="text-xs text-amber-900 leading-relaxed m-0 italic">
                        An afflicted Mars can bring impulsiveness, short temper, and a tendency to
                        initiate without completing.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mahadasha Timing card */}
                <div className="bg-white p-4 rounded-xl flex gap-3" style={{ border: '1px solid #f0e0d0' }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-teal-100 text-teal-600">
                    <Clock className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base text-gray-900 mb-1">
                      Mahadasha Timing
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed m-0">
                      Understanding Mars placement, its dignity, aspects, and Mahadasha timing is
                      central to reading a Mesha chart accurately.
                    </p>
                  </div>
                </div>

                {/* Vimshottari Dasha System card with two-col text + 3 nakshatra mini cards */}
                <div className="bg-white p-5 rounded-xl" style={{ border: '1px solid #f0e0d0' }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-amber-100 text-amber-600">
                      <Star className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <h3 className="font-heading font-bold text-lg text-gray-900 m-0">
                      Vimshottari Dasha System
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 leading-relaxed">
                    <p className="m-0">
                      In the Vimshottari Dasha system, Mesha natives begin life with a{' '}
                      <strong style={{ color: '#d97706' }}>seven-year Mars Mahadasha</strong> if
                      born under certain nakshatras.
                    </p>
                    <p className="m-0">
                      The sign itself spans the <strong>Ashwini</strong>, <strong>Bharani</strong>,
                      and the first pada of <strong>Krittika</strong> nakshatras, each carrying
                      distinct sub-themes.
                    </p>
                  </div>

                  {/* Three nakshatra mini cards */}
                  <div className="grid grid-cols-3 gap-3 mt-4">
                    <div className="text-center p-3 rounded-lg" style={{ background: '#e6fffa', border: '1px solid #c4f1f9' }}>
                      <div className="w-9 h-9 mx-auto rounded-full flex items-center justify-center mb-2 bg-teal-200 text-teal-700">
                        <Sparkles className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <div className="font-heading font-bold text-sm text-teal-700">Ashwini</div>
                      <div className="text-xs text-gray-600 mt-1">Healing and speed</div>
                    </div>
                    <div className="text-center p-3 rounded-lg" style={{ background: '#fef3c7', border: '1px solid #fde68a' }}>
                      <div className="w-9 h-9 mx-auto rounded-full flex items-center justify-center mb-2 bg-amber-200 text-amber-700">
                        <Flame className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <div className="font-heading font-bold text-sm text-amber-700">Bharani</div>
                      <div className="text-xs text-gray-600 mt-1">Creation and transformation</div>
                    </div>
                    <div className="text-center p-3 rounded-lg" style={{ background: '#fee2e2', border: '1px solid #fecaca' }}>
                      <div className="w-9 h-9 mx-auto rounded-full flex items-center justify-center mb-2 bg-red-200 text-red-700">
                        <Star className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <div className="font-heading font-bold text-sm text-red-700">Krittika</div>
                      <div className="text-xs text-gray-600 mt-1">Sun&apos;s fire precision</div>
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
            ॐ क्रां क्रीं क्रौं सः भौमाय नमः
          </div>
          <div className="text-lg md:text-xl italic text-white mb-3">
            Om Kraam Kreem Kraum Sah Bhaumaya Namah
          </div>
          <div className="text-sm md:text-base text-gray-200 mb-6 max-w-xl mx-auto">
            Salutations to Mangala (Mars), the ruling planet of Mesha Rashi.
          </div>
          <div className="inline-block bg-amber-500 text-gray-900 px-5 py-2 rounded-full text-sm font-semibold shadow-md">
            Chant 108 times
            <span className="mx-2">·</span>
            Tuesday mornings
          </div>
        </div>
      </section>

      {/* Section 5, Strengths and Challenges. Cream bg with faint Ram
          watermark, gradient-header cards. */}
      <section
        className="relative overflow-hidden"
        style={{ background: '#fdf6f0', padding: '64px 24px' }}
      >
        {/* Faint Ram watermark, top-left */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            fontSize: '120px',
            opacity: 0.06,
            color: '#c2410c',
            userSelect: 'none',
            lineHeight: 1,
          }}
        >
          ♈
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Header */}
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
                color: '#c2410c',
                fontStyle: 'italic',
                lineHeight: 1.1,
                marginTop: '4px',
              }}
            >
              Mesha Natives
            </h2>

            {/* Decorative line with diamond */}
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
              The bold fire within, strengths that empower and challenges that shape the journey.
            </p>
          </div>

          {/* Two-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Strengths card */}
            <div
              className="bg-white overflow-hidden"
              style={{
                borderRadius: '20px',
                boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
              }}
            >
              {/* Header */}
              <div
                className="flex items-center gap-4"
                style={{
                  background: 'linear-gradient(135deg, #14532d, #16a34a)',
                  padding: '20px 24px',
                }}
              >
                <div
                  className="bg-white rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ width: '52px', height: '52px' }}
                >
                  <ShieldCheck style={{ color: '#16a34a', width: '28px', height: '28px' }} aria-hidden="true" />
                </div>
                <h3 style={{ color: 'white', fontSize: '24px', fontWeight: 700, margin: 0 }}>
                  Strengths
                </h3>
              </div>

              {/* Body */}
              <div className="bg-white divide-y divide-green-50">
                {STRENGTH_ROWS.map((row) => {
                  const Icon = row.icon;
                  return (
                    <div
                      key={row.label}
                      className="flex items-center gap-3 hover:bg-green-50 transition-colors"
                      style={{ padding: '14px 20px' }}
                    >
                      <div
                        className="rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ width: '40px', height: '40px', background: '#f0fdf4' }}
                      >
                        <Icon style={{ color: '#16a34a', width: '20px', height: '20px' }} aria-hidden="true" />
                      </div>
                      <div
                        className="flex-1 font-bold text-gray-800"
                        style={{ fontSize: '15px' }}
                      >
                        {row.label}
                      </div>
                      <span style={{ color: '#d1fae5', fontWeight: 400 }} aria-hidden="true">|</span>
                      <span
                        style={{ color: '#16a34a', fontWeight: 700 }}
                        aria-hidden="true"
                      >
                        {'\u2014'}
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
              {/* Header */}
              <div
                className="flex items-center gap-4"
                style={{
                  background: 'linear-gradient(135deg, #7f1d1d, #dc2626)',
                  padding: '20px 24px',
                }}
              >
                <div
                  className="bg-white rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ width: '52px', height: '52px' }}
                >
                  <AlertTriangle style={{ color: '#ea580c', width: '28px', height: '28px' }} aria-hidden="true" />
                </div>
                <h3 style={{ color: 'white', fontSize: '24px', fontWeight: 700, margin: 0 }}>
                  Challenges
                </h3>
              </div>

              {/* Body */}
              <div className="bg-white divide-y divide-orange-50">
                {CHALLENGE_ROWS.map((row) => {
                  const Icon = row.icon;
                  return (
                    <div
                      key={row.label}
                      className="flex items-center gap-3 hover:bg-orange-50 transition-colors"
                      style={{ padding: '14px 20px' }}
                    >
                      <div
                        className="rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ width: '40px', height: '40px', background: '#fff7ed' }}
                      >
                        <Icon style={{ color: '#ea580c', width: '20px', height: '20px' }} aria-hidden="true" />
                      </div>
                      <div
                        className="flex-1 font-bold text-gray-800"
                        style={{ fontSize: '15px' }}
                      >
                        {row.label}
                      </div>
                      <span style={{ color: '#fed7aa', fontWeight: 400 }} aria-hidden="true">|</span>
                      <span
                        style={{ color: '#ea580c', fontWeight: 700 }}
                        aria-hidden="true"
                      >
                        {'\u2014'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer line */}
          <div
            className="flex flex-wrap items-center justify-center"
            style={{ gap: '12px', marginTop: '32px' }}
          >
            <span style={{ color: '#d97706', fontSize: '12px' }} aria-hidden="true">
              ✦ {'\u2014\u2014'}
            </span>
            <Flame size={18} color="#ea580c" aria-hidden="true" />
            <p style={{ fontSize: '14px', color: '#374151', margin: 0 }}>
              When guided with awareness, the fire of Mesha becomes a{' '}
              <strong style={{ color: '#d97706' }}>force of greatness.</strong>
            </p>
            <span style={{ color: '#d97706', fontSize: '12px' }} aria-hidden="true">
              {'\u2014\u2014'} ✦
            </span>
          </div>
        </div>
      </section>

      {/* Section 6, Mesha in the 12 Houses. Infographic card grid. */}
      <section className="py-16 px-6" style={{ background: '#fdf6f0' }}>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div
              className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4"
              style={{ background: '#fef3c7', color: '#d97706' }}
            >
              <Target className="w-6 h-6" aria-hidden="true" />
            </div>
            <h2 className="font-heading font-bold text-3xl md:text-5xl mb-3 leading-tight">
              <span style={{ color: '#b91c1c' }}>Mesha</span>
              <span style={{ color: '#1e3a5f' }}> in the 12 Houses</span>
            </h2>
            <div
              className="text-xs uppercase tracking-[0.25em] font-semibold mb-2"
              style={{ color: '#d97706' }}
            >
              How the Fire of Mesha Expresses Itself
            </div>
            <p className="text-sm text-gray-500 max-w-xl mx-auto">
              when the sign occupies each of the twelve bhavas of a Vedic birth chart
            </p>
          </div>

          {/* 4x3 grid */}
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

          {/* Footer line */}
          <div className="mt-10 text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div
                className="h-px w-10"
                style={{ background: '#d97706', opacity: 0.4 }}
              />
              <Flame className="w-4 h-4" style={{ color: '#d97706' }} aria-hidden="true" />
              <div
                className="h-px w-10"
                style={{ background: '#d97706', opacity: 0.4 }}
              />
            </div>
            <p className="text-sm text-gray-700 italic">
              Mesha fire energizes every house it touches, bringing{' '}
              <strong style={{ color: '#d97706' }}>initiative, courage</strong> and the will to
              conquer.
            </p>
          </div>
        </div>
      </section>

      {/* Section 7, Remedies. Bg image rendered as <img>, text overlaid on
          the empty right-side row spaces via absolute positioning. */}
      <section style={{ position: 'relative', width: '100%' }}>
        <img
          src={REMEDIES_BG_URL}
          alt="Classical Vedic Remedies for Mesha Rashi"
          style={{ width: '100%', display: 'block' }}
          loading="lazy"
        />

        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '2% 3% 2% 38%',
            paddingRight: '10%',
          }}
        >
          {[
            { main: 'Chant the Mangala Beej mantra (Om Kraam Kreem Kraum Sah Bhaumaya Namah)', sub: '108 times on Tuesday mornings', highlight: 'Mangala Beej mantra' },
            { main: 'Wear Red Coral (Moonga) in copper or gold', sub: 'set on the ring finger of the right hand, only after a chart-based recommendation', highlight: 'Red Coral' },
            { main: 'Donate red lentils (masoor dal), red cloth, jaggery', sub: 'or copper utensils on Tuesdays', highlight: 'red lentils' },
            { main: 'Recite the Hanuman Chalisa on Tuesdays', sub: 'for protection during Mangal Mahadasha and Antardasha', highlight: 'Hanuman Chalisa' },
            { main: 'Visit a Hanuman temple on Tuesdays', sub: 'and offer sindoor and sesame oil', highlight: 'Hanuman temple' },
            { main: 'Practice martial arts, athletic exercise, or any physical discipline', sub: 'that channels Mars constructively', highlight: 'martial arts, athletic exercise' },
            { main: 'Avoid excessive red meat and overly spicy food', sub: 'during Mars-afflicted periods. Cultivate patience and restraint', highlight: 'Avoid excessive red meat' },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                paddingRight: '8%',
              }}
            >
              <p
                style={{
                  color: 'white',
                  fontWeight: 600,
                  fontSize: 'clamp(10px, 1.1vw, 14px)',
                  margin: '0 0 2px',
                  lineHeight: 1.4,
                }}
              >
                {item.main.split(item.highlight).map((part, j, arr) => (
                  <span key={j}>
                    {part}
                    {j < arr.length - 1 && (
                      <span style={{ color: '#f59e0b', fontWeight: 700 }}>{item.highlight}</span>
                    )}
                  </span>
                ))}
              </p>
              <p
                style={{
                  color: 'rgba(255,255,255,0.65)',
                  fontSize: 'clamp(9px, 0.9vw, 12px)',
                  margin: 0,
                }}
              >
                <span aria-hidden="true" style={{ marginRight: 4 }}>›</span>
                {item.sub}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 8, FAQ accordion. Cream bg, colored-border accordion rows. */}
      <section
        className="relative py-16 px-6 overflow-hidden"
        style={{ background: '#fdf6f0' }}
      >
        {/* Decorative star symbols at corners */}
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
          {/* Header */}
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
              ♈
            </div>
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-3 leading-tight">
              <span style={{ color: '#1e3a5f' }}>Frequently Asked </span>
              <span style={{ color: '#c2410c' }}>Questions</span>
            </h2>
            <p className="text-gray-600 text-base">
              Your top questions about Mesha Rashi, answered with clarity
            </p>
          </div>

          {/* Accordion */}
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
                    aria-controls={`mesha-faq-${i}`}
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
                      id={`mesha-faq-${i}`}
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
                            alt="Mesha Rashi Ram zodiac symbol Soul Infinity"
                            width={120}
                            height={120}
                            loading="lazy"
                            style={{
                              width: '120px',
                              height: '120px',
                              borderRadius: '50%',
                              border: '2px solid #d97706',
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

      {/* Section 9, CTA. Dark blue. */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-indigo-900 text-white relative overflow-hidden">
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
            Want a Personalised Mesha Reading?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Saurabh Jain at Soul Infinity Astro Solutions reads Mesha placement in the context of
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
