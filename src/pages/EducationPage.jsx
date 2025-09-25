import { GraduationCap, BookOpen, Users, Target, Award, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import educationSahel from '../assets/education-sahel.jpg'
import educationMali from '../assets/education-mali.jpg'

const EducationPage = () => {
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
              L'éducation est la clé du développement. L'AMSS développe des programmes 
              innovants d'alphabétisation, de scolarisation accélérée et de formation 
              professionnelle pour tous.
            </p>
          </div>
        </div>
      </section>

      {/* Nos programmes */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Nos Programmes Éducatifs
              </h2>
              <p className="text-xl text-muted-foreground">
                Des solutions adaptées pour chaque tranche d'âge
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-border hover:shadow-lg transition-shadow">
                <div className="bg-blue-50 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  SSA/Passerelle
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Stratégie de Scolarisation Accélérée pour les enfants non scolarisés 
                  ou déscolarisés de 8-12 ans.
                </p>
                <div className="text-sm text-blue-600 font-medium">
                  Âge cible: 8-12 ans
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-border hover:shadow-lg transition-shadow">
                <div className="bg-green-50 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  SSA2
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Stratégie de Scolarisation Accélérée Niveau 2 pour les adolescents 
                  de 13-14 ans.
                </p>
                <div className="text-sm text-green-600 font-medium">
                  Âge cible: 13-14 ans
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-border hover:shadow-lg transition-shadow">
                <div className="bg-purple-50 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                  <Target className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  S3A
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Stratégie d'Apprentissage Accéléré pour Adolescents et formation 
                  en entreprenariat.
                </p>
                <div className="text-sm text-purple-600 font-medium">
                  Âge cible: 15-35 ans
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-border hover:shadow-lg transition-shadow">
                <div className="bg-orange-50 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                  <Award className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Alphabétisation Active
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Programme d'alphabétisation pour les femmes des groupes 
                  d'épargne et de crédit.
                </p>
                <div className="text-sm text-orange-600 font-medium">
                  Cible: Femmes adultes
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
                  src={educationSahel} 
                  alt="Éducation au Sahel" 
                  className="rounded-2xl shadow-lg w-full"
                />
              </div>
              
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Résultats 2024
                </h2>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <TrendingUp className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Taux de réussite élevé</h3>
                      <p className="text-muted-foreground">
                        99,01% de taux d'admission en SSA/P pour l'année scolaire 2021-2022
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="bg-green-100 p-3 rounded-lg">
                      <Users className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Centres actifs</h3>
                      <p className="text-muted-foreground">
                        Plus de 50 centres SSA/P et AA ouverts dans les régions d'intervention
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <Award className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Formation professionnelle</h3>
                      <p className="text-muted-foreground">
                        40 jeunes S3A formés et installés avec des kits d'installation
                      </p>
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
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Partenariat avec la Fondation Stromme
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  L'AMSS travaille en étroite collaboration avec la Fondation Stromme Afrique 
                  de l'Ouest dans le cadre du plan stratégique 2024-2028 pour développer 
                  l'éducation et la microfinance au Mali.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-muted-foreground">
                      Zones d'intervention: Tombouctou, Alafia, Goundam, Mountougoula
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <span className="text-muted-foreground">
                      Programmes intégrés: Éducation, microfinance, entreprenariat
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    <span className="text-muted-foreground">
                      Innovation: Projet Green Jobs avec fabrication de tables-bancs plastiques
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                <img 
                  src={educationMali} 
                  alt="Éducation au Mali" 
                  className="rounded-2xl shadow-lg w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistiques */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Impact de nos Programmes Éducatifs
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">1,500+</div>
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
                <div className="text-4xl font-bold text-orange-600 mb-2">1,000+</div>
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
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Soutenez l'Éducation au Sahel
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Chaque enfant mérite une chance d'apprendre et de se développer
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-3">
                Faire un Don
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                Devenir Partenaire
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default EducationPage

