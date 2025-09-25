import React from 'react'

export default function SecuriteAlimentairePage() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Sécurité alimentaire & Moyens d’existence</h1>
        <p className="text-muted-foreground mt-2">
          Améliorer l’accès des ménages vulnérables à l’alimentation et relancer les moyens
          d’existence par des appuis adaptés au contexte local.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        <article className="rounded-2xl border p-6 bg-white shadow-sm">
          <h2 className="text-xl font-semibold">Assistance saisonnière</h2>
          <ul className="list-disc pl-5 mt-3 text-sm">
            <li>Transferts monétaires et coupons alimentaires</li>
            <li>Vivres pour actifs selon la saisonnalité</li>
            <li>Suivi post-distribution et redevabilité</li>
          </ul>
        </article>

        <article className="rounded-2xl border p-6 bg-white shadow-sm">
          <h2 className="text-xl font-semibold">Relance économique</h2>
          <ul className="list-disc pl-5 mt-3 text-sm">
            <li>Kits maraîchers, semences et outils</li>
            <li>Appui aux IGA des femmes et jeunes</li>
            <li>Relance de l’élevage familial (vaccination, aliments bétail)</li>
          </ul>
        </article>
      </div>
    </section>
  )
}
