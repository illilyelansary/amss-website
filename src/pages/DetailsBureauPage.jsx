// src/pages/DetailsBureauPage.jsx
import { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Users, Globe, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

import { bureaux } from '@/data/bureaux'
import { projetsEnCours, projetsTermines } from '@/data/projetsData' // <-- attention à la casse
import { partnersForBureau } from '@/utils/partners'

export default function DetailsBureauPage() {
  const { slug } = useParams()

  // Trouver le bureau par son slug, sinon fallback sur le premier
  const bureau = useMemo(() => {
    const s = String(slug || '').toLowerCase()
    return bureaux.find(b => (b.slug || '').toLowerCase() === s) || bureaux[0]
  }, [slug])

  // Partenaires/bailleurs déduits automatiquement (cartographie + projets)
  const partners = useMemo(
    () => partnersForBureau(bureau, projetsEnCours, projetsTermines),
    [bureau]
  )

  // Utilitaire pour nettoyer un numéro pour href tel:
  const telHref = (t) => 'tel:' + String(t || '').replace(/\s+/g, '')

  return (
    <div className="min-h-screen bg-background">
      {/* En-tête */}
      <section className="py-12 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              {bureau.ville}
            </h1>
            <Button asChild variant="outline">
              <Link to="/contact">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour
              </Link>
            </Button>
          </div>
          {bureau.type && (
            <p className="max-w-5xl mx-auto text-muted-foreground mt-2">
              {bureau.type}
            </p>
          )}
        </div>
      </section>

      {/* Carte + Coordonnées */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Carte */}
            <div className="lg:col-span-2 rounded-xl overflow-hidden border border-border shadow-sm">
              <iframe
                title={`Carte ${bureau.ville}`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  bureau.coordsQuery || `${bureau.ville} Mali`
                )}&output=embed`}
                className="w-full h-[380px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Coordonnées */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-border space-y-4 text-sm text-muted-foreground">
              {/* Responsable en premier */}
              {(bureau.responsable || bureau.distinctions) && (
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <div className="font-medium text-foreground mb-1">Responsable</div>
                    {bureau.responsable && <div>{bureau.responsable}</div>}
                    {bureau.distinctions && (
                      <div className="italic">{bureau.distinctions}</div>
                    )}
                  </div>
                </div>
              )}

              {/* Adresse */}
              {bureau.adresse && (
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <div className="font-medium text-foreground mb-1">Adresse</div>
                    <div>{bureau.adresse}</div>
                  </div>
                </div>
              )}

              {/* Téléphones (multiples) */}
              {Array.isArray(bureau.telephones) && bureau.telephones.length > 0 && (
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-accent mt-0.5" />
                  <div>
                    <div className="font-medium text-foreground mb-1">Téléphone(s)</div>
                    <div className="space-y-1">
                      {bureau.telephones.map((t, i) => (
                        <div key={i}>
                          <a className="hover:underline" href={telHref(t)}>{t}</a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Emails (multiples) */}
              {Array.isArray(bureau.emails) && bureau.emails.length > 0 && (
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <div className="font-medium text-foreground mb-1">Email(s)</div>
                    <div className="flex flex-wrap gap-2">
                      {bureau.emails.map((e, i) => (
                        <a key={i} className="hover:underline" href={`mailto:${e}`}>
                          {e}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Zones couvertes */}
              {Array.isArray(bureau.zones) && bureau.zones.length > 0 && (
                <div className="flex items-start gap-3">
                  <Globe className="h-5 w-5 text-accent mt-0.5" />
                  <div>
                    <div className="font-medium text-foreground mb-1">Zones couvertes</div>
                    <div className="flex flex-wrap gap-2">
                      {bureau.zones.map((z, i) => (
                        <span
                          key={i}
                          className="inline-block bg-primary/10 text-primary px-2 py-1 rounded text-xs"
                        >
                          {z}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Site web éventuel */}
              {bureau.siteWeb && (
                <div>
                  <a
                    className="hover:underline"
                    target="_blank"
                    rel="noreferrer"
                    href={bureau.siteWeb}
                  >
                    {bureau.siteWeb}
                  </a>
                </div>
              )}

              {/* CTA */}
              <div className="pt-2">
                <Button asChild className="w-full">
                  <Link to="/contact">Contacter ce bureau</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partenaires / Bailleurs */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Partenaires/Bailleurs intervenant dans la zone
            </h2>
            {partners.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {partners.map((p, i) => (
                  <span
                    key={i}
                    className="inline-block bg-white border border-border rounded-lg px-3 py-1 text-sm text-foreground shadow-sm"
                  >
                    {p}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">Aucun partenaire associé trouvé.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
