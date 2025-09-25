import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Calendar, Users, Globe, Award, Target, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import logoAmss from '../assets/LogoAMSSFHD.png'

const AboutPage = () => {
  // ⚙️ Scroll automatique vers la section si l'URL contient un hash
  const { hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        // Accessibilité : permettre le focus sur la section ciblée
        el.setAttribute('tabindex', '-1')
        el.focus({ preventScroll: true })
      }
    } else {
      window.scrollTo({ top: 0 })
    }
  }, [hash])

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section id="top" className="py-20 bg-gradient-to-br from-primary/10 to-accent/10 outline-none">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <img src={logoAmss} alt="Logo AMSS" className="h-24 w-24 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              À Propos de l'AMSS
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              L'Association Malienne pour la Survie au Sahel œuvre depuis plus de 30 ans 
              pour l'amélioration des conditions de vie des populations vulnérables du Mali.
            </p>
          </div>
        </div>
      </section>

      {/* Histoire */}
      <section id="historique" className="py-16 outline-none">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">Notre Histoire</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Calendar className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">1991 - Création</h3>
                      <p className="text-muted-foreground">
                        L'AMSS a été créée à Bamako le 12 juillet 1991, prenant le relais de l'AFSC 
                        (Le Service Quaker) qui opérait au Nord du Mali depuis 1975.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Target className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">1992 - Premiers projets</h3>
                      <p className="text-muted-foreground">
                        Début des activités avec le programme de développement communautaire 
                        à Goundam, dans la région de Tombouctou.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Globe className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">2001 - Diversification</h3>
                      <p className="text-muted-foreground">
                        Processus de diversification des interventions et développement 
                        de nouveaux partenariats stratégiques.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Award className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Aujourd'hui</h3>
                      <p className="text-muted-foreground">
                        Présence dans 8 régions du Mali avec 460+ employés et plus de 
                        100 projets réalisés au service des populations vulnérables.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-border">
                <h3 className="text-2xl font-semibold text-foreground mb-6 text-center">
                  Chiffres Clés
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">30+</div>
                    <div className="text-sm text-muted-foreground">Années d'expérience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent mb-2">460+</div>
                    <div className="text-sm text-muted-foreground">Employés</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">8</div>
                    <div className="text-sm text-muted-foreground">Régions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent mb-2">200K+</div>
                    <div className="text-sm text-muted-foreground">Bénéficiaires</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sommaire interne (liens ancres) */}
            <nav aria-label="Sommaire à propos" className="mt-10">
              <ul className="flex flex-wrap gap-3 text-sm">
                <li><a className="underline hover:no-underline" href="#historique">Historique</a></li>
                <li><a className="underline hover:no-underline" href="#mission">Mission & Vision</a></li>
                <li><a className="underline hover:no-underline" href="#equipe">Équipe</a></li>
                <li><a className="underline hover:no-underline" href="#accord-cadre">Accord cadre</a></li>
                <li><a className="underline hover:no-underline" href="#rejoindre">Rejoindre la mission</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Valeurs */}
      <section id="mission" className="py-16 bg-muted/30 outline-none">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-sm border border-border">
                <Target className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-4">Notre Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Promouvoir et soutenir des solutions durables aux problèmes des populations 
                  vulnérables du Mali à travers une approche transversale de la gouvernance 
                  et de la construction de la paix.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-8 shadow-sm border border-border">
                <Globe className="h-12 w-12 text-accent mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-4">Notre Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Un Mali où toutes les populations, en particulier les plus vulnérables, 
                  jouissent de conditions de vie dignes et participent pleinement au 
                  développement de leur communauté.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-8 shadow-sm border border-border">
                <Heart className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-4">Nos Valeurs</h3>
                <ul className="text-muted-foreground space-y-2">
                  <li>• Participation communautaire</li>
                  <li>• Équité et inclusion</li>
                  <li>• Transparence</li>
                  <li>• Durabilité</li>
                  <li>• Respect des diversités</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Équipe de Direction */}
      <section id="equipe" className="py-16 outline-none">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Équipe de Direction
              </h2>
              <p className="text-xl text-muted-foreground">
                Une équipe expérimentée au service du développement
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-sm border border-border text-center">
                <div className="w-20 h-20 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Oumarou Ag Mohamed IBRAHIM
                </h3>
                <p className="text-accent font-medium mb-3">Président du Bureau Exécutif</p>
                <p className="text-muted-foreground text-sm">
                  Leader expérimenté dans le développement communautaire et la gouvernance locale.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-8 shadow-sm border border-border text-center">
                <div className="w-20 h-20 bg-accent/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Award className="h-10 w-10 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Elmehdi Ag Wakina
                </h3>
                <p className="text-primary font-medium mb-3">Directeur des Programmes</p>
                <p className="text-muted-foreground text-sm mb-3">
                  Chevalier de l'Ordre National du Mali, expert en gestion de programmes humanitaires.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accord cadre */}
      <section id="accord-cadre" className="py-16 bg-gradient-to-br from-primary/5 to-accent/5 outline-none">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Reconnaissance Officielle
            </h2>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-border">
              <p className="text-lg text-muted-foreground mb-4">
                L'AMSS a conclu un accord cadre avec l'État Malien en décembre 1992
              </p>
              <div className="bg-muted/50 rounded-lg p-4 mb-6">
                <p className="font-mono text-sm text-foreground">
                  Accord N°0026/0286MATCL du 03/12/2007
                </p>
              </div>
              <p className="text-muted-foreground">
                Cet accord officialise notre statut d'ONG nationale et notre engagement 
                à servir les populations vulnérables du Mali en collaboration avec les 
                autorités nationales et locales.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section id="rejoindre" className="py-16 outline-none">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Rejoignez Notre Mission
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Ensemble, construisons un avenir meilleur pour les populations du Sahel
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-3">
                Devenir Partenaire
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                Nous Contacter
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
