#!/usr/bin/env node
/**
 * Migration Cartographie AMSS -> src/data/projetsData.js
 * - Lit un fichier .xlsx
 * - Normalise "domain" vers 10 catégories canoniques
 * - Supprime PONAH
 * - Sépare en projetsEnCours / projetsTermines
 * - Écrit un module ESM pour le front
 *
 * Usage:
 *   node scripts/migrate-projets.js "Cartographie_Projets_AMSS.xlsx" "src/data/projetsData.js"
 */

import fs from "fs";
import path from "path";
import * as XLSX from "xlsx";

/* ====== 1) Taxonomie canonique des domaines ====== */

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

  // heuristiques d’inclusion
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
    .split(/[;,/|]/) // tolérant aux séparateurs variés
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

/* ====== 2) Utilitaires parsing ====== */

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
  // formats communs: YYYY-MM-DD, DD/MM/YYYY, DD-MM-YYYY
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
  // fallback tentative
  const d = new Date(s);
  return isNaN(d) ? null : d.toISOString().slice(0, 10);
}

/* ====== 3) Mapping entêtes tolérant variations ====== */

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
  const keys = Object.keys(rowObj || {});
  for (const k of keys) {
    const kn = _norm(k);
    for (const a of aliases) {
      if (kn === _norm(a)) return k;
    }
  }
  // fallback: tentatives par inclusion approximative
  for (const k of Object.keys(rowObj || {})) {
    if (_norm(k).includes(_norm(wantedKey))) return k;
  }
  return null;
}

/* ====== 4) Lecture & transformation ====== */

function readRowsFromExcel(filePath) {
  const wb = XLSX.readFile(filePath);
  const shName = wb.SheetNames[0]; // première feuille
  const ws = wb.Sheets[shName];
  return XLSX.utils.sheet_to_json(ws, { defval: "" });
}

function rowToProject(row, idx, headerMap) {
  const get = (key) => row[headerMap[key]] ?? "";

  const rawTitle = String(get("title")).trim();
  if (!rawTitle) return null;

  // skip PONAH
  if (/ponah/i.test(rawTitle)) return null;

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
  const beneficiaries = parseNumberLike(benefRaw);
  const budget = String(budgetRaw || "").trim() || "N/D";

  // statut affichable
  let status = "En cours";
  if (statusNorm.includes("termin")) status = "Terminé";
  if (isUSAIDSuspended) status = "Suspendu (USAID)";

  return {
    id: undefined, // on attribue plus bas
    title: rawTitle,
    startDate: startDate || null,
    endDate: endDate || null,
    status,
    donor: donorRaw || "N/D",
    image: "/assets/amss-terrain-activites.jpeg",
    excerpt: excerptRaw || null,
    description: descRaw || null,
    domain,
    region: regionRaw || "N/D",
    beneficiaries: beneficiaries ?? "N/D",
    budget,
    usaidNote: isUSAIDSuspended || undefined
  };
}

function toArraysSplitByStatus(projects) {
  const enCours = [];
  const termines = [];
  for (const p of projects) {
    if (!p) continue;
    if (p.status && p.status.toLowerCase().includes("termin")) termines.push(p);
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

/* ====== 5) Main ====== */

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

  // construire une map d’entêtes résiliente
  const first = rows[0];
  const headerMap = {};
  for (const logical of Object.keys(HEADER_ALIASES)) {
    headerMap[logical] = findHeaderKey(first, logical) || logical; // fallback : le même nom
  }

  const projects = rows
    .map((row, i) => rowToProject(row, i, headerMap))
    .filter(Boolean);

  // attribue des IDs stables
  generateIds(projects, 1);

  // split en cours / terminés
  const { enCours, termines } = toArraysSplitByStatus(projects);

  // sortie
  emitJS(output, enCours, termines);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
