// ── Alertes situationnelles ─────────────────────────────────────
// Popups surprises simulant des emails/messages IBM pendant un module.
// Apparaissent après ~20 secondes de lecture pour tester la réactivité.

export interface AlertChoice {
  key: string;
  label: string;
  labelEn?: string;
  correct: boolean;
  feedback: string;
  feedbackEn?: string;
}

export interface SituationAlert {
  moduleId: string;
  style: "email" | "message"; // email = IBM Mail, message = IBM Slack/Teams
  urgency: "critical" | "high" | "medium";
  // Sender
  senderName: string;
  senderRole: string;
  senderRoleEn?: string;
  senderInitials: string;
  senderColor: string;
  // Email fields
  subject: string;
  subjectEn?: string;
  body: string;
  bodyEn?: string;
  // Question
  question: string;
  questionEn?: string;
  choices: AlertChoice[];
}

export const SITUATION_ALERTS: SituationAlert[] = [
  // ── ch1-m1 : Détecter un départ de feu ──────────────────────
  {
    moduleId: "ch1-m1",
    style: "email",
    urgency: "critical",
    senderName: "Marc Dupont",
    senderRole: "Responsable Sécurité IBM France",
    senderRoleEn: "IBM France Security Officer",
    senderInitials: "MD",
    senderColor: "#da1e28",
    subject: "ALERTE — Odeur suspecte signalée Bâtiment B, Étage 3",
    subjectEn: "ALERT — Suspicious smell reported Building B, Floor 3",
    body:
      "Un collaborateur signale une forte odeur de brûlé provenant de la salle électrique au 3ème étage du Bâtiment B. " +
      "Aucune alarme n'a encore retenti. Le détecteur de cette zone est en maintenance depuis hier.\n\n" +
      "Vous travaillez à l'étage 2. Vous sentez également quelque chose d'inhabituel.",
    bodyEn:
      "A colleague reports a strong burning smell coming from the electrical room on the 3rd floor of Building B. " +
      "No alarm has gone off yet. The detector in that area has been under maintenance since yesterday.\n\n" +
      "You are on floor 2. You also notice something unusual.",
    question: "Quelle est votre priorité immédiate ?",
    questionEn: "What is your immediate priority?",
    choices: [
      {
        key: "A",
        label: "Monter au 3ème vérifier la source",
        labelEn: "Go up to the 3rd floor to check the source",
        correct: false,
        feedback: "Ne jamais chercher la source seul — c'est le rôle des secours. Vous pourriez vous exposer à un danger.",
        feedbackEn: "Never search for the source alone — that is the role of emergency services. You could expose yourself to danger.",
      },
      {
        key: "B",
        label: "Appeler le 777 et signaler la situation",
        labelEn: "Call 777 and report the situation",
        correct: true,
        feedback: "Correct. Alerter le 777 en priorité avec votre localisation exacte. La sécurité IBM prend le relais.",
        feedbackEn: "Correct. Alert 777 first with your exact location. IBM Security takes over from there.",
      },
      {
        key: "C",
        label: "Ouvrir les fenêtres pour aérer",
        labelEn: "Open the windows to ventilate",
        correct: false,
        feedback: "Mauvais réflexe. L'air entrant peut attiser le feu. Alertez d'abord, agissez ensuite si formé.",
        feedbackEn: "Wrong reflex. Incoming air can fuel the fire. Alert first, act only if trained.",
      },
      {
        key: "D",
        label: "Attendre que l'alarme se déclenche",
        labelEn: "Wait for the alarm to go off",
        correct: false,
        feedback: "Le détecteur est en maintenance — il ne se déclenchera pas. Tout signal suspect = alerte manuelle immédiate.",
        feedbackEn: "The detector is under maintenance — it won't go off. Any suspicious signal = immediate manual alert.",
      },
    ],
  },

  // ── ch1-m3 : Propagation et confinement ─────────────────────
  {
    moduleId: "ch1-m3",
    style: "message",
    urgency: "critical",
    senderName: "Laura Mendes",
    senderRole: "Collègue — Open Space RH",
    senderRoleEn: "Colleague — HR Open Space",
    senderInitials: "LM",
    senderColor: "#b45309",
    subject: "#alerte-batiment",
    subjectEn: "#building-alert",
    body:
      "🚨 Feu dans la salle de reprographie au fond du couloir ! J'ai déclenché l'alarme. " +
      "La porte est ouverte, la fumée commence à se propager dans le couloir. " +
      "Tu es entre la salle en feu et la sortie de secours.",
    bodyEn:
      "🚨 Fire in the copy room at the end of the corridor! I've triggered the alarm. " +
      "The door is open, smoke is starting to spread into the hallway. " +
      "You are between the burning room and the emergency exit.",
    question: "Que faites-vous en passant devant la salle en feu ?",
    questionEn: "What do you do as you pass by the burning room?",
    choices: [
      {
        key: "A",
        label: "Laisser la porte ouverte pour ventiler",
        labelEn: "Leave the door open to ventilate",
        correct: false,
        feedback: "Erreur grave. Une porte ouverte multiplie par 5 la vitesse de propagation du feu.",
        feedbackEn: "Serious mistake. An open door multiplies fire spread speed by 5.",
      },
      {
        key: "B",
        label: "Fermer la porte et continuer vers la sortie",
        labelEn: "Close the door and continue toward the exit",
        correct: true,
        feedback: "Parfait. Fermer la porte confine le feu et vous protège. Continuez vers la sortie sans courir.",
        feedbackEn: "Perfect. Closing the door contains the fire and protects you. Continue toward the exit calmly.",
      },
      {
        key: "C",
        label: "Entrer éteindre le feu avec l'extincteur",
        labelEn: "Go in and extinguish the fire",
        correct: false,
        feedback: "Non — la fumée est déjà présente. Si le feu est trop avancé, intervenir seul est dangereux. Évacuez.",
        feedbackEn: "No — smoke is already present. If the fire is too advanced, acting alone is dangerous. Evacuate.",
      },
      {
        key: "D",
        label: "Crier pour prévenir tout le monde",
        labelEn: "Shout to warn everyone",
        correct: false,
        feedback: "L'alarme est déjà déclenchée. Crier crée de la panique. Évacuez calmement en fermant les portes.",
        feedbackEn: "The alarm is already triggered. Shouting creates panic. Evacuate calmly and close the doors.",
      },
    ],
  },

  // ── ch1-m5 : Utiliser un extincteur ─────────────────────────
  {
    moduleId: "ch1-m5",
    style: "message",
    urgency: "high",
    senderName: "Thomas Vidal",
    senderRole: "Technicien — Datacenter IBM",
    senderRoleEn: "Technician — IBM Datacenter",
    senderInitials: "TV",
    senderColor: "#0D47A1",
    subject: "#urgence-datacenter",
    subjectEn: "#datacenter-emergency",
    body:
      "Thomas Vidal : Petit départ de feu sur un câble d'alimentation dans la salle serveur. " +
      "C'est encore gérable, y'a un extincteur CO2 juste à côté. " +
      "Je suis seul. À quelle distance je dois me mettre ?",
    bodyEn:
      "Thomas Vidal: Small fire on a power cable in the server room. " +
      "It's still manageable, there's a CO2 extinguisher right next to it. " +
      "I'm alone. What distance should I stand at?",
    question: "Quelle instruction donnez-vous à Thomas ?",
    questionEn: "What instruction do you give Thomas?",
    choices: [
      {
        key: "A",
        label: "Se mettre à 50 cm du foyer pour plus d'efficacité",
        labelEn: "Stand 50 cm from the fire for better accuracy",
        correct: false,
        feedback: "Trop proche — dangereux. Le CO2 peut provoquer des engelures et la chaleur est intense à cette distance.",
        feedbackEn: "Too close — dangerous. CO2 can cause frostbite and the heat is intense at that range.",
      },
      {
        key: "B",
        label: "Viser depuis 2 à 3 mètres, séquence PASS",
        labelEn: "Aim from 2–3 metres, PASS sequence",
        correct: true,
        feedback: "Correct. 2–3 mètres est la distance optimale pour un CO2. Pull · Aim · Squeeze · Sweep.",
        feedbackEn: "Correct. 2–3 metres is the optimal range for CO2. Pull · Aim · Squeeze · Sweep.",
      },
      {
        key: "C",
        label: "Utiliser de l'eau — c'est plus sûr",
        labelEn: "Use water — it's safer",
        correct: false,
        feedback: "JAMAIS d'eau sur un feu électrique. Risque d'électrocution. CO2 uniquement pour les feux de câbles.",
        feedbackEn: "NEVER use water on an electrical fire. Risk of electrocution. CO2 only for cable fires.",
      },
      {
        key: "D",
        label: "Évacuer sans intervenir",
        labelEn: "Evacuate without intervening",
        correct: false,
        feedback: "Si le feu est encore petit et qu'une sortie est dans le dos, intervenir est possible. Mais appeler le 777 d'abord.",
        feedbackEn: "If the fire is still small and an exit is behind you, intervening is possible. But call 777 first.",
      },
    ],
  },

  // ── ch1-m7 : Simulation incendie ────────────────────────────
  {
    moduleId: "ch1-m7",
    style: "email",
    urgency: "critical",
    senderName: "Sécurité IBM France",
    senderRole: "security.france@ibm.com",
    senderRoleEn: "security.france@ibm.com",
    senderInitials: "SI",
    senderColor: "#da1e28",
    subject: "SIMULATION EN COURS — Réponse attendue sous 60 secondes",
    subjectEn: "SIMULATION IN PROGRESS — Response expected within 60 seconds",
    body:
      "Dans le cadre de l'exercice en cours, le scénario suivant s'applique :\n\n" +
      "Alarme déclenchée — 14h22. Vous êtes au 4ème étage, zone A. " +
      "Un collègue vous dit : « C'est sûrement un exercice, j'attends ici. »\n\n" +
      "La procédure IBM est formelle : toute alarme = évacuation réelle jusqu'à preuve du contraire.",
    bodyEn:
      "As part of the ongoing drill, the following scenario applies:\n\n" +
      "Alarm triggered — 14:22. You are on the 4th floor, zone A. " +
      "A colleague says: 'It's probably just a drill, I'll wait here.'\n\n" +
      "IBM procedure is clear: every alarm = real evacuation until proven otherwise.",
    question: "Que répondez-vous à votre collègue ?",
    questionEn: "What do you say to your colleague?",
    choices: [
      {
        key: "A",
        label: "\"Tu as raison, ça doit être un test.\"",
        labelEn: "\"You're right, it's probably a test.\"",
        correct: false,
        feedback: "Mauvaise posture. Ne jamais présumer qu'une alarme est fausse. Le risque est trop élevé.",
        feedbackEn: "Wrong attitude. Never assume an alarm is false. The risk is too high.",
      },
      {
        key: "B",
        label: "\"On évacue maintenant — exercice ou pas.\"",
        labelEn: "\"We evacuate now — drill or not.\"",
        correct: true,
        feedback: "Correct. La règle IBM est claire : toute alarme = évacuation immédiate. Jamais d'exception.",
        feedbackEn: "Correct. IBM rule is clear: every alarm = immediate evacuation. No exceptions.",
      },
      {
        key: "C",
        label: "\"Appelle la sécurité pour confirmer d'abord.\"",
        labelEn: "\"Call security to confirm first.\"",
        correct: false,
        feedback: "Trop lent. Le temps d'appeler, une situation réelle peut évoluer dangereusement. Évacuez d'abord.",
        feedbackEn: "Too slow. While calling, a real situation can escalate dangerously. Evacuate first.",
      },
      {
        key: "D",
        label: "\"Je surveille depuis la fenêtre pour voir.\"",
        labelEn: "\"I'll watch from the window to check.\"",
        correct: false,
        feedback: "Les fenêtres ne donnent pas d'info fiable sur la source du feu. Évacuez immédiatement.",
        feedbackEn: "Windows give no reliable information about the fire source. Evacuate immediately.",
      },
    ],
  },

  // ── ch2-m2 : Garder son calme et guider ─────────────────────
  {
    moduleId: "ch2-m2",
    style: "message",
    urgency: "high",
    senderName: "Isabelle Renard",
    senderRole: "Assistante — Accueil principal",
    senderRoleEn: "Assistant — Main Reception",
    senderInitials: "IR",
    senderColor: "#198038",
    subject: "#evacuation-live",
    subjectEn: "#evacuation-live",
    body:
      "Isabelle Renard : L'alarme vient de retentir. Je suis à l'accueil, il y a environ 20 visiteurs qui paniquent " +
      "et se précipitent tous vers la même porte. Une personne a commencé à crier. " +
      "Je ne sais pas quoi faire, j'ai peur de perdre le contrôle de la situation.",
    bodyEn:
      "Isabelle Renard: The alarm just went off. I'm at reception, there are about 20 visitors panicking " +
      "and all rushing toward the same door. Someone has started screaming. " +
      "I don't know what to do, I'm afraid I'll lose control of the situation.",
    question: "Quelle est votre première action pour aider Isabelle ?",
    questionEn: "What is your first action to help Isabelle?",
    choices: [
      {
        key: "A",
        label: "Lui dire de crier plus fort pour être entendue",
        labelEn: "Tell her to shout louder to be heard",
        correct: false,
        feedback: "Crier aggrave la panique collective. Une voix calme et ferme est bien plus efficace.",
        feedbackEn: "Shouting makes collective panic worse. A calm, firm voice is far more effective.",
      },
      {
        key: "B",
        label: "Lui conseiller de parler fort, calmement, et indiquer une direction claire",
        labelEn: "Advise her to speak loudly, calmly, and give a clear direction",
        correct: true,
        feedback: "Correct. Voix forte + calme + directive simple : « Par ici, suivez-moi, on sort calmement. » La clarté rassure.",
        feedbackEn: "Correct. Loud + calm + simple directive: 'This way, follow me, we leave calmly.' Clarity reassures.",
      },
      {
        key: "C",
        label: "Lui dire de se mettre de côté et laisser les gens partir",
        labelEn: "Tell her to step aside and let people leave",
        correct: false,
        feedback: "Sans guidance, les visiteurs peuvent prendre de mauvaises sorties. La présence active d'un référent est cruciale.",
        feedbackEn: "Without guidance, visitors may take wrong exits. Active leadership is critical.",
      },
      {
        key: "D",
        label: "Appeler la sécurité pour qu'ils gèrent",
        labelEn: "Call security to handle it",
        correct: false,
        feedback: "La sécurité est déjà alertée par l'alarme. Sur le terrain, c'est Isabelle qui peut agir immédiatement.",
        feedbackEn: "Security is already alerted by the alarm. On the ground, Isabelle is the one who can act immediately.",
      },
    ],
  },

  // ── ch2-m4 : Vérifier que personne ne reste ─────────────────
  {
    moduleId: "ch2-m4",
    style: "email",
    urgency: "critical",
    senderName: "Pierre Legrand",
    senderRole: "Responsable d'étage — Zone 4B",
    senderRoleEn: "Floor Warden — Zone 4B",
    senderInitials: "PL",
    senderColor: "#7c3aed",
    subject: "URGENT — Collègue non sorti après évacuation",
    subjectEn: "URGENT — Colleague not out after evacuation",
    body:
      "Au point de rassemblement, nous faisons le compte : Nadia Kowalski (Équipe Projets) est absente. " +
      "Son badge indique qu'elle était présente ce matin. " +
      "La fumée commence à atteindre le 2ème étage. Les pompiers arrivent dans 4 minutes.",
    bodyEn:
      "At the assembly point, we are doing a headcount: Nadia Kowalski (Projects Team) is missing. " +
      "Her badge shows she was in the building this morning. " +
      "Smoke is beginning to reach the 2nd floor. Fire services arrive in 4 minutes.",
    question: "Que faites-vous immédiatement ?",
    questionEn: "What do you do immediately?",
    choices: [
      {
        key: "A",
        label: "Retourner dans le bâtiment la chercher seul",
        labelEn: "Go back into the building to find her alone",
        correct: false,
        feedback: "Jamais. Retourner seul dans un bâtiment enfumé met deux vies en danger au lieu d'une.",
        feedbackEn: "Never. Going back alone into a smoky building puts two lives at risk instead of one.",
      },
      {
        key: "B",
        label: "Signaler l'information aux pompiers à leur arrivée",
        labelEn: "Report the information to fire services when they arrive",
        correct: true,
        feedback: "Correct. Donnez le nom, l'étage habituel et l'heure du dernier badge aux pompiers. C'est leur mission d'intervenir.",
        feedbackEn: "Correct. Give the name, usual floor and last badge time to fire services. Intervention is their role.",
      },
      {
        key: "C",
        label: "Attendre qu'elle sorte d'elle-même",
        labelEn: "Wait for her to come out on her own",
        correct: false,
        feedback: "Elle est peut-être inconsciente ou piégée. L'inaction peut lui coûter la vie. Signalez immédiatement.",
        feedbackEn: "She may be unconscious or trapped. Inaction could cost her life. Report immediately.",
      },
      {
        key: "D",
        label: "Appeler son téléphone",
        labelEn: "Call her phone",
        correct: false,
        feedback: "Utile en parallèle, mais la priorité est de signaler aux pompiers avec toutes les infos disponibles.",
        feedbackEn: "Useful in parallel, but the priority is to alert fire services with all available information.",
      },
    ],
  },

  // ── ch2-m6 : Escaliers ou espace sécurisé ───────────────────
  {
    moduleId: "ch2-m6",
    style: "message",
    urgency: "high",
    senderName: "Kevin Morin",
    senderRole: "Développeur — Étage 6",
    senderRoleEn: "Developer — Floor 6",
    senderInitials: "KM",
    senderColor: "#b45309",
    subject: "#evacuation-live",
    subjectEn: "#evacuation-live",
    body:
      "Kevin Morin : Alarme déclenchée au 6ème. J'ai un collègue en fauteuil roulant avec moi. " +
      "L'ascenseur est coupé. L'escalier de secours est à 30 mètres mais il y a beaucoup de fumée dans le couloir. " +
      "Qu'est-ce qu'on fait ?",
    bodyEn:
      "Kevin Morin: Alarm triggered on floor 6. I have a colleague in a wheelchair with me. " +
      "The elevator is disabled. The emergency staircase is 30 metres away but there's heavy smoke in the corridor. " +
      "What do we do?",
    question: "Quelle est la bonne procédure pour Kevin et son collègue ?",
    questionEn: "What is the correct procedure for Kevin and his colleague?",
    choices: [
      {
        key: "A",
        label: "Attendre l'ascenseur — la coupure est peut-être temporaire",
        labelEn: "Wait for the elevator — the cut may be temporary",
        correct: false,
        feedback: "En cas d'incendie, l'ascenseur ne doit JAMAIS être utilisé. Il peut tomber en panne ou s'ouvrir sur l'étage en feu.",
        feedbackEn: "During a fire, the elevator must NEVER be used. It can break down or open onto the burning floor.",
      },
      {
        key: "B",
        label: "Se diriger vers l'espace d'attente sécurisé et appeler le 777",
        labelEn: "Head to the safe waiting area and call 777",
        correct: true,
        feedback: "Correct. L'espace d'attente sécurisé (palier d'escalier coupe-feu) est prévu pour les PMR. Les pompiers viendront.",
        feedbackEn: "Correct. The safe waiting area (fire-door staircase landing) is designed for mobility-impaired persons. Fire services will come.",
      },
      {
        key: "C",
        label: "Descendre le fauteuil dans les escaliers à deux",
        labelEn: "Carry the wheelchair down the stairs together",
        correct: false,
        feedback: "Dangereux sans formation spécifique. Le risque de chute est élevé. L'espace sécurisé est la bonne option.",
        feedbackEn: "Dangerous without specific training. Fall risk is high. The safe waiting area is the right option.",
      },
      {
        key: "D",
        label: "Laisser le collègue en fauteuil et descendre chercher de l'aide",
        labelEn: "Leave the colleague in the wheelchair and go find help",
        correct: false,
        feedback: "Ne pas quitter la personne seule. Restez avec elle dans l'espace sécurisé et appelez le 777.",
        feedbackEn: "Never leave the person alone. Stay with them in the safe waiting area and call 777.",
      },
    ],
  },
];

// Map pour accès rapide par moduleId
export const ALERT_BY_MODULE: Record<string, SituationAlert> = Object.fromEntries(
  SITUATION_ALERTS.map((a) => [a.moduleId, a])
);
