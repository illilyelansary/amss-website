import { Calendar, MapPin, Users, DollarSign, CheckCircle, Filter, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { projetsTermines } from '../data/projetsData'
import { useState } from 'react'

const ProjetsTerminesPage = () => {
  const [filtreRegion, setFiltreRegion] = useState('Toutes')
  const [filtreDomaine, setFiltreDomaine] = useState('Tous')
  const [filtreAnnee, setFiltreAnnee] = useState('Toutes')

  const regions = ['Toutes', ...new Set(projetsTermines.map(projet => projet.region))]
  const domaines = ['Tous', ...new Set(projetsTermines.map(projet => projet.domain))]
  const annees = ['Toutes', ...new Set(projetsTermines.map(projet => new Date(projet.endDate).getFullYear())).sort((a, b) => b - a)]

  const projetsFiltres = projetsTermines.filter(projet => {
    const regionMatch = filtreRegion === 'Toutes' || projet.region === filtreRegion
    const domaineMatch = filtreDomaine === 'Tous' || projet.domain === filtreDomaine
    const anneeMatch = filtreAnnee === 'Toutes' || new Date(projet.endDate).getFullYear() == filtreAnnee
    return regionMatch && domaineMatch && anneeMatch
  })

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatNumber = (number) => {
    return new Intl.NumberFormat('fr-FR').format(number)
  }

  const getDuree = (startDate, endDate) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffTime = Math.abs(end - start)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    const diffMonths = Math.round(diffDays / 30)
    
    if (diffMonths < 12) {
      return `${diffMonths} mois`
    } else {
      const years = Math.floor(diffMonths / 12)
      const remainingMonths = diffMonths % 12
      return remainingMonths > 0 ? `${years} an${years > 1 ? 's' : ''} ${remainingMonths} mois` : `${years} an${years > 1 ? 's' : ''}`
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Nos Projets Terminés
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Découvrez les réalisations et l'impact des projets que l'AMSS a menés à bien 
              au service des populations vulnérables du Mali.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">{projetsTermines.length}</div>
                <div className="text-sm text-muted-foreground">Projets réalisés</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {formatNumber(projetsTermines.reduce((total, projet) => total + projet.beneficiaries, 0))}+
                </div>
                <div className="text-sm text-muted-foreground">Bénéficiaires touchés</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  {new Set(projetsTermines.map(p => p.region)).size}
                </div>
                <div className="text-sm text-muted-foreground">Régions impactées</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">
                  {new Set(projetsTermines.map(p => p.domain)).size}
                </div>
                <div className="text-sm text-muted-foreground">Domaines couverts</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filtres */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">Filtrer par :</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium">Région :</label>
                <select 
                  value={filtreRegion} 
                  onChange={(e) => setFiltreRegion(e.target.value)}
                  className="px-3 py-1 border border-border rounded-md bg-background"
                >
                  {regions.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium">Domaine :</label>
                <select 
                  value={filtreDomaine} 
                  onChange={(e) => setFiltreDomaine(e.target.value)}
                  className="px-3 py-1 border border-border rounded-md bg-background"
                >
                  {domaines.map(domaine => (
                    <option key={domaine} value={domaine}>{domaine}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium">Année :</label>
                <select 
                  value={filtreAnnee} 
                  onChange={(e) => setFiltreAnnee(e.target.value)}
                  className="px-3 py-1 border border-border rounded-md bg-background"
                >
                  {annees.map(annee => (
                    <option key={annee} value={annee}>{annee}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Liste des projets */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 gap-8">
              {projetsFiltres.map((projet) => (
                <div key={projet.id} className="bg-white rounded-xl shadow-sm border border-border overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                    {/* Image */}
                    <div className="lg:col-span-1 relative">
                      <img 
                        src={projet.image} 
                        alt={projet.title}
                        className="w-full h-64 lg:h-full object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <div className="flex items-center space-x-2 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          <CheckCircle className="h-4 w-4" />
                          <span>Terminé</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Contenu */}
                    <div className="lg:col-span-2 p-6">
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                          {projet.domain}
                        </span>
                        <span className="px-3 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full">
                          {projet.region}
                        </span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
                          {new Date(projet.endDate).getFullYear()}
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold text-foreground mb-3">
                        {projet.title}
                      </h3>
                      
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {projet.excerpt}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center space-x-3">
                          <Calendar className="h-5 w-5 text-blue-600" />
                          <div>
                            <div className="text-sm font-medium">Période d'exécution</div>
                            <div className="text-sm text-muted-foreground">
                              {formatDate(projet.startDate)} - {formatDate(projet.endDate)}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Durée: {getDuree(projet.startDate, projet.endDate)}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <MapPin className="h-5 w-5 text-green-600" />
                          <div>
                            <div className="text-sm font-medium">Zone d'intervention</div>
                            <div className="text-sm text-muted-foreground">{projet.region}</div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <Users className="h-5 w-5 text-purple-600" />
                          <div>
                            <div className="text-sm font-medium">Impact</div>
                            <div className="text-sm text-muted-foreground">
                              {formatNumber(projet.beneficiaries)} bénéficiaires
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <Award className="h-5 w-5 text-orange-600" />
                          <div>
                            <div className="text-sm font-medium">Partenaire financier</div>
                            <div className="text-sm text-muted-foreground">{projet.donor}</div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button className="flex-1">
                          Voir les résultats
                        </Button>
                        <Button variant="outline">
                          Télécharger le rapport
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {projetsFiltres.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  Aucun projet ne correspond aux filtres sélectionnés.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Bilan global */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Bilan de nos Réalisations
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              Plus de 30 ans d'engagement au service des populations vulnérables du Mali
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">50+</div>
                <div className="text-sm text-muted-foreground">Projets réalisés depuis 2011</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">200K+</div>
                <div className="text-sm text-muted-foreground">Bénéficiaires cumulés</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">20+</div>
                <div className="text-sm text-muted-foreground">Partenaires mobilisés</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">8</div>
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
              Continuons Ensemble
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Fort de ces réalisations, l'AMSS poursuit son engagement pour un Mali plus prospère et équitable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-3">
                Voir nos projets en cours
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                Nos rapports d'activité
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProjetsTerminesPage

