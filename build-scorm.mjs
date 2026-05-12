/**
 * build-scorm.mjs
 * Génère 14 packages SCORM 1.2 — un par module IBM Sécurité Incendie
 *
 * Chaque ZIP contient :
 *   - imsmanifest.xml    (manifest SCORM 1.2 standard)
 *   - index.html         (entry point : set route + charge React en local)
 *   - assets/            (JS + CSS du build React)
 *   - favicon.ico / placeholder.svg
 *
 * Pas d'iframe. Pas d'URL externe. Fonctionne hors ligne.
 *
 * Usage    : node build-scorm.mjs
 * Prérequis: npm run build:client  (génère dist/spa/)
 * Résultat : scorm-packages/<id>-<slug>.zip  (× 14)
 */

import { readdirSync, statSync, readFileSync, mkdirSync } from "fs";
import { join, extname } from "path";
import { createWriteStream } from "fs";
import archiver from "archiver";

// ── Config ────────────────────────────────────────────────────────────────────
const DIST       = "dist/spa";
const OUTPUT_DIR = "scorm-packages";

// Fichiers du build à NE PAS inclure dans les ZIPs
const EXCLUDE_FILES = new Set([
  "imsmanifest.xml",           // géré par nous
  "_redirects",                // Netlify uniquement
  "robots.txt",                // inutile en SCORM
]);
const EXCLUDE_EXTS = new Set([".zip"]);  // pas de ZIPs imbriqués

// ── Liste des 14 modules ──────────────────────────────────────────────────────
const MODULES = [
  // Chapitre 1
  { id: "ch1-m1", slug: "comprendre-depart-feu",      titleFr: "Comprendre un départ de feu",              titleEn: "Understanding a fire outbreak" },
  { id: "ch1-m2", slug: "triangle-du-feu",            titleFr: "Le triangle du feu",                       titleEn: "The fire triangle" },
  { id: "ch1-m3", slug: "propagation-confinement",    titleFr: "Propagation et confinement",               titleEn: "Propagation and confinement" },
  { id: "ch1-m4", slug: "classes-de-feu",             titleFr: "Reconnaître les classes de feu",           titleEn: "Recognising fire classes" },
  { id: "ch1-m5", slug: "utiliser-extincteur",        titleFr: "Utiliser un extincteur",                   titleEn: "Using a fire extinguisher" },
  { id: "ch1-m6", slug: "intervenir-ou-evacuer",      titleFr: "Intervenir ou évacuer ?",                  titleEn: "Intervene or evacuate?" },
  { id: "ch1-m7", slug: "simulation-incendie-ch1",    titleFr: "Simulation incendie — Chapitre 1",         titleEn: "Fire simulation — Chapter 1" },
  // Chapitre 2
  { id: "ch2-m1", slug: "declencher-alarme",          titleFr: "Déclencher l'alarme",                      titleEn: "Triggering the alarm" },
  { id: "ch2-m2", slug: "garder-calme-guider",        titleFr: "Garder son calme et guider",               titleEn: "Stay calm and lead" },
  { id: "ch2-m3", slug: "fermer-les-portes",          titleFr: "Fermer les portes",                        titleEn: "Closing the doors" },
  { id: "ch2-m4", slug: "verifier-personne-reste",    titleFr: "Vérifier que personne ne reste",           titleEn: "Ensuring no one remains" },
  { id: "ch2-m5", slug: "personnes-mobilite-reduite", titleFr: "Accompagner les personnes à mobilité réduite", titleEn: "Assisting people with reduced mobility" },
  { id: "ch2-m6", slug: "escaliers-ou-eas",           titleFr: "Escaliers ou espace sécurisé",             titleEn: "Stairs or safe waiting space" },
  { id: "ch2-m7", slug: "simulation-incendie-ch2",    titleFr: "Simulation incendie — Chapitre 2",         titleEn: "Fire simulation — Chapter 2" },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Identifiant SCORM safe (ex: ch1-m1 → CH1_M1) */
const scormId = (id) => id.toUpperCase().replace(/-/g, "_");

/** Génère l'imsmanifest.xml pour un module */
function makeManifest(mod) {
  const sid = scormId(mod.id);
  return `<?xml version="1.0" encoding="UTF-8"?>
<manifest identifier="IBM_FIRE_${sid}" version="1.2"
  xmlns="http://www.imsproject.org/xsd/imscp_rootv1p1p2"
  xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_rootv1p2"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.imsproject.org/xsd/imscp_rootv1p1p2 imscp_rootv1p1p2.xsd
                      http://www.adlnet.org/xsd/adlcp_rootv1p2 adlcp_rootv1p2.xsd">

  <metadata>
    <schema>ADL SCORM</schema>
    <schemaversion>1.2</schemaversion>
  </metadata>

  <organizations default="ORG_IBM_FIRE_${sid}">
    <organization identifier="ORG_IBM_FIRE_${sid}">
      <title>IBM Sécurité Incendie — ${mod.titleFr}</title>
      <item identifier="ITEM_SCO_IBM_FIRE_${sid}" identifierref="SCO_IBM_FIRE_${sid}" isvisible="true">
        <title>${mod.titleFr} / ${mod.titleEn}</title>
        <adlcp:masteryscore>80</adlcp:masteryscore>
      </item>
    </organization>
  </organizations>

  <resources>
    <resource identifier="SCO_IBM_FIRE_${sid}" type="webcontent" adlcp:scormtype="sco" href="index.html">
      <file href="index.html"/>
    </resource>
  </resources>

</manifest>`;
}

/** Génère l'index.html autonome pour un module (pas d'iframe) */
function makeIndex(mod, cssFile, jsFile) {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${mod.titleFr} — IBM Sécurité Incendie</title>
  <link href="https://fonts.bunny.net/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600;700&display=swap" rel="stylesheet"/>
  <link rel="stylesheet" href="./assets/${cssFile}"/>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #050a1a; min-height: 100vh; }
    #root { min-height: 100vh; }
    /* Splash pendant le chargement React */
    #ibm-splash {
      position: fixed; inset: 0; display: flex; flex-direction: column;
      align-items: center; justify-content: center; gap: 1rem;
      background: #050a1a; color: #fff; z-index: 9999;
      font-family: Arial, sans-serif; transition: opacity .4s;
    }
    #ibm-splash .logo { font-size: 2rem; font-weight: 900; color: #0f62fe; letter-spacing: .1em; }
    #ibm-splash .sub  { font-size: .8rem; color: rgba(255,255,255,.5); letter-spacing: .1em; text-transform: uppercase; }
    #ibm-splash .spin {
      width: 32px; height: 32px; border-radius: 50%;
      border: 3px solid rgba(15,98,254,.2); border-top-color: #0f62fe;
      animation: sp .8s linear infinite;
    }
    @keyframes sp { to { transform: rotate(360deg); } }
  </style>
</head>
<body>

  <!-- Splash screen (caché quand React est prêt) -->
  <div id="ibm-splash">
    <div class="logo">IBM</div>
    <div class="sub">Sécurité Incendie</div>
    <div class="spin"></div>
  </div>

  <div id="root"></div>

  <script>
    /* ── 1. Route initiale pour MemoryRouter ──────────────────────────────── */
    window.__SCORM_INITIAL_ROUTE = "/module/${mod.id}?scorm=1";

    /* ── 2. Masquer splash quand React a rendu le contenu ────────────────── */
    var _splashDone = false;
    var _splashObs = new MutationObserver(function() {
      if (!_splashDone && document.getElementById("root").children.length > 0) {
        _splashDone = true;
        var s = document.getElementById("ibm-splash");
        if (s) { s.style.opacity = "0"; setTimeout(function(){ s.remove(); }, 400); }
        _splashObs.disconnect();
      }
    });
    _splashObs.observe(document.getElementById("root"), { childList: true });
  </script>

  <!-- React app (local, pas d'URL externe) -->
  <script type="module" src="./assets/${jsFile}"></script>

</body>
</html>`;
}

/** Ajoute récursivement dist/spa/ dans l'archive (sans les fichiers exclus) */
function addAssets(archive, dirPath, zipBase) {
  for (const entry of readdirSync(dirPath)) {
    if (EXCLUDE_FILES.has(entry)) continue;
    if (EXCLUDE_EXTS.has(extname(entry))) continue;
    const full    = join(dirPath, entry);
    const zipPath = zipBase ? `${zipBase}/${entry}` : entry;
    if (statSync(full).isDirectory()) {
      addAssets(archive, full, zipPath);
    } else {
      archive.file(full, { name: zipPath });
    }
  }
}

// ── Build ─────────────────────────────────────────────────────────────────────
async function main() {
  // Vérifier que le build existe
  try { statSync(DIST); } catch {
    console.error("Build introuvable. Lancez d'abord : npm run build:client");
    process.exit(1);
  }

  // Détecter les fichiers assets (JS/CSS) depuis dist/spa/index.html
  const builtHtml = readFileSync(`${DIST}/index.html`, "utf-8");
  const cssMatch  = builtHtml.match(/href="\.\/assets\/([^"]+\.css)"/);
  const jsMatch   = builtHtml.match(/src="\.\/assets\/([^"]+\.js)"/);

  if (!cssMatch || !jsMatch) {
    console.error("Impossible de détecter les assets dans dist/spa/index.html");
    process.exit(1);
  }

  const cssFile = cssMatch[1];
  const jsFile  = jsMatch[1];

  console.log(`Assets détectés : ${jsFile} | ${cssFile}`);
  console.log(`Génération de ${MODULES.length} packages SCORM...\n`);

  mkdirSync(OUTPUT_DIR, { recursive: true });

  let totalSize = 0;

  for (const mod of MODULES) {
    const outputFile = `${OUTPUT_DIR}/${mod.id}-${mod.slug}.zip`;
    const output     = createWriteStream(outputFile);
    const archive    = archiver("zip", { zlib: { level: 6 } });

    await new Promise((resolve, reject) => {
      output.on("close", resolve);
      archive.on("error", reject);
      archive.pipe(output);

      // 1. imsmanifest.xml à la racine
      archive.append(makeManifest(mod), { name: "imsmanifest.xml" });

      // 2. index.html personnalisé (route + splash, pas d'iframe)
      archive.append(makeIndex(mod, cssFile, jsFile), { name: "index.html" });

      // 3. Assets React (JS, CSS, images) — sans les fichiers exclus
      //    Placés directement à la racine du ZIP (assets/, favicon.ico, etc.)
      addAssets(archive, DIST, "");

      archive.finalize();
    });

    const size = statSync(outputFile).size;
    totalSize += size;
    const mb = (size / 1024 / 1024).toFixed(2);
    console.log(`  [${mod.id}] ${mod.titleFr.padEnd(42)} → ${mb} MB`);
  }

  const totalMb = (totalSize / 1024 / 1024).toFixed(1);
  console.log(`\n${MODULES.length} packages générés dans ./${OUTPUT_DIR}/`);
  console.log(`Taille totale : ${totalMb} MB`);
  console.log("\nChaque ZIP est autonome (React en local, pas d'iframe, pas d'URL externe).");
  console.log("Importez chaque ZIP séparément dans votre LMS SCORM 1.2.");
}

main().catch(err => { console.error("Erreur :", err); process.exit(1); });
