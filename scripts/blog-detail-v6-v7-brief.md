# Blog Detail v6 + v7 — Two Clean Sequential PRs

Production is live with PRs #3-#6 merged into main. Two follow-ups to ship.

Run as TWO separate sequential cycles. Each cycle is a clean off-main branch, single-purpose PR, staging promote, main promote. NO stacking.

Autonomous mode. Halt only on hard build failures. Status docs:
- v6: scripts/blog-detail-fixes-v6-status.md
- v7: scripts/blog-detail-fixes-v7-status.md

After each cycle finishes its main promote, REPORT BACK to Saurabh and STOP. Do NOT auto-start the next cycle. Saurabh will say "proceed to v7" or similar before v7 begins.

==================================================================
CYCLE 1 — v6: Remove duplicate CTA banner
==================================================================

## v6 goal

The bottom of the live blog post shows two CTA cards back-to-back:
1. FinalCTA "We're here to help you on that journey" (from ClosingSection inside MDX) — KEEP this
2. OLD inline CTA banner "Want a Personalised Astrology Reading?" hardcoded in BlogPost.tsx — REMOVE this

## v6 steps

1. git fetch origin && git checkout main && git pull origin main
2. Create branch feature/blog-detail-fixes-v6 off main
3. Edit src/pages/BlogPost.tsx. Find and DELETE the inline CTA banner section. Identifying markers:
   - Wrapper section className contains "my-12" and "bg-blog-navy" and "rounded-2xl"
   - Contains decorative SVG with circles + radial lines
   - h2 with className containing "font-caveat" and text "Want a Personalised Astrology Reading?"
   - Two paragraphs with classes including "text-blog-cream/80"
   - Link to /services/vedic-astrology
   Delete the entire section block. Verify React JSX structure remains valid (closing tags match).
4. npm run build → must be green
5. Validation:
   - grep -c "Want a Personalised Astrology Reading" dist/blog/finding-a-vedic-astrologer-in-ahmedabad/index.html → 0
   - grep -c "We're here to help you on that journey" dist/blog/finding-a-vedic-astrologer-in-ahmedabad/index.html → 1
   - grep -c "Book a Consultation" dist/blog/finding-a-vedic-astrologer-in-ahmedabad/index.html → 2 (one in FinalCTA, one in sidebar dark CTA)
   - All schemas preserved (BlogPosting, FAQPage, Person each ≥ 1 hit)
   - Prerender count = 42
   - grep -rn "—" src/ → empty
6. Single commit:
   "fix(blog): remove duplicate CTA banner from BlogPost.tsx"
   Body: "Old inline CTA banner duplicated the new FinalCTA from ClosingSection. Removed so each blog post shows only one final CTA."
7. Push: git push -u origin feature/blog-detail-fixes-v6
8. PR: gh pr create --base staging --head feature/blog-detail-fixes-v6 --title "fix(blog): remove duplicate CTA banner"
9. Wait for Vercel preview build, capture URL
10. Merge PR to staging: gh pr merge <number> --merge --delete-branch=false
11. Sleep 90s, verify staging Vercel deployment success
12. Open staging-to-main PR: gh pr create --base main --head staging --title "Promote v6: remove duplicate CTA"
13. Merge staging-to-main PR: gh pr merge <new number> --merge --delete-branch=false
14. Sleep 90s, verify production Vercel deployment success
15. curl -s https://www.soulinfinity.space/blog/finding-a-vedic-astrologer-in-ahmedabad | grep -c "Want a Personalised Astrology Reading" → must be 0 (the old banner is gone from production)
16. Write scripts/blog-detail-fixes-v6-status.md with merge commit hashes, deployment timestamps, validation results.
17. STOP. Report v6 completion to Saurabh. Wait for explicit "proceed to v7" before starting cycle 2.

==================================================================
CYCLE 2 — v7: CredentialsSection magazine component
==================================================================

## v7 goal

Replace the prose-only "What credentials should a Vedic astrologer have?" section in the blog post with a magazine-style component matching the approved design: title block with sun divider, intro callout with temple icon, four numbered cards with circular icons and per-card detail blocks, footer banner with award icon.

## v7 component to build

### File: src/components/blog/CredentialsSection.tsx

Self-contained, props-driven, no internal state.

Props:
- titleLine1: string (e.g. "What credentials should")
- titleLine2: string (e.g. "a Vedic astrologer have?")
- introIcon: LucideIcon
- introBody: string
- items: array of:
  {
    number: string,
    icon: LucideIcon,
    title: string,
    intro: string,
    bullets: optional array of string,
    inlineList: optional array of { icon: LucideIcon, label: string },
    body: optional string,
    warning: optional { icon: LucideIcon, text: string }
  }
- footerIcon: LucideIcon
- footerLine1: string
- footerLine2: string

### v7 layout

Outer wrapper: section className my-12 md:my-16 relative overflow-hidden.

Decorative motifs (low-opacity background accents, pointer-events-none):
- Lotus or mandala icon top-left: absolute top-0 left-0 w-32 h-32 text-blog-gold/10
- Mandala/zodiac wheel top-right: absolute top-4 right-4 w-32 h-32 text-blog-gold/10

Title block (centered, mb-10):
- Top sparkle: Sparkles lucide w-4 h-4 mx-auto text-blog-gold mb-3
- titleLine1: font-poppins font-bold text-3xl md:text-5xl text-blog-ink text-center
- titleLine2: font-caveat italic text-3xl md:text-5xl text-blog-gold text-center mt-1
- Sun divider below: flex items-center justify-center gap-4 mt-4
  - h-px w-16 bg-blog-gold/40
  - Sun lucide w-4 h-4 text-blog-gold
  - h-px w-16 bg-blog-gold/40

Intro callout:
- bg-blog-cream-soft border border-blog-gold/30 rounded-2xl p-5 md:p-6 mb-8 flex items-start gap-4 relative overflow-hidden
- Decorative Flower2 lucide absolute right-4 top-4 w-12 h-12 text-blog-gold/15
- Icon circle (left): w-14 h-14 flex-shrink-0 bg-blog-gold/15 rounded-full flex items-center justify-center
  - introIcon inside, w-7 h-7 text-blog-gold
- Body (flex-1): font-poppins text-blog-ink/85 text-base md:text-lg leading-relaxed

Numbered cards (the four credential blocks):

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
- Title: font-poppins font-bold text-blog-ink text-xl md:text-2xl
- Intro: font-poppins text-blog-ink/85 text-sm md:text-base leading-relaxed
- (Conditional) Bullets: ul className "list-disc list-inside space-y-1 ml-1 marker:text-blog-gold mt-1"
  - Each li: font-poppins text-blog-ink/80 text-sm md:text-base
- (Conditional) inlineList: flex flex-wrap gap-x-5 gap-y-2 mt-2
  - Each entry: flex items-center gap-2
  - Entry icon: lucide icon w-5 h-5 text-blog-gold
  - Entry label: font-poppins text-blog-ink text-sm md:text-base font-medium
- (Conditional) body paragraph: font-poppins text-blog-ink/75 text-sm md:text-base leading-relaxed mt-2
- (Conditional) warning callout: bg-blog-gold/10 border border-blog-gold/30 rounded-lg px-3 py-2 mt-3 flex items-start gap-2
  - Warning icon: lucide w-4 h-4 text-blog-gold flex-shrink-0 mt-0.5
  - Warning text: font-poppins italic text-blog-ink/80 text-sm

Footer banner:
- mt-10 bg-blog-navy rounded-2xl p-6 md:p-8 relative overflow-hidden
- Decorative cosmic SVG top-right at low opacity (constellation pattern, w-32 h-32 absolute top-0 right-0 opacity-15 pointer-events-none)
- Decorative Sparkles lucide w-5 h-5 text-blog-gold/40 absolute bottom-4 right-6
- Content (flex items-start gap-4 relative z-10):
  - Icon circle (left): w-12 h-12 md:w-14 md:h-14 flex-shrink-0 bg-blog-gold/20 rounded-full flex items-center justify-center
    - footerIcon inside, w-6 h-6 md:w-7 md:h-7 text-blog-gold
  - Text block (flex-1):
    - footerLine1: font-poppins text-blog-cream/90 text-base md:text-lg leading-relaxed
    - footerLine2: font-poppins text-blog-gold font-semibold text-base md:text-lg leading-relaxed mt-1

## v7 wiring

In src/pages/BlogPost.tsx:
- Add CredentialsSection import
- Add CredentialsSection to the mdxComponents map

## v7 MDX content rewrite

Edit content/blog/finding-a-vedic-astrologer-in-ahmedabad.mdx.

Find the existing "## What credentials should a Vedic astrologer have?" H2 section. The section currently contains plain prose: an opening paragraph about Vedic astrology being a textual and oral tradition, then prose discussion of classical training, lineage and parampara (with text mentioning K.N. Rao Institute, ICAS, Bharatiya Vidya Bhavan, Saptarishis Astrology), years of practice on real charts, and specialisation. There may be a small closing line.

Replace the entire section (from the H2 heading through the last paragraph before the next H2) with this MDX:

```mdx
import { Landmark, BookOpen as BookOpenIcon, Users as UsersIcon, Calendar as CalendarIcon, Target, AlertCircle, Award, GraduationCap, Sparkle, Flower } from 'lucide-react';

<CredentialsSection
  titleLine1="What credentials should"
  titleLine2="a Vedic astrologer have?"
  introIcon={Landmark}
  introBody="Vedic astrology is a textual and oral tradition that has been transmitted through specific lineages for roughly two thousand years. Anyone who treats it as serious work can name where their training came from. If they cannot, that is information."
  items={[
    {
      number: "01",
      icon: BookOpenIcon,
      title: "Classical Training",
      intro: "Look for formal training in classical Jyotish texts.",
      bullets: [
        "Brihat Parashara Hora Shastra (the foundational text)",
        "Phaladeepika, Saravali, Jaimini Sutras (supporting texts)"
      ],
      warning: {
        icon: AlertCircle,
        text: "If someone says \"ancient texts\" without specifics, be cautious."
      }
    },
    {
      number: "02",
      icon: UsersIcon,
      title: "Lineage & Parampara",
      intro: "The chain of teacher to student that carries the tradition forward.",
      inlineList: [
        { icon: Landmark, label: "K.N. Rao Institute" },
        { icon: GraduationCap, label: "ICAS (founded by Dr. B.V. Raman)" },
        { icon: Flower, label: "Bharatiya Vidya Bhavan" },
        { icon: Sparkle, label: "Saptarishis Astrology School" }
      ],
      body: "Lineage is the same quality control mechanism used in medicine, law and classical music. It ensures the practitioner was taught, tested and continues to be part of a community that audits its own work."
    },
    {
      number: "03",
      icon: CalendarIcon,
      title: "Years of Practice on Real Charts",
      intro: "Learning is not just reading; it is seeing patterns play out in real life.",
      body: "Experience across thousands of charts teaches how planetary combinations, dashas (planetary periods), and different life contexts actually manifest. There is no substitute for time on the work."
    },
    {
      number: "04",
      icon: Target,
      title: "Specialisation",
      intro: "Depth comes from focus.",
      body: "Some astrologers specialise in marriage matching, some in career timing, some in health, some in remedial measures, or some in prashna (horary astrology). A practitioner who claims to be equally expert in everything is usually exaggerating one of those areas."
    }
  ]}
  footerIcon={Award}
  footerLine1="Credentials bring trust. Tradition brings depth. Experience brings clarity."
  footerLine2="That is what makes guidance truly meaningful."
/>
```

Notes on lucide imports:
- BookOpen, Users, Calendar are aliased to avoid shadowing existing imports.
- Sparkle (singular). If lucide-react does not export Sparkle, fall back to Star and surface in status doc.
- Flower (singular). If lucide-react does not export Flower, fall back to Flower2.
- GraduationCap should exist. If not, fall back to BookOpen.

After this MDX block, the next H2 continues unchanged.

## v7 steps

1. git fetch origin && git checkout main && git pull origin main (start from latest main with v6 already merged)
2. Create branch feature/blog-detail-fixes-v7 off main
3. Build the CredentialsSection component file
4. Wire into BlogPost.tsx mdxComponents map
5. Rewrite the MDX section
6. npm run build → must be green
7. Validation gates:
   - Prerender count = 42
   - dist HTML for the post contains:
     - "What credentials should" rendered exactly ONCE
     - "Classical Training" rendered ONCE
     - "Lineage" rendered ONCE
     - "Years of Practice on Real Charts" rendered ONCE
     - "Specialisation" rendered ONCE
     - "Credentials bring trust" rendered ONCE
     - "K.N. Rao Institute" appears in this section's rendered output
   - All schemas preserved
   - grep -n "—" content/blog/finding-a-vedic-astrologer-in-ahmedabad.mdx → empty
   - grep -rn "—" src/ → empty
   - /, /services, /planets/jupiter, /zodiac/aries, /blog all render without regression
8. Single commit:
   "feat(blog): add CredentialsSection magazine component"
   Body: "Build CredentialsSection with title block, intro callout, 4 numbered cards, footer banner. Replace credentials prose section in Ahmedabad post with the new component."
9. Push: git push -u origin feature/blog-detail-fixes-v7
10. PR: gh pr create --base staging --head feature/blog-detail-fixes-v7 --title "feat(blog): CredentialsSection magazine component"
11. Wait for Vercel preview build, capture URL, REPORT preview URL to Saurabh and pause briefly. (No mandatory hold here, but log the URL prominently in case Saurabh wants to spot-check before staging merge.)
12. Merge PR to staging: gh pr merge <number> --merge --delete-branch=false
13. Sleep 90s, verify staging Vercel deployment success
14. Open staging-to-main PR: gh pr create --base main --head staging --title "Promote v7: CredentialsSection magazine component"
15. Merge staging-to-main PR: gh pr merge <new number> --merge --delete-branch=false
16. Sleep 90s, verify production Vercel deployment success
17. curl -s https://www.soulinfinity.space/blog/finding-a-vedic-astrologer-in-ahmedabad | grep -c "Classical Training" → must be ≥ 1 (the new component is live)
18. Write scripts/blog-detail-fixes-v7-status.md with merge commit hashes, deployment timestamps, validation results, list of any lucide icon fallbacks used.
19. STOP. Report v7 completion to Saurabh.

## Failure protocol (both cycles)

Any merge conflict → STOP, report which PR and the conflict, do not force-merge.
Any Vercel deployment failure → STOP, capture error, do not proceed.
Any validation gate fail → STOP, write failure to status doc, do not proceed.
Any em-dash check fail → STOP, fix em-dash, re-run gates, do not commit until clean.