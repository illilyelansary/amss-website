// src/pages/PartenairesPage.jsx
import React, { useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Handshake, Globe, MapPin, ArrowRight, Clock, CheckCircle, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Données locales (on conserve ton style et tes partenaires saisis ici)
const partenairesData = [
  {
    id: 1,
    name: 'Fondation Stromme',
    logo: '/assets/partenaires/stromme.png',
    type: 'Bailleur de fonds',
    description: "Partenaire clé dans le financement de nos programmes d'éducation et de développement communautaire.",
    website: 'https://strommefoundation.org/'
  },
  {
    id: 2,
    name: 'UNICEF Mali',
    logo: '/assets/partenaires/unicef.png',
    type: 'Partenaire technique et financier',
    description: "Collaboration sur les projets WASH d'urgence et la protection des enfants.",
    website: 'https://www.unicef.org/mali/'
  },
  {
    id: 3,
    name: 'PNUD Mali',
    logo: '/assets/partenaires/pnud.png',
    type: 'Partenaire institutionnel',
    description: 'Soutien au renforcement des capacités des femmes et à la gouvernance locale.',
    website: 'https://www.undp.org/mali'
  },
  {
    id: 4,
    name: 'GFFO (German Federal Foreign Office)',
    logo: '/assets/partenaires/gffo.png',
    type: 'Bailleur de fonds',
    description: 'Financement de projets de sécurité alimentaire et de résilience dans les régions vulnérables.',
    website: 'https://www.auswaertiges-amt.de/en/'
  },
  {
    id: 5,
    name: "Ministère de l'Éducation Nationale du Mali",
    logo: '/assets/partenaires/education_mali.png',
    type: 'Partenaire gouvernemental',
    description: "Collaboration étroite pour la mise en œuvre des programmes d'éducation alternative et formelle.",
    website: 'https://www.education.gouv.ml/'
  },
  {
    id: 6,
    name: 'Ministère de la Santé et du Développement Social du Mali',
    logo: '/assets/partenaires/sante_mali.png',
    type: 'Partenaire gouvernemental',
    description: "Partenariat pour l'amélioration des services de santé et de nutrition communautaire.",
    website: 'https://sante.gouv.ml/'
  }
]

// Données projets & partenaires (fichier de référence)
import {
  projetsEnCours,
  projetsTermines,
  partenaires as partenairesRef // optionnel : infos supplémentaires (ex. mots-clés)
} from '../data/projetsData'

// Utils
const norm = (s) =>
  String(s || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()

const slugify = (s) =>
  String(s || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')

// Matching partenaire ↔ projet (donor, alias, mots-clés)
const aliasGroups = [
  ['unicef mali', 'unicef'],
  ['hcr', 'unhcr'],
  ['programme alimentaire mondial', 'pam', 'wfp'],
  ['union europeenne', 'ue', 'european union', 'europeaid'],
  ['fondation stromme', 'stromme', "fondation stromme afrique de l'ouest"],
  ['usaid', 'us aid']
]

function matchPartnerProject(partner, project, partnerRef) {
  const pName = norm(partner.name)
  const donor = norm(project.donor)
  if (donor && pName && (donor.includes(pName) || pName.includes(donor))) return true

  for (const group of aliasGroups) {
    if (group.some(a => pName.includes(a))) {
      if (group.some(a => donor.includes(a))) return true
    }
  }

  // mots-clés éventuels via partenairesRef.projets (ex. "SSA/P")
  if (partnerRef && Array.isArray(partnerRef.projets)) {
    const title = norm(project.title)
    for (const kw of partnerRef.projets) {
      const token = norm(kw).split(' ')[0]
      if (token && title.includes(token)) return true
    }
  }
  return false
}

export default function PartenairesPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  const allProjects = useMemo(() => {
    const encours = (projetsEnCours || []).map(p => ({ ...p, _status: 'En cours' }))
    const termines = (projetsTermines || []).map(p => ({ ...p, _status: 'Terminé' }))
    return [...encours, ...termines]
  }, [])

  // fusion légère entre partenairesData (style + logos) et partenairesRef (infos projet)
  const partners = useMemo(() => {
    const refByName = new Map(
      (partenairesRef || []).map(p => [norm(p.name), p])
    )
    return partenairesData.map(p => {
      const ref = refByName.get(norm(p.name))
      const withSlug = { ...p, slug: slugify(p.name), ref }
      const projects = allProjects.filter(pr => matchPartnerProject(withSlug, pr, ref))
      return { ...withSlug, _projects: projects }
    }).sort((a, b) => b._projects.length - a._projects.length || a.name.localeCompare(b.name))
  }, [allProjects])

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
              L’AMSS collabore avec un réseau solide de partenaires nationaux et internationaux
              pour maximiser son impact et atteindre ses objectifs.
            </p>
          </div>
        </div>
      </section>

      {/* Grille des partenaires */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {partners.map((partenaire) => (
                <div
                  key={partenaire.slug}
                  id={partenaire.slug}
                  className="bg-white rounded-xl p-6 shadow-sm border border-border hover:shadow-lg transition-shadow"
                >
                  {/* Logo */}
                  {partenaire.logo && (
                    <img
                      src={partenaire.logo}
                      alt={partenaire.name}
                      className="h-20 object-contain mx-auto mb-4"
                      onError={(e) => {
                        e.currentTarget.onerror = null
                        e.currentTarget.src = '/assets/partenaires/placeholder.png'
                      }}
                    />
                  )}

                  {/* En-tête partenaire */}
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-foreground">{partenaire.name}</h3>
                    <p className="text-primary font-medium mt-1">{partenaire.type || 'Partenaire'}</p>
                  </div>

                  {partenaire.description && (
                    <p className="text-muted-foreground text-sm mt-3 leading-relaxed text-center">
                      {partenaire.description}
                    </p>
                  )}

                  {/* Lien site */}
                  {partenaire.website && (
                    <div className="text-center mt-3">
                      <a
                        href={partenaire.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-accent hover:underline text-sm"
                      >
                        <Globe className="h-4 w-4 mr-1" /> Visiter le site
                      </a>
                    </div>
                  )}

                  {/* Projets liés */}
                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-foreground">
                        Projets liés ({partenaire._projects.length})
                      </span>
                      {/* Lien vers page projets globale */}
                      <Link to="/projets" className="text-xs text-primary hover:underline">
                        Tous les projets
                      </Link>
                    </div>

                    {partenaire._projects.length === 0 ? (
                      <p className="text-sm text-muted-foreground">
                        Aucun projet associé trouvé pour le moment.
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {partenaire._projects.map((pr, idx) => (
                          <div key={idx} className="border border-border rounded-lg p-3">
                            <div className="flex flex-wrap items-center gap-2 text-xs mb-2">
                              {pr._status === 'En cours' ? (
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
                              <div className="text-sm text-muted-foreground mt-1">{pr.excerpt}</div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA secondaire en bas de page */}
            <div className="text-center mt-12">
              <Link to="/projets" className="inline-flex items-center text-primary font-medium hover:underline">
                Parcourir les projets <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Devenez un Partenaire de l’AMSS
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Ensemble, nous pouvons faire une différence durable dans la vie des populations du Sahel.
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
