import { useState } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link, useLocation } from 'react-router-dom'
import logoAmss from '../assets/LogoAMSSFHD.png'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const location = useLocation()

  const menuItems = [
    { name: 'Accueil', href: '/' },
    {
      name: 'À Propos',
      href: '/a-propos',
      dropdown: [
        { name: 'Qui sommes-nous', href: '/a-propos#qui-sommes-nous' },
        { name: 'Notre Histoire', href: '/a-propos#histoire' },
        { name: 'Vision et Mission', href: '/a-propos#vision-mission' },
        { name: 'Équipe', href: '/a-propos#equipe' }
      ]
    },
    {
      name: 'Nos Domaines',
      href: '/domaines',
      dropdown: [
        { name: 'Éducation et Formation', href: '/education' },
        { name: 'Santé et Nutrition', href: '/sante' },
        { name: 'Sécurité Alimentaire', href: '/securite-alimentaire' },
        { name: 'WASH', href: '/wash' },
        { name: 'Protection et VBG', href: '/protection' },
        { name: 'Gouvernance et Paix', href: '/gouvernance' }
      ]
    },
    {
      name: 'Nos Projets',
      href: '/projets',
      dropdown: [
        { name: 'Projets en Cours', href: '/projets#cours' },
        { name: 'Projets Terminés', href: '/projets#termines' },
        { name: 'Rapports', href: '/projets#rapports' }
      ]
    },
    {
      name: 'Zones d\'Intervention',
      href: '/zones',
      dropdown: [
        { name: 'Tombouctou', href: '/zones/tombouctou' },
        { name: 'Gao', href: '/zones/gao' },
        { name: 'Ménaka', href: '/zones/menaka' },
        { name: 'Mopti', href: '/zones/mopti' },
        { name: 'Ségou', href: '/zones/segou' },
        { name: 'Sikasso', href: '/zones/sikasso' }
      ]
    },
    { name: 'Partenaires', href: '/partenaires' },
    { name: 'Actualités', href: '/actualites' },
    { name: 'Contact', href: '/contact' }
  ]

  const isActive = (href) => {
    if (href === '/') return location.pathname === '/'
    return location.pathname.startsWith(href)
  }

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top bar with contact info */}
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <span>📧 info@ong-amss.org</span>
            <span>📞 +223 21 92 10 48</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>Suivez-nous:</span>
            <a href="#" className="hover:text-accent transition-colors">Facebook</a>
            <a href="#" className="hover:text-accent transition-colors">Twitter</a>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img src={logoAmss} alt="Logo AMSS" className="h-16 w-16" />
            <div>
              <h1 className="text-xl font-bold text-primary">AMSS</h1>
              <p className="text-sm text-muted-foreground">Association Malienne pour la Survie au Sahel</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className="relative"
                onMouseEnter={() => item.dropdown && setActiveDropdown(index)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={item.href}
                  className={`flex items-center px-3 py-2 text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-foreground hover:text-primary'
                  }`}
                >
                  {item.name}
                  {item.dropdown && <ChevronDown className="ml-1 h-4 w-4" />}
                </Link>
                
                {/* Dropdown Menu */}
                {item.dropdown && activeDropdown === index && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-border rounded-md shadow-lg py-2 z-50">
                    {item.dropdown.map((dropdownItem, dropdownIndex) => (
                      <Link
                        key={dropdownIndex}
                        to={dropdownItem.href}
                        className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors"
                      >
                        {dropdownItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Button className="ml-4">Faire un Don</Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border">
            <div className="py-4 space-y-2">
              {menuItems.map((item, index) => (
                <div key={index}>
                  <Link
                    to={item.href}
                    className={`block px-4 py-2 text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? 'text-primary bg-muted'
                        : 'text-foreground hover:text-primary hover:bg-muted'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.dropdown && (
                    <div className="pl-6 space-y-1">
                      {item.dropdown.map((dropdownItem, dropdownIndex) => (
                        <Link
                          key={dropdownIndex}
                          to={dropdownItem.href}
                          className="block px-4 py-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {dropdownItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="px-4 pt-4">
                <Button className="w-full">Faire un Don</Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header
