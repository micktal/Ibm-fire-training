import { useState } from "react";
import { X, AlertTriangle, Info, CheckCircle2, MapPin } from "lucide-react";
import { useLanguage } from "@/lib/languageContext";

export interface Hotspot {
  id: string;
  x: number; // % from left
  y: number; // % from top
  label: string;
  labelEn?: string;
  description: string;
  descriptionEn?: string;
  type: "danger" | "info" | "safe";
  detail?: string;
  detailEn?: string;
}

export interface HotspotExercise {
  type: "hotspot";
  instruction: string;
  instructionEn?: string;
  context?: string;
  contextEn?: string;
  image: string;
  hotspots: Hotspot[];
  successMessage?: string;
  successMessageEn?: string;
}

interface Props {
  exercise: HotspotExercise;
  onComplete?: (score: number) => void;
}

const TYPE_CONFIG = {
  danger: {
    ring: "#da1e28",
    bg: "rgba(218,30,40,0.15)",
    pulse: "rgba(218,30,40,0.35)",
    icon: <AlertTriangle size={13} color="#da1e28" />,
    label: "Danger",
    panelBorder: "rgba(218,30,40,0.3)",
    panelBg: "rgba(218,30,40,0.05)",
    titleColor: "#a2191f",
  },
  info: {
    ring: "#0043ce",
    bg: "rgba(0,67,206,0.18)",
    pulse: "rgba(0,67,206,0.35)",
    icon: <Info size={13} color="#0043ce" />,
    label: "Information",
    panelBorder: "rgba(0,67,206,0.25)",
    panelBg: "rgba(0,67,206,0.04)",
    titleColor: "#0031a9",
  },
  safe: {
    ring: "#198038",
    bg: "rgba(25,128,56,0.18)",
    pulse: "rgba(25,128,56,0.35)",
    icon: <CheckCircle2 size={13} color="#198038" />,
    label: "Safe",  // overridden below for FR
    panelBorder: "rgba(25,128,56,0.3)",
    panelBg: "rgba(25,128,56,0.05)",
    titleColor: "#0e6027",
  },
};

export default function HotspotImage({ exercise, onComplete }: Props) {
  const { lang } = useLanguage();
  const isEN = lang === "en";
  const [discovered, setDiscovered] = useState<Set<string>>(new Set());
  const [active, setActive] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);

  const handleClick = (id: string) => {
    if (active === id) { setActive(null); return; }
    setActive(id);
    if (!discovered.has(id)) {
      const next = new Set(discovered).add(id);
      setDiscovered(next);
      if (next.size === exercise.hotspots.length && !completed) {
        setCompleted(true);
        onComplete?.(100);
      }
    }
  };

  const activeHotspot = exercise.hotspots.find((h) => h.id === active);
  const cfg = activeHotspot ? { ...TYPE_CONFIG[activeHotspot.type], label: activeHotspot.type === "safe" ? (isEN ? "Safe" : "Sécurisé") : TYPE_CONFIG[activeHotspot.type].label } : null;
  const progress = Math.round((discovered.size / exercise.hotspots.length) * 100);

  return (
    <div className="rounded-xl overflow-hidden" style={{ border: "1.5px solid #e4e7f0" }}>
      {/* Header */}
      <div className="px-5 py-3.5" style={{ background: "#0043ce" }}>
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <MapPin size={13} color="rgba(255,255,255,0.8)" />
            <span
              className="font-mono text-xs uppercase tracking-wider"
              style={{ color: "rgba(255,255,255,0.7)", fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.1em" }}
            >
              {isEN ? "Interactive Exercise — Hotspots" : "Exercice Interactif — Hotspots"}
            </span>
          </div>
          <span
            className="font-mono text-xs font-bold"
            style={{ color: "#fff", fontFamily: "'IBM Plex Mono', monospace" }}
          >
            {discovered.size}/{exercise.hotspots.length} {isEN ? "discovered" : "découverts"}
          </span>
        </div>
        <p className="text-sm font-semibold text-white" style={{ lineHeight: "1.4" }}>
          {isEN ? (exercise.instructionEn ?? exercise.instruction) : exercise.instruction}
        </p>
        {exercise.context && (
          <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.6)" }}>
            {isEN ? (exercise.contextEn ?? exercise.context) : exercise.context}
          </p>
        )}
        {/* Progress bar */}
        <div className="mt-2.5 rounded-full h-1" style={{ background: "rgba(255,255,255,0.15)" }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progress}%`, background: completed ? "#6fdc8c" : "#fff" }}
          />
        </div>
      </div>

      {/* Image + hotspots */}
      <div className="relative" style={{ background: "#111" }}>
        <img
          src={exercise.image}
          alt={isEN ? "Interactive scene" : "Scène interactive"}
          className="w-full block"
          style={{ maxHeight: "360px", objectFit: "cover", objectPosition: "center" }}
          draggable={false}
        />

        {/* Hotspot markers */}
        {exercise.hotspots.map((hs, idx) => {
          const c = TYPE_CONFIG[hs.type];
          const isDiscovered = discovered.has(hs.id);
          const isActive = active === hs.id;
          return (
            <button
              key={hs.id}
              onClick={() => handleClick(hs.id)}
              className="absolute flex items-center justify-center transition-all duration-200"
              style={{
                left: `${hs.x}%`,
                top: `${hs.y}%`,
                transform: "translate(-50%, -50%)",
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: isActive ? c.ring : isDiscovered ? `${c.ring}cc` : c.bg,
                border: `2.5px solid ${c.ring}`,
                boxShadow: isActive
                  ? `0 0 0 6px ${c.pulse}, 0 4px 16px rgba(0,0,0,0.4)`
                  : `0 0 0 3px ${c.pulse}`,
                cursor: "pointer",
                zIndex: 10,
                animation: isDiscovered ? "none" : "hotspotPulse 2s ease infinite",
              }}
              title={hs.label}
            >
              <span className="font-mono font-bold text-xs text-white" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                {idx + 1}
              </span>
            </button>
          );
        })}
      </div>

      {/* Detail panel — sous l'image, pas dedans */}
      {activeHotspot && cfg ? (
        <div
          className="flex items-start gap-3 px-5 py-4"
          style={{
            background: cfg.panelBg,
            borderTop: `2px solid ${cfg.panelBorder}`,
            animation: "feedbackSlide 0.25s ease",
          }}
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
            style={{ background: "white", border: `1.5px solid ${cfg.panelBorder}` }}
          >
            {cfg.icon}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs font-bold uppercase" style={{ color: cfg.titleColor, letterSpacing: "0.08em" }}>
                {cfg.label}
              </span>
            </div>
            <div className="font-bold text-sm mb-1" style={{ color: "#161616", lineHeight: "1.35" }}>
              {isEN ? (activeHotspot.labelEn ?? activeHotspot.label) : activeHotspot.label}
            </div>
            <div className="text-sm leading-relaxed" style={{ color: "#3d4259" }}>
              {isEN ? (activeHotspot.descriptionEn ?? activeHotspot.description) : activeHotspot.description}
            </div>
            {activeHotspot.detail && (
              <div className="mt-2 text-xs font-semibold" style={{ color: cfg.titleColor }}>
                → {isEN ? (activeHotspot.detailEn ?? activeHotspot.detail) : activeHotspot.detail}
              </div>
            )}
          </div>
          <button
            onClick={() => setActive(null)}
            className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors hover:bg-black/10"
          >
            <X size={12} color="#6f7897" />
          </button>
        </div>
      ) : (
        <div className="px-5 py-3 text-xs" style={{ color: "#8d95aa", borderTop: "1px solid #f0f2f8" }}>
          {isEN ? "Click on a marker to learn more" : "Cliquez sur un marqueur pour en savoir plus"}
        </div>
      )}

      {/* Completion banner */}
      {completed && (
        <div
          className="flex items-center gap-3 px-5 py-3"
          style={{ background: "rgba(25,128,56,0.06)", borderTop: "1.5px solid rgba(25,128,56,0.25)" }}
        >
          <CheckCircle2 size={18} style={{ color: "#198038", flexShrink: 0 }} />
          <div>
            <div className="text-sm font-bold" style={{ color: "#0e6027" }}>
              {isEN ? (exercise.successMessageEn ?? exercise.successMessage ?? "All points identified — Excellent work!") : (exercise.successMessage ?? "Tous les points identifiés — Excellent travail !")}
            </div>
            <div className="text-xs" style={{ color: "#6f7897" }}>
              {exercise.hotspots.filter((h) => h.type === "danger").length} {isEN ? "dangerous zone(s) identified" : "zone(s) dangereuse(s) identifiée(s)"}
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div
        className="flex flex-wrap gap-4 px-5 py-3"
        style={{ borderTop: "1px solid #e4e7f0", background: "#fafbfc" }}
      >
        {(["danger", "info", "safe"] as const).map((t) => {
          const c = TYPE_CONFIG[t];
          const count = exercise.hotspots.filter((h) => h.type === t).length;
          if (!count) return null;
          return (
            <div key={t} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: c.ring }} />
              <span className="text-xs" style={{ color: "#6f7897" }}>
                {t === "safe" ? (isEN ? "Safe" : "Sécurisé") : c.label} ({count})
              </span>
            </div>
          );
        })}
        <span className="ml-auto text-xs" style={{ color: "#8d95aa" }}>
          {isEN ? "Click on markers to explore" : "Cliquez sur les marqueurs pour explorer"}
        </span>
      </div>

      <style>{`
        @keyframes hotspotPulse {
          0%, 100% { box-shadow: 0 0 0 3px rgba(255,255,255,0.2); }
          50% { box-shadow: 0 0 0 8px rgba(255,255,255,0); }
        }
      `}</style>
    </div>
  );
}
