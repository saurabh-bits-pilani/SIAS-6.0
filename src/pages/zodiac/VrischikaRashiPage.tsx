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
  Activity,
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
  type LucideIcon,
} from 'lucide-react';
import SEOHead from '../../components/SEOHead';
import SchemaMarkup from '../../components/SchemaMarkup';
import Breadcrumbs from '../../components/Breadcrumbs';
import { getFaqPageSchemaFromList } from '../../data/schema-entities';

const HERO_URL =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Scorpio/hero-banner-vrischika-rashi.webp';
const QUICK_FACTS_URL =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Scorpio/quick-facts-vrischika-rashi.webp';
const MANTRA_BG_URL =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Scorpio/mantra-bg-vrischika-rashi.webp';
const CARD_URL =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Scorpio/vrischika-card.webp';

interface TraitRow {
  icon: LucideIcon;
  label: string;
}

const STRENGTH_ROWS: readonly TraitRow[] = [
  { icon: Target, label: 'Intensely focused' },
  { icon: ShieldCheck, label: 'Loyal and protective' },
  { icon: Zap, label: 'Psychologically perceptive' },
  { icon: Activity, label: 'Resilient and transformative' },
  { icon: Compass, label: 'Deeply investigative' },
  { icon: Mountain, label: 'Emotionally courageous' },
];

const CHALLENGE_ROWS: readonly TraitRow[] = [
  { icon: ChevronsRight, label: 'Possessive and jealous' },
  { icon: Timer, label: 'Secretive and suspicious' },
  { icon: UserX, label: 'Vindictive when hurt' },
  { icon: Clock, label: 'Resistant to vulnerability' },
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
  { num: '01', color: '#7f1d1d', heading: 'LAGNA (SELF)',          icon: User,       desc: 'Intense gaze, magnetic presence, penetrating mind, secretive temperament',           arrow: 'Transformation is the central life theme' },
  { num: '02', color: '#d97706', heading: 'WEALTH & SPEECH',       icon: Coins,      desc: 'Blunt and powerful speech, wealth through research, hidden assets, inheritance',     arrow: 'Financial power through depth and investigation' },
  { num: '03', color: '#db2777', heading: 'COURAGE & SIBLINGS',    icon: Users,      desc: 'Intense and secretive siblings, courageous and penetrating communication',          arrow: 'Short journeys with strategic or investigative purpose' },
  { num: '04', color: '#7c3aed', heading: 'HOME & MOTHER',         icon: Home,       desc: 'Intense domestic life, powerful mother, home as a place of transformation',         arrow: 'Ancestral and karmic patterns shape the home' },
  { num: '05', color: '#db2777', heading: 'CHILDREN & CREATIVITY', icon: Star,       desc: 'Intensely creative children, deep romantic obsession, transformative artistic work', arrow: 'Creation through depth and emotional intensity' },
  { num: '06', color: '#1d4ed8', heading: 'ENEMIES & SERVICE',     icon: Shield,     desc: 'Defeats enemies through strategy, endurance, and psychological insight',             arrow: 'Surgery, research, or investigation as vocation' },
  { num: '07', color: '#0f766e', heading: 'MARRIAGE & PARTNERS',   icon: Heart,      desc: 'Intensely loyal and possessive spouse, transformative partnerships',                 arrow: 'Business through research, occult, or finance' },
  { num: '08', color: '#7c3aed', heading: 'TRANSFORMATION',        icon: Zap,        desc: 'Natural house for Vrischika, exceptional power for deep transformation',            arrow: 'Mastery of the occult, tantra, or hidden sciences' },
  { num: '09', color: '#d97706', heading: 'DHARMA & FATHER',       icon: Compass,    desc: 'Intense and secretive father, dharma through esoteric investigation',                arrow: 'Spiritual path involving deep inner transformation' },
  { num: '10', color: '#1d4ed8', heading: 'CAREER & STATUS',       icon: TrendingUp, desc: 'Career in surgery, research, psychology, finance, occult, or intelligence',         arrow: 'Authority through mastery of hidden knowledge' },
  { num: '11', color: '#7f1d1d', heading: 'GAINS & FRIENDS',       icon: Users,      desc: 'Few but intensely loyal friends, gains through research and shared resources',       arrow: 'Long-term financial power through strategic investment' },
  { num: '12', color: '#0f766e', heading: 'LIBERATION & FOREIGN',  icon: Globe,      desc: 'Spiritual power through surrender of control, liberation through depth',            arrow: 'Moksha through transformation of ego and desire' },
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
    q: 'What is Vrischika Rashi in Vedic astrology?',
    icon: HelpCircle,
    color: '#7f1d1d',
    showImage: true,
    a: (
      <>
        Vrischika Rashi (Scorpio) is the eighth sign of the Vedic sidereal zodiac, spanning 210 to
        240 degrees. It is a <strong style={{ color: '#d97706' }}>fixed water sign</strong> ruled
        by <strong style={{ color: '#d97706' }}>Mangala (Mars)</strong>. Natives with the Moon in
        Vrischika are known for their psychological penetration, fierce loyalty, and an
        unparalleled capacity for transformation and regeneration.
      </>
    ),
    aText:
      'Vrischika Rashi (Scorpio) is the eighth sign of the Vedic sidereal zodiac, spanning 210 to 240 degrees. It is a fixed water sign ruled by Mangala (Mars). Natives with the Moon in Vrischika are known for their psychological penetration, fierce loyalty, and an unparalleled capacity for transformation and regeneration.',
  },
  {
    q: 'Who is the ruling planet of Vrischika Rashi?',
    icon: Globe,
    color: '#d97706',
    a: (
      <>
        Mangala (Mars) rules Vrischika Rashi. In Vrischika, Mars expresses its water quality, deep,
        strategic, and transformative rather than overtly aggressive. Mars governs energy, blood,
        surgery, the military, real estate, and hidden power. Strong Mars in Vrischika produces
        surgeons, researchers, and fearless investigators.
      </>
    ),
    aText:
      'Mangala (Mars) rules Vrischika Rashi. In Vrischika, Mars expresses its water quality, deep, strategic, and transformative rather than overtly aggressive. Mars governs energy, blood, surgery, the military, real estate, and hidden power. Strong Mars in Vrischika produces surgeons, researchers, and fearless investigators.',
  },
  {
    q: 'What are the personality traits of Vrischika Rashi natives?',
    icon: User,
    color: '#7c3aed',
    a: (
      <>
        Vrischika natives are intense, perceptive, and fiercely loyal. They possess an almost
        psychic ability to read people and situations. Their challenges include possessiveness,
        secretiveness, and difficulty forgiving betrayal. When their transformative energy is
        directed inward, Vrischika natives undergo profound personal evolution.
      </>
    ),
    aText:
      'Vrischika natives are intense, perceptive, and fiercely loyal. They possess an almost psychic ability to read people and situations. Their challenges include possessiveness, secretiveness, and difficulty forgiving betrayal. When their transformative energy is directed inward, Vrischika natives undergo profound personal evolution.',
  },
  {
    q: 'Which gemstone is recommended for Vrischika Rashi?',
    icon: Gem,
    color: '#1d4ed8',
    a: (
      <>
        Red Coral (Moonga) is the classical gemstone for Vrischika Rashi, worn to strengthen
        Mangala (Mars). It should be set in copper or gold and worn on the ring finger on a Tuesday
        morning after proper mantra invocation. A chart-based consultation with Soul Infinity Astro
        Solutions is essential before wearing any planetary gemstone.
      </>
    ),
    aText:
      'Red Coral (Moonga) is the classical gemstone for Vrischika Rashi, worn to strengthen Mangala (Mars). It should be set in copper or gold and worn on the ring finger on a Tuesday morning after proper mantra invocation. A chart-based consultation with Soul Infinity Astro Solutions is essential before wearing any planetary gemstone.',
  },
  {
    q: 'What are the lucky days and colours for Vrischika Rashi?',
    icon: Calendar,
    color: '#0f766e',
    a: (
      <>
        Tuesday is the most auspicious day for Vrischika Rashi natives. Deep red, maroon, and
        black are the lucky colours. Fasting on Tuesdays, visiting Hanuman or Kali temples, and
        wearing red on important occasions support Vrischika natives in channelling Mars energy
        constructively.
      </>
    ),
    aText:
      'Tuesday is the most auspicious day for Vrischika Rashi natives. Deep red, maroon, and black are the lucky colours. Fasting on Tuesdays, visiting Hanuman or Kali temples, and wearing red on important occasions support Vrischika natives in channelling Mars energy constructively.',
  },
];

const FAQS: ReadonlyArray<{ question: string; answer: string }> = FAQ_DATA.map((f) => ({
  question: f.q,
  answer: f.aText,
}));

export default function VrischikaRashiPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <SEOHead
        title="Vrischika Rashi (Scorpio), Traits, Mantra, Remedies | Soul Infinity"
        description="Vrischika Rashi (Scorpio) in Vedic astrology, ruled by Mangala (Mars). Personality traits, mantra, remedies, and houses placement, guided by Saurabh Jain."
        keywords="vrischika rashi, scorpio vedic astrology, mangala, mars, scorpio traits, vrischika mantra, red coral, moonga, vrischika remedies, soul infinity"
        image={HERO_URL}
        type="article"
        omitDefaultSchema
      />
      <SchemaMarkup
        type="webpage"
        webPage={{
          name: 'Vrischika Rashi (Scorpio) in Vedic Astrology',
          description:
            'Vrischika Rashi, the eighth sign of the Vedic zodiac, ruled by Mangala (Mars). Personality, mantra, remedies, and houses placement.',
          url: '/zodiac/scorpio',
        }}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Zodiac Signs', url: '/zodiac' },
          { name: 'Vrischika (Scorpio)', url: '/zodiac/scorpio' },
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
          alt="Vrischika Rashi hero banner Soul Infinity Astro Solutions"
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
            { label: 'Vrischika (Scorpio)' },
          ]}
        />
      </div>

      <div>
        {/* Section 2, Title strip. */}
        <section className="bg-white pt-2 pb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <p className="text-sm md:text-base tracking-[0.25em] uppercase text-red-900 font-semibold mb-2">
              <span className="font-devanagari" lang="sa">वृश्चिक राशि</span>
              <span className="mx-2 text-red-900/60">·</span>
              Scorpio
            </p>
            <h1 className="font-heading font-bold text-3xl md:text-5xl text-gray-900 mb-2 leading-tight">
              Vrischika Rashi, The Transformer of the Zodiac
            </h1>
            <p className="text-base md:text-lg text-gray-700">
              Ruled by Mangala (Mars)
              <span className="mx-2 text-gray-400">·</span>
              Water Sign
              <span className="mx-2 text-gray-400">·</span>
              The Scorpion
            </p>
          </div>
        </section>

        {/* Section 3, About Vrischika. Two-column infographic. */}
        <section className="py-12 px-6" style={{ background: '#fff1f2' }}>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

              {/* LEFT COLUMN */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-red-100 text-red-900">
                    <Zap className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="font-heading font-bold text-2xl text-gray-900 leading-tight">
                      Vrischika Rashi
                    </div>
                    <div className="text-sm text-gray-500 italic">in Vedic Astrology</div>
                  </div>
                </div>

                {/* Card 1, intro */}
                <div className="bg-white p-4 rounded-xl flex gap-3" style={{ border: '1px solid #fecdd3' }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-red-100 text-red-900">
                    <Zap className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed m-0">
                    Vrischika (Scorpio) is the <strong style={{ color: '#d97706' }}>eighth sign</strong>{' '}
                    of the Vedic zodiac, ruled by Mangala (Mars). As a{' '}
                    <strong>fixed water sign</strong>, Vrischika combines Mars&apos;s warrior
                    intensity with water&apos;s depth, producing the most penetrating and
                    transformative energy in the zodiac.
                  </p>
                </div>

                {/* Card 2, The Transformer */}
                <div className="bg-white p-4 rounded-xl flex gap-3" style={{ border: '1px solid #fecdd3' }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-red-100 text-red-900">
                    <Zap className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base mb-1" style={{ color: '#7f1d1d' }}>
                      The Transformer
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed m-0">
                      In the Brihat Parashara Hora Shastra, Vrischika is described as a{' '}
                      <strong>fixed water sign</strong> of Kshatriya nature, associated with hidden
                      power, secrets, transformation, and the cycle of death and rebirth.
                    </p>
                  </div>
                </div>

                {/* Card 3, The Investigator */}
                <div className="bg-white p-4 rounded-xl flex gap-3" style={{ border: '1px solid #fecdd3' }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-slate-900 text-white">
                    <Target className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base text-gray-900 mb-1">
                      The Investigator
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed m-0">
                      The Scorpion moves in silence. Vrischika natives observe everything and
                      reveal nothing until the moment of{' '}
                      <strong style={{ color: '#d97706' }}>decisive action</strong> arrives,
                      combining Mars&apos;s directness with water&apos;s capacity to reach into
                      hidden depths.
                    </p>
                  </div>
                </div>

                {/* Card 4, Born to Transform */}
                <div className="bg-white p-4 rounded-xl flex gap-3" style={{ border: '1px solid #fecdd3' }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-red-100 text-red-900">
                    <Activity className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base mb-1" style={{ color: '#7f1d1d' }}>
                      Born to Transform
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed m-0">
                      Where Tula seeks harmony with the world as it is, Vrischika seeks to
                      fundamentally <strong>transform</strong> it. No other sign carries a greater
                      capacity for both destruction and regeneration.
                    </p>
                  </div>
                </div>

                {/* Bottom card, Soul Infinity insight */}
                <div className="p-4 rounded-xl flex gap-3" style={{ background: '#fee2e2', border: '1px solid #fca5a5' }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-red-200 text-red-900">
                    <Star className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base mb-1" style={{ color: '#7f1d1d' }}>
                      Soul Infinity Astrologers Insight
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed m-0 italic">
                      At Soul Infinity Astro Solutions, Saurabh Jain observes that Vrischika
                      ascendants and Moon sign natives often arrive at decisions requiring depth
                      and inner transformation, and their chart invariably shows the planetary
                      support for fearless penetration into hidden truths.
                    </p>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="lg:col-span-7 space-y-4">
                <img
                  src={QUICK_FACTS_URL}
                  alt="Vrischika Rashi Quick Facts Soul Infinity"
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

                {/* Mars rulership card */}
                <div className="bg-white p-4 rounded-xl" style={{ border: '1px solid #fecdd3' }}>
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-red-100 text-red-900">
                      <Zap className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading font-bold text-base mb-1" style={{ color: '#7f1d1d' }}>
                        Ruled by Mangala (Mars)
                      </h3>
                      <p className="text-sm text-gray-700 leading-relaxed m-0">
                        The ruling planet Mangala governs <strong>energy</strong>,{' '}
                        <strong>blood and surgery</strong>, <strong>the military</strong>,{' '}
                        <strong>real estate</strong>, <strong>hidden power</strong>, and{' '}
                        <strong>transformation</strong> in Vedic astrology.
                      </p>
                    </div>
                    <div className="hidden md:flex flex-col gap-1.5 text-red-900/70 pt-1">
                      <Zap className="w-4 h-4" aria-hidden="true" />
                      <Activity className="w-4 h-4" aria-hidden="true" />
                      <Target className="w-4 h-4" aria-hidden="true" />
                      <Shield className="w-4 h-4" aria-hidden="true" />
                      <Compass className="w-4 h-4" aria-hidden="true" />
                    </div>
                  </div>
                </div>

                {/* Power and Potential card */}
                <div className="bg-white p-4 rounded-xl" style={{ border: '1px solid #fecdd3' }}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                    <div className="md:col-span-2 flex gap-3">
                      <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-rose-100 text-rose-700">
                        <Target className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-base text-gray-900 mb-1">
                          Power and Potential
                        </h3>
                        <p className="text-sm text-gray-700 leading-relaxed m-0">
                          A well-placed Mars in a Vrischika chart amplifies{' '}
                          <strong style={{ color: '#d97706' }}>strategic intelligence</strong>,
                          investigative skill, and the capacity for profound personal regeneration.
                        </p>
                      </div>
                    </div>
                    <div className="rounded-lg p-3" style={{ background: '#fff1f2', border: '1px solid #fecaca' }}>
                      <p className="text-xs leading-relaxed m-0 italic" style={{ color: '#7f1d1d' }}>
                        An afflicted Mars can bring obsession, jealousy, and a destructive use of
                        power.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mahadasha Timing card */}
                <div className="bg-white p-4 rounded-xl flex gap-3" style={{ border: '1px solid #fecdd3' }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-rose-100 text-rose-700">
                    <Clock className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base text-gray-900 mb-1">
                      Mahadasha Timing
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed m-0">
                      Understanding Mars placement, its dignity, aspects, and Mahadasha timing is
                      central to reading a Vrischika chart accurately.
                    </p>
                  </div>
                </div>

                {/* Vimshottari Dasha card */}
                <div className="bg-white p-5 rounded-xl" style={{ border: '1px solid #fecdd3' }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-red-100 text-red-900">
                      <Star className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <h3 className="font-heading font-bold text-lg text-gray-900 m-0">
                      Vimshottari Dasha System
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 leading-relaxed">
                    <p className="m-0">
                      In the Vimshottari Dasha system, Vrischika natives often experience{' '}
                      <strong style={{ color: '#d97706' }}>seven-year Mars Mahadasha</strong>{' '}
                      cycles that profoundly shape their transformative and investigative life.
                    </p>
                    <p className="m-0">
                      The sign itself spans the last three padas of <strong>Vishakha</strong>,
                      all of <strong>Anuradha</strong>, and the entirety of{' '}
                      <strong>Jyeshtha</strong> nakshatras.
                    </p>
                  </div>

                  {/* Three nakshatra mini cards */}
                  <div className="grid grid-cols-3 gap-3 mt-4">
                    <div className="text-center p-3 rounded-lg" style={{ background: '#fef3c7', border: '1px solid #fde68a' }}>
                      <div className="w-9 h-9 mx-auto rounded-full flex items-center justify-center mb-2 bg-amber-200 text-amber-700">
                        <Star className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <div className="font-heading font-bold text-sm text-amber-700">Vishakha</div>
                      <div className="text-xs text-gray-600 mt-1">Forked goal pursuit</div>
                    </div>
                    <div className="text-center p-3 rounded-lg" style={{ background: '#fee2e2', border: '1px solid #fecaca' }}>
                      <div className="w-9 h-9 mx-auto rounded-full flex items-center justify-center mb-2 bg-red-200 text-red-700">
                        <Heart className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <div className="font-heading font-bold text-sm text-red-700">Anuradha</div>
                      <div className="text-xs text-gray-600 mt-1">Devotion and friendship</div>
                    </div>
                    <div className="text-center p-3 rounded-lg" style={{ background: '#ffe4e6', border: '1px solid #fecdd3' }}>
                      <div className="w-9 h-9 mx-auto rounded-full flex items-center justify-center mb-2 bg-rose-200 text-rose-800">
                        <Shield className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <div className="font-heading font-bold text-sm text-rose-800">Jyeshtha</div>
                      <div className="text-xs text-gray-600 mt-1">Eldest, hidden power</div>
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
            Salutation to Mangala (Mars), the warrior planet of courage and transformation, ruler of Vrischika Rashi.
          </div>
          <div className="inline-block bg-amber-500 text-gray-900 px-5 py-2 rounded-full text-sm font-semibold shadow-md">
            Chant 108 times
            <span className="mx-2">·</span>
            Tuesday mornings
          </div>
        </div>
      </section>

      {/* Section 5, Strengths and Challenges. */}
      <section
        className="relative overflow-hidden"
        style={{ background: '#fff1f2', padding: '64px 24px' }}
      >
        {/* Faint Scorpion watermark */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            fontSize: '120px',
            opacity: 0.06,
            color: '#7f1d1d',
            userSelect: 'none',
            lineHeight: 1,
          }}
        >
          ♏
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
                color: '#7f1d1d',
                fontStyle: 'italic',
                lineHeight: 1.1,
                marginTop: '4px',
              }}
            >
              Vrischika Natives
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
              The penetrating water within, strengths that transform legacy and challenges that test trust.
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
                  background: 'linear-gradient(135deg, #4c0519, #9f1239)',
                  padding: '20px 24px',
                }}
              >
                <div
                  className="bg-white rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ width: '52px', height: '52px' }}
                >
                  <ShieldCheck style={{ color: '#9f1239', width: '28px', height: '28px' }} aria-hidden="true" />
                </div>
                <h3 style={{ color: 'white', fontSize: '24px', fontWeight: 700, margin: 0 }}>
                  Strengths
                </h3>
              </div>

              <div className="bg-white divide-y divide-rose-50">
                {STRENGTH_ROWS.map((row) => {
                  const Icon = row.icon;
                  return (
                    <div
                      key={row.label}
                      className="flex items-center gap-3 hover:bg-rose-50 transition-colors"
                      style={{ padding: '14px 20px' }}
                    >
                      <div
                        className="rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ width: '40px', height: '40px', background: '#fff1f2' }}
                      >
                        <Icon style={{ color: '#9f1239', width: '20px', height: '20px' }} aria-hidden="true" />
                      </div>
                      <div
                        className="flex-1 font-bold text-gray-800"
                        style={{ fontSize: '15px' }}
                      >
                        {row.label}
                      </div>
                      <span style={{ color: '#fecdd3', fontWeight: 400 }} aria-hidden="true">|</span>
                      <span
                        style={{ color: '#9f1239', fontWeight: 700 }}
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
            <Zap size={18} color="#7f1d1d" aria-hidden="true" />
            <p style={{ fontSize: '14px', color: '#374151', margin: 0 }}>
              When guided with awareness, the intensity of Vrischika becomes a{' '}
              <strong style={{ color: '#d97706' }}>force of regeneration.</strong>
            </p>
            <span style={{ color: '#d97706', fontSize: '12px' }} aria-hidden="true">
              ✦ ✦ ✦
            </span>
          </div>
        </div>
      </section>

      {/* Section 6, Vrischika in the 12 Houses. */}
      <section className="py-16 px-6" style={{ background: '#fff1f2' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div
              className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4"
              style={{ background: '#fee2e2', color: '#7f1d1d' }}
            >
              <Target className="w-6 h-6" aria-hidden="true" />
            </div>
            <h2 className="font-heading font-bold text-3xl md:text-5xl mb-3 leading-tight">
              <span style={{ color: '#7f1d1d' }}>Vrischika</span>
              <span style={{ color: '#1e3a5f' }}> in the 12 Houses</span>
            </h2>
            <div
              className="text-xs uppercase tracking-[0.25em] font-semibold mb-2"
              style={{ color: '#d97706' }}
            >
              How the Water of Vrischika Transforms Each Bhava
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
              <Zap className="w-4 h-4" style={{ color: '#7f1d1d' }} aria-hidden="true" />
              <div
                className="h-px w-10"
                style={{ background: '#d97706', opacity: 0.4 }}
              />
            </div>
            <p className="text-sm text-gray-700 italic">
              Vrischika water transforms every house it touches, bringing{' '}
              <strong style={{ color: '#d97706' }}>depth, intensity</strong> and the power of regeneration.
            </p>
          </div>
        </div>
      </section>

      {/* Section 7, Remedies. JSX card grid on dark red bg. */}
      <section style={{ background: '#0f0505', padding: '64px 24px', position: 'relative' }}>
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
              Classical Vedic Remedies for Vrischika Rashi
            </h2>
            <p className="text-base" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Strengthen Mangala and align with Mars energy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { main: 'Chant the Mangala Beej mantra (Om Kraam Kreem Kraum Sah Bhaumaya Namah)', sub: '108 times on Tuesday mornings', highlight: 'Mangala Beej mantra' },
              { main: 'Wear Red Coral (Moonga) set in copper or gold', sub: 'on the ring finger, only after a chart-based recommendation', highlight: 'Red Coral (Moonga)' },
              { main: 'Donate red lentils (masoor dal), red cloth, or copper items', sub: 'on Tuesdays at a Hanuman or Bhairava temple', highlight: 'red lentils, red cloth' },
              { main: 'Recite the Hanuman Chalisa or Bhairava Ashtakam on Tuesdays', sub: 'for protection during Mars Mahadasha and challenging transits', highlight: 'Hanuman Chalisa or Bhairava Ashtakam' },
              { main: 'Visit a Hanuman or Kali temple on Tuesdays', sub: 'and offer sindoor, sesame oil, and red flowers', highlight: 'Hanuman or Kali temple' },
              { main: 'Engage in deep psychological self-inquiry, meditation, or transformative healing practices', sub: 'to channel Vrischika intensity constructively', highlight: 'psychological self-inquiry, meditation' },
              { main: 'Avoid obsession, jealousy, and the desire for revenge', sub: 'during Mars-afflicted periods. Cultivate forgiveness and the power of letting go', highlight: 'Avoid obsession, jealousy' },
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
        style={{ background: '#fff1f2' }}
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
              ♏
            </div>
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-3 leading-tight">
              <span style={{ color: '#1e3a5f' }}>Frequently Asked </span>
              <span style={{ color: '#7f1d1d' }}>Questions</span>
            </h2>
            <p className="text-gray-600 text-base">
              Your top questions about Vrischika Rashi, answered with clarity
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
                    aria-controls={`vrischika-faq-${i}`}
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
                      id={`vrischika-faq-${i}`}
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
                            alt="Vrischika Rashi Scorpion zodiac symbol Soul Infinity"
                            width={120}
                            height={120}
                            loading="lazy"
                            style={{
                              width: '120px',
                              height: '120px',
                              borderRadius: '50%',
                              border: '2px solid #7f1d1d',
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
      <section className="py-20 bg-gradient-to-r from-red-900 to-rose-900 text-white relative overflow-hidden">
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
            Want a Personalised Vrischika Reading?
          </h2>
          <p className="text-xl text-rose-100 mb-8 leading-relaxed">
            Saurabh Jain at Soul Infinity Astro Solutions reads Vrischika placement in the context
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
