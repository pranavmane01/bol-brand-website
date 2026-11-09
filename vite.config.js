import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],

  // ── Build optimisation ───────────────────────────────────────────────────────
  build: {
    outDir: 'dist',
    sourcemap: false,          // no sourcemaps in production (reduces size)
    chunkSizeWarningLimit: 700,
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: 'three-vendor',
              test: /node_modules[\\/](?:three|three-stdlib|@react-three)[\\/]/,
              maxSize: 350_000,
              priority: 10,
            },
          ],
        },
      },
    },

    // Compress assets aggressively
    assetsInlineLimit: 4096,  // inline files < 4 KB as base64
    cssCodeSplit: true,
  },

  // ── Dev server ───────────────────────────────────────────────────────────────
  server: {
    port: 5173,
    strictPort: false,
    open: false,
  },

  // ── Preview (local prod preview) ─────────────────────────────────────────────
  preview: {
    port: 4173,
    strictPort: false,
  },
})
