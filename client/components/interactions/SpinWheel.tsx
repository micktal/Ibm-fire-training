import { useState } from "react";
import { CheckCircle2, XCircle, RotateCcw, Star } from "lucide-react";
import { SpinWheelExercise } from "@/lib/interactionData";
import { useLanguage } from "@/lib/languageContext";

interface Props {
  exercise: SpinWheelExercise;
}

// IBM-inspired color palette for wheel segments
const COLORS = [
  "#0043ce", "#da1e28", "#198038", "#8a3ffc",
  "#ff6b1a", "#005d5d", "#9f1853", "#0f62fe",
];

function getSegmentPath(i: number, n: number, cx = 100, cy = 100, r = 90) {
  const seg = 360 / n;
  const start = (i * seg - 90) * (Math.PI / 180);
  const end = ((i + 1) * seg - 90) * (Math.PI / 180);
  const x1 = cx + r * Math.cos(start);
  const y1 = cy + r * Math.sin(start);
  const x2 = cx + r * Math.cos(end);
  const y2 = cy + r * Math.sin(end);
  const large = seg > 180 ? 1 : 0;
  return `M ${cx} ${cy} L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`;
}

function getTextPos(i: number, n: number, cx = 100, cy = 100, r = 90) {
  const seg = 360 / n;
  const mid = ((i + 0.5) * seg - 90) * (Math.PI / 180);
  const tr = r * 0.62;
  return {
    x: cx + tr * Math.cos(mid),
    y: cy + tr * Math.sin(mid),
    rotate: (i + 0.5) * seg,
  };
}

export default function SpinWheel({ exercise }: Props) {
  const { lang } = useLanguage();
  const items = exercise.items;
  const n = items.length;
  const seg = 360 / n;

  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [currentIdx, setCurrentIdx] = useState<number | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [results, setResults] = useState<Record<number, boolean>>({});

  const title = lang === "en" ? (exercise.titleEn ?? exercise.title) : exercise.title;
  const subtitle = lang === "en" ? (exercise.subtitleEn ?? exercise.subtitle) : exercise.subtitle;
  const allDone = Object.keys(results).length === n;
  const correctCount = Object.values(results).filter(Boolean).length;

  const spin = () => {
    if (spinning || allDone) return;
    setSpinning(true);
    setCurrentIdx(null);
    setSelected(null);
    setAnswered(false);

    // Pick a random target segment
    const target = Math.floor(Math.random() * n);
    // Calculate rotation to land centered on target segment
    const targetCenter = target * seg + seg / 2; // degrees from top
    const targetRemainder = (360 - targetCenter + 360) % 360;
    const currentRemainder = (rotation % 360 + 360) % 360;
    let delta = (targetRemainder - currentRemainder + 360) % 360;
    if (delta < 30) delta += 360; // ensure at least one full spin segment
    const finalRotation = rotation + 5 * 360 + delta;

    setRotation(finalRotation);

    setTimeout(() => {
      setCurrentIdx(target);
      setSpinning(false);
    }, 4200);
  };

  const handleAnswer = (key: string) => {
    if (answered || currentIdx === null) return;
    const item = items[currentIdx];
    const correct = key === item.correctKey;
    setSelected(key);
    setAnswered(true);
    setResults((r) => ({ ...r, [currentIdx]: correct }));
  };

  const reset = () => {
    setRotation(0);
    setCurrentIdx(null);
    setSelected(null);
    setAnswered(false);
    setResults({});
    setSpinning(false);
  };

  const currentItem = currentIdx !== null ? items[currentIdx] : null;
  const currentColor = currentIdx !== null ? COLORS[currentIdx % COLORS.length] : "#0043ce";

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ border: "1.5px solid #e4e7f0", background: "#fff", fontFamily: "'IBM Plex Sans', sans-serif" }}
    >
      {/* Header */}
      <div
        className="px-5 py-4"
        style={{ background: "linear-gradient(135deg, #0043ce 0%, #0f62fe 100%)" }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(255,255,255,0.15)" }}
          >
            <Star size={14} color="#fff" fill="#fff" />
          </div>
          <div>
            <div className="font-bold text-white" style={{ fontSize: "0.9rem", letterSpacing: "-0.01em" }}>
              {title}
            </div>
            {subtitle && (
              <div style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.78rem" }}>{subtitle}</div>
            )}
          </div>
        </div>
      </div>

      <div className="p-5 flex flex-col items-center gap-5">

        {/* Wheel area */}
        <div className="flex flex-col items-center gap-3 w-full">

          {/* Pointer + wheel */}
          <div className="relative" style={{ width: "240px", height: "240px" }}>
            {/* Pointer */}
            <div
              style={{
                position: "absolute",
                top: "-2px",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 10,
                width: 0,
                height: 0,
                borderLeft: "11px solid transparent",
                borderRight: "11px solid transparent",
                borderTop: "22px solid #da1e28",
                filter: "drop-shadow(0 2px 4px rgba(218,30,40,0.5))",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "-6px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#da1e28",
                zIndex: 11,
              }}
            />

            {/* SVG wheel */}
            <svg
              width="240"
              height="240"
              viewBox="0 0 200 200"
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: spinning
                  ? "transform 4.2s cubic-bezier(0.17, 0.67, 0.12, 1)"
                  : "none",
                filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.15))",
              }}
            >
              {items.map((item, i) => {
                const color = COLORS[i % COLORS.length];
                const isDone = results[i] !== undefined;
                const fill = isDone
                  ? results[i]
                    ? "#198038"
                    : "#da1e28"
                  : color;
                const tp = getTextPos(i, n);
                const label = lang === "en" ? (item.labelEn ?? item.label) : item.label;
                const shortLabel = label.length > 10 ? label.slice(0, 10) + "…" : label;

                return (
                  <g key={i}>
                    <path
                      d={getSegmentPath(i, n)}
                      fill={fill}
                      stroke="#fff"
                      strokeWidth="2.5"
                      opacity={isDone ? 0.75 : 1}
                    />
                    <text
                      x={tp.x}
                      y={tp.y}
                      fill="#fff"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize={n > 6 ? "6.5" : "7.5"}
                      fontWeight="700"
                      fontFamily="IBM Plex Sans, sans-serif"
                      transform={`rotate(${tp.rotate}, ${tp.x}, ${tp.y})`}
                      style={{ pointerEvents: "none", userSelect: "none" }}
                    >
                      {shortLabel}
                    </text>
                    {isDone && (
                      <text
                        x={tp.x}
                        y={tp.y + 10}
                        fill="rgba(255,255,255,0.8)"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize="10"
                        transform={`rotate(${tp.rotate}, ${tp.x}, ${tp.y})`}
                        style={{ pointerEvents: "none" }}
                      >
                        {results[i] ? "✓" : "✗"}
                      </text>
                    )}
                  </g>
                );
              })}
              {/* Center hub */}
              <circle cx="100" cy="100" r="14" fill="#fff" stroke="#0043ce" strokeWidth="3" />
              <circle cx="100" cy="100" r="7" fill="#0043ce" />
            </svg>
          </div>

          {/* Spin button */}
          {!allDone && (
            <button
              onClick={spin}
              disabled={spinning}
              style={{
                background: spinning
                  ? "rgba(200,205,216,0.6)"
                  : "linear-gradient(135deg, #da1e28 0%, #ff6b1a 100%)",
                color: "#fff",
                border: "none",
                borderRadius: "50px",
                padding: "0.85rem 2.5rem",
                fontWeight: 800,
                fontSize: "1.05rem",
                cursor: spinning ? "not-allowed" : "pointer",
                letterSpacing: "0.08em",
                textTransform: "uppercase" as const,
                boxShadow: spinning ? "none" : "0 6px 20px rgba(218,30,40,0.35)",
                transition: "all 0.25s",
              }}
            >
              {spinning
                ? "⟳  " + (lang === "en" ? "Spinning…" : "En cours…")
                : lang === "en"
                ? "🎯  SPIN!"
                : "🎯  TOURNER !"}
            </button>
          )}
        </div>

        {/* Question panel */}
        {currentItem && !spinning && (
          <div
            className="w-full rounded-2xl overflow-hidden"
            style={{
              border: `2px solid ${currentColor}`,
              animation: "feedbackSlide 0.35s ease",
            }}
          >
            {/* Segment header */}
            <div
              className="flex items-center gap-2.5 px-4 py-3"
              style={{ background: currentColor }}
            >
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(255,255,255,0.2)" }}
              >
                <span className="font-mono font-bold text-white" style={{ fontSize: "10px" }}>
                  {(currentIdx! + 1).toString().padStart(2, "0")}
                </span>
              </div>
              <span className="font-bold text-white" style={{ fontSize: "0.85rem", letterSpacing: "0.04em" }}>
                {lang === "en"
                  ? (currentItem.labelEn ?? currentItem.label)
                  : currentItem.label}
              </span>
            </div>

            <div className="px-4 py-4">
              {/* Question text */}
              <p
                className="font-semibold mb-4"
                style={{ color: "#0a2052", fontSize: "0.95rem", lineHeight: "1.55" }}
              >
                {lang === "en"
                  ? (currentItem.questionEn ?? currentItem.question)
                  : currentItem.question}
              </p>

              {/* Choices */}
              {!answered && (
                <div className="flex flex-col gap-2">
                  {currentItem.choices.map((c) => {
                    const label = lang === "en" ? (c.labelEn ?? c.label) : c.label;
                    return (
                      <button
                        key={c.key}
                        onClick={() => handleAnswer(c.key)}
                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-left transition-all"
                        style={{
                          border: "2px solid #e4e7f0",
                          background: "#f8f9fc",
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = currentColor;
                          e.currentTarget.style.background = "rgba(0,67,206,0.04)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = "#e4e7f0";
                          e.currentTarget.style.background = "#f8f9fc";
                        }}
                      >
                        <span
                          className="font-mono font-bold w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-xs"
                          style={{ background: currentColor, color: "#fff" }}
                        >
                          {c.key}
                        </span>
                        <span style={{ color: "#2d3148", fontSize: "0.9rem" }}>{label}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Feedback */}
              {answered && (() => {
                const isCorrect = selected === currentItem.correctKey;
                const explanation = lang === "en"
                  ? (currentItem.explanationEn ?? currentItem.explanation)
                  : currentItem.explanation;
                return (
                  <div className="flex flex-col gap-3">
                    <div
                      className="rounded-xl overflow-hidden"
                      style={{ border: `2px solid ${isCorrect ? "rgba(25,128,56,0.35)" : "rgba(218,30,40,0.3)"}` }}
                    >
                      <div
                        className="flex items-center gap-2 px-4 py-2.5"
                        style={{ background: isCorrect ? "#198038" : "#da1e28" }}
                      >
                        {isCorrect
                          ? <CheckCircle2 size={15} color="#fff" />
                          : <XCircle size={15} color="#fff" />}
                        <span className="font-bold text-white" style={{ fontSize: "0.85rem" }}>
                          {isCorrect
                            ? (lang === "en" ? "Correct!" : "Correct !")
                            : (lang === "en" ? "Incorrect" : "Incorrect")}
                        </span>
                      </div>
                      <div
                        className="px-4 py-3"
                        style={{ background: isCorrect ? "rgba(25,128,56,0.04)" : "rgba(218,30,40,0.04)" }}
                      >
                        <p style={{ color: "#2d3148", fontSize: "0.875rem", lineHeight: "1.6" }}>
                          {explanation}
                        </p>
                      </div>
                    </div>
                    {/* Spin again button — appears right below feedback */}
                    {!allDone && (
                      <button
                        onClick={spin}
                        disabled={spinning}
                        className="w-full flex items-center justify-center gap-2 rounded-xl py-3 font-bold"
                        style={{
                          background: "linear-gradient(135deg, #da1e28 0%, #ff6b1a 100%)",
                          color: "#fff",
                          border: "none",
                          cursor: spinning ? "not-allowed" : "pointer",
                          fontSize: "0.95rem",
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                          boxShadow: "0 4px 16px rgba(218,30,40,0.3)",
                          opacity: spinning ? 0.6 : 1,
                        }}
                      >
                        🎯 {lang === "en" ? "Spin again!" : "Tourner à nouveau !"}
                      </button>
                    )}
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {/* Progress */}
        <div className="w-full">
          <div
            className="flex items-center justify-between mb-1.5"
            style={{ color: "#8d95aa", fontSize: "0.78rem" }}
          >
            <span>
              {Object.keys(results).length}/{n}{" "}
              {lang === "en" ? "answered" : "répondus"}
            </span>
            {Object.keys(results).length > 0 && (
              <span style={{ color: "#198038", fontWeight: 700 }}>
                {correctCount} ✓
              </span>
            )}
          </div>
          <div
            className="rounded-full overflow-hidden"
            style={{ height: "4px", background: "#e8eaf2" }}
          >
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${(Object.keys(results).length / n) * 100}%`,
                background: "linear-gradient(90deg, #0043ce, #0f62fe)",
              }}
            />
          </div>
        </div>

        {/* Completion */}
        {allDone && (
          <div
            className="w-full rounded-2xl p-5 text-center"
            style={{
              background: "linear-gradient(135deg, rgba(0,67,206,0.05), rgba(25,128,56,0.05))",
              border: "2px solid rgba(0,67,206,0.2)",
              animation: "celebrationPop 0.4s cubic-bezier(0.34,1.56,0.64,1) both",
            }}
          >
            <div className="font-bold mb-1" style={{ color: "#0043ce", fontSize: "1.15rem" }}>
              {lang === "en" ? "🎉 All segments answered!" : "🎉 Toutes les questions répondues !"}
            </div>
            <div style={{ color: "#6f7897", fontSize: "0.875rem" }}>
              {lang === "en"
                ? `Score: ${correctCount}/${n} correct`
                : `Score : ${correctCount}/${n} corrects`}
            </div>
            <button
              onClick={reset}
              className="mt-3 flex items-center gap-2 mx-auto rounded-xl px-4 py-2 font-semibold text-sm transition-all"
              style={{
                background: "rgba(0,67,206,0.08)",
                color: "#0043ce",
                border: "1px solid rgba(0,67,206,0.2)",
                cursor: "pointer",
              }}
            >
              <RotateCcw size={13} />
              {lang === "en" ? "Restart" : "Recommencer"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
