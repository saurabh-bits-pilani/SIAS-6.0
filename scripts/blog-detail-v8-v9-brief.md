# Blog Detail v8 + v9 — Two Clean Sequential PRs

Production is live with PRs #3-#7 + v6 + v7 merged. Two more section redesigns to ship.

Run as TWO separate sequential cycles. Each cycle is a clean off-main branch, single-purpose PR, staging promote, main promote. NO stacking.

Autonomous mode. Halt only on hard build failures. Status docs:
- v8: scripts/blog-detail-fixes-v8-status.md
- v9: scripts/blog-detail-fixes-v9-status.md

After each cycle finishes its main promote, REPORT BACK to Saurabh and STOP. Do NOT auto-start the next cycle. Saurabh will say "proceed to v9" before v9 begins.

==================================================================
CYCLE 1 — v8: RedFlagsSection magazine component
==================================================================

## v8 goal

Replace the prose-only "Red flags: what to avoid when choosing an astrologer in Ahmedabad" section in the Ahmedabad blog post with a magazine-style component matching the approved mockup: red flag header pill, intro callout with shield icon, six numbered red-flag cards (each with circular icon, number badge, title, body, small alert indicator on the right), reassuring closing callout with shield/check icon and lotus motif.

## v8 component to build

### File: src/components/blog/RedFlagsSection.tsx

Self-contained, props-driven, no internal state.

Props:
- titleLine1: string (e.g. "Red Flags: What to avoid when")
- titleLine2: string (e.g. "choosing an astrologer in Ahmedabad")
- introIcon: LucideIcon (e.g. ShieldAlert)
- introTitle: string (e.g. "This is the most important section of the guide.")
- introBody: string (e.g. "Treat it as protective consumer guidance, not criticism of any specific practitioner.")
- items: array of:
  {
    number: string,
    icon: LucideIcon,
    title: string,
    body: string
  }
- closingIcon: LucideIcon (e.g. ShieldCheck)
- closingLine1: string (e.g. "A good astrologer empowers you with clarity, not fear.")
- closingLine2: string (e.g. "Choose wisdom over worry.")

### v8 layout

Outer wrapper: section className my-12 md:my-16 relative overflow-hidden.

Decorative motifs (low-opacity, pointer-events-none):
- Top-right: zodiac wheel/mandala icon, w-32 h-32 absolute top-4 right-4 text-blog-gold/10
- Bottom-left: small lotus, w-24 h-24 absolute bottom-4 left-4 text-blog-gold/10

Title block (mb-8):
- Top-left FLAG accent: a small div with rounded badge containing a Flag lucide icon
  - inline-flex items-center gap-2 mb-2 (left-aligned, NOT centered)
  - bg-red-50 border border-red-200 rounded-full px-3 py-1
  - Flag lucide w-4 h-4 text-red-600
  - Optional small label "Important" inside the pill, font-poppins text-xs font-semibold text-red-700
- Title row: flex items-center gap-3 (left-aligned)
  - h2 className "font-poppins font-bold text-2xl md:text-4xl"
  - First word "Red Flags:" wrapped in text-red-600
  - Rest of title text in text-blog-ink
  - Render as: titleLine1 then a line break then titleLine2 (use <br/> inside the h2 if both lines provided, OR render two separate spans)

Intro callout:
- bg-blog-cream-soft border border-blog-gold/30 rounded-2xl p-5 mb-8 flex items-start gap-4
- Icon circle: w-12 h-12 flex-shrink-0 bg-blog-gold/15 rounded-full flex items-center justify-center
  - introIcon inside, w-6 h-6 text-blog-gold
- Content:
  - introTitle: font-poppins font-semibold text-blog-ink text-base mb-1
  - introBody: font-poppins text-blog-ink/75 text-sm md:text-base leading-relaxed

Numbered red-flag cards:

Container: space-y-4

Each card: bg-blog-cream-soft border border-red-100 rounded-2xl p-5 md:p-6 flex items-start gap-5 relative

LEFT column (icon, w-16 md:w-20 flex-shrink-0):
- Icon circle: w-14 h-14 md:w-16 md:h-16 bg-red-50 rounded-full flex items-center justify-center border border-red-100
  - Card icon inside, w-7 h-7 md:w-8 md:h-8 text-red-500

CENTER column (number badge, narrow, hidden on mobile):
- hidden md:flex w-10 flex-shrink-0 items-start pt-1
- Number text: font-poppins font-bold text-red-500 text-base

RIGHT column (content, flex-1):
- Mobile-only number inline with title: md:hidden inline-block text-red-500 font-bold text-sm mr-2
- Title: font-poppins font-bold text-red-600 text-lg md:text-xl mb-2 leading-tight
- Body: font-poppins text-blog-ink/80 text-sm md:text-base leading-relaxed

FAR RIGHT column (small alert indicator, hidden on mobile, decorative):
- hidden md:flex w-10 flex-shrink-0 items-start justify-center pt-1
- Small alert circle: w-7 h-7 bg-red-50 rounded-full flex items-center justify-center border border-red-100
  - AlertCircle lucide w-4 h-4 text-red-500

Closing reassurance callout:
- mt-10 bg-blog-cream-soft border border-blog-gold/30 rounded-2xl p-5 md:p-6 flex items-start gap-4 relative overflow-hidden
- Decorative lotus (Flower2 lucide) absolute right-4 bottom-4 w-16 h-16 text-blog-gold/15 pointer-events-none
- Icon circle (left): w-12 h-12 flex-shrink-0 bg-blog-gold/20 rounded-full flex items-center justify-center
  - closingIcon inside, w-6 h-6 text-blog-gold
- Content:
  - closingLine1: font-poppins text-blog-ink/85 text-sm md:text-base leading-relaxed
  - closingLine2: font-poppins font-semibold text-blog-gold text-base md:text-lg leading-relaxed mt-1

## v8 wiring

In src/pages/BlogPost.tsx (or in the MdxBlogComponents registry file if that exists):
- Add RedFlagsSection import
- Add RedFlagsSection to the mdxComponents map alongside the existing components

## v8 MDX content rewrite

Edit content/blog/finding-a-vedic-astrologer-in-ahmedabad.mdx.

Find the existing "## Red flags" section (the H2 contains the words "Red flags"; full text may be "## Red flags: what to avoid when choosing an astrologer in Ahmedabad" or similar). The section currently contains plain prose with several red-flag descriptions.

Replace the entire section (from the H2 heading through the last paragraph before the next H2) with this MDX:

```mdx
import { ShieldAlert, BadgePercent, ShoppingBag, BookOpen as BookOpenIconV8, Flame, Puzzle, Users as UsersIconV8, ShieldCheck } from 'lucide-react';

<RedFlagsSection
  titleLine1="Red Flags: What to avoid when"
  titleLine2="choosing an astrologer in Ahmedabad"
  introIcon={ShieldAlert}
  introTitle="This is the most important section of the guide."
  introBody="Treat it as protective consumer guidance, not criticism of any specific practitioner."
  items={[
    {
      number: "01",
      icon: BadgePercent,
      title: "Astrologers who guarantee outcomes",
      body: "Real Jyotish does not guarantee. It interprets karmic patterns, planetary periods, and probabilities. Anyone promising \"100 percent job placement in 30 days\" or \"guaranteed marriage by December\" is selling a product, not practising astrology. The chart can show favourable conditions, neutral conditions, or unfavourable conditions; it does not issue contracts."
    },
    {
      number: "02",
      icon: ShoppingBag,
      title: "High-pressure remedy sales",
      body: "Watch carefully for practitioners who pivot from chart reading to expensive remedies within the first ten minutes. A genuine astrologer recommends remedies sparingly, explains the classical basis (which planet, which house, which dosha), and is comfortable letting you source the items independently."
    },
    {
      number: "03",
      icon: BookOpenIconV8,
      title: "No verifiable training or lineage",
      body: "If the practitioner cannot name their teacher, their institute, or the texts they have studied, take that seriously. Vedic astrology is not a self-taught discipline at the professional level. Every serious practitioner has a parampara they can point to."
    },
    {
      number: "04",
      icon: Flame,
      title: "Fear-based language",
      body: "\"You have severe Mangal dosha, urgent action needed\" delivered before the chart is even fully read is a sales tactic, not analysis. Real Vedic astrology acknowledges difficult yogas calmly, explains them in context, and discusses remedial measures as one of several possible responses, not the only one."
    },
    {
      number: "05",
      icon: Puzzle,
      title: "Reluctance to explain the logic",
      body: "If you ask \"why is this happening\" and the answer is \"because the planets say so,\" without reference to specific houses, lords, aspects, or dasha periods, the practitioner is either not trained well or not willing to teach you. Either way, you are not getting full value."
    },
    {
      number: "06",
      icon: UsersIconV8,
      title: "One-size-fits-all readings",
      body: "Two charts are never identical. If the reading you are getting could apply to anyone with your sun sign, you are not receiving Vedic astrology. You are receiving generic content dressed in Sanskrit."
    }
  ]}
  closingIcon={ShieldCheck}
  closingLine1="A good astrologer empowers you with clarity, not fear."
  closingLine2="Choose wisdom over worry."
/>
```

Notes on lucide imports:
- BookOpen and Users aliased to V8-suffixed names to avoid shadowing existing imports elsewhere in MDX/BlogPost.tsx.
- ShieldAlert, ShieldCheck, BadgePercent, ShoppingBag, Flame, Puzzle should all exist in lucide-react. If any do not, fallback list:
  - ShieldAlert → AlertOctagon
  - ShieldCheck → CheckCircle
  - BadgePercent → Award
  - Puzzle → Puzzle (definitely exists)
  Surface any fallback used in status doc.

After this MDX block, the next H2 continues unchanged.

## v8 steps

1. git fetch origin && git checkout main && git pull origin main
2. Create branch feature/blog-detail-fixes-v8 off main
3. Build the RedFlagsSection component file
4. Wire into mdxComponents map
5. Rewrite the MDX section
6. npm run build → must be green
7. Validation gates:
   - Prerender count = 42
   - dist HTML for the post contains:
     - "Red Flags" rendered (the new component title) — count ≥ 1
     - "Astrologers who guarantee outcomes" rendered ONCE
     - "High-pressure remedy sales" rendered ONCE
     - "No verifiable training or lineage" rendered ONCE
     - "Fear-based language" rendered ONCE
     - "Reluctance to explain the logic" rendered ONCE
     - "One-size-fits-all readings" rendered ONCE
     - "Choose wisdom over worry" rendered ONCE
   - All schemas preserved (BlogPosting, FAQPage, Person)
   - grep -n "—" content/blog/finding-a-vedic-astrologer-in-ahmedabad.mdx → empty
   - grep -rn "—" src/ → empty
   - /, /services, /planets/jupiter, /zodiac/aries, /blog all render without regression
8. Single commit:
   "feat(blog): add RedFlagsSection magazine component"
9. Push: git push -u origin feature/blog-detail-fixes-v8
10. PR: gh pr create --base staging --head feature/blog-detail-fixes-v8 --title "feat(blog): RedFlagsSection magazine component"
11. Wait for Vercel preview, capture URL
12. Merge PR to staging
13. Sleep 90s, verify staging Vercel build success
14. Open staging-to-main PR, merge it
15. Sleep 90s, verify production Vercel build success
16. curl -s https://www.soulinfinity.space/blog/finding-a-vedic-astrologer-in-ahmedabad | grep -c "Astrologers who guarantee outcomes" → must be ≥ 1
17. Write scripts/blog-detail-fixes-v8-status.md with merge commit hashes, deployment timestamps, validation results, list of any lucide icon fallbacks used
18. STOP. Report v8 completion. Wait for explicit "proceed to v9" before starting cycle 2.

==================================================================
CYCLE 2 — v9: OnlineVsInPersonSection magazine component
==================================================================

## v9 goal

Replace the prose-only "Online vs in-person consultations" section with a magazine-style component matching the approved mockup: handwritten title with question line, central highlight callout, two-column comparison cards (Meeting in Person / Online Consultation) with VS divider in the middle, three "what actually matters" cards below, dark navy footer banner with closing line.

## v9 component to build

### File: src/components/blog/OnlineVsInPersonSection.tsx

Self-contained, props-driven, no internal state.

Props:
- titleLine1: string (e.g. "Online consultations vs meeting in person")
- titleLine2: string (e.g. "does it matter?")
- highlightIntro: string (e.g. "The honest answer: a chart is a chart.")
- highlightBody: string (e.g. "The quality of the reading depends on the practitioner's training, the consultation time, and the structure of the dialogue, not on the medium.")
- inPersonIcon: LucideIcon (e.g. Users)
- inPersonTitle: string (e.g. "Meeting in Person")
- inPersonTagline: string (e.g. "Presence. Depth. Slower Pace.")
- inPersonItems: array of { icon: LucideIcon, body: string }
- onlineIcon: LucideIcon (e.g. Monitor)
- onlineTitle: string (e.g. "Online Consultation")
- onlineTagline: string (e.g. "Accessible. Convenient. Efficient.")
- onlineItems: array of { icon: LucideIcon, body: string }
- mattersTitle: string (e.g. "What actually matters in either format")
- mattersItems: array of { icon: LucideIcon, title: string, body: string } (3 items)
- footerIcon: LucideIcon (e.g. Star or Sparkles)
- footerText: string (e.g. "We offer both formats at Soul Infinity, and most clients now choose online for the convenience.")

### v9 layout

Outer wrapper: section className my-12 md:my-16 relative overflow-hidden bg-blog-cream-soft rounded-3xl px-4 py-8 md:px-8 md:py-12

Decorative motifs (low-opacity, pointer-events-none):
- Top-left lotus: Flower2 lucide w-24 h-24 absolute top-4 left-4 text-blog-gold/10
- Top-right mandala: similar Flower2 w-24 h-24 absolute top-4 right-4 text-blog-gold/10

Title block (centered, mb-8):
- titleLine1: font-caveat italic text-3xl md:text-5xl text-blog-ink text-center
- titleLine2: font-caveat italic text-3xl md:text-5xl text-blog-gold text-center mt-1, with two Sparkles lucide flanking left and right at w-5 h-5 text-blog-gold inline (use a flex container)
- Sun divider below: flex items-center justify-center gap-4 mt-3
  - h-px w-16 bg-blog-gold/40
  - Sun lucide w-4 h-4 text-blog-gold
  - h-px w-16 bg-blog-gold/40

Highlight callout (centered):
- bg-white border border-blog-gold/30 rounded-2xl p-5 md:p-6 mb-8 flex items-start gap-4
- Icon circle: w-12 h-12 flex-shrink-0 bg-blog-gold rounded-full flex items-center justify-center
  - Quote lucide icon inside, w-6 h-6 text-white
- Content:
  - highlightIntro: font-poppins text-blog-ink text-base md:text-lg leading-relaxed inline
  - Then highlightBody continues, but the FIRST sentence of highlightBody (or the entire highlightBody) renders in font-poppins font-semibold text-blog-gold leading-relaxed
  - Implementation: render highlightIntro inline, then a space, then highlightBody as a separate span with the gold/semibold styling. To keep it simple: render highlightIntro as a normal paragraph, then highlightBody as a separate paragraph styled gold + semibold inside the same content block.

Two-column comparison (grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-4 relative mb-10):

LEFT card (Meeting in Person): bg-white border border-blog-gold/30 rounded-2xl p-5 md:p-6
- Header row: flex items-center gap-3 mb-2
  - Icon circle: w-11 h-11 bg-blog-gold/15 rounded-full flex items-center justify-center
    - inPersonIcon inside, w-5 h-5 text-blog-gold
  - inPersonTitle: font-poppins font-bold text-blog-ink text-lg
- Tagline: font-poppins font-semibold text-blog-gold text-sm mb-4
- Divider: h-px bg-blog-gold/20 mb-4
- Items list: space-y-4
  - Each item: flex items-start gap-3
  - Item icon circle: w-9 h-9 flex-shrink-0 bg-blog-gold/10 rounded-full flex items-center justify-center
    - Item icon inside, w-4 h-4 text-blog-gold
  - Item body: font-poppins text-blog-ink/80 text-sm md:text-base leading-relaxed flex-1

RIGHT card (Online Consultation): same structure as LEFT card, with onlineIcon/onlineTitle/onlineTagline/onlineItems

VS DIVIDER: positioned absolutely between the two cards on desktop, hidden on mobile
- absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-blog-gold rounded-full flex items-center justify-center font-poppins font-bold text-white text-sm hidden md:flex z-10
- Content: "VS"
- This requires the parent grid container to be relative (already noted above)

"What actually matters" pill heading:
- mt-10 mb-6 flex items-center justify-center
- Pill: bg-blog-gold rounded-full px-5 py-2
  - mattersTitle: font-poppins font-semibold text-white text-sm md:text-base
- Decorative dotted lines flanking the pill (left and right): w-12 h-px border-t border-dashed border-blog-gold/40 (left side and right side of the pill, mx-2 each)

What matters cards (3 columns):
- grid grid-cols-1 md:grid-cols-3 gap-4 mb-10
- Each card: bg-white border border-blog-gold/30 rounded-2xl p-5 text-center
  - Icon circle: w-12 h-12 mx-auto bg-blog-gold/15 rounded-full flex items-center justify-center mb-3
    - Item icon inside, w-6 h-6 text-blog-gold
  - Title: font-poppins font-bold text-blog-ink text-base md:text-lg mb-1
  - Body: font-poppins text-blog-ink/70 text-sm leading-relaxed

Footer banner:
- bg-blog-navy rounded-2xl p-5 md:p-6 flex items-center gap-4 relative overflow-hidden
- Decorative Sparkles lucide w-5 h-5 text-blog-gold/40 absolute bottom-3 right-4
- Icon circle (left): w-12 h-12 flex-shrink-0 bg-blog-gold/20 rounded-full flex items-center justify-center
  - footerIcon inside, w-6 h-6 text-blog-gold
- footerText (flex-1): font-poppins text-blog-cream/90 text-base md:text-lg leading-relaxed
  - Highlight the second clause "and most clients now choose online for the convenience." in text-blog-gold font-semibold (split footerText on a comma + "and " split point and render the second half styled, OR add a separate prop footerHighlight if cleaner — implement whichever you prefer, document choice in status doc)

## v9 wiring

In src/pages/BlogPost.tsx (or MdxBlogComponents):
- Add OnlineVsInPersonSection import
- Add to the mdxComponents map

## v9 MDX content rewrite

Edit content/blog/finding-a-vedic-astrologer-in-ahmedabad.mdx.

Find the existing "## Online vs in-person" section (heading text approximate). Replace the entire section with this MDX:

```mdx
import { Users as UsersIconV9, Monitor, Globe, Video, Clock as ClockIconV9, Target, GitBranch, Lotus, Handshake, Sun, Calendar as CalendarIconV9, Brain, Quote, Star } from 'lucide-react';

<OnlineVsInPersonSection
  titleLine1="Online consultations vs meeting in person"
  titleLine2="does it matter?"
  highlightIntro="The honest answer: a chart is a chart."
  highlightBody="The quality of the reading depends on the practitioner's training, the consultation time, and the structure of the dialogue, not on the medium."
  inPersonIcon={UsersIconV9}
  inPersonTitle="Meeting in Person"
  inPersonTagline="Presence. Depth. Slower Pace."
  inPersonItems={[
    { icon: Sun, body: "A particular presence and slower pace that many clients prefer, especially for emotionally heavy questions." },
    { icon: Handshake, body: "Allows deeper connection and space for natural dialogue." },
    { icon: ClockIconV9, body: "Ideal when you want a calm, undistracted environment." }
  ]}
  onlineIcon={Monitor}
  onlineTitle="Online Consultation"
  onlineTagline="Accessible. Convenient. Efficient."
  onlineItems={[
    { icon: Globe, body: "Makes trained Jyotish practitioners from Delhi, Varanasi, and other lineage cities accessible to Ahmedabad clients." },
    { icon: Video, body: "Comes with clean recordings, easy follow-up by email, and lower scheduling friction." },
    { icon: CalendarIconV9, body: "Saves travel time and offers flexibility in busy schedules." }
  ]}
  mattersTitle="What actually matters in either format"
  mattersItems={[
    { icon: Target, title: "Birth detail accuracy", body: "Correct information is the foundation." },
    { icon: ClockIconV9, title: "Time allocated for the reading", body: "Depth comes from time and attention." },
    { icon: Brain, title: "Chart logic step by step", body: "A good astrologer explains the why behind everything." }
  ]}
  footerIcon={Star}
  footerText="We offer both formats at Soul Infinity, and most clients now choose online for the convenience."
/>
```

Notes on lucide imports:
- Aliased Users, Clock, Calendar to V9-suffixed names to avoid shadowing.
- Brain may not exist; fallback to Lightbulb. Surface any fallback in status doc.
- Lotus does not exist in lucide-react; remove from imports if listed accidentally — use Sun or Sparkles instead for the in-person calm icon. (Already corrected above to Sun.)
- Handshake is in lucide-react; if not, fallback to Users.
- Quote should exist in lucide-react.

After this MDX block, the next H2 continues unchanged.

## v9 steps

1. git fetch origin && git checkout main && git pull origin main (start from latest main with v8 already merged)
2. Create branch feature/blog-detail-fixes-v9 off main
3. Build the OnlineVsInPersonSection component file
4. Wire into mdxComponents map
5. Rewrite the MDX section
6. npm run build → must be green
7. Validation gates:
   - Prerender count = 42
   - dist HTML for the post contains:
     - "Online consultations vs meeting in person" rendered ONCE
     - "Meeting in Person" rendered ≥ 1
     - "Online Consultation" rendered ≥ 1
     - "Birth detail accuracy" rendered ONCE
     - "Time allocated for the reading" rendered ONCE
     - "Chart logic step by step" rendered ONCE
     - "We offer both formats" rendered ONCE
   - All schemas preserved
   - grep -n "—" content/blog/finding-a-vedic-astrologer-in-ahmedabad.mdx → empty
   - grep -rn "—" src/ → empty
   - /, /services, /planets/jupiter, /zodiac/aries, /blog all render without regression
8. Single commit:
   "feat(blog): add OnlineVsInPersonSection magazine component"
9. Push: git push -u origin feature/blog-detail-fixes-v9
10. PR: gh pr create --base staging --head feature/blog-detail-fixes-v9 --title "feat(blog): OnlineVsInPersonSection magazine component"
11. Wait for Vercel preview, capture URL
12. Merge PR to staging
13. Sleep 90s, verify staging Vercel build success
14. Open staging-to-main PR, merge it
15. Sleep 90s, verify production Vercel build success
16. curl -s https://www.soulinfinity.space/blog/finding-a-vedic-astrologer-in-ahmedabad | grep -c "Birth detail accuracy" → must be ≥ 1
17. Write scripts/blog-detail-fixes-v9-status.md with merge commit hashes, deployment timestamps, validation results, list of any lucide icon fallbacks used
18. STOP. Report v9 completion.

## Failure protocol (both cycles)

Any merge conflict → STOP, report which PR and the conflict, do not force-merge.
Any Vercel deployment failure → STOP, capture error, do not proceed.
Any validation gate fail → STOP, write failure to status doc, do not proceed.
Any em-dash check fail → STOP, fix em-dash, re-run gates, do not commit until clean.