/**
 * Canonical metadata for the 9 Navagraha pillar pages on /planets/*.
 *
 * Single source of truth for:
 *   - SEO H1 phrasing (visible <h1> + JSON-LD Article headline)
 *   - Cross-link labels rendered in the "Explore Other Grahas" section
 *   - Per-planet accent color used by cross-link chips
 *
 * Order matches Vedic week-day sequence: Sun, Moon, Mars, Mercury, Jupiter,
 * Venus, Saturn, then the lunar nodes Rahu, Ketu.
 */

export type PlanetSlug =
  | 'sun'
  | 'moon'
  | 'mars'
  | 'mercury'
  | 'jupiter'
  | 'venus'
  | 'saturn'
  | 'rahu'
  | 'ketu';

export interface PlanetPillar {
  slug: PlanetSlug;
  /** English planet name. */
  english: string;
  /** Sanskrit / classical name. */
  sanskrit: string;
  /** Cross-link label, e.g. "Saturn (Shani)". */
  crossLabel: string;
  /** Full SEO H1 phrase. */
  h1: string;
  /** First half of H1, before the colon. Renders as the big hero line. */
  h1Lead: string;
  /** Second half of H1, after the colon. Renders as the smaller subline. */
  h1Sub: string;
  /** Hex accent color for the cross-link chip border + hover tint. */
  accent: string;
}

export const PLANET_PILLARS: readonly PlanetPillar[] = [
  {
    slug: 'sun',
    english: 'Sun',
    sanskrit: 'Surya',
    crossLabel: 'Sun (Surya)',
    h1: "Sun in Vedic Astrology: Surya's Power, Significance and Remedies",
    h1Lead: 'Sun in Vedic Astrology',
    h1Sub: "Surya's Power, Significance and Remedies",
    accent: '#facc15',
  },
  {
    slug: 'moon',
    english: 'Moon',
    sanskrit: 'Chandra',
    crossLabel: 'Moon (Chandra)',
    h1: "Moon in Vedic Astrology: Chandra's Influence on Mind and Emotions",
    h1Lead: 'Moon in Vedic Astrology',
    h1Sub: "Chandra's Influence on Mind and Emotions",
    accent: '#c0c0c0',
  },
  {
    slug: 'mars',
    english: 'Mars',
    sanskrit: 'Mangal',
    crossLabel: 'Mars (Mangal)',
    h1: "Mars in Vedic Astrology: Mangal's Energy, Courage and Effects",
    h1Lead: 'Mars in Vedic Astrology',
    h1Sub: "Mangal's Energy, Courage and Effects",
    accent: '#ef4444',
  },
  {
    slug: 'mercury',
    english: 'Mercury',
    sanskrit: 'Budha',
    crossLabel: 'Mercury (Budha)',
    h1: "Mercury in Vedic Astrology: Budha's Role in Intelligence and Communication",
    h1Lead: 'Mercury in Vedic Astrology',
    h1Sub: "Budha's Role in Intelligence and Communication",
    accent: '#4ade80',
  },
  {
    slug: 'jupiter',
    english: 'Jupiter',
    sanskrit: 'Guru',
    crossLabel: 'Jupiter (Guru)',
    h1: "Jupiter in Vedic Astrology: Guru's Blessings, Wisdom and Significance",
    h1Lead: 'Jupiter in Vedic Astrology',
    h1Sub: "Guru's Blessings, Wisdom and Significance",
    accent: '#fcd34d',
  },
  {
    slug: 'venus',
    english: 'Venus',
    sanskrit: 'Shukra',
    crossLabel: 'Venus (Shukra)',
    h1: "Venus in Vedic Astrology: Shukra's Influence on Love and Prosperity",
    h1Lead: 'Venus in Vedic Astrology',
    h1Sub: "Shukra's Influence on Love and Prosperity",
    accent: '#fbcfe8',
  },
  {
    slug: 'saturn',
    english: 'Saturn',
    sanskrit: 'Shani',
    crossLabel: 'Saturn (Shani)',
    h1: "Saturn in Vedic Astrology: Shani's Lessons, Effects and Remedies",
    h1Lead: 'Saturn in Vedic Astrology',
    h1Sub: "Shani's Lessons, Effects and Remedies",
    accent: '#a5b4fc',
  },
  {
    slug: 'rahu',
    english: 'Rahu',
    sanskrit: 'Rahu',
    crossLabel: 'Rahu (North Node)',
    h1: 'Rahu in Vedic Astrology: Effects, Obsessions and Karmic Lessons',
    h1Lead: 'Rahu in Vedic Astrology',
    h1Sub: 'Effects, Obsessions and Karmic Lessons',
    accent: '#c4b5fd',
  },
  {
    slug: 'ketu',
    english: 'Ketu',
    sanskrit: 'Ketu',
    crossLabel: 'Ketu (South Node)',
    h1: 'Ketu in Vedic Astrology: Spirituality, Detachment and Moksha',
    h1Lead: 'Ketu in Vedic Astrology',
    h1Sub: 'Spirituality, Detachment and Moksha',
    accent: '#d1d5db',
  },
];

const PILLARS_BY_SLUG: Record<PlanetSlug, PlanetPillar> = PLANET_PILLARS.reduce(
  (acc, pillar) => {
    acc[pillar.slug] = pillar;
    return acc;
  },
  {} as Record<PlanetSlug, PlanetPillar>,
);

export function getPlanetPillar(slug: PlanetSlug): PlanetPillar {
  return PILLARS_BY_SLUG[slug];
}

/** The 8 sibling pillars used by the "Explore Other Grahas" section. */
export function getOtherPlanetPillars(currentSlug: PlanetSlug): readonly PlanetPillar[] {
  return PLANET_PILLARS.filter((pillar) => pillar.slug !== currentSlug);
}
