// src/pages/ZonesPage.jsx
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
  MapPin, Users, CheckCircle, Clock, Filter, RefreshCw, Building2,
  Search, AlertTriangle, ChevronDown, ChevronUp, ArrowRight, Handshake
} from 'lucide-react'
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { projetsEnCours, projetsTermines } from '@/data/projetsData'

// ========== Helpers communs ==========
const normalize = (s) =>
  String(s || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()

const fmt = (n) => new Intl.NumberFormat('fr-FR').format(n)

const toNumber = (v) => {
  if (typeof v === 'number' && Number.isFinite(v)) return v
  if (v == null) return 0
  const n = parseFloat(String(v).replace(/[^\d.-]/g, ''))
  return Number.isFinite(n) ? n : 0
}

/** Garde-fou bénéficiaires : 0 si <=0/NaN ou > seuil (par défaut 500k) */
const BENEF_MAX_PER_PROJECT = 500_000
const asBenef = (v) => {
  const n = toNumber(v)
  if (!Number.isFinite(n) || n <= 0) return 0
  return n <= BENEF_MAX_PER_PROJECT ? n : 0
}

// Clés hétérogènes (FR/EN) pour compatibilité de données
const getDomain   = (p) => p?.domain || p?.domaine || p?.sector || p?.secteur || ''
const getDonor    = (p) => p?.donor ?? p?.bailleur ?? p?.bailleurs ?? ''
const getPartners = (p) => p?.partners ?? p?.partenaires ?? ''
const extractDomainTokens = (label) => String(label || '').split(/[,/|;]+/).map(s => s.trim()).filter(Boolean)
const splitMulti = (label) => String(label || '').split(/[\/,;|]+/).map(s => s.trim()).filter(Boolean)

// ========== Zones qu’on suit côté site (8 principales de votre maquette) ==========
const zones = [
  { key: 'tombouctou', label: 'Tombouctou' },
  { key: 'taoudenit',  label: 'Taoudénit' },
  { key: 'gao',        label: 'Gao' },
  { key: 'menaka',     label: 'Ménaka' },
  { key: 'kidal',      label: 'Kidal' },
  { key: 'mopti',      label: 'Mopti' },
  { key: 'segou',      label: 'Ségou' },
  { key: 'sikasso',    label: 'Sikasso' },
]

// Descriptions brèves (optionnel, pour l’en-tête des sections)
const zoneDescriptions = {
  tombouctou: 'Grande région sahélienne ; interventions gouvernance, éducation, sécurité alimentaire.',
  taoudenit:  'Nouvelle région du Nord ; priorités WASH, nutrition, protection.',
  gao:        'Relèvement, cohésion sociale, services sociaux de base.',
  menaka:     'Déplacements, services essentiels et moyens d’existence.',
  kidal:      'Interventions ciblées en contexte contraint.',
  mopti:      'Stabilisation et services essentiels au Centre.',
  segou:      'Développement local, gouvernance, éducation et santé.',
  sikasso:    'Sécurité alimentaire et relance économique.',
}

// Alias texte pour rattacher un projet à une zone (en se basant sur p.region)
const aliases = {
  tombouctou: ['tombouctou','timbuktu','diré','dire','goundam','niafunké','niafunke','gourma'],
  taoudenit:  ['taoudénit','taoudenit'],
  gao:        ['gao','ansongo','bourem'],
  kidal:      ['kidal','tessalit','abéibara','abeibara'],
  menaka:     ['ménaka','menaka'],
  mopti:      ['mopti','bankass','bandiagara','djenné','djene','douentza','tenenkou','ténénkou','koro'],
  segou:      ['ségou','segou','san'],
  sikasso:    ['sikasso','koutiala','bougouni','yanfolila','kolondiéba','kolondieba'],
}
const matchesRegion = (regionField, zoneKey) => {
  const hay = normalize(regionField)
  if (!hay) return false
  return (aliases[zoneKey] || []).some((t) => hay.includes(normalize(t)))
}

// ========== UI sous-composants ==========
function ChipsZones({ onClick }) {
  return (
    <div className="flex flex-wrap gap-2 items-center justify-start">
      {zones.map((z) => (
        <button
          key={z.key}
          onClick={() => onClick?.(z.key)}
          className="px-3 py-1.5 rounded-full border bg-white hover:bg-muted text-sm"
        >
          {z.label}
        </button>
      ))}
    </div>
  )
}

// ========== Page ==========
export default function ZonesPage() {
  useEffect(() => window.scrollTo({ top: 0, behavior: 'auto' }), [])

  // Données normalisées
  const allEnCours = useMemo(() => (projetsEnCours || []).map((p) => ({ ...p, _statusFlag: 'en' })), [])
  const allTermines = useMemo(() => (projetsTermines || []).map((p) => ({ ...p, _statusFlag: 'out' })), [])
  const allProjects = useMemo(() => [...allEnCours, ...allTermines], [allEnCours, allTermines])

  // Filtres
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all') // all | en | termine | suspendu
  const [domain, setDomain] = useState('all')
  const [donor, setDonor] = useState('all')
  const [hideEmptyZones, setHideEmptyZones] = useState(false)
  const resetFilters = () => { setSearch(''); setStatus('all'); setDomain('all'); setDonor('all'); setHideEmptyZones(false) }

  // Options filtres
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
      const hay = normalize(`${p.title} ${p.excerpt || ''} ${p.region || ''} ${getDonor(p)} ${getDomain(p)}`)
      const needle = normalize(search.trim())
      if (needle && !hay.includes(needle)) return false

      return true
    },
    [status, domain, donor, search]
  )

  // Regroupement par zone
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

  // Stats (projets, bailleurs, partenaires, bénéficiaires)
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
        if (p._statusFlag === 'en') enCours++
        if (p._statusFlag === 'out') termines++
        splitMulti(getDonor(p)).forEach((d) => d && donorsSet.add(d))
        splitMulti(getPartners(p)).forEach((x) => x && partnersSet.add(x))
        benef += asBenef(p.beneficiaries)
      })

      obj[z.key] = {
        filteredCount: list.length,
        enCours,
        termines,
        benef,
        donors: Array.from(donorsSet).sort((a, b) => a.localeCompare(b, 'fr', { sensitivity: 'base' })),
        partners: Array.from(partnersSet).sort((a, b) => a.localeCompare(b, 'fr', { sensitivity: 'base' })),
      }
    })
    return obj
  }, [dataByZone])

  // --- Carte : chargement GeoJSON des régions du Mali (ADM1) ---
  const [adm1Geojson, setAdm1Geojson] = useState(null)
  const [mapError, setMapError] = useState(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        // 1) On récupère les métadonnées (API geoBoundaries) pour obtenir l’URL GeoJSON
        //    Si cette requête échoue, on tentera un fallback local.
        const metaResp = await fetch('https://www.geoboundaries.org/api/current/gbOpen/MLI/ADM1', { mode: 'cors' })
        const meta = await metaResp.json()
        const gjUrl = meta?.gjDownloadURL || (Array.isArray(meta) ? meta.find(m => m?.gjDownloadURL)?.gjDownloadURL : null)
        if (!gjUrl) throw new Error('Aucune URL GeoJSON trouvée.')
        // 2) On télécharge le GeoJSON
        const gjResp = await fetch(gjUrl, { mode: 'cors' })
        const gj = await gjResp.json()
        if (!cancelled) setAdm1Geojson(gj)
      } catch (e) {
        console.warn('geoBoundaries fetch error, tentative fallback local:', e)
        setMapError('Impossible de charger les polygones en ligne, tentative locale…')
        // Fallback local (placez un fichier à src/data/mali_adm1.geojson si besoin)
        try {
          const local = await fetch('/data/mali_adm1.geojson')
          const gj = await local.json()
          if (!cancelled) setAdm1Geojson(gj)
        } catch (e2) {
          if (!cancelled) setMapError('Échec du chargement des polygones ADM1.')
        }
      }
    })()
    return () => { cancelled = true }
  }, [])

  // Mapping nom de région → key utilisée sur le site
  const nameToKey = useMemo(() => ({
    'tombouctou': 'tombouctou',
    'taoudenit':  'taoudenit',
    'gao':        'gao',
    'menaka':     'menaka',
    'kidal':      'kidal',
    'mopti':      'mopti',
    'segou':      'segou',
    'sikasso':    'sikasso',
  }), [])

  const featureToZoneKey = (feature) => {
    const props = feature?.properties || {}
    const raw =
      props.shapeName || props.Shape_Name || props.NAME_1 || props.name || props['shapeName'] || ''
    const key = nameToKey[normalize(raw)]
    return key || null // on ignore Kayes, Koulikoro, Bamako si présents
  }

  // Clic sur polygone -> ouvrir/fermer la section de la zone
  const [openZone, setOpenZone] = useState(null)
  const focusZone = (key) => {
    setOpenZone((prev) => (prev === key ? null : key))
    const el = document.getElementById(`zone-${key}`)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // Style des polygones selon présence de projets (intensité) + surbrillance si ouvert
  const regionStyle = (feature) => {
    const key = featureToZoneKey(feature)
    const count = key ? (zoneStats[key]?.filteredCount || 0) : 0
    const opened = key && openZone === key
    const baseFill = opened ? 0.65 : Math.min(0.15 + count * 0.05, 0.5)
    return {
      color: opened ? '#7f1d1d' : '#991b1b',
      weight: opened ? 2 : 1,
      fillColor: '#dc2626',
      fillOpacity: baseFill,
    }
  }

  const onEachRegion = (feature, layer) => {
    const key = featureToZoneKey(feature)
    if (!key) return
    const zLabel = zones.find((z) => z.key === key)?.label || key
    const count = zoneStats[key]?.filteredCount || 0
    layer.bindTooltip(`${zLabel} — ${count} projet(s)`, { sticky: true })
    layer.on('click', () => focusZone(key))
    layer.on('mouseover', () => layer.setStyle({ weight: 2 }))
    layer.on('mouseout', () => layer.setStyle({ weight: openZone === key ? 2 : 1 }))
  }

  return (
    <div className="min-h-screen bg-background" id="top">
      {/* HERO */}
      <section className="py-12 md:py-16 bg-[rgba(200,100,80,0.07)]">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold">Zones d’Intervention</h1>
            <p className="mt-3 text-muted-foreground">
              Carte interactive des régions (polygones). Cliquez une région pour afficher/masquer les projets,
              bailleurs et partenaires correspondants. Affinez avec les filtres.
            </p>
          </div>

          {/* Raccourcis chips */}
          <div className="max-w-5xl mx-auto mt-6 flex flex-wrap gap-2 justify-center">
            <ChipsZones onClick={focusZone} />
          </div>
        </div>
      </section>

      {/* Filtres + Carte */}
      <section className="pt-3 pb-6">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Filtres */}
            <div className="rounded-xl border bg-white p-4">
              <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
                <Filter className="h-4 w-4" />
                <span>Filtrer les projets affichés</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="relative md:col-span-2">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Titre, zone, bailleur, mot-clé…"
                    className="w-full pl-9 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                </div>

                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="en">En cours</option>
                  <option value="termine">Terminés</option>
                  <option value="suspendu">En pause (note USAID)</option>
                </select>

                <select
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="all">Tous domaines</option>
                  {domainOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>

                <select
                  value={donor}
                  onChange={(e) => setDonor(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="all">Tous bailleurs</option>
                  {donorOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>

                <div className="flex items-center justify-between md:col-span-2">
                  <label className="text-sm flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={hideEmptyZones}
                      onChange={(e) => setHideEmptyZones(e.target.checked)}
                    />
                    Masquer les zones sans résultats
                  </label>

                  <button
                    onClick={resetFilters}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-md border text-sm hover:bg-muted"
                  >
                    <RefreshCw className="h-4 w-4" /> Réinitialiser
                  </button>
                </div>
              </div>
            </div>

            {/* Carte GeoJSON (polygones régions) */}
            <div className="rounded-xl border bg-white p-3">
              <div className="text-sm text-muted-foreground mb-2">Carte interactive (polygones des régions)</div>
              <div className="h-[420px] w-full overflow-hidden rounded-lg">
                <MapContainer
                  center={[17, -3]} zoom={5} minZoom={4} maxZoom={12}
                  style={{ height: '100%', width: '100%' }}
                  zoomControl={true}
                  scrollWheelZoom={true}
                >
                  <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {adm1Geojson && (
                    <GeoJSON
                      key="adm1"
                      data={adm1Geojson}
                      style={regionStyle}
                      onEachFeature={onEachRegion}
                    />
                  )}
                </MapContainer>
              </div>
              {mapError && <p className="mt-2 text-xs text-red-600">{mapError}</p>}
              {!adm1Geojson && !mapError && (
                <p className="mt-2 text-xs text-muted-foreground">Chargement des polygones…</p>
              )}
              <p className="mt-2 text-xs text-muted-foreground">
                Astuce : cliquez sur une région pour ouvrir/fermer sa section.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sections par zone (dérouler/plier) */}
      <section className="pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-8">
            {zones
              .filter((z) => (hideEmptyZones ? (zoneStats[z.key]?.filteredCount || 0) > 0 : true))
              .map((z, idx) => {
                const stats = zoneStats[z.key] || {
                  filteredCount: 0, enCours: 0, termines: 0, donors: [], partners: [], benef: 0,
                }
                const projects = dataByZone[z.key]?.filtered || []
                const isOpen = openZone ? openZone === z.key : idx === 0 // ouvrir la 1re par défaut

                return (
                  <div key={z.key} id={`zone-${z.key}`} className="bg-white rounded-xl border shadow-sm">
                    {/* En-tête */}
                    <button
                      className="w-full flex items-center justify-between px-5 py-4"
                      onClick={() => setOpenZone(isOpen ? null : z.key)}
                    >
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-primary" />
                        <div className="text-left">
                          <div className="text-lg font-semibold">{z.label}</div>
                          <div className="text-sm text-muted-foreground">
                            {zoneDescriptions[z.key] || 'Projets correspondant aux filtres.'}
                          </div>
                        </div>
                      </div>
                      {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                    </button>

                    {/* Contenu */}
                    {isOpen && (
                      <div className="px-5 pb-5">
                        {/* Métriques */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-4">
                          <div className="rounded-xl bg-white border p-4">
                            <div className="text-xs text-muted-foreground">Projets</div>
                            <div className="text-2xl font-semibold">{stats.filteredCount}</div>
                          </div>
                          <div className="rounded-xl bg-white border p-4">
                            <div className="text-xs text-muted-foreground">En cours</div>
                            <div className="text-2xl font-semibold">{stats.enCours}</div>
                          </div>
                          <div className="rounded-xl bg-white border p-4">
                            <div className="text-xs text-muted-foreground">Terminés</div>
                            <div className="text-2xl font-semibold">{stats.termines}</div>
                          </div>
                          <div className="rounded-xl bg-white border p-4">
                            <div className="text-xs text-muted-foreground">Bailleurs</div>
                            <div className="text-2xl font-semibold">{stats.donors.length}</div>
                          </div>
                          <div className="rounded-xl bg-white border p-4">
                            <div className="text-xs text-muted-foreground">Bénéficiaires (≈)</div>
                            <div className="text-2xl font-semibold">{fmt(stats.benef)}</div>
                          </div>
                        </div>

                        {/* Bailleurs & partenaires (déroulables) */}
                        <details className="mb-5 rounded-xl border bg-white p-4">
                          <summary className="cursor-pointer font-medium">Bailleurs & partenaires</summary>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                            <div>
                              <div className="flex items-center gap-2 mb-1 text-sm font-medium">
                                <Building2 className="h-4 w-4 text-primary" />
                                Bailleurs ({stats.donors.length})
                              </div>
                              {stats.donors.length ? (
                                <ul className="list-disc pl-5 text-sm space-y-1">
                                  {stats.donors.map((d) => <li key={d}>{d}</li>)}
                                </ul>
                              ) : (
                                <p className="text-sm text-muted-foreground">Aucun bailleur trouvé.</p>
                              )}
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1 text-sm font-medium">
                                <Handshake className="h-4 w-4 text-primary" />
                                Partenaires ({stats.partners.length})
                              </div>
                              {stats.partners.length ? (
                                <ul className="list-disc pl-5 text-sm space-y-1">
                                  {stats.partners.map((p) => <li key={p}>{p}</li>)}
                                </ul>
                              ) : (
                                <p className="text-sm text-muted-foreground">Aucun partenaire saisi.</p>
                              )}
                            </div>
                          </div>
                        </details>

                        {/* Liste des projets */}
                        {projects.length === 0 ? (
                          <p className="text-muted-foreground">Aucun projet ne correspond aux filtres.</p>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {projects.map((p, idxP) => {
                              const b = asBenef(p.beneficiaries)
                              const donors = splitMulti(getDonor(p)).join(' • ')
                              const domains = extractDomainTokens(getDomain(p)).join(' • ')
                              return (
                                <article key={idxP} className="bg-white rounded-lg border p-4">
                                  <div className="flex items-center gap-2 mb-2">
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

                                  <h3 className="font-semibold leading-snug">{p.title}</h3>
                                  {p.excerpt && <p className="text-sm text-muted-foreground mb-2">{p.excerpt}</p>}
                                  <div className="text-xs space-y-1">
                                    <div><span className="text-muted-foreground">Région :</span> {p.region || 'N/D'}</div>
                                    {domains && <div><span className="text-muted-foreground">Domaine :</span> {domains}</div>}
                                    {donors && <div><span className="text-muted-foreground">Bailleur(s) :</span> {donors}</div>}
                                    {b > 0 && (
                                      <div className="inline-flex items-center gap-1">
                                        <Users className="h-3 w-3" />
                                        {b.toLocaleString('fr-FR')} bénéficiaires
                                      </div>
                                    )}
                                  </div>
                                </article>
                             
