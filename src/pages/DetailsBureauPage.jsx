// src/pages/DetailsBureauPage.jsx
import { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Users, Globe, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

import { bureaux } from '@/data/bureaux'
import { projetsEnCours, projetsTermines } from '@/data/projetsData'
import { partnersForBureau } from '@/utils/partners'

export default function DetailsBureauPage() {
  const { slug } = useParams()

  // 1) Trouver le bureau par son slug ; fallback = premier
  const bureau = useMemo(() => {
    const s = String(slug || '').toLowerCase()
    return (Array.isArray(bureaux) && bureaux.find(b => (b.slug || '').toLowerCase() === s)) || (Array.isArray(bureaux) ? bureaux[0] : null)
  }, [slug])

  // 2) Partenaires/bailleurs (si votre util existe déjà)
  const partners = useMemo(
    () => (partnersForBureau ? partnersForBureau(bureau, projetsEnCours, projetsTermines) : []),
    [bureau]
  )

  // 3) Utils
  const telHref = (t) => 'tel:' + String(t || '').replace(/\s+/g, '')

  // 4) CTA mailto + fallback
  const emails = (bureau?.emails || []).filter(e => !!e?.trim())
  const primaryEmail = emails[0]
  const subject = bureau?.ville ? `Contact – ${bureau.ville}` : 'Contact bureau AMSS'
  const body = `Bonjour,\n\nJe vous contacte à propos de …`
  const mailtoHref = primaryEmail
    ? `mailto:${primaryEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    : null

  if (!bureau) {
    return (
      <div className="container mx-auto max-w-5xl py-8">
        <div className="flex items-center gap-2 mb-6">
          <ArrowLeft className="h-4 w-4" />
          <Link to="/bureaux" className="text-sm underline">Retour aux bureaux</Link>
        </div>
        <p className="text-muted-foreground">Bureau introuvable.</p>
      </div>
    )
  }

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
              <Link to="/bureaux">
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

      {/* Carte + Coordonnées (layout comme vos captures) */}
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
              {/* Responsable */}
              {(bureau.responsable || bureau.distinctions) && (
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <div className="font-medium text-foreground mb-1">Responsable</div>
                    {bureau.responsable && <div>{bureau.responsable}</div>}
                    {bureau.distinctions && <div className="italic">{bureau.distinctions}</div>}
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

              {/* Téléphones */}
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

              {/* Emails */}
              {emails.length > 0 && (
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <div className="font-medium text-foreground mb-1">Email(s)</div>
                    <div className="flex flex-wrap gap-2">
                      {emails.map((e, i) => (
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
                        <span key={i} className="inline-block bg-primary/10 text-primary px-2 py-1 rounded text-xs">
                          {z}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="pt-2">
                {mailtoHref ? (
                  <Button asChild className="w-full">
                    <a href={mailtoHref}>Contacter ce bureau</a>
                  </Button>
                ) : (
                  <Button asChild className="w-full" variant="outline" title="Aucune adresse e-mail — redirection vers le formulaire">
                    <Link to="/contact">Contacter (formulaire)</Link>
                  </Button>
                )}
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
            {Array.isArray(partners) && partners.length > 0 ? (
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
