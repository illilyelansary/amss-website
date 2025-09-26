// src/App.jsx
import { BrowserRouter as Router, Routes, Route, useParams, Navigate } from 'react-router-dom'
import './App.css'

// Layout
import Header from './components/Header'
import Footer from './components/Footer'

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
import ActualitesPage from './pages/ActualitesPage'          // ✅ une seule fois
import ActualiteDetailPage from './pages/ActualiteDetailPage'

// Données (pour redirection legacy)
import { actualites } from './data/actualitesData'

// Remonter en haut à chaque navigation
import ScrollToTop from './components/ScrollToTop'

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
            {/* ⚠️ La route numérique en premier, pour capter /actualites/123 et rediriger */}
            <Route path="/actualites/:id(\\d+)" element={<RedirectActuById />} />
            <Route path="/actualites" element={<ActualitesPage />} />
            <Route path="/actualites/:slug" element={<ActualiteDetailPage />} />

            {/* Projets */}
            <Route path="/projets" element={<ProjetsPage />} />
            <Route path="/projets-en-cours" element={<ProjetsEnCoursPage />} />
            <Route path="/projets-termines" element={<ProjetsTerminesPage />} />

            {/* Rapports & Contact */}
            <Route path="/rapports" element={<RapportsPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Autres */}
            <Route path="/zones" element={<ZonesPage />} />
            <Route path="/zones/:id" element={<ZonesPage />} />
            <Route path="/partenaires" element={<PartenairesPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
