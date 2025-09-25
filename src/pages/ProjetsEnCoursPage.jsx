import { Calendar, MapPin, Users, DollarSign, ExternalLink, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { projetsEnCours } from '../data/projetsData'
import { useState } from 'react'

const ProjetsEnCoursPage = () => {
  const [filtreRegion, setFiltreRegion] = useState('Toutes')
  const [filtreDomaine, setFiltreDomaine] = useState('Tous')

  const regions = ['Toutes', ...new Set(projetsEnCours.map(projet => projet.region))]
  const domaines = ['Tous', ...new Set(projetsEnCours.map(projet => projet.domain))]

  const projetsFiltres = projetsEnCours.filter(projet => {
    const regionMatch = filtreRegion === 'Toutes' || projet.region === filtreRegion
    const domaineMatch = filtreDomaine === 'Tous' || projet.domain === filtreDomaine
    return regionMatch && domaineMatch
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

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Nos Projets en Cours
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Découvrez les projets actuellement mis en œuvre par l'AMSS pour améliorer 
              les conditions de vie des populations vulnérables du Mali.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">{projetsEnCours.length}</div>
                <div className="text-sm text-muted-foreground">Projets actifs</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">
                  {formatNumber(projetsEnCours.reduce((total, projet) => total + projet.beneficiaries, 0))}+
                </div>
                <div className="text-sm text-muted-foreground">Bénéficiaires</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">8</div>
                <div className="text-sm text-muted-foreground">Régions couvertes</div>
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
                    <div className="lg:col-span-1">
                      <img 
                        src={projet.image} 
                        alt={projet.title}
                        className="w-full h-64 lg:h-full object-cover"
                      />
                    </div>
                    
                    {/* Contenu */}
                    <div className="lg:col-span-2 p-6">
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                          {projet.status}
                        </span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                          {projet.domain}
                        </span>
                        <span className="px-3 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full">
                          {projet.region}
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
                            <div className="text-sm font-medium">Période</div>
                            <div className="text-sm text-muted-foreground">
                              {formatDate(projet.startDate)} - {formatDate(projet.endDate)}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <MapPin className="h-5 w-5 text-green-600" />
                          <div>
                            <div className="text-sm font-medium">Région</div>
                            <div className="text-sm text-muted-foreground">{projet.region}</div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <Users className="h-5 w-5 text-purple-600" />
                          <div>
                            <div className="text-sm font-medium">Bénéficiaires</div>
                            <div className="text-sm text-muted-foreground">
                              {formatNumber(projet.beneficiaries)} personnes
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <DollarSign className="h-5 w-5 text-orange-600" />
                          <div>
                            <div className="text-sm font-medium">Bailleur</div>
                            <div className="text-sm text-muted-foreground">{projet.donor}</div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button className="flex-1">
                          Voir les détails
                        </Button>
                        <Button variant="outline" className="flex items-center space-x-2">
                          <ExternalLink className="h-4 w-4" />
                          <span>Plus d'infos</span>
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

      {/* Call to action */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Soutenez Nos Projets
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Votre soutien nous permet de continuer à améliorer les conditions de vie 
              des populations vulnérables du Mali.
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

export default ProjetsEnCoursPage

