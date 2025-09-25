import React from 'react'

const domaines = [
  {
    title: 'Éducation',
    intro:
      "Accès, maintien et réussite scolaire des filles et garçons, y compris en contextes d'urgence.",
    items: [
      'Appui aux écoles (kits scolaires, mobiliers, réhabilitation légère)',
      'Classes de rattrapage et de transition pour enfants déscolarisés',
      'Formation des enseignants et comités de gestion scolaire (CGS)',
      "Sensibilisation sur l'importance de l'éducation des filles",
    ],
  },
  {
    title: 'Santé & Nutrition',
    intro:
      "Renforcement de l'offre de soins essentiels et prévention de la malnutrition aiguë.",
    items: [
      'Dépistage communautaire de la malnutrition (MUAC)',
      'Référencement des cas vers les CSCom/CSRef',
      'Promotion des pratiques familiales essentielles',
      'Soutien logistique aux structures de santé en zones difficiles',
    ],
  },
  {
    title: "Sécurité alimentaire & Moyens d’existence",
    intro: 'Soutien aux ménages vulnérables et relance économique locale.',
    items: [
      'Transferts monétaires et coupons alimentaires selon la saisonnalité',
      'Kits maraîchers et appui aux coopératives (semences, outils)',
      'Appui aux revenus des femmes (IGA, alphabétisation fonctionnelle)',
      'Relance de l’élevage familial (vaccination, aliments bétail)',
    ],
  },
  {
    title: 'WASH (Eau, Hygiène et Assainissement)',
    intro:
      "Améliorer l’accès à l’eau potable et aux services d’hygiène dans les communautés et écoles.",
    items: [
      'Réhabilitation de points d’eau et latrines scolaires',
      'Distribution de kits d’hygiène (dignité, ménage)',
      'Promotion de l’hygiène (CHP, ANJE, lavage des mains)',
      'Gestion communautaire et maintenance des ouvrages',
    ],
  },
  {
    title: 'Protection & Cohésion sociale',
    intro:
      'Prévention/prise en charge des violences basées sur le genre, protection de l’enfance, cohésion.',
    items: [
      'Espaces amis des enfants et activités psychosociales',
      'Accompagnement des survivantes VBG (orientation, écoute, MHPSS)',
      'Médiation communautaire et mécanismes de règlement des conflits',
      'Appui aux comités de protection communautaire',
    ],
  },
  {
    title: 'Gouvernance locale & Redevabilité',
    intro:
      'Renforcement des autorités locales, participation citoyenne et mécanismes de redevabilité.',
    items: [
      'Budgets participatifs communaux et cadres de concertation',
      'Comités de gestion et feedback communautaire (CFM)',
      'Renforcement des OSC locales (formation, gouvernance)',
      'Approche sensible au conflit et au genre',
    ],
  },
]

export default function DomainesPage() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Nos domaines d’intervention</h1>
        <p className="text-muted-foreground mt-2">
          L’Association Malienne pour la Survie au Sahel (AMSS) agit pour la résilience des
          communautés à travers des programmes intégrés et centrés sur les besoins.
        </p>
      </header>
      <div className="grid md:grid-cols-2 gap-6">
        {domaines.map((d) => (
          <article key={d.title} className="rounded-2xl border p-6 shadow-sm bg-white">
            <h2 className="text-xl font-semibold">{d.title}</h2>
            <p className="mt-2 text-sm text-gray-600">{d.intro}</p>
            <ul className="mt-4 list-disc pl-5 space-y-1 text-sm">
              {d.items.map((li, i) => (
                <li key={i}>{li}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}