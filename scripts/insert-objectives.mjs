import { readFileSync, writeFileSync } from "fs";

const file = "client/lib/courseData.ts";
let src = readFileSync(file, "utf8");

// Map of moduleId → learningObjectives
const objectives = {
  "ch1-m1": {
    savoir: "Les signes d'un départ de feu et le fonctionnement des détecteurs incendie IBM",
    savoirFaire: "Identifier un départ de feu et déclencher l'alerte au 22 22 sans délai",
    savoirEtre: "Traiter tout signal comme une urgence réelle — jamais sous-estimer une alarme",
  },
  "ch1-m2": {
    savoir: "Les trois composants du triangle du feu : combustible, comburant, chaleur",
    savoirFaire: "Supprimer un élément du triangle pour éteindre ou prévenir un incendie",
    savoirEtre: "Anticiper les risques et ne jamais créer de conditions propices au feu",
  },
  "ch1-m3": {
    savoir: "La vitesse de propagation du feu et le rôle coupe-feu des portes",
    savoirFaire: "Fermer toutes les portes en quittant une zone et confiner l'incendie",
    savoirEtre: "Agir méthodiquement sans courir, même sous pression",
  },
  "ch1-m4": {
    savoir: "Les classes de feu (A, B, C, D, F) et les extincteurs adaptés à chacune",
    savoirFaire: "Choisir et utiliser l'extincteur correct selon la nature du feu",
    savoirEtre: "Ne jamais improviser — utiliser le mauvais agent peut aggraver l'incendie",
  },
  "ch1-m5": {
    savoir: "La séquence PASS (Pull · Aim · Squeeze · Sweep) et la distance d'intervention",
    savoirFaire: "Utiliser un extincteur CO2 ou poudre ABC de façon sécurisée à 2–3 mètres",
    savoirEtre: "Maintenir une sortie dans le dos et ne jamais mettre sa vie en danger",
  },
  "ch1-m6": {
    savoir: "Les critères qui déterminent si on intervient ou si on évacue",
    savoirFaire: "Appliquer la règle des 10 secondes : observer, évaluer, décider",
    savoirEtre: "En cas de doute, toujours privilégier l'évacuation sans hésitation",
  },
  "ch1-m7": {
    savoir: "La procédure complète de gestion d'un incendie en environnement IBM",
    savoirFaire: "Enchaîner : détecter → alarme 22 22 → évaluer → intervenir ou évacuer",
    savoirEtre: "Garder son sang-froid et coordonner ses actions sous pression chronométrée",
  },
  "ch2-m1": {
    savoir: "Les types d'alarmes incendie IBM et les numéros d'urgence à connaître",
    savoirFaire: "Activer un déclencheur manuel et appeler le 22 22 avec les bons éléments",
    savoirEtre: "Alerter immédiatement sans chercher à éteindre soi-même dans le doute",
  },
  "ch2-m2": {
    savoir: "Les techniques de communication et de leadership en situation de crise",
    savoirFaire: "Guider calmement des collègues paniqués vers les sorties de secours",
    savoirEtre: "Adopter une posture ferme, rassurante et orientée vers l'action",
  },
  "ch2-m3": {
    savoir: "La séquence SORS-FERME-SIGNALE et son impact sur la propagation",
    savoirFaire: "Fermer systématiquement chaque porte en quittant les locaux",
    savoirEtre: "Appliquer la procédure sans exception, même en situation de stress",
  },
  "ch2-m4": {
    savoir: "La méthode de vérification rapide d'une zone avant évacuation définitive",
    savoirFaire: "Balayer visuellement un espace et signaler toute présence au responsable",
    savoirEtre: "Ne laisser personne derrière — sans jamais mettre sa propre vie en danger",
  },
  "ch2-m5": {
    savoir: "Le comportement de la fumée, sa toxicité et ses effets sur l'organisme",
    savoirFaire: "Se déplacer en position basse et protéger ses voies respiratoires",
    savoirEtre: "Résister à la panique et garder un rythme lent et contrôlé",
  },
  "ch2-m6": {
    savoir: "Les règles d'évacuation verticale et les espaces d'attente sécurisés",
    savoirFaire: "Emprunter uniquement les escaliers de secours — jamais l'ascenseur",
    savoirEtre: "Respecter les files, ne pas se précipiter, aider les personnes à mobilité réduite",
  },
  "ch2-m7": {
    savoir: "La procédure complète d'évacuation IBM de A à Z",
    savoirFaire: "Exécuter toutes les étapes dans l'ordre correct sous contrainte de temps",
    savoirEtre: "Coordination, sens des responsabilités et leadership en situation réelle",
  },
};

let count = 0;

for (const [moduleId, obj] of Object.entries(objectives)) {
  // Find the module by its id field and insert learningObjectives after objective
  // We look for: id: "ch1-m1", ... objective: "...",
  // and insert learningObjectives after objective line
  const idPattern = new RegExp(
    `(id:\\s*["']${moduleId}["'][\\s\\S]*?objective:\\s*["'][^"']*["'],)`,
    "m"
  );

  if (!idPattern.test(src)) {
    console.warn(`Pattern not found for ${moduleId}`);
    continue;
  }

  // Check if learningObjectives already exists for this module
  // Find the position of the module and check nearby content
  const idIdx = src.indexOf(`id: "${moduleId}"`);
  if (idIdx === -1) {
    console.warn(`Module ${moduleId} not found`);
    continue;
  }

  // Find the objective line after this id
  const objectiveIdx = src.indexOf("objective:", idIdx);
  if (objectiveIdx === -1) continue;

  // Find end of objective line (after the closing quote + comma)
  const objLineEnd = src.indexOf("\n", objectiveIdx);
  const nextChunk = src.slice(objectiveIdx, objLineEnd + 200);

  // Check if learningObjectives already injected
  if (nextChunk.includes("learningObjectives")) {
    console.log(`${moduleId}: already has learningObjectives, skipping`);
    continue;
  }

  const insertion = `
    learningObjectives: {
      savoir: "${obj.savoir}",
      savoirFaire: "${obj.savoirFaire}",
      savoirEtre: "${obj.savoirEtre}",
    },`;

  // Insert after the objective line
  src = src.slice(0, objLineEnd) + insertion + src.slice(objLineEnd);
  count++;
  console.log(`Inserted learningObjectives for ${moduleId}`);
}

writeFileSync(file, src, "utf8");
console.log(`\nDone! Inserted ${count} learningObjectives blocks.`);
