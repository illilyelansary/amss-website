import React, { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ListTree, FileSpreadsheet, FilePieChart, Users, Handshake, ShieldAlert, FolderDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

const sections = [
  { id: 'principes', label: 'Nos principes' },
  { id: 'financements', label: 'Financements & gouvernance' },
  { id: 'rapports', label: 'Rapports & audits' },
  { id: 'redevabilite', label: 'Redevabilité & plaintes' },
  { id: 'documents', label: 'Documents à télécharger' },
]

export default function TransparencePage() {
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
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Transparence</h1>
            <p className="text-lg text-muted-foreground">Nos engagements de redevabilité, nos rapports et nos mécanismes de contrôle.</p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 xl:grid-cols-[1fr_20rem] gap-8">
            <div className="space-y-10 max-w-3xl">
              <div id="principes" className="scroll-mt-24">
                <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2"><Users className="h-5 w-5 text-primary" /> Nos principes</h2>
                <p className="text-muted-foreground">
                  L’AMSS applique des standards élevés de transparence, d’éthique et de redevabilité : publication des informations clés,
                  participation communautaire et suivi-évaluation rigoureux.
                </p>
              </div>

              <div id="financements" className="scroll-mt-24">
                <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2"><Handshake className="h-5 w-5 text-accent" /> Financements & gouvernance</h2>
                <p className="text-muted-foreground">
                  Les financements proviennent de bailleurs nationaux et internationaux. La gouvernance comprend un Bureau exécutif,
                  une direction des programmes et des dispositifs de contrôle interne. <Link to="/partenaires" className="underline">Voir nos partenaires</Link>.
                </p>
              </div>

              <div id="rapports" className="scroll-mt-24">
                <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2"><FilePieChart className="h-5 w-5 text-primary" /> Rapports & audits</h2>
                <ul className="text-muted-foreground list-disc pl-6 space-y-1">
                  <li>Rapport d’activités annuel <em>(lien PDF à compléter)</em></li>
                  <li>Rapports financiers et audits externes <em>(liens à compléter)</em></li>
                  <li>Rapports de projets (sélection) <em>(liens à compléter)</em></li>
                </ul>
              </div>

              <div id="redevabilite" className="scroll-mt-24">
                <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2"><ShieldAlert className="h-5 w-5 text-primary" /> Redevabilité & plaintes</h2>
                <p className="text-muted-foreground">
                  Un mécanisme de plaintes et retours est disponible pour les communautés et parties prenantes. 
                  Écrivez à <a className="underline" href="mailto:info@ong-amss.org">info@ong-amss.org</a> ou rendez-vous sur <a className="underline" href="/#contact">la page Contact</a>.
                </p>
              </div>

              <div id="documents" className="scroll-mt-24">
                <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2"><FolderDown className="h-5 w-5 text-accent" /> Documents à télécharger</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Button variant="outline" asChild><a href="#" onClick={(e)=>e.preventDefault()}>Statuts de l’AMSS (PDF)</a></Button>
                  <Button variant="outline" asChild><a href="#" onClick={(e)=>e.preventDefault()}>Politique anticorruption (PDF)</a></Button>
                  <Button variant="outline" asChild><a href="#" onClick={(e)=>e.preventDefault()}>Charte de redevabilité (PDF)</a></Button>
                  <Button variant="outline" asChild><a href="#" onClick={(e)=>e.preventDefault()}>Rapport annuel N-1 (PDF)</a></Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Remplace ces liens par tes fichiers réels (hébergement ou dossier public).</p>
              </div>
            </div>

            {TocDesktop}
          </div>
        </div>
      </section>
    </div>
  )
}
