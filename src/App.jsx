import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import EducationPage from './pages/EducationPage'
import ContactPage from './pages/ContactPage'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/a-propos" element={<AboutPage />} />
            <Route path="/education" element={<EducationPage />} />
            <Route path="/contact" element={<ContactPage />} />
            {/* Routes temporaires pour les autres pages */}
            <Route path="/domaines" element={<div className="py-20 text-center"><h1>Nos Domaines - En construction</h1></div>} />
            <Route path="/projets" element={<div className="py-20 text-center"><h1>Nos Projets - En construction</h1></div>} />
            <Route path="/zones" element={<div className="py-20 text-center"><h1>Zones d'Intervention - En construction</h1></div>} />
            <Route path="/partenaires" element={<div className="py-20 text-center"><h1>Partenaires - En construction</h1></div>} />
            <Route path="/actualites" element={<div className="py-20 text-center"><h1>Actualités - En construction</h1></div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App

