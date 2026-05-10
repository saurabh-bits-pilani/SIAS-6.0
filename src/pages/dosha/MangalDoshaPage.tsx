import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  ChevronDown,
  CircleDot,
  Clock,
  Coins,
  Compass,
  Flame,
  Heart,
  Home,
  Shield,
  ShieldCheck,
  Star,
  Target,
  TrendingUp,
  User,
  Users,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import SEOHead from '../../components/SEOHead';
import SchemaMarkup from '../../components/SchemaMarkup';
import Breadcrumbs from '../../components/Breadcrumbs';
import { getFaqPageSchemaFromList } from '../../data/schema-entities';

const R2_BASE =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Pillar/Dosha/Mangal';
const HERO_URL = `${R2_BASE}/mangal-dosha-hero-banner.webp`;
const QUICK_FACTS_URL = `${R2_BASE}/quick-fact-mangal-dosha.webp`;

interface IntroCard {
  title: string;
  body: string;
  icon: LucideIcon;
  dark?: boolean;
}

const INTRO_CARDS: readonly IntroCard[] = [
  {
    title: "The Warrior's Imprint",
    body:
      'In classical Vedic texts including Brihat Parashara Hora Shastra, Mangal Dosha arises when Mars occupies the 1st, 2nd, 4th, 7th, 8th, or 12th house of the birth chart. Mars carries the energy of assertion, passion, and directness. Placed in these houses, it brings intense focus to the life areas those houses govern.',
    icon: Flame,
  },
  {
    title: 'Marriage and Relationships',
    body:
      'The 7th and 8th house placements of Mars are considered the most significant for marriage compatibility. Classical texts associate strong Mangal Dosha with a partner who matches that same intensity, which is why Kundali Milan traditionally checks for Mangal Dosha in both charts before recommending a match.',
    icon: Heart,
  },
  {
    title: 'Not a Curse, a Signal',
    body:
      "At Soul Infinity, Saurabh Jain approaches Mangal Dosha as karmic information, not a verdict. The strength of Mars in the chart, its dignity, aspects received, and the current dasha determine whether the dosha is active and to what degree it shapes the native's life.",
    icon: Shield,
    dark: true,
  },
  {
    title: 'Soul Infinity Practitioner Insight',
    body:
      'Saurabh Jain, trained at the K.N. Rao Institute of Astrology, New Delhi, observes that many natives with Mangal Dosha have strong leadership, drive, and the capacity for intense commitment. The chart must always be read whole before any conclusion about marriage compatibility is drawn.',
    icon: Star,
  },
];

interface HouseData {
  num: string;
  heading: string;
  icon: LucideIcon;
  desc: string;
  color: string;
}

const HOUSE_DATA: readonly HouseData[] = [
  {
    num: '01',
    heading: 'LAGNA (SELF)',
    icon: User,
    color: '#b91c1c',
    desc:
      'Mars in the 1st brings aggressive temperament, strong physical presence, and a tendency toward confrontation. The native is bold and direct. Self-assertion is high.',
  },
  {
    num: '02',
    heading: 'WEALTH AND SPEECH',
    icon: Coins,
    color: '#d97706',
    desc:
      'Mars in the 2nd affects family harmony and speech patterns. The native may be sharp-tongued or prone to financial impulsiveness. Family relationships require conscious management.',
  },
  {
    num: '03',
    heading: 'COURAGE AND SIBLINGS',
    icon: Users,
    color: '#dc2626',
    desc:
      'Mars in the 3rd is generally considered a strong and positive placement, not typically counted as Mangal Dosha in all classical systems. Courage, initiative, and sibling energy are amplified.',
  },
  {
    num: '04',
    heading: 'HOME AND MOTHER',
    icon: Home,
    color: '#7c2d12',
    desc:
      'Mars in the 4th brings property disputes, tension in the home environment, and a mother with strong or demanding energy. The native may move homes frequently.',
  },
  {
    num: '05',
    heading: 'CHILDREN AND CREATIVITY',
    icon: Star,
    color: '#be123c',
    desc:
      'Mars in the 5th is not universally included in Mangal Dosha. When counted, it can bring intensity to romantic relationships and strong-willed children.',
  },
  {
    num: '06',
    heading: 'ENEMIES AND SERVICE',
    icon: ShieldCheck,
    color: '#1d4ed8',
    desc:
      'Mars in the 6th is exalted in Capricorn and generally a strong placement for overcoming enemies and competition. Not typically considered a Mangal Dosha placement.',
  },
  {
    num: '07',
    heading: 'MARRIAGE AND PARTNERS',
    icon: Heart,
    color: '#b91c1c',
    desc:
      "Mars in the 7th is the most commonly cited Mangal Dosha placement. Intense expectations in marriage, power dynamics with partners, and the need for a partner who matches the native's energy.",
  },
  {
    num: '08',
    heading: 'TRANSFORMATION',
    icon: Zap,
    color: '#7c2d12',
    desc:
      'Mars in the 8th is the second most significant Mangal Dosha placement. Longevity of the marriage, shared finances, and hidden karmic debts are the primary areas of influence.',
  },
  {
    num: '09',
    heading: 'DHARMA AND FATHER',
    icon: Compass,
    color: '#d97706',
    desc:
      'Mars in the 9th is generally not included in Mangal Dosha. It brings a strong, assertive father figure and directness in spiritual pursuit.',
  },
  {
    num: '10',
    heading: 'CAREER AND STATUS',
    icon: TrendingUp,
    color: '#1d4ed8',
    desc:
      'Mars in the 10th has digbala, directional strength, in many systems. Career ambition and professional drive are amplified. Not a standard Mangal Dosha house.',
  },
  {
    num: '11',
    heading: 'GAINS AND FRIENDS',
    icon: Users,
    color: '#9f1239',
    desc:
      'Mars in the 11th brings competitive friendships and gains through assertion and enterprise. Not a standard Mangal Dosha house.',
  },
  {
    num: '12',
    heading: 'LIBERATION AND FOREIGN',
    icon: CircleDot,
    color: '#7f1d1d',
    desc:
      'Mars in the 12th brings expenses, foreign connections, and intensity in the private or spiritual life. Bed pleasures and hidden conflicts are traditional associations.',
  },
];

const STRENGTHS = [
  'Intense drive and determination',
  'Natural leadership and courage',
  'Fierce loyalty and protectiveness',
  'Physical strength and stamina',
  'Capacity for deep passionate commitment',
  'Ability to overcome adversity',
] as const;

const CHALLENGES = [
  'Impulsiveness in relationships',
  'Difficulty with compromise',
  'Tendency toward conflict',
  'Impatience with slow progress',
  'Intensity that can overwhelm partners',
] as const;

const REMEDIES = [
  {
    main: 'Chant the Mangala Beej mantra, Om Aṃ Aṃgārakāya Namaḥ',
    detail: '108 times on Tuesday mornings facing south',
  },
  {
    main: 'Offer red flowers, red lentils, masoor dal, and jaggery at a Hanuman or Mangala temple on Tuesdays',
    detail: 'A traditional offering to pacify Mars energy',
  },
  {
    main: 'Kumbh Vivah',
    detail:
      'A ritual marriage to a banana tree, peepal tree, or silver idol of Vishnu before the actual marriage. Recommended only after a qualified chart reading confirms its necessity.',
  },
  {
    main: 'Marry a partner who also carries Mangal Dosha',
    detail:
      'Classical texts state that Mangal Dosha cancels when both partners carry it equally. Kundali Milan checks this as part of the standard compatibility analysis.',
  },
  {
    main: 'Recite the Hanuman Chalisa on Tuesdays',
    detail:
      'Hanuman is the presiding deity of Mars in the Vedic tradition. Regular recitation is considered one of the most effective pacifications.',
  },
  {
    main: 'Wear red coral, Moonga, set in copper or gold on the ring finger of the right hand',
    detail:
      'Only after a qualified astrologer confirms Mars is the gemstone planet for your ascendant. Never wear coral without chart-based recommendation.',
  },
  {
    main: 'Fast on Tuesdays',
    detail:
      'A traditional Vedic fast dedicated to Mars, observed with the intention of channeling Mars energy constructively rather than suppressing it.',
  },
] as const;

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: readonly FaqItem[] = [
  {
    question: 'What is Mangal Dosha in Vedic astrology?',
    answer:
      'Mangal Dosha, also called Kuja Dosha or Manglik Dosha, is the astrological condition that arises when Mars occupies the 1st, 2nd, 4th, 7th, 8th, or 12th house of the Vedic birth chart. Classical texts associate this placement with heightened Mars energy in the life areas governed by those houses, most notably marriage, family, and property. It is one of the most discussed doshas in Indian astrology, particularly in the context of marriage compatibility.',
  },
  {
    question: 'Which house placements create Mangal Dosha?',
    answer:
      'The houses that create Mangal Dosha are the 1st, 2nd, 4th, 7th, 8th, and 12th. Not all classical texts agree on all six. The 7th and 8th house placements are the most universally cited and considered the strongest in effect for marriage-related outcomes. Some systems include the 5th house as well.',
  },
  {
    question: 'Can Mangal Dosha be cancelled?',
    answer:
      'Yes. Classical Vedic texts describe several conditions that cancel or significantly reduce Mangal Dosha. The most common cancellations include: Mars in its own sign, Aries or Scorpio, Mars in exaltation, Capricorn, Mars aspected by Jupiter, the partner also carrying Mangal Dosha of equal strength, and Mars in certain houses from the Moon or Venus ascendant charts. A full chart reading is required to confirm cancellation.',
  },
  {
    question: 'Is it necessary to marry someone with Mangal Dosha if I have it?',
    answer:
      'Not necessarily. Cancellation rules must be checked first. Many apparent Mangal Dosha charts carry conditions that cancel or significantly reduce the dosha. A qualified Jyotish practitioner reads the full chart before recommending any matching condition. The decision should never be based on a single factor.',
  },
  {
    question: 'What are the practical effects of Mangal Dosha in marriage?',
    answer:
      'In practical terms, strong uncancelled Mangal Dosha in the 7th or 8th house can indicate a tendency toward power imbalances in marriage, a spouse with strong or dominant energy, or delays and challenges in finding a compatible partner. These are tendencies, not certainties. The rest of the chart, particularly Jupiter and Venus placement, dasha timing, and navamsa, modify the outcome significantly.',
  },
];

function FaqIcon({ index }: { index: number }) {
  const shared = {
    className: 'h-6 w-6 text-purple-700',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    viewBox: '0 0 24 24',
  };

  if (index === 0) {
    return (
      <svg {...shared} aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" />
        <path d="M8 12h8M12 8v8" />
      </svg>
    );
  }

  if (index === 1) {
    return (
      <svg {...shared} aria-hidden="true">
        <path d="M4 4h16v16H4z" />
        <path d="M4 10h16M4 16h16M10 4v16M16 4v16" />
      </svg>
    );
  }

  if (index === 2) {
    return (
      <svg {...shared} aria-hidden="true">
        <path d="M20 6v5h-5" />
        <path d="M4 18v-5h5" />
        <path d="M18.4 9A7 7 0 0 0 6.1 6.6L4 9" />
        <path d="M5.6 15A7 7 0 0 0 17.9 17.4L20 15" />
      </svg>
    );
  }

  if (index === 3) {
    return (
      <svg {...shared} aria-hidden="true">
        <circle cx="8" cy="8" r="3" />
        <circle cx="16" cy="8" r="3" />
        <path d="M3 21c1-4 2.8-6 5-6s4 2 5 6" />
        <path d="M11 21c1-4 2.8-6 5-6s4 2 5 6" />
      </svg>
    );
  }

  return (
    <svg {...shared} aria-hidden="true">
      <path d="M12 20s-7-4.4-9-8.7C1.8 8.8 3.3 6 6 6c1.7 0 3 1 3.8 2.2C10.7 7 12 6 13.7 6c2.7 0 4.2 2.8 3 5.3C14.7 15.6 12 20 12 20Z" />
      <path d="M18 10.5c1.7.2 3 1.5 3 3.2 0 2.7-3.8 5-5.5 6" />
    </svg>
  );
}

function FaqItemCard({
  faq,
  index,
  open,
  onToggle,
}: {
  faq: FaqItem;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-purple-100 bg-indigo-50 shadow-sm">
      <button
        type="button"
        aria-expanded={open}
        onClick={onToggle}
        className="flex w-full items-center gap-4 px-5 py-5 text-left sm:px-6"
      >
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-purple-100 ring-1 ring-purple-200">
          <FaqIcon index={index} />
        </span>
        <span className="h-12 w-px shrink-0 bg-purple-200" aria-hidden="true" />
        <span className="flex-1 font-poppins text-base font-medium leading-snug text-gray-900 md:text-lg">
          {faq.question}
        </span>
        <span
          className={`ml-2 text-3xl leading-none text-purple-700 transition-transform duration-300 ${open ? 'rotate-90' : ''}`}
          aria-hidden="true"
        >
          ›
        </span>
      </button>
      {open ? (
        <div className="border-t border-purple-100 px-5 pb-6 pt-1 sm:px-6">
          <p className="ml-16 border-l border-purple-200 pl-5 text-sm leading-relaxed text-gray-700 md:text-base">
            {faq.answer}
          </p>
        </div>
      ) : null}
    </div>
  );
}

const faqSchema = getFaqPageSchemaFromList(
  FAQS.map((faq) => ({ question: faq.question, answer: faq.answer })),
);

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Mangal Dosha in Vedic Astrology, Meaning, Effects, and Remedies',
  description:
    'Understand Mangal Dosha in Vedic astrology, house placements, marriage effects, cancellation rules, and classical remedies.',
  image: HERO_URL,
  author: {
    '@type': 'Person',
    name: 'Saurabh Jain',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Soul Infinity',
  },
  mainEntityOfPage: 'https://www.soulinfinity.space/dosha/mangal',
};

export default function MangalDoshaPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <SEOHead
        title="Mangal Dosha in Vedic Astrology, Meaning, Effects, and Remedies | Soul Infinity"
        description="Understand Mangal Dosha (Kuja Dosha) in Vedic astrology. Learn which house placements create it, how it affects marriage and relationships, cancellation rules, and classical remedies. Guidance by Saurabh Jain, K.N. Rao Institute."
        keywords="mangal dosha, kuja dosha, manglik dosha, mangal dosha in marriage, mangal dosha effects, mangal dosha remedies, mangal dosha cancellation, mars dosha vedic astrology"
        image={HERO_URL}
        url="https://www.soulinfinity.space/dosha/mangal"
        type="article"
        omitDefaultSchema
      />
      <SchemaMarkup
        type="webpage"
        webPage={{
          name: 'Mangal Dosha in Vedic Astrology',
          description:
            'Mangal Dosha in Vedic astrology, including house placements, marriage effects, cancellation rules, and classical remedies.',
          url: '/dosha/mangal',
        }}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Doshas', url: '/dosha' },
          { name: 'Mangal Dosha in Vedic Astrology', url: '/dosha/mangal' },
        ]}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      <img
        src={HERO_URL}
        alt="Mangal Dosha hero banner showing Mars energy and relationship karmic patterns in Vedic astrology"
        className="block h-auto w-full"
        fetchpriority="high"
      />

      <div className="bg-white">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Doshas', href: '/dosha' },
            { label: 'Mangal Dosha' },
          ]}
        />
      </div>

      <section className="bg-white px-4 pb-8 pt-2 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-red-800 md:text-base">
            <span className="font-devanagari" lang="sa">मंगल दोष</span>
            <span className="mx-2 text-red-800/60">·</span>
            Mangal Dosha
          </p>
          <h1 className="mb-2 font-caveat text-5xl font-bold leading-tight text-gray-900 md:text-7xl">
            Mangal Dosha, The Mars Karmic Imprint
          </h1>
          <p className="text-base text-gray-700 md:text-lg">
            Ruled by Mangala (Mars)
            <span className="mx-2 text-gray-400">·</span>
            Fire Energy
            <span className="mx-2 text-gray-400">·</span>
            The Warrior&apos;s Shadow
          </p>
        </div>
      </section>

      <section className="bg-red-50 px-6 py-12">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-5">
            {INTRO_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className={`flex gap-3 rounded-xl p-4 ${card.dark ? 'bg-red-950 text-white' : 'bg-white text-gray-900'}`}
                  style={{ border: card.dark ? '1px solid #7f1d1d' : '1px solid #fecaca' }}
                >
                  <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${card.dark ? 'bg-white text-red-800' : 'bg-red-100 text-red-800'}`}>
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className={`mb-1 font-heading text-base font-bold ${card.dark ? 'text-white' : 'text-red-800'}`}>
                      {card.title}
                    </h3>
                    <p className={`m-0 text-sm leading-relaxed ${card.dark ? 'text-red-50' : 'text-gray-700'}`}>
                      {card.body}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="space-y-4 lg:col-span-7">
            <img
              src={QUICK_FACTS_URL}
              alt="Mangal Dosha quick facts chart showing house placements, ruling planet Mars, and key effects"
              className="block h-auto w-full rounded-xl shadow-lg"
              loading="lazy"
            />

            <div className="rounded-xl bg-white p-4" style={{ border: '1px solid #fecaca' }}>
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-800">
                  <Flame className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="mb-1 font-heading text-base font-bold text-red-800">
                    Ruled by Mangala (Mars)
                  </h2>
                  <p className="m-0 text-sm leading-relaxed text-gray-700">
                    The ruling planet Mangala governs courage, assertion, passion, physical energy, siblings, property, and the capacity for direct action in Vedic astrology.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-white p-4" style={{ border: '1px solid #fecaca' }}>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="flex gap-3 md:col-span-2">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-700">
                    <Target className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-heading text-base font-bold text-gray-900">
                      Power and Potential
                    </h3>
                    <p className="m-0 text-sm leading-relaxed text-gray-700">
                      A well-placed Mars in a Mangal Dosha chart amplifies leadership ability, athletic excellence, courage in adversity, and the drive to protect those the native loves.
                    </p>
                  </div>
                </div>
                <div className="rounded-lg bg-red-50 p-3" style={{ border: '1px solid #fecaca' }}>
                  <p className="m-0 text-xs italic leading-relaxed text-red-900">
                    An afflicted Mars can bring impulsiveness, conflict in relationships, accidents, and difficulty with patience and compromise.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 rounded-xl bg-white p-4" style={{ border: '1px solid #fecaca' }}>
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-700">
                <Clock className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <h3 className="mb-1 font-heading text-base font-bold text-gray-900">
                  Mahadasha Timing
                </h3>
                <p className="m-0 text-sm leading-relaxed text-gray-700">
                  Understanding Mars placement, its dignity, aspects, and the Vimshottari Dasha timing of the Mars Mahadasha, seven years, is central to reading a Mangal Dosha chart accurately.
                </p>
              </div>
            </div>

            <div className="rounded-xl bg-white p-5" style={{ border: '1px solid #fecaca' }}>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-800">
                  <Home className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="m-0 font-heading text-lg font-bold text-gray-900">
                  House Placement Strip
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                {[
                  ['7th House', 'direct impact on marriage and partnerships'],
                  ['8th House', 'transformation, longevity, and hidden karmic weight'],
                  ['1st House', 'self, body, and how one meets the world'],
                ].map(([title, body]) => (
                  <div key={title} className="rounded-lg bg-red-50 p-3 text-center" style={{ border: '1px solid #fecaca' }}>
                    <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-red-200 text-red-800">
                      <Star className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <div className="font-heading text-sm font-bold text-red-800">{title}</div>
                    <div className="mt-1 text-xs text-gray-600">{body}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative flex items-center bg-red-950">
        <div className="mx-auto w-full max-w-3xl px-4 py-16 text-center text-white sm:px-6 lg:px-8">
          <div className="mb-5 font-devanagari text-3xl leading-relaxed text-amber-300 md:text-4xl" lang="sa">
            ॐ अं अंगारकाय नमः
          </div>
          <div className="mb-3 text-lg italic text-white md:text-xl">
            Om Aṃ Aṃgārakāya Namaḥ
          </div>
          <div className="mx-auto mb-6 max-w-xl text-sm text-red-100 md:text-base">
            Salutation to Mangala (Mars), the planet of courage and action.
          </div>
          <div className="inline-block rounded-full bg-amber-500 px-5 py-2 text-sm font-semibold text-gray-900 shadow-md">
            Chant 108 times
            <span className="mx-2">·</span>
            Tuesday mornings facing south
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-red-50 px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <h2 className="font-heading text-3xl font-bold leading-tight text-gray-900 md:text-5xl">
              Characteristics of Mangal Dosha Natives
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-gray-600">
              Mars brings force, initiative, and heat. Conscious handling turns intensity into strength.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <TraitPanel title="Strengths" rows={STRENGTHS} icon={ShieldCheck} color="#b91c1c" />
            <TraitPanel title="Challenges" rows={CHALLENGES} icon={AlertTriangle} color="#d97706" />
          </div>
        </div>
      </section>

      <section className="bg-red-50 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-800">
              <Target className="h-6 w-6" aria-hidden="true" />
            </div>
            <h2 className="mb-3 font-heading text-3xl font-bold leading-tight text-gray-900 md:text-5xl">
              Mangal Dosha Across the 12 Houses
            </h2>
            <div className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-red-800">
              How Mars energy shapes each bhava when Mangal Dosha is present
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {HOUSE_DATA.map((house) => {
              const Icon = house.icon;
              return (
                <div
                  key={house.num}
                  className="rounded-2xl bg-white p-4"
                  style={{ border: `1px solid ${house.color}4d` }}
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex h-7 w-7 items-center justify-center rounded-md text-xs font-bold text-white" style={{ background: house.color }}>
                      {house.num}
                    </div>
                    <Icon className="h-6 w-6" style={{ color: house.color }} aria-hidden="true" />
                  </div>
                  <h3 className="mb-2 font-heading text-[11px] font-bold tracking-wider" style={{ color: house.color }}>
                    {house.heading}
                  </h3>
                  <div className="mb-3 h-px" style={{ background: house.color, opacity: 0.3 }} />
                  <p className="mb-0 text-[13px] leading-snug text-gray-600">{house.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative bg-red-950 px-6 py-16">
        <div className="relative mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <h2 className="mb-3 font-heading text-3xl font-bold leading-tight text-white md:text-4xl">
              Classical Vedic Remedies for Mangal Dosha
            </h2>
            <p className="text-base text-white/70">
              Traditional Mars remedies, applied only after chart-based assessment
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {REMEDIES.map((remedy) => (
              <div
                key={remedy.main}
                className="rounded-xl p-5"
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(245,158,11,0.35)',
                }}
              >
                <p className="m-0 mb-2 text-sm font-semibold leading-relaxed text-white">
                  {remedy.main}
                </p>
                <p className="m-0 text-xs leading-relaxed text-white/70">
                  <span aria-hidden="true" className="mr-1">›</span>
                  {remedy.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-purple-50 px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <h2 className="font-kalam text-4xl font-bold text-gray-950 md:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-gray-600">
              Your top questions about Mangal Dosha, answered with chart-first clarity.
            </p>
          </div>
          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <FaqItemCard
                key={faq.question}
                faq={faq}
                index={index}
                open={openFaq === index}
                onToggle={() => setOpenFaq(openFaq === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-r from-red-950 to-orange-950 py-20 text-white">
        <div className="absolute inset-0 opacity-15">
          <img
            src={HERO_URL}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 font-heading text-3xl font-bold md:text-4xl">
            Want a Personalised Mangal Dosha Reading?
          </h2>
          <p className="mb-8 text-xl leading-relaxed text-red-100">
            Saurabh Jain at Soul Infinity reads your Mangal Dosha in the context of your full birth chart, current dasha, and Kundali Milan compatibility, then explains what it actually means for your marriage and relationships without fear and without unnecessary remedies.
          </p>
          <Link
            to="/contact#contact-form-section"
            className="inline-flex items-center rounded-full bg-amber-400 px-8 py-4 text-lg font-semibold text-gray-900 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-amber-300"
          >
            Book a Consultation
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </>
  );
}

function TraitPanel({
  title,
  rows,
  icon: Icon,
  color,
}: {
  title: string;
  rows: readonly string[];
  icon: LucideIcon;
  color: string;
}) {
  return (
    <div className="overflow-hidden rounded-[20px] bg-white shadow-lg">
      <div className="flex items-center gap-4 p-5" style={{ background: color }}>
        <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-full bg-white p-3">
          <Icon className="h-7 w-7" style={{ color }} aria-hidden="true" />
        </div>
        <h3 className="m-0 text-2xl font-bold text-white">{title}</h3>
      </div>
      <div className="divide-y divide-red-50 bg-white">
        {rows.map((row) => (
          <div key={row} className="flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-red-50">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50">
              <Activity className="h-5 w-5 text-red-700" aria-hidden="true" />
            </div>
            <div className="flex-1 text-sm font-bold text-gray-800">{row}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
