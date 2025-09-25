import React from 'react'

export default function GouvernancePage() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Gouvernance locale & Redevabilité</h1>
        <p className="text-muted-foreground mt-2">
          Renforcer les autorités locales, la participation citoyenne et les mécanismes de
          redevabilité pour des services publics plus inclusifs et efficaces.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        <article className="rounded-2xl border p-6 bg-white shadow-sm">
          <h2 className="text-xl font-semibold">Appui institutionnel</h2>
          <ul className="list-disc pl-5 mt-3 text-sm">
            <li>Budgets participatifs et cadres de concertation</li>
            <li>Planification locale et suivi-évaluation</li>
            <li>Formation des OSC et des élus</li>
          </ul>
        </article>

        <article className="rounded-2xl border p-6 bg-white shadow-sm">
          <h2 className="text-xl font-semibold">Redevabilité & feedback</h2>
          <ul className="list-disc pl-5 mt-3 text-sm">
            <li>Mécanismes de plaintes et feedback (CFM)</li>
            <li>Transparence et communication publique</li>
            <li>Inclusion des femmes et des jeunes</li>
          </ul>
        </article>
      </div>
    </section>
  )
}
