# Approved Icon and Doodle Sources for Soul Infinity

This document lists the ONLY approved sources for icons, doodles, and decorative SVGs used on Soul Infinity pillar pages. Do not use sources outside this list without Saurabh's approval.

## Priority hierarchy

1. **Open Doodles** — github.com/humaaans/open-doodles
   - License: CC0 (public domain, no attribution)
   - Use case: Hand-drawn illustrations, decorative accents
   - Download from repo, upload to R2 under /Pillar/<Category>/<Page>/

2. **Tabler Icons** — github.com/tabler/tabler-icons
   - License: MIT
   - Use case: UI icons, info chips, arrows, small decorative elements
   - Access: @tabler/icons-react npm package (installed)
   - Example: import { IconSun, IconFlame } from '@tabler/icons-react';

3. **SVGrepo** — svgrepo.com
   - License: Mostly CC0 or MIT (check each SVG)
   - Use case: Zodiac animals, spiritual symbols, planet glyphs, ethnic/cultural motifs
   - Workflow: Download SVG → verify license → upload to R2

4. **Heroicons** — github.com/tailwindlabs/heroicons
   - License: MIT
   - Use case: Standard UI icons (backup to Lucide)

5. **Lucide React** — already in project
   - License: ISC (MIT-equivalent)
   - Use case: Default for all standard icons

6. **Microsoft Doodle Ipsum** — github.com/microsoft/doodle-ipsum
   - License: MIT
   - Use case: Placeholder doodles during development

7. **Astronomy-assets** — github.com/ajlkn/astronomy-assets
   - Use case: Planet-specific decorative SVGs

## Usage rules

- Always check and comply with each SVG's individual license
- Prefer CC0 / MIT / ISC — avoid anything requiring attribution unless explicitly noted
- Store all downloaded SVGs on Cloudflare R2 under /Pillar/<Category>/<Page>/
- Never use paid stock icons unless Saurabh explicitly approves
- When in doubt, ask Saurabh
