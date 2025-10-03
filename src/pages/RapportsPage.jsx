// src/pages/RapportsPage.jsx
import { FileText, Download, Calendar, Eye, Filter, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { rapports } from '../data/projetsData'
import React, { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'

const RapportsPage = () => {
  const { search } = useLocation()

  // ===== Lecture des paramètres d'URL pour préfiltrer (ex: ?type=Rapport%20annuel&annee=2024&q=bilan) =====
  const params = new URLSearchParams(search)
  const initialType = params.get('type') || 'Tous'
  const initialAnnee = params.get('annee') || 'Toutes'
  const initialRecherche = params.get('q') || ''

  const [filtreType, setFiltreType] = useState(initialType)
  const [filtreAnnee, setFiltreAnnee] = useState(initialAnnee)
  const [recherche, setRecherche] = useState(initialRecherche)

  // Si l'URL change (navigation interne), on resynchronise les filtres
  useEffect(() => {
    const p = new URLSearchParams(search)
    setFiltreType(p.get('type') || 'Tous')
    setFiltreAnnee(p.get('annee') || 'Toutes')
    setRecherche(p.get('q') || '')
  }, [search])

  // ===== Listes de filtres (protégées contre valeurs manquantes) =====
  const types = useMemo(() => {
    const set = new Set(
      (rapports || [])
        .map(r => r?.type)
        .filter(Boolean)
    )
    return ['Tous', ...Array.from(set).sort((a, b) => String(a).localeCompare(String(b)))]
  }, [])

  const annees = useMemo(() => {
    const set = new Set(
      (rapports || [])
        .map(r => r?.year)
        .filter(v => v !== undefined && v !== null)
    )
    return ['Toutes', ...Array.from(set).sort((a, b) => Number(b) - Number(a))]
  }, [])

  // ===== Utilitaires =====
  const safe = (s) => String(s || '')

  const getTypeColor = (type) => {
    const colors = {
      'Rapport annuel': 'bg-blue-100 text-blue-800',
      "Rapport d'activité": 'bg-green-100 text-green-800',
      'Rapport financier': 'bg-purple-100 text-purple-800',
      "Rapport d'audit": 'bg-orange-100 text-orange-800',
      'Rapport de projet': 'bg-indigo-100 text-indigo-800'
    }
    return colors[type] || 'bg-gray-100 text-gray-800'
  }

  const getTypeIcon = () => <FileText className="h-5 w-5" />

  // ===== Filtrage =====
  const rapportsFiltres = useMemo(() => {
    const q = safe(recherche).toLowerCase().trim()
    return (rapports || []).filter((rapport) => {
      const typeMatch = filtreType === 'Tous' || safe(rapport.type) === filtreType
      const anneeMatch = filtreAnnee === 'Toutes' || String(rapport.year) === String(filtreAnnee)
      const hay = `${safe(rapport.title)} ${safe(rapport.description)} ${safe(rapport.excerpt)}`.toLowerCase()
      const rechercheMatch = q === '' || hay.includes(q)
      const published = Boolean(rapport.published)
      return typeMatch && anneeMatch && rechercheMatch && published
    })
  }, [filtreType, filtreAnnee, recherche])

  // ===== Métriques Hero =====
  const metrics = useMemo(() => {
    const list = (rapports || []).filter(r => r?.published)
    const count = list.length
    const years = new Set(list.map(r => r?.year).filter(Boolean))
    const kinds = new Set(list.map(r => r?.type).filter(Boolean))
    return { count, years: years.size, kinds: kinds.size }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 to-purple-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <FileText className="h-16 w-16 text-indigo-600 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Nos Rapports</h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Consultez nos rapports d'activités, financiers et d'audit pour suivre nos réalisations et notre transparence.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-indigo-600 mb-2">{metrics.count}</div>
                <div className="text-sm text-muted-foreground">Rapports disponibles</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">{metrics.years}</div>
                <div className="text-sm text-muted-foreground">Années couvertes</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">{metrics.kinds}</div>
                <div className="text-sm text-muted-foreground">Types de rapports</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filtres et recherche */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">Filtrer par :</span>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium">Type :</label>
                  <select
                    value={filtreType}
                    onChange={(e) => setFiltreType(e.target.value)}
                    className="px-3 py-1 border border-border rounded-md bg-background"
                  >
                    {types.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium">Année :</label>
                  <select
                    value={filtreAnnee}
                    onChange={(e) => setFiltreAnnee(e.target.value)}
                    className="px-3 py-1 border border-border rounded-md bg-background"
                  >
                    {annees.map((annee) => (
                      <option key={annee} value={annee}>{annee}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex-1 max-w-md w-full">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Rechercher un rapport..."
                    value={recherche}
                    onChange={(e) => setRecherche(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-border rounded-md bg-background"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Liste des rapports */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rapportsFiltres.map((rapport) => {
                const viewUrl = rapport.previewUrl || rapport.fileUrl || null
                const canDownload = Boolean(rapport.fileUrl)
                return (
                  <div key={rapport.id} className="bg-white rounded-xl shadow-sm border border-border overflow-hidden hover:shadow-lg transition-shadow">
                    {/* Header avec type et année */}
                    <div className="p-4 border-b border-border">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${getTypeColor(rapport.type)}`}>
                          {rapport.type || 'Rapport'}
                        </span>
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{rapport.year || '—'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Contenu */}
                    <div className="p-6">
                      <div className="flex items-start space-x-3 mb-4">
                        <div className="flex-shrink-0 p-2 bg-indigo-100 rounded-lg">
                          {getTypeIcon(rapport.type)}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2">
                            {rapport.title}
                          </h3>
                        </div>
                      </div>

                      {rapport.excerpt && (
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{rapport.excerpt}</p>
                      )}

                      {rapport.description && (
                        <div className="text-xs text-muted-foreground mb-6">
                          {safe(rapport.description).slice(0, 140)}{safe(rapport.description).length > 140 ? '…' : ''}
                        </div>
                      )}

                      <div className="flex flex-col gap-2">
                        {viewUrl ? (
                          <a href={viewUrl} target="_blank" rel="noopener noreferrer" className="w-full">
                            <Button className="w-full inline-flex items-center justify-center gap-2">
                              <Eye className="h-4 w-4" />
                              <span>Consulter</span>
                            </Button>
                          </a>
                        ) : (
                          <Button disabled className="w-full inline-flex items-center justify-center gap-2">
                            <Eye className="h-4 w-4" />
                            <span>Non disponible</span>
                          </Button>
                        )}

                        {canDownload ? (
                          <a href={rapport.fileUrl} target="_blank" rel="noopener noreferrer" download className="w-full">
                            <Button variant="outline" className="w-full inline-flex items-center justify-center gap-2">
                              <Download className="h-4 w-4" />
                              <span>Télécharger PDF</span>
                            </Button>
                          </a>
                        ) : (
                          <Button variant="outline" disabled className="w-full inline-flex items-center justify-center gap-2">
                            <Download className="h-4 w-4" />
                            <span>Indisponible</span>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {rapportsFiltres.length === 0 && (
              <div className="text-center py-12">
                <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground text-lg">Aucun rapport ne correspond aux critères de recherche.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Section transparence */}
      <section className="py-16 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-6">Notre Engagement pour la Transparence</h2>
              <p className="text-xl text-muted-foreground">L'AMSS s'engage à maintenir la plus haute transparence dans ses activités et sa gestion financière.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold">Rapports Annuels</h3>
                </div>
                <p className="text-muted-foreground mb-4">Nos rapports annuels détaillent l'ensemble de nos activités, réalisations et impacts sur les communautés bénéficiaires.</p>
                <Button variant="outline" className="w-full" onClick={() => setFiltreType('Rapport annuel')}>
                  Voir tous les rapports annuels
                </Button>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <FileText className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold">Audits Financiers</h3>
                </div>
                <p className="text-muted-foreground mb-4">Nos comptes sont audités annuellement par des cabinets indépendants pour garantir une gestion rigoureuse des fonds.</p>
                <Button variant="outline" className="w-full" onClick={() => setFiltreType("Rapport d'audit")}>
                  Consulter les audits
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Types de rapports */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">Types de Rapports Disponibles</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {types.filter((type) => type !== 'Tous').map((type) => {
                const count = (rapports || []).filter((r) => r?.type === type && r?.published).length
                return (
                  <div key={type} className="bg-white rounded-xl p-6 shadow-sm border border-border text-center hover:shadow-lg transition-shadow">
                    <div className={`inline-flex p-3 rounded-full mb-4 ${getTypeColor(type)}`}>
                      <FileText className="h-8 w-8" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{type}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{count} rapport{count > 1 ? 's' : ''} disponible{count > 1 ? 's' : ''}</p>
                    <Button variant="outline" size="sm" onClick={() => setFiltreType(type)}>
                      Voir les rapports
                    </Button>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-16 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">Restez Informés</h2>
            <p className="text-xl text-muted-foreground mb-8">Abonnez-vous à notre newsletter pour recevoir nos derniers rapports et actualités directement dans votre boîte mail.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-3">S'abonner à la newsletter</Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">Nous contacter</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default RapportsPage
// src/pages/RapportsPage.jsx
import { FileText, Download, Calendar, Eye, Filter, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { rapports } from '../data/projetsData'
import React, { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'

const RapportsPage = () => {
  const { search } = useLocation()

  // ===== Lecture des paramètres d'URL pour préfiltrer (ex: ?type=Rapport%20annuel&annee=2024&q=bilan) =====
  const params = new URLSearchParams(search)
  const initialType = params.get('type') || 'Tous'
  const initialAnnee = params.get('annee') || 'Toutes'
  const initialRecherche = params.get('q') || ''

  const [filtreType, setFiltreType] = useState(initialType)
  const [filtreAnnee, setFiltreAnnee] = useState(initialAnnee)
  const [recherche, setRecherche] = useState(initialRecherche)

  // Si l'URL change (navigation interne), on resynchronise les filtres
  useEffect(() => {
    const p = new URLSearchParams(search)
    setFiltreType(p.get('type') || 'Tous')
    setFiltreAnnee(p.get('annee') || 'Toutes')
    setRecherche(p.get('q') || '')
  }, [search])

  // ===== Listes de filtres (protégées contre valeurs manquantes) =====
  const types = useMemo(() => {
    const set = new Set(
      (rapports || [])
        .map(r => r?.type)
        .filter(Boolean)
    )
    return ['Tous', ...Array.from(set).sort((a, b) => String(a).localeCompare(String(b)))]
  }, [])

  const annees = useMemo(() => {
    const set = new Set(
      (rapports || [])
        .map(r => r?.year)
        .filter(v => v !== undefined && v !== null)
    )
    return ['Toutes', ...Array.from(set).sort((a, b) => Number(b) - Number(a))]
  }, [])

  // ===== Utilitaires =====
  const safe = (s) => String(s || '')

  const getTypeColor = (type) => {
    const colors = {
      'Rapport annuel': 'bg-blue-100 text-blue-800',
      "Rapport d'activité": 'bg-green-100 text-green-800',
      'Rapport financier': 'bg-purple-100 text-purple-800',
      "Rapport d'audit": 'bg-orange-100 text-orange-800',
      'Rapport de projet': 'bg-indigo-100 text-indigo-800'
    }
    return colors[type] || 'bg-gray-100 text-gray-800'
  }

  const getTypeIcon = () => <FileText className="h-5 w-5" />

  // ===== Filtrage =====
  const rapportsFiltres = useMemo(() => {
    const q = safe(recherche).toLowerCase().trim()
    return (rapports || []).filter((rapport) => {
      const typeMatch = filtreType === 'Tous' || safe(rapport.type) === filtreType
      const anneeMatch = filtreAnnee === 'Toutes' || String(rapport.year) === String(filtreAnnee)
      const hay = `${safe(rapport.title)} ${safe(rapport.description)} ${safe(rapport.excerpt)}`.toLowerCase()
      const rechercheMatch = q === '' || hay.includes(q)
      const published = Boolean(rapport.published)
      return typeMatch && anneeMatch && rechercheMatch && published
    })
  }, [filtreType, filtreAnnee, recherche])

  // ===== Métriques Hero =====
  const metrics = useMemo(() => {
    const list = (rapports || []).filter(r => r?.published)
    const count = list.length
    const years = new Set(list.map(r => r?.year).filter(Boolean))
    const kinds = new Set(list.map(r => r?.type).filter(Boolean))
    return { count, years: years.size, kinds: kinds.size }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 to-purple-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <FileText className="h-16 w-16 text-indigo-600 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Nos Rapports</h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Consultez nos rapports d'activités, financiers et d'audit pour suivre nos réalisations et notre transparence.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-indigo-600 mb-2">{metrics.count}</div>
                <div className="text-sm text-muted-foreground">Rapports disponibles</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">{metrics.years}</div>
                <div className="text-sm text-muted-foreground">Années couvertes</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">{metrics.kinds}</div>
                <div className="text-sm text-muted-foreground">Types de rapports</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filtres et recherche */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">Filtrer par :</span>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium">Type :</label>
                  <select
                    value={filtreType}
                    onChange={(e) => setFiltreType(e.target.value)}
                    className="px-3 py-1 border border-border rounded-md bg-background"
                  >
                    {types.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium">Année :</label>
                  <select
                    value={filtreAnnee}
                    onChange={(e) => setFiltreAnnee(e.target.value)}
                    className="px-3 py-1 border border-border rounded-md bg-background"
                  >
                    {annees.map((annee) => (
                      <option key={annee} value={annee}>{annee}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex-1 max-w-md w-full">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Rechercher un rapport..."
                    value={recherche}
                    onChange={(e) => setRecherche(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-border rounded-md bg-background"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Liste des rapports */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rapportsFiltres.map((rapport) => {
                const viewUrl = rapport.previewUrl || rapport.fileUrl || null
                const canDownload = Boolean(rapport.fileUrl)
                return (
                  <div key={rapport.id} className="bg-white rounded-xl shadow-sm border border-border overflow-hidden hover:shadow-lg transition-shadow">
                    {/* Header avec type et année */}
                    <div className="p-4 border-b border-border">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${getTypeColor(rapport.type)}`}>
                          {rapport.type || 'Rapport'}
                        </span>
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{rapport.year || '—'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Contenu */}
                    <div className="p-6">
                      <div className="flex items-start space-x-3 mb-4">
                        <div className="flex-shrink-0 p-2 bg-indigo-100 rounded-lg">
                          {getTypeIcon(rapport.type)}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2">
                            {rapport.title}
                          </h3>
                        </div>
                      </div>

                      {rapport.excerpt && (
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{rapport.excerpt}</p>
                      )}

                      {rapport.description && (
                        <div className="text-xs text-muted-foreground mb-6">
                          {safe(rapport.description).slice(0, 140)}{safe(rapport.description).length > 140 ? '…' : ''}
                        </div>
                      )}

                      <div className="flex flex-col gap-2">
                        {viewUrl ? (
                          <a href={viewUrl} target="_blank" rel="noopener noreferrer" className="w-full">
                            <Button className="w-full inline-flex items-center justify-center gap-2">
                              <Eye className="h-4 w-4" />
                              <span>Consulter</span>
                            </Button>
                          </a>
                        ) : (
                          <Button disabled className="w-full inline-flex items-center justify-center gap-2">
                            <Eye className="h-4 w-4" />
                            <span>Non disponible</span>
                          </Button>
                        )}

                        {canDownload ? (
                          <a href={rapport.fileUrl} target="_blank" rel="noopener noreferrer" download className="w-full">
                            <Button variant="outline" className="w-full inline-flex items-center justify-center gap-2">
                              <Download className="h-4 w-4" />
                              <span>Télécharger PDF</span>
                            </Button>
                          </a>
                        ) : (
                          <Button variant="outline" disabled className="w-full inline-flex items-center justify-center gap-2">
                            <Download className="h-4 w-4" />
                            <span>Indisponible</span>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {rapportsFiltres.length === 0 && (
              <div className="text-center py-12">
                <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground text-lg">Aucun rapport ne correspond aux critères de recherche.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Section transparence */}
      <section className="py-16 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-6">Notre Engagement pour la Transparence</h2>
              <p className="text-xl text-muted-foreground">L'AMSS s'engage à maintenir la plus haute transparence dans ses activités et sa gestion financière.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold">Rapports Annuels</h3>
                </div>
                <p className="text-muted-foreground mb-4">Nos rapports annuels détaillent l'ensemble de nos activités, réalisations et impacts sur les communautés bénéficiaires.</p>
                <Button variant="outline" className="w-full" onClick={() => setFiltreType('Rapport annuel')}>
                  Voir tous les rapports annuels
                </Button>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <FileText className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold">Audits Financiers</h3>
                </div>
                <p className="text-muted-foreground mb-4">Nos comptes sont audités annuellement par des cabinets indépendants pour garantir une gestion rigoureuse des fonds.</p>
                <Button variant="outline" className="w-full" onClick={() => setFiltreType("Rapport d'audit")}>
                  Consulter les audits
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Types de rapports */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">Types de Rapports Disponibles</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {types.filter((type) => type !== 'Tous').map((type) => {
                const count = (rapports || []).filter((r) => r?.type === type && r?.published).length
                return (
                  <div key={type} className="bg-white rounded-xl p-6 shadow-sm border border-border text-center hover:shadow-lg transition-shadow">
                    <div className={`inline-flex p-3 rounded-full mb-4 ${getTypeColor(type)}`}>
                      <FileText className="h-8 w-8" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{type}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{count} rapport{count > 1 ? 's' : ''} disponible{count > 1 ? 's' : ''}</p>
                    <Button variant="outline" size="sm" onClick={() => setFiltreType(type)}>
                      Voir les rapports
                    </Button>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-16 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">Restez Informés</h2>
            <p className="text-xl text-muted-foreground mb-8">Abonnez-vous à notre newsletter pour recevoir nos derniers rapports et actualités directement dans votre boîte mail.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-3">S'abonner à la newsletter</Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">Nous contacter</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default RapportsPage
// src/pages/RapportsPage.jsx
import { FileText, Download, Calendar, Eye, Filter, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { rapports } from '../data/projetsData'
import React, { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'

const RapportsPage = () => {
  const { search } = useLocation()

  // ===== Lecture des paramètres d'URL pour préfiltrer (ex: ?type=Rapport%20annuel&annee=2024&q=bilan) =====
  const params = new URLSearchParams(search)
  const initialType = params.get('type') || 'Tous'
  const initialAnnee = params.get('annee') || 'Toutes'
  const initialRecherche = params.get('q') || ''

  const [filtreType, setFiltreType] = useState(initialType)
  const [filtreAnnee, setFiltreAnnee] = useState(initialAnnee)
  const [recherche, setRecherche] = useState(initialRecherche)

  // Si l'URL change (navigation interne), on resynchronise les filtres
  useEffect(() => {
    const p = new URLSearchParams(search)
    setFiltreType(p.get('type') || 'Tous')
    setFiltreAnnee(p.get('annee') || 'Toutes')
    setRecherche(p.get('q') || '')
  }, [search])

  // ===== Listes de filtres (protégées contre valeurs manquantes) =====
  const types = useMemo(() => {
    const set = new Set(
      (rapports || [])
        .map(r => r?.type)
        .filter(Boolean)
    )
    return ['Tous', ...Array.from(set).sort((a, b) => String(a).localeCompare(String(b)))]
  }, [])

  const annees = useMemo(() => {
    const set = new Set(
      (rapports || [])
        .map(r => r?.year)
        .filter(v => v !== undefined && v !== null)
    )
    return ['Toutes', ...Array.from(set).sort((a, b) => Number(b) - Number(a))]
  }, [])

  // ===== Utilitaires =====
  const safe = (s) => String(s || '')

  const getTypeColor = (type) => {
    const colors = {
      'Rapport annuel': 'bg-blue-100 text-blue-800',
      "Rapport d'activité": 'bg-green-100 text-green-800',
      'Rapport financier': 'bg-purple-100 text-purple-800',
      "Rapport d'audit": 'bg-orange-100 text-orange-800',
      'Rapport de projet': 'bg-indigo-100 text-indigo-800'
    }
    return colors[type] || 'bg-gray-100 text-gray-800'
  }

  const getTypeIcon = () => <FileText className="h-5 w-5" />

  // ===== Filtrage =====
  const rapportsFiltres = useMemo(() => {
    const q = safe(recherche).toLowerCase().trim()
    return (rapports || []).filter((rapport) => {
      const typeMatch = filtreType === 'Tous' || safe(rapport.type) === filtreType
      const anneeMatch = filtreAnnee === 'Toutes' || String(rapport.year) === String(filtreAnnee)
      const hay = `${safe(rapport.title)} ${safe(rapport.description)} ${safe(rapport.excerpt)}`.toLowerCase()
      const rechercheMatch = q === '' || hay.includes(q)
      const published = Boolean(rapport.published)
      return typeMatch && anneeMatch && rechercheMatch && published
    })
  }, [filtreType, filtreAnnee, recherche])

  // ===== Métriques Hero =====
  const metrics = useMemo(() => {
    const list = (rapports || []).filter(r => r?.published)
    const count = list.length
    const years = new Set(list.map(r => r?.year).filter(Boolean))
    const kinds = new Set(list.map(r => r?.type).filter(Boolean))
    return { count, years: years.size, kinds: kinds.size }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 to-purple-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <FileText className="h-16 w-16 text-indigo-600 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Nos Rapports</h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Consultez nos rapports d'activités, financiers et d'audit pour suivre nos réalisations et notre transparence.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-indigo-600 mb-2">{metrics.count}</div>
                <div className="text-sm text-muted-foreground">Rapports disponibles</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">{metrics.years}</div>
                <div className="text-sm text-muted-foreground">Années couvertes</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">{metrics.kinds}</div>
                <div className="text-sm text-muted-foreground">Types de rapports</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filtres et recherche */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">Filtrer par :</span>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium">Type :</label>
                  <select
                    value={filtreType}
                    onChange={(e) => setFiltreType(e.target.value)}
                    className="px-3 py-1 border border-border rounded-md bg-background"
                  >
                    {types.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium">Année :</label>
                  <select
                    value={filtreAnnee}
                    onChange={(e) => setFiltreAnnee(e.target.value)}
                    className="px-3 py-1 border border-border rounded-md bg-background"
                  >
                    {annees.map((annee) => (
                      <option key={annee} value={annee}>{annee}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex-1 max-w-md w-full">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Rechercher un rapport..."
                    value={recherche}
                    onChange={(e) => setRecherche(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-border rounded-md bg-background"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Liste des rapports */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rapportsFiltres.map((rapport) => {
                const viewUrl = rapport.previewUrl || rapport.fileUrl || null
                const canDownload = Boolean(rapport.fileUrl)
                return (
                  <div key={rapport.id} className="bg-white rounded-xl shadow-sm border border-border overflow-hidden hover:shadow-lg transition-shadow">
                    {/* Header avec type et année */}
                    <div className="p-4 border-b border-border">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${getTypeColor(rapport.type)}`}>
                          {rapport.type || 'Rapport'}
                        </span>
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{rapport.year || '—'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Contenu */}
                    <div className="p-6">
                      <div className="flex items-start space-x-3 mb-4">
                        <div className="flex-shrink-0 p-2 bg-indigo-100 rounded-lg">
                          {getTypeIcon(rapport.type)}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2">
                            {rapport.title}
                          </h3>
                        </div>
                      </div>

                      {rapport.excerpt && (
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{rapport.excerpt}</p>
                      )}

                      {rapport.description && (
                        <div className="text-xs text-muted-foreground mb-6">
                          {safe(rapport.description).slice(0, 140)}{safe(rapport.description).length > 140 ? '…' : ''}
                        </div>
                      )}

                      <div className="flex flex-col gap-2">
                        {viewUrl ? (
                          <a href={viewUrl} target="_blank" rel="noopener noreferrer" className="w-full">
                            <Button className="w-full inline-flex items-center justify-center gap-2">
                              <Eye className="h-4 w-4" />
                              <span>Consulter</span>
                            </Button>
                          </a>
                        ) : (
                          <Button disabled className="w-full inline-flex items-center justify-center gap-2">
                            <Eye className="h-4 w-4" />
                            <span>Non disponible</span>
                          </Button>
                        )}

                        {canDownload ? (
                          <a href={rapport.fileUrl} target="_blank" rel="noopener noreferrer" download className="w-full">
                            <Button variant="outline" className="w-full inline-flex items-center justify-center gap-2">
                              <Download className="h-4 w-4" />
                              <span>Télécharger PDF</span>
                            </Button>
                          </a>
                        ) : (
                          <Button variant="outline" disabled className="w-full inline-flex items-center justify-center gap-2">
                            <Download className="h-4 w-4" />
                            <span>Indisponible</span>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {rapportsFiltres.length === 0 && (
              <div className="text-center py-12">
                <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground text-lg">Aucun rapport ne correspond aux critères de recherche.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Section transparence */}
      <section className="py-16 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-6">Notre Engagement pour la Transparence</h2>
              <p className="text-xl text-muted-foreground">L'AMSS s'engage à maintenir la plus haute transparence dans ses activités et sa gestion financière.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold">Rapports Annuels</h3>
                </div>
                <p className="text-muted-foreground mb-4">Nos rapports annuels détaillent l'ensemble de nos activités, réalisations et impacts sur les communautés bénéficiaires.</p>
                <Button variant="outline" className="w-full" onClick={() => setFiltreType('Rapport annuel')}>
                  Voir tous les rapports annuels
                </Button>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <FileText className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold">Audits Financiers</h3>
                </div>
                <p className="text-muted-foreground mb-4">Nos comptes sont audités annuellement par des cabinets indépendants pour garantir une gestion rigoureuse des fonds.</p>
                <Button variant="outline" className="w-full" onClick={() => setFiltreType("Rapport d'audit")}>
                  Consulter les audits
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Types de rapports */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">Types de Rapports Disponibles</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {types.filter((type) => type !== 'Tous').map((type) => {
                const count = (rapports || []).filter((r) => r?.type === type && r?.published).length
                return (
                  <div key={type} className="bg-white rounded-xl p-6 shadow-sm border border-border text-center hover:shadow-lg transition-shadow">
                    <div className={`inline-flex p-3 rounded-full mb-4 ${getTypeColor(type)}`}>
                      <FileText className="h-8 w-8" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{type}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{count} rapport{count > 1 ? 's' : ''} disponible{count > 1 ? 's' : ''}</p>
                    <Button variant="outline" size="sm" onClick={() => setFiltreType(type)}>
                      Voir les rapports
                    </Button>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-16 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">Restez Informés</h2>
            <p className="text-xl text-muted-foreground mb-8">Abonnez-vous à notre newsletter pour recevoir nos derniers rapports et actualités directement dans votre boîte mail.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-3">S'abonner à la newsletter</Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">Nous contacter</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default RapportsPage
