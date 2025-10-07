// src/data/recrutementsData.js

// ⚠️ Place tes PDF dans /public/recrutements/ et réfère-les avec des chemins absolus
//    ex: "/recrutements/2025-05-13-superviseur-agriculture.pdf"

const recrutementsData = {
  enCours: [
    {
      id: 1,
      category: 'emploi',
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
      id: 13,
      category: 'emploi',
      titre: "Responsable Communication",
      lieu: "Tombouctou, Mali",
      datePublication: "07 Octobre 2025",
      type: "Consultation",
      domaine: "Information et Communication",
      description:
        "Le Responsable communication pilote la stratégie de communication interne et/ou externe d’une entreprise ou organisation. Son rôle principal est de garantir la cohérence des messages transmis, d’assurer une visibilité optimale auprès des publics ciblés et de renforcer l’image de marque.",
         competences: ["Diplôme en Commmunication", "5 ans d'expérience minimum", "Maîtrise du français, de l'Anglais et langues locales"],
      dateExpiration: "08 Octobre 2025",
       pdfUrl: "/recrutements/chargecom.pdf",
    },
    {
      id: 2,
      category: 'emploi',
      titre: "Avis de recrutement de (90) Animateurs/trices de centres d'Alphabétisation",
      lieu: "Mali (plusieurs régions)",
      datePublication: "6 janvier 2025",
      type: "CDD",
      domaine: "Éducation",
      description:
        "Recrutement massif d'animateurs pour les centres d'alphabétisation dans le cadre de l'expansion des programmes éducatifs de l'AMSS.",
      competences: ["DEF minimum", "Expérience en alphabétisation", "Connaissance des langues locales"],
      dateExpiration: "15 Janvier 2025",
      // pdfUrl: "/recrutements/2025-01-06-animateurs-alphabetisation.pdf",
    },

    // Exemple Marché / Prestation actif
    {
      id: 21,
      category: 'marche',
      titre: "Chargé(e) de l’élaboration des subventions",
      lieu: "Sirakoro",
      datePublication: "02/10/2025",
      type: "Prestation",
      domaine: "Développement",
      description:
        "La/le chargé(e) de l’élaboration des subventions travaillera avec les organisations viables qui font avancer le mandat du projet en complétant les activités directement mises en œuvre de l'AMSS.",
      competences: ["Très expérimenté(e)"],
      dateExpiration: "03 octobre 2025",
      // Si le nom de fichier contient des espaces/accents, garde exactement le même dans /public/recrutements
      pdfUrl: "/recrutements/Avis de recrutement chargé lélaboration des subventions_5.2020.pdf",
    },
  ],

  archives: [
    {
      id: 3,
      category: 'emploi',
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
      category: 'emploi',
      titre: "COORDINATEUR/TRICE EDUCATION",
      lieu: "Mountoungoula, Mali",
      datePublication: "15 août 2024",
      type: "CDI",
      domaine: "Éducation",
      statut: "Pourvu",
      description:
        "Coordination des activités éducatives et supervision des équipes pédagogiques.",
    },
    {
      id: 5,
      category: 'marche',
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
      category: 'emploi',
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
      category: 'emploi',
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
      category: 'emploi',
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
      category: 'emploi',
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
      category: 'emploi',
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
      category: 'emploi',
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
      category: 'emploi',
      titre: "Un(e) Gestionnaire de l'information",
      lieu: "Bamako, Mali",
      datePublication: "2 avril 2024",
      type: "CDI",
      domaine: "Information",
      statut: "Pourvu",
      description:
        "Gestionnaire pour la collecte, l'analyse et la diffusion de l'information institutionnelle.",
    },
   
  ],
};

export default recrutementsData;
