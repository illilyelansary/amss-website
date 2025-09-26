// src/data/actualitesData.js

// Helper pour pointer vers /public/assets/actualites/*
const img = (name) => `/assets/actualites/${name}`

// Normalisation pour slug (supprime accents, espaces → -, minuscule)
const slugify = (s) => s
  .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .replace(/[^a-z0-9\s-]/g, '')
  .trim()
  .replace(/\s+/g, '-')
  .replace(/-+/g, '-')

const base = [
  {
    id: 1,
    titre: "Une semaine sur le terrain avec l'AMSS : Récits de Résilience, de Protection et d'Espoir au cœur du Sahel",
    date: '25 août 2025',
    dateISO: '2025-08-25',
    categorie: 'Humanitaire',
    image: img('terrain-sahel-activites.jpg'),
    excerpt: "L'AMSS renforce l'aide humanitaire au Mali à travers des activités de sensibilisation, de soutien psychosocial, de distribution de cash et de protection.",
    contenu: "Chaque jour, sur le terrain, nos équipes sont les témoins directs des défis, mais surtout de l'incroyable résilience des communautés maliennes. Cette semaine du 21 au 25 août 2025 a été une nouvelle illustration de notre engagement sans faille : apporter des réponses concrètes, durables et humaines aux populations vulnérables.",
    statistiques: { beneficiaires: '800+', seances: '17', menages: '49' },
    partenaires: ['PLAN International', 'GFFO', 'AEN', 'HCR', 'UNICEF', 'Education Cannot Wait'],
    lieux: ['Douentza', 'Ansongo', 'Bankass', 'Gossi', 'Tabango'],
    featured: true
  },
  {
    id: 2,
    titre: "Remise de 12 000 kits scolaires aux enfants déplacés à Tombouctou",
    date: '16 septembre 2025',
    dateISO: '2025-09-16',
    categorie: 'Éducation',
    image: img('kits-scolaires-tombouctou.jpg'),
    excerpt: "La cérémonie de remise s'est tenue ce mardi 16 septembre à Tombouctou, en présence des autorités locales et des partenaires.",
    contenu: "L'AMSS, en partenariat avec ses bailleurs, a organisé une cérémonie de remise de 12 000 kits scolaires aux enfants déplacés internes dans la région de Tombouctou. Cette initiative vise à soutenir la scolarisation des enfants affectés par les crises et à leur offrir un meilleur avenir.",
    statistiques: { kits: '12 000', enfants: '12 000', ecoles: '50+' },
    lieux: ['Tombouctou'],
    featured: true
  },
  {
    id: 3,
    titre: '400 mères vulnérables reçoivent des intrants agricoles grâce au projet GFFO',
    date: '5 juin 2025',
    dateISO: '2025-06-05',
    categorie: 'Sécurité Alimentaire',
    image: img('meres-agricoles-gao.jpg'),
    excerpt: 'Grâce au projet GFFO mis en œuvre par notre partenaire, 400 mères vulnérables des cercles de Gao et Ansongo ont reçu des intrants agricoles.',
    contenu: "Le 5 juin 2025, l'AMSS, en collaboration avec le projet GFFO, a distribué des intrants agricoles à 400 mères vulnérables dans les cercles de Gao et Ansongo. Cette action s'inscrit dans le cadre du renforcement de la sécurité alimentaire et de la résilience des ménages.",
    statistiques: { beneficiaires: '400', cercles: '2', intrants: 'Semences, engrais, outils' },
    partenaires: ['GFFO'],
    lieux: ['Gao', 'Ansongo']
  },
  {
    id: 4,
    titre: "L'UNESCO et l'ONG AMSS procèdent à la mise en place des Comités Locaux de Protection Civile",
    date: '20 mai 2025',
    dateISO: '2025-05-20',
    categorie: 'Protection',
    image: img('comites-protection-civile.jpg'),
    excerpt: "L'UNESCO et l'ONG AMSS procèdent à la mise en place de Comités Locaux de Protection Civile à Goundam, Tonka et Alafia.",
    contenu: "Dans le cadre du renforcement des capacités locales en protection civile, l'UNESCO et l'AMSS ont procédé à la mise en place de Comités Locaux de Protection Civile dans trois localités stratégiques du nord du Mali.",
    statistiques: { comites: '3', localites: '3', membres: '45' },
    partenaires: ['UNESCO'],
    lieux: ['Goundam', 'Tonka', 'Alafia']
  },
  {
    id: 5,
    titre: "L'USAID et l'AMSS lancent un programme d'assistance humanitaire au profit de 60 000 personnes",
    date: '18 décembre 2024',
    dateISO: '2024-12-18',
    categorie: 'Humanitaire',
    image: img('programme-usaid-wash.jpg'),
    excerpt: "Le lancement de ce programme de protection, d'assainissement d'urgence, d'hygiène et des services WASH NFI a lieu le lundi 16 décembre.",
    contenu: "L'USAID et l'AMSS ont officiellement lancé un ambitieux programme d'assistance humanitaire destiné à améliorer les conditions de vie de 60 000 personnes dans les régions de Mopti, Gao et Ménaka.",
    statistiques: { beneficiaires: '60 000', regions: '3', duree: '24 mois' },
    partenaires: ['USAID'],
    lieux: ['Mopti', 'Gao', 'Ménaka']
  },
  {
    id: 6,
    titre: 'Formation de 460 employés pour renforcer les capacités institutionnelles',
    date: '15 novembre 2024',
    dateISO: '2024-11-15',
    categorie: 'Formation',
    image: img('formation-employes-amss.jpg'),
    excerpt: 'Renforcement des capacités de notre équipe pour mieux servir les communautés vulnérables du Mali.',
    contenu: "L'AMSS a organisé une série de formations pour ses 460 employés répartis dans les 8 régions d'intervention. Ces formations portent sur les nouvelles approches humanitaires, la gestion de projet et le développement communautaire.",
    statistiques: { employes: '460', regions: '8', modules: '12' },
    lieux: ['Toutes les régions']
  },
  {
    id: 7,
    titre: "Extension de l'AMSS vers 8 régions pour une couverture nationale",
    date: '1er octobre 2024',
    dateISO: '2024-10-01',
    categorie: 'Développement',
    image: img('extension-8-regions.jpg'),
    excerpt: "L'AMSS étend sa couverture géographique pour atteindre plus de populations vulnérables à travers le Mali.",
    contenu: "Après plus de 30 années d'expérience, l'AMSS franchit une nouvelle étape en étendant ses interventions à 8 régions du Mali, marquant ainsi sa volonté d'avoir un impact national sur le développement et l'aide humanitaire.",
    statistiques: { regions: '8', bureaux: '8', population: '15M+' },
    lieux: ['Tombouctou', 'Gao', 'Ménaka', 'Mopti', 'Ségou', 'Sikasso', 'Bamako', 'Taoudénit']
  },
  {
    id: 8,
    titre: 'Promotion des droits des femmes et leadership féminin dans les communautés',
    date: '8 mars 2024',
    dateISO: '2024-03-08',
    categorie: 'Autonomisation',
    image: img('droits-femmes-leadership.jpg'),
    excerpt: "Une belle dynamique pour promouvoir les droits des femmes et soutenir leur rôle moteur dans le développement local.",
    contenu: "À l'occasion de la Journée internationale des droits des femmes, l'AMSS a organisé plusieurs activités de sensibilisation et de formation pour promouvoir l'autonomisation des femmes et leur leadership dans les communautés.",
    statistiques: { femmes: '2 500', sessions: '25', cooperatives: '15' },
    lieux: ['Ségou', 'Mopti', 'Tombouctou']
  },
  {
    id: 9,
    titre: "Atelier de formation pour améliorer l'accompagnement pédagogique des enfants",
    date: '15 février 2024',
    dateISO: '2024-02-15',
    categorie: 'Éducation',
    image: img('formation-animateurs-pedagogiques.jpg'),
    excerpt: "Cet atelier vise à outiller davantage les animatrices et animateurs afin d'améliorer la qualité de l'accompagnement pédagogique offert aux enfants.",
    contenu: "L'AMSS a organisé un atelier de formation de trois jours pour ses animateurs pédagogiques dans la région de Ségou. L'objectif est d'améliorer les méthodes d'enseignement et d'accompagnement des enfants dans les centres d'apprentissage.",
    statistiques: { animateurs: '85', jours: '3', modules: '8' },
    lieux: ['Ségou']
  }
]

// Export final avec slug
export const actualites = base.map(a => ({
  ...a,
  slug: `${a.dateISO}-${slugify(a.titre)}`
}))
