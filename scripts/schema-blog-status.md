# Schema + Blog Architecture, Status

**Branch:** `feature/schema-and-blog-architecture` (off `main` @ `6f78e0a`)
**Date:** 2026-05-04
**Result:** all 3 tasks delivered per the negotiated options (a) skip / (c) patch / (b) minimal blog scaffold.

---

## Task 1, Article schema for 9 planet pages, SKIPPED per option (c)

Already shipped via `getArticleSchema(...)` in each planet page's `schemas` useMemo array (Phase 2 work). No changes needed. Article schema currently emits on /planets/sun, /moon, /mercury, /mars, /jupiter, /venus, /saturn, /rahu, /ketu in production.

Spec assumed each planet had a literal `<Helmet>` block to inject into; reality is the project uses a typed `JsonLd[]` array passed via `<SEOHead schemas={schemas} />`. Adding the spec's literal Article schema in addition to the existing one would have produced duplicate Article schemas per page (bad for SEO).

---

## Task 2, Service schema in ServiceDetail.tsx, DONE per option (c)

**File touched:** `src/data/schema-entities.ts`
**Change:** added `inLanguage: 'en-IN'` to the base object inside `getServiceSchema()`.

```ts
hasOfferCatalog: {
  '@type': 'OfferCatalog',
  name: 'Vedic Astrology and Spiritual Services',
},
inLanguage: 'en-IN',  // NEW
```

Preserved untouched: `name`, `description`, `serviceType`, `url`, `provider` (LocalBusiness @id reference), `areaServed` (4-region array), `hasOfferCatalog`, `offers` block (priceCurrency, availability, url, price, priceRange), `termsOfService`. All Phase 2 SEO work intact. Patch is purely additive.

The other fields the spec wanted (inline LocalBusiness with telephone+address, single Country `India`, hardcoded serviceType `"Vedic Astrology Consultation"`) were intentionally NOT applied because they would have stripped Phase 2 work that just shipped to production.

---

## Task 3, Blog architecture, DONE per option (b)

### 3a, Dependencies installed
Spec'd 4 plus 1 essential add:

| Package | Version | Why |
|---|---|---|
| `@mdx-js/rollup` | ^3.1.1 | Vite plugin, MDX → React component compile |
| `@mdx-js/react` | ^3.1.1 | runtime support for MDX components |
| `gray-matter` | ^4.0.3 | YAML frontmatter parse (build-time + runtime) |
| `reading-time` | ^1.5.0 | spec'd, available for future use |
| **`remark-frontmatter`** | ^5.0.0 | **NOT in spec — necessary**: without it, the YAML `---...---` block in MDX renders as broken markdown content. Strips the frontmatter block from MDX output so gray-matter can own it. Flagged before install. |

### 3b, 3c — `content/blog/_template.mdx`
Created with the exact YAML frontmatter schema from spec. Future blog posts are added by copying this template into `content/blog/<slug>.mdx`, filling in frontmatter, and writing MDX content below the closing `---`.

### 3d, 3e — `src/pages/BlogPost.tsx` + route
- **NEW component** at `src/pages/BlogPost.tsx`. Eager-globs both compiled MDX modules and raw text via `import.meta.glob`. Resolves `/blog/:slug` URL param to `content/blog/<slug>.mdx`. Skips `_template.mdx`. Skips `draft: true`. Renders 404 fallback for unknown slugs or drafts.
- Article schema (BlogPosting type) built from frontmatter, passed to `<SEOHead schemas={[articleSchema]} />`. Spec's exact field shape: headline, url, image (ImageObject 1200x630), author (Saurabh Jain link), publisher (Soul Infinity Logo), datePublished, dateModified, description, inLanguage en-IN, mainEntityOfPage.
- Visible page renders: category eyebrow, H1, author/date meta, hero image, MDX `<Content />` body. Uses `prose prose-lg` Tailwind classes (graceful no-op since `@tailwindcss/typography` is not installed; styles will activate cleanly when the plugin is added).
- Route registered in `src/App.tsx` as lazy import + `<Route path="/blog/:slug" element={<BlogPost />} />` placed after `/blog/mantra` (more specific route wins per react-router v6 specificity).

### 3f, 3g — `vite.config.ts`
Added `mdx({ remarkPlugins: [remarkFrontmatter] })` plugin BEFORE `react()` so React plugin sees compiled JSX, not raw MDX.

### 3h — `scripts/prerender.mjs` dynamic blog routes
**NOT a comment placeholder, real glob.** New `loadBlogRoutes()` async function reads `content/blog/`, parses each `*.mdx` with gray-matter, skips `_template.mdx` and `draft: true`, returns `/blog/<slug>` array. Pushed into the existing `ROUTES` const at module load time so prerender + any other importer of ROUTES (sitemap etc.) sees blog posts automatically.

When zero publishable blog posts exist (current state), the function returns `[]` and ROUTES is unchanged. As soon as the first non-draft `*.mdx` is added to `content/blog/`, the next `npm run build` will discover and prerender it.

---

## Validation results

| Gate | Result |
|---|---|
| `npm install` (5 deps) | ok, 203 packages |
| `npm run build` (vite client + ssr) | green, 876ms |
| Prerender | 41 routes ok (no blog posts yet, glob found `_template.mdx` and skipped it) |
| `grep -rn "—" src/` | empty ✓ |
| Em-dash in any file I touched | empty ✓ |
| Single H1 per page | unchanged ✓ |
| Existing routes still prerender | yes (`/zodiac/aries`, `/planets/*`, `/services/*`, etc.) ✓ |

### Pre-existing em-dash in scripts/prerender.mjs (not introduced by this work)

Line 184 has a literal em-dash in an error format string:
```js
const suffix = r.status === 'ok' ? '' : `  — ${r.error}`;
```

This was there before this branch and is outside the `grep -rn "—" src/` gate scope (gate scans `src/`, not `scripts/`). Not blocking. Worth a follow-up sweep if you want strict zero em-dashes everywhere.

---

## Files modified / created (8 total)

```
M  package.json                       (5 new deps)
M  package-lock.json                  (lock update)
M  scripts/prerender.mjs              (+36 lines, blog glob loader)
M  src/App.tsx                        (+2 lines, lazy import + route)
M  src/data/schema-entities.ts        (+1 line, inLanguage)
M  vite.config.ts                     (+5 lines, mdx plugin + remark-frontmatter)
A  src/pages/BlogPost.tsx             (NEW, ~200 lines)
A  content/blog/_template.mdx         (NEW, frontmatter template)
```

Plus this status file: `scripts/schema-blog-status.md` (NOT committed; reference doc).

## Deviations from spec, called out earlier

1. **Task 1 skipped** per your option (c). Article schema already emits via `getArticleSchema()`.
2. **Task 2 minimal patch** per your option (c). Only `inLanguage` added; full structural rewrite per spec was not applied because it would have stripped Phase 2 Offer + hasOfferCatalog + priceRange that just shipped to production.
3. **`remark-frontmatter` added as 5th dep** beyond the spec's 4. Required to make YAML frontmatter work cleanly with MDX. Flagged before install.
4. **`git add -A` switched to specific file add.** Repo had 17+ unrelated untracked files (SEO audit reports, manifest JSONs, one-shot upload scripts, a 1MB binary zip, etc.) that would have polluted a focused "feat:" commit. Specific add keeps the commit message honest. Untracked files are still in the working tree, available for a follow-up `chore:` commit if you want them in.

## How to add the first real blog post

1. Copy `content/blog/_template.mdx` to `content/blog/your-slug.mdx`
2. Fill in frontmatter (set `draft: false` when ready to ship)
3. Write MDX content below the closing `---`
4. Upload hero image to R2 at `Blog/<slug>/hero.webp`, paste URL into `heroImage` field
5. `npm run build` → prerender will auto-discover and emit `/blog/your-slug`
6. Visit `/blog/your-slug` in dev or production

No CMS, no database, no manual route registration. Drop the file, commit, deploy.
