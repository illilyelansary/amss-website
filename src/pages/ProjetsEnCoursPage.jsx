// src/pages/ProjetsEnCoursPage.jsx
import React, { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Clock, Filter, Search, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { projetsEnCours } from '@/data/projetsData'

if (import.meta.env.DEV) {
  // eslint-disable-next-line no-console
  console.log('projetsEnCours:', projetsEnCours?.length)
}

// --- Helpers ---
const norm = (s) =>
  String(s || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()

const splitDomains = (label) =>
  String(label || '')
    .split(/[,/|;]+/)
    .map((s) => s.trim())
    .filter(Boolean)

const splitRegions = (label) =>
  String(label || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)

const splitDonors = (label) =>
  String(label || '')
    .split(/[\/,;|]+/)
    .map((s) => s.trim())
    .filter(Boolean)

const toNumber = (v) => {
  if (typeof v === 'number' && Number.isFinite(v)) return v
  if (v == null) return 0
  const n = parseFloat(String(v).replace(/[^\d.-]/g, ''))
  return Number.isFinite(n) ? n : 0
}

// Essaie d’estimer les communes à partir du champ `region` (approximatif).
const extractCommunes = (regionStr) => {
  if (!regionStr) return { names: [], countHint: 0 }
  const s = String(regionStr)
  const mCount = s.match(/(\d+)\s*commune/i)
  const countHint = mCount ? Number(mCount[1]) : 0
  const inside = s.match(/\(([^)]+)\)/)?.[1] || ''
  const listFromParentheses = inside
    ? inside.split(/[,&/;]| et /i).map((t) => t.trim()).filter(Boolean)
    : []
  const fallbackList = !listFromParentheses.length
    ? s.split(/[,&/;]| et /i).map((t) => t.trim()).filter(Boolean)
    : []
  const ignoreRe =
    /(région|national|nord|centre|sahel|mali|cercle|commune|vill(e|age)|arrondissement|département)/i
  const knownRegionsRe =
    /(tombouctou|gao|ménaka|menaka|kidal|mopti|ségou|segou|koulikoro|bamako|diré|dire|goundam|niafunké|niafunke|gourma[- ]rharous|ansongo|sikasso|san)/i
  const keep = (t) => t && !ignoreRe.test(t) && /[A-ZÀ-ÖØ-Ý]/.test(t[0]) && t.length > 2
  const names = new Set(
    (listFromParentheses.length ? listFromParentheses : fallbackList)
      .map((v) => v.replace(/\b(Région de|Cercle de|Commune de|Commune|Région|Cercle)\b\s*/i, ''))
      .map((v) => v.replace(/^\d+\s*communes?$/i, ''))
      .map((v) => v.trim())
      .filter(keep)
      .filter((v) => !knownRegionsRe.test(v))
  )
  return { names: Array.from(names), countHint }
}

export default function ProjetsEnCoursPage() {
  const { hash, search } = useLocation()
  const params = new URLSearchParams(search)

  // Normalisation des projets (domain/donor)
  const items = useMemo(() => {
    const normalize = (p) => ({
      ...p,
      _domain: p.domain || p.domaine || p.sector || p.secteur || '',
      donor: p.donor ?? p.bailleur ?? p.bailleurs ?? '',
      _status: 'En cours',
    })
    return (projetsEnCours || []).map(normalize)
  }, [])

  // Options filtres
  const domainOptions = useMemo(() => {
    const set = new Set()
    items.forEach((p) => splitDomains(p._domain).forEach((d) => set.add(d)))
    return ['Tous', ...Array.from(set).sort((a, b) => a.localeCompare(b))]
  }, [items])

  const regionOptions = useMemo(() => {
    const set = new Set()
    items.forEach((p) => splitRegions(p.region).forEach((r) => set.add(r)))
    return ['Toutes', ...Array.from(set).sort((a, b) => a.localeCompare(b))]
  }, [items])

  const donorOptions = useMemo(() => {
    const set = new Set()
    items.forEach((p) => splitDonors(p.donor).forEach((d) => set.add(d)))
    return ['Tous', ...Array.from(set).sort((a, b) => a.localeCompare(b))]
  }, [items])

  // État filtres (prefill via URL)
  const [searchTerm, setSearchTerm] = useState(params.get('q') || '')
  const [selectedDomain, setSelectedDomain] = useState(params.get('domain') || 'Tous')
  const [selectedRegion, setSelectedRegion] = useState(params.get('region') || 'Toutes')
  const [selectedDonor, setSelectedDonor] = useState(params.get('donor') || 'Tous')
  const [usaidOnly, setUsaidOnly] = useState(params.get('usaid') === '1')

  // Sync si URL change
  useEffect(() => {
    const p = new URLSearchParams(search)
    const urlDomain = p.get('domain') || 'Tous'
    const urlQ = p.get('q') || ''
    const urlRegion = p.get('region') || 'Toutes'
    const urlDonor = p.get('donor') || 'Tous'
    const urlUsaid = p.get('usaid') === '1'
    if (urlDomain !== selectedDomain) setSelectedDomain(urlDomain)
    if (urlQ !== searchTerm) setSearchTerm(urlQ)
    if (urlRegion !== selectedRegion) setSelectedRegion(urlRegion)
    if (urlDonor !== selectedDonor) setSelectedDonor(urlDonor)
    if (urlUsaid !== usaidOnly) setUsaidOnly(urlUsaid)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  // Scroll vers ancre
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }
    const id = hash.replace('#', '')
    const el = document.getElementById(id)
    if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
  }, [hash])

  // Filtres
  const filtered = useMemo(() => {
    const q = norm(searchTerm)
    return items.filter((p) => {
      const hay = norm(`${p.title} ${p.excerpt || ''} ${p.donor || ''} ${p.region || ''} ${p._domain || ''}`)
      const matchSearch = q === '' || hay.includes(q)
      const matchDomain = selectedDomain === 'Tous' || splitDomains(p._domain).map(norm).includes(norm(selectedDomain))
      const matchRegion = selectedRegion === 'Toutes' || splitRegions(p.region).includes(selectedRegion)
      const matchDonor = selectedDonor === 'Tous' || splitDonors(p.donor).includes(selectedDonor)
      const matchUsaid = !usaidOnly || Boolean(p.usaidNote)
      return matchSearch && matchDomain && matchRegion && matchDonor && matchUsaid
    })
  }, [items, searchTerm, selectedDomain, selectedRegion, selectedDonor, usaidOnly])

  // Compteurs
  const counters = useMemo(() => {
    const totalBenef = filtered.reduce((acc, p) => acc + toNumber(p.beneficiaries), 0)
    const communesSet = new Set()
    let communesNumeric = 0
    filtered.forEach((p) => {
      const { names, countHint } = extractCommunes(p.region)
      names.forEach((n) => communesSet.add(n.toLowerCase()))
      communesNumeric += Number(countHint || 0)
    })
    return {
      nb: filtered.length,
      totalBenef: new Intl.NumberFormat('fr-FR').format(totalBenef),
      totalCommunes: new Intl.NumberFormat('fr-FR').format(communesSet.size + communesNumeric),
    }
  }, [filtered])

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-14 md:py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 md:mb-6">Projets en Cours</h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Liste des projets actuellement en mise en œuvre.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mt-8">
              <div className="rounded-2xl bg-white p-5 shadow-sm border">
                <div className="text-sm text-muted-foreground">Nombre de projets</div>
                <div className="text-3xl font-semibold mt-1">{counters.nb}</div>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border">
                <div className="text-sm text-muted-foreground">Bénéficiaires (cumulés)</div>
                <div className="text-3xl font-semibold mt-1">{counters.totalBenef}</div>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border">
                <div className="text-sm text-muted-foreground">Communes (≈)</div>
                <div className="text-3xl font-semibold mt-1">{counters.totalCommunes}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filtres */}
      <section className="pt-2 pb-6 bg-white/60 border-y">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
              <Filter className="h-4 w-4" />
              <span>Filtrer les projets</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              <div className="relative md:col-span-2">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Rechercher (titre, région, bailleur, …)"
                  className="w-full pl-9 pr-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              </div>

              <select
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                {domainOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>

              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                {regionOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>

              <select
                value={selectedDonor}
                onChange={(e) => setSelectedDonor(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                {donorOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>

              <label className="flex items-center gap-2 text-sm md:col-span-2">
                <input
                  type="checkbox"
                  checked={usaidOnly}
                  onChange={(e) => setUsaidOnly(e.target.checked)}
                  className="rounded border-border"
                />
                USAID uniquement
              </label>
            </div>
          </div>
        </div>
      </section>

      {/* Liste */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {filtered.length === 0 ? (
              <p className="text-muted-foreground">Aucun projet ne correspond aux filtres.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((p, index) => (
                  <article key={index} className="bg-white rounded-xl p-6 shadow-sm border border-border">
                    <div className="flex items-center mb-4">
                      <div className={`w-3 h-3 rounded-full mr-2 ${p.usaidNote ? 'bg-red-500' : 'bg-green-500'}`} />
                      <span className={`text-sm font-medium ${p.usaidNote ? 'text-red-600' : 'text-green-600'}`}>
                        {p.status || 'En cours'}
                      </span>
                      {p.usaidNote && (
                        <span className="ml-2 inline-flex items-center px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-700 border border-red-200">
                          Suspendu (USAID)
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-semibold text-foreground mb-3">{p.title}</h3>
                    {p.excerpt && <p className="text-muted-foreground text-sm mb-4">{p.excerpt}</p>}

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Région :</span>
                        <span className="font-medium text-right">{p.region || 'N/D'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Bailleur :</span>
                        <span className="font-medium text-right">{p.donor || 'N/D'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Domaine :</span>
                        <span className="font-medium text-right">{p._domain || 'N/D'}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            <div className="text-center mt-10">
              <Link to="/projets" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <Button variant="outline" className="inline-flex items-center">
                  Voir la page “Nos Projets”
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
