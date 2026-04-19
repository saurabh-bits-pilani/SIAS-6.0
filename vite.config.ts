import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  ssr: {
    // react-helmet-async ships CJS; bundle it into the SSR output so Node's
    // ESM loader can consume it via the single default export.
    noExternal: ['react-helmet-async'],
  },
});
