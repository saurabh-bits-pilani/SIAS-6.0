import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ArrowRight, ChevronDown, AlertTriangle, Sparkles, Star, Calendar, Gem, Globe,
  HelpCircle, Briefcase, Clock, Shield, Activity, Brain,
} from 'lucide-react';

const R2 = 'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev';
const HERO_IMAGE = `${R2}/Pillar/Planets/Saturn/hero-shani.webp`;

const ACCENT = '#D4A11E';
const DARK_BG = '#2A1810';
const CREAM = '#FAF6EC';
const CARD_BG = '#FFF9ED';

const PAGE_URL = 'https://www.soulinfinity.space/blog/saturn-mahadasha-antardasha-effects';
const PAGE_TITLE = 'Saturn Mahadasha: Effects, Duration and Antardasha Guide | Soul Infinity';
const PAGE_DESC = 'Saturn Mahadasha lasts 19 years. Learn the effects of each Antardasha, career impact, comparison with Sade Sati, and remedies, explained by K.N. Rao Institute trained astrologer Saurabh Jain.';

interface Antardasha { period: string; duration: string; tone: string; body: string; }
const ANTARDASHAS: readonly Antardasha[] = [
  { period: 'Saturn in Saturn', duration: '3 yr 0 mo', tone: 'Foundation', body: 'The full Saturnian flavor. Slow progress, hard work, karmic reckoning. Health and bones need care.' },
  { period: 'Saturn in Mercury', duration: '2 yr 8 mo', tone: 'Mixed', body: 'Business mind sharpens. Communication contracts. Travel and paperwork dominate. Good for steady gains.' },
  { period: 'Saturn in Ketu', duration: '1 yr 1 mo', tone: 'Detachment', body: 'Sudden cuts, separations, spiritual openings. Old attachments dissolve. Health check advised.' },
  { period: 'Saturn in Venus', duration: '3 yr 2 mo', tone: 'Comfort', body: 'Material gains, marriage, vehicle, property. Relationship stability if Venus is well placed.' },
  { period: 'Saturn in Sun', duration: '11 mo', tone: 'Conflict', body: 'Friction with authority, father, government. Career test. Status pressure. Move with patience.' },
  { period: 'Saturn in Moon', duration: '1 yr 7 mo', tone: 'Emotional', body: 'Mood weight, mother concern, mental fatigue. Sleep and rest matter most in this phase.' },
  { period: 'Saturn in Mars', duration: '1 yr 1 mo', tone: 'Tension', body: 'Conflict, accidents, blood pressure, anger. Property disputes possible. Move slowly and safely.' },
  { period: 'Saturn in Rahu', duration: '2 yr 10 mo', tone: 'Disruption', body: 'Foreign moves, sudden change, shocks, unconventional choices. Confusion if Rahu is afflicted.' },
  { period: 'Saturn in Jupiter', duration: '2 yr 6 mo', tone: 'Wisdom', body: 'Recovery, dharma return, family, children, guru blessings. Often the most healing antardasha.' },
];

interface CareerNote { title: string; body: string; icon: typeof Briefcase; }
const CAREER_NOTES: readonly CareerNote[] = [
  { title: 'Slow but Lasting Growth', icon: Briefcase, body: 'Saturn rewards discipline. Promotions feel delayed but become permanent. Job stability over speed.' },
  { title: 'Karmic Industries Favor You', icon: Shield, body: 'Iron, oil, mining, real estate, government, law, public service, judiciary. Saturn supports labor based fields.' },
  { title: 'Avoid Speculation', icon: AlertTriangle, body: 'Stock trading, lottery, and quick schemes typically fail under Saturn. Long term investing succeeds.' },
  { title: 'Workload Increases', icon: Activity, body: 'Responsibility grows. Burnout risk is real. Health, sleep, and joints need attention throughout.' },
];

interface CompareRow { feature: string; sade: string; maha: string; }
const COMPARE_ROWS: readonly CompareRow[] = [
  { feature: 'Duration', sade: '7.5 years', maha: '19 years' },
  { feature: 'Trigger', sade: 'Saturn transit over natal Moon and adjacent signs', maha: 'Natal Saturn dasha period as per Vimshottari' },
  { feature: 'Frequency', sade: 'Once every 30 years approx', maha: 'Once in a lifetime for most people' },
  { feature: 'Nature', sade: 'External pressure, transit based', maha: 'Internal karmic phase, dasha based' },
  { feature: 'Best Remedy', sade: 'Hanuman Chalisa, Shani Stotra, charity', maha: 'Shani Beej Mantra, discipline, service to elders' },
];

interface Remedy { num: string; main: string; sub: string; }
const REMEDIES: readonly Remedy[] = [
  { num: '01', main: 'Chant Shani Beej Mantra 108 times daily', sub: 'Om Praam Preem Praum Sah Shanaischaray Namah, on a black kala hakik or rudraksha mala, ideally on Saturday.' },
  { num: '02', main: 'Serve elders, laborers, and the underprivileged', sub: 'Saturn is the karaka of the common man. Feeding workers and the poor reduces Saturnian weight quickly.' },
  { num: '03', main: 'Light a mustard oil lamp under a Peepal tree on Saturday', sub: 'Especially powerful at sunset. Walk around the tree seven times with hands folded.' },
  { num: '04', main: 'Donate black sesame, mustard oil, iron, or black clothes', sub: 'Donate on Saturday evening to a person in genuine need. Never in pride, only in service.' },
  { num: '05', main: 'Read Hanuman Chalisa and serve Hanuman ji', sub: 'Hanuman is the only deity who controls Shani. Daily Chalisa is the simplest and strongest remedy.' },
];

interface Faq { q: string; a: string; icon: typeof HelpCircle; }
const FAQ_DATA: readonly Faq[] = [
  { q: 'How long does Saturn Mahadasha last?', icon: Clock,
    a: 'Saturn Mahadasha lasts 19 years in the Vimshottari dasha system. Within those 19 years, you pass through 9 Antardashas, each ruled by one of the navagrahas, which shape the texture of that specific period.' },
  { q: 'Is Saturn Mahadasha always bad?', icon: HelpCircle,
    a: 'No. Saturn Mahadasha is not inherently bad. If natal Saturn is well placed in own sign, exaltation, kendra, or trikona, the dasha can deliver lasting career growth, property, public recognition, and long term stability. Affliction by malefics changes the result.' },
  { q: 'Which Antardasha of Saturn is the hardest?', icon: AlertTriangle,
    a: 'Saturn in Sun and Saturn in Mars are typically the most testing Antardashas. Saturn in Sun creates friction with authority and the father, and Saturn in Mars brings conflict, accidents, and property disputes. The actual result depends on the full chart.' },
  { q: 'What is the difference between Sade Sati and Saturn Mahadasha?', icon: Brain,
    a: 'Sade Sati is a 7.5 year transit phase that happens when Saturn moves through the sign before, on, and after the natal Moon. Saturn Mahadasha is a 19 year karmic phase that runs as per the Vimshottari dasha calculated from your birth nakshatra. They can also overlap, which intensifies effects.' },
  { q: 'What is the best remedy for Saturn Mahadasha?', icon: Star,
    a: 'The strongest remedies are daily Hanuman Chalisa, Shani Beej Mantra 108 times, lighting a mustard oil lamp under a Peepal tree on Saturday, serving elders and laborers, and donating black sesame or iron. Discipline in daily routine is also a Saturnian remedy in itself.' },
];

const SCHEMAS = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Saturn Mahadasha: Effects, Duration and Antardasha Guide',
    description: PAGE_DESC,
    author: { '@type': 'Person', name: 'Saurabh Jain', url: 'https://www.soulinfinity.space/cosmic-guide' },
    publisher: { '@type': 'Organization', name: 'Soul Infinity Astro Solutions' },
    datePublished: '2026-06-22',
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
      { '@type': 'ListItem', position: 3, name: 'Saturn Mahadasha', item: PAGE_URL },
    ],
  },
];

export default function SaturnMahadashaPage() {
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
            alt="Shani Dev with crow and iron bow representing Saturn Mahadasha"
            className="absolute inset-0 w-full h-full object-cover"
            width={1600}
            height={600}
            loading="eager"
            fetchpriority="high"
          />
          <div className="absolute inset-0 bg-black/65" />
          <div className="relative z-10 max-w-5xl mx-auto px-6 h-full flex flex-col justify-center text-white">
            <nav aria-label="Breadcrumb" className="font-poppins text-xs md:text-sm text-white/70 mb-4">
              <Link to="/" className="hover:text-amber-300">Home</Link>
              <span className="mx-2">›</span>
              <Link to="/blog" className="hover:text-amber-300">Blog</Link>
              <span className="mx-2">›</span>
              <span>Saturn Mahadasha</span>
            </nav>
            <span className="inline-block self-start text-xs md:text-sm tracking-widest uppercase font-poppins font-semibold rounded-full px-3 py-1 mb-4" style={{ background: ACCENT, color: '#1c1917' }}>Vedic Astrology</span>
            <h1 className="font-caveat text-5xl md:text-7xl text-white leading-tight mb-3">Saturn Mahadasha</h1>
            <p className="font-poppins text-base md:text-xl text-white/85 mb-4">Effects, Duration and What to Expect in Each Antardasha</p>
            <p className="font-poppins text-xs md:text-sm text-white/70">
              <Calendar className="inline w-3 h-3 mr-1" aria-hidden="true" />Jun 22, 2026
              <span className="mx-2">·</span>9 min read
              <span className="mx-2">·</span>By Saurabh Jain, K.N. Rao Institute
            </p>
          </div>
        </section>

        <section className="py-10 px-6" style={{ background: CREAM }}>
          <div className="max-w-3xl mx-auto rounded-2xl bg-white p-6 md:p-8 shadow-sm" style={{ borderLeft: `5px solid ${ACCENT}` }}>
            <h2 className="font-kalam text-xl md:text-2xl mb-3" style={{ color: ACCENT }}>The Short Answer</h2>
            <p className="font-poppins text-base text-[#3d2810] leading-relaxed m-0">
              Saturn Mahadasha is a 19 year karmic phase ruled by Shani in the Vimshottari dasha system. It rewards discipline, structure, and service, and exposes weakness, ego, and shortcuts. The actual result depends entirely on the natal placement of Saturn and its aspects in your chart.
            </p>
          </div>
        </section>

        <section className="py-16 px-6" style={{ background: DARK_BG }}>
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <h2 className="font-kalam text-3xl md:text-4xl" style={{ color: ACCENT }}>What is Saturn Mahadasha?</h2>
              <p className="font-poppins text-base text-white/85 leading-relaxed">
                In the Vimshottari Mahadasha system, every native passes through nine planetary periods of fixed length. Saturn rules 19 of those years. The Mahadasha begins based on the Moon nakshatra at birth, which is why two people born minutes apart can be at completely different stages.
              </p>
              <p className="font-poppins text-base text-white/85 leading-relaxed">
                Saturn is the karaka of time, karma, labor, and patience. When his dasha activates, the chart restructures around what is truly built rather than what is merely wished for. Shortcuts collapse. Solid foundations remain.
              </p>
              <p className="font-poppins text-base text-white/85 leading-relaxed">
                The texture of the 19 years is not uniform. Each Antardasha, the sub period within the dasha, brings the flavor of another planet onto Saturn. This is why one Saturn Mahadasha native flourishes while another struggles in the same year.
              </p>
            </div>
            <aside className="rounded-2xl p-6 self-start" style={{ background: 'rgba(212,161,30,0.10)', border: `2px solid ${ACCENT}`, borderLeftWidth: '6px' }}>
              <div className="flex items-center gap-2 mb-3" style={{ color: ACCENT }}>
                <Sparkles className="w-5 h-5" aria-hidden="true" />
                <span className="font-poppins text-xs uppercase tracking-widest font-semibold">Sanskrit Mantra</span>
              </div>
              <p className="font-devanagari text-2xl text-white leading-relaxed m-0" lang="sa">
                ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः
              </p>
              <p className="font-poppins text-sm text-white/75 mt-2 mb-1 italic">Om Praam Preem Praum Sah Shanaischaray Namah</p>
              <p className="font-poppins text-xs text-white/60 m-0">I bow to Saturn, the giver of karma and patience.</p>
            </aside>
          </div>
        </section>

        <section className="py-12 px-6" style={{ background: CREAM }}>
          <div className="max-w-6xl mx-auto">
            <h2 className="font-kalam text-3xl md:text-4xl mb-3 text-center" style={{ color: DARK_BG }}>The Nine Antardashas of Saturn</h2>
            <p className="font-poppins text-base text-[#5C4A2A] text-center max-w-3xl mx-auto mb-8 leading-relaxed">
              Each sub period within Saturn Mahadasha carries the flavor of another planet. The order is fixed but the result depends on the strength of each planet in your natal chart.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ANTARDASHAS.map((a) => (
                <div key={a.period} className="bg-white rounded-2xl shadow-sm p-5" style={{ border: `1px solid ${ACCENT}33`, borderLeft: `4px solid ${ACCENT}` }}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-kalam text-lg m-0" style={{ color: DARK_BG }}>{a.period}</h3>
                    <span className="font-poppins text-xs font-semibold rounded-full px-2 py-1" style={{ background: '#FEF3C7', color: '#92400E' }}>{a.duration}</span>
                  </div>
                  <p className="font-poppins text-xs uppercase tracking-widest font-semibold mb-2" style={{ color: ACCENT }}>{a.tone}</p>
                  <p className="font-poppins text-sm text-[#5C4A2A] leading-relaxed m-0">{a.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-kalam text-3xl md:text-4xl mb-8 text-center" style={{ color: DARK_BG }}>Career and Money Under Saturn</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {CAREER_NOTES.map((c) => {
                const Icon = c.icon;
                return (
                  <div key={c.title} className="rounded-2xl p-6" style={{ background: CARD_BG, border: `1px solid ${ACCENT}33` }}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#FEF3C7', color: ACCENT }}>
                        <Icon className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <h3 className="font-kalam text-xl m-0" style={{ color: DARK_BG }}>{c.title}</h3>
                    </div>
                    <p className="font-poppins text-sm text-[#5C4A2A] leading-relaxed m-0">{c.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-16 px-6" style={{ background: DARK_BG }}>
          <div className="max-w-5xl mx-auto">
            <h2 className="font-kalam text-3xl md:text-4xl text-center mb-3" style={{ color: ACCENT }}>Sade Sati vs Saturn Mahadasha</h2>
            <p className="font-poppins text-base text-white/75 text-center max-w-3xl mx-auto mb-8 leading-relaxed">
              These two Saturnian phases are often confused. They are different mechanisms and need different remedies.
            </p>
            <div className="overflow-x-auto rounded-2xl" style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${ACCENT}55` }}>
              <table className="w-full text-left">
                <thead>
                  <tr style={{ background: 'rgba(212,161,30,0.15)' }}>
                    <th className="font-poppins text-xs uppercase tracking-widest font-semibold px-4 py-3" style={{ color: ACCENT }}>Feature</th>
                    <th className="font-poppins text-xs uppercase tracking-widest font-semibold px-4 py-3" style={{ color: ACCENT }}>Sade Sati</th>
                    <th className="font-poppins text-xs uppercase tracking-widest font-semibold px-4 py-3" style={{ color: ACCENT }}>Saturn Mahadasha</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARE_ROWS.map((r) => (
                    <tr key={r.feature} className="border-t border-white/10">
                      <td className="font-poppins text-sm font-semibold text-white px-4 py-3 align-top">{r.feature}</td>
                      <td className="font-poppins text-sm text-white/80 px-4 py-3 align-top">{r.sade}</td>
                      <td className="font-poppins text-sm text-white/80 px-4 py-3 align-top">{r.maha}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="py-12 px-6" style={{ background: CREAM }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="font-kalam text-3xl md:text-4xl mb-8 text-center" style={{ color: DARK_BG }}>Five Remedies for Saturn Mahadasha</h2>
            <ol className="space-y-5">
              {REMEDIES.map((r) => (
                <li key={r.num} className="flex gap-4 items-start bg-white rounded-2xl p-5 shadow-sm" style={{ borderLeft: `4px solid ${ACCENT}` }}>
                  <span className="font-caveat text-4xl flex-shrink-0" style={{ color: ACCENT, minWidth: '2.5rem' }}>{r.num}</span>
                  <div>
                    <p className="font-poppins font-semibold text-[#3d2810] text-base mb-1">{r.main}</p>
                    <p className="font-poppins text-sm text-[#5C4A2A] leading-relaxed m-0">{r.sub}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="py-12 px-6 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-kalam text-3xl md:text-4xl text-center mb-2" style={{ color: DARK_BG }}>Frequently Asked Questions</h2>
            <p className="font-poppins text-sm text-[#5C4A2A] text-center mb-8">Your top questions about Saturn Mahadasha</p>
            <div className="space-y-3">
              {FAQ_DATA.map((faq, i) => {
                const open = openFaq === i;
                const Icon = faq.icon;
                return (
                  <div key={faq.q} className="rounded-2xl shadow-sm overflow-hidden" style={{ background: CARD_BG, borderLeft: open ? `4px solid ${ACCENT}` : '4px solid transparent' }}>
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
            <h2 className="font-caveat text-3xl md:text-5xl mb-4" style={{ color: DARK_BG }}>Get Your Saturn Mahadasha Report</h2>
            <p className="font-poppins text-base text-[#3d2810] mb-8 leading-relaxed">
              Saurabh Jain at Soul Infinity Astro Solutions reads your Saturn placement, Antardasha timeline, and current planetary aspects to show exactly how this 19 year phase will unfold in your specific chart.
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
                to="/planets/saturn"
                className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-poppins font-semibold transition"
                style={{ border: `2px solid ${DARK_BG}`, color: DARK_BG }}
              >
                <Globe className="w-5 h-5" aria-hidden="true" />
                Read Saturn Complete Guide
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
