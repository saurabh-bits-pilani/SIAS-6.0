import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ArrowRight, ChevronDown, HelpCircle, Calendar, Gem, Globe,
  Star, Shield, Clock, Sunrise, Sunset, Flame, Moon,
} from 'lucide-react';

const R2 = 'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev';
const HERO_IMAGE = `${R2}/Pillar/Planets/Saturn/hero-shani.webp`;
const REMEDIES_BG = `${R2}/Nakshatra/Rohini/vedic-remedies-bg-rohini.webp`;

const ACCENT = '#D4A11E';
const DARK_BG = '#2A1810';
const CREAM = '#FAF6EC';
const CARD_BG = '#FFF9ED';

const PAGE_URL = 'https://www.soulinfinity.space/blog/sade-sati-2026-2027-rashi-effects';
const PAGE_TITLE = 'Sade Sati 2026 and 2027: Which Rashis Are in Saturn 7.5 Year Transit | Soul Infinity';
const PAGE_DESC = 'Sade Sati 2026 and 2027 guide: which rashis are affected, when the transit ends or begins, phase-by-phase effects, and remedies. By Saurabh Jain, K.N. Rao Institute.';

interface Rashi { name: string; sanskrit: string; phaseLabel: string; body: string; icon: typeof Sunset; color: string; peak: boolean; }
const RASHIS: readonly Rashi[] = [
  { name: 'Aquarius', sanskrit: 'Kumbha', phaseLabel: 'Closing (3rd phase)', body: 'Saturn in the 2nd from Aquarius Moon. Themes of family, finances, and consolidation. The exit from the 7.5 year transit. Recovery and integration period.', icon: Sunset, color: '#0EA5E9', peak: false },
  { name: 'Pisces', sanskrit: 'Meena', phaseLabel: 'PEAK Janma Shani', body: 'Saturn over the natal Moon for Pisces natives. The most intense phase of the 7.5 year transit. Identity restructuring, professional repositioning, deep emotional work. Discipline and routine are essential.', icon: Flame, color: '#DC2626', peak: true },
  { name: 'Aries', sanskrit: 'Mesha', phaseLabel: 'Rising (1st phase)', body: 'Saturn in the 12th from Aries Moon. Themes of foreign matters, withdrawal from old patterns, quiet rebuilding. The opening of the 7.5 year transit. Prepare for Janma Shani ahead.', icon: Sunrise, color: '#16A34A', peak: false },
];

interface Phase { num: string; title: string; body: string; icon: typeof Sunset; }
const PHASES: readonly Phase[] = [
  { num: 'Phase 1', title: 'Setting Sun (2.5 years)', body: 'Saturn in the 12th from natal Moon. Withdrawal, loss, expenditure, foreign matters, and quiet rebuilding.', icon: Sunset },
  { num: 'Phase 2', title: 'Janma Shani Peak (2.5 years)', body: 'Saturn over the natal Moon. Identity restructuring, emotional intensity, health attention, confronting deep patterns.', icon: Flame },
  { num: 'Phase 3', title: 'Rising (2.5 years)', body: 'Saturn in the 2nd from natal Moon. Family, finances, speech, and consolidating what has been learned.', icon: Sunrise },
];

interface Remedy { num: string; main: string; sub: string; }
const REMEDIES: readonly Remedy[] = [
  { num: '01', main: 'Chant Shani Beej Mantra 108 times', sub: 'Om Praam Preem Praum Sah Shanaischaray Namah on a black agate or iron mala, Saturday mornings, facing west.' },
  { num: '02', main: 'Saturday observances', sub: 'Modified fasting (khichdi only), light a sesame oil lamp at home or at a Shani temple, avoid alcohol and aggressive activity.' },
  { num: '03', main: 'Recite Hanuman Chalisa daily', sub: 'Hanuman softens Saturn. Universal recommendation during the entire 7.5 year transit.' },
  { num: '04', main: 'Donate black items on Saturdays', sub: 'Black sesame seeds, mustard oil, blankets, iron utensils, food for the poor. Donation embodies the Saturn theme of service.' },
  { num: '05', main: 'Feed crows and stray dogs', sub: 'Crows and dogs are sacred to Saturn. Consistent feeding produces lasting karmic shifts during the transit.' },
  { num: '06', main: 'Steady routine and discipline', sub: 'Saturn rewards consistency. Sleep, work, and self-care routines should remain stable. Avoid sudden changes when possible.' },
  { num: '07', main: 'Blue Sapphire only after consultation', sub: 'Neelam is the most powerful and the most dangerous Vedic gemstone. Never wear during Sade Sati without expert chart analysis.' },
];

interface Faq { q: string; a: string; icon: typeof HelpCircle; }
const FAQ_DATA: readonly Faq[] = [
  { q: 'Which rashi has Sade Sati in 2026?', icon: HelpCircle,
    a: 'Through 2026, Pisces (Meena) is in the peak Janma Shani phase. Aries (Mesha) is in the first setting phase. Aquarius (Kumbha) is in the final rising phase. Other rashis are not in active Sade Sati in 2026 but may experience related Saturn transits.' },
  { q: 'When will Sade Sati end for Aquarius?', icon: Sunset,
    a: 'Aquarius Sade Sati ends when Saturn moves out of Pisces in 2027. The final 2.5 year rising phase (Saturn in the 2nd from Aquarius Moon) completes at that time. A recovery period extends several years before the energetic effects fully settle.' },
  { q: 'When will Sade Sati start for Aries in 2026?', icon: Sunrise,
    a: 'Aries entered Sade Sati when Saturn moved into Pisces in early 2025. The first setting phase is active through 2026 and into 2027. The peak Janma Shani phase begins when Saturn enters Aries in 2027 and continues into 2029.' },
  { q: 'Is Sade Sati always 7.5 years?', icon: Clock,
    a: 'Yes, Sade Sati is by definition the 7.5 year period when Saturn transits the 12th, 1st, and 2nd houses from the natal Moon. Each phase is approximately 2.5 years long. The experienced intensity is not uniformly distributed. The peak Janma Shani phase is generally the most demanding.' },
  { q: 'What are the best remedies for Sade Sati in 2026?', icon: Shield,
    a: 'Saturday observances, Shani Beej Mantra recitation, Hanuman Chalisa, donation of black items, feeding crows and dogs, consistent routine. The deepest remedy is alignment with Saturn themes: discipline, patience, accepting necessary limitation, and turning attention to long-term structural work.' },
];

const SCHEMAS = [
  {
    '@context': 'https://schema.org', '@type': 'Article',
    headline: 'Sade Sati 2026 and 2027: Which Rashis Are in Saturn 7.5 Year Transit',
    description: PAGE_DESC,
    author: { '@type': 'Person', name: 'Saurabh Jain', url: 'https://www.soulinfinity.space/cosmic-guide' },
    publisher: { '@type': 'Organization', name: 'Soul Infinity Astro Solutions' },
    datePublished: '2026-06-23', image: HERO_IMAGE, url: PAGE_URL,
  },
  {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: FAQ_DATA.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  },
  {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.soulinfinity.space/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.soulinfinity.space/blog' },
      { '@type': 'ListItem', position: 3, name: 'Sade Sati 2026 and 2027', item: PAGE_URL },
    ],
  },
];

export default function SadeSati2026Page() {
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
          <img src={HERO_IMAGE} alt="Sade Sati 2026 Saturn transit effects on rashis Vedic astrology" className="absolute inset-0 w-full h-full object-cover" width={1600} height={600} loading="eager" fetchpriority="high" />
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 max-w-5xl mx-auto px-6 h-full flex flex-col justify-center text-white">
            <nav aria-label="Breadcrumb" className="font-poppins text-xs md:text-sm text-white/70 mb-4">
              <Link to="/" className="hover:text-amber-300">Home</Link>
              <span className="mx-2">›</span>
              <Link to="/blog" className="hover:text-amber-300">Blog</Link>
              <span className="mx-2">›</span>
              <span>Sade Sati 2026 and 2027</span>
            </nav>
            <span className="inline-block self-start text-xs md:text-sm tracking-widest uppercase font-poppins font-semibold rounded-full px-3 py-1 mb-4" style={{ background: ACCENT, color: '#1c1917' }}>Vedic Astrology</span>
            <h1 className="font-caveat text-5xl md:text-7xl text-white leading-tight mb-3">Sade Sati 2026 and 2027</h1>
            <p className="font-poppins text-base md:text-xl text-white/85 mb-4">Which Rashis Are in Saturn 7.5 Year Transit</p>
            <p className="font-poppins text-xs md:text-sm text-white/70">
              <Calendar className="inline w-3 h-3 mr-1" aria-hidden="true" />Jun 23, 2026
              <span className="mx-2">·</span>9 min read
              <span className="mx-2">·</span>By Saurabh Jain, K.N. Rao Institute
            </p>
          </div>
        </section>

        <section className="py-10 px-6" style={{ background: CREAM }}>
          <div className="max-w-3xl mx-auto rounded-2xl bg-white p-6 md:p-8 shadow-sm" style={{ borderLeft: `5px solid ${ACCENT}` }}>
            <h2 className="font-kalam text-xl md:text-2xl mb-3" style={{ color: ACCENT }}>The Short Answer</h2>
            <p className="font-poppins text-base text-[#3d2810] leading-relaxed m-0">
              In 2026, three rashis are in active Sade Sati: Pisces (peak Janma Shani), Aries (opening phase), and Aquarius (closing phase). Saturn is currently in Pisces and will move into Aries in 2027, shifting all three rashis into their next phase. The 7.5 year cycle continues into 2032 for Aries natives.
            </p>
          </div>
        </section>

        <section className="py-12 px-6" style={{ background: CREAM }}>
          <div className="max-w-5xl mx-auto space-y-4">
            <h2 className="font-kalam text-3xl md:text-4xl" style={{ color: DARK_BG }}>What is Sade Sati?</h2>
            <p className="font-poppins text-base text-[#3d2810] leading-relaxed">
              Sade Sati is the 7.5 year period when Saturn (Shani) transits the 12th, 1st, and 2nd houses counted from the natal Moon. The Hindi name literally means seven and a half. During this period, Saturn slow energy works on the emotional, financial, and identity dimensions associated with the Moon.
            </p>
            <p className="font-poppins text-base text-[#3d2810] leading-relaxed">
              The experience is not uniformly difficult. When Saturn is well-placed in the chart and life is aligned with Saturn themes (work, discipline, service), Sade Sati can bring lasting structural achievement. When Saturn is afflicted or the native resists Saturn themes, the period brings the experiences popularly associated with the transit: setbacks, delays, isolation, and pressure.
            </p>
          </div>
        </section>

        <section className="py-16 px-6" style={{ background: DARK_BG }}>
          <div className="max-w-6xl mx-auto">
            <h2 className="font-kalam text-3xl md:text-5xl text-center mb-2" style={{ color: ACCENT }}>3 Rashis in Sade Sati Now</h2>
            <p className="font-poppins text-sm text-center text-white/60 mb-10 uppercase tracking-widest">Saturn transit affects 3 rashis simultaneously</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {RASHIS.map((r) => {
                const Icon = r.icon;
                return (
                  <article key={r.name} className="rounded-2xl p-6" style={{ background: r.peak ? 'rgba(220, 38, 38, 0.15)' : 'rgba(255,255,255,0.05)', borderTop: `4px solid ${r.color}`, boxShadow: r.peak ? '0 0 30px rgba(220, 38, 38, 0.3)' : 'none' }}>
                    {r.peak && (
                      <div className="inline-block px-2 py-1 rounded text-xs font-poppins font-bold uppercase tracking-widest text-white mb-3" style={{ background: r.color }}>Peak Phase</div>
                    )}
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-kalam text-2xl text-white m-0">{r.name}</h3>
                        <p className="font-poppins text-xs text-white/60 m-0">{r.sanskrit}</p>
                      </div>
                      <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: `${r.color}33`, color: r.color }}>
                        <Icon className="w-6 h-6" aria-hidden="true" />
                      </div>
                    </div>
                    <p className="font-poppins text-xs uppercase tracking-widest font-semibold mb-1" style={{ color: r.color }}>{r.phaseLabel}</p>
                    <p className="font-poppins text-sm text-white/75 leading-relaxed m-0">{r.body}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-12 px-6" style={{ background: CREAM }}>
          <div className="max-w-5xl mx-auto">
            <h2 className="font-kalam text-3xl md:text-4xl mb-8 text-center" style={{ color: DARK_BG }}>The 3 Phases of Sade Sati</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {PHASES.map((p) => {
                const Icon = p.icon;
                return (
                  <div key={p.num} className="bg-white rounded-2xl p-5 shadow-sm" style={{ border: `1px solid ${ACCENT}33` }}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#FEF3C7', color: ACCENT }}>
                        <Icon className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <p className="font-poppins text-xs uppercase tracking-widest font-semibold m-0" style={{ color: ACCENT }}>{p.num}</p>
                    </div>
                    <h3 className="font-kalam text-lg mb-2" style={{ color: DARK_BG }}>{p.title}</h3>
                    <p className="font-poppins text-sm text-[#5C4A2A] leading-relaxed m-0">{p.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-12 px-6 text-center" style={{ background: CREAM }}>
          <div className="max-w-3xl mx-auto rounded-2xl p-8 md:p-10" style={{ background: CARD_BG, border: `2px solid ${ACCENT}` }}>
            <Moon className="w-10 h-10 mx-auto mb-4" style={{ color: ACCENT }} aria-hidden="true" />
            <p className="font-poppins text-xs uppercase tracking-widest font-semibold mb-2" style={{ color: ACCENT }}>Shani Beej Mantra</p>
            <div className="font-devanagari text-3xl md:text-4xl mb-4 leading-relaxed" style={{ color: DARK_BG }} lang="sa">
              ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः
            </div>
            <p className="font-poppins text-base italic text-[#5C4A2A] mb-1">Om Praam Preem Praum Sah Shanaischaray Namah</p>
            <p className="font-poppins text-sm text-[#5C4A2A]/70">Salutations to Saturn. Chant 108 times on Saturday mornings, facing west.</p>
          </div>
        </section>

        <section className="relative py-16 px-6">
          <img src={REMEDIES_BG} alt="" className="absolute inset-0 w-full h-full object-cover" aria-hidden="true" loading="lazy" />
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(42, 24, 16, 0.85)' }} />
          <div className="relative z-10 max-w-3xl ml-auto pr-0 md:pr-6">
            <h2 className="font-kalam text-3xl md:text-4xl mb-6" style={{ color: ACCENT }}>7 Remedies for Sade Sati</h2>
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
            <p className="font-poppins text-sm text-[#5C4A2A] text-center mb-8">Your top questions about Sade Sati 2026 and 2027</p>
            <div className="space-y-3">
              {FAQ_DATA.map((faq, i) => {
                const open = openFaq === i;
                const Icon = faq.icon;
                return (
                  <div key={faq.q} className="bg-white rounded-2xl shadow-sm overflow-hidden" style={{ borderLeft: open ? `4px solid ${ACCENT}` : '4px solid transparent' }}>
                    <button type="button" onClick={() => setOpenFaq(open ? null : i)} aria-expanded={open} aria-controls={`faq-${i}`} className="w-full flex items-center gap-3 text-left px-5 py-4 hover:bg-[#FEF3C7]/40 transition-colors">
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
            <h2 className="font-caveat text-3xl md:text-5xl mb-4" style={{ color: DARK_BG }}>Get Your Sade Sati Reading</h2>
            <p className="font-poppins text-base text-[#3d2810] mb-8 leading-relaxed">
              Saurabh Jain reads your specific Moon position, current Saturn transit, dasha activations, and chart-specific remedies to help you navigate the 7.5 year cycle with clarity.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href="https://wa.me/919079053840" className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-poppins font-semibold text-white shadow-md hover:shadow-lg transition" style={{ background: DARK_BG }}>
                Book on WhatsApp
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </a>
              <Link to="/dosha/saade-sati" className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-poppins font-semibold transition" style={{ border: `2px solid ${DARK_BG}`, color: DARK_BG }}>
                <Globe className="w-5 h-5" aria-hidden="true" />
                Sade Sati Service Details
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
