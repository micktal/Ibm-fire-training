import { useState } from "react";
import { useLanguage } from "@/lib/languageContext";
import {
  Flame, Clock, AlertTriangle, Shield, Zap, Eye,
  Timer, Target, CheckSquare, DoorClosed, ArrowRight,
  XCircle, TrendingDown, Wind, ArrowDown, RotateCcw,
  Lightbulb, Star, BookOpen,
} from "lucide-react";
import { TipFlipExercise } from "@/lib/interactionData";

// ── Icon & accent maps ───────────────────────────────────────────
const ICON_MAP: Record<string, React.ReactNode> = {
  Flame:        <Flame size={22} />,
  Clock:        <Clock size={22} />,
  AlertTriangle:<AlertTriangle size={22} />,
  Shield:       <Shield size={22} />,
  Zap:          <Zap size={22} />,
  Eye:          <Eye size={22} />,
  Timer:        <Timer size={22} />,
  Target:       <Target size={22} />,
  CheckSquare:  <CheckSquare size={22} />,
  DoorClosed:   <DoorClosed size={22} />,
  ArrowRight:   <ArrowRight size={22} />,
  XCircle:      <XCircle size={22} />,
  TrendingDown: <TrendingDown size={22} />,
  Wind:         <Wind size={22} />,
  ArrowDown:    <ArrowDown size={22} />,
  Lightbulb:    <Lightbulb size={22} />,
  Star:         <Star size={22} />,
  BookOpen:     <BookOpen size={22} />,
};

const ACCENT = {
  flame:  { color: "#ff6b1a", bg: "rgba(255,107,26,0.1)",  border: "rgba(255,107,26,0.22)", gradient: "linear-gradient(135deg, #ff6b1a, #e8520a)" },
  clock:  { color: "#0f62fe", bg: "rgba(15,98,254,0.09)",  border: "rgba(15,98,254,0.22)",  gradient: "linear-gradient(135deg, #0f62fe, #0043ce)" },
  alert:  { color: "#da1e28", bg: "rgba(218,30,40,0.08)",  border: "rgba(218,30,40,0.22)",  gradient: "linear-gradient(135deg, #da1e28, #a2191f)" },
  shield: { color: "#198038", bg: "rgba(25,128,56,0.08)",  border: "rgba(25,128,56,0.22)",  gradient: "linear-gradient(135deg, #198038, #0e6027)" },
  zap:    { color: "#8a3ffc", bg: "rgba(138,63,252,0.08)", border: "rgba(138,63,252,0.22)", gradient: "linear-gradient(135deg, #8a3ffc, #6929c4)" },
  eye:    { color: "#0043ce", bg: "rgba(0,67,206,0.08)",   border: "rgba(0,67,206,0.22)",   gradient: "linear-gradient(135deg, #0043ce, #0031a9)" },
};

const CATEGORY_LABELS: Record<string, string> = {
  funfact: "Le saviez-vous ?",
  astuce:  "Astuce",
  chiffre: "Chiffre clé",
};

interface Props {
  exercise: TipFlipExercise;
  onComplete?: (score: number) => void;
}

export default function TipFlipCards({ exercise, onComplete }: Props) {
  const { lang } = useLanguage();
  const isEN = lang === "en";
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

  return (
    <div style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>

      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 py-3 rounded-xl mb-4"
        style={{ background: "linear-gradient(135deg, #0D47A1, #1565C0)", boxShadow: "0 4px 16px rgba(13,71,161,0.2)" }}
      >
        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,255,255,0.15)" }}>
          <Lightbulb size={14} color="#fff" />
        </div>
        <div className="flex-1">
          <span className="font-bold text-white uppercase" style={{ fontSize: "0.82rem", letterSpacing: "0.08em" }}>{isEN ? (exercise.titleEn ?? exercise.title) : exercise.title}</span>
          {exercise.subtitle && (
            <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.6)" }}>{isEN ? (exercise.subtitleEn ?? exercise.subtitle) : exercise.subtitle}</div>
          )}
        </div>
        <span
          className="font-mono text-xs px-2.5 py-1 rounded-full"
          style={{ color: "#fff", background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.25)", fontFamily: "'IBM Plex Mono', monospace" }}
        >
          {flipped.size}/{exercise.cards.length} {isEN ? "flipped" : "retournées"}
        </span>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {exercise.cards.map((card, i) => {
          const isFlipped = flipped.has(i);
          const accent = ACCENT[card.accent];

          return (
            <div
              key={i}
              onClick={() => handleFlip(i)}
              style={{ perspective: "900px", cursor: "pointer", height: "175px" }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  transition: "transform 0.6s cubic-bezier(0.4,0,0.2,1)",
                  transformStyle: "preserve-3d",
                  transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
              >
                {/* ── FRONT — FactCard style ────────────────── */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    borderRadius: "18px",
                    background: "rgba(255,255,255,0.85)",
                    backdropFilter: "blur(14px)",
                    WebkitBackdropFilter: "blur(14px)",
                    border: `1.5px solid ${accent.border}`,
                    boxShadow: `0 4px 20px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.7)`,
                    display: "flex",
                    flexDirection: "column",
                    padding: "14px",
                    gap: "8px",
                  }}
                >
                  {/* Top row: icon badge + category tag */}
                  <div className="flex items-start justify-between">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: accent.bg, border: `1.5px solid ${accent.border}`, color: accent.color }}
                    >
                      {ICON_MAP[card.icon] ?? <Star size={22} />}
                    </div>
                    <div
                      className="font-mono text-xs px-2 py-0.5 rounded-full"
                      style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        color: accent.color,
                        background: accent.bg,
                        border: `1px solid ${accent.border}`,
                        fontSize: "8px",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {CATEGORY_LABELS[card.category]}
                    </div>
                  </div>

                  {/* Stat — big number */}
                  <div className="flex-1 flex flex-col justify-center">
                    <div
                      className="font-mono font-bold"
                      style={{
                        fontSize: "1.6rem",
                        lineHeight: 1,
                        color: accent.color,
                        fontFamily: "'IBM Plex Mono', monospace",
                        letterSpacing: "-0.03em",
                      }}
                    >
                      {card.stat}
                    </div>
                    <div
                      className="font-semibold mt-1"
                      style={{ fontSize: "0.8rem", color: "#2d3148", lineHeight: "1.3" }}
                    >
                      {isEN ? (card.labelEn ?? card.label) : card.label}
                    </div>
                  </div>

                  {/* Flip hint */}
                  <div
                    className="flex items-center gap-1"
                    style={{ color: accent.color, opacity: 0.6, fontSize: "0.7rem" }}
                  >
                    <RotateCcw size={10} />
                    <span>{isEN ? "Flip" : "Retourner"}</span>
                  </div>
                </div>

                {/* ── BACK — IBM premium dark ───────────────── */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                    borderRadius: "18px",
                    background: "linear-gradient(145deg, #0A1628, #0D2B55)",
                    border: `1.5px solid ${accent.border}`,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.18)",
                    display: "flex",
                    flexDirection: "column",
                    padding: "14px",
                    gap: "8px",
                    overflow: "hidden",
                  }}
                >
                  {/* Background geometric accent */}
                  <div style={{
                    position: "absolute",
                    top: "-20px",
                    right: "-20px",
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    background: accent.gradient,
                    opacity: 0.15,
                  }} />

                  {/* Small icon + title */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div
                      className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: accent.gradient }}
                    >
                      <div style={{ color: "#fff", transform: "scale(0.6)", transformOrigin: "center" }}>
                        {ICON_MAP[card.icon] ?? <Star size={22} />}
                      </div>
                    </div>
                    <div
                      className="font-bold"
                      style={{ color: accent.color, fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase" }}
                    >
                      {(isEN ? (card.tipTitleEn ?? card.tipTitle) : card.tipTitle) ?? (isEN ? (card.labelEn ?? card.label) : card.label)}
                    </div>
                  </div>

                  {/* Tip text */}
                  <div
                    style={{
                      color: "rgba(255,255,255,0.82)",
                      fontSize: "0.77rem",
                      lineHeight: "1.55",
                      flex: 1,
                      overflow: "hidden",
                    }}
                  >
                    {isEN ? (card.tipEn ?? card.tip) : card.tip}
                  </div>

                  {/* Flip back hint */}
                  <div
                    className="flex items-center gap-1"
                    style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.68rem" }}
                  >
                    <RotateCcw size={9} />
                    <span>{isEN ? "Flip" : "Retourner"}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Completion banner */}
      {done && (
        <div
          className="rounded-xl px-4 py-3 flex items-center gap-3"
          style={{ background: "rgba(25,128,56,0.08)", border: "1.5px solid rgba(25,128,56,0.25)" }}
        >
          <Star size={18} style={{ color: "#198038", flexShrink: 0 }} />
          <div className="flex-1">
            <div className="font-bold text-sm" style={{ color: "#0e6027" }}>Toutes les cartes découvertes !</div>
            <div className="text-xs" style={{ color: "#6f7897" }}>Ces informations font partie des points clés du module.</div>
          </div>
          <button
            onClick={reset}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#198038", display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", fontWeight: 600 }}
          >
            <RotateCcw size={12} />
            Revoir
          </button>
        </div>
      )}
    </div>
  );
}
