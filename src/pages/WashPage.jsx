// src/pages/WashPage.jsx
import React, { useMemo } from 'react'
import { hasCanon } from '@/utils/domainesCanon'
import { Link } from 'react-router-dom'
import { Droplets, Waves, Sparkles, Users, TrendingUp, MapPin, ArrowRight, CheckCircle, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'

const CANON_KEY = 'WASH'

// images “vitrine”
import amssTerrainActivites from '../assets/amss-terrain-activites.jpeg'
import projetTablesBancs from '../assets/projet-tables-bancs-amss.jpeg'

// données projets (déjà normalisées par migrate-projets)
import { projetsEnCours, projetsTermines } from '../data/projetsData'

// utils locaux
const splitDomains = (label) =>
  String(label || '')
    .split(/[,/|;]+/)
    .map(s => s.trim())
    .filter(Boolean)

const CANON_KEY = 'WASH'
const predicateCanon = (p) => hasCanon(p, CANON_KEY)


const WashPage = () => {
  // listes WASH (en cours / terminés)
  const washEnCours = useMemo(
    () => (projetsEnCours || []).filter(p => isWashDomain(p.domain)),
    []
  )
  const washTermines = useMemo(
    () => (projetsTermines || []).filter(p => isWashDomain(p.domain)),
    []
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-cyan-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Droplets className="h-16 w-16 text-blue-600 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              WASH — Eau, Assainissement et Hygiène
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              L&apos;AMSS améliore l&apos;accès à l&apos;eau potable, aux services d&apos;assainissement
              et promeut les bonnes pratiques d&apos;hygiène dans les communautés du Sahel.
            </p>
          </div>
        </div>
      </section>

      {/* Nos interventions WASH */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Nos Interventions WASH</h2>
              <p className="text-xl text-muted-foreground">Des solutions durables pour l&apos;eau, l&apos;assainissement et l&apos;hygiène</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-border hover:shadow-lg transition-shadow">
                <div className="bg-blue-50 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                  <Droplets className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Accès à l&apos;Eau Potable</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Construction et réhabilitation de forages, puits et systèmes d&apos;adduction d&apos;eau.
                </p>
                <div className="text-sm text-blue-600 font-medium">Impact : Communautés rurales</div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-border hover:shadow-lg transition-shadow">
                <div className="bg-cyan-50 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                  <Waves className="h-8 w-8 text-cyan-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Assainissement</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Construction de latrines familiales et scolaires, gestion des déchets solides et liquides.
                </p>
                <div className="text-sm text-cyan-600 font-medium">Cible : Ménages et écoles</div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-border hover:shadow-lg transition-shadow">
                <div className="bg-green-50 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                  <Sparkles className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Promotion de l&apos;Hygiène</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Sensibilisation au lavage des mains, traitement et conservation de l&apos;eau.
                </p>
                <div className="text-sm text-green-600 font-medium">Formation : Communautés entières</div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-border hover:shadow-lg transition-shadow">
                <div className="bg-purple-50 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Comités de Gestion</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Mise en place et accompagnement des comités pour la durabilité des points d&apos;eau.
                </p>
                <div className="text-sm text-purple-600 font-medium">Gouvernance : Locale et participative</div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-border hover:shadow-lg transition-shadow">
                <div className="bg-orange-50 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">WASH en Urgence</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Interventions rapides pour les populations déplacées et affectées par les crises.
                </p>
                <div className="text-sm text-orange-600 font-medium">Réponse : Rapide et adaptée</div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-border hover:shadow-lg transition-shadow">
                <div className="bg-teal-50 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Renforcement des Capacités</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Formation des techniciens et autorités pour une gestion durable des infrastructures.
                </p>
                <div className="text-sm text-teal-600 font-medium">Durabilité : Long terme</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image + résultats */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <img
                  src={amssTerrainActivites}
                  alt="Activités WASH sur le terrain"
                  className="rounded-2xl shadow-lg w-full"
                />
              </div>

              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">Réalisations WASH 2024</h2>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Droplets className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Points d&apos;eau réalisés</h3>
                      <p className="text-muted-foreground">25 forages et 15 puits réhabilités dans 8 régions</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="bg-cyan-100 p-3 rounded-lg">
                      <Waves className="h-6 w-6 text-cyan-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Assainissement</h3>
                      <p className="text-muted-foreground">500 latrines familiales et 50 latrines scolaires</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="bg-green-100 p-3 rounded-lg">
                      <Sparkles className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Sensibilisation</h3>
                      <p className="text-muted-foreground">15 000 personnes sensibilisées aux bonnes pratiques d&apos;hygiène</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projets WASH en cours */}
      <section id="projets-wash" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Clock className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold text-foreground">Projets WASH en cours</h2>
            </div>

            {washEnCours.length === 0 ? (
              <p className="text-muted-foreground">Aucun projet WASH en cours dans les données actuelles.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {washEnCours.map((p, i) => (
                  <article key={i} className="bg-white rounded-xl p-6 shadow-sm border border-border">
                    <div className="flex items-center mb-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-2" />
                      <span className="text-sm font-medium text-green-600">{p.status || 'En cours'}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{p.title}</h3>
                    {p.excerpt && <p className="text-muted-foreground text-sm mb-4">{p.excerpt}</p>}

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between"><span className="text-muted-foreground">Région :</span><span className="font-medium text-right">{p.region || 'N/D'}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Bailleur :</span><span className="font-medium text-right">{p.donor || 'N/D'}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Domaine :</span><span className="font-medium text-right">{p.domain || 'WASH'}</span></div>
                    </div>
                  </article>
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
        </div>
      </section>

      {/* Projets WASH terminés */}
      <section id="projets-wash-termines" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <CheckCircle className="h-8 w-8 text-accent" />
              <h2 className="text-3xl font-bold text-foreground">Projets WASH terminés</h2>
            </div>

            {washTermines.length === 0 ? (
              <p className="text-muted-foreground">Aucun projet WASH terminé dans les données actuelles.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {washTermines.map((p, i) => (
                  <article key={i} className="bg-white rounded-xl p-6 shadow-sm border border-border">
                    <div className="flex items-center mb-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-2" />
                      <span className="text-sm font-medium text-blue-600">Terminé</span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{p.title}</h3>
                    {p.excerpt && <p className="text-muted-foreground text-sm mb-4">{p.excerpt}</p>}

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between"><span className="text-muted-foreground">Période :</span><span className="font-medium text-right">{safeYear(p.startDate)}–{safeYear(p.endDate)}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Région :</span><span className="font-medium text-right">{p.region || 'N/D'}</span></div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Bénéficiaires :</span>
                        <span className="font-medium text-right">
                          {typeof p.beneficiaries === 'number' ? p.beneficiaries.toLocaleString('fr-FR') : 'N/D'}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            <div className="text-center mt-8">
              <Link to="/projets#termines">
                <Button variant="outline" className="inline-flex items-center">
                  Voir tous les projets terminés
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Approche communautaire */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">Approche Communautaire WASH</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Nous impliquons les communautés à toutes les étapes des projets WASH, de la planification
                  à la maintenance des infrastructures, pour garantir la durabilité.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3"><div className="w-2 h-2 bg-blue-600 rounded-full"></div><span className="text-muted-foreground">Diagnostic participatif des besoins</span></div>
                  <div className="flex items-center space-x-3"><div className="w-2 h-2 bg-cyan-600 rounded-full"></div><span className="text-muted-foreground">Comités de gestion des points d&apos;eau</span></div>
                  <div className="flex items-center space-x-3"><div className="w-2 h-2 bg-green-600 rounded-full"></div><span className="text-muted-foreground">Sensibilisation continue à l&apos;hygiène</span></div>
                  <div className="flex items-center space-x-3"><div className="w-2 h-2 bg-purple-600 rounded-full"></div><span className="text-muted-foreground">Suivi post-projet</span></div>
                </div>
              </div>

              <div>
                <img
                  src={projetTablesBancs}
                  alt="Projet communautaire AMSS"
                  className="rounded-2xl shadow-lg w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistiques */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Impact de nos Interventions WASH</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">50 000+</div>
                <div className="text-sm text-muted-foreground">Personnes avec accès à l&apos;eau</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-cyan-600 mb-2">550</div>
                <div className="text-sm text-muted-foreground">Latrines construites</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">40</div>
                <div className="text-sm text-muted-foreground">Points d&apos;eau réalisés</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">80</div>
                <div className="text-sm text-muted-foreground">Comités formés</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">L&apos;Eau, source de vie au Sahel</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Aidez-nous à apporter l&apos;eau potable et l&apos;assainissement aux communautés
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

export default WashPage
