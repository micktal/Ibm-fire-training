import { useEffect, useRef, useState } from "react";
import { Flame, Clock, AlertTriangle, Shield, Zap, Eye } from "lucide-react";
import { FunFact } from "@/lib/courseData";

const ICONS: Record<string, React.ReactNode> = {
  flame:  <Flame  size={18} />,
  clock:  <Clock  size={18} />,
  alert:  <AlertTriangle size={18} />,
  shield: <Shield size={18} />,
  zap:    <Zap    size={18} />,
  eye:    <Eye    size={18} />,
};

const ACCENT: Record<string, { color: string; bg: string; border: string }> = {
  flame:  { color: "#ff6b1a", bg: "rgba(255,107,26,0.10)", border: "rgba(255,107,26,0.22)" },
  clock:  { color: "#0f62fe", bg: "rgba(15,98,254,0.09)",  border: "rgba(15,98,254,0.2)"  },
  alert:  { color: "#da1e28", bg: "rgba(218,30,40,0.08)",  border: "rgba(218,30,40,0.2)"  },
  shield: { color: "#198038", bg: "rgba(25,128,56,0.08)",  border: "rgba(25,128,56,0.2)"  },
  zap:    { color: "#8a3ffc", bg: "rgba(138,63,252,0.08)", border: "rgba(138,63,252,0.2)" },
  eye:    { color: "#0043ce", bg: "rgba(0,67,206,0.08)",   border: "rgba(0,67,206,0.2)"   },
};

interface Props {
  fact: FunFact;
  delay?: number;
}

export default function FactCard({ fact, delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const accent = ACCENT[fact.icon] ?? ACCENT.clock;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(14px) scale(0.98)",
        transition: `opacity 0.4s ease ${delay}s, transform 0.4s ease ${delay}s`,
      }}
    >
      <div
        className="flex items-start gap-4 rounded-2xl p-4"
        style={{
          background: "rgba(255,255,255,0.72)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          border: `1.5px solid ${accent.border}`,
          boxShadow: `0 4px 20px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.6)`,
        }}
      >
        {/* Icon badge */}
        <div
          className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: accent.bg, border: `1.5px solid ${accent.border}`, color: accent.color }}
        >
          {ICONS[fact.icon]}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2 flex-wrap mb-1">
            {/* Big stat */}
            <span
              className="font-mono font-bold"
              style={{
                fontSize: "1.35rem",
                lineHeight: 1,
                color: accent.color,
                fontFamily: "'IBM Plex Mono', monospace",
                letterSpacing: "-0.02em",
              }}
            >
              {fact.stat}
            </span>
            <span
              className="font-semibold text-sm"
              style={{ color: "#2d3148", lineHeight: 1.3 }}
            >
              {fact.label}
            </span>
          </div>
          {/* Detail */}
          <p
            className="text-xs leading-relaxed"
            style={{ color: "#6f7897", fontStyle: "italic" }}
          >
            {fact.detail}
          </p>
        </div>

        {/* "Le saviez-vous?" tag */}
        <div
          className="flex-shrink-0 self-start font-mono text-xs px-2 py-0.5 rounded-full whitespace-nowrap"
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            color: accent.color,
            background: accent.bg,
            border: `1px solid ${accent.border}`,
            fontSize: "9px",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          Le saviez-vous ?
        </div>
      </div>
    </div>
  );
}
