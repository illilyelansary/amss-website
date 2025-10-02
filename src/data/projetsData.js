// src/data/projetsData.js

export const projetsEnCours = [
  // --- Fondation Strømme ---
  {
    id: 1,
    title: "Plan stratégique SFWA (EPC/SSA-P/SSA2/S3A/AA) & Green Jobs",
    startDate: "2024-01-01",
    endDate: "2028-12-31",
    status: "En cours",
    donor: "Fondation Strømme Afrique de l’Ouest",
    image: "/assets/projet-tables-bancs-amss.jpeg",
    excerpt: "Éducation accélérée, microfinance (EPC), entrepreneuriat jeunes et unité Green Jobs (tables-bancs plastiques).",
    description: "Mise en œuvre du plan 2024–2028 avec centres SSA/P, SSA2, S3A, alphabétisation (AA), EPC et unité Green Jobs à Mountougoula...",
    domain: "Éducation, Microfinance, Environnement",
    region: "Tombouctou, Goundam, Diré & Mountougoula (Koulikoro)",
    beneficiaries: 25456,
    budget: "≈ 419 535 502 FCFA",
    sources: ["Rapport 2024, p.7–11"]
  },
  // --- Gouvernance (Cordaid) ---
  {
    id: 2,
    title: "Programme Gouvernance Locale Redevable (P-GLR+)",
    startDate: "2021-04-01",
    endDate: "2025-12-31",
    status: "En cours",
    donor: "CORDAID",
    image: "/assets/amss-securite-humaine.jpeg",
    excerpt: "Renforcement du contrat social et redevabilité dans 35 communes de Tombouctou.",
    description: "Formations JL, espaces de redevabilité, concours transparence, GIDRN, sensibilisation fiscale...",
    domain: "Gouvernance, Paix",
    region: "Région de Tombouctou (35 communes)",
    beneficiaries: 1050,
    budget: "175 355 625 FCFA (2024)",
    sources: ["Rapport 2024, p.12–17"]
  },
  // --- Pain pour le Monde ---
  {
    id: 3,
    title: "Appui cohésion sociale et relance économique (PPML)",
    startDate: "2024-01-01",
    endDate: "2025-12-31",
    status: "En cours",
    donor: "Pain pour le Monde",
    image: "/assets/amss-terrain-activites.jpeg",
    excerpt: "Insertion socio-économique des jeunes et cohésion dans 7 communes.",
    description: "611 jeunes appuyés ; dispositifs radios, communicateurs et leaders mobilisés...",
    domain: "Cohésion sociale, Relance économique",
    region: "Tombouctou, Douékiré, Kondi",
    beneficiaries: 700,
    budget: "117 655 566 FCFA",
    sources: ["Rapport 2024, p.19–21"]
  },
  // --- NEX4FOOD / AECID ---
  {
    id: 4,
    title: "NEX4FOOD — Sécurité alimentaire & nutrition (Ségou)",
    startDate: "2024-01-01",
    endDate: "2025-12-31",
    status: "En cours",
    donor: "Ayuda En Acción / AECID",
    image: "/assets/amss-terrain-activites.jpeg",
    excerpt: "Appui nutritionnel, théâtres participatifs VBG/cohésion et kits alimentaires.",
    description: "200 enfants malnutris + 100 FEFA (MISOLA) ; 100 ménages PDI/hôtes ; 12 jeunes leaders formés à la RPC...",
    domain: "Sécurité alimentaire, Nutrition",
    region: "Ségou (Pelengana, Sébougou, Ségou ville)",
    beneficiaries: 1400,
    budget: "84 742 €",
    sources: ["Rapport 2024, p.21–23"]
  },
  // --- Plan Int. (BMZ) ---
  {
    id: 5,
    title: "Plan International — Résilience & cohésion sociale (BMZ)",
    startDate: "2024-01-01",
    endDate: "2025-12-31",
    status: "En cours",
    donor: "Plan International / BMZ",
    image: "/assets/amss-terrain-activites.jpeg",
    excerpt: "Protection de l’enfance, nutrition et employabilité jeunes.",
    description: "4 centres d’échanges (200 jeunes) ; 100 acteurs de la protection formés ; 8 dialogues communautaires...",
    domain: "Protection, Nutrition, Employabilité",
    region: "Gao & Ansongo",
    beneficiaries: 2000,
    budget: "109 792 322 FCFA (mise en œuvre AMSS)",
    sources: ["Rapport 2024, p.23–25"]
  },
  // --- Plan Int. (GFFO) ---
  {
    id: 6,
    title: "Plan International — Protection enfants Sahel (GFFO)",
    startDate: "2024-01-01",
    endDate: "2025-12-31",
    status: "En cours",
    donor: "Plan International / GFFO",
    image: "/assets/amss-securite-humaine.jpeg",
    excerpt: "Mesures multisectorielles de protection et nutrition pour enfants <5 ans.",
    description: "50 survivantes VBG prises en charge ; 1300 enfants malnutris pris en charge ; 4 EAEs ; 16 démonstrations culinaires...",
    domain: "Protection, Nutrition",
    region: "Gao & Ansongo",
    beneficiaries: 2000,
    budget: "61 712 750 FCFA",
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
    image: "/assets/amss-terrain-activites.jpeg",
    excerpt: "Demande, accès et rétention des filles (et garçons) dans l’éducation.",
    description: "Régions : Ségou, Mopti, Gao, Tombouctou. Changement de normes, sécurité, qualité de l’apprentissage...",
    domain: "Éducation",
    region: "Ségou, Mopti, Gao, Tombouctou",
    beneficiaries: 5000,
    budget: "N/D",
    sources: ["Rapport 2024, p.27"]
  },
  // --- UNICEF WASH ---
  {
    id: 8,
    title: "Programme WASH d’Urgence",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    status: "En cours",
    donor: "UNICEF Mali",
    image: "/assets/amss-terrain-activites.jpeg",
    excerpt: "Forages, réhabilitations, latrines et sensibilisation à l’hygiène.",
    description: "25 forages, 15 puits réhabilités ; 500 latrines familiales ; 50 latrines scolaires...",
    domain: "WASH",
    region: "National",
    beneficiaries: 50000,
    budget: "≈ 500 000 USD",
    sources: ["Synthèse interne AMSS 2024"]
  },
  // --- HCR (protection) ---
  {
    id: 9,
    title: "Protection communautaire & monitoring (HCR)",
    startDate: "2024-01-01",
    endDate: "2025-12-31",
    status: "En cours",
    donor: "HCR",
    image: "/assets/amss-securite-humaine.jpeg",
    excerpt: "Monitoring, espaces sûrs, VBG et mécanismes communautaires.",
    description: "Espaces sûrs, comités communautaires, sensibilisation, cas VBG...",
    domain: "Protection",
    region: "Gao, Kidal, Ménaka, Tombouctou",
    beneficiaries: 15000,
    budget: "N/D",
    sources: ["Rapport 2024, pp.39–41, 44–50"]
  },
  // --- USAID/JSI (pause) ---
  {
    id: 10,
    title: "USAID/JSI — MIHR (Santé communautaire)",
    startDate: "2023-01-01",
    endDate: "2025-12-31",
    status: "Suspendu (USAID)",
    donor: "USAID / JSI — MIHR",
    image: "/assets/amss-terrain-activites.jpeg",
    excerpt: "Résilience sanitaire intégrée. — Suspendu (USAID).",
    description: "Activités de santé communautaire et amélioration de la demande SR/PF — mis en pause.",
    domain: "Santé",
    region: "Tombouctou",
    beneficiaries: 0,
    budget: "N/D",
    usaidNote: true,
    sources: ["Rapport 2024, pp.29–33 ; Note 2025"]
  },
  {
    id: 11,
    title: "USAID/JSI — NPI (Création de la demande SR/PF, Tombouctou)",
    startDate: "2023-01-01",
    endDate: "2025-12-31",
    status: "Suspendu (USAID)",
    donor: "USAID / JSI — NPI (MIHR)",
    image: "/assets/amss-terrain-activites.jpeg",
    excerpt: "Création de la demande SR/PF — Suspendu (USAID).",
    description: "Activités NPI au sein de MIHR — mise en pause.",
    domain: "Santé",
    region: "Tombouctou",
    beneficiaries: 0,
    budget: "N/D",
    usaidNote: true,
    sources: ["Rapport 2024, p.33 ; Note 2025"]
  },

  // 14..43
  {
    id: 14,
    title: "Projet Monitoring de Protection (Nord, Centre, Frontières)",
    startDate: "2024-01-01",
    endDate: "2025-12-31",
    status: "En cours",
    donor: "N/D",
    image: "/assets/amss-securite-humaine.jpeg",
    excerpt: "Améliorer l'environnement de protection des populations civiles.",
    description: "Monitoring de protection pour les populations vulnérables dans les zones de conflit.",
    domain: "Protection",
    region: "Nord, Centre et régions frontalières du Mali",
    beneficiaries: "N/D",
    budget: "N/D",
    sources: ["Rapport 2024, p.39"]
  },
  {
    id: 15,
    title: "Programme Multisectoriel et Intégré de Protection à Base Communautaire",
    startDate: "2024-01-01",
    endDate: "2025-12-31",
    status: "En cours",
    donor: "N/D",
    image: "/assets/amss-securite-humaine.jpeg",
    excerpt: "Protection à base communautaire pour réfugiés, PDI et rapatriés.",
    description: "Protection communautaire dans les zones d’accueil.",
    domain: "Protection",
    region: "Gao, Kidal, Ménaka et Tombouctou",
    beneficiaries: "N/D",
    budget: "N/D",
    sources: ["Rapport 2024, p.41"]
  },
  {
    id: 16,
    title: "Assistance multisectorielle (Ségou, San, Tombouctou)",
    startDate: "2024-01-01",
    endDate: "2025-12-31",
    status: "En cours",
    donor: "N/D",
    image: "/assets/amss-terrain-activites.jpeg",
    excerpt: "Assistance d’urgence, protection, éducation.",
    description: "Assistance pour personnes affectées par le déplacement.",
    domain: "Assistance d’urgence, Protection, Éducation",
    region: "Ségou, San et Tombouctou",
    beneficiaries: "N/D",
    budget: "N/D",
    sources: ["Rapport 2024, p.44"]
  },
  {
    id: 17,
    title: "Réduction de l’impact des EEI (Tombouctou)",
    startDate: "2024-01-01",
    endDate: "2025-12-31",
    status: "En cours",
    donor: "N/D",
    image: "/assets/amss-securite-humaine.jpeg",
    excerpt: "Réduire l'impact des EEI sur les communautés.",
    description: "Sensibilisation aux risques et mesures de sécurité.",
    domain: "Protection, Lutte antimines",
    region: "Tombouctou",
    beneficiaries: "N/D",
    budget: "N/D",
    sources: ["Rapport 2024, p.48"]
  },
  {
    id: 18,
    title: "Prévention et réponse VBG",
    startDate: "2024-01-01",
    endDate: "2025-12-31",
    status: "En cours",
    donor: "N/D",
    image: "/assets/amss-terrain-activites.jpeg",
    excerpt: "Prévenir et répondre aux violences basées sur le genre.",
    description: "Soutien aux survivantes et actions de prévention.",
    domain: "Protection, VBG",
    region: "N/D",
    beneficiaries: "N/D",
    budget: "N/D",
    sources: ["Rapport 2024, p.50"]
  },
  {
    id: 19,
    title: "Programme JL – SRAJ / JIGIYA",
    startDate: "2024-01-01",
    endDate: "2025-12-31",
    status: "En cours",
    donor: "N/D",
    image: "/assets/amss-terrain-activites.jpeg",
    excerpt: "Justice juvénile et soutien aux jeunes.",
    description: "Programme axé sur la justice juvénile et la jeunesse.",
    domain: "Jeunesse, Justice",
    region: "N/D",
    beneficiaries: "N/D",
    budget: "N/D",
    sources: ["Rapport 2024, p.54"]
  },
  {
    id: 20,
    title: "PROSAR — Diversification alimentaire (Tombouctou)",
    startDate: "2024-01-01",
    endDate: "2025-12-31",
    status: "En cours",
    donor: "N/D",
    image: "/assets/amss-terrain-activites.jpeg",
    excerpt: "Diversification alimentaire des ménages agricoles.",
    description: "Améliorer la sécurité alimentaire par la diversification.",
    domain: "Sécurité alimentaire",
    region: "Tombouctou",
    beneficiaries: "N/D",
    budget: "N/D",
    sources: ["Rapport 2024, p.56"]
  },
  {
    id: 21,
    title: "MRCEP/IRIL — Résilience",
    startDate: "2024-01-01",
    endDate: "2025-12-31",
    status: "En cours",
    donor: "N/D",
    image: "/assets/amss-terrain-activites.jpeg",
    excerpt: "Renforcement de la résilience au Mali.",
    description: "Soutien aux communautés pour faire face aux chocs.",
    domain: "Résilience",
    region: "N/D",
    beneficiaries: "N/D",
    budget: "N/D",
    sources: ["Rapport 2024, p.59"]
  },
  {
    id: 22,
    title: "Assistance alimentaire et nutritionnelle",
    startDate: "2024-01-01",
    endDate: "2025-12-31",
    status: "En cours",
    donor: "N/D",
    image: "/assets/amss-terrain-activites.jpeg",
    excerpt: "Aide alimentaire/nutritionnelle pour populations vulnérables.",
    description: "Distribution et suivi nutritionnel.",
    domain: "Sécurité alimentaire, Nutrition",
    region: "N/D",
    beneficiaries: "N/D",
    budget: "N/D",
    sources: ["Rapport 2024, p.60"]
  },
  {
    id: 23,
    title: "Résilience & cohésion sociale (Tombouctou, Taoudénit)",
    startDate: "2024-01-01",
    endDate: "2025-12-31",
    status: "En cours",
    donor: "N/D",
    image: "/assets/amss-securite-humaine.jpeg",
    excerpt: "Renforcer la résilience et la cohésion sociale.",
    description: "Appui aux communautés vulnérables.",
    domain: "Résilience, Cohésion sociale",
    region: "Tombouctou et Taoudénit",
    beneficiaries: "N/D",
    budget: "N/D",
    sources: ["Rapport 2024, p.61"]
  },
  {
    id: 24,
    title: "Paix, sécurité et femmes dans la gouvernance (NORAD/SPECIAL)",
    startDate: "2024-01-01",
    endDate: "2025-12-31",
    status: "En cours",
    donor: "NORAD/SPECIAL",
    image: "/assets/amss-securite-humaine.jpeg",
    excerpt: "Rôle des femmes dans la gouvernance et la paix.",
    description: "Renforcer la participation des femmes.",
    domain: "Gouvernance, Paix, Genre",
    region: "Kidal et Mopti",
    beneficiaries: "N/D",
    budget: "N/D",
    sources: ["Rapport 2024, p.72"]
  },
  {
    id: 25,
    title: "Protection d’urgence & WASH NFI (Centre & Nord)",
    startDate: "2024-01-01",
    endDate: "2025-12-31",
    status: "En cours",
    donor: "N/D",
    image: "/assets/amss-terrain-activites.jpeg",
    excerpt: "Protection d’urgence, assainissement, WASH NFI.",
    description: "Assistance humanitaire pour PDI et hôtes.",
    domain: "Protection, WASH, Assistance d’urgence",
    region: "Centre et Nord du Mali",
    beneficiaries: "N/D",
    budget: "N/D",
    sources: ["Rapport 2024, p.74"]
  },
  {
    id: 26,
    title: "PARE/UE — Relance économique",
    startDate: "2024-01-01",
    endDate: "2025-12-31",
    status: "En cours",
    donor: "Union Européenne",
    image: "/assets/amss-terrain-activites.jpeg",
    excerpt: "Relance économique dans les régions du Nord.",
    description: "Soutenir la reprise économique post-conflit.",
    domain: "Relance économique",
    region: "Nord du Mali",
    beneficiaries: "N/D",
    budget: "N/D",
    sources: ["Rapport 2024, p.76"]
  },
  {
    id: 27,
    title: "JUPREC — Justice de proximité",
    startDate: "2024-01-01",
    endDate: "2025-12-31",
    status: "En cours",
    donor: "N/D",
    image: "/assets/amss-terrain-activites.jpeg",
    excerpt: "Améliorer l'accès à la justice.",
    description: "Appui à la justice de proximité.",
    domain: "Justice",
    region: "Nord et Centre du Mali",
    beneficiaries: "N/D",
    budget: "N/D",
    sources: ["Rapport 2024, p.79"]
  },
  {
    id: 28,
    title: "PARP — Réconciliation et paix",
    startDate: "2024-01-01",
    endDate: "2025-12-31",
    status: "En cours",
    donor: "N/D",
    image: "/assets/amss-securite-humaine.jpeg",
    excerpt: "Appui à la réconciliation et à la consolidation de la paix.",
    description: "Dialogues et médiations.",
    domain: "Paix, Cohésion sociale",
    region: "Nord du Mali",
    beneficiaries: "N/D",
    budget: "N/D",
    sources: ["Rapport 2024, p.81"]
  },
  {
    id: 29,
    title: "PASC — Appui à la société civile",
    startDate: "2024-01-01",
    endDate: "2025-12-31",
    status: "En cours",
    donor: "N/D",
    image: "/assets/amss-terrain-activites.jpeg",
    excerpt: "Renforcement des OSC locales.",
    description: "Capacités organisationnelles et plaidoyer.",
    domain: "Gouvernance, Renforcement de capacités",
    region: "Nord et Centre du Mali",
    beneficiaries: "N/D",
    budget: "N/D",
    sources: ["Rapport 2024, p.84"]
  },
  {
    id: 30,
    title: "PASAN — Sécurité alimentaire & nutritionnelle",
    startDate: "2024-01-01",
    endDate: "2025-12-31",
    status: "En cours",
    donor: "N/D",
    image: "/assets/amss-terrain-activites.jpeg",
    excerpt: "Améliorer la sécurité alimentaire et la nutrition.",
    description: "Actions intégrées en nutrition et production.",
    domain: "Sécurité alimentaire, Nutrition",
    region: "Nord et Centre du Mali",
    beneficiaries: "N/D",
    budget: "N/D",
    sources: ["Rapport 2024, p.86"]
  },
  {
    id: 31,
    title: "Amélioration de l’environnement de protection des civils",
    startDate: "2024-01-01",
    endDate: "2025-12-31",
    status: "En cours",
    donor: "N/D",
    image: "/assets/amss-securite-humaine.jpeg",
    excerpt: "Renforcement de la protection des civils en zones de conflit.",
    description: "Dispositifs communautaires et alertes.",
    domain: "Protection",
    region: "Régions du Mali touchées par le conflit",
    beneficiaries: "N/D",
    budget: "N/D",
    sources: ["Rapport 2024, p.87"]
  },
  {
    id: 32,
    title: "SHIFIN NI TAGNE (SNT) — Consortium AMSS-FHI360",
    startDate: "2024-01-01",
    endDate: "2025-12-31",
    status: "En cours",
    donor: "AMSS / FHI360",
    image: "/assets/amss-terrain-activites.jpeg",
    excerpt: "Renforcer les capacités en consortium.",
    description: "Coordination et outillage des équipes.",
    domain: "Renforcement de capacités",
    region: "N/D",
    beneficiaries: "N/D",
    budget: "N/D",
    sources: ["Rapport 2024, p.90"]
  },
  {
    id: 33,
    title: "Cohésion sociale par actions culturelles et sportives",
    startDate: "2024-01-01",
    endDate: "2025-12-31",
    status: "En cours",
    donor: "N/D",
    image: "/assets/amss-terrain-activites.jpeg",
    excerpt: "Culture et sport au service de la cohésion.",
    description: "Animations communautaires et tournois.",
    domain: "Cohésion sociale, Culture, Sport",
    region: "N/D",
    beneficiaries: "N/D",
    budget: "N/D",
    sources: ["Rapport 2024, p.92"]
  },
  {
    id: 34,
    title: "Sécurité alimentaire & nutrition (Tombouctou, Gao, Ménaka)",
    startDate: "2024-01-01",
    endDate: "2025-12-31",
    status: "En cours",
    donor: "N/D",
    image: "/assets/amss-terrain-activites.jpeg",
    excerpt: "Appui aux ménages très pauvres.",
    description: "Kit semencier, pratiques améliorées.",
    domain: "Sécurité alimentaire, Nutrition",
    region: "Tombouctou, Gao et Ménaka",
    beneficiaries: "N/D",
    budget: "N/D",
    sources: ["Rapport 2024, p.94"]
  },
  {
    id: 35,
    title: "PAFEEM — Accès au financement, entrepreneuriat & emploi",
    startDate: "2024-01-01",
    endDate: "2025-12-31",
    status: "En cours",
    donor: "N/D",
    image: "/assets/amss-terrain-activites.jpeg",
    excerpt: "Stimuler l’économie locale et l’employabilité.",
    description: "Appui à l’entrepreneuriat et accès au crédit.",
    domain: "Relance économique, Employabilité",
    region: "N/D",
    beneficiaries: "N/D",
    budget: "N/D",
    sources: ["Rapport 2024, p.97"]
  },
  {
    id: 36,
    title: "WASH dans 5 écoles, 3 CSCom et 15 villages (Taoudénit)",
    startDate: "2024-01-01",
    endDate: "2025-12-31",
    status: "En cours",
    donor: "N/D",
    image: "/assets/amss-terrain-activites.jpeg",
    excerpt: "WASH + intermédiation sociale autour des points d’eau.",
    description: "Infrastructures WASH et mobilisation communautaire.",
    domain: "WASH",
    region: "Taoudénit (Boujbeha, Achaourat, Araouane, Al-ourche)",
    beneficiaries: "N/D",
    budget: "N/D",
    sources: ["Rapport 2024, p.101"]
  },
  // id:37 (PONAH) — SUPPRIMÉ à la demande
  {
    id: 38,
    title: "PARTAGE — Accès aux technologies & sécurité OSC (Sahel Central)",
    startDate: "2024-01-01",
    endDate: "2025-12-31",
    status: "En cours",
    donor: "N/D",
    image: "/assets/amss-terrain-activites.jpeg",
    excerpt: "Capacités techno & gestion des risques des OSC.",
    description: "Outils, pratiques sûres et accompagnement.",
    domain: "Renforcement de capacités, Technologie",
    region: "Sahel Central",
    beneficiaries: "N/D",
    budget: "N/D",
    sources: ["Rapport 2024, p.105"]
  },
  {
    id: 39,
    title: "Multisectoriel d’Urgence (Ménaka/FHRAOC)",
    startDate: "2024-01-01",
    endDate: "2025-12-31",
    status: "En cours",
    donor: "FHRAOC",
    image: "/assets/amss-terrain-activites.jpeg",
    excerpt: "Assistance d’urgence pour PDI et hôtes.",
    description: "Réponses rapides multi-secteurs.",
    domain: "Assistance d’urgence, Protection",
    region: "Ménaka",
    beneficiaries: "N/D",
    budget: "N/D",
    sources: ["Rapport 2024, p.108"]
  },
  {
    id: 40,
    title: "Protection des populations civiles (DDC)",
    startDate: "2024-01-01",
    endDate: "2025-12-31",
    status: "En cours",
    donor: "DDC",
    image: "/assets/amss-securite-humaine.jpeg",
    excerpt: "Renforcer l’environnement de protection.",
    description: "Mécanismes communautaires et référencement.",
    domain: "Protection",
    region: "Régions du Mali touchées par le conflit",
    beneficiaries: "N/D",
    budget: "N/D",
    sources: ["Rapport 2024, p.110"]
  },
  {
    id: 41,
    title: "Accélération détection & PEC MAS (Tombouctou)",
    startDate: "2024-01-01",
    endDate: "2025-12-31",
    status: "En cours",
    donor: "UNICEF",
    image: "/assets/amss-terrain-activites.jpeg",
    excerpt: "Prise en charge de la malnutrition aigüe.",
    description: "Dépistage actif, référencement et PEC.",
    domain: "Nutrition, Santé",
    region: "Tombouctou",
    beneficiaries: "N/D",
    budget: "N/D",
    sources: ["Rapport 2024, p.112"]
  },
  {
    id: 42,
    title: "NAFAMA — Amélioration du statut nutritionnel (Taoudénit)",
    startDate: "2024-01-01",
    endDate: "2025-12-31",
    status: "En cours",
    donor: "UNICEF",
    image: "/assets/amss-terrain-activites.jpeg",
    excerpt: "Femmes, filles et enfants <5 ans.",
    description: "Prévention et prise en charge nutritionnelle.",
    domain: "Nutrition, Santé",
    region: "Taoudénit",
    beneficiaries: "N/D",
    budget: "N/D",
    sources: ["Rapport 2024, p.114"]
  },
  {
    id: 43,
    title: "Éducation — Cours de rattrapage (CAEB)",
    startDate: "2024-01-01",
    endDate: "2025-12-31",
    status: "En cours",
    donor: "N/D",
    image: "/assets/amss-terrain-activites.jpeg",
    excerpt: "Cours de rattrapage.",
    description: "Remédiation scolaire ciblée.",
    domain: "Éducation",
    region: "N/D",
    beneficiaries: "N/D",
    budget: "N/D",
    sources: ["Rapport 2024, p.116"]
  },

  // --- Nouvelles fiches cartographie ---
  {
    id: 44,
    title: "ECW - Education Cannot Wait",
    startDate: "2025-05-01",
    endDate: "2027-04-30",
    status: "En cours",
    donor: "ECW/UNICEF",
    image: "/assets/amss-terrain-activites.jpeg",
    excerpt: "Accès à une éducation de qualité et protection.",
    description: "Appui éducationnel pour hôtes, PDI et réfugiés.",
    domain: "Éducation, Protection",
    region: "Tombouctou, Goundam, Diré, Niafunké, Gourma-Rharous",
    beneficiaries: "Communautés hôtes, PDI, Réfugiés",
    budget: "270 115 357 FCFA",
    sources: ["Cartographie — Base Tombouctou"]
  },
  {
    id: 45,
    title: "Moyens de subsistance — Tombouctou & Taoudénit (BMZ)",
    startDate: "2023-12-01",
    endDate: "2027-12-31",
    status: "En cours",
    donor: "BMZ",
    image: "/assets/amss-terrain-activites.jpeg",
    excerpt: "Sécurité alimentaire, revenus, accès à l’eau.",
    description: "Appui agro-pastoral et gouvernance locale.",
    domain: "Sécurité alimentaire, Gouvernance",
    region: "Niafunké, Tombouctou, Gourma-Rharous, Araouane, Achouratt",
    beneficiaries: 30000,
    budget: "2 392 000 EURO",
    sources: ["Cartographie — Base Tombouctou"]
  },
  {
    id: 46,
    title: "FAMOC II — Forces vives de la paix & cohésion",
    startDate: "2025-08-14",
    endDate: "2027-07-14",
    status: "En cours",
    donor: "Danida / FAMOC",
    image: "/assets/amss-securite-humaine.jpeg",
    excerpt: "Renforcement des OSC et leadership jeunes/femmes.",
    description: "Capacitation des organisations et coalitions.",
    domain: "Citoyenneté, Cohésion sociale, Renforcement de capacités",
    region: "Tombouctou (Alafia, Bourem Inaly), Gao, Gounzourèye, Anchawadji",
    beneficiaries: "Leaders jeunes & femmes (et leurs organisations)",
    budget: "249 356 400 FCFA",
    sources: ["Cartographie — Base Tombouctou"]
  },
  {
    id: 47,
    title: "IRLI — Capacités communautaires",
    startDate: "2025-06-01",
    endDate: "2025-12-31",
    status: "En cours",
    donor: "USAID",
    image: "/assets/amss-terrain-activites.jpeg",
    excerpt: "Renforcer les capacités institutionnelles/organisationnelles.",
    description: "Appui aux communautés d’Alafia et Douékiré.",
    domain: "Environnement, Gestion des ressources naturelles, Renforcement de capacités",
    region: "Alafia (Tombouctou) et Douékiré (Goundam)",
    beneficiaries: "Communautés hôtes, PDI, Réfugiés",
    budget: "17 000 000 FCFA",
    sources: ["Cartographie — Base Tombouctou"]
  },
  {
    id: 48,
    title: "PBC Réfugiés/PDIs & Monitoring Nord/Centre",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    status: "En cours",
    donor: "HCR (Fonds italien)",
    image: "/assets/amss-securite-humaine.jpeg",
    excerpt: "5368 violations (jan–août).",
    description: "Monitoring & protection communautaire.",
    domain: "Protection",
    region: "Gao, Ansongo, Bourem, Kidal (Tessalit, Anefif, Abeibara, Aguelhoc), Ménaka (Ander, Inekar, Tidermene)",
    beneficiaries: "Réfugiés, PDI, Rapatriés",
    budget: "389 312 692 FCFA",
    sources: ["Cartographie — Base Gao"]
  },
  {
    id: 49,
    title: "Fonds humanitaire AOC (OCHA)",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    status: "En cours",
    donor: "OCHA",
    image: "/assets/amss-securite-humaine.jpeg",
    excerpt: "Collecte/partage d’infos sur violations des droits.",
    description: "Suivi protection et partage d’informations.",
    domain: "Protection",
    region: "Ménaka",
    beneficiaries: "Réfugiés, PDI, Rapatriés",
    budget: "400 000 USD",
    sources: ["Cartographie — Base Gao"]
  },
  {
    id: 50,
    title: "PTA — Prévention & réponse VBG (Ménaka)",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    status: "En cours",
    donor: "UNFPA",
    image: "/assets/amss-terrain-activites.jpeg",
    excerpt: "Services confidentiels adaptés aux survivantes.",
    description: "Prévention et prise en charge VBG.",
    domain: "Protection, VBG",
    region: "Ménaka",
    beneficiaries: "PDI",
    budget: "N/D",
    sources: ["Cartographie — Base Gao"]
  },
  {
    id: 51,
    title: "Sécurité alimentaire & nutrition (Fondation Hilpton)",
    startDate: "2025-07-01",
    endDate: "2027-06-30",
    status: "En cours",
    donor: "Fondation Hilpton",
    image: "/assets/amss-terrain-activites.jpeg",
    excerpt: "Renforcer la sécurité alimentaire et nutritionnelle.",
    description: "Appui Ménaka, Assakaray, Zeugarat.",
    domain: "Sécurité alimentaire, Nutrition",
    region: "Ménaka, Assakaray, Zeugarat",
    beneficiaries: "PDI",
    budget: "N/D",
    sources: ["Cartographie — Base Gao"]
  },
  {
    id: 52,
    title: "UNFPA — VBG (Gao & Ménaka)",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    status: "En cours",
    donor: "UNFPA",
    image: "/assets/amss-terrain-activites.jpeg",
    excerpt: "Services VBG adaptés.",
    description: "Prise en charge et prévention VBG.",
    domain: "Protection, VBG",
    region: "Gao, Ansongo, Bourem",
    beneficiaries: "Survivantes de VBG",
    budget: "N/D",
    sources: ["Cartographie — Base Gao"]
  },
  {
    id: 53,
    title: "GFFO/Plan — Protection enfants & nutrition",
    startDate: "2022-07-01",
    endDate: "2025-10-31",
    status: "En cours",
    donor: "GFFO (via Plan International)",
    image: "/assets/amss-securite-humaine.jpeg",
    excerpt: "5000 enfants <5 ans ; 318 cas protection suivis.",
    description: "Accompagnement enfants et ménages vulnérables.",
    domain: "Protection, Sécurité alimentaire, Nutrition",
    region: "Gao (Gounzoureye, Soni Aliber), Ansongo (Bara, Ansongo)",
    beneficiaries: "Enfants, ménages hôtes, PDI, réfugiés",
    budget: "217 766 467 FCFA",
    sources: ["Cartographie — Base Gao"]
  },
  {
    id: 54,
    title: "CERF/HCR — Protection & résilience climatique",
    startDate: "2025-03-01",
    endDate: "2025-12-31",
    status: "En cours",
    donor: "HCR / CERF",
    image: "/assets/amss-securite-humaine.jpeg",
    excerpt: "Capacitation structures locales, éducation, lutte antimines.",
    description: "Formations et dispositifs multi-régions.",
    domain: "Protection, Lutte antimines, Renforcement de capacités",
    region: "Gao (Gounzoureye, Anchawadji, Ansongo, Bourem), Ségou (Niono, Tominian), Ménaka",
    beneficiaries: "Hôtes, PDI, réfugiés",
    budget: "134 886 030 FCFA",
    sources: ["Cartographie — Base Gao"]
  },
  {
    id: 55,
    title: "RRM — TERRA (ECHO/ACF)",
    startDate: "2025-06-01",
    endDate: "2026-03-31",
    status: "En cours",
    donor: "ECHO (via ACF)",
    image: "/assets/amss-terrain-activites.jpeg",
    excerpt: "Améliorer conditions de vie et protection.",
    description: "Réponses rapides et TERRA.",
    domain: "Sécurité alimentaire, Gouvernance, Résilience, Assistance d’urgence",
    region: "Gao (Bourem, Ansongo), Ségou (San, Macina, Niono)",
    beneficiaries: "Ménages vulnérables, femmes, jeunes…",
    budget: "171 555 714 FCFA",
    sources: ["Cartographie — Base Gao"]
  },
  {
    id: 56,
    title: "UNHCR — Monitoring protection (Ségou)",
    startDate: "2019-11-01",
    endDate: "2025-12-31",
    status: "En cours",
    donor: "UNHCR",
    image: "/assets/amss-securite-humaine.jpeg",
    excerpt: "Monitoring, sensibilisations, référencement.",
    description: "Suivi communautaire et protection.",
    domain: "Protection",
    region: "Ségou, San, Barouéli, Bla, Macina, Niono, Tominian",
    beneficiaries: "Hôtes, PDI, réfugiés",
    budget: "891 398 546 FCFA",
    sources: ["Cartographie — Base Mopti"]
  },
  {
    id: 57,
    title: "HUM — VBG intégrées à SSR, WASH & Protection (Bandiagara/Douentza)",
    startDate: "2025-04-01",
    endDate: "2025-12-31",
    status: "En cours",
    donor: "NORAD (via AEN)",
    image: "/assets/amss-terrain-activites.jpeg",
    excerpt: "7440 titulaires de droits sensibilisés.",
    description: "VBG, SSR et WASH intégrés.",
    domain: "Protection, VBG, SSR, WASH",
    region: "Bandiagara, Douentza, Bankass, Kani-Bonzon, Boré",
    beneficiaries: "Femmes/filles à risque, survivantes, adolescents, leaders",
    budget: "79 578 750 FCFA",
    sources: ["Cartographie — Base Mopti"]
  },
  {
    id: 58,
    title: "DEV — VBG intégrées à la SSR (Bandiagara)",
    startDate: "2025-04-01",
    endDate: "2025-12-31",
    status: "En cours",
    donor: "NORAD (via AEN)",
    image: "/assets/amss-terrain-activites.jpeg",
    excerpt: "5208 titulaires de droits.",
    description: "Prévention/réponse VBG et SSR.",
    domain: "Protection, VBG, SSR",
    region: "Bandiagara, Bankass, Kani-Bonzon",
    beneficiaries: "Femmes/filles à risque, survivantes, adolescents, leaders",
    budget: "56 830 672 FCFA",
    sources: ["Cartographie — Base Mopti"]
  },
  {
    id: 59,
    title: "PTA — VBG (Mopti/Djenné)",
    startDate: "2025-04-01",
    endDate: "2025-12-31",
    status: "En cours",
    donor: "UNFPA",
    image: "/assets/amss-terrain-activites.jpeg",
    excerpt: "PEC holistique survivant·e·s VBG/EAS.",
    description: "Accès et qualité des services VBG.",
    domain: "Protection, VBG",
    region: "Mopti, Djenné",
    beneficiaries: "Femmes et filles vulnérables ; survivantes ; adolescents",
    budget: "5 115 000 FCFA",
    sources: ["Cartographie — Base Mopti"]
  },
  {
    id: 60,
    title: "PROTECT — Environnement de protection (Sikasso)",
    startDate: "2024-11-01",
    endDate: "2025-11-30",
    status: "En cours",
    donor: "DDC — Pays-Bas — USAID (via HELVETAS)",
    image: "/assets/amss-securite-humaine.jpeg",
    excerpt: "Documentation incidents EEI/REG/ALCP, VBG…",
    description: "Collecte/Documentation incidents & VBG.",
    domain: "Protection, Lutte antimines",
    region: "Sikasso (Koutiala, Bougouni)",
    beneficiaries: "Femmes, filles, PDI",
    budget: "N/D",
    sources: ["Cartographie — Base Sikasso"]
  },
  {
    id: 61,
    title: "PADEM — Décentralisation de l’éducation",
    startDate: "2025-01-01",
    endDate: "2028-12-31",
    status: "En cours",
    donor: "UE (via Save the Children International)",
    image: "/assets/amss-terrain-activites.jpeg",
    excerpt: "120 000 enfants (≈50 % filles).",
    description: "Appui gouvernance éducationnelle.",
    domain: "Éducation, Gouvernance, Santé, Protection",
    region: "Sikasso (Kignan, Niéna, Kléla, Lobougoula, Missirikoro)",
    beneficiaries: "Enfants 3–15 ans, enseignants, mairies, CGS, femmes",
    budget: "4 250 839 €",
    sources: ["Cartographie — Base Sikasso"]
  },
  {
    id: 62,
    title: "JIGIYA — Jeunes Leaders / Santé sexuelle & reproductive",
    startDate: "2024-09-01",
    endDate: "2025-12-31",
    status: "En cours",
    donor: "Ambassade des Pays-Bas (via AMSS-CAEB)",
    image: "/assets/amss-terrain-activites.jpeg",
    excerpt: "Contribuer aux indicateurs SSR.",
    description: "Approches jeunesse & communautés.",
    domain: "Santé, SSR",
    region: "Ségou (Markala, Sansanding, Dioro, Sakoiba, Konodimini, Cinzana, Pélengana), Barouéli, Boidié, Kalaké, Konobougou, Tésséréla",
    beneficiaries: "Jeunes & adolescents (10–24 ans)",
    budget: "33 085 800 FCFA",
    sources: ["Cartographie — Base Ségou"]
  },
  {
    id: 63,
    title: "PASCOFI — Appui à la scolarisation des filles",
    startDate: "2021-04-01",
    endDate: "2026-03-31",
    status: "En cours",
    donor: "Affaires Mondiales Canada (AMC)",
    image: "/assets/amss-terrain-activites.jpeg",
    excerpt: "Réduction des inégalités de genre et des disparités d’apprentissage.",
    description: "Appuis ciblés aux filles vulnérables et aux écoles.",
    domain: "Éducation, Genre",
    region: "Ségou (Barouéli, Gouendo, Ngassola, Sanando, Somo, Tamani, Tesserela)",
    beneficiaries: "Élèves, familles vulnérables, enseignants",
    budget: "85 078 026 FCFA (2025–2026)",
    sources: ["Cartographie — Base Ségou"]
  },
  {
    id: 64,
    title: "DEFI — Scolarisation des filles (CRS/Alinea)",
    startDate: "2022-01-03",
    endDate: "2025-06-30",
    status: "En cours",
    donor: "CRS / Alinea International",
    image: "/assets/amss-terrain-activites.jpeg",
    excerpt: "PAA favorisant la rétention des filles.",
    description: "Programmes d’apprentissage accéléré.",
    domain: "Éducation",
    region: "Ségou (Macina, Niono, Bla, Tominian), Mopti (Sofara, Douentza, Bandiagara, Bankass), Tombouctou (Diré, Goundam), Gao (Soni Ali Ber, Ansongo)",
    beneficiaries: "Enfants 8–15 ans",
    budget: "470 199 241 FCFA",
    sources: ["Cartographie — Base Ségou"]
  },
  {
    id: 65,
    title: "CEPEACH — Continuité éducative en crises",
    startDate: "2024-09-01",
    endDate: "2026-08-31",
    status: "En cours",
    donor: "EDUCO (DG ECHO)",
    image: "/assets/amss-terrain-activites.jpeg",
    excerpt: "9250 enfants (4626 filles) inscrits en 1ère année.",
    description: "Éducation en contexte d’urgence.",
    domain: "Éducation, Urgence",
    region: "Ségou, San, Markala, Macina, Niono, Bla, Tominian, Fangasso",
    beneficiaries: "PDI et communautés hôtes",
    budget: "229 000 000 FCFA",
    sources: ["Cartographie — Base Ségou"]
  },
  {
    id: 66,
    title: "AACID/AEA — Sécurité alimentaire & cohésion sociale",
    startDate: "2024-04-01",
    endDate: "2026-03-31",
    status: "En cours",
    donor: "AACID (via Ayuda En Acción)",
    image: "/assets/amss-terrain-activites.jpeg",
    excerpt: "Sécurité alimentaire, paix/cohésion, lutte VBG.",
    description: "Appui Sébougou & Sakoiba.",
    domain: "Sécurité alimentaire, Paix, Cohésion sociale, VBG",
    region: "Ségou (Sébougou, Sakoiba)",
    beneficiaries: "PDI, femmes survivantes VBG, jeunes, hôtes, PSH",
    budget: "55 650 000 FCFA",
    sources: ["Cartographie — Base Ségou"]
  }
]

export const projetsTermines = [
  {
    id: 101,
    title: "Sécurité Humaine UNMAS",
    startDate: "2022-01-01",
    endDate: "2022-12-31",
    status: "Terminé",
    donor: "UNMAS",
    image: "/assets/amss-securite-humaine.jpeg",
    excerpt: "Localisation et protection des civils.",
    description: "Cartographie des zones à risque, formations et alertes.",
    domain: "Protection, Lutte antimines",
    region: "Tombouctou",
    beneficiaries: 15000,
    budget: "200 000 USD"
  },
  {
    id: 102,
    title: "Programme Multi-acteurs d’Alphabétisation",
    startDate: "2020-01-01",
    endDate: "2023-12-31",
    status: "Terminé",
    donor: "Gouvernement du Mali",
    image: "/assets/amss-terrain-activites.jpeg",
    excerpt: "Alphabétisation fonctionnelle pour femmes en EPC.",
    description: "1000+ femmes alphabétisées ; 150 groupes d’épargne.",
    domain: "Éducation, Microfinance",
    region: "National",
    beneficiaries: 1000,
    budget: "250 000 USD"
  },
  {
    id: 103,
    title: "Programme Gouvernance Partagée (PGP2)",
    startDate: "2019-06-01",
    endDate: "2022-05-31",
    status: "Terminé",
    donor: "Union Européenne",
    image: "/assets/amss-securite-humaine.jpeg",
    excerpt: "Gouvernance locale et participation citoyenne.",
    description: "100 élus formés, 50 OSC renforcées, 30 dialogues.",
    domain: "Gouvernance, Citoyenneté",
    region: "Tombouctou",
    beneficiaries: 25000,
    budget: "800 000 USD"
  },
  {
    id: 104,
    title: "Walaikum — Réconciliation Nord Mali",
    startDate: "2018-01-01",
    endDate: "2021-12-31",
    status: "Terminé",
    donor: "Ambassade des Pays-Bas",
    image: "/assets/amss-securite-humaine.jpeg",
    excerpt: "Atténuation des conflits et réconciliation.",
    description: "50 accords de paix ; 200 médiateurs formés.",
    domain: "Paix, Cohésion sociale",
    region: "Gao",
    beneficiaries: 30000,
    budget: "450 000 USD"
  },
  {
    id: 105,
    title: "Emergency Food Support — Sécurité Alimentaire",
    startDate: "2017-03-01",
    endDate: "2018-02-28",
    status: "Terminé",
    donor: "PAM",
    image: "/assets/amss-terrain-activites.jpeg",
    excerpt: "Assistance alimentaire d’urgence.",
    description: "10 000 ménages assistés ; 500 t de vivres.",
    domain: "Sécurité alimentaire, Assistance d’urgence",
    region: "Tombouctou",
    beneficiaries: 50000,
    budget: "1 200 000 USD"
  }
]

export const rapports = [
  {
    id: 1,
    title: "Rapport Gouvernement 2024 AMSS",
    year: 2024,
    type: "Rapport annuel",
    cover: null,
    excerpt: "Rapport annuel d'activités 2024 de l’AMSS.",
    description: "Activités, réalisations et impacts 2024 ; détail par projet et par commune.",
    published: true
  }
]
/* =========================
 *  Normalisation des domaines (consolidation)
 * ========================= */

// Ordre canonique final (utile pour l’affichage trié et cohérent)
const DOMAIN_CANON_ORDER = [
  "Éducation",
  "Santé & Nutrition",
  "WASH",
  "Protection & VBG",
  "Gouvernance & Paix",
  "Cohésion sociale & Culture",
  "Sécurité alimentaire & Moyens d’existence",
  "Environnement & GRN",
  "Urgence",
  "Renforcement de capacités & Technologie",
  "Résilience"
];

// util: normaliser chaîne pour matcher (sans accents/majuscules)
const _norm = (s) =>
  String(s || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

// dictionnaire de correspondances -> domaine canonique
const DOMAIN_SYNONYMS = {
  // Éducation
  "education": "Éducation",
  "éducation": "Éducation",
  "cours de rattrapage": "Éducation",
  "padem": "Éducation",

  // Santé & Nutrition
  "sante": "Santé & Nutrition",
  "santé": "Santé & Nutrition",
  "ssr": "Santé & Nutrition",
  "sante sexuelle et reproductive": "Santé & Nutrition",
  "santé sexuelle et reproductive": "Santé & Nutrition",
  "nutrition": "Santé & Nutrition",

  // WASH
  "wash": "WASH",
  "eau": "WASH",
  "assainissement": "WASH",
  "hygiène": "WASH",
  "hygiene": "WASH",

  // Protection & VBG
  "protection": "Protection & VBG",
  "vbg": "Protection & VBG",
  "lutte antimines": "Protection & VBG",
  "eei": "Protection & VBG",
  "mine": "Protection & VBG",
  "mines": "Protection & VBG",

  // Gouvernance & Paix
  "gouvernance": "Gouvernance & Paix",
  "paix": "Gouvernance & Paix",
  "citoyennete": "Gouvernance & Paix",
  "citoyenneté": "Gouvernance & Paix",
  "justice": "Gouvernance & Paix",

  // Cohésion sociale & Culture
  "cohesion sociale": "Cohésion sociale & Culture",
  "cohésion sociale": "Cohésion sociale & Culture",
  "culture": "Cohésion sociale & Culture",
  "sport": "Cohésion sociale & Culture",

  // Sécurité alimentaire & Moyens d’existence
  "securite alimentaire": "Sécurité alimentaire & Moyens d’existence",
  "sécurité alimentaire": "Sécurité alimentaire & Moyens d’existence",
  "relance economique": "Sécurité alimentaire & Moyens d’existence",
  "relance économique": "Sécurité alimentaire & Moyens d’existence",
  "employabilite": "Sécurité alimentaire & Moyens d’existence",
  "employabilité": "Sécurité alimentaire & Moyens d’existence",
  "microfinance": "Sécurité alimentaire & Moyens d’existence",
  "moyens de subsistance": "Sécurité alimentaire & Moyens d’existence",
  "moyens d’existence": "Sécurité alimentaire & Moyens d’existence",

  // Environnement & GRN
  "environnement": "Environnement & GRN",
  "grn": "Environnement & GRN",
  "gestion des ressources naturelles": "Environnement & GRN",

  // Urgence
  "urgence": "Urgence",
  "assistance d’urgence": "Urgence",
  "assistance d'urgence": "Urgence",
  "rrm": "Urgence",

  // Renforcement de capacités & Technologie
  "renforcement de capacites": "Renforcement de capacités & Technologie",
  "renforcement de capacités": "Renforcement de capacités & Technologie",
  "capacites": "Renforcement de capacités & Technologie",
  "capacités": "Renforcement de capacités & Technologie",
  "technologie": "Renforcement de capacités & Technologie",
  "ict": "Renforcement de capacités & Technologie",

  // Résilience
  "resilience": "Résilience",
  "résilience": "Résilience"
};

// remap d’un token -> domaine canonique (ou null si inconnu)
function mapTokenToCanon(token) {
  const n = _norm(token);
  if (!n) return null;

  // match exact
  if (DOMAIN_SYNONYMS[n]) return DOMAIN_SYNONYMS[n];

  // quelques heuristiques légères par inclusion
  if (n.includes("education") || n.includes("éducation") || n.includes("ecole")) return "Éducation";
  if (n.includes("sante") || n.includes("santé") || n.includes("ssr") || n.includes("nutrition")) return "Santé & Nutrition";
  if (n.includes("wash") || n.includes("eau") || n.includes("hyg") || n.includes("assain")) return "WASH";
  if (n.includes("vbg") || n.includes("protection") || n.includes("eei") || n.includes("mine")) return "Protection & VBG";
  if (n.includes("gouvernance") || n.includes("paix") || n.includes("justice") || n.includes("citoyen")) return "Gouvernance & Paix";
  if (n.includes("cohesion") || n.includes("cohésion") || n.includes("culture") || n.includes("sport")) return "Cohésion sociale & Culture";
  if (n.includes("securite alimentaire") || n.includes("sécurité alimentaire") || n.includes("microfinance") || n.includes("employab") || n.includes("relance")) return "Sécurité alimentaire & Moyens d’existence";
  if (n.includes("environnement") || n.includes("grn") || n.includes("ressources naturelles")) return "Environnement & GRN";
  if (n.includes("urgence") || n.includes("rrm")) return "Urgence";
  if (n.includes("renforcement") || n.includes("capac") || n.includes("techno") || n.includes("ict")) return "Renforcement de capacités & Technologie";
  if (n.includes("resilience") || n.includes("résilience")) return "Résilience";

  return null;
}

// transforme une chaîne "A, B, C" -> "Canon1, Canon2"
function canonicalizeDomainString(domainStr) {
  if (!domainStr) return "";
  const tokens = String(domainStr)
    .split(",")
    .map(s => s.trim())
    .filter(Boolean);

  const canonSet = new Set();
  tokens.forEach(tok => {
    const mapped = mapTokenToCanon(tok);
    if (mapped) canonSet.add(mapped);
  });

  // si rien n’a matché, on ne met rien (ou on pourrait mettre "Autre")
  const canonArr = Array.from(canonSet);

  // trier selon l’ordre canonique
  canonArr.sort(
    (a, b) =>
      DOMAIN_CANON_ORDER.indexOf(a) - DOMAIN_CANON_ORDER.indexOf(b)
  );

  return canonArr.join(", ");
}

// normalise tout le tableau et supprime PONAH
function normalizeDataset(arr) {
  return arr
    .filter(p => !(p && (p.id === 37 || /ponah/i.test(p.title || ""))))
    .map(p => ({
      ...p,
      domain: canonicalizeDomainString(p.domain)
    }));
}

/**
 * 🔧 Application in-place :
 * - garde les mêmes exports (projetsEnCours, projetsTermines)
 * - mais remplace leur contenu par les versions normalisées
 * - OK même si les tableaux ont été définis en `export const` (on mute via splice)
 */
try {
  if (Array.isArray(projetsEnCours)) {
    const _normEnCours = normalizeDataset(projetsEnCours);
    projetsEnCours.splice(0, projetsEnCours.length, ..._normEnCours);
  }
  if (Array.isArray(projetsTermines)) {
    const _normTerm = normalizeDataset(projetsTermines);
    projetsTermines.splice(0, projetsTermines.length, ..._normTerm);
  }
} catch (e) {
  // no-op si non défini (exécution dans un contexte différent)
  console.warn("Normalization skipped:", e?.message);
}

// (facultatif) exporter la liste canonique si tu veux t’en servir côté UI
export const DOMAINES_CANONIQUES = [...DOMAIN_CANON_ORDER];

