import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  ssr: {
    // Let Node resolve react-router packages directly to avoid Rolldown conditions mismatch
    external: ['react-router-dom', 'react-router'],
    noExternal: ['react-helmet-async'],
  },

  build: {
    chunkSizeWarningLimit: 600,

    rollupOptions: {
      output: {
        // Function form required by Rolldown (Vite 8)
        manualChunks(id) {
          if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/')) {
            return 'vendor'
          }
          if (id.includes('node_modules/react-router-dom') || id.includes('node_modules/react-router/')) {
            return 'router'
          }
          if (id.includes('node_modules/react-helmet-async')) {
            return 'helmet'
          }
        },
      },
    },
  },
})
