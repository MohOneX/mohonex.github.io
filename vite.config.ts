import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// User site repo mohonex.github.io uses root base.
export default defineConfig({
  plugins: [react()],
  base: '/',
})
