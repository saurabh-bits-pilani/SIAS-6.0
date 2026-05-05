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

**Credentials section** — currently rendering as PLAIN PROSE (the H2 "What credentials should a Vedic astrologer have?" + 6 paragraphs about classical training / lineage / years of practice / specialisation). The magazine-style `CredentialsSection` component is in PR #7 (v5), which is excluded from this promote. So:
- [ ] Plain-prose H2 + 6 paragraphs render via the typography theme (Kalam-bold gold-underlined H2, Poppins body)
- [ ] No magazine cards, no Award icon footer banner — those will arrive in the next promote when PR #7 lands

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

**Soft "Specialisation" gate (heads-up — applies to v5/PR #7, not this promote)**
- When PR #7 lands, the word "Specialisation" will appear 2 times in the rendered HTML — once in the new Credentials Card 04 title, once in the unchanged Saurabh bio paragraph in "How we work at Soul Infinity" ("Specialisation is in natal chart analysis..."). Coincidental word reuse, not a duplicate. Decide whether to ship as-is or follow up later by rewording the bio sentence.

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

## v5 status (excluded from this sequence) — re-verified

PR #7 (`feature/blog-detail-fixes-v5`, the CredentialsSection PR) state on origin **after** the 4-PR staging promote:
- State: OPEN
- Distinct commits to bring into staging: **2** (`e6743b8` feat + `b20e1d0` docs)
- Mergeable: UNKNOWN (GitHub recomputing post-staging-update; will resolve to MERGEABLE shortly)
- Per brief, NOT included in this merge sequence. Will need its own merge cycle to ship the CredentialsSection.

---

## Followups observed

- **PR title vs commit subject mismatch potential**: GitHub creates merge commits with the commit subject `Merge pull request #N from <branch>` regardless of the PR title. If you ever want the merge commit to carry the PR title, switch from `--merge` to `--squash` (but that loses the stacked branch history that was the point of `--merge`).
- **Staging Vercel preview gating**: every preview URL is locked behind Vercel SSO. Disable Deployment Protection for the staging environment OR generate a bypass token if you want anonymous remote validation (e.g. for Lighthouse / curl checks).
- **PR #7 (v5) re-verification needed before main promote**: I should re-check whether PR #7 is still bringing distinct commits to staging, or whether the merges of #3-#6 made it a no-op. I'll do this when the main-promote go arrives.

---

## STOPPED HERE → RESUMED

`main` was untouched. Saurabh confirmed go for production promote (accepted the duplicate CTA visible bug as a known issue to be fixed in v6). Phase 5 executed below.

---

## Phase 5 — Main promote (executed 2026-05-05T08:30Z)

### Pre-promote staging state verified
`origin/staging` HEAD = `66e59e4` (last 8 commits include all 4 merge commits from earlier today: `f159a31` PR #3 → `52a239e` PR #4 → `f7521b9` PR #5 → `ef6d7d3` PR #6, plus the 2 docs commits `d1d12c0` and `66e59e4`).

### PR opened + merged
| Field | Value |
|---|---|
| PR # | **8** |
| URL | https://github.com/saurabh-bits-pilani/SIAS-6.0/pull/8 |
| Title | `Promote: blog detail magazine redesign + first post live` |
| Base | `main` |
| Head | `staging` |
| Merge type | `--merge --delete-branch=false` (kept staging branch alive) |
| Merge commit on main | **`00933c3`** |
| Main HEAD progression | `ef8e7de` → `00933c3` |

### Vercel production build
| Field | Value |
|---|---|
| Build status | ✓ `success` (state=success per GitHub commit-status API) |
| Inspector | https://vercel.com/saurabh-bits-pilanis-projects/soul-infinity.com/7vNegBv2NBQ7tVkG7wFUgeuhLYoS |
| Build polled | `00933c3` (the staging→main merge commit) |

### Live verification (anonymous curl, public production)
| Check | Result |
|---|---|
| `https://www.soulinfinity.space/` | ✓ HTTP 200, content-type `text/html; charset=utf-8`, age=0 (fresh) |
| `https://www.soulinfinity.space/blog/finding-a-vedic-astrologer-in-ahmedabad` | ✓ HTTP 200, content-type `text/html; charset=utf-8`, age=0 |
| Post HTML size | 92,638 bytes |

### Schema verification on production HTML
| Schema | Count |
|---|---|
| `"@type":"BlogPosting"` | ✓ 1 |
| `"@type":"FAQPage"` | ✓ 1 |
| `"@type":"Person"` | ✓ 1 |

### Other production sanity checks
| Check | Result |
|---|---|
| `hero-banner-v2.webp` in HTML (og:image + twitter:image + hero `<img>`) | ✓ 3 hits |
| `Brand/Saurabh/author-portrait-256.webp` in HTML (Author card sidebar) | ✓ 1 hit |
| `font-caveat` present in HTML | ✓ 6 hits |
| `prose-blog` typography class present | ✓ 1 hit |
| `/blog/_template` absent (draft filter intact) | ✓ 0 hits |

### Known issue carried into production
**Duplicate CTA banner at the bottom of the post.** The old inline "Want a Personalised Astrology Reading?" banner from the v3 redesign coexists with the new `FinalCTA` rendered inside `ClosingSection` from v4. Saurabh accepted this for now; will be fixed in PR #9 (v6) immediately after this promote.

### Live URLs
- **Production homepage:** https://www.soulinfinity.space/
- **Production post (now live):** https://www.soulinfinity.space/blog/finding-a-vedic-astrologer-in-ahmedabad
- **Vercel production inspector:** https://vercel.com/saurabh-bits-pilanis-projects/soul-infinity.com/7vNegBv2NBQ7tVkG7wFUgeuhLYoS

---

## Phase 6 — Status (FINAL)

### What is now live on www.soulinfinity.space
- Blog detail page redesign (full magazine treatment from PRs #3, #4, #5, #6)
- First real blog post: "How to Find a Genuine Vedic Astrologer in Ahmedabad"
- Hero v2 (full-bleed, gradient overlay, Caveat-bold title), magazine intro components (WeakSignalsGrid + AuthorCallout + SanskritVerseCard + InsightCallout + WhatFollowsCards), QuestionsToAsk section, ClosingSection (ClosingThought + FAQSection + FinalCTA)
- Schema stack: BlogPosting + FAQPage + Person all verified live
- 42 routes total prerendered (was 41 pre-blog-post)

### What is NOT live yet (carried in PR #7, awaiting separate cycle)
- CredentialsSection magazine component — still on `feature/blog-detail-fixes-v5`. The credentials section currently renders as plain prose on production. PR #7 has 2 distinct commits to bring; mergeable, clean.

### Followups parked
1. **Duplicate CTA banner fix (v6 PR)** — top priority, will be addressed in next brief
2. **CredentialsSection promote (v5/PR #7)** — clean cycle once v6 lands
3. **`Specialisation` word collision** — when v5 lands, the word will appear 2× in production HTML (new card title + unchanged Saurabh bio prose); reword bio sentence if you want strict 1× count
4. **PR title vs merge commit subject mismatch** — `--merge` uses GitHub's default subject `Merge pull request #N from <branch>`; switch to `--squash` if you want PR title carried into the commit subject (loses stacked branch history)
5. **Vercel SSO on previews** — anonymous probes return 401; consider Deployment Protection bypass token if you want anonymous Lighthouse / curl validation against staging
6. **`scripts/generate-llms.mjs` auto-discovery** — still requires manual two-line edit per new blog post (DESCRIPTIONS map + SECTIONS array). Tracked from earlier sessions.
7. **TOC anchor extraction** — still client-side `useEffect`; should migrate to build-time remark plugin for SEO.
8. **Read time** — still hardcoded "8 min read"; should compute from word count during prebuild manifest generation.

### Working tree right now
On `main` locally is `ef8e7de` (stale). I should `git pull` on next return to sync. No changes to commit or push for this phase.

### Stopped here per brief
**Do NOT start v6 fix in the same execution.** Awaiting Saurabh's v6 brief separately.
