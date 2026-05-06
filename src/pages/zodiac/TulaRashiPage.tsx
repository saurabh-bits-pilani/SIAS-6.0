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
  Scale,
  ChevronsRight,
  Timer,
  UserX,
  Clock,
  Music,
  Flower2,
  type LucideIcon,
} from 'lucide-react';
import SEOHead from '../../components/SEOHead';
import SchemaMarkup from '../../components/SchemaMarkup';
import Breadcrumbs from '../../components/Breadcrumbs';
import { getFaqPageSchemaFromList } from '../../data/schema-entities';

const HERO_URL =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Libra/hero-banner-tula-rashi.webp';
const QUICK_FACTS_URL =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Libra/quick-facts-tula-rashi.webp';
const MANTRA_BG_URL =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Libra/mantra-bg-tula-rashi.webp';
const CARD_URL =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Libra/tula-card.webp';

interface TraitRow {
  icon: LucideIcon;
  label: string;
}

const STRENGTH_ROWS: readonly TraitRow[] = [
  { icon: Heart, label: 'Diplomatic and fair' },
  { icon: Users, label: 'Charming and gracious' },
  { icon: Sparkles, label: 'Artistic and refined' },
  { icon: ShieldCheck, label: 'Balanced and just' },
  { icon: Compass, label: 'Idealistic and visionary' },
  { icon: Globe, label: 'Natural peacemaker' },
];

const CHALLENGE_ROWS: readonly TraitRow[] = [
  { icon: ChevronsRight, label: 'Indecisive and wavering' },
  { icon: Timer, label: 'Avoids conflict at all costs' },
  { icon: UserX, label: 'Dependent on approval' },
  { icon: Clock, label: 'Struggles with commitment' },
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
  { num: '01', color: '#9333ea', heading: 'LAGNA (SELF)',          icon: User,       desc: 'Graceful appearance, natural charm, love of beauty, Venus-governed temperament',           arrow: 'Balance and fairness are core life values' },
  { num: '02', color: '#d97706', heading: 'WEALTH & SPEECH',       icon: Coins,      desc: 'Diplomatic speech, wealth through partnerships and aesthetics, family of refined taste',  arrow: 'Wealth grows through cooperation and balance' },
  { num: '03', color: '#db2777', heading: 'COURAGE & SIBLINGS',    icon: Users,      desc: 'Artistic communication, balanced siblings, travels for beauty or negotiation',            arrow: 'Courage expressed through fair persuasion' },
  { num: '04', color: '#7c3aed', heading: 'HOME & MOTHER',         icon: Home,       desc: 'Beautiful home, refined mother, deep appreciation for domestic harmony',                  arrow: 'Home is a sanctuary of beauty and peace' },
  { num: '05', color: '#db2777', heading: 'CHILDREN & CREATIVITY', icon: Star,       desc: 'Artistic children, romantic idealism, creative expression in music or visual art',        arrow: 'Love and creativity are inseparable' },
  { num: '06', color: '#1d4ed8', heading: 'ENEMIES & SERVICE',     icon: Shield,     desc: 'Overcomes opposition through negotiation and fair dealing',                               arrow: 'Law, counselling, or beauty-industry service' },
  { num: '07', color: '#0f766e', heading: 'MARRIAGE & PARTNERS',   icon: Heart,      desc: 'Devoted to partnership, marriage as the central life axis, desire for equality',          arrow: 'Business through partnership and co-creation' },
  { num: '08', color: '#7c3aed', heading: 'TRANSFORMATION',        icon: Zap,        desc: 'Transformation through relationships, interest in occult aesthetics, joint wealth',      arrow: 'Transformation through radical acceptance' },
  { num: '09', color: '#d97706', heading: 'DHARMA & FATHER',       icon: Compass,    desc: 'Just and artistic father, faith expressed through beauty and devotion',                   arrow: 'Dharma as the pursuit of harmony and truth' },
  { num: '10', color: '#1d4ed8', heading: 'CAREER & STATUS',       icon: TrendingUp, desc: 'Career in law, diplomacy, arts, fashion, luxury, counselling, or public relations',      arrow: 'Recognition through fairness and aesthetic mastery' },
  { num: '11', color: '#9333ea', heading: 'GAINS & FRIENDS',       icon: Users,      desc: 'Friends in artistic, social, and intellectual circles',                                   arrow: 'Gains through partnerships and social networks' },
  { num: '12', color: '#0f766e', heading: 'LIBERATION & FOREIGN',  icon: Globe,      desc: 'Spiritual seeker of inner harmony, foreign travel for love or aesthetic purpose',         arrow: 'Liberation through release of the need to please' },
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
    q: 'What is Tula Rashi in Vedic astrology?',
    icon: HelpCircle,
    color: '#9333ea',
    showImage: true,
    a: (
      <>
        Tula Rashi (Libra) is the seventh sign of the Vedic sidereal zodiac, spanning 180 to 210
        degrees. It is a <strong style={{ color: '#d97706' }}>cardinal air sign</strong> ruled by{' '}
        <strong style={{ color: '#d97706' }}>Shukra (Venus)</strong>, the planet of beauty, harmony,
        and relationships. Tula is also the sign of exaltation for Shani (Saturn). Natives with the
        Moon in Tula seek balance, beauty, and fairness in all aspects of life.
      </>
    ),
    aText:
      'Tula Rashi (Libra) is the seventh sign of the Vedic sidereal zodiac, spanning 180 to 210 degrees. It is a cardinal air sign ruled by Shukra (Venus), the planet of beauty, harmony, and relationships. Tula is also the sign of exaltation for Shani (Saturn). Natives with the Moon in Tula seek balance, beauty, and fairness in all aspects of life.',
  },
  {
    q: 'Who is the ruling planet of Tula Rashi?',
    icon: Globe,
    color: '#d97706',
    a: (
      <>
        Shukra (Venus) is the ruling planet of Tula Rashi. In Tula, Venus governs diplomacy,
        aesthetics, love, and the art of relationship. A strong Venus here brings charm, artistic
        gift, and partnership success. An afflicted Venus brings indecision, dependence on others,
        and challenges in commitment.
      </>
    ),
    aText:
      'Shukra (Venus) is the ruling planet of Tula Rashi. In Tula, Venus governs diplomacy, aesthetics, love, and the art of relationship. A strong Venus here brings charm, artistic gift, and partnership success. An afflicted Venus brings indecision, dependence on others, and challenges in commitment.',
  },
  {
    q: 'What are the personality traits of Tula Rashi natives?',
    icon: User,
    color: '#7c3aed',
    a: (
      <>
        Tula natives are gracious, idealistic, and gifted with natural charm. They are born
        mediators who see all sides of every situation. Their challenge is decision-making: the
        same capacity for balance that makes them excellent diplomats can paralyse them when a
        clear choice is required. When Tula energy is directed with conviction, these natives
        create extraordinary harmony in all they touch.
      </>
    ),
    aText:
      'Tula natives are gracious, idealistic, and gifted with natural charm. They are born mediators who see all sides of every situation. Their challenge is decision-making: the same capacity for balance that makes them excellent diplomats can paralyse them when a clear choice is required. When Tula energy is directed with conviction, these natives create extraordinary harmony in all they touch.',
  },
  {
    q: 'Which gemstone is recommended for Tula Rashi?',
    icon: Gem,
    color: '#1d4ed8',
    a: (
      <>
        Diamond (Heera) or White Sapphire (Safed Pukhraj) are the classical gemstones for Tula
        Rashi, worn to strengthen Shukra (Venus). Set in silver or platinum, worn on the middle
        finger on a Friday morning. A chart-based consultation with a qualified jyotishi at Soul
        Infinity Astro Solutions is essential before wearing any planetary gemstone.
      </>
    ),
    aText:
      'Diamond (Heera) or White Sapphire (Safed Pukhraj) are the classical gemstones for Tula Rashi, worn to strengthen Shukra (Venus). Set in silver or platinum, worn on the middle finger on a Friday morning. A chart-based consultation with a qualified jyotishi at Soul Infinity Astro Solutions is essential before wearing any planetary gemstone.',
  },
  {
    q: 'What are the lucky days and colours for Tula Rashi?',
    icon: Calendar,
    color: '#0f766e',
    a: (
      <>
        Friday is the most auspicious day for Tula Rashi natives, governed by Shukra (Venus).
        White, pink, and light blue are the lucky colours that resonate with Venus energy. Visiting
        Lakshmi temples, fasting on Fridays, and wearing white on important occasions are
        traditional supportive practices that help Tula natives channel Venus energy
        constructively.
      </>
    ),
    aText:
      'Friday is the most auspicious day for Tula Rashi natives, governed by Shukra (Venus). White, pink, and light blue are the lucky colours that resonate with Venus energy. Visiting Lakshmi temples, fasting on Fridays, and wearing white on important occasions are traditional supportive practices that help Tula natives channel Venus energy constructively.',
  },
];

const FAQS: ReadonlyArray<{ question: string; answer: string }> = FAQ_DATA.map((f) => ({
  question: f.q,
  answer: f.aText,
}));

export default function TulaRashiPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <SEOHead
        title="Tula Rashi (Libra), Traits, Mantra, Remedies | Soul Infinity"
        description="Tula Rashi (Libra) in Vedic astrology, ruled by Shukra (Venus). Personality traits, mantra, remedies, characteristics, and houses placement, guided by Saurabh Jain."
        keywords="tula rashi, libra vedic astrology, shukra, venus, libra traits, tula mantra, diamond, heera, tula remedies, soul infinity"
        image={HERO_URL}
        type="article"
        omitDefaultSchema
      />
      <SchemaMarkup
        type="webpage"
        webPage={{
          name: 'Tula Rashi (Libra) in Vedic Astrology',
          description:
            'Tula Rashi, the seventh sign of the Vedic zodiac, ruled by Shukra (Venus). Personality, mantra, remedies, and houses placement.',
          url: '/zodiac/libra',
        }}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Zodiac Signs', url: '/zodiac' },
          { name: 'Tula (Libra)', url: '/zodiac/libra' },
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
          alt="Tula Rashi hero banner Soul Infinity Astro Solutions"
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
            { label: 'Tula (Libra)' },
          ]}
        />
      </div>

      <div>
        {/* Section 2, Title strip. */}
        <section className="bg-white pt-2 pb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <p className="text-sm md:text-base tracking-[0.25em] uppercase text-purple-700 font-semibold mb-2">
              <span className="font-devanagari" lang="sa">तुला राशि</span>
              <span className="mx-2 text-purple-700/60">·</span>
              Libra
            </p>
            <h1 className="font-heading font-bold text-3xl md:text-5xl text-gray-900 mb-2 leading-tight">
              Tula Rashi, The Diplomat of the Zodiac
            </h1>
            <p className="text-base md:text-lg text-gray-700">
              Ruled by Shukra (Venus)
              <span className="mx-2 text-gray-400">·</span>
              Air Sign
              <span className="mx-2 text-gray-400">·</span>
              The Scales
            </p>
          </div>
        </section>

        {/* Section 3, About Tula. Two-column infographic. */}
        <section className="py-12 px-6" style={{ background: '#faf5ff' }}>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

              {/* LEFT COLUMN */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-purple-100 text-purple-700">
                    <Scale className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="font-heading font-bold text-2xl text-gray-900 leading-tight">
                      Tula Rashi
                    </div>
                    <div className="text-sm text-gray-500 italic">in Vedic Astrology</div>
                  </div>
                </div>

                {/* Card 1, intro */}
                <div className="bg-white p-4 rounded-xl flex gap-3" style={{ border: '1px solid #e9d5ff' }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-purple-100 text-purple-700">
                    <Scale className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed m-0">
                    Tula (Libra) is the <strong style={{ color: '#d97706' }}>seventh sign</strong> of
                    the Vedic zodiac, ruled by Shukra (Venus), the planet of beauty, harmony, and
                    relationships. As a <strong>cardinal air sign</strong>, Tula carries the energy
                    of balance, the force that weighs every option and seeks fairness in every
                    interaction.
                  </p>
                </div>

                {/* Card 2, The Diplomat */}
                <div className="bg-white p-4 rounded-xl flex gap-3" style={{ border: '1px solid #e9d5ff' }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-purple-100 text-purple-700">
                    <Sparkles className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base mb-1" style={{ color: '#7e22ce' }}>
                      The Diplomat
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed m-0">
                      In the Brihat Parashara Hora Shastra, Tula is described as a{' '}
                      <strong>rajasic sign</strong>, two-armed and ruled by Venus, associated with
                      trade, justice, and the refined art of negotiation.
                    </p>
                  </div>
                </div>

                {/* Card 3, Born to Balance */}
                <div className="bg-white p-4 rounded-xl flex gap-3" style={{ border: '1px solid #e9d5ff' }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-slate-900 text-white">
                    <Scale className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base text-gray-900 mb-1">
                      Born to Balance
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed m-0">
                      The Scales weigh before they act. Tula natives do not rush to judgement; they{' '}
                      <strong style={{ color: '#d97706' }}>consider</strong>, weigh, and adjust
                      until both sides of every question feel honoured.
                    </p>
                  </div>
                </div>

                {/* Card 4, Gifted with Grace */}
                <div className="bg-white p-4 rounded-xl flex gap-3" style={{ border: '1px solid #e9d5ff' }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-purple-100 text-purple-700">
                    <Heart className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base mb-1" style={{ color: '#7e22ce' }}>
                      Gifted with Grace
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed m-0">
                      Where other signs assert, Tula <strong>persuades</strong>. The finest
                      diplomats, mediators, and counsellors in any chart almost always carry strong
                      Tula influence in their houses of communication and partnership.
                    </p>
                  </div>
                </div>

                {/* Bottom card, Soul Infinity insight */}
                <div className="p-4 rounded-xl flex gap-3" style={{ background: '#f3e8ff', border: '1px solid #d8b4fe' }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-purple-200 text-purple-800">
                    <Star className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base mb-1" style={{ color: '#581c87' }}>
                      Soul Infinity Astrologers Insight
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed m-0 italic">
                      At Soul Infinity Astro Solutions, Saurabh Jain observes that Tula ascendants
                      and Moon sign natives often arrive at decisions requiring conviction, and
                      their chart invariably shows the planetary support for clear, decisive action
                      when balance has been honoured.
                    </p>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="lg:col-span-7 space-y-4">
                <img
                  src={QUICK_FACTS_URL}
                  alt="Tula Rashi Quick Facts Soul Infinity"
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

                {/* Venus rulership card */}
                <div className="bg-white p-4 rounded-xl" style={{ border: '1px solid #e9d5ff' }}>
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-purple-100 text-purple-700">
                      <Gem className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading font-bold text-base mb-1" style={{ color: '#7e22ce' }}>
                        Ruled by Shukra (Venus)
                      </h3>
                      <p className="text-sm text-gray-700 leading-relaxed m-0">
                        The ruling planet Shukra governs <strong>beauty</strong>,{' '}
                        <strong>diplomacy and relationships</strong>, <strong>art and music</strong>,{' '}
                        <strong>luxury</strong>, <strong>romance</strong>, and{' '}
                        <strong>aesthetic refinement</strong> in Vedic astrology.
                      </p>
                    </div>
                    <div className="hidden md:flex flex-col gap-1.5 text-purple-700/70 pt-1">
                      <Music className="w-4 h-4" aria-hidden="true" />
                      <Flower2 className="w-4 h-4" aria-hidden="true" />
                      <Gem className="w-4 h-4" aria-hidden="true" />
                      <Heart className="w-4 h-4" aria-hidden="true" />
                      <Scale className="w-4 h-4" aria-hidden="true" />
                    </div>
                  </div>
                </div>

                {/* Power and Potential card */}
                <div className="bg-white p-4 rounded-xl" style={{ border: '1px solid #e9d5ff' }}>
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
                          A well-placed Venus in a Tula chart amplifies{' '}
                          <strong style={{ color: '#d97706' }}>diplomatic gift</strong>, artistic
                          refinement, and the capacity to build harmonious partnerships.
                        </p>
                      </div>
                    </div>
                    <div className="rounded-lg p-3" style={{ background: '#faf5ff', border: '1px solid #d8b4fe' }}>
                      <p className="text-xs leading-relaxed m-0 italic" style={{ color: '#581c87' }}>
                        An afflicted Venus can bring indecision, dependence on approval, and
                        difficulty with commitment.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mahadasha Timing card */}
                <div className="bg-white p-4 rounded-xl flex gap-3" style={{ border: '1px solid #e9d5ff' }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-teal-100 text-teal-600">
                    <Clock className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base text-gray-900 mb-1">
                      Mahadasha Timing
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed m-0">
                      Understanding Venus placement, its dignity, aspects, and Mahadasha timing is
                      central to reading a Tula chart accurately.
                    </p>
                  </div>
                </div>

                {/* Vimshottari Dasha card */}
                <div className="bg-white p-5 rounded-xl" style={{ border: '1px solid #e9d5ff' }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-purple-100 text-purple-700">
                      <Star className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <h3 className="font-heading font-bold text-lg text-gray-900 m-0">
                      Vimshottari Dasha System
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 leading-relaxed">
                    <p className="m-0">
                      In the Vimshottari Dasha system, Tula natives often experience{' '}
                      <strong style={{ color: '#d97706' }}>twenty-year Venus Mahadasha</strong>{' '}
                      cycles that profoundly shape their relational and aesthetic life.
                    </p>
                    <p className="m-0">
                      The sign itself spans the last two padas of <strong>Chitra</strong>, all of{' '}
                      <strong>Swati</strong>, and the first three padas of{' '}
                      <strong>Vishakha</strong> nakshatras.
                    </p>
                  </div>

                  {/* Three nakshatra mini cards */}
                  <div className="grid grid-cols-3 gap-3 mt-4">
                    <div className="text-center p-3 rounded-lg" style={{ background: '#fee2e2', border: '1px solid #fecaca' }}>
                      <div className="w-9 h-9 mx-auto rounded-full flex items-center justify-center mb-2 bg-red-200 text-red-700">
                        <Star className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <div className="font-heading font-bold text-sm text-red-700">Chitra</div>
                      <div className="text-xs text-gray-600 mt-1">Brilliant artistry</div>
                    </div>
                    <div className="text-center p-3 rounded-lg" style={{ background: '#f3e8ff', border: '1px solid #d8b4fe' }}>
                      <div className="w-9 h-9 mx-auto rounded-full flex items-center justify-center mb-2 bg-purple-200 text-purple-700">
                        <Flower2 className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <div className="font-heading font-bold text-sm text-purple-700">Swati</div>
                      <div className="text-xs text-gray-600 mt-1">Independent grace</div>
                    </div>
                    <div className="text-center p-3 rounded-lg" style={{ background: '#fef3c7', border: '1px solid #fde68a' }}>
                      <div className="w-9 h-9 mx-auto rounded-full flex items-center justify-center mb-2 bg-amber-200 text-amber-700">
                        <Compass className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <div className="font-heading font-bold text-sm text-amber-700">Vishakha</div>
                      <div className="text-xs text-gray-600 mt-1">Focused purpose</div>
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
            ॐ शुं शुक्राय नमः
          </div>
          <div className="text-lg md:text-xl italic text-white mb-3">
            Om Shum Shukraya Namah
          </div>
          <div className="text-sm md:text-base text-gray-200 mb-6 max-w-xl mx-auto">
            Salutation to Shukra (Venus), the planet of harmony and beauty, ruler of Tula Rashi.
          </div>
          <div className="inline-block bg-amber-500 text-gray-900 px-5 py-2 rounded-full text-sm font-semibold shadow-md">
            Chant 108 times
            <span className="mx-2">·</span>
            Friday mornings, facing east
          </div>
        </div>
      </section>

      {/* Section 5, Strengths and Challenges. */}
      <section
        className="relative overflow-hidden"
        style={{ background: '#faf5ff', padding: '64px 24px' }}
      >
        {/* Faint Scales watermark */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            fontSize: '120px',
            opacity: 0.06,
            color: '#7e22ce',
            userSelect: 'none',
            lineHeight: 1,
          }}
        >
          ♎
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
                color: '#7e22ce',
                fontStyle: 'italic',
                lineHeight: 1.1,
                marginTop: '4px',
              }}
            >
              Tula Natives
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
              The harmonising air within, strengths that build bridges and challenges that test resolve.
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
                  background: 'linear-gradient(135deg, #581c87, #9333ea)',
                  padding: '20px 24px',
                }}
              >
                <div
                  className="bg-white rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ width: '52px', height: '52px' }}
                >
                  <ShieldCheck style={{ color: '#9333ea', width: '28px', height: '28px' }} aria-hidden="true" />
                </div>
                <h3 style={{ color: 'white', fontSize: '24px', fontWeight: 700, margin: 0 }}>
                  Strengths
                </h3>
              </div>

              <div className="bg-white divide-y divide-purple-50">
                {STRENGTH_ROWS.map((row) => {
                  const Icon = row.icon;
                  return (
                    <div
                      key={row.label}
                      className="flex items-center gap-3 hover:bg-purple-50 transition-colors"
                      style={{ padding: '14px 20px' }}
                    >
                      <div
                        className="rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ width: '40px', height: '40px', background: '#faf5ff' }}
                      >
                        <Icon style={{ color: '#9333ea', width: '20px', height: '20px' }} aria-hidden="true" />
                      </div>
                      <div
                        className="flex-1 font-bold text-gray-800"
                        style={{ fontSize: '15px' }}
                      >
                        {row.label}
                      </div>
                      <span style={{ color: '#e9d5ff', fontWeight: 400 }} aria-hidden="true">|</span>
                      <span
                        style={{ color: '#9333ea', fontWeight: 700 }}
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
            <Gem size={18} color="#7e22ce" aria-hidden="true" />
            <p style={{ fontSize: '14px', color: '#374151', margin: 0 }}>
              When guided with awareness, the grace of Tula becomes a{' '}
              <strong style={{ color: '#d97706' }}>force of harmony.</strong>
            </p>
            <span style={{ color: '#d97706', fontSize: '12px' }} aria-hidden="true">
              ✦ ✦ ✦
            </span>
          </div>
        </div>
      </section>

      {/* Section 6, Tula in the 12 Houses. */}
      <section className="py-16 px-6" style={{ background: '#faf5ff' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div
              className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4"
              style={{ background: '#f3e8ff', color: '#7e22ce' }}
            >
              <Target className="w-6 h-6" aria-hidden="true" />
            </div>
            <h2 className="font-heading font-bold text-3xl md:text-5xl mb-3 leading-tight">
              <span style={{ color: '#7e22ce' }}>Tula</span>
              <span style={{ color: '#1e3a5f' }}> in the 12 Houses</span>
            </h2>
            <div
              className="text-xs uppercase tracking-[0.25em] font-semibold mb-2"
              style={{ color: '#d97706' }}
            >
              How the Air of Tula Harmonises Each Bhava
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
              <Heart className="w-4 h-4" style={{ color: '#9333ea' }} aria-hidden="true" />
              <div
                className="h-px w-10"
                style={{ background: '#d97706', opacity: 0.4 }}
              />
            </div>
            <p className="text-sm text-gray-700 italic">
              Tula air harmonises every house it occupies, bringing{' '}
              <strong style={{ color: '#d97706' }}>grace, balance</strong> and the beauty of fair relation.
            </p>
          </div>
        </div>
      </section>

      {/* Section 7, Remedies. JSX card grid on deep violet. */}
      <section style={{ background: '#1a0a2e', padding: '64px 24px', position: 'relative' }}>
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
              Classical Vedic Remedies for Tula Rashi
            </h2>
            <p className="text-base" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Strengthen Shukra and align with Venus energy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { main: 'Chant the Shukra Beej mantra (Om Shum Shukraya Namah)', sub: '108 times on Friday mornings, facing east', highlight: 'Shukra Beej mantra' },
              { main: 'Wear Diamond or White Sapphire set in silver or platinum', sub: 'on the middle finger of the right hand, only after a chart-based recommendation', highlight: 'Diamond or White Sapphire' },
              { main: 'Donate white sweets, white cloth, silver, or white flowers', sub: 'on Fridays at a Lakshmi or Devi temple', highlight: 'white sweets, white cloth' },
              { main: 'Recite the Shukra Stotra or Lakshmi Ashtakam on Fridays', sub: 'for harmony in relationships and aesthetic refinement', highlight: 'Shukra Stotra or Lakshmi Ashtakam' },
              { main: 'Visit a Lakshmi or Devi temple on Fridays', sub: 'and offer white flowers, kheer, and incense', highlight: 'Lakshmi or Devi temple' },
              { main: 'Cultivate beauty, art, and harmonious relationships as conscious daily practice', sub: 'as a Venusian discipline that channels Shukra energy constructively', highlight: 'beauty, art' },
              { main: 'Reduce excessive people-pleasing and indecision', sub: 'during Venus-afflicted periods. Cultivate the courage to make a clear choice', highlight: 'excessive people-pleasing' },
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
        style={{ background: '#faf5ff' }}
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
              ♎
            </div>
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-3 leading-tight">
              <span style={{ color: '#1e3a5f' }}>Frequently Asked </span>
              <span style={{ color: '#7e22ce' }}>Questions</span>
            </h2>
            <p className="text-gray-600 text-base">
              Your top questions about Tula Rashi, answered with clarity
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
                    aria-controls={`tula-faq-${i}`}
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
                      id={`tula-faq-${i}`}
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
                            alt="Tula Rashi Scales zodiac symbol Soul Infinity"
                            width={120}
                            height={120}
                            loading="lazy"
                            style={{
                              width: '120px',
                              height: '120px',
                              borderRadius: '50%',
                              border: '2px solid #7e22ce',
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
      <section className="py-20 bg-gradient-to-r from-purple-900 to-violet-900 text-white relative overflow-hidden">
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
            Want a Personalised Tula Reading?
          </h2>
          <p className="text-xl text-purple-100 mb-8 leading-relaxed">
            Saurabh Jain at Soul Infinity Astro Solutions reads Tula placement in the context of
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
