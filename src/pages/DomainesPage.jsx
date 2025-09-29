// src/pages/DomainesPage.jsx
import React, { useMemo, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GraduationCap, Heart, Droplets, Shield, Users, Wheat, Layers, Filter, Search, BarChart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { projetsEnCours, projetsTermines } from '../data/projetsData'

// Normalise et découpe les domaines potentiellement multiples
const splitDomains = (label) =>
  String(label || '')
    .split(/[,/|;]+/)
    .map(s => s.trim())
    .filter(Boolean)

const ICONS = {
  'Éducation': { icon: GraduationCap, color: 'text-blue-600', bg: 'bg-blue-50', link: '/education', desc: "Accès, qualité, rattrapage et scolarisation accélérée." },
  'Education': { icon: GraduationCap, color: 'text-blue-600', bg: 'bg-blue-50', link: '/education', desc: "Accès, qualité, rattrapage et scolarisation accélérée." },
  'Santé': { icon: Heart, color: 'text-red-600', bg: 'bg-red-50', link: '/sante', desc: "Santé communautaire, SR/PF, lutte contre la malnutrition." },
  'Nutrition': { icon: Heart, color: 'text-red-600', bg: 'bg-red-50', link: '/sante', desc: "Prévention et prise en charge de la malnutrition." },
  'WASH': { icon: Droplets, color: 'text-cyan-600', bg: 'bg-cyan-50', link: '/wash', desc: "Eau potable, assainissement, hygiène et latrines." },
  'Protection': { icon: Shield, color: 'text-purple-600', bg: 'bg-purple-50', link: '/protection', desc: "Protection des civils, VBG, espaces sûrs, mécanismes communautaires." },
  'VBG': { icon: Shield, color: 'text-purple-600', bg: 'bg-purple-50', link: '/protection', desc: "Prévention et réponse aux violences basées sur le genre." },
  'Gouvernance': { icon: Users, color: 'text-green-600', bg: 'bg-green-50', link: '/gouvernance', desc: "Redevabilité, participation citoyenne et cohésion sociale." },
  'Paix': { icon: Users, color: 'text-green-600', bg: 'bg-green-50', link: '/gouvernance', desc: "Consolidation de la paix et cohésion." },
  'Sécurité Alimentaire': { icon: Wheat, color: 'text-orange-600', bg: 'bg-orange-50', link: '/securite-alimentaire', desc: "Relance économique, intrants, diversification et résilience." },
}

const pickIcon = (domainLabel) => {
  for (const key of Object.keys(ICONS)) {
    if (domainLabel.toLowerCase().includes(key.toLowerCase())) return ICONS[key]
  }
  return { icon: Layers, color: 'text-slate-600', bg: 'bg-slate-50', link: '/domaines', desc: "Actions transversales et de renforcement de capacités." }
}

// Normalisation pour recherche
const norm = (s) => String(s || '')
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()

export default function DomainesPage () {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  // Construit l’index des domaines à partir de projets (en cours + terminés)
  const domainesRaw = useMemo(() => {
    const all = [...(projetsEnCours || []), ...(projetsTermines || [])]
    const map = new Map()

    for (const p of all) {
      const parts = splitDomains(p.domain)
      if (parts.length === 0) parts.push('Autres')

      for (const label of parts) {
        const curr = map.get(label) || { label, projets: [], benefEnCours: 0, nbEnCours: 0, nbTermines: 0 }
        curr.projets.push(p)
        if ((p.status || '').toLowerCase().includes('en cours')) {
          curr.benefEnCours += Number(p.beneficiaries || 0)
          curr.nbEnCours += 1
        } else if ((p.status || '').toLowerCase().includes('termin')) {
          curr.nbTermines += 1
        }
        map.set(label, curr)
      }
    }

    const arr = Array.from(map.values()).sort((a, b) => b.projets.length - a.projets.length)
    return arr
  }, [])

  // ====== Stats globales ======
  const globalStats = useMemo(() => {
    const totalDomains = domainesRaw.length
    const totalProjects = domainesRaw.reduce((acc, d) => acc + d.projets.length, 0)
    const totalBenef = domainesRaw.reduce((acc, d) => acc + d.benefEnCours, 0)
    return {
      totalDomains,
      totalProjects,
      totalBenef: new Intl.NumberFormat('fr-FR').format(totalBenef)
    }
  }, [domainesRaw])

  // ====== Filtres ======
  const [searchTerm, setSearchTerm] = useState('')
  const [onlyWithOngoing, setOnlyWithOngoing] = useState(false)

  const domaines = useMemo(() => {
    return domainesRaw
      .filter(d => !onlyWithOngoing || d.nbEnCours > 0)
      .filter(d => !searchTerm || norm(d.label).includes(norm(searchTerm)))
  }, [domainesRaw, searchTerm, onlyWithOngoing])

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Nos Domaines d&apos;Intervention</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Cette page se met à jour automatiquement à partir de vos projets (projetsData).
            </p>

            {/* Quelques chiffres clés */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl p-5 shadow-sm border">
                <div className="text-sm text-muted-foreground">Domaines</div>
                <div className="text-3xl font-semibold mt-1">{globalStats.totalDomains}</div>
              </div>
              <div className="bg-white rounded-2xl p-5 shadow-sm border">
                <div className="text-sm text-muted-foreground">Projets (tous statuts)</div>
                <div className="text-3xl font-semibold mt-1">{globalStats.totalProjects}</div>
              </div>
              <div className="bg-white rounded-2xl p-5 shadow-sm border">
                <div className="text-sm text-muted-foreground">Bénéficiaires (en cours)</div>
                <div className="text-3xl font-semibold mt-1">{globalStats.totalBenef}</div>
              </div>
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

              {/* Toggle : uniquement avec projets en cours */}
              <label className="flex items-center gap-2 text-sm bg-white border border-border rounded-lg px-3">
                <input
                  type="checkbox"
                  checked={onlyWithOngoing}
                  onChange={(e) => setOnlyWithOngoing(e.target.checked)}
                />
                Afficher uniquement les domaines avec projets en cours
              </label>

              {/* Petit rappel stats filtrées */}
              <div className="flex items-center justify-end gap-2 text-xs">
                <BarChart className="h-4 w-4 text-muted-foreground" />
                <span className="bg-white border rounded px-2 py-1">Domaine(s) : {domaines.length}</span>
                <span className="bg-white border rounded px-2 py-1">
                  Projets (tous statuts) : {domaines.reduce((acc, d) => acc + d.projets.length, 0)}
                </span>
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
                  const { icon: Icon, color, bg, link, desc } = pickIcon(d.label)
                  const ongoing = d.nbEnCours
                  const done = d.nbTermines
                  return (
                    <div key={d.label} className="bg-white rounded-xl p-8 shadow-sm border border-border hover:shadow-lg transition-shadow">
                      <div className={`w-16 h-16 ${bg} rounded-lg flex items-center justify-center mb-6`}>
                        <Icon className={`h-8 w-8 ${color}`} />
                      </div>

                      <h3 className="text-xl font-semibold text-foreground mb-2">{d.label}</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {d.projets.length.toLocaleString('fr-FR')} projet(s)
                        {' • '}
                        {d.benefEnCours.toLocaleString('fr-FR')} bénéficiaires (en cours)
                      </p>
                      <p className="text-sm text-muted-foreground mb-4">{desc}</p>

                      <div className="flex items-center gap-2 text-xs mb-4">
                        <span className="inline-flex items-center px-2 py-1 border rounded bg-green-50 text-green-700">
                          {ongoing} en cours
                        </span>
                        <span className="inline-flex items-center px-2 py-1 border rounded bg-blue-50 text-blue-700">
                          {done} terminés
                        </span>
                      </div>

                      <Link to={link}>
                        <Button variant="outline" className="w-full">En savoir plus</Button>
                      </Link>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">Découvrez Nos Actions</h2>
            <p className="text-xl text-muted-foreground mb-8">Explorez nos projets et leurs impacts</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/projets"><Button size="lg" className="text-lg px-8 py-3">Voir Nos Projets</Button></Link>
              <Link to="/zones"><Button variant="outline" size="lg" className="text-lg px-8 py-3">Zones d&apos;Intervention</Button></Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
