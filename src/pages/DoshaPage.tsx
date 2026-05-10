import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import SchemaMarkup from '../components/SchemaMarkup';
import Breadcrumbs from '../components/Breadcrumbs';
import { getFaqPageSchemaFromList } from '../data/schema-entities';

const R2_BASE =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Pillar/Dosha/Hub';

const HERO_URL = `${R2_BASE}/hero-banner-dosha-page.webp`;

interface Dosha {
  slug: string;
  image: string;
  alt: string;
  sanskritName: string;
  englishName: string;
  rulingPlanets: string;
  description: string;
  linkText: string;
  ring: string;
  bg: string;
  border: string;
  text: string;
  badge: string;
}

const DOSHAS: readonly Dosha[] = [
  {
    slug: 'kaal-sarp',
    image: `${R2_BASE}/Kal-sarpa-dosha-circular-listing.webp`,
    alt: 'Kaal Sarp Dosha illustration showing Rahu and Ketu encircling all planets in the birth chart',
    sanskritName: 'काल सर्प दोष',
    englishName: 'Kaal Sarp Dosha',
    rulingPlanets: 'Rahu and Ketu',
    description:
      'All seven planets hemmed between the shadow planets Rahu and Ketu, creating a serpent encirclement that intensifies karmic focus and life themes.',
    linkText: 'Explore Kaal Sarp',
    ring: 'border-2 border-violet-800',
    bg: 'bg-violet-50',
    border: 'border-violet-200',
    text: 'text-violet-800',
    badge: 'bg-violet-100 text-violet-800 border-violet-200',
  },
  {
    slug: 'mangal',
    image: `${R2_BASE}/mangal-dpsha-circular-listing.webp`,
    alt: 'Mangal Dosha illustration showing Mars placement in the birth chart affecting marriage compatibility',
    sanskritName: 'मंगल दोष',
    englishName: 'Mangal Dosha',
    rulingPlanets: 'Mars (Mangala)',
    description:
      'Mars placed in the 1st, 2nd, 4th, 7th, 8th, or 12th house carries Mangal Dosha, most commonly associated with relationship and marriage compatibility.',
    linkText: 'Explore Mangal',
    ring: 'border-2 border-red-700',
    bg: 'bg-rose-50',
    border: 'border-rose-200',
    text: 'text-rose-700',
    badge: 'bg-rose-100 text-rose-700 border-rose-200',
  },
  {
    slug: 'nadi',
    image: `${R2_BASE}/Nadi-Dosha-circular-listing.webp`,
    alt: 'Nadi Dosha illustration representing the three nadi types in Vedic marriage compatibility',
    sanskritName: 'नाडी दोष',
    englishName: 'Nadi Dosha',
    rulingPlanets: 'Moon (Chandra)',
    description:
      'Arising from matching birth nakshatras in marriage compatibility, Kundali Milan, Nadi Dosha signals potential health or progeny concerns when both partners share the same nadi type.',
    linkText: 'Explore Nadi',
    ring: 'border-2 border-sky-700',
    bg: 'bg-sky-50',
    border: 'border-sky-200',
    text: 'text-sky-700',
    badge: 'bg-sky-100 text-sky-700 border-sky-200',
  },
  {
    slug: 'pitru',
    image: `${R2_BASE}/Pitru-dosha.webp`,
    alt: 'Pitru Dosha illustration representing ancestral karmic debt in the Vedic birth chart',
    sanskritName: 'पितृ दोष',
    englishName: 'Pitru Dosha',
    rulingPlanets: 'Sun (Surya) and Saturn (Shani)',
    description:
      'A karmic imprint in the birth chart linked to ancestral debt and unfulfilled obligations of forebears. Sun and Saturn afflictions in specific houses are the primary indicators.',
    linkText: 'Explore Pitru',
    ring: 'border-2 border-amber-700',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    text: 'text-amber-800',
    badge: 'bg-amber-100 text-amber-800 border-amber-200',
  },
  {
    slug: 'saade-sati',
    image: `${R2_BASE}/sadei-sati-circular-listing.webp`,
    alt: 'Saade Sati illustration showing Saturn transiting three signs over a seven and a half year period',
    sanskritName: 'साढ़े साती',
    englishName: 'Saade Sati',
    rulingPlanets: 'Saturn (Shani)',
    description:
      'The seven-and-a-half year transit of Saturn through the sign before, the sign of, and the sign after your natal Moon. One of the most discussed and most misunderstood Vedic astrology cycles.',
    linkText: 'Explore Saade Sati',
    ring: 'border-2 border-slate-700',
    bg: 'bg-slate-50',
    border: 'border-slate-200',
    text: 'text-slate-700',
    badge: 'bg-slate-100 text-slate-700 border-slate-200',
  },
];

const FAQS: ReadonlyArray<{ question: string; answer: string }> = [
  {
    question: 'What is a dosha in Vedic astrology?',
    answer:
      'A dosha in Vedic astrology is a specific planetary combination or placement in the birth chart that classical texts flag as carrying heightened karmic significance. Doshas are not punishments or curses. They are karmic patterns that point to areas of life requiring conscious attention, understanding, and in some cases, specific action. The five most commonly discussed doshas are Mangal, Kaal Sarp, Nadi, Pitru, and Saade Sati.',
  },
  {
    question: 'How do I know if I have Mangal Dosha?',
    answer:
      'Mangal Dosha, also called Kuja Dosha, is present when Mars occupies the 1st, 2nd, 4th, 7th, 8th, or 12th house of your birth chart. The 7th and 8th house placements are generally considered the strongest in effect. Certain planetary combinations and sign placements cancel or reduce Mangal Dosha, so a full chart reading is required before drawing conclusions.',
  },
  {
    question: 'Is Saade Sati always negative?',
    answer:
      'No. Saade Sati is the seven-and-a-half year transit of Saturn through the three signs around your natal Moon. For many people it is a period of significant effort, restructuring, and karmic clearing. For individuals whose Saturn is well-placed or who are running a supportive dasha, Saade Sati can coincide with hard-earned but lasting professional and personal achievements. The transit is always significant, but its effects depend entirely on the individual chart.',
  },
  {
    question: 'Can doshas be cancelled or reduced?',
    answer:
      'Classical Vedic texts describe specific conditions that cancel or significantly reduce a dosha. For Mangal Dosha, matching a partner who also carries the dosha is the most cited resolution. For Kaal Sarp Dosha, the strength and placement of Rahu and Ketu and the overall chart context matter considerably. A qualified Jyotish practitioner reads these cancellations from the chart before recommending any course of action.',
  },
  {
    question: 'Do I need remedies for every dosha?',
    answer:
      'Not necessarily. Remedies in Vedic astrology are prescribed based on the severity of a dosha in the specific chart, the life area it most strongly affects, and whether the dasha timing makes it currently active. Many doshas identified in isolation carry little practical weight when read in the context of a full birth chart. A consultation should always precede any remedy.',
  },
];

function DoshaCard({ dosha }: { dosha: Dosha }) {
  return (
    <Link
      to="#"
      className={`group block h-full rounded-2xl overflow-hidden p-6 text-center transition-all duration-300 transform hover:-translate-y-1 ${dosha.ring} ${dosha.bg} ${dosha.border} hover:shadow-soft-lg`}
    >
      <div className="flex justify-center mb-4">
        <img
          src={dosha.image}
          alt={dosha.alt}
          width={96}
          height={96}
          loading="lazy"
          className="w-24 h-24 rounded-full object-cover ring-4 ring-white shadow-md group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="font-devanagari text-2xl text-gray-900 mb-1">{dosha.sanskritName}</div>
      <div className="font-kalam font-bold text-xl text-gray-900 mb-3">{dosha.englishName}</div>
      <div className="flex justify-center mb-3">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${dosha.badge}`}>
          {dosha.rulingPlanets}
        </span>
      </div>
      <p className="font-poppins text-sm text-gray-700 mb-4 leading-snug line-clamp-3">
        {dosha.description}
      </p>
      <span className={`inline-flex items-center text-sm font-semibold ${dosha.text} group-hover:underline`}>
        {dosha.linkText}
        <ArrowRight className="ml-1 w-4 h-4" />
      </span>
    </Link>
  );
}

export default function DoshaPage() {
  return (
    <div className="bg-white font-poppins">
      <SEOHead
        title="Doshas in Vedic Astrology | Soul Infinity"
        description="Understand the five key Vedic astrology doshas, Mangal, Kaal Sarp, Nadi, Pitru, and Saade Sati, and how they shape your chart, relationships, and karma. Guidance by Saurabh Jain, K.N. Rao Institute."
        keywords="dosha in vedic astrology, mangal dosha, kaal sarp dosha, nadi dosha, pitru dosha, saade sati, vedic astrology dosha remedies"
        image={HERO_URL}
        url="https://www.soulinfinity.space/dosha"
        omitDefaultSchema
      />
      <SchemaMarkup
        type="webpage"
        webPage={{
          name: 'Doshas in Vedic Astrology',
          description:
            'Understand the five key Vedic astrology doshas, Mangal, Kaal Sarp, Nadi, Pitru, and Saade Sati, and how they shape your chart, relationships, and karma.',
          url: '/dosha',
        }}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Learn', url: '/dosha' },
          { name: 'Doshas in Vedic Astrology', url: '/dosha' },
        ]}
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(getFaqPageSchemaFromList(FAQS))}
        </script>
      </Helmet>

      <section className="relative h-[460px] overflow-hidden">
        <img
          src={HERO_URL}
          alt="Vedic astrology dosha chart showing planetary afflictions and karmic patterns"
          width={1600}
          height={460}
          fetchpriority="high"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/10" />
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="max-w-3xl text-white">
            <h1 className="font-caveat font-bold text-5xl md:text-7xl mb-4 leading-tight">
              Doshas in Vedic Astrology
            </h1>
            <p className="text-base md:text-lg text-gray-200 mb-6 leading-relaxed">
              Five karmic imprints in your birth chart that shape relationships, health, wealth, and spiritual growth. Saurabh Jain at Soul Infinity reads doshas not as curses but as karmic signals requiring understanding, not fear.
            </p>
            <Link
              to="/contact#contact-form-section"
              className="inline-flex items-center bg-amber-500 hover:bg-amber-400 text-gray-900 font-semibold px-6 py-3 rounded-full transition-colors shadow-md"
            >
              Book Your Dosha Reading
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-8 text-center text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="font-devanagari text-2xl md:text-3xl text-amber-300 mb-2" lang="sa">
            कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।
          </div>
          <div className="text-sm md:text-base italic text-amber-100 mb-1">
            Karmaṇyevādhikāraste mā phaleṣu kadācana.
          </div>
          <div className="text-sm text-slate-200">
            Your right is to action alone, never to its fruit.
          </div>
          <div className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-400">
            Bhagavad Gita 2.47
          </div>
        </div>
      </section>

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Learn' },
          { label: 'Doshas' },
        ]}
      />

      <section className="pt-12 pb-6">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-kalam font-bold text-3xl md:text-4xl text-gray-900 mb-4">
            Five Doshas, One Karmic Map
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Each dosha is a specific planetary combination in the birth chart that classical Vedic texts identify as carrying heightened karmic weight. Understanding your dosha is the first step to working with it.
          </p>
        </div>
      </section>

      <section className="pt-6 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div role="list" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DOSHAS.map((dosha) => (
              <DoshaCard key={dosha.slug} dosha={dosha} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-blue-900 to-indigo-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <img
            src={HERO_URL}
            alt=""
            aria-hidden="true"
            width={1600}
            height={460}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-kalam font-bold text-3xl md:text-4xl mb-6">
            Want a Personalised Dosha Reading?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Saurabh Jain at Soul Infinity reads your dosha in the context of your full birth chart, current dasha, and active transits, then explains what it actually means for your life, without the fear and without the unnecessary remedies.
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

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-kalam text-3xl text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
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
