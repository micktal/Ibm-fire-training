import { useState, useEffect, useRef } from "react";
import { ChevronRight, AlertTriangle, CheckCircle2, XCircle, RotateCcw, Clock, GitBranch } from "lucide-react";
import { useLanguage } from "@/lib/languageContext";

export interface ScenarioChoice {
  label: string;
  labelEn?: string;
  consequence: string;
  consequenceEn?: string;
  consequenceType: "ok" | "ko" | "critical";
  nextNode?: string; // undefined = end
  points?: number;
}

export interface ScenarioNode {
  id: string;
  image?: string;
  situation: string;
  situationEn?: string;
  context?: string;
  contextEn?: string;
  urgency?: "low" | "medium" | "high";
  choices: ScenarioChoice[];
  timed?: number; // seconds for choice, undefined = no timer
}

export interface BranchingExercise {
  type: "branching";
  title: string;
  titleEn?: string;
  subtitle?: string;
  subtitleEn?: string;
  startNode: string;
  nodes: Record<string, ScenarioNode>;
  successMessage?: string;
  successMessageEn?: string;
  failMessage?: string;
  failMessageEn?: string;
}

interface HistoryEntry {
  nodeId: string;
  choiceIdx: number;
  points: number;
  consequenceType: "ok" | "ko" | "critical";
}

interface Props {
  exercise: BranchingExercise;
  onComplete?: (score: number) => void;
}

const URGENCY_COLOR = { low: "#0043ce", medium: "#b45309", high: "#da1e28" };

export default function BranchingScenario({ exercise, onComplete }: Props) {
  const { lang } = useLanguage();
  const isEN = lang === "en";

  const URGENCY_LABEL = {
    low: isEN ? "Normal situation" : "Situation normale",
    medium: isEN ? "Urgent situation" : "Situation urgente",
    high: isEN ? "Immediate danger" : "Danger immédiat",
  };

  const CONSEQUENCE_STYLE = {
    ok: {
      bg: "rgba(25,128,56,0.07)",
      border: "rgba(25,128,56,0.3)",
      icon: <CheckCircle2 size={15} style={{ color: "#198038", flexShrink: 0 }} />,
      titleColor: "#0e6027",
      label: isEN ? "Good decision" : "Bonne décision",
    },
    ko: {
      bg: "rgba(218,30,40,0.06)",
      border: "rgba(218,30,40,0.28)",
      icon: <XCircle size={15} style={{ color: "#da1e28", flexShrink: 0 }} />,
      titleColor: "#a2191f",
      label: isEN ? "Bad decision" : "Mauvaise décision",
    },
    critical: {
      bg: "rgba(218,30,40,0.1)",
      border: "rgba(218,30,40,0.4)",
      icon: <AlertTriangle size={15} style={{ color: "#da1e28", flexShrink: 0 }} />,
      titleColor: "#a2191f",
      label: isEN ? "Critical error" : "Erreur critique",
    },
  };

  const [currentId, setCurrentId] = useState<string>(exercise.startNode);
  const [chosenIdx, setChosenIdx] = useState<number | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [done, setDone] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const node = exercise.nodes[currentId] ?? exercise.nodes[exercise.startNode];

  // Reset to start if node is still undefined (stale state after HMR)
  useEffect(() => {
    if (!exercise.nodes[currentId]) setCurrentId(exercise.startNode);
  }, [exercise.startNode, currentId, exercise.nodes]);

  // Timer
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (!node || chosenIdx !== null || !node.timed) { setTimeLeft(null); return; }
    setTimeLeft(node.timed);
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t === null || t <= 1) {
          clearInterval(timerRef.current!);
          // Auto-select first wrong (non-ok) answer on timeout
          if (chosenIdx === null) {
            const wrongIdx = node.choices.findIndex((c) => c.consequenceType !== "ok");
            handleChoice(wrongIdx >= 0 ? wrongIdx : node.choices.length - 1, true);
          }
          return null;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current!);
  }, [currentId, chosenIdx]);

  const handleChoice = (idx: number, timeout = false) => {
    if (chosenIdx !== null) return;
    if (timerRef.current) clearInterval(timerRef.current);
    const choice = node.choices[idx];
    setChosenIdx(idx);
    const entry: HistoryEntry = {
      nodeId: currentId,
      choiceIdx: idx,
      points: choice.points ?? (choice.consequenceType === "ok" ? 10 : 0),
      consequenceType: choice.consequenceType,
    };
    const nextHistory = [...history, entry];
    setHistory(nextHistory);

    // Move to next after delay
    setTimeout(() => {
      if (choice.nextNode && exercise.nodes[choice.nextNode]) {
        setCurrentId(choice.nextNode);
        setChosenIdx(null);
        setTimeLeft(null);
      } else {
        // End
        setDone(true);
        const totalPossible = Object.values(exercise.nodes).reduce((sum, n) => {
          const maxPts = Math.max(...n.choices.map((c) => c.points ?? (c.consequenceType === "ok" ? 10 : 0)));
          return sum + maxPts;
        }, 0);
        const earned = nextHistory.reduce((sum, e) => sum + e.points, 0);
        const score = Math.min(100, Math.round((earned / Math.max(totalPossible, 1)) * 100));
        onComplete?.(score);
      }
    }, choice.consequenceType === "ok" ? 1600 : 2200);
  };

  const reset = () => {
    setCurrentId(exercise.startNode);
    setChosenIdx(null);
    setHistory([]);
    setDone(false);
    setTimeLeft(null);
  };

  // Score summary
  const totalCorrect = history.filter((h) => h.consequenceType === "ok").length;
  const totalDecisions = history.length;
  const finalScore = Math.round((totalCorrect / Math.max(totalDecisions, 1)) * 100);

  // Urgency color
  const urgColor = node ? URGENCY_COLOR[node.urgency ?? "medium"] : "#0043ce";

  const choiceStyle = (choice: ScenarioChoice, idx: number) => {
    if (chosenIdx === null) return {
      border: "1.5px solid rgba(255,255,255,0.14)",
      background: "rgba(255,255,255,0.07)",
      color: "#fff",
      cursor: "pointer",
    };
    if (idx === chosenIdx) {
      const s = CONSEQUENCE_STYLE[choice.consequenceType];
      return {
        border: `1.5px solid ${s.border}`,
        background: s.bg,
        color: choice.consequenceType === "ok" ? "#6fdc8c" : "#ff8389",
        cursor: "default",
      };
    }
    if (choice.consequenceType === "ok" && chosenIdx !== null) {
      return { border: "1.5px solid rgba(25,128,56,0.25)", background: "rgba(25,128,56,0.05)", color: "#6fdc8c", cursor: "default" };
    }
    return { border: "1.5px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.03)", color: "rgba(255,255,255,0.35)", cursor: "default" };
  };

  if (done) {
    const passed = finalScore >= 60;
    return (
      <div className="rounded-xl overflow-hidden" style={{ border: "1.5px solid #e4e7f0" }}>
        <div className="px-5 py-3.5 flex items-center gap-2" style={{ background: "#161616" }}>
          <GitBranch size={13} color="rgba(255,255,255,0.7)" />
          <span className="font-mono text-xs uppercase" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.1em" }}>
            {isEN ? "Branching scenario" : "Scénario à embranchements"} — {isEN ? (exercise.titleEn ?? exercise.title) : exercise.title}
          </span>
        </div>
        <div
          className="p-8 text-center"
          style={{ background: passed ? "rgba(25,128,56,0.04)" : "rgba(218,30,40,0.04)" }}
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ background: passed ? "#198038" : "#da1e28" }}
          >
            {passed ? <CheckCircle2 size={28} color="#fff" /> : <AlertTriangle size={28} color="#fff" />}
          </div>
          <div
            className="font-mono text-5xl font-bold mb-2"
            style={{ color: passed ? "#198038" : "#da1e28", fontFamily: "'IBM Plex Mono', monospace" }}
          >
            {finalScore}%
          </div>
          <div className="text-base font-bold mb-1.5" style={{ color: "#161616" }}>
            {passed
              ? (isEN ? exercise.successMessageEn : null) ?? exercise.successMessage ?? (isEN ? "Excellent reflexes — scenario mastered!" : "Excellents réflexes — scénario maîtrisé !")
              : (isEN ? exercise.failMessageEn : null) ?? exercise.failMessage ?? (isEN ? "Some decisions need review — retry the scenario" : "Des décisions à revoir — réessayez le scénario")}
          </div>
          <div className="text-sm mb-5" style={{ color: "#6f7897" }}>
            {totalCorrect}/{totalDecisions} {isEN
              ? `correct decision${totalCorrect > 1 ? "s" : ""}`
              : `décision${totalCorrect > 1 ? "s" : ""} correcte${totalCorrect > 1 ? "s" : ""}`}
          </div>

          {/* Decision recap */}
          <div className="text-left mb-5 flex flex-col gap-2">
            {history.map((entry, i) => {
              const n = exercise.nodes[entry.nodeId];
              const choice = n.choices[entry.choiceIdx];
              const s = CONSEQUENCE_STYLE[entry.consequenceType];
              return (
                <div key={i} className="flex items-start gap-3 rounded-lg p-3" style={{ background: "#fff", border: "1.5px solid #e4e7f0" }}>
                  <div className="mt-0.5">{s.icon}</div>
                  <div className="flex-1">
                    <div className="text-xs font-semibold mb-0.5" style={{ color: "#8d95aa" }}>{isEN ? "Decision" : "Décision"} {i + 1}</div>
                    <div className="text-xs font-medium" style={{ color: "#161616" }}>{isEN ? (choice.labelEn ?? choice.label) : choice.label}</div>
                    <div className="text-xs mt-0.5" style={{ color: "#6f7897" }}>{isEN ? (choice.consequenceEn ?? choice.consequence) : choice.consequence}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={reset}
            className="inline-flex items-center gap-2 font-semibold text-sm px-6 py-2.5 rounded-lg transition-all"
            style={{ background: "#0043ce", color: "#fff", border: "none", cursor: "pointer" }}
            onMouseEnter={(e) => (e.currentTarget as HTMLButtonElement).style.background = "#0031a9"}
            onMouseLeave={(e) => (e.currentTarget as HTMLButtonElement).style.background = "#0043ce"}
          >
            <RotateCcw size={14} />
            {isEN ? "Restart scenario" : "Recommencer le scénario"}
          </button>
        </div>
      </div>
    );
  }

  // Hard guard — if node is still undefined after fallback, bail out cleanly
  if (!node) return null;

  const currentChoice = chosenIdx !== null ? node.choices[chosenIdx] : null;
  const consequenceStyle = currentChoice ? CONSEQUENCE_STYLE[currentChoice.consequenceType] : null;

  return (
    <div className="rounded-xl overflow-hidden" style={{ border: "1.5px solid #e4e7f0" }}>
      {/* Header */}
      <div className="px-5 py-3.5 flex items-center justify-between" style={{ background: "#161616" }}>
        <div className="flex items-center gap-2">
          <GitBranch size={13} color="rgba(255,255,255,0.7)" />
          <span
            className="font-mono text-xs uppercase"
            style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.1em" }}
          >
            {isEN ? "Scenario" : "Scénario"} — {isEN ? (exercise.titleEn ?? exercise.title) : exercise.title}
          </span>
        </div>
        <div className="flex items-center gap-3">
          {/* Urgency badge */}
          {node.urgency && (
            <span
              className="font-mono text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                color: urgColor,
                background: `${urgColor}22`,
                border: `1px solid ${urgColor}55`,
              }}
            >
              {URGENCY_LABEL[node.urgency]}
            </span>
          )}
          {/* Progress dots */}
          <div className="flex gap-1">
            {history.map((h, i) => (
              <div key={i} className="w-2 h-2 rounded-full" style={{ background: h.consequenceType === "ok" ? "#6fdc8c" : "#ff8389" }} />
            ))}
            <div className="w-2 h-2 rounded-full" style={{ background: "rgba(255,255,255,0.4)", animation: "pulse 1.5s ease infinite" }} />
          </div>
        </div>
      </div>


      {/* Scene image */}
      {node.image && (
        <div className="relative overflow-hidden" style={{ height: "200px" }}>
          <img
            src={node.image}
            alt="Scene"
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.7)" }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.6))" }} />

          {/* Smoke fog */}
          {timeLeft !== null && node.timed && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at 50% 110%, rgba(80,80,80,0) 0%, rgba(30,30,30,${Math.min(0.72, ((node.timed - timeLeft) / node.timed) * 0.8)}) 100%)`,
                backdropFilter: `blur(${Math.min(3, ((node.timed - timeLeft) / node.timed) * 4)}px)`,
                transition: "background 1s linear, backdrop-filter 1s linear",
              }}
            />
          )}

          {/* Timer badge */}
          {timeLeft !== null && (
            <div
              className="absolute top-3 right-3 flex items-center gap-1.5 font-mono font-bold text-sm px-3 py-1.5 rounded-full"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                background: timeLeft <= 3 ? "rgba(218,30,40,0.9)" : "rgba(0,0,0,0.7)",
                color: "#fff",
                border: `1px solid ${timeLeft <= 3 ? "#da1e28" : "rgba(255,255,255,0.2)"}`,
                backdropFilter: "blur(6px)",
              }}
            >
              <Clock size={13} />
              {timeLeft}s
            </div>
          )}
        </div>
      )}

      {/* Situation */}
      <div className="px-5 py-4" style={{ background: "#0a0e1a" }}>
        <div
          className="font-mono text-xs mb-2"
          style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.08em" }}
        >
          {isEN ? "Situation" : "Situation"}
        </div>
        <p className="text-base font-bold text-white leading-snug mb-1" style={{ letterSpacing: "-0.01em" }}>
          {isEN ? (node.situationEn ?? node.situation) : node.situation}
        </p>
        {node.context && (
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.55)", lineHeight: "1.55" }}>
            {isEN ? (node.contextEn ?? node.context) : node.context}
          </p>
        )}

        {/* Timer bar */}
        {timeLeft !== null && node.timed && (
          <div className="mt-3 rounded-full overflow-hidden h-1" style={{ background: "rgba(255,255,255,0.1)" }}>
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{
                width: `${(timeLeft / node.timed) * 100}%`,
                background: timeLeft <= 3 ? "#da1e28" : "#0f62fe",
              }}
            />
          </div>
        )}
      </div>

      {/* Choices */}
      <div className="p-4 flex flex-col gap-2.5" style={{ background: "#111827" }}>
        <div className="font-mono text-xs mb-1" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'IBM Plex Mono', monospace" }}>
          {isEN ? "What do you do?" : "Que faites-vous ?"}
        </div>
        {node.choices.map((choice, idx) => {
          const s = choiceStyle(choice, idx);
          return (
            <button
              key={idx}
              onClick={() => chosenIdx === null && handleChoice(idx)}
              disabled={chosenIdx !== null}
              className="flex items-center gap-3 rounded-lg text-left transition-all duration-200"
              style={{
                padding: "0.85rem 1rem",
                ...s,
                width: "100%",
                fontFamily: "'IBM Plex Sans', sans-serif",
              }}
              onMouseEnter={(e) => {
                if (chosenIdx === null) {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.35)";
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.12)";
                }
              }}
              onMouseLeave={(e) => {
                if (chosenIdx === null) {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.14)";
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.07)";
                }
              }}
            >
              <span
                className="font-mono text-xs font-bold w-6 h-6 rounded flex items-center justify-center flex-shrink-0"
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  background: chosenIdx === idx
                    ? choice.consequenceType === "ok" ? "#198038" : "#da1e28"
                    : "rgba(255,255,255,0.12)",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.18)",
                }}
              >
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="flex-1 text-sm font-medium">{isEN ? (choice.labelEn ?? choice.label) : choice.label}</span>
              {chosenIdx === null && <ChevronRight size={14} style={{ color: "rgba(255,255,255,0.3)", flexShrink: 0 }} />}
            </button>
          );
        })}
      </div>

      {/* Consequence feedback */}
      {chosenIdx !== null && consequenceStyle && currentChoice && (
        <div
          className="mx-4 mb-4 rounded-xl p-4 flex items-start gap-3 animate-fade-up"
          style={{
            background: consequenceStyle.bg,
            border: `1.5px solid ${consequenceStyle.border}`,
          }}
        >
          {consequenceStyle.icon}
          <div>
            <div className="text-xs font-bold mb-1" style={{ color: consequenceStyle.titleColor }}>
              {consequenceStyle.label}
            </div>
            <div className="text-sm leading-relaxed" style={{ color: "#4a5068" }}>
              {isEN ? (currentChoice.consequenceEn ?? currentChoice.consequence) : currentChoice.consequence}
            </div>
            {currentChoice.nextNode && (
              <div className="text-xs mt-1.5 flex items-center gap-1" style={{ color: "#8d95aa" }}>
                <ChevronRight size={11} />
                {isEN ? "Continuing the scenario..." : "Suite de la situation en cours..."}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
