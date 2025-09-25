import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import EducationPage from './pages/EducationPage'
import ContactPage from './pages/ContactPage'
import DomainesPage from './pages/DomainesPage'
import ProjetsPage from './pages/ProjetsPage'
import ZonesPage from './pages/ZonesPage'
import PartenairesPage from './pages/PartenairesPage'
import ActualitesPage from './pages/ActualitesPage'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main className="min-h-[60vh]">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/a-propos" element={<AboutPage />} />
            <Route path="/education" element={<EducationPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/domaines" element={<DomainesPage />} />
            <Route path="/projets" element={<ProjetsPage />} />
            <Route path="/zones" element={<ZonesPage />} />
            <Route path="/partenaires" element={<PartenairesPage />} />
            <Route path="/actualites" element={<ActualitesPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
