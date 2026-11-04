// src/App.jsx
import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom'
import './App.css'

// Layout
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import HashContactRedirect from './components/HashContactRedirect'

// Pages
import HomePage from './pages/HomePage'
const AboutPage = lazy(() => import('./pages/AboutPage'))
const EducationPage = lazy(() => import('./pages/EducationPage'))
const SantePage = lazy(() => import('./pages/SantePage'))
const WashPage = lazy(() => import('./pages/WashPage'))
const ProtectionPage = lazy(() => import('./pages/ProtectionPage'))
const SecuriteAlimentairePage = lazy(() => import('./pages/SecuriteAlimentairePage'))
const GouvernancePage = lazy(() => import('./pages/GouvernancePage'))
const ProjetsEnCoursPage = lazy(() => import('./pages/ProjetsEnCoursPage'))
const ProjetsTerminesPage = lazy(() => import('./pages/ProjetsTerminesPage'))
const RapportsPage = lazy(() => import('./pages/RapportsPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const DomainesPage = lazy(() => import('./pages/DomainesPage'))
const ProjetsPage = lazy(() => import('./pages/ProjetsPage'))
const ZonesPage = lazy(() => import('./pages/ZonesPage'))
const PartenairesPage = lazy(() => import('./pages/PartenairesPage.jsx'))
const ActualitesPage = lazy(() => import('./pages/ActualitesPage'))
const ActualiteDetailPage = lazy(() => import('./pages/ActualiteDetailPage'))
const RecrutementPage = lazy(() => import('./pages/RecrutementPage.jsx'))
const DonPage = lazy(() => import('./pages/DonPage'))
const MentionsLegalesPage = lazy(() => import('./pages/MentionsLegalesPage'))
const PolitiqueConfidentialitePage = lazy(() => import('./pages/PolitiqueConfidentialitePage'))
const TransparencePage = lazy(() => import('./pages/TransparencePage'))
// SÉCURITÉ : le générateur de badges n'est JAMAIS inclus dans le site public.
// Il n'est disponible qu'en local (pnpm dev) ou dans un build interne
// explicitement lancé avec VITE_ENABLE_BADGE=1. Ainsi, personne sur Internet
// ne peut fabriquer un faux badge AMSS.
const BADGE_ENABLED = import.meta.env.DEV || import.meta.env.VITE_ENABLE_BADGE === '1'
const BadgeEmployePage = BADGE_ENABLED ? lazy(() => import('./pages/BadgeEmployePage')) : null

// ⬇️ NEW
const DetailsBureauPage = lazy(() => import('./pages/DetailsBureauPage'))
const BasesPage = lazy(() => import('./pages/BasesPage'))
const ProjetDetailPage = lazy(() => import('./pages/ProjetDetailPage'))
const PartenaireDetailPage = lazy(() => import('./pages/PartenaireDetailPage'))

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
      <HashContactRedirect />
      <ScrollToTop />

      <div className="min-h-screen bg-background">
        <Header />
        <main>
          {/* Les pages sont chargées à la demande : le visiteur ne télécharge
              que la page qu'il consulte (beaucoup plus rapide en 3G/4G). */}
          <Suspense fallback={<div className="min-h-[60vh]" aria-busy="true" />}>
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
            {/* ⚠️ bien doubler l'antislash pour le pattern numérique */}
            <Route path="/actualites/:id(\\d+)" element={<RedirectActuById />} />

            {/* Projets */}
            <Route path="/projets" element={<ProjetsPage />} />
            <Route path="/projets-en-cours" element={<ProjetsEnCoursPage />} />
            <Route path="/projets-termines" element={<ProjetsTerminesPage />} />
            <Route path="/rapports" element={<RapportsPage />} />
            <Route path="/partenaires" element={<PartenairesPage />} />

            {/* Zones d'intervention */}
            <Route path="/zones" element={<ZonesPage />} />
            <Route path="/zones/:id" element={<ZonesPage />} />

            {/* Recrutement & Contact */}
            <Route path="/recrutement" element={<RecrutementPage />} />
            <Route path="/recrutement/emplois" element={<RecrutementPage />} />
            <Route path="/recrutement/marches" element={<RecrutementPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/don" element={<DonPage />} />
            <Route path="/mentions-legales" element={<MentionsLegalesPage />} />
            <Route path="/politique-confidentialite" element={<PolitiqueConfidentialitePage />} />
            <Route path="/transparence" element={<TransparencePage />} />
            {BADGE_ENABLED && (
              <Route
                path="/badge-employe"
                element={<BadgeEmployePage />}
              />
            )}

            {/* ⬇️ NEW: fiche détails bureau */}
            <Route path="/bureaux" element={<BasesPage />} />
            <Route path="/bureaux/:slug" element={<DetailsBureauPage />} />
            <Route path="/projets/:slug" element={<ProjetDetailPage />} />
            <Route path="/partenaires/:slug" element={<PartenaireDetailPage />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
