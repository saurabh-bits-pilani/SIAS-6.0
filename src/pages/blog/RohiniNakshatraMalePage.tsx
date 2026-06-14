import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ArrowRight, ChevronDown, CheckCircle, AlertTriangle, Heart, Sparkles, Star, Music,
  Camera, Film, Utensils, ShoppingBag, HelpCircle, Calendar, Gem, User, Globe, Briefcase,
} from 'lucide-react';

const R2 = 'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev';
const HERO_IMAGE = `${R2}/Blog/rohini-nakshatra-male/hero-banner.webp`;
const ROHINI_HERO = `${R2}/Nakshatra/Rohini/hero-banner-rohini.webp`;

const ACCENT = '#D4A11E';
const DARK_BG = '#2A1810';
const CREAM = '#FAF6EC';
const CARD_BG = '#FFF9ED';

const PAGE_URL = 'https://www.soulinfinity.space/blog/rohini-nakshatra-male';
const PAGE_TITLE = 'Rohini Nakshatra Male: Personality, Career and Compatibility | Soul Infinity';
const PAGE_DESC = 'Rohini nakshatra male personality, career strengths, romantic nature, and compatibility explained by K.N. Rao Institute trained astrologer Saurabh Jain.';

const STRENGTHS: readonly string[] = [
  'Well-groomed, naturally stylish, aesthetically refined',
  'Warm manner that makes others feel genuinely valued',
  'Remembers details about people and relationships',
  'Creatively ambitious with strong financial instincts',
  'Devoted and tender in committed relationships',
  'Excellent in roles requiring genuine human connection',
];

const SHADOWS: readonly string[] = [
  'Possessiveness that can cross into control',
  'Over-indulgence in food, comfort, and pleasure',
  'Difficulty with austerity and necessary discipline',
  'Avoiding conflict rather than addressing it directly',
];

interface MarriageCard { title: string; body: string; }
const MARRIAGE_CARDS: readonly MarriageCard[] = [
  { title: 'How He Loves', body: 'He does not pursue relationships casually. When he commits, he commits deeply. His romantic nature is genuinely tender.' },
  { title: 'What He Needs', body: 'A partner who values beauty and depth equally, who holds steady through his emotional intensity.' },
  { title: 'The Shadow', body: 'The possessiveness of Rohini mythology. He can become jealous or unable to allow his partner the freedom they need.' },
];

interface CareerItem { icon: typeof Music; label: string; }
const CAREER_ITEMS: readonly CareerItem[] = [
  { icon: Music, label: 'Music and Arts' },
  { icon: Camera, label: 'Photography' },
  { icon: Film, label: 'Filmmaking' },
  { icon: Utensils, label: 'Culinary Arts' },
  { icon: ShoppingBag, label: 'Luxury Retail' },
  { icon: Heart, label: 'Counseling' },
];

interface Remedy { num: string; main: string; sub: string; }
const REMEDIES: readonly Remedy[] = [
  { num: '01', main: 'Worship Lord Chandra on Mondays', sub: 'Offer white flowers and milk to the Moon on Purnima and every Monday.' },
  { num: '02', main: 'Wear Pearl (Moti) after astrological consultation', sub: 'Set in silver, worn on the little finger on Monday morning after puja.' },
  { num: '03', main: 'Chant Chandra Beej Mantra 108 times', sub: 'Om Shraam Shreem Shraum Sah Chandramasay Namah, on a pearl or white sphatik mala.' },
  { num: '04', main: 'Practice non-attachment in close relationships', sub: 'The deepest remedy for Rohini: learning to love freely rather than possessively.' },
];

interface Faq { q: string; a: string; icon: typeof HelpCircle; }
const FAQ_DATA: readonly Faq[] = [
  { q: 'What is the personality of a Rohini nakshatra male?', icon: HelpCircle,
    a: 'A Rohini nakshatra male is naturally charming, artistic, emotionally deep, and possesses a magnetic quality. He tends to be pleasure-loving, aesthetically refined, and strongly oriented toward beauty. Classical texts describe him as naturally attractive and well-spoken.' },
  { q: 'Is Rohini nakshatra male romantic or possessive?', icon: Heart,
    a: 'Both. The rohini nakshatra male is among the most romantically expressive placements, capable of deep devotion and extraordinary tenderness. The shadow is possessiveness, mirroring the Chandra mythology where the Moon spent all his time with Rohini.' },
  { q: 'Which careers are best for Rohini nakshatra males?', icon: Briefcase,
    a: 'Rohini nakshatra males excel in careers where aesthetic refinement and relationship skills matter. Music, filmmaking, photography, design, culinary arts, luxury retail, hospitality, and counseling are all strong fits.' },
  { q: 'What challenges do Rohini nakshatra males face?', icon: AlertTriangle,
    a: 'The primary challenges are possessiveness in relationships, over-attachment to comfort and pleasure, and difficulty with necessary discipline. Career challenges often arise from avoiding conflict rather than addressing it directly.' },
  { q: 'Which nakshatra females are most compatible with Rohini males?', icon: User,
    a: 'Mrigashira, Hasta, and Uttaraphalguni nakshatra females tend to be highly compatible with Rohini males in classical Vedic matching. The assessment should always consider the full birth chart, not just Moon nakshatra.' },
];

const SCHEMAS = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Rohini Nakshatra Male: Personality, Career and Compatibility',
    description: PAGE_DESC,
    author: { '@type': 'Person', name: 'Saurabh Jain', url: 'https://www.soulinfinity.space/cosmic-guide' },
    publisher: { '@type': 'Organization', name: 'Soul Infinity Astro Solutions' },
    datePublished: '2026-06-17',
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
      { '@type': 'ListItem', position: 3, name: 'Rohini Nakshatra Male', item: PAGE_URL },
    ],
  },
];

export default function RohiniNakshatraMalePage() {
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
            alt="Rohini nakshatra male Krishna playing flute under dark cosmic nakshatra wheel"
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
              <span>Rohini Nakshatra Male</span>
            </nav>
            <span className="inline-block self-start text-xs md:text-sm tracking-widest uppercase font-poppins font-semibold rounded-full px-3 py-1 mb-4" style={{ background: ACCENT, color: '#1c1917' }}>Vedic Astrology</span>
            <h1 className="font-caveat text-5xl md:text-7xl text-white leading-tight mb-3">Rohini Nakshatra Male</h1>
            <p className="font-poppins text-base md:text-xl text-white/85 mb-4">Personality, Career and Compatibility in Vedic Astrology</p>
            <p className="font-poppins text-xs md:text-sm text-white/70">
              <Calendar className="inline w-3 h-3 mr-1" aria-hidden="true" />Jun 17, 2026
              <span className="mx-2">·</span>7 min read
              <span className="mx-2">·</span>By Saurabh Jain, K.N. Rao Institute
            </p>
          </div>
        </section>

        <section className="py-10 px-6" style={{ background: CREAM }}>
          <div className="max-w-3xl mx-auto rounded-2xl bg-white p-6 md:p-8 shadow-sm" style={{ borderLeft: `5px solid ${ACCENT}` }}>
            <h2 className="font-kalam text-xl md:text-2xl mb-3" style={{ color: ACCENT }}>The Short Answer</h2>
            <p className="font-poppins text-base text-[#3d2810] leading-relaxed m-0">
              The Rohini nakshatra male is charming, creative, emotionally deep, and naturally magnetic. He is among the most romantically expressive nakshatra placements. His shadow is possessiveness. Moon in Rohini from 10 to 23 degrees 20 minutes of Taurus.
            </p>
          </div>
        </section>

        <section className="py-12 px-6" style={{ background: CREAM }}>
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <h2 className="font-kalam text-3xl md:text-4xl" style={{ color: DARK_BG }}>Rohini Nakshatra Male Personality</h2>
              <p className="font-poppins text-base text-[#3d2810] leading-relaxed">
                The rohini nakshatra male personality is defined by charm, creativity, and emotional depth. Moon in Rohini gives a native who appreciates beauty, creates comfort wherever he goes, and possesses a natural ease in social situations.
              </p>
              <p className="font-poppins text-base text-[#3d2810] leading-relaxed">
                He tends to be well-groomed, attentive to his appearance, and naturally stylish. His home reflects his aesthetic sensibility. He is the person whose house people want to spend time in.
              </p>
              <p className="font-poppins text-base text-[#3d2810] leading-relaxed">
                Emotionally, the Rohini Moon male runs deep. His feelings are genuine and intense, though he may not always express them openly. He prefers to show love through acts of care.
              </p>
            </div>
            <aside className="rounded-2xl p-6 self-start" style={{ background: CARD_BG, border: `2px solid ${ACCENT}`, borderLeftWidth: '6px' }}>
              <div className="flex items-center gap-2 mb-3" style={{ color: ACCENT }}>
                <Sparkles className="w-5 h-5" aria-hidden="true" />
                <span className="font-poppins text-xs uppercase tracking-widest font-semibold">Soul Infinity Insight</span>
              </div>
              <p className="font-kalam text-lg text-[#3d2810] italic leading-relaxed m-0">
                He is not naturally confrontational. He shows love through acts of care, beautiful experiences, and being reliably present.
              </p>
              <p className="font-poppins text-sm font-semibold text-[#5C4A2A] mt-3 mb-0">Saurabh Jain, K.N. Rao Institute</p>
            </aside>
          </div>
        </section>

        <section className="py-12 px-6" style={{ background: CREAM }}>
          <div className="max-w-5xl mx-auto">
            <h2 className="font-kalam text-3xl md:text-4xl mb-8 text-center" style={{ color: DARK_BG }}>Strengths and Shadow Patterns</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 flex items-center gap-3" style={{ background: 'linear-gradient(135deg, #14532d, #16a34a)' }}>
                  <CheckCircle className="w-7 h-7 text-white" aria-hidden="true" />
                  <h3 className="font-kalam text-xl text-white m-0">Natural Gifts of Rohini Male</h3>
                </div>
                <ul className="divide-y divide-green-50">
                  {STRENGTHS.map((s) => (
                    <li key={s} className="flex items-start gap-3 px-5 py-3 font-poppins text-sm text-[#3d2810]">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-green-700" aria-hidden="true" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 flex items-center gap-3" style={{ background: 'linear-gradient(135deg, #78350f, #b45309)' }}>
                  <AlertTriangle className="w-7 h-7 text-white" aria-hidden="true" />
                  <h3 className="font-kalam text-xl text-white m-0">Challenges to Navigate</h3>
                </div>
                <ul className="divide-y divide-amber-50">
                  {SHADOWS.map((s) => (
                    <li key={s} className="flex items-start gap-3 px-5 py-3 font-poppins text-sm text-[#3d2810]">
                      <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-700" aria-hidden="true" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-6" style={{ background: DARK_BG }}>
          <div className="max-w-6xl mx-auto">
            <h2 className="font-kalam text-3xl md:text-5xl text-center mb-10" style={{ color: ACCENT }}>Rohini Male in Love and Marriage</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {MARRIAGE_CARDS.map((card) => (
                <div key={card.title} className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.05)', borderLeft: `4px solid ${ACCENT}` }}>
                  <Heart className="w-6 h-6 mb-3" style={{ color: ACCENT }} aria-hidden="true" />
                  <h3 className="font-kalam text-xl text-white mb-2">{card.title}</h3>
                  <p className="font-poppins text-sm text-white/75 leading-relaxed m-0">{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 px-6" style={{ background: CREAM }}>
          <div className="max-w-5xl mx-auto">
            <h2 className="font-kalam text-3xl md:text-4xl mb-4 text-center" style={{ color: DARK_BG }}>Career and Finances</h2>
            <p className="font-poppins text-base text-[#5C4A2A] text-center max-w-3xl mx-auto mb-8 leading-relaxed">
              The Rohini male career is best suited to environments where creativity, aesthetics, and relationships matter more than raw competition.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {CAREER_ITEMS.map((c) => {
                const Icon = c.icon;
                return (
                  <div key={c.label} className="bg-white rounded-xl p-4 text-center shadow-sm" style={{ border: `1px solid ${ACCENT}33` }}>
                    <div className="w-10 h-10 mx-auto rounded-full flex items-center justify-center mb-2" style={{ background: '#FEF3C7', color: ACCENT }}>
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <p className="font-poppins text-xs md:text-sm font-semibold text-[#3d2810] m-0">{c.label}</p>
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
            <h2 className="font-kalam text-3xl md:text-4xl mb-6" style={{ color: ACCENT }}>Remedies for Rohini Nakshatra Males</h2>
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
            <p className="font-poppins text-sm text-[#5C4A2A] text-center mb-8">Your top questions about Rohini nakshatra males</p>
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
            <h2 className="font-caveat text-3xl md:text-5xl mb-4" style={{ color: DARK_BG }}>Get a Personal Rohini Chart Reading</h2>
            <p className="font-poppins text-base text-[#3d2810] mb-8 leading-relaxed">
              Saurabh Jain at Soul Infinity Astro Solutions reads your Moon placement, nakshatra pada, dasha timing, and planetary aspects to show exactly how Rohini expresses in your specific chart.
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
