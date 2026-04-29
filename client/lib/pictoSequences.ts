/**
 * pictoSequences.ts
 * Visual step-by-step procedure sequences shown before the quiz in each module.
 * Keyed by module ID. Only modules with a clear procedure sequence have one.
 */

import { PictoSequenceData } from "@/components/PictoSequence";

export const PICTO_SEQUENCES: Record<string, PictoSequenceData> = {

  // Ch1-M1 — Les 3 réflexes
  "ch1-m1": {
    titleFr: "Les 3 réflexes dans l'ordre",
    titleEn: "The 3 reflexes in order",
    steps: [
      {
        icon: "🔴",
        labelFr: "Boîtier rouge",
        labelEn: "Red call point",
        sublabelFr: "Déclenche l'alarme",
        sublabelEn: "Triggers the alarm",
        bg: "#da1e28",
      },
      {
        icon: "📞",
        labelFr: "777",
        labelEn: "777",
        sublabelFr: "Téléphone fixe IBM",
        sublabelEn: "IBM fixed phone",
        bg: "#0043ce",
      },
      {
        icon: "🚪",
        labelFr: "Évacuer",
        labelEn: "Evacuate",
        sublabelFr: "Sans attendre",
        sublabelEn: "Immediately",
        bg: "#198038",
      },
    ],
  },

  // Ch1-M3 — Propagation : Sors-Ferme-Signale
  "ch1-m3": {
    titleFr: "Ralentir la propagation",
    titleEn: "Slow the spread",
    steps: [
      {
        icon: "🚶",
        labelFr: "Sortir",
        labelEn: "Exit",
        sublabelFr: "Quitter la pièce",
        sublabelEn: "Leave the room",
        bg: "#0043ce",
      },
      {
        icon: "🚪",
        labelFr: "Fermer",
        labelEn: "Close",
        sublabelFr: "Toutes les portes",
        sublabelEn: "Every door",
        bg: "#b45309",
      },
      {
        icon: "📍",
        labelFr: "Signaler",
        labelEn: "Signal",
        sublabelFr: "Sa position",
        sublabelEn: "Your position",
        bg: "#198038",
      },
    ],
  },

  // Ch1-M4 — Choisir le bon extincteur
  "ch1-m4": {
    titleFr: "Quel extincteur ?",
    titleEn: "Which extinguisher?",
    steps: [
      {
        icon: "⚡",
        labelFr: "Feu électrique",
        labelEn: "Electrical fire",
        sublabelFr: "Serveur, câble…",
        sublabelEn: "Server, cable…",
        bg: "#6929c4",
      },
      {
        icon: "➡️",
        labelFr: "",
        labelEn: "",
        bg: "transparent",
        iconColor: "#c8cfe0",
      },
      {
        icon: "⬛",
        labelFr: "CO₂",
        labelEn: "CO₂",
        sublabelFr: "Extincteur noir",
        sublabelEn: "Black cylinder",
        bg: "#1c1c1c",
      },
      {
        icon: "🔥",
        labelFr: "Feu solide",
        labelEn: "Solid fire",
        sublabelFr: "Papier, plastique…",
        sublabelEn: "Paper, plastic…",
        bg: "#b45309",
      },
      {
        icon: "➡️",
        labelFr: "",
        labelEn: "",
        bg: "transparent",
        iconColor: "#c8cfe0",
      },
      {
        icon: "💧",
        labelFr: "Eau pulvérisée",
        labelEn: "Water mist",
        sublabelFr: "Extincteur rouge",
        sublabelEn: "Red cylinder",
        bg: "#0043ce",
      },
    ],
  },

  // Ch1-M5 — Méthode PASS
  "ch1-m5": {
    titleFr: "La méthode P.A.S.S.",
    titleEn: "The P.A.S.S. method",
    steps: [
      {
        icon: "📌",
        labelFr: "P — Dégoupiller",
        labelEn: "P — Pull",
        sublabelFr: "Retirer la goupille",
        sublabelEn: "Remove the pin",
        bg: "#da1e28",
      },
      {
        icon: "🎯",
        labelFr: "A — Viser",
        labelEn: "A — Aim",
        sublabelFr: "La base du feu",
        sublabelEn: "At the base",
        bg: "#b45309",
      },
      {
        icon: "✊",
        labelFr: "S — Presser",
        labelEn: "S — Squeeze",
        sublabelFr: "La poignée",
        sublabelEn: "The handle",
        bg: "#6929c4",
      },
      {
        icon: "↔️",
        labelFr: "S — Balayer",
        labelEn: "S — Sweep",
        sublabelFr: "De gauche à droite",
        sublabelEn: "Side to side",
        bg: "#0043ce",
      },
    ],
  },

  // Ch1-M6 — Intervenir ou évacuer ?
  "ch1-m6": {
    titleFr: "Intervenir seulement si…",
    titleEn: "Intervene only if…",
    steps: [
      {
        icon: "🔥",
        labelFr: "Feu naissant",
        labelEn: "Very small fire",
        sublabelFr: "≤ corbeille à papier",
        sublabelEn: "≤ wastepaper basket",
        bg: "#b45309",
      },
      {
        icon: "🧯",
        labelFr: "Extincteur adapté",
        labelEn: "Right extinguisher",
        sublabelFr: "À portée de main",
        sublabelEn: "Within reach",
        bg: "#da1e28",
      },
      {
        icon: "🚪",
        labelFr: "Sortie libre",
        labelEn: "Exit clear",
        sublabelFr: "Derrière vous",
        sublabelEn: "Behind you",
        bg: "#198038",
      },
      {
        icon: "✅",
        labelFr: "Alors agir",
        labelEn: "Then act",
        sublabelFr: "Sinon : évacuer",
        sublabelEn: "Otherwise: evacuate",
        bg: "#0043ce",
      },
    ],
  },

  // Ch2-M1 — Déclencher l'alarme
  "ch2-m1": {
    titleFr: "Séquence d'alerte",
    titleEn: "Alert sequence",
    steps: [
      {
        icon: "🔴",
        labelFr: "Boîtier rouge",
        labelEn: "Red call point",
        sublabelFr: "En priorité",
        sublabelEn: "First priority",
        bg: "#da1e28",
      },
      {
        icon: "📞",
        labelFr: "777",
        labelEn: "777",
        sublabelFr: "Téléphone fixe IBM",
        sublabelEn: "IBM fixed phone",
        bg: "#0043ce",
      },
      {
        icon: "🚒",
        labelFr: "18",
        labelEn: "18",
        sublabelFr: "Si nécessaire",
        sublabelEn: "If needed",
        bg: "#b45309",
      },
    ],
  },

  // Ch2-M2 — Garder son calme et guider
  "ch2-m2": {
    titleFr: "Guider en urgence",
    titleEn: "Guide in emergency",
    steps: [
      {
        icon: "🧍",
        labelFr: "Se positionner",
        labelEn: "Step forward",
        sublabelFr: "Face aux collègues",
        sublabelEn: "Face colleagues",
        bg: "#0043ce",
      },
      {
        icon: "📢",
        labelFr: "Parler clairement",
        labelEn: "Speak clearly",
        sublabelFr: "Voix ferme, calme",
        sublabelEn: "Firm, calm voice",
        bg: "#6929c4",
      },
      {
        icon: "🚶",
        labelFr: "Marcher en tête",
        labelEn: "Lead the way",
        sublabelFr: "Vers la sortie",
        sublabelEn: "Toward exit",
        bg: "#198038",
      },
    ],
  },

  // Ch2-M3 — Fermer les portes
  "ch2-m3": {
    titleFr: "Sors — Ferme — Signale",
    titleEn: "EXIT — CLOSE — SIGNAL",
    steps: [
      {
        icon: "🚶",
        labelFr: "Sortir",
        labelEn: "EXIT",
        sublabelFr: "La pièce d'abord",
        sublabelEn: "Room first",
        bg: "#0043ce",
      },
      {
        icon: "🚪",
        labelFr: "Fermer",
        labelEn: "CLOSE",
        sublabelFr: "Chaque porte",
        sublabelEn: "Every door",
        bg: "#b45309",
      },
      {
        icon: "📍",
        labelFr: "Signaler",
        labelEn: "SIGNAL",
        sublabelFr: "Sa position",
        sublabelEn: "Your position",
        bg: "#198038",
      },
    ],
  },

  // Ch2-M4 — Ne laisser personne
  "ch2-m4": {
    titleFr: "Si quelqu'un ne peut pas évacuer",
    titleEn: "If someone cannot evacuate",
    steps: [
      {
        icon: "🏃",
        labelFr: "Conduire à l'EAS",
        labelEn: "Take to EWS",
        sublabelFr: "Palier d'escalier",
        sublabelEn: "Stairwell landing",
        bg: "#0043ce",
      },
      {
        icon: "📞",
        labelFr: "Interphone",
        labelEn: "Interphone",
        sublabelFr: "Communiquer",
        sublabelEn: "Communicate",
        bg: "#6929c4",
      },
      {
        icon: "📍",
        labelFr: "Signaler",
        labelEn: "Report",
        sublabelFr: "Étage + nombre",
        sublabelEn: "Floor + count",
        bg: "#198038",
      },
    ],
  },

  // Ch2-M5 — Face à la fumée
  "ch2-m5": {
    titleFr: "Face à la fumée",
    titleEn: "In smoke",
    steps: [
      {
        icon: "⬇️",
        labelFr: "S'abaisser",
        labelEn: "Stay low",
        sublabelFr: "Sous 1,8 m",
        sublabelEn: "Below 1.8m",
        bg: "#6929c4",
      },
      {
        icon: "🤚",
        labelFr: "Toucher la porte",
        labelEn: "Touch the door",
        sublabelFr: "Chaude = ne pas ouvrir",
        sublabelEn: "Warm = don't open",
        bg: "#b45309",
      },
      {
        icon: "🧣",
        labelFr: "Protéger",
        labelEn: "Cover mouth",
        sublabelFr: "Bouche et nez",
        sublabelEn: "Nose and mouth",
        bg: "#0043ce",
      },
      {
        icon: "🚶",
        labelFr: "Avancer vite",
        labelEn: "Move quickly",
        sublabelFr: "Sans courir",
        sublabelEn: "Don't run",
        bg: "#198038",
      },
    ],
  },

  // Ch2-M6 — Escaliers ou EAS
  "ch2-m6": {
    titleFr: "Escaliers ou EAS",
    titleEn: "Stairs or EWS",
    steps: [
      {
        icon: "🚫",
        labelFr: "Jamais l'ascenseur",
        labelEn: "Never the elevator",
        sublabelFr: "Interdit en incendie",
        sublabelEn: "Forbidden in fire",
        bg: "#da1e28",
      },
      {
        icon: "🪜",
        labelFr: "Escaliers",
        labelEn: "Stairs",
        sublabelFr: "À droite, calme",
        sublabelEn: "Right side, calm",
        bg: "#0043ce",
      },
      {
        icon: "♿",
        labelFr: "EAS si besoin",
        labelEn: "EWS if needed",
        sublabelFr: "Palier + interphone",
        sublabelEn: "Landing + interphone",
        bg: "#198038",
      },
    ],
  },

  // Ch2-M7 — Procédure complète
  "ch2-m7": {
    titleFr: "Procédure complète d'évacuation",
    titleEn: "Full evacuation procedure",
    steps: [
      {
        icon: "🔴",
        labelFr: "Alarme",
        labelEn: "Alarm",
        sublabelFr: "Boîtier rouge",
        sublabelEn: "Red call point",
        bg: "#da1e28",
      },
      {
        icon: "📞",
        labelFr: "777",
        labelEn: "777",
        sublabelFr: "Téléphone fixe",
        sublabelEn: "Fixed phone",
        bg: "#0043ce",
      },
      {
        icon: "🚶",
        labelFr: "Guider",
        labelEn: "Guide",
        sublabelFr: "Collègues proches",
        sublabelEn: "Nearby colleagues",
        bg: "#6929c4",
      },
      {
        icon: "🚪",
        labelFr: "Fermer",
        labelEn: "Close",
        sublabelFr: "Toutes les portes",
        sublabelEn: "Every door",
        bg: "#b45309",
      },
      {
        icon: "📍",
        labelFr: "Point de rassemblement",
        labelEn: "Assembly point",
        sublabelFr: "Rester — ne pas rentrer",
        sublabelEn: "Stay — don't re-enter",
        bg: "#198038",
      },
    ],
  },
};
