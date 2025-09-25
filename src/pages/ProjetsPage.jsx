// src/pages/ProjetsPage.jsx
import React, { useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Clock, CheckCircle, FileText, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { projetsEnCours, projetsTermines, rapports } from '../data/projetsData'

// --- Helpers ---
const sum = (arr) => arr.reduce((a,b)=>a+b,0)

// Essaie d’estimer les communes à partir du champ `region` (très hétérogène).
// 1) Si on trouve "35 communes", on prend 35 (indice numérique).
// 2) Sinon, on regarde les noms listés entre parenthèses (ex: "Ségou (Pelengana, Sébougou, Ségou urbaine)").
// 3) À défaut, on tente un split basique (virgules, &, /). -> approximation.
// NB: Ce calcul reste approximatif. Pour un résultat 100% fiable, ajoutez à chaque projet un champ `communesCount` ou `communes: []`.
const extractCommunes = (regionStr) => {
  if (!regionStr) return { names: [], countHint: 0 }
  const s = String(regionStr)

  // 1) Nombre explicite "X communes"
  const mCount = s.match(/(\d+)\s*commune/i)
  const countHint = mCount ? Number(mCount[1]) : 0

  // 2) Contenu entre parenthèses : souvent une liste de communes
  const inside = (s.match(/\(([^)]+)\)/)?.[1]) || ''
  const listFromParentheses = inside
    ? inside.split(/[,&/;]| et /i).map(t => t.trim()).filter(Boolean)
    : []

  // 3) Split de secours sur la chaîne entière si pas de parenthèses explicites
  const fallbackList = !listFromParentheses.length
    ? s.split(/[,&/;]| et /i).map(t => t.trim()).filter(Boolean)
    : []

  // On filtre des mots génériques/régions connues pour éviter les faux positifs
  const ignoreRe = /(région|national|nord|centre|sahel|mali|cercle|commune|vill(e|age)|arrondissement|département)/i
  const knownRegionsRe = /(tombouctou|gao|ménaka|kidal|mopti|ségou|koulikoro|bamako|diré|goundam|niafunké|gourma[- ]rharous|ansongo)/i

  const keep = (t) => t &&
    !ignoreRe.test(t) &&
    // on garde les noms composés de >2 lettres et contenant une majuscule (pour écarter des mots communs)
    /[A-ZÀ-ÖØ-Ý]/.test(t[0]) &&
    t.length > 2

  const names = new Set(
    (listFromParentheses.length ? listFromParentheses : fallbackList)
      .map(v => v.replace(/\b(Région de|Cercle de|Commune de|Commune|Région|Cercle)\b\s*/i, ''))
      .map(v => v.replace(/^\d+\s*communes?$/i, ''))
      .map(v => v.trim())
      .filter(keep)
      // si le token est juste une grande région (Tombouctou / Gao...) on l’ignore
      .filter(v => !knownRegionsRe.test(v.toLowerCase()))
  )

  return { names: Array.from(names), countHint }
}

const ProjetsPage = () => {
  useEffect(() => {
    // À l’arrivée sur la page, on remonte en haut (au cas où)
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [])

  // --- Compteurs dynamiques (UNIQUEMENT projets EN COURS) ---
  const counters = useMemo(() => {
    const enCours = (projetsEnCours || [])
    const enCoursStrict = enCours.filter(p =>
      String(p.status || '').toLowerCase().includes('en cours')
    )

    // Bénéficiaires (somme simple)
    const totalBenef = sum(enCoursStrict.map(p => Number(p.beneficiaries || 0)))

    // Communes couvertes (≈) : union des noms + sommes des indices numériques "X communes"
    const communesSet = new Set()
    let communesNumeric = 0
    enCoursStrict.forEach(p => {
      const { names, countHint } = extractCommunes(p.region)
      names.forEach(n => communesSet.add(n.toLowerCase()))
      communesNumeric += Number(countHint || 0)
    })
    const totalCommunes = communesSet.size + communesNumeric

    const nbEnCours = enCoursStrict.length
    const nbSuspendusUSAID = enCours.filter(p => p.usaidNote === true).length

    return {
      totalBenef: new Intl.NumberFormat('fr-FR').format(totalBenef),
      totalCommunes: new Intl.NumberFormat('fr-FR').format(totalCommunes),
      nbEnCours,
      nbSuspendusUSAID
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-14 md:py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 md:mb-6">
              Nos Projets et Réalisations
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Découvrez nos projets en cours, nos réalisations passées et nos rapports d'activités
            </p>

            {/* Compteurs dynamiques */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-8">
              <div className="rounded-2xl bg-white p-5 shadow-sm border">
                <div className="text-sm text-muted-foreground">Bénéficiaires (projets en cours)</div>
                <div className="text-3xl font-semibold mt-1">{counters.totalBenef}</div>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border">
                <div className="text-sm text-muted-foreground">Communes couvertes (≈)</div>
                <div className="text-3xl font-semibold mt-1">{counters.totalCommunes}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Estimation basée sur les données “region” des projets
                </div>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border">
                <div className="text-sm text-muted-foreground">Projets en cours</div>
                <div className="text-3xl font-semibold mt-1">{counters.nbEnCours}</div>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border">
                <div className="text-sm text-muted-foreground">USAID en suspension</div>
                <div className="text-3xl font-semibold mt-1">{counters.nbSuspendusUSAID}</div>
              </div>
            </div>

            {/* Menu local (facultatif) */}
            <nav className="mt-8 flex flex-wrap justify-center gap-4">
              <a href="#top" onClick={(e)=>{e.preventDefault(); window.scrollTo({top:0, behavior:'smooth'})}} className="bg-white px-6 py-3 rounded-lg shadow-sm border border-border hover:bg-muted transition-colors">
                Projets en Cours
              </a>
              <a href="#top" onClick={(e)=>{e.preventDefault(); window.scrollTo({top:0, behavior:'smooth'})}} className="bg-white px-6 py-3 rounded-lg shadow-sm border border-border hover:bg-muted transition-colors">
                Projets Terminés
              </a>
              <a href="#top" onClick={(e)=>{e.preventDefault(); window.scrollTo({top:0, behavior:'smooth'})}} className="bg-white px-6 py-3 rounded-lg shadow-sm border border-border hover:bg-muted transition-colors">
                Rapports
              </a>
            </nav>
          </div>
        </div>
      </section>

      {/* Projets en Cours */}
      <section className="py-16 outline-none">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center mb-8">
              <Clock className="h-8 w-8 text-primary mr-3" />
              <h2 className="text-3xl font-bold text-foreground">Projets en Cours</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {projetsEnCours.map((projet, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-border">
                  <div className="flex items-center mb-4">
                    <div className={`w-3 h-3 rounded-full mr-2 ${projet.usaidNote ? 'bg-red-500' : 'bg-green-500'}`}></div>
                    <span className={`text-sm font-medium ${projet.usaidNote ? 'text-red-600' : 'text-green-600'}`}>
                      {projet.status}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {projet.title}
                  </h3>

                  <p className="text-muted-foreground text-sm mb-4">
                    {projet.excerpt}
                  </p>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Région:</span>
                      <span className="font-medium">{projet.region}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Bailleur:</span>
                      <span className="font-medium">{projet.donor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Domaine:</span>
                      <span className="font-medium">{projet.domain}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link to="/projets-en-cours" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <Button className="inline-flex items-center">
                  Voir tous les projets en cours
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Projets Terminés */}
      <section className="py-16 bg-muted/30 outline-none">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center mb-8">
              <CheckCircle className="h-8 w-8 text-accent mr-3" />
              <h2 className="text-3xl font-bold text-foreground">Projets Terminés</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {projetsTermines.map((projet, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-border">
                  <div className="flex items-center mb-4">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-sm font-medium text-blue-600">Terminé</span>
                  </div>

                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {projet.title}
                  </h3>

                  <p className="text-muted-foreground text-sm mb-4">
                    {projet.excerpt}
                  </p>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Région:</span>
                      <span className="font-medium">{projet.region}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Période:</span>
                      <span className="font-medium">
                        {new Date(projet.startDate).getFullYear()}–{new Date(projet.endDate).getFullYear()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Bénéficiaires:</span>
                      <span className="font-medium">
                        {projet.beneficiaries?.toLocaleString('fr-FR') || 'N/D'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link to="/projets-termines" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <Button variant="outline" className="inline-flex items-center">
                  Voir tous les projets terminés
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Rapports */}
      <section className="py-16 outline-none">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center mb-8">
              <FileText className="h-8 w-8 text-primary mr-3" />
              <h2 className="text-3xl font-bold text-foreground">Rapports et Documentation</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {rapports.map((rapport, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-border">
                  <div className="flex items-center mb-4">
                    <FileText className="h-5 w-5 text-primary mr-2" />
                    <span className="text-sm font-medium text-primary">{rapport.type}</span>
                  </div>

                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {rapport.title}
                  </h3>

                  <p className="text-muted-foreground text-sm mb-4">
                    {rapport.description}
                  </p>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Année: {rapport.year}</span>
                    <Button variant="outline" size="sm">
                      Télécharger
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link to="/rapports" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <Button variant="outline" className="inline-flex items-center">
                  Voir tous les rapports
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Collaborer avec l'AMSS
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Rejoignez-nous dans notre mission pour un développement durable au Sahel
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/partenaires" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <Button size="lg" className="text-lg px-8 py-3">
                  Devenir Partenaire
                </Button>
              </Link>
              <Link to="/contact" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                  Nous Contacter
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProjetsPage
