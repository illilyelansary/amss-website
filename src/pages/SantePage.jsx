// src/pages/SantePage.jsx
import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Heart, Users, Activity, Shield, TrendingUp, Stethoscope, Clock, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import santeMali from '../assets/sante-mali.jpg'
import santeNutrition from '../assets/sante-nutrition.jpg'

// ⚠️ Données projets
import { projetsEnCours, projetsTermines } from '../data/projetsData'

// normalisation simple (sans accents/majuscules)
const norm = (s = '') =>
  String(s)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()

// match “Santé & Nutrition” (et variantes)
const isHealthDomain = (domain = '') => {
  const n = norm(domain)
  return n.includes('sante') || n.includes('santé') || n.includes('nutrition')
}

const formatNB = (n) => {
  const v = Number(n)
  return Number.isFinite(v) ? v.toLocaleString('fr-FR') : 'N/D'
}

const ProjectCard = ({ p, statusColor = 'text-green-600', dot = 'bg-green-500' }) => (
  <article className="bg-white rounded-xl p-6 shadow-sm border border-border">
    <div className="flex items-center mb-4">
      <div className={`w-3 h-3 rounded-full mr-2 ${dot}`} />
      <span className={`text-sm font-medium ${statusColor}`}>
        {p.status || 'En cours'}
      </span>
      {p.usaidNote && (
        <span className="ml-2 inline-flex items-center px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-700 border border-red-200">
          Suspendu (USAID)
        </span>
      )}
    </div>

    <h3 className="text-lg font-semibold text-foreground mb-3">{p.title}</h3>
    {p.excerpt && <p className="text-muted-foreground text-sm mb-4">{p.excerpt}</p>}

    <div className="space-y-2 text-sm">
      <div className="flex justify-between">
        <span className="text-muted-foreground">Région :</span>
        <span className="font-medium text-right">{p.region || 'N/D'}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-muted-foreground">Bailleur :</span>
        <span className="font-medium text-right">{p.donor || 'N/D'}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-muted-foreground">Bénéficiaires :</span>
        <span className="font-medium text-right">{formatNB(p.beneficiaries)}</span>
      </div>
      {p.domain && (
        <div className="flex justify-between">
          <span className="text-muted-foreground">Domaine :</span>
          <span className="font-medium text-right">{p.domain}</span>
        </div>
      )}
    </div>
  </article>
)

const SantePage = () => {
  // ---- Sélection des projets Santé &/ou Nutrition ----
  const santeEnCours = useMemo(
    () => (projetsEnCours || []).filter(p => isHealthDomain(p.domain)),
    []
  )
  const santeTermines = useMemo(
    () => (projetsTermines || []).filter(p => isHealthDomain(p.domain)),
    []
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-red-50 to-pink-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Heart className="h-16 w-16 text-red-600 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Santé et Nutrition
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              L&apos;AMSS œuvre pour l&apos;amélioration de l&apos;accès aux soins de santé de qualité
              et la lutte contre la malnutrition dans les communautés vulnérables du Mali.
            </p>
          </div>
        </div>
      </section>

      {/* Nos programmes (statique) */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Nos Interventions Santé
              </h2>
              <p className="text-xl text-muted-foreground">
                Des programmes intégrés pour une meilleure santé communautaire
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-border hover:shadow-lg transition-shadow">
                <div className="bg-red-50 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                  <Stethoscope className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Santé de la Reproduction</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Accès aux services SR/PF et santé maternelle dans les zones reculées.
                </p>
                <div className="text-sm text-red-600 font-medium">Focus: Femmes & adolescentes</div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-border hover:shadow-lg transition-shadow">
                <div className="bg-orange-50 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                  <Activity className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Nutrition Communautaire</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Prévention et PEC de la malnutrition aiguë et chronique chez les moins de 5 ans.
                </p>
                <div className="text-sm text-orange-600 font-medium">Cible: Enfants 0–5 ans</div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-border hover:shadow-lg transition-shadow">
                <div className="bg-green-50 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Prévention & Vaccination</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Sensibilisation et campagnes contre les maladies évitables.
                </p>
                <div className="text-sm text-green-600 font-medium">Couverture: Communautés entières</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image & résultats */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <img src={santeMali} alt="Santé au Mali" className="rounded-2xl shadow-lg w-full" />
              </div>

              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">Impact Santé 2024</h2>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-red-100 p-3 rounded-lg"><Heart className="h-6 w-6 text-red-600" /></div>
                    <div>
                      <h3 className="font-semibold text-foreground">Santé Maternelle</h3>
                      <p className="text-muted-foreground">2 500+ femmes ont bénéficié de CPN</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="bg-orange-100 p-3 rounded-lg"><Activity className="h-6 w-6 text-orange-600" /></div>
                    <div>
                      <h3 className="font-semibold text-foreground">Nutrition Infantile</h3>
                      <p className="text-muted-foreground">1 800+ enfants traités pour MAS</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="bg-green-100 p-3 rounded-lg"><Shield className="h-6 w-6 text-green-600" /></div>
                    <div>
                      <h3 className="font-semibold text-foreground">Vaccination</h3>
                      <p className="text-muted-foreground">≈85% de couverture dans nos zones</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projets Santé — EN COURS */}
      <section id="projets-sante" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Clock className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold text-foreground">Projets Santé &amp; Nutrition — En Cours</h2>
            </div>

            {santeEnCours.length === 0 ? (
              <p className="text-muted-foreground">Aucun projet santé en cours pour le moment.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {santeEnCours.map((p, i) => (
                  <ProjectCard key={i} p={p} statusColor={p.usaidNote ? 'text-red-600' : 'text-green-600'} dot={p.usaidNote ? 'bg-red-500' : 'bg-green-500'} />
                ))}
              </div>
            )}

            <div className="text-center mt-8">
              <Link to="/projets#cours">
                <Button className="inline-flex items-center">Voir tous les projets <Clock className="ml-2 h-4 w-4" /></Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Projets Santé — TERMINÉS */}
      <section id="projets-sante-termines" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <CheckCircle className="h-8 w-8 text-accent" />
              <h2 className="text-3xl font-bold text-foreground">Projets Santé &amp; Nutrition — Terminés</h2>
            </div>

            {santeTermines.length === 0 ? (
              <p className="text-muted-foreground">Aucun projet santé terminé listé.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {santeTermines.map((p, i) => (
                  <ProjectCard key={i} p={p} statusColor="text-blue-600" dot="bg-blue-500" />
                ))}
              </div>
            )}

            <div className="text-center mt-8">
              <Link to="/projets#termines">
                <Button variant="outline" className="inline-flex items-center">Voir les projets terminés <CheckCircle className="ml-2 h-4 w-4" /></Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Approche intégrée (statique) */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Approche Intégrée Santé–Nutrition
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Nous combinons santé, nutrition et mobilisation communautaire pour maximiser l&apos;impact.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3"><div className="w-2 h-2 bg-red-600 rounded-full" /><span className="text-muted-foreground">CSCom renforcés</span></div>
                  <div className="flex items-center space-x-3"><div className="w-2 h-2 bg-orange-600 rounded-full" /><span className="text-muted-foreground">UNAs / démonstrations culinaires</span></div>
                  <div className="flex items-center space-x-3"><div className="w-2 h-2 bg-green-600 rounded-full" /><span className="text-muted-foreground">Sensibilisation & référencement</span></div>
                  <div className="flex items-center space-x-3"><div className="w-2 h-2 bg-blue-600 rounded-full" /><span className="text-muted-foreground">Formation continue du personnel</span></div>
                </div>
              </div>
              <div>
                <img src={santeNutrition} alt="Santé et Nutrition" className="rounded-2xl shadow-lg w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistiques (statique) */}
      <section className="py-16 bg-gradient-to-br from-red-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Impact de nos Programmes Santé</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center"><div className="text-4xl font-bold text-red-600 mb-2">15 000+</div><div className="text-sm text-muted-foreground">Consultations médicales</div></div>
              <div className="text-center"><div className="text-4xl font-bold text-orange-600 mb-2">2 500+</div><div className="text-sm text-muted-foreground">Femmes suivies</div></div>
              <div className="text-center"><div className="text-4xl font-bold text-green-600 mb-2">1 800+</div><div className="text-sm text-muted-foreground">Enfants traités</div></div>
              <div className="text-center"><div className="text-4xl font-bold text-blue-600 mb-2">200+</div><div className="text-sm text-muted-foreground">Agents formés</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Soutenez la Santé au Sahel
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Chaque vie compte. Aidez-nous à améliorer l&apos;accès aux soins de santé.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/don"><Button size="lg" className="text-lg px-8 py-3">Faire un Don</Button></Link>
              <Link to="/partenaires"><Button variant="outline" size="lg" className="text-lg px-8 py-3">Devenir Partenaire</Button></Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SantePage
