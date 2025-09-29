// src/pages/ZonesPage.jsx
import React, { useMemo, useEffect } from 'react';
import { MapPin, Users, FolderOpen, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projetsEnCours, projetsTermines } from '../data/projetsData';

const detectCoreRegion = (regionStr='') => {
  const s = String(regionStr || '').toLowerCase();
  if (s.includes('tombouctou')) return 'Tombouctou';
  if (s.includes('taoud') || s.includes('taouden')) return 'Taoudénit';
  if (s.includes('gao')) return 'Gao';
  if (s.includes('ménaka') || s.includes('menaka')) return 'Ménaka';
  if (s.includes('kidal')) return 'Kidal';
  if (s.includes('mopti')) return 'Mopti';
  if (s.includes('ségou') || s.includes('segou')) return 'Ségou';
  if (s.includes('sikasso')) return 'Sikasso';
  return 'Autres';
};

const coreRegions = [
  { key: 'Tombouctou', image: '/assets/zones/tombouctou.jpg' },
  { key: 'Taoudénit', image: '/assets/zones/taoudenit.jpg' },
  { key: 'Gao', image: '/assets/zones/gao.jpg' },
  { key: 'Ménaka', image: '/assets/zones/menaka.jpg' },
  { key: 'Kidal', image: '/assets/zones/kidal.jpg' },
  { key: 'Mopti', image: '/assets/zones/mopti.jpg' },
  { key: 'Ségou', image: '/assets/zones/segou.jpg' },
  { key: 'Sikasso', image: '/assets/zones/sikasso.jpg' },
];

export default function ZonesPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const all = useMemo(() => (projetsEnCours || []).concat(projetsTermines || []), []);
  const grouped = useMemo(() => {
    const g = {};
    for (const p of all) {
      const key = detectCoreRegion(p.region);
      if (!g[key]) g[key] = [];
      g[key].push(p);
    }
    return g;
  }, [all]);

  const cards = useMemo(() => {
    return coreRegions.map(r => {
      const list = grouped[r.key] || [];
      const enCours = list.filter(p => String(p.status || '').toLowerCase().includes('en cours') || p.status === 'Suspendu (USAID)');
      const termines = list.filter(p => String(p.status || '').toLowerCase().includes('termin'));
      const bene = enCours.reduce((acc, p) => acc + (typeof p.beneficiaries === 'number' ? p.beneficiaries : 0), 0);
      return {
        ...r,
        countEnCours: enCours.length,
        countTermines: termines.length,
        beneficiaries: bene,
        sample: list.slice(0, 4),
      };
    });
  }, [grouped]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Zones d’intervention</h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Vue dynamique par région, synchronisée avec la page « Nos Projets ». Les chiffres se mettent à jour automatiquement quand vous ajoutez un projet.
            </p>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {cards.map(c => (
              <div key={c.key} className="bg-white rounded-xl border border-border shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                {c.image && <img src={c.image} alt={c.key} className="w-full h-40 object-cover" />}
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-foreground">{c.key}</h3>
                    <span className="inline-flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1" /> { (grouped[c.key] || []).length } projets
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 my-4">
                    <div className="text-center rounded-lg bg-muted/40 p-3">
                      <div className="text-xs text-muted-foreground">En cours</div>
                      <div className="text-lg font-semibold">{c.countEnCours}</div>
                    </div>
                    <div className="text-center rounded-lg bg-muted/40 p-3">
                      <div className="text-xs text-muted-foreground">Terminés</div>
                      <div className="text-lg font-semibold">{c.countTermines}</div>
                    </div>
                    <div className="text-center rounded-lg bg-muted/40 p-3">
                      <div className="text-xs text-muted-foreground">Bénéficiaires</div>
                      <div className="text-lg font-semibold">{new Intl.NumberFormat('fr-FR').format(c.beneficiaries)}</div>
                    </div>
                  </div>

                  {c.sample.length > 0 && (
                    <>
                      <div className="text-sm font-medium text-foreground mb-2">Exemples récents</div>
                      <ul className="space-y-2">
                        {c.sample.map((p, idx) => (
                          <li key={idx} className="text-sm">
                            <span className="font-medium">{p.title}</span>
                            {p.usaidNote ? (
                              <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-700 border border-red-200">Suspendu (USAID)</span>
                            ) : (
                              <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-700 border border-green-200">{p.status || 'En cours'}</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  <div className="mt-5 flex justify-between items-center">
                    <Link to="/projets" className="inline-flex items-center text-primary hover:underline">
                      Voir les projets <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                    <Link to="/partenaires" className="inline-flex items-center text-primary hover:underline">
                      Partenaires <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
