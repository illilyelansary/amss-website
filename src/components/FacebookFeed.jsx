// src/components/FacebookFeed.jsx
// Flux de la page Facebook (Page Plugin officiel), à la bonne largeur.
// Le plugin Facebook n'accepte qu'une largeur fixe entre 180 et 500 px : on mesure le conteneur
// et on recharge l'iframe à la bonne taille (ordinateur, tablette, téléphone).
// Si le navigateur bloque Facebook (bloqueur de pub, protection contre le pistage),
// un message et les dernières publications reprises sur le site s'affichent à la place.
import { useEffect, useRef, useState } from 'react'
import { ExternalLink } from 'lucide-react'
import FacebookDefilant from '@/components/FacebookDefilant'

const clamp = (n, min, max) => Math.max(min, Math.min(max, Math.floor(n)))

export default function FacebookFeed({ pageUrl, height = 650, publications = [] }) {
  // Onglet par défaut : les publications qui défilent ; le fil officiel ne se charge qu'à la demande
  const [onglet, setOnglet] = useState(publications.length ? 'defilement' : 'fil')
  return (
    <div>
      {publications.length > 0 && (
        <div className="flex gap-2 mb-3" role="tablist">
          {[['defilement', 'Publications'], ['fil', 'Fil Facebook officiel']].map(([k, label]) => (
            <button
              key={k} type="button" role="tab" aria-selected={onglet === k} onClick={() => setOnglet(k)}
              className={`px-3 py-1.5 rounded-full text-sm border ${onglet === k ? 'bg-primary text-white border-primary' : 'bg-white text-muted-foreground hover:text-primary'}`}
            >
              {label}
            </button>
          ))}
        </div>
      )}
      {onglet === 'defilement'
        ? <FacebookDefilant publications={publications} hauteur={height} />
        : <FilOfficiel pageUrl={pageUrl} height={height} />}
    </div>
  )
}

/** Fil officiel (Page Plugin Facebook) à la largeur du conteneur */
function FilOfficiel({ pageUrl, height }) {
  const boxRef = useRef(null)
  const [width, setWidth] = useState(0)
  const [charge, setCharge] = useState(false)
  const [bloque, setBloque] = useState(false)

  // Largeur du conteneur, recalculée au redimensionnement (avec un léger délai)
  useEffect(() => {
    const el = boxRef.current
    if (!el) return
    let t
    const mesure = () => setWidth(clamp(el.clientWidth, 180, 500))
    mesure()
    if (typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(() => { clearTimeout(t); t = setTimeout(mesure, 200) })
    ro.observe(el)
    return () => { ro.disconnect(); clearTimeout(t) }
  }, [])

  // Si l'iframe ne se charge pas en 8 s, on considère que Facebook est bloqué
  useEffect(() => {
    if (!width) return
    setCharge(false); setBloque(false)
    const t = setTimeout(() => setBloque((b) => b || !chargeRef.current), 8000)
    return () => clearTimeout(t)
  }, [width])
  const chargeRef = useRef(false)
  useEffect(() => { chargeRef.current = charge }, [charge])

  const src = `https://www.facebook.com/plugins/page.php?${new URLSearchParams({
    href: pageUrl,
    tabs: 'timeline',
    width: String(width || 340),
    height: String(height),
    small_header: 'false',
    adapt_container_width: 'true',
    hide_cover: 'false',
    show_facepile: 'false',
    lazy: 'true',
    locale: 'fr_FR',
  }).toString()}`

  return (
    <div>
      <div ref={boxRef} className="w-full flex justify-center" style={{ minHeight: height }}>
        {width > 0 && (
          <iframe
            key={width}
            title="Publications Facebook de l’AMSS"
            src={src}
            width={width}
            height={height}
            style={{ border: 'none', overflow: 'hidden', maxWidth: '100%' }}
            scrolling="no"
            frameBorder="0"
            loading="lazy"
            onLoad={() => setCharge(true)}
            allow="clipboard-write; encrypted-media; picture-in-picture; web-share"
          />
        )}
      </div>

      {bloque && (
        <p className="mt-3 text-sm text-muted-foreground">
          Le flux Facebook ne s’affiche pas ? Votre navigateur ou un bloqueur de publicité l’empêche peut-être.{' '}
          <a href={pageUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
            Ouvrir la page Facebook <ExternalLink className="h-3 w-3" />
          </a>
        </p>
      )}

    </div>
  )
}
