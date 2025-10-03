// src/pages/ProjetsPage.jsx
import React, { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Clock, CheckCircle, FileText, ArrowRight, Handshake, Filter, Search, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { projetsEnCours, projetsTermines, rapports } from '../data/projetsData'

if (import.meta.env.DEV) {
  // eslint-disable-next-line no-console
  console.log('projetsEnCours:', projetsEnCours?.length, 'projetsTermines:', projetsTermines?.length)
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

const safeYear = (value) => {
  if (!value) return 'N/D'
  const y = new Date(value)
  return Number.isNaN(y.getTime()) ? 'N/D' : y.getFullYear()
}

// Parse “bénéficiaires” en nombre, sinon 0 (évite NaN)
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

export default function ProjetsPage() {
  const { hash, search } = useLocation()

  // ===== Synchronisation filtres ←→ URL (prefill via ?domain= & ?q= & ?region= & ?donor= & ?status= & ?usaid=1) =====
  const params = new URLSearchParams(search)

  // ========= Données & listes pour filtres =========
  const allProjects = useMemo(() => {
    const encours = (projetsEnCours || []).map((p) => ({ ...p, _status: 'En cours' }))
    const termines = (projetsTermines || []).map((p) => ({ ...p, _status: 'Terminé' }))
    return [...encours, ...termines]
  }, [])

  const domainOptions = useMemo(() => {
    const set = new Set()
    allProjects.forEach((p) => splitDomains(p.domain).forEach((d) => set.add(d)))
    return ['Tous', ...Array.from(set).sort((a, b) => a.localeCompare(b))]
  }, [allProjects])

  const regionOptions = useMemo(() => {
    const set = new Set()
    allProjects.forEach((p) => splitRegions(p.region).forEach((r) => set.add(r)))
    return ['Toutes', ...Array.from(set).sort((a, b) => a.localeCompare(b))]
  }, [allProjects])

  const donorOptions = useMemo(() => {
    const set = new Set()
    allProjects.forEach((p) =>
      String(p.donor || '')
        .split('/')
        .map((s) => s.trim())
        .filter(Boolean)
        .forEach((d) => set.add(d))
    )
    return ['Tous', ...Array.from(set).sort((a, b) => a.localeCompare(b))]
  }, [allProjects])

  // ========= État des filtres (initialisé depuis l'URL) =========
  const [searchTerm, setSearchTerm] = useState(params.get('q') || '')
  const [selectedDomain, setSelectedDomain] = useState(params.get('domain') || 'Tous')
  const [selectedRegion, setSelectedRegion] = useState(params.get('region') || 'Toutes')
  const [selectedDonor, setSelectedDonor] = useState(params.get('donor') || 'Tous')
  const [statusScope, setStatusScope] = useState(params.get('status') || 'Tous') // 'Tous' | 'En cours' | 'Terminé'
  const [usaidOnly, setUsaidOnly] = useState(params.get('usaid') === '1')

  // Met à jour l'état si l'URL change (navigations internes)
  useEffect(() => {
    const p = new URLSearchParams(search)
    const urlDomain = p.get('domain') || 'Tous'
    const urlQ = p.get('q') || ''
    const urlRegion = p.get('region') || 'Toutes'
    const urlDonor = p.get('donor') || 'Tous'
    const urlStatus = p.get('status') || 'Tous'
    const urlUsaid = p.get('usaid') === '1'

    if (urlDomain !== selectedDomain) setSelectedDomain(urlDomain)
    if (urlQ !== searchTerm) setSearchTerm(urlQ)
    if (urlRegion !== selectedRegion) setSelectedRegion(urlRegion)
    if (urlDonor !== selectedDonor) setSelectedDonor(urlDonor)
    if (urlStatus !== statusScope) setStatusScope(urlStatus)
    if (urlUsaid !== usaidOnly) setUsaidOnly(urlUsaid)
  }, [search])

  // Scroll initial + au changement de hash
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }
    const id = hash.replace('#', '')
    const el = document.getElementById(id)
    if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
  }, [hash])

  // ========= Application des filtres =========
  const filteredAll = useMemo(() => {
    const q = norm(searchTerm)
    return allProjects.filter((p) => {
      const hay = norm(
        `${p.title} ${p.excerpt || ''} ${p.donor || ''} ${p.region || ''} ${p.domain || ''}`
      )
      const matchSearch = q === '' || hay.includes(q)

      const partsDomain = splitDomains(p.domain).map(norm)
      const matchDomain = selectedDomain === 'Tous' || partsDomain.includes(norm(selectedDomain))

      const partsRegion = splitRegions(p.region)
      const matchRegion = selectedRegion === 'Toutes' || partsRegion.includes(selectedRegion)

      const partsDonor = String(p.donor || '')
        .split('/')
        .map((s) => s.trim())
        .filter(Boolean)
      const matchDonor = selectedDonor === 'Tous' || partsDonor.includes(selectedDonor)

      const matchStatus = statusScope === 'Tous' || p._status === statusScope
      const matchUsaid = !usaidOnly || Boolean(p.usaidNote)

      return matchSearch && matchDomain && matchRegion && matchDonor && matchStatus && matchUsaid
    })
  }, [allProjects, searchTerm, selectedDomain, selectedRegion, selectedDonor, statusScope, usaidOnly])

  const enCoursFiltered = filteredAll.filter((p) => p._status === 'En cours')
  const terminesFiltered = filteredAll.filter((p) => p._status === 'Terminé')

  // --- Compteurs dynamiques (EN COURS filtrés) ---
  const counters = useMemo(() => {
    const totalBenef = enCoursFiltered.reduce((acc, p) => acc + toNumber(p.beneficiaries), 0)
    const communesSet = new Set()
    let communesNumeric = 0
    enCoursFiltered.forEach((p) => {
      const { names, countHint } = extractCommunes(p.region)
      names.forEach((n) => communesSet.add(n.toLowerCase()))
      communesNumeric += Number(countHint || 0)
    })
    const totalCommunes = communesSet.size + communesNumeric
    const nbEnCours = enCoursFiltered.length
    const nbSuspendusUSAID = enCoursFiltered.filter((p) => p.usaidNote === true).length

    return {
      totalBenef: new Intl.NumberFormat('fr-FR').format(totalBenef),
      totalCommunes: new Intl.NumberFormat('fr-FR').format(totalCommunes),
      nbEnCours,
      nbSuspendusUSAID,
    }
  }, [enCoursFiltered])

  const partenairesInstitutionnels = [
    'Gouvernement du Mali (ministères, collectivités territoriales)',
    'UNHCR (HCR)',
    'UNICEF',
    'UNFPA',
    'OCHA',
  ]
  const partenairesInternationaux = [
    'USAID',
    'FHI 360',
    'Save the Children',
    'World Vision',
    'Fondation Stromme',
    'EUMC (WUSC)',
    'DDC (Coopération Suisse)',
    'WHH',
    'CRS',
    'Union Européenne',
    'Ambassade des Pays-Bas',
    'PNUD',
    'PAM',
    'FBA',
    'Oxfam',
    'HI',
    'Action Contre la Faim',
    'CARE',
    'DRC',
    'IRC',
    'MSF',
    'Fonds Humanitaire Mali',
  ]
  const partenairesNationaux = ['PONAH', 'CAEB', 'FONGIM', 'EDUCO', 'ADEFIM', 'THINK PEACE', 'FEMAPH', 'ARGA']

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-14 md:py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 md:mb-6">Nos Projets et Réalisations</h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Découvrez nos projets en cours, nos réalisations passées, nos rapports et nos partenaires.
            </p>

            {/* Stats clés (EN COURS filtrés) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-8">
              <div className="rounded-2xl bg-white p-5 shadow-sm border">
                <div className="text-sm text-muted-foreground">Bénéficiaires (projets en cours)</div>
                <div className="text-3xl font-semibold mt-1">{counters.totalBenef}</div>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border">
                <div className="text-sm text-muted-foreground">Communes couvertes (≈)</div>
                <div className="text-3xl font-semibold mt-1">{counters.totalCommunes}</div>
                <div className="text-xs text-muted-foreground mt-1">Estimation basée sur “Région”</div>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border">
                <div className="text-sm text-muted-foreground">Projets en cours</div>
                <div className="text-3xl font-semibold mt-1">{counters.nbEnCours}</div>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border">
                <div className="text-sm text-muted-foreground">USAID en suspension</div>
                <div className="text-3xl font-semibold mt-1">
                  {counters.nbEnCours === 0 ? 0 : counters.nbSuspendusUSAID}
                </div>
              </div>
            </div>

            {/* Navigation locale */}
            <nav className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="#cours"
                className="bg-white px-6 py-3 rounded-lg shadow-sm border border-border hover:bg-muted transition-colors"
              >
                Projets en Cours
              </a>
              <a
                href="#termines"
                className="bg-white px-6 py-3 rounded-lg shadow-sm border border-border hover:bg-muted transition-colors"
              >
                Projets Terminés
              </a>
              <a
                href="#rapports"
                className="bg-white px-6 py-3 rounded-lg shadow-sm border border-border hover:bg-muted transition-colors"
              >
                Rapports
              </a>
              <a
                href="#partenaires"
                className="bg-white px-6 py-3 rounded-lg shadow-sm border border-border hover:bg-muted transition-colors"
              >
                Partenaires
              </a>
            </nav>
          </div>
        </div>
      </section>

      {/* Filtres globaux */}
      <section className="pt-2 pb-6 bg-white/60 border-y">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
              <Filter className="h-4 w-4" />
              <span>Filtrer les projets (s’applique aux sections ci-dessous)</span>
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
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>

              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                {regionOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>

              <select
                value={selectedDonor}
                onChange={(e) => setSelectedDonor(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                {donorOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>

              <div className="flex items-center gap-2 md:col-span-2">
                <select
                  value={statusScope}
                  onChange={(e) => setStatusScope(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  {['Tous', 'En cours', 'Terminé'].map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>

                <label className="flex items-center gap-2 text-sm">
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
        </div>
      </section>

      {/* Projets en Cours */}
      <section id="cours" className="py-16 outline-none scroll-mt-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Clock className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold text-foreground">Projets en Cours</h2>
            </div>

            {enCoursFiltered.length === 0 ? (
              <p className="text-muted-foreground">Aucun projet ne correspond aux filtres.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {enCoursFiltered.map((p, index) => (
                  <article key={index} className="bg-white rounded-xl p-6 shadow-sm border border-border">
                    <div className="flex items-center mb-4">
                      <div
                        className={`w-3 h-3 rounded-full mr-2 ${p.usaidNote ? 'bg-red-500' : 'bg-green-500'}`}
                      />
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
                        <span className="font-medium text-right">{p.domain || 'N/D'}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            <div className="text-center">
              <Link to="/projets-en-cours" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <Button className="inline-flex items-center">
                  Voir tous les projets en cours
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Projets Terminés */}
      <section id="termines" className="py-16 bg-muted/30 outline-none scroll-mt-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <CheckCircle className="h-8 w-8 text-accent" />
              <h2 className="text-3xl font-bold text-foreground">Projets Terminés</h2>
            </div>

            {terminesFiltered.length === 0 ? (
              <p className="text-muted-foreground">Aucun projet ne correspond aux filtres.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {terminesFiltered.map((p, index) => (
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

            <div className="text-center">
              <Link to="/projets-termines" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <Button variant="outline" className="inline-flex items-center">
                  Voir tous les projets terminés
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Rapports */}
      <section id="rapports" className="py-16 outline-none scroll-mt-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <FileText className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold text-foreground">Rapports et Documentation</h2>
            </div>

            {!rapports || rapports.length === 0 ? (
              <p className="text-muted-foreground">Aucun rapport disponible pour le moment.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {rapports.map((r, index) => {
                  const year = r?.year ?? (r?.date ? String(r.date).slice(0, 4) : 'N/D')
                  const type = r?.type || r?.category || 'Rapport'
                  const downloadable = Boolean(r?.fileUrl)
                  return (
                    <article key={index} className="bg-white rounded-xl p-6 shadow-sm border border-border">
                      <div className="flex items-center mb-4">
                        <FileText className="h-5 w-5 text-primary mr-2" />
                        <span className="text-sm font-medium text-primary">{type}</span>
                      </div>

                      <h3 className="text-lg font-semibold text-foreground mb-2">{r?.title || 'Sans titre'}</h3>
                      {r?.excerpt && <p className="text-sm text-muted-foreground mb-4">{r.excerpt}</p>}

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Année : {year}</span>
                        {downloadable ? (
                          <a href={r.fileUrl} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" size="sm">Télécharger</Button>
                          </a>
                        ) : (
                          <Button variant="outline" size="sm" disabled>
                            Indisponible
                          </Button>
                        )}
                      </div>
                    </article>
                  )
                })}
              </div>
            )}

            <div className="text-center">
              <Link to="/rapports" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <Button variant="outline" className="inline-flex items-center">
                  Voir tous les rapports
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Partenaires */}
      <section id="partenaires" className="py-16 bg-white outline-none scroll-mt-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Handshake className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold text-foreground">Partenaires</h2>
            </div>

            <p className="text-muted-foreground mb-8">
              Nos partenaires institutionnels, financiers et techniques soutiennent la mise en œuvre de nos programmes dans tout le Mali.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-border rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-3">Institutionnels & Techniques</h3>
                <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                  {partenairesInstitutionnels.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-white border border-border rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-3">Financiers & Internationaux</h3>
                <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                  {partenairesInternationaux.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-white border border-border rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-3">Nationaux & ONG Locales</h3>
                <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                  {partenairesNationaux.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/partenaires"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="inline-flex items-center text-primary font-medium hover:underline"
              >
                Voir la page Partenaires <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">Collaborer avec l'AMSS</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Rejoignez-nous dans notre mission pour un développement durable au Sahel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#partenaires" className="inline-flex">
                <Button size="lg" className="text-lg px-8 py-3">
                  Devenir Partenaire
                </Button>
              </a>
              <Link to="/contact" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                  Nous Contacter
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
