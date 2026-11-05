// src/data/reseau.js
// ---------------------------------------------------------------------------
// « Réseau » AMSS : relie entre eux les projets, les partenaires, les zones
// (régions) et les bases. Tout est calculé à partir de :
//   - src/data/projetsData.js (généré depuis le registre officiel)
//   - src/data/bureaux.js     (bases et régions qu’elles couvrent)
// Ainsi, une mise à jour du registre met automatiquement à jour tous les liens.
// ---------------------------------------------------------------------------
import { projets, programmes } from './projetsData.js'
import { bureaux } from './bureaux.js'
import { zonesMenu } from './zonesMenu.js'

export const norm = (s) =>
  String(s ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[’']/g, ' ').replace(/\s+/g, ' ').trim()
export const slugify = (s) => norm(s).replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60)
export const zoneKey = (label) => norm(label).replace(/[^a-z]/g, '')

/* ============ Catalogue des partenaires ============ */
// match : expressions recherchées comme mots entiers dans les champs Bailleurs / Partenaires du registre
const P = (slug, acronym, name, type, match, extra = {}) => ({ slug, acronym, name, type, match, ...extra })
export const CATALOGUE = [
  P('unhcr', 'UNHCR', 'Haut-Commissariat des Nations Unies pour les réfugiés', 'Organisation internationale', ['unhcr', 'hcr'], { logo: '/assets/partenaires/unhcr.png', website: 'https://www.unhcr.org/' }),
  P('unicef', 'UNICEF', 'Fonds des Nations Unies pour l’enfance', 'Organisation internationale', ['unicef'], { logo: '/assets/partenaires/unicef.png', website: 'https://www.unicef.org/mali/' }),
  P('unfpa', 'UNFPA', 'Fonds des Nations Unies pour la population', 'Organisation internationale', ['unfpa'], { logo: '/assets/partenaires/unfpa.png', website: 'https://www.unfpa.org/' }),
  P('ocha', 'OCHA', 'Bureau de la coordination des affaires humanitaires (dont le Fonds humanitaire régional FHRAOC)', 'Organisation internationale', ['ocha', 'fhraoc'], { logo: '/assets/partenaires/ocha.png', website: 'https://www.unocha.org/' }),
  P('cerf', 'CERF', 'Fonds central d’intervention pour les urgences humanitaires (ONU)', 'Fonds humanitaire', ['cerf']),
  P('pam', 'PAM', 'Programme alimentaire mondial', 'Organisation internationale', ['pam', 'programme alimentaire mondial', 'wfp'], { logo: '/assets/partenaires/pam.png', website: 'https://www.wfp.org/' }),
  P('pnud', 'PNUD', 'Programme des Nations Unies pour le développement', 'Organisation internationale', ['pnud', 'undp'], { logo: '/assets/partenaires/pnud.png', website: 'https://www.undp.org/mali' }),
  P('unmas', 'UNMAS', 'Service de l’action antimines des Nations Unies', 'Organisation internationale', ['unmas'], { logo: '/assets/partenaires/unmas.png', website: 'https://www.unmas.org/' }),
  P('banque-mondiale', 'Banque mondiale', 'Banque mondiale', 'Bailleur', ['banque mondiale', 'world bank']),
  P('usaid', 'USAID', 'Agence des États-Unis pour le développement international', 'Bailleur', ['usaid', 'bha'], { logo: '/assets/partenaires/usaid.png', website: 'https://www.usaid.gov/' }),
  P('union-europeenne', 'UE', 'Union européenne', 'Bailleur', ['union europeenne', 'ue', 'european union'], { logo: '/assets/partenaires/ue.png', website: 'https://european-union.europa.eu/' }),
  P('dg-echo', 'DG ECHO', 'Commission européenne — Protection civile et aide humanitaire (DG ECHO)', 'Bailleur', ['echo', 'dg echo']),
  P('ddc', 'DDC', 'Coopération suisse (DDC)', 'Bailleur', ['ddc', 'cooperation suisse'], { logo: '/assets/partenaires/ddc.png', website: 'https://www.eda.admin.ch/' }),
  P('pays-bas', 'Pays-Bas', 'Ambassade du Royaume des Pays-Bas au Mali', 'Bailleur', ['pays-bas', 'pays bas', 'netherlands']),
  P('danida', 'Danida', 'Ministère des Affaires étrangères du Danemark (Danida)', 'Bailleur', ['danida', 'danemark']),
  P('famoc', 'FAMOC', 'FAMOC', 'Partenaire de mise en œuvre', ['famoc']),
  P('gffo', 'GFFO', 'Ministère fédéral allemand des Affaires étrangères', 'Bailleur', ['gffo'], { logo: '/assets/partenaires/gffo.png', website: 'https://www.auswaertiges-amt.de/' }),
  P('bmz', 'BMZ', 'Ministère fédéral allemand de la Coopération économique et du Développement', 'Bailleur', ['bmz']),
  P('giz', 'GIZ', 'Coopération allemande (GIZ)', 'Bailleur', ['giz'], { website: 'https://www.giz.de/' }),
  P('norad', 'NORAD', 'Agence norvégienne de coopération au développement', 'Bailleur', ['norad']),
  P('amc', 'AMC', 'Affaires mondiales Canada', 'Bailleur', ['affaires mondiales canada', 'amc', 'global affairs canada', 'gac', 'cida']),
  P('aics', 'AICS', 'Agence italienne pour la coopération au développement', 'Bailleur', ['aics', 'agence italienne']),
  P('fonds-italien', 'Fonds italien', 'Fonds italien (via UNHCR)', 'Bailleur', ['fonds italien']),
  P('aacid', 'AACID', 'Agence andalouse de coopération internationale au développement', 'Bailleur', ['aacid']),
  P('aecid', 'AECID', 'Agence espagnole de coopération internationale au développement', 'Bailleur', ['aecid']),
  P('fondation-hilton', 'Fondation Hilton', 'Fondation Conrad N. Hilton', 'Bailleur', ['hilton'], { website: 'https://www.hiltonfoundation.org/' }),
  P('fondation-stromme', 'Fondation Strømme', 'Fondation Strømme Afrique de l’Ouest', 'Partenaire de mise en œuvre', ['stromme', 'strømme'], { logo: '/assets/partenaires/stromme.png', website: 'https://strommefoundation.org/' }),
  P('whh', 'WHH', 'Welthungerhilfe', 'ONG internationale', ['whh', 'welthungerhilfe', 'welt hunger hilfe'], { website: 'https://www.welthungerhilfe.org/' }),
  P('cordaid', 'Cordaid', 'Cordaid', 'ONG internationale', ['cordaid']),
  P('plan-international', 'Plan International', 'Plan International', 'ONG internationale', ['plan international', 'plan'], { website: 'https://plan-international.org/' }),
  P('save-the-children', 'Save the Children', 'Save the Children International', 'ONG internationale', ['save the children'], { website: 'https://www.savethechildren.net/' }),
  P('crs', 'CRS', 'Catholic Relief Services', 'ONG internationale', ['crs', 'catholic relief services', 'catholique relief service'], { website: 'https://www.crs.org/' }),
  P('alinea', 'Alinea', 'Alinea International', 'ONG internationale', ['alinea']),
  P('aen', 'AEN', 'Aide de l’Église norvégienne', 'ONG internationale', ['aen', 'aide de l eglise norvegienne']),
  P('acf', 'ACF', 'Action contre la Faim', 'ONG internationale', ['acf', 'action contre la faim'], { website: 'https://www.actioncontrelafaim.org/' }),
  P('educo', 'EDUCO', 'EDUCO', 'ONG internationale', ['educo'], { website: 'https://www.educo.org/' }),
  P('tdh', 'Tdh', 'Terre des hommes', 'ONG internationale', ['tdh', 'terre des hommes']),
  P('ayuda-en-accion', 'Ayuda en Acción', 'Ayuda en Acción', 'ONG internationale', ['ayuda en accion', 'aea']),
  P('pain-pour-le-monde', 'Pain pour le Monde', 'Pain pour le Monde', 'Bailleur', ['pain pour le monde', 'ppm', 'ppml', 'pplm']),
  P('intersos', 'INTERSOS', 'INTERSOS', 'ONG internationale', ['intersos']),
  P('diakonia', 'Diakonia', 'Diakonia', 'ONG internationale', ['diakonia']),
  P('ilri', 'ILRI', 'Institut international de recherche sur l’élevage', 'Organisation internationale', ['ilri']),
  P('fhi360', 'FHI 360', 'FHI 360', 'ONG internationale', ['fhi 360', 'fhi360']),
  P('caeb', 'CAEB', 'Conseil et Appui pour l’Éducation à la Base', 'ONG nationale', ['caeb']),
  P('radl', 'RADL', 'RADL', 'ONG nationale', ['radl']),
  P('festival-vivre-ensemble', 'Festival Vivre Ensemble', 'Festival Vivre Ensemble', 'Partenaire national', ['festival vivre ensemble']),
  P('femaph', 'FEMAPH', 'Fédération malienne des associations de personnes handicapées', 'Fédération', ['femaph']),
  P('adefim', 'ADEFIM', 'Association pour le développement de la femme au Mali', 'ONG nationale', ['adefim', 'adfim']),
  P('think-peace', 'Think Peace', 'Think Peace', 'ONG nationale', ['think peace']),
  P('arga', 'ARGA', 'Alliance pour refonder la gouvernance en Afrique', 'Réseau', ['arga']),
  P('gouvernement-mali', 'Gouvernement du Mali', 'Gouvernement du Mali (ministères et collectivités)', 'Gouvernement', ['gouvernement du mali', 'ministere de l urbanisme']),
  // Partenaires historiques cités par les bases (sans projet dans le registre actuel)
  P('oxfam', 'Oxfam', 'Oxfam', 'ONG internationale', ['oxfam']),
  P('unesco', 'UNESCO', 'UNESCO', 'Organisation internationale', ['unesco']),
  P('fao', 'FAO', 'Organisation des Nations Unies pour l’alimentation et l’agriculture', 'Organisation internationale', ['fao']),
  P('bit', 'BIT', 'Bureau international du Travail', 'Organisation internationale', ['bit', 'bureau international du travail']),
  P('irc', 'IRC', 'International Rescue Committee', 'ONG internationale', ['irc']),
  P('care', 'CARE', 'CARE International', 'ONG internationale', ['care international']),
  P('drc', 'DRC', 'Conseil danois pour les réfugiés', 'ONG internationale', ['drc']),
  P('nrc', 'NRC', 'Conseil norvégien pour les réfugiés', 'ONG internationale', ['nrc']),
  P('mdm', 'Médecins du Monde', 'Médecins du Monde', 'ONG internationale', ['medecins du monde']),
  P('aah', 'AAH', 'AAH', 'ONG internationale', ['aah']),
  P('eumc', 'EUMC', 'Entraide universitaire mondiale du Canada', 'ONG internationale', ['eumc', 'wusc']),
]
const EXCLUS = /^(amss|ong amss|n\/d|a completer|consortium)$/

const reCache = new Map()
const wordRe = (alias) => {
  if (!reCache.has(alias)) reCache.set(alias, new RegExp(`(^|[^a-z0-9])${alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([^a-z0-9]|$)`))
  return reCache.get(alias)
}
/** Trouve les partenaires cités dans un texte. Les segments non reconnus deviennent des partenaires « libres ». */
function partnersInText(text) {
  const out = []
  if (/^(n\/d|nd|a completer)?$/.test(norm(text))) return out
  String(text || '').split(/\s*(?:\/|;|\n)\s*/).forEach((seg) => {
    const n = norm(seg)
    if (!n || EXCLUS.test(n)) return
    const hits = CATALOGUE.filter((c) => c.match.some((a) => wordRe(a).test(n)))
    // « Commission européenne — DG ECHO » : ECHO seul, pas l’UE
    const filtered = hits.some((h) => h.slug === 'dg-echo') ? hits.filter((h) => h.slug !== 'union-europeenne') : hits
    if (filtered.length) filtered.forEach((h) => out.push(h.slug))
    else out.push({ libre: seg.replace(/\s+/g, ' ').trim() })
  })
  return out
}

/* ============ Construction du réseau ============ */
const partenairesMap = new Map(CATALOGUE.map((c) => [c.slug, { ...c, projets: [], regions: new Set(), bases: new Set(), roles: new Set() }]))
const ensurePartner = (ref) => {
  if (typeof ref === 'string') return partenairesMap.get(ref)
  const slug = slugify(ref.libre)
  if (!partenairesMap.has(slug))
    partenairesMap.set(slug, { slug, acronym: ref.libre, name: ref.libre, type: 'Partenaire', match: [], projets: [], regions: new Set(), bases: new Set(), roles: new Set() })
  return partenairesMap.get(slug)
}

const baseList = (bureaux || []).map((b) => ({ ...b, regions: b.regions || [] }))
const basesForRegions = (regions) => baseList.filter((b) => b.regions.some((r) => regions.includes(r))).map((b) => b.slug)

const slugsUsed = new Set()
export const projetsReseau = projets.map((p) => {
  let slug = slugify(p.code || p.projectId)
  if (slugsUsed.has(slug)) slug = slugify(p.projectId)
  slugsUsed.add(slug)
  const bailleurs = [...new Set(partnersInText(p.bailleur).map((r) => ensurePartner(r).slug))]
  const miseEnOeuvre = [...new Set(partnersInText(p.partenaires).map((r) => ensurePartner(r).slug))].filter((s) => !bailleurs.includes(s))
  return { ...p, slug, bailleurs, miseEnOeuvre, bases: basesForRegions(p.regions || []) }
})
export const projetsBySlug = new Map(projetsReseau.map((p) => [p.slug, p]))
const byProjectId = new Map(projetsReseau.map((p) => [p.projectId, p]))

projetsReseau.forEach((p) => {
  const add = (slug, role) => {
    const part = partenairesMap.get(slug)
    part.projets.push(p)
    part.roles.add(role)
    ;(p.regions || []).forEach((r) => part.regions.add(r))
    p.bases.forEach((b) => part.bases.add(b))
  }
  p.bailleurs.forEach((s) => add(s, 'Bailleur'))
  p.miseEnOeuvre.forEach((s) => add(s, 'Partenaire de mise en œuvre'))
})

// Partenaires historiques déclarés par chaque base
const partnersCartoByBase = {}
baseList.forEach((b) => {
  const slugs = new Set()
  ;(b.partnersCarto || []).forEach((name) => partnersInText(name).forEach((r) => {
    const part = ensurePartner(r)
    part.bases.add(b.slug)
    slugs.add(part.slug)
  }))
  partnersCartoByBase[b.slug] = slugs
})

const ordreStatut = (p) => (p.status === 'En cours' ? 0 : p.status === 'Suspendu' ? 1 : 2)
const trierProjets = (list) =>
  [...list].sort((a, b) => ordreStatut(a) - ordreStatut(b) || String(b.endDate || b.startDate || '').localeCompare(String(a.endDate || a.startDate || '')))

export const partenaires = [...partenairesMap.values()]
  .map((p) => ({
    ...p,
    projets: trierProjets([...new Map(p.projets.map((x) => [x.slug, x])).values()]),
    regions: zonesMenu.map((z) => z.label).filter((r) => p.regions.has(r)),
    bases: baseList.map((b) => b.slug).filter((s) => p.bases.has(s)),
    roles: [...p.roles],
  }))
  .filter((p) => p.projets.length || p.bases.length)
  .sort((a, b) => b.projets.length - a.projets.length || a.acronym.localeCompare(b.acronym, 'fr'))
export const partenairesBySlug = new Map(partenaires.map((p) => [p.slug, p]))

const uniq = (arr) => [...new Set(arr)]
const partnersOf = (list) => {
  const slugs = uniq(list.flatMap((p) => [...p.bailleurs, ...p.miseEnOeuvre]))
  return partenaires.filter((x) => slugs.includes(x.slug))
}

export const zones = zonesMenu.map((z) => {
  const projetsZone = trierProjets(projetsReseau.filter((p) => (p.regions || []).includes(z.label)))
  return { ...z, projets: projetsZone, partenaires: partnersOf(projetsZone), bases: baseList.filter((b) => b.regions.includes(z.label)).map((b) => b.slug) }
})
export const zonesByLabel = new Map(zones.map((z) => [z.label, z]))

export const bases = baseList.map((b) => {
  const projetsBase = trierProjets(projetsReseau.filter((p) => p.bases.includes(b.slug)))
  const fromProjects = partnersOf(projetsBase)
  const historiques = partenaires.filter((x) => partnersCartoByBase[b.slug]?.has(x.slug) && !fromProjects.includes(x))
  return { ...b, projets: projetsBase, partenaires: fromProjects, partenairesHistoriques: historiques }
})
export const basesBySlug = new Map(bases.map((b) => [b.slug, b]))

/** Programme parent d’un projet + les autres composantes du même programme */
export function programmeDe(projet) {
  if (!projet?.programmeId) return null
  const prog = (programmes || []).find((x) => x.projectId === projet.programmeId)
  if (!prog) return null
  return { ...prog, composantes: prog.composantes.map((id) => byProjectId.get(id)).filter(Boolean) }
}

/* ============ Listes enrichies utilisées par les pages ============ */
export const projetsEnCours = projetsReseau
  .filter((p) => p.status === 'En cours' || p.status === 'Suspendu')
  .sort((a, b) => String(b.startDate || '').localeCompare(String(a.startDate || '')))
export const projetsTermines = projetsReseau
  .filter((p) => p.status === 'Terminé')
  .sort((a, b) => String(b.endDate || '').localeCompare(String(a.endDate || '')))
export { rapports, programmes } from './projetsData.js'

/* ============ Chiffres globaux (accueil, À propos, pied de page) ============ */
export const ANNEE_CREATION = 1991
export const statsGlobales = {
  anneesExperience: new Date().getFullYear() - ANNEE_CREATION,
  regions: zones.filter((z) => z.projets.length).length,
  projetsEnCours: projetsEnCours.length,
  projetsTermines: projetsTermines.length,
  projetsTotal: projetsReseau.length,
  partenairesActifs: partenaires.filter((p) => p.projets.some((x) => x.status !== 'Terminé')).length,
  partenaires: partenaires.filter((p) => p.projets.length).length,
  bases: bases.length,
}

/** Slugs des partenaires reconnus dans un nom ou une liste de noms (actualités, textes libres) */
export function trouverPartenaires(noms = []) {
  const slugs = new Set()
  ;[].concat(noms).forEach((n) => partnersInText(n).forEach((r) => {
    if (typeof r === 'string' && partenairesBySlug.has(r)) slugs.add(r)
  }))
  return [...slugs]
}
/** Projet par code du registre (ex. « PADEM ») */
export const projetParCode = (code) => projetsReseau.find((p) => String(p.code || '').toUpperCase() === String(code || '').toUpperCase()) || null
