/**
 * build-scorm-ch1-m1.mjs
 * SCORM 1.2 pour ch1-m1 — format EXACT identique au package ch2-m3 qui marche dans 360Learning
 *
 * Structure ZIP :
 *   imsmanifest.xml          (version="1.2", isvisible="true")
 *   index.html               (launcher avec iframe → dist/spa/index.html#/module/ch1-m1?scorm=1)
 *   dist/spa/index.html      (React app bundlée)
 *   dist/spa/assets/*.js/.css
 */

import { mkdirSync, readdirSync, statSync } from "fs";
import { createWriteStream } from "fs";
import { join } from "path";
import archiver from "archiver";

const MODULE_ID    = "ch1-m1";
const MODULE_TITLE = "Comprendre un départ de feu";
const DIST         = "dist/spa";
const OUTPUT_DIR   = "scorm-packages";
const OUTPUT_FILE  = `${OUTPUT_DIR}/${MODULE_ID}-comprendre-depart-feu.zip`;

// ── imsmanifest.xml — format EXACT du manifest ch2-m3 qui fonctionne ────────
const manifest = `<?xml version="1.0" encoding="UTF-8"?>
<manifest identifier="IBM_FIRE_CH1_M1" version="1.2"
  xmlns="http://www.imsproject.org/xsd/imscp_rootv1p1p2"
  xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_rootv1p2"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.imsproject.org/xsd/imscp_rootv1p1p2 imscp_rootv1p1p2.xsd
                      http://www.adlnet.org/xsd/adlcp_rootv1p2 adlcp_rootv1p2.xsd">

  <metadata>
    <schema>ADL SCORM</schema>
    <schemaversion>1.2</schemaversion>
  </metadata>

  <organizations default="ORG_IBM_FIRE_CH1_M1">
    <organization identifier="ORG_IBM_FIRE_CH1_M1">
      <title>IBM Sécurité Incendie — Ch1 M1 · ${MODULE_TITLE}</title>
      <item identifier="ITEM_SCO_IBM_FIRE_CH1_M1" identifierref="SCO_IBM_FIRE_CH1_M1" isvisible="true">
        <title>${MODULE_TITLE} / Understanding a fire outbreak</title>
        <adlcp:masteryscore>80</adlcp:masteryscore>
      </item>
    </organization>
  </organizations>

  <resources>
    <resource identifier="SCO_IBM_FIRE_CH1_M1" type="webcontent" adlcp:scormtype="sco" href="index.html">
      <file href="index.html"/>
    </resource>
  </resources>

</manifest>`;

// ── index.html — launcher IDENTIQUE au ch2-m3 qui fonctionne ────────────────
const launcher = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>IBM — Ch1 M1 · ${MODULE_TITLE}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { width: 100%; height: 100%; overflow: hidden; background: #061178; font-family: 'IBM Plex Sans', Arial, sans-serif; }
    #splash {
      position: fixed; inset: 0; z-index: 10;
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      gap: 1rem; color: #fff; background: #061178;
      transition: opacity 0.4s ease-out;
    }
    #splash .logo { font-size: 1.5rem; font-weight: 700; letter-spacing: 0.05em; }
    #splash .subtitle { font-size: 0.9rem; opacity: 0.7; }
    #splash .spinner {
      width: 36px; height: 36px;
      border: 3px solid rgba(255,255,255,0.18);
      border-top-color: #fff; border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    iframe { position: fixed; inset: 0; width: 100%; height: 100%; border: none; background: #fff; }
  </style>
</head>
<body>
  <div id="splash">
    <div class="logo">IBM</div>
    <div class="subtitle">Sécurité Incendie &amp; Évacuation — Ch1 M1</div>
    <div class="spinner"></div>
  </div>

  <iframe id="app" src="dist/spa/index.html#/module/${MODULE_ID}?scorm=1" allow="fullscreen" title="${MODULE_TITLE}"></iframe>

  <script>
    // ── SCORM 1.2 API discovery (LMS uses parent-window API) ───────────────
    function findAPI(win) {
      var tries = 0;
      while (!win.API && win.parent && win.parent !== win && tries < 7) {
        win = win.parent; tries++;
      }
      return win.API || null;
    }
    function getAPI() {
      var api = findAPI(window);
      if (!api && window.opener) api = findAPI(window.opener);
      return api;
    }

    var API = getAPI();
    if (API) {
      try { API.LMSInitialize(""); } catch(e) {}
      // Auto-commit toutes les 60s pour ne rien perdre
      setInterval(function(){ try { API.LMSCommit(""); } catch(e){} }, 60000);
      // Finaliser proprement à la fermeture
      window.addEventListener("beforeunload", function(){
        try { API.LMSCommit(""); } catch(e) {}
        try { API.LMSFinish(""); } catch(e) {}
      });
    }

    // Cacher splash quand l'iframe est chargée
    document.getElementById("app").addEventListener("load", function(){
      var s = document.getElementById("splash");
      s.style.opacity = "0";
      setTimeout(function(){ s.style.display = "none"; }, 400);
    });
  </script>
</body>
</html>`;

// Files to exclude from dist/spa (Netlify-specific or would conflict with SCORM)
const EXCLUDE = new Set([
  "imsmanifest.xml",      // would create a 2nd manifest → 360Learning conflict
  "_redirects",           // Netlify only
  "robots.txt",           // not needed
  "ibm-fire-training-scorm.zip", // old SCORM inside new SCORM
]);

// ── Add dist/spa recursively ─────────────────────────────────────────────────
function addFolder(archive, dirPath, zipBase) {
  for (const entry of readdirSync(dirPath)) {
    if (EXCLUDE.has(entry)) continue;           // skip unwanted files
    if (entry.endsWith(".zip")) continue;       // skip any nested ZIPs
    const full    = join(dirPath, entry);
    const zipPath = zipBase ? `${zipBase}/${entry}` : entry;
    if (statSync(full).isDirectory()) {
      addFolder(archive, full, zipPath);
    } else {
      archive.file(full, { name: zipPath });
    }
  }
}

// ── Build ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log("Génération SCORM ch1-m1 (format identique ch2-m3)...\n");

  try { statSync(DIST); } catch {
    console.error("Build introuvable. Lancez: npm run build:client");
    process.exit(1);
  }

  mkdirSync(OUTPUT_DIR, { recursive: true });

  const output  = createWriteStream(OUTPUT_FILE);
  const archive = archiver("zip", { zlib: { level: 6 } });

  await new Promise((resolve, reject) => {
    output.on("close", resolve);
    archive.on("error", reject);
    archive.pipe(output);

    archive.append(manifest, { name: "imsmanifest.xml" });
    archive.append(launcher, { name: "index.html" });

    // Bundle full React app under dist/spa/
    addFolder(archive, DIST, "dist/spa");

    archive.finalize();
  });

  const mb = (statSync(OUTPUT_FILE).size / 1024 / 1024).toFixed(2);
  console.log("Package : " + OUTPUT_FILE + " (" + mb + " MB)");
  console.log("Format  : version=1.2 + isvisible=true + iframe + hash routing");
  console.log("URL     : dist/spa/index.html#/module/" + MODULE_ID + "?scorm=1");
}

main().catch(err => { console.error(err); process.exit(1); });
