/**
 * build-scorm-test-minimal.mjs
 * Package SCORM de test ultra-minimal pour 360Learning
 * Aucune dépendance React, juste du HTML pur
 */

import { mkdirSync } from "fs";
import { createWriteStream } from "fs";
import { statSync } from "fs";
import archiver from "archiver";

const OUTPUT_DIR  = "scorm-packages";
const OUTPUT_FILE = `${OUTPUT_DIR}/test-minimal-scorm.zip`;

const manifest = `<?xml version="1.0" encoding="UTF-8"?>
<manifest identifier="TEST_MINIMAL_SCORM" version="1"
  xmlns="http://www.imsproject.org/xsd/imscp_rootv1p1p2"
  xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_rootv1p2"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.imsproject.org/xsd/imscp_rootv1p1p2 imscp_rootv1p1p2.xsd http://www.adlnet.org/xsd/adlcp_rootv1p2 adlcp_rootv1p2.xsd">
  <metadata>
    <schema>ADL SCORM</schema>
    <schemaversion>1.2</schemaversion>
  </metadata>
  <organizations default="ORG1">
    <organization identifier="ORG1">
      <title>Test SCORM Minimal</title>
      <item identifier="ITEM1" identifierref="RES1">
        <title>Test Module</title>
        <adlcp:masteryscore>80</adlcp:masteryscore>
      </item>
    </organization>
  </organizations>
  <resources>
    <resource identifier="RES1" type="webcontent" adlcp:scormtype="sco" href="index.html">
      <file href="index.html"/>
    </resource>
  </resources>
</manifest>`;

const indexHtml = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8"/>
  <title>Test SCORM</title>
  <style>
    body { font-family: Arial, sans-serif; background: #f0f4ff; display:flex; align-items:center; justify-content:center; min-height:100vh; margin:0; }
    .box { background:#fff; border-radius:12px; padding:2rem 3rem; text-align:center; box-shadow:0 4px 20px rgba(0,0,0,.1); max-width:400px; }
    h1 { color:#0043ce; font-size:1.4rem; margin-bottom:1rem; }
    p  { color:#555; font-size:.9rem; line-height:1.6; margin-bottom:1.5rem; }
    button { background:#0043ce; color:#fff; border:none; padding:.7rem 2rem; border-radius:.5rem; font-size:1rem; cursor:pointer; }
    button:hover { background:#0f62fe; }
    .status { margin-top:1rem; font-size:.8rem; color:#888; }
    .ok { color:#198038; font-weight:bold; }
  </style>
</head>
<body>
<div class="box">
  <h1>IBM Sécurité Incendie</h1>
  <p>Test de compatibilité SCORM 1.2</p>
  <button onclick="complete()">Terminer le module</button>
  <div class="status" id="status">En attente...</div>
</div>
<script>
var api = null;
function findAPI(w) {
  var n = 0;
  while(n<7){ try{if(w.API)return w.API;}catch(e){return null;} if(!w.parent||w.parent===w)break; w=w.parent; n++; }
  return null;
}
window.onload = function() {
  api = findAPI(window);
  if(!api && window.opener){ try{api=findAPI(window.opener);}catch(e){} }
  if(api){
    api.LMSInitialize("");
    api.LMSSetValue("cmi.core.lesson_status","incomplete");
    api.LMSCommit("");
    document.getElementById("status").textContent = "SCORM API détectée ✓";
  } else {
    document.getElementById("status").textContent = "Hors LMS (pas de SCORM API)";
  }
};
function complete() {
  if(api){
    api.LMSSetValue("cmi.core.score.raw","100");
    api.LMSSetValue("cmi.core.score.min","0");
    api.LMSSetValue("cmi.core.score.max","100");
    api.LMSSetValue("cmi.core.lesson_status","passed");
    api.LMSCommit("");
    api.LMSFinish("");
    document.getElementById("status").innerHTML = '<span class="ok">Module terminé ✓ Score: 100/100</span>';
  } else {
    document.getElementById("status").innerHTML = '<span class="ok">Simulé (standalone) ✓</span>';
  }
}
window.onbeforeunload = function(){ if(api){ api.LMSSetValue("cmi.core.exit","suspend"); api.LMSFinish(""); } };
</script>
</body>
</html>`;

async function main() {
  console.log("Génération SCORM test minimal...");
  mkdirSync(OUTPUT_DIR, { recursive: true });

  const output  = createWriteStream(OUTPUT_FILE);
  const archive = archiver("zip", { zlib: { level: 9 } });

  await new Promise((resolve, reject) => {
    output.on("close", resolve);
    archive.on("error", reject);
    archive.pipe(output);
    archive.append(manifest,   { name: "imsmanifest.xml" });
    archive.append(indexHtml,  { name: "index.html"      });
    archive.finalize();
  });

  const kb = (statSync(OUTPUT_FILE).size / 1024).toFixed(1);
  console.log("Genere : " + OUTPUT_FILE + " (" + kb + " KB)");
  console.log("\nImportez ce ZIP dans 360Learning pour tester la compatibilite.");
  console.log("Si ce test echoue aussi -> probleme de workflow 360Learning");
  console.log("Si ce test reussit -> probleme avec notre bundle React");
}

main().catch(err => { console.error(err); process.exit(1); });
