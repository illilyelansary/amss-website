import React from 'react'

const partenaires = [
  {
    categorie: 'Institutions publiques',
    noms: [
      'Ministères sectoriels (Éducation, Santé, Hydraulique)',
      'Collectivités territoriales',
      'Services techniques déconcentrés',
    ],
  },
  {
    categorie: 'Agences & bailleurs internationaux',
    noms: [
      'Agences des Nations Unies (ex. UNICEF, PAM, HCR)',
      'Union européenne / ECHO',
      'Coopérations bilatérales (ex. USAID, AFD, GIZ)',
    ],
  },
  {
    categorie: 'ONG & Réseaux',
    noms: [
      'Consortiums humanitaires et de développement',
      'OSC locales et plateformes de la société civile',
      'Réseaux thématiques (éducation, protection, WASH)',
    ],
  },
  {
    categorie: 'Secteur privé & médias',
    noms: ['Entreprises locales et fournisseurs', 'Médias communautaires pour la sensibilisation'],
  },
]

export default function PartenairesPage() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Partenaires techniques et financiers</h1>
        <p className="text-muted-foreground mt-2">
          AMSS travaille en synergie avec les autorités, les agences internationales, les ONG et les
          communautés pour maximiser l’impact et la pérennité des actions.
        </p>
      </header>
      <div className="grid md:grid-cols-2 gap-6">
        {partenaires.map((p) => (
          <article key={p.categorie} className="rounded-2xl border p-6 bg-white shadow-sm">
            <h2 className="text-xl font-semibold">{p.categorie}</h2>
            <ul className="mt-3 list-disc pl-5 text-sm">
              {p.noms.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <div className="mt-8 p-4 border rounded-xl bg-gray-50">
        <h3 className="font-semibold">Devenir partenaire</h3>
        <p className="text-sm text-gray-700 mt-1">
          Vous souhaitez collaborer avec l’AMSS ? Contactez-nous via la page « Contact » pour initier
          un échange.
        </p>
      </div>
    </section>
  )
}