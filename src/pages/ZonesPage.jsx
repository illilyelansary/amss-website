// src/pages/ZonesPage.jsx
import React, { useEffect, useMemo, useState } from 'react'
import { MapPin, ArrowRight, Users, CheckCircle, Clock, Filter, RefreshCw, Building2, Layers, Search } from 'lucide-react'
import { projetsEnCours, projetsTermines } from '../data/projetsData'

/* ------------------------ Helpers ------------------------ */
const normalize = (s) =>
  String(s || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()

const isNum = (v) => typeof v === 'number' && Number.isFinite(v)
const sum = (arr) => arr.reduce((a, b) => a + b, 0)

/* -------------------- Zones & alias ---------------------- */
const zones = [
  { key: 'tombouctou', label: 'Tombouctou' },
  { key: 'taoudenni', label: 'Taoudénit' },
  { key: 'gao', label: 'Gao' },
  { key: 'menaka', label: 'Ménaka' },
  { key: 'kidal', label: 'Kidal' },
  { key: 'mopti', label: 'Mopti' },
  { key: 'segou', label: 'Ségou' },
  { key: 'sikasso', label: 'Sikasso' }
]

const zoneDescriptions = {
  tombouctou:
    "Grande région sahélienne touchée par les chocs climatiques et sécuritaires. L’AMSS y intervient sur la gouvernance locale, la protection, l’éducation et la sécurité alimentaire.",
  taoudenni:
    "Nouvelle région du Nord à très faible densité, confrontée à de grands défis d’accès aux services sociaux de base. Priorités : WASH, nutrition et protection.",
  gao:
    "Région marquée par des déplacements de populations. Priorités : protection de l’enfance, nutrition, cohésion sociale et relance économique.",
  menaka:
    "Contexte sécuritaire volatil nécessitant une réponse humanitaire agile. Priorités : assistance d’urgence, protection et services essentiels.",
  kidal:
    "Zone aride et difficile d’accès. Priorités : protection communautaire, gouvernance locale et services sociaux de base.",
  mopti:
    "Au centre du Mali et fortement touchée par la crise. Priorités : WASH, lutte contre les VBG, assistance d’urgence et relance.",
  segou:
    "Région de transition avec des besoins importants en nutrition et sécurité alimentaire ; actions en éducation et gouvernance.",
  sikasso:
    "Grand bassin agricole du sud. Priorités : éducation (PADEM), gouvernance locale et protection (PROTECT)."
}

const regionAliases = {
  tombouctou: ['tombouctou'],
  taoudenni: ['taoudenni', 'taoudéni', 'taoudenit', 'taoudénit', 'taoudeni'],
  gao: ['gao'],
  menaka: ['menaka', 'ménaka'],
  kidal: ['kidal'],
  mopti: ['mopti'],
  segou: ['segou', 'ségou'],
  sikasso: ['sikasso']
}

const matchesRegion = (projectRegion, zoneKey) => {
  const r = normalize(projectRegion || '')
  const aliases = regionAliases[zoneKey] || [zoneKey]
  return aliases.some(a => r.includes(a))
}

/* --------------- Extraction Domaines/Donneurs ------------- */
const extractDomainTokens = (domainStr) =>
  String(domainStr || '')
    .split(',')
    .map((x) => x.trim())
    .filter(Boolean)

export default function ZonesPage() {
  /* -------------------- Lifecycle -------------------- */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  /* -------------------- Données ---------------------- */
  const allEnCours = useMemo(
    () => (projetsEnCours || []).map(p => ({ ...p, _statusFlag: 'en' })),
    []
  )
  const allTermines = useMemo(
    () => (projetsTermines || []).map(p => ({ ...p, _statusFlag: 'out' })),
    []
  )
  const allProjects = useMemo(() => [...allEnCours, ...allTermines], [allEnCours, allTermines])

  /* -------------------- Filtres (UI) ----------------- */
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all') // all | en | termine | suspendu
  const [domain, setDomain] = useState('all')
  const [donor, setDonor] = useState('all')
  const [hideEmptyZones, setHideEmptyZones] = useState(false)

  // Options de domaines & bailleurs depuis la data
  const domainOptions = useMemo(() => {
    const setD = new Set()
    allProjects.forEach(p => extractDomainTokens(p.domain).forEach(tok => setD.add(tok)))
    return Array.from(setD).sort((a,b) => a.localeCompare(b))
  }, [allProjects])

  const donorOptions = useMemo(() => {
    const setB = new Set()
    allProjects.forEach(p => {
      const d = (p.donor || '').trim()
      if (d) setB.add(d)
    })
    return Array.from(setB).sort((a,b) => a.localeCompare(b))
  }, [allProjects])

  const resetFilters = () => {
    setSearch('')
    setStatus('all')
    setDomain('all')
    setDonor('all')
    setHideEmptyZones(false)
  }

  // Filtre projet selon l'état UI
  const passesFilters = (p) => {
    // statut
    const isEnCours = p._statusFlag === 'en' || normalize(p.status).includes('en cours')
    const isTermine = p._statusFlag === 'out' || normalize(p.status).includes('termin')
    const isSuspendu = p.usaidNote === true || normalize(p.status).includes('suspendu')

    if (status === 'en' && !isEnCours) return false
    if (status === 'termine' && !isTermine) return false
    if (status === 'suspendu' && !isSuspendu) return false

    // domaine
    if (domain !== 'all') {
      const tokens = extractDomainTokens(p.domain).map(normalize)
      if (!tokens.some(t => t === normalize(domain))) return false
    }

    // bailleur
    if (donor !== 'all') {
      if (String(p.donor || '') !== donor) return false
    }

    // recherche plein texte
    const hay = normalize(`${p.title} ${p.excerpt || ''} ${p.region || ''} ${p.donor || ''} ${p.domain || ''}`)
    const needle = normalize(search.trim())
    if (needle && !hay.includes(needle)) return false

    return true
  }

  /* ----------- Pré-calcul par zone (listes) ----------- */
  const dataByZone = useMemo(() => {
    const out = {}
    zones.forEach(z => {
      const full = [
        ...allEnCours.filter(p => matchesRegion(p.region, z.key)),
        ...allTermines.filter(p => matchesRegion(p.region, z.key))
      ]
      const filtered = full.filter(passesFilters)
      out[z.key] = { full, filtered }
    })
    return out
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allEnCours, allTermines, search, status, domain, donor])

  /* ---------------- UI helpers ---------------- */
  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  const fmt = (n) => isNum(n) ? n.toLocaleString('fr-FR') : 'N/D'

  /* -------------------- Render ------------------------ */
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-primary/10 to-accent/10" id="top">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Zones d’Intervention</h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Parcourez nos actions par région. Cliquez sur une région pour aller directement à sa section, et utilisez les filtres pour affiner l’affichage.
            </p>
          </div>

          {/* Sous-menu des zones */}
          <div className="max-w-5xl mx-auto mt-8 flex flex-wrap gap-2 justify-center">
            {zones.map(z => (
              <button
                key={z.key}
                onClick={() => scrollTo(`zone-${z.key}`)}
                className="px-4 py-2 rounded-full bg-white border hover:bg-primary/10 hover:text-primary transition-colors text-sm"
                title={`Aller à ${z.label}`}
              >
                {z.label}
              </button>
            ))}
          </div>

          {/* Panneau de filtres */}
          <div className="max-w-6xl mx-auto mt-8 bg-white border border-border rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Filter className="h-4 w-4 text-primary" />
              <div className="font-medium">Filtrer les projets affichés</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {/* Recherche */}
              <div className="md:col-span-2">
                <label className="text-xs text-muted-foreground mb-1 block">Recherche</label>
                <div className="relative">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Titre, zone, bailleur, mot-clé…"
                    className="w-full pl-9 pr-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                  <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>

              {/* Statut */}
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Statut</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-white"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="en">En cours</option>
                  <option value="termine">Terminés</option>
                  <option value="suspendu">Suspendu (USAID)</option>
                </select>
              </div>

              {/* Domaine */}
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Domaine</label>
                <select
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-white"
                >
                  <option value="all">Tous domaines</option>
                  {domainOptions.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              {/* Bailleur */}
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Bailleur</label>
                <select
                  value={donor}
                  onChange={(e) => setDonor(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-white"
                >
                  <option value="all">Tous bailleurs</option>
                  {donorOptions.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                <input
                  type="checkbox"
                  checked={hideEmptyZones}
                  onChange={(e) => setHideEmptyZones(e.target.checked)}
                />
                Masquer les zones sans résultats
              </label>

              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-md border border-border hover:bg-muted transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
                Réinitialiser
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Sections par zone */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-14">
            {zones.map(z => {
              const { full = [], filtered = [] } = dataByZone[z.key] || {}

              // Chiffres clés basés sur l’ensemble des projets de la zone (non filtrés)
              const total = full.length
              const enCoursCount = full.filter(p => p._statusFlag === 'en' || normalize(p.status).includes('en cours')).length
              const terminesCount = full.filter(p => p._statusFlag === 'out' || normalize(p.status).includes('termin')).length
              const donorsSet = new Set(full.map(p => (p.donor || '').trim()).filter(Boolean))
              const benefTotal = sum(full.map(p => (isNum(p.beneficiaries) ? p.beneficiaries : 0)))

              // Si l’option "masquer" est active et aucun résultat filtré -> on saute
              if (hideEmptyZones && filtered.length === 0) return null

              return (
                <div key={z.key} id={`zone-${z.key}`} className="scroll-mt-24">
                  {/* Titre & description */}
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin className="h-6 w-6 text-primary" />
                    <h2 className="text-2xl md:text-3xl font-bold">{z.label}</h2>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    {zoneDescriptions[z.key] || "Zone d’intervention de l’AMSS."}
                  </p>

                  {/* Chiffres clés */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                    <div className="rounded-xl bg-white border p-4 flex items-center gap-3 shadow-sm">
                      <Layers className="h-5 w-5 text-primary" />
                      <div>
                        <div className="text-xs text-muted-foreground">Projets (total)</div>
                        <div className="text-lg font-semibold">{total}</div>
                      </div>
                    </div>
                    <div className="rounded-xl bg-white border p-4 flex items-center gap-3 shadow-sm">
                      <Clock className="h-5 w-5 text-green-600" />
                      <div>
                        <div className="text-xs text-muted-foreground">En cours</div>
                        <div className="text-lg font-semibold">{enCoursCount}</div>
                      </div>
                    </div>
                    <div className="rounded-xl bg-white border p-4 flex items-center gap-3 shadow-sm">
                      <Building2 className="h-5 w-5 text-accent" />
                      <div>
                        <div className="text-xs text-muted-foreground">Bailleurs</div>
                        <div className="text-lg font-semibold">{donorsSet.size}</div>
                      </div>
                    </div>
                    <div className="rounded-xl bg-white border p-4 flex items-center gap-3 shadow-sm">
                      <Users className="h-5 w-5 text-primary" />
                      <div>
                        <div className="text-xs text-muted-foreground">Bénéficiaires (≈)</div>
                        <div className="text-lg font-semibold">{fmt(benefTotal)}</div>
                      </div>
                    </div>
                  </div>

                  {/* Résultats filtrés */}
                  {filtered.length === 0 ? (
                    <div className="text-sm text-muted-foreground">
                      Aucun projet ne correspond aux filtres actuels.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filtered.map(p => (
                        <div key={`${z.key}-${p.id}`} className="bg-white border border-border rounded-xl p-5 shadow-sm">
                          <div className="flex items-center justify-between text-xs mb-2">
                            { (p._statusFlag === 'en' || normalize(p.status).includes('en cours')) ? (
                              <span className="inline-flex items-center px-2 py-0.5 rounded bg-green-100 text-green-700">
                                <Clock className="h-3 w-3 mr-1" /> En cours
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2 py-0.5 rounded bg-blue-100 text-blue-700">
                                <CheckCircle className="h-3 w-3 mr-1" /> Terminé
                              </span>
                            )}
                            {p.usaidNote && (
                              <span className="px-2 py-0.5 rounded bg-red-100 text-red-700 border border-red-200">
                                Suspendu (USAID)
                              </span>
                            )}
                          </div>

                          <div className="font-medium mb-1">{p.title}</div>
                          {p.excerpt && (
                            <div className="text-sm text-muted-foreground line-clamp-3">{p.excerpt}</div>
                          )}

                          <div className="mt-3 text-xs text-muted-foreground space-y-1">
                            {p.donor && <div><strong>Bailleur:</strong> {p.donor}</div>}
                            {p.domain && <div><strong>Domaine:</strong> {p.domain}</div>}
                            {isNum(p.beneficiaries) && (
                              <div className="inline-flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {p.beneficiaries.toLocaleString('fr-FR')} bénéficiaires
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-5">
                    <a
                      href="#top"
                      onClick={(e)=>{e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' })}}
                      className="inline-flex items-center text-primary hover:underline"
                    >
                      Retour en haut <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
