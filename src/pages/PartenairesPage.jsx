import React from 'react';
import { Link } from 'react-router-dom';
import { Handshake, Globe, MapPin, ArrowRight } from 'lucide-react';

const partenairesData = [
  {
    id: 1,
    name: 'Fondation Stromme',
    logo: '/assets/partenaires/stromme.png',
    type: 'Bailleur de fonds',
    description: 'Partenaire clé dans le financement de nos programmes d\'éducation et de développement communautaire.',
    website: 'https://strommefoundation.org/'
  },
  {
    id: 2,
    name: 'UNICEF Mali',
    logo: '/assets/partenaires/unicef.png',
    type: 'Partenaire technique et financier',
    description: 'Collaboration sur les projets WASH d\'urgence et la protection des enfants.',
    website: 'https://www.unicef.org/mali/'
  },
  {
    id: 3,
    name: 'PNUD Mali',
    logo: '/assets/partenaires/pnud.png',
    type: 'Partenaire institutionnel',
    description: 'Soutien au renforcement des capacités des femmes et à la gouvernance locale.',
    website: 'https://www.undp.org/mali'
  },
  {
    id: 4,
    name: 'GFFO (German Federal Foreign Office)',
    logo: '/assets/partenaires/gffo.png',
    type: 'Bailleur de fonds',
    description: 'Financement de projets de sécurité alimentaire et de résilience dans les régions vulnérables.',
    website: 'https://www.auswaertiges-amt.de/en/'
  },
  {
    id: 5,
    name: 'Ministère de l\'Éducation Nationale du Mali',
    logo: '/assets/partenaires/education_mali.png',
    type: 'Partenaire gouvernemental',
    description: 'Collaboration étroite pour la mise en œuvre des programmes d\'éducation alternative et formelle.',
    website: 'https://www.education.gouv.ml/'
  },
  {
    id: 6,
    name: 'Ministère de la Santé et du Développement Social du Mali',
    logo: '/assets/partenaires/sante_mali.png',
    type: 'Partenaire gouvernemental',
    description: 'Partenariat pour l\'amélioration des services de santé et de nutrition communautaire.',
    website: 'https://sante.gouv.ml/'
  }
];

const PartenairesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Nos Partenaires
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              L\'AMSS collabore avec un réseau solide de partenaires nationaux et internationaux 
              pour maximiser son impact et atteindre ses objectifs.
            </p>
          </div>
        </div>
      </section>

      {/* Partenaires Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {partenairesData.map((partenaire) => (
                <div key={partenaire.id} className="bg-white rounded-xl p-6 shadow-sm border border-border hover:shadow-lg transition-shadow text-center">
                  {partenaire.logo && (
                    <img 
                      src={partenaire.logo} 
                      alt={partenaire.name} 
                      className="h-20 object-contain mx-auto mb-4"
                    />
                  )}
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {partenaire.name}
                  </h3>
                  <p className="text-primary font-medium mb-3">{partenaire.type}</p>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {partenaire.description}
                  </p>
                  {partenaire.website && (
                    <a 
                      href={partenaire.website} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center text-accent hover:underline text-sm"
                    >
                      Visiter le site <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Devenez un Partenaire de l\'AMSS
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Ensemble, nous pouvons faire une différence durable dans la vie des populations du Sahel.
            </p>
            <Link to="/contact">
              <Button size="lg" className="text-lg px-8 py-3">
                Nous Contacter pour un Partenariat
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PartenairesPage;

