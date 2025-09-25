import { Scale, Users, Handshake, MessageSquare, Target, Building } from 'lucide-react'
import { Button } from '@/components/ui/button'
import amssSecuriteHumaine from '../assets/amss-securite-humaine.jpeg'
import projetTablesBancs from '../assets/projet-tables-bancs-amss.jpeg'

const GouvernancePage = () => {
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
              L'AMSS promeut la bonne gouvernance, la cohésion sociale et la paix 
              durable dans les communautés du Mali à travers des approches participatives.
            </p>
          </div>
        </div>
      </section>

      {/* Nos interventions Gouvernance */}
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
              <div className="bg-white rounded-xl p-6 shadow-sm border border-border hover:shadow-lg transition-shadow">
                <div className="bg-indigo-50 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                  <Scale className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Renforcement Institutionnel
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Appui aux institutions locales et nationales pour améliorer 
                  la gouvernance et la prestation de services publics.
                </p>
                <div className="text-sm text-indigo-600 font-medium">
                  Focus: Institutions publiques
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-border hover:shadow-lg transition-shadow">
                <div className="bg-blue-50 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                  <Handshake className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Cohésion Sociale
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Programmes de réconciliation et de cohésion sociale entre 
                  les différentes communautés et groupes ethniques.
                </p>
                <div className="text-sm text-blue-600 font-medium">
                  Approche: Dialogue intercommunautaire
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-border hover:shadow-lg transition-shadow">
                <div className="bg-green-50 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                  <MessageSquare className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Médiation et Résolution de Conflits
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Formation de médiateurs communautaires et mise en place 
                  de mécanismes de résolution pacifique des conflits.
                </p>
                <div className="text-sm text-green-600 font-medium">
                  Méthode: Médiation traditionnelle
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-border hover:shadow-lg transition-shadow">
                <div className="bg-purple-50 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Participation Citoyenne
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Renforcement de la participation citoyenne dans les processus 
                  de prise de décision et de gouvernance locale.
                </p>
                <div className="text-sm text-purple-600 font-medium">
                  Cible: Citoyens et leaders
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-border hover:shadow-lg transition-shadow">
                <div className="bg-orange-50 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                  <Target className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Lutte contre l'Extrémisme Violent
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Programmes de prévention de l'extrémisme violent et de 
                  promotion de la tolérance et du vivre ensemble.
                </p>
                <div className="text-sm text-orange-600 font-medium">
                  Prévention: Communautaire
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-border hover:shadow-lg transition-shadow">
                <div className="bg-teal-50 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                  <Building className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Plaidoyer et Lobbying
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Actions de plaidoyer pour l'amélioration des politiques 
                  publiques et la promotion des droits humains.
                </p>
                <div className="text-sm text-teal-600 font-medium">
                  Niveau: National et local
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
                  alt="Gouvernance et sécurité humaine" 
                  className="rounded-2xl shadow-lg w-full"
                />
              </div>
              
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Impact Gouvernance 2024
                </h2>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-indigo-100 p-3 rounded-lg">
                      <Scale className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Institutions renforcées</h3>
                      <p className="text-muted-foreground">
                        50+ institutions locales appuyées et renforcées
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Handshake className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Réconciliation</h3>
                      <p className="text-muted-foreground">
                        30 accords de réconciliation intercommunautaire signés
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="bg-green-100 p-3 rounded-lg">
                      <MessageSquare className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Médiateurs formés</h3>
                      <p className="text-muted-foreground">
                        200+ médiateurs communautaires formés et actifs
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Processus de paix locaux */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Processus de Paix Locaux
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  L'AMSS travaille à rendre les processus locaux de paix plus efficaces 
                  et inclusifs, en augmentant la résilience communautaire pour soutenir 
                  la stabilité et la cohésion sociale au Mali.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                    <span className="text-muted-foreground">
                      Dialogue intercommunautaire et interreligieux
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-muted-foreground">
                      Renforcement des mécanismes traditionnels de résolution
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <span className="text-muted-foreground">
                      Formation des jeunes aux techniques de médiation
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    <span className="text-muted-foreground">
                      Promotion de la participation des femmes dans la paix
                    </span>
                  </div>
                </div>
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

      {/* Statistiques */}
      <section className="py-16 bg-gradient-to-br from-indigo-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Impact de nos Programmes Gouvernance
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-indigo-600 mb-2">50+</div>
                <div className="text-sm text-muted-foreground">Institutions renforcées</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">30</div>
                <div className="text-sm text-muted-foreground">Accords de paix</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">200+</div>
                <div className="text-sm text-muted-foreground">Médiateurs formés</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">100+</div>
                <div className="text-sm text-muted-foreground">Leaders impliqués</div>
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
              Construisons la Paix Ensemble
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Soutenez nos efforts pour une gouvernance inclusive et une paix durable
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

export default GouvernancePage

