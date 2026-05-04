import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';
import remarkFrontmatter from 'remark-frontmatter';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // mdx() must run before react() so the React plugin sees compiled JSX,
    // not raw MDX. remark-frontmatter strips the YAML --- block so it does
    // not render as content; gray-matter parses the same block at runtime
    // for the schema/SEO metadata in BlogPost.tsx.
    mdx({
      remarkPlugins: [remarkFrontmatter],
    }),
    react(),
  ],
  // Expose VERCEL_ENV ("production" | "preview" | "development") to the
  // client + SSR bundle. Vite does not inline non-VITE_-prefixed env vars
  // by default, so we inject it explicitly. Read at build time; baked as
  // a literal into the output. Empty string when building outside Vercel.
  define: {
    'import.meta.env.VERCEL_ENV': JSON.stringify(process.env.VERCEL_ENV || ''),
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  ssr: {
    // react-helmet-async ships CJS; bundle it into the SSR output so Node's
    // ESM loader can consume it via the single default export.
    noExternal: ['react-helmet-async'],
  },
});
