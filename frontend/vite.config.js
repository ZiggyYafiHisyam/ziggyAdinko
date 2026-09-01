import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The app is always served by the Express server (localhost:4000 / Railway / Vercel),
// so the frontend just calls same-origin `/api/*` — no dev proxy needed.
// Build bundle goes under /static/ so the /assets/ path stays reserved for
// user-uploaded images served by Express.
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    assetsDir: 'static',
  },
})
