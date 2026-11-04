// scripts/generate-sitemap.js
// Génère dist/sitemap.xml et dist/robots.txt après chaque build (postbuild).
// Les actualités et bureaux sont lus directement dans src/data : le sitemap
// reste à jour automatiquement quand on ajoute une actualité.
import { writeFileSync, existsSync } from 'node:fs'
import { actualites } from '../src/data/actualitesData.js'
import { bureaux } from '../src/data/bureaux.js'
import { projetsReseau, partenaires } from '../src/data/reseau.js'

const SITE = 'https://www.ong-amss.org'
const OUT = 'dist'

const pages = [
  '/', '/a-propos', '/domaines', '/education', '/sante', '/wash', '/protection',
  '/securite-alimentaire', '/gouvernance', '/actualites', '/projets',
  '/projets-en-cours', '/projets-termines', '/rapports', '/partenaires', '/zones',
  '/recrutement', '/contact', '/don', '/transparence', '/mentions-legales',
  '/politique-confidentialite', '/bureaux',
]

const urls = [
  ...pages.map(p => ({ loc: p })),
  ...actualites.map(a => ({ loc: `/actualites/${a.slug}`, lastmod: a.dateISO })),
  ...(Array.isArray(bureaux) ? bureaux : Object.values(bureaux || {}))
    .filter(b => b && b.slug)
    .map(b => ({ loc: `/bureaux/${b.slug}` })),
  ...projetsReseau.map(p => ({ loc: `/projets/${p.slug}`, lastmod: p.endDate && p.endDate < new Date().toISOString().slice(0, 10) ? p.endDate : undefined })),
  ...partenaires.map(p => ({ loc: `/partenaires/${p.slug}` })),
]

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${esc(SITE + u.loc)}</loc>${u.lastmod ? `<lastmod>${esc(u.lastmod)}</lastmod>` : ''}</url>`).join('\n')}
</urlset>
`

if (!existsSync(OUT)) { console.error('dist/ introuvable : lancez d’abord vite build'); process.exit(1) }
writeFileSync(`${OUT}/sitemap.xml`, xml)
writeFileSync(`${OUT}/robots.txt`, `User-agent: *\nAllow: /\nDisallow: /badge-employe\n\nSitemap: ${SITE}/sitemap.xml\n`)
console.log(`sitemap.xml : ${urls.length} URL`)
