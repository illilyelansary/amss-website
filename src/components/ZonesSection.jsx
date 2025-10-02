// src/components/ZonesSection.jsx
import { MapPin, Users, Building, Briefcase } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

const ZonesSection = () => {
  const zones = [
    {
      name: 'Tombouctou',
      slug: 'tombouctou',
      description: "Siège principal de l'AMSS et zone historique d'intervention depuis 1992",
      projects: 25,
      beneficiaires: '50,000+',
      bureaux: 1,
      color: 'bg-blue-500',
    },
    {
      name: 'Gao',
      slug: 'gao',
      description: "Interventions dans la protection, l'éducation et la cohésion sociale",
      projects: 18,
      beneficiaires: '35,000+',
      bureaux: 1,
      color: 'bg-green-500',
    },
    {
      name: 'Ménaka',
      slug: 'menaka',
      description:
        'Focus sur la protection des populations déplacées et la sécurité alimentaire',
      projects: 12,
      beneficiaires: '25,000+',
      bureaux: 1,
      color: 'bg-purple-500',
    },
    {
      name: 'Mopti',
      slug: 'mopti',
      description:
        "Programmes de gouvernance, éducation et lutte contre l'extrémisme violent",
      projects: 15,
      beneficiaires: '40,000+',
      bureaux: 1,
      color: 'bg-orange-500',
    },
    {
      name: 'Ségou',
      slug: 'segou',
      description: 'Santé de la reproduction, entreprenariat jeunes et microfinance',
      projects: 10,
      beneficiaires: '20,000+',
      bureaux: 1,
      color: 'bg-red-500',
    },
    {
      name: 'Sikasso',
      slug: 'sikasso',
      description: 'Développement agricole et renforcement des capacités communautaires',
      projects: 8,
      beneficiaires: '15,000+',
      bureaux: 1,
      color: 'bg-yellow-500',
    },
    {
      name: 'Bamako',
      slug: 'bamako',
      description:
        "Bureau de coordination et projets de lutte contre l'extrémisme violent",
      projects: 5,
      beneficiaires: '10,000+',
      bureaux: 1,
      color: 'bg-indigo-500',
    },
    {
      name: 'Taoudénit',
      slug: 'taoudenit',
      description: 'WASH, intermédiation sociale et promotion du patrimoine culturel',
      projects: 7,
      beneficiaires: '12,000+',
      bureaux: 1,
      color: 'bg-teal-500',
    },
  ]

  return (
    <section id="zones" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Nos Zones d&apos;Intervention
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            L&apos;AMSS est présente dans 8 régions du Mali avec des bureaux locaux
            pour une intervention de proximité et une meilleure connaissance des contextes.
          </p>
        </div>

        {/* Map visualization placeholder */}
        <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 mb-16 text-center">
          <div className="max-w-2xl mx-auto">
            <MapPin className="h-16 w-16 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Carte Interactive du Mali
            </h3>
            <p className="text-muted-foreground mb-6">
              Découvrez notre présence géographique et l&apos;impact de nos interventions
              dans les différentes régions du Mali.
            </p>
            <Button variant="outline" asChild>
              <Link to="/zones#carte-interactive" aria-label="Voir la carte interactive des zones">
                Voir la carte interactive
              </Link>
            </Button>
          </div>
        </div>

        {/* Zones grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {zones.map((zone) => (
            <Link
              key={zone.slug}
              to={`/zones#zone-${zone.slug}`}
              aria-label={`Voir la zone ${zone.name}`}
              className="group block bg-white rounded-xl p-6 shadow-sm border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Zone header */}
              <div className="flex items-center mb-4">
                <div className={`w-4 h-4 ${zone.color} rounded-full mr-3`} />
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {zone.name}
                </h3>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                {zone.description}
              </p>

              {/* Stats */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Briefcase className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm text-muted-foreground">Projets</span>
                  </div>
                  <span className="text-sm font-semibold text-foreground">{zone.projects}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-accent mr-2" />
                    <span className="text-sm text-muted-foreground">Bénéficiaires</span>
                  </div>
                  <span className="text-sm font-semibold text-foreground">{zone.beneficiaires}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Building className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm text-muted-foreground">Bureaux</span>
                  </div>
                  <span className="text-sm font-semibold text-foreground">{zone.bureaux}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Coverage summary */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-border">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                Une Couverture Nationale
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Depuis sa création en 1991, l&apos;AMSS a progressivement étendu sa zone
                d&apos;intervention du cercle de Goundam à l&apos;ensemble du territoire malien.
                Cette expansion géographique nous permet de répondre aux besoins diversifiés
                des populations vulnérables dans différents contextes socio-économiques et sécuritaires.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                  <span className="text-muted-foreground">
                    <strong className="text-foreground">Nord du Mali :</strong> Zone historique d&apos;intervention avec Tombouctou comme base
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-accent rounded-full mr-3" />
                  <span className="text-muted-foreground">
                    <strong className="text-foreground">Centre du Mali :</strong> Expansion vers Mopti et Ségou pour la gouvernance et la paix
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                  <span className="text-muted-foreground">
                    <strong className="text-foreground">Sud du Mali :</strong> Présence à Sikasso pour le développement agricole
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-8">
              <h4 className="text-xl font-semibold text-foreground mb-6 text-center">
                Impact Global
              </h4>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">200K+</div>
                  <div className="text-sm text-muted-foreground">Bénéficiaires totaux</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-2">100+</div>
                  <div className="text-sm text-muted-foreground">Projets réalisés</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">8</div>
                  <div className="text-sm text-muted-foreground">Bureaux régionaux</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-2">460+</div>
                  <div className="text-sm text-muted-foreground">Employés locaux</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center mt-12">
          <Button size="lg" className="text-lg px-8 py-3" asChild>
            <Link to="/zones#top" aria-label="Voir nos projets par région">
              Voir nos projets par région
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default ZonesSection
