// Données des projets AMSS
import projetTablesBancs from '../assets/projet-tables-bancs-amss.jpeg'
import amssTerrainActivites from '../assets/amss-terrain-activites.jpeg'
import amssSecuriteHumaine from '../assets/amss-securite-humaine.jpeg'

export const projetsEnCours = [
  {
    id: 1,
    title: "Projet Green Jobs - Tables-Bancs Plastique",
    startDate: "2024-01-01",
    endDate: "2025-12-31",
    status: "En cours",
    donor: "Fondation Stromme Afrique de l'Ouest",
    image: projetTablesBancs,
    excerpt: "Fabrication de tables-bancs en plastique recyclé pour les écoles de Tombouctou dans le cadre du développement durable.",
    description: `Le projet Green Jobs, financé par la Fondation Stromme Afrique de l'Ouest, représente une initiative innovante de l'AMSS pour combiner protection environnementale et développement éducatif. Ce projet consiste en la fabrication de tables-bancs scolaires à partir de plastique recyclé, créant ainsi des emplois verts tout en répondant aux besoins éducatifs des communautés.

**Objectifs du projet :**
- Créer des emplois durables pour les jeunes
- Réduire les déchets plastiques dans l'environnement
- Équiper les écoles en mobilier scolaire de qualité
- Sensibiliser aux enjeux environnementaux

**Réalisations à ce jour :**
- 260 tables-bancs remis gratuitement aux écoles de Tombouctou
- Formation de 40 jeunes aux techniques de recyclage
- Création d'un atelier de production à Mountougoula
- Sensibilisation de plus de 1,000 personnes aux enjeux environnementaux`,
    domain: "Environnement",
    region: "Tombouctou",
    beneficiaries: 2600,
    budget: "150,000 USD"
  },
  {
    id: 2,
    title: "Programme SSA/P - Scolarisation Accélérée",
    startDate: "2023-09-01",
    endDate: "2025-06-30",
    status: "En cours",
    donor: "Fondation Stromme",
    image: amssTerrainActivites,
    excerpt: "Stratégie de Scolarisation Accélérée pour les enfants non scolarisés ou déscolarisés de 8-12 ans dans les régions du Nord Mali.",
    description: `Le Programme de Stratégie de Scolarisation Accélérée (SSA/P) vise à offrir une seconde chance aux enfants qui n'ont pas eu accès à l'éducation formelle ou qui ont été déscolarisés à cause des crises. Ce programme innovant condense le curriculum de l'école primaire en 3 ans au lieu de 6.

**Méthodologie :**
- Approche pédagogique adaptée aux enfants plus âgés
- Classes de 25 élèves maximum
- Enseignants spécialement formés
- Matériel didactique adapté

**Résultats exceptionnels :**
- Taux de réussite de 99,01% en 2021-2022
- Plus de 1,500 apprenants actuellement inscrits
- 50+ centres SSA/P ouverts
- 85% des diplômés intègrent l'école formelle`,
    domain: "Éducation",
    region: "National",
    beneficiaries: 1500,
    budget: "300,000 USD"
  },
  {
    id: 3,
    title: "Programme WASH d'Urgence",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    status: "En cours",
    donor: "UNICEF Mali",
    image: amssTerrainActivites,
    excerpt: "Amélioration de l'accès à l'eau potable, à l'assainissement et promotion de l'hygiène dans les communautés vulnérables.",
    description: `Le Programme WASH d'Urgence répond aux besoins critiques en eau, assainissement et hygiène des populations affectées par les crises au Mali. Ce programme adopte une approche communautaire pour assurer la durabilité des interventions.

**Composantes du programme :**
- Construction et réhabilitation de points d'eau
- Construction de latrines familiales et communautaires
- Sensibilisation aux bonnes pratiques d'hygiène
- Formation des comités de gestion

**Réalisations 2024 :**
- 25 forages réalisés et 15 puits réhabilités
- 500 latrines familiales construites
- 50 latrines scolaires aménagées
- 15,000 personnes sensibilisées à l'hygiène`,
    domain: "WASH",
    region: "National",
    beneficiaries: 50000,
    budget: "500,000 USD"
  },
  {
    id: 4,
    title: "Programme Protection et VBG",
    startDate: "2023-06-01",
    endDate: "2025-05-31",
    status: "En cours",
    donor: "UNHCR",
    image: amssSecuriteHumaine,
    excerpt: "Protection des populations déplacées et lutte contre les violences basées sur le genre dans les régions du Nord et Centre Mali.",
    description: `Ce programme vise à renforcer la protection des populations vulnérables, en particulier les femmes, les enfants et les personnes déplacées internes, tout en luttant contre les violences basées sur le genre.

**Axes d'intervention :**
- Identification et prise en charge des cas de VBG
- Renforcement des mécanismes de protection communautaire
- Sensibilisation et prévention
- Appui psychosocial aux survivants

**Impact du programme :**
- 500+ cas de VBG pris en charge
- 200 leaders communautaires formés
- 50 espaces sûrs pour femmes créés
- 10,000 personnes sensibilisées`,
    domain: "Protection",
    region: "Gao",
    beneficiaries: 15000,
    budget: "400,000 USD"
  },
  {
    id: 5,
    title: "Programme Santé Reproductive DEBBO ALAFIA",
    startDate: "2024-03-01",
    endDate: "2026-02-28",
    status: "En cours",
    donor: "Fonds Mondial",
    image: amssTerrainActivites,
    excerpt: "Amélioration de l'accès aux services de santé reproductive et aux droits reproductifs et sexuels des femmes et adolescentes.",
    description: `Le Programme DEBBO ALAFIA (Femme en Paix) se concentre sur l'amélioration de la santé reproductive des femmes et adolescentes dans les zones rurales et périurbaines du Mali.

**Objectifs spécifiques :**
- Améliorer l'accès aux services de planification familiale
- Réduire la mortalité maternelle et néonatale
- Renforcer les capacités des structures sanitaires
- Sensibiliser aux droits reproductifs

**Activités principales :**
- Formation du personnel de santé
- Équipement des centres de santé
- Campagnes de sensibilisation communautaire
- Appui aux accouchements assistés`,
    domain: "Santé",
    region: "Ségou",
    beneficiaries: 25000,
    budget: "600,000 USD"
  }
]

export const projetsTermines = [
  {
    id: 6,
    title: "Projet Sécurité Humaine UNMAS",
    startDate: "2022-01-01",
    endDate: "2022-12-31",
    status: "Terminé",
    donor: "UNMAS (Service de l'action antimines des Nations Unies)",
    image: amssSecuriteHumaine,
    excerpt: "Projet de localisation et protection des civils dans les zones affectées par les conflits armés.",
    description: `Le Projet Sécurité Humaine UNMAS a été mis en œuvre pour améliorer la sécurité des populations civiles dans les zones affectées par les conflits au Nord Mali. Ce projet s'inscrivait dans le cadre des efforts de stabilisation et de protection des communautés.

**Objectifs atteints :**
- Cartographie des zones à risque
- Formation des communautés aux risques sécuritaires
- Mise en place de mécanismes d'alerte précoce
- Renforcement des capacités locales de protection

**Résultats obtenus :**
- 50 communautés formées aux risques sécuritaires
- 200 leaders communautaires sensibilisés
- 10 mécanismes d'alerte précoce établis
- 15,000 personnes directement bénéficiaires`,
    domain: "Protection",
    region: "Tombouctou",
    beneficiaries: 15000,
    budget: "200,000 USD"
  },
  {
    id: 7,
    title: "Programme Multi-acteurs d'Alphabétisation",
    startDate: "2020-01-01",
    endDate: "2023-12-31",
    status: "Terminé",
    donor: "Gouvernement du Mali",
    image: amssTerrainActivites,
    excerpt: "Programme d'alphabétisation fonctionnelle pour les femmes des groupes d'épargne et de crédit.",
    description: `Ce programme visait à combiner alphabétisation et activités économiques pour autonomiser les femmes rurales. Il s'agissait d'une approche intégrée liant éducation et développement économique.

**Approche méthodologique :**
- Alphabétisation en langues nationales
- Formation en gestion financière
- Création de groupes d'épargne et de crédit
- Suivi post-formation

**Résultats finaux :**
- 1,000+ femmes alphabétisées
- 150 groupes d'épargne créés
- Taux de réussite de 85%
- 500,000 FCFA d'épargne moyenne par groupe`,
    domain: "Éducation",
    region: "National",
    beneficiaries: 1000,
    budget: "250,000 USD"
  },
  {
    id: 8,
    title: "Programme Gouvernance Partagée (PGP2)",
    startDate: "2019-06-01",
    endDate: "2022-05-31",
    status: "Terminé",
    donor: "Union Européenne",
    image: amssSecuriteHumaine,
    excerpt: "Renforcement de la gouvernance locale et promotion de la participation citoyenne dans les processus de prise de décision.",
    description: `Le Programme de Gouvernance Partagée visait à améliorer la gouvernance locale en renforçant les capacités des collectivités territoriales et en promouvant la participation citoyenne.

**Axes d'intervention :**
- Renforcement des capacités des élus locaux
- Formation des organisations de la société civile
- Promotion de la transparence dans la gestion publique
- Facilitation du dialogue entre citoyens et autorités

**Impact du programme :**
- 100 élus locaux formés
- 50 organisations de société civile renforcées
- 30 mécanismes de dialogue établis
- 25,000 citoyens sensibilisés à leurs droits`,
    domain: "Gouvernance",
    region: "Tombouctou",
    beneficiaries: 25000,
    budget: "800,000 USD"
  },
  {
    id: 9,
    title: "Projet Walaikum - Réconciliation Nord Mali",
    startDate: "2018-01-01",
    endDate: "2021-12-31",
    status: "Terminé",
    donor: "Ambassade des Pays-Bas",
    image: amssSecuriteHumaine,
    excerpt: "Projet d'atténuation des conflits et de réconciliation entre les communautés du Nord Mali.",
    description: `Le Projet Walaikum (Paix sur vous) était une initiative de consolidation de la paix visant à restaurer la cohésion sociale entre les différentes communautés du Nord Mali après la crise de 2012.

**Stratégies mises en œuvre :**
- Dialogue intercommunautaire
- Médiation traditionnelle
- Activités de réconciliation
- Renforcement des mécanismes de paix locaux

**Résultats de réconciliation :**
- 50 accords de paix intercommunautaires signés
- 200 médiateurs traditionnels formés
- 100 activités de réconciliation organisées
- 30,000 personnes touchées par les activités`,
    domain: "Gouvernance",
    region: "Gao",
    beneficiaries: 30000,
    budget: "450,000 USD"
  },
  {
    id: 10,
    title: "Emergency Food Support - Sécurité Alimentaire",
    startDate: "2017-03-01",
    endDate: "2018-02-28",
    status: "Terminé",
    donor: "PAM (Programme Alimentaire Mondial)",
    image: amssTerrainActivites,
    excerpt: "Assistance alimentaire d'urgence aux familles affectées par les conflits et la sécheresse dans le Nord Mali.",
    description: `Ce projet d'urgence visait à répondre aux besoins alimentaires immédiats des populations affectées par la combinaison des conflits armés et de la sécheresse dans les régions du Nord Mali.

**Modalités d'intervention :**
- Distribution de vivres
- Transferts monétaires
- Appui nutritionnel aux enfants malnutris
- Renforcement des moyens d'existence

**Résultats d'urgence :**
- 10,000 ménages assistés
- 50,000 personnes bénéficiaires
- 500 tonnes de vivres distribuées
- 1,200 enfants traités pour malnutrition`,
    domain: "Sécurité Alimentaire",
    region: "Tombouctou",
    beneficiaries: 50000,
    budget: "1,200,000 USD"
  }
]

export const rapports = [
  {
    id: 1,
    title: "Rapport Gouvernement 2024 AMSS",
    year: 2024,
    type: "Rapport annuel",
    cover: null,
    excerpt: "Rapport annuel d'activités de l'AMSS présenté au Gouvernement du Mali pour l'année 2024.",
    description: "Ce rapport présente l'ensemble des activités, réalisations et impacts de l'AMSS au cours de l'année 2024. Il détaille les interventions dans les huit domaines d'activité et les huit régions d'intervention.",
    published: true
  },
  {
    id: 2,
    title: "Rapport Narratif 2022 AMSS",
    year: 2022,
    type: "Rapport d'activité",
    cover: null,
    excerpt: "Rapport narratif détaillé des activités et réalisations de l'AMSS pour l'année 2022.",
    description: "Rapport complet présentant les activités programmatiques, les partenariats, les défis rencontrés et les perspectives pour l'année suivante.",
    published: true
  },
  {
    id: 3,
    title: "Rapport Audit Consolidé 2022",
    year: 2022,
    type: "Rapport d'audit",
    cover: null,
    excerpt: "Rapport d'audit financier et programmatique consolidé de l'AMSS pour l'exercice 2022.",
    description: "Audit externe réalisé par un cabinet indépendant, présentant la situation financière et la conformité des procédures de l'AMSS.",
    published: true
  },
  {
    id: 4,
    title: "Rapport Audit Consolidé 2021",
    year: 2021,
    type: "Rapport d'audit",
    cover: null,
    excerpt: "Rapport d'audit financier et programmatique consolidé de l'AMSS pour l'exercice 2021.",
    description: "Évaluation indépendante de la gestion financière et programmatique de l'AMSS, incluant les recommandations d'amélioration.",
    published: true
  },
  {
    id: 5,
    title: "Rapport Audit Consolidé 2020",
    year: 2020,
    type: "Rapport d'audit",
    cover: null,
    excerpt: "Rapport d'audit financier et programmatique consolidé de l'AMSS pour l'exercice 2020.",
    description: "Audit complet des activités et de la gestion financière de l'AMSS durant l'année 2020, première année de la pandémie COVID-19.",
    published: true
  },
  {
    id: 6,
    title: "AMSS Tombouctou 2025 - Plan d'Action",
    year: 2025,
    type: "Rapport de projet",
    cover: null,
    excerpt: "Plan d'action et programmation des activités de l'AMSS dans la région de Tombouctou pour 2025.",
    description: "Document de planification détaillant les objectifs, activités et indicateurs pour les interventions de l'AMSS à Tombouctou.",
    published: true
  },
  {
    id: 7,
    title: "AMSS Gao 2025 - Plan d'Action",
    year: 2025,
    type: "Rapport de projet",
    cover: null,
    excerpt: "Plan d'action et programmation des activités de l'AMSS dans la région de Gao pour 2025.",
    description: "Programmation stratégique des interventions dans la région de Gao, avec focus sur la protection et l'éducation.",
    published: true
  },
  {
    id: 8,
    title: "AMSS Mopti 2025 - Plan d'Action",
    year: 2025,
    type: "Rapport de projet",
    cover: null,
    excerpt: "Plan d'action et programmation des activités de l'AMSS dans la région de Mopti pour 2025.",
    description: "Document de planification pour les interventions dans la région de Mopti, axées sur la gouvernance et la cohésion sociale.",
    published: true
  }
]

export const partenaires = [
  {
    name: "Fondation Stromme Afrique de l'Ouest",
    type: "Bailleur",
    description: "Partenaire stratégique pour l'éducation et la microfinance",
    projets: ["Projet Green Jobs", "Programme SSA/P", "Microfinance"]
  },
  {
    name: "UNHCR",
    type: "Organisation internationale",
    description: "Partenaire pour la protection des populations déplacées",
    projets: ["Programme Protection et VBG"]
  },
  {
    name: "UNICEF Mali",
    type: "Organisation internationale", 
    description: "Partenaire pour l'éducation, la santé et le WASH",
    projets: ["Programme WASH", "Éducation d'urgence"]
  },
  {
    name: "UNMAS",
    type: "Organisation internationale",
    description: "Service de l'action antimines des Nations Unies",
    projets: ["Projet Sécurité Humaine"]
  },
  {
    name: "Gouvernement du Mali",
    type: "Gouvernement",
    description: "Partenaire institutionnel principal",
    projets: ["Tous les projets"]
  }
]

