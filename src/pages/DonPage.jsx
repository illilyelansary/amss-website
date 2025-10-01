import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Heart, CreditCard, Phone, Gift, Building2, Mail, ArrowRight } from 'lucide-react'

export default function DonPage() {
  const { hash } = useLocation()

  // Scroll doux si on arrive avec #ancre
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
  }, [hash])

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section id="top" className="py-20 bg-gradient-to-br from-primary/10 to-accent/10 scroll-mt-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white border border-border mb-4">
              <Heart className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Soutenir l’AMSS</h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Votre don renforce nos actions en éducation, santé, protection, WASH, gouvernance et sécurité alimentaire au Mali.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild className="px-6">
                <a href="#faire-un-don">Faire un don maintenant</a>
              </Button>
              <Button asChild variant="outline" className="px-6">
                <Link to="/partenaires#top">Devenir partenaire</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Moyens de don */}
      <section id="faire-un-don" className="py-16 scroll-mt-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-10 text-center">Moyens de contribuer</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Virement bancaire */}
              <div id="virement" className="bg-white rounded-xl p-6 border border-border shadow-sm scroll-mt-24">
                <div className="flex items-center gap-3 mb-3">
                  <CreditCard className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-semibold">Virement bancaire</h3>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-start gap-2"><Building2 className="h-4 w-4 mt-0.5" /><span><strong>Banque :</strong> <em>(à compléter)</em></span></div>
                  <div className="flex items-start gap-2"><Mail className="h-4 w-4 mt-0.5" /><span><strong>Titulaire :</strong> Association Malienne pour la Survie au Sahel (AMSS)</span></div>
                  <div className="flex items-start gap-2"><CreditCard className="h-4 w-4 mt-0.5" /><span><strong>IBAN / RIB :</strong> <em>(à compléter)</em></span></div>
                  <div className="flex items-start gap-2"><CreditCard className="h-4 w-4 mt-0.5" /><span><strong>BIC / SWIFT :</strong> <em>(à compléter)</em></span></div>
                  <div className="flex items-start gap-2"><ArrowRight className="h-4 w-4 mt-0.5" /><span><strong>Motif :</strong> Don AMSS – <em>Votre Nom</em></span></div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Merci d’envoyer le justificatif à <a className="underline" href="mailto:info@ong-amss.org">info@ong-amss.org</a> pour l’accusé de réception.
                </p>
              </div>

              {/* Mobile Money */}
              <div id="mobile-money" className="bg-white rounded-xl p-6 border border-border shadow-sm scroll-mt-24">
                <div className="flex items-center gap-3 mb-3">
                  <Phone className="h-6 w-6 text-accent" />
                  <h3 className="text-xl font-semibold">Mobile Money</h3>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div><strong>Orange Money :</strong> <em>(numéro à compléter)</em></div>
                  <div><strong>Moov Africa :</strong> <em>(numéro à compléter)</em></div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Après le transfert, envoyez le code de confirmation à <a className="underline" href="mailto:info@ong-amss.org">info@ong-amss.org</a>.
                </p>
              </div>

              {/* Don en nature */}
              <div id="don-en-nature" className="bg-white rounded-xl p-6 border border-border shadow-sm scroll-mt-24">
                <div className="flex items-center gap-3 mb-3">
                  <Gift className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-semibold">Don en nature</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Matériel scolaire, kits WASH, équipements, etc. Contactez-nous pour organiser la collecte et l’acheminement.
                </p>
                <div className="mt-3">
                  <Button asChild variant="outline">
                    <a href="/#contact">Nous contacter</a>
                  </Button>
                </div>
              </div>

              {/* Partenariats & mécénat */}
              <div id="partenariats" className="bg-white rounded-xl p-6 border border-border shadow-sm scroll-mt-24">
                <div className="flex items-center gap-3 mb-3">
                  <Building2 className="h-6 w-6 text-accent" />
                  <h3 className="text-xl font-semibold">Partenariats & mécénat</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Entreprises et fondations : co-construisons des projets à impact (éducation, santé, protection, WASH, gouvernance).
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button asChild className="px-4">
                    <Link to="/partenaires#top">Devenir partenaire</Link>
                  </Button>
                  <Button asChild variant="outline" className="px-4">
                    <a href="/#contact">Prendre rendez-vous</a>
                  </Button>
                </div>
              </div>
            </div>

            {/* FAQ simple */}
            <div className="mt-10">
              <h3 className="text-2xl font-semibold text-foreground mb-4">Questions fréquentes</h3>
              <div className="space-y-3">
                <details className="bg-white border border-border rounded-lg p-4">
                  <summary className="font-medium cursor-pointer">Puis-je recevoir un reçu / une attestation ?</summary>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Oui. Écrivez à <a className="underline" href="mailto:info@ong-amss.org">info@ong-amss.org</a> avec votre preuve de don et vos coordonnées.
                  </p>
                </details>
                <details className="bg-white border border-border rounded-lg p-4">
                  <summary className="font-medium cursor-pointer">Comment affectez-vous les dons ?</summary>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Les dons sont orientés en priorité vers nos programmes essentiels et les urgences humanitaires, avec une politique de redevabilité stricte.
                  </p>
                </details>
                <details className="bg-white border border-border rounded-lg p-4">
                  <summary className="font-medium cursor-pointer">Puis-je faire un don récurrent ?</summary>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Oui. Indiquez “Don récurrent” dans le motif du virement et contactez-nous pour le suivi.
                  </p>
                </details>
              </div>
            </div>

            {/* CTA bas de page */}
            <div className="mt-10 text-center">
              <div className="inline-flex items-center justify-center gap-3">
                <Button asChild>
                  <a href="#virement">Faire un don par virement</a>
                </Button>
                <Button asChild variant="outline">
                  <a href="/#contact">Nous contacter</a>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Besoin d’aide ? Écrivez-nous : <a className="underline" href="mailto:info@ong-amss.org">info@ong-amss.org</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
