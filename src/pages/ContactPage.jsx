import { MapPin, Phone, Mail, Clock, Send, Building, Globe, CheckCircle2, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useMemo, useState } from 'react'

/**
 * AMSS — Page Contact (GitHub + Netlify, sans API)
 * - Formulaire géré par Netlify Forms (data-netlify)
 * - Anti-spam (honeypot) Netlify
 * - Bureaux avec téléphones/emails multiples
 * - Partenaires (noms) déduits localement des données Projets (projetsData)
 */

const ContactPage = () => {
  // --- Etat minimal pour retour visuel local (facultatif) ---
  const [status, setStatus] = useState({ type: '', message: '' })

  // === Bureaux (coordonnées réelles) ===
  const bureaux = useMemo(() => ([
    {
      slug: 'tombouctou',
      ville: "Bureau de Tombouctou (siège de l'AMSS)",
      adresse: "Tombouctou/Quartier Hamabangou, Porte : 915, Route de Kabara en face de la BIM sa, BP : 152,",
      telephones: ["+223 76 04 21 32", "+223 66 71 38 12"],
      emails: ["mossainalbaraka@yahoo.fr", "mossa@ong-amss.org"],
      type: "Siège principal",
      responsable: "Moussa Inalbaraka Cissé",
      zones: ["Tombouctou", "Diré", "Goundam", "Niafunké", "Foum Elba", "Gourma-Rharous"]
    },
    {
      slug: 'bamako',
      ville: "Bamako",
      adresse: "BP 153 Bamako",
      telephones: ["+223 20 20 27 28"],
      emails: [],
      type: "Bureau de coordination",
      responsable: "",
      zones: ["Bamako"]
    },
    {
      slug: 'gao',
      ville: "Base d'AMSS Gao",
      adresse: "Gao , Château seteur II",
      telephones: ["+223 76 94 78 58"],
      emails: [],
      type: "Bureau régional",
      responsable: "MOUSSA SAGARA",
      zones: ["Gao", "Ménaka", "Kidal"]
    },
    {
      slug: 'sikasso',
      ville: "Base de Sikasso",
      adresse: "Sikasso/ Wayerma II derrière API",
      telephones: ["+223 74 72 79 67"],
      emails: ["aboubacrine@ong-amss.org", "aboubacrine14@gmail.com"],
      type: "Bureau régional",
      responsable: "Mohamed Aboubacrine Ag Mohamed",
      zones: ["Sikasso", "Koutiala", "Bougouni"]
    },
    {
      slug: 'mopti',
      ville: "Base d'AMSS Mopti",
      adresse: "Mopti/Sevaré, Quartier Poudrière près de l’Hôpital Somine Dolo, en face de la mosquée",
      telephones: ["+223 76 14 13 71"],
      emails: ["oumaryanogo@ong-amss.org"],
      type: "Bureau régional",
      responsable: "Oumar Yanogo",
      zones: ["Mopti", "Bandiagara", "Bankass", "Djenné", "Douentza", "Koro", "Ténenkou", "Youwarou"]
    },
    {
      slug: 'segou',
      ville: "Base d'AMSS Ségou",
      adresse: "Ségou; Sébougou près de l'université",
      telephones: ["+223 76 02 33 50"],
      emails: ["medagabdallah@ong-amss.org"],
      type: "Bureau régional",
      responsable: "Mohamed Ag Abdallah",
      zones: ["Ségou", "Barouéli", "Tominian", "San", "Bla", "Niono", "Macina"]
    }
  ]), [])

  // === Partenaires (noms) par bureau, sans API ===
  // On agrège depuis projetsData en matching "region" ~ zones du bureau
  const partnersByBureau = useMemo(() => {
    const byBureau = {}
    const norm = (s) => (s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

    const allProjects = [...projetsData.enCours, ...projetsData.termines]
    bureaux.forEach((b) => {
      const donors = new Set()
      allProjects.forEach((p) => {
        const regionStr = String(p.region || '')
        const hasMatch = b.zones.some((z) => norm(regionStr).includes(norm(z)))
        if (hasMatch) {
          // "donor" peut contenir plusieurs bailleurs séparés par "/"
          String(p.donor || '')
            .split('/')
            .map((s) => s.trim())
            .filter(Boolean)
            .forEach((d) => donors.add(d))
        }
      })
      byBureau[b.ville] = Array.from(donors).sort((a, b) => a.localeCompare(b))
    })
    return byBureau
  }, [bureaux])

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Mail className="h-16 w-16 text-primary mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Contactez-nous</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Nous sommes à votre écoute. N'hésitez pas à nous contacter pour toute
              question, partenariat ou collaboration.
            </p>
          </div>
        </div>
      </section>

      {/* Informations de contact principales */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white rounded-xl p-8 shadow-sm border border-border text-center">
                <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-4">Adresses</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p>BP 153 Bamako</p>
                  <p>BP 152 Tombouctou</p>
                  <p>Mali, Afrique de l'Ouest</p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-sm border border-border text-center">
                <Phone className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-4">Téléphones</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p>Tombouctou: <a className="hover:underline" href="tel:+22376042132">+223 76 04 21 32</a> / <a className="hover:underline" href="tel:+22366713812">+223 66 71 38 12</a></p>
                  <p>Bamako: <a className="hover:underline" href="tel:+22320202728">+223 20 20 27 28</a></p>
                  <p>Mobile: <a className="hover:underline" href="tel:+22366023225">+223 66 02 32 25</a></p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-sm border border-border text-center">
                <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-4">Emails</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p><a className="hover:underline" href="mailto:info@ong-amss.org">info@ong-amss.org</a></p>
                  <p><a className="hover:underline" href="mailto:amss@ong-amss.org">amss@ong-amss.org</a></p>
                  <p><a className="hover:underline" href="mailto:ong.amss@yahoo.com">ong.amss@yahoo.com</a></p>
                </div>
              </div>
            </div>

            {/* Carte (centrée sur Bamako) */}
            <div className="rounded-xl overflow-hidden border border-border shadow-sm">
              <iframe
                title="Carte AMSS Bamako"
                src="https://www.google.com/maps?q=Bamako%20Mali&output=embed"
                className="w-full h-[400px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Formulaire de contact — Netlify Forms (sans API) */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">Envoyez-nous un Message</h2>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Que vous soyez un partenaire potentiel, un bénéficiaire, un donateur
                  ou simplement curieux de nos activités, nous serions ravis d'échanger avec vous.
                </p>

                {status.type && (
                  <div className={`mb-6 rounded-lg border p-4 ${status.type === 'success' ? 'border-green-200 bg-green-50 text-green-800' : 'border-red-200 bg-red-50 text-red-800'}`}>
                    {status.type === 'success' ? <CheckCircle2 className="inline h-5 w-5 mr-2" /> : <AlertTriangle className="inline h-5 w-5 mr-2" />}
                    {status.message}
                  </div>
                )}
              </div>

              <div className="bg-white rounded-xl p-8 shadow-sm border border-border">
                {/* IMPORTANT Netlify: data-netlify, name, hidden input form-name + honeypot */}
                <form
                  name="contact"
                  method="POST"
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                  // action="/merci" // <-- décommente si tu crées une page /merci
                  className="space-y-6"
                >
                  {/* Honeypot */}
                  <input type="hidden" name="form-name" value="contact" />
                  <p className="hidden">
                    <label>
                      Ne pas remplir: <input name="bot-field" />
                    </label>
                  </p>

                  <div>
                    <label htmlFor="nom" className="block text-sm font-medium text-foreground mb-2">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      id="nom"
                      name="nom"
                      required
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Votre nom complet"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="votre.email@exemple.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="sujet" className="block text-sm font-medium text-foreground mb-2">
                      Sujet *
                    </label>
                    <select
                      id="sujet"
                      name="sujet"
                      required
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Sélectionnez un sujet</option>
                      <option value="partenariat">Partenariat</option>
                      <option value="don">Don / Financement</option>
                      <option value="emploi">Emploi / Stage</option>
                      <option value="information">Demande d'information</option>
                      <option value="media">Média / Presse</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                      placeholder="Décrivez votre demande ou votre message..."
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    <Send className="mr-2 h-5 w-5" />
                    Envoyer le Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nos bureaux */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Nos Bureaux Régionaux</h2>
              <p className="text-xl text-muted-foreground">Une présence de proximité dans {bureaux.length} régions du Mali</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bureaux.map((bureau, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-border">
                  <div className="flex items-center mb-4">
                    <Building className="h-6 w-6 text-primary mr-3" />
                    <h3 className="text-lg font-semibold text-foreground">{bureau.ville}</h3>
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    {bureau.adresse && <p>{bureau.adresse}</p>}

                    {/* Téléphones (multiples) */}
                    {bureau.telephones?.length > 0 && (
                      <div className="space-y-1">
                        {bureau.telephones.map((tel, i) => (
                          <p key={i}>
                            <a className="hover:underline" href={`tel:${tel.replace(/\s+/g, '')}`}>{tel}</a>
                          </p>
                        ))}
                      </div>
                    )}

                    {/* Emails (multiples) */}
                    {bureau.emails?.length > 0 && (
                      <p className="flex flex-wrap gap-2">
                        {bureau.emails.map((em, i) => (
                          <a key={i} href={`mailto:${em}`} className="hover:underline">{em}</a>
                        ))}
                      </p>
                    )}

                    {bureau.responsable && (
                      <p><span className="font-medium text-foreground">Responsable:</span> {bureau.responsable}</p>
                    )}
                    {bureau.zones?.length > 0 && (
                      <p><span className="font-medium text-foreground">Zones couvertes:</span> {bureau.zones.join(', ')}</p>
                    )}

                    {/* Partenaires (noms) — déduits localement depuis projetsData */}
                    {Array.isArray(partnersByBureau[bureau.ville]) && partnersByBureau[bureau.ville].length > 0 && (
                      <p><span className="font-medium text-foreground">Partenaires:</span> {partnersByBureau[bureau.ville].join(', ')}</p>
                    )}

                    <span className="inline-block bg-primary/10 text-primary px-2 py-1 rounded text-xs">{bureau.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Horaires et informations pratiques */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-sm border border-border">
                <Clock className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-4">Horaires d'Ouverture</h3>
                <div className="space-y-2 text-muted-foreground">
                  <div className="flex justify-between"><span>Lundi - Jeudi:</span><span>8h00 - 17h00</span></div>
                  <div className="flex justify-between"><span>Vendredi:</span><span>8h00 - 12h00</span></div>
                  <div className="flex justify-between"><span>Weekend:</span><span>Fermé</span></div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-sm border border-border">
                <Globe className="h-8 w-8 text-accent mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-4">Informations Pratiques</h3>
                <div className="space-y-3 text-muted-foreground">
                  <p>• Rendez-vous sur demande</p>
                  <p>• Interprétation en langues locales disponible</p>
                  <p>• Accès PMR dans nos bureaux principaux</p>
                  <p>• Parking disponible</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage

/* =================== Données Projets (à remplacer par tes vraies données) =================== */
/* 
   👉 Colle ici le contenu (tableaux) utilisé dans ta page Projets pour que l’agrégation fonctionne hors-API.
   Format attendu : projetsData.enCours et projetsData.termines = tableaux d’objets { region: string, donor: string }
   - region : texte libre contenant la/les régions (ex: "Gao, Kidal, Ménaka")
   - donor : liste de bailleurs/partenaires séparés par "/" (ex: "UNHCR / UNFPA / ACF")
*/

const projetsData = {
  enCours: [
    // EXEMPLES (remplace par tes vraies entrées)
    { region: "Gao, Ménaka", donor: "UNHCR / UNFPA" },
    { region: "Ségou, San, Bla", donor: "EDUCO / AECID" },
    { region: "Mopti, Douentza, Koro", donor: "CRS / ECHO" },
    { region: "Tombouctou, Diré, Goundam", donor: "CORDaid / UNHCR" },
  ],
  termines: [
    // EXEMPLES (remplace par tes vraies entrées)
    { region: "Sikasso, Bougouni", donor: "DDC / UE" },
    { region: "Kidal", donor: "PLAN / ACF" },
  ]
}
