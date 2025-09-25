import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'

// Pages principales
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'

// Domaines & sous-domaines
import EducationPage from './pages/EducationPage'
import SantePage from './pages/SantePage'
import SecuriteAlimentairePage from './pages/SecuriteAlimentairePage'
import WashPage from './pages/WashPage'
import ProtectionPage from './pages/ProtectionPage'
import GouvernancePage from './pages/GouvernancePage'

// Autres pages
import DomainesPage from './pages/DomainesPage'
import ProjetsPage from './pages/ProjetsPage'
import ZonesPage from './pages/ZonesPage'
import PartenairesPage from './pages/PartenairesPage'
import ActualitesPage from './pages/ActualitesPage'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Routes>
            {/* Pages principales */}
            <Route path="/" element={<HomePage />} />
            <Route path="/a-propos" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Nos Domaines et sous-domaines */}
            <Route path="/domaines" element={<DomainesPage />} />
            <Route path="/education" element={<EducationPage />} />
            <Route path="/sante" element={<SantePage />} />
            <Route path="/securite-alimentaire" element={<SecuriteAlimentairePage />} />
            <Route path="/wash" element={<WashPage />} />
            <Route path="/protection" element={<ProtectionPage />} />
            <Route path="/gouvernance" element={<GouvernancePage />} />

            {/* Autres pages */}
            <Route path="/projets" element={<ProjetsPage />} />
            <Route path="/zones" element={<ZonesPage />} />
            <Route path="/partenaires" element={<PartenairesPage />} />
            <Route path="/actualites" element={<ActualitesPage />} />

            {/* Page 404 */}
            <Route
              path="*"
              element={
                <div className="py-20 text-center">
                  <h1 className="text-2xl font-semibold">Page introuvable</h1>
                  <p className="text-sm text-gray-600 mt-2">
                    La page que vous cherchez n’existe pas. Retour à l’accueil.
                  </p>
                </div>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
