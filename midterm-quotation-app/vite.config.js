import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/waiyanpaing.github.io/midterm-quotation-app-build/', 
  plugins: [react()],
})
