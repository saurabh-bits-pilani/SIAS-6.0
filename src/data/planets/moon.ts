/**
 * Structured content for the Chandra (Moon) pillar page at /planets/moon.
 *
 * Shape matches PlanetPageData from components/planets/PlanetPageLayout.
 * Second planet page (Sun is the template precedent) , any future pillar
 * page can copy this file, swap content, and ship with zero layout changes.
 */

import type { PlanetPageData } from '../../components/planets/PlanetPageLayout';

const MOON_ASSETS =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Pillar/Planets/Moon';
const SUN_ASSETS =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Pillar/Planets/Sun';

/**
 * PlanetPageLayout requires the full PlanetPageData shape, but the SEO body
 * (ReactNode) is page-authored. The data file supplies everything else; the
 * page component slots in `seoBody` via spread.
 */
type MoonStaticData = Omit<PlanetPageData, 'seoBody'>;

export const MOON_ASSET_BASES = {
  moon: MOON_ASSETS,
  sun: SUN_ASSETS,
} as const;

const moonData: MoonStaticData = {
  meta: {
    title: 'Chandra (Moon) in Vedic Astrology: Meaning, Mantras, Remedies | Soul Infinity',
    description:
      'Complete guide to Chandra (Moon) in Vedic astrology. Learn Moon mantras, house significations, exaltation in Taurus, remedies for weak Moon, Pearl gemstone. By K.N. Rao Institute trained astrologer Saurabh Jain.',
    keywords:
      'chandra, moon in vedic astrology, chandra mantra, navagraha, pearl gemstone, moti mukta, exaltation taurus, debilitation scorpio, cancer ruler, soul infinity, saurabh jain',
    ogImage: `${MOON_ASSETS}/hero-chandra.webp`,
    canonicalPath: '/planets/moon',
    articleHeadline: 'Chandra (Moon) in Vedic Astrology: Meaning, Mantras, and Remedies',
    articleDatePublished: '2026-04-22',
    articleDateModified: '2026-04-22',
    articleKeywords: [
      'Chandra',
      'Moon in Vedic astrology',
      'Navagraha',
      'Pearl Moti',
      'Chandra mantra',
      'exaltation Taurus',
      'debilitation Scorpio',
    ],
    webpageName: 'Chandra (Moon) in Vedic Astrology',
    breadcrumbLabel: 'Moon (Chandra)',
  },
  name: {
    english: 'Moon',
    sanskrit: 'Chandra',
    devanagari: 'चन्द्र',
  },
  tagline: 'The Divine Mind',
  hero: {
    description:
      'Chandra governs the mind, emotions, and inner world. The Moon is the closest luminary to Earth and the karaka of manas, the seat of feeling and imagination.',
    descriptionHighlights: ['mind', 'emotions', 'inner world'],
    imageUrl: `${MOON_ASSETS}/hero-chandra.webp`,
    imageAlt:
      'Chandra Dev riding his silver chariot pulled by ten white horses across a starry night sky, a luminous full moon behind him',
  },
  theme: {
    accentFamily: 'blue',
    accentHex: '#60a5fa',
    heroRadialRgba: 'rgba(147, 197, 253, 0.18)',
    darkGradientFrom: '#0b1a2f',
    darkGradientTo: '#000000',
    heroTitleClass: 'text-blue-200',
    heroTitleShadow:
      '0 0 30px rgba(147, 197, 253, 0.45), 0 0 60px rgba(147, 197, 253, 0.2)',
    footerCaptionClass: 'text-blue-200',
    heroImageRingClass: 'ring-blue-300/25',
    heroImageGlowRgba: 'rgba(147, 197, 253, 0.22)',
  },
  quickFacts: [
    { icon: 'moon', label: 'Planet', value: 'Chandra' },
    { icon: 'droplet', label: 'Element', value: 'Water' },
    { icon: 'venus', label: 'Nature', value: 'Feminine' },
    { icon: 'diamond', label: 'Metal', value: 'Silver' },
    { icon: 'calendar', label: 'Day', value: 'Monday' },
  ],
  mantrasTitle: 'Sacred Mantras',
  mantras: [
    {
      title: 'Navagraha Stotra, Chandra Mantra',
      titleHighlight: 'Navagraha Stotra, Chandra Mantra',
      devanagari:
        'दधिशंख तुषाराभं क्षीरोदार्णव सम्भवम् । नमामि शशिनं सोमं शम्भोर्मुकुट भूषणम् ॥',
      iast:
        'Dadhiśaṅkha tuṣārābhaṁ kṣīrodārṇava sambhavam | Namāmi śaśinaṁ somaṁ śambhormukuṭa bhūṣaṇam ||',
      meaning:
        'I bow to Chandra, white as curd, conch, and frost, born from the ocean of milk, the hare-marked Soma, who adorns the crown of Shambhu.',
      meaningHighlights: ['ocean of milk', 'Shambhu'],
    },
    {
      title: 'Beej Mantra of Chandra',
      devanagari: 'ॐ श्रां श्रीं श्रौं सः चन्द्राय नमः ॥',
      iast: 'Om Śrāṁ Śrīṁ Śrauṁ Saḥ Candrāya Namaḥ ||',
      meaning: 'Salutations to Chandra, the luminous lord of the mind.',
      meaningHighlights: ['lord of the mind'],
      circleOm: true,
    },
  ],
  lifeCardTitle: 'Chandra in Our Life',
  lifeRows: [
    {
      icon: 'sparkles',
      label: 'Represents',
      value: 'Mind, Emotions, Mother',
      valueHighlights: ['Mind'],
    },
    {
      icon: 'heart-handshake',
      label: 'Governs',
      value: 'Intuition, Nurturing, Comfort, Imagination, Memory',
    },
    {
      icon: 'zodiac-cancer',
      label: 'Signs Ruled',
      value: 'Cancer (Karka)',
    },
    {
      icon: 'arrow-up',
      label: 'Exalted In',
      value: 'Taurus (Vrishabh), 3° peak',
    },
    {
      icon: 'arrow-down',
      label: 'Debilitated In',
      value: 'Scorpio (Vrishchik), 3° peak',
    },
    {
      icon: 'compass',
      label: 'Direction',
      value: 'North-West',
    },
    {
      icon: 'circle',
      label: 'Symbol',
      value: 'Crescent moon',
    },
  ],
  benefitsTitle: 'Benefits of Chandra Mantra',
  benefits: [
    { text: 'Calms the mind and reduces anxiety', highlights: ['Calms the mind'] },
    { text: 'Strengthens intuition and emotional intelligence', highlights: ['intuition'] },
    { text: 'Supports restful sleep and dream awareness', highlights: ['restful sleep'] },
    {
      text: 'Deepens the mother-child bond and family harmony',
      highlights: ['harmony'],
    },
    {
      text: 'Cools mental heat and restores inner balance',
      highlights: ['inner balance'],
    },
    {
      text: 'Nurtures imagination, creativity, and compassion',
      highlights: ['creativity', 'compassion'],
    },
  ],
  midBreak: {
    imageUrl: `${MOON_ASSETS}/sage-moonlight.webp`,
    imageAlt:
      'A sage seated in meditation beneath a full moon on a still lake, silver light reflected on the water',
    caption: 'Listen to the mind beneath the moon.',
  },
  howToConnectTitle: 'How to Connect with Chandra',
  howToConnect: [
    { icon: 'moon', text: 'Chant Chandra mantra on Monday nights under moonlight' },
    { icon: 'droplet', text: 'Offer water or milk to the Moon on full moon nights' },
    { icon: 'diamond', text: 'Wear Pearl (Moti) in silver on the little finger after verification' },
    { icon: 'leaf', text: 'Observe fast on Mondays with light vegetarian food' },
    { icon: 'heart', text: 'Honour mother and maternal figures with gratitude' },
  ],
  gemstone: {
    name: 'Pearl',
    sanskrit: 'Moti (Mukta)',
    imageUrl: `${MOON_ASSETS}/pearl-ring.webp`,
    imageAlt:
      'Ornate silver ring set with a large lustrous white pearl representing Moti, the gemstone of Chandra',
    caption: 'Sanctified only after astrological verification',
    glowFilter: 'drop-shadow(0 0 40px rgba(147, 197, 253, 0.55))',
    accentDoodleUrl: `${MOON_ASSETS}/doodle-moon.webp`,
    accentDoodleAlt: '',
  },
  affirmation: {
    text: 'I am calm, I trust my intuition, and I flow with life.',
    highlights: ['calm', 'intuition', 'flow with life'],
  },
  closingShloka: {
    left: 'The mind is born of the moon.',
    devanagari: 'चन्द्रमा मनसो जातः ।',
    translation: 'The Moon is born from the mind (Purusha Sukta).',
  },
  doodles: {
    primary: `${MOON_ASSETS}/doodle-moon.webp`,
    secondary: `${SUN_ASSETS}/doodle-lion.png`,
    tertiary: `${SUN_ASSETS}/star-accent.svg`,
    parchmentTextureUrl: `${SUN_ASSETS}/parchment-texture.webp`,
    quickFactIconBase: SUN_ASSETS,
    footerDecorBase: SUN_ASSETS,
  },
  faqs: [
    {
      question: 'What does Chandra represent in Vedic astrology?',
      answer:
        'Chandra represents the mind (manas), emotions, the mother, memory, nurturing, and the inner world of feeling and imagination. Classical texts name the Moon as the karaka for mental wellbeing and the quality of the mother bond, which shapes a person’s capacity for comfort and self-soothing through life.',
    },
    {
      question: 'What are the effects of a strong Moon in a birth chart?',
      answer:
        'A well-placed Chandra, especially exalted in Taurus or in its own sign Cancer, can support emotional steadiness, a warm relationship with the mother, restful sleep, creative imagination, and intuitive clarity. Results always depend on the full chart, including nakshatra lord and dasha sequence.',
    },
    {
      question: 'How do I know if my Moon is weak or afflicted?',
      answer:
        'Common indicators include Moon placed in Scorpio, in dark-phase (Krishna paksha near new moon), heavily aspected by Saturn or Rahu, or isolated without supportive aspects. A qualified astrologer reviews Shadbala, nakshatra lord behaviour, and dasha context before drawing any conclusion.',
    },
    {
      question: 'Can wearing Pearl strengthen my Moon?',
      answer:
        'Pearl (Moti) is the traditional gemstone associated with Chandra and can support a well-placed but weak Moon. It is not always suitable when the Moon is debilitated or under heavy affliction, so it should only be worn after a careful chart review and a test-wearing period.',
    },
    {
      question: 'How long is Chandra Mahadasha and what does it bring?',
      answer:
        'Chandra Mahadasha lasts ten years in the Vimshottari Dasha system. Typical themes include emotional cycles, public favour, comfort, motherhood, domestic life, and fluctuating circumstances. Outcomes depend on the Moon’s sign, house, and dignity in the natal chart.',
    },
    {
      question: 'Why is the Moon considered the most important planet in Vedic astrology?',
      answer:
        'Because the mind processes every experience, the Moon, as karaka of manas, mediates how every other planet is lived. Many classical predictive techniques, including Chandra Lagna, Dashavarga charts, and much of Ashtakavarga, take the Moon as a primary reference point alongside the Lagna itself.',
    },
    {
      question: 'What is the difference between Moon sign (Rashi) in Vedic astrology and Western astrology?',
      answer:
        'Vedic astrology uses the sidereal zodiac and reads the Moon sign as the native’s mental and emotional template, often called Janma Rashi. Western astrology uses the tropical zodiac and typically emphasises the Sun sign, so the two systems usually produce different sign placements and different interpretive emphasis.',
    },
  ],
  related: [
    {
      href: '/services/vedic-astrology/parashari-jyotish',
      title: 'Parashari Jyotish Reading',
      blurb: 'Classical birth-chart analysis rooted in Sage Parashara.',
    },
    {
      href: '/services/vedic-astrology/bnn',
      title: 'BNN Astrology Analysis',
      blurb: 'Bhrigu Nandi Nadi, precise event-level predictions.',
    },
    {
      href: '/services/vedic-astrology/kp-astrology',
      title: 'KP Method Reading',
      blurb: 'Krishnamurti Paddhati for clean, time-bound predictions.',
    },
    {
      href: '/planets',
      title: 'All Nine Planets',
      blurb: 'Explore the Navagraha hub for every planetary guide.',
    },
  ],
  ctaName: 'Chandra',
  ctaHeadline: 'Want a personalised Chandra analysis in your birth chart?',
  ctaSubline:
    'Connect with Saurabh Jain, K.N. Rao Institute trained astrologer, for a detailed Moon and mind reading.',
};

export default moonData;
