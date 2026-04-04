import { useState } from "react";
import { CheckCircle2, XCircle, RotateCcw, GitMerge } from "lucide-react";
import { MatchExercise } from "@/lib/interactionData";
import { useLanguage } from "@/lib/languageContext";

const PAIR_COLORS = ["#0D47A1", "#7c3aed", "#198038", "#b45309", "#da1e28"];

interface Props {
  exercise: MatchExercise;
  onComplete?: (score: number) => void;
}

export default function MatchingExercise({ exercise, onComplete }: Props) {
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [matches, setMatches] = useState<Array<{ left: number; right: number }>>([]);
  const [validated, setValidated] = useState(false);
  const [shuffledRight] = useState(() => {
    const indices = exercise.pairs.map((_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return indices;
  });

  const matchedLeft = new Set(matches.map((m) => m.left));
  const matchedRight = new Set(matches.map((m) => m.right));

  const getMatchColor = (leftIdx: number) => {
    const match = matches.find((m) => m.left === leftIdx);
    return match !== undefined ? PAIR_COLORS[leftIdx % PAIR_COLORS.length] : null;
  };
  const getRightMatchColor = (rightOrigIdx: number) => {
    const match = matches.find((m) => m.right === rightOrigIdx);
    return match !== undefined ? PAIR_COLORS[match.left % PAIR_COLORS.length] : null;
  };

  const handleLeft = (i: number) => {
    if (validated) return;
    if (matchedLeft.has(i)) {
      setMatches(matches.filter((m) => m.left !== i));
      return;
    }
    setSelectedLeft(i);
  };

  const handleRight = (origIdx: number) => {
    if (validated || selectedLeft === null) return;
    if (matchedRight.has(origIdx)) {
      setMatches(matches.filter((m) => m.right !== origIdx));
      return;
    }
    setMatches([...matches, { left: selectedLeft, right: origIdx }]);
    setSelectedLeft(null);
  };

  const validate = () => {
    setValidated(true);
    const correct = matches.filter((m) => m.left === m.right).length;
    const score = Math.round((correct / exercise.pairs.length) * 100);
    onComplete?.(score);
  };

  const reset = () => { setMatches([]); setValidated(false); setSelectedLeft(null); };

  const correctCount = validated ? matches.filter((m) => m.left === m.right).length : 0;
  const { lang } = useLanguage();
  const isEN = lang === "en";

  return (
    <div style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl mb-4"
        style={{ background: "linear-gradient(135deg, #198038, #0e6027)", boxShadow: "0 4px 16px rgba(25,128,56,0.2)" }}
      >
        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,255,255,0.15)" }}>
          <GitMerge size={14} color="#fff" />
        </div>
        <div className="flex-1">
          <span className="font-bold text-white uppercase" style={{ fontSize: "0.82rem", letterSpacing: "0.08em" }}>{exercise.title}</span>
          {exercise.subtitle && <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.65)" }}>{exercise.subtitle}</div>}
        </div>
        <span className="font-mono text-xs px-2.5 py-1 rounded-full" style={{ color: "#fff", background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.25)", fontFamily: "'IBM Plex Mono', monospace" }}>
          {matches.length}/{exercise.pairs.length}
        </span>
      </div>

      {!validated && selectedLeft !== null && (
        <div className="text-xs text-center mb-3 px-3 py-2 rounded-lg" style={{ background: "rgba(13,71,161,0.08)", color: "#0D47A1", border: "1px solid rgba(13,71,161,0.2)" }}>
          {isEN ? "Selected:" : "Sélectionné :"} <strong>{exercise.pairs[selectedLeft].left}</strong> — {isEN ? "Now click the correct match on the right" : "Cliquez maintenant sur la bonne correspondance à droite"}
        </div>
      )}

      {/* Two columns */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {/* Left column */}
        <div className="flex flex-col gap-2">
          <div className="text-xs font-bold uppercase text-center mb-1" style={{ color: "#8d95aa", letterSpacing: "0.1em" }}>{isEN ? "Elements" : "Éléments"}</div>
          {exercise.pairs.map((pair, i) => {
            const color = getMatchColor(i);
            const isSelected = selectedLeft === i;
            return (
              <button
                key={i}
                onClick={() => handleLeft(i)}
                className="rounded-xl px-3 py-2.5 text-left transition-all"
                style={{
                  background: color ? `${color}15` : isSelected ? "rgba(13,71,161,0.12)" : "#fff",
                  border: `2px solid ${color ?? (isSelected ? "#0D47A1" : "#e4e7f0")}`,
                  color: "#0a2052",
                  cursor: validated ? "default" : "pointer",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  lineHeight: "1.3",
                  minHeight: "52px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {validated && (
                  matches.find((m) => m.left === i)?.right === i
                    ? <CheckCircle2 size={13} style={{ color: "#198038", flexShrink: 0, marginRight: "6px" }} />
                    : matches.find((m) => m.left === i)
                      ? <XCircle size={13} style={{ color: "#da1e28", flexShrink: 0, marginRight: "6px" }} />
                      : null
                )}
                {pair.left}
              </button>
            );
          })}
        </div>

        {/* Right column (shuffled) */}
        <div className="flex flex-col gap-2">
          <div className="text-xs font-bold uppercase text-center mb-1" style={{ color: "#8d95aa", letterSpacing: "0.1em" }}>{isEN ? "Matches" : "Correspondances"}</div>
          {shuffledRight.map((origIdx) => {
            const color = getRightMatchColor(origIdx);
            const isAvailable = !matchedRight.has(origIdx) && selectedLeft !== null && !validated;
            return (
              <button
                key={origIdx}
                onClick={() => handleRight(origIdx)}
                className="rounded-xl px-3 py-2.5 text-left transition-all"
                style={{
                  background: color ? `${color}15` : isAvailable ? "rgba(13,71,161,0.05)" : "#fff",
                  border: `2px solid ${color ?? (isAvailable ? "#0D47A1" : "#e4e7f0")}`,
                  color: "#0a2052",
                  cursor: validated ? "default" : "pointer",
                  fontSize: "0.78rem",
                  fontWeight: 500,
                  lineHeight: "1.3",
                  minHeight: "52px",
                  display: "flex",
                  alignItems: "center",
                  opacity: !validated && selectedLeft === null && !color ? 0.7 : 1,
                }}
              >
                {exercise.pairs[origIdx].right}
              </button>
            );
          })}
        </div>
      </div>

      {/* Validate / results */}
      {!validated ? (
        <button
          onClick={validate}
          disabled={matches.length < exercise.pairs.length}
          className="w-full flex items-center justify-center gap-2 rounded-xl py-3.5 font-bold transition-all"
          style={{
            background: matches.length === exercise.pairs.length ? "linear-gradient(135deg, #198038, #0e6027)" : "#e4e7f0",
            color: matches.length === exercise.pairs.length ? "#fff" : "#adb3c8",
            border: "none",
            cursor: matches.length === exercise.pairs.length ? "pointer" : "not-allowed",
            fontSize: "0.9375rem",
            boxShadow: matches.length === exercise.pairs.length ? "0 4px 16px rgba(25,128,56,0.3)" : "none",
          }}
        >
          {isEN ? "Validate matches" : "Valider les associations"}
        </button>
      ) : (
        <div className="flex items-center gap-3 rounded-xl px-4 py-3" style={{ background: correctCount === exercise.pairs.length ? "rgba(25,128,56,0.08)" : "rgba(180,83,9,0.08)", border: `1.5px solid ${correctCount === exercise.pairs.length ? "rgba(25,128,56,0.25)" : "rgba(180,83,9,0.25)"}` }}>
          <div className="flex-1">
            <div className="font-bold text-sm" style={{ color: correctCount === exercise.pairs.length ? "#0e6027" : "#92400e" }}>
              {correctCount === exercise.pairs.length ? (exercise.successMessage ?? (isEN ? "Perfect matches!" : "Associations parfaites !")) : (isEN ? `${correctCount}/${exercise.pairs.length} correct matches` : `${correctCount}/${exercise.pairs.length} associations correctes`)}
            </div>
          </div>
          <button onClick={reset} className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg" style={{ background: "rgba(13,71,161,0.08)", color: "#0D47A1", border: "1px solid rgba(13,71,161,0.2)", cursor: "pointer" }}>
            <RotateCcw size={12} /> {isEN ? "Retry" : "Refaire"}
          </button>
        </div>
      )}
    </div>
  );
}
