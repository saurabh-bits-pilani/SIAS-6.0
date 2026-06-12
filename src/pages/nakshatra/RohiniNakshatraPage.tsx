import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ArrowRight,
  ChevronDown,
  AlertTriangle,
  Moon,
  Sun,
  Heart,
  BookOpen,
  Sparkles,
  Users,
  Target,
  Clock,
  Star,
  Droplet,
  Activity,
  Home,
  User,
  Coins,
  Shield,
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
  type LucideIcon,
} from 'lucide-react';
import SEOHead from '../../components/SEOHead';
import SchemaMarkup from '../../components/SchemaMarkup';
import Breadcrumbs from '../../components/Breadcrumbs';
import { getFaqPageSchemaFromList } from '../../data/schema-entities';

const HERO_IMAGE =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Nakshatra/Rohini/hero-banner-rohini.webp';
const SCROLL_IMAGE =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Nakshatra/Rohini/cow-bg-card.webp';
const QUICK_FACTS_IMAGE =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Nakshatra/Rohini/quick-facts-rohini.webp';
const REMEDIES_BG =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Nakshatra/Rohini/vedic-remedies-bg-rohini.webp';
const CARD_IMAGE =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Nakshatra/Rohini/cow-bg-card.webp';

interface TraitRow {
  icon: LucideIcon;
  label: string;
}

const STRENGTH_ROWS: readonly TraitRow[] = [
  { icon: Sparkles, label: 'Magnetic beauty' },
  { icon: Heart, label: 'Loyal and loving' },
  { icon: Star, label: 'Artistic gifts' },
  { icon: BookOpen, label: 'Fertile imagination' },
  { icon: Crown, label: 'Creative wealth' },
  { icon: Users, label: 'Nurturing nature' },
];

const CHALLENGE_ROWS: readonly TraitRow[] = [
  { icon: ChevronsRight, label: 'Possessive' },
  { icon: Clock, label: 'Pleasure-attached' },
  { icon: Timer, label: 'Mood swings' },
  { icon: UserX, label: 'Indulgent under affliction' },
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
  { num: '01', color: '#D4A11E', heading: 'LAGNA (SELF)',           icon: User,       desc: 'Charismatic, attractive personality, loved by all',                              arrow: 'Strong emotional nature from a young age' },
  { num: '02', color: '#d97706', heading: 'WEALTH & SPEECH',        icon: Coins,      desc: 'Sweet speech, family harmony',                                                   arrow: 'Good wealth through creativity' },
  { num: '03', color: '#db2777', heading: 'COURAGE & SIBLINGS',     icon: Users,      desc: 'Creative communicator, lovely voice',                                            arrow: 'Strong bond with siblings' },
  { num: '04', color: '#7c3aed', heading: 'HOME & MOTHER',          icon: Home,       desc: 'Love for home and mother, beautiful home',                                       arrow: 'Inner emotional comfort' },
  { num: '05', color: '#db2777', heading: 'CHILDREN & CREATIVITY',  icon: Star,       desc: 'Artistic mind, love for children',                                               arrow: 'Very good intelligence' },
  { num: '06', color: '#1d4ed8', heading: 'ENEMIES & SERVICE',      icon: Shield,     desc: 'Emotional stress, worry about health',                                           arrow: 'Strong intuition compensates' },
  { num: '07', color: '#0f766e', heading: 'MARRIAGE & PARTNERS',    icon: Heart,      desc: 'Exceptionally romantic spouse',                                                  arrow: 'Deep need for emotional partnership' },
  { num: '08', color: '#7c3aed', heading: 'TRANSFORMATION',         icon: Zap,        desc: 'Emotional ups and downs, transformation',                                        arrow: 'Strong occult sensitivity' },
  { num: '09', color: '#d97706', heading: 'DHARMA & FATHER',        icon: Compass,    desc: 'Spiritual beauty, blessed by gurus',                                             arrow: 'Devotion through aesthetics' },
  { num: '10', color: '#1d4ed8', heading: 'CAREER & STATUS',        icon: TrendingUp, desc: 'Success in creative fields, public recognition',                                 arrow: 'Career in arts and beauty' },
  { num: '11', color: '#15803d', heading: 'GAINS & FRIENDS',        icon: Users,      desc: 'Gains through networks, fulfillment of desires',                                 arrow: 'Luxurious and abundant life' },
  { num: '12', color: '#0f766e', heading: 'LIBERATION & FOREIGN',   icon: Globe,      desc: 'Spiritual longing, moksha through surrender',                                    arrow: 'Hidden pleasures and inner devotion' },
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
    q: 'What does it mean to have Moon in Rohini nakshatra?',
    icon: HelpCircle,
    color: '#D4A11E',
    showImage: true,
    a: (
      <>
        Moon in Rohini is one of the most{' '}
        <strong style={{ color: '#d97706' }}>auspicious placements</strong> in Vedic astrology.
        Rohini is the Moon&apos;s own nakshatra, where his energy flows most naturally. Natives
        tend to be magnetically attractive, emotionally deep, artistically gifted, and strongly
        oriented toward beauty, comfort, and meaningful relationships. The shadow side is
        possessiveness and difficulty letting go.
      </>
    ),
    aText:
      "Moon in Rohini is one of the most auspicious placements in Vedic astrology. Rohini is the Moon's own nakshatra, where his energy flows most naturally. Natives tend to be magnetically attractive, emotionally deep, artistically gifted, and strongly oriented toward beauty, comfort, and meaningful relationships. The shadow side is possessiveness and difficulty letting go.",
  },
  {
    q: 'Is Rohini nakshatra good or bad?',
    icon: Globe,
    color: '#d97706',
    a: (
      <>
        Rohini is considered highly auspicious in Vedic tradition.{' '}
        <strong style={{ color: '#d97706' }}>Lord Krishna and Lord Rama</strong> are both said to
        have been born under Rohini nakshatra. The nakshatra carries the energy of fertility,
        abundance, beauty, and creative power. Challenges arise when Moon is afflicted by Saturn,
        Rahu, or Ketu, which can amplify attachment or emotional instability.
      </>
    ),
    aText:
      'Rohini is considered highly auspicious in Vedic tradition. Lord Krishna and Lord Rama are both said to have been born under Rohini nakshatra. The nakshatra carries the energy of fertility, abundance, beauty, and creative power. Challenges arise when Moon is afflicted by Saturn, Rahu, or Ketu, which can amplify attachment or emotional instability.',
  },
  {
    q: 'Which celebrities have Moon in Rohini nakshatra?',
    icon: User,
    color: '#7c3aed',
    a: (
      <>
        According to classical Vedic texts,{' '}
        <strong>Lord Krishna</strong> was born under Rohini nakshatra, celebrated as Janmashtami.
        Lord Rama is also associated with Rohini. Among modern figures, several prominent artists,
        musicians, and political leaders are said to have strong Rohini placements, though
        individual chart verification is always needed.
      </>
    ),
    aText:
      'According to classical Vedic texts, Lord Krishna was born under Rohini nakshatra, celebrated as Janmashtami. Lord Rama is also associated with Rohini. Among modern figures, several prominent artists, musicians, and political leaders are said to have strong Rohini placements, though individual chart verification is always needed.',
  },
  {
    q: 'What is the gemstone for Rohini nakshatra?',
    icon: Gem,
    color: '#1d4ed8',
    a: (
      <>
        <strong>Pearl (Moti)</strong> is the primary gemstone for strengthening the Moon and
        supporting Rohini nakshatra natives. It should be worn only after a proper consultation
        with a trained Jyotish practitioner at Soul Infinity Astro Solutions.{' '}
        <strong>White sphatik (crystal quartz)</strong> is a safe alternative that anyone can wear
        without consultation.
      </>
    ),
    aText:
      'Pearl (Moti) is the primary gemstone for strengthening the Moon and supporting Rohini nakshatra natives. It should be worn only after a proper consultation with a trained Jyotish practitioner at Soul Infinity Astro Solutions. White sphatik (crystal quartz) is a safe alternative that anyone can wear without consultation.',
  },
  {
    q: 'How does Rohini Moon affect marriage and relationships?',
    icon: Calendar,
    color: '#0f766e',
    a: (
      <>
        Rohini Moon natives are deeply romantic and seek beauty and emotional depth in their
        partners. They are loyal and loving but can become possessive when insecure. A{' '}
        <strong>7th house Rohini Moon</strong> often brings a very attractive or artistically
        gifted spouse. The key challenge is learning to love without clinging, which is the
        spiritual lesson Rohini teaches through the myth of Chandra.
      </>
    ),
    aText:
      'Rohini Moon natives are deeply romantic and seek beauty and emotional depth in their partners. They are loyal and loving but can become possessive when insecure. A 7th house Rohini Moon often brings a very attractive or artistically gifted spouse. The key challenge is learning to love without clinging, which is the spiritual lesson Rohini teaches through the myth of Chandra.',
  },
];

/** Plain-text mirror used by FAQPage JSON-LD (must match visible text). */
const FAQS: ReadonlyArray<{ question: string; answer: string }> = FAQ_DATA.map((f) => ({
  question: f.q,
  answer: f.aText,
}));

export default function RohiniNakshatraPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <SEOHead
        title="Moon in Rohini Nakshatra: Complete Vedic Guide | Soul Infinity"
        description="Rohini nakshatra is the Moon's most beloved placement. Complete guide to Moon in Rohini, mythology, characteristics, the 12 houses, remedies, and FAQ by K.N. Rao Institute trained astrologer Saurabh Jain."
        keywords="rohini nakshatra, moon in rohini, vedic astrology, chandra rohini, taurus nakshatra, rohini remedies, pearl gemstone, soul infinity, saurabh jain"
        image={HERO_IMAGE}
        type="article"
        url="https://www.soulinfinity.space/nakshatra/rohini"
        omitDefaultSchema
      />
      <SchemaMarkup
        type="webpage"
        webPage={{
          name: 'Moon in Rohini Nakshatra in Vedic Astrology',
          description:
            "Rohini, the fourth of the 27 nakshatras, the Moon's most beloved placement. Mythology, characteristics, the 12 houses, mantras, and classical remedies.",
          url: '/nakshatra/rohini',
        }}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Nakshatras', url: '/nakshatra' },
          { name: 'Rohini Nakshatra', url: '/nakshatra/rohini' },
        ]}
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(getFaqPageSchemaFromList(FAQS))}
        </script>
      </Helmet>

      {/* Section 1, Hero banner. */}
      <div className="w-full bg-white">
        <img
          src={HERO_IMAGE}
          alt="Rohini Nakshatra hero banner showing Moon in Vrishabha Vedic astrology symbolism for Soul Infinity"
          className="w-full h-auto block"
          width={1600}
          height={420}
          loading="eager"
          fetchpriority="high"
        />
      </div>

      <div className="bg-white">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Nakshatras', href: '/nakshatra' },
            { label: 'Rohini Nakshatra' },
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
              <span className="font-devanagari" lang="sa">रोहिणी नक्षत्र</span>
              <span className="mx-2 text-amber-600/60">·</span>
              Rohini
            </p>
            <h1 className="font-heading font-bold text-3xl md:text-5xl text-gray-900 mb-2 leading-tight">
              Rohini Nakshatra, The Seat of Longing
            </h1>
            <p className="text-base md:text-lg text-gray-700">
              <span className="font-devanagari" lang="sa">रोहिणी</span>
              <span className="mx-2 text-gray-400">·</span>
              Rohini
              <span className="mx-2 text-gray-400">·</span>
              Ruled by Chandra (Moon)
            </p>
          </div>
        </section>

        {/* Section 3, About Rohini. Two-column infographic layout. */}
        <section className="py-12 px-6" style={{ background: '#fdf6f0' }}>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

              {/* LEFT COLUMN, 45% on lg+ */}
              <div className="lg:col-span-5 space-y-4">
                {/* Section header */}
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-amber-100 text-amber-600">
                    <Moon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="font-heading font-bold text-2xl text-gray-900 leading-tight">
                      Rohini Nakshatra
                    </div>
                    <div className="text-sm text-gray-500 italic">in Vedic Astrology</div>
                  </div>
                </div>

                {/* Card 1, intro */}
                <div className="bg-white p-4 rounded-xl flex gap-3" style={{ border: '1px solid #f0e0d0' }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-amber-100 text-amber-600">
                    <Moon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed m-0">
                    Rohini is the nakshatra that{' '}
                    <strong style={{ color: '#d97706' }}>Chandra (Moon) cherishes</strong> above
                    all others. Spanning 10 to 23 degrees 20 minutes of Taurus, it is where the
                    Moon shines most fully. Classical texts describe Rohini as the most fertile,
                    beautiful, and magnetically attractive of the 27 nakshatras.
                  </p>
                </div>

                {/* Card 2, The Moon's Most Beloved */}
                <div className="bg-white p-4 rounded-xl flex gap-3" style={{ border: '1px solid #f0e0d0' }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#FEF3C7', color: '#D4A11E' }}>
                    <Heart className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base mb-1" style={{ color: '#B45309' }}>
                      The Moon&apos;s Most Beloved
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed m-0">
                      Rohini is where the Moon most wants to be, and where his energy flows{' '}
                      <strong>most naturally and completely</strong>. It is the seat of creative
                      abundance and the natural home of desire.
                    </p>
                  </div>
                </div>

                {/* Card 3, Mythology of Rohini */}
                <div className="bg-white p-4 rounded-xl flex gap-3" style={{ border: '1px solid #f0e0d0' }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-slate-900 text-white">
                    <BookOpen className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base text-gray-900 mb-1">
                      The Mythology of Rohini
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed m-0">
                      Chandra married the 27 daughters of Prajapati Daksha but became deeply
                      infatuated with Rohini, spending all his time with her. This angered the
                      other wives and led to a curse that causes the Moon to{' '}
                      <strong style={{ color: '#d97706' }}>wax and wane</strong>.
                    </p>
                  </div>
                </div>

                {/* Card 4, What This Placement Means */}
                <div className="bg-white p-4 rounded-xl flex gap-3" style={{ border: '1px solid #f0e0d0' }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-amber-100 text-amber-600">
                    <Sparkles className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base mb-1" style={{ color: '#B45309' }}>
                      What This Placement Means
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed m-0">
                      Moon in Rohini gives strong aesthetic sensibility, deep emotional longing,
                      and a naturally <strong>magnetic presence</strong>. These natives are often
                      remembered long after a first meeting.
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
                      Rohini is not just a beautiful nakshatra. It is the nakshatra of longing
                      itself. The soul remembers something it once had and is always reaching for
                      it again. {'—'} Saurabh Jain, K.N. Rao Institute
                    </p>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN, 55% on lg+ */}
              <div className="lg:col-span-7 space-y-4">
                {/* Top, Quick Facts image */}
                <img
                  src={QUICK_FACTS_IMAGE}
                  alt="Rohini Nakshatra quick facts, Lord Moon, Deity Brahma, Symbol Ox Cart, Sign Taurus"
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

                {/* Chandra rulership card with body-system accent icons on the right */}
                <div className="bg-white p-4 rounded-xl" style={{ border: '1px solid #f0e0d0' }}>
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#FEF3C7', color: '#D4A11E' }}>
                      <Moon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading font-bold text-base mb-1" style={{ color: '#B45309' }}>
                        Ruled by Chandra (Moon)
                      </h3>
                      <p className="text-sm text-gray-700 leading-relaxed m-0">
                        The ruling planet Chandra governs the <strong>mind</strong>,{' '}
                        <strong>emotions</strong>, <strong>mother</strong>,{' '}
                        <strong>memory</strong>, <strong>water</strong>, and{' '}
                        <strong>nurturing</strong> in Vedic astrology.
                      </p>
                    </div>
                    <div className="hidden md:flex flex-col gap-1.5 pt-1" style={{ color: 'rgba(212,161,30,0.7)' }}>
                      <Heart className="w-4 h-4" aria-hidden="true" />
                      <Droplet className="w-4 h-4" aria-hidden="true" />
                      <Activity className="w-4 h-4" aria-hidden="true" />
                      <Users className="w-4 h-4" aria-hidden="true" />
                      <Home className="w-4 h-4" aria-hidden="true" />
                    </div>
                  </div>
                </div>

                {/* Beauty and Abundance card with side-note box */}
                <div className="bg-white p-4 rounded-xl" style={{ border: '1px solid #f0e0d0' }}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                    <div className="md:col-span-2 flex gap-3">
                      <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-teal-100 text-teal-600">
                        <Target className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-base text-gray-900 mb-1">
                          Beauty and Abundance
                        </h3>
                        <p className="text-sm text-gray-700 leading-relaxed m-0">
                          A well-placed Moon in Rohini amplifies{' '}
                          <strong style={{ color: '#d97706' }}>creative gifts</strong>, fertility,
                          and material comfort.
                        </p>
                      </div>
                    </div>
                    <div className="rounded-lg p-3" style={{ background: '#fff5e6', border: '1px solid #f5d8a8' }}>
                      <p className="text-xs text-amber-900 leading-relaxed m-0 italic">
                        Affliction by Saturn or Rahu can bring possessiveness, indulgence, or
                        emotional turbulence in close relationships.
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
                      Understanding Chandra placement, its dignity, aspects, and Mahadasha timing
                      is central to reading a Rohini chart accurately.
                    </p>
                  </div>
                </div>

                {/* The Four Padas of Rohini card with two-col text + 3 mini cards */}
                <div className="bg-white p-5 rounded-xl" style={{ border: '1px solid #f0e0d0' }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-amber-100 text-amber-600">
                      <Star className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <h3 className="font-heading font-bold text-lg text-gray-900 m-0">
                      The Four Padas of Rohini
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 leading-relaxed">
                    <p className="m-0">
                      Rohini begins at{' '}
                      <strong style={{ color: '#d97706' }}>ten degrees of Taurus</strong> and is
                      divided into four padas, each ruled by a different navamsa lord.
                    </p>
                    <p className="m-0">
                      The first three padas express{' '}
                      <strong>Mars</strong>, <strong>Venus</strong>, and{' '}
                      <strong>Mercury</strong> sub-themes, each carrying distinct flavours of
                      Rohini energy.
                    </p>
                  </div>

                  {/* Three pada mini cards */}
                  <div className="grid grid-cols-3 gap-3 mt-4">
                    <div className="text-center p-3 rounded-lg" style={{ background: '#fff5e6', border: '1px solid #f5d8a8' }}>
                      <div className="w-9 h-9 mx-auto rounded-full flex items-center justify-center mb-2 bg-amber-200 text-amber-700">
                        <Sparkles className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <div className="font-heading font-bold text-sm" style={{ color: '#B45309' }}>Pada 1</div>
                      <div className="text-xs text-gray-600 mt-1">Mars navamsa, drive and passion</div>
                    </div>
                    <div className="text-center p-3 rounded-lg" style={{ background: '#fef3c7', border: '1px solid #fde68a' }}>
                      <div className="w-9 h-9 mx-auto rounded-full flex items-center justify-center mb-2 bg-amber-200 text-amber-700">
                        <Heart className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <div className="font-heading font-bold text-sm text-amber-700">Pada 2</div>
                      <div className="text-xs text-gray-600 mt-1">Venus navamsa, beauty and art</div>
                    </div>
                    <div className="text-center p-3 rounded-lg" style={{ background: '#e6fffa', border: '1px solid #c4f1f9' }}>
                      <div className="w-9 h-9 mx-auto rounded-full flex items-center justify-center mb-2 bg-teal-200 text-teal-700">
                        <Star className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <div className="font-heading font-bold text-sm text-teal-700">Pada 3</div>
                      <div className="text-xs text-gray-600 mt-1">Mercury navamsa, mind and speech</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      {/* Section 4, Story of Rohini. Text overlaid inside parchment scroll. */}
      <section className="py-12 bg-[#FAF6EC]">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-kalam text-3xl text-[#2A2438] mb-6 text-center">
            The Story of Rohini
          </h2>
          <div className="relative">
            <img
              src={SCROLL_IMAGE}
              alt="Ancient Vedic parchment scroll"
              width={1200}
              height={800}
              className="w-full rounded-2xl shadow-lg"
              loading="lazy"
            />
            <div
              className="absolute inset-0 flex items-start"
              style={{ padding: '15% 48% 28% 20%' }}
            >
              <div>
                <p className="font-kalam text-sm text-[#3d2810] leading-relaxed mb-2">
                  Chandra married the 27 daughters of Prajapati Daksha.
                  But he was deeply enamored by Rohini, spending most
                  of his time with her, neglecting the others.
                </p>
                <p className="font-poppins text-xs text-[#5C3A1A] leading-relaxed mb-2">
                  The other wives complained to their father. Daksha
                  cursed Chandra to wane and lose his brilliance.
                  The Devas pleaded and the curse was softened.
                </p>
                <p className="font-caveat text-xs text-[#8B4513] italic">
                  This is why Rohini is the seat of longing and depth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5, Strengths and Challenges. Cream bg with faint Om
          watermark, gradient-header cards. */}
      <section
        className="relative overflow-hidden"
        style={{ background: '#fdf6f0', padding: '64px 24px' }}
      >
        {/* Faint Om watermark, top-left */}
        <div
          aria-hidden="true"
          className="font-devanagari"
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            fontSize: '120px',
            opacity: 0.06,
            color: '#D4A11E',
            userSelect: 'none',
            lineHeight: 1,
          }}
          lang="sa"
        >
          ॐ
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
                color: '#B45309',
                fontStyle: 'italic',
                lineHeight: 1.1,
                marginTop: '4px',
              }}
            >
              Rohini Natives
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
              The gifts of Rohini are real and lasting. So is the hunger. The work is learning
              which desires to feed.
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
                  Strengths of Rohini Moon
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
                        {'—'}
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
                  background: 'linear-gradient(135deg, #78350f, #D4A11E)',
                  padding: '20px 24px',
                }}
              >
                <div
                  className="bg-white rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ width: '52px', height: '52px' }}
                >
                  <AlertTriangle style={{ color: '#B45309', width: '28px', height: '28px' }} aria-hidden="true" />
                </div>
                <h3 style={{ color: 'white', fontSize: '24px', fontWeight: 700, margin: 0 }}>
                  Shadows and Challenges
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
                        style={{ width: '40px', height: '40px', background: '#fffbeb' }}
                      >
                        <Icon style={{ color: '#B45309', width: '20px', height: '20px' }} aria-hidden="true" />
                      </div>
                      <div
                        className="flex-1 font-bold text-gray-800"
                        style={{ fontSize: '15px' }}
                      >
                        {row.label}
                      </div>
                      <span style={{ color: '#fde68a', fontWeight: 400 }} aria-hidden="true">|</span>
                      <span
                        style={{ color: '#B45309', fontWeight: 700 }}
                        aria-hidden="true"
                      >
                        {'—'}
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
              ✦ {'——'}
            </span>
            <Moon size={18} color="#D4A11E" aria-hidden="true" />
            <p style={{ fontSize: '14px', color: '#374151', margin: 0 }}>
              When guided with awareness, the longing of Rohini becomes a{' '}
              <strong style={{ color: '#d97706' }}>path of devotion.</strong>
            </p>
            <span style={{ color: '#d97706', fontSize: '12px' }} aria-hidden="true">
              {'——'} ✦
            </span>
          </div>
        </div>
      </section>

      {/* Section 6, Rohini in the 12 Houses. Infographic card grid. */}
      <section className="py-16 px-6" style={{ background: '#fdf6f0' }}>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div
              className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4"
              style={{ background: '#fef3c7', color: '#D4A11E' }}
            >
              <Target className="w-6 h-6" aria-hidden="true" />
            </div>
            <h2 className="font-heading font-bold text-3xl md:text-5xl mb-3 leading-tight">
              <span style={{ color: '#B45309' }}>Rohini</span>
              <span style={{ color: '#1e3a5f' }}> in the 12 Houses</span>
            </h2>
            <div
              className="text-xs uppercase tracking-[0.25em] font-semibold mb-2"
              style={{ color: '#d97706' }}
            >
              How Chandra Expresses Himself Across Bhavas
            </div>
            <p className="text-sm text-gray-500 max-w-xl mx-auto">
              when the Moon in Rohini occupies each of the twelve bhavas of a Vedic birth chart
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
              <Moon className="w-4 h-4" style={{ color: '#d97706' }} aria-hidden="true" />
              <div
                className="h-px w-10"
                style={{ background: '#d97706', opacity: 0.4 }}
              />
            </div>
            <p className="text-sm text-gray-700 italic">
              The Moon in Rohini seeks{' '}
              <strong style={{ color: '#d97706' }}>beauty, love, and emotional nourishment</strong>{' '}
              in every area of life.
            </p>
          </div>
        </div>
      </section>

      {/* Section 7, Remedies. Bg image with dark overlay; remedies pushed right. */}
      <section className="relative min-h-[600px] py-16">
        <img
          src={REMEDIES_BG}
          alt=""
          width={1400}
          height={900}
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <h2 className="font-kalam text-3xl text-[#D4A11E] text-center mb-2">
            Classical Vedic Remedies for Rohini Moon
          </h2>
          <p className="font-poppins text-white/60 text-xs text-center mb-10 uppercase tracking-widest">
            FOR AN AFFLICTED OR WEAKENED CHANDRA
          </p>
          <div className="max-w-2xl ml-auto space-y-5">
          {[
            { main: 'Worship Lord Chandra on Mondays', sub: 'Offer white flowers, milk, and white rice to the Moon on Purnima and every Monday', highlight: 'Worship Lord Chandra' },
            { main: 'Wear Pearl (Moti) after astrological consultation', sub: 'Set in silver, worn on the little finger on Monday morning after puja', highlight: 'Pearl (Moti)' },
            { main: 'Chant Chandra Beej Mantra (Om Shraam Shreem Shraum Sah Chandramasay Namah)', sub: 'On a pearl or white sphatik mala, facing northwest, at dawn or dusk', highlight: 'Chandra Beej Mantra' },
            { main: 'Offer water to the Moon on Purnima', sub: 'Pour water mixed with raw milk toward the Moon while chanting the mantra', highlight: 'Offer water' },
            { main: 'Feed white cows or donate white items', sub: 'White cow, white rice, white cloth, silver, all strengthen Chandra', highlight: 'white cows' },
            { main: 'Practice non-attachment in close relationships', sub: 'Recognize that the longing is a spiritual quality, not a wound to be filled by another person', highlight: 'non-attachment' },
            { main: 'Read Shri Sukta on Fridays', sub: 'Dedicated to Lakshmi, the divine feminine that Rohini most naturally embodies', highlight: 'Shri Sukta' },
          ].map((item, i) => (
            <div key={i}>
              <p className="font-poppins font-semibold text-white text-base mb-1 leading-snug">
                {item.main.split(item.highlight).map((part, j, arr) => (
                  <span key={j}>
                    {part}
                    {j < arr.length - 1 && (
                      <span className="font-bold" style={{ color: '#f59e0b' }}>{item.highlight}</span>
                    )}
                  </span>
                ))}
              </p>
              <p className="font-poppins text-sm text-white/70 leading-relaxed m-0">
                <span aria-hidden="true" className="mr-1">›</span>
                {item.sub}
              </p>
            </div>
          ))}
          </div>
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
              className="mx-auto rounded-full flex items-center justify-center mb-4 font-devanagari"
              style={{
                width: '60px',
                height: '60px',
                border: '2px solid #d97706',
                color: '#d97706',
                fontSize: '28px',
                lineHeight: 1,
              }}
              aria-hidden="true"
              lang="sa"
            >
              ॐ
            </div>
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-3 leading-tight">
              <span style={{ color: '#1e3a5f' }}>Frequently Asked </span>
              <span style={{ color: '#B45309' }}>Questions</span>
            </h2>
            <p className="text-gray-600 text-base">
              Your top questions about Rohini Nakshatra, answered with clarity
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
                    aria-controls={`rohini-faq-${i}`}
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
                      id={`rohini-faq-${i}`}
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
                            src={CARD_IMAGE}
                            alt="Rohini Nakshatra Ox Cart symbol Soul Infinity"
                            width={120}
                            height={120}
                            loading="lazy"
                            style={{
                              width: '120px',
                              height: '120px',
                              borderRadius: '50%',
                              border: '2px solid #D4A11E',
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

      {/* Section 9, CTA. Dark warm brown gradient. */}
      <section className="py-20 text-white relative overflow-hidden" style={{ background: 'linear-gradient(to right, #2A1810, #3d2515)' }}>
        <div className="absolute inset-0 opacity-15">
          <img
            src={HERO_IMAGE}
            alt=""
            aria-hidden="true"
            width={1600}
            height={600}
            className="w-full h-auto block"
          />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6">
            Want a Personalised Rohini Reading?
          </h2>
          <p className="text-xl mb-8 leading-relaxed" style={{ color: '#FEF3C7' }}>
            Saurabh Jain at Soul Infinity Astro Solutions reads your Moon placement, nakshatra
            pada, dasha timing, and planetary aspects to show exactly how Rohini expresses in
            your specific chart.
          </p>
          <Link
            to="/contact#contact-form-section"
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
