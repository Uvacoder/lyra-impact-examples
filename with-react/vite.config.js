import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Unocss from "unocss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["fs", "path"],
    },
  },
  plugins: [react(), Unocss()]
})
