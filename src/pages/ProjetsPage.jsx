import React from 'react'

const projets = [
  {
    title: "Accès et maintien des filles à l’école",
    zone: 'Gao, Tombouctou',
    periode: '2024 – 2025',
    resume:
      'Appui aux écoles primaires et secondaires, formation des enseignants, mobilisation des communautés et soutien aux filles à risque d’abandon.',
    thematiques: ['Éducation', 'Genre'],
  },
  {
    title: 'Réponse rapide aux chocs (RRM)',
    zone: 'Gao, Ménaka, Tombouctou',
    periode: '2023 – 2025',
    resume:
      'Évaluations multisectorielles rapides et assistance immédiate (NFI, WASH, transferts) aux populations nouvellement déplacées.',
    thematiques: ['WASH', 'Sécurité alimentaire', 'Protection'],
  },
  {
    title: 'Cohésion sociale et prévention des conflits',
    zone: 'Nord & Centre du Mali',
    periode: '2023 – 2024',
    resume:
      'Mécanismes communautaires de dialogue, médiation locale, activités génératrices de confiance et inclusion des jeunes/femmes.',
    thematiques: ['Paix & Cohésion', 'Gouvernance'],
  },
]

function Badge({ children }) {
  return (
    <span className="inline-block text-xs px-2 py-1 rounded-full border mr-2 mb-2">
      {children}
    </span>
  )
}

function ProjetsCard({ p }) {
  return (
    <article className="rounded-2xl border p-6 shadow-sm bg-white hover:shadow-md transition">
      <h3 className="text-lg font-semibold">{p.title}</h3>
      <p className="text-sm text-gray-600 mt-1">
        <strong>Zone :</strong> {p.zone} · <strong>Période :</strong> {p.periode}
      </p>
      <p className="mt-3 text-sm">{p.resume}</p>
      <div className="mt-3">
        {p.thematiques.map((t) => (
          <Badge key={t}>{t}</Badge>
        ))}
      </div>
    </article>
  )
}

export default function ProjetsPage() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Nos projets</h1>
        <p className="text-muted-foreground mt-2">
          Exemples de projets récents/structurants mis en œuvre par l’AMSS pour répondre aux besoins
          urgents et renforcer la résilience.
        </p>
      </header>
      <div className="grid md:grid-cols-2 gap-6">
        {projets.map((p) => (
          <ProjetsCard key={p.title} p={p} />
        ))}
      </div>
    </section>
  )
}