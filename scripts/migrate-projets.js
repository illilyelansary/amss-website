#!/usr/bin/env node
/**
 * Registre officiel AMSS (AMSS_Modele_Officiel_Programmes.xlsx, feuille Sheet1)
 *   → src/data/projetsData.js
 *
 * Le registre est la SEULE source des projets du site. Pour mettre le site à jour :
 *   1. mettre à jour le registre (SharePoint), vérifier que 02_CONTROLES est « OK » ;
 *   2. copier le fichier dans data/AMSS_Modele_Officiel_Programmes.xlsx ;
 *   3. lancer : pnpm run migrate:projets  (puis lire les avertissements affichés).
 *
 * Règles appliquées :
 * - Publié sur le site : statuts Actif, Clôture en cours, Suspendu, Clôturé
 *   (+ Approuvé/planifié et En contractualisation dès que la date de début est atteinte).
 *   Non publié : Archivé, À qualifier, Opportunité, En préparation, Soumis.
 * - Les « Programmes parents » ne sont pas affichés comme projets : leurs composantes
 *   le sont, avec le nom du programme (champ `programme`), sans double compte.
 * - Régions : lues dans la zone (« Région de X », « District de Bamako ») selon le
 *   découpage administratif en vigueur (19 régions + District de Bamako).
 * - Le statut affiché est recalculé dans le navigateur à partir des dates :
 *   un projet dont la date de fin est passée bascule seul dans « Terminés ».
 */
import fs from 'fs'
import path from 'path'
import * as XLSX from 'xlsx'

const norm = (s) => String(s ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim()
const clean = (s) => String(s ?? '').replace(/\s+/g, ' ').replace(/\s+([,.;:)])/g, '$1').trim()

/* ---------- Régions (découpage en vigueur) ---------- */
const REGIONS = [
  'Tombouctou', 'Taoudénit', 'Gao', 'Ménaka', 'Kidal', 'Mopti', 'Bandiagara', 'Douentza',
  'Ségou', 'San', 'Sikasso', 'Koutiala', 'Bougouni', 'Koulikoro', 'Dioïla', 'Nara',
  'Kayes', 'Kita', 'Nioro', 'Bamako',
]
const REGION_ALIASES = {
  tombouctou: 'Tombouctou', timbuktu: 'Tombouctou',
  taoudenit: 'Taoudénit', taoudeni: 'Taoudénit', taoudenni: 'Taoudénit',
  gao: 'Gao', menaka: 'Ménaka', kidal: 'Kidal', mopti: 'Mopti',
  bandiagara: 'Bandiagara', badiangara: 'Bandiagara', douentza: 'Douentza',
  segou: 'Ségou', san: 'San', sikasso: 'Sikasso', koutiala: 'Koutiala', bougouni: 'Bougouni',
  koulikoro: 'Koulikoro', dioila: 'Dioïla', nara: 'Nara', kayes: 'Kayes', kita: 'Kita',
  nioro: 'Nioro', bamako: 'Bamako',
}
// Repli si la zone ne cite aucune région : cercles sans ambiguïté
const CERCLE_TO_REGION = {
  goundam: 'Tombouctou', dire: 'Tombouctou', niafunke: 'Tombouctou', 'gourma-rharous': 'Tombouctou',
  araouane: 'Taoudénit', achouratt: 'Taoudénit', boujbeha: 'Taoudénit', 'foum-elba': 'Taoudénit',
  ansongo: 'Gao', bankass: 'Bandiagara', djenne: 'Mopti', tominian: 'San', kati: 'Koulikoro',
  barouelli: 'Ségou', barouéli: 'Ségou', niono: 'Ségou', macina: 'Ségou',
}

function extractRegions(zone) {
  const z = String(zone || '')
  const found = new Set()
  const re = /(?:r[ée]gions?|district)\s+(?:de|du|d['’])\s*([A-Za-zÀ-ÿ'’-]+)/gi
  let m
  while ((m = re.exec(z))) {
    const r = REGION_ALIASES[norm(m[1])]
    if (r) found.add(r)
  }
  // « Régions de Ségou, Mopti et Gao » : noms qui suivent dans la même énumération
  const enumRe = /r[ée]gions\s+(?:de|du)\s+([^.;:—]+)/gi
  while ((m = enumRe.exec(z))) {
    m[1].split(/,| et /).forEach((t) => { const r = REGION_ALIASES[norm(t)]; if (r) found.add(r) })
  }
  if (found.size === 0) {
    const n = norm(z)
    for (const [k, r] of Object.entries(REGION_ALIASES)) if (new RegExp(`\\b${k}\\b`).test(n)) found.add(r)
    for (const [k, r] of Object.entries(CERCLE_TO_REGION)) if (new RegExp(`\\b${norm(k)}\\b`).test(n)) found.add(r)
  }
  return REGIONS.filter((r) => found.has(r))
}

/* ---------- Domaines du site ---------- */
const SECTOR_TO_DOMAIN = {
  'securite alimentaire et moyens d’existence': 'Sécurité alimentaire & Moyens d’existence',
  "securite alimentaire et moyens d'existence": 'Sécurité alimentaire & Moyens d’existence',
  'gouvernance et decentralisation': 'Gouvernance & Paix',
  'education': 'Éducation',
  'protection': 'Protection & VBG',
  'genre et violences basees sur le genre': 'Protection & VBG',
  'eau, hygiene et assainissement': 'WASH',
  'sante': 'Santé & Nutrition',
  'nutrition': 'Santé & Nutrition',
  'cohesion sociale et consolidation de la paix': 'Cohésion sociale & Paix',
  'entrepreneuriat, emploi et inclusion economique': 'Entrepreneuriat & Emploi',
  'environnement, climat et ressources naturelles': 'Environnement & Climat',
  'relevement et resilience urbaine': 'Relèvement urbain',
  'action contre les mines': 'Protection & VBG',
  'urgence humanitaire': 'Urgence humanitaire',
}
const AXE_KEYWORDS = [
  [/educ|scolari|alphab|ecole/, 'Éducation'],
  [/sante|ssr|reproduct/, 'Santé & Nutrition'],
  [/nutrition|malnutri/, 'Santé & Nutrition'],
  [/wash|\beau\b|eha|hygien|assainiss/, 'WASH'],
  [/protection|vbg|genre|mines?\b|antimine/, 'Protection & VBG'],
  [/gouvernance/, 'Gouvernance & Paix'],
  [/cohesion|paix|vivre ensemble/, 'Cohésion sociale & Paix'],
  [/securite alimentaire|moyens d.existence|agri|intrants|engrais/, 'Sécurité alimentaire & Moyens d’existence'],
  [/entrepren|emploi|epargne|micro|formation professionnelle/, 'Entrepreneuriat & Emploi'],
  [/environnement|climat|ressources naturelles/, 'Environnement & Climat'],
  [/resilience/, 'Résilience'],
]
function domainsFor(sector, axe, title) {
  const out = []
  const main = SECTOR_TO_DOMAIN[norm(sector)]
  if (main) out.push(main)
  const hay = norm(`${axe || ''}`)
  for (const [re, label] of AXE_KEYWORDS) if (re.test(hay) && !out.includes(label)) out.push(label)
  if (!out.length) {
    const t = norm(title)
    for (const [re, label] of AXE_KEYWORDS) if (re.test(t) && !out.includes(label)) out.push(label)
  }
  return out
}

/* ---------- Divers ---------- */
const isoDate = (v) => {
  if (!v) return null
  if (v instanceof Date && !isNaN(v)) {
    // SheetJS lit les dates Excel à minuit heure locale : on corrige le fuseau
    const d = new Date(v.getTime() - v.getTimezoneOffset() * 60000)
    return d.toISOString().slice(0, 10)
  }
  const s = String(v).trim()
  const fr = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/)
  if (fr) return `${fr[3]}-${fr[2].padStart(2, '0')}-${fr[1].padStart(2, '0')}`
  return /^\d{4}-\d{2}-\d{2}/.test(s) ? s.slice(0, 10) : null
}
const DEVISE = { XOF: 'FCFA', EUR: 'EUR', USD: 'USD', NOK: 'NOK' }
const fmtBudget = (n, dev) =>
  n == null || n === ''
    ? 'N/D'
    : `${new Intl.NumberFormat('fr-FR').format(Math.round(Number(n))).replace(/[\u202f\u00a0]/g, ' ')} ${DEVISE[dev] || dev || ''}`.trim()
// Harmonisation de l'affichage des bailleurs (casse et variantes)
const DONOR_CANON = {
  'ambassade des pays bas': 'Ambassade des Pays-Bas', 'ambassade du pays-bas': 'Ambassade des Pays-Bas',
  'ambassade des pays-bas': 'Ambassade des Pays-Bas', 'union europeenne': 'Union européenne',
  'banque mondiale': 'Banque mondiale', 'global affairs canada (gac)': 'Affaires mondiales Canada (AMC)', echo: 'Commission européenne — DG ECHO',
  "aacid (agence d'andalousie pour la cooperation internationnale de developpement)": 'AACID (Agence andalouse de coopération internationale)',
  'ministere federal de la cooperation economique et du developpement (bmz)': 'BMZ (Ministère fédéral allemand de la Coopération)',
  'fonds italien': 'Fonds italien (via UNHCR)', 'fonds cerf': 'CERF (via UNHCR)',
}
const donors = (s) =>
  clean(s).split(/\s*[;/]\s*/).filter((x) => x && norm(x) !== 'a completer')
    .map((x) => DONOR_CANON[norm(x)] || x).join(' / ')
const firstSentence = (s, max = 220) => {
  const t = clean(s)
  if (!t) return null
  const cut = t.split(/(?<=[.;])\s/)[0]
  return cut.length > max ? cut.slice(0, max - 1).replace(/\s+\S*$/, '') + '…' : cut
}
// Bénéficiaires : uniquement un total explicite « N personnes / bénéficiaires »
const benefNumber = (s) => {
  const m = String(s || '').match(/(\d{1,3}(?:[ .]\d{3})+|\d+)\s*(?:personnes|bénéficiaires)(?!\s+sensibilis)/i)
  return m ? Number(m[1].replace(/[ .]/g, '')) : null
}

const PUBLISHED = new Set(['actif', 'cloture en cours', 'suspendu', 'cloture', 'approuve / planifie', 'en contractualisation'])

/* ---------- Lecture ---------- */
function readRegistry(file) {
  const wb = XLSX.read(fs.readFileSync(file), { type: 'buffer', cellDates: true })
  const ws = wb.Sheets.Sheet1 || wb.Sheets[wb.SheetNames.find((n) => /sheet1|projets/i.test(n))]
  if (!ws) throw new Error('Feuille « Sheet1 » introuvable dans le registre')
  return XLSX.utils.sheet_to_json(ws, { defval: null }).filter((r) => r['N°'] != null && r['Intitulé du projet'])
}

function main() {
  const [, , input = 'data/AMSS_Modele_Officiel_Programmes.xlsx', output = 'src/data/projetsData.js'] = process.argv
  const rows = readRegistry(input)
  const warnings = []
  const today = new Date().toISOString().slice(0, 10)

  const byId = new Map(rows.map((r) => [r.project_id, r]))
  const programmes = rows
    .filter((r) => r['Niveau'] === 'Programme parent')
    .map((r) => ({
      projectId: r.project_id,
      code: r['Code projet'],
      title: clean(r['Intitulé du projet']),
      startDate: isoDate(r['Date de début']),
      endDate: isoDate(r['Date de fin']),
      composantes: rows.filter((c) => c['Projet parent'] === r.project_id).map((c) => c.project_id),
    }))

  const projets = []
  for (const r of rows) {
    const statut = clean(r['Statut'])
    if (!PUBLISHED.has(norm(statut))) continue
    if (r['Niveau'] === 'Programme parent') continue
    const title = clean(r['Intitulé du projet'])
    if (/ponah/i.test(title)) continue // choix éditorial existant du site

    const zone = clean(r['Zone géographique'])
    const regions = extractRegions(zone)
    if (!regions.length) warnings.push(`${r.project_id} : aucune région reconnue dans la zone`)
    const parent = r['Projet parent'] ? byId.get(r['Projet parent']) : null
    if (r['Projet parent'] && !parent) warnings.push(`${r.project_id} : projet parent ${r['Projet parent']} introuvable`)
    const startDate = isoDate(r['Date de début'])
    const endDate = isoDate(r['Date de fin'])
    if (norm(statut) === 'actif' && endDate && endDate < today)
      warnings.push(`${r.project_id} : statut Actif mais date de fin dépassée (${endDate}) → affiché Terminé`)
    if (norm(statut) === 'cloture' && endDate && endDate > today)
      warnings.push(`${r.project_id} : statut Clôturé mais date de fin future (${endDate})`)

    const bailleur = donors(r['Bailleurs financiers'])
    const domaines = domainsFor(r['Secteur principal'], r['Axe d’intervention'], title)

    projets.push({
      id: Number(r['N°']),
      projectId: r.project_id,
      code: r['Code projet'] || null,
      title,
      statutRegistre: statut,
      startDate,
      endDate,
      region: regions.join(', '),
      regions,
      zoneDetail: zone || null,
      secteur: r['Secteur principal'] || null,
      domaine: domaines.join(' ; '),
      bailleur: bailleur || 'N/D',
      donor: bailleur || 'N/D',
      partenaires: clean(r['Partenaires techniques']) || null,
      budget: fmtBudget(r['Budget montant'], r['Budget devise']),
      budgetMontant: r['Budget montant'] ?? null,
      budgetDevise: r['Budget devise'] ?? null,
      beneficiaries: benefNumber(r['Bénéficiaires cibles']),
      beneficiairesTexte: clean(r['Bénéficiaires cibles']) || null,
      excerpt: firstSentence(r['Résumé']) || clean(r['Axe d’intervention']) || null,
      description: clean(r['Résumé']) || null,
      programme: parent ? clean(parent['Intitulé du projet']) : null,
      programmeId: parent ? parent.project_id : null,
      usaid: /usaid|bha/i.test(bailleur),
    })
  }

  const header = `// Auto-généré par scripts/migrate-projets.js depuis ${path.basename(input)} – NE PAS ÉDITER À LA MAIN
// Pour corriger un projet : modifier le registre officiel puis relancer « pnpm run migrate:projets ».
// Généré le ${new Date().toISOString().slice(0, 10)} — ${projets.length} projets publiés.
`
  const body = `
const PROJETS = ${JSON.stringify(projets, null, 2)}

export const programmes = ${JSON.stringify(programmes, null, 2)}

// Statut affiché, recalculé à l'ouverture de la page à partir des dates
function statutAffiche(p, today) {
  const s = String(p.statutRegistre || '').normalize('NFD').replace(/[\\u0300-\\u036f]/g, '').toLowerCase()
  if (s.startsWith('cloture') && !s.startsWith('cloture en cours')) return 'Terminé'
  if (p.endDate && p.endDate < today) return 'Terminé'
  if (s.startsWith('suspendu')) return 'Suspendu'
  if ((s.startsWith('approuve') || s.startsWith('en contractualisation')) && (!p.startDate || p.startDate > today)) return null
  return 'En cours'
}

const today = new Date().toISOString().slice(0, 10)
export const projets = PROJETS
  .map((p) => {
    const status = statutAffiche(p, today)
    // usaidNote : convention des pages (badge rouge « Suspendu (USAID) »)
    return { ...p, status, usaidNote: status === 'Suspendu' && p.usaid ? true : undefined }
  })
  .filter((p) => p.status)

export const projetsEnCours = projets
  .filter((p) => p.status === 'En cours' || p.status === 'Suspendu')
  .sort((a, b) => String(b.startDate || '').localeCompare(String(a.startDate || '')))

export const projetsTermines = projets
  .filter((p) => p.status === 'Terminé')
  .sort((a, b) => String(b.endDate || '').localeCompare(String(a.endDate || '')))

export const rapports = []

export default { projets, projetsEnCours, projetsTermines, programmes, rapports }
`
  fs.mkdirSync(path.dirname(output), { recursive: true })
  fs.writeFileSync(output, header + body, 'utf8')

  // Menu « Zones d'intervention » de l'en-tête : toutes les régions ayant au moins un projet publié
  const zoneKey = (label) => norm(label).replace(/[^a-z]/g, '')
  const zonesMenu = REGIONS.filter((r) => projets.some((p) => p.regions.includes(r)))
    .map((label) => ({ key: zoneKey(label), label }))
  const menuFile = path.join(path.dirname(output), 'zonesMenu.js')
  fs.writeFileSync(menuFile, `// Auto-généré par scripts/migrate-projets.js – NE PAS ÉDITER À LA MAIN
// Régions affichées dans le menu « Zones d'intervention » (ordre géographique, nord → sud)
export const zonesMenu = ${JSON.stringify(zonesMenu, null, 2)}
`, 'utf8')
  console.log(`✅ ${menuFile} : ${zonesMenu.length} régions dans le menu`)
  console.log(`✅ ${output} : ${projets.length} projets publiés (sur ${rows.length} fiches du registre)`)
  warnings.forEach((w) => console.warn('⚠️ ', w))
}

main()
