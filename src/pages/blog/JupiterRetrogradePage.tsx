import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ArrowRight, ChevronDown, CheckCircle, AlertTriangle, Sparkles, Star, Calendar, Gem, Globe,
  HelpCircle, Clock, Brain,
} from 'lucide-react';

const R2 = 'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev';
const HERO_IMAGE = `${R2}/Pillar/Planets/Jupiter/hero-guru.webp`;

const ACCENT = '#D4A11E';
const DARK_BG = '#2A1810';
const CREAM = '#FAF6EC';

const PAGE_URL = 'https://www.soulinfinity.space/blog/jupiter-retrograde-2026';
const PAGE_TITLE = 'Jupiter Retrograde 2026: Dates, Effects and Rashi Guide | Soul Infinity';
const PAGE_DESC = 'Jupiter Retrograde 2026 dates, effects on all 12 rashis, what to do and what to avoid, explained by K.N. Rao Institute trained astrologer Saurabh Jain.';

interface RashiEffect { rashi: string; tone: string; body: string; }
const RASHI_EFFECTS: readonly RashiEffect[] = [
  { rashi: 'Mesha (Aries)', tone: 'Career review', body: 'Jupiter from the 9th house turns inward. Old plans need rework. Travel slows, dharma deepens.' },
  { rashi: 'Vrishabha (Taurus)', tone: 'Wealth pause', body: 'Joint finances and inheritance matters surface. Investments are reviewed. Do not borrow now.' },
  { rashi: 'Mithuna (Gemini)', tone: 'Relationship test', body: 'Marriage and partnership conversations need patience. Old commitments are reaffirmed or released.' },
  { rashi: 'Karka (Cancer)', tone: 'Health and work', body: 'Routine, daily work, and health practices need restructuring. Service to others heals you.' },
  { rashi: 'Simha (Leo)', tone: 'Creative return', body: 'Old creative projects, children matters, and education plans come back for completion.' },
  { rashi: 'Kanya (Virgo)', tone: 'Home and roots', body: 'Property, mother, and home matters need attention. Family elders may need your care.' },
  { rashi: 'Tula (Libra)', tone: 'Communication', body: 'Old documents, contracts, and sibling matters resurface. Speak carefully. Recheck signatures.' },
  { rashi: 'Vrischika (Scorpio)', tone: 'Resources', body: 'Money, food, and family wealth come under review. Audit expenses. Speech needs softness.' },
  { rashi: 'Dhanu (Sagittarius)', tone: 'Self growth', body: 'Personal identity and direction get reworked. Spiritual reading, fasting, and silence help.' },
  { rashi: 'Makara (Capricorn)', tone: 'Inner work', body: 'Hidden matters, expenses, and foreign travel slow down. Sleep, meditation, and dreams intensify.' },
  { rashi: 'Kumbha (Aquarius)', tone: 'Network shift', body: 'Friendships, gains, and elder brother matters need reassessment. Old contacts may return.' },
  { rashi: 'Meena (Pisces)', tone: 'Career karma', body: 'Career, boss, and public reputation pause. Old work returns for completion. Avoid rash moves.' },
];

interface DoDont { item: string; body: string; }
const DO_LIST: readonly DoDont[] = [
  { item: 'Revisit old projects', body: 'Jupiter retrograde supports finishing what was started. Complete pending work before launching new.' },
  { item: 'Study, fast, and pray', body: 'Especially on Thursdays. Read Bhagavad Gita, Vishnu Sahasranama, or Guru Stotra. Yellow clothes help.' },
  { item: 'Reconnect with teachers', body: 'Old gurus, mentors, and teachers may resurface. Take their blessings. Forgive and reconcile.' },
  { item: 'Plan, do not act', body: 'Use this phase to plan, write, and refine strategy. Execution belongs to direct motion phases.' },
];

const DONT_LIST: readonly DoDont[] = [
  { item: 'Marry or engage', body: 'Vivah muhurta is generally avoided when Jupiter is retrograde. Wait for direct motion if possible.' },
  { item: 'Start a new venture', body: 'Major business launches, joint ventures, and IPOs are weakened. Existing operations are fine.' },
  { item: 'Sign large contracts', body: 'Property purchase, joint loans, and partnerships need extra due diligence. Reread every clause.' },
  { item: 'Skip traditional rituals', body: 'Daily prayer, food offering, and elder respect become more important, not less, during this phase.' },
];

interface Faq { q: string; a: string; icon: typeof HelpCircle; }
const FAQ_DATA: readonly Faq[] = [
  { q: 'When is Jupiter Retrograde in 2026?', icon: Clock,
    a: 'Jupiter goes retrograde for approximately four months each year. In 2026 the retrograde phase falls between mid June and mid October. Exact dates depend on your geographic location and the ephemeris used. Please confirm timing with your astrologer for your specific birth chart calculations.' },
  { q: 'Is Jupiter Retrograde bad for marriage?', icon: HelpCircle,
    a: 'Classical Vedic texts advise against fixing marriage muhurta when Jupiter is retrograde, especially for the bride. Existing marriages are not affected. The guidance applies to the act of starting a new union during the retrograde window.' },
  { q: 'Does Jupiter Retrograde reduce its benefic effects?', icon: AlertTriangle,
    a: 'Jupiter does not lose its benefic nature. It works inward rather than outward. Wisdom, devotion, study, and karmic insights are amplified. External growth, expansion, and new launches slow down. Old projects and inner refinement are favored.' },
  { q: 'What should I do during Jupiter Retrograde?', icon: Brain,
    a: 'Read scripture, fast on Thursdays, donate yellow items like turmeric, chana dal, or gold to a poor brahmin, recite Guru Stotra, reconnect with old teachers, and complete pending work. Avoid starting new ventures and large financial commitments.' },
  { q: 'Which rashi benefits most from Jupiter Retrograde 2026?', icon: Star,
    a: 'Rashis where Jupiter activates the 5th, 9th, or 10th house tend to benefit through karmic return and dharma alignment. Karka, Simha, and Vrischika natives often report breakthroughs in study, children, and dharma during this phase. The actual result depends on the full chart.' },
];

const SCHEMAS = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Jupiter Retrograde 2026: Dates, Effects and Rashi Guide',
    description: PAGE_DESC,
    author: { '@type': 'Person', name: 'Saurabh Jain', url: 'https://www.soulinfinity.space/cosmic-guide' },
    publisher: { '@type': 'Organization', name: 'Soul Infinity Astro Solutions' },
    datePublished: '2026-06-24',
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
      { '@type': 'ListItem', position: 3, name: 'Jupiter Retrograde 2026', item: PAGE_URL },
    ],
  },
];

export default function JupiterRetrogradePage() {
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
            alt="Guru Brihaspati with yellow robes representing Jupiter retrograde 2026"
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
              <span>Jupiter Retrograde 2026</span>
            </nav>
            <span className="inline-block self-start text-xs md:text-sm tracking-widest uppercase font-poppins font-semibold rounded-full px-3 py-1 mb-4" style={{ background: ACCENT, color: '#1c1917' }}>Vedic Astrology</span>
            <h1 className="font-caveat text-5xl md:text-7xl text-white leading-tight mb-3">Jupiter Retrograde 2026</h1>
            <p className="font-poppins text-base md:text-xl text-white/85 mb-4">Dates, Effects and What Each Rashi Should Know</p>
            <p className="font-poppins text-xs md:text-sm text-white/70">
              <Calendar className="inline w-3 h-3 mr-1" aria-hidden="true" />Jun 24, 2026
              <span className="mx-2">·</span>8 min read
              <span className="mx-2">·</span>By Saurabh Jain, K.N. Rao Institute
            </p>
          </div>
        </section>

        <section className="py-10 px-6" style={{ background: CREAM }}>
          <div className="max-w-3xl mx-auto rounded-2xl bg-white p-6 md:p-8 shadow-sm" style={{ borderLeft: `5px solid ${ACCENT}` }}>
            <h2 className="font-kalam text-xl md:text-2xl mb-3" style={{ color: ACCENT }}>The Short Answer</h2>
            <p className="font-poppins text-base text-[#3d2810] leading-relaxed m-0">
              Jupiter Retrograde 2026 runs from mid June through mid October. Guru does not lose his benefic nature, he turns it inward. Finish old work, study, fast on Thursdays, and avoid new launches, large contracts, and marriage muhurta during this phase.
            </p>
          </div>
        </section>

        <section className="py-16 px-6" style={{ background: DARK_BG }}>
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <h2 className="font-kalam text-3xl md:text-4xl" style={{ color: ACCENT }}>What is Jupiter Retrograde?</h2>
              <p className="font-poppins text-base text-white/85 leading-relaxed">
                Jupiter retrograde, called Vakri Guru in Sanskrit, is an optical phenomenon where Jupiter appears to move backward across the zodiac when viewed from Earth. The planet does not actually reverse. The motion is relative to our orbital position.
              </p>
              <p className="font-poppins text-base text-white/85 leading-relaxed">
                In Vedic astrology a retrograde planet is considered cheshta bali, strong in motion, but the energy works internally rather than externally. Jupiter retrograde brings karmic return. Old gurus reappear. Old wisdom finds new application. Old dharma is reaffirmed.
              </p>
              <p className="font-poppins text-base text-white/85 leading-relaxed">
                This is why classical texts advise against starting major outward expansion during the retrograde window. Marriage, launch, IPO, large contract, foreign relocation, all benefit from waiting for direct motion when possible.
              </p>
            </div>
            <aside className="rounded-2xl p-6 self-start" style={{ background: 'rgba(212,161,30,0.10)', border: `2px solid ${ACCENT}`, borderLeftWidth: '6px' }}>
              <div className="flex items-center gap-2 mb-3" style={{ color: ACCENT }}>
                <Sparkles className="w-5 h-5" aria-hidden="true" />
                <span className="font-poppins text-xs uppercase tracking-widest font-semibold">Guru Mantra</span>
              </div>
              <p className="font-devanagari text-2xl text-white leading-relaxed m-0" lang="sa">
                ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः
              </p>
              <p className="font-poppins text-sm text-white/75 mt-2 mb-1 italic">Om Graam Greem Graum Sah Gurave Namah</p>
              <p className="font-poppins text-xs text-white/60 m-0">I bow to Guru, the giver of wisdom and dharma.</p>
            </aside>
          </div>
        </section>

        <section className="py-12 px-6" style={{ background: CREAM }}>
          <div className="max-w-6xl mx-auto">
            <h2 className="font-kalam text-3xl md:text-4xl mb-3 text-center" style={{ color: DARK_BG }}>Jupiter Retrograde 2026 by Rashi</h2>
            <p className="font-poppins text-base text-[#5C4A2A] text-center max-w-3xl mx-auto mb-8 leading-relaxed">
              Effects below are based on Moon sign. Read your Moon rashi first, then your Lagna or Ascendant rashi. The two readings together describe the phase.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {RASHI_EFFECTS.map((r) => (
                <div key={r.rashi} className="bg-white rounded-2xl shadow-sm p-5" style={{ border: `1px solid ${ACCENT}33`, borderTop: `4px solid ${ACCENT}` }}>
                  <h3 className="font-kalam text-lg mb-1" style={{ color: DARK_BG }}>{r.rashi}</h3>
                  <p className="font-poppins text-xs uppercase tracking-widest font-semibold mb-2" style={{ color: ACCENT }}>{r.tone}</p>
                  <p className="font-poppins text-sm text-[#5C4A2A] leading-relaxed m-0">{r.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-kalam text-3xl md:text-4xl mb-8 text-center" style={{ color: DARK_BG }}>What to Do and What to Avoid</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-2xl shadow-sm overflow-hidden bg-white" style={{ border: `1px solid ${ACCENT}33` }}>
                <div className="px-6 py-4 flex items-center gap-3" style={{ background: 'linear-gradient(135deg, #14532d, #16a34a)' }}>
                  <CheckCircle className="w-7 h-7 text-white" aria-hidden="true" />
                  <h3 className="font-kalam text-xl text-white m-0">What to Do</h3>
                </div>
                <ul className="divide-y divide-green-50">
                  {DO_LIST.map((d) => (
                    <li key={d.item} className="px-5 py-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-green-700" aria-hidden="true" />
                        <div>
                          <p className="font-poppins font-semibold text-sm text-[#3d2810] mb-1">{d.item}</p>
                          <p className="font-poppins text-sm text-[#5C4A2A] leading-relaxed m-0">{d.body}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl shadow-sm overflow-hidden bg-white" style={{ border: `1px solid ${ACCENT}33` }}>
                <div className="px-6 py-4 flex items-center gap-3" style={{ background: 'linear-gradient(135deg, #7f1d1d, #dc2626)' }}>
                  <AlertTriangle className="w-7 h-7 text-white" aria-hidden="true" />
                  <h3 className="font-kalam text-xl text-white m-0">What to Avoid</h3>
                </div>
                <ul className="divide-y divide-red-50">
                  {DONT_LIST.map((d) => (
                    <li key={d.item} className="px-5 py-4">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-700" aria-hidden="true" />
                        <div>
                          <p className="font-poppins font-semibold text-sm text-[#3d2810] mb-1">{d.item}</p>
                          <p className="font-poppins text-sm text-[#5C4A2A] leading-relaxed m-0">{d.body}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 px-6" style={{ background: CREAM }}>
          <div className="max-w-3xl mx-auto">
            <h2 className="font-kalam text-3xl md:text-4xl text-center mb-2" style={{ color: DARK_BG }}>Frequently Asked Questions</h2>
            <p className="font-poppins text-sm text-[#5C4A2A] text-center mb-8">Your top questions about Jupiter Retrograde 2026</p>
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
            <Star className="w-8 h-8 mx-auto mb-4" style={{ color: DARK_BG }} aria-hidden="true" />
            <h2 className="font-caveat text-3xl md:text-5xl mb-4" style={{ color: DARK_BG }}>Get Your Jupiter Transit Reading</h2>
            <p className="font-poppins text-base text-[#3d2810] mb-8 leading-relaxed">
              Saurabh Jain at Soul Infinity Astro Solutions reads your natal Jupiter placement, current transit, and dasha overlap to show exactly how Guru Vakri will work in your specific chart through 2026 and 2027.
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
                to="/planets/jupiter"
                className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-poppins font-semibold transition"
                style={{ border: `2px solid ${DARK_BG}`, color: DARK_BG }}
              >
                <Globe className="w-5 h-5" aria-hidden="true" />
                Read Jupiter Complete Guide
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
