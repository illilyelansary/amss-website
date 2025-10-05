// src/pages/ProjetsTerminesPage.jsx
import React, { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CheckCircle, Filter, Search, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { projetsTermines } from '@/data/projetsData'

if (import.meta.env.DEV) {
  // eslint-disable-next-line no-console
  console.log('projetsTermines:', projetsTermines?.length)
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

const safeYear = (value) => {
  if (!value) return 'N/D'
  const y = new Date(value)
  return Number.isNaN(y.getTime()) ? 'N/D' : y.getFullYear()
}

export default function ProjetsTerminesPage() {
  const { hash, search } = useLocation()
  const params = new URLSearchParams(search)

  // Normalisation des projets (domain/donor)
  const items = useMemo(() => {
    const normalize = (p) => ({
      ...p,
      _domain: p.domain || p.domaine || p.sector || p.secteur || '',
      donor: p.donor ?? p.bailleur ?? p.bailleurs ?? '',
      _status: 'Terminé',
    })
    return (projetsTermines || []).map(normalize)
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

  // Sync si URL change
  useEffect(() => {
    const p = new URLSearchParams(search)
    const urlDomain = p.get('domain') || 'Tous'
    const urlQ = p.get('q') || ''
    const urlRegion = p.get('region') || 'Toutes'
    const urlDonor = p.get('donor') || 'Tous'
    if (urlDomain !== selectedDomain) setSelectedDomain(urlDomain)
    if (urlQ !== searchTerm) setSearchTerm(urlQ)
    if (urlRegion !== selectedRegion) setSelectedRegion(urlRegion)
    if (urlDonor !== selectedDonor) setSelectedDonor(urlDonor)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  // Scroll vers ancre
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }
    const id = hash.replace('#', '')
    ancreScroll(id)
  }, [hash])

  const ancreScroll = (id) => {
    const el = document.getElementById(id)
    if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
  }

  // Filtres
  const filtered = useMemo(() => {
    const q = norm(searchTerm)
    return items.filter((p) => {
      const hay = norm(`${p.title} ${p.excerpt || ''} ${p.donor || ''} ${p.region || ''} ${p._domain || ''}`)
      const matchSearch = q === '' || hay.includes(q)
      const matchDomain = selectedDomain === 'Tous' || splitDomains(p._domain).map(norm).includes(norm(selectedDomain))
      const matchRegion = selectedRegion === 'Toutes' || splitRegions(p.region).includes(selectedRegion)
      const matchDonor = selectedDonor === 'Tous' || splitDonors(p.donor).includes(selectedDonor)
      return matchSearch && matchDomain && matchRegion && matchDonor
    })
  }, [items, searchTerm, selectedDomain, selectedRegion, selectedDonor])

  // Compteurs
  const counters = useMemo(() => {
    const totalBenef = filtered.reduce((acc, p) => acc + toNumber(p.beneficiaries), 0)
    return {
      nb: filtered.length,
      totalBenef: new Intl.NumberFormat('fr-FR').format(totalBenef),
    }
  }, [filtered])

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-14 md:py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 md:mb-6">Projets Terminés</h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Réalisations finalisées et clôturées par l’AMSS.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mt-8">
              <div className="rounded-2xl bg-white p-5 shadow-sm border">
                <div className="text-sm text-muted-foreground">Nombre de projets</div>
                <div className="text-3xl font-semibold mt-1">{counters.nb}</div>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border">
                <div className="text-sm text-muted-foreground">Bénéficiaires (cumulés)</div>
                <div className="text-3xl font-semibold mt-1">{counters.totalBenef}</div>
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
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-2" />
                      <span className="text-sm font-medium text-blue-600">Terminé</span>
                    </div>

                    <h3 className="text-lg font-semibold text-foreground mb-3">{p.title}</h3>
                    {p.excerpt && <p className="text-muted-foreground text-sm mb-4">{p.excerpt}</p>}

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Région :</span>
                        <span className="font-medium text-right">{p.region || 'N/D'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Période :</span>
                        <span className="font-medium text-right">
                          {safeYear(p.startDate)}–{safeYear(p.endDate)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Bailleur :</span>
                        <span className="font-medium text-right">
                          {p.donor || 'N/D'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Bénéficiaires :</span>
                        <span className="font-medium text-right">
                          {toNumber(p.beneficiaries).toLocaleString('fr-FR')}
                        </span>
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
