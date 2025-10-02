// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom'
import './App.css'

// Layout
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import HashContactRedirect from './components/HashContactRedirect' // ⬅️ NEW

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
import PartenairesPage from './pages/PartenairesPage.jsx'  // ✅ import unique
import ActualitesPage from './pages/ActualitesPage'
import ActualiteDetailPage from './pages/ActualiteDetailPage'
import RecrutementPage from './pages/RecrutementPage.jsx'  // ✅ extension explicite
import DonPage from './pages/DonPage'
import MentionsLegalesPage from './pages/MentionsLegalesPage'
import PolitiqueConfidentialitePage from './pages/PolitiqueConfidentialitePage'
import TransparencePage from './pages/TransparencePage'
import BadgeEmployePage from './pages/BadgeEmployePage'


// Données (pour redirection legacy id -> slug)
import { actualites } from './data/actualitesData'

// Redirige /actualites/:id numérique vers /actualites/:slug
function RedirectActuById() {
  const { id } = useParams()
  const item = actualites.find(a => String(a.id) === String(id))
  if (!item) return <Navigate to="/actualites" replace />
  return <Navigate to={`/actualites/${item.slug}`} replace />
}

function App() {
  return (
    <Router>
      {/* Redirection auto /#contact → /contact (et ...#contact depuis n'importe quelle page) */}
      <HashContactRedirect />

      {/* Remonter automatiquement en haut à chaque navigation */}
      <ScrollToTop />

      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Routes>
            {/* Accueil & À propos */}
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
            <Route path="/actualites" element={<ActualitesPage />} />
            <Route path="/actualites/:slug" element={<ActualiteDetailPage />} />
            <Route path="/actualites/:id(\d+)" element={<RedirectActuById />} />

            {/* Projets */}
            <Route path="/projets" element={<ProjetsPage />} />
            <Route path="/projets-en-cours" element={<ProjetsEnCoursPage />} />
            <Route path="/projets-termines" element={<ProjetsTerminesPage />} />
            <Route path="/rapports" element={<RapportsPage />} />
            <Route path="/partenaires" element={<PartenairesPage />} /> {/* ✅ page dédiée */}

            {/* Zones d'intervention */}
            <Route path="/zones" element={<ZonesPage />} />
            <Route path="/zones/:id" element={<ZonesPage />} />

            {/* Recrutement & Contact */}
            <Route path="/recrutement" element={<RecrutementPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/don" element={<DonPage />} />
            <Route path="/mentions-legales" element={<MentionsLegalesPage />} />
            <Route path="/politique-confidentialite" element={<PolitiqueConfidentialitePage />} />
            <Route path="/transparence" element={<TransparencePage />} />
            <Route path="/recrutement" element={<RecrutementPage />} />
<Route path="/recrutement/emplois" element={<RecrutementPage />} />
<Route path="/recrutement/marches" element={<RecrutementPage />} />
            <Route path="/badge-employe" element={<BadgeEmployePage />} />


            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
