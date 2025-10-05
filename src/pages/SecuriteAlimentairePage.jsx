// src/pages/SecuriteAlimentairePage.jsx
import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Wheat, Users, TrendingUp, Package as PackageIcon, MapPin, Target } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { projetsEnCours, projetsTermines } from '../data/projetsData'
import amssTerrainActivites from '../assets/amss-terrain-activites.jpeg'
import projetTablesBancs from '../assets/projet-tables-bancs-amss.jpeg'
import { hasCanon } from '@/utils/domainesCanon'

// Clé canon unique (déclarée une seule fois, scope module)
const CANON_KEY = 'SECALIM'

// helpers
const safeYear = (value) => {
  if (!value) return 'N/D'
  const y = new Date(value)
  return Number.isNaN(y.getTime()) ? 'N/D' : y.getFullYear()
}

const SecuriteAlimentairePage = () => {
  // Projets liés (en cours + terminés) filtrés par domaine canon
  const secalimEnCours = useMemo(
    () => (Array.isArray(projetsEnCours) ? projetsEnCours.filter(p => hasCanon(p, CANON_KEY)) : []),
    []
  )
  const secalimTermines = useMemo(
    () => (Array.isArray(projetsTermines) ? projetsTermines.filter(p => hasCanon(p, CANON_KEY)) : []),
    []
  )

  const projetsLies = useMemo(() => {
    const tag = (p, s) => ({ ...p, _status: s })
    return [
      ...secalimEnCours.map(p => tag(p, 'En cours')),
      ...secalimTermines.map(p => tag(p, 'Terminé')),
    ]
  }, [secalimEnCours, secalimTermines])

  const projetsLiesPreview = useMemo(() => projetsLies.slice(0, 6), [projetsLies])

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-yellow-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Wheat className="h-16 w-16 text-green-600 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Sécurité Alimentaire
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              L&apos;AMSS développe des programmes d&apos;assistance alimentaire et de renforcement
              de la résilience agricole pour lutter contre l&apos;insécurité alimentaire au Sahel.
            </p>
          </div>
        </div>
      </section>

      {/* Nos interventions Sécurité Alimentaire */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Nos Interventions Sécurité Alimentaire
              </h2>
              <p className="text-xl text-muted-foreground">
                Des solutions durables contre la faim et la malnutrition
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-border hover:shadow-lg transition-shadow">
                <div className="bg-green-50 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                  <Wheat className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Assistance Alimentaire d&apos;Urgence
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Distribution de vivres et assistance alimentaire d&apos;urgence
                  aux populations affectées par les crises et les chocs.
                </p>
                <div className="text-sm text-green-600 font-medium">
                  Réponse : Immédiate et ciblée
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-border hover:shadow-lg transition-shadow">
                <div className="bg-yellow-50 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                  <PackageIcon className="h-8 w-8 text-yellow-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Transferts Monétaires
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Programmes de transferts monétaires conditionnels et
                  inconditionnels pour améliorer l&apos;accès à l&apos;alimentation.
                </p>
                <div className="text-sm text-yellow-600 font-medium">
                  Modalité : Flexible et adaptée
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-border hover:shadow-lg transition-shadow">
                <div className="bg-orange-50 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Renforcement de la Résilience
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Programmes de renforcement de la résilience des ménages
                  face aux chocs climatiques et économiques.
                </p>
                <div className="text-sm text-orange-600 font-medium">
                  Approche : Préventive et durable
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-border hover:shadow-lg transition-shadow">
                <div className="bg-blue-50 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Appui aux Moyens d&apos;Existence
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Soutien aux activités génératrices de revenus et aux
                  moyens d&apos;existence des populations vulnérables.
                </p>
                <div className="text-sm text-blue-600 font-medium">
                  Focus : Autonomisation économique
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-border hover:shadow-lg transition-shadow">
                <div className="bg-purple-50 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                  <Target className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Analyse et Suivi
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Analyse de la sécurité alimentaire et suivi nutritionnel
                  des populations pour une intervention adaptée.
                </p>
                <div className="text-sm text-purple-600 font-medium">
                  Outil : Système d&apos;alerte précoce
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-border hover:shadow-lg transition-shadow">
                <div className="bg-teal-50 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Intervention Multisectorielle
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Approche intégrée combinant sécurité alimentaire, nutrition,
                  WASH et moyens d&apos;existence.
                </p>
                <div className="text-sm text-teal-600 font-medium">
                  Impact : Holistique et durable
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image et résultats */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <img
                  src={amssTerrainActivites}
                  alt="Sécurité alimentaire sur le terrain"
                  className="rounded-2xl shadow-lg w-full"
                />
              </div>

              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Impact Sécurité Alimentaire 2024
                </h2>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-green-100 p-3 rounded-lg">
                      <Wheat className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Assistance alimentaire</h3>
                      <p className="text-muted-foreground">
                        25 000+ personnes ont bénéficié d&apos;assistance alimentaire
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="bg-yellow-100 p-3 rounded-lg">
                      <PackageIcon className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Transferts monétaires</h3>
                      <p className="text-muted-foreground">
                        8 500 ménages soutenus par des transferts monétaires
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="bg-orange-100 p-3 rounded-lg">
                      <TrendingUp className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Résilience renforcée</h3>
                      <p className="text-muted-foreground">
                        12 000 ménages avec résilience alimentaire améliorée
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contexte Sahel */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Défis de la Sécurité Alimentaire au Sahel
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Le Sahel fait face à des défis majeurs en matière de sécurité alimentaire,
                  exacerbés par les changements climatiques, les conflits et la pauvreté.
                  L&apos;AMSS développe des réponses adaptées à ces défis complexes.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <span className="text-muted-foreground">
                      Variabilité climatique et sécheresses récurrentes
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                    <span className="text-muted-foreground">
                      Conflits et déplacements de populations
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                    <span className="text-muted-foreground">
                      Dégradation des terres et perte de biodiversité
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-muted-foreground">
                      Accès limité aux marchés et aux intrants agricoles
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <img
                  src={projetTablesBancs}
                  alt="Projet sécurité alimentaire"
                  className="rounded-2xl shadow-lg w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projets liés à ce domaine */}
      <section id="projets" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-foreground mb-3">
                Projets « Sécurité alimentaire &amp; Moyens d’existence »
              </h2>
              <p className="text-muted-foreground">
                Extrait automatique depuis notre base des projets (en cours et terminés).
              </p>
            </div>

            {projetsLiesPreview.length === 0 ? (
              <p className="text-center text-muted-foreground">
                Aucun projet listé pour ce domaine pour le moment.
              </p>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projetsLiesPreview.map((p, i) => (
                    <article key={i} className="bg-white rounded-xl p-6 shadow-sm border border-border">
                      <div className="flex items-center mb-3">
                        <div
                          className={`w-2.5 h-2.5 rounded-full mr-2 ${
                            p._status === 'En cours' ? 'bg-green-500' : 'bg-blue-500'
                          }`}
                        />
                        <span
                          className={`text-xs font-medium ${
                            p._status === 'En cours' ? 'text-green-700' : 'text-blue-700'
                          }`}
                        >
                          {p.status || p._status}
                        </span>
                      </div>

                      <h3 className="text-lg font-semibold text-foreground mb-2">{p.title}</h3>
                      {p.excerpt && <p className="text-sm text-muted-foreground mb-4">{p.excerpt}</p>}

                      <div className="space-y-1.5 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Région :</span>
                          <span className="font-medium text-right">{p.region || 'N/D'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Bailleur :</span>
                          <span className="font-medium text-right">{p.bailleur || p.donor || 'N/D'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Domaines :</span>
                          <span className="font-medium text-right">{p.domaine || p.domain || 'N/D'}</span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="text-center mt-8">
                  <Link to="/projets#cours" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <Button className="inline-flex items-center">
                      Voir tous les projets Sécurité alimentaire
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Statistiques */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-yellow-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Impact de nos Programmes Sécurité Alimentaire
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">45 000+</div>
                <div className="text-sm text-muted-foreground">Personnes assistées</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-600 mb-2">8 500</div>
                <div className="text-sm text-muted-foreground">Ménages soutenus</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">12 000</div>
                <div className="text-sm text-muted-foreground">Ménages résilients</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">8</div>
                <div className="text-sm text-muted-foreground">Régions couvertes</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Luttons Ensemble Contre la Faim
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Aidez-nous à assurer la sécurité alimentaire des populations du Sahel
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/don">
                <Button size="lg" className="text-lg px-8 py-3">
                  Faire un Don
                </Button>
              </Link>
              <Link to="/partenaires">
                <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                  Devenir Partenaire
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SecuriteAlimentairePage
