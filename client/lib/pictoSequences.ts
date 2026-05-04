/**
 * pictoSequences.ts
 * Premium visual procedure sequences displayed before the quiz.
 * Uses Lucide icon names + CSS gradients for premium circles.
 */

import { PictoSequenceData } from "@/components/PictoSequence";

const G = {
  red:      { gradient: "linear-gradient(145deg, #da1e28, #a2191f)", glow: "rgba(218,30,40,0.4)" },
  blue:     { gradient: "linear-gradient(145deg, #0f62fe, #0031a9)", glow: "rgba(15,98,254,0.35)" },
  green:    { gradient: "linear-gradient(145deg, #198038, #0b4f1e)", glow: "rgba(25,128,56,0.35)" },
  orange:   { gradient: "linear-gradient(145deg, #ff6b1a, #c43d00)", glow: "rgba(255,107,26,0.35)" },
  purple:   { gradient: "linear-gradient(145deg, #6929c4, #491d8b)", glow: "rgba(105,41,196,0.35)" },
  darkblue: { gradient: "linear-gradient(145deg, #00539a, #003a75)", glow: "rgba(0,83,154,0.35)" },
  teal:     { gradient: "linear-gradient(145deg, #007d79, #004144)", glow: "rgba(0,125,121,0.35)" },
  charcoal: { gradient: "linear-gradient(145deg, #393939, #161616)", glow: "rgba(57,57,57,0.45)" },
  gold:     { gradient: "linear-gradient(145deg, #b28600, #8a6500)", glow: "rgba(178,134,0,0.35)" },
};

export const PICTO_SEQUENCES: Record<string, PictoSequenceData> = {

  "ch1-m1": {
    titleFr: "Les 3 réflexes dans l'ordre",
    titleEn: "The 3 reflexes in order",
    steps: [
      { icon: "bell-ring",  labelFr: "Boîtier rouge",    labelEn: "Red call point",   sublabelFr: "Déclenche l'alarme",  sublabelEn: "Triggers the alarm", ...G.red },
      { icon: "phone",      labelFr: "777",               labelEn: "777",              sublabelFr: "Téléphone fixe IBM",  sublabelEn: "IBM fixed phone",    ...G.blue },
      { icon: "log-out",    labelFr: "Évacuer",           labelEn: "Evacuate",         sublabelFr: "Sans attendre",       sublabelEn: "Immediately",        ...G.green },
    ],
  },

  "ch1-m3": {
    titleFr: "Ralentir la propagation",
    titleEn: "Slow the spread",
    steps: [
      { icon: "log-out",      labelFr: "Sortir",   labelEn: "Exit",    sublabelFr: "Quitter la pièce",   sublabelEn: "Leave the room",  ...G.blue },
      { icon: "door-closed",  labelFr: "Fermer",   labelEn: "Close",   sublabelFr: "Toutes les portes",  sublabelEn: "Every door",      ...G.orange },
      { icon: "map-pin",      labelFr: "Signaler", labelEn: "Signal",  sublabelFr: "Sa position",        sublabelEn: "Your position",   ...G.green },
    ],
  },

  "ch1-m4": {
    titleFr: "Quel extincteur ?",
    titleEn: "Which extinguisher?",
    steps: [
      { icon: "zap",       labelFr: "Feu électrique",  labelEn: "Electrical fire",  sublabelFr: "Serveur, câble…",   sublabelEn: "Server, cable…",    ...G.purple },
      { icon: "wind",      labelFr: "CO₂ — Noir",      labelEn: "CO₂ — Black",      sublabelFr: "Extincteur noir",   sublabelEn: "Black cylinder",    ...G.charcoal },
      { icon: "flame",     labelFr: "Feu solide",      labelEn: "Solid fire",       sublabelFr: "Papier, plastique", sublabelEn: "Paper, plastic…",   ...G.orange },
      { icon: "droplets",  labelFr: "Eau pulvérisée",  labelEn: "Water mist",       sublabelFr: "Extincteur rouge",  sublabelEn: "Red cylinder",      ...G.blue },
    ],
  },

  "ch1-m5": {
    titleFr: "La méthode P.A.S.S.",
    titleEn: "The P.A.S.S. method",
    steps: [
      { icon: "grab",       labelFr: "P — Dégoupiller", labelEn: "P — Pull",    sublabelFr: "Retirer la goupille",  sublabelEn: "Remove the pin",    ...G.red },
      { icon: "target",     labelFr: "A — Viser",       labelEn: "A — Aim",     sublabelFr: "La base du feu",       sublabelEn: "At the base",       ...G.orange },
      { icon: "hand",       labelFr: "S — Presser",     labelEn: "S — Squeeze", sublabelFr: "La poignée",           sublabelEn: "The handle",        ...G.purple },
      { icon: "scan",       labelFr: "S — Balayer",     labelEn: "S — Sweep",   sublabelFr: "De gauche à droite",   sublabelEn: "Side to side",      ...G.blue },
    ],
  },

  "ch1-m6": {
    titleFr: "Intervenir seulement si…",
    titleEn: "Intervene only if…",
    steps: [
      { icon: "flame",         labelFr: "Feu naissant",        labelEn: "Very small fire",     sublabelFr: "≤ corbeille papier",  sublabelEn: "≤ wastepaper basket", ...G.orange },
      { icon: "shield",        labelFr: "Extincteur adapté",   labelEn: "Right extinguisher",  sublabelFr: "À portée de main",    sublabelEn: "Within reach",        ...G.red },
      { icon: "door-open",     labelFr: "Sortie libre",        labelEn: "Exit clear",          sublabelFr: "Derrière vous",       sublabelEn: "Behind you",          ...G.green },
      { icon: "check",         labelFr: "Alors agir",          labelEn: "Then act",            sublabelFr: "Sinon : évacuer",     sublabelEn: "Otherwise: evacuate", ...G.blue },
    ],
  },

  "ch2-m1": {
    titleFr: "Séquence d'alerte",
    titleEn: "Alert sequence",
    steps: [
      { icon: "bell-ring",       labelFr: "Boîtier rouge",  labelEn: "Red call point",  sublabelFr: "En priorité",         sublabelEn: "First priority",  ...G.red },
      { icon: "phone",           labelFr: "777",            labelEn: "777",             sublabelFr: "Téléphone fixe IBM",  sublabelEn: "IBM fixed phone", ...G.blue },
      { icon: "alert-triangle",  labelFr: "18",             labelEn: "18",              sublabelFr: "Si nécessaire",       sublabelEn: "If needed",       ...G.orange },
    ],
  },

  "ch2-m2": {
    titleFr: "Guider en urgence",
    titleEn: "Guide in emergency",
    steps: [
      { icon: "users",      labelFr: "Se positionner",   labelEn: "Step forward",   sublabelFr: "Face aux collègues",  sublabelEn: "Face colleagues", ...G.blue },
      { icon: "megaphone",  labelFr: "Parler clairement", labelEn: "Speak clearly",  sublabelFr: "Voix ferme, calme",   sublabelEn: "Firm, calm voice",...G.purple },
      { icon: "log-out",    labelFr: "Marcher en tête",  labelEn: "Lead the way",   sublabelFr: "Vers la sortie",      sublabelEn: "Toward exit",     ...G.green },
    ],
  },

  "ch2-m3": {
    titleFr: "Sors — Ferme — Signale",
    titleEn: "EXIT — CLOSE — SIGNAL",
    steps: [
      { icon: "log-out",      labelFr: "Sortir",   labelEn: "EXIT",    sublabelFr: "La pièce d'abord",   sublabelEn: "Room first",      ...G.blue },
      { icon: "door-closed",  labelFr: "Fermer",   labelEn: "CLOSE",   sublabelFr: "Chaque porte",       sublabelEn: "Every door",      ...G.orange },
      { icon: "map-pin",      labelFr: "Signaler", labelEn: "SIGNAL",  sublabelFr: "Sa position",        sublabelEn: "Your position",   ...G.green },
    ],
  },

  "ch2-m4": {
    titleFr: "Si quelqu'un ne peut pas évacuer",
    titleEn: "If someone cannot evacuate",
    steps: [
      { icon: "accessibility",  labelFr: "Conduire à l'EAS",  labelEn: "Take to EWS",   sublabelFr: "Palier d'escalier",  sublabelEn: "Stairwell landing", ...G.blue },
      { icon: "phone",          labelFr: "Interphone",        labelEn: "Interphone",    sublabelFr: "Communiquer",        sublabelEn: "Communicate",       ...G.purple },
      { icon: "map-pin",        labelFr: "Signaler",          labelEn: "Report",        sublabelFr: "Étage + nombre",     sublabelEn: "Floor + count",     ...G.green },
    ],
  },

  "ch2-m5": {
    titleFr: "Face à la fumée",
    titleEn: "In smoke",
    steps: [
      { icon: "arrow-down",   labelFr: "S'abaisser",     labelEn: "Stay low",      sublabelFr: "Sous 1,8 m",          sublabelEn: "Below 1.8m",        ...G.purple },
      { icon: "hand",         labelFr: "Toucher la porte", labelEn: "Touch door",  sublabelFr: "Chaude = ne pas ouvrir", sublabelEn: "Warm = don't open",...G.orange },
      { icon: "eye",          labelFr: "Protéger",       labelEn: "Cover mouth",   sublabelFr: "Bouche et nez",       sublabelEn: "Nose and mouth",    ...G.darkblue },
      { icon: "log-out",      labelFr: "Avancer vite",   labelEn: "Move quickly",  sublabelFr: "Sans courir",         sublabelEn: "Don't run",         ...G.green },
    ],
  },

  "ch2-m6": {
    titleFr: "Escaliers ou EAS",
    titleEn: "Stairs or EWS",
    steps: [
      { icon: "ban",           labelFr: "Jamais l'ascenseur",  labelEn: "Never the elevator", sublabelFr: "Interdit",          sublabelEn: "Forbidden",         ...G.red },
      { icon: "move-down",     labelFr: "Escaliers",           labelEn: "Stairs",             sublabelFr: "À droite, calme",   sublabelEn: "Right side, calm",  ...G.blue },
      { icon: "accessibility", labelFr: "EAS si besoin",       labelEn: "EWS if needed",      sublabelFr: "Palier + instructions", sublabelEn: "Landing + instructions",  ...G.green },
    ],
  },

  "ch2-m7": {
    titleFr: "Procédure complète",
    titleEn: "Full procedure",
    steps: [
      { icon: "bell-ring",    labelFr: "Alarme",       labelEn: "Alarm",        sublabelFr: "Boîtier rouge",     sublabelEn: "Red call point",  ...G.red },
      { icon: "phone",        labelFr: "777",          labelEn: "777",          sublabelFr: "Téléphone fixe",    sublabelEn: "Fixed phone",     ...G.blue },
      { icon: "users",        labelFr: "Guider",       labelEn: "Guide",        sublabelFr: "Collègues proches", sublabelEn: "Nearby staff",    ...G.purple },
      { icon: "door-closed",  labelFr: "Fermer",       labelEn: "Close",        sublabelFr: "Toutes les portes", sublabelEn: "Every door",      ...G.orange },
      { icon: "map-pin",      labelFr: "Rassemblement",labelEn: "Assembly pt",  sublabelFr: "Rester, ne pas rentrer", sublabelEn: "Stay, don't re-enter", ...G.green },
    ],
  },

};
