// src/pages/PartenaireDetailPage.jsx — fiche d’un partenaire, reliée à ses projets, zones et bases
import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Globe, MapPin, Building2, Clock, CheckCircle } from 'lucide-react'
import { partenairesBySlug } from '@/data/reseau'
import { LiensZones, LiensBases, ListeProjets } from '@/components/liens/Liens'

export default function PartenaireDetailPage() {
  const { slug } = useParams()
  const p = partenairesBySlug.get(String(slug || '').toLowerCase())
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [slug])

  if (!p) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-semibold mb-4">Partenaire introuvable</h1>
        <Link to="/partenaires" className="text-primary underline">Voir tous les partenaires</Link>
      </div>
    )
  }
  const enCours = p.projets.filter((x) => x.status !== 'Terminé')
  const termines = p.projets.filter((x) => x.status === 'Terminé')

  return (
    <div className="min-h-screen bg-background">
      <section className="py-12 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4 max-w-5xl">
          <Link to="/partenaires" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
            <ArrowLeft className="h-4 w-4 mr-1" /> Tous les partenaires
          </Link>
          <div className="flex items-start gap-5">
            <img
              src={p.logo || '/assets/partenaires/placeholder.png'} alt="" loading="lazy"
              className="h-20 w-20 object-contain rounded-lg border bg-white p-1"
              onError={(e) => { e.currentTarget.src = '/assets/partenaires/placeholder.png' }}
            />
            <div>
              <div className="text-sm text-muted-foreground">{p.type}{p.roles.length ? ` · ${p.roles.join(' et ')}` : ''}</div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">{p.acronym}</h1>
              {p.name !== p.acronym && <p className="text-lg text-muted-foreground">{p.name}</p>}
              {p.website && (
                <a href={p.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-primary text-sm hover:underline mt-2">
                  <Globe className="h-4 w-4 mr-1" /> Site officiel
                </a>
              )}
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Stat label="Projets en cours" value={enCours.length} />
            <Stat label="Projets terminés" value={termines.length} />
            <Stat label="Régions" value={p.regions.length} />
            <Stat label="Bases AMSS" value={p.bases.length} />
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="container mx-auto px-4 max-w-5xl space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border rounded-xl p-5">
              <h2 className="font-semibold mb-3 flex items-center gap-2"><MapPin className="h-5 w-5 text-primary" /> Zones d’intervention communes</h2>
              <LiensZones regions={p.regions} vide="Aucune zone (partenaire sans projet dans le registre actuel)." />
            </div>
            <div className="bg-white border rounded-xl p-5">
              <h2 className="font-semibold mb-3 flex items-center gap-2"><Building2 className="h-5 w-5 text-primary" /> Bases AMSS concernées</h2>
              <LiensBases slugs={p.bases} vide="Aucune base." />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2"><Clock className="h-5 w-5 text-primary" /> Projets en cours ({enCours.length})</h2>
            <ListeProjets projets={enCours} vide="Aucun projet en cours avec ce partenaire." />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" /> Projets terminés ({termines.length})</h2>
            <ListeProjets projets={termines} vide="Aucun projet terminé enregistré." />
          </div>
        </div>
      </section>
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div className="bg-white rounded-xl p-4 border shadow-sm">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-2xl font-semibold">{value}</div>
    </div>
  )
}
