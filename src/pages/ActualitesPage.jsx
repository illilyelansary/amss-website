// src/pages/ActualitesPage.jsx
import React, { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, ArrowRight, Users, MapPin, Heart, Share2 } from 'lucide-react'
import { actualites } from '../data/actualitesData'

// ====== Constantes flux & placeholder ======
const PLACEHOLDER = '/placeholder-news.jpg' // déposez le fichier dans /public
// Pages officielles repérées
const FACEBOOK_PAGE_URL = 'https://www.facebook.com/ONGAMSS'
const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@ONG-AMSS'
// Vidéo YouTube récente à intégrer (fallback si l’API n’est pas branchée)
const YOUTUBE_VIDEO_ID = 'P_3BiMNpJRc'

const ActualitesPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategorie, setSelectedCategorie] = useState('Toutes')
  const [searchTerm, setSearchTerm] = useState('')
  const itemsPerPage = 6

  useEffect(() => {
    // Revenir en haut quand on arrive sur la page (au cas où)
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [])

  const categories = useMemo(
    () => ['Toutes', ...Array.from(new Set(actualites.map(a => a.categorie)))],
    []
  )

  const filteredActualites = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()
    return actualites.filter(a => {
      const matchesCategorie =
        selectedCategorie === 'Toutes' || a.categorie === selectedCategorie
      const hay = (a.titre + ' ' + (a.excerpt || '')).toLowerCase()
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
                {featuredActualites.map((a) => (
                  <div key={a.slug} className="bg-white rounded-xl shadow-lg border border-border overflow-hidden hover:shadow-xl transition-shadow">
                    <Link to={`/actualites/${a.slug}`}>
                      <img
                        src={a.image || PLACEHOLDER}
                        alt={a.titre}
                        className="w-full h-64 object-cover"
                        onError={(e) => { e.currentTarget.src = PLACEHOLDER }}
                        loading="lazy"
                      />
                    </Link>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategorieColor(a.categorie)}`}>{a.categorie}</span>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-1" /><span>{a.date}</span>
                        </div>
                      </div>
                      <Link to={`/actualites/${a.slug}`}>
                        <h3 className="text-xl font-semibold text-foreground mb-3 line-clamp-2">{a.titre}</h3>
                      </Link>
                      <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-3">{a.excerpt}</p>
                      {a.statistiques && (
                        <div className="grid grid-cols-3 gap-2 mb-4 p-3 bg-muted/30 rounded-lg">
                          {Object.entries(a.statistiques).map(([k, v], idx) => (
                            <div key={idx} className="text-center">
                              <div className="font-semibold text-primary">{v}</div>
                              <div className="text-xs text-muted-foreground capitalize">{k}</div>
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <Link to={`/actualites/${a.slug}`} className="inline-flex items-center text-primary hover:underline text-sm font-medium">
                          Lire la suite <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                        <button className="p-2 text-muted-foreground hover:text-primary transition-colors" title="Partager">
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
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => { setSelectedCategorie(c); setCurrentPage(1) }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategorie === c
                        ? 'bg-primary text-white'
                        : 'bg-white text-muted-foreground hover:bg-primary/10 hover:text-primary'
                    }`}
                  >
                    {c}
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
                <p className="text-muted-foreground">Aucune actualité ne correspond à vos critères.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentItems.map((a) => (
                  <div key={a.slug} className="bg-white rounded-xl p-6 shadow-sm border border-border hover:shadow-lg transition-shadow">
                    <Link to={`/actualites/${a.slug}`}>
                      <img
                        src={a.image || PLACEHOLDER}
                        alt={a.titre}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                        onError={(e) => { e.currentTarget.src = PLACEHOLDER }}
                        loading="lazy"
                      />
                    </Link>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" /><span>{a.date}</span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategorieColor(a.categorie)}`}>{a.categorie}</span>
                    </div>
                    <Link to={`/actualites/${a.slug}`}>
                      <h3 className="text-lg font-semibold text-foreground mb-3 line-clamp-2">{a.titre}</h3>
                    </Link>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-3">{a.excerpt}</p>
                    {Array.isArray(a.lieux) && a.lieux.length > 0 && (
                      <div className="flex items-center text-xs text-muted-foreground mb-3">
                        <MapPin className="h-3 w-3 mr-1" /><span>{a.lieux.join(', ')}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <Link to={`/actualites/${a.slug}`} className="inline-flex items-center text-primary hover:underline text-sm font-medium">
                        Lire la suite <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                      <button className="p-1 text-muted-foreground hover:text-primary transition-colors" title="Partager">
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

      {/* ====== Section Réseaux sociaux ====== */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              Nos réseaux sociaux
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Facebook Page Plugin (timeline) */}
              <div className="bg-white rounded-xl border border-border shadow-sm p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold">Facebook</h3>
                  <a
                    href={FACEBOOK_PAGE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    Voir la page
                  </a>
                </div>
                <div className="rounded-lg overflow-hidden">
                  <iframe
                    title="Flux Facebook AMSS"
                    src={`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(FACEBOOK_PAGE_URL)}&tabs=timeline&width=500&height=600&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true`}
                    width="100%"
                    height="600"
                    style={{ border: 'none', overflow: 'hidden' }}
                    scrolling="no"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  />
                </div>
              </div>

              {/* YouTube (vidéo récente + lien chaîne) */}
              <div className="bg-white rounded-xl border border-border shadow-sm p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold">YouTube</h3>
                  <a
                    href={YOUTUBE_CHANNEL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    Voir la chaîne
                  </a>
                </div>
                <div className="rounded-lg overflow-hidden aspect-video">
                  <iframe
                    title="Vidéo AMSS"
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>

                {/* CTA secondaire */}
                <div className="mt-3 text-sm text-muted-foreground">
                  Astuce : abonnez-vous pour recevoir nos prochaines vidéos (reportages terrain, sensibilisations, témoignages).
                </div>
              </div>
            </div>
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
