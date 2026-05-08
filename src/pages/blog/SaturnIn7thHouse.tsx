import { useState } from "react";
import { Helmet } from "react-helmet-async";

// ─── Types ────────────────────────────────────────────────────────────────────
interface AccordionItemProps {
  number: string;
  title: string;
  content: string;
}

interface RemedyCardProps {
  icon: string;
  title: string;
  subtitle: string;
}

interface FAQItemProps {
  question: string;
  answer: string;
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function AccordionItem({ number, title, content }: AccordionItemProps) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border-b border-white/10 py-4 cursor-pointer"
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="text-[#D4AF37] font-mono text-sm font-bold w-6 shrink-0">
            {number}
          </span>
          <span className="text-white/90 font-semibold text-base">{title}</span>
        </div>
        <span className="text-[#D4AF37] text-xl shrink-0">{open ? "−" : "+"}</span>
      </div>
      {open && (
        <div className="mt-3 ml-10 text-white/70 text-sm leading-relaxed">
          {content}
        </div>
      )}
    </div>
  );
}

function RemedyCard({ icon, title, subtitle }: RemedyCardProps) {
  return (
    <div className="bg-white/5 border border-[#D4AF37]/20 rounded-xl p-4 flex flex-col items-center text-center gap-2 hover:border-[#D4AF37]/50 transition-all duration-300">
      <span className="text-3xl">{icon}</span>
      <p className="text-white/90 text-sm font-semibold leading-tight">{title}</p>
      {subtitle && (
        <p className="text-white/50 text-xs leading-tight">{subtitle}</p>
      )}
    </div>
  );
}

function FAQItem({ question, answer }: FAQItemProps) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border-b border-white/10 py-4 cursor-pointer"
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="text-white/85 text-sm font-medium">{question}</span>
        <span className="text-[#D4AF37] text-lg shrink-0">{open ? "−" : "+"}</span>
      </div>
      {open && (
        <p className="mt-3 text-white/65 text-sm leading-relaxed">{answer}</p>
      )}
    </div>
  );
}

// ─── Saturn Wheel SVG ─────────────────────────────────────────────────────────
function SaturnWheel() {
  return (
    <svg viewBox="0 0 200 200" className="w-full max-w-[180px] mx-auto opacity-90">
      <circle cx="100" cy="100" r="90" fill="none" stroke="#D4AF37" strokeWidth="1" strokeDasharray="4 6" opacity="0.4" />
      <circle cx="100" cy="100" r="70" fill="none" stroke="#8B93A7" strokeWidth="0.5" opacity="0.3" />
      <circle cx="100" cy="100" r="50" fill="none" stroke="#D4AF37" strokeWidth="0.5" opacity="0.2" />
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x1 = 100 + 50 * Math.cos(angle);
        const y1 = 100 + 50 * Math.sin(angle);
        const x2 = 100 + 90 * Math.cos(angle);
        const y2 = 100 + 90 * Math.sin(angle);
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="#8B93A7" strokeWidth="0.5" opacity="0.4" />
        );
      })}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = ((i * 30 + 15) * Math.PI) / 180;
        const x = 100 + 62 * Math.cos(angle);
        const y = 100 + 62 * Math.sin(angle);
        return (
          <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="middle"
            fill="#8B93A7" fontSize="8" opacity="0.6">
            {i + 1}
          </text>
        );
      })}
      <text x="100" y="168" textAnchor="middle" dominantBaseline="middle"
        fill="#D4AF37" fontSize="18" fontWeight="bold">
        &#9794;
      </text>
      <circle cx="100" cy="100" r="3" fill="#D4AF37" opacity="0.6" />
      <text x="100" y="195" textAnchor="middle" fill="#8B93A7" fontSize="7">
        Saturn in 7th House
      </text>
    </svg>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function SaturnIn7thHouse() {
  const glanceItems = [
    { icon: "⏳", label: "Delays marriage,\nrarely denies" },
    { icon: "🧿", label: "Gives mature\nspouse" },
    { icon: "⚖️", label: "Strong karmic\npartnerships" },
    { icon: "🌙", label: "Marriage improves\nafter 30" },
    { icon: "🔗", label: "Stable long-term\nunions" },
  ];

  const accordionItems: AccordionItemProps[] = [
    {
      number: "01",
      title: "Delay in Marriage — Not Denial",
      content:
        "Saturn in the 7th delays marriage typically until age 28-35, but this is karmic preparation rather than denial. The native must reach emotional and financial maturity before Saturn grants a lasting union. When Saturn is strong in Capricorn, Aquarius, or exalted in Libra, the delay is shorter and the marriage more stable.",
    },
    {
      number: "02",
      title: "Nature of the Spouse",
      content:
        "The spouse is typically mature, serious, and older in appearance or mindset. They tend to be hardworking, responsible, and practical rather than flamboyant. Saturn's influence on the 7th house often attracts partners who are career-focused, disciplined, and reliable — qualities that build lasting bonds over romantic passion.",
    },
    {
      number: "03",
      title: "Marriage Quality and Longevity",
      content:
        "Once Saturn grants marriage, it tends to endure. Partners grow through shared responsibilities, mutual duty and patient commitment. Sasa Yoga can form when Saturn occupies Capricorn or Aquarius in the 7th, bringing authority and prosperity to the native.",
    },
    {
      number: "04",
      title: "Business Partnerships",
      content:
        "The 7th house governs all one-to-one partnerships including business. Saturn here gives slow but reliable collaborations. Partners are typically older, established and methodical. Initial progress may feel frustratingly slow, but long-term associations tend to be stable and mutually beneficial.",
    },
    {
      number: "05",
      title: "Ascendant-wise Variations",
      content:
        "Results differ significantly by Lagna. For Taurus and Libra ascendants, Saturn is yogakaraka and gives exceptional results in the 7th. For Cancer and Leo ascendants, Saturn rules difficult houses and creates more challenges in marriage. Always assess Saturn's sign, strength, and aspects before final judgment.",
    },
  ];

  const remedies: RemedyCardProps[] = [
    { icon: "🕉️", title: "Saturday Fast and Shani Mantra", subtitle: "Om Sham Shanicharaya Namah" },
    { icon: "🫘", title: "Donate Black Sesame Seeds and Mustard Oil", subtitle: "On Saturdays" },
    { icon: "🙏", title: "Serve and Respect Elderly People", subtitle: "" },
    { icon: "🙌", title: "Chant Hanuman Chalisa on Saturdays", subtitle: "" },
    { icon: "💎", title: "Blue Sapphire", subtitle: "Only after proper consultation" },
    { icon: "📊", title: "Check Navamsa Chart", subtitle: "Before any marriage prediction" },
  ];

  const faqs: FAQItemProps[] = [
    {
      question: "Does Saturn in the 7th house always cause late marriage?",
      answer:
        "Not always, but it is common. Saturn delays results in whichever house it occupies. For the 7th house, this typically means marriage after age 28-32. The exact timing depends on Saturn's strength, the Navamsa chart, and the running Dasha period.",
    },
    {
      question: "Can Saturn in the 7th house cause divorce?",
      answer:
        "A severely afflicted Saturn, especially when conjunct Rahu or Mars in the 7th, can create serious marital tension or separation. However, Saturn alone rarely causes divorce. It more often creates emotional distance or a dutiful-but-cold dynamic. Proper Navamsa analysis and Dasha timing are essential.",
    },
    {
      question: "What is Sasa Yoga and how does it form in the 7th house?",
      answer:
        "Sasa Yoga is one of the Pancha Mahapurusha Yogas. It forms when Saturn occupies a Kendra in its own sign (Capricorn or Aquarius) or its exaltation sign (Libra). When it forms in the 7th, it gives authority, a commanding personality and often a stable and prosperous partnership.",
    },
    {
      question: "Which ascendants benefit most from Saturn in the 7th house?",
      answer:
        "Taurus and Libra ascendants benefit most as Saturn is their yogakaraka planet. Capricorn and Aquarius ascendants also do well. Cancer and Leo ascendants face more challenges as Saturn rules difficult houses for them.",
    },
    {
      question: "How do I know if my Saturn in the 7th house is strong or weak?",
      answer:
        "Check Saturn's sign: it is strong in Capricorn, Aquarius and Libra, and weak in Aries (debilitation). Also check for aspects: benefic aspects from Jupiter strengthen Saturn, while Rahu or Mars conjunctions weaken it. The Navamsa chart confirms the final strength.",
    },
  ];

  const tocItems = [
    "7th House Meaning",
    "Saturn's Nature",
    "Effects in 7th House",
    "Delay in Marriage",
    "Spouse Traits",
    "Marriage Quality",
    "Business Partnerships",
    "Ascendant Variations",
    "Classical Reference",
    "Practitioner Insight",
    "Remedies",
    "FAQ",
  ];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Saturn in the 7th House: What Shani Reveals About Marriage and Partnership",
    description:
      "Saturn in the 7th house delays marriage but builds lasting bonds. Discover how Shani shapes your spouse, partnerships and remedies from a K.N. Rao trained Jyotishi.",
    author: {
      "@type": "Person",
      name: "Saurabh Jain",
      description: "Vedic Astrologer trained at K.N. Rao Institute of Astrology, New Delhi",
    },
    publisher: {
      "@type": "Organization",
      name: "Soul Infinity",
      url: "https://www.soulinfinity.space",
    },
    url: "https://www.soulinfinity.space/blog/saturn-in-7th-house-vedic-astrology",
    datePublished: "2026-05-09",
    dateModified: "2026-05-09",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.soulinfinity.space" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.soulinfinity.space/blog" },
      {
        "@type": "ListItem",
        position: 3,
        name: "Saturn in 7th House",
        item: "https://www.soulinfinity.space/blog/saturn-in-7th-house-vedic-astrology",
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>Saturn in 7th House Vedic Astrology: Marriage, Spouse and Remedies | Soul Infinity</title>
        <meta
          name="description"
          content="Saturn in the 7th house delays marriage but builds lasting bonds. Discover how Shani shapes your spouse, partnerships and remedies from a K.N. Rao trained Jyotishi."
        />
        <link rel="canonical" href="https://www.soulinfinity.space/blog/saturn-in-7th-house-vedic-astrology" />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <div
        className="min-h-screen text-white"
        style={{
          background: "linear-gradient(135deg, #0B1020 0%, #1A2238 40%, #0B1020 100%)",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        {/* HERO */}
        <div
          className="relative overflow-hidden"
          style={{
            background:
              "radial-gradient(ellipse at 60% 40%, rgba(212,175,55,0.12) 0%, rgba(11,16,32,0) 70%), linear-gradient(180deg, #0D1525 0%, #1A2238 100%)",
            borderBottom: "1px solid rgba(212,175,55,0.15)",
          }}
        >
          {/* Saturn glyph watermark */}
          <div
            className="absolute right-8 top-8 pointer-events-none select-none"
            style={{
              fontSize: "180px",
              color: "rgba(212,175,55,0.06)",
              fontWeight: "bold",
              lineHeight: 1,
            }}
          >
            h
          </div>

          <div className="relative max-w-5xl mx-auto px-6 pt-8 pb-12">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-white/40 mb-8">
              <a href="/" className="hover:text-[#D4AF37] transition-colors">Home</a>
              <span>›</span>
              <a href="/blog" className="hover:text-[#D4AF37] transition-colors">Blog</a>
              <span>›</span>
              <span className="text-white/60">Saturn in 7th House</span>
            </nav>

            {/* Category tag */}
            <span
              className="inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-6"
              style={{
                background: "rgba(212,175,55,0.15)",
                border: "1px solid rgba(212,175,55,0.3)",
                color: "#D4AF37",
              }}
            >
              Vedic Astrology
            </span>

            {/* H1 */}
            <h1
              className="text-4xl md:text-5xl leading-tight mb-4"
              style={{ fontFamily: "'Caveat', cursive", color: "#D4AF37" }}
            >
              Saturn in the 7th House: What Shani Reveals About Marriage and Partnership
            </h1>

            <p className="text-white/70 text-base max-w-2xl mb-6 leading-relaxed">
              Saturn in the 7th house delays marriage but builds lasting bonds. Discover how Shani
              shapes your spouse, partnerships and remedies from a K.N. Rao trained Jyotishi.
            </p>

            <div className="flex items-center gap-5 text-xs text-white/40 mb-6">
              <span>&#128336; 16 min read</span>
              <span>&#128197; Updated May 11, 2025</span>
            </div>

            {/* Author */}
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-lg shrink-0"
                style={{
                  background: "rgba(212,175,55,0.2)",
                  border: "1px solid rgba(212,175,55,0.4)",
                }}
              >
                &#128302;
              </div>
              <div>
                <p className="text-white/90 text-sm font-semibold">By Saurabh Jain</p>
                <p className="text-white/45 text-xs">
                  Vedic Astrologer trained at K.N. Rao Institute of Astrology, New Delhi
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="max-w-5xl mx-auto px-6 py-10">
          <div className="flex flex-col lg:flex-row gap-10">

            {/* LEFT COLUMN */}
            <div className="flex-1 min-w-0 space-y-10">

              {/* Quick Insight Card */}
              <div
                className="rounded-2xl p-6"
                style={{
                  background: "rgba(212,175,55,0.06)",
                  border: "1px solid rgba(212,175,55,0.25)",
                }}
              >
                <h2
                  className="text-xl mb-5"
                  style={{ fontFamily: "'Caveat', cursive", color: "#D4AF37" }}
                >
                  Saturn in 7th House at a Glance
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {glanceItems.map((item, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center text-center gap-2 p-3 rounded-xl"
                      style={{ background: "rgba(255,255,255,0.04)" }}
                    >
                      <span className="text-2xl">{item.icon}</span>
                      <p className="text-white/70 text-xs leading-tight whitespace-pre-line">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 7th House and Saturn sections */}
              <div className="space-y-6">
                <div>
                  <h2
                    className="text-2xl mb-3"
                    style={{ fontFamily: "'Caveat', cursive", color: "#D4AF37" }}
                  >
                    What the 7th House Represents in Jyotish
                  </h2>
                  <p className="text-white/70 text-sm leading-relaxed">
                    The 7th house — known as Kalatra Bhava — governs marriage, long-term romantic
                    partnerships, business alliances, legal contracts and your public image. It sits
                    directly opposite the 1st house (Lagna), forming the axis of self and other. As
                    part of the Kama Trikona alongside the 3rd and 11th houses, it represents our
                    deepest desires for partnership and union. The strength and condition of this house
                    reveals how we relate to others on a one-to-one level, and what quality of
                    partnership karma we carry. Understanding this house is the foundation of any
                    marriage prediction in{" "}
                    <a href="/planets" className="text-[#D4AF37] hover:underline">
                      Vedic Jyotish
                    </a>
                    .
                  </p>
                </div>

                <div>
                  <h2
                    className="text-2xl mb-3"
                    style={{ fontFamily: "'Caveat', cursive", color: "#D4AF37" }}
                  >
                    Saturn's Nature as a Graha
                  </h2>
                  <p className="text-white/70 text-sm leading-relaxed">
                    <a href="/planets/saturn" className="text-[#D4AF37] hover:underline">
                      Saturn (Shani)
                    </a>{" "}
                    is the Karma karaka, the planet of discipline, structure, longevity and earned
                    results. He is a slow-moving Graha, spending approximately two and a half years in
                    each sign. Saturn owns Capricorn and Aquarius, is exalted in Libra, and debilitated
                    in Aries. The most important distinction to understand about Saturn is the difference
                    between delay and denial — Shani rarely takes away permanently. He makes you wait
                    until you are ready. His energy in any house forces mastery through patience before
                    the reward is granted.
                  </p>
                </div>
              </div>

              {/* Effects Accordion + Wheel */}
              <div
                className="rounded-2xl p-6"
                style={{
                  background: "rgba(26,34,56,0.8)",
                  border: "1px solid rgba(139,147,167,0.2)",
                }}
              >
                <h2
                  className="text-2xl mb-4"
                  style={{ fontFamily: "'Caveat', cursive", color: "#D4AF37" }}
                >
                  Effects of Saturn in the 7th House
                </h2>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    {accordionItems.map((item) => (
                      <AccordionItem key={item.number} {...item} />
                    ))}
                  </div>
                  <div className="md:w-48 flex items-center justify-center py-4">
                    <SaturnWheel />
                  </div>
                </div>
              </div>

              {/* Classical Reference */}
              <div
                className="rounded-2xl p-6 relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(139,107,40,0.15) 0%, rgba(90,70,20,0.1) 100%)",
                  border: "1px solid rgba(212,175,55,0.3)",
                }}
              >
                <div
                  className="absolute inset-0 opacity-5 pointer-events-none rounded-2xl"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(212,175,55,0.3) 20px, rgba(212,175,55,0.3) 21px)",
                  }}
                />
                <div className="relative flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-lg"
                    style={{
                      background: "rgba(212,175,55,0.2)",
                      border: "1px solid rgba(212,175,55,0.4)",
                    }}
                  >
                    &#128220;
                  </div>
                  <div>
                    <h2
                      className="text-2xl mb-3"
                      style={{ fontFamily: "'Caveat', cursive", color: "#D4AF37" }}
                    >
                      What the Ancients Said
                    </h2>
                    <blockquote
                      className="text-white/80 text-sm italic leading-relaxed border-l-2 pl-4 mb-3"
                      style={{ borderColor: "#D4AF37" }}
                    >
                      "When Saturn is in the 7th house, the spouse will be sober, trustworthy, and
                      hardworking, sometimes older in age."
                    </blockquote>
                    <p className="text-[#D4AF37]/70 text-xs">
                      — Phaladeepika, Chapter X, Shloka 18
                    </p>
                    <p className="text-white/60 text-sm mt-4 leading-relaxed">
                      Brihat Parashara Hora Shastra also notes that Saturn in the 7th can indicate a
                      spouse connected to service or labour — someone who has earned their position
                      through hard work rather than inheritance. The emphasis in classical texts is on
                      the eventual stability of the union rather than any early romantic ease. Reading
                      classical sources alongside the birth chart is the foundation of authentic
                      Jyotish practice.
                    </p>
                  </div>
                </div>
              </div>

              {/* Practitioner Insight */}
              <div
                className="rounded-2xl p-6"
                style={{
                  background: "rgba(11,16,32,0.8)",
                  border: "1px solid rgba(212,175,55,0.2)",
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">&#9997;&#65039;</span>
                  <h2
                    className="text-2xl"
                    style={{ fontFamily: "'Caveat', cursive", color: "#D4AF37" }}
                  >
                    A Practitioner's Observation
                  </h2>
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-4">
                  In charts of Aries ascendants,{" "}
                  <a href="/planets/saturn" className="text-[#D4AF37] hover:underline">
                    Saturn
                  </a>{" "}
                  in Libra in the 7th house — where it is exalted — often delays marriage until around
                  age 30-32, but creates remarkably stable partnerships afterward. The spouse is usually
                  responsible, career-oriented and pragmatic. Trained under the K.N. Rao methodology, I
                  have observed consistently that the Navamsa chart is the final arbiter — a strong
                  Saturn in the 7th of the Rasi chart paired with a benefic 7th lord in Navamsa almost
                  always results in a lasting and respectful marriage, even if the path to it involved
                  significant waiting.
                </p>
                <p
                  className="text-right italic text-[#D4AF37]/60"
                  style={{ fontFamily: "'Caveat', cursive", fontSize: "1.2rem" }}
                >
                  - Saurabh Jain
                </p>
              </div>

              {/* Remedies */}
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <h2
                    className="text-2xl"
                    style={{ fontFamily: "'Caveat', cursive", color: "#D4AF37" }}
                  >
                    Remedies for Saturn in the 7th House
                  </h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {remedies.map((r, i) => (
                    <RemedyCard key={i} {...r} />
                  ))}
                </div>
              </div>

              {/* FAQ */}
              <div>
                <h2
                  className="text-2xl mb-5"
                  style={{ fontFamily: "'Caveat', cursive", color: "#D4AF37" }}
                >
                  Frequently Asked Questions
                </h2>
                <div
                  className="rounded-2xl p-5"
                  style={{
                    background: "rgba(26,34,56,0.6)",
                    border: "1px solid rgba(139,147,167,0.15)",
                  }}
                >
                  {faqs.map((f, i) => (
                    <FAQItem key={i} {...f} />
                  ))}
                </div>
              </div>

              {/* Explore other Grahas */}
              <div
                className="rounded-2xl p-5"
                style={{
                  background: "rgba(26,34,56,0.5)",
                  border: "1px solid rgba(139,147,167,0.12)",
                }}
              >
                <p className="text-white/40 text-xs uppercase tracking-widest mb-3">
                  Explore Other Grahas
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { name: "Sun (Surya)", path: "/planets/sun" },
                    { name: "Moon (Chandra)", path: "/planets/moon" },
                    { name: "Mars (Mangal)", path: "/planets/mars" },
                    { name: "Mercury (Budha)", path: "/planets/mercury" },
                    { name: "Jupiter (Guru)", path: "/planets/jupiter" },
                    { name: "Venus (Shukra)", path: "/planets/venus" },
                    { name: "Rahu", path: "/planets/rahu" },
                    { name: "Ketu", path: "/planets/ketu" },
                  ].map((planet) => (
                    <a
                      key={planet.path}
                      href={planet.path}
                      className="text-xs px-3 py-1.5 rounded-full transition-all duration-200 hover:scale-105"
                      style={{
                        background: "rgba(212,175,55,0.1)",
                        border: "1px solid rgba(212,175,55,0.2)",
                        color: "#D4AF37",
                      }}
                    >
                      {planet.name}
                    </a>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div
                className="rounded-2xl p-8 text-center relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(212,175,55,0.15) 0%, rgba(26,34,56,0.9) 50%, rgba(139,107,40,0.1) 100%)",
                  border: "1px solid rgba(212,175,55,0.3)",
                }}
              >
                <div
                  className="absolute inset-0 opacity-10 pointer-events-none"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 50% 50%, rgba(212,175,55,0.4) 0%, transparent 70%)",
                  }}
                />
                <div className="relative">
                  <h2
                    className="text-3xl mb-3"
                    style={{ fontFamily: "'Caveat', cursive", color: "#D4AF37" }}
                  >
                    Still worried about marriage timing?
                  </h2>
                  <p className="text-white/65 text-sm mb-6 max-w-md mx-auto">
                    Get your 7th house and Navamsa analysed through a personalised Jyotish
                    consultation.
                  </p>
                  <a
                    href="/services"
                    className="inline-block px-8 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105"
                    style={{
                      background: "linear-gradient(135deg, #D4AF37, #A8862A)",
                      color: "#0B1020",
                    }}
                  >
                    Book Your Consultation →
                  </a>
                </div>
              </div>
            </div>

            {/* SIDEBAR */}
            <aside className="lg:w-56 shrink-0">
              <div
                className="sticky top-6 rounded-2xl p-5"
                style={{
                  background: "rgba(26,34,56,0.8)",
                  border: "1px solid rgba(139,147,167,0.15)",
                }}
              >
                <p className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-4">
                  On This Page
                </p>
                <ul className="space-y-2">
                  {tocItems.map((item, i) => (
                    <li key={i}>
                      <span className="flex items-center gap-2 text-xs text-white/50 hover:text-[#D4AF37] cursor-pointer transition-colors py-0.5">
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ background: "#D4AF37", opacity: 0.5 }}
                        />
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                <div
                  className="mt-6 p-4 rounded-xl text-center"
                  style={{
                    background: "rgba(212,175,55,0.08)",
                    border: "1px solid rgba(212,175,55,0.2)",
                  }}
                >
                  <p className="text-[#D4AF37] text-xs font-semibold mb-2">
                    Get a personalised reading
                  </p>
                  <a
                    href="/services"
                    className="inline-block text-xs px-4 py-2 rounded-full font-semibold transition-all duration-300 hover:scale-105"
                    style={{
                      background: "linear-gradient(135deg, #D4AF37, #A8862A)",
                      color: "#0B1020",
                    }}
                  >
                    Book Now
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
