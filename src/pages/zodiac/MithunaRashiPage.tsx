import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ArrowRight,
  ChevronDown,
  AlertTriangle,
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
  Crown,
  ChevronsRight,
  Timer,
  UserX,
  Clock,
  Sparkles,
  BookOpen,
  MessageCircle,
  type LucideIcon,
} from 'lucide-react';
import SEOHead from '../../components/SEOHead';
import SchemaMarkup from '../../components/SchemaMarkup';
import Breadcrumbs from '../../components/Breadcrumbs';
import { getFaqPageSchemaFromList } from '../../data/schema-entities';

const HERO_URL =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Gemini/hero-banner-mithuna-rashi.webp';
const QUICK_FACTS_URL =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Gemini/quick-facts-mithuna-rashi.webp';
const MANTRA_BG_URL =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Gemini/mantra-bg-mithuna-rashi.webp';
const CARD_URL =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Gemini/mithuna-card.webp';

interface TraitRow {
  icon: LucideIcon;
  label: string;
}

const STRENGTH_ROWS: readonly TraitRow[] = [
  { icon: Zap, label: 'Quick-witted and sharp' },
  { icon: Globe, label: 'Adaptable and versatile' },
  { icon: Users, label: 'Charming communicator' },
  { icon: Sparkles, label: 'Curious and inventive' },
  { icon: Heart, label: 'Warm and sociable' },
  { icon: TrendingUp, label: 'Resourceful under pressure' },
];

const CHALLENGE_ROWS: readonly TraitRow[] = [
  { icon: ChevronsRight, label: 'Inconsistent and scattered' },
  { icon: Timer, label: 'Restless and indecisive' },
  { icon: UserX, label: 'Superficial at times' },
  { icon: Clock, label: 'Avoids deep commitment' },
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
  { num: '01', color: '#ca8a04', heading: 'LAGNA (SELF)',          icon: User,       desc: 'Intelligent, talkative, youthful appearance, curious by nature',                            arrow: 'Communication shapes every life path' },
  { num: '02', color: '#d97706', heading: 'WEALTH & SPEECH',       icon: Coins,      desc: 'Eloquent speech, wealth through writing or trade, family with diverse opinions',           arrow: 'Multiple income streams favoured' },
  { num: '03', color: '#db2777', heading: 'COURAGE & SIBLINGS',    icon: Users,      desc: 'Skilled writer and speaker, witty siblings, frequent short travels',                       arrow: 'Communication is the primary tool of courage' },
  { num: '04', color: '#7c3aed', heading: 'HOME & MOTHER',         icon: Home,       desc: 'Intellectually stimulating home, curious mother, multiple residences possible',             arrow: 'Home fills with books, conversation, and variety' },
  { num: '05', color: '#db2777', heading: 'CHILDREN & CREATIVITY', icon: Star,       desc: 'Clever children, playful romance, creative expression through words and ideas',             arrow: 'Intelligence applied to art and performance' },
  { num: '06', color: '#1d4ed8', heading: 'ENEMIES & SERVICE',     icon: Shield,     desc: 'Overcomes challenges through wit and negotiation',                                          arrow: 'Careers in communication, medicine, or analysis' },
  { num: '07', color: '#0f766e', heading: 'MARRIAGE & PARTNERS',   icon: Heart,      desc: 'Intellectual spouse, partnerships built on mental rapport and shared curiosity',            arrow: 'Business partnerships in media or trade' },
  { num: '08', color: '#7c3aed', heading: 'TRANSFORMATION',        icon: Zap,        desc: 'Sudden changes, interest in research and hidden knowledge, gains through inheritance',      arrow: 'Transformation through mental reinvention' },
  { num: '09', color: '#d97706', heading: 'DHARMA & FATHER',       icon: Compass,    desc: 'Philosophical father, faith expressed through knowledge, long pilgrimages for learning',   arrow: 'Dharma found in teaching and inquiry' },
  { num: '10', color: '#1d4ed8', heading: 'CAREER & STATUS',       icon: TrendingUp, desc: 'Career in writing, media, education, IT, commerce, or public speaking',                    arrow: 'Recognition through intellectual mastery' },
  { num: '11', color: '#ca8a04', heading: 'GAINS & FRIENDS',       icon: Users,      desc: 'Wide social network, friends in intellectual and business circles',                        arrow: 'Gains through multiple simultaneous ventures' },
  { num: '12', color: '#0f766e', heading: 'LIBERATION & FOREIGN',  icon: Globe,      desc: 'Intellectual pilgrim, hidden anxieties, foreign travel for knowledge and trade',            arrow: 'Liberation through silencing the restless mind' },
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
    q: 'What is Mithuna Rashi in Vedic astrology?',
    icon: HelpCircle,
    color: '#ca8a04',
    showImage: true,
    a: (
      <>
        Mithuna Rashi (Gemini) is the third sign of the Vedic sidereal zodiac, spanning 60 to 90
        degrees. It is a <strong style={{ color: '#d97706' }}>mutable air sign</strong> ruled by{' '}
        <strong style={{ color: '#d97706' }}>Budha (Mercury)</strong>, the planet of intellect,
        communication, and commerce. Natives with the Moon in Mithuna are quick-minded, adaptable,
        and gifted with language and social ease.
      </>
    ),
    aText:
      'Mithuna Rashi (Gemini) is the third sign of the Vedic sidereal zodiac, spanning 60 to 90 degrees. It is a mutable air sign ruled by Budha (Mercury), the planet of intellect, communication, and commerce. Natives with the Moon in Mithuna are quick-minded, adaptable, and gifted with language and social ease.',
  },
  {
    q: 'Who is the ruling planet of Mithuna Rashi?',
    icon: Globe,
    color: '#d97706',
    a: (
      <>
        Budha (Mercury) is the ruling planet of Mithuna Rashi. Mercury governs intelligence, speech,
        writing, trade, mathematics, and the nervous system. A strong Mercury amplifies wit,
        business acumen, and communication skill. A weak or afflicted Mercury can bring indecision,
        nervous anxiety, and scattered thinking.
      </>
    ),
    aText:
      'Budha (Mercury) is the ruling planet of Mithuna Rashi. Mercury governs intelligence, speech, writing, trade, mathematics, and the nervous system. A strong Mercury amplifies wit, business acumen, and communication skill. A weak or afflicted Mercury can bring indecision, nervous anxiety, and scattered thinking.',
  },
  {
    q: 'What are the personality traits of Mithuna Rashi natives?',
    icon: User,
    color: '#7c3aed',
    a: (
      <>
        Mithuna natives are curious, articulate, and socially gifted. They adapt effortlessly to new
        environments and thrive on variety and mental stimulation. Their challenge is depth, the
        same restlessness that makes them brilliant communicators can prevent them from committing
        fully to one path or one person.
      </>
    ),
    aText:
      'Mithuna natives are curious, articulate, and socially gifted. They adapt effortlessly to new environments and thrive on variety and mental stimulation. Their challenge is depth, the same restlessness that makes them brilliant communicators can prevent them from committing fully to one path or one person.',
  },
  {
    q: 'Which gemstone is recommended for Mithuna Rashi?',
    icon: Gem,
    color: '#1d4ed8',
    a: (
      <>
        Emerald (Panna) is the classical gemstone for Mithuna Rashi, worn to strengthen Budha
        (Mercury). It should be set in gold and worn on the little finger of the right hand on a
        Wednesday morning after proper mantra invocation. A chart-based consultation with a
        qualified jyotishi at Soul Infinity Astro Solutions is essential before wearing any
        planetary gemstone.
      </>
    ),
    aText:
      'Emerald (Panna) is the classical gemstone for Mithuna Rashi, worn to strengthen Budha (Mercury). It should be set in gold and worn on the little finger of the right hand on a Wednesday morning after proper mantra invocation. A chart-based consultation with a qualified jyotishi at Soul Infinity Astro Solutions is essential before wearing any planetary gemstone.',
  },
  {
    q: 'What are the lucky days and colours for Mithuna Rashi?',
    icon: Calendar,
    color: '#0f766e',
    a: (
      <>
        Wednesday is the most auspicious day for Mithuna Rashi natives, governed by Budha (Mercury).
        Green and yellow are the lucky colours. Fasting on Wednesdays, reading sacred texts, and
        wearing green on important occasions are traditional supportive practices that help Mithuna
        natives channel Mercury energy constructively.
      </>
    ),
    aText:
      'Wednesday is the most auspicious day for Mithuna Rashi natives, governed by Budha (Mercury). Green and yellow are the lucky colours. Fasting on Wednesdays, reading sacred texts, and wearing green on important occasions are traditional supportive practices that help Mithuna natives channel Mercury energy constructively.',
  },
];

const FAQS: ReadonlyArray<{ question: string; answer: string }> = FAQ_DATA.map((f) => ({
  question: f.q,
  answer: f.aText,
}));

export default function MithunaRashiPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <SEOHead
        title="Mithuna Rashi (Gemini), Traits, Mantra, Remedies | Soul Infinity"
        description="Mithuna Rashi (Gemini) in Vedic astrology, ruled by Budha (Mercury). Personality traits, mantra, remedies, characteristics, and houses placement, guided by Saurabh Jain."
        keywords="mithuna rashi, gemini vedic astrology, budha, mercury, gemini traits, mithuna mantra, emerald, panna, mithuna remedies, soul infinity"
        image={HERO_URL}
        type="article"
        omitDefaultSchema
      />
      <SchemaMarkup
        type="webpage"
        webPage={{
          name: 'Mithuna Rashi (Gemini) in Vedic Astrology',
          description:
            'Mithuna Rashi, the third sign of the Vedic zodiac, ruled by Budha (Mercury). Personality, mantra, remedies, and houses placement.',
          url: '/zodiac/gemini',
        }}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Zodiac Signs', url: '/zodiac' },
          { name: 'Mithuna (Gemini)', url: '/zodiac/gemini' },
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
          alt="Mithuna Rashi hero banner Soul Infinity Astro Solutions"
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
            { label: 'Mithuna (Gemini)' },
          ]}
        />
      </div>

      <div>
        {/* Section 2, Title strip. */}
        <section className="bg-white pt-2 pb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <p className="text-sm md:text-base tracking-[0.25em] uppercase text-yellow-700 font-semibold mb-2">
              <span className="font-devanagari" lang="sa">मिथुन राशि</span>
              <span className="mx-2 text-yellow-700/60">·</span>
              Gemini
            </p>
            <h1 className="font-heading font-bold text-3xl md:text-5xl text-gray-900 mb-2 leading-tight">
              Mithuna Rashi, The Communicator of the Zodiac
            </h1>
            <p className="text-base md:text-lg text-gray-700">
              Ruled by Budha (Mercury)
              <span className="mx-2 text-gray-400">·</span>
              Air Sign
              <span className="mx-2 text-gray-400">·</span>
              The Twins
            </p>
          </div>
        </section>

        {/* Section 3, About Mithuna. Two-column infographic. */}
        <section className="py-12 px-6" style={{ background: '#fefce8' }}>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

              {/* LEFT COLUMN */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-yellow-100 text-yellow-700">
                    <Gem className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="font-heading font-bold text-2xl text-gray-900 leading-tight">
                      Mithuna Rashi
                    </div>
                    <div className="text-sm text-gray-500 italic">in Vedic Astrology</div>
                  </div>
                </div>

                {/* Card 1, intro */}
                <div className="bg-white p-4 rounded-xl flex gap-3" style={{ border: '1px solid #fde68a' }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-yellow-100 text-yellow-700">
                    <Gem className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed m-0">
                    Mithuna (Gemini) is the <strong style={{ color: '#d97706' }}>third sign</strong> of
                    the Vedic zodiac, ruled by Budha (Mercury), the planet of intellect, speech, and
                    commerce. As a <strong>mutable air sign</strong>, Mithuna carries the energy of
                    exchange, the force that connects, questions, and adapts.
                  </p>
                </div>

                {/* Card 2, The Communicator */}
                <div className="bg-white p-4 rounded-xl flex gap-3" style={{ border: '1px solid #fde68a' }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-yellow-100 text-yellow-700">
                    <MessageCircle className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base mb-1" style={{ color: '#a16207' }}>
                      The Communicator
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed m-0">
                      In the Brihat Parashara Hora Shastra, Mithuna is described as a sign of{' '}
                      <strong>dual nature</strong>, embodying the capacity to hold two perspectives
                      and find the bridge between them.
                    </p>
                  </div>
                </div>

                {/* Card 3, Born Curious */}
                <div className="bg-white p-4 rounded-xl flex gap-3" style={{ border: '1px solid #fde68a' }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-slate-900 text-white">
                    <Sparkles className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base text-gray-900 mb-1">
                      Born Curious
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed m-0">
                      The Twins move through the world gathering, sorting, and{' '}
                      <strong style={{ color: '#d97706' }}>sharing information</strong>. Where Mesha
                      acts and Vrishabha builds, Mithuna connects.
                    </p>
                  </div>
                </div>

                {/* Card 4, Gifted with Words */}
                <div className="bg-white p-4 rounded-xl flex gap-3" style={{ border: '1px solid #fde68a' }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-yellow-100 text-yellow-700">
                    <BookOpen className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base mb-1" style={{ color: '#a16207' }}>
                      Gifted with Words
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed m-0">
                      Mithuna natives are the natural <strong>teachers, writers</strong>, and traders
                      of the zodiac. Their greatest gift is the ability to make any idea accessible
                      to any audience.
                    </p>
                  </div>
                </div>

                {/* Bottom card, Soul Infinity insight */}
                <div className="p-4 rounded-xl flex gap-3" style={{ background: '#fef9c3', border: '1px solid #fde68a' }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-yellow-200 text-yellow-800">
                    <Star className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base mb-1" style={{ color: '#854d0e' }}>
                      Soul Infinity Astrologers Insight
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed m-0 italic">
                      At Soul Infinity Astro Solutions, Saurabh Jain observes that Mithuna ascendants
                      and Moon sign natives often arrive seeking clarity amid mental abundance, and
                      their chart invariably reveals where Mercury can be focused into one
                      meaningful path.
                    </p>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="lg:col-span-7 space-y-4">
                <img
                  src={QUICK_FACTS_URL}
                  alt="Mithuna Rashi Quick Facts Soul Infinity"
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

                {/* Mercury rulership card */}
                <div className="bg-white p-4 rounded-xl" style={{ border: '1px solid #fde68a' }}>
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-yellow-100 text-yellow-700">
                      <Gem className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading font-bold text-base mb-1" style={{ color: '#a16207' }}>
                        Ruled by Budha (Mercury)
                      </h3>
                      <p className="text-sm text-gray-700 leading-relaxed m-0">
                        The ruling planet Budha governs <strong>intellect</strong>,{' '}
                        <strong>speech and writing</strong>, <strong>trade</strong>,{' '}
                        <strong>mathematics</strong>, and the <strong>nervous system</strong> in
                        Vedic astrology.
                      </p>
                    </div>
                    <div className="hidden md:flex flex-col gap-1.5 text-yellow-700/70 pt-1">
                      <BookOpen className="w-4 h-4" aria-hidden="true" />
                      <MessageCircle className="w-4 h-4" aria-hidden="true" />
                      <Globe className="w-4 h-4" aria-hidden="true" />
                      <Coins className="w-4 h-4" aria-hidden="true" />
                      <Sparkles className="w-4 h-4" aria-hidden="true" />
                    </div>
                  </div>
                </div>

                {/* Power and Potential card */}
                <div className="bg-white p-4 rounded-xl" style={{ border: '1px solid #fde68a' }}>
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
                          A well-placed Mercury in a Mithuna chart amplifies{' '}
                          <strong style={{ color: '#d97706' }}>intellectual brilliance</strong>,
                          business acumen, and the capacity to communicate across boundaries.
                        </p>
                      </div>
                    </div>
                    <div className="rounded-lg p-3" style={{ background: '#fefce8', border: '1px solid #fde68a' }}>
                      <p className="text-xs leading-relaxed m-0 italic" style={{ color: '#854d0e' }}>
                        An afflicted Mercury can bring nervous anxiety, scattered focus, and a
                        tendency to live in the head rather than the heart.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mahadasha Timing card */}
                <div className="bg-white p-4 rounded-xl flex gap-3" style={{ border: '1px solid #fde68a' }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-teal-100 text-teal-600">
                    <Clock className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base text-gray-900 mb-1">
                      Mahadasha Timing
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed m-0">
                      Understanding Mercury placement, its dignity, aspects, and Mahadasha timing is
                      central to reading a Mithuna chart accurately.
                    </p>
                  </div>
                </div>

                {/* Vimshottari Dasha card */}
                <div className="bg-white p-5 rounded-xl" style={{ border: '1px solid #fde68a' }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-yellow-100 text-yellow-700">
                      <Star className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <h3 className="font-heading font-bold text-lg text-gray-900 m-0">
                      Vimshottari Dasha System
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 leading-relaxed">
                    <p className="m-0">
                      In the Vimshottari Dasha system, Mithuna natives often experience{' '}
                      <strong style={{ color: '#d97706' }}>seventeen-year Mercury Mahadasha</strong>{' '}
                      cycles that profoundly shape their intellectual and commercial life.
                    </p>
                    <p className="m-0">
                      The sign itself spans the last two padas of <strong>Mrigashira</strong>,
                      all of <strong>Ardra</strong>, and the first three padas of{' '}
                      <strong>Punarvasu</strong> nakshatras.
                    </p>
                  </div>

                  {/* Three nakshatra mini cards */}
                  <div className="grid grid-cols-3 gap-3 mt-4">
                    <div className="text-center p-3 rounded-lg" style={{ background: '#fef3c7', border: '1px solid #fde68a' }}>
                      <div className="w-9 h-9 mx-auto rounded-full flex items-center justify-center mb-2 bg-amber-200 text-amber-700">
                        <Compass className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <div className="font-heading font-bold text-sm text-amber-700">Mrigashira</div>
                      <div className="text-xs text-gray-600 mt-1">Search and seeking</div>
                    </div>
                    <div className="text-center p-3 rounded-lg" style={{ background: '#dbeafe', border: '1px solid #bfdbfe' }}>
                      <div className="w-9 h-9 mx-auto rounded-full flex items-center justify-center mb-2 bg-blue-200 text-blue-700">
                        <Zap className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <div className="font-heading font-bold text-sm text-blue-700">Ardra</div>
                      <div className="text-xs text-gray-600 mt-1">Storm and renewal</div>
                    </div>
                    <div className="text-center p-3 rounded-lg" style={{ background: '#dcfce7', border: '1px solid #86efac' }}>
                      <div className="w-9 h-9 mx-auto rounded-full flex items-center justify-center mb-2 bg-green-200 text-green-700">
                        <Sparkles className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <div className="font-heading font-bold text-sm text-green-700">Punarvasu</div>
                      <div className="text-xs text-gray-600 mt-1">Return and renewal</div>
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
            ॐ बुं बुधाय नमः
          </div>
          <div className="text-lg md:text-xl italic text-white mb-3">
            Om Bum Budhaya Namah
          </div>
          <div className="text-sm md:text-base text-gray-200 mb-6 max-w-xl mx-auto">
            Salutation to Budha (Mercury), the planet of intellect and speech, ruler of Mithuna Rashi.
          </div>
          <div className="inline-block bg-amber-500 text-gray-900 px-5 py-2 rounded-full text-sm font-semibold shadow-md">
            Chant 108 times
            <span className="mx-2">·</span>
            Wednesday mornings
          </div>
        </div>
      </section>

      {/* Section 5, Strengths and Challenges. */}
      <section
        className="relative overflow-hidden"
        style={{ background: '#fefce8', padding: '64px 24px' }}
      >
        {/* Faint Twins watermark */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            fontSize: '120px',
            opacity: 0.06,
            color: '#ca8a04',
            userSelect: 'none',
            lineHeight: 1,
          }}
        >
          ♊
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
                color: '#a16207',
                fontStyle: 'italic',
                lineHeight: 1.1,
                marginTop: '4px',
              }}
            >
              Mithuna Natives
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
              The restless air within, strengths that captivate and challenges that test focus.
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
                  background: 'linear-gradient(135deg, #713f12, #ca8a04)',
                  padding: '20px 24px',
                }}
              >
                <div
                  className="bg-white rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ width: '52px', height: '52px' }}
                >
                  <Crown style={{ color: '#ca8a04', width: '28px', height: '28px' }} aria-hidden="true" />
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
                        style={{ width: '40px', height: '40px', background: '#fefce8' }}
                      >
                        <Icon style={{ color: '#ca8a04', width: '20px', height: '20px' }} aria-hidden="true" />
                      </div>
                      <div
                        className="flex-1 font-bold text-gray-800"
                        style={{ fontSize: '15px' }}
                      >
                        {row.label}
                      </div>
                      <span style={{ color: '#fef9c3', fontWeight: 400 }} aria-hidden="true">|</span>
                      <span
                        style={{ color: '#ca8a04', fontWeight: 700 }}
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
                  background: 'linear-gradient(135deg, #14532d, #16a34a)',
                  padding: '20px 24px',
                }}
              >
                <div
                  className="bg-white rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ width: '52px', height: '52px' }}
                >
                  <AlertTriangle style={{ color: '#15803d', width: '28px', height: '28px' }} aria-hidden="true" />
                </div>
                <h3 style={{ color: 'white', fontSize: '24px', fontWeight: 700, margin: 0 }}>
                  Challenges
                </h3>
              </div>

              <div className="bg-white divide-y divide-green-50">
                {CHALLENGE_ROWS.map((row) => {
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
                        <Icon style={{ color: '#15803d', width: '20px', height: '20px' }} aria-hidden="true" />
                      </div>
                      <div
                        className="flex-1 font-bold text-gray-800"
                        style={{ fontSize: '15px' }}
                      >
                        {row.label}
                      </div>
                      <span style={{ color: '#bbf7d0', fontWeight: 400 }} aria-hidden="true">|</span>
                      <span
                        style={{ color: '#15803d', fontWeight: 700 }}
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
            <Gem size={18} color="#ca8a04" aria-hidden="true" />
            <p style={{ fontSize: '14px', color: '#374151', margin: 0 }}>
              When focused with awareness, the agility of Mithuna becomes a{' '}
              <strong style={{ color: '#d97706' }}>force of connection.</strong>
            </p>
            <span style={{ color: '#d97706', fontSize: '12px' }} aria-hidden="true">
              ✦ ✦ ✦
            </span>
          </div>
        </div>
      </section>

      {/* Section 6, Mithuna in the 12 Houses. */}
      <section className="py-16 px-6" style={{ background: '#fefce8' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div
              className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4"
              style={{ background: '#fef9c3', color: '#ca8a04' }}
            >
              <Target className="w-6 h-6" aria-hidden="true" />
            </div>
            <h2 className="font-heading font-bold text-3xl md:text-5xl mb-3 leading-tight">
              <span style={{ color: '#a16207' }}>Mithuna</span>
              <span style={{ color: '#1e3a5f' }}> in the 12 Houses</span>
            </h2>
            <div
              className="text-xs uppercase tracking-[0.25em] font-semibold mb-2"
              style={{ color: '#d97706' }}
            >
              How the Air of Mithuna Animates Each Bhava
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
              <Zap className="w-4 h-4" style={{ color: '#ca8a04' }} aria-hidden="true" />
              <div
                className="h-px w-10"
                style={{ background: '#d97706', opacity: 0.4 }}
              />
            </div>
            <p className="text-sm text-gray-700 italic">
              Mithuna air animates every house it touches, bringing{' '}
              <strong style={{ color: '#d97706' }}>curiosity, wit</strong> and the gift of connection.
            </p>
          </div>
        </div>
      </section>

      {/* Section 7, Remedies. JSX card grid on dark charcoal. */}
      <section style={{ background: '#1c1917', padding: '64px 24px', position: 'relative' }}>
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
              Classical Vedic Remedies for Mithuna Rashi
            </h2>
            <p className="text-base" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Strengthen Budha and align with Mercury energy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { main: 'Chant the Budha Beej mantra (Om Bum Budhaya Namah)', sub: '108 times on Wednesday mornings', highlight: 'Budha Beej mantra' },
              { main: 'Wear Emerald (Panna) set in gold on the little finger', sub: 'only after a chart-based recommendation', highlight: 'Emerald (Panna)' },
              { main: 'Donate green lentils, green cloth, or books', sub: 'on Wednesdays at a Vishnu temple', highlight: 'green lentils, green cloth' },
              { main: 'Recite the Budha Stotra or Vishnu Sahasranama on Wednesdays', sub: 'for clarity of mind and communication', highlight: 'Budha Stotra or Vishnu Sahasranama' },
              { main: 'Visit a Vishnu temple on Wednesdays', sub: 'and offer tulsi leaves and yellow flowers', highlight: 'Vishnu temple' },
              { main: 'Engage in reading, writing, or any Mercury discipline daily', sub: 'as a conscious practice that strengthens Budha', highlight: 'reading, writing' },
              { main: 'Reduce excessive talking and scattered multitasking', sub: 'during Mercury-afflicted periods. Cultivate focus and depth', highlight: 'excessive talking' },
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
              ♊
            </div>
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-3 leading-tight">
              <span style={{ color: '#1e3a5f' }}>Frequently Asked </span>
              <span style={{ color: '#15803d' }}>Questions</span>
            </h2>
            <p className="text-gray-600 text-base">
              Your top questions about Mithuna Rashi, answered with clarity
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
                    aria-controls={`mithuna-faq-${i}`}
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
                      id={`mithuna-faq-${i}`}
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
                            alt="Mithuna Rashi Twins zodiac symbol Soul Infinity"
                            width={120}
                            height={120}
                            loading="lazy"
                            style={{
                              width: '120px',
                              height: '120px',
                              borderRadius: '50%',
                              border: '2px solid #ca8a04',
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
      <section className="py-20 bg-gradient-to-r from-yellow-900 to-amber-900 text-white relative overflow-hidden">
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
            Want a Personalised Mithuna Reading?
          </h2>
          <p className="text-xl text-amber-100 mb-8 leading-relaxed">
            Saurabh Jain at Soul Infinity Astro Solutions reads Mithuna placement in the context of
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
