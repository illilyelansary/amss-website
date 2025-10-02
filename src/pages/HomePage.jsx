// src/pages/HomePage.jsx
import React, { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import HeroSection from '../components/HeroSection'
import DomainesSection from '../components/DomainesSection'
import ZonesSection from '../components/ZonesSection'
import { Button } from '@/components/ui/button'
import { ArrowRight, Users, Target, Award, ListTree, MapPin } from 'lucide-react'
import projetTerrain from '../assets/projet-terrain.jpeg'

const sections = [
  { id: 'top', label: 'Haut de page' },
  { id: 'actualites', label: 'Actualités' },
  { id: 'domaines', label: 'Domaines' },
  { id: 'zones', label: 'Zones' },
  { id: 'temoignages', label: 'Témoignages' }
]

const HomePage = () => {
  // Scroll auto si on arrive avec #ancre
  const { hash, pathname } = useLocation()
  const [activeId, setActiveId] = useState('top')

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
  }, [hash])

  // IntersectionObserver pour surligner la section active
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActiveId(visible[0].target.id)
      },
      { root: null, rootMargin: '0px 0px -70% 0px', threshold: [0.01, 0.25, 0.6] }
    )
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean)
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Scroll fluide local si on reste sur la même page / navigation normale sinon
  const handleSmoothNav = (e, href) => {
    // support '#ancre' et '/#ancre'
    const isJustHash = href.startsWith('#')
    const [path, anchor] = isJustHash ? [pathname, href.slice(1)] : href.split('#')
    if (!anchor) return // pas d’ancre => navigation standard

    if (pathname === path) {
      e.preventDefault()
      const el = document.getElementById(anchor)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // Sommaire desktop (fixe à droite)
  const TocDesktop = useMemo(
    () => (
      <nav
        aria-label="Sommaire d’accueil"
        className="hidden xl:block fixed right-6 top-28 z-40 w-64 bg-white/80 backdrop-blur border border-border rounded-2xl p-4 shadow-sm"
      >
        <div className="flex items-center gap-2 mb-3 text-sm font-medium text-foreground">
          <ListTree className="h-4 w-4" /> Sommaire
        </div>
        <ul className="space-y-2">
          {sections.map((s) => (
            <li key={s.id}>
              <Link
                to={`/#${s.id}`}
                onClick={(e) => handleSmoothNav(e, `/#${s.id}`)}
                className={`block text-sm px-2 py-1 rounded transition-colors ${
                  activeId === s.id
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-primary hover:bg-muted'
                }`}
              >
                {s.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    ),
    [activeId]
  )

  // Barre de raccourcis mobile (sticky sous le header)
  const TocMobile = (
    <div className="xl:hidden sticky top-16 z-40 bg-white/95 backdrop-blur border-b border-border">
      <div className="container mx-auto px-4 py-2 overflow-x-auto no-scrollbar">
        <div className="flex gap-2">
          {sections.map((s) => (
            <Link key={s.id} to={`/#${s.id}`} onClick={(e) => handleSmoothNav(e, `/#${s.id}`)}>
              <Button variant={activeId === s.id ? 'default' : 'outline'} size="sm">
                {s.label}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div>
      {/* Sommaire mobile */}
      {TocMobile}
      {/* Sommaire desktop */}
      {TocDesktop}

      {/* repère d’ancre pour le haut de page */}
      <div id="top" className="scroll-mt-24" />
      <HeroSection />

      {/* Section Actualités récentes */}
      <section id="actualites" className="py-16 bg-background scroll-mt-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Nos Dernières Actualités</h2>
            <p className="text-xl text-muted-foreground">Découvrez nos actions récentes sur le terrain</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <article className="bg-white rounded-xl shadow-sm border border-border overflow-hidden hover:shadow-lg transition-shadow">
              <img src={projetTerrain} alt="Projet de terrain AMSS" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">Du plastique recyclé aux bancs d'école</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  260 tables-bancs remis gratuitement aux écoles de Tombouctou dans le cadre du projet Green Jobs avec la
                  Fondation Stromme.
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
                <h3 className="text-lg font-semibold text-foreground mb-3">Formation de 460 employés</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Renforcement des capacités de notre équipe pour mieux servir les communautés vulnérables du Mali.
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
                <h3 className="text-lg font-semibold text-foreground mb-3">Extension vers 8 régions</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  L'AMSS étend sa couverture géographique pour atteindre plus de populations vulnérables à travers le Mali.
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

          {/* Bouton vers la page actualités */}
          <div className="mt-8 text-center">
            <Button asChild>
              <Link to="/actualites" aria-label="Voir toutes les actualités">
                Voir toutes les actualités
              </Link>
            </Button>
          </div>

          {/* Raccourcis vers Projets / Zones */}
          <div className="mt-10 flex flex-wrap gap-3 justify-center">
            {/* Découvrir nos projets en détail -> directement la section Projets en cours */}
            <Link to="/projets#cours" onClick={(e)=>{/* pas de smooth ici: changement de page */}} aria-label="Découvrir nos projets en détail">
              <Button>Découvrir nos projets en détail</Button>
            </Link>

            {/* Carte interactive des zones */}
            <Link to="/zones#carte" aria-label="Ouvrir la carte interactive des zones">
              <Button variant="outline" className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Carte interactive
              </Button>
            </Link>

            {/* Voir nos projets par région */}
            <Link to="/zones#carte" aria-label="Voir nos projets par région">
              <Button variant="outline">Voir nos projets par région</Button>
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
      <section id="temoignages" className="py-16 bg-muted/30 scroll-mt-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Témoignages</h2>
            <p className="text-xl text-muted-foreground">La parole à nos bénéficiaires et partenaires</p>
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
                "Grâce aux programmes d'alphabétisation de l'AMSS, j'ai pu apprendre à lire et à écrire. Aujourd'hui, je peux
                aider mes enfants avec leurs devoirs et gérer mon petit commerce."
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
                "L'AMSS est un partenaire fiable et expérimenté. Leur approche participative et leur connaissance du terrain
                font la différence dans nos interventions humanitaires."
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
