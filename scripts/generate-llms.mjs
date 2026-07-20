#!/usr/bin/env node
// Regenerate llms.txt for both the deployed site and the local reference copy.
// The file is built from the canonical route inventory so it stays in sync
// with every published page, including blog posts discovered at build time.

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ROUTES } from './prerender.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT_PATHS = [
  path.join(ROOT, 'public', 'llms.txt'),
  path.join(ROOT, 'LLMs-text', 'llms.text'),
];
const BLOG_MANIFEST_PATH = path.join(ROOT, 'src', 'data', 'blog-manifest.json');

const SITE_URL =
  (process.env.VITE_SITE_URL || process.env.VITE_SITE_ORIGIN || 'https://www.soulinfinity.space').replace(/\/$/, '');

const BUILD_DATE = new Date();
const UPDATED_ON = BUILD_DATE.toISOString().slice(0, 10);

function abs(route) {
  return route === '/' ? `${SITE_URL}/` : `${SITE_URL}${route}`;
}

function titleCaseSlug(slug) {
  return slug
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

const STATIC_META = {
  '/': {
    title: 'Home',
    desc: 'Homepage for Soul Infinity, introducing Saurabh Jain, consultation categories, testimonials, FAQs, and ways to begin a Vedic astrology or healing journey.',
  },
  '/services': {
    title: 'All Services',
    desc: 'Overview of all consultation categories and service offerings across Vedic astrology, Western astrology, and spiritual healing.',
  },
  '/services/vedic-astrology': {
    title: 'Vedic Astrology Services',
    desc: 'Hub for Vedic astrology consultations, including Parashari Jyotish, BNN, KP Astrology, Astro Vastu, and gemstone guidance.',
  },
  '/services/western-astrology': {
    title: 'Western Astrology Services',
    desc: 'Hub for tarot card reading, astrological symbol analysis, and past life regression sessions.',
  },
  '/services/healing': {
    title: 'Healing Services',
    desc: 'Hub for Reiki, Pranic Healing, Theta Healing, and Crystal Healing sessions designed for emotional, energetic, and spiritual balance.',
  },
  '/services/vedic-astrology/parashari-jyotish': {
    title: 'Parashari Jyotish Consultation',
    desc: 'Classical Vedic birth-chart consultation using houses, grahas, dashas, yogas, and divisional charts for life guidance and timing.',
  },
  '/services/vedic-astrology/bnn': {
    title: 'Bhrigu Nandi Nadi Consultation',
    desc: 'BNN astrology consultation focused on karmic patterns, event timing, and prediction windows using the Sage Bhrigu lineage.',
  },
  '/services/vedic-astrology/kp-astrology': {
    title: 'KP Astrology Consultation',
    desc: 'Krishnamurti Paddhati consultation for precise timing, sub-lord analysis, and question-specific predictive astrology.',
  },
  '/services/vedic-astrology/astro-vastu': {
    title: 'Astro Vastu Consultation',
    desc: 'Astro Vastu consultation combining birth-chart insight with home and office directional energy corrections.',
  },
  '/services/vedic-astrology/gem-stone': {
    title: 'Gemstone Consultation',
    desc: 'Birth-chart-based gemstone guidance covering suitability, wearing method, timing, and safety before recommending any stone.',
  },
  '/services/western-astrology/tarot-card': {
    title: 'Tarot Card Reading',
    desc: 'Tarot consultation for clarity around relationships, career, inner blocks, and near-term decision-making.',
  },
  '/services/western-astrology/symbol-analysis': {
    title: 'Astrological Symbol Analysis',
    desc: 'Interpretive consultation focused on symbols, recurring archetypes, and intuitive pattern-reading within a client’s life journey.',
  },
  '/services/western-astrology/past-life-regression': {
    title: 'Past Life Regression',
    desc: 'Past life regression session exploring repeating emotional themes, karmic relationships, and memory-based healing work.',
  },
  '/services/healing/reiki': {
    title: 'Reiki Healing',
    desc: 'Reiki healing session for relaxation, emotional release, energy balance, and spiritual support.',
  },
  '/services/healing/pranic-healing': {
    title: 'Pranic Healing',
    desc: 'Pranic Healing consultation focused on cleansing, energizing, chakra balancing, and stress relief support.',
  },
  '/services/healing/theta-healing': {
    title: 'Theta Healing',
    desc: 'Theta Healing session using meditative awareness and belief-work for deeper emotional and spiritual transformation.',
  },
  '/services/healing/crystal-healing': {
    title: 'Crystal Healing',
    desc: 'Crystal Healing and chakra-balancing session using curated crystals for emotional, energetic, and spiritual support.',
  },
  '/cosmic-guide': {
    title: 'Cosmic Guide',
    desc: 'About page for Saurabh Jain, including credentials, training, practice philosophy, client trust markers, and consultation approach.',
  },
  '/cosmic-podcast': {
    title: 'Cosmic Podcast',
    desc: 'Podcast hub for spiritual and astrological audio content from Soul Infinity.',
  },
  '/blog': {
    title: 'Blog',
    desc: 'Blog index for articles on Vedic astrology, remedies, nakshatras, planets, healing, and spiritual education.',
  },
  '/blog/mantra': {
    title: 'Mantra Guide',
    desc: 'Guide to sacred mantras, their meaning, benefits, chanting method, and devotional use in spiritual practice.',
  },
  '/blog/shani-jayanti-2026': {
    title: 'Shani Jayanti 2026',
    desc: 'Festival guide explaining Shani Jayanti 2026 significance, rituals, remedies, discipline, and devotional observance.',
  },
  '/blog/saturn-karma-two-souls': {
    title: 'Saturn Karma Case Study',
    desc: 'Case-study article examining Saturn, karma, dasha timing, and intergenerational patterns through chart interpretation.',
  },
  '/blog/can-ai-do-vedic-astrology': {
    title: 'Can AI Do Vedic Astrology?',
    desc: 'Editorial article explaining the limits of AI-led kundli reading and the human judgment required in classical Jyotish.',
  },
  '/gallery': {
    title: 'Gallery',
    desc: 'Gallery of consultations, events, healing spaces, and visual moments from the Soul Infinity practice.',
  },
  '/gallery/remedies': {
    title: 'Remedies Gallery',
    desc: 'Visual and educational page on Vedic remedies such as mantras, gemstones, rituals, and supportive spiritual practices.',
  },
  '/gallery/pitra-dosh': {
    title: 'Pitra Dosh Guide',
    desc: 'Focused page on Pitra Dosh, including causes, symptoms, ancestral karma themes, and remedy-oriented guidance.',
  },
  '/panchang': {
    title: 'Daily Panchang',
    desc: 'Daily Panchang page showing tithi, nakshatra, yoga, karana, and muhurat information for practical spiritual timing.',
  },
  '/planets': {
    title: 'Planets Hub',
    desc: 'Hub for the Navagraha, introducing the nine planetary forces of Vedic astrology and their meanings, remedies, and symbolism.',
  },
  '/planets/jupiter': {
    title: 'Guru (Jupiter)',
    desc: 'Planet page for Jupiter, covering wisdom, dharma, blessings, gemstone guidance, remedies, and devotional references.',
  },
  '/planets/ketu': {
    title: 'Ketu',
    desc: 'Planet page for Ketu, covering detachment, moksha, intuition, karmic release, remedies, and spiritual symbolism.',
  },
  '/planets/mars': {
    title: 'Mangala (Mars)',
    desc: 'Planet page for Mars, covering courage, discipline, vitality, conflict, remedies, and spiritual strengthening.',
  },
  '/planets/mercury': {
    title: 'Budh (Mercury)',
    desc: 'Planet page for Mercury, covering intellect, speech, adaptability, gemstone guidance, and balancing remedies.',
  },
  '/planets/moon': {
    title: 'Chandra (Moon)',
    desc: 'Planet page for the Moon, covering mind, emotions, mother, intuition, remedies, gemstone guidance, and house meanings.',
  },
  '/planets/rahu': {
    title: 'Rahu',
    desc: 'Planet page for Rahu, covering desire, ambition, illusion, transformation, remedies, and karmic lessons.',
  },
  '/planets/saturn': {
    title: 'Shani (Saturn)',
    desc: 'Planet page for Saturn, covering karma, discipline, maturity, Sade Sati, remedies, and life lessons through time.',
  },
  '/planets/sun': {
    title: 'Surya (Sun)',
    desc: 'Planet page for the Sun, covering soul, father, authority, vitality, remedies, gemstone guidance, and house meanings.',
  },
  '/planets/venus': {
    title: 'Shukra (Venus)',
    desc: 'Planet page for Venus, covering love, beauty, refinement, relationships, remedies, and spiritualized enjoyment.',
  },
  '/zodiac': {
    title: 'Zodiac Hub',
    desc: 'Hub for the twelve rashis of Vedic astrology, summarizing ruling planets, elements, temperaments, and life themes.',
  },
  '/nakshatra/rohini': {
    title: 'Rohini Nakshatra',
    desc: 'Long-form guide to Rohini Nakshatra, including mythology, personality, house placements, compatibility, and remedies.',
  },
  '/dosha': {
    title: 'Dosha Hub',
    desc: 'Hub for major Vedic astrology doshas, covering definition, symptoms, karmic meaning, and possible remedies.',
  },
  '/dosha/mangal': {
    title: 'Mangal Dosha',
    desc: 'Guide to Mangal Dosha, including house placements, relationship effects, cancellation rules, and remedies.',
  },
  '/dosha/saade-sati': {
    title: 'Saade Sati',
    desc: 'Guide to Saade Sati, covering Saturn’s 7.5-year Moon transit, phases, effects, and practical remedies.',
  },
  '/dosha/kaal-sarp': {
    title: 'Kaal Sarp Dosha',
    desc: 'Guide to Kaal Sarp Dosha, including Rahu-Ketu enclosure, life effects, misconceptions, and remedies.',
  },
  '/dosha/nadi': {
    title: 'Nadi Dosha',
    desc: 'Guide to Nadi Dosha, especially for kundli matching, marriage compatibility, cancellation, and remedies.',
  },
  '/dosha/pitru': {
    title: 'Pitru Dosha',
    desc: 'Guide to Pitru Dosha, focusing on ancestral patterns, karmic indications, family effects, and remedies.',
  },
  '/contact': {
    title: 'Contact',
    desc: 'Contact page with booking options, WhatsApp, phone, email, address, and consultation inquiry flow.',
  },
  '/my-analysis': {
    title: 'My Analysis Portal',
    desc: 'Private client portal entry point for Soul Infinity astrology analysis and consultation follow-up access.',
  },
  '/privacy': {
    title: 'Privacy Policy',
    desc: 'Privacy policy describing how Soul Infinity handles personal details, birth data, and client communications.',
  },
};

const ZODIAC_META = {
  aries: { title: 'Mesha Rashi (Aries)', ruler: 'Mars' },
  taurus: { title: 'Vrishabha Rashi (Taurus)', ruler: 'Venus' },
  gemini: { title: 'Mithuna Rashi (Gemini)', ruler: 'Mercury' },
  cancer: { title: 'Karka Rashi (Cancer)', ruler: 'Moon' },
  leo: { title: 'Simha Rashi (Leo)', ruler: 'Sun' },
  virgo: { title: 'Kanya Rashi (Virgo)', ruler: 'Mercury' },
  libra: { title: 'Tula Rashi (Libra)', ruler: 'Venus' },
  scorpio: { title: 'Vrischika Rashi (Scorpio)', ruler: 'Mars' },
  sagittarius: { title: 'Dhanu Rashi (Sagittarius)', ruler: 'Jupiter' },
  capricorn: { title: 'Makara Rashi (Capricorn)', ruler: 'Saturn' },
  aquarius: { title: 'Kumbha Rashi (Aquarius)', ruler: 'Saturn' },
  pisces: { title: 'Meena Rashi (Pisces)', ruler: 'Jupiter' },
};

function routeMeta(route, blogManifest) {
  if (STATIC_META[route]) return STATIC_META[route];

  if (route.startsWith('/blog/')) {
    const slug = route.replace('/blog/', '');
    const blog = blogManifest[slug];
    if (blog) {
      return {
        title: blog.title,
        desc: blog.excerpt || `Article about ${titleCaseSlug(slug)} from Soul Infinity.`,
      };
    }
  }

  if (route.startsWith('/zodiac/')) {
    const slug = route.replace('/zodiac/', '');
    const info = ZODIAC_META[slug];
    if (info) {
      return {
        title: info.title,
        desc: `${info.title} guide covering personality, strengths, challenges, remedies, mantra, and house-wise effects in Vedic astrology. Ruled by ${info.ruler}.`,
      };
    }
  }

  return {
    title: titleCaseSlug(route.split('/').filter(Boolean).pop() || 'Home'),
    desc: `Reference page for ${route} on Soul Infinity.`,
  };
}

function formatLine(route, meta) {
  return `- [${meta.title}](${abs(route)}): ${meta.desc}`;
}

function sortBlogRoutes(routes, blogManifest) {
  return [...routes].sort((a, b) => {
    const aMeta = blogManifest[a.replace('/blog/', '')];
    const bMeta = blogManifest[b.replace('/blog/', '')];
    const aDate = aMeta?.date || aMeta?.publishedAt || '';
    const bDate = bMeta?.date || bMeta?.publishedAt || '';
    return bDate.localeCompare(aDate);
  });
}

async function main() {
  const publishedRoutes = ROUTES.filter((route) => route !== '/404');
  const blogManifest = JSON.parse(await fs.readFile(BLOG_MANIFEST_PATH, 'utf-8'));

  const sections = [
    {
      heading: 'About',
      routes: ['/', '/cosmic-guide'],
    },
    {
      heading: 'Services',
      routes: publishedRoutes.filter((route) => route === '/services' || route.startsWith('/services/')),
    },
    {
      heading: 'Learning Pages',
      routes: publishedRoutes.filter(
        (route) =>
          route === '/panchang' ||
          route === '/planets' ||
          route.startsWith('/planets/') ||
          route === '/zodiac' ||
          route.startsWith('/zodiac/') ||
          route === '/nakshatra/rohini' ||
          route === '/dosha' ||
          route.startsWith('/dosha/'),
      ),
    },
    {
      heading: 'Articles',
      routes: [
        '/blog',
        ...sortBlogRoutes(
          publishedRoutes.filter((route) => route.startsWith('/blog/') && route !== '/blog/mantra'),
          blogManifest,
        ),
      ],
    },
    {
      heading: 'Resources',
      routes: ['/blog/mantra', '/cosmic-podcast', '/gallery', '/gallery/remedies', '/gallery/pitra-dosh'],
    },
    {
      heading: 'Client Pages',
      routes: ['/contact', '/my-analysis', '/privacy'],
    },
  ];

  const missing = publishedRoutes.filter((route) => !sections.some((section) => section.routes.includes(route)));
  if (missing.length > 0) {
    console.warn(`[llms] routes missing from sections: ${missing.join(', ')}`);
  }

  const sectionBlocks = sections
    .map((section) => {
      const uniqueRoutes = [...new Set(section.routes)].filter((route) => publishedRoutes.includes(route));
      const lines = uniqueRoutes.map((route) => formatLine(route, routeMeta(route, blogManifest)));
      return `## ${section.heading}\n\n${lines.join('\n')}`;
    })
    .join('\n\n');

  const body = `# Soul Infinity\n
> Soul Infinity is a Vedic astrology, spiritual guidance, and healing practice based in Ahmedabad, Gujarat, India. The practice is led by Saurabh Jain, a certified astrologer trained in classical systems including Parashari Jyotish, Bhrigu Nandi Nadi, and KP Astrology.

## Overview

- Canonical site: ${SITE_URL}
- Last updated: ${UPDATED_ON}
- Coverage: ${publishedRoutes.length} published routes
- Founder: Saurabh Jain
- Credentials: Certified Professional Astrologer, K.N. Rao Institute; M.Tech, MBA, M.Phil
- Languages: English, Hindi, Gujarati
- Contact: +91 90790 53840 · soul.infinity.astro@gmail.com
- Location: Ahmedabad, Gujarat, India

## Key Facts

- Soul Infinity offers consultation paths across Vedic astrology, Western astrology, and healing.
- The service catalog includes Parashari Jyotish, BNN, KP Astrology, Astro Vastu, gemstone guidance, tarot, symbol analysis, past life regression, Reiki, Pranic Healing, Theta Healing, and Crystal Healing.
- The learning library covers planets, zodiac signs, doshas, nakshatras, blog articles, Panchang, mantras, and remedy-focused guidance.
- The site includes both public educational pages and a private client analysis portal.

${sectionBlocks}
`;

  await Promise.all(
    OUT_PATHS.map(async (outPath) => {
      await fs.mkdir(path.dirname(outPath), { recursive: true });
      await fs.writeFile(outPath, body, 'utf-8');
    }),
  );

  console.log(`Generated llms index for ${publishedRoutes.length} route(s) at ${OUT_PATHS.join(', ')}`);
}

main().catch((err) => {
  console.error('llms.txt generation failed:', err);
  process.exit(1);
});
