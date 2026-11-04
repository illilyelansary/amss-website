// src/pages/BasesPage.jsx — liste des bases AMSS, reliées à leurs régions, projets et partenaires
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Building2, Phone, ArrowRight } from 'lucide-react'
import { bases } from '@/data/reseau'
import { LiensZones, lienBase } from '@/components/liens/Liens'

export default function BasesPage() {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [])
  return (
    <div className="min-h-screen bg-background">
      <section className="py-16 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Nos bases</h1>
          <p className="text-lg text-muted-foreground">
            Le siège de Tombouctou, la coordination de Bamako et nos bases régionales : chacune est reliée
            aux régions qu’elle couvre, aux projets qui s’y déroulent et à leurs partenaires.
          </p>
        </div>
      </section>
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bases.map((b) => {
            const enCours = b.projets.filter((p) => p.status !== 'Terminé').length
            return (
              <article key={b.slug} className="bg-white border rounded-xl p-6 shadow-sm flex flex-col">
                <div className="text-xs text-muted-foreground">{b.type}</div>
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  <Link to={lienBase(b.slug)} className="hover:text-primary hover:underline">{b.ville}</Link>
                </h2>
                {b.telephones?.[0] && (
                  <div className="text-sm text-muted-foreground mt-1 inline-flex items-center gap-1"><Phone className="h-3 w-3" />{b.telephones[0]}</div>
                )}
                <div className="mt-3"><LiensZones regions={b.regions} vide="Coordination nationale" /></div>
                <div className="mt-3 text-sm">
                  <strong>{b.projets.length}</strong> projets dont {enCours} en cours · <strong>{b.partenaires.length}</strong> partenaires
                </div>
                <Link to={lienBase(b.slug)} className="mt-auto pt-4 inline-flex items-center text-primary text-sm hover:underline">
                  Voir la base <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </article>
            )
          })}
        </div>
      </section>
    </div>
  )
}
