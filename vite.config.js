import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// Politique de sécurité du contenu (CSP) des pages du site.
// N'autorise que les ressources du site et les services intégrés
// (carte OpenStreetMap, Google Maps, YouTube, page Facebook).
// Si vous ajoutez un nouveau service externe (ex. une vidéo Vimeo),
// ajoutez son domaine ici, sinon il sera bloqué par le navigateur.
const CSP = [
  "default-src 'self'",
  // cdn.jsdelivr.net n'est autorisé que pour un build interne avec badges
  process.env.VITE_ENABLE_BADGE === '1' ? "script-src 'self' https://cdn.jsdelivr.net" : "script-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://*.tile.openstreetmap.org",
  "font-src 'self' data:",
  "connect-src 'self'",
  "worker-src 'self' blob:",
  "frame-src 'self' https://www.google.com https://www.youtube-nocookie.com https://www.youtube.com https://www.facebook.com https://web.facebook.com https://*.facebook.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join('; ')

// Injectée uniquement dans le build de production : en local (pnpm dev),
// Vite a besoin de scripts intégrés que la CSP bloquerait.
const cspPlugin = () => ({
  name: 'amss-csp',
  apply: 'build',
  transformIndexHtml: () => [
    { tag: 'meta', attrs: { 'http-equiv': 'Content-Security-Policy', content: CSP }, injectTo: 'head-prepend' },
  ],
})

// https://vite.dev/config/
export default defineConfig({
  build: {
    // Les fichiers générés (avec empreinte dans le nom) vont dans /static,
    // ce qui permet de les mettre en cache 1 an sans risque.
    assetsDir: 'static',
  },
  plugins: [react(), tailwindcss(), cspPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
