import { Baby, CircleDot, Flame, Heart, Home, Search, ShieldCheck, Sparkles, Star, Sun, TreePine, Users } from 'lucide-react';
import DoshaDetailTemplate, { type DoshaDetailData } from './DoshaDetailTemplate';

const HERO_URL = 'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Pillar/Dosha/Pitru/pitru-dosha-hero-banner.webp';
const QUICK_FACTS_URL = 'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Pillar/Dosha/Pitru/pitru-dosha-quick-facts.webp';

const data: DoshaDetailData = {
  theme: {
    light: '#fff7ed',
    border: '#fed7aa',
    dark: '#431407',
    accent: '#9a3412',
    accentText: '#9a3412',
    secondary: '#ffedd5',
  },
  seo: {
    title: 'Pitru Dosha in Vedic Astrology, Meaning, Effects, and Remedies | Soul Infinity',
    description: 'Understand Pitru Dosha in Vedic astrology. Learn what ancestral karma means in the birth chart, how Sun and Saturn indicate it, and classical remedies including Shraddha and Tarpan. Guidance by Saurabh Jain, K.N. Rao Institute.',
    keywords: 'pitru dosha, pitra dosha, pitru dosh, ancestral karma vedic astrology, pitru dosha effects, pitru dosha remedies, shraddha tarpan, pitra dosh in kundli',
    url: 'https://www.soulinfinity.space/dosha/pitru',
    image: HERO_URL,
    articleHeadline: 'Pitru Dosha in Vedic Astrology, Meaning, Effects, and Remedies',
    articleDescription: 'Understand Pitru Dosha, ancestral karma indicators, Sun-Saturn afflictions, Shraddha, Tarpan, and remedies.',
    webpageName: 'Pitru Dosha in Vedic Astrology',
    webpageDescription: 'Pitru Dosha meaning, ancestral karma indicators, effects, and classical remedies.',
  },
  hero: {
    url: HERO_URL,
    alt: 'Pitru Dosha hero banner showing ancestral karma patterns and the Sun-Saturn axis in Vedic astrology',
  },
  quickFacts: {
    url: QUICK_FACTS_URL,
    alt: 'Pitru Dosha quick facts showing Sun Saturn afflictions, 9th house indicators, and ancestral karma effects',
  },
  breadcrumbLabel: 'Pitru Dosha',
  breadcrumbSchemaLabel: 'Pitru Dosha in Vedic Astrology',
  sanskritName: 'पितृ दोष',
  englishName: 'Pitru Dosha',
  h1: 'Pitru Dosha, The Ancestral Karmic Debt',
  subtitleParts: ['Ruled by Surya and Shani (Sun and Saturn)', 'The Father Line Karma', 'Ancestral Unfulfillment'],
  introCards: [
    {
      title: 'The Ancestral Imprint',
      body: 'Pitru Dosha refers to a karmic imprint in the birth chart linked to unfulfilled obligations of ancestors, particularly on the paternal line. Classical Vedic texts including the Garuda Purana and Vishnu Purana associate certain planetary configurations with ancestral debt that manifests as recurring patterns across generations.',
      icon: Users,
    },
    {
      title: 'The Sun-Saturn Axis',
      body: 'The primary planetary indicators are afflictions to the Sun, the significator of the father and ancestors, and Saturn, the planet of karma and time. When these planets are afflicted by Rahu, Ketu, or malefics in the 9th, 5th, or 2nd house, Pitru Dosha may be present.',
      icon: Sun,
    },
    {
      title: 'A Signal for Conscious Action',
      body: 'At Soul Infinity, Saurabh Jain approaches Pitru Dosha not as a helpless curse but as an invitation to consciously fulfill ancestral duties. Shraddha, Tarpan, and ancestral service are practical karmic actions that complete what previous generations could not complete.',
      icon: ShieldCheck,
      dark: true,
    },
    {
      title: 'Soul Infinity Practitioner Insight',
      body: 'Saurabh Jain, trained at the K.N. Rao Institute of Astrology, New Delhi, observes that Pitru Dosha is emotionally charged because it involves family lineage and ancestral memory. A careful chart reading distinguishes genuine ancestral karma from incidental combinations.',
      icon: Star,
    },
  ],
  ruling: {
    heading: 'Ruled by Surya and Shani (Sun and Saturn)',
    body: 'The Sun governs the father, authority, the soul, and the paternal ancestral line in Vedic astrology. Saturn governs karma, time, obligations, and the consequences of unfulfilled duties. Together they define the karmic relationship between the native and ancestral heritage.',
    power: 'Natives with Pitru Dosha who consciously perform ancestral rituals and fulfill paternal duties often experience release of generational patterns. This completion of ancestral karma is considered spiritually meaningful action.',
    affliction: 'Unaddressed Pitru Dosha is associated with obstacles to progeny, recurring difficulties on the paternal side, unexplained career stagnation despite effort, and a sense of ancestral weight across generations.',
    mahadasha: 'The Sun Mahadasha, 6 years, and Saturn Mahadasha, 19 years, are the periods during which Pitru Dosha most actively manifests. Natal strength and house placement of both planets are essential.',
  },
  stripTitle: 'Ancestral House Strip',
  stripItems: [
    { title: '9th House', body: 'Dharma, father, and the paternal ancestral line' },
    { title: '5th House', body: 'Progeny, merit from past lives, and ancestral blessings' },
    { title: '2nd House', body: 'Family lineage, ancestral wealth, and inherited speech patterns' },
  ],
  mantra: {
    devanagari: 'ॐ पितृभ्यः नमः',
    iast: 'Om Pitṛbhyaḥ Namaḥ',
    english: 'Salutation to the ancestors, the forebears who came before.',
    instructionPrimary: 'Chant 108 times',
    instructionSecondary: 'Pitru Paksha or Amavasya mornings',
  },
  traits: {
    heading: 'Living with Pitru Dosha',
    subheading: 'Ancestral karma can feel heavy, but conscious ritual and duty can turn it into lineage healing.',
    strengthsTitle: 'Strengths When Addressed',
    challengesTitle: 'Challenges When Unaddressed',
    strengths: [
      'Deep connection to ancestral wisdom and tradition',
      'Motivation for genuine spiritual and karmic practice',
      'Capacity for profound healing across generational lines',
      'Heightened sense of duty and family responsibility',
      'Access to ancestral strength through ritual connection',
      'Potential for breaking generational patterns consciously',
    ],
    challenges: [
      'Recurring unexplained obstacles in career and family',
      'Difficulty with progeny or child health',
      'A sense of ancestral weight or family karma',
      'Paternal relationship challenges',
      'Unexplained financial stagnation despite effort',
      'Recurring patterns that persist across family generations',
    ],
  },
  detailSection: {
    heading: 'Pitru Dosha Indicators Across the Chart',
    subheading: 'Key planetary combinations that classical texts identify',
    icon: Sun,
    items: [
      { num: '01', heading: 'SUN AFFLICTED IN 9TH', icon: Sun, color: '#9a3412', desc: 'Sun in the 9th house afflicted by Rahu, Ketu, or Saturn. The 9th is the primary house of the father and dharma. Affliction here is the strongest indicator.' },
      { num: '02', heading: 'SATURN IN 9TH HOUSE', icon: CircleDot, color: '#7c2d12', desc: 'Saturn placed in the 9th house, especially with malefic aspects. Saturn in the house of father and dharma can indicate unresolved paternal karma.' },
      { num: '03', heading: 'RAHU WITH SUN', icon: Flame, color: '#b45309', desc: 'Rahu conjunct the Sun in any house, particularly the 1st, 5th, or 9th. Rahu eclipses solar energy, creating a shadow over paternal connections.' },
      { num: '04', heading: 'KETU IN 9TH HOUSE', icon: Sparkles, color: '#92400e', desc: 'Ketu in the 9th house indicates past-life karma related to the father line, often involving spiritual obligations or duties left incomplete.' },
      { num: '05', heading: 'AFFLICTED 5TH HOUSE', icon: Baby, color: '#9a3412', desc: 'The 5th house governs progeny and past-life merit. Malefic or Rahu-Ketu afflictions here are associated with ancestral karma affecting the next generation.' },
      { num: '06', heading: 'SUN-SATURN CONJUNCTION', icon: CircleDot, color: '#7c2d12', desc: 'Sun and Saturn in conjunction, particularly in the 9th, 5th, or 1st house. The father significator and karma planet together form a classical indicator.' },
      { num: '07', heading: 'SUN IN ENEMY SIGN', icon: Sun, color: '#b45309', desc: 'Sun placed in Libra or another enemy sign and additionally afflicted by Rahu or Saturn compounds the ancestral karmic signature.' },
      { num: '08', heading: 'NO MALE PROGENY PATTERN', icon: Baby, color: '#92400e', desc: 'Classical texts note recurring patterns of no male progeny across generations, especially when the 5th lord is afflicted and other indicators are present.' },
      { num: '09', heading: 'AMAVASYA BIRTH', icon: CircleDot, color: '#9a3412', desc: 'Birth on Amavasya with additional Sun or Saturn afflictions is sometimes cited as a Pitru Dosha indicator in traditional practice.' },
      { num: '10', heading: 'FATHER-LINE HEALTH PATTERNS', icon: Heart, color: '#7c2d12', desc: 'Recurring similar health challenges on the paternal side across generations are considered a functional indicator when corroborated by chart factors.' },
      { num: '11', heading: 'SATURN ASPECTING SUN', icon: Search, color: '#b45309', desc: "Saturn's 3rd, 7th, or 10th aspect falling on a compromised natal Sun creates a combined father-karma signature." },
      { num: '12', heading: '9TH LORD AFFLICTED', icon: Home, color: '#92400e', desc: 'The 9th lord afflicted by malefics or placed in the 6th, 8th, or 12th house weakens the ancestral blessings channel.' },
    ],
  },
  remedies: {
    heading: 'Classical Vedic Remedies for Pitru Dosha',
    subheading: 'Traditional ancestral remedies, applied with sincerity and chart-based judgment',
    items: [
      { main: 'Perform Shraddha and Tarpan during Pitru Paksha', detail: "The most important classical remedy, performed on the ancestor's tithi or Sarvapitri Amavasya if the date is unknown" },
      { main: 'Perform Tarpan on Amavasya every month', detail: 'Monthly new moon Tarpan is a consistent ancestral offering that keeps the connection active' },
      { main: 'Feed Brahmins, the poor, and crows on Amavasya', detail: 'Crows are considered messengers of ancestors in the Vedic tradition' },
      { main: 'Donate on behalf of ancestors in their name', detail: 'Food, clothing, and education support for the underprivileged is considered direct ancestral merit transfer' },
      { main: 'Plant trees, particularly peepal, banyan, or tulsi', detail: 'Classical texts recommend tree planting as a remedy for ancestral debt' },
      { main: 'Chant Pitru Gayatri mantra daily during Pitru Paksha', detail: 'Om Pitru Devaya Vidmahe, Jagat Dharaya Dhimahi, Tanno Pitru Prachodayat invokes ancestral blessings' },
      { main: 'Perform Narayan Bali or Tripindi Shraddha where prescribed', detail: 'These elaborate rituals are not recommended without proper chart assessment and pandit guidance' },
    ],
  },
  faqIntro: 'Your top questions about Pitru Dosha, answered with ancestral and chart context.',
  faqs: [
    { question: 'What is Pitru Dosha in Vedic astrology?', answer: 'Pitru Dosha refers to an ancestral karmic imprint in the birth chart associated with unfulfilled obligations of the paternal ancestral line. Classical texts identify afflictions to the Sun, Saturn, or 9th house as indicators that ancestral debt requires conscious resolution through ritual and service.' },
    { question: 'How do I know if I have Pitru Dosha?', answer: 'Pitru Dosha is identified through specific configurations such as afflicted Sun in the 9th house, Rahu or Ketu with Sun, Saturn in the 9th house with malefic aspects, or the 9th lord placed in the 6th, 8th, or 12th house. Recurring paternal family patterns are also considered alongside chart analysis.' },
    { question: 'What is the most important remedy for Pitru Dosha?', answer: 'The most important remedy is performing Shraddha and Tarpan during Pitru Paksha. This is a direct karmic action of offering sustenance and gratitude to ancestral energy. Monthly Amavasya Tarpan and feeding crows and the poor are accessible ongoing practices.' },
    { question: 'Does Pitru Dosha affect children?', answer: 'Classical texts associate Pitru Dosha with potential obstacles to progeny, child health challenges, or recurring family patterns. These are tendencies, not certainties. A full chart reading including the 5th house, its lord, and navamsa gives a more accurate picture.' },
    { question: 'Can Pitru Dosha be completely resolved?', answer: 'Classical Vedic tradition holds that Pitru Dosha is resolved through consistent karmic action, Shraddha, Tarpan, ancestral service, and charitable giving, performed with genuine intention over time. The tradition prescribes a lifetime orientation of ancestral respect and duty fulfillment.' },
  ],
  cta: {
    heading: 'Want a Personalised Pitru Dosha Reading?',
    body: 'Saurabh Jain at Soul Infinity reads Pitru Dosha in your full birth chart context, identifies specific ancestral indicators, and recommends the classical remedies most appropriate for your chart without fear and without unnecessary rituals.',
  },
};

export default function PitruDoshaPage() {
  return <DoshaDetailTemplate data={data} />;
}
