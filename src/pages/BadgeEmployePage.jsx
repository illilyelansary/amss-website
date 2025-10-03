// src/pages/BadgeEmployePage.jsx
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Camera, Printer, Download, Hash, User, BadgeCheck,
  Building2, Briefcase, MapPin, CalendarDays, Phone, Mail
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import logoAmss from '@/assets/LogoAMSSFHD.png'

/* ========= Chargeurs QR via CDN =========
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
/** MM/AAAA (chiffres) */
function formatMonthYearNum(iso) {
  const d = new Date(iso)
  if (isNaN(d)) return iso || '—'
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const yyyy = d.getFullYear()
  return `${mm}/${yyyy}`
}
async function makeQrDataUrl(value, size = 110) {
  if (window.QRCode?.toDataURL) {
    return await window.QRCode.toDataURL(value, {
      width: size,
      margin: 0,
      errorCorrectionLevel: 'M',
      color: { dark: '#111827', light: '#FFFFFF' },
    })
  }
  if (window.qrcode) {
    const qr = window.qrcode(0, 'M')
    qr.addData(value)
    qr.make()
    return qr.createDataURL(3.5) // ~110px
  }
  return ''
}

/* ===================================================== */

export default function BadgeEmployePage() {
  const qrReady = useQrLoaders()

  const [photoDataUrl, setPhotoDataUrl] = useState('')
  const [qrDataUrl, setQrDataUrl] = useState('') // ✅ DataURL unique pour tous les rendus
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

  /* ===== Génération QR (verso) – 1 seule DataURL ===== */
  useEffect(() => {
    const matricule = sanitizeMatricule(form.matricule)
    if (!qrReady || !matricule) return

    const payload = {
      type: 'AMSS_EMPLOYE',
      matricule,
      nom: form.nom || '',
      prenom: form.prenom || '',
      fonction: form.fonction || '',
      departement: form.departement || '',
      bureau: form.bureau || '',
      email: form.email || '',
      telephone: form.telephone || '',
      dateEmbauche: formatMonthYearNum(form.dateEmbauche),
      dateValidite: formatMonthYearNum(form.dateValidite),
    }

    ;(async () => {
      try {
        const url = await makeQrDataUrl(JSON.stringify(payload), 110)
        if (url) setQrDataUrl(url)
      } catch (e) {
        // ignore
      }
    })()
  }, [qrReady, form])

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
  const handleDownload = () => window.print()

  // Couleurs charte (marron foncé dégradé)
  const BROWN_START = '#5C3A21'
  const BROWN_END   = '#B07B4C'

  /* ======================== Composants de carte ======================== */
  const Recto = ({ forPrint = false }) => (
    <div
      className="relative mx-auto bg-white rounded-xl border border-border shadow-sm overflow-hidden"
      style={{ width: 336, height: 212 }}
    >
      {/* Bande supérieure (dégradé) */}
      <div
        className="absolute inset-x-0 top-0 h-10 rounded-t-xl"
        style={{ background: `linear-gradient(90deg, ${BROWN_START} 0%, ${BROWN_END} 100%)` }}
      />
      <div className="relative h-full p-[10px] grid grid-cols-[98px_1fr] gap-2">
        {/* Colonne photo + logo (logo agrandi) */}
        <div className="flex flex-col items-center">
          <div className="w-[94px] h-[114px] rounded-md overflow-hidden border border-border bg-muted">
            {photoDataUrl ? (
              <img src={photoDataUrl} alt="Employé" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">Photo</div>
            )}
          </div>
          <img src={logoAmss} alt="AMSS" className="h-[82px] mt-[2px]" />
        </div>

        {/* Infos */}
        <div className="flex flex-col">
          <div className="mt-0.5">
            <div className="text-[15px] font-semibold leading-tight">{displayName || 'Nom Prénom'}</div>
            <div className="text-[12px] text-muted-foreground leading-tight">{form.fonction || 'Fonction'}</div>
          </div>

          {/* Grille infos – dates au format MM/AAAA, labels entiers */}
          <div className="mt-1.5 grid grid-cols-2 gap-x-2 gap-y-1 text-[11px] leading-[1.2] text-foreground/90">
            <div className="break-words">
              <span className="font-medium text-foreground">Département:</span> {form.departement || '—'}
            </div>
            <div className="break-words">
              <span className="font-medium text-foreground">Bureau:</span> {form.bureau}
            </div>
            <div className="whitespace-nowrap">
              <span className="font-medium text-foreground">Embauche:</span> {formatMonthYearNum(form.dateEmbauche)}
            </div>
            <div className="whitespace-nowrap">
              <span className="font-medium text-foreground">Validité:</span> {formatMonthYearNum(form.dateValidite)}
            </div>
            <div className="col-span-2 break-words">
              <span className="font-medium text-foreground">Email:</span> {form.email || '—'}
            </div>
            <div className="col-span-2 whitespace-nowrap">
              <span className="font-medium text-foreground">Tél:</span> {form.telephone || '—'}
            </div>
            <div className="col-span-2 whitespace-nowrap">
              <span className="font-medium text-foreground">Matricule:</span> {sanitizeMatricule(form.matricule)}
            </div>
          </div>
        </div>

        {/* ✅ Pastille verticale à gauche, compacte, jamais débordante */}
        <div
          className="inline-flex items-center px-[3px] py-[2px] text-[7.5px] rounded border absolute"
          style={{
            borderColor: '#a7f3d0',
            background: '#ecfdf5',
            color: '#065f46',
            position: 'absolute',
            left: 2,
            top: 44,                           // un peu plus haut
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            transformOrigin: 'left top',
            maxHeight: 110,
            overflow: 'hidden',
            pointerEvents: 'none',
          }}
        >
          <span
            className="inline-block rounded-full mr-1"
            style={{ width: 5, height: 5, background: '#10b981' }}
          />
          AMSS • Identification
        </div>
      </div>
    </div>
  )

  const Verso = ({ forPrint = false }) => (
    <div
      className="relative mx-auto bg-white rounded-xl border border-border shadow-sm overflow-hidden"
      style={{ width: 336, height: 212 }}
    >
      {/* Bande supérieure (dégradé inverse) */}
      <div
        className="absolute inset-x-0 top-0 h-10 rounded-t-xl"
        style={{ background: `linear-gradient(90deg, ${BROWN_END} 0%, ${BROWN_START} 100%)` }}
      />
      <div className="relative h-full p-[10px] pt-[46px]">
        <div className="flex items-center justify-center mb-1">
          <img src={logoAmss} alt="AMSS" className="h-[30px]" />
        </div>
        <div className="text-center text-[11px] text-muted-foreground mb-1">
          Badge Employé • {sanitizeMatricule(form.matricule)}
        </div>

        {/* Deux colonnes : QR + contact */}
        <div className="grid grid-cols-2 gap-2 items-start">
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center w-[136px] h-[136px] bg-white rounded border border-border overflow-hidden">
              {qrDataUrl ? (
                <img
                  src={qrDataUrl}
                  alt="QR du badge"
                  style={{ width: 110, height: 110, imageRendering: 'pixelated', display: 'block' }}
                />
              ) : (
                <div className="text-[10px] text-muted-foreground">QR en préparation…</div>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center text-center px-1">
            <div className="text-[10.5px] leading-[1.25] text-foreground">
              <div className="font-semibold">Association Malienne pour la Survie au Sahel (AMSS)</div>
              <div>www.ong-amss.org</div>
              <div>+223 20 20 27 28</div>
            </div>
            <div className="mt-1.5 text-[9.5px] text-muted-foreground">
              En cas de perte, merci de contacter l’AMSS.
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* RÈGLES D’IMPRESSION : ne garder que #badge-print */}
      <style>{`
        @media print {
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          body * { visibility: hidden !important; }
          #badge-print, #badge-print * { visibility: visible !important; }
          #badge-print { position: fixed; inset: 0; margin: 0 auto; padding: 12px; background: white; }
          .print-card { page-break-after: always; }
          .print-card:last-child { page-break-after: auto; }
        }
      `}</style>

      {/* Zone d’impression dédiée (cachée à l’écran) */}
      <div id="badge-print" className="hidden print:block">
        <div className="print-card"><Recto forPrint /></div>
        <div className="print-card"><Verso forPrint /></div>
      </div>

      {/* Hero */}
      <section className="py-10 bg-gradient-to-br from-[#5C3A21]/10 to-[#B07B4C]/10 border-b">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Générateur de Badge Employé</h1>
          <p className="text-muted-foreground mt-2">
            Saisissez les informations, importez une photo et imprimez. Le <strong>QR code</strong> au <strong>verso</strong> encode automatiquement les infos du recto.
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

          {/* Aperçu écran */}
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Recto />
              <Verso />
            </div>

            <p className="text-xs text-muted-foreground mt-3">
              Conseil : dans la fenêtre d’impression, activez le <strong>recto-verso</strong> (retournement <em>grand bord</em>).<br />
              Si le dégradé n’apparaît pas, activez “imprimer les arrière-plans” dans les options d’impression de votre navigateur.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
