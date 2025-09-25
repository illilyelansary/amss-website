import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users, Package, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

const zonesData = [
  {
    id: 'tombouctou',
    name: 'Tombouctou',
    image: '/assets/zones/tombouctou.jpg',
    description: 'Région historique du Mali, confrontée à des défis humanitaires et de développement.',
    stats: {
      population: '1.2M',
      projets: '15+',
      beneficiaires: '100K+'
    },
    link: '/zones/tombouctou'
  },
  {
    id: 'gao',
    name: 'Gao',
    image: '/assets/zones/gao.jpg',
    description: 'Carrefour commercial et culturel, la région de Gao est au cœur de nos interventions.',
    stats: {
      population: '800K',
      projets: '10+',
      beneficiaires: '70K+'
    },
    link: '/zones/gao'
  },
  {
    id: 'menaka',
    name: 'Ménaka',
    image: '/assets/zones/menaka.jpg',
    description: 'Région pastorale, où nous soutenons la résilience des communautés face aux crises.',
    stats: {
      population: '250K',
      projets: '5+',
      beneficiaires: '30K+'
    },
    link: '/zones/menaka'
  },
  {
    id: 'mopti',
    name: 'Mopti',
    image: '/assets/zones/mopti.jpg',
    description: 'Surnommée la Venise du Mali, Mopti est une zone d\'intervention clé pour la sécurité alimentaire.',
    stats: {
      population: '2.5M',
      projets: '20+',
      beneficiaires: '150K+'
    },
    link: '/zones/mopti'
  },
  {
    id: 'segou',
    name: 'Ségou',
    image: '/assets/zones/segou.jpg',
    description: 'Région agricole majeure, où nous renforçons les capacités des agriculteurs locaux.',
    stats: {
      population: '3M',
      projets: '18+',
      beneficiaires: '180K+'
    },
    link: '/zones/segou'
  },
  {
    id: 'sikasso',
    name: 'Sikasso',
    image: '/assets/zones/sikasso.jpg',
    description: 'Zone frontalière avec un fort potentiel agricole, nos projets y visent le développement durable.',
    stats: {
      population: '2.8M',
      projets: '12+',
      beneficiaires: '120K+'
    },
    link: '/zones/sikasso'
  }
];

const ZonesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Nos Zones d'Intervention
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              L'AMSS est présente dans les régions les plus vulnérables du Mali pour un impact durable.
            </p>
          </div>
        </div>
      </section>

      {/* Zones Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {zonesData.map((zone) => (
                <div key={zone.id} className="bg-white rounded-xl p-6 shadow-sm border border-border hover:shadow-lg transition-shadow">
                  <img src={zone.image} alt={zone.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {zone.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {zone.description}
                  </p>
                  <div className="grid grid-cols-3 gap-2 text-center text-sm mb-4">
                    <div>
                      <Users className="h-5 w-5 text-primary mx-auto mb-1" />
                      <span className="font-medium">{zone.stats.population}</span>
                      <p className="text-muted-foreground">Pop.</p>
                    </div>
                    <div>
                      <Package className="h-5 w-5 text-accent mx-auto mb-1" />
                      <span className="font-medium">{zone.stats.projets}</span>
                      <p className="text-muted-foreground">Projets</p>
                    </div>
                    <div>
                      <Globe className="h-5 w-5 text-primary mx-auto mb-1" />
                      <span className="font-medium">{zone.stats.beneficiaires}</span>
                      <p className="text-muted-foreground">Bénéf.</p>
                    </div>
                  </div>
                  <Link to={zone.link}>
                    <Button variant="outline" className="w-full">
                      En savoir plus sur {zone.name}
                    </Button>
                  </Link>
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
              Un Impact Local, une Portée Nationale
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Notre présence sur le terrain nous permet de comprendre les besoins spécifiques de chaque communauté.
            </p>
            <Link to="/contact">
              <Button size="lg" className="text-lg px-8 py-3">
                Nous Contacter
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ZonesPage;

