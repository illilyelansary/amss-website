// src/pages/GouvernancePage.jsx
import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  Scale,
  Users,
  Handshake,
  MessageSquare,
  Target,
  Building,
  MapPin,
  Calendar,
  BadgeCheck,
  CheckCircle,
  Clock
} from 'lucide-react'
import { Button } from '@/components/ui/button'

// images (déjà présentes dans ton repo)
import amssSecuriteHumaine from '../assets/amss-securite-humaine.jpeg'
import projetTablesBancs from '../assets/projet-tables-bancs-amss.jpeg'

// données projets
import { projetsEnCours, projetsTermines } from '../data/projetsData'

// domaines canoniques
import { hasCanon } from '@/utils/domainesCanon'

// Clé canon unique (déclarée une seule fois, scope module)
const CANON_KEY = 'GOUV'

// Helpers d'affichage
const safeYM = (d) => {
  if (!d) return 'N/D'
  const x = new Date(d)
  return Number.isNaN(x.getTime())
    ? 'N/D'
    : x.toLocaleDateString('fr-FR', { year: 'numeric', month: 'short' })
}

const GouvernancePage = () => {
  // Projets filtrés par domaine canon (auto-alimentés depuis projetsData)
  const govEnCours = useMemo(
    () => (projetsEnCours || []).filter((p) => hasCanon(p, CANON_KEY)),
    []
  )
  const govTermines = useMemo(
    () => (projetsTermines || []).filter((p) => hasCanon(p, CANON_KEY)),
    []
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 to-blue-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Scale className="h-16 w-16 text-indigo-600 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Gouvernance, Paix et Sécurité
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              L&apos;AMSS promeut la bonne gouvernance, la cohésion sociale et la paix durable
              au Mali à travers des approches participatives et inclusives.
            </p>
          </div>
        </div>
      </section>

      {/* Nos interventions Gouvernance & Paix */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Nos Interventions Gouvernance et Paix
              </h2>
              <p className="text-xl text-muted-foreground">
                Renforcer les institutions et promouvoir la paix sociale
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <InterventionCard
                icon={<Scale className="h-8 w-8 text-indigo-600" />}
                tone="indigo"
                title="Renforcement Institutionnel"
                desc="Appui aux institutions locales et nationales pour améliorer la gouvernance et la prestation de services publics."
                badge="Institutions publiques"
              />
              <InterventionCard
                icon={<Handshake className="h-8 w-8 text-blue-600" />}
                tone="blue"
                title="Cohésion Sociale"
                desc="Programmes de réconciliation et de cohésion sociale entre communautés et groupes."
                badge="Dialogue intercommunautaire"
              />
              <InterventionCard
                icon={<MessageSquare className="h-8 w-8 text-green-600" />}
                tone="green"
                title="Médiation & Résolution de Conflits"
                desc="Formation de médiateurs communautaires et mécanismes de résolution pacifique des conflits."
                badge="Médiation traditionnelle"
              />
              <InterventionCard
                icon={<Users className="h-8 w-8 text-purple-600" />}
                tone="purple"
                title="Participation Citoyenne"
                desc="Renforcement de la participation citoyenne aux processus de décision et à la gouvernance locale."
                badge="Citoyens & leaders"
              />
              <InterventionCard
                icon={<Target className="h-8 w-8 text-orange-600" />}
                tone="orange"
                title="Prévention de l’Extrémisme Violent"
                desc="Actions de prévention et promotion du vivre-ensemble et de la tolérance."
                badge="Prévention communautaire"
              />
              <InterventionCard
                icon={<Building className="h-8 w-8 text-teal-600" />}
                tone="teal"
                title="Plaidoyer et Lobbying"
                desc="Plaidoyer pour l’amélioration des politiques publiques et la promotion des droits humains."
                badge="Niveaux national & local"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Projets Gouvernance & Paix (listes dynamiques) */}
      <section id="projets" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-foreground mb-3">Projets Gouvernance & Paix</h2>
              <p className="text-muted-foreground">Listes générées automatiquement depuis la base des projets.</p>
            </div>

            {/* En cours */}
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                <h3 className="text-xl font-semibold text-foreground">En cours</h3>
                <span className="text-sm text-muted-foreground">({govEnCours.length})</span>
              </div>

              {govEnCours.length === 0 ? (
                <p className="text-sm text-muted-foreground">Aucun projet en cours dans ce domaine.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {govEnCours.map((p, i) => <ProjectCard key={`g-en-${i}`} p={p} ended={false} />)}
                </div>
              )}
            </div>

            {/* Terminés */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                <h3 className="text-xl font-semibold text-foreground">Terminés</h3>
                <span className="text-sm text-muted-foreground">({govTermines.length})</span>
              </div>

              {govTermines.length === 0 ? (
                <p className="text-sm text-muted-foreground">Aucun projet terminé dans ce domaine.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {govTermines.map((p, i) => <ProjectCard key={`g-out-${i}`} p={p} ended />)}
                </div>
              )}
            </div>

            {/* Lien vers la page Projets */}
            <div className="text-center mt-10">
              <Link to="/projets" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <Button className="inline-flex items-center">
                  Voir tous les projets
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Image et résultats (vitrine) */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <img
                  src={amssSecuriteHumaine}
                  alt="Gouvernance et sécurité humaine"
                  className="rounded-2xl shadow-lg w-full"
                />
              </div>

              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">Impact Gouvernance 2024</h2>
                <div className="space-y-6">
                  <ImpactItem
                    tone="indigo"
                    icon={<Scale className="h-6 w-6 text-indigo-600" />}
                    title="Institutions renforcées"
                    desc="50+ institutions locales appuyées et renforcées"
                  />
                  <ImpactItem
                    tone="blue"
                    icon={<Handshake className="h-6 w-6 text-blue-600" />}
                    title="Réconciliation"
                    desc="30 accords de réconciliation intercommunautaire signés"
                  />
                  <ImpactItem
                    tone="green"
                    icon={<MessageSquare className="h-6 w-6 text-green-600" />}
                    title="Médiateurs formés"
                    desc="200+ médiateurs communautaires formés et actifs"
                  />
                </div>
              </div>
            </div>

            {/* Processus de paix locaux */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-16">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">Processus de Paix Locaux</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  L&apos;AMSS renforce l&apos;efficacité et l&apos;inclusivité des processus locaux de paix,
                  afin d&apos;accroître la résilience communautaire et soutenir la stabilité.
                </p>

                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-center gap-3"><span className="w-2 h-2 bg-indigo-600 rounded-full" /> Dialogue intercommunautaire et interreligieux</li>
                  <li className="flex items-center gap-3"><span className="w-2 h-2 bg-blue-600 rounded-full" /> Renforcement des mécanismes traditionnels de résolution</li>
                  <li className="flex items-center gap-3"><span className="w-2 h-2 bg-green-600 rounded-full" /> Formation des jeunes aux techniques de médiation</li>
                  <li className="flex items-center gap-3"><span className="w-2 h-2 bg-purple-600 rounded-full" /> Participation accrue des femmes dans la paix</li>
                </ul>
              </div>

              <div>
                <img
                  src={projetTablesBancs}
                  alt="Processus de paix communautaire"
                  className="rounded-2xl shadow-lg w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistiques synthèse */}
      <section className="py-16 bg-gradient-to-br from-indigo-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Impact de nos Programmes Gouvernance</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <StatBlock value="50+" label="Institutions renforcées" tone="indigo" />
              <StatBlock value="30" label="Accords de paix" tone="blue" />
              <StatBlock value="200+" label="Médiateurs formés" tone="green" />
              <StatBlock value="100+" label="Leaders impliqués" tone="purple" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">Construisons la Paix Ensemble</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Soutenez nos efforts pour une gouvernance inclusive et une paix durable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/don">
                <Button size="lg" className="text-lg px-8 py-3">Faire un Don</Button>
              </Link>
              <Link to="/partenaires">
                <Button variant="outline" size="lg" className="text-lg px-8 py-3">Devenir Partenaire</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// ————————————————————————
// Composants internes
// ————————————————————————
function ProjectCard({ p, ended = false }) {
  const start = p?.startDate
  const end = p?.endDate

  return (
    <article className="bg-white rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 mb-3">
        <div
          className={`w-2.5 h-2.5 rounded-full ${
            ended ? 'bg-blue-500' : p.usaidNote ? 'bg-red-500' : 'bg-green-500'
          }`}
        />
        <span
          className={`text-xs font-medium ${
            ended ? 'text-blue-600' : p.usaidNote ? 'text-red-600' : 'text-green-600'
          }`}
        >
          {ended ? 'Terminé' : (p.status || 'En cours')}
        </span>

        {!ended && p.usaidNote && (
          <span className="ml-2 inline-flex items-center px-2 py-0.5 text-[10px] rounded-full bg-red-100 text-red-700 border border-red-200">
            Suspendu (USAID)
          </span>
        )}
      </div>

      <h3 className="text-base md:text-lg font-semibold text-foreground mb-2">{p.title}</h3>
      {p.excerpt && <p className="text-xs md:text-sm text-muted-foreground mb-4">{p.excerpt}</p>}

      <div className="space-y-2 text-xs md:text-sm">
        <div className="flex items-start gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
          <div>
            <span className="text-muted-foreground">Région : </span>
            <span className="font-medium">{p.region || 'N/D'}</span>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <BadgeCheck className="h-4 w-4 text-muted-foreground mt-0.5" />
          <div>
            <span className="text-muted-foreground">Bailleur : </span>
            <span className="font-medium">{p.bailleur || p.donor || 'N/D'}</span>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
          <div>
            <span className="text-muted-foreground">Période : </span>
            <span className="font-medium">{safeYM(start)} – {safeYM(end)}</span>
          </div>
        </div>
      </div>
    </article>
  )
}

function InterventionCard({ icon, tone = 'indigo', title, desc, badge }) {
  const bg = {
    indigo: 'bg-indigo-50',
    blue: 'bg-blue-50',
    green: 'bg-green-50',
    purple: 'bg-purple-50',
    orange: 'bg-orange-50',
    teal: 'bg-teal-50'
  }[tone] || 'bg-slate-50'

  const text = {
    indigo: 'text-indigo-600',
    blue: 'text-blue-600',
    green: 'text-green-600',
    purple: 'text-purple-600',
    orange: 'text-orange-600',
    teal: 'text-teal-600'
  }[tone] || 'text-primary'

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-border hover:shadow-lg transition-shadow">
      <div className={`${bg} w-16 h-16 rounded-lg flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-3">{title}</h3>
      <p className="text-muted-foreground text-sm mb-4">{desc}</p>
      <div className={`text-sm font-medium ${text}`}>{badge}</div>
    </div>
  )
}

function ImpactItem({ icon, title, desc }) {
  return (
    <div className="flex items-center space-x-4">
      <div className="p-3 rounded-lg bg-white border">{icon}</div>
      <div>
        <h3 className="font-semibold text-foreground">{title}</h3>
        <p className="text-muted-foreground">{desc}</p>
      </div>
    </div>
  )
}

function StatBlock({ value, label, tone = 'indigo' }) {
  const color = {
    indigo: 'text-indigo-600',
    blue: 'text-blue-600',
    green: 'text-green-600',
    purple: 'text-purple-600'
  }[tone] || 'text-primary'
  return (
    <div className="text-center">
      <div className={`text-4xl font-bold ${color} mb-2`}>{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  )
}

export default GouvernancePage
