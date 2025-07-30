import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/waiyanpaing.github.io/midterm-prep1-build/',
  plugins: [react()],
})
