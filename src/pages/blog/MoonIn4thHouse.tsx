import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

// ─── R2 Base URL ──────────────────────────────────────────────────────────────
const R2 = "https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Blog/Planets/Moon/4th-house";

// ─── Color System ─────────────────────────────────────────────────────────────
// Background:     #08101F
// Secondary bg:   #101A3A
// Moon glow:      #DDE7FF
// Silver accent:  #C8D4F0
// Soft indigo:    #7E8FCB
// White:          #F5F8FF
// Borders:        rgba(255,255,255,0.10)

// ─── Types ────────────────────────────────────────────────────────────────────
interface AccordionProps { number: string; title: string; content: string; }
interface RemedyProps { img: string; title: string; subtitle: string; }
interface FAQProps { question: string; answer: string; }
interface GrahaProps { name: string; sanskrit: string; path: string; color: string; }

// ─── Accordion ────────────────────────────────────────────────────────────────
function Accordion({ number, title, content }: AccordionProps) {
  const [open, setOpen] = useState(false);
  return (
    <div
      onClick={() => setOpen(!open)}
      style={{
        borderBottom: "1px solid rgba(200,212,240,0.12)",
        padding: "18px 0",
        cursor: "pointer",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ color: "#7E8FCB", fontFamily: "monospace", fontSize: 13, fontWeight: 600, minWidth: 24 }}>{number}</span>
          <span style={{ color: "#DDE7FF", fontSize: 15, fontWeight: 500, letterSpacing: "0.01em" }}>{title}</span>
        </div>
        <span style={{ color: "#C8D4F0", fontSize: 20, lineHeight: 1, flexShrink: 0, opacity: 0.7 }}>{open ? "−" : "+"}</span>
      </div>
      {open && (
        <div style={{ marginTop: 12, marginLeft: 40, color: "rgba(200,212,240,0.75)", fontSize: 14, lineHeight: 1.8 }}>
          {content}
        </div>
      )}
    </div>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
function FAQ({ question, answer }: FAQProps) {
  const [open, setOpen] = useState(false);
  return (
    <div
      onClick={() => setOpen(!open)}
      style={{
        borderBottom: "1px solid rgba(200,212,240,0.10)",
        padding: "16px 0",
        cursor: "pointer",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
        <span style={{ color: "#C8D4F0", fontSize: 14, lineHeight: 1.5, flex: 1 }}>{question}</span>
        <span style={{ color: "#7E8FCB", fontSize: 18, flexShrink: 0, marginTop: 1 }}>{open ? "−" : "+"}</span>
      </div>
      {open && (
        <p style={{ marginTop: 10, color: "rgba(200,212,240,0.65)", fontSize: 13, lineHeight: 1.8 }}>{answer}</p>
      )}
    </div>
  );
}

// ─── Remedy Card ──────────────────────────────────────────────────────────────
function RemedyCard({ img, title, subtitle }: RemedyProps) {
  return (
    <div style={{
      background: "rgba(16,26,58,0.8)",
      border: "1px solid rgba(200,212,240,0.12)",
      borderRadius: 16,
      padding: "24px 16px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      gap: 14,
      transition: "border-color 0.3s",
    }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(200,212,240,0.35)")}
      onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(200,212,240,0.12)")}
    >
      <div style={{ width: 72, height: 72, borderRadius: "50%", overflow: "hidden", background: "rgba(126,143,203,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img src={img} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
      </div>
      <div>
        <p style={{ color: "#DDE7FF", fontSize: 13, fontWeight: 500, lineHeight: 1.4, margin: 0 }}>{title}</p>
        {subtitle && <p style={{ color: "rgba(200,212,240,0.55)", fontSize: 12, marginTop: 4, lineHeight: 1.4 }}>{subtitle}</p>}
      </div>
    </div>
  );
}

// ─── Graha Card ───────────────────────────────────────────────────────────────
function GrahaCard({ name, sanskrit, path, color }: GrahaProps) {
  return (
    <Link to={path} style={{ textDecoration: "none" }}>
      <div style={{
        background: "rgba(16,26,58,0.6)",
        border: "1px solid rgba(200,212,240,0.10)",
        borderRadius: 14,
        padding: "16px 12px",
        textAlign: "center",
        transition: "all 0.3s",
        cursor: "pointer",
      }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = color;
          e.currentTarget.style.background = "rgba(16,26,58,0.9)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = "rgba(200,212,240,0.10)";
          e.currentTarget.style.background = "rgba(16,26,58,0.6)";
        }}
      >
        <div style={{ width: 48, height: 48, borderRadius: "50%", background: `${color}22`, border: `1px solid ${color}44`, margin: "0 auto 10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 20 }}>&#9728;&#65039;</span>
        </div>
        <p style={{ color: "#DDE7FF", fontSize: 13, fontWeight: 500, margin: 0 }}>{name}</p>
        <p style={{ color: "rgba(200,212,240,0.45)", fontSize: 11, margin: "3px 0 0" }}>{sanskrit}</p>
      </div>
    </Link>
  );
}

// ─── Moon Wheel SVG ───────────────────────────────────────────────────────────
function MoonWheel() {
  return (
    <svg viewBox="0 0 260 260" style={{ width: "100%", maxWidth: 220, margin: "0 auto", display: "block" }}>
      <defs>
        <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#DDE7FF" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#DDE7FF" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="130" cy="130" r="120" fill="url(#moonGlow)" />
      <circle cx="130" cy="130" r="110" fill="none" stroke="rgba(200,212,240,0.15)" strokeWidth="1" strokeDasharray="3 5" />
      <circle cx="130" cy="130" r="85" fill="none" stroke="rgba(200,212,240,0.1)" strokeWidth="0.5" />
      <circle cx="130" cy="130" r="58" fill="none" stroke="rgba(126,143,203,0.2)" strokeWidth="0.5" />
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x1 = 130 + 58 * Math.cos(angle - Math.PI / 2);
        const y1 = 130 + 58 * Math.sin(angle - Math.PI / 2);
        const x2 = 130 + 110 * Math.cos(angle - Math.PI / 2);
        const y2 = 130 + 110 * Math.sin(angle - Math.PI / 2);
        const lx = 130 + 96 * Math.cos(((i * 30 + 15) * Math.PI) / 180 - Math.PI / 2);
        const ly = 130 + 96 * Math.sin(((i * 30 + 15) * Math.PI) / 180 - Math.PI / 2);
        return (
          <g key={i}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(200,212,240,0.12)" strokeWidth="0.5" />
            <text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" fill="rgba(200,212,240,0.4)" fontSize="9">{i + 1}</text>
          </g>
        );
      })}
      {/* Moon in 4th house highlight */}
      <path d={`M 130 130 L ${130 + 110 * Math.cos((3 * 30 * Math.PI) / 180 - Math.PI / 2)} ${130 + 110 * Math.sin((3 * 30 * Math.PI) / 180 - Math.PI / 2)} A 110 110 0 0 1 ${130 + 110 * Math.cos((4 * 30 * Math.PI) / 180 - Math.PI / 2)} ${130 + 110 * Math.sin((4 * 30 * Math.PI) / 180 - Math.PI / 2)} Z`}
        fill="rgba(221,231,255,0.08)" stroke="rgba(221,231,255,0.3)" strokeWidth="0.5" />
      {/* Moon symbol */}
      <text x="130" y="56" textAnchor="middle" dominantBaseline="middle" fill="#DDE7FF" fontSize="22" opacity="0.9">&#9790;</text>
      {/* Center */}
      <circle cx="130" cy="130" r="4" fill="#7E8FCB" opacity="0.6" />
      <text x="130" y="252" textAnchor="middle" fill="rgba(200,212,240,0.35)" fontSize="8">Moon in 4th House</text>
    </svg>
  );
}

// ─── Insight Card ─────────────────────────────────────────────────────────────
function InsightCard({ img, title, subtitle }: { img: string; title: string; subtitle: string }) {
  return (
    <div style={{
      background: "rgba(16,26,58,0.7)",
      border: "1px solid rgba(200,212,240,0.12)",
      borderRadius: 16,
      padding: "24px 16px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      gap: 12,
      backdropFilter: "blur(8px)",
    }}>
      <div style={{ width: 64, height: 64, borderRadius: "50%", overflow: "hidden", background: "rgba(126,143,203,0.12)", border: "1px solid rgba(200,212,240,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img src={img} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
      </div>
      <div>
        <p style={{ color: "#DDE7FF", fontSize: 14, fontWeight: 600, margin: 0, letterSpacing: "0.01em" }}>{title}</p>
        <p style={{ color: "rgba(200,212,240,0.6)", fontSize: 12, margin: "5px 0 0", lineHeight: 1.5 }}>{subtitle}</p>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function MoonIn4thHouse() {
  const accordionItems: AccordionProps[] = [
    {
      number: "01",
      title: "Bond with Mother",
      content: "The mother is the emotional cornerstone of the native's life. When Moon is strong , in Cancer, Taurus (exaltation), or Pisces , the mother is nurturing, emotionally present, and deeply influential. When afflicted by Rahu, Ketu, or Saturn, the bond can be complex: physically present but emotionally distant, or separated early. The 4th house Moon native carries their mother's emotional imprint throughout life.",
    },
    {
      number: "02",
      title: "Emotional Nature and Mood",
      content: "Moon here makes emotions the primary lens through which life is experienced. The native is deeply intuitive, empathetic, and sensitive. Home atmosphere directly affects mental state , a harmonious home creates a calm mind, a disturbed home creates emotional turbulence. The native finds peace through familiar environments, routines, and the presence of loved ones.",
    },
    {
      number: "03",
      title: "Property, Vehicles and Comfort",
      content: "A strong Moon in the 4th blesses the native with property, good vehicles, and domestic comfort. Real estate investments tend to be fortunate. The native is drawn to creating beautiful, comfortable living spaces. A weak or afflicted Moon here can bring property disputes, instability of residence, or frequent relocations before finding lasting settlement.",
    },
    {
      number: "04",
      title: "Ancestral Karma and Moksha Connection",
      content: "The 4th house is one of the Moksha trikona houses alongside the 8th and 12th. Moon here connects the native strongly to ancestral karma , particularly through the maternal line. The native may feel drawn to serve the mother, honour ancestral traditions, or pursue spiritual practices that bring inner peace. Ancestral remedies such as pitru tarpan and matru seva are especially effective.",
    },
    {
      number: "05",
      title: "Ascendant-wise Variations",
      content: "For Cancer ascendant, Moon rules the Lagna and sits in its own 4th house , extremely powerful, gives emotional stability and prosperity. For Taurus ascendant, Moon is exalted in the 4th creating exceptional comfort and domestic happiness. For Scorpio ascendant, Moon rules the 9th and sits in the 4th , very auspicious for dharma and spiritual growth.",
    },
  ];

  const remedies: RemedyProps[] = [
    { img: `${R2}/moon-water-offering.webp`, title: "Monday Fast and Chanting", subtitle: "Om Chandraya Namah" },
    { img: `${R2}/moon-water-offering.webp`, title: "Offer Water to the Moon", subtitle: "On Purnima (full moon)" },
    { img: `${R2}/silver-bracelet-remedy.webp`, title: "Wear Silver", subtitle: "Bracelet or chain" },
    { img: `${R2}/silver-glass-remedy.webp`, title: "Drink Water in a Silver Glass", subtitle: "Daily practice" },
    { img: `${R2}/moon-water-offering.webp`, title: "Serve Your Mother", subtitle: "Even a small daily gesture" },
    { img: `${R2}/white-donation-bowl.webp`, title: "Donate White Items", subtitle: "Rice, milk, white cloth on Mondays" },
  ];

  const faqs: FAQProps[] = [
    {
      question: "Is Moon in the 4th house always good?",
      answer: "Generally yes, but results depend on Moon's sign and aspects. Moon in Cancer, Taurus, or Pisces in the 4th is excellent. An afflicted Moon , conjunct Rahu, Saturn, or Mars , can bring emotional instability, property issues, or complicated mother relationships despite the strong house placement.",
    },
    {
      question: "What happens when Moon is afflicted in the 4th house?",
      answer: "Affliction can manifest as emotional turbulence, frequent home changes, property disputes, or emotional distance from the mother. Rahu conjunct Moon in the 4th creates obsessive emotional patterns. Saturn here delays property acquisition and can create emotional coldness. Remedies and Navamsa analysis are essential.",
    },
    {
      question: "Does Moon in 4th house guarantee property ownership?",
      answer: "A strong Moon in the 4th significantly favours property ownership, often before age 35. However, the 4th lord's condition, Saturn's placement, and the running Dasha period all influence timing. A Moon in Scorpio (debilitation) or afflicted by Mars may bring property-related struggles before eventual settlement.",
    },
    {
      question: "How does Moon in 4th house affect the mother's health?",
      answer: "The Moon represents the mother in Vedic astrology. An afflicted Moon in the 4th can indicate the mother's health challenges or emotional unavailability. A strong, well-aspected Moon typically indicates a long-lived, nurturing mother who is a source of strength throughout life.",
    },
    {
      question: "Which ascendants benefit most from Moon in 4th house?",
      answer: "Cancer ascendant (Moon rules Lagna, sitting in own 4th), Taurus ascendant (exalted Moon in 4th), and Pisces ascendant (Moon rules the 5th, auspicious 5th lord in Kendra). Scorpio ascendant also benefits well as Moon rules the 9th (dharma) and sits in the 4th Kendra.",
    },
  ];

  const grahas: GrahaProps[] = [
    { name: "Sun", sanskrit: "Surya", path: "/planets/sun", color: "#F59E0B" },
    { name: "Mars", sanskrit: "Mangal", path: "/planets/mars", color: "#EF4444" },
    { name: "Mercury", sanskrit: "Budha", path: "/planets/mercury", color: "#10B981" },
    { name: "Jupiter", sanskrit: "Guru", path: "/planets/jupiter", color: "#F59E0B" },
    { name: "Venus", sanskrit: "Shukra", path: "/planets/venus", color: "#EC4899" },
    { name: "Saturn", sanskrit: "Shani", path: "/planets/saturn", color: "#6366F1" },
    { name: "Rahu", sanskrit: "North Node", path: "/planets/rahu", color: "#8B5CF6" },
    { name: "Ketu", sanskrit: "South Node", path: "/planets/ketu", color: "#6B7280" },
  ];

  // Schemas
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Moon in the 4th House: Why Chandra Finds Peace in Sukh Bhava",
    description: "Moon in the 4th house is its most natural placement in Jyotish , Moon has digbala here. Discover how Chandra shapes your bond with your mother, emotional security, and inner peace.",
    author: { "@type": "Person", name: "Saurabh Jain", description: "Vedic Astrologer trained at K.N. Rao Institute of Astrology, New Delhi" },
    publisher: { "@type": "Organization", name: "Soul Infinity", url: "https://www.soulinfinity.space" },
    url: "https://www.soulinfinity.space/blog/moon-in-4th-house-vedic-astrology",
    datePublished: "2026-05-09",
    dateModified: "2026-05-09",
    image: `${R2}/hero-moon-lake-glow.webp`,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(f => ({
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
      { "@type": "ListItem", position: 3, name: "Moon in 4th House", item: "https://www.soulinfinity.space/blog/moon-in-4th-house-vedic-astrology" },
    ],
  };

  const glass: React.CSSProperties = {
    background: "rgba(16,26,58,0.75)",
    border: "1px solid rgba(200,212,240,0.12)",
    borderRadius: 20,
    backdropFilter: "blur(12px)",
  };

  return (
    <>
      <Helmet>
        <title>Moon in 4th House Vedic Astrology: Mother, Home and Inner Peace | Soul Infinity</title>
        <meta name="description" content="Moon in the 4th house is its most natural placement in Jyotish. Moon has digbala here. Discover how Chandra shapes your bond with your mother, emotional security and inner peace." />
        <link rel="canonical" href="https://www.soulinfinity.space/blog/moon-in-4th-house-vedic-astrology" />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <div style={{ background: "#08101F", minHeight: "100vh", color: "#F5F8FF", fontFamily: "'Poppins', sans-serif", overflowX: "hidden" }}>

        {/* HERO */}
        <section style={{ position: "relative", display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "center" }} className="moon-hero">
          <style>{`
            @media (max-width: 900px) {
              .moon-hero { grid-template-columns: 1fr !important; min-height: auto !important; }
              .moon-hero-content { padding: 40px 24px 60px !important; }
              .moon-insights { grid-template-columns: repeat(2, 1fr) !important; }
              .moon-split { grid-template-columns: 1fr !important; }
              .moon-remedies { grid-template-columns: repeat(2, 1fr) !important; }
              .moon-grahas { grid-template-columns: repeat(4, 1fr) !important; }
              .moon-faq-cta { grid-template-columns: 1fr !important; }
            }
            @media (max-width: 520px) {
              .moon-insights { grid-template-columns: 1fr !important; }
              .moon-remedies { grid-template-columns: repeat(2, 1fr) !important; }
              .moon-grahas { grid-template-columns: repeat(3, 1fr) !important; }
            }
          `}</style>

          {/* Left hero image */}
          <div className="moon-hero-img" style={{ position: "relative", overflow: "hidden" }}>
            <img
              src={`${R2}/hero-moon-lake-glow.webp`}
              alt="Luminous full Moon reflected on a still lake, Moon in 4th house Vedic astrology"
              style={{ width: "100%", height: "auto", display: "block" }}
              fetchpriority="high"
            />
          </div>

          {/* Right editorial content */}
          <div className="moon-hero-content" style={{ padding: "80px 56px 80px 40px", position: "relative", zIndex: 2 }}>
            {/* Breadcrumb */}
            <nav style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 12, color: "rgba(200,212,240,0.45)", marginBottom: 32 }}>
              <a href="/" style={{ color: "inherit", textDecoration: "none" }}>Home</a>
              <span>›</span>
              <a href="/blog" style={{ color: "inherit", textDecoration: "none" }}>Blog</a>
              <span>›</span>
              <span style={{ color: "rgba(200,212,240,0.7)" }}>Moon in 4th House</span>
            </nav>

            {/* Tag */}
            <span style={{ display: "inline-block", fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#7E8FCB", border: "1px solid rgba(126,143,203,0.35)", padding: "5px 14px", borderRadius: 100, marginBottom: 28 }}>
              Vedic Astrology
            </span>

            {/* H1 */}
            <h1 style={{ fontFamily: "'Caveat', cursive", fontSize: "clamp(2.4rem, 4.5vw, 3.4rem)", lineHeight: 1.15, color: "#DDE7FF", margin: "0 0 16px", fontWeight: 700 }}>
              Moon in the 4th House: Why Chandra Finds Peace in Sukh Bhava
            </h1>

            {/* Gold divider */}
            <div style={{ width: 64, height: 2, background: "linear-gradient(to right, #C8D4F0, transparent)", borderRadius: 2, margin: "0 0 24px" }} />

            {/* Hook */}
            <p style={{ fontSize: "1.1rem", color: "#C8D4F0", lineHeight: 1.65, margin: "0 0 10px", fontStyle: "italic" }}>
              Of all the 12 houses, the 4th is where the Moon breathes easiest.
            </p>
            <p style={{ fontSize: 14, color: "rgba(200,212,240,0.65)", lineHeight: 1.75, margin: "0 0 32px" }}>
              Moon has digbala in the 4th house and is also the natural significator of this house, making it one of the most emotionally powerful placements in Jyotish.
            </p>

            {/* Meta row */}
            <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <img
                  src="https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Author/saurabh-jain-profile.webp"
                  alt="Saurabh Jain - Vedic Astrologer trained at K.N. Rao Institute"
                  width={36}
                  height={36}
                  loading="lazy"
                  style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
                />
                <div>
                  <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#DDE7FF" }}>Saurabh Jain</p>
                  <p style={{ margin: 0, fontSize: 11, color: "rgba(200,212,240,0.5)" }}>K.N. Rao Institute, New Delhi</p>
                </div>
              </div>
              <div style={{ display: "flex", gap: 16, fontSize: 12, color: "rgba(200,212,240,0.45)" }}>
                <span>&#128336; 18 min read</span>
                <span>&#128197; May 2026</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── QUICK INSIGHTS ─────────────────────────────────────────────────── */}
        <section style={{ padding: "0 32px 80px", maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ textAlign: "center", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(200,212,240,0.4)", marginBottom: 32 }}>Quick Insights , 5 Glance Points</p>
          <div className="moon-insights" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16 }}>
            <InsightCard img={`${R2}/digbala-directional-strength-icon.webp`} title="Digbala" subtitle="Moon's strongest directional placement" />
            <InsightCard img={`${R2}/mother-homeland-icon.webp`} title="Mother and Homeland" subtitle="Deep bond with mother and homeland" />
            <InsightCard img={`${R2}/moksha-meditation-icon.webp`} title="Emotional Fulfilment" subtitle="Emotional fulfilment through home and family" />
            <InsightCard img={`${R2}/digbala-directional-strength-icon.webp`} title="Intuition and Empathy" subtitle="Strong intuition and deep empathy" />
            <InsightCard img={`${R2}/moksha-meditation-icon.webp`} title="Moksha Trikona" subtitle="Moksha trikona connection , path to liberation" />
          </div>
        </section>

        {/* Section divider */}
        <div style={{ textAlign: "center", margin: "0 auto 64px", maxWidth: 800, padding: "0 32px" }}>
          <img src={`${R2}/section-divider-glow.webp`} alt="" aria-hidden="true" style={{ width: "100%", maxHeight: 24, objectFit: "contain", opacity: 0.5 }} />
        </div>

        {/* ── SUKH BHAVA SECTION ──────────────────────────────────────────────── */}
        <section style={{ maxWidth: 1200, margin: "0 auto 80px", padding: "0 32px" }}>
          <div className="moon-split" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
            <div style={{ ...glass, padding: 40 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                <span style={{ fontSize: 20 }}>&#127968;</span>
                <h2 style={{ fontFamily: "'Caveat', cursive", fontSize: "1.9rem", color: "#DDE7FF", margin: 0 }}>
                  The 4th House in Jyotish , Sukh Bhava
                </h2>
              </div>
              <p style={{ color: "rgba(200,212,240,0.75)", fontSize: 14, lineHeight: 1.85, margin: "0 0 16px" }}>
                The 4th house is called Sukh Bhava , the house of happiness and contentment. It governs mother, homeland, property, vehicles, emotional foundation, and mental peace. It is one of the four Kendra (angular) houses and also part of the Moksha trikona along with the 8th and 12th.
              </p>
              <p style={{ color: "rgba(200,212,240,0.65)", fontSize: 14, lineHeight: 1.85, margin: 0 }}>
                This dual nature makes it unique , it is both worldly (property, home) and deeply spiritual (inner peace, liberation). Understanding this house is the foundation of any{" "}
                <Link to="/planets" style={{ color: "#7E8FCB", textDecoration: "none" }}>emotional reading in Vedic Jyotish</Link>.
              </p>
            </div>
            <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", minHeight: 320 }}>
              <img src={`${R2}/sukh-bhava-house.webp`} alt="Sukh Bhava , the 4th house in Jyotish" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 20 }} loading="lazy" />
              <img src={`${R2}/floating-lotus-overlay.webp`} alt="" aria-hidden="true" style={{ position: "absolute", bottom: 0, left: 0, right: 0, width: "100%", objectFit: "contain", opacity: 0.6 }} />
              <img src={`${R2}/moon-mist-overlay.webp`} alt="" aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.3, mixBlendMode: "overlay" }} />
            </div>
          </div>
        </section>

        {/* ── WHY MOON IS SPECIAL ─────────────────────────────────────────────── */}
        <section style={{ maxWidth: 1200, margin: "0 auto 80px", padding: "0 32px" }}>
          <div className="moon-split" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
            <div style={{ position: "relative" }}>
              <img src={`${R2}/digbala-zodiac-wheel.webp`} alt="Moon digbala zodiac wheel" style={{ width: "100%", borderRadius: 20, objectFit: "cover" }} loading="lazy" />
              <img src={`${R2}/moon-radial-glow.webp`} alt="" aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.5, mixBlendMode: "screen", borderRadius: 20 }} />
            </div>
            <div style={{ ...glass, padding: 40 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                <span style={{ fontSize: 22 }}>&#9790;</span>
                <h2 style={{ fontFamily: "'Caveat', cursive", fontSize: "1.9rem", color: "#DDE7FF", margin: 0 }}>
                  Why Moon is Special in the 4th House
                </h2>
              </div>
              <p style={{ color: "rgba(200,212,240,0.75)", fontSize: 14, lineHeight: 1.85, margin: "0 0 16px" }}>
                Two reasons make this placement exceptional. First,{" "}
                <Link to="/planets/moon" style={{ color: "#7E8FCB", textDecoration: "none" }}>Moon (Chandra)</Link>{" "}
                has digbala here , directional strength. Digbala means a planet performs at its most powerful in this specific house direction.
              </p>
              <p style={{ color: "rgba(200,212,240,0.65)", fontSize: 14, lineHeight: 1.85, margin: "0 0 24px" }}>
                Second, the 4th house in the natural zodiac corresponds to Cancer, Moon's own sign. So Moon in the 4th is doubly at home , both directionally and by natural signification.
              </p>
              <a href="/planets/moon" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, color: "#C8D4F0", border: "1px solid rgba(200,212,240,0.25)", padding: "10px 20px", borderRadius: 100, textDecoration: "none" }}>
                Learn more about Moon (Chandra) →
              </a>
            </div>
          </div>
        </section>

        {/* ── EFFECTS ACCORDION ──────────────────────────────────────────────── */}
        <section style={{ maxWidth: 1200, margin: "0 auto 80px", padding: "0 32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 40 }}>
            <span style={{ fontSize: 20, color: "#7E8FCB" }}>&#10022;</span>
            <h2 style={{ fontFamily: "'Caveat', cursive", fontSize: "2rem", color: "#DDE7FF", margin: 0 }}>
              Effects of Moon in the 4th House
            </h2>
          </div>
          <div className="moon-split" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
            <div style={{ ...glass, padding: "8px 32px 24px" }}>
              {accordionItems.map(item => <Accordion key={item.number} {...item} />)}
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
              <div style={{ position: "relative", width: "100%" }}>
                <img src={`${R2}/moon-halo-orbit.webp`} alt="Moon orbital visualization" style={{ width: "100%", objectFit: "contain", borderRadius: 20, opacity: 0.9 }} loading="lazy" />
                <img src={`${R2}/moon-star-particles.webp`} alt="" aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.4, mixBlendMode: "screen" }} />
              </div>
              <MoonWheel />
            </div>
          </div>
        </section>

        {/* ── CLASSICAL REFERENCE ────────────────────────────────────────────── */}
        <section style={{ maxWidth: 1200, margin: "0 auto 80px", padding: "0 32px" }}>
          <div className="moon-split" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
            {/* Left , parchment */}
            <div style={{
              background: "linear-gradient(135deg, rgba(139,107,40,0.18) 0%, rgba(16,26,58,0.9) 60%)",
              border: "1px solid rgba(200,212,240,0.18)",
              borderRadius: 20,
              padding: 40,
              position: "relative",
              overflow: "hidden",
            }}>
              <div style={{ position: "absolute", top: 0, right: 0, width: 160, height: 160, opacity: 0.15 }}>
                <img src={`${R2}/sage-scripture-illustration.webp`} alt="" aria-hidden="true" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ position: "relative" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                  <span style={{ fontSize: 18 }}>&#128220;</span>
                  <h2 style={{ fontFamily: "'Caveat', cursive", fontSize: "1.7rem", color: "#DDE7FF", margin: 0 }}>
                    Classical Text Reference , What the Ancients Said
                  </h2>
                </div>
                <blockquote style={{ borderLeft: "2px solid rgba(200,212,240,0.35)", paddingLeft: 20, margin: "0 0 20px", fontStyle: "italic", color: "#C8D4F0", fontSize: 14, lineHeight: 1.8 }}>
                  "Moon in the 4th house in its own sign or exaltation gives the native all comforts, a devoted mother, property, and emotional contentment."
                </blockquote>
                <p style={{ color: "rgba(200,212,240,0.5)", fontSize: 12, margin: "0 0 20px" }}>
                  , Brihat Parashara Hora Shastra, Chapter on Planetary House Effects
                </p>
                <p style={{ color: "rgba(200,212,240,0.7)", fontSize: 13, lineHeight: 1.8, margin: 0 }}>
                  The Phaladeepika states that Moon here makes the native charitable, happy, and beloved by family. Consult Lunar Astro's analysis aligns with classical sources in noting Moon's digbala strength here , like a swan resting on a calm lake.
                </p>
              </div>
            </div>

            {/* Right , practitioner */}
            <div style={{
              background: "rgba(8,16,31,0.85)",
              border: "1px solid rgba(200,212,240,0.12)",
              borderRadius: 20,
              padding: 40,
              position: "relative",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                <span style={{ fontSize: 18 }}>&#128065;&#65039;</span>
                <h2 style={{ fontFamily: "'Caveat', cursive", fontSize: "1.7rem", color: "#DDE7FF", margin: 0 }}>
                  A Practitioner's Observation
                </h2>
              </div>
              <p style={{ color: "rgba(200,212,240,0.75)", fontSize: 14, lineHeight: 1.85, margin: "0 0 20px" }}>
                Pattern from K.N. Rao methodology , when Moon is in the 4th house for Cancer or Pisces ascendants, and the Navamsa also shows a strong 4th lord, the native almost always either inherits property or acquires it before age 35.
              </p>
              <p style={{ color: "rgba(200,212,240,0.65)", fontSize: 14, lineHeight: 1.85, margin: "0 0 28px" }}>
                The mother's influence on the native's emotional decision-making remains active throughout life even after the mother has passed , visible in recurring emotional patterns around security and belonging that trace directly to childhood conditioning.
              </p>
              <p style={{ textAlign: "right", fontFamily: "'Caveat', cursive", fontSize: "1.3rem", color: "rgba(200,212,240,0.5)", margin: 0 }}>
                - Saurabh Jain
              </p>
            </div>
          </div>
        </section>

        {/* ── REMEDIES ───────────────────────────────────────────────────────── */}
        <section style={{ maxWidth: 1200, margin: "0 auto 80px", padding: "0 32px" }}>
          <div style={{ ...glass, padding: 48 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 36 }}>
              <span style={{ fontSize: 22 }}>&#127885;</span>
              <h2 style={{ fontFamily: "'Caveat', cursive", fontSize: "2rem", color: "#DDE7FF", margin: 0 }}>
                Remedies for Moon in 4th House
              </h2>
            </div>
            <div className="moon-remedies" style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 16 }}>
              {remedies.map((r, i) => <RemedyCard key={i} {...r} />)}
            </div>
          </div>
        </section>

        {/* ── FAQ + CTA ──────────────────────────────────────────────────────── */}
        <section style={{ maxWidth: 1200, margin: "0 auto 80px", padding: "0 32px" }}>
          <div className="moon-faq-cta" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "start" }}>
            {/* FAQ */}
            <div style={{ ...glass, padding: 40 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                <span style={{ fontSize: 18 }}>&#63;</span>
                <h2 style={{ fontFamily: "'Caveat', cursive", fontSize: "1.8rem", color: "#DDE7FF", margin: 0 }}>
                  Frequently Asked Questions
                </h2>
              </div>
              <div style={{ position: "relative" }}>
                <img src={`${R2}/constellation-overlay.webp`} alt="" aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.05 }} />
                <div style={{ position: "relative" }}>
                  {faqs.map((f, i) => <FAQ key={i} {...f} />)}
                </div>
              </div>
            </div>

            {/* CTA */}
            <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", minHeight: 480 }}>
              <img src={`${R2}/moon-family-silhouette.webp`} alt="Family looking at the Moon , book a Vedic astrology consultation" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
              <img src={`${R2}/floating-lotus-overlay.webp`} alt="" aria-hidden="true" style={{ position: "absolute", bottom: 0, width: "100%", objectFit: "contain", opacity: 0.6 }} />
              <img src={`${R2}/moon-mist-overlay.webp`} alt="" aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.4, mixBlendMode: "overlay" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,16,31,0.9) 0%, transparent 50%)" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 40 }}>
                <h3 style={{ fontFamily: "'Caveat', cursive", fontSize: "1.8rem", color: "#DDE7FF", margin: "0 0 12px", lineHeight: 1.2 }}>
                  Want to understand how your 4th house Moon shapes your emotional world and property karma?
                </h3>
                <p style={{ color: "rgba(200,212,240,0.7)", fontSize: 14, margin: "0 0 24px", lineHeight: 1.6 }}>
                  Book a personalised Jyotish consultation.
                </p>
                <a href="/services" style={{
                  display: "inline-block",
                  background: "linear-gradient(135deg, #C8D4F0, #7E8FCB)",
                  color: "#08101F",
                  fontSize: 14,
                  fontWeight: 600,
                  padding: "12px 32px",
                  borderRadius: 100,
                  textDecoration: "none",
                  letterSpacing: "0.02em",
                }}>
                  Book Your Consultation →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── EXPLORE OTHER GRAHAS ────────────────────────────────────────────── */}
        <section style={{ maxWidth: 1200, margin: "0 auto 80px", padding: "0 32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
            <span style={{ color: "#7E8FCB" }}>&#10022;</span>
            <p style={{ color: "rgba(200,212,240,0.5)", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", margin: 0 }}>
              Explore Other Grahas
            </p>
          </div>
          <div className="moon-grahas" style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: 12 }}>
            {grahas.map(g => <GrahaCard key={g.path} {...g} />)}
          </div>
        </section>

        {/* ── MOON WATER REFLECTION footer accent ─────────────────────────────── */}
        <div style={{ width: "100%", maxHeight: 200, overflow: "hidden", opacity: 0.4 }}>
          <img src={`${R2}/moon-water-reflection.webp`} alt="" aria-hidden="true" style={{ width: "100%", objectFit: "cover" }} loading="lazy" />
        </div>

      </div>
    </>
  );
}
