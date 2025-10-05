// src/pages/SantePage.jsx
import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { HeartPulse, Stethoscope, Baby, Syringe, Users, TrendingUp, MapPin, ArrowRight, CheckCircle, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { projetsEnCours, projetsTermines } from '../data/projetsData'
import { hasCanon } from '@/utils/domainesCanon'

// Clé canon unique (déclarée une seule fois, scope module)
const CANON_KEY = 'SANTE'

const safeYear = (value) => {
  if (!value) return 'N/D'
  const y = new Date(value)
  return Number.isNaN(y.getTime()) ? 'N/D' : y.getFullYear()
}

const n = (x) => new Intl.NumberFormat('fr-FR').format(Number(x || 0))

export default function SantePage() {
  // Listes filtrées via domaine canon (auto-alimentées depuis projetsData)
  const santeEnCours = useMemo(() => (projetsEnCours || []).filter(p => hasCanon(p, CANON_KEY)), [])
  const santeTermines = useMemo(() => (projetsTermines || []).filter(p => hasCanon(p, CANON_KEY)), [])

  const totalBenef = useMemo(
    () => santeEnCours.reduce((acc, p) => acc + Number(p.beneficiaries || 0), 0),
    [santeEnCours]
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-rose-50 to-red-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <HeartPulse className="h-16 w-16 text-red-600 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Santé & Nutrition
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Santé communautaire, SR/PF, vaccination, prévention et prise en charge de la malnutrition.
            </p>
            <div className="mt-6 flex gap-3 justify-center">
              <Link to="/projets?domain=Santé%20%26%20Nutrition">
                <Button size="lg" className="gap-2">
                  Voir les projets
                  <Stethoscope className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/projets">
                <Button size="lg" variant="outline">Tous les projets</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Indicateurs clés */}
      <section className="py-12 bg-white/60 border-y">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Stat icon={<Users className="h-5 w-5" />} label="Projets en cours" value={santeEnCours.length} />
            <Stat icon={<CheckCircle className="h-5 w-5" />} label="Projets terminés" value={santeTermines.length} />
            <Stat icon={<TrendingUp className="h-5 w-5" />} label="Bénéficiaires (en cours)" value={n(totalBenef)} />
          </div>
        </div>
      </section>

      {/* Axes d’intervention */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card title="Santé communautaire" icon={<Users className="h-7 w-7 text-red-600" />}>
              Renforcement des ASC/RECO, PEC communautaire et référencement.
            </Card>
            <Card title="SR/PF" icon={<Stethoscope className="h-7 w-7 text-pink-600" />}>
              Accès aux services de santé sexuelle et reproductive, planification familiale.
            </Card>
            <Card title="Nutrition" icon={<Baby className="h-7 w-7 text-orange-600" />}>
              Prévention et PEC de la malnutrition aiguë (MAS/MAM).
            </Card>
            <Card title="Vaccination" icon={<Syringe className="h-7 w-7 text-emerald-600" />}>
              Appui aux campagnes de vaccination, chaîne du froid, mobilisation sociale.
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

          {santeEnCours.length === 0 ? (
            <p className="text-muted-foreground">Aucun projet en cours pour la Santé & Nutrition.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {santeEnCours.map((p, i) => (
                <ProjectCard key={i} p={p} statusColor="green" />
              ))}
            </div>
          )}

          <div className="text-center mt-8">
            <Link to="/projets#cours">
              <Button className="inline-flex items-center">
                Voir tous les projets
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Projets terminés */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center gap-3 mb-8">
            <CheckCircle className="h-8 w-8 text-accent" />
            <h2 className="text-3xl font-bold text-foreground">Projets terminés</h2>
          </div>

          {santeTermines.length === 0 ? (
            <p className="text-muted-foreground">Aucun projet terminé pour la Santé & Nutrition.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {santeTermines.map((p, i) => (
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
            <Kpi title="Approche intégrée" icon={<HeartPulse className="h-5 w-5" />}>
              Prévention, PEC, référencement, communication pour le changement social.
            </Kpi>
            <Kpi title="Zones d’intervention" icon={<MapPin className="h-5 w-5" />}>
              Timbuktu • Gao • Mopti • Ségou • Koulikoro • Bamako
            </Kpi>
            <Kpi title="Partenaires" icon={<Users className="h-5 w-5" />}>
              Ministère de la Santé, UNICEF, PAM, OMS, ONG locales
            </Kpi>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h2 className="text-3xl font-bold mb-6">Améliorer la santé des communautés</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Rejoignez nos partenaires pour renforcer la santé et la nutrition au Sahel.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/don"><Button size="lg" className="text-lg px-8 py-3">Faire un Don</Button></Link>
            <Link to="/partenaires"><Button variant="outline" size="lg" className="text-lg px-8 py-3">Devenir Partenaire</Button></Link>
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
      <div className="bg-rose-50 w-16 h-16 rounded-lg flex items-center justify-center mb-4">{icon}</div>
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
