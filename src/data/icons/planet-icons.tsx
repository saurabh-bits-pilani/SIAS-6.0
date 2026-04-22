import {
  Sun,
  Flame,
  // TODO: Swap CircleDot for `Mars` once lucide-react is bumped past the
  // version that introduced it (not present in 0.344.0 — currently in the
  // project). Upgrading lucide-react is deferred because 17 source files
  // import from it and major bumps rename commonly-used icons. When bumped,
  // replace CircleDot below with `Mars` and delete this TODO.
  CircleDot,
  Gem,
  Calendar,
  Sparkles,
  Crown,
  ArrowUp,
  ArrowDown,
  Compass,
  Circle,
  CheckCircle2,
  Sunrise,
  Droplets,
  Heart,
  type LucideIcon,
} from 'lucide-react';

/**
 * Central icon map for pillar pages (planets, zodiac, doshas).
 *
 * Any pillar page that renders a labelled attribute should look it up here
 * so swapping an icon later is a single-line change rather than hunting
 * across 29 pages. Keys are semantic ("represents", "exalted") rather than
 * cosmetic so the same map can be reused across Sun, Moon, Mars, etc.
 *
 * NOTE: Earlier placeholder SVGs at /Pillar/Planets/Sun/icon-*.svg (uploaded
 * to R2 during the asset pass) are now unused — Lucide icons are preferred
 * for the labelled rows. Those R2 objects can be safely deleted once all 29
 * pillar pages have been rebuilt against this map and nothing still
 * references the old URLs.
 */
export const PLANET_ICONS: Readonly<Record<string, LucideIcon>> = {
  planet: Sun,
  element: Flame,
  nature: CircleDot,
  metal: Gem,
  day: Calendar,
  represents: Sparkles,
  governs: Crown,
  exalted: ArrowUp,
  debilitated: ArrowDown,
  direction: Compass,
  symbol: Circle,
  check: CheckCircle2,
  sunrise: Sunrise,
  water: Droplets,
  heart: Heart,
};

export type PlanetIconKey = keyof typeof PLANET_ICONS;
