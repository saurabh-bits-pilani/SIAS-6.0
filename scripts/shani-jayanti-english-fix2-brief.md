# Shani Jayanti English Blog — Fix 2 Brief
# Branch: feature/blog-shani-jayanti (already exists)
# Task: Fix double hero + broken BlogTrustCTA layout + restructure to match zodiac page richness

---

## PROBLEMS TO FIX

1. DOUBLE HERO: BlogPost.tsx renders a dark navy hero (title, category pill, meta row).
   The MDX content also renders a second hero. These stack = two banners.
   Fix: The MDX must NOT contain any hero section. The BlogPost.tsx hero IS the hero.

2. BlogTrustCTA BROKEN LAYOUT: Text stacks in a narrow left column, right side is empty.
   Fix: Find BlogTrustCTA.tsx and ensure it uses flex-col on mobile, flex-row on md+,
   with content taking full width on mobile. No empty right half.

3. PAGE FEELS THIN: Compared to /zodiac/aries (the design benchmark), this blog page
   lacks visual richness. Cards need proper padding, icons need to show, sections need
   breathing room.

---

## STEP 1 — CHECKOUT BRANCH

```bash
git checkout feature/blog-shani-jayanti
git pull origin feature/blog-shani-jayanti
```

---

## STEP 2 — FIX DOUBLE HERO

Open content/blog/shani-jayanti-2026.mdx.

Check if there is ANY hero section, full-width image, or banner rendered at the top
of the MDX body (before TLDRAside). If yes, DELETE IT entirely.

The BlogPost.tsx already renders:
- Category pill
- Title (Caveat font, large)
- Excerpt
- Date / read time / author meta row
- Hero image (full bleed)

The MDX must start with <TLDRAside> and nothing before it.

Also check: does the MDX import or use any component that renders a full-width banner
or image at the top? If yes, remove that component usage.

---

## STEP 3 — FIX BlogTrustCTA LAYOUT

Open src/components/blog/BlogTrustCTA.tsx.

Current broken pattern (likely):
```
flex flex-row  (no mobile breakpoint)
```

Fix to:
```tsx
<div className="flex flex-col md:flex-row items-start md:items-center gap-6 p-6 md:p-8 bg-blog-navy rounded-2xl">
  <div className="flex-1">
    <h3 className="font-caveat text-2xl md:text-3xl text-blog-gold mb-3">{heading}</h3>
    <p className="font-poppins text-sm md:text-base text-white/80 mb-4">{body}</p>
    <a
      href={ctaHref}
      className="inline-flex items-center gap-2 bg-blog-gold hover:bg-blog-gold-bright text-blog-navy font-poppins font-semibold text-sm px-6 py-3 rounded-full transition-colors"
    >
      {ctaText}
      <ArrowRight className="w-4 h-4" />
    </a>
  </div>
</div>
```

Key rules:
- flex-col on mobile, flex-row on md+
- heading, body, and button all inside a flex-1 div
- No empty right column unless there is actual content to put there
- Background: bg-blog-navy (#0E1A36)
- Button: bg-blog-gold text-blog-navy rounded-full

---

## STEP 4 — VERIFY SECTION STRUCTURE IN MDX

The MDX must follow this exact order (matching zodiac page richness):

1. (NO hero — BlogPost.tsx handles it)
2. TLDRAside — short summary block
3. H2 + prose — "Who is Lord Shani in Vedic Astrology"
4. SanskritVerseCard — the shloka
5. H2 + prose — "What is Shani Jayanti"
6. InsightCallout — 2026 Saturday coincidence note
7. H2 + WhatFollowsCards — 4 cards (why it matters for your chart)
8. H2 + WhatToExpectSection — 7 ritual steps
9. H2 + RedFlagsSection — 6 don'ts
10. AuthorCallout — Saurabh's note
11. BlogTrustCTA — consultation CTA
12. FAQSection — 5 FAQs

If the current MDX matches this order, no change needed.
If it does not match (has extra sections, wrong order, or missing sections), reorder it.

---

## STEP 5 — CHECK ICON RENDERING IN WhatFollowsCards

Open src/components/blog/WhatFollowsCards.tsx.

The cards receive icon as a string prop ("Shield", "Clock", "Star", "Sunrise").
Verify the component resolves these string names to actual lucide-react icons.

If the component expects JSX (icon as React.ReactNode) but the MDX passes a string,
that is why icons are blank. Fix one of two ways:

Option A — Change WhatFollowsCards to accept string icon names and resolve them:
```tsx
import { Shield, Clock, Star, Sunrise, Heart, MapPin, Moon, BookOpen, Music, Droplets, Flame } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Shield, Clock, Star, Sunrise, Heart, MapPin, Moon, BookOpen, Music, Droplets, Flame
};

// In render:
const IconComponent = iconMap[icon] || Star;
<IconComponent className="w-6 h-6 text-blog-gold" />
```

Option B — If the component already accepts JSX, update the MDX to pass JSX.
But do NOT import lucide icons directly in MDX (causes duplicate binding errors).
In that case, wrap icon resolution inside the component only.

Use whichever option matches the existing component pattern. Do not change the
component's interface if other MDX files already use it correctly.

---

## STEP 6 — CHECK PADDING AND SPACING

Open src/pages/BlogPost.tsx (or whatever wraps the MDX content area).

The article body must have:
```
max-w-3xl mx-auto px-4 md:px-8 lg:px-0
```

If it has no horizontal padding on mobile, add px-4 as minimum.

Each major section (WhatToExpectSection, RedFlagsSection, WhatFollowsCards) must
have py-10 md:py-16 as section padding. Check these components and add if missing.

---

## STEP 7 — VALIDATION GATES

```bash
# No em-dashes
grep -n "—" content/blog/shani-jayanti-2026.mdx  # must be empty

# Build passes
npm run build

# Schemas present
grep -c '"@type":"BlogPosting"' dist/blog/shani-jayanti-2026/index.html  # >= 1
grep -c '"@type":"FAQPage"' dist/blog/shani-jayanti-2026/index.html  # >= 1

# No second hero (no duplicate hero image tag in the MDX output)
# Visually verify on local dev server: http://localhost:5173/blog/shani-jayanti-2026
# Confirm: only ONE hero image visible at top, not two
```

---

## STEP 8 — COMMIT AND PUSH

```bash
git add -A
git commit -m "fix(blog): remove double hero, fix BlogTrustCTA layout, fix icon rendering and padding"
git push origin feature/blog-shani-jayanti
```

Stop here. Do NOT merge to staging yet.
Write status to scripts/shani-jayanti-fix2-status.md and report.

---

## STATUS FILE

Write scripts/shani-jayanti-fix2-status.md with:
- HEAD SHA after commit
- Which of the 4 problems were found and fixed
- Build result
- Validation gate results
- Screenshot instructions: "Check /blog/shani-jayanti-2026 locally — single hero, cards visible, CTA full width"

---

## STOP CONDITIONS

- Build failure: stop, write error to status file
- Any validation gate failure: stop, report
- Cannot determine how WhatFollowsCards resolves icons: stop and report, do not guess

---

## END OF BRIEF
