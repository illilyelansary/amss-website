import React from 'react'

export default function ProtectionPage() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Protection & Cohésion sociale</h1>
        <p className="text-muted-foreground mt-2">
          Prévention et prise en charge des risques de protection, appui psychosocial et
          renforcement des mécanismes communautaires inclusifs.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        <article className="rounded-2xl border p-6 bg-white shadow-sm">
          <h2 className="text-xl font-semibold">Protection communautaire</h2>
          <ul className="list-disc pl-5 mt-3 text-sm">
            <li>Comités de protection et référencements</li>
            <li>Espaces amis des enfants, activités MHPSS</li>
            <li>Prévention et réponse aux VBG</li>
          </ul>
        </article>

        <article className="rounded-2xl border p-6 bg-white shadow-sm">
          <h2 className="text-xl font-semibold">Cohésion & prévention des conflits</h2>
          <ul className="list-disc pl-5 mt-3 text-sm">
            <li>Médiation locale et dialogue intercommunautaire</li>
            <li>Activités génératrices de confiance</li>
            <li>Approche sensible au conflit et au genre</li>
          </ul>
        </article>
      </div>
    </section>
  )
}
