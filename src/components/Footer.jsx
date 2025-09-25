import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 grid gap-8 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-xl bg-primary" />
            <span className="font-bold">AMSS</span>
          </div>
          <p className="text-sm text-foreground/70">
            Association Malienne pour la Survie au Sahel – agir au plus près des
            populations pour l’éducation, la santé, la paix et la résilience.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Navigation</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/a-propos" className="hover:underline">À propos</Link></li>
            <li><Link to="/domaines" className="hover:underline">Domaines</Link></li>
            <li><Link to="/projets" className="hover:underline">Projets</Link></li>
            <li><Link to="/zones" className="hover:underline">Zones d’intervention</Link></li>
            <li><Link to="/partenaires" className="hover:underline">Partenaires</Link></li>
            <li><Link to="/actualites" className="hover:underline">Actualités</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Programmes</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/education" className="hover:underline">Éducation</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <p className="text-sm text-foreground/80">info@ong-amss.org</p>
          <p className="text-sm text-foreground/80">Bamako & Tombouctou, Mali</p>
          <Link to="/contact" className="text-sm underline mt-2 inline-block">
            Formulaire de contact
          </Link>
        </div>
      </div>
      <div className="border-t py-4 text-center text-xs text-foreground/60">
        © {new Date().getFullYear()} AMSS. Tous droits réservés.
      </div>
    </footer>
  )
}
