// src/pages/ActualiteDetailPage.jsx
import React, { useEffect, useMemo, useState } from 'react'
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom'
import { Calendar, Tag, MapPin, Share2, ChevronLeft, ArrowLeft, ArrowRight, Copy, Check, Home } from 'lucide-react'
import { actualites } from '../data/actualitesData'

// Routes cibles pour les tags (JS pur, immuable)
const TAG_ROUTE_MAP = Object.freeze({
  'Éducation': '/education',
  'Education': '/education',
  'Santé': '/sante',
  'Sante': '/sante',
  'WASH': '/wash',
  'Protection': '/protection',
  'Gouvernance': '/gouvernance',
  'Sécurité alimentaire': '/securite-alimentaire',
  'Sécurité Alimentaire': '/securite-alimentaire',
  'Sécurité_Alimentaire': '/securite-alimentaire',
  'Rapports': '/rapports',
  'Projets': '/projets'
})

// Résolution avancée des tags → routes (Projets/Rapports filtrés)
const resolveTagHref = (raw) => {
  const label = String(raw || '').trim()
  if (!label) return '/actualites'

  // 1) Mappage direct si connu
  if (Object.prototype.hasOwnProperty.call(TAG_ROUTE_MAP, label)) return TAG_ROUTE_MAP[label]

  // 2) Projets: Domaine
  const mProj = label.match(/^projets?\s*:\s*(.+)$/i)
  if (mProj) return `/projets?domain=${encodeURIComponent(mProj[1])}`

  // 3) Rapports: Type
  const mRep = label.match(/^rapports?\s*:\s*(.+)$/i)
  if (mRep) return `/rapports?type=${encodeURIComponent(mRep[1])}`

  // 4) Année → Rapports par année
  const mYear = label.match(/^ann(?:é|e)e\s*:\s*(\d{4})$/i)
  if (mYear) return `/rapports?annee=${encodeURIComponent(mYear[1])}`

  // 5) Donor/Bailleur/Partenaire → Projets par bailleur
  const mDonor = label.match(/^(?:donor|bailleur|partenaire)\s*:\s*(.+)$/i)
  if (mDonor) return `/projets?donor=${encodeURIComponent(mDonor[1])}`

  // 6) Région → Projets par région
  const mRegion = label.match(/^(?:r[ée]gion)\s*:\s*(.+)$/i)
  if (mRegion) return `/projets?region=${encodeURIComponent(mRegion[1])}`

  // 7) Domaine brut courant → /projets?domain=
  const domainHints = ['WASH','Protection','Éducation','Education','Gouvernance','Sécurité alimentaire','Sante','Santé']
  if (domainHints.includes(label)) return `/projets?domain=${encodeURIComponent(label)}`

  // 8) Sinon, filtrage côté liste d’actualités
  return `/actualites?tag=${encodeURIComponent(label)}`
}

const ActualiteDetailPage = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  // Trouver l'actu courante (tolère des slugs en minuscules)
  const actu = useMemo(
    () => actualites.find(a => String(a.slug).toLowerCase() === String(slug).toLowerCase()),
    [slug]
  )

  // Tri global des actualités par dateISO (ou date), sinon par ordre d'origine
  const sorted = useMemo(() => {
    const copy = [...actualites]
    return copy.sort((a, b) => {
      const ta = Date.parse(a.dateISO || a.date)
      const tb = Date.parse(b.dateISO || b.date)
      if (isNaN(ta) && isNaN(tb)) return 0
      if (isNaN(ta)) return 1
      if (isNaN(tb)) return -1
      return tb - ta // plus récentes d'abord
    })
  }, [])

  // Position + précédent/suivant (dans la liste triée)
  const { prev, next } = useMemo(() => {
    const idx = sorted.findIndex(a => a.slug === actu?.slug)
    return {
      prev: idx > 0 ? sorted[idx - 1] : null,
      next: idx >= 0 && idx < sorted.length - 1 ? sorted[idx + 1] : null,
    }
  }, [sorted, actu])

  // Mettre la page en haut à chaque actu
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [slug])

  // Titre de l'onglet
  useEffect(() => {
    if (actu?.titre) document.title = `${actu.titre} – AMSS`
  }, [actu])

  // URL canonique
  const canonicalUrl = useMemo(() => {
    if (typeof window === 'undefined') return ''
    return `${window.location.origin}${pathname}`
  }, [pathname])

  // Formatage de date (prend dateISO si dispo)
  const dateLabel = useMemo(() => {
    if (!actu?.date && !actu?.dateISO) return ''
    const t = Date.parse(actu.dateISO || actu.date)
    if (isNaN(t)) return actu?.date || ''
    try {
      return new Date(t).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })
    } catch {
      return actu?.date || ''
    }
  }, [actu])

  // Image de couverture + fallback
  const [heroError, setHeroError] = useState(false)
  const heroSrc = !heroError && actu?.image ? actu.image : '/placeholder-news.jpg'

  // Partage / Copier le lien
  const [copied, setCopied] = useState(false)
  const onShare = async () => {
    try {
      const shareData = {
        title: actu?.titre || 'Actualité AMSS',
        text: actu?.excerpt || 'Découvrez cette actualité de l’ONG AMSS',
        url: canonicalUrl,
      }
      if (navigator.share) {
        await navigator.share(shareData)
      } else {
        await navigator.clipboard.writeText(canonicalUrl)
        setCopied(true)
        setTimeout(() => setCopied(false), 1800)
      }
    } catch {
      try {
        await navigator.clipboard.writeText(canonicalUrl)
        setCopied(true)
        setTimeout(() => setCopied(false), 1800)
      } catch {}
    }
  }

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

  // Actualités liées (score catégorie + tags, max 4)
  const related = useMemo(() => {
    const tagsSet = new Set((actu.tags || []).map(String))
    const scored = sorted
      .filter(a => a.slug !== actu.slug)
      .map(a => {
        let score = 0
        if (a.categorie && a.categorie === actu.categorie) score += 2
        if (Array.isArray(a.tags)) {
          const common = a.tags.filter(t => tagsSet.has(String(t))).length
          score += common
        }
        return { item: a, score }
      })
      .sort((x, y) => y.score - x.score)
      .map(x => x.item)

    return scored.slice(0, 4)
  }, [sorted, actu])

  // Données structurées (SEO)
  const jsonLd = useMemo(() => {
    const t = Date.parse(actu.dateISO || actu.date)
    const isoDate = isNaN(t) ? undefined : new Date(t).toISOString()
    return {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      headline: actu.titre,
      datePublished: isoDate,
      image: actu.image ? [actu.image] : undefined,
      articleSection: actu.categorie,
      mainEntityOfPage: canonicalUrl,
      author: { '@type': 'Organization', name: 'ONG AMSS' },
      publisher: { '@type': 'Organization', name: 'ONG AMSS' },
      description: actu.excerpt,
    }
  }, [actu, canonicalUrl])

  return (
    <div className="min-h-screen bg-background">
      {/* JSON-LD pour SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Fil d’Ariane */}
      <nav className="container mx-auto px-4 pt-4 text-sm">
        <ol className="flex items-center gap-2 text-muted-foreground">
          <li>
            <Link to="/" className="inline-flex items-center hover:text-foreground">
              <Home className="h-4 w-4 mr-1" /> Accueil
            </Link>
          </li>
          <li className="opacity-50">/</li>
          <li>
            <Link to="/actualites" className="hover:text-foreground">Actualités</Link>
          </li>
          <li className="opacity-50">/</li>
          <li className="text-foreground truncate max-w-[60%]" title={actu.titre}>{actu.titre}</li>
        </ol>
      </nav>

      {/* En-tête visuel */}
      <section className="relative mt-3">
        <img
          src={heroSrc}
          alt={actu.titre || 'Image de couverture'}
          className="w-full h-[360px] object-cover"
          onError={() => setHeroError(true)}
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w/full px-4">
          <div className="max-w-4xl mx-auto text-white">
            <div className="flex flex-wrap items-center text-sm mb-2">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{dateLabel}</span>
              {actu.categorie && (
                <>
                  <Tag className="h-4 w-4 ml-4 mr-2" />
                  <span>{actu.categorie}</span>
                </>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold leading-snug drop-shadow-sm">{actu.titre}</h1>
            {/* Tags cliquables vers les pages liées */}
            {Array.isArray(actu.tags) && actu.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {actu.tags.map((t, i) => {
                  const label = String(t)
                  const href = resolveTagHref(label)
                  return (
                    <Link
                      key={i}
                      to={href}
                      className="inline-flex items-center text-xs bg-white/90 text-foreground px-2.5 py-1 rounded-full border border-white/40 hover:bg-white transition"
                    >
                      <Tag className="h-3.5 w-3.5 mr-1" /> {label}
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Corps */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-border p-6">
            {actu.excerpt && (
              <p className="text-lg text-foreground leading-relaxed mb-4">{actu.excerpt}</p>
            )}
            {actu.contenu && (
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{actu.contenu}</p>
            )}

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

            {(Array.isArray(actu.lieux) && actu.lieux.length > 0) || (Array.isArray(actu.partenaires) && actu.partenaires.length > 0) ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                {Array.isArray(actu.lieux) && actu.lieux.length > 0 && (
                  <div className="text-sm">
                    <div className="font-semibold mb-1 flex items-center">
                      <MapPin className="h-4 w-4 mr-2" /> Lieux
                    </div>
                    <div className="text-muted-foreground">{actu.lieux.join(', ')}</div>
                  </div>
                )}
                {Array.isArray(actu.partenaires) && actu.partenaires.length > 0 && (
                  <div className="text-sm">
                    <div className="font-semibold mb-1">Partenaires</div>
                    <div className="text-muted-foreground">{actu.partenaires.join(', ')}</div>
                  </div>
                )}
              </div>
            ) : null}

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <button onClick={() => navigate(-1)} className="inline-flex items-center text-primary hover:underline">
                <ChevronLeft className="mr-1 h-4 w-4" /> Retour
              </button>

              <div className="flex items-center gap-2">
                <button onClick={onShare} className="inline-flex items-center text-muted-foreground hover:text-primary">
                  <Share2 className="h-4 w-4 mr-1" /> Partager
                </button>
                <button
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(canonicalUrl)
                      setCopied(true)
                      setTimeout(() => setCopied(false), 1600)
                    } catch {}
                  }}
                  className="inline-flex items-center text-muted-foreground hover:text-primary"
                  title="Copier le lien"
                >
                  {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                  {copied ? 'Copié' : 'Copier le lien'}
                </button>
              </div>
            </div>
          </div>

          {/* Navigation précédent / suivant */}
          {(prev || next) && (
            <div className="max-w-4xl mx-auto mt-6 flex flex-col sm:flex-row gap-3">
              {prev && (
                <Link to={`/actualites/${prev.slug}`} className="flex-1 group border rounded-lg p-4 bg-white hover:bg-muted/40 transition">
                  <div className="text-xs text-muted-foreground mb-2 inline-flex items-center"><ArrowLeft className="h-3.5 w-3.5 mr-1"/> Précédent</div>
                  <div className="flex items-center gap-3">
                    <img src={prev.image || '/placeholder-news.jpg'} alt={prev.titre} className="w-20 h-14 object-cover rounded-md border" loading="lazy" />
                    <div>
                      <div className="text-sm text-muted-foreground">{prev.date}</div>
                      <div className="font-medium group-hover:underline line-clamp-2">{prev.titre}</div>
                    </div>
                  </div>
                </Link>
              )}
              {next && (
                <Link to={`/actualites/${next.slug}`} className="flex-1 group border rounded-lg p-4 bg-white hover:bg-muted/40 transition text-right">
                  <div className="text-xs text-muted-foreground mb-2 inline-flex items-center ml-auto">Suivant <ArrowRight className="h-3.5 w-3.5 ml-1"/></div>
                  <div className="flex items-center gap-3 justify-end">
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">{next.date}</div>
                      <div className="font-medium group-hover:underline line-clamp-2">{next.titre}</div>
                    </div>
                    <img src={next.image || '/placeholder-news.jpg'} alt={next.titre} className="w-20 h-14 object-cover rounded-md border" loading="lazy" />
                  </div>
                </Link>
              )}
            </div>
          )}

          {/* Actualités liées */}
          <div className="max-w-4xl mx-auto mt-10">
            <h3 className="text-xl font-semibold mb-4">À lire aussi</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {related.map(a => (
                <Link to={`/actualites/${a.slug}`} key={a.slug} className="flex gap-3 items-center group">
                  <img src={a.image || '/placeholder-news.jpg'} alt={a.titre} className="w-24 h-16 object-cover rounded-md border" loading="lazy" />
                  <div>
                    <div className="text-sm text-muted-foreground">{a.date}</div>
                    <div className="font-medium group-hover:underline line-clamp-2">{a.titre}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ActualiteDetailPage
