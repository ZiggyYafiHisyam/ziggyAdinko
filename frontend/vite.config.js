import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The app is always served by the Express server (localhost:4000 / Railway / Vercel),
// so the frontend just calls same-origin `/api/*` — no dev proxy needed.
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
