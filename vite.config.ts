import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// `base: './'` on build makes asset URLs relative, so the built site works when
// served from a GitHub Pages project subpath (e.g. ttutsch.github.io/t-family-game/)
// regardless of the repo name. Local dev keeps a clean root path.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? './' : '/',
  plugins: [react()],
}));
