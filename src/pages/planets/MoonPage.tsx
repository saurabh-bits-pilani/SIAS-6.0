import { useMemo, useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import {
  getArticleSchema,
  getBreadcrumbSchema,
  getFaqPageSchemaFromList,
  getWebPageSchema,
  type JsonLd,
  SITE_ORIGIN,
} from '../../data/schema-entities';

const MOON_HERO_URL =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Pillar/Planets/Moon/hero-chandra.webp';
const MOON_PEARL_URL =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Pillar/Planets/Moon/pearl-ring.webp';
const MOON_SAGE_URL =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Pillar/Planets/Moon/sage-moonlight.webp';
const MOON_DOODLE_URL =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Pillar/Planets/Moon/doodle-moon.webp';
const PARCHMENT_URL =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Pillar/Planets/Sun/parchment-texture.webp';
const STAR_ACCENT_URL =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Pillar/Planets/Sun/star-accent.svg';
const DIYA_URL =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Pillar/Planets/Sun/diya.svg';
const FEATHER_URL =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Pillar/Planets/Sun/feather-quill.png';
const PAGE_PARCHMENT_URL =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Pillar/Hub/Planets/bg-parchment-texture.webp';

const PAGE_TITLE =
  'Chandra (Moon) in Vedic Astrology: Meaning, Mantras, Remedies | Soul Infinity';
const PAGE_DESCRIPTION =
  'Explore Chandra in Vedic astrology through mantras, remedies, FAQ, gemstone guidance, and a rich editorial guide to the Moon as the keeper of mind, feeling, and intuition.';
const PAGE_KEYWORDS =
  'chandra, moon in vedic astrology, chandra mantra, moon remedies, pearl gemstone, janma rashi, soma, moon in birth chart, soul infinity';
const PAGE_URL = `${SITE_ORIGIN}/planets/moon`;

const pageShellStyle = {
  backgroundImage: `linear-gradient(rgba(245,230,200,0.94), rgba(245,230,200,0.95)), url(${PAGE_PARCHMENT_URL})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

type IconName =
  | 'planet'
  | 'water'
  | 'nature'
  | 'metal'
  | 'day'
  | 'mind'
  | 'mother'
  | 'sign'
  | 'up'
  | 'down'
  | 'direction'
  | 'symbol'
  | 'benefit'
  | 'connect'
  | 'gem'
  | 'quote'
  | 'faq';

type QuickFact = {
  icon: IconName;
  label: string;
  value: string;
};

type MantraBlock = {
  title: string;
  devanagari: string;
  iast: string;
  meaning: string;
};

type DetailRow = {
  icon: IconName;
  label: string;
  value: string;
};

type EditorialSection = {
  title: string;
  paragraphs: string[];
};

type FaqItem = {
  question: string;
  answer: string;
};

const quickFacts: QuickFact[] = [
  { icon: 'planet', label: 'Planet', value: 'Chandra' },
  { icon: 'water', label: 'Element', value: 'Water' },
  { icon: 'nature', label: 'Nature', value: 'Feminine' },
  { icon: 'metal', label: 'Metal', value: 'Silver' },
  { icon: 'day', label: 'Day', value: 'Monday' },
];

const mantras: MantraBlock[] = [
  {
    title: 'Navagraha Stotra - Chandra Mantra',
    devanagari:
      'दधिशंख तुषाराभं क्षीरोदार्णव सम्भवम् । नमामि शशिनं सोमं शम्भोर्मुकुट भूषणम् ॥',
    iast:
      'Dadhiśaṅkha tuṣārābhaṁ kṣīrodārṇava sambhavam | Namāmi śaśinaṁ somaṁ śambhor-mukuṭa bhūṣaṇam ||',
    meaning:
      'I bow to Chandra, bright like curd, conch, and frost, born from the ocean of milk, the radiant Soma adorning the crest of Shiva.',
  },
  {
    title: 'Beej Mantra for Chandra',
    devanagari: 'ॐ श्रां श्रीं श्रौं सः चन्द्राय नमः ॥',
    iast: 'Om Śrāṁ Śrīṁ Śrauṁ Saḥ Candrāya Namaḥ ||',
    meaning:
      'Salutations to Chandra, the luminous lord of the mind, who cools the heart and restores emotional balance.',
  },
];

const lifeRows: DetailRow[] = [
  { icon: 'mind', label: 'Represents', value: 'Mind, emotions, nurturing' },
  {
    icon: 'mother',
    label: 'Governs',
    value: 'Mother, intuition, imagination, sleep, comfort',
  },
  { icon: 'sign', label: 'Signs Ruled', value: 'Cancer (Karka)' },
  { icon: 'up', label: 'Exalted In', value: 'Taurus (Vrishabha)' },
  { icon: 'down', label: 'Debilitated In', value: 'Scorpio (Vrischika)' },
  { icon: 'direction', label: 'Direction', value: 'North-West' },
  { icon: 'symbol', label: 'Symbol', value: 'Crescent Moon' },
];

const benefits = [
  'Calms the mind and reduces emotional noise',
  'Enhances emotional balance and tenderness',
  'Supports intuition, receptivity, and creativity',
  'Improves sleep, rest, and inner cooling',
  'Strengthens nurturing bonds and domestic peace',
  'Promotes healing, clarity, and self-trust',
];

const connectPractices = [
  'Chant Chandra mantra at night, especially on Mondays.',
  'Offer clean water, milk, or white flowers to the Moon with reverence.',
  'Wear Pearl in silver only after astrological verification.',
  'Spend time in moonlight, silence, and reflective meditation.',
  'Practice gratitude toward mother, caregivers, and the emotional body.',
];

const phases = [
  { glyph: '●', name: 'New Moon', sub: 'Set intentions' },
  { glyph: '◔', name: 'Waxing Crescent', sub: 'Take action' },
  { glyph: '◑', name: 'First Quarter', sub: 'Build momentum' },
  { glyph: '◕', name: 'Waxing Gibbous', sub: 'Refine efforts' },
  { glyph: '○', name: 'Full Moon', sub: 'Receive and heal' },
  { glyph: '◕', name: 'Waning Gibbous', sub: 'Practice gratitude' },
  { glyph: '◑', name: 'Last Quarter', sub: 'Release gently' },
  { glyph: '◔', name: 'Waning Crescent', sub: 'Rest and surrender' },
];

const editorialSections: EditorialSection[] = [
  {
    title: 'Chandra and the Reflective Mind',
    paragraphs: [
      'Chandra in Vedic astrology is the keeper of manas, the reflective mind that receives impressions, colours them with feeling, and turns them into memory. The Moon does not behave like the will-driven Sun. It responds, absorbs, nourishes, and mirrors.',
      'When astrologers speak about emotional steadiness, intuition, softness, and the quality of one’s internal climate, they are reading the Moon. A strong Chandra helps a person feel life deeply without being ruled by every passing wave.',
    ],
  },
  {
    title: 'Why the Moon Matters So Much in a Birth Chart',
    paragraphs: [
      'In classical jyotish, the Moon is often treated as a second ascendant because lived experience is filtered through the mind. Two people can face the same outer circumstances, but the one with a stable Moon processes them with greater peace, resilience, and clarity.',
      'This is why Janma Rashi, the Moon sign, remains central in transit reading, dasha interpretation, matchmaking, and mental well-being analysis. Chandra shows how reality is felt, not just what reality appears to be.',
    ],
  },
  {
    title: 'Mother, Nourishment, and Emotional Safety',
    paragraphs: [
      'The Moon signifies mother, early nurturing, the home atmosphere, and the ability to feel safe enough to soften. A healthy lunar pattern often shows up as emotional trust, restorative sleep, and a natural sense of belonging.',
      'When the Moon is strained, people may still function impressively in the world, yet feel inwardly dry, overextended, or unable to settle. Lunar remedies therefore focus on nourishment, rhythm, cooling, and restoring the neglected inner child.',
    ],
  },
  {
    title: 'The Moon and the Body',
    paragraphs: [
      'Chandra governs fluids, hydration, the stomach, fertility rhythms, the breast area, and the body’s subtle capacity to rest and replenish. The Moon is deeply tied to cyclicity, which is why it is associated with tides, hormones, sleep, and emotional timing.',
      'A weakened Moon may coincide with irregular rest, heightened sensitivity, digestive unease under stress, and difficulty regulating mood. Strengthening the Moon often improves the felt relationship between body and mind.',
    ],
  },
  {
    title: 'Waxing, Waning, and Lunar Strength',
    paragraphs: [
      'The paksha of the Moon matters. A bright waxing Moon generally carries more visible support for optimism, emotional expression, and social ease. A dark Moon can still produce depth and spiritual richness, but it may turn experience inward and intensify private processing.',
      'No single factor decides lunar strength. Sign, house, aspects, nakshatra, dignity, and dasha all modify the outcome. The chart must be read as a whole, but the Moon remains one of the clearest indicators of how a person feels their life.',
    ],
  },
  {
    title: 'Chandra in Relationship and Public Life',
    paragraphs: [
      'The Moon is receptive, relational, and socially intelligent. It helps a person read the room, care for others, hold emotional space, and create an atmosphere of trust. This makes Chandra especially important in counselling, hospitality, healing, teaching, and public-facing roles.',
      'A refined Moon does not demand attention like a fiery Sun placement might. Instead, it creates comfort, resonance, and a felt sense of care. People remember how they feel around a strong Moon.',
    ],
  },
  {
    title: 'Traditional Remedies for a Disturbed Moon',
    paragraphs: [
      'Classical remedies for Chandra are cooling, devotional, and rhythmic. Monday observances, offering water to the Moon, mantra japa, white foods, moonlight meditation, and gratitude toward the mother principle all help restore lunar harmony.',
      'Pearl is the traditional gemstone of Chandra, but it should not be worn casually. A gemstone can amplify the planet, which is helpful only when amplification is appropriate for the individual chart.',
    ],
  },
  {
    title: 'Living the Wisdom of Chandra',
    paragraphs: [
      'The deepest lunar teaching is not speed, conquest, or control. It is attunement. Chandra asks us to listen, feel, cool down, and become intimate with the inner world rather than run from it.',
      'When the Moon is honoured, intuition becomes trustworthy, rest becomes sacred, and tenderness becomes a form of intelligence. The mind grows quieter, clearer, and more able to receive life without fracture.',
    ],
  },
];

const faqs: FaqItem[] = [
  {
    question: 'What does Chandra represent in Vedic astrology?',
    answer:
      'Chandra represents the mind, emotions, mother, memory, nourishment, and the inner world of feeling. It shows how life is processed internally, not only what happens externally.',
  },
  {
    question: 'Why is the Moon so important in a birth chart?',
    answer:
      'The Moon is crucial because it governs the mind through which every experience is interpreted. A stable Moon helps with resilience, rest, intuition, and emotional clarity.',
  },
  {
    question: 'What are signs of a weak or troubled Moon?',
    answer:
      'Common signs include emotional volatility, disturbed sleep, anxiety, overthinking, difficulty feeling supported, and a tendency to hold old hurt. Exact judgment depends on the full chart, not one placement alone.',
  },
  {
    question: 'Can Pearl strengthen the Moon?',
    answer:
      'Pearl is the traditional gemstone for Chandra and can support lunar strength in the right chart. It should be worn only after proper astrological analysis because strengthening a planet is not always advisable.',
  },
  {
    question: 'Which mantra is best for Chandra?',
    answer:
      'Both the Navagraha mantra and the Beej mantra are widely used. The best choice depends on whether the intention is devotional connection, emotional soothing, or a focused remedial practice.',
  },
  {
    question: 'What day is associated with the Moon?',
    answer:
      'Monday is traditionally associated with Chandra. Many devotees fast lightly, chant lunar mantras, or perform simple Moon offerings on this day.',
  },
  {
    question: 'How is Chandra different from the Sun in astrology?',
    answer:
      'The Sun shows core vitality, will, and identity, while the Moon shows emotional experience, receptivity, memory, and inner regulation. The Sun shines, but the Moon feels and reflects.',
  },
];

const cardTextureStyle = {
  backgroundImage: `linear-gradient(rgba(245,230,200,0.94), rgba(245,230,200,0.94)), url(${PARCHMENT_URL})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

const StarfieldDoodle = ({ className = '' }: { className?: string }) => (
  <svg
    className={`pointer-events-none ${className}`}
    viewBox="0 0 800 600"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
  >
    {Array.from({ length: 60 }).map((_, i) => {
      const x = (i * 137.5) % 800;
      const y = (i * 89.3) % 600;
      const r = 0.5 + ((i * 7) % 10) / 10 * 1.5;
      const opacity = 0.3 + ((i * 13) % 10) / 10 * 0.7;
      return <circle key={i} cx={x} cy={y} r={r} fill="#cbd5e1" opacity={opacity} />;
    })}
  </svg>
);

const OrbitDoodle = ({ className = '' }: { className?: string }) => (
  <svg
    className={`pointer-events-none ${className}`}
    viewBox="0 0 800 600"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
  >
    <circle cx="400" cy="300" r="180" fill="none" stroke="#93c5fd" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.5" />
    <circle cx="400" cy="300" r="240" fill="none" stroke="#93c5fd" strokeWidth="0.5" strokeDasharray="3 6" opacity="0.4" />
    <circle cx="400" cy="300" r="300" fill="none" stroke="#93c5fd" strokeWidth="0.5" strokeDasharray="2 8" opacity="0.3" />
    <circle cx="400" cy="300" r="360" fill="none" stroke="#a5b4fc" strokeWidth="0.4" strokeDasharray="1 12" opacity="0.25" />
  </svg>
);

const MoonDustDoodle = ({ className = '' }: { className?: string }) => (
  <svg
    className={`pointer-events-none ${className}`}
    viewBox="0 0 800 600"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
  >
    {Array.from({ length: 50 }).map((_, i) => {
      const x = (i * 197) % 800;
      const y = (i * 113) % 600;
      const r = 0.4 + ((i * 11) % 10) / 10 * 0.8;
      const opacity = 0.15 + ((i * 17) % 10) / 10 * 0.5;
      return <circle key={i} cx={x} cy={y} r={r} fill="#dbeafe" opacity={opacity} />;
    })}
    {Array.from({ length: 25 }).map((_, i) => {
      const x = ((i + 7) * 251) % 800;
      const y = ((i + 3) * 173) % 600;
      const opacity = 0.2 + ((i * 19) % 10) / 10 * 0.4;
      return <circle key={`b-${i}`} cx={x} cy={y} r="1.2" fill="#fef3c7" opacity={opacity} />;
    })}
  </svg>
);

function iconSvg(name: IconName, className = 'h-6 w-6'): JSX.Element {
  const base = 'none';
  switch (name) {
    case 'planet':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <circle cx="12" cy="12" r="4.5" />
          <path d="M4 14c2.4 2.6 13 4 16 1.2 1.6-1.5-.3-3.6-2.8-4.8-2.5-1.2-7.2-2-11-.7C3.6 10.5 2.9 12.8 4 14Z" />
        </svg>
      );
    case 'water':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <path d="M12 3c3 4 5.5 6.7 5.5 10.3A5.5 5.5 0 1 1 6.5 13.3C6.5 9.7 9 7 12 3Z" />
        </svg>
      );
    case 'nature':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <path d="M12 5c2.3 0 4.2 1.8 4.2 4.1S14.3 13 12 13 7.8 11.2 7.8 9.1 9.7 5 12 5Z" />
          <path d="M7 19c1.3-2.6 3-4 5-4s3.7 1.4 5 4" />
        </svg>
      );
    case 'metal':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <path d="m12 3 6 4v10l-6 4-6-4V7l6-4Z" />
          <path d="m12 3 0 18" />
        </svg>
      );
    case 'day':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <rect x="3" y="5" width="18" height="16" rx="2.5" />
          <path d="M7 3v4M17 3v4M3 10h18" />
        </svg>
      );
    case 'mind':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <path d="M8.5 10.5a3.5 3.5 0 0 1 7 0c0 1.6-.9 2.3-1.8 3.1-.6.5-.9 1-.9 1.9h-1.6c0-1.4.6-2.2 1.3-2.8.8-.7 1.4-1.1 1.4-2.2a1.9 1.9 0 1 0-3.8 0H8.5Z" />
          <path d="M10.1 18h3.8M8 6.5c.9-1.4 2.3-2.3 4-2.3 3 0 5.5 2.5 5.5 5.5 0 1.5-.5 2.6-1.4 3.6-.8.8-1.1 1.4-1.1 2.7H9c0-1.2-.4-1.9-1.1-2.7-.9-1-1.4-2.1-1.4-3.6 0-1.3.5-2.6 1.5-3.2Z" />
        </svg>
      );
    case 'mother':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <path d="M12 6c2.6 0 4.7 2.1 4.7 4.8S14.6 15.5 12 15.5 7.3 13.4 7.3 10.8 9.4 6 12 6Z" />
          <path d="M5 20c1.3-2.7 3.7-4.2 7-4.2s5.7 1.5 7 4.2" />
          <path d="M7.2 7.4 4.4 4.6M16.8 7.4l2.8-2.8" />
        </svg>
      );
    case 'sign':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <path d="M7 5c2.2 0 4 1.8 4 4v10" />
          <path d="M17 5c-2.2 0-4 1.8-4 4v10" />
          <path d="M7 5h10" />
        </svg>
      );
    case 'up':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <path d="M12 19V5M6.5 10.5 12 5l5.5 5.5" />
        </svg>
      );
    case 'down':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <path d="M12 5v14M17.5 13.5 12 19l-5.5-5.5" />
        </svg>
      );
    case 'direction':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <circle cx="12" cy="12" r="7.5" />
          <path d="m10 14 6-6-2 8-4-2Z" />
        </svg>
      );
    case 'symbol':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <path d="M15.8 4.8A8 8 0 1 0 19.2 17 6.4 6.4 0 1 1 15.8 4.8Z" />
        </svg>
      );
    case 'benefit':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.9">
          <path d="m5 12 4 4 10-10" />
        </svg>
      );
    case 'connect':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <path d="M12 3v18M3 12h18" />
          <path d="M5.5 5.5c2.2 2.2 4.3 3.3 6.5 3.3s4.3-1.1 6.5-3.3" />
          <path d="M5.5 18.5c2.2-2.2 4.3-3.3 6.5-3.3s4.3 1.1 6.5 3.3" />
        </svg>
      );
    case 'gem':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <path d="m7 4-3 5 8 11 8-11-3-5H7Z" />
          <path d="m9 4 3 5 3-5M4 9h16" />
        </svg>
      );
    case 'quote':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M8.2 10.7c0 2.5-1.6 4.4-4.4 4.9l-.3-1.2c1.5-.5 2.4-1.3 2.6-2.5a2.8 2.8 0 0 1-2.3-2.8C3.8 7.4 5 6 6.8 6c1.9 0 3.4 1.6 3.4 4.7Zm10 0c0 2.5-1.6 4.4-4.4 4.9l-.3-1.2c1.5-.5 2.4-1.3 2.6-2.5a2.8 2.8 0 0 1-2.3-2.8c0-1.7 1.2-3.1 3-3.1 1.9 0 3.4 1.6 3.4 4.7Z" />
        </svg>
      );
    case 'faq':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <path d="M12 18h.01M9.2 9.3a2.8 2.8 0 1 1 4.6 2.2c-.9.7-1.5 1.2-1.5 2.5" />
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
  }
}

function Highlight({ children }: { children: string }) {
  return <span className="highlight-marker rounded px-1.5 py-0.5 text-slate-900">{children}</span>;
}

function ParchmentCard({
  children,
  className = '',
  rotate = '',
}: {
  children: React.ReactNode;
  className?: string;
  rotate?: string;
}) {
  return (
    <div
      className={`card-parchment relative overflow-hidden border border-[#8c6e47]/45 p-5 text-[#26180d] sm:p-6 ${rotate} ${className}`}
      style={cardTextureStyle}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.32),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(73,43,19,0.18),transparent_26%)]" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function ScribbleLine() {
  return (
    <svg viewBox="0 0 120 20" className="h-4 w-28 text-blue-300" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 13c10-7 18 4 28-2s15-4 24 0 17 4 27 0 17-4 35 2" strokeLinecap="round" />
    </svg>
  );
}

function ScribbleAccent({
  className = 'h-10 w-10',
  strokeClassName = 'text-[#2d5aa8]',
}: {
  className?: string;
  strokeClassName?: string;
}) {
  return (
    <svg viewBox="0 0 64 64" className={`${className} ${strokeClassName}`} fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M7 41c9-11 18-16 27-14 9 1 12 10 21 5" strokeLinecap="round" />
      <path d="M20 12c4 2 5 6 4 10-2 5-7 6-11 4-4-3-4-8-1-12 3-3 8-4 12-2" strokeLinecap="round" />
      <path d="M45 20c2 3 6 4 10 2-1 4-1 8 3 10-4 1-7 4-7 8-2-3-6-4-10-2 2-3 2-7-1-10 3-1 5-4 5-8Z" />
    </svg>
  );
}

export default function MoonPage() {
  const [openFaq, setOpenFaq] = useState<number>(0);

  const schemas = useMemo<JsonLd[]>(
    () => [
      getArticleSchema({
        headline: 'Chandra (Moon) in Vedic Astrology: Meaning, Mantras, Remedies, and FAQ',
        description: PAGE_DESCRIPTION,
        image: MOON_HERO_URL,
        datePublished: '2026-04-23',
        dateModified: '2026-04-23',
        url: '/planets/moon',
        articleSection: 'Vedic Astrology',
        keywords: [
          'Chandra',
          'Moon in Vedic astrology',
          'Moon mantra',
          'Pearl gemstone',
          'Moon remedies',
          'Janma Rashi',
        ],
      }),
      getFaqPageSchemaFromList(faqs),
      getBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Planets', url: '/planets' },
        { name: 'Moon (Chandra)', url: '/planets/moon' },
      ]),
      getWebPageSchema({
        name: 'Chandra (Moon) in Vedic Astrology',
        description: PAGE_DESCRIPTION,
        url: PAGE_URL,
      }),
    ],
    [],
  );

  return (
    <>
      <SEOHead
        title={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        keywords={PAGE_KEYWORDS}
        image={MOON_HERO_URL}
        url={PAGE_URL}
        type="article"
        schemas={schemas}
      />

      <div className="min-h-screen text-[#2b1a0f]" style={pageShellStyle}>
        <div className="px-4 pt-5 sm:px-6 lg:px-10">
          <Link
            to="/planets"
            aria-label="Back to Planets hub"
            className="inline-flex font-caveat text-lg text-[#1d4ed8] transition hover:text-[#1e40af] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#93c5fd]"
          >
            ← Back to Planets
          </Link>
        </div>

        <section
          className="relative overflow-hidden"
          style={{
            background:
              'radial-gradient(circle at 50% 8%, rgba(83,122,206,0.48) 0%, rgba(24,41,88,0.38) 20%, rgba(8,16,38,1) 44%, rgba(4,8,22,1) 100%)',
          }}
        >
          <div
            className="absolute inset-0 bg-cover bg-[center_right_16%] bg-no-repeat"
            style={{ backgroundImage: `url(${MOON_HERO_URL})` }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,18,44,0.95)_0%,rgba(8,18,44,0.9)_16%,rgba(8,18,44,0.62)_30%,rgba(8,18,44,0.22)_46%,rgba(8,18,44,0.05)_64%,rgba(8,18,44,0.01)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,11,24,0.36)_0%,rgba(5,11,24,0.1)_32%,rgba(5,11,24,0.62)_100%)]" />
          <div className="absolute inset-0 opacity-75 mix-blend-screen">
            <StarfieldDoodle className="absolute inset-0" />
          </div>
          <div className="absolute inset-0 opacity-55 mix-blend-screen">
            <MoonDustDoodle className="absolute left-0 top-0 h-full w-[48%]" />
          </div>
          <div className="pointer-events-none absolute inset-0 opacity-45">
            <img src={STAR_ACCENT_URL} alt="" className="absolute left-[7%] top-16 h-10 w-10" />
            <img src={STAR_ACCENT_URL} alt="" className="absolute left-[30%] top-[18rem] h-7 w-7 -rotate-12" />
            <img src={STAR_ACCENT_URL} alt="" className="absolute left-[18%] top-[34rem] h-5 w-5 rotate-12 opacity-55" />
          </div>

          <div className="mx-auto max-w-[1440px] px-4 pb-6 pt-6 sm:px-6 lg:px-10">
            <div className="relative mt-2 min-h-[31rem] sm:min-h-[36rem] lg:min-h-[41rem] xl:min-h-[45rem]">
              <div className="relative z-10 max-w-2xl pt-8 sm:pt-12 lg:max-w-[42rem] lg:pt-16">
                <div className="absolute -left-6 top-16 hidden h-28 w-28 rounded-full bg-blue-200/10 blur-2xl lg:block" />
                <div className="mb-5 text-sm uppercase tracking-[0.45em] text-[#eed49a]/80">
                  Planetary Wisdom
                </div>
                <h1 className="font-caveat leading-[0.88]">
                  <span className="block text-[5.8rem] text-[#c5d8ff] drop-shadow-[0_0_34px_rgba(166,194,255,0.38)] sm:text-[7.1rem] lg:text-[8.4rem] xl:text-[9.1rem]">
                    Chandra
                  </span>
                  <span className="mt-4 block text-4xl leading-none text-white sm:text-5xl lg:text-[4rem]">
                    The Divine Mind
                  </span>
                </h1>

                <div className="mt-8 max-w-2xl space-y-2 font-kalam text-[1.95rem] leading-relaxed text-[#f7efdc] sm:text-[2.15rem]">
                  <p>Cool, calm and compassionate.</p>
                  <p>
                    Chandra nourishes the <Highlight>mind</Highlight>, <Highlight>emotions</Highlight>
                  </p>
                  <div className="flex items-center gap-3">
                    <p>
                      and our <Highlight>inner world</Highlight>.
                    </p>
                    <ScribbleLine />
                  </div>
                </div>

                <div className="mt-8 flex items-center gap-5 text-[#f0d79b]">
                  <ScribbleAccent className="h-14 w-14" strokeClassName="text-[#f0d79b]/80" />
                  <img src={STAR_ACCENT_URL} alt="" className="h-9 w-9" />
                </div>
              </div>

              <div className="pointer-events-none absolute inset-y-0 right-[7%] hidden w-[56%] lg:block">
                <OrbitDoodle className="absolute inset-0 opacity-90" />
                <div className="absolute left-[28%] top-[8%] h-[72%] w-[72%] rounded-full bg-blue-200/10 blur-3xl" />
                <div className="absolute left-[8%] top-[20%] text-[#eed49a]/60">
                  <ScribbleAccent className="h-20 w-20" strokeClassName="text-[#eed49a]/65" />
                </div>
              </div>

              <div className="relative z-10 mt-8 max-w-[18rem] sm:mt-10 sm:max-w-[27rem] lg:absolute lg:bottom-4 lg:left-0 lg:mt-0 lg:max-w-[31rem]">
                <ParchmentCard className="rounded-[24px] p-2.5 sm:p-3 shadow-[0_18px_40px_rgba(0,0,0,0.38)]" rotate="lg:-rotate-[0.55deg]">
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5 lg:gap-0">
                    {quickFacts.map((fact, index) => (
                      <div
                        key={fact.label}
                        className={`flex min-h-[96px] flex-col items-center justify-center px-2.5 py-2.5 text-center sm:min-h-[110px] sm:px-3 ${
                          index < quickFacts.length - 1 ? 'lg:border-r lg:border-[#755632]/30' : ''
                        }`}
                      >
                        <div className="text-[#23160d]">{iconSvg(fact.icon, 'h-7 w-7 sm:h-8 sm:w-8')}</div>
                        <div className="mt-1.5 font-caveat text-[1.55rem] leading-none sm:text-[1.9rem]">{fact.label}</div>
                        <div className="mt-1 font-kalam text-[0.95rem] leading-tight text-[#17336b] sm:text-[1.08rem]">{fact.value}</div>
                      </div>
                    ))}
                  </div>
                </ParchmentCard>
              </div>
            </div>
          </div>
        </section>

        <aside
          aria-label="Quick summary of Chandra"
          className="mx-auto max-w-4xl px-4 pt-10 sm:px-6 lg:px-10"
        >
          <div
            className="rounded-[24px] border border-[#8c6e47]/25 px-6 py-5 shadow-[0_10px_30px_rgba(64,40,18,0.10)] sm:px-8 sm:py-6"
            style={cardTextureStyle}
          >
            <div className="mb-2 font-caveat text-2xl leading-none text-[#1e3a8a]">In Brief</div>
            <p className="font-kalam text-[1.2rem] leading-relaxed text-[#2a190f] sm:text-[1.35rem]">
              Chandra is the Vedic significator of the mind, emotions, and the mother. It governs intuition, memory, comfort, and the inner world. Devotees seek Chandra&apos;s blessings for emotional balance, mental peace, and nurturing relationships.
            </p>
          </div>
        </aside>

        <section
          className="relative overflow-hidden"
          style={{
            background:
              'linear-gradient(rgba(245,230,200,0.78), rgba(245,230,200,0.9))',
          }}
        >
          <div className="mx-auto max-w-[1440px] px-4 pb-10 pt-4 sm:px-6 sm:pt-5 lg:px-10">
            <div className="mt-2 grid gap-5 xl:grid-cols-[1.18fr_0.82fr]">
              <ParchmentCard className="min-h-full" rotate="xl:-rotate-[0.5deg]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="mb-2 flex items-center gap-3">
                      <span className="font-devanagari text-4xl text-[#1f140d]">ॐ</span>
                      <h3 className="font-caveat text-4xl leading-none text-[#1a110a] sm:text-5xl">
                        Sacred Mantras
                      </h3>
                    </div>
                    <div className="h-[3px] w-52 rounded-full bg-gradient-to-r from-blue-700 via-blue-400 to-transparent" />
                  </div>
                  <div className="flex items-center gap-4 text-[#2a1a10]/70">
                    <img src={MOON_DOODLE_URL} alt="" className="h-14 w-14 opacity-70" />
                    <img src={STAR_ACCENT_URL} alt="" className="h-6 w-6" />
                  </div>
                </div>

                <div className="mt-6 space-y-10">
                  {mantras.map((mantra, index) => (
                    <div key={mantra.title}>
                      <div className="font-caveat text-[2rem] leading-none text-[#2b579f] sm:text-[2.4rem]">
                        {index + 1}. {mantra.title}
                      </div>

                      <div className="mt-4 rounded-[18px] border-2 border-[#426ba7] bg-[#f6ebd6] px-5 py-4 shadow-[inset_0_0_20px_rgba(81,109,154,0.12)]">
                        <div className="font-devanagari text-[1.8rem] leading-tight text-[#1e120c] sm:text-[2.15rem]">
                          {mantra.devanagari}
                        </div>
                      </div>

                      <div className="mt-5 space-y-3 font-kalam text-xl leading-relaxed text-[#2d1e13]">
                        <div>
                          <span className="font-semibold text-[#2d569b]">IAST:</span> {mantra.iast}
                        </div>
                        <div>
                          <span className="font-semibold text-[#2d569b]">Meaning:</span> {mantra.meaning}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <img
                  src={FEATHER_URL}
                  alt=""
                  className="pointer-events-none absolute bottom-3 left-2 hidden h-44 w-auto opacity-85 lg:block"
                />
              </ParchmentCard>

              <div className="grid gap-6">
                <ParchmentCard rotate="xl:rotate-[0.4deg]">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-caveat text-4xl leading-none text-[#1a110a] sm:text-5xl">
                      Chandra in Our Life
                    </h3>
                    <div className="text-[#2a1a10]/70">{iconSvg('faq', 'h-12 w-12')}</div>
                  </div>
                  <div className="mt-4 space-y-3">
                    {lifeRows.map((row) => (
                      <div key={row.label} className="flex gap-3 border-b border-[#745834]/15 pb-3 last:border-b-0 last:pb-0">
                        <div className="mt-1 text-[#243d73]">{iconSvg(row.icon, 'h-6 w-6')}</div>
                        <div className="font-kalam text-lg leading-relaxed text-[#2b1b10]">
                          <span className="font-semibold text-[#1d2f61]">{row.label}:</span> {row.value}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="pointer-events-none absolute right-4 top-4 text-[#2a1a10]/60">
                    <svg viewBox="0 0 48 120" className="h-20 w-10 fill-none stroke-current stroke-[1.8]">
                      <path d="M24 6c8 0 14 6 14 14v68c0 7 5 13 10 13" />
                      <path d="M24 6c-8 0-14 6-14 14v68c0 7-5 13-10 13" />
                      <path d="M24 18c5 0 8 4 8 8v56c0 5 3 9 8 9" />
                      <path d="M24 18c-5 0-8 4-8 8v56c0 5-3 9-8 9" />
                    </svg>
                  </div>
                </ParchmentCard>

                <ParchmentCard rotate="xl:-rotate-[0.35deg]">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-caveat text-4xl leading-none text-[#1a110a] sm:text-5xl">
                      Benefits of Chandra Mantra
                    </h3>
                    <img src={MOON_DOODLE_URL} alt="" className="h-12 w-12 opacity-70" />
                  </div>
                  <div className="mt-5 space-y-3">
                    {benefits.map((benefit) => (
                      <div key={benefit} className="flex gap-3">
                        <div className="mt-0.5 text-[#2d5aa8]">{iconSvg('benefit', 'h-5 w-5')}</div>
                        <p className="font-kalam text-xl leading-relaxed text-[#29190f]">{benefit}</p>
                      </div>
                    ))}
                  </div>
                </ParchmentCard>
              </div>
            </div>

            <div className="mt-6">
              <ParchmentCard rotate="lg:-rotate-[0.25deg]">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-caveat text-4xl leading-none text-[#1a110a] sm:text-5xl">
                    How to Connect with Chandra
                  </h3>
                  <img src={MOON_DOODLE_URL} alt="" className="h-12 w-12 opacity-70" />
                </div>
                <div className="mt-5 grid gap-4 lg:grid-cols-5">
                  {connectPractices.map((practice) => (
                    <div
                      key={practice}
                      className="rounded-2xl border border-[#7b603e]/20 bg-white/25 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.32)]"
                    >
                      <div className="mb-3 text-[#24447e]">{iconSvg('connect', 'h-6 w-6')}</div>
                      <p className="font-kalam text-lg leading-relaxed text-[#2a190f]">{practice}</p>
                    </div>
                  ))}
                </div>
              </ParchmentCard>
            </div>

            <div className="mt-6 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
              <ParchmentCard rotate="xl:-rotate-[0.6deg]">
                <div className="text-center">
                  <div className="font-caveat text-4xl leading-none text-[#1a110a] sm:text-5xl">
                    Gemstone: Pearl
                  </div>
                  <p className="mt-2 font-kalam text-xl text-[#24447e]">Moti, Mukta</p>
                </div>
                <div className="relative mx-auto mt-5 max-w-[360px]">
                  <div className="pointer-events-none absolute inset-0 opacity-35">
                    <MoonDustDoodle className="absolute inset-0" />
                  </div>
                  <div className="rounded-[24px] border-2 border-[#d95a57]/85 bg-[#091121] p-1.5 shadow-[0_14px_28px_rgba(0,0,0,0.24)]">
                    <img
                      src={MOON_PEARL_URL}
                      alt="Pearl gemstone ring associated with Chandra"
                      className="mx-auto w-full rounded-[18px]"
                    />
                  </div>
                </div>
                <div className="mt-5 text-center font-kalam text-lg leading-relaxed text-[#2a190f]">
                  Pearl is traditionally prescribed to strengthen emotional steadiness, receptivity, and lunar grace, but only after chart-based verification.
                </div>
              </ParchmentCard>

              <ParchmentCard rotate="xl:rotate-[0.45deg]">
                <div className="tape-decoration hidden sm:block" />
                <div className="pointer-events-none absolute inset-0 opacity-20">
                  <MoonDustDoodle className="absolute right-0 top-0 h-full w-full" />
                </div>
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-caveat text-4xl leading-none text-[#1a110a] sm:text-5xl">
                    Affirmation
                  </h3>
                  <div className="text-[#2d5aa8]">
                    <svg viewBox="0 0 24 24" className="h-8 w-8 fill-none stroke-current stroke-[1.8]">
                      <path d="M12 20s-7-4.3-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.7-7 10-7 10Z" />
                    </svg>
                  </div>
                </div>
                <div className="mt-8 font-kalam text-[2rem] leading-snug text-[#224b92] sm:text-[2.4rem]">
                  “I am calm, I am loved, I trust my intuition and flow with life.”
                </div>
                <div className="mt-5 font-kalam text-lg leading-relaxed text-[#2a190f]">
                  This affirmation supports softness without fragility, and presence without overwhelm.
                </div>
              </ParchmentCard>
            </div>

            <div className="mt-8 rounded-[30px] border border-white/10 bg-[#071127]/85 px-5 py-6 shadow-[0_20px_70px_rgba(0,0,0,0.35)] backdrop-blur sm:px-8">
              <div className="grid gap-8 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
                <div className="flex items-start gap-4">
                  <div className="mt-1 text-[#d4e6ff]">{iconSvg('quote', 'h-9 w-9')}</div>
                  <div>
                    <div className="font-caveat text-3xl text-[#dbe7ff] sm:text-4xl">
                      The mind is like the moon,
                    </div>
                    <div className="mt-1 font-kalam text-xl text-white/80 sm:text-2xl">
                      it reflects what it receives.
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center gap-3">
                  <img src={MOON_DOODLE_URL} alt="" className="h-16 w-16 opacity-85" />
                  <div className="h-px w-28 bg-gradient-to-r from-transparent via-blue-200/60 to-transparent" />
                </div>

                <div className="text-left lg:text-right">
                  <div className="font-devanagari text-3xl text-[#dbe7ff] sm:text-4xl">ॐ सोम सोमाय नमः ।</div>
                  <div className="mt-2 font-kalam text-xl text-white/80 sm:text-2xl">Om Som Somaya Namah.</div>
                </div>
              </div>

              <div className="mt-8 border-t border-white/10 pt-6">
                <div className="text-center font-caveat text-3xl text-[#f0d79b] sm:text-4xl">
                  Chandra&apos;s 8 Phases of Nourishment
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4 text-center sm:grid-cols-4 xl:grid-cols-8">
                  {phases.map((phase) => (
                    <div key={phase.name} className="rounded-2xl border border-white/10 bg-white/5 px-3 py-4">
                      <div className="text-4xl leading-none text-[#d5e7ff] drop-shadow-[0_0_10px_rgba(172,205,255,0.45)]">
                        {phase.glyph}
                      </div>
                      <div className="mt-3 font-caveat text-2xl leading-none text-[#f0d79b]">{phase.name}</div>
                      <div className="mt-1 text-sm leading-snug text-white/65">{phase.sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#f4ecda] py-20 text-[#26180d]">
          <div
            className="absolute inset-0 opacity-65"
            style={{
              backgroundImage: `linear-gradient(rgba(244,236,218,0.9), rgba(244,236,218,0.9)), url(${PARCHMENT_URL})`,
              backgroundSize: '780px',
              backgroundPosition: 'center',
            }}
          />

          <img src={MOON_DOODLE_URL} alt="" className="pointer-events-none absolute right-6 top-24 hidden h-24 w-24 opacity-10 lg:block" />
          <img src={STAR_ACCENT_URL} alt="" className="pointer-events-none absolute left-8 top-[34rem] hidden h-14 w-14 opacity-15 lg:block" />

          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <div className="space-y-12">
                {editorialSections.map((section, index) => (
                  <div key={section.title}>
                    <h2 className="font-caveat text-4xl leading-none text-[#1d2f61] sm:text-5xl">{section.title}</h2>
                    <div className="mt-3 h-[3px] w-36 rounded-full bg-gradient-to-r from-blue-700 via-blue-400 to-transparent" />
                    <div className="mt-6 space-y-4 text-lg leading-8 text-[#332117]">
                      {section.paragraphs.map((paragraph, paragraphIndex) => (
                        <p
                          key={paragraph}
                          className={paragraphIndex === 0 ? 'drop-cap' : undefined}
                          style={
                            paragraphIndex === 0
                              ? ({ ['--accent-color' as string]: '#6c9bf5' } as CSSProperties)
                              : undefined
                          }
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                    {index === 1 ? (
                      <div className="mt-8 rounded-[28px] border border-[#8c6e47]/25 p-3 shadow-[0_18px_35px_rgba(56,40,22,0.12)]" style={cardTextureStyle}>
                        <img
                          src={MOON_SAGE_URL}
                          alt="Meditative sage beneath moonlight"
                          className="w-full rounded-[22px] object-cover"
                        />
                        <div className="mt-3 font-kalam text-lg text-[#1d2f61]">
                          In stillness, Chandra teaches that peace is not passivity, but receptive intelligence.
                        </div>
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>

              <div className="space-y-6 lg:sticky lg:top-24">
                <ParchmentCard rotate="lg:rotate-[0.35deg]">
                  <div className="flex items-start gap-3">
                    <div className="text-[#24447e]">{iconSvg('faq', 'h-7 w-7')}</div>
                    <div>
                      <h3 className="font-caveat text-4xl leading-none text-[#1a110a]">Lunar Notes</h3>
                      <p className="mt-2 font-kalam text-lg leading-relaxed text-[#2a190f]">
                        The Moon does not ask us to perform brilliance at all times. It asks whether we know how to receive, restore, and remain emotionally sincere.
                      </p>
                    </div>
                  </div>
                </ParchmentCard>

                <ParchmentCard rotate="lg:-rotate-[0.3deg]">
                  <div className="font-caveat text-4xl leading-none text-[#1a110a]">Core Associations</div>
                  <div className="mt-4 space-y-3 font-kalam text-lg leading-relaxed text-[#2a190f]">
                    <div><span className="font-semibold text-[#24447e]">Karaka:</span> Mind, mother, emotional nourishment</div>
                    <div><span className="font-semibold text-[#24447e]">Natural Sign:</span> Cancer</div>
                    <div><span className="font-semibold text-[#24447e]">Temperament:</span> Cool, reflective, receptive</div>
                    <div><span className="font-semibold text-[#24447e]">Colour:</span> White, silver, soft blue</div>
                    <div><span className="font-semibold text-[#24447e]">Lifestyle Medicine:</span> Rest, water, rhythm, devotion</div>
                  </div>
                </ParchmentCard>

                <div className="rounded-[28px] border border-white/10 bg-[#071127]/90 p-5 text-white shadow-[0_22px_55px_rgba(0,0,0,0.32)]">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="font-caveat text-4xl leading-none text-[#dbe7ff]">Closing Light</div>
                      <div className="mt-2 font-kalam text-lg text-white/75">
                        A cooling lunar invocation to settle the page.
                      </div>
                    </div>
                    <img src={DIYA_URL} alt="" className="h-16 w-16" />
                  </div>
                  <div className="mt-5 font-devanagari text-3xl text-[#dbe7ff]">चन्द्रमा मनसो जातः ।</div>
                  <div className="mt-2 font-kalam text-xl text-white/80">Candramā manaso jātaḥ.</div>
                  <div className="mt-2 text-sm leading-relaxed text-white/60">
                    The Moon is born from the mind, a reminder that emotional reality deserves reverence, not dismissal.
                  </div>
                </div>

                <ParchmentCard rotate="lg:rotate-[0.4deg]">
                  <h3 className="font-caveat text-[1.7rem] leading-tight text-[#1a110a]">Quick Facts</h3>
                  <div className="mt-1 h-[2px] w-24 rounded-full bg-gradient-to-r from-[#24447e] via-[#93c5fd] to-transparent" />
                  <div className="mt-4 space-y-2.5 font-kalam text-lg leading-relaxed text-[#2a190f]">
                    <div><span className="font-semibold text-[#24447e]">Element:</span> Water (Jal)</div>
                    <div><span className="font-semibold text-[#24447e]">Day:</span> Monday (Somavara)</div>
                    <div><span className="font-semibold text-[#24447e]">Direction:</span> North-West</div>
                    <div><span className="font-semibold text-[#24447e]">Mahadasha:</span> 10 years</div>
                    <div><span className="font-semibold text-[#24447e]">Friends:</span> Sun, Mercury</div>
                    <div><span className="font-semibold text-[#24447e]">Enemies:</span> None (friendly to all)</div>
                    <div><span className="font-semibold text-[#24447e]">Neutral:</span> Mars, Jupiter, Venus, Saturn</div>
                  </div>
                </ParchmentCard>

                <ParchmentCard rotate="lg:-rotate-[0.3deg]">
                  <h3 className="font-caveat text-[1.7rem] leading-tight text-[#1a110a]">Did You Know?</h3>
                  <div className="mt-1 h-[2px] w-24 rounded-full bg-gradient-to-r from-[#24447e] via-[#93c5fd] to-transparent" />
                  <ul className="mt-4 space-y-3 font-kalam text-base leading-snug text-[#2a190f]">
                    <li>Chandra waxes and wanes on a 28-day cycle, mirrored in the human menstrual rhythm and emotional tides.</li>
                    <li>The Moon is exalted in Taurus, the sign of nourishment and steady comfort.</li>
                    <li>Soma, an alternate name for Chandra, also refers to the sacred ritual nectar in Vedic ceremonies.</li>
                    <li>Worshippers offer water (arghya) to Chandra on Monday nights, especially during Purnima (full moon).</li>
                  </ul>
                </ParchmentCard>

                <ParchmentCard rotate="lg:rotate-[0.35deg]">
                  <h3 className="font-caveat text-[1.7rem] leading-tight text-[#1a110a]">Mantra at a Glance</h3>
                  <div className="mt-1 h-[2px] w-24 rounded-full bg-gradient-to-r from-[#24447e] via-[#93c5fd] to-transparent" />
                  <p className="mt-3 font-kalam text-base leading-snug text-[#2a190f]">
                    Chandra Navagraha Stotra is shown in the Sacred Mantras section above.
                  </p>
                  <div className="mt-3 space-y-2 font-kalam text-base leading-snug text-[#2a190f]">
                    <div><span className="font-semibold text-[#24447e]">Day:</span> Monday</div>
                    <div><span className="font-semibold text-[#24447e]">Direction:</span> Face West (evening)</div>
                    <div><span className="font-semibold text-[#24447e]">Best time:</span> Moonrise or Purnima night</div>
                    <div><span className="font-semibold text-[#24447e]">Repetitions:</span> 108 with a rosary</div>
                    <div className="pt-1 italic text-[#2a190f]/80">
                      Keynote: Namāmi śaśinaṁ somaṁ, salutation to the calming hare-marked Moon.
                    </div>
                  </div>
                </ParchmentCard>

                <ParchmentCard rotate="lg:-rotate-[0.4deg]">
                  <h3 className="font-caveat text-[1.7rem] leading-tight text-[#1a110a]">Notable Influences</h3>
                  <div className="mt-1 h-[2px] w-24 rounded-full bg-gradient-to-r from-[#24447e] via-[#93c5fd] to-transparent" />
                  <p className="mt-2 font-kalam text-base leading-snug text-[#2a190f]">
                    Chandra governs:
                  </p>
                  <ul className="mt-2 space-y-1.5 font-kalam text-base leading-snug text-[#2a190f]">
                    <li>Mothers, caregivers, nurses</li>
                    <li>Hoteliers and hospitality workers</li>
                    <li>Travellers and sailors</li>
                    <li>Public-facing professionals</li>
                    <li>Dairy and milk industry workers</li>
                    <li>Poets and lyricists</li>
                    <li>Therapists and counsellors</li>
                    <li>Midwives and obstetricians</li>
                  </ul>
                </ParchmentCard>

                <ParchmentCard rotate="lg:rotate-[0.25deg]">
                  <div className="font-caveat text-xl italic leading-tight text-[#24447e]/80">
                    A line worth carrying
                  </div>
                  <blockquote className="mt-3 font-caveat text-[2rem] leading-tight text-[#1a110a] sm:text-[2.3rem]">
                    The deepest lunar teaching is not speed, conquest, or control. It is attunement.
                  </blockquote>
                  <div className="mt-3 font-kalam text-sm leading-relaxed text-[#2a190f]/70">
                    Drawn from the body above, this is the quiet heart of Chandra&apos;s wisdom.
                  </div>
                </ParchmentCard>

                <ParchmentCard rotate="lg:-rotate-[0.35deg]">
                  <h3 className="font-caveat text-[1.7rem] leading-tight text-[#1a110a]">Continue Your Journey</h3>
                  <div className="mt-1 h-[2px] w-24 rounded-full bg-gradient-to-r from-[#24447e] via-[#93c5fd] to-transparent" />
                  <p className="mt-2 font-kalam text-base leading-snug text-[#2a190f]">
                    Explore the other Navagraha pillars.
                  </p>
                  <ul className="mt-3 space-y-2 font-kalam text-lg leading-snug">
                    <li>
                      <Link to="/planets/sun" className="text-[#24447e] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#93c5fd]">
                        Surya (Sun) →
                      </Link>
                    </li>
                    <li>
                      <Link to="/planets/mercury" className="text-[#24447e] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#93c5fd]">
                        Budh (Mercury) →
                      </Link>
                    </li>
                    <li>
                      <Link to="/planets" className="text-[#24447e] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#93c5fd]">
                        Explore all 9 Navagraha planets →
                      </Link>
                    </li>
                  </ul>
                </ParchmentCard>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f1e7d1] py-20 text-[#26180d]">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <div className="font-caveat text-5xl leading-none text-[#1d2f61] sm:text-6xl">Frequently Asked Questions</div>
              <p className="mx-auto mt-4 max-w-2xl font-kalam text-xl leading-relaxed text-[#3a271a]">
                Common questions about Chandra, Moon strength, remedies, and how lunar energy works in a Vedic chart.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={faq.question}
                    className="overflow-hidden rounded-[24px] border border-[#8c6e47]/25 shadow-[0_15px_30px_rgba(64,40,18,0.12)]"
                    style={cardTextureStyle}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? -1 : index)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-1 text-[#24447e]">{iconSvg('faq', 'h-6 w-6')}</div>
                        <h3 className="font-kalam text-xl leading-relaxed text-[#2a190f]">{faq.question}</h3>
                      </div>
                      <div className="text-[#24447e]">
                        <svg viewBox="0 0 24 24" className={`h-6 w-6 transition-transform ${isOpen ? 'rotate-45' : ''}`} fill="none" stroke="currentColor" strokeWidth="1.8">
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                      </div>
                    </button>
                    {isOpen ? (
                      <div className="px-5 pb-5 sm:px-6">
                        <div className="border-t border-[#8c6e47]/15 pt-4 font-kalam text-lg leading-relaxed text-[#38251a]">
                          {faq.answer}
                        </div>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
