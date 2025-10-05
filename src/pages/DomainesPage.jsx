// src/pages/DomainesPage.jsx
import React, { useMemo, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GraduationCap, Heart, Droplets, Shield, Users, Wheat, Layers, Filter, Search, BarChart, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { projetsEnCours, projetsTermines } from '@/data/projetsData'

// ---------- Utils ----------
const norm = (s) => String(s || '')
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()

// Récupère la valeur de domaine, quel que soit le champ utilisé dans les projets
const getProjetDomainField = (p) =>
  p?.domaine ?? p?.domain ?? p?.secteur ?? p?.sector ?? ''

// Découpe un champ domaine en labels multiples
const splitDomains = (label) =>
  String(label || '')
    .split(/\s*[;,/|]\s*|\s*&\s*|\s*-\s*/g)
    .map(s => s.trim())
    .filter(Boolean)

// Un petit raccourci pour formater les nombres fr-FR
const n = (x) => new Intl.NumberFormat('fr-FR').format(Number(x || 0))

// ---------- Icônes & descriptions ----------
const ICONS = {
  'Éducation': { icon: GraduationCap, color: 'text-blue-600', bg: 'bg-blue-50', desc: "Accès, qualité, rattrapage et scolarisation accélérée." },
  'Education': { icon: GraduationCap, color: 'text-blue-600', bg: 'bg-blue-50', desc: "Accès, qualité, rattrapage et scolarisation accélérée." },
  'Santé & Nutrition': { icon: Heart, color: 'text-red-600', bg: 'bg-red-50', desc: "Santé communautaire, SR/PF, prévention et prise en charge de la malnutrition." },
  'Santé': { icon: Heart, color: 'text-red-600', bg: 'bg-red-50', desc: "Santé communautaire, SR/PF." },
  'Nutrition': { icon: Heart, color: 'text-red-600', bg: 'bg-red-50', desc: "Prévention et prise en charge de la malnutrition." },
  'WASH': { icon: Droplets, color: 'text-cyan-600', bg: 'bg-cyan-50', desc: "Eau potable, assainissement, hygiène et latrines." },
  'Protection & VBG': { icon: Shield, color: 'text-purple-600', bg: 'bg-purple-50', desc: "Protection des civils, VBG, espaces sûrs, mécanismes communautaires." },
  'Protection': { icon: Shield, color: 'text-purple-600', bg: 'bg-purple-50', desc: "Protection des civils et mécanismes communautaires." },
  'Gouvernance & Paix': { icon: Users, color: 'text-green-600', bg: 'bg-green-50', desc: "Redevabilité, participation citoyenne et cohésion sociale." },
  'Gouvernance': { icon: Users, color: 'text-green-600', bg: 'bg-green-50', desc: "Redevabilité et participation citoyenne." },
  'Paix': { icon: Users, color: 'text-green-600', bg: 'bg-green-50', desc: "Consolidation de la paix et cohésion." },
  'Sécurité alimentaire & Moyens d’existence': { icon: Wheat, color: 'text-orange-600', bg: 'bg-orange-50', desc: "Relance, intrants, diversification, résilience." },
  'Sécurité Alimentaire': { icon: Wheat, color: 'text-orange-600', bg: 'bg-orange-50', desc: "Relance, intrants, diversification, résilience." },
  'Environnement & GRN': { icon: Layers, color: 'text-emerald-700', bg: 'bg-emerald-50', desc: "Gestion des ressources naturelles et environnement." },
  'Urgence': { icon: Layers, color: 'text-rose-700', bg: 'bg-rose-50', desc: "Réponse humanitaire, assistance d'urgence." },
  'Renforcement de capacités & Technologie': { icon: Layers, color: 'text-indigo-700', bg: 'bg-indigo-50', desc: "Capacitation d’acteurs, numérique, microfinance, innovation." },
  'Résilience': { icon: Layers, color: 'text-sky-700', bg: 'bg-sky-50', desc: "Prévention des chocs et adaptation." }
}

const pickIcon = (label) => {
  for (const key of Object.keys(ICONS)) {
    if (label.toLowerCase().includes(key.toLowerCase())) return ICONS[key]
  }
  return { icon: Layers, color: 'text-slate-600', bg: 'bg-slate-50', desc: "Actions transversales et de renforcement de capacités." }
}

// ---------- Page ----------
export default function DomainesPage () {
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  // Construit l’index des domaines à partir des projets (live -> dès qu’on modifie projetsData, ça bouge ici)
  const domainesRaw = useMemo(() => {
    const all = [...(projetsEnCours || []), ...(projetsTermines || [])]
    const map = new Map()

    for (const p of all) {
      const labels = splitDomains(getProjetDomainField(p))
      if (labels.length === 0) labels.push('Autres')

      for (const label of labels) {
        const curr = map.get(label) || {
          label,
          projets: [],
          benefEnCours: 0,
          nbEnCours: 0,
          nbTermines: 0
        }
        curr.projets.push(p)
        const st = String(p.status || '').toLowerCase()
        if (st.includes('en cours')) {
          curr.nbEnCours += 1
          curr.benefEnCours += Number(p.beneficiaries || 0)
        } else if (st.includes('termin')) {
          curr.nbTermines += 1
        }
        map.set(label, curr)
      }
    }

    // Tri par nombre total de projets
    return Array.from(map.values()).sort((a, b) => b.projets.length - a.projets.length)
  }, [])

  // Stats globales
  const globalStats = useMemo(() => {
    const totalDomains = domainesRaw.length
    const totalProjects = domainesRaw.reduce((acc, d) => acc + d.projets.length, 0)
    const totalBenef = domainesRaw.reduce((acc, d) => acc + d.benefEnCours, 0)
    return { totalDomains, totalProjects, totalBenef: n(totalBenef) }
  }, [domainesRaw])

  // Filtres
  const [searchTerm, setSearchTerm] = useState('')
  const [onlyWithOngoing, setOnlyWithOngoing] = useState(false)

  const domaines = useMemo(() => {
    return domainesRaw
      .filter(d => !onlyWithOngoing || d.nbEnCours > 0)
      .filter(d => !searchTerm || norm(d.label).includes(norm(searchTerm)))
  }, [domainesRaw, searchTerm, onlyWithOngoing])

  // ---------- UI ----------
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Nos Domaines d&apos;Intervention</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Cette page se met à jour automatiquement à partir de vos projets (projetsData). Ajoutez un projet → les domaines et les listes se mettent à jour.
            </p>

            {/* Quelques chiffres clés */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatBox label="Domaines" value={globalStats.totalDomains} />
              <StatBox label="Projets (tous statuts)" value={globalStats.totalProjects} />
              <StatBox label="Bénéficiaires (en cours)" value={globalStats.totalBenef} />
            </div>
          </div>
        </div>
      </section>

      {/* Barre de filtres */}
      <section className="py-6 bg-white/60 border-y">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 mb-4 text-muted-foreground">
              <Filter className="h-4 w-4" />
              <span className="text-sm">Filtrer les domaines générés depuis les projets</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Recherche */}
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  placeholder="Rechercher un domaine…"
                  className="w-full pl-9 pr-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {/* Toggle */}
              <label className="flex items-center gap-2 text-sm bg-white border border-border rounded-lg px-3">
                <input
                  type="checkbox"
                  checked={onlyWithOngoing}
                  onChange={(e) => setOnlyWithOngoing(e.target.checked)}
                />
                Afficher uniquement les domaines avec projets en cours
              </label>

              {/* Raccourci : voir tous les projets */}
              <div className="flex items-center justify-end">
                <Link to="/projets">
                  <Button variant="outline" className="gap-2">
                    Voir tous les projets <ExternalLink className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Domaines dynamiques */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {domaines.length === 0 ? (
              <p className="text-muted-foreground">Aucun domaine ne correspond aux filtres.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {domaines.map(d => {
                  const { icon: Icon, color, bg, desc } = pickIcon(d.label)
                  return (
                    <DomainCard
                      key={d.label}
                      label={d.label}
                      icon={<Icon className={`h-8 w-8 ${color}`} />}
                      bg={bg}
                      desc={desc}
                      projets={d.projets}
                      nbEnCours={d.nbEnCours}
                      nbTermines={d.nbTermines}
                      onOpenAll={() => navigate(`/projets?domain=${encodeURIComponent(d.label)}`)}
                    />
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

// ---------- Petits composants ----------
function StatBox ({ label, value }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border">
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="text-3xl font-semibold mt-1">{value}</div>
    </div>
  )
}

function DomainCard ({ label, icon, bg, desc, projets, nbEnCours, nbTermines, onOpenAll }) {
  const [open, setOpen] = useState(false)
  // tri simple: en cours d'abord, puis titre
  const sorted = useMemo(() => {
    const s = [...projets]
    s.sort((a, b) => {
      const sa = String(a.status || '').toLowerCase().includes('en cours') ? 0 : 1
      const sb = String(b.status || '').toLowerCase().includes('en cours') ? 0 : 1
      if (sa !== sb) return sa - sb
      return String(a.title || '').localeCompare(String(b.title || ''), 'fr')
    })
    return s
  }, [projets])

  return (
    <div className="bg-white rounded-xl p-8 shadow-sm border border-border hover:shadow-lg transition-shadow">
      <div className={`w-16 h-16 ${bg} rounded-lg flex items-center justify-center mb-6`}>
        {icon}
      </div>

      <h3 className="text-xl font-semibold text-foreground mb-2">{label}</h3>
      <p className="text-sm text-muted-foreground mb-3">
        {sorted.length.toLocaleString('fr-FR')} projet(s) • {n(sorted.filter(p => String(p.status||'').toLowerCase().includes('en cours')).length)} en cours • {n(sorted.filter(p => String(p.status||'').toLowerCase().includes('termin')).length)} terminés
      </p>
      <p className="text-sm text-muted-foreground mb-4">{desc}</p>

      <div className="flex items-center gap-2 text-xs mb-4">
        <span className="inline-flex items-center px-2 py-1 border rounded bg-green-50 text-green-700">
          {nbEnCours} en cours
        </span>
        <span className="inline-flex items-center px-2 py-1 border rounded bg-blue-50 text-blue-700">
          {nbTermines} terminés
        </span>
      </div>

      <div className="space-y-2">
        <button
          onClick={() => setOpen(o => !o)}
          className="w-full flex items-center justify-between text-left text-sm px-3 py-2 border rounded hover:bg-slate-50"
        >
          <span className="font-medium">Voir les projets</span>
          {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>

        {open && (
          <ul className="space-y-2 max-h-72 overflow-auto pr-1">
            {sorted.map((p, idx) => (
              <li key={idx} className="border rounded p-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-sm font-medium">{p.title}</div>
                  <span className={`text-xs px-2 py-0.5 rounded border ${String(p.status||'').toLowerCase().includes('en cours') ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'}`}>
                    {p.status || '—'}
                  </span>
                </div>
                {p.region && <div className="text-xs text-muted-foreground mt-1">Région : {p.region}</div>}
                {p.bailleur && <div className="text-xs text-muted-foreground">Bailleur : {p.bailleur}</div>}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-4">
        <Button onClick={onOpenAll} variant="outline" className="w-full gap-2">
          Ouvrir dans Projets (filtré) <ExternalLink className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
