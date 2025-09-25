import React from 'react'

export default function WashPage() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">WASH (Eau, Hygiène et Assainissement)</h1>
        <p className="text-muted-foreground mt-2">
          Accès à l’eau potable, promotion de l’hygiène et assainissement adaptés aux réalités
          des communautés et des écoles.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        <article className="rounded-2xl border p-6 bg-white shadow-sm">
          <h2 className="text-xl font-semibold">Infrastructures & maintenance</h2>
          <ul className="list-disc pl-5 mt-3 text-sm">
            <li>Réhabilitation de points d’eau et latrines</li>
            <li>Dispositifs de lavage des mains</li>
            <li>Comités de gestion et maintenance locale</li>
          </ul>
        </article>

        <article className="rounded-2xl border p-6 bg-white shadow-sm">
          <h2 className="text-xl font-semibold">Hygiène & comportements</h2>
          <ul className="list-disc pl-5 mt-3 text-sm">
            <li>Sensibilisation (CHP), kits d’hygiène</li>
            <li>Approche ANJE, eau domestique sûre</li>
            <li>WASH en milieu scolaire</li>
          </ul>
        </article>
      </div>
    </section>
  )
}
