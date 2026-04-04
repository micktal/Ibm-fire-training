import { HotspotExercise } from "@/components/interactions/HotspotImage";
import { DragDropExercise } from "@/components/interactions/DragAndDrop";
import { BranchingExercise } from "@/components/interactions/BranchingScenario";

// ── New interaction types ──────────────────────────────────────
export interface BinaryExercise {
  type: "binary";
  title: string;
  titleEn?: string;
  subtitle?: string;
  subtitleEn?: string;
  statements: Array<{ statement: string; statementEn?: string; isTrue: boolean; explanation: string; explanationEn?: string }>;
  successMessage?: string;
  successMessageEn?: string;
}

export interface FillBlankExercise {
  type: "fillblank";
  title: string;
  subtitle?: string;
  sentences: Array<{ before: string; answer: string; after?: string; hint?: string }>;
  successMessage?: string;
}

export interface MatchExercise {
  type: "matching";
  title: string;
  subtitle?: string;
  pairs: Array<{ left: string; right: string }>;
  successMessage?: string;
}

export interface FlipCardsExercise {
  type: "flipcards";
  title: string;
  subtitle?: string;
  cards: Array<{ front: string; back: string; icon?: string; color?: string }>;
}

export interface OrderPuzzleExercise {
  type: "orderpuzzle";
  title: string;
  subtitle?: string;
  instruction: string;
  pieces: Array<{ id: string; label: string; sublabel?: string; correctPosition: number }>;
  successMessage?: string;
}

export interface SeriousGameExercise {
  type: "seriousgame";
  title: string;
  subtitle?: string;
  rounds: Array<{
    image?: string;
    situation: string;
    actions: Array<{ label: string; correct: boolean; feedback: string }>;
    timeLimit: number;
  }>;
  successMessage?: string;
}

export interface TipFlipExercise {
  type: "tipflip";
  title: string;
  subtitle?: string;
  cards: Array<{
    icon: string;       // Lucide icon name
    accent: "flame" | "clock" | "alert" | "shield" | "zap" | "eye";
    stat: string;       // valeur clé affichée en grand sur l'avant
    label: string;      // titre court de la carte (avant)
    category: "funfact" | "astuce" | "chiffre";
    tip: string;        // explication détaillée (dos)
    tipTitle?: string;  // titre du verso
  }>;
}

// ── Spin the Wheel ────────────────────────────────────────────
export interface SpinWheelItem {
  label: string;         // FR label on wheel segment
  labelEn?: string;      // EN label
  question: string;      // FR question displayed when landing
  questionEn?: string;   // EN question
  choices: Array<{ key: string; label: string; labelEn?: string }>;
  correctKey: string;
  explanation: string;   // FR explanation after answer
  explanationEn?: string;
}

export interface SpinWheelExercise {
  type: "spinwheel";
  title: string;
  titleEn?: string;
  subtitle?: string;
  subtitleEn?: string;
  items: SpinWheelItem[];
}

// ── Mind Map ──────────────────────────────────────────────────
export interface MindMapItem {
  id: string;
  label: string;       // FR short label (fits in a node, ~3 words max)
  labelEn?: string;    // EN short label
  isCorrect: boolean;  // belongs to the central concept
  explanation: string; // FR explanation after submit
  explanationEn?: string;
}

export interface MindMapExercise {
  type: "mindmap";
  title: string;
  titleEn?: string;
  subtitle?: string;
  subtitleEn?: string;
  centerLabel: string;    // central concept (FR, short)
  centerLabelEn?: string; // central concept (EN)
  items: MindMapItem[];   // 8 items (5 correct + 3 distractors recommended)
}

// ── True/False Grid Quiz ───────────────────────────────────────
export interface GridCell {
  statement: string;      // FR statement to evaluate
  statementEn?: string;   // EN statement
  correct: "true" | "false";
  explanation: string;    // FR explanation
  explanationEn?: string;
}

export interface GridQuizExercise {
  type: "gridquiz";
  title: string;
  titleEn?: string;
  subtitle?: string;
  subtitleEn?: string;
  cells: GridCell[];      // 9 cells for 3×3 grid
}

export type AnyExercise =
  | HotspotExercise
  | DragDropExercise
  | BranchingExercise
  | BinaryExercise
  | FillBlankExercise
  | MatchExercise
  | FlipCardsExercise
  | OrderPuzzleExercise
  | SeriousGameExercise
  | TipFlipExercise
  | SpinWheelExercise
  | GridQuizExercise
  | MindMapExercise;

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
    { id: "i1", label: "Extincteur CO2", sublabel: "Gaz inerte — asphyxie la flamme", icon: "Wind", correctZone: "comburant" },
    { id: "i2", label: "Eau pulvérisée", sublabel: "Abaisse la température", icon: "Droplet", correctZone: "chaleur" },
    { id: "i3", label: "Éloigner les papiers", sublabel: "Supprime le combustible", icon: "FileText", correctZone: "combustible" },
    { id: "i4", label: "Couverture anti-feu", sublabel: "Prive le feu d'oxygène", icon: "Layers", correctZone: "comburant" },
    { id: "i5", label: "Poudre ABC", sublabel: "Stoppe la réaction chimique", icon: "Package", correctZone: "comburant" },
    { id: "i6", label: "Débrancher l'appareil", sublabel: "Coupe la source de chaleur", icon: "Zap", correctZone: "chaleur" },
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
  image: `${CDN}3ddd3eb23b1b49dfb9e5dc04128a8ec0?format=webp&width=800`,
  successMessage: "Analyse complète — vous comprenez les mécanismes de propagation",
  hotspots: [
    {
      id: "h1", x: 72, y: 58,
      label: "Foyer principal — équipement en feu",
      description: "L'équipement électrique en surchauffe est la source du départ de feu. La chaleur rayonnante et les flammes propagent le feu aux matériaux voisins.",
      type: "danger",
      detail: "Un équipement qui chauffe anormalement doit être signalé immédiatement",
    },
    {
      id: "h2", x: 50, y: 20,
      label: "Fumée dense en hauteur",
      description: "La fumée noire monte vers le plafond et se propage dans le couloir. Elle réduit la visibilité et indique la direction du feu. L'air respirable est au ras du sol.",
      type: "danger",
      detail: "En cas de fumée dense : se baisser et longer les murs jusqu'à la sortie",
    },
    {
      id: "h3", x: 12, y: 44,
      label: "Déclencheur d'alarme manuel",
      description: "Le déclencheur est visible et accessible sur le mur. L'activer immédiatement alerte tout le bâtiment et déclenche l'évacuation générale.",
      type: "safe",
      detail: "Distance maximale réglementaire : 30m entre deux déclencheurs",
    },
    {
      id: "h4", x: 22, y: 68,
      label: "Extincteur CO2",
      description: "Un extincteur est fixé au mur, accessible rapidement. Adapté aux feux électriques (classe E). À utiliser uniquement si le feu est maîtrisable et la sortie derrière soi.",
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
      image: `${CDN}26706b11880d4b55b61df8e668695b14?format=webp&width=800`,
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
      image: `${CDN}e353c322f4e74a7282f3d1eeb9e272de?format=webp&width=800`,
      situation: "L'alarme n'a pas encore sonné. En passant devant un déclencheur manuel, vous réalisez que personne ne l'a activé.",
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
    { id: "i1", label: "Papier / documents", sublabel: "Matière solide combustible", icon: "FileText", correctZone: "A" },
    { id: "i2", label: "Rack serveur sous tension", sublabel: "Équipement électrique actif", icon: "Server", correctZone: "elec" },
    { id: "i3", label: "Alcool désinfectant", sublabel: "Liquide inflammable", icon: "Droplet", correctZone: "B" },
    { id: "i4", label: "Mobilier de bureau", sublabel: "Solide organique", icon: "Armchair", correctZone: "A" },
    { id: "i5", label: "Câbles électriques", sublabel: "Conducteurs sous tension", icon: "Zap", correctZone: "elec" },
    { id: "i6", label: "Solvant de nettoyage", sublabel: "Liquide chimique inflammable", icon: "FlaskConical", correctZone: "B" },
    { id: "i7", label: "Huile machine / cuisine", sublabel: "Corps gras à haute température", icon: "Flame", correctZone: "F" },
    { id: "i8", label: "Chargeur de laptop", sublabel: "Alimentation électrique", icon: "Laptop", correctZone: "elec" },
  ],
  zones: [
    {
      id: "A",
      label: "Classe A — Solides",
      sublabel: "Extincteur eau / mousse",
      description: "Bois, papier, tissu, plastique. Ce sont les matières ordinaires qui brûlent en laissant des braises.",
      color: "#b45309",
      bgColor: "rgba(180,83,9,0.06)",
      borderColor: "rgba(180,83,9,0.25)",
    },
    {
      id: "B",
      label: "Classe B — Liquides inflammables",
      sublabel: "Extincteur CO2 / poudre ABC",
      description: "Hydrocarbures, solvants, alcools. Brûlent en surface — ne jamais utiliser d'eau (projections).",
      color: "#7c3aed",
      bgColor: "rgba(124,58,237,0.06)",
      borderColor: "rgba(124,58,237,0.25)",
    },
    {
      id: "elec",
      label: "Feu électrique",
      sublabel: "CO2 uniquement — jamais d'eau",
      description: "L'eau conduit l'électricité : risque d'électrocution. Couper l'alimentation en priorité, puis CO2.",
      color: "#0043ce",
      bgColor: "rgba(0,67,206,0.06)",
      borderColor: "rgba(0,67,206,0.25)",
    },
    {
      id: "F",
      label: "Classe F — Huiles / graisses",
      sublabel: "Extincteur classe F uniquement",
      description: "Huiles de cuisson à très haute température. L'eau provoque une explosion de vapeur brûlante.",
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
  image: `${CDN}d4ef7263a40e4131aa5b3ad9448e2ca5?format=webp&width=800`,
  successMessage: "Vous connaissez votre extincteur — prêt pour une utilisation en situation réelle",
  hotspots: [
    {
      id: "h1", x: 52, y: 8,
      label: "P — Pull (Tirer la goupille)",
      description: "La goupille de sécurité empêche l'activation accidentelle. Tirez-la d'un mouvement sec. C'est toujours la PREMIÈRE étape.",
      type: "info",
      detail: "Sans retirer la goupille, l'extincteur ne s'active pas",
    },
    {
      id: "h2", x: 68, y: 22,
      label: "S — Squeeze (Presser la poignée)",
      description: "Appuyez fermement sur la poignée de déclenchement. Maintenir une pression continue pour un jet régulier.",
      type: "info",
      detail: "Durée de décharge d'un CO2 : 8 à 12 secondes",
    },
    {
      id: "h3", x: 18, y: 50,
      label: "A — Aim (Viser la base)",
      description: "Pointez le tuyau ou la buse vers la BASE des flammes — jamais vers le haut. La base est là où se trouve le combustible.",
      type: "info",
      detail: "Distance optimale : 2 à 3 mètres du foyer",
    },
    {
      id: "h4", x: 18, y: 78,
      label: "S — Sweep (Balayer)",
      description: "Balayez lentement de gauche à droite, toujours en visant la base. Continuez jusqu'à extinction complète.",
      type: "safe",
      detail: "Si le feu ne recule pas en 30s : reculez et évacuez",
    },
    {
      id: "h5", x: 62, y: 62,
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
      context: "Évaluez la situation avant d'agir.",
      urgency: "high",
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
  instructionEn: "Locate and identify all alarm triggers in this scene",
  context: "Dans un vrai bureau IBM, repérez les équipements d'alerte et comprenez leur fonctionnement.",
  contextEn: "In a real IBM office, spot the alert equipment and understand how it works.",
  image: `${CDN}f70ab7cdd9114da8bfd5ad197221b46b?format=webp&width=800`,
  successMessage: "Vous savez localiser et utiliser les systèmes d'alarme",
  successMessageEn: "You know how to locate and use the alarm systems",
  hotspots: [
    {
      id: "h1", x: 18, y: 42,
      label: "Déclencheur manuel (boîtier rouge)",
      labelEn: "Manual call point (red box)",
      description: "Le déclencheur manuel FIRE PULL DOWN est le moyen le plus direct d'alerter tout le bâtiment. Briser le verre ou appuyer selon le modèle.",
      descriptionEn: "The FIRE PULL DOWN manual call point is the most direct way to alert the entire building. Break the glass or press depending on the model.",
      type: "info",
      detail: "Utilisation : 1 geste ferme suffit — l'alarme est immédiate et irréversible",
      detailEn: "Usage: 1 firm action is enough — the alarm is immediate and irreversible",
    },
    {
      id: "h2", x: 52, y: 15,
      label: "Détecteur de fumée au plafond",
      labelEn: "Ceiling smoke detector",
      description: "Le détecteur automatique se déclenche quand la concentration de fumée dépasse le seuil. Peut prendre 2-5 minutes pour réagir.",
      descriptionEn: "The automatic detector triggers when smoke concentration exceeds the threshold. It may take 2-5 minutes to react.",
      type: "info",
      detail: "Ne pas attendre le détecteur automatique — le déclencheur manuel est plus rapide",
      detailEn: "Don't wait for the automatic detector — the manual call point is faster",
    },
    {
      id: "h3", x: 75, y: 58,
      label: "Foyer actif — déclenchement requis",
      labelEn: "Active fire — alarm required",
      description: "Un départ de feu est visible. Le déclencheur manuel est à moins de 10 mètres. Chaque seconde sans alerte = propagation supplémentaire.",
      descriptionEn: "A fire outbreak is visible. The manual call point is less than 10 metres away. Every second without an alarm means further spread.",
      type: "danger",
      detail: "Réflexe : déclencher l'alarme AVANT de tenter d'intervenir",
      detailEn: "Reflex: trigger the alarm BEFORE attempting to intervene",
    },
    {
      id: "h4", x: 40, y: 75,
      label: "Signalisation sortie de secours",
      labelEn: "Emergency exit sign",
      description: "La sortie de secours est identifiée par le pictogramme vert standardisé. Elle doit rester dégagée en permanence.",
      descriptionEn: "The emergency exit is identified by the standardised green pictogram. It must remain clear at all times.",
      type: "safe",
      detail: "Ne jamais bloquer une issue de secours — même temporairement",
      detailEn: "Never block an emergency exit — even temporarily",
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
    { id: "i1", label: "Sortir de la pièce rapidement", sublabel: "Évacuer sans attendre", icon: "LogOut", correctZone: "sors" },
    { id: "i2", label: "Vérifier qu'il n'y a personne", sublabel: "Contrôler la pièce avant de partir", icon: "ScanEye", correctZone: "sors" },
    { id: "i3", label: "Fermer la porte (sans verrouiller)", sublabel: "Ralentit la propagation du feu", icon: "DoorClosed", correctZone: "ferme" },
    { id: "i4", label: "S'assurer que la porte est bien fermée", sublabel: "Barrière contre la fumée", icon: "ShieldCheck", correctZone: "ferme" },
    { id: "i5", label: "Signaler aux secours les zones vérifiées", sublabel: "Informer le responsable évacuation", icon: "Bell", correctZone: "signale" },
    { id: "i6", label: "Rejoindre le point de rassemblement", sublabel: "Se rendre au point désigné", icon: "MapPin", correctZone: "signale" },
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

// ── BINARY (True / False) ──────────────────────────────────────
const m1_binary: BinaryExercise = {
  type: "binary",
  title: "Vrai ou Faux — Départ de feu",
  subtitle: "Testez vos certitudes sur la détection incendie",
  successMessage: "Vous distinguez les bonnes pratiques des idées reçues !",
  statements: [
    { statement: "Un départ de feu est toujours précédé de flammes visibles.", isTrue: false, explanation: "Faux. La fumée, l'odeur et la chaleur sont souvent les premiers signaux — bien avant les flammes." },
    { statement: "Une légère odeur de brûlé persistante est un signal d'alerte réel.", isTrue: true, explanation: "Vrai. Toute odeur de brûlé persistante doit déclencher une vérification immédiate." },
    { statement: "Attendre que l'alarme sonne avant d'agir est la procédure correcte.", isTrue: false, explanation: "Faux. L'alarme arrive après le signal — vous devez agir dès la détection, sans attendre." },
    { statement: "Un grésil électrique anormal peut précéder un incendie.", isTrue: true, explanation: "Vrai. Un arc électrique ou grésil est souvent signe d'un court-circuit qui peut provoquer un feu." },
    { statement: "On peut ignorer une légère chaleur anormale près d'une prise.", isTrue: false, explanation: "Faux. Une prise chaude signale une surcharge électrique — source courante d'incendie en bureau." },
  ],
};

const ch2m1_binary: BinaryExercise = {
  type: "binary",
  title: "Vrai ou Faux — L'alarme incendie",
  titleEn: "True or False — The fire alarm",
  subtitle: "Idées reçues sur le déclenchement de l'alarme",
  subtitleEn: "Common misconceptions about triggering the alarm",
  successMessage: "Vous savez quand et comment déclencher l'alarme IBM !",
  successMessageEn: "You know when and how to trigger the IBM alarm!",
  statements: [
    {
      statement: "Déclencher l'alarme trop tôt est sanctionné chez IBM.",
      statementEn: "Triggering the alarm too early is penalized at IBM.",
      isTrue: false,
      explanation: "Faux. Il est impossible de déclencher trop tôt face à un signal suspect. IBM prévoit un retour des secours sans sanction.",
      explanationEn: "False. It is impossible to trigger too early when facing a suspicious signal. IBM policy supports early alarm with no penalty.",
    },
    {
      statement: "Le 22 22 doit être composé avant le 18 lors d'un incident IBM.",
      statementEn: "22 22 must be called before 18 during an IBM incident.",
      isTrue: true,
      explanation: "Vrai. La sécurité IBM connaît les plans des bâtiments et peut intervenir plus rapidement que les services externes.",
      explanationEn: "True. IBM Security knows the building plans and can respond faster than external services.",
    },
    {
      statement: "Les détecteurs automatiques rendent le déclencheur manuel inutile.",
      statementEn: "Automatic detectors make the manual call point unnecessary.",
      isTrue: false,
      explanation: "Faux. Le déclencheur manuel est un filet de sécurité indépendant — toujours disponible si le détecteur n'a pas réagi.",
      explanationEn: "False. The manual call point is an independent safety net — always available if the detector has not reacted.",
    },
    {
      statement: "Chaque seconde de retard représente environ 6m² supplémentaires en feu.",
      statementEn: "Every second of delay represents approximately 6m² more on fire.",
      isTrue: true,
      explanation: "Vrai. C'est la statistique IBM : le retard à déclencher l'alarme est directement corrélé à la superficie touchée.",
      explanationEn: "True. This is the IBM statistic: delay in triggering the alarm is directly correlated with the area affected.",
    },
    {
      statement: "Après avoir déclenché l'alarme, il faut attendre sur place les consignes.",
      statementEn: "After triggering the alarm, you must wait on site for instructions.",
      isTrue: false,
      explanation: "Faux. Après déclenchement, commencer immédiatement l'évacuation sans attendre confirmation.",
      explanationEn: "False. After triggering, begin evacuation immediately without waiting for confirmation.",
    },
  ],
};

// ── FLIP CARDS ─────────────────────────────────────────────────
const m2_flipcards: FlipCardsExercise = {
  type: "flipcards",
  title: "Le Triangle du Feu — 3 éléments clés",
  subtitle: "Retournez chaque carte pour comprendre le rôle de chaque élément",
  cards: [
    { front: "COMBUSTIBLE", back: "Matière qui brûle : papier, bois, tissu, plastique, câbles. Pour éteindre → retirer ou isoler la matière.", icon: "Flame", color: "#b45309" },
    { front: "COMBURANT\n(Oxygène)", back: "L'air contient 21% d'O₂ qui alimente la combustion. Pour éteindre → étouffer avec couverture anti-feu ou CO2.", icon: "Wind", color: "#0D47A1" },
    { front: "CHALEUR\n(Énergie)", back: "L'énergie qui déclenche la réaction : étincelle, court-circuit, friction. Pour éteindre → refroidir avec eau ou CO2.", icon: "Zap", color: "#da1e28" },
    { front: "BRISER LE\nTRIANGLE", back: "Supprimer UN seul élément suffit à éteindre le feu. C'est le principe de tous les agents extincteurs.", icon: "Shield", color: "#198038" },
  ],
};

const ch2m2_flipcards: FlipCardsExercise = {
  type: "flipcards",
  title: "Posture en crise — 4 règles d'or",
  subtitle: "Retournez chaque carte pour maîtriser la communication en urgence",
  cards: [
    { front: "CALME", back: "Voix posée et ferme. L'urgence s'entend dans votre ton, pas dans votre volume. Pas de cris — ils amplifient la panique.", icon: "Shield", color: "#0D47A1" },
    { front: "CLAIR", back: "'Tout le monde sort par là.' Instructions courtes et directes. Pas d'explications complexes en situation de crise.", icon: "Eye", color: "#198038" },
    { front: "RASSURANT", back: "Votre posture physique (position, démarche) influence le groupe. Marchez, ne courez pas. Le groupe vous imite.", icon: "Users", color: "#7c3aed" },
    { front: "COMPLET", back: "Vérifiez que tout le monde suit avant de continuer. Comptez si possible. Ne laissez personne derrière.", icon: "CheckCircle", color: "#b45309" },
  ],
};

// ── FILL IN THE BLANK ──────────────────────────────────────────
const m5_fillblank: FillBlankExercise = {
  type: "fillblank",
  title: "Complétez la séquence PASS",
  subtitle: "Retrouvez les mots clés de la méthode d'extinction IBM",
  successMessage: "La séquence PASS est parfaitement mémorisée !",
  sentences: [
    { before: "P — Tirez la", answer: "goupille", after: "de sécurité pour déverrouiller l'extincteur.", hint: "verrou de sécurité" },
    { before: "A — Visez la", answer: "base", after: "des flammes, jamais le haut du feu.", hint: "où se trouve le combustible" },
    { before: "S — Pressez la", answer: "poignée", after: "de déclenchement pour activer le jet.", hint: "mécanisme de déclenchement" },
    { before: "S — Balayez de", answer: "gauche à droite", after: "en maintenant le jet sur la base.", hint: "mouvement horizontal" },
    { before: "Distance optimale :", answer: "2 à 3 mètres", after: "du foyer pour une efficacité maximale.", hint: "distance de sécurité" },
  ],
};

const ch2m3_fillblank: FillBlankExercise = {
  type: "fillblank",
  title: "Complétez : SORS — FERME — SIGNALE",
  subtitle: "Les 3 actions fondamentales de l'évacuation IBM",
  successMessage: "Séquence SORS-FERME-SIGNALE parfaitement maîtrisée !",
  sentences: [
    { before: "Quittez la pièce", answer: "sans attendre", after: "— chaque seconde compte.", hint: "ne pas hésiter" },
    { before: "Fermez la porte", answer: "sans la verrouiller", after: "pour ralentir le feu sans piéger les autres.", hint: "fermer mais pas bloquer" },
    { before: "Signalez les zones vérifiées au", answer: "responsable évacuation", after: "au point de rassemblement.", hint: "personne en charge" },
    { before: "Ne", answer: "jamais revenir", after: "chercher ses affaires une fois l'évacuation lancée.", hint: "interdiction absolue" },
  ],
};

// ── MATCHING ───────────────────────────────────────────────────
const m4_matching: MatchExercise = {
  type: "matching",
  title: "Associez chaque classe de feu à son extincteur",
  subtitle: "Le bon agent extincteur selon la nature du feu",
  successMessage: "Parfait — vous choisissez le bon extincteur selon le type de feu !",
  pairs: [
    { left: "Classe A — Bois, papier, tissu", right: "Eau, Poudre ABC" },
    { left: "Classe B — Liquides inflammables", right: "Mousse, Poudre ABC" },
    { left: "Classe C — Gaz inflammables", right: "Poudre ABC (coupure gaz en premier)" },
    { left: "Classe E — Feux électriques", right: "CO2 uniquement (jamais d'eau)" },
    { left: "Classe F — Huiles / graisses", right: "Émulseur F spécifique" },
  ],
};

const ch2m6_matching: MatchExercise = {
  type: "matching",
  title: "Situatations → Bonne action",
  subtitle: "Associez chaque situation d'évacuation à la réponse correcte",
  successMessage: "Excellent — vos réflexes d'évacuation sont calibrés !",
  pairs: [
    { left: "La porte est chaude au toucher", right: "Ne pas ouvrir — rebrousser chemin" },
    { left: "Fumée dense dans le couloir", right: "S'accroupir — progresser sous la fumée" },
    { left: "L'ascenseur est disponible", right: "Ignorer — prendre les escaliers de secours" },
    { left: "Une personne est manquante au rassemblement", right: "Signaler immédiatement aux secours" },
    { left: "Le point de rassemblement est atteint", right: "Se signaler au responsable évacuation" },
  ],
};

// ── ORDER PUZZLE ───────────────────────────────────────────────
const m3_orderpuzzle: OrderPuzzleExercise = {
  type: "orderpuzzle",
  title: "Remettez la séquence de confinement dans l'ordre",
  subtitle: "En cas d'incendie, l'ordre des actions est crucial",
  instruction: "Faites glisser les étapes pour reconstituer la bonne séquence",
  successMessage: "Séquence de confinement maîtrisée !",
  pieces: [
    { id: "p1", label: "Détecter le signal", sublabel: "Fumée, odeur ou chaleur anormale", correctPosition: 1 },
    { id: "p2", label: "Alerter les collègues", sublabel: "Sans panique, ton calme", correctPosition: 2 },
    { id: "p3", label: "Fermer toutes les portes", sublabel: "Ralentit la propagation de 5x", correctPosition: 3 },
    { id: "p4", label: "Déclencher l'alarme (22 22)", sublabel: "Avant d'évacuer", correctPosition: 4 },
    { id: "p5", label: "Évacuer par les sorties de secours", sublabel: "Ne jamais prendre l'ascenseur", correctPosition: 5 },
    { id: "p6", label: "Rejoindre le point de rassemblement", sublabel: "Se signaler au responsable", correctPosition: 6 },
  ],
};

const ch2m7_orderpuzzle: OrderPuzzleExercise = {
  type: "orderpuzzle",
  title: "Procédure complète d'évacuation IBM",
  subtitle: "Remettez les 7 étapes de la procédure dans le bon ordre",
  instruction: "Faites glisser les étapes pour reconstituer la séquence officielle",
  successMessage: "Procédure d'évacuation IBM parfaitement maîtrisée !",
  pieces: [
    { id: "e1", label: "Détecter et confirmer l'alerte", sublabel: "Signal sonore ou visuel", correctPosition: 1 },
    { id: "e2", label: "Composer le 22 22", sublabel: "Sécurité IBM avant le 18", correctPosition: 2 },
    { id: "e3", label: "Alerter les collègues à voix posée", sublabel: "Pas de panique", correctPosition: 3 },
    { id: "e4", label: "Fermer les portes en partant", sublabel: "Sans verrouiller", correctPosition: 4 },
    { id: "e5", label: "Évacuer par les escaliers", sublabel: "Jamais l'ascenseur", correctPosition: 5 },
    { id: "e6", label: "Vérifier les zones accessibles", sublabel: "S'assurer que personne ne reste", correctPosition: 6 },
    { id: "e7", label: "Se signaler au responsable évacuation", sublabel: "Au point de rassemblement", correctPosition: 7 },
  ],
};

// ── SERIOUS GAME ───────────────────────────────────────────────
const m7_seriousgame: SeriousGameExercise = {
  type: "seriousgame",
  title: "Réflexes Incendie — Challenge Chronométré",
  subtitle: "3 vies · 6 situations · Décisions en temps réel",
  successMessage: "Score Réflexes Expert — Tous les bons réflexes acquis !",
  rounds: [
    {
      situation: "14h30. L'alarme retentit. Une fumée légère entre par la porte. Un extincteur CO2 est à 3m. Que faites-vous EN PREMIER ?",
      timeLimit: 8,
      actions: [
        { label: "Évaluer rapidement la situation (5 sec)", correct: true, feedback: "Correct. 5 secondes d'évaluation avant d'agir — c'est la règle IBM." },
        { label: "Prendre l'extincteur et chercher le feu", correct: false, feedback: "Risqué. Sans évaluation, vous pourriez foncer vers un feu trop développé." },
        { label: "Rester à son bureau et attendre", correct: false, feedback: "Erreur grave. L'inaction face à l'alarme est la pire réponse." },
        { label: "Appeler son manager pour confirmation", correct: false, feedback: "Faux. En cas d'alarme, pas besoin de confirmation — agir immédiatement." },
      ],
    },
    {
      situation: "Vous approchez d'une porte. Elle est CHAUDE au toucher. De la fumée noire passe dessous.",
      timeLimit: 6,
      actions: [
        { label: "Ouvrir doucement pour évaluer", correct: false, feedback: "Erreur fatale. Porte chaude + fumée noire = feu développé. L'ouvrir aspire le feu vers vous." },
        { label: "Ne pas ouvrir — rebrousser et évacuer", correct: true, feedback: "Décision vitale. Porte chaude = feu de l'autre côté. Retraite immédiate." },
        { label: "Arroser la porte avec le CO2", correct: false, feedback: "Inutile. Le CO2 refroidit la surface mais ne change rien au feu de l'autre côté." },
        { label: "Attendre devant la porte", correct: false, feedback: "Dangereux. Rester expose à la chaleur et aux gaz toxiques." },
      ],
    },
    {
      situation: "Feu de câbles visible — taille d'une corbeille. Sortie dans votre dos à 4m. CO2 disponible. Que faites-vous ?",
      timeLimit: 8,
      actions: [
        { label: "Intervenir avec le CO2 — PASS", correct: true, feedback: "Correct. Toutes les conditions sont réunies : petit feu, CO2 adapté, sortie libre." },
        { label: "Évacuer directement sans intervenir", correct: false, feedback: "Acceptable mais sous-optimal. Le feu est contrôlable et les conditions sont réunies." },
        { label: "Appeler les pompiers d'abord", correct: false, feedback: "Faux. Agir d'abord (max 30s), alerter ensuite. Le 22 22 puis le 18." },
        { label: "Verser de l'eau sur les câbles", correct: false, feedback: "Interdit. Jamais d'eau sur un feu électrique — risque d'électrocution." },
      ],
    },
    {
      situation: "Fumée envahit le couloir. Vous ne voyez plus la sortie. Quelle est votre position ?",
      timeLimit: 7,
      actions: [
        { label: "Rester debout, progresser rapidement", correct: false, feedback: "Faux. Debout vous respirez la fumée chaude. La toxicité est mortelle en secondes." },
        { label: "S'accroupir et progresser sous la fumée", correct: true, feedback: "Exact. L'air respirable reste dans le tiers inférieur de la pièce." },
        { label: "Faire demi-tour et retourner à son bureau", correct: false, feedback: "Risqué. Mieux vaut progresser vers la sortie que rester dans le bâtiment." },
        { label: "Ouvrir toutes les fenêtres pour aérer", correct: false, feedback: "Faux. Ouvrir les fenêtres attire l'oxygène et intensifie l'incendie." },
      ],
    },
    {
      situation: "Vous êtes au point de rassemblement. Une collègue est manquante. Que faites-vous ?",
      timeLimit: 6,
      actions: [
        { label: "Retourner la chercher vous-même", correct: false, feedback: "Interdit et dangereux. Retourner sans équipement = risque vital pour vous aussi." },
        { label: "Signaler immédiatement aux secours avec description et dernière localisation", correct: true, feedback: "Correct. Les secours ont l'équipement pour effectuer les recherches en sécurité." },
        { label: "Attendre qu'elle arrive peut-être par un autre chemin", correct: false, feedback: "Insuffisant. Signaler sans délai permet d'agir rapidement." },
        { label: "L'appeler sur son téléphone portable", correct: false, feedback: "Secondaire. Signaler d'abord aux secours, appel si possible en parallèle." },
      ],
    },
    {
      situation: "L'extincteur est vide. Le feu ne recule pas. Vous êtes à 30 secondes d'intervention.",
      timeLimit: 5,
      actions: [
        { label: "Chercher un autre extincteur rapidement", correct: false, feedback: "Trop risqué. Après 30 secondes d'inefficacité, le feu est trop développé pour vous." },
        { label: "Reculer et évacuer immédiatement", correct: true, feedback: "Bonne décision. La règle IBM : si le feu ne recule pas en 30s — évacuer sans hésiter." },
        { label: "Continuer avec l'extincteur vide pour intimider le feu", correct: false, feedback: "Absurde et dangereux. Un extincteur vide n'a aucun effet." },
        { label: "Appeler les collègues pour aider", correct: false, feedback: "Faux. En urgence, évacuer seul et rapidement, pas grouper des gens non équipés." },
      ],
    },
  ],
};

// ── Export map ─────────────────────────────────────────────────

// ── TipFlip cards ─────────────────────────────────────────────────

const m4_tipflip: TipFlipExercise = {
  type: "tipflip",
  title: "Le saviez-vous ? — Classes de feu",
  subtitle: "Retournez chaque carte pour découvrir l'explication complète",
  cards: [
    {
      icon: "Flame",
      accent: "flame",
      stat: "5",
      label: "Classes de feu à maîtriser",
      category: "chiffre",
      tipTitle: "Pourquoi 5 classes ?",
      tip: "Chaque classe (A : solides, B : liquides, C : gaz, D : métaux, F : huiles) réclame un agent extincteur spécifique. Utiliser le mauvais agent peut propager le sinistre au lieu de l'éteindre.",
    },
    {
      icon: "Zap",
      accent: "alert",
      stat: "CO₂",
      label: "Seul agent pour feux électriques",
      category: "astuce",
      tipTitle: "Jamais d'eau sur l'électrique",
      tip: "L'eau est conductrice d'électricité — risque d'électrocution fatal. Le CO₂ étouffe la flamme sans conduire le courant et sans laisser de résidu sur les équipements.",
    },
    {
      icon: "Timer",
      accent: "clock",
      stat: "30s",
      label: "Durée d'un extincteur CO₂ 2kg",
      category: "chiffre",
      tipTitle: "Un extincteur s'épuise vite",
      tip: "30 secondes de décharge maximum pour un extincteur CO₂ de 2kg. Si le feu n'est pas maîtrisé à ce stade, évacuez immédiatement. Persister en rechargement zéro est dangereux.",
    },
    {
      icon: "Target",
      accent: "shield",
      stat: "2–3m",
      label: "Distance idéale d'intervention",
      category: "astuce",
      tipTitle: "Ni trop près, ni trop loin",
      tip: "Le CO₂ sort à -78°C. Trop proche = brûlure par le froid. Trop loin = perte d'efficacité. 2 à 3 mètres du foyer est la distance qui combine sécurité et efficacité maximale.",
    },
  ],
};

const m6_tipflip: TipFlipExercise = {
  type: "tipflip",
  title: "Le saviez-vous ? — Intervenir ou évacuer",
  subtitle: "Retournez chaque carte pour découvrir l'explication complète",
  cards: [
    {
      icon: "Clock",
      accent: "clock",
      stat: "10s",
      label: "La règle de décision",
      category: "chiffre",
      tipTitle: "Observer · Évaluer · Décider",
      tip: "10 secondes maximum pour prendre votre décision. Observer la taille du feu, évaluer l'agent disponible, décider. Au-delà, le feu double de volume — vos options se réduisent.",
    },
    {
      icon: "CheckSquare",
      accent: "shield",
      stat: "3",
      label: "Critères pour intervenir sans risque",
      category: "astuce",
      tipTitle: "Les 3 conditions obligatoires",
      tip: "Feu inférieur à une corbeille à papier, extincteur adapté à portée, sortie dégagée dans le dos. Si UN seul critère manque, l'intervention est interdite. Évacuez.",
    },
    {
      icon: "AlertTriangle",
      accent: "alert",
      stat: "80%",
      label: "Des victimes auraient pu survivre",
      category: "funfact",
      tipTitle: "L'hésitation tue",
      tip: "Dans la majorité des incendies mortels d'entreprise, une évacuation plus rapide aurait changé l'issue. Le doute doit toujours conduire à l'évacuation — jamais à l'attente.",
    },
    {
      icon: "Eye",
      accent: "eye",
      stat: "1m80",
      label: "Hauteur où la fumée asphyxie",
      category: "funfact",
      tipTitle: "Restez en dessous",
      tip: "En dessous de 1m80, l'air reste respirable plus longtemps. Si vous traversez un couloir enfumé pour évacuer, baissez-vous. La fumée monte — l'air pur reste en bas.",
    },
  ],
};

const ch2m3_tipflip: TipFlipExercise = {
  type: "tipflip",
  title: "Le saviez-vous ? — Fermer les portes",
  subtitle: "Retournez chaque carte pour découvrir l'explication complète",
  cards: [
    {
      icon: "DoorClosed",
      accent: "flame",
      stat: "5×",
      label: "Plus vite avec porte ouverte",
      category: "chiffre",
      tipTitle: "La porte comme bouclier",
      tip: "Une porte coupe-feu ouverte permet au feu de se propager 5 fois plus rapidement. Fermer une porte en fuyant est souvent plus efficace qu'utiliser un extincteur.",
    },
    {
      icon: "Shield",
      accent: "shield",
      stat: "30min",
      label: "Résistance d'une porte EI30 fermée",
      category: "chiffre",
      tipTitle: "Calée ouverte : protection zéro",
      tip: "Une porte coupe-feu EI30 résiste 30 minutes au feu et à la fumée. Fermée, elle protège les voies d'évacuation. Calée ouverte, elle devient un accélérateur de sinistre.",
    },
    {
      icon: "ArrowRight",
      accent: "clock",
      stat: "SORS",
      label: "Première étape de la séquence",
      category: "astuce",
      tipTitle: "La séquence ne s'inverse pas",
      tip: "SORS d'abord, FERME ensuite, SIGNALE après. Ne jamais rester dans la pièce pour fermer avant de sortir. Ne jamais rouvrir pour récupérer des affaires — jamais d'exception.",
    },
    {
      icon: "XCircle",
      accent: "alert",
      stat: "0",
      label: "Exception à la règle de fermeture",
      category: "astuce",
      tipTitle: "Règle absolue sans exception",
      tip: "Zéro exception. Toutes les portes doivent être fermées lors d'une évacuation, quelle que soit la situation. Même si vous pensez revenir vite. Même si la pièce est vide.",
    },
  ],
};

const ch2m5_tipflip: TipFlipExercise = {
  type: "tipflip",
  title: "Le saviez-vous ? — Faire face à la fumée",
  subtitle: "Retournez chaque carte pour découvrir l'explication complète",
  cards: [
    {
      icon: "Clock",
      accent: "alert",
      stat: "3min",
      label: "Pour perdre connaissance",
      category: "chiffre",
      tipTitle: "La fumée agit en silence",
      tip: "La fumée d'incendie contient du monoxyde de carbone, du CO₂ et des gaz toxiques. En 3 minutes d'exposition dans une zone enfumée, la perte de conscience est possible.",
    },
    {
      icon: "TrendingDown",
      accent: "flame",
      stat: "60%",
      label: "Des morts par intoxication",
      category: "funfact",
      tipTitle: "La fumée tue avant le feu",
      tip: "Plus de 60% des victimes d'incendie meurent d'intoxication et non des flammes. Fuir la fumée est la priorité absolue — même si vous ne voyez pas de feu directement.",
    },
    {
      icon: "Wind",
      accent: "zap",
      stat: "30m/min",
      label: "Vitesse de montée de la fumée",
      category: "chiffre",
      tipTitle: "Descendez toujours",
      tip: "La fumée monte à environ 30 mètres par minute verticalement. Un immeuble de 6 étages s'enfume en 2 minutes. En cas d'incendie, descendre est toujours plus sûr que monter.",
    },
    {
      icon: "ArrowDown",
      accent: "shield",
      stat: "0,5m",
      label: "Zone d'air respirable au sol",
      category: "astuce",
      tipTitle: "Rampez si vous le devez",
      tip: "À 50 cm du sol, l'air reste respirable plusieurs minutes supplémentaires. En cas de couloir enfumé : baissez-vous, protégez votre bouche avec un tissu humide si possible, avancez vite.",
    },
  ],
};

// ── SPIN THE WHEEL — ch1-m2 (Triangle du feu) ─────────────────
const m2_spinwheel: SpinWheelExercise = {
  type: "spinwheel",
  title: "Roue de la connaissance — Triangle du feu",
  titleEn: "Wheel of Knowledge — Fire Triangle",
  subtitle: "Tournez et répondez !",
  subtitleEn: "Spin and answer!",
  items: [
    {
      label: "OXYGÈNE",
      labelEn: "OXYGEN",
      question: "Quel pourcentage d'oxygène dans l'air est nécessaire pour entretenir une combustion ?",
      questionEn: "What percentage of oxygen in the air is needed to sustain combustion?",
      choices: [
        { key: "A", label: "8%", labelEn: "8%" },
        { key: "B", label: "16%", labelEn: "16%" },
        { key: "C", label: "21%", labelEn: "21%" },
        { key: "D", label: "30%", labelEn: "30%" },
      ],
      correctKey: "B",
      explanation: "En dessous de 16% d'O₂, la combustion ne peut plus se maintenir. L'air ambiant contient 21% — c'est pourquoi fermer les portes (réduire l'oxygène) ralentit le feu.",
      explanationEn: "Below 16% O₂, combustion cannot be sustained. Ambient air contains 21% — which is why closing doors (reducing oxygen) slows the fire.",
    },
    {
      label: "COMBUSTIBLE",
      labelEn: "FUEL",
      question: "Parmi ces matériaux de bureau, lequel constitue le combustible le plus dangereux en cas d'incendie ?",
      questionEn: "Among these office materials, which is the most dangerous fuel in case of fire?",
      choices: [
        { key: "A", label: "Métal d'un bureau", labelEn: "Metal desk" },
        { key: "B", label: "Câbles électriques", labelEn: "Electrical cables" },
        { key: "C", label: "Verre d'une fenêtre", labelEn: "Window glass" },
        { key: "D", label: "Eau d'une bouteille", labelEn: "Bottled water" },
      ],
      correctKey: "B",
      explanation: "Les câbles électriques (PVC, plastique) brûlent facilement, dégagent des fumées toxiques et propagent le feu rapidement d'un local à l'autre via les faux-plafonds.",
      explanationEn: "Electrical cables (PVC, plastic) burn easily, release toxic fumes, and spread fire quickly between rooms via false ceilings.",
    },
    {
      label: "CHALEUR",
      labelEn: "HEAT",
      question: "À quelle température le papier ordinaire s'enflamme-t-il spontanément ?",
      questionEn: "At what temperature does ordinary paper spontaneously ignite?",
      choices: [
        { key: "A", label: "100°C", labelEn: "100°C" },
        { key: "B", label: "233°C", labelEn: "233°C" },
        { key: "C", label: "450°C", labelEn: "450°C" },
        { key: "D", label: "700°C", labelEn: "700°C" },
      ],
      correctKey: "B",
      explanation: "Le papier s'enflamme spontanément vers 233°C (451°F). Dans un bureau, une simple source de chaleur concentrée peut donc déclencher un incendie très rapidement.",
      explanationEn: "Paper spontaneously ignites at around 233°C (451°F). In an office, a concentrated heat source can therefore trigger a fire very quickly.",
    },
    {
      label: "TRIANGLE",
      labelEn: "TRIANGLE",
      question: "Que se passe-t-il si vous retirez l'un des 3 éléments du triangle du feu ?",
      questionEn: "What happens if you remove one of the 3 elements of the fire triangle?",
      choices: [
        { key: "A", label: "Le feu brûle plus vite", labelEn: "The fire burns faster" },
        { key: "B", label: "Le feu s'intensifie", labelEn: "The fire intensifies" },
        { key: "C", label: "Le feu s'éteint", labelEn: "The fire goes out" },
        { key: "D", label: "Rien ne change", labelEn: "Nothing changes" },
      ],
      correctKey: "C",
      explanation: "Le triangle du feu exige 3 éléments simultanés : combustible, chaleur et oxygène. Supprimer n'importe lequel — avec un extincteur, une porte fermée ou de l'eau — éteint le feu.",
      explanationEn: "The fire triangle requires 3 simultaneous elements: fuel, heat and oxygen. Removing any one — with an extinguisher, a closed door or water — extinguishes the fire.",
    },
    {
      label: "CLASSES",
      labelEn: "CLASSES",
      question: "Un feu électrique (ordinateur, câble) correspond à quelle classe d'incendie IBM ?",
      questionEn: "An electrical fire (computer, cable) corresponds to which IBM fire class?",
      choices: [
        { key: "A", label: "Classe A — solides", labelEn: "Class A — solids" },
        { key: "B", label: "Classe B — liquides", labelEn: "Class B — liquids" },
        { key: "C", label: "Classe C — gaz", labelEn: "Class C — gas" },
        { key: "D", label: "Classe E — électrique", labelEn: "Class E — electrical" },
      ],
      correctKey: "D",
      explanation: "La classe E (ou F selon les normes) désigne les feux sur équipements électriques sous tension. N'utilisez jamais d'eau — uniquement CO2 ou poudre sèche.",
      explanationEn: "Class E (or F depending on standards) designates fires on live electrical equipment. Never use water — only CO2 or dry powder.",
    },
    {
      label: "RÉFLEXE",
      labelEn: "REFLEX",
      question: "Vous détectez une odeur de brûlé depuis l'imprimante. Quelle est votre première action IBM ?",
      questionEn: "You detect a burning smell from the printer. What is your first IBM action?",
      choices: [
        { key: "A", label: "Ouvrir les fenêtres", labelEn: "Open the windows" },
        { key: "B", label: "Appeler le 18 directement", labelEn: "Call 18 directly" },
        { key: "C", label: "Appeler le 22 22 (Sécurité IBM)", labelEn: "Call 22 22 (IBM Security)" },
        { key: "D", label: "Attendre de voir les flammes", labelEn: "Wait to see flames" },
      ],
      correctKey: "C",
      explanation: "Le protocole IBM impose d'appeler le 22 22 (Sécurité interne) en premier — avant le 18. La sécurité IBM connaît les plans du bâtiment et coordonne l'intervention.",
      explanationEn: "IBM protocol requires calling 22 22 (internal Security) first — before 18. IBM Security knows the building plans and coordinates the response.",
    },
  ],
};

// ── SPIN THE WHEEL — ch2-m4 (Procédures d'urgence) ────────────
const ch2m4_spinwheel: SpinWheelExercise = {
  type: "spinwheel",
  title: "Roue d'urgence — Évacuation",
  titleEn: "Emergency Wheel — Evacuation",
  subtitle: "Connaissez-vous les règles ?",
  subtitleEn: "Do you know the rules?",
  items: [
    {
      label: "ASCENSEUR",
      labelEn: "ELEVATOR",
      question: "Lors d'une évacuation incendie, que faites-vous face à un ascenseur ?",
      questionEn: "During a fire evacuation, what do you do when facing an elevator?",
      choices: [
        { key: "A", label: "Je l'utilise si le feu est loin", labelEn: "Use it if the fire is far" },
        { key: "B", label: "Je n'utilise jamais l'ascenseur", labelEn: "Never use the elevator" },
        { key: "C", label: "Je l'utilise pour les personnes âgées", labelEn: "Use it for elderly people" },
        { key: "D", label: "Je décide selon l'étage", labelEn: "Decide based on the floor" },
      ],
      correctKey: "B",
      explanation: "JAMAIS d'ascenseur en cas d'incendie — même en panne de courant, il peut rester bloqué dans une zone enfumée. Toujours utiliser les escaliers.",
      explanationEn: "NEVER use the elevator during a fire — even during a power failure, it can get stuck in a smoke-filled area. Always use the stairs.",
    },
    {
      label: "PORTE",
      labelEn: "DOOR",
      question: "Vous devez traverser une porte fermée lors de l'évacuation. Que vérifiez-vous d'abord ?",
      questionEn: "You need to cross a closed door during evacuation. What do you check first?",
      choices: [
        { key: "A", label: "La couleur de la porte", labelEn: "The color of the door" },
        { key: "B", label: "La chaleur de la poignée avec la main", labelEn: "The handle heat with your hand" },
        { key: "C", label: "Si la porte est verrouillée", labelEn: "If the door is locked" },
        { key: "D", label: "Rien, j'ouvre directement", labelEn: "Nothing, I open directly" },
      ],
      correctKey: "B",
      explanation: "Touchez la poignée du dos de la main (plus sensible à la chaleur). Si elle est chaude, ne l'ouvrez pas — il y a du feu ou de la fumée de l'autre côté.",
      explanationEn: "Touch the handle with the back of your hand (more sensitive to heat). If it's hot, don't open it — there's fire or smoke on the other side.",
    },
    {
      label: "RASSEMBLEMENT",
      labelEn: "ASSEMBLY",
      question: "Une fois sorti du bâtiment lors d'une évacuation incendie, où devez-vous vous rendre ?",
      questionEn: "Once outside the building during a fire evacuation, where must you go?",
      choices: [
        { key: "A", label: "Chez le collègue le plus proche", labelEn: "To the nearest colleague" },
        { key: "B", label: "Dans votre voiture sur le parking", labelEn: "To your car in the parking lot" },
        { key: "C", label: "Au point de rassemblement désigné", labelEn: "To the designated assembly point" },
        { key: "D", label: "Au café d'à côté", labelEn: "To the coffee shop nearby" },
      ],
      correctKey: "C",
      explanation: "Le point de rassemblement désigné permet au responsable évacuation de faire l'appel et de s'assurer que tout le monde est sorti. Ne quittez jamais ce point sans autorisation.",
      explanationEn: "The designated assembly point allows the evacuation warden to take roll call and ensure everyone has evacuated. Never leave this point without authorization.",
    },
    {
      label: "PMR",
      labelEn: "MOBILITY",
      question: "Une personne en fauteuil roulant ne peut pas utiliser les escaliers. Que faites-vous ?",
      questionEn: "A person in a wheelchair cannot use the stairs. What do you do?",
      choices: [
        { key: "A", label: "Je la laisse attendre l'ascenseur", labelEn: "Leave them to wait for the elevator" },
        { key: "B", label: "Je la conduis à l'espace d'attente sécurisé et alerte les secours", labelEn: "Guide them to the safe waiting area and alert rescue services" },
        { key: "C", label: "Je la transporte dans mes bras", labelEn: "Carry them in my arms" },
        { key: "D", label: "Je la laisse sur place", labelEn: "Leave them in place" },
      ],
      correctKey: "B",
      explanation: "Les PMR (Personnes à Mobilité Réduite) doivent être conduites vers l'espace d'attente sécurisé (EAS) prévu sur chaque palier. Les pompiers sont formés pour les évacuer.",
      explanationEn: "People with Reduced Mobility (PRM) must be guided to the designated safe waiting area (SWA) on each landing. Firefighters are trained to evacuate them.",
    },
    {
      label: "FUMÉE",
      labelEn: "SMOKE",
      question: "Vous êtes bloqué par de la fumée dans un couloir. Quelle position adoptez-vous ?",
      questionEn: "You are blocked by smoke in a corridor. What position do you adopt?",
      choices: [
        { key: "A", label: "Je cours le plus vite possible", labelEn: "I run as fast as possible" },
        { key: "B", label: "Je me baisse et rampe sous la fumée", labelEn: "I crouch and crawl under the smoke" },
        { key: "C", label: "Je respire profondément pour tenir", labelEn: "I breathe deeply to hold on" },
        { key: "D", label: "Je reviens sur mes pas debout", labelEn: "I turn back standing up" },
      ],
      correctKey: "B",
      explanation: "La fumée est plus légère que l'air et monte. En dessous d'1 mètre, l'air est plus respirable. Couvrez-vous le nez et la bouche et avancez en rampant vers la sortie.",
      explanationEn: "Smoke is lighter than air and rises. Below 1 meter, the air is more breathable. Cover your nose and mouth and crawl towards the exit.",
    },
    {
      label: "ALARME",
      labelEn: "ALARM",
      question: "L'alarme incendie sonne. Votre manager dit que c'est sûrement un faux-alarme. Que faites-vous ?",
      questionEn: "The fire alarm sounds. Your manager says it's probably a false alarm. What do you do?",
      choices: [
        { key: "A", label: "J'attends la confirmation de mon manager", labelEn: "I wait for my manager's confirmation" },
        { key: "B", label: "Je continue à travailler", labelEn: "I continue working" },
        { key: "C", label: "J'évacue immédiatement sans attendre", labelEn: "I evacuate immediately without waiting" },
        { key: "D", label: "Je cherche d'abord d'où vient l'alarme", labelEn: "I first search where the alarm comes from" },
      ],
      correctKey: "C",
      explanation: "Toute alarme doit être traitée comme réelle jusqu'à preuve du contraire. Le protocole IBM est formel : évacuer immédiatement. Votre vie ne vaut pas le risque d'attendre.",
      explanationEn: "Every alarm must be treated as real until proven otherwise. IBM protocol is clear: evacuate immediately. Your life is not worth the risk of waiting.",
    },
  ],
};

// ── GRID QUIZ — ch1-m5 (Extincteurs) ─────────────────────────
const m5_gridquiz: GridQuizExercise = {
  type: "gridquiz",
  title: "Vrai ou Faux — Extincteurs",
  titleEn: "True or False — Fire Extinguishers",
  subtitle: "9 affirmations · Cliquez une case pour commencer",
  subtitleEn: "9 statements · Click a cell to start",
  cells: [
    {
      statement: "On peut utiliser un extincteur à eau sur un feu électrique.",
      statementEn: "You can use a water extinguisher on an electrical fire.",
      correct: "false",
      explanation: "FAUX. L'eau conduit l'électricité et vous expose à une électrocution. Pour les feux électriques, utilisez uniquement un extincteur CO2.",
      explanationEn: "FALSE. Water conducts electricity and exposes you to electrocution. For electrical fires, only use a CO2 extinguisher.",
    },
    {
      statement: "Le CO2 agit en étouffant le feu en supprimant l'oxygène.",
      statementEn: "CO2 works by smothering the fire by removing oxygen.",
      correct: "true",
      explanation: "VRAI. Le dioxyde de carbone déplace l'oxygène autour du foyer, privant la combustion de l'un de ses 3 éléments essentiels.",
      explanationEn: "TRUE. Carbon dioxide displaces oxygen around the fire, depriving combustion of one of its 3 essential elements.",
    },
    {
      statement: "Vous devez vous placer dos au vent pour utiliser un extincteur en extérieur.",
      statementEn: "You should stand with the wind at your back when using an extinguisher outdoors.",
      correct: "true",
      explanation: "VRAI. Le vent dans le dos projette l'agent extincteur vers le feu et évite qu'il ne vous soit renvoyé au visage.",
      explanationEn: "TRUE. Wind at your back projects the extinguishing agent towards the fire and prevents it from being blown back in your face.",
    },
    {
      statement: "Un extincteur à poudre peut être utilisé sur tous les types de feux.",
      statementEn: "A powder extinguisher can be used on all types of fires.",
      correct: "false",
      explanation: "FAUX. La poudre est polyvalente (A, B, C) mais déconseillée sur les équipements électroniques sensibles car elle les détruit irrémédiablement.",
      explanationEn: "FALSE. Powder is versatile (A, B, C) but not recommended on sensitive electronic equipment as it permanently destroys them.",
    },
    {
      statement: "Il faut tenir la lance de l'extincteur CO2 avec les deux mains.",
      statementEn: "You should hold the CO2 extinguisher nozzle with both hands.",
      correct: "false",
      explanation: "FAUX. Le col de cygne du CO2 se refroidit fortement (jusqu'à -78°C). Tenez uniquement la poignée isolée, jamais la lance directement.",
      explanationEn: "FALSE. The CO2 diffuser cone gets very cold (down to -78°C). Hold only the insulated handle, never the nozzle directly.",
    },
    {
      statement: "La méthode PASS (Goupille, Viser, Presser, Balayer) est universelle pour tous les extincteurs.",
      statementEn: "The PASS method (Pull, Aim, Squeeze, Sweep) is universal for all extinguishers.",
      correct: "true",
      explanation: "VRAI. PASS (Pull pin, Aim low, Squeeze handle, Sweep side to side) est la méthode standard reconnue internationalement pour utiliser tout type d'extincteur.",
      explanationEn: "TRUE. PASS (Pull pin, Aim low, Squeeze handle, Sweep side to side) is the internationally recognized standard method for using any type of extinguisher.",
    },
    {
      statement: "Un extincteur vide peut être laissé en place après utilisation.",
      statementEn: "An empty extinguisher can be left in place after use.",
      correct: "false",
      explanation: "FAUX. Un extincteur vide doit être immédiatement remplacé et signalé à la maintenance. Le laisser en place donne une fausse impression de sécurité.",
      explanationEn: "FALSE. An empty extinguisher must be immediately replaced and reported to maintenance. Leaving it in place gives a false sense of security.",
    },
    {
      statement: "La distance d'attaque recommandée avec un extincteur est de 1 à 2 mètres du foyer.",
      statementEn: "The recommended attack distance with an extinguisher is 1 to 2 meters from the fire.",
      correct: "true",
      explanation: "VRAI. À 1-2 mètres, vous pouvez viser efficacement la base du feu tout en maintenant une distance de sécurité. Plus près = risque de brûlure.",
      explanationEn: "TRUE. At 1-2 meters, you can effectively aim at the base of the fire while maintaining a safe distance. Closer = burn risk.",
    },
    {
      statement: "En cas d'échec, vous devez tenter à nouveau d'éteindre le feu avec un extincteur vide.",
      statementEn: "If unsuccessful, you should try again to extinguish the fire with an empty extinguisher.",
      correct: "false",
      explanation: "FAUX. Si l'extincteur ne suffit pas ou est vide, évacuez immédiatement. Ne prenez pas de risques inutiles — les pompiers prendront le relais.",
      explanationEn: "FALSE. If the extinguisher is insufficient or empty, evacuate immediately. Don't take unnecessary risks — firefighters will take over.",
    },
  ],
};

// ── GRID QUIZ — ch2-m6 (Règles d'évacuation) ─────────────────
const ch2m6_gridquiz: GridQuizExercise = {
  type: "gridquiz",
  title: "Vrai ou Faux — Évacuation",
  titleEn: "True or False — Evacuation",
  subtitle: "9 règles essentielles · Testez-vous !",
  subtitleEn: "9 essential rules · Test yourself!",
  cells: [
    {
      statement: "Il est permis de retourner chercher ses affaires personnelles après avoir évacué.",
      statementEn: "It is permitted to go back to collect personal belongings after evacuating.",
      correct: "false",
      explanation: "FAUX. Retourner dans un bâtiment en feu est extrêmement dangereux. Les secours peuvent avoir fermé l'accès. Vos affaires ne valent pas votre vie.",
      explanationEn: "FALSE. Returning to a burning building is extremely dangerous. Emergency services may have closed access. Your belongings are not worth your life.",
    },
    {
      statement: "Les sorties de secours doivent toujours rester dégagées et accessibles.",
      statementEn: "Emergency exits must always remain clear and accessible.",
      correct: "true",
      explanation: "VRAI. Bloquer une sortie de secours est une infraction grave. En cas d'urgence, quelques secondes suffisent pour que l'obstruction coûte des vies.",
      explanationEn: "TRUE. Blocking an emergency exit is a serious offence. In an emergency, a few seconds are enough for an obstruction to cost lives.",
    },
    {
      statement: "En cas d'évacuation, il faut attendre que son manager donne l'ordre de partir.",
      statementEn: "During an evacuation, you must wait for your manager to give the order to leave.",
      correct: "false",
      explanation: "FAUX. L'alarme incendie est l'ordre d'évacuation. Tout le monde doit quitter les lieux immédiatement, quel que soit l'avis du management.",
      explanationEn: "FALSE. The fire alarm IS the evacuation order. Everyone must leave immediately, regardless of management's opinion.",
    },
    {
      statement: "La fumée est responsable de la majorité des décès lors d'incendies.",
      statementEn: "Smoke is responsible for the majority of deaths in fires.",
      correct: "true",
      explanation: "VRAI. Plus de 80% des décès par incendie sont dus à l'inhalation de fumée toxique, et non aux flammes directement. La fumée est l'ennemi invisible.",
      explanationEn: "TRUE. More than 80% of fire deaths are caused by toxic smoke inhalation, not by the flames directly. Smoke is the invisible enemy.",
    },
    {
      statement: "Il faut fermer les portes derrière soi lors de l'évacuation.",
      statementEn: "You should close doors behind you during evacuation.",
      correct: "true",
      explanation: "VRAI. Une porte fermée ralentit la propagation du feu et de la fumée de 15 à 30 minutes. C'est un geste simple qui peut sauver des vies.",
      explanationEn: "TRUE. A closed door slows the spread of fire and smoke by 15 to 30 minutes. It's a simple action that can save lives.",
    },
    {
      statement: "Vous pouvez rester dans votre bureau si vous avez terminé une réunion importante.",
      statementEn: "You can stay in your office if you are finishing an important meeting.",
      correct: "false",
      explanation: "FAUX. Aucune réunion, dossier ou engagement professionnel ne justifie de rester dans un bâtiment en alerte incendie. L'évacuation est prioritaire.",
      explanationEn: "FALSE. No meeting, file or professional commitment justifies staying in a building on fire alert. Evacuation is the priority.",
    },
    {
      statement: "Le responsable évacuation (guide-file) doit être le dernier à quitter chaque zone.",
      statementEn: "The evacuation warden (guide) must be the last to leave each area.",
      correct: "true",
      explanation: "VRAI. Le guide-file vérifie que toutes les personnes ont quitté sa zone avant de partir lui-même. Il est responsable du contrôle de l'évacuation.",
      explanationEn: "TRUE. The warden checks that all people have left their area before leaving themselves. They are responsible for controlling the evacuation.",
    },
    {
      statement: "En cas de fumée, la position debout est plus sûre pour se déplacer.",
      statementEn: "In case of smoke, standing upright is safer when moving.",
      correct: "false",
      explanation: "FAUX. La fumée monte. En restant bas (en rampant), vous respirez l'air le plus pur disponible. Rampez sous le niveau de fumée pour survivre.",
      explanationEn: "FALSE. Smoke rises. By staying low (crawling), you breathe the purest available air. Crawl below the smoke level to survive.",
    },
    {
      statement: "Au point de rassemblement, vous devez vous signaler à votre responsable d'évacuation.",
      statementEn: "At the assembly point, you must report to your evacuation warden.",
      correct: "true",
      explanation: "VRAI. L'appel nominal au point de rassemblement permet de confirmer que personne n'est resté bloqué à l'intérieur. C'est une procédure obligatoire IBM.",
      explanationEn: "TRUE. Roll call at the assembly point confirms that no one is trapped inside. This is a mandatory IBM procedure.",
    },
  ],
};

// ── MIND MAP — ch1-m3 (Confinement) ──────────────────────────
const m3_mindmap: MindMapExercise = {
  type: "mindmap",
  title: "Carte mentale — Le confinement",
  titleEn: "Mind Map — Confinement",
  subtitle: "Sélectionnez les actions qui appartiennent au confinement",
  subtitleEn: "Select the actions that belong to the confinement procedure",
  centerLabel: "CONFINEMENT",
  centerLabelEn: "CONFINEMENT",
  items: [
    {
      id: "mm1", label: "Fermer les portes", labelEn: "Close the doors",
      isCorrect: true,
      explanation: "CORRECT — Fermer les portes isole le foyer et ralentit la propagation de la fumée et du feu vers votre local.",
      explanationEn: "CORRECT — Closing doors isolates the fire source and slows the spread of smoke and fire towards your room.",
    },
    {
      id: "mm2", label: "Calfeutrer les fissures", labelEn: "Seal the gaps",
      isCorrect: true,
      explanation: "CORRECT — Boucher les interstices sous les portes (avec tissu, vêtement) empêche la fumée toxique de pénétrer dans votre local.",
      explanationEn: "CORRECT — Sealing gaps under doors (with fabric, clothing) prevents toxic smoke from entering your room.",
    },
    {
      id: "mm3", label: "Appeler le 22 22", labelEn: "Call 22 22",
      isCorrect: true,
      explanation: "CORRECT — Contacter la sécurité IBM permet aux secours de connaître votre position exacte et d'organiser votre évacuation.",
      explanationEn: "CORRECT — Contacting IBM security allows rescuers to know your exact position and organise your evacuation.",
    },
    {
      id: "mm4", label: "Signaler sa présence", labelEn: "Signal your presence",
      isCorrect: true,
      explanation: "CORRECT — Se manifester à la fenêtre ou par téléphone aide les secours à vous localiser rapidement.",
      explanationEn: "CORRECT — Making yourself visible at the window or by phone helps rescuers locate you quickly.",
    },
    {
      id: "mm5", label: "Rester dans le local", labelEn: "Stay in the room",
      isCorrect: true,
      explanation: "CORRECT — Le confinement consiste précisément à rester en lieu sûr quand l'évacuation est impossible ou trop dangereuse.",
      explanationEn: "CORRECT — Confinement consists precisely of staying in a safe place when evacuation is impossible or too dangerous.",
    },
    {
      id: "mm6", label: "Prendre l'ascenseur", labelEn: "Take the elevator",
      isCorrect: false,
      explanation: "INCORRECT — L'ascenseur est toujours interdit lors d'un incendie. En confinement, vous restez sur place — pas question d'ascenseur.",
      explanationEn: "INCORRECT — The elevator is always forbidden during a fire. In confinement, you stay put — no elevator at all.",
    },
    {
      id: "mm7", label: "Ouvrir les fenêtres", labelEn: "Open the windows",
      isCorrect: false,
      explanation: "INCORRECT — Ouvrir les fenêtres peut attirer la fumée ou activer des courants d'air qui accélèrent l'incendie. Restez fenêtres fermées sauf signal des secours.",
      explanationEn: "INCORRECT — Opening windows can draw in smoke or create draughts that accelerate the fire. Keep windows closed unless signalled by rescuers.",
    },
    {
      id: "mm8", label: "Courir vers la sortie", labelEn: "Run to the exit",
      isCorrect: false,
      explanation: "INCORRECT — Courir vers la sortie sans évaluation est une erreur. Si l'évacuation est impossible, le confinement est la bonne réponse — pas la fuite aveugle.",
      explanationEn: "INCORRECT — Running to the exit without assessment is a mistake. If evacuation is impossible, confinement is the right answer — not blind flight.",
    },
  ],
};

// ── MIND MAP — ch2-m2 (Communication de crise) ───────────────
const ch2m2_mindmap: MindMapExercise = {
  type: "mindmap",
  title: "Carte mentale — Communiquer en crise",
  titleEn: "Mind Map — Crisis Communication",
  subtitle: "Sélectionnez les comportements d'une bonne communication d'urgence",
  subtitleEn: "Select the behaviours of effective emergency communication",
  centerLabel: "COMMUNIQUER\nEN CRISE",
  centerLabelEn: "CRISIS\nCOMMUNICATION",
  items: [
    {
      id: "cc1", label: "Voix calme et ferme", labelEn: "Calm and firm voice",
      isCorrect: true,
      explanation: "CORRECT — Une voix calme mais ferme réduit la panique et établit votre autorité naturelle sur le groupe.",
      explanationEn: "CORRECT — A calm but firm voice reduces panic and establishes your natural authority over the group.",
    },
    {
      id: "cc2", label: "Indiquer la direction", labelEn: "Point the direction",
      isCorrect: true,
      explanation: "CORRECT — Donner une direction précise ('par l'escalier B') évite les hésitations et les mouvements désordonnés.",
      explanationEn: "CORRECT — Giving a precise direction ('via stairwell B') prevents hesitation and disorderly movements.",
    },
    {
      id: "cc3", label: "Guider le groupe", labelEn: "Lead the group",
      isCorrect: true,
      explanation: "CORRECT — Prendre la tête de l'évacuation et marcher (pas courir) donne l'exemple et canalise le groupe.",
      explanationEn: "CORRECT — Leading the evacuation and walking (not running) sets the example and channels the group.",
    },
    {
      id: "cc4", label: "Compter les évacués", labelEn: "Count evacuees",
      isCorrect: true,
      explanation: "CORRECT — Compter les personnes en mouvement permet de détecter rapidement une absence et d'alerter les secours avec précision.",
      explanationEn: "CORRECT — Counting people on the move allows quick detection of an absence and precise alerting of rescuers.",
    },
    {
      id: "cc5", label: "Instructions courtes", labelEn: "Short instructions",
      isCorrect: true,
      explanation: "CORRECT — En situation de stress, le cerveau traite mieux des messages courts et directs. 'Suivez-moi maintenant' est plus efficace qu'une explication longue.",
      explanationEn: "CORRECT — In stressful situations, the brain processes short, direct messages better. 'Follow me now' is more effective than a long explanation.",
    },
    {
      id: "cc6", label: "Crier et paniquer", labelEn: "Shout and panic",
      isCorrect: false,
      explanation: "INCORRECT — Crier amplifie immédiatement la panique collective. La communication de crise exige de maîtriser son volume et son ton.",
      explanationEn: "INCORRECT — Shouting immediately amplifies collective panic. Crisis communication requires controlling your volume and tone.",
    },
    {
      id: "cc7", label: "Attendre les ordres", labelEn: "Wait for orders",
      isCorrect: false,
      explanation: "INCORRECT — Attendre des instructions supplémentaires retarde l'évacuation. L'alarme est l'ordre — agir immédiatement sans confirmation.",
      explanationEn: "INCORRECT — Waiting for additional instructions delays evacuation. The alarm IS the order — act immediately without confirmation.",
    },
    {
      id: "cc8", label: "Tout expliquer", labelEn: "Explain everything",
      isCorrect: false,
      explanation: "INCORRECT — Les explications longues en situation de crise paralysent. Les gens ont besoin d'actions concrètes, pas de contexte détaillé.",
      explanationEn: "INCORRECT — Long explanations in a crisis situation cause paralysis. People need concrete actions, not detailed context.",
    },
  ],
};

export const MODULE_INTERACTIONS: Record<string, AnyExercise[]> = {
  "ch1-m1": [m1_hotspot, m1_binary, m1_branching],
  "ch1-m2": [m2_flipcards, m2_dragdrop, m2_branching, m2_spinwheel],
  "ch1-m3": [m3_hotspot, m3_orderpuzzle, m3_branching, m3_mindmap],
  "ch1-m4": [m4_tipflip, m4_dragdrop, m4_matching],
  "ch1-m5": [m5_hotspot, m5_fillblank, m5_branching, m5_gridquiz],
  "ch1-m6": [m6_tipflip, m6_branching],
  "ch1-m7": [m7_seriousgame, m7_branching],
  "ch2-m1": [ch2m1_hotspot, ch2m1_binary],
  "ch2-m2": [ch2m2_flipcards, ch2m2_branching, ch2m2_mindmap],
  "ch2-m3": [ch2m3_tipflip, ch2m3_fillblank, ch2m3_dragdrop],
  "ch2-m4": [ch2m4_hotspot, ch2m4_spinwheel],
  "ch2-m5": [ch2m5_tipflip, ch2m5_branching],
  "ch2-m6": [ch2m6_matching, ch2m6_hotspot, ch2m6_gridquiz],
  "ch2-m7": [ch2m7_orderpuzzle, ch2m7_branching],
};
