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
  // ======== ACTUS DÉJÀ PRÉSENTES (enrichies) ========
  {
    id: 1,
    titre: "Une semaine sur le terrain avec l'AMSS : Récits de Résilience, de Protection et d'Espoir au cœur du Sahel",
    date: '25 août 2025',
    dateISO: '2025-08-25',
    categorie: 'Humanitaire',
    image: img('terrain-sahel-activites.jpg'),
    excerpt: "AMSS a mené une semaine d’actions intensives (21–25 août) : sensibilisations, soutien psychosocial, transferts monétaires et activités de protection au bénéfice des ménages vulnérables.",
    contenu: "Chaque jour sur le terrain, nos équipes témoignent de la résilience des communautés maliennes. Du 21 au 25 août 2025 : séances de sensibilisation à la protection et à la VBG, espaces amis des enfants, activités récréatives, transferts monétaires ciblés, accompagnement psychosocial, référencement des cas vers les services spécialisés et appui à la sécurité alimentaire. Ces actions ont été menées avec les autorités locales et l’appui de nos partenaires humanitaires.",
    statistiques: { beneficiaires: '800+', seances: '17', menages: '49' },
    partenaires: ['PLAN International', 'HCR', 'UNICEF', 'Education Cannot Wait', 'AEN', 'GFFO'],
    lieux: ['Douentza', 'Ansongo', 'Bankass', 'Gossi', 'Tabango'],
    featured: true,
    tags: ['Humanitaire', 'Protection', 'Sensibilisation', 'Soutien psychosocial', 'Aide en cash', 'Sécurité Alimentaire', 'Enfants', 'Femmes', 'Projets']
  },
  {
    id: 2,
    titre: "Remise de 12 000 kits scolaires aux enfants déplacés à Tombouctou",
    date: '16 septembre 2025',
    dateISO: '2025-09-16',
    categorie: 'Éducation',
    image: img('kits-scolaires-tombouctou.jpg'),
    excerpt: "Cérémonie officielle de remise de 12 000 kits pour soutenir la scolarisation des enfants déplacés à Tombouctou.",
    contenu: "En partenariat avec les autorités locales et les services techniques, AMSS a organisé la remise de 12 000 kits scolaires aux enfants déplacés internes de la région de Tombouctou. Cette initiative contribue à la reprise et à la continuité pédagogique dans un contexte d’instabilité, tout en renforçant l’équité d’accès à l’éducation.",
    statistiques: { kits: '12 000', enfants: '12 000', ecoles: '50+' },
    lieux: ['Tombouctou'],
    featured: true,
    tags: ['Éducation', 'Enfants déplacés', 'Kit scolaire', 'Scolarisation', 'Tombouctou', 'Projets']
  },
  {
    id: 3,
    titre: '400 mères vulnérables reçoivent des intrants agricoles grâce au projet GFFO',
    date: '5 juin 2025',
    dateISO: '2025-06-05',
    categorie: 'Sécurité Alimentaire',
    image: img('meres-agricoles-gao.jpg'),
    excerpt: 'Distribution d’intrants agricoles à 400 mères vulnérables dans les cercles de Gao et Ansongo pour renforcer la résilience alimentaire.',
    contenu: "En collaboration avec le projet GFFO, AMSS a distribué des semences, engrais et outils à 400 mères vulnérables à Gao et Ansongo. L’objectif : soutenir les moyens de subsistance, améliorer la disponibilité alimentaire et réduire l’exposition aux chocs.",
    statistiques: { beneficiaires: '400', cercles: '2', intrants: 'Semences, engrais, outils' },
    partenaires: ['GFFO'],
    lieux: ['Gao', 'Ansongo'],
    tags: ['Sécurité Alimentaire', 'Agriculture', 'Intrants', 'Mères', 'Résilience', 'GFFO', 'Gao', 'Ansongo', 'Projets']
  },
  {
    id: 4,
    titre: "L'UNESCO et l'ONG AMSS procèdent à la mise en place des Comités Locaux de Protection Civile",
    date: '20 mai 2025',
    dateISO: '2025-05-20',
    categorie: 'Protection',
    image: img('comites-protection-civile.jpg'),
    excerpt: "Trois Comités Locaux de Protection Civile installés pour renforcer la préparation et la réponse communautaire.",
    contenu: "Afin de consolidariser la capacité communautaire face aux risques, AMSS et l’UNESCO ont appuyé la mise en place de CLPC dans trois localités du nord du Mali. Ces comités faciliteront la préparation, l’alerte précoce et la coordination locale lors d’événements critiques.",
    statistiques: { comites: '3', localites: '3', membres: '45' },
    partenaires: ['UNESCO'],
    lieux: ['Goundam', 'Tonka', 'Alafia'],
    tags: ['Protection', 'Gouvernance', 'Protection civile', 'Capacités locales', 'UNESCO', 'Projets']
  },
  {
    id: 5,
    titre: "L'USAID et l'AMSS lancent un programme d'assistance humanitaire au profit de 60 000 personnes",
    date: '18 décembre 2024',
    dateISO: '2024-12-18',
    categorie: 'Humanitaire',
    image: img('programme-usaid-wash.jpg'),
    excerpt: "Lancement du Programme de Protection, d’Assainissement d’Urgence, d’Hygiène et Services WASH NFI, un tournant pour la localisation de l’aide au Mali.",
    contenu: "Le 16 décembre 2024 à Bamako (hôtel Salam), AMSS et l’USAID/BHA ont lancé un programme majeur couvrant Mopti, Gao et Ménaka. Il s’agit d’un financement direct inédit à une ONG nationale pour des activités de protection et WASH, marquant une étape clé vers une localisation effective de l’aide.",
    statistiques: { beneficiaires: '60 000', regions: '3', duree: '24 mois' },
    partenaires: ['USAID/BHA'],
    lieux: ['Mopti', 'Gao', 'Ménaka'],
    tags: ['Humanitaire', 'WASH', 'Protection', 'Assainissement', 'Hygiène', 'USAID', 'Projets']
  },
  {
    id: 6,
    titre: 'Formation de 460 employés pour renforcer les capacités institutionnelles',
    date: '15 novembre 2024',
    dateISO: '2024-11-15',
    categorie: 'Formation',
    image: img('formation-employes-amss.jpg'),
    excerpt: 'Renforcement des compétences (gestion de projet, approche humanitaire, développement communautaire) des équipes dans 8 régions.',
    contenu: "AMSS a organisé une série de formations destinées à 460 agents couvrant 8 régions d’intervention. Cette mise à niveau continue vise une meilleure qualité de mise en œuvre, des standards plus élevés en redevabilité et la diffusion des bonnes pratiques.",
    statistiques: { employes: '460', regions: '8', modules: '12' },
    lieux: ['Toutes les régions'],
    tags: ['Formation', 'Renforcement des capacités', 'Institutionnel', 'Développement communautaire']
  },
  {
    id: 7,
    titre: "Extension de l'AMSS vers 8 régions pour une couverture nationale",
    date: '1er octobre 2024',
    dateISO: '2024-10-01',
    categorie: 'Développement',
    image: img('extension-8-regions.jpg'),
    excerpt: "Extension géographique : l’AMSS couvre désormais 8 régions pour amplifier l’impact national.",
    contenu: "Après 30+ ans d’expérience, AMSS étend ses interventions à 8 régions du Mali pour rapprocher l’aide des populations et structur­er des réponses durables. Les bureaux décentralisés renforcent la coordination territoriale et la réactivité.",
    statistiques: { regions: '8', bureaux: '8', population: '15M+' },
    lieux: ['Tombouctou', 'Gao', 'Ménaka', 'Mopti', 'Ségou', 'Sikasso', 'Bamako', 'Taoudénit'],
    tags: ['Développement', 'Couverture nationale', 'Extension', 'Projets']
  },
  {
    id: 8,
    titre: 'Promotion des droits des femmes et leadership féminin dans les communautés',
    date: '8 mars 2024',
    dateISO: '2024-03-08',
    categorie: 'Autonomisation',
    image: img('droits-femmes-leadership.jpg'),
    excerpt: "Actions de sensibilisation et formations pour l’autonomisation des femmes et le leadership local.",
    contenu: "À l’occasion du 8 mars, AMSS a mis en œuvre des séances de sensibilisation VBG, des formations et des activités communautaires favorisant l’autonomie et le leadership des femmes, avec un accent sur la résilience économique et la participation citoyenne.",
    statistiques: { femmes: '2 500', sessions: '25', cooperatives: '15' },
    lieux: ['Ségou', 'Mopti', 'Tombouctou'],
    tags: ['Autonomisation', 'Femmes', 'Leadership', 'Protection', 'Sensibilisation', 'Projets']
  },
  {
    id: 9,
    titre: "Atelier de formation pour améliorer l'accompagnement pédagogique des enfants",
    date: '15 février 2024',
    dateISO: '2024-02-15',
    categorie: 'Éducation',
    image: img('formation-animateurs-pedagogiques.jpg'),
    excerpt: "Trois jours d’atelier pour outiller les animateurs pédagogiques de Ségou et améliorer l’accompagnement des enfants.",
    contenu: "AMSS a organisé un atelier de trois jours destiné aux animateurs pédagogiques afin de renforcer les méthodes d’enseignement, le suivi psychosocial et la qualité de l’accompagnement des enfants dans les centres d’apprentissage.",
    statistiques: { animateurs: '85', jours: '3', modules: '8' },
    lieux: ['Ségou'],
    tags: ['Éducation', 'Formation', 'Accompagnement pédagogique', 'Enfants', 'Projets']
  },

  // ======== NOUVELLES ACTUS (issues du site / RS) ========
  {
    id: 10,
    titre: "PADEM – Lancement régional à Sikasso : vers une éducation inclusive et de qualité",
    date: '8 avril 2025',
    dateISO: '2025-04-08',
    categorie: 'Éducation',
    image: img('padem-lancement-sikasso.jpg'),
    excerpt: "Lancement régional du Programme d’Appui au Développement Éducatif du Mali (PADEM) à Sikasso.",
    contenu: "Le 8 avril 2025 à Sikasso, AMSS a participé au lancement régional du PADEM, aux côtés des autorités éducatives. L’initiative vise à améliorer l’équité et la qualité des apprentissages, avec un accent sur l’inclusion et l’amélioration des environnements scolaires.",
    partenaires: ['Ministère de l’Éducation nationale'],
    lieux: ['Sikasso'],
    tags: ['Éducation', 'Scolarisation', 'Inclusion', 'Sikasso', 'Projets']
  },
  {
    id: 11,
    titre: "Sécurité Humaine à Goundam, Tonka et Alafia : communautés engagées",
    date: '12 avril 2025',
    dateISO: '2025-04-12',
    categorie: 'Protection',
    image: img('securite-humaine-goundam-tonka-alafia.jpg'),
    excerpt: "Forums communautaires (9–11 avril) et installation des CLPC ; parité et implication active des femmes.",
    contenu: "Dans le cadre du renforcement de la sécurité humaine, AMSS a facilité des forums communautaires et la mise en place des Comités Locaux de Protection Civile (CLPC) à Goundam, Tonka et Alafia. Les échanges ont porté sur la réduction des risques, l’alerte précoce et la participation inclusive (parité au sein des CLPC et implication des femmes).",
    statistiques: { clpc: '3', periodes: '9–11 avr. 2025', participation: 'Parité 6/6 dans chaque CLPC' },
    lieux: ['Goundam', 'Tonka', 'Alafia'],
    tags: ['Protection', 'Gouvernance', 'Sécurité humaine', 'Participation', 'Projets']
  },
  {
    id: 12,
    titre: "Du plastique recyclé aux bancs d’école : 260 tables-bancs remis",
    date: '27 août 2025',
    dateISO: '2025-08-27',
    categorie: 'Éducation',
    image: img('260-tables-bancs-recycles.jpg'),
    excerpt: "Remise officielle de 260 tables-bancs issus du recyclage de plastique pour des écoles sinistrées.",
    contenu: "AMSS et ses partenaires ont soutenu la dotation de 260 tables-bancs fabriqués à partir de plastique recyclé, destinés à des écoles touchées par des inondations. Une action innovante qui renforce l’accès à un environnement d’apprentissage sûr et durable.",
    statistiques: { tables_bancs: '260', matiere: 'Plastique recyclé' },
    tags: ['Éducation', 'Environnement', 'Inondations', 'Résilience', 'Projets']
  },
  {
    id: 13,
    titre: "Journée mondiale de l’aide humanitaire : hommage et engagement",
    date: '19 août 2024',
    dateISO: '2024-08-19',
    categorie: 'Humanitaire',
    image: img('journee-aide-humanitaire-2024.jpg'),
    excerpt: "AMSS a rendu hommage aux humanitaires et réaffirmé son engagement auprès des populations affectées.",
    contenu: "À l’occasion du 19 août, AMSS a salué le courage des travailleurs humanitaires et a rappelé son engagement à fournir une aide impartiale et de qualité aux communautés touchées par les crises au Mali.",
    tags: ['Humanitaire', 'Plaidoyer', 'Engagement', 'Projets']
  },
  {
    id: 14,
    titre: "Vœux 2025 : espoir, résilience et paix",
    date: '1 janvier 2025',
    dateISO: '2025-01-01',
    categorie: 'Institutionnel',
    image: img('voeux-2025-amss.jpg'),
    excerpt: "Message de vœux 2025 : pour une année de progrès, de paix et de solidarité.",
    contenu: "AMSS a adressé ses vœux de Nouvel An, réaffirmant ses priorités : soutien aux plus vulnérables, cohésion sociale, redevabilité et partenariat. Appel à l’action collective pour un Mali résilient et apaisé.",
    tags: ['Institutionnel', 'Communication', 'Plaidoyer']
  },
  {
    id: 15,
    titre: "Forums communautaires Nex4Food à Ségou (08–09 déc. 2023)",
    date: '9 décembre 2023',
    dateISO: '2023-12-09',
    categorie: 'Sécurité Alimentaire',
    image: img('nex4food-segou-forums.jpg'),
    excerpt: "Forums dans les communes de Ségou, Sebougou et Pelengana avec les jeunes, en partenariat avec Ayuda en Acción.",
    contenu: "Dans le cadre du projet Nex4Food, AMSS et Ayuda en Acción ont tenu des forums à Ségou, Sebougou et Pelengana les 08–09 décembre 2023, centrés sur la participation des jeunes, la collecte d’informations et la sécurité alimentaire locale.",
    partenaires: ['Ayuda en Acción', 'Conseil Régional de la Jeunesse de Ségou', 'MINUSMA (appui)'],
    lieux: ['Ségou', 'Sebougou', 'Pelengana'],
    tags: ['Sécurité Alimentaire', 'Jeunes', 'Participation', 'Ségou', 'Projets']
  },
  {
    id: 16,
    titre: "Rencontres de fin d’année 2023 – Mopti, Douentza, Bandiagara",
    date: '9 décembre 2023',
    dateISO: '2023-12-09',
    categorie: 'Institutionnel',
    image: img('rencontres-fin-annee-2023-mopti.jpg'),
    excerpt: "Moments de cohésion avec les équipes et partenaires pour clôturer l’année 2023 dans la région de Mopti.",
    contenu: "AMSS a réuni ses équipes et partenaires pour une rencontre de fin d’année en décembre 2023 dans la région de Mopti (Mopti, Douentza, Bandiagara), afin de partager les résultats, remercier les acteurs et renforcer la cohésion.",
    lieux: ['Mopti', 'Douentza', 'Bandiagara'],
    tags: ['Institutionnel', 'Cohésion', 'Partenaires']
  },
  {
    id: 17,
    titre: "Localisation de l’aide : échanges avec l’Ambassade des Pays-Bas (05 oct. 2022)",
    date: '5 octobre 2022',
    dateISO: '2022-10-05',
    categorie: 'Plaidoyer',
    image: img('localisation-aide-pays-bas-2022.jpg'),
    excerpt: "Rencontre autour du Forum national sur la localisation de l’aide humanitaire et le développement au Mali (FONA-LAHDM).",
    contenu: "Le Président de la Plateforme des ONG nationales actives dans l’humanitaire et le Directeur des Programmes de l’AMSS ont échangé le 5 octobre 2022 avec l’Ambassade du Royaume des Pays-Bas au Mali au sujet des enjeux de localisation de l’aide.",
    partenaires: ['Ambassade du Royaume des Pays-Bas'],
    lieux: ['Bamako'],
    tags: ['Plaidoyer', 'Gouvernance', 'Partenaires']
  }
]

// Export final avec slug
export const actualites = base.map(a => ({
  ...a,
  slug: `${a.dateISO}-${slugify(a.titre)}`
}))
