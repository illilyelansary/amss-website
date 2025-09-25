import { Shield, Users, Heart, AlertTriangle, TrendingUp, UserCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import amssSecuriteHumaine from '../assets/amss-securite-humaine.jpeg'
import projetTablesBancs from '../assets/projet-tables-bancs-amss.jpeg'

const ProtectionPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Shield className="h-16 w-16 text-purple-600 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Protection et Violences Basées sur le Genre
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              L'AMSS œuvre pour la protection des populations vulnérables et la lutte 
              contre les violences basées sur le genre dans les communautés du Mali.
            </p>
          </div>
        </div>
      </section>

      {/* Nos interventions Protection */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Nos Interventions Protection
              </h2>
              <p className="text-xl text-muted-foreground">
                Des programmes intégrés pour protéger les plus vulnérables
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-border hover:shadow-lg transition-shadow">
                <div className="bg-purple-50 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Protection de l'Enfance
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Prévention et prise en charge des cas de violence, exploitation 
                  et abus contre les enfants dans les communautés.
                </p>
                <div className="text-sm text-purple-600 font-medium">
                  Focus: Enfants vulnérables
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-border hover:shadow-lg transition-shadow">
                <div className="bg-pink-50 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="h-8 w-8 text-pink-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Lutte contre les VBG
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Prévention, sensibilisation et prise en charge des violences 
                  basées sur le genre, notamment contre les femmes et filles.
                </p>
                <div className="text-sm text-pink-600 font-medium">
                  Cible: Femmes et filles
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-border hover:shadow-lg transition-shadow">
                <div className="bg-blue-50 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Assistance aux Déplacés
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Protection et assistance aux populations déplacées internes 
                  et aux réfugiés dans les zones d'accueil.
                </p>
                <div className="text-sm text-blue-600 font-medium">
                  Support: Déplacés internes
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-border hover:shadow-lg transition-shadow">
                <div className="bg-orange-50 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                  <AlertTriangle className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Gestion de Cas
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Identification, référencement et suivi individualisé des cas 
                  de protection nécessitant une assistance spécialisée.
                </p>
                <div className="text-sm text-orange-600 font-medium">
                  Approche: Individualisée
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-border hover:shadow-lg transition-shadow">
                <div className="bg-green-50 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                  <UserCheck className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Renforcement Communautaire
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Formation des leaders communautaires et des comités de protection 
                  pour une réponse locale efficace.
                </p>
                <div className="text-sm text-green-600 font-medium">
                  Capacité: Communautaire
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-border hover:shadow-lg transition-shadow">
                <div className="bg-teal-50 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Plaidoyer et Sensibilisation
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Campagnes de sensibilisation et plaidoyer pour le changement 
                  des normes sociales néfastes.
                </p>
                <div className="text-sm text-teal-600 font-medium">
                  Impact: Changement social
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
                  src={amssSecuriteHumaine} 
                  alt="Sécurité humaine et protection" 
                  className="rounded-2xl shadow-lg w-full"
                />
              </div>
              
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Impact Protection 2024
                </h2>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <Shield className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Enfants protégés</h3>
                      <p className="text-muted-foreground">
                        1,200+ enfants bénéficient de services de protection
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="bg-pink-100 p-3 rounded-lg">
                      <Heart className="h-6 w-6 text-pink-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Survivantes VBG</h3>
                      <p className="text-muted-foreground">
                        800+ femmes et filles accompagnées et prises en charge
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Déplacés assistés</h3>
                      <p className="text-muted-foreground">
                        5,000+ personnes déplacées bénéficient de protection
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partenariat UNHCR */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Partenariat avec l'UNHCR Mali
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  L'AMSS travaille en étroite collaboration avec l'UNHCR Mali et la DDC 
                  pour éradiquer les Violences Basées sur le Genre à travers des projets 
                  de protection intégrés et des approches communautaires.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    <span className="text-muted-foreground">
                      Sensibilisation sur le mariage précoce et forcé
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-pink-600 rounded-full"></div>
                    <span className="text-muted-foreground">
                      Prise en charge psychosociale des survivantes
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-muted-foreground">
                      Formation des acteurs de protection communautaire
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <span className="text-muted-foreground">
                      Renforcement des mécanismes de référencement
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                <img 
                  src={projetTablesBancs} 
                  alt="Projet de protection communautaire" 
                  className="rounded-2xl shadow-lg w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistiques */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Impact de nos Programmes Protection
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">7,000+</div>
                <div className="text-sm text-muted-foreground">Personnes protégées</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-pink-600 mb-2">800+</div>
                <div className="text-sm text-muted-foreground">Survivantes VBG</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">150</div>
                <div className="text-sm text-muted-foreground">Leaders formés</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">50</div>
                <div className="text-sm text-muted-foreground">Comités créés</div>
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
              Protégeons les Plus Vulnérables
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Ensemble, construisons un environnement sûr pour tous
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

export default ProtectionPage

