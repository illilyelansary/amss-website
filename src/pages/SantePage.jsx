import React from 'react'

export default function SantePage() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Santé & Nutrition</h1>
        <p className="text-muted-foreground mt-2">
          Renforcer l’offre de soins essentiels et prévenir la malnutrition aiguë, avec un fort
          ancrage communautaire et la coordination des structures publiques.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        <article className="rounded-2xl border p-6 bg-white shadow-sm">
          <h2 className="text-xl font-semibold">Prévention & dépistage</h2>
          <ul className="list-disc pl-5 mt-3 text-sm">
            <li>Dépistage communautaire MUAC et référencement</li>
            <li>Promotion des pratiques familiales essentielles</li>
            <li>Suivi de la croissance et counseling nutritionnel</li>
          </ul>
        </article>

        <article className="rounded-2xl border p-6 bg-white shadow-sm">
          <h2 className="text-xl font-semibold">Appui aux structures de santé</h2>
          <ul className="list-disc pl-5 mt-3 text-sm">
            <li>Dotations en consommables et petit équipement</li>
            <li>Renforcement des compétences du personnel</li>
            <li>Appui logistique en zones d’accès difficile</li>
          </ul>
        </article>
      </div>
    </section>
  )
}
