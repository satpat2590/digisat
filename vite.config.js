import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: true,
    port: 6969, 
  },
  plugins: [preact()],
  root: './',
  base: './',
  publicDir: './public',
  build: {
    outDir: 'dist',
  }
})
