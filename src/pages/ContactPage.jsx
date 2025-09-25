import { MapPin, Phone, Mail, Clock, Send, Building, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    sujet: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Ici, on intégrerait l'envoi du formulaire
    console.log('Formulaire soumis:', formData)
    alert('Merci pour votre message ! Nous vous répondrons dans les plus brefs délais.')
  }

  const bureaux = [
    {
      ville: "Tombouctou",
      adresse: "BP 152 Tombouctou",
      telephone: "+223 21 92 10 48",
      type: "Siège principal"
    },
    {
      ville: "Bamako",
      adresse: "BP 153 Bamako",
      telephone: "+223 20 20 27 28",
      type: "Bureau de coordination"
    },
    {
      ville: "Gao",
      adresse: "Bureau régional de Gao",
      telephone: "Contact via Tombouctou",
      type: "Bureau régional"
    },
    {
      ville: "Mopti",
      adresse: "Bureau régional de Mopti",
      telephone: "Contact via Tombouctou",
      type: "Bureau régional"
    },
    {
      ville: "Ségou",
      adresse: "Bureau régional de Ségou",
      telephone: "Contact via Tombouctou",
      type: "Bureau régional"
    },
    {
      ville: "Sikasso",
      adresse: "Bureau régional de Sikasso",
      telephone: "Contact via Tombouctou",
      type: "Bureau régional"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Mail className="h-16 w-16 text-primary mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Contactez-nous
            </h1>
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
                  <p>Tombouctou: +223 21 92 10 48</p>
                  <p>Bamako: +223 20 20 27 28</p>
                  <p>Mobile: +223 66 02 32 25</p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-8 shadow-sm border border-border text-center">
                <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-4">Emails</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p>info@ong-amss.org</p>
                  <p>amss@ong-amss.org</p>
                  <p>ong.amss@yahoo.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formulaire de contact */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Envoyez-nous un Message
                </h2>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Que vous soyez un partenaire potentiel, un bénéficiaire, un donateur 
                  ou simplement curieux de nos activités, nous serions ravis d'échanger avec vous.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <span className="text-muted-foreground">
                      Réponse sous 48h en moyenne
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Globe className="h-5 w-5 text-accent" />
                    <span className="text-muted-foreground">
                      Disponible en français et en langues locales
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Building className="h-5 w-5 text-primary" />
                    <span className="text-muted-foreground">
                      8 bureaux régionaux à votre service
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-8 shadow-sm border border-border">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="nom" className="block text-sm font-medium text-foreground mb-2">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      id="nom"
                      name="nom"
                      required
                      value={formData.nom}
                      onChange={handleChange}
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
                      value={formData.email}
                      onChange={handleChange}
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
                      value={formData.sujet}
                      onChange={handleChange}
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
                      value={formData.message}
                      onChange={handleChange}
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
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Nos Bureaux Régionaux
              </h2>
              <p className="text-xl text-muted-foreground">
                Une présence de proximité dans 8 régions du Mali
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bureaux.map((bureau, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-border">
                  <div className="flex items-center mb-4">
                    <Building className="h-6 w-6 text-primary mr-3" />
                    <h3 className="text-lg font-semibold text-foreground">{bureau.ville}</h3>
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>{bureau.adresse}</p>
                    <p>{bureau.telephone}</p>
                    <span className="inline-block bg-primary/10 text-primary px-2 py-1 rounded text-xs">
                      {bureau.type}
                    </span>
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
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Horaires d'Ouverture
                </h3>
                <div className="space-y-2 text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Lundi - Jeudi:</span>
                    <span>8h00 - 17h00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Vendredi:</span>
                    <span>8h00 - 12h00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Weekend:</span>
                    <span>Fermé</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-8 shadow-sm border border-border">
                <Globe className="h-8 w-8 text-accent mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Informations Pratiques
                </h3>
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

