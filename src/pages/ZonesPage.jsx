// src/pages/ZonesPage.jsx
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
  MapPin, ArrowRight, Users, CheckCircle, Clock, Filter, RefreshCw,
  Building2, Layers, Search, AlertTriangle, ChevronDown, ChevronUp, Handshake
} from 'lucide-react'
import { projetsEnCours, projetsTermines } from '../data/projetsData'

// ---------- Utils communs ----------
const normalize = (s) =>
  String(s || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()

const isFiniteNum = (n) => typeof n === 'number' && Number.isFinite(n)
const toNumber = (v) => {
  if (isFiniteNum(v)) return v
  if (v == null) return 0
  const n = parseFloat(String(v).replace(/[^\d.-]/g, ''))
  return Number.isFinite(n) ? n : 0
}

// Garde-fou bénéficiaires : refuse NaN, négatifs, et valeurs manifestement aberrantes (> 500k / projet)
const asBenef = (v) => {
  const n = toNumber(v)
  if (!Number.isFinite(n) || n <= 0) return 0
  if (n > 500_000) return 0
  return n
}

const fmt = (n) => new Intl.NumberFormat('fr-FR').format(n)

// Champ domaine/bailleur hétérogènes (domain|domaine|sector|secteur / donor|bailleur|bailleurs)
const getDomain = (p) => p?.domain || p?.domaine || p?.sector || p?.secteur || ''
const getDonor  = (p) => p?.donor ?? p?.bailleur ?? p?.bailleurs ?? ''
const getPartners = (p) => p?.partners ?? p?.partenaires ?? ''

const extractDomainTokens = (label) =>
  String(label || '')
    .split(/[,/|;]+/)
    .map((s) => s.trim())
    .filter(Boolean)

const splitMulti = (label) =>
  String(label || '')
    .split(/[\/,;|]+/)
    .map((s) => s.trim())
    .filter(Boolean)

const regionTokens = (label) =>
  String(label || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)

// ---------- Données zones ----------
const zones = [
  { key: 'tombouctou', label: 'Tombouctou' },
  { key: 'gao', label: 'Gao' },
  { key: 'kidal', label: 'Kidal' },
  { key: 'menaka', label: 'Ménaka' },
  { key: 'mopti', label: 'Mopti' },
  { key: 'segou', label: 'Ségou' },
  { key: 'sikasso', label: 'Sikasso' },
  { key: 'koulikoro', label: 'Koulikoro' },
  { key: 'bamako', label: 'Bamako' },
  { key: 'san', label: 'San' },
]

const zoneDescriptions = {
  tombouctou: 'Zone sahélienne avec forte intervention humanitaire et relèvement.',
  gao: 'Appui aux communautés affectées par les crises et renforcement de la résilience.',
  kidal: 'Interventions ciblées en contexte à accès difficile.',
  menaka: 'Réponse aux déplacements et services sociaux de base.',
  mopti: 'Stabilisation, cohésion sociale et services essentiels.',
  segou: 'Développement local, gouvernance et services sociaux.',
  sikasso: 'Sécurité alimentaire et moyens d’existence.',
  koulikoro: 'Éducation, santé et gouvernance locale.',
  bamako: 'Coordination, plaidoyer et projets urbains.',
  san: 'Filets sociaux, sécurité alimentaire et éducation.',
}

// Alias simples pour la détection d’appartenance régionale
const aliases = {
  tombouctou: ['tombouctou', 'timbuktu', 'diré', 'dire', 'goundam', 'niafunké', 'niafunke', 'gourma-rharous'],
  gao: ['gao', 'ansongo'],
  kidal: ['kidal'],
  menaka: ['ménaka', 'menaka'],
  mopti: ['mopti', 'bankass', 'bandiagara', 'djenné', 'djene', 'douentza', 'kere', 'ténénkou', 'tenenkou', 'koro'],
  segou: ['ségou', 'segou', 'san (région historique)'],
  sikasso: ['sikasso', 'koutiala', 'bougouni'],
  koulikoro: ['koulikoro', 'kati', 'dioila', 'banamba', 'kolokani', 'nara'],
  bamako: ['bamako'],
  san: ['san'],
}

const matchesRegion = (regionField, zoneKey) => {
  const hay = normalize(regionField)
  if (!hay) return false
  return aliases[zoneKey]?.some((t) => hay.includes(normalize(t))) || false
}

// ---------- Mini-carte décorative ----------
function MiniMapZones({ onSelect, zoneStats }) {
  const positions = {
    tombouctou: { x: 55, y: 55 },
    gao: { x: 120, y: 65 },
    kidal: { x: 155, y: 45 },
    menaka: { x: 160, y: 85 },
    mopti: { x: 110, y: 100 },
    segou: { x: 100, y: 130 },
    sikasso: { x: 100, y: 165 },
    koulikoro: { x: 135, y: 125 },
    bamako: { x: 140, y: 150 },
    san: { x: 120, y: 125 },
  }
  return (
    <div className="w-full">
      <div className="text-sm text-muted-foreground mb-2">Mini-carte (schématique)</div>
      <svg viewBox="0 0 260 210" className="w-full h-64 bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl border">
        <rect x="1" y="1" width="258" height="208" rx="12" ry="12" fill="transparent" />
        {zones.map((z) => {
          const pos = positions[z.key]
          if (!pos) return null
          const hasAny = (zoneStats[z.key]?.filteredCount ?? 0) > 0
          return (
            <g
              key={z.key}
              className="cursor-pointer"
              onClick={() => onSelect?.(z.key)}
              role="button"
              aria-label={`Aller à ${z.label}`}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onSelect?.(z.key)
              }}
            >
              <circle
                cx={pos.x}
                cy={pos.y}
                r={18}
                className={hasAny ? 'fill-white stroke-current' : 'fill-muted stroke-muted-foreground/30'}
                strokeWidth="1.5"
              />
              <text x={pos.x} y={pos.y - 12} textAnchor="middle" className="text-[8px] fill-current">{z.label}</text>
              <text x={pos.x} y={pos.y + 4} textAnchor="middle" className="text-[9px] font-bold fill-current">
                {zoneStats[z.key]?.filteredCount ?? 0}
              </text>
              <text x={pos.x} y={pos.y + 14} textAnchor="middle" className="text-[7px] fill-current">proj.</text>
            </g>
          )
        })}
      </svg>
      <div className="mt-2 text-xs text-muted-foreground">
        Astuce : cliquez sur un cercle pour accéder à la section correspondante.
      </div>
    </div>
  )
}

export default function ZonesPage() {
  // Lifecycle
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  // Données
  const allEnCours = useMemo(() => (projetsEnCours || []).map((p) => ({ ...p, _statusFlag: 'en' })), [])
  const allTermines = useMemo(() => (projetsTermines || []).map((p) => ({ ...p, _statusFlag: 'out' })), [])
  const allProjects = useMemo(() => [...allEnCours, ...allTermines], [allEnCours, allTermines])

  // Filtres (UI)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all') // all | en | termine | suspendu (usaidNote)
  const [domain, setDomain] = useState('all')
  const [donor, setDonor] = useState('all')
  const [hideEmptyZones, setHideEmptyZones] = useState(false)

  // Options filtres (domaine/donneur normalisés)
  const domainOptions = useMemo(() => {
    const set = new Set()
    allProjects.forEach((p) => extractDomainTokens(getDomain(p)).forEach((d) => set.add(d)))
    return Array.from(set).sort((a, b) => a.localeCompare(b, 'fr', { sensitivity: 'base' }))
  }, [allProjects])

  const donorOptions = useMemo(() => {
    const set = new Set()
    allProjects.forEach((p) => splitMulti(getDonor(p)).forEach((d) => set.add(d)))
    return Array.from(set).sort((a, b) => a.localeCompare(b, 'fr', { sensitivity: 'base' }))
  }, [allProjects])

  const resetFilters = () => {
    setSearch('')
    setStatus('all')
    setDomain('all')
    setDonor('all')
    setHideEmptyZones(false)
  }

  const passesFilters = useCallback(
    (p) => {
      // Statut
      const st = p._statusFlag === 'en' ? 'en' : 'termine'
      if (status !== 'all' && st !== status) return false
      if (status === 'suspendu' && !p.usaidNote) return false

      // Domaine
      if (domain !== 'all') {
        const tokens = extractDomainTokens(getDomain(p)).map(normalize)
        if (!tokens.some((t) => t === normalize(domain))) return false
      }

      // Bailleur
      if (donor !== 'all') {
        const donors = splitMulti(getDonor(p))
        if (!donors.includes(donor)) return false
      }

      // Recherche plein texte
      const hay = normalize(
        `${p.title} ${p.excerpt || ''} ${p.region || ''} ${getDonor(p)} ${getDomain(p)}`
      )
      const needle = normalize(search.trim())
      if (needle && !hay.includes(needle)) return false

      return true
    },
    [status, domain, donor, search]
  )

  // Pré-calcul par zone
  const dataByZone = useMemo(() => {
    const out = {}
    zones.forEach((z) => {
      const full = [
        ...allEnCours.filter((p) => matchesRegion(p.region, z.key)),
        ...allTermines.filter((p) => matchesRegion(p.region, z.key)),
      ]
      const filtered = full.filter(passesFilters)
      out[z.key] = { full, filtered }
    })
    return out
  }, [allEnCours, allTermines, passesFilters])

  // Stats par zone (comptes + ensembles bailleurs/partenaires)
  const zoneStats = useMemo(() => {
    const obj = {}
    zones.forEach((z) => {
      const list = dataByZone[z.key]?.filtered || []
      const donorsSet = new Set()
      const partnersSet = new Set()
      let enCours = 0
      let termines = 0
      let benef = 0

      list.forEach((p) => {
        // status
        if (p._statusFlag === 'en') enCours++
        if (p._statusFlag === 'out') termines++

        // bailleurs (peut contenir plusieurs séparés par / , ; |)
        splitMulti(getDonor(p)).forEach((d) => d && donorsSet.add(d))

        // partenaires (idem si disponible)
        splitMulti(getPartners(p)).forEach((x) => x && partnersSet.add(x))

        // bénéficiaires (garde-fou)
        benef += asBenef(p.beneficiaries)
      })

      obj[z.key] = {
        filteredCount: list.length,
        enCours,
        termines,
        donors: Array.from(donorsSet).sort((a, b) => a.localeCompare(b, 'fr', { sensitivity: 'base' })),
        partners: Array.from(partnersSet).sort((a, b) => a.localeCompare(b, 'fr', { sensitivity: 'base' })),
        benef,
      }
    })
    return obj
  }, [dataByZone])

  const [openZone, setOpenZone] = useState(null)

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-14 md:py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 md:mb-6">
              Zones d’Intervention
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Visualisez nos interventions par région : projets en cours/terminés, bailleurs, partenaires et
              bénéficiaires estimés (avec garde-fou).
            </p>
          </div>
        </div>
      </section>

      {/* Filtres + Mini-map */}
      <section className="pt-2 pb-6 bg-white/60 border-y">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Filtres */}
            <div>
              <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
                <Filter className="h-4 w-4" />
                <span>Filtrer</span>
              </div>
              <div className="grid grid-cols-1 gap-3">
                <div className="relative">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Rechercher (titre, région, bailleur, …)"
                    className="w-full pl-9 pr-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                </div>

                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="en">En cours</option>
                  <option value="termine">Terminés</option>
                  <option value="suspendu">En pause (note USAID)</option>
                </select>

                <select
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="all">Tous domaines</option>
                  {domainOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>

                <select
                  value={donor}
                  onChange={(e) => setDonor(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="all">Tous bailleurs</option>
                  {donorOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>

                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={hideEmptyZones}
                    onChange={(e) => setHideEmptyZones(e.target.checked)}
                  />
                  Masquer les zones sans projet
                </label>

                <button
                  onClick={resetFilters}
                  className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-md border text-sm hover:bg-muted"
                >
                  <RefreshCw className="h-4 w-4" /> Réinitialiser
                </button>
              </div>
            </div>

            {/* Mini-map */}
            <div className="lg:col-span-2">
              <MiniMapZones onSelect={(k) => setOpenZone(k)} zoneStats={zoneStats} />
            </div>
          </div>
        </div>
      </section>

      {/* Listing par zone */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-8">
            {zones
              .filter((z) => (hideEmptyZones ? (zoneStats[z.key]?.filteredCount || 0) > 0 : true))
              .map((z) => {
                const stats = zoneStats[z.key] || {
                  filteredCount: 0,
                  enCours: 0,
                  termines: 0,
                  donors: [],
                  partners: [],
                  benef: 0,
                }
                const open = openZone === z.key
                const projects = dataByZone[z.key]?.filtered || []

                return (
                  <div key={z.key} className="bg-white rounded-xl border shadow-sm">
                    <button
                      className="w-full flex items-center justify-between px-5 py-4"
                      onClick={() => setOpenZone(open ? null : z.key)}
                    >
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-primary" />
                        <div className="text-left">
                          <div className="text-lg font-semibold">{z.label}</div>
                          <div className="text-sm text-muted-foreground">{zoneDescriptions[z.key]}</div>
                        </div>
                      </div>
                      {open ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                    </button>

                    {open && (
                      <div className="px-5 pb-5">
                        {/* Chiffres clés */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-5">
                          <div className="rounded-lg border p-3">
                            <div className="text-xs text-muted-foreground">Projets (filtres)</div>
                            <div className="text-2xl font-semibold">{stats.filteredCount}</div>
                          </div>
                          <div className="rounded-lg border p-3">
                            <div className="text-xs text-muted-foreground">En cours</div>
                            <div className="text-2xl font-semibold">{stats.enCours}</div>
                          </div>
                          <div className="rounded-lg border p-3">
                            <div className="text-xs text-muted-foreground">Terminés</div>
                            <div className="text-2xl font-semibold">{stats.termines}</div>
                          </div>
                          <div className="rounded-lg border p-3">
                            <div className="text-xs text-muted-foreground">Bailleurs</div>
                            <div className="text-2xl font-semibold">{stats.donors.length}</div>
                          </div>
                          <div className="rounded-lg border p-3">
                            <div className="text-xs text-muted-foreground">Partenaires</div>
                            <div className="text-2xl font-semibold">{stats.partners.length}</div>
                          </div>
                          <div className="rounded-lg border p-3">
                            <div className="text-xs text-muted-foreground">Bénéficiaires (estimés)</div>
                            <div className="text-2xl font-semibold">{fmt(stats.benef)}</div>
                          </div>
                        </div>

                        {/* Listes bailleurs & partenaires */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          <div className="bg-white border rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Building2 className="h-4 w-4 text-primary" />
                              <div className="font-medium">Bailleurs dans la région</div>
                              <span className="ml-auto text-xs text-muted-foreground">{stats.donors.length}</span>
                            </div>
                            {stats.donors.length === 0 ? (
                              <p className="text-sm text-muted-foreground">Aucun bailleur trouvé pour les filtres en cours.</p>
                            ) : (
                              <ul className="list-disc pl-5 text-sm space-y-1">
                                {stats.donors.map((d) => (
                                  <li key={d}>{d}</li>
                                ))}
                              </ul>
                            )}
                          </div>

                          <div className="bg-white border rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Handshake className="h-4 w-4 text-primary" />
                              <div className="font-medium">Partenaires d’exécution</div>
                              <span className="ml-auto text-xs text-muted-foreground">{stats.partners.length}</span>
                            </div>
                            {stats.partners.length === 0 ? (
                              <p className="text-sm text-muted-foreground">Aucun partenaire saisi pour ces projets.</p>
                            ) : (
                              <ul className="list-disc pl-5 text-sm space-y-1">
                                {stats.partners.map((p) => (
                                  <li key={p}>{p}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>

                        {/* Liste des projets */}
                        {projects.length === 0 ? (
                          <p className="text-muted-foreground">Aucun projet ne correspond aux filtres.</p>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {projects.map((p, idx) => {
                              const benef = asBenef(p.beneficiaries)
                              const doms = extractDomainTokens(getDomain(p)).join(' • ')
                              const donors = splitMulti(getDonor(p)).join(' • ')
                              return (
                                <article key={idx} className="bg-white rounded-lg border p-4 shadow-sm">
                                  <div className="flex items-center gap-2 mb-3">
                                    {p._statusFlag === 'en' ? (
                                      <>
                                        <Clock className="h-4 w-4 text-amber-600" />
                                        <span className="text-xs font-medium text-amber-700">En cours</span>
                                      </>
                                    ) : (
                                      <>
                                        <CheckCircle className="h-4 w-4 text-emerald-600" />
                                        <span className="text-xs font-medium text-emerald-700">Terminé</span>
                                      </>
                                    )}
                                    {p.usaidNote && (
                                      <span className="ml-auto inline-flex items-center gap-1 text-[11px] text-red-700">
                                        <AlertTriangle className="h-3 w-3" /> Note USAID
                                      </span>
                                    )}
                                  </div>

                                  <h3 className="font-semibold leading-snug mb-1">{p.title}</h3>
                                  {p.excerpt && <p className="text-sm text-muted-foreground mb-3">{p.excerpt}</p>}

                                  <div className="text-xs space-y-1">
                                    <div><span className="text-muted-foreground">Région:</span> {p.region || 'N/D'}</div>
                                    {doms && <div><span className="text-muted-foreground">Domaine:</span> {doms}</div>}
                                    {donors && <div><span className="text-muted-foreground">Bailleur(s):</span> {donors}</div>}
                                    {benef > 0 && (
                                      <div><span className="text-muted-foreground">Bénéficiaires:</span> {fmt(benef)}</div>
                                    )}
                                  </div>
                                </article>
                              )
                            })}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
          </div>
        </div>
      </section>
    </div>
  )
}
