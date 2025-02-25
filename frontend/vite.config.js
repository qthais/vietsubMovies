import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      "/api":{
        target:"https://vietsubmovies.onrender.com",
        changeOrigin: true,
        timeout:5000,
      }
    }
  }
})
