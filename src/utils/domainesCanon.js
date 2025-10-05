// src/utils/domainesCanon.js
export const CANON_LABELS = {
  EDUCATION: 'Éducation',
  SANTE: 'Santé & Nutrition',
  SECALIM: 'Sécurité alimentaire & Moyens d’existence',
  WASH: 'WASH',
  PROTECTION: 'Protection & VBG',
  GOUV: 'Gouvernance & Paix',
  AUTRES: 'Autres'
}

const RULES = [
  { canon: 'EDUCATION', tokens: [
    'education','éducation','ssa','ssa2','s3a','ecole','école','alphab','formation','apprentissage',
    'passerelle','scolarisation','centre','enseign','didactique'
  ]},
  { canon: 'SANTE', tokens: [
    'sante','santé','nutrition','mas','mam','sr','pf','vaccin','matern','infant',
    'cmam','pec','whe','sani-nutri'
  ]},
  { canon: 'SECALIM', tokens: [
    'securite alimentaire','sécurité alimentaire','moyens d’existence','moyens d\'existence',
    'cash','transfert','vivres','agri','agricole','elevage','résilience','resilience','intrants'
  ]},
  { canon: 'WASH', tokens: [
    'wash','eau','assainissement','latrine','hygiene','hygiène','chloration','forage','adduction'
  ]},
  { canon: 'PROTECTION', tokens: [
    'protection','vbg','enfance','protection de l\'enfance','psychosocial','gbv',
    'deplaces','déplacés','refugies','réfugiés','unhcr','protec'
  ]},
  { canon: 'GOUV', tokens: [
    'gouvernance','paix','cohesion','cohésion','mediation','médiation','reconciliation','réconciliation',
    'participation','citoyenne','plaidoyer','institution','lobby','prevention extremisme','dialogue'
  ]}
]

const norm = (s) => String(s || '')
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()

export const splitDomains = (label) =>
  String(label || '')
    .split(/\s*[;,/|]\s*|\s*&\s*|\s*-\s*/g)
    .map(s => s.trim())
    .filter(Boolean)

export function getRawDomainField(project) {
  return project?.domaine ?? project?.domain ?? project?.secteur ?? project?.sector ?? ''
}

export function mapLabelToCanonKeys(label) {
  const n = norm(label)
  const out = new Set()
  for (const rule of RULES) {
    if (rule.tokens.some(tok => n.includes(tok))) out.add(rule.canon)
  }
  if (out.size === 0 && n) out.add('AUTRES')
  return out
}

export function projectToCanonKeys(project) {
  const raw = getRawDomainField(project)
  const pieces = splitDomains(raw)
  const keys = new Set()
  for (const p of pieces) {
    for (const k of mapLabelToCanonKeys(p)) keys.add(k)
  }
  if (keys.size === 0) keys.add('AUTRES')
  return keys
}

export function hasCanon(project, canonKey) {
  return projectToCanonKeys(project).has(canonKey)
}

export function canonLabel(canonKey) {
  return CANON_LABELS[canonKey] || CANON_LABELS.AUTRES
}
