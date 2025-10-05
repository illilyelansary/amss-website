// src/pages/PartenairesPage.jsx
import React, { useMemo, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Handshake,
  Globe,
  MapPin,
  ArrowRight,
  Clock,
  CheckCircle,
  Users,
  ChevronDown,
  ChevronUp,
  Building2,
  Search
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { projetsEnCours, projetsTermines } from '../data/projetsData'

/**
 * === PARTENAIRES — CATALOGUE DE RÉFÉRENCE ===
 */
const STATIC_PARTNERS = [
  // ONU & agences
  { acronym: 'UNHCR', name: 'Haut-Commissariat des Nations Unies pour les Réfugiés', type: 'Organisation internationale', logo: '/assets/partenaires/unhcr.png', website: 'https://www.unhcr.org/', match: ['unhcr', 'hcr'] },
  { acronym: 'UNICEF', name: 'Fonds des Nations Unies pour l’Enfance', type: 'Organisation internationale', logo: '/assets/partenaires/unicef.png', website: 'https://www.unicef.org/mali/', match: ['unicef'] },
  { acronym: 'UNFPA', name: 'Fonds des Nations Unies pour la Population', type: 'Organisation internationale', logo: '/assets/partenaires/unfpa.png', website: 'https://www.unfpa.org/', match: ['unfpa'] },
  { acronym: 'OCHA', name: 'Bureau de la coordination des affaires humanitaires', type: 'Organisation internationale', logo: '/assets/partenaires/ocha.png', website: 'https://www.unocha.org/', match: ['ocha'] },
  { acronym: 'UNMAS', name: 'United Nations Mine Action Service', type: 'Organisation internationale', logo: '/assets/partenaires/unmas.png', website: 'https://www.unmas.org/', match: ['unmas', 'mine action'] },
  { acronym: 'PNUD', name: 'Programme des Nations Unies pour le Développement', type: 'Organisation internationale', logo: '/assets/partenaires/pnud.png', website: 'https://www.undp.org/mali', match: ['pnud', 'undp'] },
  { acronym: 'PAM', name: 'Programme Alimentaire Mondial (WFP)', type: 'Organisation internationale', logo: '/assets/partenaires/pam.png', website: 'https://www.wfp.org/', match: ['pam', 'wfp'] },

  // Bailleurs / ONG internationales
  { acronym: 'USAID', name: 'United States Agency for International Development', type: 'Bailleur', logo: '/assets/partenaires/usaid.png', website: 'https://www.usaid.gov/', match: ['usaid'] },
  { acronym: 'Fondation Strømme', name: 'Fondation Strømme Afrique de l’Ouest', type: 'Bailleur', logo: '/assets/partenaires/stromme.png', website: 'https://strommefoundation.org/', match: ['stromme', 'strømme', "fondation stromme afrique de l'ouest"] },
  { acronym: 'UE', name: 'Union Européenne', type: 'Bailleur', logo: '/assets/partenaires/ue.png', website: 'https://europa.eu/', match: ['union européenne', 'ue', 'european union', 'europeaid'] },
  { acronym: 'DDC', name: 'Direction du Développement et de la Coopération (Coopération suisse)', type: 'Bailleur', logo: '/assets/partenaires/ddc.png', website: 'https://www.eda.admin.ch/', match: ['ddc', 'coopération suisse', 'cooperation suisse'] },
  { acronym: 'GFFO', name: 'German Federal Foreign Office', type: 'Bailleur', logo: '/assets/partenaires/gffo.png', website: 'https://www.auswaertiges-amt.de/en/', match: ['gffo'] },
  { acronym: 'Ambassade NL', name: 'Ambassade des Pays-Bas au Mali', type: 'Bailleur', logo: '/assets/partenaires/paysbas.png', website: 'https://www.netherlandsandyou.nl/', match: ['pays-bas', 'pays bas', 'netherlands'] },

  { acronym: 'FHI 360', name: 'Family Health International 360', type: 'ONG internationale', logo: '/assets/partenaires/fhi360.png', website: 'https://www.fhi360.org/', match: ['fhi 360', 'fhi360'] },
  { acronym: 'Save the Children', name: 'Save the Children International', type: 'ONG internationale', logo: '/assets/partenaires/savethechildren.png', website: 'https://www.savethechildren.net/', match: ['save the children'] },
  { acronym: 'World Vision', name: 'World Vision International', type: 'ONG internationale', logo: '/assets/partenaires/worldvision.png', website: 'https://www.wvi.org/', match: ['world vision'] },
  { acronym: 'EUMC', name: 'Entraide Universitaire Mondiale du Canada', type: 'ONG internationale', logo: '/assets/partenaires/eumc.png', website: 'https://wusc.ca/', match: ['eumc', 'wusc'] },
  { acronym: 'WHH', name: 'Welthungerhilfe', type: 'ONG internationale', logo: '/assets/partenaires/whh.png', website: 'https://www.welthungerhilfe.org/', match: ['whh', 'welthungerhilfe'] },
  { acronym: 'CRS', name: 'Catholic Relief Services', type: 'ONG internationale', logo: '/assets/partenaires/crs.png', website: 'https://www.crs.org/', match: ['crs', 'catholic relief'] },
  { acronym: 'Oxfam', name: 'Oxfam International', type: 'ONG internationale', logo: '/assets/partenaires/oxfam.png', website: 'https://www.oxfam.org/', match: ['oxfam'] },
  { acronym: 'HI', name: 'Handicap International (Humanity & Inclusion)', type: 'ONG internationale', logo: '/assets/partenaires/hi.png', website: 'https://www.hi.org/', match: ['handicap international', 'hi', 'humanity & inclusion'] },
  { acronym: 'ACF', name: 'Action contre la Faim', type: 'ONG internationale', logo: '/assets/partenaires/acf.png', website: 'https://www.actioncontrelafaim.org/', match: ['acf', 'action contre la faim'] },
  { acronym: 'CARE', name: 'CARE International', type: 'ONG internationale', logo: '/assets/partenaires/care.png', website: 'https://www.care-international.org/', match: ['care'] },
  { acronym: 'DRC', name: 'Danish Refugee Council', type: 'ONG internationale', logo: '/assets/partenaires/drc.png', website: 'https://www.drc.ngo/', match: ['drc', 'danish refugee'] },
  { acronym: 'IRC', name: 'International Rescue Committee', type: 'ONG internationale', logo: '/assets/partenaires/irc.png', website: 'https://www.rescue.org/', match: ['irc', 'rescue committee'] },
  { acronym: 'MSF', name: 'Médecins Sans Frontières', type: 'ONG internationale', logo: '/assets/partenaires/msf.png', website: 'https://www.msf.org/', match: ['msf', 'médecins sans frontières', 'medecins sans frontieres'] },
  { acronym: 'FBA', name: 'Folke Bernadotte Academy', type: 'Agence gouvernementale suédoise', logo: '/assets/partenaires/fba.png', website: 'https://fba.se/en/', match: ['fba', 'folke bernadotte'] },
  { acronym: 'FHM', name: 'Fonds Humanitaire pour le Mali', type: 'Fonds humanitaire', logo: '/assets/partenaires/fhm.png', website: '', match: ['fonds humanitaire pour le mali', 'fhm'] },

  // Nationaux / réseaux
  { acronym: 'GOUVERNEMENT DU MALI', name: 'Gouvernement du Mali (ministères et collectivités territoriales)', type: 'Gouvernement', logo: '/assets/partenaires/gouv_mali.png', website: 'https://www.gouv.ml/', match: ['gouvernement du mali', 'etat du mali', 'ministère', 'ministere'] },
  { acronym: 'PONAH', name: 'Plateforme des ONG Nationales Actives dans l’Humanitaire', type: 'Plateforme nationale', logo: '/assets/partenaires/ponah.png', website: '', match: ['ponah'] },
  { acronym: 'CAEB', name: 'Conseil et Appui pour l’Éducation à la Base', type: 'ONG nationale', logo: '/assets/partenaires/caeb.png', website: '', match: ['caeb'] },
  { acronym: 'FONGIM', name: 'Forum des ONG Internationales au Mali', type: 'Plateforme', logo: '/assets/partenaires/fongim.png', website: 'https://fongim.org/', match: ['fongim'] },
  { acronym: 'EDUCO', name: 'EDUCO – Éducation et protection de l’enfance', type: 'ONG', logo: '/assets/partenaires/educo.png', website: 'https://www.educo.org/', match: ['educo'] },
  { acronym: 'ADEFIM', name: 'Association pour le Développement de la Femme au Mali', type: 'ONG nationale', logo: '/assets/partenaires/adefim.png', website: '', match: ['adefim'] },
  { acronym: 'THINK PEACE', name: 'Think Peace – ONG malienne de consolidation de la paix', type: 'ONG nationale', logo: '/assets/partenaires/thinkpeace.png', website: '', match: ['think peace'] },
  { acronym: 'FEMAPH', name: 'Fédération Malienne des Associations de Personnes Handicapées', type: 'Fédération', logo: '/assets/partenaires/femaph.png', website: '', match: ['femaph'] },
  { acronym: 'ARGA', name: 'Alliance pour Refonder la Gouvernance en Afrique', type: 'Réseau', logo: '/assets/partenaires/arga.png', website: '', match: ['arga'] },
]

// Normalisation pour matching texte
const norm = (s) =>
  (s || '').toString().normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()

function buildPartnerIndexFromProjects(allProjects) {
  // 1) seed
  const index = {}
  const aliasToAcronym = {}

  STATIC_PARTNERS.forEach(p => {
    index[p.acronym] = { ...p, _projects: [] }
    ;(p.match || []).forEach(alias => {
      aliasToAcronym[norm(alias)] = p.acronym
    })
  })

  // 2) lecture projets -> match alias
  allProjects.forEach(pr => {
    const donorSrc = pr?.donor || pr?.bailleur || ''
    const donor = norm(donorSrc)
    if (!donor) return

    let matchedAcronym = null
    for (const alias in aliasToAcronym) {
      if (donor.includes(alias)) {
        matchedAcronym = aliasToAcronym[alias]
        break
      }
    }

    if (matchedAcronym) {
      index[matchedAcronym]._projects.push(pr)
      return
    }

    // 3) aucun match => créer un partenaire "dynamique" basé sur le libellé source
    const dynamicAcronym = donor.toUpperCase().slice(0, 32)
    if (!index[dynamicAcronym]) {
      index[dynamicAcronym] = {
        acronym: dynamicAcronym,
        name: donorSrc,
        type: 'Partenaire / Bailleur',
        logo: '/assets/partenaires/placeholder.png',
        website: '',
        match: [],
        _projects: [],
      }
    }
    index[dynamicAcronym]._projects.push(pr)
  })

  return index
}

// Tri des projets (En cours d'abord, puis par dates)
const safeDate = (d) => {
  if (!d) return null
  const x = new Date(d)
  return Number.isNaN(x.getTime()) ? null : x
}
const sortProjects = (arr) => {
  const a = [...(arr || [])]
  a.sort((p1, p2) => {
    const s1 = String(p1.status || p1._status || '').toLowerCase().includes('cours') ? 0 : 1
    const s2 = String(p2.status || p2._status || '').toLowerCase().includes('cours') ? 0 : 1
    if (s1 !== s2) return s1 - s2

    const b1 = safeDate(p1.startDate); const e1 = safeDate(p1.endDate)
    const b2 = safeDate(p2.startDate); const e2 = safeDate(p2.endDate)
    const t1 = (e1?.getTime?.() || b1?.getTime?.() || 0)
    const t2 = (e2?.getTime?.() || b2?.getTime?.() || 0)
    return t2 - t1
  })
  return a
}

const PartenairesPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  // Source de vérité : projetsEnCours / projetsTermines
  const allProjects = useMemo(() => {
    const encours = (projetsEnCours || []).map(p => ({ ...p, _status: 'En cours' }))
    const termines = (projetsTermines || []).map(p => ({ ...p, _status: 'Terminé' }))
    return [...encours, ...termines]
  }, [projetsEnCours, projetsTermines])

  const partnerIndex = useMemo(
    () => buildPartnerIndexFromProjects(allProjects),
    [allProjects]
  )

  const partnersBase = useMemo(() => {
    return Object.values(partnerIndex).sort((a, b) => {
      const d = (b._projects?.length || 0) - (a._projects?.length || 0)
      return d !== 0 ? d : a.acronym.localeCompare(b.acronym)
    })
  }, [partnerIndex])

  // STATISTIQUES INTRO
  const stats = useMemo(() => {
    const partnersActifs = partnersBase.filter(p => (p._projects?.length || 0) > 0)
    const nbPartenairesActifs = partnersActifs.length
    const nbEnCours = allProjects.filter(p => String(p._status || p.status).toLowerCase().includes('cours')).length
    const nbTermines = allProjects.length - nbEnCours
    const regions = new Set()
    let benef = 0
    allProjects.forEach(p => {
      if (p.region) regions.add(p.region)
      benef += Number(p.beneficiaries || 0) || 0
    })
    return {
      nbPartenairesActifs,
      nbTotalProjets: allProjects.length,
      nbEnCours,
      nbTermines,
      nbRegions: regions.size,
      benefTotal: benef
    }
  }, [partnersBase, allProjects])

  // Recherche partenaire
  const [q, setQ] = useState('')
  const partners = useMemo(() => {
    const n = norm(q)
    if (!n) return partnersBase
    return partnersBase.filter(p =>
      norm(p.acronym).includes(n) || norm(p.name).includes(n)
    )
  }, [q, partnersBase])

  // Ouverture/fermeture des listes (pliable) — par défaut TOUT est fermé
  const [open, setOpen] = useState({}) // { [acronym]: boolean }
  const toggle = (acr) => setOpen(prev => ({ ...prev, [acr]: !prev[acr] }))

  // ——————————————————————————————————————————
  // RENDER
  // ——————————————————————————————————————————
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Nos Partenaires
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              L’AMSS collabore avec des bailleurs, agences onusiennes, ONG internationales et nationales
              pour maximiser l’impact humanitaire et le développement durable dans nos zones d’intervention.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction + Chiffres clés + Recherche */}
      <section className="py-12 bg-white/60 border-y">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch">
              {/* Texte d'introduction + Recherche */}
              <div className="lg:col-span-2 bg-white border rounded-xl p-6 shadow-sm">
                <h2 className="text-2xl font-semibold text-foreground mb-3">Des alliances pour agir vite et durablement</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Nos partenariats s’articulent autour de programmes intégrés (Éducation, Santé &amp; Nutrition, WASH,
                  Protection, Gouvernance &amp; Paix, Sécurité alimentaire). Ensemble, nous co-construisons des solutions,
                  mutualisons les expertises et assurons la durabilité des acquis pour les communautés.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-3">
                  Cette page regroupe l’ensemble de nos partenaires identifiés dans la base de projets et indique, pour chacun,
                  le nombre de projets associés. Cliquez sur <em>Voir la liste des projets</em> pour afficher la liste détaillée.
                </p>

                {/* Champ de recherche */}
                <div className="mt-5">
                  <label className="text-xs text-muted-foreground block mb-1">Rechercher un partenaire</label>
                  <div className="relative">
                    <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                    <input
                      type="text"
                      value={q}
                      onChange={(e) => setQ(e.target.value)}
                      placeholder="Ex. USAID, UNICEF, Fondation Strømme, Gouvernement du Mali…"
                      className="w-full pl-9 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
              </div>

              {/* Chiffres clés */}
              <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                  icon={<Handshake className="h-5 w-5" />}
                  label="Partenaires actifs"
                  value={stats.nbPartenairesActifs}
                />
                <StatCard
                  icon={<Building2 className="h-5 w-5" />}
                  label="Projets (total)"
                  value={stats.nbTotalProjets}
                />
                <StatCard
                  icon={<Clock className="h-5 w-5" />}
                  label="En cours"
                  value={stats.nbEnCours}
                />
                <StatCard
                  icon={<CheckCircle className="h-5 w-5" />}
                  label="Terminés"
                  value={stats.nbTermines}
                />
                <StatCard
                  icon={<MapPin className="h-5 w-5" />}
                  label="Régions couvertes"
                  value={stats.nbRegions}
                />
                <StatCard
                  icon={<Users className="h-5 w-5" />}
                  label="Bénéficiaires (est.)"
                  value={stats.benefTotal.toLocaleString('fr-FR')}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grille des partenaires */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {partners.length === 0 ? (
              <div className="text-center text-muted-foreground">Aucun partenaire ne correspond à « {q} ».</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {partners.map((p) => {
                  const projectsRaw = p._projects || []
                  const projects = sortProjects(projectsRaw)
                  const count = projects.length
                  const hasSuspendedUSAID = p.acronym === 'USAID' && projects.some(pr => pr.usaidNote)
                  const isOpen = !!open[p.acronym]

                  return (
                    <div key={p.acronym} className="bg-white rounded-xl p-6 shadow-sm border border-border hover:shadow-lg transition-shadow">
                      <div className="flex items-start gap-4">
                        <img
                          src={p.logo || '/assets/partenaires/placeholder.png'}
                          alt={p.acronym}
                          className="h-16 w-16 object-contain rounded-md border border-muted"
                          onError={(e) => { e.currentTarget.src = '/assets/partenaires/placeholder.png' }}
                        />
                        <div className="flex-1">
                          <div className="text-sm text-muted-foreground">{p.type || 'Partenaire'}</div>
                          <h3 className="text-lg font-semibold text-foreground">
                            {p.acronym} <span className="text-muted-foreground">— {p.name}</span>
                          </h3>
                          {p.website && (
                            <a
                              href={p.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-primary text-sm hover:underline mt-1"
                            >
                              <Globe className="h-4 w-4 mr-1" /> Site officiel
                            </a>
                          )}
                          {hasSuspendedUSAID && (
                            <div className="mt-2 inline-flex items-center text-xs px-2 py-1 rounded bg-red-100 text-red-700">
                              Projets USAID suspendus (décision du Gouvernement américain)
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Résumé & Contrôle d'ouverture */}
                      <div className="mt-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Handshake className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium text-foreground">
                              Projets associés <span className="text-muted-foreground">({count})</span>
                            </span>
                          </div>
                          {count > 0 && (
                            <button
                              type="button"
                              onClick={() => toggle(p.acronym)}
                              className="inline-flex items-center text-sm text-primary hover:underline"
                              aria-expanded={isOpen}
                              aria-controls={`projects-${p.acronym}`}
                            >
                              {isOpen ? <>Plier <ChevronUp className="ml-1 h-4 w-4" /></> : <>Voir la liste des projets <ChevronDown className="ml-1 h-4 w-4" /></>}
                            </button>
                          )}
                        </div>

                        {/* Liste pliable — FERMÉE par défaut. Rien n'est affiché tant qu'on n'a pas cliqué */}
                        {isOpen && count > 0 && (
                          <div id={`projects-${p.acronym}`} className="mt-3 space-y-3">
                            {projects.map((pr, idx) => {
                              const key = `${p.acronym}-${pr.id || idx}`
                              const enCours = String(pr.status || pr._status || '').toLowerCase().includes('cours')
                              return (
                                <div key={key} className="border border-border rounded-lg p-3">
                                  <div className="flex flex-wrap items-center gap-2 text-xs mb-2">
                                    {enCours ? (
                                      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-green-100 text-green-700 border border-green-200">
                                        <Clock className="h-3 w-3 mr-1" /> En cours
                                      </span>
                                    ) : (
                                      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 border border-blue-200">
                                        <CheckCircle className="h-3 w-3 mr-1" /> Terminé
                                      </span>
                                    )}
                                    {pr.usaidNote && (
                                      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-red-100 text-red-700 border border-red-200">
                                        Suspendu (USAID)
                                      </span>
                                    )}
                                    {pr.region && (
                                      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-muted text-muted-foreground border">
                                        <MapPin className="h-3 w-3 mr-1" /> {pr.region}
                                      </span>
                                    )}
                                    {pr.beneficiaries ? (
                                      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-muted text-muted-foreground border">
                                        <Users className="h-3 w-3 mr-1" /> {Number(pr.beneficiaries).toLocaleString('fr-FR')}
                                      </span>
                                    ) : null}
                                  </div>
                                  <div className="font-medium">{pr.title}</div>
                                  {pr.excerpt && (
                                    <div className="text-sm text-muted-foreground mt-1">
                                      {pr.excerpt}
                                    </div>
                                  )}
                                </div>
                              )
                            })}

                            {/* Lien vers la page Projets filtrée par bailleur */}
                            <div className="text-right">
                              <Link
                                to={`/projets?bailleur=${encodeURIComponent(p.name || p.acronym)}`}
                                className="inline-flex items-center text-primary text-sm hover:underline"
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                              >
                                Parcourir ces projets <ArrowRight className="ml-1 h-4 w-4" />
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">Devenez un Partenaire de l’AMSS</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Ensemble, nous pouvons faire une différence durable pour les populations du Sahel.
            </p>
            <Link to="/contact">
              <Button size="lg" className="text-lg px-8 py-3">
                Nous Contacter pour un Partenariat
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

// ——————————————————————————————————————————
// Composants internes
// ——————————————————————————————————————————
function StatCard({ icon, label, value }) {
  return (
    <div className="bg-white border rounded-xl p-5 shadow-sm">
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="mt-1 flex items-center gap-2 text-2xl font-semibold">
        {icon} {value}
      </div>
    </div>
  )
}

export default PartenairesPage
