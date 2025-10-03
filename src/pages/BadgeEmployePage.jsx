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
/** MM/AAAA (tout en chiffres) */
function formatMonthYearNum(iso) {
  const d = new Date(iso)
  if (isNaN(d)) return iso || '—'
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const yyyy = d.getFullYear()
  return `${mm}/${yyyy}`
}

/** Génère un DataURL de QR pour une valeur donnée */
async function makeQrDataUrl(value, size = 128) {
  // priorité: QRCode (qrcode npm)
  if (window.QRCode?.toDataURL) {
    return await window.QRCode.toDataURL(value, {
      width: size,
      margin: 0,
      errorCorrectionLevel: 'M',
      color: { dark: '#111827', light: '#FFFFFF' },
    })
  }
  // fallback: qrcode-generator
  if (window.qrcode) {
    const qr = window.qrcode(0, 'M')
    qr.addData(value)
    qr.make()
    // scale 4 ~ 128-136px selon moduleCount
    return qr.createDataURL(4)
  }
  return ''
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
    const matricule = sanitizeMatricule(form.matricule)
    if (!qrReady || !qrImgRef.current || !matricule) return

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
        const url = await makeQrDataUrl(JSON.stringify(payload), 128)
        if (url) qrImgRef.current.src = url
      } catch {}
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

  /* ========= Impression dans une fenêtre dédiée (fiable) ========= */
  const handlePrint = async () => {
    if (!qrReady) {
      alert("Le module QR n'est pas encore prêt. Réessayez dans une seconde.")
      return
    }
    const matricule = sanitizeMatricule(form.matricule)
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
    const qrDataUrl =
      qrImgRef.current?.src && qrImgRef.current.src.startsWith('data:image')
        ? qrImgRef.current.src
        : await makeQrDataUrl(JSON.stringify(payload), 128)

    // Dégradé “comme avant” (bleu → vert) : #0ea5e9 → #22c55e
    const GRAD_START = '#0ea5e9'
    const GRAD_END   = '#22c55e'

    const recto = `
      <div class="card">
        <div class="band" style="background: linear-gradient(90deg, ${GRAD_START} 0%, ${GRAD_END} 100%);"></div>
        <div class="content">
          <div class="left">
            <div class="photo">${photoDataUrl ? `<img src="${photoDataUrl}" />` : 'Photo'}</div>
            <img src="${logoAmss}" class="logo" />
          </div>
          <div class="right">
            <div class="name">${displayName || 'Nom Prénom'}</div>
            <div class="role">${form.fonction || 'Fonction'}</div>
            <div class="grid">
              <div><span class="lbl">Département:</span> ${form.departement || '—'}</div>
              <div><span class="lbl">Bureau:</span> ${form.bureau}</div>
              <div><span class="lbl">Embauche:</span> ${formatMonthYearNum(form.dateEmbauche)}</div>
              <div><span class="lbl">Validité:</span> ${formatMonthYearNum(form.dateValidite)}</div>
              <div class="full"><span class="lbl">Email:</span> ${form.email || '—'}</div>
              <div class="full"><span class="lbl">Tél:</span> ${form.telephone || '—'}</div>
              <div class="full"><span class="lbl">Matricule:</span> ${matricule}</div>
            </div>
          </div>
          <!-- Pastille verticale à gauche, plus petite, sans débordement -->
          <div class="tag-vertical">
            <span class="dot"></span> AMSS • Identification
          </div>
        </div>
      </div>
    `

    const verso = `
      <div class="card">
        <div class="band" style="background: linear-gradient(90deg, ${GRAD_END} 0%, ${GRAD_START} 100%);"></div>
        <div class="content verso">
          <div class="header">
            <img src="${logoAmss}" class="logo-small" />
          </div>
          <div class="subtitle">Badge Employé • ${matricule}</div>

          <div class="cols">
            <div class="qr">
              <div class="qr-box">
                ${qrDataUrl ? `<img src="${qrDataUrl}" />` : 'QR'}
              </div>
            </div>
            <div class="contact">
              <div class="contact-lines">
                <div class="strong">Association Malienne pour la Survie au Sahel (AMSS)</div>
                <div>www.ong-amss.org</div>
                <div>+223 20 20 27 28</div>
              </div>
              <div class="hint">En cas de perte, merci de contacter l’AMSS.</div>
            </div>
          </div>
        </div>
      </div>
    `

    const css = `
      @page { margin: 0; }
      * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; box-sizing: border-box; }
      html, body { height: 100%; }
      body { margin: 0; padding: 16px; font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Liberation Sans', sans-serif; background: white; }
      .card {
        width: 336px; height: 212px; position: relative; border: 1px solid #e5e7eb; border-radius: 12px; margin: 0 auto 18px auto;
      }
      .band { position: absolute; left: 0; right: 0; top: 0; height: 40px; border-top-left-radius: 12px; border-top-right-radius: 12px; }
      .content { position: relative; padding: 10px; display: grid; grid-template-columns: 100px 1fr; gap: 10px; height: 100%; }
      .left { display: flex; flex-direction: column; align-items: center; margin-top: 4px; }
      .photo { width: 96px; height: 116px; border: 1px solid #e5e7eb; border-radius: 6px; background: #f3f4f6; display: flex; align-items: center; justify-content: center; font-size: 11px; color: #6b7280; }
      .photo img { width: 100%; height: 100%; object-fit: cover; }
      .logo { height: 84px; margin-top: 4px; }
      .right { padding-top: 2px; }
      .name { font-weight: 700; font-size: 16px; line-height: 1.1; color: #111827; }
      .role { color: #6b7280; font-size: 13px; margin-top: 2px; }
      .grid { margin-top: 6px; display: grid; grid-template-columns: 1fr 1fr; gap: 4px 8px; font-size: 12px; line-height: 1.2; color: #374151; }
      .grid .lbl { font-weight: 600; color: #111827; }
      .grid .full { grid-column: 1 / -1; }

      /* Pastille verticale à gauche : plus petite, lecture bas→haut, sans débordement */
      .tag-vertical {
        position: absolute;
        left: 4px;           /* bien à l’intérieur de la carte */
        top: 36px;           /* “un peu plus haut” */
        writing-mode: vertical-rl;
        transform: rotate(180deg); /* bas → haut */
        font-size: 8px;
        color: #065f46;
        background: #ecfdf5;
        border: 1px solid #a7f3d0;
        border-radius: 6px;
        padding: 2px 4px;
        display: inline-flex;
        align-items: center;
        gap: 4px;
        max-height: 132px;   /* évite tout dépassement */
        pointer-events: none;
      }
      .tag-vertical .dot { width: 6px; height: 6px; background: #10b981; border-radius: 50%; display: inline-block; }

      /* Verso */
      .content.verso { display: block; padding-top: 50px; }
      .header { display: flex; justify-content: center; align-items: center; margin-bottom: 4px; }
      .logo-small { height: 32px; }
      .subtitle { text-align: center; font-size: 12px; color: #6b7280; margin-bottom: 6px; }
      .cols { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; align-items: start; }
      .qr { display: flex; align-items: center; justify-content: center; }
      .qr-box { width: 150px; height: 150px; border: 1px solid #e5e7eb; border-radius: 6px; display: flex; align-items: center; justify-content: center; background: #ffffff; }
      .qr-box img { width: 128px; height: 128px; image-rendering: pixelated; }
      .contact { display: flex; flex-direction: column; align-items: center; text-align: center; padding: 4px; }
      .contact-lines { font-size: 11px; line-height: 1.25; color: #111827; }
      .contact-lines .strong { font-weight: 600; margin-bottom: 2px; }
      .hint { margin-top: 6px; font-size: 10px; color: #6b7280; }

      /* 1 carte par page */
      .card { page-break-after: always; }
      .card:last-child { page-break-after: auto; }
    `

    const html = `
      <!doctype html>
      <html>
      <head>
        <meta charset="utf-8" />
        <title>Badge AMSS – ${matricule}</title>
        <style>${css}</style>
      </head>
      <body>
        ${recto}
        ${verso}
        <script>
          // Attendre le chargement complet (images + QR), puis imprimer et fermer proprement
          function waitImages() {
            const imgs = Array.from(document.images || [])
            if (imgs.length === 0) return Promise.resolve()
            return Promise.all(imgs.map(img => img.complete ? Promise.resolve() : new Promise(res => { img.onload = img.onerror = res })))
          }
          window.addEventListener('load', async () => {
            try { await waitImages() } catch(e) {}
            setTimeout(() => { window.print() }, 100)
          })
          window.addEventListener('afterprint', () => {
            // Donne un petit délai pour éviter tout blocage, puis ferme
            setTimeout(() => { window.close() }, 100)
          })
        </script>
      </body>
      </html>
    `

    const w = window.open('', '_blank', 'width=900,height=700')
    if (!w) return
    w.document.open()
    w.document.write(html)
    w.document.close()
    w.focus()
  }

  const handleDownload = () => handlePrint()

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-10 bg-gradient-to-br from-primary/10 to-accent/10 border-b">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Générateur de Badge Employé</h1>
          <p className="text-muted-foreground mt-2">
            Saisissez les informations, importez une photo et imprimez un badge. Le
            <strong> QR code</strong> au <strong>verso</strong> encode automatiquement les infos du recto.
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

          {/* Vignette d’aperçu (pour repère visuel) */}
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
              {/* Recto preview */}
              <div className="relative mx-auto bg-white rounded-xl border border-border shadow-sm" style={{ width: 336, height: 212 }}>
                <div
                  className="absolute inset-x-0 top-0 h-10 rounded-t-xl"
                  style={{ background: 'linear-gradient(90deg, #0ea5e9 0%, #22c55e 100%)' }}
                />
                <div className="relative h-full p-3 grid grid-cols-[100px_1fr] gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-[96px] h-[116px] rounded-md overflow-hidden border border-border bg-muted">
                      {photoDataUrl ? (
                        <img src={photoDataUrl} alt="Employé" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">Photo</div>
                      )}
                    </div>
                    <img src={logoAmss} alt="AMSS" className="h-20 mt-1" />
                  </div>
                  <div className="flex flex-col">
                    <div className="mt-1">
                      <div className="text-lg font-semibold leading-tight">{displayName || 'Nom Prénom'}</div>
                      <div className="text-sm text-muted-foreground leading-tight">{form.fonction || 'Fonction'}</div>
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-[2px] text-[12px] leading-5">
                      <div className="break-words"><span className="font-medium">Département:</span> {form.departement || '—'}</div>
                      <div className="break-words"><span className="font-medium">Bureau:</span> {form.bureau}</div>
                      <div className="whitespace-nowrap"><span className="font-medium">Embauche:</span> {formatMonthYearNum(form.dateEmbauche)}</div>
                      <div className="whitespace-nowrap"><span className="font-medium">Validité:</span> {formatMonthYearNum(form.dateValidite)}</div>
                      <div className="col-span-2 break-words"><span className="font-medium">Email:</span> {form.email || '—'}</div>
                      <div className="col-span-2 whitespace-nowrap"><span className="font-medium">Tél:</span> {form.telephone || '—'}</div>
                      <div className="col-span-2 whitespace-nowrap"><span className="font-medium">Matricule:</span> {sanitizeMatricule(form.matricule)}</div>
                    </div>

                    {/* pastille verticale (aperçu) */}
                    <div
                      className="inline-flex items-center px-[4px] py-[2px] text-[8px] rounded bg-emerald-50 text-emerald-700 border border-emerald-200"
                      style={{
                        position: 'absolute',
                        left: 4,
                        top: 36,
                        writingMode: 'vertical-rl',
                        transform: 'rotate(180deg)',
                        transformOrigin: 'left top',
                        maxHeight: 132,
                        pointerEvents: 'none'
                      }}
                    >
                      <BadgeCheck className="h-[10px] w-[10px] mr-1" />
                      AMSS • Identification
                    </div>
                  </div>
                </div>
              </div>

              {/* Verso preview */}
              <div className="relative mx-auto bg-white rounded-xl border border-border shadow-sm" style={{ width: 336, height: 212 }}>
                <div
                  className="absolute inset-x-0 top-0 h-10 rounded-t-xl"
                  style={{ background: 'linear-gradient(90deg, #22c55e 0%, #0ea5e9 100%)' }}
                />
                <div className="relative h-full p-3">
                  <div className="flex items-center justify-center mt-1 mb-2">
                    <img src={logoAmss} alt="AMSS" className="h-8" />
                  </div>
                  <div className="text-center text-xs text-muted-foreground mb-1">
                    Badge Employé • {sanitizeMatricule(form.matricule)}
                  </div>

                  <div className="mt-2 grid grid-cols-2 gap-3 items-start">
                    <div className="flex items-center justify-center">
                      <div className="flex items-center justify-center w-[150px] h-[150px] bg-white rounded border border-border">
                        <img ref={qrImgRef} alt="QR du badge" style={{ width: 128, height: 128, imageRendering: 'pixelated' }} />
                      </div>
                    </div>
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
              Conseil : dans la fenêtre d’impression, activez le <strong>recto-verso</strong> (retournement <em>grand bord</em>).
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
