# Blog Detail Fixes v7 — STATUS = SHIPPED TO PRODUCTION

**Date:** 2026-05-05
**Cycle:** 2 of 2 (v7 — CredentialsSection magazine component). Both cycles of the v6+v7 brief are now complete.

---

## What changed

### New file
| File | Lines | Purpose |
|---|---|---|
| `src/components/blog/CredentialsSection.tsx` | 257 | Magazine-style credentials block: title (Poppins-bold + Caveat-italic-gold + Sun divider) → intro callout (Landmark in gold-tinted circle) → 4 numbered cards with conditional `bullets` / `inlineList` / `body` / `warning` per card → dark navy footer banner with Award icon and constellation SVG decoration. |

### Modified files
- `src/components/blog/MdxBlogComponents.tsx`: registry now exposes 8 components (added `CredentialsSection`).
- `content/blog/finding-a-vedic-astrologer-in-ahmedabad.mdx`: replaced credentials prose section (H2 + 6 paragraphs) with one `<CredentialsSection ... />` JSX block + a deduplicated lucide import. Net diff +55 / -12 in MDX file.

### Card variants exercised
| # | Title | Variant slots used |
|---|---|---|
| 01 | Classical Training | `bullets` + `warning` (AlertCircle "ancient texts" cautionary) |
| 02 | Lineage & Parampara | `inlineList` (4 institute pills with icons) + `body` |
| 03 | Years of Practice on Real Charts | `body` only |
| 04 | Specialisation | `body` only |

---

## Lucide icon resolution

All 14 icons confirmed exported by `lucide-react`. **No fallbacks used.**

- Component-internal: `Sparkles`, `Sun`, `Flower2`, `LucideIcon` type
- MDX-passed: `Landmark`, `BookOpen as BookOpenIcon`, `Users as UsersIcon`, `Calendar as CalendarIcon`, `Target`, `AlertCircle`, `Award`, `GraduationCap`, `Sparkle` (singular), `Flower` (singular)

The brief flagged `Sparkle` and `Flower` singulars + `GraduationCap` as uncertain. All confirmed available; no substitutions to `Star`, `Flower2`, or `BookOpen` were needed.

### Duplicate-import handling
The brief's MDX import line listed `Landmark`, but `Landmark` was already imported on line 35 of the MDX file (the intro section's `AuthorCallout` import). Acorn rejects duplicate top-level identifier bindings even when both bindings target the same module. **Pre-emptively removed `Landmark` from the new import** — the line 35 binding remains in scope at the credentials position; build green on first try (no parse failure this time, unlike the v5 attempt).

---

## Branch + PR sequence

| Step | Detail |
|---|---|
| Base | `main` at `5c8aa9c` (post v6 main promote) |
| Feature branch | `feature/blog-detail-fixes-v7` |
| Feature commit | **`1701942`** — `feat(blog): add CredentialsSection magazine component` (3 files changed, 310 insertions, 12 deletions) |
| Pushed | ✓ to `origin/feature/blog-detail-fixes-v7` |
| Feature PR | **#11** → `feature/blog-detail-fixes-v7` → `staging` |
| Vercel preview | ✓ success — https://soul-infinity-ibky7rc8j-saurabh-bits-pilanis-projects.vercel.app (Inspector: https://vercel.com/saurabh-bits-pilanis-projects/soul-infinity.com/6cMtAaeQRbHrHLwZzTk6Up5pD43L) |
| Merge to staging | ✓ `gh pr merge 11 --merge --delete-branch=false` → staging at **`00311a6`** |
| Staging Vercel | ✓ success (Inspector: https://vercel.com/saurabh-bits-pilanis-projects/soul-infinity.com/3oYjmM5z6tGmMnyhNnp1H42JC1o5) |
| Promote PR | **#12** → `staging` → `main` (`Promote v7: CredentialsSection magazine component`) |
| Merge to main | ✓ `gh pr merge 12 --merge --delete-branch=false` → main at **`c5d74b3`** |
| Production Vercel | ✓ success (Inspector: https://vercel.com/saurabh-bits-pilanis-projects/soul-infinity.com/2LKYeEYu7nGBSKafVuFgGv8uXuEG) |
| Main HEAD progression | `5c8aa9c` → `c5d74b3` |

---

## Validation gate results

### Pre-commit (local build)
| Gate | Result |
|---|---|
| `npm run build` green | ✓ exit 0 (clean on first try) |
| Prerender count = 42 | ✓ |
| Schemas preserved | ✓ BlogPosting, FAQPage, Person all 1 hit each |
| "What credentials should" in dist HTML = 1 | ✓ |
| "Classical Training" in dist HTML = 1 | ✓ |
| "Lineage" rendered (HTML-encoded `Lineage &amp; Parampara`) | ✓ 1 |
| "Years of Practice on Real Charts" = 1 | ✓ |
| "Specialisation" | ⚠ 2 hits — see soft-gate note below |
| "Credentials bring trust" = 1 | ✓ |
| "K.N. Rao Institute" appears | ✓ 6 hits across post |
| `grep -n "—"` MDX | ✓ 0 |
| `grep -rn "—" src/` | ✓ empty |
| `grep -c "—" src/components/blog/CredentialsSection.tsx` | ✓ 0 |
| No regressions on `/`, `/services`, `/planets/jupiter`, `/zodiac/aries`, `/blog` | ✓ all 42 routes prerendered green |

### Production verification (live https://www.soulinfinity.space)
| Check | Result |
|---|---|
| Homepage HTTP 200 | ✓ |
| Post URL HTTP 200 | ✓ (105,124 bytes; was 89,779 after v6 — ~15KB increase from new component HTML) |
| **Brief gate 17: "Classical Training" ≥ 1 on production** | ✓ **1** (the new component is live) |
| "What credentials should" on production | ✓ 1 |
| "Lineage" on production | ✓ 1 |
| "Years of Practice on Real Charts" on production | ✓ 1 |
| "Specialisation" on production | 2 (see soft-gate note) |
| "Credentials bring trust" on production | ✓ 1 |
| "K.N. Rao Institute" on production | ✓ 6 hits |
| `"@type":"BlogPosting"` on production | ✓ 1 |
| `"@type":"FAQPage"` on production | ✓ 1 |
| `"@type":"Person"` on production | ✓ 1 |

### Soft-gate note: "Specialisation" 2 hits
The brief listed "Specialisation rendered ONCE" as a gate. Actual: 2 hits in production HTML.
- Hit 1: the new `CredentialsSection` Card 04 title `<h3>Specialisation</h3>` — expected.
- Hit 2: the unchanged "How we work at Soul Infinity" prose paragraph: _"Brihat Parashara Hora Shastra as the foundational text. **Specialisation** is in natal chart analysis, Vimshottari [dasha](/planets/saturn) timing..."_

The second occurrence is a coincidental word reuse in a section the brief did NOT instruct me to modify. This was flagged in the v5 status doc back on 2026-05-05 and Saurabh acknowledged it then. Treating as gate-pass-with-clarification rather than a hard failure. If you want strict single-occurrence semantics, reword the bio sentence (e.g. "Our focus is in natal chart analysis...").

---

## Live URLs

- **Production homepage:** https://www.soulinfinity.space/
- **Production post:** https://www.soulinfinity.space/blog/finding-a-vedic-astrologer-in-ahmedabad

---

## v6 + v7 cycle complete

Both cycles of the v6+v7 brief are now live on production:
- **v6** (PRs #9 → #10, main `5c8aa9c`) — duplicate CTA banner removed
- **v7** (PRs #11 → #12, main `c5d74b3`) — CredentialsSection magazine component live

PR #7 (`feature/blog-detail-fixes-v5`, the original CredentialsSection PR) is now obsolete — same code shipped via this fresh-off-main PR #11/#12 instead. Should be closed to avoid stale-branch confusion.

---

## Followups parked

1. **Close stale PR #7** (`feature/blog-detail-fixes-v5`) — superseded by v7 fresh-off-main approach. Component code is identical; just close the PR.
2. **"Specialisation" word collision** — if you want strict 1× count in HTML, reword the unchanged Saurabh bio sentence in "How we work at Soul Infinity" section. Cosmetic; SEO unaffected.
3. **`scripts/generate-llms.mjs` auto-discovery** — still requires manual two-line edit per new blog post.
4. **TOC anchor extraction** — still client-side `useEffect`; should migrate to build-time remark plugin.
5. **Read time** — still hardcoded "8 min read"; should compute from word count.
6. **Brand assets registry** (`src/data/brand-assets.ts`) — author portrait URL still hardcoded in BlogPost.tsx; centralise as more assets get added.
7. **PR title vs merge commit subject mismatch** — `--merge` uses GitHub's default subject; switch to `--squash` if you want the PR title carried into the commit subject (loses stacked branch history).
8. **Vercel SSO on previews** — anonymous probes return 401; consider Deployment Protection bypass token if you want anonymous Lighthouse / curl validation against staging.
