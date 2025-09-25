// Données des projets AMSS — MAJ 2025
// Source principale : Rapport annuel d’activités AMSS 2024 (sections P-GLR+, Plan International, CRS/DEFI, NEX4FOOD/AECID, Pain pour le Monde, HCR, UNICEF, etc.)
import projetTablesBancs from '../assets/projet-tables-bancs-amss.jpeg'
import amssTerrainActivites from '../assets/amss-terrain-activites.jpeg'
import amssSecuriteHumaine from '../assets/amss-securite-humaine.jpeg'

/**
 * NB USAID : Conformément aux consignes de l'utilisateur, tout projet financé par USAID (incl. MIHR / JSI / NPI) comporte
 * la mention de suspension: "Suspendu suite aux décisions du Gouvernement américain (USAID)". 
 * Cette mention est ajoutée via le champ `usaidNote: true` et/ou préfixée dans `status`.
 */

export const projetsEnCours = [
  // --- Partenariat Fondation Strømme (Éducation/Microfinance/Green Jobs) ---
  {
    id: 1,
    title: "Plan stratégique SFWA (EPC/SSA-P/SSA2/S3A/AA) & Green Jobs",
    startDate: "2024-01-01",
    endDate: "2025-12-31",
    status: "En cours",
    donor: "Fondation Strømme Afrique de l’Ouest",
    image: projetTablesBancs,
    excerpt: "Éducation accélérée, microfinance (EPC), entrepreneuriat jeunes et unité Green Jobs (tables-bancs plastiques).",
    description: `Mise en œuvre du plan 2024–2028 avec centres SSA/P, SSA2, S3A, alphabétisation (AA), EPC et unité Green Jobs à Mountougoula. Résultats 2024 notables : 20 centres SSA/P (PS) + 20 SSA/P NORAD EXTRA, 10 SSA/P Mountougoula ; 22 033 femmes impliquées en EPC ; 963 tables-bancs assemblés, 53,9 t de sachets collectés.`,
    domain: "Éducation",
    region: "Tombouctou, Goundam, Diré & Mountougoula",
    beneficiaries: 25456,
    budget: "≈ 419 535 502 FCFA",
    sources: ["Rapport 2024, p.7–11"]
  },
  // --- Gouvernance locale (Cordaid) ---
  {
    id: 2,
    title: "Programme Gouvernance Locale Redevable (P‑GLR+)",
    startDate: "2024-01-01",
    endDate: "2025-12-31",
    status: "En cours",
    donor: "CORDAID",
    image: amssSecuriteHumaine,
    excerpt: "Renforcement du contrat social et redevabilité dans 35 communes de Tombouctou.",
    description: `Formations JL (1008 pers.), espaces de redevabilité, concours transparence, GIDRN, sensibilisation au paiement des taxes.`,
    domain: "Gouvernance",
    region: "Région de Tombouctou (35 communes)",
    beneficiaries: 1050,
    budget: "175 355 625 FCFA",
    sources: ["Rapport 2024, p.12–17"]
  },
  // --- Pain pour le Monde (cohésion/relance) ---
  {
    id: 3,
    title: "Appui cohésion sociale et relance économique (PPML)",
    startDate: "2024-01-01",
    endDate: "2025-12-31",
    status: "En cours",
    donor: "Pain pour le Monde",
    image: amssTerrainActivites,
    excerpt: "Insertion socio-économique des jeunes et cohésion dans 7 communes (Tombouctou, Goundam, Diré).",
    description: `611 jeunes appuyés (253 H/358 F) ; dispositifs radios, communicateurs traditionnels et leaders communautaires mobilisés.`,
    domain: "Cohésion sociale",
    region: "Tombouctou, Douékiré, Kondi",
    beneficiaries: 700,
    budget: "117 655 566 FCFA",
    sources: ["Rapport 2024, p.19–21"]
  },
  // --- NEX4FOOD / AECID (AEA) ---
  {
    id: 4,
    title: "NEX4FOOD — Sécurité alimentaire & nutrition (Ségou)",
    startDate: "2024-01-01",
    endDate: "2025-12-31",
    status: "En cours",
    donor: "Ayuda En Acción / AECID",
    image: amssTerrainActivites,
    excerpt: "Appui nutritionnel, théâtres participatifs VBG/cohésion et kits alimentaires pour PDI et hôtes.",
    description: `200 enfants malnutris + 100 FEFA appuyés (MISOLA) ; 100 ménages PDI/hôtes avec kits alimentaires ; 12 jeunes leaders formés à la RPC.`,
    domain: "Sécurité Alimentaire",
    region: "Ségou (Pelengana, Sébougou, Ségou ville)",
    beneficiaries: 1400,
    budget: "84 742 €",
    sources: ["Rapport 2024, p.21–23"]
  },
  // --- Plan International (BMZ) ---
  {
    id: 5,
    title: "Plan International — Résilience & cohésion sociale (BMZ)",
    startDate: "2024-01-01",
    endDate: "2025-12-31",
    status: "En cours",
    donor: "Plan International / BMZ",
    image: amssTerrainActivites,
    excerpt: "Protection de l’enfance, nutrition et employabilité jeunes ; centres d’apprentissage.",
    description: `4 centres d’échanges fonctionnels (200 jeunes) ; 100 acteurs de la protection formés ; 8 dialogues communautaires.`,
    domain: "Protection/Nutrition",
    region: "Gao & Ansongo",
    beneficiaries: 2000,
    budget: "109 792 322 FCFA (mise en œuvre AMSS) / 1 000 000 000 FCFA (apport Plan)",
    sources: ["Rapport 2024, p.23–25"]
  },
  // --- Plan International (GFFO) ---
  {
    id: 6,
    title: "Plan International — Protection enfants Sahel (GFFO)",
    startDate: "2024-01-01",
    endDate: "2025-12-31",
    status: "En cours",
    donor: "Plan International / GFFO (MAE Allemagne)",
    image: amssSecuriteHumaine,
    excerpt: "Mesures multisectorielles de protection et nutrition pour enfants <5 ans.",
    description: `50 survivantes VBG prises en charge ; 1300 enfants malnutris pris en charge ; 4 EAEs opérationnels ; 16 démonstrations culinaires.`,
    domain: "Protection/Nutrition",
    region: "Gao & Ansongo",
    beneficiaries: 2000,
    budget: "61 712 750 FCFA",
    sources: ["Rapport 2024, p.25–26"]
  },
  // --- CRS (AMC) ---
  {
    id: 7,
    title: "CRS — DÉFI Éducation des Filles (AMC/Canada)",
    startDate: "2024-01-01",
    endDate: "2026-12-31",
    status: "En cours",
    donor: "Affaires Mondiales Canada (via CRS)",
    image: amssTerrainActivites,
    excerpt: "Amélioration de la demande, accès et rétention des filles (et garçons) dans l’éducation formelle et non formelle.",
    description: `Régions : Ségou, Mopti, Gao, Tombouctou. Approches : changement de normes, sécurité, qualité de l’apprentissage, gestion publique basée sur des données.`,
    domain: "Éducation",
    region: "Ségou, Mopti, Gao, Tombouctou",
    beneficiaries: 5000,
    budget: "N/D (programme multi-acteurs)",
    sources: ["Rapport 2024, p.27"]
  },
  // --- UNICEF WASH (existant) ---
  {
    id: 8,
    title: "Programme WASH d’Urgence",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    status: "En cours",
    donor: "UNICEF Mali",
    image: amssTerrainActivites,
    excerpt: "Forages, réhabilitations, latrines et sensibilisation à l’hygiène.",
    description: `25 forages, 15 puits réhabilités ; 500 latrines familiales ; 50 latrines scolaires ; 15 000 personnes sensibilisées.`,
    domain: "WASH",
    region: "National",
    beneficiaries: 50000,
    budget: "≈ 500 000 USD",
    sources: ["Synthèse interne AMSS 2024"]
  },
  // --- HCR (monitoring/protection communautaire) ---
  {
    id: 9,
    title: "Protection communautaire & monitoring (HCR)",
    startDate: "2024-01-01",
    endDate: "2025-12-31",
    status: "En cours",
    donor: "HCR",
    image: amssSecuriteHumaine,
    excerpt: "Monitoring, espaces sûrs, prise en charge VBG et renforcement des mécanismes communautaires.",
    description: `Espaces sûrs, comités communautaires, sensibilisation, cas VBG pris en charge.`,
    domain: "Protection",
    region: "Gao, Kidal, Ménaka, Tombouctou",
    beneficiaries: 15000,
    budget: "N/D",
    sources: ["Rapport 2024, table des matières pp.39–41, 44–50"]
  },

  // --- USAID/JSI MIHR (doit porter la mention de suspension) ---
  {
    id: 10,
    title: "USAID/JSI — MIHR (Santé communautaire)",
    startDate: "2023-01-01",
    endDate: "2025-12-31",
    status: "Suspendu (USAID)",
    donor: "USAID / JSI — MIHR",
    image: amssTerrainActivites,
    excerpt: "Renforcement de la résilience sanitaire intégrée. — Suspendu suite aux décisions du Gouvernement américain (USAID).",
    description: `Activités de santé communautaire et amélioration de la demande SR/PF — MISE EN PAUSE.`,
    domain: "Santé",
    region: "Tombouctou",
    beneficiaries: 0,
    budget: "N/D",
    usaidNote: true,
    sources: ["Rapport 2024, pp.29–33 ; Note interne 2025"]
  },
  {
    id: 11,
    title: "USAID/JSI — NPI (Création de la demande SR/PF, Tombouctou)",
    startDate: "2023-01-01",
    endDate: "2025-12-31",
    status: "Suspendu (USAID)",
    donor: "USAID / JSI — NPI (MIHR)",
    image: amssTerrainActivites,
    excerpt: "Création de la demande SR/PF — Suspendu suite aux décisions du Gouvernement américain (USAID).",
    description: `Activités NPI au sein de MIHR — MISE EN PAUSE.`,
    domain: "Santé",
    region: "Tombouctou",
    beneficiaries: 0,
    budget: "N/D",
    usaidNote: true,
    sources: ["Rapport 2024, p.33 ; Note interne 2025"]
  }
]

// --- Projets terminés (inchangés + historiques) ---
export const projetsTermines = [
  {
    id: 101,
    title: "Projet Sécurité Humaine UNMAS",
    startDate: "2022-01-01",
    endDate: "2022-12-31",
    status: "Terminé",
    donor: "UNMAS (Service de l'action antimines des Nations Unies)",
    image: amssSecuriteHumaine,
    excerpt: "Localisation et protection des civils dans les zones affectées par les conflits armés.",
    description: `Cartographie des zones à risque, formations communautaires et mécanismes d’alerte précoce.`,
    domain: "Protection",
    region: "Tombouctou",
    beneficiaries: 15000,
    budget: "200 000 USD"
  },
  {
    id: 102,
    title: "Programme Multi‑acteurs d’Alphabétisation",
    startDate: "2020-01-01",
    endDate: "2023-12-31",
    status: "Terminé",
    donor: "Gouvernement du Mali",
    image: amssTerrainActivites,
    excerpt: "Alphabétisation fonctionnelle pour les femmes des groupes d’épargne/crédit.",
    description: `1 000+ femmes alphabétisées, 150 groupes d’épargne, taux de réussite 85 %.`,
    domain: "Éducation",
    region: "National",
    beneficiaries: 1000,
    budget: "250 000 USD"
  },
  {
    id: 103,
    title: "Programme Gouvernance Partagée (PGP2)",
    startDate: "2019-06-01",
    endDate: "2022-05-31",
    status: "Terminé",
    donor: "Union Européenne",
    image: amssSecuriteHumaine,
    excerpt: "Renforcement de la gouvernance locale et participation citoyenne.",
    description: `100 élus formés, 50 OSC renforcées, 30 mécanismes de dialogue.`,
    domain: "Gouvernance",
    region: "Tombouctou",
    beneficiaries: 25000,
    budget: "800 000 USD"
  },
  {
    id: 104,
    title: "Projet Walaikum — Réconciliation Nord Mali",
    startDate: "2018-01-01",
    endDate: "2021-12-31",
    status: "Terminé",
    donor: "Ambassade des Pays‑Bas",
    image: amssSecuriteHumaine,
    excerpt: "Atténuation des conflits et réconciliation intercommunautaire.",
    description: `50 accords de paix intercommunautaires, 200 médiateurs formés.`,
    domain: "Gouvernance",
    region: "Gao",
    beneficiaries: 30000,
    budget: "450 000 USD"
  },
  {
    id: 105,
    title: "Emergency Food Support — Sécurité Alimentaire",
    startDate: "2017-03-01",
    endDate: "2018-02-28",
    status: "Terminé",
    donor: "PAM",
    image: amssTerrainActivites,
    excerpt: "Assistance alimentaire d’urgence aux familles affectées par conflits et sécheresse.",
    description: `10 000 ménages assistés ; 500 t de vivres ; 1 200 enfants traités pour malnutrition.`,
    domain: "Sécurité Alimentaire",
    region: "Tombouctou",
    beneficiaries: 50000,
    budget: "1 200 000 USD"
  }
]

export const rapports = [
  {
    id: 1,
    title: "Rapport Gouvernement 2024 AMSS",
    year: 2024,
    type: "Rapport annuel",
    cover: null,
    excerpt: "Rapport annuel d'activités 2024 de l’AMSS (soumis au Gouvernement du Mali).",
    description: "Activités, réalisations et impacts AMSS en 2024 ; détail par projet et par commune.",
    published: true
  }
]
