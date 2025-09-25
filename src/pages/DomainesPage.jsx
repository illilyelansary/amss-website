import React from 'react'
import { Link } from 'react-router-dom'
import { GraduationCap, Heart, Droplets, Shield, Users, Wheat } from 'lucide-react'
import { Button } from '@/components/ui/button'

const DomainesPage = () => {
  const domaines = [
    {
      id: 'education',
      title: 'Éducation et Formation',
      icon: GraduationCap,
      description: 'Programmes d\'alphabétisation, scolarisation accélérée et formation professionnelle pour tous.',
      link: '/education',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      stats: '15,000+ bénéficiaires'
    },
    {
      id: 'sante',
      title: 'Santé et Nutrition',
      icon: Heart,
      description: 'Amélioration de l\'accès aux soins de santé et promotion de la nutrition communautaire.',
      link: '/sante',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      stats: '25,000+ bénéficiaires'
    },
    {
      id: 'wash',
      title: 'Eau, Assainissement et Hygiène',
      icon: Droplets,
      description: 'Accès à l\'eau potable, assainissement et promotion de l\'hygiène dans les communautés.',
      link: '/wash',
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50',
      stats: '50,000+ bénéficiaires'
    },
    {
      id: 'protection',
      title: 'Protection et VBG',
      icon: Shield,
      description: 'Protection des populations vulnérables et lutte contre les violences basées sur le genre.',
      link: '/protection',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      stats: '8,000+ bénéficiaires'
    },
    {
      id: 'gouvernance',
      title: 'Gouvernance et Paix',
      icon: Users,
      description: 'Renforcement de la gouvernance locale et promotion de la cohésion sociale.',
      link: '/gouvernance',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      stats: '12,000+ bénéficiaires'
    },
    {
      id: 'securite-alimentaire',
      title: 'Sécurité Alimentaire',
      icon: Wheat,
      description: 'Assistance alimentaire d\'urgence et programmes de résilience agricole.',
      link: '/securite-alimentaire',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      stats: '30,000+ bénéficiaires'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Nos Domaines d'Intervention
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              L'AMSS intervient dans 6 domaines stratégiques pour répondre aux besoins 
              essentiels des populations vulnérables du Mali.
            </p>
          </div>
        </div>
      </section>

      {/* Domaines Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {domaines.map((domaine) => {
                const IconComponent = domaine.icon
                return (
                  <div key={domaine.id} className="bg-white rounded-xl p-8 shadow-sm border border-border hover:shadow-lg transition-shadow">
                    <div className={`w-16 h-16 ${domaine.bgColor} rounded-lg flex items-center justify-center mb-6`}>
                      <IconComponent className={`h-8 w-8 ${domaine.color}`} />
                    </div>
                    
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      {domaine.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {domaine.description}
                    </p>
                    
                    <div className="mb-6">
                      <span className={`text-sm font-medium ${domaine.color}`}>
                        {domaine.stats}
                      </span>
                    </div>
                    
                    <Link to={domaine.link}>
                      <Button variant="outline" className="w-full">
                        En savoir plus
                      </Button>
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Approche Transversale */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Une Approche Transversale
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Tous nos programmes intègrent une approche transversale de la gouvernance 
              et de la construction de la paix, garantissant une intervention holistique 
              et durable.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-border">
                <h3 className="font-semibold text-foreground mb-2">Participation Communautaire</h3>
                <p className="text-sm text-muted-foreground">
                  Implication active des communautés dans la conception et la mise en œuvre des projets.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm border border-border">
                <h3 className="font-semibold text-foreground mb-2">Équité et Inclusion</h3>
                <p className="text-sm text-muted-foreground">
                  Attention particulière aux groupes vulnérables : femmes, jeunes, personnes handicapées.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm border border-border">
                <h3 className="font-semibold text-foreground mb-2">Durabilité</h3>
                <p className="text-sm text-muted-foreground">
                  Solutions pérennes qui renforcent les capacités locales et l'autonomie des communautés.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Découvrez Nos Actions
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Explorez nos projets concrets et leur impact sur les communautés
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/projets">
                <Button size="lg" className="text-lg px-8 py-3">
                  Voir Nos Projets
                </Button>
              </Link>
              <Link to="/zones">
                <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                  Zones d'Intervention
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default DomainesPage

