import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ArrowRight, ChevronDown, Sparkles, Star, HelpCircle, Calendar, Gem, Globe,
  Compass, Search, Crosshair, BookOpen, Sun, Heart, Brain, Moon,
} from 'lucide-react';

const R2 = 'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev';
const HERO_IMAGE = `${R2}/Blog/rohini-nakshatra-padas/hero-banner.webp`;
const ROHINI_HERO = `${R2}/Nakshatra/Rohini/hero-banner-rohini.webp`;

const ACCENT = '#D4A11E';
const DARK_BG = '#2A1810';
const CREAM = '#FAF6EC';

const PAGE_URL = 'https://www.soulinfinity.space/blog/rohini-nakshatra-padas';
const PAGE_TITLE = 'The 4 Padas of Rohini Nakshatra: Complete Guide | Soul Infinity';
const PAGE_DESC = 'All 4 padas of Rohini nakshatra explained. Navamsha lords, traits, and effects of each pada by K.N. Rao Institute trained astrologer Saurabh Jain.';

interface Pada {
  num: string; title: string; range: string; lord: string; navamsha: string;
  border: string; bg: string; icon: typeof Sun;
  traits: readonly string[]; insight: string;
}
const PADAS: readonly Pada[] = [
  {
    num: '01', title: 'Pada 1', range: '10 to 13 degrees 20 minutes Taurus',
    lord: 'Mars', navamsha: 'Aries navamsha',
    border: '#dc2626', bg: '#fef2f2', icon: Sun,
    traits: [
      'More assertive and action-oriented',
      'Creative ambition and entrepreneurial drive',
      'Willing to take risks for beauty and abundance',
      'Combines Rohini grace with Mars dynamism',
    ],
    insight: "Rohini's beauty meets Mars's drive. This native pursues aesthetics with ambition.",
  },
  {
    num: '02', title: 'Pada 2', range: '13 degrees 20 minutes to 16 degrees 40 minutes Taurus',
    lord: 'Venus', navamsha: 'Taurus navamsha',
    border: '#db2777', bg: '#fdf2f8', icon: Heart,
    traits: [
      'Most aesthetically refined of the four',
      'Double Venus influence (sign lord and navamsha lord)',
      'Exceptional artistic and musical talent',
      'Deepest romantic and sensual expression',
    ],
    insight: 'The most beautiful expression of Rohini. Venus amplifies every Rohini quality.',
  },
  {
    num: '03', title: 'Pada 3', range: '16 degrees 40 minutes to 20 degrees Taurus',
    lord: 'Mercury', navamsha: 'Gemini navamsha',
    border: '#16a34a', bg: '#f0fdf4', icon: Brain,
    traits: [
      'Articulate about the emotional world',
      'Excels as writers, poets, and communicators',
      'Combines deep feeling with intellectual clarity',
      'More flexible and adaptable in relationships',
    ],
    insight: "Moon's emotional depth meets Mercury's wit. This native can both feel and express deeply.",
  },
  {
    num: '04', title: 'Pada 4', range: '20 to 23 degrees 20 minutes Taurus',
    lord: 'Moon', navamsha: 'Cancer navamsha',
    border: '#1d4ed8', bg: '#eff6ff', icon: Moon,
    traits: [
      'Double Moon influence (sign and navamsha)',
      'Most intense emotional depth in this nakshatra',
      'Exceptional intuition and nurturing capacity',
      'Spiritual and contemplative practice essential',
    ],
    insight: 'All Rohini qualities amplified. The shadow patterns are also most pronounced here.',
  },
];

interface ComparisonRow { label: string; values: readonly [string, string, string, string]; }
const COMPARISON: readonly ComparisonRow[] = [
  { label: 'Lord', values: ['Mars', 'Venus', 'Mercury', 'Moon'] },
  { label: 'Sign', values: ['Aries', 'Taurus', 'Gemini', 'Cancer'] },
  { label: 'Quality', values: ['Ambitious', 'Aesthetic', 'Articulate', 'Intuitive'] },
  { label: 'Career', values: ['Creative entrepreneurship', 'Arts, luxury', 'Writing, teaching', 'Healing, spiritual'] },
  { label: 'Challenge', values: ['Impulsiveness', 'Over-indulgence', 'Over-thinking', 'Emotional intensity'] },
];

interface Step { num: string; icon: typeof Compass; title: string; body: string; }
const STEPS: readonly Step[] = [
  { num: '01', icon: Compass, title: 'Get accurate birth data', body: 'Exact date, time (within 5 minutes ideally), and place of birth. Time precision is critical for pada accuracy.' },
  { num: '02', icon: Search, title: 'Calculate your Moon degree', body: 'Use a Vedic astrology software or consult an astrologer to find your Moon position in the sidereal zodiac.' },
  { num: '03', icon: Crosshair, title: 'Check Taurus placement', body: 'Confirm your Moon falls between 10 and 23 degrees 20 minutes of Vrishabha (Taurus). That is the Rohini range.' },
  { num: '04', icon: BookOpen, title: 'Match the degree to a pada', body: 'Use the degree ranges in the cards above to identify your pada and its navamsha lord.' },
];

interface Remedy { num: string; main: string; sub: string; }
const REMEDIES: readonly Remedy[] = [
  { num: '01', main: 'Worship Lord Chandra on Mondays', sub: 'Offer white flowers and milk to the Moon on Purnima and every Monday.' },
  { num: '02', main: 'Wear Pearl (Moti) after astrological consultation', sub: 'Set in silver, worn on the little finger on Monday morning after puja.' },
  { num: '03', main: 'Chant Chandra Beej Mantra 108 times', sub: 'Om Shraam Shreem Shraum Sah Chandramasay Namah, on a pearl or white sphatik mala.' },
  { num: '04', main: 'Honor the pada lord with their day practice', sub: 'Pada 1 Tuesdays for Mars, Pada 2 Fridays for Venus, Pada 3 Wednesdays for Mercury, Pada 4 daily Moon practice.' },
];

interface Faq { q: string; a: string; icon: typeof HelpCircle; }
const FAQ_DATA: readonly Faq[] = [
  { q: 'What is a pada in Vedic astrology?', icon: HelpCircle,
    a: 'A pada is one quarter of a nakshatra. Each nakshatra spans 13 degrees 20 minutes and is divided into 4 padas of 3 degrees 20 minutes each. Each pada corresponds to a navamsha sign, which gives the pada its lord and modifies the expression of the nakshatra energy significantly.' },
  { q: 'Which pada of Rohini nakshatra is most powerful?', icon: Star,
    a: 'Rohini pada 1 (Mars) is strongest for material achievement. Rohini pada 2 (Venus) is the most aesthetically gifted expression. Rohini pada 4 (Moon) creates a double Moon influence that intensifies both the gifts and the emotional challenges of this nakshatra.' },
  { q: 'What is the lord of each Rohini nakshatra pada?', icon: Sparkles,
    a: 'Rohini pada 1 has Mars as navamsha lord. Rohini pada 2 has Venus. Rohini pada 3 has Mercury. Rohini pada 4 has the Moon as navamsha lord, creating an intense double Moon placement.' },
  { q: 'How does Rohini pada 4 differ from the others?', icon: Moon,
    a: 'Rohini pada 4 falls in the Moon own navamsha, creating an intense double Moon placement. This amplifies all Rohini qualities of beauty, longing, and emotional depth to their highest expression. Spiritual practice is particularly important for pada 4 natives.' },
  { q: 'How do I find out which pada of Rohini my Moon is in?', icon: Compass,
    a: 'If Moon is between 10 and 13.20 degrees Taurus you are pada 1. Between 13.20 and 16.40 is pada 2. Between 16.40 and 20 is pada 3. Between 20 and 23.20 is pada 4. A Vedic astrology consultation will calculate this precisely from your birth data.' },
];

const SCHEMAS = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'The 4 Padas of Rohini Nakshatra: Complete Guide',
    description: PAGE_DESC,
    author: { '@type': 'Person', name: 'Saurabh Jain', url: 'https://www.soulinfinity.space/cosmic-guide' },
    publisher: { '@type': 'Organization', name: 'Soul Infinity Astro Solutions' },
    datePublished: '2026-06-18',
    image: HERO_IMAGE,
    url: PAGE_URL,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_DATA.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.soulinfinity.space/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.soulinfinity.space/blog' },
      { '@type': 'ListItem', position: 3, name: 'Rohini Nakshatra Padas', item: PAGE_URL },
    ],
  },
];

export default function RohiniNakshatraPadasPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <Helmet>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={PAGE_DESC} />
        <link rel="canonical" href={PAGE_URL} />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={PAGE_DESC} />
        <meta property="og:image" content={HERO_IMAGE} />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(SCHEMAS)}</script>
      </Helmet>

      <main className="bg-white">
        <section className="relative w-full overflow-hidden h-72 md:h-96">
          <img
            src={HERO_IMAGE}
            alt="Rohini nakshatra 4 padas constellation wheel purple night sky crystals and lotuses"
            className="absolute inset-0 w-full h-full object-cover"
            width={1600}
            height={600}
            loading="eager"
            fetchpriority="high"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 max-w-5xl mx-auto px-6 h-full flex flex-col justify-center text-white">
            <nav aria-label="Breadcrumb" className="font-poppins text-xs md:text-sm text-white/70 mb-4">
              <Link to="/" className="hover:text-amber-300">Home</Link>
              <span className="mx-2">›</span>
              <Link to="/blog" className="hover:text-amber-300">Blog</Link>
              <span className="mx-2">›</span>
              <span>Rohini Nakshatra Padas</span>
            </nav>
            <span className="inline-block self-start text-xs md:text-sm tracking-widest uppercase font-poppins font-semibold rounded-full px-3 py-1 mb-4" style={{ background: ACCENT, color: '#1c1917' }}>Vedic Astrology</span>
            <h1 className="font-caveat text-5xl md:text-7xl text-white leading-tight mb-3">The 4 Padas of Rohini Nakshatra</h1>
            <p className="font-poppins text-base md:text-xl text-white/85 mb-4">What Each Pada Means for Your Moon Placement</p>
            <p className="font-poppins text-xs md:text-sm text-white/70">
              <Calendar className="inline w-3 h-3 mr-1" aria-hidden="true" />Jun 18, 2026
              <span className="mx-2">·</span>8 min read
              <span className="mx-2">·</span>By Saurabh Jain, K.N. Rao Institute
            </p>
          </div>
        </section>

        <section className="py-10 px-6" style={{ background: CREAM }}>
          <div className="max-w-3xl mx-auto rounded-2xl bg-white p-6 md:p-8 shadow-sm" style={{ borderLeft: `5px solid ${ACCENT}` }}>
            <h2 className="font-kalam text-xl md:text-2xl mb-3" style={{ color: ACCENT }}>The Short Answer</h2>
            <p className="font-poppins text-base text-[#3d2810] leading-relaxed m-0">
              Each of the 4 padas of Rohini nakshatra carries a different navamsha lord that modifies how the Moon expresses. Pada 1 (Mars), Pada 2 (Venus), Pada 3 (Mercury), Pada 4 (Moon). Each creates a distinctly different personality despite sharing the same nakshatra.
            </p>
          </div>
        </section>

        <section className="py-12 px-6" style={{ background: CREAM }}>
          <div className="max-w-5xl mx-auto space-y-4">
            <h2 className="font-kalam text-3xl md:text-4xl" style={{ color: DARK_BG }}>What is a Nakshatra Pada?</h2>
            <p className="font-poppins text-base text-[#3d2810] leading-relaxed">
              A pada is one quarter of a nakshatra. Since each nakshatra spans 13 degrees 20 minutes, each pada spans exactly 3 degrees 20 minutes. The pada system links the 27 nakshatras to the 12 signs through the navamsha (D9) chart, the most important divisional chart in Vedic astrology.
            </p>
            <p className="font-poppins text-base text-[#3d2810] leading-relaxed">
              Each pada corresponds to one navamsha sign, and the navamsha lord becomes the sub-ruler that colors how the nakshatra energy expresses in that pada. For Rohini, the four padas land in Aries, Taurus, Gemini, and Cancer navamshas, ruled respectively by Mars, Venus, Mercury, and the Moon.
            </p>
          </div>
        </section>

        <section className="py-12 px-6" style={{ background: CREAM }}>
          <div className="max-w-6xl mx-auto">
            <h2 className="font-kalam text-3xl md:text-4xl mb-8 text-center" style={{ color: DARK_BG }}>The 4 Padas of Rohini</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {PADAS.map((p) => {
                const Icon = p.icon;
                return (
                  <article key={p.num} className="bg-white rounded-2xl shadow-sm p-6" style={{ borderTop: `4px solid ${p.border}`, borderLeft: `1px solid ${p.border}33` }}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-caveat text-5xl" style={{ color: p.border }}>{p.num}</span>
                      <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: p.bg, color: p.border }}>
                        <Icon className="w-6 h-6" aria-hidden="true" />
                      </div>
                    </div>
                    <h3 className="font-kalam text-2xl mb-1" style={{ color: DARK_BG }}>{p.title}</h3>
                    <p className="font-poppins text-xs uppercase tracking-widest font-semibold mb-1" style={{ color: p.border }}>{p.lord} (Lord) · {p.navamsha}</p>
                    <p className="font-poppins text-xs text-[#5C4A2A] mb-4">{p.range}</p>
                    <ul className="space-y-2 mb-4">
                      {p.traits.map((t) => (
                        <li key={t} className="flex gap-2 font-poppins text-sm text-[#3d2810]">
                          <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: p.border }} aria-hidden="true" />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="font-kalam text-base italic text-[#5C4A2A] m-0" style={{ borderLeft: `3px solid ${p.border}`, paddingLeft: '0.75rem' }}>{p.insight}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-16 px-6" style={{ background: DARK_BG }}>
          <div className="max-w-5xl mx-auto">
            <h2 className="font-kalam text-3xl md:text-4xl text-center mb-8" style={{ color: ACCENT }}>Pada Comparison at a Glance</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                <thead>
                  <tr style={{ background: 'rgba(212,161,30,0.15)' }}>
                    <th className="font-kalam text-base p-4 text-white">&nbsp;</th>
                    <th className="font-kalam text-base p-4 text-white">Pada 1</th>
                    <th className="font-kalam text-base p-4 text-white">Pada 2</th>
                    <th className="font-kalam text-base p-4 text-white">Pada 3</th>
                    <th className="font-kalam text-base p-4 text-white">Pada 4</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row) => (
                    <tr key={row.label} className="border-t border-white/10">
                      <td className="font-poppins text-sm font-semibold p-4" style={{ color: ACCENT }}>{row.label}</td>
                      {row.values.map((v, i) => (
                        <td key={i} className="font-poppins text-sm p-4 text-white/85">{v}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="py-12 px-6" style={{ background: CREAM }}>
          <div className="max-w-5xl mx-auto">
            <h2 className="font-kalam text-3xl md:text-4xl mb-8 text-center" style={{ color: DARK_BG }}>How to Find Your Rohini Pada</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {STEPS.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.num} className="bg-white rounded-2xl p-5 shadow-sm" style={{ border: `1px solid ${ACCENT}33` }}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="w-8 h-8 rounded-md flex items-center justify-center text-white text-xs font-bold" style={{ background: ACCENT }}>{s.num}</span>
                      <Icon className="w-5 h-5" style={{ color: ACCENT }} aria-hidden="true" />
                    </div>
                    <h3 className="font-kalam text-lg mb-2" style={{ color: DARK_BG }}>{s.title}</h3>
                    <p className="font-poppins text-sm text-[#5C4A2A] leading-relaxed m-0">{s.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="relative py-16 px-6">
          <img src={ROHINI_HERO} alt="" className="absolute inset-0 w-full h-full object-cover" aria-hidden="true" loading="lazy" />
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(42, 24, 16, 0.85)' }} />
          <div className="relative z-10 max-w-3xl ml-auto pr-0 md:pr-6">
            <h2 className="font-kalam text-3xl md:text-4xl mb-6" style={{ color: ACCENT }}>Remedies for Rohini Nakshatra</h2>
            <ol className="space-y-5">
              {REMEDIES.map((r) => (
                <li key={r.num} className="flex gap-4 items-start border-b border-white/15 pb-4">
                  <span className="font-caveat text-3xl flex-shrink-0" style={{ color: ACCENT, minWidth: '2.5rem' }}>{r.num}</span>
                  <div>
                    <p className="font-poppins font-semibold text-white text-base mb-1">{r.main}</p>
                    <p className="font-poppins text-sm text-white/70 leading-relaxed m-0">{r.sub}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="py-12 px-6" style={{ background: CREAM }}>
          <div className="max-w-3xl mx-auto">
            <h2 className="font-kalam text-3xl md:text-4xl text-center mb-2" style={{ color: DARK_BG }}>Frequently Asked Questions</h2>
            <p className="font-poppins text-sm text-[#5C4A2A] text-center mb-8">Your top questions about Rohini nakshatra padas</p>
            <div className="space-y-3">
              {FAQ_DATA.map((faq, i) => {
                const open = openFaq === i;
                const Icon = faq.icon;
                return (
                  <div key={faq.q} className="bg-white rounded-2xl shadow-sm overflow-hidden" style={{ borderLeft: open ? `4px solid ${ACCENT}` : '4px solid transparent' }}>
                    <button
                      type="button"
                      onClick={() => setOpenFaq(open ? null : i)}
                      aria-expanded={open}
                      aria-controls={`faq-${i}`}
                      className="w-full flex items-center gap-3 text-left px-5 py-4 hover:bg-[#FEF3C7]/40 transition-colors"
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" style={{ color: ACCENT }} aria-hidden="true" />
                      <span className="font-poppins font-semibold text-sm md:text-base text-[#3d2810] flex-1">{faq.q}</span>
                      <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} style={{ color: ACCENT }} aria-hidden="true" />
                    </button>
                    {open && (
                      <div id={`faq-${i}`} className="px-5 pb-5 font-poppins text-sm md:text-base text-[#5C4A2A] leading-relaxed">{faq.a}</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-16 px-6 text-center" style={{ background: `linear-gradient(135deg, ${ACCENT} 0%, #F5EFD9 100%)` }}>
          <div className="max-w-2xl mx-auto">
            <Compass className="w-8 h-8 mx-auto mb-4" style={{ color: DARK_BG }} aria-hidden="true" />
            <h2 className="font-caveat text-3xl md:text-5xl mb-4" style={{ color: DARK_BG }}>Find Your Rohini Pada</h2>
            <p className="font-poppins text-base text-[#3d2810] mb-8 leading-relaxed">
              Saurabh Jain reads your exact Moon degree, nakshatra pada, navamsha lord, and current dasha to give you a precise reading of how Rohini expresses in your specific chart.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="https://wa.me/919079053840"
                className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-poppins font-semibold text-white shadow-md hover:shadow-lg transition"
                style={{ background: DARK_BG }}
              >
                Book on WhatsApp
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </a>
              <Link
                to="/nakshatra/rohini"
                className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-poppins font-semibold transition"
                style={{ border: `2px solid ${DARK_BG}`, color: DARK_BG }}
              >
                <Globe className="w-5 h-5" aria-hidden="true" />
                Read Complete Rohini Guide
              </Link>
            </div>
            <p className="font-poppins text-xs text-[#5C4A2A]/70 mt-6 flex items-center justify-center gap-2">
              <Gem className="w-3 h-3" aria-hidden="true" />
              Consultations in person in Ahmedabad and online worldwide
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
