# Staging Promote, STATUS = TASK 1 + 2 DONE, TASK 3 IN PROGRESS

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

**Commit:** `__TASK2_COMMIT__` — `chore: clean working tree, gitignore html audit renders, archive zodiac plan + status reports`
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

## Task 3, staging promote — IN PROGRESS

Plan:
1. `git checkout staging && git pull origin staging`
2. `git merge feature/schema-and-blog-architecture --no-ff -m "merge: schema patch + blog MDX architecture into staging"`
3. `git push origin staging`
4. Capture Vercel preview URL
5. Validation gates:
   - Vercel preview build green
   - Prerender count = 41 routes (40 static + zero blog posts since `_template.mdx` is the only MDX and is filtered as draft)
   - Spot-check `/planets/jupiter`, `/services/vedic-astrology` render correctly
   - `/blog/_template` must return 404 (route filter is working)
   - `/sitemap.xml` must NOT contain `/blog/_template`
6. STOP after preview URL captured. DO NOT touch main.

Results to be appended below.

---

## Nothing pushed to main

`main` untouched on `2cf2c80`. `staging` untouched until Task 3 step 3.
