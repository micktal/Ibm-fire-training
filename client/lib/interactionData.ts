import { HotspotExercise } from "@/components/interactions/HotspotImage";
import { DragDropExercise } from "@/components/interactions/DragAndDrop";
import { BranchingExercise } from "@/components/interactions/BranchingScenario";

export type AnyExercise = HotspotExercise | DragDropExercise | BranchingExercise;

const CDN = "https://cdn.builder.io/api/v1/image/assets%2Fd93d9a0ec7824aa1ac4d890a1f90a2ec%2F";

// ── CHAPITRE 1 ─────────────────────────────────────────────────

// M1 — Comprendre un départ de feu
const m1_hotspot: HotspotExercise = {
  type: "hotspot",
  instruction: "Suivez les 3 réflexes dans le bon ordre face à ce départ de feu",
  context: "Cliquez sur les zones dans l'ordre : que faites-vous en premier, deuxième, troisième ?",
  image: `${CDN}f70ab7cdd9114da8bfd5ad197221b46b?format=webp&width=800`,
  successMessage: "Parfait — les 3 réflexes IBM sont maîtrisés : Débrancher → Alarme → Évacuer",
  hotspots: [
    {
      id: "hs1", x: 62, y: 78,
      label: "1 — Débrancher la prise",
      description: "La multiprise en feu est la source du sinistre. Le premier réflexe est de couper l'alimentation électrique pour supprimer le combustible et stopper la propagation.",
      type: "danger",
      detail: "Jamais d'eau sur un feu électrique — CO2 uniquement. Si inaccessible, couper le disjoncteur.",
    },
    {
      id: "hs2", x: 13, y: 30,
      label: "2 — Déclencher l'alarme",
      description: "Ce déclencheur manuel 'FIRE — PULL DOWN' alerte immédiatement tout le bâtiment et le service de sécurité IBM. À activer avant d'évacuer.",
      type: "info",
      detail: "IBM : composez aussi le 22 22 pour prévenir la sécurité interne, avant le 18.",
    },
    {
      id: "hs3", x: 82, y: 50,
      label: "3 — Évacuer le bâtiment",
      description: "Une fois l'alarme déclenchée, quittez immédiatement les lieux par les sorties de secours. Ne revenez jamais chercher vos affaires.",
      type: "safe",
      detail: "Rejoignez le point de rassemblement désigné et signalez-vous à votre responsable évacuation.",
    },
  ],
};

const m1_branching: BranchingExercise = {
  type: "branching",
  title: "Les 3 réflexes en situation",
  subtitle: "Débrancher · Alarme · Évacuer",
  startNode: "step1",
  successMessage: "Parfait — vous avez appliqué les 3 réflexes IBM dans le bon ordre",
  failMessage: "Un ou plusieurs réflexes étaient incorrects — revoyez la séquence et réessayez",
  nodes: {
    step1: {
      id: "step1",
      image: `${CDN}f70ab7cdd9114da8bfd5ad197221b46b?format=webp&width=800`,
      situation: "Réflexe 1 — Une multiprise prend feu sous un bureau. Les flammes sont visibles. Quelle est votre première action ?",
      context: "Le feu est de petite taille. Un extincteur CO2 est à 5 mètres. La prise murale est accessible.",
      urgency: "high",
      timed: 12,
      choices: [
        {
          label: "Je débranche la prise ou coupe le disjoncteur du local",
          consequence: "Correct. Supprimer l'alimentation électrique stoppe la source du feu. C'est le premier réflexe IBM face à un feu électrique.",
          consequenceType: "ok",
          nextNode: "step2",
          points: 10,
        },
        {
          label: "Je déclenche immédiatement l'alarme incendie",
          consequence: "L'alarme est importante, mais pas en premier. Sans couper l'alimentation, le feu électrique continue de se propager pendant que vous courez vers l'alarme.",
          consequenceType: "ko",
          nextNode: "step2",
          points: 4,
        },
        {
          label: "Je verse de l'eau sur la multiprise pour éteindre",
          consequence: "Erreur critique. L'eau sur un feu électrique provoque un arc électrique et un risque d'électrocution immédiat. Jamais d'eau sur un feu électrique.",
          consequenceType: "critical",
          nextNode: "step2",
          points: 0,
        },
      ],
    },
    step2: {
      id: "step2",
      image: `${CDN}9cef8b4c4b544ccba1f46d55903ffdb8?format=webp&width=800`,
      situation: "Réflexe 2 — La prise est débranchée. Des traces de fumée persistent. Quelle est votre deuxième action ?",
      context: "Le boîtier d'alarme FIRE — PULL DOWN est à 3 mètres sur le mur. L'open space compte 12 personnes.",
      urgency: "high",
      choices: [
        {
          label: "Je déclenche l'alarme et compose le 22 22 (sécurité IBM)",
          consequence: "Correct. L'alarme alerte tout le bâtiment. Le 22 22 prévient la sécurité IBM avant le 18 — c'est la procédure IBM.",
          consequenceType: "ok",
          nextNode: "step3",
          points: 10,
        },
        {
          label: "Je préviens uniquement mes collègues à voix haute",
          consequence: "Insuffisant. Prévenir oralement ne suffit pas — les autres étages ne sont pas alertés. L'alarme est obligatoire.",
          consequenceType: "ko",
          nextNode: "step3",
          points: 3,
        },
        {
          label: "Je retourne vérifier si le feu est bien éteint",
          consequence: "Erreur. Un feu électrique peut reprendre. Votre priorité est d'alerter, pas de vérifier seul. Chaque seconde compte pour l'évacuation.",
          consequenceType: "ko",
          nextNode: "step3",
          points: 0,
        },
      ],
    },
    step3: {
      id: "step3",
      image: `${CDN}420fe533d58f4bcea4ab6851d6cc9ab6?format=webp&width=800`,
      situation: "Réflexe 3 — L'alarme est déclenchée. Que faites-vous maintenant ?",
      context: "Des collègues hésitent à partir. Certains veulent récupérer leurs affaires. La sortie de secours est à 15 mètres.",
      urgency: "high",
      choices: [
        {
          label: "J'évacue immédiatement par la sortie de secours sans prendre mes affaires",
          consequence: "Correct. L'évacuation est immédiate et sans détour. Ne jamais retourner chercher des affaires personnelles une fois l'alarme déclenchée.",
          consequenceType: "ok",
          nextNode: "end",
          points: 10,
        },
        {
          label: "Je prends mon ordinateur et mes affaires avant de partir",
          consequence: "Erreur. Chaque seconde perdue à récupérer des affaires peut être fatale. Un ordinateur ne vaut pas une vie.",
          consequenceType: "ko",
          nextNode: "end",
          points: 0,
        },
        {
          label: "J'attends que mes collègues se lèvent avant de partir avec eux",
          consequence: "Partiel. Encourager ses collègues est bien, mais ne pas attendre trop longtemps. Guidez-les vers la sortie sans attarder le groupe.",
          consequenceType: "ok",
          nextNode: "end",
          points: 7,
        },
      ],
    },
    end: {
      id: "end",
      situation: "Scénario terminé. Les 3 étapes ont été traversées.",
      context: "Résultat basé sur la qualité de vos 3 décisions.",
      urgency: "low",
      choices: [
        {
          label: "Voir mon résultat",
          consequence: "Vous avez complété le scénario des 3 réflexes IBM.",
          consequenceType: "ok",
          points: 0,
        },
      ],
    },
  },
};

// M2 — Triangle du feu
const m2_dragdrop: DragDropExercise = {
  type: "dragdrop",
  instruction: "Associez chaque action extinctrice au bon élément du triangle du feu",
  context: "Glissez chaque méthode d'extinction vers l'élément qu'elle neutralise dans le triangle du feu.",
  successMessage: "Parfait — vous maîtrisez les mécanismes d'extinction !",
  items: [
    { id: "i1", label: "Extincteur CO2", emoji: "🧯", correctZone: "comburant" },
    { id: "i2", label: "Eau pulvérisée", emoji: "💧", correctZone: "chaleur" },
    { id: "i3", label: "Éloigner les papiers", emoji: "📄", correctZone: "combustible" },
    { id: "i4", label: "Couverture anti-feu", emoji: "🟦", correctZone: "comburant" },
    { id: "i5", label: "Poudre ABC", emoji: "⬜", correctZone: "comburant" },
    { id: "i6", label: "Débrancher l'appareil", emoji: "🔌", correctZone: "chaleur" },
  ],
  zones: [
    {
      id: "combustible",
      label: "Combustible",
      sublabel: "Ce qui brûle — retirer la matière",
      color: "#b45309",
      bgColor: "rgba(180,83,9,0.06)",
      borderColor: "rgba(180,83,9,0.25)",
    },
    {
      id: "comburant",
      label: "Comburant (Oxygène)",
      sublabel: "Ce qui alimente — étouffer le feu",
      color: "#0043ce",
      bgColor: "rgba(0,67,206,0.06)",
      borderColor: "rgba(0,67,206,0.25)",
    },
    {
      id: "chaleur",
      label: "Énergie / Chaleur",
      sublabel: "Ce qui enflamme — refroidir",
      color: "#da1e28",
      bgColor: "rgba(218,30,40,0.06)",
      borderColor: "rgba(218,30,40,0.25)",
    },
  ],
};

const m2_branching: BranchingExercise = {
  type: "branching",
  title: "Feu de poubelle — Quel élément supprimer ?",
  startNode: "start",
  successMessage: "Vous avez identifié correctement comment casser la combustion",
  nodes: {
    start: {
      id: "start",
      image: `${CDN}fe758a5b35224b1bae42de1253d3aa38?format=webp&width=800`,
      situation: "Une poubelle prend feu dans la salle de reprographie. Les flammes sont à mi-hauteur de la corbeille.",
      context: "Il y a du papier, un extincteur CO2, et une fenêtre ouverte à proximité.",
      urgency: "medium",
      choices: [
        {
          label: "Fermer la fenêtre pour réduire l'oxygène, puis utiliser le CO2",
          consequence: "Excellent raisonnement. Réduire l'apport en oxygène (comburant) avant d'utiliser le CO2 maximise l'efficacité de l'extinction.",
          consequenceType: "ok",
          points: 10,
        },
        {
          label: "Utiliser directement l'extincteur CO2 sur les flammes",
          consequence: "Bonne action. Le CO2 prive le feu d'oxygène (comburant). Le résultat est efficace même sans fermer la fenêtre.",
          consequenceType: "ok",
          points: 8,
        },
        {
          label: "Retirer le papier qui brûle avec les mains",
          consequence: "Très dangereux. Manipuler des matériaux en feu sans protection entraîne des brûlures graves.",
          consequenceType: "critical",
          points: 0,
        },
        {
          label: "Souffler fort sur le feu",
          consequence: "Erreur grave. Souffler apporte de l'oxygène — c'est l'inverse de ce qu'il faut faire. Le feu s'intensifie.",
          consequenceType: "ko",
          points: 0,
        },
      ],
    },
  },
};

// M3 — Propagation
const m3_hotspot: HotspotExercise = {
  type: "hotspot",
  instruction: "Identifiez les facteurs qui accélèrent la propagation dans ce couloir",
  context: "Analysez la scène. Quels éléments aggravent la situation ? Lesquels la ralentissent ?",
  image: `${CDN}ae7ab6be35ac484da68c1cbf7d50cf6c?format=webp&width=800`,
  successMessage: "Analyse complète — vous comprenez les mécanismes de propagation",
  hotspots: [
    {
      id: "h1", x: 20, y: 60,
      label: "Foyer principal — équipement en feu",
      description: "L'équipement électrique en surchauffe est la source du départ de feu. La chaleur rayonnante et les particules enflammées propagent le feu aux matériaux voisins.",
      type: "danger",
      detail: "Un équipement qui chauffe anormalement doit être signalé immédiatement",
    },
    {
      id: "h2", x: 55, y: 35,
      label: "Fumée dense en hauteur",
      description: "La fumée noire monte vers le plafond et se propage dans le couloir. Elle indique la direction du feu et réduit la visibilité. L'air respirable est au ras du sol.",
      type: "danger",
      detail: "En cas de fumée : se baisser sous le niveau de fumée et longer les murs",
    },
    {
      id: "h3", x: 82, y: 50,
      label: "Déclencheur d'alarme manuel",
      description: "Le déclencheur est visible et accessible sur le mur du couloir. L'activer immédiatement permet d'alerter tout le bâtiment et de déclencher l'évacuation.",
      type: "safe",
      detail: "Distance maximale réglementaire : 30m entre deux déclencheurs",
    },
    {
      id: "h4", x: 70, y: 78,
      label: "Extincteur CO2",
      description: "Un extincteur est fixé au mur, accessible rapidement. Adapté aux feux électriques (classe E). À utiliser uniquement si le feu est petit et la sortie derrière soi.",
      type: "info",
      detail: "Ne jamais s'interposer entre le feu et la sortie lors de l'utilisation",
    },
  ],
};

const m3_branching: BranchingExercise = {
  type: "branching",
  title: "Propagation — Vos choix ont des conséquences",
  startNode: "corridor",
  successMessage: "Vous avez limité la propagation par vos bonnes décisions",
  failMessage: "Vos actions ont accéléré la propagation — chaque geste compte",
  nodes: {
    corridor: {
      id: "corridor",
      image: `${CDN}420fe533d58f4bcea4ab6851d6cc9ab6?format=webp&width=800`,
      situation: "Fumée dans le couloir. Vous venez de quitter votre bureau. La porte est encore ouverte derrière vous.",
      context: "Vous êtes à 3 mètres de la porte ouverte. Des collègues arrivent de l'autre côté du couloir.",
      urgency: "high",
      timed: 12,
      choices: [
        {
          label: "Je retourne fermer la porte de mon bureau",
          consequence: "Très bien. 3 secondes pour fermer = potentiellement 30 minutes de résistance au feu supplémentaires. La propagation est ralentie.",
          consequenceType: "ok",
          nextNode: "alarm",
          points: 10,
        },
        {
          label: "Je laisse la porte ouverte et j'évacue vite",
          consequence: "Erreur. La porte ouverte agit comme un couloir à feu — la propagation s'accélère immédiatement vers les pièces adjacentes.",
          consequenceType: "ko",
          nextNode: "alarm",
          points: 3,
        },
        {
          label: "Je retourne dans mon bureau chercher mes affaires",
          consequence: "Erreur critique. Les affaires n'ont aucune valeur face à votre sécurité. Vous perdez un temps précieux en zone dangereuse.",
          consequenceType: "critical",
          nextNode: "alarm",
          points: 0,
        },
      ],
    },
    alarm: {
      id: "alarm",
      image: `${CDN}2482acaedcdd4b2abad18b1011a424c6?format=webp&width=800`,
      situation: "Vous êtes dans le couloir. L'alarme n'a pas encore sonné. Vous voyez un déclencheur manuel à 5 mètres.",
      urgency: "high",
      choices: [
        {
          label: "Je déclenche l'alarme manuelle immédiatement",
          consequence: "Excellent. Toutes les personnes du bâtiment sont alertées. L'évacuation peut commencer dans les meilleures conditions.",
          consequenceType: "ok",
          nextNode: "evacuation",
          points: 10,
        },
        {
          label: "Je continue d'évacuer sans déclencher — quelqu'un d'autre le fera",
          consequence: "Décision insuffisante. Chaque seconde sans alarme = des personnes non alertées. La propagation gagne du terrain.",
          consequenceType: "ko",
          nextNode: "evacuation",
          points: 2,
        },
      ],
    },
    evacuation: {
      id: "evacuation",
      situation: "Fin du scénario de propagation.",
      context: "Vos décisions ont directement influencé la vitesse de propagation et la sécurité de vos collègues.",
      urgency: "low",
      choices: [
        {
          label: "Consulter le bilan de mes décisions",
          consequence: "La somme de chaque micro-décision détermine l'issue d'un incendie.",
          consequenceType: "ok",
          points: 5,
        },
      ],
    },
  },
};

// M4 — Classes de feu
const m4_dragdrop: DragDropExercise = {
  type: "dragdrop",
  instruction: "Associez chaque objet ou situation à sa classe de feu correcte",
  context: "Dans vos locaux IBM, identifiez correctement la nature du feu pour choisir le bon extincteur.",
  successMessage: "Excellent — vous savez identifier les classes de feu dans votre environnement de travail !",
  items: [
    { id: "i1", label: "Papier / documents", emoji: "📋", correctZone: "A" },
    { id: "i2", label: "Rack serveur sous tension", emoji: "🖥️", correctZone: "elec" },
    { id: "i3", label: "Alcool désinfectant", emoji: "🧴", correctZone: "B" },
    { id: "i4", label: "Mobilier de bureau", emoji: "🪑", correctZone: "A" },
    { id: "i5", label: "Câbles électriques", emoji: "🔌", correctZone: "elec" },
    { id: "i6", label: "Solvant de nettoyage", emoji: "🧪", correctZone: "B" },
    { id: "i7", label: "Huile machine / cuisine", emoji: "🍳", correctZone: "F" },
    { id: "i8", label: "Chargeur de laptop", emoji: "💻", correctZone: "elec" },
  ],
  zones: [
    {
      id: "A",
      label: "Classe A — Solides",
      sublabel: "Extincteur eau / mousse",
      color: "#b45309",
      bgColor: "rgba(180,83,9,0.06)",
      borderColor: "rgba(180,83,9,0.25)",
    },
    {
      id: "B",
      label: "Classe B — Liquides",
      sublabel: "Extincteur CO2 / poudre",
      color: "#7c3aed",
      bgColor: "rgba(124,58,237,0.06)",
      borderColor: "rgba(124,58,237,0.25)",
    },
    {
      id: "elec",
      label: "Feu électrique",
      sublabel: "CO2 uniquement — jamais d'eau",
      color: "#0043ce",
      bgColor: "rgba(0,67,206,0.06)",
      borderColor: "rgba(0,67,206,0.25)",
    },
    {
      id: "F",
      label: "Classe F — Huiles/graisses",
      sublabel: "Extincteur classe F uniquement",
      color: "#da1e28",
      bgColor: "rgba(218,30,40,0.06)",
      borderColor: "rgba(218,30,40,0.25)",
    },
  ],
};

// M5 — Extincteur
const m5_hotspot: HotspotExercise = {
  type: "hotspot",
  instruction: "Identifiez les composants d'un extincteur et les étapes PASS",
  context: "Cliquez sur chaque partie de l'extincteur pour comprendre son fonctionnement.",
  image: `${CDN}11cdce1f8e754ca18f408758ae5ad7b9?format=webp&width=800`,
  successMessage: "Vous connaissez votre extincteur — prêt pour une utilisation en situation réelle",
  hotspots: [
    {
      id: "h1", x: 35, y: 18,
      label: "P — Pull (Tirer la goupille)",
      description: "La goupille de sécurité empêche l'activation accidentelle. Tirez-la d'un mouvement sec. C'est toujours la PREMIÈRE étape.",
      type: "info",
      detail: "Sans retirer la goupille, l'extincteur ne s'active pas",
    },
    {
      id: "h2", x: 55, y: 32,
      label: "A — Aim (Viser la base)",
      description: "Pointez le tuyau ou la buse vers la BASE des flammes — jamais vers le haut. La base est là où se trouve le combustible.",
      type: "info",
      detail: "Distance optimale : 2 à 3 mètres du foyer",
    },
    {
      id: "h3", x: 45, y: 50,
      label: "S — Squeeze (Presser la poignée)",
      description: "Appuyez fermement sur la poignée de déclenchement. Maintenir une pression continue pour un jet régulier.",
      type: "info",
      detail: "Durée de décharge d'un CO2 : 8 à 12 secondes",
    },
    {
      id: "h4", x: 30, y: 70,
      label: "S — Sweep (Balayer)",
      description: "Balayez lentement de gauche à droite, toujours en visant la base. Continuez jusqu'à extinction complète.",
      type: "safe",
      detail: "Si le feu ne recule pas en 30s : reculez et évacuez",
    },
    {
      id: "h5", x: 72, y: 60,
      label: "Étiquette de contrôle",
      description: "Vérifiez toujours la date de dernier contrôle. Un extincteur non vérifié peut être vide ou défaillant. Contrôle annuel obligatoire.",
      type: "danger",
      detail: "Signaler tout extincteur périmé au service sécurité",
    },
  ],
};

const m5_branching: BranchingExercise = {
  type: "branching",
  title: "Utilisation PASS — Scénario réel",
  startNode: "start",
  successMessage: "Maîtrise de l'extincteur validée — séquence PASS appliquée correctement",
  nodes: {
    start: {
      id: "start",
      image: `${CDN}65b652843ba640ae94a5ffd9b614c5b0?format=webp&width=800`,
      situation: "Feu de câbles sur un bureau. Vous avez un extincteur CO2. Le feu est petit. La sortie est à 4 mètres derrière vous.",
      urgency: "high",
      timed: 15,
      choices: [
        {
          label: "Je me positionne face au feu, sortie dans le dos, à 2-3m",
          consequence: "Position correcte. Sortie dans le dos = possibilité de retraite. Distance de 2-3m = efficacité maximale sans risque de brûlure.",
          consequenceType: "ok",
          nextNode: "pass",
          points: 10,
        },
        {
          label: "Je m'approche le plus possible pour un meilleur jet",
          consequence: "Erreur. S'approcher trop près expose aux flammes et à la chaleur. La position correcte est à 2-3 mètres.",
          consequenceType: "ko",
          nextNode: "pass",
          points: 3,
        },
        {
          label: "Je lance l'extincteur vers le feu et je cours",
          consequence: "Erreur critique. Un extincteur lancé n'éteint pas le feu et peut blesser des personnes. Il faut toujours tenir l'extincteur.",
          consequenceType: "critical",
          points: 0,
        },
      ],
    },
    pass: {
      id: "pass",
      situation: "Vous êtes en position. Première étape PASS — P comme Pull.",
      urgency: "high",
      choices: [
        {
          label: "Je tire la goupille de sécurité d'un geste sec",
          consequence: "Parfait. La goupille est retirée — l'extincteur est maintenant opérationnel. Passez à l'étape suivante.",
          consequenceType: "ok",
          nextNode: "aim",
          points: 10,
        },
        {
          label: "J'appuie directement sur la poignée sans retirer la goupille",
          consequence: "Erreur. Sans retirer la goupille, l'extincteur ne peut pas s'activer. Précieuses secondes perdues.",
          consequenceType: "ko",
          nextNode: "aim",
          points: 0,
        },
      ],
    },
    aim: {
      id: "aim",
      situation: "Goupille retirée. Où pointez-vous le tuyau ?",
      urgency: "high",
      choices: [
        {
          label: "Je vise la base des flammes — là où le feu rencontre le combustible",
          consequence: "Exact. C'est à la base que se coupe la combustion. Le jet de CO2 prive le feu d'oxygène à sa source.",
          consequenceType: "ok",
          nextNode: "sweep",
          points: 10,
        },
        {
          label: "Je vise le haut des flammes pour les couvrir de CO2",
          consequence: "Erreur. Viser le haut des flammes n'atteint pas la source de combustion. Le feu continue de brûler à sa base.",
          consequenceType: "ko",
          nextNode: "sweep",
          points: 2,
        },
        {
          label: "Je vise la fumée pour la dissiper",
          consequence: "Erreur. La fumée n'est pas le feu. Viser la fumée gaspille l'agent extincteur (8-12 secondes seulement disponibles).",
          consequenceType: "ko",
          nextNode: "sweep",
          points: 0,
        },
      ],
    },
    sweep: {
      id: "sweep",
      situation: "Le jet est actif. Comment appliquez-vous l'agent extincteur ?",
      urgency: "medium",
      choices: [
        {
          label: "Je balaie de gauche à droite à la base, de façon régulière",
          consequence: "Parfait. Le balayage latéral à la base couvre toute la surface de combustion. Le feu recule progressivement.",
          consequenceType: "ok",
          points: 10,
        },
        {
          label: "Je fixe un point central pour concentrer le jet",
          consequence: "Insuffisant. Un point fixe ne couvre pas toute la surface de combustion. Les bords continuent de brûler.",
          consequenceType: "ko",
          points: 3,
        },
      ],
    },
  },
};

// M6 — Intervenir ou évacuer
const m6_branching: BranchingExercise = {
  type: "branching",
  title: "Intervenir ou évacuer — Arbre décisionnel",
  startNode: "assess",
  successMessage: "Excellentes décisions — vous avez su évaluer la situation et agir correctement",
  failMessage: "Certaines décisions vous ont mis en danger — la prudence est toujours prioritaire",
  nodes: {
    assess: {
      id: "assess",
      image: `${CDN}8e074d1b7bdf4b8fa872d5fd2451fbfe?format=webp&width=800`,
      situation: "Alarme déclenchée. Vous arrivez dans un couloir avec de la fumée. Un extincteur CO2 est à portée.",
      context: "Évaluez la situation avant d'agir. Vous avez 10 secondes.",
      urgency: "high",
      timed: 10,
      choices: [
        {
          label: "J'évalue : taille du feu, fumée, sortie disponible, avant d'agir",
          consequence: "Bonne pratique. Evaluer 5 secondes évite les mauvaises décisions. Vous observez : fumée légère, petite flamme visible, sortie dégagée.",
          consequenceType: "ok",
          nextNode: "small_fire",
          points: 10,
        },
        {
          label: "J'attrape l'extincteur et je charge vers le feu sans évaluer",
          consequence: "Dangereux. Sans évaluation, vous risquez d'intervenir sur un feu trop développé ou de type incompatible.",
          consequenceType: "ko",
          nextNode: "small_fire",
          points: 2,
        },
        {
          label: "J'évacue immédiatement sans évaluer",
          consequence: "Décision de sécurité acceptable, mais l'évaluation rapide permet de décider plus intelligemment.",
          consequenceType: "ok",
          nextNode: "evacuation_end",
          points: 7,
        },
      ],
    },
    small_fire: {
      id: "small_fire",
      image: `${CDN}c9200dd4ae614e34bdabdf8975debe07?format=webp&width=800`,
      situation: "Petit feu électrique dans la salle serveur. Fumée légère. Extincteur CO2 disponible. Sortie dégagée à 5m.",
      context: "Toutes les conditions pour une intervention semblent réunies.",
      urgency: "high",
      choices: [
        {
          label: "J'interviens — feu petit, CO2 adapté, sortie libre, je suis formé",
          consequence: "Décision correcte. Toutes les conditions sont réunies : petit feu, bon agent extincteur, sortie dégagée. Vous maîtrisez le foyer.",
          consequenceType: "ok",
          nextNode: "door_hot",
          points: 10,
        },
        {
          label: "J'ouvre la porte de la salle serveur pour évaluer de plus près",
          consequence: "Attention. Ouvrir la porte peut apporter de l'oxygène et intensifier le feu. Toujours évaluer sans ouvrir si possible.",
          consequenceType: "ko",
          nextNode: "door_hot",
          points: 4,
        },
      ],
    },
    door_hot: {
      id: "door_hot",
      image: `${CDN}0a014c78f73a47e0bede94510887ef36?format=webp&width=800`,
      situation: "Nouveau secteur. Une porte est chaude au toucher. De la fumée noire passe par dessous.",
      urgency: "high",
      choices: [
        {
          label: "Je n'ouvre pas — feu développé derrière. Je recule et évacue.",
          consequence: "Décision vitale. Porte chaude + fumée noire = feu développé. Ouvrir = aspirer le feu vers vous. Retraite immédiate.",
          consequenceType: "ok",
          nextNode: "evacuation_end",
          points: 10,
        },
        {
          label: "J'ouvre doucement pour éteindre avec mon CO2",
          consequence: "Erreur potentiellement fatale. La différence de pression aspire le feu vers vous au moment de l'ouverture.",
          consequenceType: "critical",
          nextNode: "evacuation_end",
          points: 0,
        },
        {
          label: "J'arrose le bas de la porte avec le CO2",
          consequence: "Erreur. Le CO2 ne traverse pas la porte et refroidit uniquement la surface extérieure. Le feu continue de l'autre côté.",
          consequenceType: "ko",
          nextNode: "evacuation_end",
          points: 1,
        },
      ],
    },
    evacuation_end: {
      id: "evacuation_end",
      situation: "Fin de l'exercice de décision. Vous avez traversé différents scénarios d'intervention.",
      urgency: "low",
      choices: [
        {
          label: "Valider mes décisions et voir le bilan",
          consequence: "La règle d'or : quand le doute existe, toujours évacuer. Intervenir uniquement si toutes les conditions sont réunies.",
          consequenceType: "ok",
          points: 5,
        },
      ],
    },
  },
};

// M7 — Simulation incendie complète
const m7_branching: BranchingExercise = {
  type: "branching",
  title: "Simulation complète — Chapitre 1",
  subtitle: "Score Réflexes Incendie",
  startNode: "alarm_rings",
  successMessage: "Score Réflexes Incendie — Niveau Expert. Tous les bons réflexes acquis.",
  failMessage: "Des décisions à améliorer. La simulation permet de progresser sans risque.",
  nodes: {
    alarm_rings: {
      id: "alarm_rings",
      image: `${CDN}dfd2975e7d864d029e522928a710aa05?format=webp&width=800`,
      situation: "14h30. L'alarme retentit. Fumée légère dans le couloir. Vous êtes au 3e étage.",
      context: "Plusieurs collègues regardent autour d'eux, hésitants. Un extincteur CO2 est visible à 3 mètres.",
      urgency: "high",
      timed: 8,
      choices: [
        {
          label: "Évaluer rapidement et guider mes collègues vers la sortie",
          consequence: "Parfait. Leadership dans la crise. Vos collègues vous suivent calmement vers l'escalier.",
          consequenceType: "ok",
          nextNode: "close_door",
          points: 10,
        },
        {
          label: "Prendre l'extincteur et chercher le foyer seul",
          consequence: "Risqué sans évaluation préalable. Vous vous isolez du groupe. Vos collègues paniquent sans guidance.",
          consequenceType: "ko",
          nextNode: "close_door",
          points: 4,
        },
        {
          label: "Attendre les instructions du responsable de sécurité",
          consequence: "Trop passif. Le responsable peut ne pas être disponible. Chacun doit être capable d'initier l'évacuation.",
          consequenceType: "ko",
          nextNode: "close_door",
          points: 2,
        },
      ],
    },
    close_door: {
      id: "close_door",
      image: `${CDN}b18156d7c7644f34a12cfbc171ae4907?format=webp&width=800`,
      situation: "Vous quittez l'open space. La porte est encore ouverte derrière vous.",
      urgency: "high",
      timed: 6,
      choices: [
        {
          label: "Je ferme la porte derrière moi avant d'avancer",
          consequence: "Réflexe essentiel. Porte fermée = 30 minutes de résistance supplémentaires au feu.",
          consequenceType: "ok",
          nextNode: "smoke_corridor",
          points: 10,
        },
        {
          label: "Trop urgent — je continue sans fermer",
          consequence: "Erreur. 3 secondes pour fermer = potentiellement des vies sauvées. C'est toujours la bonne décision.",
          consequenceType: "ko",
          nextNode: "smoke_corridor",
          points: 0,
        },
      ],
    },
    smoke_corridor: {
      id: "smoke_corridor",
      image: `${CDN}cc5ab29f9fd543a2aff682cdd54297ad?format=webp&width=800`,
      situation: "Dans l'escalier, vous rencontrez de la fumée à mi-hauteur.",
      context: "La sortie est en bas, à 2 étages. La fumée monte lentement.",
      urgency: "high",
      choices: [
        {
          label: "Je me baisse sous la fumée et descends rapidement en longeant la rampe",
          consequence: "Réflexe parfait. L'air respirable est en bas. Vous descendez en sécurité.",
          consequenceType: "ok",
          nextNode: "assembly_point",
          points: 10,
        },
        {
          label: "Je remonte pour trouver un autre escalier",
          consequence: "Décision risquée. Remonter vous éloigne de la sortie et vous expose davantage à la fumée.",
          consequenceType: "ko",
          nextNode: "assembly_point",
          points: 3,
        },
        {
          label: "Je cours en restant debout — plus vite c'est mieux",
          consequence: "Dangereux. Debout dans la fumée = inhalation de gaz toxiques. Se baisser est impératif.",
          consequenceType: "critical",
          nextNode: "assembly_point",
          points: 0,
        },
      ],
    },
    assembly_point: {
      id: "assembly_point",
      image: `${CDN}b5ca9823c0ba42e492f17a707fd14708?format=webp&width=800`,
      situation: "Vous êtes au point de rassemblement. Des collègues manquent à l'appel.",
      urgency: "medium",
      choices: [
        {
          label: "Je signale immédiatement les absents au responsable d'évacuation",
          consequence: "Crucial. Les secours ont besoin de savoir qui manque pour orienter leur intervention.",
          consequenceType: "ok",
          points: 10,
        },
        {
          label: "Je retourne chercher mes collègues manquants moi-même",
          consequence: "Dangereux. Retourner dans un bâtiment en feu sans équipement adapté met votre vie en danger.",
          consequenceType: "critical",
          points: 0,
        },
        {
          label: "J'attends — les secours sauront ce qu'ils font",
          consequence: "Insuffisant. L'information sur les personnes manquantes est vitale et doit être communiquée activement.",
          consequenceType: "ko",
          points: 3,
        },
      ],
    },
  },
};

// ── CHAPITRE 2 ─────────────────────────────────────────────────

// CH2 M1 — Déclencher l'alarme
const ch2m1_hotspot: HotspotExercise = {
  type: "hotspot",
  instruction: "Localisez et identifiez tous les déclencheurs d'alarme dans cette scène",
  context: "Dans un vrai bureau IBM, repérez les équipements d'alerte et comprenez leur fonctionnement.",
  image: `${CDN}2482acaedcdd4b2abad18b1011a424c6?format=webp&width=800`,
  successMessage: "Vous savez localiser et utiliser les systèmes d'alarme",
  hotspots: [
    {
      id: "h1", x: 18, y: 42,
      label: "Déclencheur manuel (boîtier rouge)",
      description: "Le déclencheur manuel FIRE PULL DOWN est le moyen le plus direct d'alerter tout le bâtiment. Briser le verre ou appuyer selon le modèle.",
      type: "info",
      detail: "Utilisation : 1 geste ferme suffit — l'alarme est immédiate et irréversible",
    },
    {
      id: "h2", x: 52, y: 15,
      label: "Détecteur de fumée au plafond",
      description: "Le détecteur automatique se déclenche quand la concentration de fumée dépasse le seuil. Peut prendre 2-5 minutes pour réagir.",
      type: "info",
      detail: "Ne pas attendre le détecteur automatique — le déclencheur manuel est plus rapide",
    },
    {
      id: "h3", x: 75, y: 58,
      label: "Foyer actif — déclenchement requis",
      description: "Un départ de feu est visible. Le déclencheur manuel est à moins de 10 mètres. Chaque seconde sans alerte = propagation supplémentaire.",
      type: "danger",
      detail: "Réflexe : déclencher l'alarme AVANT de tenter d'intervenir",
    },
    {
      id: "h4", x: 40, y: 75,
      label: "Signalisation sortie de secours",
      description: "La sortie de secours est identifiée par le pictogramme vert standardisé. Elle doit rester dégagée en permanence.",
      type: "safe",
      detail: "Ne jamais bloquer une issue de secours — même temporairement",
    },
  ],
};

// CH2 M2 — Garder son calme
const ch2m2_branching: BranchingExercise = {
  type: "branching",
  title: "Bonne formulation / Mauvaise formulation",
  startNode: "panic_situation",
  successMessage: "Communication de crise maîtrisée — calme et efficacité",
  failMessage: "Votre communication a généré de la panique — reformulez avec calme et précision",
  nodes: {
    panic_situation: {
      id: "panic_situation",
      image: `${CDN}73ee73f4c5c54adb943d454c10b797a9?format=webp&width=800`,
      situation: "L'alarme sonne. 12 collègues autour de vous commencent à paniquer. Certains courent dans tous les sens.",
      context: "Vous avez la présence d'esprit pour guider la situation. Quelle est votre réaction ?",
      urgency: "high",
      timed: 12,
      choices: [
        {
          label: "Voix ferme : 'Attention tout le monde — suivez-moi par l'escalier B, maintenant, calmement.'",
          consequence: "Communication parfaite. Voix ferme mais calme, direction précise, action immédiate. 11 collègues vous suivent directement.",
          consequenceType: "ok",
          nextNode: "guide_check",
          points: 10,
        },
        {
          label: "'Au feu ! Sortez ! Courez !' en criant très fort",
          consequence: "Contre-productif. Crier amplifie la panique. Les gens se bousculent et perdent la capacité de raisonnement.",
          consequenceType: "ko",
          nextNode: "guide_check",
          points: 1,
        },
        {
          label: "'Je ne sais pas où aller, essayons par ici...'",
          consequence: "Inefficace. L'hésitation se propage immédiatement. Un guide incertain génère le chaos.",
          consequenceType: "ko",
          nextNode: "guide_check",
          points: 0,
        },
        {
          label: "'Restez calmes et attendez les instructions officielles'",
          consequence: "Trop passif. En situation d'alarme, chaque seconde compte. Attendre des instructions supplémentaires retarde l'évacuation.",
          consequenceType: "ko",
          nextNode: "guide_check",
          points: 3,
        },
      ],
    },
    guide_check: {
      id: "guide_check",
      situation: "En marchant vers l'escalier, un collègue vous dit qu'il retourne chercher son ordinateur.",
      urgency: "medium",
      choices: [
        {
          label: "'Laissez vos affaires — votre vie vaut plus. Suivez-moi maintenant.'",
          consequence: "Parfait. Message clair, priorité absolue établie, ton ferme sans agressivité.",
          consequenceType: "ok",
          points: 10,
        },
        {
          label: "Je le laisse faire — c'est sa responsabilité",
          consequence: "Erreur. Vous avez la responsabilité de guider. Laisser quelqu'un retourner dans un bâtiment en feu est inacceptable.",
          consequenceType: "critical",
          points: 0,
        },
        {
          label: "'D'accord mais faites vite — on vous attend ici'",
          consequence: "Très dangereux. Attendre devant un bâtiment en feu expose le groupe. Retourner chercher des affaires est interdit.",
          consequenceType: "critical",
          points: 0,
        },
      ],
    },
  },
};

// CH2 M3 — Fermer les portes
const ch2m3_dragdrop: DragDropExercise = {
  type: "dragdrop",
  instruction: "Remettez les actions dans le bon ordre lors d'une évacuation",
  context: "La séquence correcte est essentielle. Glissez chaque action dans la bonne catégorie.",
  successMessage: "Séquence 'Sors — Ferme — Signale' parfaitement maîtrisée !",
  items: [
    { id: "i1", label: "Sortir de la pièce rapidement", emoji: "🚶", correctZone: "sors" },
    { id: "i2", label: "Vérifier qu'il n'y a personne", emoji: "👁️", correctZone: "sors" },
    { id: "i3", label: "Fermer la porte (sans verrouiller)", emoji: "🚪", correctZone: "ferme" },
    { id: "i4", label: "S'assurer que la porte est bien fermée", emoji: "✋", correctZone: "ferme" },
    { id: "i5", label: "Signaler aux secours les zones vérifiées", emoji: "📢", correctZone: "signale" },
    { id: "i6", label: "Rejoindre le point de rassemblement", emoji: "📍", correctZone: "signale" },
  ],
  zones: [
    {
      id: "sors",
      label: "1 — SORS",
      sublabel: "Quitter et vérifier",
      color: "#da1e28",
      bgColor: "rgba(218,30,40,0.05)",
      borderColor: "rgba(218,30,40,0.25)",
    },
    {
      id: "ferme",
      label: "2 — FERME",
      sublabel: "Fermer sans verrouiller",
      color: "#b45309",
      bgColor: "rgba(180,83,9,0.05)",
      borderColor: "rgba(180,83,9,0.25)",
    },
    {
      id: "signale",
      label: "3 — SIGNALE",
      sublabel: "Informer les secours",
      color: "#198038",
      bgColor: "rgba(25,128,56,0.05)",
      borderColor: "rgba(25,128,56,0.25)",
    },
  ],
};

// CH2 M4 — Vérifier personne
const ch2m4_hotspot: HotspotExercise = {
  type: "hotspot",
  instruction: "Parcourez virtuellement cet étage et identifiez toutes les zones à vérifier",
  context: "Avant d'évacuer définitivement, quelles zones d'un étage IBM doivent être contrôlées ?",
  image: `${CDN}b5ca9823c0ba42e492f17a707fd14708?format=webp&width=800`,
  successMessage: "Vérification complète — toutes les zones ont été contrôlées",
  hotspots: [
    {
      id: "h1", x: 20, y: 40,
      label: "Open space principal",
      description: "Zone la plus peuplée. Un balayage visuel rapide couvre toute la surface. Appeler 'Évacuation !' pour alerter ceux qui n'auraient pas entendu.",
      type: "info",
      detail: "Durée de vérification : 5-10 secondes maximum",
    },
    {
      id: "h2", x: 55, y: 30,
      label: "Salles de réunion fermées",
      description: "Portes fermées = personnes potentiellement à l'intérieur sans entendre l'alarme. Ouvrir brièvement et appeler.",
      type: "danger",
      detail: "Ne pas supposer qu'une salle fermée est vide",
    },
    {
      id: "h3", x: 75, y: 60,
      label: "Sanitaires",
      description: "Zone souvent oubliée. L'alarme peut y être moins audible. Une personne peut y être malaise ou sourde à l'alarme.",
      type: "danger",
      detail: "Appeler à l'entrée sans entrer si la fumée est présente",
    },
    {
      id: "h4", x: 38, y: 65,
      label: "Local technique / serveur",
      description: "Personnel de maintenance potentiellement présent avec bruit ambiant. Vérification rapide indispensable.",
      type: "info",
      detail: "Signaler aux secours si la zone est inaccessible à cause du feu",
    },
  ],
};

// CH2 M5 — Faire face à la fumée
const ch2m5_branching: BranchingExercise = {
  type: "branching",
  title: "Navigation en environnement enfumé",
  startNode: "smoke_entry",
  successMessage: "Bons réflexes face à la fumée — vous avez protégé votre respiration",
  failMessage: "Des réflexes dangereux identifiés — la fumée tue avant les flammes",
  nodes: {
    smoke_entry: {
      id: "smoke_entry",
      image: `${CDN}cc5ab29f9fd543a2aff682cdd54297ad?format=webp&width=800`,
      situation: "Vous ouvrez la porte du couloir. Une fumée grise à mi-hauteur remplit l'espace. La sortie est à 20 mètres.",
      urgency: "high",
      timed: 10,
      choices: [
        {
          label: "Je me baisse sous la fumée et avance rapidement en longeant le mur",
          consequence: "Réflexe vital. L'air respirable est dans le tiers inférieur. Longer le mur maintient le repère spatial.",
          consequenceType: "ok",
          nextNode: "door_test",
          points: 10,
        },
        {
          label: "Je cours debout vers la sortie le plus vite possible",
          consequence: "Dangereux. Debout = inhalation directe des gaz toxiques. Perte de conscience possible en quelques respirations.",
          consequenceType: "critical",
          nextNode: "door_test",
          points: 0,
        },
        {
          label: "Je retourne en arrière pour trouver un autre chemin",
          consequence: "Décision acceptable si la fumée est trop dense. Ici la sortie est visible — rebrousser chemin est excessif.",
          consequenceType: "ok",
          nextNode: "door_test",
          points: 5,
        },
      ],
    },
    door_test: {
      id: "door_test",
      image: `${CDN}0385f320d59547b2b6d08166e29ab8f3?format=webp&width=800`,
      situation: "Une porte sur votre chemin vers la sortie. Vous ne savez pas ce qu'il y a derrière.",
      urgency: "high",
      choices: [
        {
          label: "Je pose la main sur la porte — si chaude, je ne l'ouvre pas",
          consequence: "Parfait. Tester la température à la main (jamais la poignée en métal) permet de détecter un feu derrière.",
          consequenceType: "ok",
          nextNode: "exit",
          points: 10,
        },
        {
          label: "J'ouvre directement — on verra bien",
          consequence: "Très dangereux. Si un feu est derrière, l'ouverture aspire les flammes vers vous.",
          consequenceType: "critical",
          nextNode: "exit",
          points: 0,
        },
        {
          label: "J'appuie la main sur la poignée en métal pour tester",
          consequence: "Erreur. La poignée en métal conduit la chaleur — vous pouvez vous brûler gravement. Toujours tester avec le dos de la main sur la porte.",
          consequenceType: "ko",
          nextNode: "exit",
          points: 3,
        },
      ],
    },
    exit: {
      id: "exit",
      situation: "Vous atteignez la sortie. Fin du parcours enfumé.",
      urgency: "low",
      choices: [
        {
          label: "Valider — j'ai atteint la sortie en sécurité",
          consequence: "Séquence complète : se baisser, longer les murs, tester les portes. Ces réflexes sauvent des vies.",
          consequenceType: "ok",
          points: 5,
        },
      ],
    },
  },
};

// CH2 M6 — Escaliers
const ch2m6_hotspot: HotspotExercise = {
  type: "hotspot",
  instruction: "Sur ce plan d'étage IBM, identifiez le bon itinéraire d'évacuation",
  context: "Analysez les différentes options. Quelles voies sont sûres ? Lesquelles sont à éviter absolument ?",
  image: `${CDN}48e0cc79ee294fbbaf81f10232959ffb?format=webp&width=800`,
  successMessage: "Vous connaissez les règles d'évacuation par les escaliers",
  hotspots: [
    {
      id: "h1", x: 30, y: 40,
      label: "Ascenseur — INTERDIT",
      description: "L'ascenseur est formellement interdit lors d'un incendie. Panne électrique possible, portes bloquées sur l'étage en feu, propagation de fumée dans la cabine.",
      type: "danger",
      detail: "Même si l'ascenseur fonctionne — ne jamais l'utiliser lors d'une alarme incendie",
    },
    {
      id: "h2", x: 70, y: 35,
      label: "Escalier principal — à privilégier",
      description: "L'escalier le plus proche est toujours le bon choix. Descendre calmement en file, à droite, sans courir.",
      type: "safe",
      detail: "Fermer la porte de l'escalier derrière soi — ralentit la fumée",
    },
    {
      id: "h3", x: 50, y: 70,
      label: "Espace d'Attente Sécurisé (EAS)",
      description: "Si l'escalier est impraticable (fumée, feu), l'EAS est la zone de refuge. Porte coupe-feu, système d'interphone avec les secours, signalisation spécifique.",
      type: "info",
      detail: "L'EAS est obligatoire dans les IGH (immeubles de grande hauteur)",
    },
    {
      id: "h4", x: 85, y: 60,
      label: "Sortie de secours extérieure",
      description: "Issue de secours avec accès direct à l'extérieur. Toujours dégagée. Signalée par le pictogramme vert standardisé.",
      type: "safe",
      detail: "Distance maximale réglementaire : 40m entre une issue et toute position de travail",
    },
  ],
};

// CH2 M7 — Procédure complète
const ch2m7_branching: BranchingExercise = {
  type: "branching",
  title: "Procédure complète d'évacuation — Simulation finale",
  subtitle: "Score Réflexes d'Évacuation",
  startNode: "alarm_ch2",
  successMessage: "Score Réflexes d'Évacuation — Niveau Expert. Parcours de certification validé.",
  failMessage: "Des décisions à améliorer — recommencez pour atteindre l'objectif de 80%",
  nodes: {
    alarm_ch2: {
      id: "alarm_ch2",
      image: `${CDN}2482acaedcdd4b2abad18b1011a424c6?format=webp&width=800`,
      situation: "16h00. Alarme incendie. Fumée légère dans le couloir. Vous êtes au 4e étage. 12 collègues autour de vous.",
      context: "C'est le moment d'appliquer toute la procédure que vous avez apprise.",
      urgency: "high",
      timed: 10,
      choices: [
        {
          label: "Lever la main, voix ferme : 'Alarme — on évacue par l'escalier B, suivez-moi'",
          consequence: "Leader calme et directif. Votre posture rassure immédiatement vos collègues.",
          consequenceType: "ok",
          nextNode: "verify_rooms",
          points: 10,
        },
        {
          label: "Partir rapidement sans informer les collègues",
          consequence: "Insuffisant. Vous laissez 12 personnes sans guidance. Certains pourraient prendre de mauvaises décisions.",
          consequenceType: "ko",
          nextNode: "verify_rooms",
          points: 3,
        },
      ],
    },
    verify_rooms: {
      id: "verify_rooms",
      image: `${CDN}b5ca9823c0ba42e492f17a707fd14708?format=webp&width=800`,
      situation: "En passant dans le couloir, vous voyez deux salles de réunion fermées.",
      urgency: "high",
      choices: [
        {
          label: "J'ouvre brièvement chaque porte en criant 'Évacuation !' puis je ferme derrière moi",
          consequence: "Parfait. Vérification rapide + fermeture = sécurité maximale pour tous.",
          consequenceType: "ok",
          nextNode: "staircase",
          points: 10,
        },
        {
          label: "Je suppose qu'elles sont vides et je continue",
          consequence: "Risqué. Une salle fermée n'est pas forcément vide. Une personne pourrait rester bloquée.",
          consequenceType: "ko",
          nextNode: "staircase",
          points: 2,
        },
      ],
    },
    staircase: {
      id: "staircase",
      image: `${CDN}48e0cc79ee294fbbaf81f10232959ffb?format=webp&width=800`,
      situation: "À l'escalier : fumée légère visible. L'ascenseur est disponible et fonctionne.",
      urgency: "high",
      choices: [
        {
          label: "Escalier uniquement — on se baisse si nécessaire, on reste à droite",
          consequence: "Décision correcte. Ascenseur interdit en cas d'incendie sans exception.",
          consequenceType: "ok",
          nextNode: "assembly_ch2",
          points: 10,
        },
        {
          label: "Ascenseur pour les personnes à mobilité réduite",
          consequence: "Erreur même pour les PMR. L'EAS (espace d'attente sécurisé) est prévu pour eux — attendre les secours dans l'EAS.",
          consequenceType: "critical",
          nextNode: "assembly_ch2",
          points: 0,
        },
      ],
    },
    assembly_ch2: {
      id: "assembly_ch2",
      image: `${CDN}2ee3c4ada85544aa87e2f4f440dc1a94?format=webp&width=800`,
      situation: "Au point de rassemblement. Vous comptez : 11 personnes sur 12. Il en manque une.",
      urgency: "medium",
      choices: [
        {
          label: "Je signale immédiatement l'absent au responsable d'évacuation avec son nom et sa localisation probable",
          consequence: "Crucial. Les pompiers orientent leur recherche grâce à ces informations précises. Potentiellement vital.",
          consequenceType: "ok",
          points: 10,
        },
        {
          label: "Je retourne chercher la personne manquante moi-même",
          consequence: "Interdit et dangereux. Retourner sans équipement = risque vital. Les secours sont formés pour cela.",
          consequenceType: "critical",
          points: 0,
        },
        {
          label: "J'attends — peut-être qu'elle est arrivée par un autre escalier",
          consequence: "Insuffisant. Attendre sans signaler laisse les secours sans information cruciale. Toujours signaler une absence.",
          consequenceType: "ko",
          points: 3,
        },
      ],
    },
  },
};

// ── Export map ─────────────────────────────────────────────────

export const MODULE_INTERACTIONS: Record<string, AnyExercise[]> = {
  "ch1-m1": [m1_hotspot, m1_branching],
  "ch1-m2": [m2_dragdrop, m2_branching],
  "ch1-m3": [m3_hotspot, m3_branching],
  "ch1-m4": [m4_dragdrop],
  "ch1-m5": [m5_hotspot, m5_branching],
  "ch1-m6": [m6_branching],
  "ch1-m7": [m7_branching],
  "ch2-m1": [ch2m1_hotspot],
  "ch2-m2": [ch2m2_branching],
  "ch2-m3": [ch2m3_dragdrop],
  "ch2-m4": [ch2m4_hotspot],
  "ch2-m5": [ch2m5_branching],
  "ch2-m6": [ch2m6_hotspot],
  "ch2-m7": [ch2m7_branching],
};
