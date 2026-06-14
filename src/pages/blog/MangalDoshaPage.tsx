import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ArrowRight, ChevronDown, Sparkles, HelpCircle, Calendar, Gem, Globe,
  Sun, Star, Shield, Flame, Heart, AlertTriangle, Users, Crown, Compass, Wand,
} from 'lucide-react';

const R2 = 'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev';
const HERO_IMAGE = `${R2}/Blog/mangal-dosha-cancellation-rules/hero-banner.webp`;
const REMEDIES_BG = `${R2}/Nakshatra/Rohini/vedic-remedies-bg-rohini.webp`;

const ACCENT = '#D4A11E';
const DARK_BG = '#2A1810';
const CREAM = '#FAF6EC';
const CARD_BG = '#FFF9ED';

const PAGE_URL = 'https://www.soulinfinity.space/blog/mangal-dosha-cancellation-rules';
const PAGE_TITLE = 'Mangal Dosha Cancellation: 9 Classical Rules That Nullify Mars Dosha | Soul Infinity';
const PAGE_DESC = 'Mangal Dosha cancellation: 9 classical rules that nullify Mars dosha in marriage compatibility, plus the truth about Mangal Dosha after age 28. By Saurabh Jain.';

interface Rule { num: string; title: string; body: string; icon: typeof Sun; }
const RULES: readonly Rule[] = [
  { num: '01', icon: Sun, title: 'Mars in own sign (Aries or Scorpio)', body: 'When Mars is in its own rashi, energy expresses through native dignity rather than as a disturbing influence. The dosha is significantly reduced.' },
  { num: '02', icon: Crown, title: 'Mars exalted in Capricorn', body: 'Mars at its highest dignity. The energy is disciplined and constructive rather than impulsive. Classical texts treat this as a strong cancellation.' },
  { num: '03', icon: Heart, title: 'Mars in friendly signs (Cancer, Leo, Pisces)', body: 'When Mars sits in friendly signs ruled by Moon, Sun, or Jupiter, its energy is softened and integrated by the friendly host planet.' },
  { num: '04', icon: Users, title: 'Mutual Mangal Dosha in both charts', body: 'When both partners have Mars in dosha-causing houses, the energies cancel each other. Friction does not get directed at one side only.' },
  { num: '05', icon: Star, title: 'Jupiter aspecting Mars', body: 'Jupiter is the great softener of Mars heat. When Jupiter aspect falls on Mars, the dosha is significantly neutralized by Jupiter benefic energy.' },
  { num: '06', icon: Sparkles, title: 'Venus aspecting Mars', body: 'Venus aspect on Mars channels Mars energy into relationship support. Venus is the karaka of marriage and softens Mars in the partnership context.' },
  { num: '07', icon: Compass, title: 'Mars with a benefic planet', body: 'Conjunction with Jupiter, Venus, or a well-placed Mercury contains Mars combative tendencies. The benefic absorbs and redirects the heat.' },
  { num: '08', icon: Shield, title: 'Strong ascendant lord', body: 'When the lord of the lagna is well-placed in a kendra and dignified, the chart as a whole absorbs the dosha without significant marriage trouble.' },
  { num: '09', icon: Wand, title: 'Mars in friendly navamsha', body: 'When the navamsha (D9) placement of Mars is in a friendly sign, the marriage chart support softens the rashi-level dosha. D9 always informs marriage.' },
];

interface Remedy { num: string; main: string; sub: string; }
const REMEDIES: readonly Remedy[] = [
  { num: '01', main: 'Chant Mangala Beej Mantra 108 times', sub: 'Om Kraam Kreem Kraum Sah Bhaumay Namah on a red coral mala, Tuesday mornings, facing south.' },
  { num: '02', main: 'Tuesday observances', sub: 'Fasting (or modified fasting with no salt), wearing red, visiting a Hanuman or Subramanya temple.' },
  { num: '03', main: 'Recite Hanuman Chalisa', sub: 'Hanuman softens Mars. Daily Chalisa recitation, particularly on Tuesdays, is universally recommended.' },
  { num: '04', main: 'Donate red items on Tuesdays', sub: 'Red lentils (masoor), red cloth, jaggery, copper utensils, or red coral to those in need.' },
  { num: '05', main: 'Wear Red Coral after consultation', sub: 'Moonga in copper, ring finger of the right hand, Tuesday morning. Only after careful chart-based recommendation by a trained Jyotishi.' },
];

interface Faq { q: string; a: string; icon: typeof HelpCircle; }
const FAQ_DATA: readonly Faq[] = [
  { q: 'Is Mangal Dosha automatically cancelled after age 28?', icon: AlertTriangle,
    a: 'No, this is a popular myth. Mangal Dosha is not automatically cancelled by age. The dosha is a structural feature of the chart, not a time-based condition. Mars-driven patterns may soften with age as the native develops self-regulation, but the structural dosha remains. A 35-year-old Manglik is still a Manglik. The right approach is full chart assessment, not age-based shortcuts.' },
  { q: 'What are the 9 rules that cancel Mangal Dosha?', icon: HelpCircle,
    a: 'Mars in own sign or exaltation, Mars in friendly signs, mutual Mangal Dosha in both charts, Jupiter or Venus aspecting Mars, Mars with a benefic planet, strong ascendant lord, and Mars in friendly navamsha. The full list and how each applies to your chart is detailed in this article and confirmed through consultation.' },
  { q: 'Can a Manglik marry a non-Manglik?', icon: Heart,
    a: 'Yes, when the dosha is cancelled by classical rules or balanced by strong factors in both charts. Marriage is never decided by Mangal Dosha alone. The overall kundli matching, the 7th house condition, dasha sequence, and divisional chart agreement matter more than the dosha label.' },
  { q: 'Does Mangal Dosha affect both husband and wife?', icon: Users,
    a: 'Mangal Dosha is assessed in each chart separately. When only one partner has the dosha, Mars heat may bring conflict or premature separation. When both partners have Mangal Dosha, the doshas mutually cancel by classical rule.' },
  { q: 'Which placement cancels Mangal Dosha most effectively?', icon: Shield,
    a: 'Mars in own sign (Aries or Scorpio) or in exaltation (Capricorn) is the strongest cancellation. Jupiter aspect on Mars is also a powerful counterweight because Jupiter softens Mars aggressive heat. The exact placement determines whether the dosha is significantly active or already neutralized.' },
];

const SCHEMAS = [
  {
    '@context': 'https://schema.org', '@type': 'Article',
    headline: 'Mangal Dosha Cancellation: 9 Classical Rules That Nullify Mars Dosha',
    description: PAGE_DESC,
    author: { '@type': 'Person', name: 'Saurabh Jain', url: 'https://www.soulinfinity.space/cosmic-guide' },
    publisher: { '@type': 'Organization', name: 'Soul Infinity Astro Solutions' },
    datePublished: '2026-06-19', image: HERO_IMAGE, url: PAGE_URL,
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
      { '@type': 'ListItem', position: 3, name: 'Mangal Dosha Cancellation', item: PAGE_URL },
    ],
  },
];

export default function MangalDoshaPage() {
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
          <img src={HERO_IMAGE} alt="Mangal Dosha cancellation rules Mars dosha Vedic astrology marriage" className="absolute inset-0 w-full h-full object-cover" width={1600} height={600} loading="eager" fetchpriority="high" />
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 max-w-5xl mx-auto px-6 h-full flex flex-col justify-center text-white">
            <nav aria-label="Breadcrumb" className="font-poppins text-xs md:text-sm text-white/70 mb-4">
              <Link to="/" className="hover:text-amber-300">Home</Link>
              <span className="mx-2">›</span>
              <Link to="/blog" className="hover:text-amber-300">Blog</Link>
              <span className="mx-2">›</span>
              <span>Mangal Dosha Cancellation</span>
            </nav>
            <span className="inline-block self-start text-xs md:text-sm tracking-widest uppercase font-poppins font-semibold rounded-full px-3 py-1 mb-4" style={{ background: ACCENT, color: '#1c1917' }}>Vedic Astrology</span>
            <h1 className="font-caveat text-5xl md:text-7xl text-white leading-tight mb-3">Mangal Dosha Cancellation</h1>
            <p className="font-poppins text-base md:text-xl text-white/85 mb-4">9 Classical Rules That Nullify Mars Dosha</p>
            <p className="font-poppins text-xs md:text-sm text-white/70">
              <Calendar className="inline w-3 h-3 mr-1" aria-hidden="true" />Jun 19, 2026
              <span className="mx-2">·</span>8 min read
              <span className="mx-2">·</span>By Saurabh Jain, K.N. Rao Institute
            </p>
          </div>
        </section>

        <section className="py-10 px-6" style={{ background: CREAM }}>
          <div className="max-w-3xl mx-auto rounded-2xl bg-white p-6 md:p-8 shadow-sm" style={{ borderLeft: `5px solid ${ACCENT}` }}>
            <h2 className="font-kalam text-xl md:text-2xl mb-3" style={{ color: ACCENT }}>The Short Answer</h2>
            <p className="font-poppins text-base text-[#3d2810] leading-relaxed m-0">
              Yes, Mangal Dosha can be cancelled. Classical Vedic astrology lists 9 conditions under which Mars dosha is neutralized. Most charts labeled Manglik actually fall under one or more of these exceptions when read carefully. The dosha is structural, not age-based.
            </p>
          </div>
        </section>

        <section className="py-12 px-6" style={{ background: CREAM }}>
          <div className="max-w-5xl mx-auto space-y-4">
            <h2 className="font-kalam text-3xl md:text-4xl" style={{ color: DARK_BG }}>What is Mangal Dosha?</h2>
            <p className="font-poppins text-base text-[#3d2810] leading-relaxed">
              Mangal Dosha, also called Kuja Dosha or Manglik Dosha, refers to Mars placed in the 1st, 2nd, 4th, 7th, 8th, or 12th house. Mars represents heat, conflict, blood, and accidents. When placed in these houses related to self, family, home, marriage, or losses, classical texts caution that Mars energy may create friction in marriage.
            </p>
            <p className="font-poppins text-base text-[#3d2810] leading-relaxed">
              The dosha is not a curse. It is a description of an energy pattern that requires understanding and management. Critically, classical texts describe nine clear conditions under which the dosha is cancelled or neutralized.
            </p>
          </div>
        </section>

        <section className="py-16 px-6" style={{ background: DARK_BG }}>
          <div className="max-w-6xl mx-auto">
            <h2 className="font-kalam text-3xl md:text-5xl text-center mb-2" style={{ color: ACCENT }}>The 9 Cancellation Rules</h2>
            <p className="font-poppins text-sm text-center text-white/60 mb-10 uppercase tracking-widest">Classical conditions that nullify Mars dosha</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {RULES.map((r) => {
                const Icon = r.icon;
                return (
                  <div key={r.num} className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.05)', borderTop: `3px solid ${ACCENT}` }}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-caveat text-4xl" style={{ color: ACCENT }}>{r.num}</span>
                      <Icon className="w-6 h-6" style={{ color: ACCENT }} aria-hidden="true" />
                    </div>
                    <h3 className="font-kalam text-lg text-white mb-2">{r.title}</h3>
                    <p className="font-poppins text-sm text-white/70 leading-relaxed m-0">{r.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-12 px-6" style={{ background: CREAM }}>
          <div className="max-w-4xl mx-auto rounded-2xl p-6 md:p-8 shadow-sm" style={{ background: '#FEE2E2', border: '2px solid #B91C1C' }}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#FFFFFF', color: '#B91C1C' }}>
                <AlertTriangle className="w-7 h-7" aria-hidden="true" />
              </div>
              <div>
                <p className="font-poppins text-xs uppercase tracking-widest font-semibold mb-1" style={{ color: '#B91C1C' }}>Myth-busting</p>
                <h2 className="font-kalam text-2xl md:text-3xl mb-3" style={{ color: '#7F1D1D' }}>Mangal Dosha Does NOT Cancel at Age 28</h2>
                <p className="font-poppins text-base text-[#7F1D1D] leading-relaxed m-0">
                  The popular belief that Mangal Dosha automatically vanishes after age 28 is not found in classical texts. It appears to have emerged from folk understanding of Saturn second return cycle. What is true: Mars-driven patterns generally soften with age. But the dosha itself, as a structural feature of the chart, does not disappear with time. Assess the chart, not the calendar.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 px-6 text-center" style={{ background: CREAM }}>
          <div className="max-w-3xl mx-auto rounded-2xl p-8 md:p-10" style={{ background: CARD_BG, border: `2px solid ${ACCENT}` }}>
            <Flame className="w-10 h-10 mx-auto mb-4" style={{ color: ACCENT }} aria-hidden="true" />
            <p className="font-poppins text-xs uppercase tracking-widest font-semibold mb-2" style={{ color: ACCENT }}>Mangal Beej Mantra</p>
            <div className="font-devanagari text-3xl md:text-4xl mb-4 leading-relaxed" style={{ color: DARK_BG }} lang="sa">
              ॐ क्रां क्रीं क्रौं सः भौमाय नमः
            </div>
            <p className="font-poppins text-base italic text-[#5C4A2A] mb-1">Om Kraam Kreem Kraum Sah Bhaumay Namah</p>
            <p className="font-poppins text-sm text-[#5C4A2A]/70">Salutations to Mangala (Mars). Chant 108 times on Tuesday mornings.</p>
          </div>
        </section>

        <section className="relative py-16 px-6">
          <img src={REMEDIES_BG} alt="" className="absolute inset-0 w-full h-full object-cover" aria-hidden="true" loading="lazy" />
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(42, 24, 16, 0.85)' }} />
          <div className="relative z-10 max-w-3xl ml-auto pr-0 md:pr-6">
            <h2 className="font-kalam text-3xl md:text-4xl mb-6" style={{ color: ACCENT }}>Remedies When Dosha is Active</h2>
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
            <p className="font-poppins text-sm text-[#5C4A2A] text-center mb-8">Your top questions about Mangal Dosha</p>
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
            <h2 className="font-caveat text-3xl md:text-5xl mb-4" style={{ color: DARK_BG }}>Verify Your Mangal Dosha Status</h2>
            <p className="font-poppins text-base text-[#3d2810] mb-8 leading-relaxed">
              Saurabh Jain reads your chart and your partner chart to identify whether Mangal Dosha is active or cancelled, and provides chart-specific remedies if needed.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href="https://wa.me/919079053840" className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-poppins font-semibold text-white shadow-md hover:shadow-lg transition" style={{ background: DARK_BG }}>
                Book on WhatsApp
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </a>
              <Link to="/dosha/mangal" className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-poppins font-semibold transition" style={{ border: `2px solid ${DARK_BG}`, color: DARK_BG }}>
                <Globe className="w-5 h-5" aria-hidden="true" />
                Mangal Dosha Service
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
