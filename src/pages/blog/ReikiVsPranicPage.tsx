import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ArrowRight, ChevronDown, Sparkles, Heart, HelpCircle, Calendar, Gem, Globe,
  Hand, Waves, Activity, Shield, Star, Clock, CheckCircle, MoveHorizontal,
} from 'lucide-react';

const R2 = 'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev';
const HERO_IMAGE = `${R2}/Blog/reiki-vs-pranic-healing/hero-banner.webp`;
const REMEDIES_BG = `${R2}/Nakshatra/Rohini/vedic-remedies-bg-rohini.webp`;

const ACCENT = '#D4A11E';
const DARK_BG = '#2A1810';
const CREAM = '#FAF6EC';
const CARD_BG = '#FFF9ED';
const HEALING = '#7C3AED';

const PAGE_URL = 'https://www.soulinfinity.space/blog/reiki-vs-pranic-healing';
const PAGE_TITLE = 'Reiki vs Pranic Healing: Which Energy Healing Is Right for You? | Soul Infinity';
const PAGE_DESC = 'Reiki vs Pranic Healing comparison: how each modality works, when to choose each, and how to combine them. By K.N. Rao Institute trained practitioner Saurabh Jain.';

interface ComparisonRow { label: string; reiki: string; pranic: string; }
const COMPARISON: readonly ComparisonRow[] = [
  { label: 'Origin', reiki: 'Japan, Mikao Usui (1920s)', pranic: 'Philippines, Choa Kok Sui (1980s)' },
  { label: 'Touch', reiki: 'Hands-on or hands-near', pranic: 'No touch, energy field only' },
  { label: 'Technique', reiki: 'Intuitive, meditative', pranic: 'Structured protocols' },
  { label: 'Session', reiki: 'Fixed hand positions', pranic: 'Scanning, sweeping, energizing' },
  { label: 'Training', reiki: '3 to 4 degrees', pranic: 'Multiple level system' },
  { label: 'Tools', reiki: 'Intention and symbols', pranic: 'Prana and chakra protocols' },
];

const REIKI_CHOOSE: readonly string[] = [
  'You want deep relaxation and stress relief',
  'You are processing grief or emotional overwhelm',
  'You prefer a gentle, intuitive approach',
  'You want a meditative healing experience',
  'You are recovering from illness or surgery',
];

const PRANIC_CHOOSE: readonly string[] = [
  'You have a specific chronic condition',
  'You prefer a structured, protocol-based approach',
  'You are dealing with recurring emotional patterns',
  'You want to learn self-healing techniques',
  'You want to complement ongoing medical treatment',
];

interface Faq { q: string; a: string; icon: typeof HelpCircle; }
const FAQ_DATA: readonly Faq[] = [
  { q: 'What is the main difference between Reiki and Pranic Healing?', icon: HelpCircle,
    a: 'Reiki uses gentle hands-on or hands-near energy channeling. Pranic Healing works in the energy field without physical touch, using scanning and sweeping techniques. Reiki is intuitive and meditative; Pranic Healing is structured and protocol-based.' },
  { q: 'Is Pranic Healing or Reiki better for stress and anxiety?', icon: Sparkles,
    a: 'Both work. Reiki produces deep meditative calm during the session itself, excellent for immediate stress relief. Pranic Healing targets specific chakras associated with anxiety, often producing longer-lasting results for chronic stress patterns.' },
  { q: 'Can I receive both Reiki and Pranic Healing?', icon: Heart,
    a: 'Yes. The two modalities are complementary rather than contradictory. Many practitioners use both in sequence or combination depending on the client situation. At Soul Infinity, Saurabh Jain integrates both with Vedic astrology.' },
  { q: 'How many sessions of Pranic Healing or Reiki do I need?', icon: Clock,
    a: 'Depends on the condition. For general stress and energy balancing, 3 to 5 sessions typically produce noticeable results. For chronic conditions, 8 to 12 sessions spaced weekly are usually recommended. Maintenance sessions every 4 to 6 weeks help sustain results.' },
  { q: 'Are Reiki and Pranic Healing scientifically proven?', icon: Shield,
    a: 'Both have a growing body of supportive research, particularly in stress reduction, pain management, and complementary cancer care. Neither is conclusively proven by mainstream medical science. They are best understood as complementary to, not replacements for, conventional medical care.' },
];

const SCHEMAS = [
  {
    '@context': 'https://schema.org', '@type': 'Article',
    headline: 'Reiki vs Pranic Healing: Which Energy Healing Is Right for You?',
    description: PAGE_DESC,
    author: { '@type': 'Person', name: 'Saurabh Jain', url: 'https://www.soulinfinity.space/cosmic-guide' },
    publisher: { '@type': 'Organization', name: 'Soul Infinity Astro Solutions' },
    datePublished: '2026-06-15', image: HERO_IMAGE, url: PAGE_URL,
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
      { '@type': 'ListItem', position: 3, name: 'Reiki vs Pranic Healing', item: PAGE_URL },
    ],
  },
];

export default function ReikiVsPranicPage() {
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
          <img src={HERO_IMAGE} alt="Reiki vs Pranic Healing comparison, energy healing modalities side by side" className="absolute inset-0 w-full h-full object-cover" width={1600} height={600} loading="eager" fetchpriority="high" />
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 max-w-5xl mx-auto px-6 h-full flex flex-col justify-center text-white">
            <nav aria-label="Breadcrumb" className="font-poppins text-xs md:text-sm text-white/70 mb-4">
              <Link to="/" className="hover:text-amber-300">Home</Link>
              <span className="mx-2">›</span>
              <Link to="/blog" className="hover:text-amber-300">Blog</Link>
              <span className="mx-2">›</span>
              <span>Reiki vs Pranic Healing</span>
            </nav>
            <span className="inline-block self-start text-xs md:text-sm tracking-widest uppercase font-poppins font-semibold rounded-full px-3 py-1 mb-4 text-white" style={{ background: HEALING }}>Healing</span>
            <h1 className="font-caveat text-5xl md:text-7xl text-white leading-tight mb-3">Reiki vs Pranic Healing</h1>
            <p className="font-poppins text-base md:text-xl text-white/85 mb-4">Which Energy Healing Is Right for You?</p>
            <p className="font-poppins text-xs md:text-sm text-white/70">
              <Calendar className="inline w-3 h-3 mr-1" aria-hidden="true" />Jun 15, 2026
              <span className="mx-2">·</span>7 min read
              <span className="mx-2">·</span>By Saurabh Jain, K.N. Rao Institute
            </p>
          </div>
        </section>

        <section className="py-10 px-6" style={{ background: CREAM }}>
          <div className="max-w-3xl mx-auto rounded-2xl bg-white p-6 md:p-8 shadow-sm" style={{ borderLeft: `5px solid ${ACCENT}` }}>
            <h2 className="font-kalam text-xl md:text-2xl mb-3" style={{ color: ACCENT }}>The Short Answer</h2>
            <p className="font-poppins text-base text-[#3d2810] leading-relaxed m-0">
              Reiki and Pranic Healing both work with the human energy field but through different methods. Reiki is meditative and uses gentle hand positions. Pranic Healing is structured and uses no touch. Neither is superior. The right choice depends on what you respond to and what condition you are working on.
            </p>
          </div>
        </section>

        <section className="py-12 px-6" style={{ background: CREAM }}>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            <article className="bg-white rounded-2xl p-6 shadow-sm" style={{ borderTop: `4px solid ${HEALING}` }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ background: '#F3E8FF', color: HEALING }}>
                  <Hand className="w-5 h-5" aria-hidden="true" />
                </div>
                <h2 className="font-kalam text-2xl m-0" style={{ color: DARK_BG }}>What is Reiki?</h2>
              </div>
              <p className="font-poppins text-sm text-[#3d2810] leading-relaxed mb-3">
                Reiki is a Japanese energy healing system developed by Mikao Usui in the early 20th century. The word combines Rei (universal) and Ki (life force energy). A practitioner channels universal life force energy through their hands to support the recipient natural healing.
              </p>
              <p className="font-poppins text-sm text-[#3d2810] leading-relaxed m-0">
                A session involves the client resting fully clothed while the practitioner places hands lightly on or above the body in a sequence of positions. The session is deeply relaxing and meditative.
              </p>
            </article>

            <article className="bg-white rounded-2xl p-6 shadow-sm" style={{ borderTop: `4px solid ${ACCENT}` }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ background: '#FEF3C7', color: ACCENT }}>
                  <Waves className="w-5 h-5" aria-hidden="true" />
                </div>
                <h2 className="font-kalam text-2xl m-0" style={{ color: DARK_BG }}>What is Pranic Healing?</h2>
              </div>
              <p className="font-poppins text-sm text-[#3d2810] leading-relaxed mb-3">
                Pranic Healing is a system developed by Choa Kok Sui that draws on ancient Indian, Chinese, and Tibetan energy traditions. Prana means life force in Sanskrit. The practitioner works with the aura and chakras using specific protocols to remove depleted energy and project fresh prana.
              </p>
              <p className="font-poppins text-sm text-[#3d2810] leading-relaxed m-0">
                Unlike Reiki, Pranic Healing is entirely no-touch. The practitioner scans, sweeps, and energizes the energy field without physical contact.
              </p>
            </article>
          </div>
        </section>

        <section className="py-16 px-6" style={{ background: DARK_BG }}>
          <div className="max-w-5xl mx-auto">
            <h2 className="font-kalam text-3xl md:text-4xl text-center mb-2" style={{ color: ACCENT }}>Side-by-Side Comparison</h2>
            <p className="font-poppins text-sm text-center text-white/60 mb-8">The two modalities differ in origin, technique, and application</p>
            <div className="overflow-x-auto">
              <table className="w-full text-left rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                <thead>
                  <tr style={{ background: 'rgba(212,161,30,0.15)' }}>
                    <th className="font-kalam text-base p-4 text-white">Aspect</th>
                    <th className="font-kalam text-base p-4 text-white">Reiki</th>
                    <th className="font-kalam text-base p-4 text-white">Pranic Healing</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row) => (
                    <tr key={row.label} className="border-t border-white/10">
                      <td className="font-poppins text-sm font-semibold p-4" style={{ color: ACCENT }}>{row.label}</td>
                      <td className="font-poppins text-sm p-4 text-white/85">{row.reiki}</td>
                      <td className="font-poppins text-sm p-4 text-white/85">{row.pranic}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="py-12 px-6" style={{ background: CREAM }}>
          <div className="max-w-5xl mx-auto">
            <h2 className="font-kalam text-3xl md:text-4xl mb-8 text-center" style={{ color: DARK_BG }}>When to Choose Each</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 flex items-center gap-3" style={{ background: `linear-gradient(135deg, #5b21b6, ${HEALING})` }}>
                  <Hand className="w-7 h-7 text-white" aria-hidden="true" />
                  <h3 className="font-kalam text-xl text-white m-0">Choose Reiki When</h3>
                </div>
                <ul className="divide-y divide-purple-50">
                  {REIKI_CHOOSE.map((s) => (
                    <li key={s} className="flex items-start gap-3 px-5 py-3 font-poppins text-sm text-[#3d2810]">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: HEALING }} aria-hidden="true" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 flex items-center gap-3" style={{ background: `linear-gradient(135deg, #78350f, ${ACCENT})` }}>
                  <Waves className="w-7 h-7 text-white" aria-hidden="true" />
                  <h3 className="font-kalam text-xl text-white m-0">Choose Pranic Healing When</h3>
                </div>
                <ul className="divide-y divide-amber-50">
                  {PRANIC_CHOOSE.map((s) => (
                    <li key={s} className="flex items-start gap-3 px-5 py-3 font-poppins text-sm text-[#3d2810]">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: ACCENT }} aria-hidden="true" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 px-6" style={{ background: CREAM }}>
          <div className="max-w-4xl mx-auto rounded-2xl p-8 md:p-10" style={{ background: CARD_BG, border: `2px solid ${ACCENT}` }}>
            <div className="flex items-center gap-3 mb-4">
              <MoveHorizontal className="w-7 h-7" style={{ color: ACCENT }} aria-hidden="true" />
              <h2 className="font-kalam text-2xl md:text-3xl m-0" style={{ color: DARK_BG }}>Can You Combine Both?</h2>
            </div>
            <p className="font-poppins text-base text-[#3d2810] leading-relaxed mb-3">
              Yes, and many experienced energy healers do. At Soul Infinity, Saurabh Jain integrates both Reiki and Pranic Healing with Vedic astrology to address the energetic and karmic layers of a client situation simultaneously.
            </p>
            <p className="font-poppins text-base text-[#3d2810] leading-relaxed m-0">
              Astrology reveals the chart patterns that predispose a person to certain energy imbalances. Reiki and Pranic Healing provide practical tools to work directly with those imbalances. The combination is particularly powerful during challenging planetary periods such as Sade Sati, Rahu or Ketu Mahadasha, or difficult transit patterns.
            </p>
          </div>
        </section>

        <section className="relative py-16 px-6">
          <img src={REMEDIES_BG} alt="" className="absolute inset-0 w-full h-full object-cover" aria-hidden="true" loading="lazy" />
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(42, 24, 16, 0.85)' }} />
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <Activity className="w-10 h-10 mx-auto mb-4" style={{ color: ACCENT }} aria-hidden="true" />
            <h2 className="font-kalam text-3xl md:text-4xl mb-4" style={{ color: ACCENT }}>Integrated Healing at Soul Infinity</h2>
            <p className="font-poppins text-base text-white/85 leading-relaxed">
              Sessions are tailored individually. Saurabh Jain uses both Reiki and Pranic Healing alongside chart-based remedies to address the root karmic and energetic causes of imbalance.
            </p>
          </div>
        </section>

        <section className="py-12 px-6" style={{ background: CREAM }}>
          <div className="max-w-3xl mx-auto">
            <h2 className="font-kalam text-3xl md:text-4xl text-center mb-2" style={{ color: DARK_BG }}>Frequently Asked Questions</h2>
            <p className="font-poppins text-sm text-[#5C4A2A] text-center mb-8">Your top questions about Reiki and Pranic Healing</p>
            <div className="space-y-3">
              {FAQ_DATA.map((faq, i) => {
                const open = openFaq === i;
                const Icon = faq.icon;
                return (
                  <div key={faq.q} className="bg-white rounded-2xl shadow-sm overflow-hidden" style={{ borderLeft: open ? `4px solid ${HEALING}` : '4px solid transparent' }}>
                    <button type="button" onClick={() => setOpenFaq(open ? null : i)} aria-expanded={open} aria-controls={`faq-${i}`} className="w-full flex items-center gap-3 text-left px-5 py-4 hover:bg-purple-50/40 transition-colors">
                      <Icon className="w-5 h-5 flex-shrink-0" style={{ color: HEALING }} aria-hidden="true" />
                      <span className="font-poppins font-semibold text-sm md:text-base text-[#3d2810] flex-1">{faq.q}</span>
                      <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} style={{ color: HEALING }} aria-hidden="true" />
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

        <section className="py-16 px-6 text-center" style={{ background: `linear-gradient(135deg, ${HEALING} 0%, ${ACCENT} 100%)` }}>
          <div className="max-w-2xl mx-auto">
            <Star className="w-8 h-8 mx-auto mb-4 text-white" aria-hidden="true" />
            <h2 className="font-caveat text-3xl md:text-5xl mb-4 text-white">Book an Integrated Healing Session</h2>
            <p className="font-poppins text-base text-white/90 mb-8 leading-relaxed">
              Saurabh Jain at Soul Infinity offers Reiki, Pranic Healing, and integrated sessions in person in Ahmedabad and online worldwide. Sessions are tailored to your specific concerns and supported by chart-based insight.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href="https://wa.me/919079053840" className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-poppins font-semibold text-white shadow-md hover:shadow-lg transition" style={{ background: DARK_BG }}>
                Book on WhatsApp
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </a>
              <Link to="/services/healing/reiki" className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-poppins font-semibold bg-white transition" style={{ color: DARK_BG }}>
                <Globe className="w-5 h-5" aria-hidden="true" />
                Reiki Service Details
              </Link>
            </div>
            <p className="font-poppins text-xs text-white/70 mt-6 flex items-center justify-center gap-2">
              <Gem className="w-3 h-3" aria-hidden="true" />
              Consultations in person in Ahmedabad and online worldwide
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
