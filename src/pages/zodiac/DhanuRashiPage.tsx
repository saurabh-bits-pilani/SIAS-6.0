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
  Crown,
  ChevronsRight,
  Timer,
  UserX,
  Clock,
  BookOpen,
  type LucideIcon,
} from 'lucide-react';
import SEOHead from '../../components/SEOHead';
import SchemaMarkup from '../../components/SchemaMarkup';
import Breadcrumbs from '../../components/Breadcrumbs';
import { getFaqPageSchemaFromList } from '../../data/schema-entities';

const HERO_URL =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Sagittarius/hero-banner-dhanu-rashi.webp';
const QUICK_FACTS_URL =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Sagittarius/quick-facts-dhanu-rashi.webp';
const MANTRA_BG_URL =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Sagittarius/mantra-bg-dhanu-rashi.webp';
const CARD_URL =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Sagittarius/dhanu-card.webp';

interface TraitRow {
  icon: LucideIcon;
  label: string;
}

const STRENGTH_ROWS: readonly TraitRow[] = [
  { icon: Compass, label: 'Philosophical and wise' },
  { icon: Globe, label: 'Adventurous and free' },
  { icon: Sparkles, label: 'Optimistic and expansive' },
  { icon: Heart, label: 'Generous and honest' },
  { icon: TrendingUp, label: 'Visionary and inspired' },
  { icon: Users, label: 'Natural teacher and guide' },
];

const CHALLENGE_ROWS: readonly TraitRow[] = [
  { icon: ChevronsRight, label: 'Tactless and blunt' },
  { icon: Timer, label: 'Restless and uncommitted' },
  { icon: UserX, label: 'Overconfident at times' },
  { icon: Clock, label: 'Avoids responsibility' },
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
  { num: '01', color: '#a16207', heading: 'LAGNA (SELF)',          icon: User,       desc: 'Athletic build, philosophical mind, love of freedom, Jupiter-blessed confidence',                       arrow: 'Expansion and truth are the core life drives' },
  { num: '02', color: '#d97706', heading: 'WEALTH & SPEECH',       icon: Coins,      desc: 'Philosophical and honest speech, wealth through teaching or foreign trade, generous family',           arrow: 'Abundance comes through optimism and generosity' },
  { num: '03', color: '#db2777', heading: 'COURAGE & SIBLINGS',    icon: Users,      desc: 'Broad-minded communication, adventurous siblings, long-distance travels for knowledge',                arrow: 'Courage expressed through the pursuit of truth' },
  { num: '04', color: '#7c3aed', heading: 'HOME & MOTHER',         icon: Home,       desc: 'Open and expansive home, philosophical mother, preference for large spaces and nature',                arrow: 'Home is wherever wisdom and freedom coexist' },
  { num: '05', color: '#db2777', heading: 'CHILDREN & CREATIVITY', icon: Star,       desc: 'Philosophical and athletic children, idealistic romance, creative teaching and writing',               arrow: 'Children become students of the world' },
  { num: '06', color: '#1d4ed8', heading: 'ENEMIES & SERVICE',     icon: Shield,     desc: 'Overcomes adversity through optimism and expansion',                                                   arrow: 'Teaching, law, medicine, or foreign service' },
  { num: '07', color: '#0f766e', heading: 'MARRIAGE & PARTNERS',   icon: Heart,      desc: 'Partner who shares love of freedom and philosophy, expansive business partnerships',                   arrow: 'Marriage as a philosophical journey together' },
  { num: '08', color: '#7c3aed', heading: 'TRANSFORMATION',        icon: Zap,        desc: 'Transformation through philosophy and long journeys, interest in higher occult wisdom',                arrow: 'Transformation through radical expansion of belief' },
  { num: '09', color: '#d97706', heading: 'DHARMA & FATHER',       icon: Compass,    desc: 'This is Dhanu natural house of dharma: powerful spiritual quest, wise father',                         arrow: 'Dharma as a lifelong pilgrimage of understanding' },
  { num: '10', color: '#1d4ed8', heading: 'CAREER & STATUS',       icon: TrendingUp, desc: 'Career in teaching, philosophy, law, foreign trade, publishing, or spiritual guidance',                arrow: 'Recognition through wisdom and vision' },
  { num: '11', color: '#a16207', heading: 'GAINS & FRIENDS',       icon: Users,      desc: 'Friends from diverse cultures and philosophies, gains through teaching and travel',                    arrow: 'Fulfilment through expansion of wisdom and reach' },
  { num: '12', color: '#0f766e', heading: 'LIBERATION & FOREIGN',  icon: Globe,      desc: 'Foreign lands are a second home, spiritual seeker, liberation through transcendence',                  arrow: 'Liberation through union with the universal Self' },
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
    q: 'What is Dhanu Rashi in Vedic astrology?',
    icon: HelpCircle,
    color: '#a16207',
    showImage: true,
    a: (
      <>
        Dhanu Rashi (Sagittarius) is the ninth sign of the Vedic sidereal zodiac, spanning 240 to
        270 degrees. It is a <strong style={{ color: '#d97706' }}>mutable fire sign</strong> ruled
        by <strong style={{ color: '#d97706' }}>Guru (Jupiter)</strong>, the planet of wisdom,
        expansion, and dharma. Natives with the Moon in Dhanu are philosophical, freedom-loving,
        and guided by an unshakeable optimism about the nature of life.
      </>
    ),
    aText:
      'Dhanu Rashi (Sagittarius) is the ninth sign of the Vedic sidereal zodiac, spanning 240 to 270 degrees. It is a mutable fire sign ruled by Guru (Jupiter), the planet of wisdom, expansion, and dharma. Natives with the Moon in Dhanu are philosophical, freedom-loving, and guided by an unshakeable optimism about the nature of life.',
  },
  {
    q: 'Who is the ruling planet of Dhanu Rashi?',
    icon: Globe,
    color: '#d97706',
    a: (
      <>
        Guru (Jupiter) is the ruling planet of Dhanu Rashi. Jupiter governs wisdom, dharma,
        teaching, children, wealth, and spiritual expansion. A strong Jupiter gives optimism,
        generosity, and philosophical insight. An afflicted Jupiter can bring overconfidence,
        excess, and laziness born of complacency.
      </>
    ),
    aText:
      'Guru (Jupiter) is the ruling planet of Dhanu Rashi. Jupiter governs wisdom, dharma, teaching, children, wealth, and spiritual expansion. A strong Jupiter gives optimism, generosity, and philosophical insight. An afflicted Jupiter can bring overconfidence, excess, and laziness born of complacency.',
  },
  {
    q: 'What are the personality traits of Dhanu Rashi natives?',
    icon: User,
    color: '#7c3aed',
    a: (
      <>
        Dhanu natives are enthusiastic, philosophically inclined, and deeply honest. They seek
        meaning in all experiences and are natural teachers who inspire others with their breadth
        of vision. Their challenge is consistency: the archer aims far but sometimes loses
        interest before the arrow lands. When Dhanu energy is combined with discipline, these
        natives become extraordinary guides, scholars, and explorers.
      </>
    ),
    aText:
      'Dhanu natives are enthusiastic, philosophically inclined, and deeply honest. They seek meaning in all experiences and are natural teachers who inspire others with their breadth of vision. Their challenge is consistency: the archer aims far but sometimes loses interest before the arrow lands. When Dhanu energy is combined with discipline, these natives become extraordinary guides, scholars, and explorers.',
  },
  {
    q: 'Which gemstone is recommended for Dhanu Rashi?',
    icon: Gem,
    color: '#1d4ed8',
    a: (
      <>
        Yellow Sapphire (Pukhraj) is the classical gemstone for Dhanu Rashi, worn to strengthen
        Guru (Jupiter). Set in gold, worn on the index finger of the right hand on a Thursday
        morning. A chart-based consultation with a qualified jyotishi at Soul Infinity Astro
        Solutions is essential before wearing any planetary gemstone.
      </>
    ),
    aText:
      'Yellow Sapphire (Pukhraj) is the classical gemstone for Dhanu Rashi, worn to strengthen Guru (Jupiter). Set in gold, worn on the index finger of the right hand on a Thursday morning. A chart-based consultation with a qualified jyotishi at Soul Infinity Astro Solutions is essential before wearing any planetary gemstone.',
  },
  {
    q: 'What are the lucky days and colours for Dhanu Rashi?',
    icon: Calendar,
    color: '#0f766e',
    a: (
      <>
        Thursday is the most auspicious day for Dhanu Rashi natives, governed by Guru (Jupiter).
        Yellow, orange, and purple are the lucky colours that resonate with Jupiter energy.
        Visiting Vishnu or Brihaspati temples on Thursdays, fasting, and wearing yellow on
        important days are traditional practices that support Dhanu natives in channelling Jupiter
        energy constructively.
      </>
    ),
    aText:
      'Thursday is the most auspicious day for Dhanu Rashi natives, governed by Guru (Jupiter). Yellow, orange, and purple are the lucky colours that resonate with Jupiter energy. Visiting Vishnu or Brihaspati temples on Thursdays, fasting, and wearing yellow on important days are traditional practices that support Dhanu natives in channelling Jupiter energy constructively.',
  },
];

const FAQS: ReadonlyArray<{ question: string; answer: string }> = FAQ_DATA.map((f) => ({
  question: f.q,
  answer: f.aText,
}));

export default function DhanuRashiPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <SEOHead
        title="Dhanu Rashi (Sagittarius), Traits, Mantra, Remedies | Soul Infinity"
        description="Dhanu Rashi (Sagittarius) in Vedic astrology, ruled by Guru (Jupiter). Personality traits, mantra, remedies, characteristics, and houses placement, guided by Saurabh Jain."
        keywords="dhanu rashi, sagittarius vedic astrology, guru, jupiter, sagittarius traits, dhanu mantra, yellow sapphire, pukhraj, dhanu remedies, soul infinity"
        image={HERO_URL}
        type="article"
        omitDefaultSchema
      />
      <SchemaMarkup
        type="webpage"
        webPage={{
          name: 'Dhanu Rashi (Sagittarius) in Vedic Astrology',
          description:
            'Dhanu Rashi, the ninth sign of the Vedic zodiac, ruled by Guru (Jupiter). Personality, mantra, remedies, and houses placement.',
          url: '/zodiac/sagittarius',
        }}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Zodiac Signs', url: '/zodiac' },
          { name: 'Dhanu (Sagittarius)', url: '/zodiac/sagittarius' },
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
          alt="Dhanu Rashi hero banner Soul Infinity Astro Solutions"
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
            { label: 'Dhanu (Sagittarius)' },
          ]}
        />
      </div>

      <div>
        {/* Section 2, Title strip. */}
        <section className="bg-white pt-2 pb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <p className="text-sm md:text-base tracking-[0.25em] uppercase text-yellow-800 font-semibold mb-2">
              <span className="font-devanagari" lang="sa">धनु राशि</span>
              <span className="mx-2 text-yellow-800/60">·</span>
              Sagittarius
            </p>
            <h1 className="font-heading font-bold text-3xl md:text-5xl text-gray-900 mb-2 leading-tight">
              Dhanu Rashi, The Philosopher of the Zodiac
            </h1>
            <p className="text-base md:text-lg text-gray-700">
              Ruled by Guru (Jupiter)
              <span className="mx-2 text-gray-400">·</span>
              Fire Sign
              <span className="mx-2 text-gray-400">·</span>
              The Archer
            </p>
          </div>
        </section>

        {/* Section 3, About Dhanu. Two-column infographic. */}
        <section className="py-12 px-6" style={{ background: '#fefce8' }}>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

              {/* LEFT COLUMN */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-yellow-100 text-yellow-800">
                    <Gem className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="font-heading font-bold text-2xl text-gray-900 leading-tight">
                      Dhanu Rashi
                    </div>
                    <div className="text-sm text-gray-500 italic">in Vedic Astrology</div>
                  </div>
                </div>

                {/* Card 1, intro */}
                <div className="bg-white p-4 rounded-xl flex gap-3" style={{ border: '1px solid #fde68a' }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-yellow-100 text-yellow-800">
                    <Sparkles className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed m-0">
                    Dhanu (Sagittarius) is the <strong style={{ color: '#d97706' }}>ninth sign</strong>{' '}
                    of the Vedic zodiac, ruled by Guru (Jupiter), the planet of wisdom, dharma, and
                    expansion. As a <strong>mutable fire sign</strong>, Dhanu carries the energy of
                    the seeker, an arrow released toward the highest truth, never content with
                    surface understanding.
                  </p>
                </div>

                {/* Card 2, The Philosopher */}
                <div className="bg-white p-4 rounded-xl flex gap-3" style={{ border: '1px solid #fde68a' }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-yellow-100 text-yellow-800">
                    <BookOpen className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base mb-1" style={{ color: '#92400e' }}>
                      The Philosopher
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed m-0">
                      In the Brihat Parashara Hora Shastra, Dhanu is described as a{' '}
                      <strong>Brahmin sign</strong>, associated with sacred knowledge, dharmic
                      teaching, and the disciplined pursuit of universal wisdom.
                    </p>
                  </div>
                </div>

                {/* Card 3, Born to Seek */}
                <div className="bg-white p-4 rounded-xl flex gap-3" style={{ border: '1px solid #fde68a' }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-slate-900 text-white">
                    <Target className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base text-gray-900 mb-1">
                      Born to Seek
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed m-0">
                      The Archer aims at distant horizons. Dhanu natives do not settle for the
                      familiar; they <strong style={{ color: '#d97706' }}>expand</strong>, journey
                      after journey, until their inner vision matches the breadth of the world they
                      have traversed.
                    </p>
                  </div>
                </div>

                {/* Card 4, Gifted with Vision */}
                <div className="bg-white p-4 rounded-xl flex gap-3" style={{ border: '1px solid #fde68a' }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-yellow-100 text-yellow-800">
                    <Compass className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base mb-1" style={{ color: '#92400e' }}>
                      Gifted with Vision
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed m-0">
                      Where other signs build, Dhanu{' '}
                      <strong>illuminates</strong>. Dhanu natives are natural teachers, guides, and
                      visionaries whose words tend to outlive them.
                    </p>
                  </div>
                </div>

                {/* Bottom card, Soul Infinity insight */}
                <div className="p-4 rounded-xl flex gap-3" style={{ background: '#fef9c3', border: '1px solid #fde68a' }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-yellow-200 text-yellow-800">
                    <Star className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base mb-1" style={{ color: '#713f12' }}>
                      Soul Infinity Astrologers Insight
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed m-0 italic">
                      At Soul Infinity Astro Solutions, Saurabh Jain observes that Dhanu ascendants
                      and Moon sign natives often arrive at decisions that involve travel,
                      teaching, or higher study, and their chart invariably shows the planetary
                      support for an expansive, dharmic path when Jupiter is well-placed.
                    </p>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="lg:col-span-7 space-y-4">
                <img
                  src={QUICK_FACTS_URL}
                  alt="Dhanu Rashi Quick Facts Soul Infinity"
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
                <div className="bg-white p-4 rounded-xl" style={{ border: '1px solid #fde68a' }}>
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-yellow-100 text-yellow-800">
                      <Sparkles className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading font-bold text-base mb-1" style={{ color: '#92400e' }}>
                        Ruled by Guru (Jupiter)
                      </h3>
                      <p className="text-sm text-gray-700 leading-relaxed m-0">
                        The ruling planet Guru governs <strong>wisdom</strong>,{' '}
                        <strong>dharma and teaching</strong>, <strong>higher learning</strong>,{' '}
                        <strong>children</strong>, <strong>spirituality</strong>, and{' '}
                        <strong>good fortune</strong> in Vedic astrology.
                      </p>
                    </div>
                    <div className="hidden md:flex flex-col gap-1.5 text-yellow-800/70 pt-1">
                      <BookOpen className="w-4 h-4" aria-hidden="true" />
                      <Compass className="w-4 h-4" aria-hidden="true" />
                      <Sparkles className="w-4 h-4" aria-hidden="true" />
                      <Globe className="w-4 h-4" aria-hidden="true" />
                      <Crown className="w-4 h-4" aria-hidden="true" />
                    </div>
                  </div>
                </div>

                {/* Power and Potential card */}
                <div className="bg-white p-4 rounded-xl" style={{ border: '1px solid #fde68a' }}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                    <div className="md:col-span-2 flex gap-3">
                      <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-purple-100 text-purple-700">
                        <Target className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-base text-gray-900 mb-1">
                          Power and Potential
                        </h3>
                        <p className="text-sm text-gray-700 leading-relaxed m-0">
                          A well-placed Jupiter in a Dhanu chart amplifies{' '}
                          <strong style={{ color: '#d97706' }}>philosophical insight</strong>,
                          dharmic clarity, and the capacity to teach and inspire across cultures.
                        </p>
                      </div>
                    </div>
                    <div className="rounded-lg p-3" style={{ background: '#fefce8', border: '1px solid #fde68a' }}>
                      <p className="text-xs leading-relaxed m-0 italic" style={{ color: '#713f12' }}>
                        An afflicted Jupiter can bring overconfidence, excess, scattered idealism,
                        and a tendency to preach rather than practise.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mahadasha Timing card */}
                <div className="bg-white p-4 rounded-xl flex gap-3" style={{ border: '1px solid #fde68a' }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-purple-100 text-purple-700">
                    <Clock className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base text-gray-900 mb-1">
                      Mahadasha Timing
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed m-0">
                      Understanding Jupiter placement, its dignity, aspects, and Mahadasha timing
                      is central to reading a Dhanu chart accurately.
                    </p>
                  </div>
                </div>

                {/* Vimshottari Dasha card */}
                <div className="bg-white p-5 rounded-xl" style={{ border: '1px solid #fde68a' }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-yellow-100 text-yellow-800">
                      <Star className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <h3 className="font-heading font-bold text-lg text-gray-900 m-0">
                      Vimshottari Dasha System
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 leading-relaxed">
                    <p className="m-0">
                      In the Vimshottari Dasha system, Dhanu natives often experience{' '}
                      <strong style={{ color: '#d97706' }}>sixteen-year Jupiter Mahadasha</strong>{' '}
                      cycles that profoundly shape their philosophical and dharmic path in life.
                    </p>
                    <p className="m-0">
                      The sign itself spans the last pada of <strong>Mula</strong>, all of{' '}
                      <strong>Purva Ashadha</strong>, and the first three padas of{' '}
                      <strong>Uttara Ashadha</strong> nakshatras.
                    </p>
                  </div>

                  {/* Three nakshatra mini cards */}
                  <div className="grid grid-cols-3 gap-3 mt-4">
                    <div className="text-center p-3 rounded-lg" style={{ background: '#fee2e2', border: '1px solid #fecaca' }}>
                      <div className="w-9 h-9 mx-auto rounded-full flex items-center justify-center mb-2 bg-red-200 text-red-700">
                        <Star className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <div className="font-heading font-bold text-sm text-red-700">Mula</div>
                      <div className="text-xs text-gray-600 mt-1">Root and seeking</div>
                    </div>
                    <div className="text-center p-3 rounded-lg" style={{ background: '#fef9c3', border: '1px solid #fde68a' }}>
                      <div className="w-9 h-9 mx-auto rounded-full flex items-center justify-center mb-2 bg-yellow-200 text-yellow-800">
                        <Sparkles className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <div className="font-heading font-bold text-sm text-yellow-800">Purva Ashadha</div>
                      <div className="text-xs text-gray-600 mt-1">Invincible truth</div>
                    </div>
                    <div className="text-center p-3 rounded-lg" style={{ background: '#ede9fe', border: '1px solid #ddd6fe' }}>
                      <div className="w-9 h-9 mx-auto rounded-full flex items-center justify-center mb-2 bg-purple-200 text-purple-700">
                        <Compass className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <div className="font-heading font-bold text-sm text-purple-700">Uttara Ashadha</div>
                      <div className="text-xs text-gray-600 mt-1">Lasting victory</div>
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
            Om Graam Greem Graum Sah Guruve Namah
          </div>
          <div className="text-sm md:text-base text-gray-200 mb-6 max-w-xl mx-auto">
            Salutation to Guru (Jupiter), the planet of wisdom and dharma, ruler of Dhanu Rashi.
          </div>
          <div className="inline-block bg-amber-500 text-gray-900 px-5 py-2 rounded-full text-sm font-semibold shadow-md">
            Chant 108 times
            <span className="mx-2">·</span>
            Thursday mornings, facing north-east
          </div>
        </div>
      </section>

      {/* Section 5, Strengths and Challenges. */}
      <section
        className="relative overflow-hidden"
        style={{ background: '#fefce8', padding: '64px 24px' }}
      >
        {/* Faint Archer watermark */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            fontSize: '120px',
            opacity: 0.06,
            color: '#a16207',
            userSelect: 'none',
            lineHeight: 1,
          }}
        >
          ♐
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
                color: '#92400e',
                fontStyle: 'italic',
                lineHeight: 1.1,
                marginTop: '4px',
              }}
            >
              Dhanu Natives
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
              The fire of the seeker within, strengths that expand horizons and challenges that test commitment.
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
                  background: 'linear-gradient(135deg, #78350f, #a16207)',
                  padding: '20px 24px',
                }}
              >
                <div
                  className="bg-white rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ width: '52px', height: '52px' }}
                >
                  <ShieldCheck style={{ color: '#a16207', width: '28px', height: '28px' }} aria-hidden="true" />
                </div>
                <h3 style={{ color: 'white', fontSize: '24px', fontWeight: 700, margin: 0 }}>
                  Strengths
                </h3>
              </div>

              <div className="bg-white divide-y divide-yellow-50">
                {STRENGTH_ROWS.map((row) => {
                  const Icon = row.icon;
                  return (
                    <div
                      key={row.label}
                      className="flex items-center gap-3 hover:bg-yellow-50 transition-colors"
                      style={{ padding: '14px 20px' }}
                    >
                      <div
                        className="rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ width: '40px', height: '40px', background: '#fef9c3' }}
                      >
                        <Icon style={{ color: '#a16207', width: '20px', height: '20px' }} aria-hidden="true" />
                      </div>
                      <div
                        className="flex-1 font-bold text-gray-800"
                        style={{ fontSize: '15px' }}
                      >
                        {row.label}
                      </div>
                      <span style={{ color: '#fde68a', fontWeight: 400 }} aria-hidden="true">|</span>
                      <span
                        style={{ color: '#a16207', fontWeight: 700 }}
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
                  background: 'linear-gradient(135deg, #581c87, #7c3aed)',
                  padding: '20px 24px',
                }}
              >
                <div
                  className="bg-white rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ width: '52px', height: '52px' }}
                >
                  <AlertTriangle style={{ color: '#7c3aed', width: '28px', height: '28px' }} aria-hidden="true" />
                </div>
                <h3 style={{ color: 'white', fontSize: '24px', fontWeight: 700, margin: 0 }}>
                  Challenges
                </h3>
              </div>

              <div className="bg-white divide-y divide-purple-50">
                {CHALLENGE_ROWS.map((row) => {
                  const Icon = row.icon;
                  return (
                    <div
                      key={row.label}
                      className="flex items-center gap-3 hover:bg-purple-50 transition-colors"
                      style={{ padding: '14px 20px' }}
                    >
                      <div
                        className="rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ width: '40px', height: '40px', background: '#ede9fe' }}
                      >
                        <Icon style={{ color: '#7c3aed', width: '20px', height: '20px' }} aria-hidden="true" />
                      </div>
                      <div
                        className="flex-1 font-bold text-gray-800"
                        style={{ fontSize: '15px' }}
                      >
                        {row.label}
                      </div>
                      <span style={{ color: '#ddd6fe', fontWeight: 400 }} aria-hidden="true">|</span>
                      <span
                        style={{ color: '#7c3aed', fontWeight: 700 }}
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
            <Compass size={18} color="#a16207" aria-hidden="true" />
            <p style={{ fontSize: '14px', color: '#374151', margin: 0 }}>
              When guided with awareness, the wisdom of Dhanu becomes a{' '}
              <strong style={{ color: '#d97706' }}>compass for many lives.</strong>
            </p>
            <span style={{ color: '#d97706', fontSize: '12px' }} aria-hidden="true">
              ✦ ✦ ✦
            </span>
          </div>
        </div>
      </section>

      {/* Section 6, Dhanu in the 12 Houses. */}
      <section className="py-16 px-6" style={{ background: '#fefce8' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div
              className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4"
              style={{ background: '#fef9c3', color: '#a16207' }}
            >
              <Target className="w-6 h-6" aria-hidden="true" />
            </div>
            <h2 className="font-heading font-bold text-3xl md:text-5xl mb-3 leading-tight">
              <span style={{ color: '#a16207' }}>Dhanu</span>
              <span style={{ color: '#1e3a5f' }}> in the 12 Houses</span>
            </h2>
            <div
              className="text-xs uppercase tracking-[0.25em] font-semibold mb-2"
              style={{ color: '#d97706' }}
            >
              How the Fire of Dhanu Illuminates Each Bhava
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
              <Compass className="w-4 h-4" style={{ color: '#a16207' }} aria-hidden="true" />
              <div
                className="h-px w-10"
                style={{ background: '#d97706', opacity: 0.4 }}
              />
            </div>
            <p className="text-sm text-gray-700 italic">
              Dhanu fire expands every house it illuminates, bringing{' '}
              <strong style={{ color: '#d97706' }}>wisdom, freedom</strong> and the arrow of truth.
            </p>
          </div>
        </div>
      </section>

      {/* Section 7, Remedies. JSX card grid on dark saffron-black. */}
      <section style={{ background: '#1a1000', padding: '64px 24px', position: 'relative' }}>
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
              Classical Vedic Remedies for Dhanu Rashi
            </h2>
            <p className="text-base" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Strengthen Guru and align with Jupiter energy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { main: 'Chant the Guru Beej mantra (Om Graam Greem Graum Sah Guruve Namah)', sub: '108 times on Thursday mornings', highlight: 'Guru Beej mantra' },
              { main: 'Wear Yellow Sapphire (Pukhraj) set in gold on the index finger of the right hand', sub: 'only after a chart-based recommendation from a qualified jyotishi', highlight: 'Yellow Sapphire (Pukhraj)' },
              { main: 'Donate yellow lentils, turmeric, yellow cloth, or gold', sub: 'on Thursdays at a Vishnu or Brihaspati temple', highlight: 'yellow lentils, turmeric' },
              { main: 'Recite the Vishnu Sahasranama or Guru Stotra on Thursdays', sub: 'for dharmic clarity, expansion, and spiritual growth', highlight: 'Vishnu Sahasranama or Guru Stotra' },
              { main: 'Visit a Vishnu or Brihaspati temple on Thursdays', sub: 'and offer yellow flowers, gram lentils, and incense', highlight: 'Vishnu or Brihaspati temple' },
              { main: 'Engage in teaching, learning, or philosophical study as a daily practice', sub: 'as a conscious discipline that channels Guru energy constructively', highlight: 'teaching, learning' },
              { main: 'Reduce overconfidence, excess, and scattered idealism', sub: 'during Jupiter-afflicted periods. Cultivate disciplined commitment over endless seeking', highlight: 'overconfidence, excess' },
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
        style={{ background: '#fefce8' }}
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
              ♐
            </div>
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-3 leading-tight">
              <span style={{ color: '#1e3a5f' }}>Frequently Asked </span>
              <span style={{ color: '#a16207' }}>Questions</span>
            </h2>
            <p className="text-gray-600 text-base">
              Your top questions about Dhanu Rashi, answered with clarity
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
                    aria-controls={`dhanu-faq-${i}`}
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
                      id={`dhanu-faq-${i}`}
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
                            alt="Dhanu Rashi Archer zodiac symbol Soul Infinity"
                            width={120}
                            height={120}
                            loading="lazy"
                            style={{
                              width: '120px',
                              height: '120px',
                              borderRadius: '50%',
                              border: '2px solid #a16207',
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
      <section className="py-20 bg-gradient-to-r from-yellow-900 to-orange-900 text-white relative overflow-hidden">
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
            Want a Personalised Dhanu Reading?
          </h2>
          <p className="text-xl text-yellow-100 mb-8 leading-relaxed">
            Saurabh Jain at Soul Infinity Astro Solutions reads Dhanu placement in the context of
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
