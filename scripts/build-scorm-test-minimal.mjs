/**
 * build-scorm-test-minimal.mjs
 * SCORM 1.2 test — format exact compatible 360Learning
 * Basé sur l'analyse du manifest qui fonctionne
 */

import { mkdirSync } from "fs";
import { createWriteStream, statSync } from "fs";
import archiver from "archiver";

const OUTPUT_DIR  = "scorm-packages";
const OUTPUT_FILE = `${OUTPUT_DIR}/test-minimal-scorm.zip`;

// Format EXACT identique au manifest qui marche dans 360Learning :
// - version="1.2" sur <manifest> (pas "1" ni "1.0")
// - isvisible="true" sur <item>
// - xsi:schemaLocation présent
// - PAS de imsmd:lom
const manifest = `<?xml version="1.0" encoding="UTF-8"?>
<manifest identifier="IBM_FIRE_TEST_MINIMAL" version="1.2"
  xmlns="http://www.imsproject.org/xsd/imscp_rootv1p1p2"
  xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_rootv1p2"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.imsproject.org/xsd/imscp_rootv1p1p2 imscp_rootv1p1p2.xsd
                      http://www.adlnet.org/xsd/adlcp_rootv1p2 adlcp_rootv1p2.xsd">

  <metadata>
    <schema>ADL SCORM</schema>
    <schemaversion>1.2</schemaversion>
  </metadata>

  <organizations default="ORG_IBM_FIRE_TEST">
    <organization identifier="ORG_IBM_FIRE_TEST">
      <title>IBM Sécurité Incendie — Test Minimal</title>
      <item identifier="ITEM_SCO_IBM_FIRE_TEST" identifierref="SCO_IBM_FIRE_TEST" isvisible="true">
        <title>Test SCORM / SCORM Test</title>
        <adlcp:masteryscore>80</adlcp:masteryscore>
      </item>
    </organization>
  </organizations>

  <resources>
    <resource identifier="SCO_IBM_FIRE_TEST" type="webcontent" adlcp:scormtype="sco" href="index.html">
      <file href="index.html"/>
    </resource>
  </resources>

</manifest>`;

const indexHtml = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Test SCORM IBM</title>
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{font-family:Arial,sans-serif;background:#f0f4ff;display:flex;align-items:center;justify-content:center;min-height:100vh}
    .card{background:#fff;border-radius:12px;padding:2.5rem;text-align:center;box-shadow:0 4px 24px rgba(0,67,206,.12);max-width:420px;width:90%}
    .logo{font-size:2rem;font-weight:900;color:#0043ce;letter-spacing:.1em;margin-bottom:.3rem}
    h1{font-size:1.1rem;color:#1a1a2e;margin-bottom:.5rem}
    p{font-size:.85rem;color:#666;line-height:1.6;margin-bottom:1.5rem}
    .status{font-size:.78rem;color:#888;margin-bottom:1.5rem;padding:.5rem;background:#f8f9fa;border-radius:.4rem}
    .ok{color:#198038;font-weight:700}
    .err{color:#da1e28;font-weight:700}
    button{background:#0043ce;color:#fff;border:none;padding:.75rem 2rem;border-radius:.5rem;font-size:.95rem;font-weight:700;cursor:pointer;width:100%}
    button:hover{background:#0f62fe}
    button:disabled{background:#c0c0c0;cursor:default}
  </style>
</head>
<body>
<div class="card">
  <div class="logo">IBM</div>
  <h1>Test de compatibilité SCORM 1.2</h1>
  <p>Ce module valide que votre LMS accepte nos packages SCORM IBM.</p>
  <div class="status" id="st">Initialisation...</div>
  <button id="btn" onclick="finish()" disabled>Valider et terminer</button>
</div>
<script>
var api = null;
function findAPI(w) {
  var n = 0;
  while (n < 7) {
    try { if (w.API) return w.API; } catch(e) { return null; }
    if (!w.parent || w.parent === w) break;
    w = w.parent; n++;
  }
  return null;
}
function init() {
  api = findAPI(window);
  if (!api && window.opener) { try { api = findAPI(window.opener); } catch(e) {} }
  var st = document.getElementById("st");
  var btn = document.getElementById("btn");
  if (api) {
    var r = api.LMSInitialize("");
    if (r === "true" || r === true) {
      api.LMSSetValue("cmi.core.lesson_status", "incomplete");
      api.LMSSetValue("cmi.core.entry", "ab-initio");
      api.LMSCommit("");
      st.innerHTML = '<span class="ok">✓ SCORM API détectée — session ouverte</span>';
    } else {
      st.innerHTML = '<span class="err">✗ LMSInitialize a échoué</span>';
    }
  } else {
    st.innerHTML = 'Hors LMS (standalone) — pas de SCORM API';
  }
  btn.disabled = false;
}
function finish() {
  document.getElementById("btn").disabled = true;
  var st = document.getElementById("st");
  if (api) {
    api.LMSSetValue("cmi.core.score.raw", "100");
    api.LMSSetValue("cmi.core.score.min", "0");
    api.LMSSetValue("cmi.core.score.max", "100");
    api.LMSSetValue("cmi.core.lesson_status", "passed");
    api.LMSSetValue("cmi.core.exit", "");
    api.LMSCommit("");
    api.LMSFinish("");
    st.innerHTML = '<span class="ok">✓ Module terminé — Score 100/100 — Passed</span>';
  } else {
    st.innerHTML = '<span class="ok">✓ Terminé (standalone)</span>';
  }
}
window.addEventListener("load", init);
window.addEventListener("beforeunload", function() {
  if (api) { try { api.LMSSetValue("cmi.core.exit","suspend"); api.LMSFinish(""); } catch(e){} }
});
</script>
</body>
</html>`;

async function main() {
  console.log("Génération SCORM test v3 (format exact 360Learning)...");
  mkdirSync(OUTPUT_DIR, { recursive: true });

  const output  = createWriteStream(OUTPUT_FILE);
  const archive = archiver("zip", { zlib: { level: 9 } });

  await new Promise((resolve, reject) => {
    output.on("close", resolve);
    archive.on("error", reject);
    archive.pipe(output);
    archive.append(manifest,  { name: "imsmanifest.xml" });
    archive.append(indexHtml, { name: "index.html" });
    archive.finalize();
  });

  const kb = (statSync(OUTPUT_FILE).size / 1024).toFixed(1);
  console.log("Genere : " + OUTPUT_FILE + " (" + kb + " KB)");
  console.log("Format : version=1.2 + isvisible=true + schemaLocation");
}

main().catch(err => { console.error(err); process.exit(1); });
