// src/components/ZonesSection.jsx — zones d’intervention de l’accueil, calculées depuis le registre
import { MapPin, Briefcase, Building, Handshake } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { zones, statsGlobales, basesBySlug } from '@/data/reseau'
import { lienZone, lienBase } from '@/components/liens/Liens'

const GROUPES = [
  { titre: 'Nord', regions: ['Tombouctou', 'Taoudénit', 'Gao', 'Ménaka', 'Kidal'] },
  { titre: 'Centre', regions: ['Mopti', 'Bandiagara', 'Douentza', 'Ségou', 'San'] },
  { titre: 'Sud et District', regions: ['Sikasso', 'Koutiala', 'Bougouni', 'Koulikoro', 'Bamako'] },
]

export default function ZonesSection() {
  const actives = zones.filter((z) => z.projets.length)
  return (
    <section id="zones" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Nos Zones d&apos;Intervention</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            L&apos;AMSS intervient dans {statsGlobales.regions} régions du Mali, suivies depuis {statsGlobales.bases} bases,
            pour une action de proximité et une bonne connaissance des contextes.
          </p>
        </div>

        <div className="space-y-10 mb-16">
          {GROUPES.map((g) => {
            const list = actives.filter((z) => g.regions.includes(z.label))
            if (!list.length) return null
            return (
              <div key={g.titre}>
                <h3 className="text-lg font-semibold text-muted-foreground mb-4">{g.titre}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  {list.map((z) => {
                    const enCours = z.projets.filter((p) => p.status !== 'Terminé').length
                    const base = basesBySlug.get(z.bases[0])
                    return (
                      <div key={z.key} className="bg-white rounded-xl p-5 shadow-sm border border-border hover:shadow-lg transition-shadow">
                        <Link to={lienZone(z.label)} className="flex items-center gap-2 mb-4 group">
                          <MapPin className="h-4 w-4 text-primary" />
                          <span className="text-lg font-semibold group-hover:text-primary">{z.label}</span>
                        </Link>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between"><span className="text-muted-foreground inline-flex items-center gap-1"><Briefcase className="h-4 w-4" />En cours</span><strong>{enCours}</strong></div>
                          <div className="flex justify-between"><span className="text-muted-foreground inline-flex items-center gap-1"><Briefcase className="h-4 w-4" />Total</span><strong>{z.projets.length}</strong></div>
                          <div className="flex justify-between"><span className="text-muted-foreground inline-flex items-center gap-1"><Handshake className="h-4 w-4" />Partenaires</span><strong>{z.partenaires.length}</strong></div>
                          {base && (
                            <div className="flex justify-between gap-2"><span className="text-muted-foreground inline-flex items-center gap-1"><Building className="h-4 w-4" />Base</span>
                              <Link to={lienBase(base.slug)} className="text-primary hover:underline text-right">{base.ville.replace(/^Base d.AMSS |^Bureau de /, '')}</Link>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-border">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Du cercle de Goundam à tout le Mali</h3>
              <p className="text-muted-foreground leading-relaxed">
                Créée en 1991, l&apos;AMSS a commencé ses activités dans le cercle de Goundam (région de Tombouctou)
                avant d&apos;étendre progressivement ses interventions au nord, au centre et au sud du pays, ainsi qu&apos;au
                District de Bamako. Les zones suivent le découpage administratif en vigueur depuis 2023.
              </p>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-8 grid grid-cols-2 gap-6 text-center">
              <Link to="/projets-en-cours"><div className="text-3xl font-bold text-primary mb-1">{statsGlobales.projetsEnCours}</div><div className="text-sm text-muted-foreground">Projets en cours</div></Link>
              <Link to="/projets-termines"><div className="text-3xl font-bold text-accent mb-1">{statsGlobales.projetsTermines}</div><div className="text-sm text-muted-foreground">Projets récents terminés</div></Link>
              <Link to="/bureaux"><div className="text-3xl font-bold text-primary mb-1">{statsGlobales.bases}</div><div className="text-sm text-muted-foreground">Bases AMSS</div></Link>
              <Link to="/partenaires"><div className="text-3xl font-bold text-accent mb-1">{statsGlobales.partenaires}</div><div className="text-sm text-muted-foreground">Partenaires</div></Link>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="text-lg px-8 py-3" asChild>
            <Link to="/zones">Voir la carte et les projets par région</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
