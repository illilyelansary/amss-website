import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import HeroSection from '../components/HeroSection'
import DomainesSection from '../components/DomainesSection'
import ZonesSection from '../components/ZonesSection'
import { Button } from '@/components/ui/button'
import { ArrowRight, Users, Target, Award } from 'lucide-react'
import projetTerrain from '../assets/projet-terrain.jpeg'

const HomePage = () => {
  // Scroll auto si on arrive avec #ancre
  const { hash, pathname } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
  }, [hash])

  // Scroll fluide local si on reste sur la même page / navigation normale sinon
  const handleSmoothNav = (e, href) => {
    // support '#ancre' et '/#ancre'
    const isJustHash = href.startsWith('#')
    const [path, anchor] = isJustHash ? [pathname, href.slice(1)] : href.split('#')

    if (!anchor) return // pas d’ancre => laisser la navigation normale

    if (pathname === path) {
      e.preventDefault()
      const el = document.getElementById(anchor)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div>
      {/* repère d’ancre pour le haut de page */}
      <div id="top" className="scroll-mt-24" />
      <HeroSection />

      {/* Section Actualités récentes */}
      <section id="actualites" className="py-16 bg-background scroll-mt-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Nos Dernières Actualités
            </h2>
            <p className="text-xl text-muted-foreground">
              Découvrez nos actions récentes sur le terrain
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <article className="bg-white rounded-xl shadow-sm border border-border overflow-hidden hover:shadow-lg transition-shadow">
              <img 
                src={projetTerrain} 
                alt="Projet de terrain AMSS" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Du plastique recyclé aux bancs d'école
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  260 tables-bancs remis gratuitement aux écoles de Tombouctou dans le cadre 
                  du projet Green Jobs avec la Fondation Stromme.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/actualites" aria-label="Lire la suite sur les actualités">
                    Lire la suite
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </article>
            
            <article className="bg-white rounded-xl shadow-sm border border-border overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-gradient-to-br from-primary/20 to-accent/20 h-48 flex items-center justify-center">
                <Users className="h-16 w-16 text-primary" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Formation de 460 employés
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Renforcement des capacités de notre équipe pour mieux servir 
                  les communautés vulnérables du Mali.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/actualites" aria-label="En savoir plus sur la formation des employés">
                    En savoir plus
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </article>
            
            <article className="bg-white rounded-xl shadow-sm border border-border overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-gradient-to-br from-accent/20 to-primary/20 h-48 flex items-center justify-center">
                <Target className="h-16 w-16 text-accent" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Extension vers 8 régions
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  L'AMSS étend sa couverture géographique pour atteindre plus de 
                  populations vulnérables à travers le Mali.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/actualites" aria-label="Découvrir les détails de l’extension">
                    Découvrir
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </article>
          </div>

          {/* Raccourcis internes vers Domaines / Zones */}
          <div className="mt-10 flex flex-wrap gap-3 justify-center">
            <Link to="/#domaines" onClick={(e)=>handleSmoothNav(e, '/#domaines')}>
              <Button variant="outline">Voir nos Domaines</Button>
            </Link>
            <Link to="/#zones" onClick={(e)=>handleSmoothNav(e, '/#zones')}>
              <Button variant="outline">Parcourir les Zones</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Domaines */}
      <section id="domaines" className="scroll-mt-24">
        <DomainesSection />
      </section>

      {/* Zones */}
      <section id="zones" className="scroll-mt-24">
        <ZonesSection />
      </section>
      
      {/* Section Témoignages */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Témoignages
            </h2>
            <p className="text-xl text-muted-foreground">
              La parole à nos bénéficiaires et partenaires
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-border">
              <div className="flex items-center mb-4">
                <Award className="h-8 w-8 text-primary mr-3" />
                <div>
                  <h4 className="font-semibold text-foreground">Aminata Touré</h4>
                  <p className="text-sm text-muted-foreground">Bénéficiaire, Tombouctou</p>
                </div>
              </div>
              <p className="text-muted-foreground italic">
                "Grâce aux programmes d'alphabétisation de l'AMSS, j'ai pu apprendre à lire 
                et à écrire. Aujourd'hui, je peux aider mes enfants avec leurs devoirs et 
                gérer mon petit commerce."
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm border border-border">
              <div className="flex items-center mb-4">
                <Award className="h-8 w-8 text-accent mr-3" />
                <div>
                  <h4 className="font-semibold text-foreground">Dr. Ibrahim Maïga</h4>
                  <p className="text-sm text-muted-foreground">Partenaire, UNICEF Mali</p>
                </div>
              </div>
              <p className="text-muted-foreground italic">
                "L'AMSS est un partenaire fiable et expérimenté. Leur approche participative 
                et leur connaissance du terrain font la différence dans nos interventions 
                humanitaires."
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
