// src/pages/RecrutementPage.jsx
import React, { useEffect, useMemo, useState } from 'react'
import { Calendar, MapPin, Users, Briefcase, Archive, Search, Filter, Clock, FileDown, FileText } from 'lucide-react'
import { Link } from 'react-router-dom'
import { enCours as EN_COURS_SOURCE, archives as ARCHIVES_SOURCE, CATEGORIES } from '../data/recrutementsData'

// --- Utilitaires dates FR ---
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

const RecrutementPage = () => {
  const [data, setData] = useState({ enCours: [], archives: [] })
  const [activeTab, setActiveTab] = useState('emploi') // "emploi" | "marche" | "archives"
  const [searchTerm, setSearchTerm] = useState('')
  const [filterDomaine, setFilterDomaine] = useState('')

  // Auto-archivage à l’affichage (à partir des données importées)
  useEffect(() => {
    const expired = []
    const stillOpen = []
    for (const off of EN_COURS_SOURCE) {
      if (off.dateExpiration && isExpired(off.dateExpiration)) {
        expired.push({
          ...off,
          statut: 'Clôturé',
          dateCloture: off.dateExpiration,
        })
      } else {
        stillOpen.push(off)
      }
    }
    const archiveMap = new Map()
    ;[...ARCHIVES_SOURCE, ...expired].forEach((a) => archiveMap.set(a.id, a))
    setData({ enCours: stillOpen, archives: Array.from(archiveMap.values()) })
  }, [])

  const counts = useMemo(() => {
    const emploi = data.enCours.filter(o => (o.category || CATEGORIES.EMPLOI) === CATEGORIES.EMPLOI).length
    const marche = data.enCours.filter(o => o.category === CATEGORIES.MARCHE).length
    return { emploi, marche, archives: data.archives.length }
  }, [data])

  const domaines = useMemo(() => {
    const dyn = new Set(domainesFixes)
    data.enCours.forEach((o) => dyn.add(o.domaine))
    data.archives.forEach((o) => dyn.add(o.domaine))
    return Array.from(dyn)
  }, [data])

  const filtered = (arr) =>
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

  const buildMailto = (titre, id) => {
    const subject = encodeURIComponent(`Candidature – ${titre}${id ? ` (${id})` : ''}`)
    const body = encodeURIComponent(
      `Bonjour,\n\nJe souhaite postuler à l'avis « ${titre} »${id ? ` (${id})` : ''}.\n\nNom :\nTéléphone :\nLien CV (ou pièce jointe) :\nMessage :\n\nCordialement,`
    )
    return `mailto:recrutement@ong-amss.org?subject=${subject}&body=${body}`
  }

  const list = useMemo(() => {
    if (activeTab === 'archives') return filtered(data.archives)
    if (activeTab === 'marche') return filtered(data.enCours.filter(o => o.category === CATEGORIES.MARCHE))
    return filtered(data.enCours.filter(o => (o.category || CATEGORIES.EMPLOI) === CATEGORIES.EMPLOI))
  }, [activeTab, data, searchTerm, filterDomaine])

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Briefcase className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Recrutements & Avis</h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Consultez nos offres d’emploi et nos avis de marchés / prestations. Les avis expirés sont automatiquement archivés.
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
            </div>
          </div>
        </div>
      </section>

      {/* Onglets + Filtres */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex flex-wrap gap-2 bg-muted p-1 rounded-lg">
                <button
                  onClick={() => setActiveTab('emploi')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'emploi' ? 'bg-white text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Offres d’emploi ({counts.emploi})
                </button>
                <button
                  onClick={() => setActiveTab('marche')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'marche' ? 'bg-white text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Marchés & Prestations ({counts.marche})
                </button>
                <button
                  onClick={() => setActiveTab('archives')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'archives' ? 'bg-white text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Avis terminés ({counts.archives})
                </button>
              </div>

              {/* Filtres */}
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
            {list.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Aucun avis à afficher.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {list.map((offre) => {
                  const dleft = daysLeft(offre.dateExpiration)
                  let badge = null
                  if (dleft != null) {
                    if (dleft > 0) badge = `J-${dleft}`
                    else if (dleft === 0) badge = `Aujourd'hui`
                    else badge = `Expiré`
                  }
                  const isArchiveTab = activeTab === 'archives'
                  const expired = isArchiveTab || (dleft != null && dleft < 0)

                  return (
                    <div
                      key={offre.id}
                      className="bg-white rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(offre.type)}`}>
                              {offre.type || (offre.category === CATEGORIES.MARCHE ? 'Prestation' : 'Emploi')}
                            </span>
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {offre.domaine || (offre.category === CATEGORIES.MARCHE ? 'Marché' : 'Emploi')}
                            </span>
                            {badge && (
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-medium ${
                                  expired ? 'bg-red-100 text-red-700' : dleft === 0 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                                }`}
                              >
                                {badge}
                              </span>
                            )}
                            {isArchiveTab && (
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatutColor(offre.statut || 'Clôturé')}`}>
                                {offre.statut || 'Clôturé'}
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
                                {offre.competences.map((competence, index) => (
                                  <li key={index}>{competence}</li>
                                ))}
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
                            <p className={`font-medium ${expired ? 'text-red-600' : 'text-accent'}`}>
                              {offre.dateExpiration || 'N/D'}
                            </p>
                          </div>

                          {/* Postuler -> recrutement@ong-amss.org (pas pour archives) */}
                          {!isArchiveTab && (
                            <a
                              href={buildMailto(offre.titre, offre.id)}
                              className="w-full lg:w-auto inline-block px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                            >
                              Postuler
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action */}
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
