import { CheckCircle, HeartPulse, Moon, Search, ShieldCheck, Sparkles, Star, Target, Users } from 'lucide-react';
import DoshaDetailTemplate, { type DoshaDetailData } from './DoshaDetailTemplate';

const HERO_URL = 'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Pillar/Dosha/Nadi/nadi-dosha-hero-banner.webp';
const QUICK_FACTS_URL = 'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Pillar/Dosha/Nadi/nadi-dosha-quick-facts.webp';

const data: DoshaDetailData = {
  theme: {
    light: '#eff6ff',
    border: '#bfdbfe',
    dark: '#172554',
    accent: '#1d4ed8',
    accentText: '#1d4ed8',
    secondary: '#dbeafe',
  },
  seo: {
    title: 'Nadi Dosha in Vedic Astrology, Meaning, Effects, and Remedies | Soul Infinity',
    description: 'Understand Nadi Dosha in Vedic astrology Kundali matching. Learn what nadi types mean, when the dosha applies, cancellation rules, and classical remedies. Guidance by Saurabh Jain, K.N. Rao Institute.',
    keywords: 'nadi dosha, nadi dosh, kundali matching nadi, ashtakoot nadi, nadi dosha effects, nadi dosha remedies, nadi dosha cancellation, marriage compatibility vedic astrology',
    url: 'https://www.soulinfinity.space/dosha/nadi',
    image: HERO_URL,
    articleHeadline: 'Nadi Dosha in Vedic Astrology, Meaning, Effects, and Remedies',
    articleDescription: 'Understand Nadi Dosha, nadi types, Kundali Milan scoring, cancellation rules, and remedies.',
    webpageName: 'Nadi Dosha in Vedic Astrology',
    webpageDescription: 'Nadi Dosha meaning, marriage compatibility effects, cancellation rules, and classical remedies.',
  },
  hero: {
    url: HERO_URL,
    alt: 'Nadi Dosha hero banner showing the three nadi types in Vedic marriage compatibility analysis',
  },
  quickFacts: {
    url: QUICK_FACTS_URL,
    alt: 'Nadi Dosha quick facts showing three nadi types, nakshatra assignments, and Kundali Milan scoring',
  },
  breadcrumbLabel: 'Nadi Dosha',
  breadcrumbSchemaLabel: 'Nadi Dosha in Vedic Astrology',
  sanskritName: 'नाडी दोष',
  englishName: 'Nadi Dosha',
  h1: 'Nadi Dosha, The Pulse Compatibility Signal',
  subtitleParts: ['Ruled by Chandra (Moon)', 'Ether Element', 'The Progeny and Health Indicator'],
  introCards: [
    {
      title: 'The Three Nadis',
      body: 'In classical Vedic astrology, every nakshatra is assigned one of three nadis: Aadi (Vata), Madhya (Pitta), or Antya (Kapha). These correspond to the three fundamental energetic constitutions of Ayurveda. When two prospective partners share the same nadi, Nadi Dosha is said to be present in Kundali Milan.',
      icon: Sparkles,
    },
    {
      title: 'Ashtakoot and the 8-Point Scoring',
      body: 'Nadi is the eighth and highest-weighted guna in the Ashtakoot system of Kundali Milan, carrying 8 points out of 36. Nadi Dosha occurs when both partners share the same nadi type and the score for this category is zero.',
      icon: Target,
    },
    {
      title: 'Context Over Formula',
      body: 'At Soul Infinity, Saurabh Jain approaches Nadi Dosha as one input in a complex compatibility analysis, not an automatic veto. The overall Ashtakoot score, Navamsa compatibility, dasha alignment, and the full natal charts of both partners must be read together.',
      icon: ShieldCheck,
      dark: true,
    },
    {
      title: 'Soul Infinity Practitioner Insight',
      body: 'Saurabh Jain, trained at the K.N. Rao Institute of Astrology, New Delhi, observes that Nadi Dosha is frequently the most misapplied factor in Kundali Milan. A balanced reading considers all eight categories together, not Nadi in isolation.',
      icon: Star,
    },
  ],
  ruling: {
    heading: 'Ruled by Chandra (Moon)',
    body: 'The Moon governs mind, emotion, nurturing, constitution, and the subtle body in Vedic astrology. Nadi is a Moon-based compatibility factor because it measures the energetic compatibility of two constitutions at the subtle-body level.',
    power: 'Different nadi types between partners can indicate complementary energies that balance each other over a long marriage. Aadi-Madhya or Madhya-Antya combinations are traditionally considered beneficial pairings.',
    affliction: 'Same-nadi matching is associated with potential health friction between partners, challenges with conception or child health, and energetic sameness that can reduce complementarity.',
    mahadasha: 'The impact of Nadi Dosha tends to manifest most clearly during the dasha periods of the Moon or the lords of the 5th house, children, and 8th house, health and longevity of partner.',
  },
  stripTitle: 'Compatibility House Strip',
  stripItems: [
    { title: '5th House', body: 'Children, progeny, and creative legacy' },
    { title: '7th House', body: 'Marriage and long-term partnership' },
    { title: '8th House', body: 'Longevity of the partner and health within marriage' },
  ],
  mantra: {
    devanagari: 'ॐ सों सोमाय नमः',
    iast: 'Om Soṃ Somāya Namaḥ',
    english: 'Salutation to Soma (the Moon), the planet of mind, emotion, and the subtle body.',
    instructionPrimary: 'Chant 108 times',
    instructionSecondary: 'Monday mornings facing northeast',
  },
  traits: {
    heading: 'Nadi Dosha in Marriage Compatibility',
    subheading: 'Nadi shows constitutional compatibility, but it should never be read without the full matching context.',
    strengthsTitle: 'Strengths When Different Nadis',
    challengesTitle: 'Challenges When Same Nadis',
    strengths: [
      'Complementary constitutional energies',
      'Balanced Vata-Pitta-Kapha expression in partnership',
      "Energetic polarity that sustains long-term attraction",
      "Natural support for each other's health and wellbeing",
      'Higher Ashtakoot score contributes to overall compatibility',
    ],
    challenges: [
      'Potential constitutional friction in the long term',
      'Classical association with progeny health concerns',
      'Energetic sameness may reduce natural complementarity',
      'Zero points in the highest-weighted Ashtakoot category',
      'May indicate deeper incompatibility when other factors also align poorly',
    ],
  },
  detailSection: {
    heading: 'The Three Nadis and Their Nakshatra Assignments',
    subheading: 'Which nakshatra you were born in determines your nadi type',
    icon: Sparkles,
    items: [
      { num: '01', heading: 'AADI NADI (VATA)', icon: Sparkles, color: '#1d4ed8', desc: 'Ashwini, Ardra, Punarvasu, Uttara Phalguni, Hasta, Jyeshtha, Moola, Shatabhisha, Purva Bhadrapada. Vata constitution, air and ether element, characterised by movement, creativity, and sensitivity.' },
      { num: '02', heading: 'MADHYA NADI (PITTA)', icon: Target, color: '#2563eb', desc: 'Bharani, Mrigashira, Pushya, Purva Phalguni, Chitra, Anuradha, Purva Ashadha, Dhanishtha, Uttara Bhadrapada. Pitta constitution, fire and water element, characterised by transformation, intelligence, and ambition.' },
      { num: '03', heading: 'ANTYA NADI (KAPHA)', icon: HeartPulse, color: '#1e40af', desc: 'Krittika, Rohini, Ashlesha, Magha, Swati, Vishakha, Uttara Ashadha, Shravana, Revati. Kapha constitution, earth and water element, characterised by stability, endurance, and nurturing capacity.' },
      { num: '04', heading: 'MATCHING RULE', icon: CheckCircle, color: '#0f766e', desc: 'Nadi Dosha arises only when both partners share the same nadi category. Different nadis score 8 points, full marks, in Ashtakoot. Same nadi scores 0 points.' },
    ],
  },
  remedies: {
    heading: 'Classical Vedic Remedies for Nadi Dosha',
    subheading: 'Traditional compatibility remedies, applied only after full chart matching',
    items: [
      { main: 'Perform Nadi Dosha Nivaran Puja', detail: 'A specific puja prescribed for Nadi Dosha resolution, typically performed before marriage by qualified pandits' },
      { main: 'Donate cow and gold on auspicious days', detail: 'A traditional charitable remedy cited in classical texts for Nadi Dosha mitigation' },
      { main: 'Chant the Mahamrityunjaya mantra daily', detail: 'Om Tryambakam Yajamahe is a protective mantra for health, longevity, and constitutional challenges' },
      { main: 'Observe a fast on Mondays and worship the Moon', detail: 'Monday fasting with offerings of white flowers, milk, and rice to the Moon deity is a traditional pacification' },
      { main: 'Seek full compatibility assessment beyond Ashtakoot', detail: 'Navamsa, dasha alignment, and complete natal charts should be considered before any marriage decision is based on one factor' },
      { main: 'Wear pearl, Moti, set in silver on the ring finger', detail: 'Only after a qualified astrologer confirms Moon is the gemstone planet for your ascendant' },
    ],
  },
  faqIntro: 'Your top questions about Nadi Dosha, answered with full compatibility context.',
  faqs: [
    { question: 'What is Nadi Dosha in Kundali matching?', answer: 'Nadi Dosha is the compatibility challenge that arises in the Ashtakoot system of Kundali Milan when both prospective partners are born in nakshatras belonging to the same nadi type. The three nadis are Aadi, Madhya, and Antya. Nadi carries 8 points out of 36, and same nadi scores zero.' },
    { question: 'Can Nadi Dosha be cancelled?', answer: "Yes. Classical texts cite several conditions that cancel Nadi Dosha, including same birth rashi with different nakshatras, same nakshatra with different rashis, same nakshatra lord, or benefic planetary alignments that override the incompatibility. A qualified practitioner assesses all cancellations before drawing conclusions." },
    { question: 'Is Nadi Dosha a reason to reject a marriage proposal?', answer: 'Not on its own. Nadi Dosha is one factor among eight in Ashtakoot, and Ashtakoot itself is one layer of complete compatibility analysis. Overall score, Navamsa compatibility, dasha periods, and mutual chart strength provide a more reliable picture.' },
    { question: 'What are the health effects associated with Nadi Dosha?', answer: 'Classical texts associate same-nadi matching primarily with potential health friction between partners and challenges related to progeny. These are tendencies, not certainties. The full chart of both individuals and dasha timing provide a more reliable health picture.' },
    { question: 'How do I find my nadi type?', answer: "Your nadi type is determined by the nakshatra in which your Moon is placed at birth. The Moon's nakshatra is calculated from exact birth date, time, and location. Once you know your Moon nakshatra, you can identify whether it belongs to Aadi, Madhya, or Antya nadi." },
  ],
  cta: {
    heading: 'Want a Complete Kundali Matching Analysis?',
    body: 'Saurabh Jain at Soul Infinity reads full Kundali Milan including all eight Ashtakoot factors, Navamsa compatibility, dasha alignment, and individual chart strength, then gives you a clear picture of compatibility without reducing it to a single score.',
  },
};

export default function NadiDoshaPage() {
  return <DoshaDetailTemplate data={data} />;
}
