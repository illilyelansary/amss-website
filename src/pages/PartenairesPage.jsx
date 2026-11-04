// src/pages/PartenairesPage.jsx — partenaires reliés à leurs projets, zones et bases
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Handshake, Globe, MapPin, ArrowRight, Clock, CheckCircle, Building2, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { partenaires, projetsEnCours, projetsTermines, zones } from '@/data/reseau'
import { LiensZones, LiensBases, lienPartenaire } from '@/components/liens/Liens'

const norm = (s) => String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

export default function PartenairesPage() {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [])
  const [q, setQ] = useState('')
  const [role, setRole] = useState('Tous')

  const actifs = partenaires.filter((p) => p.projets.length)
  const historiques = partenaires.filter((p) => !p.projets.length)
  const filtres = useMemo(() => {
    const n = norm(q)
    return actifs.filter((p) =>
      (!n || norm(`${p.acronym} ${p.name}`).includes(n)) &&
      (role === 'Tous' || p.roles.includes(role)))
  }, [q, role, actifs])

  return (
    <div className="min-h-screen bg-background">
      <section className="py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Nos Partenaires</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Bailleurs, agences des Nations Unies, ONG internationales et nationales : chaque partenaire est relié
            à ses projets, aux zones où nous intervenons ensemble et aux bases de l’AMSS concernées.
          </p>
        </div>
      </section>

      <section className="py-10 bg-white/60 border-y">
        <div className="container mx-auto px-4 max-w-6xl grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2 bg-white border rounded-xl p-6 shadow-sm space-y-3">
            <label className="text-xs text-muted-foreground block">Rechercher un partenaire</label>
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
              <input
                type="text" value={q} onChange={(e) => setQ(e.target.value)}
                placeholder="Ex. UNHCR, UNICEF, Fondation Strømme…"
                className="w-full pl-9 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full px-3 py-2 border rounded-lg">
              <option value="Tous">Tous les rôles</option>
              <option value="Bailleur">Bailleurs</option>
              <option value="Partenaire de mise en œuvre">Partenaires de mise en œuvre</option>
            </select>
          </div>
          <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Stat icon={Handshake} label="Partenaires actifs" value={actifs.length} />
            <Stat icon={Clock} label="Projets en cours" value={projetsEnCours.length} />
            <Stat icon={CheckCircle} label="Projets terminés" value={projetsTermines.length} />
            <Stat icon={MapPin} label="Régions" value={zones.filter((z) => z.projets.length).length} />
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          {filtres.length === 0 ? (
            <p className="text-center text-muted-foreground">Aucun partenaire ne correspond à la recherche.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtres.map((p) => {
                const enCours = p.projets.filter((x) => x.status !== 'Terminé').length
                return (
                  <article key={p.slug} className="bg-white rounded-xl p-6 shadow-sm border flex flex-col">
                    <div className="flex items-start gap-4">
                      <img
                        src={p.logo || '/assets/partenaires/placeholder.png'} alt="" loading="lazy"
                        className="h-14 w-14 object-contain rounded-md border bg-white"
                        onError={(e) => { e.currentTarget.src = '/assets/partenaires/placeholder.png' }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-muted-foreground">{p.roles.join(' · ') || p.type}</div>
                        <h3 className="text-lg font-semibold">
                          <Link to={lienPartenaire(p.slug)} className="hover:text-primary hover:underline">{p.acronym}</Link>
                        </h3>
                        {p.name !== p.acronym && <div className="text-sm text-muted-foreground">{p.name}</div>}
                        {p.website && (
                          <a href={p.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-primary text-xs hover:underline mt-1">
                            <Globe className="h-3 w-3 mr-1" /> Site officiel
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="mt-4 text-sm">
                      <span className="font-medium">{p.projets.length} projet{p.projets.length > 1 ? 's' : ''}</span>
                      <span className="text-muted-foreground"> dont {enCours} en cours</span>
                    </div>
                    <div className="mt-3 space-y-2 text-sm">
                      <div><span className="text-muted-foreground block text-xs mb-1">Zones</span><LiensZones regions={p.regions} icon={false} /></div>
                      <div><span className="text-muted-foreground block text-xs mb-1">Bases AMSS</span><LiensBases slugs={p.bases} /></div>
                    </div>
                    <Link to={lienPartenaire(p.slug)} className="mt-auto pt-4 inline-flex items-center text-primary text-sm hover:underline">
                      Voir la fiche et les projets <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </article>
                )
              })}
            </div>
          )}

          {historiques.length > 0 && (
            <div className="mt-14">
              <h2 className="text-xl font-semibold mb-2">Autres partenaires des bases AMSS</h2>
              <p className="text-sm text-muted-foreground mb-4">Partenaires cités par nos bases, sans projet dans le registre actuel des projets.</p>
              <div className="flex flex-wrap gap-2">
                {historiques.map((p) => (
                  <Link key={p.slug} to={lienPartenaire(p.slug)} className="px-3 py-1 rounded-full border bg-white text-sm hover:bg-muted hover:text-primary" title={p.name}>
                    {p.acronym}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">Devenez un partenaire de l’AMSS</h2>
          <p className="text-xl text-muted-foreground mb-8">Ensemble, nous pouvons faire une différence durable pour les populations du Sahel.</p>
          <Link to="/contact"><Button size="lg" className="text-lg px-8 py-3">Nous contacter pour un partenariat</Button></Link>
        </div>
      </section>
    </div>
  )
}

function Stat({ icon, label, value }) {
  const Icon = icon
  return (
    <div className="bg-white border rounded-xl p-5 shadow-sm">
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="mt-1 flex items-center gap-2 text-2xl font-semibold"><Icon className="h-5 w-5" /> {value}</div>
    </div>
  )
}
