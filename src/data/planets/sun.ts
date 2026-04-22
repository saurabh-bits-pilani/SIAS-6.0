/**
 * Structured content for the Surya (Sun) pillar page at /planets/sun.
 *
 * Single source of truth for headline copy, mantras, quick facts, remedies,
 * FAQ, related services, and asset URLs. The SunPage component and the
 * schema JSON-LD generator both read from this module.
 *
 * Flagship template for the 28 remaining pillar pages. Keep the shape stable.
 */

export const SUN_ASSET_BASE =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Pillar/Planets/Sun';

export const sunAsset = (file: string): string => `${SUN_ASSET_BASE}/${file}`;

export interface QuickFact {
  icon: string;
  label: string;
  value: string;
}

export interface SigRow {
  icon: string;
  label: string;
  value: string;
}

export interface ConnectStep {
  icon: string;
  text: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface RelatedLink {
  href: string;
  title: string;
  blurb: string;
}

export interface SunContent {
  meta: {
    title: string;
    description: string;
    keywords: string;
    ogImage: string;
    canonicalPath: string;
    articleHeadline: string;
    articleDatePublished: string;
    articleDateModified: string;
  };
  hero: {
    name: string;
    subtitle: string;
    imageUrl: string;
    imageAlt: string;
    description: string;
  };
  quickFacts: readonly QuickFact[];
  mantras: {
    title: string;
    primary: {
      heading: string;
      devanagari: string;
      iast: string;
      meaning: string;
    };
    short: {
      heading: string;
      devanagari: string;
      iast: string;
      meaning: string;
    };
  };
  significations: readonly SigRow[];
  benefits: readonly string[];
  midBreak: {
    imageUrl: string;
    imageAlt: string;
    caption: string;
  };
  connect: readonly ConnectStep[];
  gemstone: {
    name: string;
    sanskrit: string;
    imageUrl: string;
    caveat: string;
  };
  affirmation: string;
  footer: {
    left: string;
    devanagari: string;
    translation: string;
  };
  faqs: readonly FaqItem[];
  related: readonly RelatedLink[];
}

const sunData: SunContent = {
  meta: {
    title: 'Surya (Sun) in Vedic Astrology: Meaning, Mantras, Remedies | Soul Infinity',
    description:
      'Complete guide to Surya (Sun) in Vedic astrology. Learn Surya mantras, house significations, exaltation in Aries, remedies for weak Sun, Ruby gemstone guidance. By K.N. Rao Institute trained astrologer Saurabh Jain.',
    keywords:
      'surya, sun in vedic astrology, sun mantra, navagraha, ruby gemstone, manikya, exaltation aries, debilitation libra, leo ruler, soul infinity, saurabh jain',
    ogImage: sunAsset('sun-handwritten.webp'),
    canonicalPath: '/planets/sun',
    articleHeadline: 'Surya (Sun) in Vedic Astrology: Meaning, Mantras, and Remedies',
    articleDatePublished: '2026-04-22',
    articleDateModified: '2026-04-22',
  },
  hero: {
    name: 'Surya',
    subtitle: 'The Radiant Soul',
    imageUrl: sunAsset('hero-surya.webp'),
    imageAlt:
      'Surya Dev riding his seven-horse chariot across the cosmic sky, surrounded by a golden Sanskrit zodiac halo',
    description:
      'The source of light, life and consciousness. Surya illuminates our soul, vitality and purpose.',
  },
  quickFacts: [
    { icon: 'icon-planet.svg', label: 'Planet', value: 'Surya' },
    { icon: 'icon-flame.svg', label: 'Element', value: 'Fire' },
    { icon: 'icon-masculine.svg', label: 'Nature', value: 'Masculine' },
    { icon: 'icon-metal.svg', label: 'Metal', value: 'Gold' },
    { icon: 'icon-calendar.svg', label: 'Day', value: 'Sunday' },
  ],
  mantras: {
    title: 'Sacred Mantras',
    primary: {
      heading: 'Navagraha Stotra, Surya Mantra',
      devanagari:
        'जपाकुसुम संकाशं काश्यपेयं महाद्युतिम् । तमोऽरिं सर्वपापघ्नं प्रणतोऽस्मि दिवाकरम् ॥',
      iast:
        "Japākusuma saṅkāśaṁ kāśyapeyaṁ mahādyutim | Tamo'riṁ sarva-pāpaghnaṁ praṇato'smi divākaram ||",
      meaning:
        'I bow to Surya, who shines like the red hibiscus flower, son of Kashyapa, greatly radiant, the enemy of darkness, and destroyer of all sins.',
    },
    short: {
      heading: 'Short Surya Mantra',
      devanagari: 'ॐ सूर्याय नमः ॥',
      iast: 'Om Sūryāya namaḥ ||',
      meaning: 'Salutations to Surya, the Sun-god.',
    },
  },
  significations: [
    { icon: 'icon-lotus.svg', label: 'Represents', value: 'Soul, Atma, Consciousness' },
    { icon: 'icon-crown.svg', label: 'Governs', value: 'Father, Leadership, Authority, Health, Confidence' },
    { icon: 'icon-leo-sign.svg', label: 'Signs Ruled', value: 'Leo (Simha)' },
    { icon: 'icon-arrow-up.svg', label: 'Exalted In', value: 'Aries (Mesha)' },
    { icon: 'icon-arrow-down.svg', label: 'Debilitated In', value: 'Libra (Tula)' },
    { icon: 'icon-compass.svg', label: 'Direction', value: 'East' },
    { icon: 'icon-planet.svg', label: 'Symbol', value: 'Circle with a dot' },
  ],
  benefits: [
    'Boosts confidence and self-esteem',
    'Improves leadership qualities',
    'Brings success, recognition, fame',
    'Enhances vitality and immune system',
    'Dispels negative energy and darkness',
    'Brings clarity, purpose, willpower',
  ],
  midBreak: {
    imageUrl: sunAsset('sage-worship.webp'),
    imageAlt:
      'A sage standing on a mountain at sunrise with arms raised, worshipping the blazing Sun encircled by Sanskrit glyphs',
    caption: 'Connect with the light at sunrise.',
  },
  connect: [
    { icon: 'icon-calendar.svg', text: 'Chant Surya mantra at sunrise facing East' },
    { icon: 'icon-lotus.svg', text: 'Offer water (Arghya) to the rising Sun' },
    { icon: 'icon-planet.svg', text: 'Wear Ruby (Manikya) in gold on ring finger' },
    { icon: 'icon-calendar.svg', text: 'Observe fast on Sundays' },
    { icon: 'icon-heart.svg', text: 'Practice gratitude and act with integrity' },
  ],
  gemstone: {
    name: 'Ruby',
    sanskrit: 'Manikya',
    imageUrl: sunAsset('ruby-ring.svg'),
    caveat: 'Sanctified only after astrological verification',
  },
  affirmation:
    'I am a radiant being of light, filled with purpose and power.',
  footer: {
    left: 'Light is the true nature of the soul.',
    devanagari: 'तमसो मा ज्योतिर्गमय ।',
    translation: 'Lead me from darkness to light.',
  },
  faqs: [
    {
      question: 'What does Surya represent in Vedic astrology?',
      answer:
        'Surya represents the Atma (soul), the father, authority, leadership, self-esteem, and the core life force in a birth chart. Classical texts describe the Sun as the karaka for purpose and identity, shaping how a person expresses their individuality in the world.',
    },
    {
      question: 'What are the effects of a strong Sun in a birth chart?',
      answer:
        'A well-placed Surya, especially when exalted in Aries or placed in its own sign Leo, can support confidence, recognition, a positive relationship with paternal figures, and steady vitality. Results always depend on the overall chart context and dasha sequence.',
    },
    {
      question: 'How do I know if my Sun is weak or afflicted?',
      answer:
        'Common indicators include Sun placed in Libra, combust with certain planets, or under heavy aspect from Saturn or Rahu. A qualified astrologer evaluates house placement, nakshatra lord, and Shadbala strength before drawing any conclusion.',
    },
    {
      question: 'Can wearing Ruby strengthen my Sun?',
      answer:
        'Ruby (Manikya) is the traditional gemstone associated with Surya and can support a well-placed but weak Sun. It is not recommended when Surya is debilitated or karmically afflicted, so it should only be worn after a detailed chart review.',
    },
    {
      question: 'How long is Surya Mahadasha and what does it bring?',
      answer:
        'Surya Mahadasha lasts six years in the Vimshottari Dasha system. Typical themes include authority, recognition, father-related matters, and ego work, with outcomes shaped by the Sun’s house, sign, and aspects in the natal chart.',
    },
    {
      question: 'Is Surya Namaskar an effective remedy for a weak Sun?',
      answer:
        'Surya Namaskar is a classical discipline that combines movement, breath, and mantra. Practised consistently at sunrise, it can support vitality and focus, and is often recommended alongside mantra japa as a lifestyle-based remedy.',
    },
    {
      question: 'What is the difference between Sun in Vedic versus Western astrology?',
      answer:
        'Vedic astrology uses the sidereal zodiac and gives the Sun a karaka role for soul and authority, while Western astrology uses the tropical zodiac and often emphasises Sun-sign personality traits. The two systems produce different sign placements and different predictive logic.',
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
};

export default sunData;
