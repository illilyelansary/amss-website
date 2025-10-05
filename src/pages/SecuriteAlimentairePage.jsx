// src/pages/SecuriteAlimentairePage.jsx
import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Wheat, Sprout, Tractor, PackageOpen, Users, TrendingUp, MapPin, ArrowRight, CheckCircle, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { projetsEnCours, projetsTermines } from '../data/projetsData'
import { hasCanon } from '@/utils/domainesCanon'

// Clé canon unique (déclarée une seule fois, scope module)
const CANON_KEY = 'SECALIM'

const safeYear = (value) => {
  if (!value) return 'N/D'
  const y = new Date(value)
  return Number.isNaN(y.getTime()) ? 'N/D' : y.getFullYear()
}

const n = (x) => new Intl.NumberFormat('fr-FR').format(Number(x || 0))

export default function SecuriteAlimentairePage() {
  const secalimEnCours = useMemo(() => (projetsEnCours || []).filter(p => hasCanon(p, CANON_KEY)), [])
  const secalimTermines = useMemo(() => (projetsTermines || []).filter(p => hasCanon(p, CANON_KEY)), [])

  const totalBenef = useMemo(
    () => secalimEnCours.reduce((acc, p) => acc + Number(p.beneficiaries || 0), 0),
    [secalimEnCours]
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Wheat className="h-16 w-16 text-orange-600 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Sécurité alimentaire & Moyens d’existence
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Relance productive, intrants, diversification, transferts monétaires et résilience des ménages.
            </p>
          </div>
        </div>
      </section>

      {/* Indicateurs clés */}
      <section className="py-12 bg-white/60 border-y">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Stat icon={<Users className="h-5 w-5" />} label="Projets en cours" value={secalimEnCours.length} />
            <Stat icon={<CheckCircle className="h-5 w-5" />} label="Projets terminés" value={secalimTermines.length} />
            <Stat icon={<TrendingUp className="h-5 w-5" />} label="Bénéficiaires (en cours)" value={n(totalBenef)} />
          </div>
        </div>
      </section>

      {/* Axes d’intervention */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card title="Agriculture & Intrants" icon={<Sprout className="h-7 w-7 text-emerald-700" />}>
              Semences, outils, irrigation de proximité, agriculture résiliente.
            </Card>
            <Card title="Élevage" icon={<Tractor className="h-7 w-7 text-lime-700" />}>
              Appui aux éleveurs, santé animale, fourrage, vaccination.
            </Card>
            <Card title="Transferts & Relance" icon={<PackageOpen className="h-7 w-7 text-orange-700" />}>
              Cash/vivres, AGR, diversification des revenus.
            </Card>
            <Card title="Résilience" icon={<Wheat className="h-7 w-7 text-amber-700" />}>
              Gestion des risques, épargne, accès au marché, liens humanitaire-développement.
            </Card>
          </div>
        </div>
      </section>

      {/* Projets en cours */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center gap-3 mb-8">
            <Clock className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">Projets en cours</h2>
          </div>

          {secalimEnCours.length === 0 ? (
            <p className="text-muted-foreground">Aucun projet en cours dans ce domaine.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {secalimEnCours.map((p, i) => (
                <ProjectCard key={i} p={p} statusColor="green" />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Projets terminés */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center gap-3 mb-8">
            <CheckCircle className="h-8 w-8 text-accent" />
            <h2 className="text-3xl font-bold text-foreground">Projets terminés</h2>
          </div>

          {secalimTermines.length === 0 ? (
            <p className="text-muted-foreground">Aucun projet terminé dans ce domaine.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {secalimTermines.map((p, i) => (
                <ProjectCard key={i} p={p} statusColor="blue" withYears />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Approche & présence */}
      <section className="py-16 bg-white/60 border-y">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Kpi title="Approche marché" icon={<Wheat className="h-5 w-5" />}>
              Renforcer l’offre locale, relier producteurs et acheteurs.
            </Kpi>
            <Kpi title="Zones d’intervention" icon={<MapPin className="h-5 w-5" />}>
              Tombouctou • Gao • Mopti • Ménaka • Taoudéni
            </Kpi>
            <Kpi title="Partenaires" icon={<Users className="h-5 w-5" />}>
              PAM, FAO, DDC, ONG locales, collectivités
            </Kpi>
          </div>

          <div className="text-center mt-10">
            <Link to="/projets">
              <Button className="inline-flex items-center">
                Voir tous les projets
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

function Stat({ icon, label, value }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border">
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="text-2xl font-semibold mt-1 flex items-center gap-2">
        {icon}{value}
      </div>
    </div>
  )
}

function Card({ title, icon, children }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-border hover:shadow-lg transition-shadow">
      <div className="bg-amber-50 w-16 h-16 rounded-lg flex items-center justify-center mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{children}</p>
    </div>
  )
}

function Kpi({ title, icon, children }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border">
      <div className="text-sm text-muted-foreground">{title}</div>
      <div className="mt-2 flex items-center gap-2">{icon}{children}</div>
    </div>
  )
}

function ProjectCard({ p, statusColor = 'green', withYears = false }) {
  const safeYear = (value) => {
    if (!value) return 'N/D'
    const y = new Date(value)
    return Number.isNaN(y.getTime()) ? 'N/D' : y.getFullYear()
  }
  return (
    <article className="bg-white rounded-xl p-6 shadow-sm border border-border">
      <div className="flex items-center mb-3">
        <div className={`w-3 h-3 rounded-full mr-2 ${statusColor === 'green' ? 'bg-green-500' : 'bg-blue-500'}`} />
        <span className={`text-sm font-medium ${statusColor === 'green' ? 'text-green-600' : 'text-blue-600'}`}>
          {statusColor === 'green' ? (p.status || 'En cours') : 'Terminé'}
        </span>
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{p.title}</h3>
      {p.excerpt && <p className="text-muted-foreground text-sm mb-4">{p.excerpt}</p>}
      <div className="space-y-2 text-sm">
        {withYears ? (
          <div className="flex justify-between"><span className="text-muted-foreground">Période :</span><span className="font-medium text-right">{safeYear(p.startDate)}–{safeYear(p.endDate)}</span></div>
        ) : null}
        <div className="flex justify-between"><span className="text-muted-foreground">Région :</span><span className="font-medium text-right">{p.region || 'N/D'}</span></div>
        <div className="flex justify-between"><span className="text-muted-foreground">Bailleur :</span><span className="font-medium text-right">{p.bailleur || p.donor || 'N/D'}</span></div>
      </div>
    </article>
  )
}
