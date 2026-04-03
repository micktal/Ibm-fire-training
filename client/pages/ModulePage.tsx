import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronRight, CheckCircle2, XCircle, Target, Clock,
  Info, AlertTriangle, List, Eye, ChevronDown, Award,
  ArrowRight, RotateCcw,
} from "lucide-react";
import IBMTopbar from "@/components/IBMTopbar";
import VideoPlayer from "@/components/VideoPlayer";
import HotspotImage from "@/components/interactions/HotspotImage";
import DragAndDrop from "@/components/interactions/DragAndDrop";
import BranchingScenario from "@/components/interactions/BranchingScenario";
import { getModuleById, QuizQuestion } from "@/lib/courseData";
import { MODULE_INTERACTIONS, AnyExercise } from "@/lib/interactionData";
import { useUser } from "@/lib/userContext";

function InteractionBlock({ exercise }: { exercise: AnyExercise }) {
  if (exercise.type === "hotspot") return <HotspotImage exercise={exercise} />;
  if (exercise.type === "dragdrop") return <DragAndDrop exercise={exercise} />;
  if (exercise.type === "branching") return <BranchingScenario exercise={exercise} />;
  return null;
}

// ── Quiz component ──────────────────────────────────────────────
function QuizBlock({
  questions,
  onComplete,
}: {
  questions: QuizQuestion[];
  onComplete: (score: number, correct: number) => void;
}) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [results, setResults] = useState<boolean[]>([]);
  const [done, setDone] = useState(false);

  const q = questions[current];

  const handleSelect = (key: string) => {
    if (answered) return;
    setSelected(key);
    const correct = key === q.correctKey;
    setAnswered(true);
    setResults((r) => [...r, correct]);
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      const correctCount = results.filter(Boolean).length + (selected === q.correctKey ? 0 : 0);
      const finalCorrect = [...results].filter(Boolean).length;
      const score = Math.round((finalCorrect / questions.length) * 100);
      setDone(true);
      onComplete(score, finalCorrect);
    }
  };

  const finalCorrect = results.filter(Boolean).length;
  const finalScore = done ? Math.round((finalCorrect / questions.length) * 100) : 0;

  if (done) {
    const passed = finalScore >= 50;
    return (
      <div
        className="rounded-xl p-8 text-center"
        style={{ background: passed ? "rgba(25,128,56,0.04)" : "rgba(218,30,40,0.04)", border: `1.5px solid ${passed ? "rgba(25,128,56,0.25)" : "rgba(218,30,40,0.25)"}` }}
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ background: passed ? "#198038" : "#da1e28" }}
        >
          {passed ? <Award size={28} color="#fff" /> : <XCircle size={28} color="#fff" />}
        </div>
        <div
          className="font-mono text-4xl font-bold mb-2"
          style={{ color: passed ? "#198038" : "#da1e28", fontFamily: "'IBM Plex Mono', monospace" }}
        >
          {finalScore}%
        </div>
        <div className="text-base font-bold mb-1" style={{ color: "#161616" }}>
          {passed ? "Quiz réussi" : "Quiz à revoir"}
        </div>
        <div className="text-sm mb-4" style={{ color: "#6f7897" }}>
          {finalCorrect}/{questions.length} bonne{finalCorrect > 1 ? "s" : ""} réponse{finalCorrect > 1 ? "s" : ""}
        </div>
        {!passed && (
          <button
            onClick={() => { setCurrent(0); setSelected(null); setAnswered(false); setResults([]); setDone(false); }}
            className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded transition-all"
            style={{ background: "#0043ce", color: "#fff", border: "none", cursor: "pointer" }}
          >
            <RotateCcw size={14} />
            Réessayer le quiz
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-xl overflow-hidden" style={{ border: "1.5px solid #e4e7f0" }}>
      {/* Quiz header */}
      <div className="px-6 py-4" style={{ background: "#0a0e1a" }}>
        <div className="flex items-center justify-between mb-1">
          <span
            className="font-mono text-xs uppercase tracking-wider"
            style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.12em" }}
          >
            Question {current + 1} / {questions.length}
          </span>
          <div className="flex gap-1.5">
            {questions.map((_, i) => (
              <div
                key={i}
                className="rounded-full transition-all"
                style={{
                  width: "20px",
                  height: "3px",
                  background: i < current
                    ? (results[i] ? "#6fdc8c" : "#ff8389")
                    : i === current
                    ? "#fff"
                    : "rgba(255,255,255,0.2)",
                }}
              />
            ))}
          </div>
        </div>

        <h3 className="text-base font-bold text-white leading-snug" style={{ letterSpacing: "-0.01em" }}>
          {q.question}
        </h3>
        {q.context && (
          <p className="text-xs mt-1.5" style={{ color: "rgba(255,255,255,0.55)", lineHeight: "1.55" }}>
            {q.context}
          </p>
        )}
      </div>

      {/* Choices */}
      <div className="p-5 flex flex-col gap-2.5" style={{ background: "#fff" }}>
        {q.choices.map((choice) => {
          const isSelected = selected === choice.key;
          const isCorrect = choice.key === q.correctKey;
          let border = "#d0d4e2";
          let bg = "#fff";
          let textColor = "#161616";

          if (answered) {
            if (isCorrect) { border = "#198038"; bg = "rgba(25,128,56,0.06)"; textColor = "#0e6027"; }
            else if (isSelected && !isCorrect) { border = "#da1e28"; bg = "rgba(218,30,40,0.05)"; textColor = "#a2191f"; }
            else { border = "#e4e7f0"; textColor = "#8d95aa"; }
          } else if (isSelected) {
            border = "#0043ce";
            bg = "rgba(0,67,206,0.04)";
          }

          return (
            <button
              key={choice.key}
              onClick={() => handleSelect(choice.key)}
              disabled={answered}
              className="flex items-center gap-3 rounded-lg text-left transition-all"
              style={{
                padding: "0.85rem 1rem",
                border: `1.5px solid ${border}`,
                background: bg,
                cursor: answered ? "not-allowed" : "pointer",
                width: "100%",
                fontFamily: "'IBM Plex Sans', sans-serif",
              }}
              onMouseEnter={(e) => { if (!answered) (e.currentTarget as HTMLButtonElement).style.borderColor = "#0043ce"; }}
              onMouseLeave={(e) => { if (!answered && selected !== choice.key) (e.currentTarget as HTMLButtonElement).style.borderColor = "#d0d4e2"; }}
            >
              <span
                className="font-mono text-xs font-bold w-6 h-6 rounded flex items-center justify-center flex-shrink-0"
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  background: answered && isCorrect ? "#198038" : answered && isSelected ? "#da1e28" : isSelected ? "#0043ce" : "#f5f6f8",
                  color: answered && (isCorrect || isSelected) ? "#fff" : "#8d95aa",
                  border: `1px solid ${answered && isCorrect ? "#198038" : answered && isSelected ? "#da1e28" : isSelected ? "#0043ce" : "#e4e7f0"}`,
                }}
              >
                {choice.key}
              </span>
              <div className="flex-1">
                <span className="text-sm font-medium" style={{ color: textColor }}>{choice.label}</span>
                {answered && isSelected && choice.hint && (
                  <div className="text-xs mt-0.5" style={{ color: isCorrect ? "#198038" : "#da1e28" }}>{choice.hint}</div>
                )}
              </div>
              {answered && isCorrect && <CheckCircle2 size={16} style={{ color: "#198038", flexShrink: 0 }} />}
              {answered && isSelected && !isCorrect && <XCircle size={16} style={{ color: "#da1e28", flexShrink: 0 }} />}
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {answered && (
        <div
          className="mx-5 mb-4 rounded-lg p-4 flex items-start gap-3"
          style={{
            background: selected === q.correctKey ? "rgba(25,128,56,0.06)" : "rgba(218,30,40,0.05)",
            border: `1.5px solid ${selected === q.correctKey ? "rgba(25,128,56,0.25)" : "rgba(218,30,40,0.2)"}`,
          }}
        >
          {selected === q.correctKey
            ? <CheckCircle2 size={15} style={{ color: "#198038", flexShrink: 0, marginTop: "1px" }} />
            : <XCircle size={15} style={{ color: "#da1e28", flexShrink: 0, marginTop: "1px" }} />
          }
          <div>
            <div
              className="text-xs font-bold mb-1"
              style={{ color: selected === q.correctKey ? "#0e6027" : "#a2191f" }}
            >
              {selected === q.correctKey ? "Bonne réponse" : "Réponse incorrecte"}
            </div>
            <div className="text-xs leading-relaxed" style={{ color: "#4a5068" }}>
              {selected === q.correctKey ? q.feedbackOk : q.feedbackKo}
            </div>
          </div>
        </div>
      )}

      {/* Next button */}
      {answered && (
        <div className="px-5 pb-5">
          <button
            onClick={handleNext}
            className="w-full flex items-center justify-center gap-2 font-semibold text-sm text-white rounded-lg transition-all"
            style={{ padding: "0.75rem", background: "#0043ce", border: "none", cursor: "pointer" }}
            onMouseEnter={(e) => (e.currentTarget as HTMLButtonElement).style.background = "#0031a9"}
            onMouseLeave={(e) => (e.currentTarget as HTMLButtonElement).style.background = "#0043ce"}
          >
            {current < questions.length - 1 ? "Question suivante" : "Terminer le quiz"}
            <ArrowRight size={15} />
          </button>
        </div>
      )}
    </div>
  );
}

// ── Content icon helper ─────────────────────────────────────────
function ContentIcon({ type }: { type: string }) {
  const map: Record<string, React.ReactNode> = {
    intro: <Info size={14} style={{ color: "#0043ce" }} />,
    visual: <Eye size={14} style={{ color: "#0043ce" }} />,
    info: <Info size={14} style={{ color: "#0043ce" }} />,
    scenario: <AlertTriangle size={14} style={{ color: "#b45309" }} />,
    list: <List size={14} style={{ color: "#198038" }} />,
  };
  return <>{map[type] ?? <Info size={14} />}</>;
}

// ── Main Module page ────────────────────────────────────────────
export default function ModulePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { setModuleProgress, progress } = useUser();
  const [quizDone, setQuizDone] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [activeSection, setActiveSection] = useState<number | null>(0);

  const mod = id ? getModuleById(id) : null;

  useEffect(() => {
    if (!mod) navigate("/hub");
  }, [mod, navigate]);

  if (!mod) return null;

  const existingProgress = progress[mod.id];
  const alreadyDone = existingProgress?.completed;

  const handleQuizComplete = (score: number, correct: number) => {
    setQuizScore(score);
    setQuizDone(true);
    setModuleProgress(mod.id, {
      moduleId: mod.id,
      completed: true,
      score,
      correctAnswers: correct,
      totalQuestions: mod.quiz.length,
      completedAt: new Date().toISOString(),
    });
  };

  const typeLabel: Record<string, string> = {
    intro: "Introduction",
    visual: "Visuel",
    info: "Information",
    scenario: "Scénario",
    list: "Points clés",
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#f5f6f8", fontFamily: "'IBM Plex Sans', sans-serif" }}>
      <IBMTopbar
        title={`Module ${mod.number} — ${mod.title}`}
        subtitle={`Chapitre ${mod.chapter} · ${mod.duration}`}
        backTo="/hub"
        backLabel="Tableau de bord"
        showProgress
        currentModule={mod.number}
        chapter={mod.chapter}
      />

      <main className="flex-1 overflow-y-auto">
        {/* Hero image */}
        <div className="relative overflow-hidden" style={{ height: "240px" }}>
          <img
            src={mod.image}
            alt={mod.title}
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.55)" }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.7))" }}
          />
          <div className="absolute bottom-0 left-0 right-0 p-6 max-w-4xl mx-auto">
            <div
              className="font-mono text-xs mb-2 flex items-center gap-2"
              style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.12em", textTransform: "uppercase" }}
            >
              <span>Chapitre {mod.chapter}</span>
              <span style={{ color: "rgba(255,255,255,0.25)" }}>·</span>
              <span>Module {mod.number.toString().padStart(2, "0")}</span>
              <span style={{ color: "rgba(255,255,255,0.25)" }}>·</span>
              <Clock size={11} />
              <span>{mod.duration}</span>
            </div>
            <h1
              className="text-2xl font-bold text-white mb-1"
              style={{ letterSpacing: "-0.025em", lineHeight: "1.15" }}
            >
              {mod.title}
            </h1>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
              {mod.subtitle}
            </p>
          </div>

          {alreadyDone && (
            <div
              className="absolute top-4 right-4 flex items-center gap-2 font-semibold text-xs px-3 py-1.5 rounded-full"
              style={{ background: "#198038", color: "#fff" }}
            >
              <CheckCircle2 size={13} />
              Complété · {existingProgress.score}%
            </div>
          )}
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 py-6 flex flex-col gap-5">
          {/* Objective card */}
          <div
            className="flex items-start gap-4 rounded-xl p-5"
            style={{ background: "rgba(0,67,206,0.05)", border: "1.5px solid rgba(0,67,206,0.15)" }}
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(0,67,206,0.1)" }}
            >
              <Target size={18} style={{ color: "#0043ce" }} />
            </div>
            <div>
              <div className="text-xs font-semibold mb-1" style={{ color: "#0043ce", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Objectif du module
              </div>
              <div className="text-sm font-medium" style={{ color: "#161616", lineHeight: "1.55" }}>
                {mod.objective}
              </div>
            </div>
          </div>

          {/* Video player (if URL provided) */}
          {mod.videoUrl && (
            <div>
              <div className="text-xs font-semibold mb-2" style={{ color: "#8d95aa", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                Vidéo pédagogique
              </div>
              <VideoPlayer url={mod.videoUrl} title={mod.title} captionsVtt={mod.captionsVtt} />
            </div>
          )}

          {/* Content sections */}
          <div className="flex flex-col gap-3">
            {mod.content.map((section, idx) => (
              <div
                key={idx}
                className="rounded-xl overflow-hidden"
                style={{ border: "1.5px solid #e4e7f0", background: "#fff" }}
              >
                {/* Section header */}
                <button
                  className="w-full flex items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-gray-50"
                  onClick={() => setActiveSection(activeSection === idx ? null : idx)}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      background: section.type === "scenario" ? "rgba(180,83,9,0.08)" : section.type === "list" ? "rgba(25,128,56,0.08)" : "rgba(0,67,206,0.08)",
                    }}
                  >
                    <ContentIcon type={section.type} />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-semibold mb-0.5" style={{ color: "#8d95aa", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                      {typeLabel[section.type]}
                    </div>
                    <div className="text-sm font-bold" style={{ color: "#161616" }}>
                      {section.title || mod.title}
                    </div>
                  </div>
                  <ChevronDown
                    size={16}
                    style={{
                      color: "#8d95aa",
                      transform: activeSection === idx ? "rotate(180deg)" : "rotate(0)",
                      transition: "transform 0.2s",
                      flexShrink: 0,
                    }}
                  />
                </button>

                {/* Section body */}
                {activeSection === idx && (
                  <div className="px-5 pb-5">
                    {/* Image */}
                    {section.image && (
                      <div className="rounded-lg overflow-hidden mb-4" style={{ border: "1px solid #e4e7f0" }}>
                        <img
                          src={section.image}
                          alt={section.title || ""}
                          className="w-full object-cover"
                          style={{ maxHeight: "260px" }}
                        />
                      </div>
                    )}

                    {/* Body text */}
                    <p className="text-sm leading-relaxed mb-4" style={{ color: "#4a5068" }}>
                      {section.body}
                    </p>

                    {/* Bullets */}
                    {section.bullets && (
                      <ul className="flex flex-col gap-2 mb-4">
                        {section.bullets.map((b, bi) => (
                          <li key={bi} className="flex items-start gap-3">
                            <div
                              className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5"
                              style={{ background: "#0043ce" }}
                            />
                            <span className="text-sm" style={{ color: "#4a5068", lineHeight: "1.55" }}>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Highlight box */}
                    {section.highlight && (
                      <div
                        className="flex items-start gap-3 rounded-lg p-4"
                        style={{
                          background: section.type === "scenario" ? "rgba(180,83,9,0.06)" : "rgba(0,67,206,0.05)",
                          border: `1.5px solid ${section.type === "scenario" ? "rgba(180,83,9,0.2)" : "rgba(0,67,206,0.15)"}`,
                        }}
                      >
                        <AlertTriangle
                          size={14}
                          style={{ color: section.type === "scenario" ? "#b45309" : "#0043ce", flexShrink: 0, marginTop: "1px" }}
                        />
                        <p
                          className="text-sm font-semibold leading-relaxed"
                          style={{ color: section.type === "scenario" ? "#92400e" : "#0031a9" }}
                        >
                          {section.highlight}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Interactive exercises */}
          {MODULE_INTERACTIONS[mod.id]?.length > 0 && (
            <div className="flex flex-col gap-4">
              <div
                className="flex items-center gap-2 pb-3"
                style={{ borderBottom: "1.5px solid #e4e7f0" }}
              >
                <div className="w-5 h-5 rounded flex items-center justify-center" style={{ background: "rgba(0,67,206,0.1)" }}>
                  <Target size={12} style={{ color: "#0043ce" }} />
                </div>
                <span className="text-sm font-bold" style={{ color: "#161616" }}>
                  Exercices interactifs
                </span>
                <span
                  className="ml-auto font-mono text-xs px-2 py-0.5 rounded-full"
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    color: "#0043ce",
                    background: "rgba(0,67,206,0.07)",
                    border: "1px solid rgba(0,67,206,0.15)",
                  }}
                >
                  {MODULE_INTERACTIONS[mod.id].length} exercice{MODULE_INTERACTIONS[mod.id].length > 1 ? "s" : ""}
                </span>
              </div>
              {MODULE_INTERACTIONS[mod.id].map((exercise, idx) => (
                <InteractionBlock key={idx} exercise={exercise} />
              ))}
            </div>
          )}

          {/* Quiz section */}
          <div>
            <div
              className="flex items-center gap-2 mb-3 pb-3"
              style={{ borderBottom: "1.5px solid #e4e7f0" }}
            >
              <Target size={15} style={{ color: "#0043ce" }} />
              <span className="text-sm font-bold" style={{ color: "#161616" }}>
                Évaluation du module
              </span>
              <span
                className="ml-auto font-mono text-xs px-2 py-0.5 rounded-full"
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  color: "#0043ce",
                  background: "rgba(0,67,206,0.07)",
                  border: "1px solid rgba(0,67,206,0.15)",
                }}
              >
                {mod.quiz.length} question{mod.quiz.length > 1 ? "s" : ""}
              </span>
            </div>

            {alreadyDone && !quizDone ? (
              <div
                className="rounded-xl p-6 flex items-center gap-5"
                style={{ background: "rgba(25,128,56,0.04)", border: "1.5px solid rgba(25,128,56,0.2)" }}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "#198038" }}>
                  <CheckCircle2 size={22} color="#fff" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold mb-0.5" style={{ color: "#0e6027" }}>
                    Module déjà complété
                  </div>
                  <div className="text-xs" style={{ color: "#6f7897" }}>
                    Score obtenu : {existingProgress.score}% · {existingProgress.correctAnswers}/{existingProgress.totalQuestions} bonnes réponses
                  </div>
                </div>
                <button
                  onClick={() => setQuizDone(false)}
                  className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded transition-all"
                  style={{ background: "#198038", color: "#fff", border: "none", cursor: "pointer" }}
                >
                  <RotateCcw size={12} />
                  Réessayer
                </button>
              </div>
            ) : (
              <QuizBlock questions={mod.quiz} onComplete={handleQuizComplete} />
            )}
          </div>

          {/* Post-quiz navigation */}
          {(quizDone || alreadyDone) && (
            <div
              className="flex flex-col sm:flex-row items-center gap-3 rounded-xl p-5"
              style={{ background: quizScore >= 50 || alreadyDone ? "rgba(25,128,56,0.04)" : "rgba(218,30,40,0.04)", border: `1.5px solid ${quizScore >= 50 || alreadyDone ? "rgba(25,128,56,0.2)" : "rgba(218,30,40,0.2)"}` }}
            >
              <div className="flex-1">
                <div className="text-sm font-bold mb-0.5" style={{ color: "#161616" }}>
                  {quizDone
                    ? quizScore >= 50
                      ? "Bien joué — module validé !"
                      : "Module à retravailler"
                    : "Module déjà complété"}
                </div>
                <div className="text-xs" style={{ color: "#6f7897" }}>
                  Continuez avec le prochain module ou retournez au tableau de bord.
                </div>
              </div>
              <button
                onClick={() => navigate("/hub")}
                className="flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded transition-all whitespace-nowrap"
                style={{ background: "#0043ce", color: "#fff", border: "none", cursor: "pointer" }}
                onMouseEnter={(e) => (e.currentTarget as HTMLButtonElement).style.background = "#0031a9"}
                onMouseLeave={(e) => (e.currentTarget as HTMLButtonElement).style.background = "#0043ce"}
              >
                Tableau de bord
                <ChevronRight size={15} />
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
