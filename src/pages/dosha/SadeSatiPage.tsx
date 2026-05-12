import { CircleDot, Clock, Compass, Heart, Moon, Repeat, Scale, ShieldCheck, Star, Target, User } from 'lucide-react';
import DoshaDetailTemplate, { type DoshaDetailData } from './DoshaDetailTemplate';

const HERO_URL = 'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Pillar/Dosha/SadeSati/Sade-Sati-Hero-banner-page.webp';
const QUICK_FACTS_URL = 'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Pillar/Dosha/SadeSati/Sade-sati-quick-banner.webp';

const data: DoshaDetailData = {
  theme: {
    light: '#eef2ff',
    border: '#c7d2fe',
    dark: '#1e1b4b',
    accent: '#4338ca',
    accentText: '#3730a3',
    secondary: '#ddd6fe',
  },
  seo: {
    title: 'Saade Sati in Vedic Astrology, Meaning, Effects, and Remedies | Soul Infinity',
    description: 'Understand Saade Sati, the seven-and-a-half year Saturn transit in Vedic astrology. Learn its three phases, effects on each Moon sign, and classical remedies. Guidance by Saurabh Jain, K.N. Rao Institute.',
    keywords: 'saade sati, sade sati, shani sade sati, saade sati effects, saade sati remedies, saturn transit moon sign, 7.5 years saturn, sade sati vedic astrology',
    url: 'https://www.soulinfinity.space/dosha/saade-sati',
    image: HERO_URL,
    articleHeadline: 'Saade Sati in Vedic Astrology, Meaning, Effects, and Remedies',
    articleDescription: 'Understand Saade Sati, its three Saturn phases, Moon sign effects, and classical remedies.',
    webpageName: 'Saade Sati in Vedic Astrology',
    webpageDescription: 'Saade Sati meaning, effects, three phases, Moon sign results, and classical Saturn remedies.',
  },
  hero: {
    url: HERO_URL,
    alt: 'Saade Sati hero banner showing Saturn transit over three zodiac signs in Vedic astrology',
  },
  quickFacts: {
    url: QUICK_FACTS_URL,
    alt: 'Saade Sati quick facts showing three phases, Saturn transit duration, and Moon sign effects',
  },
  breadcrumbLabel: 'Saade Sati',
  breadcrumbSchemaLabel: 'Saade Sati in Vedic Astrology',
  sanskritName: 'साढ़े साती',
  englishName: 'Saade Sati',
  h1: 'Saade Sati, The Seven-and-a-Half Year Saturn Cycle',
  subtitleParts: ['Ruled by Shani (Saturn)', 'Air and Earth Energy', "The Purifier's Trial"],
  introCards: [
    {
      title: 'The Saturn Cycle',
      body: 'Saade Sati is the seven-and-a-half year period during which Saturn transits through the sign before your natal Moon, the sign of your natal Moon, and the sign after your natal Moon. Each sign takes approximately two and a half years, making the full cycle seven and a half years. It occurs roughly every 30 years in a lifetime.',
      icon: Clock,
    },
    {
      title: 'Three Phases of Saade Sati',
      body: 'The first phase, called the rising phase, begins as Saturn enters the sign before your natal Moon. The middle phase, considered the most intense, covers Saturn transiting your Moon sign directly. The final phase, called the setting phase, covers Saturn moving through the sign after your natal Moon.',
      icon: Repeat,
    },
    {
      title: 'Not Destruction, Restructuring',
      body: 'At Soul Infinity, Saurabh Jain reads Saade Sati as a period of karmic restructuring, not punishment. Saturn forces the native to examine what is real, durable, and worth keeping. Many significant professional and personal achievements occur during or just after a well-navigated Saade Sati.',
      icon: ShieldCheck,
      dark: true,
    },
    {
      title: 'Soul Infinity Practitioner Insight',
      body: "Saurabh Jain, trained at the K.N. Rao Institute of Astrology, New Delhi, observes that Saade Sati is the most misrepresented transit in popular Vedic astrology. A chart-based reading that shows current dasha, natal Saturn strength, and Jupiter's concurrent transit gives a far more accurate picture than the transit alone.",
      icon: Star,
    },
  ],
  ruling: {
    heading: 'Ruled by Shani (Saturn)',
    body: 'Saturn governs discipline, karma, time, limitations, service, and the lessons that arrive through effort and delay. It is the slowest moving of the classical planets and carries the heaviest karmic weight in Vedic astrology.',
    power: 'A well-navigated Saade Sati builds structural foundations that last. Natives who approach this period with discipline and acceptance frequently emerge with durable achievements, deepened wisdom, and clarity about their true path.',
    affliction: "Resistance to Saturn's lessons amplifies difficulty. Health challenges, financial strain, professional setbacks, and relationship restructuring are common when the native fights the changes Saturn brings.",
    mahadasha: 'When Saade Sati coincides with the Saturn Mahadasha or Antardasha, the period carries maximum intensity. When a benefic dasha like Jupiter runs concurrently, Saade Sati effects are considerably softened.',
  },
  stripTitle: 'Three Phase Strip',
  stripItems: [
    { title: 'Rising Phase', body: 'Saturn in the sign before natal Moon, preparation and subtle pressure begin' },
    { title: 'Peak Phase', body: 'Saturn on natal Moon, maximum intensity and restructuring of core life areas' },
    { title: 'Setting Phase', body: 'Saturn in the sign after natal Moon, consolidation and visible results of effort' },
  ],
  mantra: {
    devanagari: 'ॐ शं शनैश्चराय नमः',
    iast: 'Om Śaṃ Śanaiścarāya Namaḥ',
    english: 'Salutation to Shani, the slow-moving planet of discipline and karma.',
    instructionPrimary: 'Chant 108 times',
    instructionSecondary: 'Saturday evenings facing west',
  },
  traits: {
    heading: 'Characteristics of Saade Sati Natives',
    subheading: 'Saturn pressure can feel heavy, but conscious discipline turns the period into long-lasting growth.',
    strengthsTitle: 'Strengths',
    challengesTitle: 'Challenges',
    strengths: [
      'Deep capacity for patience and endurance',
      'Structural discipline and long-term thinking',
      'Wisdom earned through genuine difficulty',
      'Ability to build lasting foundations',
      'Heightened spiritual awareness',
      'Clarity about what truly matters',
    ],
    challenges: [
      'Prolonged periods of effort with delayed results',
      'Tendency toward pessimism or heaviness',
      'Health issues particularly joints, bones, nervous system',
      'Financial and professional restructuring',
      'Relationship strains under sustained pressure',
    ],
  },
  detailSection: {
    heading: 'Saade Sati Across the 12 Moon Signs',
    subheading: 'How the seven-and-a-half year Saturn cycle affects each rashi',
    icon: Moon,
    items: [
      { num: '01', heading: 'ARIES MOON', icon: User, color: '#4338ca', desc: 'Saturn transits Pisces, Aries, and Taurus. The peak phase on Aries Moon brings pressure on identity, health, and initiative. Professional slowdown is common. Patience and consistent effort are the keys.' },
      { num: '02', heading: 'TAURUS MOON', icon: Target, color: '#4f46e5', desc: 'Saturn transits Aries, Taurus, and Gemini. The peak phase on Taurus Moon affects finances, family stability, and speech. Material restructuring is likely. Disciplined saving habits prove beneficial.' },
      { num: '03', heading: 'GEMINI MOON', icon: Compass, color: '#6366f1', desc: 'Saturn transits Taurus, Gemini, and Cancer. The peak phase on Gemini Moon brings communication challenges, travel disruptions, and sibling-related pressures. Focused learning yields long-term gain.' },
      { num: '04', heading: 'CANCER MOON', icon: Heart, color: '#3730a3', desc: 'Saturn transits Gemini, Cancer, and Leo. The peak phase can bring home, property, and mother-related challenges. Emotional security needs conscious tending. Domestic stability requires effort.' },
      { num: '05', heading: 'LEO MOON', icon: Star, color: '#7c3aed', desc: 'Saturn transits Cancer, Leo, and Virgo. The peak phase can dim recognition, create ego challenges, and slow creative momentum. Humility and service-oriented action bring the best results.' },
      { num: '06', heading: 'VIRGO MOON', icon: ShieldCheck, color: '#2563eb', desc: 'Saturn transits Leo, Virgo, and Libra. The peak phase brings health vigilance, work-related pressures, and a need for disciplined daily routines. Service and precision are rewarded.' },
      { num: '07', heading: 'LIBRA MOON', icon: Scale, color: '#4f46e5', desc: 'Saturn transits Virgo, Libra, and Scorpio. Saturn is exalted in Libra. The peak phase, while intense, often produces durable professional and relational achievements.' },
      { num: '08', heading: 'SCORPIO MOON', icon: CircleDot, color: '#312e81', desc: 'Saturn transits Libra, Scorpio, and Sagittarius. The peak phase brings deep psychological transformation, financial restructuring, and confrontation with hidden fears. Profound inner growth is possible.' },
      { num: '09', heading: 'SAGITTARIUS MOON', icon: Compass, color: '#4338ca', desc: 'Saturn transits Scorpio, Sagittarius, and Capricorn. The peak phase challenges beliefs, foreign connections, and the relationship with teachers and dharma. Grounded spiritual practice helps.' },
      { num: '10', heading: 'CAPRICORN MOON', icon: Target, color: '#1d4ed8', desc: 'Saturn transits Sagittarius, Capricorn, and Aquarius. Saturn rules Capricorn. The peak phase is disciplined and career-focused. Professional restructuring often produces lasting advancement.' },
      { num: '11', heading: 'AQUARIUS MOON', icon: Star, color: '#3730a3', desc: 'Saturn transits Capricorn, Aquarius, and Pisces. Saturn rules Aquarius. The peak phase brings social network changes, income restructuring, and a deepened sense of purpose.' },
      { num: '12', heading: 'PISCES MOON', icon: Moon, color: '#1e40af', desc: 'Saturn transits Aquarius, Pisces, and Aries. The peak phase brings spiritual intensity, foreign travel or isolation, and a reckoning with subconscious patterns. Retreat and reflection support the process.' },
    ],
  },
  remedies: {
    heading: 'Classical Vedic Remedies for Saade Sati',
    subheading: 'Traditional Saturn remedies, applied with humility and chart-based judgment',
    items: [
      { main: 'Chant the Shani Beej mantra, Om Śaṃ Śanaiścarāya Namaḥ', detail: '108 times on Saturday evenings facing west' },
      { main: 'Light a sesame oil lamp at a Shani temple on Saturdays', detail: 'Sesame oil is the traditional offering for Saturn pacification' },
      { main: 'Donate black sesame seeds, black urad dal, iron, and dark blue cloth on Saturdays', detail: 'Traditional Saturn-associated offerings given with humility and intention' },
      { main: 'Recite the Shani Stotra or Shani Chalisa on Saturdays', detail: 'Regular recitation is considered one of the most consistent Saturn pacifications' },
      { main: 'Serve elders, labourers, and the underprivileged during Saade Sati', detail: 'Saturn rewards service to those it represents. This is karmic action, not symbolism' },
      { main: 'Wear blue sapphire, Neelam, only after chart approval', detail: 'Never wear blue sapphire without a qualified astrologer confirming Saturn is suitable for your ascendant' },
      { main: 'Observe a fast on Saturdays', detail: "A traditional Vedic fast dedicated to Shani, taken with the intention of surrender to Saturn's discipline" },
    ],
  },
  faqIntro: 'Your top questions about Saade Sati, answered with chart-first clarity.',
  faqs: [
    { question: 'What is Saade Sati in Vedic astrology?', answer: "Saade Sati is the seven-and-a-half year period during which Saturn transits through the zodiac sign before your natal Moon, the sign of your natal Moon, and the sign after it. Each phase lasts approximately two and a half years. It occurs roughly every 30 years and is considered the most significant Saturn transit in a native's life." },
    { question: 'Is Saade Sati always a difficult period?', answer: "No. Saade Sati is always significant but not uniformly difficult. Its effects depend heavily on the natal strength of Saturn, the sign through which Saturn is transiting, concurrent dasha timing, and Jupiter's position. Strong Saturn or supportive Jupiter timing can make the period productive." },
    { question: 'How many times does Saade Sati occur in a lifetime?', answer: 'Saturn completes one full revolution of the zodiac in approximately 29.5 years. Most people experience two to three complete Saade Sati periods in a lifetime. Each occurrence carries different themes based on life stage and current dasha.' },
    { question: 'Which Moon signs are most affected by Saade Sati?', answer: 'All 12 Moon signs experience Saade Sati, but intensity varies by sign. Libra Moon often experiences constructive results because Saturn is exalted in Libra. Aries Moon and Cancer Moon can experience more friction. A full chart reading is required for individual assessment.' },
    { question: 'What are the most effective remedies for Saade Sati?', answer: 'The most consistently effective remedy is genuine service to elders, labourers, and the underprivileged. Alongside this, Shani mantra, Saturday fasts, and sesame oil lamps at Shani temples are traditional supports. Gemstone recommendations require individual chart assessment.' },
  ],
  cta: {
    heading: 'Want a Personalised Saade Sati Reading?',
    body: 'Saurabh Jain at Soul Infinity reads your Saade Sati in the context of your full birth chart, current dasha, and concurrent Jupiter transit, then explains what this seven-and-a-half year period actually means for your life without fear and without unnecessary remedies.',
  },
};

export default function SadeSatiPage() {
  return <DoshaDetailTemplate data={data} />;
}
