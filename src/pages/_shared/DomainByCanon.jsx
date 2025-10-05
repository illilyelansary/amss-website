// src/pages/_shared/DomainByCanon.jsx
import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { projetsEnCours, projetsTermines } from '@/data/projetsData'
import { hasCanon, canonLabel } from '@/utils/domainesCanon'

const n = (x) => new Intl.NumberFormat('fr-FR').format(Number(x || 0))

export default function DomainByCanon({ canonKey, title, intro }) {
  const enCours = useMemo(() => (projetsEnCours || []).filter(p => hasCanon(p, canonKey)), [canonKey])
  const termines = useMemo(() => (projetsTermines || []).filter(p => hasCanon(p, canonKey)), [canonKey])
  const all = useMemo(() => [...enCours, ...termines]
    .sort((a, b) => String(a.title||'').localeCompare(String(b.title||''), 'fr')), [enCours, termines])

  const totalBenef = useMemo(() =>
    enCours.reduce((acc, p) => acc + Number(p.beneficiaries || 0), 0), [enCours])

  return (
    <div className="min-h-screen bg-background">
      <section className="py-16 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{title || canonLabel(canonKey)}</h1>
            {intro && <p className="text-lg text-muted-foreground">{intro}</p>}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Stat label="Projets en cours" value={enCours.length} />
              <Stat label="Projets terminés" value={termines.length} />
              <Stat label="Bénéficiaires (en cours)" value={n(totalBenef)} />
            </div>
            <div className="mt-6">
              <Link to={`/projets?domain=${encodeURIComponent(canonLabel(canonKey))}`}>
                <Button variant="outline">Ouvrir dans “Projets” (filtré)</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-8">
            <Block title="Projets en cours" items={enCours} empty="Aucun projet en cours pour ce domaine." />
            <Block title="Projets terminés" items={termines} empty="Aucun projet terminé pour ce domaine." />
          </div>
        </div>
      </section>
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border">
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="text-2xl font-semibold mt-1">{value}</div>
    </div>
  )
}

function Block({ title, items, empty }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {items.length === 0 ? (
        <p className="text-muted-foreground">{empty}</p>
      ) : (
        <ul className="divide-y">
          {items.map((p, idx) => (
            <li key={idx} className="py-3">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="font-medium">{p.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {p.bailleur ? <>Bailleur : {p.bailleur} • </> : null}
                    {p.region ? <>Région : {p.region}</> : null}
                  </div>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded border ${String(p.status||'').toLowerCase().includes('en cours') ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'}`}>
                  {p.status || '—'}
                </span>
              </div>
              {p.excerpt && <p className="text-sm text-muted-foreground mt-2">{p.excerpt}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
