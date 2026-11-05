// src/utils/beneficiaires.js
// Règle du site : quand le nombre de bénéficiaires n’est pas renseigné dans le registre, on affiche « N/A ».
export const NA = 'N/A'

/** Nombre de bénéficiaires d’un projet (nombre fiable) ou null */
export const nbBenef = (p) => {
  const v = p?.beneficiaries
  if (typeof v === 'number') return Number.isFinite(v) && v > 0 ? v : null
  if (typeof v === 'string' && /^\s*[\d\s.,]+\s*$/.test(v)) {
    const n = Number(v.replace(/[\s.,]/g, ''))
    return n > 0 ? n : null
  }
  return null
}

/** Texte à afficher pour un projet : « 30 000 » ou « N/A » */
export const benefAffiche = (p) => {
  const n = nbBenef(p)
  return n == null ? NA : n.toLocaleString('fr-FR')
}

/** Total des bénéficiaires renseignés d’une liste ; « N/A » si aucun n’est renseigné */
export const totalBenefAffiche = (list = []) => {
  const nums = list.map(nbBenef).filter((n) => n != null)
  if (!nums.length) return NA
  return nums.reduce((a, b) => a + b, 0).toLocaleString('fr-FR')
}

/** Nombre de projets dont les bénéficiaires sont renseignés (pour préciser un total partiel) */
export const nbRenseignes = (list = []) => list.filter((p) => nbBenef(p) != null).length
