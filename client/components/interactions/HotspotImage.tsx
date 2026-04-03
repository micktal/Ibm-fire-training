import { useState } from "react";
import { X, AlertTriangle, Info, CheckCircle2, MapPin } from "lucide-react";

export interface Hotspot {
  id: string;
  x: number; // % from left
  y: number; // % from top
  label: string;
  description: string;
  type: "danger" | "info" | "safe";
  detail?: string;
}

export interface HotspotExercise {
  type: "hotspot";
  instruction: string;
  context?: string;
  image: string;
  hotspots: Hotspot[];
  successMessage?: string;
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
    label: "Sécurisé",
    panelBorder: "rgba(25,128,56,0.3)",
    panelBg: "rgba(25,128,56,0.05)",
    titleColor: "#0e6027",
  },
};

export default function HotspotImage({ exercise, onComplete }: Props) {
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
  const cfg = activeHotspot ? TYPE_CONFIG[activeHotspot.type] : null;
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
              Exercice Interactif — Hotspots
            </span>
          </div>
          <span
            className="font-mono text-xs font-bold"
            style={{ color: "#fff", fontFamily: "'IBM Plex Mono', monospace" }}
          >
            {discovered.size}/{exercise.hotspots.length} découverts
          </span>
        </div>
        <p className="text-sm font-semibold text-white" style={{ lineHeight: "1.4" }}>
          {exercise.instruction}
        </p>
        {exercise.context && (
          <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.6)" }}>
            {exercise.context}
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
          alt="Scène interactive"
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
                zIndex: isActive ? 20 : 10,
                animation: isDiscovered ? "none" : "hotspotPulse 2s ease infinite",
              }}
              title={hs.label}
            >
              <span
                className="font-mono font-bold text-xs text-white"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                {idx + 1}
              </span>
            </button>
          );
        })}

        {/* Active panel */}
        {activeHotspot && cfg && (
          <div
            className="absolute bottom-3 left-3 right-3 rounded-xl p-4"
            style={{
              background: "rgba(10,14,26,0.95)",
              border: `1.5px solid ${cfg.panelBorder}`,
              backdropFilter: "blur(12px)",
              zIndex: 30,
              boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
            }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2 mb-1.5">
                <div
                  className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
                  style={{ background: cfg.panelBg, border: `1px solid ${cfg.panelBorder}` }}
                >
                  {cfg.icon}
                </div>
                <span
                  className="font-mono text-xs font-semibold uppercase"
                  style={{ color: cfg.titleColor, fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.08em" }}
                >
                  {cfg.label}
                </span>
              </div>
              <button
                onClick={() => setActive(null)}
                className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <X size={11} color="rgba(255,255,255,0.6)" />
              </button>
            </div>
            <div className="font-semibold text-sm text-white mb-1" style={{ lineHeight: "1.35" }}>
              {activeHotspot.label}
            </div>
            <div className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
              {activeHotspot.description}
            </div>
            {activeHotspot.detail && (
              <div
                className="mt-2 px-3 py-2 rounded-lg text-xs font-semibold"
                style={{ background: cfg.panelBg, color: cfg.titleColor, border: `1px solid ${cfg.panelBorder}` }}
              >
                {activeHotspot.detail}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Completion banner */}
      {completed && (
        <div
          className="flex items-center gap-3 px-5 py-3"
          style={{ background: "rgba(25,128,56,0.06)", borderTop: "1.5px solid rgba(25,128,56,0.25)" }}
        >
          <CheckCircle2 size={18} style={{ color: "#198038", flexShrink: 0 }} />
          <div>
            <div className="text-sm font-bold" style={{ color: "#0e6027" }}>
              {exercise.successMessage || "Tous les points identifiés — Excellent travail !"}
            </div>
            <div className="text-xs" style={{ color: "#6f7897" }}>
              {exercise.hotspots.filter((h) => h.type === "danger").length} zone(s) dangereuse(s) identifiée(s)
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
                {c.label} ({count})
              </span>
            </div>
          );
        })}
        <span className="ml-auto text-xs" style={{ color: "#8d95aa" }}>
          Cliquez sur les marqueurs pour explorer
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
