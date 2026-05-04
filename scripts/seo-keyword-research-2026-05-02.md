# Soul Infinity Keyword Opportunity Report

**Date:** 2026-05-02
**Page audited:** `https://www.soulinfinity.space/`
**Production commit:** `49d480d` (Phase 1 + Phase 2 merged)
**Skills run:** `/seo content`, `/seo dataforseo` (fallback to web research), `/seo geo`

> **Data source caveat:** DataForSEO MCP is not installed in this environment, so volume and difficulty numbers are **estimates** derived from SERP competitive density, professional site count in top 10, presence of directories (Justdial / Sulekha / Wire), AI Overview activity, and general India astrology market knowledge. They are directionally reliable for prioritization, but install DataForSEO MCP for exact numbers before committing budget.
>
> See `scripts/seo-audit-2026-05-02.md` for the full pre-Phase-2 vs post-Phase-2 score breakdown. This report adds the keyword research layer on top.

---

## 0. Carry-over scores (from `/seo content` and `/seo geo`)

| Audit | Now | Δ vs pre-Phase-1 |
|---|---|---|
| `/seo content` E-E-A-T | **86 / 100** | +22 |
| `/seo geo` GEO readiness | **84 / 100** | +26 |

**Content quality (now):** Experience 21/25, Expertise 22/25, Authoritativeness 20/25, Trustworthiness 23/25. AI citation readiness 84/100. Largest content gap: **no Wikipedia entry** for Saurabh Jain (highest GEO leverage), and no visible "Last updated" date stamp on the homepage.

**GEO (now):** Citability 22/25 (21 pages now in 134-167 word answer-block format), Structural readability 17/20 (question H2s + FAQ), Multi-modal 11/15 (no video/infographics), Authority 16/20 (Person sameAs ✓ but no Wikipedia/Reddit), Technical 18/20 (SSR + llms.txt + AI crawler allowlist ✓; missing RSL 1.0).

---

## 1. Keyword opportunity matrix (7 seed keywords + 3 discovery)

| # | Keyword | Est. Vol (IN/mo) | Difficulty | Intent | SI fit | Opportunity |
|---|---|---|---|---|---|---|
| 1 | vedic astrologer ahmedabad | 200-500 | Medium | Local commercial | Direct (homepage, cosmic-guide) | **HIGH** |
| 2 | best astrologer in ahmedabad | 500-1,500 | Med-High | Local commercial | Direct (cosmic-guide; "best" qualifier in title) | **HIGH** |
| 3 | jyotish ahmedabad | 100-300 | Medium | Local commercial (vernacular) | Partial (English-only site) | MEDIUM |
| 4 | kundli reading online | 5,000-20,000 | **HIGH** | National tool/free utility | Weak (consultation site, not free tool) | LOW |
| 5 | sade sati 2026 | 1,000-5,000 | Medium | Informational, time-sensitive | Partial (SaturnPage covers Sade Sati but no 2026 angle) | **HIGH** |
| 6 | manglik dosha remedies | 2,000-10,000 | Medium | Informational + consult | **Direct** (MarsPage H2: "What are the remedies for Mangal Dosha?") | **HIGH** |
| 7 | vedic astrology consultation | 1,000-3,000 | High | Service | Direct (services category page) | MED-HIGH |
| 8 | sade sati pisces 2026 | 200-800 | Medium | Info, peak audience now | Partial (SaturnPage Sade Sati H2 generic) | **VERY HIGH** |
| 9 | bhrigu nandi nadi consultation | 100-500 | **LOW** | Niche service | Direct (BNN service detail page) | **VERY HIGH** |
| 10 | saurabh jain astrologer | 10-50 | Low (brand) | Brand search | Direct (cosmic-guide) but **brand awareness gap** | **HIGH** (Wikipedia priority) |

### Difficulty signals (qualitative)

- **HIGH:** Top 10 dominated by 10+-year-old national authority sites (AstroSage, Astroyogi, Astrotalk, mPanchang) with deep tools/calculators.
- **Medium:** Top 10 mix of regional astrologer sites + 1-2 directories (Justdial, Sulekha, Wire). Beatable with stronger Service schema, fresher content, and brand authority.
- **Low:** Niche topics where the top 10 contains course/training PDFs, Quora answers, and a few specialist sites. Consultation-positioned content can rank quickly.

---

## 2. Per-keyword analysis

### 2.1 `vedic astrologer ahmedabad` — Direct fit, beatable
**Top 10 today:** Ashish Somani, Ramesh Khaitan, Astro Shyamsundar, Suchita, The Wire listicle, Justdial directory, Santoshi Krupa, Vyasji, Sulekha, Sulekha (again).
**Pricing benchmark from SERP:** Ashish Somani kundli ₹2,500, Astrolozyy ₹1,551 starting (15-min free intro). **Soul Infinity's "Free to Rs. 2,100" is competitive at the lower-mid end of the market** with a free entry point.
**Soul Infinity ranking factors now in place:** Person `sameAs` (5 URLs) + LocalBusiness schema with NAP + Service+Offer with priceRange + AggregateRating 4.9/40 → schema package is **stronger than most competitors** in the SERP.
**Gaps to close:** (a) Build a few quality backlinks from Ahmedabad lifestyle/wellness directories; (b) Get listed on The Wire / Sulekha "best astrologer" listicles (outreach play); (c) Wikipedia for Saurabh Jain.

### 2.2 `best astrologer in ahmedabad` — Same competitive set, higher commercial intent
Same SERP set as #2.1 with addition of Astro Sanjay Guru, Predection.com.
**Action:** Target this with the `/cosmic-guide` (about Saurabh) page. Already has good Person schema. Consider a dedicated `/best-astrologer-ahmedabad` landing page with explicit "best" comparison table (mahadasha + gemstone + dosha specialisms by years of experience).

### 2.3 `jyotish ahmedabad` — Vernacular search, partial fit
3,139 astrologers listed on Sulekha for this term. Vernacular Hindi/Gujarati audience.
**Soul Infinity gap:** content is English-only. CLAUDE.md hard rule: **"NO Gujarati anywhere"** — so ranking for Gujarati-speaking search intent is structurally limited. Hindi (Devanagari with IAST) is allowed; consider adding a Hindi `/jyotish-ahmedabad` page with Devanagari + IAST + English mantra blocks.

### 2.4 `kundli reading online` — Tool-dominated, deprioritize
SERP top 10 = AstroSage, Astrotalk, mPanchang, AstroYogi, mykundali, AstroManch, Mangalbhawan, Vinay Bajrangi, KundliGPT (AI). All are free-tool sites with 5-15 years of authority and embedded calculators.
**Recommendation:** Don't fight this query directly. Instead target the **service-positioning long-tail**: "kundli reading by certified astrologer in ahmedabad", "professional kundli analysis online" — where Soul Infinity's K.N. Rao credentials and personal consultation differentiate from the bulk free-tool sites.

### 2.5 `sade sati 2026` — Time-sensitive, **HIGH OPPORTUNITY**
**SERP today:** Prokerala, Ishvaram blog, SmartPuja blog, AstroSage Pisces sub-page, Karmakanda, AstroSage Capricorn, Vocal Media, AstroSage Aries, Starstell blog, AstroSage Aquarius.
**2026 specifics from SERP:** Pisces (Meena) is in **peak Janma Shani** in 2026; Aries is in starting phase; Aquarius is exiting. Saturn in Pisces until 2027-Jun-02.
**Soul Infinity gap:** SaturnPage has H2 "What are the remedies for Saturn and Sade Sati?" but **no 2026-specific update**, no Pisces/Aries/Aquarius split, no "is your Sade Sati ending?" angle.
**Action (high ROI):** Add a 2026 transit update section to `/planets/saturn` AND consider a dedicated `/dosha/sade-sati-2026` page following the same Phase 2 template (134-167 word answer block + question H2s + visible remedies + HowTo schema for Saturn mantra). The brief's seo-fundamentals + seo-content patterns already shipped make this a 1-day rollout.

### 2.6 `manglik dosha remedies` — **Direct fit, action ready**
**SERP top 10:** AstroSage, Haridwar Rudraksha, Pandits Near Me, Kerala Marriage, Prayag Pandits, Indastro, Astrowala, AstroVed, Coral, Acharya Satvinder. National sites, none Ahmedabad-specific.
**Soul Infinity advantage:** MarsPage now has H2 **"What are the remedies for Mangal Dosha?"** (Phase 2 win) AND the editorial section underneath has 3 paragraphs of authentic content. This is **already optimized** at the H2 level; just needs a 134-167 word self-contained answer block at the section opening to make it AI-citation-ready.
**Action:** Verify the MarsPage Mangal Dosha remedies H2 section opens with a clear 134-167 word "Mangal Dosha remedies in Vedic astrology are…" definition block. If not, add one. (Phase 2 only added the answer block to editorialSections[0].paragraphs[0] — the remedies section is editorialSections[6] or similar; rolling out the 134-167 word pattern to every section's first paragraph is the next iteration.)

### 2.7 `vedic astrology consultation` — National competition
SERP includes Vedanet, Astronupur, Jeffrey Armstrong, Komilla, AstroVed, Vinay Bajrangi. Mostly international Vedic astrologers + India national. Not local.
**Action:** Soul Infinity ranks better for the **local + service** combo `vedic astrology consultation ahmedabad` than the bare national term. The category page `/services/vedic-astrology` already targets this. Make sure the page H1 includes Ahmedabad: it does (categoryName) but verify the meta-title front-loads "Vedic Astrology Consultation in Ahmedabad" rather than a generic phrasing.

### 2.8 `sade sati pisces 2026` — **VERY HIGH** (peak 2026 audience, lower competition)
**SERP top 10:** digitalkarmakanda, AstroSage Pisces, Starstell, SmartPuja, Online Jyotish, Rashibyte, Online Jyotish (rashifal), SmartPuja (Pisces horoscope), Indastro, The Vedic Horoscope.
**Audience size right now:** every Pisces-Moon native in India is googling this in 2026. Saturn sits on natal Moon → peak phase → maximum search interest.
**Soul Infinity action (highest ROI of this report):** Create `/dosha/sade-sati-pisces-2026` (or `/planets/saturn/sade-sati-pisces-2026`) following the Phase 2 template:
- 134-167 word answer block opening: "Shani Sade Sati for Pisces in 2026 is the peak Janma Shani phase, in which Saturn transits the Moon sign of Pisces (Meena rashi) until 2027-Jun-02..."
- Question H2s: What is Sade Sati?, How long does Pisces Sade Sati last?, What are the remedies for Pisces Sade Sati?, Which gemstone is recommended?, What does the 2026 Saturn transit mean for Pisces?
- HowTo schema for the Shani Beej mantra (already exists on SaturnPage, can reuse pattern)
- Visible "How to Chant" steps block (Phase 2 pattern)
- FAQPage schema with 5 Pisces-specific Q&As
- Service schema linking back to a "Book a Sade Sati guidance session" CTA
This single page captures the **timely** keyword + retains evergreen value (Aries Sade Sati 2027, Aquarius post-Sade-Sati 2026 are sister-page candidates).

### 2.9 `bhrigu nandi nadi consultation` — **VERY HIGH** (low competition, niche fit)
**SERP top 10:** bhrigunandinadi.com (course site), Udemy course, scribd PDFs, Shatabhisha blog, Astrolearn course, Sithars blog, Sunstar, scribd, Saptarishi shop, Quora answer.
**Insight:** The top 10 is dominated by **course/training material**, not consultation services. Soul Infinity's BNN service detail page is one of the few practitioner sites in this niche.
**Soul Infinity action:** The Phase 2 BNN intro rewrite (137 words) already opens with a clean "Bhrigu Nandi Nadi (BNN) is one of the rarest and most precise branches…" definition. **Add a Person.knowsAbout reinforcement** for "Bhrigu Nandi Nadi" (it's already there in schema-entities.ts:171). Build 2-3 backlinks via Quora answers under the existing "What is Bhrigu Nandi Nadi astrology?" question (currently top 10).

### 2.10 `saurabh jain astrologer` — Brand awareness gap
**SERP today:** Returns nothing about Saurabh Jain personally. K.N. Rao Institute results dominate. Even the brand-name search doesn't surface Saurabh Jain on page 1.
**Implication:** ChatGPT and other LLMs have no entity record for Saurabh Jain. This blocks AI citation even when Soul Infinity's content is excellent.
**Action (highest authority leverage):** From the prior `/seo geo` report — Wikipedia entry is the single biggest GEO move. Create a stub Wikipedia page citing K.N. Rao Institute training, M.Tech/MBA/M.Phil credentials, BNN specialisation, and Soul Infinity's Google Reviews. Even a thin Wikipedia entry triggers entity recognition in LLMs (47.9% of ChatGPT citations come from Wikipedia per Ahrefs Dec 2025).

---

## 3. Discovered long-tail patterns (from SERP related-search and PAA scanning)

| Pattern | Examples | Soul Infinity action |
|---|---|---|
| **Pricing-intent** | "vedic astrologer ahmedabad fees", "kundli reading fees online" | Now-shipped Service+Offer with `priceRange "Free to Rs. 2,100"` directly answers this. Surface a visible "Pricing" line on each service detail page. |
| **By-relationship-need** | "best astrologer for marriage in ahmedabad", "for love", "for business" | Create 3 relationship-specific landing pages (marriage / business / health) layering existing content. |
| **By-system** | "kp astrology consultation online", "parashari jyotish reading", "BNN astrologer" | Already covered by 5 Vedic service detail pages. Update titles to include the system + Ahmedabad. |
| **Time-sensitive 2026** | "sade sati 2026", "shani transit 2026 pisces", "saturn transit 2026 effects" | **Highest ROI cluster.** Create 1 hub page `/sade-sati-2026` + 3 sub-pages by affected rashi. |
| **Vernacular-bridge** | "manglik dosha", "kundli milan", "rashi parivartan" | Mix of English transliterations are already used in Phase 2 copy. Add Devanagari + IAST in `<span lang="hi">` for body terms (template already supports this, see Parashari `hindiPhrase`). |

---

## 4. Prioritized action list

Ranked by **ROI = (estimated traffic gain × probability of ranking) / effort**:

| # | Action | Effort | Estimated traffic / month | Time to impact |
|---|---|---|---|---|
| 1 | **Wikipedia entry for Saurabh Jain** | High (1 week, requires citations) | Indirect (unlocks AI citation across all queries) | 4-8 weeks for indexing |
| 2 | **Create `/dosha/sade-sati-pisces-2026` page** (Phase 2 template) | Medium (1 day) | 200-800/mo, peak through 2027-Jun | 2-6 weeks |
| 3 | **Roll out 134-167 word answer block to every editorialSection.paragraphs[0]** (not just [0]) on planet pages | Medium (3-5 days, ~50 sections) | 500-2000/mo across long-tail | 4-8 weeks |
| 4 | **Add visible "Pricing" line to each service page** showing the new "Free to Rs. 2,100" range | Low (1 hour, Service-detail template change) | 100-300/mo (pricing-intent searches) | 2-4 weeks |
| 5 | **Outreach to The Wire / Sulekha listicle inclusion** for "best astrologer ahmedabad" | Medium (2-3 weeks of email outreach) | 500-1500/mo if included | 6-12 weeks |
| 6 | **Reddit presence** (10 thoughtful answers in r/astrology, r/Vedic, r/india) | Medium (ongoing, 30 min/answer) | Unlocks Perplexity citation (46.7% from Reddit) | 4-12 weeks |
| 7 | **Add `## Key facts` block to llms.txt** with quotable statistics | Low (15 minutes) | Marginal but cumulative AI citation lift | Immediate |
| 8 | **Add visible "Last updated" date stamp** to homepage and pillar pages | Low (1 hour) | Small SERP CTR / freshness lift | 2-4 weeks |
| 9 | **3 comparison tables** (gemstone-by-planet, mahadasha durations, 12-houses summary) | Medium (2-3 days) | AI Overview citation lift | 4-12 weeks |
| 10 | **Hindi `/jyotish-ahmedabad` page** with Devanagari + IAST | Medium (1 day) | 100-300/mo Gujarati-speaking audience (Hindi proxy) | 4-8 weeks |

---

## 5. Schema-side opportunities surfaced by keyword research

These keywords surface schema gaps not visible in the per-page audit:

1. **Pricing transparency** is a search signal in this niche. Now that we emit `priceRange "Free to Rs. 2,100"` in Service.offers, render that string visibly in the page DOM as well so Google Rich Results test confirms visible match.
2. **Time-sensitive Saturn transits** (Sade Sati 2026, Shani Mahadasha periods) are heavy informational queries. Consider adding `Event` schema for upcoming Saturn transit milestones (Pisces transit ending 2027-Jun-02 is an Event).
3. **By-rashi pages** (`/zodiac/aries-sade-sati`, `/zodiac/pisces-sade-sati`) would each justify their own `Article` + `FAQPage` schemas. Phase 2 template makes this a templated rollout.

---

## 6. What needs DataForSEO before committing budget

This research used SERP-density inference, not exact volume. Before allocating paid effort (e.g. content production budget for the Sade Sati 2026 cluster), confirm with DataForSEO MCP:

- `/seo dataforseo volume` for the 10 keywords above with `location_code` for India (2356) and `language_code=en` (and `hi` for Hindi variants)
- `/seo dataforseo difficulty` for the same set
- `/seo dataforseo trends "sade sati 2026"` for Pisces/Aries seasonality (peak month)
- `/seo dataforseo competitors www.soulinfinity.space` to see what overlapping keywords competing Ahmedabad astrologers rank for
- `/seo dataforseo ai-mentions "vedic astrologer ahmedabad"` to measure current AI visibility baseline

To install the DataForSEO extension: `./extensions/dataforseo/install.sh` (per the skill's prerequisite docs).

---

## 7. Files

- **This report:** `scripts/seo-keyword-research-2026-05-02.md`
- **Prior consolidated audit (page + content + GEO scores):** `scripts/seo-audit-2026-05-02.md`
- **Phase 1 status:** `scripts/seo-quick-wins-followup-status.md`
- **Phase 2 status:** `scripts/seo-phase2-status.md`

To produce a PDF of this report: `pandoc scripts/seo-keyword-research-2026-05-02.md -o scripts/seo-keyword-research-2026-05-02.html --standalone` then print the HTML to PDF from any browser. (No LaTeX engine on this machine for direct PDF.)
