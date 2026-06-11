import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Moon, BookOpen, Star, CheckCircle, AlertTriangle, ChevronDown } from 'lucide-react';
import SEOHead from '../../components/SEOHead';
import type { JsonLd } from '../../data/schema-entities';

const R2 = 'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev';

const HERO_IMAGE        = `${R2}/Nakshatra/Rohini/hero-banner-rohini.webp`;
const QUICK_FACTS_IMAGE = `${R2}/Nakshatra/Rohini/quick-facts-rohini.webp`;
const REMEDIES_BG       = `${R2}/Nakshatra/Rohini/vedic-remedies-bg-rohini.webp`;
const SVG               = `${R2}/Nakshatra/Rohini/SVG`;

const HERO_FRAME        = `${SVG}/hero-frame-rohini.svg`;
const SEC_NUM_01        = `${SVG}/section-number-01.svg`;
const SEC_NUM_02        = `${SVG}/section-number-02.svg`;
const SEC_NUM_03        = `${SVG}/section-number-03.svg`;
const PULLQUOTE_FRAME   = `${SVG}/pullquote-frame.svg`;
const WASHI_AMBER       = `${SVG}/washi-tape-amber.svg`;
const DOODLE_MOON       = `${SVG}/doodle-moon-stars.svg`;
const SCROLL_FRAME      = `${SVG}/scroll-frame-rohini.svg`;
const CONSTELLATION     = `${SVG}/doodle-rohini-constellation.svg`;
const DIVIDER_LOTUS     = `${SVG}/divider-lotus.svg`;
const DIVIDER_OM        = `${SVG}/divider-om.svg`;
const DIVIDER_STARS     = `${SVG}/divider-stars.svg`;
const AUTHOR_SIG        = `${SVG}/author-signature.svg`;

const PAGE_URL = 'https://www.soulinfinity.space/nakshatra/rohini';
const PAGE_TITLE = 'Moon in Rohini Nakshatra: Complete Vedic Guide | Soul Infinity';
const PAGE_DESCRIPTION = "Rohini nakshatra is the Moon's most beloved placement. Complete guide to Moon in Rohini, mythology, characteristics, the 12 houses, remedies, and FAQ by K.N. Rao Institute trained astrologer Saurabh Jain.";

interface QuickFact {
  label: string;
  value: string;
}

const QUICK_FACTS: readonly QuickFact[] = [
  { label: 'Nakshatra',      value: '4th of 27' },
  { label: 'Sign',           value: 'Vrishabha (Taurus)' },
  { label: 'Span',           value: '10 to 23 degrees 20 minutes' },
  { label: 'Lord',           value: 'Chandra (Moon)' },
  { label: 'Deity',          value: 'Brahma (Creator)' },
  { label: 'Symbol',         value: 'Ox Cart, Chariot' },
  { label: 'Guna',           value: 'Rajas' },
  { label: 'Lucky Color',    value: 'White, Silver' },
  { label: 'Famous Natives', value: 'Lord Krishna, Lord Rama' },
];

const STRENGTHS: readonly string[] = [
  'Naturally beautiful and magnetically charming presence',
  'Deeply loving, loyal, and emotionally affectionate',
  'Highly creative with strong artistic and aesthetic gifts',
  'Fertile mind and strong imagination',
  'Financial growth through talent and creativity',
  'Nurturing, caring, and emotionally intuitive with others',
];

const SHADOWS: readonly string[] = [
  'Emotional possessiveness and jealousy in relationships',
  'Over-attachment to comfort, beauty, and sensory pleasure',
  'Mood swings and emotional intensity under affliction',
  'Indulgence in physical pleasures when Saturn or Rahu aspect Moon',
];

interface HouseDef {
  num: string;
  name: string;
  desc: string;
}

const HOUSES: readonly HouseDef[] = [
  { num: '01', name: '1st House',  desc: 'Charismatic, attractive personality, loved by all, strong emotional nature.' },
  { num: '02', name: '2nd House',  desc: 'Sweet speech, family harmony, good wealth through creativity.' },
  { num: '03', name: '3rd House',  desc: 'Creative communicator, lovely voice, good bond with siblings.' },
  { num: '04', name: '4th House',  desc: 'Love for home and mother, beautiful home, inner emotional comfort.' },
  { num: '05', name: '5th House',  desc: 'Artistic mind, love for children, very good intelligence.' },
  { num: '06', name: '6th House',  desc: 'Emotional stress, worry about health, but strong intuition.' },
  { num: '07', name: '7th House',  desc: 'Exceptionally romantic spouse, deep need for emotional partnership.' },
  { num: '08', name: '8th House',  desc: 'Emotional ups and downs, transformation, hidden pleasures.' },
  { num: '09', name: '9th House',  desc: 'Spiritual beauty, blessed by gurus, devotion through aesthetics.' },
  { num: '10', name: '10th House', desc: 'Success in creative fields, public recognition, career in arts.' },
  { num: '11', name: '11th House', desc: 'Gains through networks, fulfillment of desires, luxurious life.' },
  { num: '12', name: '12th House', desc: 'Spiritual longing, moksha through surrender, hidden pleasures.' },
];

interface Remedy {
  main: string;
  sub: string;
}

const REMEDIES: readonly Remedy[] = [
  { main: 'Worship Lord Chandra on Mondays',                       sub: 'Offer white flowers, milk, and white rice to the Moon on Purnima and every Monday. Fast if health permits.' },
  { main: 'Wear Pearl (Moti) after astrological consultation',     sub: 'Pearl strengthens Chandra in the chart. Must be set in silver, worn on the little finger on Monday morning after puja.' },
  { main: 'Chant Chandra Beej Mantra 108 times',                   sub: 'Om Shraam Shreem Shraum Sah Chandramasay Namah. On a pearl or white sphatik mala, facing northwest, at dawn or dusk.' },
  { main: 'Offer water to the Moon on Purnima',                    sub: 'Standing outdoors, pour water mixed with raw milk toward the Moon while chanting the mantra. A classical Chandra Puja practice.' },
  { main: 'Feed white cows or donate white items',                 sub: 'White cow, white rice, white cloth, silver, all strengthen Chandra and calm emotional turbulence from Rohini afflictions.' },
  { main: 'Practice non-attachment in close relationships',        sub: 'The deepest remedy for Rohini: recognizing that the longing is a spiritual quality, not a wound to be filled by another person.' },
  { main: 'Read Shri Sukta on Fridays',                            sub: 'Shri Sukta is dedicated to Lakshmi, the deity of abundance and the divine feminine that Rohini nakshatra most naturally embodies.' },
];

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: readonly FaqItem[] = [
  {
    q: 'What does it mean to have Moon in Rohini nakshatra?',
    a: "Moon in Rohini is considered one of the most auspicious placements in Vedic astrology. Rohini is the Moon's own nakshatra, where his energy flows most naturally. Natives tend to be magnetically attractive, emotionally deep, artistically gifted, and strongly oriented toward beauty, comfort, and meaningful relationships. The shadow side is possessiveness and difficulty letting go.",
  },
  {
    q: 'Is Rohini nakshatra good or bad?',
    a: 'Rohini is considered highly auspicious in Vedic tradition. Lord Krishna and Lord Rama are both said to have been born under Rohini nakshatra. The nakshatra carries the energy of fertility, abundance, beauty, and creative power. Challenges arise when Moon is afflicted by Saturn, Rahu, or Ketu, which can amplify attachment or emotional instability.',
  },
  {
    q: 'Which celebrities have Moon in Rohini nakshatra?',
    a: 'According to classical Vedic texts, Lord Krishna was born under Rohini nakshatra, which is celebrated as Janmashtami. Lord Rama is also associated with Rohini. Among modern figures, several prominent artists, musicians, and political leaders are said to have strong Rohini placements, though individual chart verification is always needed.',
  },
  {
    q: 'What is the gemstone for Rohini nakshatra?',
    a: "Pearl (Moti) is the primary gemstone for strengthening the Moon and supporting Rohini nakshatra natives. It should be worn only after a proper consultation with a trained Jyotish practitioner who can verify the Moon's condition in your specific chart. White sphatik (crystal quartz) is a safe alternative that anyone can wear.",
  },
  {
    q: 'How does Rohini Moon affect marriage and relationships?',
    a: 'Rohini Moon natives are deeply romantic and seek beauty and emotional depth in their partners. They are loyal and loving but can become possessive when insecure. A 7th house Rohini Moon often brings a very attractive or artistically gifted spouse. The key challenge is learning to love without clinging, which is the spiritual lesson Rohini teaches through the myth of Chandra.',
  },
];

function buildArticleSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Moon in Rohini Nakshatra: Complete Vedic Guide',
    description: PAGE_DESCRIPTION,
    image: HERO_IMAGE,
    datePublished: '2026-06-10',
    dateModified: '2026-06-10',
    author: {
      '@type': 'Person',
      name: 'Saurabh Jain',
      url: 'https://www.soulinfinity.space/cosmic-guide',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Soul Infinity Astro Solutions',
      logo: {
        '@type': 'ImageObject',
        url: 'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Logo/Soul%20-Infinity-logo%201.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': PAGE_URL,
    },
    url: PAGE_URL,
    inLanguage: 'en-IN',
  };
}

function buildFaqSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };
}

function buildBreadcrumbSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.soulinfinity.space/' },
      { '@type': 'ListItem', position: 2, name: 'Nakshatras', item: 'https://www.soulinfinity.space/nakshatra' },
      { '@type': 'ListItem', position: 3, name: 'Rohini Nakshatra', item: PAGE_URL },
    ],
  };
}

export default function RohiniNakshatraPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <SEOHead
        title={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        keywords="rohini nakshatra, moon in rohini, vedic astrology nakshatra, chandra rohini, taurus nakshatra, soul infinity, saurabh jain"
        image={HERO_IMAGE}
        type="article"
        url={PAGE_URL}
        omitDefaultSchema
        schemas={[buildArticleSchema(), buildFaqSchema(), buildBreadcrumbSchema()]}
      />
      <Helmet>
        <link rel="canonical" href={PAGE_URL} />
      </Helmet>

      {/* SECTION 1: Hero banner */}
      <div className="relative w-full overflow-hidden">
        <img
          src={HERO_IMAGE}
          alt="Moon in Rohini Nakshatra, Vedic astrology guide"
          width={1600}
          height={600}
          fetchpriority="high"
          className="w-full block object-cover"
        />
        <div className="absolute bottom-0 left-0 w-full pointer-events-none">
          <img
            src={HERO_FRAME}
            alt=""
            width={1600}
            height={100}
            className="w-full block"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Title strip */}
      <section className="bg-[#FAF6EC] pt-8 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <nav aria-label="Breadcrumb" className="font-poppins text-sm text-[#5C4A2A] mb-4">
            <a href="/" className="hover:text-[#D4A11E]">Home</a>
            <span className="mx-2 text-[#D4A11E]/60">›</span>
            <a href="/nakshatra" className="hover:text-[#D4A11E]">Nakshatras</a>
            <span className="mx-2 text-[#D4A11E]/60">›</span>
            <span>Rohini Nakshatra</span>
          </nav>
          <img src={SEC_NUM_01} alt="" width={120} height={60} className="mb-2" aria-hidden="true" />
          <p className="inline-block text-xs md:text-sm tracking-[0.25em] uppercase bg-[#FEF3C7] text-[#92400e] font-poppins font-semibold rounded-full px-4 py-1.5 mb-4">
            <span className="font-devanagari" lang="sa">रोहिणी नक्षत्र</span>
            <span className="mx-2">·</span>
            Nakshatra
          </p>
          <h1 className="font-kalam text-4xl md:text-5xl text-[#2A2438] leading-tight mb-4">
            Moon in Rohini Nakshatra, The Seat of Longing
          </h1>
          <p className="font-poppins text-base md:text-lg text-[#5C4A2A]">
            Ruled by Chandra (Moon)
            <span className="mx-2 text-[#D4A11E]/60">·</span>
            Vrishabha (Taurus)
            <span className="mx-2 text-[#D4A11E]/60">·</span>
            The Most Beloved of the 27 Nakshatras
          </p>
        </div>
      </section>

      {/* SECTION 2: Quick Facts Strip */}
      <section className="bg-[#FAF6EC]">
        <div className="w-full max-w-5xl mx-auto px-4 py-8">
          <img
            src={QUICK_FACTS_IMAGE}
            alt="Rohini Nakshatra Quick Facts, Sign Taurus, Lord Moon, Deity Brahma, Symbol Ox Cart, Guna Rajas"
            width={1400}
            height={400}
            className="w-full rounded-2xl shadow-md"
            loading="lazy"
          />
        </div>
      </section>

      {/* SECTION 3: Two-column About */}
      <section className="bg-[#FAF6EC] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* LEFT COLUMN (55%) */}
          <div className="lg:col-span-7 space-y-5">
            <h2 className="font-kalam text-xl text-[#D4A11E]">
              <span className="font-devanagari" lang="sa">रोहिणी नक्षत्र</span>
              <span className="mx-2">/</span>
              Rohini in Vedic Astrology
            </h2>

            {/* CARD 1 */}
            <article className="bg-white rounded-xl p-5 shadow-sm" style={{ borderLeft: '4px solid #D4A11E' }}>
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-[#FEF3C7] text-[#D4A11E]">
                  <Moon className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-kalam font-bold text-lg text-[#2A2438] mb-1">The Moon&apos;s Most Beloved</h3>
                  <p className="font-poppins text-sm text-[#5C4A2A] leading-relaxed m-0">
                    Rohini is the nakshatra that Chandra (Moon) cherishes above all others. Spanning 10 to 23 degrees 20 minutes of Taurus, it is where the Moon shines most fully. Classical texts describe Rohini as the most fertile, beautiful, and magnetically attractive of the 27 nakshatras. It is the seat of creative abundance and the natural home of desire.
                  </p>
                </div>
              </div>
            </article>

            {/* CARD 2 */}
            <article className="bg-white rounded-xl p-5 shadow-sm" style={{ borderLeft: '4px solid #D4A11E' }}>
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-[#FEF3C7] text-[#D4A11E]">
                  <BookOpen className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-kalam font-bold text-lg text-[#2A2438] mb-1">The Mythology of Rohini</h3>
                  <p className="font-poppins text-sm text-[#5C4A2A] leading-relaxed m-0">
                    Chandra married the 27 daughters of Prajapati Daksha, but he became deeply infatuated with Rohini, spending all his time with her and neglecting the others. This angered the other wives, leading to a curse that caused the Moon to wane. This mythological story encodes a truth about Rohini: it is where the Moon most wants to be, and where his energy flows most naturally and completely.
                  </p>
                </div>
              </div>
            </article>

            {/* CARD 3 */}
            <article className="bg-white rounded-xl p-5 shadow-sm" style={{ borderLeft: '4px solid #D4A11E' }}>
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-[#FEF3C7] text-[#D4A11E]">
                  <Star className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-kalam font-bold text-lg text-[#2A2438] mb-1">What This Placement Means</h3>
                  <p className="font-poppins text-sm text-[#5C4A2A] leading-relaxed m-0">
                    A Moon in Rohini gives strong aesthetic sensibility, a love of beauty and physical comfort, deep emotional longing, and a naturally magnetic presence. These natives are often remembered long after a first meeting. The shadow side is an attachment to pleasure that can become possessive when Saturn or Rahu afflict this placement.
                  </p>
                </div>
              </div>
            </article>

            {/* CARD 4 (pull quote) */}
            <div className="relative">
              <img
                src={PULLQUOTE_FRAME}
                alt=""
                width={700}
                height={180}
                className="w-full"
                aria-hidden="true"
                loading="lazy"
              />
              <div className="absolute inset-0 flex items-center justify-center px-[8%] py-[14%]">
                <p className="font-kalam text-base md:text-lg text-[#2A2438] italic text-center leading-snug m-0">
                  Rohini is not just a beautiful nakshatra. It is the nakshatra of longing itself. The soul remembers something it once had and is always reaching for it again.
                </p>
              </div>
            </div>

            <img
              src={AUTHOR_SIG}
              alt="Saurabh Jain, K.N. Rao Institute, Soul Infinity"
              width={400}
              height={100}
              className="mt-2"
              loading="lazy"
            />
          </div>

          {/* RIGHT COLUMN (45%, sticky) */}
          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-8">
              <img
                src={QUICK_FACTS_IMAGE}
                alt="Rohini nakshatra quick reference facts"
                width={800}
                height={400}
                className="w-full rounded-xl shadow-md mb-6"
                loading="lazy"
              />

              <div className="bg-[#2A1810] rounded-2xl p-6 text-white">
                <h3 className="font-kalam text-lg text-[#D4A11E] mb-4">Quick Facts</h3>
                <dl className="font-poppins text-sm">
                  {QUICK_FACTS.map((fact, i) => (
                    <div
                      key={fact.label}
                      className={`flex justify-between gap-3 py-2 ${i < QUICK_FACTS.length - 1 ? 'border-b border-white/10' : ''}`}
                    >
                      <dt className="text-white/70">{fact.label}</dt>
                      <dd className="text-right font-medium">{fact.value}</dd>
                    </div>
                  ))}
                </dl>

                <a
                  href="https://wa.me/919079053840"
                  className="block text-center bg-[#D4A11E] hover:bg-[#E5B533] text-[#1c1917] font-poppins font-semibold rounded-full w-full mt-5 py-3 transition-colors"
                >
                  Book Rohini Reading
                </a>
                <a
                  href="tel:+919079053840"
                  className="block text-center border-2 border-[#D4A11E] text-[#D4A11E] hover:bg-[#D4A11E]/10 font-poppins font-semibold rounded-full w-full mt-2 py-3 transition-colors"
                >
                  Call Saurabh Jain
                </a>
              </div>

              <img
                src={DIVIDER_LOTUS}
                alt=""
                width={600}
                height={60}
                className="w-full mt-6 opacity-60"
                aria-hidden="true"
                loading="lazy"
              />
            </div>
          </aside>
        </div>
      </section>

      {/* SECTION 4: Mantra */}
      <section className="relative bg-[#2A1810] py-16 md:py-24 text-center overflow-hidden">
        <img
          src={CONSTELLATION}
          alt=""
          width={300}
          height={240}
          className="absolute top-4 right-4 opacity-20"
          aria-hidden="true"
          loading="lazy"
        />

        <div className="relative max-w-3xl mx-auto px-4">
          <img
            src={SEC_NUM_02}
            alt=""
            width={120}
            height={60}
            className="mx-auto mb-4"
            aria-hidden="true"
            loading="lazy"
          />
          <h2 className="font-devanagari text-3xl md:text-5xl text-[#D4A11E] mb-4 leading-relaxed" lang="sa">
            ॐ श्रां श्रीं श्रौं सः चन्द्रमसे नमः
          </h2>
          <p className="font-poppins italic text-white/80 text-lg mb-2">
            Om Shraam Shreem Shraum Sah Chandramasay Namah
          </p>
          <p className="font-poppins text-white/60 text-base mb-6 max-w-xl mx-auto">
            I bow to Chandra, the lord of Rohini nakshatra and the keeper of the mind.
          </p>
          <span className="inline-block border border-[#D4A11E]/50 text-[#D4A11E] font-poppins text-sm px-5 py-2 rounded-full">
            Chant 108 times on a pearl or white sphatik mala, on Mondays
          </span>

          <div className="mt-10">
            <p className="font-poppins text-white/50 text-xs uppercase tracking-widest mb-2">For daily practice</p>
            <p className="font-devanagari text-2xl text-[#D4A11E]/80 mb-1" lang="sa">
              ॐ सों सोमाय नमः
            </p>
            <p className="font-poppins italic text-white/60 text-sm">
              Om Som Somaya Namah
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5: Characteristics */}
      <section className="bg-[#FAF6EC] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <img src={SEC_NUM_03} alt="" width={120} height={60} className="mb-2" aria-hidden="true" loading="lazy" />
          <h2 className="font-kalam text-3xl text-[#2A2438] mb-8">
            Rohini Natives: Gifts and Shadows
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Strengths */}
            <div className="bg-white rounded-2xl p-6 shadow-sm" style={{ borderTop: '4px solid #65a30d' }}>
              <div className="inline-block bg-[#d1fae5] text-[#065f46] font-poppins font-semibold text-sm rounded px-4 py-2 mb-4">
                Strengths of Rohini Moon
              </div>
              <ul className="space-y-3">
                {STRENGTHS.map((s) => (
                  <li key={s} className="flex items-start gap-3 font-poppins text-sm text-[#2A2438]">
                    <CheckCircle className="text-[#059669] w-5 h-5 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Shadows */}
            <div className="bg-white rounded-2xl p-6 shadow-sm" style={{ borderTop: '4px solid #C84F3F' }}>
              <div className="inline-block bg-[#fee2e2] text-[#991b1b] font-poppins font-semibold text-sm rounded px-4 py-2 mb-4">
                Shadows and Challenges
              </div>
              <ul className="space-y-3">
                {SHADOWS.map((s) => (
                  <li key={s} className="flex items-start gap-3 font-poppins text-sm text-[#2A2438]">
                    <AlertTriangle className="text-[#dc2626] w-5 h-5 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="font-caveat text-2xl text-[#5C4A2A] italic text-center mt-8 max-w-2xl mx-auto">
            The gifts of Rohini are real and lasting. So is the hunger. The work is learning which desires to feed.
          </p>

          <img
            src={DIVIDER_STARS}
            alt=""
            width={600}
            height={60}
            className="mx-auto mt-8 opacity-50"
            aria-hidden="true"
            loading="lazy"
          />
        </div>
      </section>

      {/* SECTION 6: Rohini Moon in 12 Houses */}
      <section className="bg-[#FAF6EC] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-kalam text-3xl text-[#2A2438]">
              Rohini Moon in Each of the 12 Houses
            </h2>
            <p className="font-poppins text-xs uppercase tracking-widest text-[#D4A11E] mt-2">
              How Chandra Expresses Himself Across Bhavas
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {HOUSES.map((h) => (
              <article
                key={h.num}
                className="bg-white rounded-2xl p-4 shadow-sm"
                style={{ border: '1px solid #E5D5B0' }}
              >
                <div className="w-8 h-8 rounded-full bg-[#FEF3C7] text-[#D4A11E] font-kalam font-bold text-sm flex items-center justify-center mb-3">
                  {h.num}
                </div>
                <h3 className="font-kalam text-base text-[#2A2438] mb-1">{h.name}</h3>
                <p className="font-poppins text-xs text-[#5C4A2A] leading-relaxed m-0">
                  {h.desc}
                </p>
              </article>
            ))}
          </div>

          <p className="font-caveat text-lg text-[#D4A11E] italic text-center mt-6">
            The Moon in Rohini seeks beauty, love, and emotional nourishment in every area of life.
          </p>
        </div>
      </section>

      {/* SECTION 7: Story of Rohini */}
      <section className="bg-[#FAF6EC] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-kalam text-3xl text-[#2A2438] mb-6 text-center">
            The Story of Rohini
          </h2>

          <div className="relative max-w-4xl mx-auto">
            <img
              src={SCROLL_FRAME}
              alt="Ancient parchment scroll"
              width={1200}
              height={800}
              className="w-full"
              loading="lazy"
            />
            <div className="absolute inset-0 flex items-center justify-center px-[12%] py-[25%]">
              <div className="text-center max-w-2xl">
                <p className="font-kalam text-base md:text-xl text-[#2A2438] leading-relaxed mb-4">
                  Chandra married the 27 daughters of Prajapati Daksha, who became the 27 Nakshatras. But Chandra was deeply enamored by Rohini, the fourth among them.
                </p>
                <p className="font-poppins text-xs md:text-base text-[#5C4A2A] leading-relaxed mb-4">
                  He spent most of his time with her, neglecting the others. Angered by this partiality, the other wives complained to their father. Daksha cursed Chandra to wane away and lose his brilliance.
                </p>
                <p className="font-poppins text-xs md:text-base text-[#5C4A2A] leading-relaxed">
                  The Devas pleaded for Chandra, and the curse was softened. So Chandra now waxes and wanes every month. This is why Rohini is the seat of longing, desire, and emotional depth.
                </p>
              </div>
            </div>
          </div>

          <img
            src={DOODLE_MOON}
            alt=""
            width={300}
            height={225}
            className="mx-auto mt-4 opacity-40"
            aria-hidden="true"
            loading="lazy"
          />
        </div>
      </section>

      {/* SECTION 8: Classical Vedic Remedies */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <img
          src={REMEDIES_BG}
          alt=""
          width={1400}
          height={900}
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[#2A1810]/85" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <img
            src={DIVIDER_OM}
            alt=""
            width={600}
            height={60}
            className="mx-auto mb-8 opacity-60"
            aria-hidden="true"
            loading="lazy"
          />
          <h2 className="font-kalam text-3xl md:text-4xl text-[#D4A11E] text-center mb-2">
            Classical Vedic Remedies for Rohini Moon
          </h2>
          <p className="font-poppins text-white/60 text-xs md:text-sm text-center mb-10 uppercase tracking-widest">
            For an Afflicted or Weakened Chandra
          </p>

          <ol className="space-y-6">
            {REMEDIES.map((r, i) => (
              <li key={r.main} className="flex gap-4 items-start border-b border-white/10 pb-5">
                <span className="font-caveat text-2xl text-[#D4A11E] w-10 flex-shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <p className="font-poppins text-white font-semibold text-base mb-1">{r.main}</p>
                  <p className="font-poppins text-white/70 text-sm leading-relaxed m-0">{r.sub}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* SECTION 9: FAQ Accordion */}
      <section className="bg-[#FAF6EC] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-kalam text-3xl text-center mb-2">
            <span className="text-[#2A2438]">Frequently Asked </span>
            <span className="text-[#D4A11E]">Questions</span>
          </h2>
          <p className="font-poppins text-[#5C4A2A] text-sm text-center mb-8">
            Your top questions about Rohini nakshatra, answered with clarity
          </p>

          <div className="space-y-3">
            {FAQS.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={faq.q}
                  className="bg-white rounded-2xl shadow-sm overflow-hidden"
                  style={{ borderLeft: '3px solid #D4A11E' }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`rohini-faq-${i}`}
                    className="w-full flex items-center justify-between gap-3 text-left hover:bg-[#FEF3C7]/40 transition-colors px-5 py-4 cursor-pointer"
                  >
                    <span className="font-poppins font-semibold text-sm md:text-base text-[#2A2438] flex-1">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 flex-shrink-0 text-[#D4A11E] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                      aria-hidden="true"
                    />
                  </button>
                  {isOpen && (
                    <div
                      id={`rohini-faq-${i}`}
                      className="px-5 pb-5 font-poppins text-sm md:text-base text-[#5C4A2A] leading-relaxed"
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 10: CTA Banner */}
      <section
        className="py-16 px-6 text-center"
        style={{ background: 'linear-gradient(135deg, #D4A11E 0%, #F5EFD9 100%)' }}
      >
        <img
          src={WASHI_AMBER}
          alt=""
          width={200}
          height={40}
          className="mx-auto mb-6 opacity-70"
          aria-hidden="true"
          loading="lazy"
        />
        <h2 className="font-kalam text-3xl md:text-4xl text-[#2A2438] mb-4">
          Want a Personalised Rohini Reading?
        </h2>
        <p className="font-poppins text-base text-[#5C4A2A] max-w-xl mx-auto mb-8">
          Saurabh Jain at Soul Infinity reads your Moon placement, nakshatra pada, dasha timing, and planetary aspects to show exactly how Rohini expresses in your specific chart.
        </p>
        <a
          href="/contact#contact-form-section"
          className="inline-block bg-[#2A1810] hover:bg-[#3d2515] text-[#FAF6EC] font-poppins font-semibold px-8 py-4 rounded-full text-base transition-colors"
        >
          Book a Consultation
        </a>
      </section>
    </>
  );
}
