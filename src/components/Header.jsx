import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const navItems = [
  { to: '/', label: 'Accueil' },
  { to: '/a-propos', label: 'À propos' },
  { to: '/domaines', label: 'Domaines' },
  { to: '/projets', label: 'Projets' },
  { to: '/zones', label: "Zones d'intervention" },
  { to: '/partenaires', label: 'Partenaires' },
  { to: '/actualites', label: 'Actualités' },
  { to: '/education', label: 'Éducation' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const base = 'px-3 py-2 rounded-xl text-sm font-medium hover:bg-accent/20 transition'

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-primary" />
            <span className="font-bold">AMSS</span>
          </Link>

          {/* Desktop */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `${base} ${isActive ? 'bg-accent/30' : 'text-foreground/80'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile button */}
          <button
            className="lg:hidden p-2 rounded-xl border"
            onClick={() => setOpen((v) => !v)}
            aria-label="Ouvrir le menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <nav className="lg:hidden pb-4">
            <ul className="grid gap-1">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `${base} block ${isActive ? 'bg-accent/30' : 'text-foreground/80'}`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  )
}
