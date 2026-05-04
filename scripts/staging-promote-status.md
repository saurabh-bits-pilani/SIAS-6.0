# Staging Promote, STATUS = ALL THREE TASKS DONE, STOPPED AT MAIN GATE

**Branch:** `feature/schema-and-blog-architecture` (off `main` @ `6f78e0a`)
**Date:** 2026-05-04

---

## Task 1, em-dash fix in scripts/prerender.mjs:184 — DONE

**Commit:** `3950071` — `fix: remove em-dash from prerender error format string`
**Pushed:** yes, to `origin/feature/schema-and-blog-architecture`

### What changed
```diff
-    const suffix = r.status === 'ok' ? '' : `  — ${r.error}`;
+    const suffix = r.status === 'ok' ? '' : `  - ${r.error}`;
```

### Gate (revised per user Option A)
- Original gate: `grep -rn "—" scripts/ src/` (returned 163 hits, halted)
- Revised gate: `grep -rn "—" src/` → empty ✓
- Aligns with CLAUDE.md hard-rule scope (`src/` only).

### Parked items, NOT shipped on this branch
163 em-dashes remain in `scripts/` across 18 files. Three are rendered to user-visible output and need a separate review pass before any sweep:

| Output | Source | Hits | Risk |
|---|---|---|---|
| `dist/llms.txt` | `scripts/generate-llms.mjs` DESCRIPTIONS map | 29 | AI crawlers (ChatGPT, Perplexity, Claude) read this; em-dash → comma changes citation text |
| `dist/robots.txt` | `scripts/generate-robots.mjs` template literal | 5 | comment-header only, but it's the production robots.txt |
| build manifest | `scripts/planets-mars-manifest.json` | 1 | data-field string |

The remaining ~128 em-dashes live in code comments, log strings, and past-work `*-status.md` reports. Not user-visible. Out of scope for this promote.

---

## Task 2, working-tree triage — DONE

**Commit:** `b48a94d` — `chore: clean working tree, gitignore html audit renders, archive zodiac plan + status reports`
**Pushed:** yes, to `origin/feature/schema-and-blog-architecture`

### Decisions taken
| File / pattern | Decision | Reason |
|---|---|---|
| `corner_house_logo_pack.zip` (1MB binary) | DELETE | unrelated client-asset zip, doesn't belong in repo |
| `scripts/seo-audit-2026-05-02.html` | DELETE + gitignore | regenerable from `.md` source; heavyweight HTML render |
| `scripts/seo-keyword-research-2026-05-02.html` | DELETE + gitignore | same |
| `scripts/*.html` | gitignored going forward | prevent future audit HTML renders from polluting commits |
| `Zodiac_Pages_Master_Plan-03-may.md` | MOVED to `docs/plans/` | planning doc, not source code; archived under canonical plans dir |
| 6 × `scripts/upload-planets-*.mjs` | KEPT, committed | one-shot upload scripts, useful for re-running R2 uploads |
| 3 × `scripts/upload-zodiac-*.mjs` | KEPT, committed | same |
| 6 × `scripts/planets-*-manifest.json` | KEPT, committed | manifests produced by upload scripts; reference for R2 contents |
| 5 × `scripts/*-status.md` (template-fix, schema-blog, staging-promote, seo-audit, seo-keyword-research) | KEPT, committed | past-work status reports; historical record |
| `.gitignore` | MODIFIED | added `scripts/*.html` rule |
| `docs/plans/Zodiac_Pages_Master_Plan-03-may.md` | NEW | archived plan |

### Working tree after commit
Clean. No untracked files.

---

## Task 3, staging promote — DONE

**Merge commit:** `1536a80` — `merge: schema patch + blog MDX architecture into staging` (no-ff)
**Pushed:** yes, `6f78e0a..1536a80 staging -> staging`
**Files changed in merge:** 27 (4810 insertions, 23 deletions)

### Vercel deployment
- **Status:** ✓ success (state=success per GitHub `commits/.../statuses` API)
- **Public preview URL:** https://soul-infinity-l7kgw92m8-saurabh-bits-pilanis-projects.vercel.app
- **Branch alias:** https://soul-infinitycom-git-staging-saurabh-bits-pilanis-projects.vercel.app
- **Vercel inspector:** https://vercel.com/saurabh-bits-pilanis-projects/soul-infinity.com/FMr86XHCK4ijf55n9jgm27bb6eyx

### Validation gates

| Gate | Source | Result |
|---|---|---|
| Local `npm run build` green | this machine | ✓ exits 0 |
| Prerender count = 41 routes | local build log | ✓ `Prerendered 41 routes.` (40 static + 1 `/zodiac/aries` from prior branch; `_template.mdx` filtered as draft → 0 blog posts) |
| `/blog/_template` not prerendered | local `dist/blog/_template/` | ✓ absent |
| `/blog/_template` not in `dist/sitemap.xml` | `grep -c '_template' dist/sitemap.xml` | ✓ 0 hits |
| `/blog/_template` not in `dist/llms.txt` / `dist/llms-full.txt` | grep both | ✓ no hits |
| `/planets/jupiter` HTML rendered | `dist/planets/jupiter/index.html` | ✓ 130156 bytes |
| `/services/vedic-astrology` HTML rendered | `dist/services/vedic-astrology/index.html` | ✓ 46343 bytes |
| Sitemap `<loc>` count | local `dist/sitemap.xml` | 40 (excludes `/404`, expected) |
| Vercel build success | GitHub API `commits/1536a80/statuses` | ✓ state=success |

### Why no remote spot-checks
Vercel Authentication (project-level SSO) is enabled on this preview, so anonymous `curl` against `/planets/jupiter`, `/services/vedic-astrology`, `/blog/_template`, and `/sitemap.xml` all return HTTP 401 with the SSO login page. The local build runs the exact same `scripts/prerender.mjs` + `scripts/generate-sitemap.mjs` Vercel runs, so the local validation is dispositive for prerender content. Visual spot-checks require a logged-in browser session.

If you want anonymous remote validation, either (a) disable Vercel Authentication on this project for previews, (b) generate a protection-bypass token under Project Settings → Deployment Protection, or (c) just open the URL above in a browser where you're already logged in.

---

## Stopped here per instruction

`main` untouched on `2cf2c80`. `staging` is now at `1536a80` and Vercel-deployed. Awaiting your call to either (a) merge `staging → main` for production promote, or (b) park here for further review.
