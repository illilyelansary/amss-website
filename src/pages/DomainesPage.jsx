// src/pages/DomainesPage.jsx
import React, { useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { GraduationCap, Heart, Droplets, Shield, Users, Wheat, Layers } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { projetsEnCours, projetsTermines } from '../data/projetsData'

// Normalise et découpe les domaines potentiellement multiples
const splitDomains = (label) =>
  String(label || '')
    .split(/[,/|;]+/)
    .map(s => s.trim())
    .filter(Boolean)

const ICONS = {
  'Éducation': { icon: GraduationCap, color: 'text-blue-600', bg: 'bg-blue-50', link: '/education' },
  'Education': { icon: GraduationCap, color: 'text-blue-600', bg: 'bg-blue-50', link: '/education' },
  'Santé': { icon: Heart, color: 'text-red-600', bg: 'bg-red-50', link: '/sante' },
  'Nutrition': { icon: Heart, color: 'text-red-600', bg: 'bg-red-50', link: '/sante' },
  'WASH': { icon: Droplets, color: 'text-cyan-600', bg: 'bg-cyan-50', link: '/wash' },
  'Protection': { icon: Shield, color: 'text-purple-600', bg: 'bg-purple-50', link: '/protection' },
  'VBG': { icon: Shield, color: 'text-purple-600', bg: 'bg-purple-50', link: '/protection' },
  'Gouvernance': { icon: Users, color: 'text-green-600', bg: 'bg-green-50', link: '/gouvernance' },
  'Paix': { icon: Users, color: 'text-green-600', bg: 'bg-green-50', link: '/gouvernance' },
  'Sécurité Alimentaire': { icon: Wheat, color: 'text-orange-600', bg: 'bg-orange-50', link: '/securite-alimentaire' },
}

const pickIcon = (domainLabel) => {
  // essaie correspondance exacte, sinon heuristique simple
  for (const key of Object.keys(ICONS)) {
    if (domainLabel.toLowerCase().includes(key.toLowerCase())) return ICONS[key]
  }
  return { icon: Layers, color: 'text-slate-600', bg: 'bg-slate-50', link: '/domaines' }
}

export default function DomainesPage () {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  // Construit l’index des domaines à partir de projets (en cours + terminés)
  const domaines = useMemo(() => {
    const all = [...(projetsEnCours || []), ...(projetsTermines || [])]
    const map = new Map()

    for (const p of all) {
      const parts = splitDomains(p.domain)
      if (parts.length === 0) parts.push('Autres')

      for (const label of parts) {
        const curr = map.get(label) || { label, projets: [], benefEnCours: 0 }
        curr.projets.push(p)
        // stats : bénéficiaires uniquement des projets EN COURS
        if ((p.status || '').toLowerCase().includes('en cours')) {
          curr.benefEnCours += Number(p.beneficiaries || 0)
        }
        map.set(label, curr)
      }
    }

    // Ordonner par nb de projets décroissant
    const arr = Array.from(map.values()).sort((a, b) => b.projets.length - a.projets.length)
    return arr
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Nos Domaines d&apos;Intervention</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Cette page se met à jour automatiquement à partir de vos projets (projetsData).
            </p>
          </div>
        </div>
      </section>

      {/* Domaines dynamiques */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {domaines.map(d => {
                const { icon: Icon, color, bg, link } = pickIcon(d.label)
                return (
                  <div key={d.label} className="bg-white rounded-xl p-8 shadow-sm border border-border hover:shadow-lg transition-shadow">
                    <div className={`w-16 h-16 ${bg} rounded-lg flex items-center justify-center mb-6`}>
                      <Icon className={`h-8 w-8 ${color}`} />
                    </div>

                    <h3 className="text-xl font-semibold text-foreground mb-2">{d.label}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {d.projets.length.toLocaleString('fr-FR')} projet(s) • {d.benefEnCours.toLocaleString('fr-FR')} bénéficiaires (en cours)
                    </p>

                    <Link to={link}>
                      <Button variant="outline" className="w-full">En savoir plus</Button>
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">Découvrez Nos Actions</h2>
            <p className="text-xl text-muted-foreground mb-8">Explorez nos projets et leurs impacts</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/projets"><Button size="lg" className="text-lg px-8 py-3">Voir Nos Projets</Button></Link>
              <Link to="/zones"><Button variant="outline" size="lg" className="text-lg px-8 py-3">Zones d&apos;Intervention</Button></Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
