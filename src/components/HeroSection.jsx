import { Button } from '@/components/ui/button'
import { ArrowRight, Heart, Users, Globe } from 'lucide-react'

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary/10 via-accent/5 to-background py-20 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-primary rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border-2 border-accent rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 border-2 border-primary rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Pour la 
            <span className="text-primary"> Survie </span>
            et le 
            <span className="text-accent"> Développement </span>
            au Sahel
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            Depuis 1991, l'AMSS œuvre pour l'amélioration des conditions de vie des populations vulnérables 
            du Mali à travers des solutions durables et participatives.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col items-center p-6 bg-white/50 backdrop-blur-sm rounded-lg border border-border/50">
              <Users className="h-12 w-12 text-primary mb-3" />
              <div className="text-3xl font-bold text-foreground">460+</div>
              <div className="text-sm text-muted-foreground">Employés</div>
            </div>
            <div className="flex flex-col items-center p-6 bg-white/50 backdrop-blur-sm rounded-lg border border-border/50">
              <Globe className="h-12 w-12 text-accent mb-3" />
              <div className="text-3xl font-bold text-foreground">8</div>
              <div className="text-sm text-muted-foreground">Régions d'intervention</div>
            </div>
            <div className="flex flex-col items-center p-6 bg-white/50 backdrop-blur-sm rounded-lg border border-border/50">
              <Heart className="h-12 w-12 text-primary mb-3" />
              <div className="text-3xl font-bold text-foreground">30+</div>
              <div className="text-sm text-muted-foreground">Années d'expérience</div>
            </div>
          </div>

          {/* Call to action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="text-lg px-8 py-3">
              Découvrir nos projets
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-3">
              Comment nous aider
            </Button>
          </div>

          {/* Mission statement */}
          <div className="mt-16 p-8 bg-white/70 backdrop-blur-sm rounded-xl border border-border/50">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Notre Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Promouvoir et soutenir des solutions durables aux problèmes des populations vulnérables 
              du Mali à travers une approche transversale de la gouvernance et de la construction de la paix, 
              en mettant l'accent sur l'autonomisation des femmes et des jeunes.
            </p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection

