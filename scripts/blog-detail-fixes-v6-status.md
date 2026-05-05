# Blog Detail Fixes v6 — STATUS = SHIPPED TO PRODUCTION

**Date:** 2026-05-05
**Cycle:** 1 of 2 (v6 — duplicate CTA removal). Cycle 2 (v7 — CredentialsSection) NOT started; awaiting Saurabh's "proceed to v7" message.

---

## What changed

`src/pages/BlogPost.tsx`: -41 lines (1 file, 0 insertions, 41 deletions).

Deleted:
- The `<section className="my-12 bg-blog-navy rounded-2xl p-8 md:p-12 ...">` block containing:
  - h2 "Want a Personalised Astrology Reading?"
  - 2 supporting paragraphs
  - "Book a Consultation" Link → /services/vedic-astrology
  - Decorative cosmic SVG via `{ctaDecorLarge}`
- The `ctaDecorLarge` const declaration (now unused; would have failed `noUnusedLocals` in tsconfig.app.json)

Preserved:
- `FinalCTA` from `ClosingSection` rendered via MDX (canonical bottom CTA)
- Sidebar dark CTA card ("Want Personalised Astrology Guidance?")
- `ArrowRight` lucide import (still used by sidebar CTA)
- All schemas, all other layout

---

## Branch + PR sequence

| Step | Detail |
|---|---|
| Base | `main` at `00933c3` (post v3-v6 main promote) |
| Feature branch | `feature/blog-detail-fixes-v6` |
| Feature commit | **`5309c15`** — `fix(blog): remove duplicate CTA banner from BlogPost.tsx` |
| Pushed | ✓ to `origin/feature/blog-detail-fixes-v6` |
| Feature PR | **#9** → `feature/blog-detail-fixes-v6` → `staging` |
| Vercel preview | ✓ success — https://soul-infinity-9d33i68m2-saurabh-bits-pilanis-projects.vercel.app (Inspector: https://vercel.com/saurabh-bits-pilanis-projects/soul-infinity.com/7WvFCMuiFTWU3WbNsP9MrEGgNj91) |
| Merge to staging | ✓ `gh pr merge 9 --merge --delete-branch=false` → staging at **`68e209a`** |
| Staging Vercel | ✓ success (Inspector: https://vercel.com/saurabh-bits-pilanis-projects/soul-infinity.com/BZZ5UBrM2n3cm4pavoKnC4V9iC4h) |
| Promote PR | **#10** → `staging` → `main` (`Promote v6: remove duplicate CTA`) |
| Merge to main | ✓ `gh pr merge 10 --merge --delete-branch=false` → main at **`5c8aa9c`** |
| Production Vercel | ✓ success (Inspector: https://vercel.com/saurabh-bits-pilanis-projects/soul-infinity.com/BAowMiAxfSKJ33NgQVgB1WRQ3JUz) |
| Main HEAD progression | `00933c3` → `5c8aa9c` |

---

## Validation gate results

### Pre-commit (local build)
| # | Gate | Result |
|---|---|---|
| 1 | "Want a Personalised Astrology Reading" in dist HTML = 0 | ✓ 0 |
| 2 | "We're here to help you on that journey" in dist HTML = 1 | ✓ 1 |
| 3 | "Book a Consultation" in dist HTML = 2 | ✓ 2 actual matches (FinalCTA + sidebar) — both on same line of minified HTML so `grep -c` returns 1; verified via `grep -oE` |
| 4 | Schemas preserved (BlogPosting + FAQPage + Person) | ✓ 1 hit each |
| 5 | Prerender count = 42 | ✓ |
| 6 | `grep -rn "—" src/` empty | ✓ |

### Production verification (live https://www.soulinfinity.space)
| Check | Result |
|---|---|
| Homepage HTTP 200 | ✓ |
| Post URL HTTP 200 | ✓ (89,779 bytes; was 92,638 before — ~3KB savings) |
| "Want a Personalised Astrology Reading" on production | ✓ 0 hits (banner is gone) |
| "here to help you on that journey" (FinalCTA) on production | ✓ 1 hit |
| "Book a Consultation" actual occurrences via `grep -oE` | ✓ 2 (FinalCTA + sidebar) |
| `"@type":"BlogPosting"` on production | ✓ 1 |
| `"@type":"FAQPage"` on production | ✓ 1 |
| `"@type":"Person"` on production | ✓ 1 |

---

## Live URLs

- **Production homepage:** https://www.soulinfinity.space/
- **Production post:** https://www.soulinfinity.space/blog/finding-a-vedic-astrologer-in-ahmedabad

---

## Cycle 2 (v7) NOT started

Per brief: "After each cycle finishes its main promote, REPORT BACK to Saurabh and STOP. Do NOT auto-start the next cycle. Saurabh will say 'proceed to v7' or similar before v7 begins."

V7 (CredentialsSection magazine component) is queued. The CredentialsSection component already exists on `feature/blog-detail-fixes-v5` (PR #7 still open) but per the brief, v7 will be a fresh clean-off-main branch (`feature/blog-detail-fixes-v7`), NOT a re-use of PR #7. PR #7 should probably be closed once v7 lands to avoid stale-branch confusion. Flagging as a followup.

Awaiting "proceed to v7" message.
