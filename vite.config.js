import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// vite.config.js
export default {
  base: '/To-Do-App/',
};
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
