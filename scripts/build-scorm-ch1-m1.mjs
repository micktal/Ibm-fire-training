/**
 * build-scorm-ch1-m1.mjs
 * Génère un package SCORM 1.2 pour le module ch1-m1
 * "Comprendre un départ de feu"
 *
 * Usage: node scripts/build-scorm-ch1-m1.mjs
 * Résultat: scorm-packages/ch1-m1-comprendre-depart-feu.zip
 */

import { writeFileSync, mkdirSync } from "fs";
import { createRequire } from "module";
import archiver from "archiver";
import { createWriteStream } from "fs";

const createRequireModule = createRequire(import.meta.url);

// ── Config ──────────────────────────────────────────────────────────────────
const MODULE_ID       = "ch1-m1";
const MODULE_TITLE_FR = "Comprendre un départ de feu";
const MODULE_TITLE_EN = "Understanding a fire outbreak";
const NETLIFY_BASE    = "https://ibm-demo2.netlify.app";
const MODULE_URL      = `${NETLIFY_BASE}/module/${MODULE_ID}?scorm=1`;
const OUTPUT_DIR      = "scorm-packages";
const OUTPUT_FILE     = `${OUTPUT_DIR}/${MODULE_ID}-comprendre-depart-feu.zip`;

// ── imsmanifest.xml ─────────────────────────────────────────────────────────
const manifest = `<?xml version="1.0" encoding="UTF-8"?>
<manifest
  identifier="IBM_FIRE_${MODULE_ID.toUpperCase().replace("-", "_")}"
  version="1.0"
  xmlns="http://www.imsproject.org/xsd/imscp_rootv1p1p2"
  xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_rootv1p2"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="
    http://www.imsproject.org/xsd/imscp_rootv1p1p2 imscp_rootv1p1p2.xsd
    http://www.imsglobal.org/xsd/imsmd_rootv1p2p1 imsmd_rootv1p2p1.xsd
    http://www.adlnet.org/xsd/adlcp_rootv1p2 adlcp_rootv1p2.xsd">

  <metadata>
    <schema>ADL SCORM</schema>
    <schemaversion>1.2</schemaversion>
  </metadata>

  <organizations default="IBM_FIRE_ORG">
    <organization identifier="IBM_FIRE_ORG">
      <title>IBM Formation Sécurité Incendie — ${MODULE_TITLE_FR}</title>
      <item identifier="ITEM_${MODULE_ID.toUpperCase().replace("-", "_")}" identifierref="RES_${MODULE_ID.toUpperCase().replace("-", "_")}">
        <title>${MODULE_TITLE_FR} / ${MODULE_TITLE_EN}</title>
        <adlcp:masteryscore>80</adlcp:masteryscore>
      </item>
    </organization>
  </organizations>

  <resources>
    <resource
      identifier="RES_${MODULE_ID.toUpperCase().replace("-", "_")}"
      type="webcontent"
      adlcp:scormtype="sco"
      href="launcher.html">
      <file href="launcher.html"/>
    </resource>
  </resources>

</manifest>`;

// ── launcher.html ────────────────────────────────────────────────────────────
const launcher = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${MODULE_TITLE_FR} — IBM Formation Sécurité Incendie</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { width: 100%; height: 100%; overflow: hidden; background: #0a0e1a; }

    #loading {
      position: fixed; inset: 0;
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      background: #0a0e1a; color: #fff;
      font-family: 'IBM Plex Sans', Arial, sans-serif;
      z-index: 10;
      transition: opacity 0.4s;
    }
    #loading .ibm-logo {
      font-size: 2rem; font-weight: 900;
      letter-spacing: 0.1em; color: #0f62fe;
      margin-bottom: 1rem;
    }
    #loading .title {
      font-size: 0.85rem; color: rgba(255,255,255,0.5);
      letter-spacing: 0.05em; text-transform: uppercase;
      margin-bottom: 2rem;
    }
    #loading .spinner {
      width: 32px; height: 32px;
      border: 3px solid rgba(15,98,254,0.2);
      border-top-color: #0f62fe;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    #content-frame {
      position: fixed; inset: 0;
      width: 100%; height: 100%;
      border: none;
      opacity: 0;
      transition: opacity 0.4s;
    }
    #content-frame.ready { opacity: 1; }
  </style>
</head>
<body>

  <div id="loading">
    <div class="ibm-logo">IBM</div>
    <div class="title">Formation Sécurité Incendie</div>
    <div style="font-size:1rem; color:rgba(255,255,255,0.8); margin-bottom:0.5rem; font-weight:600;">
      ${MODULE_TITLE_FR}
    </div>
    <div class="spinner"></div>
  </div>

  <iframe
    id="content-frame"
    src="${MODULE_URL}"
    allow="autoplay; fullscreen"
    allowfullscreen
  ></iframe>

  <script>
    // ── SCORM 1.2 API ───────────────────────────────────────────────────────
    var API = null;

    function findAPI(win) {
      var tries = 0;
      while (tries < 7) {
        try { if (win.API) return win.API; } catch(e) { return null; }
        if (!win.parent || win.parent === win) break;
        win = win.parent;
        tries++;
      }
      return null;
    }

    function getAPI() {
      var api = findAPI(window);
      if (!api) { try { if (window.opener) api = findAPI(window.opener); } catch(e) {} }
      return api;
    }

    // Init SCORM on load
    window.addEventListener('load', function() {
      API = getAPI();
      if (API) {
        API.LMSInitialize("");
        API.LMSSetValue("cmi.core.lesson_status", "incomplete");
        API.LMSCommit("");
        console.log("[SCORM] Session initialisée");
      } else {
        console.log("[SCORM] Hors LMS — mode standalone");
      }
    });

    // Show iframe once loaded
    var frame = document.getElementById('content-frame');
    var loading = document.getElementById('loading');

    frame.addEventListener('load', function() {
      setTimeout(function() {
        frame.classList.add('ready');
        loading.style.opacity = '0';
        setTimeout(function() { loading.style.display = 'none'; }, 400);
      }, 500);
    });

    // Listen for completion messages from the React app
    window.addEventListener('message', function(e) {
      if (!API) return;
      if (e.data && e.data.type === 'scorm') {
        var d = e.data;
        if (d.action === 'complete') {
          var score = d.score || 100;
          API.LMSSetValue("cmi.core.lesson_status", score >= 80 ? "passed" : "failed");
          API.LMSSetValue("cmi.core.score.raw", String(score));
          API.LMSSetValue("cmi.core.score.min", "0");
          API.LMSSetValue("cmi.core.score.max", "100");
          API.LMSCommit("");
          console.log("[SCORM] Module terminé — score:", score);
        }
        if (d.action === 'suspend') {
          API.LMSSetValue("cmi.suspend_data", JSON.stringify(d.data || {}));
          API.LMSSetValue("cmi.core.lesson_status", "incomplete");
          API.LMSCommit("");
        }
      }
    });

    // Finish on unload
    window.addEventListener('beforeunload', function() {
      if (API) {
        API.LMSSetValue("cmi.core.session_time", "00:00:00");
        API.LMSFinish("");
      }
    });
  </script>
</body>
</html>`;

// ── Build ZIP ────────────────────────────────────────────────────────────────
async function main() {
  console.log("Génération du package SCORM 1.2 — ch1-m1...\n");

  mkdirSync(OUTPUT_DIR, { recursive: true });

  // Write temp files
  writeFileSync(`${OUTPUT_DIR}/_manifest_tmp.xml`, manifest);
  writeFileSync(`${OUTPUT_DIR}/_launcher_tmp.html`, launcher);

  const output  = createWriteStream(OUTPUT_FILE);
  const archive = archiver("zip", { zlib: { level: 9 } });

  await new Promise((resolve, reject) => {
    output.on("close", resolve);
    archive.on("error", reject);
    archive.pipe(output);

    archive.append(manifest, { name: "imsmanifest.xml" });
    archive.append(launcher, { name: "launcher.html" });

    archive.finalize();
  });

  // Cleanup temp files
  import("fs").then(fs => {
    fs.unlinkSync(`${OUTPUT_DIR}/_manifest_tmp.xml`);
    fs.unlinkSync(`${OUTPUT_DIR}/_launcher_tmp.html`);
  }).catch(() => {});

  console.log("Package SCORM genere avec succes !");
  console.log("Fichier : " + OUTPUT_FILE);
  console.log("Module  : " + MODULE_TITLE_FR);
  console.log("URL     : " + MODULE_URL);
  console.log("\nImportez ce fichier ZIP dans votre LMS (Moodle, SuccessFactors, etc.)");
}

main().catch(err => {
  console.error("Erreur:", err);
  process.exit(1);
});
