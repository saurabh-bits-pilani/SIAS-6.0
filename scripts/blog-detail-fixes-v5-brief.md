# Blog Detail Fixes v5 — Credentials Section Component

Branch off feature/blog-detail-fixes-v4 head (or current head if v4 already merged). New branch: feature/blog-detail-fixes-v5. Target staging. Autonomous. Halt only on hard build failures. Status doc: scripts/blog-detail-fixes-v5-status.md.

## Goal

Replace the existing prose-only "What credentials should a Vedic astrologer have?" section in the Ahmedabad blog post with a designed magazine-style component matching the attached mockup: title block with sun divider, intro callout with temple icon, four numbered cards with circular icons and per-card detail blocks, footer CTA banner with award icon.

## Component to build

### File: src/components/blog/CredentialsSection.tsx

Self-contained, props-driven, no internal state.

Props:
- titleLine1: string (e.g. "What credentials should")
- titleLine2: string (e.g. "a Vedic astrologer have?")
- introIcon: LucideIcon (e.g. Landmark — temple/pillar icon for the intro)
- introBody: string (the opening paragraph about Vedic astrology being a textual and oral tradition)
- items: array of:
  {
    number: string,                                       // "01", "02", "03", "04"
    icon: LucideIcon,                                     // main card icon
    title: string,                                        // e.g. "Classical Training"
    intro: string,                                        // single sentence opener
    bullets: optional array of string,                   // for card 1: list of texts
    inlineList: optional array of { icon: LucideIcon, label: string }, // for card 2: institutes row
    body: optional string,                               // additional supporting paragraph
    warning: optional { icon: LucideIcon, text: string } // for card 1: cautionary callout
  }
- footerIcon: LucideIcon (e.g. Award)
- footerLine1: string (e.g. "Credentials bring trust. Tradition brings depth. Experience brings clarity.")
- footerLine2: string (e.g. "That is what makes guidance truly meaningful.")

### Layout

Outer wrapper: section className my-12 md:my-16 relative overflow-hidden.

Decorative motifs (low-opacity background accents, pointer-events-none):
- Lotus or mandala SVG/lucide top-left: absolute top-0 left-0 w-32 h-32 text-blog-gold/8
- Mandala/zodiac wheel top-right: absolute top-4 right-4 w-32 h-32 text-blog-gold/8

### Title block (centered, mb-10)

- Top sparkle: Sparkles lucide w-4 h-4 mx-auto text-blog-gold mb-3
- titleLine1: font-poppins font-bold text-3xl md:text-5xl text-blog-ink text-center
- titleLine2: font-caveat italic text-3xl md:text-5xl text-blog-gold text-center mt-1
- Sun divider below: flex items-center justify-center gap-4 mt-4
  - h-px w-16 bg-blog-gold/40
  - Sun lucide w-4 h-4 text-blog-gold
  - h-px w-16 bg-blog-gold/40

### Intro callout

bg-blog-cream-soft border border-blog-gold/30 rounded-2xl p-5 md:p-6 mb-8 flex items-start gap-4 relative overflow-hidden:
- Decorative lotus absolute right-4 top-4 w-12 h-12 text-blog-gold/15 (use Flower2 lucide)
- Icon circle (left): w-14 h-14 flex-shrink-0 bg-blog-gold/15 rounded-full flex items-center justify-center
  - introIcon inside, w-7 h-7 text-blog-gold
- Body (flex-1): font-poppins text-blog-ink/85 text-base md:text-lg leading-relaxed

### Numbered cards (the four credential blocks)

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

### Footer banner

mt-10 bg-blog-navy rounded-2xl p-6 md:p-8 relative overflow-hidden:
- Decorative cosmic SVG top-right at low opacity: same constellation pattern used in dark sidebar CTA card (circles + dotted radial lines), w-32 h-32 absolute top-0 right-0 opacity-15 pointer-events-none
- Decorative shooting-star line, bottom-right: a small inline SVG curve in gold/30, OR Sparkles lucide w-5 h-5 text-blog-gold/40 absolute bottom-4 right-6
- Content (flex items-start gap-4 relative z-10):
  - Icon circle (left): w-12 h-12 md:w-14 md:h-14 flex-shrink-0 bg-blog-gold/20 rounded-full flex items-center justify-center
    - footerIcon inside, w-6 h-6 md:w-7 md:h-7 text-blog-gold
  - Text block (flex-1):
    - footerLine1: font-poppins text-blog-cream/90 text-base md:text-lg leading-relaxed
    - footerLine2: font-poppins text-blog-gold font-semibold text-base md:text-lg leading-relaxed mt-1

## MDX components registry update

In src/pages/BlogPost.tsx:
- Add CredentialsSection import alongside the existing blog component imports
- Add CredentialsSection to the mdxComponents map

## MDX content rewrite

Edit content/blog/finding-a-vedic-astrologer-in-ahmedabad.mdx.

Find the existing "What credentials should a Vedic astrologer have?" H2 section. The section currently contains plain prose: an opening paragraph about Vedic astrology being a textual and oral tradition, then prose discussion of classical training, lineage and parampara (with text mentioning K.N. Rao Institute, ICAS, Bharatiya Vidya Bhavan, Saptarishis Astrology), years of practice on real charts, and specialisation. There may also be a small closing line.

Replace the entire section (from the H2 heading through the last paragraph before the next H2 — which should be the questions-to-ask section) with this MDX:

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
- BookOpen, Users, Calendar are aliased (BookOpenIcon, UsersIcon, CalendarIcon) to avoid shadowing existing imports already in the MDX file or BlogPost.tsx.
- Landmark is reused as both the intro icon AND one of the inlineList icons. Single import is fine.
- Sparkle (singular). If lucide-react does not export Sparkle, fall back to Star and surface in status doc.
- Flower (singular). If lucide-react does not export Flower, fall back to Flower2 and surface in status doc.
- GraduationCap should exist. If not, fall back to BookOpen.

After this MDX block, the next H2 ("Questions to ask before your first consultation" or whatever it is currently) continues unchanged.

## Validation gates

- npm run build green
- Prerender count = 42
- dist HTML for the post contains:
  - All schemas preserved (BlogPosting + FAQPage + Person)
  - "What credentials should" rendered exactly ONCE
  - "Classical Training" text rendered ONCE
  - "Lineage & Parampara" rendered ONCE (use HTML-encoded ampersand match if necessary)
  - "Years of Practice on Real Charts" rendered ONCE
  - "Specialisation" rendered ONCE
  - "Credentials bring trust." rendered ONCE
  - "K.N. Rao Institute" appears in this section's rendered output
- grep -n "—" content/blog/finding-a-vedic-astrologer-in-ahmedabad.mdx → empty
- grep -rn "—" src/ → empty
- grep -rn "—" src/components/blog/CredentialsSection.tsx → empty
- /, /services, /planets/jupiter, /zodiac/aries, /blog all render without regression

## Commit + PR

Single commit:
"feat(blog): add CredentialsSection magazine component

- Build CredentialsSection with title block, intro callout, 4 numbered cards, footer banner
- Support optional bullets, inlineList, body, warning per card
- Wire into MDXProvider components map
- Replace credentials prose section in Ahmedabad post with the new component"

Push to origin/feature/blog-detail-fixes-v5.

gh pr create --base staging --head feature/blog-detail-fixes-v5 --title "feat(blog): CredentialsSection magazine component"

Stop after Vercel preview URL captured. Do not merge.

## Status report

scripts/blog-detail-fixes-v5-status.md with: component file path and line count, MDX rewrite line counts, list of any lucide icon fallbacks used, validation gate results, Vercel preview URL.

Halt only on hard failures. Otherwise execute end to end.