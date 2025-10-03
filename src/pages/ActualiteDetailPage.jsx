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
    contenu: "Chaque jour, sur le terrain, nos équipes sont les témoins directs des défis, mais surtout de l'incroyable résilience des communautés maliennes. Cette semaine du 21 au 25 août 2025 a été une nouvelle illustration de notre engagement : causeries VBG (17 séances, >800 participant·e·s), sensibilisations santé et hygiène menstruelle, activités récréatives et soutien psychosocial pour les enfants, distribution de cash à 49 ménages à Gossi avec le HCR.",
    statistiques: { beneficiaires: '800+', seances: '17', menages: '49' },
    partenaires: ['PLAN International', 'GFFO', 'AEN', 'HCR', 'UNICEF', 'Education Cannot Wait'],
    lieux: ['Douentza', 'Ansongo', 'Bankass', 'Gossi', 'Tabango'],
    tags: ['Protection', 'Éducation', 'WASH', 'Santé', 'Projets'],
    featured: true,
    sources: [
      'https://www.ong-amss.org/post/une-semaine-sur-le-terrain-avec-l-amss-r%C3%A9cits-de-r%C3%A9silience-de-protection-et-d-espoir-au-c%C5%93ur-du'
    ]
  },
  {
    id: 2,
    titre: "Remise de 12 000 kits scolaires aux enfants déplacés à Tombouctou",
    date: '16 septembre 2025',
    dateISO: '2025-09-16',
    categorie: 'Éducation',
    image: img('kits-scolaires-tombouctou.jpg'),
    excerpt: "La cérémonie de remise s'est tenue ce mardi 16 septembre à Tombouctou, en présence des autorités locales et des partenaires.",
    contenu: "L'AMSS, en partenariat avec ses bailleurs, a organisé une cérémonie de remise de 12 000 kits scolaires aux enfants déplacés internes dans la région de Tombouctou. Objectif : soutenir la scolarisation des enfants affectés par les crises et leur offrir un meilleur avenir.",
    statistiques: { kits: '12 000', enfants: '12 000', ecoles: '50+' },
    lieux: ['Tombouctou'],
    tags: ['Éducation', 'Projets'],
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
    contenu: "Le 5 juin 2025, l'AMSS, en collaboration avec le projet GFFO, a distribué des intrants agricoles à 400 mères vulnérables dans les cercles de Gao et Ansongo pour renforcer la résilience alimentaire des ménages.",
    statistiques: { beneficiaires: '400', cercles: '2', intrants: 'Semences, engrais, outils' },
    partenaires: ['GFFO'],
    lieux: ['Gao', 'Ansongo'],
    tags: ['Sécurité Alimentaire', 'Projets']
  },
  {
    id: 4,
    titre: "L'UNESCO et l'ONG AMSS procèdent à la mise en place des Comités Locaux de Protection Civile",
    date: '20 mai 2025',
    dateISO: '2025-05-20',
    categorie: 'Protection',
    image: img('comites-protection-civile.jpg'),
    excerpt: "L'UNESCO et l'ONG AMSS procèdent à la mise en place de Comités Locaux de Protection Civile à Goundam, Tonka et Alafia.",
    contenu: "Dans le cadre du renforcement des capacités locales en protection civile, l'UNESCO et l'AMSS ont appuyé la mise en place de CLPC dans trois localités stratégiques du nord du Mali.",
    statistiques: { comites: '3', localites: '3', membres: '45' },
    partenaires: ['UNESCO'],
    lieux: ['Goundam', 'Tonka', 'Alafia'],
    tags: ['Protection', 'Gouvernance', 'Sécurité Humaine']
  },

  // ——— Nouvelles actualités vérifiées (site AMSS / presse) ———
  {
    id: 10,
    titre: 'PADEM – Lancement régional à Sikasso : une éducation décentralisée, inclusive et protectrice',
    date: '8 avril 2025',
    dateISO: '2025-04-08',
    categorie: 'Éducation',
    image: 'https://images.weserv.nl/?url=www.ong-amss.org/_files/ugd/1c8c2f_e0c6a7a6be934b9a8d6e29aab52caa8c~mv2.jpg',
    excerpt: "Lancement régional du Projet d’Appui à la Décentralisation de l’Éducation au Mali (PADEM) à Sikasso, financé par l’Union Européenne (20 M€ / 4 ans).",
    contenu: "Le projet PADEM vise à garantir une éducation fondamentale de qualité, sûre et inclusive pour les filles et les garçons. Il couvre 23 communes dans les régions de Kayes, Koulikoro, Sikasso et le district de Bamako. Le consortium de mise en œuvre réunit Save the Children, AMSS, CAEB et Cordaid, avec un engagement fort des autorités locales.",
    statistiques: { enfants_cibles: '120 000', enfants_hors_systeme: '2 700', petite_enfance: '9 000', communes: '23', financement: '20 M€', duree: '4 ans' },
    partenaires: ['Union Européenne', 'Save the Children', 'CAEB', 'Cordaid', 'AMSS'],
    lieux: ['Sikasso', 'Kayes', 'Koulikoro', 'Bamako'],
    tags: ['Éducation', 'Gouvernance', 'Projets', 'Union Européenne'],
    sources: [
      'https://www.ong-amss.org/post/padem-lancement-r%C3%A9gional-%C3%A0-sikasso-un-pas-d%C3%A9cisif-pour-une-%C3%A9ducation-d%C3%A9centralis%C3%A9e-inclusive-et'
    ],
    featured: true
  },
  {
    id: 11,
    titre: 'Renforcement de la Sécurité Humaine à Goundam, Tonka et Alafia : des communautés engagées',
    date: '12 avril 2025',
    dateISO: '2025-04-12',
    categorie: 'Protection',
    image: 'https://images.weserv.nl/?url=www.ong-amss.org/_files/ugd/1c8c2f_3f0f2b8b7f344a1a9d4dba8c0f0d9c7b~mv2.jpg',
    excerpt: "Activités communautaires (9–11 avril 2025) avec l’appui de l’UNESCO et de l’UNTFHS : sélection et formation des CLPC, fora des femmes, engagement des autorités.",
    contenu: "Chaque commune (Goundam, Tonka, Alafia) a réuni ~50 participant·e·s. 12 membres par commune ont été choisis pour les CLPC (parité 6F/6H). Des formations ciblées ont regroupé 27 personnes par commune (protection communautaire, analyse des vulnérabilités, rôles CLPC/Foras, plans d’action). Forte participation des femmes et accompagnement des collectivités.",
    statistiques: { communes: '3', participants_communes: '≈150', membres_CLPC: '36', participants_formations: '81' },
    partenaires: ['UNESCO', 'UNTFHS'],
    lieux: ['Goundam', 'Tonka', 'Alafia', 'Tombouctou'],
    tags: ['Protection', 'Sécurité Humaine', 'UNESCO', 'Projets'],
    sources: [
      'https://www.ong-amss.org/post/renforcement-de-la-s%C3%A9curit%C3%A9-humaine-%C3%A0-goundam-tonka-et-alafia-des-communaut%C3%A9s-engag%C3%A9es-pour-leur'
    ]
  },
  {
    id: 12,
    titre: "Du plastique recyclé aux bancs d’école : 260 tables-bancs pour des écoles sinistrées",
    date: '3 mars 2024',
    dateISO: '2024-03-03',
    categorie: 'Éducation',
    image: 'https://images.weserv.nl/?url=www.ong-amss.org/_files/ugd/1c8c2f_6d2e1b9c7a9c4f5b937b7f0b4b1c2e8c~mv2.jpg',
    excerpt: "Remise officielle de 260 tables-bancs issus du recyclage de plastique, avec la Fondation Strømme et les autorités éducatives.",
    contenu: "Action conjointe État–Fondation Strømme–AMSS en réponse aux inondations de 2024. Les équipements soutiennent la reprise scolaire dans des établissements touchés, tout en promouvant l’économie circulaire.",
    statistiques: { tables_bancs: '260' },
    partenaires: ['Fondation Strømme', "Ministère de l’Éducation nationale", 'AMSS'],
    tags: ['Éducation', 'Environnement', 'Projets', 'Fondation Strømme'],
    sources: [
      'https://www.ong-amss.org/post/du-plastique-recycl%C3%A9-aux-bancs-d-%C3%A9cole-260-tables-bancs-remis-gr%C3%A2ce-%C3%A0-un-partenariat-exemplaire-entre-l-%C3%A9tat-la'
    ]
  },
  {
    id: 13,
    titre: 'Octobre, mois de la solidarité nationale : mobilisation des partenaires et des communautés',
    date: '31 octobre 2024',
    dateISO: '2024-10-31',
    categorie: 'Solidarité',
    image: 'https://images.weserv.nl/?url=www.ong-amss.org/_files/ugd/1c8c2f_82f5f0e2c6dc4a29a1d8b1a5e3d7f5a6~mv2.jpg',
    excerpt: "Retour sur les initiatives d’octobre dédiées à la solidarité nationale (sensibilisations, appuis, plaidoyer).",
    contenu: "L’AMSS a pris part au mois de la solidarité avec des actions de proximité, aux côtés de partenaires techniques et financiers. Focus sur la cohésion sociale, la protection et les services de base.",
    partenaires: ['DDC (Coopération Suisse)', 'USAID', 'Ambassade des Pays-Bas'],
    lieux: ['Mali'],
    tags: ['Solidarité', 'Sensibilisation', 'Partenariats'],
    sources: [
      'https://www.ong-amss.org/post/le-mois-d-octobre-d%C3%A9di%C3%A9-%C3%A0-la-solidarit%C3%A9-nationale-au-mali-une-opportunit%C3%A9-pour-renforcer-les-liens-social'
    ]
  },
  {
    id: 14,
    titre: "Gao : inauguration d’un espace communautaire de dialogue pour la paix",
    date: '10 mai 2024',
    dateISO: '2024-05-10',
    categorie: 'Gouvernance',
    image: 'https://images.weserv.nl/?url=www.ong-amss.org/_files/ugd/1c8c2f_35d2b0f9e8a54db59b3c5e2e1d2c3a9f~mv2.jpg',
    excerpt: "Un espace communautaire facilitant le dialogue et la cohésion, avec l’appui de la Coopération Suisse.",
    contenu: "L’AMSS et ses partenaires ont inauguré à Gao un espace communautaire dédié au dialogue et au vivre-ensemble. Cette infrastructure locale doit accueillir des concertations et des actions de médiation.",
    partenaires: ['DDC (Coopération Suisse)'],
    lieux: ['Gao'],
    tags: ['Gouvernance', 'Paix', 'Cohésion sociale', 'Partenariats'],
    sources: [
      'https://www.ong-amss.org/post/gao-inauguration-d-un-espace-communautaire-de-dialogue-pour-la-paix'
    ]
  },

  // ——— Évènement USAID/BHA (détails presse + blog AMSS) ———
  {
    id: 5,
    titre: "L'USAID et l'AMSS lancent un programme d'assistance humanitaire au profit de 60 000 personnes",
    date: '16 décembre 2024',
    dateISO: '2024-12-16',
    categorie: 'Humanitaire',
    image: img('programme-usaid-wash.jpg'),
    excerpt: "Lancement officiel du programme Protection, assainissement d'urgence, hygiène et services WASH-NFI à Bamako.",
    contenu: "Un partenariat direct USAID/BHA – AMSS marque un tournant pour la localisation de l’aide au Mali. Le programme vise 60 000 personnes vulnérables dans les régions de Mopti, Gao et Ménaka. La presse a précisé un financement d’environ 1,8 milliard FCFA pour une mise en œuvre sur 12 mois.",
    statistiques: { beneficiaires: '60 000', regions: '3', duree: '12 mois', financement: '≈ 1,8 Mds FCFA' },
    partenaires: ['USAID/BHA'],
    lieux: ['Mopti', 'Gao', 'Ménaka'],
    tags: ['Humanitaire', 'WASH', 'Protection', 'USAID', 'Projets'],
    sources: [
      'https://www.ong-amss.org/post/un-tournant-historique-pour-l-aide-humanitaire-au-mali-lancement-du-programme-de-protection-d-ass-1',
      'https://www.maliweb.net/societe/mopti-gao-et-menaka-lusaid-et-lamss-lancent-un-programme-dassistance-humanitaire-au-profit-de-60-000-personnes-3088371.html',
      'https://malijet.com/la_societe_malienne_aujourdhui/297759-amss--lancement-du-programme-de-protection-d-assainissement-d-ur.html'
    ]
  },

  // ——— Vos entrées 2024 (enrichies par des tags) ———
  {
    id: 6,
    titre: 'Formation de 460 employés pour renforcer les capacités institutionnelles',
    date: '15 novembre 2024',
    dateISO: '2024-11-15',
    categorie: 'Formation',
    image: img('formation-employes-amss.jpg'),
    excerpt: 'Renforcement des capacités de notre équipe pour mieux servir les communautés vulnérables du Mali.',
    contenu: "L'AMSS a organisé une série de formations pour ses 460 employés répartis dans les 8 régions d'intervention (approches humanitaires, gestion de projet, développement communautaire).",
    statistiques: { employes: '460', regions: '8', modules: '12' },
    lieux: ['Toutes les régions'],
    tags: ['Formation', 'Gouvernance']
  },
  {
    id: 7,
    titre: "Extension de l'AMSS vers 8 régions pour une couverture nationale",
    date: '1er octobre 2024',
    dateISO: '2024-10-01',
    categorie: 'Développement',
    image: img('extension-8-regions.jpg'),
    excerpt: "L'AMSS étend sa couverture géographique pour atteindre plus de populations vulnérables à travers le Mali.",
    contenu: "Après plus de 30 années d'expérience, l'AMSS franchit une nouvelle étape en étendant ses interventions à 8 régions du Mali, marquant sa volonté d'avoir un impact national durable.",
    statistiques: { regions: '8', bureaux: '8', population: '15M+' },
    lieux: ['Tombouctou', 'Gao', 'Ménaka', 'Mopti', 'Ségou', 'Sikasso', 'Bamako', 'Taoudénit'],
    tags: ['Gouvernance', 'Projets']
  },
  {
    id: 8,
    titre: 'Promotion des droits des femmes et leadership féminin dans les communautés',
    date: '8 mars 2024',
    dateISO: '2024-03-08',
    categorie: 'Autonomisation',
    image: img('droits-femmes-leadership.jpg'),
    excerpt: "Promouvoir les droits des femmes et soutenir leur rôle moteur dans le développement local.",
    contenu: "À l'occasion de la Journée internationale des droits des femmes, l'AMSS a mené des sensibilisations et formations pour l’autonomisation et le leadership des femmes.",
    statistiques: { femmes: '2 500', sessions: '25', cooperatives: '15' },
    lieux: ['Ségou', 'Mopti', 'Tombouctou'],
    tags: ['Autonomisation', 'Protection']
  },
  {
    id: 9,
    titre: "Atelier de formation pour améliorer l'accompagnement pédagogique des enfants",
    date: '15 février 2024',
    dateISO: '2024-02-15',
    categorie: 'Éducation',
    image: img('formation-animateurs-pedagogiques.jpg'),
    excerpt: "Atelier de trois jours pour renforcer l'accompagnement des enfants dans les centres d'apprentissage.",
    contenu: "Organisation d’un atelier de formation pour les animateurs pédagogiques dans la région de Ségou (méthodes d'enseignement et d'accompagnement).",
    statistiques: { animateurs: '85', jours: '3', modules: '8' },
    lieux: ['Ségou'],
    tags: ['Éducation', 'Projets']
  }
]

// Export final avec slug
export const actualites = base.map(a => ({
  ...a,
  slug: `${a.dateISO}-${slugify(a.titre)}`
}))
