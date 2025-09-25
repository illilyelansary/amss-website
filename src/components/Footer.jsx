import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import logoAmss from '../assets/LogoAMSSFHD.png'

const Footer = () => {
  const quickLinks = [
    { name: 'À Propos', href: '#apropos' },
    { name: 'Nos Projets', href: '#projets' },
    { name: 'Partenaires', href: '#partenaires' },
    { name: 'Actualités', href: '#actualites' },
    { name: 'Contact', href: '#contact' }
  ]

  const domaines = [
    { name: 'Éducation', href: '#education' },
    { name: 'Santé', href: '#sante' },
    { name: 'WASH', href: '#wash' },
    { name: 'Protection', href: '#protection' },
    { name: 'Gouvernance', href: '#gouvernance' }
  ]

  const zones = [
    { name: 'Tombouctou', href: '#tombouctou' },
    { name: 'Gao', href: '#gao' },
    { name: 'Mopti', href: '#mopti' },
    { name: 'Ségou', href: '#segou' },
    { name: 'Bamako', href: '#bamako' }
  ]

  return (
    <footer className="bg-foreground text-background">
      {/* Main footer content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Organization info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <img src={logoAmss} alt="Logo AMSS" className="h-16 w-16" />
              <div>
                <h3 className="text-xl font-bold text-primary">AMSS</h3>
                <p className="text-sm text-muted">Association Malienne pour la Survie au Sahel</p>
              </div>
            </div>
            <p className="text-muted mb-6 leading-relaxed">
              Depuis 1991, l'AMSS œuvre pour l'amélioration des conditions de vie des populations 
              vulnérables du Mali à travers des solutions durables et participatives dans huit domaines 
              d'intervention stratégiques.
            </p>
            
            {/* Contact info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-sm text-muted">BP 153 Bamako, 152 Tombouctou, Mali</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-sm text-muted">+223 21 92 10 48</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-sm text-muted">info@ong-amss.org</span>
              </div>
            </div>

            {/* Social media */}
            <div className="flex space-x-4 mt-6">
              <a href="#" className="p-2 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors">
                <Facebook className="h-5 w-5 text-primary" />
              </a>
              <a href="#" className="p-2 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors">
                <Twitter className="h-5 w-5 text-primary" />
              </a>
              <a href="#" className="p-2 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors">
                <Linkedin className="h-5 w-5 text-primary" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-lg font-semibold text-background mb-4">Liens Rapides</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-muted hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Domaines */}
          <div>
            <h4 className="text-lg font-semibold text-background mb-4">Nos Domaines</h4>
            <ul className="space-y-2">
              {domaines.map((domaine, index) => (
                <li key={index}>
                  <a 
                    href={domaine.href} 
                    className="text-muted hover:text-primary transition-colors text-sm"
                  >
                    {domaine.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Zones */}
          <div>
            <h4 className="text-lg font-semibold text-background mb-4">Nos Zones</h4>
            <ul className="space-y-2">
              {zones.map((zone, index) => (
                <li key={index}>
                  <a 
                    href={zone.href} 
                    className="text-muted hover:text-primary transition-colors text-sm"
                  >
                    {zone.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter signup */}
        <div className="border-t border-border/20 mt-12 pt-8">
          <div className="max-w-2xl mx-auto text-center">
            <h4 className="text-xl font-semibold text-background mb-4">
              Restez informé de nos actions
            </h4>
            <p className="text-muted mb-6">
              Inscrivez-vous à notre newsletter pour recevoir nos dernières actualités et rapports d'activités.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 px-4 py-2 rounded-lg bg-background/10 border border-border/20 text-background placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                S'inscrire
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted">
              © 2025 AMSS - Association Malienne pour la Survie au Sahel. Tous droits réservés.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-muted hover:text-primary transition-colors">
                Mentions légales
              </a>
              <a href="#" className="text-muted hover:text-primary transition-colors">
                Politique de confidentialité
              </a>
              <a href="#" className="text-muted hover:text-primary transition-colors">
                Transparence
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

