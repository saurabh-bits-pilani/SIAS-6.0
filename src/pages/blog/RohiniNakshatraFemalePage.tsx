import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ArrowRight, ChevronDown, CheckCircle, AlertTriangle, Heart, Sparkles, Star, Palette,
  Home, Music, Utensils, Briefcase, HelpCircle, Calendar, Gem, User, Globe,
} from 'lucide-react';

const R2 = 'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev';
const HERO_IMAGE = `${R2}/Blog/rohini-nakshatra-female/hero-banner.webp`;
const ROHINI_HERO = `${R2}/Nakshatra/Rohini/hero-banner-rohini.webp`;

const ACCENT = '#D4A11E';
const DARK_BG = '#2A1810';
const CREAM = '#FAF6EC';
const CARD_BG = '#FFF9ED';

const PAGE_URL = 'https://www.soulinfinity.space/blog/rohini-nakshatra-female';
const PAGE_TITLE = 'Rohini Nakshatra Female: Personality, Love and Career | Soul Infinity';
const PAGE_DESC = 'Rohini nakshatra female personality, marriage compatibility, career strengths and shadow patterns explained by K.N. Rao Institute trained astrologer Saurabh Jain.';

const STRENGTHS: readonly string[] = [
  'Magnetically beautiful and naturally charming',
  'Deeply loyal and emotionally affectionate',
  'Highly creative with strong artistic gifts',
  'Fertile imagination and aesthetic refinement',
  'Natural ability to attract abundance',
  'Nurturing, caring, and emotionally intuitive',
];

const SHADOWS: readonly string[] = [
  'Emotional possessiveness and jealousy',
  'Over-attachment to comfort and pleasure',
  'Mood swings during lunar cycle',
  'Indulgence under Saturn or Rahu affliction',
];

interface MarriageCard { title: string; body: string; }
const MARRIAGE_CARDS: readonly MarriageCard[] = [
  { title: 'How She Loves', body: 'She does not approach relationships casually. When she loves, she loves with her whole emotional body and expects the same in return.' },
  { title: 'What She Needs', body: 'Reassurance, beauty in her environment, and the experience of being deeply valued. When these are present she is among the most devoted partners.' },
  { title: 'The Shadow', body: 'Jealousy and possessiveness when Moon is aspected by Rahu, Ketu, or Saturn. Recognition of this pattern is the first step toward transformation.' },
];

interface CareerItem { icon: typeof Palette; label: string; }
const CAREER_ITEMS: readonly CareerItem[] = [
  { icon: Palette, label: 'Fashion Design' },
  { icon: Home, label: 'Interior Decoration' },
  { icon: Music, label: 'Music and Arts' },
  { icon: Utensils, label: 'Hospitality' },
  { icon: Heart, label: 'Counseling' },
  { icon: Briefcase, label: 'Culinary Arts' },
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
  { q: 'What is the personality of a Rohini nakshatra female?', icon: HelpCircle,
    a: 'A Rohini nakshatra female is naturally beautiful, emotionally deep, artistically gifted, and possesses a magnetic charm that draws people instinctively. She is deeply loyal and nurturing in relationships but can become intensely possessive when insecure.' },
  { q: 'Is Rohini nakshatra female lucky in marriage?', icon: Heart,
    a: 'Rohini nakshatra females tend to attract devoted partners and generally experience fulfilling marriages when Moon is well-placed. The key challenge is the tendency toward possessiveness, which when managed with awareness transforms into deep loyalty.' },
  { q: 'Which careers suit Rohini nakshatra females?', icon: Briefcase,
    a: 'Rohini nakshatra females excel in careers involving beauty, creativity, aesthetics, or emotional connection. Fashion design, interior decoration, music, dance, acting, photography, cooking, hospitality, and counseling all suit this nakshatra.' },
  { q: 'What are the weaknesses of Rohini nakshatra females?', icon: AlertTriangle,
    a: 'The primary weakness is possessiveness in relationships, which can create controlling dynamics if Saturn or Rahu afflicts the Moon. Over-attachment to comfort and sensory pleasure can lead to difficulty with necessary change or discipline.' },
  { q: 'Which nakshatra is most compatible with Rohini female?', icon: User,
    a: 'The most compatible nakshatras are Ardra, Mrigashira, and Hasta in classical compatibility analysis. Uttaraphalguni also tends to work well. The compatibility assessment should always consider the complete chart, not just Moon nakshatra alone.' },
];

const SCHEMAS = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Rohini Nakshatra Female: Personality, Love and Career in Vedic Astrology',
    description: PAGE_DESC,
    author: { '@type': 'Person', name: 'Saurabh Jain', url: 'https://www.soulinfinity.space/cosmic-guide' },
    publisher: { '@type': 'Organization', name: 'Soul Infinity Astro Solutions' },
    datePublished: '2026-06-16',
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
      { '@type': 'ListItem', position: 3, name: 'Rohini Nakshatra Female', item: PAGE_URL },
    ],
  },
];

export default function RohiniNakshatraFemalePage() {
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
            alt="Rohini nakshatra female meditating under zodiac wheel and golden cosmic sunrise"
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
              <span>Rohini Nakshatra Female</span>
            </nav>
            <span className="inline-block self-start text-xs md:text-sm tracking-widest uppercase font-poppins font-semibold rounded-full px-3 py-1 mb-4" style={{ background: ACCENT, color: '#1c1917' }}>Vedic Astrology</span>
            <h1 className="font-caveat text-5xl md:text-7xl text-white leading-tight mb-3">Rohini Nakshatra Female</h1>
            <p className="font-poppins text-base md:text-xl text-white/85 mb-4">Personality, Love and Career in Vedic Astrology</p>
            <p className="font-poppins text-xs md:text-sm text-white/70">
              <Calendar className="inline w-3 h-3 mr-1" aria-hidden="true" />Jun 16, 2026
              <span className="mx-2">·</span>7 min read
              <span className="mx-2">·</span>By Saurabh Jain, K.N. Rao Institute
            </p>
          </div>
        </section>

        <section className="py-10 px-6" style={{ background: CREAM }}>
          <div className="max-w-3xl mx-auto rounded-2xl bg-white p-6 md:p-8 shadow-sm" style={{ borderLeft: `5px solid ${ACCENT}` }}>
            <h2 className="font-kalam text-xl md:text-2xl mb-3" style={{ color: ACCENT }}>The Short Answer</h2>
            <p className="font-poppins text-base text-[#3d2810] leading-relaxed m-0">
              The Rohini nakshatra female is magnetically beautiful, deeply loyal, and artistically gifted. Her greatest strength is her capacity for love. Her greatest challenge is learning to love without possessiveness. Moon in Rohini from 10 to 23 degrees 20 minutes of Taurus.
            </p>
          </div>
        </section>

        <section className="py-12 px-6" style={{ background: CREAM }}>
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <h2 className="font-kalam text-3xl md:text-4xl" style={{ color: DARK_BG }}>Rohini Nakshatra Female Personality</h2>
              <p className="font-poppins text-base text-[#3d2810] leading-relaxed">
                Rohini nakshatra female personality is defined by beauty, longing, and abundance. The Moon in Rohini at 10 to 23 degrees 20 minutes of Taurus gives a native who is naturally magnetic, emotionally rich, and deeply oriented toward sensory pleasure and creative expression.
              </p>
              <p className="font-poppins text-base text-[#3d2810] leading-relaxed">
                The Moon in Rohini female native tends to be remembered. She walks into a room and people notice, not necessarily because of classical good looks, but because of a quality of natural grace and warmth. She makes people feel seen and valued.
              </p>
              <p className="font-poppins text-base text-[#3d2810] leading-relaxed">
                Emotionally, she runs deep. Her feelings are intense, her attachments powerful, and her capacity for love extraordinary. The challenge is that this same intensity becomes possessiveness when she feels threatened or insecure.
              </p>
            </div>
            <aside className="rounded-2xl p-6 self-start" style={{ background: CARD_BG, border: `2px solid ${ACCENT}`, borderLeftWidth: '6px' }}>
              <div className="flex items-center gap-2 mb-3" style={{ color: ACCENT }}>
                <Sparkles className="w-5 h-5" aria-hidden="true" />
                <span className="font-poppins text-xs uppercase tracking-widest font-semibold">Soul Infinity Insight</span>
              </div>
              <p className="font-kalam text-lg text-[#3d2810] italic leading-relaxed m-0">
                Rohini is the nakshatra of longing itself. The female native remembers something she once had and is always reaching for it again.
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
                  <h3 className="font-kalam text-xl text-white m-0">Natural Gifts of Rohini Female</h3>
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
                  <h3 className="font-kalam text-xl text-white m-0">Shadows to Navigate</h3>
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
            <h2 className="font-kalam text-3xl md:text-5xl text-center mb-10" style={{ color: ACCENT }}>Rohini Female in Love and Marriage</h2>
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
              The Rohini female career gravitates naturally toward beauty, creativity, and abundance. She thrives where aesthetics matter, where relationships are central, and where she has creative freedom.
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
            <h2 className="font-kalam text-3xl md:text-4xl mb-6" style={{ color: ACCENT }}>Remedies for Rohini Nakshatra Females</h2>
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
            <p className="font-poppins text-sm text-[#5C4A2A] text-center mb-8">Your top questions about Rohini nakshatra females</p>
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
            <h2 className="font-caveat text-3xl md:text-5xl mb-4" style={{ color: DARK_BG }}>Get a Personal Rohini Reading</h2>
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
