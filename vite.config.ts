import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Esto permitirá que Vite escuche en todas las interfaces de red
    port: 5174, // (opcional) Asegúrate de que el puerto sea el mismo que quieres usar
  },
})
