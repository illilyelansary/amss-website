import React, { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ListTree, ShieldCheck, Clock, Users, Database, Share2, Lock, Cookie, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'

const sections = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'donnees', label: 'Données collectées' },
  { id: 'finalites', label: 'Finalités' },
  { id: 'base-legale', label: 'Base légale' },
  { id: 'durees', label: 'Durées de conservation' },
  { id: 'partage', label: 'Partage des données' },
  { id: 'securite', label: 'Sécurité' },
  { id: 'droits', label: 'Vos droits' },
  { id: 'cookies', label: 'Cookies' },
  { id: 'contact', label: 'Contact' },
]

export default function PolitiqueConfidentialitePage() {
  const { hash } = useLocation()
  const [activeId, setActiveId] = useState(sections[0].id)

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
  }, [hash])

  useEffect(() => {
    const obs = new IntersectionObserver((entries)=>{
      const v = entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)
      if (v[0]) setActiveId(v[0].target.id)
    }, { rootMargin:'0px 0px -70% 0px', threshold:[0.01,0.25,0.6]})
    sections.forEach(s=>{
      const el = document.getElementById(s.id)
      if (el) obs.observe(el)
    })
    return ()=>obs.disconnect()
  }, [])

  const smooth = (e, id) => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({behavior:'smooth', block:'start'}) }

  const TocDesktop = useMemo(()=>(
    <nav className="hidden xl:block sticky top-24 self-start bg-white/80 backdrop-blur border rounded-2xl p-4 w-72">
      <div className="flex items-center gap-2 mb-3 text-sm font-medium"><ListTree className="h-4 w-4" />Sommaire</div>
      <ul className="space-y-2">
        {sections.map(s=>(
          <li key={s.id}>
            <a href={`#${s.id}`} onClick={(e)=>smooth(e,s.id)}
               className={`block text-sm px-2 py-1 rounded transition-colors ${activeId===s.id?'text-primary bg-primary/10':'text-muted-foreground hover:text-primary hover:bg-muted'}`}>
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  ), [activeId])

  const TocMobile = (
    <div className="xl:hidden sticky top-16 z-40 bg-white/95 backdrop-blur border-b">
      <div className="container mx-auto px-4 py-2 overflow-x-auto no-scrollbar">
        <div className="flex gap-2">
          {sections.map(s=>(
            <a key={s.id} href={`#${s.id}`} onClick={(e)=>smooth(e,s.id)}>
              <Button size="sm" variant={activeId===s.id?'default':'outline'}>{s.label}</Button>
            </a>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      {TocMobile}

      <section className="py-16 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Politique de confidentialité</h1>
            <p className="text-lg text-muted-foreground">Comment l’AMSS collecte, utilise et protège vos données personnelles.</p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 xl:grid-cols-[1fr_20rem] gap-8">
            <div className="space-y-10 max-w-3xl">
              <div id="introduction" className="scroll-mt-24">
                <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-primary" /> Introduction</h2>
                <p className="text-muted-foreground">
                  L’AMSS s’engage à protéger vos données conformément aux réglementations applicables. Cette politique explique nos pratiques de traitement.
                </p>
              </div>

              <div id="donnees" className="scroll-mt-24">
                <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2"><Database className="h-5 w-5 text-accent" /> Données collectées</h2>
                <ul className="text-muted-foreground list-disc pl-6 space-y-1">
                  <li>Coordonnées (nom, email, téléphone) — formulaires, newsletter, dons</li>
                  <li>Données d’usage (pages visitées, logs) — mesure d’audience</li>
                  <li>Données de don (montant, mode de paiement) — justificatifs</li>
                </ul>
              </div>

              <div id="finalites" className="scroll-mt-24">
                <h2 className="text-2xl font-semibold mb-3">Finalités</h2>
                <ul className="text-muted-foreground list-disc pl-6 space-y-1">
                  <li>Gestion des demandes et relations partenaires</li>
                  <li>Envoi d’informations et newsletters</li>
                  <li>Gestion des dons et redevabilité</li>
                  <li>Amélioration du site et statistiques</li>
                </ul>
              </div>

              <div id="base-legale" className="scroll-mt-24">
                <h2 className="text-2xl font-semibold mb-3">Base légale</h2>
                <p className="text-muted-foreground">
                  Consentement (newsletter), exécution de mesures précontractuelles/contractuelles, intérêt légitime (sécurité, statistiques).
                </p>
              </div>

              <div id="durees" className="scroll-mt-24">
                <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2"><Clock className="h-5 w-5 text-primary" /> Durées de conservation</h2>
                <p className="text-muted-foreground">
                  Les données sont conservées pour la durée nécessaire aux finalités, puis archivées ou supprimées conformément aux obligations légales.
                </p>
              </div>

              <div id="partage" className="scroll-mt-24">
                <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2"><Share2 className="h-5 w-5 text-primary" /> Partage des données</h2>
                <p className="text-muted-foreground">
                  Transfert limité à des prestataires habilités et partenaires dans le cadre des finalités ci-dessus. Pas de vente de données.
                </p>
              </div>

              <div id="securite" className="scroll-mt-24">
                <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2"><Lock className="h-5 w-5 text-accent" /> Sécurité</h2>
                <p className="text-muted-foreground">
                  Mesures techniques et organisationnelles raisonnables pour protéger l’intégrité et la confidentialité.
                </p>
              </div>

              <div id="droits" className="scroll-mt-24">
                <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2"><Users className="h-5 w-5 text-primary" /> Vos droits</h2>
                <p className="text-muted-foreground">
                  Accès, rectification, opposition, effacement, limitation, portabilité. Pour exercer : <a className="underline" href="mailto:info@ong-amss.org">info@ong-amss.org</a>.
                </p>
              </div>

              <div id="cookies" className="scroll-mt-24">
                <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2"><Cookie className="h-5 w-5 text-primary" /> Cookies</h2>
                <p className="text-muted-foreground">
                  Cookies techniques et mesure d’audience. Vous pouvez configurer votre navigateur pour les refuser.
                </p>
              </div>

              <div id="contact" className="scroll-mt-24">
                <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2"><Mail className="h-5 w-5 text-primary" /> Contact</h2>
                <p className="text-muted-foreground">
                  Délégué à la protection des données (si applicable) : <em>(à compléter)</em> — <a className="underline" href="mailto:info@ong-amss.org">info@ong-amss.org</a>
                </p>
              </div>
            </div>

            {TocDesktop}
          </div>
        </div>
      </section>
    </div>
  )
}
