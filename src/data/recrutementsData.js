// src/data/recrutementsData.js

// Catégories standard (onglets)
export const CATEGORIES = {
  EMPLOI: 'emploi',
  MARCHE: 'marche', // marchés & prestations
}

/**
 * Schémas :
 * - Offre active (enCours)
 *   {
 *     id: number,
 *     category: 'emploi' | 'marche',
 *     titre: string,
 *     lieu?: string,
 *     datePublication?: string, // "13 mai 2025" ou "2025-05-13"
 *     type?: string,            // "CDI" | "CDD" | "Prestation" | ...
 *     domaine?: string,
 *     description?: string,
 *     competences?: string[],
 *     dateExpiration?: string,  // FR ou ISO
 *     pdfUrl?: string           // ex: "/recrutements/2025-05-13-offre.pdf"
 *   }
 *
 * - Archive (archives) = ci-dessus + statut?: "Clôturé" | "Pourvu" | ...
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

  // Marché / prestation ACTIF
  {
    id: 21,
    category: CATEGORIES.MARCHE,
    titre: "Chargé(e) de l’élaboration des subventions",
    lieu: "Sirakoro",
    datePublication: "02/10/2025",
    type: "Prestation",
    domaine: "Developpement",
    description:
      "La personne chargée de l’élaboration des subventions travaillera avec les organisations viables qui font avancer le mandat du projet en complétant les activités directement mises en œuvre de l'AMSS.",
    competences: ["Très expérimenté(e)"],
    dateExpiration: "03 octobre 2025",
    pdfUrl: "/recrutements/Avis de recrutement chargé lélaboration des subventions_5.2020.pdf",
  },

  // Exemple (à activer plus tard si besoin)
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
  {
    id: 6,
    category: CATEGORIES.EMPLOI,
    titre: "30 ADC pour les antennes AMSS",
    lieu: "Bamako (06), Ségou (12) et Mopti (12)",
    datePublication: "23 avril 2024",
    type: "CDD",
    domaine: "Administration",
    statut: "Pourvu",
    description:
      "Agents de Développement Communautaire pour renforcer les équipes des antennes régionales.",
  },
  {
    id: 7,
    category: CATEGORIES.EMPLOI,
    titre: "03 coordinateurs régionaux",
    lieu: "Bamako, Ségou et Mopti",
    datePublication: "23 avril 2024",
    type: "CDI",
    domaine: "Coordination",
    statut: "Pourvu",
    description:
      "Coordinateurs pour la supervision des activités dans les antennes régionales.",
  },
  {
    id: 8,
    category: CATEGORIES.EMPLOI,
    titre: "Un (01) Responsable du CURRICULUM",
    lieu: "Mali",
    datePublication: "23 avril 2024",
    type: "CDI",
    domaine: "Éducation",
    statut: "Pourvu",
    description:
      "Responsable de l'élaboration et de la mise à jour des curricula éducatifs.",
  },
  {
    id: 9,
    category: CATEGORIES.EMPLOI,
    titre: "Un (01) Spécialiste de l'entrepreneuriat",
    lieu: "Bamako, Mali",
    datePublication: "23 avril 2024",
    type: "CDI",
    domaine: "Entrepreneuriat",
    statut: "Pourvu",
    description:
      "Spécialiste pour le développement des programmes d'entrepreneuriat et de microfinance.",
  },
  {
    id: 10,
    category: CATEGORIES.EMPLOI,
    titre: "16 Superviseurs Alpha",
    lieu: "Bamako (04), Ségou (07) et Mopti (05)",
    datePublication: "23 avril 2024",
    type: "CDD",
    domaine: "Éducation",
    statut: "Pourvu",
    description:
      "Superviseurs pour les programmes d'alphabétisation dans les antennes régionales.",
  },
  {
    id: 11,
    category: CATEGORIES.EMPLOI,
    titre: "Deux (02) Comptables",
    lieu: "Ségou (01) et Mopti (01)",
    datePublication: "23 avril 2024",
    type: "CDI",
    domaine: "Finance",
    statut: "Pourvu",
    description:
      "Comptables pour la gestion financière des antennes de Ségou et Mopti.",
  },
  {
    id: 12,
    category: CATEGORIES.EMPLOI,
    titre: "Un(e) Gestionnaire de l'information",
    lieu: "Bamako, Mali",
    datePublication: "2 avril 2024",
    type: "CDI",
    domaine: "Information",
    statut: "Pourvu",
    description:
      "Gestionnaire pour la collecte, l'analyse et la diffusion de l'information institutionnelle.",
  },
]
