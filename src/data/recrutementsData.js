// src/data/recrutementsData.js

// Catégories standard
export const CATEGORIES = {
  EMPLOI: 'emploi',
  MARCHE: 'marche', // marchés & prestations
}

/**
 * 🧩 Schéma d’une offre (enCours) :
 * {
 *   id: number,
 *   category: 'emploi' | 'marche',
 *   titre: string,
 *   lieu?: string,
 *   datePublication?: string (ex: "13 mai 2025" ou "2025-05-13"),
 *   type?: string (ex: "CDI" | "CDD" | "Prestation"),
 *   domaine?: string,
 *   description?: string,
 *   competences?: string[],
 *   dateExpiration?: string (FR ou ISO),
 *   pdfUrl?: string (ex: "/recrutements/2025-05-13-offre.pdf")
 * }
 *
 * 🧩 Schéma d’une archive (archives) = ci-dessus + statut?: "Clôturé" | "Pourvu" | ...
 */

export const enCours = [
  {
    id: 1,
    category: CATEGORIES.EMPLOI,
    titre: "Un Superviseur en Agriculture",
    lieu: "Mountoungoula, Mali",
    datePublication: "13 mai 2025",
    type: "CDI",
    domaine: "Agriculture",
    description:
      "Recherche d'un superviseur expérimenté pour superviser les activités agricoles dans le cadre du projet Sécurité Alimentaire financé par la Fondation Stromme.",
    competences: ["Diplôme en agronomie", "5 ans d'expérience minimum", "Maîtrise du français et langues locales"],
    dateExpiration: "30 septembre 2025",
    // Dépose ton PDF dans /public/recrutements/ puis référence-le ci-dessous :
    // pdfUrl: "/recrutements/2025-05-13-superviseur-agriculture.pdf",
  },
  {
    id: 2,
    category: CATEGORIES.EMPLOI,
    titre: "Avis de recrutement de (90) Animateurs/trices de centres d'Alphabétisation",
    lieu: "Mali (plusieurs régions)",
    datePublication: "6 janvier 2025",
    type: "CDD",
    domaine: "Éducation",
    description:
      "Recrutement massif d'animateurs pour les centres d'alphabétisation dans le cadre de l'expansion des programmes éducatifs de l'AMSS.",
    competences: ["DEF minimum", "Expérience en alphabétisation", "Connaissance des langues locales"],
    dateExpiration: "15 octobre 2025",
    // pdfUrl: "/recrutements/2025-01-06-animateurs-alphabetisation.pdf",
  },

  // Exemple d’avis « marchés & prestations » (actif)
  // {
  //   id: 13,
  //   category: CATEGORIES.MARCHE,
  //   titre: "Appel d’offres – Réhabilitation de forages (Région de Ségou)",
  //   lieu: "Ségou",
  //   datePublication: "1 mars 2025",
  //   type: "Prestation",
  //   domaine: "WASH",
  //   description: "Sélection d’un prestataire pour réhabiliter 10 forages et latrines.",
  //   dateExpiration: "20 mars 2025",
  //   pdfUrl: "/recrutements/2025-03-01-ao-forages.pdf",
  // },
]

export const archives = [
  {
    id: 3,
    category: CATEGORIES.EMPLOI,
    titre: "Six (06) Conseillers(ères) en Education",
    lieu: "Sikasso, Mali",
    datePublication: "18 décembre 2024",
    type: "CDD",
    domaine: "Éducation",
    statut: "Clôturé",
    description:
      "Conseillers pédagogiques pour l'amélioration de la qualité de l'éducation dans la région de Sikasso.",
    // pdfUrl: "/recrutements/2024-12-18-conseillers-education.pdf",
  },
  {
    id: 4,
    category: CATEGORIES.EMPLOI,
    titre: "COORDINATEUR/TRICE EDUCATION",
    lieu: "Mountoungoula, Mali",
    datePublication: "15 août 2024",
    type: "CDI",
    domaine: "Éducation",
    statut: "Pourvu",
    description: "Coordination des activités éducatives et supervision des équipes pédagogiques.",
  },
  {
    id: 5,
    category: CATEGORIES.MARCHE,
    titre: "TROIS (3) PRESTATAIRES AU COMPTE DU PROJET PARTAGE",
    lieu: "GAO, MOPTI, SEGOU",
    datePublication: "19 juin 2024",
    type: "Prestation",
    domaine: "Humanitaire",
    statut: "Clôturé",
    description:
      "Prestataires pour le projet PARTAGE en partenariat avec INTERSOS dans les régions de Gao, Mopti et Ségou.",
  },
  // … tes autres archives historiques …
]
