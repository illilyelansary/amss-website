import React, { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ListTree, FilePieChart, Users, Handshake, ShieldAlert, FolderDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

/**
 * 🔎 Configuration requise côté projet
 * 1) Télécharge le build officiel de PDF.js (version "generic") depuis https://github.com/mozilla/pdf.js/releases
 * 2) Place le dossier extrait dans `public/pdfjs/` afin d'avoir le viewer à l'URL: `/pdfjs/web/viewer.html`
 * 3) Héberge tes PDFs (ou place-les dans `public/docs/…`).
 * 4) Cet écran intègre le viewer PDF.js en iframe, avec téléchargement/impression désactivés
 *    et protections basiques (pas infaillibles) contre la copie.
 */

const sections = [
  { id: 'principes', label: 'Nos principes' },
  { id: 'financements', label: 'Financements & gouvernance' },
  { id: 'rapports', label: 'Rapports & audits' },
  { id: 'redevabilite', label: 'Redevabilité & plaintes' },
  { id: 'documents', label: 'Documents à consulter' },
]

// 👉 Renseigne ici la liste de tes documents (titres + URL du PDF)
const DOCUMENTS = [
  { title: "Statuts et Règlement intérieur notariés", url: "/docs/Statuts-et-reglement-interieur-notaries.pdf" },
  { title: "Accord Cadre AMSS et Avenant", url: "/docs/Accord-Cadre-AMSS-et-Avenant.pdf" },
  // Nouveau : Résumé du Rapport Annuel 2024
  { title: "Résumé du Rapport Annuel 2024", url: "/docs/Resum%C3%A9%20Rapport%202024.pdf" }
]

function PdfViewer({ fileUrl, title }) {
  // URL du viewer PDF.js local + options
  const viewerBase = '/pdfjs/web/viewer.html'
  const params = new URLSearchParams({
    file: fileUrl,                     // chemin du PDF
    disablePrint: 'true',              // désactive l'impression
    disableDownload: 'true',           // désactive le bouton de téléchargement
    hideOpenFile: 'true',              // cache le bouton "ouvrir un fichier"
    // textLayerMode: '1',             // (optionnel) pour garder la sélection de texte (mettre 0 si tu veux la bloquer côté viewer)
  })
  const src = `${viewerBase}?${params.toString()}`

  return (
    <div className="w-full border rounded-xl overflow-hidden">
      <div className="px-4 py-2 text-sm font-medium border-b bg-muted/40 flex items-center justify-between">
        <span>{title}</span>
        <span className="text-xs text-muted-foreground">Consultation uniquement (téléchargement/print désactivés)</span>
      </div>
      <iframe
        title={`PDF: ${title}`}
        src={src}
        // ⚠️ Sandbox: on autorise scripts & same-origin (nécessaires au viewer) mais PAS les téléchargements
        sandbox="allow-scripts allow-same-origin"
        referrerPolicy="no-referrer"
        className="w-full"
        style={{ height: 600 }}
      />
    </div>
  )
}

export default function TransparencePage() {
  const { hash } = useLocation()
  const [activeId, setActiveId] = useState(sections[0].id)

  // Défilement vers une ancre si présente
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
  }, [hash])

  // Surbrillance section active
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

  // 🔒 Protections front contre la copie (limitées mais dissuasives)
  useEffect(() => {
    const prevent = (e) => e.preventDefault()
    const keydown = (e) => {
      // Bloque quelques raccourcis courants (Ctrl/Cmd+S, P, U, C)
      if ((e.ctrlKey || e.metaKey) && ['s','p','u','c'].includes(e.key.toLowerCase())) {
        e.preventDefault()
      }
    }
    document.addEventListener('contextmenu', prevent)
    document.addEventListener('copy', prevent)
    document.addEventListener('cut', prevent)
    document.addEventListener('keydown', keydown)
    return () => {
      document.removeEventListener('contextmenu', prevent)
      document.removeEventListener('copy', prevent)
      document.removeEventListener('cut', prevent)
      document.removeEventListener('keydown', keydown)
    }
  }, [])

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
                  <li>Rapport d’activités annuel (consultable ci-dessous)</li>
                  <li>Rapports financiers et audits externes (consultables ci-dessous)</li>
                  <li>Rapports de projets (sélection) (consultables ci-dessous)</li>
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
                <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2"><FolderDown className="h-5 w-5 text-accent" /> Documents à consulter</h2>

                <div className="space-y-6">
                  {DOCUMENTS.map((doc) => (
                    <PdfViewer key={doc.url} fileUrl={encodeURI(doc.url)} title={doc.title} />
                  ))}
                </div>

                <p className="text-xs text-muted-foreground mt-4">
                  ⚠️ Malgré ces protections, aucune solution web ne peut empêcher totalement la copie (captures d’écran, photo, etc.).
                  Pour renforcer la dissuasion, tu peux ajouter un filigrane sur les PDFs en amont.
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
