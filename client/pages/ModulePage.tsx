import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronRight, ChevronLeft, CheckCircle2, XCircle, Target, Clock,
  Info, AlertTriangle, List, Eye, ChevronDown, Award,
  ArrowRight, RotateCcw, Zap, BookOpen, FileText, Shield, Save, Download,
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
import FlipCards from "@/components/interactions/FlipCards";
import BinaryQuiz from "@/components/interactions/BinaryQuiz";
import FillBlank from "@/components/interactions/FillBlank";
import MatchingExercise from "@/components/interactions/MatchingExercise";
import OrderPuzzle from "@/components/interactions/OrderPuzzle";
import SeriousGame from "@/components/interactions/SeriousGame";
import TipFlipCards from "@/components/interactions/TipFlipCards";
import SpinWheel from "@/components/interactions/SpinWheel";
import GridQuiz from "@/components/interactions/GridQuiz";
import MindMap from "@/components/interactions/MindMap";
import SituationAlertPopup from "@/components/SituationAlertPopup";
import { getModuleById, QuizQuestion, ModuleContent, PreTestQuestion } from "@/lib/courseData";
import { getModuleByIdEn } from "@/lib/courseDataEn";
import { useLanguage } from "@/lib/languageContext";
import { t } from "@/lib/i18n";
import { MODULE_INTERACTIONS, AnyExercise } from "@/lib/interactionData";
import { ALERT_BY_MODULE } from "@/lib/situationAlerts";
import { useUser } from "@/lib/userContext";
import { updateProgression, getSessionId } from "@/lib/supabase";

function InteractionBlock({ exercise }: { exercise: AnyExercise }) {
  if (exercise.type === "hotspot") return <HotspotImage exercise={exercise} />;
  if (exercise.type === "dragdrop") return <DragAndDrop exercise={exercise} />;
  if (exercise.type === "branching") return <BranchingScenario exercise={exercise} />;
  if (exercise.type === "flipcards") return <FlipCards exercise={exercise} />;
  if (exercise.type === "binary") return <BinaryQuiz exercise={exercise} />;
  if (exercise.type === "fillblank") return <FillBlank exercise={exercise} />;
  if (exercise.type === "matching") return <MatchingExercise exercise={exercise} />;
  if (exercise.type === "orderpuzzle") return <OrderPuzzle exercise={exercise} />;
  if (exercise.type === "seriousgame") return <SeriousGame exercise={exercise} />;
  if (exercise.type === "tipflip") return <TipFlipCards exercise={exercise} />;
  if (exercise.type === "spinwheel") return <SpinWheel exercise={exercise} />;
  if (exercise.type === "gridquiz") return <GridQuiz exercise={exercise} />;
  if (exercise.type === "mindmap") return <MindMap exercise={exercise} />;
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
  const { lang } = useLanguage();
  const isEN = lang === "en";
  const isScenario = section.type === "scenario";
  const isList = section.type === "list";
  const isCaseFigure = section.type === "casefigure";
  const isComparison = section.type === "comparison";

  return (
    <div className="px-5 pb-6 pt-1">
      {/* Image */}
      {section.image && (
        <div className="rounded-xl overflow-hidden mb-5 flex items-center justify-center" style={{ border: "1px solid #e4e7f0", background: "#f8f9fc" }}>
          <img src={section.image} alt={section.title || ""} className="w-full object-contain" style={{ maxHeight: "340px" }} />
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
      {!isList && !isCaseFigure && !isComparison && section.bullets && (
        <ul className="flex flex-col gap-2 mb-5">
          {section.bullets.map((b, bi) => (
            <li key={bi} className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: "#0043ce" }} />
              <span style={{ color: "#3d4259", fontSize: "0.9375rem", lineHeight: "1.6" }}>{b}</span>
            </li>
          ))}
        </ul>
      )}

      {/* ── Cas de figures ── */}
      {isCaseFigure && section.cases && (
        <div className="flex flex-col gap-3 mb-5">
          {section.cases.map((c, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden"
              style={{ border: `1.5px solid ${c.correct ? "rgba(25,128,56,0.3)" : "rgba(218,30,40,0.3)"}` }}
            >
              {/* Case header */}
              <div
                className="flex items-center gap-2 px-4 py-2.5"
                style={{
                  background: c.correct ? "rgba(25,128,56,0.07)" : "rgba(218,30,40,0.06)",
                  borderBottom: `1px solid ${c.correct ? "rgba(25,128,56,0.15)" : "rgba(218,30,40,0.15)"}`,
                }}
              >
                {c.correct
                  ? <CheckCircle2 size={14} style={{ color: "#198038" }} />
                  : <XCircle size={14} style={{ color: "#da1e28" }} />}
                <span
                  className="text-xs font-bold uppercase tracking-wide"
                  style={{ color: c.correct ? "#0e6027" : "#a2191f", fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.08em" }}
                >
                  {isEN ? "Case" : "Cas"} {i + 1} — {c.correct ? (isEN ? "Good decision" : "Bonne décision") : (isEN ? "Mistake to avoid" : "Erreur à éviter")}
                </span>
              </div>
              {/* Case body */}
              <div className="px-4 py-3" style={{ background: "#fafbfc" }}>
                <div className="text-xs font-semibold uppercase mb-1" style={{ color: "#8d95aa", letterSpacing: "0.06em" }}>{isEN ? "Situation" : "Situation"}</div>
                <div className="text-sm mb-3" style={{ color: "#3d4259", lineHeight: "1.6" }}>{c.situation}</div>
                <div className="text-xs font-semibold uppercase mb-1" style={{ color: "#8d95aa", letterSpacing: "0.06em" }}>{isEN ? "Action" : "Action"}</div>
                <div
                  className="text-sm font-semibold mb-2"
                  style={{ color: c.correct ? "#198038" : "#da1e28" }}
                >
                  {c.action}
                </div>
                <div className="flex items-start gap-2">
                  <ArrowRight size={13} style={{ color: "#8d95aa", flexShrink: 0, marginTop: "2px" }} />
                  <span className="text-xs" style={{ color: "#6f7897", lineHeight: "1.5" }}>{c.result}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Comparaison À faire / À éviter ── */}
      {isComparison && (section.doList || section.dontList) && (
        <div className="grid grid-cols-2 gap-3 mb-5">
          {section.doList && (
            <div className="rounded-xl overflow-hidden" style={{ border: "1.5px solid rgba(25,128,56,0.3)" }}>
              <div className="flex items-center gap-2 px-3 py-2.5" style={{ background: "rgba(25,128,56,0.07)", borderBottom: "1px solid rgba(25,128,56,0.15)" }}>
                <CheckCircle2 size={13} style={{ color: "#198038" }} />
                <span className="text-xs font-bold uppercase" style={{ color: "#0e6027", letterSpacing: "0.08em" }}>{isEN ? "To do" : "À faire"}</span>
              </div>
              <div className="px-3 py-3 flex flex-col gap-2.5">
                {section.doList.map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: "#198038" }} />
                    <span className="text-xs leading-relaxed" style={{ color: "#1a3a25" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {section.dontList && (
            <div className="rounded-xl overflow-hidden" style={{ border: "1.5px solid rgba(218,30,40,0.3)" }}>
              <div className="flex items-center gap-2 px-3 py-2.5" style={{ background: "rgba(218,30,40,0.06)", borderBottom: "1px solid rgba(218,30,40,0.15)" }}>
                <XCircle size={13} style={{ color: "#da1e28" }} />
                <span className="text-xs font-bold uppercase" style={{ color: "#a2191f", letterSpacing: "0.08em" }}>{isEN ? "To avoid" : "À éviter"}</span>
              </div>
              <div className="px-3 py-3 flex flex-col gap-2.5">
                {section.dontList.map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: "#da1e28" }} />
                    <span className="text-xs leading-relaxed" style={{ color: "#3a1a1a" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
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
    casefigure: <Zap size={15} style={{ color: "#7c3aed" }} />,
    comparison: <ArrowRight size={15} style={{ color: "#198038" }} />,
  };
  return <>{icons[type] ?? <FileText size={15} style={{ color: "#0043ce" }} />}</>;
}

// ── Podcast player ──────────────────────────────────────────────
function PodcastPlayer({ url, title, lang }: { url: string; title: string; lang: "fr" | "en" }) {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: "linear-gradient(135deg, #1a0533 0%, #2d0a5e 50%, #1a0533 100%)", boxShadow: "0 4px 24px rgba(138,63,252,0.2)" }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: "1px solid rgba(138,63,252,0.2)" }}>
        <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(138,63,252,0.25)", border: "1.5px solid rgba(138,63,252,0.4)" }}>
          {/* Mic icon SVG */}
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/>
          </svg>
        </div>
        <div className="flex-1">
          <div className="font-mono text-xs font-bold uppercase" style={{ color: "#a855f7", letterSpacing: "0.1em", fontFamily: "'IBM Plex Mono', monospace" }}>
            {lang === "en" ? "PODCAST — GO FURTHER" : "PODCAST — POUR ALLER PLUS LOIN"}
          </div>
          <div className="font-semibold text-white" style={{ fontSize: "0.8rem", opacity: 0.85 }}>
            {lang === "en" ? `Deep dive: ${title}` : `Approfondissement : ${title}`}
          </div>
        </div>
        <div className="font-mono text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(138,63,252,0.2)", color: "#a855f7", border: "1px solid rgba(138,63,252,0.35)", fontFamily: "'IBM Plex Mono', monospace" }}>
          AUDIO
        </div>
      </div>

      {/* Audio player */}
      <div className="px-4 py-3">
        <audio
          controls
          style={{ width: "100%", accentColor: "#a855f7", borderRadius: "8px", height: "36px" }}
          src={url}
        >
          {lang === "en" ? "Your browser does not support audio." : "Votre navigateur ne supporte pas l'audio."}
        </audio>
        <p className="text-xs mt-2" style={{ color: "rgba(255,255,255,0.4)", fontStyle: "italic" }}>
          {lang === "en"
            ? "Listen to this expert dialogue to reinforce your understanding before the quiz."
            : "Écoutez ce dialogue d'experts pour renforcer votre compréhension avant le quiz."}
        </p>
      </div>
    </div>
  );
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
  lang = "fr",
}: {
  questions: QuizQuestion[];
  onComplete: (score: number, correct: number) => void;
  lang?: "fr" | "en";
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
            {passed ? (lang === "en" ? "Quiz passed — module validated" : "Quiz réussi — module validé") : (lang === "en" ? "Insufficient score — retry" : "Score insuffisant — réessayez")}
          </div>
          <div className="text-sm mb-5" style={{ color: "#6f7897" }}>
            {finalCorrect} {lang === "en" ? "correct answer(s) out of" : `bonne${finalCorrect > 1 ? "s" : ""} réponse${finalCorrect > 1 ? "s" : ""} sur`} {shuffledQuestions.length}
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
              {lang === "en" ? "Retry quiz" : "Réessayer le quiz"}
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
      {answered && (() => {
        const isCorrect = selected === q.correctKey;
        const correctChoice = shuffledChoices[current].find((c) => c.key === q.correctKey);
        const selectedChoice = shuffledChoices[current].find((c) => c.key === selected);
        return (
          <div
            className="mx-4 mb-2 rounded-2xl overflow-hidden"
            style={{
              border: `2px solid ${isCorrect ? "rgba(25,128,56,0.35)" : "rgba(218,30,40,0.3)"}`,
              animation: "feedbackSlide 0.35s ease",
            }}
          >
            {/* Header bar */}
            <div
              className="flex items-center gap-2.5 px-4 py-2.5"
              style={{ background: isCorrect ? "#198038" : "#da1e28" }}
            >
              {isCorrect
                ? <CheckCircle2 size={15} color="#fff" />
                : <XCircle size={15} color="#fff" />}
              <span className="font-bold text-white" style={{ fontSize: "0.875rem" }}>
                {isCorrect ? t("quiz.good", lang) : t("quiz.wrong", lang)}
              </span>
            </div>

            <div className="px-4 py-4 flex flex-col gap-3" style={{ background: isCorrect ? "rgba(25,128,56,0.04)" : "rgba(218,30,40,0.04)" }}>

              {/* If wrong: show the correct answer */}
              {!isCorrect && correctChoice && (
                <div className="rounded-xl px-3.5 py-2.5" style={{ background: "rgba(25,128,56,0.1)", border: "1.5px solid rgba(25,128,56,0.3)" }}>
                  <div className="text-xs font-bold uppercase mb-1" style={{ color: "#198038", letterSpacing: "0.08em" }}>
                    {t("quiz.correct_was", lang)}
                  </div>
                  <div className="font-semibold" style={{ color: "#0e6027", fontSize: "0.9rem" }}>
                    {correctChoice.key}. {correctChoice.label}
                  </div>
                </div>
              )}

              {/* Pourquoi section */}
              <div>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <div className="w-1 h-4 rounded-full" style={{ background: isCorrect ? "#198038" : "#da1e28" }} />
                  <span className="text-xs font-bold uppercase" style={{ color: isCorrect ? "#0e6027" : "#a2191f", letterSpacing: "0.1em" }}>
                    {t("quiz.why", lang)}
                  </span>
                </div>
                <p style={{ color: "#2d3148", fontSize: "0.9rem", lineHeight: "1.65" }}>
                  {isCorrect ? q.feedbackOk : q.feedbackKo}
                </p>
              </div>

              {/* Alternative — if wrong, show what could also be done */}
              {!isCorrect && q.feedbackOk && (
                <div className="rounded-xl px-3.5 py-2.5" style={{ background: "rgba(13,71,161,0.06)", border: "1px solid rgba(13,71,161,0.18)" }}>
                  <div className="text-xs font-bold uppercase mb-1" style={{ color: "#0D47A1", letterSpacing: "0.08em" }}>
                    {t("quiz.remember", lang)}
                  </div>
                  <p style={{ color: "#3d4259", fontSize: "0.875rem", lineHeight: "1.6" }}>
                    {q.feedbackOk}
                  </p>
                </div>
              )}

              {/* Hint from selected choice if wrong */}
              {!isCorrect && selectedChoice?.hint && (
                <div className="flex items-start gap-2" style={{ color: "#6f7897", fontSize: "0.82rem" }}>
                  <Info size={13} style={{ flexShrink: 0, marginTop: "2px", color: "#adb3c8" }} />
                  <span>{selectedChoice.hint}</span>
                </div>
              )}
            </div>
          </div>
        );
      })()}

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
          <FileText size={13} style={{ color: shake ? "#da1e28" : "#0043ce", flexShrink: 0 }} />
          <span className="text-xs font-semibold" style={{ color: shake ? "#da1e28" : "#0043ce" }}>
            {shake ? t("quiz.must_answer", lang) : t("quiz.select", lang)}
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
          {current < shuffledQuestions.length - 1 ? t("quiz.next_q", lang) : t("quiz.result", lang)}
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

// ── Pre-test overlay ────────────────────────────────────────────
function PreTestOverlay({
  questions,
  moduleTitle,
  onComplete,
  onSkip,
  lang = "fr",
}: {
  questions: PreTestQuestion[];
  moduleTitle: string;
  onComplete: (score: number) => void;
  onSkip: () => void;
  lang?: "fr" | "en";
}) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState(0);

  useEffect(() => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator(); const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.frequency.value = 660; osc.type = "sine";
      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      osc.start(); osc.stop(ctx.currentTime + 0.5);
    } catch (_) {}
  }, []);

  const q = questions[current];

  const handleSelect = (key: string) => {
    if (answered) return;
    setSelected(key);
    setAnswered(true);
    if (key === q.correctKey) setCorrect((c) => c + 1);
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      const finalCorrect = selected === q.correctKey ? correct + 1 : correct;
      onComplete(Math.round((finalCorrect / questions.length) * 100));
    }
  };

  return (
    <div className="fixed inset-0 z-[80] flex flex-col" style={{ background: "rgba(10,24,82,0.97)", fontFamily: "'IBM Plex Sans', sans-serif" }}>
      {/* Header */}
      <div className="flex-shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", animation: "popupShake 0.55s ease 0.15s both" }}>
        {/* Top bar with skip */}
        <div className="flex items-center justify-between px-5 pt-4 pb-0">
          <div style={{ width: "1px" }} />
          <button
            onClick={onSkip}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg"
            style={{ background: "rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.9)", border: "1px solid rgba(255,255,255,0.35)", cursor: "pointer" }}
          >
            {t("pretest.skip", lang)}
          </button>
        </div>

        {/* Main header content */}
        <div className="px-5 pt-4 pb-5">
          {/* Giant label — the star of the show */}
          <div className="mb-3">
            <span
              className="font-mono font-black uppercase"
              style={{
                fontSize: "clamp(1.6rem, 5vw, 2.4rem)",
                letterSpacing: "0.04em",
                fontFamily: "'IBM Plex Mono', monospace",
                background: "linear-gradient(90deg, #78a9ff 0%, #a56eff 50%, #33b1ff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                lineHeight: 1.1,
                display: "block",
              }}
            >
              {t("pretest.title", lang)}
            </span>
          </div>

          {/* Module name */}
          <div className="font-bold text-white mb-2" style={{ fontSize: "1rem", opacity: 0.75, lineHeight: "1.3" }}>
            {moduleTitle}
          </div>

          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.82rem", lineHeight: "1.5" }}>
            {lang === "en"
              ? "Answer these quick questions to assess your starting level. No pressure — there are no wrong answers."
              : "Répondez à ces questions pour évaluer votre niveau de départ. Pas de stress — il n'y a pas de mauvaises réponses."}
          </p>
        </div>
      </div>

      {/* Progress dots */}
      <div className="flex items-center gap-2 px-5 py-3 flex-shrink-0">
        {questions.map((_, i) => (
          <div key={i} className="rounded-full transition-all duration-300" style={{ height: "4px", flex: 1, background: i < current ? "#6fdc8c" : i === current ? "#fff" : "rgba(255,255,255,0.18)" }} />
        ))}
      </div>

      {/* Question */}
      <div className="flex-1 overflow-y-auto px-5 py-4">
        <div className="max-w-lg mx-auto">
          <div className="text-xs font-mono mb-3" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'IBM Plex Mono', monospace" }}>
            {t("pretest.question", lang)} {current + 1} / {questions.length}
          </div>
          <div className="font-bold text-white mb-5" style={{ fontSize: "1.05rem", lineHeight: "1.4" }}>
            {q.question}
          </div>

          <div className="flex flex-col gap-2.5">
            {q.choices.map((choice) => {
              const isSelected = selected === choice.key;
              const isCorrect = choice.key === q.correctKey;
              let bg = "rgba(255,255,255,0.06)";
              let border = "rgba(255,255,255,0.12)";
              let color = "#fff";
              if (answered && isSelected && isCorrect) { bg = "rgba(25,128,56,0.2)"; border = "rgba(25,128,56,0.5)"; color = "#6fdc8c"; }
              else if (answered && isSelected && !isCorrect) { bg = "rgba(218,30,40,0.2)"; border = "rgba(218,30,40,0.5)"; color = "#ff8b8b"; }
              else if (answered && isCorrect) { bg = "rgba(25,128,56,0.12)"; border = "rgba(25,128,56,0.35)"; color = "#6fdc8c"; }
              return (
                <button
                  key={choice.key}
                  onClick={() => handleSelect(choice.key)}
                  className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-left transition-all"
                  style={{ background: bg, border: `2px solid ${border}`, color, cursor: answered ? "default" : "pointer", fontSize: "0.9rem", lineHeight: "1.4" }}
                >
                  <span className="font-mono font-bold flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center text-xs"
                    style={{ background: "rgba(255,255,255,0.1)", fontFamily: "'IBM Plex Mono', monospace" }}
                  >{choice.key}</span>
                  {choice.label}
                </button>
              );
            })}
          </div>

          {answered && (() => {
            const isCorrect = selected === q.correctKey;
            const correctChoice = q.choices.find((c) => c.key === q.correctKey);
            return (
              <div className="mt-4 flex flex-col gap-3">
                {/* Feedback box */}
                <div className="rounded-2xl overflow-hidden" style={{ border: `1.5px solid ${isCorrect ? "rgba(25,128,56,0.45)" : "rgba(218,30,40,0.45)"}` }}>
                  <div className="flex items-center gap-2 px-4 py-2.5" style={{ background: isCorrect ? "#198038" : "#da1e28" }}>
                    {isCorrect
                      ? <CheckCircle2 size={14} color="#fff" />
                      : <XCircle size={14} color="#fff" />}
                    <span className="font-bold text-white text-sm">{isCorrect ? t("pretest.good", lang) : t("pretest.wrong", lang)}</span>
                  </div>
                  <div className="px-4 py-3" style={{ background: isCorrect ? "rgba(25,128,56,0.12)" : "rgba(218,30,40,0.1)" }}>
                    {!isCorrect && correctChoice && (
                      <div className="mb-2 text-sm font-semibold" style={{ color: "#6fdc8c" }}>
                        {t("pretest.correct", lang)} {correctChoice.key}. {correctChoice.label}
                      </div>
                    )}
                    <p className="text-sm" style={{ color: "rgba(255,255,255,0.7)", lineHeight: "1.55" }}>
                      {isCorrect ? t("pretest.good_msg", lang) : t("pretest.ko_msg", lang)}
                    </p>
                  </div>
                </div>

                {/* Next button — inside scrollable area, always accessible */}
                <button
                  onClick={handleNext}
                  className="w-full flex items-center justify-center gap-2 rounded-xl py-3.5 font-bold mb-4"
                  style={{
                    background: "#fff",
                    color: "#0D47A1",
                    border: "2px solid rgba(255,255,255,0.9)",
                    cursor: "pointer",
                    fontSize: "0.9375rem",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                  }}
                >
                  {current < questions.length - 1 ? t("pretest.next", lang) : t("pretest.start", lang)}
                  <ArrowRight size={16} />
                </button>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}

// ── Type labels & tab colors ────────────────────────────────────
function getTypeLabel(type: string, lang: "fr" | "en"): string {
  const map: Record<string, { fr: string; en: string }> = {
    intro:      { fr: "Introduction", en: "Introduction" },
    visual:     { fr: "Visuel",       en: "Visual" },
    info:       { fr: "Information",  en: "Information" },
    scenario:   { fr: "Scénario",     en: "Scenario" },
    list:       { fr: "Points clés",  en: "Key points" },
    casefigure: { fr: "Cas pratique", en: "Case study" },
    comparison: { fr: "Comparaison",  en: "Comparison" },
  };
  return map[type]?.[lang] ?? map[type]?.fr ?? type;
}

const typeAccent: Record<string, { border: string; icon: string; headerBg: string; labelColor: string }> = {
  intro:      { border: "#0D47A1", icon: "rgba(13,71,161,0.1)",   headerBg: "#fff",    labelColor: "#0D47A1" },
  visual:     { border: "#0D47A1", icon: "rgba(13,71,161,0.1)",   headerBg: "#fff",    labelColor: "#0D47A1" },
  info:       { border: "#0D47A1", icon: "rgba(13,71,161,0.1)",   headerBg: "#fff",    labelColor: "#0D47A1" },
  scenario:   { border: "#b45309", icon: "rgba(180,83,9,0.1)",    headerBg: "#fffbf0", labelColor: "#92400e" },
  list:       { border: "#198038", icon: "rgba(25,128,56,0.1)",   headerBg: "#f7fdf9", labelColor: "#0e6027" },
  casefigure: { border: "#7c3aed", icon: "rgba(124,58,237,0.1)",  headerBg: "#faf5ff", labelColor: "#5b21b6" },
  comparison: { border: "#198038", icon: "rgba(25,128,56,0.1)",   headerBg: "#f7fdf9", labelColor: "#0e6027" },
};

// ── Main Module page ────────────────────────────────────────────
export default function ModulePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { setModuleProgress, progress } = useUser();
  const [phase, setPhase] = useState<"intro" | "pretest" | "countdown" | "module">("intro");
  const [quizDone, setQuizDone] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizAttempts, setQuizAttempts] = useState(0);
  const [activeSection, setActiveSection] = useState<number | null>(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [preTestScore, setPreTestScore] = useState<number | null>(null);
  const [selfAssessment, setSelfAssessment] = useState<number | null>(null);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const startTimeRef = useRef<number | null>(null);
  const [elapsedMin, setElapsedMin] = useState<number | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const alertShownRef = useRef(false);
  const alertTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { lang } = useLanguage();
  const isEN = lang === "en";
  const mod = id ? (lang === "en" ? getModuleByIdEn(id) : getModuleById(id)) : null;

  // Réinitialise l'overlay intro à chaque changement de module
  useEffect(() => {
    setPhase("intro");
    setQuizDone(false);
    setQuizScore(0);
    setQuizAttempts(0);
    setActiveSection(0);
    setShowCelebration(false);
    setPreTestScore(null);
    setSelfAssessment(null);
    setSavedAt(null);
    setSaving(false);
    startTimeRef.current = null;
    setElapsedMin(null);
    setShowAlert(false);
    alertShownRef.current = false;
    if (alertTimerRef.current) clearTimeout(alertTimerRef.current);
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
    setQuizAttempts((n) => n + 1);
    // Compute elapsed time
    if (startTimeRef.current) {
      const mins = Math.round((Date.now() - startTimeRef.current) / 60000);
      setElapsedMin(mins);
    }
    // Only mark completed if score >= 80%
    if (score >= 80) {
      setShowCelebration(true);
      setModuleProgress(mod.id, {
        moduleId: mod.id,
        completed: true,
        score,
        correctAnswers: correct,
        totalQuestions: mod.quiz.length,
        completedAt: new Date().toISOString(),
      });
    }
  };

  const handleRetryQuiz = () => {
    setQuizDone(false);
    setQuizScore(0);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#F0F4FA", fontFamily: "'IBM Plex Sans', sans-serif" }}>
      <IBMTopbar
        title={`Module ${mod.number} — ${mod.title}`}
        subtitle={`${t("module.chapter", lang)} ${mod.chapter} · ${mod.duration}`}
        backTo="/hub"
        backLabel={t("module.dashboard", lang)}
        showProgress
        currentModule={mod.number}
        chapter={mod.chapter}
      />

      <main className="flex-1 overflow-y-auto">
        {/* Hero — geometric IBM blue header */}
        <div className="relative overflow-hidden" style={{ minHeight: "180px" }}>
          <div className="absolute inset-0" style={{ background: "linear-gradient(145deg, #0A3882 0%, #0D47A1 45%, #1565C0 100%)" }}>
            <div style={{ position: "absolute", top: 0, right: 0, width: "55%", height: "100%", background: "#0E4DB8", clipPath: "polygon(20% 0, 100% 0, 100% 100%, 0 100%)" }} />
            <div style={{ position: "absolute", top: "10%", left: "5%", width: "50%", height: "80%", background: "#1565C0", clipPath: "polygon(0 0, 100% 0, 85% 100%, 0 90%)" }} />
            <div style={{ position: "absolute", bottom: 0, right: "10%", width: "35%", height: "45%", background: "rgba(255,255,255,0.04)", clipPath: "polygon(10% 0, 100% 0, 90% 100%, 0 100%)" }} />
          </div>

          <div className="relative z-10 flex gap-4 px-5 py-5 max-w-4xl mx-auto items-center">
            <div
              className="flex-shrink-0 rounded-xl overflow-hidden"
              style={{ width: "88px", height: "88px", border: "3px solid rgba(255,255,255,0.22)", boxShadow: "0 8px 24px rgba(0,0,0,0.3)" }}
            >
              <img src={mod.image} alt={mod.title} className="w-full h-full object-cover" style={{ filter: "brightness(0.88)" }} />
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap gap-1.5 mb-2">
                {[`Ch.${mod.chapter}`, `M${mod.number.toString().padStart(2, "0")}`, mod.duration].map((tag) => (
                  <span key={tag} className="font-mono text-xs px-2 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.14)", color: "rgba(255,255,255,0.8)", fontFamily: "'IBM Plex Mono', monospace", fontSize: "9px", letterSpacing: "0.08em" }}>
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="font-bold text-white mb-1" style={{ fontSize: "clamp(1.2rem, 3.5vw, 1.6rem)", letterSpacing: "-0.02em", lineHeight: "1.2" }}>
                {mod.title}
              </h1>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem", lineHeight: "1.45" }}>{mod.subtitle}</p>
              {alreadyDone && (
                <div className="inline-flex items-center gap-1.5 mt-2 text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{ background: "rgba(25,128,56,0.3)", color: "#6fdc8c", border: "1px solid rgba(111,220,140,0.3)" }}
                >
                  <CheckCircle2 size={11} />
                  {t("hub.completed", lang)} · {existingProgress.score}%
                </div>
              )}
            </div>
          </div>
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "18px", background: "#F0F4FA", clipPath: "ellipse(55% 100% at 50% 100%)" }} />
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 py-6 flex flex-col gap-5">

          {/* Objective card */}
          <FadeIn delay={0.05}>
            <div
              className="flex items-start gap-4 rounded-2xl p-5"
              style={{ background: "linear-gradient(135deg, #0D47A1 0%, #1565C0 100%)", boxShadow: "0 4px 20px rgba(13,71,161,0.25)" }}
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(255,255,255,0.15)", border: "1.5px solid rgba(255,255,255,0.2)" }}
              >
                <Target size={19} style={{ color: "#fff" }} />
              </div>
              <div>
                <div className="text-xs font-semibold mb-1 uppercase" style={{ color: "rgba(255,255,255,0.65)", letterSpacing: "0.12em" }}>
                  {t("module.objective", lang)}
                </div>
                <div className="font-semibold text-white" style={{ fontSize: "0.9375rem", lineHeight: "1.55" }}>
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
                  {t("module.video_label", lang)}
                </div>
                <VideoPlayer url={mod.videoUrl} title={mod.title} captionsVtt={mod.captionsVtt} />
              </div>
            </FadeIn>
          )}

          {/* Content sections */}
          <div className="flex flex-col gap-2.5">
            {mod.content.map((section, idx) => {
              const accent = typeAccent[section.type] ?? typeAccent.intro;
              const isOpen = activeSection === idx;
              return (
                <FadeIn key={idx} delay={0.05 + idx * 0.05}>
                  <div
                    className="rounded-2xl overflow-hidden transition-all duration-200"
                    style={{
                      border: `2px solid ${isOpen ? accent.border : "#e4e7f0"}`,
                      background: "#fff",
                      boxShadow: isOpen ? "0 6px 24px rgba(0,0,0,0.09)" : "0 1px 4px rgba(0,0,0,0.04)",
                    }}
                  >
                    <div className="flex">
                      {/* Left color sidebar */}
                      <div style={{ width: "5px", flexShrink: 0, background: isOpen ? accent.border : "#c8cfe0", transition: "background 0.2s" }} />
                      <div className="flex-1">
                        <button
                          className="w-full flex items-center gap-3 px-4 py-3.5 text-left"
                          style={{ background: isOpen ? accent.headerBg : "#fff", transition: "background 0.2s" }}
                          onClick={() => setActiveSection(isOpen ? null : idx)}
                        >
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ background: isOpen ? accent.icon : "#f2f3f7", transition: "background 0.2s" }}
                          >
                            <ContentIcon type={section.type} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-bold uppercase mb-0.5"
                              style={{ color: isOpen ? accent.labelColor : "#adb3c8", letterSpacing: "0.1em", transition: "color 0.2s" }}
                            >
                              {getTypeLabel(section.type, lang)}
                            </div>
                            <div className="font-bold truncate" style={{ color: "#061f5c", fontSize: "0.9rem" }}>
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
                        {isOpen && <SectionBody section={section} />}
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>

          {/* Interactive exercises */}
          {MODULE_INTERACTIONS[mod.id]?.length > 0 && (
            <FadeIn delay={0.1}>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl"
                  style={{ background: "linear-gradient(135deg, #0D47A1, #1565C0)", boxShadow: "0 4px 16px rgba(13,71,161,0.2)" }}
                >
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,255,255,0.15)" }}>
                    <Zap size={14} style={{ color: "#fff" }} />
                  </div>
                  <span className="font-bold text-white uppercase" style={{ fontSize: "0.85rem", letterSpacing: "0.08em" }}>{t("module.exercises", lang)}</span>
                  <span className="ml-auto font-mono text-xs px-2.5 py-1 rounded-full"
                    style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#fff", background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.25)" }}
                  >
                    {MODULE_INTERACTIONS[mod.id].length} {isEN ? `exercise${MODULE_INTERACTIONS[mod.id].length > 1 ? "s" : ""}` : `exercice${MODULE_INTERACTIONS[mod.id].length > 1 ? "s" : ""}`}
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
              <div className="rounded-2xl overflow-hidden" style={{ border: "2px solid rgba(13,71,161,0.25)", boxShadow: "0 2px 12px rgba(13,71,161,0.07)" }}>
                <div className="flex items-center gap-2.5 px-5 py-3"
                  style={{ background: "rgba(13,71,161,0.07)", borderBottom: "1px solid rgba(13,71,161,0.12)" }}
                >
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(13,71,161,0.12)" }}>
                    <BookOpen size={14} style={{ color: "#0D47A1" }} />
                  </div>
                  <span className="font-bold text-sm uppercase" style={{ color: "#0D47A1", letterSpacing: "0.08em" }}>{t("module.key_points", lang)}</span>
                </div>
                <div className="flex flex-col bg-white">
                  {mod.keyPoints.map((point, i) => (
                    <div key={i} className="flex items-start gap-3 px-5 py-3"
                      style={{ borderBottom: i < mod.keyPoints!.length - 1 ? "1px solid #f0f2f8" : "none" }}
                    >
                      <span className="font-mono text-xs font-bold flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center mt-0.5"
                        style={{ background: "#0D47A1", color: "#fff", fontSize: "10px", fontFamily: "'IBM Plex Mono', monospace" }}
                      >
                        {i + 1}
                      </span>
                      <span style={{ color: "#0a2052", fontSize: "0.875rem", lineHeight: "1.55", fontWeight: 500 }}>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          )}

          {/* Podcast player */}
          {mod.podcastUrl && (
            <FadeIn delay={0.13}>
              <PodcastPlayer url={mod.podcastUrl} title={mod.title} lang={lang} />
            </FadeIn>
          )}

          {/* Quiz section */}
          <FadeIn delay={0.15}>
            <div>
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl mb-4"
                style={{ background: "linear-gradient(135deg, #0D47A1, #1565C0)", boxShadow: "0 4px 16px rgba(13,71,161,0.2)" }}
              >
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,255,255,0.15)" }}>
                  <Shield size={14} style={{ color: "#fff" }} />
                </div>
                <span className="font-bold text-white uppercase" style={{ fontSize: "0.85rem", letterSpacing: "0.08em" }}>{t("module.quiz", lang)}</span>
                <span className="ml-auto font-mono text-xs px-2.5 py-1 rounded-full"
                  style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#fff", background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.25)" }}
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
                    <div className="font-bold mb-0.5" style={{ color: "#0e6027", fontSize: "0.9375rem" }}>{t("module.completed", lang)}</div>
                    <div className="text-sm" style={{ color: "#6f7897" }}>
                      {t("module.score_label", lang)} : {existingProgress.score}% · {existingProgress.correctAnswers}/{existingProgress.totalQuestions} {t("module.correct_ans", lang)}
                    </div>
                  </div>
                  <button
                    onClick={() => setQuizDone(false)}
                    className="flex items-center gap-1.5 text-sm font-semibold px-4 py-2.5 rounded-xl transition-all"
                    style={{ background: "#198038", color: "#fff", border: "none", cursor: "pointer" }}
                  >
                    <RotateCcw size={13} />
                    {t("module.restart", lang)}
                  </button>
                </div>
              ) : (
                <QuizBlock questions={mod.quiz} onComplete={handleQuizComplete} lang={lang} />
              )}
            </div>
          </FadeIn>

          {/* Post-quiz section */}
          {(quizDone || alreadyDone) && (
            <FadeIn delay={0}>
              {/* Key points recap */}
              {mod.keyPoints && (
                <div className="rounded-2xl overflow-hidden mb-4" style={{ border: "2px solid rgba(13,71,161,0.22)", boxShadow: "0 4px 16px rgba(13,71,161,0.08)" }}>
                  <div className="flex items-center gap-2.5 px-5 py-3" style={{ background: "linear-gradient(135deg, #0D47A1, #1565C0)" }}>
                    <BookOpen size={15} color="#fff" />
                    <span className="font-bold text-white uppercase" style={{ fontSize: "0.8rem", letterSpacing: "0.1em" }}>{t("module.key_points_post", lang)}</span>
                  </div>
                  <div className="flex flex-col bg-white">
                    {mod.keyPoints.map((point, i) => (
                      <div key={i} className="flex items-start gap-3 px-5 py-3" style={{ borderBottom: i < mod.keyPoints!.length - 1 ? "1px solid #f0f2f8" : "none" }}>
                        <CheckCircle2 size={15} style={{ color: "#0D47A1", flexShrink: 0, marginTop: "1px" }} />
                        <span style={{ color: "#0a2052", fontSize: "0.875rem", lineHeight: "1.55", fontWeight: 500 }}>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Pre-test comparison */}
              {preTestScore !== null && (
                <div className="rounded-xl px-4 py-3 mb-4 flex items-center gap-3" style={{ background: "rgba(124,58,237,0.07)", border: "1.5px solid rgba(124,58,237,0.2)" }}>
                  <Award size={16} style={{ color: "#7c3aed", flexShrink: 0 }} />
                  <div className="flex-1">
                    <div className="font-bold text-xs uppercase" style={{ color: "#5b21b6", letterSpacing: "0.08em" }}>{t("module.progression", lang)}</div>
                    <div className="text-xs mt-0.5" style={{ color: "#6f7897" }}>
                      {t("module.initial_test", lang)} : <strong>{preTestScore}%</strong> → {t("module.final_score", lang)} : <strong>{quizScore || existingProgress?.score || 0}%</strong>
                    </div>
                  </div>
                </div>
              )}

              {/* Self-assessment */}
              <div className="rounded-2xl p-4 mb-4" style={{ background: "#fff", border: "2px solid #e4e7f0" }}>
                <div className="font-bold text-sm mb-3" style={{ color: "#0a2052" }}>{t("self.title", lang)}</div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { val: 1, label: t("self.review", lang), color: "#da1e28", bg: "rgba(218,30,40,0.07)", border: "rgba(218,30,40,0.25)" },
                    { val: 2, label: t("self.progress", lang), color: "#b45309", bg: "rgba(180,83,9,0.07)", border: "rgba(180,83,9,0.25)" },
                    { val: 3, label: t("self.acquired", lang), color: "#0D47A1", bg: "rgba(13,71,161,0.07)", border: "rgba(13,71,161,0.25)" },
                    { val: 4, label: t("self.mastered", lang), color: "#198038", bg: "rgba(25,128,56,0.07)", border: "rgba(25,128,56,0.25)" },
                  ].map((lvl) => (
                    <button
                      key={lvl.val}
                      onClick={() => setSelfAssessment(lvl.val)}
                      className="rounded-xl py-2.5 px-3 font-semibold text-sm transition-all"
                      style={{
                        background: selfAssessment === lvl.val ? lvl.bg : "#f8f9fc",
                        border: `2px solid ${selfAssessment === lvl.val ? lvl.border : "#e4e7f0"}`,
                        color: selfAssessment === lvl.val ? lvl.color : "#8d95aa",
                        cursor: "pointer",
                        fontWeight: selfAssessment === lvl.val ? 700 : 500,
                      }}
                    >
                      {lvl.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* ── Score insuffisant → Retry ──────────────────── */}
              {quizDone && quizScore < 80 && (
                <div className="rounded-2xl p-5 flex flex-col gap-3" style={{ background: "rgba(218,30,40,0.05)", border: "2px solid rgba(218,30,40,0.25)" }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#da1e28" }}>
                      <XCircle size={18} color="#fff" />
                    </div>
                    <div>
                      <div className="font-bold" style={{ color: "#da1e28", fontSize: "0.9375rem" }}>{t("module.insufficient", lang)} — {quizScore}%</div>
                      <div className="text-xs mt-0.5" style={{ color: "#6f7897" }}>{t("module.min_validate", lang)}</div>
                    </div>
                  </div>
                  <button
                    onClick={handleRetryQuiz}
                    className="w-full flex items-center justify-center gap-2 rounded-xl py-3 font-bold"
                    style={{ background: "#da1e28", color: "#fff", border: "none", cursor: "pointer", fontSize: "0.9rem" }}
                  >
                    <RotateCcw size={15} />
                    {t("module.retry", lang)} ({quizAttempts} {t("quiz.attempts", lang)}{quizAttempts > 1 ? "s" : ""})
                  </button>
                  <button
                    onClick={() => navigate("/hub")}
                    className="w-full flex items-center justify-center gap-2 rounded-xl py-2.5 font-semibold"
                    style={{ background: "rgba(13,71,161,0.07)", color: "#0D47A1", border: "1.5px solid rgba(13,71,161,0.18)", cursor: "pointer", fontSize: "0.875rem" }}
                  >
                    <ChevronLeft size={14} />
                    {t("module.dashboard", lang)}
                  </button>
                </div>
              )}

              {/* ── Score OK → Complétion ──────────────────────── */}
              {(quizScore >= 80 || alreadyDone) && (
                <div className="flex flex-col gap-3 rounded-2xl p-5" style={{ background: "rgba(25,128,56,0.05)", border: "2px solid rgba(25,128,56,0.22)" }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#198038" }}>
                      <CheckCircle2 size={18} color="#fff" />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold" style={{ color: "#0e6027", fontSize: "0.9375rem" }}>
                        {quizDone ? t("module.validated", lang) : t("module.completed", lang)}
                      </div>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="text-xs" style={{ color: "#6f7897" }}>{t("module.score_label", lang)} : <strong style={{ color: "#198038" }}>{quizScore || existingProgress?.score || 0}%</strong></span>
                        {elapsedMin !== null && (
                          <span className="flex items-center gap-1 text-xs" style={{ color: "#6f7897" }}>
                            <Clock size={11} />
                            {elapsedMin} {t("module.elapsed", lang)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Checkpoint / Save button */}
                  <button
                    disabled={saving}
                    onClick={async () => {
                      setSaving(true);
                      try {
                        const completedIds = Object.values(progress).filter((p) => p.completed);
                        const avg = completedIds.length > 0
                          ? Math.round(completedIds.reduce((s, p) => s + p.score, 0) / completedIds.length)
                          : 0;
                        await updateProgression(getSessionId(), {
                          completed_modules: completedIds.length,
                          average_score: avg,
                        });
                      } catch (_) { /* silent fail */ }
                      const ts = new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
                      setSavedAt(ts);
                      setSaving(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 rounded-xl font-bold transition-all"
                    style={{
                      padding: "0.85rem 1rem",
                      background: savedAt
                        ? "rgba(25,128,56,0.1)"
                        : saving
                        ? "rgba(13,71,161,0.06)"
                        : "linear-gradient(135deg, #0D47A1 0%, #1565C0 100%)",
                      border: `2px solid ${savedAt ? "rgba(25,128,56,0.35)" : saving ? "rgba(13,71,161,0.2)" : "transparent"}`,
                      color: savedAt ? "#198038" : saving ? "#0D47A1" : "white",
                      cursor: saving ? "wait" : "pointer",
                      fontSize: "0.9rem",
                      boxShadow: savedAt || saving ? "none" : "0 4px 16px rgba(13,71,161,0.35)",
                    }}
                  >
                    {saving ? (
                      <>
                        <span style={{ display: "inline-block", animation: "ibmSpin 1s linear infinite", fontSize: "1rem" }}>⏳</span>
                        {isEN ? "Saving…" : "Sauvegarde en cours…"}
                      </>
                    ) : savedAt ? (
                      <>
                        <CheckCircle2 size={16} />
                        {isEN ? `Checkpoint saved at ${savedAt}` : `Point de sauvegarde — ${savedAt}`}
                      </>
                    ) : (
                      <>
                        <Save size={16} />
                        {isEN ? "Save checkpoint" : "Enregistrer le point de sauvegarde"}
                      </>
                    )}
                  </button>

                  {/* Fiche réflexe button */}
                  <button
                    onClick={() => navigate(`/fiche/${mod.id}`)}
                    className="w-full flex items-center justify-center gap-2 rounded-xl py-2.5 font-semibold transition-all"
                    style={{ background: "rgba(255,107,26,0.08)", border: "1.5px solid rgba(255,107,26,0.3)", color: "#e8520a", cursor: "pointer", fontSize: "0.875rem" }}
                  >
                    <Download size={15} />
                    {isEN ? "Download Quick Reference Sheet" : "Télécharger la fiche réflexe"}
                  </button>

                  {/* Nav buttons */}
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <button
                      onClick={() => navigate("/hub")}
                      className="flex items-center gap-1.5 font-semibold px-4 py-2.5 rounded-xl transition-all"
                      style={{ background: "rgba(13,71,161,0.07)", color: "#0D47A1", border: "1.5px solid rgba(13,71,161,0.2)", cursor: "pointer", fontSize: "0.875rem" }}
                    >
                      <ChevronLeft size={15} />
                      {t("module.dashboard", lang)}
                    </button>
                    <button
                      onClick={() => navigate("/hub")}
                      className="flex-1 flex items-center justify-center gap-2 font-semibold px-6 py-2.5 rounded-xl transition-all whitespace-nowrap"
                      style={{ background: "#0D47A1", color: "#fff", border: "none", cursor: "pointer", fontSize: "0.9375rem" }}
                    >
                      {t("module.next", lang)}
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}
            </FadeIn>
          )}
        </div>
      </main>

      {/* Intro overlay */}
      {phase === "intro" && (
        <ModuleIntroOverlay
          mod={mod}
          onStart={() => mod.preTest?.length ? setPhase("pretest") : setPhase("countdown")}
        />
      )}

      {/* Pre-test overlay */}
      {phase === "pretest" && mod.preTest && (
        <PreTestOverlay
          questions={mod.preTest}
          moduleTitle={mod.title}
          onComplete={(score) => { setPreTestScore(score); setPhase("countdown"); }}
          onSkip={() => setPhase("countdown")}
          lang={lang}
        />
      )}

      {/* Countdown overlay */}
      {phase === "countdown" && (
        <CountdownOverlay
          moduleImage={mod.image}
          onComplete={() => {
            startTimeRef.current = Date.now();
            setPhase("module");
            // Trigger situation alert popup after 20s if module has one
            if (mod && ALERT_BY_MODULE[mod.id] && !alertShownRef.current) {
              alertTimerRef.current = setTimeout(() => {
                if (!alertShownRef.current) {
                  setShowAlert(true);
                  alertShownRef.current = true;
                }
              }, 20000);
            }
          }}
        />
      )}

      {/* Situation alert popup */}
      {showAlert && mod && ALERT_BY_MODULE[mod.id] && (
        <SituationAlertPopup
          alert={ALERT_BY_MODULE[mod.id]}
          onClose={() => setShowAlert(false)}
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
