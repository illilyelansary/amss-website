// src/pages/ProjetsTerminesPage.jsx
import React, { useMemo, useState } from 'react'
import { Calendar, MapPin, Users, DollarSign, CheckCircle, Filter, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { projetsTermines } from '../data/projetsData'

const ProjetsTerminesPage = () => {
  const [filtreRegion, setFiltreRegion] = useState('Toutes')
  const [filtreDomaine, setFiltreDomaine] = useState('Tous')
  const [filtreAnnee, setFiltreAnnee] = useState('Toutes')

  // Options de filtres (stables)
  const regions = useMemo(() => {
    const vals = Array.from(new Set(projetsTermines.map(p => p.region).filter(Boolean)))
    return ['Toutes', ...vals]
  }, [])
  const domaines = useMemo(() => {
    const vals = Array.from(new Set(projetsTermines.map(p => p.domain).filter(Boolean)))
    return ['Tous', ...vals]
  }, [])
  const annees = useMemo(() => {
    const years = Array.from(new Set(
      projetsTermines
        .map(p => new Date(p.endDate).getFullYear())
        .filter(y => !isNaN(y))
    )).sort((a, b) => b - a)
    return ['Toutes', ...years]
  }, [])

  // Filtres appliqués
  const projetsFiltres = useMemo(() => {
    return projetsTermines.filter(p => {
      const regionMatch = filtreRegion === 'Toutes' || p.region === filtreRegion
      const domaineMatch = filtreDomaine === 'Tous' || p.domain === filtreDomaine
      const anneeMatch = filtreAnnee === 'Toutes' || new Date(p.endDate).getFullYear() === Number(filtreAnnee)
      return regionMatch && domaineMatch && anneeMatch
    })
  }, [filtreRegion, filtreDomaine, filtreAnnee])

  // Helpers d'affichage
  const formatDate = (d) => {
    if (!d) return '—'
    try {
      return new Date(d).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })
    } catch { return String(d) }
  }
  const formatNumber = (n) => new Intl.NumberFormat('fr-FR').format(Number(n || 0))
  const getDuree = (startDate, endDate) => {
    const start = new Date(startDate); const end = new Date(endDate)
    if (isNaN(start) || isNaN(end)) return '—'
    const diffDays = Math.ceil(Math.abs(end - start) / (1000 * 60 * 60 * 24))
    const diffMonths = Math.round(diffDays / 30)
    if (diffMonths < 12) return `${diffMonths} mois`
    const years = Math.floor(diffMonths / 12); const months = diffMonths % 12
    return months ? `${years} an(s) ${months} mois` : `${years} an(s)`
  }

  // Compteurs en-tête (projets terminés uniquement)
  const totalBenef = useMemo(
    () => formatNumber(projetsTermines.reduce((s,p)=> s + Number(p.beneficiaries||0), 0)),
    []
  )
  const nbRegions = useMemo(() => new Set(projetsTermines.map(p => p.region)).size, [])
  const nbDomaines = useMemo(() => new Set(projetsTermines.map(p => p.domain)).size, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Projets Terminés
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Découvrez les réalisations et l'impact des projets que l'AMSS a menés à bien au service des populations vulnérables du Mali.
            </p>

            {/* Compteurs */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">{projetsTermines.length}</div>
                <div className="text-sm text-muted-foreground">Projets réalisés</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">{totalBenef}+</div>
                <div className="text-sm text-muted-foreground">Bénéficiaires touchés</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">{nbRegions}</div>
                <div className="text-sm text-muted-foreground">Régions impactées</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">{nbDomaines}</div>
                <div className="text-sm text-muted-foreground">Domaines d’intervention</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filtres */}
      <section className="py-8 bg-white/80 border-y">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-xl p-4 shadow-sm border">
              <div className="flex items-center gap-3 mb-4">
                <Filter className="h-5 w-5 text-foreground/70" />
                <h2 className="text-xl font-semibold">Filtrer les projets</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">Région</label>
                  <select className="w-full border rounded-lg p-2" value={filtreRegion} onChange={(e)=>setFiltreRegion(e.target.value)}>
                    {regions.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">Domaine</label>
                  <select className="w-full border rounded-lg p-2" value={filtreDomaine} onChange={(e)=>setFiltreDomaine(e.target.value)}>
                    {domaines.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">Année de fin</label>
                  <select className="w-full border rounded-lg p-2" value={filtreAnnee} onChange={(e)=>setFiltreAnnee(e.target.value)}>
                    {annees.map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>
                <div className="flex items-end">
                  <Button variant="outline" className="w-full" onClick={() => {
                    setFiltreRegion('Toutes'); setFiltreDomaine('Tous'); setFiltreAnnee('Toutes')
                  }}>
                    Réinitialiser
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Liste */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {projetsFiltres.map((projet, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-border">
                <div className="flex items-center gap-2 mb-3">
                  <Award className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium text-green-700">Terminé</span>
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-2">{projet.title}</h3>
                <p className="text-muted-foreground mb-4">{projet.excerpt}</p>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 opacity-70" />
                    <span className="font-medium">{projet.region}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 opacity-70" />
                    <span>{formatNumber(projet.beneficiaries)} bénéficiaires</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 opacity-70" />
                    <span>Du {formatDate(projet.startDate)} au {formatDate(projet.endDate)} ({getDuree(projet.startDate, projet.endDate)})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 opacity-70" />
                    <span>{projet.budget || '—'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">Envie d'en savoir plus ?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Parcourez nos autres domaines d'intervention et nos rapports d'activité détaillés.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-3">Nos domaines</Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">Nos rapports d'activité</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProjetsTerminesPage
