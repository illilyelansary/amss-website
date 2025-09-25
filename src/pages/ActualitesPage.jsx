import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Tag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const actualitesData = [
  {
    id: 1,
    title: 'Remise de 12 000 kits scolaires aux enfants déplacés à Tombouctou',
    date: '16 septembre 2025',
    category: 'Éducation',
    image: '/assets/actualites/kits-scolaires-tombouctou.jpg',
    excerpt: 'La cérémonie de remise s\'est tenue ce mardi 16 septembre à Tombouctou, en présence des autorités locales et des partenaires.',
    content: 'L\'AMSS, en partenariat avec [Nom du Partenaire], a organisé une cérémonie de remise de 12 000 kits scolaires aux enfants déplacés internes dans la région de Tombouctou. Cette initiative vise à soutenir la scolarisation des enfants affectés par les crises et à leur offrir un meilleur avenir. Les kits contiennent des fournitures essentielles telles que des cahiers, stylos, sacs à dos et manuels scolaires. Les autorités locales ont salué l\'engagement de l\'AMSS et de ses partenaires pour l\'éducation dans la région.'
  },
  {
    id: 2,
    title: 'Une semaine sur le terrain avec l\'AMSS : Récits de résilience, de protection et d\'espoir au cœur du Sahel',
    date: '25 août 2025',
    category: 'Humanitaire',
    image: '/assets/actualites/terrain-sahel.jpg',
    excerpt: 'L\'AMSS renforce l\'aide humanitaire au Mali à travers des activités de sensibilisation, de soutien psychosocial, de distribution de cash et de protection.',
    content: 'Nos équipes ont passé une semaine intense sur le terrain, documentant les récits poignants de résilience des communautés du Sahel. Au programme : des sessions de sensibilisation sur les droits des enfants, un soutien psychosocial pour les victimes de conflits, des distributions de cash pour les familles les plus vulnérables, et des actions concrètes de protection des civils. Ces efforts sont cruciaux pour apporter espoir et dignité dans des zones souvent oubliées.'
  },
  {
    id: 3,
    title: '400 mères vulnérables reçoivent des intrants agricoles grâce au projet GFFO',
    date: '5 juin 2025',
    category: 'Sécurité Alimentaire',
    image: '/assets/actualites/meres-agricoles-gao.jpg',
    excerpt: 'Grâce au projet GFFO mis en œuvre par notre partenaire, 400 mères vulnérables des cercles de Gao et Ansongo ont reçu des intrants agricoles.',
    content: 'Le 5 juin 2025, l\'AMSS, en collaboration avec [Nom du Partenaire], a distribué des intrants agricoles à 400 mères vulnérables dans les cercles de Gao et Ansongo. Cette action s\'inscrit dans le cadre du projet GFFO visant à renforcer la sécurité alimentaire et la résilience des ménages face aux chocs climatiques et économiques. Les bénéficiaires ont exprimé leur gratitude pour ce soutien essentiel à leurs activités agricoles.'
  },
  {
    id: 4,
    title: 'Cérémonie d\'ouverture des sessions de formations pour le renforcement des capacités des femmes',
    date: 'Il y a 5 ans',
    category: 'Formation',
    image: '/assets/actualites/formation-femmes.jpg',
    excerpt: 'Le PNUD et l\'AMSS ont organisé une cérémonie d\'ouverture pour des sessions de formation visant à renforcer les capacités des femmes.',
    content: 'En partenariat avec le PNUD, l\'AMSS a lancé des sessions de formation dédiées au renforcement des capacités des femmes. Ces formations couvrent divers domaines tels que l\'entrepreneuriat, la gestion financière et les droits des femmes, afin de les autonomiser et de favoriser leur participation active au développement local. La cérémonie d\'ouverture a été couverte par l\'ORTM, soulignant l\'importance de cette initiative.'
  }
];

const ActualitesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Nombre d'actualités par page

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = actualitesData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(actualitesData.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Actualités de l'AMSS
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Restez informé de nos dernières actions, projets et événements sur le terrain.
            </p>
          </div>
        </div>
      </section>

      {/* Actualités Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentItems.map((actu) => (
                <div key={actu.id} className="bg-white rounded-xl p-6 shadow-sm border border-border hover:shadow-lg transition-shadow">
                  <img src={actu.image} alt={actu.title} className="w-full h-48 object-cover rounded-lg mb-4" />
                  <div className="flex items-center text-sm text-muted-foreground mb-3">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{actu.date}</span>
                    <Tag className="h-4 w-4 ml-4 mr-2" />
                    <span>{actu.category}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {actu.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {actu.excerpt}
                  </p>
                  <Link to={`/actualites/${actu.id}`}>
                    <Button variant="link" className="p-0 h-auto inline-flex items-center text-primary">
                      Lire la suite <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12 space-x-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <Button
                    key={i + 1}
                    variant={currentPage === i + 1 ? 'default' : 'outline'}
                    onClick={() => paginate(i + 1)}
                  >
                    {i + 1}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ActualitesPage;

