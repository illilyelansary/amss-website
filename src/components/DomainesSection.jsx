// src/components/DomainesSection.jsx
import {
  GraduationCap,
  Heart,
  Wheat,
  Droplets,
  Shield,
  Scale,
  Leaf,
  Coins,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

const DomainesSection = () => {
  const domaines = [
    {
      icon: GraduationCap,
      title: 'Éducation et Formation',
      description:
        "Programmes d'alphabétisation, scolarisation accélérée et formation professionnelle pour tous.",
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      path: '/education',
    },
    {
      icon: Heart,
      title: 'Santé et Nutrition',
      description:
        "Amélioration de l'accès aux soins de santé et lutte contre la malnutrition.",
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      path: '/sante',
    },
    {
      icon: Wheat,
      title: 'Sécurité Alimentaire',
      description:
        "Programmes d'assistance alimentaire et de renforcement de la résilience agricole.",
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      path: '/securite-alimentaire',
    },
    {
      icon: Droplets,
      title: 'WASH',
      description:
        "Accès à l'eau potable, assainissement et promotion de l'hygiène.",
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50',
      path: '/wash',
    },
    {
      icon: Shield,
      title: 'Protection et VBG',
      description:
        'Protection des populations vulnérables et lutte contre les violences basées sur le genre.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      path: '/protection',
    },
    {
      icon: Scale,
      title: 'Gouvernance et Paix',
      description:
        'Renforcement de la gouvernance locale et promotion de la cohésion sociale.',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      path: '/gouvernance',
    },
    {
      icon: Leaf,
      title: 'Environnement et Climat',
      description:
        'Gestion durable des ressources naturelles et adaptation au changement climatique.',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      path: null, // pas de page dédiée
    },
    {
      icon: Coins,
      title: 'Microfinance et Entreprenariat',
      description:
        "Appui à l'entrepreneuriat et développement de l'économie locale.",
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      path: null, // pas de page dédiée
    },
  ]

  return (
    <section id="domaines" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Nos Domaines d&apos;Intervention
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            L&apos;AMSS intervient dans huit domaines stratégiques pour
            répondre aux besoins multisectoriels des populations vulnérables du
            Mali.
          </p>
        </div>

        {/* Domains grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {domaines.map((domaine, index) => {
            const IconComponent = domaine.icon
            const CardContent = (
              <>
                <div
                  className={`${domaine.bgColor} w-16 h-16 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <IconComponent className={`h-8 w-8 ${domaine.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {domaine.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {domaine.description}
                </p>
              </>
            )

            // Si on a une route, la carte est cliquable
            return domaine.path ? (
              <Link
                key={index}
                to={domaine.path}
                aria-label={`Aller au domaine ${domaine.title}`}
                className="group block bg-white rounded-xl p-6 shadow-sm border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                {CardContent}
              </Link>
            ) : (
              <div
                key={index}
                className="group bg-white rounded-xl p-6 shadow-sm border border-border"
              >
                {CardContent}
              </div>
            )
          })}
        </div>

        {/* Approach section */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-border">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                Notre Approche Transversale
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">
                      Participation communautaire :
                    </strong>{' '}
                    Les populations sont au cœur de nos interventions et
                    participent activement à la conception et à la mise en
                    œuvre des projets.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Approche genre :</strong>{' '}
                    Nous mettons un accent particulier sur l&apos;autonomisation
                    des femmes et l&apos;égalité des sexes dans tous nos
                    programmes.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Durabilité :</strong>{' '}
                    Nos interventions visent des solutions durables qui
                    renforcent la résilience des communautés.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Partenariat :</strong>{' '}
                    Nous travaillons en étroite collaboration avec les autorités
                    locales, les partenaires techniques et financiers.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-8 text-center">
              <h4 className="text-xl font-semibold text-foreground mb-4">
                Impact Cumulé
              </h4>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">50+</div>
                  <div className="text-sm text-muted-foreground">Projets réalisés</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent mb-2">100K+</div>
                  <div className="text-sm text-muted-foreground">Bénéficiaires</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">20+</div>
                  <div className="text-sm text-muted-foreground">Partenaires</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent mb-2">8</div>
                  <div className="text-sm text-muted-foreground">Régions</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to action — câblé vers /projets#cours */}
        <div className="text-center mt-12">
          <Button size="lg" className="text-lg px-8 py-3" asChild>
            <Link to="/projets#cours" aria-label="Découvrir nos projets en détail">
              Découvrir nos projets en détail
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default DomainesSection
