/**
 * Standalone Vite config for GitHub Pages deployment.
 *
 * Usage:
 *   npm run build:pages
 *   # or
 *   npx vite build --config vite.pages.config.ts
 *
 * Set BASE to match your GitHub Pages URL:
 *   - User/org page  (username.github.io):           BASE = '/'
 *   - Project page   (username.github.io/repo-name): BASE = '/repo-name/'
 */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

const BASE = process.env.VITE_BASE_PATH ?? '/';

export default defineConfig({
  base: BASE,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
    },
    dedupe: ['react', 'react-dom'],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, 'dist'),
    emptyOutDir: true,
  },
});
