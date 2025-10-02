#!/usr/bin/env node
/**
 * Migration Cartographie AMSS -> src/data/projetsData.js + analytics JSON
 * - Lit un fichier .xlsx
 * - Normalise DOMAINES / REGIONS / DONORS
 * - Supprime PONAH
 * - Sépare en projetsEnCours / projetsTermines
 * - Génère aussi src/data/projetsAnalytics.json (agrégats)
 *
 * Usage:
 *   node scripts/migrate-projets.js "Cartographie_Projets_AMSS.xlsx" "src/data/projetsData.js"
 */

import fs from "fs";
import path from "path";
import * as XLSX from "xlsx";

/* =========================
 * 1) Taxonomie domaines (canon)
 * ========================= */
const DOMAIN_CANON_ORDER = [
  "Éducation",
  "Santé & Nutrition",
  "WASH",
  "Protection & VBG",
  "Gouvernance & Paix",
  "Cohésion sociale & Culture",
  "Sécurité alimentaire & Moyens d’existence",
  "Environnement & GRN",
  "Urgence",
  "Renforcement de capacités & Technologie",
  "Résilience"
];

const _norm = (s) =>
  String(s || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

const DOMAIN_SYNONYMS = {
  // Éducation
  "education": "Éducation",
  "éducation": "Éducation",
  "cours de rattrapage": "Éducation",
  "padem": "Éducation",

  // Santé & Nutrition
  "sante": "Santé & Nutrition",
  "santé": "Santé & Nutrition",
  "ssr": "Santé & Nutrition",
  "sante sexuelle et reproductive": "Santé & Nutrition",
  "santé sexuelle et reproductive": "Santé & Nutrition",
  "nutrition": "Santé & Nutrition",

  // WASH
  "wash": "WASH",
  "eau": "WASH",
  "assainissement": "WASH",
  "hygiène": "WASH",
  "hygiene": "WASH",

  // Protection & VBG
  "protection": "Protection & VBG",
  "vbg": "Protection & VBG",
  "lutte antimines": "Protection & VBG",
  "eei": "Protection & VBG",
  "mine": "Protection & VBG",
  "mines": "Protection & VBG",

  // Gouvernance & Paix
  "gouvernance": "Gouvernance & Paix",
  "paix": "Gouvernance & Paix",
  "citoyennete": "Gouvernance & Paix",
  "citoyenneté": "Gouvernance & Paix",
  "justice": "Gouvernance & Paix",

  // Cohésion sociale & Culture
  "cohesion sociale": "Cohésion sociale & Culture",
  "cohésion sociale": "Cohésion sociale & Culture",
  "culture": "Cohésion sociale & Culture",
  "sport": "Cohésion sociale & Culture",

  // Sécurité alimentaire & Moyens d’existence
  "securite alimentaire": "Sécurité alimentaire & Moyens d’existence",
  "sécurité alimentaire": "Sécurité alimentaire & Moyens d’existence",
  "relance economique": "Sécurité alimentaire & Moyens d’existence",
  "relance économique": "Sécurité alimentaire & Moyens d’existence",
  "employabilite": "Sécurité alimentaire & Moyens d’existence",
  "employabilité": "Sécurité alimentaire & Moyens d’existence",
  "microfinance": "Sécurité alimentaire & Moyens d’existence",
  "moyens de subsistance": "Sécurité alimentaire & Moyens d’existence",
  "moyens d’existence": "Sécurité alimentaire & Moyens d’existence",

  // Environnement & GRN
  "environnement": "Environnement & GRN",
  "grn": "Environnement & GRN",
  "gestion des ressources naturelles": "Environnement & GRN",

  // Urgence
  "urgence": "Urgence",
  "assistance d’urgence": "Urgence",
  "assistance d'urgence": "Urgence",
  "rrm": "Urgence",

  // Renforcement de capacités & Technologie
  "renforcement de capacites": "Renforcement de capacités & Technologie",
  "renforcement de capacités": "Renforcement de capacités & Technologie",
  "capacites": "Renforcement de capacités & Technologie",
  "capacités": "Renforcement de capacités & Technologie",
  "technologie": "Renforcement de capacités & Technologie",
  "ict": "Renforcement de capacités & Technologie",

  // Résilience
  "resilience": "Résilience",
  "résilience": "Résilience"
};

function mapTokenToCanon(token) {
  const n = _norm(token);
  if (!n) return null;
  if (DOMAIN_SYNONYMS[n]) return DOMAIN_SYNONYMS[n];

  // heuristiques
  if (n.includes("education") || n.includes("éducation") || n.includes("ecole")) return "Éducation";
  if (n.includes("sante") || n.includes("santé") || n.includes("ssr") || n.includes("nutrition")) return "Santé & Nutrition";
  if (n.includes("wash") || n.includes("eau") || n.includes("hyg") || n.includes("assain")) return "WASH";
  if (n.includes("vbg") || n.includes("protection") || n.includes("eei") || n.includes("mine")) return "Protection & VBG";
  if (n.includes("gouvernance") || n.includes("paix") || n.includes("justice") || n.includes("citoyen")) return "Gouvernance & Paix";
  if (n.includes("cohesion") || n.includes("cohésion") || n.includes("culture") || n.includes("sport")) return "Cohésion sociale & Culture";
  if (n.includes("securite alimentaire") || n.includes("sécurité alimentaire") || n.includes("microfinance") || n.includes("employab") || n.includes("relance")) return "Sécurité alimentaire & Moyens d’existence";
  if (n.includes("environnement") || n.includes("grn") || n.includes("ressources naturelles")) return "Environnement & GRN";
  if (n.includes("urgence") || n.includes("rrm")) return "Urgence";
  if (n.includes("renforcement") || n.includes("capac") || n.includes("techno") || n.includes("ict")) return "Renforcement de capacités & Technologie";
  if (n.includes("resilience") || n.includes("résilience")) return "Résilience";
  return null;
}

function canonicalizeDomainString(domainStr) {
  if (!domainStr) return "";
  const tokens = String(domainStr)
    .split(/[;,/|]/)
    .map(s => s.trim())
    .filter(Boolean);

  const canonSet = new Set();
  tokens.forEach(tok => {
    const mapped = mapTokenToCanon(tok);
    if (mapped) canonSet.add(mapped);
  });

  const canonArr = Array.from(canonSet);
  canonArr.sort((a, b) => DOMAIN_CANON_ORDER.indexOf(a) - DOMAIN_CANON_ORDER.indexOf(b));
  return canonArr.join(", ");
}

/* =========================
 * 2) Normalisation des régions (alias -> région canonique)
 * ========================= */
const REGIONS_CANON = [
  { key: "tombouctou", label: "Tombouctou" },
  { key: "taoudenni", label: "Taoudénit" },
  { key: "gao", label: "Gao" },
  { key: "menaka", label: "Ménaka" },
  { key: "kidal", label: "Kidal" },
  { key: "mopti", label: "Mopti" },
  { key: "segou", label: "Ségou" },
  { key: "sikasso", label: "Sikasso" },
  // zones hors affichage principal mais utiles si présents dans les données
  { key: "koulikoro", label: "Koulikoro" },
  { key: "bamako", label: "Bamako" }
];

const REGION_ALIAS = {
  tombouctou: [
    "tt","tombouctou","timbuktu","tombo","goundam","dire","diré","niafunke","niafunké","gourma-rharous","rharous"
  ],
  taoudenni: [
    "taoudenni","taoudéni","taoudenit","taoudénit","taoudeni","taoudent",
    "achouratt","achaourat","araouane","arawane","boujbeha","al-ourche","al ourche"
  ],
  gao: ["gao","ansongo","bourem","gounzoureye","gounzourèye","soni aliber","soni ali ber"],
  menaka: ["menaka","ménaka","mnk","ander","inekar","tidermene","assakaray","zeugarat","zeguerat"],
  kidal: ["kidal","tessalit","anefif","abeibara","aguelhoc","agalhoc"],
  mopti: [
    "mopti","bandiagara","bankass","koro","douentza","djenne","djenné","tenenkou","ténenkou",
    "youwarou","sofara","kani-bonzon","boré","bore"
  ],
  segou: [
    "segou","ségou","san","bla","baroueli","barouéli","macina","niono","tominian","markala","fangasso",
    "sebougou","sébougou","pelengana","sakoiba","cinzana","konodimini","konobougou","sansanding",
    "dioro","kalake","kalaké","tesséréla","tésséréla","boidie","boidié"
  ],
  sikasso: ["sikasso","koutiala","bougouni","kignan","niena","niéna","klela","kléla","lobougoula","missirikoro"],
  koulikoro: ["koulikoro","mountougoula"],
  bamako: ["bamako"]
};

const REGION_ORDER = REGIONS_CANON.map(r => r.label);

function tokenToRegion(token) {
  const n = _norm(token);
  if (!n) return null;
  for (const [key, list] of Object.entries(REGION_ALIAS)) {
    if (list.includes(n)) {
      const found = REGIONS_CANON.find(r => r.key === key);
      return found ? found.label : null;
    }
  }
  return null;
}

function canonicalizeRegionString(regionStr) {
  if (!regionStr) return "N/D";
  // enlève commentaires entre parenthèses
  const clean = String(regionStr).replace(/\([^)]*\)/g, " ");
  const tokens = clean.split(/[;,/&|+–—-]| et | and /i).map(s => s.trim()).filter(Boolean);

  const canonSet = new Set();
  tokens.forEach(tok => {
    const m = tokenToRegion(tok);
    if (m) canonSet.add(m);
  });

  // fallback: si rien n’a matché, garder la chaîne (nettoyée)
  if (canonSet.size === 0) return regionStr.trim();

  const arr = Array.from(canonSet);
  arr.sort((a, b) => REGION_ORDER.indexOf(a) - REGION_ORDER.indexOf(b));
  return arr.join(", ");
}

/* =========================
 * 3) Normalisation des bailleurs
 * ========================= */
const DONOR_SYNONYMS = {
  "cordaid": "Cordaid",
  "unicef": "UNICEF",
  "unicef mali": "UNICEF",
  "unhcr": "UNHCR",
  "hcr": "UNHCR",
  "usaid": "USAID",
  "jsi": "JSI",
  "amc": "Affaires mondiales Canada (AMC)",
  "affaires mondiales canada": "Affaires mondiales Canada (AMC)",
  "gffo": "GFFO",
  "bmz": "BMZ",
  "danida": "DANIDA",
  "aecid": "AECID",
  "ayuda en accion": "Ayuda en Acción",
  "aea": "Ayuda en Acción",
  "union europeenne": "Union européenne",
  "union européenne": "Union européenne",
  "ue": "Union européenne",
  "ddc": "DDC",
  "pain pour le monde": "Pain pour le Monde",
  "ppm": "Pain pour le Monde",
  "plan international": "Plan International",
  "save the children": "Save the Children",
  "sci": "Save the Children",
  "fhi 360": "FHI 360",
  "fhi360": "FHI 360",
  "ocha": "OCHA",
  "pam": "PAM",
  "ecw": "Education Cannot Wait (ECW)",
  "fhs aoc": "Fonds humanitaire AOC",
  "fhraoc": "Fonds humanitaire AOC",
  "fonds humanitaire aoc": "Fonds humanitaire AOC"
};

function canonicalizeOneDonor(name) {
  const n = _norm(name.replace(/\s+/g, " ").trim());
  if (!n) return null;
  return DONOR_SYNONYMS[n] || name.trim();
}

function canonicalizeDonorString(donorStr) {
  if (!donorStr) return "N/D";
  // découper en sous-bailleurs possibles
  const tokens = String(donorStr)
    .replace(/[()]/g, " ")
    .split(/[;,/|+–—-]| via | et | and /i)
    .map(s => s.trim())
    .filter(Boolean);

  const canonSet = new Set();
  tokens.forEach(tok => {
    const c = canonicalizeOneDonor(tok);
    if (c) canonSet.add(c);
  });

  if (canonSet.size === 0) return donorStr.trim();
  const arr = Array.from(canonSet);
  arr.sort((a, b) => a.localeCompare(b));
  return arr.join(" / ");
}

/* =========================
 * 4) Parsing & helpers
 * ========================= */
function parseNumberLike(v) {
  if (v == null || v === "") return null;
  if (typeof v === "number" && Number.isFinite(v)) return v;
  const s = String(v).replace(/[^\d.-]/g, "");
  const num = Number(s);
  return Number.isFinite(num) ? num : null;
}

function excelDateToISO(v) {
  if (typeof v === "number") {
    const d = new Date(Math.round((v - 25569) * 86400 * 1000));
    const iso = d.toISOString().slice(0, 10);
    return iso;
  }
  return parseDateLike(v);
}

function parseDateLike(v) {
  if (!v) return null;
  if (v instanceof Date && !isNaN(v)) return v.toISOString().slice(0, 10);
  const s = String(v).trim();
  const isoMatch = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (isoMatch) return s;
  const fr1 = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (fr1) {
    const [_, d, m, y] = fr1;
    return `${y.padStart(4, "0")}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  }
  const fr2 = s.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);
  if (fr2) {
    const [_, d, m, y] = fr2;
    return `${y.padStart(4, "0")}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  }
  const d = new Date(s);
  return isNaN(d) ? null : d.toISOString().slice(0, 10);
}

const HEADER_ALIASES = {
  title: ["titre", "title", "intitulé", "intitule", "nom du projet", "projet"],
  startDate: ["debut", "début", "date debut", "date début", "start", "startdate", "datedebut"],
  endDate: ["fin", "date fin", "end", "enddate", "datefin"],
  status: ["statut", "status", "état", "etat"],
  donor: ["bailleur", "donor", "partenaire financier", "partenaire", "agence"],
  domain: ["domaine", "domaines", "secteur", "axes", "thematique", "thématique"],
  region: ["zone", "regions", "région", "region", "zone d'intervention", "zones d'intervention", "localisation"],
  beneficiaries: ["beneficiaires", "bénéficiaires", "nb beneficiaires", "beneficiaries"],
  budget: ["budget", "montant", "cout", "coût", "financement"],
  excerpt: ["resume", "résumé", "description courte", "extrait"],
  description: ["description", "details", "détails", "objectif", "objectifs"],
  usaidNote: ["usaid", "suspendu", "suspension", "pauses usaid"]
};

function findHeaderKey(rowObj, wantedKey) {
  const aliases = HEADER_ALIASES[wantedKey] || [];
  for (const k of Object.keys(rowObj || {})) {
    const kn = _norm(k);
    for (const a of aliases) {
      if (kn === _norm(a)) return k;
    }
  }
  for (const k of Object.keys(rowObj || {})) {
    if (_norm(k).includes(_norm(wantedKey))) return k;
  }
  return null;
}

function readRowsFromExcel(filePath) {
  const wb = XLSX.readFile(filePath);
  const shName = wb.SheetNames[0];
  const ws = wb.Sheets[shName];
  return XLSX.utils.sheet_to_json(ws, { defval: "" });
}

/* =========================
 * 5) Transformation d’une ligne
 * ========================= */
function rowToProject(row, idx, headerMap) {
  const get = (key) => row[headerMap[key]] ?? "";

  const rawTitle = String(get("title")).trim();
  if (!rawTitle) return null;
  if (/ponah/i.test(rawTitle)) return null; // supprimer PONAH

  const startRaw = get("startDate");
  const endRaw = get("endDate");
  const statusRaw = String(get("status")).trim();
  const donorRaw = String(get("donor")).trim();
  const domainRaw = String(get("domain")).trim();
  const regionRaw = String(get("region")).trim();
  const benefRaw = get("beneficiaries");
  const budgetRaw = get("budget");
  const excerptRaw = String(get("excerpt")).trim();
  const descRaw = String(get("description")).trim();

  const startDate = typeof startRaw === "number" ? excelDateToISO(startRaw) : parseDateLike(startRaw);
  const endDate = typeof endRaw === "number" ? excelDateToISO(endRaw) : parseDateLike(endRaw);

  const statusNorm = _norm(statusRaw);
  const isUSAIDSuspended = /suspendu/.test(statusNorm) || /usaid/.test(statusNorm) || /pause/.test(statusNorm);

  const domain = canonicalizeDomainString(domainRaw);
  const region = canonicalizeRegionString(regionRaw);
  const donor = canonicalizeDonorString(donorRaw);

  const beneficiaries = parseNumberLike(benefRaw);
  const budget = String(budgetRaw || "").trim() || "N/D";

  let status = "En cours";
  if (statusNorm.includes("termin")) status = "Terminé";
  if (isUSAIDSuspended) status = "Suspendu (USAID)";

  return {
    id: undefined, // défini plus bas
    title: rawTitle,
    startDate: startDate || null,
    endDate: endDate || null,
    status,
    donor,
    image: "/assets/amss-terrain-activites.jpeg",
    excerpt: excerptRaw || null,
    description: descRaw || null,
    domain,
    region,
    beneficiaries: beneficiaries ?? "N/D",
    budget,
    usaidNote: isUSAIDSuspended || undefined
  };
}

/* =========================
 * 6) Split, IDs & Emission fichiers
 * ========================= */
function toArraysSplitByStatus(projects) {
  const enCours = [];
  const termines = [];
  for (const p of projects) {
    if (!p) continue;
    if (String(p.status || "").toLowerCase().includes("termin")) termines.push(p);
    else enCours.push(p);
  }
  return { enCours, termines };
}

function generateIds(projects, startAt = 1) {
  let id = startAt;
  projects.forEach(p => { p.id = id++; });
}

function emitJS(outputPath, enCours, termines) {
  const header = `// Auto-généré par scripts/migrate-projets.js – NE PAS ÉDITER À LA MAIN
// Dernière mise à jour: ${new Date().toISOString()}
`;

  const exportCanon = `
export const DOMAINES_CANONIQUES = ${JSON.stringify(DOMAIN_CANON_ORDER, null, 2)};
export const REGIONS_CANONIQUES = ${JSON.stringify(REGIONS_CANON.map(r => r.label), null, 2)};
`;

  const body =
`export const projetsEnCours = ${JSON.stringify(enCours, null, 2)};

export const projetsTermines = ${JSON.stringify(termines, null, 2)};

${exportCanon}
`;

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, header + body, "utf8");
  console.log(`✅ Écrit: ${outputPath}`);
}

/* =========================
 * 7) Analytics JSON (zones & domaines)
 * ========================= */
function projectTouchesZone(p, zoneLabel) {
  const r = String(p.region || "");
  return r.split(",").map(s => s.trim()).includes(zoneLabel);
}

function computeAnalytics(allProjects) {
  const zones = {};
  REGIONS_CANON.forEach(z => {
    zones[z.key] = {
      key: z.key,
      label: z.label,
      total: 0,
      enCours: 0,
      termines: 0,
      donors: 0,
      beneficiaries: 0
    };
  });

  const donorsByZone = {};
  Object.keys(zones).forEach(k => donorsByZone[k] = new Set());

  const domains = {};
  DOMAIN_CANON_ORDER.forEach(d => {
    domains[d] = { domain: d, total: 0, enCours: 0, termines: 0, beneficiaries: 0 };
  });

  const donorsCounter = new Map();

  allProjects.forEach(p => {
    const isTermine = String(p.status || "").toLowerCase().includes("termin");
    const isEnCours = !isTermine;

    // zones
    REGIONS_CANON.forEach(z => {
      if (projectTouchesZone(p, z.label)) {
        zones[z.key].total += 1;
        zones[z.key][isEnCours ? "enCours" : "termines"] += 1;

        // donors uniq
        String(p.donor || "")
          .split("/")
          .map(s => s.trim())
          .filter(Boolean)
          .forEach(d => donorsByZone[z.key].add(d));

        // beneficiaries
        const b = typeof p.beneficiaries === "number" ? p.beneficiaries : null;
        if (b) zones[z.key].beneficiaries += b;
      }
    });

    // domaines
    String(p.domain || "")
      .split(",")
      .map(s => s.trim())
      .filter(Boolean)
      .forEach(d => {
        if (!domains[d]) domains[d] = { domain: d, total: 0, enCours: 0, termines: 0, beneficiaries: 0 };
        domains[d].total += 1;
        domains[d][isEnCours ? "enCours" : "termines"] += 1;
        const b = typeof p.beneficiaries === "number" ? p.beneficiaries : null;
        if (b) domains[d].beneficiaries += b;
      });

    // donors global
    String(p.donor || "")
      .split("/")
      .map(s => s.trim())
      .filter(Boolean)
      .forEach(d => {
        donorsCounter.set(d, (donorsCounter.get(d) || 0) + 1);
      });
  });

  // taille ensembles bailleurs
  Object.keys(zones).forEach(k => {
    zones[k].donors = donorsByZone[k].size;
  });

  // donors top list
  const donors = Array.from(donorsCounter.entries())
    .map(([donor, projects]) => ({ donor, projects }))
    .sort((a, b) => b.projects - a.projects);

  return {
    updatedAt: new Date().toISOString(),
    zones,
    domains,
    donors
  };
}

function emitAnalyticsJSON(outputJSONPath, analytics) {
  fs.mkdirSync(path.dirname(outputJSONPath), { recursive: true });
  fs.writeFileSync(outputJSONPath, JSON.stringify(analytics, null, 2), "utf8");
  console.log(`✅ Écrit: ${outputJSONPath}`);
}

/* =========================
 * 8) Main
 * ========================= */
async function main() {
  const [, , input, output] = process.argv;
  if (!input || !output) {
    console.error("Usage: node scripts/migrate-projets.js <input.xlsx> <output.js>");
    process.exit(1);
  }

  const rows = readRowsFromExcel(input);
  if (!rows.length) {
    console.error("Aucune ligne trouvée dans le fichier Excel.");
    process.exit(1);
  }

  // construire une map d’entêtes
  const first = rows[0];
  const headerMap = {};
  for (const logical of Object.keys(HEADER_ALIASES)) {
    headerMap[logical] = findHeaderKey(first, logical) || logical;
  }

  // transformer
  const projects = rows
    .map((row, i) => rowToProject(row, i, headerMap))
    .filter(Boolean);

  generateIds(projects, 1);

  const { enCours, termines } = toArraysSplitByStatus(projects);

  // écrire JS
  emitJS(output, enCours, termines);

  // analytics (basés sur tous les projets)
  const analytics = computeAnalytics([...enCours, ...termines]);

  // même dossier que output -> fichier JSON à côté
  const outputJSON = path.join(path.dirname(output), "projetsAnalytics.json");
  emitAnalyticsJSON(outputJSON, analytics);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
