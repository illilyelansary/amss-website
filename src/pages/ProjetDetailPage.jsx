// src/pages/ProjetDetailPage.jsx — fiche d’un projet, reliée à ses partenaires, zones, bases et programme
import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Calendar, Wallet, Users, Layers, MapPin, Handshake, Building2, Tag } from 'lucide-react'
import { projetsBySlug, programmeDe, partenairesBySlug } from '@/data/reseau'
import { LiensZones, LiensPartenaires, LiensBases, ListeProjets, TitreProjet } from '@/components/liens/Liens'
import { CANON_LABELS, projectToCanonKeys } from '@/utils/domainesCanon'

const PAGE_DOMAINE = { EDUCATION: '/education', SANTE: '/sante', SECALIM: '/securite-alimentaire', WASH: '/wash', PROTECTION: '/protection', GOUV: '/gouvernance' }
const fmtDate = (d) => (d ? new Date(d + 'T00:00:00').toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' }) : null)
const couleur = (s) => (s === 'En cours' ? 'bg-green-100 text-green-700 border-green-200' : s === 'Suspendu' ? 'bg-red-100 text-red-700 border-red-200' : 'bg-blue-100 text-blue-700 border-blue-200')

export default function ProjetDetailPage() {
  const { slug } = useParams()
  const p = projetsBySlug.get(String(slug || '').toLowerCase())
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [slug])

  if (!p) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-semibold mb-4">Projet introuvable</h1>
        <Link to="/projets" className="text-primary underline">Voir tous les projets</Link>
      </div>
    )
  }

  const prog = programmeDe(p)
  const domaines = [...projectToCanonKeys(p)].filter((k) => PAGE_DOMAINE[k])
  const autresDuBailleur = p.bailleurs
    .flatMap((s) => (partenairesBySlug.get(s)?.projets || []))
    .filter((x, i, arr) => x.slug !== p.slug && arr.findIndex((y) => y.slug === x.slug) === i)
    .slice(0, 6)

  return (
    <div className="min-h-screen bg-background">
      <section className="py-12 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4 max-w-5xl">
          <Link to="/projets" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
            <ArrowLeft className="h-4 w-4 mr-1" /> Tous les projets
          </Link>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className={`text-xs px-2 py-1 rounded-full border ${couleur(p.status)}`}>{p.status}</span>
            {p.usaidNote && <span className="text-xs px-2 py-1 rounded-full border bg-red-50 text-red-700 border-red-200">Arrêt des fonds USAID</span>}
            {p.code && <span className="text-xs px-2 py-1 rounded-full border bg-white text-muted-foreground">{p.code}</span>}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">{p.title}</h1>
          {prog && (
            <p className="mt-3 text-muted-foreground">
              Composante du programme : <strong className="text-foreground">{prog.title}</strong>
            </p>
          )}
        </div>
      </section>

      <section className="py-10">
        <div className="container mx-auto px-4 max-w-5xl grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-8">
            {p.description && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Présentation</h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{p.description}</p>
              </div>
            )}
            {p.beneficiairesTexte && (
              <div>
                <h2 className="text-xl font-semibold mb-2 flex items-center gap-2"><Users className="h-5 w-5 text-primary" /> Bénéficiaires</h2>
                <p className="text-muted-foreground leading-relaxed">{p.beneficiairesTexte}</p>
              </div>
            )}
            {p.zoneDetail && (
              <div>
                <h2 className="text-xl font-semibold mb-2 flex items-center gap-2"><MapPin className="h-5 w-5 text-primary" /> Localités d’intervention</h2>
                <p className="text-muted-foreground leading-relaxed">{p.zoneDetail}</p>
              </div>
            )}
            {prog && prog.composantes.length > 1 && (
              <div>
                <h2 className="text-xl font-semibold mb-2 flex items-center gap-2"><Layers className="h-5 w-5 text-primary" /> Autres composantes du programme</h2>
                <ListeProjets projets={prog.composantes.filter((c) => c.slug !== p.slug)} />
              </div>
            )}
            {autresDuBailleur.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-2 flex items-center gap-2"><Handshake className="h-5 w-5 text-primary" /> Autres projets avec le même bailleur</h2>
                <ListeProjets projets={autresDuBailleur} />
              </div>
            )}
          </div>

          {/* Fiche signalétique */}
          <aside className="bg-white border rounded-xl p-5 shadow-sm h-fit space-y-4 text-sm">
            <Row icon={Calendar} label="Période">
              {[fmtDate(p.startDate), fmtDate(p.endDate)].filter(Boolean).join(' → ') || 'N/D'}
            </Row>
            <Row icon={MapPin} label="Zones"><LiensZones regions={p.regions || []} /></Row>
            <Row icon={Building2} label="Base(s) AMSS"><LiensBases slugs={p.bases} /></Row>
            <Row icon={Handshake} label="Bailleur(s)"><LiensPartenaires slugs={p.bailleurs} /></Row>
            {p.miseEnOeuvre.length > 0 && <Row icon={Handshake} label="Partenaires de mise en œuvre"><LiensPartenaires slugs={p.miseEnOeuvre} /></Row>}
            <Row icon={Tag} label="Domaines">
              <span className="inline-flex flex-wrap gap-1">
                {domaines.length
                  ? domaines.map((k) => <Link key={k} to={PAGE_DOMAINE[k]} className="px-2 py-0.5 rounded-full border text-xs hover:bg-muted hover:text-primary">{CANON_LABELS[k]}</Link>)
                  : <span>{p.domaine || 'N/D'}</span>}
              </span>
            </Row>
            <Row icon={Wallet} label="Budget">{p.budget || 'N/D'}</Row>
            {prog && <Row icon={Layers} label="Programme"><TitreProjet p={{ title: prog.title }} /></Row>}
          </aside>
        </div>
      </section>
    </div>
  )
}

function Row({ icon, label, children }) {
  const Icon = icon
  return (
    <div>
      <div className="flex items-center gap-2 text-muted-foreground mb-1"><Icon className="h-4 w-4 text-primary" />{label}</div>
      <div className="font-medium text-foreground">{children}</div>
    </div>
  )
}
