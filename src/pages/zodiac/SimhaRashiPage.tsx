import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ArrowRight,
  ChevronDown,
  AlertTriangle,
  Crown,
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
  Flame,
  ChevronsRight,
  Timer,
  UserX,
  Clock,
  Sun,
  type LucideIcon,
} from 'lucide-react';
import SEOHead from '../../components/SEOHead';
import SchemaMarkup from '../../components/SchemaMarkup';
import Breadcrumbs from '../../components/Breadcrumbs';
import { getFaqPageSchemaFromList } from '../../data/schema-entities';

const HERO_URL =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Leo/hero-banner-simha-rashi.webp';
const QUICK_FACTS_URL =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Leo/quick-facts-simha-rashi.webp';
const MANTRA_BG_URL =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Leo/mantra-bg-simha-rashi.webp';
const CARD_URL =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Leo/simha-card.webp';

interface TraitRow {
  icon: LucideIcon;
  label: string;
}

const STRENGTH_ROWS: readonly TraitRow[] = [
  { icon: Crown, label: 'Natural authority' },
  { icon: Flame, label: 'Radiant and magnetic' },
  { icon: Heart, label: 'Generous and warm' },
  { icon: ShieldCheck, label: 'Fiercely loyal' },
  { icon: Star, label: 'Creative and dramatic' },
  { icon: Zap, label: 'Courageous and bold' },
];

const CHALLENGE_ROWS: readonly TraitRow[] = [
  { icon: ChevronsRight, label: 'Arrogant and domineering' },
  { icon: Timer, label: 'Needs constant praise' },
  { icon: UserX, label: 'Stubborn about status' },
  { icon: Clock, label: 'Inflexible under criticism' },
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
  { num: '01', color: '#b45309', heading: 'LAGNA (SELF)',          icon: User,       desc: 'Commanding presence, strong spine, natural authority, Sun-ruled confidence',                              arrow: 'Leadership is the default mode' },
  { num: '02', color: '#d97706', heading: 'WEALTH & SPEECH',       icon: Coins,      desc: 'Authoritative speech, wealth through status and enterprise, family with pride',                          arrow: 'Wealth reflects dignity and self-worth' },
  { num: '03', color: '#db2777', heading: 'COURAGE & SIBLINGS',    icon: Users,      desc: 'Bold creative expression, courageous siblings, short travels for recognition',                            arrow: 'Every act of courage is a performance of self' },
  { num: '04', color: '#7c3aed', heading: 'HOME & MOTHER',         icon: Home,       desc: 'Grand home, proud mother, strong identification with ancestral dignity',                                 arrow: 'Home must reflect status and grandeur' },
  { num: '05', color: '#db2777', heading: 'CHILDREN & CREATIVITY', icon: Star,       desc: 'Theatrical children, dramatic romance, creative genius in performance and leadership',                   arrow: 'Children become a source of pride and legacy' },
  { num: '06', color: '#1d4ed8', heading: 'ENEMIES & SERVICE',     icon: Shield,     desc: 'Overcomes adversaries through sheer will and authority',                                                  arrow: 'Military, surgical, or leadership service favoured' },
  { num: '07', color: '#0f766e', heading: 'MARRIAGE & PARTNERS',   icon: Heart,      desc: 'Regal spouse, partnerships that enhance status and mutual admiration',                                    arrow: 'Business partnerships with recognised figures' },
  { num: '08', color: '#7c3aed', heading: 'TRANSFORMATION',        icon: Zap,        desc: 'Dramatic life transformations, interest in power behind the scenes, hidden enemies',                     arrow: 'Transformation through surrender of ego' },
  { num: '09', color: '#d97706', heading: 'DHARMA & FATHER',       icon: Compass,    desc: 'Proud, dignified father, faith expressed through generosity and ritual, royal pilgrimages',              arrow: 'Dharma expressed through noble action' },
  { num: '10', color: '#1d4ed8', heading: 'CAREER & STATUS',       icon: TrendingUp, desc: 'Career in politics, management, entertainment, medicine, or government',                                arrow: 'Recognition is not sought but expected' },
  { num: '11', color: '#b45309', heading: 'GAINS & FRIENDS',       icon: Users,      desc: 'Friends in high places, gains through networks of influence and prestige',                               arrow: 'Fulfilment through being celebrated and respected' },
  { num: '12', color: '#0f766e', heading: 'LIBERATION & FOREIGN',  icon: Globe,      desc: 'Spiritual seeker of the sacred, hidden pride, foreign lands offer recognition',                          arrow: 'Liberation through dissolution of the royal self' },
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
    q: 'What is Simha Rashi in Vedic astrology?',
    icon: HelpCircle,
    color: '#b45309',
    showImage: true,
    a: (
      <>
        Simha Rashi (Leo) is the fifth sign of the Vedic sidereal zodiac, spanning 120 to 150
        degrees. It is a <strong style={{ color: '#d97706' }}>fixed fire sign</strong> ruled by{' '}
        <strong style={{ color: '#d97706' }}>Surya (the Sun)</strong>, the planet of soul,
        authority, and self-expression. Natives with the Moon in Simha carry a natural regality,
        creative brilliance, and an unshakeable need to shine.
      </>
    ),
    aText:
      'Simha Rashi (Leo) is the fifth sign of the Vedic sidereal zodiac, spanning 120 to 150 degrees. It is a fixed fire sign ruled by Surya (the Sun), the planet of soul, authority, and self-expression. Natives with the Moon in Simha carry a natural regality, creative brilliance, and an unshakeable need to shine.',
  },
  {
    q: 'Who is the ruling planet of Simha Rashi?',
    icon: Globe,
    color: '#d97706',
    a: (
      <>
        Surya (the Sun) is the ruling planet of Simha Rashi. The Sun governs soul, vitality,
        father, authority, government, and the spine. A strong Sun amplifies leadership, charisma,
        and self-confidence. A weak or afflicted Sun can bring ego struggles, poor health of the
        heart and eyes, and conflicts with authority.
      </>
    ),
    aText:
      'Surya (the Sun) is the ruling planet of Simha Rashi. The Sun governs soul, vitality, father, authority, government, and the spine. A strong Sun amplifies leadership, charisma, and self-confidence. A weak or afflicted Sun can bring ego struggles, poor health of the heart and eyes, and conflicts with authority.',
  },
  {
    q: 'What are the personality traits of Simha Rashi natives?',
    icon: User,
    color: '#7c3aed',
    a: (
      <>
        Simha natives are bold, generous, and magnetically charismatic. They lead naturally and
        inspire loyalty through warmth and authority. Their greatest challenge is the ego, an
        excessive need for recognition and an inability to accept criticism. When their solar
        energy is directed toward service rather than performance, Simha natives become exceptional
        leaders and patrons.
      </>
    ),
    aText:
      'Simha natives are bold, generous, and magnetically charismatic. They lead naturally and inspire loyalty through warmth and authority. Their greatest challenge is the ego, an excessive need for recognition and an inability to accept criticism. When their solar energy is directed toward service rather than performance, Simha natives become exceptional leaders and patrons.',
  },
  {
    q: 'Which gemstone is recommended for Simha Rashi?',
    icon: Gem,
    color: '#1d4ed8',
    a: (
      <>
        Ruby (Manikya) is the classical gemstone for Simha Rashi, worn to strengthen Surya (the
        Sun). It should be set in gold and worn on the ring finger of the right hand on a Sunday
        morning after proper mantra invocation. A chart-based consultation with a qualified
        jyotishi at Soul Infinity Astro Solutions is essential before wearing any planetary
        gemstone.
      </>
    ),
    aText:
      'Ruby (Manikya) is the classical gemstone for Simha Rashi, worn to strengthen Surya (the Sun). It should be set in gold and worn on the ring finger of the right hand on a Sunday morning after proper mantra invocation. A chart-based consultation with a qualified jyotishi at Soul Infinity Astro Solutions is essential before wearing any planetary gemstone.',
  },
  {
    q: 'What are the lucky days and colours for Simha Rashi?',
    icon: Calendar,
    color: '#0f766e',
    a: (
      <>
        Sunday is the most auspicious day for Simha Rashi natives, governed by Surya. Gold, orange,
        and red are the lucky colours. Offering water to the Sun at sunrise, visiting Sun temples,
        and wearing gold or orange on important days are traditional practices that channel solar
        energy constructively.
      </>
    ),
    aText:
      'Sunday is the most auspicious day for Simha Rashi natives, governed by Surya. Gold, orange, and red are the lucky colours. Offering water to the Sun at sunrise, visiting Sun temples, and wearing gold or orange on important days are traditional practices that channel solar energy constructively.',
  },
];

const FAQS: ReadonlyArray<{ question: string; answer: string }> = FAQ_DATA.map((f) => ({
  question: f.q,
  answer: f.aText,
}));

export default function SimhaRashiPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <SEOHead
        title="Simha Rashi (Leo), Traits, Mantra, Remedies | Soul Infinity"
        description="Simha Rashi (Leo) in Vedic astrology, ruled by Surya (Sun). Personality traits, mantra, remedies, characteristics, and houses placement, guided by Saurabh Jain."
        keywords="simha rashi, leo vedic astrology, surya, sun, leo traits, simha mantra, ruby, manikya, simha remedies, soul infinity"
        image={HERO_URL}
        type="article"
        omitDefaultSchema
      />
      <SchemaMarkup
        type="webpage"
        webPage={{
          name: 'Simha Rashi (Leo) in Vedic Astrology',
          description:
            'Simha Rashi, the fifth sign of the Vedic zodiac, ruled by Surya (Sun). Personality, mantra, remedies, and houses placement.',
          url: '/zodiac/leo',
        }}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Zodiac Signs', url: '/zodiac' },
          { name: 'Simha (Leo)', url: '/zodiac/leo' },
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
          alt="Simha Rashi hero banner Soul Infinity Astro Solutions"
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
            { label: 'Simha (Leo)' },
          ]}
        />
      </div>

      <div>
        {/* Section 2, Title strip. */}
        <section className="bg-white pt-2 pb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <p className="text-sm md:text-base tracking-[0.25em] uppercase text-amber-700 font-semibold mb-2">
              <span className="font-devanagari" lang="sa">सिंह राशि</span>
              <span className="mx-2 text-amber-700/60">·</span>
              Leo
            </p>
            <h1 className="font-heading font-bold text-3xl md:text-5xl text-gray-900 mb-2 leading-tight">
              Simha Rashi, The Royal of the Zodiac
            </h1>
            <p className="text-base md:text-lg text-gray-700">
              Ruled by Surya (Sun)
              <span className="mx-2 text-gray-400">·</span>
              Fire Sign
              <span className="mx-2 text-gray-400">·</span>
              The Lion
            </p>
          </div>
        </section>

        {/* Section 3, About Simha. Two-column infographic. */}
        <section className="py-12 px-6" style={{ background: '#fffbeb' }}>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

              {/* LEFT COLUMN */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-amber-100 text-amber-700">
                    <Crown className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="font-heading font-bold text-2xl text-gray-900 leading-tight">
                      Simha Rashi
                    </div>
                    <div className="text-sm text-gray-500 italic">in Vedic Astrology</div>
                  </div>
                </div>

                {/* Card 1, intro */}
                <div className="bg-white p-4 rounded-xl flex gap-3" style={{ border: '1px solid #fde68a' }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-amber-100 text-amber-700">
                    <Crown className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed m-0">
                    Simha (Leo) is the <strong style={{ color: '#d97706' }}>fifth sign</strong> of
                    the Vedic zodiac, ruled by Surya (the Sun), the planet of soul, authority, and
                    vitality. As a <strong>fixed fire sign</strong>, Simha carries the energy of
                    sovereignty, the force that illuminates, commands, and inspires.
                  </p>
                </div>

                {/* Card 2, The Royal */}
                <div className="bg-white p-4 rounded-xl flex gap-3" style={{ border: '1px solid #fde68a' }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-amber-100 text-amber-700">
                    <Flame className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base mb-1" style={{ color: '#92400e' }}>
                      The Royal
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed m-0">
                      In the Brihat Parashara Hora Shastra, Simha is described as a sign of{' '}
                      <strong>royal (Kshatriya) nature</strong>, dwelling in the forest,
                      representing the untamed power of the Sun at its fullest expression.
                    </p>
                  </div>
                </div>

                {/* Card 3, Born to Lead */}
                <div className="bg-white p-4 rounded-xl flex gap-3" style={{ border: '1px solid #fde68a' }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-slate-900 text-white">
                    <Sun className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base text-gray-900 mb-1">
                      Born to Lead
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed m-0">
                      The Lion does not follow. It establishes the direction,{' '}
                      <strong style={{ color: '#d97706' }}>radiates authority</strong>, and expects
                      those around it to recognise the light it carries.
                    </p>
                  </div>
                </div>

                {/* Card 4, Generous by Nature */}
                <div className="bg-white p-4 rounded-xl flex gap-3" style={{ border: '1px solid #fde68a' }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-amber-100 text-amber-700">
                    <Heart className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base mb-1" style={{ color: '#92400e' }}>
                      Generous by Nature
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed m-0">
                      Despite the boldness of their personality, Simha natives are among the most{' '}
                      <strong>generous</strong> of the zodiac. They give with the open hand of a
                      king, expecting gratitude but never diminishing those they help.
                    </p>
                  </div>
                </div>

                {/* Bottom card, Soul Infinity insight */}
                <div className="p-4 rounded-xl flex gap-3" style={{ background: '#fef3c7', border: '1px solid #fcd34d' }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-amber-200 text-amber-800">
                    <Star className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base mb-1" style={{ color: '#78350f' }}>
                      Soul Infinity Astrologers Insight
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed m-0 italic">
                      At Soul Infinity Astro Solutions, Saurabh Jain observes that Simha ascendants
                      and Moon sign natives often arrive seeking clarity on roles of leadership,
                      and their chart invariably shows the planetary support for bold, dignified
                      action when the timing is right.
                    </p>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="lg:col-span-7 space-y-4">
                <img
                  src={QUICK_FACTS_URL}
                  alt="Simha Rashi Quick Facts Soul Infinity"
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

                {/* Sun rulership card */}
                <div className="bg-white p-4 rounded-xl" style={{ border: '1px solid #fde68a' }}>
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-amber-100 text-amber-700">
                      <Sun className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading font-bold text-base mb-1" style={{ color: '#92400e' }}>
                        Ruled by Surya (Sun)
                      </h3>
                      <p className="text-sm text-gray-700 leading-relaxed m-0">
                        The ruling planet Surya governs <strong>soul</strong>,{' '}
                        <strong>vitality</strong>, <strong>father</strong>,{' '}
                        <strong>authority</strong>, <strong>government</strong>, and the{' '}
                        <strong>spine</strong> in Vedic astrology.
                      </p>
                    </div>
                    <div className="hidden md:flex flex-col gap-1.5 text-amber-700/70 pt-1">
                      <Crown className="w-4 h-4" aria-hidden="true" />
                      <Flame className="w-4 h-4" aria-hidden="true" />
                      <Sun className="w-4 h-4" aria-hidden="true" />
                      <Heart className="w-4 h-4" aria-hidden="true" />
                      <Star className="w-4 h-4" aria-hidden="true" />
                    </div>
                  </div>
                </div>

                {/* Power and Potential card */}
                <div className="bg-white p-4 rounded-xl" style={{ border: '1px solid #fde68a' }}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                    <div className="md:col-span-2 flex gap-3">
                      <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-red-100 text-red-600">
                        <Target className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-base text-gray-900 mb-1">
                          Power and Potential
                        </h3>
                        <p className="text-sm text-gray-700 leading-relaxed m-0">
                          A well-placed Sun in a Simha chart amplifies{' '}
                          <strong style={{ color: '#d97706' }}>leadership</strong>, creative
                          authority, and the capacity to inspire devotion in others.
                        </p>
                      </div>
                    </div>
                    <div className="rounded-lg p-3" style={{ background: '#fffbeb', border: '1px solid #fcd34d' }}>
                      <p className="text-xs leading-relaxed m-0 italic" style={{ color: '#78350f' }}>
                        An afflicted Sun can bring arrogance, conflicts with authority, and an
                        excessive hunger for validation.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mahadasha Timing card */}
                <div className="bg-white p-4 rounded-xl flex gap-3" style={{ border: '1px solid #fde68a' }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-red-100 text-red-600">
                    <Clock className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base text-gray-900 mb-1">
                      Mahadasha Timing
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed m-0">
                      Understanding Sun placement, its dignity, aspects, and Mahadasha timing is
                      central to reading a Simha chart accurately.
                    </p>
                  </div>
                </div>

                {/* Vimshottari Dasha card */}
                <div className="bg-white p-5 rounded-xl" style={{ border: '1px solid #fde68a' }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-amber-100 text-amber-700">
                      <Star className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <h3 className="font-heading font-bold text-lg text-gray-900 m-0">
                      Vimshottari Dasha System
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 leading-relaxed">
                    <p className="m-0">
                      In the Vimshottari Dasha system, Simha natives often experience{' '}
                      <strong style={{ color: '#d97706' }}>six-year Sun Mahadasha</strong>{' '}
                      cycles that profoundly shape their authority, public stature, and creative
                      voice.
                    </p>
                    <p className="m-0">
                      The sign itself spans all of <strong>Magha</strong>, all of{' '}
                      <strong>Purva Phalguni</strong>, and the first pada of{' '}
                      <strong>Uttara Phalguni</strong> nakshatras.
                    </p>
                  </div>

                  {/* Three nakshatra mini cards */}
                  <div className="grid grid-cols-3 gap-3 mt-4">
                    <div className="text-center p-3 rounded-lg" style={{ background: '#fee2e2', border: '1px solid #fecaca' }}>
                      <div className="w-9 h-9 mx-auto rounded-full flex items-center justify-center mb-2 bg-red-200 text-red-700">
                        <Crown className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <div className="font-heading font-bold text-sm text-red-700">Magha</div>
                      <div className="text-xs text-gray-600 mt-1">Royal ancestral throne</div>
                    </div>
                    <div className="text-center p-3 rounded-lg" style={{ background: '#fef3c7', border: '1px solid #fde68a' }}>
                      <div className="w-9 h-9 mx-auto rounded-full flex items-center justify-center mb-2 bg-amber-200 text-amber-700">
                        <Heart className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <div className="font-heading font-bold text-sm text-amber-700">Purva Phalguni</div>
                      <div className="text-xs text-gray-600 mt-1">Pleasure and creativity</div>
                    </div>
                    <div className="text-center p-3 rounded-lg" style={{ background: '#ffedd5', border: '1px solid #fed7aa' }}>
                      <div className="w-9 h-9 mx-auto rounded-full flex items-center justify-center mb-2 bg-orange-200 text-orange-700">
                        <Sun className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <div className="font-heading font-bold text-sm text-orange-700">Uttara Phalguni</div>
                      <div className="text-xs text-gray-600 mt-1">Patronage and order</div>
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
            ॐ ह्रीं ह्रौं सूर्याय नमः
          </div>
          <div className="text-lg md:text-xl italic text-white mb-3">
            Om Hrim Hraum Suryaya Namah
          </div>
          <div className="text-sm md:text-base text-gray-200 mb-6 max-w-xl mx-auto">
            Salutation to Surya (the Sun), the source of light, soul, and authority, ruler of Simha Rashi.
          </div>
          <div className="inline-block bg-amber-500 text-gray-900 px-5 py-2 rounded-full text-sm font-semibold shadow-md">
            Chant 108 times
            <span className="mx-2">·</span>
            Sunday mornings at sunrise, facing east
          </div>
        </div>
      </section>

      {/* Section 5, Strengths and Challenges. */}
      <section
        className="relative overflow-hidden"
        style={{ background: '#fffbeb', padding: '64px 24px' }}
      >
        {/* Faint Lion watermark */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            fontSize: '120px',
            opacity: 0.06,
            color: '#b45309',
            userSelect: 'none',
            lineHeight: 1,
          }}
        >
          ♌
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
                color: '#b45309',
                fontStyle: 'italic',
                lineHeight: 1.1,
                marginTop: '4px',
              }}
            >
              Simha Natives
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
              The royal fire within, strengths that command devotion and challenges that humble the throne.
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
                  background: 'linear-gradient(135deg, #92400e, #d97706)',
                  padding: '20px 24px',
                }}
              >
                <div
                  className="bg-white rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ width: '52px', height: '52px' }}
                >
                  <ShieldCheck style={{ color: '#d97706', width: '28px', height: '28px' }} aria-hidden="true" />
                </div>
                <h3 style={{ color: 'white', fontSize: '24px', fontWeight: 700, margin: 0 }}>
                  Strengths
                </h3>
              </div>

              <div className="bg-white divide-y divide-amber-50">
                {STRENGTH_ROWS.map((row) => {
                  const Icon = row.icon;
                  return (
                    <div
                      key={row.label}
                      className="flex items-center gap-3 hover:bg-amber-50 transition-colors"
                      style={{ padding: '14px 20px' }}
                    >
                      <div
                        className="rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ width: '40px', height: '40px', background: '#fffbeb' }}
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
                  background: 'linear-gradient(135deg, #7f1d1d, #dc2626)',
                  padding: '20px 24px',
                }}
              >
                <div
                  className="bg-white rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ width: '52px', height: '52px' }}
                >
                  <AlertTriangle style={{ color: '#dc2626', width: '28px', height: '28px' }} aria-hidden="true" />
                </div>
                <h3 style={{ color: 'white', fontSize: '24px', fontWeight: 700, margin: 0 }}>
                  Challenges
                </h3>
              </div>

              <div className="bg-white divide-y divide-red-50">
                {CHALLENGE_ROWS.map((row) => {
                  const Icon = row.icon;
                  return (
                    <div
                      key={row.label}
                      className="flex items-center gap-3 hover:bg-red-50 transition-colors"
                      style={{ padding: '14px 20px' }}
                    >
                      <div
                        className="rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ width: '40px', height: '40px', background: '#fee2e2' }}
                      >
                        <Icon style={{ color: '#dc2626', width: '20px', height: '20px' }} aria-hidden="true" />
                      </div>
                      <div
                        className="flex-1 font-bold text-gray-800"
                        style={{ fontSize: '15px' }}
                      >
                        {row.label}
                      </div>
                      <span style={{ color: '#fecaca', fontWeight: 400 }} aria-hidden="true">|</span>
                      <span
                        style={{ color: '#dc2626', fontWeight: 700 }}
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
            <Crown size={18} color="#b45309" aria-hidden="true" />
            <p style={{ fontSize: '14px', color: '#374151', margin: 0 }}>
              When guided with awareness, the radiance of Simha becomes a{' '}
              <strong style={{ color: '#d97706' }}>force of inspiration.</strong>
            </p>
            <span style={{ color: '#d97706', fontSize: '12px' }} aria-hidden="true">
              ✦ ✦ ✦
            </span>
          </div>
        </div>
      </section>

      {/* Section 6, Simha in the 12 Houses. */}
      <section className="py-16 px-6" style={{ background: '#fffbeb' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div
              className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4"
              style={{ background: '#fef3c7', color: '#b45309' }}
            >
              <Target className="w-6 h-6" aria-hidden="true" />
            </div>
            <h2 className="font-heading font-bold text-3xl md:text-5xl mb-3 leading-tight">
              <span style={{ color: '#b45309' }}>Simha</span>
              <span style={{ color: '#1e3a5f' }}> in the 12 Houses</span>
            </h2>
            <div
              className="text-xs uppercase tracking-[0.25em] font-semibold mb-2"
              style={{ color: '#d97706' }}
            >
              How the Fire of Simha Illuminates Each Bhava
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
              <Flame className="w-4 h-4" style={{ color: '#b45309' }} aria-hidden="true" />
              <div
                className="h-px w-10"
                style={{ background: '#d97706', opacity: 0.4 }}
              />
            </div>
            <p className="text-sm text-gray-700 italic">
              Simha fire illuminates every house it rules, bringing{' '}
              <strong style={{ color: '#d97706' }}>authority, warmth</strong> and the radiance of the Sun.
            </p>
          </div>
        </div>
      </section>

      {/* Section 7, Remedies. JSX card grid on dark amber. */}
      <section style={{ background: '#1c0a00', padding: '64px 24px', position: 'relative' }}>
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
              Classical Vedic Remedies for Simha Rashi
            </h2>
            <p className="text-base" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Strengthen Surya and align with Sun energy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { main: 'Offer Arghya (water) to the rising Sun every morning', sub: 'while chanting Om Hrim Hraum Suryaya Namah', highlight: 'Arghya to the rising Sun' },
              { main: 'Wear Ruby (Manikya) set in gold on the ring finger', sub: 'only after a chart-based recommendation', highlight: 'Ruby (Manikya)' },
              { main: 'Donate wheat, jaggery, red cloth, or copper', sub: 'on Sundays at a Surya or Shiva temple', highlight: 'wheat, jaggery, red cloth' },
              { main: 'Recite the Aditya Hridayam or Surya Ashtakam on Sundays', sub: 'for vitality, clarity, and authority', highlight: 'Aditya Hridayam or Surya Ashtakam' },
              { main: 'Visit a Surya temple on Sundays', sub: 'and offer red flowers and sandalwood', highlight: 'Surya temple' },
              { main: 'Cultivate leadership and creative expression consciously', sub: 'through arts, management, or public service', highlight: 'leadership and creative expression' },
              { main: 'Reduce excessive pride and the need for constant validation', sub: 'during Sun-afflicted periods. Practise humility and service', highlight: 'excessive pride' },
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
        style={{ background: '#fffbeb' }}
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
              ♌
            </div>
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-3 leading-tight">
              <span style={{ color: '#1e3a5f' }}>Frequently Asked </span>
              <span style={{ color: '#b45309' }}>Questions</span>
            </h2>
            <p className="text-gray-600 text-base">
              Your top questions about Simha Rashi, answered with clarity
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
                    aria-controls={`simha-faq-${i}`}
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
                      id={`simha-faq-${i}`}
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
                            alt="Simha Rashi Lion zodiac symbol Soul Infinity"
                            width={120}
                            height={120}
                            loading="lazy"
                            style={{
                              width: '120px',
                              height: '120px',
                              borderRadius: '50%',
                              border: '2px solid #b45309',
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
      <section className="py-20 bg-gradient-to-r from-amber-900 to-orange-900 text-white relative overflow-hidden">
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
            Want a Personalised Simha Reading?
          </h2>
          <p className="text-xl text-amber-100 mb-8 leading-relaxed">
            Saurabh Jain at Soul Infinity Astro Solutions reads Simha placement in the context of
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
