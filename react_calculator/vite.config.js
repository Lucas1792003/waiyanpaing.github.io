import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/waiyanpaing.github.io/react_calculator-build/', 
  plugins: [react()],
})
