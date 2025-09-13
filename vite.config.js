import glsl from 'vite-plugin-glsl';

import { defineConfig } from 'vite'

export default defineConfig({

  base: process.env.VITE_BASE ?? '/', // par défaut Vercel => '/'
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  server: {
    open: true
  },
  plugins: [glsl()]
})
