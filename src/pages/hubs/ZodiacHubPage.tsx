import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';
import SEOHead from '../../components/SEOHead';
import SchemaMarkup from '../../components/SchemaMarkup';
import Breadcrumbs from '../../components/Breadcrumbs';
import { getFaqPageSchemaFromList } from '../../data/schema-entities';

const HERO_URL =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Hub/preview/zodia-hero-banner-1.webp';
const ARIES_IMG =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Aries/aries-card.webp';
const TAURUS_IMG =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Zodiac/Hub/preview/tarus-card-1-1-ratio-circular.webp';

type Element = 'Fire' | 'Earth' | 'Air' | 'Water';

interface ElementColor {
  bg: string;
  border: string;
  text: string;
  badge: string;
  placeholderBg: string;
  placeholderText: string;
}

const ELEMENT_PALETTE: Record<Element, ElementColor> = {
  Fire: {
    bg: 'bg-rose-50',
    border: 'border-rose-200',
    text: 'text-rose-700',
    badge: 'bg-rose-100 text-rose-700 border-rose-200',
    placeholderBg: 'bg-gradient-to-br from-rose-100 to-orange-100',
    placeholderText: 'text-rose-700',
  },
  Earth: {
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    text: 'text-emerald-700',
    badge: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    placeholderBg: 'bg-gradient-to-br from-emerald-100 to-lime-100',
    placeholderText: 'text-emerald-700',
  },
  Air: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    text: 'text-amber-700',
    badge: 'bg-amber-100 text-amber-800 border-amber-200',
    placeholderBg: 'bg-gradient-to-br from-amber-100 to-yellow-100',
    placeholderText: 'text-amber-800',
  },
  Water: {
    bg: 'bg-sky-50',
    border: 'border-sky-200',
    text: 'text-sky-700',
    badge: 'bg-sky-100 text-sky-700 border-sky-200',
    placeholderBg: 'bg-gradient-to-br from-sky-100 to-indigo-100',
    placeholderText: 'text-sky-700',
  },
};

interface Rashi {
  slug: string;
  english: string;
  sanskrit: string;
  devanagari: string;
  symbol: string;
  element: Element;
  ruler: string;
  dates: string;
  desc: string;
  elementColor: ElementColor;
  image: string | null;
}

const RASHIS: readonly Rashi[] = [
  {
    slug: 'aries',
    english: 'Aries',
    sanskrit: 'Mesh',
    devanagari: 'मेष',
    symbol: '♈',
    element: 'Fire',
    ruler: 'Mars (Mangala)',
    dates: 'Mar 21 to Apr 19',
    desc: 'Cardinal fire sign of initiative, courage, and the spark that begins every venture.',
    elementColor: ELEMENT_PALETTE.Fire,
    image: ARIES_IMG,
  },
  {
    slug: 'taurus',
    english: 'Taurus',
    sanskrit: 'Vrishabh',
    devanagari: 'वृषभ',
    symbol: '♉',
    element: 'Earth',
    ruler: 'Venus (Shukra)',
    dates: 'Apr 20 to May 20',
    desc: 'Fixed earth sign of stability, sensual abundance, and patient cultivation of value.',
    elementColor: ELEMENT_PALETTE.Earth,
    image: TAURUS_IMG,
  },
  {
    slug: 'gemini',
    english: 'Gemini',
    sanskrit: 'Mithun',
    devanagari: 'मिथुन',
    symbol: '♊',
    element: 'Air',
    ruler: 'Mercury (Budha)',
    dates: 'May 21 to Jun 20',
    desc: 'Mutable air sign of communication, curiosity, and the bridge between ideas.',
    elementColor: ELEMENT_PALETTE.Air,
    image: null,
  },
  {
    slug: 'cancer',
    english: 'Cancer',
    sanskrit: 'Kark',
    devanagari: 'कर्क',
    symbol: '♋',
    element: 'Water',
    ruler: 'Moon (Chandra)',
    dates: 'Jun 21 to Jul 22',
    desc: 'Cardinal water sign of nurturance, memory, and the protective embrace of family.',
    elementColor: ELEMENT_PALETTE.Water,
    image: null,
  },
  {
    slug: 'leo',
    english: 'Leo',
    sanskrit: 'Simha',
    devanagari: 'सिंह',
    symbol: '♌',
    element: 'Fire',
    ruler: 'Sun (Surya)',
    dates: 'Jul 23 to Aug 22',
    desc: 'Fixed fire sign of sovereignty, creative radiance, and benevolent self-expression.',
    elementColor: ELEMENT_PALETTE.Fire,
    image: null,
  },
  {
    slug: 'virgo',
    english: 'Virgo',
    sanskrit: 'Kanya',
    devanagari: 'कन्या',
    symbol: '♍',
    element: 'Earth',
    ruler: 'Mercury (Budha)',
    dates: 'Aug 23 to Sep 22',
    desc: 'Mutable earth sign of pragmatic intelligence, refinement, and devoted service.',
    elementColor: ELEMENT_PALETTE.Earth,
    image: null,
  },
  {
    slug: 'libra',
    english: 'Libra',
    sanskrit: 'Tula',
    devanagari: 'तुला',
    symbol: '♎',
    element: 'Air',
    ruler: 'Venus (Shukra)',
    dates: 'Sep 23 to Oct 22',
    desc: 'Cardinal air sign of harmony, partnership, and the impartial weighing of fairness.',
    elementColor: ELEMENT_PALETTE.Air,
    image: null,
  },
  {
    slug: 'scorpio',
    english: 'Scorpio',
    sanskrit: 'Vrischik',
    devanagari: 'वृश्चिक',
    symbol: '♏',
    element: 'Water',
    ruler: 'Mars (Mangala)',
    dates: 'Oct 23 to Nov 21',
    desc: 'Fixed water sign of depth, transformation, and the alchemy of unseen forces.',
    elementColor: ELEMENT_PALETTE.Water,
    image: null,
  },
  {
    slug: 'sagittarius',
    english: 'Sagittarius',
    sanskrit: 'Dhanu',
    devanagari: 'धनु',
    symbol: '♐',
    element: 'Fire',
    ruler: 'Jupiter (Guru)',
    dates: 'Nov 22 to Dec 21',
    desc: 'Mutable fire sign of dharma, philosophy, and the long arrow of higher purpose.',
    elementColor: ELEMENT_PALETTE.Fire,
    image: null,
  },
  {
    slug: 'capricorn',
    english: 'Capricorn',
    sanskrit: 'Makar',
    devanagari: 'मकर',
    symbol: '♑',
    element: 'Earth',
    ruler: 'Saturn (Shani)',
    dates: 'Dec 22 to Jan 19',
    desc: 'Cardinal earth sign of discipline, ambition, and the patient ascent of mastery.',
    elementColor: ELEMENT_PALETTE.Earth,
    image: null,
  },
  {
    slug: 'aquarius',
    english: 'Aquarius',
    sanskrit: 'Kumbh',
    devanagari: 'कुम्भ',
    symbol: '♒',
    element: 'Air',
    ruler: 'Saturn (Shani)',
    dates: 'Jan 20 to Feb 18',
    desc: 'Fixed air sign of vision, community, and the steady work of collective progress.',
    elementColor: ELEMENT_PALETTE.Air,
    image: null,
  },
  {
    slug: 'pisces',
    english: 'Pisces',
    sanskrit: 'Meen',
    devanagari: 'मीन',
    symbol: '♓',
    element: 'Water',
    ruler: 'Jupiter (Guru)',
    dates: 'Feb 19 to Mar 20',
    desc: 'Mutable water sign of compassion, intuition, and the dissolution into oneness.',
    elementColor: ELEMENT_PALETTE.Water,
    image: null,
  },
];

const FAQS: ReadonlyArray<{ question: string; answer: string }> = [
  {
    question: 'What is a Rashi in Vedic astrology?',
    answer:
      'A Rashi is a 30-degree segment of the sidereal zodiac, one of twelve signs through which the Moon, Sun, and every planet travel. Each rashi has an element (fire, earth, air, water), a modality (cardinal, fixed, mutable), and a ruling planet, which together shape its character.',
  },
  {
    question: 'Which is more important, my Sun sign or my Moon sign?',
    answer:
      'In Vedic astrology, the Moon sign (Chandra Rashi) is considered the most important, because it describes emotional temperament and mental patterning. The ascendant (Lagna) then sets the outer lens of life, and the Sun sign speaks to vitality and soul purpose.',
  },
  {
    question: 'How is my rashi determined?',
    answer:
      'Your Rashi is the zodiac sign in which the Moon was placed at the moment of your birth, calculated from the sidereal zodiac used in Vedic astrology (which is offset from the tropical zodiac used in Western astrology). An accurate birth time and location are required to determine it precisely.',
  },
];

interface CardProps {
  rashi: Rashi;
}

function ElementBadge({ rashi }: CardProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${rashi.elementColor.badge}`}
    >
      {rashi.element}
    </span>
  );
}

function RulerBadge({ rashi }: CardProps) {
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
      {rashi.ruler}
    </span>
  );
}

function SquareCard({ rashi }: CardProps) {
  return (
    <Link
      to={`/zodiac/${rashi.slug}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-soft-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 h-full"
    >
      <div className={`relative aspect-[4/3] overflow-hidden ${rashi.image ? '' : rashi.elementColor.placeholderBg}`}>
        {rashi.image ? (
          <img
            src={rashi.image}
            alt={`${rashi.english} (${rashi.sanskrit}) zodiac sign illustration`}
            width={800}
            height={600}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span
              className={`text-7xl ${rashi.elementColor.placeholderText} drop-shadow-sm select-none`}
              aria-hidden="true"
            >
              {rashi.symbol}
            </span>
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="font-devanagari text-xl text-gray-900">{rashi.devanagari}</span>
          <span className="text-sm text-gray-500">{rashi.sanskrit}</span>
        </div>
        <div className="font-heading font-bold text-lg text-gray-900 mb-1">{rashi.english}</div>
        <div className="text-xs text-gray-500 mb-3">{rashi.dates}</div>
        <p className="text-sm text-gray-700 mb-4 leading-snug line-clamp-2">{rashi.desc}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          <ElementBadge rashi={rashi} />
          <RulerBadge rashi={rashi} />
        </div>
        <span className={`inline-flex items-center text-sm font-semibold ${rashi.elementColor.text} group-hover:underline`}>
          Explore {rashi.sanskrit}
          <ArrowRight className="ml-1 w-4 h-4" />
        </span>
      </div>
    </Link>
  );
}

function CircularCard({ rashi }: CardProps) {
  // Aries gets a heavier red ring to visually separate the card from the
  // text area below, matching the brief.
  const liveRing = rashi.slug === 'aries'
    ? 'border-2 border-red-700'
    : rashi.slug === 'taurus'
      ? 'border-2 border-green-700'
      : rashi.slug === 'cancer'
        ? 'border-2 border-sky-700'
        : rashi.slug === 'gemini'
          ? 'border-2 border-yellow-700'
          : rashi.slug === 'leo'
            ? 'border-2 border-orange-700'
            : 'border';
  return (
    <Link
      to={`/zodiac/${rashi.slug}`}
      className={`group block rounded-2xl overflow-hidden p-6 text-center transition-all duration-300 transform hover:-translate-y-1 ${liveRing} ${rashi.elementColor.bg} ${rashi.elementColor.border} hover:shadow-soft-lg h-full`}
    >
      <div className="flex justify-center mb-4">
        {rashi.image ? (
          <img
            src={rashi.image}
            alt={`${rashi.english} (${rashi.sanskrit}) zodiac sign illustration`}
            width={96}
            height={96}
            loading="lazy"
            className="w-24 h-24 rounded-full object-cover ring-4 ring-white shadow-md group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div
            className={`w-24 h-24 rounded-full flex items-center justify-center ring-4 ring-white shadow-md ${rashi.elementColor.placeholderBg}`}
          >
            <span
              className={`text-5xl ${rashi.elementColor.placeholderText} select-none`}
              aria-hidden="true"
            >
              {rashi.symbol}
            </span>
          </div>
        )}
      </div>
      <div className="font-devanagari text-2xl text-gray-900 mb-0.5">{rashi.devanagari}</div>
      <div className="text-sm text-gray-500 mb-1">{rashi.sanskrit}</div>
      <div className="font-heading font-bold text-lg text-gray-900 mb-1">{rashi.english}</div>
      <div className="text-xs text-gray-500 mb-3">{rashi.dates}</div>
      <div className="flex flex-wrap justify-center gap-2 mb-3">
        <ElementBadge rashi={rashi} />
        <RulerBadge rashi={rashi} />
      </div>
      <p className="text-sm text-gray-700 mb-4 leading-snug line-clamp-2">{rashi.desc}</p>
      <span className={`inline-flex items-center text-sm font-semibold ${rashi.elementColor.text} group-hover:underline`}>
        Explore {rashi.sanskrit}
        <ArrowRight className="ml-1 w-4 h-4" />
      </span>
    </Link>
  );
}

export default function ZodiacHubPage() {
  const [layout, setLayout] = useState<'square' | 'circular'>('square');

  return (
    <div className="bg-white">
      <SEOHead
        title="The 12 Rashis in Vedic Astrology | Soul Infinity"
        description="Discover the twelve Rashis of Vedic astrology, from Mesh to Meen, with Soul Infinity. Each sign's element, modality, ruling planet, and personality signature, guided by Saurabh Jain."
        keywords="rashi, 12 zodiac signs, vedic astrology, mesh, vrishabh, mithun, kark, simha, kanya, tula, vrischik, dhanu, makar, kumbh, meen, soul infinity"
        image={HERO_URL}
        omitDefaultSchema
      />
      <SchemaMarkup
        type="webpage"
        webPage={{
          name: 'The Twelve Zodiac Signs (Rashi) in Vedic Astrology',
          description:
            'The twelve Rashis, their elements, modalities, ruling planets, and personality signatures, explained by Soul Infinity.',
          url: '/zodiac',
        }}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Learn', url: '/zodiac' },
          { name: 'Zodiac Signs', url: '/zodiac' },
        ]}
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(getFaqPageSchemaFromList(FAQS))}
        </script>
      </Helmet>

      {/* Hero banner */}
      <section className="relative h-[420px] overflow-hidden">
        <img
          src={HERO_URL}
          alt="Vedic zodiac wheel with the twelve rashis arranged around the sun"
          width={1600}
          height={420}
          fetchpriority="high"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/10" />
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="font-heading font-bold text-3xl md:text-5xl mb-4 leading-tight">
              The 12 Rashis, Vedic Zodiac Signs
            </h1>
            <p className="text-base md:text-lg text-gray-200 mb-5 leading-relaxed">
              Twelve sidereal stations of the Moon, each carrying its own element, ruler, and life signature. Saurabh Jain at Soul Infinity Astro Solutions reads your rashi as a contemplative entry point, not a fortune-telling headline.
            </p>
            <div className="font-devanagari text-xl md:text-2xl text-amber-300 mb-1" lang="sa">
              यथा पिण्डे तथा ब्रह्माण्डे
            </div>
            <div className="text-sm italic text-amber-200 mb-6">
              Yathā piṇḍe tathā brahmāṇḍe, as within, so without.
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center bg-amber-500 hover:bg-amber-400 text-gray-900 font-semibold px-6 py-3 rounded-full transition-colors shadow-md"
            >
              Book Your Rashi Reading
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Learn' },
          { label: 'Zodiac Signs' },
        ]}
      />

      {/* Intro */}
      <section className="pt-12 pb-6">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-gray-900 mb-4">
            Twelve Signs, One Cosmic Mirror
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Each rashi is a 30-degree slice of the sidereal zodiac, shaped by an element, a modality, and a ruling planet. Together the twelve signs map the full arc of human experience that every chart draws upon.
          </p>
        </div>
      </section>

      {/* Layout toggle */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <div
            className="inline-flex bg-gray-100 rounded-full p-1 border border-gray-200"
            role="group"
            aria-label="Card layout style"
          >
            <button
              type="button"
              onClick={() => setLayout('square')}
              aria-pressed={layout === 'square'}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
                layout === 'square'
                  ? 'bg-white shadow-sm text-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Square Cards
            </button>
            <button
              type="button"
              onClick={() => setLayout('circular')}
              aria-pressed={layout === 'circular'}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
                layout === 'circular'
                  ? 'bg-white shadow-sm text-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Circular Cards
            </button>
          </div>
        </div>
      </section>

      {/* 4x3 grid of 12 rashi cards */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            role="list"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {RASHIS.map((rashi) =>
              layout === 'square' ? (
                <SquareCard key={rashi.slug} rashi={rashi} />
              ) : (
                <CircularCard key={rashi.slug} rashi={rashi} />
              ),
            )}
          </div>
        </div>
      </section>

      {/* CTA banner, dark blue */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-indigo-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <img
            src={HERO_URL}
            alt=""
            aria-hidden="true"
            width={1600}
            height={420}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6">
            Want a Personalised Rashi Reading?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Saurabh Jain at Soul Infinity Astro Solutions reads your Moon sign in the context of your full birth chart, current dasha, and active transits, then translates the reading into decisions you can actually act on.
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

      {/* FAQ */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4 font-inter">
            {FAQS.map((faq) => (
              <details
                key={faq.question}
                className="group bg-white border border-gray-200 rounded-xl p-5"
              >
                <summary className="cursor-pointer font-semibold text-gray-900">
                  {faq.question}
                </summary>
                <p className="mt-3 text-gray-700 leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
