// src/pages/RecrutementPage.jsx
import React, { useEffect, useMemo, useState } from 'react'
import { Calendar, MapPin, Users, Briefcase, Archive, Search, Filter, Clock, FileDown, FileSpreadsheet } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import recrutementData from '../data/recrutementsData'

/* ===========================================================
 * Constantes & utilitaires
 * =========================================================== */
const CATEGORIES = {
  EMPLOI: 'emploi',
  MARCHE: 'marche', // marchés & prestations / appels d'offres
}

const MONTHS_FR = {
  janvier: 0, fevrier: 1, février: 1, mars: 2, avril: 3, mai: 4, juin: 5,
  juillet: 6, aout: 7, août: 7, septembre: 8, octobre: 9, novembre: 10, decembre: 11, décembre: 11,
}

const strip = (s) =>
  String(s || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()

function parseFRDate(input) {
  if (!input) return null
  const iso = new Date(input)
  if (!isNaN(iso.getTime())) return iso
  const m = String(input).match(/^\s*(\d{1,2})\s+([A-Za-zÀ-ÿ]+)\s+(\d{4})\s*$/i)
  if (!m) return null
  const day = parseInt(m[1], 10)
  const monthKey = strip(m[2])
  const year = parseInt(m[3], 10)
  const month = MONTHS_FR[monthKey]
  if (month == null) return null
  return new Date(Date.UTC(year, month, day))
}

// true si date < aujourd'hui (00:00)
function isExpired(dateStr) {
  const d = parseFRDate(dateStr)
  if (!d) return false
  const today = new Date()
  const todayUTC = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())
  const dueUTC = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate())
  return dueUTC < todayUTC
}

function daysLeft(dateStr) {
  const d = parseFRDate(dateStr)
  if (!d) return null
  const now = new Date()
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const end = new Date(d.getFullYear(), d.getMonth(), d.getDate())
  const diff = Math.round((end - start) / (1000 * 60 * 60 * 24))
  return diff
}

const getStatutColor = (statut) => {
  switch (statut) {
    case 'Pourvu':
      return 'bg-green-100 text-green-800'
    case 'Clôturé':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-blue-100 text-blue-800'
  }
}

const getTypeColor = (type) => {
  switch (type) {
    case 'CDI':
      return 'bg-primary/10 text-primary'
    case 'CDD':
      return 'bg-accent/10 text-accent'
    case 'Prestation':
      return 'bg-purple-100 text-purple-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

// Déduction de catégorie si "category" n'est pas fourni
function inferCategory(item) {
  if (item.category === CATEGORIES.EMPLOI || item.category === CATEGORIES.MARCHE) {
    return item.category
  }
  const t = strip(item.type)
  const title = strip(item.titre)
  if (t === 'prestation') return CATEGORIES.MARCHE
  if (/(prestata|marches?|appel.?d.?offres?)/i.test(item.titre || '')) return CATEGORIES.MARCHE
  if (/(prestata|marches?|appel.?d.?offres?)/.test(title)) return CATEGORIES.MARCHE
  return CATEGORIES.EMPLOI
}

const domainesFixes = [
  'Tous',
  'Éducation',
  'Agriculture',
  'Humanitaire',
  'Administration',
  'Coordination',
  'Entrepreneuriat',
  'Finance',
  'Information',
  'WASH',
]

/* ===========================================================
 * Page
 * =========================================================== */
const RecrutementPage = () => {
  const { pathname } = useLocation()

  const [data, setData] = useState({ enCours: [], archives: [] })
  const [activeTab, setActiveTab] = useState('enCours') // 'enCours' | 'archives'
  const [categoryFilter, setCategoryFilter] = useState('tous') // 'tous' | 'emploi' | 'marche'
  const [searchTerm, setSearchTerm] = useState('')
  const [filterDomaine, setFilterDomaine] = useState('')

  // Initialisation: auto-archivage + déduction catégories
  useEffect(() => {
    const expired = []
    const stillOpen = []

    for (const off of (recrutementData.enCours || [])) {
      const withCat = { ...off, category: inferCategory(off) }
      if (withCat.dateExpiration && isExpired(withCat.dateExpiration)) {
        expired.push({
          ...withCat,
          statut: 'Clôturé',
          dateCloture: withCat.dateExpiration,
        })
      } else {
        stillOpen.push(withCat)
      }
    }

    const archiveMap = new Map()
    ;[...(recrutementData.archives || []), ...expired].forEach((a) =>
      archiveMap.set(a.id, { ...a, category: inferCategory(a) })
    )

    setData({ enCours: stillOpen, archives: Array.from(archiveMap.values()) })
  }, [])

  // Catégorie depuis l'URL (nécessite que les routes /recrutement/emplois et /recrutement/marches existent)
  useEffect(() => {
    if (pathname.endsWith('/marches')) setCategoryFilter('marche')
    else if (pathname.endsWith('/emplois')) setCategoryFilter('emploi')
    else setCategoryFilter('tous')
  }, [pathname])

  const domaines = useMemo(() => {
    const dyn = new Set(domainesFixes)
    data.enCours.forEach((o) => dyn.add(o.domaine))
    data.archives.forEach((o) => dyn.add(o.domaine))
    return Array.from(dyn)
  }, [data])

  // Filtre générique
  const bySearchAndDomaine = (arr) =>
    arr.filter((item) => {
      const q = strip(searchTerm)
      const matchSearch =
        !q ||
        strip(item.titre).includes(q) ||
        strip(item.lieu).includes(q) ||
        strip(item.domaine).includes(q) ||
        strip(item.type).includes(q)
      const matchDomaine = !filterDomaine || filterDomaine === 'Tous' || item.domaine === filterDomaine
      return matchSearch && matchDomaine
    })

  // Filtre par catégorie
  const byCategory = (arr) => {
    if (categoryFilter === 'tous') return arr
    return arr.filter((it) => {
      const cat = inferCategory(it)
      return categoryFilter === 'emploi' ? cat === CATEGORIES.EMPLOI : cat === CATEGORIES.MARCHE
    })
  }

  const filteredEnCours = byCategory(bySearchAndDomaine(data.enCours))
  const filteredArchives = byCategory(bySearchAndDomaine(data.archives))

  const buildMailto = (titre) => {
    const subject = encodeURIComponent(`Candidature – ${titre}`)
    const body = encodeURIComponent(
      `Bonjour,\n\nJe souhaite postuler au poste « ${titre} ».\n\nNom :\nTéléphone :\nLien CV (ou pièce jointe) :\nMessage :\n\nCordialement,`
    )
    return `mailto:recrutement@ong-amss.org?subject=${subject}&body=${body}`
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Recrutement AMSS</h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Rejoignez notre équipe et contribuez à l'amélioration des conditions de vie des populations vulnérables du Mali.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center text-muted-foreground">
                <Users className="h-5 w-5 mr-2" />
                <span>460+ employés</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="h-5 w-5 mr-2" />
                <span>8 régions</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Briefcase className="h-5 w-5 mr-2" />
                <span>Opportunités variées</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catégories + Filtres */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Catégories synchronisées à l’URL */}
            <div className="flex flex-wrap gap-2 mb-6">
              <Link
                to="/recrutement"
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors border ${
                  categoryFilter === 'tous' ? 'bg-primary text-white border-primary' : 'bg-white text-foreground hover:bg-muted/60 border-border'
                }`}
              >
                Tous
              </Link>
              <Link
                to="/recrutement/emplois"
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors border ${
                  categoryFilter === 'emploi' ? 'bg-primary text-white border-primary' : 'bg-white text-foreground hover:bg-muted/60 border-border'
                }`}
              >
                <Briefcase className="h-4 w-4 inline mr-2" />
                Emplois
              </Link>
              <Link
                to="/recrutement/marches"
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors border ${
                  categoryFilter === 'marche' ? 'bg-primary text-white border-primary' : 'bg-white text-foreground hover:bg-muted/60 border-border'
                }`}
              >
                <FileSpreadsheet className="h-4 w-4 inline mr-2" />
                Marchés & Prestations
              </Link>
            </div>

            {/* Onglets en cours / archives */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex space-x-1 bg-muted p-1 rounded-lg">
                <button
                  onClick={() => setActiveTab('enCours')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'enCours' ? 'bg-white text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Briefcase className="h-4 w-4 inline mr-2" />
                  Offres en cours ({filteredEnCours.length})
                </button>
                <button
                  onClick={() => setActiveTab('archives')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'archives' ? 'bg-white text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Archive className="h-4 w-4 inline mr-2" />
                  Archives ({filteredArchives.length})
                </button>
              </div>

              {/* Filtres recherche + domaine */}
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Rechercher (titre, lieu, type, domaine)…"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div className="relative">
                  <Filter className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <select
                    value={filterDomaine}
                    onChange={(e) => setFilterDomaine(e.target.value)}
                    className="pl-10 pr-8 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none bg-white"
                  >
                    {domaines.map((domaine) => (
                      <option key={domaine} value={domaine === 'Tous' ? '' : domaine}>
                        {domaine}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Alerte d'auto-archivage */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Les offres sont <strong>archivées automatiquement</strong> dès le lendemain de la date limite (heure locale).</span>
            </div>
          </div>
        </div>
      </section>

      {/* Liste */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {activeTab === 'enCours' && (
              <div className="space-y-6">
                {filteredEnCours.length === 0 ? (
                  <div className="text-center py-12">
                    <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Aucune offre ne correspond à vos critères de recherche.</p>
                  </div>
                ) : (
                  filteredEnCours.map((offre) => {
                    const dleft = daysLeft(offre.dateExpiration)
                    let badge = null
                    if (dleft != null) {
                      if (dleft > 0) badge = `J-${dleft}`
                      else if (dleft === 0) badge = `Aujourd'hui`
                      else badge = `Expiré`
                    }
                    const cat = inferCategory(offre)

                    return (
                      <div key={offre.id} className="bg-white rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2 mb-3">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(offre.type)}`}>
                                {offre.type || (cat === CATEGORIES.MARCHE ? 'Prestation' : 'Emploi')}
                              </span>
                              <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {offre.domaine || (cat === CATEGORIES.MARCHE ? 'Marché' : 'Emploi')}
                              </span>
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${cat === CATEGORIES.MARCHE ? 'bg-purple-100 text-purple-800' : 'bg-emerald-100 text-emerald-800'}`}>
                                {cat === CATEGORIES.MARCHE ? 'Marché / Prestation' : 'Emploi'}
                              </span>
                              {badge && (
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                                    dleft < 0 ? 'bg-red-100 text-red-700' : dleft === 0 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                                  }`}
                                >
                                  {badge}
                                </span>
                              )}
                            </div>

                            <h3 className="text-xl font-semibold text-foreground mb-2">{offre.titre}</h3>

                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                              {offre.lieu && (
                                <div className="flex items-center">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  <span>{offre.lieu}</span>
                                </div>
                              )}
                              {offre.datePublication && (
                                <div className="flex items-center">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  <span>Publié le {offre.datePublication}</span>
                                </div>
                              )}
                            </div>

                            {offre.description && (
                              <p className="text-muted-foreground mb-4 leading-relaxed">{offre.description}</p>
                            )}

                            {offre.competences && (
                              <div className="mb-4">
                                <h4 className="font-medium text-foreground mb-2">Compétences requises :</h4>
                                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                                  {offre.competences.map((c, i) => <li key={i}>{c}</li>)}
                                </ul>
                              </div>
                            )}

                            {/* Bouton PDF si disponible */}
                            {offre.pdfUrl && (
                              <a
                                href={offre.pdfUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-4 py-2 text-sm rounded-md border border-border hover:bg-muted/50 transition-colors"
                              >
                                <FileDown className="h-4 w-4 mr-2" />
                                Télécharger l’avis (PDF)
                              </a>
                            )}
                          </div>

                          <div className="lg:text-right">
                            <div className="mb-4">
                              <p className="text-sm text-muted-foreground mb-1">Date limite :</p>
                              <p className={`font-medium ${dleft < 0 ? 'text-red-600' : 'text-accent'}`}>
                                {offre.dateExpiration || 'N/D'}
                              </p>
                            </div>

                            {/* Postuler -> recrutement@ong-amss.org */}
                            <a
                              href={buildMailto(offre.titre)}
                              className="w-full lg:w-auto inline-block px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                            >
                              Postuler
                            </a>
                          </div>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            )}

            {activeTab === 'archives' && (
              <div className="space-y-4">
                {filteredArchives.length === 0 ? (
                  <div className="text-center py-12">
                    <Archive className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Aucune archive ne correspond à vos critères de recherche.</p>
                  </div>
                ) : (
                  filteredArchives.map((offre) => {
                    const cat = inferCategory(offre)
                    return (
                      <div key={offre.id} className="bg-white rounded-lg p-4 shadow-sm border border-border">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(offre.type)}`}>
                                {offre.type || (cat === CATEGORIES.MARCHE ? 'Prestation' : 'Emploi')}
                              </span>
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {offre.domaine || (cat === CATEGORIES.MARCHE ? 'Marché' : 'Emploi')}
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${cat === CATEGORIES.MARCHE ? 'bg-purple-100 text-purple-800' : 'bg-emerald-100 text-emerald-800'}`}>
                                {cat === CATEGORIES.MARCHE ? 'Marché / Prestation' : 'Emploi'}
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatutColor(offre.statut || 'Clôturé')}`}>
                                {offre.statut || 'Clôturé'}
                              </span>
                            </div>

                            <h3 className="font-semibold text-foreground mb-1">{offre.titre}</h3>

                            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-2">
                              {offre.lieu && (
                                <div className="flex items-center">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  <span>{offre.lieu}</span>
                                </div>
                              )}
                              {offre.datePublication && (
                                <div className="flex items-center">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  <span>{offre.datePublication}</span>
                                </div>
                              )}
                              {offre.dateCloture && (
                                <div className="flex items-center">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  <span>Clôturé le {offre.dateCloture}</span>
                                </div>
                              )}
                            </div>

                            {offre.description && (
                              <p className="text-sm text-muted-foreground">{offre.description}</p>
                            )}

                            {offre.pdfUrl && (
                              <div className="mt-3">
                                <a
                                  href={offre.pdfUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center px-3 py-1.5 text-xs rounded-md border border-border hover:bg-muted/50 transition-colors"
                                >
                                  <FileDown className="h-3 w-3 mr-2" />
                                  Télécharger l’avis (PDF)
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">Rejoignez l'AMSS</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Vous ne trouvez pas le poste qui vous correspond ? Envoyez-nous votre candidature spontanée.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:recrutement@ong-amss.org?subject=Candidature%20spontan%C3%A9e%20-%20AMSS"
                className="px-8 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
              >
                Candidature Spontanée
              </a>
              <Link
                to="/contact"
                className="px-8 py-3 border border-border text-foreground rounded-md hover:bg-muted/50 transition-colors"
              >
                Nous Contacter
              </Link>
            </div>
            <div className="mt-8 text-sm text-muted-foreground">
              <p className="mb-2">
                <strong>Important :</strong> Merci de spécifier le titre du poste dans l'objet du message lors de votre candidature.
              </p>
              <p>
                Email :{' '}
                <a href="mailto:recrutement@ong-amss.org" className="text-primary hover:underline">
                  recrutement@ong-amss.org
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default RecrutementPage
