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
  type: "intro" | "visual" | "info" | "scenario" | "list";
  title?: string;
  body: string;
  image?: string;
  bullets?: string[];
  highlight?: string;
}

export interface FunFact {
  stat: string;        // ex: "30 secondes"
  label: string;       // ex: "pour maîtriser un départ de feu"
  detail: string;      // phrase explicative
  icon: "flame" | "clock" | "alert" | "shield" | "zap" | "eye";
}

export interface CourseModule {
  id: string;
  chapter: 1 | 2;
  number: number;
  title: string;
  subtitle: string;
  description: string;
  objective: string;
  duration: string;
  image: string;
  videoUrl?: string;
  captionsVtt?: string;
  funFacts?: FunFact[];
  keyPoints?: string[];   // 3 bullet points shown before quiz
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
    duration: "8 min",
    image: `${CDN}1428f65fac8147e090a970c03ba942a4?format=webp&width=800`,
    videoUrl: "https://xnwexjnaiffdcifcnton.supabase.co/storage/v1/object/sign/video%201/ibm%20intro%20(2).mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mMWE2Y2M1ZS1kN2E2LTRjY2EtOTg1Ny1iOTc0Njg3NGQzNmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ2aWRlbyAxL2libSBpbnRybyAoMikubXA0IiwiaWF0IjoxNzc1MjQxMjI3LCJleHAiOjE4Njk4NDkyMjd9.RBEu401aURzjAUFnNv6l8Miao-DYiC2QvtucX5cGiNA",
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
Et bien sûr composez le 22 22 pour prévenir le service de sécurité IBM avant le 18 et avant le 15.

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
        image: `${CDN}9cef8b4c4b544ccba1f46d55903ffdb8?format=webp&width=800`,
        highlight: "Règle d'or : tout signal de fumée = traiter comme un départ de feu réel.",
      },
    ],
    keyPoints: [
      "Tout signal d'alerte (odeur, fumée, chaleur, grésil) doit être traité comme un départ de feu réel — jamais ignoré",
      "Les 3 réflexes dans l'ordre : Débrancher → Déclencher l'alarme (22 22) → Évacuer",
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
    duration: "6 min",
    image: `${CDN}03282479c89b48dea9e157db2b4d6588?format=webp&width=800`,
    funFacts: [
      { stat: "200 gaz", label: "toxiques libérés par un câble PVC", detail: "La combustion d'un seul câble PVC libère plus de 200 composés toxiques. La fumée tue avant les flammes.", icon: "alert" },
      { stat: "3 éléments", label: "suffisent à créer un incendie", detail: "Chaleur + combustible + oxygène. Supprimez-en un seul, le feu s'éteint. C'est le principe de toute intervention.", icon: "flame" },
    ],
    content: [
      {
        type: "intro",
        title: "Les 3 éléments du triangle du feu",
        body: "Le feu ne peut exister que si trois éléments sont réunis simultanément : le combustible (ce qui brûle), le comburant (l'oxygène) et l'énergie (source de chaleur ou étincelle). Retirer un seul de ces éléments et le feu s'éteint.",
        image: `${CDN}03282479c89b48dea9e157db2b4d6588?format=webp&width=800`,
      },
      {
        type: "list",
        title: "Comment casser le triangle ?",
        body: "Chaque type d'extincteur agit sur un ou plusieurs éléments du triangle :",
        bullets: [
          "Retirer le combustible — éloigner les matières inflammables du feu",
          "Éliminer le comburant — étouffer le feu (CO2, mousse, poudre)",
          "Abaisser la température — refroidir avec de l'eau (feux de classe A)",
        ],
      },
      {
        type: "scenario",
        title: "Cas pratique : feu de poubelle",
        body: "Dans la salle de reprographie, une poubelle prend feu. Quel élément du triangle faut-il supprimer en priorité ?",
        highlight: "Réponse : étouffer (supprimer l'oxygène) avec un extincteur CO2 ou poudre.",
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
    duration: "10 min",
    image: `${CDN}420fe533d58f4bcea4ab6851d6cc9ab6?format=webp&width=800`,
    funFacts: [
      { stat: "5×", label: "plus rapide que les flammes", detail: "La fumée se propage 5 fois plus vite que le feu dans un couloir. Elle est la première cause de décès dans les incendies de bureau.", icon: "zap" },
      { stat: "5 min", label: "pour enflammer une pièce entière", detail: "Sans intervention, une pièce de bureau standard peut être totalement embrasée en moins de 5 minutes après le départ de feu.", icon: "clock" },
    ],
    content: [
      {
        type: "intro",
        title: "La propagation peut être ralentie ou accélérée",
        body: "Un incendie se propage grâce à la chaleur, aux matières combustibles et à l'oxygène. Chaque action humaine — bonne ou mauvaise — a un impact direct et immédiat sur sa vitesse de propagation.",
        image: `${CDN}420fe533d58f4bcea4ab6851d6cc9ab6?format=webp&width=800`,
      },
      {
        type: "list",
        title: "Actions qui accélèrent la propagation",
        body: "À éviter absolument :",
        bullets: [
          "Ouvrir une porte sans vérifier sa température — introduit de l'oxygène frais",
          "Ventiler la pièce — alimente le feu en comburant",
          "Laisser les portes ouvertes en fuyant — facilite la propagation de la fumée",
          "Attendre sans alerter — laisse le feu grossir",
        ],
      },
      {
        type: "scenario",
        title: "Situation critique : porte chaude",
        body: "Vous êtes dans un couloir. La porte au fond est chaude au toucher. Des fumées noires passent par en dessous.",
        image: `${CDN}0385f320d59547b2b6d08166e29ab8f3?format=webp&width=800`,
        highlight: "Ne jamais ouvrir une porte chaude. Rebrousser chemin, alerter, utiliser un autre itinéraire.",
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
    duration: "7 min",
    image: `${CDN}fe758a5b35224b1bae42de1253d3aa38?format=webp&width=800`,
    funFacts: [
      { stat: "6 classes", label: "de feux — 1 erreur peut être mortelle", detail: "Utiliser un extincteur inadapté peut être plus dangereux que de ne pas intervenir. Eau sur feu électrique = risque d'électrocution.", icon: "alert" },
      { stat: "95%", label: "des feux de bureau : classe A ou électrique", detail: "Connaître ces 2 classes vous prépare à 95% des situations réelles en entreprise.", icon: "shield" },
    ],
    content: [
      {
        type: "intro",
        title: "Pourquoi les classes de feu existent",
        body: "Tous les feux ne se combattent pas de la même façon. Un extincteur inadapté peut être inefficace, voire dangereux. Les classes de feu permettent de choisir le bon agent extincteur selon la nature du combustible.",
        image: `${CDN}fe758a5b35224b1bae42de1253d3aa38?format=webp&width=800`,
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
        type: "scenario",
        title: "Cas IBM : salle de reprographie",
        body: "Un feu démarre dans la salle de reprographie : la photocopieuse fume, des documents papier brûlent près d'elle. L'appareil est sous tension.",
        image: `${CDN}290bce1f95984a91a3748bfc3245141d?format=webp&width=800`,
        highlight: "Feu électrique + papier = extincteur CO2. Ne jamais utiliser l'eau sur du matériel sous tension.",
      },
    ],
    keyPoints: [
      "6 classes de feu — en bureau IBM : classe A (papier/bois) et électrique sont les plus fréquentes.",
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
    duration: "9 min",
    image: `${CDN}11cdce1f8e754ca18f408758ae5ad7b9?format=webp&width=800`,
    funFacts: [
      { stat: "8-12 sec", label: "autonomie d'un extincteur CO2", detail: "Un extincteur CO2 standard se vide en 8 à 12 secondes. Chaque geste doit être précis et immédiat — pas de place à l'improvisation.", icon: "clock" },
      { stat: "-78°C", label: "température du cône CO2", detail: "Ne jamais tenir le cône d'un extincteur CO2 à mains nues. Le froid extrême provoque des brûlures en moins d'une seconde.", icon: "alert" },
    ],
    content: [
      {
        type: "intro",
        title: "La séquence PASS — 4 étapes essentielles",
        body: "Utiliser un extincteur de façon efficace nécessite de respecter une séquence précise. En situation de stress, cette séquence doit être automatique.",
        image: `${CDN}11cdce1f8e754ca18f408758ae5ad7b9?format=webp&width=800`,
      },
      {
        type: "list",
        title: "La séquence P.A.S.S.",
        body: "Mémorisez ces 4 étapes dans cet ordre exact :",
        bullets: [
          "P — Puller (tirer) : dégoupiller en retirant la goupille de sécurité",
          "A — Aimer (viser) : pointer le tuyau à la base des flammes, pas en haut",
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
      "PASS : Pointer, Allumer, Serrer, Souffler — 4 étapes dans cet ordre, sans exception.",
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
    duration: "10 min",
    image: `${CDN}8e074d1b7bdf4b8fa872d5fd2451fbfe?format=webp&width=800`,
    funFacts: [
      { stat: "10 sec", label: "pour prendre la décision critique", detail: "IBM fixe un délai de 10 secondes d'observation. Au-delà, la décision doit être prise : intervenir ou évacuer. Pas de troisième option.", icon: "clock" },
      { stat: "70%", label: "des victimes auraient pu évacuer", detail: "70% des décès par incendie en entreprise concernent des personnes qui avaient encore le temps d'évacuer mais ont hésité.", icon: "alert" },
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
        type: "scenario",
        title: "Cas critique : fumée dans une salle serveur",
        body: "Fumée dense dans la salle serveur IBM. La porte est chaude. Vous avez un CO2 dans le couloir.",
        image: `${CDN}0a014c78f73a47e0bede94510887ef36?format=webp&width=800`,
        highlight: "Réponse : ÉVACUER. Porte chaude + fumée dense = feu développé. Ne jamais ouvrir.",
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
    duration: "12 min",
    image: `${CDN}dfd2975e7d864d029e522928a710aa05?format=webp&width=800`,
    funFacts: [
      { stat: "40%", label: "de réduction du temps d'évacuation", detail: "Les entreprises qui organisent des exercices incendie réguliers réduisent leur temps d'évacuation de 40% en moyenne.", icon: "shield" },
      { stat: "2×/an", label: "exercices IBM obligatoires par site", detail: "IBM France organise 2 exercices incendie annuels par site. Chaque collaborateur doit y participer — l'absence est signalée aux RH.", icon: "eye" },
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
    duration: "6 min",
    image: `${CDN}2482acaedcdd4b2abad18b1011a424c6?format=webp&width=800`,
    funFacts: [
      { stat: "6 m²", label: "de propagation par seconde de retard", detail: "Chaque seconde de retard à déclencher l'alarme représente en moyenne 6m² de surface supplémentaire touchée par le feu.", icon: "flame" },
      { stat: "22 22", label: "le numéro IBM à composer EN PREMIER", detail: "Avant le 18 et le 15, composez le 22 22. La sécurité IBM connaît le plan des bâtiments et peut intervenir plus rapidement.", icon: "shield" },
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
        image: `${CDN}0385f320d59547b2b6d08166e29ab8f3?format=webp&width=800`,
        highlight: "Après déclenchement : ne pas bloquer les issues et commencer l'évacuation.",
      },
    ],
    keyPoints: [
      "Composer le 22 22 EN PREMIER — avant le 18 et le 15. La sécurité IBM connaît le bâtiment.",
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
    duration: "7 min",
    image: `${CDN}73ee73f4c5c54adb943d454c10b797a9?format=webp&width=800`,
    funFacts: [
      { stat: "3×", label: "la panique ralentit l'évacuation", detail: "Une évacuation désordonnée et paniquée est 3 fois plus lente. Le sang-froid et les consignes claires sauvent des vies.", icon: "alert" },
      { stat: "1 voix", label: "suffit pour structurer 20 personnes", detail: "Un collaborateur formé qui prend le commandement vocal peut structurer une évacuation de 20 personnes en moins de 30 secondes.", icon: "zap" },
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
          { key: "B", label: "'Attention, alarm déclenchée. Suivez-moi par l'escalier B.'", hint: "Calme et directif" },
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
    duration: "5 min",
    image: `${CDN}0385f320d59547b2b6d08166e29ab8f3?format=webp&width=800`,
    funFacts: [
      { stat: "20%", label: "reviennent chercher leurs affaires", detail: "20% des décès lors d'incendies surviennent chez des personnes revenues chercher leurs effets personnels. Rien ne vaut une vie.", icon: "alert" },
      { stat: "3 min", label: "les plus dangereuses de l'évacuation", detail: "Les 3 premières minutes d'évacuation concentrent 80% des risques. Une sortie rapide et ordonnée est la seule priorité.", icon: "clock" },
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
      "SOS : Sortir, Ouvrir/fermer les portes, Signaler — la séquence d'évacuation IBM en 3 actes.",
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
    duration: "8 min",
    image: `${CDN}b5ca9823c0ba42e492f17a707fd14708?format=webp&width=800`,
    funFacts: [
      { stat: "3×", label: "la fumée tue plus que les flammes", detail: "L'inhalation de fumée toxique tue 3 fois plus que les brûlures directes. Se baisser sous 1m réduit l'exposition de 80%.", icon: "alert" },
      { stat: "1 m", label: "la hauteur de survie en fumée dense", detail: "En dessous de 1 mètre, l'air est 80% plus respirable qu'en position debout lors d'un incendie avec fumée dense.", icon: "shield" },
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
    duration: "8 min",
    image: `${CDN}cc5ab29f9fd543a2aff682cdd54297ad?format=webp&width=800`,
    funFacts: [
      { stat: "0.3 sec", label: "inhalation létale de certains gaz", detail: "Certains gaz issus de plastiques brûlés peuvent causer une perte de conscience en moins de 0.3 seconde à forte concentration.", icon: "zap" },
      { stat: "40°C", label: "la chaleur de la fumée à hauteur des yeux", detail: "À hauteur debout, la fumée peut atteindre 40 à 60°C lors d'un incendie de bureau — suffisant pour brûler les voies respiratoires.", icon: "flame" },
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
    duration: "7 min",
    image: `${CDN}48e0cc79ee294fbbaf81f10232959ffb?format=webp&width=800`,
    funFacts: [
      { stat: "100%", label: "des décès en ascenseur sont évitables", detail: "L'ascenseur en cas d'incendie est un piège : coupure électrique, enfumage, portes bloquées. Escaliers uniquement, toujours.", icon: "alert" },
      { stat: "4×", label: "plus lent en ascenseur qu'en escalier", detail: "Le temps d'évacuation via ascenseur est en moyenne 4 fois plus long qu'une évacuation ordonnée par les escaliers de secours.", icon: "clock" },
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
    duration: "12 min",
    image: `${CDN}2ee3c4ada85544aa87e2f4f440dc1a94?format=webp&width=800`,
    funFacts: [
      { stat: "85%", label: "de réduction du risque de décès", detail: "Une formation incendie bien exécutée et régulièrement pratiquée réduit le risque de décès de 85% en situation réelle.", icon: "shield" },
      { stat: "14 modules", label: "pour être pleinement opérationnel", detail: "Vous terminez les 14 modules IBM. Chaque réflexe appris ici peut faire la différence entre une évacuation réussie et une tragédie.", icon: "zap" },
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
        image: `${CDN}b5ca9823c0ba42e492f17a707fd14708?format=webp&width=800`,
        highlight: "Votre objectif : tout le monde au point de rassemblement en moins de 3 minutes.",
      },
    ],
    keyPoints: [
      "Simulation finale : alarme → évacuation ordonnée → point de rassemblement en moins de 3 minutes.",
      "Une formation complète réduit le risque de décès de 85% — vous avez atteint ce niveau.",
      "Votre certification IBM HSE est valide 2 ans — participez aux exercices annuels pour la maintenir.",
    ],
    quiz: [
      {
        id: "q1",
        question: "Première action après déclenchement de l'alarme ?",
        choices: [
          { key: "A", label: "Prendre mes affaires importantes avant de partir" },
          { key: "B", label: "Déclencher l'alarme si ce n'est pas déjà fait et guider mes collègues", hint: "Alerte + guidage" },
          { key: "C", label: "Appeler mon manager pour confirmation" },
          { key: "D", label: "Attendre que les autres bougent d'abord" },
        ],
        correctKey: "B",
        feedbackOk: "Parfait. Confirmer l'alerte et guider immédiatement — les affaires ne comptent pas.",
        feedbackKo: "Aucune affaire ne vaut une vie. Confirmer l'alarme et guider les collègues est la priorité absolue.",
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
