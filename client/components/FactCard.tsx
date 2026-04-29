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

// Unified neutral IBM palette — no color explosion
const ICON_COLOR: Record<string, string> = {
  flame:  "#ff832b",
  clock:  "#78a9ff",
  alert:  "#ff8389",
  shield: "#42be65",
  zap:    "#be95ff",
  eye:    "#78a9ff",
};

interface Props {
  fact: FunFact;
  delay?: number;
}

export default function FactCard({ fact, delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const iconColor = ICON_COLOR[fact.icon] ?? "#78a9ff";

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
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition: `opacity 0.4s ease ${delay}s, transform 0.4s ease ${delay}s`,
        height: "100%",
      }}
    >
      <div
        className="rounded-2xl p-4 flex flex-col gap-3 h-full"
        style={{
          background: "#0a1540",
          border: "1.5px solid rgba(255,255,255,0.1)",
          boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
        }}
      >
        {/* Icon + tag */}
        <div className="flex items-center justify-between">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(255,255,255,0.08)", color: iconColor }}
          >
            {ICONS[fact.icon]}
          </div>
          <span
            className="font-mono text-xs px-2 py-0.5 rounded-full uppercase"
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              color: "rgba(255,255,255,0.4)",
              background: "rgba(255,255,255,0.06)",
              fontSize: "8px",
              letterSpacing: "0.1em",
            }}
          >
            KEY FACT
          </span>
        </div>

        {/* Stat */}
        <div>
          <div
            className="font-mono font-bold leading-none mb-1"
            style={{
              fontSize: "1.6rem",
              color: iconColor,
              fontFamily: "'IBM Plex Mono', monospace",
              letterSpacing: "-0.02em",
            }}
          >
            {fact.stat}
          </div>
          <div className="font-semibold text-xs leading-snug" style={{ color: "rgba(255,255,255,0.85)" }}>
            {fact.label}
          </div>
        </div>

        {/* Detail */}
        <p
          className="text-xs leading-relaxed mt-auto"
          style={{ color: "rgba(255,255,255,0.5)", fontStyle: "italic" }}
        >
          {fact.detail}
        </p>
      </div>
    </div>
  );
}
