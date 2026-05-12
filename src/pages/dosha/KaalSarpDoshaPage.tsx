import { Award, CircleDot, Compass, HelpCircle, Home, MoonStar, Repeat, Search, ShieldCheck, Star, Target, Users } from 'lucide-react';
import DoshaDetailTemplate, { type DoshaDetailData } from './DoshaDetailTemplate';

const HERO_URL = 'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Pillar/Dosha/Mangal/hero-banner-kal-sarpa-dosha.webp';
const QUICK_FACTS_URL = 'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Pillar/Dosha/Mangal/quick-fact-kal-sarpa-dosha.webp';

const data: DoshaDetailData = {
  theme: {
    light: '#f0fdf4',
    border: '#bbf7d0',
    dark: '#052e16',
    accent: '#166534',
    accentText: '#166534',
    secondary: '#dcfce7',
  },
  seo: {
    title: 'Kaal Sarp Dosha in Vedic Astrology, Meaning, Effects, and Remedies | Soul Infinity',
    description: 'Understand Kaal Sarp Dosha in Vedic astrology. Learn when all planets fall between Rahu and Ketu, its effects on career, marriage, and spirituality, and classical remedies. Guidance by Saurabh Jain, K.N. Rao Institute.',
    keywords: 'kaal sarp dosha, kal sarp dosh, kaal sarp yoga, rahu ketu dosha, kaal sarp dosha effects, kaal sarp dosha remedies, kaal sarp dosha in birth chart',
    url: 'https://www.soulinfinity.space/dosha/kaal-sarp',
    image: HERO_URL,
    articleHeadline: 'Kaal Sarp Dosha in Vedic Astrology, Meaning, Effects, and Remedies',
    articleDescription: 'Understand Kaal Sarp Dosha, the Rahu-Ketu encirclement, its effects, types, and classical remedies.',
    webpageName: 'Kaal Sarp Dosha in Vedic Astrology',
    webpageDescription: 'Kaal Sarp Dosha meaning, Rahu-Ketu axis effects, 12 types, and classical remedies.',
  },
  hero: {
    url: HERO_URL,
    alt: 'Kaal Sarp Dosha hero banner showing Rahu and Ketu encircling all planets in the Vedic birth chart',
  },
  quickFacts: {
    url: QUICK_FACTS_URL,
    alt: 'Kaal Sarp Dosha quick facts showing Rahu Ketu axis, planetary encirclement, and key effects',
  },
  breadcrumbLabel: 'Kaal Sarp Dosha',
  breadcrumbSchemaLabel: 'Kaal Sarp Dosha in Vedic Astrology',
  sanskritName: 'काल सर्प दोष',
  englishName: 'Kaal Sarp Dosha',
  h1: 'Kaal Sarp Dosha, The Serpent Encirclement',
  subtitleParts: ['Ruled by Rahu and Ketu', 'Shadow Planet Axis', 'The Karmic Constriction'],
  introCards: [
    {
      title: 'The Serpent Formation',
      body: 'Kaal Sarp Dosha arises when all seven classical planets, Sun, Moon, Mercury, Venus, Mars, Jupiter, and Saturn, fall within the one hundred and eighty degree arc between Rahu and Ketu in the birth chart. The shadow planets encircle all visible planets, creating a serpent formation around the chart.',
      icon: CircleDot,
    },
    {
      title: 'Rahu, Ketu, and Karmic Focus',
      body: "Rahu and Ketu represent the nodes of the Moon, the points where the lunar orbit intersects the ecliptic. They carry no physical mass but exert powerful karmic influence. When all planets fall between them, the native's chart becomes heavily focused on past-life karma, obsessive ambition, and spiritual release.",
      icon: MoonStar,
    },
    {
      title: 'Not a Permanent Affliction',
      body: 'At Soul Infinity, Saurabh Jain reads Kaal Sarp Dosha as a concentrated karmic signature, not a lifelong affliction. Many individuals with this dosha achieve extraordinary things because the entire chart is focused into one karmic direction.',
      icon: ShieldCheck,
      dark: true,
    },
    {
      title: 'Soul Infinity Practitioner Insight',
      body: 'Saurabh Jain, trained at the K.N. Rao Institute of Astrology, New Delhi, notes that Kaal Sarp Dosha is one of the most sensationalised formations in popular Vedic astrology. Its effects require full chart context, including the houses Rahu and Ketu occupy.',
      icon: Star,
    },
  ],
  ruling: {
    heading: 'Ruled by Rahu and Ketu',
    body: 'Rahu governs ambition, obsession, foreign influences, sudden gains, and the hunger for material experience. Ketu governs detachment, spiritual liberation, past-life wisdom, and the release of what the soul has already mastered.',
    power: 'Kaal Sarp Dosha natives often carry extraordinary focus, ambition, and karmic momentum. The concentrated chart energy, when consciously directed, produces results that a dispersed chart cannot match.',
    affliction: 'The shadow side includes recurring obstacles, dreams or premonitions, a sense of being held back by unseen forces, sudden reversals after progress, and difficulty finding stability in relationships or residence.',
    mahadasha: 'The Rahu Mahadasha, 18 years, and Ketu Mahadasha, 7 years, are the most significant periods for Kaal Sarp Dosha natives. Rahu and Ketu by house and sign must be read before judging these periods.',
  },
  stripTitle: 'Rahu-Ketu Axis Strip',
  stripItems: [
    { title: 'Rahu House', body: 'Primary axis of obsession, ambition, and karmic hunger' },
    { title: 'Ketu House', body: 'Axis of release, spiritual focus, and past-life completion' },
    { title: '1st to 7th Axis', body: 'Self and relationships carry maximum karmic focus' },
  ],
  mantra: {
    devanagari: 'ॐ रां राहवे नमः',
    iast: 'Om Rāṃ Rāhave Namaḥ',
    english: 'Salutation to Rahu, the north node, the planet of karmic hunger and ambition.',
    instructionPrimary: 'Chant 108 times',
    instructionSecondary: 'Saturday evenings at dusk',
  },
  traits: {
    heading: 'Characteristics of Kaal Sarp Dosha Natives',
    subheading: 'The Rahu-Ketu enclosure intensifies focus, tests stability, and can produce exceptional achievement.',
    strengthsTitle: 'Strengths',
    challengesTitle: 'Challenges',
    strengths: [
      'Extraordinary karmic focus and drive',
      'Capacity for single-minded achievement',
      'Deep intuition and psychic sensitivity',
      'Ability to achieve where others give up',
      'Strong spiritual inclination',
      'Resilience through recurring obstacles',
    ],
    challenges: [
      'Recurring setbacks after periods of progress',
      'A sense of unseen obstacles or bad luck',
      'Difficulty with material stability and residence',
      'Recurring dreams, premonitions, or subconscious fears',
      'Relationship instability or delays in marriage',
      'Tendency toward obsessive thinking',
    ],
  },
  detailSection: {
    heading: 'The 12 Types of Kaal Sarp Dosha',
    subheading: 'Named by the house axis Rahu occupies in the birth chart',
    icon: CircleDot,
    items: [
      { num: '01', heading: 'ANANT KAAL SARP', icon: Users, color: '#166534', desc: 'Rahu in the 1st house, Ketu in the 7th. Self and relationships are the primary karmic arena. The native faces lessons about identity, partnership, and balance between self-focus and others.' },
      { num: '02', heading: 'KULIK KAAL SARP', icon: Home, color: '#15803d', desc: 'Rahu in the 2nd house, Ketu in the 8th. Wealth, family, and speech meet transformation and hidden resources. Financial and family karmic patterns require conscious resolution.' },
      { num: '03', heading: 'VASUKI KAAL SARP', icon: Compass, color: '#16a34a', desc: 'Rahu in the 3rd house, Ketu in the 9th. Courage, communication, and effort meet dharma, father, and higher wisdom. Achievement comes through self-effort independent of tradition.' },
      { num: '04', heading: 'SHANKHAPAL KAAL SARP', icon: Home, color: '#14532d', desc: 'Rahu in the 4th house, Ketu in the 10th. Home, mother, and emotional security meet career and public status. Domestic and professional themes alternate in prominence.' },
      { num: '05', heading: 'PADAM KAAL SARP', icon: Star, color: '#15803d', desc: 'Rahu in the 5th house, Ketu in the 11th. Creativity, children, and intelligence meet gains and social networks. Creative pursuits and speculative ventures carry karmic focus.' },
      { num: '06', heading: 'MAHAPADAM KAAL SARP', icon: ShieldCheck, color: '#047857', desc: 'Rahu in the 6th house, Ketu in the 12th. Service, health, and competition meet liberation and foreign experience. The native is built for overcoming enemies and healing work.' },
      { num: '07', heading: 'TAKSHAK KAAL SARP', icon: Users, color: '#166534', desc: 'Rahu in the 7th house, Ketu in the 1st. Partnerships and marriage carry primary karmic weight. Self-realisation comes through relationship experiences, often difficult ones.' },
      { num: '08', heading: 'KARKOTAK KAAL SARP', icon: Search, color: '#064e3b', desc: 'Rahu in the 8th house, Ketu in the 2nd. Transformation, occult, and longevity meet family and wealth. Deep research and sudden reversals characterise the life.' },
      { num: '09', heading: 'SHANKHNAAD KAAL SARP', icon: Compass, color: '#047857', desc: 'Rahu in the 9th house, Ketu in the 3rd. Dharma, higher knowledge, and foreign connections carry karmic focus. Spiritual seeking and philosophical exploration are central themes.' },
      { num: '10', heading: 'GHATAK KAAL SARP', icon: Target, color: '#14532d', desc: 'Rahu in the 10th house, Ketu in the 4th. Career and public life meet home and emotional roots. Professional achievement may demand domestic sacrifice.' },
      { num: '11', heading: 'VISHDHAR KAAL SARP', icon: Award, color: '#166534', desc: 'Rahu in the 11th house, Ketu in the 5th. Gains, social networks, and ambitions meet creativity and children. The native achieves through networks and collective endeavours.' },
      { num: '12', heading: 'SHESHNAAG KAAL SARP', icon: CircleDot, color: '#064e3b', desc: 'Rahu in the 12th house, Ketu in the 6th. Liberation, foreign lands, and spiritual dissolution meet service and health. The native is drawn toward spiritual practice and foreign residence.' },
    ],
  },
  remedies: {
    heading: 'Classical Vedic Remedies for Kaal Sarp Dosha',
    subheading: 'Traditional Rahu-Ketu remedies, applied only after chart-based assessment',
    items: [
      { main: 'Perform Kaal Sarp Dosha Puja at Trimbakeshwar or a Nag Devata temple', detail: 'The most commonly prescribed traditional remedy, performed by qualified pandits' },
      { main: 'Chant the Rahu Beej mantra, Om Rāṃ Rāhave Namaḥ', detail: '108 times on Saturday evenings at dusk' },
      { main: 'Recite the Maha Mrityunjaya mantra daily', detail: 'Om Tryambakam Yajamahe is a protective mantra recommended as a general karmic shield' },
      { main: 'Donate blankets, sesame, and dark-coloured cloth on Saturdays', detail: "Rahu and Ketu are associated with Saturn's significations in several classical systems" },
      { main: 'Feed snakes or donate to snake conservation', detail: 'Traditional practice recommends reverence for serpent energy' },
      { main: 'Keep a silver or copper serpent idol and offer milk on Nag Panchami', detail: 'An annual ritual for Kaal Sarp Dosha pacification in the classical Vedic tradition' },
      { main: 'Perform Pitra Tarpan and ancestral rituals during Pitru Paksha', detail: 'Kaal Sarp Dosha is often linked to ancestral karma, making Tarpan a direct remedy' },
    ],
  },
  faqIntro: 'Your top questions about Kaal Sarp Dosha, answered with chart-first clarity.',
  faqs: [
    { question: 'What is Kaal Sarp Dosha in Vedic astrology?', answer: 'Kaal Sarp Dosha arises when all seven classical planets in the birth chart fall within the one hundred and eighty degree arc between Rahu and Ketu. The shadow planets encircle all visible planets, creating a concentrated karmic formation. It can show recurring obstacles and also extraordinary achievement when focused energy is consciously directed.' },
    { question: 'Does Kaal Sarp Dosha cancel automatically?', answer: "Several conditions are traditionally cited as reducing Kaal Sarp Dosha. If even one planet falls outside the Rahu-Ketu arc, the dosha is incomplete and reduced. Strong benefic aspects, especially from Jupiter, also mitigate effects. A full chart reading is required to assess these factors." },
    { question: 'Which famous people have Kaal Sarp Dosha?', answer: 'Several historically significant individuals are cited by Jyotish practitioners as carrying Kaal Sarp Dosha, including Sachin Tendulkar and Dhirubhai Ambani. This supports the observation that concentrated karmic energy can produce extraordinary achievement when directed with discipline.' },
    { question: 'Is Kaal Sarp Dosha the same as Kaal Sarp Yoga?', answer: 'Some practitioners use the terms interchangeably. Others distinguish between Dosha, which carries negative connotations, and Yoga, which is neutral or positive. The formation is the same. At Soul Infinity, it is treated as a concentrated karmic signature and always assessed in full chart context.' },
    { question: 'What are the practical effects of Kaal Sarp Dosha in daily life?', answer: 'Practical effects vary by type, Rahu-Ketu houses, and current dasha. Common observations include recurring dreams involving water or snakes, professional progress followed by reversals, delays in marriage, relationship instability, and a strong sense of destiny or unseen guidance.' },
  ],
  cta: {
    heading: 'Want a Personalised Kaal Sarp Dosha Reading?',
    body: 'Saurabh Jain at Soul Infinity reads your Kaal Sarp Dosha in the context of your full birth chart, the specific type based on Rahu-Ketu house placement, and current dasha timing, then explains what it actually means for your life without fear.',
  },
};

export default function KaalSarpDoshaPage() {
  return <DoshaDetailTemplate data={data} />;
}
