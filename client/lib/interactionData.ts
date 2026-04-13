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
  titleEn?: string;
  subtitle?: string;
  subtitleEn?: string;
  sentences: Array<{ before: string; beforeEn?: string; answer: string; answerEn?: string; acceptableAnswers?: string[]; acceptableAnswersEn?: string[]; after?: string; afterEn?: string; hint?: string; hintEn?: string }>;
  successMessage?: string;
  successMessageEn?: string;
}

export interface MatchExercise {
  type: "matching";
  title: string;
  titleEn?: string;
  subtitle?: string;
  subtitleEn?: string;
  pairs: Array<{ left: string; leftEn?: string; right: string; rightEn?: string }>;
  successMessage?: string;
  successMessageEn?: string;
}

export interface FlipCardsExercise {
  type: "flipcards";
  title: string;
  titleEn?: string;
  subtitle?: string;
  subtitleEn?: string;
  cards: Array<{ front: string; frontEn?: string; back: string; backEn?: string; icon?: string; color?: string }>;
}

export interface OrderPuzzleExercise {
  type: "orderpuzzle";
  title: string;
  titleEn?: string;
  subtitle?: string;
  subtitleEn?: string;
  instruction: string;
  instructionEn?: string;
  pieces: Array<{ id: string; label: string; labelEn?: string; sublabel?: string; sublabelEn?: string; correctPosition: number }>;
  successMessage?: string;
  successMessageEn?: string;
}

export interface SeriousGameExercise {
  type: "seriousgame";
  title: string;
  titleEn?: string;
  subtitle?: string;
  subtitleEn?: string;
  rounds: Array<{
    image?: string;
    situation: string;
    situationEn?: string;
    actions: Array<{ label: string; labelEn?: string; correct: boolean; feedback: string; feedbackEn?: string }>;
    timeLimit: number;
  }>;
  successMessage?: string;
  successMessageEn?: string;
}

export interface TipFlipExercise {
  type: "tipflip";
  title: string;
  titleEn?: string;
  subtitle?: string;
  subtitleEn?: string;
  cards: Array<{
    icon: string;
    accent: "flame" | "clock" | "alert" | "shield" | "zap" | "eye";
    stat: string;
    label: string;
    labelEn?: string;
    category: "funfact" | "astuce" | "chiffre";
    tip: string;
    tipEn?: string;
    tipTitle?: string;
    tipTitleEn?: string;
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
      detail: "IBM : composez aussi le 777 pour prévenir la sécurité interne, avant le 18.",
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
  titleEn: "The 3 Emergency Reflexes",
  subtitle: "Débrancher · Alarme · Évacuer",
  subtitleEn: "Unplug · Alarm · Evacuate",
  startNode: "step1",
  successMessage: "Parfait — vous avez appliqué les 3 réflexes IBM dans le bon ordre",
  successMessageEn: "Perfect — you applied the 3 IBM reflexes in the right order",
  failMessage: "Un ou plusieurs réflexes étaient incorrects — revoyez la séquence et réessayez",
  failMessageEn: "One or more reflexes were incorrect — review the sequence and retry",
  nodes: {
    step1: {
      id: "step1",
      image: `${CDN}f70ab7cdd9114da8bfd5ad197221b46b?format=webp&width=800`,
      situation: "Réflexe 1 — Une multiprise prend feu sous un bureau. Les flammes sont visibles. Quelle est votre première action ?",
      situationEn: "Reflex 1 — A power strip catches fire under a desk. Flames are visible. What is your first action?",
      context: "Le feu est de petite taille. Un extincteur CO2 est à 5 mètres. La prise murale est accessible.",
      contextEn: "The fire is small. A CO2 extinguisher is 5 metres away. The wall socket is accessible.",
      urgency: "high",
      timed: 12,
      choices: [
        {
          label: "Je débranche la prise ou coupe le disjoncteur du local",
          labelEn: "I unplug the socket or cut the room's circuit breaker",
          consequence: "Correct. Supprimer l'alimentation électrique stoppe la source du feu. C'est le premier réflexe IBM face à un feu électrique.",
          consequenceEn: "Correct. Cutting the power supply stops the fire source. This is the first IBM reflex for an electrical fire.",
          consequenceType: "ok",
          nextNode: "step2",
          points: 10,
        },
        {
          label: "Je déclenche immédiatement l'alarme incendie",
          labelEn: "I immediately trigger the fire alarm",
          consequence: "L'alarme est importante, mais pas en premier. Sans couper l'alimentation, le feu électrique continue de se propager pendant que vous courez vers l'alarme.",
          consequenceEn: "The alarm is important, but not first. Without cutting the power, the electrical fire keeps spreading while you run to the alarm.",
          consequenceType: "ko",
          nextNode: "step2",
          points: 4,
        },
        {
          label: "Je verse de l'eau sur la multiprise pour éteindre",
          labelEn: "I pour water on the power strip to extinguish it",
          consequence: "Erreur critique. L'eau sur un feu électrique provoque un arc électrique et un risque d'électrocution immédiat. Jamais d'eau sur un feu électrique.",
          consequenceEn: "Critical error. Water on an electrical fire causes an electric arc and immediate electrocution risk. Never use water on an electrical fire.",
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
      situationEn: "Reflex 2 — The socket is unplugged. Traces of smoke remain. What is your second action?",
      context: "Le boîtier d'alarme FIRE — PULL DOWN est à 3 mètres sur le mur. L'open space compte 12 personnes.",
      contextEn: "The FIRE — PULL DOWN alarm box is 3 metres away on the wall. The open-plan office has 12 people.",
      urgency: "high",
      choices: [
        {
          label: "Je déclenche l'alarme et compose le 777 (sécurité IBM)",
          labelEn: "I trigger the alarm and dial 777 (IBM Security)",
          consequence: "Correct. L'alarme alerte tout le bâtiment. Le 777 prévient la sécurité IBM avant le 18 — c'est la procédure IBM.",
          consequenceEn: "Correct. The alarm alerts the entire building. 777 notifies IBM Security before 18 — that's the IBM procedure.",
          consequenceType: "ok",
          nextNode: "step3",
          points: 10,
        },
        {
          label: "Je préviens uniquement mes collègues à voix haute",
          labelEn: "I warn only my colleagues verbally",
          consequence: "Insuffisant. Prévenir oralement ne suffit pas — les autres étages ne sont pas alertés. L'alarme est obligatoire.",
          consequenceEn: "Insufficient. Warning verbally alone is not enough — other floors are not alerted. The alarm is mandatory.",
          consequenceType: "ko",
          nextNode: "step3",
          points: 3,
        },
        {
          label: "Je retourne vérifier si le feu est bien éteint",
          labelEn: "I go back to check if the fire is fully out",
          consequence: "Erreur. Un feu électrique peut reprendre. Votre priorité est d'alerter, pas de vérifier seul. Chaque seconde compte pour l'évacuation.",
          consequenceEn: "Error. An electrical fire can restart. Your priority is to alert, not verify alone. Every second counts for evacuation.",
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
      situationEn: "Reflex 3 — The alarm is triggered. What do you do now?",
      context: "Des collègues hésitent à partir. Certains veulent récupérer leurs affaires. La sortie de secours est à 15 mètres.",
      contextEn: "Some colleagues hesitate to leave. Some want to retrieve their belongings. The emergency exit is 15 metres away.",
      urgency: "high",
      choices: [
        {
          label: "J'évacue immédiatement par la sortie de secours sans prendre mes affaires",
          labelEn: "I evacuate immediately via the emergency exit without taking my belongings",
          consequence: "Correct. L'évacuation est immédiate et sans détour. Ne jamais retourner chercher des affaires personnelles une fois l'alarme déclenchée.",
          consequenceEn: "Correct. Evacuation is immediate and direct. Never go back for personal items once the alarm is triggered.",
          consequenceType: "ok",
          nextNode: "end",
          points: 10,
        },
        {
          label: "Je prends mon ordinateur et mes affaires avant de partir",
          labelEn: "I take my computer and belongings before leaving",
          consequence: "Erreur. Chaque seconde perdue à récupérer des affaires peut être fatale. Un ordinateur ne vaut pas une vie.",
          consequenceEn: "Error. Every second spent retrieving items can be fatal. A laptop is not worth a life.",
          consequenceType: "ko",
          nextNode: "end",
          points: 0,
        },
        {
          label: "J'attends que mes collègues se lèvent avant de partir avec eux",
          labelEn: "I wait for my colleagues to stand up before leaving with them",
          consequence: "Partiel. Encourager ses collègues est bien, mais ne pas attendre trop longtemps. Guidez-les vers la sortie sans attarder le groupe.",
          consequenceEn: "Partial. Encouraging colleagues is good, but don't wait too long. Guide them to the exit without delaying the group.",
          consequenceType: "ok",
          nextNode: "end",
          points: 7,
        },
      ],
    },
    end: {
      id: "end",
      situation: "Scénario terminé. Les 3 étapes ont été traversées.",
      situationEn: "Scenario complete. All 3 steps have been covered.",
      context: "Résultat basé sur la qualité de vos 3 décisions.",
      contextEn: "Result based on the quality of your 3 decisions.",
      urgency: "low",
      choices: [
        {
          label: "Voir mon résultat",
          labelEn: "View my result",
          consequence: "Vous avez complété le scénario des 3 réflexes IBM.",
          consequenceEn: "You completed the 3 IBM reflexes scenario.",
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
  instructionEn: "Match each extinguishing action to the correct element of the fire triangle",
  context: "Glissez chaque méthode d'extinction vers l'élément qu'elle neutralise dans le triangle du feu.",
  contextEn: "Drag each extinguishing method to the element it neutralises in the fire triangle.",
  successMessage: "Parfait — vous maîtrisez les mécanismes d'extinction !",
  successMessageEn: "Perfect — you have mastered the extinguishing mechanisms!",
  items: [
    { id: "i1", label: "Extincteur CO2", labelEn: "CO2 Extinguisher", sublabel: "Gaz inerte — asphyxie la flamme", sublabelEn: "Inert gas — smothers the flame", icon: "Wind", correctZone: "comburant" },
    { id: "i2", label: "Eau pulvérisée", labelEn: "Water mist", sublabel: "Abaisse la température", sublabelEn: "Lowers the temperature", icon: "Droplet", correctZone: "chaleur" },
    { id: "i3", label: "Éloigner les papiers", labelEn: "Remove papers", sublabel: "Supprime le combustible", sublabelEn: "Eliminates the fuel", icon: "FileText", correctZone: "combustible" },
    { id: "i4", label: "Couverture anti-feu", labelEn: "Fire blanket", sublabel: "Prive le feu d'oxygène", sublabelEn: "Deprives fire of oxygen", icon: "Layers", correctZone: "comburant" },
    { id: "i5", label: "Poudre ABC", labelEn: "ABC Powder", sublabel: "Stoppe la réaction chimique", sublabelEn: "Stops the chemical reaction", icon: "Package", correctZone: "comburant" },
    { id: "i6", label: "Débrancher l'appareil", labelEn: "Unplug the device", sublabel: "Coupe la source de chaleur", sublabelEn: "Cuts the heat source", icon: "Zap", correctZone: "chaleur" },
  ],
  zones: [
    {
      id: "combustible",
      label: "Combustible",
      labelEn: "Fuel",
      sublabel: "Ce qui brûle — retirer la matière",
      sublabelEn: "What burns — remove the material",
      color: "#b45309",
      bgColor: "rgba(180,83,9,0.06)",
      borderColor: "rgba(180,83,9,0.25)",
    },
    {
      id: "comburant",
      label: "Comburant (Oxygène)",
      labelEn: "Oxidiser (Oxygen)",
      sublabel: "Ce qui alimente — étouffer le feu",
      sublabelEn: "What feeds fire — smother it",
      color: "#0043ce",
      bgColor: "rgba(0,67,206,0.06)",
      borderColor: "rgba(0,67,206,0.25)",
    },
    {
      id: "chaleur",
      label: "Énergie / Chaleur",
      labelEn: "Energy / Heat",
      sublabel: "Ce qui enflamme — refroidir",
      sublabelEn: "What ignites — cool it down",
      color: "#da1e28",
      bgColor: "rgba(218,30,40,0.06)",
      borderColor: "rgba(218,30,40,0.25)",
    },
  ],
};

const m2_branching: BranchingExercise = {
  type: "branching",
  title: "Feu de poubelle — Quel élément supprimer ?",
  titleEn: "Bin fire — Which element to eliminate?",
  startNode: "start",
  successMessage: "Vous avez identifié correctement comment casser la combustion",
  successMessageEn: "You correctly identified how to break the combustion",
  nodes: {
    start: {
      id: "start",
      image: `${CDN}fe758a5b35224b1bae42de1253d3aa38?format=webp&width=800`,
      situation: "Une poubelle prend feu dans la salle de reprographie. Les flammes sont à mi-hauteur de la corbeille.",
      situationEn: "A bin catches fire in the reprographics room. Flames reach mid-height of the basket.",
      context: "Il y a du papier, un extincteur CO2, et une fenêtre ouverte à proximité.",
      contextEn: "There is paper nearby, a CO2 extinguisher, and an open window.",
      urgency: "medium",
      choices: [
        {
          label: "Fermer la fenêtre pour réduire l'oxygène, puis utiliser le CO2",
          labelEn: "Close the window to reduce oxygen, then use the CO2",
          consequence: "Excellent raisonnement. Réduire l'apport en oxygène (comburant) avant d'utiliser le CO2 maximise l'efficacité de l'extinction.",
          consequenceEn: "Excellent reasoning. Reducing the oxygen supply (oxidiser) before using CO2 maximises extinguishing effectiveness.",
          consequenceType: "ok",
          points: 10,
        },
        {
          label: "Utiliser directement l'extincteur CO2 sur les flammes",
          labelEn: "Use the CO2 extinguisher directly on the flames",
          consequence: "Bonne action. Le CO2 prive le feu d'oxygène (comburant). Le résultat est efficace même sans fermer la fenêtre.",
          consequenceEn: "Good action. CO2 deprives the fire of oxygen (oxidiser). The result is effective even without closing the window.",
          consequenceType: "ok",
          points: 8,
        },
        {
          label: "Retirer le papier qui brûle avec les mains",
          labelEn: "Remove the burning paper with bare hands",
          consequence: "Très dangereux. Manipuler des matériaux en feu sans protection entraîne des brûlures graves.",
          consequenceEn: "Very dangerous. Handling burning materials without protection causes severe burns.",
          consequenceType: "critical",
          points: 0,
        },
        {
          label: "Souffler fort sur le feu",
          labelEn: "Blow hard on the fire",
          consequence: "Erreur grave. Souffler apporte de l'oxygène — c'est l'inverse de ce qu'il faut faire. Le feu s'intensifie.",
          consequenceEn: "Serious error. Blowing adds oxygen — the opposite of what is needed. The fire intensifies.",
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
  instructionEn: "Identify the factors that accelerate spread in this corridor",
  context: "Analysez la scène. Quels éléments aggravent la situation ? Lesquels la ralentissent ?",
  contextEn: "Analyse the scene. Which elements worsen the situation? Which slow it down?",
  image: `${CDN}3ddd3eb23b1b49dfb9e5dc04128a8ec0?format=webp&width=800`,
  successMessage: "Analyse complète — vous comprenez les mécanismes de propagation",
  successMessageEn: "Full analysis — you understand the propagation mechanisms",
  hotspots: [
    {
      id: "h1", x: 72, y: 58,
      label: "Foyer principal — équipement en feu",
      labelEn: "Main fire source — equipment on fire",
      description: "L'équipement électrique en surchauffe est la source du départ de feu. La chaleur rayonnante et les flammes propagent le feu aux matériaux voisins.",
      descriptionEn: "The overheating electrical equipment is the fire source. Radiant heat and flames spread the fire to neighbouring materials.",
      type: "danger",
      detail: "Un équipement qui chauffe anormalement doit être signalé immédiatement",
      detailEn: "Abnormally hot equipment must be reported immediately",
    },
    {
      id: "h2", x: 50, y: 20,
      label: "Fumée dense en hauteur",
      labelEn: "Dense smoke at ceiling height",
      description: "La fumée noire monte vers le plafond et se propage dans le couloir. Elle réduit la visibilité et indique la direction du feu. L'air respirable est au ras du sol.",
      descriptionEn: "Black smoke rises to the ceiling and spreads through the corridor. It reduces visibility and indicates the fire direction. Breathable air is at floor level.",
      type: "danger",
      detail: "En cas de fumée dense : se baisser et longer les murs jusqu'à la sortie",
      detailEn: "In dense smoke: crouch and keep to the walls to the exit",
    },
    {
      id: "h3", x: 12, y: 44,
      label: "Déclencheur d'alarme manuel",
      labelEn: "Manual alarm trigger",
      description: "Le déclencheur est visible et accessible sur le mur. L'activer immédiatement alerte tout le bâtiment et déclenche l'évacuation générale.",
      descriptionEn: "The trigger is visible and accessible on the wall. Activating it immediately alerts the entire building and triggers general evacuation.",
      type: "safe",
      detail: "Distance maximale réglementaire : 30m entre deux déclencheurs",
      detailEn: "Regulatory maximum distance: 30m between two triggers",
    },
    {
      id: "h4", x: 22, y: 68,
      label: "Extincteur CO2",
      labelEn: "CO2 extinguisher",
      description: "Un extincteur est fixé au mur, accessible rapidement. Adapté aux feux électriques (classe E). À utiliser uniquement si le feu est maîtrisable et la sortie derrière soi.",
      descriptionEn: "An extinguisher is fixed to the wall, quickly accessible. Suitable for electrical fires (class E). Use only if the fire is manageable and the exit is behind you.",
      type: "info",
      detail: "Ne jamais s'interposer entre le feu et la sortie lors de l'utilisation",
      detailEn: "Never position yourself between the fire and the exit when using it",
    },
  ],
};

const m3_branching: BranchingExercise = {
  type: "branching",
  title: "Propagation — Vos choix ont des conséquences",
  titleEn: "Propagation — Your choices have consequences",
  startNode: "corridor",
  successMessage: "Vous avez limité la propagation par vos bonnes décisions",
  successMessageEn: "You limited propagation with your good decisions",
  failMessage: "Vos actions ont accéléré la propagation — chaque geste compte",
  failMessageEn: "Your actions accelerated propagation — every gesture counts",
  nodes: {
    corridor: {
      id: "corridor",
      image: `${CDN}26706b11880d4b55b61df8e668695b14?format=webp&width=800`,
      situation: "Fumée dans le couloir. Vous venez de quitter votre bureau. La porte est encore ouverte derrière vous.",
      situationEn: "Smoke in the corridor. You just left your office. The door is still open behind you.",
      context: "Vous êtes à 3 mètres de la porte ouverte. Des collègues arrivent de l'autre côté du couloir.",
      contextEn: "You are 3 metres from the open door. Colleagues are approaching from the other side of the corridor.",
      urgency: "high",
      timed: 12,
      choices: [
        {
          label: "Je retourne fermer la porte de mon bureau",
          labelEn: "I go back and close my office door",
          consequence: "Très bien. 3 secondes pour fermer = potentiellement 30 minutes de résistance au feu supplémentaires. La propagation est ralentie.",
          consequenceEn: "Well done. 3 seconds to close = potentially 30 extra minutes of fire resistance. Spread is slowed.",
          consequenceType: "ok",
          nextNode: "alarm",
          points: 10,
        },
        {
          label: "Je laisse la porte ouverte et j'évacue vite",
          labelEn: "I leave the door open and evacuate quickly",
          consequence: "Erreur. La porte ouverte agit comme un couloir à feu — la propagation s'accélère immédiatement vers les pièces adjacentes.",
          consequenceEn: "Error. An open door acts as a fire corridor — spread accelerates immediately to adjacent rooms.",
          consequenceType: "ko",
          nextNode: "alarm",
          points: 3,
        },
        {
          label: "Je retourne dans mon bureau chercher mes affaires",
          labelEn: "I go back into my office to get my belongings",
          consequence: "Erreur critique. Les affaires n'ont aucune valeur face à votre sécurité. Vous perdez un temps précieux en zone dangereuse.",
          consequenceEn: "Critical error. Belongings have no value compared to your safety. You waste precious time in a danger zone.",
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
      situationEn: "The alarm has not sounded yet. Walking past a manual call point, you realise nobody has activated it.",
      urgency: "high",
      choices: [
        {
          label: "Je déclenche l'alarme manuelle immédiatement",
          labelEn: "I trigger the manual alarm immediately",
          consequence: "Excellent. Toutes les personnes du bâtiment sont alertées. L'évacuation peut commencer dans les meilleures conditions.",
          consequenceEn: "Excellent. All people in the building are alerted. Evacuation can begin under the best conditions.",
          consequenceType: "ok",
          nextNode: "evacuation",
          points: 10,
        },
        {
          label: "Je continue d'évacuer sans déclencher — quelqu'un d'autre le fera",
          labelEn: "I continue evacuating without triggering — someone else will do it",
          consequence: "Décision insuffisante. Chaque seconde sans alarme = des personnes non alertées. La propagation gagne du terrain.",
          consequenceEn: "Insufficient decision. Every second without an alarm means unalerted people. Spread gains ground.",
          consequenceType: "ko",
          nextNode: "evacuation",
          points: 2,
        },
      ],
    },
    evacuation: {
      id: "evacuation",
      situation: "Fin du scénario de propagation.",
      situationEn: "End of the propagation scenario.",
      context: "Vos décisions ont directement influencé la vitesse de propagation et la sécurité de vos collègues.",
      contextEn: "Your decisions directly influenced the speed of spread and your colleagues' safety.",
      urgency: "low",
      choices: [
        {
          label: "Consulter le bilan de mes décisions",
          labelEn: "Review my decisions",
          consequence: "La somme de chaque micro-décision détermine l'issue d'un incendie.",
          consequenceEn: "The sum of each micro-decision determines the outcome of a fire.",
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
  instructionEn: "Match each object or situation to its correct fire class",
  context: "Dans vos locaux IBM, identifiez correctement la nature du feu pour choisir le bon extincteur.",
  contextEn: "In your IBM premises, correctly identify the nature of the fire to choose the right extinguisher.",
  successMessage: "Excellent — vous savez identifier les classes de feu dans votre environnement de travail !",
  successMessageEn: "Excellent — you can identify fire classes in your work environment!",
  items: [
    { id: "i1", label: "Papier / documents", labelEn: "Paper / documents", sublabel: "Matière solide combustible", sublabelEn: "Solid combustible material", icon: "FileText", correctZone: "A" },
    { id: "i2", label: "Rack serveur sous tension", labelEn: "Server rack under power", sublabel: "Équipement électrique actif", sublabelEn: "Active electrical equipment", icon: "Server", correctZone: "elec" },
    { id: "i3", label: "Alcool désinfectant", labelEn: "Disinfectant alcohol", sublabel: "Liquide inflammable", sublabelEn: "Flammable liquid", icon: "Droplet", correctZone: "B" },
    { id: "i4", label: "Mobilier de bureau", labelEn: "Office furniture", sublabel: "Solide organique", sublabelEn: "Organic solid", icon: "Armchair", correctZone: "A" },
    { id: "i5", label: "Câbles électriques", labelEn: "Electric cables", sublabel: "Conducteurs sous tension", sublabelEn: "Conductors under power", icon: "Zap", correctZone: "elec" },
    { id: "i6", label: "Solvant de nettoyage", labelEn: "Cleaning solvent", sublabel: "Liquide chimique inflammable", sublabelEn: "Flammable chemical liquid", icon: "FlaskConical", correctZone: "B" },
    { id: "i7", label: "Huile machine / cuisine", labelEn: "Machine / cooking oil", sublabel: "Corps gras à haute température", sublabelEn: "Fatty substance at high temperature", icon: "Flame", correctZone: "F" },
    { id: "i8", label: "Chargeur de laptop", labelEn: "Laptop charger", sublabel: "Alimentation électrique", sublabelEn: "Electrical power supply", icon: "Laptop", correctZone: "elec" },
  ],
  zones: [
    {
      id: "A",
      label: "Classe A — Solides",
      labelEn: "Class A — Solids",
      sublabel: "Extincteur eau / mousse",
      sublabelEn: "Water / foam extinguisher",
      description: "Bois, papier, tissu, plastique. Ce sont les matières ordinaires qui brûlent en laissant des braises.",
      descriptionEn: "Wood, paper, fabric, plastic. These are ordinary materials that burn leaving embers.",
      color: "#b45309",
      bgColor: "rgba(180,83,9,0.06)",
      borderColor: "rgba(180,83,9,0.25)",
    },
    {
      id: "B",
      label: "Classe B — Liquides inflammables",
      labelEn: "Class B — Flammable liquids",
      sublabel: "Extincteur CO2 / poudre ABC",
      sublabelEn: "CO2 / ABC powder extinguisher",
      description: "Hydrocarbures, solvants, alcools. Brûlent en surface — ne jamais utiliser d'eau (projections).",
      descriptionEn: "Hydrocarbons, solvents, alcohols. Burn on the surface — never use water (splashing).",
      color: "#7c3aed",
      bgColor: "rgba(124,58,237,0.06)",
      borderColor: "rgba(124,58,237,0.25)",
    },
    {
      id: "elec",
      label: "Feu électrique",
      labelEn: "Electrical fire",
      sublabel: "CO2 uniquement — jamais d'eau",
      sublabelEn: "CO2 only — never water",
      description: "L'eau conduit l'électricité : risque d'électrocution. Couper l'alimentation en priorité, puis CO2.",
      descriptionEn: "Water conducts electricity: electrocution risk. Cut the power first, then CO2.",
      color: "#0043ce",
      bgColor: "rgba(0,67,206,0.06)",
      borderColor: "rgba(0,67,206,0.25)",
    },
    {
      id: "F",
      label: "Classe F — Huiles / graisses",
      labelEn: "Class F — Oils / fats",
      sublabel: "Extincteur classe F uniquement",
      sublabelEn: "Class F extinguisher only",
      description: "Huiles de cuisson à très haute température. L'eau provoque une explosion de vapeur brûlante.",
      descriptionEn: "Cooking oils at very high temperatures. Water causes a steam explosion.",
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
  instructionEn: "Identify the components of an extinguisher and the PASS steps",
  context: "Cliquez sur chaque partie de l'extincteur pour comprendre son fonctionnement.",
  contextEn: "Click on each part of the extinguisher to understand how it works.",
  image: `${CDN}d4ef7263a40e4131aa5b3ad9448e2ca5?format=webp&width=800`,
  successMessage: "Vous connaissez votre extincteur — prêt pour une utilisation en situation réelle",
  successMessageEn: "You know your extinguisher — ready for real-life use",
  hotspots: [
    {
      id: "h1", x: 52, y: 8,
      label: "P — Pull (Tirer la goupille)",
      labelEn: "P — Pull (Remove the pin)",
      description: "La goupille de sécurité empêche l'activation accidentelle. Tirez-la d'un mouvement sec. C'est toujours la PREMIÈRE étape PASS.",
      descriptionEn: "The safety pin prevents accidental activation. Pull it with a sharp movement. Always the FIRST step of PASS.",
      type: "info",
      detail: "Sans retirer la goupille, l'extincteur ne s'active pas",
      detailEn: "Without removing the pin, the extinguisher cannot activate",
    },
    {
      id: "h2", x: 68, y: 30,
      label: "S — Squeeze (Presser la poignée)",
      labelEn: "S — Squeeze (Press the handle)",
      description: "Appuyez fermement sur la poignée de déclenchement. Maintenez une pression continue pour un jet régulier. Durée : 8 à 12 secondes.",
      descriptionEn: "Press firmly on the trigger handle. Maintain continuous pressure for a steady jet. Duration: 8 to 12 seconds.",
      type: "info",
      detail: "Durée de décharge d'un CO2 : 8 à 12 secondes",
      detailEn: "CO2 discharge duration: 8 to 12 seconds",
    },
    {
      id: "h3", x: 18, y: 65,
      label: "A+S — Viser & Balayer",
      labelEn: "A+S — Aim & Sweep",
      description: "Visez la BASE des flammes (jamais le haut). Balayez de gauche à droite en continu. Distance optimale : 2 à 3 mètres. Si le feu ne recule pas en 30s, évacuez.",
      descriptionEn: "Aim at the BASE of the flames (never upward). Sweep side to side continuously. Optimal distance: 2 to 3 metres. If fire doesn't retreat in 30s, evacuate.",
      type: "safe",
      detail: "Toujours viser la base — jamais les flammes ni la fumée",
      detailEn: "Always aim at the base — never at flames or smoke",
    },
  ],
};

const m5_branching: BranchingExercise = {
  type: "branching",
  title: "Utilisation PASS — Scénario réel",
  titleEn: "PASS Usage — Real Scenario",
  startNode: "start",
  successMessage: "Maîtrise de l'extincteur validée — séquence PASS appliquée correctement",
  successMessageEn: "Extinguisher mastery validated — PASS sequence applied correctly",
  nodes: {
    start: {
      id: "start",
      image: `${CDN}65b652843ba640ae94a5ffd9b614c5b0?format=webp&width=800`,
      situation: "Feu de câbles sur un bureau. Vous avez un extincteur CO2. Le feu est petit. La sortie est à 4 mètres derrière vous.",
      situationEn: "Cable fire on a desk. You have a CO2 extinguisher. The fire is small. The exit is 4 metres behind you.",
      urgency: "high",
      timed: 15,
      choices: [
        {
          label: "Je me positionne face au feu, sortie dans le dos, à 2-3m",
          labelEn: "I position myself facing the fire, exit at my back, at 2-3m",
          consequence: "Position correcte. Sortie dans le dos = possibilité de retraite. Distance de 2-3m = efficacité maximale sans risque de brûlure.",
          consequenceEn: "Correct position. Exit at your back = ability to retreat. 2-3m distance = maximum effectiveness without burn risk.",
          consequenceType: "ok",
          nextNode: "pass",
          points: 10,
        },
        {
          label: "Je m'approche le plus possible pour un meilleur jet",
          labelEn: "I get as close as possible for a better jet",
          consequence: "Erreur. S'approcher trop près expose aux flammes et à la chaleur. La position correcte est à 2-3 mètres.",
          consequenceEn: "Error. Getting too close exposes you to flames and heat. The correct position is 2-3 metres.",
          consequenceType: "ko",
          nextNode: "pass",
          points: 3,
        },
        {
          label: "Je lance l'extincteur vers le feu et je cours",
          labelEn: "I throw the extinguisher towards the fire and run",
          consequence: "Erreur critique. Un extincteur lancé n'éteint pas le feu et peut blesser des personnes. Il faut toujours tenir l'extincteur.",
          consequenceEn: "Critical error. A thrown extinguisher doesn't put out the fire and can injure people. Always hold the extinguisher.",
          consequenceType: "critical",
          points: 0,
        },
      ],
    },
    pass: {
      id: "pass",
      situation: "Vous êtes en position. Première étape PASS — P comme Pull.",
      situationEn: "You are in position. First PASS step — P for Pull.",
      urgency: "high",
      choices: [
        {
          label: "Je tire la goupille de sécurité d'un geste sec",
          labelEn: "I pull the safety pin with a sharp pull",
          consequence: "Parfait. La goupille est retirée — l'extincteur est maintenant opérationnel. Passez à l'étape suivante.",
          consequenceEn: "Perfect. Pin removed — the extinguisher is now operational. Move to the next step.",
          consequenceType: "ok",
          nextNode: "aim",
          points: 10,
        },
        {
          label: "J'appuie directement sur la poignée sans retirer la goupille",
          labelEn: "I press the handle directly without removing the pin",
          consequence: "Erreur. Sans retirer la goupille, l'extincteur ne peut pas s'activer. Précieuses secondes perdues.",
          consequenceEn: "Error. Without removing the pin, the extinguisher cannot activate. Precious seconds wasted.",
          consequenceType: "ko",
          nextNode: "aim",
          points: 0,
        },
      ],
    },
    aim: {
      id: "aim",
      situation: "Goupille retirée. Où pointez-vous le tuyau ?",
      situationEn: "Pin removed. Where do you aim the nozzle?",
      urgency: "high",
      choices: [
        {
          label: "Je vise la base des flammes — là où le feu rencontre le combustible",
          labelEn: "I aim at the base of the flames — where fire meets fuel",
          consequence: "Exact. C'est à la base que se coupe la combustion. Le jet de CO2 prive le feu d'oxygène à sa source.",
          consequenceEn: "Correct. At the base is where combustion is interrupted. The CO2 jet deprives the fire of oxygen at its source.",
          consequenceType: "ok",
          nextNode: "sweep",
          points: 10,
        },
        {
          label: "Je vise le haut des flammes pour les couvrir de CO2",
          labelEn: "I aim at the top of the flames to cover them with CO2",
          consequence: "Erreur. Viser le haut des flammes n'atteint pas la source de combustion. Le feu continue de brûler à sa base.",
          consequenceEn: "Error. Aiming at the top of the flames doesn't reach the source of combustion. The fire keeps burning at its base.",
          consequenceType: "ko",
          nextNode: "sweep",
          points: 2,
        },
        {
          label: "Je vise la fumée pour la dissiper",
          labelEn: "I aim at the smoke to disperse it",
          consequence: "Erreur. La fumée n'est pas le feu. Viser la fumée gaspille l'agent extincteur (8-12 secondes seulement disponibles).",
          consequenceEn: "Error. Smoke is not the fire. Aiming at smoke wastes the extinguishing agent (only 8-12 seconds available).",
          consequenceType: "ko",
          nextNode: "sweep",
          points: 0,
        },
      ],
    },
    sweep: {
      id: "sweep",
      situation: "Le jet est actif. Comment appliquez-vous l'agent extincteur ?",
      situationEn: "The jet is active. How do you apply the extinguishing agent?",
      urgency: "medium",
      choices: [
        {
          label: "Je balaie de gauche à droite à la base, de façon régulière",
          labelEn: "I sweep left to right at the base, in a steady motion",
          consequence: "Parfait. Le balayage latéral à la base couvre toute la surface de combustion. Le feu recule progressivement.",
          consequenceEn: "Perfect. Lateral sweeping at the base covers the entire combustion surface. The fire retreats progressively.",
          consequenceType: "ok",
          points: 10,
        },
        {
          label: "Je fixe un point central pour concentrer le jet",
          labelEn: "I fix on a central point to concentrate the jet",
          consequence: "Insuffisant. Un point fixe ne couvre pas toute la surface de combustion. Les bords continuent de brûler.",
          consequenceEn: "Insufficient. A fixed point doesn't cover the entire combustion surface. Edges continue to burn.",
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
  titleEn: "Intervene or Evacuate — Decision Tree",
  startNode: "assess",
  successMessage: "Excellentes décisions — vous avez su évaluer la situation et agir correctement",
  successMessageEn: "Excellent decisions — you assessed the situation and acted correctly",
  failMessage: "Certaines décisions vous ont mis en danger — la prudence est toujours prioritaire",
  failMessageEn: "Some decisions put you in danger — caution is always the priority",
  nodes: {
    assess: {
      id: "assess",
      image: `${CDN}8e074d1b7bdf4b8fa872d5fd2451fbfe?format=webp&width=800`,
      situation: "Alarme déclenchée. Vous arrivez dans un couloir avec de la fumée. Un extincteur CO2 est à portée.",
      situationEn: "Alarm triggered. You enter a corridor with smoke. A CO2 extinguisher is within reach.",
      context: "Évaluez la situation avant d'agir.",
      contextEn: "Evaluate the situation before acting.",
      urgency: "high",
      choices: [
        {
          label: "J'évalue : taille du feu, fumée, sortie disponible, avant d'agir",
          labelEn: "I assess: fire size, smoke, available exit, before acting",
          consequence: "Bonne pratique. Evaluer 5 secondes évite les mauvaises décisions. Vous observez : fumée légère, petite flamme visible, sortie dégagée.",
          consequenceEn: "Good practice. A 5-second assessment prevents bad decisions. You observe: light smoke, small visible flame, clear exit.",
          consequenceType: "ok",
          nextNode: "small_fire",
          points: 10,
        },
        {
          label: "J'attrape l'extincteur et je charge vers le feu sans évaluer",
          labelEn: "I grab the extinguisher and charge towards the fire without assessing",
          consequence: "Dangereux. Sans évaluation, vous risquez d'intervenir sur un feu trop développé ou de type incompatible.",
          consequenceEn: "Dangerous. Without assessment, you risk intervening on an overly developed or incompatible fire type.",
          consequenceType: "ko",
          nextNode: "small_fire",
          points: 2,
        },
        {
          label: "J'évacue immédiatement sans évaluer",
          labelEn: "I evacuate immediately without assessing",
          consequence: "Décision de sécurité acceptable, mais l'évaluation rapide permet de décider plus intelligemment.",
          consequenceEn: "Acceptable safety decision, but a quick assessment allows for smarter decision-making.",
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
      situationEn: "Small electrical fire in the server room. Light smoke. CO2 extinguisher available. Clear exit 5m away.",
      context: "Toutes les conditions pour une intervention semblent réunies.",
      contextEn: "All conditions for intervention seem to be met.",
      urgency: "high",
      choices: [
        {
          label: "J'interviens — feu petit, CO2 adapté, sortie libre, je suis formé",
          labelEn: "I intervene — small fire, CO2 suitable, exit clear, I am trained",
          consequence: "Décision correcte. Toutes les conditions sont réunies : petit feu, bon agent extincteur, sortie dégagée. Vous maîtrisez le foyer.",
          consequenceEn: "Correct decision. All conditions are met: small fire, right agent, clear exit. You control the fire.",
          consequenceType: "ok",
          nextNode: "door_hot",
          points: 10,
        },
        {
          label: "J'ouvre la porte de la salle serveur pour évaluer de plus près",
          labelEn: "I open the server room door to assess more closely",
          consequence: "Attention. Ouvrir la porte peut apporter de l'oxygène et intensifier le feu. Toujours évaluer sans ouvrir si possible.",
          consequenceEn: "Caution. Opening the door can supply oxygen and intensify the fire. Always assess without opening if possible.",
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
      situationEn: "New sector. A door is hot to the touch. Black smoke seeps under it.",
      urgency: "high",
      choices: [
        {
          label: "Je n'ouvre pas — feu développé derrière. Je recule et évacue.",
          labelEn: "I don't open it — developed fire behind. I retreat and evacuate.",
          consequence: "Décision vitale. Porte chaude + fumée noire = feu développé. Ouvrir = aspirer le feu vers vous. Retraite immédiate.",
          consequenceEn: "Vital decision. Hot door + black smoke = developed fire. Opening = drawing fire towards you. Immediate retreat.",
          consequenceType: "ok",
          nextNode: "evacuation_end",
          points: 10,
        },
        {
          label: "J'ouvre doucement pour éteindre avec mon CO2",
          labelEn: "I open it gently to extinguish with my CO2",
          consequence: "Erreur potentiellement fatale. La différence de pression aspire le feu vers vous au moment de l'ouverture.",
          consequenceEn: "Potentially fatal error. The pressure difference draws fire towards you when opening.",
          consequenceType: "critical",
          nextNode: "evacuation_end",
          points: 0,
        },
        {
          label: "J'arrose le bas de la porte avec le CO2",
          labelEn: "I spray the bottom of the door with CO2",
          consequence: "Erreur. Le CO2 ne traverse pas la porte et refroidit uniquement la surface extérieure. Le feu continue de l'autre côté.",
          consequenceEn: "Error. CO2 doesn't pass through the door and only cools the outer surface. The fire continues on the other side.",
          consequenceType: "ko",
          nextNode: "evacuation_end",
          points: 1,
        },
      ],
    },
    evacuation_end: {
      id: "evacuation_end",
      situation: "Fin de l'exercice de décision. Vous avez traversé différents scénarios d'intervention.",
      situationEn: "End of the decision exercise. You have navigated different intervention scenarios.",
      urgency: "low",
      choices: [
        {
          label: "Valider mes décisions et voir le bilan",
          labelEn: "Validate my decisions and view the results",
          consequence: "La règle d'or : quand le doute existe, toujours évacuer. Intervenir uniquement si toutes les conditions sont réunies.",
          consequenceEn: "The golden rule: when in doubt, always evacuate. Intervene only when all conditions are met.",
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
  titleEn: "Full Simulation — Chapter 1",
  subtitle: "Score Réflexes Incendie",
  subtitleEn: "Fire Reflexes Score",
  startNode: "alarm_rings",
  successMessage: "Score Réflexes Incendie — Niveau Expert. Tous les bons réflexes acquis.",
  successMessageEn: "Fire Reflexes Score — Expert Level. All the right reflexes acquired.",
  failMessage: "Des décisions à améliorer. La simulation permet de progresser sans risque.",
  failMessageEn: "Decisions to improve. The simulation lets you progress without risk.",
  nodes: {
    alarm_rings: {
      id: "alarm_rings",
      image: `${CDN}dfd2975e7d864d029e522928a710aa05?format=webp&width=800`,
      situation: "14h30. L'alarme retentit. Fumée légère dans le couloir. Vous êtes au 3e étage.",
      situationEn: "2:30 PM. The alarm sounds. Light smoke in the corridor. You are on the 3rd floor.",
      context: "Plusieurs collègues regardent autour d'eux, hésitants. Un extincteur CO2 est visible à 3 mètres.",
      contextEn: "Several colleagues look around, hesitant. A CO2 extinguisher is visible 3 metres away.",
      urgency: "high",
      timed: 8,
      choices: [
        {
          label: "Évaluer rapidement et guider mes collègues vers la sortie",
          labelEn: "Quickly assess and guide my colleagues towards the exit",
          consequence: "Parfait. Leadership dans la crise. Vos collègues vous suivent calmement vers l'escalier.",
          consequenceEn: "Perfect. Leadership in the crisis. Your colleagues calmly follow you to the stairwell.",
          consequenceType: "ok",
          nextNode: "close_door",
          points: 10,
        },
        {
          label: "Prendre l'extincteur et chercher le foyer seul",
          labelEn: "Take the extinguisher and search for the fire source alone",
          consequence: "Risqué sans évaluation préalable. Vous vous isolez du groupe. Vos collègues paniquent sans guidance.",
          consequenceEn: "Risky without prior assessment. You isolate yourself from the group. Your colleagues panic without guidance.",
          consequenceType: "ko",
          nextNode: "close_door",
          points: 4,
        },
        {
          label: "Attendre les instructions du responsable de sécurité",
          labelEn: "Wait for instructions from the security manager",
          consequence: "Trop passif. Le responsable peut ne pas être disponible. Chacun doit être capable d'initier l'évacuation.",
          consequenceEn: "Too passive. The manager may not be available. Everyone must be able to initiate evacuation.",
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
      situationEn: "You leave the open-plan area. The door is still open behind you.",
      urgency: "high",
      timed: 6,
      choices: [
        {
          label: "Je ferme la porte derrière moi avant d'avancer",
          labelEn: "I close the door behind me before moving on",
          consequence: "Réflexe essentiel. Porte fermée = 30 minutes de résistance supplémentaires au feu.",
          consequenceEn: "Essential reflex. Closed door = 30 extra minutes of fire resistance.",
          consequenceType: "ok",
          nextNode: "smoke_corridor",
          points: 10,
        },
        {
          label: "Trop urgent — je continue sans fermer",
          labelEn: "Too urgent — I continue without closing",
          consequence: "Erreur. 3 secondes pour fermer = potentiellement des vies sauvées. C'est toujours la bonne décision.",
          consequenceEn: "Error. 3 seconds to close = potentially lives saved. It's always the right decision.",
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
      situationEn: "In the stairwell, you encounter smoke at mid-height.",
      context: "La sortie est en bas, à 2 étages. La fumée monte lentement.",
      contextEn: "The exit is two floors below. Smoke rises slowly.",
      urgency: "high",
      choices: [
        {
          label: "Je me baisse sous la fumée et descends rapidement en longeant la rampe",
          labelEn: "I crouch under the smoke and descend quickly keeping close to the handrail",
          consequence: "Réflexe parfait. L'air respirable est en bas. Vous descendez en sécurité.",
          consequenceEn: "Perfect reflex. Breathable air is below. You descend safely.",
          consequenceType: "ok",
          nextNode: "assembly_point",
          points: 10,
        },
        {
          label: "Je remonte pour trouver un autre escalier",
          labelEn: "I go back up to find another stairwell",
          consequence: "Décision risquée. Remonter vous éloigne de la sortie et vous expose davantage à la fumée.",
          consequenceEn: "Risky decision. Going up takes you away from the exit and exposes you further to smoke.",
          consequenceType: "ko",
          nextNode: "assembly_point",
          points: 3,
        },
        {
          label: "Je cours en restant debout — plus vite c'est mieux",
          labelEn: "I run upright — the faster the better",
          consequence: "Dangereux. Debout dans la fumée = inhalation de gaz toxiques. Se baisser est impératif.",
          consequenceEn: "Dangerous. Standing in smoke = inhaling toxic gases. Crouching is mandatory.",
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
      situationEn: "You are at the assembly point. Some colleagues are missing.",
      urgency: "medium",
      choices: [
        {
          label: "Je signale immédiatement les absents au responsable d'évacuation",
          labelEn: "I immediately report the absent colleagues to the evacuation coordinator",
          consequence: "Crucial. Les secours ont besoin de savoir qui manque pour orienter leur intervention.",
          consequenceEn: "Crucial. Emergency services need to know who is missing to direct their response.",
          consequenceType: "ok",
          points: 10,
        },
        {
          label: "Je retourne chercher mes collègues manquants moi-même",
          labelEn: "I go back to look for my missing colleagues myself",
          consequence: "Dangereux. Retourner dans un bâtiment en feu sans équipement adapté met votre vie en danger.",
          consequenceEn: "Dangerous. Re-entering a burning building without proper equipment risks your life.",
          consequenceType: "critical",
          points: 0,
        },
        {
          label: "J'attends — les secours sauront ce qu'ils font",
          labelEn: "I wait — the emergency services will know what to do",
          consequence: "Insuffisant. L'information sur les personnes manquantes est vitale et doit être communiquée activement.",
          consequenceEn: "Insufficient. Information about missing persons is vital and must be communicated actively.",
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
  titleEn: "Good Communication / Bad Communication",
  startNode: "panic_situation",
  successMessage: "Communication de crise maîtrisée — calme et efficacité",
  successMessageEn: "Crisis communication mastered — calm and effective",
  failMessage: "Votre communication a généré de la panique — reformulez avec calme et précision",
  failMessageEn: "Your communication generated panic — rephrase calmly and precisely",
  nodes: {
    panic_situation: {
      id: "panic_situation",
      image: `${CDN}73ee73f4c5c54adb943d454c10b797a9?format=webp&width=800`,
      situation: "L'alarme sonne. 12 collègues autour de vous commencent à paniquer. Certains courent dans tous les sens.",
      situationEn: "The alarm sounds. 12 colleagues around you start to panic. Some run in all directions.",
      context: "Vous avez la présence d'esprit pour guider la situation. Quelle est votre réaction ?",
      contextEn: "You have the presence of mind to guide the situation. What is your reaction?",
      urgency: "high",
      timed: 12,
      choices: [
        {
          label: "Voix ferme : 'Attention tout le monde — suivez-moi par l'escalier B, maintenant, calmement.'",
          labelEn: "Firm voice: 'Attention everyone — follow me via staircase B, now, calmly.'",
          consequence: "Communication parfaite. Voix ferme mais calme, direction précise, action immédiate. 11 collègues vous suivent directement.",
          consequenceEn: "Perfect communication. Firm but calm voice, precise direction, immediate action. 11 colleagues follow you directly.",
          consequenceType: "ok",
          nextNode: "guide_check",
          points: 10,
        },
        {
          label: "'Au feu ! Sortez ! Courez !' en criant très fort",
          labelEn: "'Fire! Get out! Run!' shouting very loudly",
          consequence: "Contre-productif. Crier amplifie la panique. Les gens se bousculent et perdent la capacité de raisonnement.",
          consequenceEn: "Counter-productive. Shouting amplifies panic. People jostle each other and lose the ability to reason.",
          consequenceType: "ko",
          nextNode: "guide_check",
          points: 1,
        },
        {
          label: "'Je ne sais pas où aller, essayons par ici...'",
          labelEn: "'I don't know where to go, let's try this way...'",
          consequence: "Inefficace. L'hésitation se propage immédiatement. Un guide incertain génère le chaos.",
          consequenceEn: "Ineffective. Hesitation spreads immediately. An uncertain guide creates chaos.",
          consequenceType: "ko",
          nextNode: "guide_check",
          points: 0,
        },
        {
          label: "'Restez calmes et attendez les instructions officielles'",
          labelEn: "'Stay calm and wait for official instructions'",
          consequence: "Trop passif. En situation d'alarme, chaque seconde compte. Attendre des instructions supplémentaires retarde l'évacuation.",
          consequenceEn: "Too passive. In an alarm situation, every second counts. Waiting for additional instructions delays evacuation.",
          consequenceType: "ko",
          nextNode: "guide_check",
          points: 3,
        },
      ],
    },
    guide_check: {
      id: "guide_check",
      situation: "En marchant vers l'escalier, un collègue vous dit qu'il retourne chercher son ordinateur.",
      situationEn: "Walking towards the staircase, a colleague tells you he is going back for his laptop.",
      urgency: "medium",
      choices: [
        {
          label: "'Laissez vos affaires — votre vie vaut plus. Suivez-moi maintenant.'",
          labelEn: "'Leave your belongings — your life is worth more. Follow me now.'",
          consequence: "Parfait. Message clair, priorité absolue établie, ton ferme sans agressivité.",
          consequenceEn: "Perfect. Clear message, absolute priority established, firm tone without aggression.",
          consequenceType: "ok",
          points: 10,
        },
        {
          label: "Je le laisse faire — c'est sa responsabilité",
          labelEn: "I let him do it — it's his responsibility",
          consequence: "Erreur. Vous avez la responsabilité de guider. Laisser quelqu'un retourner dans un bâtiment en feu est inacceptable.",
          consequenceEn: "Error. You have a responsibility to guide. Allowing someone to re-enter a burning building is unacceptable.",
          consequenceType: "critical",
          points: 0,
        },
        {
          label: "'D'accord mais faites vite — on vous attend ici'",
          labelEn: "'OK but be quick — we'll wait for you here'",
          consequence: "Très dangereux. Attendre devant un bâtiment en feu expose le groupe. Retourner chercher des affaires est interdit.",
          consequenceEn: "Very dangerous. Waiting in front of a burning building exposes the group. Going back for belongings is prohibited.",
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
  instructionEn: "Put the actions in the correct order during an evacuation",
  context: "La séquence correcte est essentielle. Glissez chaque action dans la bonne catégorie.",
  contextEn: "The correct sequence is essential. Drag each action to the right category.",
  successMessage: "Séquence 'Sors — Ferme — Signale' parfaitement maîtrisée !",
  successMessageEn: "EXIT — CLOSE — SIGNAL sequence perfectly mastered!",
  items: [
    { id: "i1", label: "Sortir de la pièce rapidement", labelEn: "Exit the room quickly", sublabel: "Évacuer sans attendre", sublabelEn: "Evacuate without waiting", icon: "LogOut", correctZone: "sors" },
    { id: "i2", label: "Vérifier qu'il n'y a personne", labelEn: "Check no one is inside", sublabel: "Contrôler la pièce avant de partir", sublabelEn: "Check the room before leaving", icon: "ScanEye", correctZone: "sors" },
    { id: "i3", label: "Fermer la porte (sans verrouiller)", labelEn: "Close the door (without locking)", sublabel: "Ralentit la propagation du feu", sublabelEn: "Slows fire propagation", icon: "DoorClosed", correctZone: "ferme" },
    { id: "i4", label: "S'assurer que la porte est bien fermée", labelEn: "Make sure the door is properly closed", sublabel: "Barrière contre la fumée", sublabelEn: "Barrier against smoke", icon: "ShieldCheck", correctZone: "ferme" },
    { id: "i5", label: "Signaler aux secours les zones vérifiées", labelEn: "Report cleared zones to emergency services", sublabel: "Informer le responsable évacuation", sublabelEn: "Inform the evacuation coordinator", icon: "Bell", correctZone: "signale" },
    { id: "i6", label: "Rejoindre le point de rassemblement", labelEn: "Reach the assembly point", sublabel: "Se rendre au point désigné", sublabelEn: "Go to the designated point", icon: "MapPin", correctZone: "signale" },
  ],
  zones: [
    {
      id: "sors",
      label: "1 — SORS",
      labelEn: "1 — EXIT",
      sublabel: "Quitter et vérifier",
      sublabelEn: "Leave and check",
      color: "#da1e28",
      bgColor: "rgba(218,30,40,0.05)",
      borderColor: "rgba(218,30,40,0.25)",
    },
    {
      id: "ferme",
      label: "2 — FERME",
      labelEn: "2 — CLOSE",
      sublabel: "Fermer sans verrouiller",
      sublabelEn: "Close without locking",
      color: "#b45309",
      bgColor: "rgba(180,83,9,0.05)",
      borderColor: "rgba(180,83,9,0.25)",
    },
    {
      id: "signale",
      label: "3 — SIGNALE",
      labelEn: "3 — SIGNAL",
      sublabel: "Informer les secours",
      sublabelEn: "Inform emergency services",
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
  instructionEn: "Virtually explore this floor and identify all areas to check",
  context: "Avant d'évacuer définitivement, quelles zones d'un étage IBM doivent être contrôlées ?",
  contextEn: "Before definitively evacuating, which areas on an IBM floor need to be checked?",
  image: `${CDN}b5ca9823c0ba42e492f17a707fd14708?format=webp&width=800`,
  successMessage: "Vérification complète — toutes les zones ont été contrôlées",
  successMessageEn: "Full check — all areas have been verified",
  hotspots: [
    {
      id: "h1", x: 20, y: 40,
      label: "Open space principal",
      labelEn: "Main open-plan area",
      description: "Zone la plus peuplée. Un balayage visuel rapide couvre toute la surface. Appeler 'Évacuation !' pour alerter ceux qui n'auraient pas entendu.",
      descriptionEn: "The most populated zone. A quick visual scan covers the entire surface. Call 'Evacuation!' to alert those who may not have heard.",
      type: "info",
      detail: "Durée de vérification : 5-10 secondes maximum",
      detailEn: "Verification time: 5-10 seconds maximum",
    },
    {
      id: "h2", x: 55, y: 30,
      label: "Salles de réunion fermées",
      labelEn: "Closed meeting rooms",
      description: "Portes fermées = personnes potentiellement à l'intérieur sans entendre l'alarme. Ouvrir brièvement et appeler.",
      descriptionEn: "Closed doors = people potentially inside without hearing the alarm. Open briefly and call out.",
      type: "danger",
      detail: "Ne pas supposer qu'une salle fermée est vide",
      detailEn: "Don't assume a closed room is empty",
    },
    {
      id: "h3", x: 75, y: 60,
      label: "Sanitaires",
      labelEn: "Toilets",
      description: "Zone souvent oubliée. L'alarme peut y être moins audible. Une personne peut y être malaise ou sourde à l'alarme.",
      descriptionEn: "Often overlooked area. The alarm may be less audible. Someone may be unwell or deaf to the alarm.",
      type: "danger",
      detail: "Appeler à l'entrée sans entrer si la fumée est présente",
      detailEn: "Call out at the entrance without entering if smoke is present",
    },
    {
      id: "h4", x: 38, y: 65,
      label: "Local technique / serveur",
      labelEn: "Technical / server room",
      description: "Personnel de maintenance potentiellement présent avec bruit ambiant. Vérification rapide indispensable.",
      descriptionEn: "Maintenance staff potentially present with ambient noise. A quick check is essential.",
      type: "info",
      detail: "Signaler aux secours si la zone est inaccessible à cause du feu",
      detailEn: "Report to emergency services if the area is inaccessible due to fire",
    },
    {
      id: "h5", x: 85, y: 20,
      label: "EAS — Espace d'Attente Sécurisé",
      labelEn: "SWA — Safe Waiting Area",
      description: "Zone identifiée sur les sites IBM en étage non sprinklé. L'EAS accueille les personnes à mobilité réduite (PMR) qui ne peuvent pas emprunter les escaliers. Consultez la fiche A4 affichée à l'entrée de l'EAS pour les instructions.",
      descriptionEn: "Area identified on IBM upper-floor non-sprinklered sites. The SWA accommodates people with reduced mobility (PRM) who cannot use the stairs. Refer to the A4 instruction sheet posted at the SWA entrance.",
      type: "danger",
      detail: "Vérifier si une personne est présente dans l'EAS et signaler sa position aux secours à l'extérieur",
      detailEn: "Check if anyone is in the SWA and report their location to emergency services outside",
    },
  ],
};

// CH2 M5 — Faire face à la fumée
const ch2m5_branching: BranchingExercise = {
  type: "branching",
  title: "Navigation en environnement enfumé",
  titleEn: "Navigating a Smoke-Filled Environment",
  startNode: "smoke_entry",
  successMessage: "Bons réflexes face à la fumée — vous avez protégé votre respiration",
  successMessageEn: "Good reflexes against smoke — you protected your breathing",
  failMessage: "Des réflexes dangereux identifiés — la fumée tue avant les flammes",
  failMessageEn: "Dangerous reflexes identified — smoke kills before flames",
  nodes: {
    smoke_entry: {
      id: "smoke_entry",
      image: `${CDN}cc5ab29f9fd543a2aff682cdd54297ad?format=webp&width=800`,
      situation: "Vous ouvrez la porte du couloir. Une fumée grise à mi-hauteur remplit l'espace. La sortie est à 20 mètres.",
      situationEn: "You open the corridor door. Grey smoke at mid-height fills the space. The exit is 20 metres away.",
      urgency: "high",
      timed: 10,
      choices: [
        {
          label: "Je me baisse sous la fumée et avance rapidement en longeant le mur",
          labelEn: "I crouch under the smoke and advance quickly keeping close to the wall",
          consequence: "Réflexe vital. L'air respirable est dans le tiers inférieur. Longer le mur maintient le repère spatial.",
          consequenceEn: "Vital reflex. Breathable air is in the lower third. Keeping to the wall maintains spatial reference.",
          consequenceType: "ok",
          nextNode: "door_test",
          points: 10,
        },
        {
          label: "Je cours debout vers la sortie le plus vite possible",
          labelEn: "I run upright towards the exit as fast as possible",
          consequence: "Dangereux. Debout = inhalation directe des gaz toxiques. Perte de conscience possible en quelques respirations.",
          consequenceEn: "Dangerous. Standing up = direct inhalation of toxic gases. Loss of consciousness possible within a few breaths.",
          consequenceType: "critical",
          nextNode: "door_test",
          points: 0,
        },
        {
          label: "Je retourne en arrière pour trouver un autre chemin",
          labelEn: "I turn back to find another route",
          consequence: "Décision acceptable si la fumée est trop dense. Ici la sortie est visible — rebrousser chemin est excessif.",
          consequenceEn: "Acceptable decision if the smoke is too dense. Here the exit is visible — turning back is excessive.",
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
      situationEn: "A door on your path to the exit. You don't know what's behind it.",
      urgency: "high",
      choices: [
        {
          label: "Je pose la main sur la porte — si chaude, je ne l'ouvre pas",
          labelEn: "I place my hand on the door — if hot, I don't open it",
          consequence: "Parfait. Tester la température à la main (jamais la poignée en métal) permet de détecter un feu derrière.",
          consequenceEn: "Perfect. Testing temperature by hand (never the metal handle) detects a fire behind.",
          consequenceType: "ok",
          nextNode: "exit",
          points: 10,
        },
        {
          label: "J'ouvre directement — on verra bien",
          labelEn: "I open it directly — we'll see",
          consequence: "Très dangereux. Si un feu est derrière, l'ouverture aspire les flammes vers vous.",
          consequenceEn: "Very dangerous. If there's a fire behind, opening draws flames towards you.",
          consequenceType: "critical",
          nextNode: "exit",
          points: 0,
        },
        {
          label: "J'appuie la main sur la poignée en métal pour tester",
          labelEn: "I press the metal handle to test",
          consequence: "Erreur. La poignée en métal conduit la chaleur — vous pouvez vous brûler gravement. Toujours tester avec le dos de la main sur la porte.",
          consequenceEn: "Error. The metal handle conducts heat — you can burn yourself badly. Always test with the back of your hand on the door.",
          consequenceType: "ko",
          nextNode: "exit",
          points: 3,
        },
      ],
    },
    exit: {
      id: "exit",
      situation: "Vous atteignez la sortie. Fin du parcours enfumé.",
      situationEn: "You reach the exit. End of the smoke-filled route.",
      urgency: "low",
      choices: [
        {
          label: "Valider — j'ai atteint la sortie en sécurité",
          labelEn: "Confirm — I reached the exit safely",
          consequence: "Séquence complète : se baisser, longer les murs, tester les portes. Ces réflexes sauvent des vies.",
          consequenceEn: "Full sequence: crouch, keep to walls, test doors. These reflexes save lives.",
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
  instructionEn: "On this IBM floor plan, identify the correct evacuation route",
  context: "Analysez les différentes options. Quelles voies sont sûres ? Lesquelles sont à éviter absolument ?",
  contextEn: "Analyse the different options. Which routes are safe? Which must absolutely be avoided?",
  image: `${CDN}48e0cc79ee294fbbaf81f10232959ffb?format=webp&width=800`,
  successMessage: "Vous connaissez les règles d'évacuation par les escaliers",
  successMessageEn: "You know the rules for staircase evacuation",
  hotspots: [
    {
      id: "h1", x: 30, y: 40,
      label: "Ascenseur — INTERDIT",
      labelEn: "Lift — PROHIBITED",
      description: "L'ascenseur est formellement interdit lors d'un incendie. Panne électrique possible, portes bloquées sur l'étage en feu, propagation de fumée dans la cabine.",
      descriptionEn: "The lift is strictly prohibited during a fire. Possible power failure, doors blocked on the fire floor, smoke spreading into the cabin.",
      type: "danger",
      detail: "Même si l'ascenseur fonctionne — ne jamais l'utiliser lors d'une alarme incendie",
      detailEn: "Even if the lift is working — never use it during a fire alarm",
    },
    {
      id: "h2", x: 70, y: 35,
      label: "Escalier principal — à privilégier",
      labelEn: "Main staircase — preferred",
      description: "L'escalier le plus proche est toujours le bon choix. Descendre calmement en file, à droite, sans courir.",
      descriptionEn: "The nearest staircase is always the right choice. Descend calmly in single file, on the right, without running.",
      type: "safe",
      detail: "Fermer la porte de l'escalier derrière soi — ralentit la fumée",
      detailEn: "Close the staircase door behind you — slows smoke",
    },
    {
      id: "h3", x: 50, y: 70,
      label: "Espace d'Attente Sécurisé (EAS)",
      labelEn: "Secure Waiting Area (SWA)",
      description: "Si l'escalier est impraticable (fumée, feu), l'EAS est la zone de refuge. Porte coupe-feu, système d'interphone avec les secours, signalisation spécifique.",
      descriptionEn: "If the staircase is impassable (smoke, fire), the SWA is the refuge area. Fire door, intercom with emergency services, specific signage.",
      type: "info",
      detail: "L'EAS est obligatoire dans les IGH (immeubles de grande hauteur)",
      detailEn: "The SWA is mandatory in high-rise buildings (IGH)",
    },
    {
      id: "h4", x: 85, y: 60,
      label: "Sortie de secours extérieure",
      labelEn: "External emergency exit",
      description: "Issue de secours avec accès direct à l'extérieur. Toujours dégagée. Signalée par le pictogramme vert standardisé.",
      descriptionEn: "Emergency exit with direct outdoor access. Always clear. Identified by the standardised green pictogram.",
      type: "safe",
      detail: "Distance maximale réglementaire : 40m entre une issue et toute position de travail",
      detailEn: "Regulatory maximum distance: 40m between an exit and any work position",
    },
  ],
};

// CH2 M7 — Procédure complète
const ch2m7_branching: BranchingExercise = {
  type: "branching",
  title: "Procédure complète d'évacuation — Simulation finale",
  titleEn: "Full Evacuation Procedure — Final Simulation",
  subtitle: "Score Réflexes d'Évacuation",
  subtitleEn: "Evacuation Reflexes Score",
  startNode: "alarm_ch2",
  successMessage: "Score Réflexes d'Évacuation — Niveau Expert. Parcours de certification validé.",
  successMessageEn: "Evacuation Reflexes Score — Expert Level. Certification path validated.",
  failMessage: "Des décisions à améliorer — recommencez pour atteindre l'objectif de 80%",
  failMessageEn: "Decisions to improve — retry to reach the 80% target",
  nodes: {
    alarm_ch2: {
      id: "alarm_ch2",
      image: `${CDN}2482acaedcdd4b2abad18b1011a424c6?format=webp&width=800`,
      situation: "16h00. Alarme incendie. Fumée légère dans le couloir. Vous êtes au 4e étage. 12 collègues autour de vous.",
      situationEn: "4:00 PM. Fire alarm. Light smoke in the corridor. You are on the 4th floor. 12 colleagues around you.",
      context: "C'est le moment d'appliquer toute la procédure que vous avez apprise.",
      contextEn: "This is the moment to apply the full procedure you have learned.",
      urgency: "high",
      timed: 10,
      choices: [
        {
          label: "Lever la main, voix ferme : 'Alarme — on évacue par l'escalier B, suivez-moi'",
          labelEn: "Raise hand, firm voice: 'Alarm — evacuate via staircase B, follow me'",
          consequence: "Leader calme et directif. Votre posture rassure immédiatement vos collègues.",
          consequenceEn: "Calm and directive leader. Your posture immediately reassures your colleagues.",
          consequenceType: "ok",
          nextNode: "verify_rooms",
          points: 10,
        },
        {
          label: "Partir rapidement sans informer les collègues",
          labelEn: "Leave quickly without informing colleagues",
          consequence: "Insuffisant. Vous laissez 12 personnes sans guidance. Certains pourraient prendre de mauvaises décisions.",
          consequenceEn: "Insufficient. You leave 12 people without guidance. Some may make poor decisions.",
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
      situationEn: "Passing through the corridor, you see two closed meeting rooms.",
      urgency: "high",
      choices: [
        {
          label: "J'ouvre brièvement chaque porte en criant 'Évacuation !' puis je ferme derrière moi",
          labelEn: "I briefly open each door shouting 'Evacuate!' then close it behind me",
          consequence: "Parfait. Vérification rapide + fermeture = sécurité maximale pour tous.",
          consequenceEn: "Perfect. Quick check + closing = maximum safety for everyone.",
          consequenceType: "ok",
          nextNode: "staircase",
          points: 10,
        },
        {
          label: "Je suppose qu'elles sont vides et je continue",
          labelEn: "I assume they are empty and continue",
          consequence: "Risqué. Une salle fermée n'est pas forcément vide. Une personne pourrait rester bloquée.",
          consequenceEn: "Risky. A closed room is not necessarily empty. Someone could remain trapped.",
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
      situationEn: "At the stairwell: light smoke visible. The lift is available and working.",
      urgency: "high",
      choices: [
        {
          label: "Escalier uniquement — on se baisse si nécessaire, on reste à droite",
          labelEn: "Staircase only — we crouch if needed, keeping right",
          consequence: "Décision correcte. Ascenseur interdit en cas d'incendie sans exception.",
          consequenceEn: "Correct decision. Lift prohibited during a fire without exception.",
          consequenceType: "ok",
          nextNode: "assembly_ch2",
          points: 10,
        },
        {
          label: "Ascenseur pour les personnes à mobilité réduite",
          labelEn: "Lift for people with reduced mobility",
          consequence: "Erreur même pour les PMR. L'EAS (espace d'attente sécurisé) est prévu pour eux — attendre les secours dans l'EAS.",
          consequenceEn: "Error even for PRM. The SWA (secure waiting area) is for them — wait for emergency services in the SWA.",
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
      situationEn: "At the assembly point. You count: 11 out of 12. One is missing.",
      urgency: "medium",
      choices: [
        {
          label: "Je signale immédiatement l'absent au responsable d'évacuation avec son nom et sa localisation probable",
          labelEn: "I immediately report the missing person to the evacuation coordinator with their name and likely location",
          consequence: "Crucial. Les pompiers orientent leur recherche grâce à ces informations précises. Potentiellement vital.",
          consequenceEn: "Crucial. Firefighters direct their search based on this precise information. Potentially life-saving.",
          consequenceType: "ok",
          points: 10,
        },
        {
          label: "Je retourne chercher la personne manquante moi-même",
          labelEn: "I go back to find the missing person myself",
          consequence: "Interdit et dangereux. Retourner sans équipement = risque vital. Les secours sont formés pour cela.",
          consequenceEn: "Prohibited and dangerous. Re-entering without equipment = life risk. Emergency services are trained for this.",
          consequenceType: "critical",
          points: 0,
        },
        {
          label: "J'attends — peut-être qu'elle est arrivée par un autre escalier",
          labelEn: "I wait — perhaps they arrived via another staircase",
          consequence: "Insuffisant. Attendre sans signaler laisse les secours sans information cruciale. Toujours signaler une absence.",
          consequenceEn: "Insufficient. Waiting without reporting leaves emergency services without crucial information. Always report an absence.",
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
  titleEn: "True or False — Fire Outbreak",
  subtitle: "Testez vos certitudes sur la détection incendie",
  subtitleEn: "Test your knowledge about fire detection",
  successMessage: "Vous distinguez les bonnes pratiques des idées reçues !",
  successMessageEn: "You can distinguish good practices from common myths!",
  statements: [
    { statement: "Un départ de feu est toujours précédé de flammes visibles.", statementEn: "A fire outbreak is always preceded by visible flames.", isTrue: false, explanation: "Faux. La fumée, l'odeur et la chaleur sont souvent les premiers signaux — bien avant les flammes.", explanationEn: "False. Smoke, smell and heat are often the first signals — well before flames." },
    { statement: "Une légère odeur de brûlé persistante est un signal d'alerte réel.", statementEn: "A persistent faint burning smell is a real warning signal.", isTrue: true, explanation: "Vrai. Toute odeur de brûlé persistante doit déclencher une vérification immédiate.", explanationEn: "True. Any persistent burning smell should trigger an immediate check." },
    { statement: "Attendre que l'alarme sonne avant d'agir est la procédure correcte.", statementEn: "Waiting for the alarm to sound before acting is the correct procedure.", isTrue: false, explanation: "Faux. L'alarme arrive après le signal — vous devez agir dès la détection, sans attendre.", explanationEn: "False. The alarm comes after the signal — you must act on detection, without waiting." },
    { statement: "Un grésil électrique anormal peut précéder un incendie.", statementEn: "An abnormal electrical crackling can precede a fire.", isTrue: true, explanation: "Vrai. Un arc électrique ou grésil est souvent signe d'un court-circuit qui peut provoquer un feu.", explanationEn: "True. An electric arc or crackling is often a sign of a short-circuit that can cause a fire." },
    { statement: "On peut ignorer une légère chaleur anormale près d'une prise.", statementEn: "You can ignore a slight abnormal heat near a socket.", isTrue: false, explanation: "Faux. Une prise chaude signale une surcharge électrique — source courante d'incendie en bureau.", explanationEn: "False. A warm socket signals an electrical overload — a common cause of office fires." },
  ],
};

const ch2m1_binary: GridQuizExercise = {
  type: "gridquiz",
  title: "Vrai ou Faux — L'alarme incendie",
  titleEn: "True or False — The Fire Alarm",
  subtitle: "3 bonnes réponses alignées = victoire !",
  subtitleEn: "3 correct answers aligned = victory!",
  cells: [
    {
      statement: "Déclencher l'alarme trop tôt est sanctionné chez IBM.",
      statementEn: "Triggering the alarm too early is penalized at IBM.",
      correct: "false",
      explanation: "FAUX. Il est impossible de déclencher trop tôt face à un signal suspect. IBM prévoit un retour des secours sans sanction.",
      explanationEn: "FALSE. It is impossible to trigger too early when facing a suspicious signal. IBM policy supports early alarm with no penalty.",
    },
    {
      statement: "Le 777 doit être composé avant le 18 lors d'un incident IBM.",
      statementEn: "777 must be called before 18 during an IBM incident.",
      correct: "true",
      explanation: "VRAI. La sécurité IBM connaît les plans des bâtiments et peut intervenir plus rapidement que les services externes.",
      explanationEn: "TRUE. IBM Security knows the building plans and can respond faster than external services.",
    },
    {
      statement: "Les détecteurs automatiques rendent le déclencheur manuel inutile.",
      statementEn: "Automatic detectors make the manual call point unnecessary.",
      correct: "false",
      explanation: "FAUX. Le déclencheur manuel est un filet de sécurité indépendant — toujours disponible si le détecteur n'a pas réagi.",
      explanationEn: "FALSE. The manual call point is an independent safety net — always available if the detector has not reacted.",
    },
    {
      statement: "Chaque seconde de retard représente environ 6m² supplémentaires en feu.",
      statementEn: "Every second of delay represents approximately 6m² more on fire.",
      correct: "true",
      explanation: "VRAI. C'est la statistique IBM : le retard à déclencher l'alarme est directement corrélé à la superficie touchée.",
      explanationEn: "TRUE. This is the IBM statistic: delay in triggering the alarm is directly correlated with the area affected.",
    },
    {
      statement: "Après avoir déclenché l'alarme, il faut attendre sur place les consignes.",
      statementEn: "After triggering the alarm, you must wait on site for instructions.",
      correct: "false",
      explanation: "FAUX. Après déclenchement, commencer immédiatement l'évacuation sans attendre confirmation.",
      explanationEn: "FALSE. After triggering, begin evacuation immediately without waiting for confirmation.",
    },
    {
      statement: "Un boîtier rouge déclenche l'alarme de tout le bâtiment IBM.",
      statementEn: "A red call point triggers the alarm for the entire IBM building.",
      correct: "true",
      explanation: "VRAI. Le boîtier rouge (déclencheur manuel) active l'alarme générale. Tous les occupants sont alertés simultanément.",
      explanationEn: "TRUE. The red call point (manual trigger) activates the general alarm. All occupants are alerted simultaneously.",
    },
    {
      statement: "On peut ignorer une alarme si l'on pense que c'est un test.",
      statementEn: "You can ignore an alarm if you think it's a drill.",
      correct: "false",
      explanation: "FAUX. Toute alarme doit être traitée comme réelle jusqu'à preuve du contraire. L'évacuation est obligatoire.",
      explanationEn: "FALSE. Every alarm must be treated as real until proven otherwise. Evacuation is mandatory.",
    },
    {
      statement: "L'alarme sonore doit être audible dans toutes les zones du bâtiment.",
      statementEn: "The audible alarm must be heard in all areas of the building.",
      correct: "true",
      explanation: "VRAI. La réglementation impose une audibilité minimale dans chaque local, y compris les sanitaires et locaux techniques.",
      explanationEn: "TRUE. Regulations require minimum audibility in each room, including bathrooms and technical rooms.",
    },
    {
      statement: "Il est possible d'appuyer sur le déclencheur uniquement si l'on voit des flammes.",
      statementEn: "You can only press the call point if you can see flames.",
      correct: "false",
      explanation: "FAUX. Une odeur de brûlé, de la fumée ou une chaleur anormale suffisent pour déclencher l'alarme. N'attendez pas les flammes.",
      explanationEn: "FALSE. A burning smell, smoke or abnormal heat are sufficient to trigger the alarm. Don't wait for flames.",
    },
  ],
};

// ── FLIP CARDS ─────────────────────────────────────────────────
const m2_flipcards: FlipCardsExercise = {
  type: "flipcards",
  title: "Le Triangle du Feu — 3 éléments clés",
  titleEn: "The Fire Triangle — 3 Key Elements",
  subtitle: "Retournez chaque carte pour comprendre le rôle de chaque élément",
  subtitleEn: "Flip each card to understand the role of each element",
  cards: [
    { front: "COMBUSTIBLE", frontEn: "FUEL", back: "Matière qui brûle : papier, bois, tissu, plastique, câbles. Pour éteindre → retirer ou isoler la matière.", backEn: "Material that burns: paper, wood, fabric, plastic, cables. To extinguish → remove or isolate the material.", icon: "Flame", color: "#b45309" },
    { front: "COMBURANT\n(Oxygène)", frontEn: "OXIDISER\n(Oxygen)", back: "L'air contient 21% d'O₂ qui alimente la combustion. Pour éteindre → étouffer avec couverture anti-feu ou CO2.", backEn: "Air contains 21% O₂ which feeds combustion. To extinguish → smother with fire blanket or CO2.", icon: "Wind", color: "#0D47A1" },
    { front: "CHALEUR\n(Énergie)", frontEn: "HEAT\n(Energy)", back: "L'énergie qui déclenche la réaction : étincelle, court-circuit, friction. Pour éteindre → refroidir avec eau ou CO2.", backEn: "The energy that triggers the reaction: spark, short-circuit, friction. To extinguish → cool with water or CO2.", icon: "Zap", color: "#da1e28" },
    { front: "BRISER LE\nTRIANGLE", frontEn: "BREAK THE\nTRIANGLE", back: "Supprimer UN seul élément suffit à éteindre le feu. C'est le principe de tous les agents extincteurs.", backEn: "Removing just ONE element is enough to extinguish a fire. This is the principle behind all extinguishing agents.", icon: "Shield", color: "#198038" },
  ],
};

const ch2m2_flipcards: FlipCardsExercise = {
  type: "flipcards",
  title: "Posture en crise — 4 règles d'or",
  titleEn: "Crisis Posture — 4 Golden Rules",
  subtitle: "Retournez chaque carte pour maîtriser la communication en urgence",
  subtitleEn: "Flip each card to master emergency communication",
  cards: [
    { front: "CALME", frontEn: "CALM", back: "Voix posée et ferme. L'urgence s'entend dans votre ton, pas dans votre volume. Pas de cris — ils amplifient la panique.", backEn: "Steady, firm voice. Urgency is in your tone, not your volume. No shouting — it amplifies panic.", icon: "Shield", color: "#0D47A1" },
    { front: "CLAIR", frontEn: "CLEAR", back: "'Tout le monde sort par là.' Instructions courtes et directes. Pas d'explications complexes en situation de crise.", backEn: "'Everyone this way.' Short, direct instructions. No complex explanations in a crisis.", icon: "Eye", color: "#198038" },
    { front: "RASSURANT", frontEn: "REASSURING", back: "Votre posture physique (position, démarche) influence le groupe. Marchez, ne courez pas. Le groupe vous imite.", backEn: "Your physical posture (stance, walk) influences the group. Walk, don't run. The group mirrors you.", icon: "Users", color: "#7c3aed" },
    { front: "COMPLET", frontEn: "THOROUGH", back: "Vérifiez que tout le monde suit avant de continuer. Comptez si possible. Ne laissez personne derrière.", backEn: "Check everyone is following before moving on. Count if possible. Leave no one behind.", icon: "CheckCircle", color: "#b45309" },
  ],
};

// ── FILL IN THE BLANK ──────────────────────────────────────────
const m5_fillblank: FillBlankExercise = {
  type: "fillblank",
  title: "Complétez la séquence PASS",
  titleEn: "Complete the PASS sequence",
  subtitle: "Retrouvez les mots clés de la méthode d'extinction IBM",
  subtitleEn: "Fill in the key words of the IBM PASS extinguisher method",
  successMessage: "La séquence PASS est parfaitement mémorisée !",
  successMessageEn: "PASS sequence perfectly memorised!",
  sentences: [
    { before: "P — Tirez la", beforeEn: "P — Pull the", answer: "goupille", answerEn: "pin", acceptableAnswers: ["goupille de sécurité", "goupille de securite", "pin", "safety pin", "la goupille"], acceptableAnswersEn: ["safety pin", "goupille", "pin"], after: "de sécurité pour déverrouiller l'extincteur.", afterEn: "to unlock the extinguisher.", hint: "verrou de sécurité", hintEn: "safety lock" },
    { before: "A — Visez la", beforeEn: "A — Aim at the", answer: "base", answerEn: "base", acceptableAnswers: ["la base", "base des flammes", "base du feu", "pied", "pied des flammes", "pied du feu"], acceptableAnswersEn: ["bottom", "foot", "base of the flames", "base of the fire"], after: "des flammes, jamais le haut du feu.", afterEn: "of the flames, never the top.", hint: "où se trouve le combustible", hintEn: "where the fuel is" },
    { before: "S — Pressez la", beforeEn: "S — Squeeze the", answer: "poignée", answerEn: "handle", acceptableAnswers: ["la poignée", "gâchette", "gachette", "manette", "détente", "detente", "poignee"], acceptableAnswersEn: ["lever", "trigger", "grip", "handle"], after: "de déclenchement pour activer le jet.", afterEn: "to activate the discharge.", hint: "mécanisme de déclenchement", hintEn: "discharge mechanism" },
    { before: "S — Balayez de", beforeEn: "S — Sweep from", answer: "gauche à droite", answerEn: "side to side", acceptableAnswers: ["gauche a droite", "de gauche à droite", "de gauche a droite", "left to right", "gauche-droite", "droite à gauche", "droite a gauche", "droite-gauche", "de droite à gauche", "de droite a gauche", "gauche droite", "droite gauche", "côté à côté", "cote a cote"], acceptableAnswersEn: ["left to right", "left-to-right", "side to side", "left and right"], after: "en maintenant le jet sur la base.", afterEn: "keeping the jet on the base.", hint: "mouvement horizontal", hintEn: "horizontal motion" },
    { before: "Distance optimale :", beforeEn: "Optimal distance:", answer: "2 à 3 mètres", answerEn: "2 to 3 metres", acceptableAnswers: ["2 à 3 metres", "2-3 mètres", "2-3 metres", "2-3m", "2 à 3m", "2 a 3 mètres", "2 a 3 metres", "2 a 3m", "2 mètres", "3 mètres", "2 metres", "3 metres", "2à3 mètres", "2à3 metres", "2à3m", "2à3 m", "2à3", "environ 2 mètres", "environ 3 mètres", "2 a 3", "2 à 3"], acceptableAnswersEn: ["2-3 metres", "2-3m", "2 to 3 meters", "2-3 meters", "2 metres", "3 metres", "2 meters", "3 meters"], after: "du foyer pour une efficacité maximale.", afterEn: "from the fire for maximum effectiveness.", hint: "distance de sécurité", hintEn: "safe distance" },
  ],
};

const ch2m3_fillblank: FillBlankExercise = {
  type: "fillblank",
  title: "Complétez : SORS — FERME — SIGNALE",
  titleEn: "Complete: EXIT — CLOSE — SIGNAL",
  subtitle: "Les 3 actions fondamentales de l'évacuation IBM",
  subtitleEn: "The 3 fundamental actions of IBM evacuation",
  successMessage: "Séquence SORS-FERME-SIGNALE parfaitement maîtrisée !",
  successMessageEn: "EXIT-CLOSE-SIGNAL sequence perfectly mastered!",
  sentences: [
    { before: "Quittez la pièce", beforeEn: "Leave the room", answer: "sans attendre", answerEn: "immediately", acceptableAnswers: ["immédiatement", "immediatement", "rapidement", "de suite", "tout de suite", "aussitôt", "aussitot", "sans délai", "sans delai"], acceptableAnswersEn: ["right away", "at once", "without delay", "now", "straight away"], after: "— chaque seconde compte.", afterEn: "— every second counts.", hint: "ne pas hésiter", hintEn: "no hesitation" },
    { before: "Fermez la porte", beforeEn: "Close the door", answer: "sans la verrouiller", answerEn: "without locking it", acceptableAnswers: ["sans verrouiller", "sans fermer à clé", "sans fermer a clé", "sans clé", "sans cle", "sans la fermer à clé", "sans fermer a cle"], acceptableAnswersEn: ["without locking", "but don't lock", "don't lock it", "not locked"], after: "pour ralentir le feu sans piéger les autres.", afterEn: "to slow fire without trapping others.", hint: "fermer mais pas bloquer", hintEn: "close but don't lock" },
    { before: "Signalez les zones vérifiées au", beforeEn: "Report checked areas to the", answer: "responsable évacuation", answerEn: "evacuation warden", acceptableAnswers: ["responsable de l'évacuation", "responsable evacuation", "chef évacuation", "chef evacuation", "responsable", "responsable d'évacuation", "responsable d evacuation"], acceptableAnswersEn: ["warden", "floor warden", "fire warden", "evacuation officer", "marshal"], after: "au point de rassemblement.", afterEn: "at the assembly point.", hint: "personne en charge", hintEn: "person in charge" },
    { before: "Ne", beforeEn: "Never", answer: "jamais revenir", answerEn: "go back", acceptableAnswers: ["ne jamais revenir", "pas revenir", "ne pas revenir", "jamais retourner", "ne jamais retourner"], acceptableAnswersEn: ["return", "come back", "go back in", "re-enter"], after: "chercher ses affaires une fois l'évacuation lancée.", afterEn: "to collect belongings once evacuation has started.", hint: "interdiction absolue", hintEn: "absolute rule" },
  ],
};

// ── MATCHING ───────────────────────────────────────────────────
const m4_matching: MatchExercise = {
  type: "matching",
  title: "Associez chaque classe de feu à son extincteur",
  titleEn: "Match each fire class to its extinguisher",
  subtitle: "Le bon agent extincteur selon la nature du feu",
  subtitleEn: "The correct extinguishing agent based on fire type",
  successMessage: "Parfait — vous choisissez le bon extincteur selon le type de feu !",
  successMessageEn: "Perfect — you can choose the right extinguisher for each fire type!",
  pairs: [
    { left: "Classe A — Bois, papier, tissu", leftEn: "Class A — Wood, paper, fabric", right: "Eau, Poudre ABC", rightEn: "Water, ABC Powder" },
    { left: "Classe B — Liquides inflammables", leftEn: "Class B — Flammable liquids", right: "Mousse, Poudre ABC", rightEn: "Foam, ABC Powder" },
    { left: "Classe C — Gaz inflammables", leftEn: "Class C — Flammable gases", right: "Poudre ABC (coupure gaz en premier)", rightEn: "ABC Powder (cut gas first)" },
    { left: "Classe E — Feux électriques", leftEn: "Class E — Electrical fires", right: "CO2 uniquement (jamais d'eau)", rightEn: "CO2 only (never water)" },
    { left: "Classe F — Huiles / graisses", leftEn: "Class F — Oils / grease", right: "Émulseur F spécifique", rightEn: "Class F wet chemical agent" },
  ],
};

const ch2m6_matching: MatchExercise = {
  type: "matching",
  title: "Situatations → Bonne action",
  titleEn: "Situations → Correct action",
  subtitle: "Associez chaque situation d'évacuation à la réponse correcte",
  subtitleEn: "Match each evacuation situation to the correct response",
  successMessage: "Excellent — vos réflexes d'évacuation sont calibrés !",
  successMessageEn: "Excellent — your evacuation reflexes are spot on!",
  pairs: [
    { left: "La porte est chaude au toucher", leftEn: "The door is hot to the touch", right: "Ne pas ouvrir — rebrousser chemin", rightEn: "Do not open — turn back" },
    { left: "Fumée dense dans le couloir", leftEn: "Dense smoke in the corridor", right: "S'accroupir — progresser sous la fumée", rightEn: "Crouch — move below the smoke" },
    { left: "L'ascenseur est disponible", leftEn: "The elevator is available", right: "Ignorer — prendre les escaliers de secours", rightEn: "Ignore — use the emergency stairs" },
    { left: "Une personne est manquante au rassemblement", leftEn: "Someone is missing at the assembly point", right: "Signaler immédiatement aux secours", rightEn: "Report immediately to fire services" },
    { left: "Le point de rassemblement est atteint", leftEn: "The assembly point is reached", right: "Se signaler au responsable évacuation", rightEn: "Report to the evacuation warden" },
  ],
};

// ── ORDER PUZZLE ───────────────────────────────────────────────
const m3_orderpuzzle: OrderPuzzleExercise = {
  type: "orderpuzzle",
  title: "Remettez la séquence de confinement dans l'ordre",
  titleEn: "Put the confinement sequence in the correct order",
  subtitle: "En cas d'incendie, l'ordre des actions est crucial",
  subtitleEn: "In a fire, the order of actions is critical",
  instruction: "Faites glisser les étapes pour reconstituer la bonne séquence",
  instructionEn: "Drag the steps to rebuild the correct sequence",
  successMessage: "Séquence de confinement maîtrisée !",
  successMessageEn: "Confinement sequence mastered!",
  pieces: [
    { id: "p4", label: "Déclencher l'alarme (777 / boîtier rouge)", labelEn: "Trigger the alarm (777 / red call point)", sublabel: "Dès le premier signe — toujours en premier", sublabelEn: "At the first sign — always first", correctPosition: 1 },
    { id: "p1", label: "Détecter le signal", labelEn: "Detect the signal", sublabel: "Fumée, odeur ou chaleur anormale", sublabelEn: "Smoke, smell or abnormal heat", correctPosition: 2 },
    { id: "p2", label: "Alerter les collègues", labelEn: "Alert colleagues", sublabel: "Sans panique, ton calme", sublabelEn: "Calmly, no panic", correctPosition: 3 },
    { id: "p3", label: "Fermer toutes les portes", labelEn: "Close all doors", sublabel: "Ralentit la propagation de 5x", sublabelEn: "Slows spread by 5x", correctPosition: 4 },
    { id: "p5", label: "Évacuer par les sorties de secours", labelEn: "Evacuate via emergency exits", sublabel: "Ne jamais prendre l'ascenseur", sublabelEn: "Never use the elevator", correctPosition: 5 },
    { id: "p6", label: "Rejoindre le point de rassemblement", labelEn: "Reach the assembly point", sublabel: "Se signaler au responsable", sublabelEn: "Report to the warden", correctPosition: 6 },
  ],
};

const ch2m7_orderpuzzle: OrderPuzzleExercise = {
  type: "orderpuzzle",
  title: "Procédure complète d'évacuation IBM",
  titleEn: "Full IBM Evacuation Procedure",
  subtitle: "Remettez les 7 étapes de la procédure dans le bon ordre",
  subtitleEn: "Put the 7 procedure steps in the correct order",
  instruction: "Faites glisser les étapes pour reconstituer la séquence officielle",
  instructionEn: "Drag the steps to rebuild the official sequence",
  successMessage: "Procédure d'évacuation IBM parfaitement maîtrisée !",
  successMessageEn: "IBM evacuation procedure perfectly mastered!",
  pieces: [
    { id: "e1", label: "Détecter et confirmer l'alerte", labelEn: "Detect and confirm the alert", sublabel: "Signal sonore ou visuel", sublabelEn: "Audible or visual signal", correctPosition: 1 },
    { id: "e2", label: "Composer le 777", labelEn: "Call 777", sublabel: "Sécurité IBM avant le 18", sublabelEn: "IBM Security before 18", correctPosition: 2 },
    { id: "e3", label: "Alerter les collègues à voix posée", labelEn: "Alert colleagues calmly", sublabel: "Pas de panique", sublabelEn: "No panic", correctPosition: 3 },
    { id: "e4", label: "Fermer les portes en partant", labelEn: "Close doors when leaving", sublabel: "Sans verrouiller", sublabelEn: "Without locking", correctPosition: 4 },
    { id: "e5", label: "Évacuer par les escaliers", labelEn: "Evacuate via stairs", sublabel: "Jamais l'ascenseur", sublabelEn: "Never the elevator", correctPosition: 5 },
    { id: "e6", label: "Vérifier les zones accessibles", labelEn: "Check all accessible areas", sublabel: "S'assurer que personne ne reste", sublabelEn: "Ensure no one is left behind", correctPosition: 6 },
    { id: "e7", label: "Se signaler au responsable évacuation", labelEn: "Report to the evacuation warden", sublabel: "Au point de rassemblement", sublabelEn: "At the assembly point", correctPosition: 7 },
  ],
};

// ── SERIOUS GAME ───────────────────────────────────────────────
const m7_seriousgame: SeriousGameExercise = {
  type: "seriousgame",
  title: "Réflexes Incendie — Challenge Chronométré",
  titleEn: "Fire Reflexes — Timed Challenge",
  subtitle: "3 vies · 6 situations · Décisions en temps réel",
  subtitleEn: "3 lives · 6 situations · Real-time decisions",
  successMessage: "Score Réflexes Expert — Tous les bons réflexes acquis !",
  successMessageEn: "Expert Reflex Score — All the right reflexes mastered!",
  rounds: [
    {
      situation: "14h30. L'alarme retentit. Une fumée légère entre par la porte. Un extincteur CO2 est à 3m. Que faites-vous EN PREMIER ?",
      situationEn: "2:30pm. The alarm sounds. Light smoke comes through the door. A CO2 extinguisher is 3m away. What do you do FIRST?",
      timeLimit: 10,
      actions: [
        { label: "Évaluer rapidement la situation (5 sec)", labelEn: "Quickly assess the situation (5 sec)", correct: true, feedback: "Correct. 5 secondes d'évaluation avant d'agir — c'est la règle IBM.", feedbackEn: "Correct. 5 seconds of assessment before acting — that's the IBM rule." },
        { label: "Prendre l'extincteur et chercher le feu", labelEn: "Grab the extinguisher and find the fire", correct: false, feedback: "Risqué. Sans évaluation, vous pourriez foncer vers un feu trop développé.", feedbackEn: "Risky. Without assessment, you could rush toward a fire that's already too large." },
        { label: "Rester à son bureau et attendre", labelEn: "Stay at your desk and wait", correct: false, feedback: "Erreur grave. L'inaction face à l'alarme est la pire réponse.", feedbackEn: "Serious mistake. Inaction when the alarm sounds is the worst response." },
        { label: "Appeler son manager pour confirmation", labelEn: "Call your manager for confirmation", correct: false, feedback: "Faux. En cas d'alarme, pas besoin de confirmation — agir immédiatement.", feedbackEn: "Wrong. When the alarm sounds, no confirmation needed — act immediately." },
      ],
    },
    {
      situation: "Vous approchez d'une porte. Elle est CHAUDE au toucher. De la fumée noire passe dessous.",
      situationEn: "You approach a door. It is HOT to the touch. Black smoke is coming from underneath.",
      timeLimit: 10,
      actions: [
        { label: "Ouvrir doucement pour évaluer", labelEn: "Open it slowly to assess", correct: false, feedback: "Erreur fatale. Porte chaude + fumée noire = feu développé. L'ouvrir aspire le feu vers vous.", feedbackEn: "Fatal mistake. Hot door + black smoke = developed fire. Opening it draws the fire toward you." },
        { label: "Ne pas ouvrir — rebrousser et évacuer", labelEn: "Don't open — turn back and evacuate", correct: true, feedback: "Décision vitale. Porte chaude = feu de l'autre côté. Retraite immédiate.", feedbackEn: "Vital decision. Hot door = fire on the other side. Immediate retreat." },
        { label: "Arroser la porte avec le CO2", labelEn: "Spray the door with CO2", correct: false, feedback: "Inutile. Le CO2 refroidit la surface mais ne change rien au feu de l'autre côté.", feedbackEn: "Useless. CO2 cools the surface but doesn't affect the fire on the other side." },
        { label: "Attendre devant la porte", labelEn: "Wait in front of the door", correct: false, feedback: "Dangereux. Rester expose à la chaleur et aux gaz toxiques.", feedbackEn: "Dangerous. Staying exposes you to heat and toxic gases." },
      ],
    },
    {
      situation: "Feu de câbles visible — taille d'une corbeille. Sortie dans votre dos à 4m. CO2 disponible. Que faites-vous ?",
      situationEn: "Visible cable fire — bin-sized. Exit is 4m behind you. CO2 available. What do you do?",
      timeLimit: 10,
      actions: [
        { label: "Intervenir avec le CO2 — PASS", labelEn: "Use the CO2 — PASS sequence", correct: true, feedback: "Correct. Toutes les conditions sont réunies : petit feu, CO2 adapté, sortie libre.", feedbackEn: "Correct. All conditions are met: small fire, suitable CO2, clear exit." },
        { label: "Évacuer directement sans intervenir", labelEn: "Evacuate directly without intervening", correct: false, feedback: "Acceptable mais sous-optimal. Le feu est contrôlable et les conditions sont réunies.", feedbackEn: "Acceptable but not optimal. The fire is controllable and conditions are right." },
        { label: "Appeler les pompiers d'abord", labelEn: "Call fire services first", correct: false, feedback: "Faux. Agir d'abord (max 30s), alerter ensuite. Le 777 puis le 18.", feedbackEn: "Wrong. Act first (max 30s), alert afterwards. 777 then 18." },
        { label: "Verser de l'eau sur les câbles", labelEn: "Pour water on the cables", correct: false, feedback: "Interdit. Jamais d'eau sur un feu électrique — risque d'électrocution.", feedbackEn: "Forbidden. Never use water on an electrical fire — electrocution risk." },
      ],
    },
    {
      situation: "Fumée envahit le couloir. Vous ne voyez plus la sortie. Quelle est votre position ?",
      situationEn: "Smoke fills the corridor. You can no longer see the exit. What position do you take?",
      timeLimit: 10,
      actions: [
        { label: "Rester debout, progresser rapidement", labelEn: "Stay upright and move quickly", correct: false, feedback: "Faux. Debout vous respirez la fumée chaude. La toxicité est mortelle en secondes.", feedbackEn: "Wrong. Standing, you breathe hot smoke. Toxicity is fatal within seconds." },
        { label: "S'accroupir et progresser sous la fumée", labelEn: "Crouch and move below the smoke", correct: true, feedback: "Exact. L'air respirable reste dans le tiers inférieur de la pièce.", feedbackEn: "Correct. Breathable air stays in the lower third of the space." },
        { label: "Faire demi-tour et retourner à son bureau", labelEn: "Turn back and return to your desk", correct: false, feedback: "Risqué. Mieux vaut progresser vers la sortie que rester dans le bâtiment.", feedbackEn: "Risky. Moving toward the exit is safer than staying in the building." },
        { label: "Ouvrir toutes les fenêtres pour aérer", labelEn: "Open all windows to ventilate", correct: false, feedback: "Faux. Ouvrir les fenêtres attire l'oxygène et intensifie l'incendie.", feedbackEn: "Wrong. Opening windows draws in oxygen and intensifies the fire." },
      ],
    },
    {
      situation: "Vous êtes au point de rassemblement. Une collègue est manquante. Que faites-vous ?",
      situationEn: "You are at the assembly point. A colleague is missing. What do you do?",
      timeLimit: 10,
      actions: [
        { label: "Retourner la chercher vous-même", labelEn: "Go back in to find her yourself", correct: false, feedback: "Interdit et dangereux. Retourner sans équipement = risque vital pour vous aussi.", feedbackEn: "Forbidden and dangerous. Going back without equipment = vital risk for you too." },
        { label: "Signaler immédiatement aux secours avec description et dernière localisation", labelEn: "Immediately report to fire services with description and last known location", correct: true, feedback: "Correct. Les secours ont l'équipement pour effectuer les recherches en sécurité.", feedbackEn: "Correct. Fire services have the equipment to search safely." },
        { label: "Attendre qu'elle arrive peut-être par un autre chemin", labelEn: "Wait for her to arrive by another route", correct: false, feedback: "Insuffisant. Signaler sans délai permet d'agir rapidement.", feedbackEn: "Insufficient. Immediate reporting enables rapid action." },
        { label: "L'appeler sur son téléphone portable", labelEn: "Call her mobile phone", correct: false, feedback: "Secondaire. Signaler d'abord aux secours, appel si possible en parallèle.", feedbackEn: "Secondary. Alert fire services first, call in parallel if possible." },
      ],
    },
    {
      situation: "L'extincteur est vide. Le feu ne recule pas. Vous êtes à 30 secondes d'intervention.",
      situationEn: "The extinguisher is empty. The fire is not retreating. You have been intervening for 30 seconds.",
      timeLimit: 10,
      actions: [
        { label: "Chercher un autre extincteur rapidement", labelEn: "Quickly find another extinguisher", correct: false, feedback: "Trop risqué. Après 30 secondes d'inefficacité, le feu est trop développé pour vous.", feedbackEn: "Too risky. After 30 seconds of no effect, the fire is too developed for you." },
        { label: "Reculer et évacuer immédiatement", labelEn: "Step back and evacuate immediately", correct: true, feedback: "Bonne décision. La règle IBM : si le feu ne recule pas en 30s — évacuer sans hésiter.", feedbackEn: "Good decision. IBM rule: if the fire doesn't retreat in 30s — evacuate without hesitation." },
        { label: "Continuer avec l'extincteur vide pour intimider le feu", labelEn: "Keep gesturing with the empty extinguisher", correct: false, feedback: "Absurde et dangereux. Un extincteur vide n'a aucun effet.", feedbackEn: "Absurd and dangerous. An empty extinguisher has no effect." },
        { label: "Appeler les collègues pour aider", labelEn: "Call colleagues to help", correct: false, feedback: "Faux. En urgence, évacuer seul et rapidement, pas grouper des gens non équipés.", feedbackEn: "Wrong. In an emergency, evacuate alone quickly — don't group unequipped people." },
      ],
    },
  ],
};

// ── Export map ─────────────────────────────────────────────────

// ── TipFlip cards ─────────────────────────────────────────────────

const m4_tipflip: TipFlipExercise = {
  type: "tipflip",
  title: "Le saviez-vous ? — Classes de feu",
  titleEn: "Did you know? — Fire Classes",
  subtitle: "Retournez chaque carte pour découvrir l'explication complète",
  subtitleEn: "Flip each card to discover the full explanation",
  cards: [
    {
      icon: "Flame", accent: "flame", stat: "5",
      label: "Classes de feu à maîtriser", labelEn: "Fire classes to master",
      category: "chiffre",
      tipTitle: "Pourquoi 5 classes ?", tipTitleEn: "Why 5 classes?",
      tip: "Chaque classe (A : solides, B : liquides, C : gaz, D : métaux, F : huiles) réclame un agent extincteur spécifique. Utiliser le mauvais agent peut propager le sinistre au lieu de l'éteindre.",
      tipEn: "Each class (A: solids, B: liquids, C: gases, D: metals, F: oils) requires a specific extinguishing agent. Using the wrong agent can spread the fire instead of extinguishing it.",
    },
    {
      icon: "Zap", accent: "alert", stat: "CO₂",
      label: "Seul agent pour feux électriques", labelEn: "Only agent for electrical fires",
      category: "astuce",
      tipTitle: "Jamais d'eau sur l'électrique", tipTitleEn: "Never water on electrical fires",
      tip: "L'eau est conductrice d'électricité — risque d'électrocution fatal. Le CO₂ étouffe la flamme sans conduire le courant et sans laisser de résidu sur les équipements.",
      tipEn: "Water conducts electricity — fatal electrocution risk. CO₂ smothers the flame without conducting current and leaves no residue on equipment.",
    },
    {
      icon: "Timer", accent: "clock", stat: "30s",
      label: "Durée d'un extincteur CO₂ 2kg", labelEn: "Duration of a 2kg CO₂ extinguisher",
      category: "chiffre",
      tipTitle: "Un extincteur s'épuise vite", tipTitleEn: "An extinguisher runs out fast",
      tip: "30 secondes de décharge maximum pour un extincteur CO₂ de 2kg. Si le feu n'est pas maîtrisé à ce stade, évacuez immédiatement. Persister en rechargement zéro est dangereux.",
      tipEn: "Maximum 30 seconds of discharge for a 2kg CO₂ extinguisher. If the fire is not under control at that point, evacuate immediately. Persisting with an empty extinguisher is dangerous.",
    },
    {
      icon: "Target", accent: "shield", stat: "2–3m",
      label: "Distance idéale d'intervention", labelEn: "Ideal intervention distance",
      category: "astuce",
      tipTitle: "Ni trop près, ni trop loin", tipTitleEn: "Not too close, not too far",
      tip: "Le CO₂ sort à -78°C. Trop proche = brûlure par le froid. Trop loin = perte d'efficacité. 2 à 3 mètres du foyer est la distance qui combine sécurité et efficacité maximale.",
      tipEn: "CO₂ is discharged at -78°C. Too close = cold burns. Too far = loss of effectiveness. 2–3 metres from the fire combines safety and maximum effectiveness.",
    },
  ],
};

const m6_tipflip: TipFlipExercise = {
  type: "tipflip",
  title: "Le saviez-vous ? — Intervenir ou évacuer",
  titleEn: "Did you know? — Intervene or evacuate",
  subtitle: "Retournez chaque carte pour découvrir l'explication complète",
  subtitleEn: "Flip each card to discover the full explanation",
  cards: [
    {
      icon: "Clock", accent: "clock", stat: "10s",
      label: "La règle de décision", labelEn: "The decision rule",
      category: "chiffre",
      tipTitle: "Observer · Évaluer · Décider", tipTitleEn: "Observe · Assess · Decide",
      tip: "10 secondes maximum pour prendre votre décision. Observer la taille du feu, évaluer l'agent disponible, décider. Au-delà, le feu double de volume — vos options se réduisent.",
      tipEn: "Maximum 10 seconds to make your decision. Observe fire size, assess available agent, decide. Beyond that, the fire doubles in volume — your options shrink.",
    },
    {
      icon: "CheckSquare", accent: "shield", stat: "3",
      label: "Critères pour intervenir sans risque", labelEn: "Criteria for safe intervention",
      category: "astuce",
      tipTitle: "Les 3 conditions obligatoires", tipTitleEn: "The 3 mandatory conditions",
      tip: "Feu inférieur à une corbeille à papier, extincteur adapté à portée, sortie dégagée dans le dos. Si UN seul critère manque, l'intervention est interdite. Évacuez.",
      tipEn: "Fire smaller than a wastepaper bin, suitable extinguisher within reach, clear exit behind you. If ONE condition is missing, intervention is forbidden. Evacuate.",
    },
    {
      icon: "AlertTriangle", accent: "alert", stat: "80%",
      label: "Des victimes auraient pu survivre", labelEn: "Of victims could have survived",
      category: "funfact",
      tipTitle: "L'hésitation tue", tipTitleEn: "Hesitation kills",
      tip: "Dans la majorité des incendies mortels d'entreprise, une évacuation plus rapide aurait changé l'issue. Le doute doit toujours conduire à l'évacuation — jamais à l'attente.",
      tipEn: "In the majority of fatal workplace fires, faster evacuation would have changed the outcome. Doubt must always lead to evacuation — never to waiting.",
    },
    {
      icon: "Eye", accent: "eye", stat: "1m80",
      label: "Hauteur où la fumée asphyxie", labelEn: "Height where smoke suffocates",
      category: "funfact",
      tipTitle: "Restez en dessous", tipTitleEn: "Stay below it",
      tip: "En dessous de 1m80, l'air reste respirable plus longtemps. Si vous traversez un couloir enfumé pour évacuer, baissez-vous. La fumée monte — l'air pur reste en bas.",
      tipEn: "Below 1.8m, air remains breathable longer. If crossing a smoky corridor to evacuate, crouch down. Smoke rises — clean air stays low.",
    },
  ],
};

const ch2m3_tipflip: TipFlipExercise = {
  type: "tipflip",
  title: "Le saviez-vous ? — Fermer les portes",
  titleEn: "Did you know? — Closing doors",
  subtitle: "Retournez chaque carte pour découvrir l'explication complète",
  subtitleEn: "Flip each card to discover the full explanation",
  cards: [
    {
      icon: "DoorClosed", accent: "flame", stat: "5×",
      label: "Plus vite avec porte ouverte", labelEn: "Faster spread with open door",
      category: "chiffre",
      tipTitle: "La porte comme bouclier", tipTitleEn: "The door as a shield",
      tip: "Une porte coupe-feu ouverte permet au feu de se propager 5 fois plus rapidement. Fermer une porte en fuyant est souvent plus efficace qu'utiliser un extincteur.",
      tipEn: "An open fire door allows fire to spread 5 times faster. Closing a door while evacuating is often more effective than using an extinguisher.",
    },
    {
      icon: "Shield", accent: "shield", stat: "30min",
      label: "Résistance d'une porte EI30 fermée", labelEn: "Resistance of a closed EI30 door",
      category: "chiffre",
      tipTitle: "Calée ouverte : protection zéro", tipTitleEn: "Propped open: zero protection",
      tip: "Une porte coupe-feu EI30 résiste 30 minutes au feu et à la fumée. Fermée, elle protège les voies d'évacuation. Calée ouverte, elle devient un accélérateur de sinistre.",
      tipEn: "A closed EI30 fire door resists fire and smoke for 30 minutes. Propped open, it becomes a fire accelerator with zero protection.",
    },
    {
      icon: "ArrowRight", accent: "clock", stat: "EXIT",
      label: "Première étape de la séquence", labelEn: "First step of the sequence",
      category: "astuce",
      tipTitle: "La séquence ne s'inverse pas", tipTitleEn: "The sequence is not reversible",
      tip: "SORS d'abord, FERME ensuite, SIGNALE après. Ne jamais rester dans la pièce pour fermer avant de sortir. Ne jamais rouvrir pour récupérer des affaires — jamais d'exception.",
      tipEn: "EXIT first, CLOSE next, SIGNAL after. Never stay in the room to close before going out. Never reopen to retrieve belongings — no exceptions.",
    },
    {
      icon: "XCircle", accent: "alert", stat: "0",
      label: "Exception à la règle de fermeture", labelEn: "Exceptions to the closing rule",
      category: "astuce",
      tipTitle: "Règle absolue sans exception", tipTitleEn: "Absolute rule with no exceptions",
      tip: "Zéro exception. Toutes les portes doivent être fermées lors d'une évacuation, quelle que soit la situation. Même si vous pensez revenir vite. Même si la pièce est vide.",
      tipEn: "Zero exceptions. All doors must be closed during an evacuation, whatever the situation. Even if you expect to return quickly. Even if the room is empty.",
    },
  ],
};

const ch2m5_tipflip: TipFlipExercise = {
  type: "tipflip",
  title: "Le saviez-vous ? — Faire face à la fumée",
  titleEn: "Did you know? — Dealing with smoke",
  subtitle: "Retournez chaque carte pour découvrir l'explication complète",
  subtitleEn: "Flip each card to discover the full explanation",
  cards: [
    {
      icon: "Clock", accent: "alert", stat: "3min",
      label: "Pour perdre connaissance", labelEn: "To lose consciousness",
      category: "chiffre",
      tipTitle: "La fumée agit en silence", tipTitleEn: "Smoke acts silently",
      tip: "La fumée d'incendie contient du monoxyde de carbone, du CO₂ et des gaz toxiques. En 3 minutes d'exposition dans une zone enfumée, la perte de conscience est possible.",
      tipEn: "Fire smoke contains carbon monoxide, CO₂ and toxic gases. After 3 minutes of exposure in a smoky area, loss of consciousness is possible.",
    },
    {
      icon: "TrendingDown", accent: "flame", stat: "60%",
      label: "Des morts par intoxication", labelEn: "Of deaths from smoke inhalation",
      category: "funfact",
      tipTitle: "La fumée tue avant le feu", tipTitleEn: "Smoke kills before the flames",
      tip: "Plus de 60% des victimes d'incendie meurent d'intoxication et non des flammes. Fuir la fumée est la priorité absolue — même si vous ne voyez pas de feu directement.",
      tipEn: "Over 60% of fire victims die from smoke inhalation, not flames. Escaping smoke is the absolute priority — even if you can't see any fire directly.",
    },
    {
      icon: "Wind", accent: "zap", stat: "30m/min",
      label: "Vitesse de montée de la fumée", labelEn: "Speed at which smoke rises",
      category: "chiffre",
      tipTitle: "Descendez toujours", tipTitleEn: "Always go down",
      tip: "La fumée monte à environ 30 mètres par minute verticalement. Un immeuble de 6 étages s'enfume en 2 minutes. En cas d'incendie, descendre est toujours plus sûr que monter.",
      tipEn: "Smoke rises at around 30 metres per minute vertically. A 6-storey building fills with smoke in 2 minutes. In a fire, going down is always safer than going up.",
    },
    {
      icon: "ArrowDown", accent: "shield", stat: "0.5m",
      label: "Zone d'air respirable au sol", labelEn: "Breathable air zone at floor level",
      category: "astuce",
      tipTitle: "Rampez si vous le devez", tipTitleEn: "Crawl if you must",
      tip: "À 50 cm du sol, l'air reste respirable plusieurs minutes supplémentaires. En cas de couloir enfumé : baissez-vous, protégez votre bouche avec un tissu humide si possible, avancez vite.",
      tipEn: "At 50cm from the floor, air remains breathable for several extra minutes. In a smoky corridor: get low, cover your mouth with a damp cloth if possible, move quickly.",
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
        { key: "C", label: "Appeler le 777 (Sécurité IBM)", labelEn: "Call 777 (IBM Security)" },
        { key: "D", label: "Attendre de voir les flammes", labelEn: "Wait to see flames" },
      ],
      correctKey: "C",
      explanation: "Le protocole IBM impose d'appeler le 777 (Sécurité interne) en premier — avant le 18. La sécurité IBM connaît les plans du bâtiment et coordonne l'intervention.",
      explanationEn: "IBM protocol requires calling 777 (internal Security) first — before 18. IBM Security knows the building plans and coordinates the response.",
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
      id: "mm3", label: "Appeler le 777", labelEn: "Call 777",
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
