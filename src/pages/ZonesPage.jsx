import React from 'react'

const regions = [
  { name: 'Tombouctou', cercles: ['Tombouctou', 'Diré', 'Goundam', 'Niafunké'] },
  { name: 'Gao', cercles: ['Gao', 'Ansongo', 'Bourem'] },
  { name: 'Kidal', cercles: ['Kidal', 'Tessalit', 'Abeïbara', 'Tin-Essako'] },
  { name: 'Ménaka', cercles: ['Ménaka', 'Anderamboukane'] },
  { name: 'Taoudéni', cercles: ['Taoudéni', 'Araouane'] },
  { name: 'Mopti (zones d’intervention ciblées)', cercles: ['Douentza', 'Bankass', 'Koro'] },
]

export default function ZonesPage() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Zones d’intervention</h1>
        <p className="text-muted-foreground mt-2">
          AMSS intervient prioritairement dans les régions du nord et du centre du Mali, en
          coordination avec les autorités et les communautés.
        </p>
      </header>
      <div className="grid md:grid-cols-2 gap-6">
        {regions.map((r) => (
          <article key={r.name} className="rounded-2xl border p-6 bg-white shadow-sm">
            <h2 className="text-xl font-semibold">{r.name}</h2>
            <ul className="mt-3 list-disc pl-5 text-sm">
              {r.cercles.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-6">
        Note : La présence opérationnelle varie selon l’accès, le contexte sécuritaire et les
        financements en cours.
      </p>
    </section>
  )
}