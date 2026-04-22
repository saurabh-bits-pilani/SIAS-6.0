import { Helmet } from 'react-helmet-async';
import SEOHead from '../../components/SEOHead';
import SchemaMarkup from '../../components/SchemaMarkup';
import Breadcrumbs from '../../components/Breadcrumbs';
import ComingSoonCard from '../../components/hub/ComingSoonCard';
import { getFaqPageSchemaFromList } from '../../data/schema-entities';

interface ZodiacEntry {
  english: string;
  sanskritName: string;
  devanagari: string;
}

const RASHIS: readonly ZodiacEntry[] = [
  { english: 'Aries', sanskritName: 'Mesh', devanagari: 'मेष' },
  { english: 'Taurus', sanskritName: 'Vrishabh', devanagari: 'वृषभ' },
  { english: 'Gemini', sanskritName: 'Mithun', devanagari: 'मिथुन' },
  { english: 'Cancer', sanskritName: 'Kark', devanagari: 'कर्क' },
  { english: 'Leo', sanskritName: 'Simha', devanagari: 'सिंह' },
  { english: 'Virgo', sanskritName: 'Kanya', devanagari: 'कन्या' },
  { english: 'Libra', sanskritName: 'Tula', devanagari: 'तुला' },
  { english: 'Scorpio', sanskritName: 'Vrischik', devanagari: 'वृश्चिक' },
  { english: 'Sagittarius', sanskritName: 'Dhanu', devanagari: 'धनु' },
  { english: 'Capricorn', sanskritName: 'Makar', devanagari: 'मकर' },
  { english: 'Aquarius', sanskritName: 'Kumbh', devanagari: 'कुम्भ' },
  { english: 'Pisces', sanskritName: 'Meen', devanagari: 'मीन' },
];

const FAQS: ReadonlyArray<{ question: string; answer: string }> = [
  {
    question: 'What is a Rashi in Vedic astrology?',
    answer:
      'A Rashi is a 30° segment of the zodiac — one of twelve signs through which the Moon, Sun, and every planet travel. Each rashi has an element (fire, earth, air, water), a modality (cardinal, fixed, mutable), and a ruling planet, which together shape its character.',
  },
  {
    question: 'Which is more important — my Sun sign or my Moon sign?',
    answer:
      'In Vedic astrology, the Moon sign (Chandra Rashi) is considered the most important, because it describes emotional temperament and mental patterning. The ascendant (Lagna) then sets the outer lens of life, and the Sun sign speaks to vitality and soul purpose.',
  },
  {
    question: 'How is my rashi determined?',
    answer:
      'Your Rashi is the zodiac sign in which the Moon was placed at the moment of your birth — calculated from the sidereal zodiac used in Vedic astrology (which is offset from the tropical zodiac used in Western astrology). An accurate birth time and location are required to determine it precisely.',
  },
];

export default function ZodiacHubPage() {
  return (
    <div className="bg-white">
      <SEOHead
        title="The 12 Rashis in Vedic Astrology | Soul Infinity"
        description="Discover the twelve Rashis of Vedic astrology — Mesh to Meen — with Soul Infinity. Each sign's element, modality, ruling planet, and personality signature, guided by Saurabh Jain."
        keywords="rashi, 12 zodiac signs, vedic astrology, mesh, vrishabh, mithun, kark, simha, kanya, tula, vrischik, dhanu, makar, kumbh, meen, soul infinity"
      />
      <SchemaMarkup
        type="webpage"
        webPage={{
          name: 'The Twelve Zodiac Signs (Rashi) in Vedic Astrology',
          description:
            'The twelve Rashis — their elements, modalities, ruling planets, and personality signatures — explained by Soul Infinity.',
          url: '/zodiac',
        }}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Zodiac Signs', url: '/zodiac' },
        ]}
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(getFaqPageSchemaFromList(FAQS))}
        </script>
      </Helmet>

      <Breadcrumbs
        items={[{ label: 'Home', href: '/' }, { label: 'Zodiac Signs' }]}
      />

      <section className="py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-caveat text-5xl md:text-7xl text-gray-900 leading-tight">
            The Twelve Zodiac Signs (Rashi)
          </h1>
          <p className="font-devanagari text-3xl md:text-4xl text-gray-700 mt-2">राशि</p>
          <p className="mt-6 text-lg text-gray-700 max-w-3xl mx-auto">
            The twelve Rashis represent the stations of the Moon through the zodiac, each carrying
            its own character, strengths, and life themes. Your Moon sign (Rashi) shapes your
            emotional world, while your Sun and Ascendant signs guide your outer life.
          </p>
        </div>
      </section>

      <section className="pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            role="list"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {RASHIS.map((rashi) => (
              <ComingSoonCard
                key={rashi.english}
                title={`${rashi.english} (${rashi.sanskritName})`}
                sanskrit={rashi.devanagari}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-surface">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-lg text-gray-700">
          <h2 className="font-heading text-3xl text-gray-900 mb-6">Understanding the Rashis</h2>
          <p>
            The twelve Rashis of Vedic astrology — from Mesh (Aries) to Meen (Pisces) — are the
            stations of the zodiac through which the Moon, Sun, and every planet travel. Each
            rashi carries a distinct elemental texture, modality, and ruling planet, and each one
            colours the planets that transit through it like a stained-glass window colours
            sunlight. Your Moon sign (Chandra Rashi) is the most important reference point in
            Vedic astrology: it shapes emotional temperament, mental predispositions, and the way
            you meet the world before thinking about it. Your ascendant (Lagna) sets the lens
            through which life presents itself. Your Sun sign, which Western astrology
            emphasises, maps more to vitality and soul purpose in the Vedic tradition.
          </p>
          <p>
            The signs alternate in qualities — fire, earth, air, water — and in modality —
            cardinal (chara), fixed (sthira), and mutable (dwisvabhava). Leo (Simha) is a fixed
            fire sign ruled by the Sun; its energy is radiant, sovereign, and benevolently proud.
            Virgo (Kanya) is a mutable earth sign ruled by Mercury; its intelligence is pragmatic
            and detail-oriented. Capricorn (Makar) is a cardinal earth sign ruled by Saturn; it
            builds enduring structure through patience and discipline. Each rashi lives in
            relation to the others — oppositions, sextiles, and trines shape the behavioural
            patterns of an entire chart.
          </p>
          <p>
            Under Saurabh Jain's guidance at Soul Infinity, rashi is not a fortune-telling
            headline but a contemplative entry point. A reading considers the house where your
            Moon sits, the nakshatra (lunar mansion) that governs its subtle texture, the lord of
            that sign and where it is placed, and the running dasha periods that activate it.
            This hub will soon link to in-depth pages for each of the twelve Rashis — covering
            personality themes, career and relationship dynamics, compatible rashis, remedies,
            and the nakshatras they contain.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl text-gray-900 mb-8 text-center">
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
