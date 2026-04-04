import { readFileSync, writeFileSync } from 'fs';

const content = readFileSync('client/lib/courseData.ts', 'utf8');

const pretests = {
  'ch1-m1': `    preTest: [
      {
        question: "Face à une légère odeur de brûlé dans votre open space, vous :",
        choices: [
          { key: "A", label: "Ignorez — c'est probablement la cuisine" },
          { key: "B", label: "Identifiez et alertez immédiatement" },
          { key: "C", label: "Attendez que d'autres réagissent" },
        ],
        correctKey: "B",
      },
      {
        question: "Quels signaux peuvent indiquer un départ de feu ?",
        choices: [
          { key: "A", label: "Flammes visibles uniquement" },
          { key: "B", label: "Fumée, odeur, chaleur anormale ou grésil" },
          { key: "C", label: "Uniquement l'alarme automatique" },
        ],
        correctKey: "B",
      },
    ],
`,
  'ch1-m2': `    preTest: [
      {
        question: "Le triangle du feu est composé de :",
        choices: [
          { key: "A", label: "Fumée, flamme et chaleur" },
          { key: "B", label: "Combustible, comburant et chaleur" },
          { key: "C", label: "Eau, air et feu" },
        ],
        correctKey: "B",
      },
      {
        question: "Pour éteindre un feu, il faut :",
        choices: [
          { key: "A", label: "Verser de l'eau dans tous les cas" },
          { key: "B", label: "Supprimer au moins un des 3 éléments du triangle" },
          { key: "C", label: "Attendre les pompiers" },
        ],
        correctKey: "B",
      },
    ],
`,
  'ch1-m3': `    preTest: [
      {
        question: "Fermer les portes lors d'un incendie :",
        choices: [
          { key: "A", label: "N'a aucun effet sur la propagation" },
          { key: "B", label: "Ralentit la propagation du feu et de la fumée" },
          { key: "C", label: "Aggrave l'incendie" },
        ],
        correctKey: "B",
      },
      {
        question: "Lors d'une évacuation, il est correct de :",
        choices: [
          { key: "A", label: "Courir vers la sortie la plus proche" },
          { key: "B", label: "Marcher calmement, sans prendre l'ascenseur" },
          { key: "C", label: "Ouvrir toutes les fenêtres pour aérer" },
        ],
        correctKey: "B",
      },
    ],
`,
  'ch1-m4': `    preTest: [
      {
        question: "Un feu électrique (câble, serveur) doit être éteint avec :",
        choices: [
          { key: "A", label: "De l'eau" },
          { key: "B", label: "Un extincteur CO2 uniquement" },
          { key: "C", label: "N'importe quel extincteur" },
        ],
        correctKey: "B",
      },
      {
        question: "La classe B d'incendie concerne :",
        choices: [
          { key: "A", label: "Les feux de papier et bois" },
          { key: "B", label: "Les feux de liquides inflammables" },
          { key: "C", label: "Les métaux en combustion" },
        ],
        correctKey: "B",
      },
    ],
`,
  'ch1-m5': `    preTest: [
      {
        question: "La première étape de la séquence PASS est :",
        choices: [
          { key: "A", label: "Presser la poignée de déclenchement" },
          { key: "B", label: "Tirer la goupille de sécurité" },
          { key: "C", label: "Viser la base des flammes" },
        ],
        correctKey: "B",
      },
      {
        question: "La distance optimale d'utilisation d'un extincteur est :",
        choices: [
          { key: "A", label: "Moins d'1 mètre" },
          { key: "B", label: "2 à 3 mètres" },
          { key: "C", label: "Plus de 5 mètres" },
        ],
        correctKey: "B",
      },
    ],
`,
  'ch1-m6': `    preTest: [
      {
        question: "IBM impose de décider d'intervenir ou évacuer en :",
        choices: [
          { key: "A", label: "5 minutes" },
          { key: "B", label: "10 secondes" },
          { key: "C", label: "1 minute" },
        ],
        correctKey: "B",
      },
      {
        question: "Vous DEVEZ évacuer si :",
        choices: [
          { key: "A", label: "Le feu est limité à une corbeille" },
          { key: "B", label: "La fumée est épaisse ou la porte est chaude" },
          { key: "C", label: "Vous avez un extincteur disponible" },
        ],
        correctKey: "B",
      },
    ],
`,
  'ch1-m7': `    preTest: [
      {
        question: "En déclenchant l'alarme IBM, vous composez EN PREMIER :",
        choices: [
          { key: "A", label: "Le 18 (pompiers)" },
          { key: "B", label: "Le 22 22 (sécurité IBM)" },
          { key: "C", label: "Le 15 (SAMU)" },
        ],
        correctKey: "B",
      },
      {
        question: "Les 3 réflexes IBM dans l'ordre sont :",
        choices: [
          { key: "A", label: "Évacuer → Alarme → Débrancher" },
          { key: "B", label: "Débrancher → Alarme (22 22) → Évacuer" },
          { key: "C", label: "Alarme → Débrancher → Appeler le 18" },
        ],
        correctKey: "B",
      },
    ],
`,
  'ch2-m1': `    preTest: [
      {
        question: "À quel moment déclencher l'alarme incendie ?",
        choices: [
          { key: "A", label: "Seulement si les flammes sont visibles" },
          { key: "B", label: "Dès qu'un signe de feu est détecté, sans attendre" },
          { key: "C", label: "Après avoir prévenu son responsable" },
        ],
        correctKey: "B",
      },
      {
        question: "Un déclencheur manuel d'alarme est :",
        choices: [
          { key: "A", label: "Utilisé uniquement par la sécurité" },
          { key: "B", label: "Accessible à tous les collaborateurs" },
          { key: "C", label: "Réservé aux exercices d'évacuation" },
        ],
        correctKey: "B",
      },
    ],
`,
  'ch2-m2': `    preTest: [
      {
        question: "Face à des collègues paniqués, votre rôle est :",
        choices: [
          { key: "A", label: "D'évacuer sans s'occuper des autres" },
          { key: "B", label: "De parler calmement et guider vers la sortie" },
          { key: "C", label: "D'attendre les instructions de la direction" },
        ],
        correctKey: "B",
      },
      {
        question: "Un ton calme et ferme durant une évacuation :",
        choices: [
          { key: "A", label: "Augmente la panique" },
          { key: "B", label: "Réduit la panique et facilite l'évacuation" },
          { key: "C", label: "N'a pas d'effet sur le comportement" },
        ],
        correctKey: "B",
      },
    ],
`,
  'ch2-m3': `    preTest: [
      {
        question: "Fermer une porte durant un incendie peut :",
        choices: [
          { key: "A", label: "Piéger les personnes à l'intérieur" },
          { key: "B", label: "Retarder la propagation du feu de plusieurs minutes" },
          { key: "C", label: "Couper l'oxygène et éteindre le feu" },
        ],
        correctKey: "B",
      },
      {
        question: "En quittant une pièce lors d'une évacuation :",
        choices: [
          { key: "A", label: "Laisser la porte ouverte pour ventiler" },
          { key: "B", label: "Fermer la porte sans la verrouiller" },
          { key: "C", label: "Verrouiller la porte à clé" },
        ],
        correctKey: "B",
      },
    ],
`,
  'ch2-m4': `    preTest: [
      {
        question: "Avant de quitter définitivement un étage :",
        choices: [
          { key: "A", label: "Partir rapidement sans vérifier" },
          { key: "B", label: "Vérifier rapidement que personne ne reste" },
          { key: "C", label: "Attendre que l'alarme s'arrête" },
        ],
        correctKey: "B",
      },
      {
        question: "Les personnes non évacuées se signalent :",
        choices: [
          { key: "A", label: "Par SMS à son responsable" },
          { key: "B", label: "Au responsable évacuation au point de rassemblement" },
          { key: "C", label: "En appelant le 18" },
        ],
        correctKey: "B",
      },
    ],
`,
  'ch2-m5': `    preTest: [
      {
        question: "Face à une zone enfumée, la bonne position est :",
        choices: [
          { key: "A", label: "Debout, tête haute pour voir devant soi" },
          { key: "B", label: "Accroupi ou à quatre pattes, sous le niveau de fumée" },
          { key: "C", label: "Allongé sur le sol, immobile" },
        ],
        correctKey: "B",
      },
      {
        question: "Obstruer le bas d'une porte avec un tissu :",
        choices: [
          { key: "A", label: "Empêche l'oxygène de sortir" },
          { key: "B", label: "Ralentit la pénétration de fumée dans la pièce" },
          { key: "C", label: "N'a aucun effet" },
        ],
        correctKey: "B",
      },
    ],
`,
  'ch2-m6': `    preTest: [
      {
        question: "En cas d'incendie, vous vous déplacez via :",
        choices: [
          { key: "A", label: "L'ascenseur — plus rapide" },
          { key: "B", label: "L'escalier de secours désigné" },
          { key: "C", label: "La fenêtre la plus proche" },
        ],
        correctKey: "B",
      },
      {
        question: "Un espace sécurisé (refuge) est :",
        choices: [
          { key: "A", label: "N'importe quelle pièce fermée" },
          { key: "B", label: "Une zone définie, protégée, avec communication vers les secours" },
          { key: "C", label: "Une sortie de secours bloquée" },
        ],
        correctKey: "B",
      },
    ],
`,
  'ch2-m7': `    preTest: [
      {
        question: "La séquence d'évacuation IBM est :",
        choices: [
          { key: "A", label: "SORS — SIGNALE — FERME" },
          { key: "B", label: "SORS — FERME — SIGNALE" },
          { key: "C", label: "FERME — SORS — SIGNALE" },
        ],
        correctKey: "B",
      },
      {
        question: "Au point de rassemblement, vous devez :",
        choices: [
          { key: "A", label: "Rentrer chez vous immédiatement" },
          { key: "B", label: "Vous signaler au responsable évacuation" },
          { key: "C", label: "Retourner chercher vos affaires" },
        ],
        correctKey: "B",
      },
    ],
`,
};

const lines = content.split('\n');
const result = [];
let currentModuleId = null;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const idMatch = line.match(/\s+id:\s*"(ch[12]-m\d+)"/);
  if (idMatch) currentModuleId = idMatch[1];

  if (/^    content:\s*\[/.test(line) && currentModuleId && pretests[currentModuleId]) {
    const recent = result.slice(-10).join('\n');
    if (!recent.includes('preTest:')) {
      result.push(pretests[currentModuleId]);
    }
    currentModuleId = null;
  }
  result.push(line);
}

writeFileSync('client/lib/courseData.ts', result.join('\n'), 'utf8');
console.log('preTest blocks inserted for all 14 modules.');
