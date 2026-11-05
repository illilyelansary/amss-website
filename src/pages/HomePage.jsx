// src/pages/HomePage.jsx
import React, { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import HeroSection from '../components/HeroSection'
import DomainesSection from '../components/DomainesSection'
import ZonesSection from '../components/ZonesSection'
import { Button } from '@/components/ui/button'
import { ArrowRight, ListTree, MapPin, Calendar } from 'lucide-react'
import { actualites } from '@/data/actualitesData'
import { projetsEnCours } from '@/data/reseau'
import { TitreProjet, LiensZones, LiensPartenaires } from '@/components/liens/Liens'

// 3 dernières actualités (les plus récentes d’abord)
const dernieresActus = [...actualites].sort((a, b) => String(b.dateISO).localeCompare(String(a.dateISO))).slice(0, 3)
// Projets en cours à la une : les plus récents
const projetsUne = projetsEnCours.filter((p) => p.status === 'En cours').slice(0, 6)
const fmtDate = (d) => (d ? new Date(d + 'T00:00:00').toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : '')

const sections = [
  { id: 'top', label: 'Haut de page' },
  { id: 'actualites', label: 'Actualités' },
  { id: 'domaines', label: 'Domaines' },
  { id: 'zones', label: 'Zones' },
  { id: 'projets-une', label: 'Projets en cours' }
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
            {dernieresActus.map((a) => (
              <article key={a.slug} className="bg-white rounded-xl shadow-sm border border-border overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
                <img src={a.image || '/placeholder-news.jpg'} alt="" loading="lazy" className="w-full h-48 object-cover" onError={(e) => { e.currentTarget.src = '/placeholder-news.jpg' }} />
                <div className="p-6 flex flex-col flex-1">
                  <div className="text-xs text-muted-foreground mb-2 inline-flex items-center gap-1"><Calendar className="h-3 w-3" />{fmtDate(a.dateISO)}</div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">{a.titre}</h3>
                  {a.excerpt && <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{a.excerpt}</p>}
                  <Button variant="outline" size="sm" asChild className="mt-auto self-start">
                    <Link to={`/actualites/${a.slug}`} aria-label={`Lire : ${a.titre}`}>
                      Lire la suite
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </article>
            ))}
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

      {/* Projets en cours à la une (mis à jour automatiquement depuis le registre) */}
      <section id="projets-une" className="py-16 bg-muted/30 scroll-mt-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Projets en cours</h2>
            <p className="text-xl text-muted-foreground">Les projets que l’AMSS met en œuvre actuellement avec ses partenaires</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {projetsUne.map((p) => (
              <article key={p.slug} className="bg-white p-6 rounded-xl shadow-sm border border-border flex flex-col">
                <div className="text-xs text-muted-foreground mb-2">
                  {[p.startDate?.slice(0, 4), p.endDate?.slice(0, 4)].filter(Boolean).join(' – ')}
                </div>
                <h3 className="font-semibold text-foreground mb-3 leading-snug"><TitreProjet p={p} /></h3>
                <div className="mt-auto space-y-2 text-sm">
                  <div className="flex justify-between gap-3"><span className="text-muted-foreground">Zones</span><LiensZones regions={p.regions || []} icon={false} /></div>
                  <div className="flex justify-between gap-3"><span className="text-muted-foreground">Bailleur</span><LiensPartenaires slugs={p.bailleurs} /></div>
                </div>
              </article>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button asChild>
              <Link to="/projets-en-cours">Voir tous les projets en cours ({projetsEnCours.length})</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
