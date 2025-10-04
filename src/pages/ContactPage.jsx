// src/pages/ContactPage.jsx
import { MapPin, Phone, Mail, Clock, Send, Building, Globe, CheckCircle2, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'

import { bureaux } from '@/data/bureaux'
import { projetsEnCours, projetsTermines } from '@/data/projetsData' // <-- attention à la casse (projetsData)
import { mapPartnersByBureaux } from '@/utils/partners'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    sujet: '',
    message: '',
    website: '' // honeypot anti-spam (ne pas remplir)
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState({ type: '', message: '' })

  // Bailleurs/partenaires auto par bureau (cartographie + projets)
  const partnersByBureau = useMemo(
    () => mapPartnersByBureaux(bureaux, projetsEnCours, projetsTermines),
    []
  )

  // ===== Validation formulaire =====
  const validate = () => {
    const newErrors = {}
    if (!formData.nom || formData.nom.trim().length < 2) newErrors.nom = 'Veuillez saisir votre nom complet.'
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(formData.email)
    if (!emailOk) newErrors.email = 'Adresse e-mail invalide.'
    if (!formData.sujet) newErrors.sujet = 'Sélectionnez un sujet.'
    if (!formData.message || formData.message.trim().length < 10) newErrors.message = 'Votre message doit contenir au moins 10 caractères.'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))

  // ===== Soumission Netlify Forms (sans backend) =====
  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus({ type: '', message: '' })

    // honeypot
    if (formData.website) {
      setStatus({ type: 'error', message: 'Échec de l’envoi.' })
      return
    }

    if (!validate()) return

    // IMPORTANT: pour Netlify, on envoie 'form-name' + champs
    const payload = {
      'form-name': 'contact',
      nom: formData.nom,
      email: formData.email,
      sujet: formData.sujet,
      message: formData.message
    }

    try {
      setLoading(true)
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(payload).toString()
      })
      if (!res.ok) throw new Error('HTTP ' + res.status)
      setStatus({ type: 'success', message: 'Merci pour votre message ! Nous vous répondrons dans les meilleurs délais.' })
      setFormData({ nom: '', email: '', sujet: '', message: '', website: '' })
      setErrors({})
    } catch (err) {
      // ⚠️ Corrigé: pas d'antislash dans les guillemets
      setStatus({ type: 'error', message: 'Une erreur est survenue lors de l’envoi. Veuillez réessayer.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
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
                  <p>Tombouctou: <a className="hover:underline" href="tel:+22321921048">+223 21 92 10 48</a></p>
                  <p>Bamako: <a className="hover:underline" href="tel:+22320202728">+223 20 20 27 28</a></p>
                  <p>Mobile: <a className="hover:underline" href="tel:+22376023225">+223 76 02 32 25</a> / <a className="hover:underline" href="tel:+22366023225">+223 66 02 32 25</a></p>
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

      {/* Formulaire de contact (Netlify Forms) */}
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

                {status.type === 'success' && (
                  <div className="mb-6 flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-4 text-green-800">
                    <CheckCircle2 className="h-5 w-5 mt-0.5" />
                    <p>{status.message}</p>
                  </div>
                )}
                {status.type === 'error' && (
                  <div className="mb-6 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
                    <AlertTriangle className="h-5 w-5 mt-0.5" />
                    <p>{status.message}</p>
                  </div>
                )}
              </div>

              <div className="bg-white rounded-xl p-8 shadow-sm border border-border">
                <form
                  name="contact"
                  method="POST"
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  noValidate
                >
                  {/* champs requis par Netlify */}
                  <input type="hidden" name="form-name" value="contact" />
                  {/* honeypot (caché) */}
                  <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                    aria-hidden="true"
                  />
                  <p className="hidden">
                    <label>Ne pas remplir: <input name="bot-field" onChange={handleChange} /></label>
                  </p>

                  <div>
                    <label htmlFor="nom" className="block text-sm font-medium text-foreground mb-2">Nom complet *</label>
                    <input
                      type="text"
                      id="nom"
                      name="nom"
                      required
                      value={formData.nom}
                      onChange={handleChange}
                      aria-invalid={!!errors.nom}
                      aria-describedby={errors.nom ? 'nom-err' : undefined}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${errors.nom ? 'border-red-300' : 'border-border'}`}
                      placeholder="Votre nom complet"
                    />
                    {errors.nom && <p id="nom-err" className="mt-2 text-sm text-red-600">{errors.nom}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-err' : undefined}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${errors.email ? 'border-red-300' : 'border-border'}`}
                      placeholder="votre.email@exemple.com"
                    />
                    {errors.email && <p id="email-err" className="mt-2 text-sm text-red-600">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="sujet" className="block text-sm font-medium text-foreground mb-2">Sujet *</label>
                    <select
                      id="sujet"
                      name="sujet"
                      required
                      value={formData.sujet}
                      onChange={handleChange}
                      aria-invalid={!!errors.sujet}
                      aria-describedby={errors.sujet ? 'sujet-err' : undefined}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${errors.sujet ? 'border-red-300' : 'border-border'}`}
                    >
                      <option value="">Sélectionnez un sujet</option>
                      <option value="partenariat">Partenariat</option>
                      <option value="don">Don / Financement</option>
                      <option value="emploi">Emploi / Stage</option>
                      <option value="information">Demande d'information</option>
                      <option value="media">Média / Presse</option>
                      <option value="autre">Autre</option>
                    </select>
                    {errors.sujet && <p id="sujet-err" className="mt-2 text-sm text-red-600">{errors.sujet}</p>}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'message-err' : undefined}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none ${errors.message ? 'border-red-300' : 'border-border'}`}
                      placeholder="Décrivez votre demande ou votre message..."
                    />
                    {errors.message && <p id="message-err" className="mt-2 text-sm text-red-600">{errors.message}</p>}
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={loading}>
                    <Send className="mr-2 h-5 w-5" />
                    {loading ? 'Envoi…' : 'Envoyer le Message'}
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
              {bureaux.map((bureau) => (
                <div key={bureau.slug} className="bg-white rounded-xl p-6 shadow-sm border border-border">
                  <div className="flex items-center mb-4">
                    <Building className="h-6 w-6 text-primary mr-3" />
                    <h3 className="text-lg font-semibold text-foreground">{bureau.ville}</h3>
                  </div>

                  <div className="space-y-2 text-sm text-muted-foreground">
                    {/* Responsable en premier */}
                    {bureau.responsable && (
                      <p><span className="font-medium text-foreground">Responsable:</span> {bureau.responsable}</p>
                    )}
                    {bureau.distinctions && (<p className="italic">{bureau.distinctions}</p>)}

                    {/* Téléphones (multiples) */}
                    {Array.isArray(bureau.telephones) && bureau.telephones.length > 0 && (
                      <div className="space-y-1">
                        {bureau.telephones.map((tel, i) => (
                          <p key={i}>
                            <a className="hover:underline" href={'tel:' + tel.replace(/\s+/g, '')}>{tel}</a>
                          </p>
                        ))}
                      </div>
                    )}

                    {/* Emails (multiples) */}
                    {Array.isArray(bureau.emails) && bureau.emails.length > 0 && (
                      <p className="flex flex-wrap gap-2">
                        {bureau.emails.map((em, i) => (
                          <a key={i} href={`mailto:${em}`} className="hover:underline">{em}</a>
                        ))}
                      </p>
                    )}

                    {/* Adresse & zones */}
                    {bureau.adresse && <p><span className="font-medium text-foreground">Adresse:</span> {bureau.adresse}</p>}
                    {Array.isArray(bureau.zones) && bureau.zones.length > 0 && (
                      <p><span className="font-medium text-foreground">Zones couvertes:</span> {bureau.zones.join(', ')}</p>
                    )}
                    {!Array.isArray(bureau.zones) && bureau.zones && (
                      <p><span className="font-medium text-foreground">Zones couvertes:</span> {bureau.zones}</p>
                    )}

                    {/* Partenaires/Bailleurs auto (depuis helper) */}
                    {partnersByBureau[bureau.ville]?.length > 0 && (
                      <p><span className="font-medium text-foreground">Partenaires/Bailleurs:</span> {partnersByBureau[bureau.ville].join(', ')}</p>
                    )}

                    {/* Site web éventuel */}
                    {bureau.siteWeb && (
                      <p><a href={bureau.siteWeb} target="_blank" rel="noreferrer" className="hover:underline">{bureau.siteWeb}</a></p>
                    )}

                    {/* Lien fiche détails */}
                    <div className="pt-2">
                      <Button asChild size="sm">
                        <Link to={`/bureaux/${bureau.slug}`}>Voir la fiche</Link>
                      </Button>
                    </div>

                    <span className="inline-block bg-primary/10 text-primary px-2 py-1 rounded text-xs">{bureau.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Horaires & infos pratiques */}
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
