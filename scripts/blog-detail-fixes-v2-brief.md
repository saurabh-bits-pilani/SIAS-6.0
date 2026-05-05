Wrap the existing <Content /> render in <MDXProvider components={mdxComponents}><Content /></MDXProvider>. This makes the components available to MDX files using JSX syntax like `<WeakSignalsGrid title="..." items={[...]} />`.

Verify @mdx-js/react is in package.json dependencies. If yes, no install needed (it's already there per earlier recon — confirm). If no, npm install @mdx-js/react.

#### MDX content rewrite

Rewrite content/blog/finding-a-vedic-astrologer-in-ahmedabad.mdx — ONLY the section between the hero excerpt and the "What credentials should a Vedic astrologer have?" H2 heading. Keep all frontmatter unchanged. Keep everything from "What credentials should a Vedic astrologer have?" onward unchanged (that's standard prose, the typography theme styles it).

Replace the current intro paragraphs (the section starting with "Ahmedabad has hundreds of practising astrologers" through "...what a genuine consultation should actually feel like.") with this MDX block:

```mdx
import { MapPin, Wallet, Users, Landmark, ClipboardList, MessageCircle, AlertTriangle, Eye } from 'lucide-react';

## Why this guide exists

Ahmedabad has hundreds of practising astrologers. They appear in newspaper ads, in WhatsApp forwards from cousins, on neighbourhood pamphlets, in online directories, and increasingly on social media reels. The choice is not the problem. The choice criteria are.

<WeakSignalsGrid
  title="Most people pick an astrologer on three weak signals"
  items={[
    {
      icon: MapPin,
      title: "How close",
      description: "Convenience often mistaken for credibility."
    },
    {
      icon: Wallet,
      title: "How affordable",
      description: "Low fee doesn't always mean high value."
    },
    {
      icon: Users,
      title: "Whether a relative recommended someone",
      description: "Reputation by relation, not by result."
    }
  ]}
/>

These feel sensible, and they are how most service decisions get made. They are also why so many people walk out of a Vedic astrology consultation feeling that they were told either generic horoscope content dressed up in Sanskrit, or a frightening list of doshas (afflictions) that conveniently require expensive remedies to resolve.

<AuthorCallout
  title="This guide is written by someone trained at the school of Jyotish"
  body="The Sanskrit name for Vedic astrology, literally 'science of light', established under the late Shri K.N. Rao, founder of the {LINK} in New Delhi."
  linkText="Bharatiya Vidya Bhavan school of astrology"
  linkUrl="https://bvbdelhi.org"
/>

<SanskritVerseCard
  sanskrit={"तमसो मा ज्योतिर्गमय।\nमृत्योर्मा अमृतं गमय॥"}
  iast="Tamaso mā jyotirgamaya. Mṛtyormā amṛtaṃ gamaya."
  translation="Lead me from darkness to light. Lead me from the transient to the eternal."
/>

<InsightCallout
  icon={Eye}
  text="It is not a sales document. The criteria below apply equally to anyone you might consult, including practitioners at other recognised institutes, and including practitioners we have never heard of who happen to be excellent. The point is that the criteria are knowable, and that applying them filters out most of the disappointment people report after their first three or four readings."
/>

<WhatFollowsCards
  title="What follows"
  items={[
    {
      icon: ClipboardList,
      title: "Checklist a careful consultation seeker should apply",
      description: "Concrete criteria you can verify before booking."
    },
    {
      icon: MessageCircle,
      title: "Questions worth asking before booking",
      description: "What good answers sound like and why they matter."
    },
    {
      icon: AlertTriangle,
      title: "Warning signs worth respecting",
      description: "Patterns that consistently lead to disappointing readings."
    },
    {
      icon: Landmark,
      title: "A clear picture of what a genuine consultation should actually feel like",
      description: "From birth detail gathering to final follow-up."
    }
  ]}
/>
```

Note: in the AuthorCallout body, the {LINK} placeholder gets replaced by the linkText prop rendered as an inline anchor inside the AuthorCallout component itself. Implement this in AuthorCallout.tsx by splitting the body string on {LINK} and inserting the anchor between the parts.

After this MDX block, the next section "## What credentials should a Vedic astrologer have?" continues unchanged from the existing file.

## Validation gates

1. npm run build → green
2. Prerender count = 42 (unchanged)
3. /blog/finding-a-vedic-astrologer-in-ahmedabad/index.html in dist contains:
   - Schema markup unchanged (BlogPosting + FAQPage + Person all present)
   - The new heading "Why this guide exists" rendered
   - The first WeakSignalsGrid items text rendered ("How close", "How affordable", etc.)
   - The Sanskrit verse rendered (Devanagari text present)
   - The "What follows" card titles rendered
4. grep -n "—" content/blog/finding-a-vedic-astrologer-in-ahmedabad.mdx → empty
5. grep -rn "—" src/ → empty
6. Each new component file in src/components/blog/ has zero em-dashes (grep)
7. Hero image full-bleed: in dist HTML, the hero img tag must have src pointing at hero-banner-v2.webp, and the section element must NOT have a separate right-column hero img (only one hero image in the hero section)
8. Caveat font: verify the H1 className is font-caveat (search the prerendered HTML for class="font-caveat" near the H1)
9. No regressions on /, /services, /planets/jupiter, /zodiac/aries, /blog (Blog.tsx untouched)

## Visual gates (require Vercel preview)

- Hero: full-bleed image with portrait visible on right, dark gradient overlay on left, all text readable, breadcrumb + pill + title + excerpt + meta row visible on left side
- Title in Caveat font, larger size to compensate for narrower glyphs
- Below hero: "Why this guide exists" intro section now rendering as visual blocks
- WeakSignalsGrid: 3 columns on desktop with icon circles, 1 column on mobile
- AuthorCallout: dark navy block with Caveat title and gold link
- SanskritVerseCard: cream parchment card with centered Devanagari, IAST, translation
- InsightCallout: cream callout with gold left border and icon
- WhatFollowsCards: 4 navy cards with gold icon circles
- All components responsive at 375px width
- Console: no React warnings about missing keys or invalid props

## Commit + PR

Single commit on feature/blog-detail-fixes-v2 (or a follow-up commit on feature/blog-detail-redesign — your call based on whether PR #3 has been merged or is still open):

Commit message:
"feat(blog): full-bleed hero, Caveat title, magazine intro components

- Switch hero to full-bleed background image with gradient overlay
- Replace Sacramento with Caveat for all blog page script headings
- Add 5 new blog MDX components (WeakSignalsGrid, AuthorCallout, SanskritVerseCard, InsightCallout, WhatFollowsCards)
- Wire MDXProvider with components map in BlogPost.tsx
- Rewrite Ahmedabad post intro section to use the new components"

Push, open PR against staging. If PR #3 is still open, this PR stacks on top of it. If PR #3 is already merged, this PR targets staging directly.

Stop after Vercel preview URL is captured. Do not merge.

## Status report

Write scripts/blog-detail-fixes-v2-status.md with:
1. Hero refactor: lines changed in BlogPost.tsx, before/after screenshots if possible
2. Caveat font swap: list of every place font-sacramento was replaced
3. New components: 5 file paths with line counts
4. MDX content rewrite: lines added/removed in the .mdx file
5. Build gate results (1 through 9 above)
6. Vercel preview URL
7. Follow-ups: any rough edges, deferred polish, future iteration ideas