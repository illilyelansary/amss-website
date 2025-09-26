import React, { useState } from 'react';
import { Calendar, MapPin, Users, Briefcase, Archive, Search, Filter } from 'lucide-react';

const recrutementData = {
  enCours: [
    {
      id: 1,
      titre: "Un Superviseur en Agriculture",
      lieu: "Mountoungoula, Mali",
      datePublication: "13 mai 2025",
      type: "CDI",
      domaine: "Agriculture",
      description: "Recherche d'un superviseur expérimenté pour superviser les activités agricoles dans le cadre du projet Sécurité Alimentaire financé par la Fondation Stromme.",
      competences: ["Diplôme en agronomie", "5 ans d'expérience minimum", "Maîtrise du français et langues locales"],
      dateExpiration: "30 septembre 2025"
    },
    {
      id: 2,
      titre: "Avis de recrutement de (90) Animateurs/trices de centres d'Alphabétisation",
      lieu: "Mali (plusieurs régions)",
      datePublication: "6 janvier 2025",
      type: "CDD",
      domaine: "Éducation",
      description: "Recrutement massif d'animateurs pour les centres d'alphabétisation dans le cadre de l'expansion des programmes éducatifs de l'AMSS.",
      competences: ["DEF minimum", "Expérience en alphabétisation", "Connaissance des langues locales"],
      dateExpiration: "15 octobre 2025"
    }
  ],
  archives: [
    {
      id: 3,
      titre: "Six (06) Conseillers(ères) en Education",
      lieu: "Sikasso, Mali",
      datePublication: "18 décembre 2024",
      type: "CDD",
      domaine: "Éducation",
      statut: "Clôturé",
      description: "Conseillers pédagogiques pour l'amélioration de la qualité de l'éducation dans la région de Sikasso."
    },
    {
      id: 4,
      titre: "COORDINATEUR/TRICE EDUCATION",
      lieu: "Mountoungoula, Mali",
      datePublication: "15 août 2024",
      type: "CDI",
      domaine: "Éducation",
      statut: "Pourvu",
      description: "Coordination des activités éducatives et supervision des équipes pédagogiques."
    },
    {
      id: 5,
      titre: "TROIS (3) PRESTATAIRES AU COMPTE DU PROJET PARTAGE",
      lieu: "GAO, MOPTI, SEGOU",
      datePublication: "19 juin 2024",
      type: "Prestation",
      domaine: "Humanitaire",
      statut: "Clôturé",
      description: "Prestataires pour le projet PARTAGE en partenariat avec INTERSOS dans les régions de Gao, Mopti et Ségou."
    },
    {
      id: 6,
      titre: "30 ADC pour les antennes AMSS",
      lieu: "Bamako (06), Ségou (12) et Mopti (12)",
      datePublication: "23 avril 2024",
      type: "CDD",
      domaine: "Administration",
      statut: "Pourvu",
      description: "Agents de Développement Communautaire pour renforcer les équipes des antennes régionales."
    },
    {
      id: 7,
      titre: "03 coordinateurs régionaux",
      lieu: "Bamako, Ségou et Mopti",
      datePublication: "23 avril 2024",
      type: "CDI",
      domaine: "Coordination",
      statut: "Pourvu",
      description: "Coordinateurs pour la supervision des activités dans les antennes régionales."
    },
    {
      id: 8,
      titre: "Un (01) Responsable du CURRICULUM",
      lieu: "Mali",
      datePublication: "23 avril 2024",
      type: "CDI",
      domaine: "Éducation",
      statut: "Pourvu",
      description: "Responsable de l'élaboration et de la mise à jour des curricula éducatifs."
    },
    {
      id: 9,
      titre: "Un (01) Spécialiste de l'entrepreneuriat",
      lieu: "Bamako, Mali",
      datePublication: "23 avril 2024",
      type: "CDI",
      domaine: "Entrepreneuriat",
      statut: "Pourvu",
      description: "Spécialiste pour le développement des programmes d'entrepreneuriat et de microfinance."
    },
    {
      id: 10,
      titre: "16 Superviseurs Alpha",
      lieu: "Bamako (04), Ségou (07) et Mopti (05)",
      datePublication: "23 avril 2024",
      type: "CDD",
      domaine: "Éducation",
      statut: "Pourvu",
      description: "Superviseurs pour les programmes d'alphabétisation dans les antennes régionales."
    },
    {
      id: 11,
      titre: "Deux (02) Comptables",
      lieu: "Ségou (01) et Mopti (01)",
      datePublication: "23 avril 2024",
      type: "CDI",
      domaine: "Finance",
      statut: "Pourvu",
      description: "Comptables pour la gestion financière des antennes de Ségou et Mopti."
    },
    {
      id: 12,
      titre: "Un(e) Gestionnaire de l'information",
      lieu: "Bamako, Mali",
      datePublication: "2 avril 2024",
      type: "CDI",
      domaine: "Information",
      statut: "Pourvu",
      description: "Gestionnaire pour la collecte, l'analyse et la diffusion de l'information institutionnelle."
    }
  ]
};

const RecrutementPage = () => {
  const [activeTab, setActiveTab] = useState('enCours');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDomaine, setFilterDomaine] = useState('');

  const domaines = ['Tous', 'Éducation', 'Agriculture', 'Humanitaire', 'Administration', 'Coordination', 'Entrepreneuriat', 'Finance', 'Information'];

  const filteredData = (data) => {
    return data.filter(item => {
      const matchesSearch = item.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.lieu.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDomaine = filterDomaine === '' || filterDomaine === 'Tous' || item.domaine === filterDomaine;
      return matchesSearch && matchesDomaine;
    });
  };

  const getStatutColor = (statut) => {
    switch(statut) {
      case 'Pourvu': return 'bg-green-100 text-green-800';
      case 'Clôturé': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'CDI': return 'bg-primary/10 text-primary';
      case 'CDD': return 'bg-accent/10 text-accent';
      case 'Prestation': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Recrutement AMSS
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Rejoignez notre équipe et contribuez à l'amélioration des conditions de vie des populations vulnérables du Mali.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center text-muted-foreground">
                <Users className="h-5 w-5 mr-2" />
                <span>460+ employés</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="h-5 w-5 mr-2" />
                <span>8 régions</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Briefcase className="h-5 w-5 mr-2" />
                <span>Opportunités variées</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex space-x-1 bg-muted p-1 rounded-lg">
                <button
                  onClick={() => setActiveTab('enCours')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'enCours'
                      ? 'bg-white text-primary shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Briefcase className="h-4 w-4 inline mr-2" />
                  Offres en cours ({recrutementData.enCours.length})
                </button>
                <button
                  onClick={() => setActiveTab('archives')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'archives'
                      ? 'bg-white text-primary shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Archive className="h-4 w-4 inline mr-2" />
                  Archives ({recrutementData.archives.length})
                </button>
              </div>

              {/* Filtres */}
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Rechercher un poste..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div className="relative">
                  <Filter className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <select
                    value={filterDomaine}
                    onChange={(e) => setFilterDomaine(e.target.value)}
                    className="pl-10 pr-8 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none bg-white"
                  >
                    {domaines.map(domaine => (
                      <option key={domaine} value={domaine === 'Tous' ? '' : domaine}>
                        {domaine}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contenu des offres */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {activeTab === 'enCours' && (
              <div className="space-y-6">
                {filteredData(recrutementData.enCours).length === 0 ? (
                  <div className="text-center py-12">
                    <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Aucune offre ne correspond à vos critères de recherche.</p>
                  </div>
                ) : (
                  filteredData(recrutementData.enCours).map((offre) => (
                    <div key={offre.id} className="bg-white rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(offre.type)}`}>
                              {offre.type}
                            </span>
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {offre.domaine}
                            </span>
                          </div>
                          <h3 className="text-xl font-semibold text-foreground mb-2">
                            {offre.titre}
                          </h3>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span>{offre.lieu}</span>
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span>Publié le {offre.datePublication}</span>
                            </div>
                          </div>
                          <p className="text-muted-foreground mb-4 leading-relaxed">
                            {offre.description}
                          </p>
                          {offre.competences && (
                            <div className="mb-4">
                              <h4 className="font-medium text-foreground mb-2">Compétences requises :</h4>
                              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                                {offre.competences.map((competence, index) => (
                                  <li key={index}>{competence}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                        <div className="lg:text-right">
                          <div className="mb-4">
                            <p className="text-sm text-muted-foreground mb-1">Date limite :</p>
                            <p className="font-medium text-accent">{offre.dateExpiration}</p>
                          </div>
                          <button className="w-full lg:w-auto px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
                            Postuler
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'archives' && (
              <div className="space-y-4">
                {filteredData(recrutementData.archives).length === 0 ? (
                  <div className="text-center py-12">
                    <Archive className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Aucune archive ne correspond à vos critères de recherche.</p>
                  </div>
                ) : (
                  filteredData(recrutementData.archives).map((offre) => (
                    <div key={offre.id} className="bg-white rounded-lg p-4 shadow-sm border border-border">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(offre.type)}`}>
                              {offre.type}
                            </span>
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {offre.domaine}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatutColor(offre.statut)}`}>
                              {offre.statut}
                            </span>
                          </div>
                          <h3 className="font-semibold text-foreground mb-1">
                            {offre.titre}
                          </h3>
                          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-2">
                            <div className="flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              <span>{offre.lieu}</span>
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              <span>{offre.datePublication}</span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {offre.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Rejoignez l'AMSS
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Vous ne trouvez pas le poste qui vous correspond ? Envoyez-nous votre candidature spontanée.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
                Candidature Spontanée
              </button>
              <button className="px-8 py-3 border border-border text-foreground rounded-md hover:bg-muted/50 transition-colors">
                Nous Contacter
              </button>
            </div>
            <div className="mt-8 text-sm text-muted-foreground">
              <p className="mb-2">
                <strong>Important :</strong> Merci de spécifier le titre du poste dans l'objet du message lors de votre candidature.
              </p>
              <p>
                Email : <a href="mailto:info@ong-amss.org" className="text-primary hover:underline">info@ong-amss.org</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RecrutementPage;

