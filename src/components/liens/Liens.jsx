// src/components/liens/Liens.jsx
// Petits composants de liens réutilisés partout : projet ↔ partenaires ↔ zones ↔ bases.
import { Link } from 'react-router-dom'
import { MapPin, Handshake, Building2 } from 'lucide-react'
import { partenairesBySlug, basesBySlug, zoneKey } from '@/data/reseau'

export const lienProjet = (p) => (p?.slug ? `/projets/${p.slug}` : '/projets')
export const lienPartenaire = (slug) => `/partenaires/${slug}`
export const lienZone = (label) => `/zones#zone-${zoneKey(label)}`
export const lienBase = (slug) => `/bureaux/${slug}`

const chip = 'inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-xs bg-white hover:bg-muted hover:text-primary transition-colors'

/** Titre de projet cliquable */
export function TitreProjet({ p, className = '' }) {
  if (!p?.slug) return <span className={className}>{p?.title}</span>
  return (
    <Link to={lienProjet(p)} className={`hover:text-primary hover:underline ${className}`}>
      {p.title}
    </Link>
  )
}

/** Régions cliquables (vers la zone sur la page Zones) */
export function LiensZones({ regions = [], vide = 'N/D', icon = true }) {
  if (!regions.length) return <span className="text-muted-foreground">{vide}</span>
  return (
    <span className="inline-flex flex-wrap gap-1 justify-end">
      {regions.map((r) => (
        <Link key={r} to={lienZone(r)} className={chip}>
          {icon && <MapPin className="h-3 w-3" />}{r}
        </Link>
      ))}
    </span>
  )
}

/** Partenaires cliquables (vers leur fiche) */
export function LiensPartenaires({ slugs = [], vide = 'N/D', icon = false }) {
  const list = slugs.map((s) => partenairesBySlug.get(s)).filter(Boolean)
  if (!list.length) return <span className="text-muted-foreground">{vide}</span>
  return (
    <span className="inline-flex flex-wrap gap-1 justify-end">
      {list.map((p) => (
        <Link key={p.slug} to={lienPartenaire(p.slug)} className={chip} title={p.name}>
          {icon && <Handshake className="h-3 w-3" />}{p.acronym}
        </Link>
      ))}
    </span>
  )
}

/** Bases AMSS cliquables (vers leur fiche) */
export function LiensBases({ slugs = [], vide = 'N/D' }) {
  const list = slugs.map((s) => basesBySlug.get(s)).filter(Boolean)
  if (!list.length) return <span className="text-muted-foreground">{vide}</span>
  return (
    <span className="inline-flex flex-wrap gap-1 justify-end">
      {list.map((b) => (
        <Link key={b.slug} to={lienBase(b.slug)} className={chip}>
          <Building2 className="h-3 w-3" />{b.ville}
        </Link>
      ))}
    </span>
  )
}

/** Liste compacte de projets cliquables avec leur statut */
export function ListeProjets({ projets = [], vide = 'Aucun projet.' }) {
  if (!projets.length) return <p className="text-sm text-muted-foreground">{vide}</p>
  const couleur = (s) => (s === 'En cours' ? 'bg-green-100 text-green-700' : s === 'Suspendu' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700')
  return (
    <ul className="divide-y border rounded-lg bg-white">
      {projets.map((p) => (
        <li key={p.slug} className="p-3 flex flex-col sm:flex-row sm:items-start gap-2">
          <span className={`shrink-0 text-xs px-2 py-0.5 rounded ${couleur(p.status)}`}>{p.status}</span>
          <div className="flex-1 min-w-0">
            <TitreProjet p={p} className="font-medium text-sm" />
            <div className="text-xs text-muted-foreground mt-0.5">
              {[p.startDate?.slice(0, 4), p.endDate?.slice(0, 4)].filter(Boolean).join(' – ')}
              {p.region ? ` · ${p.region}` : ''}
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
