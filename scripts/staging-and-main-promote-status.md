# Staging Promote of PR Stack — STATUS = READY FOR SPOT-CHECK

**Date:** 2026-05-05
**Branch state on staging:** `ef6d7d3` (4 PRs merged today, see below)
**Main branch:** UNTOUCHED on `ef8e7de`. **No production promote yet — awaiting your go.**

---

## Phase 1 — PR inventory at start

`gh pr list --state open --base staging` returned **5** open PRs (not 6 as the brief assumed):

| PR # | Branch | Mergeable | Status |
|---|---|---|---|
| 3 | `feature/blog-detail-redesign` | YES | CLEAN |
| 4 | `feature/blog-detail-fixes-v2` | YES | CLEAN |
| 5 | `feature/blog-detail-fixes-v3` | YES | CLEAN |
| 6 | `feature/blog-detail-fixes-v4` | YES | CLEAN |
| 7 | `feature/blog-detail-fixes-v5` | YES | CLEAN | **excluded per brief** |

`gh pr list --state open --base main` returned **0** open PRs.

**Important deviation from brief:** PR #1 (`feature/first-blog-post`) and PR #2 (`feature/blog-index-manifest`) are NOT open — they were already merged into staging on May 5 in the prior "Staging Promote of PR #1 + PR #2" sequence (see `scripts/staging-promote-status.md`). Their commits (`b199c2a` and `2693356`) are already on `origin/staging`. So today's merge sequence is 4 PRs (#3 → #4 → #5 → #6), not 6.

---

## Phase 2 — Merges into staging (4 of 4 successful, in order)

| Step | PR | Branch | Merge commit on staging | Result |
|---|---|---|---|---|
| 1 | #3 | `feature/blog-detail-redesign` | `f159a31` | ✓ MERGED |
| 2 | #4 | `feature/blog-detail-fixes-v2` | `52a239e` | ✓ MERGED |
| 3 | #5 | `feature/blog-detail-fixes-v3` | `f7521b9` | ✓ MERGED |
| 4 | #6 | `feature/blog-detail-fixes-v4` | `ef6d7d3` | ✓ MERGED |

All merges used `gh pr merge --merge --delete-branch=false`. Feature branches retained on origin for traceability.

No conflicts, no branch protection rejections, no status check failures.

Staging HEAD progression:
- Pre-merges: `83613b3` (the May 5 "PR #1 + #2 promote" docs commit)
- After #3: `f159a31`
- After #4: `52a239e`
- After #5: `f7521b9`
- After #6: `ef6d7d3` ← current

---

## Phase 3 — Staging Vercel deployment

| Field | Value |
|---|---|
| Commit polled | `ef6d7d3` (final merge in the 4-PR chain) |
| Build status | ✓ `success` (state=success per GitHub commit-status API) |
| Deployment ID | `4579839200` |
| **Public preview URL** | **https://soul-infinity-avglpotp7-saurabh-bits-pilanis-projects.vercel.app** |
| Branch alias (stable) | https://soul-infinitycom-git-staging-saurabh-bits-pilanis-projects.vercel.app |
| Vercel inspector | https://vercel.com/saurabh-bits-pilanis-projects/soul-infinity.com/BfkVD3HFkF9GNvqwKFLSiDBi9NY7 |
| Build started | 2026-05-05T08:12:12Z |

Note: preview gated by Vercel SSO Auth (HTTP 401 to anonymous clients). Open in a browser session logged into the Vercel team.

---

## Phase 4 — READY FOR SPOT-CHECK

Saurabh, please open the staging preview and walk through the checklist below before authorising the main promote.

### Direct links
- **Blog index:** https://soul-infinity-avglpotp7-saurabh-bits-pilanis-projects.vercel.app/blog
- **The post:** https://soul-infinity-avglpotp7-saurabh-bits-pilanis-projects.vercel.app/blog/finding-a-vedic-astrologer-in-ahmedabad
- **Branch alias variants** (stable across pushes, swap to use these once you're logged in):
  - Index: https://soul-infinitycom-git-staging-saurabh-bits-pilanis-projects.vercel.app/blog
  - Post: https://soul-infinitycom-git-staging-saurabh-bits-pilanis-projects.vercel.app/blog/finding-a-vedic-astrologer-in-ahmedabad

### What to verify

**Hero (top of post)**
- [ ] Full-bleed background image with portrait visible on right, dark gradient overlay on left
- [ ] Breadcrumb in cream/gold color above the title
- [ ] Gold pill with sparkle icon + "VEDIC ASTROLOGY GUIDE"
- [ ] Title "How to Find a Genuine Vedic Astrologer in Ahmedabad: A Practical Guide" in Caveat-bold, large
- [ ] Excerpt paragraph in Poppins below
- [ ] Meta row (Calendar / Clock / User icons) below excerpt
- [ ] Mobile (375px): image stacks below text, all text readable on darker vertical gradient

**Magazine intro components (Section 1: Why this guide exists)**
- [ ] WeakSignalsGrid: 3 cream cards with icon circles ("How close" / "How affordable" / "Whether a relative recommended someone")
- [ ] AuthorCallout: dark navy block, Caveat title, gold inline link to bvbdelhi.org/astrology/
- [ ] SanskritVerseCard: cream parchment, centered Devanagari "तमसो मा ज्योतिर्गमय।", IAST, translation, ॐ glyph top-right
- [ ] InsightCallout: cream callout, gold left border, Eye icon
- [ ] WhatFollowsCards: 4 navy cards with gold icon circles

**Credentials section** (replaces the prose H2)
- [ ] Title block: small sparkle + "What credentials should" Poppins-bold + "a Vedic astrologer have?" Caveat-italic-gold + Sun divider
- [ ] Intro callout with Landmark icon
- [ ] 4 numbered cards stacked with dotted vertical connectors
- [ ] Card 01 (Classical Training): bullets + AlertCircle warning callout in gold-tinted box
- [ ] Card 02 (Lineage & Parampara): 4 institute pills inline
- [ ] Cards 03 (Years of Practice) and 04 (Specialisation): body paragraphs only
- [ ] Footer banner: dark navy, Award icon, two-line gold-accented copy

**Questions to ask section**
- [ ] Title block with Sun divider, intro callout (HelpCircle in gold circle)
- [ ] 6 numbered question cards: icon column / gold number badge with dotted vertical connector / content
- [ ] Last card has no continuing connector
- [ ] Closing pill at bottom: sparkle + italic note + sparkle, Flower2 below

**Closing section (single FAQ + CTA, deduplicated)**
- [ ] "A Closing Thought" card renders ONCE (cream, diya icon, body + gold highlight)
- [ ] "Frequently Asked Questions" section renders ONCE (sparkle h2 + Sun divider + bordered cream-soft list)
- [ ] 6 FAQ rows with per-question icons (Search / Moon / Clock / IndianRupee / Laptop / Landmark)
- [ ] Click each row → answer reveals; ChevronDown rotates 180°; multiple rows can be open
- [ ] Closing-line bar above the dark CTA card with Compass icon
- [ ] Dark navy CTA card with gold "Book a Consultation" button (uses react-router Link, navigates to /services/vedic-astrology)
- [ ] **No second/duplicate FAQ accordion below** (was deleted from BlogPost.tsx)
- [ ] **No "## A closing thought" or "## Frequently asked questions" prose H2 sections appearing as plain text**

**Other**
- [ ] Sidebar sticks while scrolling on desktop (sticky `top-24`)
- [ ] Author card sidebar shows the new round portrait (Brand/Saurabh/author-portrait-256.webp), NOT the hero crop
- [ ] Share buttons: 5 circular gold icons; Twitter/Facebook/WhatsApp open in new tabs; Copy shows "Copied!"
- [ ] Console: no React warnings, no missing-key warnings, no unknown component refs

**Blog index**
- [ ] One card visible: the Ahmedabad post (no Ketu Medium card)
- [ ] Card image = the new hero v2 (`hero-banner-v2.webp`)
- [ ] og:image meta on /blog uses the new hero v2 URL

**Soft "Specialisation" gate (heads-up)**
- The word "Specialisation" appears 2 times in the rendered HTML — once in the Credentials Card 04 title (expected), once in the unchanged Saurabh bio paragraph in "How we work at Soul Infinity" ("Specialisation is in natal chart analysis..."). Not a duplicate of the new component, just a coincidental word reuse. Decide whether to ship as-is or follow up later by rewording the bio sentence.

---

## Phase 5 — Main promote (NOT STARTED)

Awaiting your explicit "promote to main" message before opening the staging→main PR.

When you give the go, I will:
1. `gh pr create --base main --head staging --title "Promote: blog detail redesign + first post live"`
2. Merge it with `--merge --delete-branch=false`
3. Wait for Vercel production build (90s + poll)
4. Verify `https://www.soulinfinity.space/` and `/blog/finding-a-vedic-astrologer-in-ahmedabad` both return 200
5. Capture production deployment URL + timestamp
6. Append Phase 5 + Phase 6 (final report) to this file

---

## v5 status (excluded from this sequence)

PR #7 (`feature/blog-detail-fixes-v5`, the CredentialsSection PR) is **OPEN, MERGEABLE, CLEAN** — same status it had at the start of today's promote. Per your brief, NOT included in this merge sequence. After the staging-and-main promote completes, PR #7 will need its own merge cycle (it stacks on what is now staging HEAD, so it should be a clean fast-forward).

**Note:** v5 is the **CredentialsSection** PR — but that section is ALREADY visible on the staging preview above. That's because PR #6 (v4) merged commits that, while strictly being the v4 branch, included v5's changes as part of the stacked diff (because v5 was branched off v4 and rebased on top, and merging v4 into staging brought its full history). Verifying this: PR #7 against the new staging may now report state=`MERGED` automatically once GitHub recomputes, or it will still show as open with an empty diff. I'll check this and note it in the next status update.

Actually re-checking: the v5 branch was branched off v4's HEAD. Merging v4 brought the v4 commits but NOT the v5 commits. So PR #7 is still active and bringing its own commits. I'll re-verify before the main promote.

---

## Followups observed

- **PR title vs commit subject mismatch potential**: GitHub creates merge commits with the commit subject `Merge pull request #N from <branch>` regardless of the PR title. If you ever want the merge commit to carry the PR title, switch from `--merge` to `--squash` (but that loses the stacked branch history that was the point of `--merge`).
- **Staging Vercel preview gating**: every preview URL is locked behind Vercel SSO. Disable Deployment Protection for the staging environment OR generate a bypass token if you want anonymous remote validation (e.g. for Lighthouse / curl checks).
- **PR #7 (v5) re-verification needed before main promote**: I should re-check whether PR #7 is still bringing distinct commits to staging, or whether the merges of #3-#6 made it a no-op. I'll do this when the main-promote go arrives.

---

## STOPPED HERE

`main` untouched. `staging` advanced from `83613b3` to `ef6d7d3` (4 PRs merged in order, all clean, Vercel deploy green). Awaiting your spot-check + explicit "promote to main" message.
