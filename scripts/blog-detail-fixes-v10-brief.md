# Blog Detail Fixes v10 — WhatToExpectSection magazine component

Branch off latest origin/main (whatever main is at execution time). New branch: feature/blog-detail-fixes-v10. Target staging. Single clean PR off main, NOT stacked.

Autonomous. Halt only on hard build failures. Status doc: scripts/blog-detail-fixes-v10-status.md.

## v10 goal

Replace the prose-only "What to expect in a genuine Jyotish consultation" section in the Ahmedabad blog post with a magazine-style component matching the approved mockup: handwritten title block with sun divider, intro callout with lotus icon, five numbered step cards (each with circular icon, number badge, title, body, vertical dotted connector between cards), closing footer banner with diya/lamp icon and gold highlight line.

## v10 component to build

### File: src/components/blog/WhatToExpectSection.tsx

Self-contained, props-driven, no internal state.

Props:
- titleLine1: string (e.g. "What to expect in a")
- titleLine2: string (e.g. "genuine Jyotish consultation")
- introIcon: LucideIcon (e.g. Flower2 — for lotus)
- introBody: string (the opening paragraph about Vedic consultation having structure)
- introHighlight: string (the bold "The shape is roughly as follows." line)
- items: array of:
  {
    number: string,
    icon: LucideIcon,
    title: string,
    body: string
  }
- footerIcon: LucideIcon (e.g. Flame for diya)
- footerLine1: string (e.g. "Structure brings clarity. Clarity brings confidence.")
- footerLine2: string (e.g. "That is the difference a genuine Jyotish consultation makes.")

### v10 layout

Outer wrapper: section className my-12 md:my-16 relative overflow-hidden.

Decorative motifs (low-opacity, pointer-events-none):
- Top-right zodiac wheel/sun motif: w-32 h-32 absolute top-4 right-4 text-blog-gold/10 (use Sun lucide or Flower2)
- Bottom-left lotus: Flower2 lucide w-24 h-24 absolute bottom-4 left-4 text-blog-gold/10

Title block (centered, mb-10):
- Top sparkle: Sparkles lucide w-4 h-4 mx-auto text-blog-gold mb-3
- titleLine1: font-poppins font-bold text-3xl md:text-5xl text-blog-ink text-center
- titleLine2: font-caveat italic text-3xl md:text-5xl text-blog-gold text-center mt-1, with two Sparkles lucide flanking left and right at w-5 h-5 text-blog-gold (use a flex container with title centered and sparkles either side)
- Sun divider below: flex items-center justify-center gap-4 mt-4
  - h-px w-16 bg-blog-gold/40
  - Sun lucide w-4 h-4 text-blog-gold
  - h-px w-16 bg-blog-gold/40

Intro callout:
- bg-blog-cream-soft border border-blog-gold/30 rounded-2xl p-5 md:p-6 mb-8 flex items-start gap-4 relative overflow-hidden
- Icon circle (left): w-14 h-14 flex-shrink-0 bg-blog-gold rounded-full flex items-center justify-center
  - introIcon inside, w-7 h-7 text-white
- Content (flex-1):
  - introBody: font-poppins text-blog-ink/85 text-base md:text-lg leading-relaxed
  - introHighlight: font-poppins font-semibold text-blog-ink text-base md:text-lg leading-relaxed mt-1 (block element on next line)

Numbered step cards:

Container: space-y-5

Each card: bg-blog-cream-soft border border-blog-gold/25 rounded-2xl p-5 md:p-6 flex items-start gap-5 md:gap-6 relative

LEFT column (icon, fixed width):
- w-16 md:w-20 flex-shrink-0 flex flex-col items-center
- Icon circle: w-14 h-14 md:w-16 md:h-16 bg-blog-cream rounded-full flex items-center justify-center border border-blog-gold/30
  - Card icon inside, w-7 h-7 md:w-8 md:h-8 text-blog-navy
- Vertical dotted divider below circle (only for non-last items): mt-3 w-px flex-1 border-l border-dashed border-blog-gold/40 min-h-[40px]

RIGHT column (content, flex-1, space-y-3):
- Number badge row: flex items-center gap-2 mb-1
  - Badge: w-9 h-9 rounded-full bg-blog-cream border-2 border-blog-gold flex items-center justify-center
  - Number text: font-poppins font-bold text-blog-gold text-sm
- Title: font-poppins font-bold text-blog-ink text-lg md:text-2xl leading-tight
- Body: font-poppins text-blog-ink/80 text-sm md:text-base leading-relaxed

Footer banner:
- mt-10 bg-blog-cream-soft border border-blog-gold/30 rounded-2xl p-5 md:p-6 flex items-start gap-4 relative overflow-hidden
- Decorative sparkle/swirl bottom-right (small inline SVG flourish OR Sparkles lucide w-5 h-5 text-blog-gold/40 absolute bottom-3 right-4)
- Icon circle (left): w-12 h-12 md:w-14 md:h-14 flex-shrink-0 bg-blog-gold rounded-full flex items-center justify-center
  - footerIcon inside, w-6 h-6 md:w-7 md:h-7 text-white
- Text block (flex-1):
  - footerLine1: font-poppins text-blog-ink/85 text-base md:text-lg leading-relaxed
  - footerLine2: font-poppins text-blog-gold font-semibold text-base md:text-lg leading-relaxed mt-1

## v10 wiring

In src/pages/BlogPost.tsx (or MdxBlogComponents registry file if that exists):
- Add WhatToExpectSection import
- Add WhatToExpectSection to the mdxComponents map alongside the existing components

## v10 MDX content rewrite

Edit content/blog/finding-a-vedic-astrologer-in-ahmedabad.mdx.

Find the existing "## What to expect" section (the H2 contains the words "What to expect"; full text may be "## What to expect in a genuine Jyotish consultation" or similar). The section currently contains plain prose describing the consultation flow.

Replace the entire section (from the H2 heading through the last paragraph before the next H2) with this MDX:

```mdx
import { Calendar as CalendarIconV10, Compass, Moon as MoonIconV10, Orbit, MessageCircle, Flower2, Flame } from 'lucide-react';

<WhatToExpectSection
  titleLine1="What to expect in a"
  titleLine2="genuine Jyotish consultation"
  introIcon={Flower2}
  introBody="A real Vedic consultation has structure. It is not a monologue, and it is not a tarot-style spread of vague themes."
  introHighlight="The shape is roughly as follows."
  items={[
    {
      number: "01",
      icon: CalendarIconV10,
      title: "It begins with birth detail collection: date, time, and place.",
      body: "Birth time matters down to the minute because it determines your Lagna (the rising sign at the moment of birth), which changes roughly every two hours and is the foundation of the entire chart. If your recorded birth time is uncertain, a trained astrologer can offer birth time rectification by working backwards from major past life events to narrow down the correct minute."
    },
    {
      number: "02",
      icon: Compass,
      title: "The astrologer then casts the chart and verifies it against your reported events.",
      body: "This step is often skipped by less rigorous practitioners. A good reader will quietly check that the dasha periods of your past line up with what actually happened, and will adjust the time if the chart is inconsistent."
    },
    {
      number: "03",
      icon: MoonIconV10,
      title: "The reading proper usually moves through your Lagna, then your Rashi",
      body: "(the Moon sign), then your Nakshatra (the lunar mansion, of which there are 27, each with its own qualities). After the natal foundation, the practitioner walks through the relevant divisional charts: D9 Navamsa for marriage and dharmic life direction, D10 Dasamsa for career and public reputation, and others depending on what you want to discuss."
    },
    {
      number: "04",
      icon: Orbit,
      title: "Only then does the conversation move to the current Mahadasha",
      body: "(the major planetary period running, which can last from six to twenty years) and Antardasha (the sub-period within it). This is where prediction becomes useful, because it grounds general chart themes in a specific timing window."
    },
    {
      number: "05",
      icon: MessageCircle,
      title: "A real consultation is a dialogue.",
      body: "You should be asking questions throughout, and the astrologer should be answering them in terms of specific houses, lords, aspects, and dasha periods rather than in vague themes. Most first consultations run 60 to 90 minutes, and most reputable practitioners send you a recording, a brief written summary, or the chart file so you can refer back to it."
    }
  ]}
  footerIcon={Flame}
  footerLine1="Structure brings clarity. Clarity brings confidence."
  footerLine2="That is the difference a genuine Jyotish consultation makes."
/>
```

Notes on lucide imports:
- Calendar and Moon aliased to V10-suffixed names to avoid shadowing existing imports.
- Compass, Orbit, MessageCircle, Flower2, Flame should all exist in lucide-react. If any do not exist, fallback list:
  - Orbit → Globe
  - Flame → Sun
  Surface any fallback used in status doc.

After this MDX block, the next H2 continues unchanged.

## v10 steps

1. git fetch origin && git checkout main && git pull origin main
2. Create branch feature/blog-detail-fixes-v10 off main
3. Build the WhatToExpectSection component file
4. Wire into mdxComponents map
5. Rewrite the MDX section
6. npm run build → must be green
7. Validation gates:
   - Prerender count = 42
   - dist HTML for the post contains:
     - "What to expect in a" rendered ONCE
     - "genuine Jyotish consultation" rendered ≥ 1 (may also appear in prose elsewhere — verify by visual inspection if count is 2)
     - "It begins with birth detail collection" rendered ONCE
     - "The astrologer then casts the chart" rendered ONCE
     - "The reading proper usually moves through your Lagna" rendered ONCE
     - "Only then does the conversation move to the current Mahadasha" rendered ONCE
     - "A real consultation is a dialogue" rendered ONCE
     - "Structure brings clarity. Clarity brings confidence." rendered ONCE
     - "That is the difference a genuine Jyotish consultation makes." rendered ONCE
   - All schemas preserved (BlogPosting, FAQPage, Person — 1 each)
   - grep -n "—" content/blog/finding-a-vedic-astrologer-in-ahmedabad.mdx → empty
   - grep -rn "—" src/ → empty
   - grep -rn "—" src/components/blog/WhatToExpectSection.tsx → empty
   - /, /services, /planets/jupiter, /zodiac/aries, /blog all render without regression
8. Single commit:
   "feat(blog): add WhatToExpectSection magazine component"
   Body: "Build WhatToExpectSection with title block, intro callout, 5 numbered step cards with vertical dotted connectors, footer banner. Replace prose 'what to expect' section in Ahmedabad post with the new component."
9. Push: git push -u origin feature/blog-detail-fixes-v10
10. PR: gh pr create --base staging --head feature/blog-detail-fixes-v10 --title "feat(blog): WhatToExpectSection magazine component"
11. Wait for Vercel preview build, capture URL
12. Merge PR to staging: gh pr merge <number> --merge --delete-branch=false
13. Sleep 90s, verify staging Vercel deployment success
14. Open staging-to-main PR: gh pr create --base main --head staging --title "Promote v10: WhatToExpectSection magazine component"
15. Merge staging-to-main PR: gh pr merge <new number> --merge --delete-branch=false
16. Sleep 90s, verify production Vercel deployment success
17. curl -s https://www.soulinfinity.space/blog/finding-a-vedic-astrologer-in-ahmedabad | grep -c "It begins with birth detail collection" → must be ≥ 1 (the new component is live)
18. Write scripts/blog-detail-fixes-v10-status.md with merge commit hashes, deployment timestamps, validation results, list of any lucide icon fallbacks used.
19. STOP. Report v10 completion.

## Failure protocol

Any merge conflict → STOP, report which PR and the conflict, do not force-merge.
Any Vercel deployment failure → STOP, capture error, do not proceed.
Any validation gate fail → STOP, write failure to status doc, do not proceed.
Any em-dash check fail → STOP, fix em-dash, re-run gates, do not commit until clean.