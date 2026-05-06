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
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Aquarius/hero-banner-kumbha-rashi.webp';
const QUICK_FACTS_URL =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Aquarius/quick-facts-kumbha-rashi.webp';
const MANTRA_BG_URL =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Aquarius/mantra-bg-kumbha-rashi.webp';
const CARD_URL =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Aquarius/kumbha-card.webp';

interface TraitRow {
  icon: LucideIcon;
  label: string;
}

const STRENGTH_ROWS: readonly TraitRow[] = [
  { icon: Globe, label: 'Humanitarian and visionary' },
  { icon: Zap, label: 'Original and innovative' },
  { icon: Users, label: 'Community-oriented' },
  { icon: TrendingUp, label: 'Intellectually independent' },
  { icon: Compass, label: 'Idealistic and principled' },
  { icon: Star, label: 'Progressive and forward-thinking' },
];

const CHALLENGE_ROWS: readonly TraitRow[] = [
  { icon: ChevronsRight, label: 'Emotionally detached' },
  { icon: Timer, label: 'Stubborn about ideas' },
  { icon: UserX, label: 'Eccentric and unpredictable' },
  { icon: Clock, label: 'Difficulty with intimacy' },
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
  { num: '01', color: '#0e7490', heading: 'LAGNA (SELF)',          icon: User,       desc: 'Unconventional appearance, intellectual presence, humanitarian values, independent',      arrow: 'Unique contribution to the world is the life purpose' },
  { num: '02', color: '#d97706', heading: 'WEALTH & SPEECH',       icon: Coins,      desc: 'Original and unconventional speech, income through technology and social networks',     arrow: 'Wealth through innovation and collective enterprise' },
  { num: '03', color: '#db2777', heading: 'COURAGE & SIBLINGS',    icon: Users,      desc: 'Intellectual and unconventional siblings, bold original communication and writing',      arrow: 'Short journeys connected to networks and social causes' },
  { num: '04', color: '#7c3aed', heading: 'HOME & MOTHER',         icon: Home,       desc: 'Unconventional home, independent mother, value of intellectual freedom over comfort',   arrow: 'Home as a gathering place for ideas and community' },
  { num: '05', color: '#db2777', heading: 'CHILDREN & CREATIVITY', icon: Star,       desc: 'Independent-thinking children, creativity through technology and original concepts',     arrow: 'Innovation and social impact as creative expressions' },
  { num: '06', color: '#1d4ed8', heading: 'ENEMIES & SERVICE',     icon: Shield,     desc: 'Overcomes challenges through innovation and collective action',                          arrow: 'Technology, social work, or scientific research careers' },
  { num: '07', color: '#0f766e', heading: 'MARRIAGE & PARTNERS',   icon: Heart,      desc: 'Unconventional and intellectually stimulating spouse, friendship within marriage',       arrow: 'Business through networks, technology, or social enterprise' },
  { num: '08', color: '#7c3aed', heading: 'TRANSFORMATION',        icon: Zap,        desc: 'Transformation through radical shifts in belief and social identity',                    arrow: 'Research in astrology, technology, or hidden knowledge' },
  { num: '09', color: '#d97706', heading: 'DHARMA & FATHER',       icon: Compass,    desc: 'Unconventional and free-thinking father, dharma through social reform and vision',       arrow: 'Universal philosophy that transcends any single tradition' },
  { num: '10', color: '#1d4ed8', heading: 'CAREER & STATUS',       icon: TrendingUp, desc: 'Career in technology, science, social enterprise, astrology, or reform movements',      arrow: 'Recognition through innovation and humanitarian contribution' },
  { num: '11', color: '#0e7490', heading: 'GAINS & FRIENDS',       icon: Users,      desc: 'Natural house for Kumbha, large and diverse social networks, gains through groups',     arrow: 'Financial growth through technology and collective effort' },
  { num: '12', color: '#0f766e', heading: 'LIBERATION & FOREIGN',  icon: Globe,      desc: 'Liberation through dissolution of ego into universal consciousness',                     arrow: 'Foreign lands and spiritual retreat as paths to moksha' },
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
    q: 'What is Kumbha Rashi in Vedic astrology?',
    icon: HelpCircle,
    color: '#0e7490',
    showImage: true,
    a: (
      <>
        Kumbha Rashi (Aquarius) is the eleventh sign of the Vedic sidereal zodiac, spanning 300 to
        330 degrees. It is a <strong style={{ color: '#d97706' }}>fixed air sign</strong> ruled by{' '}
        <strong style={{ color: '#d97706' }}>Shani (Saturn)</strong>. Natives with the Moon in
        Kumbha are known for their originality, humanitarian vision, and an independent intellect
        that operates best when working toward the greater collective good.
      </>
    ),
    aText:
      'Kumbha Rashi (Aquarius) is the eleventh sign of the Vedic sidereal zodiac, spanning 300 to 330 degrees. It is a fixed air sign ruled by Shani (Saturn). Natives with the Moon in Kumbha are known for their originality, humanitarian vision, and an independent intellect that operates best when working toward the greater collective good.',
  },
  {
    q: 'Who is the ruling planet of Kumbha Rashi?',
    icon: Globe,
    color: '#d97706',
    a: (
      <>
        Shani (Saturn) rules Kumbha Rashi, as it also rules Makara. In Kumbha, Saturn expresses its
        air quality: universal, intellectual, and reform-oriented. Saturn governs karma,
        discipline, service, technology, and the slow progress of humanity. Strong Saturn in
        Kumbha produces visionaries, scientists, and social reformers.
      </>
    ),
    aText:
      'Shani (Saturn) rules Kumbha Rashi, as it also rules Makara. In Kumbha, Saturn expresses its air quality: universal, intellectual, and reform-oriented. Saturn governs karma, discipline, service, technology, and the slow progress of humanity. Strong Saturn in Kumbha produces visionaries, scientists, and social reformers.',
  },
  {
    q: 'What are the personality traits of Kumbha Rashi natives?',
    icon: User,
    color: '#7c3aed',
    a: (
      <>
        Kumbha natives are original, humanitarian, and intellectually independent. They think in
        systems, care deeply about collective wellbeing, and often feel ahead of their time. Their
        challenges include emotional detachment, stubbornness about ideas, and difficulty with
        intimate relationships. When Saturn&apos;s discipline meets Kumbha&apos;s vision, these
        natives change the world.
      </>
    ),
    aText:
      "Kumbha natives are original, humanitarian, and intellectually independent. They think in systems, care deeply about collective wellbeing, and often feel ahead of their time. Their challenges include emotional detachment, stubbornness about ideas, and difficulty with intimate relationships. When Saturn's discipline meets Kumbha's vision, these natives change the world.",
  },
  {
    q: 'Which gemstone is recommended for Kumbha Rashi?',
    icon: Gem,
    color: '#1d4ed8',
    a: (
      <>
        Blue Sapphire (Neelam) is the classical gemstone for Kumbha Rashi, worn to strengthen Shani
        (Saturn). It is a powerful stone that must only be worn after a thorough chart-based
        consultation with a qualified jyotishi. A consultation with Soul Infinity Astro Solutions
        is strongly recommended before wearing Blue Sapphire under any circumstances.
      </>
    ),
    aText:
      'Blue Sapphire (Neelam) is the classical gemstone for Kumbha Rashi, worn to strengthen Shani (Saturn). It is a powerful stone that must only be worn after a thorough chart-based consultation with a qualified jyotishi. A consultation with Soul Infinity Astro Solutions is strongly recommended before wearing Blue Sapphire under any circumstances.',
  },
  {
    q: 'What are the lucky days and colours for Kumbha Rashi?',
    icon: Calendar,
    color: '#0f766e',
    a: (
      <>
        Saturday is the most auspicious day for Kumbha Rashi natives. Electric blue, turquoise,
        and dark violet are the lucky colours. Engaging in community service on Saturdays,
        lighting sesame oil lamps, and wearing dark blue on important occasions support Kumbha
        natives in channelling Saturn&apos;s collective service energy constructively.
      </>
    ),
    aText:
      "Saturday is the most auspicious day for Kumbha Rashi natives. Electric blue, turquoise, and dark violet are the lucky colours. Engaging in community service on Saturdays, lighting sesame oil lamps, and wearing dark blue on important occasions support Kumbha natives in channelling Saturn's collective service energy constructively.",
  },
];

const FAQS: ReadonlyArray<{ question: string; answer: string }> = FAQ_DATA.map((f) => ({
  question: f.q,
  answer: f.aText,
}));

export default function KumbhaRashiPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <SEOHead
        title="Kumbha Rashi (Aquarius), Traits, Mantra, Remedies | Soul Infinity"
        description="Kumbha Rashi (Aquarius) in Vedic astrology, ruled by Shani (Saturn). Personality traits, mantra, remedies, and houses placement, guided by Saurabh Jain."
        keywords="kumbha rashi, aquarius vedic astrology, shani, saturn, aquarius traits, kumbha mantra, blue sapphire, neelam, kumbha remedies, soul infinity"
        image={HERO_URL}
        type="article"
        omitDefaultSchema
      />
      <SchemaMarkup
        type="webpage"
        webPage={{
          name: 'Kumbha Rashi (Aquarius) in Vedic Astrology',
          description:
            'Kumbha Rashi, the eleventh sign of the Vedic zodiac, ruled by Shani (Saturn). Personality, mantra, remedies, and houses placement.',
          url: '/zodiac/aquarius',
        }}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Zodiac Signs', url: '/zodiac' },
          { name: 'Kumbha (Aquarius)', url: '/zodiac/aquarius' },
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
          alt="Kumbha Rashi hero banner Soul Infinity Astro Solutions"
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
            { label: 'Kumbha (Aquarius)' },
          ]}
        />
      </div>

      <div>
        {/* Section 2, Title strip. */}
        <section className="bg-white pt-2 pb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <p className="text-sm md:text-base tracking-[0.25em] uppercase text-cyan-700 font-semibold mb-2">
              <span className="font-devanagari" lang="sa">कुम्भ राशि</span>
              <span className="mx-2 text-cyan-700/60">·</span>
              Aquarius
            </p>
            <h1 className="font-heading font-bold text-3xl md:text-5xl text-gray-900 mb-2 leading-tight">
              Kumbha Rashi, The Visionary of the Zodiac
            </h1>
            <p className="text-base md:text-lg text-gray-700">
              Ruled by Shani (Saturn)
              <span className="mx-2 text-gray-400">·</span>
              Air Sign
              <span className="mx-2 text-gray-400">·</span>
              The Water Bearer
            </p>
          </div>
        </section>

        {/* Section 3, About Kumbha. Two-column infographic. */}
        <section className="py-12 px-6" style={{ background: '#f0fafa' }}>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

              {/* LEFT COLUMN */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-cyan-100 text-cyan-700">
                    <Gem className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="font-heading font-bold text-2xl text-gray-900 leading-tight">
                      Kumbha Rashi
                    </div>
                    <div className="text-sm text-gray-500 italic">in Vedic Astrology</div>
                  </div>
                </div>

                {/* Card 1, intro */}
                <div className="bg-white p-4 rounded-xl flex gap-3" style={{ border: '1px solid #a5f3fc' }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-cyan-100 text-cyan-700">
                    <Globe className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed m-0">
                    Kumbha (Aquarius) is the <strong style={{ color: '#d97706' }}>eleventh sign</strong>{' '}
                    of the Vedic zodiac, ruled by Shani (Saturn). As a{' '}
                    <strong>fixed air sign</strong>, Kumbha channels Saturn&apos;s discipline into
                    the realm of ideas, creating the most unconventional, humanitarian, and
                    future-oriented sign of the zodiac.
                  </p>
                </div>

                {/* Card 2, The Visionary */}
                <div className="bg-white p-4 rounded-xl flex gap-3" style={{ border: '1px solid #a5f3fc' }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-cyan-100 text-cyan-700">
                    <Zap className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base mb-1" style={{ color: '#0e7490' }}>
                      The Visionary
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed m-0">
                      In the Brihat Parashara Hora Shastra, Kumbha is described as a{' '}
                      <strong>fixed air sign</strong> of service nature, symbolised by the water
                      bearer who pours knowledge and life-giving wisdom onto the world without
                      asking anything in return.
                    </p>
                  </div>
                </div>

                {/* Card 3, The Humanitarian */}
                <div className="bg-white p-4 rounded-xl flex gap-3" style={{ border: '1px solid #a5f3fc' }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-slate-900 text-white">
                    <Users className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base text-gray-900 mb-1">
                      The Humanitarian
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed m-0">
                      The Water Bearer gives to the collective. Kumbha natives possess an innate
                      sense of <strong style={{ color: '#d97706' }}>social responsibility</strong>{' '}
                      and a vision of the world that extends far beyond personal concerns.
                    </p>
                  </div>
                </div>

                {/* Card 4, Born to Serve Humanity */}
                <div className="bg-white p-4 rounded-xl flex gap-3" style={{ border: '1px solid #a5f3fc' }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-cyan-100 text-cyan-700">
                    <Globe className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base mb-1" style={{ color: '#0e7490' }}>
                      Born to Serve Humanity
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed m-0">
                      Where Makara builds institutions, Kumbha <strong>reforms</strong> them. The
                      most original and iconoclastic thinkers of the zodiac, Kumbha natives are
                      driven by an unwavering conviction that the world can be better than it is.
                    </p>
                  </div>
                </div>

                {/* Bottom card, Soul Infinity insight */}
                <div className="p-4 rounded-xl flex gap-3" style={{ background: '#cffafe', border: '1px solid #67e8f9' }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-cyan-200 text-cyan-800">
                    <Star className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base mb-1" style={{ color: '#155e75' }}>
                      Soul Infinity Astrologers Insight
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed m-0 italic">
                      At Soul Infinity Astro Solutions, Saurabh Jain observes that Kumbha
                      ascendants and Moon sign natives often arrive when their work intersects
                      with social impact, and their chart consistently shows the planetary support
                      for collective service when the timing is right.
                    </p>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="lg:col-span-7 space-y-4">
                <img
                  src={QUICK_FACTS_URL}
                  alt="Kumbha Rashi Quick Facts Soul Infinity"
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
                <div className="bg-white p-4 rounded-xl" style={{ border: '1px solid #a5f3fc' }}>
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-cyan-100 text-cyan-700">
                      <Globe className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading font-bold text-base mb-1" style={{ color: '#0e7490' }}>
                        Ruled by Shani (Saturn)
                      </h3>
                      <p className="text-sm text-gray-700 leading-relaxed m-0">
                        The ruling planet Shani governs <strong>karma</strong>,{' '}
                        <strong>discipline</strong>, <strong>service</strong>,{' '}
                        <strong>technology</strong>, and the slow{' '}
                        <strong>progress of humanity</strong> in Vedic astrology.
                      </p>
                    </div>
                    <div className="hidden md:flex flex-col gap-1.5 text-cyan-700/70 pt-1">
                      <Globe className="w-4 h-4" aria-hidden="true" />
                      <Zap className="w-4 h-4" aria-hidden="true" />
                      <Users className="w-4 h-4" aria-hidden="true" />
                      <Compass className="w-4 h-4" aria-hidden="true" />
                      <Shield className="w-4 h-4" aria-hidden="true" />
                    </div>
                  </div>
                </div>

                {/* Power and Potential card */}
                <div className="bg-white p-4 rounded-xl" style={{ border: '1px solid #a5f3fc' }}>
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
                          A well-placed Saturn in a Kumbha chart amplifies{' '}
                          <strong style={{ color: '#d97706' }}>visionary intellect</strong>,
                          humanitarian drive, and the capacity to build lasting reform within
                          collective systems.
                        </p>
                      </div>
                    </div>
                    <div className="rounded-lg p-3" style={{ background: '#f0fafa', border: '1px solid #67e8f9' }}>
                      <p className="text-xs leading-relaxed m-0 italic" style={{ color: '#155e75' }}>
                        An afflicted Saturn can bring isolation, emotional distance, and rigidity
                        of thought.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mahadasha Timing card */}
                <div className="bg-white p-4 rounded-xl flex gap-3" style={{ border: '1px solid #a5f3fc' }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-teal-100 text-teal-600">
                    <Clock className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base text-gray-900 mb-1">
                      Mahadasha Timing
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed m-0">
                      Understanding Saturn placement, its dignity, aspects, and Mahadasha timing
                      is central to reading a Kumbha chart accurately.
                    </p>
                  </div>
                </div>

                {/* Vimshottari Dasha card */}
                <div className="bg-white p-5 rounded-xl" style={{ border: '1px solid #a5f3fc' }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-cyan-100 text-cyan-700">
                      <Star className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <h3 className="font-heading font-bold text-lg text-gray-900 m-0">
                      Vimshottari Dasha System
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 leading-relaxed">
                    <p className="m-0">
                      In the Vimshottari Dasha system, Kumbha natives often experience{' '}
                      <strong style={{ color: '#d97706' }}>nineteen-year Saturn Mahadasha</strong>{' '}
                      cycles that profoundly shape their intellectual and humanitarian life.
                    </p>
                    <p className="m-0">
                      The sign itself spans the last two padas of <strong>Dhanishta</strong>,
                      all of <strong>Shatabhisha</strong>, and the first three padas of{' '}
                      <strong>Purva Bhadrapada</strong> nakshatras.
                    </p>
                  </div>

                  {/* Three nakshatra mini cards */}
                  <div className="grid grid-cols-3 gap-3 mt-4">
                    <div className="text-center p-3 rounded-lg" style={{ background: '#fef3c7', border: '1px solid #fde68a' }}>
                      <div className="w-9 h-9 mx-auto rounded-full flex items-center justify-center mb-2 bg-amber-200 text-amber-700">
                        <Star className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <div className="font-heading font-bold text-sm text-amber-700">Dhanishta</div>
                      <div className="text-xs text-gray-600 mt-1">Wealth and rhythm</div>
                    </div>
                    <div className="text-center p-3 rounded-lg" style={{ background: '#cffafe', border: '1px solid #67e8f9' }}>
                      <div className="w-9 h-9 mx-auto rounded-full flex items-center justify-center mb-2 bg-cyan-200 text-cyan-700">
                        <Globe className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <div className="font-heading font-bold text-sm text-cyan-700">Shatabhisha</div>
                      <div className="text-xs text-gray-600 mt-1">Healing and mystery</div>
                    </div>
                    <div className="text-center p-3 rounded-lg" style={{ background: '#ede9fe', border: '1px solid #ddd6fe' }}>
                      <div className="w-9 h-9 mx-auto rounded-full flex items-center justify-center mb-2 bg-violet-200 text-violet-700">
                        <Compass className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <div className="font-heading font-bold text-sm text-violet-700">Purva Bhadrapada</div>
                      <div className="text-xs text-gray-600 mt-1">Vision and intensity</div>
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
            Salutation to Shani (Saturn), lord of karma, structure, and universal service, ruler
            of Kumbha Rashi.
          </div>
          <div className="inline-block bg-amber-500 text-gray-900 px-5 py-2 rounded-full text-sm font-semibold shadow-md">
            Chant 108 times
            <span className="mx-2">·</span>
            Saturday mornings
          </div>
        </div>
      </section>

      {/* Section 5, Strengths and Challenges. */}
      <section
        className="relative overflow-hidden"
        style={{ background: '#f0fafa', padding: '64px 24px' }}
      >
        {/* Faint Water Bearer watermark */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            fontSize: '120px',
            opacity: 0.06,
            color: '#0e7490',
            userSelect: 'none',
            lineHeight: 1,
          }}
        >
          ♒
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
                color: '#0e7490',
                fontStyle: 'italic',
                lineHeight: 1.1,
                marginTop: '4px',
              }}
            >
              Kumbha Natives
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
              The visionary air within, strengths that reform the collective and challenges that
              test connection.
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
                  background: 'linear-gradient(135deg, #164e63, #0891b2)',
                  padding: '20px 24px',
                }}
              >
                <div
                  className="bg-white rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ width: '52px', height: '52px' }}
                >
                  <ShieldCheck style={{ color: '#0891b2', width: '28px', height: '28px' }} aria-hidden="true" />
                </div>
                <h3 style={{ color: 'white', fontSize: '24px', fontWeight: 700, margin: 0 }}>
                  Strengths
                </h3>
              </div>

              <div className="bg-white divide-y divide-cyan-50">
                {STRENGTH_ROWS.map((row) => {
                  const Icon = row.icon;
                  return (
                    <div
                      key={row.label}
                      className="flex items-center gap-3 hover:bg-cyan-50 transition-colors"
                      style={{ padding: '14px 20px' }}
                    >
                      <div
                        className="rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ width: '40px', height: '40px', background: '#f0fafa' }}
                      >
                        <Icon style={{ color: '#0891b2', width: '20px', height: '20px' }} aria-hidden="true" />
                      </div>
                      <div
                        className="flex-1 font-bold text-gray-800"
                        style={{ fontSize: '15px' }}
                      >
                        {row.label}
                      </div>
                      <span style={{ color: '#cffafe', fontWeight: 400 }} aria-hidden="true">|</span>
                      <span
                        style={{ color: '#0891b2', fontWeight: 700 }}
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
            <Gem size={18} color="#0e7490" aria-hidden="true" />
            <p style={{ fontSize: '14px', color: '#374151', margin: 0 }}>
              When guided with awareness, the vision of Kumbha becomes a{' '}
              <strong style={{ color: '#d97706' }}>force of collective transformation.</strong>
            </p>
            <span style={{ color: '#d97706', fontSize: '12px' }} aria-hidden="true">
              ✦ ✦ ✦
            </span>
          </div>
        </div>
      </section>

      {/* Section 6, Kumbha in the 12 Houses. */}
      <section className="py-16 px-6" style={{ background: '#f0fafa' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div
              className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4"
              style={{ background: '#cffafe', color: '#0e7490' }}
            >
              <Target className="w-6 h-6" aria-hidden="true" />
            </div>
            <h2 className="font-heading font-bold text-3xl md:text-5xl mb-3 leading-tight">
              <span style={{ color: '#0e7490' }}>Kumbha</span>
              <span style={{ color: '#1e3a5f' }}> in the 12 Houses</span>
            </h2>
            <div
              className="text-xs uppercase tracking-[0.25em] font-semibold mb-2"
              style={{ color: '#d97706' }}
            >
              How the Air of Kumbha Innovates Each Bhava
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
              <Globe className="w-4 h-4" style={{ color: '#0e7490' }} aria-hidden="true" />
              <div
                className="h-px w-10"
                style={{ background: '#d97706', opacity: 0.4 }}
              />
            </div>
            <p className="text-sm text-gray-700 italic">
              Kumbha air transforms every house it touches, bringing{' '}
              <strong style={{ color: '#d97706' }}>vision, innovation</strong> and the
              humanitarian&apos;s gift to the collective.
            </p>
          </div>
        </div>
      </section>

      {/* Section 7, Remedies. JSX card grid on dark cyan-black bg. */}
      <section style={{ background: '#020c14', padding: '64px 24px', position: 'relative' }}>
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
              Classical Vedic Remedies for Kumbha Rashi
            </h2>
            <p className="text-base" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Strengthen Shani and align with Saturn energy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { main: 'Chant the Shani Beej mantra (Om Praam Preem Praum Sah Shanaischaraya Namah)', sub: '108 times on Saturday mornings', highlight: 'Shani Beej mantra' },
              { main: 'Wear Blue Sapphire (Neelam) set in silver or iron', sub: 'on the middle finger, only after a thorough chart-based consultation', highlight: 'Blue Sapphire (Neelam)' },
              { main: 'Donate black sesame seeds, dark blue cloth, mustard oil, or iron items', sub: 'on Saturdays to the underprivileged or at a Shani temple', highlight: 'black sesame seeds, dark blue cloth' },
              { main: 'Recite the Shani Stotra or Hanuman Chalisa on Saturdays', sub: 'for karmic relief and the harmonious expression of Saturnine energy', highlight: 'Shani Stotra or Hanuman Chalisa' },
              { main: 'Engage in community service, social work, or collective upliftment activities', sub: 'as Saturn in Kumbha is most satisfied by impersonal service', highlight: 'community service, social work' },
              { main: 'Cultivate technological skills, scientific learning, or astrology', sub: 'as conscious channels for Kumbha-Saturn energy', highlight: 'technological skills, scientific learning' },
              { main: 'Avoid emotional detachment in close relationships', sub: 'during Saturn Sade Sati or challenging transits. Cultivate warmth alongside your visionary objectivity', highlight: 'Avoid emotional detachment' },
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
        style={{ background: '#f0fafa' }}
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
              ♒
            </div>
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-3 leading-tight">
              <span style={{ color: '#1e3a5f' }}>Frequently Asked </span>
              <span style={{ color: '#0e7490' }}>Questions</span>
            </h2>
            <p className="text-gray-600 text-base">
              Your top questions about Kumbha Rashi, answered with clarity
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
                    aria-controls={`kumbha-faq-${i}`}
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
                      id={`kumbha-faq-${i}`}
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
                            alt="Kumbha Rashi Water Bearer zodiac symbol Soul Infinity"
                            width={120}
                            height={120}
                            loading="lazy"
                            style={{
                              width: '120px',
                              height: '120px',
                              borderRadius: '50%',
                              border: '2px solid #0e7490',
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
      <section className="py-20 bg-gradient-to-r from-cyan-900 to-teal-900 text-white relative overflow-hidden">
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
            Want a Personalised Kumbha Reading?
          </h2>
          <p className="text-xl text-cyan-100 mb-8 leading-relaxed">
            Saurabh Jain at Soul Infinity Astro Solutions reads Kumbha placement in the context of
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
