import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ArrowRight,
  ChevronDown,
  AlertTriangle,
  Mountain,
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
  Crown,
  ChevronsRight,
  Timer,
  UserX,
  Clock,
  Activity,
  type LucideIcon,
} from 'lucide-react';
import SEOHead from '../../components/SEOHead';
import SchemaMarkup from '../../components/SchemaMarkup';
import Breadcrumbs from '../../components/Breadcrumbs';
import { getFaqPageSchemaFromList } from '../../data/schema-entities';

const HERO_URL =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Capricorn/hero-banner-makara-rashi.webp';
const QUICK_FACTS_URL =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Capricorn/quick-facts-makara-rashi.webp';
const MANTRA_BG_URL =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Capricorn/mantra-bg-makara-rashi.webp';
const CARD_URL =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Capricorn/makara-card.webp';

interface TraitRow {
  icon: LucideIcon;
  label: string;
}

const STRENGTH_ROWS: readonly TraitRow[] = [
  { icon: Mountain, label: 'Disciplined and structured' },
  { icon: ShieldCheck, label: 'Responsible and reliable' },
  { icon: TrendingUp, label: 'Ambitious and persistent' },
  { icon: Compass, label: 'Patient and strategic' },
  { icon: Activity, label: 'Hardworking and enduring' },
  { icon: Crown, label: 'Gains mastery over time' },
];

const CHALLENGE_ROWS: readonly TraitRow[] = [
  { icon: ChevronsRight, label: 'Cold and emotionally distant' },
  { icon: Timer, label: 'Overly cautious and rigid' },
  { icon: UserX, label: 'Pessimistic under pressure' },
  { icon: Clock, label: 'Difficulty expressing warmth' },
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
  { num: '01', color: '#1e3a5f', heading: 'LAGNA (SELF)',          icon: User,       desc: 'Lean build, serious demeanour, disciplined nature, slow but steady in all endeavours',      arrow: 'Structure and ambition define the self' },
  { num: '02', color: '#d97706', heading: 'WEALTH & SPEECH',       icon: Coins,      desc: 'Measured speech, wealth through discipline and long-term effort, traditional family',     arrow: 'Wealth built brick by brick over decades' },
  { num: '03', color: '#db2777', heading: 'COURAGE & SIBLINGS',    icon: Users,      desc: 'Methodical communication, serious siblings, purposeful short travels',                    arrow: 'Courage expressed through responsibility' },
  { num: '04', color: '#7c3aed', heading: 'HOME & MOTHER',         icon: Home,       desc: 'Austere home, disciplined mother, strong connection to ancestral land and property',     arrow: 'Home as a legacy to be built and preserved' },
  { num: '05', color: '#db2777', heading: 'CHILDREN & CREATIVITY', icon: Star,       desc: 'Disciplined children, serious approach to romance, creative expression through structure',arrow: 'Creativity refined by patience and form' },
  { num: '06', color: '#1d4ed8', heading: 'ENEMIES & SERVICE',     icon: Shield,     desc: 'Outlasts all opposition through sheer endurance and systematic effort',                   arrow: 'Administration, engineering, or government service' },
  { num: '07', color: '#0f766e', heading: 'MARRIAGE & PARTNERS',   icon: Heart,      desc: 'Loyal and responsible spouse, partnerships built on shared goals and mutual respect',     arrow: 'Business partnerships with long-term vision' },
  { num: '08', color: '#7c3aed', heading: 'TRANSFORMATION',        icon: Zap,        desc: 'Slow and deliberate transformation, gains through inheritance, bone and joint health',   arrow: 'Transformation through accepting limitation' },
  { num: '09', color: '#d97706', heading: 'DHARMA & FATHER',       icon: Compass,    desc: 'Disciplined spiritual practice, responsible father, pilgrimages for duty',                arrow: 'Dharma expressed through karma and service' },
  { num: '10', color: '#1d4ed8', heading: 'CAREER & STATUS',       icon: TrendingUp, desc: 'This is Makara natural house of career: ambition fulfilled through years of mastery',     arrow: 'Recognition arrives late but lasts a lifetime' },
  { num: '11', color: '#1e3a5f', heading: 'GAINS & FRIENDS',       icon: Users,      desc: 'Few but enduring friends, gains through discipline and systematic investment',            arrow: 'Fulfilment through legacy and lasting achievement' },
  { num: '12', color: '#0f766e', heading: 'LIBERATION & FOREIGN',  icon: Globe,      desc: 'Spiritual discipline, foreign work in administration, liberation through renunciation',   arrow: 'Liberation through total surrender of ego-ambition' },
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
    q: 'What is Makara Rashi in Vedic astrology?',
    icon: HelpCircle,
    color: '#1e3a5f',
    showImage: true,
    a: (
      <>
        Makara Rashi (Capricorn) is the tenth sign of the Vedic sidereal zodiac, spanning 270 to 300
        degrees. It is a <strong style={{ color: '#d97706' }}>cardinal earth sign</strong> ruled by{' '}
        <strong style={{ color: '#d97706' }}>Shani (Saturn)</strong>, the planet of discipline,
        karma, and endurance. Makara is also the sign of exaltation for Mangala (Mars). Natives
        with the Moon in Makara are serious, ambitious, and built for long-term achievement.
      </>
    ),
    aText:
      'Makara Rashi (Capricorn) is the tenth sign of the Vedic sidereal zodiac, spanning 270 to 300 degrees. It is a cardinal earth sign ruled by Shani (Saturn), the planet of discipline, karma, and endurance. Makara is also the sign of exaltation for Mangala (Mars). Natives with the Moon in Makara are serious, ambitious, and built for long-term achievement.',
  },
  {
    q: 'Who is the ruling planet of Makara Rashi?',
    icon: Globe,
    color: '#d97706',
    a: (
      <>
        Shani (Saturn) is the ruling planet of Makara Rashi. Saturn governs discipline, karma,
        structure, old age, hardship, and the rewards that come from sustained effort. A strong
        Saturn gives extraordinary patience, administrative ability, and the capacity to outlast
        all obstacles. An afflicted Saturn brings delays, depression, and difficulty in
        experiencing joy.
      </>
    ),
    aText:
      'Shani (Saturn) is the ruling planet of Makara Rashi. Saturn governs discipline, karma, structure, old age, hardship, and the rewards that come from sustained effort. A strong Saturn gives extraordinary patience, administrative ability, and the capacity to outlast all obstacles. An afflicted Saturn brings delays, depression, and difficulty in experiencing joy.',
  },
  {
    q: 'What are the personality traits of Makara Rashi natives?',
    icon: User,
    color: '#7c3aed',
    a: (
      <>
        Makara natives are serious, disciplined, and built for the long game. They do not seek
        shortcuts and are deeply suspicious of easy gains. Their challenge is warmth: the same
        focus that makes them exceptional achievers can leave relationships feeling cold and
        transactional. When Makara energy is balanced with emotional openness, these natives build
        legacies that outlast lifetimes.
      </>
    ),
    aText:
      'Makara natives are serious, disciplined, and built for the long game. They do not seek shortcuts and are deeply suspicious of easy gains. Their challenge is warmth: the same focus that makes them exceptional achievers can leave relationships feeling cold and transactional. When Makara energy is balanced with emotional openness, these natives build legacies that outlast lifetimes.',
  },
  {
    q: 'Which gemstone is recommended for Makara Rashi?',
    icon: Gem,
    color: '#1d4ed8',
    a: (
      <>
        Blue Sapphire (Neelam) is the classical gemstone for Makara Rashi, worn to strengthen{' '}
        <strong style={{ color: '#d97706' }}>Shani (Saturn)</strong>. It must be tested before
        wearing, as Saturn can bring sudden results. Set in silver or gold, worn on the middle
        finger of the right hand on a Saturday morning. A chart-based consultation with a qualified
        jyotishi at Soul Infinity Astro Solutions is absolutely essential before wearing any
        planetary gemstone.
      </>
    ),
    aText:
      'Blue Sapphire (Neelam) is the classical gemstone for Makara Rashi, worn to strengthen Shani (Saturn). It must be tested before wearing, as Saturn can bring sudden results. Set in silver or gold, worn on the middle finger of the right hand on a Saturday morning. A chart-based consultation with a qualified jyotishi at Soul Infinity Astro Solutions is absolutely essential before wearing any planetary gemstone.',
  },
  {
    q: 'What are the lucky days and colours for Makara Rashi?',
    icon: Calendar,
    color: '#0f766e',
    a: (
      <>
        Saturday is the most auspicious day for Makara Rashi natives, governed by Shani (Saturn).
        Dark blue, black, and grey are the lucky colours that resonate with Saturn energy. Visiting
        Shani temples on Saturdays, offering sesame oil, and wearing black or dark blue on
        important occasions are traditional supportive practices that help Makara natives channel
        Saturn energy constructively.
      </>
    ),
    aText:
      'Saturday is the most auspicious day for Makara Rashi natives, governed by Shani (Saturn). Dark blue, black, and grey are the lucky colours that resonate with Saturn energy. Visiting Shani temples on Saturdays, offering sesame oil, and wearing black or dark blue on important occasions are traditional supportive practices that help Makara natives channel Saturn energy constructively.',
  },
];

const FAQS: ReadonlyArray<{ question: string; answer: string }> = FAQ_DATA.map((f) => ({
  question: f.q,
  answer: f.aText,
}));

export default function MakaraRashiPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <SEOHead
        title="Makara Rashi (Capricorn), Traits, Mantra, Remedies | Soul Infinity"
        description="Makara Rashi (Capricorn) in Vedic astrology, ruled by Shani (Saturn). Personality traits, mantra, remedies, characteristics, and houses placement, guided by Saurabh Jain."
        keywords="makara rashi, capricorn vedic astrology, shani, saturn, capricorn traits, makara mantra, blue sapphire, neelam, makara remedies, soul infinity"
        image={HERO_URL}
        type="article"
        omitDefaultSchema
      />
      <SchemaMarkup
        type="webpage"
        webPage={{
          name: 'Makara Rashi (Capricorn) in Vedic Astrology',
          description:
            'Makara Rashi, the tenth sign of the Vedic zodiac, ruled by Shani (Saturn). Personality, mantra, remedies, and houses placement.',
          url: '/zodiac/capricorn',
        }}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Zodiac Signs', url: '/zodiac' },
          { name: 'Makara (Capricorn)', url: '/zodiac/capricorn' },
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
          alt="Makara Rashi hero banner Soul Infinity Astro Solutions"
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
            { label: 'Makara (Capricorn)' },
          ]}
        />
      </div>

      <div>
        {/* Section 2, Title strip. */}
        <section className="bg-white pt-2 pb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <p className="text-sm md:text-base tracking-[0.25em] uppercase text-slate-800 font-semibold mb-2">
              <span className="font-devanagari" lang="sa">मकर राशि</span>
              <span className="mx-2 text-slate-800/60">·</span>
              Capricorn
            </p>
            <h1 className="font-heading font-bold text-3xl md:text-5xl text-gray-900 mb-2 leading-tight">
              Makara Rashi, The Achiever of the Zodiac
            </h1>
            <p className="text-base md:text-lg text-gray-700">
              Ruled by Shani (Saturn)
              <span className="mx-2 text-gray-400">·</span>
              Earth Sign
              <span className="mx-2 text-gray-400">·</span>
              The Sea-Goat
            </p>
          </div>
        </section>

        {/* Section 3, About Makara. Two-column infographic. */}
        <section className="py-12 px-6" style={{ background: '#f8fafc' }}>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

              {/* LEFT COLUMN */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-slate-100 text-slate-800">
                    <Mountain className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="font-heading font-bold text-2xl text-gray-900 leading-tight">
                      Makara Rashi
                    </div>
                    <div className="text-sm text-gray-500 italic">in Vedic Astrology</div>
                  </div>
                </div>

                {/* Card 1, intro */}
                <div className="bg-white p-4 rounded-xl flex gap-3" style={{ border: '1px solid #cbd5e1' }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-slate-100 text-slate-800">
                    <Mountain className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed m-0">
                    Makara (Capricorn) is the <strong style={{ color: '#d97706' }}>tenth sign</strong>{' '}
                    of the Vedic zodiac, ruled by Shani (Saturn), the planet of discipline, karma,
                    and enduring achievement. As a <strong>cardinal earth sign</strong>, Makara
                    carries the energy of structure, the force that builds lasting institutions
                    from disciplined effort applied over decades.
                  </p>
                </div>

                {/* Card 2, The Achiever */}
                <div className="bg-white p-4 rounded-xl flex gap-3" style={{ border: '1px solid #cbd5e1' }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-slate-100 text-slate-800">
                    <TrendingUp className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base mb-1" style={{ color: '#1e3a5f' }}>
                      The Achiever
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed m-0">
                      In the Brihat Parashara Hora Shastra, Makara is described as a sign of{' '}
                      <strong>royal caste</strong>, associated with administration, governance, and
                      the structures that hold civilisation together.
                    </p>
                  </div>
                </div>

                {/* Card 3, Born to Endure */}
                <div className="bg-white p-4 rounded-xl flex gap-3" style={{ border: '1px solid #cbd5e1' }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-slate-900 text-white">
                    <Mountain className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base text-gray-900 mb-1">
                      Born to Endure
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed m-0">
                      The Sea-Goat climbs where others rest. Makara natives do not chase quick
                      wins; they <strong style={{ color: '#d97706' }}>ascend</strong>, step by
                      patient step, until the summit they have reached is unassailable.
                    </p>
                  </div>
                </div>

                {/* Card 4, Mastery Through Time */}
                <div className="bg-white p-4 rounded-xl flex gap-3" style={{ border: '1px solid #cbd5e1' }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-slate-100 text-slate-800">
                    <Clock className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base mb-1" style={{ color: '#1e3a5f' }}>
                      Mastery Through Time
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed m-0">
                      Where other signs sprint, Makara <strong>endures</strong>. Time itself is
                      the ally of the Capricorn native, and the rewards of Saturn arrive late, yet
                      they last a lifetime.
                    </p>
                  </div>
                </div>

                {/* Bottom card, Soul Infinity insight */}
                <div className="p-4 rounded-xl flex gap-3" style={{ background: '#e2e8f0', border: '1px solid #94a3b8' }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-slate-200 text-slate-800">
                    <Star className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base mb-1" style={{ color: '#1e293b' }}>
                      Soul Infinity Astrologers Insight
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed m-0 italic">
                      At Soul Infinity Astro Solutions, Saurabh Jain observes that Makara
                      ascendants and Moon sign natives often arrive at decisions requiring
                      patience, and their chart invariably shows the planetary support for slow,
                      deliberate action when the timing is right.
                    </p>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="lg:col-span-7 space-y-4">
                <img
                  src={QUICK_FACTS_URL}
                  alt="Makara Rashi Quick Facts Soul Infinity"
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

                {/* Saturn rulership card */}
                <div className="bg-white p-4 rounded-xl" style={{ border: '1px solid #cbd5e1' }}>
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-slate-100 text-slate-800">
                      <Shield className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading font-bold text-base mb-1" style={{ color: '#1e3a5f' }}>
                        Ruled by Shani (Saturn)
                      </h3>
                      <p className="text-sm text-gray-700 leading-relaxed m-0">
                        The ruling planet Shani governs <strong>discipline</strong>,{' '}
                        <strong>karma and structure</strong>, <strong>endurance</strong>,{' '}
                        <strong>old age</strong>, <strong>administration</strong>, and the{' '}
                        <strong>rewards of patience</strong> in Vedic astrology.
                      </p>
                    </div>
                    <div className="hidden md:flex flex-col gap-1.5 text-slate-700/70 pt-1">
                      <Mountain className="w-4 h-4" aria-hidden="true" />
                      <Clock className="w-4 h-4" aria-hidden="true" />
                      <Shield className="w-4 h-4" aria-hidden="true" />
                      <Crown className="w-4 h-4" aria-hidden="true" />
                      <TrendingUp className="w-4 h-4" aria-hidden="true" />
                    </div>
                  </div>
                </div>

                {/* Power and Potential card */}
                <div className="bg-white p-4 rounded-xl" style={{ border: '1px solid #cbd5e1' }}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                    <div className="md:col-span-2 flex gap-3">
                      <div className="md:col-span-2 flex-shrink-0">
                        <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-teal-100 text-teal-600">
                          <Target className="w-5 h-5" aria-hidden="true" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-base text-gray-900 mb-1">
                          Power and Potential
                        </h3>
                        <p className="text-sm text-gray-700 leading-relaxed m-0">
                          A well-placed Saturn in a Makara chart amplifies{' '}
                          <strong style={{ color: '#d97706' }}>administrative ability</strong>,
                          long-term planning, and the capacity to build institutions that endure.
                        </p>
                      </div>
                    </div>
                    <div className="rounded-lg p-3" style={{ background: '#f8fafc', border: '1px solid #94a3b8' }}>
                      <p className="text-xs leading-relaxed m-0 italic" style={{ color: '#1e293b' }}>
                        An afflicted Saturn can bring delays, depression, and an excessive
                        attachment to control and rigidity.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mahadasha Timing card */}
                <div className="bg-white p-4 rounded-xl flex gap-3" style={{ border: '1px solid #cbd5e1' }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-teal-100 text-teal-600">
                    <Clock className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base text-gray-900 mb-1">
                      Mahadasha Timing
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed m-0">
                      Understanding Saturn placement, its dignity, aspects, and Mahadasha timing
                      is central to reading a Makara chart accurately.
                    </p>
                  </div>
                </div>

                {/* Vimshottari Dasha card */}
                <div className="bg-white p-5 rounded-xl" style={{ border: '1px solid #cbd5e1' }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-slate-100 text-slate-800">
                      <Star className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <h3 className="font-heading font-bold text-lg text-gray-900 m-0">
                      Vimshottari Dasha System
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 leading-relaxed">
                    <p className="m-0">
                      In the Vimshottari Dasha system, Makara natives often experience{' '}
                      <strong style={{ color: '#d97706' }}>nineteen-year Saturn Mahadasha</strong>{' '}
                      cycles that profoundly shape their material achievement and karmic learning.
                    </p>
                    <p className="m-0">
                      The sign itself spans the last two padas of <strong>Uttara Ashadha</strong>,
                      all of <strong>Shravana</strong>, and the first two padas of{' '}
                      <strong>Dhanishta</strong> nakshatras.
                    </p>
                  </div>

                  {/* Three nakshatra mini cards */}
                  <div className="grid grid-cols-3 gap-3 mt-4">
                    <div className="text-center p-3 rounded-lg" style={{ background: '#fef3c7', border: '1px solid #fde68a' }}>
                      <div className="w-9 h-9 mx-auto rounded-full flex items-center justify-center mb-2 bg-amber-200 text-amber-700">
                        <Star className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <div className="font-heading font-bold text-sm text-amber-700">Uttara Ashadha</div>
                      <div className="text-xs text-gray-600 mt-1">Final victory</div>
                    </div>
                    <div className="text-center p-3 rounded-lg" style={{ background: '#dbeafe', border: '1px solid #93c5fd' }}>
                      <div className="w-9 h-9 mx-auto rounded-full flex items-center justify-center mb-2 bg-blue-200 text-blue-700">
                        <Compass className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <div className="font-heading font-bold text-sm text-blue-700">Shravana</div>
                      <div className="text-xs text-gray-600 mt-1">Listening and learning</div>
                    </div>
                    <div className="text-center p-3 rounded-lg" style={{ background: '#e2e8f0', border: '1px solid #94a3b8' }}>
                      <div className="w-9 h-9 mx-auto rounded-full flex items-center justify-center mb-2 bg-slate-300 text-slate-700">
                        <Activity className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <div className="font-heading font-bold text-sm text-slate-700">Dhanishta</div>
                      <div className="text-xs text-gray-600 mt-1">Wealth and rhythm</div>
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
            ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः
          </div>
          <div className="text-lg md:text-xl italic text-white mb-3">
            Om Praam Preem Praum Sah Shanaischaraya Namah
          </div>
          <div className="text-sm md:text-base text-gray-200 mb-6 max-w-xl mx-auto">
            Salutation to Shani (Saturn), the planet of discipline and enduring reward, ruler of Makara Rashi.
          </div>
          <div className="inline-block bg-amber-500 text-gray-900 px-5 py-2 rounded-full text-sm font-semibold shadow-md">
            Chant 108 times
            <span className="mx-2">·</span>
            Saturday mornings, facing west
          </div>
        </div>
      </section>

      {/* Section 5, Strengths and Challenges. */}
      <section
        className="relative overflow-hidden"
        style={{ background: '#f8fafc', padding: '64px 24px' }}
      >
        {/* Faint Sea-Goat watermark */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            fontSize: '120px',
            opacity: 0.06,
            color: '#1e3a5f',
            userSelect: 'none',
            lineHeight: 1,
          }}
        >
          ♑
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
                color: '#1e3a5f',
                fontStyle: 'italic',
                lineHeight: 1.1,
                marginTop: '4px',
              }}
            >
              Makara Natives
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
              The patient mountain within, strengths that build legacy and challenges that test resolve.
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
                  background: 'linear-gradient(135deg, #0f172a, #1e3a5f)',
                  padding: '20px 24px',
                }}
              >
                <div
                  className="bg-white rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ width: '52px', height: '52px' }}
                >
                  <ShieldCheck style={{ color: '#1e3a5f', width: '28px', height: '28px' }} aria-hidden="true" />
                </div>
                <h3 style={{ color: 'white', fontSize: '24px', fontWeight: 700, margin: 0 }}>
                  Strengths
                </h3>
              </div>

              <div className="bg-white divide-y divide-slate-50">
                {STRENGTH_ROWS.map((row) => {
                  const Icon = row.icon;
                  return (
                    <div
                      key={row.label}
                      className="flex items-center gap-3 hover:bg-slate-50 transition-colors"
                      style={{ padding: '14px 20px' }}
                    >
                      <div
                        className="rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ width: '40px', height: '40px', background: '#f8fafc' }}
                      >
                        <Icon style={{ color: '#1e3a5f', width: '20px', height: '20px' }} aria-hidden="true" />
                      </div>
                      <div
                        className="flex-1 font-bold text-gray-800"
                        style={{ fontSize: '15px' }}
                      >
                        {row.label}
                      </div>
                      <span style={{ color: '#cbd5e1', fontWeight: 400 }} aria-hidden="true">|</span>
                      <span
                        style={{ color: '#1e3a5f', fontWeight: 700 }}
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
            <Mountain size={18} color="#1e3a5f" aria-hidden="true" />
            <p style={{ fontSize: '14px', color: '#374151', margin: 0 }}>
              When guided with awareness, the discipline of Makara becomes a{' '}
              <strong style={{ color: '#d97706' }}>force of legacy.</strong>
            </p>
            <span style={{ color: '#d97706', fontSize: '12px' }} aria-hidden="true">
              ✦ ✦ ✦
            </span>
          </div>
        </div>
      </section>

      {/* Section 6, Makara in the 12 Houses. */}
      <section className="py-16 px-6" style={{ background: '#f8fafc' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div
              className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4"
              style={{ background: '#e2e8f0', color: '#1e3a5f' }}
            >
              <Target className="w-6 h-6" aria-hidden="true" />
            </div>
            <h2 className="font-heading font-bold text-3xl md:text-5xl mb-3 leading-tight">
              <span style={{ color: '#1e3a5f' }}>Makara</span>
              <span style={{ color: '#1e3a5f' }}> in the 12 Houses</span>
            </h2>
            <div
              className="text-xs uppercase tracking-[0.25em] font-semibold mb-2"
              style={{ color: '#d97706' }}
            >
              How the Earth of Makara Grounds Each Bhava
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
              <Mountain className="w-4 h-4" style={{ color: '#1e3a5f' }} aria-hidden="true" />
              <div
                className="h-px w-10"
                style={{ background: '#d97706', opacity: 0.4 }}
              />
            </div>
            <p className="text-sm text-gray-700 italic">
              Makara earth builds every house it occupies, bringing{' '}
              <strong style={{ color: '#d97706' }}>discipline, ambition</strong> and the endurance of stone.
            </p>
          </div>
        </div>
      </section>

      {/* Section 7, Remedies. JSX card grid on very dark navy. */}
      <section style={{ background: '#050a14', padding: '64px 24px', position: 'relative' }}>
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
              Classical Vedic Remedies for Makara Rashi
            </h2>
            <p className="text-base" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Strengthen Shani and align with Saturn energy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { main: 'Chant the Shani Beej mantra (Om Praam Preem Praum Sah Shanaischaraya Namah)', sub: '108 times on Saturday mornings, facing west', highlight: 'Shani Beej mantra' },
              { main: 'Wear Blue Sapphire (Neelam) only after mandatory testing and chart consultation', sub: 'set in silver or gold, on the middle finger of the right hand on a Saturday morning', highlight: 'Blue Sapphire (Neelam)' },
              { main: 'Donate black sesame, black cloth, iron, or mustard oil', sub: 'on Saturdays at a Shani temple or to those in genuine need', highlight: 'black sesame, black cloth' },
              { main: 'Recite the Shani Stotra or Hanuman Chalisa on Saturdays', sub: 'for Saturn relief, mental steadiness, and protection from karmic delays', highlight: 'Shani Stotra or Hanuman Chalisa' },
              { main: 'Visit a Shani or Hanuman temple on Saturdays', sub: 'and offer sesame oil, black flowers, and lit lamps', highlight: 'Shani or Hanuman temple' },
              { main: 'Serve the elderly, the poor, or animals as a conscious Saturday discipline', sub: 'this is the most powerful Saturn remedy and channels Shani energy constructively', highlight: 'Serve the elderly, the poor' },
              { main: 'Reduce excessive rigidity, cold detachment, and fear of failure', sub: 'during Saturn-afflicted periods. Cultivate emotional warmth alongside discipline', highlight: 'excessive rigidity' },
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
        style={{ background: '#f8fafc' }}
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
              ♑
            </div>
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-3 leading-tight">
              <span style={{ color: '#1e3a5f' }}>Frequently Asked </span>
              <span style={{ color: '#d97706' }}>Questions</span>
            </h2>
            <p className="text-gray-600 text-base">
              Your top questions about Makara Rashi, answered with clarity
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
                    aria-controls={`makara-faq-${i}`}
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
                      id={`makara-faq-${i}`}
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
                            alt="Makara Rashi Sea-Goat zodiac symbol Soul Infinity"
                            width={120}
                            height={120}
                            loading="lazy"
                            style={{
                              width: '120px',
                              height: '120px',
                              borderRadius: '50%',
                              border: '2px solid #1e3a5f',
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
      <section className="py-20 bg-gradient-to-r from-slate-900 to-gray-900 text-white relative overflow-hidden">
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
            Want a Personalised Makara Reading?
          </h2>
          <p className="text-xl text-slate-100 mb-8 leading-relaxed">
            Saurabh Jain at Soul Infinity Astro Solutions reads Makara placement in the context
            of your full birth chart, current dasha, and active transits, then translates the
            reading into decisions you can actually act on.
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
