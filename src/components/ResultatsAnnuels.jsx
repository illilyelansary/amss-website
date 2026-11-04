// src/components/ResultatsAnnuels.jsx
// Bloc « Résultats de l’année » d’un domaine : chiffres sourcés du rapport annuel + présence actuelle
// (projets, zones et partenaires calculés depuis le registre).
import { Link } from 'react-router-dom'
import { FileText } from 'lucide-react'
import { chiffresCles, SOURCE_CHIFFRES } from '@/data/chiffresCles'
import { projetsReseau, partenaires } from '@/data/reseau'
import { hasCanon } from '@/utils/domainesCanon'
import { LiensZones, LiensPartenaires, lienProjet } from '@/components/liens/Liens'
import { zonesMenu } from '@/data/zonesMenu'

const parCode = new Map(projetsReseau.map((p) => [String(p.code || '').toUpperCase(), p]))

export default function ResultatsAnnuels({ domaine, titre }) {
  const items = chiffresCles[domaine] || []
  const projetsDomaine = projetsReseau.filter((p) => hasCanon(p, domaine))
  const enCours = projetsDomaine.filter((p) => p.status !== 'Terminé')
  const regions = zonesMenu.map((z) => z.label).filter((r) => enCours.some((p) => (p.regions || []).includes(r)))
  const slugs = new Set(enCours.flatMap((p) => [...p.bailleurs, ...p.miseEnOeuvre]))
  const partenairesActifs = partenaires.filter((x) => slugs.has(x.slug)).map((x) => x.slug)

  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-foreground mb-2">{titre || `Résultats ${SOURCE_CHIFFRES.annee}`}</h2>
          <p className="text-sm text-muted-foreground inline-flex items-center gap-1">
            <FileText className="h-4 w-4" /> Source : {SOURCE_CHIFFRES.libelle}
          </p>
        </div>

        {items.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((it, i) => {
              const p = it.projet ? parCode.get(it.projet.toUpperCase()) : null
              return (
                <div key={i} className="bg-white rounded-xl border shadow-sm p-5 flex flex-col">
                  <div className="text-3xl font-bold text-primary">{it.valeur}</div>
                  <p className="text-sm text-muted-foreground mt-2 flex-1">{it.libelle}</p>
                  {p && (
                    <Link to={lienProjet(p)} className="mt-3 text-xs text-primary hover:underline">
                      Projet : {p.code || p.title}
                    </Link>
                  )}
                </div>
              )
            })}
          </div>
        )}

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border p-5">
            <div className="text-sm text-muted-foreground">Projets en cours / terminés</div>
            <div className="text-2xl font-semibold mt-1">{enCours.length} / {projetsDomaine.length - enCours.length}</div>
          </div>
          <div className="bg-white rounded-xl border p-5">
            <div className="text-sm text-muted-foreground mb-2">Régions des projets en cours</div>
            <LiensZones regions={regions} icon={false} vide="Aucun projet en cours actuellement." />
          </div>
          <div className="bg-white rounded-xl border p-5">
            <div className="text-sm text-muted-foreground mb-2">Partenaires des projets en cours</div>
            <LiensPartenaires slugs={partenairesActifs} vide="—" />
          </div>
        </div>
      </div>
    </section>
  )
}
