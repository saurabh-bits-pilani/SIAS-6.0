import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ArrowRight, ChevronDown, CheckCircle, AlertTriangle, Heart, Sparkles, Star, Calendar, Gem, Globe,
  HelpCircle, Brain, Users,
} from 'lucide-react';

const R2 = 'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev';
const HERO_IMAGE = `${R2}/Blog/rohini-nakshatra-compatibility/hero-banner.webp`;

const ACCENT = '#D4A11E';
const DARK_BG = '#2A1810';
const CREAM = '#FAF6EC';
const CARD_BG = '#FFF9ED';

const PAGE_URL = 'https://www.soulinfinity.space/blog/rohini-nakshatra-compatibility';
const PAGE_TITLE = 'Rohini Nakshatra Compatibility: Best and Worst Matches | Soul Infinity';
const PAGE_DESC = 'Rohini nakshatra compatibility for marriage: best matches Mrigashira, Uttaraphalguni, Hasta and challenging matches Ashlesha, Jyeshtha, Vishakha. Eight kootas explained by K.N. Rao Institute trained astrologer Saurabh Jain.';

interface Match { nakshatra: string; reason: string; body: string; }
const BEST_MATCHES: readonly Match[] = [
  { nakshatra: 'Mrigashira', reason: 'Same gana, friendly nadi', body: 'Mrigashira shares the seeking and sensory nature of Rohini. The match brings emotional comfort, mutual artistic interests, and a steady domestic rhythm.' },
  { nakshatra: 'Uttaraphalguni', reason: 'High koota score', body: 'Solar steadiness meets lunar warmth. Uttaraphalguni offers structure and reliability that Rohini craves, while Rohini brings beauty and emotional life to the union.' },
  { nakshatra: 'Hasta', reason: 'Skilled, devoted partner', body: 'Hasta is craft, service, and dexterity. A Hasta partner anchors Rohini through gentle care and practical support, creating one of the most enduring matches.' },
];

const CHALLENGING: readonly Match[] = [
  { nakshatra: 'Ashlesha', reason: 'Opposing nadi', body: 'Both are deeply emotional but the wavelengths clash. Ashlesha cunning and Rohini possessiveness can create cycles of suspicion and emotional withdrawal.' },
  { nakshatra: 'Jyeshtha', reason: 'Vasya and graha maitri conflict', body: 'Jyeshtha ambition and intensity overpower Rohini sensitivity. Power struggles and pride conflicts are common unless both partners do active self awareness work.' },
  { nakshatra: 'Vishakha', reason: 'Goal driven friction', body: 'Vishakha is goal hungry and outward facing. Rohini wants presence, beauty, and emotional depth. The two can drift unless deliberate emotional intimacy is built.' },
];

interface Koota { num: string; name: string; meaning: string; weight: string; body: string; }
const KOOTAS: readonly Koota[] = [
  { num: '01', name: 'Varna', meaning: 'Spiritual development', weight: '1 point', body: 'Compares the spiritual orientation of both partners. Equal or higher groom varna is preferred classically.' },
  { num: '02', name: 'Vashya', meaning: 'Power dynamics', weight: '2 points', body: 'Measures attraction and mutual influence. Predicts who naturally accommodates whom in the relationship.' },
  { num: '03', name: 'Tara', meaning: 'Health and longevity', weight: '3 points', body: 'Compares birth nakshatra positions for auspicious resonance. A core indicator of marital well being.' },
  { num: '04', name: 'Yoni', meaning: 'Sexual compatibility', weight: '4 points', body: 'Animal symbol of each nakshatra. Rohini Yoni is Serpent. Predicts intimacy harmony and physical connection.' },
  { num: '05', name: 'Graha Maitri', meaning: 'Mental compatibility', weight: '5 points', body: 'Friendship between Moon sign lords of both partners. The strongest indicator of psychological resonance.' },
  { num: '06', name: 'Gana', meaning: 'Temperament', weight: '6 points', body: 'Three groups: deva, manushya, rakshasa. Rohini is Manushya gana. Mixed gana matches need extra care.' },
  { num: '07', name: 'Bhakoot', meaning: 'Family welfare', weight: '7 points', body: 'Relative positions of Moon signs. Certain combinations indicate financial and family challenges. Critical for shared prosperity.' },
  { num: '08', name: 'Nadi', meaning: 'Genetic compatibility', weight: '8 points', body: 'Adi, Madhya, Antya. Same nadi marriages are traditionally avoided due to health and progeny concerns.' },
];

interface Faq { q: string; a: string; icon: typeof HelpCircle; }
const FAQ_DATA: readonly Faq[] = [
  { q: 'Which nakshatra is best for Rohini in marriage?', icon: Heart,
    a: 'The most compatible nakshatras for Rohini in classical analysis are Mrigashira, Uttaraphalguni, and Hasta. These matches typically score high on the Ashtakoota gun milan and bring emotional steadiness, mutual support, and lasting devotion.' },
  { q: 'Which nakshatra should Rohini avoid in marriage?', icon: AlertTriangle,
    a: 'Ashlesha, Jyeshtha, and Vishakha tend to create the most karmic friction with Rohini. These matches are not impossible but require active emotional work, conscious communication, and ideally further chart analysis before fixing the marriage.' },
  { q: 'How many kootas must match for a good marriage?', icon: Brain,
    a: 'Out of 36 total points in the Ashtakoota system, a score of 18 or higher is considered acceptable, 24 plus is good, and 28 plus is excellent. Anything below 18 is traditionally discouraged. Bhakoot and Nadi koota matches are also checked separately for blocking factors.' },
  { q: 'Is gana milan important for Rohini compatibility?', icon: Users,
    a: 'Rohini belongs to Manushya gana. A Manushya to Manushya match scores full points. Manushya to Deva matches are also good. Manushya to Rakshasa matches need extra scrutiny as the value systems and emotional rhythms differ significantly.' },
  { q: 'Can Rohini and Ashwini marry?', icon: Star,
    a: 'Rohini and Ashwini are not a traditional first choice match. Ashwini is fast moving and pioneering while Rohini is steady and sensory. The match can work when both partners consciously honor their differences and the larger chart compatibility is strong.' },
];

const SCHEMAS = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Rohini Nakshatra Compatibility: Best and Worst Matches for Marriage',
    description: PAGE_DESC,
    author: { '@type': 'Person', name: 'Saurabh Jain', url: 'https://www.soulinfinity.space/cosmic-guide' },
    publisher: { '@type': 'Organization', name: 'Soul Infinity Astro Solutions' },
    datePublished: '2026-06-26',
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
      { '@type': 'ListItem', position: 3, name: 'Rohini Nakshatra Compatibility', item: PAGE_URL },
    ],
  },
];

export default function RohiniCompatibilityPage() {
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
            alt="Rohini nakshatra compatibility and marriage matching by nakshatra"
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
              <span>Rohini Nakshatra Compatibility</span>
            </nav>
            <span className="inline-block self-start text-xs md:text-sm tracking-widest uppercase font-poppins font-semibold rounded-full px-3 py-1 mb-4" style={{ background: ACCENT, color: '#1c1917' }}>Vedic Astrology</span>
            <h1 className="font-caveat text-5xl md:text-7xl text-white leading-tight mb-3">Rohini Nakshatra Compatibility</h1>
            <p className="font-poppins text-base md:text-xl text-white/85 mb-4">Best and Worst Matches for Marriage</p>
            <p className="font-poppins text-xs md:text-sm text-white/70">
              <Calendar className="inline w-3 h-3 mr-1" aria-hidden="true" />Jun 26, 2026
              <span className="mx-2">·</span>8 min read
              <span className="mx-2">·</span>By Saurabh Jain, K.N. Rao Institute
            </p>
          </div>
        </section>

        <section className="py-10 px-6" style={{ background: CREAM }}>
          <div className="max-w-3xl mx-auto rounded-2xl bg-white p-6 md:p-8 shadow-sm" style={{ borderLeft: `5px solid ${ACCENT}` }}>
            <h2 className="font-kalam text-xl md:text-2xl mb-3" style={{ color: ACCENT }}>The Short Answer</h2>
            <p className="font-poppins text-base text-[#3d2810] leading-relaxed m-0">
              Rohini nakshatra is most compatible with Mrigashira, Uttaraphalguni, and Hasta in classical Ashtakoota compatibility. Ashlesha, Jyeshtha, and Vishakha are the most karmically friction prone matches. The complete chart, not just Moon nakshatra, decides the final result.
            </p>
          </div>
        </section>

        <section className="py-12 px-6" style={{ background: CREAM }}>
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <h2 className="font-kalam text-3xl md:text-4xl" style={{ color: DARK_BG }}>How Rohini Compatibility Works</h2>
              <p className="font-poppins text-base text-[#3d2810] leading-relaxed">
                In Vedic compatibility analysis the Moon nakshatra of both partners is compared through the Ashtakoota system, also called Gun Milan. Eight categories are evaluated, each carrying different weight, with a total of 36 possible points.
              </p>
              <p className="font-poppins text-base text-[#3d2810] leading-relaxed">
                For Rohini, the Moon lord is Chandra and the nakshatra deity is Brahma Prajapati, the creator. Rohini Moon natives carry the seeking, sensory, and creative qualities of Vrishabha rashi. Compatibility flows easily with nakshatras that honor steadiness, beauty, and emotional safety.
              </p>
              <p className="font-poppins text-base text-[#3d2810] leading-relaxed">
                A high koota score is encouraging but never the final answer. Lagna, seventh house, seventh house lord, Mars, and Venus placements all need to be read together before any marriage muhurta is fixed.
              </p>
            </div>
            <aside className="rounded-2xl p-6 self-start" style={{ background: CARD_BG, border: `2px solid ${ACCENT}`, borderLeftWidth: '6px' }}>
              <div className="flex items-center gap-2 mb-3" style={{ color: ACCENT }}>
                <Sparkles className="w-5 h-5" aria-hidden="true" />
                <span className="font-poppins text-xs uppercase tracking-widest font-semibold">Soul Infinity Insight</span>
              </div>
              <p className="font-kalam text-lg text-[#3d2810] italic leading-relaxed m-0">
                Koota score tells you the soil. Lagna and dasha tell you the season. A wise match needs both right soil and the right season.
              </p>
              <p className="font-poppins text-sm font-semibold text-[#5C4A2A] mt-3 mb-0">Saurabh Jain, K.N. Rao Institute</p>
            </aside>
          </div>
        </section>

        <section className="py-12 px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-kalam text-3xl md:text-4xl mb-8 text-center" style={{ color: DARK_BG }}>Best Matches for Rohini</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {BEST_MATCHES.map((m) => (
                <div key={m.nakshatra} className="rounded-2xl shadow-sm p-6 bg-white" style={{ border: '2px solid #16a34a', borderTopWidth: '6px' }}>
                  <CheckCircle className="w-8 h-8 mb-3 text-green-700" aria-hidden="true" />
                  <h3 className="font-kalam text-xl mb-1" style={{ color: DARK_BG }}>{m.nakshatra}</h3>
                  <p className="font-poppins text-xs uppercase tracking-widest font-semibold mb-3 text-green-800">{m.reason}</p>
                  <p className="font-poppins text-sm text-[#5C4A2A] leading-relaxed m-0">{m.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 px-6" style={{ background: CREAM }}>
          <div className="max-w-5xl mx-auto">
            <h2 className="font-kalam text-3xl md:text-4xl mb-8 text-center" style={{ color: DARK_BG }}>Challenging Matches for Rohini</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {CHALLENGING.map((m) => (
                <div key={m.nakshatra} className="rounded-2xl shadow-sm p-6 bg-white" style={{ border: '2px solid #dc2626', borderTopWidth: '6px' }}>
                  <AlertTriangle className="w-8 h-8 mb-3 text-red-700" aria-hidden="true" />
                  <h3 className="font-kalam text-xl mb-1" style={{ color: DARK_BG }}>{m.nakshatra}</h3>
                  <p className="font-poppins text-xs uppercase tracking-widest font-semibold mb-3 text-red-800">{m.reason}</p>
                  <p className="font-poppins text-sm text-[#5C4A2A] leading-relaxed m-0">{m.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-6" style={{ background: DARK_BG }}>
          <div className="max-w-6xl mx-auto">
            <h2 className="font-kalam text-3xl md:text-4xl text-center mb-3" style={{ color: ACCENT }}>The Eight Kootas of Ashtakoota</h2>
            <p className="font-poppins text-base text-white/75 text-center max-w-3xl mx-auto mb-8 leading-relaxed">
              Each koota measures a different layer of compatibility. The maximum score is 36. Nadi and Bhakoot are checked separately as blocking factors regardless of total score.
            </p>
            <div className="overflow-x-auto rounded-2xl" style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${ACCENT}55` }}>
              <table className="w-full text-left">
                <thead>
                  <tr style={{ background: 'rgba(212,161,30,0.15)' }}>
                    <th className="font-poppins text-xs uppercase tracking-widest font-semibold px-4 py-3" style={{ color: ACCENT }}>No</th>
                    <th className="font-poppins text-xs uppercase tracking-widest font-semibold px-4 py-3" style={{ color: ACCENT }}>Koota</th>
                    <th className="font-poppins text-xs uppercase tracking-widest font-semibold px-4 py-3" style={{ color: ACCENT }}>Meaning</th>
                    <th className="font-poppins text-xs uppercase tracking-widest font-semibold px-4 py-3" style={{ color: ACCENT }}>Points</th>
                    <th className="font-poppins text-xs uppercase tracking-widest font-semibold px-4 py-3" style={{ color: ACCENT }}>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {KOOTAS.map((k) => (
                    <tr key={k.num} className="border-t border-white/10">
                      <td className="font-caveat text-2xl px-4 py-3 align-top" style={{ color: ACCENT }}>{k.num}</td>
                      <td className="font-poppins text-sm font-semibold text-white px-4 py-3 align-top">{k.name}</td>
                      <td className="font-poppins text-sm text-white/80 px-4 py-3 align-top">{k.meaning}</td>
                      <td className="font-poppins text-sm text-white/80 px-4 py-3 align-top whitespace-nowrap">{k.weight}</td>
                      <td className="font-poppins text-sm text-white/70 px-4 py-3 align-top">{k.body}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="py-12 px-6" style={{ background: CREAM }}>
          <div className="max-w-3xl mx-auto">
            <h2 className="font-kalam text-3xl md:text-4xl text-center mb-2" style={{ color: DARK_BG }}>Frequently Asked Questions</h2>
            <p className="font-poppins text-sm text-[#5C4A2A] text-center mb-8">Your top questions about Rohini compatibility</p>
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
            <h2 className="font-caveat text-3xl md:text-5xl mb-4" style={{ color: DARK_BG }}>Get a Complete Compatibility Report</h2>
            <p className="font-poppins text-base text-[#3d2810] mb-8 leading-relaxed">
              Saurabh Jain at Soul Infinity Astro Solutions reads both charts together: Moon nakshatra koota score, Lagna match, seventh house, Venus, Mars, and current dasha overlap, before suggesting any marriage muhurta.
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
                Read Rohini Nakshatra Guide
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
