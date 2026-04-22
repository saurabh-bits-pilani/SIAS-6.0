import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
