# Blog Detail Fixes v11 — HowWeWorkSection magazine component

Branch off latest origin/main (whatever main is at execution time, post v10 merge). New branch: feature/blog-detail-fixes-v11. Target staging. Single clean PR off main, NOT stacked.

Autonomous. Halt only on hard build failures. Status doc: scripts/blog-detail-fixes-v11-status.md.

## v11 goal

Replace the prose-only "How Soul Infinity approaches consultations" / "How we work at Soul Infinity" section in the Ahmedabad blog post with a magazine-style component matching the approved mockup: handwritten title with sun divider, intro callout with hands/star icon, three primary cards (Our Training & Tradition, Format, Approach) each with circular icon + title + body, two compact info strip cards (Languages, Location), CTA banner with meditator illustration and "Vedic astrology services page" gold pill button, dark closing footer line.

## v11 component to build

### File: src/components/blog/HowWeWorkSection.tsx

Self-contained, props-driven, no internal state.

Props:
- titleLine1: string (e.g. "How we work")
- titleLine2: string (e.g. "at Soul Infinity")
- introIcon: LucideIcon (e.g. HandHeart or Sparkles)
- introTitle: string (e.g. "This is the only section in this guide that is directly about our practice.")
- introBody: string (e.g. "The criteria above apply whether or not you eventually consult with us.")
- primaryItems: array of { icon: LucideIcon, title: string, body: string } (3 items: Training, Format, Approach)
- infoItems: array of { icon: LucideIcon, title: string, body: string } (2 items: Languages, Location)
- ctaIntro: string (e.g. "If you would like to book a consultation, you can reach us through our")
- ctaLinkText: string (e.g. "Vedic astrology services page")
- ctaLinkHref: string (e.g. "/services/vedic-astrology")
- ctaOutro: string (e.g. "or find us on Google.")
- closingLine1: string (e.g. "Clarity. Tradition. Trust.")
- closingLine2: string (e.g. "That is how we work at Soul Infinity.")
- closingIcon: LucideIcon (e.g. ShieldCheck)

### v11 layout

Outer wrapper: section className my-12 md:my-16 relative overflow-hidden.

Decorative motifs (low-opacity, pointer-events-none):
- Top-left lotus: Flower2 lucide w-32 h-32 absolute top-4 left-4 text-blog-gold/10
- Top-right sun-mandala: Sun lucide (or Flower2 again) w-32 h-32 absolute top-4 right-4 text-blog-gold/10

Title block (centered, mb-10):
- Top sparkle: Sparkles lucide w-4 h-4 mx-auto text-blog-gold mb-3
- titleLine1: font-poppins font-bold text-3xl md:text-5xl text-blog-ink text-center
- titleLine2: font-caveat italic text-3xl md:text-5xl text-blog-gold text-center mt-1, with two Sparkles lucide flanking left and right at w-5 h-5 text-blog-gold (use a flex container with title centered and sparkles either side)
- Sun divider below: flex items-center justify-center gap-4 mt-4
  - h-px w-16 bg-blog-gold/40
  - Sun lucide w-4 h-4 text-blog-gold
  - h-px w-16 bg-blog-gold/40

Intro callout:
- bg-blog-cream-soft border border-blog-gold/30 rounded-2xl p-5 md:p-6 mb-8 flex items-start gap-4
- Icon circle: w-14 h-14 flex-shrink-0 bg-blog-gold rounded-full flex items-center justify-center
  - introIcon inside, w-7 h-7 text-white
- Content (flex-1):
  - introTitle: font-poppins font-bold text-blog-ink text-base md:text-lg mb-1
  - introBody: font-poppins text-blog-ink/75 text-sm md:text-base leading-relaxed

Primary cards (3 cards, full-width, vertically stacked):

Container: space-y-5 mb-8

Each card: bg-blog-cream-soft border border-blog-gold/25 rounded-2xl p-5 md:p-6 flex items-start gap-5 md:gap-6 relative

LEFT column (icon, fixed width):
- w-16 md:w-20 flex-shrink-0 flex flex-col items-center
- Icon circle: w-14 h-14 md:w-16 md:h-16 bg-blog-cream rounded-full flex items-center justify-center border border-blog-gold/30
  - Card icon inside, w-7 h-7 md:w-8 md:h-8 text-blog-navy

RIGHT column (content, flex-1):
- Title: font-poppins font-bold text-blog-ink text-xl md:text-2xl mb-2 leading-tight
- Body: font-poppins text-blog-ink/80 text-sm md:text-base leading-relaxed (allow line breaks if body contains \n — split body string on \n and render each segment in a new paragraph with mt-2 spacing between paragraphs)

Info strip (2 compact cards in a row):

Container: grid grid-cols-1 md:grid-cols-2 gap-4 mb-8

Each compact card: bg-blog-cream-soft border border-blog-gold/25 rounded-2xl p-5 flex items-start gap-4

LEFT (icon):
- w-12 h-12 flex-shrink-0 bg-blog-cream rounded-full flex items-center justify-center border border-blog-gold/30
  - Item icon inside, w-6 h-6 text-blog-gold

RIGHT (content, flex-1):
- Title: font-poppins font-bold text-blog-ink text-lg mb-1
- Body: font-poppins text-blog-ink/80 text-sm md:text-base leading-relaxed

CTA banner (with illustration):

Outer wrapper: bg-blog-cream-soft border border-blog-gold/30 rounded-2xl p-6 md:p-8 mb-8 flex items-start gap-6 md:gap-8 relative overflow-hidden:

LEFT (illustration, hidden on small mobile):
- hidden sm:flex w-24 md:w-32 flex-shrink-0 h-24 md:h-32 bg-blog-navy rounded-full items-center justify-center relative
- Inside the navy circle: a meditator/lotus illustration. Use stacked Lucide icons:
  - Background: small Moon lucide w-6 h-6 text-blog-cream/60 absolute top-3 right-3
  - Background: 3-4 Sparkles lucide scattered at low opacity around the circle (w-3 h-3 text-blog-gold/50 with absolute positioning)
  - Foreground: User lucide w-12 h-12 text-blog-gold (acts as the seated meditator)
- If a User icon doesn't visually match a meditator well, alternative: combine User + a small Flower2 below it or use a single Stars lucide. Component author's call. Document choice in status doc.

RIGHT (CTA content, flex-1):
- ctaIntro: font-poppins text-blog-ink text-base md:text-lg leading-relaxed mb-3
- Link button (react-router-dom Link, NOT a plain a tag — must navigate via SPA):
  - to={ctaLinkHref}
  - className "inline-flex items-center gap-2 bg-blog-gold hover:bg-blog-gold-bright text-blog-navy px-5 py-2.5 rounded-full font-semibold font-poppins transition-colors text-sm md:text-base"
  - Children: ctaLinkText + ArrowRight lucide w-4 h-4
- ctaOutro: font-poppins text-blog-ink/75 text-sm md:text-base leading-relaxed mt-3
- Decorative swirl in bottom-right corner of the CTA wrapper: Sparkles lucide w-5 h-5 text-blog-gold/40 absolute bottom-4 right-6

Closing line (compact bar):
- bg-blog-cream-soft border border-blog-gold/30 rounded-2xl p-4 md:p-5 flex items-center gap-4 relative
- Icon circle (left): w-10 h-10 flex-shrink-0 bg-blog-cream rounded-full flex items-center justify-center border border-blog-gold/30
  - closingIcon inside, w-5 h-5 text-blog-gold
- Text block (flex-1):
  - closingLine1: font-poppins font-bold text-blog-ink text-base md:text-lg leading-relaxed
  - closingLine2: font-poppins text-blog-gold font-semibold text-base md:text-lg leading-relaxed

## v11 wiring

In src/pages/BlogPost.tsx (or MdxBlogComponents registry file if that exists):
- Add HowWeWorkSection import
- Add HowWeWorkSection to the mdxComponents map alongside the existing components

## v11 MDX content rewrite

Edit content/blog/finding-a-vedic-astrologer-in-ahmedabad.mdx.

Find the existing "## How Soul Infinity approaches consultations" section (heading text approximate; may also read "How we work at Soul Infinity" or similar). The section currently contains plain prose describing the practice format, training, languages, location, and a closing CTA-style sentence.

Replace the entire section (from the H2 heading through the last paragraph before the next H2 — or through the end of the post if this is the last section) with this MDX:

```mdx
import { Landmark as LandmarkIconV11, Clock as ClockIconV11, Sparkles as SparklesIconV11, MessageCircle, Globe as GlobeIconV11, MapPin, ShieldCheck as ShieldCheckIconV11, HandHeart } from 'lucide-react';

<HowWeWorkSection
  titleLine1="How we work"
  titleLine2="at Soul Infinity"
  introIcon={HandHeart}
  introTitle="This is the only section in this guide that is directly about our practice."
  introBody="The criteria above apply whether or not you eventually consult with us."
  primaryItems={[
    {
      icon: LandmarkIconV11,
      title: "Our Training & Tradition",
      body: "Our training is in the K.N. Rao Institute lineage, working primarily within the Parashari tradition with Brihat Parashara Hora Shastra as the foundational text. Specialisation is in natal chart analysis, Vimshottari dasha timing, marriage matching with full Navamsa and ashtakoota analysis, and career timing.\nWe do not claim equal depth in every Jyotish sub-specialism."
    },
    {
      icon: ClockIconV11,
      title: "Format",
      body: "Consultations run 60 to 90 minutes, available online over video and in person in Ahmedabad.\nYou receive a recording of the session and a written summary follow-up within a few days. Follow-up questions over the next few weeks are part of the consultation, not a separate paid item."
    },
    {
      icon: SparklesIconV11,
      title: "Approach",
      body: "Chart logic is explained throughout the reading, in terms of specific houses, lords, aspects, and dasha periods. Remedies are discussed only when classically indicated, and never as the headline of the consultation.\nThere is no high-pressure sale of gemstones, yantras, or puja packages. Classical text references are available on request."
    }
  ]}
  infoItems={[
    {
      icon: MessageCircle,
      title: "Languages",
      body: "English, Hindi, and Gujarati."
    },
    {
      icon: MapPin,
      title: "Location",
      body: "Based in Ahmedabad, in the Khodiyar and Adani Shantigram area."
    }
  ]}
  ctaIntro="If you would like to book a consultation, you can reach us through our"
  ctaLinkText="Vedic astrology services page"
  ctaLinkHref="/services/vedic-astrology"
  ctaOutro="or find us on Google."
  closingIcon={ShieldCheckIconV11}
  closingLine1="Clarity. Tradition. Trust."
  closingLine2="That is how we work at Soul Infinity."
/>
```

Notes on lucide imports:
- All five aliased imports (LandmarkIconV11, ClockIconV11, SparklesIconV11, GlobeIconV11, ShieldCheckIconV11) avoid shadowing existing imports already in the MDX file (Landmark, Clock, Sparkles, Globe, ShieldCheck are likely already imported by earlier components).
- HandHeart should exist in lucide-react. If it doesn't, fallback to Heart or Sparkles.
- MessageCircle, MapPin, ArrowRight should all exist.
- GlobeIconV11 imported but not used in the MDX shown above (Languages uses MessageCircle in this version); leave the import if you want to swap it later, or omit it.

Double-check: the MDX includes Gujarati word-of-mouth context "English, Hindi, and Gujarati." This is allowed because it's referencing the language NAME inside English content, not Gujarati script in the content body. Per the project's hard rule "no Gujarati", that rule refers to Gujarati script content, not English-language references to Gujarati as a language. Confirm by re-reading the rule. If in doubt, keep the word "Gujarati" — it has appeared in the original MDX prose all along.

After this MDX block, if there is content after this section it stays unchanged. If this is the final section of the post, no further content follows.

## v11 steps

1. git fetch origin && git checkout main && git pull origin main
2. Create branch feature/blog-detail-fixes-v11 off main
3. Build the HowWeWorkSection component file
4. Wire into mdxComponents map
5. Rewrite the MDX section
6. npm run build → must be green
7. Validation gates:
   - Prerender count = 42
   - dist HTML for the post contains:
     - "How we work" rendered (count ≥ 1)
     - "at Soul Infinity" rendered (count ≥ 1; likely 2-3 hits because "Soul Infinity" appears in author bio + footer + this section title)
     - "This is the only section in this guide that is directly about our practice." rendered ONCE
     - "Our Training & Tradition" rendered ONCE
     - "K.N. Rao Institute lineage" rendered ONCE in this new component (may also appear elsewhere — verify rendering by visual inspection if count is 2)
     - "60 to 90 minutes" rendered ≥ 1 (may already exist in earlier sections — verify visually)
     - "Khodiyar and Adani Shantigram" rendered ONCE
     - "Vedic astrology services page" rendered ≥ 1 (the CTA link text)
     - "Clarity. Tradition. Trust." rendered ONCE
     - "That is how we work at Soul Infinity." rendered ONCE
   - All schemas preserved (BlogPosting, FAQPage, Person — 1 each)
   - grep -n "—" content/blog/finding-a-vedic-astrologer-in-ahmedabad.mdx → empty
   - grep -rn "—" src/ → empty
   - grep -rn "—" src/components/blog/HowWeWorkSection.tsx → empty
   - /, /services, /planets/jupiter, /zodiac/aries, /blog all render without regression
8. Single commit:
   "feat(blog): add HowWeWorkSection magazine component"
   Body: "Build HowWeWorkSection with title block, intro callout, 3 primary practice cards (Training, Format, Approach), 2 info-strip cards (Languages, Location), CTA banner with services-page link, closing trust line. Replace prose 'how Soul Infinity approaches consultations' section in Ahmedabad post with the new component."
9. Push: git push -u origin feature/blog-detail-fixes-v11
10. PR: gh pr create --base staging --head feature/blog-detail-fixes-v11 --title "feat(blog): HowWeWorkSection magazine component"
11. Wait for Vercel preview build, capture URL
12. Merge PR to staging: gh pr merge <number> --merge --delete-branch=false
13. Sleep 90s, verify staging Vercel deployment success
14. Open staging-to-main PR: gh pr create --base main --head staging --title "Promote v11: HowWeWorkSection magazine component"
15. Merge staging-to-main PR: gh pr merge <new number> --merge --delete-branch=false
16. Sleep 90s, verify production Vercel deployment success
17. curl -s https://www.soulinfinity.space/blog/finding-a-vedic-astrologer-in-ahmedabad | grep -c "Khodiyar and Adani Shantigram" → must be ≥ 1 (the new component is live in production)
18. Write scripts/blog-detail-fixes-v11-status.md with merge commit hashes, deployment timestamps, validation results, list of any lucide icon fallbacks used (especially HandHeart fallback if needed), and which icon was used for the meditator inside the navy circle.
19. STOP. Report v11 completion.

## Failure protocol

Any merge conflict → STOP, report which PR and the conflict, do not force-merge.
Any Vercel deployment failure → STOP, capture error, do not proceed.
Any validation gate fail → STOP, write failure to status doc, do not proceed.
Any em-dash check fail → STOP, fix em-dash, re-run gates, do not commit until clean.