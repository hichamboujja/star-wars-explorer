import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // PAS de base - gardez-le simple
  server: {
    port: 5173
  }
})