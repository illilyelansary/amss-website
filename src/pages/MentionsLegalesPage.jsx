import React, { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ListTree, Building2, Shield, Globe, Mail, Phone, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'

const sections = [
  { id: 'editeur', label: "Éditeur du site" },
  { id: 'hebergeur', label: "Hébergeur" },
  { id: 'propriete', label: "Propriété intellectuelle" },
  { id: 'responsabilite', label: "Responsabilité" },
  { id: 'donnees', label: "Données personnelles" },
  { id: 'cookies', label: "Cookies" },
  { id: 'droit', label: "Droit applicable" },
  { id: 'contact', label: "Contact" },
]

export default function MentionsLegalesPage() {
  const { hash, pathname } = useLocation()
  const [activeId, setActiveId] = useState(sections[0].id)

  // Scroll auto vers ancre
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
  }, [hash])

  // Surligner la section visible
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      const visible = entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)
      if (visible[0]) setActiveId(visible[0].target.id)
    }, { rootMargin: '0px 0px -70% 0px', threshold: [0.01,0.25,0.6] })
    const els = sections.map(s=>document.getElementById(s.id)).filter(Boolean)
    els.forEach(el=>obs.observe(el))
    return ()=>obs.disconnect()
  }, [])

  const smooth = (e, id) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior:'smooth', block:'start' })
  }

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
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Mentions légales</h1>
            <p className="text-lg text-muted-foreground">Informations légales relatives au présent site et à son éditeur.</p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 xl:grid-cols-[1fr_20rem] gap-8">
            <div className="space-y-10 max-w-3xl">
              <div id="editeur" className="scroll-mt-24">
                <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2"><Building2 className="h-5 w-5 text-primary" /> Éditeur du site</h2>
                <p className="text-muted-foreground">
                  <strong>AMSS – Association Malienne pour la Survie au Sahel</strong><br />
                  BP 153 Bamako, 152 Tombouctou, Mali<br />
                  Tél. : +223 21 92 10 48 — Email : <a href="mailto:info@ong-amss.org" className="underline">info@ong-amss.org</a><br />
                  Responsable de la publication : <em>(à compléter)</em>
                </p>
              </div>

              <div id="hebergeur" className="scroll-mt-24">
                <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2"><Globe className="h-5 w-5 text-accent" /> Hébergeur</h2>
                <p className="text-muted-foreground">
                  <em>Nom de l’hébergeur</em> – <em>Adresse complète</em> – <em>Pays</em><br />
                  Téléphone : <em>(à compléter)</em>
                </p>
              </div>

              <div id="propriete" className="scroll-mt-24">
                <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2"><FileText className="h-5 w-5 text-primary" /> Propriété intellectuelle</h2>
                <p className="text-muted-foreground">
                  Le contenu de ce site (textes, visuels, logos) est la propriété de l’AMSS ou de ses partenaires et est protégé par la législation en vigueur. 
                  Toute reproduction, représentation, adaptation ou exploitation est interdite sans autorisation écrite préalable.
                </p>
              </div>

              <div id="responsabilite" className="scroll-mt-24">
                <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2"><Shield className="h-5 w-5 text-primary" /> Responsabilité</h2>
                <p className="text-muted-foreground">
                  L’AMSS met tout en œuvre pour assurer l’exactitude et la mise à jour des informations publiées. 
                  Elle ne saurait toutefois être tenue responsable des erreurs ou omissions, ni de l’usage qui en est fait.
                </p>
              </div>

              <div id="donnees" className="scroll-mt-24">
                <h2 className="text-2xl font-semibold mb-3">Données personnelles</h2>
                <p className="text-muted-foreground">
                  Le traitement des données est détaillé dans notre <Link to="/politique-confidentialite" className="underline">Politique de confidentialité</Link>.
                </p>
              </div>

              <div id="cookies" className="scroll-mt-24">
                <h2 className="text-2xl font-semibold mb-3">Cookies</h2>
                <p className="text-muted-foreground">
                  Ce site peut utiliser des cookies techniques et statistiques. Vous pouvez configurer votre navigateur pour les refuser.
                </p>
              </div>

              <div id="droit" className="scroll-mt-24">
                <h2 className="text-2xl font-semibold mb-3">Droit applicable</h2>
                <p className="text-muted-foreground">
                  Les présentes mentions légales sont régies par le droit malien. En cas de litige, les tribunaux compétents seront ceux du ressort de Bamako.
                </p>
              </div>

              <div id="contact" className="scroll-mt-24">
                <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2"><Mail className="h-5 w-5 text-primary" /> Contact</h2>
                <p className="text-muted-foreground">
                  Pour toute question : <a href="mailto:info@ong-amss.org" className="underline">info@ong-amss.org</a> | <a href="/#contact" className="underline">Formulaire de contact</a>
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
