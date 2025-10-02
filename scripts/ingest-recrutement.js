// scripts/ingest-recrutrement.js
// Usage:
//   node scripts/ingest-recrutrement.js <dossier_PDF> <out_js> <public_avis_dir>
// Exemples:
//   node scripts/ingest-recrutrement.js content/recrutements src/data/recrutementData.auto.js public/avis

import fs from 'node:fs/promises'
import path from 'node:path'
const pdfParse = (await import('pdf-parse')).default

// ---------- Utils ----------
const MONTHS_FR = {
  janvier: 0, février: 1, fevrier: 1, mars: 2, avril: 3, mai: 4, juin: 5,
  juillet: 6, août: 7, aout: 7, septembre: 8, octobre: 9, novembre: 10, décembre: 11, decembre: 11
}
const strip = (s) =>
  String(s || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()

const toSlug = (s) =>
  String(s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 80) || 'avis'

function formatDateFR(d = new Date()) {
  const fmt = new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })
  return fmt.format(d)
}

function parseFRDate(str) {
  if (!str) return null
  // ISO ?
  const tryISO = new Date(str)
  if (!isNaN(tryISO.getTime())) return tryISO

  const txt = String(str).trim()

  // 1) "12 septembre 2025"
  let m = txt.match(/(\d{1,2})\s+([A-Za-zÀ-ÿ]+)\s+(\d{4})/i)
  if (m) {
    const day = +m[1]
    const month = MONTHS_FR[strip(m[2])]
    const year = +m[3]
    if (Number.isInteger(day) && Number.isInteger(month) && Number.isInteger(year)) {
      return new Date(Date.UTC(year, month, day))
    }
  }

  // 2) "12/09/2025" ou "12-09-2025"
  m = txt.match(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/)
  if (m) {
    const day = +m[1], month = +m[2] - 1, year = +m[3]
    if (Number.isInteger(day) && Number.isInteger(month) && Number.isInteger(year)) {
      return new Date(Date.UTC(year, month, day))
    }
  }
  return null
}

function isExpired(dateStr) {
  const d = parseFRDate(dateStr)
  if (!d) return false
  const now = new Date()
  const todayUTC = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
  const dueUTC = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate())
  return dueUTC < todayUTC
}

function pickType(text) {
  const t = strip(text)
  if (/\bcdi\b/.test(t)) return 'CDI'
  if (/\bcdd\b/.test(t)) return 'CDD'
  if (/consultant|consultance/.test(t)) return 'Consultance'
  if (/prestation|prestataire|appel d'offres|appel d offres/.test(t)) return 'Prestation'
  if (/stage/.test(t)) return 'Stage'
  return 'CDD'
}

function pickDomaine(text) {
  const t = strip(text)
  if (/education|alphab|ecole|enseign/.test(t)) return 'Éducation'
  if (/sante|santé|ssr|nutrition/.test(t)) return 'Santé / Nutrition'
  if (/wash|eau|hygiene|hygi[èe]ne|assain/.test(t)) return 'WASH'
  if (/protection|vbg|mine|eei/.test(t)) return 'Protection / VBG'
  if (/gouvernance|paix|justice|citoyen/.test(t)) return 'Gouvernance / Paix'
  if (/agri|pastor|securite alimentaire|sécurité alimentaire|moyens de subsistance/.test(t)) return 'Sécurité Alimentaire'
  if (/finance|comptable|admin/.test(t)) return 'Administration / Finance'
  return 'Autre'
}

function extractField(regex, text) {
  const m = text.match(regex)
  return m ? String(m[1]).trim() : ''
}

function extractBulletList(block) {
  return block
    .split('\n')
    .map(l => l.replace(/^[•\-*]\s*/, '').trim())
    .filter(l => l.length > 2)
    .slice(0, 12)
}

function makeStableId(key) {
  // petit hash stable numérique basé sur le chemin/nom
  let h = 0
  for (let i = 0; i < key.length; i++) {
    h = (h * 31 + key.charCodeAt(i)) >>> 0
  }
  return h
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true })
}

async function listPdfFiles(root) {
  let out = []
  try {
    const entries = await fs.readdir(root, { withFileTypes: true })
    for (const e of entries) {
      const p = path.join(root, e.name)
      if (e.isDirectory()) {
        out = out.concat(await listPdfFiles(p))
      } else if (e.isFile() && /\.pdf$/i.test(e.name)) {
        out.push(p)
      }
    }
  } catch {}
  return out
}

async function copyUnique(src, destDir) {
  await ensureDir(destDir)
  const base = toSlug(path.basename(src, path.extname(src))) || 'avis'
  let target = path.join(destDir, `${base}.pdf`)
  let i = 1
  while (true) {
    try {
      await fs.access(target)
      target = path.join(destDir, `${base}-${i++}.pdf`)
    } catch {
      break
    }
  }
  await fs.copyFile(src, target)
  return target
}

// ---------- Extraction principale ----------
async function processPdf(file, publicDir) {
  const buf = await fs.readFile(file)
  const parsed = await pdfParse(buf)
  const text = String(parsed.text || '').replace(/\r/g, '')
  const firstLines = text.split('\n').map(s => s.trim()).filter(Boolean)

  // Titre (plusieurs heuristiques)
  let titre =
    extractField(/(?:intitul[ée]\s+du\s+poste|poste|objet)\s*[:\-]\s*([^\n]+)/i, text) ||
    extractField(/avis\s+de\s+recrutement(?:\s*[:\-]\s*)?([^\n]+)/i, text) ||
    firstLines.find(l => l.length > 12 && !/^avis\s+de\s+recrutement/i.test(strip(l))) ||
    path.basename(file, path.extname(file))

  // Lieu
  let lieu =
    extractField(/(?:lieu|localisation)\s*[:\-]\s*([^\n]+)/i, text) ||
    extractField(/(?:lieu d[a’']ffectation|lieu de travail)\s*[:\-]\s*([^\n]+)/i, text) ||
    ''

  // Type & Domaine (heuristiques)
  const type = pickType(text)
  const domaine = pickDomaine(text)

  // Dates
  const datePublication =
    extractField(/(?:date\s+de\s+publication|publi[ée]\s+le)\s*[:\-]\s*([^\n]+)/i, text) ||
    null
  const dateExpirationRaw =
    extractField(/(?:date\s+limite|date\s+de\s+clo[tû]ture|deadline|limite\s+de\s+d[ée]p[oô]t)\s*[:\-]\s*([^\n]+)/i, text) ||
    extractField(/(?:au\s+plus\s+tard\s+le)\s*([^\n]+)/i, text) ||
    ''
  const dPub = datePublication ? (parseFRDate(datePublication) || null) : null
  const dExp = parseFRDate(dateExpirationRaw)
  const datePublicationFR = dPub ? formatDateFR(dPub) : formatDateFR(new Date())
  const dateExpirationFR = dExp ? formatDateFR(dExp) : ''

  // Email / apply URL
  const emails = (text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi) || []).map(e => e.toLowerCase())
  let applyEmail = emails.find(e => /recrut|hr|rh|emploi|jobs|carriere/.test(e)) || emails[0] || 'info@ong-amss.org'
  const applyUrl = `mailto:${applyEmail}?subject=${encodeURIComponent('Candidature - ' + titre)}`

  // Description courte (un extrait)
  let description = ''
  const mObj = text.match(/(?:missions|description|responsabilit[ée]s?)\s*[:\n]+([\s\S]{200,900})/i)
  if (mObj) {
    description = mObj[1]
  } else {
    // prendre la 1ère page ~ 600 caractères
    description = text.slice(0, 600)
  }
  description = description
    .replace(/\n{2,}/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim()

  // Compétences (liste)
  let competences = []
  const mComp = text.match(/(?:profil\s+recherch[ée]|comp[ée]tences?)\s*[:\n]+([\s\S]{100,1200})/i)
  if (mComp) {
    competences = extractBulletList(mComp[1])
  }

  // Copie du PDF -> public/avis
  const copied = await copyUnique(file, publicDir)
  const relUrl = '/' + path.posix.join(path.relative('public', copied).split(path.sep).join('/'))

  // Objet final
  const id = makeStableId(path.resolve(file))
  const record = {
    id,
    titre,
    lieu,
    datePublication: datePublicationFR,
    type,
    domaine,
    description,
    competences,
    dateExpiration: dateExpirationFR || '',
    pdfUrl: relUrl,
    applyUrl
  }

  // Classement en cours / archives
  const expired = record.dateExpiration && isExpired(record.dateExpiration)
  return { record, expired }
}

// ---------- Main ----------
async function main() {
  const [, , inDir = 'content/recrutements', outFile = 'src/data/recrutementData.auto.js', publicAvis = 'public/avis'] = process.argv

  // Liste des PDFs
  const exists = await fs.stat(inDir).then(() => true).catch(() => false)
  const pdfs = exists ? await listPdfFiles(inDir) : []
  const enCours = []
  const archives = []

  for (const f of pdfs) {
    try {
      const { record, expired } = await processPdf(f, publicAvis)
      if (expired) {
        archives.push({ ...record, statut: 'Clôturé', dateCloture: record.dateExpiration })
      } else {
        enCours.push(record)
      }
    } catch (e) {
      console.error('Erreur PDF:', f, e.message)
    }
  }

  // Écriture du fichier JS (nommés pour être faciles à importer)
  const banner =
`// Fichier généré automatiquement par scripts/ingest-recrutrement.js
// Généré le: ${new Date().toISOString()}
// NE PAS ÉDITER À LA MAIN — ré-ingérer vos PDFs pour mettre à jour.
`
  const body =
`${banner}
export const recrutementsAutoEnCours = ${JSON.stringify(enCours, null, 2)};
export const recrutementsAutoArchives = ${JSON.stringify(archives, null, 2)};
`

  await ensureDir(path.dirname(outFile))
  await fs.writeFile(outFile, body, 'utf8')
  console.log(`✅ Recrutements générés: ${outFile} (enCours=${enCours.length}, archives=${archives.length})`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
