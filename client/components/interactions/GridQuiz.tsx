import { useState } from "react";
import { CheckCircle2, XCircle, LayoutGrid, Trophy } from "lucide-react";
import { GridQuizExercise } from "@/lib/interactionData";
import { useLanguage } from "@/lib/languageContext";

interface Props {
  exercise: GridQuizExercise;
  onComplete?: (score: number) => void;
}

// All 8 winning lines in a 3×3 grid
const WIN_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6],             // diagonals
];

export default function GridQuiz({ exercise, onComplete }: Props) {
  const { lang } = useLanguage();
  const cells = exercise.cells;
  const total = cells.length;

  const [activeCell, setActiveCell] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<number, "true" | "false">>({});
  const [winLine, setWinLine] = useState<number[] | null>(null);

  const title = lang === "en" ? (exercise.titleEn ?? exercise.title) : exercise.title;

  const getCellState = (i: number): "unanswered" | "correct" | "wrong" =>
    answers[i] === undefined ? "unanswered" : answers[i] === cells[i].correct ? "correct" : "wrong";

  const checkWin = (nextAnswers: Record<number, "true" | "false">): number[] | null => {
    for (const line of WIN_LINES) {
      if (line.every((idx) => nextAnswers[idx] !== undefined && nextAnswers[idx] === cells[idx].correct)) {
        return line;
      }
    }
    return null;
  };

  const handleAnswer = (answer: "true" | "false") => {
    if (activeCell === null || answers[activeCell] !== undefined || winLine) return;
    const next = { ...answers, [activeCell]: answer };
    setAnswers(next);

    const found = checkWin(next);
    if (found) {
      setWinLine(found);
      const correct = cells.filter((c, i) => next[i] === c.correct).length;
      const score = Math.round((correct / total) * 100);
      setTimeout(() => onComplete?.(score), 800);
    }
  };

  const reset = () => {
    setAnswers({});
    setActiveCell(null);
    setWinLine(null);
  };

  const correctCount = cells.filter((c, i) => answers[i] === c.correct).length;
  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === total;
  const isWon = winLine !== null;

  const active = activeCell !== null ? cells[activeCell] : null;
  const activeAnswer = activeCell !== null ? answers[activeCell] : undefined;
  const activeIsCorrect = activeAnswer !== undefined && activeAnswer === active?.correct;

  // Cell visual style
  const cellStyle = (i: number, isActive: boolean) => {
    const state = getCellState(i);
    const isWinCell = winLine?.includes(i);

    if (isWinCell) {
      return {
        background: "linear-gradient(135deg, #b45309, #d97706)",
        border: "3px solid #f59e0b",
        color: "#fff" as const,
        transform: "scale(1.12)",
        boxShadow: "0 0 20px rgba(245,158,11,0.6)",
      };
    }
    if (state === "correct") {
      return {
        background: "linear-gradient(135deg, #198038, #24a148)",
        border: "2px solid rgba(25,128,56,0.6)",
        color: "#fff" as const,
        transform: isActive ? "scale(1.08)" : "scale(1)",
        boxShadow: "0 4px 12px rgba(25,128,56,0.35)",
      };
    }
    if (state === "wrong") {
      return {
        background: "linear-gradient(135deg, #da1e28, #fa4d56)",
        border: "2px solid rgba(218,30,40,0.5)",
        color: "#fff" as const,
        transform: isActive ? "scale(1.08)" : "scale(1)",
        boxShadow: "0 4px 12px rgba(218,30,40,0.3)",
      };
    }
    if (isActive) {
      return {
        background: "linear-gradient(135deg, #0043ce, #0f62fe)",
        border: "2px solid rgba(0,67,206,0.8)",
        color: "#fff" as const,
        transform: "scale(1.08)",
        boxShadow: "0 6px 18px rgba(0,67,206,0.4)",
      };
    }
    return {
      background: "linear-gradient(135deg, rgba(25,128,56,0.08), rgba(25,128,56,0.14))",
      border: "2px solid rgba(25,128,56,0.25)",
      color: "#198038" as const,
      transform: "scale(1)",
      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
    };
  };

  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: "1.5px solid #e4e7f0", background: "#fff", fontFamily: "'IBM Plex Sans', sans-serif" }}>
      {/* Header */}
      <div className="px-5 py-4" style={{ background: "linear-gradient(135deg, #198038 0%, #24a148 100%)" }}>
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,255,255,0.18)" }}>
            <LayoutGrid size={14} color="#fff" />
          </div>
          <div>
            <div className="font-bold text-white" style={{ fontSize: "0.9rem" }}>{title}</div>
            <div style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.78rem", fontStyle: "italic" }}>
              {lang === "en" ? "3 correct answers aligned = victory!" : "3 bonnes réponses alignées = victoire !"}
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-4">

        {/* Instruction */}
        <div className="flex items-center gap-2 rounded-xl px-4 py-2.5" style={{ background: "rgba(0,67,206,0.05)", border: "1px solid rgba(0,67,206,0.15)" }}>
          <span style={{ color: "#0043ce", fontSize: "1rem" }}>☞</span>
          <span style={{ color: "#3d4259", fontSize: "0.82rem" }}>
            {lang === "en"
              ? "Click a cell, answer True or False. Align 3 correct answers in a row, column or diagonal to win."
              : "Cliquez une case, répondez Vrai ou Faux. Alignez 3 bonnes réponses en ligne, colonne ou diagonale pour gagner."}
          </span>
        </div>

        {/* Grid + Question panel */}
        <div className="flex gap-4 flex-col sm:flex-row">

          {/* Grid */}
          <div className="flex-shrink-0 flex items-center justify-center">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px", padding: "4px" }}>
              {cells.map((_, i) => {
                const state = getCellState(i);
                const isActive = activeCell === i;
                const s = cellStyle(i, isActive);
                const disabled = !!winLine && !winLine.includes(i);

                return (
                  <button
                    key={i}
                    onClick={() => !winLine && setActiveCell(i)}
                    disabled={disabled}
                    style={{
                      width: "72px",
                      height: "72px",
                      borderRadius: "12px",
                      cursor: winLine ? "default" : "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.25s cubic-bezier(0.34,1.56,0.64,1)",
                      opacity: disabled ? 0.45 : 1,
                      ...s,
                    }}
                  >
                    {state === "correct" ? (
                      <CheckCircle2 size={28} color="#fff" strokeWidth={2.5} />
                    ) : state === "wrong" ? (
                      <XCircle size={28} color="#fff" strokeWidth={2.5} />
                    ) : (
                      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "13px", fontWeight: 800 }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question panel */}
          <div className="flex-1 min-h-0">
            {isWon ? (
              /* WIN screen */
              <div
                className="flex flex-col items-center justify-center gap-3 h-full rounded-2xl p-5 text-center"
                style={{
                  background: "linear-gradient(135deg, rgba(180,83,9,0.07), rgba(245,158,11,0.1))",
                  border: "2px solid rgba(245,158,11,0.45)",
                  minHeight: "200px",
                  animation: "celebrationPop 0.45s cubic-bezier(0.34,1.56,0.64,1) both",
                }}
              >
                <Trophy size={36} style={{ color: "#d97706" }} />
                <div className="font-bold" style={{ color: "#92400e", fontSize: "1.15rem" }}>
                  {lang === "en" ? "Alignment! You win! 🎉" : "Alignement ! Vous avez gagné ! 🎉"}
                </div>
                <div style={{ color: "#6f7897", fontSize: "0.85rem" }}>
                  {lang === "en"
                    ? `${correctCount} correct answers — challenge complete!`
                    : `${correctCount} bonne${correctCount > 1 ? "s" : ""} réponse${correctCount > 1 ? "s" : ""} — défi réussi !`}
                </div>
                <button
                  onClick={reset}
                  className="mt-1 flex items-center gap-2 rounded-xl px-5 py-2.5 font-semibold text-sm"
                  style={{ background: "#d97706", color: "#fff", border: "none", cursor: "pointer" }}
                >
                  ↺ {lang === "en" ? "Play again" : "Rejouer"}
                </button>
              </div>
            ) : active ? (
              <div className="flex flex-col gap-3 h-full">
                {/* Question badge */}
                <div
                  className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg w-fit uppercase"
                  style={{ background: "rgba(25,128,56,0.08)", color: "#198038", fontSize: "9px", letterSpacing: "0.1em", border: "1px solid rgba(25,128,56,0.2)" }}
                >
                  {lang === "en" ? "QUESTION" : "QUESTION"} {activeCell! + 1}
                </div>

                {/* Statement */}
                <div
                  className="rounded-xl p-4"
                  style={{
                    background: activeAnswer !== undefined
                      ? activeIsCorrect ? "rgba(25,128,56,0.04)" : "rgba(218,30,40,0.04)"
                      : "#f8f9fc",
                    border: activeAnswer !== undefined
                      ? `1.5px solid ${activeIsCorrect ? "rgba(25,128,56,0.2)" : "rgba(218,30,40,0.2)"}`
                      : "1.5px solid #e8eaf2",
                    transition: "all 0.3s ease",
                  }}
                >
                  <p className="font-semibold" style={{ color: "#0a2052", fontSize: "0.9rem", lineHeight: "1.55" }}>
                    {lang === "en" ? (active.statementEn ?? active.statement) : active.statement}
                  </p>
                </div>

                {/* Buttons or feedback */}
                {activeAnswer === undefined ? (
                  <div className="flex gap-2.5">
                    <button
                      onClick={() => handleAnswer("true")}
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all"
                      style={{ background: "rgba(25,128,56,0.08)", border: "2px solid rgba(25,128,56,0.35)", color: "#198038", cursor: "pointer", fontSize: "0.95rem" }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(25,128,56,0.18)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(25,128,56,0.08)"; e.currentTarget.style.transform = "translateY(0)"; }}
                    >
                      <CheckCircle2 size={16} />
                      {lang === "en" ? "TRUE" : "VRAI"}
                    </button>
                    <button
                      onClick={() => handleAnswer("false")}
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all"
                      style={{ background: "rgba(218,30,40,0.08)", border: "2px solid rgba(218,30,40,0.35)", color: "#da1e28", cursor: "pointer", fontSize: "0.95rem" }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(218,30,40,0.16)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(218,30,40,0.08)"; e.currentTarget.style.transform = "translateY(0)"; }}
                    >
                      <XCircle size={16} />
                      {lang === "en" ? "FALSE" : "FAUX"}
                    </button>
                  </div>
                ) : (
                  <div className="rounded-xl overflow-hidden" style={{ border: `2px solid ${activeIsCorrect ? "rgba(25,128,56,0.35)" : "rgba(218,30,40,0.35)"}` }}>
                    <div className="flex items-center gap-2.5 px-4 py-2.5" style={{ background: activeIsCorrect ? "#198038" : "#da1e28" }}>
                      {activeIsCorrect ? <CheckCircle2 size={14} color="#fff" /> : <XCircle size={14} color="#fff" />}
                      <span className="font-bold text-white text-sm">
                        {activeIsCorrect ? (lang === "en" ? "Correct!" : "Correct !") : (lang === "en" ? "Incorrect" : "Incorrect")}
                      </span>
                      <span className="ml-auto font-mono text-xs" style={{ color: "rgba(255,255,255,0.75)" }}>
                        → {active.correct === "true" ? (lang === "en" ? "TRUE" : "VRAI") : (lang === "en" ? "FALSE" : "FAUX")}
                      </span>
                    </div>
                    <div className="px-4 py-3" style={{ background: activeIsCorrect ? "rgba(25,128,56,0.04)" : "rgba(218,30,40,0.04)" }}>
                      <p style={{ color: "#3d4259", fontSize: "0.85rem", lineHeight: "1.6" }}>
                        {lang === "en" ? (active.explanationEn ?? active.explanation) : active.explanation}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Empty state */
              <div className="h-full flex items-center justify-center rounded-xl" style={{ border: "2px dashed rgba(25,128,56,0.2)", background: "rgba(25,128,56,0.03)", minHeight: "180px" }}>
                <div className="text-center px-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: "rgba(25,128,56,0.1)" }}>
                    <LayoutGrid size={22} style={{ color: "#198038" }} />
                  </div>
                  <div className="font-semibold" style={{ color: "#6f7897", fontSize: "0.85rem" }}>
                    {lang === "en" ? "Select a cell to begin" : "Sélectionnez une case pour commencer"}
                  </div>
                  <div style={{ color: "#adb3c8", fontSize: "0.75rem", marginTop: "4px" }}>
                    {lang === "en" ? "Align 3 ✓ to win!" : "Alignez 3 ✓ pour gagner !"}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Progress bar */}
        {!isWon && (
          <div>
            <div className="flex items-center justify-between mb-1.5" style={{ color: "#8d95aa", fontSize: "0.78rem" }}>
              <span>{answeredCount}/{total} {lang === "en" ? "answered" : "répondus"}</span>
              {answeredCount > 0 && <span style={{ color: "#198038", fontWeight: 700 }}>{correctCount}/{answeredCount} ✓</span>}
            </div>
            <div className="rounded-full overflow-hidden" style={{ height: "5px", background: "#e8eaf2" }}>
              <div className="h-full rounded-full transition-all duration-500" style={{ width: `${Math.round((answeredCount / total) * 100)}%`, background: "linear-gradient(90deg, #198038, #6fdc8c)" }} />
            </div>
          </div>
        )}

        {/* All answered without alignment */}
        {allAnswered && !isWon && (
          <div className="rounded-2xl p-5 text-center" style={{ background: "rgba(25,128,56,0.06)", border: "2px solid rgba(25,128,56,0.25)" }}>
            <div className="font-bold mb-1" style={{ color: "#0e6027", fontSize: "1.05rem" }}>
              {lang === "en" ? "🏁 Completed!" : "🏁 Grille complétée !"}
            </div>
            <div style={{ color: "#6f7897", fontSize: "0.875rem" }}>
              {lang === "en" ? `${correctCount}/${total} correct answers` : `${correctCount}/${total} bonnes réponses`}
            </div>
            <button
              onClick={reset}
              className="mt-3 flex items-center gap-2 mx-auto rounded-xl px-4 py-2 font-semibold text-sm"
              style={{ background: "rgba(25,128,56,0.1)", color: "#198038", border: "1px solid rgba(25,128,56,0.25)", cursor: "pointer" }}
            >
              <span>↺</span> {lang === "en" ? "Restart" : "Recommencer"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
