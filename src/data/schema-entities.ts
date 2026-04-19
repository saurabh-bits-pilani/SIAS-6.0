/**
 * Single source of truth for schema.org JSON-LD used across the site.
 *
 * Entities are wired together with @id references so Google can resolve
 * LocalBusiness / Organization / Person across pages into one knowledge graph
 * rather than treating every emission as a distinct entity.
 *
 * Coordinates are approximate (Adani Shantigram area). Adjust if a surveyed
 * precise lat/lng becomes available.
 */

export const SITE_ORIGIN =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SITE_ORIGIN) ||
  'https://soul-infinitycom.vercel.app';

/** Stable IDs for cross-entity references. */
export const SCHEMA_IDS = {
  organization: `${SITE_ORIGIN}/#organization`,
  localBusiness: `${SITE_ORIGIN}/#localbusiness`,
  website: `${SITE_ORIGIN}/#website`,
  saurabhJain: `${SITE_ORIGIN}/#saurabh-jain`,
} as const;

/** Canonical NAP — update here if the business moves or rebrands. */
export const BUSINESS_NAP = {
  legalName: 'Soul Infinity',
  tradingName: 'Soul Infinity Astro Solutions',
  streetAddress: 'The Meadows, D3 901, Adani Shantigram, Khodiyar',
  locality: 'Ahmedabad',
  region: 'Gujarat',
  postalCode: '382501',
  country: 'India',
  countryCode: 'IN',
  telephone: '+91-9079053840',
  telephoneDigits: '919079053840', // for wa.me and tel: canonicalization
  email: 'soul.infinity.astro@gmail.com',
  latitude: 23.0912,
  longitude: 72.5048,
  priceRange: '₹₹',
  logo: 'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Logo/Soul%20-Infinity-logo%201.png',
  founderImage: 'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/People/saurabh%20chat1.png',
  sameAs: [
    'https://www.facebook.com/people/Soul-Infinity/',
    'https://www.quora.com/profile/Saurabh-Jain-Soul-Infinity',
    'https://wa.me/919079053840',
  ],
  aggregateRating: {
    ratingValue: 4.9,
    reviewCount: 40,
    bestRating: 5,
    worstRating: 1,
  },
} as const;

export const AREAS_SERVED: readonly string[] = [
  'Ahmedabad',
  'Gujarat',
  'India',
  'Worldwide',
];

export type JsonLd = Record<string, unknown>;

const postalAddress = () =>
  ({
    '@type': 'PostalAddress',
    streetAddress: BUSINESS_NAP.streetAddress,
    addressLocality: BUSINESS_NAP.locality,
    addressRegion: BUSINESS_NAP.region,
    postalCode: BUSINESS_NAP.postalCode,
    addressCountry: BUSINESS_NAP.countryCode,
  }) as const;

const openingHoursSpec = () => [
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '12:00',
    closes: '21:00',
  },
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: 'Saturday',
    opens: '10:00',
    closes: '15:00',
  },
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: 'Sunday',
    description: 'By appointment only',
  },
];

/** Person — Saurabh Jain. Referenced by LocalBusiness.founder & .employee. */
export function getPersonSaurabhSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': SCHEMA_IDS.saurabhJain,
    name: 'Saurabh Jain',
    jobTitle: 'Vedic Astrologer',
    description:
      'Certified Professional Astrologer from K.N. Rao Institute. Expert in Parashari Jyotish, Bhrigu Nandi Nadi (BNN), KP Astrology, and Ashtakavarga. Combines a technical background (M.Tech, MBA) with classical Vedic training to offer precise, practical spiritual guidance.',
    image: BUSINESS_NAP.founderImage,
    url: `${SITE_ORIGIN}/cosmic-guide`,
    alumniOf: [
      {
        '@type': 'EducationalOrganization',
        name: 'Birla Institute of Technology and Science',
      },
      {
        '@type': 'EducationalOrganization',
        name: 'K.N. Rao Institute',
      },
    ],
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'degree',
        name: 'M.Tech in Computer Science',
      },
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'degree',
        name: 'MBA',
      },
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'degree',
        name: 'M.Phil',
      },
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'certification',
        name: 'Certified Professional Astrologer — K.N. Rao Institute',
      },
    ],
    knowsAbout: [
      'Vedic Astrology',
      'Parashari Jyotish',
      'Bhrigu Nandi Nadi',
      'KP Astrology',
      'Ashtakavarga',
      'Reiki Healing',
      'Pranic Healing',
      'Theta Healing',
      'Crystal Healing',
      'Tarot Reading',
      'Past Life Regression',
      'Astro Vastu',
      'Gemstone Consultation',
    ],
    knowsLanguage: ['English', 'Hindi', 'Gujarati'],
    worksFor: { '@id': SCHEMA_IDS.localBusiness },
    address: postalAddress(),
  };
}

/** Organization — the umbrella brand entity. */
export function getOrganizationSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': SCHEMA_IDS.organization,
    name: BUSINESS_NAP.legalName,
    legalName: BUSINESS_NAP.tradingName,
    url: `${SITE_ORIGIN}/`,
    logo: BUSINESS_NAP.logo,
    sameAs: BUSINESS_NAP.sameAs,
    founder: { '@id': SCHEMA_IDS.saurabhJain },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: BUSINESS_NAP.telephone,
      contactType: 'customer service',
      email: BUSINESS_NAP.email,
      areaServed: BUSINESS_NAP.countryCode,
      availableLanguage: ['English', 'Hindi', 'Gujarati'],
    },
  };
}

/** LocalBusiness with Astrologer specialisation. Core entity for local pack. */
export function getLocalBusinessSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': ['ProfessionalService', 'LocalBusiness'],
    '@id': SCHEMA_IDS.localBusiness,
    additionalType: [
      'https://schema.org/Astrologer',
      'https://schema.org/SpiritualConsultant',
    ],
    name: BUSINESS_NAP.tradingName,
    alternateName: BUSINESS_NAP.legalName,
    image: BUSINESS_NAP.logo,
    logo: BUSINESS_NAP.logo,
    description:
      'Vedic astrology consultancy in Ahmedabad offering Parashari Jyotish, BNN, KP astrology, astro-vastu, gemstone guidance, and spiritual healing (Reiki, Pranic, Theta, Crystal) with certified astrologer Saurabh Jain.',
    url: `${SITE_ORIGIN}/`,
    telephone: BUSINESS_NAP.telephone,
    email: BUSINESS_NAP.email,
    priceRange: BUSINESS_NAP.priceRange,
    address: postalAddress(),
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BUSINESS_NAP.latitude,
      longitude: BUSINESS_NAP.longitude,
    },
    areaServed: AREAS_SERVED.map((name) => ({
      '@type': name === 'Worldwide' ? 'Country' : 'Place',
      name,
    })),
    openingHoursSpecification: openingHoursSpec(),
    aggregateRating: {
      '@type': 'AggregateRating',
      ...BUSINESS_NAP.aggregateRating,
    },
    sameAs: BUSINESS_NAP.sameAs,
    founder: { '@id': SCHEMA_IDS.saurabhJain },
    employee: { '@id': SCHEMA_IDS.saurabhJain },
    parentOrganization: { '@id': SCHEMA_IDS.organization },
  };
}

/** WebSite with SearchAction (blog search target) for sitelinks-searchbox. */
export function getWebsiteSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': SCHEMA_IDS.website,
    url: `${SITE_ORIGIN}/`,
    name: BUSINESS_NAP.legalName,
    publisher: { '@id': SCHEMA_IDS.organization },
    inLanguage: 'en-IN',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_ORIGIN}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/* --------------------------- Service catalog ---------------------------- */

export type ServiceCategorySlug = 'vedic-astrology' | 'western-astrology' | 'healing';

export interface ServiceEntry {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  category: ServiceCategorySlug;
  categoryName: string;
  /** Page <title>. Written per-service for search intent (Ahmedabad + duration). */
  seoTitle: string;
  /** Page meta description. 150–160 chars, ends with a call-to-action. */
  seoDescription: string;
}

/** 12 services across 3 categories. Keep in sync with src/pages/ServiceDetail.tsx. */
export const SERVICES_CATALOG: readonly ServiceEntry[] = [
  // Vedic
  {
    slug: 'parashari-jyotish',
    category: 'vedic-astrology',
    categoryName: 'Vedic Astrology',
    title: 'Parashari Jyotish',
    description:
      'Classical Vedic astrology based on the teachings of Sage Parashara — insights into life path, karma, and spiritual evolution.',
    longDescription:
      'The most comprehensive Vedic astrology system, derived from Sage Parashara. Birth-chart analysis for personality, relationships, career, health, and spiritual growth.',
    seoTitle: 'Parashari Jyotish Consultation in Ahmedabad | Birth Chart Analysis',
    seoDescription:
      'Classical Vedic birth chart reading by Saurabh Jain in Ahmedabad. 60-min Parashari Jyotish consultation - planetary analysis, predictions, remedies. Book now.',
  },
  {
    slug: 'bnn',
    category: 'vedic-astrology',
    categoryName: 'Vedic Astrology',
    title: 'BNN (Bhrigu Nandi Nadi)',
    description:
      'Ancient palm-leaf astrology system for precise predictions and remedies based on the Bhrigu Samhita.',
    longDescription:
      'A rare and highly accurate predictive system from ancient palm-leaf manuscripts. Delivers event-level precision about past, present, and future.',
    seoTitle: 'Bhrigu Nandi Nadi (BNN) Astrology Online & Ahmedabad - Soul Infinity',
    seoDescription:
      'Ancient BNN astrology - precise predictions & personalized remedies. 90-min consultation with expert Saurabh Jain in Ahmedabad or online. Call +91 9079053840.',
  },
  {
    slug: 'kp-astrology',
    category: 'vedic-astrology',
    categoryName: 'Vedic Astrology',
    title: 'KP Astrology',
    description:
      'Krishnamurti Paddhati — a precise, scientific approach to astrological timing and prediction.',
    longDescription:
      'Developed by Prof. K.S. Krishnamurti, KP removes ambiguity and provides clear, time-bound predictions using sub-lord theory.',
    seoTitle: 'KP Astrology Consultation in Ahmedabad | Krishnamurti Paddhati Expert',
    seoDescription:
      'Scientific KP astrology with precise timing predictions. 75-min consultation by KP-trained Saurabh Jain in Ahmedabad. Book your session today.',
  },
  {
    slug: 'astro-vastu',
    category: 'vedic-astrology',
    categoryName: 'Vedic Astrology',
    title: 'Astro Vastu',
    description:
      'Harmonize your living space with astrological and Vastu principles for prosperity and well-being.',
    longDescription:
      'Astro-Vastu combines astrology and Vastu Shastra. Your birth chart and property layout are analysed together for optimal energy flow.',
    seoTitle: 'Astro Vastu Consultation Ahmedabad | Home & Office Vastu Analysis',
    seoDescription:
      'Harmonize your living & working spaces with Astro Vastu. 120-min on-site or remote consultation in Ahmedabad by Saurabh Jain. Call +91 9079053840.',
  },
  {
    slug: 'gem-stone',
    category: 'vedic-astrology',
    categoryName: 'Vedic Astrology',
    title: 'Gem Stone Consultation',
    description:
      'Personalised gemstone recommendations based on your birth chart for enhanced planetary benefits.',
    longDescription:
      'Gemstone therapy strengthens benefic planets and mitigates negative influences. Recommendations are individualised from your chart.',
    seoTitle: 'Gemstone Consultation in Ahmedabad | Birth Chart Based Gem Recommendation',
    seoDescription:
      'Personalized gemstone recommendations based on your Vedic chart. 45-min session with Saurabh Jain in Ahmedabad. Safe, authentic, effective. Book consultation.',
  },
  // Western
  {
    slug: 'tarot-card',
    category: 'western-astrology',
    categoryName: 'Western Astrology',
    title: 'Tarot Card Reading',
    description:
      'Intuitive card readings using traditional and modern tarot decks for guidance on life questions.',
    longDescription:
      'Combines intuitive insights with traditional tarot interpretations across multiple spreads to surface actionable guidance.',
    seoTitle: 'Tarot Card Reading in Ahmedabad & Online | Expert Tarot Reader',
    seoDescription:
      'Intuitive tarot readings to reveal hidden truths & future paths. 45-min session with Saurabh Jain, online or in Ahmedabad. Book your tarot consultation.',
  },
  {
    slug: 'symbol-analysis',
    category: 'western-astrology',
    categoryName: 'Western Astrology',
    title: 'Symbol Analysis',
    description:
      'Deep dive into astrological and spiritual symbols and their meaning in your life.',
    longDescription:
      'Interprets the symbolic language of the universe — the signs that recur across your chart and your lived experience.',
    seoTitle: 'Astrological Symbol Analysis in Ahmedabad - Soul Infinity',
    seoDescription:
      'Deep dive into astrological symbols and their meaning in your life. 60-min personalized session by Saurabh Jain in Ahmedabad or online.',
  },
  {
    slug: 'past-life-regression',
    category: 'western-astrology',
    categoryName: 'Western Astrology',
    title: 'Past Life Regression',
    description:
      'Guided meditation to explore past lives and understand current life patterns and relationships.',
    longDescription:
      'A therapeutic regression practice to surface memories from previous lifetimes and resolve karmic patterns in present relationships.',
    seoTitle: 'Past Life Regression Therapy in Ahmedabad | Soul Infinity',
    seoDescription:
      'Explore past lives to understand current life patterns & relationships. 120-min PLR therapy session with Saurabh Jain in Ahmedabad. Book today.',
  },
  // Healing
  {
    slug: 'reiki',
    category: 'healing',
    categoryName: 'Spiritual Healing',
    title: 'Reiki Healing',
    description:
      'Universal life-force energy healing for physical, emotional, and spiritual wellness.',
    longDescription:
      'A certified Reiki practitioner channels universal life-force energy to release blockages, reduce stress, and restore harmony across body, mind, and spirit.',
    seoTitle: 'Reiki Healing in Ahmedabad | Certified Reiki Practitioner - Soul Infinity',
    seoDescription:
      'Universal life force healing for physical, emotional & spiritual wellness. 60-min Reiki session with certified practitioner Saurabh Jain. Book in Ahmedabad.',
  },
  {
    slug: 'pranic-healing',
    category: 'healing',
    categoryName: 'Spiritual Healing',
    title: 'Pranic Healing',
    description:
      'No-touch energy healing using prana to cleanse and energise the body\'s energy field.',
    longDescription:
      'Pranic Healing works with the body\'s bio-electromagnetic field to remove dirty energy and project fresh prana into the affected chakras and organs.',
    seoTitle: 'Pranic Healing Consultation in Ahmedabad | Energy Healing Therapy',
    seoDescription:
      'Advanced pranic energy healing to cleanse & energize your aura. 75-min session by Saurabh Jain in Ahmedabad or distant healing available. Book now.',
  },
  {
    slug: 'theta-healing',
    category: 'healing',
    categoryName: 'Spiritual Healing',
    title: 'Theta Healing',
    description:
      'Meditative technique that reaches the theta brainwave state for belief reprogramming and healing.',
    longDescription:
      'Theta Healing uses a deep-meditative theta state to identify and replace limiting beliefs at the subconscious level, supporting emotional and physical healing.',
    seoTitle: 'Theta Healing in Ahmedabad | Deep Meditation Therapy - Soul Infinity',
    seoDescription:
      'Access theta brain waves for deep transformational healing. 90-min Theta Healing session with Saurabh Jain in Ahmedabad or online. Book consultation.',
  },
  {
    slug: 'crystal-healing',
    category: 'healing',
    categoryName: 'Spiritual Healing',
    title: 'Crystal Healing',
    description:
      'Harness the therapeutic vibrations of crystals for chakra balancing and energetic cleansing.',
    longDescription:
      'Crystal Healing aligns the body\'s energy centres using specific stones chosen for their vibrational resonance with each chakra.',
    seoTitle: 'Crystal Healing & Chakra Balancing in Ahmedabad - Soul Infinity',
    seoDescription:
      'Harness crystal vibrations to balance chakras & energy centers. 60-min Crystal Healing session by Saurabh Jain in Ahmedabad. Book your therapy today.',
  },
];

export function getServiceUrl(service: Pick<ServiceEntry, 'category' | 'slug'>): string {
  return `${SITE_ORIGIN}/services/${service.category}/${service.slug}`;
}

export interface ServiceOfferOpts {
  /** Numeric price (rupees). Pass the raw number, not a formatted string. */
  price?: number;
  priceCurrency?: string;
  /** Human-readable duration, e.g. "60-90 minutes". Emitted as termsOfService. */
  duration?: string;
}

/** Rich Service schema for an individual service page. */
export function getServiceSchema(service: ServiceEntry, opts: ServiceOfferOpts = {}): JsonLd {
  const base: JsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.longDescription,
    serviceType: service.categoryName,
    url: getServiceUrl(service),
    provider: { '@id': SCHEMA_IDS.localBusiness },
    areaServed: AREAS_SERVED.map((name) => ({
      '@type': name === 'Worldwide' ? 'Country' : 'Place',
      name,
    })),
  };
  if (opts.price != null) {
    base.offers = {
      '@type': 'Offer',
      price: opts.price,
      priceCurrency: opts.priceCurrency ?? 'INR',
      availability: 'https://schema.org/InStock',
      url: getServiceUrl(service),
    };
  }
  if (opts.duration) {
    base.termsOfService = `Consultation duration: ${opts.duration}`;
  }
  return base;
}

/** Compact Service entry for the /services ItemList. */
export function getServiceListItem(service: ServiceEntry, position: number): JsonLd {
  return {
    '@type': 'ListItem',
    position,
    item: {
      '@type': 'Service',
      name: service.title,
      description: service.description,
      serviceType: service.categoryName,
      url: getServiceUrl(service),
      provider: { '@id': SCHEMA_IDS.localBusiness },
    },
  };
}

export function getServicesItemListSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Soul Infinity Services',
    numberOfItems: SERVICES_CATALOG.length,
    itemListElement: SERVICES_CATALOG.map((s, i) => getServiceListItem(s, i + 1)),
  };
}

/* --------------------------- FAQs ---------------------------- */

/**
 * Authoritative FAQ content — rendered on /contact. Do NOT emit FAQPage
 * schema on pages that don't visibly show these Q&As: Google's FAQPage
 * rich-result guidelines require the answers to be present on the page.
 */
export const FAQS: ReadonlyArray<{ question: string; answer: string }> = [
  {
    question: 'Why do you need my exact birth time?',
    answer:
      'Precise birth time is crucial for accurate astrological calculations. Even a few minutes difference can change your birth chart significantly, affecting predictions and guidance.',
  },
  {
    question: "What if I don't know my exact birth time?",
    answer:
      'If exact time is unknown, provide your best estimate. Saurabh can work with approximate times, though precision may be slightly reduced. Sometimes birth-time rectification techniques can help.',
  },
  {
    question: 'Is my personal information secure?',
    answer:
      'Absolutely. Your birth details and personal information are kept strictly confidential and used solely for your astrological consultation and spiritual guidance.',
  },
  {
    question: 'How accurate should my birth place be?',
    answer:
      'Please provide the city where you were born. If born in a small town or village, mention the nearest major city. This helps in calculating accurate planetary positions.',
  },
  {
    question: 'Do you offer online consultations?',
    answer:
      'Yes. Consultations are available in person in Ahmedabad and online worldwide via video call. Sessions are available in English, Hindi, and Gujarati.',
  },
];

export function getFaqPageSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/* --------------------------- Breadcrumbs ---------------------------- */

export interface BreadcrumbCrumb {
  name: string;
  url: string;
}

export function getBreadcrumbSchema(crumbs: readonly BreadcrumbCrumb[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: c.url.startsWith('http') ? c.url : `${SITE_ORIGIN}${c.url}`,
    })),
  };
}

/* --------------------------- Pages ---------------------------- */

export function getContactPageSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: `Contact ${BUSINESS_NAP.legalName}`,
    url: `${SITE_ORIGIN}/contact`,
    mainEntity: { '@id': SCHEMA_IDS.localBusiness },
  };
}

export function getAboutPageSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'Our Cosmic Guide — Saurabh Jain',
    url: `${SITE_ORIGIN}/cosmic-guide`,
    mainEntity: { '@id': SCHEMA_IDS.saurabhJain },
  };
}

export function getWebPageSchema(opts: {
  name: string;
  description: string;
  url: string;
}): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: opts.name,
    description: opts.description,
    url: opts.url.startsWith('http') ? opts.url : `${SITE_ORIGIN}${opts.url}`,
    isPartOf: { '@id': SCHEMA_IDS.website },
    about: { '@id': SCHEMA_IDS.localBusiness },
  };
}

/* --------------------------- Blog ---------------------------- */

export function getBlogSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Soul Infinity — Cosmic Wisdom Blog',
    url: `${SITE_ORIGIN}/blog`,
    description:
      'Articles on Vedic astrology, spiritual growth, planetary wisdom, and cosmic insights by Saurabh Jain.',
    publisher: { '@id': SCHEMA_IDS.organization },
    author: { '@id': SCHEMA_IDS.saurabhJain },
    inLanguage: 'en-IN',
  };
}

export interface BlogPostMeta {
  headline: string;
  description: string;
  image: string;
  datePublished: string; // ISO 8601
  dateModified?: string; // ISO 8601
  url: string; // absolute or site-relative
  articleSection?: string;
  keywords?: readonly string[];
}

export function getArticleSchema(post: BlogPostMeta): JsonLd {
  const absUrl = post.url.startsWith('http') ? post.url : `${SITE_ORIGIN}${post.url}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.headline,
    description: post.description,
    image: post.image,
    datePublished: post.datePublished,
    dateModified: post.dateModified ?? post.datePublished,
    author: { '@id': SCHEMA_IDS.saurabhJain },
    publisher: { '@id': SCHEMA_IDS.organization },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': absUrl,
    },
    url: absUrl,
    inLanguage: 'en-IN',
    ...(post.articleSection ? { articleSection: post.articleSection } : {}),
    ...(post.keywords ? { keywords: post.keywords.join(', ') } : {}),
  };
}
