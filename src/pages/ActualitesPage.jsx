// src/pages/ActualitesPage.jsx
import React, { useState, useMemo } from 'react'
import { Calendar, Tag, ArrowRight, Users, MapPin, Heart, Share2 } from 'lucide-react'

// ---- Images importées depuis votre dossier du site ----
// (ajustez le chemin si votre structure diffère)
import imgTerrainSahel from '../assets/actualites/terrain-sahel-activites.jpg'
import imgKitsScolaires from '../assets/actualites/kits-scolaires-tombouctou.jpg'
import imgMeresAgricoles from '../assets/actualites/meres-agricoles-gao.jpg'
import imgComitesProtection from '../assets/actualites/comites-protection-civile.jpg'
import imgUsaidWash from '../assets/actualites/programme-usaid-wash.jpg'
import imgFormationEmployes from '../assets/actualites/formation-employes-amss.jpg'
import imgExtension8Regions from '../assets/actualites/extension-8-regions.jpg'
import imgDroitsFemmes from '../assets/actualites/droits-femmes-leadership.jpg'
import imgFormationAnimateurs from '../assets/actualites/formation-animateurs-pedagogiques.jpg'

// ---- Données actualisées (issues du fichier fourni) ----
const actualites = [
  {
    id: 1,
    titre: "Une semaine sur le terrain avec l'AMSS : Récits de Résilience, de Protection et d'Espoir au cœur du Sahel",
    date: '25 août 2025',
    categorie: 'Humanitaire',
    image: imgTerrainSahel,
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
    categorie: 'Éducation',
    image: imgKitsScolaires,
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
    categorie: 'Sécurité Alimentaire',
    image: imgMeresAgricoles,
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
    categorie: 'Protection',
    image: imgComitesProtection,
    excerpt: "L'UNESCO et l'ONG AMSS procèdent à la mise en place des Comités Locaux de Protection Civile à Goundam, Tonka et Alafia.",
    contenu: "Dans le cadre du renforcement des capacités locales en protection civile, l'UNESCO et l'AMSS ont procédé à la mise en place de Comités Locaux de Protection Civile dans trois localités stratégiques du nord du Mali.",
    statistiques: { comites: '3', localites: '3', membres: '45' },
    partenaires: ['UNESCO'],
    lieux: ['Goundam', 'Tonka', 'Alafia']
  },
  {
    id: 5,
    titre: "L'USAID et l'AMSS lancent un programme d'assistance humanitaire au profit de 60 000 personnes",
    date: '18 décembre 2024',
    categorie: 'Humanitaire',
    image: imgUsaidWash,
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
    categorie: 'Formation',
    image: imgFormationEmployes,
    excerpt: 'Renforcement des capacités de notre équipe pour mieux servir les communautés vulnérables du Mali.',
    contenu: "L'AMSS a organisé une série de formations pour ses 460 employés répartis dans les 8 régions d'intervention. Ces formations portent sur les nouvelles approches humanitaires, la gestion de projet et le développement communautaire.",
    statistiques: { employes: '460', regions: '8', modules: '12' },
    lieux: ['Toutes les régions']
  },
  {
    id: 7,
    titre: "Extension de l'AMSS vers 8 régions pour une couverture nationale",
    date: '1er octobre 2024',
    categorie: 'Développement',
    image: imgExtension8Regions,
    excerpt: "L'AMSS étend sa couverture géographique pour atteindre plus de populations vulnérables à travers le Mali.",
    contenu: "Après plus de 30 années d'expérience, l'AMSS franchit une nouvelle étape en étendant ses interventions à 8 régions du Mali, marquant ainsi sa volonté d'avoir un impact national sur le développement et l'aide humanitaire.",
    statistiques: { regions: '8', bureaux: '8', population: '15M+' },
    lieux: ['Tombouctou', 'Gao', 'Ménaka', 'Mopti', 'Ségou', 'Sikasso', 'Bamako', 'Taoudénit']
  },
  {
    id: 8,
    titre: 'Promotion des droits des femmes et leadership féminin dans les communautés',
    date: '8 mars 2024',
    categorie: 'Autonomisation',
    image: imgDroitsFemmes,
    excerpt: "Une belle dynamique pour promouvoir les droits des femmes et soutenir leur rôle moteur dans le développement local.",
    contenu: "À l'occasion de la Journée internationale des droits des femmes, l'AMSS a organisé plusieurs activités de sensibilisation et de formation pour promouvoir l'autonomisation des femmes et leur leadership dans les communautés.",
    statistiques: { femmes: '2 500', sessions: '25', cooperatives: '15' },
    lieux: ['Ségou', 'Mopti', 'Tombouctou']
  },
  {
    id: 9,
    titre: "Atelier de formation pour améliorer l'accompagnement pédagogique des enfants",
    date: '15 février 2024',
    categorie: 'Éducation',
    image: imgFormationAnimateurs,
    excerpt: "Cet atelier vise à outiller davantage les animatrices et animateurs afin d'améliorer la qualité de l'accompagnement pédagogique offert aux enfants.",
    contenu: "L'AMSS a organisé un atelier de formation de trois jours pour ses animateurs pédagogiques dans la région de Ségou. L'objectif est d'améliorer les méthodes d'enseignement et d'accompagnement des enfants dans les centres d'apprentissage.",
    statistiques: { animateurs: '85', jours: '3', modules: '8' },
    lieux: ['Ségou']
  }
]

// ---- Composant ----
const ActualitesPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategorie, setSelectedCategorie] = useState('Toutes')
  const [searchTerm, setSearchTerm] = useState('')
  const itemsPerPage = 6

  const categories = ['Toutes', 'Humanitaire', 'Éducation', 'Sécurité Alimentaire', 'Protection', 'Formation', 'Développement', 'Autonomisation']

  const filteredActualites = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()
    return actualites.filter(actu => {
      const matchesCategorie = selectedCategorie === 'Toutes' || actu.categorie === selectedCategorie
      const hay = (actu.titre + ' ' + actu.excerpt).toLowerCase()
      const matchesSearch = term === '' || hay.includes(term)
      return matchesCategorie && matchesSearch
    })
  }, [selectedCategorie, searchTerm])

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredActualites.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredActualites.length / itemsPerPage)
  const featuredActualites = actualites.filter(a => a.featured)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const getCategorieColor = (categorie) => {
    const colors = {
      'Humanitaire': 'bg-red-100 text-red-800',
      'Éducation': 'bg-blue-100 text-blue-800',
      'Sécurité Alimentaire': 'bg-green-100 text-green-800',
      'Protection': 'bg-purple-100 text-purple-800',
      'Formation': 'bg-yellow-100 text-yellow-800',
      'Développement': 'bg-indigo-100 text-indigo-800',
      'Autonomisation': 'bg-pink-100 text-pink-800'
    }
    return colors[categorie] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Actualités de l'AMSS</h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Suivez nos actions sur le terrain, nos projets et nos partenariats pour un Mali plus résilient.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center text-muted-foreground">
                <Users className="h-5 w-5 mr-2" /><span>200K+ bénéficiaires</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="h-5 w-5 mr-2" /><span>8 régions</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Heart className="h-5 w-5 mr-2" /><span>30+ années d'engagement</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* À la Une */}
      {featuredActualites.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">À la Une</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {featuredActualites.map((actu) => (
                  <div key={actu.id} className="bg-white rounded-xl shadow-lg border border-border overflow-hidden hover:shadow-xl transition-shadow">
                    <img src={actu.image} alt={actu.titre} className="w-full h-64 object-cover" />
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategorieColor(actu.categorie)}`}>{actu.categorie}</span>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-1" /><span>{actu.date}</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-3 line-clamp-2">{actu.titre}</h3>
                      <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-3">{actu.excerpt}</p>
                      {actu.statistiques && (
                        <div className="grid grid-cols-3 gap-2 mb-4 p-3 bg-muted/30 rounded-lg">
                          {Object.entries(actu.statistiques).map(([k, v], idx) => (
                            <div key={idx} className="text-center">
                              <div className="font-semibold text-primary">{v}</div>
                              <div className="text-xs text-muted-foreground capitalize">{k}</div>
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <button className="inline-flex items-center text-primary hover:underline text-sm font-medium">
                          Lire la suite <ArrowRight className="ml-1 h-4 w-4" />
                        </button>
                        <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
                          <Share2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Filtres & Recherche */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {['Toutes', ...Array.from(new Set(actualites.map(a => a.categorie)))].map((categorie) => (
                  <button
                    key={categorie}
                    onClick={() => { setSelectedCategorie(categorie); setCurrentPage(1) }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategorie === categorie
                        ? 'bg-primary text-white'
                        : 'bg-white text-muted-foreground hover:bg-primary/10 hover:text-primary'
                    }`}
                  >
                    {categorie}
                  </button>
                ))}
              </div>
              <div className="relative w-full lg:w-80">
                <input
                  type="text"
                  placeholder="Rechercher une actualité..."
                  value={searchTerm}
                  onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1) }}
                  className="w-full pl-4 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grille des actualités */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {currentItems.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Aucune actualité ne correspond à vos critères de recherche.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentItems.map((actu) => (
                  <div key={actu.id} className="bg-white rounded-xl p-6 shadow-sm border border-border hover:shadow-lg transition-shadow">
                    <img src={actu.image} alt={actu.titre} className="w-full h-48 object-cover rounded-lg mb-4" />
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" /><span>{actu.date}</span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategorieColor(actu.categorie)}`}>{actu.categorie}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-3 line-clamp-2">{actu.titre}</h3>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-3">{actu.excerpt}</p>
                    {actu.lieux && (
                      <div className="flex items-center text-xs text-muted-foreground mb-3">
                        <MapPin className="h-3 w-3 mr-1" /><span>{actu.lieux.join(', ')}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <button className="inline-flex items-center text-primary hover:underline text-sm font-medium">
                        Lire la suite <ArrowRight className="ml-1 h-4 w-4" />
                      </button>
                      <button className="p-1 text-muted-foreground hover:text-primary transition-colors">
                        <Share2 className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12 space-x-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => paginate(i + 1)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentPage === i + 1
                        ? 'bg-primary text-white'
                        : 'bg-white text-muted-foreground hover:bg-primary/10 hover:text-primary border border-border'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">Restez Informé</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Abonnez-vous à notre newsletter pour recevoir nos dernières actualités directement dans votre boîte mail.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <button className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
                S'abonner
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ActualitesPage
