import { Helmet } from 'react-helmet-async';
import SEOHead from '../../components/SEOHead';
import SchemaMarkup from '../../components/SchemaMarkup';
import Breadcrumbs from '../../components/Breadcrumbs';
import ComingSoonCard from '../../components/hub/ComingSoonCard';
import LiveCard from '../../components/hub/LiveCard';
import { getFaqPageSchemaFromList } from '../../data/schema-entities';

interface PlanetEntry {
  english: string;
  sanskritName: string;
  devanagari: string;
  href?: string;
  accent?: 'yellow' | 'red' | 'blue' | 'green' | 'orange';
}

const PLANETS: readonly PlanetEntry[] = [
  { english: 'Sun', sanskritName: 'Surya', devanagari: 'सूर्य' },
  { english: 'Moon', sanskritName: 'Chandra', devanagari: 'चन्द्र', href: '/planets/moon', accent: 'blue' },
  { english: 'Mars', sanskritName: 'Mangal', devanagari: 'मङ्गल' },
  { english: 'Mercury', sanskritName: 'Budh', devanagari: 'बुध' },
  { english: 'Jupiter', sanskritName: 'Guru', devanagari: 'गुरु' },
  { english: 'Venus', sanskritName: 'Shukra', devanagari: 'शुक्र' },
  { english: 'Saturn', sanskritName: 'Shani', devanagari: 'शनि' },
  { english: 'Rahu', sanskritName: 'Rahu', devanagari: 'राहु' },
  { english: 'Ketu', sanskritName: 'Ketu', devanagari: 'केतु' },
];

const FAQS: ReadonlyArray<{ question: string; answer: string }> = [
  {
    question: 'What are the Navagraha in Vedic astrology?',
    answer:
      'The Navagraha are the nine planetary energies recognised by Vedic astrology: Sun (Surya), Moon (Chandra), Mars (Mangal), Mercury (Budh), Jupiter (Guru), Venus (Shukra), Saturn (Shani), and the two lunar nodes Rahu and Ketu. Each carries a distinct psychological and karmic signature that shapes the life and personality of the individual.',
  },
  {
    question: 'How do the nine planets influence my life?',
    answer:
      'Each planet expresses itself through its placement by sign (rashi) and house (bhava), the nakshatra it occupies, and the Vimshottari Dasha period running in the chart. A skilled reading maps these factors into concrete life themes like career, relationships, health, and spiritual growth, rather than generic predictions.',
  },
  {
    question: 'Can planetary afflictions be remedied?',
    answer:
      'Yes. Classical Vedic remedies include mantra chanting, specific fasts, charitable acts, puja, and, where clinically indicated, gemstone therapy. At Soul Infinity, Saurabh Jain (K.N. Rao Institute of Vedic Astrology) prescribes remedies only after a detailed chart analysis, with clear instructions on how and when to begin.',
  },
];

export default function PlanetsHubPage() {
  return (
    <div className="bg-white">
      <SEOHead
        title="Navagraha: The Nine Planets in Vedic Astrology | Soul Infinity"
        description="Explore the nine planets (Navagraha) of Vedic astrology with Saurabh Jain (K.N. Rao Institute of Vedic Astrology). Dedicated guides for Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, and Ketu, plus mythology, behaviour, dasha effects, and remedies."
        keywords="navagraha, nine planets, vedic astrology, surya, chandra, mangal, budh, guru, shukra, shani, rahu, ketu, soul infinity, saurabh jain, k.n. rao"
      />
      <SchemaMarkup
        type="webpage"
        webPage={{
          name: 'The Nine Planets (Navagraha) in Vedic Astrology',
          description:
            'An introduction to the nine planets of Vedic astrology (Surya, Chandra, Mangal, Budh, Guru, Shukra, Shani, Rahu, and Ketu) by Saurabh Jain at Soul Infinity.',
          url: '/planets',
        }}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Planets', url: '/planets' },
        ]}
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(getFaqPageSchemaFromList(FAQS))}
        </script>
      </Helmet>

      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Planets' }]} />

      <section className="py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-caveat text-5xl md:text-7xl text-gray-900 leading-tight">
            The Nine Planets (Navagraha)
          </h1>
          <p className="font-devanagari text-3xl md:text-4xl text-gray-700 mt-2">नवग्रह</p>
          <p className="font-inter mt-6 text-lg text-gray-700 max-w-3xl mx-auto">
            In Vedic astrology, the nine planets (Navagraha) shape every aspect of our lives, from
            personality and relationships to career and spiritual growth. Each planet represents a
            distinct cosmic energy that influences us through its placement in our birth chart.
          </p>
        </div>
      </section>

      {/* TODO: Replace placeholder card icons with Iconscout astrology doodles (user will provide) */}
      <section className="pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div role="list" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PLANETS.map((planet) =>
              planet.href ? (
                <LiveCard
                  key={planet.english}
                  title={`${planet.english} (${planet.sanskritName})`}
                  sanskrit={planet.devanagari}
                  href={planet.href}
                  accentColor={planet.accent ?? 'yellow'}
                />
              ) : (
                <ComingSoonCard
                  key={planet.english}
                  title={`${planet.english} (${planet.sanskritName})`}
                  sanskrit={planet.devanagari}
                />
              ),
            )}
          </div>
        </div>
      </section>

      <section className="py-16 bg-surface">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 font-inter prose prose-lg text-gray-700">
          <h2 className="font-heading text-3xl text-gray-900 mb-6">
            Understanding the Navagraha
          </h2>
          <p>
            In Vedic astrology, the nine planets, known as the Navagraha, are the cornerstone of
            every chart interpretation. The system, rooted in the Brihat Parashara Hora Shastra
            and refined across centuries of lineage teaching, treats each planet as a sentient
            energy that inscribes karma into the fabric of an individual life. The Sun (Surya)
            governs identity, authority, and the soul's intent; the Moon (Chandra) rules the mind,
            emotion, and the moment-to-moment current of feeling. Mars (Mangal) sharpens courage
            and drive, Mercury (Budh) shapes language and intellect, Jupiter (Guru) expands wisdom
            and benevolence, Venus (Shukra) orchestrates love and aesthetic sense, and Saturn
            (Shani) enforces discipline, delay, and karmic accountability. The two shadow planets,
            Rahu and Ketu, map the lunar nodes, the points where the Moon's orbit intersects the
            ecliptic; they carry the weight of past-life desires (Rahu) and of release,
            liberation, and prior mastery (Ketu).
          </p>
          <p>
            Saurabh Jain, founder of Soul Infinity and a graduate of the K.N. Rao Institute of
            Vedic Astrology, reads each of these energies not in isolation but as a living
            conversation. The placement of a planet by sign (rashi) and house (bhava), its dignity
            and aspect, its nakshatra lord, and its activation through Vimshottari Dasha all
            combine to form a personalised map of how that planet will express itself in your
            life. Understanding this map turns astrology from fatalism into something far more
            useful: a language for seeing the shape of your own patterns, the timing of their
            amplification, and the remedies like mantra, meditation, gemstone, and charity that
            can harmonise a difficult influence.
          </p>
          <p>
            Use this hub as your starting point. Detailed Soul Infinity pillar pages for each of
            the nine planets are on the way, and each will cover mythology, behavioural
            signatures, dasha effects, and practical remedies drawn from both classical texts and
            Saurabh's consultation practice.
          </p>
        </div>
      </section>

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
