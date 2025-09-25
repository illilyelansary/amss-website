import { Heart, Users, Activity, Shield, TrendingUp, Stethoscope } from 'lucide-react'
import { Button } from '@/components/ui/button'
import santeMali from '../assets/sante-mali.jpg'
import santeNutrition from '../assets/sante-nutrition.jpg'

const SantePage = () => {
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
              L'AMSS œuvre pour l'amélioration de l'accès aux soins de santé de qualité 
              et la lutte contre la malnutrition dans les communautés vulnérables du Mali.
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
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Santé de la Reproduction
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Amélioration de l'accès aux services de santé reproductive et 
                  maternelle dans les zones reculées.
                </p>
                <div className="text-sm text-red-600 font-medium">
                  Focus: Femmes et adolescentes
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-border hover:shadow-lg transition-shadow">
                <div className="bg-orange-50 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                  <Activity className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Nutrition Communautaire
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Programmes de lutte contre la malnutrition aiguë et chronique 
                  chez les enfants de moins de 5 ans.
                </p>
                <div className="text-sm text-orange-600 font-medium">
                  Cible: Enfants 0-5 ans
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-border hover:shadow-lg transition-shadow">
                <div className="bg-green-50 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Prévention et Vaccination
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Campagnes de vaccination et sensibilisation aux maladies 
                  évitables par la vaccination.
                </p>
                <div className="text-sm text-green-600 font-medium">
                  Couverture: Communautés entières
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-border hover:shadow-lg transition-shadow">
                <div className="bg-blue-50 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Agents de Santé Communautaire
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Formation et équipement d'agents de santé communautaire 
                  pour les soins de proximité.
                </p>
                <div className="text-sm text-blue-600 font-medium">
                  Réseau: 200+ agents formés
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-border hover:shadow-lg transition-shadow">
                <div className="bg-purple-50 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Santé Mentale
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Prise en charge psychosociale des populations affectées 
                  par les conflits et les déplacements.
                </p>
                <div className="text-sm text-purple-600 font-medium">
                  Support: Déplacés internes
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-border hover:shadow-lg transition-shadow">
                <div className="bg-teal-50 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Renforcement du Système
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Appui aux structures sanitaires locales et amélioration 
                  de la qualité des services.
                </p>
                <div className="text-sm text-teal-600 font-medium">
                  Impact: Centres de santé
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
                  src={santeMali} 
                  alt="Santé au Mali" 
                  className="rounded-2xl shadow-lg w-full"
                />
              </div>
              
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Impact Santé 2024
                </h2>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-red-100 p-3 rounded-lg">
                      <Heart className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Santé Maternelle</h3>
                      <p className="text-muted-foreground">
                        2,500+ femmes ont bénéficié de consultations prénatales
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="bg-orange-100 p-3 rounded-lg">
                      <Activity className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Nutrition Infantile</h3>
                      <p className="text-muted-foreground">
                        1,800+ enfants traités pour malnutrition aiguë sévère
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="bg-green-100 p-3 rounded-lg">
                      <Shield className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Vaccination</h3>
                      <p className="text-muted-foreground">
                        85% de couverture vaccinale dans les zones d'intervention
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Approche intégrée */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Approche Intégrée Santé-Nutrition
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  L'AMSS développe une approche holistique qui combine les interventions 
                  de santé et de nutrition pour maximiser l'impact sur les communautés 
                  bénéficiaires.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                    <span className="text-muted-foreground">
                      Centres de santé communautaires renforcés
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                    <span className="text-muted-foreground">
                      Unités de récupération nutritionnelle ambulatoire
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <span className="text-muted-foreground">
                      Sensibilisation communautaire aux bonnes pratiques
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-muted-foreground">
                      Formation continue du personnel de santé
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                <img 
                  src={santeNutrition} 
                  alt="Santé et Nutrition" 
                  className="rounded-2xl shadow-lg w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistiques */}
      <section className="py-16 bg-gradient-to-br from-red-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Impact de nos Programmes Santé
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-red-600 mb-2">15,000+</div>
                <div className="text-sm text-muted-foreground">Consultations médicales</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">2,500+</div>
                <div className="text-sm text-muted-foreground">Femmes suivies</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">1,800+</div>
                <div className="text-sm text-muted-foreground">Enfants traités</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">200+</div>
                <div className="text-sm text-muted-foreground">Agents formés</div>
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
              Soutenez la Santé au Sahel
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Chaque vie compte. Aidez-nous à améliorer l'accès aux soins de santé
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

export default SantePage

