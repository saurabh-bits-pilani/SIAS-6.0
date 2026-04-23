#!/usr/bin/env node
// Regenerate public/llms.txt — the short LLM-discovery manifest per
// llmstxt.org spec. Lists canonical URLs grouped by section so AI
// assistants can quickly map the site without scraping every page.
//
// Generated rather than hand-authored so it stays in sync with the
// canonical origin (VITE_SITE_URL) and the route list in prerender.mjs.

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ROUTES } from './prerender.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_PATH = path.resolve(__dirname, '..', 'public', 'llms.txt');

const SITE_URL =
  (process.env.VITE_SITE_URL || process.env.VITE_SITE_ORIGIN || 'https://soul-infinity-liard.vercel.app').replace(/\/$/, '');

function abs(route) {
  return route === '/' ? `${SITE_URL}/` : `${SITE_URL}${route}`;
}

/**
 * Per-route descriptor: short sentence describing the page's purpose.
 * Grouped into four sections per the llmstxt.org convention.
 */
const DESCRIPTIONS = {
  '/': 'Home — certified Vedic astrologer Saurabh Jain, 4.9★ rated in Ahmedabad.',
  '/cosmic-guide': 'About Saurabh Jain — credentials, methodology, and practice philosophy.',
  '/services': 'Overview of all 12 consultation services across Vedic, Western, and Healing categories.',
  '/services/vedic-astrology': 'Vedic astrology service category — Parashari, BNN, KP, Astro Vastu, Gemstones.',
  '/services/western-astrology': 'Western astrology service category — Tarot, Symbol Analysis, Past Life Regression.',
  '/services/healing': 'Spiritual healing service category — Reiki, Pranic, Theta, Crystal.',
  '/services/vedic-astrology/parashari-jyotish': 'Parashari Jyotish consultation — classical Vedic birth-chart analysis.',
  '/services/vedic-astrology/bnn': 'Bhrigu Nandi Nadi astrology — precise predictions from palm-leaf tradition.',
  '/services/vedic-astrology/kp-astrology': 'KP Astrology consultation — Krishnamurti Paddhati sub-lord method.',
  '/services/vedic-astrology/astro-vastu': 'Astro Vastu — birth-chart-informed home and office Vastu analysis.',
  '/services/vedic-astrology/gem-stone': 'Gemstone consultation — birth-chart-based recommendations.',
  '/services/western-astrology/tarot-card': 'Tarot Card Reading consultation.',
  '/services/western-astrology/symbol-analysis': 'Astrological Symbol Analysis consultation.',
  '/services/western-astrology/past-life-regression': 'Past Life Regression therapy.',
  '/services/healing/reiki': 'Reiki Healing session by a certified practitioner.',
  '/services/healing/pranic-healing': 'Pranic Healing session — energy cleansing and chakra work.',
  '/services/healing/theta-healing': 'Theta Healing session — deep meditative belief reprogramming.',
  '/services/healing/crystal-healing': 'Crystal Healing session — chakra balancing with crystal therapy.',
  '/cosmic-podcast': 'Cosmic Podcast — Vedic astrology and spiritual wisdom episodes.',
  '/blog': 'Blog index — articles on Vedic astrology, remedies, and spiritual growth.',
  '/blog/mantra': 'Navagraha mantras — meanings, benefits, and chanting methodology.',
  '/panchang': 'Today’s Panchang — Tithi, Nakshatra, Yoga, Karana, and muhurat timings.',
  '/planets': 'Planets — the nine planets (Navagraha) in Vedic astrology: Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, and Ketu. Learn each planet’s significance, signs ruled, exaltation, debilitation, and remedies.',
  '/planets/sun': 'Surya (Sun) — karaka of the soul, authority, and father. Mantras, 12-house significations, exaltation in Aries, debilitation in Libra, Ruby (Manikya) gemstone guidance, and six-year Mahadasha themes.',
  '/planets/moon': 'Chandra (Moon) — karaka of the mind, emotions, and mother. Mantras, 12-house significations, exaltation in Taurus, debilitation in Scorpio, Pearl (Moti) gemstone guidance, and ten-year Mahadasha themes.',
  '/zodiac': 'Zodiac Signs — the twelve zodiac signs (Rashi) in Vedic astrology: Aries through Pisces. Explore each sign’s ruling planet, element, nature, character traits, and life themes.',
  '/dosha': 'Doshas — common doshas in Vedic astrology: Mangal Dosha, Kaal Sarp Dosh, Sade Sati, Pitru Dosh, and Nadi Dosh. Understand what they mean, how they affect life, and their traditional remedies.',
  '/gallery': 'Photo gallery — consultations, healing sessions, and sacred spaces.',
  '/gallery/remedies': 'Vedic planetary remedies — mantras, gemstones, rituals.',
  '/gallery/pitra-dosh': 'Pitra Dosh — causes, symptoms, and Vedic remedies for ancestral karma.',
  '/contact': 'Contact — book a consultation via phone, WhatsApp, email, or visit in Ahmedabad.',
  '/privacy': 'Privacy policy.',
};

const SECTIONS = [
  {
    heading: 'About',
    routes: ['/', '/cosmic-guide'],
  },
  {
    heading: 'Services',
    routes: [
      '/services',
      '/services/vedic-astrology',
      '/services/vedic-astrology/parashari-jyotish',
      '/services/vedic-astrology/bnn',
      '/services/vedic-astrology/kp-astrology',
      '/services/vedic-astrology/astro-vastu',
      '/services/vedic-astrology/gem-stone',
      '/services/western-astrology',
      '/services/western-astrology/tarot-card',
      '/services/western-astrology/symbol-analysis',
      '/services/western-astrology/past-life-regression',
      '/services/healing',
      '/services/healing/reiki',
      '/services/healing/pranic-healing',
      '/services/healing/theta-healing',
      '/services/healing/crystal-healing',
    ],
  },
  {
    heading: 'Learn',
    routes: ['/planets', '/zodiac', '/dosha'],
  },
  {
    heading: 'Content',
    routes: [
      '/blog',
      '/blog/mantra',
      '/cosmic-podcast',
      '/panchang',
      '/gallery',
      '/gallery/remedies',
      '/gallery/pitra-dosh',
    ],
  },
  {
    heading: 'Contact',
    routes: ['/contact'],
  },
];

function routeLine(route) {
  const url = abs(route);
  const desc = DESCRIPTIONS[route] ?? '';
  const label = DESCRIPTIONS[route]?.split(' — ')[0] ?? route;
  return `- [${label}](${url}): ${desc}`;
}

async function main() {
  // Warn if any route from the canonical list is missing a description.
  const missing = ROUTES.filter((r) => r !== '/404' && !DESCRIPTIONS[r]);
  if (missing.length > 0) {
    console.warn(`[llms] missing DESCRIPTIONS for: ${missing.join(', ')}`);
  }

  const sectionBlocks = SECTIONS.map((section) => {
    const lines = section.routes
      .filter((r) => ROUTES.includes(r))
      .map(routeLine);
    return `## ${section.heading}\n\n${lines.join('\n')}`;
  });

  const body = `# Soul Infinity

> Vedic astrology, tarot, and spiritual healing practice in Ahmedabad, Gujarat, India. Founded by certified astrologer Saurabh Jain (K.N. Rao Institute; M.Tech, MBA, M.Phil). 4.9★ from 40 Google reviews.

${sectionBlocks.join('\n\n')}

## Metadata

- Location: Ahmedabad, Gujarat, India
- Founder: Saurabh Jain (Certified Professional Astrologer, K.N. Rao Institute)
- Contact: +91-9079053840 · soul.infinity.astro@gmail.com
- Languages: English, Hindi, Gujarati
- Canonical site: ${SITE_URL}
- Sitemap: ${SITE_URL}/sitemap.xml
`;

  await fs.writeFile(OUT_PATH, body, 'utf-8');
  console.log(`Generated public/llms.txt (${body.length} bytes, origin: ${SITE_URL})`);
}

main().catch((err) => {
  console.error('llms.txt generation failed:', err);
  process.exit(1);
});
