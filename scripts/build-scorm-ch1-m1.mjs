/**
 * build-scorm-ch1-m1.mjs
 * Génère un package SCORM 1.2 pour le module ch1-m1
 * "Comprendre un départ de feu"
 *
 * Usage: node scripts/build-scorm-ch1-m1.mjs
 * Résultat: scorm-packages/ch1-m1-comprendre-depart-feu.zip
 */

import { mkdirSync } from "fs";
import { createWriteStream } from "fs";
import archiver from "archiver";

// ── Config ───────────────────────────────────────────────────────────────────
const MODULE_ID       = "ch1-m1";
const MODULE_TITLE_FR = "Comprendre un départ de feu";
const NETLIFY_BASE    = "https://ibm-demo2.netlify.app";
const MODULE_URL      = `${NETLIFY_BASE}/module/${MODULE_ID}?scorm=1`;
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
        <adlcp:datafromlms></adlcp:datafromlms>
        <adlcp:timeLimitAction>continue,no message</adlcp:timeLimitAction>
      </item>
    </organization>
  </organizations>
  <resources>
    <resource identifier="RES_CH1_M1" type="webcontent" adlcp:scormtype="sco" href="index.html">
      <file href="index.html"/>
    </resource>
  </resources>
</manifest>`;

// ── index.html (SCO entry point) ─────────────────────────────────────────────
const indexHtml = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${MODULE_TITLE_FR} — IBM Formation Sécurité Incendie</title>
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    html,body{width:100%;height:100%;background:#050a1a;font-family:'Segoe UI',Arial,sans-serif;overflow:hidden}

    /* ── Loading screen ── */
    #splash{
      position:fixed;inset:0;
      display:flex;flex-direction:column;align-items:center;justify-content:center;
      background:linear-gradient(135deg,#050a1a 0%,#0a1535 100%);
      color:#fff;z-index:100;transition:opacity .5s;
    }
    #splash .logo{font-size:2.5rem;font-weight:900;letter-spacing:.12em;color:#0f62fe;margin-bottom:.5rem}
    #splash .sub{font-size:.7rem;letter-spacing:.15em;text-transform:uppercase;color:rgba(255,255,255,.4);margin-bottom:2.5rem}
    #splash .module-title{font-size:1.05rem;font-weight:700;color:rgba(255,255,255,.9);margin-bottom:2rem;text-align:center;padding:0 2rem}
    #splash .bar-wrap{width:220px;height:3px;background:rgba(15,98,254,.2);border-radius:2px;overflow:hidden;margin-bottom:2.5rem}
    #splash .bar{height:100%;width:0;background:#0f62fe;border-radius:2px;transition:width .3s}
    #splash .hint{font-size:.72rem;color:rgba(255,255,255,.35);text-align:center;max-width:260px;line-height:1.5}
    #splash.hide{opacity:0;pointer-events:none}

    /* ── Fallback (shown if iframe blocked) ── */
    #fallback{
      position:fixed;inset:0;
      display:none;flex-direction:column;align-items:center;justify-content:center;
      background:#050a1a;color:#fff;padding:2rem;text-align:center;
    }
    #fallback .logo{font-size:2rem;font-weight:900;letter-spacing:.12em;color:#0f62fe;margin-bottom:.5rem}
    #fallback h2{font-size:1.1rem;margin-bottom:1rem;color:rgba(255,255,255,.9)}
    #fallback p{font-size:.82rem;color:rgba(255,255,255,.5);margin-bottom:1.5rem;line-height:1.6;max-width:320px}
    #fallback a{
      display:inline-block;background:#0043ce;color:#fff;text-decoration:none;
      padding:.7rem 1.8rem;border-radius:.5rem;font-weight:700;font-size:.85rem;
    }
    #fallback a:hover{background:#0f62fe}

    /* ── iframe ── */
    #frame{
      position:fixed;inset:0;width:100%;height:100%;border:none;
      opacity:0;transition:opacity .5s;
    }
    #frame.show{opacity:1}
  </style>
</head>
<body>

<!-- Loading splash -->
<div id="splash">
  <div class="logo">IBM</div>
  <div class="sub">Formation Sécurité Incendie</div>
  <div class="module-title">${MODULE_TITLE_FR}</div>
  <div class="bar-wrap"><div class="bar" id="bar"></div></div>
  <div class="hint">Chargement du module en cours…</div>
</div>

<!-- Direct link fallback (if iframe is blocked) -->
<div id="fallback">
  <div class="logo">IBM</div>
  <h2>${MODULE_TITLE_FR}</h2>
  <p>Votre navigateur ne peut pas afficher ce module directement.<br>
     Cliquez sur le bouton ci-dessous pour ouvrir la formation dans un nouvel onglet.</p>
  <a href="${MODULE_URL}" target="_blank" rel="noopener">Ouvrir la formation →</a>
</div>

<!-- Module iframe -->
<iframe id="frame" src="${MODULE_URL}" allow="autoplay; fullscreen; camera; microphone" allowfullscreen></iframe>

<script>
/* ════════════════════════════════════════════════
   SCORM 1.2 — API discovery + session management
   ════════════════════════════════════════════════ */
var scorm = {
  api: null,
  initialized: false,

  findAPI: function(win) {
    var tries = 0;
    while (tries < 7) {
      try { if (win.API) return win.API; } catch(e) { break; }
      if (!win.parent || win.parent === win) break;
      win = win.parent; tries++;
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
      if (r === "true" || r === true) {
        this.initialized = true;
        this.api.LMSSetValue("cmi.core.lesson_status", "incomplete");
        this.api.LMSSetValue("cmi.core.entry", "ab-initio");
        this.api.LMSCommit("");
        console.log("[SCORM] Initialisé");
      }
    } else {
      console.log("[SCORM] Hors LMS — mode standalone");
    }
  },

  setValue: function(key, val) {
    if (this.initialized) { this.api.LMSSetValue(key, val); this.api.LMSCommit(""); }
  },

  finish: function(score) {
    if (!this.initialized) return;
    score = score || 0;
    this.api.LMSSetValue("cmi.core.score.raw", String(score));
    this.api.LMSSetValue("cmi.core.score.min", "0");
    this.api.LMSSetValue("cmi.core.score.max", "100");
    this.api.LMSSetValue("cmi.core.lesson_status", score >= 80 ? "passed" : "failed");
    this.api.LMSCommit("");
    this.api.LMSFinish("");
    this.initialized = false;
    console.log("[SCORM] Terminé, score:", score);
  }
};

/* ════════════════════════════════════════
   UI — loading bar + iframe reveal
   ════════════════════════════════════════ */
var splash = document.getElementById("splash");
var frame  = document.getElementById("frame");
var bar    = document.getElementById("bar");
var fallbackDiv = document.getElementById("fallback");

// Animate loading bar
var pct = 0;
var ticker = setInterval(function() {
  pct = Math.min(pct + (Math.random() * 12), 85);
  bar.style.width = pct + "%";
}, 250);

var frameLoaded = false;
var fallbackTimer = setTimeout(function() {
  // If iframe hasn't loaded in 8s → show fallback
  if (!frameLoaded) {
    clearInterval(ticker);
    splash.style.display = "none";
    fallbackDiv.style.display = "flex";
  }
}, 8000);

frame.addEventListener("load", function() {
  frameLoaded = true;
  clearTimeout(fallbackTimer);
  clearInterval(ticker);
  bar.style.width = "100%";
  setTimeout(function() {
    frame.classList.add("show");
    splash.classList.add("hide");
    setTimeout(function() { splash.style.display = "none"; }, 500);
  }, 300);
});

/* ════════════════════════════════════════
   Messages from React app → SCORM
   ════════════════════════════════════════ */
window.addEventListener("message", function(e) {
  if (!e.data || typeof e.data !== "object") return;
  var d = e.data;
  if (d.type !== "scorm") return;

  if (d.action === "complete") {
    scorm.finish(d.score != null ? d.score : 100);
  }
  if (d.action === "suspend") {
    scorm.setValue("cmi.suspend_data", JSON.stringify(d.data || {}));
    scorm.setValue("cmi.core.lesson_status", "incomplete");
  }
  if (d.action === "progress") {
    scorm.setValue("cmi.suspend_data", JSON.stringify(d.data || {}));
  }
});

/* ════════════════════════════
   Init + cleanup
   ════════════════════════════ */
window.addEventListener("load", function() { scorm.init(); });
window.addEventListener("beforeunload", function() {
  if (scorm.initialized) {
    scorm.api.LMSSetValue("cmi.core.exit", "suspend");
    scorm.api.LMSFinish("");
  }
});
</script>
</body>
</html>`;

// ── Build ZIP ─────────────────────────────────────────────────────────────────
async function main() {
  console.log("Génération du package SCORM 1.2 — " + MODULE_ID + "...\n");

  mkdirSync(OUTPUT_DIR, { recursive: true });

  const output  = createWriteStream(OUTPUT_FILE);
  const archive = archiver("zip", { zlib: { level: 9 } });

  await new Promise((resolve, reject) => {
    output.on("close", resolve);
    archive.on("error", reject);
    archive.pipe(output);

    // imsmanifest.xml MUST be at ZIP root
    archive.append(manifest,   { name: "imsmanifest.xml" });
    archive.append(indexHtml,  { name: "index.html"      });

    archive.finalize();
  });

  const stats = (await import("fs")).statSync(OUTPUT_FILE);
  const kb = (stats.size / 1024).toFixed(1);

  console.log("Package genere : " + OUTPUT_FILE + " (" + kb + " KB)");
  console.log("URL du module  : " + MODULE_URL);
  console.log("\nImportez ce ZIP dans votre LMS SCORM 1.2 compatible.");
  console.log("Score de validation : 80/100");
}

main().catch(err => { console.error("Erreur:", err); process.exit(1); });
