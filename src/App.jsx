// src/App.jsx
import { BrowserRouter as Router, Routes, Route, useParams, Navigate } from 'react-router-dom'
import './App.css'

// Layout
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

// Pages
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import EducationPage from './pages/EducationPage'
import SantePage from './pages/SantePage'
import WashPage from './pages/WashPage'
import ProtectionPage from './pages/ProtectionPage'
import SecuriteAlimentairePage from './pages/SecuriteAlimentairePage'
import GouvernancePage from './pages/GouvernancePage'
import ProjetsEnCoursPage from './pages/ProjetsEnCoursPage'
import ProjetsTerminesPage from './pages/ProjetsTerminesPage'
import RapportsPage from './pages/RapportsPage'
import ContactPage from './pages/ContactPage'
import DomainesPage from './pages/DomainesPage'
import ProjetsPage from './pages/ProjetsPage'
import ZonesPage from './pages/ZonesPage'
import PartenairesPage from './pages/PartenairesPage'
import ActualitesPage from './pages/ActualitesPage'
import ActualiteDetailPage from './pages/ActualiteDetailPage'
import RecrutementPage from './pages/RecrutementPage'
import PartenairesPage from './pages/PartenairesPage.jsx'

// Données (pour redirection legacy id -> slug)
import { actualites } from './data/actualitesData'

// Redirection rétro-compatibilité: /actualites/:id -> /actualites/:slug
function RedirectActuById() {
  const { id } = useParams()
  const item = actualites.find(a => String(a.id) === String(id))
  if (!item) return <Navigate to="/actualites" replace />
  return <Navigate to={`/actualites/${item.slug}`} replace />
}

function App() {
  return (
    <Router>
      {/* Remonter automatiquement en haut à chaque navigation */}
      <ScrollToTop />

      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/a-propos" element={<AboutPage />} />

            {/* Domaines d'intervention */}
            <Route path="/domaines" element={<DomainesPage />} />
            <Route path="/education" element={<EducationPage />} />
            <Route path="/sante" element={<SantePage />} />
            <Route path="/wash" element={<WashPage />} />
            <Route path="/protection" element={<ProtectionPage />} />
            <Route path="/securite-alimentaire" element={<SecuriteAlimentairePage />} />
            <Route path="/gouvernance" element={<GouvernancePage />} />

            {/* Actualités */}
            {/* La route numérique d'abord pour capter /actualites/123 et rediriger */}
            <Route path="/actualites/:id(\\d+)" element={<RedirectActuById />} />
            <Route path="/actualites" element={<ActualitesPage />} />
            <Route path="/actualites/:slug" element={<ActualiteDetailPage />} />

            

            {/* Projets */}
            <Route path="/projets" element={<ProjetsPage />} />
            <Route path="/projets-en-cours" element={<ProjetsEnCoursPage />} />
            <Route path="/projets-termines" element={<ProjetsTerminesPage />} />

            {/* Rapports */}
            <Route path="/rapports" element={<RapportsPage />} />
            <Route path="/partenaires" element={<PartenairesPage />} />

            {/* Recrutement */}
            <Route path="/recrutement" element={<RecrutementPage />} />

            {/* Contact */}
            <Route path="/contact" element={<ContactPage />} />

            {/* Zones */}
            <Route path="/zones" element={<ZonesPage />} />
            <Route path="/zones/:id" element={<ZonesPage />} />

            {/* Partenaires (toujours accessible, maintenant aussi dans le sous-menu "Nos Projets") */}
            <Route path="/partenaires" element={<PartenairesPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
