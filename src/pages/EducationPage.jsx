// src/pages/EducationPage.jsx
import React, { useMemo } from 'react'
import { GraduationCap, BookOpen, Users, Target, Award, TrendingUp, MapPin, Building2, Clock, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

// données projets
import { projetsEnCours, projetsTermines } from '../data/projetsData'

// images
import educationSahel from '../assets/education-sahel.jpg'
import educationMali from '../assets/education-mali.jpg'

// domaines canoniques
import { hasCanon } from '@/utils/domainesCanon'

// Clé canon unique (déclarée une seule fois, scope module)
const CANON_KEY = 'EDUCATION'

// Utils d'affichage
const isNum = (v) => typeof v === 'number' && Number.isFinite(v)
const fmt = (n) => (isNum(n) ? n.toLocaleString('fr-FR') : 'N/D')

function ProjectCard({ p }) {
  const status = String(p.status || '').toLowerCase()
  const enCours = status.includes('en cours') || status === 'en' || status === 'en-cours'
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-border">
      <div className="flex items-center justify-between text-xs mb-2">
        {enCours ? (
          <span className="inline-flex items-center px-2 py-0.5 rounded bg-green-100 text-green-700">
            <Clock className="h-3 w-3 mr-1" /> En cours
          </span>
        ) : (
          <span className="inline-flex items-center px-2 py-0.5 rounded bg-blue-100 text-blue-700">
            <CheckCircle className="h-3 w-3 mr-1" /> Terminé
          </span>
        )}
        {p.usaidNote && (
          <span className="px-2 py-0.5 rounded bg-red-100 text-red-700 border border-red-200">
            Suspendu (USAID)
          </span>
        )}
      </div>

      <div className="font-medium mb-1">{p.title}</div>
      {p.excerpt && <div className="text-sm text-muted-foreground line-clamp-3">{p.excerpt}</div>}

      <div className="mt-3 text-xs text-muted-foreground space-y-1">
        {(p.bailleur || p.donor) && (
          <div className="inline-flex items-center gap-1">
            <Building2 className="h-3 w-3" />
            <strong>Bailleur:</strong>&nbsp;{p.bailleur || p.donor}
          </div>
        )}
        {p.region && (
          <div className="inline-flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {p.region}
          </div>
        )}
        {p.beneficiaries !== undefined && (
          <div className="inline-flex items-center gap-1">
            <Users className="h-3 w-3" />
            {fmt(p.beneficiaries)} bénéficiaires
          </div>
        )}
      </div>
    </div>
  )
}

export default function EducationPage() {
  // Sélectionne les projets Éducation (en cours & terminés) via le domaine canon
  const projetsEduEnCours = useMemo(
    () => (projetsEnCours || []).filter((p) => hasCanon(p, CANON_KEY)),
    []
  )
  const projetsEduTermines = useMemo(
    () => (projetsTermines || []).filter((p) => hasCanon(p, CANON_KEY)),
    []
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <GraduationCap className="h-16 w-16 text-blue-600 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Éducation et Formation
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              L&apos;éducation est la clé du développement. L&apos;AMSS développe des programmes
              innovants d&apos;alphabétisation, de scolarisation accélérée et de formation
              professionnelle pour tous.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              <Link to="/projets?domain=Éducation">
                <Button variant="default" size="lg" className="gap-2">
                  Voir les projets Éducation
                  <GraduationCap className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/projets">
                <Button variant="outline" size="lg">Tous les projets</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Nos Programmes Éducatifs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Nos Programmes Éducatifs</h2>
              <p className="text-xl text-muted-foreground">Des solutions adaptées pour chaque tranche d&apos;âge</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-border hover:shadow-lg transition-shadow">
                <div className="bg-blue-50 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">SSA/Passerelle</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Stratégie de Scolarisation Accélérée pour les enfants non scolarisés ou déscolarisés de 8–12 ans.
                </p>
                <div className="text-sm text-blue-600 font-medium">Âge cible: 8–12 ans</div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-border hover:shadow-lg transition-shadow">
                <div className="bg-green-50 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">SSA2</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Stratégie de Scolarisation Accélérée Niveau 2 pour les adolescents de 13–14 ans.
                </p>
                <div className="text-sm text-green-600 font-medium">Âge cible: 13–14 ans</div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-border hover:shadow-lg transition-shadow">
                <div className="bg-purple-50 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                  <Target className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">S3A</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Stratégie d&apos;Apprentissage Accéléré pour Adolescents et formation en entreprenariat.
                </p>
                <div className="text-sm text-purple-600 font-medium">Âge cible: 15–35 ans</div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-border hover:shadow-lg transition-shadow">
                <div className="bg-orange-50 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                  <Award className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Alphabétisation Active</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Programme d&apos;alphabétisation pour les femmes des groupes d&apos;épargne et de crédit.
                </p>
                <div className="text-sm text-orange-600 font-medium">Cible: Femmes adultes</div>
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
                <img src={educationSahel} alt="Éducation au Sahel" className="rounded-2xl shadow-lg w-full" />
              </div>

              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">Résultats 2024</h2>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <TrendingUp className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Taux de réussite élevé</h3>
                      <p className="text-muted-foreground">99,01% de taux d&apos;admission en SSA/P (2021–2022)</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="bg-green-100 p-3 rounded-lg">
                      <Users className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Centres actifs</h3>
                      <p className="text-muted-foreground">50+ centres SSA/P &amp; AA ouverts dans nos régions</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <Award className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Formation professionnelle</h3>
                      <p className="text-muted-foreground">40 jeunes S3A formés et installés avec des kits</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partenariat Fondation Stromme */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">Partenariat avec la Fondation Stromme</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  L&apos;AMSS travaille en étroite collaboration avec la Fondation Stromme Afrique de l&apos;Ouest
                  dans le cadre du plan stratégique 2024–2028 pour développer l&apos;éducation et la microfinance au Mali.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full" />
                    <span className="text-muted-foreground">
                      Zones d&apos;intervention: Tombouctou, Alafia, Goundam, Mountougoula
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full" />
                    <span className="text-muted-foreground">Programmes intégrés: Éducation, microfinance, entreprenariat</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-600 rounded-full" />
                    <span className="text-muted-foreground">
                      Innovation: Projet Green Jobs avec fabrication de tables-bancs plastiques
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <img src={educationMali} alt="Éducation au Mali" className="rounded-2xl shadow-lg w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projets d'Éducation — En cours */}
      <section id="projets-education" className="py-16 bg-muted/20 scroll-mt-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-foreground">Projets d&apos;éducation en cours</h2>
              <p className="text-muted-foreground">Liste générée automatiquement depuis la base de projets.</p>
            </div>

            {projetsEduEnCours.length === 0 ? (
              <div className="text-sm text-muted-foreground">Aucun projet en cours pour ce domaine.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projetsEduEnCours.map((p, i) => (
                  <ProjectCard key={`edu-en-${i}`} p={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Projets d'Éducation — Terminés */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-foreground">Projets d&apos;éducation terminés</h3>
            </div>

            {projetsEduTermines.length === 0 ? (
              <div className="text-sm text-muted-foreground">Aucun projet terminé pour ce domaine.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projetsEduTermines.map((p, i) => (
                  <ProjectCard key={`edu-out-${i}`} p={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Statistiques */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Impact de nos Programmes Éducatifs</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">1 500+</div>
                <div className="text-sm text-muted-foreground">Apprenants SSA/P</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">200+</div>
                <div className="text-sm text-muted-foreground">Adolescents SSA2</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">100+</div>
                <div className="text-sm text-muted-foreground">Jeunes S3A formés</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">1 000+</div>
                <div className="text-sm text-muted-foreground">Femmes alphabétisées</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">Soutenez l&apos;Éducation au Sahel</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Chaque enfant mérite une chance d&apos;apprendre et de se développer
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-3" asChild>
                <Link to="/don">Faire un Don</Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-3" asChild>
                <Link to="/partenaires">Devenir Partenaire</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
