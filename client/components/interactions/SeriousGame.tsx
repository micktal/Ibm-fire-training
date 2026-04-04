import { useState, useEffect, useRef } from "react";
import { CheckCircle2, XCircle, Heart, Zap, Trophy, RotateCcw, Timer } from "lucide-react";
import { SeriousGameExercise } from "@/lib/interactionData";

interface Props {
  exercise: SeriousGameExercise;
  onComplete?: (score: number) => void;
}

export default function SeriousGame({ exercise, onComplete }: Props) {
  const [round, setRound] = useState(0);
  const [lives, setLives] = useState(3);
  const [points, setPoints] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(exercise.rounds[0].timeLimit);
  const [phase, setPhase] = useState<"playing" | "feedback" | "done" | "dead">("playing");
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentRound = exercise.rounds[round];
  const maxPoints = exercise.rounds.length * 100;

  const clearTimer = () => { if (timerRef.current) clearInterval(timerRef.current); };

  useEffect(() => {
    if (phase !== "playing") return;
    setTimeLeft(currentRound.timeLimit);
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          handleChoice(-1); // timeout = wrong
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return clearTimer;
  }, [round, phase]);

  const handleChoice = (idx: number) => {
    if (phase !== "playing") return;
    clearTimer();
    setSelected(idx);
    setPhase("feedback");

    const isCorrect = idx >= 0 && exercise.rounds[round].actions[idx].correct;
    if (isCorrect) {
      const timeBonus = Math.round(timeLeft / currentRound.timeLimit * 50);
      setPoints((p) => p + 50 + timeBonus);
      setStreak((s) => {
        const ns = s + 1;
        setMaxStreak((ms) => Math.max(ms, ns));
        return ns;
      });
    } else {
      setLives((l) => {
        const nl = l - 1;
        if (nl <= 0) {
          setTimeout(() => setPhase("dead"), 1800);
        }
        return nl;
      });
      setStreak(0);
    }

    setTimeout(() => {
      if (round < exercise.rounds.length - 1) {
        setRound((r) => r + 1);
        setSelected(null);
        setPhase("playing");
      } else {
        setPhase("done");
        const finalScore = Math.round((points / maxPoints) * 100);
        onComplete?.(finalScore);
      }
    }, 2000);
  };

  const reset = () => {
    setRound(0); setLives(3); setPoints(0);
    setSelected(null); setStreak(0); setMaxStreak(0);
    setPhase("playing"); setTimeLeft(exercise.rounds[0].timeLimit);
  };

  const timeRatio = timeLeft / currentRound.timeLimit;
  const progressBarColor = timeRatio > 0.5 ? "#6fdc8c" : timeRatio > 0.25 ? "#f59e0b" : "#da1e28";

  // ── DONE ──────────────────────────────────────────────────────
  if (phase === "done" || phase === "dead") {
    const finalScore = Math.round((points / maxPoints) * 100);
    const passed = phase === "done" && finalScore >= 50;
    return (
      <div className="rounded-2xl overflow-hidden" style={{ border: "2px solid rgba(13,71,161,0.2)", fontFamily: "'IBM Plex Sans', sans-serif" }}>
        <div className="px-5 py-6 text-center" style={{ background: "linear-gradient(145deg, #0A3882, #0D47A1)" }}>
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: passed ? "rgba(111,220,140,0.2)" : "rgba(218,30,40,0.2)", border: `3px solid ${passed ? "#6fdc8c" : "#ff8b8b"}` }}>
            {passed ? <Trophy size={28} color="#6fdc8c" /> : <XCircle size={28} color="#ff8b8b" />}
          </div>
          <div className="font-bold text-white mb-1" style={{ fontSize: "1.15rem" }}>
            {phase === "dead" ? "Partie terminée — vies épuisées" : passed ? exercise.successMessage ?? "Challenge réussi !" : "Continuez à vous entraîner"}
          </div>
          <div className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.55)" }}>
            {round + 1}/{exercise.rounds.length} situations
          </div>
          <div className="flex justify-center gap-4 mb-4">
            <div className="text-center">
              <div className="font-mono font-bold text-2xl" style={{ color: "#6fdc8c", fontFamily: "'IBM Plex Mono', monospace" }}>{points}</div>
              <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Points</div>
            </div>
            <div className="w-px" style={{ background: "rgba(255,255,255,0.15)" }} />
            <div className="text-center">
              <div className="font-mono font-bold text-2xl" style={{ color: "#f59e0b", fontFamily: "'IBM Plex Mono', monospace" }}>{maxStreak}x</div>
              <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Meilleure série</div>
            </div>
            <div className="w-px" style={{ background: "rgba(255,255,255,0.15)" }} />
            <div className="text-center">
              <div className="font-mono font-bold text-2xl" style={{ color: lives > 0 ? "#fff" : "#ff8b8b", fontFamily: "'IBM Plex Mono', monospace" }}>{lives > 0 ? lives : 0}</div>
              <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Vies restantes</div>
            </div>
          </div>
          <button onClick={reset} className="flex items-center justify-center gap-2 mx-auto px-6 py-2.5 rounded-xl font-bold" style={{ background: "rgba(255,255,255,0.15)", color: "#fff", border: "1.5px solid rgba(255,255,255,0.25)", cursor: "pointer", fontSize: "0.9rem" }}>
            <RotateCcw size={15} /> Rejouer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: "2px solid rgba(13,71,161,0.2)", fontFamily: "'IBM Plex Sans', sans-serif" }}>
      {/* HUD */}
      <div className="flex items-center gap-3 px-4 py-2.5" style={{ background: "#0A3882" }}>
        <div className="flex items-center gap-1 flex-shrink-0">
          {Array.from({ length: 3 }).map((_, i) => (
            <Heart key={i} size={16} fill={i < lives ? "#ff6b6b" : "transparent"} stroke={i < lives ? "#ff6b6b" : "rgba(255,255,255,0.25)"} />
          ))}
        </div>
        <div className="flex-1 text-center">
          <span className="font-mono font-bold text-sm" style={{ color: "#fff", fontFamily: "'IBM Plex Mono', monospace" }}>
            Situation {round + 1}/{exercise.rounds.length}
          </span>
          {streak >= 2 && (
            <span className="ml-2 text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: "#f59e0b", color: "#000" }}>
              {streak}x SÉRIE !
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <Zap size={13} color="#f59e0b" />
          <span className="font-mono font-bold text-sm" style={{ color: "#f59e0b", fontFamily: "'IBM Plex Mono', monospace" }}>{points}</span>
        </div>
      </div>

      {/* Timer bar */}
      <div style={{ height: "5px", background: "rgba(255,255,255,0.08)" }}>
        <div style={{
          height: "100%",
          width: `${(timeLeft / currentRound.timeLimit) * 100}%`,
          background: progressBarColor,
          transition: "width 1s linear, background 0.3s",
        }} />
      </div>

      {/* Situation */}
      <div className="px-5 py-4" style={{ background: "#0D47A1" }}>
        <div className="flex items-center gap-2 mb-2">
          <Timer size={13} color="rgba(255,255,255,0.6)" />
          <span className="font-mono text-xs" style={{ color: timeLeft <= 3 ? "#ff8b8b" : "rgba(255,255,255,0.6)", fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700 }}>
            {timeLeft}s
          </span>
        </div>
        <div className="font-semibold text-white" style={{ fontSize: "0.92rem", lineHeight: "1.5" }}>
          {currentRound.situation}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2 p-4" style={{ background: "#0a2052" }}>
        {currentRound.actions.map((action, i) => {
          const isSelected = selected === i;
          const showResult = phase === "feedback";
          let bg = "rgba(255,255,255,0.06)";
          let border = "rgba(255,255,255,0.12)";
          let textColor = "#fff";
          if (showResult && action.correct) { bg = "rgba(25,128,56,0.25)"; border = "rgba(111,220,140,0.5)"; textColor = "#6fdc8c"; }
          else if (showResult && isSelected && !action.correct) { bg = "rgba(218,30,40,0.25)"; border = "rgba(255,100,100,0.5)"; textColor = "#ff8b8b"; }
          return (
            <button
              key={i}
              onClick={() => phase === "playing" && handleChoice(i)}
              className="rounded-xl px-4 py-3 text-left transition-all flex items-start gap-3"
              style={{ background: bg, border: `2px solid ${border}`, color: textColor, cursor: phase === "playing" ? "pointer" : "default", fontSize: "0.86rem", lineHeight: "1.4" }}
            >
              <span className="flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center font-mono font-bold text-xs mt-0.5" style={{ background: "rgba(255,255,255,0.1)", fontFamily: "'IBM Plex Mono', monospace" }}>
                {String.fromCharCode(65 + i)}
              </span>
              <span className="flex-1">{action.label}</span>
              {showResult && action.correct && <CheckCircle2 size={16} style={{ color: "#6fdc8c", flexShrink: 0 }} />}
              {showResult && isSelected && !action.correct && <XCircle size={16} style={{ color: "#ff8b8b", flexShrink: 0 }} />}
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {phase === "feedback" && selected !== null && (
        <div className="px-4 pb-4" style={{ background: "#0a2052" }}>
          <div className="rounded-xl px-4 py-3" style={{
            background: currentRound.actions[selected]?.correct ? "rgba(25,128,56,0.15)" : "rgba(218,30,40,0.15)",
            border: `1.5px solid ${currentRound.actions[selected]?.correct ? "rgba(111,220,140,0.4)" : "rgba(255,100,100,0.4)"}`,
          }}>
            <div className="text-sm" style={{ color: currentRound.actions[selected]?.correct ? "#6fdc8c" : "#ff8b8b", lineHeight: "1.5" }}>
              {selected === -1 ? "⏱ Temps écoulé — réponse automatiquement incorrecte" : currentRound.actions[selected]?.feedback}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
