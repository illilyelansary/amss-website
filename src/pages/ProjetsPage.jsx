import React, { useEffect, useMemo } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Clock, CheckCircle, FileText, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { projetsEnCours, projetsTermines, rapports } from '../data/projetsData'

// --- Helpers for counters ---
const parseMoneyToUSD = (val) => {
  if (!val) return 0
  if (typeof val === 'number') return val
  const s = String(val)
  const isUSD = /usd/i.test(s) || /\$/.test(s)
  const num = Number(s.replace(/[^0-9.]/g, ''))
  if (!num) return 0
  // Heuristic: FCFA -> USD using ~600 FCFA = 1 USD
  return isUSD ? num : Math.round(num / 600)
}

const sum = (arr) => arr.reduce((a,b)=>a+b,0)

const ProjetsPage = () => {
  const { hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        el.setAttribute('tabindex', '-1')
        el.focus({ preventScroll: true })
      }
    } else {
      window.scrollTo({ top: 0 })
    }
  }, [hash])

  const subset = (arr, n=6) => arr.slice(0, Math.min(arr.length, n))

  // --- Dynamic counters from data ---
  const counters = useMemo(() => {
    const enCours = projetsEnCours || []
    const termines = projetsTermines || []
    const all = [...enCours, ...termines]

    const totalBenef = sum(all.map(p => Number(p.beneficiaries || 0)))
    const totalBudgetUSD = sum(all.map(p => parseMoneyToUSD(p.budget)))
    const nbEnCours = enCours.filter(p => String(p.status||'').toLowerCase().includes('en cours')).length
    const nbSuspendusUSAID = enCours.filter(p => p.usaidNote === true).length

    const formatUSD = (n) => new Intl.NumberFormat('fr-FR', { style:'currency', currency:'USD', maximumFractionDigits: 0 }).format(n)

    return {
      totalBenef: new Intl.NumberFormat('fr-FR').format(totalBenef),
      totalBudget: formatUSD(totalBudgetUSD),
      nbEnCours,
      nbSuspendusUSAID
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-14 md:py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 md:mb-6">
              Nos Projets et Réalisations
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Découvrez nos projets en cours, nos réalisations passées et nos rapports d'activités
            </p>

            {/* Dynamic Counters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-8">
              <div className="rounded-2xl bg-white p-5 shadow-sm border">
                <div className="text-sm text-muted-foreground">Bénéficiaires (tous projets)</div>
                <div className="text-3xl font-semibold mt-1">{counters.totalBenef}</div>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border">
                <div className="text-sm text-muted-foreground">Budget agrégé (≈ USD)</div>
                <div className="text-3xl font-semibold mt-1">{counters.totalBudget}</div>
                <div className="text-xs text-muted-foreground mt-1">Conversion indicative 600 FCFA ≈ 1 USD</div>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border">
                <div className="text-sm text-muted-foreground">Projets en cours</div>
                <div className="text-3xl font-semibold mt-1">{counters.nbEnCours}</div>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border">
                <div className="text-sm text-muted-foreground">USAID en suspension</div>
                <div className="text-3xl font-semibold mt-1">{counters.nbSuspendusUSAID}</div>
              </div>
            </div>

            <nav className="mt-8 flex flex-wrap justify-center gap-4">
              <a href="#cours" className="bg-white px-6 py-3 rounded-lg shadow-sm border border-border hover:bg-muted transition-colors">
                Projets en Cours
              </a>
              <a href="#termines" className="bg-white px-6 py-3 rounded-lg shadow-sm border border-border hover:bg-muted transition-colors">
                Projets Terminés
              </a>
              <a href="#rapports" className="bg-white px-6 py-3 rounded-lg shadow-sm border border-border hover:bg-muted transition-colors">
                Rapports
              </a>
            </nav>
          </div>
        </div>
      </section>

      {/* Projets en Cours */}
      <section id="cours" className="py-16 outline-none">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center mb-8">
              <Clock className="h-8 w-8 text-primary mr-3" />
              <h2 className="text-3xl font-bold text-foreground">Projets en Cours</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {subset(projetsEnCours).map((projet, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-border">
                  <div className="flex items-center mb-4">
                    <div className={`w-3 h-3 rounded-full mr-2 ${projet.usaidNote ? 'bg-red-500' : 'bg-green-500'}`}></div>
                    <span className={`text-sm font-medium ${projet.usaidNote ? 'text-red-600' : 'text-green-600'}`}>
                      {projet.status}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {projet.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mb-4">
                    {projet.excerpt}
                  </p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Région:</span>
                      <span className="font-medium">{projet.region}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Bailleur:</span>
                      <span className="font-medium">{projet.donor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Domaine:</span>
                      <span className="font-medium">{projet.domain}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <Link to="/projets-en-cours">
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
      <section id="termines" className="py-16 bg-muted/30 outline-none">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center mb-8">
              <CheckCircle className="h-8 w-8 text-accent mr-3" />
              <h2 className="text-3xl font-bold text-foreground">Projets Terminés</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {subset(projetsTermines).map((projet, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-border">
                  <div className="flex items-center mb-4">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-sm font-medium text-blue-600">Terminé</span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {projet.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mb-4">
                    {projet.excerpt}
                  </p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Région:</span>
                      <span className="font-medium">{projet.region}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Période:</span>
                      <span className="font-medium">{new Date(projet.startDate).getFullYear()}–{new Date(projet.endDate).getFullYear()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Bénéficiaires:</span>
                      <span className="font-medium">{projet.beneficiaries?.toLocaleString('fr-FR') || 'N/D'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <Link to="/projets-termines">
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
      <section id="rapports" className="py-16 outline-none">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center mb-8">
              <FileText className="h-8 w-8 text-primary mr-3" />
              <h2 className="text-3xl font-bold text-foreground">Rapports et Documentation</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {rapports.map((rapport, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-border">
                  <div className="flex items-center mb-4">
                    <FileText className="h-5 w-5 text-primary mr-2" />
                    <span className="text-sm font-medium text-primary">{rapport.type}</span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {rapport.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mb-4">
                    {rapport.description}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Année: {rapport.year}</span>
                    <Button variant="outline" size="sm">
                      Télécharger
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <Link to="/rapports">
                <Button variant="outline" className="inline-flex items-center">
                  Voir tous les rapports
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Collaborer avec l'AMSS
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Rejoignez-nous dans notre mission pour un développement durable au Sahel
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/partenaires">
                <Button size="lg" className="text-lg px-8 py-3">
                  Devenir Partenaire
                </Button>
              </Link>
              <Link to="/contact">
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

export default ProjetsPage
