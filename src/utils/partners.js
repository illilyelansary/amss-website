// src/utils/partners.js

// Normalise (accents, casse) pour matcher "Ségou" ~ "Segou"
const normalize = (s) =>
  (s || '')
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()

// Découpe une chaîne de bailleurs "UNHCR / UNFPA; ACF, CRS" → ["UNHCR","UNFPA","ACF","CRS"]
const splitDonors = (d) =>
  String(d || '')
    .split(/[\/;,|]/)          // séparateurs: / ; , |
    .map((x) => x.trim())
    .filter(Boolean)

/**
 * Calcule les partenaires pour 1 bureau
 * - Prend en compte partnersCarto (si présent sur le bureau)
 * - Ajoute les bailleurs des projets dont la "region" recoupe une des zones du bureau
 */
export function partnersForBureau(bureau, projetsEnCours = [], projetsTermines = []) {
  // zones: accepte array OU string "Ségou – San / Bla"
  const zonesList = Array.isArray(bureau.zones)
    ? bureau.zones
    : String(bureau.zones || '')
        .split(/[;,/–-]/)       // ; , / tiret court et long
        .map((s) => s.trim())
        .filter(Boolean)

  const zonesNorm = zonesList.map(normalize)

  // On démarre avec les partenaires issus de la cartographie (si fournis)
  const out = new Set(
    (bureau.partnersCarto || []).map((x) => x.trim()).filter(Boolean)
  )

  const allProjects = [...(projetsEnCours || []), ...(projetsTermines || [])]

  for (const p of allProjects) {
    const regionNorm = normalize(p.region || p.zones || '')
    if (!regionNorm) continue

    // S'il y a recouvrement région ↔ zones du bureau → on prend les bailleurs du projet
    const hit = zonesNorm.some((z) => z && regionNorm.includes(z))
    if (hit) {
      // Le champ peut s'appeler donor ou bailleur, et être string ou array
      const raw = Array.isArray(p.donor || p.bailleur)
        ? (p.donor || p.bailleur)
        : splitDonors(p.donor || p.bailleur)

      raw.forEach((d) => out.add(d))
    }
  }

  return Array.from(out).sort((a, b) => a.localeCompare(b))
}

/** Renvoie un mapping { [nomDuBureau]: [liste des partenaires] } */
export function mapPartnersByBureaux(bureaux = [], projetsEnCours = [], projetsTermines = []) {
  const res = {}
  for (const b of bureaux) {
    res[b.ville] = partnersForBureau(b, projetsEnCours, projetsTermines)
  }
  return res
}
