import { useState, useEffect } from "react";
import { CheckCircle2, XCircle, RotateCcw, Brain, ChevronDown, ChevronUp } from "lucide-react";
import { MindMapExercise } from "@/lib/interactionData";
import { useLanguage } from "@/lib/languageContext";

interface Props {
  exercise: MindMapExercise;
}

// SVG layout constants
const CX = 210, CY = 175, RADIUS = 125;
const IBM_BLUE = "#0043ce";
const IBM_LIGHT = "#4589ff";

function getPos(i: number, n: number) {
  const angle = (i * (2 * Math.PI) / n) - Math.PI / 2;
  return { x: CX + RADIUS * Math.cos(angle), y: CY + RADIUS * Math.sin(angle) };
}

// Split a label into max 2 lines for SVG display
function splitLabel(label: string): [string, string] {
  const parts = label.split("\n");
  if (parts.length > 1) return [parts[0], parts[1]];
  const words = label.split(" ");
  if (words.length <= 2) return [label, ""];
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
}

// IBM color palette for node accents
const IBM_COLORS = [
  "#0043ce", "#0f62fe", "#198038", "#b45309",
  "#7c3aed", "#da1e28", "#0e6027", "#9d5425",
];

export default function MindMap({ exercise }: Props) {
  const { lang } = useLanguage();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [submitted, setSubmitted] = useState(false);
  const [expandedExplanation, setExpandedExplanation] = useState<string | null>(null);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimateIn(true), 80);
    return () => clearTimeout(t);
  }, []);

  const items = exercise.items;
  const n = items.length;

  const title = lang === "en" ? (exercise.titleEn ?? exercise.title) : exercise.title;
  const subtitle = lang === "en" ? (exercise.subtitleEn ?? exercise.subtitle) : exercise.subtitle;
  const centerLabel = lang === "en" ? (exercise.centerLabelEn ?? exercise.centerLabel) : exercise.centerLabel;

  function getLabel(item: typeof items[number]) {
    return lang === "en" ? (item.labelEn ?? item.label) : item.label;
  }
  function getExplanation(item: typeof items[number]) {
    return lang === "en" ? (item.explanationEn ?? item.explanation) : item.explanation;
  }

  function toggle(id: string) {
    if (submitted) return;
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function handleSubmit() {
    if (selected.size === 0) return;
    setSubmitted(true);
  }

  function handleReset() {
    setSelected(new Set());
    setSubmitted(false);
    setExpandedExplanation(null);
  }

  // Scoring
  const totalItems = items.length;
  const correctAnswers = items.filter((item) => item.isCorrect === selected.has(item.id)).length;
  const score = submitted ? Math.round((correctAnswers / totalItems) * 100) : 0;
  const passed = score >= 75;

  // Node color logic
  function getNodeColors(item: typeof items[number]) {
    const isSelected = selected.has(item.id);
    if (!submitted) {
      if (isSelected) return { fill: IBM_BLUE, stroke: IBM_BLUE, text: "white", shadow: true };
      return { fill: "rgba(0,67,206,0.05)", stroke: "rgba(0,67,206,0.25)", text: "#0a2052", shadow: false };
    }
    const correct = item.isCorrect === isSelected;
    if (isSelected) {
      if (item.isCorrect) return { fill: "#198038", stroke: "#198038", text: "white", shadow: false };
      return { fill: "#da1e28", stroke: "#da1e28", text: "white", shadow: false };
    }
    // Not selected
    if (item.isCorrect) {
      // Missed — highlight gently
      return { fill: "rgba(25,128,56,0.12)", stroke: "#198038", text: "#0e6027", shadow: false };
    }
    return { fill: "rgba(0,67,206,0.04)", stroke: "rgba(0,67,206,0.18)", text: "#8c9ac7", shadow: false };
  }

  // Line color for selected items
  function getLineColor(item: typeof items[number]) {
    if (!submitted) return IBM_LIGHT;
    return item.isCorrect ? "#198038" : "#da1e28";
  }

  const [centerLine1, centerLine2] = splitLabel(centerLabel);

  return (
    <div
      style={{
        background: "linear-gradient(135deg, rgba(0,67,206,0.03) 0%, rgba(0,0,0,0) 100%)",
        borderRadius: "16px",
        border: "1px solid rgba(0,67,206,0.1)",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        opacity: animateIn ? 1 : 0,
        transform: animateIn ? "translateY(0)" : "translateY(12px)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
        <div
          style={{
            width: 36, height: 36, borderRadius: "10px",
            background: "linear-gradient(135deg, #0043ce, #0f62fe)",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}
        >
          <Brain size={18} color="white" />
        </div>
        <div>
          <div style={{ fontWeight: 700, color: "#0a2052", fontSize: "0.95rem", lineHeight: 1.3 }}>{title}</div>
          {subtitle && <div style={{ fontSize: "0.8rem", color: "#6f7897", marginTop: 2 }}>{subtitle}</div>}
        </div>
      </div>

      {/* SVG Mind Map */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <svg
          viewBox="0 0 420 350"
          style={{ width: "100%", maxWidth: 480, overflow: "visible" }}
        >
          {/* Outer decorative ring on center */}
          <circle cx={CX} cy={CY} r={62} fill="none" stroke="rgba(0,67,206,0.1)" strokeWidth={2} strokeDasharray="6 4" />

          {/* Lines from center to selected/submitted nodes */}
          {items.map((item, i) => {
            const pos = getPos(i, n);
            const isSelected = selected.has(item.id);
            if (!isSelected && !submitted) return null;
            if (!isSelected && submitted && !item.isCorrect) return null;
            return (
              <line
                key={`line-${item.id}`}
                x1={CX} y1={CY}
                x2={pos.x} y2={pos.y}
                stroke={getLineColor(item)}
                strokeWidth={isSelected ? 2.5 : 1.5}
                strokeDasharray={!isSelected && submitted && item.isCorrect ? "5 4" : "none"}
                opacity={0.65}
                style={{ transition: "all 0.35s ease" }}
              />
            );
          })}

          {/* Center node */}
          <ellipse cx={CX} cy={CY} rx={54} ry={34}
            fill="url(#centerGrad)" />
          <defs>
            <radialGradient id="centerGrad" cx="50%" cy="40%" r="65%">
              <stop offset="0%" stopColor="#1565c0" />
              <stop offset="100%" stopColor="#0a2052" />
            </radialGradient>
          </defs>
          {/* Center label — 1 or 2 lines */}
          {centerLine2 ? (
            <>
              <text x={CX} y={CY - 8} textAnchor="middle" dominantBaseline="middle"
                fill="white" fontSize={12} fontWeight="800" letterSpacing="0.04em"
                style={{ userSelect: "none" }}>
                {centerLine1}
              </text>
              <text x={CX} y={CY + 9} textAnchor="middle" dominantBaseline="middle"
                fill="white" fontSize={12} fontWeight="800" letterSpacing="0.04em"
                style={{ userSelect: "none" }}>
                {centerLine2}
              </text>
            </>
          ) : (
            <text x={CX} y={CY} textAnchor="middle" dominantBaseline="middle"
              fill="white" fontSize={12} fontWeight="800" letterSpacing="0.04em"
              style={{ userSelect: "none" }}>
              {centerLine1}
            </text>
          )}

          {/* Surrounding nodes */}
          {items.map((item, i) => {
            const pos = getPos(i, n);
            const colors = getNodeColors(item);
            const label = getLabel(item);
            const [line1, line2] = splitLabel(label);
            const isSelected = selected.has(item.id);

            return (
              <g
                key={item.id}
                onClick={() => toggle(item.id)}
                style={{ cursor: submitted ? "default" : "pointer" }}
              >
                {/* Shadow / glow for selected */}
                {colors.shadow && (
                  <ellipse cx={pos.x} cy={pos.y + 2} rx={53} ry={28}
                    fill="rgba(0,67,206,0.2)" />
                )}

                {/* Node ellipse */}
                <ellipse
                  cx={pos.x} cy={pos.y}
                  rx={52} ry={26}
                  fill={colors.fill}
                  stroke={colors.stroke}
                  strokeWidth={isSelected || (submitted && item.isCorrect && !selected.has(item.id)) ? 2 : 1.5}
                  style={{ transition: "all 0.3s ease" }}
                />

                {/* Status icon on submit */}
                {submitted && (
                  <>
                    {isSelected && item.isCorrect && (
                      <circle cx={pos.x + 40} cy={pos.y - 18} r={8} fill="#198038" />
                    )}
                    {isSelected && !item.isCorrect && (
                      <circle cx={pos.x + 40} cy={pos.y - 18} r={8} fill="#da1e28" />
                    )}
                  </>
                )}

                {/* Text labels */}
                {line2 ? (
                  <>
                    <text x={pos.x} y={pos.y - 7} textAnchor="middle" dominantBaseline="middle"
                      fill={colors.text} fontSize={11} fontWeight={isSelected ? "700" : "400"}
                      style={{ userSelect: "none", transition: "fill 0.3s ease" }}>
                      {line1}
                    </text>
                    <text x={pos.x} y={pos.y + 8} textAnchor="middle" dominantBaseline="middle"
                      fill={colors.text} fontSize={11} fontWeight={isSelected ? "700" : "400"}
                      style={{ userSelect: "none", transition: "fill 0.3s ease" }}>
                      {line2}
                    </text>
                  </>
                ) : (
                  <text x={pos.x} y={pos.y} textAnchor="middle" dominantBaseline="middle"
                    fill={colors.text} fontSize={11} fontWeight={isSelected ? "700" : "400"}
                    style={{ userSelect: "none", transition: "fill 0.3s ease" }}>
                    {line1}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Instructions / counter before submit */}
      {!submitted && (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
          <div style={{
            fontSize: "0.8rem", color: "#6f7897", textAlign: "center", lineHeight: 1.5,
            padding: "6px 12px", background: "rgba(0,67,206,0.04)", borderRadius: "8px",
          }}>
            {lang === "en"
              ? `Click nodes that belong to the central concept — ${selected.size} selected`
              : `Cliquez les concepts liés au centre — ${selected.size} sélectionné${selected.size !== 1 ? "s" : ""}`}
          </div>

          <button
            onClick={handleSubmit}
            disabled={selected.size === 0}
            style={{
              background: selected.size === 0 ? "rgba(0,67,206,0.15)" : "linear-gradient(135deg, #0043ce, #0f62fe)",
              color: selected.size === 0 ? "rgba(0,67,206,0.4)" : "white",
              border: "none",
              borderRadius: "10px",
              padding: "10px 28px",
              fontWeight: 700,
              fontSize: "0.9rem",
              cursor: selected.size === 0 ? "not-allowed" : "pointer",
              letterSpacing: "0.04em",
              transition: "all 0.2s ease",
            }}
          >
            {lang === "en" ? "Validate my mind map" : "Valider ma carte mentale"}
          </button>
        </div>
      )}

      {/* Results after submit */}
      {submitted && (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {/* Score bar */}
          <div style={{
            background: passed ? "rgba(25,128,56,0.08)" : "rgba(218,30,40,0.08)",
            border: `1px solid ${passed ? "rgba(25,128,56,0.25)" : "rgba(218,30,40,0.25)"}`,
            borderRadius: "12px",
            padding: "14px 16px",
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
              <div style={{ fontWeight: 700, color: passed ? "#198038" : "#da1e28", fontSize: "0.95rem" }}>
                {passed
                  ? (lang === "en" ? "Well done!" : "Bien joué !")
                  : (lang === "en" ? "Keep practicing" : "Continuez à pratiquer")}
              </div>
              <div style={{ fontWeight: 800, color: passed ? "#198038" : "#da1e28", fontSize: "1.1rem" }}>
                {score}%
              </div>
            </div>
            {/* Score progress bar */}
            <div style={{ height: 6, background: "rgba(0,0,0,0.08)", borderRadius: 3, overflow: "hidden" }}>
              <div style={{
                height: "100%",
                width: `${score}%`,
                background: passed ? "linear-gradient(90deg, #198038, #24a148)" : "linear-gradient(90deg, #da1e28, #fa4d56)",
                borderRadius: 3,
                transition: "width 0.8s ease",
              }} />
            </div>
            <div style={{ fontSize: "0.78rem", color: "#6f7897", marginTop: 6 }}>
              {lang === "en"
                ? `${correctAnswers}/${totalItems} correct answers`
                : `${correctAnswers}/${totalItems} réponses correctes`}
            </div>
          </div>

          {/* Explanations list */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {items.map((item) => {
              const isSelected = selected.has(item.id);
              const isCorrectChoice = item.isCorrect === isSelected;
              const label = getLabel(item);
              const explanation = getExplanation(item);
              const isExpanded = expandedExplanation === item.id;

              return (
                <div
                  key={item.id}
                  style={{
                    borderRadius: "10px",
                    border: `1px solid ${
                      isCorrectChoice ? "rgba(25,128,56,0.2)" : "rgba(218,30,40,0.2)"
                    }`,
                    background: isCorrectChoice ? "rgba(25,128,56,0.04)" : "rgba(218,30,40,0.04)",
                    overflow: "hidden",
                  }}
                >
                  <button
                    onClick={() => setExpandedExplanation(isExpanded ? null : item.id)}
                    style={{
                      width: "100%", display: "flex", alignItems: "center", gap: "8px",
                      padding: "9px 12px", background: "none", border: "none", cursor: "pointer", textAlign: "left",
                    }}
                  >
                    <div style={{ flexShrink: 0 }}>
                      {isCorrectChoice
                        ? <CheckCircle2 size={15} color="#198038" />
                        : <XCircle size={15} color="#da1e28" />}
                    </div>
                    <div style={{
                      flex: 1, fontWeight: 600, fontSize: "0.83rem",
                      color: isCorrectChoice ? "#0e6027" : "#c41e3a",
                    }}>
                      {label}
                    </div>
                    {isExpanded ? <ChevronUp size={14} color="#6f7897" /> : <ChevronDown size={14} color="#6f7897" />}
                  </button>
                  {isExpanded && (
                    <div style={{
                      padding: "0 12px 10px 35px",
                      fontSize: "0.8rem",
                      color: "#3d4f7c",
                      lineHeight: 1.55,
                    }}>
                      {explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Reset button */}
          <button
            onClick={handleReset}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
              background: "rgba(0,67,206,0.07)", border: "1px solid rgba(0,67,206,0.15)",
              color: "#0043ce", borderRadius: "10px", padding: "9px 20px",
              fontWeight: 600, fontSize: "0.85rem", cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            <RotateCcw size={14} />
            {lang === "en" ? "Try again" : "Réessayer"}
          </button>
        </div>
      )}
    </div>
  );
}
