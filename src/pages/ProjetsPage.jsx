import React, { useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Clock, CheckCircle, FileText, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const ProjetsPage = () => {
  // ⚙️ Scroll automatique vers la section si l'URL contient un hash
  const { hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        el.setAttribute('tabindex', '-1')
        el.focus({ preventScroll: true })
      }
    } else {
      window.scrollTo({ top: 0 })
    }
  }, [hash])

  const projetsEnCours = [
    {
      title: 'Green Jobs - Tables-Bancs Plastique',
      region: 'Tombouctou',
      bailleur: 'Fondation Stromme',
      beneficiaires: '260 écoles',
      description: 'Production de mobilier scolaire à partir de plastique recyclé'
    },
    {
      title: 'Programme SSA/P - Scolarisation Accélérée',
      region: 'National',
      bailleur: 'Fondation Stromme',
      beneficiaires: '15,000 enfants',
      description: 'Éducation alternative pour enfants non scolarisés'
    },
    {
      title: 'Programme WASH d\'Urgence',
      region: 'National',
      bailleur: 'UNICEF Mali',
      beneficiaires: '50,000 personnes',
      description: 'Accès à l\'eau potable et assainissement d\'urgence'
    }
  ]

  const projetsTermines = [
    {
      title: 'Programme SSA2 - Éducation Alternative',
      region: 'Nord Mali',
      annee: '2020-2023',
      beneficiaires: '12,000 enfants',
      description: 'Programme d\'éducation alternative achevé avec succès'
    },
    {
      title: 'Projet UNMAS - Protection des Civils',
      region: 'Gao, Ménaka',
      annee: '2019-2022',
      beneficiaires: '25,000 personnes',
      description: 'Localisation et protection des populations civiles'
    },
    {
      title: 'Programme S3A - Scolarisation Accélérée',
      region: 'Tombouctou',
      annee: '2018-2021',
      beneficiaires: '8,000 enfants',
      description: 'Scolarisation accélérée dans les zones post-conflit'
    }
  ]

  const rapports = [
    {
      title: 'Rapport Gouvernemental 2024',
      type: 'Rapport annuel',
      annee: 2024,
      description: 'Rapport complet des activités 2024 soumis au gouvernement malien'
    },
    {
      title: 'Rapport d\'Audit Consolidé 2022',
      type: 'Rapport financier',
      annee: 2022,
      description: 'Audit financier consolidé de toutes les activités AMSS'
    },
    {
      title: 'Rapport Narratif 2022',
      type: 'Rapport d\'activité',
      annee: 2022,
      description: 'Rapport narratif détaillé des programmes et projets'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Nos Projets et Réalisations
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Découvrez nos projets en cours, nos réalisations passées et nos rapports d'activités
            </p>
            
            {/* Navigation interne */}
            <nav className="mt-8 flex flex-wrap justify-center gap-4">
              <a href="#cours" className="bg-white px-6 py-3 rounded-lg shadow-sm border border-border hover:bg-muted transition-colors">
                Projets en Cours
              </a>
              <a href="#termines" className="bg-white px-6 py-3 rounded-lg shadow-sm border border-border hover:bg-muted transition-colors">
                Projets Terminés
              </a>
              <a href="#rapports" className="bg-white px-6 py-3 rounded-lg shadow-sm border border-border hover:bg-muted transition-colors">
                Rapports
              </a>
            </nav>
          </div>
        </div>
      </section>

      {/* Projets en Cours */}
      <section id="cours" className="py-16 outline-none">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center mb-8">
              <Clock className="h-8 w-8 text-primary mr-3" />
              <h2 className="text-3xl font-bold text-foreground">Projets en Cours</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {projetsEnCours.map((projet, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-border">
                  <div className="flex items-center mb-4">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm font-medium text-green-600">En cours</span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {projet.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mb-4">
                    {projet.description}
                  </p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Région:</span>
                      <span className="font-medium">{projet.region}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Bailleur:</span>
                      <span className="font-medium">{projet.bailleur}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Bénéficiaires:</span>
                      <span className="font-medium">{projet.beneficiaires}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <Link to="/projets-en-cours">
                <Button className="inline-flex items-center">
                  Voir tous les projets en cours
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Projets Terminés */}
      <section id="termines" className="py-16 bg-muted/30 outline-none">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center mb-8">
              <CheckCircle className="h-8 w-8 text-accent mr-3" />
              <h2 className="text-3xl font-bold text-foreground">Projets Terminés</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {projetsTermines.map((projet, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-border">
                  <div className="flex items-center mb-4">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-sm font-medium text-blue-600">Terminé</span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {projet.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mb-4">
                    {projet.description}
                  </p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Région:</span>
                      <span className="font-medium">{projet.region}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Période:</span>
                      <span className="font-medium">{projet.annee}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Bénéficiaires:</span>
                      <span className="font-medium">{projet.beneficiaires}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <Link to="/projets-termines">
                <Button variant="outline" className="inline-flex items-center">
                  Voir tous les projets terminés
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Rapports */}
      <section id="rapports" className="py-16 outline-none">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center mb-8">
              <FileText className="h-8 w-8 text-primary mr-3" />
              <h2 className="text-3xl font-bold text-foreground">Rapports et Documentation</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {rapports.map((rapport, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-border">
                  <div className="flex items-center mb-4">
                    <FileText className="h-5 w-5 text-primary mr-2" />
                    <span className="text-sm font-medium text-primary">{rapport.type}</span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {rapport.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mb-4">
                    {rapport.description}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Année: {rapport.annee}</span>
                    <Button variant="outline" size="sm">
                      Télécharger
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <Link to="/rapports">
                <Button variant="outline" className="inline-flex items-center">
                  Voir tous les rapports
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Collaborer avec l'AMSS
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Rejoignez-nous dans notre mission pour un développement durable au Sahel
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/partenaires">
                <Button size="lg" className="text-lg px-8 py-3">
                  Devenir Partenaire
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                  Nous Contacter
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProjetsPage

