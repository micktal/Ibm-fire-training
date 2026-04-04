import { useState } from "react";
import { Flame, Wind, Zap, Shield, Eye, Users, CheckCircle2, RotateCcw, Layers } from "lucide-react";
import { FlipCardsExercise } from "@/lib/interactionData";
import { useLanguage } from "@/lib/languageContext";

const ICON_MAP: Record<string, React.ReactNode> = {
  Flame: <Flame size={32} />,
  Wind: <Wind size={32} />,
  Zap: <Zap size={32} />,
  Shield: <Shield size={32} />,
  Eye: <Eye size={32} />,
  Users: <Users size={32} />,
  CheckCircle: <CheckCircle2 size={32} />,
  Layers: <Layers size={32} />,
};

interface Props {
  exercise: FlipCardsExercise;
  onComplete?: (score: number) => void;
}

export default function FlipCards({ exercise, onComplete }: Props) {
  const [flipped, setFlipped] = useState<Set<number>>(new Set());
  const [done, setDone] = useState(false);

  const handleFlip = (i: number) => {
    const next = new Set(flipped);
    next.has(i) ? next.delete(i) : next.add(i);
    setFlipped(next);
    if (next.size === exercise.cards.length && !done) {
      setDone(true);
      onComplete?.(100);
    }
  };

  const reset = () => { setFlipped(new Set()); setDone(false); };
  const { lang } = useLanguage();
  const isEN = lang === "en";

  return (
    <div style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl mb-4"
        style={{ background: "linear-gradient(135deg, #0D47A1, #1565C0)", boxShadow: "0 4px 16px rgba(13,71,161,0.2)" }}
      >
        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,255,255,0.15)" }}>
          <Layers size={14} color="#fff" />
        </div>
        <div className="flex-1">
          <span className="font-bold text-white uppercase" style={{ fontSize: "0.82rem", letterSpacing: "0.08em" }}>{exercise.title}</span>
          {exercise.subtitle && <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.65)" }}>{exercise.subtitle}</div>}
        </div>
        <span className="font-mono text-xs px-2.5 py-1 rounded-full" style={{ color: "#fff", background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.25)", fontFamily: "'IBM Plex Mono', monospace" }}>
          {flipped.size}/{exercise.cards.length} {isEN ? "flipped" : "retournées"}
        </span>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {exercise.cards.map((card, i) => {
          const isFlipped = flipped.has(i);
          const color = card.color ?? "#0D47A1";
          return (
            <div
              key={i}
              onClick={() => handleFlip(i)}
              style={{ perspective: "800px", cursor: "pointer", height: "160px" }}
            >
              <div style={{
                position: "relative",
                width: "100%",
                height: "100%",
                transition: "transform 0.55s cubic-bezier(0.4,0,0.2,1)",
                transformStyle: "preserve-3d",
                transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
              }}>
                {/* Front */}
                <div style={{
                  position: "absolute", inset: 0,
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  borderRadius: "16px",
                  background: `linear-gradient(145deg, ${color}ee, ${color}cc)`,
                  border: `2px solid ${color}`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  padding: "16px",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                }}>
                  <div style={{ color: "rgba(255,255,255,0.85)" }}>
                    {card.icon && ICON_MAP[card.icon]}
                  </div>
                  <div className="font-bold text-white text-center" style={{ fontSize: "0.95rem", letterSpacing: "0.02em", lineHeight: "1.25", whiteSpace: "pre-line" }}>
                    {card.front}
                  </div>
                  <div className="text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>{isEN ? "Click to flip" : "Cliquer pour retourner"}</div>
                </div>

                {/* Back */}
                <div style={{
                  position: "absolute", inset: 0,
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  borderRadius: "16px",
                  background: "#fff",
                  border: `2px solid ${color}`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  padding: "14px",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                  gap: "6px",
                }}>
                  <div className="font-bold text-xs uppercase mb-1" style={{ color, letterSpacing: "0.1em" }}>{card.front.replace("\n", " ")}</div>
                  <div style={{ fontSize: "0.8rem", color: "#0a2052", lineHeight: "1.5", fontWeight: 500 }}>{card.back}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Completion */}
      {done && (
        <div className="rounded-xl px-4 py-3 flex items-center gap-3" style={{ background: "rgba(25,128,56,0.08)", border: "1.5px solid rgba(25,128,56,0.25)" }}>
          <CheckCircle2 size={18} style={{ color: "#198038", flexShrink: 0 }} />
          <div className="flex-1">
            <div className="font-bold text-sm" style={{ color: "#0e6027" }}>{isEN ? "All cards discovered!" : "Toutes les cartes découvertes !"}</div>
            <div className="text-xs" style={{ color: "#6f7897" }}>{isEN ? "Click again to hide a card." : "Cliquez à nouveau pour masquer une carte."}</div>
          </div>
          <button onClick={reset} style={{ background: "none", border: "none", cursor: "pointer", color: "#198038", display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", fontWeight: 600 }}>
            <RotateCcw size={13} /> {isEN ? "Restart" : "Recommencer"}
          </button>
        </div>
      )}
    </div>
  );
}
