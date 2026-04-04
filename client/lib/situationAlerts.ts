// ── Alertes situationnelles ─────────────────────────────────────
// Popups surprises simulant des emails/messages IBM pendant un module.
// Apparaissent après ~20 secondes de lecture pour tester la réactivité.

export interface AlertChoice {
  key: string;
  label: string;
  correct: boolean;
  feedback: string;
}

export interface SituationAlert {
  moduleId: string;
  style: "email" | "message"; // email = IBM Mail, message = IBM Slack/Teams
  urgency: "critical" | "high" | "medium";
  // Sender
  senderName: string;
  senderRole: string;
  senderInitials: string;
  senderColor: string;
  // Email fields
  subject: string;
  body: string;
  // Question
  question: string;
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
    senderInitials: "MD",
    senderColor: "#da1e28",
    subject: "ALERTE — Odeur suspecte signalée Bâtiment B, Étage 3",
    body:
      "Un collaborateur signale une forte odeur de brûlé provenant de la salle électrique au 3ème étage du Bâtiment B. " +
      "Aucune alarme n'a encore retenti. Le détecteur de cette zone est en maintenance depuis hier.\n\n" +
      "Vous travaillez à l'étage 2. Vous sentez également quelque chose d'inhabituel.",
    question: "Quelle est votre priorité immédiate ?",
    choices: [
      {
        key: "A",
        label: "Monter au 3ème vérifier la source",
        correct: false,
        feedback: "Ne jamais chercher la source seul — c'est le rôle des secours. Vous pourriez vous exposer à un danger.",
      },
      {
        key: "B",
        label: "Appeler le 22 22 et signaler la situation",
        correct: true,
        feedback: "Correct. Alerter le 22 22 en priorité avec votre localisation exacte. La sécurité IBM prend le relais.",
      },
      {
        key: "C",
        label: "Ouvrir les fenêtres pour aérer",
        correct: false,
        feedback: "Mauvais réflexe. L'air entrant peut attiser le feu. Alertez d'abord, agissez ensuite si formé.",
      },
      {
        key: "D",
        label: "Attendre que l'alarme se déclenche",
        correct: false,
        feedback: "Le détecteur est en maintenance — il ne se déclenchera pas. Tout signal suspect = alerte manuelle immédiate.",
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
    senderInitials: "LM",
    senderColor: "#b45309",
    subject: "#alerte-batiment",
    body:
      "🚨 Feu dans la salle de reprographie au fond du couloir ! J'ai déclenché l'alarme. " +
      "La porte est ouverte, la fumée commence à se propager dans le couloir. " +
      "Tu es entre la salle en feu et la sortie de secours.",
    question: "Que faites-vous en passant devant la salle en feu ?",
    choices: [
      {
        key: "A",
        label: "Laisser la porte ouverte pour ventiler",
        correct: false,
        feedback: "Erreur grave. Une porte ouverte multiplie par 5 la vitesse de propagation du feu.",
      },
      {
        key: "B",
        label: "Fermer la porte et continuer vers la sortie",
        correct: true,
        feedback: "Parfait. Fermer la porte confine le feu et vous protège. Continuez vers la sortie sans courir.",
      },
      {
        key: "C",
        label: "Entrer éteindre le feu avec l'extincteur",
        correct: false,
        feedback: "Non — la fumée est déjà présente. Si le feu est trop avancé, intervenir seul est dangereux. Évacuez.",
      },
      {
        key: "D",
        label: "Crier pour prévenir tout le monde",
        correct: false,
        feedback: "L'alarme est déjà déclenchée. Crier crée de la panique. Évacuez calmement en fermant les portes.",
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
    senderInitials: "TV",
    senderColor: "#0D47A1",
    subject: "#urgence-datacenter",
    body:
      "Thomas Vidal : Petit départ de feu sur un câble d'alimentation dans la salle serveur. " +
      "C'est encore gérable, y'a un extincteur CO2 juste à côté. " +
      "Je suis seul. À quelle distance je dois me mettre ?",
    question: "Quelle instruction donnez-vous à Thomas ?",
    choices: [
      {
        key: "A",
        label: "Se mettre à 50 cm du foyer pour plus d'efficacité",
        correct: false,
        feedback: "Trop proche — dangereux. Le CO2 peut provoquer des engelures et la chaleur est intense à cette distance.",
      },
      {
        key: "B",
        label: "Viser depuis 2 à 3 mètres, séquence PASS",
        correct: true,
        feedback: "Correct. 2–3 mètres est la distance optimale pour un CO2. Pull · Aim · Squeeze · Sweep.",
      },
      {
        key: "C",
        label: "Utiliser de l'eau — c'est plus sûr",
        correct: false,
        feedback: "JAMAIS d'eau sur un feu électrique. Risque d'électrocution. CO2 uniquement pour les feux de câbles.",
      },
      {
        key: "D",
        label: "Évacuer sans intervenir",
        correct: false,
        feedback: "Si le feu est encore petit et qu'une sortie est dans le dos, intervenir est possible. Mais appeler le 22 22 d'abord.",
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
    senderInitials: "SI",
    senderColor: "#da1e28",
    subject: "SIMULATION EN COURS — Réponse attendue sous 60 secondes",
    body:
      "Dans le cadre de l'exercice en cours, le scénario suivant s'applique :\n\n" +
      "Alarme déclenchée — 14h22. Vous êtes au 4ème étage, zone A. " +
      "Un collègue vous dit : « C'est sûrement un exercice, j'attends ici. »\n\n" +
      "La procédure IBM est formelle : toute alarme = évacuation réelle jusqu'à preuve du contraire.",
    question: "Que répondez-vous à votre collègue ?",
    choices: [
      {
        key: "A",
        label: "\"Tu as raison, ça doit être un test.\"",
        correct: false,
        feedback: "Mauvaise posture. Ne jamais présumer qu'une alarme est fausse. Le risque est trop élevé.",
      },
      {
        key: "B",
        label: "\"On évacue maintenant — exercice ou pas.\"",
        correct: true,
        feedback: "Correct. La règle IBM est claire : toute alarme = évacuation immédiate. Jamais d'exception.",
      },
      {
        key: "C",
        label: "\"Appelle la sécurité pour confirmer d'abord.\"",
        correct: false,
        feedback: "Trop lent. Le temps d'appeler, une situation réelle peut évoluer dangereusement. Évacuez d'abord.",
      },
      {
        key: "D",
        label: "\"Je surveille depuis la fenêtre pour voir.\"",
        correct: false,
        feedback: "Les fenêtres ne donnent pas d'info fiable sur la source du feu. Évacuez immédiatement.",
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
    senderInitials: "IR",
    senderColor: "#198038",
    subject: "#evacuation-live",
    body:
      "Isabelle Renard : L'alarme vient de retentir. Je suis à l'accueil, il y a environ 20 visiteurs qui paniquent " +
      "et se précipitent tous vers la même porte. Une personne a commencé à crier. " +
      "Je ne sais pas quoi faire, j'ai peur de perdre le contrôle de la situation.",
    question: "Quelle est votre première action pour aider Isabelle ?",
    choices: [
      {
        key: "A",
        label: "Lui dire de crier plus fort pour être entendue",
        correct: false,
        feedback: "Crier aggrave la panique collective. Une voix calme et ferme est bien plus efficace.",
      },
      {
        key: "B",
        label: "Lui conseiller de parler fort, calmement, et indiquer une direction claire",
        correct: true,
        feedback: "Correct. Voix forte + calme + directive simple : « Par ici, suivez-moi, on sort calmement. » La clarté rassure.",
      },
      {
        key: "C",
        label: "Lui dire de se mettre de côté et laisser les gens partir",
        correct: false,
        feedback: "Sans guidance, les visiteurs peuvent prendre de mauvaises sorties. La présence active d'un référent est cruciale.",
      },
      {
        key: "D",
        label: "Appeler la sécurité pour qu'ils gèrent",
        correct: false,
        feedback: "La sécurité est déjà alertée par l'alarme. Sur le terrain, c'est Isabelle qui peut agir immédiatement.",
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
    senderInitials: "PL",
    senderColor: "#7c3aed",
    subject: "URGENT — Collègue non sorti après évacuation",
    body:
      "Au point de rassemblement, nous faisons le compte : Nadia Kowalski (Équipe Projets) est absente. " +
      "Son badge indique qu'elle était présente ce matin. " +
      "La fumée commence à atteindre le 2ème étage. Les pompiers arrivent dans 4 minutes.",
    question: "Que faites-vous immédiatement ?",
    choices: [
      {
        key: "A",
        label: "Retourner dans le bâtiment la chercher seul",
        correct: false,
        feedback: "Jamais. Retourner seul dans un bâtiment enfumé met deux vies en danger au lieu d'une.",
      },
      {
        key: "B",
        label: "Signaler l'information aux pompiers à leur arrivée",
        correct: true,
        feedback: "Correct. Donnez le nom, l'étage habituel et l'heure du dernier badge aux pompiers. C'est leur mission d'intervenir.",
      },
      {
        key: "C",
        label: "Attendre qu'elle sorte d'elle-même",
        correct: false,
        feedback: "Elle est peut-être inconsciente ou piégée. L'inaction peut lui coûter la vie. Signalez immédiatement.",
      },
      {
        key: "D",
        label: "Appeler son téléphone",
        correct: false,
        feedback: "Utile en parallèle, mais la priorité est de signaler aux pompiers avec toutes les infos disponibles.",
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
    senderInitials: "KM",
    senderColor: "#b45309",
    subject: "#evacuation-live",
    body:
      "Kevin Morin : Alarme déclenchée au 6ème. J'ai un collègue en fauteuil roulant avec moi. " +
      "L'ascenseur est coupé. L'escalier de secours est à 30 mètres mais il y a beaucoup de fumée dans le couloir. " +
      "Qu'est-ce qu'on fait ?",
    question: "Quelle est la bonne procédure pour Kevin et son collègue ?",
    choices: [
      {
        key: "A",
        label: "Attendre l'ascenseur — la coupure est peut-être temporaire",
        correct: false,
        feedback: "En cas d'incendie, l'ascenseur ne doit JAMAIS être utilisé. Il peut tomber en panne ou s'ouvrir sur l'étage en feu.",
      },
      {
        key: "B",
        label: "Se diriger vers l'espace d'attente sécurisé et appeler le 22 22",
        correct: true,
        feedback: "Correct. L'espace d'attente sécurisé (palier d'escalier coupe-feu) est prévu pour les PMR. Les pompiers viendront.",
      },
      {
        key: "C",
        label: "Descendre le fauteuil dans les escaliers à deux",
        correct: false,
        feedback: "Dangereux sans formation spécifique. Le risque de chute est élevé. L'espace sécurisé est la bonne option.",
      },
      {
        key: "D",
        label: "Laisser le collègue en fauteuil et descendre chercher de l'aide",
        correct: false,
        feedback: "Ne pas quitter la personne seule. Restez avec elle dans l'espace sécurisé et appelez le 22 22.",
      },
    ],
  },
];

// Map pour accès rapide par moduleId
export const ALERT_BY_MODULE: Record<string, SituationAlert> = Object.fromEntries(
  SITUATION_ALERTS.map((a) => [a.moduleId, a])
);
