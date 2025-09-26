import React, { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Calendar, Tag, MapPin, Share2, ChevronLeft } from 'lucide-react'
import { actualites } from '../data/actualitesData'

const ActualiteDetailPage = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const actu = actualites.find(a => a.slug === slug)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [slug])

  if (!actu) {
    return (
      <div className="min-h-screen bg-background">
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl font-bold mb-4">Actualité introuvable</h1>
              <p className="text-muted-foreground mb-6">L’élément demandé n’existe pas ou a été déplacé.</p>
              <Link to="/actualites" className="inline-flex items-center text-primary hover:underline">
                <ChevronLeft className="mr-1 h-4 w-4" /> Retour aux actualités
              </Link>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header visuel */}
      <section className="relative">
        <img src={actu.image} alt={actu.titre} className="w-full h-[360px] object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full px-4">
          <div className="max-w-4xl mx-auto text-white">
            <div className="flex items-center text-sm mb-2">
              <Calendar className="h-4 w-4 mr-2" /><span>{actu.date}</span>
              <Tag className="h-4 w-4 ml-4 mr-2" /><span>{actu.categorie}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold leading-snug">{actu.titre}</h1>
          </div>
        </div>
      </section>

      {/* Corps */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-border p-6">
            <p className="text-lg text-foreground leading-relaxed mb-4">{actu.excerpt}</p>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{actu.contenu}</p>

            {actu.statistiques && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-6 p-4 bg-muted/30 rounded-lg">
                {Object.entries(actu.statistiques).map(([k, v], idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-2xl font-semibold text-primary">{v}</div>
                    <div className="text-xs text-muted-foreground capitalize">{k}</div>
                  </div>
                ))}
              </div>
            )}

            {(actu.lieux || actu.partenaires) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                {actu.lieux && (
                  <div className="text-sm">
                    <div className="font-semibold mb-1 flex items-center">
                      <MapPin className="h-4 w-4 mr-2" /> Lieux
                    </div>
                    <div className="text-muted-foreground">{actu.lieux.join(', ')}</div>
                  </div>
                )}
                {actu.partenaires && (
                  <div className="text-sm">
                    <div className="font-semibold mb-1">Partenaires</div>
                    <div className="text-muted-foreground">{actu.partenaires.join(', ')}</div>
                  </div>
                )}
              </div>
            )}

            <div className="mt-6 flex items-center justify-between">
              <button onClick={() => navigate(-1)} className="inline-flex items-center text-primary hover:underline">
                <ChevronLeft className="mr-1 h-4 w-4" /> Retour
              </button>
              <button className="inline-flex items-center text-muted-foreground hover:text-primary">
                <Share2 className="h-4 w-4 mr-1" /> Partager
              </button>
            </div>
          </div>

          {/* Autres actualités */}
          <div className="max-w-4xl mx-auto mt-10">
            <h3 className="text-xl font-semibold mb-4">Autres actualités</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {actualites
                .filter(a => a.slug !== actu.slug)
                .slice(0, 4)
                .map(a => (
                  <Link to={`/actualites/${a.slug}`} key={a.slug} className="flex gap-3 items-center group">
                    <img src={a.image} alt={a.titre} className="w-24 h-16 object-cover rounded-md border" />
                    <div>
                      <div className="text-sm text-muted-foreground">{a.date}</div>
                      <div className="font-medium group-hover:underline">{a.titre}</div>
                    </div>
                  </Link>
                ))
              }
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ActualiteDetailPage
