import { useState } from "react";
import { CheckCircle2, XCircle, RotateCcw, PenLine } from "lucide-react";
import { FillBlankExercise } from "@/lib/interactionData";

interface Props {
  exercise: FillBlankExercise;
  onComplete?: (score: number) => void;
}

export default function FillBlank({ exercise, onComplete }: Props) {
  const [inputs, setInputs] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  const [done, setDone] = useState(false);

  const handleCheck = () => {
    setChecked(true);
    setDone(true);
    const correct = exercise.sentences.filter((s, i) =>
      (inputs[i] ?? "").trim().toLowerCase() === s.answer.toLowerCase()
    ).length;
    const score = Math.round((correct / exercise.sentences.length) * 100);
    setTimeout(() => onComplete?.(score), 800);
  };

  const reset = () => { setInputs({}); setChecked(false); setDone(false); };

  const allFilled = exercise.sentences.every((_, i) => (inputs[i] ?? "").trim().length > 0);
  const correct = checked ? exercise.sentences.filter((s, i) => (inputs[i] ?? "").trim().toLowerCase() === s.answer.toLowerCase()).length : 0;

  return (
    <div style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl mb-4"
        style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9)", boxShadow: "0 4px 16px rgba(124,58,237,0.25)" }}
      >
        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,255,255,0.15)" }}>
          <PenLine size={14} color="#fff" />
        </div>
        <div className="flex-1">
          <span className="font-bold text-white uppercase" style={{ fontSize: "0.82rem", letterSpacing: "0.08em" }}>{exercise.title}</span>
          {exercise.subtitle && <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.65)" }}>{exercise.subtitle}</div>}
        </div>
        {checked && (
          <span className="font-mono text-xs px-2.5 py-1 rounded-full" style={{ color: "#fff", background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.25)", fontFamily: "'IBM Plex Mono', monospace" }}>
            {correct}/{exercise.sentences.length}
          </span>
        )}
      </div>

      {/* Sentences */}
      <div className="flex flex-col gap-3 mb-4">
        {exercise.sentences.map((sent, i) => {
          const val = inputs[i] ?? "";
          const isCorrect = checked && val.trim().toLowerCase() === sent.answer.toLowerCase();
          const isWrong = checked && val.trim().toLowerCase() !== sent.answer.toLowerCase();
          return (
            <div key={i} className="rounded-2xl px-4 py-3.5" style={{
              background: checked ? (isCorrect ? "rgba(25,128,56,0.06)" : "rgba(218,30,40,0.05)") : "#fff",
              border: `2px solid ${checked ? (isCorrect ? "rgba(25,128,56,0.3)" : "rgba(218,30,40,0.3)") : "#e4e7f0"}`,
              transition: "all 0.3s",
            }}>
              <div className="flex flex-wrap items-center gap-2" style={{ fontSize: "0.9rem", color: "#0a2052", lineHeight: "1.8" }}>
                <span className="font-mono font-bold text-xs px-1.5 py-0.5 rounded" style={{ background: "#0D47A1", color: "#fff", fontFamily: "'IBM Plex Mono', monospace" }}>
                  {i + 1}
                </span>
                <span style={{ fontWeight: 500 }}>{sent.before}</span>
                <span style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
                  <input
                    type="text"
                    value={val}
                    onChange={(e) => !checked && setInputs({ ...inputs, [i]: e.target.value })}
                    placeholder={sent.hint ?? "votre réponse"}
                    disabled={checked}
                    style={{
                      border: `2px solid ${isCorrect ? "#198038" : isWrong ? "#da1e28" : "#0D47A1"}`,
                      borderRadius: "8px",
                      padding: "3px 10px",
                      fontSize: "0.88rem",
                      fontWeight: 700,
                      color: isCorrect ? "#198038" : isWrong ? "#da1e28" : "#0D47A1",
                      background: isCorrect ? "rgba(25,128,56,0.08)" : isWrong ? "rgba(218,30,40,0.06)" : "rgba(13,71,161,0.06)",
                      minWidth: "120px",
                      outline: "none",
                      fontFamily: "'IBM Plex Sans', sans-serif",
                    }}
                  />
                  {isCorrect && <CheckCircle2 size={14} style={{ color: "#198038", position: "absolute", right: "-20px" }} />}
                  {isWrong && <XCircle size={14} style={{ color: "#da1e28", position: "absolute", right: "-20px" }} />}
                </span>
                {sent.after && <span style={{ fontWeight: 500 }}>{sent.after}</span>}
              </div>
              {isWrong && (
                <div className="mt-2 text-xs" style={{ color: "#da1e28" }}>
                  Réponse correcte : <strong>« {sent.answer} »</strong>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action */}
      {!checked ? (
        <button
          onClick={handleCheck}
          disabled={!allFilled}
          className="w-full flex items-center justify-center gap-2 rounded-xl py-3.5 font-bold transition-all"
          style={{
            background: allFilled ? "linear-gradient(135deg, #7c3aed, #6d28d9)" : "#e4e7f0",
            color: allFilled ? "#fff" : "#adb3c8",
            border: "none",
            cursor: allFilled ? "pointer" : "not-allowed",
            fontSize: "0.9375rem",
            boxShadow: allFilled ? "0 4px 16px rgba(124,58,237,0.3)" : "none",
          }}
        >
          Valider mes réponses
        </button>
      ) : (
        <div className="flex items-center gap-3 rounded-xl px-4 py-3" style={{ background: correct === exercise.sentences.length ? "rgba(25,128,56,0.08)" : "rgba(180,83,9,0.08)", border: `1.5px solid ${correct === exercise.sentences.length ? "rgba(25,128,56,0.25)" : "rgba(180,83,9,0.25)"}` }}>
          <div className="flex-1">
            <div className="font-bold text-sm" style={{ color: correct === exercise.sentences.length ? "#0e6027" : "#92400e" }}>
              {correct === exercise.sentences.length ? (exercise.successMessage ?? "Parfait !") : `${correct}/${exercise.sentences.length} — Revoyez les réponses surlignées en rouge`}
            </div>
          </div>
          <button onClick={reset} className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg" style={{ background: "rgba(13,71,161,0.08)", color: "#0D47A1", border: "1px solid rgba(13,71,161,0.2)", cursor: "pointer" }}>
            <RotateCcw size={12} /> Refaire
          </button>
        </div>
      )}
    </div>
  );
}
