import { Helmet } from 'react-helmet-async';
import SEOHead from '../../components/SEOHead';
import SchemaMarkup from '../../components/SchemaMarkup';
import Breadcrumbs from '../../components/Breadcrumbs';
import ComingSoonCard from '../../components/hub/ComingSoonCard';
import { getFaqPageSchemaFromList } from '../../data/schema-entities';

interface DoshaEntry {
  title: string;
  note: string;
}

const DOSHAS: readonly DoshaEntry[] = [
  { title: 'Mangal Dosha (Manglik)', note: '' },
  { title: 'Kaal Sarp Dosh', note: '' },
  { title: 'Sade Sati (Saturn 7.5 Years)', note: '' },
  { title: 'Pitru Dosh', note: '' },
  { title: 'Nadi Dosh', note: '' },
];

const FAQS: ReadonlyArray<{ question: string; answer: string }> = [
  {
    question: 'What is a dosha in Vedic astrology?',
    answer:
      'A dosha is a specific planetary affliction in the birth chart: a structural pattern of graha placement, aspect, or nodal involvement that creates recurring friction in a defined area of life such as marriage, career, longevity, or ancestral lineage.',
  },
  {
    question: 'Are doshas always harmful?',
    answer:
      'No. A dosha is a diagnosis, not a verdict. Its intensity depends on the exact configuration, other balancing factors in the chart, and the dasha period running at the time. Many people with "doshas" lead full, harmonious lives, especially when appropriate remedies are observed.',
  },
  {
    question: 'How are doshas remedied?',
    answer:
      'Classical Vedic remedies include mantra practice, specific fasts, puja, charitable acts, and, where clinically indicated, gemstone therapy. At Soul Infinity, Saurabh Jain (K.N. Rao Institute of Vedic Astrology) tailors each remedial plan to the individual chart, with a clear timeline and instructions.',
  },
];

export default function DoshaHubPage() {
  return (
    <div className="bg-white">
      <SEOHead
        title="Doshas in Vedic Astrology: Mangal, Kaal Sarp, Sade Sati | Soul Infinity"
        description="Understand Mangal Dosha, Kaal Sarp Dosh, Sade Sati, Pitru Dosh, and Nadi Dosh, their origins, likely effects, and Vedic remedies, from Saurabh Jain at Soul Infinity."
        keywords="dosha, mangal dosha, manglik, kaal sarp dosh, sade sati, pitru dosh, nadi dosh, vedic remedies, soul infinity, saurabh jain"
      />
      <SchemaMarkup
        type="webpage"
        webPage={{
          name: 'Doshas in Vedic Astrology: Planetary Afflictions and Their Remedies',
          description:
            'A guide to the five classical doshas (Mangal, Kaal Sarp, Sade Sati, Pitru, and Nadi) by Saurabh Jain at Soul Infinity.',
          url: '/dosha',
        }}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Doshas', url: '/dosha' },
        ]}
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(getFaqPageSchemaFromList(FAQS))}
        </script>
      </Helmet>

      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Doshas' }]} />

      <section className="py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-caveat text-5xl md:text-7xl text-gray-900 leading-tight">
            Doshas in Vedic Astrology
          </h1>
          <p className="font-devanagari text-3xl md:text-4xl text-gray-700 mt-2">दोष</p>
          <p className="font-inter mt-6 text-lg text-gray-700 max-w-3xl mx-auto">
            Doshas are planetary afflictions in the birth chart that can create challenges in
            specific life areas like marriage, career, family, and longevity. Understanding your
            doshas is the first step toward appropriate remedies and acceptance.
          </p>
        </div>
      </section>

      {/* TODO: Replace placeholder card icons with Iconscout astrology doodles (user will provide) */}
      <section className="pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div role="list" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DOSHAS.map((dosha) => (
              <ComingSoonCard key={dosha.title} title={dosha.title} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-surface">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 font-inter prose prose-lg text-gray-700">
          <h2 className="font-heading text-3xl text-gray-900 mb-6">Understanding Doshas</h2>
          <p>
            Doshas in Vedic astrology are specific planetary afflictions: configurations of graha
            placement, aspect, or nodal involvement that create recurring friction in a defined
            area of life. Unlike a general "bad transit," a dosha is a structural pattern present
            from birth, visible in the natal chart and activated through dasha periods, transits,
            or life milestones. Recognising a dosha early matters because the remedies that
            restore balance (mantra practice, chart-specific fasting, gemstone therapy, puja, and
            charitable acts) take time to work and are most effective when prescribed against a
            precise diagnosis rather than a superstition.
          </p>
          <p>
            Mangal Dosha (Manglik) involves Mars in certain houses (1, 2, 4, 7, 8, 12 counted
            from Lagna, Moon, or Venus) and has long been associated with challenges in marriage,
            including delayed union, conflict, or health concerns for the spouse. Kaal Sarp Dosh
            is formed when all seven classical planets are hemmed between Rahu and Ketu, often
            experienced as waves of obstruction followed by breakthrough. Sade Sati, the
            seven-and-a-half-year transit of Saturn over natal Moon and the houses adjacent to
            it, is a slow-burning period of restructuring, karmic reckoning, and, for those who
            endure it consciously, deep growth. Pitru Dosh reflects unresolved ancestral karma,
            often activated during Pitru Paksha and addressed through specific tarpan and charity
            rituals. Nadi Dosh is a matching-chart concern in horoscope compatibility analysis.
          </p>
          <p>
            At Soul Infinity, Saurabh Jain, trained at the K.N. Rao Institute of Vedic Astrology,
            treats doshas not as verdicts but as diagnostic clarity. A dosha identified in a Soul
            Infinity reading is always paired with its intensity, the likely trigger periods, and
            a concrete, phased remedial plan. This hub will expand into dedicated pillar pages
            for each of the five doshas above, covering origins, the charts most prone to them,
            realistic consequences, and the traditional remedies that have been refined over
            generations of Vedic practice.
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
