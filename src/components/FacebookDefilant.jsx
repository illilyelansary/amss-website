// src/components/FacebookDefilant.jsx
// Publications Facebook qui défilent automatiquement (de bas en haut, en boucle).
// Chaque publication est cliquable et s'ouvre directement sur Facebook.
// Le défilement s'arrête au survol, au toucher et au clavier, et est désactivé
// si le visiteur a demandé à réduire les animations.
import { ExternalLink } from 'lucide-react'

const PLACEHOLDER = '/placeholder-news.jpg'

export default function FacebookDefilant({ publications = [], hauteur = 650, secondesParPost = 5 }) {
  if (!publications.length) return null
  const duree = Math.max(20, publications.length * secondesParPost)
  const Carte = ({ p, cache }) => (
    <a
      href={p.facebookUrl}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={cache ? -1 : 0}
      aria-hidden={cache ? 'true' : undefined}
      className="fb-carte flex gap-3 p-3 rounded-lg border bg-white hover:border-primary hover:shadow-md transition"
      title="Voir la publication sur Facebook"
    >
      <img
        src={p.image || PLACEHOLDER}
        alt=""
        loading="lazy"
        className="h-20 w-24 shrink-0 rounded-md object-cover bg-muted"
        onError={(e) => { e.currentTarget.src = PLACEHOLDER }}
      />
      <div className="min-w-0">
        <div className="text-xs text-muted-foreground">{p.date}</div>
        <div className="text-sm font-semibold leading-snug line-clamp-2">{p.titre}</div>
        <div className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{p.excerpt}</div>
        <div className="text-xs text-primary mt-1 inline-flex items-center gap-1">
          Voir sur Facebook <ExternalLink className="h-3 w-3" />
        </div>
      </div>
    </a>
  )

  return (
    <div className="fb-defilant relative overflow-hidden rounded-lg bg-muted/30" style={{ height: hauteur }}>
      <style>{`
        .fb-piste { animation: fb-defile ${duree}s linear infinite; }
        .fb-defilant:hover .fb-piste,
        .fb-defilant:focus-within .fb-piste,
        .fb-defilant:active .fb-piste { animation-play-state: paused; }
        @keyframes fb-defile { from { transform: translateY(0); } to { transform: translateY(-50%); } }
        @media (prefers-reduced-motion: reduce) {
          .fb-piste { animation: none; }
          .fb-defilant { overflow-y: auto; }
          .fb-double { display: none; }
        }
      `}</style>
      {/* La liste est doublée pour que la boucle soit continue */}
      <div className="fb-piste flex flex-col">
        <ul className="flex flex-col gap-3 p-3">
          {publications.map((p) => <li key={p.slug}><Carte p={p} /></li>)}
        </ul>
        <ul className="fb-double flex flex-col gap-3 p-3" aria-hidden="true">
          {publications.map((p) => <li key={`b-${p.slug}`}><Carte p={p} cache /></li>)}
        </ul>
      </div>
      {/* Fondus haut et bas */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-white to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white to-transparent" />
    </div>
  )
}
