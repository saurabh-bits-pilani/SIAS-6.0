#!/usr/bin/env node
/**
 * Pre-build blog manifest generator.
 *
 * Why this exists:
 *   @mdx-js/rollup intercepts the `?raw` query suffix on .mdx imports and
 *   returns the compiled MDXContent component instead of raw text. So an
 *   `import.meta.glob('content/blog/*.mdx', { query: '?raw' })` ends up giving
 *   gray-matter a React component reference, which it cannot parse. To get
 *   frontmatter into the React tree without depending on Vite query magic, we
 *   pre-extract it at build time into a JSON manifest that BlogPost.tsx can
 *   import normally.
 *
 * Output:
 *   src/data/blog-manifest.json with two coexisting shapes:
 *     - `{ [slug]: PostFrontmatter }` — read by BlogPost.tsx (detail page)
 *     - `posts: PostFrontmatter[]` — read by Blog.tsx (index page); each
 *       entry carries a `publishedAt` alias for the `date` frontmatter field
 *       so the index page can sort by date without renaming.
 *
 *   Both shapes share the same per-post objects (with `category` and
 *   `readTime` defaults applied where the frontmatter omits them).
 *
 * Behaviour:
 *   - Skips `_template.mdx` explicitly (defensive — even though it has draft:true)
 *   - Skips any file with `draft: true`
 *   - On parse failure for any single file: logs error, appends a "Manifest
 *     generation errors" section to scripts/first-blog-post-status.md, and
 *     aborts the build with exit code 1. Bad frontmatter is never silently
 *     skipped.
 *
 * Lifecycle:
 *   Wired into package.json `prebuild` so it runs automatically before
 *   `vite build` (and therefore before the SSR + prerender steps that depend
 *   on the manifest).
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const BLOG_DIR = path.join(ROOT, 'content', 'blog');
const OUT_PATH = path.join(ROOT, 'src', 'data', 'blog-manifest.json');
const STATUS_PATH = path.join(ROOT, 'scripts', 'first-blog-post-status.md');
const TEMPLATE_FILENAME = '_template.mdx';

async function appendErrorsToStatus(errors) {
  let body = '';
  try {
    body = await fs.readFile(STATUS_PATH, 'utf8');
  } catch {
    // Status file may not exist outside the first-blog-post task; that's ok.
    return;
  }
  const section = [
    '',
    '---',
    '',
    '## Manifest generation errors',
    '',
    `Generated at build time by \`scripts/generate-blog-manifest.mjs\` on ${new Date().toISOString()}.`,
    '',
    ...errors.map((e) => `- **${e.file}**: ${e.message}`),
    '',
  ].join('\n');
  await fs.writeFile(STATUS_PATH, body + section, 'utf8');
}

async function main() {
  let files;
  try {
    files = await fs.readdir(BLOG_DIR);
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.warn('[blog-manifest] content/blog/ does not exist; writing empty manifest');
      await fs.mkdir(path.dirname(OUT_PATH), { recursive: true });
      await fs.writeFile(OUT_PATH, '{}\n', 'utf8');
      return;
    }
    throw err;
  }

  const manifest = {};
  const errors = [];
  let included = 0;
  let skippedDraft = 0;

  for (const file of files) {
    if (!file.endsWith('.mdx')) continue;
    if (file === TEMPLATE_FILENAME) continue;

    const fullPath = path.join(BLOG_DIR, file);
    let raw;
    try {
      raw = await fs.readFile(fullPath, 'utf8');
    } catch (err) {
      errors.push({ file, message: `read failed: ${err.message}` });
      continue;
    }

    let parsed;
    try {
      parsed = matter(raw);
    } catch (err) {
      errors.push({ file, message: `frontmatter parse failed: ${err.message}` });
      continue;
    }

    const fm = parsed.data;
    if (fm && fm.draft === true) {
      skippedDraft++;
      continue;
    }

    const slug = (fm && fm.slug) || file.replace(/\.mdx$/, '');
    // Apply per-post defaults so consumer components don't have to.
    const enriched = {
      ...fm,
      category: fm.category || 'Vedic Astrology',
      readTime: fm.readTime || '8 min read',
    };
    manifest[slug] = enriched;
    included++;
  }

  // Emit a `posts` array alongside the slug-keyed entries so Blog.tsx can
  // sort/filter without re-shaping the object. Aliases `date` to
  // `publishedAt` for the index-page contract.
  const posts = Object.values(manifest).map((fm) => ({
    ...fm,
    publishedAt: fm.date,
  }));
  manifest.posts = posts;

  if (errors.length > 0) {
    console.error(`[blog-manifest] ${errors.length} parse error(s):`);
    for (const e of errors) console.error(`  - ${e.file}: ${e.message}`);
    await appendErrorsToStatus(errors);
    process.exit(1);
  }

  await fs.mkdir(path.dirname(OUT_PATH), { recursive: true });
  await fs.writeFile(OUT_PATH, JSON.stringify(manifest, null, 2) + '\n', 'utf8');

  const slugs = Object.keys(manifest).filter((k) => k !== 'posts');
  console.log(`[blog-manifest] wrote ${path.relative(ROOT, OUT_PATH)}`);
  console.log(`[blog-manifest]   included: ${included} (${slugs.join(', ') || 'none'})`);
  console.log(`[blog-manifest]   posts array: ${posts.length} entry(ies)`);
  console.log(`[blog-manifest]   skipped drafts: ${skippedDraft}`);
}

main().catch((err) => {
  console.error('[blog-manifest] fatal:', err);
  process.exit(1);
});
