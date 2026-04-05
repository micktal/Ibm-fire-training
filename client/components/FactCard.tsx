import { useEffect, useRef, useState } from "react";
import { Flame, Clock, AlertTriangle, Shield, Zap, Eye } from "lucide-react";
import { FunFact } from "@/lib/courseData";

const ICONS: Record<string, React.ReactNode> = {
  flame:  <Flame  size={20} />,
  clock:  <Clock  size={20} />,
  alert:  <AlertTriangle size={20} />,
  shield: <Shield size={20} />,
  zap:    <Zap    size={20} />,
  eye:    <Eye    size={20} />,
};

const ACCENT: Record<string, { color: string; dark: string; gradient: string; badge: string }> = {
  flame:  { color: "#fff", dark: "#ff6b1a", gradient: "linear-gradient(145deg, #ff6b1a, #e8520a)", badge: "rgba(255,255,255,0.22)" },
  clock:  { color: "#fff", dark: "#0f62fe", gradient: "linear-gradient(145deg, #0f62fe, #0043ce)", badge: "rgba(255,255,255,0.22)" },
  alert:  { color: "#fff", dark: "#da1e28", gradient: "linear-gradient(145deg, #da1e28, #a2191f)", badge: "rgba(255,255,255,0.22)" },
  shield: { color: "#fff", dark: "#198038", gradient: "linear-gradient(145deg, #198038, #0e6027)", badge: "rgba(255,255,255,0.22)" },
  zap:    { color: "#fff", dark: "#6929c4", gradient: "linear-gradient(145deg, #8a3ffc, #6929c4)", badge: "rgba(255,255,255,0.22)" },
  eye:    { color: "#fff", dark: "#0031a9", gradient: "linear-gradient(145deg, #0043ce, #0031a9)", badge: "rgba(255,255,255,0.22)" },
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
        transform: visible ? "translateY(0) scale(1)" : "translateY(14px) scale(0.97)",
        transition: `opacity 0.4s ease ${delay}s, transform 0.4s ease ${delay}s`,
        height: "100%",
      }}
    >
      <div
        className="rounded-2xl p-4 flex flex-col gap-3 h-full"
        style={{
          background: accent.gradient,
          boxShadow: `0 6px 20px ${accent.dark}44`,
        }}
      >
        {/* Top: icon + tag */}
        <div className="flex items-center justify-between">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(255,255,255,0.2)", color: "#fff" }}
          >
            {ICONS[fact.icon]}
          </div>
          <span
            className="font-mono text-xs px-2 py-0.5 rounded-full uppercase"
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              color: "#fff",
              background: "rgba(255,255,255,0.2)",
              fontSize: "8px",
              letterSpacing: "0.08em",
              whiteSpace: "nowrap",
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
              color: "#fff",
              fontFamily: "'IBM Plex Mono', monospace",
              letterSpacing: "-0.02em",
              textShadow: "0 1px 4px rgba(0,0,0,0.2)",
            }}
          >
            {fact.stat}
          </div>
          <div className="font-bold text-xs leading-snug" style={{ color: "rgba(255,255,255,0.9)" }}>
            {fact.label}
          </div>
        </div>

        {/* Detail */}
        <p
          className="text-xs leading-relaxed mt-auto"
          style={{ color: "rgba(255,255,255,0.75)", fontStyle: "italic" }}
        >
          {fact.detail}
        </p>
      </div>
    </div>
  );
}
