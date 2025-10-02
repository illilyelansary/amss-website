// src/pages/BadgeEmployePage.jsx
import { useEffect, useMemo, useRef, useState } from 'react'
import { Camera, Printer, Download, Hash, User, Building2, Briefcase, MapPin, CalendarDays, Phone, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import logoAmss from '@/assets/LogoAMSSFHD.png'

/* ========= Chargement libs QR via CDN (aucune install) =========
   1) qrcode (QRCode.*) – priorité
   2) qrcode-generator (qrcode()) – fallback
*/
function useQrLoaders() {
  const [ready, setReady] = useState(!!window.QRCode || !!window.qrcode)

  useEffect(() => {
    if (window.QRCode || window.qrcode) return

    const s1 = document.createElement('script')
    s1.src = 'https://cdn.jsdelivr.net/npm/qrcode@1.5.3/build/qrcode.min.js'
    s1.async = true
    s1.onload = () => setReady(true)
    document.head.appendChild(s1)

    const s2 = document.createElement('script')
    s2.src = 'https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.min.js'
    s2.async = true
    s2.onload = () => setReady(true)
    document.head.appendChild(s2)
  }, [])

  return ready || !!window.QRCode || !!window.qrcode
}

/* ====================== Helpers ====================== */
function sanitizeMatricule(v) {
  return String(v || '').toUpperCase().replace(/\s+/g, '').slice(0, 32)
}
function todayISO() {
  const d = new Date()
  return d.toISOString().slice(0, 10)
}
function addYearsISO(years = 3) {
  const d = new Date()
  d.setFullYear(d.getFullYear() + years)
  return d.toISOString().slice(0, 10)
}
/** MM/AAAA (tout en chiffres) */
function formatMonthYearNum(iso) {
  const d = new Date(iso)
  if (isNaN(d)) return iso || '—'
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const yyyy = d.getFullYear()
  return `${mm}/${yyyy}`
}

/** Construit une vCard 3.0 avec les infos du recto */
function buildQrVCard(form, displayName) {
  const nLast = (form.nom || '').replace(/\r?\n/g, ' ').trim()
  const nFirst = (form.prenom || '').replace(/\r?\n/g, ' ').trim()
  const fn = (displayName || ' ').replace(/\r?\n/g, ' ').trim()
  const title = (form.fonction || '').replace(/\r?\n/g, ' ').trim()
  const email = (form.email || '').trim()
  const tel = (form.telephone || '').trim()
  const dept = (form.departement || '').replace(/\r?\n/g, ' ').trim()
  const bureau = (form.bureau || '').replace(/\r?\n/g, ' ').trim()
  const emb = formatMonthYearNum(form.dateEmbauche)
  const val = formatMonthYearNum(form.dateValidite)
  const mat = sanitizeMatricule(form.matricule)

  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${nLast};${nFirst};;;`,
    `FN:${fn}`,
    'ORG:Association Malienne pour la Survie au Sahel (AMSS)',
    title ? `TITLE:${title}` : null,
    email ? `EMAIL:${email}` : null,
    tel ? `TEL:${tel}` : null,
    `NOTE:Département=${dept || '—'}; Bureau=${bureau || '—'}; Embauche=${emb}; Validité=${val}; Matricule=${mat}`,
    'END:VCARD',
  ].filter(Boolean)

  return lines.join('\n')
}

export default function BadgeEmployePage() {
  const qrReady = useQrLoaders()
  const qrImgRef = useRef(null)

  const [photoDataUrl, setPhotoDataUrl] = useState('')
  const [form, setForm] = useState({
    nom: '',
    prenom: '',
    email: '',
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

  /* ===== Génération QR (verso) ===== */
  useEffect(() => {
    const value = buildQrVCard(form, displayName)
    if (!qrReady || !qrImgRef.current || !value) return

    const drawWithQRCode = async () => {
      try {
        if (window.QRCode?.toDataURL) {
          const url = await window.QRCode.toDataURL(value, {
            width: 120,
            margin: 0,
            errorCorrectionLevel: 'M',
            color: { dark: '#111827', light: '#FFFFFF' },
          })
          qrImgRef.current.src = url
          return true
        }
      } catch {}
      return false
    }

    const drawWithQrcodeGen = () => {
      try {
        if (window.qrcode) {
          const qr = window.qrcode(0, 'M')
          qr.addData(value)
          qr.make()
          const dataUrl = qr.createDataURL(3) // ~105px
          qrImgRef.current.src = dataUrl
          return true
        }
      } catch {}
      return false
    }

    ;(async () => {
      const ok1 = await drawWithQRCode()
      if (!ok1) drawWithQrcodeGen()
    })()
  }, [qrReady, form, displayName])

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

  const handlePrint = () => window.print()
  const handleDownload = () => window.print() // impression => PDF

  return (
    <div className="min-h-screen bg-background">
      {/* Impression : on ne sort que les deux cartes (recto puis verso) */}
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          #badge-print, #badge-print * { visibility: visible !important; }
          #badge-print { position: fixed; inset: 0; margin: 0 auto; }
          .print-card { page-break-after: always; }
          .print-card:last-child { page-break-after: auto; }
        }
      `}</style>

      {/* Hero */}
      <section className="py-10 bg-gradient-to-br from-primary/10 to-accent/10 border-b">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Générateur de Badge Employé</h1>
          <p className="text-muted-foreground mt-2">
            Saisissez les informations, importez une photo et imprimez un badge au format carte. 
            Le <strong>QR code</strong> est au <strong>verso</strong> (sans code-barres).
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
                <label className="block text-sm font-medium mb-1"><Mail className="inline h-4 w-4 mr-1" />Email</label>
                <input type="email" name="email" value={form.email} onChange={onChange}
                  className="w-full px-3 py-2 border border-border rounded-md" placeholder="prenom.nom@ong-amss.org" />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium mb-1"><Briefcase className="inline h-4 w-4 mr-1" />Fonction</label>
                <input name="fonction" value={form.fonction} onChange={onChange}
                  className="w-full px-3 py-2 border border-border rounded-md" placeholder="Ex. Chargée de projet WASH" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1"><Building2 className="inline h-4 w-4 mr-1" />Département</label>
                <input name="departement" value={form.departement} onChange={onChange}
                  className="w-full px-3 py-2 border border-border rounded-md" placeholder="Ex. Direction des Programmes" />
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
                <p className="text-xs text-muted-foreground mt-1">Servira dans le QR code (espaces supprimés).</p>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium mb-1"><Camera className="inline h-4 w-4 mr-1" />Photo</label>
                <input type="file" accept="image/*" onChange={onPhoto} className="block w-full text-sm" />
                <p className="text-xs text-muted-foreground mt-1">Photo cadrée (buste), fond neutre si possible.</p>
              </div>
            </div>
          </div>

          {/* Aperçu Recto + Verso */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">Aperçu du badge</h2>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleDownload}>
                  <Download className="h-4 w-4 mr-2" /> Télécharger / Imprimer
                </Button>
                <Button onClick={handlePrint}>
                  <Printer className="h-4 w-4 mr-2" /> Imprimer
                </Button>
              </div>
            </div>

            {/* Aperçu côte à côte à l’écran, 2 pages à l’impression */}
            <div id="badge-print" className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* ====== RECTO ====== */}
              <div
                className="print-card relative mx-auto bg-white rounded-xl border border-border shadow-sm"
                style={{ width: 336, height: 212 }}
              >
                {/* Pastille verticale côté droit (lecture bas->haut) */}
                <div className="absolute right-1 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                  <div
                    className="px-1 py-[2px] rounded border border-emerald-200 bg-emerald-50 text-emerald-700 font-medium tracking-tight"
                    style={{ fontSize: '8px', writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                  >
                    AMSS • Identification
                  </div>
                </div>

                {/* Bande supérieure */}
                <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-r from-primary to-accent rounded-t-xl" />
                <div className="relative h-full p-3 grid grid-cols-[96px_1fr] gap-3">
                  {/* Photo + logo (agrandi) */}
                  <div className="flex flex-col items-center">
                    <div className="w-[96px] h-[116px] rounded-md overflow-hidden border border-border bg-muted">
                      {photoDataUrl ? (
                        <img src={photoDataUrl} alt="Employé" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                          Photo
                        </div>
                      )}
                    </div>
                    <img src={logoAmss} alt="AMSS" className="h-20 mt-1" />
                  </div>

                  {/* Infos */}
                  <div className="flex flex-col">
                    <div className="mt-1">
                      <div className="text-lg font-semibold leading-tight">{displayName || 'Nom Prénom'}</div>
                      <div className="text-sm text-muted-foreground leading-tight">{form.fonction || 'Fonction'}</div>
                    </div>

                    {/* Bloc infos : dates MM/AAAA ; labels complets */}
                    <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-[2px] text-[12px] leading-5">
                      <div className="break-words">
                        <span className="font-medium">Département:</span> {form.departement || '—'}
                      </div>
                      <div className="break-words">
                        <span className="font-medium">Bureau:</span> {form.bureau}
                      </div>
                      <div className="whitespace-nowrap">
                        <span className="font-medium">Embauche:</span> {formatMonthYearNum(form.dateEmbauche)}
                      </div>
                      <div className="whitespace-nowrap">
                        <span className="font-medium">Validité:</span> {formatMonthYearNum(form.dateValidite)}
                      </div>
                      <div className="col-span-2 break-words">
                        <span className="font-medium">Email:</span> {form.email || '—'}
                      </div>
                      <div className="col-span-2 whitespace-nowrap">
                        <span className="font-medium">Tél:</span> {form.telephone || '—'}
                      </div>
                      <div className="col-span-2 whitespace-nowrap">
                        <span className="font-medium">Matricule:</span> {sanitizeMatricule(form.matricule)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ====== VERSO ====== */}
              <div
                className="print-card relative mx-auto bg-white rounded-xl border border-border shadow-sm"
                style={{ width: 336, height: 212 }}
              >
                {/* Bande supérieure */}
                <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-r from-accent to-primary rounded-t-xl" />
                <div className="relative h-full p-3">
                  {/* En-tête */}
                  <div className="flex items-center justify-center mt-1 mb-2">
                    <img src={logoAmss} alt="AMSS" className="h-10" />
                  </div>
                  <div className="text-center text-xs text-muted-foreground mb-1">
                    Badge Employé • {sanitizeMatricule(form.matricule)}
                  </div>

                  {/* Deux colonnes: QR à gauche, contacts à droite */}
                  <div className="mt-2 grid grid-cols-2 gap-3 items-start">
                    {/* Colonne QR */}
                    <div className="flex items-center justify-center">
                      <div className="flex items-center justify-center w-[130px] h-[130px] bg-white rounded border border-border">
                        <img
                          ref={qrImgRef}
                          alt="QR du badge"
                          className="block"
                          style={{ width: 120, height: 120, imageRendering: 'pixelated' }}
                        />
                      </div>
                    </div>

                    {/* Colonne Contact (texte seul) */}
                    <div className="flex flex-col items-center text-center px-1">
                      <div className="text-[11px] leading-tight">
                        <div className="font-medium">Association Malienne pour la Survie au Sahel (AMSS)</div>
                        <div>www.ong-amss.org</div>
                        <div>+223 20 20 27 28</div>
                      </div>
                      <div className="mt-2 text-[10px] text-muted-foreground">
                        En cas de perte, merci de contacter l’AMSS.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-xs text-muted-foreground mt-3">
              Astuce : dans la boîte de dialogue d’impression, activez le <strong>recto-verso</strong> (retournement <em>grand bord</em>)
              pour aligner recto et verso.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
