import { useState } from "react";
import { CheckCircle2, XCircle, LayoutGrid } from "lucide-react";
import { GridQuizExercise } from "@/lib/interactionData";
import { useLanguage } from "@/lib/languageContext";

interface Props {
  exercise: GridQuizExercise;
}

export default function GridQuiz({ exercise }: Props) {
  const { lang } = useLanguage();
  const cells = exercise.cells;
  const total = cells.length;

  const [activeCell, setActiveCell] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<number, "true" | "false">>({});

  const title = lang === "en" ? (exercise.titleEn ?? exercise.title) : exercise.title;
  const subtitle = lang === "en" ? (exercise.subtitleEn ?? exercise.subtitle) : exercise.subtitle;

  const getCellState = (i: number): "unanswered" | "correct" | "wrong" => {
    if (answers[i] === undefined) return "unanswered";
    return answers[i] === cells[i].correct ? "correct" : "wrong";
  };

  const handleAnswer = (answer: "true" | "false") => {
    if (activeCell === null || answers[activeCell] !== undefined) return;
    setAnswers((prev) => ({ ...prev, [activeCell]: answer }));
  };

  const allAnswered = Object.keys(answers).length === total;
  const correctCount = cells.filter((c, i) => answers[i] === c.correct).length;
  const pct = Math.round((Object.keys(answers).length / total) * 100);

  const cols = Math.ceil(Math.sqrt(total)); // 3 for 9 cells

  // Determine grid cell colors
  const cellStyle = (i: number, isActive: boolean) => {
    const state = getCellState(i);
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

  const active = activeCell !== null ? cells[activeCell] : null;
  const activeAnswer = activeCell !== null ? answers[activeCell] : undefined;
  const activeState = activeCell !== null ? getCellState(activeCell) : "unanswered";
  const activeIsCorrect = activeAnswer !== undefined && activeAnswer === active?.correct;

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ border: "1.5px solid #e4e7f0", background: "#fff", fontFamily: "'IBM Plex Sans', sans-serif" }}
    >
      {/* Header */}
      <div
        className="px-5 py-4"
        style={{ background: "linear-gradient(135deg, #198038 0%, #24a148 100%)" }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(255,255,255,0.18)" }}
          >
            <LayoutGrid size={14} color="#fff" />
          </div>
          <div>
            <div className="font-bold text-white" style={{ fontSize: "0.9rem" }}>{title}</div>
            {subtitle && (
              <div style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.78rem" }}>{subtitle}</div>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-4">

        {/* Instructions */}
        <div
          className="flex items-center gap-2 rounded-xl px-4 py-2.5"
          style={{ background: "rgba(0,67,206,0.05)", border: "1px solid rgba(0,67,206,0.15)" }}
        >
          <span style={{ color: "#0043ce", fontSize: "1rem" }}>☞</span>
          <span style={{ color: "#3d4259", fontSize: "0.82rem" }}>
            {lang === "en"
              ? "Click a cell to see the statement, then answer True or False."
              : "Cliquez sur une case pour voir l'affirmation, puis répondez Vrai ou Faux."}
          </span>
        </div>

        {/* Main layout: grid + question panel */}
        <div className="flex gap-4 flex-col sm:flex-row">

          {/* Grid */}
          <div className="flex-shrink-0 flex items-center justify-center">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${cols}, 1fr)`,
                gap: "8px",
                padding: "4px",
              }}
            >
              {cells.map((_, i) => {
                const state = getCellState(i);
                const isActive = activeCell === i;
                const s = cellStyle(i, isActive);

                return (
                  <button
                    key={i}
                    onClick={() => setActiveCell(i)}
                    style={{
                      width: "72px",
                      height: "72px",
                      borderRadius: "12px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.2s cubic-bezier(0.34,1.56,0.64,1)",
                      ...s,
                    }}
                    title={`${lang === "en" ? "Question" : "Question"} ${i + 1}`}
                  >
                    {state === "correct" ? (
                      <CheckCircle2 size={28} color="#fff" strokeWidth={2.5} />
                    ) : state === "wrong" ? (
                      <XCircle size={28} color="#fff" strokeWidth={2.5} />
                    ) : (
                      <span
                        style={{
                          fontFamily: "'IBM Plex Mono', monospace",
                          fontSize: "13px",
                          fontWeight: 800,
                          letterSpacing: "-0.02em",
                        }}
                      >
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
            {active ? (
              <div className="flex flex-col gap-3 h-full">
                {/* Question header badge */}
                <div
                  className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg w-fit uppercase"
                  style={{
                    background: "rgba(25,128,56,0.08)",
                    color: "#198038",
                    fontSize: "9px",
                    letterSpacing: "0.1em",
                    border: "1px solid rgba(25,128,56,0.2)",
                  }}
                >
                  {lang === "en" ? "QUESTION" : "QUESTION"} {activeCell! + 1}
                </div>

                {/* Statement */}
                <div
                  className="rounded-xl p-4"
                  style={{
                    background: activeAnswer !== undefined
                      ? activeIsCorrect
                        ? "rgba(25,128,56,0.04)"
                        : "rgba(218,30,40,0.04)"
                      : "#f8f9fc",
                    border: activeAnswer !== undefined
                      ? `1.5px solid ${activeIsCorrect ? "rgba(25,128,56,0.2)" : "rgba(218,30,40,0.2)"}`
                      : "1.5px solid #e8eaf2",
                    transition: "all 0.3s ease",
                  }}
                >
                  <p
                    className="font-semibold"
                    style={{ color: "#0a2052", fontSize: "0.9rem", lineHeight: "1.55" }}
                  >
                    {lang === "en"
                      ? (active.statementEn ?? active.statement)
                      : active.statement}
                  </p>
                </div>

                {/* True / False buttons */}
                {activeAnswer === undefined ? (
                  <div className="flex gap-2.5">
                    <button
                      onClick={() => handleAnswer("true")}
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all"
                      style={{
                        background: "rgba(25,128,56,0.08)",
                        border: "2px solid rgba(25,128,56,0.35)",
                        color: "#198038",
                        cursor: "pointer",
                        fontSize: "0.95rem",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(25,128,56,0.18)";
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow = "0 4px 12px rgba(25,128,56,0.2)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(25,128,56,0.08)";
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <CheckCircle2 size={16} />
                      {lang === "en" ? "TRUE" : "VRAI"}
                    </button>
                    <button
                      onClick={() => handleAnswer("false")}
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all"
                      style={{
                        background: "rgba(218,30,40,0.08)",
                        border: "2px solid rgba(218,30,40,0.35)",
                        color: "#da1e28",
                        cursor: "pointer",
                        fontSize: "0.95rem",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(218,30,40,0.16)";
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow = "0 4px 12px rgba(218,30,40,0.2)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(218,30,40,0.08)";
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <XCircle size={16} />
                      {lang === "en" ? "FALSE" : "FAUX"}
                    </button>
                  </div>
                ) : (
                  /* Feedback */
                  <div
                    className="rounded-xl overflow-hidden"
                    style={{
                      border: `2px solid ${activeIsCorrect ? "rgba(25,128,56,0.35)" : "rgba(218,30,40,0.35)"}`,
                      animation: "feedbackSlide 0.3s ease",
                    }}
                  >
                    <div
                      className="flex items-center gap-2.5 px-4 py-2.5"
                      style={{ background: activeIsCorrect ? "#198038" : "#da1e28" }}
                    >
                      {activeIsCorrect
                        ? <CheckCircle2 size={14} color="#fff" />
                        : <XCircle size={14} color="#fff" />}
                      <span className="font-bold text-white text-sm">
                        {activeIsCorrect
                          ? (lang === "en" ? "Correct!" : "Correct !")
                          : (lang === "en" ? "Incorrect" : "Incorrect")}
                      </span>
                      <span
                        className="ml-auto font-mono text-xs"
                        style={{ color: "rgba(255,255,255,0.75)" }}
                      >
                        → {active.correct === "true"
                          ? (lang === "en" ? "TRUE" : "VRAI")
                          : (lang === "en" ? "FALSE" : "FAUX")}
                      </span>
                    </div>
                    <div
                      className="px-4 py-3"
                      style={{
                        background: activeIsCorrect
                          ? "rgba(25,128,56,0.04)"
                          : "rgba(218,30,40,0.04)",
                      }}
                    >
                      <p style={{ color: "#3d4259", fontSize: "0.85rem", lineHeight: "1.6" }}>
                        {lang === "en"
                          ? (active.explanationEn ?? active.explanation)
                          : active.explanation}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Empty state */
              <div
                className="h-full flex items-center justify-center rounded-xl"
                style={{
                  border: "2px dashed rgba(25,128,56,0.2)",
                  background: "rgba(25,128,56,0.03)",
                  minHeight: "180px",
                }}
              >
                <div className="text-center px-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                    style={{ background: "rgba(25,128,56,0.1)" }}
                  >
                    <LayoutGrid size={22} style={{ color: "#198038" }} />
                  </div>
                  <div className="font-semibold" style={{ color: "#6f7897", fontSize: "0.85rem" }}>
                    {lang === "en"
                      ? "Select a cell to begin"
                      : "Sélectionnez une case pour commencer"}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div>
          <div
            className="flex items-center justify-between mb-1.5"
            style={{ color: "#8d95aa", fontSize: "0.78rem" }}
          >
            <span>
              {Object.keys(answers).length}/{total}{" "}
              {lang === "en" ? "answered" : "répondus"}
            </span>
            {Object.keys(answers).length > 0 && (
              <span style={{ color: "#198038", fontWeight: 700 }}>
                {correctCount}/{Object.keys(answers).length} ✓
              </span>
            )}
          </div>
          <div className="rounded-full overflow-hidden" style={{ height: "5px", background: "#e8eaf2" }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${pct}%`,
                background: "linear-gradient(90deg, #198038, #6fdc8c)",
              }}
            />
          </div>
        </div>

        {/* Completion */}
        {allAnswered && (
          <div
            className="rounded-2xl p-5 text-center"
            style={{
              background: "rgba(25,128,56,0.06)",
              border: "2px solid rgba(25,128,56,0.25)",
              animation: "celebrationPop 0.4s cubic-bezier(0.34,1.56,0.64,1) both",
            }}
          >
            <div className="font-bold mb-1" style={{ color: "#0e6027", fontSize: "1.15rem" }}>
              {lang === "en" ? "🏆 Grid complete!" : "🏆 Grille complétée !"}
            </div>
            <div style={{ color: "#6f7897", fontSize: "0.875rem" }}>
              {lang === "en"
                ? `${correctCount}/${total} correct answers`
                : `${correctCount}/${total} bonnes réponses`}
            </div>
            <button
              onClick={() => {
                setAnswers({});
                setActiveCell(null);
              }}
              className="mt-3 flex items-center gap-2 mx-auto rounded-xl px-4 py-2 font-semibold text-sm"
              style={{
                background: "rgba(25,128,56,0.1)",
                color: "#198038",
                border: "1px solid rgba(25,128,56,0.25)",
                cursor: "pointer",
              }}
            >
              <span>↺</span>
              {lang === "en" ? "Restart" : "Recommencer"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
