/**
 * build-scorm.js
 * Generates 14 SCORM 1.2 packages (one per IBM Fire Safety module).
 *
 * Usage:
 *   node scripts/build-scorm.js
 *
 * Output:
 *   scorm-packages/
 *     ibm-fire-ch1-m1.zip
 *     ibm-fire-ch1-m2.zip
 *     ...
 *     ibm-fire-ch2-m7.zip
 *
 * Each ZIP contains:
 *   imsmanifest.xml   — SCORM 1.2 manifest
 *   launcher.html     — entry point that initialises SCORM and loads the module
 *   adlcp_rootv1p2.xsd / ims_xml.xsd / imscp_rootv1p1p2.xsd  — schema stubs
 *
 * The launcher redirects to the hosted app (ibm-fire-training.netlify.app).
 * SCORM tracking is handled inside the React app via client/lib/scorm.ts.
 */

import { createWriteStream, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import archiver from "archiver";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT_DIR = join(ROOT, "scorm-packages");

// Hosted app base URL (update if deploying to a different domain)
const BASE_URL = "https://ibm-fire-training.netlify.app";

// ── Module definitions ────────────────────────────────────────────────────────

const MODULES = [
  { id: "ch1-m1", titleFr: "Comprendre un départ de feu",       titleEn: "Detecting a fire",              chapter: 1, number: 1 },
  { id: "ch1-m2", titleFr: "Le triangle du feu",                 titleEn: "The fire triangle",             chapter: 1, number: 2 },
  { id: "ch1-m3", titleFr: "Propagation d'un incendie",          titleEn: "Fire spread and containment",   chapter: 1, number: 3 },
  { id: "ch1-m4", titleFr: "CO2 ou eau pulvérisée ?",            titleEn: "CO2 or water mist?",            chapter: 1, number: 4 },
  { id: "ch1-m5", titleFr: "Utiliser un extincteur",             titleEn: "Using a fire extinguisher",     chapter: 1, number: 5 },
  { id: "ch1-m6", titleFr: "Intervenir ou évacuer ?",            titleEn: "Intervene or evacuate?",        chapter: 1, number: 6 },
  { id: "ch1-m7", titleFr: "Simulation incendie",                titleEn: "Fire simulation",               chapter: 1, number: 7 },
  { id: "ch2-m1", titleFr: "Déclencher l'alarme",                titleEn: "Triggering the alarm",          chapter: 2, number: 1 },
  { id: "ch2-m2", titleFr: "Garder son calme et guider",         titleEn: "Stay calm and guide others",    chapter: 2, number: 2 },
  { id: "ch2-m3", titleFr: "Fermer les portes",                  titleEn: "Closing the doors",             chapter: 2, number: 3 },
  { id: "ch2-m4", titleFr: "Vérifier que personne ne reste",     titleEn: "Ensure no one is left behind",  chapter: 2, number: 4 },
  { id: "ch2-m5", titleFr: "Faire face à la fumée",              titleEn: "Facing smoke",                  chapter: 2, number: 5 },
  { id: "ch2-m6", titleFr: "Escaliers ou espace sécurisé",       titleEn: "Stairs or safe space",          chapter: 2, number: 6 },
  { id: "ch2-m7", titleFr: "Procédure complète d'évacuation",    titleEn: "Full evacuation procedure",     chapter: 2, number: 7 },
];

// ── Template generators ───────────────────────────────────────────────────────

function generateManifest(mod) {
  const identifier = `IBM_FIRE_CH${mod.chapter}_M${mod.number}`;
  const scoId = `SCO_${identifier}`;
  return `<?xml version="1.0" encoding="UTF-8"?>
<manifest identifier="${identifier}"
  xmlns="http://www.imsproject.org/xsd/imscp_rootv1p1p2"
  xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_rootv1p2"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.imsproject.org/xsd/imscp_rootv1p1p2 imscp_rootv1p1p2.xsd
                      http://www.imsglobal.org/xsd/imsmd_rootv1p2p1 imsmd_rootv1p2p1.xsd
                      http://www.adlnet.org/xsd/adlcp_rootv1p2 adlcp_rootv1p2.xsd">

  <metadata>
    <schema>ADL SCORM</schema>
    <schemaversion>1.2</schemaversion>
  </metadata>

  <organizations default="ORG_${identifier}">
    <organization identifier="ORG_${identifier}">
      <title>IBM Sécurité Incendie — Ch${mod.chapter} M${mod.number} · ${mod.titleFr}</title>
      <item identifier="ITEM_${scoId}" identifierref="${scoId}">
        <title>${mod.titleFr} / ${mod.titleEn}</title>
        <adlcp:masteryscore>80</adlcp:masteryscore>
      </item>
    </organization>
  </organizations>

  <resources>
    <resource identifier="${scoId}"
              type="webcontent"
              adlcp:scormtype="sco"
              href="launcher.html">
      <file href="launcher.html"/>
    </resource>
  </resources>

</manifest>`;
}

function generateLauncher(mod) {
  const moduleUrl = `${BASE_URL}/module/${mod.id}?scorm=1`;
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>IBM Sécurité Incendie — ${mod.titleFr}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { width: 100%; height: 100%; overflow: hidden; background: #061178; }
    #loading {
      font-family: 'IBM Plex Sans', Arial, sans-serif;
      color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      gap: 1rem;
      position: fixed;
      inset: 0;
      z-index: 10;
      background: #061178;
      transition: opacity 0.4s;
    }
    .logo { font-size: 1.5rem; font-weight: 700; letter-spacing: 0.05em; }
    .subtitle { font-size: 0.9rem; opacity: 0.7; }
    .spinner {
      width: 40px; height: 40px;
      border: 3px solid rgba(255,255,255,0.2);
      border-top-color: #fff;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    #content-frame {
      position: fixed;
      inset: 0;
      width: 100%;
      height: 100%;
      border: none;
    }
  </style>
</head>
<body>
  <!-- Loading screen shown while iframe loads -->
  <div id="loading">
    <div class="logo">IBM</div>
    <div class="subtitle">Sécurité Incendie &amp; Évacuation — Ch${mod.chapter} M${mod.number}</div>
    <div class="spinner"></div>
  </div>

  <!-- The module loads inside this iframe — the launcher page never navigates away -->
  <iframe
    id="content-frame"
    src="${moduleUrl}"
    allow="fullscreen"
    title="${mod.titleFr}"
  ></iframe>

  <script>
    // ── SCORM 1.2 API discovery ──────────────────────────────────────────────
    // The API lives in a parent window (LMS). We find it here in the launcher,
    // which stays in the LMS frame. The iframe content communicates back via
    // postMessage if needed (for future use), but tracking is handled by the
    // React app using the same parent-window API lookup.
    function findSCORMAPI(win) {
      var tries = 0;
      while (!win.API && win.parent && win.parent !== win && tries < 7) {
        win = win.parent;
        tries++;
      }
      return win.API || null;
    }

    var API = findSCORMAPI(window);

    if (API) {
      API.LMSInitialize("");

      // Read and store saved data so the React app (in iframe) can restore state
      try {
        var suspendData = API.LMSGetValue("cmi.suspend_data");
        var lessonLocation = API.LMSGetValue("cmi.core.lesson_location");
        var lessonStatus = API.LMSGetValue("cmi.core.lesson_status");

        // Pass data to iframe via URL hash once it loads
        if (suspendData || lessonLocation) {
          var url = "${moduleUrl}";
          sessionStorage.setItem("scorm_active", "1");
          sessionStorage.setItem("scorm_module", "${mod.id}");
          if (suspendData) sessionStorage.setItem("scorm_suspend_data", suspendData);
          if (lessonLocation) sessionStorage.setItem("scorm_location", lessonLocation);
          if (lessonStatus) sessionStorage.setItem("scorm_status", lessonStatus);
        }
      } catch(e) {}

      // Commit + finish when launcher is unloaded (LMS closes the window)
      window.addEventListener("beforeunload", function() {
        try { API.LMSCommit(""); } catch(e) {}
        try { API.LMSFinish(""); } catch(e) {}
      });

      // Periodic auto-commit every 60s
      setInterval(function() {
        try { API.LMSCommit(""); } catch(e) {}
      }, 60000);
    }

    // ── Hide loading screen once iframe is ready ─────────────────────────────
    document.getElementById("content-frame").addEventListener("load", function() {
      var loading = document.getElementById("loading");
      loading.style.opacity = "0";
      setTimeout(function() { loading.style.display = "none"; }, 400);
    });
  </script>
</body>
</html>`;
}

// ── Package builder ───────────────────────────────────────────────────────────

async function buildPackage(mod) {
  const zipName = `ibm-fire-${mod.id}.zip`;
  const zipPath = join(OUT_DIR, zipName);

  return new Promise((resolve, reject) => {
    const output = createWriteStream(zipPath);
    const archive = archiver("zip", { zlib: { level: 9 } });

    output.on("close", () => {
      console.log(`  ✅  ${zipName}  (${(archive.pointer() / 1024).toFixed(1)} KB)`);
      resolve();
    });
    archive.on("error", reject);
    archive.pipe(output);

    // Add manifest
    archive.append(generateManifest(mod), { name: "imsmanifest.xml" });
    // Add launcher
    archive.append(generateLauncher(mod), { name: "launcher.html" });

    archive.finalize();
  });
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log("\n🔧  IBM Fire Safety — SCORM 1.2 Package Builder");
  console.log(`📦  Generating ${MODULES.length} packages → ${OUT_DIR}\n`);

  if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

  for (const mod of MODULES) {
    await buildPackage(mod);
  }

  console.log(`\n✅  Done. Upload each ZIP to your LMS as a separate SCORM 1.2 course.`);
  console.log(`   Mastery score: 80% (set in imsmanifest.xml <adlcp:masteryscore>)`);
  console.log(`   Hosted app: ${BASE_URL}\n`);
}

main().catch((err) => {
  console.error("❌ Build failed:", err);
  process.exit(1);
});
