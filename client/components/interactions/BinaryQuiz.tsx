import { useState } from "react";
import { CheckCircle2, XCircle, RotateCcw, ToggleLeft } from "lucide-react";
import { BinaryExercise } from "@/lib/interactionData";

interface Props {
  exercise: BinaryExercise;
  onComplete?: (score: number) => void;
}

export default function BinaryQuiz({ exercise, onComplete }: Props) {
  const [answers, setAnswers] = useState<Record<number, boolean | null>>({});
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const [done, setDone] = useState(false);

  const answer = (i: number, val: boolean) => {
    if (revealed.has(i)) return;
    const next = { ...answers, [i]: val };
    const nextRevealed = new Set(revealed);
    nextRevealed.add(i);
    setAnswers(next);
    setRevealed(nextRevealed);
    if (nextRevealed.size === exercise.statements.length) {
      const correct = exercise.statements.filter((s, idx) => next[idx] === s.isTrue).length;
      const score = Math.round((correct / exercise.statements.length) * 100);
      setDone(true);
      setTimeout(() => onComplete?.(score), 600);
    }
  };

  const reset = () => { setAnswers({}); setRevealed(new Set()); setDone(false); };

  const correct = exercise.statements.filter((s, i) => answers[i] === s.isTrue).length;

  return (
    <div style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl mb-4"
        style={{ background: "linear-gradient(135deg, #0D47A1, #1565C0)", boxShadow: "0 4px 16px rgba(13,71,161,0.2)" }}
      >
        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,255,255,0.15)" }}>
          <ToggleLeft size={14} color="#fff" />
        </div>
        <div className="flex-1">
          <span className="font-bold text-white uppercase" style={{ fontSize: "0.82rem", letterSpacing: "0.08em" }}>{exercise.title}</span>
          {exercise.subtitle && <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.65)" }}>{exercise.subtitle}</div>}
        </div>
        <span className="font-mono text-xs px-2.5 py-1 rounded-full" style={{ color: "#fff", background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.25)", fontFamily: "'IBM Plex Mono', monospace" }}>
          {revealed.size}/{exercise.statements.length}
        </span>
      </div>

      {/* Statements */}
      <div className="flex flex-col gap-3 mb-4">
        {exercise.statements.map((stmt, i) => {
          const answered = revealed.has(i);
          const userAnswer = answers[i];
          const isCorrect = userAnswer === stmt.isTrue;

          return (
            <div key={i} className="rounded-2xl overflow-hidden" style={{
              border: `2px solid ${answered ? (isCorrect ? "rgba(25,128,56,0.35)" : "rgba(218,30,40,0.35)") : "#e4e7f0"}`,
              background: answered ? (isCorrect ? "rgba(25,128,56,0.04)" : "rgba(218,30,40,0.04)") : "#fff",
              transition: "border-color 0.3s, background 0.3s",
            }}>
              {/* Statement text */}
              <div className="px-4 py-3.5">
                <div className="flex items-start gap-2.5">
                  <span className="font-mono font-bold flex-shrink-0 w-5 h-5 rounded flex items-center justify-center text-xs mt-0.5"
                    style={{ background: "#0D47A1", color: "#fff", fontFamily: "'IBM Plex Mono', monospace", fontSize: "9px" }}>
                    {i + 1}
                  </span>
                  <span style={{ fontSize: "0.88rem", color: "#0a2052", lineHeight: "1.5", fontWeight: 500 }}>{stmt.statement}</span>
                </div>
              </div>

              {/* Buttons */}
              {!answered && (
                <div className="flex border-t" style={{ borderColor: "#f0f2f8" }}>
                  <button
                    onClick={() => answer(i, true)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 font-bold transition-all"
                    style={{ background: "none", border: "none", cursor: "pointer", color: "#198038", fontSize: "0.88rem", borderRight: "1px solid #f0f2f8" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(25,128,56,0.06)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
                  >
                    <CheckCircle2 size={16} /> VRAI
                  </button>
                  <button
                    onClick={() => answer(i, false)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 font-bold transition-all"
                    style={{ background: "none", border: "none", cursor: "pointer", color: "#da1e28", fontSize: "0.88rem" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(218,30,40,0.06)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
                  >
                    <XCircle size={16} /> FAUX
                  </button>
                </div>
              )}

              {/* Feedback */}
              {answered && (
                <div className="px-4 pb-3.5 flex items-start gap-2.5">
                  {isCorrect
                    ? <CheckCircle2 size={15} style={{ color: "#198038", flexShrink: 0, marginTop: "1px" }} />
                    : <XCircle size={15} style={{ color: "#da1e28", flexShrink: 0, marginTop: "1px" }} />
                  }
                  <div>
                    <div className="font-bold text-xs mb-0.5" style={{ color: isCorrect ? "#0e6027" : "#a2191f" }}>
                      {isCorrect ? "Correct !" : `Incorrect — c'est ${stmt.isTrue ? "VRAI" : "FAUX"}`}
                    </div>
                    <div style={{ fontSize: "0.78rem", color: "#6f7897", lineHeight: "1.45" }}>{stmt.explanation}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Score + reset */}
      {done && (
        <div className="rounded-xl px-4 py-3 flex items-center gap-3" style={{ background: correct >= Math.ceil(exercise.statements.length * 0.8) ? "rgba(25,128,56,0.08)" : "rgba(180,83,9,0.08)", border: `1.5px solid ${correct >= Math.ceil(exercise.statements.length * 0.8) ? "rgba(25,128,56,0.25)" : "rgba(180,83,9,0.25)"}` }}>
          <div className="flex-1">
            <div className="font-bold text-sm" style={{ color: correct >= Math.ceil(exercise.statements.length * 0.8) ? "#0e6027" : "#92400e" }}>
              {correct >= Math.ceil(exercise.statements.length * 0.8) ? (exercise.successMessage ?? "Excellent résultat !") : "Quelques révisions s'imposent"}
            </div>
            <div className="text-xs mt-0.5" style={{ color: "#6f7897" }}>{correct}/{exercise.statements.length} bonnes réponses</div>
          </div>
          <button onClick={reset} className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg" style={{ background: "rgba(13,71,161,0.08)", color: "#0D47A1", border: "1px solid rgba(13,71,161,0.2)", cursor: "pointer" }}>
            <RotateCcw size={12} /> Refaire
          </button>
        </div>
      )}
    </div>
  );
}
