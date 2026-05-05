# Blog Detail Fixes v4 — Closing Section + FAQ + Final CTA + Duplicate Fix

Branch off feature/blog-detail-fixes-v3 head (or current head if v3 already merged). New branch: feature/blog-detail-fixes-v4. Target staging. Autonomous. Halt only on hard build failures. Status doc: scripts/blog-detail-fixes-v4-status.md.

## Issue context

Two FAQ sections currently render on the blog detail page:
- A. The accordion built into BlogPost.tsx that maps fm.faqs from frontmatter
- B. An MDX-body FAQ section with H2 + H3 prose

Resolution: remove BOTH the inline accordion in BlogPost.tsx AND the prose FAQ in the MDX body. Replace with a new ClosingSection that wraps three child components (ClosingThought, FAQSection, FinalCTA). Frontmatter.faqs array stays as the single source of truth for FAQPage JSON-LD schema.

## Components to build

All component files in src/components/blog/. Each is self-contained and props-driven. Internal state only where the spec requires it.

### File: src/components/blog/Section.tsx

A simple section wrapper used by ClosingSection.

Props:
- children: ReactNode

Layout:
- section className "max-w-5xl mx-auto px-4 py-12 md:py-16"

### File: src/components/blog/ClosingThought.tsx

Props:
- title: string (default "A Closing Thought")
- body: string
- highlight: string

Layout:
- Outer: div className "bg-blog-cream-soft border border-blog-gold/40 rounded-2xl p-6 md:p-8 shadow-sm relative overflow-hidden"
- Decorative lotus (Flower2 lucide) absolute right-6 bottom-6 w-24 h-24 text-blog-gold/15 pointer-events-none
- Title row: flex items-center gap-3 mb-4
  - Sparkles lucide icon w-5 h-5 text-blog-gold
  - h2 with font-kalam font-bold text-2xl md:text-3xl text-blog-ink
- Two-column inner layout: flex items-start gap-5 md:gap-8
  - LEFT: w-20 h-20 md:w-24 md:h-24 flex-shrink-0 bg-blog-gold/15 rounded-full flex items-center justify-center, with Flame lucide icon w-10 h-10 text-blog-gold inside (represents the diya/lamp)
  - RIGHT: flex-1
    - body paragraph: font-poppins text-blog-ink/85 leading-relaxed text-base md:text-lg
    - highlight paragraph: mt-4 font-poppins text-blog-gold font-semibold leading-relaxed text-base md:text-lg

### File: src/components/blog/FAQItem.tsx

Single accordion row. Internal state: open (boolean), default false.

Props:
- question: string
- answer: string
- icon: ReactNode (a Lucide icon JSX element passed in)

Layout:
- Wrapper div: className "border-b border-blog-gold/20 last:border-b-0"
- button:
  - onClick toggles open
  - aria-expanded set to open
  - className "w-full flex items-center justify-between p-4 md:p-5 text-left transition-colors hover:bg-blog-gold/5"
  - LEFT side: flex items-center gap-3 md:gap-4
    - Icon circle: w-10 h-10 md:w-11 md:h-11 rounded-full bg-blog-gold/15 flex items-center justify-center flex-shrink-0
    - Inside circle: render the icon prop directly (icon prop is already a JSX element)
    - Vertical divider: w-px h-7 bg-blog-gold/30 hidden md:block
    - Question text: font-poppins font-semibold text-blog-ink text-base md:text-lg
  - RIGHT side: ChevronDown lucide icon w-5 h-5 text-blog-gold transition-transform with conditional className "rotate-180" when open
- Conditional answer block (only when open):
  - div className "px-4 md:px-5 pb-4 md:pb-5 pl-16 md:pl-20"
  - p className "font-poppins text-blog-ink/75 text-sm md:text-base leading-relaxed"
  - Render answer text inside

### File: src/components/blog/FAQSection.tsx

Props:
- title: string (default "Frequently Asked Questions")
- items: array of { question: string, answer: string, icon: ReactNode }

Layout:
- Outer div className "mt-12"
- Title block centered:
  - Top sparkle: Sparkles lucide w-4 h-4 mx-auto text-blog-gold mb-2
  - flex items-center justify-center gap-3 mb-1
    - Sparkles lucide w-5 h-5 text-blog-gold
    - h2 className "font-poppins font-bold text-3xl md:text-5xl text-blog-ink text-center"
    - Sparkles lucide w-5 h-5 text-blog-gold
  - Sun divider: flex items-center justify-center gap-4 mt-3 mb-6
    - h-px w-16 bg-blog-gold/40
    - Sun lucide w-4 h-4 text-blog-gold
    - h-px w-16 bg-blog-gold/40
- List wrapper: div className "border border-blog-gold/30 rounded-2xl overflow-hidden bg-blog-cream-soft"
- Map items, render FAQItem for each, passing question/answer/icon

### File: src/components/blog/FinalCTA.tsx

Props:
- title: string (default "We're here to help you on that journey")
- subtitle: string (default "Get clarity on your life path, challenges, and opportunities.")
- buttonText: string (default "Book a Consultation")
- buttonHref: string (default "/services/vedic-astrology")
- closingLine: string (optional, the small "Good questions bring clarity..." line above the CTA card)

Layout:
- Outer wrapper div className "mt-12"
- If closingLine provided, render a small bar above the CTA:
  - div className "bg-blog-cream-soft border border-blog-gold/20 rounded-2xl px-5 py-4 mb-4 flex items-center gap-3 relative overflow-hidden"
  - Compass lucide w-8 h-8 text-blog-gold/40 flex-shrink-0
  - p className "font-poppins text-blog-ink/85 text-sm md:text-base"
  - Decorative Sparkles lucide w-4 h-4 text-blog-gold/30 absolute top-3 right-3
- CTA card: div className "bg-blog-navy text-blog-cream rounded-2xl p-8 text-center relative overflow-hidden"
  - Decorative cosmic SVG in top-right corner at low opacity (use the same constellation SVG pattern used in the existing dark sidebar CTA card — circles + dotted radial lines, w-32 h-32 absolute top-0 right-0 opacity-15 pointer-events-none)
  - h3 className "font-kalam font-bold text-2xl md:text-3xl mb-3 text-blog-gold relative z-10"
  - p className "text-blog-cream/80 mb-6 font-poppins relative z-10"
  - Link (react-router-dom Link, NOT a button — must navigate to buttonHref):
    - to={buttonHref}
    - className "inline-flex items-center gap-2 bg-blog-gold hover:bg-blog-gold-bright text-blog-navy px-6 py-3 rounded-full font-semibold font-poppins transition-colors relative z-10"
    - Children: buttonText text + ArrowRight lucide w-4 h-4

### File: src/components/blog/ClosingSection.tsx

Composite wrapper that renders the three children in order. Uses Section from this same folder.

Props (all forwarded to children):
- closingTitle: string
- closingBody: string
- closingHighlight: string
- faqTitle: string
- faqs: array of { question: string, answer: string, icon: ReactNode }
- ctaClosingLine: string (the "Good questions bring clarity..." line)
- ctaTitle: string
- ctaSubtitle: string
- ctaButtonText: string
- ctaButtonHref: string

Layout:
- Render Section wrapping a div with space-y-8
- Inside Section:
  - ClosingThought with title=closingTitle body=closingBody highlight=closingHighlight
  - FAQSection with title=faqTitle items=faqs
  - FinalCTA with title=ctaTitle subtitle=ctaSubtitle buttonText=ctaButtonText buttonHref=ctaButtonHref closingLine=ctaClosingLine

## MDX components registry update

In src/pages/BlogPost.tsx:
- Add ClosingSection import (only the wrapper — children are imported inside ClosingSection.tsx)
- Add ClosingSection to the mdxComponents map alongside the existing components

The internal child components (Section, ClosingThought, FAQItem, FAQSection, FinalCTA) are NOT exposed to MDX. Only ClosingSection is.

## Remove inline FAQ accordion from BlogPost.tsx

Find the FAQ block in src/pages/BlogPost.tsx that renders the H2 "Frequently Asked Questions" followed by fm.faqs?.map iterating details/summary elements. Delete that entire H2 + accordion block. The existing bottom CTA banner that follows it stays exactly where it is.

The schema injection (FAQPage JSON-LD generated from fm.faqs) stays unchanged.

## MDX content rewrite

Edit content/blog/finding-a-vedic-astrologer-in-ahmedabad.mdx.

Step 1: Find and DELETE the inline H2 sections that duplicate the closing/FAQ content. Specifically:
- The H2 "## A closing thought" and its body paragraphs
- The H2 "## Frequently Asked Questions" and all H3 question + answer prose underneath it
Both currently render as plain prose styled by prose-blog. Both must be removed.

Step 2: At the very end of the MDX body (after the last meaningful section, which is "How Soul Infinity approaches consultations" or similar), append this single ClosingSection invocation:

```mdx
import { Search, Moon, Clock as ClockIcon, IndianRupee, Laptop, Landmark as LandmarkIcon } from 'lucide-react';

<ClosingSection
  closingTitle="A Closing Thought"
  closingBody="Choosing well matters. The criteria are knowable, and once you apply them the search becomes much shorter than the directory listings suggest."
  closingHighlight="The wrong signals lead to disappointing readings; the right ones lead to consultations you remember and refer to for years."
  faqTitle="Frequently Asked Questions"
  faqs={[
    {
      question: "How do I find a good Vedic astrologer in Ahmedabad?",
      answer: "Look for a practitioner with formal training in classical Jyotish (Parashari Hora Shastra, Jaimini Sutras), a stated lineage from a recognised institute such as the K.N. Rao Institute or ICAS, several years of practice on real charts, and a willingness to explain the chart logic during the consultation. Avoid astrologers who guarantee outcomes, push expensive remedies, or refuse to name their teachers.",
      icon: <Search className="w-5 h-5 text-blog-gold" />
    },
    {
      question: "What is the difference between Vedic and Western astrology?",
      answer: "Vedic astrology (Jyotish) uses the sidereal zodiac, which is anchored to the actual positions of the constellations, while Western astrology uses the tropical zodiac, anchored to the seasons. Vedic astrology also leans heavily on the Moon and the Nakshatras (lunar mansions), uses divisional charts such as the Navamsa for specific life areas, and times events through the Vimshottari dasha system.",
      icon: <Moon className="w-5 h-5 text-blog-gold" />
    },
    {
      question: "How accurate does my birth time need to be?",
      answer: "Birth time accuracy matters down to the minute because it determines your Lagna (rising sign), which changes roughly every two hours. An error of even ten minutes can shift the Lagna or move planets across house boundaries, which changes the chart interpretation. If your recorded time is uncertain, a trained astrologer can perform birth time rectification using past life events to narrow it down.",
      icon: <ClockIcon className="w-5 h-5 text-blog-gold" />
    },
    {
      question: "How much should a Vedic astrology consultation cost in Ahmedabad?",
      answer: "Vedic astrology consultation pricing in Ahmedabad varies widely based on the practitioner's training, consultation depth, and follow-up support. Our rates are listed on the services page.",
      icon: <IndianRupee className="w-5 h-5 text-blog-gold" />
    },
    {
      question: "Are online Vedic astrology consultations as effective as in-person?",
      answer: "Yes, when the practitioner is well trained and the format is structured. A chart is a chart regardless of whether it is read across a desk or across a video call. What matters is birth detail accuracy, sufficient consultation time (usually 60 to 90 minutes for a first reading), and whether the astrologer walks you through the chart logic. Online consultations also make trained Jyotish practitioners from Delhi, Varanasi, and elsewhere accessible to Ahmedabad clients who could not otherwise reach them.",
      icon: <Laptop className="w-5 h-5 text-blog-gold" />
    },
    {
      question: "What is the K.N. Rao Institute and why does it matter?",
      answer: "The K.N. Rao Institute refers to the school of Vedic astrology established under the late Shri K.N. Rao, one of the most respected Jyotish teachers of the modern era and a pioneer in formalising astrology education at the Bharatiya Vidya Bhavan in Delhi. Training in this lineage means rigorous grounding in Parashari classical texts, dasha analysis, and predictive techniques verified against real client charts over decades. The lineage matters because it is a quality control mechanism: it tells you the practitioner studied under accountable teachers in a documented tradition rather than learning piecemeal from books and the internet.",
      icon: <LandmarkIcon className="w-5 h-5 text-blog-gold" />
    }
  ]}
  ctaClosingLine="Good questions bring clarity. Clarity leads to the right guidance. We're here to help you on that journey."
  ctaTitle="We're here to help you on that journey"
  ctaSubtitle="Get clarity on your life path, challenges, and opportunities."
  ctaButtonText="Book a Consultation"
  ctaButtonHref="/services/vedic-astrology"
/>
```

Note: lucide imports use renamed exports (Clock as ClockIcon, Landmark as LandmarkIcon) to avoid shadowing the existing Clock import already in BlogPost.tsx hero section. Verify lucide-react exports IndianRupee. If not, fall back to Banknote or Coins and surface in status doc.

## frontmatter.faqs sync

The frontmatter.faqs array (which feeds FAQPage JSON-LD) MUST exactly match the questions and answers in the new ClosingSection invocation above. Verify identical wording. If frontmatter.faqs differs from the ClosingSection items, update frontmatter.faqs to match. The schema and the visible page must show identical content.

## Validation gates

- npm run build green
- Prerender count = 42
- dist HTML for the post contains:
  - All schemas preserved (BlogPosting + FAQPage + Person)
  - "A Closing Thought" rendered exactly ONCE
  - "Frequently Asked Questions" rendered exactly ONCE in visible content
  - All 6 question texts rendered exactly ONCE each in visible content
  - "We're here to help you on that journey" rendered
  - "Book a Consultation" button rendered
- Count test: grep -c "How do I find a good Vedic astrologer in Ahmedabad" in dist HTML — must equal 2 (once in visible FAQ, once in JSON-LD). Not 3 or 4.
- grep -n "—" content/blog/finding-a-vedic-astrologer-in-ahmedabad.mdx → empty
- grep -rn "—" src/ → empty
- /, /services, /planets/jupiter, /zodiac/aries, /blog all render without regression

## Commit + PR

Single commit:
"feat(blog): closing section with interactive FAQ and CTA, deduplicate

- Build modular ClosingSection composing ClosingThought + FAQSection + FinalCTA
- Build reusable FAQItem accordion with per-question icon support
- Remove inline FAQ accordion from BlogPost.tsx
- Remove duplicate closing-thought and FAQ prose from MDX body
- Wire ClosingSection into MDXProvider components map
- Append single ClosingSection invocation at end of post body"

Push to origin/feature/blog-detail-fixes-v4.

gh pr create --base staging --head feature/blog-detail-fixes-v4 --title "feat(blog): closing section with FAQ and CTA, deduplicate"

Stop after Vercel preview URL captured. Do not merge.

## Status report

scripts/blog-detail-fixes-v4-status.md with: list of new component files with line counts, BlogPost.tsx diff summary (FAQ removal), MDX rewrite line counts (deletions and additions), validation gate results, Vercel preview URL.

Halt only on hard failures. Otherwise execute end to end.