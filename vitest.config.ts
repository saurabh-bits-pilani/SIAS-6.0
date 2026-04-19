import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./src/test/setup.ts'],
    css: false,
    // Tests model production behaviour; staging-only overrides (noindex,
    // canonical rewrites, banner) have dedicated tests that override these
    // via `vi.stubEnv` before rendering.
    env: {
      VITE_SITE_ENV: 'production',
      VITE_SITE_URL: 'https://soul-infinitycom.vercel.app',
    },
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.{test,spec}.{ts,tsx}',
        'src/test/**',
        'src/entry-server.tsx',
        'src/main.tsx',
        'src/vite-env.d.ts',
      ],
    },
  },
});
