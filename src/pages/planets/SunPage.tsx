import { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Breadcrumbs from '../../components/Breadcrumbs';
import SEOHead from '../../components/SEOHead';
import {
  getArticleSchema,
  getBreadcrumbSchema,
  getFaqPageSchemaFromList,
  getWebPageSchema,
  type JsonLd,
  SITE_ORIGIN,
} from '../../data/schema-entities';

const R2 = 'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev';
const PLANET_HUB = `${R2}/Pillar/Hub/Planets`;
const PLANET_SUN = `${R2}/Pillar/Planets/Sun`;

const SUN_HERO_URL = `${PLANET_SUN}/hero-surya.webp`;
const RUBY_RING_URL = `${PLANET_SUN}/ruby-ring.webp`;
const RUBY_GEM_URL = `${PLANET_SUN}/gemstone-ruby.webp`;
const PARCHMENT_URL = `${PLANET_SUN}/parchment-texture.webp`;
const STAR_ACCENT_URL = `${PLANET_SUN}/star-accent.svg`;
const DIYA_URL = `${PLANET_SUN}/diya.svg`;
const FEATHER_URL = `${PLANET_SUN}/feather-quill.png`;
const PAGE_PARCHMENT_URL = `${PLANET_HUB}/bg-parchment-texture.webp`;

const PAGE_TITLE =
  'Surya (Sun) in Vedic Astrology: Meaning, Mantras, Remedies | Soul Infinity';
const PAGE_DESCRIPTION =
  'Complete guide to Surya in Vedic astrology, including Sun mantras, birth chart meaning, house results, Surya Mahadasha, Ruby guidance, and traditional remedies.';
const PAGE_KEYWORDS =
  'surya, sun in vedic astrology, sun mantra, navagraha, ruby gemstone, manikya, sun remedies, leo ruler, aries exaltation, soul infinity';
const PAGE_URL = `${SITE_ORIGIN}/planets/sun`;

const pageShellStyle = {
  backgroundImage: `url('${PLANET_SUN}/sun-strip-bg.webp')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
};

const cardTextureStyle = {
  backgroundImage: `linear-gradient(rgba(245,230,200,0.96), rgba(245,230,200,0.95)), url(${PARCHMENT_URL})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

const cardWarmBgStyle = {
  backgroundImage: `url('${PLANET_SUN}/sun-bg-for-cards.webp')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

type IconName =
  | 'soul'
  | 'vitality'
  | 'power'
  | 'purpose'
  | 'consciousness'
  | 'planet'
  | 'fire'
  | 'nature'
  | 'metal'
  | 'day'
  | 'direction'
  | 'sun'
  | 'leadership'
  | 'lotus'
  | 'water'
  | 'om'
  | 'gem'
  | 'yoga'
  | 'hands'
  | 'faq'
  | 'sign'
  | 'up'
  | 'down'
  | 'eye'
  | 'balance'
  | 'alert'
  | 'sunrise'
  | 'triangle'
  | 'arrow'
  | 'mountain';

type Attribute = {
  icon: IconName;
  label: string;
  sub: string;
};

type LifeAttribute = {
  key: string;
  value: string;
  icon: IconName;
};

type SuryaMantra = {
  label: string;
  devanagari: string;
  iast: string;
  meaning: string;
};

type ConnectStep = {
  num: string;
  label: string;
  icon: IconName;
};

type Navagraha = {
  name: string;
  sanskrit: string;
  href: string;
  img: string;
  current?: boolean;
};

type SidebarCard = {
  title: string;
  icon: IconName;
  content: string;
};

type FaqItem = {
  question: string;
  answer: string;
  withHouseGrid?: boolean;
};

const suryaData = {
  attributes: [
    { icon: 'soul', label: 'Soul', sub: 'Atman' },
    { icon: 'vitality', label: 'Vitality', sub: 'Energy' },
    { icon: 'power', label: 'Power', sub: 'Authority' },
    { icon: 'purpose', label: 'Purpose', sub: 'Dharma' },
    { icon: 'consciousness', label: 'Consciousness', sub: 'Awakening' },
  ] satisfies readonly Attribute[],
  lifeAttributes: [
    { key: 'Day', value: 'Sunday (Ravivar)', icon: 'day' },
    { key: 'Direction', value: 'East', icon: 'direction' },
    { key: 'Element', value: 'Fire', icon: 'fire' },
    { key: 'Metal', value: 'Gold, Copper', icon: 'metal' },
    { key: 'Gemstone', value: 'Ruby (Manik)', icon: 'gem' },
    { key: 'Color', value: 'Red, Golden', icon: 'sun' },
    { key: 'Dosha Influence', value: 'Pitta', icon: 'vitality' },
    { key: 'Guna', value: 'Sattva, Rajas', icon: 'consciousness' },
    { key: 'Body Part', value: 'Eyes, Heart, Bones', icon: 'eye' },
    { key: 'Life Area', value: 'Father, Authority, Confidence', icon: 'leadership' },
  ] satisfies readonly LifeAttribute[],
  mantras: [
    {
      label: '1. Mantra for Daily Surya Sadhana',
      devanagari:
        'ॐ घृणि सूर्याय नमः । ॐ आदित्याय विद्महे भास्कराय धीमहि । तन्नो सूर्यः प्रचोदयात् ॥',
      iast:
        'Om Ghr̥ṇi Sūryāya Namaḥ | Om Ādityāya Vidmahe Bhāskarāya Dhīmahi | Tanno Sūryaḥ Pracodayāt ||',
      meaning:
        'We meditate upon the radiant energy of Surya, the Sun who dispels darkness and ignorance. May that divine light awaken and guide our intellect.',
    },
    {
      label: '2. Gayatri Mantra for Surya',
      devanagari: 'ॐ सूर्याय विद्महे महाद्युतिकाय धीमहि । तन्नो आदित्यः प्रचोदयात् ॥',
      iast: 'Om Sūryāya Vidmahe Mahādyutikāya Dhīmahi | Tanno Ādityaḥ Pracodayāt ||',
      meaning: 'Salutations to the divine Sun, the witness of all that is.',
    },
  ] satisfies readonly SuryaMantra[],
  connectSteps: [
    { num: '01', label: 'Offer water to\nthe rising Sun', icon: 'water' },
    { num: '02', label: 'Chant Surya\nmantras', icon: 'om' },
    { num: '03', label: 'Wear Ruby\non Sunday', icon: 'gem' },
    { num: '04', label: 'Do Surya Namaskar\nat sunrise', icon: 'yoga' },
    { num: '05', label: 'Serve father\nand respected elders', icon: 'hands' },
  ] satisfies readonly ConnectStep[],
  gemstone: {
    name: 'Ruby',
    imgUrl: RUBY_GEM_URL,
    benefits: [
      'Increases vitality and energy',
      'Enhances confidence and leadership',
      'Supports heart and circulatory health',
    ],
  },
  navagrahas: [
    { name: 'Surya', sanskrit: 'सूर्य', href: '/planets/sun', img: 'hero-surya.webp', current: true },
    { name: 'Chandra', sanskrit: 'चंद्र', href: '/planets/moon', img: 'hero-chandra.webp' },
    { name: 'Mangal', sanskrit: 'मंगल', href: '/planets/mars', img: 'hero-mangala.webp' },
    { name: 'Budha', sanskrit: 'बुध', href: '/planets/mercury', img: 'hero-budha.webp' },
    { name: 'Guru', sanskrit: 'गुरु', href: '/planets/jupiter', img: 'hero-guru.webp' },
    { name: 'Shukra', sanskrit: 'शुक्र', href: '/planets/venus', img: 'hero-shukra.webp' },
    { name: 'Shani', sanskrit: 'शनि', href: '/planets/saturn', img: 'hero-shani.webp' },
    { name: 'Rahu', sanskrit: 'राहु', href: '/planets/rahu', img: 'hero-rahu.webp' },
    { name: 'Ketu', sanskrit: 'केतु', href: '/planets/ketu', img: 'hero-ketu.webp' },
  ] satisfies readonly Navagraha[],
  sidebarCards: [
    { title: 'Zodiac Sign', icon: 'sign', content: 'Rules Leo (Simha Rashi)' },
    { title: 'Exalted (Uchcha)', icon: 'up', content: 'Aries (10°)' },
    { title: 'Debilitated (Neecha)', icon: 'down', content: 'Libra (10°)' },
    { title: 'Best Time', icon: 'sunrise', content: 'Sunrise, Sunday, Shukla Paksha' },
    { title: 'Drishti (Aspect)', icon: 'eye', content: '7th aspect (Like Saturn)' },
    {
      title: 'When Surya is balanced',
      icon: 'sun',
      content:
        'A person shines with confidence, wisdom, and a sense of purpose. Their life becomes a source of inspiration for others.',
    },
    {
      title: 'When Surya is afflicted',
      icon: 'alert',
      content:
        'It can lead to ego issues, health issues, authority conflicts, and lack of clarity.',
    },
  ] satisfies readonly SidebarCard[],
};

const faqs: FaqItem[] = [
  {
    question: 'Who is Surya in Vedic Astrology?',
    answer:
      'Surya is the soul of the solar system and the king among the Navagraha. He represents the atman, vitality, consciousness, father, authority, leadership, and the power to create and sustain life. In a chart, Surya shows where a person must grow into clarity, dignity, and inner command.',
  },
  {
    question: 'What does the Sun represent in a birth chart?',
    answer:
      'The Sun represents soul, identity, life force, recognition, authority, confidence, bones, eyes, heart, and the will to lead. It shows how a person carries self-respect, how they respond to visibility, and how strongly they can act from purpose instead of comparison. A healthy Surya gives warmth, steadiness, and conviction.',
  },
  {
    question: 'What is the significance of Sun in the 12 Houses?',
    answer:
      'The house placement of Surya reveals where the soul seeks expression and where life asks for responsibility, confidence, and leadership. Each house shows a different field of visibility, from selfhood and family to career, dharma, and liberation. These meanings are always refined by sign, aspects, dignity, nakshatra, and dasha.',
    withHouseGrid: true,
  },
  {
    question: "Sun's Dasha: Confidence, Destinations, and Relationships",
    answer:
      'Surya Mahadasha lasts six years and often brings themes of self-respect, authority, health, father, reputation, and role clarity. It can push a person toward more visible choices, clearer boundaries, and stronger alignment with dharma. Relationships with mentors, authority figures, and one’s own sense of direction often become central during this period.',
  },
];

const houseGrid = [
  ['01', 'Self & Vitality'],
  ['02', 'Wealth & Family'],
  ['03', 'Courage & Siblings'],
  ['04', 'Home & Peace'],
  ['05', 'Intelligence & Children'],
  ['06', 'Health & Enemies'],
  ['07', 'Partnerships'],
  ['08', 'Transformation'],
  ['09', 'Dharma & Fortune'],
  ['10', 'Career & Status'],
  ['11', 'Gains & Desires'],
  ['12', 'Moksha & Spirituality'],
] as const;

const footerCta = {
  heading: 'Let the light within you rise.',
  subheading: 'Embrace the energy of Surya and live with clarity, purpose and power.',
  href: '/contact',
  button: 'Explore Personalized Remedies →',
};

const howToSteps = [
  'Bathe and wear clean clothes in orange or saffron.',
  'Sit facing east on a clean mat with a straight spine.',
  'Use a Ruby or Sphatik mala of 108 beads, if appropriate for your practice.',
  'Chant the mantra with calm breath and steady pronunciation.',
  'Sit quietly after chanting and offer gratitude to Surya.',
] as const;

const cardBorder =
  'border border-amber-200/60 rounded-[26px] shadow-[0_16px_40px_rgba(57,31,10,0.14)]';

const darkPanel =
  'rounded-[28px] border border-[#facc15]/25 bg-[#0d1628] text-[#f9edcc] shadow-[0_24px_60px_rgba(3,7,18,0.42)]';

const ariesCard =
  'bg-[#fdf6e9] border border-amber-200/60 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200';

const ariesCardRich =
  'bg-white border border-amber-100 rounded-2xl p-6 ' +
  'shadow-[0_4px_24px_rgba(0,0,0,0.10),0_1px_4px_rgba(0,0,0,0.06)] ' +
  'hover:shadow-[0_8px_32px_rgba(0,0,0,0.14),0_2px_8px_rgba(0,0,0,0.08)] ' +
  'hover:-translate-y-1 transition-all duration-300 ease-out relative';

const ariesIconCircle =
  'w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center mb-4 text-white';

const breadcrumbItems = [
  { label: 'Home', href: '/' },
  { label: 'Planets', href: '/planets' },
  { label: 'Surya' },
] as const;

const navagrahaImage = (img: string) => `${PLANET_HUB}/${img}`;

const editorialSchemaFaqs = faqs.map(({ question, answer }) => ({ question, answer }));

const editorialSections = [
  {
    title: 'Who is Surya in Vedic Astrology?',
    paragraphs: [
      'Surya is the visible heart of the solar system and the royal force among the Navagraha. He signifies the soul, vitality, father, purpose, and the capacity to live from an inner center instead of outer approval. In Vedic astrology, Surya shows where a person must become clear, dignified, and responsible.',
      'He is not only a source of heat and light. He is the principle of consciousness that makes action meaningful and leadership trustworthy. When Surya is honored, confidence becomes steadier and life begins to move with clearer direction.',
    ],
  },
  {
    title: 'What does the Sun represent in a birth chart?',
    paragraphs: [
      'The Sun represents the life force, selfhood, purpose, authority, bones, eyes, heart, confidence, and the will to stand visibly in truth. It shows how a person carries their dignity, how they meet recognition, and how they respond to roles that require leadership. A strong Sun does not need to dominate. It carries presence with steadiness.',
      'A strained Surya may show up as comparison, hesitation, conflict with authority, or uncertainty around purpose. The rest of the chart explains why, but the Sun still reveals the central work of becoming more fully oneself.',
    ],
  },
  {
    title: 'What is the significance of Sun in the 12 Houses?',
    paragraphs: [
      'Surya gives a different field of expression in each house. In some charts he makes the identity visible, in others he emphasizes dharma, public life, father karma, or a need to build stronger inner authority. These short meanings are a map, not the full reading.',
    ],
  },
  {
    title: "Sun's Dasha: Confidence, Destinations, and Relationships",
    paragraphs: [
      'Surya Mahadasha lasts six years and often brings major lessons around recognition, self-respect, father, health, and public role. It can become a time of visible responsibility, new leadership, travel for duty, or a sharper need to define one’s direction. The results depend on the Sun’s dignity, house placement, aspects, and the wider dasha sequence.',
      'This period can also clarify relationships. People often become more aware of mentors, father figures, institutions, and the difference between approval and authentic authority. When handled well, Surya Mahadasha helps the native mature into a clearer center.',
    ],
  },
] as const;

function iconSvg(name: IconName, className = 'h-6 w-6'): JSX.Element {
  switch (name) {
    case 'soul':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="4.5" />
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" />
        </svg>
      );
    case 'vitality':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M3 12h4l2-6 4 12 2-6h6" />
        </svg>
      );
    case 'power':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="m4 8 4 4 4-7 4 7 4-4-2 10H6L4 8Z" />
          <path d="M6 21h12" />
        </svg>
      );
    case 'purpose':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="7" />
          <circle cx="12" cy="12" r="2" />
          <path d="m12 12 6-6" />
        </svg>
      );
    case 'consciousness':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M2 12s3.5-5 10-5 10 5 10 5-3.5 5-10 5S2 12 2 12Z" />
          <circle cx="12" cy="12" r="2.5" />
        </svg>
      );
    case 'planet':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="6" />
          <path d="M4 14c2.5 1.4 5.2 2.1 8 2.1 3.1 0 6-.8 8-2.3" />
        </svg>
      );
    case 'fire':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 21c4 0 7-2.8 7-6.8 0-2.7-1.5-4.9-3.2-6.6-.3 2.2-1.4 3.5-2.5 4.2.3-3.4-1.5-6.3-4.1-8.8.1 3.7-2.2 5.5-3.3 7.6A7 7 0 0 0 5 14.2C5 18.2 8 21 12 21Z" />
        </svg>
      );
    case 'nature':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 3v18M6 9l6-6 6 6M6 15h12" />
        </svg>
      );
    case 'metal':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="m12 3 6 4v10l-6 4-6-4V7l6-4Z" />
          <path d="m12 3v18M6 7l6 4 6-4" />
        </svg>
      );
    case 'day':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="5" width="18" height="16" rx="2.5" />
          <path d="M7 3v4M17 3v4M3 10h18" />
        </svg>
      );
    case 'direction':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="8" />
          <path d="m10 14 6-6-2 8-4-2Z" />
        </svg>
      );
    case 'sun':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="4.4" />
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" />
        </svg>
      );
    case 'leadership':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 2 4 8l8 6 8-6-8-6Z" />
          <path d="M6 11v4c0 2 2.7 4 6 4s6-2 6-4v-4" />
        </svg>
      );
    case 'lotus':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7">
          <path d="M12 20c4.5 0 7.5-2.3 8-6-2.5 0-4.6.7-6 2-1-2.7-1.5-5.1-2-8-.5 2.9-1 5.3-2 8-1.4-1.3-3.5-2-6-2 .5 3.7 3.5 6 8 6Z" />
        </svg>
      );
    case 'water':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 3c3 4 5.5 6.7 5.5 10.3A5.5 5.5 0 1 1 6.5 13.3C6.5 9.7 9 7 12 3Z" />
        </svg>
      );
    case 'om':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M8.5 12.5c0 2.7 1.7 4.6 4.2 4.6 2.3 0 4-1.5 4-3.7 0-1.9-1.3-3.3-3.2-3.3 1.6-.2 2.7-1.4 2.7-3 0-2-1.6-3.5-3.9-3.5-2.5 0-4.4 1.7-4.8 4.4" />
          <path d="M18.2 7.8c.8.2 1.3.8 1.3 1.7 0 .7-.3 1.1-.9 1.5" />
          <circle cx="18.7" cy="5.2" r="1" />
        </svg>
      );
    case 'gem':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="m7 4-3 5 8 11 8-11-3-5H7Z" />
          <path d="m9 4 3 5 3-5M4 9h16" />
        </svg>
      );
    case 'yoga':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="5" r="2" />
          <path d="M12 8v5M8 12h8M7 20l3-5 2 2 2-2 3 5" />
        </svg>
      );
    case 'hands':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M7 13V6.5a1.5 1.5 0 0 1 3 0V12M10 12V5.5a1.5 1.5 0 0 1 3 0V12M13 12V7a1.5 1.5 0 0 1 3 0v8c0 3-2.2 5-5 5s-5-2-5-5v-3.5a1.5 1.5 0 0 1 3 0V13" />
        </svg>
      );
    case 'faq':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 18h.01M9.2 9.3a2.8 2.8 0 1 1 4.6 2.2c-.9.7-1.5 1.2-1.5 2.5" />
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
    case 'sign':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M5 18c4.7-5.4 9.3-5.4 14 0" />
          <path d="M7.8 12.2c1.3-1.8 2.7-2.7 4.2-2.7s2.9.9 4.2 2.7" />
        </svg>
      );
    case 'up':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 19V5M6.5 10.5 12 5l5.5 5.5" />
        </svg>
      );
    case 'down':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 5v14M17.5 13.5 12 19l-5.5-5.5" />
        </svg>
      );
    case 'eye':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M2 12s3.5-5 10-5 10 5 10 5-3.5 5-10 5S2 12 2 12Z" />
          <circle cx="12" cy="12" r="2.5" />
        </svg>
      );
    case 'balance':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 4v16M5 7h14M8 7l-3 5h6L8 7Zm8 0-3 5h6l-3-5Z" />
        </svg>
      );
    case 'alert':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 9v4M12 17h.01M10.3 3.7 2.9 17a2 2 0 0 0 1.8 3h14.6a2 2 0 0 0 1.8-3L13.7 3.7a2 2 0 0 0-3.4 0Z" />
        </svg>
      );
    case 'sunrise':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M4 18h16M6 18a6 6 0 0 1 12 0M12 4v5M4.9 7.9l2.1 2.1M19.1 7.9 17 10M2 13h3M19 13h3" />
        </svg>
      );
    case 'triangle':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 5 4 19h16L12 5Z" />
        </svg>
      );
    case 'arrow':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      );
    case 'mountain':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="m3 18 5.5-7 3.5 4 3.8-5 5.2 8" />
          <path d="M3 20h18" />
        </svg>
      );
  }
}

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

function HeroPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-sm bg-amber-900/30 px-2 py-0.5 text-amber-300">
      {children}
    </span>
  );
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
      className={`relative overflow-hidden ${cardBorder} p-5 text-[#2b1a0f] sm:p-6 ${rotate} ${className}`}
      style={cardTextureStyle}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.35),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(92,42,11,0.18),transparent_30%)]" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function SectionRule() {
  return (
    <div className="my-8 flex items-center gap-4 text-[#c79d34]/70">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#c79d34] to-transparent" />
      <div className="h-2 w-2 rounded-full bg-[#c79d34]" />
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#c79d34] to-transparent" />
    </div>
  );
}

function SidebarAccordion({
  card,
  open,
  onToggle,
}: {
  card: SidebarCard;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={
        'bg-white border border-amber-100 rounded-2xl ' +
        'shadow-[0_4px_24px_rgba(0,0,0,0.10),0_1px_4px_rgba(0,0,0,0.06)] ' +
        'hover:shadow-[0_8px_32px_rgba(0,0,0,0.14)] ' +
        'hover:-translate-y-1 transition-all duration-300 ease-out relative overflow-hidden'
      }
      style={cardWarmBgStyle}
    >
      <button
        type="button"
        className="relative flex w-full items-center justify-between gap-3 px-4 py-4 text-left"
        onClick={onToggle}
        aria-expanded={open}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-white">
            {iconSvg(card.icon, 'h-5 w-5')}
          </div>
          <div className="font-caveat text-[1.8rem] leading-none text-amber-900">{card.title}</div>
        </div>
        <svg
          viewBox="0 0 24 24"
          className={`h-5 w-5 text-amber-900 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {open ? (
        <div className="border-t border-amber-200/60 px-4 pb-4 pt-3 font-kalam text-[1.05rem] leading-relaxed text-gray-800">
          {card.content}
        </div>
      ) : null}
    </div>
  );
}

export default function SunPage() {
  const [openFaq, setOpenFaq] = useState<number>(0);
  const [openSidebar, setOpenSidebar] = useState<number>(0);
  const [rubySrc, setRubySrc] = useState<string>(suryaData.gemstone.imgUrl);
  const navagrahaStripRef = useRef<HTMLDivElement | null>(null);

  const schemas = useMemo<JsonLd[]>(
    () => [
      getArticleSchema({
        headline: 'Surya (Sun) in Vedic Astrology: Meaning, Mantras, Remedies, and FAQ',
        description: PAGE_DESCRIPTION,
        image: SUN_HERO_URL,
        datePublished: '2026-04-23',
        dateModified: '2026-05-07',
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
      getFaqPageSchemaFromList(editorialSchemaFaqs),
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
      {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: 'How to connect with Surya through daily practice',
        description: 'A simple Surya-aligned daily practice at sunrise.',
        step: howToSteps.map((text, index) => ({
          '@type': 'HowToStep',
          name: `Step ${index + 1}`,
          text,
        })),
      },
    ],
    [],
  );

  const scrollNavagrahas = (direction: 'left' | 'right') => {
    const node = navagrahaStripRef.current;
    if (!node) return;
    node.scrollBy({
      left: direction === 'left' ? -280 : 280,
      behavior: 'smooth',
    });
  };

  const handleRubyError = () => {
    if (rubySrc !== RUBY_RING_URL) setRubySrc(RUBY_RING_URL);
  };

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

      <div
        className="min-h-screen text-[#2b1a0f] [background-attachment:scroll] md:[background-attachment:fixed]"
        style={pageShellStyle}
      >
        <section
          className="relative overflow-hidden"
          style={{
            background:
              'radial-gradient(circle at 76% 18%, rgba(250,204,21,0.62) 0%, rgba(217,119,6,0.28) 18%, rgba(12,17,32,0.96) 54%, #050810 100%)',
          }}
        >
          <div
            className="absolute inset-0 bg-cover bg-[center_right_12%] bg-no-repeat"
            style={{ backgroundImage: `url(${SUN_HERO_URL})` }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,17,32,0.98)_0%,rgba(11,17,32,0.92)_18%,rgba(11,17,32,0.58)_42%,rgba(11,17,32,0.16)_72%,rgba(11,17,32,0.03)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,16,0.12)_0%,rgba(5,8,16,0.22)_38%,rgba(5,8,16,0.7)_100%)]" />
          <div className="absolute inset-0 opacity-75 mix-blend-screen">
            <SolarFieldDoodle className="absolute inset-0" />
          </div>
          <div className="pointer-events-none absolute inset-y-0 right-[4%] hidden w-[54%] lg:block">
            <SolarOrbitDoodle className="absolute inset-0 opacity-90" />
          </div>

          <div className="relative mx-auto max-w-[1440px] px-4 pb-10 pt-5 sm:px-6 lg:px-10">
            <Link
              to="/planets"
              aria-label="Back to Planets hub"
              className="inline-flex font-caveat text-lg text-[#f5d37b] transition hover:text-[#facc15] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#facc15]"
            >
              ← Back to Planets
            </Link>

            <div className="mt-3 max-w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur">
              <Breadcrumbs
                items={breadcrumbItems}
                className="[&]:border-0 [&]:bg-transparent [&]:py-0 [&>div]:max-w-none [&>div]:px-0 [&_a]:text-[#f8e6b8]/70 [&_a:hover]:text-[#facc15] [&_span[aria-current='page']]:text-[#facc15] [&_ol]:text-xs [&_ol]:tracking-[0.12em] [&_svg]:text-[#f8d985]/60"
              />
            </div>

            <div className="relative mt-8 min-h-[32rem] sm:min-h-[36rem] lg:min-h-[42rem]">
              <div className="relative z-10 max-w-2xl pt-4 sm:pt-8 lg:max-w-[40rem] lg:pt-12">
                <h1 className="font-caveat text-[5rem] leading-[0.84] text-[#f4c35a] drop-shadow-[0_0_30px_rgba(250,204,21,0.45)] sm:text-[6.6rem] lg:text-[7.9rem]">
                  Surya
                </h1>
                <div className="mt-2 font-cormorant text-[2.2rem] leading-none text-[#fff7dd] sm:text-[3rem]">
                  The Radiant Sun
                </div>
                <p className="mt-5 max-w-xl font-kalam text-[1.6rem] leading-relaxed text-[#fff0c9] sm:text-[1.95rem]">
                  The source of light, life, and consciousness. Surya illuminates our{' '}
                  <HeroPill>soul</HeroPill>, <HeroPill>vitality</HeroPill>, and{' '}
                  <HeroPill>purpose</HeroPill>.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="-mt-5 relative z-10 px-4 sm:px-6 lg:px-10">
          <div
            className="mx-auto max-w-6xl rounded-[28px] border border-amber-300/60 px-4 py-4 sm:px-5 shadow-[0_24px_60px_rgba(3,7,18,0.18)]"
            style={{
              backgroundImage: `url('${PLANET_SUN}/sun-bg-for-cards.webp')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {suryaData.attributes.map((item, index) => (
                <div
                  key={item.label}
                  className={`flex min-h-[116px] flex-col items-center justify-center px-3 py-3 text-center ${
                    index < suryaData.attributes.length - 1 ? 'lg:border-r lg:border-amber-300/50' : ''
                  }`}
                >
                  <div className="text-amber-700">{iconSvg(item.icon, 'h-8 w-8')}</div>
                  <div className="mt-3 font-poppins text-lg font-semibold text-gray-900">{item.label}</div>
                  <div className="font-kalam text-[1.03rem] text-amber-800 italic">{item.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative px-4 pb-8 pt-8 sm:px-6 lg:px-10">
          <div className="pointer-events-none absolute inset-0 opacity-15 mix-blend-multiply">
            <SolarFieldDoodle className="absolute inset-0" />
          </div>
          <div className="relative mx-auto max-w-[1440px]">
            <div className="grid gap-6 xl:grid-cols-[1.12fr_0.82fr_0.78fr]">
              <div className={ariesCardRich} style={cardWarmBgStyle}>
                <div className="relative flex items-start justify-between gap-4">
                  <div>
                    <div className={ariesIconCircle}>{iconSvg('lotus', 'h-5 w-5')}</div>
                    <h2 className="font-caveat text-4xl leading-none text-amber-900 sm:text-5xl">Sacred Mantra</h2>
                    <div className="mt-3 h-[3px] w-44 rounded-full bg-gradient-to-r from-[#c98f1e] via-[#f5c255] to-transparent" />
                  </div>
                  <img src={STAR_ACCENT_URL} alt="" aria-hidden="true" className="h-8 w-8 opacity-75" />
                </div>

                <div className="relative mt-6">
                  {suryaData.mantras.map((mantra, idx) => (
                    <div key={mantra.label}>
                      {idx > 0 ? (
                        <div className="flex items-center gap-3 my-6">
                          <div className="flex-1 h-px bg-amber-300/40" />
                          <span className="text-amber-500 text-xs tracking-widest uppercase">✦</span>
                          <div className="flex-1 h-px bg-amber-300/40" />
                        </div>
                      ) : null}
                      <div className="font-caveat text-[1.95rem] leading-none text-amber-800 font-semibold sm:text-[2.25rem]">
                        {mantra.label}
                      </div>
                      <div className="border border-amber-500/60 border-l-4 border-l-amber-500 bg-[#0B1120] rounded-xl px-5 py-4 my-4 shadow-inner shadow-amber-900/20">
                        <div className="font-devanagari text-[1.7rem] leading-tight text-[#f7ebc7] sm:text-[2rem]">
                          {mantra.devanagari}
                        </div>
                      </div>
                      <div className="mt-4 space-y-3 font-kalam text-[1.1rem] leading-relaxed text-gray-800">
                        <p>
                          <span className="font-semibold text-amber-800">IAST:</span>{' '}
                          <span className="text-gray-600 italic">{mantra.iast}</span>
                        </p>
                        <p>
                          <span className="font-semibold text-amber-800">Meaning:</span>{' '}
                          <span className="text-gray-700">{mantra.meaning}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={ariesCardRich} style={cardWarmBgStyle}>
                <div className="relative flex items-start justify-between gap-4">
                  <div>
                    <div className={ariesIconCircle}>{iconSvg('sun', 'h-5 w-5')}</div>
                    <h2 className="font-caveat text-4xl leading-none text-amber-900 sm:text-5xl">
                      Surya in Our Life
                    </h2>
                    <div className="mt-3 h-[3px] w-36 rounded-full bg-gradient-to-r from-[#c98f1e] via-[#f5c255] to-transparent" />
                  </div>
                </div>

                <div className="relative mt-6 space-y-3.5">
                  {suryaData.lifeAttributes.map((row) => (
                    <div key={row.key} className="flex gap-3 border-b border-amber-300/40 pb-3 last:border-b-0 last:pb-0">
                      <div className="mt-1 text-amber-700">{iconSvg(row.icon, 'h-5.5 w-5.5')}</div>
                      <div className="font-kalam text-[1.03rem] leading-relaxed text-gray-800">
                        <span className="font-semibold text-amber-800">{row.key}:</span> {row.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="rounded-[28px] border border-amber-300/60 relative overflow-hidden p-6 shadow-[0_24px_60px_rgba(3,7,18,0.18)]"
                style={{
                  backgroundImage: `url('${PLANET_SUN}/sun-bg-for-cards.webp')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              >
                <div className="absolute inset-0 opacity-75">
                  <SolarOrbitDoodle className="absolute inset-0 opacity-35" />
                </div>
                <div className="relative z-10 flex h-full flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="font-caveat text-4xl leading-none text-amber-900 sm:text-[2.9rem]">
                          Connect with Surya
                        </h2>
                        <p className="mt-4 font-kalam text-[1.08rem] leading-relaxed text-gray-800">
                          Invite the radiant energy of Surya into your life. Strengthen your will, clarity, and confidence.
                        </p>
                      </div>
                      <div className="text-amber-600">{iconSvg('sunrise', 'h-9 w-9')}</div>
                    </div>
                  </div>

                  <div className="mt-8 flex items-end justify-between gap-4">
                    <div className="text-amber-600/75">{iconSvg('mountain', 'h-14 w-14')}</div>
                    <Link
                      to="/services"
                      className="inline-flex items-center gap-2 rounded-full border-none bg-amber-700 hover:bg-amber-800 px-5 py-3 font-poppins text-sm font-semibold uppercase tracking-[0.18em] text-white transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-700"
                    >
                      Explore Surya Remedies <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-6 xl:grid-cols-[1.65fr_1fr]">
              <div
                className="rounded-[28px] border border-amber-300/60 overflow-hidden p-6 sm:p-7 shadow-[0_24px_60px_rgba(3,7,18,0.18)]"
                style={{
                  backgroundImage: `url('${PLANET_SUN}/sun-bg-for-cards.webp')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-caveat text-4xl leading-none text-amber-900 sm:text-5xl">
                      How to Connect with Surya
                    </h2>
                    <div className="mt-3 h-[3px] w-44 rounded-full bg-amber-600" />
                  </div>
                  <img src={STAR_ACCENT_URL} alt="" aria-hidden="true" className="h-8 w-8 opacity-80 text-amber-600" />
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
                  {suryaData.connectSteps.map((step) => (
                    <div
                      key={step.num}
                      className="rounded-2xl border border-amber-200/60 bg-white/70 px-4 py-5 text-center"
                    >
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 border border-amber-300 text-amber-700">
                        {iconSvg(step.icon, 'h-6 w-6')}
                      </div>
                      <div className="mt-4 font-poppins text-sm font-semibold tracking-[0.22em] text-amber-700">
                        {step.num}
                      </div>
                      <div className="mt-2 whitespace-pre-line font-kalam text-[1.05rem] leading-relaxed text-gray-800">
                        {step.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <ParchmentCard rotate="xl:rotate-[0.35deg]">
                <div className="grid gap-4 md:grid-cols-[0.88fr_1.12fr] md:items-center">
                  <div>
                    <div className="font-caveat text-4xl leading-none text-[#3a2413] sm:text-5xl">
                      Gemstone: Ruby
                    </div>
                    <div className="mt-2 font-kalam text-xl text-[#a55d14]">Manik</div>
                    <div className="relative mt-5 mx-auto max-w-[240px] md:max-w-none">
                      <div className="pointer-events-none absolute inset-0 rounded-full bg-[#f59e0b]/20 blur-3xl" />
                      <img
                        src={rubySrc}
                        onError={handleRubyError}
                        alt="Ruby gemstone associated with Surya"
                        className="relative mx-auto w-full max-w-[230px] object-contain drop-shadow-[0_18px_32px_rgba(138,25,14,0.2)]"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <ul className="space-y-3">
                      {suryaData.gemstone.benefits.map((benefit) => (
                        <li key={benefit} className="flex gap-3 font-kalam text-[1.06rem] leading-relaxed text-[#3f2915]">
                          <span className="mt-1 text-[#d39a2a]">{iconSvg('sun', 'h-4.5 w-4.5')}</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      to="/services/vedic-astrology/gem-stone"
                      className="inline-flex items-center gap-2 font-poppins text-sm font-semibold uppercase tracking-[0.16em] text-[#9a5a12] hover:text-[#c98219] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c98219]"
                    >
                      Learn more <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              </ParchmentCard>
            </div>

            <div className={`mt-6 ${darkPanel} overflow-hidden px-5 py-7 sm:px-8`}>
              <div className="grid gap-5 lg:grid-cols-[auto_1fr_auto] lg:items-center">
                <div className="text-[#facc15]/85">
                  <SolarOrbitDoodle className="h-28 w-28" />
                </div>
                <div className="text-center">
                  <div className="font-caveat text-3xl leading-none text-[#f8d985] sm:text-[2.6rem]">
                    Affirmation
                  </div>
                  <blockquote className="mt-4 font-caveat text-[2.2rem] leading-tight text-[#f4c35a] sm:text-[3rem]">
                    “ I am a radiant being of light, filled with purpose and power. ”
                  </blockquote>
                </div>
                <div className="flex justify-end text-[#facc15]/75">
                  {iconSvg('mountain', 'h-20 w-20')}
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-[28px] border border-[#d8bb75]/45 bg-white/55 px-5 py-6 shadow-[0_16px_40px_rgba(57,31,10,0.10)]">
              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => scrollNavagrahas('left')}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#d8bb75] bg-white/70 text-[#9a5a12] transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d39a2a]"
                  aria-label="Scroll planets left"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <div className="text-center">
                  <div className="font-caveat text-3xl leading-none text-[#8f5b12] sm:text-4xl">
                    Explore All Navagrahas
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => scrollNavagrahas('right')}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#d8bb75] bg-white/70 text-[#9a5a12] transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d39a2a]"
                  aria-label="Scroll planets right"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              <div
                ref={navagrahaStripRef}
                className="mt-5 flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {suryaData.navagrahas.map((planet) => (
                  <Link
                    key={planet.name}
                    to={planet.href}
                    className={`min-w-[120px] shrink-0 rounded-[22px] border px-4 py-4 text-center transition hover:-translate-y-0.5 ${
                      planet.current
                        ? 'border-[#facc15] bg-[#fff8e8] ring-2 ring-[#facc15]'
                        : 'border-[#e7d7b0] bg-white/70'
                    }`}
                  >
                    <img
                      src={navagrahaImage(planet.img)}
                      alt={`${planet.name} planet portrait`}
                      className="mx-auto h-16 w-16 rounded-full object-cover shadow-[0_8px_18px_rgba(0,0,0,0.16)]"
                    />
                    <div className="mt-3 font-poppins text-sm font-semibold text-[#2f1b0d]">{planet.name}</div>
                    <div className="font-devanagari text-lg text-[#9a5a12]">{planet.sanskrit}</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 pb-10 pt-3 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-[1440px]">
            <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr] xl:items-start">
              <div className="space-y-5">
                {faqs.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div key={faq.question} className={ariesCard}>
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? -1 : index)}
                        className="flex w-full items-start justify-between gap-4 text-left"
                        aria-expanded={isOpen}
                      >
                        <div className="flex gap-3">
                          <div className="w-10 h-10 shrink-0 rounded-full bg-amber-100 border border-amber-300/60 flex items-center justify-center text-amber-700">
                            {iconSvg('faq', 'h-5 w-5')}
                          </div>
                          <div>
                            <h3 className="font-caveat text-[2rem] leading-tight text-[#3a2413] sm:text-[2.5rem]">
                              {faq.question}
                            </h3>
                          </div>
                        </div>
                        <svg
                          viewBox="0 0 24 24"
                          className={`mt-2 h-5 w-5 text-[#9a5a12] transition-transform ${isOpen ? 'rotate-45' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                      </button>

                      {isOpen ? (
                        <div className="mt-4 border-t border-[#d8bb75]/40 pt-4">
                          <div className="font-kalam text-[1.12rem] leading-relaxed text-[#3f2915]">
                            {faq.answer}
                          </div>

                          {faq.withHouseGrid ? (
                            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                              {houseGrid.map(([num, label]) => (
                                <div
                                  key={num}
                                  className="rounded-[18px] border border-[#d8bb75]/45 bg-white/55 px-3 py-3 shadow-[0_8px_16px_rgba(72,42,12,0.06)]"
                                >
                                  <div className="font-poppins text-sm font-semibold tracking-[0.16em] text-[#a55d14]">
                                    {num}
                                  </div>
                                  <div className="mt-1 font-kalam text-[1rem] leading-snug text-[#3f2915]">
                                    {label}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : null}

                          <SectionRule />

                          {index < editorialSections.length ? (
                            <div className="space-y-3">
                              {editorialSections[index].paragraphs.map((paragraph) => (
                                <p key={paragraph} className="font-kalam text-[1.04rem] leading-relaxed text-[#3f2915]">
                                  {paragraph}
                                </p>
                              ))}
                            </div>
                          ) : null}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>

              <div className="space-y-5 xl:sticky xl:top-24">
                {suryaData.sidebarCards.map((card, index) => (
                  <SidebarAccordion
                    key={card.title}
                    card={card}
                    open={openSidebar === index}
                    onToggle={() => setOpenSidebar(openSidebar === index ? -1 : index)}
                  />
                ))}

                <div className={`${darkPanel} overflow-hidden px-6 py-8`}>
                  <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
                    <div className="text-left">
                      <div className="font-caveat text-[2.2rem] leading-tight text-[#f8d985]">
                        Let the light within you rise.
                      </div>
                      <p className="mt-2 font-kalam text-[1.05rem] leading-relaxed text-white/78">
                        {footerCta.subheading}
                      </p>
                    </div>
                    <img src={DIYA_URL} alt="" aria-hidden="true" className="mx-auto h-20 w-20" />
                    <div className="flex justify-start lg:justify-end">
                      <Link
                        to={footerCta.href}
                        className="inline-flex items-center gap-2 rounded-full border border-[#facc15]/55 px-5 py-3 font-poppins text-sm font-semibold uppercase tracking-[0.16em] text-[#f8e4a7] transition hover:bg-[#facc15]/12 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#facc15]"
                      >
                        {footerCta.button}
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-[22px] border border-[#d8bb75]/45 bg-white/55 px-4 py-4 shadow-[0_10px_24px_rgba(72,42,12,0.08)]">
                  <img src={FEATHER_URL} alt="" aria-hidden="true" className="h-16 w-auto opacity-75" />
                  <div>
                    <div className="font-caveat text-[1.8rem] leading-none text-[#8f5b12]">
                      A line worth carrying
                    </div>
                    <p className="mt-2 font-kalam text-[1rem] leading-relaxed text-[#3f2915]">
                      Surya reminds us that clarity is not noise. It is the quiet strength of a life aligned with purpose.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
