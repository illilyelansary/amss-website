// src/pages/DetailsBureauPage.jsx
import { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Users, Globe, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Données & utils (conservent vos chemins existants)
import { bureaux } from '@/data/bureaux'
import { projetsEnCours, projetsTermines } from '@/data/projetsData'
import { partnersForBureau } from '@/utils/partners'

export default function DetailsBureauPage() {
  const { slug } = useParams()

  // 1) Récupérer le bureau depuis le slug ; fallback = premier bureau
  const bureau = useMemo(() => {
    const s = String(slug || '').toLowerCase()
    const found =
      Array.isArray(bureaux) &&
      bureaux.find(
        (b) =>
          (b.slug && String(b.slug).toLowerCase() === s) ||
          (b.ville && String(b.ville).toLowerCase().includes(s))
      )
    return found || (Array.isArray(bureaux) ? bureaux[0] : null)
  }, [slug])

  // 2) Raccourcis & sécurités
  const emails = (bureau?.emails || []).filter((e) => !!e?.trim())
  const telephones = (bureau?.telephones || []).filter((t) => !!t?.trim())
  const zones = bureau?.zones || []
  const partners = partnersForBureau ? partnersForBureau(bureau?.slug) || [] : []

  // 3) Construire le mailto du CTA (et fallback vers /contact si pas d'email)
  const primaryEmail = emails[0]
  const subject = bureau?.ville ? `Contact – ${bureau.ville}` : 'Contact bureau AMSS'
  const body = `Bonjour,\n\nJe vous contacte à propos de...`
  const mailtoHref = primaryEmail
    ? `mailto:${primaryEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    : null

  // 4) Projets (si vos données sont chargées ainsi)
  const projetsActifs = Array.isArray(projetsEnCours) ? projetsEnCours.filter((p) => p?.bureau === bureau?.slug) : []
  const projetsClotures = Array.isArray(projetsTermines) ? projetsTermines.filter((p) => p?.bureau === bureau?.slug) : []

  if (!bureau) {
    return (
      <div className="container mx-auto max-w-5xl py-8">
        <div className="flex items-center gap-2 mb-6">
          <ArrowLeft className="h-4 w-4" />
          <Link to="/bureaux" className="text-sm underline">
            Retour aux bureaux
          </Link>
        </div>
        <p className="text-muted-foreground">Bureau introuvable.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-5xl py-8">
      {/* Retour */}
      <div className="flex items-center gap-2 mb-6">
        <ArrowLeft className="h-4 w-4" />
        <Link to="/bureaux" className="text-sm underline">
          Retour aux bureaux
        </Link>
      </div>

      {/* En-tête */}
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">{bureau.ville || 'Bureau AMSS'}</h1>
        {bureau?.type && <p className="text-sm text-muted-foreground mt-1">{bureau.type}</p>}
      </header>

      {/* Carte d’infos principales */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl border p-4">
          <h2 className="text-lg font-medium mb-4">Coordonnées</h2>

          {/* Adresse */}
          {bureau?.adresse && (
            <div className="flex items-start gap-2 mb-3">
              <MapPin className="h-4 w-4 mt-1" />
              <div>
                <p>{bureau.adresse}</p>
                {bureau?.coordsQuery && (
                  <a
                    className="text-sm underline text-muted-foreground"
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(bureau.coordsQuery)}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Ouvrir dans Google Maps
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Téléphones */}
          {telephones.length > 0 && (
            <div className="flex items-start gap-2 mb-3">
              <Phone className="h-4 w-4 mt-1" />
              <div className="flex flex-col gap-1">
                {telephones.map((t) => (
                  <a key={t} href={`tel:${t.replace(/\s+/g, '')}`} className="underline">
                    {t}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Emails (liste) */}
          {emails.length > 0 && (
            <div className="flex items-start gap-2 mb-3">
              <Mail className="h-4 w-4 mt-1" />
              <div className="flex flex-col gap-1">
                {emails.map((e) => (
                  <a key={e} href={`mailto:${e}`} className="underline">
                    {e}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Site web (optionnel) */}
          {bureau?.siteWeb && (
            <div className="flex items-start gap-2 mb-2">
              <Globe className="h-4 w-4 mt-1" />
              <a href={bureau.siteWeb} target="_blank" rel="noreferrer" className="underline">
                {bureau.siteWeb}
              </a>
            </div>
          )}

          {/* CTA demandé */}
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

        {/* Infos complémentaires */}
        <div className="rounded-2xl border p-4">
          <h2 className="text-lg font-medium mb-4">Informations</h2>
          {bureau?.responsable && (
            <p className="mb-2">
              <span className="font-medium">Responsable :</span> {bureau.responsable}
            </p>
          )}
          {zones.length > 0 && (
            <p className="mb-2">
              <span className="font-medium">Zones d’intervention :</span> {zones.join(', ')}
            </p>
          )}
          {Array.isArray(partners) && partners.length > 0 && (
            <div className="mt-3">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4" />
                <h3 className="font-medium">Partenaires</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {partners.map((p) => (
                  <span
                    key={p}
                    className="text-xs border rounded-full px-2 py-1 bg-muted/30"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Projets */}
      <section className="mt-8 space-y-6">
        {projetsActifs.length > 0 && (
          <div className="rounded-2xl border p-4">
            <h2 className="text-lg font-medium mb-3">Projets en cours</h2>
            <ul className="list-disc pl-5 space-y-1">
              {projetsActifs.map((p) => (
                <li key={p?.id || p?.titre}>{p?.titre || 'Projet'}</li>
              ))}
            </ul>
          </div>
        )}
        {projetsClotures.length > 0 && (
          <div className="rounded-2xl border p-4">
            <h2 className="text-lg font-medium mb-3">Projets terminés</h2>
            <ul className="list-disc pl-5 space-y-1">
              {projetsClotures.map((p) => (
                <li key={p?.id || p?.titre}>{p?.titre || 'Projet'}</li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  )
}
