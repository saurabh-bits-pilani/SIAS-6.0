import { useMemo, useState, type CSSProperties } from 'react';
import SEOHead from '../../components/SEOHead';
import {
  getArticleSchema,
  getBreadcrumbSchema,
  getFaqPageSchemaFromList,
  getWebPageSchema,
  type JsonLd,
  SITE_ORIGIN,
} from '../../data/schema-entities';

const SUN_ASSET_BASE =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Pillar/Planets/Sun';
const SUN_HERO_URL = `${SUN_ASSET_BASE}/hero-surya.webp`;
const RUBY_RING_URL = `${SUN_ASSET_BASE}/ruby-ring.webp`;
const PARCHMENT_URL = `${SUN_ASSET_BASE}/parchment-texture.webp`;
const STAR_ACCENT_URL = `${SUN_ASSET_BASE}/star-accent.svg`;
const DIYA_URL = `${SUN_ASSET_BASE}/diya.svg`;
const FEATHER_URL = `${SUN_ASSET_BASE}/feather-quill.png`;

const PAGE_TITLE =
  'Surya (Sun) in Vedic Astrology: Meaning, Mantras, Remedies | Soul Infinity';
const PAGE_DESCRIPTION =
  'Complete guide to Surya in Vedic astrology, including Sun mantras, birth chart meaning, house results, Surya Mahadasha, Ruby guidance, and traditional remedies.';
const PAGE_KEYWORDS =
  'surya, sun in vedic astrology, sun mantra, navagraha, ruby gemstone, manikya, sun remedies, leo ruler, aries exaltation, soul infinity';
const PAGE_URL = `${SITE_ORIGIN}/planets/sun`;

type IconName =
  | 'planet'
  | 'fire'
  | 'nature'
  | 'metal'
  | 'day'
  | 'soul'
  | 'crown'
  | 'sign'
  | 'up'
  | 'down'
  | 'direction'
  | 'symbol'
  | 'benefit'
  | 'connect'
  | 'gem'
  | 'quote'
  | 'faq'
  | 'water'
  | 'heart';

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
  { icon: 'planet', label: 'Planet', value: 'Surya' },
  { icon: 'fire', label: 'Element', value: 'Fire' },
  { icon: 'nature', label: 'Nature', value: 'Masculine' },
  { icon: 'metal', label: 'Metal', value: 'Gold' },
  { icon: 'day', label: 'Day', value: 'Sunday' },
];

const mantras: MantraBlock[] = [
  {
    title: 'Navagraha Stotra, Surya Mantra',
    devanagari:
      'जपाकुसुम संकाशं काश्यपेयं महाद्युतिम् । तमोऽरिं सर्वपापघ्नं प्रणतोऽस्मि दिवाकरम् ॥',
    iast:
      "Japākusuma saṅkāśaṁ kāśyapeyaṁ mahādhyutim | Tamo'riṁ sarva-pāpaghnaṁ praṇato'smi divākaram ||",
    meaning:
      'I bow to Surya, who shines like the red hibiscus flower, son of Kashyapa, greatly radiant, the enemy of darkness and destroyer of all sins.',
  },
  {
    title: 'Beej Mantra for Surya',
    devanagari: 'ॐ सूर्याय नमः ॥',
    iast: 'Om Sūryāya namaḥ ||',
    meaning: 'Salutations to Surya, the luminous lord of the soul.',
  },
];

const lifeRows: DetailRow[] = [
  { icon: 'soul', label: 'Represents', value: 'Soul, Atma, Consciousness' },
  {
    icon: 'crown',
    label: 'Governs',
    value: 'Father, Leadership, Authority, Confidence',
  },
  { icon: 'sign', label: 'Signs Ruled', value: 'Leo (Simha)' },
  { icon: 'up', label: 'Exalted In', value: 'Aries (Mesha)' },
  { icon: 'down', label: 'Debilitated In', value: 'Libra (Tula)' },
  { icon: 'direction', label: 'Direction', value: 'East' },
  { icon: 'symbol', label: 'Symbol', value: 'Circle with a dot' },
];

const benefits = [
  'Boosts confidence and self-esteem',
  'Improves leadership qualities',
  'Brings success, recognition, and fame',
  'Enhances vitality and immune system',
  'Dispels negative energy and darkness',
  'Brings clarity, purpose, and willpower',
];

const connectPractices = [
  'Chant Surya mantra at sunrise facing East',
  'Offer water (Arghya) to the rising Sun',
  'Wear Ruby (Manikya) in gold on ring finger after verification',
  'Observe fast on Sundays with light vegetarian food',
  'Practice gratitude and act with integrity',
];

const rays = [
  { glyph: '☀', name: 'Dawn Rising', sub: 'Awaken awareness' },
  { glyph: '✺', name: 'Morning Light', sub: 'Ignite purpose' },
  { glyph: '◉', name: 'Midday Sun', sub: 'Full expression' },
  { glyph: '✹', name: 'Afternoon Glow', sub: 'Sustained effort' },
  { glyph: '✦', name: 'Golden Hour', sub: 'Inner reflection' },
  { glyph: '◐', name: 'Sunset', sub: 'Release with gratitude' },
  { glyph: '✧', name: 'Twilight', sub: 'Rest in stillness' },
];

const houses = [
  ['1st', 'First House', 'A visible solar identity, confidence, independence, and a strong need to lead life from the front.'],
  ['2nd', 'Second House', 'Authoritative speech, family pride, financial responsibility, and a voice that carries weight.'],
  ['3rd', 'Third House', 'Courage, initiative, communication strength, entrepreneurial will, and a self-made path.'],
  ['4th', 'Fourth House', 'A private need for inner authority, complex home themes, and effort to build emotional sovereignty.'],
  ['5th', 'Fifth House', 'Creative command, teaching talent, mantra affinity, and a strong bond with intelligence and children.'],
  ['6th', 'Sixth House', 'Capacity to defeat obstacles, serve with discipline, and build vitality through routine.'],
  ['7th', 'Seventh House', 'Partnerships with strong personalities and lessons around balancing selfhood with cooperation.'],
  ['8th', 'Eighth House', 'Deep research, occult interest, identity transformation, and karmic father themes.'],
  ['9th', 'Ninth House', 'Dharma, blessings from teachers, respect for tradition, and confidence in moral direction.'],
  ['10th', 'Tenth House', 'Career visibility, public authority, institutional recognition, and strong professional drive.'],
  ['11th', 'Eleventh House', 'Gains through leaders, networks, elder circles, and goal-oriented solar ambition.'],
  ['12th', 'Twelfth House', 'Foreign links, inner spiritual focus, work behind the scenes, and ego refinement through surrender.'],
];

const remedies = [
  ['Chant at Sunrise', 'Repeat the Surya mantra at sunrise while facing East, with a steady mind and clean intention.'],
  ['Offer Arghya', 'Offer water to the rising Sun, traditionally with reverence, gratitude, and simple discipline.'],
  ['Ruby With Verification', 'Wear Ruby only after chart analysis confirms that strengthening Surya is appropriate.'],
  ['Sunday Discipline', 'Observe a light Sunday fast or simplified diet if suitable for your health and lifestyle.'],
  ['Honor Father Figures', 'Repair respect, responsibility, and gratitude toward father, mentors, and righteous authority.'],
  ['Live With Integrity', 'Choose truth, punctuality, accountability, and clear promises as daily solar remedies.'],
];

const editorialSections: EditorialSection[] = [
  {
    title: 'Surya: The Soul of Vedic Astrology',
    paragraphs: [
      'Surya is the visible heart of the sky and the inner heart of the horoscope. In Vedic astrology, the Sun is not only a marker of personality. It is the radiant witness, the Atma principle, and the flame of consciousness that gives direction to the rest of the chart. Where Chandra receives and reflects, Surya shines and organizes. It gives life a center.',
      'A healthy Sun gives the courage to stand in truth without becoming harsh. It supports self-respect, clarity of purpose, vitality, and the ability to carry responsibility. When Surya is honored, a person does not need constant validation. Their life begins to move from inner authority rather than comparison.',
      'This is why Surya is studied carefully in every serious chart reading. The placement of the Sun by sign, house, nakshatra, dignity, aspect, and dasha reveals how the soul seeks expression. It also shows where the native must learn the difference between ego and essence.',
    ],
  },
  {
    title: 'Significations of the Sun in a Birth Chart',
    paragraphs: [
      'The Sun represents father, authority, government, leadership, fame, honor, bones, heart, right eye, confidence, immunity, and the power to command. It shows the quality of self-esteem and the way a person relates to visible responsibility. A strong Sun can make a person naturally dignified, decisive, and willing to lead.',
      'Surya also reveals how one handles recognition. Some people seek attention because the solar principle feels wounded. Others carry presence without effort because the Sun is stable. In consultation, this difference matters. A remedy for weak confidence is not the same as a remedy for inflated pride.',
      'The Sun is a natural malefic because its heat separates, dries, and burns away softness. Yet that heat is also purifying. It can remove confusion, expose falsehood, and help a person choose dharma over comfort. The result depends on the full chart, not on one placement alone.',
    ],
  },
  {
    title: 'Sun in the 12 Houses',
    paragraphs: [
      'The house occupied by Surya shows where the soul seeks visibility and where life asks the person to develop authority. These summaries are starting points. Sign, aspects, combustion, conjunctions, nakshatra, divisional charts, and dasha timing must refine the final reading.',
    ],
  },
  {
    title: "Sun's Dignities: Exaltation, Debilitation, and Relationships",
    paragraphs: [
      'Surya is exalted in Aries, where courage and initiative support the solar will. It rules Leo, the royal sign of self-expression, command, and visible dignity. It is debilitated in Libra, where the need to balance, please, or negotiate can weaken direct self-assertion. Debilitation does not mean failure. It means the solar principle must be trained consciously.',
      'In classical relationship tables, the Sun is friendly to Moon, Mars, and Jupiter; neutral to Mercury; and challenged by Venus and Saturn. Rahu and Ketu can create eclipse-like conditions when they closely afflict Surya. Such combinations often bring unusual authority themes, father karma, public visibility, or identity reinvention.',
      'A careful reading does not stop at dignity. Saurabh Jain also evaluates Shadbala, Ashtakavarga, combustion context, nakshatra lord, yogas, and functional benefic or malefic role for the ascendant. A debilitated Sun may rise through Neecha Bhanga, while an exalted Sun can still act harshly if poorly supported.',
    ],
  },
  {
    title: 'Surya Mahadasha: The Six-Year Period',
    paragraphs: [
      'Surya Mahadasha lasts six years in the Vimshottari Dasha system. It is often a period of crystallization. Themes of authority, father, health, recognition, role clarity, career direction, and self-respect come forward. The person may feel called to stop hiding and make a more defined choice about life direction.',
      'If the Sun is strong and supportive, this period can bring promotion, leadership, public respect, clearer purpose, and a stronger relationship with discipline. If the Sun is weak or afflicted, the same period may surface ego wounds, conflicts with authority, vitality concerns, or pressure around father-related duties.',
      'The antardashas inside Surya Mahadasha make the story more precise. A Sun-Mars period behaves differently from Sun-Saturn or Sun-Rahu. Timing is therefore not guessed from the Sun alone. It is read through the full dasha sequence and the natal promise of the chart.',
    ],
  },
  {
    title: 'Traditional Remedies for a Weak or Afflicted Sun',
    paragraphs: [
      'Surya remedies are simple, bright, and disciplined. They are not meant to force destiny. They help the person align with the healthy form of solar energy: truthfulness, punctuality, gratitude, vitality, and respect for rightful authority. The best remedies are repeated steadily rather than performed dramatically once.',
      'Mantra and sunrise practice are usually safer than gemstones. Ruby can amplify Surya power, which is useful only when the chart can receive that amplification. If the Sun is functionally difficult, afflicted, or tied to sensitive houses, gemstone use may intensify problems instead of solving them.',
      'Lifestyle is also a remedy. Waking closer to sunrise, protecting the heart through healthy routines, keeping promises, honoring mentors, and choosing honest leadership all strengthen the lived expression of Surya.',
    ],
  },
  {
    title: 'Surya in Modern Life',
    paragraphs: [
      'In modern life, Surya shows up as confidence, executive presence, boundaries, career direction, personal branding, and the courage to be seen. Many people with a weak solar principle can be talented yet hesitant. They wait for permission, avoid visibility, or feel drained by comparison. Strengthening Surya helps them return to their own center.',
      'A balanced Sun does not dominate every room. It brings warmth, steadiness, and accountability. It makes leadership feel like service rather than performance. This is especially important for founders, managers, teachers, healers, parents, and anyone whose decisions affect others.',
      'The modern solar remedy is not only ritual. It is also a calendar that reflects priorities, a body cared for with sunlight and movement, a voice that speaks truth, and a life arranged around purpose instead of noise.',
    ],
  },
  {
    title: 'How Saurabh Jain Reads Surya in Your Chart',
    paragraphs: [
      'Saurabh Jain reads Surya through a layered Vedic method that combines classical Parashari principles with timing, dignity, nakshatra, and practical remedy logic. His training at the K.N. Rao Institute and his background across M.Tech, MBA, and M.Phil disciplines help him translate traditional chart factors into clear life guidance.',
      'A personalized Surya reading looks at the Sun sign and house, conjunctions, aspects, combustion patterns, dasha activation, divisional support, and the Sun relationship to the ascendant. The goal is not to label the planet as simply good or bad. The goal is to understand what the soul is trying to mature through this solar placement.',
      'Where appropriate, Saurabh may recommend mantra, Arghya, Sunday discipline, integrity practices, father-related healing, or gemstone verification. The guidance stays practical, respectful, and chart-specific so the client knows exactly how to honor Surya without fear or exaggeration.',
    ],
  },
];

const faqs: FaqItem[] = [
  {
    question: 'What does Surya represent in Vedic astrology?',
    answer:
      'Surya represents the Atma or soul, father, authority, leadership, self-esteem, vitality, recognition, and the central life force in a birth chart.',
  },
  {
    question: 'What are the effects of a strong Sun in a birth chart?',
    answer:
      'A strong Sun can support confidence, leadership, recognition, vitality, respect from authority, clarity of purpose, and the ability to carry responsibility with dignity.',
  },
  {
    question: 'How do I know if my Sun is weak or afflicted?',
    answer:
      'Common indicators include debilitation in Libra, heavy affliction from Saturn or Rahu, difficult house placement, low Shadbala, or repeated life themes around confidence, father, authority, and vitality. The full chart must confirm this.',
  },
  {
    question: 'Can wearing Ruby strengthen my Sun?',
    answer:
      'Ruby is the traditional gemstone for Surya, but it should be worn only after astrological verification. A gemstone amplifies the planet, so it is not suitable for every chart.',
  },
  {
    question: 'How long is Surya Mahadasha and what does it bring?',
    answer:
      'Surya Mahadasha lasts six years. It often brings themes of authority, recognition, father, health, self-respect, career direction, and important lessons around ego and purpose.',
  },
  {
    question: 'Is Surya Namaskar an effective remedy for a weak Sun?',
    answer:
      'Surya Namaskar can be a helpful lifestyle remedy when practiced regularly at sunrise with breath, gratitude, and mantra. It supports vitality, discipline, and solar awareness.',
  },
  {
    question: 'What is the difference between Sun in Vedic versus Western astrology?',
    answer:
      'Vedic astrology uses the sidereal zodiac and reads the Sun as a karaka for soul, father, authority, and vitality. Western astrology commonly emphasizes tropical Sun-sign personality. Both systems have different calculations and interpretive logic.',
  },
];

const cardTextureStyle = {
  backgroundImage: `linear-gradient(rgba(245,230,200,0.95), rgba(245,230,200,0.95)), url(${PARCHMENT_URL})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

const SolarFieldDoodle = ({ className = '' }: { className?: string }) => (
  <svg
    className={`pointer-events-none ${className}`}
    viewBox="0 0 900 620"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
  >
    {Array.from({ length: 74 }).map((_, i) => {
      const x = (i * 157) % 900;
      const y = (i * 101) % 620;
      const r = 0.6 + (((i * 9) % 10) / 10) * 1.5;
      const opacity = 0.22 + (((i * 17) % 10) / 10) * 0.55;
      return <circle key={i} cx={x} cy={y} r={r} fill="#facc15" opacity={opacity} />;
    })}
  </svg>
);

const SolarOrbitDoodle = ({ className = '' }: { className?: string }) => (
  <svg
    className={`pointer-events-none ${className}`}
    viewBox="0 0 800 600"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
  >
    <circle cx="420" cy="290" r="130" fill="none" stroke="#facc15" strokeWidth="0.7" strokeDasharray="2 5" opacity="0.55" />
    <circle cx="420" cy="290" r="190" fill="none" stroke="#f59e0b" strokeWidth="0.6" strokeDasharray="3 7" opacity="0.42" />
    <circle cx="420" cy="290" r="260" fill="none" stroke="#fb923c" strokeWidth="0.5" strokeDasharray="2 9" opacity="0.33" />
    {Array.from({ length: 18 }).map((_, i) => {
      const angle = (Math.PI * 2 * i) / 18;
      const x1 = 420 + Math.cos(angle) * 160;
      const y1 = 290 + Math.sin(angle) * 160;
      const x2 = 420 + Math.cos(angle) * 176;
      const y2 = 290 + Math.sin(angle) * 176;
      return <path key={i} d={`M${x1} ${y1} ${x2} ${y2}`} stroke="#facc15" strokeWidth="1" opacity="0.38" />;
    })}
  </svg>
);

function iconSvg(name: IconName, className = 'h-6 w-6'): JSX.Element {
  const base = 'none';
  switch (name) {
    case 'planet':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="1.8" fill="currentColor" />
        </svg>
      );
    case 'fire':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.8">
          <path d="M12 21c4 0 7-2.8 7-6.8 0-2.7-1.5-4.9-3.2-6.6-.3 2.2-1.4 3.5-2.5 4.2.3-3.4-1.5-6.3-4.1-8.8.1 3.7-2.2 5.5-3.3 7.6A7 7 0 0 0 5 14.2C5 18.2 8 21 12 21Z" />
        </svg>
      );
    case 'nature':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="8" r="4" />
          <path d="M12 12v8M8 16h8" />
        </svg>
      );
    case 'metal':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.8">
          <path d="m12 3 6 4v10l-6 4-6-4V7l6-4Z" />
          <path d="m12 3v18M6 7l6 4 6-4" />
        </svg>
      );
    case 'day':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="5" width="18" height="16" rx="2.5" />
          <path d="M7 3v4M17 3v4M3 10h18" />
        </svg>
      );
    case 'soul':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.8">
          <path d="M12 3c3.5 3 5.5 6 5.5 9.2A5.5 5.5 0 0 1 12 18a5.5 5.5 0 0 1-5.5-5.8C6.5 9 8.5 6 12 3Z" />
          <path d="M8 21h8" />
        </svg>
      );
    case 'crown':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.8">
          <path d="m4 8 4 4 4-7 4 7 4-4-2 10H6L4 8Z" />
          <path d="M6 21h12" />
        </svg>
      );
    case 'sign':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.8">
          <path d="M6 17c3-8 9-8 12 0" />
          <path d="M7 7c2 1.8 3.6 2.7 5 2.7S15 8.8 17 7" />
          <path d="M8 17h8" />
        </svg>
      );
    case 'up':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.8">
          <path d="M12 19V5M6.5 10.5 12 5l5.5 5.5" />
        </svg>
      );
    case 'down':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.8">
          <path d="M12 5v14M17.5 13.5 12 19l-5.5-5.5" />
        </svg>
      );
    case 'direction':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="8" />
          <path d="m10 14 6-6-2 8-4-2Z" />
        </svg>
      );
    case 'symbol':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="7" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        </svg>
      );
    case 'benefit':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="2">
          <path d="m5 12 4 4 10-10" />
        </svg>
      );
    case 'connect':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" />
        </svg>
      );
    case 'gem':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.8">
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
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.8">
          <path d="M12 18h.01M9.2 9.3a2.8 2.8 0 1 1 4.6 2.2c-.9.7-1.5 1.2-1.5 2.5" />
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
    case 'water':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.8">
          <path d="M12 3c3 4 5.5 6.7 5.5 10.3A5.5 5.5 0 1 1 6.5 13.3C6.5 9.7 9 7 12 3Z" />
        </svg>
      );
    case 'heart':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.8">
          <path d="M12 20s-7-4.3-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.7-7 10-7 10Z" />
        </svg>
      );
  }
}

function Highlight({ children }: { children: string }) {
  return <span className="highlight-marker rounded px-1.5 py-0.5 text-[#241306]">{children}</span>;
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
      className={`card-parchment relative overflow-hidden border border-[#8c4f1e]/45 p-5 text-[#2b1a0f] shadow-[0_10px_30px_rgba(0,0,0,0.5)] sm:p-6 ${rotate} ${className}`}
      style={cardTextureStyle}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.35),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(92,42,11,0.2),transparent_30%)]" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function SunMandala({ className = 'h-16 w-16' }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="40" cy="40" r="13" />
      <circle cx="40" cy="40" r="22" strokeDasharray="3 5" />
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (Math.PI * 2 * i) / 16;
        const x1 = 40 + Math.cos(angle) * 28;
        const y1 = 40 + Math.sin(angle) * 28;
        const x2 = 40 + Math.cos(angle) * 36;
        const y2 = 40 + Math.sin(angle) * 36;
        return <path key={i} d={`M${x1} ${y1} ${x2} ${y2}`} strokeLinecap="round" />;
      })}
    </svg>
  );
}

function SectionRule() {
  return (
    <div className="my-10 flex items-center gap-4 text-[#b45309]/60">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#f59e0b] to-transparent" />
      <SunMandala className="h-9 w-9" />
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#f59e0b] to-transparent" />
    </div>
  );
}

function EditorialSidebar() {
  return (
    <div className="space-y-6 lg:sticky lg:top-24">
      <ParchmentCard rotate="lg:rotate-[0.35deg]">
        <div className="flex items-start gap-3">
          <div className="text-[#b45309]">{iconSvg('connect', 'h-7 w-7')}</div>
          <div>
            <h3 className="font-caveat text-4xl leading-none text-[#2b1a0f]">Solar Notes</h3>
            <p className="mt-2 font-kalam text-lg leading-relaxed text-[#3b2414]">
              Surya does not ask us to perform brightness. It asks us to live from a steady center.
            </p>
          </div>
        </div>
      </ParchmentCard>

      <ParchmentCard rotate="lg:-rotate-[0.3deg]">
        <div className="font-caveat text-4xl leading-none text-[#2b1a0f]">Core Associations</div>
        <div className="mt-4 space-y-3 font-kalam text-lg leading-relaxed text-[#3b2414]">
          <div><span className="font-semibold text-[#b45309]">Karaka:</span> Soul, father, authority</div>
          <div><span className="font-semibold text-[#b45309]">Natural Sign:</span> Leo</div>
          <div><span className="font-semibold text-[#b45309]">Temperament:</span> Hot, royal, clarifying</div>
          <div><span className="font-semibold text-[#b45309]">Colour:</span> Gold, saffron, copper-red</div>
          <div><span className="font-semibold text-[#b45309]">Lifestyle Medicine:</span> Sunrise, truth, discipline</div>
        </div>
      </ParchmentCard>

      <div className="rounded-[28px] border border-[#facc15]/20 bg-[#1a0f05]/95 p-5 text-white shadow-[0_22px_55px_rgba(0,0,0,0.34)]">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="font-caveat text-4xl leading-none text-[#facc15]">Closing Light</div>
            <div className="mt-2 font-kalam text-lg text-white/75">
              A solar reminder to choose clarity over confusion.
            </div>
          </div>
          <img src={DIYA_URL} alt="" className="h-16 w-16" />
        </div>
        <div className="mt-5 font-devanagari text-3xl text-[#facc15]">तमसो मा ज्योतिर्गमय ।</div>
        <div className="mt-2 font-kalam text-xl text-white/80">Lead me from darkness to light.</div>
      </div>
    </div>
  );
}

export default function SunPage() {
  const [openFaq, setOpenFaq] = useState<number>(0);

  const schemas = useMemo<JsonLd[]>(
    () => [
      getArticleSchema({
        headline: 'Surya (Sun) in Vedic Astrology: Meaning, Mantras, Remedies, and FAQ',
        description: PAGE_DESCRIPTION,
        image: SUN_HERO_URL,
        datePublished: '2026-04-23',
        dateModified: '2026-04-23',
        url: '/planets/sun',
        articleSection: 'Vedic Astrology',
        keywords: [
          'Surya',
          'Sun in Vedic astrology',
          'Surya mantra',
          'Ruby gemstone',
          'Sun remedies',
          'Surya Mahadasha',
        ],
      }),
      getFaqPageSchemaFromList(faqs),
      getBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Planets', url: '/planets' },
        { name: 'Sun (Surya)', url: '/planets/sun' },
      ]),
      getWebPageSchema({
        name: 'Surya (Sun) in Vedic Astrology',
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
        image={SUN_HERO_URL}
        url={PAGE_URL}
        type="article"
        schemas={schemas}
      />

      <div className="bg-[#050200] text-white">
        <section
          className="relative overflow-hidden"
          style={{
            background:
              'radial-gradient(circle at 66% 18%, rgba(245,158,11,0.56) 0%, rgba(124,45,18,0.44) 28%, rgba(26,15,5,0.98) 56%, #000 100%)',
          }}
        >
          <div
            className="absolute inset-0 bg-cover bg-[center_right_20%] bg-no-repeat"
            style={{ backgroundImage: `url(${SUN_HERO_URL})` }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,6,2,0.96)_0%,rgba(18,9,3,0.88)_20%,rgba(18,9,3,0.45)_42%,rgba(18,9,3,0.08)_72%,rgba(18,9,3,0.01)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,2,0,0.1)_0%,rgba(5,2,0,0.2)_42%,rgba(5,2,0,0.78)_100%)]" />
          <div className="absolute inset-0 opacity-80 mix-blend-screen">
            <SolarFieldDoodle className="absolute inset-0" />
          </div>

          <div className="mx-auto max-w-[1440px] px-4 pb-8 pt-6 sm:px-6 lg:px-10">
            <div className="relative mt-2 min-h-[34rem] sm:min-h-[39rem] lg:min-h-[44rem] xl:min-h-[48rem]">
              <div className="relative z-10 max-w-2xl pt-8 sm:pt-12 lg:max-w-[43rem] lg:pt-16">
                <div className="mb-5 text-sm uppercase tracking-[0.45em] text-[#f8d985]/90">
                  Planetary Wisdom
                </div>
                <div className="relative inline-block">
                  <h1 className="font-sacramento text-[5.2rem] leading-[0.86] text-[#facc15] drop-shadow-[0_0_34px_rgba(250,204,21,0.58)] sm:text-[6.7rem] lg:text-[8.4rem] xl:text-[9.2rem]">
                    Surya
                  </h1>
                  <SunMandala className="absolute -right-14 -top-3 hidden h-12 w-12 text-[#facc15] sm:block" />
                </div>
                <h2 className="mt-4 font-caveat text-4xl leading-none text-white sm:text-5xl lg:text-[4rem]">
                  The Radiant Soul
                </h2>

                <div className="mt-8 max-w-2xl font-kalam text-[1.75rem] leading-relaxed text-[#fff3d0] sm:text-[2.05rem]">
                  The source of light, life, and consciousness. Surya illuminates our{' '}
                  <Highlight>soul</Highlight>, <Highlight>vitality</Highlight> and{' '}
                  <Highlight>purpose</Highlight>.
                </div>

                <div className="mt-8 flex items-center gap-5 text-[#facc15]">
                  <SunMandala className="h-14 w-14" />
                  <img src={STAR_ACCENT_URL} alt="" className="h-9 w-9 drop-shadow-[0_0_18px_rgba(250,204,21,0.7)]" />
                </div>
              </div>

              <div className="pointer-events-none absolute inset-y-0 right-[3%] hidden w-[60%] lg:block">
                <SolarOrbitDoodle className="absolute inset-0 opacity-95" />
                <div className="absolute left-[30%] top-[12%] h-[66%] w-[66%] rounded-full bg-[#facc15]/12 blur-3xl" />
              </div>

              <div className="relative z-10 mt-8 max-w-[21rem] sm:mt-10 sm:max-w-[35rem] lg:absolute lg:bottom-5 lg:left-0 lg:mt-0 lg:max-w-[36rem]">
                <div className="rounded-[22px] border border-[#facc15]/25 bg-[#2a1a0f]/95 p-3 text-[#fff7dd] shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur">
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5 lg:gap-0">
                    {quickFacts.map((fact, index) => (
                      <div
                        key={fact.label}
                        className={`flex min-h-[94px] flex-col items-center justify-center px-2.5 py-2.5 text-center ${
                          index < quickFacts.length - 1 ? 'lg:border-r lg:border-[#facc15]/20' : ''
                        }`}
                      >
                        <div className="text-[#facc15]">{iconSvg(fact.icon, 'h-7 w-7 sm:h-8 sm:w-8')}</div>
                        <div className="mt-1.5 font-caveat text-[1.55rem] leading-none sm:text-[1.8rem]">{fact.label}</div>
                        <div className="mt-1 font-kalam text-[1rem] leading-tight text-[#fde68a] sm:text-[1.08rem]">{fact.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="relative overflow-hidden bg-[#070301] text-white"
          style={{
            background:
              'linear-gradient(180deg, rgba(5,2,0,1) 0%, rgba(14,7,2,1) 55%, rgba(26,15,5,1) 100%)',
          }}
        >
          <div className="absolute inset-0 opacity-35 mix-blend-screen">
            <SolarFieldDoodle className="absolute inset-0" />
          </div>

          <div className="relative mx-auto max-w-[1440px] px-4 pb-12 pt-5 sm:px-6 lg:px-10">
            <div className="grid gap-5 xl:grid-cols-[1.18fr_0.82fr]">
              <ParchmentCard className="min-h-full" rotate="xl:-rotate-[0.5deg]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="mb-2 flex items-center gap-3">
                      <span className="font-devanagari text-4xl text-[#2b1a0f]">ॐ</span>
                      <h3 className="font-caveat text-4xl leading-none text-[#2b1a0f] sm:text-5xl">
                        Sacred Mantras
                      </h3>
                    </div>
                    <div className="h-[3px] w-56 rounded-full bg-gradient-to-r from-[#991b1b] via-[#f59e0b] to-transparent" />
                  </div>
                  <div className="flex items-center gap-4 text-[#9a3412]/80">
                    <SunMandala className="h-14 w-14" />
                    <img src={STAR_ACCENT_URL} alt="" className="h-6 w-6" />
                  </div>
                </div>

                <div className="mt-6 space-y-10">
                  {mantras.map((mantra, index) => (
                    <div key={mantra.title}>
                      <div className="font-caveat text-[2rem] leading-none text-[#b45309] sm:text-[2.4rem]">
                        {index + 1}. {mantra.title}
                      </div>

                      <div className="mt-4 rounded-[14px] border-2 border-[#b91c1c]/80 bg-[#f6ebd6] px-5 py-4 shadow-[inset_0_0_20px_rgba(185,28,28,0.1)]">
                        <div className="font-devanagari text-[1.7rem] leading-tight text-[#1e120c] sm:text-[2.1rem]">
                          {mantra.devanagari}
                        </div>
                      </div>

                      <div className="mt-5 space-y-3 font-kalam text-xl leading-relaxed text-[#2d1e13]">
                        <div>
                          <span className="font-semibold text-[#b45309]">IAST:</span> {mantra.iast}
                        </div>
                        <div>
                          <span className="font-semibold text-[#b45309]">Meaning:</span> {mantra.meaning}
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
                    <h3 className="font-caveat text-4xl leading-none text-[#2b1a0f] sm:text-5xl">
                      Surya in Our Life
                    </h3>
                    <div className="text-[#b45309]">{iconSvg('faq', 'h-12 w-12')}</div>
                  </div>
                  <div className="mt-4 space-y-3">
                    {lifeRows.map((row) => (
                      <div key={row.label} className="flex gap-3 border-b border-[#745834]/15 pb-3 last:border-b-0 last:pb-0">
                        <div className="mt-1 text-[#b45309]">{iconSvg(row.icon, 'h-6 w-6')}</div>
                        <div className="font-kalam text-lg leading-relaxed text-[#2b1b10]">
                          <span className="font-semibold text-[#9a3412]">{row.label}:</span> {row.value}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="pointer-events-none absolute bottom-3 right-4 text-[#b45309]/45">
                    <SunMandala className="h-24 w-24" />
                  </div>
                </ParchmentCard>

                <ParchmentCard rotate="xl:-rotate-[0.35deg]">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-caveat text-4xl leading-none text-[#2b1a0f] sm:text-5xl">
                      Benefits of Surya Mantra
                    </h3>
                    <SunMandala className="h-12 w-12 text-[#b45309]" />
                  </div>
                  <div className="mt-5 space-y-3">
                    {benefits.map((benefit) => (
                      <div key={benefit} className="flex gap-3">
                        <div className="mt-0.5 text-[#16a34a]">{iconSvg('benefit', 'h-5 w-5')}</div>
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
                  <h3 className="font-caveat text-4xl leading-none text-[#2b1a0f] sm:text-5xl">
                    How to Connect with Surya
                  </h3>
                  <div className="text-[#b45309]">{iconSvg('connect', 'h-12 w-12')}</div>
                </div>
                <div className="mt-5 grid gap-4 lg:grid-cols-5">
                  {connectPractices.map((practice, index) => (
                    <div
                      key={practice}
                      className="rounded-2xl border border-[#7b603e]/20 bg-white/25 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.32)]"
                    >
                      <div className="mb-3 text-[#b45309]">
                        {iconSvg(index === 1 ? 'water' : index === 2 ? 'gem' : index === 4 ? 'heart' : 'connect', 'h-6 w-6')}
                      </div>
                      <p className="font-kalam text-lg leading-relaxed text-[#2a190f]">{practice}</p>
                    </div>
                  ))}
                </div>
              </ParchmentCard>
            </div>

            <div className="mt-6 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
              <ParchmentCard rotate="xl:-rotate-[0.6deg]">
                <div className="text-center">
                  <div className="font-caveat text-4xl leading-none text-[#2b1a0f] sm:text-5xl">
                    Gemstone: Ruby
                  </div>
                  <p className="mt-2 font-kalam text-xl text-[#b45309]">Manikya</p>
                </div>
                <div className="relative mx-auto mt-5 max-w-[380px]">
                  <div className="pointer-events-none absolute inset-0 rounded-full bg-[#facc15]/25 blur-3xl" />
                  <div className="relative rounded-[24px] border-2 border-[#facc15]/85 bg-[#180802] p-1.5 shadow-[0_14px_34px_rgba(0,0,0,0.3)]">
                    <img
                      src={RUBY_RING_URL}
                      alt="Ruby gemstone ring associated with Surya"
                      className="mx-auto w-full rounded-[18px] object-cover"
                    />
                  </div>
                </div>
                <div className="mt-5 text-center font-kalam text-lg leading-relaxed text-[#2a190f]">
                  Sanctified only after astrological verification.
                </div>
              </ParchmentCard>

              <ParchmentCard rotate="xl:rotate-[0.45deg]">
                <div className="tape-decoration hidden sm:block" />
                <div className="pointer-events-none absolute inset-0 opacity-15">
                  <SolarOrbitDoodle className="absolute right-0 top-0 h-full w-full" />
                </div>
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-caveat text-4xl leading-none text-[#2b1a0f] sm:text-5xl">
                    Affirmation
                  </h3>
                  <div className="text-[#b45309]">{iconSvg('heart', 'h-8 w-8')}</div>
                </div>
                <div className="mt-8 font-kalam text-[2rem] leading-snug text-[#9a3412] sm:text-[2.4rem]">
                  “I am a <Highlight>radiant being of light</Highlight>, filled with{' '}
                  <Highlight>purpose and power</Highlight>.”
                </div>
                <div className="mt-5 font-kalam text-lg leading-relaxed text-[#2a190f]">
                  This affirmation supports confidence without arrogance and power without harshness.
                </div>
              </ParchmentCard>
            </div>

            <div className="mt-8 rounded-[30px] border border-[#facc15]/25 bg-[#140902]/90 px-5 py-6 shadow-[0_20px_70px_rgba(0,0,0,0.42)] backdrop-blur sm:px-8">
              <div className="grid gap-8 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
                <div className="flex items-start gap-4">
                  <div className="mt-1 text-[#facc15]">{iconSvg('quote', 'h-9 w-9')}</div>
                  <div>
                    <div className="font-caveat text-3xl text-[#facc15] sm:text-4xl">
                      Light is the true nature
                    </div>
                    <div className="mt-1 font-kalam text-xl text-white/80 sm:text-2xl">
                      of the soul.
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center gap-3 text-[#facc15]">
                  <SunMandala className="h-16 w-16" />
                  <div className="h-px w-28 bg-gradient-to-r from-transparent via-[#facc15]/70 to-transparent" />
                </div>

                <div className="text-left lg:text-right">
                  <div className="font-devanagari text-3xl text-[#facc15] sm:text-4xl">तमसो मा ज्योतिर्गमय ।</div>
                  <div className="mt-2 font-kalam text-xl text-white/80 sm:text-2xl">Lead me from darkness to light.</div>
                </div>
              </div>

              <div className="mt-8 border-t border-[#facc15]/15 pt-6">
                <div className="text-center font-caveat text-3xl text-[#f8d985] sm:text-4xl">
                  Surya&apos;s 7 Rays of Awakening
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4 text-center sm:grid-cols-3 xl:grid-cols-7">
                  {rays.map((ray) => (
                    <div key={ray.name} className="rounded-2xl border border-[#facc15]/15 bg-white/5 px-3 py-4">
                      <div className="text-4xl leading-none text-[#facc15] drop-shadow-[0_0_14px_rgba(250,204,21,0.65)]">
                        {ray.glyph}
                      </div>
                      <div className="mt-3 font-caveat text-2xl leading-none text-[#f8d985]">{ray.name}</div>
                      <div className="mt-1 text-sm leading-snug text-white/65">{ray.sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#f4ecda] py-20 text-[#26180d]">
          <div
            className="absolute inset-0 opacity-70"
            style={{
              backgroundImage: `linear-gradient(rgba(244,236,218,0.9), rgba(244,236,218,0.9)), url(${PARCHMENT_URL})`,
              backgroundSize: '780px',
              backgroundPosition: 'center',
            }}
          />

          <div className="pointer-events-none absolute right-6 top-24 hidden text-[#b45309]/10 lg:block">
            <SunMandala className="h-28 w-28" />
          </div>
          <img src={STAR_ACCENT_URL} alt="" className="pointer-events-none absolute left-8 top-[34rem] hidden h-14 w-14 opacity-20 lg:block" />

          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <div className="space-y-12">
                {editorialSections.map((section, index) => (
                  <div key={section.title}>
                    <h2 className="font-caveat text-4xl leading-none text-[#9a3412] sm:text-5xl">{section.title}</h2>
                    <div className="mt-3 h-[3px] w-36 rounded-full bg-gradient-to-r from-[#b91c1c] via-[#f59e0b] to-transparent" />
                    <div className="mt-6 space-y-4 text-lg leading-8 text-[#332117]">
                      {section.paragraphs.map((paragraph, paragraphIndex) => (
                        <p
                          key={paragraph}
                          className={paragraphIndex === 0 ? 'drop-cap' : undefined}
                          style={
                            paragraphIndex === 0
                              ? ({ ['--accent-color' as string]: '#f59e0b' } as CSSProperties)
                              : undefined
                          }
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    {index === 2 ? (
                      <div className="mt-8 grid gap-4 sm:grid-cols-2">
                        {houses.map(([number, name, text]) => (
                          <div key={number} className="rounded-2xl border border-[#b45309]/20 bg-white/45 p-4 shadow-[0_10px_24px_rgba(80,43,16,0.1)]">
                            <div className="flex items-center gap-3">
                              <div className="font-caveat text-3xl leading-none text-[#b45309]">{number}</div>
                              <div className="font-semibold text-[#2b1a0f]">{name}</div>
                            </div>
                            <p className="mt-2 text-sm leading-relaxed text-[#3a271a]">{text}</p>
                          </div>
                        ))}
                      </div>
                    ) : null}

                    {index === 5 ? (
                      <div className="mt-8 grid gap-4 sm:grid-cols-2">
                        {remedies.map(([title, text], remedyIndex) => (
                          <div key={title} className="flex gap-4 rounded-2xl border border-[#b45309]/20 bg-white/45 p-4 shadow-[0_10px_24px_rgba(80,43,16,0.1)]">
                            <div className="mt-1 text-[#b45309]">
                              {iconSvg(remedyIndex === 1 ? 'water' : remedyIndex === 2 ? 'gem' : 'connect', 'h-6 w-6')}
                            </div>
                            <div>
                              <div className="font-caveat text-2xl leading-none text-[#9a3412]">{title}</div>
                              <p className="mt-2 text-sm leading-relaxed text-[#3a271a]">{text}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : null}

                    {index === 7 ? (
                      <div className="mt-8 rounded-[28px] border border-[#facc15]/50 bg-gradient-to-br from-[#fff7ed] via-[#fef3c7] to-[#fed7aa] p-6 shadow-[0_18px_35px_rgba(146,64,14,0.18)]">
                        <div className="flex flex-wrap gap-2">
                          {['M.Tech', 'MBA', 'M.Phil', 'K.N. Rao Institute trained', 'Parashari', 'BNN', 'KP'].map((badge) => (
                            <span key={badge} className="rounded-full border border-[#f59e0b]/45 bg-white/70 px-3 py-1 text-sm font-semibold text-[#9a3412]">
                              {badge}
                            </span>
                          ))}
                        </div>
                        <p className="mt-5 text-lg leading-8 text-[#332117]">
                          This is the consultation approach behind Soul Infinity: traditional enough to honor the lineage, practical enough to guide real decisions, and careful enough to avoid generic remedies.
                        </p>
                      </div>
                    ) : null}

                    {index < editorialSections.length - 1 ? <SectionRule /> : null}
                  </div>
                ))}
              </div>

              <EditorialSidebar />
            </div>
          </div>
        </section>

        <section className="bg-[#f1e7d1] py-20 text-[#26180d]">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <div className="font-caveat text-5xl leading-none text-[#9a3412] sm:text-6xl">Frequently Asked Questions</div>
              <p className="mx-auto mt-4 max-w-2xl font-kalam text-xl leading-relaxed text-[#3a271a]">
                Common questions about Surya, Sun strength, Ruby, remedies, and how solar energy works in a Vedic chart.
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
                        <div className="mt-1 text-[#b45309]">{iconSvg('faq', 'h-6 w-6')}</div>
                        <div className="font-kalam text-xl leading-relaxed text-[#2a190f]">{faq.question}</div>
                      </div>
                      <div className="text-[#b45309]">
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
