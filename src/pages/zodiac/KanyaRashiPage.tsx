import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ArrowRight,
  ChevronDown,
  AlertTriangle,
  Activity,
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
  Leaf,
  BookOpen,
  type LucideIcon,
} from 'lucide-react';
import SEOHead from '../../components/SEOHead';
import SchemaMarkup from '../../components/SchemaMarkup';
import Breadcrumbs from '../../components/Breadcrumbs';
import { getFaqPageSchemaFromList } from '../../data/schema-entities';

const HERO_URL =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Virgo/hero-banner-kanya-rashi.webp';
const QUICK_FACTS_URL =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Virgo/quick-facts-kanya-rashi.webp';
const MANTRA_BG_URL =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Virgo/mantra-bg-kanya-rashi.webp';
const CARD_URL =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Virgo/kanya-card.webp';

interface TraitRow {
  icon: LucideIcon;
  label: string;
}

const STRENGTH_ROWS: readonly TraitRow[] = [
  { icon: Target, label: 'Analytical and precise' },
  { icon: ShieldCheck, label: 'Deeply reliable' },
  { icon: Activity, label: 'Hardworking and diligent' },
  { icon: Sparkles, label: 'Keen eye for detail' },
  { icon: Heart, label: 'Caring and selfless' },
  { icon: Compass, label: 'Discerning and methodical' },
];

const CHALLENGE_ROWS: readonly TraitRow[] = [
  { icon: ChevronsRight, label: 'Overly critical and anxious' },
  { icon: Timer, label: 'Perfectionist paralysis' },
  { icon: UserX, label: 'Worries excessively' },
  { icon: Clock, label: 'Difficulty trusting others' },
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
  { num: '01', color: '#065f46', heading: 'LAGNA (SELF)',          icon: User,       desc: 'Methodical mind, modest appearance, detail-oriented, health-conscious temperament',         arrow: 'Service and precision define the self' },
  { num: '02', color: '#d97706', heading: 'WEALTH & SPEECH',       icon: Coins,      desc: 'Analytical speech, wealth through skilled service, family with high standards',            arrow: 'Wealth built through careful management' },
  { num: '03', color: '#db2777', heading: 'COURAGE & SIBLINGS',    icon: Users,      desc: 'Precise communication, methodical siblings, travels for work or analysis',                 arrow: 'Courage expressed through mastery and competence' },
  { num: '04', color: '#7c3aed', heading: 'HOME & MOTHER',         icon: Home,       desc: 'Organised home, health-conscious mother, preference for cleanliness and order',            arrow: 'Home is a place of efficiency and quiet beauty' },
  { num: '05', color: '#db2777', heading: 'CHILDREN & CREATIVITY', icon: Star,       desc: 'Intelligent children, analytical approach to romance, creative gift for craft and detail', arrow: 'Creativity expressed through perfection of form' },
  { num: '06', color: '#1d4ed8', heading: 'ENEMIES & SERVICE',     icon: Shield,     desc: 'Overcomes all obstacles through tireless work and discrimination',                         arrow: 'Healthcare, analysis, or service careers excel' },
  { num: '07', color: '#0f766e', heading: 'MARRIAGE & PARTNERS',   icon: Heart,      desc: 'Discerning and devoted spouse, partnerships built on usefulness and mutual service',       arrow: 'Business partnerships in health or skilled trades' },
  { num: '08', color: '#7c3aed', heading: 'TRANSFORMATION',        icon: Zap,        desc: 'Deep analysis of hidden matters, interest in healing sciences and research',               arrow: 'Transformation through purification and surrender' },
  { num: '09', color: '#d97706', heading: 'DHARMA & FATHER',       icon: Compass,    desc: 'Disciplined faith, scholarly father, pilgrimages for knowledge and purification',          arrow: 'Dharma found in daily discipline and service' },
  { num: '10', color: '#1d4ed8', heading: 'CAREER & STATUS',       icon: TrendingUp, desc: 'Career in medicine, editing, accounting, research, nutrition, or skilled crafts',          arrow: 'Recognition through mastery of craft' },
  { num: '11', color: '#065f46', heading: 'GAINS & FRIENDS',       icon: Users,      desc: 'Friends who are colleagues, gains through service and technical skill',                    arrow: 'Fulfilment through contribution and usefulness' },
  { num: '12', color: '#0f766e', heading: 'LIBERATION & FOREIGN',  icon: Globe,      desc: 'Spiritual service, hidden anxieties, foreign travel for work or healing',                  arrow: 'Liberation through dissolution of the critical self' },
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
    q: 'What is Kanya Rashi in Vedic astrology?',
    icon: HelpCircle,
    color: '#065f46',
    showImage: true,
    a: (
      <>
        Kanya Rashi (Virgo) is the sixth sign of the Vedic sidereal zodiac, spanning 150 to 180
        degrees. It is a <strong style={{ color: '#d97706' }}>mutable earth sign</strong> ruled by{' '}
        <strong style={{ color: '#d97706' }}>Budha (Mercury)</strong>, the planet of intellect and
        discrimination. Natives with the Moon in Kanya are analytical, hardworking, and devoted to
        service. They seek perfection in everything they do.
      </>
    ),
    aText:
      'Kanya Rashi (Virgo) is the sixth sign of the Vedic sidereal zodiac, spanning 150 to 180 degrees. It is a mutable earth sign ruled by Budha (Mercury), the planet of intellect and discrimination. Natives with the Moon in Kanya are analytical, hardworking, and devoted to service. They seek perfection in everything they do.',
  },
  {
    q: 'Who is the ruling planet of Kanya Rashi?',
    icon: Globe,
    color: '#d97706',
    a: (
      <>
        Budha (Mercury) is the ruling planet of Kanya Rashi. In Kanya, Mercury&apos;s analytical and
        discriminating qualities are expressed most fully. A strong Mercury gives precision,
        communication mastery, and exceptional skill in craft. A weak Mercury can cause excessive
        worry, nervous disorders, and digestive complaints.
      </>
    ),
    aText:
      "Budha (Mercury) is the ruling planet of Kanya Rashi. In Kanya, Mercury's analytical and discriminating qualities are expressed most fully. A strong Mercury gives precision, communication mastery, and exceptional skill in craft. A weak Mercury can cause excessive worry, nervous disorders, and digestive complaints.",
  },
  {
    q: 'What are the personality traits of Kanya Rashi natives?',
    icon: User,
    color: '#7c3aed',
    a: (
      <>
        Kanya natives are modest, methodical, and deeply dedicated. They notice what others miss,
        improve what others leave imperfect, and serve where others seek recognition. Their
        challenge is the inner critic, a voice that finds fault not only in the world but in
        themselves. When that discernment is directed outward constructively, Kanya natives become
        the finest healers, analysts, and craftspeople of the zodiac.
      </>
    ),
    aText:
      'Kanya natives are modest, methodical, and deeply dedicated. They notice what others miss, improve what others leave imperfect, and serve where others seek recognition. Their challenge is the inner critic, a voice that finds fault not only in the world but in themselves. When that discernment is directed outward constructively, Kanya natives become the finest healers, analysts, and craftspeople of the zodiac.',
  },
  {
    q: 'Which gemstone is recommended for Kanya Rashi?',
    icon: Gem,
    color: '#1d4ed8',
    a: (
      <>
        Emerald (Panna) is the classical gemstone for Kanya Rashi, worn to strengthen Budha
        (Mercury). Set in gold and worn on the little finger of the right hand on a Wednesday
        morning after proper mantra invocation. A chart-based consultation with a qualified jyotishi
        at Soul Infinity Astro Solutions is essential before wearing any planetary gemstone.
      </>
    ),
    aText:
      'Emerald (Panna) is the classical gemstone for Kanya Rashi, worn to strengthen Budha (Mercury). Set in gold and worn on the little finger of the right hand on a Wednesday morning after proper mantra invocation. A chart-based consultation with a qualified jyotishi at Soul Infinity Astro Solutions is essential before wearing any planetary gemstone.',
  },
  {
    q: 'What are the lucky days and colours for Kanya Rashi?',
    icon: Calendar,
    color: '#0f766e',
    a: (
      <>
        Wednesday is the most auspicious day for Kanya Rashi natives, governed by Budha (Mercury).
        Green, grey, and blue are the lucky colours that resonate with Mercury energy. Fasting on
        Wednesdays, reading sacred texts, and conscious daily service are traditional practices
        that support Kanya natives in channelling Mercury energy constructively.
      </>
    ),
    aText:
      'Wednesday is the most auspicious day for Kanya Rashi natives, governed by Budha (Mercury). Green, grey, and blue are the lucky colours that resonate with Mercury energy. Fasting on Wednesdays, reading sacred texts, and conscious daily service are traditional practices that support Kanya natives in channelling Mercury energy constructively.',
  },
];

const FAQS: ReadonlyArray<{ question: string; answer: string }> = FAQ_DATA.map((f) => ({
  question: f.q,
  answer: f.aText,
}));

export default function KanyaRashiPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <SEOHead
        title="Kanya Rashi (Virgo), Traits, Mantra, Remedies | Soul Infinity"
        description="Kanya Rashi (Virgo) in Vedic astrology, ruled by Budha (Mercury). Personality traits, mantra, remedies, characteristics, and houses placement, guided by Saurabh Jain."
        keywords="kanya rashi, virgo vedic astrology, budha, mercury, virgo traits, kanya mantra, emerald, panna, kanya remedies, soul infinity"
        image={HERO_URL}
        type="article"
        omitDefaultSchema
      />
      <SchemaMarkup
        type="webpage"
        webPage={{
          name: 'Kanya Rashi (Virgo) in Vedic Astrology',
          description:
            'Kanya Rashi, the sixth sign of the Vedic zodiac, ruled by Budha (Mercury). Personality, mantra, remedies, and houses placement.',
          url: '/zodiac/virgo',
        }}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Zodiac Signs', url: '/zodiac' },
          { name: 'Kanya (Virgo)', url: '/zodiac/virgo' },
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
          alt="Kanya Rashi hero banner Soul Infinity Astro Solutions"
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
            { label: 'Kanya (Virgo)' },
          ]}
        />
      </div>

      <div>
        {/* Section 2, Title strip. */}
        <section className="bg-white pt-2 pb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <p className="text-sm md:text-base tracking-[0.25em] uppercase text-emerald-800 font-semibold mb-2">
              <span className="font-devanagari" lang="sa">कन्या राशि</span>
              <span className="mx-2 text-emerald-800/60">·</span>
              Virgo
            </p>
            <h1 className="font-heading font-bold text-3xl md:text-5xl text-gray-900 mb-2 leading-tight">
              Kanya Rashi, The Craftsperson of the Zodiac
            </h1>
            <p className="text-base md:text-lg text-gray-700">
              Ruled by Budha (Mercury)
              <span className="mx-2 text-gray-400">·</span>
              Earth Sign
              <span className="mx-2 text-gray-400">·</span>
              The Maiden
            </p>
          </div>
        </section>

        {/* Section 3, About Kanya. Two-column infographic. */}
        <section className="py-12 px-6" style={{ background: '#f0fdf4' }}>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

              {/* LEFT COLUMN */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-emerald-100 text-emerald-800">
                    <Gem className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="font-heading font-bold text-2xl text-gray-900 leading-tight">
                      Kanya Rashi
                    </div>
                    <div className="text-sm text-gray-500 italic">in Vedic Astrology</div>
                  </div>
                </div>

                {/* Card 1, intro */}
                <div className="bg-white p-4 rounded-xl flex gap-3" style={{ border: '1px solid #a7f3d0' }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-emerald-100 text-emerald-800">
                    <Gem className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed m-0">
                    Kanya (Virgo) is the <strong style={{ color: '#d97706' }}>sixth sign</strong> of
                    the Vedic zodiac, ruled by Budha (Mercury), the planet of intellect, analysis,
                    and discrimination. As a <strong>mutable earth sign</strong>, Kanya carries the
                    energy of refinement, the force that takes raw effort and shapes it into
                    purposeful service.
                  </p>
                </div>

                {/* Card 2, The Craftsperson */}
                <div className="bg-white p-4 rounded-xl flex gap-3" style={{ border: '1px solid #a7f3d0' }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-emerald-100 text-emerald-800">
                    <Sparkles className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base mb-1" style={{ color: '#065f46' }}>
                      The Craftsperson
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed m-0">
                      In the Brihat Parashara Hora Shastra, Kanya is described as a{' '}
                      <strong>Vaishya sign</strong>, associated with skilled trade, careful
                      management, and the disciplined art of turning effort into excellence.
                    </p>
                  </div>
                </div>

                {/* Card 3, Born to Serve */}
                <div className="bg-white p-4 rounded-xl flex gap-3" style={{ border: '1px solid #a7f3d0' }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-slate-900 text-white">
                    <Heart className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base text-gray-900 mb-1">
                      Born to Serve
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed m-0">
                      Kanya natives serve not from weakness but from{' '}
                      <strong style={{ color: '#d97706' }}>mastery</strong>. They give from a place
                      of competence, and their quiet contribution often holds entire systems
                      together.
                    </p>
                  </div>
                </div>

                {/* Card 4, Gifted with Precision */}
                <div className="bg-white p-4 rounded-xl flex gap-3" style={{ border: '1px solid #a7f3d0' }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-emerald-100 text-emerald-800">
                    <Target className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base mb-1" style={{ color: '#065f46' }}>
                      Gifted with Precision
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed m-0">
                      The finest analysts, healers, editors, and craftspeople of the zodiac arrive
                      under Kanya. Their <strong>discrimination</strong> is not coldness; it is
                      love refined into accuracy.
                    </p>
                  </div>
                </div>

                {/* Bottom card, Soul Infinity insight */}
                <div className="p-4 rounded-xl flex gap-3" style={{ background: '#dcfce7', border: '1px solid #86efac' }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-emerald-200 text-emerald-900">
                    <Star className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base mb-1" style={{ color: '#064e3b' }}>
                      Soul Infinity Astrologers Insight
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed m-0 italic">
                      At Soul Infinity Astro Solutions, Saurabh Jain observes that Kanya
                      ascendants and Moon sign natives often arrive at decisions requiring careful
                      analysis, and their chart invariably shows the planetary support for steady,
                      service-oriented action when the timing is right.
                    </p>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="lg:col-span-7 space-y-4">
                <img
                  src={QUICK_FACTS_URL}
                  alt="Kanya Rashi Quick Facts Soul Infinity"
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
                <div className="bg-white p-4 rounded-xl" style={{ border: '1px solid #a7f3d0' }}>
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-emerald-100 text-emerald-800">
                      <Gem className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading font-bold text-base mb-1" style={{ color: '#065f46' }}>
                        Ruled by Budha (Mercury)
                      </h3>
                      <p className="text-sm text-gray-700 leading-relaxed m-0">
                        The ruling planet Budha governs <strong>intellect</strong>,{' '}
                        <strong>analysis and communication</strong>,{' '}
                        <strong>commerce</strong>, <strong>health</strong>,{' '}
                        <strong>skill</strong>, and <strong>discrimination</strong> in Vedic
                        astrology.
                      </p>
                    </div>
                    <div className="hidden md:flex flex-col gap-1.5 text-emerald-800/70 pt-1">
                      <BookOpen className="w-4 h-4" aria-hidden="true" />
                      <Leaf className="w-4 h-4" aria-hidden="true" />
                      <Gem className="w-4 h-4" aria-hidden="true" />
                      <Activity className="w-4 h-4" aria-hidden="true" />
                      <Target className="w-4 h-4" aria-hidden="true" />
                    </div>
                  </div>
                </div>

                {/* Power and Potential card */}
                <div className="bg-white p-4 rounded-xl" style={{ border: '1px solid #a7f3d0' }}>
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
                          A well-placed Mercury in a Kanya chart amplifies{' '}
                          <strong style={{ color: '#d97706' }}>analytical brilliance</strong>,
                          communication mastery, and the capacity for tireless, accurate work.
                        </p>
                      </div>
                    </div>
                    <div className="rounded-lg p-3" style={{ background: '#f0fdf4', border: '1px solid #86efac' }}>
                      <p className="text-xs leading-relaxed m-0 italic" style={{ color: '#064e3b' }}>
                        An afflicted Mercury can bring excessive worry, nervous tension, and harsh
                        self-criticism.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mahadasha Timing card */}
                <div className="bg-white p-4 rounded-xl flex gap-3" style={{ border: '1px solid #a7f3d0' }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-teal-100 text-teal-600">
                    <Clock className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base text-gray-900 mb-1">
                      Mahadasha Timing
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed m-0">
                      Understanding Mercury placement, its dignity, aspects, and Mahadasha timing is
                      central to reading a Kanya chart accurately.
                    </p>
                  </div>
                </div>

                {/* Vimshottari Dasha card */}
                <div className="bg-white p-5 rounded-xl" style={{ border: '1px solid #a7f3d0' }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-emerald-100 text-emerald-800">
                      <Star className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <h3 className="font-heading font-bold text-lg text-gray-900 m-0">
                      Vimshottari Dasha System
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 leading-relaxed">
                    <p className="m-0">
                      In the Vimshottari Dasha system, Kanya natives often experience{' '}
                      <strong style={{ color: '#d97706' }}>seventeen-year Mercury Mahadasha</strong>{' '}
                      cycles that profoundly shape their intellectual and service life.
                    </p>
                    <p className="m-0">
                      The sign itself spans the last two padas of <strong>Uttara Phalguni</strong>,
                      all of <strong>Hasta</strong>, and the first two padas of{' '}
                      <strong>Chitra</strong> nakshatras.
                    </p>
                  </div>

                  {/* Three nakshatra mini cards */}
                  <div className="grid grid-cols-3 gap-3 mt-4">
                    <div className="text-center p-3 rounded-lg" style={{ background: '#fef3c7', border: '1px solid #fde68a' }}>
                      <div className="w-9 h-9 mx-auto rounded-full flex items-center justify-center mb-2 bg-amber-200 text-amber-700">
                        <Star className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <div className="font-heading font-bold text-sm text-amber-700">U. Phalguni</div>
                      <div className="text-xs text-gray-600 mt-1">Sun&apos;s steady warmth</div>
                    </div>
                    <div className="text-center p-3 rounded-lg" style={{ background: '#dcfce7', border: '1px solid #86efac' }}>
                      <div className="w-9 h-9 mx-auto rounded-full flex items-center justify-center mb-2 bg-emerald-200 text-emerald-800">
                        <Sparkles className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <div className="font-heading font-bold text-sm text-emerald-800">Hasta</div>
                      <div className="text-xs text-gray-600 mt-1">Skilful hands and craft</div>
                    </div>
                    <div className="text-center p-3 rounded-lg" style={{ background: '#fee2e2', border: '1px solid #fecaca' }}>
                      <div className="w-9 h-9 mx-auto rounded-full flex items-center justify-center mb-2 bg-red-200 text-red-700">
                        <Compass className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <div className="font-heading font-bold text-sm text-red-700">Chitra</div>
                      <div className="text-xs text-gray-600 mt-1">Brilliant design</div>
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
            Salutation to Budha (Mercury), the planet of intellect and discrimination, ruler of Kanya Rashi.
          </div>
          <div className="inline-block bg-amber-500 text-gray-900 px-5 py-2 rounded-full text-sm font-semibold shadow-md">
            Chant 108 times
            <span className="mx-2">·</span>
            Wednesday mornings facing north
          </div>
        </div>
      </section>

      {/* Section 5, Strengths and Challenges. */}
      <section
        className="relative overflow-hidden"
        style={{ background: '#f0fdf4', padding: '64px 24px' }}
      >
        {/* Faint Maiden watermark */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            fontSize: '120px',
            opacity: 0.06,
            color: '#065f46',
            userSelect: 'none',
            lineHeight: 1,
          }}
        >
          ♍
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
                color: '#065f46',
                fontStyle: 'italic',
                lineHeight: 1.1,
                marginTop: '4px',
              }}
            >
              Kanya Natives
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
              The discerning earth within, strengths that refine and challenges that test patience.
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
                  background: 'linear-gradient(135deg, #064e3b, #059669)',
                  padding: '20px 24px',
                }}
              >
                <div
                  className="bg-white rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ width: '52px', height: '52px' }}
                >
                  <ShieldCheck style={{ color: '#059669', width: '28px', height: '28px' }} aria-hidden="true" />
                </div>
                <h3 style={{ color: 'white', fontSize: '24px', fontWeight: 700, margin: 0 }}>
                  Strengths
                </h3>
              </div>

              <div className="bg-white divide-y divide-emerald-50">
                {STRENGTH_ROWS.map((row) => {
                  const Icon = row.icon;
                  return (
                    <div
                      key={row.label}
                      className="flex items-center gap-3 hover:bg-emerald-50 transition-colors"
                      style={{ padding: '14px 20px' }}
                    >
                      <div
                        className="rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ width: '40px', height: '40px', background: '#ecfdf5' }}
                      >
                        <Icon style={{ color: '#059669', width: '20px', height: '20px' }} aria-hidden="true" />
                      </div>
                      <div
                        className="flex-1 font-bold text-gray-800"
                        style={{ fontSize: '15px' }}
                      >
                        {row.label}
                      </div>
                      <span style={{ color: '#d1fae5', fontWeight: 400 }} aria-hidden="true">|</span>
                      <span
                        style={{ color: '#059669', fontWeight: 700 }}
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
            <Gem size={18} color="#065f46" aria-hidden="true" />
            <p style={{ fontSize: '14px', color: '#374151', margin: 0 }}>
              When guided with awareness, the discernment of Kanya becomes a{' '}
              <strong style={{ color: '#d97706' }}>force of healing.</strong>
            </p>
            <span style={{ color: '#d97706', fontSize: '12px' }} aria-hidden="true">
              ✦ ✦ ✦
            </span>
          </div>
        </div>
      </section>

      {/* Section 6, Kanya in the 12 Houses. */}
      <section className="py-16 px-6" style={{ background: '#f0fdf4' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div
              className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4"
              style={{ background: '#dcfce7', color: '#065f46' }}
            >
              <Target className="w-6 h-6" aria-hidden="true" />
            </div>
            <h2 className="font-heading font-bold text-3xl md:text-5xl mb-3 leading-tight">
              <span style={{ color: '#065f46' }}>Kanya</span>
              <span style={{ color: '#1e3a5f' }}> in the 12 Houses</span>
            </h2>
            <div
              className="text-xs uppercase tracking-[0.25em] font-semibold mb-2"
              style={{ color: '#d97706' }}
            >
              How the Earth of Kanya Refines Each Bhava
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
              <Activity className="w-4 h-4" style={{ color: '#065f46' }} aria-hidden="true" />
              <div
                className="h-px w-10"
                style={{ background: '#d97706', opacity: 0.4 }}
              />
            </div>
            <p className="text-sm text-gray-700 italic">
              Kanya earth purifies every house it touches, bringing{' '}
              <strong style={{ color: '#d97706' }}>precision, healing</strong> and the gift of discernment.
            </p>
          </div>
        </div>
      </section>

      {/* Section 7, Remedies. JSX card grid on dark forest green. */}
      <section style={{ background: '#052e16', padding: '64px 24px', position: 'relative' }}>
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
              Classical Vedic Remedies for Kanya Rashi
            </h2>
            <p className="text-base" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Strengthen Budha and align with Mercury energy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { main: 'Chant the Budha Beej mantra (Om Bum Budhaya Namah)', sub: '108 times on Wednesday mornings facing north', highlight: 'Budha Beej mantra' },
              { main: 'Wear Emerald (Panna) set in gold on the little finger', sub: 'of the right hand, only after a chart-based recommendation', highlight: 'Emerald (Panna)' },
              { main: 'Donate green vegetables, green cloth, or books', sub: 'to students or scholars on Wednesdays', highlight: 'green vegetables, green cloth' },
              { main: 'Recite the Budha Stotra or Vishnu Sahasranama on Wednesdays', sub: 'for clarity of mind, healing, and skill in work', highlight: 'Budha Stotra or Vishnu Sahasranama' },
              { main: 'Visit a Vishnu temple on Wednesdays', sub: 'and offer tulsi leaves, yellow flowers, and incense', highlight: 'Vishnu temple' },
              { main: 'Practise a daily health or healing discipline: yoga, nutrition, or Ayurveda', sub: 'as a conscious practice that channels Mercury energy constructively', highlight: 'yoga, nutrition, or Ayurveda' },
              { main: 'Reduce excessive self-criticism and anxiety', sub: 'during Mercury-afflicted periods. Cultivate self-compassion alongside discernment', highlight: 'Reduce excessive self-criticism and anxiety' },
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
        style={{ background: '#f0fdf4' }}
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
              ♍
            </div>
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-3 leading-tight">
              <span style={{ color: '#1e3a5f' }}>Frequently Asked </span>
              <span style={{ color: '#065f46' }}>Questions</span>
            </h2>
            <p className="text-gray-600 text-base">
              Your top questions about Kanya Rashi, answered with clarity
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
                    aria-controls={`kanya-faq-${i}`}
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
                      id={`kanya-faq-${i}`}
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
                            alt="Kanya Rashi Maiden zodiac symbol Soul Infinity"
                            width={120}
                            height={120}
                            loading="lazy"
                            style={{
                              width: '120px',
                              height: '120px',
                              borderRadius: '50%',
                              border: '2px solid #065f46',
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
      <section className="py-20 bg-gradient-to-r from-emerald-900 to-teal-900 text-white relative overflow-hidden">
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
            Want a Personalised Kanya Reading?
          </h2>
          <p className="text-xl text-emerald-100 mb-8 leading-relaxed">
            Saurabh Jain at Soul Infinity Astro Solutions reads Kanya placement in the context
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
