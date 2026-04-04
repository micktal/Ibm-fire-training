/**
 * build-scorm.mjs
 * Génère le package SCORM 1.2 prêt à uploader sur un LMS.
 *
 * Usage: node build-scorm.mjs
 * Prérequis: npm run build:client doit avoir été exécuté avant
 *
 * Résultat: ibm-fire-training-scorm.zip
 */

import { readFileSync, readdirSync, statSync, writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const JSZip = require("jszip");

const DIST = "dist/spa";
const OUTPUT_DIR = "scorm-package";
const OUTPUT = `${OUTPUT_DIR}/ibm-fire-training-scorm.zip`;

// Créer le dossier de sortie si nécessaire
mkdirSync(OUTPUT_DIR, { recursive: true });

/**
 * Ajoute récursivement un dossier dans le ZIP
 */
function addFolderToZip(zip, dirPath, zipPath = "") {
  const entries = readdirSync(dirPath);
  for (const entry of entries) {
    const fullPath = join(dirPath, entry);
    const zipEntry = zipPath ? `${zipPath}/${entry}` : entry;
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      addFolderToZip(zip, fullPath, zipEntry);
    } else {
      zip.file(zipEntry, readFileSync(fullPath));
    }
  }
}

async function main() {
  console.log("📦 Génération du package SCORM 1.2...\n");

  // Vérifier que le build client existe
  try {
    statSync(DIST);
  } catch {
    console.error(`❌ Dossier "${DIST}" introuvable.`);
    console.error('   Veuillez d\'abord exécuter : npm run build:client\n');
    process.exit(1);
  }

  const zip = new JSZip();

  // 1. Ajouter tous les fichiers du build React (index.html + assets/)
  console.log(`   ➕ Ajout du build React (${DIST}/)...`);
  addFolderToZip(zip, DIST);

  // 2. Vérifier que imsmanifest.xml est bien dans dist/spa
  //    (copié depuis public/ par Vite lors du build)
  try {
    statSync(`${DIST}/imsmanifest.xml`);
    console.log("   ✅ imsmanifest.xml détecté dans le build");
  } catch {
    // Fallback: l'ajouter depuis public/ directement
    console.log("   ⚠️  imsmanifest.xml non trouvé dans dist/spa — ajout depuis public/");
    try {
      zip.file("imsmanifest.xml", readFileSync("public/imsmanifest.xml"));
    } catch {
      console.error("   ❌ public/imsmanifest.xml introuvable !");
      process.exit(1);
    }
  }

  // 3. Générer le ZIP
  console.log(`\n   🗜️  Compression en cours...`);
  const content = await zip.generateAsync({
    type: "nodebuffer",
    compression: "DEFLATE",
    compressionOptions: { level: 6 },
  });

  writeFileSync(OUTPUT, content);
  // Copie dans public/ pour téléchargement direct via le serveur
  writeFileSync("public/ibm-fire-training-scorm.zip", content);

  const sizeMb = (content.length / 1024 / 1024).toFixed(2);
  console.log(`\n✅ Package SCORM généré avec succès !\n`);
  console.log(`   📁 Fichier : ${OUTPUT}`);
  console.log(`   📊 Taille  : ${sizeMb} MB`);
  console.log(`\n   👉 Importez ce fichier ZIP dans votre LMS (Moodle, SuccessFactors, etc.)`);
  console.log(`   👉 Score de réussite configuré à 80% (adlcp:masteryscore)\n`);
}

main().catch((err) => {
  console.error("❌ Erreur lors de la génération SCORM:", err);
  process.exit(1);
});
