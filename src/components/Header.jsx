Voici **Header.jsx** mis à jour :

* Le bouton **“Faire un Don”** pointe bien vers **/don** (desktop + mobile).
* La **top bar** est responsive : en mobile, le numéro et les réseaux **ne se superposent plus** (stack + icônes compactes).

```jsx
import { useEffect, useState } from 'react'
import { Menu, X, ChevronDown, Facebook, Twitter, Linkedin, Youtube } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link, useLocation } from 'react-router-dom'
import logoAmss from '../assets/LogoAMSSFHD.png'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const location = useLocation()

  // Lock body scroll quand le menu mobile est ouvert
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = isMenuOpen ? 'hidden' : prev || ''
    return () => { document.body.style.overflow = prev || '' }
  }, [isMenuOpen])

  // Ignore le hash pour l'état "actif"
  const basePath = (href) => href.split('#')[0] || href

  const menuItems = [
    { name: 'Accueil', href: '/' },
    {
      name: 'À Propos',
      href: '/a-propos',
      dropdown: [
        { name: 'Qui sommes-nous', href: '/a-propos#top' },
        { name: 'Notre Histoire', href: '/a-propos#historique' },
        { name: 'Vision et Mission', href: '/a-propos#mission' },
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
        { name: 'Rapports', href: '/projets#rapports' },
        { name: 'Partenaires', href: '/partenaires' }
      ]
    },
    {
      name: "Zones d'Intervention",
      href: '/zones',
      dropdown: [
        { name: 'Tombouctou', href: '/zones#zone-tombouctou' },
        { name: 'Gao', href: '/zones#zone-gao' },
        { name: 'Ménaka', href: '/zones#zone-menaka' },
        { name: 'Mopti', href: '/zones#zone-mopti' },
        { name: 'Ségou', href: '/zones#zone-segou' },
        { name: 'Sikasso', href: '/zones#zone-sikasso' }
      ]
    },
    { name: 'Recrutement', href: '/recrutement' },
    { name: 'Actualités', href: '/actualites' },
    { name: 'Contact', href: '/contact' }
  ]

  const isActive = (href) => {
    const target = basePath(href)
    if (target === '/') return location.pathname === '/'
    if (target === '/projets') {
      const related = ['/projets', '/projets-en-cours', '/projets-termines', '/rapports', '/partenaires']
      return related.some(p => location.pathname.startsWith(p))
    }
    return location.pathname.startsWith(target)
  }

  // Scroll fluide si on reste sur la même page; sinon navigation normale (la page cible gère l'ancre)
  const handleSmoothNav = (e, href) => {
    const [path, hash] = href.split('#')
    if (!hash) return
    if (location.pathname === path) {
      e.preventDefault()
      const el = document.getElementById(hash)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container mx-auto px-4 text-sm">
          {/* empilage en mobile pour éviter les superpositions */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            {/* email + téléphone : wrap si besoin */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <span className="inline-flex items-center gap-1">📧 <span>info@ong-amss.org</span></span>
              <span className="inline-flex items-center gap-1">📞 <span>+223 21 92 10 48</span></span>
            </div>

            {/* réseaux sociaux : icônes compactes en mobile */}
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline">Suivez-nous:</span>
              <a
                href="https://www.facebook.com/ONGAMSS"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook AMSS"
                className="p-1.5 rounded-full hover:bg-primary/20 transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://x.com/ONG_AMSS"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X AMSS"
                className="p-1.5 rounded-full hover:bg-primary/20 transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/company/ong-amss"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn AMSS"
                className="p-1.5 rounded-full hover:bg-primary/20 transition-colors"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://www.youtube.com/@ONG-AMSS"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube AMSS"
                className="p-1.5 rounded-full hover:bg-primary/20 transition-colors"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main nav */}
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

          {/* Desktop */}
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
                  onClick={(e)=>handleSmoothNav(e, item.href)}
                  className={`flex items-center px-3 py-2 text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-foreground hover:text-primary'
                  }`}
                >
                  {item.name}
                  {item.dropdown && <ChevronDown className="ml-1 h-4 w-4" />}
                </Link>

                {item.dropdown && activeDropdown === index && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-border rounded-md shadow-lg py-2 z-50">
                    {item.dropdown.map((dropdownItem, dropdownIndex) => (
                      <Link
                        key={dropdownIndex}
                        to={dropdownItem.href}
                        onClick={(e)=>{
                          handleSmoothNav(e, dropdownItem.href)
                          setActiveDropdown(null)
                        }}
                        className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors"
                      >
                        {dropdownItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {/* ✅ Don: lien SPA */}
            <Link to="/don">
              <Button className="ml-4">Faire un Don</Button>
            </Link>
          </div>

          {/* Mobile button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile nav (overlay fixe et scrollable) */}
        {isMenuOpen && (
          <>
            {/* backdrop cliquable */}
            <div
              className="fixed inset-0 bg-black/20 backdrop-blur-sm lg:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
            <div className="fixed top-20 inset-x-0 bottom-0 bg-white border-t border-border overflow-y-auto lg:hidden">
              <div className="py-4 space-y-2">
                {menuItems.map((item, index) => (
                  <div key={index}>
                    <Link
                      to={item.href}
                      onClick={(e)=>{
                        handleSmoothNav(e, item.href)
                        setIsMenuOpen(false)
                      }}
                      className={`block px-4 py-2 text-sm font-medium transition-colors ${
                        isActive(item.href)
                          ? 'text-primary bg-muted'
                          : 'text-foreground hover:text-primary hover:bg-muted'
                      }`}
                    >
                      {item.name}
                    </Link>
                    {item.dropdown && (
                      <div className="pl-6 space-y-1">
                        {item.dropdown.map((dropdownItem, dropdownIndex) => (
                          <Link
                            key={dropdownIndex}
                            to={dropdownItem.href}
                            onClick={(e)=>{
                              handleSmoothNav(e, dropdownItem.href)
                              setIsMenuOpen(false)
                            }}
                            className="block px-4 py-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="px-4 pt-4 pb-6">
                  {/* ✅ Don mobile */}
                  <Link to="/don" onClick={()=>setIsMenuOpen(false)}>
                    <Button className="w-full">Faire un Don</Button>
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </nav>
    </header>
  )
}

export default Header
```
