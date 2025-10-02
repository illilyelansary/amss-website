// src/pages/BadgeEmployePage.jsx
import { useEffect, useMemo, useRef, useState } from 'react'
import { Camera, Printer, Download, Hash, User, BadgeCheck, Building2, Briefcase, MapPin, CalendarDays, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import logoAmss from '@/assets/LogoAMSSFHD.png'

/**
 * Charge JsBarcode en UMD depuis un CDN (pas de dépendance à installer).
 * window.JsBarcode sera disponible une fois chargé.
 */
function useJsBarcodeLoader() {
  const [loaded, setLoaded] = useState(!!window.JsBarcode)
  useEffect(() => {
    if (window.JsBarcode) return
    const s = document.createElement('script')
    s.src = 'https://cdn.jsdelivr.net/npm/jsbarcode@3.11.6/dist/JsBarcode.all.min.js'
    s.async = true
    s.onload = () => setLoaded(true)
    document.head.appendChild(s)
    return () => { /* rien */ }
  }, [])
  return loaded || !!window.JsBarcode
}

function sanitizeMatricule(v) {
  return String(v || '').toUpperCase().replace(/\s+/g, '').slice(0, 32)
}

function todayISO() {
  const d = new Date()
  return d.toISOString().slice(0, 10)
}

function addYearsISO(years = 1) {
  const d = new Date()
  d.setFullYear(d.getFullYear() + years)
  return d.toISOString().slice(0, 10)
}

export default function BadgeEmployePage() {
  const jsbReady = useJsBarcodeLoader()
  const barcodeRef = useRef(null)
  const cardRef = useRef(null)

  const [photoDataUrl, setPhotoDataUrl] = useState('')
  const [form, setForm] = useState({
    nom: '',
    prenom: '',
    fonction: '',
    departement: '',
    bureau: 'Tombouctou',
    telephone: '',
    dateEmbauche: todayISO(),
    dateValidite: addYearsISO(3),
    matricule: `AMSS-${new Date().getFullYear()}-${String(Math.floor(Math.random()*9999)).padStart(4,'0')}`,
  })

  const displayName = useMemo(() => {
    const p = form.prenom?.trim()
    const n = form.nom?.trim()
    return [p, n].filter(Boolean).join(' ')
  }, [form.prenom, form.nom])

  // Génère/MAJ le code-barres dans <svg ref={barcodeRef}/>
  useEffect(() => {
    if (!jsbReady || !barcodeRef.current) return
    const value = sanitizeMatricule(form.matricule)
    if (!value) return
    try {
      // eslint-disable-next-line no-undef
      window.JsBarcode(barcodeRef.current, value, {
        format: 'CODE128',
        displayValue: true,
        fontSize: 12,
        lineColor: '#111827', // slate-900
        width: 2,
        height: 50,
        margin: 0,
      })
    } catch (e) {
      // noop
    }
  }, [jsbReady, form.matricule])

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const onPhoto = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setPhotoDataUrl(reader.result)
    reader.readAsDataURL(file)
  }

  const handlePrint = () => {
    window.print()
  }

  const handleDownloadPNG = async () => {
    // Export PNG sans lib externe: on ouvre une fenêtre "imprimer" dédiée à la carte.
    // Pour un PNG réel, vous pourriez ajouter html-to-image plus tard.
    handlePrint()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Styles d’impression : on n’imprime QUE le badge */}
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          #badge-print, #badge-print * { visibility: visible !important; }
          #badge-print { position: fixed; inset: 0; margin: auto; }
        }
      `}</style>

      {/* Hero */}
      <section className="py-10 bg-gradient-to-br from-primary/10 to-accent/10 border-b">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Générateur de Badge Employé</h1>
          <p className="text-muted-foreground mt-2">
            Saisissez les informations, importez une photo et imprimez un badge au format carte avec code-barres.
          </p>
        </div>
      </section>

      <section className="py-10">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl">
          {/* Formulaire */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
            <h2 className="text-lg font-semibold mb-4">Informations employé</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1"><User className="inline h-4 w-4 mr-1" />Prénom</label>
                <input name="prenom" value={form.prenom} onChange={onChange}
                  className="w-full px-3 py-2 border border-border rounded-md" placeholder="Ex. Aïcha" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1"><User className="inline h-4 w-4 mr-1" />Nom</label>
                <input name="nom" value={form.nom} onChange={onChange}
                  className="w-full px-3 py-2 border border-border rounded-md" placeholder="Ex. Traoré" />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium mb-1"><Briefcase className="inline h-4 w-4 mr-1" />Fonction</label>
                <input name="fonction" value={form.fonction} onChange={onChange}
                  className="w-full px-3 py-2 border border-border rounded-md" placeholder="Ex. Chargée de projet WASH" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1"><Building2 className="inline h-4 w-4 mr-1" />Département</label>
                <input name="departement" value={form.departement} onChange={onChange}
                  className="w-full px-3 py-2 border border-border rounded-md" placeholder="Ex. Programmes" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1"><MapPin className="inline h-4 w-4 mr-1" />Bureau</label>
                <select name="bureau" value={form.bureau} onChange={onChange}
                  className="w-full px-3 py-2 border border-border rounded-md bg-white">
                  {['Tombouctou','Gao','Ménaka','Mopti','Ségou','Sikasso','Bamako','Taoudénit'].map(v=>(
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1"><CalendarDays className="inline h-4 w-4 mr-1" />Date d’embauche</label>
                <input type="date" name="dateEmbauche" value={form.dateEmbauche} onChange={onChange}
                  className="w-full px-3 py-2 border border-border rounded-md" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1"><CalendarDays className="inline h-4 w-4 mr-1" />Valide jusqu’au</label>
                <input type="date" name="dateValidite" value={form.dateValidite} onChange={onChange}
                  className="w-full px-3 py-2 border border-border rounded-md" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1"><Phone className="inline h-4 w-4 mr-1" />Téléphone (optionnel)</label>
                <input name="telephone" value={form.telephone} onChange={onChange}
                  className="w-full px-3 py-2 border border-border rounded-md" placeholder="+223 ..." />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1"><Hash className="inline h-4 w-4 mr-1" />Matricule</label>
                <input name="matricule" value={form.matricule} onChange={(e)=>setForm(f=>({...f, matricule: sanitizeMatricule(e.target.value)}))}
                  className="w-full px-3 py-2 border border-border rounded-md" placeholder="AMSS-2025-0001" />
                <p className="text-xs text-muted-foreground mt-1">Servira pour le code-barres (espaces supprimés).</p>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium mb-1"><Camera className="inline h-4 w-4 mr-1" />Photo</label>
                <input type="file" accept="image/*" onChange={onPhoto} className="block w-full text-sm" />
                <p className="text-xs text-muted-foreground mt-1">Utilisez une photo cadrée (buste), fond neutre si possible.</p>
              </div>
            </div>
          </div>

          {/* Aperçu Badge */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">Aperçu du badge</h2>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleDownloadPNG}>
                  <Download className="h-4 w-4 mr-2" /> Télécharger / Imprimer
                </Button>
                <Button onClick={handlePrint}>
                  <Printer className="h-4 w-4 mr-2" /> Imprimer
                </Button>
              </div>
            </div>

            {/* Carte (ratio type carte bancaire) */}
            <div
              id="badge-print"
              ref={cardRef}
              className="relative mx-auto bg-white rounded-xl border border-border shadow-sm"
              style={{ width: 336, height: 212 }} // ~85.6x54mm @ ~4 px/mm
            >
              {/* Bande supérieure */}
              <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-r from-primary to-accent rounded-t-xl" />
              <div className="relative h-full p-3 grid grid-cols-[84px_1fr] gap-3">
                {/* Photo */}
                <div className="flex flex-col items-center">
                  <div className="w-[84px] h-[104px] rounded-md overflow-hidden border border-border bg-muted">
                    {photoDataUrl ? (
                      <img src={photoDataUrl} alt="Employé" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                        Photo
                      </div>
                    )}
                  </div>
                  <img src={logoAmss} alt="AMSS" className="h-6 mt-2" />
                </div>

                {/* Infos */}
                <div className="flex flex-col">
                  <div className="mt-1">
                    <div className="text-base font-semibold leading-tight">{displayName || 'Nom Prénom'}</div>
                    <div className="text-xs text-muted-foreground leading-tight">{form.fonction || 'Fonction'}</div>
                  </div>

                  <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1 text-[11px]">
                    <div><span className="font-medium">Dept:</span> {form.departement || '—'}</div>
                    <div><span className="font-medium">Bureau:</span> {form.bureau}</div>
                    <div><span className="font-medium">Embauche:</span> {form.dateEmbauche}</div>
                    <div><span className="font-medium">Valide:</span> {form.dateValidite}</div>
                    {form.telephone ? <div className="col-span-2"><span className="font-medium">Tél:</span> {form.telephone}</div> : null}
                    <div className="col-span-2"><span className="font-medium">Matricule:</span> {sanitizeMatricule(form.matricule)}</div>
                  </div>

                  {/* Code-barres */}
                  <div className="mt-auto">
                    <svg ref={barcodeRef} className="w-full" role="img" aria-label="Code-barres du matricule" />
                  </div>

                  {/* Sceau validation */}
                  <div className="absolute right-2 bottom-2 inline-flex items-center text-[10px] px-2 py-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <BadgeCheck className="h-3 w-3 mr-1" /> AMSS • Identification
                  </div>
                </div>
              </div>
            </div>

            <p className="text-xs text-muted-foreground mt-3">
              Astuce : choisissez **Imprimer** puis “Enregistrer en PDF” pour générer un fichier.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
