import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronRight, CheckCircle2, XCircle, Target, Clock,
  Info, AlertTriangle, List, Eye, ChevronDown, Award,
  ArrowRight, RotateCcw, Zap, BookOpen, FileText, Shield,
} from "lucide-react";
import IBMTopbar from "@/components/IBMTopbar";
import VideoPlayer from "@/components/VideoPlayer";
import FactCard from "@/components/FactCard";
import CompletionCelebration from "@/components/CompletionCelebration";
import ModuleIntroOverlay from "@/components/ModuleIntroOverlay";
import CountdownOverlay from "@/components/CountdownOverlay";
import HotspotImage from "@/components/interactions/HotspotImage";
import DragAndDrop from "@/components/interactions/DragAndDrop";
import BranchingScenario from "@/components/interactions/BranchingScenario";
import { getModuleById, QuizQuestion, ModuleContent } from "@/lib/courseData";
import { MODULE_INTERACTIONS, AnyExercise } from "@/lib/interactionData";
import { useUser } from "@/lib/userContext";

function InteractionBlock({ exercise }: { exercise: AnyExercise }) {
  if (exercise.type === "hotspot") return <HotspotImage exercise={exercise} />;
  if (exercise.type === "dragdrop") return <DragAndDrop exercise={exercise} />;
  if (exercise.type === "branching") return <BranchingScenario exercise={exercise} />;
  return null;
}

// ── Animated section wrapper ────────────────────────────────────
function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(18px)",
        transition: `opacity 0.45s ease ${delay}s, transform 0.45s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ── Content section body renderer ───────────────────────────────
function SectionBody({ section }: { section: ModuleContent }) {
  const isScenario = section.type === "scenario";
  const isList = section.type === "list";

  return (
    <div className="px-5 pb-6 pt-1">
      {/* Image */}
      {section.image && (
        <div className="rounded-xl overflow-hidden mb-5" style={{ border: "1px solid #e4e7f0" }}>
          <img src={section.image} alt={section.title || ""} className="w-full object-cover" style={{ maxHeight: "280px" }} />
        </div>
      )}

      {/* Body text */}
      <p
        className="leading-relaxed mb-5"
        style={{
          color: isScenario ? "#4a3000" : "#3d4259",
          fontSize: "1rem",
          lineHeight: "1.7",
          borderLeft: isScenario ? "3px solid #f59e0b" : "3px solid #0043ce",
          paddingLeft: "1rem",
          background: isScenario ? "rgba(245,158,11,0.04)" : "rgba(0,67,206,0.03)",
          borderRadius: "0 6px 6px 0",
          padding: "0.85rem 1rem",
        }}
      >
        {section.body}
      </p>

      {/* List bullets — styled numbered cards */}
      {isList && section.bullets && (
        <div className="flex flex-col gap-2.5 mb-5">
          {section.bullets.map((b, bi) => (
            <div
              key={bi}
              className="flex items-start gap-3 rounded-xl px-4 py-3"
              style={{ background: "#f8f9fc", border: "1.5px solid #e8eaf2" }}
            >
              <span
                className="font-mono text-xs font-bold flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  background: "#0043ce",
                  color: "#fff",
                  fontSize: "11px",
                }}
              >
                {bi + 1}
              </span>
              <span style={{ color: "#3d4259", fontSize: "0.9375rem", lineHeight: "1.6" }}>{b}</span>
            </div>
          ))}
        </div>
      )}

      {/* Non-list bullets */}
      {!isList && section.bullets && (
        <ul className="flex flex-col gap-2 mb-5">
          {section.bullets.map((b, bi) => (
            <li key={bi} className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: "#0043ce" }} />
              <span style={{ color: "#3d4259", fontSize: "0.9375rem", lineHeight: "1.6" }}>{b}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Highlight box */}
      {section.highlight && (
        <div
          className="flex items-start gap-3 rounded-xl p-4 mt-1"
          style={{
            background: isScenario ? "rgba(180,83,9,0.07)" : "rgba(0,67,206,0.06)",
            border: `2px solid ${isScenario ? "rgba(180,83,9,0.25)" : "rgba(0,67,206,0.2)"}`,
          }}
        >
          <AlertTriangle
            size={15}
            style={{ color: isScenario ? "#b45309" : "#0043ce", flexShrink: 0, marginTop: "1px" }}
          />
          <p
            className="font-semibold leading-relaxed"
            style={{ color: isScenario ? "#92400e" : "#0031a9", fontSize: "0.9375rem" }}
          >
            {section.highlight}
          </p>
        </div>
      )}
    </div>
  );
}

// ── Content section icon ────────────────────────────────────────
function ContentIcon({ type }: { type: string }) {
  const icons: Record<string, React.ReactNode> = {
    intro: <BookOpen size={15} style={{ color: "#0043ce" }} />,
    visual: <Eye size={15} style={{ color: "#0043ce" }} />,
    info: <Info size={15} style={{ color: "#0043ce" }} />,
    scenario: <Zap size={15} style={{ color: "#b45309" }} />,
    list: <List size={15} style={{ color: "#198038" }} />,
  };
  return <>{icons[type] ?? <FileText size={15} style={{ color: "#0043ce" }} />}</>;
}

// ── Quiz component ──────────────────────────────────────────────
/** Fisher-Yates shuffle — retourne un nouveau tableau mélangé */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function QuizBlock({
  questions,
  onComplete,
}: {
  questions: QuizQuestion[];
  onComplete: (score: number, correct: number) => void;
}) {
  // Questions mélangées une fois à chaque montage du quiz
  const [shuffledQuestions] = useState<QuizQuestion[]>(() => shuffle(questions));
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [results, setResults] = useState<boolean[]>([]);
  const [done, setDone] = useState(false);
  const [shake, setShake] = useState(false);

  const q = shuffledQuestions[current];

  // Réponses mélangées pour chaque question (stable tant que current ne change pas)
  const [shuffledChoices] = useState<typeof q.choices[]>(() =>
    shuffledQuestions.map((sq) => shuffle(sq.choices))
  );

  const handleSelect = (key: string) => {
    if (answered) return;
    setSelected(key);
    setAnswered(true);
    setResults((r) => [...r, key === q.correctKey]);
  };

  const handleNext = () => {
    if (!answered) {
      // Bloquer: l'apprenant DOIT répondre
      setShake(true);
      setTimeout(() => setShake(false), 600);
      return;
    }
    if (current < shuffledQuestions.length - 1) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      const finalCorrect = [...results].filter(Boolean).length;
      const score = Math.round((finalCorrect / shuffledQuestions.length) * 100);
      setDone(true);
      onComplete(score, finalCorrect);
    }
  };

  const finalCorrect = results.filter(Boolean).length;
  const finalScore = done ? Math.round((finalCorrect / shuffledQuestions.length) * 100) : 0;
  const pct = ((current) / shuffledQuestions.length) * 100;

  if (done) {
    const passed = finalScore >= 80;
    return (
      <div
        className="rounded-2xl overflow-hidden"
        style={{ border: `2px solid ${passed ? "rgba(25,128,56,0.3)" : "rgba(218,30,40,0.3)"}` }}
      >
        <div
          className="px-6 py-5 text-center"
          style={{ background: passed ? "rgba(25,128,56,0.05)" : "rgba(218,30,40,0.04)" }}
        >
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{
              background: passed ? "#198038" : "#da1e28",
              boxShadow: `0 8px 24px ${passed ? "rgba(25,128,56,0.35)" : "rgba(218,30,40,0.35)"}`,
            }}
          >
            {passed ? <Award size={34} color="#fff" /> : <XCircle size={34} color="#fff" />}
          </div>
          <div
            className="font-mono font-bold mb-1"
            style={{
              fontSize: "3.5rem",
              lineHeight: 1,
              color: passed ? "#198038" : "#da1e28",
              fontFamily: "'IBM Plex Mono', monospace",
            }}
          >
            {finalScore}%
          </div>
          <div className="text-base font-bold mt-2 mb-1" style={{ color: "#161616" }}>
            {passed ? "Quiz réussi — module validé" : "Score insuffisant — réessayez"}
          </div>
          <div className="text-sm mb-5" style={{ color: "#6f7897" }}>
            {finalCorrect} bonne{finalCorrect > 1 ? "s" : ""} réponse{finalCorrect > 1 ? "s" : ""} sur {shuffledQuestions.length}
          </div>
          {/* Mini results row */}
          <div className="flex justify-center gap-2 mb-5">
            {results.map((r, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: r ? "rgba(25,128,56,0.1)" : "rgba(218,30,40,0.1)", border: `1.5px solid ${r ? "#198038" : "#da1e28"}` }}
              >
                {r
                  ? <CheckCircle2 size={14} style={{ color: "#198038" }} />
                  : <XCircle size={14} style={{ color: "#da1e28" }} />
                }
              </div>
            ))}
          </div>
          {!passed && (
            <button
              onClick={() => { setCurrent(0); setSelected(null); setAnswered(false); setResults([]); setDone(false); }}
              className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-xl transition-all"
              style={{ background: "#0043ce", color: "#fff", border: "none", cursor: "pointer" }}
            >
              <RotateCcw size={14} />
              Réessayer le quiz
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: "1.5px solid #e4e7f0", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
      {/* Progress bar */}
      <div style={{ height: "3px", background: "#e4e7f0" }}>
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            background: "linear-gradient(90deg, #0043ce, #0f62fe)",
            transition: "width 0.4s ease",
          }}
        />
      </div>

      {/* Quiz header */}
      <div className="px-6 pt-5 pb-5" style={{ background: "#0a0e1a" }}>
        <div className="flex items-center justify-between mb-4">
          <span
            className="font-mono text-xs px-2.5 py-1 rounded-full"
            style={{
              color: "rgba(255,255,255,0.6)",
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.12)",
              fontFamily: "'IBM Plex Mono', monospace",
              letterSpacing: "0.08em",
            }}
          >
            {current + 1} / {shuffledQuestions.length}
          </span>
          <div className="flex gap-1.5">
            {shuffledQuestions.map((_, i) => (
              <div
                key={i}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === current ? "20px" : "8px",
                  height: "6px",
                  background:
                    i < current
                      ? results[i] ? "#6fdc8c" : "#ff8389"
                      : i === current
                      ? "#fff"
                      : "rgba(255,255,255,0.2)",
                }}
              />
            ))}
          </div>
        </div>

        <h3
          className="font-bold text-white leading-snug"
          style={{ fontSize: "1.125rem", letterSpacing: "-0.015em", lineHeight: "1.4" }}
        >
          {q.question}
        </h3>
        {q.context && (
          <p className="text-sm mt-2" style={{ color: "rgba(255,255,255,0.5)", lineHeight: "1.55" }}>
            {q.context}
          </p>
        )}
      </div>

      {/* Choices */}
      <div className="p-4 flex flex-col gap-2.5" style={{ background: "#f8f9fc" }}>
        {shuffledChoices[current].map((choice) => {
          const isSelected = selected === choice.key;
          const isCorrect = choice.key === q.correctKey;

          let borderColor = "#dde1ef";
          let bg = "#fff";
          let textColor = "#2d3148";
          let keyBg = "#f0f2f8";
          let keyColor = "#6f7897";

          if (answered) {
            if (isCorrect) {
              borderColor = "#198038"; bg = "rgba(25,128,56,0.06)"; textColor = "#0e6027";
              keyBg = "#198038"; keyColor = "#fff";
            } else if (isSelected) {
              borderColor = "#da1e28"; bg = "rgba(218,30,40,0.05)"; textColor = "#a2191f";
              keyBg = "#da1e28"; keyColor = "#fff";
            } else {
              borderColor = "#e8eaf2"; textColor = "#adb3c8";
            }
          } else if (isSelected) {
            borderColor = "#0043ce"; bg = "rgba(0,67,206,0.04)";
            keyBg = "#0043ce"; keyColor = "#fff";
          }

          return (
            <button
              key={choice.key}
              onClick={() => handleSelect(choice.key)}
              disabled={answered}
              className="flex items-center gap-3 rounded-xl text-left transition-all duration-200"
              style={{
                padding: "1rem 1.1rem",
                border: `2px solid ${borderColor}`,
                background: bg,
                cursor: answered ? "default" : "pointer",
                width: "100%",
                fontFamily: "'IBM Plex Sans', sans-serif",
              }}
              onMouseEnter={(e) => {
                if (!answered) {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "#0043ce";
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,67,206,0.03)";
                }
              }}
              onMouseLeave={(e) => {
                if (!answered && !isSelected) {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "#dde1ef";
                  (e.currentTarget as HTMLButtonElement).style.background = "#fff";
                }
              }}
            >
              <span
                className="font-mono text-xs font-bold w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all"
                style={{ fontFamily: "'IBM Plex Mono', monospace", background: keyBg, color: keyColor, fontSize: "12px" }}
              >
                {choice.key}
              </span>
              <div className="flex-1">
                <span className="font-medium" style={{ color: textColor, fontSize: "0.9375rem" }}>{choice.label}</span>
                {answered && isSelected && choice.hint && (
                  <div className="text-xs mt-0.5 font-medium" style={{ color: isCorrect ? "#198038" : "#da1e28" }}>
                    {choice.hint}
                  </div>
                )}
              </div>
              {answered && isCorrect && <CheckCircle2 size={18} style={{ color: "#198038", flexShrink: 0 }} />}
              {answered && isSelected && !isCorrect && <XCircle size={18} style={{ color: "#da1e28", flexShrink: 0 }} />}
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {answered && (
        <div
          className="mx-4 mb-2 rounded-xl p-4 flex items-start gap-3"
          style={{
            background: selected === q.correctKey ? "rgba(25,128,56,0.07)" : "rgba(218,30,40,0.06)",
            border: `2px solid ${selected === q.correctKey ? "rgba(25,128,56,0.3)" : "rgba(218,30,40,0.25)"}`,
            animation: "feedbackSlide 0.3s ease",
          }}
        >
          {selected === q.correctKey
            ? <CheckCircle2 size={16} style={{ color: "#198038", flexShrink: 0, marginTop: "1px" }} />
            : <XCircle size={16} style={{ color: "#da1e28", flexShrink: 0, marginTop: "1px" }} />
          }
          <div>
            <div className="text-sm font-bold mb-1" style={{ color: selected === q.correctKey ? "#0e6027" : "#a2191f" }}>
              {selected === q.correctKey ? "Bonne réponse" : "Réponse incorrecte"}
            </div>
            <div className="text-sm leading-relaxed" style={{ color: "#4a5068" }}>
              {selected === q.correctKey ? q.feedbackOk : q.feedbackKo}
            </div>
          </div>
        </div>
      )}

      {/* Indicateur obligatoire avant réponse */}
      {!answered && (
        <div
          className="mx-4 mb-3 rounded-xl px-4 py-2.5 flex items-center gap-2"
          style={{
            background: shake ? "rgba(218,30,40,0.08)" : "rgba(0,67,206,0.05)",
            border: `1.5px solid ${shake ? "rgba(218,30,40,0.3)" : "rgba(0,67,206,0.15)"}`,
            transition: "background 0.3s, border-color 0.3s",
          }}
        >
          <span style={{ fontSize: "14px" }}>🔒</span>
          <span className="text-xs font-semibold" style={{ color: shake ? "#da1e28" : "#0043ce" }}>
            {shake ? "Vous devez répondre avant de continuer" : "Sélectionnez une réponse pour continuer"}
          </span>
        </div>
      )}

      {/* Bouton suivant — toujours visible, grisé tant que pas répondu */}
      <div className="px-4 pb-4 pt-1">
        <button
          onClick={handleNext}
          className="w-full flex items-center justify-center gap-2 font-semibold rounded-xl transition-all"
          style={{
            padding: "0.875rem",
            background: answered ? "#0043ce" : "#c8cdd8",
            color: "#fff",
            border: "none",
            cursor: answered ? "pointer" : "not-allowed",
            fontSize: "0.9375rem",
            opacity: answered ? 1 : 0.65,
            transition: "background 0.3s, opacity 0.3s",
          }}
          onMouseEnter={(e) => { if (answered) (e.currentTarget as HTMLButtonElement).style.background = "#0031a9"; }}
          onMouseLeave={(e) => { if (answered) (e.currentTarget as HTMLButtonElement).style.background = answered ? "#0043ce" : "#c8cdd8"; }}
        >
          {current < shuffledQuestions.length - 1 ? "Question suivante" : "Voir mon résultat"}
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

// ── Type labels & tab colors ────────────────────────────────────
const typeLabel: Record<string, string> = {
  intro: "Introduction",
  visual: "Visuel",
  info: "Information",
  scenario: "Scénario",
  list: "Points clés",
};

const typeAccent: Record<string, { border: string; icon: string; headerBg: string }> = {
  intro:    { border: "#0043ce", icon: "rgba(0,67,206,0.1)",   headerBg: "#fff" },
  visual:   { border: "#0043ce", icon: "rgba(0,67,206,0.1)",   headerBg: "#fff" },
  info:     { border: "#0043ce", icon: "rgba(0,67,206,0.1)",   headerBg: "#fff" },
  scenario: { border: "#f59e0b", icon: "rgba(245,158,11,0.1)", headerBg: "#fffbf0" },
  list:     { border: "#198038", icon: "rgba(25,128,56,0.1)",  headerBg: "#f7fdf9" },
};

// ── Main Module page ────────────────────────────────────────────
export default function ModulePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { setModuleProgress, progress } = useUser();
  const [phase, setPhase] = useState<"intro" | "countdown" | "module">("intro");
  const [quizDone, setQuizDone] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [activeSection, setActiveSection] = useState<number | null>(0);
  const [showCelebration, setShowCelebration] = useState(false);

  const mod = id ? getModuleById(id) : null;

  // Réinitialise l'overlay intro à chaque changement de module
  useEffect(() => {
    setPhase("intro");
    setQuizDone(false);
    setQuizScore(0);
    setActiveSection(0);
    setShowCelebration(false);
  }, [id]);

  useEffect(() => {
    if (!mod) navigate("/hub");
  }, [mod, navigate]);

  if (!mod) return null;

  const existingProgress = progress[mod.id];
  const alreadyDone = existingProgress?.completed;

  const handleQuizComplete = (score: number, correct: number) => {
    setQuizScore(score);
    setQuizDone(true);
    setShowCelebration(true);
    setModuleProgress(mod.id, {
      moduleId: mod.id,
      completed: true,
      score,
      correctAnswers: correct,
      totalQuestions: mod.quiz.length,
      completedAt: new Date().toISOString(),
    });
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#f2f3f7", fontFamily: "'IBM Plex Sans', sans-serif" }}>
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
        {/* Hero */}
        <div className="relative overflow-hidden" style={{ height: "260px" }}>
          <img
            src={mod.image}
            alt={mod.title}
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.5)" }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, rgba(0,10,30,0.6) 0%, rgba(0,0,0,0.55) 100%)" }} />
          {/* IBM blue accent bar */}
          <div className="absolute bottom-0 left-0 right-0" style={{ height: "3px", background: "linear-gradient(90deg, #0f62fe, #0043ce 60%, transparent)" }} />

          <div className="absolute bottom-0 left-0 right-0 p-6 max-w-4xl mx-auto">
            <div
              className="font-mono text-xs mb-3 flex items-center gap-2"
              style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.12em", textTransform: "uppercase" }}
            >
              <span>Chapitre {mod.chapter}</span>
              <span style={{ color: "rgba(255,255,255,0.22)" }}>·</span>
              <span>Module {mod.number.toString().padStart(2, "0")}</span>
              <span style={{ color: "rgba(255,255,255,0.22)" }}>·</span>
              <Clock size={11} />
              <span>{mod.duration}</span>
            </div>
            <h1 className="text-2xl font-bold text-white mb-1.5" style={{ letterSpacing: "-0.025em", lineHeight: "1.15" }}>
              {mod.title}
            </h1>
            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.9375rem" }}>{mod.subtitle}</p>
          </div>

          {alreadyDone && (
            <div
              className="absolute top-4 right-4 flex items-center gap-2 font-semibold text-xs px-3 py-1.5 rounded-full"
              style={{ background: "#198038", color: "#fff", boxShadow: "0 2px 8px rgba(25,128,56,0.4)" }}
            >
              <CheckCircle2 size={13} />
              Complété · {existingProgress.score}%
            </div>
          )}
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 py-6 flex flex-col gap-5">

          {/* Objective card */}
          <FadeIn delay={0.05}>
            <div
              className="flex items-start gap-4 rounded-2xl p-5"
              style={{
                background: "#fff",
                border: "1.5px solid rgba(0,67,206,0.18)",
                boxShadow: "0 2px 12px rgba(0,67,206,0.06)",
              }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(0,67,206,0.08)", border: "1.5px solid rgba(0,67,206,0.12)" }}
              >
                <Target size={19} style={{ color: "#0043ce" }} />
              </div>
              <div>
                <div className="text-xs font-semibold mb-1" style={{ color: "#0043ce", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  Objectif du module
                </div>
                <div className="font-medium" style={{ color: "#161616", fontSize: "0.9375rem", lineHeight: "1.6" }}>
                  {mod.objective}
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Fun facts */}
          {mod.funFacts && mod.funFacts.length > 0 && (
            <FadeIn delay={0.08}>
              <div className="flex flex-col gap-2.5">
                {mod.funFacts.map((fact, i) => (
                  <FactCard key={i} fact={fact} delay={i * 0.07} />
                ))}
              </div>
            </FadeIn>
          )}

          {/* Video player */}
          {mod.videoUrl && (
            <FadeIn delay={0.1}>
              <div>
                <div className="text-xs font-semibold mb-2.5" style={{ color: "#8d95aa", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  Vidéo pédagogique
                </div>
                <VideoPlayer url={mod.videoUrl} title={mod.title} captionsVtt={mod.captionsVtt} />
              </div>
            </FadeIn>
          )}

          {/* Content sections */}
          <div className="flex flex-col gap-3">
            {mod.content.map((section, idx) => {
              const accent = typeAccent[section.type] ?? typeAccent.intro;
              const isOpen = activeSection === idx;
              return (
                <FadeIn key={idx} delay={0.05 + idx * 0.05}>
                  <div
                    className="rounded-2xl overflow-hidden transition-shadow"
                    style={{
                      border: `1.5px solid ${isOpen ? accent.border : "#e4e7f0"}`,
                      background: "#fff",
                      boxShadow: isOpen ? `0 4px 20px rgba(0,0,0,0.06)` : "0 1px 4px rgba(0,0,0,0.03)",
                    }}
                  >
                    {/* Colored top accent line when open */}
                    {isOpen && (
                      <div style={{ height: "2px", background: accent.border, opacity: 0.7 }} />
                    )}

                    {/* Header button */}
                    <button
                      className="w-full flex items-center gap-3 px-5 py-4 text-left"
                      style={{ background: isOpen ? accent.headerBg : "#fff", transition: "background 0.2s" }}
                      onClick={() => setActiveSection(isOpen ? null : idx)}
                    >
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: accent.icon }}
                      >
                        <ContentIcon type={section.type} />
                      </div>
                      <div className="flex-1">
                        <div className="text-xs font-semibold mb-0.5" style={{ color: "#9aa0b8", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                          {typeLabel[section.type]}
                        </div>
                        <div className="font-bold" style={{ color: "#161616", fontSize: "0.9375rem" }}>
                          {section.title || mod.title}
                        </div>
                      </div>
                      <ChevronDown
                        size={17}
                        style={{
                          color: isOpen ? accent.border : "#adb3c8",
                          transform: isOpen ? "rotate(180deg)" : "rotate(0)",
                          transition: "transform 0.25s, color 0.2s",
                          flexShrink: 0,
                        }}
                      />
                    </button>

                    {/* Body */}
                    {isOpen && <SectionBody section={section} />}
                  </div>
                </FadeIn>
              );
            })}
          </div>

          {/* Interactive exercises */}
          {MODULE_INTERACTIONS[mod.id]?.length > 0 && (
            <FadeIn delay={0.1}>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2.5 pb-3" style={{ borderBottom: "2px solid #e4e7f0" }}>
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "rgba(0,67,206,0.1)" }}>
                    <Zap size={13} style={{ color: "#0043ce" }} />
                  </div>
                  <span className="font-bold" style={{ color: "#161616", fontSize: "0.9375rem" }}>Exercices interactifs</span>
                  <span
                    className="ml-auto font-mono text-xs px-2.5 py-1 rounded-full"
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
            </FadeIn>
          )}

          {/* Key points recap before quiz */}
          {mod.keyPoints && mod.keyPoints.length > 0 && (
            <FadeIn delay={0.12}>
              <div
                className="rounded-2xl p-5"
                style={{
                  background: "linear-gradient(135deg, rgba(0,67,206,0.05) 0%, rgba(15,98,254,0.03) 100%)",
                  border: "1.5px solid rgba(0,67,206,0.15)",
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "rgba(0,67,206,0.1)" }}>
                    <BookOpen size={13} style={{ color: "#0043ce" }} />
                  </div>
                  <span className="font-bold text-sm" style={{ color: "#0043ce" }}>À retenir avant le quiz</span>
                </div>
                <div className="flex flex-col gap-2.5">
                  {mod.keyPoints.map((point, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span
                        className="font-mono text-xs font-bold flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                        style={{ background: "#0043ce", color: "#fff", fontSize: "10px", fontFamily: "'IBM Plex Mono', monospace" }}
                      >
                        {i + 1}
                      </span>
                      <span style={{ color: "#2d3148", fontSize: "0.875rem", lineHeight: "1.55", fontWeight: 500 }}>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          )}

          {/* Quiz section */}
          <FadeIn delay={0.15}>
            <div>
              <div className="flex items-center gap-2.5 mb-4 pb-3" style={{ borderBottom: "2px solid #e4e7f0" }}>
                <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "rgba(0,67,206,0.1)" }}>
                  <Shield size={13} style={{ color: "#0043ce" }} />
                </div>
                <span className="font-bold" style={{ color: "#161616", fontSize: "0.9375rem" }}>Évaluation du module</span>
                <span
                  className="ml-auto font-mono text-xs px-2.5 py-1 rounded-full"
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
                  className="rounded-2xl p-6 flex items-center gap-5"
                  style={{ background: "rgba(25,128,56,0.04)", border: "2px solid rgba(25,128,56,0.2)" }}
                >
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "#198038" }}>
                    <CheckCircle2 size={22} color="#fff" />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold mb-0.5" style={{ color: "#0e6027", fontSize: "0.9375rem" }}>Module déjà complété</div>
                    <div className="text-sm" style={{ color: "#6f7897" }}>
                      Score : {existingProgress.score}% · {existingProgress.correctAnswers}/{existingProgress.totalQuestions} bonnes réponses
                    </div>
                  </div>
                  <button
                    onClick={() => setQuizDone(false)}
                    className="flex items-center gap-1.5 text-sm font-semibold px-4 py-2.5 rounded-xl transition-all"
                    style={{ background: "#198038", color: "#fff", border: "none", cursor: "pointer" }}
                  >
                    <RotateCcw size={13} />
                    Réessayer
                  </button>
                </div>
              ) : (
                <QuizBlock questions={mod.quiz} onComplete={handleQuizComplete} />
              )}
            </div>
          </FadeIn>

          {/* Post-quiz navigation */}
          {(quizDone || alreadyDone) && (
            <FadeIn delay={0}>
              <div
                className="flex flex-col sm:flex-row items-center gap-4 rounded-2xl p-5"
                style={{
                  background: quizScore >= 80 || alreadyDone ? "rgba(25,128,56,0.05)" : "rgba(218,30,40,0.04)",
                  border: `2px solid ${quizScore >= 80 || alreadyDone ? "rgba(25,128,56,0.22)" : "rgba(218,30,40,0.22)"}`,
                }}
              >
                <div className="flex-1">
                  <div className="font-bold mb-0.5" style={{ color: "#161616", fontSize: "0.9375rem" }}>
                    {quizDone
                      ? quizScore >= 80 ? "Bien joué — module validé !" : "Score insuffisant — réessayez le quiz"
                      : "Module déjà complété"}
                  </div>
                  <div className="text-sm" style={{ color: "#6f7897" }}>
                    Retournez au tableau de bord pour continuer avec le prochain module.
                  </div>
                </div>
                <button
                  onClick={() => navigate("/hub")}
                  className="flex items-center gap-2 font-semibold px-6 py-3 rounded-xl transition-all whitespace-nowrap"
                  style={{ background: "#0043ce", color: "#fff", border: "none", cursor: "pointer", fontSize: "0.9375rem" }}
                  onMouseEnter={(e) => (e.currentTarget as HTMLButtonElement).style.background = "#0031a9"}
                  onMouseLeave={(e) => (e.currentTarget as HTMLButtonElement).style.background = "#0043ce"}
                >
                  Tableau de bord
                  <ChevronRight size={16} />
                </button>
              </div>
            </FadeIn>
          )}
        </div>
      </main>

      {/* Intro overlay */}
      {phase === "intro" && (
        <ModuleIntroOverlay
          mod={mod}
          onStart={() => setPhase("countdown")}
        />
      )}

      {/* Countdown overlay */}
      {phase === "countdown" && (
        <CountdownOverlay
          moduleImage={mod.image}
          onComplete={() => setPhase("module")}
        />
      )}

      {/* Celebration overlay */}
      {showCelebration && (
        <CompletionCelebration
          score={quizScore}
          moduleName={mod.title}
          onContinue={() => {
            setShowCelebration(false);
            if (quizScore >= 80) navigate("/hub");
          }}
        />
      )}
    </div>
  );
}
