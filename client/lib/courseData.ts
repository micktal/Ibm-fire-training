export interface QuizQuestion {
  id: string;
  question: string;
  context?: string;
  choices: { key: string; label: string; hint?: string }[];
  correctKey: string;
  feedbackOk: string;
  feedbackKo: string;
}

export interface ModuleContent {
  type: "intro" | "visual" | "info" | "scenario" | "list" | "casefigure" | "comparison";
  title?: string;
  body: string;
  image?: string;
  bullets?: string[];
  highlight?: string;
  // casefigure: mini case studies showing good/bad decisions
  cases?: { situation: string; action: string; result: string; correct: boolean }[];
  // comparison: do / don't side-by-side table
  doList?: string[];
  dontList?: string[];
}

export interface FunFact {
  stat: string;        // ex: "30 secondes"
  label: string;       // ex: "pour maîtriser un départ de feu"
  detail: string;      // phrase explicative
  icon: "flame" | "clock" | "alert" | "shield" | "zap" | "eye";
}

export interface PreTestQuestion {
  question: string;
  choices: { key: string; label: string }[];
  correctKey: string;
}

export interface LearningObjectives {
  savoir: string;       // connaissances théoriques
  savoirFaire: string;  // actions concrètes
  savoirEtre: string;   // comportement / posture
}

export interface CourseModule {
  id: string;
  chapter: 1 | 2;
  number: number;
  title: string;
  subtitle: string;
  description: string;
  objective: string;
  learningObjectives?: LearningObjectives;
  duration: string;
  image: string;
  videoUrl?: string;
  captionsVtt?: string;
  podcastUrl?: string;
  funFacts?: FunFact[];
  keyPoints?: string[];   // 3 bullet points shown before quiz
  preTest?: PreTestQuestion[]; // 2-question positioning test shown before module
  content: ModuleContent[];
  quiz: QuizQuestion[];
  locked: boolean;
}

// CDN base
const CDN = "https://cdn.builder.io/api/v1/image/assets%2Fd93d9a0ec7824aa1ac4d890a1f90a2ec%2F";

export const IBM_SITES = [
  "Montpellier Bellegarde (Flex)",
  "Biot",
  "Blagnac",
  "Bois-Colombes (HQ France)",
  "Bordeaux (Flex)",
  "Orléans / Charbonnière",
  "Écully - Lyon (Flex)",
  "Lille",
  "Marseille - Les Docks (Flex)",
  "Nice Méridia",
  "Noisy-le-Grand (Jupiter)",
  "Orsay / Saclay",
  "Pornichet",
  "Saint-Herblain (Flex)",
  "Strasbourg",
];

export const MODULES: CourseModule[] = [
  // ─── CHAPITRE 1 ───────────────────────────────────────────────
  {
    id: "ch1-m1",
    chapter: 1,
    number: 1,
    title: "Comprendre un départ de feu",
    subtitle: "Identifier les signaux en moins de 10 secondes",
    description:
      "Analyser des scènes montrant différents signaux : fumée légère, odeur de brûlé, bruit électrique, chaleur localisée.",
    objective: "Identifier un départ de feu en moins de 10 secondes.",
    learningObjectives: {
      savoir: "Les signes d'un départ de feu et le fonctionnement des détecteurs incendie IBM",
      savoirFaire: "Identifier un départ de feu et déclencher l'alerte au 777 sans délai",
      savoirEtre: "Traiter tout signal comme une urgence réelle — Ne jamais sous-estimer une alarme",
    },
    duration: "8 min",
    image: `${CDN}68e7b7c3ea9048b4a797a2ceacec35aa?format=webp&width=800`,
    videoUrl: "https://xnwexjnaiffdcifcnton.supabase.co/storage/v1/object/sign/video%201/Prvenir%20un%20dpart%20de%20feu%20au%20bureau.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mMWE2Y2M1ZS1kN2E2LTRjY2EtOTg1Ny1iOTc0Njg3NGQzNmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ2aWRlbyAxL1BydmVuaXIgdW4gZHBhcnQgZGUgZmV1IGF1IGJ1cmVhdS5tcDQiLCJpYXQiOjE3NzUzMzUyNTMsImV4cCI6MTgzODQwNzI1M30.KCyO1UCQfI8jNCA1LyOqAlMpzPMW2OWkPquVeo0z1bA",
    podcastUrl: "https://xnwexjnaiffdcifcnton.supabase.co/storage/v1/object/sign/video%201/podcat%20ibm.mp3?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mMWE2Y2M1ZS1kN2E2LTRjY2EtOTg1Ny1iOTc0Njg3NGQzNmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ2aWRlbyAxL3BvZGNhdCBpYm0ubXAzIiwiaWF0IjoxNzc1NDcyNjg3LCJleHAiOjE4Mzg1NDQ2ODd9.Qqc6VyyTbtdI2vTfGE_K2Nm0p9l9tUAB0yoc-l1H40I",
    captionsVtt: `WEBVTT

STYLE
::cue {
  color: white;
  background-color: rgba(56,57,67,0.64);
}

00:00:00.600 --> 00:00:01.575
Bonjour.

00:00:01.725 --> 00:00:05.579
Je suis votre formatrice pour ce module IBM Santé et Sécurité.

00:00:05.829 --> 00:00:12.563
Aujourd'hui, une question simple : si un câble prend feu sous le bureau de votre collègue en ce moment... savez-vous

00:00:12.563 --> 00:00:15.442
exactement quoi faire dans les 10 prochaines secondes ?

00:00:15.692 --> 00:00:18.014
Ce module va vous donner cette réponse.

00:00:19.214 --> 00:00:21.721
Un départ de feu se détecte avant qu'on le voit.

00:00:21.871 --> 00:00:25.215
Quatre signaux d'alerte que vous devez reconnaître immédiatement.

00:00:25.465 --> 00:00:27.740
Une — l'odeur de plastique brûlé.

00:00:27.890 --> 00:00:30.166
Deux — une fumée fine, même blanche.

00:00:30.316 --> 00:00:33.242
Trois — une chaleur anormale sur un équipement.

00:00:33.392 --> 00:00:35.667
Quatre — des grésillements électriques.

00:00:35.917 --> 00:00:37.961
Ces signaux ne sont jamais normaux.

00:00:38.111 --> 00:00:41.594
Dès que vous en détectez un : vous avez 30 secondes pour agir.

00:00:42.794 --> 00:00:47.484
Pour agir efficacement, comprendre le triangle du feu est essentiel.

00:00:47.734 --> 00:00:48.802
La Chaleur.

00:00:48.952 --> 00:00:50.067
le Combustible.

00:00:50.217 --> 00:00:51.378
et l'Oxygène.

00:00:51.528 --> 00:00:54.871
Ces trois éléments ensemble créent et entretiennent le feu.

00:00:55.021 --> 00:00:57.250
Supprimez-en un seul, puis, le feu s'éteint.

00:00:57.500 --> 00:01:01.680
Chez IBM, la règle absolue : jamais d'eau sur un feu électrique.

00:01:01.830 --> 00:01:05.731
Serveurs, câblage, data centers — CO2 uniquement.

00:01:06.932 --> 00:01:09.439
La procédure IBM en cas de départ de feu.

00:01:09.689 --> 00:01:11.361
Dix secondes d'observation.

00:01:11.511 --> 00:01:12.858
Vous localisez,

00:01:13.858 --> 00:01:15.019
vous évaluez,

00:01:16.019 --> 00:01:17.133
vous décidez.

00:01:17.383 --> 00:01:24.721
Et bien sûr composez le 777 pour prévenir le service de sécurité IBM avant le 18 et avant le 15.

00:01:25.921 --> 00:01:27.128
Un dernier point.

00:01:27.378 --> 00:01:30.489
Marc dit que sa multiprise a toujours chauffé comme ça.

00:01:30.639 --> 00:01:32.125
Que c'est normal...

00:01:32.375 --> 00:01:33.769
Ce n'est jamais normal.

00:01:33.919 --> 00:01:37.262
Un câble qui chauffe chroniquement accumule des micro-dommages.

00:01:37.656 --> 00:01:40.245
L'absence d'incident passé ne prédit pas l'avenir.

00:01:40.495 --> 00:01:45.418
Vous avez le droit — et le devoir — d'agir, même sans l'accord de votre collègue.

00:01:45.818 --> 00:01:50.926
La sécurité IBM vous y autorisera toujours si la sécurité des collaborateurs est en jeu.
`,
    funFacts: [
      { stat: "90 secondes", label: "pour doubler de taille", detail: "Un départ de feu double de volume toutes les 90 secondes. Après 3 minutes, une pièce de bureau est entièrement embrasée.", icon: "flame" },
      { stat: "30 secondes", label: "pour agir efficacement", detail: "Dès qu'un signal d'alerte est détecté, vous disposez de 30 secondes pour évaluer et déclencher la procédure IBM.", icon: "clock" },
      { stat: "80%", label: "des feux de bureau démarrent la nuit", detail: "La plupart des incendies en entreprise se déclarent hors des heures de présence. La prévention passe par le débranchement systématique.", icon: "eye" },
    ],
    preTest: [
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

    content: [
      {
        type: "intro",
        title: "Les premiers signaux d'alerte",
        body: "Un départ de feu dans un environnement de bureau ne ressemble pas toujours à de grandes flammes visibles. Les signaux précoces sont souvent discrets : une odeur de brûlé, une légère fumée, un bruit électrique anormal ou une chaleur localisée.",
      },
      {
        type: "list",
        title: "4 signaux à reconnaître immédiatement",
        body: "Ces indices doivent déclencher votre vigilance dès qu'ils apparaissent :",
        bullets: [
          "Fumée légère ou bleutée — même fine, elle indique une combustion",
          "Odeur de brûlé ou de plastique fondu — souvent signe d'un feu électrique",
          "Chaleur localisée anormale — sur une prise, un câble, un appareil",
          "Claquement ou grésil électrique — arc électrique en cours",
        ],
      },
      {
        type: "scenario",
        title: "Scénario : Feu ou pas feu ?",
        body: "Vous êtes dans l'open space IBM. Une légère fumée sort d'une multiprise sous un bureau. L'alarme n'a pas encore sonné. Que faites-vous ?",
        image: `${CDN}4a7961a4c4d640dcb8b3ee7c4a1db951?format=webp&width=800`,
        highlight: "Règle d'or : tout signal de fumée = traiter comme un départ de feu réel.",
      },
    ],
    keyPoints: [
      "Tout signal suspect doit être traité comme un départ de feu réel — jamais ignoré",
      "Les 3 réflexes dans l'ordre : Débrancher → Déclencher l'alarme (777) → Évacuer",
      "Jamais d'eau sur un feu électrique — CO2 uniquement pour les serveurs, câbles et data centers IBM",
    ],
    quiz: [
      {
        id: "q1",
        question: "Vous sentez une odeur de plastique brûlé près d'une prise. Quel est votre premier réflexe ?",
        context: "Open space IBM, personne d'autre autour, l'alarme n'a pas sonné.",
        choices: [
          { key: "A", label: "Ignorer — ce n'est peut-être rien", hint: "Risque élevé d'escalade" },
          { key: "B", label: "Identifier la source immédiatement et alerter", hint: "Bonne réaction" },
          { key: "C", label: "Attendre que l'alarme se déclenche", hint: "L'alarme arrive après le feu" },
          { key: "D", label: "Appeler le service informatique", hint: "Pas la priorité en cas de feu" },
        ],
        correctKey: "B",
        feedbackOk: "Exact. Identifier la source sans délai et alerter permet d'intervenir avant propagation.",
        feedbackKo: "En cas de signal suspect, identifier la source et alerter immédiatement est la seule bonne réponse.",
      },
      {
        id: "q2",
        question: "Lequel de ces signes N'EST PAS un signal typique de départ de feu ?",
        choices: [
          { key: "A", label: "Une fumée légère bleutée" },
          { key: "B", label: "Une prise électrique chaude" },
          { key: "C", label: "Un courant d'air depuis une fenêtre ouverte" },
          { key: "D", label: "Un grésil électrique anormal" },
        ],
        correctKey: "C",
        feedbackOk: "Correct. Un courant d'air n'est pas un signal de feu. Les autres (fumée, chaleur, grésil) sont des alertes réelles.",
        feedbackKo: "Un courant d'air est la seule réponse sans lien avec un départ de feu.",
      },
    ],
    locked: false,
  },
  {
    id: "ch1-m2",
    chapter: 1,
    number: 2,
    title: "Le triangle du feu",
    subtitle: "Comprendre pour mieux éteindre",
    description:
      "Animation expliquant combustible / comburant / énergie. Manipulation d'un schéma interactif pour comprendre comment casser la combustion.",
    objective: "Comprendre comment casser le triangle du feu et stopper la combustion.",
    learningObjectives: {
      savoir: "Les trois composants du triangle du feu : combustible, comburant, chaleur",
      savoirFaire: "Supprimer un élément du triangle pour éteindre ou prévenir un incendie",
      savoirEtre: "Anticiper les risques et ne jamais créer de conditions propices au feu",
    },
    duration: "6 min",
    image: `${CDN}d3c9b22a88e644d98bd46cd69cd9cf30?format=webp&width=800`,
    videoUrl: "https://xnwexjnaiffdcifcnton.supabase.co/storage/v1/object/sign/video%201/Matriser%20le%20triangle%20du%20feu.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mMWE2Y2M1ZS1kN2E2LTRjY2EtOTg1Ny1iOTc0Njg3NGQzNmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ2aWRlbyAxL01hdHJpc2VyIGxlIHRyaWFuZ2xlIGR1IGZldS5tcDQiLCJpYXQiOjE3NzUzMzUyODksImV4cCI6MTgzODQwNzI4OX0.uEB3pGV29I6T0nSV5I6Rvb1gebXLIHptDNgGgCAGcCY",
    funFacts: [
      { stat: "200 gaz", label: "toxiques libérés par un câble PVC", detail: "La combustion d'un seul câble PVC libère plus de 200 composés toxiques. La fumée tue avant les flammes.", icon: "alert" },
      { stat: "3 éléments", label: "suffisent à créer un incendie", detail: "Chaleur + combustible + oxygène. Supprimez-en un seul, le feu s'éteint. C'est le principe de toute intervention.", icon: "flame" },
    ],
    preTest: [
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

    content: [
      {
        type: "intro",
        title: "Les 3 éléments du triangle du feu",
        body: "Le feu ne peut exister que si trois éléments sont réunis simultanément : le combustible (ce qui brûle), le comburant (l'oxygène) et l'énergie (source de chaleur ou étincelle). Retirer un seul de ces éléments et le feu s'éteint.",
        image: `${CDN}d3c9b22a88e644d98bd46cd69cd9cf30?format=webp&width=800`,
      },
      {
        type: "comparison",
        title: "Casser le triangle : ce qui marche vs ce qui aggrave",
        body: "Agir sur le triangle du feu, c'est retirer l'un de ses trois éléments. Choisir la mauvaise méthode peut aggraver la situation.",
        doList: [
          "Retirer le combustible — éloigner les matières inflammables",
          "Étouffer avec CO2 ou mousse — prive le feu d'oxygène",
          "Refroidir avec de l'eau — uniquement sur feux solides (classe A)",
          "Couper l'alimentation électrique avant toute intervention",
        ],
        dontList: [
          "Jamais d'eau sur feu électrique — risque d'électrocution immédiat",
          "Ne pas ventiler la pièce — apporte de l'oxygène et accélère le feu",
          "Ne pas ouvrir portes/fenêtres — même effet d'alimentation en air",
          "Ne pas utiliser poudre sur matériel informatique — dommages irréversibles",
        ],
      },
      {
        type: "casefigure",
        title: "Cas de figure — lequel du triangle casser ?",
        body: "Analysez chaque situation et identifiez le bon élément à supprimer.",
        cases: [
          {
            situation: "Câble PVC brûle dans un rack IBM. Matériel sous tension.",
            action: "Extincteur CO2 — agit sur l'oxygène (comburant)",
            result: "Correct. Le CO2 chasse l'oxygène sans endommager les équipements ni conduire l'électricité.",
            correct: true,
          },
          {
            situation: "Poubelle papier prend feu, loin de tout équipement électrique.",
            action: "Extincteur eau pulvérisée — abaisse la température",
            result: "Correct. L'eau refroidit le combustible en dessous du point d'ignition. Classe A = eau autorisée.",
            correct: true,
          },
          {
            situation: "Feu de câbles électriques. L'agent utilise un extincteur à eau.",
            action: "Extincteur eau sur feu électrique",
            result: "Erreur fatale. L'eau conduit l'électricité — risque d'électrocution immédiat pour l'utilisateur.",
            correct: false,
          },
        ],
      },
    ],
    quiz: [
      {
        id: "q1",
        question: "Un feu de câbles électriques se déclare dans la salle serveur. Quel élément du triangle agissez-vous si vous utilisez un extincteur CO2 ?",
        choices: [
          { key: "A", label: "Le combustible (les câbles)", hint: "Non, les câbles restent présents" },
          { key: "B", label: "Le comburant (l'oxygène)", hint: "Le CO2 chasse l'oxygène" },
          { key: "C", label: "L'énergie (la chaleur)", hint: "Partiellement seulement" },
          { key: "D", label: "Les trois à la fois", hint: "Non, le CO2 agit principalement sur l'oxygène" },
        ],
        correctKey: "B",
        feedbackOk: "Correct. Le CO2 agit sur le comburant en chassant l'oxygène autour du foyer.",
        feedbackKo: "Le CO2 prive le feu d'oxygène (comburant) — c'est son mécanisme principal.",
      },
    ],
    locked: true,
  },
  {
    id: "ch1-m3",
    chapter: 1,
    number: 3,
    title: "Propagation d'un incendie",
    subtitle: "Chaque décision compte",
    description:
      "Simulation où l'apprenant choisit d'ouvrir une porte, la fermer, ventiler, attendre ou alerter. La propagation évolue en fonction des choix.",
    objective: "Comprendre l'impact direct d'une action sur la propagation du feu.",
    learningObjectives: {
      savoir: "La vitesse de propagation du feu et le rôle coupe-feu des portes",
      savoirFaire: "Fermer toutes les portes en quittant une zone et confiner l'incendie",
      savoirEtre: "Agir méthodiquement sans courir, même sous pression",
    },
    duration: "10 min",
    image: `${CDN}26706b11880d4b55b61df8e668695b14?format=webp&width=800`,
    videoUrl: "https://xnwexjnaiffdcifcnton.supabase.co/storage/v1/object/sign/video%201/Ragir%20vite%20face%20l'incendie.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mMWE2Y2M1ZS1kN2E2LTRjY2EtOTg1Ny1iOTc0Njg3NGQzNmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ2aWRlbyAxL1JhZ2lyIHZpdGUgZmFjZSBsJ2luY2VuZGllLm1wNCIsImlhdCI6MTc3NTMzNTMyNCwiZXhwIjoxODM4NDA3MzI0fQ.BX-MtZuzr-Fyafw-sPo-0d5SJN4M8tvVbj31rSiX6vM",
    funFacts: [
      { stat: "5×", label: "plus rapide que les flammes", detail: "La fumée se propage 5 fois plus vite que le feu dans un couloir. Elle est la première cause de décès dans les incendies de bureau.", icon: "zap" },
      { stat: "5 min", label: "pour enflammer une pièce entière", detail: "Sans intervention, une pièce de bureau standard peut être totalement embrasée en moins de 5 minutes après le départ de feu.", icon: "clock" },
    ],
    preTest: [
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

    content: [
      {
        type: "intro",
        title: "La propagation peut être ralentie ou accélérée",
        body: "Un incendie se propage grâce à la chaleur, aux matières combustibles et à l'oxygène. Chaque action humaine — bonne ou mauvaise — a un impact direct et immédiat sur sa vitesse de propagation.",
        image: `${CDN}26706b11880d4b55b61df8e668695b14?format=webp&width=800`,
      },
      {
        type: "comparison",
        title: "Propagation : les bons vs mauvais réflexes",
        body: "Chaque geste pendant un incendie a un impact direct sur la vitesse de propagation. Voici ce qui fait la différence.",
        doList: [
          "Fermer chaque porte derrière soi en évacuant",
          "Vérifier la température d'une porte avec le dos de la main avant d'ouvrir",
          "Se baisser sous la fumée pour progresser vers la sortie",
          "Déclencher l'alarme immédiatement sans attendre confirmation",
        ],
        dontList: [
          "Ouvrir une porte chaude — aspire le feu comme un soufflet",
          "Ventiler ou ouvrir fenêtres — alimente le feu en oxygène frais",
          "Laisser les portes ouvertes en fuyant — la fumée s'engouffre",
          "Retourner chercher ses affaires — chaque seconde compte",
        ],
      },
      {
        type: "casefigure",
        title: "Cas de figure — bonne ou mauvaise décision ?",
        body: "Deux collègues IBM face à la même situation. Leurs choix ont des conséquences radicalement différentes.",
        cases: [
          {
            situation: "Fumée noire sous une porte dans le couloir. La porte est chaude au toucher.",
            action: "Rebrousse chemin, actionne l'alarme, emprunte l'escalier de secours.",
            result: "Décision parfaite. Porte chaude = feu développé derrière. Ne jamais ouvrir. L'escalier de secours est la bonne issue.",
            correct: true,
          },
          {
            situation: "En quittant son bureau, la personne laisse la porte entrouverte 'pour que les collègues puissent passer'.",
            action: "Laisse la porte ouverte et évacue rapidement.",
            result: "Erreur grave. Une porte ouverte permet à la fumée et aux flammes de progresser dans le couloir. Chaque porte fermée = résistance au feu de 20 à 30 min.",
            correct: false,
          },
        ],
      },
    ],
    keyPoints: [
      "Chaleur + Combustible + Oxygène = Triangle du feu. Supprimez un seul élément pour éteindre.",
      "La fumée voyage 5× plus vite que les flammes — c'est elle qui tue en premier.",
      "Un feu peut envahir une pièce entière en moins de 5 minutes sans intervention.",
    ],
    quiz: [
      {
        id: "q1",
        question: "Vous fuyez un incendie et passez par plusieurs pièces. Que faites-vous des portes ?",
        choices: [
          { key: "A", label: "Je les laisse ouvertes pour que les autres puissent passer" },
          { key: "B", label: "Je les ferme derrière moi systématiquement" },
          { key: "C", label: "Peu importe, l'essentiel est de partir vite" },
          { key: "D", label: "Je les verrouille pour bloquer le feu" },
        ],
        correctKey: "B",
        feedbackOk: "Parfait. Fermer chaque porte derrière soi ralentit significativement la propagation de la fumée et du feu.",
        feedbackKo: "Fermer les portes est essentiel — chaque porte fermée ralentit le feu et peut sauver des vies.",
      },
    ],
    locked: true,
  },
  {
    id: "ch1-m4",
    chapter: 1,
    number: 4,
    title: "Classes de feu",
    subtitle: "Choisir le bon extincteur",
    description:
      "Présentation visuelle des classes A, B, F. Exercice associer différents objets du quotidien à la bonne classe de feu.",
    objective: "Choisir le bon type d'extincteur selon la classe du feu.",
    learningObjectives: {
      savoir: "Les classes de feu (A, B, C, D, F) et les extincteurs adaptés à chacune",
      savoirFaire: "Choisir et utiliser l'extincteur correct selon la nature du feu",
      savoirEtre: "Ne jamais improviser — utiliser le mauvais agent peut aggraver l'incendie",
    },
    duration: "7 min",
    image: `${CDN}8f5fa15ec33749609150a2fef62457e9?format=webp&width=800`,
    videoUrl: "https://xnwexjnaiffdcifcnton.supabase.co/storage/v1/object/sign/video%201/Reconnatre%20les%20feux%20et%20choisir%20lextincteur.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mMWE2Y2M1ZS1kN2E2LTRjY2EtOTg1Ny1iOTc0Njg3NGQzNmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ2aWRlbyAxL1JlY29ubmF0cmUgbGVzIGZldXggZXQgY2hvaXNpciBsZXh0aW5jdGV1ci5tcDQiLCJpYXQiOjE3NzUzODU3NzksImV4cCI6MTgzODQ1Nzc3OX0.qNrp2HYGe3dKgbu9yUzfPurj_nckvQ5uIURGmaVZar8",
    funFacts: [
      { stat: "5 classes", label: "de feux — 1 erreur peut être mortelle", detail: "Utiliser un extincteur inadapté peut être plus dangereux que de ne pas intervenir. Eau sur feu électrique = risque d'électrocution.", icon: "alert" },
      { stat: "95%", label: "des feux de bureau : classe A ou électrique", detail: "Connaître ces 2 classes vous prépare à 95% des situations réelles en entreprise.", icon: "shield" },
    ],
    preTest: [
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

    content: [
      {
        type: "intro",
        title: "Pourquoi les classes de feu existent",
        body: "Tous les feux ne se combattent pas de la même façon. Un extincteur inadapté peut être inefficace, voire dangereux. Les classes de feu permettent de choisir le bon agent extincteur selon la nature du combustible.",
        image: `${CDN}8f5fa15ec33749609150a2fef62457e9?format=webp&width=800`,
      },
      {
        type: "list",
        title: "Les classes principales en environnement IBM",
        body: "Dans vos bureaux, vous rencontrerez principalement :",
        bullets: [
          "Classe A — Feux de solides : papier, bois, tissus, mobilier → extincteur eau/mousse",
          "Classe B — Feux de liquides inflammables : solvants, alcool → extincteur CO2/poudre",
          "Classe C — Feux de gaz → spécialistes uniquement",
          "Classe F — Feux de cuisine : huile, graisse → extincteur classe F uniquement",
          "Feux électriques — Équipements sous tension → extincteur CO2 obligatoire",
        ],
      },
      {
        type: "casefigure",
        title: "Cas de figure — choisir le bon extincteur",
        body: "Dans chacun de ces cas IBM, identifiez le bon extincteur. Une erreur peut être mortelle.",
        cases: [
          {
            situation: "Rack serveur IBM en feu dans la salle IT. Équipement sous tension, câbles visiblement brûlés.",
            action: "Extincteur CO2 — agit sur le comburant, ne conduit pas l'électricité.",
            result: "Correct. Le CO2 est le seul agent sûr sur du matériel sous tension. L'eau ou la mousse provoqueraient une électrocution.",
            correct: true,
          },
          {
            situation: "Poubelle en papier en feu dans un bureau, loin de tout équipement électrique.",
            action: "Extincteur eau pulvérisée — classe A, feu de solides.",
            result: "Correct. Papier = classe A. L'eau est efficace et sans danger sur ce type de combustible.",
            correct: true,
          },
          {
            situation: "Photocopieuse sous tension qui fume dans la salle de reprographie. Un agent utilise un extincteur eau.",
            action: "Extincteur eau sur équipement électrique sous tension.",
            result: "Erreur critique. L'eau conduit l'électricité. Risque d'électrocution immédiate. CO2 obligatoire sur tout matériel IBM sous tension.",
            correct: false,
          },
          {
            situation: "Huile de la machine à café déborde et s'enflamme. Un agent tente d'éteindre avec de l'eau.",
            action: "Eau sur un feu de graisse (classe F).",
            result: "Erreur fatale. L'eau au contact d'une huile à 300°C provoque une explosion de vapeur brûlante. Extincteur classe F ou étouffement uniquement.",
            correct: false,
          },
        ],
      },
    ],
    keyPoints: [
      "5 classes de feu — en bureau IBM : classe A (papier/bois) et électrique (classe E) sont les plus fréquentes.",
      "Eau sur feu électrique = risque d'électrocution immédiat. CO2 uniquement sur équipements IBM.",
      "Identifier la bonne classe avant d'intervenir — une erreur peut aggraver la situation.",
    ],
    quiz: [
      {
        id: "q1",
        question: "Dans la salle serveur IBM, un rack électronique prend feu. Quel extincteur utilisez-vous ?",
        choices: [
          { key: "A", label: "Eau pulvérisée — efficace sur les solides" },
          { key: "B", label: "CO2 — adapté aux feux électriques", hint: "Correct" },
          { key: "C", label: "Mousse — polyvalente" },
          { key: "D", label: "Poudre ABC — efficace partout" },
        ],
        correctKey: "B",
        feedbackOk: "Exact. Le CO2 est le seul agent sûr sur du matériel électrique sous tension.",
        feedbackKo: "Seul le CO2 est adapté aux feux électriques. L'eau et la mousse sont dangereuses sur du matériel sous tension.",
      },
    ],
    locked: true,
  },
  {
    id: "ch1-m5",
    chapter: 1,
    number: 5,
    title: "Utiliser un extincteur",
    subtitle: "La séquence PASS en pratique",
    description:
      "Découvrir les types d'extincteurs, leurs pictogrammes et les étapes essentielles. Comprendre la bonne distance, orientation et la séquence PASS.",
    objective: "Savoir identifier le bon extincteur et l'utiliser en sécurité.",
    learningObjectives: {
      savoir: "La séquence PASS (Pull · Aim · Squeeze · Sweep) et la distance d'intervention",
      savoirFaire: "Utiliser un extincteur CO2 ou poudre ABC de façon sécurisée à 2–3 mètres",
      savoirEtre: "Maintenir une sortie dans le dos et ne jamais mettre sa vie en danger",
    },
    duration: "9 min",
    image: `${CDN}d41dd2ee6d6d4cf4b7f112d3fc2460f3?format=webp&width=800`,
    videoUrl: "https://xnwexjnaiffdcifcnton.supabase.co/storage/v1/object/sign/video%201/Matriser%20la%20mthode%20PASS.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mMWE2Y2M1ZS1kN2E2LTRjY2EtOTg1Ny1iOTc0Njg3NGQzNmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ2aWRlbyAxL01hdHJpc2VyIGxhIG10aG9kZSBQQVNTLm1wNCIsImlhdCI6MTc3NTM4NTcwOCwiZXhwIjoxODM4NDU3NzA4fQ.R7Icr31r6H7iLlZIuaP9MKm4MmfcTNEPWjmTS8rglGA",
    podcastUrl: "https://xnwexjnaiffdcifcnton.supabase.co/storage/v1/object/sign/video%201/ibm%20pd.mp3?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mMWE2Y2M1ZS1kN2E2LTRjY2EtOTg1Ny1iOTc0Njg3NGQzNmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ2aWRlbyAxL2libSBwZC5tcDMiLCJpYXQiOjE3NzU0NzI4NTMsImV4cCI6MTgzODU0NDg1M30.i_VZ0DijQSMeN2OuXKbLT8RSVKwgMUKOk0xWAoiTO6A",
    funFacts: [
      { stat: "8-12 sec", label: "autonomie d'un extincteur CO2", detail: "Un extincteur CO2 standard se vide en 8 à 12 secondes. Chaque geste doit être précis et immédiat — pas de place à l'improvisation.", icon: "clock" },
      { stat: "-78°C", label: "température du cône CO2", detail: "Ne jamais tenir le cône d'un extincteur CO2 à mains nues. Le froid extrême provoque des brûlures en moins d'une seconde.", icon: "alert" },
    ],
    preTest: [
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

    content: [
      {
        type: "intro",
        title: "La séquence PASS — 4 étapes essentielles",
        body: "Utiliser un extincteur de façon efficace nécessite de respecter une séquence précise. En situation de stress, cette séquence doit être automatique.",
        image: `${CDN}d41dd2ee6d6d4cf4b7f112d3fc2460f3?format=webp&width=800`,
      },
      {
        type: "list",
        title: "La séquence P.A.S.S.",
        body: "Mémorisez ces 4 étapes dans cet ordre exact :",
        bullets: [
          "P — Puller (tirer) : dégoupiller en retirant la goupille de sécurité",
          "A — Ajuster (viser) : pointer le tuyau à la base des flammes, pas en haut",
          "S — Squeeze (presser) : appuyer sur la poignée de déclenchement",
          "S — Sweep (balayer) : balayer lentement la base du feu de gauche à droite",
        ],
      },
      {
        type: "visual",
        title: "Distance et position correctes",
        body: "Restez à 2-3 mètres du foyer. Visez toujours la base des flammes. Maintenez une sortie dans votre dos pour pouvoir reculer rapidement si nécessaire.",
        image: `${CDN}65b652843ba640ae94a5ffd9b614c5b0?format=webp&width=800`,
        highlight: "Si le feu ne recule pas en 30 secondes : reculez, alertez, évacuez.",
      },
    ],
    keyPoints: [
      "PASS : Pull (dégoupiller) · Aim (viser la base) · Squeeze (presser) · Sweep (balayer) — 4 étapes dans l'ordre.",
      "Un extincteur CO2 s'épuise en 8 à 12 secondes — chaque geste doit être précis.",
      "Si le feu ne recule pas après 30 secondes d'intervention : évacuez immédiatement.",
    ],
    quiz: [
      {
        id: "q1",
        question: "Lors de l'utilisation d'un extincteur, où doit pointer le jet ?",
        choices: [
          { key: "A", label: "Au sommet des flammes pour les étouffer" },
          { key: "B", label: "À la base du feu pour couper le combustible", hint: "Correct" },
          { key: "C", label: "En direction de la fumée" },
          { key: "D", label: "Sur les murs autour du feu" },
        ],
        correctKey: "B",
        feedbackOk: "Correct. La base des flammes est la source de combustion — c'est là qu'il faut agir.",
        feedbackKo: "Il faut toujours viser la base du feu, pas les flammes elles-mêmes.",
      },
      {
        id: "q2",
        question: "Quelle est la première étape de la séquence PASS ?",
        choices: [
          { key: "A", label: "Appuyer sur la poignée" },
          { key: "B", label: "Viser la base du feu" },
          { key: "C", label: "Tirer la goupille de sécurité", hint: "P = Pull" },
          { key: "D", label: "Balayer de gauche à droite" },
        ],
        correctKey: "C",
        feedbackOk: "Exact. P comme Pull (tirer la goupille) — c'est toujours la première étape.",
        feedbackKo: "La séquence PASS commence par P = Pull (tirer la goupille). Sans cette étape, l'extincteur ne s'active pas.",
      },
    ],
    locked: true,
  },
  {
    id: "ch1-m6",
    chapter: 1,
    number: 6,
    title: "Intervenir ou évacuer ?",
    subtitle: "Décision en quelques secondes",
    description:
      "Arbre décisionnel interactif basé sur la taille du feu, la fumée, le repli possible, la présence de victimes et le type d'extincteur disponible.",
    objective: "Savoir trancher la décision intervenir/évacuer en quelques secondes.",
    learningObjectives: {
      savoir: "Les critères qui déterminent si on intervient ou si on évacue",
      savoirFaire: "Appliquer la règle des 10 secondes : observer, évaluer, décider",
      savoirEtre: "En cas de doute, toujours privilégier l'évacuation sans hésitation",
    },
    duration: "10 min",
    image: `${CDN}8e074d1b7bdf4b8fa872d5fd2451fbfe?format=webp&width=800`,
    videoUrl: "https://xnwexjnaiffdcifcnton.supabase.co/storage/v1/object/sign/video%201/Dcider%20vite%20face%20un%20dbut%20dincendie.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mMWE2Y2M1ZS1kN2E2LTRjY2EtOTg1Ny1iOTc0Njg3NGQzNmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ2aWRlbyAxL0RjaWRlciB2aXRlIGZhY2UgdW4gZGJ1dCBkaW5jZW5kaWUubXA0IiwiaWF0IjoxNzc1Mzg1ODE2LCJleHAiOjE4Mzg0NTc4MTZ9.DEXtguhi245ee4er64OnmZFC1moq5JePoBRg93qwIpw",
    funFacts: [
      { stat: "10 sec", label: "pour prendre la décision critique", detail: "IBM fixe un délai de 10 secondes d'observation. Au-delà, la décision doit être prise : intervenir ou évacuer. Pas de troisième option.", icon: "clock" },
      { stat: "70%", label: "des victimes auraient pu évacuer", detail: "70% des décès par incendie en entreprise concernent des personnes qui avaient encore le temps d'évacuer mais ont hésité.", icon: "alert" },
    ],
    preTest: [
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

    content: [
      {
        type: "intro",
        title: "La décision la plus critique",
        body: "Intervenir sur un feu ou évacuer ? C'est la décision la plus importante et elle doit être prise en moins de 10 secondes. Une mauvaise décision peut être fatale.",
        image: `${CDN}8e074d1b7bdf4b8fa872d5fd2451fbfe?format=webp&width=800`,
      },
      {
        type: "list",
        title: "Critères pour intervenir",
        body: "N'intervenez que si TOUTES ces conditions sont réunies :",
        bullets: [
          "Le feu est petit (poubelle, bureau) — pas plus grand qu'une corbeille",
          "La fumée est légère et limitée",
          "Vous avez un extincteur adapté à portée de main",
          "Vous avez une sortie dégagée dans le dos",
          "Vous êtes formé et sans risque pour vous-même",
        ],
      },
      {
        type: "casefigure",
        title: "Cas de figure — intervenir ou évacuer ?",
        body: "Ces situations réelles IBM illustrent les critères de décision. Analysez chaque contexte.",
        cases: [
          {
            situation: "Poubelle en papier qui s'enflamme dans un bureau. Feu limité à la corbeille. CO2 disponible à 2 mètres. Sortie dans votre dos.",
            action: "Intervention avec le CO2. Séquence PASS, 2 mètres de distance, sortie libre.",
            result: "Intervention justifiée. Toutes les conditions sont réunies : feu petit, extincteur adapté, sortie accessible. Durée maximale : 30 secondes.",
            correct: true,
          },
          {
            situation: "Fumée épaisse noire dans le couloir. Porte chaude. Vous ne voyez pas la sortie. Pas d'extincteur à portée.",
            action: "Évacuation immédiate. Alarme déclenchée. Porte fermée. Sortie de secours.",
            result: "Décision correcte. Fumée épaisse + porte chaude = feu développé. Toute intervention est trop dangereuse. La vie prime sur tout.",
            correct: true,
          },
          {
            situation: "Feu important dans la salle serveur. L'agent hésite 45 secondes avant de décider.",
            action: "Tentative d'intervention après 45 secondes d'hésitation.",
            result: "Erreur grave. Le délai d'observation IBM est de 10 secondes maximum. Après 45 secondes, le feu a progressé de plusieurs mètres carrés. L'évacuation aurait dû être immédiate.",
            correct: false,
          },
        ],
      },
    ],
    keyPoints: [
      "Si le feu dépasse la taille d'une corbeille à papier : n'intervenez pas — évacuez.",
      "La règle IBM des 10 secondes : observer, évaluer, décider. Pas de troisième tentative.",
      "70% des victimes d'incendie avaient encore le temps d'évacuer — l'hésitation est l'ennemi.",
    ],
    quiz: [
      {
        id: "q1",
        question: "Feu derrière une porte chaude dans un couloir IBM. Que faites-vous ?",
        choices: [
          { key: "A", label: "J'ouvre prudemment pour évaluer la situation" },
          { key: "B", label: "J'utilise mon CO2 à travers la porte" },
          { key: "C", label: "Je rebrousse chemin, active l'alarme et évacue", hint: "Porte chaude = feu développé" },
          { key: "D", label: "J'attends les secours dans le couloir" },
        ],
        correctKey: "C",
        feedbackOk: "Parfait. Une porte chaude signifie un feu développé derrière. Ne jamais ouvrir — rebrousser, alerter, évacuer.",
        feedbackKo: "Une porte chaude = feu développé. Ouvrir = aspirer le feu vers vous. La seule option : rebrousser, alarme, évacuation.",
      },
    ],
    locked: true,
  },
  {
    id: "ch1-m7",
    chapter: 1,
    number: 7,
    title: "Simulation incendie",
    subtitle: "Mise en situation chronométrée",
    description:
      "Situation réaliste : alarme sonore, fumée dans un couloir, portes à fermer, extincteur à disposition. Décisions chronométrées à 5 secondes.",
    objective: "Valider l'ensemble des compétences du chapitre en conditions proches du réel.",
    learningObjectives: {
      savoir: "La procédure complète de gestion d'un incendie en environnement IBM",
      savoirFaire: "Enchaîner : détecter → alarme 777 → évaluer → intervenir ou évacuer",
      savoirEtre: "Garder son sang-froid et coordonner ses actions sous pression chronométrée",
    },
    duration: "12 min",
    image: `${CDN}dfd2975e7d864d029e522928a710aa05?format=webp&width=800`,
    videoUrl: "https://xnwexjnaiffdcifcnton.supabase.co/storage/v1/object/sign/video%201/Module%207%20Simulation%20incendie.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mMWE2Y2M1ZS1kN2E2LTRjY2EtOTg1Ny1iOTc0Njg3NGQzNmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ2aWRlbyAxL01vZHVsZSA3IFNpbXVsYXRpb24gaW5jZW5kaWUubXA0IiwiaWF0IjoxNzc1Mzg1NzMzLCJleHAiOjE4Mzg0NTc3MzN9.uxBS4qONMNpBLC7LjJS0vI_u_uWB3tWsc6kMQ5IAvNo",
    funFacts: [
      { stat: "40%", label: "de réduction du temps d'évacuation", detail: "Les entreprises qui organisent des exercices incendie réguliers réduisent leur temps d'évacuation de 40% en moyenne.", icon: "shield" },
      { stat: "2×/an", label: "exercices IBM obligatoires par site", detail: "IBM France organise 2 exercices incendie annuels par site. Chaque collaborateur doit y participer — l'absence est signalée aux RH.", icon: "eye" },
    ],
    preTest: [
      {
        question: "En déclenchant l'alarme IBM, vous composez EN PREMIER :",
        choices: [
          { key: "A", label: "Le 18 (pompiers)" },
          { key: "B", label: "Le 777 (sécurité IBM)" },
          { key: "C", label: "Le 15 (SAMU)" },
        ],
        correctKey: "B",
      },
      {
        question: "Les 3 réflexes IBM dans l'ordre sont :",
        choices: [
          { key: "A", label: "Évacuer → Alarme → Débrancher" },
          { key: "B", label: "Débrancher → Alarme (777) → Évacuer" },
          { key: "C", label: "Alarme → Débrancher → Appeler le 18" },
        ],
        correctKey: "B",
      },
    ],

    content: [
      {
        type: "intro",
        title: "Simulation complète — Chapitre 1",
        body: "Vous allez vivre une situation d'incendie réaliste dans un environnement de bureau IBM. Chaque décision est chronométrée. Votre score final mesure la pertinence, la rapidité et votre sécurité personnelle.",
        image: `${CDN}dfd2975e7d864d029e522928a710aa05?format=webp&width=800`,
      },
      {
        type: "scenario",
        title: "Contexte : 14h30, open space IBM",
        body: "L'alarme incendie retentit. Vous êtes au 3e étage. Une fumée légère entre par la porte du couloir. Un extincteur CO2 est visible à 3 mètres. Plusieurs collègues sont présents.",
        image: `${CDN}b18156d7c7644f34a12cfbc171ae4907?format=webp&width=800`,
        highlight: "Vous avez 5 secondes pour chaque décision. Faites confiance à vos réflexes.",
      },
    ],
    keyPoints: [
      "Simulation complète Chapitre 1 : détecter → alerter → intervenir ou évacuer en séquence.",
      "Chaque décision a une conséquence directe — les réflexes s'ancrent par la pratique.",
      "Les exercices réguliers réduisent le temps d'évacuation de 40% — IBM impose 2 exercices/an.",
    ],
    quiz: [
      {
        id: "q1",
        question: "L'alarme sonne. Première action ?",
        context: "Fumée légère dans le couloir. Extincteur CO2 visible. Collègues présents.",
        choices: [
          { key: "A", label: "Prendre l'extincteur et chercher le foyer" },
          { key: "B", label: "Évaluer la fumée et décider d'intervenir ou évacuer", hint: "Bonne évaluation d'abord" },
          { key: "C", label: "Appeler le 18 depuis mon bureau" },
          { key: "D", label: "Évacuer immédiatement sans évaluer" },
        ],
        correctKey: "B",
        feedbackOk: "Exact. Évaluer la situation en 5 secondes avant d'agir est la bonne démarche.",
        feedbackKo: "Même en urgence, 5 secondes d'évaluation évitent les mauvaises décisions.",
      },
      {
        id: "q2",
        question: "La fumée s'épaissit rapidement. Le foyer semble important. Quelle décision ?",
        choices: [
          { key: "A", label: "Tenter d'intervenir avec le CO2" },
          { key: "B", label: "Alerter les collègues et évacuer immédiatement", hint: "Fumée épaisse = évacuation" },
          { key: "C", label: "Attendre confirmation d'un responsable" },
          { key: "D", label: "Chercher un extincteur plus grand" },
        ],
        correctKey: "B",
        feedbackOk: "Parfait. Fumée épaisse = feu développé = évacuation sans délai.",
        feedbackKo: "Fumée épaisse signifie un feu trop important pour intervenir. Priorité : alerter et évacuer.",
      },
    ],
    locked: true,
  },

  // ─── CHAPITRE 2 ───────────────────────────────────────────────
  {
    id: "ch2-m1",
    chapter: 2,
    number: 1,
    title: "Déclencher l'alarme",
    subtitle: "Quand et comment activer l'alerte",
    description:
      "Découvrir quand et comment déclencher l'alarme incendie. Hotspots sur un déclencheur manuel, animations des étapes, cas pratiques.",
    objective: "Savoir identifier le bon moment pour activer l'alarme et localiser les points d'alerte.",
    learningObjectives: {
      savoir: "Les types d'alarmes incendie IBM et les numéros d'urgence à connaître",
      savoirFaire: "Activer un déclencheur manuel et appeler le 777 avec les bons éléments",
      savoirEtre: "Alerter immédiatement sans chercher à éteindre soi-même dans le doute",
    },
    duration: "6 min",
    image: `${CDN}2482acaedcdd4b2abad18b1011a424c6?format=webp&width=800`,
    videoUrl: "https://xnwexjnaiffdcifcnton.supabase.co/storage/v1/object/sign/video%201/Dclencher%20l'alarme%20incendie.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mMWE2Y2M1ZS1kN2E2LTRjY2EtOTg1Ny1iOTc0Njg3NGQzNmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ2aWRlbyAxL0RjbGVuY2hlciBsJ2FsYXJtZSBpbmNlbmRpZS5tcDQiLCJpYXQiOjE3NzU0MDk0NjgsImV4cCI6MTgzODQ4MTQ2OH0.aXpYf7-R6T_s_URpOt5IQdUs0UnhU_tT_efNlAOMxZw",
    funFacts: [
      { stat: "6 m²", label: "de propagation par seconde de retard", detail: "Chaque seconde de retard à déclencher l'alarme représente en moyenne 6m² de surface supplémentaire touchée par le feu.", icon: "flame" },
      { stat: "777", label: "le numéro IBM à composer EN PREMIER", detail: "Avant le 18 et le 15, composez le 777. La sécurité IBM connaît le plan des bâtiments et peut intervenir plus rapidement.", icon: "shield" },
    ],
    preTest: [
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

    content: [
      {
        type: "intro",
        title: "L'alarme : premier maillon de la chaîne de sécurité",
        body: "Déclencher l'alarme au bon moment est la première action qui sauve des vies. Trop tôt n'existe pas — trop tard peut être fatal. Chaque seconde compte après le signal d'alerte.",
        image: `${CDN}2482acaedcdd4b2abad18b1011a424c6?format=webp&width=800`,
      },
      {
        type: "list",
        title: "Quand déclencher l'alarme ?",
        body: "Activez l'alarme dès que :",
        bullets: [
          "Vous voyez de la fumée — même légère",
          "Vous sentez une odeur de brûlé persistante",
          "Vous découvrez un feu, même petit",
          "Vous entendez un signal automatique (détecteur)",
          "Quelqu'un vous signale un départ de feu",
        ],
        highlight: "Ne cherchez pas à confirmer — en cas de doute, déclenchez.",
      },
      {
        type: "scenario",
        title: "Comment utiliser un déclencheur manuel",
        body: "Les déclencheurs manuels (boîtiers rouges) sont présents dans tous les couloirs IBM. Pour les activer : briser la vitre ou appuyer sur le bouton selon le modèle. L'action est irréversible et immédiate.",
        image: "https://images.pexels.com/photos/31470430/pexels-photo-31470430.jpeg?auto=compress&cs=tinysrgb&w=800",
        highlight: "Après déclenchement : ne pas bloquer les issues et commencer l'évacuation.",
      },
    ],
    keyPoints: [
      "Composer le 777 EN PREMIER — avant le 18 et le 15. La sécurité IBM connaît le bâtiment.",
      "Chaque seconde de retard à déclencher l'alarme = 6 m² de surface supplémentaire en feu.",
      "L'alarme manuelle n'attend pas les détecteurs — déclenchez-la dès confirmation du feu.",
    ],
    quiz: [
      {
        id: "q1",
        question: "Vous sentez une forte odeur de brûlé mais ne voyez pas de flammes. Que faites-vous ?",
        choices: [
          { key: "A", label: "Chercher la source avant de déclencher l'alarme" },
          { key: "B", label: "Déclencher l'alarme immédiatement", hint: "Odeur = signe de feu" },
          { key: "C", label: "Prévenir un collègue et attendre sa confirmation" },
          { key: "D", label: "Ouvrir les fenêtres pour aérer" },
        ],
        correctKey: "B",
        feedbackOk: "Correct. Une odeur de brûlé est un signal suffisant. Déclencher sans attendre.",
        feedbackKo: "Toute odeur de brûlé persistante doit déclencher l'alarme — sans chercher à confirmer.",
      },
    ],
    locked: true,
  },
  {
    id: "ch2-m2",
    chapter: 2,
    number: 2,
    title: "Garder son calme et guider",
    subtitle: "Posture et communication en situation de crise",
    description:
      "Mises en situation visuelles illustrant les bons comportements : posture, voix, consignes simples. Exercice bonne/mauvaise formulation.",
    objective: "Adopter un comportement clair pour aider les autres à évacuer.",
    learningObjectives: {
      savoir: "Les techniques de communication et de leadership en situation de crise",
      savoirFaire: "Guider calmement des collègues paniqués vers les sorties de secours",
      savoirEtre: "Adopter une posture ferme, rassurante et orientée vers l'action",
    },
    duration: "7 min",
    image: `${CDN}73ee73f4c5c54adb943d454c10b797a9?format=webp&width=800`,
    videoUrl: "https://xnwexjnaiffdcifcnton.supabase.co/storage/v1/object/sign/video%201/Rester%20calme%20pendant%20une%20vacuation%20(1).mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mMWE2Y2M1ZS1kN2E2LTRjY2EtOTg1Ny1iOTc0Njg3NGQzNmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ2aWRlbyAxL1Jlc3RlciBjYWxtZSBwZW5kYW50IHVuZSB2YWN1YXRpb24gKDEpLm1wNCIsImlhdCI6MTc3NjA3MzY0MCwiZXhwIjoxNzc2MjQ2NDQwfQ.uFe7Qgw0PrnqfD7Cn7qT-5k03bkQ4_BvhAXaFDFxfgo",
    funFacts: [
      { stat: "3×", label: "la panique ralentit l'évacuation", detail: "Une évacuation désordonnée et paniquée est 3 fois plus lente. Le sang-froid et les consignes claires sauvent des vies.", icon: "alert" },
      { stat: "1 voix", label: "suffit pour structurer 20 personnes", detail: "Un collaborateur formé qui prend le commandement vocal peut structurer une évacuation de 20 personnes en moins de 30 secondes.", icon: "zap" },
    ],
    preTest: [
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

    content: [
      {
        type: "intro",
        title: "La panique est le vrai danger",
        body: "En situation d'urgence, la panique tue. Votre comportement calme et directif peut guider des dizaines de personnes vers la sortie. La voix, la posture et les mots choisis sont déterminants.",
        image: `${CDN}73ee73f4c5c54adb943d454c10b797a9?format=webp&width=800`,
      },
      {
        type: "list",
        title: "Les 4 règles de la communication d'urgence",
        body: "En situation d'évacuation :",
        bullets: [
          "Voix ferme et calme — jamais de cris ni de panique visible",
          "Messages courts et directs — 'Sortez par l'escalier, suivez-moi'",
          "Un geste pour désigner la direction — pointer clairement la sortie",
          "Ne jamais laisser quelqu'un derrière — vérifier visuellement",
        ],
      },
    ],
    keyPoints: [
      "La panique collective divise par 3 la vitesse d'évacuation — restez calme et prenez le commandement.",
      "Une seule voix structure suffit pour guider 20 personnes vers la sortie en 30 secondes.",
      "Consignes d'évacuation IBM : voix ferme, gestes clairs, désigner les sorties de secours.",
    ],
    quiz: [
      {
        id: "q1",
        question: "Quelle formulation est la plus adaptée pour guider des collègues en évacuation ?",
        choices: [
          { key: "A", label: "'Il y a le feu ! Sauvez-vous !' — crier fort" },
          { key: "B", label: "'Attention, alarme déclenchée. Suivez-moi par l'escalier B.'", hint: "Calme et directif" },
          { key: "C", label: "'Je ne sais pas où aller, essayons par là'" },
          { key: "D", label: "'Attendez ici, je vais chercher de l'aide'" },
        ],
        correctKey: "B",
        feedbackOk: "Exact. Calme, précis, directif — c'est la communication qui évite la panique.",
        feedbackKo: "La bonne formulation est calme, précise et indique clairement l'itinéraire.",
      },
    ],
    locked: true,
  },
  {
    id: "ch2-m3",
    chapter: 2,
    number: 3,
    title: "Fermer les portes",
    subtitle: "Sors — Ferme — Signale",
    description:
      "Animation montrant l'effet d'une porte fermée sur la fumée. Exercice pour déterminer l'ordre correct de la séquence.",
    objective: "Intégrer la fermeture systématique des portes pour limiter la propagation.",
    learningObjectives: {
      savoir: "La séquence SORS-FERME-SIGNALE et son impact sur la propagation",
      savoirFaire: "Fermer systématiquement chaque porte en quittant les locaux",
      savoirEtre: "Appliquer la procédure sans exception, même en situation de stress",
    },
    duration: "5 min",
    image: `${CDN}0385f320d59547b2b6d08166e29ab8f3?format=webp&width=800`,
    videoUrl: "https://xnwexjnaiffdcifcnton.supabase.co/storage/v1/object/sign/video%201/Fermez%20les%20portes,%20sauvez%20du%20temps.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mMWE2Y2M1ZS1kN2E2LTRjY2EtOTg1Ny1iOTc0Njg3NGQzNmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ2aWRlbyAxL0Zlcm1leiBsZXMgcG9ydGVzLCBzYXV2ZXogZHUgdGVtcHMubXA0IiwiaWF0IjoxNzc1NDA5Nzg0LCJleHAiOjE4Mzg0ODE3ODR9.Q0yr1AHf1sPqiNtLPKspQqCVF8jh-Ect3r4Dcpo2v8c",
    funFacts: [
      { stat: "20%", label: "reviennent chercher leurs affaires", detail: "20% des décès lors d'incendies surviennent chez des personnes revenues chercher leurs effets personnels. Rien ne vaut une vie.", icon: "alert" },
      { stat: "3 min", label: "les plus dangereuses de l'évacuation", detail: "Les 3 premières minutes d'évacuation concentrent 80% des risques. Une sortie rapide et ordonnée est la seule priorité.", icon: "clock" },
    ],
    preTest: [
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

    content: [
      {
        type: "intro",
        title: "Une porte fermée peut sauver des vies",
        body: "Une porte coupe-feu fermée résiste en moyenne 20 à 30 minutes à un incendie. Elle limite la propagation de la fumée et du feu, et donne aux secours le temps d'intervenir.",
        image: `${CDN}0385f320d59547b2b6d08166e29ab8f3?format=webp&width=800`,
      },
      {
        type: "list",
        title: "La séquence à retenir : Sors — Ferme — Signale",
        body: "À chaque pièce quittée pendant une évacuation :",
        bullets: [
          "Sors : quitte la pièce rapidement en vérifiant qu'il n'y a personne",
          "Ferme : ferme la porte derrière toi — ne pas verrouiller",
          "Signale : si possible, marquer la porte comme 'vérifiée' ou avertir les secours",
        ],
        highlight: "Ne jamais laisser une porte ouverte lors d'une évacuation.",
      },
    ],
    keyPoints: [
      "SORS — FERME — SIGNALE : la séquence IBM en 3 étapes à appliquer à chaque pièce quittée.",
      "Fermer toutes les portes derrière soi ralentit la propagation du feu et de la fumée.",
      "20% des décès surviennent chez des personnes revenues chercher leurs affaires — ne jamais revenir.",
    ],
    quiz: [
      {
        id: "q1",
        question: "Vous quittez votre bureau en urgence. Que faites-vous avec la porte ?",
        choices: [
          { key: "A", label: "Je la laisse ouverte pour que mes collègues entrent" },
          { key: "B", label: "Je la ferme à clé pour bloquer le feu" },
          { key: "C", label: "Je la ferme sans verrouiller", hint: "Fermer suffit — pas besoin de verrouiller" },
          { key: "D", label: "Je la laisse selon les circonstances" },
        ],
        correctKey: "C",
        feedbackOk: "Exact. Fermer sans verrouiller : les secours doivent pouvoir entrer rapidement si nécessaire.",
        feedbackKo: "Fermer sans verrouiller est la bonne pratique — les secours doivent pouvoir ouvrir.",
      },
    ],
    locked: true,
  },
  {
    id: "ch2-m4",
    chapter: 2,
    number: 4,
    title: "Vérifier que personne ne reste",
    subtitle: "Exploration rapide et sécurisée",
    description:
      "L'apprenant explore virtuellement un bureau, une salle de réunion, un local technique. Zones vérifiées vs non vérifiées.",
    objective: "Effectuer une vérification rapide et sécurisée avant d'évacuer.",
    learningObjectives: {
      savoir: "La méthode de vérification rapide d'une zone avant évacuation définitive",
      savoirFaire: "Balayer visuellement un espace et signaler toute présence au responsable",
      savoirEtre: "Ne laisser personne derrière — sans jamais mettre sa propre vie en danger",
    },
    duration: "8 min",
    image: `${CDN}b5ca9823c0ba42e492f17a707fd14708?format=webp&width=800`,
    videoUrl: "https://xnwexjnaiffdcifcnton.supabase.co/storage/v1/object/sign/video%201/Ne%20laisser%20personne%20derrire%20(1).mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mMWE2Y2M1ZS1kN2E2LTRjY2EtOTg1Ny1iOTc0Njg3NGQzNmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ2aWRlbyAxL05lIGxhaXNzZXIgcGVyc29ubmUgZGVycmlyZSAoMSkubXA0IiwiaWF0IjoxNzc2MDcxODk4LCJleHAiOjE4MzkxNDM4OTh9.5tdZkcNiIUrakyTW25I9HG_JtkaIWqHGMMDW57M7PR0",
    funFacts: [
      { stat: "3×", label: "la fumée tue plus que les flammes", detail: "L'inhalation de fumée toxique tue 3 fois plus que les brûlures directes. Se baisser sous 1m réduit l'exposition de 80%.", icon: "alert" },
      { stat: "1 m", label: "la hauteur de survie en fumée dense", detail: "En dessous de 1 mètre, l'air est 80% plus respirable qu'en position debout lors d'un incendie avec fumée dense.", icon: "shield" },
    ],
    preTest: [
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

    content: [
      {
        type: "intro",
        title: "Ne laisser personne derrière",
        body: "Avant de quitter une zone, un balayage visuel rapide de 5 secondes peut sauver la vie d'un collègue blessé, en fauteuil ou qui n'a pas entendu l'alarme.",
        image: `${CDN}b5ca9823c0ba42e492f17a707fd14708?format=webp&width=800`,
      },
      {
        type: "list",
        title: "Les zones à vérifier systématiquement",
        body: "Dans chaque espace de travail :",
        bullets: [
          "Bureaux individuels et open spaces — regard panoramique",
          "Salles de réunion — souvent occupées, portes fermées",
          "Sanitaires — zones isolées où l'alarme peut être moins audible",
          "Locaux techniques — personnes de maintenance potentiellement présentes",
          "Espaces de pause — cafétéria, coin café",
        ],
        highlight: "Si vous ne pouvez pas vérifier en sécurité, signalez-le aux secours à l'extérieur.",
      },
    ],
    keyPoints: [
      "Au point de rassemblement : se signaler au référent évacuation, ne pas repartir seul.",
      "Vérifier visuellement les collègues présents — signaler les absences aux secours, pas à voix haute.",
      "Le point de rassemblement IBM est défini par site — mémorisez le vôtre avant cet exercice.",
    ],
    quiz: [
      {
        id: "q1",
        question: "En évacuant, vous passez devant une salle de réunion fermée. Que faites-vous ?",
        choices: [
          { key: "A", label: "Je continue sans m'arrêter — la porte fermée suffit" },
          { key: "B", label: "J'ouvre et vérifie rapidement si elle est vide", hint: "5 secondes suffisent" },
          { key: "C", label: "J'attends devant pour voir si quelqu'un sort" },
          { key: "D", label: "Je crie 'évacuation' et passe mon chemin" },
        ],
        correctKey: "B",
        feedbackOk: "Correct. Un regard rapide de 5 secondes permet de s'assurer que la salle est vide.",
        feedbackKo: "Une vérification visuelle rapide est nécessaire — une porte fermée ne garantit pas que la salle est vide.",
      },
    ],
    locked: true,
  },
  {
    id: "ch2-m5",
    chapter: 2,
    number: 5,
    title: "Faire face à la fumée",
    subtitle: "Bons réflexes dans un environnement enfumé",
    description:
      "Mini-simulation : fumée au sol / fumée en hauteur / porte chaude. Choisir les bons réflexes avec feedback immédiat.",
    objective: "Adopter les bons réflexes dans un environnement enfumé.",
    learningObjectives: {
      savoir: "Le comportement de la fumée, sa toxicité et ses effets sur l'organisme",
      savoirFaire: "Se déplacer en position basse et protéger ses voies respiratoires",
      savoirEtre: "Résister à la panique et garder un rythme lent et contrôlé",
    },
    duration: "8 min",
    image: `${CDN}cc5ab29f9fd543a2aff682cdd54297ad?format=webp&width=800`,
    videoUrl: "https://xnwexjnaiffdcifcnton.supabase.co/storage/v1/object/sign/video%201/Ragir%20vite%20face%20la%20fume.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mMWE2Y2M1ZS1kN2E2LTRjY2EtOTg1Ny1iOTc0Njg3NGQzNmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ2aWRlbyAxL1JhZ2lyIHZpdGUgZmFjZSBsYSBmdW1lLm1wNCIsImlhdCI6MTc3NTQ3MTEwNiwiZXhwIjoxODM4NTQzMTA2fQ.a4IIYxeCxueoMRyA00JKOohg9FMLM8pJNzlsY9rOIxM",
    funFacts: [
      { stat: "0.3 sec", label: "inhalation létale de certains gaz", detail: "Certains gaz issus de plastiques brûlés peuvent causer une perte de conscience en moins de 0.3 seconde à forte concentration.", icon: "zap" },
      { stat: "40°C", label: "la chaleur de la fumée à hauteur des yeux", detail: "À hauteur debout, la fumée peut atteindre 40 à 60°C lors d'un incendie de bureau — suffisant pour brûler les voies respiratoires.", icon: "flame" },
    ],
    preTest: [
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

    content: [
      {
        type: "intro",
        title: "La fumée tue avant les flammes",
        body: "Dans 80% des décès par incendie, c'est la fumée qui est en cause — pas les flammes directes. Les gaz toxiques contenus dans la fumée peuvent entraîner la perte de conscience en quelques respirations.",
        image: `${CDN}cc5ab29f9fd543a2aff682cdd54297ad?format=webp&width=800`,
      },
      {
        type: "list",
        title: "Les 3 réflexes face à la fumée",
        body: "Si vous êtes dans un espace enfumé :",
        bullets: [
          "Se baisser — l'air respirable est en bas (la fumée monte)",
          "Couvrir le nez et la bouche — tissu humide si disponible",
          "Longer les murs — maintenir un repère spatial en visibilité réduite",
          "Ne jamais revenir sur ses pas si la fumée est dense",
          "Tester une porte avant de l'ouvrir — si chaude, ne pas ouvrir",
        ],
      },
      {
        type: "scenario",
        title: "Situation : couloir enfumé à mi-hauteur",
        body: "Vous entrez dans un couloir. La fumée est à hauteur de poitrine. La sortie est à 20 mètres.",
        image: `${CDN}6171df855d7f4b7c9e5a1db98ed093b1?format=webp&width=800`,
        highlight: "Se baisser sous la fumée et progresser rapidement vers la sortie.",
      },
    ],
    keyPoints: [
      "La fumée tue 3× plus que les flammes — se baisser sous 1 m réduit l'exposition de 80%.",
      "En présence de fumée dense : protégez-vous le nez et la bouche, progressez en rampant si nécessaire.",
      "Ne jamais courir dans la fumée — la respiration s'accélère et l'inhalation devient fatale.",
    ],
    quiz: [
      {
        id: "q1",
        question: "Vous êtes dans un couloir rempli de fumée. La sortie est visible à 15m. Que faites-vous ?",
        choices: [
          { key: "A", label: "Je cours droit vers la sortie en restant debout" },
          { key: "B", label: "Je me baisse et progresse rapidement en longeant le mur", hint: "Air frais en bas" },
          { key: "C", label: "Je rebrousse chemin pour trouver un autre itinéraire" },
          { key: "D", label: "J'attends que la fumée se dissipe" },
        ],
        correctKey: "B",
        feedbackOk: "Exact. Se baisser permet de respirer l'air plus frais qui reste près du sol.",
        feedbackKo: "La fumée monte — l'air respirable reste en bas. Se baisser est le réflexe vital.",
      },
    ],
    locked: true,
  },
  {
    id: "ch2-m6",
    chapter: 2,
    number: 6,
    title: "Escaliers ou espace sécurisé",
    subtitle: "Jamais l'ascenseur — toujours l'escalier",
    description:
      "Plan interactif d'un étage IBM. Exercice pour choisir le bon itinéraire. Animations sur la vitesse de fumée dans les cages d'escalier.",
    objective: "Trouver rapidement le bon chemin d'évacuation.",
    learningObjectives: {
      savoir: "Les règles d'évacuation verticale et les espaces d'attente sécurisés",
      savoirFaire: "Emprunter uniquement les escaliers de secours — jamais l'ascenseur",
      savoirEtre: "Respecter les files, ne pas se précipiter, aider les personnes à mobilité réduite",
    },
    duration: "7 min",
    image: `${CDN}48e0cc79ee294fbbaf81f10232959ffb?format=webp&width=800`,
    funFacts: [
      { stat: "100%", label: "des décès en ascenseur sont évitables", detail: "L'ascenseur en cas d'incendie est un piège : coupure électrique, enfumage, portes bloquées. Escaliers uniquement, toujours.", icon: "alert" },
      { stat: "4×", label: "plus lent en ascenseur qu'en escalier", detail: "Le temps d'évacuation via ascenseur est en moyenne 4 fois plus long qu'une évacuation ordonnée par les escaliers de secours.", icon: "clock" },
    ],
    preTest: [
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

    content: [
      {
        type: "intro",
        title: "L'ascenseur est interdit en cas d'incendie",
        body: "L'ascenseur peut s'arrêter à l'étage en feu, couper l'alimentation électrique ou se transformer en piège à fumée. Toujours utiliser les escaliers, même pour descendre de nombreux étages.",
        image: `${CDN}48e0cc79ee294fbbaf81f10232959ffb?format=webp&width=800`,
      },
      {
        type: "list",
        title: "Règles d'utilisation des escaliers",
        body: "Lors d'une évacuation par les escaliers :",
        bullets: [
          "Utiliser toujours l'escalier le plus proche — ne pas chercher l'escalier habituel",
          "Descendre calmement en file — ne pas courir pour éviter les chutes",
          "Rester à droite — laisser la voie libre aux secours",
          "Fermer la porte de l'escalier derrière soi — ralentit la fumée",
          "En cas de fumée dans l'escalier : utiliser l'espace d'attente sécurisé de l'étage",
        ],
        highlight: "Espace d'attente sécurisé (EAS) : zone protégée avec communication avec les secours.",
      },
    ],
    keyPoints: [
      "Escaliers uniquement — l'ascenseur en incendie est un piège : coupure électrique, enfumage, portes bloquées.",
      "L'ascenseur rallonge le temps d'évacuation de 4× par rapport aux escaliers de secours.",
      "En cas d'impossibilité de descendre : EAS (espace d'attente sécurisé) et signaler sa position.",
    ],
    quiz: [
      {
        id: "q1",
        question: "L'alarme sonne. Vous êtes au 8e étage. L'ascenseur est disponible. Que faites-vous ?",
        choices: [
          { key: "A", label: "Je prends l'ascenseur — plus rapide pour descendre 8 étages" },
          { key: "B", label: "J'utilise l'escalier le plus proche", hint: "Ascenseur = interdit" },
          { key: "C", label: "J'attends les consignes avant de partir" },
          { key: "D", label: "Je prends l'ascenseur de service" },
        ],
        correctKey: "B",
        feedbackOk: "Correct. L'ascenseur est strictement interdit lors d'une évacuation incendie.",
        feedbackKo: "Aucun ascenseur n'est sûr lors d'un incendie — toujours les escaliers, quelle que soit la hauteur.",
      },
    ],
    locked: true,
  },
  {
    id: "ch2-m7",
    chapter: 2,
    number: 7,
    title: "Procédure complète d'évacuation",
    subtitle: "Simulation finale chronométrée",
    description:
      "Scénario final chronométré : bruit d'alarme, fumée, collègues, portes, escaliers, point de rassemblement. Score final.",
    objective: "Valider la maîtrise de toute la procédure d'évacuation en situation simulée.",
    learningObjectives: {
      savoir: "La procédure complète d'évacuation IBM de A à Z",
      savoirFaire: "Exécuter toutes les étapes dans l'ordre correct sous contrainte de temps",
      savoirEtre: "Coordination, sens des responsabilités et leadership en situation réelle",
    },
    duration: "12 min",
    image: `${CDN}2ee3c4ada85544aa87e2f4f440dc1a94?format=webp&width=800`,
    videoUrl: "https://xnwexjnaiffdcifcnton.supabase.co/storage/v1/object/sign/video%201/Matriser%20lvacuation%20incendie%20IBM.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mMWE2Y2M1ZS1kN2E2LTRjY2EtOTg1Ny1iOTc0Njg3NGQzNmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ2aWRlbyAxL01hdHJpc2VyIGx2YWN1YXRpb24gaW5jZW5kaWUgSUJNLm1wNCIsImlhdCI6MTc3NTQ3MTIyMSwiZXhwIjoxODM4NTQzMjIxfQ.6cg7SCanjHy2jPlrp60vUJOo0spctfMq7OR-lMRMmG0",
    funFacts: [
      { stat: "85%", label: "de réduction du risque de décès", detail: "Une formation incendie bien exécutée et régulièrement pratiquée réduit le risque de décès de 85% en situation réelle.", icon: "shield" },
      { stat: "14 modules", label: "pour être pleinement opérationnel", detail: "Vous terminez les 14 modules IBM. Chaque réflexe appris ici peut faire la différence entre une évacuation réussie et une tragédie.", icon: "zap" },
    ],
    preTest: [
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

    content: [
      {
        type: "intro",
        title: "Simulation finale — Chapitre 2",
        body: "Ce module final vous place dans une évacuation complète, du déclenchement de l'alarme jusqu'au point de rassemblement IBM. Chaque décision est chronométrée. Votre score valide la maîtrise de l'ensemble du chapitre.",
        image: `${CDN}2ee3c4ada85544aa87e2f4f440dc1a94?format=webp&width=800`,
      },
      {
        type: "scenario",
        title: "Contexte : 16h00, open space — 4e étage",
        body: "L'alarme retentit. Fumée légère dans le couloir. 12 collègues autour de vous. Ascenseur et escalier principal visibles. Point de rassemblement : parking nord.",
        image: "https://images.pexels.com/photos/14776526/pexels-photo-14776526.jpeg?auto=compress&cs=tinysrgb&w=800",
        highlight: "Votre objectif : tout le monde au point de rassemblement en moins de 3 minutes.",
      },
    ],
    keyPoints: [
      "Simulation finale : alarme → évacuation ordonnée → point de rassemblement en moins de 3 minutes.",
      "Une formation complète réduit le risque de décès de 85% — vous avez atteint ce niveau.",
      "Votre certification IBM HSE est valide 1 an — participez aux exercices annuels pour la maintenir.",
    ],
    quiz: [
      {
        id: "q1",
        question: "L'alarme retentit. Quelles sont vos DEUX premières actions dans l'ordre ?",
        choices: [
          { key: "A", label: "Prendre mes affaires, puis évacuer" },
          { key: "B", label: "Alerter le 777 avec ma localisation, puis guider mes collègues vers la sortie", hint: "Alerte 777 → guidage" },
          { key: "C", label: "Rejoindre le point de rassemblement, puis appeler le 777" },
          { key: "D", label: "Vérifier l'origine du feu, puis alerter" },
        ],
        correctKey: "B",
        feedbackOk: "Parfait. Alerter le 777 en premier (avec votre localisation exacte), puis guider vos collègues. Jamais d'affaires.",
        feedbackKo: "L'ordre correct : alerter le 777 (localisation précise) → guider les collègues vers la sortie. Aucune affaire ne vaut une vie.",
      },
      {
        id: "q2",
        question: "Au point de rassemblement, que faites-vous en premier ?",
        choices: [
          { key: "A", label: "Appeler ma famille pour les prévenir" },
          { key: "B", label: "Signaler toute personne manquante ou blessée au responsable d'évacuation", hint: "Comptage = priorité" },
          { key: "C", label: "Retourner chercher mes affaires si le feu semble petit" },
          { key: "D", label: "Rentrer chez moi si l'alarme s'arrête" },
        ],
        correctKey: "B",
        feedbackOk: "Excellent. Le comptage et le signalement des absents est la première action au point de rassemblement.",
        feedbackKo: "Au point de rassemblement : signaler toute absence ou blessure au responsable d'évacuation — immédiatement.",
      },
    ],
    locked: true,
  },
];

export const getModuleById = (id: string) => MODULES.find((m) => m.id === id);
export const getChapterModules = (chapter: 1 | 2) => MODULES.filter((m) => m.chapter === chapter);
