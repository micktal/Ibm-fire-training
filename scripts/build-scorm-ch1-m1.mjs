/**
 * build-scorm-ch1-m1.mjs
 * Génère un package SCORM 1.2 AUTONOME pour ch1-m1 — compatible 360Learning
 * L'app React complète est embarquée dans le ZIP (pas de dépendance externe).
 *
 * Usage: node scripts/build-scorm-ch1-m1.mjs
 */

import { mkdirSync, readdirSync, statSync, readFileSync } from "fs";
import { createWriteStream } from "fs";
import { join } from "path";
import archiver from "archiver";

// ── Config ───────────────────────────────────────────────────────────────────
const MODULE_ID       = "ch1-m1";
const MODULE_TITLE_FR = "Comprendre un départ de feu";
const DIST            = "dist/spa";
const OUTPUT_DIR      = "scorm-packages";
const OUTPUT_FILE     = `${OUTPUT_DIR}/${MODULE_ID}-comprendre-depart-feu.zip`;

// ── imsmanifest.xml ──────────────────────────────────────────────────────────
const manifest = `<?xml version="1.0" encoding="UTF-8"?>
<manifest identifier="IBM_FIRE_CH1_M1" version="1"
  xmlns="http://www.imsproject.org/xsd/imscp_rootv1p1p2"
  xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_rootv1p2"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.imsproject.org/xsd/imscp_rootv1p1p2 imscp_rootv1p1p2.xsd http://www.adlnet.org/xsd/adlcp_rootv1p2 adlcp_rootv1p2.xsd">
  <metadata>
    <schema>ADL SCORM</schema>
    <schemaversion>1.2</schemaversion>
  </metadata>
  <organizations default="ORG_IBM_CH1_M1">
    <organization identifier="ORG_IBM_CH1_M1">
      <title>IBM Sécurité Incendie — ${MODULE_TITLE_FR}</title>
      <item identifier="ITEM_CH1_M1" identifierref="RES_CH1_M1">
        <title>${MODULE_TITLE_FR}</title>
        <adlcp:masteryscore>80</adlcp:masteryscore>
        <adlcp:timeLimitAction>continue,no message</adlcp:timeLimitAction>
      </item>
    </organization>
  </organizations>
  <resources>
    <resource identifier="RES_CH1_M1" type="webcontent" adlcp:scormtype="sco" href="scorm-entry.html">
      <file href="scorm-entry.html"/>
    </resource>
  </resources>
</manifest>`;

// ── scorm-entry.html (sets initial route BEFORE React loads) ─────────────────
// We read the actual built index.html to extract asset paths
function buildScormEntry() {
  const builtIndex = readFileSync(`${DIST}/index.html`, "utf-8");

  // Extract CSS and JS links from the built index.html
  const cssMatch  = builtIndex.match(/href="(\/assets\/[^"]+\.css)"/);
  const jsMatch   = builtIndex.match(/src="(\/assets\/[^"]+\.js)"/);

  const cssHref = cssMatch  ? cssMatch[1].replace(/^\//, "")  : "assets/index.css";
  const jsSrc   = jsMatch   ? jsMatch[1].replace(/^\//, "")   : "assets/index.js";

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${MODULE_TITLE_FR} — IBM Sécurité Incendie</title>
  <link rel="stylesheet" href="${cssHref}"/>
  <style>
    body { margin: 0; background: #050a1a; }
    #root { min-height: 100vh; }
  </style>
</head>
<body>
  <div id="root"></div>

  <script>
    /* ── Set initial route BEFORE React boots ── */
    window.__SCORM_INITIAL_ROUTE = "/module/${MODULE_ID}?scorm=1";

    /* ── SCORM 1.2 session ── */
    var _scorm = {
      api: null,
      ok: false,
      findAPI: function(w) {
        var n = 0;
        while (n < 7) {
          try { if (w.API) return w.API; } catch(e) { return null; }
          if (!w.parent || w.parent === w) break;
          w = w.parent; n++;
        }
        return null;
      },
      init: function() {
        this.api = this.findAPI(window);
        if (!this.api && window.opener) {
          try { this.api = this.findAPI(window.opener); } catch(e) {}
        }
        if (this.api) {
          var r = this.api.LMSInitialize("");
          this.ok = (r === "true" || r === true);
          if (this.ok) {
            this.api.LMSSetValue("cmi.core.lesson_status", "incomplete");
            this.api.LMSSetValue("cmi.core.entry", "ab-initio");
            this.api.LMSCommit("");
          }
        }
      },
      set: function(k, v) {
        if (this.ok) { this.api.LMSSetValue(k, v); this.api.LMSCommit(""); }
      },
      finish: function(score) {
        if (!this.ok) return;
        score = score == null ? 100 : score;
        this.api.LMSSetValue("cmi.core.score.raw",  String(score));
        this.api.LMSSetValue("cmi.core.score.min",  "0");
        this.api.LMSSetValue("cmi.core.score.max",  "100");
        this.api.LMSSetValue("cmi.core.lesson_status", score >= 80 ? "passed" : "failed");
        this.api.LMSCommit("");
        this.api.LMSFinish("");
        this.ok = false;
      }
    };

    /* ── Listen for completion from React app ── */
    window.addEventListener("message", function(e) {
      if (!e.data || e.data.type !== "scorm") return;
      if (e.data.action === "complete") _scorm.finish(e.data.score);
      if (e.data.action === "suspend")  _scorm.set("cmi.suspend_data", JSON.stringify(e.data.data || {}));
      if (e.data.action === "progress") _scorm.set("cmi.suspend_data", JSON.stringify(e.data.data || {}));
    });

    window.addEventListener("load",          function() { _scorm.init(); });
    window.addEventListener("beforeunload",   function() {
      if (_scorm.ok) {
        _scorm.api.LMSSetValue("cmi.core.exit", "suspend");
        _scorm.api.LMSFinish("");
      }
    });
  </script>

  <!-- React app bundle (self-contained, no external deps) -->
  <script type="module" src="${jsSrc}"></script>
</body>
</html>`;
}

// ── Add dist/spa folder recursively (except imsmanifest + index.html) ────────
function addFolder(archive, dirPath, zipBase) {
  const entries = readdirSync(dirPath);
  for (const entry of entries) {
    const full    = join(dirPath, entry);
    const zipPath = zipBase ? `${zipBase}/${entry}` : entry;
    if (statSync(full).isDirectory()) {
      addFolder(archive, full, zipPath);
    } else {
      // Skip these — we handle them separately
      if (entry === "imsmanifest.xml" || entry === "index.html") continue;
      archive.file(full, { name: zipPath });
    }
  }
}

// ── Build ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log("Génération SCORM autonome pour 360Learning — " + MODULE_ID + "...\n");

  // Verify build exists
  try { statSync(DIST); } catch {
    console.error("Build client introuvable. Lancez d'abord: npm run build:client");
    process.exit(1);
  }

  mkdirSync(OUTPUT_DIR, { recursive: true });

  const output  = createWriteStream(OUTPUT_FILE);
  const archive = archiver("zip", { zlib: { level: 6 } });

  await new Promise((resolve, reject) => {
    output.on("close", resolve);
    archive.on("error", reject);
    archive.pipe(output);

    // 1. imsmanifest.xml at ZIP root (required by SCORM)
    archive.append(manifest, { name: "imsmanifest.xml" });

    // 2. Custom scorm-entry.html (sets initial route + SCORM init)
    archive.append(buildScormEntry(), { name: "scorm-entry.html" });

    // 3. All compiled assets (JS, CSS, images, etc.)
    addFolder(archive, DIST, "");

    archive.finalize();
  });

  const size = statSync(OUTPUT_FILE).size;
  const mb   = (size / 1024 / 1024).toFixed(2);

  console.log("Package SCORM genere : " + OUTPUT_FILE);
  console.log("Taille              : " + mb + " MB");
  console.log("Compatibilite       : 360Learning, Moodle, SuccessFactors, Cornerstone");
  console.log("\nProcedure 360Learning :");
  console.log("  Catalogue > Ajouter un module > eLearning standard > importer ce ZIP");
}

main().catch(err => { console.error("Erreur:", err); process.exit(1); });
