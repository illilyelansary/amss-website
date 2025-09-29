// src/pages/ZonesPage.jsx
import React, { useMemo, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { MapPin, Users, AlertTriangle, Clock } from 'lucide-react'
import { projetsEnCours, projetsTermines } from '../data/projetsData'
import { Button } from '@/components/ui/button'

const REGIONS = [
  'Tombouctou', 'Taoudénit', 'Taoudenni', 'Gao', 'Ménaka', 'Menaka', 'Kidal',
  'Mopti', 'Ségou', 'Segou', 'Sikasso', 'Koulikoro', 'Bamako'
]

// extrait proprement les régions à partir du champ free-text `region`
function extractRegions(regionStr) {
  const s = String(regionStr || '')
  const found = new Set()
  for (const r of REGIONS) {
    const re = new RegExp(`\\b${r}\\b`, 'i')
    if (re.test(s)) found.add(
      // normalise quelques variantes
      r.replace(/Segou/i, 'Ségou').replace(/Menaka/i, 'Ménaka').replace(/Taoudenni/i, 'Taoudénit')
    )
  }
  // split basique en complément (ex: "Ségou (Pelengana, Sébougou)")
  s.split(/[,/|;]+/).forEach(tok => {
    const t = tok.trim()
    for (const r of REGIONS) {
      if (new RegExp(`\\b${r}\\b`, 'i').test(t)) {
        found.add(r.replace(/Segou/i, 'Ségou').replace(/Menaka/i, 'Ménaka').replace(/Taoudenni/i, 'Taoudénit'))
      }
    }
  })
  return Array.from(found)
}

export default function ZonesPage () {
  const { id } = useParams()

  useEffect(() => {
    // si on arrive avec /zones/:id on scrolle vers la zone correspondante
    if (id) {
      const el = document.getElementById(id.toLowerCase())
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [id])

  // index des projets par région
  const zones = useMemo(() => {
    const index = new Map()
    const push = (region, p, status) => {
      const key = region.toLowerCase()
      const curr = index.get(key) || { key, label: region, enCours: [], termines: [] }
      curr[status].push(p)
      index.set(key, curr)
    }

    const allEnCours = (projetsEnCours || [])
    const allTermines = (projetsTermines || [])

    for (const p of allEnCours) {
      const regions = extractRegions(p.region)
      if (regions.length === 0) regions.push('National')
      regions.forEach(r => push(r, p, 'enCours'))
    }
    for (const p of allTermines) {
      const regions = extractRegions(p.region)
      if (regions.length === 0) regions.push('National')
      regions.forEach(r => push(r, p, 'termines'))
    }

    // tri par nombre de projets en cours (desc)
    return Array.from(index.values()).sort((a, b) => b.enCours.length - a.enCours.length)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Zones d&apos;Intervention</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Cette page se met à jour automatiquement à partir des régions indiquées dans vos projets.
              <br />Sikasso s’affichera dès qu’au moins un projet contient « Sikasso » dans son champ région.
            </p>
          </div>
        </div>
      </section>

      {/* Liste des zones */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-10">
            {zones.map(zone => (
              <div key={zone.key} id={zone.key} className="bg-white rounded-xl p-6 shadow-sm border border-border">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <MapPin className="h-6 w-6 text-primary" />
                    {zone.label}
                  </h2>
                  <div className="text-sm text-muted-foreground">
                    {zone.enCours.length} en cours • {zone.termines.length} terminés
                  </div>
                </div>

                {/* Projets en cours */}
                {zone.enCours.length > 0 && (
                  <>
                    <h3 className="text-lg font-semibold mb-3">Projets en cours</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                      {zone.enCours.map((p, i) => (
                        <div key={i} className="border border-border rounded-lg p-4">
                          <div className="flex flex-wrap items-center gap-2 text-xs mb-2">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-green-100 text-green-700 border border-green-200">
                              <Clock className="h-3 w-3 mr-1" /> En cours
                            </span>
                            {p.usaidNote && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-red-100 text-red-700 border border-red-200">
                                Suspendu (USAID)
                              </span>
                            )}
                            {p.beneficiaries ? (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-muted text-muted-foreground border">
                                <Users className="h-3 w-3 mr-1" /> {Number(p.beneficiaries).toLocaleString('fr-FR')}
                              </span>
                            ) : null}
                          </div>
                          <div className="font-medium">{p.title}</div>
                          <div className="text-sm text-muted-foreground">{p.domain}</div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* Projets terminés */}
                {zone.termines.length > 0 && (
                  <>
                    <h3 className="text-lg font-semibold mb-3">Projets terminés</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {zone.termines.map((p, i) => (
                        <div key={i} className="border border-border rounded-lg p-4">
                          <div className="flex flex-wrap items-center gap-2 text-xs mb-2">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 border border-blue-200">
                              Terminé
                            </span>
                          </div>
                          <div className="font-medium">{p.title}</div>
                          <div className="text-sm text-muted-foreground">{p.domain}</div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* Aucun projet */}
                {zone.enCours.length === 0 && zone.termines.length === 0 && (
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Pas de projets référencés dans cette zone pour le moment.
                  </div>
                )}
              </div>
            ))}

            <div className="text-center">
              <Link to="/projets">
                <Button variant="outline">Voir tous les projets</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
